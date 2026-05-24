// ═══════════════════════════════════════════════════════════════
// DUNGEON NAVIGATION — room movement, traps, encounters, exits
// Extracted from index.html
// Dependencies: gameState, termAppend, updateHud, saveGame (runtime globals)
// ═══════════════════════════════════════════════════════════════

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
    // Count UNIQUE staff pieces by piece number (requires 1-8, not 8 of same)
    const allStaffPieces = (gameState.player.inventory || []).filter(i => {
        if (!i) return false;
        if (typeof i === 'string') return i.startsWith('staff_piece_');
        if (typeof i === 'object') return i.subtype === 'staff_piece';
        return false;
    });
    
    // Get unique piece numbers (1-8)
    const uniquePieceNumbers = new Set();
    allStaffPieces.forEach(piece => {
        if (typeof piece === 'object' && piece.staffPieceNumber) {
            uniquePieceNumbers.add(piece.staffPieceNumber);
        } else if (typeof piece === 'string') {
            const match = piece.match(/staff_piece_(\d+)/);
            if (match) uniquePieceNumbers.add(parseInt(match[1]));
        }
    });
    
    const uniqueCount = uniquePieceNumbers.size;
    
    if (uniqueCount >= 8) {
        shouldTeleport = true;
        termAppend(`🪄 The eight UNIQUE staff pieces resonate with the ancient gate!`, 'term-highlight');
        
        // Remove ALL staff pieces
        gameState.player.inventory = gameState.player.inventory.filter(i => {
            if (!i) return true;
            if (typeof i === 'string') return !i.startsWith('staff_piece_');
            if (typeof i === 'object') return i.subtype !== 'staff_piece';
            return true;
        });
        termAppend(`🪄 All staff pieces dissolve into the gate, consumed by the teleportation!`, 'term-warning');
    } else {
        termAppend(`🪄 The gate requires all 8 UNIQUE staff pieces to activate. (${uniqueCount}/8 unique pieces)`, 'term-dim');
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
    // Count UNIQUE staff pieces by piece number (requires 1-8, not 8 of same)
    const allStaffPieces = (gameState.player.inventory || []).filter(i => {
        if (!i) return false;
        if (typeof i === 'string') return i.startsWith('staff_piece_');
        if (typeof i === 'object') return i.subtype === 'staff_piece';
        return false;
    });
    
    // Get unique piece numbers (1-8)
    const uniquePieceNumbers = new Set();
    allStaffPieces.forEach(piece => {
        if (typeof piece === 'object' && piece.staffPieceNumber) {
            uniquePieceNumbers.add(piece.staffPieceNumber);
        } else if (typeof piece === 'string') {
            const match = piece.match(/staff_piece_(\d+)/);
            if (match) uniquePieceNumbers.add(parseInt(match[1]));
        }
    });
    
    const uniqueCount = uniquePieceNumbers.size;
    
    if (uniqueCount >= 8) {
        shouldTeleport = true;
        termAppend(`🪄 The eight UNIQUE staff pieces resonate with the ancient gate!`, 'term-highlight');
        
        // Remove ALL staff pieces
        gameState.player.inventory = gameState.player.inventory.filter(i => {
            if (!i) return true;
            if (typeof i === 'string') return !i.startsWith('staff_piece_');
            if (typeof i === 'object') return i.subtype !== 'staff_piece';
            return true;
        });
        termAppend(`🪄 All staff pieces dissolve into the gate, consumed by the teleportation!`, 'term-warning');
    } else {
        termAppend(`🪄 The gate requires all 8 UNIQUE staff pieces to activate. (${uniqueCount}/8 unique pieces)`, 'term-dim');
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

    // ─────────────────────────────────────────────────────────
    // SPECIAL HANDLING FOR RANDOM DUNGEON
    // The random dungeon stores enemies in room.enemies, not ds.activeEnemies
    // ─────────────────────────────────────────────────────────
    if (ds.dungeonKey === 'random_dungeon') {
        const dungeon = DUNGEONS['random_dungeon'];
        if (dungeon && dungeon.floors && dungeon.floors[ds.floor]) {
            const roomData = dungeon.floors[ds.floor].rooms[roomId];
            if (roomData && roomData.enemies && roomData.enemies.length > 0 && !gameState.combatState) {
                // Convert room.enemies to the format startDungeonCombat expects
                const dungeonEnemies = roomData.enemies.map(e => ({
                    id: crypto.randomUUID(),
                    monsterId: e.key || e.monsterId,
                    name: e.name,
                    currentRoom: roomId,
                    originalRoom: roomId,
                    rarity: e.rarity,
                    hp: e.hp,
                    maxHp: e.maxHp,
                    isBoss: e.isBoss || false,
                    isRandomBoss: e.isRandomBoss || false,
                    leash: (e.isBoss || e.isRandomBoss) ? 6 : 3,
                    roomsFollowed: 0,
                    isChasing: true,
                    drop: null
                }));

                // Push into ds.activeEnemies so the leash system tracks them,
                // then clear room.enemies so re-entry never re-triggers combat.
                ds.activeEnemies.push(...dungeonEnemies);
                roomData.enemies = [];

                // DEBUG: Check if boss flags are preserved
                console.log('🐉 BOSS DATA CHECK:', {
                    name: dungeonEnemies[0]?.name,
                    isBoss: dungeonEnemies[0]?.isBoss,
                    isRandomBoss: dungeonEnemies[0]?.isRandomBoss,
                    hp: dungeonEnemies[0]?.hp,
                    maxHp: dungeonEnemies[0]?.maxHp
                });

                
                
                // ─────────────────────────────────────────────────────────
                // CHECK IF THIS IS A BOSS ROOM - EPIC DRAMATIC ANNOUNCEMENT
                // ─────────────────────────────────────────────────────────
                const isBossRoom = roomData.isBossRoom === true;
                const hasBoss = dungeonEnemies.some(e => e.isBoss === true || e.isRandomBoss === true);
                
                if (isBossRoom || hasBoss) {
                    const bossData = dungeonEnemies.find(e => e.isBoss || e.isRandomBoss);
                    const bossName = bossData?.name || 'ANCIENT GUARDIAN';
                    
                    // EPIC DRAMATIC FLASH - Red/Orange
                    const bossFlash = document.createElement('div');
                    bossFlash.style.cssText = 'position:fixed;inset:0;z-index:99998;background:radial-gradient(circle,#ff0000,#ff4400,#000);opacity:0;pointer-events:none;transition:opacity 0.2s ease;';
                    document.body.appendChild(bossFlash);
                    setTimeout(() => bossFlash.style.opacity = '0.8', 10);
                    setTimeout(() => bossFlash.style.opacity = '0.3', 200);
                    setTimeout(() => bossFlash.style.opacity = '0.7', 400);
                    setTimeout(() => bossFlash.style.opacity = '0', 600);
                    setTimeout(() => bossFlash.remove(), 800);
                    
                    // WHITE HOT FLASH
                    setTimeout(() => {
                        const whiteFlash = document.createElement('div');
                        whiteFlash.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#fff;opacity:0;pointer-events:none;transition:opacity 0.1s ease;';
                        document.body.appendChild(whiteFlash);
                        setTimeout(() => whiteFlash.style.opacity = '0.4', 10);
                        setTimeout(() => whiteFlash.style.opacity = '0', 150);
                        setTimeout(() => whiteFlash.remove(), 300);
                    }, 100);
                    
                    // INTENSE SCREEN SHAKE
                    const terminalWindow = document.getElementById('terminalWindow');
                    if (terminalWindow) {
                        terminalWindow.style.transition = 'transform 0.05s ease';
                        let shakes = 0;
                        const shakeInterval = setInterval(() => {
                            if (shakes >= 12) {
                                clearInterval(shakeInterval);
                                terminalWindow.style.transform = 'translateX(0)';
                                terminalWindow.style.transition = '';
                                return;
                            }
                            terminalWindow.style.transform = `translate(${(Math.random() - 0.5) * 12}px, ${(Math.random() - 0.5) * 6}px)`;
                            shakes++;
                        }, 35);
                    }
                    
                    // EPIC DRAMATIC TEXT
                    termAppend('', 'term-separator');
                    termAppend('<span style="color:#FF0000;font-size:38px;font-weight:bold;text-align:center;display:block;text-shadow:0 0 20px #FF0000;">⚔️⚔️⚔️ BOSS ENCOUNTER! ⚔️⚔️⚔️</span>', 'term-victory');
                    termAppend('', 'term-separator');
                    termAppend(`<span style="color:#FF6600;font-size:28px;font-weight:bold;text-align:center;display:block;background:#00000088;padding:8px;border-radius:8px;">🔥 ${bossName.toUpperCase()} 🔥</span>`, 'term-enemy');
                    termAppend('', 'term-separator');
                    termAppend('<span style="color:#FFAA00;font-size:20px;font-style:italic;text-align:center;display:block;">✦ THE AIR BECOMES UNBEARABLY HEAVY ✦</span>', 'term-warning');
                    termAppend('<span style="color:#FF4444;font-size:16px;text-align:center;display:block;">The ground trembles beneath your feet...</span>', 'term-warning');
                    termAppend('<span style="color:#FF8888;font-size:16px;text-align:center;display:block;">A terrifying roar echoes through the chamber!</span>', 'term-warning');
                    termAppend('', 'term-separator');
                    termAppend('<span style="color:#FFD700;font-size:18px;font-weight:bold;text-align:center;display:block;">💀 THIS IS THE MOMENT YOU\'VE BEEN PREPARING FOR! 💀</span>', 'term-highlight');
                    termAppend('', 'term-separator');
                    
                    // PULSING RED BORDER
                    if (terminalWindow) {
                        terminalWindow.style.transition = 'box-shadow 0.2s ease';
                        terminalWindow.style.boxShadow = '0 0 30px rgba(255,0,0,0.8), inset 0 0 20px rgba(255,0,0,0.3)';
                        setTimeout(() => {
                            terminalWindow.style.boxShadow = '0 0 15px rgba(255,0,0,0.4), inset 0 0 10px rgba(255,0,0,0.1)';
                        }, 500);
                        setTimeout(() => {
                            terminalWindow.style.boxShadow = '';
                        }, 2000);
                    }
                }
                
                console.log(`🌀 Random dungeon: Starting combat with ${dungeonEnemies.length} enemy(s) in ${roomId}`);
                if (dungeonEnemies.length === 1) {
                    termAppend(`⚔️ <strong>${dungeonEnemies[0].name}</strong> confronts you!`, 'term-warning');
                } else {
                    const names = dungeonEnemies.map(e => `<strong>${e.name}</strong>`).join(', ');
                    termAppend(`⚔️ ${names} surround you!`, 'term-warning');
                }
                startDungeonCombat(dungeonEnemies);
                // Strip from activeEnemies by monsterId+room so the post-combat
                // checkEnemiesInRoom call can't start a second fight via this path.
                const foughtIds = new Set(dungeonEnemies.map(e => e.monsterId));
                ds.activeEnemies = ds.activeEnemies.filter(
                    e => !(foughtIds.has(e.monsterId) && e.currentRoom === roomId)
                );
                return;
            }
        }
    }

    const enemiesHere = ds.activeEnemies.filter(e => e.currentRoom === roomId);
    if (enemiesHere.length === 0) return;

    const cs = gameState.combatState;

    // ── Active non-finished combat: add ALL room enemies not yet in this fight ──
    if (cs && !cs.combatOver) {
        const linkedIds = new Set(cs.dungeonEnemyIds || (cs.dungeonEnemyId ? [cs.dungeonEnemyId] : []));

        // Join = any enemy in this room not already tracked in combat
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

    // ── EPIC BOSS INTRO — fires for any boss coming through activeEnemies path ──
    const bossEnemy = enemiesHere.find(e => e.isBoss || e.isRandomBoss);
    if (bossEnemy) {
        const bossName = bossEnemy.name || 'ANCIENT GUARDIAN';

        const bossFlash = document.createElement('div');
        bossFlash.style.cssText = 'position:fixed;inset:0;z-index:99998;background:radial-gradient(circle,#ff0000,#ff4400,#000);opacity:0;pointer-events:none;transition:opacity 0.2s ease;';
        document.body.appendChild(bossFlash);
        setTimeout(() => bossFlash.style.opacity = '0.8', 10);
        setTimeout(() => bossFlash.style.opacity = '0.3', 200);
        setTimeout(() => bossFlash.style.opacity = '0.7', 400);
        setTimeout(() => bossFlash.style.opacity = '0', 600);
        setTimeout(() => bossFlash.remove(), 800);

        setTimeout(() => {
            const whiteFlash = document.createElement('div');
            whiteFlash.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#fff;opacity:0;pointer-events:none;transition:opacity 0.1s ease;';
            document.body.appendChild(whiteFlash);
            setTimeout(() => whiteFlash.style.opacity = '0.4', 10);
            setTimeout(() => whiteFlash.style.opacity = '0', 150);
            setTimeout(() => whiteFlash.remove(), 300);
        }, 100);

        const terminalWindow = document.getElementById('terminalWindow');
        if (terminalWindow) {
            terminalWindow.style.transition = 'transform 0.05s ease';
            let shakes = 0;
            const shakeInterval = setInterval(() => {
                if (shakes >= 12) {
                    clearInterval(shakeInterval);
                    terminalWindow.style.transform = 'translateX(0)';
                    terminalWindow.style.transition = '';
                    return;
                }
                terminalWindow.style.transform = `translate(${(Math.random() - 0.5) * 12}px, ${(Math.random() - 0.5) * 6}px)`;
                shakes++;
            }, 35);
        }

        termAppend('', 'term-separator');
        termAppend('<span style="color:#FF0000;font-size:38px;font-weight:bold;text-align:center;display:block;text-shadow:0 0 20px #FF0000;">⚔️⚔️⚔️ BOSS ENCOUNTER! ⚔️⚔️⚔️</span>', 'term-victory');
        termAppend('', 'term-separator');
        termAppend(`<span style="color:#FF6600;font-size:28px;font-weight:bold;text-align:center;display:block;background:#00000088;padding:8px;border-radius:8px;">🔥 ${bossName.toUpperCase()} 🔥</span>`, 'term-enemy');
        termAppend('', 'term-separator');
        termAppend('<span style="color:#FFAA00;font-size:20px;font-style:italic;text-align:center;display:block;">✦ THE AIR BECOMES UNBEARABLY HEAVY ✦</span>', 'term-warning');
        termAppend('<span style="color:#FF4444;font-size:16px;text-align:center;display:block;">The ground trembles beneath your feet...</span>', 'term-warning');
        termAppend('<span style="color:#FF8888;font-size:16px;text-align:center;display:block;">A terrifying roar echoes through the chamber!</span>', 'term-warning');
        termAppend('', 'term-separator');
        termAppend('<span style="color:#FFD700;font-size:18px;font-weight:bold;text-align:center;display:block;">💀 THIS IS THE MOMENT YOU\'VE BEEN PREPARING FOR! 💀</span>', 'term-highlight');
        termAppend('', 'term-separator');

        if (terminalWindow) {
            terminalWindow.style.transition = 'box-shadow 0.2s ease';
            terminalWindow.style.boxShadow = '0 0 30px rgba(255,0,0,0.8), inset 0 0 20px rgba(255,0,0,0.3)';
            setTimeout(() => { terminalWindow.style.boxShadow = '0 0 15px rgba(255,0,0,0.4), inset 0 0 10px rgba(255,0,0,0.1)'; }, 500);
            setTimeout(() => { terminalWindow.style.boxShadow = ''; }, 2000);
        }
    } else if (enemiesHere.length === 1) {
        termAppend(`⚔️ <strong>${enemiesHere[0].name}</strong> confronts you!`, 'term-warning');
    } else {
        const names = enemiesHere.map(e => `<strong>${e.name}</strong>`).join(', ');
        termAppend(`⚔️ ${names} surround you!`, 'term-warning');
    }
    startDungeonCombat(enemiesHere);
}
/*
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
*/

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
