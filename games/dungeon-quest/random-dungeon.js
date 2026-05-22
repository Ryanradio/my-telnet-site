// ═══════════════════════════════════════════════════════════════════════════════
// RANDOM DUNGEON GENERATOR — random-dungeon.js
// ═══════════════════════════════════════════════════════════════════════════════
//
// Generates a fresh single-floor procedural dungeon every run.
// Plugs directly into the existing DUNGEONS registry and spawnMonsterWithRarity().
//
// HOW IT WORKS:
//   1. Call generateRandomDungeon(playerLevel) to build a fresh floor
//      and register it as DUNGEONS['random_dungeon'].
//   2. Call startRandomDungeon() to enter it (shows the warning modal first).
//   3. On boss kill the game awards a guaranteed weapon or armor drop
//      and a recall_potion — just like any other dungeon kill, except forced.
//
// ROOM COUNT:    20–30 rooms
// ENEMY LEVELS:  playerLevel + 0 to +2  (boss is playerLevel + 2)
// BOSS RARITY:   Epic / Legendary / Godly (random each run)
// BOSS STATS:    2–3× HP, 1.5× damage
// GUARANTEED:    Boss drops a random weapon OR armor + a recall_potion
//
// ═══════════════════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // ── Tunables ──────────────────────────────────────────────────────────────
    const MIN_ROOMS        = 20;
    const MAX_ROOMS        = 30;
    const BOSS_RARITIES    = ['epic', 'legendary', 'godly'];
    const BOSS_HP_MULT_MIN = 2.0;
    const BOSS_HP_MULT_MAX = 3.0;
    const BOSS_DMG_MULT    = 1.5;
    const ENEMY_LEVEL_PAD  = 2;   // enemies spawn up to this many levels above player

    // Room name / description pools
    const ROOM_NAMES = [
        'Crumbling Corridor',   'Fetid Antechamber',  'Bone Alcove',
        'Collapsed Passage',    'Weeping Chamber',    'Rusted Gate Hall',
        'Mossy Vault',          'Charnel Pit',        'Forgotten Shrine',
        'Fungal Den',           'Hollow Nave',        'Broken Cistern',
        'Shadowed Alcove',      'Ashen Gallery',      'Flooded Vestibule',
        'Rat Warren',           'Sunken Chapel',      'Smoldering Arch',
        'Twisted Crypt',        'Echo Chamber',       'Sealed Ossuary',
        'Caved-In Barracks',    'Sanguine Pool',      'Torchlit Antehall',
        'Bloodstained Cell',    'Iron Door Room',     'Collapsed Throne',
        'Vaulted Catacomb',     'Sulfurous Recess',   'Dim Passageway',
    ];

    const ROOM_DESCS = [
        'The stench of rot hangs heavy in the air.',
        'Cracks spider-web across every stone surface.',
        'Bones litter the floor like fallen leaves.',
        'A low moan echoes from somewhere deeper in.',
        'Patches of luminescent fungus cast a pale glow.',
        'Water drips steadily from unseen cracks above.',
        'Rusted chains dangle from iron rings in the wall.',
        'The air tastes of old blood and ash.',
        'Crumbling murals hint at a civilization long gone.',
        'An unnatural cold seeps through the stone.',
        'Faint scratching sounds come from within the walls.',
        'Something has been dragged through here recently.',
        'The ceiling sags dangerously over the centre.',
        'A single torch gutters on a corroded sconce.',
        'Scattered coins glint dully among the debris.',
        'The silence here feels almost alive.',
        'Dark stains mark the walls at shoulder height.',
        'Every footstep raises a cloud of grey dust.',
        'Claw marks score the stone from floor to ceiling.',
        'An oppressive darkness clings to the corners.',
    ];

    const BOSS_ROOM_NAMES = [
        'Chamber of the Undying',
        'Throne of Ruin',
        'The Dread Sanctum',
        'Hall of the Forsaken King',
        'The Last Bastion',
        'Apex of Darkness',
        'The Infernal Seat',
    ];

    const BOSS_ROOM_DESCS = [
        'The air crackles with an ancient, malevolent power. Something immense waits within.',
        'A throne of shattered bone dominates the far wall. Its occupant turns to face you.',
        'Silence. Then a low, resonant growl fills the chamber from every direction at once.',
        'The temperature plummets as the doors seal shut behind you. There is no leaving — not yet.',
        'Runes blaze to life along the walls as you cross the threshold. A shape rises from the dark.',
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // UTILITY
    // ─────────────────────────────────────────────────────────────────────────

    function rng(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const OPPOSITES = { n: 's', s: 'n', e: 'w', w: 'e' };

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1 — Build a connected grid of rooms
    // ─────────────────────────────────────────────────────────────────────────

    function buildLayout(totalRooms) {
        // Start at origin, grow with a random walk / branching tree
        const placed = {};   // key → { x, y }
        const keys   = [];

        placed['r0'] = { x: 0, y: 0 };
        keys.push('r0');

        const DIRS = [
            { dir: 'n', dx: 0,  dy: -1 },
            { dir: 's', dx: 0,  dy:  1 },
            { dir: 'e', dx: 1,  dy:  0 },
            { dir: 'w', dx: -1, dy:  0 },
        ];

        const coordUsed = new Set(['0,0']);

        // Keep a frontier of rooms we can expand from
        let frontier = ['r0'];
        let nextId = 1;

        while (keys.length < totalRooms && frontier.length > 0) {
            // Bias toward the current end of frontier (depth-first feel)
            const parentIdx = Math.random() < 0.7
                ? frontier.length - 1
                : rng(0, frontier.length - 1);
            const parentKey = frontier[parentIdx];
            const { x, y }  = placed[parentKey];

            const candidates = shuffle(DIRS).filter(({ dx, dy }) => {
                const nx = x + dx, ny = y + dy;
                return !coordUsed.has(`${nx},${ny}`);
            });

            if (candidates.length === 0) {
                // Dead-end — remove from frontier
                frontier.splice(parentIdx, 1);
                continue;
            }

            const { dir, dx, dy } = candidates[0];
            const nx = x + dx, ny = y + dy;
            const newKey = `r${nextId++}`;

            placed[newKey] = { x: nx, y: ny };
            keys.push(newKey);
            coordUsed.add(`${nx},${ny}`);

            // 60% chance to keep parent in frontier (allows branching)
            if (Math.random() < 0.6) frontier.push(newKey);
            else {
                frontier.splice(parentIdx, 1);
                frontier.push(newKey);
            }
        }

        return { placed, keys };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 2 — Build exits from the grid positions
    // ─────────────────────────────────────────────────────────────────────────

    function buildExits(placed, keys) {
        const DIRS = [
            { dir: 'n', dx: 0,  dy: -1 },
            { dir: 's', dx: 0,  dy:  1 },
            { dir: 'e', dx: 1,  dy:  0 },
            { dir: 'w', dx: -1, dy:  0 },
        ];

        // Build coord → key lookup
        const coordToKey = {};
        for (const k of keys) {
            const { x, y } = placed[k];
            coordToKey[`${x},${y}`] = k;
        }

        const exits = {};
        for (const k of keys) {
            exits[k] = {};
            const { x, y } = placed[k];
            for (const { dir, dx, dy } of DIRS) {
                const neighbor = coordToKey[`${x + dx},${y + dy}`];
                if (neighbor) exits[k][dir] = neighbor;
            }
        }
        return exits;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 3 — Pick monsters appropriate to the player's level
    // ─────────────────────────────────────────────────────────────────────────

    function buildMonsterPool(playerLevel) {
        if (typeof ENEMIES === 'undefined') return [];

        const minLvl = Math.max(1, playerLevel - 1);
        const maxLvl = playerLevel + ENEMY_LEVEL_PAD;

        const pool = Object.keys(ENEMIES).filter(key => {
            const e = ENEMIES[key];
            return e && e.level >= minLvl && e.level <= maxLvl && !e.isBoss;
        });

        return pool.length > 0 ? pool : Object.keys(ENEMIES).filter(k => !ENEMIES[k].isBoss).slice(0, 20);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 4 — Build the boss monster object
    // ─────────────────────────────────────────────────────────────────────────

    function buildBossMonster(playerLevel, pool) {
        if (typeof ENEMIES === 'undefined' || pool.length === 0) return null;

        // Prefer monsters at or near the top of the level range
        const bossLevel = playerLevel + ENEMY_LEVEL_PAD;
        const bossPool  = pool.filter(k => ENEMIES[k].level >= playerLevel)
                              .sort((a, b) => ENEMIES[b].level - ENEMIES[a].level);

        const baseKey  = bossPool.length > 0 ? pick(bossPool.slice(0, Math.min(5, bossPool.length))) : pick(pool);
        const template = ENEMIES[baseKey];
        const rarity   = pick(BOSS_RARITIES);
        const hpMult   = BOSS_HP_MULT_MIN + Math.random() * (BOSS_HP_MULT_MAX - BOSS_HP_MULT_MIN);

        const rarityColor = (typeof RARITY_CONFIG !== 'undefined' && RARITY_CONFIG[rarity])
            ? RARITY_CONFIG[rarity].color
            : '#cc44ff';

        const minDmg = template.minDamage ?? Math.max(1, Math.round(template.baseDamage * 0.67));
        const maxDmg = template.maxDamage ?? Math.max(minDmg + 1, Math.round(template.baseDamage * 1.33));

        const _abils    = template.abilities || [];
        const _maxMp    = _abils.reduce((m, a) => Math.max(m, a.mpCost || 0), 0) * 2;

        return {
            key:            baseKey,
            monsterId:      baseKey,
            name:           `${rarity.charAt(0).toUpperCase() + rarity.slice(1)} ${template.name}`,
            rarity:         rarity,
            rarityColor:    rarityColor,
            hp:             Math.floor(template.baseHp * hpMult),
            maxHp:          Math.floor(template.baseHp * hpMult),
            damage:         Math.floor(template.baseDamage * BOSS_DMG_MULT),
            minDamage:      Math.floor(minDmg * BOSS_DMG_MULT),
            maxDamage:      Math.floor(maxDmg * BOSS_DMG_MULT),
            baseDamage:     Math.floor(template.baseDamage * BOSS_DMG_MULT),
            defense:        template.baseDefense,
            xp:             Math.floor(template.baseXp * 5),
            gold:           Math.floor(template.baseGold * 3),
            level:          bossLevel,
            possibleDrops:  template.possibleDrops || [],
            dropRates:      template.dropRates || { common: 0.5, uncommon: 0.3, rare: 0.15, epic: 0.05 },
            abilities:      template.abilities || [],
            isBoss:         true,
            isRandomBoss:   true,   // flag for guaranteed loot
            spellResist:    template.baseSpellResist || 0,
            magicAttack:    template.magicAttack || false,
            baseMp:         _maxMp,
            mp:             _maxMp,
            mpDepleted:     false,
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 5 — Assemble the full floor object (DUNGEONS schema)
    // ─────────────────────────────────────────────────────────────────────────

    function buildFloor(playerLevel) {
        const totalRooms = rng(MIN_ROOMS, MAX_ROOMS);
        const { placed, keys } = buildLayout(totalRooms);
        const exitMap  = buildExits(placed, keys);
        const pool     = buildMonsterPool(playerLevel);
        const boss     = buildBossMonster(playerLevel, pool);

        // The last key in traversal order becomes the boss room
        const startRoom = 'r0';

        // Find the key farthest from start using BFS
        function bfsDist(from) {
            const dist = { [from]: 0 };
            const queue = [from];
            while (queue.length) {
                const cur = queue.shift();
                for (const nb of Object.values(exitMap[cur] || {})) {
                    if (!(nb in dist)) { dist[nb] = dist[cur] + 1; queue.push(nb); }
                }
            }
            return dist;
        }

        const dist = bfsDist(startRoom);
        const bossRoom = Object.keys(dist).reduce((a, b) => dist[a] > dist[b] ? a : b);

        // Assign descriptive names / positions / enemies to rooms
        const usedNames = new Set();
        const rooms     = {};

        for (const key of keys) {
            const isBossRoom  = key === bossRoom;
            const isStartRoom = key === startRoom;

            // Pick a unique name
            let name;
            if (isBossRoom) {
                name = pick(BOSS_ROOM_NAMES);
            } else if (isStartRoom) {
                name = '🚪 Dungeon Entrance';
            } else {
                const available = ROOM_NAMES.filter(n => !usedNames.has(n));
                name = available.length > 0 ? pick(available) : `Chamber ${key}`;
            }
            usedNames.add(name);

            const desc = isBossRoom
                ? pick(BOSS_ROOM_DESCS)
                : pick(ROOM_DESCS);

            // Enemies - store as full monster objects that combat expects
            let enemies = [];
            if (isBossRoom && boss) {
                enemies = [boss];
            } else if (!isStartRoom && pool.length > 0) {
                const count = rng(1, 3);
                for (let i = 0; i < count; i++) {
                    const monsterKey = pick(pool);
                    const template = ENEMIES[monsterKey];
                    if (!template) continue;
                    
                    const lvl = rng(playerLevel, playerLevel + ENEMY_LEVEL_PAD);
                    const rarity = (typeof rollRarity === 'function') ? rollRarity() : 'common';
                    const mult = (typeof RARITY_CONFIG !== 'undefined' && RARITY_CONFIG[rarity])
                        ? RARITY_CONFIG[rarity].multiplier : 1;

                    const minD = template.minDamage ?? Math.max(1, Math.round(template.baseDamage * 0.67));
                    const maxD = template.maxDamage ?? Math.max(minD + 1, Math.round(template.baseDamage * 1.33));
                    const _abils2 = template.abilities || [];
                    const _mp2 = _abils2.reduce((m, a) => Math.max(m, a.mpCost || 0), 0) * 2;
                    const rarityColor = (typeof RARITY_CONFIG !== 'undefined' && RARITY_CONFIG[rarity])
                        ? RARITY_CONFIG[rarity].color : '#cccccc';

                    enemies.push({
                        key:           monsterKey,
                        monsterId:     monsterKey,
                        name:          template.name,
                        rarity:        rarity,
                        rarityColor:   rarityColor,
                        hp:            Math.floor(template.baseHp * mult),
                        maxHp:         Math.floor(template.baseHp * mult),
                        damage:        Math.floor(template.baseDamage * mult),
                        minDamage:     Math.floor(minD * mult),
                        maxDamage:     Math.floor(maxD * mult),
                        baseDamage:    Math.floor(template.baseDamage * mult),
                        defense:       Math.floor(template.baseDefense * mult),
                        xp:            Math.floor(template.baseXp * mult),
                        gold:          Math.floor(template.baseGold * mult),
                        level:         lvl,
                        possibleDrops: template.possibleDrops || [],
                        dropRates:     template.dropRates || { common: 0.5, uncommon: 0.3, rare: 0.15, epic: 0.05 },
                        abilities:     template.abilities || [],
                        isBoss:        false,
                        spellResist:   template.baseSpellResist || 0,
                        magicAttack:   template.magicAttack || false,
                        baseMp:        _mp2,
                        mp:            _mp2,
                        mpDepleted:    false,
                    });
                }
            }

            rooms[key] = {
                name,
                description: desc,
                x: placed[key].x,
                y: placed[key].y,
                map: { x: placed[key].x, y: placed[key].y },
                exits: exitMap[key] || {},
                enemies: enemies,  // Store full monster objects, not just keys
                isBossRoom,
                flags: {
                    discovered:     false,
                    firstDiscovery: false,
                },
                contents: {}
            };
        }

        return {
            startRoom,
            bossRoom,
            rooms,
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC API — generateRandomDungeon(playerLevel)
    // Registers a fresh dungeon into DUNGEONS['random_dungeon']
    // ─────────────────────────────────────────────────────────────────────────

    function generateRandomDungeon(playerLevel) {
        if (typeof DUNGEONS === 'undefined') {
            console.error('random-dungeon.js: DUNGEONS not loaded yet!');
            return null;
        }

        playerLevel = Math.max(1, playerLevel || 1);
        
        // COMPLETELY replace the random dungeon entry, don't merge
        delete DUNGEONS['random_dungeon'];
        
        const floor1 = buildFloor(playerLevel);
        const totalRooms = Object.keys(floor1.rooms).length;

        const dungeon = {
            name:   '🌀 The Shifting Labyrinth',
            key:    'random_dungeon',
            floors: {
                1: floor1,
            },
            _generatedForLevel: playerLevel,
            _generatedAt:       Date.now(),
        };

        DUNGEONS['random_dungeon'] = dungeon;
        console.log(`🌀 Random dungeon generated: ${totalRooms} rooms, player level ${playerLevel}, boss room: ${floor1.bossRoom}`);
        console.log(`🌀 Enemies generated:`, Object.values(floor1.rooms).map(r => `${r.name}: ${r.enemies.length} enemies`));
        return dungeon;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Populate ds.activeEnemies from room.enemies after startDungeon() runs
    // ─────────────────────────────────────────────────────────────────────────

    function _populateRandomDungeonEnemies() {
        const ds = gameState && gameState.dungeon;
        if (!ds || ds.dungeonKey !== 'random_dungeon') return;

        const dungeon = DUNGEONS['random_dungeon'];
        if (!dungeon || !dungeon.floors || !dungeon.floors[1]) return;

        // ENSURE a clean slate for this run's active enemies
        ds.activeEnemies = [];
        ds.defeatedEnemies = [];
        
        // Clear only random dungeon discovered rooms
        if (ds.discoveredRooms) {
            const toKeep = new Set();
            for (const key of ds.discoveredRooms) {
                // Random dungeon rooms start with "1:r", keep everything else
                if (!key.startsWith('1:r')) {
                    toKeep.add(key);
                }
            }
            ds.discoveredRooms = toKeep;
        } else {
            ds.discoveredRooms = new Set();
        }
        
        // Also clear spawnedRooms for the random dungeon
        if (ds.spawnedRooms) {
            const spawnedToKeep = new Set();
            for (const key of ds.spawnedRooms) {
                if (!key.startsWith('r')) {
                    spawnedToKeep.add(key);
                }
            }
            ds.spawnedRooms = spawnedToKeep;
        } else {
            ds.spawnedRooms = new Set();
        }

        const rooms = dungeon.floors[1].rooms;
        let idCounter = 1;
        const activeEnemies = [];

        Object.keys(rooms).forEach(roomId => {
            const room = rooms[roomId];
            if (!room.enemies || room.enemies.length === 0) return;

            room.enemies.forEach(monster => {
                activeEnemies.push({
                    id:            'rd_' + (idCounter++) + '_' + roomId,
                    monsterId:     monster.key || monster.monsterId,
                    name:          monster.name,
                    rarity:        monster.rarity || 'common',
                    currentRoom:   roomId,
                    originalRoom:   roomId,
                    hp:            monster.hp,
                    maxHp:         monster.maxHp,
                    leash:         6,
                    roomsFollowed: 0,
                    isChasing:     false,
                    isBoss:        monster.isBoss || false,
                    isRandomBoss:  monster.isRandomBoss || false,
                    drop:          null,
                    _bossOverrides: monster.isRandomBoss ? {
                        hp:        monster.hp,
                        maxHp:     monster.maxHp,
                        damage:    monster.damage,
                        minDamage: monster.minDamage,
                        maxDamage: monster.maxDamage,
                        name:      monster.name,
                    } : null,
                });
            });
        });

        ds.activeEnemies = activeEnemies;
        console.log('Random dungeon: ' + activeEnemies.length + ' enemies loaded into activeEnemies');
        activeEnemies.forEach(e => console.log(`  - ${e.name} (${e.rarity}) in room ${e.currentRoom}${e.isBoss ? ' [BOSS]' : ''}`));
    }

    // Called right after startDungeonCombat for the boss room — patches the
    // freshly-spawned combat monster with the boss boosted stats.
    function _applyRandomBossOverrides() {
        const cs = gameState && gameState.combatState;
        const ds = gameState && gameState.dungeon;
        if (!cs || !ds || ds.dungeonKey !== 'random_dungeon') return;

        const bossEntry = (ds.activeEnemies || []).find(function(e) {
            return e._bossOverrides && e.isRandomBoss;
        });
        if (!bossEntry) return;

        const combatMonster = cs.monsters.find(function(m) {
            return m.key === bossEntry.monsterId || m.name === bossEntry.name;
        });
        if (!combatMonster) return;

        const ov = bossEntry._bossOverrides;
        combatMonster.hp           = ov.hp;
        combatMonster.maxHp        = ov.maxHp;
        combatMonster.damage       = ov.damage;
        combatMonster.minDamage    = ov.minDamage;
        combatMonster.maxDamage    = ov.maxDamage;
        combatMonster.name         = ov.name;
        combatMonster.isBoss       = true;
        combatMonster.isRandomBoss = true;

        console.log('Boss overrides applied: ' + ov.name + ' HP ' + ov.hp + '/' + ov.maxHp);
        if (typeof renderEnemyCards === 'function') renderEnemyCards();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // BOSS LOOT — called from index.html's combat victory handler
    // ─────────────────────────────────────────────────────────────────────────

    function awardRandomBossLoot(player) {
        function log(msg, cls) {
            if (typeof termAppend === 'function') termAppend(msg, cls || '');
        }

        // 1. Recall Potion
        if (!player.inventory) player.inventory = [];
        player.inventory.push('recall_potion');
        log('🧪 <strong style="color:#00ff88;">The boss dropped a Recall Potion!</strong> You can now escape the Labyrinth.', 'term-loot');

        // 2. Random weapon OR armor
        const giveWeapon = Math.random() < 0.5;
        const roll = Math.random();
        let quality;
        if (roll < 0.20)      quality = 'godly';
        else if (roll < 0.55) quality = 'legendary';
        else                  quality = 'epic';

        if (giveWeapon) {
            _grantBossWeapon(player, quality, log);
        } else {
            _grantBossArmor(player, quality, log);
        }

        if (typeof saveGame === 'function') saveGame();
    }

    function _grantBossWeapon(player, quality, log) {
        if (typeof WEAPONS === 'undefined') { log('⚠️ WEAPONS not loaded — skipping weapon drop.'); return; }

        const playerLevel = player.level || 1;
        const playerClass = player.baseClass || player.class || '';
        const candidates  = Object.values(WEAPONS).filter(w => {
            if (!w || !w.id || w.instanceId) return false;
            const lvlOk    = w.level && Math.abs(w.level - playerLevel) <= 5;
            const classOk  = !w.allowedClasses || w.allowedClasses.includes(playerClass);
            return lvlOk && classOk && !w.unarmed;
        });

        if (candidates.length === 0) { log('⚠️ No suitable weapon found for boss drop.'); return; }

        const baseWeapon  = pick(candidates);
        const bonusPct    = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality])
            ? QUALITY_CONFIG[quality].bonusPct : 0;
        const instanceId  = `${baseWeapon.id}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const qualDisp    = quality.charAt(0).toUpperCase() + quality.slice(1);

        let modifiers = [];
        if (typeof generateModifiers === 'function') modifiers = generateModifiers(quality, baseWeapon.level);

        let weaponName;
        if (typeof generateEnhancedWeaponName === 'function' && modifiers.length > 0) {
            weaponName = generateEnhancedWeaponName(baseWeapon, quality, modifiers);
        } else {
            weaponName = `${qualDisp} ${baseWeapon.name}`;
        }

        const weapon = {
            id:            baseWeapon.id,
            weaponId:      baseWeapon.id,
            instanceId,
            name:          weaponName,
            baseName:      baseWeapon.name,
            type:          baseWeapon.type || baseWeapon.weaponSubtype,
            weaponSubtype: baseWeapon.weaponSubtype || baseWeapon.type,
            baseDamage:    baseWeapon.baseDamage + Math.floor(baseWeapon.baseDamage * bonusPct),
            maxDamage:     (baseWeapon.maxDamage || baseWeapon.baseDamage) + Math.floor((baseWeapon.maxDamage || baseWeapon.baseDamage) * bonusPct),
            baseMagicDamage: baseWeapon.baseMagicDamage ? baseWeapon.baseMagicDamage + Math.floor(baseWeapon.baseMagicDamage * bonusPct) : 0,
            level:         baseWeapon.level,
            quality,
            qualityBonus:  bonusPct,
            modifiers,
            gemSlots:      { rare: 1, epic: 2, legendary: 3, godly: 4 }[quality] || 0,
            gems:          [],
            cost:          baseWeapon.cost || 0,
            description:   `A ${quality} weapon seized from the Labyrinth's guardian.`,
            allowedClasses: baseWeapon.allowedClasses,
            isDropped:     true,
            dropTimestamp: Date.now(),
            isEquipped:    false,
        };

        WEAPONS[instanceId] = weapon;
        player.inventory.push(weapon);

        const rarityColor = { epic: '#cc44ff', legendary: '#FFD700', godly: '#ff6600' }[quality] || '#ffffff';
        log(`⚔️ <strong style="color:${rarityColor};">BOSS DROP: ${weaponName}</strong> added to your inventory!`, 'term-loot');
    }

    function _grantBossArmor(player, quality, log) {
        if (typeof ARMOR === 'undefined') {
            log('⚠️ ARMOR not loaded — skipping armor drop.');
            return;
        }

        const playerLevel = player.level || 1;
        const playerClass = player.baseClass || player.class || '';

        const candidates = Object.values(ARMOR).filter(a => {
            if (!a || !a.id || a.instanceId) return false;
            const lvlOk   = a.level && Math.abs(a.level - playerLevel) <= 5;
            const classOk = !a.allowedClasses || a.allowedClasses.includes(playerClass);
            return lvlOk && classOk && !a.unarmored;
        });

        if (candidates.length === 0) { log('⚠️ No suitable armor found for boss drop.'); return; }

        const baseArmor  = pick(candidates);
        const bonusPct   = (typeof QUALITY_CONFIG !== 'undefined' && QUALITY_CONFIG[quality])
            ? QUALITY_CONFIG[quality].bonusPct : 0;
        const instanceId = `${baseArmor.id}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const qualDisp   = quality.charAt(0).toUpperCase() + quality.slice(1);

        let modifiers = [];
        if (typeof generateModifiers === 'function') modifiers = generateModifiers(quality, baseArmor.level);

        let armorName;
        if (typeof generateEnhancedArmorName === 'function' && modifiers.length > 0) {
            armorName = generateEnhancedArmorName(baseArmor, quality, modifiers);
        } else {
            armorName = `${qualDisp} ${baseArmor.name}`;
        }

        const armor = {
            id:           baseArmor.id,
            armorId:      baseArmor.id,
            instanceId,
            name:         armorName,
            baseName:     baseArmor.name,
            type:         'armor',
            baseDefense:  Math.floor((baseArmor.baseDefense || 0) * (1 + bonusPct)),
            baseMagicBonus: Math.floor((baseArmor.baseMagicBonus || 0) * (1 + bonusPct)),
            level:        baseArmor.level,
            quality,
            qualityBonus: bonusPct,
            modifiers,
            gemSlots:     { rare: 1, epic: 2, legendary: 3, godly: 4 }[quality] || 0,
            gems:         [],
            cost:         baseArmor.cost || 0,
            description:  `${quality} armor seized from the Labyrinth's guardian.`,
            allowedClasses: baseArmor.allowedClasses,
            isDropped:    true,
            dropTimestamp: Date.now(),
            isEquipped:   false,
        };

        ARMOR[instanceId] = armor;
        player.inventory.push(armor);

        const rarityColor = { epic: '#cc44ff', legendary: '#FFD700', godly: '#ff6600' }[quality] || '#ffffff';
        log(`🛡️ <strong style="color:${rarityColor};">BOSS DROP: ${armorName}</strong> added to your inventory!`, 'term-loot');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC — startRandomDungeon()
    // Shows the dungeon warning modal then enters the dungeon.
    // ─────────────────────────────────────────────────────────────────────────

    function startRandomDungeon() {
        if (typeof gameState === 'undefined' || !gameState.player) {
            alert('You must be logged in to enter the Labyrinth.');
            return;
        }

        const p           = gameState.player;
        const playerLevel = p.level || 1;

        // CRITICAL FIX: Clear the previous random dungeon's map data BEFORE generating a new one
        if (p.dungeonMaps && p.dungeonMaps['random_dungeon']) {
            delete p.dungeonMaps['random_dungeon'];
        }
        
        if (p.dungeonTimers && p.dungeonTimers['random_dungeon']) {
            delete p.dungeonTimers['random_dungeon'];
        }
        
        // Also ensure any stale dungeon state is cleared
        if (gameState.dungeon && gameState.dungeon.dungeonKey === 'random_dungeon') {
            gameState.dungeon = null;
        }
        if (gameState.combatState) {
            gameState.combatState = null;
            if (gameState.combatTimer) {
                clearInterval(gameState.combatTimer);
                gameState.combatTimer = null;
            }
        }

        // Re-generate a fresh dungeon every visit
        generateRandomDungeon(playerLevel);

        // Warning modal
        const hasRecall  = p.inventory && p.inventory.includes('recall_potion');
        const recallNote = hasRecall
            ? `<div style="color:#00ff88;margin-top:8px;">✅ You carry a <strong>Recall Potion</strong> — you can use it to escape at any time.</div>`
            : `<div style="color:#ff4444;margin-top:8px;">⚠️ You do NOT have a Recall Potion, but the final boss will drop one — if you can reach it.</div>`;

        const modal = document.createElement('div');
        modal.id = 'dungeonWarningModal';
        Object.assign(modal.style, {
            position: 'fixed', inset: '0', zIndex: '9999',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.88)', fontFamily: "'VT323',monospace",
            padding: '16px',
        });

        const card = document.createElement('div');
        Object.assign(card.style, {
            width: '100%', maxWidth: '480px',
            background: '#000',
            border: '3px double #aa44ff',
            boxShadow: '0 0 40px rgba(170,68,255,0.4)',
            color: '#00ff00',
            boxSizing: 'border-box',
        });

        card.innerHTML = `
            <div style="background:#220033;padding:12px 16px;border-bottom:2px solid #aa44ff;">
                <div style="color:#aa44ff;font-size:26px;font-weight:bold;">🌀 THE SHIFTING LABYRINTH</div>
                <div style="color:#cc88ff;font-size:14px;">Procedurally Generated — Different Every Time</div>
            </div>
            <div style="padding:16px;font-size:16px;line-height:1.6;">
                <p style="color:#ff8888;margin:0 0 8px;">⚠️ WARNING: This dungeon is DANGEROUS.</p>
                <ul style="color:#cccccc;margin:0 0 12px;padding-left:18px;font-size:14px;">
                    <li>The layout changes with every visit.</li>
                    <li>Enemies are <strong style="color:#ffaaaa;">Level ${playerLevel}–${playerLevel + ENEMY_LEVEL_PAD}</strong>.</li>
                    <li>A powerful <strong style="color:#aa44ff;">Epic / Legendary / Godly</strong> boss guards the final room.</li>
                    <li>The boss drops a <strong style="color:#00ff88;">guaranteed weapon or armor</strong> and a <strong style="color:#00ff88;">Recall Potion</strong>.</li>
                    <li>Death carries normal dungeon penalties.</li>
                </ul>
                ${recallNote}
            </div>
            <div style="padding:12px 16px;border-top:1px solid #440066;display:flex;gap:10px;">
                <button id="rdEnterBtn"  style="flex:1;background:#aa44ff;color:#fff;border:2px solid #cc88ff;padding:10px;font-family:'VT323',monospace;font-size:18px;cursor:pointer;">⚔️ ENTER THE LABYRINTH</button>
                <button id="rdCancelBtn" style="flex:1;background:#000;color:#888;border:2px solid #444;padding:10px;font-family:'VT323',monospace;font-size:18px;cursor:pointer;">✖ CANCEL</button>
            </div>
        `;

        modal.appendChild(card);
        document.body.appendChild(modal);

        document.getElementById('rdCancelBtn').onclick = () => modal.remove();
        document.getElementById('rdEnterBtn').onclick  = () => {
            modal.remove();
            if (typeof startDungeon === 'function') {
                startDungeon('random_dungeon');
                _populateRandomDungeonEnemies();
            } else {
                console.error('random-dungeon.js: startDungeon() not found in index.html');
            }
        };
    }

    // Expose to global scope
    window.generateRandomDungeon = generateRandomDungeon;
    window.startRandomDungeon    = startRandomDungeon;
    window.awardRandomBossLoot   = awardRandomBossLoot;
    window._applyRandomBossOverrides = _applyRandomBossOverrides;

    console.log('🌀 random-dungeon.js loaded');

})();