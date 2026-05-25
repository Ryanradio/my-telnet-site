// ═══════════════════════════════════════════════════════════════════════════
// CALAMITY DUNGEON — MAILBOX SYSTEM
// mailbox.js
//
// TO LOAD: add <script src="mailbox.js"></script> to index.html
//          AFTER auctionhouse.js
//
// TO INIT: call initMailbox() once after gameState.player is loaded
//          (on login / character load)
//
// TO ADD BUTTON IN TOWN: call renderMailboxButton() wherever your
//          town screen buttons are rendered
//
// DEPENDS ON: gameState.player.characterId (or .id), gameState.player.gold,
//             gameState.player.inventory, saveGame(), AH_SCRIPT_URL
// ═══════════════════════════════════════════════════════════════════════════

// ── Script URL — defined here at top so all functions can use it ─────────
// Uses AH_SCRIPT_URL if auctionhouse.js is loaded, otherwise uses own copy.
// If you change your Apps Script URL, update it here AND in auctionhouse.js.
const _MAIL_SCRIPT_URL = (typeof AH_SCRIPT_URL !== 'undefined' && AH_SCRIPT_URL)
  ? AH_SCRIPT_URL
  : 'https://script.google.com/macros/s/AKfycbwh7_fSt6gRjObMZCvNLUOcwJpfVgzpeAC7InjPR0E51B7CRpFNj-Qvbe_LL8WR3AhaKg/exec';

// ── Internal state ────────────────────────────────────────────────────────
let _mailUnreadCount  = 0;
let _mailItems        = [];       // cached fetch results
let _mailLoading      = false;
let _mailStatusMsg    = '';
let _mailStatusIsErr  = false;
let _mailInitDone     = false;    // prevent double-init on same session
let _mailActiveTab    = 'mail';   // 'mail' | 'announcements'

// Announcements state
let _annItems         = [];       // cached announcements
let _annUnreadCount   = 0;
let _annLoading       = false;

// ── Toast timeout handle ──────────────────────────────────────────────────
let _mailToastTimer = null;

// ═══════════════════════════════════════════════════════════════════════════
// INIT — call once on login/character load
// Fetches unread count, updates badge, shows login toast if mail waiting
// ═══════════════════════════════════════════════════════════════════════════
function initMailbox() {
  if (_mailInitDone) return;
  _mailInitDone = true;

  const charId = _mailCharId();
  if (!charId) return;

  const params = new URLSearchParams({
    action:       'mail_count',
    character_id: charId,
  });

  fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        _mailUnreadCount = data.count || 0;
        _mailUpdateBadge();
      }
    })
    .catch(() => {});

  // Also fetch announcement unread count
  const annParams = new URLSearchParams({
    action:       'ann_count',
    character_id: charId,
  });
  fetch(_MAIL_SCRIPT_URL + '?' + annParams.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        _annUnreadCount = data.count || 0;
        _mailUpdateBadge();
      }
    })
    .catch(() => {});
}

// Call this whenever the town screen re-renders to reset the init gate
// so the badge re-checks on next town visit after a dungeon run etc.
function resetMailboxInit() {
  _mailInitDone = false;
}

// ═══════════════════════════════════════════════════════════════════════════
// TOWN BUTTON — returns HTML string, call inside your town renderer
// ═══════════════════════════════════════════════════════════════════════════
function renderMailboxButton() {
  const hasUnread = _mailUnreadCount > 0;
  const countStr  = _mailUnreadCount > 99 ? '99+' : _mailUnreadCount;

  return `
    <button onclick="openMailbox()" id="mailboxBtn"
      style="background:#060606;
             border:1px solid ${hasUnread ? '#ff4444' : '#446644'};
             color:${hasUnread ? '#ff8888' : '#88aa88'};
             font-family:'VT323',monospace;font-size:14px;
             padding:6px 14px;cursor:pointer;letter-spacing:1px;
             position:relative;white-space:nowrap;">
      📬 MAILBOX${hasUnread
        ? ` <span id="mailBadge" style="
              display:inline-block;
              background:#ff4444;color:#fff;
              font-size:10px;font-family:'Courier New',monospace;
              border-radius:10px;padding:1px 5px;
              font-weight:bold;vertical-align:middle;
              margin-left:4px;line-height:1.4;">${countStr}</span>`
        : `<span id="mailBadge" style="display:none;"></span>`}
    </button>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// OPEN MAILBOX OVERLAY
