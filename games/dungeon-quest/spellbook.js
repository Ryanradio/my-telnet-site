// ═══════════════════════════════════════════════════════════════
// SPELLBOOK.JS
// Animated class-themed spellbook with drag-and-drop spell loadout.
// ═══════════════════════════════════════════════════════════════

const SPELLBOOK_THEMES = {
    mage: {
        title: 'Arcane Tome',
        cover: 'linear-gradient(135deg, #0a0a2e 0%, #1a0a4e 40%, #0d0d3a 100%)',
        spine: '#8844ff',
        glow: '#8844ff',
        glowSoft: 'rgba(136,68,255,0.35)',
        pageLeft: 'linear-gradient(160deg, #0a0820 0%, #12082e 100%)',
        pageRight: 'linear-gradient(200deg, #12082e 0%, #0a0820 100%)',
        borderColor: '#8844ff',
        accentColor: '#FFD700',
        rune: '✦ ✧ ✦',
        symbol: '🔮',
        titleColor: '#cc99ff',
        slotColor: '#8844ff',
        slotGlow: 'rgba(136,68,255,0.5)',
    },
    cleric: {
        title: 'Prayer Book',
        cover: 'linear-gradient(135deg, #1a1410 0%, #2e2218 40%, #1a1410 100%)',
        spine: '#c8b89a',
        glow: '#fffbe6',
        glowSoft: 'rgba(255,251,230,0.3)',
        pageLeft: 'linear-gradient(160deg, #12100a 0%, #1e1a10 100%)',
        pageRight: 'linear-gradient(200deg, #1e1a10 0%, #12100a 100%)',
        borderColor: '#c8b89a',
        accentColor: '#fffbe6',
        rune: '† ✝ †',
        symbol: '✨',
        titleColor: '#fffbe6',
        slotColor: '#c8b89a',
        slotGlow: 'rgba(200,184,154,0.5)',
    },
    warlock: {
        title: 'Grimoire',
        cover: 'linear-gradient(135deg, #0a0000 0%, #1a0000 40%, #0d0000 100%)',
        spine: '#cc0000',
        glow: '#ff2222',
        glowSoft: 'rgba(200,0,0,0.4)',
        pageLeft: 'linear-gradient(160deg, #100000 0%, #1a0000 100%)',
        pageRight: 'linear-gradient(200deg, #1a0000 0%, #100000 100%)',
        borderColor: '#cc0000',
        accentColor: '#ff4444',
        rune: '⛧ ✶ ⛧',
        symbol: '💀',
        titleColor: '#ff6666',
        slotColor: '#cc0000',
        slotGlow: 'rgba(200,0,0,0.5)',
    },
};

window.SPELLBOOK_CASTER_CLASSES = new Set(['mage', 'cleric', 'warlock']);

let _currentSpellbookTab = 'damage';

function _sbSpellTypeLabel(type) {
    switch (type) {
        case 'heal': return { icon: '💚', label: 'HEAL', color: '#44ff88' };
        case 'aoe_damage': return { icon: '💥', label: 'AOE', color: '#FF8800' };
        case 'lifesteal': return { icon: '🩸', label: 'DRAIN', color: '#ff4466' };
        default: return { icon: '⚡', label: 'ATTACK', color: '#88aaff' };
    }
}

function initEquippedSpells() {
    const p = gameState.player;
    if (!p) return;
    if (!p.equippedSpells || !Array.isArray(p.equippedSpells)) {
        p.equippedSpells = (p.knownSpells || []).slice(0, 3);
    }
    if (p.equippedSpells.length > 3) p.equippedSpells = p.equippedSpells.slice(0, 3);
    p.equippedSpells = p.equippedSpells.filter(sk => (p.knownSpells || []).includes(sk));
}

