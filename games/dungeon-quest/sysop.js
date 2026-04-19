// ═══════════════════════════════════════════════════════════════
// SYSOP TERMINAL SYSTEM — dev console, cheat commands, /give etc.
// Extracted from index.html
// Dependencies: gameState, termAppend, saveGame, showTown (runtime globals)
// ═══════════════════════════════════════════════════════════════

        // SYSOP TERMINAL SYSTEM
        // ═══════════════════════════════════════════════════════════════
        // Credentials are NOT stored in plaintext.
        // Username is stored as a base64 label only.
        // Password is verified by comparing SHA-256 hashes — the actual
        // password never appears anywhere in this source file.
        // SHA-256 cannot be reversed without brute-force.
        const _SYS = {
            // atob('U3lzb3A=') → 'Sysop'
            u: 'U3lzb3A=',
            // SHA-256 of the real password (not the password itself)
            h: '708bdb7228d3bc89a59db53a36d686bac51fba5126229428f9ea532b821e77ea'
        };

        async function _hashPassword(pw) {
            const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
            return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
        }

        async function _checkCredentials(u, p) {
            const expectedUser = atob(_SYS.u);
            if (u !== expectedUser) return false;
            const hashed = await _hashPassword(p);
            return hashed === _SYS.h;
        }

        // ══════════════════════════════════════════════════════════════
        // FULLSCREEN + iOS INSTALL BANNER
        // ══════════════════════════════════════════════════════════════

        // ══════════════════════════════════════════════════════════════
        // INSTALL APP MODAL  — detects platform, shows tailored steps
        // ══════════════════════════════════════════════════════════════

        // Detect platform
        function _getPlatform() {
            const ua = navigator.userAgent || '';
            const isStandalone = window.navigator.standalone === true ||
                                 window.matchMedia('(display-mode: standalone)').matches;
            if (isStandalone) return 'standalone';
            if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
            if (/android/i.test(ua)) return 'android';
            if (/macintosh|windows|linux/i.test(ua)) return 'desktop';
            return 'unknown';
        }

        // Content for each platform
        const _installContent = {
            standalone: {
                title: '✅ Already Installed!',
                steps: [
                    { icon: '🎮', text: 'You\'re already running Calamity Dungeon as an installed app.' },
                    { icon: '✨', text: 'Full-screen mode is active — enjoy your adventure!' }
                ]
            },
            ios: {
                title: '📱 Install on iPhone / iPad',
                steps: [
                    { icon: '1️⃣', text: 'Tap the <span class="install-highlight">⎙ Share</span> button at the bottom of Safari' },
                    { icon: '2️⃣', text: 'Scroll down and tap <span class="install-highlight">Add to Home Screen</span>' },
                    { icon: '3️⃣', text: 'Tap <span class="install-highlight">Add</span> in the top-right corner' },
                    { icon: '4️⃣', text: 'Open <span class="install-highlight">Calamity Dungeon</span> from your home screen — full-screen, no browser chrome!' }
                ]
            },
            android: {
                title: '📱 Install on Android',
                steps: [
                    { icon: '1️⃣', text: 'Tap the <span class="install-highlight">⋮ menu</span> in the top-right of Chrome' },
                    { icon: '2️⃣', text: 'Tap <span class="install-highlight">Add to Home screen</span> (or look for an install banner at the bottom)' },
                    { icon: '3️⃣', text: 'Tap <span class="install-highlight">Install</span> when prompted' },
                    { icon: '4️⃣', text: 'Open <span class="install-highlight">Calamity Dungeon</span> from your home screen for full-screen play!' }
                ]
            },
            desktop: {
                title: '🖥️ Install on Desktop',
                steps: [
                    { icon: '🌐', text: 'In <span class="install-highlight">Chrome or Edge</span>, look for the install icon (⊕) in the address bar' },
                    { icon: '2️⃣', text: 'Click <span class="install-highlight">Install</span> when prompted, or go to <span class="install-highlight">⋮ menu → Install Calamity Dungeon</span>' },
                    { icon: '3️⃣', text: 'Once installed it opens in its own window without browser chrome' },
                    { icon: 'ℹ️', text: 'Firefox and Safari desktop do <span class="install-highlight">not</span> support PWA install' }
                ]
            },
            unknown: {
                title: '📱 Install Calamity Dungeon',
                steps: [
                    { icon: '📖', text: 'Are you on <span class="install-highlight">iPhone/iPad</span>? Tap ⎙ Share → Add to Home Screen' },
                    { icon: '📖', text: 'Are you on <span class="install-highlight">Android</span>? Tap ⋮ menu → Add to Home Screen' },
                    { icon: '📖', text: 'Are you on <span class="install-highlight">Desktop</span>? Look for the ⊕ install icon in your address bar' }
                ]
            }
        };

        function openInstallModal() {
            const platform = _getPlatform();
            const content  = _installContent[platform] || _installContent.unknown;

            const stepsHtml = content.steps.map(s =>
                `<div class="install-step">
                    <span class="install-icon">${s.icon}</span>${s.text}
                </div>`
            ).join('');

            document.getElementById('installModalBody').innerHTML = `
                <div style="font-size:19px;color:var(--highlight-color);margin-bottom:10px;">
                    ${content.title}
                </div>
                ${stepsHtml}
                ${platform === 'unknown' ? `
                <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
                    <button onclick="_showInstallFor('ios')"    style="flex:1;font-size:14px;padding:6px;">🍎 iPhone</button>
                    <button onclick="_showInstallFor('android')" style="flex:1;font-size:14px;padding:6px;">🤖 Android</button>
                    <button onclick="_showInstallFor('desktop')" style="flex:1;font-size:14px;padding:6px;">🖥️ Desktop</button>
                </div>` : ''}
            `;

            document.getElementById('installModal').classList.add('open');
        }

        function _showInstallFor(platform) {
            const content = _installContent[platform] || _installContent.unknown;
            const stepsHtml = content.steps.map(s =>
                `<div class="install-step">
                    <span class="install-icon">${s.icon}</span>${s.text}
                </div>`
            ).join('');
            document.getElementById('installModalBody').innerHTML = `
                <div style="font-size:19px;color:var(--highlight-color);margin-bottom:10px;">
                    ${content.title}
                </div>
                ${stepsHtml}
                <button onclick="openInstallModal()" style="margin-top:10px;font-size:14px;padding:5px 10px;border-color:#555;">← Back</button>
            `;
        }

        function closeInstallModal() {
            document.getElementById('installModal').classList.remove('open');
        }

        // Close on backdrop click
        document.getElementById('installModal').addEventListener('click', function(e) {
            if (e.target === this) closeInstallModal();
        });



        // Toggle terminal with ~ key
        document.addEventListener('keydown', (e) => {
            if (e.key === '~' || e.key === '`') {
                e.preventDefault();
                toggleTerminal();
            }
            if (e.key === 'Escape' && gameState.sysop.terminalActive) {
                toggleTerminal();
            }
            // ── Dungeon keyboard navigation ───────────────────────────
            if (gameState.dungeon && !gameState.sysop.terminalActive) {
                const tag = document.activeElement?.tagName;
                const inInput = tag === 'INPUT' || tag === 'TEXTAREA';
                if (!inInput) {
                    const arrowMap = {
                        'ArrowUp':   'n',
                        'ArrowDown': 's',
                        'ArrowLeft': 'w',
                        'ArrowRight':'e'
                    };
                    if (arrowMap[e.key]) {
                        e.preventDefault();
                        dungeonNav(arrowMap[e.key]);
                    }
                }
            }
            // ── Combat / Explore keyboard shortcuts ──────────────────
            // Only on desktop (pointer:fine) and not in any input field
            // 1=Attack  2=Spell  3=Potion  4=Defend  5=Flee  6=Stats
            // Esc=Cancel/Back
            if (!gameState.sysop.terminalActive && gameState.combatState !== undefined) {
                const tag = document.activeElement?.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA') return;
                const cs = gameState.combatState;
                const mode = cs ? (cs.actionMode || 'main') : null;
                // Number keys 1-9 — context-sensitive across all menu layers
                const numKey = parseInt(e.key, 10);   // 1-9, or NaN
                if (!isNaN(numKey) && numKey >= 1) {
                    // ── Target selection (attack or spell aimed at a monster) ──
                    if (cs && (mode === 'target_attack' || mode === 'target_spell' || mode === 'target_staff_melee')) {
                        const idx = numKey - 1;
                        if (idx < cs.monsters.length) { e.preventDefault(); executeTargetedAction(idx); }
                        return;
                    }
                    // ── Spell list ──
                    if (cs && mode === 'spell_list') {
                        const validSpells = (gameState.player.knownSpells || []).map(sk => ensureSpellExists(sk) || SPELLS[sk]).filter(Boolean);
                        const weapon   = WEAPONS[gameState.player.weapon];
                        const hasStaff = weapon && (weapon.name.toLowerCase().includes('staff') || weapon.baseMagicDamage > 0);
                        const idx = numKey - 1;
                        if (idx < validSpells.length) {
                            e.preventDefault();
                            selectSpell(gameState.player.knownSpells.filter(sk => (ensureSpellExists(sk)||SPELLS[sk]))[idx]);
                        } else if (hasStaff && idx === validSpells.length) {
                            e.preventDefault(); staffMeleeAttack();
                        }
                        return;
                    }
                    // ── Attack type sub-menu ──
                    if (cs && mode === 'attack_type') {
                        if (numKey === 1) { e.preventDefault(); selectAttackType('normal'); }
                        else if (numKey === 2) { e.preventDefault(); selectAttackType('heavy'); }
                        else if (numKey === 3) {
                            const hl = cs.pipAvailable ? cs.pipAvailable.filter(x=>x).length : 0;
                            if (hl >= 3) { e.preventDefault(); selectAttackType('special'); }
                        }
                        return;
                    }
                    // ── Main combat menu ──
                    if (cs && mode === 'main') {
                        e.preventDefault();
                        if (numKey === 1) showAttackMenu();
                        else if (numKey === 2) showSpellMenu();
                        else if (numKey === 3) showPotionMenu();
                        else if (numKey === 4) playerDefend();
                        else if (numKey === 5) attemptFlee();
                        else if (numKey === 6) printStatsToTerminal();
                        return;
                    }
                    // ── Explore (no combat) ──
                    if (!cs) {
                        e.preventDefault();
                        if (numKey === 1) exploreLocation(gameState.currentLocation);
                        else if (numKey === 3) showPotionMenuExplore();
                        else if (numKey === 4) printStatsToTerminal();
                        else if (numKey === 5) leaveExploreToTown();
                        return;
                    }
                }
                switch (e.key) {
                    case 'Escape':
                        if (cs && mode !== 'main')          { e.preventDefault(); cancelAction(); }
                        break;
                    // Trap shortcut for hunters
                    case 't': case 'T':
                        if (cs && mode === 'main' && (gameState.player.baseClass || gameState.player.class) === 'hunter') {
                            e.preventDefault();
                            castTrap();
                        }
                        break;
                    // Attack sub-menu letter shortcuts (legacy, still work)
                    case 'n': case 'N':
                        if (cs && mode === 'attack_type')   { e.preventDefault(); selectAttackType('normal'); }
                        return;
                    case 'h': case 'H':
                        if (cs && mode === 'attack_type')   { e.preventDefault(); selectAttackType('heavy'); }
                        break;
                    case 's': case 'S':
                        if (cs && mode === 'attack_type') {
                            const hl = cs.pipAvailable ? cs.pipAvailable.filter(x=>x).length : 0;
                            if (hl >= 3) { e.preventDefault(); selectAttackType('special'); }
                        }
                        return;
                }
            }
        });

function showActionBar() {
    // No-op: body.terminal-mode CSS handles actionBar visibility
}

function hideActionBar() {
    // No-op: body.terminal-mode CSS handles actionBar visibility
}


