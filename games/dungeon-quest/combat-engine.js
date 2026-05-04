// ═══════════════════════════════════════════════════════════════
// COMBAT ENGINE — timer, damage, enemy/player actions, end combat, loot
// Extracted from index.html
// Dependencies: gameState, termAppend, updateHud, saveGame (runtime globals)
// Load after: dungeon-nav.js, shop-helpers.js, gem-system.js
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// MELEE ENCHANT SYSTEM — Data + Helpers
// ═══════════════════════════════════════════════════════════════
const MELEE_CLASSES = ['warrior','rogue','paladin','archer','hunter','runesmith'];

const MELEE_ENCHANTS = {
    warrior: {
        key: 'bloodrage', name: 'Bloodrage', icon: '🩸',
        description: 'Each hit restores HP equal to a % of damage dealt.',
        tiers: [
            { level: 5,  swings: 4, healPct: 0.12, mpCost: 1.0, label: 'Your blade drinks deep.' },
            { level: 10, swings: 5, healPct: 0.16, mpCost: 1.0, label: 'The hunger grows.' },
            { level: 15, swings: 6, healPct: 0.20, mpCost: 1.0, label: 'You become the wound.' },
            { level: 20, swings: 7, healPct: 0.25, mpCost: 1.0, label: 'Unstoppable bloodlust.' },
            { level: 25, swings: 8, healPct: 0.30, mpCost: 1.0, label: 'Death feeds you.' },
        ]
    },
    rogue: {
        key: 'expose_weakness', name: 'Expose Weakness', icon: '🗡️',
        description: 'Each strike strips enemy armor permanently for this fight.',
        tiers: [
            { level: 5,  swings: 4, defStrip: 3, mpCost: 1.0, label: 'Find the gap.' },
            { level: 10, swings: 5, defStrip: 4, mpCost: 1.0, label: 'Widen it.' },
            { level: 15, swings: 5, defStrip: 5, mpCost: 1.0, label: 'They have no defense.' },
            { level: 20, swings: 6, defStrip: 6, mpCost: 1.0, label: 'Naked before your blade.' },
            { level: 25, swings: 6, defStrip: 8, mpCost: 1.0, label: 'Armor is an illusion.' },
        ]
    },
    paladin: {
        key: 'consecrated_ground', name: 'Consecrated Ground', icon: '🔥',
        description: 'Holy fire erupts beneath all enemies. Burns until mana runs out.',
        tiers: [
            { level: 5,  aoePct: 0.50, tickDmg: 4,  mpPerTick: 10, pipCost: 1, label: 'The light burns.' },
            { level: 10, aoePct: 0.55, tickDmg: 8,  mpPerTick: 10, pipCost: 1, label: 'Righteous flame.' },
            { level: 15, aoePct: 0.60, tickDmg: 14, mpPerTick: 10, pipCost: 1, label: 'Holy inferno.' },
            { level: 20, aoePct: 0.65, tickDmg: 22, mpPerTick: 10, pipCost: 1, label: 'Divine judgment.' },
            { level: 25, aoePct: 0.70, tickDmg: 32, mpPerTick: 10, pipCost: 1, label: 'Wrath of the divine.' },
        ]
    },
    archer: {
        key: 'death_mark', name: 'Death Mark', icon: '🎯',
        description: 'Mark a target. They take bonus damage. All others take splash.',
        tiers: [
            { level: 5,  primaryBonus: 1.25, splashPct: 0.40, mpCostPct: 0.25, label: 'Marked. Hunted.' },
            { level: 10, primaryBonus: 1.30, splashPct: 0.45, mpCostPct: 0.25, label: 'No escape.' },
            { level: 15, primaryBonus: 1.35, splashPct: 0.50, mpCostPct: 0.25, label: 'Dead already.' },
            { level: 20, primaryBonus: 1.40, splashPct: 0.50, mpCostPct: 0.25, label: 'The Deadeye sees all.' },
            { level: 25, primaryBonus: 1.50, splashPct: 0.50, mpCostPct: 0.25, label: 'One arrow. All fall.' },
        ]
    },
    hunter: {
        key: 'savage_bite', name: 'Savage Bite', icon: '🐾',
        description: 'Command your pet to bite — stacking bleed on the target.',
        tiers: [
            { level: 5,  tickDmg: 3,  mpCost: 15, label: 'The pack draws blood.' },
            { level: 10, tickDmg: 6,  mpCost: 15, label: 'Fangs find the vein.' },
            { level: 15, tickDmg: 12, mpCost: 15, label: 'The beast is ravenous.' },
            { level: 20, tickDmg: 20, mpCost: 15, label: 'Shredded to the bone.' },
            { level: 25, tickDmg: 30, mpCost: 15, label: 'They will not stop bleeding.' },
        ]
    },
    runesmith: {
        key: 'mjolnirs_wrath', name: "Mjolnir's Wrath", icon: '⚡',
        description: 'Channel lightning through your hammer, bouncing between all enemies.',
        tiers: [
            { level: 5,  wisMult: 1.2, mpPerBounce: 8, bounceMs: 1500, pipCost: 1, label: 'The runes awaken.' },
            { level: 10, wisMult: 1.4, mpPerBounce: 8, bounceMs: 1400, pipCost: 1, label: 'Thunder obeys you.' },
            { level: 15, wisMult: 1.6, mpPerBounce: 7, bounceMs: 1300, pipCost: 1, label: 'The sky is your forge.' },
            { level: 20, wisMult: 1.8, mpPerBounce: 7, bounceMs: 1200, pipCost: 1, label: 'Storm incarnate.' },
            { level: 25, wisMult: 2.0, mpPerBounce: 6, bounceMs: 1000, pipCost: 1, label: 'You ARE the lightning.' },
        ]
    }
};

const SCATTER_SHOT_TIERS = [
    { level: 5,  arrowPct: 0.60, minHits: 1, maxHits: 3 },
    { level: 10, arrowPct: 0.65, minHits: 1, maxHits: 3 },
    { level: 15, arrowPct: 0.70, minHits: 1, maxHits: 4 },
    { level: 20, arrowPct: 0.75, minHits: 1, maxHits: 4 },
    { level: 25, arrowPct: 0.80, minHits: 1, maxHits: 5 },
];

function getEnchantTier(classKey) {
    const p = gameState.player;
    if (!p || !p.enchant || !p.enchant.tier || p.enchant.tier < 1) return null;
    const def = MELEE_ENCHANTS[classKey];
    if (!def) return null;
    return def.tiers[Math.min(p.enchant.tier - 1, def.tiers.length - 1)];
}

function getScatterShotTier(playerLevel) {
    let tier = SCATTER_SHOT_TIERS[0];
    for (const t of SCATTER_SHOT_TIERS) {
        if (playerLevel >= t.level) tier = t;
    }
    return tier;
}

function startCombatTimer() {
    if (gameState.combatTimer) clearInterval(gameState.combatTimer);

    gameState.combatTimer = setInterval(() => {
        const cs = gameState.combatState;

        // No combat state at all → stop timer
        if (!cs) {
            clearInterval(gameState.combatTimer);
            gameState.combatTimer = null;
            return;
        }

        // ─────────────────────────────────────────
        // PIP RECOVERY (always runs)
        // ─────────────────────────────────────────
        let anyRestored = false;
        const pipCooldown = gameState.player ? getPipCooldown(gameState.player) : BASE_PIP_COOLDOWN;

        for (let i = 0; i < cs.pipTimers.length; i++) {
            if (!cs.pipAvailable[i] && cs.pipTimers[i] > 0) {
                cs.pipTimers[i]--;
                if (cs.pipTimers[i] <= 0) {
                    cs.pipAvailable[i] = true;
                    cs.pipTimers[i] = pipCooldown;
                    anyRestored = true;
                }
            }
        }

        if (anyRestored) {
            renderActionBar();
        }
        updatePipButtons();

 // ─────────────────────────────────────────
        // DECREMENT ENEMY TIMERS (per enemy)
        // ─────────────────────────────────────────
        if (cs.monsters && !cs.combatOver) {
            for (let i = 0; i < cs.monsters.length; i++) {
                const enemy = cs.monsters[i];
                if (enemy.timer !== undefined && enemy.timer > 0) {
                    enemy.timer--;
                }
            }
        }


        // ─────────────────────────────────────────
        // TELEGRAPH ENEMY ATTACKS (3 seconds before)
        // ─────────────────────────────────────────
        if (cs.monsters && !cs.combatOver) {
            for (let i = 0; i < cs.monsters.length; i++) {
                const enemy = cs.monsters[i];
                // Check if enemy will attack in 3 seconds (timer === 3)
                if (enemy.timer === 3 && !enemy._telegraphShown) {
                    const intent = selectEnemyIntent(enemy);
                    enemy._pendingIntent = intent;
                    enemy._telegraphShown = true;
                    termAppend(
                        `<span style="color:${enemy.rarityColor};">${enemy.name}</span> ${intent.telegraph}`,
                        'term-dim'
                    );
                }
            }
        }

        
        // ── GEM REGEN ──
        const _p = gameState.player;
        const _w = _p && _p.weapon ? WEAPONS[_p.weapon] : null;
        if (_p && _w && _w.gems && !cs.combatOver) {
            let totalHpRegen = 0, totalMpRegen = 0;
            for (const _g of _w.gems) {
                if (!_g || !_g.stats) continue;
                totalHpRegen += _g.stats.hpRegen || 0;
                totalMpRegen += _g.stats.mpRegen || 0;
            }
            if (totalHpRegen > 0 && _p.hp < _p.maxHp) {
                _p.hp = Math.min(_p.maxHp, _p.hp + totalHpRegen);
                updateHud();
            }
            if (totalMpRegen > 0 && _p.mp < _p.maxMp) {
                _p.mp = Math.min(_p.maxMp, _p.mp + totalMpRegen);
                updateHud();
            }
        }

        // ── ARMOR MODIFIER: HP Regen from Regenerating (every 10 seconds) ──
        const hpRegenBonus = getArmorModifierBonus('hpRegen');
        if (hpRegenBonus > 0 && _p.hp < _p.maxHp && !cs.combatOver) {
            if (!cs.lastHpRegenTime) cs.lastHpRegenTime = Date.now();
            const now = Date.now();
            if (now - cs.lastHpRegenTime >= 10000) {
                const regenAmount = Math.min(hpRegenBonus, _p.maxHp - _p.hp);
                if (regenAmount > 0) {
                    _p.hp += regenAmount;
                    updateHud();
                    termAppend(`💚 [Armor: Regenerating] +${regenAmount} HP`, 'term-loot');
                    cs.lastHpRegenTime = now;
                }
            }
        }

        // ── ARMOR MODIFIER: MP Regen from Resonant (every 10 seconds) ──
        const mpRegenBonus = getArmorModifierBonus('mpRegen');
        if (mpRegenBonus > 0 && _p.mp < _p.maxMp && !cs.combatOver) {
            if (!cs.lastMpRegenTime) cs.lastMpRegenTime = Date.now();
            const now2 = Date.now();
            if (now2 - cs.lastMpRegenTime >= 10000) {
                const regenAmount = Math.min(mpRegenBonus, _p.maxMp - _p.mp);
                if (regenAmount > 0) {
                    _p.mp += regenAmount;
                    updateHud();
                    termAppend(`✨ [Armor: Resonant] +${regenAmount} MP`, 'term-loot');
                    cs.lastMpRegenTime = now2;
                }
            }
        }

        // ─────────────────────────────────────────
        // POST-COMBAT RECOVERY CLEANUP
        // ─────────────────────────────────────────
        if (cs.combatOver) {
            if (cs.pipAvailable.every(p => p)) {
                gameState.postCombatRecovery = false;
                gameState.combatState = null;
                renderActionBar();
                clearInterval(gameState.combatTimer);
                gameState.combatTimer = null;
            }
            return;
        }

        // ─────────────────────────────────────────
        // CHECK IF ANY ENEMY IS READY TO ATTACK
        // ─────────────────────────────────────────
        let anyEnemyReady = false;
        if (cs.monsters) {
            for (let i = 0; i < cs.monsters.length; i++) {
                const enemy = cs.monsters[i];
                if (enemy.timer !== undefined && enemy.timer <= 0) {
                    anyEnemyReady = true;
                    break;
                }
            }
        }

        if (anyEnemyReady) {
            clearInterval(gameState.combatTimer);
            gameState.combatTimer = null;
            enemyAttackSingle();
        }

    }, 1000);
}

 // ═══════════════════════════════════════════════════════════════
// PLAYER ACTIONS
// ═══════════════════════════════════════════════════════════════

// ── RUNESTONE ROOM EVENT ─────────────────────────────────────────
// Called every time a room is entered. If the room has contents.runestone
// and the player doesn't already have it, award it with a dramatic flash.
function checkRunestone(room) {
    if (!room || !room.contents || !room.contents.runestone) return;
    const p = gameState.player;
    if (!p) return;

    const rsId = room.contents.runestone;
    if (!p.runestones) p.runestones = [];
    if (p.runestones.includes(rsId)) return;  // already have it — no repeat

    // Mark as obtained
    p.runestones.push(rsId);
    if (!p.achievements) p.achievements = [];
    p.achievements.push({ id: rsId, name: rsId.replace('_', ' '), earned: Date.now() });

    // Get registry data for color and name
    const rs = (typeof RUNESTONES !== 'undefined' && RUNESTONES[rsId]) ? RUNESTONES[rsId] : null;
    const rsName  = rs ? rs.name  : rsId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const rsColor = rs ? rs.color : '#FFFFFF';
    const rsDesc  = rs ? rs.description : 'A mysterious runestone.';

    // ── Dramatic flash cutscene ───────────────────────────────────
    termAppend('', 'term-separator');
    termAppend(
        `<span style="color:#FFFFFF;font-weight:bold;font-size:18px;letter-spacing:2px;">⚡ A FLASH OF BLINDING LIGHT! ⚡</span>`,
        'term-highlight'
    );
    termAppend(
        `<span style="color:${rsColor};font-weight:bold;">You now have the ${rsName} inscribed upon your forehead!</span>`,
        'term-loot'
    );
    termAppend(
        `<span style="color:#aaa;font-style:italic;">${rsDesc}</span>`,
        'term-dim'
    );
    termAppend('', 'term-separator');

    // Flash overlay on the screen
    const flash = document.createElement('div');
    flash.style.cssText = [
        'position:fixed', 'inset:0', 'background:#FFFFFF', 'opacity:0.9',
        'z-index:99999', 'pointer-events:none',
        'transition:opacity 0.6s ease-out'
    ].join(';');
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                flash.remove();
                // After flash — show colored pip banner
                const banner = document.createElement('div');
                banner.style.cssText = [
                    `position:fixed`, `top:60px`, `left:50%`,
                    `transform:translateX(-50%)`,
                    `background:#0a0a0a`,
                    `border:2px solid ${rsColor}`,
                    `padding:12px 28px`,
                    `color:${rsColor}`,
                    `font-family:'VT323',monospace`,
                    `font-size:20px`,
                    `z-index:9999`,
                    `text-align:center`,
                    `letter-spacing:1px`
                ].join(';');
                banner.innerHTML = `<span style="font-size:22px;">✦</span> ${rsName} <span style="font-size:22px;">✦</span><br><span style="font-size:14px;color:#ccc;">Inscribed upon your forehead</span>`;
                document.body.appendChild(banner);
                setTimeout(() => banner.remove(), 4000);
            }, 650);
        });
    });

    // Update HUD immediately so the pip appears
    updateHud();
    saveGame();
}

function checkRoomEncounter(room) {
    const ds = gameState.dungeon;
    if (!ds) return;
    if (!ds.activeEnemies) ds.activeEnemies = [];

    // ── NEW FORMAT: contents.enemies[] from dungeon editor ────────────
    // Each entry: { key: 'giant_scorpion', drop: 'copper_key', rarity: 'epic' }
    // rarity is optional — omit or leave blank for base/common stats (no random roll in dungeons).
    // Only spawn once per room per dungeon session.
    if (room.contents && Array.isArray(room.contents.enemies) && room.contents.enemies.length > 0) {
        if (!ds.spawnedRooms) ds.spawnedRooms = new Set();
        if (ds.spawnedRooms.has(ds.currentRoom)) return;
        ds.spawnedRooms.add(ds.currentRoom);

        room.contents.enemies.forEach(entry => {
            const monsterId = typeof entry === 'string' ? entry : entry.key;
            const drop      = typeof entry === 'string' ? null  : (entry.drop || null);
            // Default to 'common' so dungeons never get a random rarity roll
            const rarity    = (typeof entry === 'object' && entry.rarity && RARITY_CONFIG?.[entry.rarity])
                              ? entry.rarity : 'common';
            const enemyDef  = ENEMIES[monsterId];
            if (!enemyDef) { console.warn('Dungeon enemy not found:', monsterId); return; }

            const inst = {
                id: crypto.randomUUID(),
                monsterId,
                rarity,
                name:          enemyDef.name,
                currentRoom:   ds.currentRoom,
                orignialRoom: ds.currentRoom,
                leash:         enemyDef.isBoss ? 6 : 3,
                roomsFollowed: 0,
                drop
            };
            ds.activeEnemies.push(inst);
            termAppend(`\u26a0\ufe0f <strong>${inst.name}</strong> steps out of the shadows!`, 'term-warning');
        });
        return;
    }

    // ── OLD FORMAT: room.encounter.monsterId ──────────────────────────
    if (!room || !room.encounter) return;
    if (room.encounter.resolved) return;

    const enemyDef = ENEMIES[room.encounter.monsterId];
    if (!enemyDef) { console.warn('Enemy not found:', room.encounter.monsterId); return; }

    const enemyInstance = {
        id: crypto.randomUUID(),
        monsterId:     room.encounter.monsterId,
        name:          enemyDef.name,
        currentRoom:   ds.currentRoom,
        origninalRoom: ds.currentRoom,
        leash:         enemyDef.isBoss ? 6 : 3,
        roomsFollowed: 0,
        drop:          room.encounter.drop || null
    };

    ds.activeEnemies.push(enemyInstance);
    room.encounter.resolved = true;

    termAppend(`\u26a0\ufe0f <strong>${enemyInstance.name}</strong> steps out of the shadows!`, 'term-warning');
}


function checkDungeonRespawns() {
    const ds = gameState.dungeon;
    if (!ds || !ds.defeatedEnemies || ds.defeatedEnemies.length === 0) return;
    
    const now = Date.now();
    const respawned = [];
    
    // Check each defeated enemy for respawn time
    ds.defeatedEnemies = ds.defeatedEnemies.filter(deadEnemy => {
        if (now >= deadEnemy.respawnTime) {
            // Respawn this enemy - restore to original room with full HP
            const respawnedEnemy = {
                id: deadEnemy.id,
                monsterId: deadEnemy.monsterId,
                name: deadEnemy.name,
                currentRoom: deadEnemy.currentRoom, // Original spawn room
                leash: deadEnemy.leash,
                roomsFollowed: 0,
                drop: deadEnemy.drop,
                isChasing: false, // Reset chase state
                // Reset HP if it was stored (for wounded enemies)
                hp: undefined,
                maxHp: undefined
            };
            
            ds.activeEnemies.push(respawnedEnemy);
            respawned.push(respawnedEnemy);
            
            // Remove from defeated list (filter returns false)
            return false;
        }
        // Keep in defeated list (filter returns true)
        return true;
    });
    
    // Log respawns
    if (respawned.length > 0) {
        console.log(`♻️ ${respawned.length} dungeon enemy(s) respawned after 30 minutes`);
        
        // Only show message if player is in same room as a respawned enemy
        respawned.forEach(enemy => {
            if (enemy.currentRoom === ds.currentRoom) {
                termAppend(`♻️ <strong>${enemy.name}</strong> has respawned in this room!`, 'term-warning');
            }
        });
    }
}


function updateDungeonEnemies() {
    const ds = gameState.dungeon;
    if (!ds || !ds.activeEnemies) return [];

    const dungeon = DUNGEONS[ds.dungeonKey];
    const floor = dungeon.floors[ds.floor];
    const arrived = []; // enemies that just moved into player's room

    ds.activeEnemies.forEach(enemy => {
        const enemyRoom = floor.rooms[enemy.currentRoom];
        if (!enemyRoom) return;

        // Start chase when player enters enemy's room for the first time
        if (!enemy.isChasing && enemy.currentRoom === ds.currentRoom) {
            enemy.isChasing = true;
            enemy.roomsFollowed = 0;
        }

        // Not chasing → do nothing
        if (!enemy.isChasing) return;

        // Already in player's room → nothing to move
        if (enemy.currentRoom === ds.currentRoom) return;

        // Leash exhausted → stop chasing and return to original room
        if (enemy.roomsFollowed >= enemy.leash) {
            enemy.isChasing = false;
            enemy.roomsFollowed = 0;
            
            // Return to original spawn room
            const originalRoom = enemy.originalRoom || enemy.currentRoom;
            enemy.currentRoom = originalRoom;
            
            termAppend(`🛑 <strong>${enemy.name}</strong> stops chasing and returns to its lair.`, 'term-dim');
            
            // Remove from combat if they were fighting
            if (gameState.combatState) {
                gameState.combatState.monsters = gameState.combatState.monsters.filter(m => m.name !== enemy.name);
                if (gameState.combatState.monsters.length === 0) {
                    gameState.combatState = null;
                    if (gameState.combatTimer) {
                        clearInterval(gameState.combatTimer);
                        gameState.combatTimer = null;
                    }
                    renderDungeonActionBar();
                }
            }
            return;
        }

        // Follow player — find which exit leads toward player's room
        const exits = enemyRoom.exits || {};
        for (const dir in exits) {
            if (exits[dir] === ds.currentRoom) {
                enemy.currentRoom = ds.currentRoom;
                enemy.roomsFollowed++;

                const fromDir = OPPOSITE_DIR[dir] || dir;
                termAppend(
                    `⚠️ <strong>${enemy.name}</strong> enters from the <em>${fromDir}</em>.`,
                    'term-warning'
                );
                arrived.push(enemy);
                return;
            }
        }
    });

    return arrived; // caller decides what to do with arrivals
}




function moveInDungeon(direction) {
    // Check if player has full pips (required for movement)
    const cs = gameState.combatState;
    if (cs && cs.pipAvailable) {
        const hasFullPips = cs.pipAvailable.every(x => x);
        if (!hasFullPips) {
            const available = cs.pipAvailable.filter(x => x).length;
            const total = cs.pipAvailable.length;
            termAppend(`⚡ You're too exhausted to move! (${available}/${total} pips restored)`, 'term-error');
            return;
        }
    }

    if (!gameState.dungeon) {
        console.warn('Not in a dungeon');
        return;
    }

    const ds = gameState.dungeon;
    const dungeonData = DUNGEONS[ds.dungeonKey];

    // ═══════════════════════════════════════════════════════════════
    // LADDER MOVEMENT — "up" or "down"
    // ═══════════════════════════════════════════════════════════════
    if (direction === 'up' || direction === 'down') {
        const currentFloor = dungeonData.floors[ds.floor];
        const currentRoom = currentFloor.rooms[ds.currentRoom];

        if (!currentRoom.contents || !currentRoom.contents.ladder) {
            termAppend(`There is no ladder here.`, 'term-dim');
            return;
        }
        const ladder = currentRoom.contents.ladder;
        if (ladder.direction !== direction) {
            termAppend(`The ladder only goes ${ladder.direction}.`, 'term-dim');
            return;
        }

        const targetFloor = ladder.leadsTo.floor;
        const targetRoom  = ladder.leadsTo.room;

        if (!dungeonData.floors[targetFloor] || !dungeonData.floors[targetFloor].rooms[targetRoom]) {
            termAppend(`⚠️ Ladder leads nowhere (floor ${targetFloor} / ${targetRoom} not found).`, 'term-error');
            return;
        }

        // ── Transition ───────────────────────────────────────────
        ds.floor      = targetFloor;
        ds.currentRoom = targetRoom;
        
        // Load persistent map for the new floor and merge with current session
        const persistentMap = loadDungeonMap(gameState.player, ds.dungeonKey, targetFloor);
        const scopedKey = `${targetFloor}:${targetRoom}`;
        persistentMap.add(scopedKey);
        saveRoomDiscovery(gameState.player, ds.dungeonKey, targetFloor, targetRoom);
        
        ds.discoveredRooms = persistentMap;

        const destFloorData = dungeonData.floors[targetFloor];
        const destRoom = destFloorData.rooms[targetRoom];
        destRoom.flags = destRoom.flags || {};
        destRoom.flags.discovered = true;

        termAppend('', 'term-separator');
        termAppend(`🪜 You ${direction === 'up' ? 'climb up' : 'descend'} the ladder to <strong>Floor ${targetFloor}</strong>.`, 'term-highlight');
        termAppend(`<strong>${destRoom.name || targetRoom}</strong>`);
        termAppend(destRoom.description || '', 'term-dim');

        const exitList = buildExitList(destRoom);
        termAppend(`You see exits: ${exitList}.`, 'term-dim');

        checkDungeonRespawns();
        checkTownExit(destRoom);
        triggerRoomTrap(destRoom);
        checkRunestone(destRoom);
        
        // 📦 Auto-pickup loot from ground - FIXED FOR STAFF PIECES
        if (destRoom.contents && destRoom.contents.lootTable && destRoom.contents.lootTable.length > 0) {
            const loot = destRoom.contents.lootTable;
            loot.forEach(item => {
                const isStaffPiece = item.key && item.key.startsWith('staff_piece_');
                let alreadyHas = false;
                
                if (isStaffPiece) {
                    const staffNumber = ITEMS[item.key]?.staffPieceNumber;
                    alreadyHas = gameState.player.inventory.some(invItem => {
                        if (typeof invItem === 'object' && invItem !== null) {
                            return invItem.staffPieceNumber === staffNumber;
                        }
                        return invItem === item.key;
                    });
                } else {
                    alreadyHas = gameState.player.inventory.includes(item.key);
                }
                
                if (!alreadyHas) {
                    if (isStaffPiece) {
                        gameState.player.inventory.push(ITEMS[item.key]);
                        termAppend(`✨ You found <span style="color:#a855f7;">${item.label || ITEMS[item.key]?.name}</span> on the ground!`, 'term-loot');
                    } else {
                        gameState.player.inventory.push(item.key);
                        termAppend(`✨ You found <span style="color:#a855f7;">${item.label || item.key}</span> on the ground!`, 'term-loot');
                    }
                } else if (isStaffPiece) {
                    termAppend(`⚠️ You already have ${ITEMS[item.key]?.name}. You cannot carry another.`, 'term-warning');
                }
            });
            delete destRoom.contents.lootTable;
        }
        
        checkRoomEncounter(destRoom);
        checkEnemiesInRoom(targetRoom);
        
        const enemiesHere = ds.activeEnemies.filter(e => e.currentRoom === targetRoom);
        if (enemiesHere.length > 0 && !gameState.combatState) {
            if (enemiesHere.length === 1) {
                termAppend(`⚠️ <strong>${enemiesHere[0].name}</strong> is already in this room, waiting for you!`, 'term-warning');
            } else {
                const names = enemiesHere.map(e => e.name).join(', ');
                termAppend(`⚠️ ${names} are already in this room, waiting for you!`, 'term-warning');
            }
        }
        
        // 🌀 TELEPORT TRIGGER (ladder version)
        if (destRoom.contents && destRoom.contents.staffTrigger && 
            destRoom.contents.staffTrigger.enabled) {
            
            const tpTrigger = destRoom.contents.staffTrigger;
            const triggerType = tpTrigger.triggerType;
            let shouldTeleport = false;
            
            if (triggerType === 'enter_room') {
                shouldTeleport = true;
            } else if (triggerType === 'staff_pieces') {
                // Count staff pieces (supports both string AND object storage)
                const staffCount = (gameState.player.inventory || []).filter(i => {
                    if (!i) return false;
                    if (typeof i === 'string') return i.startsWith('staff_piece_');
                    if (typeof i === 'object') return i.subtype === 'staff_piece';
                    return false;
                }).length;
                
                if (staffCount >= 8) {
                    shouldTeleport = true;
                    termAppend(`🪄 The staff pieces resonate with the ancient gate!`, 'term-highlight');
                    
                    // Remove ALL staff pieces (both string and object versions)
                    gameState.player.inventory = gameState.player.inventory.filter(i => {
                        if (!i) return true;
                        if (typeof i === 'string') return !i.startsWith('staff_piece_');
                        if (typeof i === 'object') return i.subtype !== 'staff_piece';
                        return true;
                    });
                    termAppend(`🪄 The staff pieces dissolve into the gate, consumed by the teleportation!`, 'term-warning');
                } else {
                    termAppend(`🪄 The gate requires all 8 staff pieces to activate. (${staffCount}/8 collected)`, 'term-dim');
                }
            }
            
            if (shouldTeleport) {
                const tpTargetFloor = tpTrigger.targetFloor;
                const tpTargetRoom = tpTrigger.targetRoom;
                
                const tpFlash = document.createElement('div');
                tpFlash.style.cssText = 'position:fixed;inset:0;z-index:99999;background:white;opacity:0;pointer-events:none;transition:opacity 0.2s;';
                document.body.appendChild(tpFlash);
                setTimeout(() => tpFlash.style.opacity = '1', 10);
                setTimeout(() => {
                    tpFlash.style.opacity = '0';
                    setTimeout(() => tpFlash.remove(), 500);
                }, 300);
                
                if (gameState.combatState) {
                    gameState.combatState = null;
                    if (gameState.combatTimer) {
                        clearInterval(gameState.combatTimer);
                        gameState.combatTimer = null;
                    }
                    termAppend(`🌀 The teleportation breaks the enemy's pursuit!`, 'term-highlight');
                }
                
                if (ds.activeEnemies) {
                    ds.activeEnemies.forEach(enemy => {
                        enemy.isChasing = false;
                        enemy.roomsFollowed = 0;
                    });
                }
                
                ds.floor = tpTargetFloor;
                ds.currentRoom = tpTargetRoom;
                
                const tpScopedKey = `${tpTargetFloor}:${tpTargetRoom}`;
                ds.discoveredRooms.add(tpScopedKey);
                saveRoomDiscovery(gameState.player, ds.dungeonKey, tpTargetFloor, tpTargetRoom);
                
                const tpNewFloorData = dungeonData.floors[tpTargetFloor];
                const tpNewRoom = tpNewFloorData.rooms[tpTargetRoom];
                tpNewRoom.flags = tpNewRoom.flags || {};
                tpNewRoom.flags.discovered = true;
                
                termClear();
                termAppend('', 'term-separator');
                termAppend(`<span style="color:#a855f7;">🌀 A magical force pulls you through space! 🌀</span>`, 'term-highlight');
                termAppend(`<strong>${tpNewRoom.name || tpTargetRoom}</strong>`);
                termAppend(tpNewRoom.description || '', 'term-dim');
                const tpExitList = buildExitList(tpNewRoom);
                termAppend(`You see exits: ${tpExitList}.`, 'term-dim');
                
                if (ds.activeEnemies) {
                    const enemiesInNewRoom = ds.activeEnemies.filter(e => e.currentRoom === tpTargetRoom);
                    if (enemiesInNewRoom.length > 0 && !gameState.combatState) {
                        startDungeonCombat(enemiesInNewRoom);
                    }
                }
                
                saveGame();
                renderDungeonActionBar();
                return;
            }
        }        
        saveGame();
        renderDungeonActionBar();
        return;
    }
    
    // ═══════════════════════════════════════════════════════════════
    // NORMAL DIRECTION MOVEMENT
    // ═══════════════════════════════════════════════════════════════
    const floor = dungeonData.floors[ds.floor];
    const currentRoom = floor.rooms[ds.currentRoom];

    const nextRoomId = currentRoom.exits[direction];
    if (!nextRoomId) {
        termAppend(`You cannot go that way.`, 'term-dim');
        return;
    }

    // ── DOOR LOCK CHECK ──────────────────────────────────────────────
    const door = currentRoom.contents?.doors?.[direction];
    if (door && door.locked) {
        const keyItem = door.type + '_key';
        const inv = gameState.player.inventory || [];
        const hasKey = inv.includes(keyItem);

        if (!hasKey) {
            const COLOR_NAMES = {
                bronze:'Bronze', copper:'Copper', iron:'Iron', brass:'Brass',
                silver:'Silver', electrum:'Electrum', ruby:'Ruby', topaz:'Topaz',
                diamond:'Diamond', obsidian:'Obsidian', bone:'Bone'
            };
            const doorName = (COLOR_NAMES[door.type] || door.type) + ' door';
            termAppend(
                `🔒 A locked <span style="color:${getDoorColor(door.type)}">${doorName}</span> blocks your path. You need a ${COLOR_NAMES[door.type] || door.type} key.`,
                'term-warning'
            );
            return;
        }

        const COLOR_NAMES2 = {
            bronze:'Bronze', copper:'Copper', iron:'Iron', brass:'Brass',
            silver:'Silver', electrum:'Electrum', ruby:'Ruby', topaz:'Topaz',
            diamond:'Diamond', obsidian:'Obsidian', bone:'Bone'
        };
        termAppend(
            `🔓 Your <span style="color:${getDoorColor(door.type)}">${COLOR_NAMES2[door.type] || door.type} key</span> unlocks the door.`,
            'term-highlight'
        );
        door.locked = false;
    }

    const nextRoom = floor.rooms[nextRoomId];

    ds.currentRoom = nextRoomId;
    if (!ds.discoveredRooms) ds.discoveredRooms = new Set();
    const scopedKey = `${ds.floor}:${nextRoomId}`;
    ds.discoveredRooms.add(scopedKey);
    saveRoomDiscovery(gameState.player, ds.dungeonKey, ds.floor, nextRoomId);
    nextRoom.flags = nextRoom.flags || {};
    nextRoom.flags.discovered = true;

    termAppend('', 'term-separator');
    termAppend(`<strong>${nextRoom.name || nextRoomId}</strong>`);
    termAppend(nextRoom.description || '', 'term-dim');

    checkDungeonRespawns();
    checkRoomEncounter(nextRoom);
    checkRunestone(nextRoom);
    
    // 📦 Auto-pickup loot from ground - FIXED FOR STAFF PIECES
    if (nextRoom.contents && nextRoom.contents.lootTable && nextRoom.contents.lootTable.length > 0) {
        const loot = nextRoom.contents.lootTable;
        loot.forEach(item => {
            const isStaffPiece = item.key && item.key.startsWith('staff_piece_');
            let alreadyHas = false;
            
            if (isStaffPiece) {
                const staffNumber = ITEMS[item.key]?.staffPieceNumber;
                alreadyHas = gameState.player.inventory.some(invItem => {
                    if (typeof invItem === 'object' && invItem !== null) {
                        return invItem.staffPieceNumber === staffNumber;
                    }
                    return invItem === item.key;
                });
            } else {
                alreadyHas = gameState.player.inventory.includes(item.key);
            }
            
            if (!alreadyHas) {
                if (isStaffPiece) {
                    gameState.player.inventory.push(ITEMS[item.key]);
                    termAppend(`✨ You found <span style="color:#a855f7;">${item.label || ITEMS[item.key]?.name}</span> on the ground!`, 'term-loot');
                } else {
                    gameState.player.inventory.push(item.key);
                    termAppend(`✨ You found <span style="color:#a855f7;">${item.label || item.key}</span> on the ground!`, 'term-loot');
                }
            } else if (isStaffPiece) {
                termAppend(`⚠️ You already have ${ITEMS[item.key]?.name}. You cannot carry another.`, 'term-warning');
            }
        });
        delete nextRoom.contents.lootTable;
    }
    
    const arrivals = updateDungeonEnemies();

    const enemiesHere = ds.activeEnemies.filter(e => e.currentRoom === nextRoomId);
    if (enemiesHere.length > 0 && !gameState.combatState) {
        if (enemiesHere.length === 1) {
            termAppend(`⚠️ <strong>${enemiesHere[0].name}</strong> is already in this room, waiting for you!`, 'term-warning');
        } else {
            const names = enemiesHere.map(e => e.name).join(', ');
            termAppend(`⚠️ ${names} are already in this room, waiting for you!`, 'term-warning');
        }
    }
    checkEnemiesInRoom(nextRoomId, arrivals);

    const exitList = buildExitList(nextRoom);
    termAppend(`You see exits: ${exitList}.`, 'term-dim');

    checkTownExit(nextRoom);
    triggerRoomTrap(nextRoom);

    // 🌀 TELEPORT TRIGGER (normal movement version)
    if (nextRoom.contents && nextRoom.contents.staffTrigger && 
        nextRoom.contents.staffTrigger.enabled) {
        
        const tpTrigger = nextRoom.contents.staffTrigger;
        const triggerType = tpTrigger.triggerType;
        let shouldTeleport = false;
        
        if (triggerType === 'enter_room') {
            shouldTeleport = true;
        } else if (triggerType === 'staff_pieces') {
            const staffCount = (gameState.player.inventory || []).filter(i => {
    if (!i) return false;
    if (typeof i === 'string') return i.startsWith('staff_piece_');
    if (typeof i === 'object') return i.subtype === 'staff_piece';
    return false;
}).length;
            if (staffCount >= 8) {
                shouldTeleport = true;
                termAppend(`🪄 The staff pieces resonate with the ancient gate!`, 'term-highlight');
                
                gameState.player.inventory = gameState.player.inventory.filter(i => {
    if (!i) return true;
    // Keep if NOT a staff piece
    if (typeof i === 'string') return !i.startsWith('staff_piece_');
    if (typeof i === 'object') return i.subtype !== 'staff_piece';
    return true;
});
                termAppend(`🪄 The staff pieces dissolve into the gate, consumed by the teleportation!`, 'term-warning');
            } else {
                termAppend(`🪄 The gate requires all 8 staff pieces to activate. (${staffCount}/8 collected)`, 'term-dim');
            }
        }
        
        if (shouldTeleport) {
            const tpTargetFloor = tpTrigger.targetFloor;
            const tpTargetRoom = tpTrigger.targetRoom;
            
            const tpFlash = document.createElement('div');
            tpFlash.style.cssText = 'position:fixed;inset:0;z-index:99999;background:white;opacity:0;pointer-events:none;transition:opacity 0.2s;';
            document.body.appendChild(tpFlash);
            setTimeout(() => tpFlash.style.opacity = '1', 10);
            setTimeout(() => {
                tpFlash.style.opacity = '0';
                setTimeout(() => tpFlash.remove(), 500);
            }, 300);
            
            if (gameState.combatState) {
                gameState.combatState = null;
                if (gameState.combatTimer) {
                    clearInterval(gameState.combatTimer);
                    gameState.combatTimer = null;
                }
                termAppend(`🌀 The teleportation breaks the enemy's pursuit!`, 'term-highlight');
            }
            
            if (ds.activeEnemies) {
                ds.activeEnemies.forEach(enemy => {
                    enemy.isChasing = false;
                    enemy.roomsFollowed = 0;
                });
            }
            
            ds.floor = tpTargetFloor;
            ds.currentRoom = tpTargetRoom;
            
            const tpScopedKey = `${tpTargetFloor}:${tpTargetRoom}`;
            ds.discoveredRooms.add(tpScopedKey);
            saveRoomDiscovery(gameState.player, ds.dungeonKey, tpTargetFloor, tpTargetRoom);
            
            const tpNewFloorData = dungeonData.floors[tpTargetFloor];
            const tpNewRoom = tpNewFloorData.rooms[tpTargetRoom];
            tpNewRoom.flags = tpNewRoom.flags || {};
            tpNewRoom.flags.discovered = true;
            
            termClear();
            termAppend('', 'term-separator');
            termAppend(`<span style="color:#a855f7;">🌀 A magical force pulls you through space! 🌀</span>`, 'term-highlight');
            termAppend(`<strong>${tpNewRoom.name || tpTargetRoom}</strong>`);
            termAppend(tpNewRoom.description || '', 'term-dim');
            const tpExitList = buildExitList(tpNewRoom);
            termAppend(`You see exits: ${tpExitList}.`, 'term-dim');
            
            if (ds.activeEnemies) {
                const enemiesInNewRoom = ds.activeEnemies.filter(e => e.currentRoom === tpTargetRoom);
                if (enemiesInNewRoom.length > 0 && !gameState.combatState) {
                    startDungeonCombat(enemiesInNewRoom);
                }
            }
            
            saveGame();
            renderDungeonActionBar();
            return;
        }
    }

    saveGame();
    renderDungeonActionBar();
}

