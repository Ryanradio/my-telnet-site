// ═══════════════════════════════════════════════════════════════
// BESTIARY SYSTEM
// Extracted from index.html
// Dependencies: ENEMIES, gameState (runtime globals)
// ═══════════════════════════════════════════════════════════════

const BESTIARY_TIERS = {
    NONE:      0,   // Never seen — silhouette + "???"
    SEEN:      1,   // Killed once — name + basic flavour
    STUDYING:  5,   // Killed 5 — stats revealed
    KNOWN:     10,  // Killed 10 — full entry + lore note
    HUNTER:    25,  // Killed 25 — hunter's note unlocked
};

// ── Get discovery tier for a monster key ───────────────────────────────
function getBestiaryTier(monsterKey) {
    const p = gameState.player;
    if (!p || !p.kills) return BESTIARY_TIERS.NONE;
    const kills = p.kills[monsterKey] || 0;
    if (kills === 0)  return BESTIARY_TIERS.NONE;
    if (kills < 5)    return BESTIARY_TIERS.SEEN;
    if (kills < 10)   return BESTIARY_TIERS.STUDYING;
    if (kills < 25)   return BESTIARY_TIERS.KNOWN;
    return BESTIARY_TIERS.HUNTER;
}

// ── Get total unique monsters discovered (killed at least once) ─────────
function getBestiaryTotalDiscovered() {
    const p = gameState.player;
    if (!p || !p.kills) return 0;
    return Object.keys(p.kills).filter(k => !k.startsWith('_') && p.kills[k] > 0).length;
}

// ── Get count of monsters discovered but NOT yet viewed in the bestiary ──
function getBestiaryDiscoveredCount() {
    const p = gameState.player;
    if (!p || !p.kills) return 0;
    const read = p.bestiaryRead || {};
    // Count monsters killed but not yet opened in the bestiary panel
    return Object.keys(p.kills).filter(k => !k.startsWith('_') && p.kills[k] > 0 && !read[k]).length;
}

// ── Also count tier upgrades not yet seen ─────────────────────────────
// Stored as bestiaryRead[key] = tier at time of reading.
// If current tier > stored tier, it's an upgrade the player hasn't seen.
function getBestiaryUnseenUpgrades() {
    const p = gameState.player;
    if (!p || !p.kills) return 0;
    const read = p.bestiaryRead || {};
    let count = 0;
    Object.keys(p.kills).forEach(k => {
        if (k.startsWith('_')) return;
        if (p.kills[k] <= 0) return;
        const currentTier = getBestiaryTier(k);
        const seenTier    = read[k] !== undefined ? read[k] : -1;
        if (currentTier > seenTier) count++;
    });
    return count;
}

// ── Called every time a monster is killed (from checkCombatEnd) ─────────
function onMonsterKill(killKey, newTotal, monsterData) {
    checkGuildKillProgress(killKey); //When monster dies check quest progress from Guild
    const prevTier = getBestiaryTier(killKey);  // tier BEFORE this kill
    // Recalculate with new total already applied
    const newTier  = (() => {
        if (newTotal === 0)  return BESTIARY_TIERS.NONE;
        if (newTotal < 5)    return BESTIARY_TIERS.SEEN;
        if (newTotal < 10)   return BESTIARY_TIERS.STUDYING;
        if (newTotal < 25)   return BESTIARY_TIERS.KNOWN;
        return BESTIARY_TIERS.HUNTER;
    })();

    // Fire notification only when crossing a tier threshold
    if (newTier > prevTier) {
        onBestiaryTierUp(killKey, newTier, monsterData);
    }

    // Update badge if bestiary is already built
    updateBestiaryNotificationBadge();
}

// ── Called when a monster crosses a new discovery tier ─────────────────
function onBestiaryTierUp(killKey, tier, monsterData) {
    if (typeof termAppend !== 'function') return;
    const name = (monsterData && monsterData.name) || killKey;
    // Creative, varied terminal messages per tier
    const SEEN_LINES = [
        `Your hand moves to your field notes before you have finished the fight. <em>${name}</em> — first encounter. You will remember this one.`,
        `The <em>${name}</em> falls. You have not faced this creature before. Your notes are already open.`,
        `A new entry scratches itself into the back of your mind: <em>${name}</em>. You will know more after the next one.`,
        `<em>${name}</em> — first kill. Something in your memory files it away with the focus of a hunter who intends to understand their prey.`,
    ];
    const STUDYING_LINES = [
        `Five kills. The patterns are starting to emerge — <em>${name}</em> has habits you can begin to map. The bestiary entry fills in further.`,
        `You have killed five <em>${name}</em>. You understand it better now. HP, damage, the tells before it strikes. The entry has more to show you.`,
        `<em>${name}</em> — five encounters logged. A hunter knows their quarry at five kills. The bestiary has updated. Check it when you can.`,
        `The fifth <em>${name}</em> dies like the first four, but you already knew it would. You understand this creature now. New data in the bestiary.`,
    ];
    const KNOWN_LINES = [
        `Ten kills. The <em>${name}</em> holds no surprises for you anymore. A full entry has been written — lore included. This creature is known.`,
        `You have now killed ten <em>${name}</em>. The bestiary entry is complete. You could describe its behavior in your sleep — and might have to.`,
        `<em>${name}</em> — tenth kill. The entry is finished. Lore note unlocked. You know this creature well enough to teach it to someone else.`,
        `The tenth <em>${name}</em> falls. Your field notes are thorough. The bestiary reflects it — full entry, full lore. Nothing left to learn here.`,
    ];
    const HUNTER_LINES = [
        `Twenty-five <em>${name}</em> have died by your hand. The Hunter's Note has been added — your personal field assessment. Few can claim this expertise.`,
        `<em>${name}</em> — twenty-five kills. The bestiary registers it with a Hunter's Note. You are not just familiar with this creature. You are its natural predator.`,
        `You have killed more <em>${name}</em> than most people have ever seen. A Hunter's Note, written in your experience, has been added to the entry.`,
        `Twenty-five. The <em>${name}</em> category in your bestiary is as complete as it can be. The Hunter's Note is yours. You earned it one kill at a time.`,
    ];
    const pools = {
        [BESTIARY_TIERS.SEEN]:     { lines: SEEN_LINES,     color: '#7a9a6a' },
        [BESTIARY_TIERS.STUDYING]: { lines: STUDYING_LINES, color: '#c8a020' },
        [BESTIARY_TIERS.KNOWN]:    { lines: KNOWN_LINES,    color: '#d4802a' },
        [BESTIARY_TIERS.HUNTER]:   { lines: HUNTER_LINES,   color: '#00ff88' },
    };
    const pool = pools[tier];
    if (pool) {
        const line = pool.lines[Math.floor(Math.random() * pool.lines.length)];
        termAppend(`<span style="color:${pool.color};">📖 ${line}</span>`, 'term-dim');
    }
}