function buildSaveSnapshot() {
    if (!gameState.player) {
        console.warn('No player state to save');
        return null;
    }

    const p = gameState.player;

    // Ensure p.armor is correctly set before saving
if ((!p.armor || p.armor === 'no_armor') && p.inventory) {
    const armorInInv = p.inventory.find(item =>
        item && typeof item === 'object' && item.armorId &&
        item.instanceId && ARMOR[item.instanceId]
    );
    if (armorInInv) {
        p.armor = armorInInv.instanceId;
        console.log(`🔧 Fixed p.armor before save: ${p.armor}`);
    }
}
    
    const snapshot = {
        version: 1,
        characterId: p.id || 'default',
        characterName: p.name,
        timestamp: Date.now(),
        lastSaved: new Date().toLocaleString(),

        player: {
            // Identity
            id: p.id || 'default',
            name: p.name,
            class: p.class,
            
            // Core stats
            level: p.level,
            xp: p.xp,
            xpToNext: p.xpToNext,
            
            // Resources
            hp: p.hp,
            maxHp: p.maxHp,
            mp: p.mp,
            maxMp: p.maxMp,
            gold: p.gold,
            bankGold: p.bankGold || 0,  // Bank storage
            
            // Legacy base stats
            strength: p.strength,
            defense: p.defense,
            magic: p.magic,
            speed: p.speed,
            
            // New stat block (if exists)
            str: p.str,
            dex: p.dex,
            con: p.con,
            wis: p.wis,
            cha: p.cha,
            lck: p.lck,
            
            // Equipment
            weapon: p.weapon,
            armor: p.armor,
            activePet: p.activePet || null,
            
            // Inventory & spells
            inventory: [...(p.inventory || [])],
            knownSpells: [...(p.knownSpells || [])],
            
            // Stat points
            statPoints: p.statPoints || 0,

            // Defeated Masters/unlocked areas
            defeatedMasters: [...(p.defeatedMasters || [])],  // Explicit copy
            unlockedAreas: [...(p.unlockedAreas || [])],
            activeBounties: [...(p.activeBounties || [])],
            pendingBounties: [...(p.pendingBounties || [])],
            collectedBounties: {...(p.collectedBounties || {})},
            
            // Base class (for evolution tracking)
            baseClass: p.baseClass,
            className: p.className,
            hasEvolved: p.hasEvolved,
            
            // Progression
            defeatedMasters: [...(p.defeatedMasters || [])],
            unlockedAreas: [...(p.unlockedAreas || [])],
            
            // Special flags
            godMode: p.godMode || false,

            // Portal unlock flag — set when player first uses town2→town1 portal
            portalUnlocked: p.portalUnlocked || false,

            // Achievements & runestones
            achievements: [...(p.achievements || [])],
            runestones: [...(p.runestones || [])],

            // ═══════════════════════════════════════════════════════════════
            // BESTIARY — kill counts per monster key
            // Structure: { monsterKey: count }  e.g. { skeleton: 14, slime: 3 }
            // ═══════════════════════════════════════════════════════════════
            kills: Object.assign({}, p.kills || {}),

            // ── Bestiary read-tracking ──────────────────────────────────
            // Keys the player has opened in the bestiary — used to compute
            // the unread badge count (new discoveries the player hasn't viewed yet)
            bestiaryRead: Object.assign({}, p.bestiaryRead || {}),

            // ═══════════════════════════════════════════════════════════════
            // CHRONICLE — lore book state
            // unlockedEntries: entry ids available to read (level-gated)
            // readEntries:     entry ids the player has actually opened
            // ═══════════════════════════════════════════════════════════════
            chronicle: {
                unlockedEntries: [...((p.chronicle && p.chronicle.unlockedEntries) || [])],
                readEntries:     [...((p.chronicle && p.chronicle.readEntries)     || [])],
            },

// ═══════════════════════════════════════════════════════════════
// GUILD QUESTS - Save active quests and completed quests
// ═══════════════════════════════════════════════════════════════
guildQuests: (() => {
    const gq = gameState.guildQuests || {};
    return {
        active: gq.active || null,           // ← Changed from spreading array
        completed: [...(gq.completed || [])], // completed is probably an array
        progress: {...(gq.progress || {})}
    };
})(),

            // ── One-time welcome screen flags ──────────────────────────────
            hasSeenWelcome:              p.hasSeenWelcome              || false,
            hasSeenLegacyWelcome:        p.hasSeenLegacyWelcome        || false,
            hasSeenTownArrival_town2:    p.hasSeenTownArrival_town2    || false,
            hasSeenTownArrival_town3:    p.hasSeenTownArrival_town3    || false,
            
            // ═══════════════════════════════════════════════════════════════
            // PERSISTENT DUNGEON MAPS — discovered rooms for all dungeons/floors
            // Structure: { dungeonKey: { floorNum: [roomIds...] } }
            // ═══════════════════════════════════════════════════════════════
            dungeonMaps: (() => {
                const maps = {};
                for (const dungeonKey in (p.dungeonMaps || {})) {
                    maps[dungeonKey] = {};
                    for (const floorNum in p.dungeonMaps[dungeonKey]) {
                        maps[dungeonKey][floorNum] = [...p.dungeonMaps[dungeonKey][floorNum]];
                    }
                }
                return maps;
            })(),

// Gem bonus trackers — must be saved or recalcGemStats compounds on reload
_gemHpBonus:     p._gemHpBonus     || 0,
_gemMpBonus:     p._gemMpBonus     || 0,
_gemDefBonus:    p._gemDefBonus    || 0,
_gemStrBonus:    p._gemStrBonus    || 0,
_gemDexBonus:    p._gemDexBonus    || 0,
_gemConBonus:    p._gemConBonus    || 0,
_gemWisBonus:    p._gemWisBonus    || 0,
_gemChaBonus:    p._gemChaBonus    || 0,
_gemLckBonus:    p._gemLckBonus    || 0,
_gemCritBonus:   p._gemCritBonus   || 0,
_gemPierceBonus: p._gemPierceBonus || 0,
_gemSpellBonus:  p._gemSpellBonus  || 0,
dungeonTimers: (() => {

            // Persistent enemy respawn timers (survive town visits)
          
                const timers = {};
                const now = Date.now();
                for (const dk in (p.dungeonTimers || {})) {
                    const valid = (p.dungeonTimers[dk] || []).filter(e => now < e.respawnTime);
                    if (valid.length > 0) timers[dk] = valid;
                }
                return timers;
            })()
        },
        
        // Town hub the player is in
        currentTown: gameState.currentTown || 'town1',
       
        
// ═══════════════════════════════════════════════════════════════
// GENERATED WEAPONS - Save all dynamically created weapon drops
// ═══════════════════════════════════════════════════════════════
generatedWeapons: (() => {
    const generated = {};

    function buildFullWeaponSnapshot(item) {
        // Get the actual weapon object from WEAPONS
        const weaponObj = WEAPONS[item.instanceId];
        if (!weaponObj) return null;
        
        // Create a COMPLETE snapshot of the weapon
        return {
            // Core identity
            id: weaponObj.id,
            instanceId: weaponObj.instanceId,
            weaponId: weaponObj.weaponId || weaponObj.id,
            
            // Name (preserve enhanced names!)
            name: weaponObj.name,
            baseName: weaponObj.baseName,
            
            // Type info
            type: weaponObj.type,
            weaponSubtype: weaponObj.weaponSubtype,
            
            // Stats (preserve exact values)
            baseDamage: weaponObj.baseDamage,
            maxDamage: weaponObj.maxDamage,
            baseMagicDamage: weaponObj.baseMagicDamage || 0,
            healingBonus: weaponObj.healingBonus || 0,
            
            // Quality and scaling
            quality: weaponObj.quality,
            qualityBonus: weaponObj.qualityBonus || 0,
            level: weaponObj.level,
            originalLevel: weaponObj.originalLevel,
            
            // Modifiers (critical for names like "Colossal Venomous Frost Wand")
            modifiers: weaponObj.modifiers ? [...weaponObj.modifiers] : [],
            
            // Gems
            gems: weaponObj.gems ? [...weaponObj.gems] : [],
            gemSlots: weaponObj.gemSlots || 0,
            
            // Cost and description
            cost: weaponObj.cost,
            description: weaponObj.description,
            allowedClasses: weaponObj.allowedClasses,
            
            // Metadata
            isDropped: true,
            isEquipped: weaponObj.isEquipped || false,
            dropTimestamp: weaponObj.dropTimestamp || Date.now()
        };
    }
    
    // Scan inventory for weapon instances
    (p.inventory || []).forEach(item => {
        if (item && typeof item === 'object' && item.weaponId && item.instanceId) {
            const fullSnapshot = buildFullWeaponSnapshot(item);
            if (fullSnapshot) {
                generated[item.instanceId] = fullSnapshot;
            }
        }
    });
    
    // Also catch equipped weapon if not already in inventory
    if (p.weapon && typeof p.weapon === 'string' && p.weapon.includes('_')) {
        if (!generated[p.weapon]) {
            const instance = (p.inventory || []).find(i =>
                i && typeof i === 'object' && i.instanceId === p.weapon
            );
            if (instance) {
                const fullSnapshot = buildFullWeaponSnapshot(instance);
                if (fullSnapshot) {
                    fullSnapshot.isEquipped = true;
                    generated[p.weapon] = fullSnapshot;
                }
            } else {
                // Weapon is equipped but not in inventory - save it directly
                const weaponObj = WEAPONS[p.weapon];
                if (weaponObj) {
                    generated[p.weapon] = {
                        ...weaponObj,
                        isEquipped: true,
                        instanceId: p.weapon,
                    };
                }
            }
        }
    }
    
    // ⭐ CRITICAL: Ensure the equipped weapon is always saved (catch any that were missed)
    if (p.weapon && p.weapon !== 'bare_fists') {
        const equippedWeapon = WEAPONS[p.weapon];
        if (equippedWeapon && !generated[p.weapon]) {
            generated[p.weapon] = {
                ...equippedWeapon,
                isEquipped: true,
                instanceId: p.weapon,
            };
        }
    }
    
    return generated;
})(),

// ═══════════════════════════════════════════════════════════════
// GENERATED ARMOR - Save all dynamically created armor drops
// ═══════════════════════════════════════════════════════════════
generatedArmor: (() => {
    const generated = {};

    function buildFullArmorSnapshot(item) {
        const armorObj = ARMOR[item.instanceId];
        if (!armorObj) return null;
        
        return {
            // Core identity
            id: armorObj.id,
            instanceId: armorObj.instanceId,
            armorId: armorObj.armorId || armorObj.id,
            
            // Name
            name: armorObj.name,
            baseName: armorObj.baseName,
            
            // Type
            type: armorObj.type,
            armorSubtype: armorObj.armorSubtype,
            
            // Stats
            baseDefense: armorObj.baseDefense,
            baseMagicBonus: armorObj.baseMagicBonus || 0,
            bonusHp: armorObj.bonusHp || 0,
            bonusMp: armorObj.bonusMp || 0,


            // Quality
            quality: armorObj.quality,
            qualityBonus: armorObj.qualityBonus || 0,
            level: armorObj.level,
            originalLevel: armorObj.originalLevel,
            
            // Gems
            gems: armorObj.gems ? [...armorObj.gems] : [],
            gemSlots: armorObj.gemSlots || 0,
            modifiers: armorObj.modifiers || [],
            
            // Cost and description
            cost: armorObj.cost,
            description: armorObj.description,
            
            // Metadata
            isDropped: true,
            isEquipped: armorObj.isEquipped || false,
            dropTimestamp: armorObj.dropTimestamp || Date.now()
        };
    }
    
    // Scan inventory for armor instances
    (p.inventory || []).forEach(item => {
        if (item && typeof item === 'object' && item.armorId && item.instanceId) {
            const fullSnapshot = buildFullArmorSnapshot(item);
            if (fullSnapshot) {
                generated[item.instanceId] = fullSnapshot;
            }
        }
    });
    
    // Also catch equipped armor
    if (p.armor && typeof p.armor === 'string' && p.armor.includes('_')) {
        if (!generated[p.armor]) {
            const instance = (p.inventory || []).find(i =>
                i && typeof i === 'object' && i.instanceId === p.armor
            );
            if (instance) {
                const fullSnapshot = buildFullArmorSnapshot(instance);
                if (fullSnapshot) {
                    fullSnapshot.isEquipped = true;
                    generated[p.armor] = fullSnapshot;
                }
            } else {
                // Armor is equipped but not in inventory - save it directly
                const armorObj = ARMOR[p.armor];
                if (armorObj) {
                    generated[p.armor] = {
                        ...armorObj,
                        isEquipped: true,
                        instanceId: p.armor,
                    };
                }
            }
        }
    }
    
    // ⭐ CRITICAL: Ensure the equipped armor is always saved (catch any that were missed)
    if (p.armor && p.armor !== 'no_armor') {
        const equippedArmor = ARMOR[p.armor];
        if (equippedArmor && !generated[p.armor]) {
            generated[p.armor] = {
                ...equippedArmor,
                isEquipped: true,
                instanceId: p.armor,
            };
        }
    }
    
    return generated;
})(),

// ═══════════════════════════════════════════════════════════════
// STATIC ITEM GEMS - Save gems socketed into weapons/armor
// ═══════════════════════════════════════════════════════════════
staticWeaponGems: (() => {
    const map = {};
    
    // Check inventory for weapon instances with gems
    (p.inventory || []).forEach(item => {
        if (item && typeof item === 'object' && item.weaponId && item.gems?.length) {
            map[item.instanceId] = item.gems;
        }
    });
    
    // Check equipped weapon
    if (p.weapon && typeof p.weapon === 'string' && p.weapon.includes('_')) {
        const instance = p.inventory.find(item => 
            item && typeof item === 'object' && item.instanceId === p.weapon
        );
        if (instance && instance.gems?.length) {
            map[instance.instanceId] = instance.gems;
        }
    }
    
    return map;
})(),

staticArmorGems: (() => {
    const map = {};
    
    // Check inventory for armor instances with gems
    (p.inventory || []).forEach(item => {
        if (item && typeof item === 'object' && item.armorId && item.gems?.length) {
            map[item.instanceId] = item.gems;
        }
    });
    
    // Check equipped armor
    if (p.armor && typeof p.armor === 'string' && p.armor.includes('_')) {
        const instance = p.inventory.find(item => 
            item && typeof item === 'object' && item.instanceId === p.armor
        );
        if (instance && instance.gems?.length) {
            map[instance.instanceId] = instance.gems;
        }
    }
    
    return map;
})(),

        // Current location/state
        currentLocation: gameState.currentLocation,

        // ═══════════════════════════════════════════════════════════════
        // ACTIVE COMBAT - Save mid-fight state so enemies persist on reload
        // ═══════════════════════════════════════════════════════════════
        activeCombat: (() => {
            const cs = gameState.combatState;
            if (!cs || gameState.dungeon) return null; // Only for world exploration combat

            // DEBUG: Log what we're saving
    console.log('💾 SAVING COMBAT STATE:', cs.monsters.map(m => ({
        name: m.name,
        hp: m.hp,
        maxHp: m.maxHp,
        key: m.key
    })));

            return {
                location: gameState.currentLocation,
                monsters: cs.monsters.map(m => ({
                    // All fields needed to fully reconstruct the enemy
                    key:         m.key,
                    name:        m.name,
                    rarity:      m.rarity,
                    rarityColor: m.rarityColor,
                    hp:          m.hp,
                    maxHp:       m.maxHp,
                    damage:      m.damage,
                    defense:     m.defense,
                    xp:          m.xp,
                    gold:        m.gold,
                    level:       m.level,
                    possibleDrops: m.possibleDrops,
                    dropRates:   m.dropRates,
                    index:       m.index
                })),
                currentTarget:   cs.currentTarget,
              //  enemyDelay:      cs.enemyDelay,
                enemyHits:       cs.enemyHits,
                enemyHitsLeft:   cs.enemyHitsLeft,
                // Save pip state (how many pips are ready vs cooling down)
                pipCount:        cs.pipAvailable.length,
                pipsReady:       cs.pipAvailable.map(x => x),
            };
        })(),

        // Dungeon state (if in dungeon)
        dungeon: gameState.dungeon ? {
            dungeonKey: gameState.dungeon.dungeonKey,
            floor: gameState.dungeon.floor,
            currentRoom: gameState.dungeon.currentRoom,
            discoveredRooms: [...gameState.dungeon.discoveredRooms],
            spawnedRooms: [...(gameState.dungeon.spawnedRooms || [])],
            activeEnemies: gameState.dungeon.activeEnemies.map(e => ({
    id: e.id,
    monsterId: e.monsterId,
    name: e.name,
    hp: e.hp,
    maxHp: e.maxHp,
    currentRoom: e.currentRoom,
    leash: e.leash,
    drop: e.drop || null,
    isChasing: e.isChasing || false,
    roomsFollowed: e.roomsFollowed || 0
})),
            defeatedEnemies: (gameState.dungeon.defeatedEnemies || []).map(e => ({
                id: e.id,
                monsterId: e.monsterId,
                name: e.name,
                currentRoom: e.currentRoom,
                leash: e.leash,
                drop: e.drop || null,
                deathTime: e.deathTime,
                respawnTime: e.respawnTime
            }))
        } : null,

        meta: {
            inDungeon: !!gameState.dungeon
        }
    };




    return snapshot;
}

// ═══════════════════════════════════════════════════════════════════════
// ██████████████████████████████████████████████████████████████████████
// CHRONICLE & BESTIARY ENGINE
// Phase 2 foundation — data layer only. UI built in next phase.
// ██████████████████████████████████████████████████████████████████████
// ═══════════════════════════════════════════════════════════════════════

// ── Chronicle entry unlock schedule ────────────────────────────────────
// Each entry has: id, level (when it unlocks), and class (which class gets it).
// 'all' means every class gets this entry (world lore).
// Class-specific entries use the base class key.

// Chronicle + bestiary moved to chronicle.js and bestiary.js

// ═══════════════════════════════════════════════════════════════════════
// END LEVEL-UP CEREMONY + CHRONICLE CINEMATIC
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// TOWN ARRIVAL CINEMATICS
// Fires once per character per town on their very first visit.
// Uses the same welcome-overlay parchment as the welcome screen.
// Flags saved to player object: p.hasSeenTownArrival_town2, _town3
// ═══════════════════════════════════════════════════════════════════════

const TOWN_ARRIVAL_LORE = {

    town2: {
        townName: 'Ashen Harbor',
        icon: '⚓',
        subtitle: 'The Second Town',
        segments: (p) => {
            const name  = p.name || 'Adventurer';
            const cls   = (p.baseClass || p.class || 'warrior').toLowerCase();
            const level = p.level || 1;

            // Class-specific line about what brought them here
            const CLASS_LINES = {
                warrior:     `The map your grandmother showed you — the faded one with the red ink — had a mark somewhere near this coast. You understood it when you saw the harbor's black sand.`,
                mage:        `The Academy's charts showed a ley line convergence at this latitude. Standing here, you feel it — a hum in the air that your instruments would have measured, but your bones already know.`,
                rogue:       `Three different contacts, none of whom knew about the others, all pointed here when asked where the real information was moving. They were right. The docks are loud with people who know things.`,
                ranger:      `The migration routes you tracked all bent toward this coast. The creatures weren't fleeing randomly — they were avoiding something that originates here, or passes through here, on its way somewhere worse.`,
                runesmith:   `You woke up three nights running with the same set of binding configurations in your hands. Each one a variation on a harbor seal — not a nautical seal. A containment seal. Something passed through this port.`,
                cleric:      `The silence in your prayers has a direction now. It points inland, past this harbor, toward whatever is at the center of the distortion. Ashen Harbor is not the source. It is the last place before the source.`,
                necromancer: `The dead here are not afraid. They are angry. That is unusual — fear is the dominant affect near Azrath's influence. Whatever happened in this harbor a long time ago made its ghosts defiant rather than terrified.`,
                berserker:   `Nobody in Silverdale knew what happened to villages like yours. Someone in Ashen Harbor does. You could see it in the dockmaster's eyes when you described the emptiness — recognition, and the careful look of someone deciding how much to say.`,
            };

            const classLine = CLASS_LINES[cls] || CLASS_LINES['warrior'];

            return [
                { type:'para', text:`The harbor smells of salt and ash. That is where it gets its name — not from any fire, but from the color of the sand along the waterline, grey-black and fine as powder, unlike anything in the lands around Silverdale.` },
                { type:'para', text:`You are level ${level}. You walked — or fought, or navigated — every step between there and here. That is not nothing. The road between Silverdale and Ashen Harbor is not kind to people who are not ready for it.` },
                { type:'callout', text:`${classLine}<br><br>Ashen Harbor is a harder town than Silverdale. The merchants here have seen things come through their port that Silverdale's traders would not believe. The dungeons in this region are more dangerous. The creatures are larger, angrier, displaced further from the deep places by the worsening tremors.<br><br>You are ready for them. That is why you are here.` },
                { type:'para', text:`The tremors reach this far now. You felt one on the road — a long slow roll that lasted nearly a minute, the kind that makes buildings creak and horses uneasy. The locals barely reacted. They have been living with it for months.` },
                { type:'para', text:`The Crossroads is still ahead. Ashen Harbor is a waypoint — a place to resupply, train, and grow stronger before the road leads you to where the called ones gather. The people here know what is coming. Some of them are also moving toward it.` },
                { type:'para', text:`Rest here. Learn what this town knows. The dungeons of this region will prepare you for what the Crossroads requires.<br><br>You earned every step of the road that brought you here, <span class="chronicle-name">${name}</span>. The next road begins at dawn.` },
            ];
        },
    },

    town3: {
        townName: 'The Crossroads',
        icon: '✦',
        subtitle: 'Where All Roads Converge',
        segments: (p) => {
            const name  = p.name || 'Adventurer';
            const cls   = (p.baseClass || p.class || 'warrior').toLowerCase();
            const level = p.level || 1;

            // Class-specific moment of arrival
            const CLASS_ARRIVALS = {
                warrior:     `The old man at the gate looked at you for a long moment before you said a word. Then he nodded — one single nod — like he had been waiting for exactly you, and the waiting was finally over.`,
                mage:        `The ley line convergence you charted is real and it is here. You felt it a mile out — the air pressure changed, the light shifted slightly, and your calculations were confirmed by something older and more reliable than mathematics.`,
                rogue:       `Every information network you have ever worked with had the Crossroads as a blank spot — a place people mentioned but never described. Now you understand why. Some places are not kept secret by silence. They are kept secret by the fact that you cannot explain them until you have been here.`,
                ranger:      `The wildlife is completely absent for a half-mile radius around the valley. Not hiding — absent. The Crossroads sits in a pocket of stillness that the natural world has chosen, collectively and without apparent coordination, to respect.`,
                runesmith:   `The binding configurations you have been waking up with make sense here. The valley itself is constructed — not by architecture but by ancient working. Someone rune-crafted this place into stability a thousand years ago. You can feel every seam of it.`,
                cleric:      `Your prayers are louder here. Not answered — you have learned to distinguish between proximity and response — but louder. Whatever is interfering with the connection between faith and its source has less purchase in this valley than anywhere else you have been.`,
                necromancer: `The dead here are quiet in a way that has nothing to do with emptiness. They are at peace. Every spirit in this valley has made its choice about what it is staying for, and the choice was deliberate. This is a place where purpose holds.`,
                berserker:   `Someone here knows about the emptying. You saw it in the faces when you described your village — not the careful look of someone deciding how much to say, but the open look of people who have been waiting for you to arrive so they could tell you everything.`,
            };

            const classArrival = CLASS_ARRIVALS[cls] || CLASS_ARRIVALS['warrior'];

            return [
                { type:'para', text:`You heard it before you saw it.` },
                { type:'para', text:`Voices — dozens of them, in accents you recognize and accents you do not — all arriving from different roads at the same point in the valley below. You crested the ridge and stopped. Warriors sharpening blades beside mages with open-air research stations. Rogues comparing notes with rangers. A necromancer and a cleric sitting across a fire from each other with the careful courtesy of people who disagree about everything except the one thing that brought them here.` },
                { type:'callout', text:`${classArrival}<br><br>The Crossroads is older than any nation currently on the map. Built at the end of the last cycle, it has been added to by every generation that passed through it — new buildings over old foundations, new records layered over old ones. It is a waystation, a library, a training ground, and a monument to everyone who faced the Calamity and kept the world going.` },
                { type:'para', text:`You are level ${level}. The journey from Silverdale to here is not supposed to be easy, and for you it was not. Every dungeon you survived, every fight that should have ended differently and did not — all of it is why you are standing here now instead of someone who was not ready.` },
                { type:'para', text:`The four elemental dungeons begin here. Wind, Fire, Earth, Water — each one holding a talisman that Brennan placed there a thousand years ago as insurance against the day the seal failed. They are waiting for people strong enough and purposeful enough to claim them.` },
                { type:'callout', text:`The old records in the Crossroads library describe the talismans as tests — not of combat, but of character. What you believe, why you are fighting, who you have become across every level of the road that led you here. The dungeons read all of that and decide whether you are ready.<br><br>You are nearly ready. The Crossroads exists to make you the rest of the way.` },
                { type:'para', text:`Train here. Use the library. Talk to the people around these fires — every one of them arrived by a different road and knows things that you do not.<br><br>Welcome to the Crossroads, <span class="chronicle-name">${name}</span>.<br>Brennan built this place for you.` },
            ];
        },
    },
};