// Build the exit string including ladder directions
function buildExitList(room) {
    const exits = Object.keys(room.exits || {}).map(d => d.toUpperCase());
    if (room.contents && room.contents.ladder) {
        exits.push(room.contents.ladder.direction === 'up' ? '⬆ UP' : '⬇ DOWN');
    }
    // Mark locked exits
    if (room.contents && room.contents.doors) {
        return exits.map(d => {
            const dl = d.toLowerCase();
            const door = room.contents.doors[dl];
            if (door && door.locked) {
                return `${d}<span style="color:#e8b84a">🔒</span>`;
            }
            return d;
        }).join(', ') || 'none';
    }
    return exits.length ? exits.join(', ') : 'none';
}

// Return the CSS color for a door type (matches dungeon editor palette)
function getDoorColor(type) {
    const DOOR_COLORS = {
        bronze:   '#cd7f32',
        copper:   '#b87333',
        iron:     '#a8a9ad',
        brass:    '#b5a642',
        silver:   '#c0c0c0',
        electrum: '#d4af37',
        ruby:     '#e0455b',
        topaz:    '#ffa07a',
        diamond:  '#aef0ff',
        obsidian: '#9b59b6',
        bone:     '#e8dcc8'
    };
    return DOOR_COLORS[type] || '#aaa';
}

// ═══════════════════════════════════════════════════════════════
// TRAP SYSTEM — triggers when player enters a room with a trap
// Supports both old singular (room.contents.trap) and new array
// (room.contents.traps[]) format from dungeon editor.
// ═══════════════════════════════════════════════════════════════
function triggerRoomTrap(room) {
    if (!room || !room.contents) return;
    const p = gameState.player;
    if (!p) return;

    // Build trap list — support both old (.trap) and new (.traps[]) formats
    let traps = [];
    if (room.contents.traps && Array.isArray(room.contents.traps)) {
        traps = room.contents.traps;                  // new array format
    } else if (room.contents.trap) {
        traps = [room.contents.trap];                 // old single-trap format
    }

    if (!traps.length) return;

    traps.forEach(trap => {
        if (!trap || !trap.type) return;

        // resetOnLeave = re-arm when player leaves (new format); no field = one-shot legacy
        const resetable = (trap.resetOnLeave === true);
        const dotType   = (trap.type === 'poison' || trap.type === 'acid');

        // Skip if already triggered and not resetable (one-shot spent)
        if (trap.triggered && !resetable && !dotType) return;

        const damage = trap.damage || 0;
        const name   = trap.name   || trap.type;

        switch (trap.type) {

            case 'spike':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`⚠️ <span style="color:#FF4444;">SPIKE TRAP!</span> Sharp spikes shoot from the floor — you take <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'stone':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`⚠️ <span style="color:#AA8866;">STONE TRAP!</span> A massive stone swings from the ceiling — you take <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'poison': {
                // DOT: damage spread over duration (default 10s, 5 ticks)
                const duration = trap.duration || 10;
                const ticks = 5;
                const tickInterval = Math.max(1000, (duration * 1000) / ticks);
                const tickDmg = Math.max(1, Math.ceil(damage / ticks));
                termAppend(`☠️ <span style="color:#44FF44;">POISON TRAP!</span> Toxic gas floods the room — you feel your strength seeping away!`, 'term-error');
                let t = 0;
                const timer = setInterval(() => {
                    if (!gameState.player || t >= ticks) { clearInterval(timer); return; }
                    gameState.player.hp = Math.max(1, gameState.player.hp - tickDmg);
                    termAppend(`☠️ Poison deals <strong>${tickDmg}</strong> damage... (${gameState.player.hp}/${gameState.player.maxHp} HP)`, 'term-error');
                    updateHud(); t++;
                }, tickInterval);
                break;
            }

            case 'acid': {
                // Acid: instant damage + short DOT
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`🧪 <span style="color:#a8e63d;">ACID TRAP!</span> Acid spray burns you — <strong>${damage} damage!</strong>`, 'term-error');
                const acidDuration = trap.duration || 5;
                const acidTicks = 3;
                const acidInterval = Math.max(500, (acidDuration * 1000) / acidTicks);
                const acidTickDmg = Math.max(1, Math.ceil(damage * 0.4 / acidTicks));
                let at = 0;
                const acidTimer = setInterval(() => {
                    if (!gameState.player || at >= acidTicks) { clearInterval(acidTimer); return; }
                    gameState.player.hp = Math.max(1, gameState.player.hp - acidTickDmg);
                    termAppend(`🧪 Acid burns for <strong>${acidTickDmg}</strong> more damage...`, 'term-error');
                    updateHud(); at++;
                }, acidInterval);
                if (!resetable) trap.triggered = true;
                break;
            }

            case 'fire':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`🔥 <span style="color:#FF8800;">FIRE TRAP!</span> Flames erupt from hidden vents — you take <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'lightning':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`⚡ <span style="color:#FFDD00;">LIGHTNING TRAP!</span> A bolt of lightning strikes you — <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'arrow':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`🏹 <span style="color:#CCCC44;">ARROW TRAP!</span> A crossbow bolt catches you off guard — you take <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'freeze':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`❄️ <span style="color:#88CCFF;">FREEZE TRAP!</span> A burst of ice envelops you — you take <strong>${damage} damage</strong> and feel sluggish!`, 'term-error');
                if (gameState.combatState && gameState.combatState.pipTimers) {
                    gameState.combatState.pipTimers = gameState.combatState.pipTimers.map(t => t + 8);
                }
                if (!resetable) trap.triggered = true;
                break;

            case 'pit':
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`🕳️ <span style="color:#95a5a6;">PIT TRAP!</span> The floor gives way! You fall hard — <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'alarm':
                termAppend(`🔔 <span style="color:#dfe6e9;">ALARM TRAP!</span> A deafening bell rings out — nearby monsters are alerted!`, 'term-error');
                if (!resetable) trap.triggered = true;
                break;

            case 'web':
                termAppend(`🕸️ <span style="color:#b2bec3;">WEB TRAP!</span> Sticky strands bind your limbs — you're slowed for 2 rounds!`, 'term-error');
                // Disable movement pip for 2 recovery cycles
                if (gameState.combatState && gameState.combatState.pipTimers) {
                    gameState.combatState.pipTimers = gameState.combatState.pipTimers.map(t => t + 5);
                }
                if (!resetable) trap.triggered = true;
                break;

            case 'curse':
                termAppend(`🌀 <span style="color:#a855f7;">CURSE TRAP!</span> Dark energy courses through you — your stats are reduced!`, 'term-error');
                // Temporarily reduce attack by 20% for the session
                if (p.curseStacks === undefined) p.curseStacks = 0;
                p.curseStacks = Math.min(3, p.curseStacks + 1);
                if (!resetable) trap.triggered = true;
                break;

            default:
                p.hp = Math.max(1, p.hp - damage);
                termAppend(`⚠️ <span style="color:#FF4444;">TRAP!</span> A ${name} catches you — you take <strong>${damage} damage!</strong>`, 'term-error');
                if (!resetable) trap.triggered = true;
        }
    });

    updateHud();
}


function getEnemyInRoom(roomId) {
    const ds = gameState.dungeon;
    if (!ds || !ds.activeEnemies) return null;

    return ds.activeEnemies.find(enemy => enemy.currentRoom === roomId) || null;
}



function checkEnemiesInRoom(roomId, newArrivals) {
    const ds = gameState.dungeon;
    if (!ds || !ds.activeEnemies) return;

    const enemiesHere = ds.activeEnemies.filter(e => e.currentRoom === roomId);
    if (enemiesHere.length === 0) return;

    const cs = gameState.combatState;

    // ── Active non-finished combat: add ALL room enemies not yet in this fight ──
    if (cs && !cs.combatOver) {
        const linkedIds = new Set(cs.dungeonEnemyIds || (cs.dungeonEnemyId ? [cs.dungeonEnemyId] : []));

        // Join = any enemy in this room not already tracked in combat
        // (covers both followers from arrivals AND pre-existing room enemies)
        const joining = enemiesHere.filter(e => !linkedIds.has(e.id));
        if (joining.length === 0) return;

        joining.forEach(de => {
            if (!de.monsterId) return;
            const newMonster = spawnMonsterWithRarity(de.monsterId, false, de.rarity || 'common');
            newMonster.index = cs.monsters.length;
            if (de.hp !== undefined && de.hp < de.maxHp) {
                newMonster.hp    = de.hp;
                newMonster.maxHp = de.maxHp;
            }
            cs.monsters.push(newMonster);
            if (!cs.dungeonEnemyIds) cs.dungeonEnemyIds = cs.dungeonEnemyId ? [cs.dungeonEnemyId] : [];
            cs.dungeonEnemyIds.push(de.id);
            linkedIds.add(de.id);
            termAppend(`⚔️ <strong>${newMonster.name}</strong> joins the fight!`, 'term-warning');
        });

        // Ensure combat timer is running and reset actionMode so player sees all targets
        cs.actionMode = 'main';
        if (!gameState.combatTimer) startCombatTimer();
        renderDungeonActionBar();
        return;
    }

    // ── No combat or stale finished combat: clear state and start fresh ──
    if (cs) {
        if (gameState.combatTimer) { clearInterval(gameState.combatTimer); gameState.combatTimer = null; }
        gameState.combatState = null;
        gameState.postCombatRecovery = false;
    }

    if (enemiesHere.length === 1) {
        termAppend(`⚔️ <strong>${enemiesHere[0].name}</strong> confronts you!`, 'term-warning');
    } else {
        const names = enemiesHere.map(e => `<strong>${e.name}</strong>`).join(', ');
        termAppend(`⚔️ ${names} surround you!`, 'term-warning');
    }
    startDungeonCombat(enemiesHere);
}

function startDungeonCombat(dungeonEnemies) {
    // Accept either a single enemy or an array
    if (!Array.isArray(dungeonEnemies)) dungeonEnemies = [dungeonEnemies];
    if (dungeonEnemies.length === 0) return;

    // Clear any stale finished combat state
    if (gameState.combatState && gameState.combatState.combatOver) {
        gameState.combatState = null;
        gameState.postCombatRecovery = false;
    }

    const monsterIds = dungeonEnemies.map(e => e.monsterId).filter(Boolean);
    if (monsterIds.length === 0) {
        console.error('Dungeon enemies missing monsterId:', dungeonEnemies);
        return;
    }

    // Each dungeon enemy carries its rarity from the room definition (default 'common').
    // This prevents any random rarity rolls — dungeon difficulty is author-controlled.
    const forcedRarities = dungeonEnemies.map(e => e.rarity || 'common');

    // Start combat with all enemies in room (useZoneLevel=false for dungeons)
    startCombat(monsterIds, false, forcedRarities);

    if (!gameState.combatState) return;

    // Link ALL dungeon enemy IDs to combat state for post-combat cleanup
    gameState.combatState.dungeonEnemyIds = dungeonEnemies.map(e => e.id);
    // Legacy single-enemy field (keeps drops working for first enemy)
    gameState.combatState.dungeonEnemyId = dungeonEnemies[0].id;

        // Mark enemies as chasing when combat starts
    dungeonEnemies.forEach(enemy => {
        enemy.isChasing = true;
        enemy.roomsFollowed = 0;
    });

// Restore saved HP for each monster (matched by index)
        dungeonEnemies.forEach(enemy => {
        enemy.isChasing = true;
        enemy.roomsFollowed = 0;
        console.log(`👹 ${enemy.name} is now chasing you!`);
    });


    // Restore saved HP for each monster (matched by index)
    dungeonEnemies.forEach((de, idx) => {
        console.log(`Restoring HP for ${de.name}: saved HP ${de.hp}/${de.maxHp}`);
        if (de.hp !== undefined && de.hp < de.maxHp) {
            const monster = gameState.combatState.monsters[idx];
            if (monster) {
                monster.hp  = de.hp;
                monster.maxHp = de.maxHp;
            }
        }
    });

    saveGame();
}


// ─────────────────────────────────────────
// TEMP: DUNGEON TEST HARNESS (SAFE)
// ─────────────────────────────────────────

function returnToTown(townId) {
    console.log('⬅ returnToTown() called');
    // ── Dungeon keys persist in inventory — they are permanent collectibles ──

    // ── Persist defeated-enemy respawn timers so farming is prevented ──
    if (gameState.dungeon && gameState.dungeon.defeatedEnemies && gameState.dungeon.defeatedEnemies.length > 0) {
        const dKey = gameState.dungeon.dungeonKey;
        if (dKey) {
            if (!gameState.player.dungeonTimers) gameState.player.dungeonTimers = {};
            // Merge with any existing timers for this dungeon
            const existing = gameState.player.dungeonTimers[dKey] || [];
            const existingIds = new Set(existing.map(e => e.id));
            const fresh = gameState.dungeon.defeatedEnemies.filter(e => !existingIds.has(e.id));
            gameState.player.dungeonTimers[dKey] = [...existing, ...fresh];
            console.log(`💾 Preserved ${gameState.player.dungeonTimers[dKey].length} enemy timer(s) for ${dKey}`);
        }
    }

    // Clear dungeon state
    gameState.dungeon = null;
    gameState.combatState = null;
    gameState.postCombatRecovery = false;

    if (gameState.combatTimer) {
        clearInterval(gameState.combatTimer);
        gameState.combatTimer = null;
    }

    // Update current town if specified
    if (townId) gameState.currentTown = townId;

    document.body.classList.remove("terminal-mode");
    termClear();

    const ab = document.getElementById('actionBar');
    ab.innerHTML = '';

    gameState._terminalOpen = false;
    gameState._currentExploreArea = null;

    saveGame();
    showTown();
}

// ═══════════════════════════════════════════════════════════════
// CHECK TOWN EXIT FLAG IN DUNGEON ROOMS
// When a room has flags.townExit, show a portal button to that town.
// ═══════════════════════════════════════════════════════════════
function checkTownExit(room) {
    if (!room || !room.flags || !room.flags.townExit) return;
    const townId = room.flags.townExit;
    const label  = room.flags.townExitLabel || `Exit to ${townId}`;
    const firstDiscovery = room.flags.firstDiscovery;

    // Special first-discovery logic: award White Runestone
    if (firstDiscovery && townId === 'town2') {
        const p = gameState.player;
        if (!p.runestones) p.runestones = [];
        if (!p.runestones.includes('white_runestone')) {
            p.runestones.push('white_runestone');
            if (!p.achievements) p.achievements = [];
            p.achievements.push({ id: 'white_runestone', name: 'White Runestone', earned: Date.now() });

            termAppend('', 'term-separator');
            termAppend('✦ <span style="color:#FFFFFF;font-weight:bold;">WHITE RUNESTONE</span> ✦', 'term-highlight');
            termAppend('You have discovered Ashen Harbor! A pale runestone materializes in your hand.', 'term-loot');
            termAppend('The Portal network is now accessible from both towns.', 'term-dim');
            termAppend('', 'term-separator');

            // Don't trigger again
            room.flags.firstDiscovery = false;
            saveGame();
        }
    }

    // Post a clickable portal message in the terminal
    setTimeout(() => {
        termAppend(
            `<span style="color:#AA88FF;cursor:pointer;font-weight:bold;" onclick="townExitFromDungeon('${townId}')">` +
            `[ ${label} ]</span>`,
            'term-highlight'
        );
    }, 300);
}

// Called when player clicks the town exit link from a dungeon room
function townExitFromDungeon(townId) {
    const townDef = (typeof TOWNS !== 'undefined' && TOWNS[townId]) ? TOWNS[townId] : null;
    const townName = townDef ? townDef.name : townId;
    if (confirm(`Leave the dungeon and travel to ${townName}?`)) {
        returnToTown(townId);
    }
}

// ═══════════════════════════════════════════════════════════════
// LEAVE EXPLORATION TO TOWN (allowed when pips are full)
// Enemies are preserved via activeCombat save system
// ═══════════════════════════════════════════════════════════════
function leaveExploreToTown() {
    const cs = gameState.combatState;
    if (cs) {
        const allReady = cs.pipAvailable && cs.pipAvailable.every(x => x);
        if (!allReady) {
            termAppend('<span style="color:var(--error-color);">⚠ You must wait for all pips to recover before leaving!</span>');
            return;
        }
        // Enemies are preserved — activeCombat will save them
    }

    // Clear timers but NOT combatState (save will capture it)
    if (gameState.combatTimer) {
        clearInterval(gameState.combatTimer);
        gameState.combatTimer = null;
    }

    // Stop resting timers
    stopResting();

    document.body.classList.remove("terminal-mode");
    document.getElementById('actionBar').innerHTML = '';
    gameState._terminalOpen = false;
    gameState._currentExploreArea = null;

    saveGame();  // Saves activeCombat with enemies still alive
    showTown();
}

function testDungeon() {
    // Legacy redirect — use town1's dungeon
    startDungeon('Dungeon1');
}



const BASE_PIP_COOLDOWN = 10;
const MIN_PIP_COOLDOWN = 5;

// ── PIP SWEEP BUTTON ANIMATION ─────────────────────────────────────
// Called each tick to update the conic-gradient overlay on Attack/Spell btns.
// Uses total "worst" pip state: sweep = fraction of the longest cooling pip.
function updatePipButtons() {
    const cs = gameState.combatState;
    if (!cs || !cs.pipTimers) return;

    const cd     = gameState.player ? getPipCooldown(gameState.player) : BASE_PIP_COOLDOWN;
    const total  = cs.pipTimers.length;
    const ready  = cs.pipAvailable.filter(Boolean).length;
    const cooling = total - ready;

    // Fraction complete = 1 means "fully cooled" (no overlay)
    // We show the cooldown of the pip that will recover SOONEST (smallest remaining)
    let pct = 1; // default = ready (no overlay)
    if (cooling > 0) {
        // Find the minimum remaining timer among cooling pips
        let minRemaining = Infinity;
        for (let i = 0; i < total; i++) {
            if (!cs.pipAvailable[i]) {
                minRemaining = Math.min(minRemaining, cs.pipTimers[i]);
            }
        }
        // pct = fraction ALREADY elapsed (so sweep goes from full → empty as timer counts down)
        pct = 1 - (minRemaining / cd);
        pct = Math.max(0, Math.min(1, pct));
    }

    // For multi-pip, the dial wraps: each full rotation = one pip recovery
    // We rotate based on: (pips already recovered this cycle) + current pip fraction
    // Visual: dial spins continuously once per pip cooldown duration
    const revolutionsLeft = cooling;  // each remaining pip = one more sweep
    // conic-gradient percentage = fraction of current pip elapsed
    const pipPct = (pct * 100).toFixed(1) + '%';

    // Update all pip-btn elements
    document.querySelectorAll('.pip-btn').forEach(btn => {
        btn.style.setProperty('--pip-pct', pipPct);
        if (cooling > 0) {
            btn.classList.add('cooling');
            btn.classList.remove('all-ready');
            // Show pip badge if >1 pip cooling
            let badge = btn.querySelector('.pip-badge');
            if (cooling > 1) {
                if (!badge) { badge = document.createElement('span'); badge.className='pip-badge'; btn.appendChild(badge); }
                badge.textContent = cooling + '×';
            } else if (badge) {
                badge.remove();
            }
        } else {
            btn.style.setProperty('--pip-pct', '0%');
            btn.classList.remove('cooling');
            btn.classList.add('all-ready');
            const badge = btn.querySelector('.pip-badge');
            if (badge) badge.remove();
        }
    });
}

function getPipCooldown(player){
    // Base is always 10s for all classes regardless of class speed stat.
    // Only active speed_boost buff potions reduce pip recovery time.
    let cooldown = BASE_PIP_COOLDOWN;

    // Check for active speed_boost buff (from speed potions only)
    if (player.buffs) {
        const speedBuff = player.buffs.find(b => b.type === 'speed_boost');
        if (speedBuff) {
            // speedBuff.power is a percentage bonus (e.g. 25 = 25% faster)
            const reduction = Math.floor(cooldown * (speedBuff.power / 100));
            cooldown -= reduction;
        }
    }

    return Math.max(MIN_PIP_COOLDOWN, cooldown);
}




// ═══════════════════════════════════════════════════════════════════════
// MONSTER ABILITY SIDE-EFFECTS
// Called after the damage of an ability attack lands.
// Types: dot_attack, debuff, stun, heavy_hit, drain_hp, drain_mp,
//        rend, burn, intimidate, leech, dispel, summon, aoe
// ═══════════════════════════════════════════════════════════════════════
function executeAbilitySideEffect(abilityDef, p, cs, enemy) {
    const type = abilityDef.type;
    const enemyName   = (enemy && enemy.name) ? enemy.name : 'Enemy';
    const playerClass = p.className || p.class || 'adventurer';

    // ── PHASE II STUB: deduct enemy MP when the system is wired up ──
    // if (enemy && abilityDef.mpCost) {
    //     enemy.mp = Math.max(0, (enemy.mp || 0) - abilityDef.mpCost);
    // }

    // ── helper: start a DOT timer (shared by dot_attack and burn) ───
    function _startDOT(dot) {
        let ticksLeft = dot.ticks;
        const dotTimer = setInterval(() => {
            if (!gameState.combatState || p.hp <= 0) { clearInterval(dotTimer); return; }
            p.hp = Math.max(0, p.hp - dot.damage);
            updateHud();
            termAppend(`<span style="color:#ff8800;">${dot.icon || '💀'} ${dot.name}: ${dot.damage} damage!</span>`, 'term-dim');
            if (p.hp <= 0) { clearInterval(dotTimer); endCombat(false); return; }
            ticksLeft--;
            if (ticksLeft <= 0) {
                clearInterval(dotTimer);
                termAppend(`<span style="color:#888;">${dot.name} fades.</span>`, 'term-dim');
            }
        }, dot.tickInterval);
        if (!cs.dotTimers) cs.dotTimers = {};
        cs.dotTimers[`ability_${abilityDef.id}_${Date.now()}`] = dotTimer;
    }

    // ── helper: display ability message ─────────────────────────────
    function _msg(fallback) {
        const txt = abilityDef.applyMessage
            ? abilityDef.applyMessage(enemyName, playerClass)
            : fallback;
        termAppend(`<span style="color:#ff8800;">${txt}</span>`, 'term-warning');
    }

    // ════════════════════════════════════════════════════════════════
    // 1. DOT_ATTACK — physical hit followed by a damage-over-time
    // ════════════════════════════════════════════════════════════════
    if (type === 'dot_attack' && abilityDef.dot) {
        _msg(`💀 ${abilityDef.dot.name}!`);
        _startDOT(abilityDef.dot);
    }

    // ════════════════════════════════════════════════════════════════
    // 2. DEBUFF — applies a combat-math penalty to the player
    // ════════════════════════════════════════════════════════════════
    else if (type === 'debuff') {
        _msg(`💀 ${abilityDef.debuff}!`);
        const dur = abilityDef.debuffDuration || 4000;

        if (abilityDef.debuff === 'blinded') {
            cs.playerBlindedMissChance = abilityDef.hitMissChance || 0.30;
            cs.playerBlindedHits = 1;
        }
        if (abilityDef.debuff === 'constricted') {
            cs.playerConstricted = true;
            setTimeout(() => {
                if (gameState.combatState) {
                    gameState.combatState.playerConstricted = false;
                    termAppend('<span style="color:#888;">You break free from the constriction.</span>', 'term-dim');
                }
            }, dur);
        }
        if (abilityDef.debuff === 'intimidated') {
            cs.playerIntimidated = abilityDef.damagePenalty || 0.25;
            setTimeout(() => {
                if (gameState.combatState) {
                    gameState.combatState.playerIntimidated = 0;
                    termAppend('<span style="color:#888;">Your courage returns.</span>', 'term-dim');
                }
            }, dur);
        }
        if (abilityDef.debuff === 'silenced') {
            cs.playerSilenced = true;
            setTimeout(() => {
                if (gameState.combatState) {
                    gameState.combatState.playerSilenced = false;
                    termAppend('<span style="color:#888;">You can speak again.</span>', 'term-dim');
                }
            }, dur);
        }
        if (abilityDef.debuff === 'slowed') {
            cs.playerSlowed = true;
            setTimeout(() => {
                if (gameState.combatState) {
                    gameState.combatState.playerSlowed = false;
                    termAppend('<span style="color:#888;">Your movement returns to normal.</span>', 'term-dim');
                }
            }, dur);
        }
    }

    // ════════════════════════════════════════════════════════════════
    // 3. STUN — locks player pip charges
    // ════════════════════════════════════════════════════════════════
    else if (type === 'stun') {
        _msg('💀 Stunned!');
        const stunPips = abilityDef.stunPips || 1;
        const stunSecs = abilityDef.stunDuration || 5;
        let stolen = 0;
        if (cs.pipTimers) {
            for (let i = 0; i < cs.pipTimers.length && stolen < stunPips; i++) {
                cs.pipTimers[i] = Math.max(cs.pipTimers[i] || 0, stunSecs);
                cs.pipAvailable[i] = false;
                stolen++;
            }
        }
        updateHud();
        renderActionBar();
    }

    // ════════════════════════════════════════════════════════════════
    // 4. HEAVY_HIT — pure damage amplifier (damageMult handles it)
    // ════════════════════════════════════════════════════════════════
    else if (type === 'heavy_hit') {
        _msg(`💥 ${enemyName} strikes with crushing force!`);
        // damage multiplier already applied via intent.damageMult — nothing extra needed
    }

    // ════════════════════════════════════════════════════════════════
    // 5. DRAIN_HP — enemy steals HP from player and heals itself
    // ════════════════════════════════════════════════════════════════
    else if (type === 'drain_hp') {
        const drain = abilityDef.drainAmount || 15;
        const healRatio = abilityDef.healPercent !== undefined ? abilityDef.healPercent : 1.0;
        const actualDrain = Math.min(drain, p.hp - 1); // can't drain to 0 via this mechanic alone
        if (actualDrain > 0) {
            p.hp -= actualDrain;
            const healAmt = Math.floor(actualDrain * healRatio);
            if (enemy && healAmt > 0) {
                enemy.hp = Math.min(enemy.maxHp || enemy.hp, enemy.hp + healAmt);
                updateEnemyCards();
            }
            updateHud();
            _msg(`🩸 ${enemyName} drains ${actualDrain} HP from the ${playerClass}!`);
            termAppend(`<span style="color:#ff4488;">❤️ ${enemyName} heals for ${healAmt}!</span>`, 'term-dim');
        }
    }

    // ════════════════════════════════════════════════════════════════
    // 6. DRAIN_MP — enemy drains player mana
    // ════════════════════════════════════════════════════════════════
    else if (type === 'drain_mp') {
        const drain = abilityDef.drainAmount || 20;
        const actualDrain = Math.min(drain, p.mp);
        if (actualDrain > 0) {
            p.mp -= actualDrain;
            updateHud();
        }
        _msg(`💙 ${enemyName} siphons ${actualDrain} MP from the ${playerClass}!`);
    }

    // ════════════════════════════════════════════════════════════════
    // 7. REND — tears armor, temporarily reducing player defense
    // ════════════════════════════════════════════════════════════════
    else if (type === 'rend') {
        const reduction = abilityDef.defReduction || 0.25;
        const dur = abilityDef.rendDuration || 8000;
        if (!cs.playerRendReduction) cs.playerRendReduction = 0;
        cs.playerRendReduction = Math.min(0.60, cs.playerRendReduction + reduction); // cap at 60% total
        _msg(`⚔️ ${enemyName} RENDS the ${playerClass}'s armor! Defense reduced!`);
        setTimeout(() => {
            if (gameState.combatState) {
                gameState.combatState.playerRendReduction = Math.max(0,
                    (gameState.combatState.playerRendReduction || 0) - reduction);
                termAppend('<span style="color:#888;">Your armor holds together again.</span>', 'term-dim');
            }
        }, dur);
    }

    // ════════════════════════════════════════════════════════════════
    // 8. BURN — ranged fire DOT (no physical hit required)
    // ════════════════════════════════════════════════════════════════
    else if (type === 'burn' && abilityDef.dot) {
        _msg(`🔥 ${enemyName} engulfs the ${playerClass} in flames!`);
        _startDOT(abilityDef.dot);
    }

    // ════════════════════════════════════════════════════════════════
    // 9. INTIMIDATE — enemy roar/presence reduces player damage output
    // ════════════════════════════════════════════════════════════════
    else if (type === 'intimidate') {
        const penalty = abilityDef.damagePenalty || 0.25;
        const dur = abilityDef.intimidateDuration || 6000;
        cs.playerIntimidated = penalty;
        _msg(`😨 ${enemyName} lets out a terrifying roar! You hesitate...`);
        setTimeout(() => {
            if (gameState.combatState) {
                gameState.combatState.playerIntimidated = 0;
                termAppend('<span style="color:#888;">You shake off the fear.</span>', 'term-dim');
            }
        }, dur);
    }

    // ════════════════════════════════════════════════════════════════
    // 10. LEECH — physical hit heals enemy for a fraction of damage dealt
    //     (healRatio applied to the damage already dealt this hit)
    // ════════════════════════════════════════════════════════════════
    else if (type === 'leech') {
        const ratio = abilityDef.healRatio || 0.5;
        // cs.lastEnemyDamageDealt is set by enemyAttackSingle after damage lands
        const dmgDealt = cs.lastEnemyDamageDealt || 0;
        const healAmt = Math.max(1, Math.floor(dmgDealt * ratio));
        if (enemy && healAmt > 0) {
            enemy.hp = Math.min(enemy.maxHp || enemy.hp, enemy.hp + healAmt);
            updateEnemyCards();
        }
        _msg(`🩸 ${enemyName} leeches life from the ${playerClass}!`);
        if (healAmt > 0) termAppend(`<span style="color:#ff4488;">❤️ ${enemyName} heals for ${healAmt}!</span>`, 'term-dim');
    }

    // ════════════════════════════════════════════════════════════════
    // 11. DISPEL — removes player's active buff potions
    // ════════════════════════════════════════════════════════════════
    else if (type === 'dispel') {
        const slots = abilityDef.buffSlots || 1;
        const buffs = p.activeBuffs || [];
        let removed = 0;
        for (let i = buffs.length - 1; i >= 0 && removed < slots; i--) {
            const buff = buffs[i];
            if (buff && buff.name) {
                termAppend(`<span style="color:#ff8800;">✨ ${buff.name} dispelled!</span>`, 'term-warning');
                buffs.splice(i, 1);
                removed++;
            }
        }
        if (removed === 0) {
            termAppend(`<span style="color:#888;">${enemyName} attempts to dispel — nothing to cancel.</span>`, 'term-dim');
        } else {
            _msg(`✨ ${enemyName} tears your magical protections away!`);
        }
    }

    // ════════════════════════════════════════════════════════════════
    // 12. SUMMON — calls additional enemies into the fight
    // ════════════════════════════════════════════════════════════════
    else if (type === 'summon') {
        const summonKey = abilityDef.summonKey;
        const count     = abilityDef.summonCount || 1;
        const maxSummons = abilityDef.maxSummons || 2;
        if (!cs.summonCount) cs.summonCount = 0;
        if (cs.summonCount >= maxSummons) {
            if (gameState.sysop && gameState.sysop.authenticated) {
                termAppend('<span style="color:#664400;">  [SUMMON] cap reached — skipped</span>', 'term-dim');
            }
            return;
        }
        _msg(`💀 ${enemyName} calls for reinforcements!`);
        for (let s = 0; s < count && cs.summonCount < maxSummons; s++) {
            if (ENEMIES && ENEMIES[summonKey]) {
                const summoned = spawnMonsterWithRarity(summonKey, false, 'common');
                summoned.index = cs.monsters.length;
                cs.monsters.push(summoned);
                cs.monsterStatusEffects[summoned.index] = [];
                cs.summonCount++;
                termAppend(`<span style="color:#ff4400;">⚡ A ${summoned.name} joins the fight!</span>`, 'term-warning');
            }
        }
        updateEnemyCards();
        renderActionBar();
    }

    // ════════════════════════════════════════════════════════════════
    // 13. AOE — splash damage hits player regardless of dodge
    // ════════════════════════════════════════════════════════════════
    else if (type === 'aoe') {
        _msg(`💥 ${enemyName} unleashes a devastating shockwave!`);
        // damageMult on the intent already handled base damage;
        // AOE ignores dodge — handled via intent.armorPiercing + dodge suppression
        cs.playerConstricted = true; // borrow constrict flag to suppress dodge for this hit
        setTimeout(() => {
            if (gameState.combatState) gameState.combatState.playerConstricted = false;
        }, 500);
    }
}

