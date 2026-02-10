// ═══════════════════════════════════════════════════════════════
// ARMOR DATABASE
// ═══════════════════════════════════════════════════════════════

const ARMOR = {
    // LEVEL 1 STARTER ARMOR
    cloth_robe: {
        name: 'Cloth Robe',
        baseDefense: 1,
        baseMagicBonus: 2,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor'
    },
    leather_armor: {
        name: 'Leather Armor',
        baseDefense: 2,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'normal',
        slot: 'armor'
    },
    
    // LEVEL 4 ARMOR
    chain_mail: {
        name: 'Chain Mail',
        baseDefense: 8,
        baseMagicBonus: 0,
        cost: 200,
        level: 4,
        quality: 'normal',
        slot: 'armor'
    },
    mage_robes: {
        name: 'Mage Robes',
        baseDefense: 4,
        baseMagicBonus: 6,
        cost: 220,
        level: 4,
        quality: 'rare',
        slot: 'armor'
    },
    
    // LEVEL 8 ARMOR
    plate_armor: {
        name: 'Plate Armor',
        baseDefense: 18,
        baseMagicBonus: 0,
        cost: 800,
        level: 8,
        quality: 'normal',
        slot: 'armor'
    },
    archmage_robes: {
        name: 'Archmage Robes',
        baseDefense: 10,
        baseMagicBonus: 15,
        cost: 900,
        level: 8,
        quality: 'epic',
        slot: 'armor'
    },
    
    // LEVEL 12 ARMOR
    dragon_scale: {
        name: 'Dragon Scale Armor',
        baseDefense: 30,
        baseMagicBonus: 5,
        cost: 2000,
        level: 12,
        quality: 'epic',
        slot: 'armor'
    },
    
    // LEVEL 16 ARMOR
    divine_plate: {
        name: 'Divine Plate',
        baseDefense: 45,
        baseMagicBonus: 10,
        cost: 4000,
        level: 16,
        quality: 'legendary',
        slot: 'armor'
    },
    
    // LEVEL 20 ARMOR
    god_armor: {
        name: 'Armor of the Gods',
        baseDefense: 65,
        baseMagicBonus: 20,
        cost: 8000,
        level: 20,
        quality: 'legendary',
        slot: 'armor'
    },
    
    // LEVEL 25 ULTIMATE ARMOR
    genesis_plate: {
        name: 'Genesis Plate',
        baseDefense: 100,
        baseMagicBonus: 50,
        cost: 20000,
        level: 25,
        quality: 'godly',
        slot: 'armor'
    }
};

console.log('✅ Armor loaded:', Object.keys(ARMOR).length, 'pieces');