function updateBestiaryNotificationBadge() {
    // Wired to UI badge in Phase 4
    const badge = document.getElementById('bestiary-badge');
    if (!badge) return;
    // For now just show total discovered count
    const count = getBestiaryDiscoveredCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

// ═══════════════════════════════════════════════════════════════════════
// END CHRONICLE & BESTIARY ENGINE
// ═══════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════
// ██████████████████████████████████████████████████████████████████████
// CHRONICLE & BESTIARY UI
// Phase 2 — full parchment overlay, entry list, reader, bestiary panels
// ██████████████████████████████████████████████████████████████████████
// ═══════════════════════════════════════════════════════════════════════

// ── State ──────────────────────────────────────────────────────────────
const CUI = {
    activeTab:        'chronicle',  // 'chronicle' | 'bestiary'
    activeEntryId:    null,         // currently open Chronicle entry id
    activeMonsterId:  null,         // currently open Bestiary monster key
    entryList:        [],           // ordered array of unlocked entry ids
    currentEntryIdx:  0,            // index within entryList for prev/next nav
};

// ── Open / close ────────────────────────────────────────────────────────
function openChronicle(tab) {
    const overlay = document.getElementById('chronicle-overlay');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Always start at list view when opening — reset any previous reader state
    closeChronicleReader();
    switchChronicleTab(tab || CUI.activeTab);
    refreshChroniclelaunchBadge();
}

function closeChronicle() {
    const overlay = document.getElementById('chronicle-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    saveGame(); // Persist any newly-read entries
}

// Close on backdrop click
document.addEventListener('DOMContentLoaded', () => {
    // ── HAPTIC: delegated tap for buttons and menu options ──────────────────
    document.addEventListener('click', (e) => {
        const t = e.target;
        if (t.classList && t.classList.contains('menu-option')) { haptic('tap'); return; }
        if (t.tagName === 'BUTTON') { haptic('tap'); return; }
        if (t.closest && (t.closest('.action-icon-btn') || t.closest('#actionBar button'))) { haptic('tap'); }
    }, { passive: true });
    // ────────────────────────────────────────────────────────────────────────

    const overlay = document.getElementById('chronicle-overlay');
    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeChronicle();
        });
    }
});
// Also close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('chronicle-overlay');
        if (overlay && overlay.classList.contains('open')) closeChronicle();
    }
});

// ── Tab switching ────────────────────────────────────────────────────────
function switchChronicleTab(tab) {
    CUI.activeTab = tab;
    // Tab buttons
    document.getElementById('tab-chronicle').classList.toggle('active', tab === 'chronicle');
    document.getElementById('tab-bestiary').classList.toggle('active', tab === 'bestiary');
    // Panels
    document.getElementById('panel-chronicle').style.display = tab === 'chronicle' ? 'block' : 'none';
    document.getElementById('panel-bestiary').style.display  = tab === 'bestiary'  ? 'block' : 'none';
    // Subtitle
    const sub = document.getElementById('chronicle-header-sub');
    if (sub) sub.textContent = tab === 'chronicle'
        ? 'The world remembers everything.'
        : 'Know thine enemy.';

    if (tab === 'chronicle') renderChronicleList();
    if (tab === 'bestiary')  renderBestiaryList();
}

// ═══════════════════════════════════════════════════════════════════════
// CHRONICLE TAB
// ═══════════════════════════════════════════════════════════════════════

function renderChronicleList() {
    const p = gameState.player;
    if (!p || !p.chronicle) return;
    // NOTE: do NOT call closeChronicleReader() here — this function is also
    // called from openChronicleEntry to refresh the list highlight, and closing
    // the reader would immediately undo the open.

    const list  = document.getElementById('chronicle-entry-list');
    if (!list) return;

    const baseClass = p.baseClass || p.class;
    const playerName = p.name || 'the wanderer';

    // Build ordered list of unlocked entries
    CUI.entryList = CHRONICLE_SCHEDULE
        .filter(e => p.chronicle.unlockedEntries.includes(e.id))
        .map(e => e.id);

    if (CUI.entryList.length === 0) {
        list.innerHTML = `
            <div style="padding:40px 24px;text-align:center;color:#5a4020;font-style:italic;font-size:15px;">
                <div style="font-size:32px;margin-bottom:12px;opacity:0.4;">📖</div>
                The Chronicle stirs, but its pages are still blank.<br>
                <span style="font-size:13px;color:#3a2810;">Continue your journey — new entries unlock as you level up.</span>
            </div>`;
        return;
    }

    list.innerHTML = CUI.entryList.map((id, idx) => {
        const def  = CHRONICLE_CONTENT[id];
        if (!def) return '';
        const unread = !p.chronicle.readEntries.includes(id);
        const tierLabel = def.cls === 'all' ? 'World Lore' : (p.className || p.class);
        return `
            <div class="chronicle-entry-row ${unread ? 'unread' : ''} ${CUI.activeEntryId === id ? 'active' : ''}"
                 onclick="openChronicleEntry('${id}', ${idx})">
                <div class="chronicle-entry-icon">${def.icon || '📜'}</div>
                <div class="chronicle-entry-meta">
                    <div class="chronicle-entry-title">${def.title(playerName)}</div>
                    <div class="chronicle-entry-hint">${def.hint || ''}</div>
                </div>
                <div class="chronicle-entry-level">${def.level === 0 ? '✉' : 'Lv ' + def.level}</div>
            </div>`;
    }).join('');

    // Refresh badges
    refreshAllBadges();
}