// ═══════════════════════════════════════════════════════════════════════════
function openMailbox(startTab) {
  _mailStatusMsg = '';
  _mailItems     = [];
  _mailActiveTab = startTab || 'mail';
  _mailRender();
  _mailFetch();
  _annFetch();
}

// ═══════════════════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════════════════
function _mailRender() {
  _mailRemoveOverlay();

  const overlay = document.createElement('div');
  overlay.id = 'mailOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:#000000ee;z-index:9100;
    display:flex;flex-direction:column;font-family:'VT323',monospace;
    overflow:hidden;
  `;

  overlay.innerHTML = `
    <!-- Header -->
    <div style="background:#040a04;border-bottom:2px solid #446644;
                padding:10px 14px;display:flex;align-items:center;
                justify-content:space-between;flex-shrink:0;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="color:#88aa88;font-size:22px;letter-spacing:2px;">📬 MAILBOX</span>
        <span id="mailHeaderCount" style="color:#446644;font-size:13px;
              font-family:'Courier New',monospace;">
          ${_mailUnreadCount > 0 ? _mailUnreadCount + ' unclaimed' : ''}
        </span>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button onclick="_mailClaimAll()"
          id="mailClaimAllBtn"
          style="background:#040a04;border:1px solid #2a4a2a;color:#669966;
                 font-family:'VT323',monospace;font-size:13px;
                 padding:4px 12px;cursor:pointer;
                 display:${_mailActiveTab === 'mail' && _mailUnreadCount > 0 ? 'block' : 'none'};">
          ✅ CLAIM ALL
        </button>
        <button onclick="_mailClose()"
          style="background:none;border:1px solid #2a2a2a;color:#666;
                 font-family:'VT323',monospace;font-size:16px;
                 padding:3px 10px;cursor:pointer;">✕ CLOSE</button>
      </div>
    </div>

    <!-- Tabs -->
    <div style="display:flex;background:#020802;border-bottom:1px solid #1a2a1a;flex-shrink:0;">
      <button onclick="_mailSwitchTab('mail')"
        style="background:${_mailActiveTab==='mail'?'#040a04':'none'};
               border:none;border-bottom:2px solid ${_mailActiveTab==='mail'?'#446644':'transparent'};
               color:${_mailActiveTab==='mail'?'#88aa88':'#446644'};
               font-family:'VT323',monospace;font-size:14px;
               padding:7px 16px;cursor:pointer;flex:1;">
        📬 Mail${_mailUnreadCount > 0 ? ' (' + _mailUnreadCount + ')' : ''}
      </button>
      <button onclick="_mailSwitchTab('announcements')"
        style="background:${_mailActiveTab==='announcements'?'#0a0800':'none'};
               border:none;border-bottom:2px solid ${_mailActiveTab==='announcements'?'#c8a000':'transparent'};
               color:${_mailActiveTab==='announcements'?'#c8a000':'#664400'};
               font-family:'VT323',monospace;font-size:14px;
               padding:7px 16px;cursor:pointer;flex:1;">
        📢 News${_annUnreadCount > 0 ? ' (' + _annUnreadCount + ')' : ''}
      </button>
    </div>

    <!-- Status bar -->
    <div id="mailStatus"
      style="flex-shrink:0;min-height:22px;padding:3px 14px;font-size:12px;
             background:#020802;display:${_mailStatusMsg ? 'block' : 'none'};
             color:${_mailStatusIsErr ? '#ff4444' : '#88ff88'};">
      ${_mailStatusMsg}
    </div>

    <!-- Body -->
    <div id="mailBody"
      style="flex:1;overflow-y:auto;padding:10px 12px;">
      <div style="color:#333;text-align:center;padding:30px;">Loading...</div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function _mailRenderBody() {
  if (_mailActiveTab === 'announcements') { _annRenderBody(); return; }

  const body = document.getElementById('mailBody');
  if (!body) return;

  if (_mailLoading) {
    body.innerHTML = '<div style="color:#333;text-align:center;padding:30px;font-size:15px;">'
      + 'Loading mail...</div>';
    return;
  }

  if (_mailItems.length === 0) {
    body.innerHTML = '<div style="color:#2a2a2a;text-align:center;padding:40px;font-size:16px;">'
      + '📭 Your mailbox is empty.<br>'
      + '<span style="font-size:12px;color:#1a1a1a;">'
      + 'Items and gold from the Auction House will appear here.</span></div>';
    return;
  }

  body.innerHTML = _mailItems.map(mail => _mailRenderRow(mail)).join('');

  // Wire "Bid Again" buttons
  body.querySelectorAll('[data-bidagain-listing]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const listingId = btn.getAttribute('data-bidagain-listing');
      const minBid    = parseInt(btn.getAttribute('data-bidagain-min')) || 1;
      const itemName  = btn.getAttribute('data-bidagain-name') || 'Item';
      // Close mailbox, open AH on Browse tab, then open bid modal
      _mailClose();
      if (typeof openAuctionHouse === 'function') {
        openAuctionHouse();
        // Small delay to let AH render then open the bid modal
        setTimeout(function() {
          if (typeof _ahShowBidModal === 'function') {
            _ahShowBidModal(listingId, minBid, itemName);
          }
        }, 600);
      }
    });
  });
}

