// monsters.js - Enemy Database (EXPANDED - 100+ Monsters!)
// Add new monsters here to expand the game!

// RARITY SYSTEM:
// common: 60% spawn rate, 1.0x stats, white color
// uncommon: 25% spawn rate, 1.3x stats, green color
// rare: 10% spawn rate, 1.6x stats, blue color
// epic: 4% spawn rate, 2.0x stats, purple color
// legendary: 0.9% spawn rate, 2.5x stats, orange color
// mythic: 0.1% spawn rate, 3.5x stats, red color

const ENEMIES = {
    // ═══════════════════════════════════════════════════════════════
    // LEVEL 1-5 MONSTERS (Forest & Riverside)
    // ═══════════════════════════════════════════════════════════════
    
    // Your child's monster! 💩
    poop_slime: { 
        name: 'Poop Slime', 
        baseHp: 100, 
        baseDamage: 10, 
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
        baseHp: 35, 
        baseDamage: 10, 
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
        baseHp: 38,
        baseDamage: 9,
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
        baseHp: 25,
        baseDamage: 6,
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
        baseHp: 28,
        baseDamage: 7,
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
        baseHp: 26,
        baseDamage: 8,
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
        baseHp: 32,
        baseDamage: 11,
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
        baseHp: 50, 
        baseDamage: 16, 
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
        baseHp: 45,
        baseDamage: 13,
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
        baseHp: 40,
        baseDamage: 14,
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
        baseHp: 42,
        baseDamage: 11,
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
        baseHp: 35,
        baseDamage: 15,
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
        baseHp: 60, 
        baseDamage: 18, 
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
        baseHp: 65, 
        baseDamage: 20, 
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
        baseHp: 70,
        baseDamage: 22,
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
        baseHp: 85,
        baseDamage: 24,
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
        baseHp: 68,
        baseDamage: 21,
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
        baseHp: 75,
        baseDamage: 23,
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
        baseHp: 60,
        baseDamage: 17,
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
        baseHp: 65,
        baseDamage: 19,
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
        baseHp: 55,
        baseDamage: 16,
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
        baseHp: 80,
        baseDamage: 25,
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
        baseHp: 70,
        baseDamage: 20,
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
        baseHp: 58,
        baseDamage: 18,
        baseDefense: 5,
        baseXp: 58,
        baseGold: 35,
        level: 7,
        description: 'A ghostly apparition bound to the graveyard',
        possibleDrops: ['mana_potion', 'ectoplasm', 'spirit_essence', 'medium_gem'],
        dropRates: { common: 0.4, uncommon: 0.25, rare: 0.12, epic: 0.04 }
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 11-15 MONSTERS (Cave, Dark Swamp, Cursed Ruins)
    // ═══════════════════════════════════════════════════════════════
    
    troll: { 
        name: 'Cave Troll', 
        baseHp: 120, 
        baseDamage: 28, 
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
        baseHp: 95, 
        baseDamage: 26, 
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
        baseHp: 85, 
        baseDamage: 32, 
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
        baseHp: 140,
        baseDamage: 30,
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
        baseHp: 160,
        baseDamage: 27,
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
        baseHp: 135,
        baseDamage: 29,
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
        baseHp: 110,
        baseDamage: 31,
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
        baseHp: 105,
        baseDamage: 28,
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
        baseHp: 100,
        baseDamage: 27,
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
        baseHp: 145,
        baseDamage: 33,
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
        baseHp: 165,
        baseDamage: 30,
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
        baseHp: 150,
        baseDamage: 34,
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
        baseHp: 125,
        baseDamage: 36,
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
        baseHp: 180,
        baseDamage: 32,
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
        baseHp: 140,
        baseDamage: 35,
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
        baseHp: 130,
        baseDamage: 38,
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
        baseHp: 200, 
        baseDamage: 42, 
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
        baseHp: 240, 
        baseDamage: 48, 
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
        baseHp: 280,
        baseDamage: 50,
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
        baseHp: 220,
        baseDamage: 46,
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
        baseHp: 190,
        baseDamage: 40,
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
        baseHp: 210,
        baseDamage: 44,
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
        baseHp: 195,
        baseDamage: 47,
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
        baseHp: 170,
        baseDamage: 41,
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
        baseHp: 260,
        baseDamage: 52,
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
        baseHp: 300,
        baseDamage: 55,
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
        baseHp: 250,
        baseDamage: 50,
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
        baseHp: 270,
        baseDamage: 53,
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
        baseHp: 230,
        baseDamage: 56,
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
        baseHp: 320,
        baseDamage: 58,
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
        baseHp: 240,
        baseDamage: 60,
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
        baseHp: 280, 
        baseDamage: 62, 
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
        baseHp: 350,
        baseDamage: 60,
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
        baseHp: 290,
        baseDamage: 68,
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
        baseHp: 420,
        baseDamage: 72,
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
        baseHp: 480,
        baseDamage: 75,
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
        baseHp: 380,
        baseDamage: 65,
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
        baseHp: 360,
        baseDamage: 64,
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
        baseHp: 340,
        baseDamage: 61,
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
        baseHp: 370,
        baseDamage: 68,
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
        baseHp: 460,
        baseDamage: 78,
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
        baseHp: 390,
        baseDamage: 70,
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
        baseHp: 370,
        baseDamage: 74,
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
        baseHp: 410,
        baseDamage: 76,
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
        baseHp: 430,
        baseDamage: 80,
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
        baseHp: 500,
        baseDamage: 85,
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
        baseHp: 450,
        baseDamage: 72,
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
        baseHp: 490,
        baseDamage: 78,
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
        baseHp: 470,
        baseDamage: 82,
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
        baseHp: 520,
        baseDamage: 88,
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
        baseHp: 600,
        baseDamage: 95,
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
        baseHp: 450, 
        baseDamage: 70, 
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
        baseHp: 350, 
        baseDamage: 62, 
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
        baseHp: 280,
        baseDamage: 58,
        baseDefense: 22,
        baseXp: 350,
        baseGold: 300,
        level: 16,
        description: 'A centuries-old blood-drinking undead',
        possibleDrops: ['greater_health_potion', 'vampire_blade', 'noble_robes', 'huge_gem', 'blood_ruby'],
        dropRates: { common: 0.15, uncommon: 0.25, rare: 0.25, epic: 0.2, legendary: 0.12, mythic: 0.05 },
        isBoss: true
    }
};

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
