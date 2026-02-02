// class-masters.js - Class Master Boss Database
// These are powerful bosses that must be defeated to progress to new areas

const CLASS_MASTERS = {
    // ═══════════════════════════════════════════════════════════════
    // FOREST → PLAINS MASTERS (Level 3 Required)
    // ═══════════════════════════════════════════════════════════════
    
    warrior_master_forest: {
        name: 'Master Swordsman Gareth',
        class: 'warrior',
        unlocks: 'plains',
        baseHp: 200,
        baseDamage: 30,
        baseDefense: 20,
        level: 3,
        requiredLevel: 3,
        xp: 150,
        gold: 200,
        description: 'A legendary warrior who guards the path to the plains',
        guaranteedDrops: ['steel_sword', 'steel_plate', 'large_gem'],
        possibleDrops: ['warhammer', 'scale_mail', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 }
    },
    
    rogue_master_forest: {
        name: 'Shadow Master Vex',
        class: 'rogue',
        unlocks: 'plains',
        baseHp: 150,
        baseDamage: 35,
        baseDefense: 12,
        level: 3,
        requiredLevel: 3,
        xp: 150,
        gold: 200,
        description: 'A master assassin who strikes from the shadows',
        guaranteedDrops: ['poison_dagger', 'shadow_armor', 'large_gem'],
        possibleDrops: ['studded_leather', 'health_potion', 'escape_rope'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 }
    },
    
    paladin_master_forest: {
        name: 'Knight Commander Aldric',
        class: 'paladin',
        unlocks: 'plains',
        baseHp: 180,
        baseDamage: 28,
        baseDefense: 22,
        level: 3,
        requiredLevel: 3,
        xp: 150,
        gold: 200,
        description: 'A holy knight devoted to justice',
        guaranteedDrops: ['holy_mace', 'chainmail', 'large_gem'],
        possibleDrops: ['divine_hammer', 'steel_plate', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 }
    },
    
    mage_master_forest: {
        name: 'Arcane Tutor Zephyr',
        class: 'mage',
        unlocks: 'plains',
        baseHp: 120,
        baseDamage: 40,
        baseDefense: 10,
        level: 3,
        requiredLevel: 3,
        xp: 150,
        gold: 200,
        description: 'An ancient wizard of immense power',
        guaranteedDrops: ['flame_staff', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['ice_staff', 'mana_potion', 'greater_mana_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 }
    },
    
    cleric_master_forest: {
        name: 'High Priest Luminus',
        class: 'cleric',
        unlocks: 'plains',
        baseHp: 160,
        baseDamage: 25,
        baseDefense: 18,
        level: 3,
        requiredLevel: 3,
        xp: 150,
        gold: 200,
        description: 'A divine servant with holy powers',
        guaranteedDrops: ['holy_mace', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['divine_hammer', 'greater_health_potion', 'elixir'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 }
    },
    
    ranger_master_forest: {
        name: 'Hunt Master Theron',
        class: 'ranger',
        unlocks: 'plains',
        baseHp: 140,
        baseDamage: 32,
        baseDefense: 15,
        level: 3,
        requiredLevel: 3,
        xp: 150,
        gold: 200,
        description: 'A skilled tracker and archer',
        guaranteedDrops: ['longbow', 'studded_leather', 'large_gem'],
        possibleDrops: ['elven_bow', 'leather_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 }
    },

    // ═══════════════════════════════════════════════════════════════
    // PLAINS → CAVE MASTERS (Level 6 Required)
    // ═══════════════════════════════════════════════════════════════
    
    warrior_master_plains: {
        name: 'War Chief Brutus',
        class: 'warrior',
        unlocks: 'cave',
        baseHp: 350,
        baseDamage: 45,
        baseDefense: 30,
        level: 6,
        requiredLevel: 6,
        xp: 300,
        gold: 400,
        description: 'A brutal chieftain who conquered the plains',
        guaranteedDrops: ['bastard_sword', 'plate_mail', 'huge_gem'],
        possibleDrops: ['warhammer', 'mithril_chainmail', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 }
    },
    
    rogue_master_plains: {
        name: 'Blade Dancer Nyx',
        class: 'rogue',
        unlocks: 'cave',
        baseHp: 280,
        baseDamage: 52,
        baseDefense: 20,
        level: 6,
        requiredLevel: 6,
        xp: 300,
        gold: 400,
        description: 'A deadly assassin who moves like wind',
        guaranteedDrops: ['cursed_sword', 'demon_leather', 'huge_gem'],
        possibleDrops: ['shadowblade', 'shadow_armor', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 }
    },
    
    paladin_master_plains: {
        name: 'Crusader Lord Marcus',
        class: 'paladin',
        unlocks: 'cave',
        baseHp: 320,
        baseDamage: 42,
        baseDefense: 32,
        level: 6,
        requiredLevel: 6,
        xp: 300,
        gold: 400,
        description: 'A holy crusader on a divine mission',
        guaranteedDrops: ['divine_hammer', 'mithril_chainmail', 'huge_gem'],
        possibleDrops: ['holy_mace', 'steel_plate', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 }
    },
    
    mage_master_plains: {
        name: 'Sorcerer Supreme Malzahar',
        class: 'mage',
        unlocks: 'cave',
        baseHp: 220,
        baseDamage: 60,
        baseDefense: 18,
        level: 6,
        requiredLevel: 6,
        xp: 300,
        gold: 400,
        description: 'A sorcerer who bends reality itself',
        guaranteedDrops: ['ice_staff', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['archmage_staff', 'enchanted_robes', 'superior_mana_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 }
    },
    
    cleric_master_plains: {
        name: 'Cardinal Seraphina',
        class: 'cleric',
        unlocks: 'cave',
        baseHp: 290,
        baseDamage: 38,
        baseDefense: 26,
        level: 6,
        requiredLevel: 6,
        xp: 300,
        gold: 400,
        description: 'A high-ranking church official with divine blessings',
        guaranteedDrops: ['divine_hammer', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['holy_mace', 'mithril_chainmail', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 }
    },
    
    ranger_master_plains: {
        name: 'Beastlord Kael',
        class: 'ranger',
        unlocks: 'cave',
        baseHp: 270,
        baseDamage: 48,
        baseDefense: 24,
        level: 6,
        requiredLevel: 6,
        xp: 300,
        gold: 400,
        description: 'A ranger who commands the beasts of the plains',
        guaranteedDrops: ['elven_bow', 'demon_leather', 'huge_gem'],
        possibleDrops: ['longbow', 'studded_leather', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 }
    },

    // ═══════════════════════════════════════════════════════════════
    // CAVE → CRYPT MASTERS (Level 9 Required)
    // ═══════════════════════════════════════════════════════════════
    
    warrior_master_cave: {
        name: 'Warlord Draven',
        class: 'warrior',
        unlocks: 'crypt',
        baseHp: 500,
        baseDamage: 65,
        baseDefense: 40,
        level: 9,
        requiredLevel: 9,
        xp: 500,
        gold: 600,
        description: 'A legendary warlord who has never lost a duel',
        guaranteedDrops: ['excalibur', 'dragon_scale', 'pristine_gem'],
        possibleDrops: ['dragonslayer', 'adamantine_plate', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 }
    },
    
    rogue_master_cave: {
        name: 'Shadow King Erebus',
        class: 'rogue',
        unlocks: 'crypt',
        baseHp: 420,
        baseDamage: 75,
        baseDefense: 28,
        level: 9,
        requiredLevel: 9,
        xp: 500,
        gold: 600,
        description: 'The ruler of all assassins and thieves',
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 }
    },
    
    paladin_master_cave: {
        name: 'Grand Templar Solarius',
        class: 'paladin',
        unlocks: 'crypt',
        baseHp: 480,
        baseDamage: 58,
        baseDefense: 45,
        level: 9,
        requiredLevel: 9,
        xp: 500,
        gold: 600,
        description: 'The highest-ranking paladin of the holy order',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'dragon_scale', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 }
    },
    
    mage_master_cave: {
        name: 'Archmage Chronos',
        class: 'mage',
        unlocks: 'crypt',
        baseHp: 350,
        baseDamage: 85,
        baseDefense: 25,
        level: 9,
        requiredLevel: 9,
        xp: 500,
        gold: 600,
        description: 'A wizard who manipulates time and space',
        guaranteedDrops: ['archmage_staff', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['staff_of_eternity', 'phoenix_robes', 'superior_mana_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 }
    },
    
    cleric_master_cave: {
        name: 'Saint Evangeline',
        class: 'cleric',
        unlocks: 'crypt',
        baseHp: 440,
        baseDamage: 52,
        baseDefense: 38,
        level: 9,
        requiredLevel: 9,
        xp: 500,
        gold: 600,
        description: 'A living saint blessed by the gods themselves',
        guaranteedDrops: ['mjolnir', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 }
    },
    
    ranger_master_cave: {
        name: 'Wilderness Sovereign Artemis',
        class: 'ranger',
        unlocks: 'crypt',
        baseHp: 400,
        baseDamage: 68,
        baseDefense: 32,
        level: 9,
        requiredLevel: 9,
        xp: 500,
        gold: 600,
        description: 'The ultimate hunter who has tracked dragons',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 }
    },

    // ═══════════════════════════════════════════════════════════════
    // CRYPT → VOLCANO MASTERS (Level 12 Required)
    // ═══════════════════════════════════════════════════════════════
    
    warrior_master_crypt: {
        name: 'Immortal Champion Ragnarok',
        class: 'warrior',
        unlocks: 'volcano',
        baseHp: 700,
        baseDamage: 85,
        baseDefense: 50,
        level: 12,
        requiredLevel: 12,
        xp: 800,
        gold: 1000,
        description: 'An immortal warrior who guards the volcano entrance',
        guaranteedDrops: ['dragonslayer', 'adamantine_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['excalibur', 'celestial_plate', 'dragon_heart'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.15, mythic: 0.02 }
    },
    
    rogue_master_crypt: {
        name: 'Void Reaper Null',
        class: 'rogue',
        unlocks: 'volcano',
        baseHp: 600,
        baseDamage: 95,
        baseDefense: 35,
        level: 12,
        requiredLevel: 12,
        xp: 800,
        gold: 1000,
        description: 'An entity that exists between shadows',
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'soul_essence'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.15, mythic: 0.02 }
    },
    
    paladin_master_crypt: {
        name: 'Lightbringer Gabriel',
        class: 'paladin',
        unlocks: 'volcano',
        baseHp: 680,
        baseDamage: 75,
        baseDefense: 55,
        level: 12,
        requiredLevel: 12,
        xp: 800,
        gold: 1000,
        description: 'A celestial warrior sent from the heavens',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'dragon_scale', 'blood_ruby'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.15, mythic: 0.02 }
    },
    
    mage_master_crypt: {
        name: 'Eternal Sage Merlin',
        class: 'mage',
        unlocks: 'volcano',
        baseHp: 500,
        baseDamage: 110,
        baseDefense: 30,
        level: 12,
        requiredLevel: 12,
        xp: 800,
        gold: 1000,
        description: 'The most powerful wizard to ever exist',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'demon_core'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.15, mythic: 0.02 }
    },
    
    cleric_master_crypt: {
        name: 'Divine Oracle Celestia',
        class: 'cleric',
        unlocks: 'volcano',
        baseHp: 620,
        baseDamage: 68,
        baseDefense: 48,
        level: 12,
        requiredLevel: 12,
        xp: 800,
        gold: 1000,
        description: 'A prophet who speaks directly with the gods',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'phylactery'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.15, mythic: 0.02 }
    },
    
    ranger_master_crypt: {
        name: 'Apex Predator Fenrir',
        class: 'ranger',
        unlocks: 'volcano',
        baseHp: 580,
        baseDamage: 88,
        baseDefense: 40,
        level: 12,
        requiredLevel: 12,
        xp: 800,
        gold: 1000,
        description: 'A legendary beast hunter who has slain gods',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['dragonslayer', 'dragon_scale', 'fire_core'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.15, mythic: 0.02 }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLASS_MASTERS };
}