// ── Check and show town arrival cinematic ─────────────────────────────
function maybeShowTownArrivalCinematic(townId) {
    const p = gameState.player;
    if (!p) return;

    const flagKey = `hasSeenTownArrival_${townId}`;
    if (p[flagKey]) return;  // already seen it

    const lore = TOWN_ARRIVAL_LORE[townId];
    if (!lore) return;  // no lore for this town

    // Mark as seen and save immediately
    p[flagKey] = true;
    saveGame();

    // Small delay so the town screen renders first
    setTimeout(() => showTownArrivalCinematic(lore, p), 600);
}

function showTownArrivalCinematic(lore, p) {
    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) return;

    // Header
    const icon = overlay.querySelector('.welcome-dragon-icon');
    if (icon) {
        icon.textContent = lore.icon;
        icon.style.animation = 'none';
        icon.style.filter = 'drop-shadow(0 0 12px rgba(200,160,40,0.5))';
    }
    const titleEl = overlay.querySelector('.welcome-title');
    if (titleEl) titleEl.textContent = lore.subtitle;

    const nameEl = document.getElementById('welcome-char-name');
    if (nameEl) nameEl.textContent = lore.townName;

    const clsEl = document.getElementById('welcome-char-class');
    if (clsEl) clsEl.textContent = `Level ${p.level} · ${p.className || p.class || ''}`;

    // Build segments
    const segments = lore.segments(p);

    const body = document.getElementById('welcome-body');
    if (!body) return;
    body.innerHTML = '';

    segments.forEach((seg, i) => {
        let el;
        if (seg.type === 'callout') {
            el = document.createElement('div');
            el.className = 'welcome-callout';
        } else {
            el = document.createElement('p');
            el.className = 'welcome-para';
        }
        el.innerHTML = seg.text;
        el.dataset.segIndex = i;
        body.appendChild(el);
    });

    // Wire the button
    const btn = document.getElementById('welcome-begin-btn');
    if (btn) {
        btn.textContent = `Enter ${lore.townName} →`;
        btn.classList.remove('ready');
        btn.onclick = function() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        };
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate in — same reading pace as welcome screen
    let delay = 400;
    const allSegs = body.querySelectorAll('[data-seg-index]');
    allSegs.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
            el.scrollIntoView({ behavior: 'smooth', block: 'end' });
            if (i === allSegs.length - 1) {
                setTimeout(() => { if (btn) btn.classList.add('ready'); }, 800);
            }
        }, delay);
        const text = el.textContent || '';
        const isShort = text.trim().length < 60;
        delay += el.classList.contains('welcome-callout') ? 17500
               : isShort                                  ? 6000
               : 12500;
    });
}

// ═══════════════════════════════════════════════════════════════════════
// END TOWN ARRIVAL CINEMATICS
// ═══════════════════════════════════════════════════════════════════════

// ======================================================
// AUTO-SAVE (LOCAL ONLY - FAST)
// Call this after EVERY action (combat, movement, etc.)
// ======================================================
function autoSave() {
    if (gameState.combatState && gameState.dungeon && gameState.dungeon.activeEnemies) {
        gameState.combatState.monsters.forEach((monster, idx) => {
            const dungeonEnemy = gameState.dungeon.activeEnemies[idx];
            if (dungeonEnemy) {
                dungeonEnemy.hp = monster.hp;
                dungeonEnemy.maxHp = monster.maxHp;
            }
        });
    }
    const p = gameState?.player;
    if (!p) return;
    
    try {
        const snapshot = buildSaveSnapshot();
        if (!snapshot) return;
        
        // LOCAL SAVE ONLY - super fast
        const key = `dq_save_${snapshot.characterId}`;
        localStorage.setItem(key, JSON.stringify({
            ...snapshot,
            _localTimestamp: Date.now() // Track when we saved locally
        }));
        
        // Update character list
        updateCharacterList(snapshot);
        
        console.log(`✅ Local auto-save: ${new Date().toLocaleTimeString()}`);
    } catch (e) {
        console.error('Auto-save failed:', e);
    }
}

// ======================================================
// CLOUD SYNC (ONLY WHEN USER LEAVES OR MANUALLY)
// ======================================================
async function syncToCloud() {
    const p = gameState?.player;
    if (!p) return false;
    
    const { data: { user } } = await calamitySupabase.auth.getUser();
    if (!user) return false;
    
    try {
        const snapshot = buildSaveSnapshot();
        if (!snapshot) return false;
        
        // Add sync timestamp
        snapshot._cloudSyncTime = Date.now();
        
        // Check if this character exists in cloud
        const { data: existing } = await calamitySupabase
            .from('calamity_saves')
            .select('id, character_data')
            .eq('user_id', user.id)
            .eq('username', p.name);
        
        if (existing && existing.length > 0) {
            // Update existing
            await calamitySupabase
                .from('calamity_saves')
                .update({
                    character_data: snapshot,
                    level: p.level,
                    class: p.class,
                    last_login: new Date().toISOString()
                })
                .eq('id', existing[0].id);
        } else {
            // Insert new
            await calamitySupabase
                .from('calamity_saves')
                .insert([{
                    user_id: user.id,
                    username: p.name,
                    character_data: snapshot,
                    level: p.level,
                    class: p.class,
                    last_login: new Date().toISOString()
                }]);
        }
        
        lastCloudSync = Date.now();
        console.log(`☁️ Cloud sync complete: ${new Date().toLocaleTimeString()}`);
        return true;
    } catch (e) {
        console.error('Cloud sync failed:', e);
        return false;
    }
}


// ======================================================
// BACKWARD COMPATIBILITY WRAPPER
// Redirects old saveGame() calls to new autoSave()
// ======================================================
function saveGame() {
    // First do local auto-save
    autoSave();
    
    // Then try cloud sync in the background (don't wait for it)
    syncToCloud().catch(err => {
        // Silently fail - cloud sync is best effort
        console.log('Background cloud sync failed (non-critical)');
    });
}

// ======================================================
// SMART SAVE RECONCILIATION SYSTEM
// ======================================================

// Store last cloud sync timestamp
let lastCloudSync = null;

// ======================================================
// RECONCILE ON LOAD - COMPARE AND MERGE
// ======================================================
async function reconcileSaves(characterId, characterName) {
    console.log('🔄 Starting save reconciliation...');
    
    // 1. Load local save
    const localKey = `dq_save_${characterId}`;
    const localData = localStorage.getItem(localKey);
    if (!localData) {
        console.log('No local save found');
        return null;
    }
    
    const localSave = JSON.parse(localData);
    
    // 2. Check if user is logged in
    const { data: { user } } = await calamitySupabase.auth.getUser();
    if (!user) {
        console.log('Not logged in - using local save');
        return localSave;
    }
    
    // 3. Try to load cloud save
    const { data: cloudSaves } = await calamitySupabase
        .from('calamity_saves')
        .select('character_data, last_login')
        .eq('user_id', user.id)
        .eq('username', characterName);
    
    // 4. Determine which save is fresher
    if (!cloudSaves || cloudSaves.length === 0) {
        console.log('No cloud save - uploading local');
        await syncToCloud(); // Upload local to cloud
        return localSave;
    }
    
    const cloudSave = cloudSaves[0].character_data;
    
    // Compare timestamps
    const localTime = localSave.timestamp || 0;
    const cloudTime = cloudSave.timestamp || 0;
    const timeDiff = Math.abs(localTime - cloudTime);
    
    console.log(`Local save: ${new Date(localTime).toLocaleString()}`);
    console.log(`Cloud save: ${new Date(cloudTime).toLocaleString()}`);
    console.log(`Time difference: ${timeDiff / 1000} seconds`);
    
    // If saves are very close (within 5 minutes), trust local
    const CLOSE_THRESHOLD = 5 * 60 * 1000; // 5 minutes
    
    if (timeDiff < CLOSE_THRESHOLD) {
        console.log('✅ Saves are close - using local (most recent actions)');
        return localSave;
    }
    
    // One is significantly fresher
    if (localTime > cloudTime) {
        console.log('📤 Local is fresher - uploading to cloud');
        await syncToCloud();
        return localSave;
    } else {
        console.log('📥 Cloud is fresher - downloading to local');
        // Save cloud version locally
        localStorage.setItem(localKey, JSON.stringify(cloudSave));
        return cloudSave;
    }
}


function updateCharacterList(snapshot) {
    try {
        let charList = JSON.parse(localStorage.getItem('dq_character_list') || '[]');
        
        // Remove old entry for this character if exists
        charList = charList.filter(c => c.id !== snapshot.characterId);
        
        // Add new entry
        charList.push({
            id: snapshot.characterId,
            name: snapshot.characterName,
            level: snapshot.player.level,
            class: snapshot.player.class,
            timestamp: snapshot.timestamp,
            lastSaved: snapshot.lastSaved
        });
        
        // Sort by most recent
        charList.sort((a, b) => b.timestamp - a.timestamp);
        
        localStorage.setItem('dq_character_list', JSON.stringify(charList));
    } catch (e) {
        console.error('Error updating character list:', e);
    }
}

function getAllCharacters() {
    try {
        return JSON.parse(localStorage.getItem('dq_character_list') || '[]');
    } catch (e) {
        console.error('Error getting character list:', e);
        return [];
    }
}

function deleteCharacter(characterId) {
    try {
        // Remove save data
        localStorage.removeItem(`dq_save_${characterId}`);
        
        // Remove from character list
        let charList = getAllCharacters();
        charList = charList.filter(c => c.id !== characterId);
        localStorage.setItem('dq_character_list', JSON.stringify(charList));
        
        console.log(`🗑️ Deleted character: ${characterId}`);
        return true;
    } catch (e) {
        console.error('Error deleting character:', e);
        return false;
    }
}

// Auto-save on page unload
window.addEventListener('beforeunload', () => {
    saveGame();
});



        function toggleTerminal() {
            const terminal = document.getElementById('terminalContainer');
            const input = document.getElementById('terminalInput');
            
            gameState.sysop.terminalActive = !gameState.sysop.terminalActive;
            
            if (gameState.sysop.terminalActive) {
                terminal.classList.add('active');
                input.focus();
                if (!gameState.sysop.authenticated) {
                    terminalPrint('Terminal activated. Type /login <username> <password> to authenticate.', 'warning');
                }
            } else {
                terminal.classList.remove('active');
            }
        }

        // ═══════════════════════════════════════════════════════════════
// 🎒 INVENTORY & POTION BUTTONS - With scroll detection
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

        
        let _potHoldTimer  = null;
        let _potFired      = false;

        function potBtnDown(e, normalFn) {
            e.preventDefault();
            _potFired = false;
            // No sysop trigger anymore
        }
        function potBtnUp(e, normalFn) {
            if (_potHoldTimer) {
                clearTimeout(_potHoldTimer);
                _potHoldTimer = null;
            }
            if (!_potFired) {
                // Normal short tap — call the potion menu
                if (typeof window[normalFn] === 'function') window[normalFn]();
            }
            _potFired = false;
        }
        function potBtnCancel() {
            if (_potHoldTimer) { clearTimeout(_potHoldTimer); _potHoldTimer = null; }
            _potFired = false;
        }
        
        // ═══════════════════════════════════════════════════════════════
        // 📊 PRINT STATS TO TERMINAL
        // ═══════════════════════════════════════════════════════════════
// Updated printStatsToTerminal function - player stats + enemy names with level and condition
function printStatsToTerminal() {
    const p = gameState.player;
    if (!p) { termAppend('No character loaded.', 'term-error'); return; }
    
    termAppend('', 'term-separator');
    termAppend(`📊 <span style="color:var(--highlight-color);">${p.name}${getRunestonePip(p)}</span> · Lv ${p.level} ${p.className}`, 'term-highlight');
    termAppend(`❤️ HP: <span style="color:#ff6666;">${p.hp}/${p.maxHp}</span>  ✨ MP: <span style="color:#4488ff;">${p.mp}/${p.maxMp}</span>`);
    termAppend(`⭐ XP: ${p.xp}/${p.xpToNext}  💰 Gold: ${p.gold}g`);
    termAppend(`STR:${p.str} DEX:${p.dex} CON:${p.con} WIS:${p.wis} CHA:${p.cha} LCK:${p.lck}`, 'term-dim');
    
    // Show enemies if in combat
    const cs = gameState.combatState;
    if (cs && cs.monsters && cs.monsters.length > 0) {
        termAppend('', 'term-separator');
        termAppend(`👹 ENEMIES (${cs.monsters.length})`, 'term-highlight');
        
        cs.monsters.forEach((enemy, idx) => {
            // Calculate condition based on HP percentage
            const hpPercent = (enemy.hp / enemy.maxHp) * 100;
            let condition = '';
            let conditionColor = '#8aaa8a';
            
            if (hpPercent < 10) {
                condition = 'BARELY STANDING';
                conditionColor = '#ff4444';
            } else if (hpPercent < 25) {
                condition = 'severely wounded';
                conditionColor = '#ff6666';
            } else if (hpPercent < 50) {
                condition = 'wounded';
                conditionColor = '#ffaa66';
            } else if (hpPercent < 75) {
                condition = 'injured';
                conditionColor = '#ffcc88';
            } else {
                condition = 'healthy';
                conditionColor = '#88ff88';
            }
            
            // Level difference color (higher level enemy = red, lower = green)
            const levelDiff = (enemy.level || 1) - (p.level || 1);
            let levelColor = '#aaa';
            if (levelDiff > 2) levelColor = '#ff4444';
            else if (levelDiff > 0) levelColor = '#ffaa66';
            else if (levelDiff < -2) levelColor = '#88ff88';
            else if (levelDiff < 0) levelColor = '#aaffaa';
            
            termAppend(
                `  ${idx + 1}. <span style="color:${enemy.rarityColor};">${enemy.name}</span> ` +
                `<span style="color:${levelColor};">(Lv ${enemy.level || '?'})</span> ` +
                `<span style="color:${conditionColor};">[${condition}]</span>`,
                'term-dim'
            );
        });
    }
    
    termAppend('', 'term-separator');
}

        // ═══════════════════════════════════════════════════════════════
        // ── Quit to menu ─────────────────────────────────────────────
        function confirmQuitToMenu() {
            if (confirm('Quit to main menu?\nUnsaved progress will be lost.')) {
                stopAllRegen();
                if (gameState.combatTimer) {
                    clearInterval(gameState.combatTimer);
                    gameState.combatTimer = null;
                }
                gameState.combatState = null;
                gameState.dungeon     = null;
                document.body.classList.remove('terminal-mode');
                showMainMenu();
            }
        }


// ═══════════════════════════════════════════════════════════════
// SYSOP MODE - Hold town banner for 3 seconds
// ═══════════════════════════════════════════════════════════════
let bannerHoldTimer = null;
let bannerHoldFired = false;

function bannerHoldDown(e) {
    bannerHoldFired = false;
    bannerHoldTimer = setTimeout(() => {
        bannerHoldTimer = null;
        bannerHoldFired = true;
        openSysopOverlay();
    }, 3000);
}

function bannerHoldUp() {
    if (bannerHoldTimer) {
        clearTimeout(bannerHoldTimer);
        bannerHoldTimer = null;
    }
    bannerHoldFired = false;
}