function _mailRenderRow(mail) {
  const isGold   = mail.type === 'gold';
  const isItem   = mail.type === 'item';
  const isSys    = mail.type === 'system';

  const typeIcon  = isGold ? '💰' : isItem ? '📦' : '📜';
  const typeColor = isGold ? '#c8a000' : isItem ? '#88aaff' : '#88aa88';
  const borderCol = isGold ? '#2a2000' : isItem ? '#00152a' : '#0a150a';
  const bgCol     = isGold ? '#080600' : isItem ? '#020810' : '#040804';

  const timeLeft  = _mailTimeLeft(mail.expires_at);
  const sentDate  = mail.sent_at ? new Date(mail.sent_at).toLocaleDateString() : '?';

  // Item quality color if applicable
  let itemQualityBadge = '';
  if (isItem && mail.item_data) {
    try {
      const itemObj = JSON.parse(mail.item_data);
      const quality = itemObj.quality || 'normal';
      const qc = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality]) || {};
      const qColor = qc.color || '#888';
      itemQualityBadge = `<span style="display:inline-block;background:${qColor}18;
        border:1px solid ${qColor}44;color:${qColor};font-size:9px;
        letter-spacing:1px;padding:0 4px;font-family:'Courier New',monospace;
        margin-right:4px;">${quality.toUpperCase()}</span>`;
    } catch(e) {}
  }

  const goldLine = isGold && mail.gold_amount > 0
    ? `<div style="color:#c8a000;font-size:15px;margin-top:4px;
                   font-family:'Courier New',monospace;">
         +${mail.gold_amount.toLocaleString()}g
       </div>`
    : '';

  const itemLine = isItem && mail.item_name
    ? `<div style="margin-top:3px;">
         ${itemQualityBadge}
         <span style="color:#aaa;font-size:13px;">
           ${mail.item_type === 'weapon' ? '⚔️' : mail.item_type === 'armor' ? '🛡️' : '📦'}
           ${mail.item_name}
         </span>
       </div>`
    : '';

  return `
    <div id="mailRow_${mail.mail_id}"
      style="border:1px solid ${borderCol};background:${bgCol};
             padding:9px 12px;margin-bottom:4px;">
      <div style="display:flex;align-items:flex-start;
                  justify-content:space-between;gap:10px;">

        <!-- Left: content -->
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:6px;
                      margin-bottom:3px;flex-wrap:wrap;">
            <span style="font-size:16px;">${typeIcon}</span>
            <span style="color:${typeColor};font-size:14px;font-weight:bold;">
              ${mail.subject}
            </span>
          </div>
          <div style="color:#555;font-size:11px;margin-bottom:4px;">
            From: <span style="color:#666;">${mail.from_name}</span>
            &nbsp;·&nbsp;
            <span style="font-family:'Courier New',monospace;">${sentDate}</span>
            &nbsp;·&nbsp;
            <span style="color:${_mailExpiryColor(mail.expires_at)};">
              ⏳ ${timeLeft}
            </span>
          </div>
          ${mail.body
            ? `<div style="color:#444;font-size:12px;margin-bottom:4px;
                           font-family:'Courier New',monospace;
                           border-left:2px solid #1a1a1a;padding-left:6px;">
                 ${_mailParseBody(mail.body).text}
               </div>
               ${_mailBidAgainBtn(mail.body)}`
            : ''}
          ${goldLine}
          ${itemLine}
        </div>

        <!-- Right: claim button -->
        <div style="flex-shrink:0;">
          ${isSys
            ? `<button onclick="_mailMarkRead('${mail.mail_id}')"
                 style="background:#040804;border:1px solid #1a2a1a;color:#446644;
                        font-family:'VT323',monospace;font-size:13px;
                        padding:4px 10px;cursor:pointer;">
                 ✓ Read
               </button>`
            : `<button onclick="_mailClaim('${mail.mail_id}')"
                 style="background:#040a04;border:1px solid #2a5a2a;color:#66aa66;
                        font-family:'VT323',monospace;font-size:15px;
                        padding:5px 12px;cursor:pointer;letter-spacing:1px;">
                 CLAIM
               </button>`
          }
        </div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// API CALLS
// ═══════════════════════════════════════════════════════════════════════════
function _mailFetch() {
  _mailLoading = true;
  _mailRenderBody();

  const charId = _mailCharId();
  if (!charId) {
    _mailLoading = false;
    _mailRenderBody();
    return;
  }

  const params = new URLSearchParams({
    action:       'mail_fetch',
    character_id: charId,
  });

  fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      _mailLoading = false;
      if (data.ok) {
        _mailItems       = data.mail || [];
        _mailUnreadCount = _mailItems.filter(m => m.type !== 'system').length;
        _mailUpdateBadge();
        _mailUpdateHeaderCount();
      } else {
        _mailSetStatus('Failed to load mail: ' + (data.error || ''), true);
      }
      _mailRenderBody();
    })
    .catch(() => {
      _mailLoading = false;
      _mailSetStatus('Network error loading mail.', true);
      _mailRenderBody();
    });
}

// ── Claim a single mail ───────────────────────────────────────────────────
function _mailClaim(mailId) {
  const charId = _mailCharId();
  if (!charId) return;

  // Visually disable the button immediately
  const btn = document.querySelector(`#mailRow_${mailId} button`);
  if (btn) { btn.disabled = true; btn.textContent = '...'; }

  const params = new URLSearchParams({
    action:       'mail_claim',
    mail_id:      mailId,
    character_id: charId,
  });

  fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        _mailApplyReward(data);
        _mailSetStatus('✅ ' + data.message, false);

        // Remove row from local cache and DOM
        _mailItems = _mailItems.filter(m => m.mail_id !== mailId);
        const row = document.getElementById('mailRow_' + mailId);
        if (row) {
          row.style.transition = 'opacity 0.3s';
          row.style.opacity = '0';
          setTimeout(() => { row.remove(); _mailCheckEmpty(); }, 320);
        }

        // Update counts
        _mailUnreadCount = Math.max(0, _mailUnreadCount - 1);
        _mailUpdateBadge();
        _mailUpdateHeaderCount();

        if (typeof _ahForceSave === 'function') {
    _ahForceSave().catch(e => console.warn('Mailbox save failed:', e));
}

      } else {
        _mailSetStatus('Claim failed: ' + (data.error || ''), true);
        if (btn) { btn.disabled = false; btn.textContent = 'CLAIM'; }
      }
    })
    .catch(() => {
      _mailSetStatus('Network error. Please try again.', true);
      if (btn) { btn.disabled = false; btn.textContent = 'CLAIM'; }
    });
}