function selectEnemyIntent(enemy) {
    // ── Default basic attack ─────────────────────────────────────────
    let intent = {
        type: 'basic',
        damageMult: 1,
        armorPiercing: 0,
        telegraph: 'prepares to strike...'
    };

    // ── Boss heavy hit ───────────────────────────────────────────────
    if (enemy.isBoss && Math.random() < 0.4) {
        intent = {
            type: 'heavy',
            damageMult: 1.75,
            armorPiercing: 0.3,
            telegraph: 'draws in power for a devastating attack!'
        };
    }

    // ── Monster ability rolls ────────────────────────────────────────
    // Each ability is checked in order. First one that passes its roll wins.
    // This creates simple AI priority: put scarier abilities first in the array.
    const _dbgAbility = gameState.sysop && gameState.sysop.authenticated;

    // Pure-debuff types replace the physical hit entirely (no damage roll)
    const PURE_DEBUFF_TYPES = ['debuff', 'drain_mp', 'rend', 'intimidate', 'dispel', 'stun', 'burn'];

    if (enemy.abilities && enemy.abilities.length > 0) {
        for (const ability of enemy.abilities) {
            // ── HP threshold check ────────────────────────────────────
            if (ability.hpThreshold !== undefined && ability.hpThreshold !== null) {
                const hpPct = enemy.hp / (enemy.maxHp || enemy.hp);
                if (hpPct < ability.hpThreshold) {
                    if (_dbgAbility) termAppend('<span style="color:#664400;">  [ABILITY] ' + ability.name
                        + ' — skipped (HP ' + Math.round(hpPct*100) + '% < threshold '
                        + Math.round(ability.hpThreshold*100) + '%)</span>', 'term-dim');
                    continue;
                }
            }
            // ── Low-HP threshold check ────────────────────────────────
            if (ability.lowHpThreshold !== undefined && ability.lowHpThreshold !== null) {
                const hpPct = enemy.hp / (enemy.maxHp || enemy.hp);
                if (hpPct > ability.lowHpThreshold) {
                    if (_dbgAbility) termAppend('<span style="color:#664400;">  [ABILITY] ' + ability.name
                        + ' — skipped (HP ' + Math.round(hpPct*100) + '% > lowHP threshold '
                        + Math.round(ability.lowHpThreshold*100) + '%)</span>', 'term-dim');
                    continue;
                }
            }

            // ── Phase II: MP check ────────────────────────────────────
            const _cost = ability.mpCost || 0;
            const _canAfford = _cost === 0 || (enemy.mp || 0) >= _cost;
            if (!_canAfford) {
                // Only show "exhausted" message once per enemy per fight
                if (_dbgAbility) {
                    const _label = enemy.mpDepleted ? '' : ' ← OUT OF MP';
                    termAppend('<span style="color:#664400;">  [ABILITY] ' + ability.name
                        + ' — NO MP (' + (enemy.mp||0) + '/' + (enemy.baseMp||0) + ' needed ' + _cost + ')' + _label
                        + '</span>', 'term-dim');
                    enemy.mpDepleted = true;  // suppress repeated messages
                }
                continue;  // skip this ability, try next (or fall through to basic attack)
            }

            // ── Roll for this ability ─────────────────────────────────
            const _abilityRoll = Math.random();
            const _abilityHit  = _abilityRoll < ability.chance;

            if (_dbgAbility) {
                const _mpTag = _cost > 0 ? ' | MP: ' + (enemy.mp||0) + '→' + ((enemy.mp||0) - _cost) : ' | free';
                const _typeTag = PURE_DEBUFF_TYPES.includes(ability.type) ? ' [DEBUFF-ONLY]' : ' [DMG×' + (ability.damageMult||1) + ']';
                termAppend('<span style="color:#664400;">  🎯 [ABILITY] ' + ability.name
                    + ': rolled ' + (_abilityRoll * 100).toFixed(2) + '% / need ≤'
                    + (ability.chance * 100).toFixed(0) + '% → '
                    + (_abilityHit ? '✅ FIRES' : '❌ miss')
                    + _typeTag + _mpTag
                    + '</span>', 'term-dim');
            }

            if (_abilityHit) {
                // Mark whether this is a pure debuff (replaces hit) or a damage ability
                const _isPureDebuff = PURE_DEBUFF_TYPES.includes(ability.type);
                intent = {
                    type:          ability.type,
                    abilityId:     ability.id,
                    abilityDef:    ability,
                    abilityMpCost: _cost,            // stored so enemyAttackSingle can deduct
                    isPureDebuff:  _isPureDebuff,    // true = skip damage roll
                    damageMult:    _isPureDebuff ? 0 : (ability.damageMult || 1.3),  // default +30%
                    armorPiercing: ability.armorPiercing || 0,
                    telegraph:     ability.telegraph,
                };
                break;
            }
        }
    }

    if (_dbgAbility) {
        const _mpStr = (enemy.baseMp||0) > 0
            ? ' | MP: ' + (enemy.mp||0) + '/' + (enemy.baseMp||0)
            : '';
        termAppend('<span style="color:#664400;">  → intent: <b>' + intent.type + '</b>'
            + (intent.abilityId ? ' [' + intent.abilityId + ']' : '')
            + (intent.isPureDebuff ? ' <b>DEBUFF-ONLY (no damage)</b>' : ' | ×dmg: ' + (intent.damageMult||1))
            + ' | pierce: ' + ((intent.armorPiercing||0)*100).toFixed(0) + '%'
            + _mpStr
            + '</span>', 'term-dim');
    }

    return intent;
}


function consumePips(cs, amount, cooldown) {
    let used = 0;

    for (let i = 0; i < cs.pipAvailable.length && used < amount; i++) {
        if (cs.pipAvailable[i]) {
            cs.pipAvailable[i] = false;
            cs.pipTimers[i] = cooldown;
            used++;
        }
    }
}




        // ═══════════════════════════════════════════════════════════════
        // DAMAGE SCALING (Rebalanced for harder early game)
        // ═══════════════════════════════════════════════════════════════
        const DAMAGE_SCALING = {
            // Monster damage multiplier — 1.0 = no bonus on top of level/rarity scaling.
            // The level-scaling and rarity system already handle enemy power progression.
            // A 1.3x bonus was pushing same-level hits to ~20 on a Rogue with 85 HP.
            monsterDamageMult: 1.0
        };

        // ═══════════════════════════════════════════════════════════════
        // ENEMY DODGE CALCULATION - Based on level difference
        // ═══════════════════════════════════════════════════════════════
        function calculateEnemyDodge(playerLevel, enemyLevel) {
            const levelDiff = enemyLevel - playerLevel;
            
            // Base dodge: 5% when levels are equal
            let dodgeChance = 0.05;
            
            if (levelDiff > 0) {
                // Enemy is higher level: +5% dodge per level difference
                dodgeChance += (levelDiff * 0.05);
            } else if (levelDiff < 0) {
                // Player is higher level: -1% dodge per level difference
                dodgeChance += (levelDiff * 0.01); // levelDiff is negative, so this subtracts
            }
            
            // Cap at 0% minimum (can't go negative)
            dodgeChance = Math.max(0, dodgeChance);
            
            // Cap at 50% maximum (so it's not impossible to hit)
            dodgeChance = Math.min(0.50, dodgeChance);
            
            return dodgeChance;
        }

        // ═══════════════════════════════════════════════════════════════
        // LEVEL-SCALING DAMAGE MODIFIER
        // Per level enemy is ABOVE player: player deals -5%, takes +5%
        // Per level enemy is BELOW player: player deals +5%, takes -5%
        // Capped at ±50%.
        // ═══════════════════════════════════════════════════════════════
        function getLevelDamageMult(playerLevel, enemyLevel) {
            const diff = (enemyLevel || 1) - (playerLevel || 1);
            const PCT  = 0.05;
            const CAP  = 0.50;
            const shift = Math.max(-CAP, Math.min(CAP, diff * PCT));
            return {
                playerDealt: Math.max(0.1, 1 - shift),  // enemy higher → player deals less
                enemyDealt:  Math.max(0.5, 1 + shift)   // enemy higher → player takes more
            };
        }
        

// Add these right before the calculateDamage function
const ARMOR_TYPE_MULTIPLIERS = {
    cloth: 0.4,   // Mages, Warlocks (very squishy)
    leather: 0.7, // Rogues, Hunters, Clerics (medium)
    chain: 1.0,   // Paladins, Warriors (good defense)
    plate: 1.3    // Warriors (maximum defense)
};

function getArmorType(armor) {
    if (!armor) return 'cloth';
    
    const name = (armor.name || '').toLowerCase();
    
    // Plate armor detection
    if (name.includes('plate') || name.includes('full_plate') || name.includes('god_plate') || 
        name.includes('genesis_plate') || name.includes('primordial_plate') || name.includes('titan_plate') ||
        name.includes('eternal_plate') || name.includes('void_plate') || name.includes('divine_plate') ||
        name.includes('darksteel_plate') || name.includes('dread_plate')) {
        return 'plate';
    }
    
    // Chain armor detection
    if (name.includes('chain') || name.includes('mail') || name.includes('hauberk') || 
        name.includes('scale_armor') || name.includes('darksteel_chain') || name.includes('runescarred_chain') ||
        name.includes('mithril_chain') || name.includes('dragonscale_chain') || name.includes('void_chain')) {
        return 'chain';
    }
    
    // Leather armor detection
    if (name.includes('leather') || name.includes('hide') || name.includes('studded') || 
        name.includes('shadow') || name.includes('phantom') || name.includes('night') || 
        name.includes('vest') || name.includes('garb') || name.includes('gear')) {
        return 'leather';
    }
    
    // Cloth armor detection (default)
    return 'cloth';
}


        function calculateDamage({
  attacker,
  defender,
  base,
  type = 'physical', // 'physical' | 'magic'
  critChance = 0,
  critMult = 2.0,
  dodgeChance = 0,
  armorPiercing = 0,
  isSpecial = false
}) {
    // Dodge check - add Windstep armor modifier bonus
  let totalDodgeChance = dodgeChance;
  const windstepBonus = getArmorModifierBonus('dodgeBonus');
  if (windstepBonus > 0) {
      totalDodgeChance += (windstepBonus / 100);
      totalDodgeChance = Math.min(0.75, totalDodgeChance); // Cap at 75%
  }
  if (Math.random() < totalDodgeChance) {
    return { damage: 0, dodged: true, crit: false };
  }

  // Base damage roll
  let damage = base;

  // Defense mitigation — percentage-based damage reduction (DR)
  // Each point of defense = 2.8% DR, hard-capped at 75%.
  // This replaces flat subtraction which let even tiny armor eat huge chunks of
  // low-roll damage while leaving high-roll damage almost untouched.
  // DR is consistent regardless of the hit size — cloth feels like cloth,
  // plate feels like plate, at every level of the game.
    // Get defender's armor info
  const defenderArmor = defender.armor ? ARMOR[defender.armor] : null;

  if (type === 'magic') {
    // Magic damage uses magic defense directly
    let rawDefense = defender.magicDefense || 0;
    const DR_PER_POINT = 0.028;
    const DR_CAP = 0.75;
    const effectiveDR = Math.min(DR_CAP, rawDefense * DR_PER_POINT) * (1 - armorPiercing);
    damage = Math.max(1, Math.floor(damage * (1 - effectiveDR)));
  } else {
    // Physical damage with armor type multiplier
    // Calculate total defense from armor, CON, and gems
    const armorDef = defenderArmor ? defenderArmor.baseDefense + (getQualityBonus(defenderArmor.quality, defenderArmor.baseDefense)) : 0;
    const conBonus = defender.con || 0;
    const gemBonus = defender._gemDefBonus || 0;
    const totalDefense = armorDef + conBonus + gemBonus;
    
    // Apply armor type multiplier (cloth = 0.4, leather = 0.7, chain = 1.0, plate = 1.3)
    const armorType = getArmorType(defenderArmor);
    const armorMult = ARMOR_TYPE_MULTIPLIERS[armorType] || 0.5;
    const effectiveDefense = totalDefense * armorMult;
    
    // Level-scaling formula: DR% = Effective DEF / (Effective DEF + 40 + (Level × 2))
    const level = defender.level || 1;
    const denominator = effectiveDefense + 40 + (level * 2);
    let damageReduction = effectiveDefense / denominator;
    
    // Apply armor piercing (reduces the effectiveness of armor)
    damageReduction = damageReduction * (1 - armorPiercing);
    
    // Cap at 75% max reduction
    damageReduction = Math.min(0.75, damageReduction);
    
    // Apply damage reduction
    damage = Math.max(1, Math.floor(damage * (1 - damageReduction)));
  }


  // Apply magic resistance if this is a magic attack
if (type === 'magic' && defender.magicResist) {
    damage = Math.floor(damage * (1 - defender.magicResist / 100));
}

  // Crit check
  let crit = false;
  if (Math.random() < critChance) {
    damage = Math.floor(damage * critMult);
    crit = true;
  }

  return { damage, dodged: false, crit };
}

        
// ═══════════════════════════════════════════════════════════════
// SPELL CHARGE MINI-GAME
// Applies to: mage, cleric, warlock
// Hold the spell button to charge. Release to cast.
// Charge % maps to a damage/heal multiplier:
//   0–30%  : 50% fizzle chance, else 0.5x
//   30–60% : 1.0x  (normal)
//   60–90% : 1.25x (empowered)
//   90–130%: 1.5x  (perfect)
//   130%+  : overcharge — spell fizzles
// Heal spells: multiplier instead maps charge % across min→max power range.
// AOE / single-target: multiplier scales final damage.
// ═══════════════════════════════════════════════════════════════
const SPELL_CHARGE_CLASSES = new Set(['mage', 'cleric', 'warlock', 'paladin']);
const SPELL_CHARGE_DURATION = 1000; // ms to reach 100%
const SPELL_OVERCHARGE_PCT  = 130;  // % at which spell fizzles

// CSS injected once for the charge fill gradient colours per spell type
(function injectSpellChargeStyles() {
    if (document.getElementById('spell-charge-styles')) return;
    const s = document.createElement('style');
    s.id = 'spell-charge-styles';
    s.textContent = `
        .spell-charge-btn { transition: border-color 0.08s, box-shadow 0.08s; }
        .spell-charge-btn.sc-holding { transform: scale(0.97); }
        .spell-charge-btn.sc-empowered { border-color: #FFAA44 !important; box-shadow: 0 0 12px rgba(255,170,68,0.55); }
        .spell-charge-btn.sc-perfect   { border-color: #FFD700 !important; box-shadow: 0 0 22px rgba(255,215,0,0.75); animation: scPulseGold 0.25s ease-in-out infinite alternate; }
        .spell-charge-btn.sc-over      { border-color: #FF4444 !important; box-shadow: 0 0 22px rgba(255,68,68,0.75);  animation: scPulseRed  0.12s ease-in-out infinite alternate; }
        @keyframes scPulseGold { from { box-shadow: 0 0 12px rgba(255,215,0,0.5); } to { box-shadow: 0 0 32px rgba(255,215,0,0.95); } }
        @keyframes scPulseRed  { from { box-shadow: 0 0 12px rgba(255,68,68,0.5);  } to { box-shadow: 0 0 32px rgba(255,68,68,0.95);  } }
        .spell-charge-fill.sc-fill-normal  { background: linear-gradient(90deg, #4422aa, #8844ff, #cc66ff); }
        .spell-charge-fill.sc-fill-empowered { background: linear-gradient(90deg, #8844ff, #ffaa44, #ffd700); }
        .spell-charge-fill.sc-fill-perfect { background: linear-gradient(90deg, #ffd700, #ffffff, #ffd700); }
        .spell-charge-fill.sc-fill-over    { background: linear-gradient(90deg, #ff4444, #ff8888); }
        .spell-charge-fill.sc-fill-heal    { background: linear-gradient(90deg, #22aa55, #44ff88, #aaffcc); }
    `;
    document.head.appendChild(s);
})();

function getSpellChargeResult(chargePct) {
    if (chargePct >= SPELL_OVERCHARGE_PCT) return { mult: 0,    tier: 'over'     };
    if (chargePct >= 90)                   return { mult: 1.5,  tier: 'perfect'  };
    if (chargePct >= 60)                   return { mult: 1.25, tier: 'empowered'};
    if (chargePct >= 30)                   return { mult: 1.0,  tier: 'normal'   };
    // Under 30%: 50% fizzle
    if (Math.random() < 0.5)              return { mult: 0,    tier: 'fizzle'   };
    return                                        { mult: 0.5,  tier: 'weak'     };
}

function spellChannelMessage(spellKey, tier, chargePct) {
    const spellData = (typeof ensureSpellExists === 'function' && ensureSpellExists(spellKey))
                   || (typeof SPELLS !== 'undefined' && SPELLS[spellKey]);
    const spellName = spellData ? spellData.name : spellKey;
    const pct       = Math.min(Math.floor(chargePct), 130);

    switch (tier) {
        case 'perfect':
            return `<span style="color:#FF44FF;">✨ <em>${spellName}</em> channeled to full power! (${pct}%)</span>`;
        case 'empowered':
            return `<span style="color:#FFD700;">🌟 <em>${spellName}</em> empowered — surging with energy! (${pct}%)</span>`;
        case 'normal':
            return `<span style="color:#88FF88;">⚡ <em>${spellName}</em> channeled — steady focus. (${pct}%)</span>`;
        case 'weak':
            return `<span style="color:#FF8866;">⚠️ <em>${spellName}</em> barely channeled — weak discharge. (${pct}%)</span>`;
        case 'fizzle':
            return `<span style="color:#FF4444;">💨 <em>${spellName}</em> fizzles before taking form...</span>`;
        case 'over':
            return `<span style="color:#FF4444;">💥 <em>${spellName}</em> overchanneled — spell collapses!</span>`;
        default:
            return `<span style="color:#88FF88;">⚡ <em>${spellName}</em> channeled. (${pct}%)</span>`;
    }
}

function setupSpellCharging(button) {
    const p  = gameState.player;
    const cls = p.baseClass || p.class;
    if (!SPELL_CHARGE_CLASSES.has(cls)) {
        // Non-caster class: fall back to simple click
        button.addEventListener('click', () => selectSpell(button.dataset.spellKey));
        return;
    }

    const spellKey  = button.dataset.spellKey;
    const fillEl    = button.querySelector('.spell-charge-fill');
    const spellData = (typeof ensureSpellExists === 'function' && ensureSpellExists(spellKey)) || (typeof SPELLS !== 'undefined' && SPELLS[spellKey]);
    const isHeal    = spellData && spellData.type === 'heal';

    let rafId      = null;
    let startTime  = null;
    let startMs    = null;
    let holding    = false;
    let didRelease = false;

    function setFillClass(tier) {
        fillEl.className = 'spell-charge-fill';
        if (isHeal) { fillEl.classList.add('sc-fill-heal'); return; }
        if (tier === 'empowered') fillEl.classList.add('sc-fill-empowered');
        else if (tier === 'perfect' || tier === 'over') fillEl.classList.add('sc-fill-' + tier);
        else fillEl.classList.add('sc-fill-normal');
    }

    function updateFill(pct, tier) {
        const clamped = Math.min(100, pct);
        fillEl.style.width = clamped + '%';
        setFillClass(tier);
        button.classList.remove('sc-empowered', 'sc-perfect', 'sc-over');
        if (tier === 'empowered') button.classList.add('sc-empowered');
        else if (tier === 'perfect') button.classList.add('sc-perfect');
        else if (tier === 'over') button.classList.add('sc-over');
    }

    function resetVisuals() {
        holding    = false;
        startTime  = null;
        startMs    = null;
        button.classList.remove('sc-holding', 'sc-empowered', 'sc-perfect', 'sc-over');
        fillEl.style.width = '0%';
        fillEl.className = 'spell-charge-fill';
    }

    function animate(ts) {
        if (!holding) return;

        if (startTime === null) { startTime = ts; startMs = performance.now(); }
        const elapsed = ts - startTime;
        const pct = (elapsed / SPELL_CHARGE_DURATION) * 100;

        let tier = 'normal';
        if (pct >= SPELL_OVERCHARGE_PCT) tier = 'over';
        else if (pct >= 90) tier = 'perfect';
        else if (pct >= 60) tier = 'empowered';

        updateFill(pct, tier);

        if (pct >= 200) {
            releaseCharge(true);
            return;
        }
        rafId = requestAnimationFrame(animate);
    }

    function startCharge(e) {
        e.preventDefault();
        const cs = gameState.combatState;
        if (holding || didRelease) return;
        if (cs && cs.actionMode === 'target_spell') return;

        if (cs && cs.monsters) {
            const alive = cs.monsters.some(m => m.hp > 0);
            if (!alive) {
                termAppend('<span style="color:#888;">No valid targets.</span>');
                return;
            }
        }

        holding    = true;
        didRelease = false;
        startTime  = null;
        window._spellCharging = true;
        button.classList.add('sc-holding');
        rafId = requestAnimationFrame(animate);
    }

    function releaseCharge(forceOver = false) {
        if (!holding || didRelease) return;
        didRelease = true;
        holding    = false;
        window._spellCharging = false;

        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

        const cs = gameState.combatState;

        if (cs && cs.monsters) {
            const alive = cs.monsters.some(m => m.hp > 0);
            if (!alive) {
                resetVisuals();
                termAppend('<span style="color:#888;">✦ Your spell dissipates — no valid targets.</span>');
                didRelease = false;
                return;
            }
        }

        const chargePct = forceOver ? 200 : (() => {
            if (startMs === null) return 0;
            return ((performance.now() - startMs) / SPELL_CHARGE_DURATION) * 100;
        })();

        resetVisuals();

        const result = getSpellChargeResult(forceOver ? 200 : chargePct);

        if (result.mult === 0) {
            termAppend(spellChannelMessage(spellKey, result.tier, chargePct));
            if (cs) {
                cs._spellChargeMultiplier = 0;
                cs._spellChargePct        = chargePct;
                cs._spellFizzled          = true;
            }
            selectSpell(spellKey);
            didRelease = false;
            return;
        }

        if (cs) {
            cs._spellChargeMultiplier = result.mult;
            cs._spellChargePct        = chargePct;
            cs._spellChargeTier       = result.tier;
        }

        termAppend(spellChannelMessage(spellKey, result.tier, chargePct));
        selectSpell(spellKey);
        didRelease = false;
    }

    // mouseleave / touchcancel intentionally NOT wired up — we never want
    // external events (including enemy hits causing UI disruption) to cancel
    // a spell charge. Only the player explicitly lifting their finger/mouse fires.
    button.addEventListener('mousedown',  startCharge);
    button.addEventListener('mouseup',    () => releaseCharge());
    button.addEventListener('touchstart', startCharge,          { passive: false });
    button.addEventListener('touchend',   () => releaseCharge(), { passive: false });
}