function bannerHoldCancel() {
    if (bannerHoldTimer) {
        clearTimeout(bannerHoldTimer);
        bannerHoldTimer = null;
    }
    bannerHoldFired = false;
}



        // ── SYSOP overlay open / close ────────────────────────────────
        function openSysopOverlay() {
    const overlay = document.getElementById('sysopOverlay');
    
    if (!overlay) {
        console.error('sysopOverlay element not found in DOM');
        return;
    }
    
    // Open the mobile overlay (not the desktop terminal)
    overlay.classList.add('open');
    renderSysopOverlay();
}

        function closeSysopOverlay() {
            document.getElementById('sysopOverlay').classList.remove('open');
        }

        // ── Output log (shared with desktop terminal) ─────────────────
        window._sysoLog = [];
        function sysoLog(msg, type = 'normal') {
            const colors = { normal:'#00FF41', error:'#ff4444', success:'#88ff88', warning:'#ff8c00' };
            window._sysoLog.push({ msg, color: colors[type] || '#00FF41' });
            if (window._sysoLog.length > 50) window._sysoLog.shift();
            terminalPrint(msg, type);   // mirror to desktop terminal
            _refreshSysoLog();
        }
        function _refreshSysoLog() {
            const el = document.getElementById('sysoLog');
            if (!el) return;
            el.innerHTML = window._sysoLog.slice(-25).map(e =>
                `<div style="color:${e.color};">${e.msg.replace(/</g,'&lt;')}</div>`
            ).join('');
            el.scrollTop = el.scrollHeight;
        }
        // Wrap executeCommand to capture output into sysoLog
        function sysoExec(cmd) {
            sysoLog(`> ${cmd}`);
            executeCommand(cmd);
            setTimeout(_refreshSysoLog, 100);
        }

        // ── Main overlay renderer ─────────────────────────────────────
        function renderSysopOverlay() {
            const content = document.getElementById('sysopOverlayContent');
            const auth = gameState.sysop.authenticated;
            let html = `<div class="syo-log" id="sysoLog"></div>`;

            if (!auth) {
                // LOGIN SCREEN
                html += `
                <div class="syo-login-art">
╔══════════════════════╗<br>
║   SYSOP  TERMINAL    ║<br>
║   AUTHENTICATION     ║<br>
╚══════════════════════╝
                </div>
                <div class="syo-section">
                    <div class="syo-label">USERNAME</div>
                    <input class="syo-input" id="sysoUser" placeholder="sysop" autocomplete="off" autocorrect="off" spellcheck="false">
                    <div class="syo-label">PASSWORD</div>
                    <input class="syo-input" id="sysoPass" type="password" placeholder="••••••••" autocomplete="off">
                    <div id="sysoLoginErr" style="display:none;color:#ff4444;font-family:'VT323',monospace;font-size:18px;margin:4px 0 8px;"></div>
                    <div class="syo-grid" style="margin-top:8px;">
                        <button class="syo-btn full" style="border-color:#00FF41;color:#00FF41;font-size:22px;padding:14px;"
                            onclick="sysoLogin()">⚡ LOGIN</button>
                    </div>
                </div>`;
            } else {
                // COMMAND GRID
                const isGod = gameState.player?._godMode;
                html += `
                <div class="syo-section">
                    <div class="syo-section-title">⌨️ COMMAND</div>
                    <div style="display:flex;gap:6px;">
                        <input class="syo-input" id="sysocmdInput" placeholder="/help — type a command..." 
                            autocomplete="off" autocorrect="off" spellcheck="false" style="margin-bottom:0;font-size:18px;"
                            oninput="_sysoLiveHelp(this.value)"
                            onkeydown="if(event.key==='Enter'){const v=this.value.trim();if(v){sysoExec(v);this.value='';_sysoLiveHelp('');}}">
                        <button class="syo-btn" style="white-space:nowrap;padding:6px 10px;"
                            onclick="(function(){const v=document.getElementById('sysocmdInput')?.value?.trim();if(v){sysoExec(v);document.getElementById('sysocmdInput').value='';_sysoLiveHelp('');}})()">▶ RUN</button>
                    </div>
                    <div id="sysoCmdHints" style="font-family:'VT323',monospace;font-size:14px;color:#3a6a3a;padding:3px 4px 0;min-height:16px;"></div>
                </div>
                <div class="syo-section">
                    <div class="syo-section-title">👤 PLAYER</div>
                    <div class="syo-grid">
                        <button class="syo-btn" onclick="sysoExec('/heal');_refreshSysoLog();">❤️ FULL HEAL</button>
                        <button class="syo-btn ${isGod?'orange':''}" onclick="sysoShowGodmode()">⚡ GOD MODE ${isGod?'[ON]':'[OFF]'}</button>
                        <button class="syo-btn" onclick="sysoShowSub('level')">📈 SET LEVEL</button>
                        <button class="syo-btn" onclick="sysoShowSub('gold')">💰 SET GOLD</button>
                    </div>
                </div>

                <div class="syo-section">
                    <div class="syo-section-title">🎁 GIVE</div>
                    <div class="syo-grid cols3">
                        <button class="syo-btn" onclick="sysoShowGive('weapon')">⚔️<br>Weapon</button>
                        <button class="syo-btn" onclick="sysoShowGive('armor')">🛡️<br>Armor</button>
                        <button class="syo-btn" onclick="sysoShowGive('item')">🧪<br>Item</button>
                        <button class="syo-btn" onclick="sysoShowGive('spell')">🔮<br>Spell</button>
                    </div>
                </div>

                <div class="syo-section">
                    <div class="syo-section-title">📋 LISTS</div>
                    <div class="syo-grid">
                        <button class="syo-btn" onclick="_sysoShowListPanel('weapons')">⚔️ Weapons</button>
                        <button class="syo-btn" onclick="_sysoShowListPanel('armor')">🛡️ Armor</button>
                        <button class="syo-btn" onclick="_sysoShowListPanel('monsters')">👹 Monsters</button>
                        <button class="syo-btn" onclick="_sysoShowListPanel('items')">🎒 Items</button>
                    </div>
                </div>

                <div class="syo-section">
                    <div class="syo-section-title">🏰 DUNGEON</div>
                    <div class="syo-grid">
                        <button class="syo-btn orange" onclick="sysoExec('/killmonster')">💀 Kill Enemy</button>
                        <button class="syo-btn" onclick="sysoShowSub('teleport')">🚀 Teleport</button>
                    </div>
                </div>

                <div class="syo-section">
                    <div class="syo-section-title">🛠️ SYSTEM</div>
                    <div class="syo-grid">
                        <button class="syo-btn" onclick="window._sysoLog=[];clearTerminal();_refreshSysoLog();">🧹 Clear Log</button>
                        <button class="syo-btn" onclick="sysoShowSub('export')">📤 Export</button>
                        <button class="syo-btn" onclick="sysoExec('/help')">❓ Help</button>
                        <button class="syo-btn red" onclick="sysoLogout()">🔒 Logout</button>
                    </div>
                </div>

                <div id="sysoSub"></div>`;
            }

            content.innerHTML = html;
            _refreshSysoLog();
        }

        // ── Login / Logout ────────────────────────────────────────────
        function sysoLogin() {
            const u = (document.getElementById('sysoUser')?.value || '').trim();
            const p = (document.getElementById('sysoPass')?.value || '').trim();
            _checkCredentials(u, p).then(valid => {
                if (valid) {
                    gameState.sysop.authenticated = true;
                    gameState.sysop.username = atob(_SYS.u);
                    document.getElementById('sysopBadge')?.classList.add('active');
                    sysoLog('Authentication successful. Welcome, ' + atob(_SYS.u));
                    renderSysopOverlay();
                } else {
                    const errEl = document.getElementById('sysoLoginErr');
                    if (errEl) {
                        errEl.textContent = '✗ Invalid credentials';
                        errEl.style.display = 'block';
                    }
                    sysoLog('Authentication failed.', 'error');
                }
            });
        }
        function sysoLogout() {
            handleLogout();
            renderSysopOverlay();
        }

        // ── Godmode sub-panel ─────────────────────────────────────────
        function sysoShowGodmode() {
            document.getElementById('sysoSub').innerHTML = `
            <div class="syo-sub">
                <div class="syo-sub-title">⚡ GOD MODE</div>
                <div class="syo-grid">
                    <button class="syo-btn" style="border-color:#00FF41;color:#00FF41;"
                        onclick="sysoExec('/godmode on');renderSysopOverlay();">⚡ ON</button>
                    <button class="syo-btn red"
                        onclick="sysoExec('/godmode off');renderSysopOverlay();">⛔ OFF</button>
                </div>
            </div>`;
        }

        // ── Generic sub-panel dispatcher ─────────────────────────────
        function sysoShowSub(type) {
            const sub = document.getElementById('sysoSub');
            if (!sub) return;

            if (type === 'level') {
                sub.innerHTML = `
                <div class="syo-sub">
                    <div class="syo-sub-title">📈 SET LEVEL (1–25)</div>
                    <input class="syo-input" id="sysoLvl" type="number" min="1" max="25"
                        inputmode="numeric" placeholder="e.g. 10">
                    <button class="syo-btn full" style="margin-top:4px;"
                        onclick="sysoExec('/setlevel '+document.getElementById('sysoLvl').value.trim());">✔ CONFIRM</button>
                </div>`;
                setTimeout(() => document.getElementById('sysoLvl')?.focus(), 50);
            }

            else if (type === 'gold') {
                sub.innerHTML = `
                <div class="syo-sub">
                    <div class="syo-sub-title">💰 SET GOLD</div>
                    <input class="syo-input" id="sysoGold" type="number" min="0"
                        inputmode="numeric" placeholder="e.g. 9999">
                    <button class="syo-btn full" style="margin-top:4px;"
                        onclick="sysoExec('/setgold '+document.getElementById('sysoGold').value.trim());">✔ CONFIRM</button>
                </div>`;
                setTimeout(() => document.getElementById('sysoGold')?.focus(), 50);
            }

            else if (type === 'teleport') {
                // List available dungeons for the dropdown
                const dungeonOptions = (typeof DUNGEONS !== 'undefined')
                    ? Object.keys(DUNGEONS).map(k => `<option value="${k}">${k}</option>`).join('')
                    : '<option value="Dungeon1">Dungeon1</option>';

                sub.innerHTML = `
                <div class="syo-sub">
                    <div class="syo-sub-title">🚀 TELEPORT</div>
                    <div class="syo-grid" style="margin-bottom:8px;">
                        <button class="syo-btn" onclick="sysoExec('/teleport town1')">🏘 Silverdale</button>
                        <button class="syo-btn" onclick="sysoExec('/teleport town2')">🌋 Ashen Harbor</button>
                        <button class="syo-btn" onclick="sysoExec('/teleport town3')">🏙 Town 3</button>
                    </div>
                    <div class="syo-label">Dungeon</div>
                    <select class="syo-input" id="sysoTpDungeon" style="font-size:18px;padding:6px;">
                        ${dungeonOptions}
                    </select>
                    <div class="syo-label">Floor (e.g. 1, 2, 3)</div>
                    <input class="syo-input" id="sysoTpF" type="number" min="1" inputmode="numeric" value="1">
                    <div class="syo-label">Room ID (e.g. R1, R57) — leave blank for floor start</div>
                    <input class="syo-input" id="sysoTpR" placeholder="R1" autocorrect="off" spellcheck="false"
                           style="text-transform:uppercase;">
                    <button class="syo-btn full" style="margin-top:8px;"
                        onclick="(function(){
                            const d=document.getElementById('sysoTpDungeon').value.trim();
                            const f=document.getElementById('sysoTpF').value.trim();
                            const r=document.getElementById('sysoTpR').value.trim();
                            const cmd='/teleport '+d+' f'+f+(r?' '+r.toUpperCase():'');
                            sysoExec(cmd);
                        })();">🚀 GO</button>
                </div>`;
            }

            else if (type === 'export') {
                sub.innerHTML = `
                <div class="syo-sub">
                    <div class="syo-sub-title">📤 EXPORT</div>
                    <div class="syo-grid">
                        <button class="syo-btn" onclick="sysoExec('/export save');">💾 Save File</button>
                        <button class="syo-btn" onclick="sysoExec('/export stats');">📊 Stats</button>
                    </div>
                </div>`;
            }

            sub.scrollIntoView({ behavior:'smooth', block:'nearest' });
        }

        // ── Give item sub-panel ───────────────────────────────────────
        function sysoShowGive(type) {
            if (!document.getElementById('sysopOverlay')?.classList.contains('open')) {
                openSysopOverlay();
            }
            let sub = document.getElementById('sysoSub');
            if (!sub) {
                setTimeout(() => sysoShowGive(type), 80);
                return;
            }

            let allKeys = [];
            if (type === 'weapon') allKeys = Object.keys(WEAPONS).filter(k => !WEAPONS[k].unarmed && !WEAPONS[k].isDropped);
            else if (type === 'armor')  allKeys = Object.keys(ARMOR).filter(k => !ARMOR[k].unarmored && !ARMOR[k].isDropped);
            else if (type === 'item')   allKeys = typeof ITEMS  !== 'undefined' ? Object.keys(ITEMS)  : [];
            else if (type === 'spell')  allKeys = typeof SPELLS !== 'undefined' ? Object.keys(SPELLS) : [];

            const needsQuality = type === 'weapon' || type === 'armor';
            const qualities = ['poor','normal','rare','epic','legendary','godly'];
            const db = type==='weapon' ? WEAPONS : type==='armor' ? ARMOR : type==='item' ? ITEMS : SPELLS;

            // Store for autocomplete handler
            window._sysoGiveKeys = allKeys;
            window._sysoGiveDb = db;

            const qualityHtml = needsQuality ? `
                <div class="syo-label">Quality</div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:6px;">
                    ${qualities.map(q => `<button class="syo-btn" id="sysoGiveQ_${q}"
                        onclick="window._sysoGiveQuality='${q}';document.querySelectorAll('[id^=sysoGiveQ_]').forEach(b=>b.style.borderColor='');this.style.borderColor='#00FF41';"
                        style="${q==='normal'?'border-color:#00FF41;':''}">${q}</button>`).join('')}
                </div>` : '';

            sub.innerHTML = `
            <div class="syo-sub">
                <div class="syo-sub-title">🎁 GIVE ${type.toUpperCase()}</div>
                <div class="syo-label">Search (type to filter)</div>
                <input class="syo-input" id="sysoGiveSearch" placeholder="Type name or key..."
                    autocorrect="off" spellcheck="false"
                    oninput="sysoFilterGiveList(this.value)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
                    <div class="syo-label">Select</div>
                    <span id="sysoGiveCount" style="color:#5a8a5a;font-family:'VT323',monospace;font-size:13px;">${allKeys.length} / ${allKeys.length}</span>
                </div>
                <select class="syo-input" id="sysoGiveId" size="6" style="height:auto;">
                    ${allKeys.map(k => `<option value="${k}">${db[k]?.name||k} [${k}]</option>`).join('')}
                </select>
                ${qualityHtml}
                <button class="syo-btn full" style="margin-top:6px;" onclick="sysoExecGive('${type}');">✔ GIVE</button>
            </div>`;

            // Default quality
            window._sysoGiveQuality = 'normal';

            sub.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => document.getElementById('sysoGiveSearch')?.focus(), 100);
        }

        function sysoExecGive(type) {
            const id  = document.getElementById('sysoGiveId')?.value;
            if (!id) { sysoLog('No item selected', 'error'); return; }
            const needsQuality = type === 'weapon' || type === 'armor';
            const q = needsQuality ? (window._sysoGiveQuality || 'normal') : '';
            const cmd = q ? `/give ${type} ${id} ${q}` : `/give ${type} ${id}`;
            sysoExec(cmd);
        }

        function sysoFilterGiveList(searchValue) {
    const q = searchValue.toLowerCase();
    const keys = window._sysoGiveKeys || [];
    const db = window._sysoGiveDb || {};
    const matches = keys.filter(k => !q || k.toLowerCase().includes(q) || (db[k]?.name || '').toLowerCase().includes(q));
    const sel = document.getElementById('sysoGiveId');
    if (!sel) return;
    sel.innerHTML = matches.length === 0
        ? '<option value="">No matches</option>'
        : matches.map(k => `<option value="${k}">${db[k]?.name || k} [${k}]</option>`).join('');
    document.getElementById('sysoGiveCount').textContent = matches.length + ' / ' + keys.length;
}

        // ── Live command help / autocomplete ─────────────────────────
        function _sysoLiveHelp(raw) {
            const hintsEl = document.getElementById('sysoCmdHints');
            if (!hintsEl) return;

            const input = raw.trim().toLowerCase();
            if (!input) { hintsEl.innerHTML = ''; return; }

            // ── All available commands with signatures ────────────────
            const COMMANDS = [
                { cmd: '/help',           sig: '',                            desc: 'Show all commands' },
                { cmd: '/heal',           sig: '',                            desc: 'Full heal player' },
                { cmd: '/godmode',        sig: 'on|off',                      desc: 'Toggle god mode' },
                { cmd: '/setlevel',       sig: '<1-25>',                      desc: 'Set player level' },
                { cmd: '/setgold',        sig: '<amount>',                    desc: 'Set gold amount' },
                { cmd: '/give',           sig: 'weapon|armor|item|spell <id> [quality]', desc: 'Give item to player' },
                { cmd: '/giveweapon',     sig: '<id> [quality]',              desc: 'Give weapon — type name to search' },
                { cmd: '/givearmor',      sig: '<id> [quality]',              desc: 'Give armor — type name to search' },
                { cmd: '/giveitem',       sig: '<id>',                        desc: 'Give item — type name to search' },
                { cmd: '/givespell',      sig: '<id>',                        desc: 'Give spell — type name to search' },
                { cmd: '/listweapons',    sig: '',                            desc: 'Browse all weapons' },
                { cmd: '/listarmor',      sig: '',                            desc: 'Browse all armor' },
                { cmd: '/listitems',      sig: '',                            desc: 'Browse all items' },
                { cmd: '/listmonsters',   sig: '',                            desc: 'Browse all monsters' },
                { cmd: '/teleport',       sig: 'town1|town2|town3|<dungeon> [fN] [roomId]', desc: 'Teleport anywhere' },
                { cmd: '/killmonster',    sig: '',                            desc: 'Kill current enemy' },
                { cmd: '/revealmap',      sig: '[dungeonKey]',                desc: 'Reveal dungeon map' },
                { cmd: '/unlockmaster',   sig: '<masterId>',                  desc: 'Unlock class master' },
                { cmd: '/export',         sig: 'save|stats',                  desc: 'Export data' },
            ];

            const parts = input.split(/\s+/);
            const cmdPart = parts[0];
            const argPart = parts.slice(1).join(' ');

            // ── If first token matches a full command, show arg hints ──
            const exact = COMMANDS.find(c => c.cmd === cmdPart);
            if (exact) {
                let extraHints = '';

                // Context-aware arg autocomplete
                if ((cmdPart === '/giveweapon' || cmdPart === '/give weapon') && argPart) {
                    const q = argPart.split(' ')[0].toLowerCase();
                    const matches = Object.keys(WEAPONS).filter(k => !WEAPONS[k].unarmed && !WEAPONS[k].isDropped &&
                        (k.includes(q) || (WEAPONS[k].name||'').toLowerCase().includes(q))).slice(0,5);
                    if (matches.length) extraHints = ' → ' + matches.map(k=>`<span style="color:#00FF41;cursor:pointer;" onclick="document.getElementById('sysocmdInput').value='/give weapon ${k} normal';_sysoLiveHelp('/give weapon ${k} normal');">${k}</span>`).join('  ');
                } else if ((cmdPart === '/givearmor' || cmdPart === '/give armor') && argPart) {
                    const q = argPart.split(' ')[0].toLowerCase();
                    const matches = Object.keys(ARMOR).filter(k => !ARMOR[k].unarmored && !ARMOR[k].isDropped &&
                        (k.includes(q) || (ARMOR[k].name||'').toLowerCase().includes(q))).slice(0,5);
                    if (matches.length) extraHints = ' → ' + matches.map(k=>`<span style="color:#00FF41;cursor:pointer;" onclick="document.getElementById('sysocmdInput').value='/give armor ${k} normal';_sysoLiveHelp('/give armor ${k} normal');">${k}</span>`).join('  ');
                } else if ((cmdPart === '/giveitem' || cmdPart === '/give item') && argPart) {
                    const q = argPart.split(' ')[0].toLowerCase();
                    const matches = Object.keys(ITEMS||{}).filter(k => k.includes(q) || (ITEMS[k].name||'').toLowerCase().includes(q)).slice(0,5);
                    if (matches.length) extraHints = ' → ' + matches.map(k=>`<span style="color:#00FF41;cursor:pointer;" onclick="document.getElementById('sysocmdInput').value='/give item ${k}';_sysoLiveHelp('/give item ${k}');">${k}</span>`).join('  ');
                } else if (cmdPart === '/teleport' && argPart) {
                    const q = argPart.toLowerCase();
                    const towns = ['town1','town2','town3'].filter(t => t.includes(q));
                    const dungeons = typeof DUNGEONS !== 'undefined' ? Object.keys(DUNGEONS).filter(k => k.toLowerCase().includes(q)) : [];
                    const all = [...towns, ...dungeons].slice(0, 6);
                    if (all.length) extraHints = ' → ' + all.map(d=>`<span style="color:#00FF41;cursor:pointer;" onclick="document.getElementById('sysocmdInput').value='/teleport ${d}';_sysoLiveHelp('/teleport ${d}');">${d}</span>`).join('  ');
                } else if (cmdPart === '/setlevel' && argPart) {
                    const lvl = parseInt(argPart);
                    if (!isNaN(lvl)) extraHints = lvl < 1 || lvl > 25 ? ' <span style="color:#ff4444;">⚠ Level must be 1–25</span>' : ` <span style="color:#00FF41;">→ Set level to ${lvl}</span>`;
                }

                hintsEl.innerHTML = `<span style="color:#ff8c00;">${exact.cmd}</span> <span style="color:#5a8a5a;">${exact.sig}</span>  <span style="color:#3a6a3a;">${exact.desc}</span>${extraHints}`;
                return;
            }

            // ── Partial match — show suggestions ──────────────────────
            const suggestions = COMMANDS.filter(c => c.cmd.startsWith(cmdPart) || c.cmd.includes(cmdPart)).slice(0, 6);
            if (suggestions.length === 0) {
                hintsEl.innerHTML = `<span style="color:#ff4444;">Unknown command. Try /help</span>`;
                return;
            }
            hintsEl.innerHTML = suggestions.map(c =>
                `<span style="color:#ff8c00;cursor:pointer;" onclick="document.getElementById('sysocmdInput').value='${c.cmd} ';document.getElementById('sysocmdInput').focus();_sysoLiveHelp('${c.cmd} ');">${c.cmd}</span> <span style="color:#3a6a3a;">${c.desc}</span>`
            ).join('  <span style="color:#1a3a1a;">|</span>  ');
        }
        function toggleMobileSysop()   { openSysopOverlay(); }
        function renderMobileSysop()   { renderSysopOverlay(); }
        function msysopLog(msg, type)  { sysoLog(msg, type); }
        function refreshMsysopOutput() { _refreshSysoLog(); }

        function terminalPrint(message, type = 'normal') {
            const output = document.getElementById('terminalOutput');
            const line = document.createElement('div');
            line.className = `terminal-line ${type === 'error' ? 'terminal-error' : ''} ${type === 'success' ? 'terminal-success' : ''} ${type === 'warning' ? 'terminal-warning' : ''}`;
            line.textContent = message;
            output.appendChild(line);
            
            // Auto-scroll to bottom
            output.scrollTop = output.scrollHeight;
        }

        function clearTerminal() {
            document.getElementById('terminalOutput').innerHTML = '';
        }

        // Terminal input handler
        // ── Detect touch/mobile device ────────────────────────────────
        const _isMobile = () => navigator.maxTouchPoints > 0 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

        // ── Terminal command history ──────────────────────────────────
        let _termHistIdx = -1;

        // ── Inline hint engine (PC only) ──────────────────────────────
        function _termHint(raw) {
            const hintsEl = document.getElementById('termHints');
            if (!hintsEl || _isMobile()) { if (hintsEl) hintsEl.style.display = 'none'; return; }

            const input = raw.trim();
            if (!input || !input.startsWith('/')) { hintsEl.style.display = 'none'; return; }

            const parts  = input.split(/\s+/);
            const cmd    = parts[0].toLowerCase();
            const args   = parts.slice(1);
            const argStr = args.join(' ').toLowerCase();

            const CMDS = [
                { c:'/help',          s:'',                                   d:'List all commands' },
                { c:'/heal',          s:'',                                   d:'Full heal player' },
                { c:'/godmode',       s:'on | off',                           d:'Toggle god mode' },
                { c:'/setlevel',      s:'<1–25>',                             d:'Set player level' },
                { c:'/setgold',       s:'<amount>',                           d:'Set gold' },
                { c:'/give',          s:'weapon|armor|item|spell <id> [quality]', d:'Give item' },
                { c:'/listweapons',   s:'',                                   d:'List all weapons' },
                { c:'/listarmor',     s:'',                                   d:'List all armor' },
                { c:'/listitems',     s:'',                                   d:'List all items' },
                { c:'/listmonsters',  s:'',                                   d:'List all monsters' },
                { c:'/teleport',      s:'town1|town2|town3|<dungeon> [fN] [roomId]', d:'Teleport anywhere' },
                { c:'/killmonster',   s:'',                                   d:'Kill current enemy' },
                { c:'/revealmap',     s:'[dungeonKey]',                       d:'Reveal dungeon map' },
                { c:'/unlockmaster',  s:'<masterId>',                         d:'Unlock class master' },
                { c:'/export',        s:'save | stats',                       d:'Export data' },
                { c:'/clear',         s:'',                                   d:'Clear terminal' },
                { c:'/logout',        s:'',                                   d:'Logout of sysop' },
            ];

            let html = '';

            // ── Exact command match — show arg hints + live suggestions ──
            const exact = CMDS.find(x => x.c === cmd);
            if (exact) {
                html += `<span style="color:#ff8c00;">${exact.c}</span> <span style="color:#5a8a5a;">${exact.s}</span>  <span style="color:#3a6a3a;">${exact.d}</span>`;

                // Arg-level autocomplete
                const q = (args[0] || '').toLowerCase();
                let suggestions = [];

                if (cmd === '/give') {
                    const sub = (args[0]||'').toLowerCase();
                    const id  = (args[1]||'').toLowerCase();
                    const qual= (args[2]||'').toLowerCase();
                    if (!sub || ['weapon','armor','item','spell'].some(x=>x.startsWith(sub) && x!==sub)) {
                        suggestions = ['weapon','armor','item','spell'].filter(x=>x.startsWith(sub));
                        html += _hintRow('Subtype:', suggestions, s => `/give ${s} `);
                    } else if (sub === 'weapon' && id !== undefined) {
                        const db = Object.keys(WEAPONS).filter(k=>!WEAPONS[k].unarmed && !WEAPONS[k].isDropped);
                        suggestions = db.filter(k=>k.includes(id)||(WEAPONS[k].name||'').toLowerCase().includes(id)).slice(0,5);
                        if (suggestions.length) html += _hintRow('Weapons:', suggestions, s=>`/give weapon ${s} `, k=>WEAPONS[k]?.name);
                        if (qual !== undefined && args.length >= 3) {
                            const qs = ['poor','normal','rare','epic','legendary','godly'].filter(x=>x.startsWith(qual));
                            if (qs.length) html += _hintRow('Quality:', qs, q=>`/give weapon ${args[1]} ${q}`);
                        }
                    } else if (sub === 'armor' && id !== undefined) {
                        const db = Object.keys(ARMOR).filter(k=>!ARMOR[k].unarmored && !ARMOR[k].isDropped);
                        suggestions = db.filter(k=>k.includes(id)||(ARMOR[k].name||'').toLowerCase().includes(id)).slice(0,5);
                        if (suggestions.length) html += _hintRow('Armor:', suggestions, s=>`/give armor ${s} `, k=>ARMOR[k]?.name);
                        if (qual !== undefined && args.length >= 3) {
                            const qs = ['poor','normal','rare','epic','legendary','godly'].filter(x=>x.startsWith(qual));
                            if (qs.length) html += _hintRow('Quality:', qs, q=>`/give armor ${args[1]} ${q}`);
                        }
                    } else if (sub === 'item' && id !== undefined) {
                        const db = typeof ITEMS!=='undefined' ? Object.keys(ITEMS) : [];
                        suggestions = db.filter(k=>k.includes(id)||(ITEMS[k]?.name||'').toLowerCase().includes(id)).slice(0,5);
                        if (suggestions.length) html += _hintRow('Items:', suggestions, s=>`/give item ${s}`, k=>ITEMS[k]?.name);
                    } else if (sub === 'spell' && id !== undefined) {
                        const db = typeof SPELLS!=='undefined' ? Object.keys(SPELLS) : [];
                        suggestions = db.filter(k=>k.includes(id)||(SPELLS[k]?.name||'').toLowerCase().includes(id)).slice(0,5);
                        if (suggestions.length) html += _hintRow('Spells:', suggestions, s=>`/give spell ${s}`, k=>SPELLS[k]?.name);
                    }
                } else if (cmd === '/teleport') {
                    const towns = ['town1','town2','town3'].filter(t=>t.startsWith(q)||!q);
                    const dungeons = typeof DUNGEONS!=='undefined' ? Object.keys(DUNGEONS).filter(k=>k.toLowerCase().startsWith(q)||!q) : [];
                    const dest = [...towns, ...dungeons].slice(0,8);
                    if (dest.length && args.length <= 1) html += _hintRow('Destinations:', dest, d=>`/teleport ${d}`);
                } else if (cmd === '/setlevel' && q) {
                    const n = parseInt(q);
                    if (!isNaN(n)) html += (n<1||n>25) ? `  <span style="color:#ff4444;">⚠ must be 1–25</span>` : `  <span style="color:#88ff88;">→ set to level ${n}</span>`;
                } else if (cmd === '/godmode' && q) {
                    ['on','off'].filter(x=>x.startsWith(q)).forEach(x=>{ html += `  <span class="_termFill" data-fill="/godmode ${x}" style="color:#00FF41;cursor:pointer;text-decoration:underline;">${x}</span>`; });
                } else if (cmd === '/export' && q) {
                    ['save','stats'].filter(x=>x.startsWith(q)).forEach(x=>{ html += `  <span class="_termFill" data-fill="/export ${x}" style="color:#00FF41;cursor:pointer;text-decoration:underline;">${x}</span>`; });
                }

                hintsEl.innerHTML = html;
                hintsEl.style.display = 'block';
                _bindTermFill();
                return;
            }

            // ── Partial command — show matching commands ──────────────
            const matches = CMDS.filter(x => x.c.startsWith(cmd) || (cmd.length > 1 && x.c.includes(cmd)));
            if (!matches.length) {
                hintsEl.innerHTML = `<span style="color:#ff4444;">Unknown command — try /help</span>`;
                hintsEl.style.display = 'block';
                return;
            }
            html = matches.map(x =>
                `<span class="_termFill" data-fill="${x.c} " style="color:#ff8c00;cursor:pointer;text-decoration:underline;">${x.c}</span><span style="color:#3a6a3a;"> ${x.d}</span>`
            ).join('  <span style="color:#1a2a1a;">·</span>  ');
            hintsEl.innerHTML = html;
            hintsEl.style.display = 'block';
            _bindTermFill();
        }

        function _hintRow(label, keys, fillFn, nameFn) {
            if (!keys.length) return '';
            const items = keys.map(k => {
                const name = nameFn ? nameFn(k) : null;
                const display = name ? `${k}<span style="color:#3a6a3a;"> ${name}</span>` : k;
                const fill = fillFn(k);
                return `<span class="_termFill" data-fill="${fill}" style="color:#00FF41;cursor:pointer;text-decoration:underline;white-space:nowrap;margin-right:12px;">${display}</span>`;
            }).join('');
            return `<br><span style="color:#5a8a5a;">${label}</span> ${items}`;
        }

        function _bindTermFill() {
            document.querySelectorAll('._termFill').forEach(el => {
                el.onclick = () => {
                    const inp = document.getElementById('terminalInput');
                    inp.value = el.dataset.fill;
                    inp.focus();
                    _termHint(inp.value);
                };
            });
        }

        // ── List/Give routing: overlay on mobile, terminal print on PC ─
        function _routeList(type) {
            if (_isMobile()) {
                _sysoShowListPanel(type);
            } else {
                // Print to terminal in a compact readable format
                const configs = {
                    weapons:  { db: WEAPONS,  filter: k=>!WEAPONS[k].unarmed&&!WEAPONS[k].isDropped, meta: (k,v)=>`Lv${v.level||'?'} DMG:${v.baseDamage||'?'}` },
                    armor:    { db: ARMOR,    filter: k=>!ARMOR[k].unarmored&&!ARMOR[k].isDropped,   meta: (k,v)=>`Lv${v.level||'?'} DEF:${v.baseDefense||'?'}` },
                    items:    { db: typeof ITEMS!=='undefined'?ITEMS:{}, filter:()=>true, meta:(k,v)=>v.type||'' },
                    monsters: { db: ENEMIES,  filter: ()=>true, meta: (k,v)=>`Lv${v.level||'?'} HP:${v.baseHp||'?'}` },
                };
                const cfg = configs[type];
                if (!cfg) return;
                const keys = Object.keys(cfg.db).filter(cfg.filter);
                terminalPrint(`═══ ${type.toUpperCase()} (${keys.length}) ═══`, 'warning');
                keys.forEach(k => {
                    const v = cfg.db[k];
                    terminalPrint(`  ${k.padEnd(28)} ${(v.name||k).padEnd(28)} ${cfg.meta(k,v)}`);
                });
                terminalPrint(`═══ END ${type.toUpperCase()} ═══`, 'warning');
            }
        }

        document.getElementById('terminalInput').addEventListener('keydown', (e) => {
            const inp = e.target;
            const hist = gameState.sysop.commandHistory || [];

            // ── Up/Down arrow: command history ────────────────────────
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (_termHistIdx < hist.length - 1) _termHistIdx++;
                inp.value = hist[hist.length - 1 - _termHistIdx] || '';
                _termHint(inp.value);
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (_termHistIdx > 0) { _termHistIdx--; inp.value = hist[hist.length - 1 - _termHistIdx] || ''; }
                else { _termHistIdx = -1; inp.value = ''; }
                _termHint(inp.value);
                return;
            }

            // ── Tab: autocomplete first suggestion ────────────────────
            if (e.key === 'Tab') {
                e.preventDefault();
                const first = document.querySelector('._termFill');
                if (first) { inp.value = first.dataset.fill; _termHint(inp.value); }
                return;
            }

            // ── Enter: execute ────────────────────────────────────────
            if (e.key === 'Enter') {
                const val = inp.value.trim();
                inp.value = '';
                _termHistIdx = -1;
                document.getElementById('termHints').style.display = 'none';
                if (val) {
                    terminalPrint(`root@dungeon:~# ${val}`, 'normal');
                    gameState.sysop.commandHistory.push(val);
                    executeCommand(val);
                }
            }
        });

        document.getElementById('terminalInput').addEventListener('input', (e) => {
            _termHistIdx = -1;
            _termHint(e.target.value);
        });

        function executeCommand(input) {
            const parts = input.split(' ');
            const command = parts[0].toLowerCase();
            const args = parts.slice(1);

            // Login command (always available)
            if (command === '/login') {
                handleLogin(args);
                return;
            }

            // Check authentication for all other commands
            if (!gameState.sysop.authenticated) {
                terminalPrint('ERROR: Authentication required. Use /login <username> <password>', 'error');
                return;
            }

            // Execute authenticated commands
            switch(command) {
                case '/help':
                    showHelp();
                    break;
                case '/logout':
                    handleLogout();
                    break;
                case '/clear':
                    clearTerminal();
                    break;
                case '/give':
                    handleGive(args);
                    break;
                case '/addmonster':
                    openAddMonsterForm();
                    break;
                case '/addweapon':
                    openAddWeaponForm();
                    break;
                case '/addarmor':
                    openAddArmorForm();
                    break;
                case '/additem':
                    openAddItemForm();
                    break;
                case '/listmonsters':
                    listMonsters();
                    break;
                case '/listweapons':
                    listWeapons();
                    break;
                case '/listarmor':
                    listArmor();
                    break;
                case '/listitems':
                    listItems();
                    break;
                case '/setlevel':
                    handleSetLevel(args);
                    break;
                case '/setgold':
                    handleSetGold(args);
                    break;
                case '/heal':
                    handleHeal();
                    break;
                case '/godmode':
                    handleGodMode(args);
                    break;
                case '/teleport':
                    handleTeleport(args);
                    break;
                case '/killmonster':
                    handleKillMonster();
                    break;
                case '/export':
                    handleExport(args);
                    break;
                case '/revealmap':
                    handleRevealMap(args);
                    break;
                case '/unlockmaster':
                    handleUnlockMaster(args);
                    break;
                default:
                    terminalPrint(`ERROR: Unknown command '${command}'. Type /help for available commands.`, 'error');
            }
        }

        function handleLogin(args) {
            if (args.length < 2) {
                terminalPrint('ERROR: Usage: /login <username> <password>', 'error');
                return;
            }
            const username = args[0];
            const password = args[1];
            const displayName = atob(_SYS.u);
            _checkCredentials(username, password).then(valid => {
                if (valid) {
                    gameState.sysop.authenticated = true;
                    gameState.sysop.username = displayName;
                    document.getElementById('sysopBadge').classList.add('active');
                    terminalPrint('═══════════════════════════════════════', 'success');
                    terminalPrint('  AUTHENTICATION SUCCESSFUL', 'success');
                    terminalPrint('  Welcome, ' + displayName, 'success');
                    terminalPrint('  Type /help for available commands', 'success');
                    terminalPrint('═══════════════════════════════════════', 'success');
                } else {
                    terminalPrint('ERROR: Authentication failed. Invalid credentials.', 'error');
                }
            });
        }

        function handleLogout() {
            gameState.sysop.authenticated = false;
            gameState.sysop.username = null;
            document.getElementById('sysopBadge').classList.remove('active');
            terminalPrint('Logged out. Terminal locked.', 'warning');
        }

        function showHelp() {
            terminalPrint('═══════════════════════════════════════', 'warning');
            terminalPrint('SYSOP COMMANDS:', 'warning');
            terminalPrint('═══════════════════════════════════════', 'warning');
            terminalPrint('');
            terminalPrint('AUTHENTICATION:');
            terminalPrint('  /login <user> <pass>  - Authenticate as sysop');
            terminalPrint('  /logout               - End sysop session');
            terminalPrint('');
            terminalPrint('PLAYER COMMANDS:');
            terminalPrint('  /give <type> <id> [quality]  - Give item to player');
            terminalPrint('                                 Types: weapon, armor, item, spell, runestone');
            terminalPrint('                                 Quality (optional): poor, normal, rare,');
            terminalPrint('                                           epic, legendary, godly');
            terminalPrint('                                 Examples:');
            terminalPrint('                                   /give weapon iron_sword legendary');
            terminalPrint('                                   /give armor leather_armor godly');
            terminalPrint('                                   /give runestone white');
            terminalPrint('                                   /give runestone yellow');
            terminalPrint('                                   /give runestone none  (removes all)');
            terminalPrint('                                 Runestone colors:');
            terminalPrint('                                   white, yellow, green, blue,');
            terminalPrint('                                   purple, brown, black, red');
            terminalPrint('  /setlevel <level>     - Set player level (1-25)');
            terminalPrint('                          ⚡ Level 20 triggers class evolution!');
            terminalPrint('  /setgold <amount>     - Set gold amount');
            terminalPrint('  /heal                 - Fully heal player');
            terminalPrint('  /godmode <on/off>     - Toggle invincibility');
            terminalPrint('');
            terminalPrint('GAME CONTENT:');
            terminalPrint('  /addmonster           - Add new monster (opens form)');
            terminalPrint('  /addweapon            - Add new weapon (opens form)');
            terminalPrint('  /addarmor             - Add new armor (opens form)');
            terminalPrint('  /additem              - Add new item (opens form)');
            terminalPrint('');
            terminalPrint('LISTING:');
            terminalPrint('  /listmonsters         - Show all monsters');
            terminalPrint('  /listweapons          - Show all weapons');
            terminalPrint('  /listarmor            - Show all armor');
            terminalPrint('  /listitems            - Show all items');
            terminalPrint('');
            terminalPrint('UTILITIES:');
            terminalPrint('  /teleport <dest>               - Teleport anywhere');
            terminalPrint('    /teleport town1              - Go to Silverdale');
            terminalPrint('    /teleport town2              - Go to Ashen Harbor');
            terminalPrint('    /teleport town3              - Go to Town 3');
            terminalPrint('    /teleport dungeon1           - Dungeon1 Floor 1 start');
            terminalPrint('    /teleport dungeon1 f2        - Dungeon1 Floor 2 start');
            terminalPrint('    /teleport dungeon1 f1 R57    - Dungeon1 Floor 1 Room R57');
            terminalPrint('    /teleport forest             - Any explore zone key');
            terminalPrint('  /revealmap [dungeon]     - Reveal entire dungeon map');
            terminalPrint('                             No arg = all dungeons');
            terminalPrint('                             /revealmap dungeon1');
            terminalPrint('  /unlockmaster [area|all] - Mark class master(s) as defeated');
            terminalPrint('                             and unlock the zone they guard');
            terminalPrint('                             /unlockmaster all');
            terminalPrint('                             /unlockmaster plains');
            terminalPrint('  /killmonster             - Instantly kill current enemy');
            terminalPrint('  /export <type>           - Export data (monsters/weapons/armor/items)');
            terminalPrint('  /clear                   - Clear terminal output');
            terminalPrint('═══════════════════════════════════════', 'warning');
        }

        // Find and replace the handleGive function