function openChronicleEntry(id, idx) {
    const p = gameState.player;
    if (!p) return;
    const def = CHRONICLE_CONTENT[id];
    if (!def) { console.warn('Chronicle: no content for', id); return; }

    CUI.activeEntryId = id;
    CUI.currentEntryIdx = idx !== undefined ? idx : CUI.entryList.indexOf(id);

    // Cancel any in-progress animation from a previous entry
    if (window._chronAnimTimer) {
        window._chronAnimTimer.forEach(t => clearTimeout(t));
        window._chronAnimTimer = [];
    }

    markChronicleRead(id);

    // Show reader, hide list
    document.getElementById('chronicle-entry-list').style.display = 'none';
    const reader = document.getElementById('chronicle-reader');
    reader.classList.add('open');

    // Prev / next buttons
    const prevBtn = document.getElementById('chron-prev');
    const nextBtn = document.getElementById('chron-next');
    const pageNum = document.getElementById('chron-page-num');
    if (prevBtn) prevBtn.disabled = CUI.currentEntryIdx <= 0;
    if (nextBtn) nextBtn.disabled = CUI.currentEntryIdx >= CUI.entryList.length - 1;
    if (pageNum) pageNum.textContent = `${CUI.currentEntryIdx + 1} / ${CUI.entryList.length}`;

    // Build raw HTML from body function
    const playerName = p.name || 'the wanderer';
    const baseClass  = p.baseClass || p.class;
    const bodyHtml   = typeof def.body === 'function'
        ? def.body(playerName, baseClass, p.className || p.class)
        : (def.body || '');

    // ── Parse body HTML into individual segments ──────────────────────
    // We render into a temp container, then walk the child nodes so each
    // p, .chronicle-callout, .chronicle-epithet, div etc becomes its own
    // animated segment — exactly like the welcome screen letter.
    const tmp = document.createElement('div');
    tmp.innerHTML = bodyHtml;

    // Collect top-level child elements as segments
    const rawSegs = Array.from(tmp.children);

    // Build the page container
    const page = document.getElementById('chronicle-page-content');
    page.innerHTML = '';

    // Header: ornament + title + label + divider — shown immediately (no anim)
    const header = document.createElement('div');
    header.innerHTML = `
        <div class="chronicle-page-ornament">✦ · · · ✦</div>
        <div class="chronicle-page-title">${def.title(playerName)}</div>
        <div class="chronicle-page-label">${def.label || (def.cls === 'all' ? 'World Lore' : 'Personal Chronicle')}</div>
        <div class="chronicle-page-divider">⁂</div>
    `;
    page.appendChild(header);

    // Body wrapper
    const bodyWrap = document.createElement('div');
    bodyWrap.className = 'chronicle-page-body';
    page.appendChild(bodyWrap);

    // Skip button lives inside bodyWrap, repositions after each segment
    const skipBtn = document.createElement('button');
    skipBtn.className = 'chron-skip-btn';
    skipBtn.textContent = '[ skip animation ]';
    skipBtn.style.display = 'none';
    skipBtn.onclick = () => skipChronicleAnimation();
    bodyWrap.appendChild(skipBtn);

    // Footer ornament (added after last segment animates in)
    const footer = document.createElement('div');
    footer.className = 'chronicle-page-ornament';
    footer.style.cssText = 'margin-top:28px;opacity:0;transition:opacity 0.8s ease;';
    footer.textContent = '✦ · · · ✦';
    page.appendChild(footer);

    // Wrap each segment in .chron-seg and append hidden
    const segEls = rawSegs.map(child => {
        const wrap = document.createElement('div');
        wrap.className = 'chron-seg';
        // Preserve original tag type for drop-cap and indent CSS to work
        // by cloning the element itself rather than wrapping
        const clone = child.cloneNode(true);
        wrap.appendChild(clone);
        bodyWrap.appendChild(wrap);
        return wrap;
    });

    // Scroll reader to top
    const chronicleBody = document.getElementById('chronicle-body');
    if (chronicleBody) chronicleBody.scrollTop = 0;

    // Show skip button
    skipBtn.style.display = 'block';

    // ── Animate segments in ───────────────────────────────────────────
    window._chronAnimTimer = [];
    window._chronAnimSkipped = false;
    let delay = 400;

    segEls.forEach((el, i) => {
        const t = setTimeout(() => {
            if (window._chronAnimSkipped) return;
            el.classList.add('visible');
            // Move skip button to just after this segment so it travels with the text
            if (el.nextSibling !== skipBtn) el.parentNode.insertBefore(skipBtn, el.nextSibling);
            skipBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            // After last segment: show footer, hide skip
            if (i === segEls.length - 1) {
                setTimeout(() => {
                    footer.style.opacity = '1';
                    skipBtn.style.display = 'none';
                }, 800);
            }
        }, delay);
        window._chronAnimTimer.push(t);

        // Reading-pace timing — match welcome screen
        const text = el.textContent || '';
        const isShort = text.trim().length < 60;
        const isCallout = el.querySelector('.chronicle-callout') !== null
                       || (el.firstElementChild && el.firstElementChild.classList.contains('chronicle-callout'));
        const isEpithet = el.querySelector('.chronicle-epithet') !== null;
        const dur = isCallout  ? 17500
                  : isEpithet  ? 5000
                  : isShort    ? 6000
                  : 12500;
        delay += dur;
    });

    // Update list highlight without closing reader
    renderChronicleList();
}