// ── Mark system message as read (no reward) ───────────────────────────────
function _mailMarkRead(mailId) {
  const charId = _mailCharId();
  if (!charId) return;

  const params = new URLSearchParams({
    action:       'mail_claim',
    mail_id:      mailId,
    character_id: charId,
  });

  fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        _mailItems = _mailItems.filter(m => m.mail_id !== mailId);
        const row = document.getElementById('mailRow_' + mailId);
        if (row) {
          row.style.transition = 'opacity 0.3s';
          row.style.opacity = '0';
          setTimeout(() => { row.remove(); _mailCheckEmpty(); }, 320);
        }
        _mailUpdateBadge();
        _mailUpdateHeaderCount();
      }
    })
    .catch(() => {});
}

// ── Claim all mail at once ────────────────────────────────────────────────
function _mailClaimAll() {
  const claimable = _mailItems.filter(m => m.type !== 'system' || true);
  if (claimable.length === 0) return;

  // Disable the button
  const btn = document.getElementById('mailClaimAllBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Claiming...'; }

  // Claim sequentially to avoid race conditions on the sheet
  let idx = 0;
  let claimed = 0;
  let failed  = 0;

  const claimNext = () => {
    if (idx >= claimable.length) {
      // All done
      _mailUnreadCount = 0;
      _mailUpdateBadge();
      _mailUpdateHeaderCount();
      _mailSetStatus(
        '✅ Claimed ' + claimed + ' item' + (claimed !== 1 ? 's' : '') +
        (failed > 0 ? ' (' + failed + ' failed)' : '') + '.',
        failed > 0
      );
      _mailRenderBody();
if (typeof _ahForceSave === 'function') {
    _ahForceSave().catch(e => console.warn('Mailbox save failed:', e));
}
      return;
    }

    const mail   = claimable[idx++];
    const params = new URLSearchParams({
      action:       'mail_claim',
      mail_id:      mail.mail_id,
      character_id: _mailCharId(),
    });

    fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          _mailApplyReward(data);
          _mailItems = _mailItems.filter(m => m.mail_id !== mail.mail_id);
          claimed++;
        } else {
          failed++;
          console.warn('MAIL CLAIM FAILED:', mail.mail_id, data.error);
        }
        claimNext();
      })
      .catch(() => {
        failed++;
        claimNext();
      });
  };

  claimNext();
}