function openSpellbook() {
    const p = gameState.player;
    if (!p) return;

    const invOverlay = document.getElementById('dungeonInvOverlay');
    if (invOverlay) invOverlay.remove();

    const existing = document.getElementById('spellbookOverlay');
    if (existing) existing.remove();

    initEquippedSpells();

    const cls = p.baseClass || p.class;
    const theme = SPELLBOOK_THEMES[cls] || SPELLBOOK_THEMES.mage;

    _injectSpellbookStyles(theme);

    const overlay = document.createElement('div');
    overlay.id = 'spellbookOverlay';
    overlay.style.cssText = `
        position:fixed;inset:0;z-index:3000;
        display:flex;align-items:center;justify-content:center;
        background:rgba(0,0,0,0.85);
        font-family:'VT323',monospace;
    `;

    // Mobile detection for layout
    const isMobile = window.innerWidth <= 768;

    overlay.innerHTML = `
        <div id="sbContainer" style="
            width:100%;max-width:820px;height:100%;
            display:flex;flex-direction:column;
            align-items:center;justify-content:${isMobile ? 'flex-start' : 'center'};
            padding:16px;box-sizing:border-box;
            position:relative;
            overflow-y:auto;
        ">
            <button id="sbCloseBtn" style="
                position:fixed;top:12px;right:12px;
                padding:10px 20px;font-size:18px;
                border-color:#ff4444;color:#ff4444;
                background:#0a0a0a;
                font-family:'VT323',monospace;
                z-index:100;border-radius:8px;
            ">✕ CLOSE</button>

            <div id="sbBook" style="
                width:100%;
                max-width:760px;
                margin:${isMobile ? '60px auto 20px auto' : '0 auto'};
            ">
                <div id="sbCover" style="width:100%;display:flex;align-items:center;justify-content:center;">
                    <div id="sbCoverInner" style="
                        width:320px;max-width:90vw;height:420px;
                        background:${theme.cover};
                        border:3px solid ${theme.borderColor};
                        border-radius:4px 12px 12px 4px;
                        box-shadow: -6px 0 0 ${theme.spine},
                                    0 0 40px ${theme.glowSoft},
                                    inset 0 0 30px rgba(0,0,0,0.6);
                        display:flex;flex-direction:column;
                        align-items:center;justify-content:center;
                        gap:16px;cursor:pointer;
                        user-select:none;
                        transform:rotateY(0deg);
                        transition:transform 0.15s ease, box-shadow 0.15s ease;
                    ">
                        <div style="font-size:48px;filter:drop-shadow(0 0 12px ${theme.glow});">${theme.symbol}</div>
                        <div style="color:${theme.accentColor};font-size:11px;letter-spacing:4px;text-shadow:0 0 8px ${theme.accentColor};opacity:0.7;">${theme.rune}</div>
                        <div style="color:${theme.titleColor};font-size:26px;letter-spacing:3px;text-shadow:0 0 12px ${theme.glow};text-align:center;padding:0 20px;">${theme.title.toUpperCase()}</div>
                        <div style="color:${theme.accentColor};font-size:11px;letter-spacing:4px;text-shadow:0 0 8px ${theme.accentColor};opacity:0.7;">${theme.rune}</div>
                        <div style="color:#555;font-size:13px;letter-spacing:2px;margin-top:8px;">TAP TO OPEN</div>
                    </div>
                </div>

                <div id="sbPages" style="width:100%;display:none;flex-direction:column;gap:16px;">
                    <!-- COMBAT LOADOUT SECTION (top on mobile) -->
                    <div id="sbLoadoutSection" style="
                        background:${theme.pageLeft};
                        border:2px solid ${theme.borderColor};
                        border-radius:12px;
                        padding:16px;
                        box-shadow:inset 0 0 20px rgba(0,0,0,0.4);
                    ">
                        <div style="color:${theme.accentColor};font-size:16px;letter-spacing:3px;text-align:center;text-shadow:0 0 8px ${theme.accentColor};padding-bottom:8px;">⚔️ COMBAT LOADOUT ⚔️</div>
                        <div style="color:#888;font-size:12px;text-align:center;margin-bottom:12px;">Tap a spell to equip | Tap equipped to remove</div>
                        <div id="sbSlots" style="display:flex;flex-direction:row;flex-wrap:wrap;gap:10px;justify-content:center;"></div>
                    </div>

                    <!-- SPELL LIBRARY SECTION (bottom on mobile) -->
                    <div id="sbLibrarySection" style="
                        background:${theme.pageRight};
                        border:2px solid ${theme.borderColor};
                        border-radius:12px;
                        padding:16px;
                        box-shadow:inset 0 0 20px rgba(0,0,0,0.4);
                        flex:1;
                    ">
                        <div id="sbTabs" style="display:flex; gap:8px; margin-bottom:16px; border-bottom:2px solid ${theme.borderColor}; flex-wrap:wrap; justify-content:center;"></div>
                        <div id="sbSpellGrid" style="display:flex;flex-direction:column;gap:10px;max-height:${isMobile ? '400px' : '500px'};overflow-y:auto;padding:4px;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('sbCloseBtn').addEventListener('click', closeSpellbook);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSpellbook(); });

    const coverInner = document.getElementById('sbCoverInner');
    coverInner.addEventListener('click', () => _animateBookOpen(theme));
    coverInner.addEventListener('mouseenter', () => {
        coverInner.style.transform = 'rotateY(-8deg)';
        coverInner.style.boxShadow = `-10px 0 0 ${theme.spine}, 0 0 60px ${theme.glowSoft}, inset 0 0 30px rgba(0,0,0,0.6)`;
    });
    coverInner.addEventListener('mouseleave', () => {
        coverInner.style.transform = 'rotateY(0deg)';
        coverInner.style.boxShadow = `-6px 0 0 ${theme.spine}, 0 0 40px ${theme.glowSoft}, inset 0 0 30px rgba(0,0,0,0.6)`;
    });

    // Also update the slot rendering to be mobile-friendly
    // The existing renderSpellbookSlots function will populate sbSlots
    if (typeof renderSpellbookSlots === 'function') {
        renderSpellbookSlots();
    }
    if (typeof renderSpellbookSpells === 'function') {
        renderSpellbookSpells();
    }
}

function _buildSlotHTML(p, theme, idx) {
    const spellKey = (p.equippedSpells || [])[idx];
    const spell = spellKey ? (SPELLS[spellKey] || null) : null;

    if (spell) {
        const tl = _sbSpellTypeLabel(spell.type);
        return `
        <div class="sb-slot sb-slot-filled" data-slot="${idx}" data-spell-key="${spellKey}" style="
            border:2px solid ${theme.slotColor};
            box-shadow:0 0 12px ${theme.slotGlow};
            background:rgba(0,0,0,0.5);
            border-radius:6px;padding:10px 12px;
            display:flex;flex-direction:column;gap:4px;
            min-height:72px;
            position:relative;
            cursor:grab;
        ">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:${theme.titleColor};font-size:15px;letter-spacing:1px;">${spell.name}</span>
                <span style="color:${tl.color};font-size:11px;letter-spacing:1px;">${tl.icon} ${tl.label}</span>
            </div>
            <div style="color:#888;font-size:12px;">
    💙 ${spell.mpCost} MP &nbsp;·&nbsp; ⚡ ${spell.pipCost || 1} pip${(spell.pipCost||1)>1?'s':''}
</div>
${spell.minPower !== undefined ? `
<div style="color:${spell.type === 'heal' ? '#88FF88' : '#FF8888'}; font-size:11px; margin-top:4px;">
    ${spell.type === 'heal' ? '💚' : '⚔️'} ${spell.minPower}-${spell.maxPower} ${spell.type === 'heal' ? 'HP' : 'DMG'}${spell.lifestealPercent ? ` (${spell.lifestealPercent}% leech)` : ''}
</div>
` : ''}
            <div style="color:#555;font-size:11px;">${spell.description || ''}</div>
            <div style="position:absolute;top:4px;right:4px;color:#333;font-size:10px;letter-spacing:1px;">SLOT ${idx + 1}</div>
        </div>`;
    }

    return `
    <div class="sb-slot sb-slot-empty" data-slot="${idx}" style="
        border:2px dashed ${theme.slotColor}55;
        border-radius:6px;padding:10px 12px;
        display:flex;align-items:center;justify-content:center;
        min-height:72px;
        color:#333;font-size:13px;letter-spacing:2px;
        position:relative;
    ">
        [ SLOT ${idx + 1} — EMPTY ]
    </div>`;
}

function _buildSpellCardsHTML(p, theme) {
    const equipped = new Set(p.equippedSpells || []);
    const known = (p.knownSpells || []);
    
    if (known.length === 0) {
        return `<div style="color:#444;font-size:13px;text-align:center;padding:20px;">No spells learned yet.</div>`;
    }
    
    const damageSpells = [];
    const healingSpells = [];
    
    known.forEach(sk => {
        const spell = SPELLS[sk] || null;
        if (!spell) return;
        
        const isHealing = spell.type === 'heal' || spell.type === 'lifesteal';
        
        if (isHealing) {
            healingSpells.push({ sk, spell });
        } else {
            damageSpells.push({ sk, spell });
        }
    });
    
    const sortByLevel = (a, b) => (a.spell.level || 1) - (b.spell.level || 1);
    damageSpells.sort(sortByLevel);
    healingSpells.sort(sortByLevel);
    
    const currentSpells = _currentSpellbookTab === 'damage' ? damageSpells : healingSpells;
    const spellColor = _currentSpellbookTab === 'damage' ? '#FF6666' : '#44FF88';
    
    return currentSpells.map(({ sk, spell }) => {
        const isEquipped = equipped.has(sk);
        const opacity = isEquipped ? '0.28' : '1';
        const cursor = isEquipped ? 'default' : 'grab';
        const tl = _sbSpellTypeLabel(spell.type);
        const equipped_tag = isEquipped ? `<span style="color:#555;font-size:10px;letter-spacing:1px;">✓ EQUIPPED</span>` : '';
        const levelColor = spell.level <= p.level ? '#44FF88' : '#FF8844';
        
        // Build power display string
        let powerDisplay = '';
        if (spell.minPower !== undefined) {
            const powerIcon = spell.type === 'heal' ? '💚' : '⚔️';
            const powerLabel = spell.type === 'heal' ? 'Heal' : 'Damage';
            const lifeStealText = spell.lifestealPercent ? ` (${spell.lifestealPercent}% leech)` : '';
            powerDisplay = `
                <div style="color:${isEquipped ? '#555' : (spell.type === 'heal' ? '#88FF88' : '#FF8888')}; font-size:11px; margin-top:4px;">
                    ${powerIcon} ${powerLabel}: ${spell.minPower} - ${spell.maxPower} ${spell.type === 'heal' ? 'HP' : 'DMG'}${lifeStealText}
                </div>
            `;
        }
        
        return `
        <div class="sb-spell-card${isEquipped ? ' sb-spell-equipped' : ''}" data-spell-key="${sk}" style="
            border:1px solid ${isEquipped ? '#333' : theme.borderColor};
            border-radius:6px;padding:10px 12px;
            background:rgba(0,0,0,0.4);
            opacity:${opacity};
            cursor:${cursor};
            transition:opacity 0.2s, border-color 0.2s;
            position:relative;
            touch-action:none;
            user-select:none;
        ">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:${isEquipped ? '#555' : spellColor}; font-size:15px;">${spell.name}</span>
                <span style="color:${isEquipped ? '#444' : tl.color}; font-size:11px;">${tl.icon} ${tl.label}</span>
            </div>
            <div style="color:${isEquipped ? '#333' : '#777'}; font-size:12px; margin-top:2px;">
                💙 ${spell.mpCost} MP &nbsp;·&nbsp; ⚡ ${spell.pipCost||1} pip${(spell.pipCost||1)>1?'s':''}
                &nbsp;·&nbsp; <span style="color:${levelColor};">⭐ Lv ${spell.level}</span>
            </div>
            ${powerDisplay}
            <div style="color:${isEquipped ? '#333' : '#555'}; font-size:11px; margin-top:2px;">${spell.description || ''}</div>
            ${equipped_tag}
        </div>`;
    }).join('');
}

function _switchSpellbookTab(tab) {
    _currentSpellbookTab = tab;
    const p = gameState.player;
    const theme = _getCurrentTheme();
    const grid = document.getElementById('sbSpellGrid');
    if (grid) {
        grid.innerHTML = _buildSpellCardsHTML(p, theme);
        _initDragAndDrop(theme);
    }
    _updateTabStyles(theme);
}

function _updateTabStyles(theme) {
    const damageBtn = document.getElementById('sbTabDamage');
    const healingBtn = document.getElementById('sbTabHealing');
    if (!damageBtn || !healingBtn) return;
    
    if (_currentSpellbookTab === 'damage') {
        damageBtn.style.background = theme.slotColor + '22';
        damageBtn.style.borderBottom = `2px solid ${theme.slotColor}`;
        damageBtn.style.color = theme.titleColor;
        healingBtn.style.background = 'transparent';
        healingBtn.style.borderBottom = '2px solid transparent';
        healingBtn.style.color = '#666';
    } else {
        healingBtn.style.background = theme.slotColor + '22';
        healingBtn.style.borderBottom = `2px solid ${theme.slotColor}`;
        healingBtn.style.color = theme.titleColor;
        damageBtn.style.background = 'transparent';
        damageBtn.style.borderBottom = '2px solid transparent';
        damageBtn.style.color = '#666';
    }
}

function _getCurrentTheme() {
    const p = gameState.player;
    const cls = p ? (p.baseClass || p.class) : 'mage';
    return SPELLBOOK_THEMES[cls] || SPELLBOOK_THEMES.mage;
}

function _animateBookOpen(theme) {
    const cover = document.getElementById('sbCover');
    const pages = document.getElementById('sbPages');
    const coverInner = document.getElementById('sbCoverInner');
    
    coverInner.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease 0.2s';
    coverInner.style.transform = 'rotateY(-90deg) scaleX(0.3)';
    coverInner.style.opacity = '0';

    setTimeout(() => {
        cover.style.display = 'none';
        pages.style.display = 'flex';
        pages.style.opacity = '0';
        pages.style.transform = 'scaleX(0.15) rotateY(20deg)';
        pages.style.transition = 'none';
        
        const p = gameState.player;
        
        // Fill slots
        const slotsContainer = document.getElementById('sbSlots');
        if (slotsContainer) {
            slotsContainer.innerHTML = _buildSlotHTML(p, theme, 0) + _buildSlotHTML(p, theme, 1) + _buildSlotHTML(p, theme, 2);
        }
        
        // Create tabs ONLY in the sbTabs container (not inside spell grid)
        const tabsContainer = document.getElementById('sbTabs');
        if (tabsContainer) {
            const damageCount = (p.knownSpells || []).filter(sk => {
                const spell = SPELLS[sk];
                return spell && spell.type !== 'heal' && spell.type !== 'lifesteal';
            }).length;
            const healingCount = (p.knownSpells || []).filter(sk => {
                const spell = SPELLS[sk];
                return spell && (spell.type === 'heal' || spell.type === 'lifesteal');
            }).length;
            
            tabsContainer.innerHTML = `
                <button id="sbTabDamage" data-tab="damage" style="
                    flex:1;
                    background:${_currentSpellbookTab === 'damage' ? theme.slotColor + '22' : 'transparent'};
                    border:none;
                    border-bottom:2px solid ${_currentSpellbookTab === 'damage' ? theme.slotColor : 'transparent'};
                    color:${_currentSpellbookTab === 'damage' ? theme.titleColor : '#666'};
                    font-family:'VT323',monospace;
                    font-size:14px;
                    padding:8px;
                    cursor:pointer;
                    letter-spacing:2px;
                ">
                    ⚔️ DAMAGE <span style="background:#333; padding:0 6px; border-radius:10px; margin-left:5px;">${damageCount}</span>
                </button>
                <button id="sbTabHealing" data-tab="healing" style="
                    flex:1;
                    background:${_currentSpellbookTab === 'healing' ? theme.slotColor + '22' : 'transparent'};
                    border:none;
                    border-bottom:2px solid ${_currentSpellbookTab === 'healing' ? theme.slotColor : 'transparent'};
                    color:${_currentSpellbookTab === 'healing' ? theme.titleColor : '#666'};
                    font-family:'VT323',monospace;
                    font-size:14px;
                    padding:8px;
                    cursor:pointer;
                    letter-spacing:2px;
                ">
                    💚 HEALING <span style="background:#333; padding:0 6px; border-radius:10px; margin-left:5px;">${healingCount}</span>
                </button>
            `;
            
            document.getElementById('sbTabDamage')?.addEventListener('click', () => _switchSpellbookTab('damage'));
            document.getElementById('sbTabHealing')?.addEventListener('click', () => _switchSpellbookTab('healing'));
        }
        
        // Fill spell grid
        const grid = document.getElementById('sbSpellGrid');
        if (grid) {
            grid.innerHTML = _buildSpellCardsHTML(p, theme);
        }
        
        void pages.offsetWidth;
        
        pages.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease';
        pages.style.transform = 'scaleX(1) rotateY(0deg)';
        pages.style.opacity = '1';

        setTimeout(() => {
            pages.style.transition = 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)';
            pages.style.transform = 'scaleX(1.015)';
            setTimeout(() => {
                pages.style.transition = 'transform 0.12s ease';
                pages.style.transform = 'scaleX(1)';
                _initDragAndDrop(theme);
            }, 180);
        }, 450);
    }, 320);
}

function _initDragAndDrop(theme) {
    const p = gameState.player;
    let dragGhost = null;
    let dragSpellKey = null;
    let dragSource = null;
    let dragSlotIdx = null;
    let activeSlot = null;

    function _startGhost(e, sourceEl) {
        const spell = SPELLS[dragSpellKey];
        if (!spell) return;

        dragGhost = document.createElement('div');
        dragGhost.style.cssText = `
            position:fixed;z-index:9999;pointer-events:none;
            width:200px;padding:10px 12px;
            background:#050505;
            border:2px solid ${theme.slotColor};
            box-shadow:0 0 24px ${theme.slotGlow}, 0 8px 30px rgba(0,0,0,0.7);
            border-radius:6px;font-family:'VT323',monospace;
            opacity:0.92;transform:rotate(-2deg) scale(1.04);
            transition:none;
        `;
        const tl = _sbSpellTypeLabel(spell.type);
        dragGhost.innerHTML = `
            <div style="color:${theme.titleColor};font-size:15px;">${spell.name}</div>
            <div style="color:${tl.color};font-size:12px;">${tl.icon} ${tl.label} · 💙${spell.mpCost}</div>
        `;
        document.body.appendChild(dragGhost);
        _moveGhost(e);
        sourceEl.style.opacity = '0.3';
    }

    function _moveGhost(e) {
        if (!dragGhost) return;
        dragGhost.style.left = (e.clientX - 100) + 'px';
        dragGhost.style.top = (e.clientY - 30) + 'px';

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const slot = el ? el.closest('.sb-slot') : null;
        if (slot !== activeSlot) {
            if (activeSlot) activeSlot.style.borderStyle = activeSlot.classList.contains('sb-slot-empty') ? 'dashed' : 'solid';
            activeSlot = slot;
            if (activeSlot) activeSlot.style.borderStyle = 'solid';
        }
    }

    function _endDrag(e) {
        if (!dragGhost) {
            dragSpellKey = null;
            return;
        }

        dragGhost.remove();
        dragGhost = null;

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const slot = el ? el.closest('.sb-slot') : null;

        if (slot && dragSource === 'card') {
            const slotIdx = parseInt(slot.dataset.slot);
            _equipSpell(dragSpellKey, slotIdx, theme);
        } else if (slot && dragSource === 'slot' && parseInt(slot.dataset.slot) !== dragSlotIdx) {
            const targetIdx = parseInt(slot.dataset.slot);
            _swapSlots(dragSlotIdx, targetIdx, theme);
        } else if (!slot && dragSource === 'slot') {
            _unequipSpell(dragSlotIdx, theme);
        } else {
            _refreshPages(theme);
        }

        if (activeSlot) {
            activeSlot.style.borderStyle = activeSlot.classList.contains('sb-slot-empty') ? 'dashed' : 'solid';
            activeSlot = null;
        }
        dragSpellKey = null;
        dragSource = null;
        dragSlotIdx = null;
    }

    // Attach to spell cards (only non-equipped ones)
    const cards = document.querySelectorAll('.sb-spell-card:not(.sb-spell-equipped)');
    cards.forEach(card => {
        card.removeEventListener('pointerdown', null);
        card.removeEventListener('pointermove', null);
        card.removeEventListener('pointerup', null);
        
        card.addEventListener('pointerdown', e => {
            e.preventDefault();
            dragSpellKey = card.dataset.spellKey;
            dragSource = 'card';
            dragSlotIdx = null;
            _startGhost(e, card);
            card.setPointerCapture(e.pointerId);
        });
        card.addEventListener('pointermove', e => { if (dragSpellKey) _moveGhost(e); });
        card.addEventListener('pointerup', e => { if (dragSpellKey) _endDrag(e); });
    });

    // Attach to filled slots
    const filledSlots = document.querySelectorAll('.sb-slot-filled');
    filledSlots.forEach(slot => {
        slot.removeEventListener('pointerdown', null);
        slot.removeEventListener('pointermove', null);
        slot.removeEventListener('pointerup', null);
        
        slot.addEventListener('pointerdown', e => {
            e.preventDefault();
            dragSpellKey = slot.dataset.spellKey;
            dragSource = 'slot';
            dragSlotIdx = parseInt(slot.dataset.slot);
            _startGhost(e, slot);
            slot.setPointerCapture(e.pointerId);
        });
        slot.addEventListener('pointermove', e => { if (dragSpellKey) _moveGhost(e); });
        slot.addEventListener('pointerup', e => { if (dragSpellKey) _endDrag(e); });
    });
}

function _equipSpell(spellKey, slotIdx, theme) {
    const p = gameState.player;
    initEquippedSpells();

    const existingIdx = p.equippedSpells.indexOf(spellKey);
    if (existingIdx !== -1) p.equippedSpells.splice(existingIdx, 1);

    p.equippedSpells[slotIdx] = spellKey;
    p.equippedSpells = p.equippedSpells.filter(Boolean);
    _onLoadoutChanged(theme);
}

function _unequipSpell(slotIdx, theme) {
    const p = gameState.player;
    initEquippedSpells();
    p.equippedSpells.splice(slotIdx, 1);
    _onLoadoutChanged(theme);
}

function _swapSlots(fromIdx, toIdx, theme) {
    const p = gameState.player;
    initEquippedSpells();
    const a = p.equippedSpells[fromIdx];
    const b = p.equippedSpells[toIdx];
    p.equippedSpells[fromIdx] = b;
    p.equippedSpells[toIdx] = a;
    _onLoadoutChanged(theme);
}

function _onLoadoutChanged(theme) {
    const p = gameState.player;
    if (typeof localSave === 'function') localSave();
    else if (typeof saveGame === 'function') saveGame();

    if (gameState.combatState && typeof renderActionBar === 'function') {
        renderActionBar();
    }
    _refreshPages(theme);
}

function _refreshPages(theme) {
    const p = gameState.player;
    const slots = document.getElementById('sbSlots');
    const grid = document.getElementById('sbSpellGrid');
    if (!slots || !grid) return;

    slots.innerHTML = _buildSlotHTML(p, theme, 0) + _buildSlotHTML(p, theme, 1) + _buildSlotHTML(p, theme, 2);
    grid.innerHTML = _buildSpellCardsHTML(p, theme);
    _initDragAndDrop(theme);
}

function closeSpellbook() {
    const overlay = document.getElementById('spellbookOverlay');
    if (!overlay) return;
    overlay.style.transition = 'opacity 0.2s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
}

function _injectSpellbookStyles(theme) {
    if (document.getElementById('spellbook-styles')) return;
    const s = document.createElement('style');
    s.id = 'spellbook-styles';
    s.textContent = `
        #spellbookOverlay { animation: sbFadeIn 0.2s ease; }
        @keyframes sbFadeIn { from { opacity:0; } to { opacity:1; } }
        #sbPages { display:flex; flex-direction:row; width:100%; min-height:480px; max-height:calc(100vh - 120px); }
        #sbLeftPage, #sbRightPage { flex:1; }
        #sbRightPage { overflow-y:auto; -webkit-overflow-scrolling:touch; }
        .sb-spell-card { transition: transform 0.1s ease, box-shadow 0.1s ease; }
        .sb-spell-card:not(.sb-spell-equipped):active { transform: scale(0.97); }
        .sb-slot { transition: border-color 0.15s, box-shadow 0.15s; }
        .sb-slot-filled:active { cursor: grabbing; }
        @media (max-width: 520px) {
            #sbPages { flex-direction: column; min-height: unset; }
            #sbLeftPage { border-right: 2px solid; border-bottom: none; border-radius: 8px 8px 0 0 !important; }
            #sbRightPage { border-top: none; border-radius: 0 0 8px 8px !important; max-height:280px; }
            #sbContainer { justify-content: flex-start; padding-top:50px; }
        }
    `;
    document.head.appendChild(s);
}