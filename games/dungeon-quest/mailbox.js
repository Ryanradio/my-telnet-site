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

// ── Internal state ────────────────────────────────────────────────────────
let _mailUnreadCount  = 0;
let _mailItems        = [];       // cached fetch results
let _mailLoading      = false;
let _mailStatusMsg    = '';
let _mailStatusIsErr  = false;
let _mailInitDone     = false;    // prevent double-init on same session

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

  fetch(AH_SCRIPT_URL + '?' + params.toString())
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        _mailUnreadCount = data.count || 0;
        _mailUpdateBadge();
        if (_mailUnreadCount > 0) {
          _mailShowLoginToast(_mailUnreadCount);
        }
      }
    })
    .catch(() => {}); // silent — non-critical on init
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
  const badge = _mailUnreadCount > 0
    ? `<span id="mailBadge" style="
        position:absolute;top:-6px;right:-6px;
        background:#ff4444;color:#fff;
        font-size:10px;font-family:'Courier New',monospace;
        border-radius:50%;width:18px;height:18px;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;pointer-events:none;">${_mailUnreadCount > 99 ? '99+' : _mailUnreadCount}</span>`
    : `<span id="mailBadge" style="display:none;"></span>`;

  return `
    <div style="position:relative;display:inline-block;">
      <button onclick="openMailbox()"
        style="background:#060606;border:1px solid #446644;color:#88aa88;
               font-family:'VT323',monospace;font-size:14px;
               padding:6px 14px;cursor:pointer;letter-spacing:1px;
               position:relative;">
        📬 MAILBOX${_mailUnreadCount > 0 ? '' : ''}
      </button>
      ${badge}
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// OPEN MAILBOX OVERLAY
// ═══════════════════════════════════════════════════════════════════════════
function openMailbox() {
  _mailStatusMsg  = '';
  _mailItems      = [];
  _mailRender();
  _mailFetch();
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
                 display:${_mailUnreadCount > 0 ? 'block' : 'none'};">
          ✅ CLAIM ALL
        </button>
        <button onclick="_mailClose()"
          style="background:none;border:1px solid #2a2a2a;color:#666;
                 font-family:'VT323',monospace;font-size:16px;
                 padding:3px 10px;cursor:pointer;">✕ CLOSE</button>
      </div>
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
      <div style="color:#333;text-align:center;padding:30px;">Loading mail...</div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function _mailRenderBody() {
  const body = document.getElementById('mailBody');
  if (!body) return;

  if (_mailLoading) {
    body.innerHTML = `<div style="color:#333;text-align:center;padding:30px;font-size:15px;">
      Loading mail...
    </div>`;
    return;
  }

  if (_mailItems.length === 0) {
    body.innerHTML = `<div style="color:#2a2a2a;text-align:center;padding:40px;font-size:16px;">
      📭 Your mailbox is empty.<br>
      <span style="font-size:12px;color:#1a1a1a;">
        Items and gold from the Auction House will appear here.
      </span>
    </div>`;
    return;
  }

  body.innerHTML = _mailItems.map(mail => _mailRenderRow(mail)).join('');
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
                 ${mail.body}
               </div>`
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

  fetch(AH_SCRIPT_URL + '?' + params.toString())
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

  fetch(AH_SCRIPT_URL + '?' + params.toString())
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

        if (typeof saveGame === 'function') saveGame();
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

  fetch(AH_SCRIPT_URL + '?' + params.toString())
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
      if (typeof saveGame === 'function') saveGame();
      return;
    }

    const mail   = claimable[idx++];
    const params = new URLSearchParams({
      action:       'mail_claim',
      mail_id:      mail.mail_id,
      character_id: _mailCharId(),
    });

    fetch(AH_SCRIPT_URL + '?' + params.toString())
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
  // Update any badge elements already in the DOM
  const badges = document.querySelectorAll('#mailBadge');
  badges.forEach(badge => {
    if (_mailUnreadCount > 0) {
      badge.textContent = _mailUnreadCount > 99 ? '99+' : _mailUnreadCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
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
