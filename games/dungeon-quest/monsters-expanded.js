// monsters.js - Enemy Database (EXPANDED - 100+ Monsters!)
// Add new monsters here to expand the game!

// ═══════════════════════════════════════════════════════════════════════════════
// MONSTER SPECIAL ABILITIES — COMPLETE REFERENCE
// ═══════════════════════════════════════════════════════════════════════════════
//
// Each enemy can have an `abilities: [ ... ]` array.
// On every enemy turn, abilities are rolled through IN ORDER — first hit wins.
// Put your most dangerous / dramatic abilities FIRST for proper AI priority.
//
// ── PHASE II NOTE ───────────────────────────────────────────────────────────
// Enemy MP costs are stubbed into every ability below via `mpCost`.
// When Phase II is implemented, the engine will deduct enemy.mp before firing
// and skip the ability if the enemy can't afford it.
// For now, mpCost is recorded but not enforced.
//
// ── ABILITY SKELETON ────────────────────────────────────────────────────────
//
//   {
//     id:           'unique_id',          // snake_case string, must be unique per enemy
//     name:         'Display Name',       // shown in terminal on hit
//     chance:       0.25,                 // 0.0–1.0 roll each turn (0.25 = 25%)
//     mpCost:       10,                   // [PHASE II] MP the enemy spends to use this
//     hpThreshold:  0.50,                 // optional — only fires when enemy HP% is ABOVE this
//     lowHpThreshold: 0.30,               // optional — only fires when enemy HP% is BELOW this
//     telegraph:    'winds up...',        // message shown 2s before attack lands
//     type:         'dot_attack',         // see TYPE LIST below
//     damageMult:   1.0,                  // multiplier on the physical hit that triggers this (1.0 = normal)
//     armorPiercing: 0.0,                 // 0.0–1.0 fraction of armor bypassed
//     applyMessage: (enemyName, playerClass) => `...`,  // flavor text on activation
//     // ...type-specific fields below
//   }
//
// ═══════════════════════════════════════════════════════════════════════════════
// TYPE LIST  (copy the matching block below into your ability object)
// ═══════════════════════════════════════════════════════════════════════════════
//
// ── 1. DOT_ATTACK ── damage-over-time applied after a physical hit ───────────
//   type: 'dot_attack',
//   dot: {
//     name:         'Bleeding',          // display name for tick messages
//     icon:         '🩸',               // icon shown each tick
//     damage:       4,                   // flat damage per tick
//     tickInterval: 3000,               // ms between ticks (3000 = every 3 seconds)
//     ticks:        3,                   // total number of ticks
//   },
//   -- FLAVORS --
//   • Bleeding     icon:'🩸'  damage:3-6   ticks:2-3  tickInterval:3000   (wolves, ghouls, razorbeaks)
//   • Poisoned     icon:'💚'  damage:4-8   ticks:3-5  tickInterval:3000   (spiders, snakes, wasps)
//   • Burning      icon:'🔥'  damage:5-10  ticks:3-4  tickInterval:2000   (fire elementals, dragons)
//   • Corroding    icon:'🟤'  damage:3-5   ticks:4-6  tickInterval:3000   (slimes, acid beetles)
//   • Frostbite    icon:'❄️'  damage:2-4   ticks:5-8  tickInterval:4000   (ice elementals, yeti)
//   • Cursed       icon:'💜'  damage:6-12  ticks:2-4  tickInterval:4000   (liches, wraiths, demons)
//   • Plague       icon:'☣️'  damage:5-8   ticks:4-6  tickInterval:2500   (plague rats, zombies)
//   • Withering    icon:'🌑'  damage:4-7   ticks:3-5  tickInterval:3500   (void creatures, nihil)
//
// ── 2. DEBUFF ── applies a status that changes combat math ───────────────────
//   type: 'debuff',
//   debuff: 'blinded',                   // see DEBUFF NAMES below
//   debuffDuration: 4000,               // ms before the debuff auto-expires (if applicable)
//   hitMissChance:  0.30,               // [blinded only] fraction of player attacks that miss
//   dodgePenalty:   1.0,                // [constricted only] fraction of dodge removed
//   -- DEBUFF NAMES (currently implemented) --
//   • 'blinded'      — player's next N attacks have hitMissChance miss chance
//                      cs.playerBlindedMissChance, cs.playerBlindedHits
//   • 'constricted'  — player dodge set to 0 for debuffDuration ms
//                      cs.playerConstricted
//   -- DEBUFF NAMES (ready to implement in Phase II) --
//   • 'intimidated'  — player deals -25% damage for 2 turns  → cs.playerIntimidated
//   • 'weakened'     — player STR reduced by flat amount for duration → cs.playerWeakenedStr
//   • 'silenced'     — player cannot cast spells for 1-2 turns → cs.playerSilenced
//   • 'cursed_aim'   — player crit chance reduced to 0 for duration → cs.playerCursedAim
//   • 'exposed'      — player armor reduced by % for duration (rend result) → cs.playerArmorReduced
//   • 'slowed'       — player pip recharge slowed by 50% for duration → cs.playerSlowed
//   • 'terrified'    — player has chance to skip their turn (flee instinct) → cs.playerTerrified
//
// ── 3. STUN ── disables player pip charges ───────────────────────────────────
//   type: 'stun',
//   stunPips: 1,                         // number of pip charges drained/locked
//   stunDuration: 5,                     // seconds the pip stays locked
//   -- USE FOR: bats (screech), gorgons (gaze), lightning enemies, concussive attacks
//
// ── 4. HEAVY_HIT ── pure damage amplifier, no side effect ───────────────────
//   type: 'heavy_hit',
//   damageMult: 2.0,                     // damage multiplier (stacks with rarity)
//   armorPiercing: 0.0,                  // 0.0–1.0 armor bypass
//   -- USE FOR: charges, power strikes, berserker smashes, leaping attacks
//   -- GOOD COMBOS: boar charge (2.0x + pierce), giant smash (1.8x + stun)
//
// ── 5. DRAIN_HP ── enemy steals player HP and heals itself ──────────────────
//   type: 'drain_hp',
//   drainAmount: 15,                     // flat HP stolen from player
//   healPercent: 1.0,                    // fraction of drained HP that heals the enemy (1.0 = all of it)
//   -- USE FOR: vampires, leeches, soul-suckers, void wraiths, liches
//   -- EXAMPLE: vampire drains 15 HP → heals for 15 HP
//
// ── 6. DRAIN_MP ── enemy drains player mana (disrupts spellcasters) ─────────
//   type: 'drain_mp',
//   drainAmount: 20,                     // flat MP drained from player
//   -- USE FOR: mana leeches, dispel elementals, anti-mage constructs, nihil creatures
//   -- NOTE: called "Mana Drain", "Arcane Leech", "Dispel", "Siphon"
//
// ── 7. REND ── tears through armor, reducing player defense temporarily ──────
//   type: 'rend',
//   defReduction: 0.25,                  // fraction of player's total defense removed
//   rendDuration: 8000,                  // ms the armor penalty lasts
//   -- USE FOR: demons, trolls, rust monsters, corrosive slimes, wyverns
//   -- EXAMPLE: 25% rend on 40 DEF → -10 DEF for 8 seconds
//
// ── 8. BURN ── fire DOT applied WITHOUT a preceding physical hit ─────────────
//   type: 'burn',
//   dot: {
//     name: 'Burning', icon: '🔥',
//     damage: 8, tickInterval: 2000, ticks: 4,
//   },
//   damageMult: 0,                       // set 0 for pure ranged burn (no physical contact)
//   -- USE FOR: fire mages, dragons, lava elementals (ranged fireball)
//   -- DIFFERENCE FROM dot_attack: no physical hit component; pure status delivery
//
// ── 9. INTIMIDATE ── enemy roars/screams, reducing player damage output ──────
//   type: 'intimidate',
//   damagePenalty: 0.25,                 // fraction of player damage removed (0.25 = -25%)
//   intimidateDuration: 6000,            // ms the penalty lasts
//   -- USE FOR: dragons (roar), orcs (warcry), demons (presence), banshees
//   -- NOTE: stacks interestingly with rend — shaken AND exposed
//
// ── 10. LEECH ── hybrid drain: deals damage AND heals enemy simultaneously ───
//   type: 'leech',
//   damageMult: 0.8,                     // physical hit strength
//   healRatio: 0.5,                      // enemy heals for this fraction of damage dealt
//   -- USE FOR: vampires (bite), succubi, soul-eaters, energy parasites
//   -- DIFFERENCE FROM drain_hp: leech scales with actual damage; drain is a flat steal
//
// ── 11. DISPEL ── removes player active buffs ────────────────────────────────
//   type: 'dispel',
//   buffSlots: 1,                        // number of active buffs cancelled
//   -- USE FOR: demons, arcane constructs, elder spirits, boss encounters
//   -- EFFECT: removes the most recently applied buff potion effect
//
// ── 12. SUMMON ── calls additional enemies into the fight ────────────────────
//   type: 'summon',
//   summonKey: 'goblin',                 // ENEMIES key of creature to summon
//   summonCount: 1,                      // how many to add
//   maxSummons: 2,                       // cap total summons per fight
//   -- USE FOR: necromancers, shaman leaders, spider mothers, demon lords
//   -- NOTE: won't fire again once maxSummons cap is reached
//
// ── 13. AOE ── hits ALL monsters' targets / splashes onto player from one hit ─
//   type: 'aoe',
//   aoeTargets: 'player',               // 'player' (always) — damages with splash
//   damageMult: 0.6,                     // reduced damage (spread effect)
//   -- USE FOR: explosions, shockwaves, poison clouds, breath weapons
//
// ═══════════════════════════════════════════════════════════════════════════════
// AI BEHAVIOR TIPS
// ═══════════════════════════════════════════════════════════════════════════════
//
//  hpThreshold:    0.50   → only fires when enemy is ABOVE 50% HP  (aggressive opener)
//  lowHpThreshold: 0.30   → only fires when enemy is BELOW 30% HP  (desperate / enraged)
//  (omit both)            → fires at any HP level
//
//  Ordering examples:
//    [drain_hp first, dot_attack second]  → tries to heal itself first, poisons if heal misses
//    [intimidate first, heavy_hit second] → tries to soften you up, then crush
//    [summon first @ low HP]              → calls for help when desperate
//    [rend first, dot_attack second]      → strips your armor then bleeds you out
//
// ═══════════════════════════════════════════════════════════════════════════════
// RARITY SYSTEM:
// common: 60% spawn rate, 1.0x stats, white color
// uncommon: 25% spawn rate, 1.3x stats, green color
// rare: 10% spawn rate, 1.6x stats, blue color
// epic: 4% spawn rate, 2.0x stats, purple color
// legendary: 0.9% spawn rate, 2.5x stats, orange color
// mythic: 0.1% spawn rate, 3.5x stats, red color