function skipChronicleAnimation() {
    window._chronAnimSkipped = true;
    const _sb = document.querySelector('.chron-skip-btn');
    if (_sb) _sb.style.display = 'none';
    if (window._chronAnimTimer) {
        window._chronAnimTimer.forEach(t => clearTimeout(t));
        window._chronAnimTimer = [];
    }
    // Make all segments visible instantly
    const page = document.getElementById('chronicle-page-content');
    if (!page) return;
    page.querySelectorAll('.chron-seg').forEach(el => el.classList.add('visible'));
    // Show footer, hide skip button
    const footer = page.querySelector('.chronicle-page-ornament:last-of-type');
    if (footer) footer.style.opacity = '1';
    const skipBtn = page.querySelector('.chron-skip-btn');
    if (skipBtn) skipBtn.style.display = 'none';
    // Smooth scroll to bottom
    const chronicleBody = document.getElementById('chronicle-body');
    if (chronicleBody) chronicleBody.scrollTo({ top: chronicleBody.scrollHeight, behavior: 'smooth' });
}

function closeChronicleReader() {
    CUI.activeEntryId = null;
    const reader = document.getElementById('chronicle-reader');
    if (reader) reader.classList.remove('open');
    const list = document.getElementById('chronicle-entry-list');
    if (list) list.style.display = 'flex';
}

function navigateChronicle(dir) {
    const newIdx = CUI.currentEntryIdx + dir;
    if (newIdx < 0 || newIdx >= CUI.entryList.length) return;
    openChronicleEntry(CUI.entryList[newIdx], newIdx);
}

// ═══════════════════════════════════════════════════════════════════════
// BESTIARY TAB
// ═══════════════════════════════════════════════════════════════════════

function renderBestiaryList() {
    const p = gameState.player;
    if (!p) return;
    // Do NOT call closeBestiaryReader() here — openBestiaryEntry calls this
    // after opening, which would immediately close the reader.

    const list = document.getElementById('bestiary-list');
    if (!list) return;

    const TIER_LABELS = {
        0: { cls: 'bestiary-tier-none',     label: '???' },
        1: { cls: 'bestiary-tier-seen',     label: 'Seen' },
        5: { cls: 'bestiary-tier-studying', label: 'Studying' },
        10:{ cls: 'bestiary-tier-known',    label: 'Known' },
        25:{ cls: 'bestiary-tier-hunter',   label: 'Hunter' },
    };

    const totalDiscovered = getBestiaryTotalDiscovered();  // use total, not unread count
    const azrathRelated = Object.keys(BESTIARY_DATA).filter(k => {
        const cat = BESTIARY_DATA[k] && BESTIARY_DATA[k].category;
        return (cat === 'Draconic' || cat === 'Void Entity' || cat === 'Demonic') &&
               (p.kills && (p.kills[k] || 0) > 0);
    }).length;

    let html = '';

    if (totalDiscovered > 0) {
        html += `
            <div style="padding:10px 18px 6px;border-bottom:1px solid rgba(90,58,24,0.3);">
                <span style="font-size:12px;color:#5a4020;letter-spacing:1px;">
                    ${totalDiscovered} creature${totalDiscovered !== 1 ? 's' : ''} recorded
                    ${azrathRelated > 0 ? `&nbsp;&middot;&nbsp;<span style="color:#8a3020;">${azrathRelated} Calamity-linked</span>` : ''}
                </span>
            </div>`;
    }

    const catOrder = (typeof BESTIARY_CAT_ORDER !== 'undefined') ? BESTIARY_CAT_ORDER
        : ['Common Beast','Humanoid','Undead','Corrupted','Elemental / Construct',
           'Draconic','Demonic','Void Entity','Ancient / Boss'];

    catOrder.forEach(cat => {
        const monsters = Object.keys(BESTIARY_DATA).filter(k => BESTIARY_DATA[k] && BESTIARY_DATA[k].category === cat);
        if (monsters.length === 0) return;

        // Discovered entries first, then alphabetical
        monsters.sort((a, b) => {
            const ka = (p.kills && p.kills[a]) || 0;
            const kb = (p.kills && p.kills[b]) || 0;
            if (!!ka !== !!kb) return kb - ka;
            return (BESTIARY_DATA[a].name || a).localeCompare(BESTIARY_DATA[b].name || b);
        });

        html += `<div style="padding:8px 18px 4px;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(90,58,24,0.2);">
            <span style="font-size:11px;color:#5a4020;letter-spacing:2px;text-transform:uppercase;">${cat}</span>
        </div>`;

        monsters.forEach(key => {
            const def = BESTIARY_DATA[key];
            if (!def) return;
            const kills = (p.kills && p.kills[key]) || 0;
            const tier  = getBestiaryTier(key);
            const tDef  = TIER_LABELS[tier] || TIER_LABELS[0];
            const discovered = kills > 0;

            html += `
                <div class="bestiary-entry-row ${CUI.activeMonsterId === key ? 'active' : ''}"
                     data-key="${key}"
                     onclick="openBestiaryEntry('${key}')">
                    <div class="bestiary-monster-icon ${discovered ? '' : 'undiscovered'}">
                        ${discovered ? (def.icon || '?') : '?'}
                    </div>
                    <div class="bestiary-monster-name ${discovered ? '' : 'undiscovered'}">
                        ${discovered ? def.name : '???'}
                    </div>
                    ${kills > 0 ? `<div class="bestiary-kill-count">${kills}&times;</div>` : ''}
                    <div class="bestiary-tier-badge ${tDef.cls}">${tDef.label}</div>
                </div>`;
        });
    });

    if (!html || getBestiaryTotalDiscovered() === 0) {
        html = `<div style="padding:40px 24px;text-align:center;color:#5a4020;font-style:italic;font-size:15px;">
            <div style="font-size:32px;margin-bottom:12px;opacity:0.4;">&#x1F4CB;</div>
            The Bestiary is empty.<br>
            <span style="font-size:13px;color:#3a2810;">Defeat enemies in combat to record them here.</span>
        </div>`;
    }

    list.innerHTML = html;
    refreshAllBadges();
}

