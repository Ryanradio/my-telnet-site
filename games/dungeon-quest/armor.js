// ═══════════════════════════════════════════════════════════════
// ARMOR DATABASE
// ═══════════════════════════════════════════════════════════════

const ARMOR = {
    // ═══════════════════════════════════════════════════════════════
    // UNARMORED — fallback when no armor is equipped
    // Gives zero defense; player relies solely on character stats
    // ═══════════════════════════════════════════════════════════════
    no_armor: {
        name: 'No Armor',
        baseDefense: 0,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        description: 'You wear no armor. Your body is your only protection.',
        unarmored: true   // flag used to suppress "equipped" badge
    },

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
        baseDefense: 3,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'normal',
        slot: 'armor'
    },
    leather_vest: {
        name: 'Leather Vest',
        baseDefense: 2,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer']
    },
    // LEVEL 2 ARMOR
    padded_armor: {
        name: 'Padded Armor',
        baseDefense: 4,
        baseMagicBonus: 1,
        cost: 200,
        level: 2,
        quality: 'normal',
        slot: 'armor'
    },
    studded_leather: {
        name: 'Studded Leather',
        baseDefense: 5,
        baseMagicBonus: 0,
        cost: 250,
        level: 2,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warrior', 'paladin', 'cleric']
    },
    // LEVEL 3 ARMOR
    hide_armor: {
        name: 'Hide Armor',
        baseDefense: 6,
        baseMagicBonus: 0,
        cost: 350,
        level: 3,
        quality: 'normal',
        slot: 'armor'
    },
    shadow_cloak: {
        name: 'Shadow Cloak',
        baseDefense: 5,
        baseMagicBonus: 0,
        cost: 400,
        level: 3,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer']
    },
    
    // LEVEL 4 ARMOR
    chain_mail: {
        name: 'Chain Mail',
        baseDefense: 5,
        baseMagicBonus: 0,
        cost: 500,
        level: 4,
        quality: 'normal',
        slot: 'armor'
    },
    mage_robes: {
        name: 'Mage Robes',
        baseDefense: 4,
        baseMagicBonus: 6,
        cost: 600,
        level: 4,
        quality: 'normal',
        slot: 'armor'
    },
    
    // LEVEL 6 ARMOR
    scale_armor: {
        name: 'Scale Armor',
        baseDefense: 12,
        baseMagicBonus: 0,
        cost: 1200,
        level: 6,
        quality: 'normal',
        slot: 'armor'
    },
    assassin_garb: {
        name: "Assassin's Garb",
        baseDefense: 10,
        baseMagicBonus: 0,
        cost: 1400,
        level: 6,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer']
    },

    // LEVEL 8 ARMOR
    plate_armor: {
        name: 'Plate Armor',
        baseDefense: 18,
        baseMagicBonus: 0,
        cost: 2200,
        level: 8,
        quality: 'normal',
        slot: 'armor'
    },
    archmage_robes: {
        name: 'Archmage Robes',
        baseDefense: 10,
        baseMagicBonus: 15,
        cost: 2500,
        level: 8,
        quality: 'normal',
        slot: 'armor'
    },
    
    // LEVEL 12 ARMOR
    dragon_scale: {
        name: 'Dragon Scale Armor',
        baseDefense: 30,
        baseMagicBonus: 5,
        cost: 6000,
        level: 12,
        quality: 'normal',
        slot: 'armor'
    },
    
    // LEVEL 16 ARMOR
    divine_plate: {
        name: 'Divine Plate',
        baseDefense: 45,
        baseMagicBonus: 10,
        cost: 13000,
        level: 16,
        quality: 'normal',
        slot: 'armor'
    },
    
    // LEVEL 20 ARMOR
    god_armor: {
        name: 'Armor of the Gods',
        baseDefense: 65,
        baseMagicBonus: 20,
        cost: 28000,
        level: 20,
        quality: 'normal',
        slot: 'armor'
    },
    
    // LEVEL 25 ULTIMATE ARMOR
    genesis_plate: {
        name: 'Genesis Plate',
        baseDefense: 100,
        baseMagicBonus: 50,
        cost: 60000,
        level: 25,
        quality: 'godly',
        slot: 'armor'
    }
};

console.log('✅ Armor loaded:', Object.keys(ARMOR).length, 'pieces');