// ═══════════════════════════════════════════════════════════════════════════
// REWARD APPLICATION
// Applies gold or item reward to the player's gameState
// ═══════════════════════════════════════════════════════════════════════════
function _mailApplyReward(claimData) {
  const p = gameState.player;

  if (claimData.type === 'gold' && claimData.gold_amount > 0) {
    p.gold = (p.gold || 0) + claimData.gold_amount;
    console.log('MAIL: Credited ' + claimData.gold_amount + 'g to player. New total: ' + p.gold);
  }

  if (claimData.type === 'item' && claimData.item_data) {
    try {
      const item = JSON.parse(claimData.item_data);
      if (!p.inventory) p.inventory = [];
      p.inventory.push(item);
      console.log('MAIL: Added ' + claimData.item_name + ' to inventory');
    } catch (err) {
      console.error('MAIL: Failed to parse item JSON for ' + claimData.item_name, err);
      _mailSetStatus(
        '⚠️ Could not add ' + claimData.item_name + ' to inventory. Contact support.',
        true
      );
    }
  }

  // system type — no reward, just acknowledgement
}

// ═══════════════════════════════════════════════════════════════════════════
// BADGE — updates the red unread counter on the mailbox button
// ═══════════════════════════════════════════════════════════════════════════
function _mailUpdateBadge() {
  const totalUnread = _mailUnreadCount + _annUnreadCount;
  const badges = document.querySelectorAll('#mailBadge');
  const btn    = document.getElementById('mailboxBtn');
  const count  = totalUnread > 99 ? '99+' : totalUnread;

  badges.forEach(badge => {
    if (totalUnread > 0) {
      badge.textContent   = count;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  });

  if (btn) {
    btn.style.borderColor = totalUnread > 0 ? '#ff4444' : '#446644';
    btn.style.color       = totalUnread > 0 ? '#ff8888' : '#88aa88';
  }
}

function _mailUpdateHeaderCount() {
  const el = document.getElementById('mailHeaderCount');
  if (el) {
    el.textContent = _mailUnreadCount > 0 ? _mailUnreadCount + ' unclaimed' : '';
  }
  const btn = document.getElementById('mailClaimAllBtn');
  if (btn) btn.style.display = _mailUnreadCount > 0 ? 'block' : 'none';
}

function _mailCheckEmpty() {
  if (_mailItems.length === 0) _mailRenderBody();
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGIN TOAST — shown once on login if unread mail exists
// ═══════════════════════════════════════════════════════════════════════════
function _mailShowLoginToast(count) {
  // Remove any existing toast
  const existing = document.getElementById('mailLoginToast');
  if (existing) existing.remove();
  if (_mailToastTimer) clearTimeout(_mailToastTimer);

  const toast = document.createElement('div');
  toast.id = 'mailLoginToast';
  toast.style.cssText = `
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
    background:#040a04;border:2px solid #446644;
    color:#88aa88;font-family:'VT323',monospace;font-size:16px;
    padding:10px 20px;z-index:9999;
    box-shadow:0 0 20px rgba(0,0,0,0.8);
    white-space:nowrap;letter-spacing:1px;
    animation:mailToastIn 0.3s ease;
    cursor:pointer;
  `;
  toast.innerHTML = `📬 You have <span style="color:#c8a000;">${count}</span>
    unclaimed mail${count !== 1 ? 's' : ''}! &nbsp;
    <span style="color:#446644;font-size:13px;">(Open Mailbox in town)</span>`;

  // Inject keyframe if not present
  if (!document.getElementById('mailToastStyle')) {
    const style = document.createElement('style');
    style.id = 'mailToastStyle';
    style.textContent = `
      @keyframes mailToastIn {
        from { opacity:0; transform:translateX(-50%) translateY(20px); }
        to   { opacity:1; transform:translateX(-50%) translateY(0);    }
      }
      @keyframes mailToastOut {
        from { opacity:1; transform:translateX(-50%) translateY(0);    }
        to   { opacity:0; transform:translateX(-50%) translateY(20px); }
      }
    `;
    document.head.appendChild(style);
  }

  toast.onclick = () => _mailDismissToast();
  document.body.appendChild(toast);

  // Auto-dismiss after 6 seconds
  _mailToastTimer = setTimeout(() => _mailDismissToast(), 6000);
}

function _mailDismissToast() {
  const toast = document.getElementById('mailLoginToast');
  if (!toast) return;
  toast.style.animation = 'mailToastOut 0.3s ease forwards';
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 320);
  if (_mailToastTimer) { clearTimeout(_mailToastTimer); _mailToastTimer = null; }
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════════════════
function _mailCharId() {
  const p = gameState?.player;
  return p?.characterId || p?.id || p?.character_id || '';
}

function _mailTimeLeft(expiresAtStr) {
  if (!expiresAtStr) return '?';
  const diff = new Date(expiresAtStr) - new Date();
  if (diff <= 0) return 'Expired';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 48) return Math.floor(h / 24) + 'd ' + (h % 24) + 'h';
  if (h >= 1)  return h + 'h ' + m + 'm';
  return m + 'm';
}

function _mailExpiryColor(expiresAtStr) {
  if (!expiresAtStr) return '#333';
  const diff = new Date(expiresAtStr) - new Date();
  if (diff <= 0)               return '#ff4444'; // expired
  if (diff < 12 * 3600000)     return '#ff6622'; // under 12h — urgent orange
  if (diff < 24 * 3600000)     return '#c8a000'; // under 24h — yellow warning
  return '#2a3a2a';                               // plenty of time — dark
}

function _mailSetStatus(msg, isError) {
  _mailStatusMsg   = msg;
  _mailStatusIsErr = isError;
  const el = document.getElementById('mailStatus');
  if (el) {
    el.textContent  = msg;
    el.style.color  = isError ? '#ff4444' : '#88ff88';
    el.style.display = msg ? 'block' : 'none';
  }
}

function _mailRemoveOverlay() {
  const existing = document.getElementById('mailOverlay');
  if (existing) existing.remove();
}

function _mailClose() {
  _mailRemoveOverlay();
}

// ── Tab switcher ─────────────────────────────────────────────────────────
function _mailSwitchTab(tab) {
  _mailActiveTab = tab;
  _mailRender();
  if (tab === 'mail')          _mailFetch();
  if (tab === 'announcements') _annFetch();
}

// ── Update _mailRenderBody to route by active tab ─────────────────────────
// (Wraps the existing _mailRenderBody — we replace it below in the expose section)

// ── Announcements fetch ───────────────────────────────────────────────────
function _annFetch() {
  _annLoading = true;
  _annRenderBody();

  const charId = _mailCharId();
  if (!charId) { _annLoading = false; _annRenderBody(); return; }

  const params = new URLSearchParams({
    action:       'ann_fetch',
    character_id: charId,
  });

  fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      _annLoading = false;
      if (data.ok) {
        _annItems       = data.announcements || [];
        _annUnreadCount = data.unread_count  || 0;
        _mailUpdateBadge();
        _mailUpdateHeaderCount();
      }
      _annRenderBody();
    })
    .catch(function() {
      _annLoading = false;
      _annRenderBody();
    });
}