function buildBestiaryProgressBar(kills) {
    if (kills <= 0) return '';
    var tiers = [{t:1,label:'Seen'},{t:5,label:'Studying'},{t:10,label:'Known'},{t:25,label:'Hunter'}];
    var next  = tiers.filter(function(t){ return kills < t.t; })[0];
    if (!next) return '<div style="color:#00ff88;font-size:12px;padding:4px 0;">&#9733; Hunter &mdash; fully mastered</div>';
    var prev  = tiers[tiers.indexOf(next) - 1] || { t: 0 };
    var pct   = Math.min(100, Math.round(((kills - prev.t) / (next.t - prev.t)) * 100));
    var filled = Math.floor(pct / 10);
    var bar   = '\u2588'.repeat(filled) + '\u2591'.repeat(10 - filled);
    return '<div style="font-size:12px;color:#7a6040;margin:4px 0 6px;">'
        + '<span style="color:#a07840;">[' + bar + ']</span>'
        + ' ' + pct + '% &rarr; <b style="color:#c8a050;">' + next.label + '</b>'
        + ' <span style="color:#5a4020;">(' + (next.t - kills) + ' more kill' + (next.t - kills !== 1 ? 's' : '') + ')</span>'
        + '</div>';
}

function openBestiaryEntry(key) {
    const p = gameState.player;
    if (!p) return;
    const def = BESTIARY_DATA[key];
    if (!def) return;

    // Mark as read at current tier so badge clears
    if (!p.bestiaryRead) p.bestiaryRead = {};
    p.bestiaryRead[key] = getBestiaryTier(key);
    refreshAllBadges();

    CUI.activeMonsterId = key;
    const kills = (p.kills && p.kills[key]) || 0;
    const tier  = getBestiaryTier(key);

    // Hide list, show reader
    document.getElementById('bestiary-list').style.display = 'none';
    const reader = document.getElementById('bestiary-reader');
    reader.classList.add('open');

    const statReveal   = tier >= BESTIARY_TIERS.STUDYING;
    const fullReveal   = tier >= BESTIARY_TIERS.KNOWN;
    const hunterReveal = tier >= BESTIARY_TIERS.HUNTER;
    const lockMsg      = statReveal
        ? '<span class="bestiary-locked-stat">&mdash; Requires 10 kills &mdash;</span>'
        : '<span class="bestiary-locked-stat">&mdash; Requires 5 kills &mdash;</span>';

    // Stat grid
    const stats = def.stats || {};
    function statVal(v) { return statReveal ? (v || '?') : lockMsg; }
    const statGrid = '<div class="bestiary-stat-grid">'
        + '<div class="bestiary-stat-row"><span class="bestiary-stat-label">HP</span><span class="bestiary-stat-value">'     + statVal(stats.hp)     + '</span></div>'
        + '<div class="bestiary-stat-row"><span class="bestiary-stat-label">Level</span><span class="bestiary-stat-value">'  + statVal(stats.level)  + '</span></div>'
        + '<div class="bestiary-stat-row"><span class="bestiary-stat-label">Damage</span><span class="bestiary-stat-value">' + statVal(stats.damage) + '</span></div>'
        + '<div class="bestiary-stat-row"><span class="bestiary-stat-label">Defense</span><span class="bestiary-stat-value">'+ statVal(stats.defense)+ '</span></div>'
        + '<div class="bestiary-stat-row"><span class="bestiary-stat-label">XP</span><span class="bestiary-stat-value">'     + statVal(stats.xp)     + '</span></div>'
        + '<div class="bestiary-stat-row"><span class="bestiary-stat-label">Gold</span><span class="bestiary-stat-value">'   + statVal(stats.gold)   + '</span></div>'
        + '</div>';

    // Lore note
    let loreBlock = '';
    if (fullReveal && def.lore) {
        loreBlock = '<div class="bestiary-lore-note"><strong style="color:#c8a050;font-style:normal;">Lore Note</strong><br>' + def.lore + '</div>';
    } else if (!statReveal) {
        const remaining = 5 - kills;
        loreBlock = '<div style="color:#3a2810;font-size:13px;font-style:italic;padding:8px 0;">Defeat this creature ' + remaining + ' more time' + (remaining !== 1 ? 's' : '') + ' to reveal its stats.</div>';
    }

    // Hunter note
    let hunterBlock = '';
    if (hunterReveal && def.hunterNote) {
        hunterBlock = '<div class="bestiary-hunters-note"><strong style="color:#7a9a60;font-style:normal;">Hunter\'s Note</strong><br>' + def.hunterNote(p.name || 'hunter') + '</div>';
    } else if (fullReveal && !hunterReveal) {
        const remaining = 25 - kills;
        hunterBlock = '<div style="color:#3a2810;font-size:13px;font-style:italic;padding:8px 0;">Defeat this creature ' + remaining + ' more time' + (remaining !== 1 ? 's' : '') + ' to unlock the Hunter\'s Note.</div>';
    }

    // Body content
    let body = '';
    if (kills === 0) {
        body = '<div class="bestiary-flavor" style="text-align:center;opacity:0.5;">Something moved through the dark.<br>You haven\'t faced it yet.</div>';
    } else {
        body = '<div class="bestiary-flavor">' + def.flavor + '</div>' + statGrid + loreBlock + hunterBlock;
    }

    const legacyTag = (p.kills && p.kills._legacy) ? '<span class="bestiary-legacy-tag">Legacy</span>' : '';

    document.getElementById('bestiary-detail-content').innerHTML =
        '<div class="bestiary-detail-name">' + (def.icon || '') + ' ' + def.name + ' ' + legacyTag + '</div>'
        + '<div class="bestiary-detail-class">' + def.category + ' &middot; ' + kills + ' kill' + (kills !== 1 ? 's' : '') + '</div>'
        + buildBestiaryProgressBar(kills)
        + body;

    document.getElementById('chronicle-body').scrollTop = 0;
    refreshAllBadges();

    // Highlight active row in list without re-rendering
    document.querySelectorAll('.bestiary-entry-row').forEach(function(row) {
        row.classList.toggle('active', row.dataset.key === key);
    });
}

