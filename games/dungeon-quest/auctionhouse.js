// ═══════════════════════════════════════════════════════════════════════════
// CALAMITY DUNGEON — AUCTION HOUSE
// auctionhouse.js
//
// TO ENABLE: set AH_ENABLED = true below and add the AH button to your UI.
// TO LOAD:   add <script src="auctionhouse.js"></script> to index.html.
//            The button stays hidden until AH_ENABLED is true.
// ═══════════════════════════════════════════════════════════════════════════

const AH_ENABLED = true; // ← flip to true when ready to deploy

// ── Replace with your deployed Apps Script Web App URL ───────────────────
// This is the SAME URL you already use for leaderboard/player tracking.
const AH_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';

// ── Listing fee table (must match Apps Script AH_LISTING_FEES) ────────────
const AH_LISTING_FEES = {
  24:  { label: '1 Day',    fee: 50  },
  48:  { label: '2 Days',   fee: 80  },
  72:  { label: '3 Days',   fee: 120 },
  96:  { label: '4 Days',   fee: 170 },
  120: { label: '5 Days',   fee: 230 },
  144: { label: '6 Days',   fee: 300 },
  168: { label: '7 Days',   fee: 380 },
};

const AH_SALE_FEE_PCT  = 10;   // % house takes on sale
const AH_MAX_LISTINGS  = 5;    // max active listings per player
const AH_CACHE_TTL_MS  = 30000; // 30s browse cache

// ── Internal state ────────────────────────────────────────────────────────
let _ahTab         = 'browse';   // browse | sell | mylistings | history
let _ahListings    = [];         // cached browse results
let _ahLastFetch   = 0;
let _ahSellItem    = null;       // item selected for listing
let _ahSellStep    = 'pick';     // pick | confirm
let _ahFilters     = {
  type: '', quality: '', cls: '', subtype: '',
  minLevel: '', maxLevel: '', minPrice: '', maxPrice: '',
  sort: 'newest'
};
let _ahLoading     = false;
let _ahStatusMsg   = '';
let _ahStatusIsErr = false;