// ── Mark announcement as opened ────────────────────────────────────────────
function _annOpen(messageId) {
  const charId = _mailCharId();
  if (!charId || !messageId) return;

  // Mark opened in local state immediately
  const ann = _annItems.find(function(a) { return a.message_id === messageId; });
  if (ann && !ann.is_opened) {
    ann.is_opened = true;
    _annUnreadCount = Math.max(0, _annUnreadCount - 1);
    _mailUpdateBadge();
    _mailUpdateHeaderCount();
    // Re-render the tab button counts
    // Update tab button text directly by finding it
    const allBtns = document.querySelectorAll('button');
    allBtns.forEach(function(btn) {
      if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('announcements')) {
        btn.textContent = '📢 News' + (_annUnreadCount > 0 ? ' (' + _annUnreadCount + ')' : '');
      }
    });
  }

  // Tell server (fire-and-forget)
  const params = new URLSearchParams({
    action:       'ann_open',
    character_id: charId,
    message_id:   messageId,
  });
  fetch(_MAIL_SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' })
    .catch(function() {});
}

// ── Render announcements body ─────────────────────────────────────────────
function _annRenderBody() {
  if (_mailActiveTab !== 'announcements') return;
  const body = document.getElementById('mailBody');
  if (!body) return;

  if (_annLoading) {
    body.innerHTML = '<div style="color:#333;text-align:center;padding:30px;">Loading announcements...</div>';
    return;
  }

  if (_annItems.length === 0) {
    body.innerHTML = '<div style="color:#2a2a2a;text-align:center;padding:40px;font-size:16px;">'
      + '📢 No announcements right now.<br>'
      + '<span style="font-size:12px;color:#1a1a1a;">Check back after updates!</span></div>';
    return;
  }

  body.innerHTML = _annItems.map(function(ann) {
    return _annRenderRow(ann);
  }).join('');

  // Wire open tracking — mark as opened when clicked/expanded
  body.querySelectorAll('[data-ann-id]').forEach(function(el) {
    el.addEventListener('click', function() {
      const msgId = el.getAttribute('data-ann-id');
      _annOpen(msgId);
      // Toggle body visibility
      const bodyEl = document.getElementById('annBody_' + msgId);
      if (bodyEl) {
        bodyEl.style.display = bodyEl.style.display === 'none' ? 'block' : 'none';
      }
    });
  });
}