function closeBestiaryReader() {
    CUI.activeMonsterId = null;
    const reader = document.getElementById('bestiary-reader');
    if (reader) reader.classList.remove('open');
    const list = document.getElementById('bestiary-list');
    if (list) list.style.display = 'block';
}

// ── Badge refresh ───────────────────────────────────────────────────────
function refreshAllBadges() {
    const unread = getUnreadChronicleCount();
    const discovered = getBestiaryDiscoveredCount();

    // Tab badges
    const cb = document.getElementById('chronicle-badge');
    if (cb) { cb.textContent = unread; cb.classList.toggle('visible', unread > 0); }
    const unseen = getBestiaryUnseenUpgrades();
    const bb = document.getElementById('bestiary-badge');
    if (bb) { bb.textContent = unseen; bb.classList.toggle('visible', unseen > 0); }

    // Launch button badge (in character stats)
    refreshChroniclelaunchBadge();
}

function refreshChroniclelaunchBadge() {
    const unread = getUnreadChronicleCount();
    const badge  = document.getElementById('chronicle-launch-badge');
    if (badge) {
        badge.textContent = unread || '';
        badge.classList.toggle('visible', unread > 0);
    }
}

// Wire updateChronicleNotificationBadge (called by engine) to our refresh
function updateChronicleNotificationBadge() { refreshAllBadges(); }
function updateBestiaryNotificationBadge()  { refreshAllBadges(); }

// ═══════════════════════════════════════════════════════════════════════
// BESTIARY DATA
// Auto-built from ENEMIES at runtime, with hand-crafted entries layered
// on top for notable monsters. Categories and flavor reflect the Azrath
// world — everything disturbed, displaced, or corrupted by the Waking.
// ═══════════════════════════════════════════════════════════════════════

// ── Category assignment by monster key ─────────────────────────────────
const BESTIARY_CATEGORIES = {
    // Common Beasts — existed before the Waking
    common_beast: [
        'angry_squirrel','giant_rat','wolf','wild_boar','wild_lynx',
        'plains_hawk','plains_lion','giant_spider','giant_frog','giant_beetle',
        'giant_wasp','giant_leech','giant_scorpion','mud_crab','mudskipper',
        'water_snake','snapping_turtle','war_boar','cave_worm','dungeon_bat',
        'venomfang_bat','moss_creeper','thornling','slime','poop_slime',
    ],
    // Humanoid — bandits, raiders, cultists, organized enemies
    humanoid: [
        'goblin','goblin_shaman','kobold','forest_imp','bandit','bandit_scout',
        'orc','orc_berserker','hobgoblin','gnoll','gnoll_chief','centaur',
        'plains_raider','lizardfolk','river_pirate','cave_orc','cave_gnoll',
        'minotaur_scout','harpy','dark_stalker','grave_robber','death_cultist',
        'doom_cultist','dark_priest','dark_ranger','dark_mage','dark_oracle',
        'necromancer','plague_bearer',
    ],
    // Undead — proliferating as the seal weakens
    undead: [
        'zombie','plague_zombie','ghoul','skeleton','skeleton_warrior',
        'wraith','dust_wraith','elder_wraith','wailing_banshee','banshee_queen',
        'spirit','specter','will_o_wisp','revenant','frozen_revenant',
        'lich_thrall','lich','ancient_lich','ancient_lich_lord',
        'grave_knight','rotting_knight','bone_archer','crypt_bat','crypt_guard',
        'tomb_rat','phantom_mage','spectral_warrior','vampire_thrall','vampire',
        'elder_vampire','vampire_lord','death_knight','undead_general',
        'bone_colossus','bone_dragon',
    ],
    // Corrupted — creatures twisted by the Waking's energy
    corrupted: [
        'corrupted_paladin','corrupted_titan','corrupted_treant',
        'troll','river_troll','swamp_lurker','swamp_hag','swamp_witch',
        'bog_beast','bog_shambler','bog_witch','cave_basilisk','cave_drake',
        'yeti','werewolf','medusa','gargoyle','flesh_golem','animated_armor',
        'ruin_guardian','runic_guardian','plague_lord','plague_rat',
        'fungal_horror','imp_swarm','lesser_demon','chaos_imp',
        'shadow_hound','nightmare_steed','abyssal_hound',
    ],
    // Elementals and Constructs
    elemental: [
        'fire_elemental','magma_elemental','inferno_elemental','blood_elemental',
        'chaos_elemental','stone_golem','iron_golem','ancient_golem','thorn_golem',
        'lava_golem','lava_titan','flame_titan','frost_giant','blizzard_titan',
        'star_titan','infernal_titan','fallen_titan','void_titan','corrupt_titan',
        'kelp_strangler',
    ],
    // Draconic — dragons and dragon-kin drawn by Azrath's Waking
    draconic: [
        'wyvern','poison_drake','ice_drake','cave_drake','frost_wyrm',
        'glacial_wyrm','magma_dragon','storm_dragon','shadow_dragon',
        'plague_dragon','nightmare_dragon','eclipse_dragon','eternal_dragon',
        'chaos_dragon','void_dragon','red_dragon','bone_dragon',
    ],
    // Demonic — forces of chaos surging through the weakening seal
    demonic: [
        'demon','demon_hound','demon_warrior','demon_sorceress','demon_lord',
        'hellhound','hellfire_knight','pit_fiend','elder_demon',
        'infernal_mage','abyssal_knight','fallen_angel',
        'chaos_knight','chaos_bringer',
    ],
    // Void — entities from beyond reality, drawn by the approaching Calamity
    void: [
        'void_sprite','void_walker','void_assassin','void_priest',
        'void_lord','void_overlord','void_colossus',
        'nihil_spawn','oblivion_herald','oblivion_incarnate',
        'reality_tear','reality_shredder','entropy_beast',
        'soul_devourer','soul_reaper','cosmic_horror',
        'shadow_stalker','shadow_archon',
    ],
    // Ancient and Boss-tier — the most dangerous beings in the world
    ancient: [
        'dark_champion','black_knight','cursed_knight','cursed_archon',
        'fallen_warlord','doom_knight','abyssal_knight',
        'ogre','stone_crawler','dungeon_spider',
        'phoenix','seraphim','arch_angel','divine_champion','divine_executioner',
        'celestial_guardian','eternal_warden','god_avatar',
        'herald_of_doom','venomous_hydra',
    ],
};