// Look for this in your code and replace the weapon section

function handleGive(args) {
    if (!gameState.player) {
        terminalPrint('ERROR: No active player character', 'error');
        return;
    }

    if (args.length < 2) {
        terminalPrint('ERROR: Usage: /give <type> <id> [quality]', 'error');
        terminalPrint('Types: weapon, armor, item, spell, runestone', 'error');
        terminalPrint('Quality (optional, for weapons/armor): poor, normal, rare, epic, legendary, godly', 'error');
        return;
    }

    const type = args[0].toLowerCase();
    const id = args[1].toLowerCase();
    const specifiedQuality = args[2] ? args[2].toLowerCase() : null;

    switch(type) {
        case 'weapon':
            if (WEAPONS[id]) {
                const baseWeapon = WEAPONS[id];
                
                // Determine final quality:
                let finalQuality;
                if (specifiedQuality) {
                    finalQuality = specifiedQuality;
                    if (baseWeapon.quality && baseWeapon.quality !== '') {
                        terminalPrint(`⚠️ Overriding weapon's built-in quality (${baseWeapon.quality}) with '${finalQuality}'`, 'warning');
                    }
                } else if (baseWeapon.quality && baseWeapon.quality !== '') {
                    finalQuality = baseWeapon.quality;
                    terminalPrint(`ℹ️ Using weapon's built-in quality: ${finalQuality}`, 'info');
                } else {
                    finalQuality = 'normal';
                }
                
                // Validate quality
                if (!QUALITY_CONFIG[finalQuality]) {
                    terminalPrint(`ERROR: Invalid quality '${finalQuality}'. Use: poor, normal, rare, epic, legendary, godly`, 'error');
                    break;
                }
                
                const p = gameState.player;
                // FIXED: Use base weapon level, NOT player level!
                const weaponLevel = baseWeapon.level || 1;
                const bonusPct = QUALITY_CONFIG[finalQuality]?.bonusPct || 0;
                const instanceId = `${id}_${finalQuality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
                
                // Generate modifiers if weapon has them or if it's a high quality
                let modifiers = [];
                if (typeof generateModifiers === 'function') {
                    modifiers = generateModifiers(finalQuality, weaponLevel);
                }
                
                // Calculate stats with quality bonus
                const baseDamageBonus = Math.floor(baseWeapon.baseDamage * bonusPct);
                const maxDamageBonus = baseWeapon.maxDamage ? Math.floor(baseWeapon.maxDamage * bonusPct) : baseDamageBonus;
                const magicDamageBonus = baseWeapon.baseMagicDamage ? Math.floor(baseWeapon.baseMagicDamage * bonusPct) : 0;
                
                const gemSlots = {
                    poor: 0,
                    normal: 0,
                    rare: 1,
                    epic: 2,
                    legendary: 3,
                    godly: 4
                }[finalQuality] || 0;
                
                // Generate enhanced name with modifiers
                let weaponName;
                if (typeof generateEnhancedWeaponName === 'function' && modifiers.length > 0) {
                    weaponName = generateEnhancedWeaponName(baseWeapon, finalQuality, modifiers);
                } else {
                    const qualityDisplay = finalQuality.charAt(0).toUpperCase() + finalQuality.slice(1);
                    weaponName = `${qualityDisplay} ${baseWeapon.name}`;
                }
                
                const weapon = {
                    id: id,
                    weaponId: id,
                    instanceId: instanceId,
                    name: weaponName,
                    baseName: baseWeapon.name,
                    type: baseWeapon.type || baseWeapon.weaponSubtype,
                    weaponSubtype: baseWeapon.weaponSubtype || baseWeapon.type,
                    baseDamage: baseWeapon.baseDamage + baseDamageBonus,
                    maxDamage: (baseWeapon.maxDamage || baseWeapon.baseDamage) + maxDamageBonus,
                    baseMagicDamage: baseWeapon.baseMagicDamage ? baseWeapon.baseMagicDamage + magicDamageBonus : 0,
                    level: weaponLevel,
                    quality: finalQuality,
                    qualityBonus: bonusPct,
                    modifiers: modifiers,
                    gemSlots: gemSlots,
                    gems: [],
                    cost: baseWeapon.cost,
                    description: baseWeapon.description || `A ${finalQuality} quality ${baseWeapon.name}.`,
                    allowedClasses: baseWeapon.allowedClasses,
                    isDropped: true,
                    dropTimestamp: Date.now(),
                    isEquipped: false
                };
                
                WEAPONS[instanceId] = weapon;
                gameState.player.inventory.push(weapon);
                
                const modifierText = modifiers.length > 0 ? ` with ${modifiers.length} modifier(s)` : '';
                terminalPrint(`SUCCESS: Gave ${weaponName}${modifierText} (${gemSlots} gem slot${gemSlots !== 1 ? 's' : ''})`, 'success');
            } else {
                terminalPrint(`ERROR: Weapon '${id}' not found`, 'error');
                terminalPrint('Use /listweapons to see available weapons', 'error');
            }
            break;

        case 'armor':
            if (ARMOR[id]) {
                const baseArmor = ARMOR[id];
                
                let finalQuality;
                if (specifiedQuality) {
                    finalQuality = specifiedQuality;
                    if (baseArmor.quality && baseArmor.quality !== '') {
                        terminalPrint(`⚠️ Overriding armor's built-in quality (${baseArmor.quality}) with '${finalQuality}'`, 'warning');
                    }
                } else if (baseArmor.quality && baseArmor.quality !== '') {
                    finalQuality = baseArmor.quality;
                    terminalPrint(`ℹ️ Using armor's built-in quality: ${finalQuality}`, 'info');
                } else {
                    finalQuality = 'normal';
                }
                
                // FIXED: Use base armor level, NOT player level!
                const armorLevel = baseArmor.level || 1;
                const bonusPct = QUALITY_CONFIG[finalQuality]?.bonusPct || 0;
                const instanceId = `${id}_${finalQuality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
                const qualityDisplay = finalQuality.charAt(0).toUpperCase() + finalQuality.slice(1);
                
                const defenseBonus = Math.floor(baseArmor.baseDefense * bonusPct);
                const magicBonus = baseArmor.baseMagicBonus ? Math.floor(baseArmor.baseMagicBonus * bonusPct) : 0;
                
                let armorName = baseArmor.name;
                if (finalQuality === 'legendary') {
                    const prefixes = ['Ancient', 'Mythic', 'Eternal', 'Dragonforged'];
                    armorName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseArmor.name}`;
                } else if (finalQuality === 'godly') {
                    const prefixes = ['Divine', 'Immortal', 'Primordial', 'Celestial'];
                    armorName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseArmor.name}`;
                } else if (finalQuality === 'epic') {
                    const prefixes = ['Mighty', 'Exquisite', 'Flawless', 'Masterwork'];
                    armorName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseArmor.name}`;
                } else if (finalQuality !== 'normal') {
                    armorName = `${qualityDisplay} ${baseArmor.name}`;
                }
                
                const armor = {
                    id: id,
                    armorId: id,
                    instanceId: instanceId,
                    name: armorName,
                    baseName: baseArmor.name,
                    type: baseArmor.type || baseArmor.armorSubtype || baseArmor.slot || 'armor',
                    armorSubtype: baseArmor.armorSubtype || baseArmor.type || baseArmor.slot || 'armor',
                    baseDefense: baseArmor.baseDefense + defenseBonus,
                    baseMagicBonus: (baseArmor.baseMagicBonus || 0) + magicBonus,
                    level: baseArmor.level,
                    quality: finalQuality,
                    qualityBonus: bonusPct,
                    gems: [],
                    gemSlots: 0,
                    cost: baseArmor.cost,
                    description: baseArmor.description || `A ${finalQuality} quality ${baseArmor.name}.`,
                    allowedClasses: baseArmor.allowedClasses,
                    isDropped: true,
                    dropTimestamp: Date.now(),
                    isEquipped: false
                };
                
                ARMOR[instanceId] = armor;
                gameState.player.inventory.push(armor);
                
                terminalPrint(`SUCCESS: Gave ${armorName} (DEF:${armor.baseDefense}${armor.baseMagicBonus > 0 ? ` MAG:+${armor.baseMagicBonus}` : ''})`, 'success');
            } else {
                terminalPrint(`ERROR: Armor '${id}' not found`, 'error');
                terminalPrint('Use /listarmor to see available armor', 'error');
            }
            break;
            
        case 'item':
            if (ITEMS[id]) {
                gameState.player.inventory.push(id);
                terminalPrint(`SUCCESS: Gave item '${ITEMS[id].name}' to player`, 'success');
            } else {
                terminalPrint(`ERROR: Item '${id}' not found`, 'error');
            }
            break;
            
        case 'spell':
            if (SPELLS[id]) {
                if (!gameState.player.knownSpells.includes(id)) {
                    gameState.player.knownSpells.push(id);
                }
                terminalPrint(`SUCCESS: Taught spell '${SPELLS[id].name}' to player`, 'success');
            } else {
                terminalPrint(`ERROR: Spell '${id}' not found`, 'error');
            }
            break;
            
        case 'runestone': {
            if (id === 'none' || id === 'clear' || id === 'reset') {
                if (!gameState.player.runestones || gameState.player.runestones.length === 0) {
                    terminalPrint('Player has no runestones to remove.', 'warning');
                } else {
                    const removed = [...gameState.player.runestones];
                    gameState.player.runestones = [];
                    gameState.player.portalUnlocked = false;
                    saveGame();
                    terminalPrint(`SUCCESS: Removed ${removed.length} runestone(s): ${removed.join(', ')}`, 'success');
                    terminalPrint('  → Portal access reset.', 'info');
                }
                break;
            }
            const rsId = id.includes('_runestone') ? id : `${id}_runestone`;
            if (RUNESTONES[rsId]) {
                const rs = RUNESTONES[rsId];
                if (!gameState.player.runestones) gameState.player.runestones = [];
                if (!gameState.player.runestones.includes(rsId)) {
                    gameState.player.runestones.push(rsId);
                    if (!gameState.player.achievements) gameState.player.achievements = [];
                    gameState.player.achievements.push({ id: rsId, name: rs.name, earned: Date.now() });
                    terminalPrint(`SUCCESS: Gave <span style="color:${rs.color};">${rs.name}</span> to player`, 'success');
                    terminalPrint(`  → "${rs.description}"`, 'info');
                    if (rs.unlocksPortal) {
                        terminalPrint(`  → Portal unlocked: ${rs.unlocksPortal.from} ↔ ${rs.unlocksPortal.to}`, 'success');
                    }
                    saveGame();
                } else {
                    terminalPrint(`Player already has the ${rs.name}`, 'warning');
                }
            } else {
                terminalPrint(`ERROR: Unknown runestone color '${id}'`, 'error');
                terminalPrint('Valid colors: white, yellow, green, blue, purple, brown, black, red', 'error');
                terminalPrint('Usage: /give runestone white   OR   /give runestone white_runestone', 'error');
                terminalPrint('       /give runestone none    — removes all runestones', 'error');
            }
            break;
        }
        
        default:
            terminalPrint(`ERROR: Invalid type '${type}'`, 'error');
    }
    
    saveGame();
}
        function handleSetLevel(args) {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }

            const targetLevel = parseInt(args[0]);
            if (isNaN(targetLevel) || targetLevel < 1 || targetLevel > 25) {
                terminalPrint('ERROR: Invalid level. Use 1-25', 'error');
                return;
            }

            const p = gameState.player;
            const currentLevel = p.level;
            
            // Calculate how many levels to add
            const levelsToAdd = targetLevel - currentLevel;
            
            if (levelsToAdd === 0) {
                terminalPrint(`Player is already level ${targetLevel}`, 'info');
                return;
            }
            
            // Apply level-ups manually
            for (let i = 0; i < Math.abs(levelsToAdd); i++) {
                if (levelsToAdd > 0) {
                    // Level up
                    p.level++;
                    p.maxHp += 15 + (p.con || 0);
                    p.hp = p.maxHp;
                    p.maxMp += 10;
                    p.mp = p.maxMp;
                    p.strength += 2;
                    p.defense += 2;
                    p.magic += 2;
                    p.speed += 1;

                    // ── Stat points: 3 per level, same as normal level-up ──
                    if (p.statPoints === undefined) p.statPoints = 0;
                    p.statPoints += 3;
                    
                    if (p.str !== undefined) {
                        p.str++; p.dex++; p.wis++; p.cha++; p.con++; p.lck++;
                        if (p.class === 'paladin' || p.baseClass === 'paladin') { 
                            p.str++; p.wis++; 
                        }
                    }
                    
                    // Check for class evolution at 20
                    if (p.level === 20 && evolveClass(p)) {
                        const evolution = ADVANCED_CLASSES[p.baseClass];
                        terminalPrint(`⚡ CLASS EVOLUTION! ${evolution.announcement}`, 'success');
                    }
                } else {
                    // Level down
                    p.level--;
                    p.maxHp = Math.max(20, p.maxHp - 15 - (p.con || 0));
                    p.hp = Math.min(p.hp, p.maxHp);
                    p.maxMp = Math.max(10, p.maxMp - 10);
                    p.mp = Math.min(p.mp, p.maxMp);
                    p.strength = Math.max(1, p.strength - 2);
                    p.defense = Math.max(1, p.defense - 2);
                    p.magic = Math.max(1, p.magic - 2);
                    p.speed = Math.max(1, p.speed - 1);

                    // ── Remove 3 stat points per level removed ──
                    if (p.statPoints === undefined) p.statPoints = 0;
                    p.statPoints = Math.max(0, p.statPoints - 3);
                    
                    if (p.str !== undefined) {
                        p.str = Math.max(1, p.str - 1);
                        p.dex = Math.max(1, p.dex - 1);
                        p.wis = Math.max(1, p.wis - 1);
                        p.cha = Math.max(1, p.cha - 1);
                        p.con = Math.max(1, p.con - 1);
                        p.lck = Math.max(1, p.lck - 1);
                    }
                }
            }
            
            // Update XP to next
            p.xpToNext = getXpToNextLevel(p.baseClass || p.class, p.level);
            // Lose 25% of current level's XP progress