function _annRenderRow(ann) {
  const priority   = ann.priority || 2;
  const isOpened   = ann.is_opened;

  // Priority colors
  const borderColor = priority === 1 ? '#660000' : priority === 2 ? '#5a4a00' : '#1a2a1a';
  const titleColor  = priority === 1 ? '#ff6666' : priority === 2 ? '#c8a000' : '#668866';
  const bgColor     = priority === 1 ? '#080000' : priority === 2 ? '#080600' : '#020402';
  const badge       = priority === 1
    ? '<span style="background:#440000;border:1px solid #880000;color:#ff6666;'
      + 'font-size:9px;padding:0 5px;font-family:Courier New,monospace;'
      + 'letter-spacing:1px;margin-right:5px;">URGENT</span>'
    : priority === 2
      ? '<span style="background:#2a2000;border:1px solid #4a3a00;color:#c8a000;'
        + 'font-size:9px;padding:0 5px;font-family:Courier New,monospace;'
        + 'letter-spacing:1px;margin-right:5px;">NEWS</span>'
      : '';

  // Format body: **word** → bold, \n → line break
  const rawBody = ann.body || '';
  // Bold: **text** → <strong>
  const formattedBody = rawBody
    .replace(/[*][*](.+?)[*][*]/g, '<strong style="color:' + titleColor + ';">$1</strong>')
    .split('\\n').join('<br>');

  // Expiry info
  let expiryLine = '';
  if (ann.expires_days && ann.posted_at) {
    const posted  = new Date(ann.posted_at);
    const expires = new Date(posted.getTime() + ann.expires_days * 86400000);
    const daysLeft= Math.ceil((expires - new Date()) / 86400000);
    if (daysLeft > 0) {
      expiryLine = '<span style="color:#2a2a2a;font-size:10px;font-family:Courier New,monospace;">'
        + 'Expires in ' + daysLeft + ' day' + (daysLeft !== 1 ? 's' : '') + '</span>';
    }
  }

  // Unread dot
  const unreadDot = !isOpened
    ? '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;'
      + 'background:' + titleColor + ';margin-right:6px;flex-shrink:0;'
      + 'vertical-align:middle;"></span>'
    : '';

  return '<div style="border:1px solid ' + borderColor + ';background:' + bgColor + ';'
    + 'margin-bottom:6px;border-radius:2px;">'
    // Header row — clickable to expand
    + '<div data-ann-id="' + ann.message_id + '"'
    + ' style="padding:9px 12px;cursor:pointer;display:flex;'
    + 'align-items:center;justify-content:space-between;gap:8px;">'
    + '<div style="display:flex;align-items:center;flex:1;min-width:0;">'
    + unreadDot
    + badge
    + '<span style="color:' + titleColor + ';font-size:14px;font-weight:bold;">'
    + (ann.title || 'Announcement') + '</span>'
    + '</div>'
    + '<span style="color:#333;font-size:12px;flex-shrink:0;">▼</span>'
    + '</div>'
    // Body — hidden by default, revealed on click
    + '<div id="annBody_' + ann.message_id + '" style="display:none;'
    + 'padding:0 12px 10px 12px;border-top:1px solid ' + borderColor + ';">'
    + '<div style="color:#888;font-size:13px;line-height:1.6;margin:8px 0;">'
    + formattedBody + '</div>'
    + '<div style="display:flex;justify-content:space-between;align-items:center;'
    + 'margin-top:6px;">'
    + expiryLine
    + '<span style="color:#2a2a2a;font-size:10px;font-family:Courier New,monospace;">'
    + (ann.posted_at ? new Date(ann.posted_at).toLocaleDateString() : '') + '</span>'
    + '</div>'
    + '</div>'
    + '</div>';
}

