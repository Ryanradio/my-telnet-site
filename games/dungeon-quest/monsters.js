// monsters.js - Enemy Database
// Add new monsters here to expand the game!

// RARITY SYSTEM:
// common: 60% spawn rate, 1.0x stats, white color
// uncommon: 25% spawn rate, 1.3x stats, green color
// rare: 10% spawn rate, 1.6x stats, blue color
// epic: 4% spawn rate, 2.0x stats, purple color
// legendary: 0.9% spawn rate, 2.5x stats, orange color
// mythic: 0.1% spawn rate, 3.5x stats, red color

const ENEMIES = {
    // ===== LEVEL 1-3 MONSTERS (Forest) =====
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

    // ===== LEVEL 3-5 MONSTERS (Plains) =====
    orc: { 
        name: 'Orc Warrior', 
        baseHp: 60, 
        baseDamage: 15, 
        baseDefense: 8, 
        baseXp: 50, 
        baseGold: 35, 
        level: 3,
        description: 'A brutish warrior with a battle axe',
        possibleDrops: ['health_potion', 'iron_sword', 'leather_armor', 'medium_gem', 'warhammer'],
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.12, epic: 0.05, legendary: 0.01 }
    },
    dire_wolf: { 
        name: 'Dire Wolf', 
        baseHp: 55, 
        baseDamage: 18, 
        baseDefense: 6, 
        baseXp: 45, 
        baseGold: 25, 
        level: 3,
        description: 'An enormous wolf, twice the size of normal',
        possibleDrops: ['health_potion', 'dire_pelt', 'medium_gem'],
        dropRates: { common: 0.4, uncommon: 0.2, rare: 0.08, epic: 0.03 }
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

    // ===== LEVEL 4-7 MONSTERS (Cave) =====
    troll: { 
        name: 'Troll', 
        baseHp: 100, 
        baseDamage: 25, 
        baseDefense: 12, 
        baseXp: 100, 
        baseGold: 80, 
        level: 5,
        description: 'A massive regenerating beast with incredible strength',
        possibleDrops: ['greater_health_potion', 'steel_sword', 'steel_plate', 'large_gem', 'warhammer'],
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.2, epic: 0.1, legendary: 0.03 }
    },
    skeleton_warrior: { 
        name: 'Skeleton Warrior', 
        baseHp: 80, 
        baseDamage: 22, 
        baseDefense: 10, 
        baseXp: 90, 
        baseGold: 60, 
        level: 5,
        description: 'An animated skeleton in rusty armor',
        possibleDrops: ['health_potion', 'bone_dust', 'cursed_sword', 'medium_gem'],
        dropRates: { common: 0.35, uncommon: 0.25, rare: 0.15, epic: 0.08, legendary: 0.02 }
    },
    dark_mage: { 
        name: 'Dark Mage', 
        baseHp: 70, 
        baseDamage: 30, 
        baseDefense: 8, 
        baseXp: 120, 
        baseGold: 100, 
        level: 6,
        description: 'A corrupted spellcaster wielding shadow magic',
        possibleDrops: ['mana_potion', 'greater_mana_potion', 'flame_staff', 'enchanted_robes', 'large_gem'],
        dropRates: { common: 0.25, uncommon: 0.3, rare: 0.2, epic: 0.12, legendary: 0.05 }
    },

    // ===== LEVEL 6-9 MONSTERS (Crypt) =====
    
    crypt_guard: {
    name: 'Crypt Guard',
    baseHp: 90,
    baseDamage: 24,
    baseDefense: 10,
    baseXp: 80,
    baseGold: 60,
    level: 6,
    description: 'An undead sentinel bound to guard the crypt halls.',
    possibleDrops: [],
    dropRates: {}
},

    
    lich: { 
        name: 'Lich', 
        baseHp: 150, 
        baseDamage: 35, 
        baseDefense: 15, 
        baseXp: 200, 
        baseGold: 150, 
        level: 8,
        description: 'An undead sorcerer of terrible power',
        possibleDrops: ['greater_health_potion', 'greater_mana_potion', 'archmage_staff', 'enchanted_robes', 'huge_gem', 'phylactery'],
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.15, legendary: 0.08, mythic: 0.01 }
    },
    death_knight: { 
        name: 'Death Knight', 
        baseHp: 180, 
        baseDamage: 40, 
        baseDefense: 20, 
        baseXp: 250, 
        baseGold: 200, 
        level: 9,
        description: 'A fallen paladin cursed to serve in death',
        possibleDrops: ['greater_health_potion', 'excalibur', 'dragon_scale', 'huge_gem', 'cursed_blade'],
        dropRates: { common: 0.15, uncommon: 0.25, rare: 0.25, epic: 0.18, legendary: 0.1, mythic: 0.02 }
    },
    wraith: { 
        name: 'Wraith', 
        baseHp: 120, 
        baseDamage: 38, 
        baseDefense: 12, 
        baseXp: 220, 
        baseGold: 180, 
        level: 8,
        description: 'A spectral horror that feeds on life force',
        possibleDrops: ['greater_health_potion', 'shadowblade', 'void_armor', 'huge_gem', 'soul_essence'],
        dropRates: { common: 0.2, uncommon: 0.25, rare: 0.25, epic: 0.15, legendary: 0.08, mythic: 0.01 }
    },

    // ===== LEVEL 8-12 MONSTERS (Volcano) =====
    fire_elemental: { 
        name: 'Fire Elemental', 
        baseHp: 200, 
        baseDamage: 45, 
        baseDefense: 18, 
        baseXp: 300, 
        baseGold: 250, 
        level: 10,
        description: 'A being of pure flame and destruction',
        possibleDrops: ['superior_health_potion', 'flame_staff', 'fire_blade', 'huge_gem', 'fire_core'],
        dropRates: { common: 0.15, uncommon: 0.2, rare: 0.25, epic: 0.2, legendary: 0.12, mythic: 0.03 }
    },
    red_dragon: { 
        name: 'Red Dragon', 
        baseHp: 350, 
        baseDamage: 60, 
        baseDefense: 30, 
        baseXp: 500, 
        baseGold: 500, 
        level: 12,
        description: 'An ancient wyrm with scales like rubies',
        possibleDrops: ['superior_health_potion', 'dragonslayer', 'dragon_scale', 'pristine_gem', 'dragon_heart', 'magical_butterknife'],
        dropRates: { common: 0.1, uncommon: 0.15, rare: 0.25, epic: 0.25, legendary: 0.15, mythic: 0.05, butterknife: 0.0001 }
    },
    demon: { 
        name: 'Demon Lord', 
        baseHp: 300, 
        baseDamage: 55, 
        baseDefense: 25, 
        baseXp: 400, 
        baseGold: 400, 
        level: 11,
        description: 'A powerful fiend from the infernal planes',
        possibleDrops: ['superior_health_potion', 'superior_mana_potion', 'demonic_blade', 'demon_leather', 'pristine_gem', 'demon_core'],
        dropRates: { common: 0.12, uncommon: 0.18, rare: 0.25, epic: 0.22, legendary: 0.13, mythic: 0.04 }
    },

    // ===== BONUS MONSTERS =====
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
    ogre: {
        name: 'Ogre',
        baseHp: 120,
        baseDamage: 28,
        baseDefense: 10,
        baseXp: 110,
        baseGold: 90,
        level: 6,
        description: 'A dim-witted giant with a massive club',
        possibleDrops: ['greater_health_potion', 'warhammer', 'steel_plate', 'large_gem'],
        dropRates: { common: 0.3, uncommon: 0.25, rare: 0.18, epic: 0.1, legendary: 0.03 }
    },
    vampire: {
        name: 'Vampire',
        baseHp: 160,
        baseDamage: 42,
        baseDefense: 16,
        baseXp: 240,
        baseGold: 220,
        level: 9,
        description: 'A blood-drinking undead noble',
        possibleDrops: ['greater_health_potion', 'vampire_blade', 'noble_robes', 'huge_gem', 'blood_ruby'],
        dropRates: { common: 0.15, uncommon: 0.25, rare: 0.25, epic: 0.18, legendary: 0.1, mythic: 0.02 }
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