// ── Quality order for filter dropdown ─────────────────────────────────────
const AH_QUALITIES = ['','normal','magic','rare','epic','legendary','godly'];
const AH_SORT_OPTIONS = [
  { value: 'newest',        label: 'Newest First'      },
  { value: 'expiring_soon', label: 'Expiring Soon'     },
  { value: 'price_asc',     label: 'Price: Low → High' },
  { value: 'price_desc',    label: 'Price: High → Low' },
  { value: 'level_asc',     label: 'Level: Low → High' },
  { value: 'level_desc',    label: 'Level: High → Low' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ENTRY POINT — call this to open the Auction House overlay
// ═══════════════════════════════════════════════════════════════════════════
function openAuctionHouse() {
  if (!AH_ENABLED) return;

  // Claim any expired items silently on open
  _ahClaimExpired();

  _ahTab      = 'browse';
  _ahSellItem = null;
  _ahSellStep = 'pick';
  _ahStatusMsg= '';

  _ahRender();
  _ahFetchBrowse(true);
}

// ── Public button renderer — insert this wherever your nav/town UI is ─────
// Returns an HTML string for the AH button. Hidden when AH_ENABLED=false.
function renderAuctionHouseButton() {
  if (!AH_ENABLED) return '';
  return `<button onclick="openAuctionHouse()"
    style="background:#060606;border:1px solid #c8a000;color:#c8a000;
           font-family:'VT323',monospace;font-size:14px;padding:6px 14px;
           cursor:pointer;letter-spacing:1px;">
    🏛️ AUCTION HOUSE
  </button>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════════════════
function _ahRender() {
  _ahRemoveOverlay();

  const overlay = document.createElement('div');
  overlay.id = 'ahOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:#000000ee;z-index:9000;
    display:flex;flex-direction:column;font-family:'VT323',monospace;
    overflow:hidden;
  `;

  overlay.innerHTML = `
    <!-- Header -->
    <div style="background:#0a0a00;border-bottom:2px solid #c8a000;
                padding:10px 14px;display:flex;align-items:center;
                justify-content:space-between;flex-shrink:0;">
      <div style="color:#c8a000;font-size:22px;letter-spacing:2px;">🏛️ AUCTION HOUSE</div>
      <button onclick="_ahClose()"
        style="background:none;border:1px solid #444;color:#888;
               font-family:'VT323',monospace;font-size:16px;
               padding:3px 10px;cursor:pointer;">✕ CLOSE</button>
    </div>

    <!-- Tabs -->
    <div style="display:flex;background:#050500;border-bottom:1px solid #1a1a00;
                flex-shrink:0;overflow-x:auto;">
      ${_ahTabBtn('browse',     '🔍 Browse')}
      ${_ahTabBtn('sell',       '📦 Sell Item')}
      ${_ahTabBtn('mylistings', '📋 My Listings')}
      ${_ahTabBtn('history',    '🧾 Purchases')}
    </div>

    <!-- Status bar -->
    <div id="ahStatus" style="flex-shrink:0;min-height:22px;padding:3px 14px;
         font-size:12px;background:#040400;
         color:${_ahStatusIsErr ? '#ff4444' : '#88ff88'};
         display:${_ahStatusMsg ? 'block' : 'none'};">
      ${_ahStatusMsg}
    </div>

    <!-- Body -->
    <div id="ahBody" style="flex:1;overflow-y:auto;padding:10px 12px;">
      ${_ahRenderTab()}
    </div>
  `;

  document.body.appendChild(overlay);
}

function _ahTabBtn(id, label) {
  const active = _ahTab === id;
  return `<button onclick="_ahSwitchTab('${id}')"
    style="background:${active ? '#1a1500' : 'none'};
           border:none;border-bottom:2px solid ${active ? '#c8a000' : 'transparent'};
           color:${active ? '#c8a000' : '#666'};font-family:'VT323',monospace;
           font-size:14px;padding:8px 14px;cursor:pointer;white-space:nowrap;
           flex-shrink:0;">
    ${label}
  </button>`;
}

function _ahSwitchTab(tab) {
  _ahTab      = tab;
  _ahStatusMsg= '';
  _ahSellItem = null;
  _ahSellStep = 'pick';
  _ahRender();
  if (tab === 'browse')     _ahFetchBrowse(false);
  if (tab === 'mylistings') _ahFetchMyListings();
  if (tab === 'history')    _ahFetchHistory();
}

function _ahRenderTab() {
  switch (_ahTab) {
    case 'browse':     return _ahRenderBrowse();
    case 'sell':       return _ahRenderSell();
    case 'mylistings': return _ahRenderMyListings();
    case 'history':    return _ahRenderHistory();
    default:           return '';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB: BROWSE
// ═══════════════════════════════════════════════════════════════════════════
function _ahRenderBrowse() {
  const qualityOpts = AH_QUALITIES.map(q =>
    `<option value="${q}" ${_ahFilters.quality===q?'selected':''}>${q ? q.charAt(0).toUpperCase()+q.slice(1) : 'All Qualities'}</option>`
  ).join('');

  const sortOpts = AH_SORT_OPTIONS.map(o =>
    `<option value="${o.value}" ${_ahFilters.sort===o.value?'selected':''}>${o.label}</option>`
  ).join('');

  // Collect unique subtypes from current listings for the subtype filter
  const subtypes = [...new Set(_ahListings.map(l => l.item_subtype).filter(Boolean))].sort();
  const subtypeOpts = ['', ...subtypes].map(s =>
    `<option value="${s}" ${_ahFilters.subtype===s?'selected':''}>${s || 'All Types'}</option>`
  ).join('');

  const filterBar = `
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;
                padding:8px;background:#060600;border:1px solid #1a1a00;border-radius:4px;">

      <select onchange="_ahSetFilter('type',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        <option value="" ${_ahFilters.type===''?'selected':''}>⚔️🛡️ All Items</option>
        <option value="weapon" ${_ahFilters.type==='weapon'?'selected':''}>⚔️ Weapons</option>
        <option value="armor"  ${_ahFilters.type==='armor' ?'selected':''}>🛡️ Armor</option>
      </select>

      <select onchange="_ahSetFilter('subtype',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        ${subtypeOpts}
      </select>

      <select onchange="_ahSetFilter('quality',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        ${qualityOpts}
      </select>

      <input type="number" placeholder="Min Level" value="${_ahFilters.minLevel}"
        onchange="_ahSetFilter('minLevel',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;width:80px;">

      <input type="number" placeholder="Max Level" value="${_ahFilters.maxLevel}"
        onchange="_ahSetFilter('maxLevel',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;width:80px;">

      <input type="number" placeholder="Min Price" value="${_ahFilters.minPrice}"
        onchange="_ahSetFilter('minPrice',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;width:80px;">

      <input type="number" placeholder="Max Price" value="${_ahFilters.maxPrice}"
        onchange="_ahSetFilter('maxPrice',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;width:80px;">

      <select onchange="_ahSetFilter('sort',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        ${sortOpts}
      </select>

      <button onclick="_ahFetchBrowse(true)"
        style="background:#0a0a00;border:1px solid #3a3a00;color:#c8a000;
               font-family:'VT323',monospace;font-size:13px;padding:3px 10px;cursor:pointer;">
        🔄 Refresh
      </button>
    </div>`;

  if (_ahLoading) {
    return filterBar + `<div style="color:#444;text-align:center;padding:30px;font-size:16px;">Loading listings...</div>`;
  }

  if (_ahListings.length === 0) {
    return filterBar + `<div style="color:#333;text-align:center;padding:30px;font-size:15px;">No listings match your filters.</div>`;
  }

  const p = gameState.player;
  const rows = _ahListings.map(listing => _ahRenderListingRow(listing, p)).join('');

  return filterBar + `
    <div style="font-size:11px;color:#333;margin-bottom:6px;font-family:'Courier New',monospace;">
      ${_ahListings.length} listing${_ahListings.length!==1?'s':''} found
    </div>
    ${rows}`;
}

function _ahRenderListingRow(listing, p) {
  const qc       = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[listing.item_quality]) || {};
  const color    = qc.color || '#888';
  const icon     = listing.item_type === 'weapon' ? '⚔️' : '🛡️';
  const isOwn    = listing.is_own;
  const canAfford= p.gold >= listing.buy_now_price;
  const timeLeft = _ahTimeLeft(listing.expires_at);

  const subtypeTag = listing.item_subtype
    ? `<span style="color:#2a2a2a;font-size:10px;font-family:'Courier New',monospace;
                    border:1px solid #1a1a1a;padding:0 3px;">${listing.item_subtype}</span>`
    : '';

  const classTag = listing.item_class_req && listing.item_class_req !== 'all'
    ? `<span style="color:#1a3a1a;font-size:10px;font-family:'Courier New',monospace;
                    border:1px solid #1a2a1a;padding:0 3px;">${listing.item_class_req}</span>`
    : '';

  const buyBtn = isOwn
    ? `<span style="color:#2a2a2a;font-size:11px;font-family:'Courier New',monospace;">YOUR LISTING</span>`
    : `<button onclick="_ahConfirmBuy('${listing.listing_id}','${listing.item_name.replace(/'/g,"\\'")}',${listing.buy_now_price})"
         ${canAfford ? '' : 'disabled'}
         style="background:#060600;border:1px solid ${canAfford ? '#3a5a00' : '#1a1a00'};
                color:${canAfford ? '#8aaa00' : '#2a2a2a'};
                font-family:'VT323',monospace;font-size:13px;
                padding:3px 10px;cursor:${canAfford ? 'pointer' : 'default'};">
         BUY ${listing.buy_now_price.toLocaleString()}g
       </button>`;

  return `
    <div style="border:1px solid #0f0f00;background:#060600;
                padding:8px 10px;margin-bottom:3px;
                opacity:${isOwn ? '0.7' : '1'};">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:2px;">
            <span style="color:#555;font-size:10px;border:1px solid #1a1a00;
                         padding:0 3px;font-family:'Courier New',monospace;">LV${listing.item_level}</span>
            <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                         color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                         font-family:'Courier New',monospace;">${listing.item_quality.toUpperCase()}</span>
            <span style="color:${color};font-size:13px;">${icon} ${listing.item_name}</span>
            ${subtypeTag}
            ${classTag}
          </div>
          <div style="display:flex;gap:10px;font-size:11px;color:#444;flex-wrap:wrap;">
            <span>Seller: <span style="color:#666;">${listing.seller_name}</span></span>
            <span style="color:#2a2a2a;font-family:'Courier New',monospace;">⏳ ${timeLeft}</span>
          </div>
        </div>
        <div style="flex-shrink:0;text-align:right;">
          ${buyBtn}
        </div>
      </div>
    </div>`;
}

function _ahSetFilter(key, value) {
  _ahFilters[key] = value;
  _ahFetchBrowse(true);
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB: SELL
// ═══════════════════════════════════════════════════════════════════════════
function _ahRenderSell() {
  if (_ahSellStep === 'confirm' && _ahSellItem) {
    return _ahRenderSellConfirm();
  }
  return _ahRenderSellPick();
}

function _ahRenderSellPick() {
  const p = gameState.player;
  const inventory = p.inventory || [];

  // Gather sellable items (weapons + armor that are in inventory and not currently equipped)
  const sellable = inventory.filter(item => {
    if (!item || typeof item !== 'object') return false;
    // Skip equipped items
    if (item.instanceId === p.weapon) return false;
    if (item.instanceId === p.armor)  return false;
    // Must be weapon or armor
    return item.weaponId || item.armorId || item.type === 'weapon' || item.type === 'armor';
  });

  if (sellable.length === 0) {
    return `
      <div style="color:#444;text-align:center;padding:30px;">
        <div style="font-size:18px;margin-bottom:8px;">No items available to sell.</div>
        <div style="font-size:13px;color:#333;">Unequipped weapons and armor appear here.</div>
      </div>`;
  }

  const rows = sellable.map((item, idx) => {
    const isWeapon  = !!(item.weaponId || item.type === 'weapon');
    const baseData  = isWeapon
      ? (typeof WEAPONS !== 'undefined' ? WEAPONS[item.weaponId || item.instanceId] : null)
      : (typeof ARMOR   !== 'undefined' ? ARMOR[item.armorId   || item.instanceId] : null);
    const quality   = item.quality || baseData?.quality || 'normal';
    const qc        = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality]) || {};
    const color     = qc.color || '#888';
    const name      = item.name || baseData?.name || 'Unknown';
    const level     = baseData?.level || item.level || 1;
    const icon      = isWeapon ? '⚔️' : '🛡️';

    return `
      <div onclick="_ahSelectSellItem(${idx})"
        style="border:1px solid #0f0f00;background:#060600;padding:8px 10px;
               margin-bottom:3px;cursor:pointer;"
        onmouseover="this.style.borderColor='#3a3a00'"
        onmouseout="this.style.borderColor='#0f0f00'">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <span style="color:#555;font-size:10px;border:1px solid #1a1a00;padding:0 3px;
                       font-family:'Courier New',monospace;">LV${level}</span>
          <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                       color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                       font-family:'Courier New',monospace;">${quality.toUpperCase()}</span>
          <span style="color:${color};font-size:13px;">${icon} ${name}</span>
        </div>
      </div>`;
  });

  // Store sellable list for index access
  window._ahSellableItems = sellable;

  return `
    <div style="color:#888;font-size:13px;margin-bottom:8px;">
      Select an item from your inventory to list in the Auction House:
    </div>
    ${rows.join('')}`;
}

function _ahSelectSellItem(idx) {
  const item = (window._ahSellableItems || [])[idx];
  if (!item) return;
  _ahSellItem = item;
  _ahSellStep = 'confirm';
  _ahUpdateBody();
}

function _ahRenderSellConfirm() {
  const p         = gameState.player;
  const item      = _ahSellItem;
  const isWeapon  = !!(item.weaponId || item.type === 'weapon');
  const baseData  = isWeapon
    ? (typeof WEAPONS !== 'undefined' ? WEAPONS[item.weaponId || item.instanceId] : null)
    : (typeof ARMOR   !== 'undefined' ? ARMOR[item.armorId   || item.instanceId] : null);
  const quality   = item.quality || baseData?.quality || 'normal';
  const qc        = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality]) || {};
  const color     = qc.color || '#888';
  const name      = item.name || baseData?.name || 'Unknown';
  const level     = baseData?.level || item.level || 1;
  const subtype   = baseData?.weaponSubtype || baseData?.armorType || '';
  const classReq  = baseData?.classRestriction
    ? (Array.isArray(baseData.classRestriction) ? baseData.classRestriction.join(',') : baseData.classRestriction)
    : 'all';
  const icon      = isWeapon ? '⚔️' : '🛡️';

  const durationRows = Object.entries(AH_LISTING_FEES).map(([hours, info]) => {
    const canAfford = p.gold >= info.fee;
    return `
      <label style="display:flex;align-items:center;gap:8px;padding:5px 0;cursor:pointer;">
        <input type="radio" name="ahDuration" value="${hours}"
          ${hours == 24 ? 'checked' : ''} ${canAfford ? '' : 'disabled'}
          onchange="document.getElementById('ahFeePreview').textContent='Listing fee: ${info.fee}g';"
          style="accent-color:#c8a000;">
        <span style="color:${canAfford ? '#aaa' : '#333'};font-size:14px;">
          ${info.label}
          <span style="color:${canAfford ? '#c8a000' : '#2a2a00'};font-family:'Courier New',monospace;"> — ${info.fee}g</span>
        </span>
      </label>`;
  }).join('');

  return `
    <button onclick="_ahSellStep='pick';_ahUpdateBody();"
      style="background:none;border:none;color:#555;font-family:'VT323',monospace;
             font-size:13px;cursor:pointer;margin-bottom:10px;">← Back to inventory</button>

    <div style="background:#080800;border:1px solid #2a2a00;padding:10px 12px;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
        <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                     color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                     font-family:'Courier New',monospace;">${quality.toUpperCase()}</span>
        <span style="color:${color};font-size:15px;font-weight:bold;">${icon} ${name}</span>
      </div>
      <div style="color:#555;font-size:11px;font-family:'Courier New',monospace;">
        LV${level}${subtype ? ' · ' + subtype : ''}${classReq !== 'all' ? ' · ' + classReq : ''}
      </div>
    </div>

    <div style="margin-bottom:12px;">
      <label style="display:block;color:#888;font-size:13px;margin-bottom:5px;">
        Buy Now Price (gold):
      </label>
      <input type="number" id="ahPriceInput" min="1" placeholder="Enter price..."
        style="background:#0a0a00;border:1px solid #3a3a00;color:#c8a000;
               font-family:'VT323',monospace;font-size:18px;padding:6px 10px;width:160px;">
    </div>

    <div style="margin-bottom:12px;">
      <div style="color:#888;font-size:13px;margin-bottom:5px;">Listing Duration:</div>
      ${durationRows}
      <div id="ahFeePreview" style="color:#c8a000;font-size:13px;margin-top:6px;
                                     font-family:'Courier New',monospace;">
        Listing fee: ${AH_LISTING_FEES[24].fee}g
      </div>
    </div>

    <div style="background:#040400;border:1px solid #1a1a00;padding:8px 10px;
                margin-bottom:12px;font-size:12px;color:#555;">
      <div>• Listing fee is charged immediately and is <span style="color:#888;">non-refundable</span>.</div>
      <div>• If sold, you receive <span style="color:#8aaa00;">90%</span> of the sale price (10% house fee).</div>
      <div>• If unsold, the item is returned to your inventory when you next open the AH.</div>
      <div>• You can cancel your listing at any time for free.</div>
    </div>

    <div style="display:flex;gap:8px;">
      <button onclick="_ahSubmitListing()"
        style="background:#0a0a00;border:1px solid #3a5a00;color:#8aaa00;
               font-family:'VT323',monospace;font-size:15px;padding:8px 20px;cursor:pointer;">
        📦 LIST ITEM
      </button>
      <button onclick="_ahSellStep='pick';_ahUpdateBody();"
        style="background:none;border:1px solid #2a2a2a;color:#444;
               font-family:'VT323',monospace;font-size:15px;padding:8px 16px;cursor:pointer;">
        Cancel
      </button>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB: MY LISTINGS
// ═══════════════════════════════════════════════════════════════════════════
function _ahRenderMyListings() {
  if (_ahLoading) {
    return `<div style="color:#444;text-align:center;padding:30px;">Loading your listings...</div>`;
  }

  const listings = window._ahMyListings || [];

  if (listings.length === 0) {
    return `<div style="color:#333;text-align:center;padding:30px;font-size:15px;">
      You have no active listings.<br>
      <span style="color:#222;font-size:12px;">Go to "Sell Item" to list something.</span>
    </div>`;
  }

  const maxNote = `<div style="color:#444;font-size:11px;margin-bottom:8px;
                               font-family:'Courier New',monospace;">
    ${listings.length} / ${AH_MAX_LISTINGS} listing slots used
  </div>`;

  const rows = listings.map(listing => {
    const qc    = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[listing.item_quality]) || {};
    const color = qc.color || '#888';
    const icon  = listing.item_type === 'weapon' ? '⚔️' : '🛡️';
    const tLeft = _ahTimeLeft(listing.expires_at);
    const payout= Math.floor(listing.buy_now_price * 0.9);

    return `
      <div style="border:1px solid #0f0f00;background:#060600;padding:8px 10px;margin-bottom:4px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;flex-wrap:wrap;">
              <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                           color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                           font-family:'Courier New',monospace;">${listing.item_quality.toUpperCase()}</span>
              <span style="color:${color};font-size:13px;">${icon} ${listing.item_name}</span>
            </div>
            <div style="font-size:11px;color:#444;font-family:'Courier New',monospace;">
              Price: <span style="color:#c8a000;">${listing.buy_now_price.toLocaleString()}g</span>
              · Payout: <span style="color:#8aaa00;">${payout.toLocaleString()}g</span>
              · ⏳ ${tLeft}
            </div>
            <div style="font-size:10px;color:#2a2a2a;font-family:'Courier New',monospace;">
              ID: ${listing.listing_id}
            </div>
          </div>
          <div style="flex-shrink:0;">
            <button onclick="_ahConfirmCancel('${listing.listing_id}','${listing.item_name.replace(/'/g,"\\'")}')"
              style="background:#0a0000;border:1px solid #3a0000;color:#884444;
                     font-family:'VT323',monospace;font-size:13px;
                     padding:3px 8px;cursor:pointer;">
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  return maxNote + rows;
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB: PURCHASE HISTORY
// ═══════════════════════════════════════════════════════════════════════════
function _ahRenderHistory() {
  if (_ahLoading) {
    return `<div style="color:#444;text-align:center;padding:30px;">Loading purchase history...</div>`;
  }

  const purchases = window._ahHistory || [];

  if (purchases.length === 0) {
    return `<div style="color:#333;text-align:center;padding:30px;font-size:15px;">
      No purchases yet.
    </div>`;
  }

  const rows = purchases.map(p => {
    const qc    = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[p.item_quality]) || {};
    const color = qc.color || '#888';
    const icon  = p.item_type === 'weapon' ? '⚔️' : '🛡️';
    const date  = p.sold_at ? new Date(p.sold_at).toLocaleDateString() : '?';

    return `
      <div style="border:1px solid #0a0a00;background:#050500;padding:7px 10px;margin-bottom:3px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:wrap;">
          <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                       color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                       font-family:'Courier New',monospace;">${p.item_quality.toUpperCase()}</span>
          <span style="color:${color};font-size:13px;">${icon} ${p.item_name}</span>
        </div>
        <div style="font-size:11px;color:#444;font-family:'Courier New',monospace;">
          Paid: <span style="color:#c8a000;">${(p.price_paid||0).toLocaleString()}g</span>
          · From: <span style="color:#666;">${p.seller_name}</span>
          · <span style="color:#2a2a2a;">${date}</span>
        </div>
      </div>`;
  }).join('');

  return rows;
}