// ── Parse deep-link data out of mail body (||key:value|| format) ─────────
function _mailParseBody(body) {
  if (!body) return { text: '', data: {} };
  // Split on || markers
  const parts = body.split('||');
  const text  = parts[0].trim();
  const data  = {};
  for (var i = 1; i < parts.length; i++) {
    var colonIdx = parts[i].indexOf(':');
    if (colonIdx > 0) {
      var k = parts[i].substring(0, colonIdx).trim();
      var v = parts[i].substring(colonIdx + 1).trim();
      data[k] = v;
    }
  }
  return { text: text, data: data };
}

// ── Render "Bid Again" button if mail body has a listing_id deep-link ─────
function _mailBidAgainBtn(body) {
  if (!body || !body.includes('||listing_id:')) return '';
  const parsed     = _mailParseBody(body);
  const listingId  = parsed.data['listing_id']  || '';
  const itemName   = parsed.data['item_name']   || 'item';
  const minNextBid = parseInt(parsed.data['min_next_bid']) || 1;
  if (!listingId) return '';

  return '<button data-bidagain-listing="' + listingId + '"'
    + ' data-bidagain-min="' + minNextBid + '"'
    + ' data-bidagain-name="' + itemName.replace(/"/g, '&quot;') + '"'
    + ' style="background:#030800;border:1px solid #2a4a00;color:#6a9a00;'
    + 'font-family:VT323,monospace;font-size:13px;padding:3px 10px;'
    + 'cursor:pointer;margin-top:4px;letter-spacing:1px;">'
    + 'BID AGAIN on ' + itemName + ' (' + minNextBid.toLocaleString() + 'g+)'
    + '</button>';
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPOSE GLOBALS
// ═══════════════════════════════════════════════════════════════════════════
window.initMailbox         = initMailbox;
window.resetMailboxInit    = resetMailboxInit;
window.openMailbox         = openMailbox;
window.renderMailboxButton = renderMailboxButton;
window._mailClaim          = _mailClaim;
window._mailMarkRead       = _mailMarkRead;
window._mailClaimAll       = _mailClaimAll;
window._mailClose          = _mailClose;
window._mailDismissToast   = _mailDismissToast;
window._mailSwitchTab      = _mailSwitchTab;
window._annFetch           = _annFetch;
window._annOpen            = _annOpen;
