// armor.js - Armor Database
// Add new armor here to expand the game!

// QUALITY TIERS (same as weapons):
// poor (grey): -2 to defense
// normal (green): base stats  
// rare (blue): +2 to defense
// epic (purple): +5 to defense
// legendary (orange): +10 to defense
// godly (red): +20 to defense

const ARMOR = {
    // ===== STARTER ARMOR (Level 1) =====
    cloth_armor: { 
        name: 'Cloth Armor', 
        baseDefense: 3, 
        baseMagicBonus: 0,
        cost: 0, 
        level: 1,
        quality: 'poor',
        description: 'Simple cloth garments with minimal protection'
    },
    leather_armor: { 
        name: 'Leather Armor', 
        baseDefense: 6, 
        baseMagicBonus: 0,
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'Tanned hide providing basic defense'
    },
    chainmail: { 
        name: 'Chainmail', 
        baseDefense: 10, 
        baseMagicBonus: 0,
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'Interlocking metal rings for solid protection'
    },
    robes: { 
        name: 'Mage Robes', 
        baseDefense: 4, 
        baseMagicBonus: 5, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'Enchanted robes that enhance magical ability'
    },

    // ===== TIER 2 ARMOR (Level 3-4) =====
    studded_leather: {
        name: 'Studded Leather',
        baseDefense: 12,
        baseMagicBonus: 0,
        cost: 180,
        level: 3,
        quality: 'normal',
        description: 'Leather armor reinforced with metal studs'
    },
    scale_mail: {
        name: 'Scale Mail',
        baseDefense: 15,
        baseMagicBonus: 0,
        cost: 220,
        level: 4,
        quality: 'normal',
        description: 'Overlapping metal scales like dragon hide'
    },
    steel_plate: { 
        name: 'Steel Plate', 
        baseDefense: 18, 
        baseMagicBonus: 0,
        cost: 250, 
        level: 4,
        quality: 'rare',
        description: 'Full plate armor of tempered steel'
    },
    enchanted_robes: { 
        name: 'Enchanted Robes', 
        baseDefense: 12, 
        baseMagicBonus: 20, 
        cost: 350, 
        level: 5,
        quality: 'rare',
        description: 'Robes woven with powerful enchantments'
    },
    shadow_armor: {
        name: 'Shadow Armor',
        baseDefense: 10,
        baseMagicBonus: 8,
        cost: 280,
        level: 4,
        quality: 'rare',
        description: 'Dark leather that blends with shadows'
    },

    // ===== TIER 3 ARMOR (Level 5-7) =====
    mithril_chainmail: {
        name: 'Mithril Chainmail',
        baseDefense: 22,
        baseMagicBonus: 5,
        cost: 400,
        level: 6,
        quality: 'epic',
        description: 'Lightweight magical metal stronger than steel'
    },
    plate_mail: {
        name: 'Plate Mail',
        baseDefense: 25,
        baseMagicBonus: 0,
        cost: 450,
        level: 6,
        quality: 'rare',
        description: 'Heavy full body armor of superior craftsmanship'
    },
    battlemage_robes: {
        name: 'Battlemage Robes',
        baseDefense: 16,
        baseMagicBonus: 28,
        cost: 500,
        level: 7,
        quality: 'epic',
        description: 'Combat robes reinforced with protective wards'
    },
    demon_leather: {
        name: 'Demon Leather',
        baseDefense: 18,
        baseMagicBonus: 12,
        cost: 420,
        level: 6,
        quality: 'epic',
        description: 'Armor crafted from the hide of demons'
    },

    // ===== LEGENDARY ARMOR (Level 8+) =====
    dragon_scale: { 
        name: 'Dragon Scale Armor', 
        baseDefense: 30, 
        baseMagicBonus: 10, 
        cost: 800, 
        level: 10,
        quality: 'legendary',
        description: 'Armor forged from true dragon scales'
    },
    celestial_plate: {
        name: 'Celestial Plate',
        baseDefense: 35,
        baseMagicBonus: 15,
        cost: 900,
        level: 11,
        quality: 'legendary',
        description: 'Holy armor blessed by celestial beings'
    },
    archmage_vestments: {
        name: 'Archmage Vestments',
        baseDefense: 20,
        baseMagicBonus: 40,
        cost: 850,
        level: 10,
        quality: 'legendary',
        description: 'The ultimate robes for master spellcasters'
    },
    void_armor: {
        name: 'Void Armor',
        baseDefense: 28,
        baseMagicBonus: 25,
        cost: 950,
        level: 11,
        quality: 'legendary',
        description: 'Armor that draws power from the void itself'
    },
    adamantine_plate: {
        name: 'Adamantine Plate',
        baseDefense: 40,
        baseMagicBonus: 5,
        cost: 1000,
        level: 12,
        quality: 'legendary',
        description: 'The strongest metal known to mortals'
    },
    phoenix_robes: {
        name: 'Phoenix Robes',
        baseDefense: 22,
        baseMagicBonus: 45,
        cost: 1100,
        level: 12,
        quality: 'legendary',
        description: 'Robes that grant the power of rebirth'
    },

    // ===== CRAFTABLE/DROP ARMOR =====
    noble_robes: {
        name: 'Noble Robes',
        baseDefense: 14,
        baseMagicBonus: 18,
        cost: 350,
        level: 6,
        quality: 'rare',
        description: 'Luxurious robes worn by nobility'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ARMOR };
}