// ═══════════════════════════════════════════════════════════════════════════
// API CALLS
// ═══════════════════════════════════════════════════════════════════════════
function _ahFetchBrowse(force) {
  const now = Date.now();
  if (!force && now - _ahLastFetch < AH_CACHE_TTL_MS) {
    _ahUpdateBody();
    return;
  }

  _ahLoading = true;
  _ahUpdateBody();

  const p = gameState.player;
  const params = new URLSearchParams({
    action:           'ah_browse',
    character_id:     p.characterId || p.id || '',
    filter_type:      _ahFilters.type,
    filter_quality:   _ahFilters.quality,
    filter_class:     _ahFilters.cls,
    filter_subtype:   _ahFilters.subtype,
    filter_min_level: _ahFilters.minLevel || 0,
    filter_max_level: _ahFilters.maxLevel || 9999,
    filter_min_price: _ahFilters.minPrice || 0,
    filter_max_price: _ahFilters.maxPrice || 99999999,
    sort_by:          _ahFilters.sort,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      _ahLoading    = false;
      _ahLastFetch  = Date.now();
      if (data.ok) {
        _ahListings = data.listings || [];
      } else {
        _ahSetStatus('Failed to load listings: ' + (data.error || ''), true);
      }
      _ahUpdateBody();
    })
    .catch(err => {
      _ahLoading = false;
      _ahSetStatus('Network error loading listings.', true);
      _ahUpdateBody();
    });
}