// Safe declaration - won't crash if loaded twice
if (typeof ENEMIES === 'undefined') var ENEMIES = {};
Object.assign(ENEMIES, {
    // ═══════════════════════════════════════════════════════════════
    // LEVEL 1-5 MONSTERS (Forest & Riverside)
    // ═══════════════════════════════════════════════════════════════
    
    // Your child's monster! 💩
    poop_slime: { 
        name: 'Poop Slime', 
        baseHp: 200, 
        baseDamage: 10,
        minDamage: 7,
        maxDamage: 13,
        baseDefense: 1, 
        baseXp: 250, 
        baseGold: 1000, 
        level: 1,
        description: '💩 A smelly, slimy creature that makes funny sounds!',
        possibleDrops: ['health_potion', 'golden_poop', 'small_gem'],
        dropRates: { common: 0.5, uncommon: 0.3, rare: 0.15, epic: 0.05 }
    },
    
    goblin: { 
        name: 'Goblin', 
        baseHp: 30, 
        baseDamage: 8, 
        minDamage: 5,
        maxDamage: 10,
        baseDefense: 3, 
        baseXp: 20, 
        baseGold: 15, 
        level: 1,
        description: 'A small, sneaky creature with crude weapons',
        possibleDrops: ['health_potion', 'dagger', 'cloth_armor', 'small_gem'],
        dropRates: { common: 0.606, uncommon: 0.303, rare: 0.0758, epic: 0.0152 },
        abilities: [
            {
                id: 'dirty_strike',
                name: 'Dirty Strike',
                chance: 0.20,
                mpCost: 8,
                telegraph: 'reaches for a handful of dirt...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 4000,
                hitMissChance: 0.30,
                damageMult: 0,                   // Pure debuff — no physical damage
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The ${enemyName} flings a fistful of dirt into the $$$$${playerClass}'s eyes!<br><span style="color:#ffaa44;">⚠️ Blinded — your next attack has a 30% chance to miss.</span>`
            }
        ]
    },
    
    wolf: { 
        name: 'Wolf', 
        baseHp: 30, 
        baseDamage: 10, 
        minDamage: 7,
        maxDamage: 13,
        baseDefense: 2, 
        baseXp: 25, 
        baseGold: 10, 
        level: 1,
        description: 'A wild predator with sharp fangs',
        possibleDrops: ['health_potion', 'wolf_pelt', 'small_gem'],
        dropRates: { common: 0.7353, uncommon: 0.2206, rare: 0.0441 },
        abilities: [
            {
                id: 'maul',
                name: 'Maul',
                chance: 0.20,
                mpCost: 10,                    // 20% per turn
                telegraph: 'lowers its head and snarls...',
                type: 'dot_attack',              // attack + apply bleed dot to player
                dot: {
                    name: 'Bleeding',
                    icon: '🩸',
                    damage: 3,                   // 3 damage per tick
                    tickInterval: 3000,          // every 3 seconds
                    ticks: 2,                    // 2 ticks total (6 seconds)
                },
                damageMult: 1.0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The ${enemyName} tears into the $$$$${playerClass}'s flesh — <b>Bleeding!</b>`
            }
        ]
    },
    
    giant_spider: { 
        name: 'Giant Spider', 
        baseHp: 40, 
        baseDamage: 12, 
        minDamage: 8,
        maxDamage: 15,
        baseDefense: 4, 
        baseXp: 30, 
        baseGold: 20, 
        level: 2,
        description: 'A massive arachnid with venomous fangs',
        possibleDrops: ['health_potion', 'mana_potion', 'spider_silk', 'small_gem'],
        dropRates: { common: 0.5333, uncommon: 0.3333, rare: 0.1067, epic: 0.0267 },
        abilities: [
            {
                id: 'venom_bite',
                name: 'Venom Bite',
                chance: 0.35,
                mpCost: 12,                   // 35% per turn — spiders are venomous, should feel threatening
                telegraph: 'rears up and bares its fangs...',
                type: 'dot_attack',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 4,                  // 4 damage per tick
                    tickInterval: 3000,         // every 3 seconds
                    ticks: 3,                   // 3 ticks (9 seconds of poison)
                },
                damageMult: 0.7,               // Weaker hit — spider prioritizes injecting venom
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💚 The $$$$${enemyName} sinks its fangs in! <b>Poisoned!</b>`
            }
        ]
    },
    
    wild_boar: {
        name: 'Wild Boar',
        baseHp: 30,
        baseDamage: 9,
        minDamage: 6,
        maxDamage: 11,
        baseDefense: 4,
        baseXp: 22,
        baseGold: 12,
        level: 1,
        description: 'An aggressive tusked beast',
        possibleDrops: ['health_potion', 'boar_hide', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 },
        abilities: [
            {
                id: 'charge',
                name: 'Charge',
                chance: 0.30,
                mpCost: 14,                   // 30% per turn
                hpThreshold: 0.50,              // AI: only charges when above 50% HP (still has energy)
                telegraph: 'snorts and begins to paw at the ground...',
                type: 'heavy_hit',
                damageMult: 2.0,               // Double damage — tusks hit hard
                armorPiercing: 0.25,           // Tusks go under armor
                armorPiercing: 0.25,
                applyMessage: (enemyName, playerClass) => `🐗 The ${enemyName} CHARGES! Tusks pierce the $$$$${playerClass}'s armor!`
            }
        ]
    },
    
    slime: {
        name: 'Slime',
        baseHp: 30,
        baseDamage: 6,
        minDamage: 4,
        maxDamage: 7,
        baseDefense: 1,
        baseXp: 15,
        baseGold: 8,
        level: 1,
        description: 'A gelatinous blob that absorbs everything',
        possibleDrops: ['health_potion', 'slime_gel', 'small_gem'],
        dropRates: { common: 0.7792, uncommon: 0.1948, rare: 0.026 }
    },
    
    kobold: {
        name: 'Kobold',
        baseHp: 30,
        baseDamage: 7,
        minDamage: 4,
        maxDamage: 9,
        baseDefense: 2,
        baseXp: 18,
        baseGold: 12,
        level: 1,
        description: 'A small reptilian humanoid with a spear',
        possibleDrops: ['health_potion', 'dagger', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 }
    },
    
    giant_rat: {
        name: 'Giant Rat',
        baseHp: 30,
        baseDamage: 8,
        minDamage: 5,
        maxDamage: 10,
        baseDefense: 2,
        baseXp: 16,
        baseGold: 8,
        level: 1,
        description: 'A diseased rodent the size of a dog',
        possibleDrops: ['health_potion', 'rat_tail', 'small_gem'],
        dropRates: { common: 0.8333, uncommon: 0.1389, rare: 0.0278 }
    },
    
    forest_imp: {
        name: 'Forest Imp',
        baseHp: 40,
        baseDamage: 11,
        minDamage: 7,
        maxDamage: 14,
        baseDefense: 3,
        baseXp: 24,
        baseGold: 18,
        level: 2,
        description: 'A mischievous fey creature with dark magic',
        possibleDrops: ['mana_potion', 'imp_horn', 'small_gem'],
        dropRates: { common: 0.5333, uncommon: 0.3333, rare: 0.1067, epic: 0.0267 }
    },
    
    bandit: { 
        name: 'Bandit', 
        baseHp: 60, 
        baseDamage: 16, 
        minDamage: 11,
        maxDamage: 20,
        baseDefense: 7, 
        baseXp: 40, 
        baseGold: 50, 
        level: 3,
        description: 'A cunning thief who preys on travelers',
        possibleDrops: ['health_potion', 'mana_potion', 'poison_dagger', 'medium_gem', 'gold_coins'],
        dropRates: { common: 0.3658, uncommon: 0.3659, rare: 0.1829, epic: 0.0732, legendary: 0.0122 }
    },
    
    // Riverside monsters
    river_troll: {
        name: 'River Troll',
        baseHp: 60,
        baseDamage: 13,
        minDamage: 9,
        maxDamage: 16,
        baseDefense: 6,
        baseXp: 35,
        baseGold: 20,
        level: 3,
        description: 'A mossy troll that lurks by the water',
        possibleDrops: ['health_potion', 'troll_moss', 'medium_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },
    
    swamp_lurker: {
        name: 'Swamp Lurker',
        baseHp: 60,
        baseDamage: 14,
        minDamage: 9,
        maxDamage: 18,
        baseDefense: 5,
        baseXp: 32,
        baseGold: 18,
        level: 3,
        description: 'A creature that hides beneath the murky water',
        possibleDrops: ['health_potion', 'swamp_essence', 'medium_gem'],
        dropRates: { common: 0.5999, uncommon: 0.2667, rare: 0.1067, epic: 0.0267 }
    },
    
    giant_frog: {
        name: 'Giant Frog',
        baseHp: 40,
        baseDamage: 11,
        minDamage: 7,
        maxDamage: 14,
        baseDefense: 5,
        baseXp: 28,
        baseGold: 15,
        level: 2,
        description: 'A huge amphibian with a sticky tongue',
        possibleDrops: ['health_potion', 'frog_legs', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 }
    },
    
    water_snake: {
        name: 'Water Snake',
        baseHp: 60,
        baseDamage: 15,
        minDamage: 10,
        maxDamage: 19,
        baseDefense: 3,
        baseXp: 30,
        baseGold: 12,
        level: 3,
        description: 'A venomous serpent that strikes from the water',
        possibleDrops: ['health_potion', 'snake_venom', 'snake_skin', 'small_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 },
        abilities: [
            {
                id: 'venom_strike',
                name: 'Venom Strike',
                chance: 0.25,
                mpCost: 12,                   // 25% per turn
                telegraph: 'coils tightly and flicks its tongue...',
                type: 'dot_attack',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 5,                  // Stronger venom than the spider
                    tickInterval: 3000,
                    ticks: 3,
                },
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💚 The $$$$${enemyName}'s fangs inject venom! <b>Poisoned!</b>`
            },
            {
                id: 'constrict',
                name: 'Constrict',
                chance: 0.20,
                mpCost: 10,                   // 20% per turn
                hpThreshold: null,              // Any HP
                telegraph: 'lunges and wraps around you...',
                type: 'debuff',
                debuff: 'constricted',          // Custom: player dodge = 0 for 1 turn, reduced dodge for 1 more
                dodgePenalty: 1.0,              // 100% dodge reduction this turn
                damageMult: 1.2,               // Extra crush damage
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐍 The ${enemyName} CONSTRICTS the $$$$${playerClass}! You cannot dodge!`
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 6-10 MONSTERS (Plains & Haunted Graveyard)
    // ═══════════════════════════════════════════════════════════════
    
    orc: { 
        name: 'Orc Warrior', 
        baseHp: 120, 
        baseDamage: 18, 
        minDamage: 12,
        maxDamage: 23,
        baseDefense: 8, 
        baseXp: 60, 
        baseGold: 35, 
        level: 6,
        description: 'A brutish warrior with a battle axe',
        possibleDrops: ['health_potion', 'iron_sword', 'leather_armor', 'medium_gem', 'warhammer'],
        dropRates: { common: 0.4488, uncommon: 0.3205, rare: 0.1538, epic: 0.0641, legendary: 0.0128 }
    },
    
    dire_wolf: { 
        name: 'Dire Wolf', 
        baseHp: 150, 
        baseDamage: 20, 
        minDamage: 14,
        maxDamage: 26,
        baseDefense: 7, 
        baseXp: 65, 
        baseGold: 30, 
        level: 7,
        description: 'An enormous wolf, twice the size of normal',
        possibleDrops: ['health_potion', 'dire_pelt', 'medium_gem'],
                abilities: [
            {
                id: 'pack_howl',
                name: 'Pack Howl',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'tilts its head back and howls into the darkness...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 6000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐺 The ${enemyName} unleashes a bone-chilling howl! The $$$$${playerClass} feels their courage waver — <span style="color:#ffaa44;">⚠️ -25% damage for 6 seconds.</span>`
            }
        ],
        dropRates: { common: 0.5633, uncommon: 0.2817, rare: 0.1127, epic: 0.0423 }
    },
    
    plains_lion: {
        name: 'Plains Lion',
        baseHp: 150,
        baseDamage: 22,
        minDamage: 15,
        maxDamage: 28,
        baseDefense: 9,
        baseXp: 70,
        baseGold: 40,
        level: 7,
        description: 'A majestic predator that rules the grasslands',
        possibleDrops: ['health_potion', 'lion_mane', 'medium_gem'],
                abilities: [
            {
                id: 'pounce',
                name: 'Pounce',
                chance: 0.30,
                mpCost: 14,
                hpThreshold: 0.60,
                telegraph: 'drops into a crouch and fixes you with its golden eyes...',
                type: 'heavy_hit',
                damageMult: 1.8,
                armorPiercing: 0.20,
                applyMessage: (enemyName, playerClass) => `🦁 The ${enemyName} POUNCES! Claws rake through the $$$$${playerClass}'s guard!`
            }
        ],
        dropRates: { common: 0.5063, uncommon: 0.3165, rare: 0.1266, epic: 0.0506 }
    },
    
    centaur: {
        name: 'Centaur Warrior',
        baseHp: 180,
        baseDamage: 24,
        minDamage: 16,
        maxDamage: 31,
        baseDefense: 10,
        baseXp: 85,
        baseGold: 55,
        level: 8,
        description: 'A half-human, half-horse warrior with a spear',
        possibleDrops: ['health_potion', 'longbow', 'leather_armor', 'medium_gem'],
                abilities: [
            {
                id: 'trample',
                name: 'Trample',
                chance: 0.30,
                mpCost: 16,
                hpThreshold: 0.55,
                telegraph: 'rears up on powerful haunches and lowers its spear...',
                type: 'heavy_hit',
                damageMult: 1.9,
                armorPiercing: 0.30,
                applyMessage: (enemyName, playerClass) => `🐎 The ${enemyName} TRAMPLES the $$$$${playerClass}! Hooves and spear tear through armor!`
            },
            {
                id: 'enraged_charge',
                name: 'Enraged Charge',
                chance: 0.40,
                mpCost: 18,
                lowHpThreshold: 0.35,
                telegraph: 'snorts blood and wheels around in fury...',
                type: 'heavy_hit',
                damageMult: 2.2,
                armorPiercing: 0.35,
                applyMessage: (enemyName, playerClass) => `🐎 The $$$$${enemyName} is ENRAGED! A desperate, thundering charge!`
            }
        ],
        dropRates: { common: 0.443, uncommon: 0.3165, rare: 0.1519, epic: 0.0633, legendary: 0.0253 }
    },
    
    plains_raider: {
        name: 'Plains Raider',
        baseHp: 150,
        baseDamage: 21,
        minDamage: 14,
        maxDamage: 27,
        baseDefense: 8,
        baseXp: 68,
        baseGold: 60,
        level: 7,
        description: 'A nomadic warrior on horseback',
        possibleDrops: ['health_potion', 'steel_sword', 'gold_coins', 'medium_gem'],
                abilities: [
            {
                id: 'skirmish',
                name: 'Skirmish',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'wheels their mount and circles you at speed...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.30,
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🏇 The ${enemyName} circles in a dust cloud! The $$$$${playerClass} is blinded — <span style="color:#ffaa44;">⚠️ 30% chance to miss next attacks.</span>`
            }
        ],
        dropRates: { common: 0.4118, uncommon: 0.3529, rare: 0.1765, epic: 0.0588 }
    },
    
    giant_scorpion: {
        name: 'Giant Scorpion',
        baseHp: 180,
        baseDamage: 23,
        minDamage: 16,
        maxDamage: 29,
        baseDefense: 12,
        baseXp: 72,
        baseGold: 38,
        level: 8,
        description: 'A massive arachnid with a poisonous stinger',
        possibleDrops: ['health_potion', 'scorpion_venom', 'chitin_armor', 'medium_gem'],
                abilities: [
            {
                id: 'sting',
                name: 'Venomous Sting',
                chance: 0.35,
                mpCost: 15,
                telegraph: 'curves its segmented tail over its back...',
                type: 'dot_attack',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 7,
                    tickInterval: 3000,
                    ticks: 4,
                },
                damageMult: 0.8,
                armorPiercing: 0.10,
                applyMessage: (enemyName, playerClass) => `🦂 The ${enemyName}'s stinger plunges in! Potent venom floods the $$$$${playerClass}'s veins — <b>Poisoned!</b>`
            }
        ],
        dropRates: { common: 0.4268, uncommon: 0.3049, rare: 0.1829, epic: 0.0732, legendary: 0.0122 }
    },
    
    // Graveyard monsters
    zombie: {
        name: 'Zombie',
        baseHp: 150,
        baseDamage: 17,
        minDamage: 11,
        maxDamage: 22,
        baseDefense: 7,
        baseXp: 55,
        baseGold: 25,
        level: 7,
        description: 'A shambling corpse hungry for flesh',
        possibleDrops: ['health_potion', 'bone_dust', 'medium_gem'],
                abilities: [
            {
                id: 'plague_bite',
                name: 'Plague Bite',
                chance: 0.30,
                mpCost: 10,
                telegraph: 'lunges forward with rotting, gnashing jaws...',
                type: 'dot_attack',
                dot: {
                    name: 'Plague',
                    icon: '☣️',
                    damage: 5,
                    tickInterval: 2500,
                    ticks: 4,
                },
                damageMult: 0.9,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `☣️ The ${enemyName}'s rotting bite infects the $$$$${playerClass}! <b>Plagued!</b>`
            }
        ],
        dropRates: { common: 0.5999, uncommon: 0.2667, rare: 0.1067, epic: 0.0267 }
    },
    
    ghoul: {
        name: 'Ghoul',
        baseHp: 180,
        baseDamage: 19,
        minDamage: 13,
        maxDamage: 24,
        baseDefense: 6,
        baseXp: 62,
        baseGold: 30,
        level: 8,
        description: 'A flesh-eating undead with razor claws',
        possibleDrops: ['health_potion', 'ghoul_claw', 'cursed_bone', 'medium_gem'],
                abilities: [
            {
                id: 'rend_flesh',
                name: 'Rend Flesh',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'flexes its razor-tipped claws with terrible eagerness...',
                type: 'dot_attack',
                dot: {
                    name: 'Bleeding',
                    icon: '🩸',
                    damage: 5,
                    tickInterval: 3000,
                    ticks: 3,
                },
                damageMult: 1.1,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The ${enemyName}'s claws tear deep! The $$$$${playerClass} is <b>Bleeding!</b>`
            }
        ],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },
    
    skeleton: {
        name: 'Skeleton',
        baseHp: 150,
        baseDamage: 16,
        minDamage: 11,
        maxDamage: 20,
        baseDefense: 9,
        baseXp: 50,
        baseGold: 28,
        level: 7,
        description: 'An animated pile of bones with rusty weapons',
        possibleDrops: ['health_potion', 'bone_dust', 'rusty_sword', 'medium_gem'],
                abilities: [
            {
                id: 'bone_rattle',
                name: 'Bone Rattle',
                chance: 0.20,
                mpCost: 8,
                telegraph: 'shakes violently, bones clacking in a terrible rhythm...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 4,
                damageMult: 0.5,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The ${enemyName}'s rattling cacophony is disorienting! The $$$$${playerClass} loses an attack charge!`
            }
        ],
        dropRates: { common: 0.5999, uncommon: 0.2667, rare: 0.1067, epic: 0.0267 }
    },
    
    wraith: {
        name: 'Wraith',
        baseHp: 280,
        baseDamage: 25,
        minDamage: 17,
        maxDamage: 32,
        baseDefense: 8,
        baseXp: 90,
        baseGold: 60,
        level: 10,
        description: 'A spectral horror that feeds on life force',
        possibleDrops: ['greater_health_potion', 'shadowblade', 'soul_essence', 'large_gem'],
                abilities: [
            {
                id: 'life_drain',
                name: 'Life Drain',
                chance: 0.35,
                mpCost: 18,
                telegraph: 'reaches out with spectral hands that seem to pull at your very essence...',
                type: 'drain_hp',
                drainAmount: 18,
                healPercent: 1.0,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName} tears at the $$$$${playerClass}'s life force! <b>18 HP drained</b> — the wraith grows more solid.`
            }
        ],
        dropRates: { common: 0.3262, uncommon: 0.2717, rare: 0.2174, epic: 0.1304, legendary: 0.0543 }
    },
    
    grave_robber: {
        name: 'Grave Robber',
        baseHp: 200,
        baseDamage: 20,
        minDamage: 14,
        maxDamage: 26,
        baseDefense: 7,
        baseXp: 68,
        baseGold: 80,
        level: 9,
        description: 'A living criminal who steals from the dead',
        possibleDrops: ['health_potion', 'gold_coins', 'lockpicks', 'medium_gem'],
                abilities: [
            {
                id: 'smoke_bomb',
                name: 'Smoke Bomb',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'reaches into a coat pocket with a knowing smirk...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💨 The ${enemyName} hurls a smoke bomb! Acrid black smoke engulfs the $$$$${playerClass} — <span style="color:#ffaa44;">⚠️ 35% chance to miss.</span>`
            }
        ],
        dropRates: { common: 0.3889, uncommon: 0.3333, rare: 0.1667, epic: 0.0889, legendary: 0.0222 }
    },
    
    spirit: {
        name: 'Restless Spirit',
        baseHp: 150,
        baseDamage: 18,
        minDamage: 12,
        maxDamage: 23,
        baseDefense: 5,
        baseXp: 58,
        baseGold: 35,
        level: 7,
        description: 'A ghostly apparition bound to the graveyard',
        possibleDrops: ['mana_potion', 'ectoplasm', 'spirit_essence', 'medium_gem'],
                abilities: [
            {
                id: 'mournful_wail',
                name: 'Mournful Wail',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'opens its mouth and emits a haunting, wordless cry...',
                type: 'intimidate',
                damagePenalty: 0.20,
                intimidateDuration: 5000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName}'s wail chills the $$$$${playerClass} to the bone! <span style="color:#ffaa44;">⚠️ -20% damage for 5 seconds.</span>`
            }
        ],
        dropRates: { common: 0.4939, uncommon: 0.3086, rare: 0.1481, epic: 0.0494 }
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 5-8 MONSTERS (Dungeon - The Undermaze)
    // ═══════════════════════════════════════════════════════════════

    cave_orc: {
        name: 'Cave Orc',
        baseHp: 110,
        baseDamage: 17,
        minDamage: 11,
        maxDamage: 22,
        baseDefense: 8,
        baseXp: 55,
        baseGold: 32,
        level: 5,
        description: 'A pale orc who has never seen sunlight and is furious about it',
        possibleDrops: ['health_potion', 'iron_sword', 'leather_armor', 'medium_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },

    cave_gnoll: {
        name: 'Cave Gnoll',
        baseHp: 100,
        baseDamage: 16,
        minDamage: 11,
        maxDamage: 20,
        baseDefense: 7,
        baseXp: 50,
        baseGold: 28,
        level: 5,
        description: 'A hyena-headed scavenger that hunts in underground tunnels',
        possibleDrops: ['health_potion', 'gnoll_hide', 'bone_club', 'small_gem'],
        dropRates: { common: 0.5999, uncommon: 0.2667, rare: 0.1067, epic: 0.0267 }
    },

    dungeon_bat: {
        name: 'Giant Dungeon Bat',
        baseHp: 90,
        baseDamage: 15,
        minDamage: 10,
        maxDamage: 19,
        baseDefense: 5,
        baseXp: 45,
        baseGold: 20,
        level: 5,
        description: 'A massive bat with a wingspan that fills narrow corridors',
        possibleDrops: ['health_potion', 'bat_wing', 'small_gem'],
        dropRates: { common: 0.6849, uncommon: 0.2466, rare: 0.0685 },
        abilities: [
            {
                id: 'screech',
                name: 'Screech',
                chance: 0.20,
                mpCost: 10,                   // 20% per turn
                telegraph: 'opens its mouth wide and inhales sharply...',
                type: 'stun',                   // Skip player's next pip recovery
                stunPips: 1,                    // Player loses 1 pip charge
                damageMult: 0.5,               // Weak physical hit alongside screech
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🦇 The $$$$${enemyName} SCREECHES! The sound is disorienting — you lose an attack charge!`
            }
        ]
    },

    stone_crawler: {
        name: 'Stone Crawler',
        baseHp: 130,
        baseDamage: 16,
        minDamage: 11,
        maxDamage: 20,
        baseDefense: 12,
        baseXp: 58,
        baseGold: 25,
        level: 6,
        description: 'An armored beetle the size of a cart horse that feeds on cave minerals',
        possibleDrops: ['health_potion', 'chitin_shard', 'small_gem', 'medium_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },

    tomb_rat: {
        name: 'Tomb Rat',
        baseHp: 95,
        baseDamage: 15,
        minDamage: 10,
        maxDamage: 19,
        baseDefense: 4,
        baseXp: 47,
        baseGold: 18,
        level: 5,
        description: 'A diseased rat that has grown bloated feasting on dungeon refuse',
        possibleDrops: ['health_potion', 'rat_tail', 'small_gem'],
        dropRates: { common: 0.7432, uncommon: 0.2027, rare: 0.0541 }
    },

    dungeon_spider: {
        name: 'Dungeon Spider',
        baseHp: 120,
        baseDamage: 17,
        minDamage: 11,
        maxDamage: 22,
        baseDefense: 6,
        baseXp: 56,
        baseGold: 26,
        level: 6,
        description: 'A pale web-spinning predator that has claimed entire corridors as its own',
        possibleDrops: ['health_potion', 'spider_silk', 'venom_gland', 'small_gem'],
        dropRates: { common: 0.56, uncommon: 0.2933, rare: 0.12, epic: 0.0267 }
    },

    dark_stalker: {
        name: 'Dark Stalker',
        baseHp: 140,
        baseDamage: 19,
        minDamage: 13,
        maxDamage: 24,
        baseDefense: 7,
        baseXp: 63,
        baseGold: 38,
        level: 7,
        description: 'A shadow-cloaked humanoid that hunts by heat and heartbeat',
        possibleDrops: ['health_potion', 'shadow_cloth', 'dark_essence', 'medium_gem'],
                abilities: [
            {
                id: 'shadowmeld',
                name: 'Shadowmeld',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'dissolves into the surrounding darkness...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 1.3,
                armorPiercing: 0.15,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} strikes from the shadows! The $$$$${playerClass} can barely see — <span style="color:#ffaa44;">⚠️ 35% chance to miss.</span>`
            }
        ],
        dropRates: { common: 0.481, uncommon: 0.3165, rare: 0.1519, epic: 0.0506 }
    },

    fungal_horror: {
        name: 'Fungal Horror',
        baseHp: 160,
        baseDamage: 18,
        minDamage: 12,
        maxDamage: 23,
        baseDefense: 10,
        baseXp: 66,
        baseGold: 30,
        level: 7,
        description: 'A shambling mass of animated fungus that releases toxic spores',
        possibleDrops: ['health_potion', 'spore_sac', 'fungal_extract', 'medium_gem'],
                abilities: [
            {
                id: 'spore_cloud',
                name: 'Spore Cloud',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'swells grotesquely, ready to burst...',
                type: 'burn',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 6,
                    tickInterval: 2500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🍄 The ${enemyName} erupts in a cloud of toxic spores! The $$$$${playerClass} inhales the poison — <b>Poisoned!</b>`
            }
        ],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 11-15 MONSTERS (Cave, Dark Swamp, Cursed Ruins)
    // ═══════════════════════════════════════════════════════════════
    
    troll: { 
        name: 'Cave Troll', 
        baseHp: 310, 
        baseDamage: 28, 
        minDamage: 19,
        maxDamage: 36,
        baseDefense: 15, 
        baseXp: 110, 
        baseGold: 80, 
        level: 11,
        description: 'A massive regenerating beast with incredible strength',
        possibleDrops: ['greater_health_potion', 'steel_sword', 'steel_plate', 'large_gem', 'warhammer'],
                abilities: [
            {
                id: 'smash',
                name: 'Smash',
                chance: 0.30,
                mpCost: 16,
                hpThreshold: 0.50,
                telegraph: 'raises both fists and bellows with mindless rage...',
                type: 'heavy_hit',
                damageMult: 2.0,
                armorPiercing: 0.15,
                applyMessage: (enemyName, playerClass) => `🪨 The $$$$${enemyName} SMASHES! The ground shakes from the impact!`
            },
            {
                id: 'troll_regen',
                name: 'Troll Regeneration',
                chance: 0.40,
                mpCost: 14,
                lowHpThreshold: 0.45,
                telegraph: 'growls as the wounds on its body begin to close...',
                type: 'leech',
                damageMult: 0.7,
                healRatio: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🟢 The $$$$${enemyName}'s flesh knits back together as it strikes! Troll regeneration is terrifying to behold.`
            }
        ],
        dropRates: { common: 0.3409, uncommon: 0.2841, rare: 0.2273, epic: 0.1136, legendary: 0.0341 }
    },
    
    skeleton_warrior: { 
        name: 'Skeleton Warrior', 
        baseHp: 310, 
        baseDamage: 26, 
        minDamage: 18,
        maxDamage: 33,
        baseDefense: 12, 
        baseXp: 100, 
        baseGold: 60, 
        level: 11,
        description: 'An animated skeleton in ancient armor',
        possibleDrops: ['health_potion', 'bone_dust', 'cursed_sword', 'large_gem'],
                abilities: [
            {
                id: 'shield_bash',
                name: 'Shield Bash',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'steps forward and braces behind its ancient shield...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 5,
                damageMult: 1.3,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🛡️ The ${enemyName} BASHES with its shield! The $$$$${playerClass} is staggered — attack charge lost!`
            }
        ],
        dropRates: { common: 0.4118, uncommon: 0.2941, rare: 0.1765, epic: 0.0941, legendary: 0.0235 }
    },
    
    dark_mage: { 
        name: 'Dark Mage', 
        baseHp: 350, 
        baseDamage: 32, 
        minDamage: 22,
        maxDamage: 41,
        baseDefense: 10, 
        baseXp: 115, 
        baseGold: 100, 
        level: 12,
        description: 'A corrupted spellcaster wielding shadow magic',
        possibleDrops: ['mana_potion', 'greater_mana_potion', 'flame_staff', 'enchanted_robes', 'large_gem'],
                abilities: [
            {
                id: 'mana_siphon',
                name: 'Mana Siphon',
                chance: 0.30,
                mpCost: 0,
                hpThreshold: 0.70,
                telegraph: 'traces arcane sigils in the air and reaches toward you...',
                type: 'drain_mp',
                drainAmount: 25,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔮 The ${enemyName} tears mana from the $$$$${playerClass}! <b>25 MP drained!</b>`
            },
            {
                id: 'shadow_bolt',
                name: 'Shadow Bolt',
                chance: 0.25,
                mpCost: 20,
                telegraph: 'conjures a crackling orb of shadow energy...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 8,
                    tickInterval: 3500,
                    ticks: 3,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName}'s shadow bolt strikes! Dark energy courses through the $$$$${playerClass} — <b>Cursed!</b>`
            }
        ],
        dropRates: { common: 0.2718, uncommon: 0.3261, rare: 0.2174, epic: 0.1304, legendary: 0.0543 }
    },
    
    cave_drake: {
        name: 'Cave Drake',
        baseHp: 390,
        baseDamage: 30,
        minDamage: 21,
        maxDamage: 39,
        baseDefense: 18,
        baseXp: 130,
        baseGold: 95,
        level: 13,
        description: 'A lesser dragon that dwells in caves',
        possibleDrops: ['greater_health_potion', 'drake_scale', 'dragon_tooth', 'large_gem'],
                abilities: [
            {
                id: 'fire_breath',
                name: 'Fire Breath',
                chance: 0.30,
                mpCost: 18,
                telegraph: 'inhales deeply, smoke trickling from its nostrils...',
                type: 'burn',
                dot: {
                    name: 'Burning',
                    icon: '🔥',
                    damage: 10,
                    tickInterval: 2000,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔥 The ${enemyName} EXHALES a cone of fire! The $$$$${playerClass} is engulfed — <b>Burning!</b>`
            }
        ],
        dropRates: { common: 0.2631, uncommon: 0.2632, rare: 0.2316, epic: 0.1579, legendary: 0.0842 }
    },
    
    stone_golem: {
        name: 'Stone Golem',
        baseHp: 390,
        baseDamage: 27,
        minDamage: 18,
        maxDamage: 35,
        baseDefense: 25,
        baseXp: 125,
        baseGold: 70,
        level: 13,
        description: 'An animated construct of living stone',
        possibleDrops: ['greater_health_potion', 'golem_core', 'stone_armor', 'large_gem'],
                abilities: [
            {
                id: 'pulverize',
                name: 'Pulverize',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'raises one massive stone fist, cracks forming in the floor...',
                type: 'rend',
                defReduction: 0.35,
                rendDuration: 10000,
                damageMult: 1.6,
                armorPiercing: 0.20,
                applyMessage: (enemyName, playerClass) => `🪨 The ${enemyName} PULVERIZES! The devastating blow shatters the $$$$${playerClass}'s armor! <span style="color:#ffaa44;">⚠️ Defense reduced for 10 seconds!</span>`
            }
        ],
        dropRates: { common: 0.3262, uncommon: 0.2717, rare: 0.2174, epic: 0.1304, legendary: 0.0543 }
    },
    
    ogre: {
        name: 'Ogre',
        baseHp: 350,
        baseDamage: 29,
        minDamage: 20,
        maxDamage: 37,
        baseDefense: 14,
        baseXp: 118,
        baseGold: 90,
        level: 12,
        description: 'A dim-witted giant with a massive club',
        possibleDrops: ['greater_health_potion', 'warhammer', 'steel_plate', 'large_gem'],
                abilities: [
            {
                id: 'club_slam',
                name: 'Club Slam',
                chance: 0.30,
                mpCost: 16,
                hpThreshold: 0.60,
                telegraph: 'lifts its massive club with both hands and grunts...',
                type: 'heavy_hit',
                damageMult: 2.0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🪵 The ${enemyName} SLAMS its club! Pure brute force sends the $$$$${playerClass} reeling!`
            },
            {
                id: 'armor_break',
                name: 'Armor Break',
                chance: 0.25,
                mpCost: 12,
                lowHpThreshold: 0.45,
                telegraph: 'swings in a wild arc, aiming at your equipment...',
                type: 'rend',
                defReduction: 0.30,
                rendDuration: 9000,
                damageMult: 1.2,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💥 The ${enemyName}'s wild blow SMASHES the $$$$${playerClass}'s armor! <span style="color:#ffaa44;">⚠️ Defense reduced for 9 seconds!</span>`
            }
        ],
        dropRates: { common: 0.3488, uncommon: 0.2907, rare: 0.2093, epic: 0.1163, legendary: 0.0349 }
    },
    
    // Dark Swamp monsters
    swamp_hag: {
        name: 'Swamp Hag',
        baseHp: 390,
        baseDamage: 31,
        minDamage: 21,
        maxDamage: 40,
        baseDefense: 12,
        baseXp: 120,
        baseGold: 90,
        level: 13,
        description: 'A wicked witch who lives in the bog',
        possibleDrops: ['greater_mana_potion', 'witch_brew', 'cursed_amulet', 'large_gem'],
                abilities: [
            {
                id: 'hex',
                name: 'Hex',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'mutters a string of guttural syllables and points a gnarled finger at you...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🧿 The ${enemyName} casts a HEX! Darkness clouds the $$$$${playerClass}'s vision — <span style="color:#ffaa44;">⚠️ 35% chance to miss.</span>`
            },
            {
                id: 'wither',
                name: 'Wither',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'draws a rune in the fetid water and cackles...',
                type: 'burn',
                dot: {
                    name: 'Withering',
                    icon: '🌑',
                    damage: 7,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName}'s curse takes hold! The $$$$${playerClass} withers — <b>Withering!</b>`
            }
        ],
        dropRates: { common: 0.2688, uncommon: 0.3226, rare: 0.2151, epic: 0.129, legendary: 0.0645 }
    },
    
    plague_zombie: {
        name: 'Plague Zombie',
        baseHp: 350,
        baseDamage: 28,
        minDamage: 19,
        maxDamage: 36,
        baseDefense: 10,
        baseXp: 108,
        baseGold: 70,
        level: 12,
        description: 'A diseased undead that spreads infection',
        possibleDrops: ['greater_health_potion', 'plague_sample', 'bone_dust', 'large_gem'],
                abilities: [
            {
                id: 'plague_touch',
                name: 'Plague Touch',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'reaches toward you with blackened, suppurating fingers...',
                type: 'dot_attack',
                dot: {
                    name: 'Plague',
                    icon: '☣️',
                    damage: 6,
                    tickInterval: 2500,
                    ticks: 5,
                },
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `☣️ The ${enemyName}'s diseased touch infects the $$$$${playerClass}! <b>Plague spreads through your veins!</b>`
            }
        ],
        dropRates: { common: 0.4118, uncommon: 0.2941, rare: 0.1765, epic: 0.0941, legendary: 0.0235 }
    },
    
    giant_leech: {
        name: 'Giant Leech',
        baseHp: 350,
        baseDamage: 27,
        minDamage: 18,
        maxDamage: 35,
        baseDefense: 11,
        baseXp: 105,
        baseGold: 65,
        level: 12,
        description: 'A blood-sucking parasite the size of a person',
        possibleDrops: ['health_potion', 'leech_extract', 'blood_vial', 'medium_gem'],
                abilities: [
            {
                id: 'latch',
                name: 'Latch',
                chance: 0.35,
                mpCost: 14,
                telegraph: 'lunges with its sucker-mouth gaping wide...',
                type: 'leech',
                damageMult: 0.8,
                healRatio: 0.6,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The ${enemyName} LATCHES onto the $$$$${playerClass}, drinking greedily! The wound heals the leech!`
            }
        ],
        dropRates: { common: 0.4706, uncommon: 0.2941, rare: 0.1765, epic: 0.0588 }
    },
    
    bog_beast: {
        name: 'Bog Beast',
        baseHp: 430,
        baseDamage: 33,
        minDamage: 23,
        maxDamage: 42,
        baseDefense: 16,
        baseXp: 135,
        baseGold: 105,
        level: 14,
        description: 'A monstrous creature made of mud and vines',
        possibleDrops: ['greater_health_potion', 'swamp_heart', 'bog_armor', 'large_gem'],
                abilities: [
            {
                id: 'drag_under',
                name: 'Drag Under',
                chance: 0.30,
                mpCost: 16,
                telegraph: 'surges forward with vine-wrapped arms outstretched...',
                type: 'debuff',
                debuff: 'constricted',
                dodgePenalty: 1.0,
                debuffDuration: 5000,
                damageMult: 1.3,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌿 The ${enemyName} seizes the $$$$${playerClass} and drags them into the mire! <b>Constricted — cannot dodge!</b>`
            },
            {
                id: 'bog_rot',
                name: 'Bog Rot',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'exhales a noxious, bubbling breath...',
                type: 'burn',
                dot: {
                    name: 'Corroding',
                    icon: '🟤',
                    damage: 5,
                    tickInterval: 3000,
                    ticks: 5,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🟤 The ${enemyName} breathes bog-rot! The $$$$${playerClass}'s equipment begins to corrode — <b>Corroding!</b>`
            }
        ],
        dropRates: { common: 0.2631, uncommon: 0.2632, rare: 0.2316, epic: 0.1579, legendary: 0.0842 }
    },
    
    corrupted_treant: {
        name: 'Corrupted Treant',
        baseHp: 470,
        baseDamage: 30,
        minDamage: 21,
        maxDamage: 39,
        baseDefense: 20,
        baseXp: 145,
        baseGold: 120,
        level: 15,
        description: 'An ancient tree twisted by dark magic',
        possibleDrops: ['greater_health_potion', 'ironwood', 'nature_essence', 'huge_gem'],
                abilities: [
            {
                id: 'entangle',
                name: 'Entangle',
                chance: 0.30,
                mpCost: 16,
                telegraph: 'slams twisted roots into the earth around your feet...',
                type: 'debuff',
                debuff: 'constricted',
                dodgePenalty: 1.0,
                debuffDuration: 6000,
                damageMult: 1.1,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌿 The ${enemyName} ENTANGLES the $$$$${playerClass} in dark roots! <b>Constricted — cannot dodge!</b>`
            },
            {
                id: 'dark_sap',
                name: 'Dark Sap',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'leaks a viscous black ichor from its bark...',
                type: 'burn',
                dot: {
                    name: 'Withering',
                    icon: '🌑',
                    damage: 7,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName}'s dark sap seeps into wounds! The $$$$${playerClass} begins to <b>Wither!</b>`
            }
        ],
        dropRates: { common: 0.2578, uncommon: 0.2577, rare: 0.2268, epic: 0.1546, legendary: 0.1031 }
    },
    
    // Cursed Ruins monsters
    cursed_knight: {
        name: 'Cursed Knight',
        baseHp: 430,
        baseDamage: 34,
        minDamage: 23,
        maxDamage: 44,
        baseDefense: 22,
        baseXp: 140,
        baseGold: 110,
        level: 14,
        description: 'A fallen warrior bound to guard these ruins',
        possibleDrops: ['greater_health_potion', 'cursed_blade', 'ancient_armor', 'large_gem'],
                abilities: [
            {
                id: 'death_mark',
                name: 'Death Mark',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'traces a glowing rune onto its blade with one gauntleted finger...',
                type: 'dot_attack',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 8,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 1.2,
                armorPiercing: 0.25,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName} strikes with a cursed blade! A death mark burns into the $$$$${playerClass}'s flesh — <b>Cursed!</b>`
            }
        ],
        dropRates: { common: 0.2631, uncommon: 0.2632, rare: 0.2316, epic: 0.1579, legendary: 0.0842 }
    },
    
    shadow_stalker: {
        name: 'Shadow Stalker',
        baseHp: 430,
        baseDamage: 36,
        minDamage: 25,
        maxDamage: 46,
        baseDefense: 14,
        baseXp: 132,
        baseGold: 100,
        level: 14,
        description: 'A creature born from darkness itself',
        possibleDrops: ['greater_health_potion', 'shadowblade', 'dark_essence', 'large_gem'],
                abilities: [
            {
                id: 'eclipse_strike',
                name: 'Eclipse Strike',
                chance: 0.30,
                mpCost: 18,
                telegraph: 'flickers and becomes almost invisible, only a faint outline visible...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 6000,
                hitMissChance: 0.40,
                damageMult: 1.6,
                armorPiercing: 0.30,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} strikes from a pocket of pure darkness! The $$$$${playerClass} is blinded — <span style="color:#ffaa44;">⚠️ 40% miss chance, 6 seconds.</span>`
            }
        ],
        dropRates: { common: 0.3226, uncommon: 0.2688, rare: 0.2151, epic: 0.129, legendary: 0.0645 }
    },
    
    ruin_guardian: {
        name: 'Ruin Guardian',
        baseHp: 520,
        baseDamage: 32,
        minDamage: 22,
        maxDamage: 41,
        baseDefense: 28,
        baseXp: 155,
        baseGold: 140,
        level: 16,
        description: 'An ancient magical construct still on duty',
        possibleDrops: ['greater_health_potion', 'guardian_core', 'enchanted_plate', 'huge_gem'],
                abilities: [
            {
                id: 'arcane_pulse',
                name: 'Arcane Pulse',
                chance: 0.25,
                mpCost: 22,
                telegraph: 'runes etched across its stone body flare with blinding white light...',
                type: 'stun',
                stunPips: 2,
                stunDuration: 5,
                damageMult: 1.0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `⚡ The ${enemyName} discharges a blast of ward-energy! The $$$$${playerClass} is staggered — <b>2 attack charges lost!</b>`
            },
            {
                id: 'stone_slam',
                name: 'Stone Slam',
                chance: 0.25,
                mpCost: 18,
                hpThreshold: 0.50,
                telegraph: 'raises one enormous stone fist high above its head...',
                type: 'heavy_hit',
                damageMult: 1.9,
                armorPiercing: 0.20,
                applyMessage: (enemyName, playerClass) => `🪨 The $$$$${enemyName} brings its full weight DOWN! The impact craters the stone floor!`
            }
        ],
        dropRates: { common: 0.2041, uncommon: 0.2551, rare: 0.2551, epic: 0.1837, legendary: 0.102 }
    },
    
    spectral_warrior: {
        name: 'Spectral Warrior',
        baseHp: 470,
        baseDamage: 35,
        minDamage: 24,
        maxDamage: 45,
        baseDefense: 16,
        baseXp: 138,
        baseGold: 105,
        level: 15,
        description: 'The ghost of a legendary warrior',
        possibleDrops: ['greater_health_potion', 'spectral_blade', 'ghost_essence', 'large_gem'],
                abilities: [
            {
                id: 'phase_shift',
                name: 'Phase Shift',
                chance: 0.30,
                mpCost: 20,
                telegraph: 'becomes translucent, body flickering between planes...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.40,
                damageMult: 1.4,
                armorPiercing: 0.50,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName} phases through the $$$$${playerClass}'s guard, striking from another plane! Armor is useless — <span style="color:#ffaa44;">⚠️ 40% miss chance.</span>`
            },
            {
                id: 'soul_sap',
                name: 'Soul Sap',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'extends a gauntlet that shimmers like heat-haze...',
                type: 'drain_hp',
                drainAmount: 20,
                healPercent: 0.8,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💙 The ${enemyName} saps the $$$$${playerClass}'s soul! <b>20 HP drained</b> — a warrior even in death.`
            }
        ],
        dropRates: { common: 0.2631, uncommon: 0.2632, rare: 0.2316, epic: 0.1579, legendary: 0.0842 }
    },
    
    dark_priest: {
        name: 'Dark Priest',
        baseHp: 520,
        baseDamage: 38,
        minDamage: 26,
        maxDamage: 49,
        baseDefense: 15,
        baseXp: 148,
        baseGold: 125,
        level: 16,
        description: 'A corrupted cleric who worships dark gods',
        possibleDrops: ['greater_mana_potion', 'cursed_staff', 'dark_robes', 'huge_gem'],
        dropRates: { common: 0.2041, uncommon: 0.2551, rare: 0.2551, epic: 0.1837, legendary: 0.102 },
        abilities: [
            {
                id: 'dark_blessing',
                name: 'Dark Blessing',
                chance: 0.30,
                mpCost: 20,
                telegraph: 'kneels briefly and whispers to something that should not exist...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 9,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName} calls upon dark gods! A terrible curse descends on the $$$$${playerClass} — <b>Cursed!</b>`
            },
            {
                id: 'unholy_drain',
                name: 'Unholy Drain',
                chance: 0.25,
                mpCost: 0,
                telegraph: 'raises its staff and speaks words that hurt to hear...',
                type: 'drain_mp',
                drainAmount: 30,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔮 The ${enemyName} siphons the $$$$${playerClass}'s magical reserves! <b>30 MP drained!</b>`
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 16-20 MONSTERS (Crypt, Demon Portal, Corrupted Temple)
    // ═══════════════════════════════════════════════════════════════
    
    lich: { 
        name: 'Lich', 
        baseHp: 570, 
        baseDamage: 42, 
        minDamage: 29,
        maxDamage: 54,
        baseDefense: 18, 
        baseXp: 220, 
        baseGold: 180, 
        level: 17,
        description: 'An undead sorcerer of terrible power',
        possibleDrops: ['greater_health_potion', 'greater_mana_potion', 'archmage_staff', 'enchanted_robes', 'huge_gem', 'phylactery'],
        dropRates: { common: 0.2063, uncommon: 0.2577, rare: 0.2577, epic: 0.1546, legendary: 0.1031, mythic: 0.0206 }
    },
    
    death_knight: { 
        name: 'Death Knight', 
        baseHp: 680, 
        baseDamage: 48, 
        minDamage: 33,
        maxDamage: 62,
        baseDefense: 25, 
        baseXp: 260, 
        baseGold: 220, 
        level: 19,
        description: 'A fallen paladin cursed to serve in death',
        possibleDrops: ['greater_health_potion', 'excalibur', 'dragon_scale', 'huge_gem', 'cursed_blade'],
        dropRates: { common: 0.15, uncommon: 0.25, rare: 0.25, epic: 0.2, legendary: 0.12, mythic: 0.03 }
    },
    
    bone_dragon: {
        name: 'Bone Dragon',
        baseHp: 730,
        baseDamage: 50,
        minDamage: 35,
        maxDamage: 65,
        baseDefense: 30,
        baseXp: 300,
        baseGold: 250,
        level: 20,
        description: 'The skeletal remains of an ancient dragon',
        possibleDrops: ['superior_health_potion', 'dragon_bone', 'necromantic_staff', 'pristine_gem'],
        dropRates: { common: 0.15, uncommon: 0.2, rare: 0.25, epic: 0.22, legendary: 0.15, mythic: 0.03 }
    },
    
    vampire_lord: {
        name: 'Vampire Lord',
        baseHp: 680,
        baseDamage: 46,
        minDamage: 32,
        maxDamage: 59,
        baseDefense: 20,
        baseXp: 270,
        baseGold: 240,
        level: 19,
        description: 'An ancient vampire of immense power',
        possibleDrops: ['greater_health_potion', 'vampire_blade', 'blood_ruby', 'huge_gem'],
        dropRates: { common: 0.15, uncommon: 0.25, rare: 0.25, epic: 0.2, legendary: 0.12, mythic: 0.03 }
    },
    
    crypt_guard: {
        name: 'Crypt Guard',
        baseHp: 570,
        baseDamage: 40,
        minDamage: 28,
        maxDamage: 52,
        baseDefense: 22,
        baseXp: 200,
        baseGold: 160,
        level: 17,
        description: 'An undead sentinel bound to guard eternal',
        possibleDrops: ['greater_health_potion', 'ancient_sword', 'crypt_armor', 'huge_gem'],
        dropRates: { common: 0.2041, uncommon: 0.2551, rare: 0.2551, epic: 0.1837, legendary: 0.102 }
    },
    
    // Demon Portal monsters
    lesser_demon: {
        name: 'Lesser Demon',
        baseHp: 630,
        baseDamage: 44,
        minDamage: 30,
        maxDamage: 57,
        baseDefense: 19,
        baseXp: 240,
        baseGold: 190,
        level: 18,
        description: 'A fiend from the infernal planes',
        possibleDrops: ['greater_health_potion', 'demon_horn', 'hellforged_blade', 'huge_gem'],
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.25, epic: 0.2, legendary: 0.1, mythic: 0.02 }
    },
    
    hellhound: {
        name: 'Hellhound',
        baseHp: 570,
        baseDamage: 47,
        minDamage: 32,
        maxDamage: 61,
        baseDefense: 17,
        baseXp: 230,
        baseGold: 170,
        level: 17,
        description: 'A demonic beast wreathed in flames',
        possibleDrops: ['greater_health_potion', 'hellfire_fang', 'fire_essence', 'huge_gem'],
        dropRates: { common: 0.2041, uncommon: 0.2551, rare: 0.2551, epic: 0.1837, legendary: 0.102 }
    },
    
    imp_swarm: {
        name: 'Imp Swarm',
        baseHp: 570,
        baseDamage: 41,
        minDamage: 28,
        maxDamage: 53,
        baseDefense: 15,
        baseXp: 210,
        baseGold: 150,
        level: 17,
        description: 'A chaotic group of small demons',
        possibleDrops: ['mana_potion', 'imp_dust', 'chaos_essence', 'huge_gem'],
        dropRates: { common: 0.2631, uncommon: 0.2632, rare: 0.2316, epic: 0.1579, legendary: 0.0842 }
    },
    
    pit_fiend: {
        name: 'Pit Fiend',
        baseHp: 680,
        baseDamage: 52,
        minDamage: 36,
        maxDamage: 67,
        baseDefense: 24,
        baseXp: 290,
        baseGold: 230,
        level: 19,
        description: 'A powerful demon general',
        possibleDrops: ['superior_health_potion', 'demonic_blade', 'fiend_armor', 'pristine_gem'],
        dropRates: { common: 0.15, uncommon: 0.2, rare: 0.25, epic: 0.22, legendary: 0.15, mythic: 0.03 }
    },
    
    demon_lord: {
        name: 'Demon Lord',
        baseHp: 790,
        baseDamage: 55,
        minDamage: 38,
        maxDamage: 71,
        baseDefense: 28,
        baseXp: 320,
        baseGold: 280,
        level: 21,
        description: 'A ruler of the demonic hordes',
        possibleDrops: ['superior_health_potion', 'demon_crown', 'infernal_blade', 'pristine_gem'],
        dropRates: { common: 0.0971, uncommon: 0.1942, rare: 0.2427, epic: 0.2427, legendary: 0.1748, mythic: 0.0485 }
    },
    
    // Corrupted Temple monsters
    fallen_angel: {
        name: 'Fallen Angel',
        baseHp: 730,
        baseDamage: 50,
        minDamage: 35,
        maxDamage: 65,
        baseDefense: 26,
        baseXp: 280,
        baseGold: 250,
        level: 20,
        description: 'A celestial being corrupted by darkness',
        possibleDrops: ['superior_health_potion', 'fallen_wing', 'corrupted_halo', 'pristine_gem'],
        dropRates: { common: 0.15, uncommon: 0.2, rare: 0.25, epic: 0.22, legendary: 0.15, mythic: 0.03 }
    },
    
    corrupted_paladin: {
        name: 'Corrupted Paladin',
        baseHp: 790,
        baseDamage: 53,
        minDamage: 37,
        maxDamage: 68,
        baseDefense: 30,
        baseXp: 300,
        baseGold: 260,
        level: 21,
        description: 'A holy warrior turned to evil',
        possibleDrops: ['superior_health_potion', 'corrupted_mjolnir', 'tainted_plate', 'pristine_gem'],
        dropRates: { common: 0.1176, uncommon: 0.1961, rare: 0.2451, epic: 0.2451, legendary: 0.1569, mythic: 0.0392 }
    },
    
    dark_oracle: {
        name: 'Dark Oracle',
        baseHp: 680,
        baseDamage: 56,
        minDamage: 39,
        maxDamage: 72,
        baseDefense: 22,
        baseXp: 270,
        baseGold: 240,
        level: 19,
        description: 'A seer who glimpses dark futures',
        possibleDrops: ['superior_mana_potion', 'prophecy_staff', 'oracle_robes', 'pristine_gem'],
        dropRates: { common: 0.15, uncommon: 0.2, rare: 0.25, epic: 0.22, legendary: 0.15, mythic: 0.03 }
    },
    
    abomination: {
        name: 'Abomination',
        baseHp: 860,
        baseDamage: 58,
        minDamage: 40,
        maxDamage: 75,
        baseDefense: 32,
        baseXp: 340,
        baseGold: 300,
        level: 22,
        description: 'A horrific fusion of flesh and dark magic',
        possibleDrops: ['superior_health_potion', 'corrupted_essence', 'flesh_armor', 'pristine_gem'],
        dropRates: { common: 0.0972, uncommon: 0.1456, rare: 0.2427, epic: 0.2718, legendary: 0.1942, mythic: 0.0485 }
    },
    
    void_priest: {
        name: 'Void Priest',
        baseHp: 790,
        baseDamage: 60,
        minDamage: 42,
        maxDamage: 78,
        baseDefense: 26,
        baseXp: 310,
        baseGold: 270,
        level: 21,
        description: 'A cultist who channels the void',
        possibleDrops: ['superior_mana_potion', 'void_staff', 'nihil_robes', 'pristine_gem'],
        dropRates: { common: 0.1176, uncommon: 0.1961, rare: 0.2451, epic: 0.2451, legendary: 0.1569, mythic: 0.0392 }
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 21-25 MONSTERS (Volcano, Frozen Tundra, Void Realm, Celestial Spire)
    // ═══════════════════════════════════════════════════════════════
    
    fire_elemental: { 
        name: 'Fire Elemental', 
        baseHp: 860, 
        baseDamage: 62, 
        minDamage: 43,
        maxDamage: 80,
        baseDefense: 22, 
        baseXp: 380, 
        baseGold: 320, 
        level: 22,
        description: 'A being of pure flame and destruction',
        possibleDrops: ['superior_health_potion', 'flame_staff', 'fire_blade', 'pristine_gem', 'fire_core'],
        dropRates: { common: 0.0972, uncommon: 0.1456, rare: 0.2427, epic: 0.2718, legendary: 0.1942, mythic: 0.0485 }
    },
    
    lava_golem: {
        name: 'Lava Golem',
        baseHp: 930,
        baseDamage: 60,
        minDamage: 42,
        maxDamage: 78,
        baseDefense: 38,
        baseXp: 400,
        baseGold: 340,
        level: 23,
        description: 'A massive construct of molten rock',
        possibleDrops: ['superior_health_potion', 'magma_core', 'lava_armor', 'pristine_gem'],
        dropRates: { common: 0.0776, uncommon: 0.1165, rare: 0.2427, epic: 0.2913, legendary: 0.2136, mythic: 0.0583 }
    },
    
    phoenix: {
        name: 'Phoenix',
        baseHp: 1010,
        baseDamage: 68,
        minDamage: 47,
        maxDamage: 88,
        baseDefense: 24,
        baseXp: 420,
        baseGold: 360,
        level: 24,
        description: 'A legendary bird that rises from ashes',
        possibleDrops: ['superior_health_potion', 'phoenix_feather', 'rebirth_essence', 'pristine_gem'],
        dropRates: { common: 0.0485, uncommon: 0.0971, rare: 0.1942, epic: 0.2913, legendary: 0.2718, mythic: 0.0971 }
    },
    
    magma_dragon: {
        name: 'Magma Dragon',
        baseHp: 1120,
        baseDamage: 72,
        minDamage: 50,
        maxDamage: 93,
        baseDefense: 42,
        baseXp: 500,
        baseGold: 450,
        level: 25,
        description: 'A dragon born in the heart of a volcano',
        possibleDrops: ['superior_health_potion', 'dragonslayer', 'magma_scale', 'flawless_gem', 'dragon_heart'],
        dropRates: { common: 0.0467, uncommon: 0.0935, rare: 0.1869, epic: 0.2804, legendary: 0.2804, mythic: 0.1121 }
    },
    
    flame_titan: {
        name: 'Flame Titan',
        baseHp: 1120,
        baseDamage: 75,
        minDamage: 52,
        maxDamage: 97,
        baseDefense: 45,
        baseXp: 550,
        baseGold: 500,
        level: 25,
        description: 'A primordial giant of endless fire',
        possibleDrops: ['superior_health_potion', 'titan_blade', 'flame_armor', 'flawless_gem'],
        dropRates: { common: 0.0277, uncommon: 0.0741, rare: 0.1667, epic: 0.2963, legendary: 0.2963, mythic: 0.1389 },
        isBoss: true
    },
    
    // Frozen Tundra monsters
    frost_giant: {
        name: 'Frost Giant',
        baseHp: 930,
        baseDamage: 65,
        minDamage: 45,
        maxDamage: 84,
        baseDefense: 36,
        baseXp: 430,
        baseGold: 370,
        level: 23,
        description: 'A colossal warrior from the frozen wastes',
        possibleDrops: ['superior_health_potion', 'giant_axe', 'frost_armor', 'pristine_gem'],
        dropRates: { common: 0.0776, uncommon: 0.1165, rare: 0.2427, epic: 0.2913, legendary: 0.2136, mythic: 0.0583 }
    },
    
    ice_drake: {
        name: 'Ice Drake',
        baseHp: 860,
        baseDamage: 64,
        minDamage: 44,
        maxDamage: 83,
        baseDefense: 32,
        baseXp: 410,
        baseGold: 350,
        level: 22,
        description: 'A dragon of ice and winter',
        possibleDrops: ['superior_health_potion', 'ice_fang', 'frozen_scale', 'pristine_gem'],
        dropRates: { common: 0.0793, uncommon: 0.1485, rare: 0.2475, epic: 0.2772, legendary: 0.198, mythic: 0.0495 }
    },
    
    yeti: {
        name: 'Yeti',
        baseHp: 860,
        baseDamage: 61,
        minDamage: 42,
        maxDamage: 79,
        baseDefense: 30,
        baseXp: 390,
        baseGold: 330,
        level: 22,
        description: 'A legendary snow beast',
        possibleDrops: ['superior_health_potion', 'yeti_fur', 'ice_crystal', 'pristine_gem'],
        dropRates: { common: 0.0972, uncommon: 0.1456, rare: 0.2427, epic: 0.2718, legendary: 0.1942, mythic: 0.0485 }
    },
    
    frozen_revenant: {
        name: 'Frozen Revenant',
        baseHp: 930,
        baseDamage: 68,
        minDamage: 47,
        maxDamage: 88,
        baseDefense: 34,
        baseXp: 440,
        baseGold: 380,
        level: 23,
        description: 'An undead warrior encased in ice',
        possibleDrops: ['superior_health_potion', 'frozen_blade', 'ice_armor', 'pristine_gem'],
        dropRates: { common: 0.0776, uncommon: 0.1165, rare: 0.2427, epic: 0.2913, legendary: 0.2136, mythic: 0.0583 }
    },
    
    frost_wyrm: {
        name: 'Frost Wyrm',
        baseHp: 1120,
        baseDamage: 78,
        minDamage: 54,
        maxDamage: 101,
        baseDefense: 40,
        baseXp: 520,
        baseGold: 470,
        level: 25,
        description: 'An ancient dragon of eternal winter',
        possibleDrops: ['superior_health_potion', 'wyrm_scale', 'frost_heart', 'flawless_gem'],
        dropRates: { common: 0.0467, uncommon: 0.0935, rare: 0.1869, epic: 0.2804, legendary: 0.2804, mythic: 0.1121 },
        isBoss: true
    },
    
    // Void Realm monsters
    void_walker: {
        name: 'Void Walker',
        baseHp: 1010,
        baseDamage: 70,
        minDamage: 49,
        maxDamage: 91,
        baseDefense: 36,
        baseXp: 460,
        baseGold: 400,
        level: 24,
        description: 'A creature from between dimensions',
        possibleDrops: ['superior_health_potion', 'void_blade', 'null_essence', 'pristine_gem'],
        dropRates: { common: 0.0571, uncommon: 0.1143, rare: 0.2095, epic: 0.3048, legendary: 0.2381, mythic: 0.0762 }
    },
    
    reality_tear: {
        name: 'Reality Tear',
        baseHp: 930,
        baseDamage: 74,
        minDamage: 51,
        maxDamage: 96,
        baseDefense: 33,
        baseXp: 450,
        baseGold: 390,
        level: 23,
        description: 'A wound in the fabric of existence',
        possibleDrops: ['superior_mana_potion', 'reality_shard', 'void_crystal', 'pristine_gem'],
        dropRates: { common: 0.0776, uncommon: 0.1165, rare: 0.2427, epic: 0.2913, legendary: 0.2136, mythic: 0.0583 }
    },
    
    entropy_beast: {
        name: 'Entropy Beast',
        baseHp: 1010,
        baseDamage: 76,
        minDamage: 53,
        maxDamage: 98,
        baseDefense: 38,
        baseXp: 480,
        baseGold: 420,
        level: 24,
        description: 'A monster that embodies decay itself',
        possibleDrops: ['superior_health_potion', 'entropy_core', 'chaos_armor', 'pristine_gem'],
        dropRates: { common: 0.0571, uncommon: 0.1143, rare: 0.2095, epic: 0.3048, legendary: 0.2381, mythic: 0.0762 }
    },
    
    nihil_spawn: {
        name: 'Nihil Spawn',
        baseHp: 1120,
        baseDamage: 80,
        minDamage: 56,
        maxDamage: 104,
        baseDefense: 40,
        baseXp: 510,
        baseGold: 460,
        level: 25,
        description: 'A creature of pure nothingness',
        possibleDrops: ['superior_health_potion', 'nihil_essence', 'void_armor', 'flawless_gem'],
        dropRates: { common: 0.0467, uncommon: 0.0935, rare: 0.1869, epic: 0.2804, legendary: 0.2804, mythic: 0.1121 }
    },
    
    void_lord: {
        name: 'Void Lord',
        baseHp: 1120,
        baseDamage: 85,
        minDamage: 59,
        maxDamage: 110,
        baseDefense: 45,
        baseXp: 600,
        baseGold: 550,
        level: 25,
        description: 'A ruler of the emptiness between worlds',
        possibleDrops: ['superior_health_potion', 'void_crown', 'oblivion_blade', 'flawless_gem'],
        dropRates: { common: 0.0277, uncommon: 0.0741, rare: 0.1667, epic: 0.2963, legendary: 0.2963, mythic: 0.1389 },
        isBoss: true
    },
    
    // Celestial Spire monsters
    celestial_guardian: {
        name: 'Celestial Guardian',
        baseHp: 1010,
        baseDamage: 72,
        minDamage: 50,
        maxDamage: 93,
        baseDefense: 42,
        baseXp: 530,
        baseGold: 480,
        level: 24,
        description: 'A divine protector of the heavens',
        possibleDrops: ['superior_health_potion', 'holy_blade', 'divine_armor', 'flawless_gem'],
        dropRates: { common: 0.0467, uncommon: 0.0935, rare: 0.1869, epic: 0.2804, legendary: 0.2804, mythic: 0.1121 }
    },
    
    arch_angel: {
        name: 'Arch Angel',
        baseHp: 1120,
        baseDamage: 78,
        minDamage: 54,
        maxDamage: 101,
        baseDefense: 44,
        baseXp: 570,
        baseGold: 520,
        level: 25,
        description: 'A powerful celestial warrior',
        possibleDrops: ['superior_health_potion', 'angel_wing', 'celestial_blade', 'flawless_gem'],
        dropRates: { common: 0.037, uncommon: 0.0741, rare: 0.1667, epic: 0.2963, legendary: 0.2963, mythic: 0.1296 }
    },
    
    divine_champion: {
        name: 'Divine Champion',
        baseHp: 1120,
        baseDamage: 82,
        minDamage: 57,
        maxDamage: 106,
        baseDefense: 46,
        baseXp: 560,
        baseGold: 510,
        level: 25,
        description: 'A mortal elevated to divine status',
        possibleDrops: ['superior_health_potion', 'champion_sword', 'blessed_plate', 'flawless_gem'],
        dropRates: { common: 0.037, uncommon: 0.0741, rare: 0.1667, epic: 0.2963, legendary: 0.2963, mythic: 0.1296 }
    },
    
    seraphim: {
        name: 'Seraphim',
        baseHp: 1120,
        baseDamage: 88,
        minDamage: 61,
        maxDamage: 114,
        baseDefense: 48,
        baseXp: 620,
        baseGold: 570,
        level: 25,
        description: 'A six-winged angel of highest order',
        possibleDrops: ['superior_health_potion', 'seraphim_feather', 'heavenly_blade', 'flawless_gem'],
        dropRates: { common: 0.0277, uncommon: 0.0648, rare: 0.1389, epic: 0.2778, legendary: 0.3241, mythic: 0.1667 }
    },
    
    god_avatar: {
        name: 'Avatar of a God',
        baseHp: 1120,
        baseDamage: 95,
        minDamage: 66,
        maxDamage: 123,
        baseDefense: 50,
        baseXp: 800,
        baseGold: 700,
        level: 25,
        description: 'A physical manifestation of divine power',
        possibleDrops: ['superior_health_potion', 'divine_artifact', 'god_blade', 'flawless_gem', 'magical_butterknife'],
        dropRates: { common: 0.0183, uncommon: 0.0459, rare: 0.1101, epic: 0.2752, legendary: 0.3669, mythic: 0.1835, butterknife: 0.0001 },
        isBoss: true
    },
    
    // ═══════════════════════════════════════════════════════════════
    // SPECIAL BOSS MONSTERS
    // ═══════════════════════════════════════════════════════════════
    
    red_dragon: { 
        name: 'Ancient Red Dragon', 
        baseHp: 730, 
        baseDamage: 70, 
        minDamage: 49,
        maxDamage: 91,
        baseDefense: 35, 
        baseXp: 550, 
        baseGold: 500, 
        level: 20,
        description: 'An ancient wyrm with scales like rubies',
        possibleDrops: ['superior_health_potion', 'dragonslayer', 'dragon_scale', 'pristine_gem', 'dragon_heart', 'magical_butterknife'],
        dropRates: { common: 0.097, uncommon: 0.1456, rare: 0.2427, epic: 0.2427, legendary: 0.1942, mythic: 0.0777, butterknife: 0.0001 },
        isBoss: true
    },
    
    demon: { 
        name: 'Greater Demon', 
        baseHp: 630, 
        baseDamage: 62, 
        minDamage: 43,
        maxDamage: 80,
        baseDefense: 28, 
        baseXp: 450, 
        baseGold: 400, 
        level: 18,
        description: 'A powerful fiend from the infernal planes',
        possibleDrops: ['superior_health_potion', 'superior_mana_potion', 'demonic_blade', 'demon_leather', 'pristine_gem', 'demon_core'],
        dropRates: { common: 0.1164, uncommon: 0.1748, rare: 0.2427, epic: 0.2136, legendary: 0.1748, mythic: 0.0777 },
        isBoss: true
    },
    
    vampire: {
        name: 'Ancient Vampire',
        baseHp: 520,
        baseDamage: 58,
        minDamage: 40,
        maxDamage: 75,
        baseDefense: 22,
        baseXp: 350,
        baseGold: 300,
        level: 16,
        description: 'A centuries-old blood-drinking undead',
        possibleDrops: ['greater_health_potion', 'vampire_blade', 'noble_robes', 'huge_gem', 'blood_ruby'],
        dropRates: { common: 0.1471, uncommon: 0.2451, rare: 0.2451, epic: 0.1961, legendary: 0.1176, mythic: 0.049 },
        isBoss: true,
        abilities: [
            {
                id: 'vampire_bite',
                name: 'Vampire Bite',
                chance: 0.35,
                mpCost: 18,
                telegraph: 'inhales slowly, fangs extending with predatory patience...',
                type: 'leech',
                damageMult: 0.9,
                healRatio: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The $$$$${enemyName} BITES and drinks deeply! Centuries of hunger feed — HP stolen!`
            },
            {
                id: 'beguile',
                name: 'Beguile',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'fixes you with ancient, hypnotic eyes...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 6000,
                hitMissChance: 0.40,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌀 The ${enemyName} beguiles the $$$$${playerClass}! Hypnotic compulsion clouds the mind — <span style="color:#ffaa44;">⚠️ 40% miss chance, 6 seconds.</span>`
            },
            {
                id: 'mist_form',
                name: 'Mist Form',
                chance: 0.25,
                mpCost: 16,
                lowHpThreshold: 0.45,
                telegraph: 'dissolves into cold mist and reforms with renewed hunger...',
                type: 'drain_hp',
                drainAmount: 28,
                healPercent: 1.0,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💨 The ${enemyName} flows through the $$$$${playerClass} as mist! Vitality stolen in passing — <b>28 HP drained!</b>`
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // NEW MONSTERS — 5 per level band
    // ═══════════════════════════════════════════════════════════════

    // ── LEVEL 1 ── (Forest zone additions)
    mud_crab: {
        name: 'Mud Crab',
        baseHp: 28,
        baseDamage: 7,
        minDamage: 4,
        maxDamage: 9,
        baseDefense: 5,
        baseXp: 17,
        baseGold: 9,
        level: 1,
        description: 'A bad-tempered crustacean that snaps at anything that moves',
        possibleDrops: ['health_potion', 'crab_claw', 'small_gem'],
        dropRates: { common: 0.7792, uncommon: 0.1948, rare: 0.026 }
    },

    angry_squirrel: {
        name: 'Rabid Squirrel',
        baseHp: 18,
        baseDamage: 9,
        minDamage: 6,
        maxDamage: 11,
        baseDefense: 1,
        baseXp: 14,
        baseGold: 5,
        level: 1,
        description: 'Do NOT let the cute face fool you. It is absolutely feral',
        possibleDrops: ['health_potion', 'small_gem'],
        dropRates: { common: 0.8552, uncommon: 0.1316, rare: 0.0132 }
    },

    thornling: {
        name: 'Thornling',
        baseHp: 25,
        baseDamage: 8,
        minDamage: 5,
        maxDamage: 10,
        baseDefense: 3,
        baseXp: 19,
        baseGold: 11,
        level: 1,
        description: 'A walking tangle of briars and bad attitude',
        possibleDrops: ['health_potion', 'thorn_shard', 'small_gem'],
        dropRates: { common: 0.7237, uncommon: 0.2368, rare: 0.0395 }
    },

    // ── LEVEL 2 ── (Forest zone additions)
    venomfang_bat: {
        name: 'Venomfang Bat',
        baseHp: 32,
        baseDamage: 11,
        minDamage: 7,
        maxDamage: 14,
        baseDefense: 2,
        baseXp: 22,
        baseGold: 13,
        level: 2,
        description: 'A cave bat with hollow teeth that drip with paralytic venom',
        possibleDrops: ['health_potion', 'bat_wing', 'small_gem'],
        dropRates: { common: 0.6756, uncommon: 0.2703, rare: 0.0541 }
    },

    moss_creeper: {
        name: 'Moss Creeper',
        baseHp: 38,
        baseDamage: 9,
        minDamage: 6,
        maxDamage: 11,
        baseDefense: 6,
        baseXp: 26,
        baseGold: 14,
        level: 2,
        description: 'An ambush predator disguised as a mossy log',
        possibleDrops: ['health_potion', 'slime_gel', 'small_gem'],
        dropRates: { common: 0.7042, uncommon: 0.2535, rare: 0.0423 }
    },

    // ── LEVEL 3 ── (Forest/Riverside additions)
    goblin_shaman: {
        name: 'Goblin Shaman',
        baseHp: 50,
        baseDamage: 14,
        minDamage: 9,
        maxDamage: 18,
        baseDefense: 3,
        baseXp: 36,
        baseGold: 28,
        level: 3,
        description: 'A goblin daubed in warpaint, hurling curse-hexes',
        possibleDrops: ['mana_potion', 'shaman_totem', 'small_gem'],
        dropRates: { common: 0.5333, uncommon: 0.3333, rare: 0.1067, epic: 0.0267 }
    },

    wild_lynx: {
        name: 'Wild Lynx',
        baseHp: 45,
        baseDamage: 13,
        minDamage: 9,
        maxDamage: 16,
        baseDefense: 4,
        baseXp: 32,
        baseGold: 20,
        level: 3,
        description: 'A tufted predator that pounces without warning',
        possibleDrops: ['health_potion', 'lynx_pelt', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 }
    },

    plague_rat: {
        name: 'Plague Rat',
        baseHp: 35,
        baseDamage: 10,
        minDamage: 7,
        maxDamage: 13,
        baseDefense: 2,
        baseXp: 28,
        baseGold: 16,
        level: 3,
        description: 'Carries enough disease to drop a small horse',
        possibleDrops: ['health_potion', 'rat_tail', 'small_gem'],
        dropRates: { common: 0.7237, uncommon: 0.2368, rare: 0.0395 }
    },

    // ── LEVEL 4 ── (Riverside additions)
    mudskipper: {
        name: 'Mudskipper Horror',
        baseHp: 70,
        baseDamage: 14,
        minDamage: 9,
        maxDamage: 18,
        baseDefense: 7,
        baseXp: 42,
        baseGold: 25,
        level: 4,
        description: 'An oversized amphibian with an unsettling number of teeth',
        possibleDrops: ['health_potion', 'frog_legs', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 }
    },

    river_pirate: {
        name: 'River Pirate',
        baseHp: 80,
        baseDamage: 16,
        minDamage: 11,
        maxDamage: 20,
        baseDefense: 6,
        baseXp: 48,
        baseGold: 55,
        level: 4,
        description: 'A brigand who robs travelers crossing the ford',
        possibleDrops: ['health_potion', 'gold_coins', 'dagger', 'small_gem'],
        dropRates: { common: 0.5, uncommon: 0.35, rare: 0.125, epic: 0.025 }
    },

    snapping_turtle: {
        name: 'Snapping Turtle',
        baseHp: 90,
        baseDamage: 12,
        minDamage: 8,
        maxDamage: 15,
        baseDefense: 14,
        baseXp: 44,
        baseGold: 22,
        level: 4,
        description: 'Ancient and armored — its bite can sever a branch clean',
        possibleDrops: ['health_potion', 'shell_shard', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 }
    },

    kelp_strangler: {
        name: 'Kelp Strangler',
        baseHp: 75,
        baseDamage: 15,
        minDamage: 10,
        maxDamage: 19,
        baseDefense: 5,
        baseXp: 40,
        baseGold: 20,
        level: 4,
        description: 'Living vines that drag prey beneath the surface',
        possibleDrops: ['health_potion', 'swamp_essence', 'small_gem'],
        dropRates: { common: 0.6666, uncommon: 0.2667, rare: 0.0667 }
    },

    bog_witch: {
        name: 'Bog Witch',
        baseHp: 85,
        baseDamage: 18,
        minDamage: 12,
        maxDamage: 23,
        baseDefense: 4,
        baseXp: 52,
        baseGold: 38,
        level: 4,
        description: 'Mutters curses and throws jars of unidentified fluid',
        possibleDrops: ['mana_potion', 'witch_brew', 'small_gem'],
        dropRates: { common: 0.5, uncommon: 0.35, rare: 0.125, epic: 0.025 }
    },

    // ── LEVEL 5 ── (Riverside/Plains overlap)
    harpy: {
        name: 'Harpy',
        baseHp: 95,
        baseDamage: 17,
        minDamage: 11,
        maxDamage: 22,
        baseDefense: 5,
        baseXp: 58,
        baseGold: 35,
        level: 5,
        description: 'A shrieking winged creature with talons like daggers',
        possibleDrops: ['health_potion', 'harpy_feather', 'medium_gem'],
        dropRates: { common: 0.5194, uncommon: 0.3247, rare: 0.1299, epic: 0.026 }
    },

    gnoll: {
        name: 'Gnoll Raider',
        baseHp: 100,
        baseDamage: 19,
        minDamage: 13,
        maxDamage: 24,
        baseDefense: 8,
        baseXp: 62,
        baseGold: 42,
        level: 5,
        description: 'A hyena-headed marauder with a taste for chaos',
        possibleDrops: ['health_potion', 'gnoll_hide', 'medium_gem'],
        dropRates: { common: 0.5194, uncommon: 0.3247, rare: 0.1299, epic: 0.026 }
    },

    lizardfolk: {
        name: 'Lizardfolk Warrior',
        baseHp: 110,
        baseDamage: 18,
        minDamage: 12,
        maxDamage: 23,
        baseDefense: 9,
        baseXp: 60,
        baseGold: 40,
        level: 5,
        description: 'A tribal reptilian fighter, fast and aggressive',
        possibleDrops: ['health_potion', 'scale_shard', 'medium_gem'],
        dropRates: { common: 0.5844, uncommon: 0.2857, rare: 0.1039, epic: 0.026 }
    },

    giant_wasp: {
        name: 'Giant Wasp',
        baseHp: 80,
        baseDamage: 20,
        minDamage: 14,
        maxDamage: 26,
        baseDefense: 4,
        baseXp: 56,
        baseGold: 30,
        level: 5,
        description: 'Airborne, angry, and capable of stinging through plate',
        possibleDrops: ['mana_potion', 'wasp_stinger', 'medium_gem'],
        dropRates: { common: 0.5844, uncommon: 0.2857, rare: 0.1039, epic: 0.026 }
    },

    bandit_scout: {
        name: 'Bandit Scout',
        baseHp: 90,
        baseDamage: 17,
        minDamage: 11,
        maxDamage: 22,
        baseDefense: 6,
        baseXp: 54,
        baseGold: 48,
        level: 5,
        description: 'The eyes of a larger gang — quicker than a full bandit',
        possibleDrops: ['health_potion', 'gold_coins', 'dagger', 'small_gem'],
        dropRates: { common: 0.5, uncommon: 0.35, rare: 0.125, epic: 0.025 }
    },

    // ── LEVEL 6 ── (Plains additions)
    war_boar: {
        name: 'Armored War Boar',
        baseHp: 130,
        baseDamage: 20,
        minDamage: 14,
        maxDamage: 26,
        baseDefense: 11,
        baseXp: 68,
        baseGold: 38,
        level: 6,
        description: 'Someone strapped iron plates to a boar. Big mistake',
        possibleDrops: ['health_potion', 'boar_hide', 'iron_tusk', 'medium_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },

    hobgoblin: {
        name: 'Hobgoblin Captain',
        baseHp: 140,
        baseDamage: 21,
        minDamage: 14,
        maxDamage: 27,
        baseDefense: 10,
        baseXp: 72,
        baseGold: 50,
        level: 6,
        description: 'A larger, meaner, well-organized cousin of the goblin',
        possibleDrops: ['health_potion', 'iron_sword', 'medium_gem'],
        dropRates: { common: 0.4634, uncommon: 0.3415, rare: 0.1463, epic: 0.0488 }
    },

    plains_hawk: {
        name: 'Plains Hawk',
        baseHp: 105,
        baseDamage: 22,
        minDamage: 15,
        maxDamage: 28,
        baseDefense: 6,
        baseXp: 70,
        baseGold: 32,
        level: 6,
        description: 'A predatory bird that dives at 80mph from nowhere',
        possibleDrops: ['health_potion', 'hawk_talon', 'medium_gem'],
        dropRates: { common: 0.5844, uncommon: 0.2857, rare: 0.1039, epic: 0.026 }
    },

    thorn_golem: {
        name: 'Thorn Golem',
        baseHp: 160,
        baseDamage: 19,
        minDamage: 13,
        maxDamage: 24,
        baseDefense: 13,
        baseXp: 75,
        baseGold: 40,
        level: 6,
        description: 'A construct of bramble and hate, built by no one living',
        possibleDrops: ['health_potion', 'thorn_shard', 'medium_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 }
    },

    dust_wraith: {
        name: 'Dust Wraith',
        baseHp: 120,
        baseDamage: 23,
        minDamage: 16,
        maxDamage: 29,
        baseDefense: 5,
        baseXp: 78,
        baseGold: 45,
        level: 6,
        description: 'A ghostly smear that rises from the sun-baked plains',
        possibleDrops: ['mana_potion', 'spirit_essence', 'medium_gem'],
        dropRates: { common: 0.4471, uncommon: 0.3294, rare: 0.1647, epic: 0.0588 }
    },

    // ── LEVEL 7 ── (Graveyard/Plains additions)
    bone_archer: {
        name: 'Bone Archer',
        baseHp: 140,
        baseDamage: 21,
        minDamage: 14,
        maxDamage: 27,
        baseDefense: 7,
        baseXp: 82,
        baseGold: 38,
        level: 7,
        description: 'A skeleton marksman that pins you from the shadows',
        possibleDrops: ['health_potion', 'bone_dust', 'cursed_bow', 'medium_gem'],
        dropRates: { common: 0.5128, uncommon: 0.3205, rare: 0.1282, epic: 0.0385 },
        abilities: [
            {
                id: 'volley',
                name: 'Volley',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'notches two arrows and draws back with dead, hollow eyes...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 4000,
                hitMissChance: 0.30,
                damageMult: 0.9,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🏹 The ${enemyName} fires a volley of bone arrows! Splinters blind the $$$${playerClass} — <span style='color:#ffaa44;'>⚠️ 30% miss chance.</span>`
            },
        ]
    },

    shadow_hound: {
        name: 'Shadow Hound',
        baseHp: 155,
        baseDamage: 24,
        minDamage: 16,
        maxDamage: 31,
        baseDefense: 7,
        baseXp: 88,
        baseGold: 42,
        level: 7,
        description: 'A dog-shaped hole in the darkness that hunts by smell',
        possibleDrops: ['health_potion', 'shadow_essence', 'medium_gem'],
        dropRates: { common: 0.4939, uncommon: 0.3086, rare: 0.1481, epic: 0.0494 },
        abilities: [
            {
                id: 'shadow_pounce',
                name: 'Shadow Pounce',
                chance: 0.3,
                mpCost: 14,
                telegraph: 'hunches low, bleeding into the shadows...',
                type: 'heavy_hit',
                damageMult: 1.9,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} erupts from shadow! The $$$${playerClass} never saw it coming!`
            },
        ]
    },

    crypt_bat: {
        name: 'Crypt Bat',
        baseHp: 120,
        baseDamage: 19,
        minDamage: 13,
        maxDamage: 24,
        baseDefense: 4,
        baseXp: 76,
        baseGold: 28,
        level: 7,
        description: 'Enormous bat that nests in fresh grave mounds',
        possibleDrops: ['health_potion', 'bat_wing', 'medium_gem'],
        dropRates: { common: 0.6234, uncommon: 0.2597, rare: 0.0909, epic: 0.026 },
        abilities: [
            {
                id: 'crypt_screech',
                name: 'Screech',
                chance: 0.25,
                mpCost: 8,
                telegraph: 'opens its jaws and lets out a piercing, guttural cry...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 4,
                damageMult: 0.4,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🦇 The ${enemyName} SCREECHES! The sonic assault staggers the $$$${playerClass} — attack charge lost!`
            },
        ]
    },

    wailing_banshee: {
        name: 'Wailing Banshee',
        baseHp: 130,
        baseDamage: 23,
        minDamage: 16,
        maxDamage: 29,
        baseDefense: 4,
        baseXp: 90,
        baseGold: 50,
        level: 7,
        description: 'Her scream alone can crack headstones',
        possibleDrops: ['mana_potion', 'ectoplasm', 'medium_gem'],
        dropRates: { common: 0.4471, uncommon: 0.3294, rare: 0.1647, epic: 0.0588 },
        abilities: [
            {
                id: 'death_wail',
                name: 'Death Wail',
                chance: 0.3,
                mpCost: 15,
                telegraph: 'throws back her head and inhales...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 5,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The ${enemyName}'s soul-rending wail hits like a physical blow! The $$$${playerClass} is stunned — attack charge lost!`
            },
            {
                id: 'keen_lament',
                name: 'Keen',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'fixes her hollow eyes on you and begins a low, keening moan...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 6000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName}'s lament fills the $$$${playerClass} with dread — <span style='color:#ffaa44;'>⚠️ -25% damage for 6 seconds.</span>`
            },
        ]
    },

    grave_knight: {
        name: 'Grave Knight',
        baseHp: 170,
        baseDamage: 22,
        minDamage: 15,
        maxDamage: 28,
        baseDefense: 12,
        baseXp: 95,
        baseGold: 55,
        level: 7,
        description: 'A corrupted paladin still dutifully guarding his eternal post',
        possibleDrops: ['health_potion', 'cursed_sword', 'medium_gem'],
        dropRates: { common: 0.4167, uncommon: 0.3333, rare: 0.1786, epic: 0.0714 },
        abilities: [
            {
                id: 'cursed_strike',
                name: 'Cursed Strike',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'raises its corrupted blade and murmurs a dark oath...',
                type: 'dot_attack',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 6,
                    tickInterval: 3500,
                    ticks: 3,
                },
                damageMult: 1.1,
                armorPiercing: 0.15,
                applyMessage: (enemyName, playerClass) => `💜 The $$$${enemyName}'s cursed sword strikes! Dark energy lingers in the wound — <b>Cursed!</b>`
            },
        ]
    },

    // ── LEVEL 8 ── (Plains/Graveyard additions)
    orc_berserker: {
        name: 'Orc Berserker',
        baseHp: 190,
        baseDamage: 27,
        minDamage: 18,
        maxDamage: 35,
        baseDefense: 7,
        baseXp: 105,
        baseGold: 48,
        level: 8,
        description: 'Fights naked and screaming — somehow more dangerous for it',
        possibleDrops: ['health_potion', 'warhammer', 'medium_gem'],
        dropRates: { common: 0.4167, uncommon: 0.3333, rare: 0.1786, epic: 0.0714 },
        abilities: [
            {
                id: 'blood_frenzy',
                name: 'Blood Frenzy',
                chance: 0.35,
                mpCost: 16,
                lowHpThreshold: 0.5,
                telegraph: 'roars incoherently and begins to froth at the mouth...',
                type: 'heavy_hit',
                damageMult: 2.1,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🪓 The $$$${enemyName} enters BLOOD FRENZY — a wild, ferocious assault!`
            },
        ]
    },

    giant_beetle: {
        name: 'Giant Bombardier Beetle',
        baseHp: 175,
        baseDamage: 22,
        minDamage: 15,
        maxDamage: 28,
        baseDefense: 16,
        baseXp: 98,
        baseGold: 40,
        level: 8,
        description: 'Sprays boiling acid. The shell is the least of your problems',
        possibleDrops: ['health_potion', 'chitin_armor', 'medium_gem'],
        dropRates: { common: 0.4939, uncommon: 0.3086, rare: 0.1481, epic: 0.0494 },
        abilities: [
            {
                id: 'acid_spray',
                name: 'Acid Spray',
                chance: 0.3,
                mpCost: 14,
                telegraph: 'rotates its abdomen toward you with an ominous gurgle...',
                type: 'burn',
                dot: {
                    name: 'Corroding',
                    icon: '🟤',
                    damage: 7,
                    tickInterval: 3000,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🟤 The ${enemyName} SPRAYS boiling acid! The $$$${playerClass}'s armor and flesh corrode — <b>Corroding!</b>`
            },
        ]
    },

    plague_bearer: {
        name: 'Plague Bearer',
        baseHp: 165,
        baseDamage: 20,
        minDamage: 14,
        maxDamage: 26,
        baseDefense: 8,
        baseXp: 92,
        baseGold: 35,
        level: 8,
        description: 'A walking haze of pestilence and despair',
        possibleDrops: ['health_potion', 'plague_sample', 'medium_gem'],
        dropRates: { common: 0.5316, uncommon: 0.3038, rare: 0.1266, epic: 0.038 },
        abilities: [
            {
                id: 'festering_touch',
                name: 'Festering Touch',
                chance: 0.3,
                mpCost: 12,
                telegraph: 'lurches forward, oozing black ichor from every pore...',
                type: 'dot_attack',
                dot: {
                    name: 'Plague',
                    icon: '☣️',
                    damage: 6,
                    tickInterval: 2500,
                    ticks: 4,
                },
                damageMult: 0.9,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `☣️ The ${enemyName}'s touch festers! The $$$${playerClass} is infected — <b>Plagued!</b>`
            },
        ]
    },

    minotaur_scout: {
        name: 'Minotaur Scout',
        baseHp: 200,
        baseDamage: 26,
        minDamage: 18,
        maxDamage: 33,
        baseDefense: 10,
        baseXp: 108,
        baseGold: 55,
        level: 8,
        description: 'Outrider of a minotaur warband — never comes alone for long',
        possibleDrops: ['health_potion', 'iron_sword', 'medium_gem'],
        dropRates: { common: 0.4167, uncommon: 0.3333, rare: 0.1786, epic: 0.0714 },
        abilities: [
            {
                id: 'gore',
                name: 'Gore',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'lowers its horns and scrapes a hoof across the ground...',
                type: 'dot_attack',
                dot: {
                    name: 'Bleeding',
                    icon: '🩸',
                    damage: 6,
                    tickInterval: 3000,
                    ticks: 3,
                },
                damageMult: 1.6,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `🐂 The ${enemyName} GORES the $$$${playerClass}! Horns tear through the side — <b>Bleeding!</b>`
            },
        ]
    },

    will_o_wisp: {
        name: "Will-o'-Wisp",
        baseHp: 130,
        baseDamage: 28,
        minDamage: 19,
        maxDamage: 36,
        baseDefense: 5,
        baseXp: 96,
        baseGold: 60,
        level: 8,
        description: 'A dancing light that lures travelers into bogs and eats them',
        possibleDrops: ['mana_potion', 'wisp_essence', 'medium_gem'],
        dropRates: { common: 0.3846, uncommon: 0.3297, rare: 0.1978, epic: 0.0879 },
        abilities: [
            {
                id: 'lure',
                name: 'Lure',
                chance: 0.3,
                mpCost: 10,
                telegraph: 'pulses with an irresistible, shifting light...',
                type: 'drain_mp',
                drainAmount: 20,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌟 The ${enemyName}'s hypnotic light pulls at the $$$${playerClass}'s concentration — <b>20 MP drained!</b>`
            },
            {
                id: 'ethereal_touch',
                name: 'Ethereal Touch',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'drifts close, light flickering malevolently...',
                type: 'drain_hp',
                drainAmount: 14,
                healPercent: 1.0,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💙 The $$$${enemyName} drains vitality through its phantom touch — <b>14 HP stolen!</b>`
            },
        ]
    },

    // ── LEVEL 9 ── (Graveyard/Plains additions)
    death_cultist: {
        name: 'Death Cultist',
        baseHp: 205,
        baseDamage: 25,
        minDamage: 17,
        maxDamage: 32,
        baseDefense: 9,
        baseXp: 115,
        baseGold: 85,
        level: 9,
        description: 'A true believer who makes dying look like a hobby',
        possibleDrops: ['mana_potion', 'cursed_bone', 'gold_coins', 'medium_gem'],
        dropRates: { common: 0.3587, uncommon: 0.3261, rare: 0.1957, epic: 0.0978, legendary: 0.0217 },
        abilities: [
            {
                id: 'martyrs_curse',
                name: "Martyr's Curse",
                chance: 0.25,
                mpCost: 14,
                telegraph: 'raises both arms and chants a droning liturgy of death...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 7,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName} calls death down upon the $$$$${playerClass}! A dark curse takes hold — <b>Cursed!</b>`
            },
        ]
    },

    flesh_golem: {
        name: 'Flesh Golem',
        baseHp: 250,
        baseDamage: 24,
        minDamage: 16,
        maxDamage: 31,
        baseDefense: 14,
        baseXp: 118,
        baseGold: 55,
        level: 9,
        description: 'A stitched-together horror, unhappy about its existence',
        possibleDrops: ['health_potion', 'golem_core', 'large_gem'],
        dropRates: { common: 0.351, uncommon: 0.2979, rare: 0.2128, epic: 0.1064, legendary: 0.0319 },
        abilities: [
            {
                id: 'golem_slam',
                name: 'Slam',
                chance: 0.3,
                mpCost: 16,
                hpThreshold: 0.55,
                telegraph: 'lifts both arms overhead and groans with mechanical dread...',
                type: 'heavy_hit',
                damageMult: 1.9,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💢 The $$$${enemyName} SLAMS down with both fists! The force is immense!`
            },
            {
                id: 'seam_burst',
                name: 'Seam Burst',
                chance: 0.2,
                mpCost: 12,
                lowHpThreshold: 0.45,
                telegraph: 'the stitching across its torso tears and oozes...',
                type: 'rend',
                defReduction: 0.25,
                rendDuration: 8000,
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The ${enemyName}'s burst seams spray the $$$${playerClass}! <span style='color:#ffaa44;'>⚠️ Defense reduced for 8 seconds!</span>`
            },
        ]
    },

    specter: {
        name: 'Specter',
        baseHp: 190,
        baseDamage: 27,
        minDamage: 18,
        maxDamage: 35,
        baseDefense: 6,
        baseXp: 112,
        baseGold: 65,
        level: 9,
        description: 'A ghost so ancient it barely remembers what it was angry about',
        possibleDrops: ['mana_potion', 'soul_essence', 'large_gem'],
        dropRates: { common: 0.3846, uncommon: 0.3077, rare: 0.1978, epic: 0.0879, legendary: 0.022 },
        abilities: [
            {
                id: 'soul_chill',
                name: 'Soul Chill',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'reaches forward with translucent hands that pulse with cold light...',
                type: 'drain_hp',
                drainAmount: 16,
                healPercent: 0.8,
                damageMult: 0,
                armorPiercing: 0.4,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName} reaches through the $$$${playerClass}! Soul-cold drains the will to fight — <b>16 HP stolen!</b>`
            },
            {
                id: 'terrifying_presence',
                name: 'Terrifying Presence',
                chance: 0.2,
                mpCost: 10,
                telegraph: 'floats closer, all features fading into featureless dread...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 5000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `😱 The ${enemyName}'s presence freezes the $$$${playerClass}'s blood — <span style='color:#ffaa44;'>⚠️ -25% damage for 5 seconds.</span>`
            },
        ]
    },

    gnoll_chief: {
        name: 'Gnoll Chieftain',
        baseHp: 240,
        baseDamage: 26,
        minDamage: 18,
        maxDamage: 33,
        baseDefense: 11,
        baseXp: 120,
        baseGold: 90,
        level: 9,
        description: 'The biggest, meanest hyena-man in the pack',
        possibleDrops: ['health_potion', 'warhammer', 'medium_gem'],
        dropRates: { common: 0.3368, uncommon: 0.3158, rare: 0.2105, epic: 0.1053, legendary: 0.0316 },
        abilities: [
            {
                id: 'warchant',
                name: 'Warchant',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'beats its chest and unleashes a barking war-cry...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 6000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐾 The ${enemyName} rallies the pack with a savage Warchant! The $$$${playerClass} is unnerved — <span style='color:#ffaa44;'>⚠️ -25% damage for 6 seconds.</span>`
            },
        ]
    },

    vampire_thrall: {
        name: 'Vampire Thrall',
        baseHp: 215,
        baseDamage: 23,
        minDamage: 16,
        maxDamage: 29,
        baseDefense: 8,
        baseXp: 110,
        baseGold: 70,
        level: 9,
        description: 'A human servant of a vampire, dangerously devoted',
        possibleDrops: ['health_potion', 'blood_vial', 'medium_gem'],
        dropRates: { common: 0.4222, uncommon: 0.3111, rare: 0.1778, epic: 0.0778, legendary: 0.0111 },
        abilities: [
            {
                id: 'blood_drain',
                name: 'Blood Drain',
                chance: 0.3,
                mpCost: 14,
                telegraph: 'lunges and bites, eyes rolling back in devotional ecstasy...',
                type: 'leech',
                drainAmount: 14,
                healRatio: 0.7,
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The $$$${enemyName} bites and drinks! Blood feeds the thrall — <b>HP stolen!</b>`
            },
        ]
    },

    // ── LEVEL 10 ── (Swamp additions)
    venomous_hydra: {
        name: 'Venomous Hydra',
        baseHp: 310,
        baseDamage: 30,
        minDamage: 21,
        maxDamage: 39,
        baseDefense: 12,
        baseXp: 165,
        baseGold: 90,
        level: 10,
        description: 'Three heads means three chances to hate you at once',
        possibleDrops: ['greater_health_potion', 'hydra_scale', 'large_gem'],
        dropRates: { common: 0.2887, uncommon: 0.2887, rare: 0.2268, epic: 0.1443, legendary: 0.0515 },
        abilities: [
            {
                id: 'triple_bite',
                name: 'Triple Bite',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'all three heads dart forward simultaneously...',
                type: 'dot_attack',
                dot: {
                    name: 'Bleeding',
                    icon: '🩸',
                    damage: 7,
                    tickInterval: 3000,
                    ticks: 3,
                },
                damageMult: 1.5,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐉 All three heads of the ${enemyName} strike at once! The $$$${playerClass} is <b>Bleeding!</b>`
            },
            {
                id: 'hydra_regen',
                name: 'Hydra Regeneration',
                chance: 0.35,
                mpCost: 14,
                lowHpThreshold: 0.5,
                telegraph: 'the stumps of its necks begin to bubble and pulse...',
                type: 'leech',
                healRatio: 0.7,
                damageMult: 0.6,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🟢 The $$$${enemyName} regenerates as it feeds! Its wounds close before your eyes.`
            },
        ]
    },

    bog_shambler: {
        name: 'Bog Shambler',
        baseHp: 290,
        baseDamage: 27,
        minDamage: 18,
        maxDamage: 35,
        baseDefense: 13,
        baseXp: 155,
        baseGold: 72,
        level: 10,
        description: 'Half mud, half moss, entirely hostile',
        possibleDrops: ['health_potion', 'swamp_heart', 'large_gem'],
        dropRates: { common: 0.3723, uncommon: 0.2766, rare: 0.2128, epic: 0.1064, legendary: 0.0319 },
        abilities: [
            {
                id: 'bog_slam',
                name: 'Bog Slam',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'raises a limb dripping with stagnant bog-water...',
                type: 'heavy_hit',
                damageMult: 1.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💥 The ${enemyName} SLAMS! Mud and force knock the $$$${playerClass} off their feet!`
            },
            {
                id: 'mire',
                name: 'Mire',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'splashes murky water across the ground at your feet...',
                type: 'debuff',
                debuff: 'constricted',
                dodgePenalty: 1.0,
                debuffDuration: 4000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🟫 The ${enemyName} mires the $$$${playerClass} in thick bog-mud! <b>Cannot dodge!</b>`
            },
        ]
    },

    rotting_knight: {
        name: 'Rotting Knight',
        baseHp: 275,
        baseDamage: 28,
        minDamage: 19,
        maxDamage: 36,
        baseDefense: 18,
        baseXp: 160,
        baseGold: 80,
        level: 10,
        description: 'Fully armored and mostly decomposed',
        possibleDrops: ['health_potion', 'ancient_sword', 'large_gem'],
        dropRates: { common: 0.3158, uncommon: 0.2842, rare: 0.2316, epic: 0.1263, legendary: 0.0421 },
        abilities: [
            {
                id: 'unholy_swing',
                name: 'Unholy Swing',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'its decayed arm swings in a wide, crushing arc...',
                type: 'dot_attack',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 7,
                    tickInterval: 3500,
                    ticks: 3,
                },
                damageMult: 1.2,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName}'s cursed blade strikes! Dark residue clings to the $$$${playerClass}'s wounds — <b>Cursed!</b>`
            },
        ]
    },

    poison_drake: {
        name: 'Poison Drake',
        baseHp: 285,
        baseDamage: 31,
        minDamage: 21,
        maxDamage: 40,
        baseDefense: 10,
        baseXp: 168,
        baseGold: 85,
        level: 10,
        description: 'A winged reptile that spits venom instead of fire',
        possibleDrops: ['greater_health_potion', 'drake_scale', 'snake_venom', 'large_gem'],
        dropRates: { common: 0.2887, uncommon: 0.2784, rare: 0.2371, epic: 0.1443, legendary: 0.0515 },
        abilities: [
            {
                id: 'venom_spit',
                name: 'Venom Spit',
                chance: 0.35,
                mpCost: 14,
                telegraph: 'rears back and hacks up a mouthful of black bile...',
                type: 'burn',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 9,
                    tickInterval: 3000,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💚 The ${enemyName} spits a stream of venom! The $$$${playerClass} is drenched — <b>Poisoned!</b>`
            },
        ]
    },

    swamp_witch: {
        name: 'Swamp Witch',
        baseHp: 260,
        baseDamage: 33,
        minDamage: 23,
        maxDamage: 42,
        baseDefense: 9,
        baseXp: 170,
        baseGold: 100,
        level: 10,
        description: 'Cackles while hurling hexes. Not in the fun way',
        possibleDrops: ['greater_mana_potion', 'witch_brew', 'cursed_amulet', 'large_gem'],
        dropRates: { common: 0.2526, uncommon: 0.303, rare: 0.2424, epic: 0.1414, legendary: 0.0606 },
        abilities: [
            {
                id: 'swamp_hex',
                name: 'Swamp Hex',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'traces a drowned-man rune in the air with one finger...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🧿 The ${enemyName} hexes the $$$${playerClass}! A miasma blinds their sight — <span style='color:#ffaa44;'>⚠️ 35% miss chance.</span>`
            },
            {
                id: 'swamp_wither',
                name: 'Withering Curse',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'stirs a black cauldron and speaks to the water...',
                type: 'burn',
                dot: {
                    name: 'Withering',
                    icon: '🌑',
                    damage: 6,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName}'s curse saps the $$$${playerClass}'s vitality — <b>Withering!</b>`
            },
        ]
    },

    // ── LEVEL 11 ── (Cave/Swamp additions)
    cave_basilisk: {
        name: 'Cave Basilisk',
        baseHp: 340,
        baseDamage: 30,
        minDamage: 21,
        maxDamage: 39,
        baseDefense: 16,
        baseXp: 188,
        baseGold: 92,
        level: 11,
        description: 'Avoid eye contact. Seriously. Eyes closed. Trust me',
        possibleDrops: ['greater_health_potion', 'basilisk_eye', 'stone_armor', 'large_gem'],
        dropRates: { common: 0.2916, uncommon: 0.2813, rare: 0.2292, epic: 0.1458, legendary: 0.0521 },
        abilities: [
            {
                id: 'petrifying_gaze',
                name: 'Petrifying Gaze',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'fixes you with a terrible, unblinking stare...',
                type: 'stun',
                stunPips: 2,
                stunDuration: 5,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐍 The ${enemyName}'s gaze locks the $$$${playerClass} in place! Stone begins to creep across the skin — <b>2 attack charges lost!</b>`
            },
            {
                id: 'tail_lash',
                name: 'Tail Lash',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'coils its tail and whips it with tremendous force...',
                type: 'debuff',
                debuff: 'constricted',
                dodgePenalty: 1.0,
                debuffDuration: 5000,
                damageMult: 1.4,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐉 The ${enemyName}'s tail lash knocks the $$$${playerClass} prone! <b>Cannot dodge!</b>`
            },
        ]
    },

    iron_golem: {
        name: 'Iron Golem',
        baseHp: 420,
        baseDamage: 27,
        minDamage: 18,
        maxDamage: 35,
        baseDefense: 28,
        baseXp: 195,
        baseGold: 85,
        level: 11,
        description: 'Slow, relentless, not interested in your excuses',
        possibleDrops: ['greater_health_potion', 'golem_core', 'iron_ingot', 'large_gem'],
        dropRates: { common: 0.3125, uncommon: 0.2604, rare: 0.2292, epic: 0.1458, legendary: 0.0521 },
        abilities: [
            {
                id: 'iron_fist',
                name: 'Iron Fist',
                chance: 0.25,
                mpCost: 16,
                hpThreshold: 0.6,
                telegraph: 'draws back one massive iron arm in a slow, grinding motion...',
                type: 'heavy_hit',
                damageMult: 2.0,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `⚙️ The $$$${enemyName}'s iron fist CONNECTS — the impact would crack stone!`
            },
            {
                id: 'ward_pulse',
                name: 'Ward Pulse',
                chance: 0.2,
                mpCost: 14,
                telegraph: 'runes engraved on its chest flare with stored energy...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 4,
                damageMult: 0.5,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `⚡ The ${enemyName} discharges ward energy! The $$$${playerClass} is staggered — attack charge lost!`
            },
        ]
    },

    lich_thrall: {
        name: "Lich's Thrall",
        baseHp: 305,
        baseDamage: 29,
        minDamage: 20,
        maxDamage: 37,
        baseDefense: 11,
        baseXp: 180,
        baseGold: 78,
        level: 11,
        description: 'A loyal undead servant that shares its master\'s ruthlessness',
        possibleDrops: ['health_potion', 'bone_dust', 'cursed_bone', 'large_gem'],
        dropRates: { common: 0.3369, uncommon: 0.2842, rare: 0.2105, epic: 0.1263, legendary: 0.0421 },
        abilities: [
            {
                id: 'necrotic_touch',
                name: 'Necrotic Touch',
                chance: 0.3,
                mpCost: 14,
                telegraph: 'reaches out with hands that reek of the grave...',
                type: 'dot_attack',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 7,
                    tickInterval: 3500,
                    ticks: 3,
                },
                damageMult: 1.0,
                armorPiercing: 0.15,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName}'s necrotic touch rots the $$$${playerClass}'s flesh — <b>Cursed!</b>`
            },
        ]
    },

    banshee_queen: {
        name: 'Banshee Queen',
        baseHp: 360,
        baseDamage: 34,
        minDamage: 23,
        maxDamage: 44,
        baseDefense: 9,
        baseXp: 202,
        baseGold: 110,
        level: 11,
        description: 'An upgrade. The scream cracks stone walls',
        possibleDrops: ['greater_mana_potion', 'ectoplasm', 'soul_essence', 'large_gem'],
        dropRates: { common: 0.2526, uncommon: 0.303, rare: 0.2424, epic: 0.1414, legendary: 0.0606 },
        abilities: [
            {
                id: 'shriek',
                name: 'Shriek',
                chance: 0.3,
                mpCost: 20,
                telegraph: 'draws in a vast breath, her face splitting into a scream...',
                type: 'stun',
                stunPips: 2,
                stunDuration: 5,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The ${enemyName} SHRIEKS! The soul-rending sound stuns the $$$${playerClass} solid — <b>2 attack charges lost!</b>`
            },
            {
                id: 'queen_drain',
                name: 'Soul Drain',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'reaches through the air with spectral fingers...',
                type: 'drain_hp',
                drainAmount: 20,
                healPercent: 1.0,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName} drinks the $$$${playerClass}'s soul! <b>20 HP drained!</b>`
            },
        ]
    },

    werewolf: {
        name: 'Werewolf',
        baseHp: 380,
        baseDamage: 36,
        minDamage: 25,
        maxDamage: 46,
        baseDefense: 12,
        baseXp: 210,
        baseGold: 115,
        level: 11,
        description: 'Once a normal person. Definitely not anymore',
        possibleDrops: ['greater_health_potion', 'wolf_pelt', 'silver_fang', 'large_gem'],
        dropRates: { common: 0.2857, uncommon: 0.2857, rare: 0.2245, epic: 0.1429, legendary: 0.0612 },
        abilities: [
            {
                id: 'savage_rend',
                name: 'Savage Rend',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'bares yellowed fangs and lunges with terrifying speed...',
                type: 'dot_attack',
                dot: {
                    name: 'Bleeding',
                    icon: '🩸',
                    damage: 8,
                    tickInterval: 3000,
                    ticks: 3,
                },
                damageMult: 1.3,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🩸 The ${enemyName} RENDS the $$$${playerClass} with fang and claw! <b>Bleeding!</b>`
            },
            {
                id: 'wolf_howl',
                name: 'Howl',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'tilts its muzzle upward and howls at nothing...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 6000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐺 The ${enemyName} howls! Something primal in the $$$${playerClass} recoils — <span style='color:#ffaa44;'>⚠️ -25% damage for 6 seconds.</span>`
            },
        ]
    },

    // ── LEVEL 12 ── (Swamp/Cave additions)
    medusa: {
        name: 'Medusa',
        baseHp: 380,
        baseDamage: 35,
        minDamage: 24,
        maxDamage: 45,
        baseDefense: 13,
        baseXp: 228,
        baseGold: 135,
        level: 12,
        description: 'Snake-haired and furious about it',
        possibleDrops: ['greater_mana_potion', 'basilisk_eye', 'snake_skin', 'large_gem'],
        dropRates: { common: 0.2526, uncommon: 0.303, rare: 0.2424, epic: 0.1414, legendary: 0.0606 },
        abilities: [
            {
                id: 'stone_gaze',
                name: 'Stone Gaze',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'her serpent hair stills, and she fixes you with her eyes...',
                type: 'stun',
                stunPips: 2,
                stunDuration: 5,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🐍 The ${enemyName}'s gaze petrifies! Marble spreads across the $$$${playerClass}'s skin — <b>2 attack charges lost!</b>`
            },
            {
                id: 'serpent_bite',
                name: 'Serpent Bite',
                chance: 0.3,
                mpCost: 14,
                telegraph: 'one of the snakes in her hair darts forward...',
                type: 'dot_attack',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 8,
                    tickInterval: 3000,
                    ticks: 4,
                },
                damageMult: 0.7,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💚 A snake from the $$$${enemyName}'s hair bites deep! <b>Poisoned!</b>`
            },
        ]
    },

    chaos_imp: {
        name: 'Chaos Imp',
        baseHp: 310,
        baseDamage: 38,
        minDamage: 26,
        maxDamage: 49,
        baseDefense: 8,
        baseXp: 218,
        baseGold: 125,
        level: 12,
        description: 'Random spells, random target. You may not be the target. May',
        possibleDrops: ['mana_potion', 'imp_dust', 'chaos_essence', 'large_gem'],
        dropRates: { common: 0.2857, uncommon: 0.2857, rare: 0.2245, epic: 0.1429, legendary: 0.0612 },
        abilities: [
            {
                id: 'chaos_bolt',
                name: 'Chaos Bolt',
                chance: 0.3,
                mpCost: 14,
                telegraph: 'cackles and flings a crackling orb with no apparent target...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 8,
                    tickInterval: 3000,
                    ticks: 3,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName}'s chaotic bolt detonates on the $$$${playerClass}! Raw dark energy burns — <b>Cursed!</b>`
            },
            {
                id: 'chaos_drain',
                name: 'Chaos Drain',
                chance: 0.25,
                mpCost: 0,
                telegraph: 'reaches toward you and giggles unpleasantly...',
                type: 'drain_mp',
                drainAmount: 22,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔮 The ${enemyName} randomly siphons the $$$${playerClass}'s power — <b>22 MP drained!</b>`
            },
        ]
    },

    cave_worm: {
        name: 'Cave Worm',
        baseHp: 420,
        baseDamage: 30,
        minDamage: 21,
        maxDamage: 39,
        baseDefense: 17,
        baseXp: 222,
        baseGold: 108,
        level: 12,
        description: 'Forty feet of teeth, no eyes, extremely fast',
        possibleDrops: ['greater_health_potion', 'worm_hide', 'large_gem'],
        dropRates: { common: 0.3125, uncommon: 0.2708, rare: 0.2292, epic: 0.1354, legendary: 0.0521 },
        abilities: [
            {
                id: 'swallow',
                name: 'Swallow',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'gapes open its enormous segmented maw...',
                type: 'debuff',
                debuff: 'constricted',
                dodgePenalty: 1.0,
                debuffDuration: 6000,
                damageMult: 1.5,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `😱 The ${enemyName} attempts to SWALLOW the $$$${playerClass}! Caught in the crushing gullet — <b>Cannot dodge!</b>`
            },
            {
                id: 'acid_digest',
                name: 'Acid Digest',
                chance: 0.2,
                mpCost: 14,
                telegraph: 'a terrible gurgling emanates from deep within its body...',
                type: 'burn',
                dot: {
                    name: 'Corroding',
                    icon: '🟤',
                    damage: 7,
                    tickInterval: 2500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🟤 The ${enemyName}'s digestive acid sprays out! The $$$${playerClass} is <b>Corroding!</b>`
            },
        ]
    },

    dark_ranger: {
        name: 'Dark Ranger',
        baseHp: 340,
        baseDamage: 36,
        minDamage: 25,
        maxDamage: 46,
        baseDefense: 12,
        baseXp: 225,
        baseGold: 130,
        level: 12,
        description: 'A veteran scout who switched sides for better pay',
        possibleDrops: ['greater_health_potion', 'longbow', 'dark_essence', 'large_gem'],
        dropRates: { common: 0.2755, uncommon: 0.3061, rare: 0.2347, epic: 0.1327, legendary: 0.051 },
        abilities: [
            {
                id: 'crippling_shot',
                name: 'Crippling Arrow',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'draws and aims in a single practiced motion...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0.8,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🏹 The ${enemyName} shoots for the eyes! The $$$${playerClass} is blinded — <span style='color:#ffaa44;'>⚠️ 35% miss chance.</span>`
            },
            {
                id: 'poison_arrow',
                name: 'Poisoned Arrow',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'reaches into a dark quiver with a grin...',
                type: 'dot_attack',
                dot: {
                    name: 'Poisoned',
                    icon: '💚',
                    damage: 8,
                    tickInterval: 3000,
                    ticks: 4,
                },
                damageMult: 0.9,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💚 The $$$${enemyName}'s black-tipped arrow finds the mark — <b>Poisoned!</b>`
            },
        ]
    },

    animated_armor: {
        name: 'Animated Armor',
        baseHp: 400,
        baseDamage: 29,
        minDamage: 20,
        maxDamage: 37,
        baseDefense: 24,
        baseXp: 215,
        baseGold: 100,
        level: 12,
        description: 'Empty inside. Very full of sword swings',
        possibleDrops: ['greater_health_potion', 'ancient_armor', 'large_gem'],
        dropRates: { common: 0.3158, uncommon: 0.2842, rare: 0.2316, epic: 0.1263, legendary: 0.0421 },
        abilities: [
            {
                id: 'clanging_strike',
                name: 'Clanging Strike',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'crashes gauntlet against breastplate in a deafening clang...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 4,
                damageMult: 1.2,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `⚙️ The ${enemyName} clashes with ear-splitting force! The $$$${playerClass} is stunned — attack charge lost!`
            },
            {
                id: 'armor_crush',
                name: 'Armor Crush',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'swings in a wide arc, aiming directly at your protection...',
                type: 'rend',
                defReduction: 0.25,
                rendDuration: 9000,
                damageMult: 1.3,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💥 The ${enemyName} crushes the $$$${playerClass}'s armor! <span style='color:#ffaa44;'>⚠️ Defense reduced for 9 seconds.</span>`
            },
        ]
    },

    // ── LEVEL 13 ── (Ruins additions)
    demon_hound: {
        name: 'Demon Hound',
        baseHp: 400,
        baseDamage: 33,
        minDamage: 23,
        maxDamage: 42,
        baseDefense: 14,
        baseXp: 248,
        baseGold: 128,
        level: 13,
        description: 'Fire-breath, shadow-step, zero patience',
        possibleDrops: ['greater_health_potion', 'hellfire_fang', 'large_gem'],
        dropRates: { common: 0.2755, uncommon: 0.2857, rare: 0.2347, epic: 0.1429, legendary: 0.0612 },
        abilities: [
            {
                id: 'hellfire_breath',
                name: 'Hellfire Breath',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'opens its jaws and an orange glow builds in its throat...',
                type: 'burn',
                dot: {
                    name: 'Burning',
                    icon: '🔥',
                    damage: 9,
                    tickInterval: 2000,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔥 The ${enemyName} breathes hellfire! The $$$${playerClass} is set ablaze — <b>Burning!</b>`
            },
            {
                id: 'shadow_step',
                name: 'Shadow Step',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'vanishes into a shadow and reappears behind you...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 4000,
                hitMissChance: 0.35,
                damageMult: 1.4,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} teleports through shadow! The $$$${playerClass} loses track — <span style='color:#ffaa44;'>⚠️ 35% miss chance.</span>`
            },
        ]
    },

    chaos_knight: {
        name: 'Chaos Knight',
        baseHp: 460,
        baseDamage: 38,
        minDamage: 26,
        maxDamage: 49,
        baseDefense: 20,
        baseXp: 265,
        baseGold: 145,
        level: 13,
        description: 'A mercenary who pledged himself to entropy and thriving',
        possibleDrops: ['greater_health_potion', 'cursed_blade', 'chaos_armor', 'large_gem'],
        dropRates: { common: 0.25, uncommon: 0.28, rare: 0.25, epic: 0.15, legendary: 0.07 },
        abilities: [
            {
                id: 'chaos_rend',
                name: 'Chaos Rend',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'the blade glows with unstable, shifting energy...',
                type: 'dot_attack',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 8,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 1.3,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName}'s chaotic blade tears through the $$$${playerClass}! Chaos energy corrupts the wound — <b>Cursed!</b>`
            },
            {
                id: 'chaos_charge',
                name: 'Chaos Charge',
                chance: 0.25,
                mpCost: 16,
                hpThreshold: 0.6,
                telegraph: 'lowers its lance and screams a battle-prayer to entropy...',
                type: 'heavy_hit',
                damageMult: 2.0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `⚡ The $$$${enemyName} CHARGES! Raw chaos energy amplifies the blow!`
            },
        ]
    },

    runic_guardian: {
        name: 'Runic Guardian',
        baseHp: 500,
        baseDamage: 32,
        minDamage: 22,
        maxDamage: 41,
        baseDefense: 26,
        baseXp: 258,
        baseGold: 130,
        level: 13,
        description: 'Built from the runes of an ancient fallen city',
        possibleDrops: ['greater_health_potion', 'guardian_core', 'rune_shard', 'large_gem'],
        dropRates: { common: 0.2755, uncommon: 0.2755, rare: 0.2449, epic: 0.1429, legendary: 0.0612 },
        abilities: [
            {
                id: 'rune_blast',
                name: 'Rune Blast',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'the runes on its frame pulse once, bright white...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 5,
                damageMult: 1.0,
                armorPiercing: 0.15,
                applyMessage: (enemyName, playerClass) => `⚡ The ${enemyName} discharges carved rune-energy! The $$$${playerClass} is blasted back — attack charge lost!`
            },
            {
                id: 'stone_grip',
                name: 'Stone Grip',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'extends a hand and the ground around you begins to shift...',
                type: 'debuff',
                debuff: 'constricted',
                dodgePenalty: 1.0,
                debuffDuration: 5000,
                damageMult: 1.2,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🪨 The ${enemyName} seizes the $$$${playerClass} in a stone grip! <b>Cannot dodge!</b>`
            },
        ]
    },

    phantom_mage: {
        name: 'Phantom Mage',
        baseHp: 375,
        baseDamage: 40,
        minDamage: 28,
        maxDamage: 52,
        baseDefense: 10,
        baseXp: 270,
        baseGold: 150,
        level: 13,
        description: 'Spellcaster who learned invisibility before etiquette',
        possibleDrops: ['greater_mana_potion', 'arcane_dust', 'enchanted_robes', 'large_gem'],
        dropRates: { common: 0.23, uncommon: 0.3, rare: 0.25, epic: 0.15, legendary: 0.07 },
        abilities: [
            {
                id: 'phantom_bolt',
                name: 'Phantom Bolt',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'a crackling bolt of ghostly energy forms at its fingertips...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 9,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0.3,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName}'s phantom bolt sears through the $$$${playerClass}'s defenses — <b>Cursed!</b>`
            },
            {
                id: 'arcane_drain',
                name: 'Arcane Drain',
                chance: 0.25,
                mpCost: 0,
                telegraph: 'makes a gesture that seems to pull something invisible from you...',
                type: 'drain_mp',
                drainAmount: 28,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔮 The ${enemyName} strips raw mana from the $$$${playerClass}! <b>28 MP drained!</b>`
            },
        ]
    },

    gargoyle: {
        name: 'Gargoyle',
        baseHp: 440,
        baseDamage: 34,
        minDamage: 23,
        maxDamage: 44,
        baseDefense: 22,
        baseXp: 255,
        baseGold: 118,
        level: 13,
        description: 'Was once a decoration. Developed ambitions',
        possibleDrops: ['greater_health_potion', 'stone_armor', 'large_gem'],
        dropRates: { common: 0.3125, uncommon: 0.2708, rare: 0.2292, epic: 0.1354, legendary: 0.0521 },
        abilities: [
            {
                id: 'stone_dive',
                name: 'Stone Dive',
                chance: 0.3,
                mpCost: 16,
                hpThreshold: 0.55,
                telegraph: 'ascends to the ceiling and folds its wings...',
                type: 'heavy_hit',
                damageMult: 1.9,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `🪨 The ${enemyName} DIVES from above! Stone-hard wings and claws crush the $$$${playerClass}!`
            },
            {
                id: 'gargoyle_screech',
                name: 'Screech',
                chance: 0.2,
                mpCost: 10,
                telegraph: 'opens a maw of carved stone and emits an awful grinding cry...',
                type: 'stun',
                stunPips: 1,
                stunDuration: 4,
                damageMult: 0.3,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `😱 The ${enemyName}'s stone-scraping screech shocks the $$$${playerClass}! Attack charge lost!`
            },
        ]
    },

    // ── LEVEL 14 ── (Ruins additions)
    necromancer: {
        name: 'Necromancer',
        baseHp: 440,
        baseDamage: 42,
        minDamage: 29,
        maxDamage: 54,
        baseDefense: 12,
        baseXp: 292,
        baseGold: 170,
        level: 14,
        description: 'Has strong opinions about the definition of "alive"',
        possibleDrops: ['greater_mana_potion', 'necromantic_staff', 'cursed_bone', 'large_gem'],
        dropRates: { common: 0.2157, uncommon: 0.2941, rare: 0.2549, epic: 0.1569, legendary: 0.0784 },
        abilities: [
            {
                id: 'raise_dead',
                name: 'Raise Dead',
                chance: 0.25,
                mpCost: 20,
                telegraph: 'thrusts a staff into the earth and chants with hollow authority...',
                type: 'summon',
                summonKey: 'skeleton',
                summonCount: 1,
                maxSummons: 2,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The $$$${enemyName} raises the dead! A skeleton claws free of the earth!`
            },
            {
                id: 'life_siphon',
                name: 'Life Siphon',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'traces a complex rune in the air between you...',
                type: 'drain_hp',
                drainAmount: 22,
                healPercent: 1.0,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💙 The ${enemyName}'s siphon tears vitality from the $$$${playerClass} — <b>22 HP drained!</b>`
            },
        ]
    },

    abyssal_hound: {
        name: 'Abyssal Hound',
        baseHp: 460,
        baseDamage: 38,
        minDamage: 26,
        maxDamage: 49,
        baseDefense: 15,
        baseXp: 285,
        baseGold: 152,
        level: 14,
        description: 'Bred in a dimension that does not want you in it',
        possibleDrops: ['greater_health_potion', 'shadow_essence', 'large_gem'],
        dropRates: { common: 0.25, uncommon: 0.28, rare: 0.25, epic: 0.15, legendary: 0.07 },
        abilities: [
            {
                id: 'void_bite',
                name: 'Void Bite',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'snaps with jaws that seem to pull surrounding light into them...',
                type: 'dot_attack',
                dot: {
                    name: 'Withering',
                    icon: '🌑',
                    damage: 8,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 1.2,
                armorPiercing: 0.25,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName}'s void-laced fangs bite! The $$$${playerClass} begins to <b>Wither!</b>`
            },
            {
                id: 'void_howl',
                name: 'Void Howl',
                chance: 0.2,
                mpCost: 12,
                telegraph: 'throws back its head and unleashes a silent howl...',
                type: 'intimidate',
                damagePenalty: 0.30,
                intimidateDuration: 6000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌑 The $$$${enemyName}'s void-howl silences all courage! <span style='color:#ffaa44;'>⚠️ -30% damage for 6 seconds.</span>`
            },
        ]
    },

    dark_champion: {
        name: 'Dark Champion',
        baseHp: 520,
        baseDamage: 40,
        minDamage: 28,
        maxDamage: 52,
        baseDefense: 23,
        baseXp: 298,
        baseGold: 165,
        level: 14,
        description: 'Elite guard of a dead king, still taking the job seriously',
        possibleDrops: ['greater_health_potion', 'ancient_sword', 'ancient_armor', 'large_gem'],
        dropRates: { common: 0.2278, uncommon: 0.2772, rare: 0.2574, epic: 0.1584, legendary: 0.0792 },
        abilities: [
            {
                id: 'heroic_smash',
                name: 'Heroic Smash',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'grips its weapon in both hands and takes a winding stance...',
                type: 'rend',
                defReduction: 0.30,
                rendDuration: 9000,
                damageMult: 1.8,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `⚔️ The ${enemyName}'s devastating smash cracks the $$$${playerClass}'s guard! <span style='color:#ffaa44;'>⚠️ Defense reduced 9 seconds.</span>`
            },
            {
                id: 'champion_charge',
                name: 'Champion Charge',
                chance: 0.25,
                mpCost: 16,
                hpThreshold: 0.6,
                telegraph: 'raises its ancient banner and lowers its lance...',
                type: 'heavy_hit',
                damageMult: 2.1,
                armorPiercing: 0.15,
                applyMessage: (enemyName, playerClass) => `⚔️ The $$$${enemyName} CHARGES with the force of centuries of battle!`
            },
        ]
    },

    void_sprite: {
        name: 'Void Sprite',
        baseHp: 390,
        baseDamage: 44,
        minDamage: 30,
        maxDamage: 57,
        baseDefense: 9,
        baseXp: 302,
        baseGold: 180,
        level: 14,
        description: 'A tiny pocket of absolute nothingness that bites',
        possibleDrops: ['greater_mana_potion', 'void_crystal', 'null_essence', 'large_gem'],
        dropRates: { common: 0.2157, uncommon: 0.2941, rare: 0.2549, epic: 0.1569, legendary: 0.0784 },
        abilities: [
            {
                id: 'void_sting',
                name: 'Void Sting',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'darts forward, trailing threads of absolute nothingness...',
                type: 'drain_mp',
                drainAmount: 25,
                damageMult: 0.7,
                armorPiercing: 0.4,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} stings! The $$$${playerClass}'s mana bleeds into the void — <b>25 MP drained!</b>`
            },
            {
                id: 'unravel',
                name: 'Unravel',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'spins in a tight circle, reality warping around it...',
                type: 'burn',
                dot: {
                    name: 'Withering',
                    icon: '🌑',
                    damage: 9,
                    tickInterval: 3500,
                    ticks: 3,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} unravels the $$$${playerClass}'s cohesion! They begin to <b>Wither!</b>`
            },
        ]
    },

    magma_elemental: {
        name: 'Magma Elemental',
        baseHp: 500,
        baseDamage: 36,
        minDamage: 25,
        maxDamage: 46,
        baseDefense: 19,
        baseXp: 278,
        baseGold: 145,
        level: 14,
        description: 'Lava given a terrible purpose',
        possibleDrops: ['greater_health_potion', 'fire_core', 'magma_core', 'large_gem'],
        dropRates: { common: 0.2526, uncommon: 0.2727, rare: 0.2525, epic: 0.1515, legendary: 0.0707 },
        abilities: [
            {
                id: 'lava_splash',
                name: 'Lava Splash',
                chance: 0.3,
                mpCost: 16,
                telegraph: 'swells and erupts in a spray of molten rock...',
                type: 'burn',
                dot: {
                    name: 'Burning',
                    icon: '🔥',
                    damage: 11,
                    tickInterval: 2000,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔥 The ${enemyName} erupts with lava! The $$$${playerClass} is splashed — <b>Burning!</b>`
            },
            {
                id: 'slag_rend',
                name: 'Slag Rend',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'drives a superheated fist across your armor...',
                type: 'rend',
                defReduction: 0.30,
                rendDuration: 9000,
                damageMult: 1.2,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔥 The $$$${enemyName}'s molten strike melts through armor! <span style='color:#ffaa44;'>⚠️ Defense reduced 9 seconds.</span>`
            },
        ]
    },

    // ── LEVEL 15 ── (Ruins additions)
    elder_wraith: {
        name: 'Elder Wraith',
        baseHp: 490,
        baseDamage: 44,
        minDamage: 30,
        maxDamage: 57,
        baseDefense: 11,
        baseXp: 322,
        baseGold: 190,
        level: 15,
        description: 'Older than the ruins it haunts, angrier than ever',
        possibleDrops: ['greater_health_potion', 'soul_essence', 'shadowblade', 'huge_gem'],
        dropRates: { common: 0.1961, uncommon: 0.2745, rare: 0.2745, epic: 0.1667, legendary: 0.0882 },
        abilities: [
            {
                id: 'soul_consume',
                name: 'Soul Consume',
                chance: 0.3,
                mpCost: 20,
                telegraph: 'extends both arms and reality bends toward its hunger...',
                type: 'drain_hp',
                drainAmount: 25,
                healPercent: 1.0,
                damageMult: 0,
                armorPiercing: 0.5,
                applyMessage: (enemyName, playerClass) => `👻 The ${enemyName} CONSUMES! The $$$${playerClass}'s soul-force is ripped free — <b>25 HP drained!</b>`
            },
            {
                id: 'elder_wail',
                name: 'Elder Wail',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'opens a mouth that was never meant to make sound...',
                type: 'intimidate',
                damagePenalty: 0.30,
                intimidateDuration: 7000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The ${enemyName}'s wail has broken lesser warriors. The $$$${playerClass} struggles — <span style='color:#ffaa44;'>⚠️ -30% damage for 7 seconds.</span>`
            },
        ]
    },

    black_knight: {
        name: 'Black Knight',
        baseHp: 560,
        baseDamage: 42,
        minDamage: 29,
        maxDamage: 54,
        baseDefense: 26,
        baseXp: 318,
        baseGold: 185,
        level: 15,
        description: "Refuses to acknowledge defeat. Refuses to acknowledge anything",
        possibleDrops: ['greater_health_potion', 'cursed_blade', 'ancient_armor', 'huge_gem'],
        dropRates: { common: 0.1961, uncommon: 0.2745, rare: 0.2745, epic: 0.1667, legendary: 0.0882 },
        abilities: [
            {
                id: 'unyielding',
                name: 'Unyielding Strike',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'speaks no words — simply advances with absolute intent...',
                type: 'heavy_hit',
                damageMult: 2.0,
                armorPiercing: 0.25,
                applyMessage: (enemyName, playerClass) => `⚔️ The $$$${enemyName} strikes without hesitation! The blow is heavy and relentless!`
            },
            {
                id: 'iron_will',
                name: 'Iron Will',
                chance: 0.2,
                mpCost: 12,
                lowHpThreshold: 0.4,
                telegraph: 'absorbs a blow without reacting, then strikes back twice as hard...',
                type: 'rend',
                defReduction: 0.20,
                rendDuration: 8000,
                damageMult: 1.5,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🛡️ The ${enemyName} fights through pain and rends the $$$${playerClass}'s armor! <span style='color:#ffaa44;'>⚠️ Defense reduced 8 seconds.</span>`
            },
        ]
    },

    doom_cultist: {
        name: 'Doom Cultist',
        baseHp: 455,
        baseDamage: 45,
        minDamage: 31,
        maxDamage: 58,
        baseDefense: 12,
        baseXp: 330,
        baseGold: 200,
        level: 15,
        description: 'Enthusiastically working toward everyone\'s extinction',
        possibleDrops: ['greater_mana_potion', 'cursed_amulet', 'chaos_essence', 'huge_gem'],
        dropRates: { common: 0.1961, uncommon: 0.2745, rare: 0.2647, epic: 0.1667, legendary: 0.098 },
        abilities: [
            {
                id: 'doom_mark',
                name: 'Doom Mark',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'draws a spiraling mark in the air that burns with purple fire...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 10,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName} marks the $$$${playerClass} for doom! Dark fire consumes — <b>Cursed!</b>`
            },
            {
                id: 'doom_drain',
                name: 'Doom Drain',
                chance: 0.25,
                mpCost: 0,
                telegraph: 'chants the final syllable of an extinction prayer...',
                type: 'drain_mp',
                drainAmount: 30,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔮 The ${enemyName} unmakes the $$$${playerClass}'s power — <b>30 MP drained!</b>`
            },
        ]
    },

    ancient_golem: {
        name: 'Ancient Golem',
        baseHp: 600,
        baseDamage: 38,
        minDamage: 26,
        maxDamage: 49,
        baseDefense: 30,
        baseXp: 310,
        baseGold: 160,
        level: 15,
        description: 'The original model. No warranty remaining',
        possibleDrops: ['greater_health_potion', 'golem_core', 'stone_armor', 'huge_gem'],
        dropRates: { common: 0.2157, uncommon: 0.2745, rare: 0.2647, epic: 0.1569, legendary: 0.0882 },
        abilities: [
            {
                id: 'ancient_smash',
                name: 'Ancient Smash',
                chance: 0.25,
                mpCost: 18,
                hpThreshold: 0.55,
                telegraph: 'the original. It raises both arms as if conducting a funeral...',
                type: 'heavy_hit',
                damageMult: 2.2,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `🪨 The $$$${enemyName} smashes with the weight of forgotten ages! The ground cracks!`
            },
            {
                id: 'crumble',
                name: 'Crumble',
                chance: 0.25,
                mpCost: 14,
                lowHpThreshold: 0.4,
                telegraph: 'chunks fall from its body as it strikes with desperate ferocity...',
                type: 'rend',
                defReduction: 0.35,
                rendDuration: 10000,
                damageMult: 1.4,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💥 The ${enemyName} CRUMBLES into the $$$${playerClass}, spalling stone through armor! <span style='color:#ffaa44;'>⚠️ Defense reduced 10 seconds.</span>`
            },
        ]
    },

    revenant: {
        name: 'Revenant',
        baseHp: 510,
        baseDamage: 43,
        minDamage: 30,
        maxDamage: 55,
        baseDefense: 14,
        baseXp: 325,
        baseGold: 195,
        level: 15,
        description: 'Back from the dead with a very specific grudge',
        possibleDrops: ['greater_health_potion', 'cursed_sword', 'ghost_essence', 'huge_gem'],
        dropRates: { common: 0.204, uncommon: 0.2718, rare: 0.2718, epic: 0.165, legendary: 0.0874 },
        abilities: [
            {
                id: 'vendetta',
                name: 'Vendetta',
                chance: 0.35,
                mpCost: 20,
                lowHpThreshold: 0.45,
                telegraph: 'its wounds seem to fuel it rather than weaken it...',
                type: 'heavy_hit',
                damageMult: 2.3,
                armorPiercing: 0.25,
                applyMessage: (enemyName, playerClass) => `💀 The $$$${enemyName}'s VENDETTA burns! The wound makes it stronger — a vicious, unstoppable strike!`
            },
            {
                id: 'haunt',
                name: 'Haunt',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'stares through you with eyes that remember everything...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 9,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName} haunts the $$$${playerClass}'s mind! A revenge-curse takes hold — <b>Cursed!</b>`
            },
        ]
    },

    // ── LEVEL 16 ── (Cave/Crypt additions)
    shadow_dragon: {
        name: 'Shadow Dragon',
        baseHp: 580,
        baseDamage: 48,
        minDamage: 33,
        maxDamage: 62,
        baseDefense: 28,
        baseXp: 358,
        baseGold: 270,
        level: 16,
        description: 'Breathes darkness instead of fire. Worse, somehow',
        possibleDrops: ['superior_health_potion', 'dragon_scale', 'shadow_essence', 'huge_gem'],
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.27, epic: 0.18, legendary: 0.1, mythic: 0.02 },
        abilities: [
            {
                id: 'shadow_breath',
                name: 'Shadow Breath',
                chance: 0.3,
                mpCost: 20,
                telegraph: 'inhales deeply, darkness visibly pooling in its throat...',
                type: 'burn',
                dot: {
                    name: 'Withering',
                    icon: '🌑',
                    damage: 11,
                    tickInterval: 3000,
                    ticks: 5,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🌑 The ${enemyName} breathes darkness! The $$$${playerClass} is consumed by shadow — <b>Withering!</b>`
            },
            {
                id: 'dark_rend',
                name: 'Dark Rend',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'rakes with talons that seem made of solid shadow...',
                type: 'rend',
                defReduction: 0.35,
                rendDuration: 10000,
                damageMult: 1.6,
                armorPiercing: 0.3,
                applyMessage: (enemyName, playerClass) => `🌑 The $$$${enemyName}'s shadow-talons shred through armor! <span style='color:#ffaa44;'>⚠️ Defense reduced 10 seconds.</span>`
            },
        ]
    },

    bone_colossus: {
        name: 'Bone Colossus',
        baseHp: 680,
        baseDamage: 44,
        minDamage: 30,
        maxDamage: 57,
        baseDefense: 32,
        baseXp: 365,
        baseGold: 255,
        level: 16,
        description: 'The skeleton of something that should not have existed',
        possibleDrops: ['superior_health_potion', 'dragon_bone', 'bone_dust', 'huge_gem'],
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.27, epic: 0.18, legendary: 0.1, mythic: 0.02 },
        abilities: [
            {
                id: 'bone_crush',
                name: 'Bone Crush',
                chance: 0.25,
                mpCost: 18,
                hpThreshold: 0.6,
                telegraph: 'raises one enormous skeletal arm above its head...',
                type: 'heavy_hit',
                damageMult: 2.2,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `💀 The $$$${enemyName} CRUSHES! A blow that could flatten a building!`
            },
            {
                id: 'bone_spray',
                name: 'Bone Spray',
                chance: 0.25,
                mpCost: 14,
                lowHpThreshold: 0.5,
                telegraph: 'shatters part of itself and hurls the shards outward...',
                type: 'stun',
                stunPips: 2,
                stunDuration: 5,
                damageMult: 0.6,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `💀 The ${enemyName} detonates a spray of bone fragments! The $$$${playerClass} is stunned — <b>2 attack charges lost!</b>`
            },
        ]
    },

    plague_lord: {
        name: 'Plague Lord',
        baseHp: 600,
        baseDamage: 46,
        minDamage: 32,
        maxDamage: 59,
        baseDefense: 18,
        baseXp: 372,
        baseGold: 280,
        level: 16,
        description: 'Pestilence incarnate, here for reasons unknown',
        possibleDrops: ['superior_health_potion', 'plague_sample', 'bone_dust', 'huge_gem'],
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.27, epic: 0.18, legendary: 0.1, mythic: 0.02 },
        abilities: [
            {
                id: 'pestilence',
                name: 'Pestilence',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'opens its robe to reveal a chest cavity of writhing contagion...',
                type: 'burn',
                dot: {
                    name: 'Plague',
                    icon: '☣️',
                    damage: 10,
                    tickInterval: 2500,
                    ticks: 5,
                },
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `☣️ The ${enemyName} unleashes pestilence! The $$$${playerClass} is infected beyond hope — <b>Plague!</b>`
            },
            {
                id: 'rotting_touch',
                name: 'Rotting Touch',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'presses a diseased hand to your armor...',
                type: 'rend',
                defReduction: 0.30,
                rendDuration: 10000,
                damageMult: 1.2,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `☣️ The ${enemyName}'s touch rots through the $$$${playerClass}'s armor! <span style='color:#ffaa44;'>⚠️ Defense reduced 10 seconds.</span>`
            },
        ]
    },

    demon_warrior: {
        name: 'Demon Warrior',
        baseHp: 640,
        baseDamage: 50,
        minDamage: 35,
        maxDamage: 65,
        baseDefense: 24,
        baseXp: 380,
        baseGold: 290,
        level: 16,
        description: 'Forged in hellfire, deployed with enthusiasm',
        possibleDrops: ['superior_health_potion', 'demon_horn', 'hellforged_blade', 'huge_gem'],
        dropRates: { common: 0.17, uncommon: 0.25, rare: 0.27, epic: 0.19, legendary: 0.1, mythic: 0.02 },
        abilities: [
            {
                id: 'hellblade',
                name: 'Hellblade Strike',
                chance: 0.3,
                mpCost: 18,
                telegraph: 'the blade erupts with hellfire as it pulls back for a strike...',
                type: 'dot_attack',
                dot: {
                    name: 'Burning',
                    icon: '🔥',
                    damage: 10,
                    tickInterval: 2000,
                    ticks: 4,
                },
                damageMult: 1.4,
                armorPiercing: 0.2,
                applyMessage: (enemyName, playerClass) => `🔥 The ${enemyName}'s hellblade carves burning runes into the $$$${playerClass}! <b>Burning!</b>`
            },
            {
                id: 'demon_roar',
                name: 'Demon Roar',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'opens its maw and bellows with the full force of the infernal planes...',
                type: 'intimidate',
                damagePenalty: 0.30,
                intimidateDuration: 7000,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `😱 The ${enemyName} ROARS! The $$$${playerClass} feels their courage crumble — <span style='color:#ffaa44;'>⚠️ -30% damage for 7 seconds.</span>`
            },
        ]
    },

    cursed_archon: {
        name: 'Cursed Archon',
        baseHp: 550,
        baseDamage: 52,
        minDamage: 36,
        maxDamage: 67,
        baseDefense: 20,
        baseXp: 368,
        baseGold: 275,
        level: 16,
        description: 'Once divine. Currently the opposite',
        possibleDrops: ['superior_mana_potion', 'corrupted_halo', 'angel_wing', 'huge_gem'],
        dropRates: { common: 0.17, uncommon: 0.25, rare: 0.27, epic: 0.19, legendary: 0.1, mythic: 0.02 },
        abilities: [
            {
                id: 'divine_curse',
                name: 'Divine Curse',
                chance: 0.3,
                mpCost: 20,
                telegraph: 'raises arms that once channeled heavenly light — now utter darkness...',
                type: 'burn',
                dot: {
                    name: 'Cursed',
                    icon: '💜',
                    damage: 11,
                    tickInterval: 3500,
                    ticks: 4,
                },
                damageMult: 0,
                armorPiercing: 0.3,
                applyMessage: (enemyName, playerClass) => `💜 The ${enemyName} inverts a divine blessing! The $$$${playerClass} is cursed with fallen-angel fury — <b>Cursed!</b>`
            },
            {
                id: 'archon_smite',
                name: 'Archon Smite',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'a halo of inverted light crackles above its head...',
                type: 'heavy_hit',
                damageMult: 2.1,
                armorPiercing: 0.3,
                applyMessage: (enemyName, playerClass) => `⚡ The $$$${enemyName} SMITES! Once holy energy now burns with corruption!`
            },
            {
                id: 'heavenly_drain',
                name: 'Heavenly Drain',
                chance: 0.2,
                mpCost: 0,
                telegraph: 'traces a sigil that glows with sickly inverted gold...',
                type: 'drain_mp',
                drainAmount: 32,
                damageMult: 0,
                armorPiercing: 0,
                applyMessage: (enemyName, playerClass) => `🔮 The ${enemyName} turns divine siphoning on the $$$${playerClass}! <b>32 MP drained!</b>`
            },
        ]
    },

    // ── LEVEL 17 ── (Crypt/Demon Portal additions)
    undead_general: {
        name: 'Undead General',
        baseHp: 690,
        baseDamage: 52,
        minDamage: 36,
        maxDamage: 67,
        baseDefense: 28,
        baseXp: 402,
        baseGold: 295,
        level: 17,
        description: 'Still commanding an army of one, mostly himself',
        possibleDrops: ['superior_health_potion', 'ancient_sword', 'crypt_armor', 'huge_gem'],
        dropRates: { common: 0.16, uncommon: 0.24, rare: 0.28, epic: 0.2, legendary: 0.1, mythic: 0.02 }
    },

    doom_knight: {
        name: 'Doom Knight',
        baseHp: 730,
        baseDamage: 55,
        minDamage: 38,
        maxDamage: 71,
        baseDefense: 30,
        baseXp: 415,
        baseGold: 308,
        level: 17,
        description: 'The upgrade to death knight. Nobody asked for this',
        possibleDrops: ['superior_health_potion', 'cursed_blade', 'demon_leather', 'huge_gem'],
        dropRates: { common: 0.15, uncommon: 0.24, rare: 0.28, epic: 0.2, legendary: 0.11, mythic: 0.02 }
    },

    infernal_mage: {
        name: 'Infernal Mage',
        baseHp: 610,
        baseDamage: 58,
        minDamage: 40,
        maxDamage: 75,
        baseDefense: 16,
        baseXp: 420,
        baseGold: 320,
        level: 17,
        description: 'Studied in hell. Graduated with honors in mass destruction',
        possibleDrops: ['superior_mana_potion', 'archmage_staff', 'enchanted_robes', 'huge_gem'],
        dropRates: { common: 0.15, uncommon: 0.24, rare: 0.27, epic: 0.2, legendary: 0.11, mythic: 0.03 }
    },

    blood_elemental: {
        name: 'Blood Elemental',
        baseHp: 660,
        baseDamage: 54,
        minDamage: 37,
        maxDamage: 70,
        baseDefense: 20,
        baseXp: 408,
        baseGold: 302,
        level: 17,
        description: 'Flowing crimson menace, very difficult to reason with',
        possibleDrops: ['superior_health_potion', 'blood_ruby', 'blood_vial', 'huge_gem'],
        dropRates: { common: 0.16, uncommon: 0.24, rare: 0.28, epic: 0.2, legendary: 0.1, mythic: 0.02 }
    },

    wyvern: {
        name: 'Wyvern',
        baseHp: 720,
        baseDamage: 57,
        minDamage: 39,
        maxDamage: 74,
        baseDefense: 26,
        baseXp: 418,
        baseGold: 315,
        level: 17,
        description: 'Like a dragon, minus the patience and wisdom',
        possibleDrops: ['superior_health_potion', 'dragon_tooth', 'wyvern_scale', 'huge_gem'],
        dropRates: { common: 0.15, uncommon: 0.24, rare: 0.28, epic: 0.2, legendary: 0.11, mythic: 0.02 }
    },

    // ── LEVEL 18 ── (Crypt/Demon Portal additions)
    ancient_lich: {
        name: 'Ancient Lich',
        baseHp: 760,
        baseDamage: 62,
        minDamage: 43,
        maxDamage: 80,
        baseDefense: 22,
        baseXp: 458,
        baseGold: 355,
        level: 18,
        description: 'The lich\'s lich. Terrifyingly overqualified',
        possibleDrops: ['superior_health_potion', 'superior_mana_potion', 'phylactery', 'pristine_gem'],
        dropRates: { common: 0.13, uncommon: 0.22, rare: 0.28, epic: 0.22, legendary: 0.12, mythic: 0.03 }
    },

    nightmare_steed: {
        name: 'Nightmare Steed',
        baseHp: 720,
        baseDamage: 60,
        minDamage: 42,
        maxDamage: 78,
        baseDefense: 24,
        baseXp: 448,
        baseGold: 340,
        level: 18,
        description: 'A horse bred in the underworld, unrideable, unconquerable',
        possibleDrops: ['superior_health_potion', 'hellfire_fang', 'fiend_armor', 'pristine_gem'],
        dropRates: { common: 0.14, uncommon: 0.22, rare: 0.28, epic: 0.22, legendary: 0.12, mythic: 0.02 }
    },

    shadow_archon: {
        name: 'Shadow Archon',
        baseHp: 700,
        baseDamage: 64,
        minDamage: 44,
        maxDamage: 83,
        baseDefense: 20,
        baseXp: 460,
        baseGold: 358,
        level: 18,
        description: 'A high-ranking void entity, condescending and dangerous',
        possibleDrops: ['superior_mana_potion', 'void_blade', 'shadow_essence', 'pristine_gem'],
        dropRates: { common: 0.13, uncommon: 0.22, rare: 0.27, epic: 0.22, legendary: 0.13, mythic: 0.03 }
    },

    chaos_bringer: {
        name: 'Chaos Bringer',
        baseHp: 740,
        baseDamage: 63,
        minDamage: 44,
        maxDamage: 81,
        baseDefense: 22,
        baseXp: 452,
        baseGold: 348,
        level: 18,
        description: 'Does exactly what it says on the tin',
        possibleDrops: ['superior_health_potion', 'chaos_armor', 'chaos_essence', 'pristine_gem'],
        dropRates: { common: 0.13, uncommon: 0.22, rare: 0.28, epic: 0.22, legendary: 0.12, mythic: 0.03 }
    },

    soul_reaper: {
        name: 'Soul Reaper',
        baseHp: 680,
        baseDamage: 66,
        minDamage: 46,
        maxDamage: 85,
        baseDefense: 18,
        baseXp: 462,
        baseGold: 362,
        level: 18,
        description: 'Carries a scythe that costs extra souls, not just one',
        possibleDrops: ['superior_mana_potion', 'soul_essence', 'cursed_blade', 'pristine_gem'],
        dropRates: { common: 0.12, uncommon: 0.22, rare: 0.28, epic: 0.22, legendary: 0.13, mythic: 0.03 }
    },

    // ── LEVEL 19 ── (Demon Portal additions)
    infernal_titan: {
        name: 'Infernal Titan',
        baseHp: 820,
        baseDamage: 68,
        minDamage: 47,
        maxDamage: 88,
        baseDefense: 30,
        baseXp: 498,
        baseGold: 388,
        level: 19,
        description: 'An enormous demon who never learned the meaning of "enough"',
        possibleDrops: ['superior_health_potion', 'titan_blade', 'demon_crown', 'pristine_gem'],
        dropRates: { common: 0.12, uncommon: 0.2, rare: 0.27, epic: 0.24, legendary: 0.14, mythic: 0.03 }
    },

    void_assassin: {
        name: 'Void Assassin',
        baseHp: 710,
        baseDamage: 72,
        minDamage: 50,
        maxDamage: 93,
        baseDefense: 18,
        baseXp: 505,
        baseGold: 395,
        level: 19,
        description: 'Teleports. Silent. Has your name on a list',
        possibleDrops: ['superior_health_potion', 'void_blade', 'shadow_essence', 'pristine_gem'],
        dropRates: { common: 0.11, uncommon: 0.2, rare: 0.27, epic: 0.24, legendary: 0.15, mythic: 0.03 }
    },

    plague_dragon: {
        name: 'Plague Dragon',
        baseHp: 860,
        baseDamage: 66,
        minDamage: 46,
        maxDamage: 85,
        baseDefense: 28,
        baseXp: 492,
        baseGold: 382,
        level: 19,
        description: 'Breathes pestilence clouds. A truly unpleasant combination',
        possibleDrops: ['superior_health_potion', 'dragon_scale', 'plague_sample', 'pristine_gem'],
        dropRates: { common: 0.11, uncommon: 0.2, rare: 0.27, epic: 0.24, legendary: 0.15, mythic: 0.03 }
    },

    demon_sorceress: {
        name: 'Demon Sorceress',
        baseHp: 750,
        baseDamage: 70,
        minDamage: 49,
        maxDamage: 91,
        baseDefense: 22,
        baseXp: 500,
        baseGold: 390,
        level: 19,
        description: 'Brilliant, demonic, and insulted by the word "lesser"',
        possibleDrops: ['superior_mana_potion', 'demonic_blade', 'oracle_robes', 'pristine_gem'],
        dropRates: { common: 0.11, uncommon: 0.2, rare: 0.27, epic: 0.24, legendary: 0.15, mythic: 0.03 }
    },

    herald_of_doom: {
        name: 'Herald of Doom',
        baseHp: 790,
        baseDamage: 69,
        minDamage: 48,
        maxDamage: 89,
        baseDefense: 26,
        baseXp: 495,
        baseGold: 385,
        level: 19,
        description: 'Arrives before something worse. That is his entire job',
        possibleDrops: ['superior_health_potion', 'chaos_essence', 'infernal_blade', 'pristine_gem'],
        dropRates: { common: 0.11, uncommon: 0.2, rare: 0.27, epic: 0.24, legendary: 0.15, mythic: 0.03 }
    },

    // ── LEVEL 20 ── (Corrupted Temple/Volcano additions)
    elder_demon: {
        name: 'Elder Demon',
        baseHp: 900,
        baseDamage: 72,
        minDamage: 50,
        maxDamage: 93,
        baseDefense: 32,
        baseXp: 535,
        baseGold: 420,
        level: 20,
        description: 'Ancient evil that predates the current age of evil',
        possibleDrops: ['superior_health_potion', 'demon_core', 'demon_crown', 'pristine_gem'],
        dropRates: { common: 0.0991, uncommon: 0.1782, rare: 0.2673, epic: 0.2574, legendary: 0.1584, mythic: 0.0396 }
    },

    lava_titan: {
        name: 'Lava Titan',
        baseHp: 980,
        baseDamage: 70,
        minDamage: 49,
        maxDamage: 91,
        baseDefense: 40,
        baseXp: 528,
        baseGold: 412,
        level: 20,
        description: 'Born in the deepest volcanic fissure. Came up just for you',
        possibleDrops: ['superior_health_potion', 'magma_core', 'lava_armor', 'pristine_gem'],
        dropRates: { common: 0.0892, uncommon: 0.1782, rare: 0.2673, epic: 0.2574, legendary: 0.1683, mythic: 0.0396 }
    },

    void_colossus: {
        name: 'Void Colossus',
        baseHp: 960,
        baseDamage: 74,
        minDamage: 51,
        maxDamage: 96,
        baseDefense: 36,
        baseXp: 540,
        baseGold: 425,
        level: 20,
        description: 'An entire ecosystem of nothing, walking toward you',
        possibleDrops: ['superior_health_potion', 'void_crystal', 'null_essence', 'pristine_gem'],
        dropRates: { common: 0.0892, uncommon: 0.1782, rare: 0.2673, epic: 0.2574, legendary: 0.1683, mythic: 0.0396 }
    },

    corrupted_titan: {
        name: 'Corrupted Titan',
        baseHp: 940,
        baseDamage: 73,
        minDamage: 51,
        maxDamage: 94,
        baseDefense: 34,
        baseXp: 532,
        baseGold: 415,
        level: 20,
        description: 'A once-great giant warped beyond recognition',
        possibleDrops: ['superior_health_potion', 'corrupted_essence', 'tainted_plate', 'pristine_gem'],
        dropRates: { common: 0.0991, uncommon: 0.1782, rare: 0.2673, epic: 0.2574, legendary: 0.1584, mythic: 0.0396 }
    },

    nightmare_dragon: {
        name: 'Nightmare Dragon',
        baseHp: 1010,
        baseDamage: 76,
        minDamage: 53,
        maxDamage: 98,
        baseDefense: 38,
        baseXp: 545,
        baseGold: 430,
        level: 20,
        description: 'Dreams made manifest. It chose these particular dreams',
        possibleDrops: ['superior_health_potion', 'dragonslayer', 'dragon_heart', 'pristine_gem'],
        dropRates: { common: 0.0784, uncommon: 0.1667, rare: 0.2647, epic: 0.2647, legendary: 0.1765, mythic: 0.049 }
    },

    // ── LEVEL 21 ── (Corrupted Temple additions)
    void_titan: {
        name: 'Void Titan',
        baseHp: 1040,
        baseDamage: 78,
        minDamage: 54,
        maxDamage: 101,
        baseDefense: 38,
        baseXp: 582,
        baseGold: 452,
        level: 21,
        description: 'The void given size. You will need more health potions',
        possibleDrops: ['superior_health_potion', 'void_crown', 'void_armor', 'pristine_gem'],
        dropRates: { common: 0.0793, uncommon: 0.1584, rare: 0.2673, epic: 0.2673, legendary: 0.1782, mythic: 0.0495 }
    },

    fallen_titan: {
        name: 'Fallen Titan',
        baseHp: 1060,
        baseDamage: 80,
        minDamage: 56,
        maxDamage: 104,
        baseDefense: 40,
        baseXp: 590,
        baseGold: 462,
        level: 21,
        description: 'A celestial giant that chose the wrong side',
        possibleDrops: ['superior_health_potion', 'fallen_wing', 'titan_blade', 'pristine_gem'],
        dropRates: { common: 0.0686, uncommon: 0.1471, rare: 0.2647, epic: 0.2745, legendary: 0.1961, mythic: 0.049 }
    },

    abyssal_knight: {
        name: 'Abyssal Knight',
        baseHp: 1000,
        baseDamage: 82,
        minDamage: 57,
        maxDamage: 106,
        baseDefense: 36,
        baseXp: 578,
        baseGold: 445,
        level: 21,
        description: 'Armored in compressed darkness. Polished void',
        possibleDrops: ['superior_health_potion', 'abyssal_blade', 'chaos_armor', 'pristine_gem'],
        dropRates: { common: 0.0793, uncommon: 0.1584, rare: 0.2673, epic: 0.2673, legendary: 0.1782, mythic: 0.0495 }
    },

    elder_vampire: {
        name: 'Elder Vampire',
        baseHp: 980,
        baseDamage: 79,
        minDamage: 55,
        maxDamage: 102,
        baseDefense: 28,
        baseXp: 572,
        baseGold: 440,
        level: 21,
        description: 'Older than nations. Hungrier than you can imagine',
        possibleDrops: ['superior_health_potion', 'blood_ruby', 'vampire_blade', 'pristine_gem'],
        dropRates: { common: 0.0793, uncommon: 0.1584, rare: 0.2673, epic: 0.2673, legendary: 0.1782, mythic: 0.0495 }
    },

    reality_shredder: {
        name: 'Reality Shredder',
        baseHp: 960,
        baseDamage: 83,
        minDamage: 58,
        maxDamage: 107,
        baseDefense: 30,
        baseXp: 585,
        baseGold: 455,
        level: 21,
        description: 'Physics is a strong word around this one',
        possibleDrops: ['superior_mana_potion', 'reality_shard', 'void_crystal', 'pristine_gem'],
        dropRates: { common: 0.0686, uncommon: 0.1471, rare: 0.2647, epic: 0.2745, legendary: 0.1961, mythic: 0.049 }
    },

    // ── LEVEL 22 ── (Corrupted Temple/Volcano additions)
    eclipse_dragon: {
        name: 'Eclipse Dragon',
        baseHp: 1050,
        baseDamage: 85,
        minDamage: 59,
        maxDamage: 110,
        baseDefense: 42,
        baseXp: 628,
        baseGold: 492,
        level: 22,
        description: 'Blots out the sun when it spreads its wings. Rude',
        possibleDrops: ['superior_health_potion', 'dragonslayer', 'dragon_scale', 'pristine_gem'],
        dropRates: { common: 0.0686, uncommon: 0.1373, rare: 0.2549, epic: 0.2745, legendary: 0.2059, mythic: 0.0588 }
    },

    soul_devourer: {
        name: 'Soul Devourer',
        baseHp: 1000,
        baseDamage: 87,
        minDamage: 60,
        maxDamage: 113,
        baseDefense: 30,
        baseXp: 635,
        baseGold: 498,
        level: 22,
        description: 'Eats souls for sustenance. Very efficient. Very alarming',
        possibleDrops: ['superior_mana_potion', 'soul_essence', 'null_essence', 'pristine_gem'],
        dropRates: { common: 0.0588, uncommon: 0.1275, rare: 0.2549, epic: 0.2843, legendary: 0.2157, mythic: 0.0588 }
    },

    hellfire_knight: {
        name: 'Hellfire Knight',
        baseHp: 1080,
        baseDamage: 84,
        minDamage: 58,
        maxDamage: 109,
        baseDefense: 38,
        baseXp: 622,
        baseGold: 485,
        level: 22,
        description: 'Armor made from solidified hellfire. Somehow still wearable',
        possibleDrops: ['superior_health_potion', 'hellforged_blade', 'fiend_armor', 'pristine_gem'],
        dropRates: { common: 0.0686, uncommon: 0.1373, rare: 0.2549, epic: 0.2745, legendary: 0.2059, mythic: 0.0588 }
    },

    inferno_elemental: {
        name: 'Inferno Elemental',
        baseHp: 1020,
        baseDamage: 88,
        minDamage: 61,
        maxDamage: 114,
        baseDefense: 28,
        baseXp: 638,
        baseGold: 500,
        level: 22,
        description: 'Fire too angry to stay confined to a fireplace',
        possibleDrops: ['superior_health_potion', 'fire_core', 'fire_blade', 'pristine_gem'],
        dropRates: { common: 0.0588, uncommon: 0.1275, rare: 0.2549, epic: 0.2843, legendary: 0.2157, mythic: 0.0588 }
    },

    chaos_elemental: {
        name: 'Chaos Elemental',
        baseHp: 1040,
        baseDamage: 86,
        minDamage: 60,
        maxDamage: 111,
        baseDefense: 32,
        baseXp: 630,
        baseGold: 494,
        level: 22,
        description: 'Fire? Ice? Lightning? Yes. All at once. Simultaneously',
        possibleDrops: ['superior_health_potion', 'chaos_essence', 'entropy_core', 'pristine_gem'],
        dropRates: { common: 0.0588, uncommon: 0.1275, rare: 0.2549, epic: 0.2843, legendary: 0.2157, mythic: 0.0588 }
    },

    // ── LEVEL 23 ── (Volcano/Frozen Tundra additions)
    storm_dragon: {
        name: 'Storm Dragon',
        baseHp: 1100,
        baseDamage: 90,
        minDamage: 62,
        maxDamage: 117,
        baseDefense: 38,
        baseXp: 672,
        baseGold: 530,
        level: 23,
        description: 'Permanent lightning storm wherever it lands',
        possibleDrops: ['superior_health_potion', 'dragonslayer', 'dragon_heart', 'flawless_gem'],
        dropRates: { common: 0.0476, uncommon: 0.0952, rare: 0.2286, epic: 0.2857, legendary: 0.2667, mythic: 0.0762 }
    },

    blizzard_titan: {
        name: 'Blizzard Titan',
        baseHp: 1080,
        baseDamage: 86,
        minDamage: 60,
        maxDamage: 111,
        baseDefense: 42,
        baseXp: 665,
        baseGold: 522,
        level: 23,
        description: 'A walking snowstorm with opinions about warmth',
        possibleDrops: ['superior_health_potion', 'frost_armor', 'ice_crystal', 'flawless_gem'],
        dropRates: { common: 0.0471, uncommon: 0.1038, rare: 0.2264, epic: 0.283, legendary: 0.2642, mythic: 0.0755 }
    },

    ancient_lich_lord: {
        name: 'Ancient Lich Lord',
        baseHp: 1060,
        baseDamage: 92,
        minDamage: 64,
        maxDamage: 119,
        baseDefense: 28,
        baseXp: 678,
        baseGold: 538,
        level: 23,
        description: 'A lich who survived long enough to become something worse',
        possibleDrops: ['superior_health_potion', 'superior_mana_potion', 'phylactery', 'flawless_gem'],
        dropRates: { common: 0.0384, uncommon: 0.0962, rare: 0.2212, epic: 0.2885, legendary: 0.2692, mythic: 0.0865 }
    },

    void_dragon: {
        name: 'Void Dragon',
        baseHp: 1120,
        baseDamage: 88,
        minDamage: 61,
        maxDamage: 114,
        baseDefense: 40,
        baseXp: 668,
        baseGold: 526,
        level: 23,
        description: 'From nowhere, going nowhere, destroying everything en route',
        possibleDrops: ['superior_health_potion', 'void_blade', 'null_essence', 'flawless_gem'],
        dropRates: { common: 0.048, uncommon: 0.0962, rare: 0.2308, epic: 0.2885, legendary: 0.2596, mythic: 0.0769 }
    },

    glacial_wyrm: {
        name: 'Glacial Wyrm',
        baseHp: 1090,
        baseDamage: 87,
        minDamage: 60,
        maxDamage: 113,
        baseDefense: 44,
        baseXp: 662,
        baseGold: 518,
        level: 23,
        description: 'An ice dragon too old to be negotiated with',
        possibleDrops: ['superior_health_potion', 'wyrm_scale', 'frost_heart', 'flawless_gem'],
        dropRates: { common: 0.0476, uncommon: 0.1048, rare: 0.2286, epic: 0.2857, legendary: 0.2571, mythic: 0.0762 }
    },

    // ── LEVEL 24 ── (Void Realm/Celestial Spire approach)
    oblivion_herald: {
        name: 'Oblivion Herald',
        baseHp: 1150,
        baseDamage: 94,
        minDamage: 65,
        maxDamage: 122,
        baseDefense: 38,
        baseXp: 718,
        baseGold: 562,
        level: 24,
        description: 'Announces the end. Extremely punctual',
        possibleDrops: ['superior_health_potion', 'oblivion_blade', 'void_armor', 'flawless_gem'],
        dropRates: { common: 0.0382, uncommon: 0.0857, rare: 0.2, epic: 0.2952, legendary: 0.2857, mythic: 0.0952 }
    },

    eternal_warden: {
        name: 'Eternal Warden',
        baseHp: 1200,
        baseDamage: 88,
        minDamage: 61,
        maxDamage: 114,
        baseDefense: 50,
        baseXp: 708,
        baseGold: 550,
        level: 24,
        description: 'Has been guarding this realm since before time. Still annoyed',
        possibleDrops: ['superior_health_potion', 'guardian_core', 'divine_armor', 'flawless_gem'],
        dropRates: { common: 0.0378, uncommon: 0.0849, rare: 0.2075, epic: 0.2925, legendary: 0.283, mythic: 0.0943 }
    },

    chaos_dragon: {
        name: 'Chaos Dragon',
        baseHp: 1160,
        baseDamage: 96,
        minDamage: 67,
        maxDamage: 124,
        baseDefense: 42,
        baseXp: 722,
        baseGold: 568,
        level: 24,
        description: 'Five different breath weapons and no preference for any',
        possibleDrops: ['superior_health_potion', 'dragon_heart', 'chaos_armor', 'flawless_gem'],
        dropRates: { common: 0.0381, uncommon: 0.0857, rare: 0.2, epic: 0.2857, legendary: 0.2857, mythic: 0.1048 }
    },

    void_overlord: {
        name: 'Void Overlord',
        baseHp: 1140,
        baseDamage: 98,
        minDamage: 68,
        maxDamage: 127,
        baseDefense: 40,
        baseXp: 725,
        baseGold: 572,
        level: 24,
        description: 'Rules the nothing between worlds with an iron nonexistent fist',
        possibleDrops: ['superior_health_potion', 'void_crown', 'oblivion_blade', 'flawless_gem'],
        dropRates: { common: 0.0286, uncommon: 0.0762, rare: 0.2, epic: 0.2952, legendary: 0.2952, mythic: 0.1048 }
    },

    fallen_warlord: {
        name: 'Fallen Warlord',
        baseHp: 1180,
        baseDamage: 92,
        minDamage: 64,
        maxDamage: 119,
        baseDefense: 45,
        baseXp: 712,
        baseGold: 558,
        level: 24,
        description: 'Once commanded divine armies. Still commands respect',
        possibleDrops: ['superior_health_potion', 'titan_blade', 'blessed_plate', 'flawless_gem'],
        dropRates: { common: 0.0378, uncommon: 0.0849, rare: 0.2075, epic: 0.2925, legendary: 0.283, mythic: 0.0943 }
    },

    // ── LEVEL 25 ── (Celestial Spire additions)
    cosmic_horror: {
        name: 'Cosmic Horror',
        baseHp: 1200,
        baseDamage: 100,
        minDamage: 70,
        maxDamage: 130,
        baseDefense: 48,
        baseXp: 780,
        baseGold: 620,
        level: 25,
        description: 'An entity from outside the universe, confused by directions',
        possibleDrops: ['superior_health_potion', 'entropy_core', 'null_essence', 'flawless_gem'],
        dropRates: { common: 0.0277, uncommon: 0.0648, rare: 0.1389, epic: 0.2778, legendary: 0.3241, mythic: 0.1667 }
    },

    divine_executioner: {
        name: 'Divine Executioner',
        baseHp: 1180,
        baseDamage: 98,
        minDamage: 68,
        maxDamage: 127,
        baseDefense: 50,
        baseXp: 772,
        baseGold: 610,
        level: 25,
        description: 'Carries a heavenly blade the size of a building. Professional',
        possibleDrops: ['superior_health_potion', 'heavenly_blade', 'divine_armor', 'flawless_gem'],
        dropRates: { common: 0.0277, uncommon: 0.0648, rare: 0.1389, epic: 0.2778, legendary: 0.3241, mythic: 0.1667 }
    },

    star_titan: {
        name: 'Star Titan',
        baseHp: 1210,
        baseDamage: 95,
        minDamage: 66,
        maxDamage: 123,
        baseDefense: 52,
        baseXp: 768,
        baseGold: 605,
        level: 25,
        description: 'Born from the collapse of a dying star. Warm to the touch',
        possibleDrops: ['superior_health_potion', 'titan_blade', 'celestial_blade', 'flawless_gem'],
        dropRates: { common: 0.0277, uncommon: 0.0648, rare: 0.1389, epic: 0.2778, legendary: 0.3241, mythic: 0.1667 }
    },

    eternal_dragon: {
        name: 'Eternal Dragon',
        baseHp: 1250,
        baseDamage: 102,
        minDamage: 71,
        maxDamage: 132,
        baseDefense: 50,
        baseXp: 795,
        baseGold: 632,
        level: 25,
        description: 'Has seen civilizations rise and fall. Still unimpressed',
        possibleDrops: ['superior_health_potion', 'dragon_heart', 'dragonslayer', 'flawless_gem'],
        dropRates: { common: 0.0185, uncommon: 0.055, rare: 0.1284, epic: 0.2752, legendary: 0.3394, mythic: 0.1835 },
        isBoss: true
    },

    oblivion_incarnate: {
        name: 'Oblivion Incarnate',
        baseHp: 1250,
        baseDamage: 105,
        minDamage: 73,
        maxDamage: 136,
        baseDefense: 52,
        baseXp: 800,
        baseGold: 650,
        level: 25,
        description: 'The end of all things, and it is in a hurry',
        possibleDrops: ['superior_health_potion', 'oblivion_blade', 'void_crown', 'flawless_gem'],
        dropRates: { common: 0.0184, uncommon: 0.0463, rare: 0.1204, epic: 0.2778, legendary: 0.3519, mythic: 0.1852 },
        isBoss: true
    }
});

// RARITY_CONFIG is defined in index.html (main script block) so it is
// always available before any game code runs. Kept here as a reference comment only.
// common: multiplier 1.0  uncommon: 1.1  rare: 1.2  epic: 1.3  legendary: 1.4  mythic: 1.5

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ENEMIES, RARITY_CONFIG };
}