// ═══════════════════════════════════════════════════════════════
// WARRIOR HEAVY ATTACK POWER BAR MINIGAME
// ═══════════════════════════════════════════════════════════════
function showHeavyAttackMinigame(callback) {
    // Remove any existing overlay
    const existing = document.getElementById('heavyAttackMinigame');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'heavyAttackMinigame';
    overlay.style.cssText = `
        position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
        width:min(380px,94vw);background:#0a0a0a;
        border:2px solid #FF8C00;border-radius:8px;padding:14px;
        z-index:99999;box-shadow:0 0 30px rgba(255,140,0,0.4);
        font-family:monospace;
    `;

    // Zones: symmetric around center 3x bullseye
    const zones = [
        { pct:12, color:'#1c0000', textColor:'#552200', mult:0,   label:'MISS'  },
        { pct:16, color:'#1a0800', textColor:'#994400', mult:1.0, label:'1x'    },
        { pct:18, color:'#1a1400', textColor:'#BB8800', mult:2.0, label:'2x'    },
        { pct:8,  color:'#002000', textColor:'#44FF44', mult:3.0, label:'3x'    },
        { pct:18, color:'#1a1400', textColor:'#BB8800', mult:2.0, label:'2x'    },
        { pct:16, color:'#1a0800', textColor:'#994400', mult:1.0, label:'1x'    },
        { pct:12, color:'#1c0000', textColor:'#552200', mult:0,   label:'MISS'  },
    ];

    // Build zone HTML
    let zonesHtml = '';
    let left = 0;
    zones.forEach(z => {
        zonesHtml += `<div style="position:absolute;left:${left}%;width:${z.pct}%;top:0;height:100%;background:${z.color};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;">
            <span style="color:${z.textColor};font-size:${z.mult===3?17:z.mult===0?11:14}px;font-weight:bold;">${z.mult===0?'MISS':z.mult+'x'}</span>
            <span style="color:${z.textColor};font-size:8px;opacity:0.7;">${z.label}</span>
        </div>`;
        left += z.pct;
    });

    overlay.innerHTML = `
        <div style="color:#FF8C00;font-size:12px;letter-spacing:3px;text-align:center;margin-bottom:10px;">⚔ HEAVY STRIKE ⚔</div>
        <div style="position:relative;height:48px;background:#111;border:1px solid #333;border-radius:4px;overflow:hidden;cursor:pointer;" id="haMgBar">
            ${zonesHtml}
            <div id="haMgCursor" style="position:absolute;left:0%;top:0;width:4px;height:100%;background:#fff;border-radius:2px;box-shadow:0 0 8px #fff;transform:translateX(-50%);pointer-events:none;"></div>
        </div>
        <button id="haMgBtn" style="background:#1a0a00;border:2px solid #FF8C00;color:#FF8C00;font-family:monospace;font-size:13px;padding:9px;cursor:pointer;border-radius:4px;letter-spacing:3px;width:100%;margin-top:10px;">STRIKE</button>
        <div id="haMgResult" style="font-size:15px;font-weight:bold;text-align:center;min-height:22px;margin-top:8px;letter-spacing:1px;"></div>
    `;

    document.body.appendChild(overlay);

    // Minigame logic
    // Random speed each swing: 1.6–2.8 — fast enough to be a real skill check
    const speed = 1.6 + Math.random() * 1.2;
    let pos = 2, dir = 1, running = true, rafId = null, lastTime = 0;

    function getMultiplierAt(p) {
        let acc = 0;
        for (const z of zones) {
            if (p < acc + z.pct) return z.mult;
            acc += z.pct;
        }
        return 0;
    }

    function getResultText(m) {
        if (m === 0)   return { text:'MISS — no damage!',        color:'#555'    };
        if (m === 1.0) return { text:'WEAK HIT — 1x damage',     color:'#FF8C00' };
        if (m === 2.0) return { text:'SOLID HIT — 2x damage!',   color:'#FFD700' };
        if (m === 3.0) return { text:'BULLSEYE — 3x CRITICAL!!', color:'#FF44FF' };
        return { text:`${m}x damage`, color:'#FF8C00' };
    }

    function tick(ts) {
        if (!running) return;
        const dt = Math.min(ts - lastTime, 32);
        lastTime = ts;
        pos += dir * speed * (dt / 16.67);
        if (pos >= 100) { pos = 100; dir = -1; }
        if (pos <= 0)   { pos = 0;   dir = 1;  }
        document.getElementById('haMgCursor').style.left = pos + '%';
        rafId = requestAnimationFrame(tick);
    }

    function strike() {
        // Stop the RAF loop instantly
        running = false;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

        // IMMEDIATELY freeze the cursor's visual position — no more rendering
        const cursorEl = document.getElementById('haMgCursor');
        if (cursorEl) cursorEl.style.left = pos + '%';

        document.getElementById('haMgBtn').disabled = true;

        const mult = getMultiplierAt(pos);
        const { text, color } = getResultText(mult);
        const resEl = document.getElementById('haMgResult');
        resEl.style.color = color;
        resEl.textContent = text;

        // Fire callback then close after a brief moment
        setTimeout(() => {
            overlay.remove();
            callback(mult);
        }, 700);
    }

    document.getElementById('haMgBtn').addEventListener('click', strike);
    // Also allow tapping the bar itself
    document.getElementById('haMgBar').addEventListener('click', strike);

    lastTime = performance.now();
    rafId = requestAnimationFrame(tick);
}

 function executeAttack(attackType) {
    const cs = gameState.combatState;
    if (!cs) return;

    const p  = gameState.player;

    // ── WARRIOR HEAVY ATTACK: intercept and show power bar minigame ──
    // Only intercept if the minigame hasn't run yet (_heavyMultiplier not set)
    const baseClass = p.baseClass || p.class;
    // ALL melee classes get the power bar minigame for heavy attacks
    if (attackType === 'heavy' && cs._heavyMultiplier == null) {
        showHeavyAttackMinigame((multiplier) => {
            const cs2 = gameState.combatState;
            if (!cs2) return;
            cs2._heavyMultiplier = multiplier;
            executeAttack('heavy');
        });
        return;
    }

    const ti = cs.currentTarget;
    const enemy = cs.monsters[ti];
    
    // Get weapon data - handle both string keys and instance IDs
    let weapon = null;
    if (p.weapon) {
        if (typeof p.weapon === 'string' && p.weapon.includes('_')) {
            // This is an instance ID
            weapon = WEAPONS[p.weapon];
        } else {
            // This is a base weapon key
            weapon = WEAPONS[p.weapon];
        }
    }
    
    // No weapon equipped → fight with bare fists
    if (!weapon) {
        if (p.weapon && p.weapon !== 'bare_fists') {
            // Weapon key set but missing from DB — silently switch to fists
            console.warn(`⚠️ Weapon '${p.weapon}' not found — fighting unarmed.`);
        }
        p.weapon = 'bare_fists';
        weapon   = WEAPONS['bare_fists'];
    }
    
    const unarmed = !!weapon.unarmed;
    
    const qBonus = getQualityBonus(weapon.quality, weapon.baseDamage);

    // Determine pip cost and damage multiplier
    let pipCost = 1;
    let damageMultiplier = 1;
    let attackName = unarmed ? 'punches' : 'attack';
    let armorPiercing = 0;

    if (attackType === 'normal') {
        pipCost = 1;
    } 
    else if (attackType === 'heavy') {
         // Multiplier driven by power bar minigame result (warrior/paladin only)
        const mg = (cs._heavyMultiplier != null) ? cs._heavyMultiplier : 1;
        pipCost = 2;
        damageMultiplier = mg;
        armorPiercing = mg >= 2.5 ? 0.5 : mg >= 2 ? 0.35 : 0.15;
        if (mg === 0) {
            attackName = unarmed ? 'swings wildly' : 'overswings';
        } else if (mg >= 3) {
            attackName = unarmed
                ? 'winds up a <span style="color:#FF44FF;">PERFECT HAYMAKER</span>'
                : 'winds up a <span style="color:#FF44FF;">PERFECT HEAVY STRIKE</span>';
        } else if (mg >= 2) {
            attackName = unarmed
                ? 'winds up a <span style="color:#FFD700;">HEAVY HAYMAKER</span>'
                : 'winds up a <span style="color:#FFD700;">HEAVY STRIKE</span>';
        } else {
            attackName = unarmed
                ? 'winds up a <span style="color:#FF8800;">HAYMAKER</span>'
                : 'winds up a <span style="color:#FF8800;">HEAVY STRIKE</span>';
        }
        cs._heavyMultiplier = null; // clear after use
    } 
else if (attackType === 'special') {
    const availablePips = cs.pipAvailable.filter(x => x).length;
    pipCost = availablePips;
    damageMultiplier = 1 + (availablePips * 0.5);
    attackName = unarmed
        ? `unleashes a <span style="color:#FFD700;">⭐ FLURRY OF BLOWS ⭐</span> (${availablePips} pips)`
        : `unleashes a <span style="color:#FFD700;">⭐ SWEEPING STRIKE ⭐</span> (${availablePips} pips)`;
    armorPiercing = 0.3;
    
    // Consume pips
    consumePips(cs, pipCost, getPipCooldown(p));
    cs.actionMode = 'main';
    
    termAppend('', 'term-separator');
    termAppend(`<span style="color:#FFD700;font-size:18px;">🌀 SWEEPING STRIKE! 🌀</span>`, 'term-highlight');
    termAppend(`You unleash a devastating attack with all your remaining energy!`, 'term-warning');
    
    let totalDamageDealt = 0;
    let enemiesHit = 0;
    let killCount = 0;
    
    // STANDALONE GEM BONUS CALCULATION
    const socketed = weapon.gems || [];
    const armorObj = p.armor ? ARMOR[p.armor] : null;
    const armorGems = (armorObj && armorObj.gems) ? armorObj.gems : [];
    const allGems = [...socketed, ...armorGems];
    let gemMeleeDmg = 0, gemCritBonus = 0, gemPierceBonus = 0;
    let gemPoisonChance = 0, gemLightningDmg = 0, gemLifesteal = 0;
    let gemFireDmg = 0, gemFrostDmg = 0, gemSpellLeech = 0;
    
    for (const gem of allGems) {
        if (!gem || !gem.stats) continue;
        gemMeleeDmg     += gem.stats.weaponDmg    || 0;
        gemCritBonus    += gem.stats.critBonus    || 0;
        gemPierceBonus  += gem.stats.armorPierce  || 0;
        gemPoisonChance += gem.stats.poisonChance || 0;
        gemLightningDmg += gem.stats.lightningDmg || 0;
        gemLifesteal    += gem.stats.lifesteal    || 0;
        gemFireDmg      += gem.stats.fireDmg      || 0;
        gemFrostDmg     += gem.stats.frostDmg     || 0;
        gemSpellLeech   += gem.stats.spellLeech   || 0;
    }
    
    // Class and STR bonus
    const playerClass = p.baseClass || p.class;
    let strMult = 1.0;
    if (playerClass === 'warrior' || playerClass === 'paladin') strMult = 1.5;
    else if (playerClass === 'mage' || playerClass === 'warlock') strMult = 0.5;
    else strMult = 1.0;
    
    const strBonus = Math.floor((p.str || 0) * strMult);
    const classMult = getClassDamageMultiplier(p);
    const qBonus = getQualityBonus(weapon.quality, weapon.baseDamage);
    const weaponMods = weapon.modifiers || [];
    
    // Store which enemies died for loot processing
    const deadEnemies = [];
    
    // Loop through all enemies
    for (let i = 0; i < cs.monsters.length; i++) {
        const enemy = cs.monsters[i];
        if (enemy.hp <= 0) continue;
        
        // Roll weapon damage
        const minDmg = weapon.baseDamage + qBonus;
        const maxDmg = (weapon.maxDamage || weapon.baseDamage) + qBonus;
        let weaponDamageRoll = Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg;
        
        const physicalBase = weaponDamageRoll + strBonus + gemMeleeDmg;
        let totalBase = Math.floor(physicalBase * damageMultiplier);
        totalBase = Math.floor(totalBase * classMult);
        
        // Level scaling
        const lvlMult = getLevelDamageMult(p.level, enemy.level);
        totalBase = Math.max(1, Math.floor(totalBase * lvlMult.playerDealt));
        totalBase += gemLightningDmg + gemFireDmg + gemFrostDmg;
        
        // Intimidate penalty
        if ((cs.playerIntimidated || 0) > 0) {
            totalBase = Math.max(1, Math.floor(totalBase * (1 - (cs.playerIntimidated || 0))));
        }
        
        // Dodge check
        const enemyDodgeChance = calculateEnemyDodge(p.level, enemy.level);
        if (Math.random() < enemyDodgeChance) {
            termAppend(`→ <span style="color:${enemy.rarityColor};">${enemy.name}</span> <span style="color:#88ff88;">DODGES</span> your sweeping strike!`, 'term-dim');
            continue;
        }
        
        // Crit check
        const weaponCritBonusVal = (weapon && weapon.critBonus) ? weapon.critBonus / 100 : 0;
        const critChance = Math.min(0.75, (calcCritChance(p.lck || 0, p) / 100) + (gemCritBonus / 100) + weaponCritBonusVal);
        const isCrit = Math.random() < critChance;
        
        // Defense mitigation
        let totalDef = enemy.defense || 0;
        const effectiveArmorPierce = Math.min(1.0, armorPiercing + (gemPierceBonus / 100));
        const DR_PER_POINT = 0.028;
        const effectiveDR = Math.min(0.75, totalDef * DR_PER_POINT) * (1 - effectiveArmorPierce);
        let finalDamage = Math.max(1, Math.floor(totalBase * (1 - effectiveDR)));
        
        if (isCrit) {
            finalDamage = Math.floor(finalDamage * 2.0);
        }
        
        // Apply modifier bonus damage
        let modifierMessages = [];
        for (const mod of weaponMods) {
            if (mod.minDamage !== undefined) {
                const bonusDmg = Math.floor(Math.random() * (mod.maxDamage - mod.minDamage + 1)) + mod.minDamage;
                finalDamage += bonusDmg;
                modifierMessages.push(`<span style="color:${mod.color || '#FFD700'};">+${bonusDmg} ${mod.name}</span>`);
            }
        }
        
        // APPLY DAMAGE
        const wasAlive = enemy.hp > 0;
        enemy.hp -= finalDamage;
        const isDead = enemy.hp <= 0;
        
        totalDamageDealt += finalDamage;
        enemiesHit++;
        
        if (isDead && wasAlive) {
            killCount++;
            deadEnemies.push({enemy: enemy, index: i});
        }
        
        // Apply status effects (only if enemy still alive)
        if (!isDead) {
            if ((gemPoisonChance > 0 && Math.random() < (gemPoisonChance / 100)) ||
                (weapon.poisonChance && Math.random() < weapon.poisonChance)) {
                applyStatusEffect(enemy, 'poisoned', false);
                modifierMessages.push('<span style="color:#00EE00;">💀 Poisoned!</span>');
            }
            
            for (const mod of weaponMods) {
                if (mod.statusEffect && mod.statusChance && Math.random() < mod.statusChance) {
                    applyStatusEffect(enemy, mod.statusEffect, false);
                    modifierMessages.push(`<span style="color:${mod.color || '#FFD700'};">⚡ ${mod.name}: ${mod.statusEffect} applied!</span>`);
                }
            }
        }
        
        // Show damage message
        const critTag = isCrit ? ' <span style="color:#FFD700;">★ CRIT!</span>' : '';
        const killTag = isDead ? ' <span style="color:#ff4444;">💀 KILLED!</span>' : '';
        let msg = `→ <span style="color:${enemy.rarityColor};">${enemy.name}</span> takes <span class="dmg-player">${finalDamage} damage!</span>${critTag}${killTag}`;
        if (modifierMessages.length > 0) {
            msg += ' ' + modifierMessages.join(' ');
        }
        termAppend(msg);
        
        // Lifesteal per hit
        if (gemLifesteal > 0 && finalDamage > 0) {
            const steal = Math.max(1, Math.floor(finalDamage * (gemLifesteal / 100)));
            p.hp = Math.min(p.maxHp, p.hp + steal);
        }
        
        // Spell leech per hit
        if (gemSpellLeech > 0 && finalDamage > 0) {
            const mpSteal = Math.max(1, Math.floor(finalDamage * (gemSpellLeech / 100)));
            p.mp = Math.min(p.maxMp, p.mp + mpSteal);
        }
    }
    
    // Summary
    termAppend('', 'term-separator');
    if (enemiesHit > 0) {
        termAppend(`<span style="color:#FFD700;font-size:16px;">⚡ Total: ${totalDamageDealt} damage to ${enemiesHit} enemy${enemiesHit !== 1 ? 'ies' : 'y'}! ⚡</span>`, 'term-loot');
        if (gemLifesteal > 0 && totalDamageDealt > 0) {
            termAppend(`<span style="color:#FF4488;">🩸 Lifesteal: Restored HP from the carnage!</span>`, 'term-loot');
        }
        if (gemSpellLeech > 0 && totalDamageDealt > 0) {
            termAppend(`<span style="color:#AA55FF;">🔮 Voidstone: Absorbed MP!</span>`, 'term-loot');
        }
    } else {
        termAppend(`<span style="color:#ff8888;">Your sweeping strike hits nothing but air!</span>`, 'term-warning');
    }
    
    if (killCount > 0) {
        termAppend(`💀 ${killCount} enemy${killCount !== 1 ? 's' : ''} slain!`, 'term-victory');
    }
    
    // Update displays
    updateEnemyCards();
    updateHud();
    renderActionBar();
    checkCombatEnd();
    
    return; // Skip normal single-target code
}

    // Check pip availability
    const availablePips = cs.pipAvailable.filter(x => x).length;
    if (availablePips < pipCost) {
        termAppend('Not enough attack charges!', 'term-error');
        return;
    }

    // Consume pips
    consumePips(cs, pipCost, getPipCooldown(p));
    
    // Always reset action mode to main
    cs.actionMode = 'main';

    // ── HEAVY ATTACK MISS (minigame landed in miss zone) ─────────────
    if (attackType === 'heavy' && damageMultiplier === 0) {
        termAppend(
            `You ${attackName} — the blow goes wide! <span style="color:#ff8c00;">MISS!</span>`,
            'term-warning'
        );
        updateEnemyCards();
        updateHud();
        renderActionBar();
        return;
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ROGUE: SHADOW STRIKE - Guaranteed crit from stealth
    // ═══════════════════════════════════════════════════════════════
    let shadowStrike = false;
    // Note: baseClass already declared above in the intercept block
    if (baseClass === 'rogue' && p.shadowStrikeReady) {
        shadowStrike = true;
        p.shadowStrikeReady = false;
        
        // Clear the timer
        if (p.shadowStrikeTimer) {
            clearTimeout(p.shadowStrikeTimer);
            p.shadowStrikeTimer = null;
        }
        
        termAppend('', 'term-separator');
        termAppend('⚫ <span style="color:#8888FF;font-weight:bold;">You leap from the shadows!</span> ⚫', 'term-highlight');
    }

    // ═══════════════════════════════════════════════════════════════
    // RUNESMITH: RUNE OVERLOAD — 3 pips → devastating armor-piercing strike
    // ═══════════════════════════════════════════════════════════════
    let runeOverloadActive = false;
    if (baseClass === 'runesmith' && (p.runeOverloadPips || 0) >= 3) {
        runeOverloadActive = true;
        p.runeOverloadPips = 0;
        termAppend('', 'term-separator');
        termAppend('🔥⚒️ <span style="color:#FF8800;font-weight:bold;">RUNE OVERLOAD!</span> <span style="color:#FFaa00;">The runes detonate — armor is nothing!</span> 🔥⚒️', 'term-highlight');
    }

    // Calculate base damage WITH RANGE ROLLING
    // Roll between baseDamage and maxDamage
    const minDmg = weapon.baseDamage + qBonus;
    const maxDmg = (weapon.maxDamage || weapon.baseDamage) + qBonus;
    let weaponDamage = Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg;

    // ── Apply socketed gem bonuses (weapon + armor) ─────────────────
    const socketed = weapon.gems || [];
    const armorObj = p.armor ? ARMOR[p.armor] : null;
    const armorGems = (armorObj && armorObj.gems) ? armorObj.gems : [];
    const allGems = [...socketed, ...armorGems];
    let gemMeleeDmg = 0, gemMagicDmg = 0, gemCritBonus = 0, gemPierceBonus = 0;
    let gemPoisonChance = 0, gemLightningDmg = 0, gemLifesteal = 0;
    let gemFireDmg = 0, gemFrostDmg = 0, gemSpellLeech = 0;
    let gemHpBonus = 0, gemDefBonus = 0;
    for (const gem of allGems) {
        if (!gem || !gem.stats) continue;
        gemMeleeDmg     += gem.stats.weaponDmg    || 0;
        gemMagicDmg     += gem.stats.spellPower   || 0;
        gemCritBonus    += gem.stats.critBonus    || 0;
        gemPierceBonus  += gem.stats.armorPierce  || 0;
        gemPoisonChance += gem.stats.poisonChance || 0;
        gemLightningDmg += gem.stats.lightningDmg || 0;
        gemLifesteal    += gem.stats.lifesteal     || 0;
        gemFireDmg      += gem.stats.fireDmg      || 0;
        gemFrostDmg     += gem.stats.frostDmg     || 0;
        gemSpellLeech   += gem.stats.spellLeech   || 0;
        gemHpBonus      += gem.stats.hpBonus      || 0;
        gemDefBonus     += gem.stats.defenseBonus || 0;
    }



// Get class-based STR multiplier
const playerClass = p.baseClass || p.class;
let strMult = 1.0;
if (playerClass === 'warrior' || playerClass === 'paladin') strMult = 1.5;
else if (playerClass === 'mage' || playerClass === 'warlock') strMult = 0.5;
else strMult = 1.0;

const strBonus = Math.floor((p.str || 0) * strMult);
const physicalBase = weaponDamage + strBonus + gemMeleeDmg;
    const magicRolled = weapon.baseMagicDamage
        ? Math.floor(Math.random() * ((weapon.maxMagicDamage || weapon.baseMagicDamage) - weapon.baseMagicDamage + 1)) + weapon.baseMagicDamage
        : 0;
    const magicBase =
        magicRolled +
        Math.floor((p.wis || 0) * 1.5) + gemMagicDmg;

    // For melee attacks, ALWAYS use physical damage (STR-based)
let totalBase = Math.floor(physicalBase * damageMultiplier);

    const classMult = getClassDamageMultiplier(p);
    totalBase = Math.floor(totalBase * classMult);

    // Calculate enemy dodge chance based on level difference
    const enemyDodgeChance = calculateEnemyDodge(p.level, enemy.level);

    // ── INTIMIDATED: enemy roar reduces player damage output ────────
    if ((cs.playerIntimidated || 0) > 0) {
        if (gameState.sysop && gameState.sysop.authenticated) {
            termAppend('<span style="color:#003355;">  ⚠️ [INTIMIDATED] damage penalty: -' + Math.round((cs.playerIntimidated||0)*100) + '%</span>', 'term-dim');
        }
    }

    // ── BLINDED: goblin dirty strike — player has extra miss chance ───
    if ((cs.playerBlindedMissChance || 0) > 0) {
        const _blindRoll = Math.random();
        const _blindChance = cs.playerBlindedMissChance;
        if (gameState.sysop && gameState.sysop.authenticated) {
            termAppend('<span style="color:#003355;">  ⚠️ [BLIND] miss roll: ' + (_blindRoll*100).toFixed(2) + '% / need >' + (_blindChance*100).toFixed(0) + '% to hit</span>', 'term-dim');
        }
        cs.playerBlindedHits = (cs.playerBlindedHits || 1) - 1;
        if (cs.playerBlindedHits <= 0) {
            cs.playerBlindedMissChance = 0;
            termAppend('<span style="color:#888;">Your vision clears.</span>', 'term-dim');
        }
        if (_blindRoll < _blindChance) {
            const missVerb = unarmed ? 'swing wildly' : 'swing wide';
            termAppend('You ' + missVerb + ' — dirt in your eyes! <span style="color:#ff8c00;">MISS!</span>', 'term-warning');
            updateEnemyCards(); updateHud(); renderActionBar();
            return;
        }
    }

    // ── LEVEL SCALING: player damage modifier ────────────────────────
    const lvlMult = getLevelDamageMult(p.level, enemy.level);
    totalBase = Math.max(1, Math.floor(totalBase * lvlMult.playerDealt));

    // ── RUNESMITH OVERLOAD: +50% damage + STR + WIS bonus, full armor pierce, undodgeable ──
    if (runeOverloadActive) {
        const overloadBonus = Math.floor(totalBase * 0.50)
            + Math.floor((p.str || 0) * 2)
            + Math.floor((p.wis || 0) * 2);
        totalBase += overloadBonus;
        armorPiercing = 1.0;
    }

    // Apply gem universal bonuses (lightning, fire, frost) to totalBase (both melee and magic)
    totalBase += gemLightningDmg + gemFireDmg + gemFrostDmg;

    // Apply gem armor pierce (stacks additively)
// Calculate armor pierce from weapon modifiers
let weaponArmorPierce = 0;
if (weapon && weapon.modifiers) {
    weapon.modifiers.forEach(mod => {
        if (mod.armorPierce) {
            weaponArmorPierce += mod.armorPierce;
        }
    });
}
const effectiveArmorPierce = Math.min(1.0, armorPiercing + (gemPierceBonus / 100) + weaponArmorPierce);

    // ── SYSOP DEBUG: pre-roll crit and dodge so we can show the numbers ──
    const _dbgAtk = gameState.sysop && gameState.sysop.authenticated;
    const _weaponCritBonus = (weapon && weapon.critBonus) ? weapon.critBonus / 100 : 0;
    const _critChance = shadowStrike ? 1.0 : Math.min(0.75, (calcCritChance(p.lck || 0, p) / 100) + (gemCritBonus / 100) + _weaponCritBonus);
    const _eDodgeChance = runeOverloadActive ? 0 : enemyDodgeChance;
    const _eDodgeRoll  = Math.random();
    const _eDodged     = _eDodgeRoll < _eDodgeChance;
    const _critRoll    = Math.random();
    const _didCrit     = !_eDodged && _critRoll < _critChance;
    const _attackDmgType = magicBase > physicalBase ? 'magic' : 'physical';

    if (_dbgAtk) {
        const _eDR_PP   = 0.028;
        const _eDef     = _attackDmgType === 'magic' ? (enemy.magicDefense || enemy.defense || 0) : (enemy.defense || 0);
        const _eDR      = Math.min(0.75, _eDef * _eDR_PP) * (1 - effectiveArmorPierce);
        const _postDR   = Math.max(1, Math.floor(totalBase * (1 - _eDR)));
        const _critPost = _didCrit ? Math.floor(_postDR * 1.5) : _postDR;
        const minDmgD   = weapon.baseDamage + qBonus;
        const maxDmgD   = (weapon.maxDamage || weapon.baseDamage) + qBonus;
        termAppend(`<span style="color:#003355;">` +
            `🗡️ [PLAYER ATK] ${attackType} | weapon: ${weapon.name} (${minDmgD}–${maxDmgD}) | rolled: ${weaponDamage}` +
            ` | STR bonus: +${Math.floor((p.str||0)*1.5)} | gem dmg: +${gemMeleeDmg}` +
            `${gemLightningDmg+gemFireDmg+gemFrostDmg > 0 ? ` | elem: +${gemLightningDmg+gemFireDmg+gemFrostDmg}` : ''}` +
            ` | physBase: ${physicalBase} | magBase: ${(weapon.baseMagicDamage||0)+Math.floor((p.wis||0)*1.5)+gemMagicDmg}` +
            ` | type: ${_attackDmgType}` +
            `</span>`, 'term-dim');
        termAppend(`<span style="color:#003355;">` +
            `  ×mult: ${damageMultiplier} | ×class: ${getClassDamageMultiplier(p).toFixed(2)} | ×lvl: ${getLevelDamageMult(p.level, enemy.level).playerDealt.toFixed(2)}` +
            `${runeOverloadActive ? ' | RUNE OVERLOAD +50%' : ''}` +
            ` → totalBase: ${totalBase}` +
            ` | pierce: ${(effectiveArmorPierce*100).toFixed(0)}%` +
            ` | eDEF: ${_eDef} | eDR: ${(_eDR*100).toFixed(1)}% | after DR: ${_postDR}` +
            `</span>`, 'term-dim');
        termAppend(`<span style="color:#003355;">` +
            `  crit: rolled ${(_critRoll*100).toFixed(2)}% / need ≤${(_critChance*100).toFixed(1)}% → ${_didCrit ? '★ CRIT ×1.5 → '+_critPost : 'no crit'}` +
            ` | eDodge: rolled ${(_eDodgeRoll*100).toFixed(2)}% / need ≤${(_eDodgeChance*100).toFixed(1)}% → ${_eDodged ? '✅ enemy DODGES' : '❌ no dodge'}` +
            `</span>`, 'term-dim');
    }

    // Resolve damage (dodge and crit already pre-rolled above for debug display)
    const result = _eDodged
        ? { damage: 0, dodged: true, crit: false }
        : (() => {
            let dmg = totalBase;
            const _eDef2 = _attackDmgType === 'magic' ? (enemy.magicDefense || enemy.defense || 0) : (enemy.defense || 0);
            const _eDR2  = Math.min(0.75, _eDef2 * 0.028) * (1 - effectiveArmorPierce);
            dmg = Math.max(1, Math.floor(dmg * (1 - _eDR2)));
            if (_didCrit) dmg = Math.floor(dmg * 2.0);
            return { damage: dmg, dodged: false, crit: _didCrit };
          })();

    const tName = cs.monsters.length > 1
        ? `<span style="color:${enemy.rarityColor};">${enemy.name} #${ti + 1}</span>`
        : `<span style="color:${enemy.rarityColor};">${enemy.name}</span>`;

    if (result.dodged) {
        termAppend(
            `You ${attackName} but ${tName} <span style="color:#88ff88;">DODGES!</span>`,
            null,
            () => {
                updateEnemyCards();
                updateHud();
                renderActionBar();
            }
        );
    } 
    else {
        const critTag = result.crit
            ? ' <span style="color:#FFD700;">★ CRITICAL HIT!</span>'
            : '';

        // Apply weapon modifiers (elemental damage, status effects, lifesteal)
        const modifierResult = applyWeaponModifiers(p, enemy, result.damage, weapon);
        // ── INTIMIDATED: enemy roar penalty reduces player output ────
        const _intimidPenalty = cs && (cs.playerIntimidated || 0);
        const finalDamage = _intimidPenalty > 0
            ? Math.max(1, Math.floor(modifierResult.totalDamage * (1 - _intimidPenalty)))
            : modifierResult.totalDamage;
        
        if (_dbgAtk) {
            const _modExtra = finalDamage - result.damage;
            termAppend(`<span style="color:#003355;">` +
                `  → after-DR: ${result.damage}` +
                `${result.crit ? ` | ★ CRIT ×1.5` : ''}` +
                `${_modExtra > 0 ? ` | modifier +${_modExtra}` : ''}` +
                ` | <b>FINAL: ${finalDamage} dmg</b>` +
                ` | enemy HP: ${enemy.hp} → ${Math.max(0, enemy.hp - finalDamage)}` +
                `</span>`, 'term-dim');
        }
        enemy.hp -= finalDamage;
        // Apply enchant hooks (bloodrage, expose weakness, death mark)
        if (typeof applyEnchantHooks === "function") applyEnchantHooks(p, cs, enemy, finalDamage);
        
        // HAPTIC feedback
        if (result.crit) {
            haptic(attackType === 'special' ? 'special' : 'crit');
        } else if (attackType === 'heavy') {
            haptic('heavy');
        } else {
            haptic('hit');
        }

        // ═══════════════════════════════════════════════════════════════
// ROGUE DOUBLE-STRIKE - Dagger-wielding rogues strike twice
// Rogues with swords get NO double strike — player choice tradeoff
// critBonus on weapon still applies via _weaponCritBonus above
// ═══════════════════════════════════════════════════════════════
let isDaggerWeapon = false;

// Strictly check weaponSubtype — swords never qualify even for rogues
if (weapon) {
    isDaggerWeapon = weapon.weaponSubtype === 'dagger' || weapon.type === 'dagger';
}

// Execute double strike if conditions are met
if (baseClass === 'rogue' && isDaggerWeapon && enemy.hp > 0) {
    const minDmg2 = weapon.baseDamage + qBonus;
    const maxDmg2 = (weapon.maxDamage || weapon.baseDamage) + qBonus;
    let weaponDamage2 = Math.floor(Math.random() * (maxDmg2 - minDmg2 + 1)) + minDmg2;
    
    const physBase2  = weaponDamage2 + strBonus + gemMeleeDmg;
    const magicBase2 = (weapon.baseMagicDamage || 0) + Math.floor((p.wis || 0) * 1.5) + gemMagicDmg;
    
    let totalBase2 = Math.floor(Math.max(physBase2, magicBase2) * 1.0);
    totalBase2 = Math.floor(totalBase2 * classMult);
    totalBase2 = Math.max(1, Math.floor(totalBase2 * lvlMult.playerDealt));
    totalBase2 += gemLightningDmg + gemFireDmg + gemFrostDmg;

    const result2 = calculateDamage({
        attacker: p, defender: enemy,
        base: totalBase2,
        type: _attackDmgType,
        critChance: Math.min(0.75, (calcCritChance(p.lck || 0, p) / 100) + (gemCritBonus / 100) + _weaponCritBonus),
        dodgeChance: enemyDodgeChance,
        armorPiercing
    });

    if (!result2.dodged) {
        const mod2 = applyWeaponModifiers(p, enemy, result2.damage, weapon);
        enemy.hp -= mod2.totalDamage;
        const crit2Tag = result2.crit ? ' <span style="color:#FFD700;">★ CRIT!</span>' : '';
        modifierResult.messages.push(
            `↪ Second strike: <span class="dmg-player">${mod2.totalDamage} damage</span>${crit2Tag}`
        );
        
        if (gemLifesteal > 0) {
            const steal2 = Math.max(1, Math.floor(mod2.totalDamage * (gemLifesteal / 100)));
            p.hp = Math.min(p.maxHp, p.hp + steal2);
            modifierResult.messages.push(`<span style="color:#FF4488;">💎 Ruby: Lifesteal +${steal2} HP</span>`);
        }
        if (weapon.poisonChance && Math.random() < weapon.poisonChance && enemy.hp > 0) {
            applyStatusEffect(enemy, 'poisoned', false);
            modifierResult.messages.push('<span style="color:#00FF00;">💀 Poisoned!</span>');
        }
        if (gemPoisonChance > 0 && Math.random() < (gemPoisonChance / 100) && enemy.hp > 0) {
            applyStatusEffect(enemy, 'poisoned', false);
            modifierResult.messages.push('<span style="color:#00EE00;">💎 Emerald: Poisoned!</span>');
        }
    } else {
        modifierResult.messages.push('↪ Second strike: <span style="color:#88ff88;">DODGED!</span>');
    }
}
// ── END ROGUE DOUBLE-STRIKE ──────────────────────────────────

        // ── HUNTER PET ATTACK ──────────────────────────────────────────
        // Hunter's pet attacks immediately after hunter deals damage
        if (baseClass === 'hunter' && p.activePet && enemy.hp > 0) {
            const petDamage = calculatePetDamage(p, finalDamage);
            if (petDamage > 0) {
                enemy.hp -= petDamage;
                const pet = HUNTER_PETS[p.activePet];
                modifierResult.messages.push(
                    `${pet.icon} <span style="color:#88FF88;">${pet.name} attacks for <span class="dmg-player">${petDamage} damage</span>!</span>`
                );
            }
        }
        
        // Check for poison chance on daggers (Venom Spike, Serpent's Tooth, etc.)
        if (weapon.poisonChance && Math.random() < weapon.poisonChance && enemy.hp > 0) {
            applyStatusEffect(enemy, 'poisoned', false);
            modifierResult.messages.push('<span style="color:#00FF00;">💀 Poisoned!</span>');
        }

        // ── GEM PROCS: poison (universal) and lifesteal (melee only) ──
        if (gemPoisonChance > 0 && Math.random() < (gemPoisonChance / 100) && enemy.hp > 0) {
            applyStatusEffect(enemy, 'poisoned', false);
            modifierResult.messages.push('<span style="color:#00EE00;">💎 Emerald: Poisoned!</span>');
        }
        if (gemLifesteal > 0 && finalDamage > 0) {
            const steal = Math.max(1, Math.floor(finalDamage * (gemLifesteal / 100)));
            p.hp = Math.min(p.maxHp, p.hp + steal);
            modifierResult.messages.push(`<span style="color:#FF4488;">💎 Ruby: Lifesteal +${steal} HP</span>`);
        }

        // ── GEM ELEMENTAL DAMAGE DISPLAY ─────────────────────────────────
        if (gemLightningDmg > 0) {
            modifierResult.messages.push(`<span style="color:#FFD700;">⚡ +${gemLightningDmg} Lightning damage</span>`);
        }
        if (gemFireDmg > 0) {
            modifierResult.messages.push(`<span style="color:#FF6600;">🔥 +${gemFireDmg} Fire damage</span>`);
        }
        if (gemFrostDmg > 0) {
            modifierResult.messages.push(`<span style="color:#88EEFF;">❄️ +${gemFrostDmg} Frost damage</span>`);
        }

        // Voidstone spell leech — converts portion of melee hit to MP
        if (gemSpellLeech > 0 && finalDamage > 0) {
            const mpSteal = Math.max(1, Math.floor(finalDamage * (gemSpellLeech / 100)));
            p.mp = Math.min(p.maxMp, p.mp + mpSteal);
            modifierResult.messages.push(`<span style="color:#AA55FF;">💎 Voidstone: Drained +${mpSteal} MP</span>`);
        }

        // Calculate condition text
        const hpPct = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
        let condition = 'healthy';
        if (hpPct < 75) condition = 'injured';
        if (hpPct < 50) condition = 'wounded';
        if (hpPct < 25) condition = 'severely wounded';
        if (hpPct < 10) condition = 'barely standing';

        // ========== COMPREHENSIVE COLOR MAP FOR ALL ABILITIES ==========
        // Calculate total damage and build colored bonus parts
        let elementalTotal = 0;
        let elementalParts = [];

        // Map damage type keywords to CSS classes
        const DMG_CLASS = {
            lightning: 'dmg-lightning', electric: 'dmg-lightning', thunder: 'dmg-lightning',
            fire: 'dmg-fire', flame: 'dmg-fire', burn: 'dmg-fire', burning: 'dmg-fire',
            poison: 'dmg-poison', venom: 'dmg-poison', toxic: 'dmg-poison',
            frost: 'dmg-frost', ice: 'dmg-frost', cold: 'dmg-frost', frozen: 'dmg-frost',
            magic: 'dmg-magic', arcane: 'dmg-magic', mana: 'dmg-magic', spell: 'dmg-magic',
            soul: 'dmg-soul', spirit: 'dmg-soul', lifesteal: 'dmg-soul', leech: 'dmg-soul',
            shadow: 'dmg-shadow', dark: 'dmg-shadow',
            holy: 'dmg-holy', radiant: 'dmg-holy', light: 'dmg-holy',
            physical: 'dmg-physical', bleed: 'dmg-physical', rend: 'dmg-physical',
        };

        modifierResult.messages.forEach(msg => {
            const damageMatch = msg.match(/\+(\d+) ([\w\s]+) damage/);
            if (damageMatch) {
                const dmg = parseInt(damageMatch[1]);
                const type = damageMatch[2].toLowerCase().trim();
                elementalTotal += dmg;
                const colorKey = type.split(' ')[0];
                const cls = DMG_CLASS[colorKey] || DMG_CLASS[type] || 'dmg-physical';
                elementalParts.push(`<span class="${cls}">+${dmg} ${type}</span>`);
            }
        });

        // Base weapon damage component — static orange, normal size
        const baseDmgSpan = `<span class="dmg-physical">${finalDamage}</span>`;
        // Final total — pulsing orange, larger (dmg-player)
        const totalDamage = finalDamage + elementalTotal;
        const totalDmgSpan = `<span class="dmg-player">${totalDamage}</span>`;

        let elementalString = '';
        if (elementalParts.length > 0) {
            elementalString = ' + ' + elementalParts.join(' + ');
        }

        let damageMessage;
        if (elementalParts.length > 0) {
            damageMessage = `You ${attackName} ${tName} for ${baseDmgSpan}${elementalString} for ${totalDmgSpan} total damage!${critTag}`;
        } else {
            // No bonus damage — just show the final number pulsing
            damageMessage = `You ${attackName} ${tName} for ${totalDmgSpan} total damage!${critTag}`;
        }

        termAppend(
            damageMessage,
            null,
            () => {
                modifierResult.messages.forEach(msg => {
                    if (!msg.match(/\+(\d+) ([\w\s]+) damage/)) {
                        termAppend(`→ ${msg}`, 'term-loot');
                    }
                });

                if (enemy.hp > 0) {
                    termAppend(
                        `→ ${tName} is <span style="color:#8aaa8a;">${condition}</span>`,
                        'term-dim'
                    );
                }

                updateEnemyCards();
                updateHud();
                renderActionBar();
                checkCombatEnd();
            }
        );
    }

    updateEnemyCards();
    updateHud();
    localSave();
}


       // Legacy function kept for compatibility
       function playerAttack() {
    executeAttack('normal');
}

                function startMasterBattle(masterKey) {
    const master = CLASS_MASTERS[masterKey];
    const masterMonster = {
        key: masterKey, 
        name: master.name, 
        rarity: 'epic',
        rarityColor: RARITY_CONFIG.epic.color,
        hp: master.baseHp, 
        maxHp: master.baseHp,
        damage: master.baseDamage, 
        defense: master.baseDefense,
        xp: master.xp, 
        gold: master.gold, 
        level: master.level,
        possibleDrops: master.possibleDrops, 
        dropRates: master.dropRates,
        isMaster: true, 
        masterKey: masterKey,
        guaranteedDrops: master.guaranteedDrops,
        abilities: master.abilities || [],           // ← ADD THIS
        timer: 12 + Math.floor(Math.random() * 7),   // ← ADD THIS (12-18 seconds)
        _telegraphShown: false,                      // ← ADD THIS
        _pendingIntent: null                         // ← ADD THIS
    };
    
    const maxHits = calcPlayerHits(gameState.player);
    const pipTimers = [];
    for (let i = 0; i < maxHits; i++) {
        pipTimers.push(10);
    }
    
    gameState.combatState = {
        monsters: [masterMonster], 
        currentTarget: 0,
        messages: [], 
        defeatedMonsters: [],
        pipTimers: pipTimers,
        pipAvailable: pipTimers.map(() => true),
        enemyHits: 3,
        enemyHitsLeft: 3,
        playerStatusEffects: [],      // ← ADD THIS
        monsterStatusEffects: {},     // ← ADD THIS
        dotTimers: {}                 // ← ADD THIS
    };
    
    // Open the terminal view
    openTerminalView(gameState.currentLocation);
    
    // Append intro text
    termAppend(`<span style="color:${RARITY_CONFIG.epic.color}; font-size:22px;">⚔️ ${master.name} challenges you to an honorable duel! ⚔️</span>`, 'term-highlight');
    
    // Render combat UI
    renderEnemyCards();
    renderActionBar();
    startCombatTimer();
}


function showSpellMenu() {
    const cs = gameState.combatState;
    
    // If in combat, use the original combat spell menu system
    if (cs) {
        const anyAvail = cs.pipAvailable && cs.pipAvailable.some(x => x);
        if (!anyAvail) return;
        const p = gameState.player;
        if (p.knownSpells.length === 0) {
            termAppend('You have no spells!', 'term-error');
            renderActionBar();
            return;
        }
        cs.actionMode = 'spell_list';
        renderActionBar();
        return;
    }
    
    // Outside combat - show spells directly in the action bar
    const ab = document.getElementById('actionBar');
    if (!ab) return;
    
    const p = gameState.player;
    const spells = p.knownSpells || [];
    
    if (spells.length === 0) {
        termAppend('You have no spells!', 'term-error');
        return;
    }
    
    // Remove existing spell menu if any
    const existingMenu = ab.querySelector('.spell-menu-outside');
    if (existingMenu) existingMenu.remove();
    
    const spellDiv = document.createElement('div');
    spellDiv.className = 'spell-menu-outside';
    spellDiv.style.cssText = 'border-top:1px solid var(--border-color);margin-top:6px;padding-top:6px;';
    
    let spellButtons = '';
    spells.forEach(spellKey => {
        const spell = SPELLS[spellKey];
        if (!spell) return;
        
        const canCast = p.mp >= spell.mpCost;
        const isHeal = spell.type === 'heal';
        
        spellButtons += `
            <button onclick="castSpellOutsideCombat('${spellKey}')" 
                ${!canCast ? 'disabled' : ''}
                style="margin:2px; padding:4px 8px; ${isHeal ? 'border-color:#44ff44;' : ''}">
                ${spell.name} (${spell.mpCost} MP)
                ${isHeal ? '💚' : ''}
            </button>
        `;
    });
    
    spellDiv.innerHTML = `
        <div style="color:var(--highlight-color);font-size:12px;margin-bottom:4px;">CAST SPELL</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${spellButtons}
            <button onclick="cancelSpellMenu()">❌ Cancel</button>
        </div>
    `;
    
    ab.appendChild(spellDiv);
}

// Helper functions for outside combat spell casting
function castSpellOutsideCombat(spellKey) {
    const spell = SPELLS[spellKey];
    const p = gameState.player;
    
    if (p.mp < spell.mpCost) {
        termAppend(`Not enough MP! Need ${spell.mpCost} MP.`, 'term-error');
        return;
    }
    
    // Get or create combat state
    let cs = gameState.combatState;
    
    if (!cs) {
        // Create empty combat state
        const maxHits = calcPlayerHits(p);
        gameState.combatState = {
            monsters: [],
            pipAvailable: new Array(maxHits).fill(true),
            pipTimers: new Array(maxHits).fill(0),
            actionMode: 'main',
            inCombat: false,
            isOutOfCombatCasting: true
        };
        cs = gameState.combatState;
        
        // Start the tick timer for regeneration
        if (window._outOfCombatRegenInterval) clearInterval(window._outOfCombatRegenInterval);
        window._outOfCombatRegenInterval = setInterval(() => {
            if (!gameState.combatState?.isOutOfCombatCasting) {
                if (window._outOfCombatRegenInterval) clearInterval(window._outOfCombatRegenInterval);
                return;
            }
            
            const csState = gameState.combatState;
            let anyChanged = false;
            
            for (let i = 0; i < csState.pipTimers.length; i++) {
                if (csState.pipTimers[i] > 0) {
                    csState.pipTimers[i]--;
                    if (csState.pipTimers[i] === 0) {
                        csState.pipAvailable[i] = true;
                        anyChanged = true;
                    }
                }
            }
            
            if (anyChanged) {
                renderActionBar();
                updatePipButtons();
            }
            
            // Clean up when all pips are back
            if (csState.pipAvailable.every(x => x === true)) {
                gameState.combatState = null;
                if (window._outOfCombatRegenInterval) clearInterval(window._outOfCombatRegenInterval);
                renderActionBar();
                termAppend("You've fully recovered.", 'term-info');
            }
        }, 1000);
    }
    
    cs = gameState.combatState;
    
    // Check pips
    const availablePips = cs.pipAvailable.filter(x => x).length;
    const pipCost = spell.pipCost || 1;
    
    if (availablePips < pipCost) {
        termAppend(`You need to recover before casting again!`, 'term-warning');
        return;
    }
    
    // Consume MP
    p.mp -= spell.mpCost;
    
    // Consume pips
    const cooldown = getPipCooldown(p);
    consumePips(cs, pipCost, cooldown);
    
    // Cast the spell
    if (spell.type === 'heal') {
        const minHeal = spell.minPower || 10;
        const maxHeal = spell.maxPower || minHeal;
        const healRoll = Math.floor(Math.random() * (maxHeal - minHeal + 1)) + minHeal;
        const healAmount = healRoll + Math.floor(p.magic * 1.5) + (p.wis || 0);
        const actualHeal = Math.min(p.maxHp - p.hp, healAmount);
        p.hp = Math.min(p.maxHp, p.hp + actualHeal);
        termAppend(`✨ You cast ${spell.name} and restore ${actualHeal} HP! ✨`, 'term-heal');
    } else {
        termAppend(`You cast ${spell.name}.`, 'term-info');
    }
    
    // Update UI
    updateHud();
    cancelSpellMenu();
    renderActionBar();
    updatePipButtons();
    
    const remainingPips = cs.pipAvailable.filter(x => x).length;
    const totalPips = cs.pipAvailable.length;
    termAppend(`You have ${remainingPips}/${totalPips} actions remaining. Recovery in ${cooldown} seconds.`, 'term-dim');
}

function cancelSpellMenu() {
    const menu = document.querySelector('.spell-menu-outside');
    if (menu) menu.remove();
}



            function castSpellOnTarget(spell) {
    const p  = gameState.player;
    const cs = gameState.combatState;
    const spellKey = cs.pendingSpellKey;
    
    if (p.mp < spell.mpCost) {
        termAppend('Not enough MP!', 'term-error');
        return;
    }
    // ── SILENCED: enemy ability prevents spellcasting ────────
    if (cs.playerSilenced) {
        termAppend('<span style="color:#ff8800;">💀 You are silenced and cannot cast spells!</span>', 'term-warning');
        cs.actionMode = 'main';
        cs.pendingSpellKey = null;
        renderActionBar();
        return;
    }
    

    // --- Pip check for spells ---
    const availablePips = cs.pipAvailable.filter(x => x).length;

    if (availablePips < (spell.pipCost || 1)) {
        termAppend('Not enough spell charges!', 'term-error');
        return;
    }

    // Consume spell pips
    consumePips(cs, spell.pipCost || 1, getPipCooldown(p));

    // ── SPELL CHARGE MULTIPLIER (mage / cleric / warlock hold-to-charge) ──
    const _chargeMultiplier = cs._spellChargeMultiplier != null ? cs._spellChargeMultiplier : 1.0;
    const _chargePct        = cs._spellChargePct        != null ? cs._spellChargePct        : 100;
    const _fizzledByCharge  = !!cs._spellFizzled;
    cs._spellChargeMultiplier = null;
    cs._spellChargePct        = null;
    cs._spellChargeTier       = null;
    cs._spellFizzled          = null;

    p.mp -= spell.mpCost;
    markMpAction();

    // Pip consumed, MP spent — if fizzle, stop here and return to main menu
    if (_fizzledByCharge) {
        updateHud();
        cs.actionMode = 'main';
        cs.pendingSpell = null;
        cs.pendingSpellKey = null;
        renderActionBar();
        localSave();
        return;
    }

    // ── RUNESMITH: charge Rune Overload pip on every spell cast ──
    if ((p.baseClass || p.class) === 'runesmith' && (p.runeOverloadPips || 0) < 3) {
        p.runeOverloadPips = (p.runeOverloadPips || 0) + 1;
        const rp = p.runeOverloadPips;
        const rp1 = rp >= 1 ? '🔶' : '⬛'; const rp2 = rp >= 2 ? '🔶' : '⬛'; const rp3 = rp >= 3 ? '🔶' : '⬛';
        if (rp >= 3) {
            termAppend('⚒️ <span style="color:#FF8800;font-weight:bold;">RUNE OVERLOAD CHARGED!</span> <span style="color:#FFaa00;">Strike now for devastating, armor-piercing power!</span> 🔥');
        } else {
            termAppend(`⚒️ <span style="color:#c8a000;">Rune charged: ${rp1}${rp2}${rp3}</span>`);
        }
    }

    if (spell.type === 'heal') {
        // Healing spells: charge % linearly maps minPower → maxPower.
        // Under 30% charge there is a 50% fizzle (already handled pre-cast, but
        // also keep the original 5% baseline fizzle for un-charged / non-caster casts).
        const _dbgSpell = gameState.sysop && gameState.sysop.authenticated;

        // Charge-based fizzle for caster classes (< 30% = 50% fizzle, handled in
        // setupSpellCharging — by the time we get here mult=0.5 or 1.0+ so we
        // only need the old 5% baseline fizzle for edge cases).
        const _fizzRoll   = Math.random();
        const spellFailed = _fizzRoll < 0.05;

        // Charge % clamped 0–100 drives the heal range
        const _chargeRatio = Math.min(1, Math.max(0, _chargePct / 100));
        const minHeal      = spell.minPower || 10;
        const maxHeal      = spell.maxPower || minHeal;
        // Linear interpolation: 0% charge → minPower, 100% charge → maxPower
        const chargedBase  = Math.round(minHeal + _chargeRatio * (maxHeal - minHeal));

        if (_dbgSpell) {
            termAppend('<span style="color:#004466;">✨ [HEAL] ' + spell.name
                + ' | cost: ' + spell.mpCost + ' MP'
                + ' | range: ' + minHeal + '–' + maxHeal
                + ' | charge: ' + _chargePct.toFixed(1) + '% → base: ' + chargedBase
                + ' | fizzle roll: ' + (_fizzRoll*100).toFixed(2) + '% / need ≤5% → ' + (spellFailed ? '💀 FIZZLE' : '✅ ok')
                + '</span>', 'term-dim');
        }
        if (spellFailed) {
            termAppend(`You cast ${spell.name} but it <span style="color:#ff6666;">fizzles!</span> The gods did not answer.`);
        } else {
            const heal       = chargedBase + Math.floor(p.magic * 1.5) + (p.wis || 0);
            const actualHeal = Math.min(p.maxHp - p.hp, heal);
            if (_dbgSpell) {
                termAppend('<span style="color:#004466;">  chargedBase: ' + chargedBase
                    + ' | +magic ' + Math.floor(p.magic*1.5) + ' | +WIS ' + (p.wis||0)
                    + ' → heal: ' + heal + ' | actual: ' + actualHeal
                    + ' (HP cap: ' + p.hp + '/' + p.maxHp + ')'
                    + '</span>', 'term-dim');
            }
            p.hp = Math.min(p.maxHp, p.hp + actualHeal);
            updateHud();
            renderActionBar();
            termAppend(`You cast ${spell.name} and restore <span style="color:#88ff88;">${actualHeal} HP!</span>`);
        }
    } else if (spell.type === 'aoe_damage') {
        // AOE DAMAGE - Hit all enemies for reduced damage each
        const monsters = cs.monsters;
        let totalDamage = 0;
        let hitCount = 0;
        
        if (gameState.sysop && gameState.sysop.authenticated) {
            const _aoeminP = spell.minPower||spell.power, _aoemaxP = spell.maxPower||spell.power;
            termAppend('<span style="color:#004466;">✨ [AOE] ' + spell.name
                + ' | cost: ' + spell.mpCost + ' MP | range: ' + _aoeminP + '–' + _aoemaxP
                + ' | targets: ' + cs.monsters.filter(m=>m.hp>0).length
                + '</span>', 'term-dim');
        }
        termAppend(`You cast ${spell.name}!`, 'term-highlight');
        termAppend(`<span style="color:#FF8800;">🔥 AREA OF EFFECT! 🔥</span>`, 'term-victory');
        
        // Check if fire spell for burning
        const spellName = spell.name.toLowerCase();
        const isFire = spellName.includes('fire') || spellName.includes('flame') || 
                       spellName.includes('burn') || spellName.includes('pyro') || 
                       spellName.includes('inferno') || spellName.includes('ember');
        
        // ── Gem bonuses for spells (added for AOE) ─────────────────
        const spellWeapon = WEAPONS[p.weapon];
        let gemSpellBonus = 0;
        let gemSpellCrit = 0;
        let gemSpellPoison = 0;
        let gemSpellUniversal = 0;
        let gemSpellLifesteal = 0;
        
        if (spellWeapon && spellWeapon.gems) {
            for (const sg of spellWeapon.gems) {
                if (!sg || !sg.stats) continue;
                gemSpellBonus += sg.stats.spellPower || 0;
                gemSpellCrit += sg.stats.critBonus || 0;
                gemSpellPoison += sg.stats.poisonChance || 0;
                gemSpellUniversal += (sg.stats.lightningDmg || 0) + (sg.stats.fireDmg || 0) + (sg.stats.frostDmg || 0);
                gemSpellLifesteal += sg.stats.lifesteal || 0;
            }
        }
        
        monsters.forEach((enemy, i) => {
            if (enemy.hp > 0) {
                // Calculate enemy dodge chance
                const enemyDodgeChance = calculateEnemyDodge(p.level, enemy.level);
                
                const tName = monsters.length > 1
                    ? `<span style="color:${enemy.rarityColor};">${enemy.name} #${i+1}</span>`
                    : `<span style="color:${enemy.rarityColor};">${enemy.name}</span>`;
                
                // Check if enemy dodges
                const _aoeDbg = gameState.sysop && gameState.sysop.authenticated;
                const _aoeDodgeRoll = Math.random();
                const _aoeDodged = _aoeDodgeRoll < enemyDodgeChance;
                if (_aoeDbg) termAppend('<span style="color:#004466;">  [AOE→' + enemy.name + '] dodge: rolled '
                    + (_aoeDodgeRoll*100).toFixed(2) + '% / need ≤' + (enemyDodgeChance*100).toFixed(1) + '% → '
                    + (_aoeDodged ? '✅ DODGE' : '❌ hit') + '</span>', 'term-dim');
                if (_aoeDodged) {
                    termAppend(`→ ${tName} <span style="color:#88ff88;">DODGES!</span>`);
                    return; // Skip this enemy
                }
                
                // SPELL DAMAGE: charge % lerps minPower → maxPower (same mechanic as heals)
                const minPower = spell.minPower || spell.power;
                const maxPower = spell.maxPower || spell.power;
                const _chargeRatio = Math.min(1, Math.max(0, _chargePct / 100));
                const spellRoll = Math.round(minPower + _chargeRatio * (maxPower - minPower));
                
                // Add weapon modifier bonus to offensive spells
                const modifierBonus = getWeaponModifierSpellBonus();
                
                const _aoeCritRoll = Math.random() * 100;
                // UPDATED: include gemSpellCrit
                const _aoeCritChance = calcCritChance(p.lck || 0, p) + gemSpellCrit;
                // UPDATED: include gemSpellBonus + gemSpellUniversal
                let dmg = Math.max(1, (spellRoll + p.magic + (p.wis || 0) + modifierBonus + gemSpellBonus + gemSpellUniversal) - Math.floor(enemy.defense / 2));
                let crit = false;
                if (_aoeCritRoll < _aoeCritChance) { 
                    dmg = Math.floor(dmg * 1.75); 
                    crit = true; 
                }
                if (_aoeDbg) termAppend('<span style="color:#004466;">  roll: ' + spellRoll
                    + ' | +magic ' + p.magic + ' | +WIS ' + (p.wis||0) + ' | +mod ' + modifierBonus
                    + ' | +gemSP ' + gemSpellBonus + ' | +elem ' + gemSpellUniversal
                    + ' | -eDef/2 ' + Math.floor(enemy.defense/2)
                    + ' → pre-crit: ' + Math.max(1, spellRoll + p.magic + (p.wis||0) + modifierBonus + gemSpellBonus + gemSpellUniversal - Math.floor(enemy.defense/2))
                    + ' | crit: ' + _aoeCritRoll.toFixed(2) + ' / need ≤' + _aoeCritChance.toFixed(1) + ' → ' + (crit ? '★ CRIT ×1.75' : 'no crit')
                    + '</span>', 'term-dim');
                
                // Apply weapon modifiers to spell (status effects + elemental damage)
                const weapon = WEAPONS[p.weapon];
                const modifierResult = weapon ? applyWeaponModifiers(p, enemy, dmg, weapon) : { totalDamage: dmg, messages: [] };
                const finalDamage = modifierResult.totalDamage;
                
                // ADDED: Gem poison effect for AOE
                if (gemSpellPoison > 0 && Math.random() < (gemSpellPoison / 100) && enemy.hp > 0) {
                    applyStatusEffect(enemy, 'poisoned', false);
                    modifierResult.messages.push('<span style="color:#00EE00;">💎 Emerald: Poisoned!</span>');
                }
                
                // ADDED: Gem lifesteal for AOE
                if (gemSpellLifesteal > 0 && finalDamage > 0) {
                    const lsHeal = Math.max(1, Math.floor(finalDamage * (gemSpellLifesteal / 100)));
                    p.hp = Math.min(p.maxHp, p.hp + lsHeal);
                    modifierResult.messages.push(`<span style="color:#FF4488;">💎 Ruby: Lifesteal +${lsHeal} HP</span>`);
                }
                
                enemy.hp -= finalDamage;
                totalDamage += finalDamage;
                hitCount++;
                
                const critTag = crit ? ' <span style="color:#FFD700;">★ CRIT!</span>' : '';
                let msg = `→ ${tName} takes <span class="dmg-player">${finalDamage} damage!</span>${critTag}`;
                if (modifierResult.messages.length > 0) {
                    msg += ' ' + modifierResult.messages.join(' ');
                }
                termAppend(msg);
                
                // Apply burning to each enemy hit (AOE fire spells)
                if (isFire && Math.random() < 0.5 && enemy.hp > 0) { // 50% chance per target
                    applyStatusEffect(enemy, 'burning', false);
                }
            }
        });
        
        termAppend(`<span style="color:#FFD700;">Total: ${totalDamage} damage to ${hitCount} ${hitCount === 1 ? 'enemy' : 'enemies'}!</span>`, 'term-loot');
        checkCombatEnd();
        updateEnemyCards();
        updateHud();
        renderActionBar();
    } else if (spell.type === 'lifesteal') {
        // LIFESTEAL - damage enemy and heal yourself
        const ti = cs.currentTarget;
        const enemy = cs.monsters[ti];
        
        // Calculate enemy dodge chance
        const enemyDodgeChance = calculateEnemyDodge(p.level, enemy.level);
        
        const tName = cs.monsters.length > 1
            ? `<span style="color:${enemy.rarityColor};">${enemy.name} #${ti+1}</span>`
            : `<span style="color:${enemy.rarityColor};">${enemy.name}</span>`;
        
        // Check if enemy dodges
        const _lsDbg = gameState.sysop && gameState.sysop.authenticated;
        const _lsDodgeRoll = Math.random();
        const _lsDodged = _lsDodgeRoll < enemyDodgeChance;
        if (_lsDbg) termAppend('<span style="color:#004466;">✨ [LIFESTEAL] ' + spell.name
            + ' | cost: ' + spell.mpCost + ' MP | range: ' + (spell.minPower||spell.power) + '–' + (spell.maxPower||spell.power)
            + ' | dodge: rolled ' + (_lsDodgeRoll*100).toFixed(2) + '% / need ≤' + (enemyDodgeChance*100).toFixed(1) + '% → '
            + (_lsDodged ? '✅ DODGE' : '❌ hit') + '</span>', 'term-dim');
        if (_lsDodged) {
            termAppend(`You cast ${spell.name} but ${tName} <span style="color:#88ff88;">DODGES!</span>`);
            updateEnemyCards();
            updateHud();
            cs.actionMode = 'main';
            cs.pendingSpellKey = null;
            renderActionBar();
            return;
        }
        
        // SPELL DAMAGE: charge % lerps minPower → maxPower (same mechanic as heals)
        const minPower = spell.minPower || spell.power;
        const maxPower = spell.maxPower || spell.power;
        const _chargeRatio = Math.min(1, Math.max(0, _chargePct / 100));
        const spellRoll = Math.round(minPower + _chargeRatio * (maxPower - minPower));

        // Add weapon modifier bonus to offensive spells
        const modifierBonus = getWeaponModifierSpellBonus();

        const spellWeapon = WEAPONS[p.weapon];
        let gemSpellBonus = 0, gemSpellCrit = 0, gemSpellPoison = 0;
        let gemSpellUniversal = 0; // lightning + fire + frost all apply to spells
        let gemSpellLeechPct = 0;  // voidstone: spell leech → MP
        if (spellWeapon && spellWeapon.gems) {
            for (const sg of spellWeapon.gems) {
                if (!sg || !sg.stats) continue;
                gemSpellBonus    += sg.stats.spellPower    || 0;  // magic-only
                gemSpellCrit     += sg.stats.critBonus     || 0;  // universal
                gemSpellPoison   += sg.stats.poisonChance  || 0;  // universal
                gemSpellUniversal += (sg.stats.lightningDmg || 0)
                                  + (sg.stats.fireDmg       || 0)
                                  + (sg.stats.frostDmg      || 0); // universal elements
                gemSpellLeechPct += sg.stats.spellLeech    || 0;  // voidstone: MP leech
            }
        }
        
        const _lsCritRoll = Math.random() * 100;
        const spellCritChance = Math.min(75, calcCritChance(p.lck || 0, p) + gemSpellCrit);
        let dmg = Math.max(1, (spellRoll + p.magic + (p.wis || 0) + modifierBonus + gemSpellBonus + gemSpellUniversal) - Math.floor(enemy.defense / 2));
        let crit = false;
        if (_lsCritRoll < spellCritChance) { dmg = Math.floor(dmg * 1.75); crit = true; }
        if (_lsDbg) termAppend('<span style="color:#004466;">  roll: ' + spellRoll
            + ' | +magic ' + p.magic + ' | +WIS ' + (p.wis||0) + ' | +mod ' + modifierBonus
            + ' | +gemSP ' + gemSpellBonus + ' | +elem ' + gemSpellUniversal
            + ' | -eDef/2 ' + Math.floor(enemy.defense/2)
            + ' → pre-crit: ' + Math.max(1, spellRoll + p.magic + (p.wis||0) + modifierBonus + gemSpellBonus + gemSpellUniversal - Math.floor(enemy.defense/2))
            + ' | crit: ' + _lsCritRoll.toFixed(2) + ' / need ≤' + spellCritChance.toFixed(1) + ' → ' + (crit ? '★ CRIT ×1.75' : 'no crit')
            + ' | lifesteal: ' + (spell.lifestealPercent||25) + '%'
            + '</span>', 'term-dim');
        
        // Apply weapon modifiers to spell (status effects + elemental damage)
        const weapon = WEAPONS[p.weapon];
        const modifierResult = weapon ? applyWeaponModifiers(p, enemy, dmg, weapon) : { totalDamage: dmg, messages: [] };
        const finalDamage = modifierResult.totalDamage;

        // Gem poison proc on spell
        if (gemSpellPoison > 0 && Math.random() < (gemSpellPoison / 100) && enemy.hp > 0) {
            applyStatusEffect(enemy, 'poisoned', false);
            modifierResult.messages.push('<span style="color:#00EE00;">💎 Emerald: Poisoned!</span>');
        }
        
        // Gem lifesteal on spells (ruby — works on both melee and spells per design)
        let gemSpellLifesteal = 0;
        if (spellWeapon && spellWeapon.gems) {
            for (const sg of spellWeapon.gems) {
                if (sg && sg.stats) gemSpellLifesteal += sg.stats.lifesteal || 0;
            }
        }
        if (gemSpellLifesteal > 0) {
            const lsHeal = Math.max(1, Math.floor(finalDamage * (gemSpellLifesteal / 100)));
            p.hp = Math.min(p.maxHp, p.hp + lsHeal);
            modifierResult.messages.push(`<span style="color:#FF4488;">💎 Ruby: Lifesteal +${lsHeal} HP</span>`);
        }
        // Voidstone spell leech → drains MP from enemy (magic absorb, not HP)
        if (gemSpellLeechPct > 0) {
            const mpDrain = Math.max(1, Math.floor(finalDamage * (gemSpellLeechPct / 100)));
            p.mp = Math.min(p.maxMp, p.mp + mpDrain);
            modifierResult.messages.push(`<span style="color:#AA55FF;">💎 Voidstone: Absorbed +${mpDrain} MP</span>`);
        }

        enemy.hp -= finalDamage;
        
        // Heal based on lifesteal percentage (from the final damage including modifiers)
        const lifestealPercent = spell.lifestealPercent || 25;
        const healAmount = Math.floor(finalDamage * (lifestealPercent / 100));
        p.hp = Math.min(p.maxHp, p.hp + healAmount);
        
        const critTag = crit ? ' <span style="color:#FFD700;">★ CRIT!</span>' : '';
        let spellMsg = `You cast ${spell.name} on ${tName} for <span class="dmg-player">${finalDamage} damage!</span>${critTag}`;
        if (modifierResult.messages.length > 0) {
            spellMsg += '<br>' + modifierResult.messages.join('<br>');
        }
        
        termAppend(spellMsg, null, () => {
            termAppend(`<span style="color:#00FF00;">🩸 Drained ${healAmount} HP!</span>`, 'term-loot');
            if (enemy.hp > 0) {
                const hpPct = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
                let condition = 'healthy';
                if (hpPct < 75) condition = 'injured';
                if (hpPct < 50) condition = 'wounded';
                if (hpPct < 25) condition = 'severely wounded';
                if (hpPct < 10) condition = 'barely standing';
                termAppend(`→ ${tName} is <span style="color:#8aaa8a;">${condition}</span>`, 'term-dim');
            }
            checkCombatEnd();
        });
    } else {
        // REGULAR DAMAGE SPELL
        const ti    = cs.currentTarget;
        const enemy = cs.monsters[ti];
        
        // Calculate enemy dodge chance based on level difference
        const enemyDodgeChance = calculateEnemyDodge(p.level, enemy.level);
        
        // Check if enemy dodges the spell
        const _regDbg = gameState.sysop && gameState.sysop.authenticated;
        const _regDodgeRoll = Math.random();
        const _regDodged = _regDodgeRoll < enemyDodgeChance;
        const tName = cs.monsters.length > 1
            ? `<span style="color:${enemy.rarityColor};">${enemy.name} #${ti+1}</span>`
            : `<span style="color:${enemy.rarityColor};">${enemy.name}</span>`;
        if (_regDbg) termAppend('<span style="color:#004466;">✨ [SPELL] ' + spell.name
            + ' | cost: ' + spell.mpCost + ' MP | range: ' + (spell.minPower||spell.power) + '–' + (spell.maxPower||spell.power)
            + ' | eDodge: rolled ' + (_regDodgeRoll*100).toFixed(2) + '% / need ≤' + (enemyDodgeChance*100).toFixed(1) + '% → '
            + (_regDodged ? '✅ enemy DODGES' : '❌ hit') + '</span>', 'term-dim');
        if (_regDodged) {
            termAppend(`You cast ${spell.name} but ${tName} <span style="color:#88ff88;">DODGES!</span>`);
            updateEnemyCards();
            updateHud();
            cs.actionMode = 'main';
            cs.pendingSpellKey = null;
            renderActionBar();
            return;
        }
        
        // SPELL DAMAGE: charge % lerps minPower → maxPower (same mechanic as heals)
        const minPower = spell.minPower || spell.power;
        const maxPower = spell.maxPower || spell.power;
        const _chargeRatio = Math.min(1, Math.max(0, _chargePct / 100));
        const spellRoll = Math.round(minPower + _chargeRatio * (maxPower - minPower));
        
        // Add weapon modifier bonus to offensive spells
        const modifierBonus = getWeaponModifierSpellBonus();
        
        // ── Gem bonuses for spells (added for regular damage) ────────────
        const spellWeapon = WEAPONS[p.weapon];
        let gemSpellBonus = 0;
        let gemSpellCrit = 0;
        let gemSpellPoison = 0;
        let gemSpellUniversal = 0;
        let gemSpellLifesteal = 0;
        
        if (spellWeapon && spellWeapon.gems) {
            for (const sg of spellWeapon.gems) {
                if (!sg || !sg.stats) continue;
                gemSpellBonus += sg.stats.spellPower || 0;
                gemSpellCrit += sg.stats.critBonus || 0;
                gemSpellPoison += sg.stats.poisonChance || 0;
                gemSpellUniversal += (sg.stats.lightningDmg || 0) + (sg.stats.fireDmg || 0) + (sg.stats.frostDmg || 0);
                gemSpellLifesteal += sg.stats.lifesteal || 0;
            }
        }
        
        const _regCritRoll = Math.random() * 100;
        // UPDATED: include gemSpellCrit
        const _regCritChance = calcCritChance(p.lck||0, p) + gemSpellCrit;
        // UPDATED: include gemSpellBonus + gemSpellUniversal
        let dmg = Math.max(1, (spellRoll + p.magic + (p.wis||0) + modifierBonus + gemSpellBonus + gemSpellUniversal) - Math.floor(enemy.defense / 2));
        let crit = false;
        if (_regCritRoll < _regCritChance) { dmg = Math.floor(dmg*1.75); crit = true; }
        if (_regDbg) termAppend('<span style="color:#004466;">  roll: ' + spellRoll
            + ' | +magic ' + p.magic + ' | +WIS ' + (p.wis||0) + ' | +mod ' + modifierBonus
            + ' | +gemSP ' + gemSpellBonus + ' | +elem ' + gemSpellUniversal
            + ' | -eDef/2 ' + Math.floor(enemy.defense/2)
            + ' → pre-crit: ' + Math.max(1, spellRoll + p.magic + (p.wis||0) + modifierBonus + gemSpellBonus + gemSpellUniversal - Math.floor(enemy.defense/2))
            + ' | crit: ' + _regCritRoll.toFixed(2) + ' / need ≤' + _regCritChance.toFixed(1) + ' → ' + (crit ? '★ CRIT ×1.75' : 'no crit')
            + ' | final: ' + dmg
            + '</span>', 'term-dim');
        
        // Apply weapon modifiers to spell (status effects + elemental damage)
        const weapon = WEAPONS[p.weapon];
        const modifierResult = weapon ? applyWeaponModifiers(p, enemy, dmg, weapon) : { totalDamage: dmg, messages: [] };
        const finalDamage = modifierResult.totalDamage;
        
        // ADDED: Gem poison effect for regular damage spell
        if (gemSpellPoison > 0 && Math.random() < (gemSpellPoison / 100) && enemy.hp > 0) {
            applyStatusEffect(enemy, 'poisoned', false);
            modifierResult.messages.push('<span style="color:#00EE00;">💎 Emerald: Poisoned!</span>');
        }
        
        // ADDED: Gem lifesteal for regular damage spell
        if (gemSpellLifesteal > 0 && finalDamage > 0) {
            const lsHeal = Math.max(1, Math.floor(finalDamage * (gemSpellLifesteal / 100)));
            p.hp = Math.min(p.maxHp, p.hp + lsHeal);
            modifierResult.messages.push(`<span style="color:#FF4488;">💎 Ruby: Lifesteal +${lsHeal} HP</span>`);
        }
        
        enemy.hp -= finalDamage;
        
        // Check for spell status effects (burning from fire spells, etc.)
        const spellName = spell.name.toLowerCase();
        if ((spellName.includes('fire') || spellName.includes('flame') || spellName.includes('burn') || 
             spellName.includes('pyro') || spellName.includes('inferno') || spellName.includes('ember')) && 
            Math.random() < 0.5) { // 50% chance
            enemy.statusToApply = 'burning';
        } else if ((spellName.includes('ice') || spellName.includes('frost') || spellName.includes('frozen')) && 
                   Math.random() < 0.4) { // 40% chance
            enemy.statusToApply = 'frozen';
        } else if (spellName.includes('lightning') && Math.random() < 0.2) { // 20% chance
            enemy.statusToApply = 'stunned';
        } else if (spellName.includes('shadow') && Math.random() < 0.3) { // 30% chance
            enemy.statusToApply = 'blinded';
        }
        
        const critTag = crit ? ' <span style="color:#FFD700;">★ CRIT!</span>' : '';
        const hpPct = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
        let condition = 'healthy';
        if (hpPct < 75) condition = 'injured';
        if (hpPct < 50) condition = 'wounded';
        if (hpPct < 25) condition = 'severely wounded';
        if (hpPct < 10) condition = 'barely standing';
        
        // Build message with weapon modifier bonuses
        let spellMsg = `You cast ${spell.name} on ${tName} for <span class="dmg-player">${finalDamage} damage!</span>${critTag}`;
        if (modifierResult.messages.length > 0) {
            spellMsg += '<br>' + modifierResult.messages.join('<br>');
        }
        
        termAppend(spellMsg, null, () => {
            // Apply status effect if flagged
            if (enemy.statusToApply && enemy.hp > 0) {
                applyStatusEffect(enemy, enemy.statusToApply, false);
                enemy.statusToApply = null;
            }
            
            if (enemy.hp > 0) {
                termAppend(`→ ${tName} is <span style="color:#8aaa8a;">${condition}</span>`, 'term-dim');
            }
            checkCombatEnd();
        });
    }
      updateEnemyCards();
        updateHud();
    
    // Reset to main combat menu after spell cast
    cs.actionMode = 'main';
    cs.pendingSpellKey = null;
    renderActionBar();
    localSave();
}

        // Legacy function for backward compatibility
        function castSpell(spellKey) {
            const spell = SPELLS[spellKey];
            castSpellOnTarget(spell);
        }

        // ═══════════════════════════════════════════════════════════════
        // HUNTER TRAP ABILITY
        // ═══════════════════════════════════════════════════════════════
        
        function castTrap() {
            const cs = gameState.combatState;
            const p = gameState.player;
            
            if (!cs || cs.combatOver) return;
            
            // Check if hunter
            if ((p.baseClass || p.class) !== 'hunter') {
                termAppend('Only hunters can set traps!', 'term-error');
                return;
            }
            
            // Check MP
            if (p.mp < 10) {
                termAppend('Not enough MP to set a trap! (Need 10 MP)', 'term-error');
                return;
            }
            
            // Check if trap already active
            if (cs.trapActive) {
                termAppend('A trap is already set!', 'term-warning');
                return;
            }
            
            // Consume MP
            p.mp -= 10;
            markMpAction();
            
            // Setting the trap...
            termAppend('', 'term-separator');
            termAppend('🪤 <span style="color:#8B4513;">You carefully set a concealed trap...</span>', null, () => {
                // 2 second pause for dramatic effect
                setTimeout(() => {
                    // 15% fail rate
                    const failed = Math.random() < 0.15;
                    
                    if (failed) {
                        termAppend('<span style="color:#ff4444;">💨 The trap mechanism fails! The enemies avoid it!</span>', 'term-error');
                    } else {
    // Success! Apply 50% slow to ALL enemies
    const slowMultiplier = 0.5;
    const slowAmount = Math.floor(10 * slowMultiplier); // Base 10 seconds
    
    // Mark trap as active for this combat
    cs.trapActive = true;
    cs.trapSlowAmount = slowAmount;
    
    // Apply slow to ALL active enemies
    if (cs.monsters) {
        cs.monsters.forEach(enemy => {
            if (enemy.timer !== undefined) {
                enemy.timer += slowAmount;
            }
        });
    }
                        
                        termAppend(`<span style="color:#00FF88;">⚙️ SNAP! The enemies are caught in the trap!</span>`, 'term-loot');
                        termAppend(`<span style="color:#FFD700;">🐌 Enemy attack speed slowed by 50%! (+${slowAmount}s to attack timer)</span>`, 'term-highlight');
                    }
                    
                    updateHud();
                    renderActionBar();
                }, 2000);
            });
        }

        function playerDefend() {
            const cs = gameState.combatState;
            const p  = gameState.player;
            if (!cs || cs.hitsLeft <= 0) return;
            if ((p.baseClass || p.class) !== 'warrior') return; // Warriors only
            cs.shieldActive = true;
            cs.hitsLeft     = 0;   // end player's turn
            renderActionBar();
            // Calculate the actual defense bonus for the terminal message
            const _arm    = ARMOR[p.armor] || { baseDefense: 0, quality: 'poor' };
            const _qb     = getQualityBonus(_arm.quality, _arm.baseDefense);
            const _baseDef = _arm.baseDefense + _qb + (p.con || 0);
            const _bonusDef = Math.floor(_baseDef * 0.5);
            termAppend(`🛡️ You raise your shield — defense increased by ${_bonusDef} (${_baseDef} → ${_baseDef + _bonusDef}) until next turn.`);
        }

        // ═══════════════════════════════════════════════════════════════
        // SHOW PLAYER STATS
        // ═══════════════════════════════════════════════════════════════
        function showPlayerStats() {
            const p = gameState.player;
            if (!p) return;

            termAppend('', 'term-separator');
            termAppend('═══════════════════════════════════════════════════', 'term-highlight');
            termAppend(`📊 CHARACTER STATS - ${p.name.toUpperCase()}`, 'term-highlight');
            termAppend('═══════════════════════════════════════════════════', 'term-highlight');
            termAppend('');

            // Basic Info
            const className = p.hasEvolved ? getAdvancedClassName(p) : (p.className || p.class);
            termAppend(`<span style="color:var(--highlight-color);">Name:</span> ${p.name}`);
            termAppend(`<span style="color:var(--highlight-color);">Class:</span> ${className} ${p.hasEvolved ? '<span style="color:#FFD700;">⚡ (Evolved)</span>' : ''}`);
            termAppend(`<span style="color:var(--highlight-color);">Level:</span> ${p.level}`);
            termAppend('');

            // Resources
            const gemHp  = p._gemHpBonus  || 0;
            const gemMp  = p._gemMpBonus  || 0;
            const gemDef = p._gemDefBonus || 0;
            termAppend(`<span style="color:#ff6666;">❤️  HP:</span> ${p.hp} / ${p.maxHp}${gemHp > 0 ? ` <span style="color:#aaffaa;">(+${gemHp} from gems)</span>` : ''}`);
            termAppend(`<span style="color:#4488ff;">✨ MP:</span> ${p.mp} / ${p.maxMp}${gemMp > 0 ? ` <span style="color:#aaffaa;">(+${gemMp} from gems)</span>` : ''}`);
            termAppend(`<span style="color:#FFD700;">💰 Gold:</span> ${p.gold}g`);
            termAppend(`<span style="color:var(--text-color);">⭐ XP:</span> ${p.xp} / ${p.xpToNext} (${Math.floor((p.xp / p.xpToNext) * 100)}%)`);
            termAppend('');

            // Combat Stats
            termAppend('<span style="color:var(--highlight-color);">═══ COMBAT STATS ═══</span>');

            // Primary Stats
            if (p.str !== undefined) {
                termAppend(`<span style="color:#FF8800;">STR:</span> ${p.str} (Strength)`);
                termAppend(`<span style="color:#00FF88;">DEX:</span> ${p.dex} (Dexterity)`);
                termAppend(`<span style="color:#8888FF;">WIS:</span> ${p.wis} (Wisdom)`);
                termAppend(`<span style="color:#FF88FF;">CHA:</span> ${p.cha} (Charisma)`);
                termAppend(`<span style="color:#FFAA00;">CON:</span> ${p.con} (Constitution)`);
                termAppend(`<span style="color:#FFD700;">LCK:</span> ${p.lck} (Luck)`);
                termAppend('');
            }

            // Legacy stats
            if (p.strength !== undefined) {
                termAppend(`<span style="color:#FF8800;">Strength:</span> ${p.strength}`);
                termAppend(`<span style="color:#00AAFF;">Defense:</span> ${p.defense}`);
                termAppend(`<span style="color:#8888FF;">Magic:</span> ${p.magic}`);
                termAppend(`<span style="color:#00FF88;">Speed:</span> ${p.speed}`);
                termAppend('');
            }

            // Derived Stats — quality-adjusted
            const weapon = WEAPONS[p.weapon];
            const armor  = ARMOR[p.armor];

            // Weapon damage with quality bonus
            let weaponDmgStr = '0';
            let weaponMagStr = '';
            let gemMeleeDmg = 0, gemMagicDmg = 0, gemCritBonus = 0;
            let gemLightning = 0, gemFire = 0, gemFrost = 0, gemLifesteal = 0, gemPoison = 0, gemPierce = 0, gemSpellLeech = 0;

            if (weapon && !weapon.unarmed) {
                const qc  = QUALITY_CONFIG[weapon.quality];
                const qb  = getQualityBonus(weapon.quality, weapon.baseDamage);
                const tMin = weapon.baseDamage + qb;
                const tMax = (weapon.maxDamage || weapon.baseDamage) + getQualityBonus(weapon.quality, (weapon.maxDamage || weapon.baseDamage) - weapon.baseDamage);
                weaponDmgStr = `<span style="color:${qc?.color||'#0f0'};">${tMin}-${tMax}</span>`;
                if (weapon.baseMagicDamage) {
                    const tMag = weapon.baseMagicDamage + Math.floor(weapon.baseMagicDamage * (qc?.bonusPct || 0));
                    weaponMagStr = ` | <span style="color:#8888FF;">MAG: +${tMag}</span>`;
                }

                // Tally gem combat bonuses from weapon
                for (const g of (weapon.gems || [])) {
                    if (!g?.stats) continue;
                    gemMeleeDmg  += g.stats.weaponDmg    || 0;
                    gemMagicDmg  += g.stats.spellPower   || 0;
                    gemCritBonus += g.stats.critBonus     || 0;
                    gemLightning += g.stats.lightningDmg  || 0;
                    gemFire      += g.stats.fireDmg       || 0;
                    gemFrost     += g.stats.frostDmg      || 0;
                    gemLifesteal += g.stats.lifesteal     || 0;
                    gemPoison    += g.stats.poisonChance  || 0;
                    gemPierce    += g.stats.armorPierce   || 0;
                    gemSpellLeech+= g.stats.spellLeech    || 0;
                }
            }

            // Armor defense with quality bonus + gem bonus
            let armorDefStr = '0';
            let armorMagStr = '';
            if (armor && !armor.unarmored) {
                const aqc  = QUALITY_CONFIG[armor.quality];
                const aqb  = getQualityBonus(armor.quality, armor.baseDefense);
                const tDef = armor.baseDefense + aqb + (p.con || 0) + gemDef;
                const baseDef = armor.baseDefense + aqb + (p.con || 0);
                armorDefStr = gemDef > 0
                    ? `<span style="color:${aqc?.color||'#0f0'};">${baseDef}</span> <span style="color:#aaffaa;">(+${gemDef} gems = ${tDef} total)</span>`
                    : `<span style="color:${aqc?.color||'#0f0'};">${baseDef}</span>`;
                if (armor.baseMagicBonus) {
                    const tMag = armor.baseMagicBonus + Math.floor(armor.baseMagicBonus * (aqc?.bonusPct || 0));
                    armorMagStr = ` | <span style="color:#8888FF;">MAG+: ${tMag}</span>`;
                }

                // Tally gem combat bonuses from armor too
                for (const g of (armor.gems || [])) {
                    if (!g?.stats) continue;
                    gemMeleeDmg  += g.stats.weaponDmg    || 0;
                    gemCritBonus += g.stats.critBonus     || 0;
                    gemLightning += g.stats.lightningDmg  || 0;
                    gemFire      += g.stats.fireDmg       || 0;
                    gemFrost     += g.stats.frostDmg      || 0;
                    gemLifesteal += g.stats.lifesteal     || 0;
                    gemPoison    += g.stats.poisonChance  || 0;
                    gemPierce    += g.stats.armorPierce   || 0;
                }
            }

            const totalCrit = calcCritChance(p.lck || 0, p) + gemCritBonus;
            termAppend(`<span style="color:#FF4444;">⚔️  Weapon Damage:</span> ${weaponDmgStr}${weaponMagStr}`);
            if (gemMeleeDmg > 0)  termAppend(`<span style="color:#aaffaa;">   💎 +${gemMeleeDmg} melee dmg from gems</span>`);
            if (gemMagicDmg > 0)  termAppend(`<span style="color:#aaffaa;">   💎 +${gemMagicDmg} spell power from gems</span>`);
            termAppend(`<span style="color:#4488FF;">🛡️  Armor Defense:</span> ${armorDefStr}${armorMagStr}`);
            termAppend(`<span style="color:#FFD700;">🎯 Crit Chance:</span> ${totalCrit}%${gemCritBonus > 0 ? ` <span style="color:#aaffaa;">(+${gemCritBonus}% from gems)</span>` : ''}`);

            // Gem combat bonuses summary
            const elemTotal = gemLightning + gemFire + gemFrost;
            if (elemTotal > 0 || gemLifesteal > 0 || gemPoison > 0 || gemPierce > 0 || gemSpellLeech > 0) {
                termAppend('');
                termAppend('<span style="color:var(--highlight-color);">═══ GEM COMBAT BONUSES ═══</span>');
                if (gemLightning > 0) termAppend(`<span style="color:#88CCFF;">   ⚡ Lightning Damage: +${gemLightning}</span>`);
                if (gemFire > 0)      termAppend(`<span style="color:#FF6600;">   🔥 Fire Damage: +${gemFire}</span>`);
                if (gemFrost > 0)     termAppend(`<span style="color:#88EEFF;">   ❄️  Frost Damage: +${gemFrost}</span>`);
                if (gemLifesteal > 0) termAppend(`<span style="color:#FF4488;">   🩸 Lifesteal: ${gemLifesteal}% of damage dealt</span>`);
                if (gemPoison > 0)    termAppend(`<span style="color:#00EE00;">   💀 Poison Chance: ${gemPoison}%</span>`);
                if (gemPierce > 0)    termAppend(`<span style="color:#FFAA00;">   🗡️  Armor Pierce: ${gemPierce}%</span>`);
                if (gemSpellLeech > 0)termAppend(`<span style="color:#AA55FF;">   🔮 Spell Leech: ${gemSpellLeech}% → MP</span>`);
            }

            // Rogue Shadow Strike
            const baseClass = p.baseClass || p.class;
            if (baseClass === 'rogue') {
                termAppend('');
                if (p.shadowStrikeReady) {
                    termAppend(`<span style="color:#8888FF;">🌑 Shadow Strike:</span> READY! (Next attack guaranteed crit)`);
                } else {
                    termAppend(`<span style="color:#666666;">🌑 Shadow Strike:</span> On cooldown`);
                }
            }

            // Class damage multiplier if evolved
            if (p.hasEvolved) {
                termAppend('');
                const dmgMult = getClassDamageMultiplier(p);
                termAppend(`<span style="color:#FFD700;">⚡ Damage Multiplier:</span> ${dmgMult}x (Class Evolution)`);
            }

            termAppend('');

            // Equipment
            termAppend('<span style="color:var(--highlight-color);">═══ EQUIPMENT ═══</span>');

            // Weapon with gems
            if (weapon && !weapon.unarmed) {
                const qc = QUALITY_CONFIG[weapon.quality];
                termAppend(`<span style="color:#FFD700;">Weapon:</span> <span style="color:${qc?.color||'#0f0'};">${weapon.name}</span>`);
                if (weapon.modifiers && weapon.modifiers.length > 0 && typeof WEAPON_MODIFIERS !== 'undefined') {
                    weapon.modifiers.forEach(mk => {
                        const mod = WEAPON_MODIFIERS[mk];
                        if (mod) termAppend(`<span style="color:${mod.color};">   • ${mod.name}${mod.minDamage ? ` (${mod.minDamage}-${mod.maxDamage})` : ''}</span>`);
                    });
                }
                const wSlots = getGemSlots(weapon.quality);
                if (wSlots > 0) {
                    const wGems = weapon.gems || [];
                    for (let i = 0; i < wSlots; i++) {
                        const g = wGems[i];
                        if (g) {
                            termAppend(`<span style="color:${g.color};">   💎 ${g.name}: ${g.description}</span>`);
                        } else {
                            termAppend(`<span style="color:#333;">   ○ Empty gem slot</span>`);
                        }
                    }
                }
            } else {
                termAppend(`<span style="color:#FFD700;">Weapon:</span> ${weapon ? weapon.name : 'None'}`);
            }

            // Armor with gems
            if (armor && !armor.unarmored) {
                const aqc = QUALITY_CONFIG[armor.quality];
                termAppend(`<span style="color:#4488FF;">Armor:</span> <span style="color:${aqc?.color||'#0f0'};">${armor.name}</span>`);
                const aSlots = getGemSlots(armor.quality);
                if (aSlots > 0) {
                    const aGems = armor.gems || [];
                    for (let i = 0; i < aSlots; i++) {
                        const g = aGems[i];
                        if (g) {
                            termAppend(`<span style="color:${g.color};">   💎 ${g.name}: ${g.description}</span>`);
                        } else {
                            termAppend(`<span style="color:#333;">   ○ Empty gem slot</span>`);
                        }
                    }
                }
            } else {
                termAppend(`<span style="color:#4488FF;">Armor:</span> ${armor ? armor.name : 'None'}`);
            }

            termAppend('');

            // Active Buffs
            if (p.activeBuffs && Object.keys(p.activeBuffs).length > 0) {
                termAppend('<span style="color:var(--highlight-color);">═══ ACTIVE BUFFS ═══</span>');
                for (const [buffType, buff] of Object.entries(p.activeBuffs)) {
                    if (Date.now() < buff.endTime) {
                        const timeLeft = Math.ceil((buff.endTime - Date.now()) / 1000);
                        const minutes = Math.floor(timeLeft / 60);
                        const seconds = timeLeft % 60;
                        const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
                        let buffName = buffType.replace('buff_', '').toUpperCase();
                        termAppend(`<span style="color:#00FF88;">✨ ${buffName}:</span> +${buff.power} (${timeStr})`);
                    }
                }
                termAppend('');
            }

            // Progress
            termAppend('<span style="color:var(--highlight-color);">═══ PROGRESSION ═══</span>');
            termAppend(`<span style="color:#FFD700;">Defeated Masters:</span> ${p.defeatedMasters?.length || 0}`);
            termAppend(`<span style="color:#4488FF;">Unlocked Areas:</span> ${p.unlockedAreas?.length || 0}`);
            termAppend(`<span style="color:#FF8800;">Known Spells:</span> ${p.knownSpells?.length || 0}`);
            termAppend(`<span style="color:#00FF88;">Inventory Items:</span> ${p.inventory?.length || 0}`);

            termAppend('');
            termAppend('═══════════════════════════════════════════════════', 'term-highlight');
        }
        function attemptFlee() {
            const cs = gameState.combatState;
            if (!cs) return;
            
            // find first available pip
            let pipIndex = -1;
            for (let i = 0; i < cs.pipAvailable.length; i++) {
                if (cs.pipAvailable[i]) {
                    pipIndex = i;
                    break;
                }
            }
            if (pipIndex === -1) return;

            clearInterval(gameState.combatTimer);
            const p        = gameState.player;
            const fleePct  = Math.min(70, 30 + (p.dex||0)*3);
            if (Math.random()*100 < fleePct) {
                gameState.combatState = null;
                haptic('flee');
                termAppend('You successfully fled!', 'term-highlight', () => {
                    renderActionBar();
                });
            } else {
                cs.pipAvailable[pipIndex] = false;
                cs.pipTimers[pipIndex] = gameState.player ? getPipCooldown(gameState.player) : BASE_PIP_COOLDOWN;
                renderActionBar();
                haptic('fleeFailure');
                termAppend('Failed to escape!', 'term-error');
                startCombatTimer();
            }
        }

        // ═══════════════════════════════════════════════════════════════
        // POTION MENU (in action bar)
        // ═══════════════════════════════════════════════════════════════
        // ═══════════════════════════════════════════════════════════════
        // UNIFIED COMBAT INVENTORY (replaces old potion menu in exploration)
        // ═══════════════════════════════════════════════════════════════
        function showCombatInventory() { showInventoryOverlay(); }

        function castHealingSpellOutOfCombat(spellKey) {
            const p = gameState.player;
            const classKey = p.baseClass || p.class;
            const spellTree = CLASS_SPELL_TREES[classKey]?.spellTree || {};
            const spell = SPELLS[spellKey] || spellTree[spellKey];
            
            if (!spell) {
                termAppend('Spell not found!', 'term-error');
                return;
            }
            
            // Check if player has enough MP
            if (p.mp < spell.mpCost) {
                termAppend(`Not enough MP to cast ${spell.name}! (Need ${spell.mpCost} MP)`, 'term-error');
                return;
            }
            
            // Check if already at full HP
            if (p.hp >= p.maxHp) {
                termAppend(`You're already at full health!`, 'term-warning');
                return;
            }
            
            // Consume MP
            p.mp -= spell.mpCost;
            
            // Calculate healing amount
            const minPower = spell.minPower || spell.power;
            const maxPower = spell.maxPower || spell.power;
            const healRoll = Math.floor(Math.random() * (maxPower - minPower + 1)) + minPower;
            const healAmount = healRoll + (p.wis || 0);
            
            // Apply healing
            const actualHeal = Math.min(healAmount, p.maxHp - p.hp);
            p.hp = Math.min(p.maxHp, p.hp + actualHeal);
            
            // Show message
            termAppend(`<span style="color:#00FF00;">✨ You cast ${spell.name} and restore <strong>${actualHeal} HP</strong>!</span>`, 'term-loot');
            termAppend(`HP: ${p.hp}/${p.maxHp} | MP: ${p.mp}/${p.maxMp}`, 'term-dim');
            
            // Save game
            saveGame();
            
            // Update UI
            updateHud();
        }

        function showPotionMenu() {
            const cs = gameState.combatState;
            if (!cs) return;
            const p = gameState.player;
            const inDungeon = !!gameState.dungeon;
            const potions = {};
            p.inventory.forEach(ik => {
                const item = ITEMS[ik];
                if (!item) return;
                const isRecall = item.subtype === 'recall';
                // recall only available outside combat (cs exists here so block it)
                if (isRecall) return;
                if (
                    ['heal_hp','heal_mp','full_restore'].includes(item.subtype) ||
                    item.subtype?.startsWith('buff_')
                ) {
                    if (!potions[ik]) potions[ik] = { item: item, count: 0 };
                    potions[ik].count++;
                }
            });
            const keys = Object.keys(potions);
            if (keys.length === 0) {
                termAppend('You have no potions!', 'term-error');
                renderActionBar();
                return;
            }
            
            // Set action mode for potion menu
            cs.actionMode = 'potion_list';
            
            const ab = document.getElementById('actionBar');
            let html = '<div style="color:var(--highlight-color);font-size:10px;margin-bottom:4px;">USE POTION (No pip cost!):</div>';
            html += '<div style="display:flex;flex-wrap:wrap;gap:4px;max-width:100%;justify-content:flex-start;">';
            keys.forEach(pk => {
                const pd  = potions[pk];
                const item = pd.item;
                
                // Color based on potion type
                let col = '#00FF00';
                if (item.subtype === 'recall') col = '#AA88FF';
                else if (item.subtype === 'heal_hp') col = '#ff4444';
                else if (item.subtype === 'heal_mp') col = '#4488ff';
                else if (item.subtype === 'full_restore') col = '#FFD700';
                else if (item.subtype === 'buff_str') col = '#FF8800';
                else if (item.subtype === 'buff_def') col = '#00AAFF';
                else if (item.subtype === 'buff_xp') col = '#FFD700';
                else if (item.subtype === 'buff_gold') col = '#FFD700';
                else if (item.subtype === 'buff_magic') col = '#8888FF';
                else if (item.subtype === 'buff_damage') col = '#FF0000';
                else if (item.subtype === 'buff_invuln') col = '#AAAAAA';
                else if (item.subtype === 'buff_luck') col = '#FFAA00';
                else if (item.subtype === 'buff_regen') col = '#00FF88';
                else if (item.subtype === 'buff_speed') col = '#00FF00';
                else if (item.subtype === 'buff_crit') col = '#FF00FF';
                
                // Icon based on potion type
                let icon = '🧪';
                if (item.subtype === 'recall') icon = '🌀';
                else if (item.subtype === 'heal_hp') icon = '❤️';
                else if (item.subtype === 'heal_mp') icon = '💙';
                else if (item.subtype === 'full_restore') icon = '✨';
                else if (item.subtype === 'buff_str') icon = '💪';
                else if (item.subtype === 'buff_def') icon = '🛡️';
                else if (item.subtype === 'buff_xp') icon = '⭐';
                else if (item.subtype === 'buff_gold') icon = '💰';
                else if (item.subtype === 'buff_magic') icon = '🔮';
                else if (item.subtype === 'buff_damage') icon = '⚔️';
                else if (item.subtype === 'buff_invuln') icon = '🗿';
                else if (item.subtype === 'buff_luck') icon = '🍀';
                else if (item.subtype === 'buff_regen') icon = '💚';
                else if (item.subtype === 'buff_speed') icon = '⚡';
                else if (item.subtype === 'buff_crit') icon = '🎯';
                
                html += `<button onclick="usePotion('${pk}')" style="
                    color:${col};
                    border-color:${col};
                    background:var(--secondary-bg);
                    padding:4px 6px;
                    min-width:70px;
                    max-width:90px;
                    height:auto;
                    font-size:11px;
                    text-align:center;
                    cursor:pointer;
                    border:1px solid ${col};
                    flex:0 0 auto;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                ">
                    ${icon} ${item.name.substring(0, 12)}${item.name.length > 12 ? '...' : ''} x${pd.count}
                </button>`;
            });
            html += `<button onclick="renderActionBar();" style="
                padding:4px 8px;
                min-width:60px;
                background:var(--secondary-bg);
                border:1px solid var(--border-color);
                color:var(--text-color);
                cursor:pointer;
                font-size:11px;
                flex:0 0 auto;
            ">❌ Back</button>`;
            html += '</div>';
            ab.innerHTML = html;
        }

        function usePotion(potionKey) {
            const potion = ITEMS[potionKey];
            const p      = gameState.player;
            let msg;

            // ── Recall Potion ──────────────────────────────────────────────
            if (potion.subtype === 'recall') {
                if (!gameState.dungeon) {
                    termAppend('<span style="color:#ff8800;">⚠ Recall Potions only work inside dungeons!</span>');
                    renderActionBar();
                    return;
                }
                if (gameState.combatState) {
                    termAppend('<span style="color:#ff4444;">⚠ You cannot recall while in combat! Defeat or flee your enemies first.</span>');
                    renderActionBar();
                    return;
                }
                // Consume and recall
                const idx = p.inventory.indexOf(potionKey);
                if (idx !== -1) p.inventory.splice(idx, 1);
                updateHud();
                const dest = gameState.currentTown || 'town1';
                termAppend(`<span style="color:#AA88FF;">🌀 The Recall Potion dissolves in your hand — a swirling portal opens beneath you...</span>`);
                termAppend(`<span style="color:#AA88FF;">You are swept away to safety!</span>`);
                setTimeout(() => {
                    gameState.dungeon      = null;
                    gameState.combatState  = null;
                    if (gameState.combatTimer) { clearInterval(gameState.combatTimer); gameState.combatTimer = null; }
                    document.getElementById('actionBar').innerHTML = '';
                    document.body.classList.remove('terminal-mode');
                    gameState._terminalOpen = false;
                    saveGame();
                    showTown(dest);
                }, 1800);
                return;
            }

            if (potion.subtype === 'heal_hp') {
                const actual = Math.min(p.maxHp - p.hp, potion.power);
                p.hp = Math.min(p.maxHp, p.hp + actual);
                msg = `Used ${potion.name} – restored <span style="color:#88ff88;">${actual} HP!</span>`;
            } else if (potion.subtype === 'heal_mp') {
                const actual = Math.min(p.maxMp - p.mp, potion.power);
                p.mp = Math.min(p.maxMp, p.mp + potion.power);
                msg = `Used ${potion.name} – restored <span style="color:#88ff88;">${actual} MP!</span>`;
            } else if (potion.subtype === 'full_restore') {
                const hpR = p.maxHp - p.hp, mpR = p.maxMp - p.mp;
                p.hp = p.maxHp; p.mp = p.maxMp;
                msg = `Used ${potion.name} – fully restored <span style="color:#88ff88;">${hpR} HP & ${mpR} MP!</span>`;
            } else if (potion.subtype === 'buff_xp') {
                // XP Boost buff
                applyBuff(p, 'xp_boost', potion.duration || 900000, potion.power); // 15 min default
                msg = `Used ${potion.name} – <span style="color:#FFD700;">+${potion.power}% XP for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_str') {
                // Strength buff
                applyBuff(p, 'strength_boost', potion.duration || 300000, potion.power); // 5 min default
                msg = `Used ${potion.name} – <span style="color:#FF8800;">+${potion.power} Strength for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_def') {
                // Defense buff
                applyBuff(p, 'defense_boost', potion.duration || 300000, potion.power); // 5 min default
                msg = `Used ${potion.name} – <span style="color:#00AAFF;">+${potion.power} Defense for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_crit') {
                // Crit chance buff
                applyBuff(p, 'crit_boost', potion.duration || 300000, potion.power); // 5 min default
                msg = `Used ${potion.name} – <span style="color:#FFD700;">+${potion.power}% Crit Chance for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_speed') {
                // Speed buff (faster pip regen)
                applyBuff(p, 'speed_boost', potion.duration || 300000, potion.power); // 5 min default
                msg = `Used ${potion.name} – <span style="color:#00FF00;">+${potion.power}% Attack Speed for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_gold') {
                // Gold boost buff
                applyBuff(p, 'gold_boost', potion.duration || 900000, potion.power);
                msg = `Used ${potion.name} – <span style="color:#FFD700;">+${potion.power}% Gold for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_magic') {
                // Magic buff
                applyBuff(p, 'magic_boost', potion.duration || 300000, potion.power);
                msg = `Used ${potion.name} – <span style="color:#8888FF;">+${potion.power} Magic for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_damage') {
                // Damage boost buff
                applyBuff(p, 'damage_boost', potion.duration || 180000, potion.power);
                msg = `Used ${potion.name} – <span style="color:#FF0000;">+${potion.power}% Damage for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_invuln') {
                // Damage reduction buff
                applyBuff(p, 'damage_reduction', potion.duration || 120000, potion.power);
                msg = `Used ${potion.name} – <span style="color:#AAAAAA;">+${potion.power}% Damage Resist for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_luck') {
                // Luck buff
                applyBuff(p, 'luck_boost', potion.duration || 600000, potion.power);
                msg = `Used ${potion.name} – <span style="color:#FFD700;">+${potion.power} Luck for ${(potion.duration/60000)} minutes!</span>`;
            } else if (potion.subtype === 'buff_regen') {
                // Regeneration buff
                applyBuff(p, 'regen_boost', potion.duration || 300000, potion.power);
                msg = `Used ${potion.name} – <span style="color:#00FF88;">+${potion.power} HP/sec for ${(potion.duration/60000)} minutes!</span>`;
            }
            const idx = p.inventory.indexOf(potionKey);
            if (idx !== -1) p.inventory.splice(idx, 1);
            updateHud();
            
            // Reset to main combat menu after using potion
            const cs = gameState.combatState;
            if (cs) {
                cs.actionMode = 'main';
            }
            
            renderActionBar();
            termAppend(msg);   // no callback – timer keeps ticking, player can still act
        }
        
        // ═══════════════════════════════════════════════════════════════
        // BUFF SYSTEM - Temporary stat boosts from potions
        // ═══════════════════════════════════════════════════════════════
        function applyBuff(player, buffType, duration, power) {
            if (!player.activeBuffs) player.activeBuffs = {};
            
            // If buff already active, extend duration and stack power
            if (player.activeBuffs[buffType]) {
                const existing = player.activeBuffs[buffType];
                clearTimeout(existing.timer);
                existing.power = Math.min(existing.power + power, power * 3); // Cap at 3x
                existing.endTime = Date.now() + duration;
            } else {
                player.activeBuffs[buffType] = {
                    power: power,
                    endTime: Date.now() + duration
                };
            }
            
            // Set timer to remove buff
            player.activeBuffs[buffType].timer = setTimeout(() => {
                delete player.activeBuffs[buffType];
                termAppend(`<span style="color:#888;">Your ${buffType.replace('_', ' ')} has worn off.</span>`, 'term-dim');
            }, duration);
        }
        
        function getActiveBuff(player, buffType) {
            if (!player.activeBuffs || !player.activeBuffs[buffType]) return 0;
            const buff = player.activeBuffs[buffType];
            if (Date.now() > buff.endTime) {
                delete player.activeBuffs[buffType];
                return 0;
            }
            return buff.power;
        }
        
        // ═══════════════════════════════════════════════════════════════
        // POTION MENU - EXPLORATION (Out of Combat)
        // ═══════════════════════════════════════════════════════════════
        function showPotionMenuExplore() {
            const p = gameState.player;
            const ab = document.getElementById('actionBar');
            const inDungeon = !!gameState.dungeon;
            
            // Count all usable potions (healing + buffs + recall if in dungeon)
            const potions = {};
            p.inventory.forEach(ik => {
                const item = ITEMS[ik];
                if (!item) return;
                const isRecall = item.subtype === 'recall';
                if (isRecall && !inDungeon) return; // recall only usable in dungeon
                if (
                    isRecall ||
                    ['heal_hp','heal_mp','full_restore'].includes(item.subtype) ||
                    item.subtype?.startsWith('buff_')
                ) {
                    if (!potions[ik]) potions[ik] = { item, count: 0 };
                    potions[ik].count++;
                }
            });
            
            const keys = Object.keys(potions);
            if (keys.length === 0) {
                ab.innerHTML = `
                    <div style="color:var(--error-color);font-size:10px;margin-bottom:4px;">You have no potions!</div>
                    <button onclick="renderActionBar()">← BACK</button>
                `;
                return;
            }
            
            // Color + icon lookup (mirrors combat potion menu)
            function potionColor(subtype) {
                if (subtype==='recall') return '#AA88FF';
                if (subtype==='heal_hp') return '#ff4444';
                if (subtype==='heal_mp') return '#4488ff';
                if (subtype==='full_restore') return '#FFD700';
                if (subtype==='buff_str') return '#FF8800';
                if (subtype==='buff_def') return '#00AAFF';
                if (subtype==='buff_xp') return '#FFD700';
                if (subtype==='buff_gold') return '#FFD700';
                if (subtype==='buff_magic') return '#8888FF';
                if (subtype==='buff_damage') return '#FF0000';
                if (subtype==='buff_invuln') return '#AAAAAA';
                if (subtype==='buff_luck') return '#FFAA00';
                if (subtype==='buff_regen') return '#00FF88';
                if (subtype==='buff_speed') return '#00FF00';
                if (subtype==='buff_crit') return '#FF00FF';
                return '#00FF00';
            }
            function potionIcon(subtype) {
                if (subtype==='recall') return '🌀';
                if (subtype==='heal_hp') return '❤️';
                if (subtype==='heal_mp') return '💙';
                if (subtype==='full_restore') return '✨';
                if (subtype==='buff_str') return '💪';
                if (subtype==='buff_def') return '🛡️';
                if (subtype==='buff_xp') return '⭐';
                if (subtype==='buff_gold') return '💰';
                if (subtype==='buff_magic') return '🔮';
                if (subtype==='buff_damage') return '⚔️';
                if (subtype==='buff_invuln') return '🗿';
                if (subtype==='buff_luck') return '🍀';
                if (subtype==='buff_regen') return '💚';
                if (subtype==='buff_speed') return '⚡';
                if (subtype==='buff_crit') return '🎯';
                return '🧪';
            }

            let html = `<div style="color:var(--highlight-color);font-size:10px;margin-bottom:4px;">USE POTION (HP: ${p.hp}/${p.maxHp} | MP: ${p.mp}/${p.maxMp}):</div>`;
            html += `<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-start;">`;
            
            keys.forEach(pk => {
                const pd  = potions[pk];
                const col = potionColor(pd.item.subtype);
                const icon = potionIcon(pd.item.subtype);
                const atFull = (pd.item.subtype === 'heal_hp' && p.hp >= p.maxHp) ||
                               (pd.item.subtype === 'heal_mp' && p.mp >= p.maxMp) ||
                               (pd.item.subtype === 'full_restore' && p.hp >= p.maxHp && p.mp >= p.maxMp);
                const shortName = pd.item.name.length > 12 ? pd.item.name.substring(0,12)+'…' : pd.item.name;
                html += `<button onclick="usePotionExplore('${pk}')" ${atFull ? 'disabled' : ''} style="
                    color:${col}; border:1px solid ${col};
                    background:var(--secondary-bg);
                    padding:4px 6px; min-width:70px; max-width:90px;
                    font-size:11px; flex:0 0 auto;
                    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
                    opacity:${atFull ? 0.4 : 1};
                ">${icon} ${shortName} x${pd.count}</button>`;
            });
            
            html += `<button onclick="renderActionBar()" style="
                padding:4px 8px; min-width:60px; flex:0 0 auto;
                background:var(--secondary-bg); border:1px solid var(--border-color);
                color:var(--text-color); font-size:11px;">❌ Back</button>`;
            html += `</div>`;
            ab.innerHTML = html;
        }
        
        function usePotionExplore(potionKey) {
            const potion = ITEMS[potionKey];
            const p = gameState.player;
            
            // ── Recall Potion ──────────────────────────────────────────────
            if (potion.subtype === 'recall') {
                if (!gameState.dungeon) {
                    termAppend('<span style="color:#ff8800;">⚠ Recall Potions only work inside dungeons!</span>');
                    return;
                }
                const idx2 = p.inventory.indexOf(potionKey);
                if (idx2 !== -1) p.inventory.splice(idx2, 1);
                updateHud();
                const dest = gameState.currentTown || 'town1';
                termAppend(`<span style="color:#AA88FF;">🌀 The Recall Potion dissolves in your hand — a swirling portal opens beneath you...</span>`);
                termAppend(`<span style="color:#AA88FF;">You are swept away to safety!</span>`);
                setTimeout(() => {
                    gameState.dungeon      = null;
                    gameState.combatState  = null;
                    if (gameState.combatTimer) { clearInterval(gameState.combatTimer); gameState.combatTimer = null; }
                    document.getElementById('actionBar').innerHTML = '';
                    document.body.classList.remove('terminal-mode');
                    gameState._terminalOpen = false;
                    saveGame();
                    showTown(dest);
                }, 1800);
                return;
            }

            let msg;
            if (potion.subtype === 'heal_hp') {
                const actual = Math.min(p.maxHp - p.hp, potion.power);
                if (actual === 0) {
                    msg = `You're already at full HP!`;
                } else {
                    p.hp = Math.min(p.maxHp, p.hp + actual);
                    msg = `Used ${potion.name} – restored <span style="color:#88ff88;">${actual} HP!</span>`;
                }
            } else if (potion.subtype === 'heal_mp') {
                const actual = Math.min(p.maxMp - p.mp, potion.power);
                if (actual === 0) {
                    msg = `You're already at full MP!`;
                } else {
                    p.mp = Math.min(p.maxMp, p.mp + potion.power);
                    msg = `Used ${potion.name} – restored <span style="color:#88ff88;">${actual} MP!</span>`;
                }
            } else if (potion.subtype === 'full_restore') {
                const hpR = p.maxHp - p.hp;
                const mpR = p.maxMp - p.mp;
                if (hpR === 0 && mpR === 0) {
                    msg = `You're already fully restored!`;
                } else {
                    p.hp = p.maxHp;
                    p.mp = p.maxMp;
                    msg = `Used ${potion.name} – fully restored <span style="color:#88ff88;">${hpR} HP & ${mpR} MP!</span>`;
                }
            }
            
            // Remove potion from inventory
            const idx = p.inventory.indexOf(potionKey);
            if (idx !== -1) p.inventory.splice(idx, 1);
            
            updateHud();
            termAppend(msg);
            
            // Refresh potion menu to show updated counts
            showPotionMenuExplore();
        }

        // ═══════════════════════════════════════════════════════════════
        // ENEMY ATTACK
        // ═══════════════════════════════════════════════════════════════
function enemyAttackSingle() {
    // ✅ Set the enemyInterrupted flag at the VERY START
    if (gameState.combatState) {
        gameState.combatState.enemyInterrupted = true;
    }
    // Enemy uses ONE charge, attacks once, then resets its own timer
    const cs       = gameState.combatState;
    const monsters = cs.monsters;
    const p        = gameState.player;

    // Defensive stats
    let armor = ARMOR[p.armor];
    
    // No armor equipped → bare skin (no_armor gives 0 defense)
    if (!armor) {
        if (p.armor && p.armor !== 'no_armor') {
            console.warn(`⚠️ Armor '${p.armor}' not found — treating as unarmored.`);
        }
        p.armor = 'no_armor';
        armor   = ARMOR['no_armor'] || { baseDefense: 0, baseMagicBonus: 0, quality: 'poor' };
    }
    
    const qBonus = getQualityBonus(armor.quality, armor.baseDefense);
    let totalDef = armor.baseDefense + qBonus + (p.con || 0);
    // ── GEM defense bonus ────────────────────────────────────────────
    {
        const _w = p.weapon ? WEAPONS[p.weapon] : null;
        const _a = p.armor  ? ARMOR[p.armor]   : null;
        const _allG = [...(_w?.gems || []), ...(_a?.gems || [])];
        for (const _g of _allG) {
            if (_g?.stats?.defenseBonus) totalDef += _g.stats.defenseBonus;
        }
    }
    // ── REND: temporarily reduced defense ───────────────────────────
    if (cs.playerRendReduction && cs.playerRendReduction > 0) {
        const rendLoss = Math.floor(totalDef * cs.playerRendReduction);
        totalDef = Math.max(0, totalDef - rendLoss);
    }

    // ── Warrior Shield: 70% chance to halve ALL incoming damage each attack ──
    const shieldTriggered = cs.shieldActive;
    if (cs.shieldActive && (gameState.sysop && gameState.sysop.authenticated)) {
        const _shieldBonus = Math.floor(totalDef * 0.5);
        termAppend(`<span style="color:#006688;">🛡️ [SHIELD] active — DEF: ${totalDef} + ${_shieldBonus} (50%) = ${totalDef + _shieldBonus}</span>`, 'term-dim');
    }
    if (shieldTriggered) totalDef = Math.floor(totalDef * 1.5);

    // Each monster in the pack gets ONE hit
    const hits = [];
    // ✅ Track enemies that died from thorns to prevent duplicate processing
    const enemiesKilledByThorns = new Set();

    monsters.forEach((enemy, i) => {

        // Decrement this enemy's timer
        if (enemy.timer > 0) {
            enemy.timer--;
        }
        
        // Skip if not ready to attack
        if (enemy.timer > 0) {
            return;
        }
        
        // Reset timer for next attack (10-15 seconds for subsequent attacks)
        enemy.timer = 10 + Math.floor(Math.random() * 6); // 10-15 seconds
        enemy.delay = enemy.timer;
        enemy._telegraphShown = false;
        enemy._pendingIntent = null;

        // Calculate intent for THIS enemy (each enemy gets its own)
        const intent = selectEnemyIntent(enemy);
        
        const eName = monsters.length > 1
            ? `<span style="color:${enemy.rarityColor};">${enemy.name} #${i + 1}</span>`
            : `<span style="color:${enemy.rarityColor};">${enemy.name}</span>`;

        // Check if enemy is feared
        if (gameState.combatState?.fearedEnemies?.[enemy.index]) {
            termAppend(`😨 ${enemy.name} is too terrified to attack!`, 'term-warning');
            delete gameState.combatState.fearedEnemies[enemy.index];
            return;
        }

        // God mode bypass
        if (p.godMode) {
            hits.push({ eName, godMode: true });
            return;
        }

        // ── SYSOP: enemy stat header (shown once per enemy per attack round) ──
        if (gameState.sysop && gameState.sysop.authenticated) {
            const eMin0 = Math.max(1, enemy.minDamage ?? Math.round(enemy.damage * 0.67));
            const eMax0 = Math.max(eMin0 + 1, enemy.maxDamage ?? Math.round(enemy.damage * 1.33));
            const _mpDisplay = (enemy.baseMp||0) > 0
                ? ` | MP: ${enemy.mp||0}/${enemy.baseMp||0}` : '';
            termAppend(`<span style="color:#553300;">` +
                `📋 [${enemy.name}] HP: ${enemy.hp}/${enemy.maxHp||enemy.hp} | Lv${enemy.level} ${enemy.rarity||'common'}` +
                ` | dmg range: ${eMin0}–${eMax0} | def: ${enemy.defense||0}` +
                _mpDisplay +
                `${enemy.magicAttack ? ' | ✨magic atk' : ''}` +
                `${(enemy.statusEffects||[]).length ? ` | status: ${enemy.statusEffects.map(s=>s.name||s).join(',')}` : ''}` +
                `</span>`, 'term-dim');
        }

        // ── Phase II: deduct MP and handle pure-debuff abilities ──────
        if (intent.isPureDebuff && intent.abilityDef) {
            const _debugCombat = gameState.sysop && gameState.sysop.authenticated;
            if ((intent.abilityMpCost || 0) > 0) {
                enemy.mp = Math.max(0, (enemy.mp || 0) - intent.abilityMpCost);
            }
            if (_debugCombat) {
                const _mpLeft = enemy.mp || 0;
                termAppend(`<span style="color:#553300;">  💙 [PURE DEBUFF] ${intent.abilityId} | MP cost: ${intent.abilityMpCost||0} | MP remaining: ${_mpLeft}</span>`, 'term-dim');
            }
            executeAbilitySideEffect(intent.abilityDef, p, cs, enemy);
            haptic('ability');
            hits.push({ eName, dmg: 0, isPureDebuff: true, abilityName: intent.abilityDef.name });
            return;
        }

        // ── Pick a random damage roll within the enemy's min/max range ──
        const eMin = Math.max(1, enemy.minDamage ?? Math.round(enemy.damage * 0.67));
        const eMax = Math.max(eMin + 1, enemy.maxDamage ?? Math.round(enemy.damage * 1.33));
        const rolledDamage = eMin + Math.floor(Math.random() * (eMax - eMin + 1));

        const _lvlMult = getLevelDamageMult(p.level, enemy.level);
        const _scaledBase = Math.max(1,
            Math.floor(rolledDamage * intent.damageMult * DAMAGE_SCALING.monsterDamageMult * _lvlMult.enemyDealt)
        );

        const _debugCombat = gameState.sysop && gameState.sysop.authenticated;
        const _constricted = cs.playerConstricted || false;
        const _dodgeChance = _constricted ? 0 : (calcDodgeChance(p.dex || 0) / 100);
        const _dodgeRoll   = Math.random();
        const _didDodge    = !_constricted && _dodgeRoll < _dodgeChance;
        if (_constricted && _debugCombat) termAppend('<span style="color:#553300;">  ⚠️ Player is constricted — dodge suppressed!</span>', 'term-dim');

        if (_debugCombat) {
            const DR_PER_POINT = 0.028;
            const _effectiveDR = Math.min(0.75, totalDef * DR_PER_POINT) * (1 - (intent.armorPiercing || 0));
            const _attackType  = enemy.magicAttack ? 'magic' : 'physical';
            const _postDR      = Math.max(1, Math.floor(_scaledBase * (1 - _effectiveDR)));
            termAppend(`<span style="color:#553300;">` +
                `⚔️ [ENEMY ATK] ${enemy.name} ` +
                `| base dmg: ${enemy.damage} | range: ${eMin}–${eMax} | rolled: ${rolledDamage}` +
                `${intent.damageMult !== 1 ? ` | intent×${intent.damageMult}` : ''}` +
                `${DAMAGE_SCALING.monsterDamageMult !== 1 ? ` | scale×${DAMAGE_SCALING.monsterDamageMult.toFixed(2)}` : ''}` +
                `${_lvlMult.enemyDealt !== 1 ? ` | lvl×${_lvlMult.enemyDealt.toFixed(2)}` : ''}` +
                ` → scaled: ${_scaledBase}` +
                `</span>`, 'term-dim');
            termAppend(`<span style="color:#553300;">` +
                `  [${_attackType}] DEF: ${totalDef} (armor ${(armor.baseDefense + qBonus)} + CON ${p.con||0})` +
                `${(intent.armorPiercing||0) > 0 ? ` | pierce: ${((intent.armorPiercing||0)*100).toFixed(0)}%` : ''}` +
                ` | DR: ${(_effectiveDR*100).toFixed(1)}% | after DR: ${_postDR}` +
                ` | dodge: rolled ${(_dodgeRoll*100).toFixed(2)}% / need ≤${(_dodgeChance*100).toFixed(1)}% → ${_didDodge ? '✅ DODGE' : '❌ no dodge'}` +
                `</span>`, 'term-dim');
        }

        // Calculate magic resistance
        const magicResist = enemy.magicAttack ? getMagicResist(p) : 0;

        // Calculate enemy armor piercing from quality
        const qualityPierce = {
            'uncommon': 0.10,
            'rare': 0.20,
            'epic': 0.35,
            'legendary': 0.50,
            'godly': 0.75
        }[enemy.rarity] || 0;

        const totalEnemyPierce = Math.min(1.0, (intent.armorPiercing || 0) + qualityPierce);

        const result = _didDodge
            ? { damage: 0, dodged: true, crit: false }
            : calculateDamage({
                attacker: enemy,
                defender: {
                    defense: totalDef,
                    magicDefense: totalDef,
                    magicResist: magicResist
                },
                base: _scaledBase,
                type: enemy.magicAttack ? 'magic' : 'physical',
                dodgeChance: 0,
                armorPiercing: totalEnemyPierce
            });

        if (result.dodged) {
            if (_debugCombat) termAppend(`<span style="color:#553300;">  → ✅ DODGED</span>`, 'term-dim');
            hits.push({ eName, dodged: true });
            return;
        }

        if (gameState.combatState?.blindedEnemies?.[enemy.index]) {
            if (Math.random() < 0.5) {
                termAppend(`✨ ${enemy.name} is blinded and misses its attack!`, 'term-warning');
                delete gameState.combatState.blindedEnemies[enemy.index];
                hits.push({ eName, dodged: true, blinded: true });
                return;
            } else {
                delete gameState.combatState.blindedEnemies[enemy.index];
                termAppend(`✨ ${enemy.name} is blinded but still manages to attack!`, 'term-dim');
            }
        }

        let finalDmg = result.damage;

        if (_debugCombat) {
            const _critStr = result.crit ? ' | 💀 CRIT!' : '';
            termAppend(`<span style="color:#553300;">  → final: <b>${finalDmg} dmg</b>${_critStr} | player HP: ${p.hp} → ${p.hp - finalDmg}</span>`, 'term-dim');
        }

        if (gameState.combatState.weakenedEnemy === enemy) {
            const originalDamage = finalDmg;
            finalDmg = Math.floor(finalDmg * 0.7);
            termAppend(`<span style="color:#AA00AA;">💔 ${enemy.name} is weakened! Damage reduced from ${originalDamage} to ${finalDmg}! 💔</span>`, 'term-dim');
        }

        if (gameState.combatState.blindedEnemy === enemy && Math.random() < 0.4) {
            termAppend(`<span style="color:#FFFF00;">💫 ${enemy.name} is blinded and misses its attack! 💫</span>`, 'term-warning');
            return;
        }

        if (gameState.combatState.confusedEnemy === enemy && Math.random() < 0.3) {
            const selfDamage = Math.max(1, Math.floor(finalDmg * 0.5));
            enemy.hp -= selfDamage;
            termAppend(`<span style="color:#FF00FF;">😵 ${enemy.name} is confused and hits itself for ${selfDamage} damage! 😵</span>`, 'term-warning');
            updateEnemyCards();
            checkCombatEnd();
            return;
        }

        const reflectBonus = getArmorModifierBonus('reflectChance');
        let reflectedDamage = 0;
        if (reflectBonus > 0 && Math.random() < (reflectBonus / 100)) {
            reflectedDamage = Math.max(1, Math.floor(finalDmg * 0.5));
            termAppend(`🪞 Your Reflective armor reflects ${reflectedDamage} damage back to ${enemy.name}!`, 'term-loot');
            haptic('ability');
        }

        const shockBonus = getArmorModifierBonus('shockChance');
        if (shockBonus > 0 && Math.random() < (shockBonus / 100)) {
            if (gameState.combatState && enemy) {
                if (!gameState.combatState.stunnedEnemies) gameState.combatState.stunnedEnemies = {};
                gameState.combatState.stunnedEnemies[enemy.index] = true;
                termAppend(`⚡ Your Static Discharge armor shocks ${enemy.name}! It is stunned and loses its next attack!`, 'term-loot');
                haptic('ability');
            }
        }

        // Declare _abilityDef here so it's in scope for all code below
        const _abilityDef = intent && intent.abilityDef;

        p.hp -= finalDmg;

        // ── STEP 1: Queue the attack message FIRST so it appears before retaliation ──
        const pendingMessages = [];

        // Leeching armor (heals player after hit)
        const leechBonus = getArmorModifierBonus('leechChance');
        if (leechBonus > 0 && Math.random() < (leechBonus / 100)) {
            const healAmount = Math.max(1, Math.floor(finalDmg * 0.3));
            const actualHeal = Math.min(p.maxHp - p.hp, healAmount);
            if (actualHeal > 0) {
                p.hp += actualHeal;
                pendingMessages.push({ text: `🩸 Your Leeching armor absorbs ${actualHeal} HP from the attack!`, cls: 'term-loot' });
                haptic('ability');
                updateHud();
            }
        }

        // ── STEP 2: Calculate thorns / reflect AFTER recording the attack ──
        let enemyDied = false;

        // Thorns (flat damage)
        const thornsDamage = getArmorModifierBonus('thornsDamage');
        if (thornsDamage > 0 && finalDmg > 0) {
            haptic('ability');
            enemy.hp -= thornsDamage;
            if (enemy.hp <= 0) {
                pendingMessages.push({ text: `⚔️ Your Barbed armor spikes deal ${thornsDamage} damage to ${enemy.name}!`, cls: 'term-loot' });
                pendingMessages.push({ text: `💀 ${enemy.name} dies from your armor spikes!`, cls: 'term-victory' });
                enemyDied = true;
                enemiesKilledByThorns.add(enemy);
            } else {
                pendingMessages.push({ text: `⚔️ Your Barbed armor spikes deal ${thornsDamage} damage to ${enemy.name}!`, cls: 'term-loot' });
            }
        }

        // Thorns (percent) — only if not already dead
        if (!enemyDied) {
            const thornsPercent = getArmorModifierBonus('thornsPercent');
            if (thornsPercent > 0 && finalDmg > 0) {
                const spikedDmg = Math.max(1, Math.floor(finalDmg * (thornsPercent / 100)));
                haptic('ability');
                enemy.hp -= spikedDmg;
                if (enemy.hp <= 0) {
                    pendingMessages.push({ text: `🩸 Your Spiked armor returns ${spikedDmg} damage (${thornsPercent}%) to ${enemy.name}!`, cls: 'term-loot' });
                    pendingMessages.push({ text: `💀 ${enemy.name} dies from your spiked armor!`, cls: 'term-victory' });
                    enemyDied = true;
                    enemiesKilledByThorns.add(enemy);
                } else {
                    pendingMessages.push({ text: `🩸 Your Spiked armor returns ${spikedDmg} damage (${thornsPercent}%) to ${enemy.name}!`, cls: 'term-loot' });
                }
            }
        }

        // Reflected damage — only if not already dead
        if (!enemyDied && reflectedDamage > 0) {
            enemy.hp -= reflectedDamage;
            if (enemy.hp <= 0) {
                pendingMessages.push({ text: `🪞 ${enemy.name} dies from reflected damage!`, cls: 'term-victory' });
                enemyDied = true;
                enemiesKilledByThorns.add(enemy);
            }
        }

        // ── STEP 3: Push hit record
        updateEnemyCards();
        hits.push({
            eName,
            dmg: finalDmg,
            crit: result.crit,
            abilityName: _abilityDef ? _abilityDef.name : null,
            shieldBlocked: shieldTriggered,
            pendingMessages,
            enemyDied: enemyDied,
            enemy: enemy
        });

        if (gameState.combatState?.stunnedEnemies?.[enemy.index]) {
            termAppend(`⚡ ${enemy.name} is stunned and cannot attack!`, 'term-warning');
            delete gameState.combatState.stunnedEnemies[enemy.index];
            hits.push({ eName, stunned: true });
            return;
        }

        cs.lastEnemyDamageDealt = finalDmg;
        haptic(result.crit ? 'enemyCrit' : 'enemyHit');
        
        const frostbiteBonus = getArmorModifierBonus('chillChance');
        if (frostbiteBonus > 0 && Math.random() < (frostbiteBonus / 100)) {
            if (gameState.combatState && enemy) {
                enemy.timer += 3;
                termAppend(`❄️ Your Frostbite armor chills ${enemy.name}! Their next attack is delayed!`, 'term-loot');
                haptic('ability');
            }
        }

        const blindBonus = getArmorModifierBonus('blindChance');
        if (blindBonus > 0 && Math.random() < (blindBonus / 100)) {
            if (gameState.combatState && enemy) {
                if (!gameState.combatState.blindedEnemies) gameState.combatState.blindedEnemies = {};
                gameState.combatState.blindedEnemies[enemy.index] = true;
                termAppend(`✨ Your Radiance armor blinds ${enemy.name}! Its next attack may miss!`, 'term-loot');
                haptic('ability');
            }
        }

        const fearBonus = getArmorModifierBonus('fearChance');
        if (fearBonus > 0 && Math.random() < (fearBonus / 100)) {
            if (gameState.combatState && enemy) {
                if (!gameState.combatState.fearedEnemies) gameState.combatState.fearedEnemies = {};
                gameState.combatState.fearedEnemies[enemy.index] = true;
                termAppend(`😱 Your Dreadful armor terrifies ${enemy.name}! It cowers in fear!`, 'term-loot');
                haptic('ability');
            }
        }

        const staggerBonus = getArmorModifierBonus('staggerChance');
        if (staggerBonus > 0 && Math.random() < (staggerBonus / 100)) {
            if (enemy._pendingIntent && enemy._pendingIntent.abilityDef) {
                const cancelledAbility = enemy._pendingIntent.abilityDef.name;
                enemy._pendingIntent = null;
                enemy._telegraphShown = false;
                termAppend(`💫 Your Staggering armor disrupts ${enemy.name}'s ${cancelledAbility}! The ability is cancelled!`, 'term-loot');
                haptic('ability');
            } else {
                enemy.timer += 2;
                termAppend(`💫 Your Staggering armor staggers ${enemy.name}! Their next attack is delayed!`, 'term-loot');
                haptic('ability');
            }
        }

        cs.lastEnemyDamageDealt = finalDmg;
        haptic(result.crit ? 'enemyCrit' : 'enemyHit');

        if (_abilityDef) {
            if ((intent.abilityMpCost || 0) > 0) {
                enemy.mp = Math.max(0, (enemy.mp || 0) - intent.abilityMpCost);
                if (_debugCombat) {
                    termAppend(`<span style="color:#553300;">  💙 MP cost: ${intent.abilityMpCost} | ${enemy.name} MP remaining: ${enemy.mp}/${enemy.baseMp||0}</span>`, 'term-dim');
                }
            }
            if (p.hp > 0) {
                executeAbilitySideEffect(_abilityDef, p, cs, enemy);
            }
        }

        if (_abilityDef && !result.crit) haptic('ability');
    });

    updateHud();

    // ✅ MODIFIED: afterAttack now waits for ALL messages to flush before processing rewards
    const afterAttack = () => {
        if (p.hp <= 0 && !p.godMode) {
            endCombat(false);
            return;
        }
        
        // ⭐ CRITICAL FIX: Short delay to ensure ALL thorns messages are displayed
        // before checkCombatEnd processes XP/gold/loot
        setTimeout(() => {
            checkCombatEnd();
            if (gameState.combatState && gameState.combatState.monsters?.length > 0) {
                renderActionBar();
                startCombatTimer();
            }
        }, 50);
    };

    if (hits.length === 0) {
        afterAttack();
        return;
    }

    hits.forEach((hit, i) => {
        const isLast = (i === hits.length - 1);

        const flushPending = () => {
            if (hit.pendingMessages && hit.pendingMessages.length) {
                hit.pendingMessages.forEach(msg => termAppend(msg.text, msg.cls));
            }
        };

        const lastCallback = isLast ? afterAttack : null;

        if (hit.godMode) {
            termAppend(
                `${hit.eName} attacks but you are <span class="term-highlight">INVINCIBLE!</span>`,
                null,
                isLast ? lastCallback : null
            );
        } else if (hit.dodged) {
            haptic('dodge');
            termAppend(
                `${hit.eName} attacks… <span style="color:#88ff88;">DODGED!</span>`,
                null,
                isLast ? lastCallback : null
            );
        } else {
            const critTag    = hit.crit
                ? ' <span style="color:#FF4444;">💀 ENEMY CRITICAL!</span>'
                : '';
            const shieldTag  = hit.shieldBlocked
                ? ' <span style="color:#00CCFF;">🛡️ SHIELD! (+50% DEF)</span>'
                : '';

            const abilityTag = hit.abilityName
                ? ` <span style="color:#FF8800;font-size:12px;">[${hit.abilityName}]</span>`
                : '';
            
            if (hit.isPureDebuff) {
                termAppend(
                    `${hit.eName} uses ${abilityTag}`,
                    null,
                    () => { flushPending(); if (isLast && lastCallback) lastCallback(); }
                );
            } else {
                termAppend(
                    `${hit.eName} attacks for <span class="dmg-enemy">${hit.dmg} damage!</span>${critTag}${shieldTag}${abilityTag}`,
                    null,
                    () => { 
                        flushPending(); 
                        if (isLast && lastCallback) lastCallback(); 
                    }
                );
            }
        }
    });
    
    // ✅ Clear the flag at the end
    setTimeout(() => {
        if (gameState.combatState) {
            gameState.combatState.enemyInterrupted = false;
        }
    }, 100);
}

// Calculate magic resistance from armor and class
function getMagicResist(player) {
    let resist = 0;
    
    // Check equipped armor for magicResist
    if (player.armor) {
        const armor = ARMOR[player.armor];
        if (armor && armor.magicResist) {
            resist += armor.magicResist;
        }
    }
    
    // Class-based innate resistance
    const classResist = {
        'warrior': 0,
        'paladin': 10,
        'cleric': 20,
        'rogue': 5,
        'mage': 30,
        'warlock': 25,
        'archer': 5,
        'hunter': 7,
        'runesmith': 15
    };
    
    resist += classResist[player.class] || 0;
    
    return Math.min(50, resist); // Cap at 50%
}

// ═══════════════════════════════════════════════════════════════
// CHECK / END COMBAT
// ═══════════════════════════════════════════════════════════════
function checkCombatEnd() {
    const cs = gameState.combatState;
    if (!cs || !cs.monsters || cs.monsters.length === 0) return;

    // Process ALL dead enemies, not just the current target
    let anyProcessed = false;
    
    // Loop backwards so we can safely splice
    for (let i = cs.monsters.length - 1; i >= 0; i--) {
        const monster = cs.monsters[i];
        
        if (monster.hp <= 0) {
            anyProcessed = true;
                if (!cs.killCount) cs.killCount = 0;
                    cs.killCount++;

            // ── ARMOR MODIFIER: Gluttonous (heal when killing an enemy) ──
            const gluttonousBonus = getArmorModifierBonus('killHeal');
            if (gluttonousBonus > 0) {
                const p = gameState.player;
                const actualHeal = Math.min(p.maxHp - p.hp, gluttonousBonus);
                if (actualHeal > 0) {
                    p.hp += actualHeal;
                    termAppend(`🍖 Your Gluttonous armor heals ${actualHeal} HP from defeating ${monster.name}!`, 'term-loot');
                    updateHud();
                }
            }
            
            // Calculate rewards for THIS enemy
            const baseXp = monster.xp || (monster.level * 10);
            const baseGold = monster.gold || (monster.level * 5);
            
            // ── ARMOR MODIFIER: Merchant's (gold bonus) ──
            const goldBonus = getArmorModifierBonus('goldBonus');
            let finalGold = baseGold;
            if (goldBonus > 0) {
                const bonusAmount = Math.floor(baseGold * (goldBonus / 100));
                finalGold = baseGold + bonusAmount;
                termAppend(`💰 Your Merchant's armor adds +${bonusAmount} gold!`, 'term-loot');
            }
            
            termAppend(
                `<span style="color:${monster.rarityColor};">${monster.name}</span> has been defeated!`,
                'term-victory'
            );
            
            termAppend(`Gained <span style="color:#FFD700;">${baseXp} XP</span> and <span style="color:#FFD700;">${finalGold} Gold!</span>`, 'term-loot');
            
            // Apply rewards
            const p = gameState.player;
            p.xp += baseXp;
            p.gold += finalGold;
            
            // Check for level up
            if (p.xp >= p.xpToNext) {
                levelUp();
                showLevelUpCeremony(p.level);
                termAppend(`<span style="color:#FFD700;font-size:14px;">+3 Stat Points earned!</span>`, 'term-loot');
            }
            
            // ── BESTIARY: increment kill count
            if (!p.kills) p.kills = {};
            const killKey = monster.key || monster.name.toLowerCase().replace(/\s+/g, '_');
            p.kills[killKey] = (p.kills[killKey] || 0) + 1;
            onMonsterKill(killKey, p.kills[killKey], monster);
            
            // Roll for loot (potions, keys, etc.)
            const loot = rollLoot(monster);
            for (const item of loot) {
                if (typeof item === 'object' && item !== null) {
                    gameState.player.inventory.push(item);
                    const qualityColor = QUALITY_CONFIG[item.quality]?.color || '#00FF00';
                    termAppend(`  + <span style="color:${qualityColor};">${item.name}</span>`, 'term-loot');
                } else if (typeof item === 'string') {
                    gameState.player.inventory.push(item);
                    termAppend(`  + <span style="color:${getItemColor(item)};">${getItemName(item)}</span>`, 'term-loot');
                }
            }
            
            // ═══════════════════════════════════════════════════════════════
            // ⭐ WEAPON DROP ⭐
            // ═══════════════════════════════════════════════════════════════
            const weaponDrop = generateWeaponDrop(
                gameState.player,
                monster.level,
                monster.rarity || 'common',
                false,
                null
            );
            
            if (weaponDrop) {
                gameState.player.inventory.push(weaponDrop); 

                const qualityColor = QUALITY_CONFIG[weaponDrop.quality]?.color || '#00FF00';
                termAppend('', 'term-separator');
                termAppend(`💎 <span style="color:${qualityColor};font-size:18px;font-weight:bold;">WEAPON DROP!</span>`, 'term-victory');
                termAppend(`<span style="color:${qualityColor};">${weaponDrop.name}</span>`, 'term-loot');
                termAppend(`<span style="color:#aaa;">Level ${weaponDrop.level} ${weaponDrop.quality} ${weaponDrop.type}</span>`, 'term-dim');
                termAppend(`<span style="color:#FFD700;">DMG: ${weaponDrop.baseDamage}-${weaponDrop.maxDamage}</span>`, 'term-loot');
                
                // Show modifiers
                if (weaponDrop.modifiers && weaponDrop.modifiers.length > 0) {
                    termAppend('<span style="color:#00FFFF;">Special Properties:</span>', 'term-loot');
                    weaponDrop.modifiers.forEach(mod => {
                        let modText = `  • <span style="color:${mod.color || '#FFD700'};">${mod.name}`;
                        if (mod.minDamage) {
                            modText += ` (${mod.minDamage}-${mod.maxDamage} dmg)`;
                        }
                        if (mod.statusEffect) {
                            const status = STATUS_EFFECTS[mod.statusEffect];
                            modText += ` - ${Math.floor(mod.statusChance * 100)}% ${status.icon} ${status.name}`;
                        }
                        modText += `</span>`;
                        termAppend(modText, 'term-loot');
                    });
                }
            }
            
            // ═══════════════════════════════════════════════════════════════
            // ⭐ ARMOR DROP ⭐
            // ═══════════════════════════════════════════════════════════════
            const armorDrop = generateArmorDrop(
                gameState.player,
                monster.level,
                monster.rarity || 'common',
                false,
                null
            );
            
            if (armorDrop) {
                gameState.player.inventory.push(armorDrop);
                const qColor = QUALITY_CONFIG[armorDrop.quality]?.color || '#00FF00';
                termAppend('', 'term-separator');
                termAppend(`🛡️ <span style="color:${qColor};font-size:18px;font-weight:bold;">ARMOR DROP!</span>`, 'term-victory');
                termAppend(`<span style="color:${qColor};">${armorDrop.name}</span>`, 'term-loot');
                termAppend(`<span style="color:#8aaa8a;">Level ${armorDrop.level || 1} ${armorDrop.quality} armor</span>`, 'term-dim');
                termAppend(`<span style="color:#00AAFF;">DEF: ${armorDrop.baseDefense}${armorDrop.baseMagicBonus > 0 ? ` | MAG BONUS: +${armorDrop.baseMagicBonus}` : ''}</span>`, 'term-loot');
                
                // Show armor modifiers
                if (armorDrop.modifiers && armorDrop.modifiers.length > 0) {
                    termAppend('<span style="color:#00FFFF;">Special Properties:</span>', 'term-loot');
                    armorDrop.modifiers.forEach(mod => {
                        let modText = `  • <span style="color:${mod.color || '#FFD700'};">${mod.name}`;
                        if (mod.value) {
                            modText += `: ${mod.value}${mod.statType === 'percent' ? '%' : ''}`;
                        }
                        if (mod.description) {
                            modText += ` — ${mod.description}`;
                        }
                        modText += `</span>`;
                        termAppend(modText, 'term-loot');
                    });
                }
            }
            
            // Track for endCombat kill summary (name, rarityColor, etc.)
            if (!cs.defeatedMonsters) cs.defeatedMonsters = [];
            cs.defeatedMonsters.push(monster);

            // Remove the dead monster
            cs.monsters.splice(i, 1);
        }
    }
    
    // Update target index if needed
    if (cs.currentTarget >= cs.monsters.length) {
        cs.currentTarget = Math.max(0, cs.monsters.length - 1);
    }
    
    // Update displays
    updateEnemyCards();
    updateHud();
    
    // If all enemies are dead, end combat
    if (cs.monsters.length === 0) {
        cs.rewardsAlreadyGiven = true;
        endCombat(true);
    }
    
    return anyProcessed;
}
// ═══════════════════════════════════════════════════════════════
// END COMBAT
// ═══════════════════════════════════════════════════════════════
function endCombat(victory) {
    if (victory) haptic('victory');
    else         haptic('death');

    // ── defeat ──
    if (!victory) {
        clearInterval(gameState.combatTimer);
        gameState.combatTimer = null;

        const p = gameState.player;
        const inDungeon = !!gameState.dungeon;

        // ── Calculate penalties BEFORE applying them ─────────────────
        // Level 1 players are immune to all penalties
        const isLevel1 = p.level <= 1;

        let xpLost   = 0;
        let goldLost = 0;

        if (!isLevel1) {
            // ── XP penalty: 10% of total accumulated XP ────────────────
            xpLost = Math.floor(p.xp * 0.10);

            // Never drop a level — floor XP at the start-of-current-level threshold
            const xpFloor = getXpForLevel(p.class, p.level);
            p.xp = Math.max(xpFloor, p.xp - xpLost);

            // ── Gold penalty: lose ALL carried gold (bank is safe) ──────
            goldLost = p.gold;
            p.gold   = 0;
        }

        // Restore HP/MP to full
        p.hp = p.maxHp;
        p.mp = p.maxMp;

        // Clear dungeon / combat state
        gameState.dungeon              = null;
        gameState.combatState          = null;
        gameState.postCombatRecovery   = false;

        updateHud();
        saveGame();

        // ── Build death screen shown IN THE TERMINAL ──────────────────
        termAppend('', 'term-separator');
        termAppend(
            `<span style="color:#ff2222;font-size:26px;letter-spacing:4px;">💀  YOU HAVE DIED  💀</span>`,
            'term-error'
        );
        termAppend('', 'term-separator');

        if (isLevel1) {
            termAppend(
                `<span style="color:#88ff88;">You are a <strong>Level 1</strong> adventurer — no penalties apply.</span>`,
                'term-loot'
            );
            termAppend(
                `<span style="color:#aaaaaa;">You wake up bruised but no worse for wear...</span>`
            );
        } else {
            termAppend(
                `<span style="color:#ff6666;">💸 Gold Lost: </span>` +
                `<span style="color:#ffaa00;font-size:18px;">${goldLost.toLocaleString()}g</span>` +
                `<span style="color:#888;"> (gold in your <strong>Bank</strong> is safe)</span>`
            );

            const xpBefore = p.xp + xpLost;
            termAppend(
                `<span style="color:#ff6666;">📉 XP Lost: </span>` +
                `<span style="color:#ff8888;font-size:18px;">${xpLost.toLocaleString()} XP</span>`
            );
            termAppend(
                `<span style="color:#888;">XP: ${xpBefore.toLocaleString()} → ${p.xp.toLocaleString()}` +
                `${p.xp === getXpForLevel(p.class, p.level) ? ' <span style="color:#ff4444;">(floored at level start)</span>' : ''}</span>`
            );

            if (inDungeon) {
                termAppend(
                    `<span style="color:#ff4444;">🏚️ Expelled from the dungeon!</span>`
                );
            }

            termAppend('', 'term-separator');
            termAppend(
                `<span style="color:#666;">Your level remains <strong style="color:#aaa;">Lv ${p.level}</strong>. ` +
                `Gold in your bank is untouched.</span>`
            );
        }

        termAppend('', 'term-separator');
        termAppend(
            `<span style="color:#888888;">Press <strong style="color:#00ff88;">[CONTINUE]</strong> to return to town...</span>`
        );

        // ── Inject CONTINUE button into the action bar ────────────────
        const ab = document.getElementById('actionBar');
        if (ab) {
            ab.innerHTML = `
                <div style="display:flex;gap:6px;width:100%;padding:4px;">
                    <button onclick="confirmDeathReturn()"
                        style="flex:1;font-size:20px;min-height:50px;
                               background:linear-gradient(180deg,#0a0000,#000);
                               color:#ff4444;border:2px solid #ff4444;
                               font-family:'VT323',monospace;letter-spacing:2px;">
                        💀 CONTINUE
                    </button>
                </div>`;
        }
        return;
    }

    // ── victory ──
    const defeated   = gameState.combatState.defeatedMonsters || [];

    const cs = gameState.combatState;


// ── Process bounty victory if this was a bounty fight ──
if (cs.isBountyFight) {
    const capturedBountyId = processBountyVictory(cs);
    if (capturedBountyId) {
        const b = BOUNTIES[capturedBountyId];
        termAppend('', 'term-separator');
        termAppend(
            `<span style="color:#FFD700;font-size:18px;">⚓ BOUNTY TARGET CAPTURED!</span>`,
            'term-victory'
        );
        termAppend(
            `<span style="color:#cc66ff;">${b.name}</span> has been defeated! ` +
            `Return to the Bounty Board to collect your reward.`,
            'term-loot'
        );
        termAppend('', 'term-separator');
    }
}

    const isMaster   = defeated.some(m => m.isMaster);
    let masterData   = null;
    let unlockedArea = null;

    if (isMaster) {
        const m = defeated.find(d => d.isMaster);
        masterData   = CLASS_MASTERS[m.masterKey];
        unlockedArea = masterData.unlocks;

        if (!gameState.player.defeatedMasters.includes(m.masterKey))
            gameState.player.defeatedMasters.push(m.masterKey);

        if (!gameState.player.unlockedAreas.includes(unlockedArea))
            gameState.player.unlockedAreas.push(unlockedArea);

        masterData.guaranteedDrops.forEach(ik => {
            if (!defeated[0].possibleDrops) defeated[0].possibleDrops = [];
            if (!defeated[0].possibleDrops.includes(ik))
                defeated[0].possibleDrops.push(ik);

            if (!defeated[0].dropRates) defeated[0].dropRates = {};
            defeated[0].dropRates[
                (WEAPONS[ik] || ARMOR[ik]) ? getItemQuality(ik) : 'common'
            ] = 1.0;
        });
    }

    // Check if rewards were already given during combat (multi-enemy)
    const rewardsAlreadyGiven = cs.rewardsAlreadyGiven;
    
        let totalXp = 0, totalGold = 0, allLoot = [];
    
    // Get XP bonus from Sage armor modifier
    const xpBonusPercent = getArmorModifierBonus('xpBonus');
    
    // Only calculate if NOT already given
    if (!rewardsAlreadyGiven) {
        defeated.forEach(e => {
            let xpReward = calculateXpReward(e, gameState.player.level);
            
            // Apply Sage XP bonus
            if (xpBonusPercent > 0) {
                const bonusXp = Math.floor(xpReward * (xpBonusPercent / 100));
                xpReward += bonusXp;
                termAppend(`📖 [Armor: Sage] +${bonusXp} bonus XP!`, 'term-loot');
            }
            
            totalXp   += xpReward;
            totalGold += e.gold;
            allLoot    = allLoot.concat(rollLoot(e));
        });

        gameState.player.xp   += totalXp;
        gameState.player.gold += totalGold;
    } else {
        // Still roll for loot even if XP/gold already given
        defeated.forEach(e => {
            allLoot = allLoot.concat(rollLoot(e));
        });
    }

    // ── Remove ALL defeated dungeon enemies & award drops ──
    if (gameState.dungeon && gameState.combatState) {
        const cs = gameState.combatState;
        const linkedIds = cs.dungeonEnemyIds || (cs.dungeonEnemyId ? [cs.dungeonEnemyId] : []);

        linkedIds.forEach(dungeonEnemyId => {
            const defeatedDungeonEnemy = gameState.dungeon.activeEnemies.find(
                e => e.id === dungeonEnemyId
            );

            if (defeatedDungeonEnemy && defeatedDungeonEnemy.drop) {
    const dropKey = defeatedDungeonEnemy.drop;
    
    // Check if this is a weapon (exists in WEAPONS and not unarmed)
    if (WEAPONS[dropKey] && !WEAPONS[dropKey].unarmed) {
        // Generate a proper weapon object
        const weaponDrop = generateWeaponDrop(gameState.player, defeatedDungeonEnemy.level || gameState.player.level, 'common', true, null, true);
        if (weaponDrop && typeof weaponDrop === 'object') {
            gameState.player.inventory.push(weaponDrop);
            termAppend(`⚔️ <span style="color:#FFD700;">${weaponDrop.name}</span> found on the body!`, 'term-loot');
        }
    }
    // Check if this is armor
    else if (ARMOR[dropKey] && !ARMOR[dropKey].unarmored) {
        // Generate a proper armor object
        const armorDrop = generateArmorDrop(gameState.player, defeatedDungeonEnemy.level || gameState.player.level, 'common', true, null, true);
        if (armorDrop && typeof armorDrop === 'object') {
            gameState.player.inventory.push(armorDrop);
            termAppend(`🛡️ <span style="color:#44AAFF;">${armorDrop.name}</span> found on the body!`, 'term-loot');
        }
    }
    // Regular item (potion, key, etc.)
    else if (dropKey && ITEMS[dropKey]) {
        gameState.player.inventory.push(dropKey);
        const dropItem = ITEMS[dropKey];
        const dropIcon = dropItem.icon || '📦';
        const keyColor = dropItem.subtype === 'dungeon_key' ? '#e8b84a' : '#00FF88';
        termAppend(
            `${dropIcon} <span style="color:${keyColor};">${dropItem.name}</span> found on the body!`,
            'term-loot'
        );
    }
    }});

        if (linkedIds.length > 0) {
            if (!gameState.dungeon.defeatedEnemies) gameState.dungeon.defeatedEnemies = [];
            
            linkedIds.forEach(dungeonEnemyId => {
                const defeatedEnemy = gameState.dungeon.activeEnemies.find(e => e.id === dungeonEnemyId);
                if (defeatedEnemy) {
                    gameState.dungeon.defeatedEnemies.push({
                        ...defeatedEnemy,
                        deathTime: Date.now(),
                        respawnTime: Date.now() + (30 * 60 * 1000)
                    });
                }
            });
            
            gameState.dungeon.activeEnemies = gameState.dungeon.activeEnemies.filter(
                e => !linkedIds.includes(e.id)
            );
            console.log(`🗑️ Removed ${linkedIds.length} dungeon enemy(s) - will respawn in 30min`);
        }
    }

    // ── terminal output ──
    termAppend('', 'term-separator');

    if (isMaster) {
        termAppend(`🏆 ${masterData.name} HAS BEEN DEFEATED! 🏆`, 'term-victory');
        termAppend(`✨ ${LOCATIONS[unlockedArea].name} IS NOW UNLOCKED! ✨`, 'term-loot');
    }

        // Use killCount from combatState instead of defeated.length
    const killCount = cs.killCount || defeated.length;
    
    if (killCount === 1) {
        termAppend(
            `You defeated <span style="color:${defeated[0]?.rarityColor || '#fff'};">${defeated[0]?.name || 'an enemy'}</span>!`,
            'term-highlight'
        );
    } else {
        termAppend(`You defeated ${killCount} enemies!`, 'term-highlight');
        defeated.forEach(e =>
            termAppend(`  • <span style="color:${e.rarityColor};">${e.name}</span>`)
        );
    }
    
    // Reset killCount for next combat
    cs.killCount = 0;

    if (!rewardsAlreadyGiven) {
        termAppend(
            `Gained <span style="color:#FFD700;">${totalXp} XP</span> and ` +
            `<span style="color:#FFD700;">${totalGold} Gold</span>!`
        );
    }

        if (allLoot.length > 0) {
        haptic('loot');
        termAppend('⚡ LOOT:', 'term-loot');
        allLoot.forEach(item => {
            // Handle object items (weapons, armor instances)
            if (typeof item === 'object' && item !== null) {
                // Already a full object - add to inventory as-is
                gameState.player.inventory.push(item);
                const qualityColor = QUALITY_CONFIG[item.quality]?.color || '#00FF00';
                termAppend(`  + <span style="color:${qualityColor};">${item.name}</span>`, 'term-loot');
            } 
            // Handle string items (potions, keys, etc.)
            else if (typeof item === 'string') {
                // CHECK FOR STAFF PIECE DUPLICATES
                const isStaffPiece = item.startsWith('staff_piece_');
                let alreadyHas = false;
                
                if (isStaffPiece) {
                    const staffNumber = ITEMS[item]?.staffPieceNumber;
                    alreadyHas = gameState.player.inventory.some(invItem => {
                        if (typeof invItem === 'object' && invItem !== null) {
                            return invItem.staffPieceNumber === staffNumber;
                        }
                        return invItem === item;
                    });
                }
                
                if (isStaffPiece && alreadyHas) {
                    termAppend(`  + <span style="color:#888;">${getItemName(item)} (already collected — sold for ${ITEMS[item]?.sellValue || 0}g)</span>`, 'term-loot');
                    gameState.player.gold += ITEMS[item]?.sellValue || 0;
                    return;
                }
                
                const _def = ITEMS[item];
                const _cap = _def?.maxStack;
                if (_cap) {
                    const _held = gameState.player.inventory.filter(k => k === item).length;
                    if (_held >= _cap) {
                        termAppend(`  + <span style="color:#888;">${getItemName(item)} (bag full — sold for ${_def.sellValue}g)</span>`, 'term-loot');
                        gameState.player.gold += _def.sellValue;
                        return;
                    }
                }
                gameState.player.inventory.push(item);
                termAppend(`  + <span style="color:${getItemColor(item)};">${getItemName(item)}</span>`, 'term-loot');
            }
        });
    }    



    // Check for level-up (possibly multiple levels)
    while (gameState.player.xp >= gameState.player.xpToNext && gameState.player.level < 25) {
        levelUp();
        showLevelUpCeremony(gameState.player.level);
        termAppend(`<span style="color:#FFD700;font-size:14px;">+3 Stat Points earned!</span>`, 'term-loot');
        if (gameState.dungeon) {
            termAppend(`<span style="color:#00FFFF;">→ Tap </span><span style="color:#FFD700;font-weight:bold;">⬆ pts</span><span style="color:#00FFFF;"> in the compass panel, or open </span><span style="color:#00FF88;font-weight:bold;">🎒 Inventory</span><span style="color:#00FFFF;"> to spend them now.</span>`, 'term-loot');
        } else {
            termAppend(`<span style="color:#00FFFF;">→ Tap </span><span style="color:#00FF88;font-weight:bold;">🎒 Inventory</span><span style="color:#00FFFF;"> to spend them now, or visit </span><span style="color:#FFD700;font-weight:bold;">CHARACTER STATS</span><span style="color:#00FFFF;"> in town.</span>`, 'term-loot');
        }
        
        if (gameState.player._justEvolved) {
            termAppend('', 'term-separator');
            termAppend(`<span style="color:#FF00FF;font-size:24px;font-weight:bold;">⚡ CLASS EVOLUTION! ⚡</span>`, 'term-victory');
            termAppend(gameState.player._evolutionMessage, 'term-victory');
            termAppend(`<span style="color:#FFD700;">Your power has DOUBLED!</span>`, 'term-loot');
            gameState.player._justEvolved = false;
            gameState.player._evolutionMessage = null;
        }
    }
    
    // Max level message
    if (gameState.player.level >= 25 && gameState.player.xp >= gameState.player.xpToNext) {
        termAppend(`🌟 You have reached MAX LEVEL! (25)`, 'term-victory');
        gameState.player.xp = gameState.player.xpToNext;
    }

    updateHud();
    saveGame();

    // ─────────────────────────────────────────
    // ✅ EXIT COMBAT, ENTER EXHAUSTION
    // ─────────────────────────────────────────
    cleanupCombatStatusEffects();
    gameState.combatState.combatOver = true;
    gameState.postCombatRecovery = true;

    startMpRegen(false);
    startResting(false);

    const ab = document.getElementById('actionBar');
    
    if (gameState.dungeon) {
    if (victory) {
        setTimeout(() => {
            const ds = gameState.dungeon;
            if (!ds) return;
            const remaining = ds.activeEnemies.filter(e => e.currentRoom === ds.currentRoom);
            if (remaining.length > 0) {
                checkEnemiesInRoom(ds.currentRoom);
            } else {
                renderDungeonActionBar();
                if (window._pendingChronicleEntries && window._pendingChronicleEntries.length > 0) {
                    setTimeout(playPendingChronicleEntries, 800);
                }
            }
        }, 400);
    } else {
        renderDungeonActionBar();
    }
} else if (isMaster) {
    ab.innerHTML = `
        <button onclick="tryViewWorldMap()">🗺️ VIEW WORLD MAP</button>
        <button onclick="tryGoBackToTown()">🏘️ RETURN TO TOWN</button>`;
    renderActionBar();
} else {
    ab.innerHTML = `
        <button onclick="tryExploreLocation('${gameState.currentLocation}')">🔍 CONTINUE EXPLORING</button>
        <button onclick="tryGoBackToTown()">🏘️ RETURN TO TOWN</button>`;
    renderActionBar();
    stabilizeTerminalLayout();
    if (window._pendingChronicleEntries && window._pendingChronicleEntries.length > 0) {
        setTimeout(playPendingChronicleEntries, 800);
    }
}

if (!gameState.combatTimer) {
    startCombatTimer();
}
    
    // ═══════════════════════════════════════════════════════════════
    // ROGUE: SHADOW STRIKE - Activate stealth after combat
    // ═══════════════════════════════════════════════════════════════
    const p = gameState.player;
    const baseClass = p.baseClass || p.class;
    if (baseClass === 'rogue' && victory) {
        if (p.shadowStrikeTimer) {
            clearTimeout(p.shadowStrikeTimer);
        }
        
        p.shadowStrikeTimer = setTimeout(() => {
            p.shadowStrikeReady = true;
            termAppend('', 'term-separator');
            termAppend('🌑 You melt into the shadows... <span style="color:#8888FF;">[Shadow Strike Ready]</span>', 'term-highlight');
        }, 5000);
    }
}

// ═══════════════════════════════════════════════════════════════
// DEATH CONFIRMATION — player presses [CONTINUE] to return to town
// ═══════════════════════════════════════════════════════════════
function confirmDeathReturn() {
    // Start regen fresh in town
    startMpRegen(true);
    startResting(true);
    closeTerminalView();
    showTown();
}

// ═══════════════════════════════════════════════════════════════
// POST-COMBAT EXHAUSTION CHECK
// (used by navigation actions)
// ═══════════════════════════════════════════════════════════════
function continueDungeonExploration() {
    // Clear combat state and show dungeon navigation
    gameState.combatState = null;
    gameState.postCombatRecovery = false;
    
    // Clear combat timer
    if (gameState.combatTimer) {
        clearInterval(gameState.combatTimer);
        gameState.combatTimer = null;
    }
    
    // Return to dungeon navigation
    renderDungeonActionBar();
}

function playerIsExhausted() {
    if (!gameState.postCombatRecovery) return false;

    const cs = gameState.combatState;
    if (!cs || !cs.pipAvailable) return false;

    return cs.pipAvailable.some(p => !p);
}
        // ═══════════════════════════════════════════════════════════════
        // ADVANCED CLASS EVOLUTION (Level 20)
        // ═══════════════════════════════════════════════════════════════
        const ADVANCED_CLASSES = {
            warrior: {
                advancedClass: 'warlord',
                advancedName: 'Warlord',
                description: 'Master of all weapons and combat. Unstoppable in battle.',
                damageMultiplier: 2.0,
                bonusStats: { str: 10, con: 10, dex: 5 },
                newSpells: ['battle_fury', 'titan_strike'],
                announcement: '⚔️ You have mastered the art of war! You are now a WARLORD!'
            },
            rogue: {
                advancedClass: 'shadowmaster',
                advancedName: 'Shadowmaster',
                description: 'Master assassin who strikes from the void itself.',
                damageMultiplier: 2.5,
                bonusStats: { dex: 15, lck: 10, str: 5 },
                newSpells: ['shadow_strike', 'void_step'],
                announcement: '🗡️ You have become one with the shadows! You are now a SHADOWMASTER!'
            },
            acolyte: {
                advancedClass: 'high_priest',
                advancedName: 'High Priest',
                description: 'Chosen of the divine, wielding ultimate holy power.',
                damageMultiplier: 2.0,
                bonusStats: { wis: 15, cha: 10, con: 5 },
                newSpells: ['divine_judgment', 'mass_resurrection', 'holy_nova'],
                announcement: '✨ The gods have chosen you! You are now a HIGH PRIEST!'
            },
            necrolyte: {
                advancedClass: 'lich',
                advancedName: 'Lich',
                description: 'Immortal master of death itself. Reality bends to your will.',
                damageMultiplier: 2.0,
                bonusStats: { wis: 15, magic: 10, con: 5 },
                newSpells: ['death_wave', 'summon_undead_army', 'soul_drain'],
                announcement: '💀 You have transcended mortality! You are now a LICH!'
            },
            archer: {
                advancedClass: 'deadeye',
                advancedName: 'Deadeye',
                description: 'Perfect marksman whose arrows never miss their mark.',
                damageMultiplier: 2.3,
                bonusStats: { dex: 15, lck: 10, str: 5 },
                newSpells: ['piercing_shot', 'rain_of_arrows'],
                announcement: '🏹 Your aim is now perfect! You are now a DEADEYE!'
            },
            druid: {
                advancedClass: 'archdruid',
                advancedName: 'Archdruid',
                description: 'Master of nature and the primal forces of creation.',
                damageMultiplier: 2.0,
                bonusStats: { wis: 15, con: 10, str: 5 },
                newSpells: ['natures_wrath', 'wild_shape', 'earthquake'],
                announcement: '🌿 Nature itself answers your call! You are now an ARCHDRUID!'
            },
            sorceror: {
                advancedClass: 'archmage',
                advancedName: 'Archmage',
                description: 'Master of all magic. Reality itself obeys your command.',
                damageMultiplier: 2.5,
                bonusStats: { wis: 20, magic: 15, cha: 5 },
                newSpells: ['apocalypse', 'time_stop', 'disintegrate'],
                announcement: '🔮 You have mastered all magic! You are now an ARCHMAGE!'
            },
            hunter: {
                advancedClass: 'beastlord',
                advancedName: 'Beastlord',
                description: 'Master of beasts and the wild. Animals bow to your command.',
                damageMultiplier: 2.2,
                bonusStats: { dex: 12, str: 8, con: 8, wis: 5 },
                newSpells: ['beast_stampede', 'primal_bond'],
                announcement: '🐺 All beasts obey you! You are now a BEASTLORD!'
            },
            
            paladin: {
                advancedClass: 'crusader',
                advancedName: 'Crusader',
                description: 'Holy warrior blessed by the gods themselves.',
                damageMultiplier: 2.2,
                bonusStats: { str: 10, wis: 10, con: 8, cha: 5 },
                newSpells: ['holy_crusade', 'divine_shield', 'smite_evil'],
                announcement: '⚡ The heavens bless your crusade! You are now a CRUSADER!'
            },
            warlock: {
                advancedClass: 'demonlord',
                advancedName: 'Demonlord',
                description: 'Master of dark pacts who commands legions of demons.',
                damageMultiplier: 2.4,
                bonusStats: { wis: 18, cha: 12, con: 5 },
                newSpells: ['summon_demon', 'dark_pact', 'soul_harvest'],
                announcement: '😈 You have bound demons to your will! You are now a DEMONLORD!'
            }
        };

        function evolveClass(player) {
            if (player.level !== 20) return false;
            if (player.hasEvolved) return false; // Already evolved
            
            const baseClass = player.class;
            const evolution = ADVANCED_CLASSES[baseClass];
            
            if (!evolution) return false;
            
            // Store original class
            player.baseClass = baseClass;
            player.class = evolution.advancedClass;
            player.className = evolution.advancedName;
            player.hasEvolved = true;
            
            // Apply bonus stats
            Object.keys(evolution.bonusStats).forEach(stat => {
                if (player[stat] !== undefined) {
                    player[stat] += evolution.bonusStats[stat];
                }
            });
            
            // Apply damage multiplier
            player.advancedClassMultiplier = evolution.damageMultiplier;
            
            // Add new spells
            evolution.newSpells.forEach(spell => {
                if (!player.knownSpells.includes(spell)) {
                    player.knownSpells.push(spell);
                }
            });
            
            // Heal to full and boost HP/MP
            player.maxHp = Math.floor(player.maxHp * 1.5);
            player.maxMp = Math.floor(player.maxMp * 1.5);
            player.hp = player.maxHp;
            player.mp = player.maxMp;
            
            return true;
        }

        function getAdvancedClassName(player) {
            if (player.hasEvolved && ADVANCED_CLASSES[player.baseClass]) {
                return ADVANCED_CLASSES[player.baseClass].advancedName;
            }
            return player.className || player.class;
        }

        function getClassDamageMultiplier(player) {
            return player.advancedClassMultiplier || 1.0;
        }

        // ═══════════════════════════════════════════════════════════════
        // END ADVANCED CLASS SYSTEM
        // ═══════════════════════════════════════════════════════════════

        // ── Dungeon level-up modal — appears over the action bar when levelling in-dungeon ──
        function showLevelUpModal() {
            // Remove any existing modal
            const old = document.getElementById('levelUpModal');
            if (old) old.remove();
            window._statPending = {};
            _renderLevelUpModal();
        }

        function _renderLevelUpModal() {
            const p = gameState.player;
            const old = document.getElementById('levelUpModal');
            if (old) old.remove();

            const pointsLeft   = p.statPoints;
            const pointsQueued = STAT_NAMES.reduce((a,s) => a + (window._statPending[s]||0), 0);
            const hasChanges   = pointsQueued > 0;
            const allSpent     = pointsLeft === 0;

            const modal = document.createElement('div');
            modal.id = 'levelUpModal';
            modal.style.cssText = `
                position:fixed;top:0;left:0;right:0;bottom:0;
                background:rgba(0,0,0,0.88);z-index:3000;
                display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
                overflow-y:auto;padding:16px 12px 24px;box-sizing:border-box;
            `;

            const affinities = CLASS_AFFINITIES[p.baseClass || p.class] || [];
            let rows = '';
            STAT_NAMES.forEach(s => {
                const isAff  = affinities.includes(s);
                const canUp  = pointsLeft > 0;
                const base   = p[s] || 0;
                const queued = window._statPending[s] || 0;
                rows += `
                <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #1a4a1a;flex-wrap:wrap;">
                    <span style="min-width:38px;color:${isAff?'#FFD700':'#00FF00'};font-weight:bold;">${STAT_LABELS[s]}</span>
                    <span style="flex:1;min-width:100px;font-size:14px;color:#8aaa8a;">${STAT_DESCS[s]}${isAff?' ★':''}</span>
                    <span style="min-width:28px;text-align:center;color:#FFD700;font-size:22px;">${base}</span>
                    ${queued > 0
                        ? `<span style="color:#00FF00;font-size:16px;min-width:24px;">+${queued}</span>`
                        : `<span style="min-width:24px;"></span>`}
                    <button onclick="_statPend('${s}')" ${canUp?'':'disabled'}
                        style="width:38px;height:38px;padding:0;font-size:22px;font-weight:bold;
                               border-color:${canUp?'#00FF00':'#333'};color:${canUp?'#00FF00':'#333'};">+</button>
                </div>`;
            });

            modal.innerHTML = `
                <div style="width:100%;max-width:480px;">
                    <div style="color:#FFD700;font-size:22px;font-weight:bold;text-align:center;margin-bottom:4px;">
                        ⬆ LEVEL UP! — Now Level ${p.level}
                    </div>
                    <div style="color:#00FF00;font-size:13px;text-align:center;margin-bottom:12px;">
                        HP and MP fully restored.
                    </div>

                    <div style="background:#0a1a0a;border:1px solid ${pointsLeft>0?'#FFD700':'#1a4a1a'};
                                border-radius:6px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px;">
                        <span style="color:${pointsLeft>0?'#FFD700':'#8aaa8a'};">Points to spend:</span>
                        <span style="font-size:26px;color:${pointsLeft>0?'#fff':'#555'};">${pointsLeft}</span>
                        ${pointsLeft>0 ? '<span style="color:#00FF00;font-size:13px;">— tap + to allocate</span>' : ''}
                        <span style="color:#666;font-size:12px;margin-left:auto;">(★ = class affinity)</span>
                    </div>

                    <div style="background:#050f05;border:1px solid #1a3a1a;border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                        ${rows}
                    </div>

                    <div style="background:#0a0a1a;border:1px solid #1a1a3a;border-radius:6px;
                                padding:8px 12px;font-size:13px;color:#8aaa8a;margin-bottom:14px;">
                        HP ${p.hp}/${p.maxHp} &nbsp;|&nbsp; MP ${p.mp}/${p.maxMp} &nbsp;|&nbsp;
                        Crit ${calcCritChance(p.lck,p)}% &nbsp;|&nbsp; Dodge ${calcDodgeChance(p.dex||0)}%
                    </div>

                    ${allSpent ? `
                        <button onclick="_saveStatChanges(()=>{ document.getElementById('levelUpModal').remove(); })"
                            style="width:100%;font-size:18px;padding:12px;border-color:#FFD700;color:#FFD700;font-weight:bold;margin-bottom:8px;">
                            💾 SAVE &amp; CONTINUE
                        </button>
                    ` : `
                        <button onclick="_saveStatChanges(()=>{ document.getElementById('levelUpModal').remove(); })"
                            style="width:100%;font-size:16px;padding:10px;border-color:#555;color:#555;margin-bottom:8px;"
                            ${hasChanges?'':'disabled'}>
                            💾 SAVE &amp; CONTINUE${pointsLeft>0?' ('+pointsLeft+' unspent)':''}
                        </button>
                    `}
                    <button onclick="document.getElementById('levelUpModal').remove();"
                        style="width:100%;font-size:14px;padding:8px;border-color:#336633;color:#336633;">
                        ✕ CLOSE (spend points later in Character Stats)
                    </button>
                </div>
            `;

            document.body.appendChild(modal);
        }

        function levelUp() {
    haptic('levelUp');
    const p = gameState.player;
    
    // Cap at level 25
    if (p.level >= 25) {
        p.xp = p.xpToNext;
        return;
    }
    
    const oldLevel = p.level;
    p.level++;
    
    // XP is now a running total — do NOT subtract xpToNext.
    // Just raise the bar to the next level's cumulative threshold.
    p.xpToNext = getXpToNextLevel(p.baseClass || p.class, p.level);

    // ⚔️ ONLY INCREASE HP AND MP ⚔️
    // HP increases based on CON (but CON is NOT auto-increased)
    const conBonus = p.con || 0;
    p.maxHp += 15 + conBonus;
    p.hp = p.maxHp;  // Full heal on level up
    
    // MP increase: base 10 per level
    p.maxMp += 10;
    p.mp = p.maxMp;  // Full mana on level up
    
    // ❌ REMOVED: Auto stat increases to STR, DEX, WIS, CHA, CON, LCK
    // ❌ REMOVED: Paladin bonus stats
    // ❌ REMOVED: Legacy stat increases (strength, defense, magic, speed)
    
    // ⭐ GIVE STAT POINTS (3 per level to allocate manually)
    if (p.statPoints === undefined) p.statPoints = 0;
    p.statPoints += 3;
    
    console.log(`\n📈 LEVEL UP! You are now level ${p.level}`);
    console.log(`   HP: +${15 + conBonus} (${p.maxHp} total)`);
    console.log(`   MP: +10 (${p.maxMp} total)`);
    console.log(`   ⭐ +3 Stat Points earned (${p.statPoints} total to spend)`);
    console.log(`   Your base stats (STR, DEX, WIS, CHA, CON, LCK) remain unchanged.`);
    console.log(`   Visit CHARACTER STATS to allocate your points!\n`);
    
    // ═══════════════════════════════════════════════════════════════
    // CHECK FOR NEW ZONE DISCOVERY
    // ═══════════════════════════════════════════════════════════════
    Object.keys(LOCATIONS).forEach(key => {
        const loc = LOCATIONS[key];
        if (key !== 'town' && loc.requiredLevel === p.level) {
            // Just reached the level for this zone!
            if (typeof termAppend === 'function') {
                termAppend('', 'term-separator');
                termAppend(`<span style="color:#00FFFF;font-size:18px;">🗺️ NEW AREA DISCOVERED!</span>`, 'term-victory');
                termAppend(`<span style="color:#FFD700;">${loc.name} is now visible on the world map!</span>`, 'term-loot');
                termAppend(`<span style="color:#8aaa8a;">Check "Explore World" to visit this area.</span>`, 'term-dim');
            }
        }
    });
    
    // ═══════════════════════════════════════════════════════════════
    // CHECK FOR CLASS EVOLUTION AT LEVEL 20
    // ═══════════════════════════════════════════════════════════════
    if (p.level === 20 && evolveClass(p)) {
        const evolution = ADVANCED_CLASSES[p.baseClass];
        // Evolution message will be shown in endCombat
        p._justEvolved = true;
        p._evolutionMessage = evolution.announcement;
        if (typeof termAppend === 'function') {
            termAppend('', 'term-separator');
            termAppend(`<span style="color:#FF00FF;font-size:24px;font-weight:bold;">⚡ CLASS EVOLUTION! ⚡</span>`, 'term-victory');
            termAppend(evolution.announcement, 'term-victory');
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // CHRONICLE: unlock entries gated to this level
    // ═══════════════════════════════════════════════════════════════
    if (typeof unlockChronicleEntries === 'function') {
        unlockChronicleEntries(p);
    }
    
    // ── If player is in a dungeon, show the level-up stat modal immediately ──
    if (gameState.dungeon && gameState.dungeon.active && typeof showLevelUpModal === 'function') {
        setTimeout(showLevelUpModal, 400);
    }
    
    // Update HUD
    if (typeof updateHud === 'function') updateHud();
    
    // Save after level up
    if (typeof saveGame === 'function') saveGame();
}
        // ═══════════════════════════════════════════════════════════════
        // LOOT DROP SYSTEM (Phase 1)
        // ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// MELEE ENCHANT FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function showEnchantTargetMenu() {
    const p = gameState.player;
    const cs = gameState.combatState;
    if (!p || !cs) return;
    const classKey = p.baseClass || p.class;
    const needsTarget = classKey === 'archer' || classKey === 'hunter';
    if (!needsTarget) {
        activateEnchant(null);
        return;
    }
    cs.actionMode = 'enchant_target';
    renderActionBar();
}

function activateEnchant(targetIndex) {
    const p  = gameState.player;
    const cs = gameState.combatState;
    if (!p || !cs) return;
    const classKey = p.baseClass || p.class;
    if (!MELEE_CLASSES.includes(classKey)) return;
    const tier = getEnchantTier(classKey);
    if (!tier) {
        termAppend('You have not learned an enchant yet. Visit the Temple.', 'term-error');
        return;
    }
    cs.actionMode = 'main';
    renderActionBar();
    switch (classKey) {
        case 'warrior':   activateBloodrage(p, cs, tier);              break;
        case 'rogue':     activateExposeWeakness(p, cs, tier);         break;
        case 'paladin':   activateConsecratedGround(p, cs, tier);      break;
        case 'archer':    activateDeathMark(p, cs, tier, targetIndex); break;
        case 'hunter':    activateSavageBite(p, cs, tier, targetIndex);break;
        case 'runesmith': activateMjolnirsWrath(p, cs, tier);          break;
    }
}

// ─────────────────────────────────────────────────────────────
// 1. BLOODRAGE — Warrior
// ─────────────────────────────────────────────────────────────
function activateBloodrage(p, cs, tier) {
    const mpCost = Math.floor(p.maxMp * tier.mpCost);
    if (p.mp < mpCost) {
        termAppend(`Not enough mana! Bloodrage requires ${mpCost} MP (full mana).`, 'term-error');
        return;
    }
    p.mp -= mpCost;
    cs.bloodrage = { swingsLeft: tier.swings, healPct: tier.healPct };
    termAppend('', 'term-separator');
    termAppend(`🩸 <span style="color:#FF4444;font-weight:bold;">BLOODRAGE!</span> <em>${tier.label}</em>`, 'term-highlight');
    termAppend(`🩸 Next ${tier.swings} strikes restore ${Math.round(tier.healPct * 100)}% of damage as HP.`, 'term-loot');
    updateHud();
    saveGame();
}

function applyBloodrageHeal(p, cs, damageDealt) {
    if (!cs.bloodrage || cs.bloodrage.swingsLeft <= 0) return;
    const heal   = Math.max(1, Math.floor(damageDealt * cs.bloodrage.healPct));
    const actual = Math.min(heal, p.maxHp - p.hp);
    if (actual > 0) {
        p.hp += actual;
        termAppend(`🩸 Bloodrage restores <span style="color:#FF8888;">${actual} HP</span>!`, 'term-loot');
    }
    cs.bloodrage.swingsLeft--;
    if (cs.bloodrage.swingsLeft <= 0) {
        cs.bloodrage = null;
        termAppend('🩸 <span style="color:#888;">Bloodrage fades...</span>', 'term-dim');
    }
    updateHud();
}

// ─────────────────────────────────────────────────────────────
// 2. EXPOSE WEAKNESS — Rogue
// ─────────────────────────────────────────────────────────────
function activateExposeWeakness(p, cs, tier) {
    const mpCost = Math.floor(p.maxMp * tier.mpCost);
    if (p.mp < mpCost) {
        termAppend(`Not enough mana! Expose Weakness requires ${mpCost} MP (full mana).`, 'term-error');
        return;
    }
    p.mp -= mpCost;
    cs.exposeWeakness = { swingsLeft: tier.swings, defStrip: tier.defStrip };
    termAppend('', 'term-separator');
    termAppend(`🗡️ <span style="color:#AA88FF;font-weight:bold;">EXPOSE WEAKNESS!</span> <em>${tier.label}</em>`, 'term-highlight');
    termAppend(`🗡️ Next ${tier.swings} strikes strip ${tier.defStrip} armor from the target permanently.`, 'term-loot');
    updateHud();
    saveGame();
}

function applyExposeWeakness(cs, enemy) {
    if (!cs.exposeWeakness || cs.exposeWeakness.swingsLeft <= 0) return;
    const strip  = cs.exposeWeakness.defStrip;
    const oldDef = enemy.defense || 0;
    enemy.defense = Math.max(0, oldDef - strip);
    termAppend(`🗡️ Expose Weakness strips <span style="color:#AA88FF;">${strip} armor</span> from ${enemy.name}! (${oldDef} → ${enemy.defense})`, 'term-loot');
    cs.exposeWeakness.swingsLeft--;
    if (cs.exposeWeakness.swingsLeft <= 0) {
        cs.exposeWeakness = null;
        termAppend('🗡️ <span style="color:#888;">Expose Weakness fades — armor stays stripped.</span>', 'term-dim');
    }
}

// ─────────────────────────────────────────────────────────────
// 3. CONSECRATED GROUND — Paladin
// ─────────────────────────────────────────────────────────────
function activateConsecratedGround(p, cs, tier) {
    // ── TOGGLE OFF if already active ─────────────────────────
    if (cs.consecratedTimer) {
        clearInterval(cs.consecratedTimer);
        cs.consecratedTimer = null;
        if (cs.monsters) cs.monsters.forEach(e => { e._consecrated = false; });
        termAppend('🔥 <span style="color:#888;">Consecrated Ground extinguished.</span>', 'term-dim');
        updateHud();
        renderActionBar();
        return;
    }
    if (p.mp <= 0) {
        termAppend('No mana! Consecrated Ground needs mana to channel.', 'term-error');
        return;
    }
    if (!cs.monsters || cs.monsters.length === 0) return;

    // Costs 1 pip
    const pipIdx = cs.pipAvailable ? cs.pipAvailable.findIndex(x => x) : -1;
    if (pipIdx === -1) { termAppend('No pips available!', 'term-error'); return; }
    cs.pipAvailable[pipIdx] = false;
    cs.pipTimers[pipIdx]    = getPipCooldown(p);

    termAppend('', 'term-separator');
    termAppend(`🔥 <span style="color:#FFD700;font-weight:bold;">CONSECRATED GROUND!</span> <em>${tier.label}</em>`, 'term-highlight');

    // Initial AOE hit
    const weapon = WEAPONS[p.weapon];
    if (weapon) {
        const qBonus    = getQualityBonus(weapon.quality, weapon.baseDamage);
        const baseWpnDmg = Math.floor(
            Math.random() * ((weapon.maxDamage || weapon.baseDamage) - weapon.baseDamage + 1)
        ) + weapon.baseDamage + qBonus;
        const aoeDmg = Math.floor(baseWpnDmg * tier.aoePct);
        cs.monsters.forEach(e => {
            if (e.hp <= 0) return;
            const eDR     = Math.min(0.75, (e.defense || 0) * 0.028);
            const finalAoe = Math.max(1, Math.floor(aoeDmg * (1 - eDR)));
            e.hp -= finalAoe;
            termAppend(`🔥 Holy fire erupts! ${e.name} takes <span class="dmg-player">${finalAoe} holy damage</span>!`, 'term-warning');
        });
    }

    // Stop any existing channel
    if (cs.consecratedTimer) { clearInterval(cs.consecratedTimer); cs.consecratedTimer = null; }

    // Mark all living enemies
    cs.monsters.forEach(e => { if (e.hp > 0) e._consecrated = true; });

    cs.consecratedTimer = setInterval(() => {
        const _cs = gameState.combatState;
        const _p  = gameState.player;
        if (!_cs || !_p || _cs.combatOver) {
            clearInterval(cs.consecratedTimer);
            return;
        }
        if (_p.mp <= 0) {
            clearInterval(_cs.consecratedTimer);
            _cs.consecratedTimer = null;
            termAppend('💨 <span style="color:#888;">The holy flames gutter out — your power is spent.</span>', 'term-dim');
            _cs.monsters.forEach(e => { e._consecrated = false; });
            return;
        }
        _p.mp = Math.max(0, _p.mp - tier.mpPerTick);
        updateHud();

        let anyAlive = false;
        _cs.monsters.forEach(e => {
            if (e.hp <= 0 || !e._consecrated) return;
            anyAlive = true;
            e.hp -= tier.tickDmg;
            termAppend(`✨ Holy fire scorches ${e.name} for <span class="dmg-player">${tier.tickDmg} holy damage</span>!`, 'term-loot');
            if (e.hp <= 0) {
                e._consecrated = false;
                termAppend(`💀 ${e.name} is consumed by holy fire!`, 'term-victory');
            }
        });

        if (!anyAlive) {
            clearInterval(_cs.consecratedTimer);
            _cs.consecratedTimer = null;
        }
        checkCombatEnd();
        updateHud();
    }, 4000);

    updateHud();
    renderActionBar();
    saveGame();
}

// ─────────────────────────────────────────────────────────────
// 4. DEATH MARK — Archer
// ─────────────────────────────────────────────────────────────
function activateDeathMark(p, cs, tier, targetIndex) {
    const mpCost = Math.floor(p.maxMp * tier.mpCostPct);
    if (p.mp < mpCost) {
        termAppend(`Not enough mana! Death Mark costs ${mpCost} MP (25% of max).`, 'term-error');
        return;
    }
    if (!cs.monsters || cs.monsters.length === 0) return;
    const idx    = (targetIndex !== null && targetIndex !== undefined) ? targetIndex : 0;
    const target = cs.monsters[idx];
    if (!target || target.hp <= 0) return;

    p.mp -= mpCost;
    cs.deathMark = {
        enemyIndex:   idx,
        enemyName:    target.name,
        primaryBonus: tier.primaryBonus,
        splashPct:    tier.splashPct,
        mpCostPct:    tier.mpCostPct,
    };

    termAppend('', 'term-separator');
    termAppend(`🎯 <span style="color:#FF4444;font-weight:bold;">DEATH MARK!</span> ${target.name} is marked for death!`, 'term-highlight');
    termAppend(`🎯 Strikes on ${target.name}: +${Math.round((tier.primaryBonus - 1) * 100)}% damage | Others: ${Math.round(tier.splashPct * 100)}% splash per hit.`, 'term-loot');
    termAppend(`🎯 <span style="color:#888;">Retarget anytime for another ${mpCost} MP.</span>`, 'term-dim');
    updateHud();
    saveGame();
}

function applyDeathMark(p, cs, hitEnemy, rawDamage) {
    if (!cs.deathMark) return rawDamage;
    const markedEnemy = cs.monsters ? cs.monsters.find((m, i) => i === cs.deathMark.enemyIndex) : null;
    if (!markedEnemy || markedEnemy.hp <= 0) {
        termAppend('🎯 <span style="color:#888;">The Death Mark fades.</span>', 'term-dim');
        cs.deathMark = null;
        return rawDamage;
    }
    if (hitEnemy === markedEnemy) {
        const boosted  = Math.floor(rawDamage * cs.deathMark.primaryBonus);
        const bonus    = boosted - rawDamage;
        termAppend(`🎯 <span style="color:#FF4444;">Death Mark amplifies! +${bonus} bonus damage!</span>`, 'term-loot');
        const splashDmg = Math.max(1, Math.floor(boosted * cs.deathMark.splashPct));
        cs.monsters.forEach(other => {
            if (other === hitEnemy || other.hp <= 0) return;
            other.hp -= splashDmg;
            termAppend(`🎯 Shockwave hits ${other.name} for <span class="dmg-player">${splashDmg}</span>!`, 'term-loot');
        });
        return boosted;
    }
    return rawDamage;
}

// ─────────────────────────────────────────────────────────────
// 5. SAVAGE BITE — Hunter
// ─────────────────────────────────────────────────────────────
function activateSavageBite(p, cs, tier, targetIndex) {
    if (p.mp < tier.mpCost) {
        termAppend(`Not enough mana! Savage Bite costs ${tier.mpCost} MP.`, 'term-error');
        return;
    }
    if (!cs.monsters || cs.monsters.length === 0) return;
    const idx    = (targetIndex !== null && targetIndex !== undefined) ? targetIndex : 0;
    const target = cs.monsters[idx];
    if (!target || target.hp <= 0) return;

    p.mp -= tier.mpCost;
    if (!target._biteStacks) target._biteStacks = 0;
    target._biteStacks++;

    termAppend(`🐾 <span style="color:#AA0000;font-weight:bold;">SAVAGE BITE!</span> <em>${tier.label}</em>`, 'term-highlight');
    termAppend(`🐾 Your pet lunges at ${target.name}! Bleed x${target._biteStacks} stack${target._biteStacks > 1 ? 's' : ''}!`, 'term-loot');

    const bleedTimer = setInterval(() => {
        const _cs = gameState.combatState;
        if (!_cs || !_cs.monsters || _cs.combatOver) { clearInterval(bleedTimer); return; }
        const _t  = _cs.monsters.find(m => m === target);
        if (!_t || _t.hp <= 0) { clearInterval(bleedTimer); return; }
        _t.hp -= tier.tickDmg;
        termAppend(`🩸 ${_t.name} bleeds for <span class="dmg-player">${tier.tickDmg} damage</span>!`, 'term-loot');
        if (_t.hp <= 0) {
            clearInterval(bleedTimer);
            termAppend(`💀 ${_t.name} bleeds out!`, 'term-victory');
            checkCombatEnd();
        }
        updateHud();
    }, 2000);

    if (!cs.dotTimers) cs.dotTimers = {};
    cs.dotTimers[`bite_${Date.now()}`] = bleedTimer;

    setTimeout(() => {
        clearInterval(bleedTimer);
        if (target._biteStacks) target._biteStacks = Math.max(0, target._biteStacks - 1);
    }, 10000);

    updateHud();
    saveGame();
}

// ─────────────────────────────────────────────────────────────
// 6. MJOLNIR'S WRATH — Runesmith
// ─────────────────────────────────────────────────────────────
function activateMjolnirsWrath(p, cs, tier) {
    // ── TOGGLE OFF if already active ─────────────────────────
    if (cs.mjolnirTimer) {
        clearInterval(cs.mjolnirTimer);
        cs.mjolnirTimer = null;
        termAppend('⚡ <span style="color:#888;">The lightning fades as you lower your hammer.</span>', 'term-dim');
        updateHud();
        renderActionBar();
        return;
    }
    if (p.mp <= 0) {
        termAppend("No mana! Mjolnir's Wrath needs mana to channel.", 'term-error');
        return;
    }
    if (!cs.monsters || cs.monsters.length === 0) return;

    const pipIdx = cs.pipAvailable ? cs.pipAvailable.findIndex(x => x) : -1;
    if (pipIdx === -1) { termAppend('No pips available!', 'term-error'); return; }
    cs.pipAvailable[pipIdx] = false;
    cs.pipTimers[pipIdx]    = getPipCooldown(p);

    termAppend('', 'term-separator');
    termAppend(`⚡ <span style="color:#FFFF00;font-weight:bold;">MJOLNIR'S WRATH!</span> <em>${tier.label}</em>`, 'term-highlight');
    termAppend('⚡ Lightning crackles through your hammer — arcing between all enemies!', 'term-warning');

    let bounceIndex  = 0;
    const lightningDmg = Math.floor((p.wis || 1) * tier.wisMult) + 3;

    cs.mjolnirTimer = setInterval(() => {
        const _cs = gameState.combatState;
        const _p  = gameState.player;
        if (!_cs || !_p || _cs.combatOver) {
            clearInterval(cs.mjolnirTimer);
            cs.mjolnirTimer = null;
            return;
        }
        if (_p.mp <= 0) {
            clearInterval(_cs.mjolnirTimer);
            _cs.mjolnirTimer = null;
            termAppend('💨 <span style="color:#888;">The lightning fades — your mana is spent...</span>', 'term-dim');
            return;
        }
        _p.mp = Math.max(0, _p.mp - tier.mpPerBounce);

        const living = _cs.monsters.filter(m => m.hp > 0);
        if (living.length === 0) {
            clearInterval(_cs.mjolnirTimer);
            _cs.mjolnirTimer = null;
            return;
        }

        const target = living[bounceIndex % living.length];
        bounceIndex++;
        target.hp -= lightningDmg;
        termAppend(`⚡ Lightning arcs to <span style="color:#FFFF44;">${target.name}</span>! <span class="dmg-player">${lightningDmg} lightning damage!</span>`, 'term-loot');

        // Charge Overload pip every 3 bounces
        if (bounceIndex % 3 === 0 && (_p.runeOverloadPips || 0) < 3) {
            _p.runeOverloadPips = (_p.runeOverloadPips || 0) + 1;
            const rp = _p.runeOverloadPips;
            const r1 = rp >= 1 ? '🔶' : '⬛'; const r2 = rp >= 2 ? '🔶' : '⬛'; const r3 = rp >= 3 ? '🔶' : '⬛';
            termAppend(rp >= 3
                ? '⚒️ <span style="color:#FF8800;font-weight:bold;">RUNE OVERLOAD CHARGED! Strike now!</span>'
                : `⚒️ <span style="color:#c8a000;">Rune charged: ${r1}${r2}${r3}</span>`);
        }

        if (target.hp <= 0) {
            termAppend(`💀 ${target.name} is struck down by lightning!`, 'term-victory');
            checkCombatEnd();
        }
        updateHud();
        renderActionBar();
    }, tier.bounceMs);

    if (!cs.dotTimers) cs.dotTimers = {};
    cs.dotTimers['mjolnir'] = cs.mjolnirTimer;

    updateHud();
    renderActionBar();
    saveGame();
}

// ─────────────────────────────────────────────────────────────
// SCATTER SHOT — Hunter special (2 pips)
// ─────────────────────────────────────────────────────────────
function executeScatterShot() {
    const p  = gameState.player;
    const cs = gameState.combatState;
    if (!p || !cs || !cs.monsters || cs.monsters.length === 0) return;

    const hitsLeft = cs.pipAvailable ? cs.pipAvailable.filter(x => x).length : 0;
    if (hitsLeft < 2) {
        termAppend('Scatter Shot requires 2 pips!', 'term-error');
        return;
    }

    // Consume 2 pips
    let consumed = 0;
    for (let i = 0; i < cs.pipAvailable.length && consumed < 2; i++) {
        if (cs.pipAvailable[i]) {
            cs.pipAvailable[i] = false;
            cs.pipTimers[i]    = getPipCooldown(p);
            consumed++;
        }
    }

    const tier       = getScatterShotTier(p.level);
    const weapon     = WEAPONS[p.weapon];
    if (!weapon) return;

    const qBonus     = getQualityBonus(weapon.quality, weapon.baseDamage);
    const baseWpnDmg = Math.floor(
        Math.random() * ((weapon.maxDamage || weapon.baseDamage) - weapon.baseDamage + 1)
    ) + weapon.baseDamage + qBonus;
    const strBonus   = Math.floor((p.str || 0) * 1.0);
    const arrowBase  = Math.floor((baseWpnDmg + strBonus) * tier.arrowPct);

    termAppend('', 'term-separator');
    termAppend('🏹 <span style="color:#CCCC44;font-weight:bold;font-size:16px;">SCATTER SHOT!</span> Arrows fly in all directions!', 'term-highlight');

    let totalDmg = 0;

    cs.monsters.forEach(enemy => {
        if (enemy.hp <= 0) return;
        const hits    = Math.floor(Math.random() * (tier.maxHits - tier.minHits + 1)) + tier.minHits;
        const eDR     = Math.min(0.75, (enemy.defense || 0) * 0.028);
        const arrowLog = [];
        let enemyDmg  = 0;

        for (let i = 0; i < hits; i++) {
            const critChance = (p.lck || 0) * 0.5 + 10;
            const isCrit     = Math.random() * 100 < critChance;
            let arrowDmg     = Math.max(1, Math.floor(arrowBase * (1 - eDR)));
            if (isCrit) {
                arrowDmg *= 2;
                arrowLog.push(`<span style="color:#FF4444;">${arrowDmg}💀</span>`);
            } else {
                arrowLog.push(`<span class="dmg-player">${arrowDmg}</span>`);
            }
            enemyDmg += arrowDmg;
        }

        enemy.hp -= enemyDmg;
        totalDmg += enemyDmg;
        termAppend(`🏹 ${enemy.name}: ${arrowLog.join(' ')} (×${hits}) = <strong>${enemyDmg}</strong>`, 'term-loot');
        if (enemy.hp <= 0) termAppend(`💀 ${enemy.name} is riddled with arrows!`, 'term-victory');
    });

    termAppend(`🏹 Scatter Shot total: <span class="dmg-player">${totalDmg} damage</span>`, 'term-highlight');
    checkCombatEnd();
    updateHud();
    renderActionBar();
    saveGame();
}

// ─────────────────────────────────────────────────────────────
// PIPELINE HOOK — called inside executeAttack after enemy.hp -= finalDamage
// ─────────────────────────────────────────────────────────────
function applyEnchantHooks(p, cs, enemy, rawDamage) {
    const classKey = p.baseClass || p.class;
    let dmg = rawDamage;
    if ((classKey === 'archer' || classKey === 'ranger') && cs.deathMark) {
        dmg = applyDeathMark(p, cs, enemy, dmg);
        // Apply the additional death mark damage to enemy HP
        const extra = dmg - rawDamage;
        if (extra > 0) enemy.hp -= extra;
    }
    if (classKey === 'warrior' && cs.bloodrage) {
        applyBloodrageHeal(p, cs, dmg);
    }
    if (classKey === 'rogue' && cs.exposeWeakness) {
        applyExposeWeakness(cs, enemy);
    }
}