function _ahFetchMyListings() {
  _ahLoading = true;
  window._ahMyListings = [];
  _ahUpdateBody();

  const p = gameState.player;
  const params = new URLSearchParams({
    action:       'ah_my_listings',
    character_id: p.characterId || p.id || '',
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      _ahLoading = false;
      if (data.ok) {
        window._ahMyListings = data.listings || [];
      } else {
        _ahSetStatus('Failed to load your listings: ' + (data.error || ''), true);
      }
      _ahUpdateBody();
    })
    .catch(() => {
      _ahLoading = false;
      _ahSetStatus('Network error.', true);
      _ahUpdateBody();
    });
}

function _ahFetchHistory() {
  _ahLoading = true;
  window._ahHistory = [];
  _ahUpdateBody();

  const p = gameState.player;
  const params = new URLSearchParams({
    action:       'ah_my_purchases',
    character_id: p.characterId || p.id || '',
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      _ahLoading = false;
      if (data.ok) {
        window._ahHistory = data.purchases || [];
      } else {
        _ahSetStatus('Failed to load purchase history.', true);
      }
      _ahUpdateBody();
    })
    .catch(() => {
      _ahLoading = false;
      _ahSetStatus('Network error.', true);
      _ahUpdateBody();
    });
}

function _ahClaimExpired() {
  const p      = gameState.player;
  const charId = p.characterId || p.id || '';
  const pName  = p.name || 'Adventurer';
  if (!charId) return;

  const params = new URLSearchParams({
    action:          'ah_claim_expired',
    character_id:    charId,
    character_name:  pName,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      if (data.ok && data.count > 0) {
        // Expired items are now mailed — bump badge so player knows to check
        if (typeof _mailUpdateBadge === 'function') {
          _mailUnreadCount = (_mailUnreadCount || 0) + data.count;
          _mailUpdateBadge();
        }
        _ahSetStatus(data.count + ' expired listing' + (data.count > 1 ? 's' : '')
          + ' returned to your mailbox. 📬', false);
      }
    })
    .catch(() => {}); // Silent — non-critical on open
}