// ── Reverse lookup: key → category label ──────────────────────────────
const KEY_TO_CATEGORY = {};
const CAT_LABELS = {
    common_beast: 'Common Beast',
    humanoid:     'Humanoid',
    undead:       'Undead',
    corrupted:    'Corrupted',
    elemental:    'Elemental / Construct',
    draconic:     'Draconic',
    demonic:      'Demonic',
    void:         'Void Entity',
    ancient:      'Ancient / Boss',
};
Object.entries(BESTIARY_CATEGORIES).forEach(([cat, keys]) => {
    keys.forEach(k => { KEY_TO_CATEGORY[k] = CAT_LABELS[cat]; });
});

// ── Icon assignment by category ─────────────────────────────────────────
const CAT_ICONS = {
    'Common Beast':          '🐾',
    'Humanoid':              '⚔️',
    'Undead':                '💀',
    'Corrupted':             '🌑',
    'Elemental / Construct': '🔥',
    'Draconic':              '🐉',
    'Demonic':               '😈',
    'Void Entity':           '🌀',
    'Ancient / Boss':        '👑',
};

// ── Hand-crafted flavor entries (layered over auto-generated base) ──────
const BESTIARY_FLAVOR = {
    slime: {
        icon: '🟢',
        flavor: 'A quivering mass of translucent gel found in caves and dungeons throughout the land. They have always existed here — but they have never been this numerous. Whatever is waking beneath the world, the slimes feel it.',
        hunterNote: (n) => `${n}, aim for the darker nucleus near the top. Hit it and the whole body destabilises. Miss it and you are just splashing gel around.`,
    },
    poop_slime: {
        icon: '💩',
        flavor: 'Nobody is quite sure where these came from. The scholars refuse to study them. The dungeon delvers have strong opinions about the smell.',
        hunterNote: (n) => `${n} — just... aim for the middle and back away quickly.`,
    },
    wolf: {
        icon: '🐺',
        flavor: 'Once creatures of open forest and clean air. They have been driven from their territories by something they fear more than you. That something is still out there.',
        hunterNote: (n) => `Watch the shoulders not the head, ${n}. They drop just before a lunge — half a second to sidestep. Use it.`,
    },
    dire_wolf: {
        icon: '🐺',
        flavor: 'Twice the size of a normal wolf, with intelligence enough to coordinate with its pack. The tremors from the Waking have scattered their packs and driven them into areas where humans were previously safe.',
        hunterNote: (n) => `Never fight a dire wolf alone if there are others nearby, ${n}. They signal each other. Kill the one howling first.`,
    },
    skeleton: {
        icon: '💀',
        flavor: 'Bone animated by the overflow of energy from the weakening seal. The empty eye sockets carry no memory, no purpose — only the instruction to oppose the living. As the seal cracks further, the dead rise faster.',
        hunterNote: (n) => `Blunt weapons, ${n}. Always blunt. Blades slide between ribs and stick. A hammer strike to the pelvis drops them — they cannot walk without it.`,
    },
    zombie: {
        icon: '🧟',
        flavor: 'The freshly dead, animated within hours of passing. The seal\'s decay has thinned the barrier between life and death to the point where corpses near ley lines rise without any intention at all. They simply get back up.',
        hunterNote: (n) => `Slow, ${n}, but they do not tire. Do not let them corner you. Head or spine — anything else just makes them slower.`,
    },
    ghost: {
        icon: '👻',
        flavor: 'A spirit that refuses to accept its death, repeating patterns from its former life with the terrible patience of something that no longer ages. The Waking has not created them — it has prevented them from moving on.',
        hunterNote: (n) => `Magic or silver, ${n}. Anything physical passes through. No magic and no silver? Find another route.`,
    },
    goblin: {
        icon: '👺',
        flavor: 'Small, fast, and smarter than they look. The tremors have collapsed many of their underground warrens, forcing them into areas previously claimed by larger creatures — and by people.',
        hunterNote: (n) => `They go for ankles and eyes, ${n}. Keep your guard high and watch for the ones hiding behind the ones you can see.`,
    },
    orc: {
        icon: '💪',
        flavor: 'Driven from their traditional territories by the chaos of the Waking, orc warbands have become unpredictable and desperate. A desperate orc is significantly more dangerous than a comfortable one.',
        hunterNote: (n) => `They favor their weapon arm, ${n}. Attack from the off side. They are strong enough that blocking straight on is a mistake.`,
    },
    bandit: {
        icon: '🗡️',
        flavor: 'Someone who made a choice when the world started shaking — to take rather than fight. You can almost understand it. The understanding does not make them less dangerous.',
        hunterNote: (n) => `Unlike monsters, ${n}, bandits calculate risk. Look confident. Hesitate and they read it.`,
    },
    troll: {
        icon: '👹',
        flavor: 'The Waking has been particularly unkind to trolls — the tremors have destabilised their lairs, the displaced creature migrations have invaded their feeding grounds, and the ambient energy from the cracking seal makes them aggressive in ways they normally are not.',
        hunterNote: (n) => `Regeneration, ${n}. Fire or acid stops it. If you have neither, you need to end it faster than it can heal — which is faster than you think.`,
    },
    dragon: {
        icon: '🐉',
        flavor: 'Old enough to remember the last cycle. It fought against the original sealing. It is still fighting. The patience of something truly ancient is difficult to comprehend until you are standing in front of it.',
        hunterNote: (n) => `The scales are impenetrable from the front, ${n}. The underside near the hindquarters is thinner. Getting there without dying is the entire challenge.`,
    },
    demon: {
        icon: '😈',
        flavor: 'The Calamity Dragon\'s approach tears holes in the fabric of reality. Demons are what comes through the holes — not summoned, not invited. Simply opportunistic. The seal has been keeping them out for a thousand years.',
        hunterNote: (n) => `Stay out of the wing arc, ${n}. The physical strike hurts, but the disorientation is the real damage. Hit from behind when the wings extend.`,
    },
    vampire: {
        icon: '🧛',
        flavor: 'Ancient predators who have maintained careful balances with human settlements for centuries. The Waking has disrupted those balances. When the dead rise without intention, the distinction between a vampire\'s careful cultivation and crude undeath becomes academic.',
        hunterNote: (n) => `Sunlight or a stake to the heart, ${n}. Classic for a reason. They are fast and they know you are coming before you arrive — do not give them time to prepare.`,
    },
    lich: {
        icon: '💀',
        flavor: 'A mage who refused death by binding their soul to an external object. The Waking has been a gift to liches — the overflow of death energy from the cracking seal makes their power easier to maintain, and the chaos gives them cover to operate openly for the first time in centuries.',
        hunterNote: (n) => `Find the phylactery first, ${n}. Killing the body means nothing if the soul-object survives. They always keep it close. Think about what they value most.`,
    },
    void_walker: {
        icon: '🌀',
        flavor: 'Something that should not exist in a world where the seal holds. The seal has been keeping out more than one thing for a thousand years. As it cracks, the void finds gaps.',
        hunterNote: (n) => `They phase in and out, ${n}. Watch for the shimmer just before they solidify — that is your window. Strike then or wait for the next cycle.`,
    },
    chaos_dragon: {
        icon: '🐉',
        flavor: 'Not a natural dragon. Something that the chaos energies of the Waking shaped from raw unstable power. It has a dragon\'s form and a dragon\'s ferocity and none of a dragon\'s intelligence — which makes it, in some ways, more dangerous.',
        hunterNote: (n) => `No patterns, ${n}. Chaos dragons do not telegraph. Stay mobile and reactive. Do not try to read them — just survive their attacks and counter.`,
    },
    red_dragon: {
        icon: '🔴',
        flavor: 'The oldest living dragon in the known world, and the one most agitated by the Waking. It remembers the last cycle. It has been waiting, in its fashion, for a thousand years.',
        hunterNote: (n) => `${n}, if you are fighting this — you already know what you need to know. The talismans. That is the answer.`,
    },
};

