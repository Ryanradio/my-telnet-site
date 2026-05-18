// ═══════════════════════════════════════════════════════════════════════════
// CALAMITY DUNGEON — AUCTION HOUSE
// auctionhouse.js
//
// TO ENABLE: set AH_ENABLED = true below and add the AH button to your UI.
// TO LOAD:   add <script src="auctionhouse.js"></script> to index.html.
//            The button stays hidden until AH_ENABLED is true.
// ═══════════════════════════════════════════════════════════════════════════

const AH_ENABLED = true;

// ── Replace with your deployed Apps Script Web App URL ───────────────────
// This is the SAME URL you already use for leaderboard/player tracking.
const AH_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwh7_fSt6gRjObMZCvNLUOcwJpfVgzpeAC7InjPR0E51B7CRpFNj-Qvbe_LL8WR3AhaKg/exec';

// ── Listing fee table (must match Apps Script AH_LISTING_FEES) ────────────
// Keys are duration in MINUTES (integers) to avoid float key ordering issues.
// Server receives duration_minutes and converts to hours internally.
const AH_LISTING_FEES = {
  1:    { label: '1 Min (TEST)', fee: 1,   sysopOnly: true  }, // sysop only
  720:  { label: '12 Hours',     fee: 25                    },
  1440: { label: '1 Day',        fee: 50                    },
  4320: { label: '3 Days',       fee: 120                   },
  10080:{ label: '7 Days',       fee: 380                   },
};