// ── Confirm and execute buy ───────────────────────────────────────────────
function _ahConfirmBuy(listingId, itemName, price) {
  const p = gameState.player;
  if (p.gold < price) {
    _ahSetStatus('Not enough gold to buy ' + itemName + '.', true);
    return;
  }

  if (!confirm('Buy ' + itemName + ' for ' + price.toLocaleString() + 'g?')) return;

  const charId = p.characterId || p.id || '';
  const params = new URLSearchParams({
    action:       'ah_buy',
    listing_id:   listingId,
    character_id: charId,
    buyer_name:   p.name || 'Unknown',
    player_gold:  p.gold,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        // Deduct gold from buyer — item and seller payout arrive via mailbox
        p.gold -= price;
        if (typeof saveGame === 'function') saveGame();
        // Update mail badge since buyer now has mail waiting
        if (typeof _mailUpdateBadge === 'function') {
          _mailUnreadCount = (_mailUnreadCount || 0) + 1;
          _mailUpdateBadge();
        }
        _ahSetStatus('✅ ' + data.message, false);
        // Refresh browse list
        _ahLastFetch = 0;
        _ahFetchBrowse(true);
      } else {
        _ahSetStatus('Purchase failed: ' + (data.error || 'Unknown error'), true);
      }
    })
    .catch(() => {
      _ahSetStatus('Network error during purchase.', true);
    });
}