// ── Build BESTIARY_DATA at runtime from ENEMIES + crafted flavor ────────
// Called once after ENEMIES is defined. Populates the global BESTIARY_DATA.
function buildBestiaryData() {
    const data = {};

    if (typeof ENEMIES === 'undefined') return data;

    Object.keys(ENEMIES).forEach(key => {
        const e = ENEMIES[key];
        const category = KEY_TO_CATEGORY[key] || 'Common Beast';
        const craft    = BESTIARY_FLAVOR[key] || {};
        const icon     = craft.icon || CAT_ICONS[category] || '❓';

        // Auto-generate hunter note if not hand-crafted
        const hunterNote = craft.hunterNote || ((n) =>
            `${n} — after ${25} encounters, you know this enemy well. Trust your instincts.`
        );

        data[key] = {
            name:       e.name || key,
            icon,
            category,
            flavor:     craft.flavor || (e.description || 'A creature disturbed by the Waking of Azrath the Calamity Dragon.'),
            stats: {
                hp:      `${e.baseHp}`,
                level:   `${e.level}`,
                damage:  e.minDamage !== undefined ? `${e.minDamage}–${e.maxDamage}` : `${e.baseDamage}`,
                defense: `${e.baseDefense}`,
                xp:      `${e.baseXp}`,
                gold:    `${e.baseGold}`,
            },
            lore:       craft.lore || null,
            hunterNote,
        };
    });

    // Add Azrath as the ultimate boss entry (not in ENEMIES — narrative only)
    data['azrath'] = {
        name: 'Azrath the Calamity Dragon',
        icon: '🔴',
        category: CAT_LABELS.ancient,
        flavor: 'Sealed a thousand years ago by Brennan the Unbroken. The tremors began when the seal started failing. Every creature you have fought, every dungeon you have survived, every level you have earned — it has all been in preparation for this.',
        stats: { hp: '???', level: '25', damage: '???', defense: '???', xp: '???', gold: '???' },
        lore: 'The seal Brennan built was never meant to be permanent — only to buy the world time. Time enough for someone of his bloodline to reach their full potential and finish what he started. The four talismans were his insurance. You are his inheritance.',
        hunterNote: (n) => `${n}. If you are reading this, you are ready. You have always been ready. You just needed to become who you are now. The talismans know what to do. Trust them. Trust yourself. Brennan trusted you a thousand years before you were born.`,
    };

    return data;
}

// ── BESTIARY_DATA is populated after page load when ENEMIES is available ─
let BESTIARY_DATA = {};
window.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure ENEMIES is fully defined
    setTimeout(() => {
        BESTIARY_DATA = buildBestiaryData();
        console.log(`✅ Bestiary built: ${Object.keys(BESTIARY_DATA).length} entries`);
        updateBestiaryNotificationBadge();
    }, 100);
});

// ── Display order for Bestiary tab (category sort order) ─────────────────
const BESTIARY_CAT_ORDER = [
    'Common Beast',
    'Humanoid',
    'Undead',
    'Corrupted',
    'Elemental / Construct',
    'Draconic',
    'Demonic',
    'Void Entity',
    'Ancient / Boss',
];

// ── CHRONICLE_CONTENT is built by the lore-*.js files loaded above ──────
// Nothing to patch — each lore file sets level and cls directly.

// ── Refresh badges on page load once player is available ────────────────
window.addEventListener('load', () => {
    setTimeout(refreshAllBadges, 800);
});

// ═══════════════════════════════════════════════════════════════════════
// END CHRONICLE & BESTIARY UI