const AH_SALE_FEE_PCT  = 10;   // % house takes on sale
const AH_MAX_LISTINGS  = 99;    // max active listings per player
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
let _ahSellFilters = {
  type: '', quality: '', search: '', sort: 'level_desc'
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
  _ahWirePreviewButtons(overlay);
  _ahWireBidButtons(overlay);
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
  if (tab === 'sell')       _ahSellFilters = { type:'', quality:'', search:'', sort:'level_desc' };
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
  const timeLeft = _ahTimeLeft(listing.expires_at);

  const currentBid   = listing.current_bid  || listing.starting_bid || 0;
  const minNext      = listing.min_next_bid || ahMinNextBid(currentBid);
  const hasBids      = (listing.bid_count || 0) > 0;
  const buyNow       = listing.buy_now_price || 0;
  const bidCount     = listing.bid_count || 0;
  const winnerName   = listing.current_bidder_name || '';
  const winnerId     = listing.current_bidder_id   || listing.seller_id || '';
  const myCharId     = p.characterId || p.id || '';

  // ── Player's personal status on this listing ────────────────────────────
  // Check bid history to see if this player has bid but is no longer winning
  const iAmWinning = hasBids && winnerName && listing.current_bidder_id === myCharId;
  const iHaveBid   = !iAmWinning && listing.bid_history && listing.bid_history.some(function(b) {
    return b.name === (p.name || '');
  });
  const iAmOutbid  = iHaveBid && !iAmWinning;

  const subtypeTag = listing.item_subtype
    ? '<span style="color:#2a2a2a;font-size:10px;font-family:Courier New,monospace;'
      + 'border:1px solid #1a1a1a;padding:0 3px;">' + listing.item_subtype + '</span>'
    : '';

  const classTag = (listing.item_class_req && listing.item_class_req !== 'all')
    ? '<span style="color:#1a3a1a;font-size:10px;font-family:Courier New,monospace;'
      + 'border:1px solid #1a2a1a;padding:0 3px;">' + listing.item_class_req + '</span>'
    : '';

  // ── Bid info line — winner name highlighted ─────────────────────────────
  let bidInfo = '';
  if (hasBids) {
    // Highlight winner name — green if it's you, white if someone else
    const winnerDisplay = iAmWinning
      ? '<span style="color:#00ff88;font-weight:bold;font-family:Courier New,monospace;">'
        + winnerName + ' (YOU)</span>'
      : '<span style="color:#aaa;font-family:Courier New,monospace;">' + winnerName + '</span>';
    bidInfo = '<span style="color:#c8a000;font-family:Courier New,monospace;">Current: '
      + currentBid.toLocaleString() + 'g</span>'
      + '<span style="color:#555;font-size:11px;"> - ' + winnerDisplay + ' leading</span>'
      + '<span style="color:#333;font-size:10px;"> (' + bidCount
      + ' bid' + (bidCount !== 1 ? 's' : '') + ')</span>';
  } else {
    bidInfo = '<span style="color:#446644;font-family:Courier New,monospace;">Starting: '
      + currentBid.toLocaleString() + 'g</span>'
      + '<span style="color:#333;font-size:10px;"> (no bids yet)</span>';
  }

  // ── Bid history ─────────────────────────────────────────────────────────
  let histHtml = '';
  if (listing.bid_history && listing.bid_history.length > 0) {
    histHtml = '<div style="margin-top:3px;font-size:10px;'
      + 'font-family:Courier New,monospace;border-top:1px solid #0a0a00;padding-top:3px;">'
      + listing.bid_history.slice(0, 3).map(function(b) {
          const isMe = b.name === (p.name || '');
          return '<span style="color:' + (isMe ? '#446644' : '#2a3a2a') + ';">'
            + b.name + ': ' + b.amount.toLocaleString() + 'g'
            + (isMe ? ' (you)' : '') + '</span>';
        }).join(' | ')
      + '</div>';
  }

  // ── Action button area ──────────────────────────────────────────────────
  let statusBadge = '';
  if (iAmWinning) {
    statusBadge = '<div style="background:#003300;border:1px solid #006600;'
      + 'color:#00cc44;font-family:VT323,monospace;font-size:12px;'
      + 'padding:2px 7px;text-align:center;letter-spacing:1px;margin-bottom:3px;">'
      + 'WINNING</div>';
  } else if (iAmOutbid) {
    statusBadge = '<div style="background:#330000;border:1px solid #660000;'
      + 'color:#cc3333;font-family:VT323,monospace;font-size:12px;'
      + 'padding:2px 7px;text-align:center;letter-spacing:1px;margin-bottom:3px;">'
      + 'OUTBID</div>';
  }

  let actionBtn = '';
  if (isOwn) {
    actionBtn = '<span style="color:#2a2a2a;font-size:10px;font-family:Courier New,monospace;">'
      + 'YOUR LISTING</span>';
  } else {
    const canBid    = p.gold >= minNext;
    const canBuyNow = buyNow > 0 && p.gold >= buyNow;
    // Bid button label changes if already winning
    const bidLabel  = iAmWinning
      ? 'RAISE BID ' + minNext.toLocaleString() + 'g+'
      : 'BID ' + minNext.toLocaleString() + 'g+';
    actionBtn = statusBadge
      + '<div style="display:flex;flex-direction:column;gap:3px;align-items:flex-end;">'
      + '<button data-bid-listing="' + listing.listing_id + '"'
      + ' data-min-bid="' + minNext + '"'
      + ' data-item-name="' + listing.item_name.replace(/"/g, '&quot;') + '"'
      + (canBid ? '' : ' disabled')
      + ' style="background:' + (iAmWinning ? '#002200' : '#060600') + ';'
      + 'border:1px solid ' + (canBid ? (iAmWinning ? '#006600' : '#3a5a3a') : '#1a1a00') + ';'
      + 'color:' + (canBid ? (iAmWinning ? '#00cc44' : '#8aaa00') : '#2a2a2a') + ';'
      + 'font-family:VT323,monospace;font-size:13px;padding:3px 8px;'
      + 'cursor:' + (canBid ? 'pointer' : 'default') + ';">'
      + bidLabel
      + '</button>';
    if (buyNow > 0) {
      actionBtn += '<button data-buynow-listing="' + listing.listing_id + '"'
        + ' data-buynow-price="' + buyNow + '"'
        + ' data-item-name="' + listing.item_name.replace(/"/g, '&quot;') + '"'
        + (canBuyNow ? '' : ' disabled')
        + ' style="background:#060600;border:1px solid ' + (canBuyNow ? '#5a3a00' : '#1a1a00') + ';'
        + 'color:' + (canBuyNow ? '#c8a000' : '#2a2a2a') + ';font-family:VT323,monospace;'
        + 'font-size:12px;padding:2px 6px;cursor:' + (canBuyNow ? 'pointer' : 'default') + ';">'
        + 'BUY NOW ' + buyNow.toLocaleString() + 'g'
        + '</button>';
    }
    actionBtn += '</div>';
  }

  // ── Row border color reflects player status ─────────────────────────────
  const borderColor = iAmWinning ? '#006600' : iAmOutbid ? '#660000' : '#0f0f00';
  const bgColor     = iAmWinning ? '#010801' : iAmOutbid ? '#080101' : '#060600';

  window._ahBrowseListings = window._ahBrowseListings || {};
  window._ahBrowseListings[listing.listing_id] = listing;

  return '<div style="border:1px solid ' + borderColor + ';background:' + bgColor + ';'
    + 'padding:8px 10px;margin-bottom:3px;opacity:' + (isOwn ? '0.7' : '1') + ';">'
    + '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:3px;">'
    + '<span style="color:#555;font-size:10px;border:1px solid #1a1a00;padding:0 3px;'
    + 'font-family:Courier New,monospace;">LV' + listing.item_level + '</span>'
    + '<span style="display:inline-block;background:' + color + '18;border:1px solid ' + color + '44;'
    + 'color:' + color + ';font-size:9px;letter-spacing:1px;padding:0 4px;'
    + 'font-family:Courier New,monospace;">' + listing.item_quality.toUpperCase() + '</span>'
    + '<span data-preview-listing="' + listing.listing_id + '"'
    + ' style="color:' + color + ';font-size:13px;cursor:pointer;'
    + 'border-bottom:1px dotted ' + color + '88;padding-bottom:1px;">'
    + icon + ' ' + listing.item_name + '</span>'
    + subtypeTag + classTag
    + '</div>'
    + '<div style="font-size:12px;margin-bottom:2px;">' + bidInfo + '</div>'
    + '<div style="display:flex;gap:8px;font-size:11px;color:#444;flex-wrap:wrap;">'
    + '<span>Seller: <span style="color:#555;">' + listing.seller_name + '</span></span>'
    + '<span style="color:#2a2a2a;font-family:Courier New,monospace;">Timer: ' + timeLeft + '</span>'
    + '</div>'
    + histHtml
    + '</div>'
    + '<div style="flex-shrink:0;">' + actionBtn + '</div>'
    + '</div></div>';
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

  // Gather all sellable items first (unequipped weapons + armor)
  const allSellable = inventory.filter(item => {
    if (!item || typeof item !== 'object') return false;
    if (item.instanceId === p.weapon) return false;
    if (item.instanceId === p.armor)  return false;
    return item.weaponId || item.armorId || item.type === 'weapon' || item.type === 'armor';
  });

  if (allSellable.length === 0) {
    return `
      <div style="color:#444;text-align:center;padding:30px;">
        <div style="font-size:18px;margin-bottom:8px;">No items available to sell.</div>
        <div style="font-size:13px;color:#333;">Unequipped weapons and armor appear here.</div>
      </div>`;
  }

  // ── Build enriched list with resolved base data ───────────────────────
  const enriched = allSellable.map(item => {
    const isWeapon = !!(item.weaponId || item.type === 'weapon');
    const baseData = isWeapon
      ? (typeof WEAPONS !== 'undefined' ? WEAPONS[item.weaponId] || WEAPONS[item.instanceId] : null)
      : (typeof ARMOR   !== 'undefined' ? ARMOR[item.armorId]   || ARMOR[item.instanceId]   : null);
    return {
      item,
      isWeapon,
      baseData,
      quality:  item.quality  || baseData?.quality  || 'normal',
      name:     item.name     || baseData?.name      || 'Unknown',
      level:    baseData?.level || item.level        || 1,
      subtype:  baseData?.weaponSubtype || baseData?.armorType || '',
    };
  });

  // ── Apply filters ─────────────────────────────────────────────────────
  const sf = _ahSellFilters;
  let filtered = enriched.filter(e => {
    if (sf.type === 'weapon' && !e.isWeapon) return false;
    if (sf.type === 'armor'  &&  e.isWeapon) return false;
    if (sf.quality && e.quality !== sf.quality) return false;
    if (sf.search) {
      const q = sf.search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.subtype.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // ── Apply sort ────────────────────────────────────────────────────────
  filtered.sort((a, b) => {
    switch (sf.sort) {
      case 'level_asc':   return a.level - b.level;
      case 'level_desc':  return b.level - a.level;
      case 'name_asc':    return a.name.localeCompare(b.name);
      case 'quality':
        const qOrder = ['godly','legendary','epic','rare','magic','normal','poor'];
        return qOrder.indexOf(a.quality) - qOrder.indexOf(b.quality);
      case 'type':        return (a.isWeapon ? 0 : 1) - (b.isWeapon ? 0 : 1);
      default:            return b.level - a.level; // default level_desc
    }
  });

  // Store for index lookup by preview + sell
  window._ahSellPreviewItems = {};
  window._ahSellableItems    = [];
  filtered.forEach((e, idx) => {
    window._ahSellPreviewItems[idx] = e.item;
    window._ahSellableItems[idx]    = e.item;
  });

  // ── Quality options ────────────────────────────────────────────────────
  const quals = ['','normal','magic','rare','epic','legendary','godly'];
  const qualOpts = quals.map(q =>
    `<option value="${q}" ${sf.quality===q?'selected':''}>${q ? q.charAt(0).toUpperCase()+q.slice(1) : 'All Qualities'}</option>`
  ).join('');

  const sortOpts = [
    ['level_desc', 'Level: High → Low'],
    ['level_asc',  'Level: Low → High'],
    ['quality',    'Quality'],
    ['name_asc',   'Name A–Z'],
    ['type',       'Type (Weapon/Armor)'],
  ].map(([v,l]) => `<option value="${v}" ${sf.sort===v?'selected':''}>${l}</option>`).join('');

  // ── Filter bar ─────────────────────────────────────────────────────────
  const filterBar = `
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;
                padding:8px;background:#060600;border:1px solid #1a1a00;border-radius:4px;">
      <select onchange="_ahSellSetFilter('type',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        <option value="" ${sf.type===''?'selected':''}>⚔️🛡️ All</option>
        <option value="weapon" ${sf.type==='weapon'?'selected':''}>⚔️ Weapons</option>
        <option value="armor"  ${sf.type==='armor' ?'selected':''}>🛡️ Armor</option>
      </select>
      <select onchange="_ahSellSetFilter('quality',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        ${qualOpts}
      </select>
      <select onchange="_ahSellSetFilter('sort',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;padding:3px 6px;">
        ${sortOpts}
      </select>
      <input type="text" placeholder="Search name..."
        value="${sf.search}"
        oninput="_ahSellSetFilter('search',this.value)"
        style="background:#0a0a00;border:1px solid #2a2a00;color:#aaa;
               font-family:'VT323',monospace;font-size:13px;
               padding:3px 6px;flex:1;min-width:80px;">
    </div>`;

  // ── Rows ───────────────────────────────────────────────────────────────
  if (filtered.length === 0) {
    return filterBar + `<div style="color:#333;text-align:center;padding:20px;">
      No items match your filters.</div>`;
  }

  const rows = filtered.map((e, idx) => {
    const { item, isWeapon, quality, name, level } = e;
    const qc    = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality]) || {};
    const color = qc.color || '#888';
    const icon  = isWeapon ? '⚔️' : '🛡️';

    return `
      <div style="border:1px solid #0f0f00;background:#060600;padding:8px 10px;
                  margin-bottom:3px;display:flex;align-items:center;gap:6px;
                  flex-wrap:wrap;">
        <span style="color:#555;font-size:10px;border:1px solid #1a1a00;padding:0 3px;
                     font-family:'Courier New',monospace;">LV${level}</span>
        <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                     color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                     font-family:'Courier New',monospace;">${quality.toUpperCase()}</span>
        <span data-preview-idx="${idx}"
              style="color:${color};font-size:13px;cursor:pointer;flex:1;
                     border-bottom:1px dotted ${color}88;padding-bottom:1px;">
          ${icon} ${name}
        </span>
        <button onclick="_ahSelectSellItem(${idx})"
          style="background:#0a0a00;border:1px solid #2a4a2a;color:#669966;
                 font-family:'VT323',monospace;font-size:12px;padding:3px 10px;
                 cursor:pointer;flex-shrink:0;">
          SELL →
        </button>
      </div>`;
  });

  return filterBar + `
    <div style="color:#555;font-size:11px;margin-bottom:6px;
                font-family:'Courier New',monospace;">
      ${filtered.length} of ${allSellable.length} item${allSellable.length!==1?'s':''}
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

function _ahSellSetFilter(key, value) {
  _ahSellFilters[key] = value;
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
  const isSysop   = !!(gameState.sysop && gameState.sysop.authenticated);

  // ── Duration dropdown options ──────────────────────────────────────────
  const durationOpts = Object.entries(AH_LISTING_FEES)
    .filter(([, info]) => !info.sysopOnly || isSysop)
    .map(([hours, info]) => {
      const canAfford = p.gold >= info.fee;
      const sel       = parseInt(hours) === _ahSelectedMinutes ? 'selected' : '';
      return `<option value="${hours}" ${sel} ${canAfford ? '' : 'disabled'}>
        ${info.label} — ${info.fee}g listing fee${canAfford ? '' : ' (need more gold)'}
      </option>`;
    }).join('');

  // Reset selected hours to first affordable option if current isn't valid
  const firstValid = Object.entries(AH_LISTING_FEES)
    .filter(([, info]) => !info.sysopOnly || isSysop)
    .find(([, info]) => p.gold >= info.fee);
  if (firstValid && !AH_LISTING_FEES[_ahSelectedMinutes]) {
    _ahSelectedMinutes = parseInt(firstValid[0]);
  }
  const currentFeeInfo = AH_LISTING_FEES[_ahSelectedMinutes] || Object.values(AH_LISTING_FEES)[1];

  return `
    <button onclick="_ahSellStep='pick';_ahSelectedMinutes=720;_ahUpdateBody();"
      style="background:none;border:none;color:#555;font-family:'VT323',monospace;
             font-size:13px;cursor:pointer;margin-bottom:10px;">← Back</button>

    <!-- Item row — tap name to open modal preview -->
    <div style="background:#080800;border:1px solid #2a2a00;padding:9px 12px;
                margin-bottom:10px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;flex:1;min-width:0;">
          <span style="display:inline-block;background:${color}18;border:1px solid ${color}44;
                       color:${color};font-size:9px;letter-spacing:1px;padding:0 4px;
                       font-family:'Courier New',monospace;flex-shrink:0;">
            ${quality.toUpperCase()}
          </span>
          <span id="ahPreviewBtn"
                style="color:${color};font-size:14px;font-weight:bold;
                       cursor:pointer;border-bottom:1px dotted ${color}88;
                       padding-bottom:1px;">
            ${icon} ${name}
          </span>
      </div>
      <div style="color:#555;font-size:10px;font-family:'Courier New',monospace;margin-top:3px;">
        LV${level}${subtype ? ' · ' + subtype : ''}${classReq !== 'all' ? ' · ' + classReq : ''}
      </div>
    </div>

    <!-- Starting bid -->
    <div style="margin-bottom:8px;">
      <div style="color:#888;font-size:13px;margin-bottom:4px;">Starting Bid (gold):</div>
      <input type="text" inputmode="numeric" pattern="[0-9]*"
        id="ahStartingBid" placeholder="Minimum first bid..."
        style="background:#0a0a00;border:1px solid #3a3a00;color:#c8a000;
               font-family:'VT323',monospace;font-size:18px;
               padding:6px 10px;width:150px;box-sizing:border-box;"
        oninput="this.value=this.value.replace(/[^0-9]/g,'')">
    </div>

    <!-- Buy It Now (optional) -->
    <div style="margin-bottom:10px;">
      <div style="color:#888;font-size:13px;margin-bottom:4px;">
        Buy It Now Price <span style="color:#444;font-size:11px;">(optional — leave blank for auction only)</span>
      </div>
      <input type="text" inputmode="numeric" pattern="[0-9]*"
        id="ahBuyNowInput" placeholder="Instant purchase price..."
        style="background:#0a0a00;border:1px solid #2a3a00;color:#c8a000;
               font-family:'VT323',monospace;font-size:16px;
               padding:6px 10px;width:180px;box-sizing:border-box;"
        oninput="this.value=this.value.replace(/[^0-9]/g,'')">
    </div>

    <!-- Duration dropdown -->
    <div style="margin-bottom:10px;">
      <div style="color:#888;font-size:13px;margin-bottom:4px;">Duration:</div>
      <select id="ahDurationSelect"
        onchange="_ahOnDurationChange(this.value)"
        style="background:#0a0a00;border:1px solid #3a3a00;color:#c8a000;
               font-family:'VT323',monospace;font-size:14px;
               padding:5px 8px;width:100%;box-sizing:border-box;cursor:pointer;">
        ${durationOpts}
      </select>
      <div id="ahFeePreview"
        style="color:#555;font-size:11px;margin-top:4px;
               font-family:'Courier New',monospace;">
        ${currentFeeInfo.label} · Fee: ${currentFeeInfo.fee}g · Charged immediately
      </div>
    </div>

    <!-- Fine print — one line -->
    <div style="border-top:1px solid #1a1a00;padding-top:6px;margin-bottom:10px;
                font-size:11px;color:#444;line-height:1.6;">
      10% house cut on sale · Unsold items returned via mailbox · Cancel anytime
    </div>

    <div style="display:flex;gap:8px;">
      <button onclick="_ahSubmitListing()"
        style="background:#0a0a00;border:1px solid #3a5a00;color:#8aaa00;
               font-family:'VT323',monospace;font-size:15px;
               padding:8px 20px;cursor:pointer;">
        📦 LIST ITEM
      </button>
      <button onclick="_ahSellStep='pick';_ahSelectedMinutes=720;_ahUpdateBody();"
        style="background:none;border:1px solid #2a2a2a;color:#444;
               font-family:'VT323',monospace;font-size:15px;
               padding:8px 14px;cursor:pointer;">
        Cancel
      </button>
    </div>`;
}

// ── Duration dropdown change handler ──────────────────────────────────────
function _ahOnDurationChange(val) {
  _ahSelectedMinutes = parseInt(val);
  const info         = AH_LISTING_FEES[_ahSelectedMinutes];
  if (!info) return;
  const preview = document.getElementById('ahFeePreview');
  if (preview) {
    preview.textContent = info.label + ' · Fee: ' + info.fee + 'g · Charged immediately';
  }
}

// ── Item preview modal ────────────────────────────────────────────────────
function _ahShowItemModal(itemObj) {
  try {
    const existing = document.getElementById('ahItemModal');
    if (existing) existing.remove();

    let item = itemObj || _ahSellItem;
    if (!item) { console.warn('_ahShowItemModal: no item to show'); return; }

    if (item.item_data && typeof item.item_data === 'string') {
      try { item = JSON.parse(item.item_data); } catch(e) { console.error('Failed to parse item_data:', e); }
    }

    const p = gameState.player;
    let isWeapon = false, isArmor = false;

    if (item.item_type === 'weapon') isWeapon = true;
    else if (item.item_type === 'armor') isArmor = true;
    else if (item.weaponId || item.baseDamage !== undefined || item.type === 'weapon') isWeapon = true;
    else if (item.armorId || item.baseDefense !== undefined || item.type === 'armor') isArmor = true;

    if (!isWeapon && !isArmor && item.instanceId) {
      if (typeof WEAPONS !== 'undefined' && WEAPONS[item.instanceId]) isWeapon = true;
      else if (typeof ARMOR !== 'undefined' && ARMOR[item.instanceId]) isArmor = true;
    }

    if (!isWeapon && !isArmor && item.name) {
      const n = item.name.toLowerCase();
      if (n.includes('sword')||n.includes('axe')||n.includes('dagger')||n.includes('bow')||
          n.includes('wand')||n.includes('staff')||n.includes('mace')||n.includes('hammer')||
          n.includes('blade')||n.includes('fang')||n.includes('stiletto')||n.includes('piercer')||
          n.includes('reaver')||n.includes('shard')) isWeapon = true;
      else if (n.includes('armor')||n.includes('robe')||n.includes('plate')||n.includes('mail')||
               n.includes('leather')||n.includes('vest')||n.includes('cloak')||n.includes('helm')||
               n.includes('boots')||n.includes('garb')||n.includes('hide')||n.includes('leathers')) isArmor = true;
    }

    if (!isWeapon && !isArmor) { console.warn('Defaulting to weapon'); isWeapon = true; }

    let baseData = null;
    if (isWeapon && typeof WEAPONS !== 'undefined') {
      baseData = (item.weaponId && WEAPONS[item.weaponId])
              || (item.instanceId && WEAPONS[item.instanceId])
              || (item.id && WEAPONS[item.id]) || null;
    } else if (isArmor && typeof ARMOR !== 'undefined') {
      baseData = (item.armorId && ARMOR[item.armorId])
              || (item.instanceId && ARMOR[item.instanceId])
              || (item.id && ARMOR[item.id]) || null;
    }

    const merged  = Object.assign({}, baseData || {}, item);
    const quality = item.quality || (baseData && baseData.quality) || 'normal';
    const qc      = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality]) || { color: '#888888', bonusPct: 0 };
    const color   = qc.color || '#888888';
    const name    = item.name || (baseData && baseData.name) || 'Unknown Item';
    const level   = item.level || (baseData && baseData.level) || 1;
    const subtype = merged.weaponSubtype || merged.armorType || merged.subtype || '';
    const icon    = isWeapon ? '⚔️' : '🛡️';

    let statLine = '';
    if (isWeapon) {
      try {
        statLine = typeof buildWeaponDmgLine === 'function'
          ? buildWeaponDmgLine(merged, quality, p)
          : '<span style="color:#aaa;">DMG: ' + (merged.baseDamage||0) + '–' + (merged.maxDamage||0) + '</span>';
      } catch(e) {
        statLine = '<span style="color:#aaa;">DMG: ' + (merged.baseDamage||0) + '–' + (merged.maxDamage||0) + '</span>';
      }
    } else {
      try {
        statLine = typeof buildArmorDefLine === 'function'
          ? buildArmorDefLine(merged, p)
          : '<span style="color:#aaa;">DEF: ' + (merged.baseDefense||0) + '</span>';
      } catch(e) {
        statLine = '<span style="color:#aaa;">DEF: ' + (merged.baseDefense||0) + '</span>';
      }
    }

    let hpMpHtml = '';
    if ((merged.bonusHp||0) > 0 || (merged.bonusMp||0) > 0) {
      hpMpHtml = '<div style="margin-top:4px;font-size:12px;color:#88ff88;">';
      if (merged.bonusHp > 0) hpMpHtml += '❤️ +' + merged.bonusHp + ' HP &nbsp;';
      if (merged.bonusMp > 0) hpMpHtml += '✨ +' + merged.bonusMp + ' MP';
      hpMpHtml += '</div>';
    }

    let modHtml = '';
    const mods = merged.modifiers || [];
    if (mods.length > 0) {
      modHtml = '<div style="margin-top:6px;border-top:1px solid ' + color + '33;padding-top:6px;">';
      mods.forEach(function(mod) {
        if (!mod) return;
        const mc = mod.color || '#FFD700';
        let txt = mod.name || '';
        if (mod.minDamage !== undefined) txt += ' (' + mod.minDamage + '–' + mod.maxDamage + ')';
        if (mod.critBonus)               txt += ' (+' + mod.critBonus + '% crit)';
        if (mod.lifestealPercent)        txt += ' (' + mod.lifestealPercent + '% lifesteal)';
        if (mod.statusEffect)            txt += ' — ' + mod.statusEffect;
        if (mod.value !== undefined)     txt += ': ' + mod.value + (mod.statType === 'percent' ? '%' : '');
        modHtml += '<div style="color:' + mc + ';font-size:12px;margin-bottom:3px;">'
          + (mod.icon || '✨') + ' ' + txt + '</div>';
      });
      modHtml += '</div>';
    }

    // ─── THIS IS THE MISSING GEM SECTION ───
    let gemHtml = '';
    const gems = merged.gems || [];
    if (gems.length > 0) {
      gemHtml = '<div style="margin-top:6px;border-top:1px solid ' + color + '33;padding-top:6px;">';
      gems.forEach(function(gem) {
        if (!gem) return;
        gemHtml += '<div style="color:' + (gem.color||'#FFD700') + ';font-size:11px;margin-bottom:2px;">'
          + (gem.emoji||'💎') + ' ' + (gem.name||'Gem') + ': ' + (gem.description||'socketed') + '</div>';
      });
      gemHtml += '</div>';
    }

    let classHtml = '';
    const classReq = merged.classRestriction || merged.allowedClasses;
    if (classReq) {
      const cr = Array.isArray(classReq) ? classReq.join(', ') : classReq;
      if (cr && cr !== 'all' && cr !== 'undefined') {
        classHtml = '<div style="color:#446644;font-size:11px;margin-top:4px;'
          + 'font-family:Courier New,monospace;">Class: ' + cr + '</div>';
      }
    }

    const modal = document.createElement('div');
    modal.id = 'ahItemModal';
    modal.style.cssText = 'position:fixed;inset:0;background:#000000dd;z-index:10001;'
      + 'display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';

    const inner = document.createElement('div');
    inner.style.cssText = 'background:#070f07;border:2px solid ' + color + ';border-radius:8px;'
      + 'padding:14px 16px;max-width:320px;width:100%;font-family:VT323,monospace;'
      + 'position:relative;box-shadow:0 0 40px ' + color + '44;max-height:85vh;overflow-y:auto;';

    inner.innerHTML = ''
      + '<button id="ahModalClose" style="position:absolute;top:8px;right:10px;background:none;'
      + 'border:none;color:#666;font-size:20px;cursor:pointer;line-height:1;z-index:1;">✕</button>'
      + '<div style="display:inline-block;background:' + color + '18;border:1px solid ' + color + '44;'
      + 'color:' + color + ';font-size:9px;letter-spacing:1px;padding:1px 6px;'
      + 'font-family:Courier New,monospace;margin-bottom:6px;">' + quality.toUpperCase() + '</div>'
      + '<div style="color:' + color + ';font-size:19px;font-weight:bold;margin-bottom:4px;'
      + 'padding-right:28px;">' + icon + ' ' + name + '</div>'
      + '<div style="color:#555;font-size:11px;font-family:Courier New,monospace;margin-bottom:6px;">'
      + 'LV' + level + (subtype ? ' · ' + subtype : '') + '</div>'
      + '<div style="font-size:13px;margin-bottom:4px;">' + statLine + '</div>'
      + hpMpHtml + classHtml + modHtml + gemHtml
      + '<div style="color:#2a2a2a;font-size:10px;margin-top:12px;text-align:center;'
      + 'font-family:Courier New,monospace;">tap outside to close</div>';

    modal.appendChild(inner);
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    const closeBtn = document.getElementById('ahModalClose');
    if (closeBtn) closeBtn.addEventListener('click', function() { modal.remove(); });

  } catch(err) {
    console.error('_ahShowItemModal failed:', err);
    const fb = document.createElement('div');
    fb.id = 'ahItemModal';
    fb.style.cssText = 'position:fixed;inset:0;background:#000c;z-index:10001;'
      + 'display:flex;align-items:center;justify-content:center;padding:20px;';
    fb.innerHTML = '<div style="background:#111;border:1px solid #888;padding:16px;'
      + 'font-family:VT323,monospace;color:#aaa;max-width:300px;width:100%;">'
      + 'Item data could not be displayed. Check console.'
      + '<br><button id="ahFbClose" style="margin-top:12px;background:none;border:1px solid #444;'
      + 'color:#888;font-family:VT323,monospace;font-size:14px;padding:4px 12px;cursor:pointer;">'
      + 'Close</button></div>';
    fb.addEventListener('click', function(e) { if (e.target === fb) fb.remove(); });
    document.body.appendChild(fb);
    const fbClose = document.getElementById('ahFbClose');
    if (fbClose) fbClose.addEventListener('click', function() { fb.remove(); });
  }
}


let _ahSelectedMinutes = 720; // default 12h

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
              <span data-preview-listing="${listing.listing_id}"
                    style="color:${color};font-size:13px;cursor:pointer;
                           border-bottom:1px dotted ${color}88;padding-bottom:1px;">
                ${icon} ${listing.item_name}
              </span>
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
          <span data-preview-history="${p.listing_id || ''}"
                data-preview-name="${p.item_name}"
                data-preview-quality="${p.item_quality}"
                data-preview-type="${p.item_type}"
                data-preview-level="${p.item_level||1}"
                style="color:${color};font-size:13px;cursor:pointer;
                       border-bottom:1px dotted ${color}88;padding-bottom:1px;">
            ${icon} ${p.item_name}
          </span>
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

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
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

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
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

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
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
    action:         'ah_resolve_expired',
    character_id:   charId,
    character_name: pName,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok && data.resolved > 0) {
        if (typeof _mailUnreadCount !== 'undefined' && typeof _mailUpdateBadge === 'function') {
          _mailUnreadCount = (_mailUnreadCount || 0) + data.resolved;
          _mailUpdateBadge();
        }
        _ahSetStatus(data.resolved + ' auction'
          + (data.resolved > 1 ? 's' : '') + ' settled — check your mailbox! 📬', false);
      }
    })
    .catch(function() {});
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

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
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

  const startingBidInput = document.getElementById('ahStartingBid');
  const buyNowInput      = document.getElementById('ahBuyNowInput');
  const startingBid = parseInt(startingBidInput?.value) || 0;
  const buyNowPrice = parseInt(buyNowInput?.value)      || 0;
  if (startingBid < 1) {
    _ahSetStatus('Please enter a starting bid (minimum 1g).', true);
    return;
  }
  if (buyNowPrice > 0 && buyNowPrice <= startingBid) {
    _ahSetStatus('Buy It Now price must be higher than the starting bid.', true);
    return;
  }

  const durationMinutes = _ahSelectedMinutes || 720;
  const listingFee      = AH_LISTING_FEES[durationMinutes]?.fee || 50;

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
    starting_bid:   startingBid,
    buy_now_price:  buyNowPrice,
    duration_minutes: durationMinutes,
    player_gold:    p.gold, // post-deduction (server validates)
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        const bidStr = startingBid.toLocaleString() + 'g'
          + (buyNowPrice > 0 ? ' (Buy Now: ' + buyNowPrice.toLocaleString() + 'g)' : '');
        _ahSetStatus('✅ ' + name + ' listed! Starting bid: ' + bidStr, false);
        _ahSellItem = null;
        _ahSellStep = 'pick';
        _ahSelectedMinutes = 720;
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

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
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
  if (!body) return;
  body.innerHTML = _ahRenderTab();
  _ahWirePreviewButtons(body);
  _ahWireBidButtons(body);
}

// Wire all clickable item names — survives any innerHTML render
function _ahWirePreviewButtons(container) {
  if (!container) return;

  // Sell confirm screen — item name span
  const confirmName = container.querySelector('#ahPreviewBtn');
  if (confirmName) {
    confirmName.addEventListener('click', function() {
      _ahShowItemModal(_ahSellItem);
    });
  }

  // Sell pick screen — name spans by data-preview-idx
  container.querySelectorAll('[data-preview-idx]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      const idx  = parseInt(el.getAttribute('data-preview-idx'));
      const item = (window._ahSellPreviewItems || {})[idx];
      if (item) _ahShowItemModal(item);
    });
  });

  // Browse + My Listings — name spans by data-preview-listing
  container.querySelectorAll('[data-preview-listing]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      const id      = el.getAttribute('data-preview-listing');
      const listing = (window._ahBrowseListings || {})[id]
                   || (window._ahMyListings || []).find(l => l.listing_id === id);
      if (listing) _ahShowItemModal(listing);
    });
  });

  // History — name spans show summary (no item_data available)
  container.querySelectorAll('[data-preview-history]').forEach(function(el) {
    el.addEventListener('click', function() {
      // Build a minimal item-like object from the data attributes
      _ahShowItemModal({
        item_type:    el.getAttribute('data-preview-type'),
        item_name:    el.getAttribute('data-preview-name'),
        item_quality: el.getAttribute('data-preview-quality'),
        item_level:   parseInt(el.getAttribute('data-preview-level')) || 1,
        name:         el.getAttribute('data-preview-name'),
        quality:      el.getAttribute('data-preview-quality'),
        level:        parseInt(el.getAttribute('data-preview-level')) || 1,
        type:         el.getAttribute('data-preview-type'),
      });
    });
  });
}

function _ahRemoveOverlay() {
  const existing = document.getElementById('ahOverlay');
  if (existing) existing.remove();
}

function _ahClose() {
  _ahRemoveOverlay();
}

// ═══════════════════════════════════════════════════════════════════════════
// BID MODAL + HANDLERS
// ═══════════════════════════════════════════════════════════════════════════

function _ahShowBidModal(listingId, minBid, itemName) {
  const existing = document.getElementById('ahBidModal');
  if (existing) existing.remove();

  const p      = gameState.player;
  const canAfford = p.gold >= minBid;

  const modal = document.createElement('div');
  modal.id = 'ahBidModal';
  modal.style.cssText = 'position:fixed;inset:0;background:#000000dd;z-index:10001;'
    + 'display:flex;align-items:center;justify-content:center;'
    + 'padding:16px;box-sizing:border-box;';

  const inner = document.createElement('div');
  inner.style.cssText = 'background:#070a07;border:2px solid #3a5a3a;border-radius:8px;'
    + 'padding:16px;max-width:300px;width:100%;font-family:VT323,monospace;position:relative;';

  inner.innerHTML = ''
    + '<div style="color:#8aaa00;font-size:18px;font-weight:bold;margin-bottom:8px;">'
    + 'Place Bid</div>'
    + '<div style="color:#666;font-size:13px;margin-bottom:10px;font-family:Courier New,monospace;">'
    + itemName + '</div>'
    + '<div style="color:#888;font-size:13px;margin-bottom:4px;">'
    + 'Minimum bid: <span style="color:#c8a000;">' + minBid.toLocaleString() + 'g</span></div>'
    + '<div style="color:#555;font-size:11px;margin-bottom:10px;font-family:Courier New,monospace;">'
    + 'Your gold: ' + p.gold.toLocaleString() + 'g<br>'
    + 'Enter your MAX bid — system auto-bids the minimum needed to stay ahead.</div>'
    + '<input type="text" inputmode="numeric" id="ahBidInput"'
    + ' placeholder="' + minBid + '"'
    + ' style="background:#0a0a00;border:1px solid #3a5a3a;color:#c8a000;'
    + 'font-family:VT323,monospace;font-size:18px;padding:6px 10px;'
    + 'width:100%;box-sizing:border-box;margin-bottom:10px;"'
    + ' oninput="this.value=this.value.replace(/[^0-9]/g,\'\')">'
    + '<div style="display:flex;gap:8px;">'
    + '<button id="ahBidConfirmBtn"'
    + ' style="background:#0a0a00;border:1px solid #3a5a3a;color:#8aaa00;'
    + 'font-family:VT323,monospace;font-size:15px;padding:7px 16px;cursor:pointer;flex:1;">'
    + 'PLACE BID</button>'
    + '<button id="ahBidCancelBtn"'
    + ' style="background:none;border:1px solid #2a2a2a;color:#444;'
    + 'font-family:VT323,monospace;font-size:15px;padding:7px 14px;cursor:pointer;">'
    + 'Cancel</button>'
    + '</div>'
    + '<div id="ahBidStatus" style="color:#ff4444;font-size:12px;margin-top:8px;'
    + 'font-family:Courier New,monospace;min-height:16px;"></div>';

  modal.appendChild(inner);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);

  document.getElementById('ahBidCancelBtn').addEventListener('click', function() {
    modal.remove();
  });

  document.getElementById('ahBidConfirmBtn').addEventListener('click', function() {
    const maxBid = parseInt(document.getElementById('ahBidInput').value) || 0;
    if (maxBid < minBid) {
      document.getElementById('ahBidStatus').textContent = 'Minimum bid is ' + minBid.toLocaleString() + 'g';
      return;
    }
    if (maxBid > p.gold) {
      document.getElementById('ahBidStatus').textContent = 'Not enough gold (have ' + p.gold.toLocaleString() + 'g)';
      return;
    }
    _ahPlaceBid(listingId, maxBid, itemName, modal);
  });

  // Focus the input
  setTimeout(function() {
    const input = document.getElementById('ahBidInput');
    if (input) input.focus();
  }, 100);
}

function _ahPlaceBid(listingId, maxBid, itemName, modal) {
  const p      = gameState.player;
  const charId = p.characterId || p.id || '';
  const confirmBtn = document.getElementById('ahBidConfirmBtn');
  if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.textContent = 'Bidding...'; }

  const params = new URLSearchParams({
    action:       'ah_bid',
    listing_id:   listingId,
    character_id: charId,
    bidder_name:  p.name || 'Unknown',
    max_bid:      maxBid,
    player_gold:  p.gold,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        if (data.you_are_winning) {
          // Deduct full max_bid immediately (escrow model)
          // Winner gets overpayment back via mailbox when auction ends
          p.gold -= maxBid;
          if (typeof saveGame === 'function') saveGame();
          if (modal) modal.remove();
          _ahSetStatus('You are the highest bidder on ' + itemName + '!'
            + ' Current price: ' + data.new_current_bid.toLocaleString() + 'g'
            + ' | Your max: ' + maxBid.toLocaleString() + 'g held', false);
        } else {
          // Lost proxy battle — full maxBid refunded via mailbox immediately
          if (typeof _mailUnreadCount !== 'undefined' && typeof _mailUpdateBadge === 'function') {
            _mailUnreadCount = (_mailUnreadCount || 0) + 1;
            _mailUpdateBadge();
          }
          if (modal) modal.remove();
          _ahSetStatus('You were outbid on ' + itemName + '. Your '
            + maxBid.toLocaleString() + 'g has been returned to your mailbox.', false);
        }
        // Refresh browse list
        _ahLastFetch = 0;
        _ahFetchBrowse(true);
      } else {
        const statusEl = document.getElementById('ahBidStatus');
        if (statusEl) statusEl.textContent = data.error || 'Bid failed';
        if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = 'PLACE BID'; }
      }
    })
    .catch(function() {
      const statusEl = document.getElementById('ahBidStatus');
      if (statusEl) statusEl.textContent = 'Network error. Please try again.';
      if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = 'PLACE BID'; }
    });
}

function _ahCloseBidModal() {
  const m = document.getElementById('ahBidModal');
  if (m) m.remove();
}

// ── Buy It Now handler (client-side) ──────────────────────────────────────
function _ahBuyNow(listingId, price, itemName) {
  const p = gameState.player;
  if (p.gold < price) {
    _ahSetStatus('Not enough gold for Buy It Now (' + price.toLocaleString() + 'g needed).', true);
    return;
  }
  if (!confirm('Buy ' + itemName + ' instantly for ' + price.toLocaleString() + 'g?')) return;

  const charId = p.characterId || p.id || '';
  const params = new URLSearchParams({
    action:       'ah_bid',  // server detects buy-it-now when maxBid >= buyNowPrice
    listing_id:   listingId,
    character_id: charId,
    bidder_name:  p.name || 'Unknown',
    max_bid:      price,
    player_gold:  p.gold,
  });

  fetch(AH_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok && data.buy_now) {
        p.gold -= price;
        if (typeof saveGame === 'function') saveGame();
        if (typeof _mailUnreadCount !== 'undefined' && typeof _mailUpdateBadge === 'function') {
          _mailUnreadCount = (_mailUnreadCount || 0) + 1;
          _mailUpdateBadge();
        }
        _ahSetStatus('Purchased! ' + itemName + ' sent to your mailbox. 📬', false);
        _ahLastFetch = 0;
        _ahFetchBrowse(true);
      } else {
        _ahSetStatus('Purchase failed: ' + (data.error || 'Unknown error'), true);
      }
    })
    .catch(function() {
      _ahSetStatus('Network error during purchase.', true);
    });
}

// ── Wire bid + buy-now buttons in browse listings ─────────────────────────
function _ahWireBidButtons(container) {
  if (!container) return;

  container.querySelectorAll('[data-bid-listing]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const listingId = btn.getAttribute('data-bid-listing');
      const minBid    = parseInt(btn.getAttribute('data-min-bid')) || 1;
      const itemName  = btn.getAttribute('data-item-name') || 'Item';
      _ahShowBidModal(listingId, minBid, itemName);
    });
  });

  container.querySelectorAll('[data-buynow-listing]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const listingId = btn.getAttribute('data-buynow-listing');
      const price     = parseInt(btn.getAttribute('data-buynow-price')) || 0;
      const itemName  = btn.getAttribute('data-item-name') || 'Item';
      _ahBuyNow(listingId, price, itemName);
    });
  });
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
window._ahShowItemModal          = _ahShowItemModal;
window._ahPlaceBid               = _ahPlaceBid;
window._ahBuyNow                 = _ahBuyNow;
window._ahWireBidButtons         = _ahWireBidButtons;
window._ahShowBidModal           = _ahShowBidModal;
window._ahCloseBidModal          = _ahCloseBidModal;
window._ahWirePreviewButtons     = _ahWirePreviewButtons;
window._ahSellSetFilter          = _ahSellSetFilter;
window._ahOnDurationChange       = _ahOnDurationChange;