// ── Submit new listing ────────────────────────────────────────────────────
function _ahSubmitListing() {
  const p    = gameState.player;
  const item = _ahSellItem;
  if (!item) return;

  const priceInput = document.getElementById('ahPriceInput');
  const price = parseInt(priceInput?.value) || 0;
  if (price < 1) {
    _ahSetStatus('Please enter a valid price (minimum 1g).', true);
    return;
  }

  const durationRadio = document.querySelector('input[name="ahDuration"]:checked');
  const durationHours = parseInt(durationRadio?.value) || 24;
  const listingFee    = AH_LISTING_FEES[durationHours]?.fee || 50;

  if (p.gold < listingFee) {
    _ahSetStatus('Not enough gold for listing fee (' + listingFee + 'g needed).', true);
    return;
  }

  const isWeapon  = !!(item.weaponId || item.type === 'weapon');
  const baseData  = isWeapon
    ? (typeof WEAPONS !== 'undefined' ? WEAPONS[item.weaponId || item.instanceId] : null)
    : (typeof ARMOR   !== 'undefined' ? ARMOR[item.armorId   || item.instanceId] : null);
  const quality   = item.quality || baseData?.quality || 'normal';
  const name      = item.name || baseData?.name || 'Unknown';
  const level     = baseData?.level || item.level || 1;
  const subtype   = baseData?.weaponSubtype || baseData?.armorType || '';
  const classReq  = baseData?.classRestriction
    ? (Array.isArray(baseData.classRestriction) ? baseData.classRestriction.join(',') : baseData.classRestriction)
    : 'all';
  const charId    = p.characterId || p.id || '';

  // Remove from inventory immediately (optimistic)
  _ahRemoveItemFromInventory(item);
  // Deduct listing fee immediately
  p.gold -= listingFee;
  if (typeof saveGame === 'function') saveGame();

  const params = new URLSearchParams({
    action:         'ah_list',
    character_id:   charId,
    seller_name:    p.name || 'Unknown',
    item_type:      isWeapon ? 'weapon' : 'armor',
    item_key:       item.instanceId || item.weaponId || item.armorId || '',
    item_data:      JSON.stringify(item),
    item_name:      name,
    item_quality:   quality,
    item_level:     level,
    item_class_req: classReq,
    item_subtype:   subtype,
    buy_now_price:  price,
    duration_hours: durationHours,
    player_gold:    p.gold, // post-deduction (server validates)
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        _ahSetStatus('✅ ' + name + ' listed for ' + price.toLocaleString() + 'g!', false);
        _ahSellItem = null;
        _ahSellStep = 'pick';
        _ahTab      = 'mylistings';
        _ahRender();
        _ahFetchMyListings();
      } else {
        // Rollback: return item and gold
        _ahReturnItemToInventory(JSON.stringify(item), name);
        p.gold += listingFee;
        if (typeof saveGame === 'function') saveGame();
        _ahSetStatus('Listing failed: ' + (data.error || 'Unknown error'), true);
        _ahUpdateBody();
      }
    })
    .catch(() => {
      // Rollback on network error
      _ahReturnItemToInventory(JSON.stringify(item), name);
      p.gold += listingFee;
      if (typeof saveGame === 'function') saveGame();
      _ahSetStatus('Network error. Your item and gold have been returned.', true);
      _ahUpdateBody();
    });
}

