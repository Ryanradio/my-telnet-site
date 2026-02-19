// monsters.js - Enemy Database (EXPANDED - 100+ Monsters!)
// Add new monsters here to expand the game!

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
        dropRates: { common: 0.4, uncommon: 0.2, rare: 0.05, epic: 0.01 }
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
        dropRates: { common: 0.5, uncommon: 0.15, rare: 0.03 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.6, uncommon: 0.15, rare: 0.02 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.6, uncommon: 0.1, rare: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.3, uncommon: 0.3, rare: 0.15, epic: 0.06, legendary: 0.01 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.45, uncommon: 0.2, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.12, epic: 0.05, legendary: 0.01 }
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
        dropRates: { common: 0.4, uncommon: 0.2, rare: 0.08, epic: 0.03 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.04 }
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
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.12, epic: 0.05, legendary: 0.02 }
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
        dropRates: { common: 0.35, uncommon: 0.3, rare: 0.15, epic: 0.05 }
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
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.15, epic: 0.06, legendary: 0.01 }
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
        dropRates: { common: 0.45, uncommon: 0.2, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.45, uncommon: 0.2, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.2, epic: 0.12, legendary: 0.05 }
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
        dropRates: { common: 0.35, uncommon: 0.3, rare: 0.15, epic: 0.08, legendary: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.12, epic: 0.04 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.45, uncommon: 0.2, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.5, uncommon: 0.18, rare: 0.05 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.55, uncommon: 0.15, rare: 0.04 }
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
        dropRates: { common: 0.42, uncommon: 0.22, rare: 0.09, epic: 0.02 }
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
        dropRates: { common: 0.38, uncommon: 0.25, rare: 0.12, epic: 0.04 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.2, epic: 0.1, legendary: 0.03 }
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
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.15, epic: 0.08, legendary: 0.02 }
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
        dropRates: { common: 0.25, uncommon: 0.3, rare: 0.2, epic: 0.12, legendary: 0.05 }
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
        dropRates: { common: 0.25, uncommon: 0.25, rare: 0.22, epic: 0.15, legendary: 0.08 }
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
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.2, epic: 0.12, legendary: 0.05 }
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
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.18, epic: 0.1, legendary: 0.03 }
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
        dropRates: { common: 0.25, uncommon: 0.3, rare: 0.2, epic: 0.12, legendary: 0.06 }
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
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.15, epic: 0.08, legendary: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.15, epic: 0.05 }
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
        dropRates: { common: 0.25, uncommon: 0.25, rare: 0.22, epic: 0.15, legendary: 0.08 }
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
        dropRates: { common: 0.25, uncommon: 0.25, rare: 0.22, epic: 0.15, legendary: 0.1 }
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
        dropRates: { common: 0.25, uncommon: 0.25, rare: 0.22, epic: 0.15, legendary: 0.08 }
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
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.2, epic: 0.12, legendary: 0.06 }
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
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.18, legendary: 0.1 }
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
        dropRates: { common: 0.25, uncommon: 0.25, rare: 0.22, epic: 0.15, legendary: 0.08 }
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
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.18, legendary: 0.1 }
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
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.15, legendary: 0.1, mythic: 0.02 }
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
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.18, legendary: 0.1 }
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
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.18, legendary: 0.1 }
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
        dropRates: { common: 0.25, uncommon: 0.25, rare: 0.22, epic: 0.15, legendary: 0.08 }
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
        dropRates: { common: 0.1, uncommon: 0.2, rare: 0.25, epic: 0.25, legendary: 0.18, mythic: 0.05 }
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
        dropRates: { common: 0.12, uncommon: 0.2, rare: 0.25, epic: 0.25, legendary: 0.16, mythic: 0.04 }
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
        dropRates: { common: 0.1, uncommon: 0.15, rare: 0.25, epic: 0.28, legendary: 0.2, mythic: 0.05 }
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
        dropRates: { common: 0.12, uncommon: 0.2, rare: 0.25, epic: 0.25, legendary: 0.16, mythic: 0.04 }
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
        dropRates: { common: 0.1, uncommon: 0.15, rare: 0.25, epic: 0.28, legendary: 0.2, mythic: 0.05 }
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
        dropRates: { common: 0.08, uncommon: 0.12, rare: 0.25, epic: 0.3, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.2, epic: 0.3, legendary: 0.28, mythic: 0.1 }
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.2, epic: 0.3, legendary: 0.3, mythic: 0.12 }
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
        dropRates: { common: 0.03, uncommon: 0.08, rare: 0.18, epic: 0.32, legendary: 0.32, mythic: 0.15 },
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
        dropRates: { common: 0.08, uncommon: 0.12, rare: 0.25, epic: 0.3, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.08, uncommon: 0.15, rare: 0.25, epic: 0.28, legendary: 0.2, mythic: 0.05 }
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
        dropRates: { common: 0.1, uncommon: 0.15, rare: 0.25, epic: 0.28, legendary: 0.2, mythic: 0.05 }
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
        dropRates: { common: 0.08, uncommon: 0.12, rare: 0.25, epic: 0.3, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.2, epic: 0.3, legendary: 0.3, mythic: 0.12 },
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
        dropRates: { common: 0.06, uncommon: 0.12, rare: 0.22, epic: 0.32, legendary: 0.25, mythic: 0.08 }
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
        dropRates: { common: 0.08, uncommon: 0.12, rare: 0.25, epic: 0.3, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.06, uncommon: 0.12, rare: 0.22, epic: 0.32, legendary: 0.25, mythic: 0.08 }
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.2, epic: 0.3, legendary: 0.3, mythic: 0.12 }
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
        dropRates: { common: 0.03, uncommon: 0.08, rare: 0.18, epic: 0.32, legendary: 0.32, mythic: 0.15 },
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.2, epic: 0.3, legendary: 0.3, mythic: 0.12 }
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
        dropRates: { common: 0.04, uncommon: 0.08, rare: 0.18, epic: 0.32, legendary: 0.32, mythic: 0.14 }
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
        dropRates: { common: 0.04, uncommon: 0.08, rare: 0.18, epic: 0.32, legendary: 0.32, mythic: 0.14 }
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
        dropRates: { common: 0.03, uncommon: 0.07, rare: 0.15, epic: 0.3, legendary: 0.35, mythic: 0.18 }
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
        dropRates: { common: 0.02, uncommon: 0.05, rare: 0.12, epic: 0.3, legendary: 0.4, mythic: 0.2, butterknife: 0.0001 },
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
        dropRates: { common: 0.1, uncommon: 0.15, rare: 0.25, epic: 0.25, legendary: 0.2, mythic: 0.08, butterknife: 0.0001 },
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
        dropRates: { common: 0.12, uncommon: 0.18, rare: 0.25, epic: 0.22, legendary: 0.18, mythic: 0.08 },
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
        dropRates: { common: 0.15, uncommon: 0.25, rare: 0.25, epic: 0.2, legendary: 0.12, mythic: 0.05 },
        isBoss: true
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
        dropRates: { common: 0.6, uncommon: 0.15, rare: 0.02 }
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
        dropRates: { common: 0.65, uncommon: 0.1, rare: 0.01 }
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
        dropRates: { common: 0.55, uncommon: 0.18, rare: 0.03 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.04 }
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
        dropRates: { common: 0.5, uncommon: 0.18, rare: 0.03 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.55, uncommon: 0.18, rare: 0.03 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.4, uncommon: 0.28, rare: 0.1, epic: 0.02 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.5, uncommon: 0.2, rare: 0.05 }
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
        dropRates: { common: 0.4, uncommon: 0.28, rare: 0.1, epic: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.02 }
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
        dropRates: { common: 0.45, uncommon: 0.22, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.45, uncommon: 0.22, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.28, rare: 0.1, epic: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.38, uncommon: 0.28, rare: 0.12, epic: 0.04 }
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
        dropRates: { common: 0.45, uncommon: 0.22, rare: 0.08, epic: 0.02 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.38, uncommon: 0.28, rare: 0.14, epic: 0.05 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.12, epic: 0.04 }
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
        dropRates: { common: 0.48, uncommon: 0.2, rare: 0.07, epic: 0.02 }
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
        dropRates: { common: 0.38, uncommon: 0.28, rare: 0.14, epic: 0.05 }
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
        dropRates: { common: 0.35, uncommon: 0.28, rare: 0.15, epic: 0.06 }
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
        dropRates: { common: 0.35, uncommon: 0.28, rare: 0.15, epic: 0.06 }
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
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.12, epic: 0.04 }
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
        dropRates: { common: 0.42, uncommon: 0.24, rare: 0.1, epic: 0.03 }
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
        dropRates: { common: 0.35, uncommon: 0.28, rare: 0.15, epic: 0.06 }
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
        dropRates: { common: 0.35, uncommon: 0.3, rare: 0.18, epic: 0.08 }
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
        dropRates: { common: 0.33, uncommon: 0.3, rare: 0.18, epic: 0.09, legendary: 0.02 }
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
        dropRates: { common: 0.33, uncommon: 0.28, rare: 0.2, epic: 0.1, legendary: 0.03 }
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
        dropRates: { common: 0.35, uncommon: 0.28, rare: 0.18, epic: 0.08, legendary: 0.02 }
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
        dropRates: { common: 0.32, uncommon: 0.3, rare: 0.2, epic: 0.1, legendary: 0.03 }
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
        dropRates: { common: 0.38, uncommon: 0.28, rare: 0.16, epic: 0.07, legendary: 0.01 }
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
        dropRates: { common: 0.28, uncommon: 0.28, rare: 0.22, epic: 0.14, legendary: 0.05 }
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
        dropRates: { common: 0.35, uncommon: 0.26, rare: 0.2, epic: 0.1, legendary: 0.03 }
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
        dropRates: { common: 0.3, uncommon: 0.27, rare: 0.22, epic: 0.12, legendary: 0.04 }
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
        dropRates: { common: 0.28, uncommon: 0.27, rare: 0.23, epic: 0.14, legendary: 0.05 }
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
        dropRates: { common: 0.25, uncommon: 0.3, rare: 0.24, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.28, uncommon: 0.27, rare: 0.22, epic: 0.14, legendary: 0.05 }
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
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.22, epic: 0.14, legendary: 0.05 }
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
        dropRates: { common: 0.32, uncommon: 0.27, rare: 0.2, epic: 0.12, legendary: 0.04 }
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
        dropRates: { common: 0.25, uncommon: 0.3, rare: 0.24, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.28, uncommon: 0.28, rare: 0.22, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.25, uncommon: 0.3, rare: 0.24, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.28, uncommon: 0.28, rare: 0.22, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.3, uncommon: 0.26, rare: 0.22, epic: 0.13, legendary: 0.05 }
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
        dropRates: { common: 0.27, uncommon: 0.3, rare: 0.23, epic: 0.13, legendary: 0.05 }
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
        dropRates: { common: 0.3, uncommon: 0.27, rare: 0.22, epic: 0.12, legendary: 0.04 }
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
        dropRates: { common: 0.27, uncommon: 0.28, rare: 0.23, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.25, uncommon: 0.28, rare: 0.25, epic: 0.15, legendary: 0.07 }
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
        dropRates: { common: 0.27, uncommon: 0.27, rare: 0.24, epic: 0.14, legendary: 0.06 }
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
        dropRates: { common: 0.23, uncommon: 0.3, rare: 0.25, epic: 0.15, legendary: 0.07 }
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
        dropRates: { common: 0.3, uncommon: 0.26, rare: 0.22, epic: 0.13, legendary: 0.05 }
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
        dropRates: { common: 0.22, uncommon: 0.3, rare: 0.26, epic: 0.16, legendary: 0.08 }
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
        dropRates: { common: 0.25, uncommon: 0.28, rare: 0.25, epic: 0.15, legendary: 0.07 }
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
        dropRates: { common: 0.23, uncommon: 0.28, rare: 0.26, epic: 0.16, legendary: 0.08 }
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
        dropRates: { common: 0.22, uncommon: 0.3, rare: 0.26, epic: 0.16, legendary: 0.08 }
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
        dropRates: { common: 0.25, uncommon: 0.27, rare: 0.25, epic: 0.15, legendary: 0.07 }
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
        dropRates: { common: 0.2, uncommon: 0.28, rare: 0.28, epic: 0.17, legendary: 0.09 }
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
        dropRates: { common: 0.2, uncommon: 0.28, rare: 0.28, epic: 0.17, legendary: 0.09 }
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
        dropRates: { common: 0.2, uncommon: 0.28, rare: 0.27, epic: 0.17, legendary: 0.1 }
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
        dropRates: { common: 0.22, uncommon: 0.28, rare: 0.27, epic: 0.16, legendary: 0.09 }
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
        dropRates: { common: 0.21, uncommon: 0.28, rare: 0.28, epic: 0.17, legendary: 0.09 }
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
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.27, epic: 0.18, legendary: 0.1, mythic: 0.02 }
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
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.27, epic: 0.18, legendary: 0.1, mythic: 0.02 }
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
        dropRates: { common: 0.18, uncommon: 0.25, rare: 0.27, epic: 0.18, legendary: 0.1, mythic: 0.02 }
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
        dropRates: { common: 0.17, uncommon: 0.25, rare: 0.27, epic: 0.19, legendary: 0.1, mythic: 0.02 }
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
        dropRates: { common: 0.17, uncommon: 0.25, rare: 0.27, epic: 0.19, legendary: 0.1, mythic: 0.02 }
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
        dropRates: { common: 0.1, uncommon: 0.18, rare: 0.27, epic: 0.26, legendary: 0.16, mythic: 0.04 }
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
        dropRates: { common: 0.09, uncommon: 0.18, rare: 0.27, epic: 0.26, legendary: 0.17, mythic: 0.04 }
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
        dropRates: { common: 0.09, uncommon: 0.18, rare: 0.27, epic: 0.26, legendary: 0.17, mythic: 0.04 }
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
        dropRates: { common: 0.1, uncommon: 0.18, rare: 0.27, epic: 0.26, legendary: 0.16, mythic: 0.04 }
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
        dropRates: { common: 0.08, uncommon: 0.17, rare: 0.27, epic: 0.27, legendary: 0.18, mythic: 0.05 }
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
        dropRates: { common: 0.08, uncommon: 0.16, rare: 0.27, epic: 0.27, legendary: 0.18, mythic: 0.05 }
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
        dropRates: { common: 0.07, uncommon: 0.15, rare: 0.27, epic: 0.28, legendary: 0.2, mythic: 0.05 }
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
        dropRates: { common: 0.08, uncommon: 0.16, rare: 0.27, epic: 0.27, legendary: 0.18, mythic: 0.05 }
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
        dropRates: { common: 0.08, uncommon: 0.16, rare: 0.27, epic: 0.27, legendary: 0.18, mythic: 0.05 }
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
        dropRates: { common: 0.07, uncommon: 0.15, rare: 0.27, epic: 0.28, legendary: 0.2, mythic: 0.05 }
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
        dropRates: { common: 0.07, uncommon: 0.14, rare: 0.26, epic: 0.28, legendary: 0.21, mythic: 0.06 }
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
        dropRates: { common: 0.06, uncommon: 0.13, rare: 0.26, epic: 0.29, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.07, uncommon: 0.14, rare: 0.26, epic: 0.28, legendary: 0.21, mythic: 0.06 }
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
        dropRates: { common: 0.06, uncommon: 0.13, rare: 0.26, epic: 0.29, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.06, uncommon: 0.13, rare: 0.26, epic: 0.29, legendary: 0.22, mythic: 0.06 }
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.24, epic: 0.3, legendary: 0.28, mythic: 0.08 }
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
        dropRates: { common: 0.05, uncommon: 0.11, rare: 0.24, epic: 0.3, legendary: 0.28, mythic: 0.08 }
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
        dropRates: { common: 0.04, uncommon: 0.1, rare: 0.23, epic: 0.3, legendary: 0.28, mythic: 0.09 }
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
        dropRates: { common: 0.05, uncommon: 0.1, rare: 0.24, epic: 0.3, legendary: 0.27, mythic: 0.08 }
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
        dropRates: { common: 0.05, uncommon: 0.11, rare: 0.24, epic: 0.3, legendary: 0.27, mythic: 0.08 }
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
        dropRates: { common: 0.04, uncommon: 0.09, rare: 0.21, epic: 0.31, legendary: 0.3, mythic: 0.1 }
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
        dropRates: { common: 0.04, uncommon: 0.09, rare: 0.22, epic: 0.31, legendary: 0.3, mythic: 0.1 }
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
        dropRates: { common: 0.04, uncommon: 0.09, rare: 0.21, epic: 0.3, legendary: 0.3, mythic: 0.11 }
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
        dropRates: { common: 0.03, uncommon: 0.08, rare: 0.21, epic: 0.31, legendary: 0.31, mythic: 0.11 }
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
        dropRates: { common: 0.04, uncommon: 0.09, rare: 0.22, epic: 0.31, legendary: 0.3, mythic: 0.1 }
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
        dropRates: { common: 0.03, uncommon: 0.07, rare: 0.15, epic: 0.3, legendary: 0.35, mythic: 0.18 }
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
        dropRates: { common: 0.03, uncommon: 0.07, rare: 0.15, epic: 0.3, legendary: 0.35, mythic: 0.18 }
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
        dropRates: { common: 0.03, uncommon: 0.07, rare: 0.15, epic: 0.3, legendary: 0.35, mythic: 0.18 }
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
        dropRates: { common: 0.02, uncommon: 0.06, rare: 0.14, epic: 0.3, legendary: 0.37, mythic: 0.2 },
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
        dropRates: { common: 0.02, uncommon: 0.05, rare: 0.13, epic: 0.3, legendary: 0.38, mythic: 0.2 },
        isBoss: true
    }
});

// Rarity multipliers and colors
const RARITY_CONFIG = {
    common: { 
        multiplier: 1.0, 
        color: '#FFFFFF', 
        spawnWeight: 60,
        dropBonus: 0,
        name: 'Common'
    },
    uncommon: { 
        multiplier: 1.3, 
        color: '#00FF00', 
        spawnWeight: 25,
        dropBonus: 1,
        name: 'Uncommon'
    },
    rare: { 
        multiplier: 1.6, 
        color: '#0099FF', 
        spawnWeight: 10,
        dropBonus: 2,
        name: 'Rare'
    },
    epic: { 
        multiplier: 2.0, 
        color: '#9933FF', 
        spawnWeight: 4,
        dropBonus: 3,
        name: 'Epic'
    },
    legendary: { 
        multiplier: 2.5, 
        color: '#FF9900', 
        spawnWeight: 0.9,
        dropBonus: 5,
        name: 'Legendary'
    },
    mythic: { 
        multiplier: 3.5, 
        color: '#FF0000', 
        spawnWeight: 0.1,
        dropBonus: 8,
        name: 'Mythic'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ENEMIES, RARITY_CONFIG };
}