const currentLevelStartXP = getXpForLevel(p.baseClass || p.class, p.level);
const nextLevelXP = getXpForNextLevel(p.baseClass || p.class, p.level);
const xpGainedThisLevel = p.xp - currentLevelStartXP;
const xpToLose = Math.floor(xpGainedThisLevel * 0.25); // 25% loss
p.xp = Math.max(currentLevelStartXP, p.xp - xpToLose);
terminalPrint(`💀 You died and lost 25% of your progress toward level ${p.level + 1}!`, 'term-error');
            


            // ═══════════════════════════════════════════════════════════════
            // AUTO-UNLOCK EXPLORE ZONES (same logic as showTown)
            // ═══════════════════════════════════════════════════════════════
            if (typeof LOCATIONS !== 'undefined') {
                Object.keys(LOCATIONS).forEach(key => {
                    const loc = LOCATIONS[key];
                    if (key === 'town') return;
                    if (!loc.locked && loc.requiredLevel && p.level >= loc.requiredLevel) {
                        if (!p.unlockedAreas.includes(key)) {
                            p.unlockedAreas.push(key);
                            terminalPrint(`✓ Unlocked zone: ${loc.name}`, 'success');
                        }
                    }
                });
            }

            // ═══════════════════════════════════════════════════════════════
            // AUTO-DEFEAT CLASS MASTERS for skipped levels
            // Locked zones require a master fight — when /setlevel skips past
            // a master's requiredLevel, mark that master as defeated and unlock
            // the zone it guards so the player isn't permanently soft-locked.
            // ═══════════════════════════════════════════════════════════════
            if (typeof CLASS_MASTERS !== 'undefined') {
                const areaOrder = ['forest','riverside','haunted_graveyard','dark_swamp','cursed_ruins','cave','crypt','plains','demon_portal','volcano','celestial_spire'];
                Object.keys(CLASS_MASTERS).forEach(masterKey => {
                    const master = CLASS_MASTERS[masterKey];
                    // Only process masters for this player's class
                    const playerClass = p.baseClass || p.class;
                    if (!masterKey.startsWith(playerClass + '_master_')) return;
                    // If player meets or exceeds the master's required level, auto-defeat
                    if (p.level >= master.requiredLevel && !p.defeatedMasters.includes(masterKey)) {
                        p.defeatedMasters.push(masterKey);
                        terminalPrint(`✓ Auto-defeated master: ${master.name}`, 'success');
                        // Unlock the zone this master guards
                        if (master.unlocks && typeof LOCATIONS !== 'undefined' && LOCATIONS[master.unlocks]) {
                            if (!p.unlockedAreas.includes(master.unlocks)) {
                                p.unlockedAreas.push(master.unlocks);
                                terminalPrint(`✓ Unlocked zone: ${LOCATIONS[master.unlocks].name}`, 'success');
                            }
                        }
                    }
                });
            }
            
            updateHud();
            saveGame();
            const spAwarded = levelsToAdd > 0 ? levelsToAdd * 3 : 0;
            const spMsg = spAwarded > 0 ? ` (+${spAwarded} stat points)` : levelsToAdd < 0 ? ` (${levelsToAdd * 3} stat points)` : '';
            terminalPrint(`SUCCESS: Set player level to ${targetLevel}${spMsg}`, 'success');
            
            if (p.hasEvolved) {
                terminalPrint(`Player is now a ${getAdvancedClassName(p)} with ${getClassDamageMultiplier(p)}x damage!`, 'info');
            }
        }

        function handleSetGold(args) {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }

            const gold = parseInt(args[0]);
            if (isNaN(gold) || gold < 0) {
                terminalPrint('ERROR: Invalid gold amount', 'error');
                return;
            }

            gameState.player.gold = gold;
            terminalPrint(`SUCCESS: Set gold to ${gold}`, 'success');
        }

        function handleHeal() {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }

            gameState.player.hp = gameState.player.maxHp;
            gameState.player.mp = gameState.player.maxMp;
            terminalPrint('SUCCESS: Player fully healed', 'success');
        }

        function handleGodMode(args) {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }

            const mode = args[0]?.toLowerCase();
            if (mode === 'on') {
                gameState.player.godMode = true;
                terminalPrint('SUCCESS: God Mode ENABLED - Player is invincible', 'success');
            } else if (mode === 'off') {
                gameState.player.godMode = false;
                terminalPrint('SUCCESS: God Mode DISABLED', 'success');
            } else {
                terminalPrint('ERROR: Usage: /godmode <on/off>', 'error');
            }
        }

        function handleTeleport(args) {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }
            if (!args || args.length === 0) {
                terminalPrint('ERROR: Usage: /teleport <destination>', 'error');
                terminalPrint('  /teleport town1               — Silverdale', 'warning');
                terminalPrint('  /teleport town2               — Ashen Harbor', 'warning');
                terminalPrint('  /teleport town3               — Town 3', 'warning');
                terminalPrint('  /teleport dungeon1            — Dungeon1 Floor 1 start', 'warning');
                terminalPrint('  /teleport dungeon1 f2         — Dungeon1 Floor 2 start', 'warning');
                terminalPrint('  /teleport dungeon1 f3         — Dungeon1 Floor 3 start', 'warning');
                terminalPrint('  /teleport dungeon1 f1 R57     — Dungeon1 Floor 1 Room R57', 'warning');
                terminalPrint('  /teleport <zone>              — Any explore zone key', 'warning');
                return;
            }

            const dest = args[0].toLowerCase();

            // ── Town teleport ──────────────────────────────────────────────
            if (dest === 'town1' || dest === 'town2' || dest === 'town3') {
                // Clear any dungeon/combat state
                gameState.dungeon = null;
                gameState.combatState = null;
                if (gameState.combatTimer) { clearInterval(gameState.combatTimer); gameState.combatTimer = null; }
                document.body.classList.remove("terminal-mode");
                document.getElementById('actionBar').innerHTML = '';
                gameState._terminalOpen = false;
                gameState._currentExploreArea = null;
                gameState.currentTown = dest;
                saveGame();
                showTown(dest);
                const tname = (typeof TOWNS !== 'undefined' && TOWNS[dest]) ? TOWNS[dest].name : dest;
                terminalPrint(`SUCCESS: Teleported to ${tname}`, 'success');
                return;
            }

            // ── Dungeon teleport: /teleport dungeon1 [fN] [RoomId] ────────
            // Match dungeon key case-insensitively
            const dungeonKey = (() => {
                if (typeof DUNGEONS === 'undefined') return null;
                for (const k in DUNGEONS) {
                    if (k.toLowerCase() === dest) return k;
                }
                return null;
            })();

            if (dungeonKey) {
                if (typeof DUNGEONS === 'undefined' || !DUNGEONS[dungeonKey]) {
                    terminalPrint(`ERROR: Dungeon "${dungeonKey}" not loaded`, 'error');
                    return;
                }
                const dungeonData = DUNGEONS[dungeonKey];

                // Parse floor: second arg like "f2" or "2"
                let targetFloor = 1;
                if (args[1]) {
                    const floorStr = args[1].replace(/^f/i, '');
                    const parsed = parseInt(floorStr);
                    if (!isNaN(parsed) && dungeonData.floors[parsed]) {
                        targetFloor = parsed;
                    } else {
                        terminalPrint(`ERROR: Floor "${args[1]}" not found in ${dungeonKey}`, 'error');
                        terminalPrint(`Available floors: ${Object.keys(dungeonData.floors).map(f=>'F'+f).join(', ')}`, 'warning');
                        return;
                    }
                }

                const floorData = dungeonData.floors[targetFloor];

                // Parse room: third arg like "R57"
                let targetRoom = floorData.startRoom;
                if (args[2]) {
                    const roomId = args[2].toUpperCase();
                    if (floorData.rooms[roomId]) {
                        targetRoom = roomId;
                    } else {
                        // Try lowercase
                        const found = Object.keys(floorData.rooms).find(k => k.toUpperCase() === roomId);
                        if (found) {
                            targetRoom = found;
                        } else {
                            terminalPrint(`ERROR: Room "${args[2]}" not found on Floor ${targetFloor}`, 'error');
                            const roomList = Object.keys(floorData.rooms).join(', ');
                            terminalPrint(`Floor ${targetFloor} rooms: ${roomList}`, 'warning');
                            return;
                        }
                    }
                }

                // ── Actually teleport into dungeon ────────────────────────
                // Clear any current dungeon/combat/explore state
                gameState.combatState = null;
                if (gameState.combatTimer) { clearInterval(gameState.combatTimer); gameState.combatTimer = null; }
                gameState._terminalOpen = false;
                gameState._currentExploreArea = null;

                // Mark room as discovered
                const destRoom = floorData.rooms[targetRoom];
                destRoom.flags = destRoom.flags || {};
                destRoom.flags.discovered = true;

                // Load persistent map and add target room
                const persistentMap = loadDungeonMap(gameState.player, dungeonKey, targetFloor);
                const scopedTargetRoom = `${targetFloor}:${targetRoom}`;
                persistentMap.add(scopedTargetRoom);
                saveRoomDiscovery(gameState.player, dungeonKey, targetFloor, targetRoom);

                gameState.dungeon = {
                    dungeonKey,
                    floor:          targetFloor,
                    currentRoom:    targetRoom,
                    discoveredRooms: persistentMap, // Load from persistent map
                    activeEnemies: []
                };

                // Show terminal
                /* mainScreen hidden by terminal-mode CSS class */
                openTerminalView(dungeonKey);
                startMpRegen(false);
                startResting(false);

                termAppend('', 'term-separator');
                termAppend(`🔮 <span style="color:#AA88FF;">[SYSOP TELEPORT]</span> Floor ${targetFloor} — ${targetRoom}`, 'term-highlight');
                termAppend(`<strong>${destRoom.name || targetRoom}</strong>`);
                termAppend(destRoom.description || '', 'term-dim');
                const exitList = buildExitList(destRoom);
                termAppend(`You see exits: ${exitList}.`, 'term-dim');
                checkTownExit(destRoom);

                saveGame();
                renderDungeonActionBar();

                terminalPrint(`SUCCESS: Teleported to ${dungeonKey} Floor ${targetFloor} Room ${targetRoom}`, 'success');
                return;
            }

            // ── Exploration zone teleport ─────────────────────────────────
            if (typeof LOCATIONS !== 'undefined' && LOCATIONS[dest]) {
                gameState.dungeon = null;
                gameState.combatState = null;
                if (gameState.combatTimer) { clearInterval(gameState.combatTimer); gameState.combatTimer = null; }
                gameState.currentLocation = dest;
                gameState._terminalOpen = false;
                exploreLocation(dest);
                terminalPrint(`SUCCESS: Teleported to ${LOCATIONS[dest].name}`, 'success');
                return;
            }

            // ── Nothing matched ───────────────────────────────────────────
            terminalPrint(`ERROR: Unknown destination "${dest}"`, 'error');
            terminalPrint('Valid towns: town1, town2', 'warning');
            if (typeof DUNGEONS !== 'undefined') {
                terminalPrint('Valid dungeons: ' + Object.keys(DUNGEONS).map(k=>k.toLowerCase()).join(', '), 'warning');
            }
            if (typeof LOCATIONS !== 'undefined') {
                terminalPrint('Valid zones: ' + Object.keys(LOCATIONS).filter(k=>k!=='town').join(', '), 'warning');
            }
        }

        function handleKillMonster() {
            if (!gameState.combatState) {
                terminalPrint('ERROR: Not in combat', 'error');
                return;
            }

            gameState.combatState.enemy.hp = 0;
            terminalPrint('SUCCESS: Enemy eliminated', 'success');
            checkCombatEnd();
        }

        function handleRevealMap(args) {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }
            
            if (typeof DUNGEONS === 'undefined') {
                terminalPrint('ERROR: DUNGEONS not loaded', 'error');
                return;
            }
            
            const p = gameState.player;
            let targetDungeons = [];
            
            // If dungeon specified, reveal only that one
            if (args && args.length > 0) {
                const dungeonKey = args[0];
                // Match case-insensitively
                const matched = Object.keys(DUNGEONS).find(k => k.toLowerCase() === dungeonKey.toLowerCase());
                if (!matched) {
                    terminalPrint(`ERROR: Dungeon "${dungeonKey}" not found`, 'error');
                    terminalPrint(`Available dungeons: ${Object.keys(DUNGEONS).join(', ')}`, 'warning');
                    return;
                }
                targetDungeons = [matched];
            } else {
                // No arg = reveal ALL dungeons
                targetDungeons = Object.keys(DUNGEONS);
            }
            
            let totalRooms = 0;
            let totalFloors = 0;
            
            targetDungeons.forEach(dungeonKey => {
                const dungeon = DUNGEONS[dungeonKey];
                
                Object.keys(dungeon.floors).forEach(floorNum => {
                    const floor = dungeon.floors[floorNum];
                    totalFloors++;
                    
                    // Reveal all rooms on this floor
                    Object.keys(floor.rooms).forEach(roomId => {
                        const room = floor.rooms[roomId];
                        if (room.map) { // Only rooms with map coordinates
                            saveRoomDiscovery(p, dungeonKey, parseInt(floorNum), roomId);
                            totalRooms++;
                        }
                    });
                });
            });
            
            // If currently in a dungeon, reload the persistent map for active floor
            if (gameState.dungeon) {
                const ds = gameState.dungeon;
                ds.discoveredRooms = loadDungeonMap(p, ds.dungeonKey, ds.floor);
            }
            
            saveGame();
            
            terminalPrint('═══════════════════════════════════════', 'success');
            terminalPrint('  MAP REVEAL COMPLETE', 'success');
            terminalPrint(`  Dungeons: ${targetDungeons.join(', ')}`, 'success');
            terminalPrint(`  Floors revealed: ${totalFloors}`, 'success');
            terminalPrint(`  Rooms revealed: ${totalRooms}`, 'success');
            terminalPrint('  Open dungeon map to see all rooms', 'success');
            terminalPrint('═══════════════════════════════════════', 'success');
        }

        // ─────────────────────────────────────────────────────────────────
        // /unlockmaster [area|all]
        // Marks class masters as defeated and unlocks the zones they guard.
        // Usage:
        //   /unlockmaster all        — unlock every master for this class
        //   /unlockmaster forest     — unlock the master tied to "forest"
        //   /unlockmaster plains     — unlock the master tied to "plains"
        //   (etc. for cave, crypt, volcano, riverside)
        // ─────────────────────────────────────────────────────────────────
        function handleUnlockMaster(args) {
            if (!gameState.player) {
                terminalPrint('ERROR: No active player character', 'error');
                return;
            }
            if (typeof CLASS_MASTERS === 'undefined') {
                terminalPrint('ERROR: CLASS_MASTERS not loaded', 'error');
                return;
            }

            const p = gameState.player;
            const playerClass = p.baseClass || p.class;
            const target = args[0] ? args[0].toLowerCase() : 'all';

            let unlocked = 0;

            Object.keys(CLASS_MASTERS).forEach(masterKey => {
                // Only this class's masters
                if (!masterKey.startsWith(playerClass + '_master_')) return;

                // Filter by specific area if requested
                if (target !== 'all') {
                    if (!masterKey.endsWith('_' + target)) return;
                }

                const master = CLASS_MASTERS[masterKey];

                if (p.defeatedMasters.includes(masterKey)) {
                    terminalPrint(`  (already defeated: ${master.name})`, 'info');
                    return;
                }

                p.defeatedMasters.push(masterKey);
                terminalPrint(`✓ Defeated master: ${master.name}`, 'success');
                unlocked++;

                // Unlock the zone this master guards
                if (master.unlocks && typeof LOCATIONS !== 'undefined' && LOCATIONS[master.unlocks]) {
                    if (!p.unlockedAreas.includes(master.unlocks)) {
                        p.unlockedAreas.push(master.unlocks);
                        terminalPrint(`✓ Unlocked zone: ${LOCATIONS[master.unlocks].name}`, 'success');
                    } else {
                        terminalPrint(`  (zone already unlocked: ${LOCATIONS[master.unlocks].name})`, 'info');
                    }
                }
            });

            if (unlocked === 0 && target !== 'all') {
                terminalPrint(`ERROR: No undefeated master found for area "${target}" and class "${playerClass}"`, 'error');
                terminalPrint(`Valid areas: forest, riverside, plains, cave, crypt, volcano`, 'warning');
                return;
            }

            saveGame();
            terminalPrint('═══════════════════════════════════════', 'success');
            terminalPrint(`  ${unlocked} master(s) unlocked. Re-open Explore to see zones.`, 'success');
            terminalPrint('═══════════════════════════════════════', 'success');
        }

        function listMonsters() { _routeList('monsters'); }
        function listWeapons()  { _routeList('weapons');  }
        function listArmor()    { _routeList('armor');    }
        function listItems()    { _routeList('items');    }

        function _sysoShowListPanel(type) {
            // Ensure the sysop overlay is open and rendered
            if (!document.getElementById('sysopOverlay')?.classList.contains('open')) {
                openSysopOverlay();
            }
            // sysoSub may not exist yet if overlay just opened — give it a tick
            let sub = document.getElementById('sysoSub');
            if (!sub) {
                setTimeout(() => _sysoShowListPanel(type), 80);
                return;
            }

            const configs = {
                weapons:  { title: '⚔️ WEAPONS',  icon: '⚔️', db: () => WEAPONS, filter: k => !WEAPONS[k].unarmed && !WEAPONS[k].isDropped,
                            meta: (k,v) => `Lv${v.level||'?'} | DMG:${v.baseDamage||v.damage||'?'}`, desc: (k,v) => v.description||'' },
                armor:    { title: '🛡️ ARMOR',    icon: '🛡️', db: () => ARMOR,   filter: k => !ARMOR[k].unarmored && !ARMOR[k].isDropped,
                            meta: (k,v) => `Lv${v.level||'?'} | DEF:${v.baseDefense||v.defense||'?'}`, desc: (k,v) => v.description||'' },
                items:    { title: '🎒 ITEMS',    icon: '🎒', db: () => (typeof ITEMS!=='undefined'?ITEMS:{}), filter: ()=>true,
                            meta: (k,v) => v.type||'', desc: (k,v) => v.description||'' },
                monsters: { title: '👹 MONSTERS', icon: '👹', db: () => ENEMIES,  filter: ()=>true,
                            meta: (k,v) => `Lv${v.level||'?'} | HP:${v.baseHp||v.hp||'?'}`, desc: (k,v) => v.description||'' },
            };
            const cfg = configs[type];
            if (!cfg) return;

            const db = cfg.db();
            const allKeys = Object.keys(db).filter(cfg.filter);

            const renderRows = (filter) => {
                const q = filter.toLowerCase();
                const matches = allKeys.filter(k => {
                    if (!q) return true;
                    const v = db[k];
                    return k.toLowerCase().includes(q) || (v.name||'').toLowerCase().includes(q) || (v.description||'').toLowerCase().includes(q);
                });
                const countEl = document.getElementById('sysoListCount');
                if (countEl) countEl.textContent = `${matches.length} / ${allKeys.length} entries`;
                const body = document.getElementById('sysoListBody');
                if (!body) return;
                if (matches.length === 0) {
                    body.innerHTML = `<div style="color:#5a8a5a;font-family:'VT323',monospace;padding:10px;">No matches for "${filter}"</div>`;
                    return;
                }
                body.innerHTML = matches.map(k => {
                    const v = db[k];
                    const name = v.name || k;
                    const meta = cfg.meta(k, v);
                    const desc = cfg.desc(k, v);
                    // Clicking a list row copies the key into the give panel or fills the search
                    const clickable = (type !== 'monsters')
                        ? `onclick="document.getElementById('sysoListSearch').value='${k}';document.getElementById('sysoListSearch').dispatchEvent(new Event('input'));"`
                        : '';
                    return `<div class="syo-list-row" ${clickable}>
                        <div class="syo-list-key">${k}</div>
                        <div class="syo-list-name">${name}${desc ? `<br><span style="color:#3a6a3a;font-size:13px;">${desc}</span>` : ''}</div>
                        <div class="syo-list-meta">${meta}</div>
                    </div>`;
                }).join('');
            };

            sub.innerHTML = `
            <div class="syo-list-panel">
                <div style="padding:8px 8px 0;display:flex;justify-content:space-between;align-items:center;">
                    <span style="color:#ff8c00;font-family:'VT323',monospace;font-size:18px;">${cfg.title}</span>
                    <span class="syo-list-count" id="sysoListCount">${allKeys.length} entries</span>
                </div>
                <div class="syo-list-search">
                    <input id="sysoListSearch" placeholder="🔍 Filter by name, key, or description..." autocorrect="off" spellcheck="false"
                        oninput="sysoFilterList(this.value)"
                </div>
                <div class="syo-list-body" id="sysoListBody"></div>
            </div>`;

            // Store db and cfg on window for the inline oninput handler
            window._sysoListDb = db;
            window._sysoListCfg = cfg;

            renderRows('');
            sub.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => document.getElementById('sysoListSearch')?.focus(), 100);
        }

        function openAddMonsterForm() {
            const modal = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');
            
            content.innerHTML = `
                <div class="location-header">ADD NEW MONSTER</div>
                <div style="margin: 20px 0;">
                    <label style="color: var(--highlight-color);">Monster ID (lowercase, underscores):</label>
                    <input type="text" id="monsterId" placeholder="fire_dragon">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Display Name:</label>
                    <input type="text" id="monsterName" placeholder="Fire Dragon">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">HP:</label>
                    <input type="number" id="monsterHp" value="100">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Damage:</label>
                    <input type="number" id="monsterDamage" value="20">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Defense:</label>
                    <input type="number" id="monsterDefense" value="10">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">XP Reward:</label>
                    <input type="number" id="monsterXp" value="100">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Gold Reward:</label>
                    <input type="number" id="monsterGold" value="80">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Level:</label>
                    <input type="number" id="monsterLevel" value="5">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Description:</label>
                    <input type="text" id="monsterDesc" placeholder="A fearsome creature">
                </div>
                <button onclick="submitAddMonster()">ADD MONSTER</button>
                <button onclick="closeModal()">CANCEL</button>
            `;
            
            modal.classList.add('active');
        }

        function submitAddMonster() {
            const id = document.getElementById('monsterId').value.trim().toLowerCase();
            const name = document.getElementById('monsterName').value.trim();
            const hp = parseInt(document.getElementById('monsterHp').value);
            const damage = parseInt(document.getElementById('monsterDamage').value);
            const defense = parseInt(document.getElementById('monsterDefense').value);
            const xp = parseInt(document.getElementById('monsterXp').value);
            const gold = parseInt(document.getElementById('monsterGold').value);
            const level = parseInt(document.getElementById('monsterLevel').value);
            const description = document.getElementById('monsterDesc').value.trim();

            if (!id || !name) {
                alert('ID and Name are required!');
                return;
            }

            ENEMIES[id] = {
                name: name,
                hp: hp,
                damage: damage,
                defense: defense,
                xp: xp,
                gold: gold,
                level: level,
                description: description
            };

            closeModal();
            terminalPrint(`SUCCESS: Added monster '${name}' with ID '${id}'`, 'success');
            terminalPrint('Remember to add it to a location\'s encounter list!', 'warning');
        }

        function openAddWeaponForm() {
            const modal = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');
            
            content.innerHTML = `
                <div class="location-header">ADD NEW WEAPON</div>
                <div style="margin: 20px 0;">
                    <label style="color: var(--highlight-color);">Weapon ID:</label>
                    <input type="text" id="weaponId" placeholder="flame_sword">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Display Name:</label>
                    <input type="text" id="weaponName" placeholder="Flame Sword">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Damage:</label>
                    <input type="number" id="weaponDamage" value="30">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Magic Damage:</label>
                    <input type="number" id="weaponMagic" value="10">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Cost:</label>
                    <input type="number" id="weaponCost" value="200">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Level Requirement:</label>
                    <input type="number" id="weaponLevel" value="5">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Description:</label>
                    <input type="text" id="weaponDesc" placeholder="A blazing weapon">
                </div>
                <button onclick="submitAddWeapon()">ADD WEAPON</button>
                <button onclick="closeModal()">CANCEL</button>
            `;
            
            modal.classList.add('active');
        }

        function submitAddWeapon() {
            const id = document.getElementById('weaponId').value.trim().toLowerCase();
            const name = document.getElementById('weaponName').value.trim();
            const damage = parseInt(document.getElementById('weaponDamage').value);
            const magicDamage = parseInt(document.getElementById('weaponMagic').value);
            const cost = parseInt(document.getElementById('weaponCost').value);
            const level = parseInt(document.getElementById('weaponLevel').value);
            const description = document.getElementById('weaponDesc').value.trim();

            if (!id || !name) {
                alert('ID and Name are required!');
                return;
            }

            WEAPONS[id] = {
                name: name,
                damage: damage,
                magicDamage: magicDamage,
                cost: cost,
                level: level,
                description: description
            };

            closeModal();
            terminalPrint(`SUCCESS: Added weapon '${name}' with ID '${id}'`, 'success');
        }

        function openAddArmorForm() {
            const modal = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');
            
            content.innerHTML = `
                <div class="location-header">ADD NEW ARMOR</div>
                <div style="margin: 20px 0;">
                    <label style="color: var(--highlight-color);">Armor ID:</label>
                    <input type="text" id="armorId" placeholder="dragon_mail">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Display Name:</label>
                    <input type="text" id="armorName" placeholder="Dragon Mail">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Defense:</label>
                    <input type="number" id="armorDefense" value="25">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Magic Bonus:</label>
                    <input type="number" id="armorMagic" value="0">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Cost:</label>
                    <input type="number" id="armorCost" value="300">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Level Requirement:</label>
                    <input type="number" id="armorLevel" value="6">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Description:</label>
                    <input type="text" id="armorDesc" placeholder="Strong protective armor">
                </div>
                <button onclick="submitAddArmor()">ADD ARMOR</button>
                <button onclick="closeModal()">CANCEL</button>
            `;
            
            modal.classList.add('active');
        }

        function submitAddArmor() {
            const id = document.getElementById('armorId').value.trim().toLowerCase();
            const name = document.getElementById('armorName').value.trim();
            const defense = parseInt(document.getElementById('armorDefense').value);
            const magicBonus = parseInt(document.getElementById('armorMagic').value);
            const cost = parseInt(document.getElementById('armorCost').value);
            const level = parseInt(document.getElementById('armorLevel').value);
            const description = document.getElementById('armorDesc').value.trim();

            if (!id || !name) {
                alert('ID and Name are required!');
                return;
            }

            ARMOR[id] = {
                name: name,
                defense: defense,
                magicBonus: magicBonus,
                cost: cost,
                level: level,
                description: description
            };

            closeModal();
            terminalPrint(`SUCCESS: Added armor '${name}' with ID '${id}'`, 'success');
        }

        function openAddItemForm() {
            const modal = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');
            
            content.innerHTML = `
                <div class="location-header">ADD NEW ITEM</div>
                <div style="margin: 20px 0;">
                    <label style="color: var(--highlight-color);">Item ID:</label>
                    <input type="text" id="itemId" placeholder="super_potion">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Display Name:</label>
                    <input type="text" id="itemName" placeholder="Super Potion">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Type:</label>
                    <select id="itemType" style="width: 100%; background: var(--secondary-bg); color: var(--text-color); border: 2px solid var(--border-color); padding: 10px; font-family: 'VT323', monospace; font-size: 18px;">
                        <option value="consumable">Consumable</option>
                        <option value="quest">Quest</option>
                        <option value="permanent">Permanent</option>
                        <option value="utility">Utility</option>
                        <option value="passive">Passive</option>
                    </select>
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Subtype:</label>
                    <input type="text" id="itemSubtype" placeholder="heal_hp">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Power:</label>
                    <input type="number" id="itemPower" value="50">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Cost:</label>
                    <input type="number" id="itemCost" value="30">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Level:</label>
                    <input type="number" id="itemLevel" value="1">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">Description:</label>
                    <input type="text" id="itemDesc" placeholder="Restores HP">
                    
                    <label style="color: var(--highlight-color); margin-top: 10px; display: block;">
                        <input type="checkbox" id="itemStackable" checked> Stackable
                    </label>
                </div>
                <button onclick="submitAddItem()">ADD ITEM</button>
                <button onclick="closeModal()">CANCEL</button>
            `;
            
            modal.classList.add('active');
        }

        function submitAddItem() {
            const id = document.getElementById('itemId').value.trim().toLowerCase();
            const name = document.getElementById('itemName').value.trim();
            const type = document.getElementById('itemType').value;
            const subtype = document.getElementById('itemSubtype').value.trim();
            const power = parseInt(document.getElementById('itemPower').value);
            const cost = parseInt(document.getElementById('itemCost').value);
            const level = parseInt(document.getElementById('itemLevel').value);
            const description = document.getElementById('itemDesc').value.trim();
            const stackable = document.getElementById('itemStackable').checked;

            if (!id || !name) {
                alert('ID and Name are required!');
                return;
            }

            ITEMS[id] = {
                name: name,
                type: type,
                subtype: subtype,
                power: power,
                cost: cost,
                level: level,
                description: description,
                stackable: stackable
            };

            closeModal();
            terminalPrint(`SUCCESS: Added item '${name}' with ID '${id}'`, 'success');
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
        }

        function handleExport(args) {
            const type = args[0]?.toLowerCase();
            let data;
            let filename;

            switch(type) {
                case 'monsters':
                    data = JSON.stringify(ENEMIES, null, 2);
                    filename = 'monsters.json';
                    break;
                case 'weapons':
                    data = JSON.stringify(WEAPONS, null, 2);
                    filename = 'weapons.json';
                    break;
                case 'armor':
                    data = JSON.stringify(ARMOR, null, 2);
                    filename = 'armor.json';
                    break;
                case 'items':
                    data = JSON.stringify(ITEMS, null, 2);
                    filename = 'items.json';
                    break;
                default:
                    terminalPrint('ERROR: Usage: /export <monsters/weapons/armor/items>', 'error');
                    return;
            }

            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);

            terminalPrint(`SUCCESS: Exported ${type} to ${filename}`, 'success');
        }

        // ═══════════════════════════════════════════════════════════════
        // CLASS-SPECIFIC XP TABLES (Levels 1-25)
        // ═══════════════════════════════════════════════════════════════
        // ── XP TABLES (levels 1-25) ────────────────────────────────────────
        // Calibrated against actual monster XP output per zone:
        //   Zone1 (Lv1-2 mobs, ~22 xp avg) → Lv1-3: ~50-80 kills each
        //   Zone2 unlocks Lv4 (~62 xp avg) → Lv4-5: ~80 kills each
        //   Zone3 unlocks Lv6 (~105 xp avg) → Lv6-9: ~80-85 kills each
        //   Zone4 unlocks Lv10 (~211 xp avg) → Lv10-15: ~85 kills each
        //   Zone5 unlocks Lv13, Zone6 Lv16, Zone7 Lv19, Zone8 Lv22
        // Lv1→2 and Lv2→3 kept at original values (already fair).
        // Lv3 onward: cut to match real kill counts (old table was 8-10x too high).

        // Base table (warrior/paladin/archer/hunter — standard speed)
        const _BASE_XP = [
              0,    1125,    3240,    5000,    9960,
          15720,   24120,   33400,   45320,   57985,
          75920,   98275,  123350,  153100,  187100,
         226520,  290150,  355940,  466190,  561950,
         699700,  817500,  975200, 1160100, 1370300
        ];

        // Class XP multipliers (higher = needs more XP per level = slower)
        // Applied to every threshold from Lv3 onward (Lv1-2 stay identical)
        const _XP_MULT = {
            warrior:  1.00,
            paladin:  1.00,
            archer:   1.00,
            hunter:   1.00,
            ranger:   1.00,
            rogue:    0.93,   // rogues level slightly faster
            acolyte:  1.08,   // casters slightly slower (AOE advantage)
            necrolyte:1.08,
            druid:    1.08,
            sorceror: 1.08,
            mage:     1.05,
            cleric:   1.00,
            warlock:  1.05,
            runesmith:1.02,
        };

        function _buildXpTable(cls) {
            const mult = _XP_MULT[cls] || 1.00;
            return _BASE_XP.map((v, i) => {
                if (i <= 2) return v;          // Lv1-3 thresholds unchanged
                return Math.round(v * mult);
            });
        }

        const XP_TABLES = {
            warrior:   _buildXpTable('warrior'),
            paladin:   _buildXpTable('paladin'),
            archer:    _buildXpTable('archer'),
            hunter:    _buildXpTable('hunter'),
            ranger:    _buildXpTable('ranger'),
            rogue:     _buildXpTable('rogue'),
            acolyte:   _buildXpTable('acolyte'),
            necrolyte: _buildXpTable('necrolyte'),
            druid:     _buildXpTable('druid'),
            sorceror:  _buildXpTable('sorceror'),
            mage:      _buildXpTable('mage'),
            cleric:    _buildXpTable('cleric'),
            warlock:   _buildXpTable('warlock'),
            runesmith: _buildXpTable('runesmith'),
        };
        
        function getXpForLevel(playerClass, level) {
            const table = XP_TABLES[playerClass] || XP_TABLES.warrior;
            if (level < 1) return 0;
            if (level > 25) return table[24]; // Max at level 25
            return table[level - 1];
        }
        
        function getXpToNextLevel(playerClass, currentLevel) {
            if (currentLevel >= 25) return 999999999; // Max level
            return getXpForLevel(playerClass, currentLevel + 1);
        }

        // ═══════════════════════════════════════════════════════════════
        // END XP TABLES
        // ═══════════════════════════════════════════════════════════════
        window.submitAddMonster = submitAddMonster;
        window.submitAddWeapon = submitAddWeapon;
        window.submitAddArmor = submitAddArmor;
        window.submitAddItem = submitAddItem;
        window.closeModal = closeModal;

        // ═══════════════════════════════════════════════════════════════
        // END SYSOP TERMINAL SYSTEM