// ── Cancel listing ────────────────────────────────────────────────────────
function _ahConfirmCancel(listingId, itemName) {
  if (!confirm('Cancel listing for ' + itemName + '? The item will be returned to your inventory. (Listing fee is non-refundable.)')) return;

  const p      = gameState.player;
  const charId = p.characterId || p.id || '';

  const params = new URLSearchParams({
    action:       'ah_cancel',
    listing_id:   listingId,
    character_id: charId,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        // Item returns via mailbox — no direct inventory injection needed
        if (typeof _mailUpdateBadge === 'function') {
          _mailUnreadCount = (_mailUnreadCount || 0) + 1;
          _mailUpdateBadge();
        }
        _ahSetStatus('✅ ' + data.message, false);
        _ahFetchMyListings();
      } else {
        _ahSetStatus('Cancel failed: ' + (data.error || ''), true);
      }
    })
    .catch(() => {
      _ahSetStatus('Network error during cancellation.', true);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// INVENTORY HELPERS
// These integrate with whatever inventory structure your game uses.
// Adjust field names here if your gameState structure differs.
// ═══════════════════════════════════════════════════════════════════════════

function _ahRemoveItemFromInventory(item) {
  const inventory = gameState.player.inventory;
  if (!inventory) return;
  const idx = inventory.findIndex(i => i && i.instanceId === item.instanceId);
  if (idx !== -1) inventory.splice(idx, 1);
}

function _ahAddItemToInventory(itemDataJson, itemName) {
  try {
    const item = JSON.parse(itemDataJson);
    if (!gameState.player.inventory) gameState.player.inventory = [];
    gameState.player.inventory.push(item);
    console.log('AH: Added ' + itemName + ' to inventory');
  } catch (err) {
    console.error('AH: Failed to parse item data for ' + itemName, err);
    _ahSetStatus('⚠️ Item received but could not be added to inventory. Contact support with listing ID.', true);
  }
}

function _ahReturnItemToInventory(itemDataJson, itemName) {
  _ahAddItemToInventory(itemDataJson, itemName);
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════════════════

function _ahTimeLeft(expiresAtStr) {
  if (!expiresAtStr) return '?';
  const diff = new Date(expiresAtStr) - new Date();
  if (diff <= 0) return 'Expired';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    const rh = h % 24;
    return d + 'd ' + rh + 'h';
  }
  return h + 'h ' + m + 'm';
}

function _ahSetStatus(msg, isError) {
  _ahStatusMsg   = msg;
  _ahStatusIsErr = isError;
  const el = document.getElementById('ahStatus');
  if (el) {
    el.textContent = msg;
    el.style.color = isError ? '#ff4444' : '#88ff88';
    el.style.display = msg ? 'block' : 'none';
  }
}

function _ahUpdateBody() {
  const body = document.getElementById('ahBody');
  if (body) body.innerHTML = _ahRenderTab();
}

function _ahRemoveOverlay() {
  const existing = document.getElementById('ahOverlay');
  if (existing) existing.remove();
}

function _ahClose() {
  _ahRemoveOverlay();
}

// ── Expose globals ─────────────────────────────────────────────────────────
window.openAuctionHouse          = openAuctionHouse;
window.renderAuctionHouseButton  = renderAuctionHouseButton;
window._ahSwitchTab              = _ahSwitchTab;
window._ahSetFilter              = _ahSetFilter;
window._ahFetchBrowse            = _ahFetchBrowse;
window._ahSelectSellItem         = _ahSelectSellItem;
window._ahSubmitListing          = _ahSubmitListing;
window._ahConfirmBuy             = _ahConfirmBuy;
window._ahConfirmCancel          = _ahConfirmCancel;
window._ahClose                  = _ahClose;
