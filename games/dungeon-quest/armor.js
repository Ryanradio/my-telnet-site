// ═══════════════════════════════════════════════════════════════
// ARMOR DATABASE - REBALANCED
// Physical Defense: Higher for plate, lower for cloth
// Magic Resistance: Higher for casters, lower for warriors
// ═══════════════════════════════════════════════════════════════

const ARMOR = {
    // ═══════════════════════════════════════════════════════════════
    // UNARMORED — fallback when no armor is equipped
    // ═══════════════════════════════════════════════════════════════
    no_armor: {
        name: 'No Armor',
        baseDefense: 0,
        magicResist: 0,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        description: 'You wear no armor. Your body is your only protection.',
        unarmored: true,
        allowedClasses: ['warrior', 'paladin', 'cleric', 'mage', 'warlock', 'archer', 'hunter', 'rogue', 'runesmith']
    },

    // ═══════════════════════════════════════════════════════════════
    // CLOTH ARMOR - Lowest DEF, Highest Magic Resist
    // ═══════════════════════════════════════════════════════════════
    
    // Level 1-4
    cloth_robe: {
        name: 'Cloth Robe',
        baseDefense: 2,
        magicResist: 15,  // 15% magic resistance
        baseMagicBonus: 2,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric']
    },
    
    // Level 5-8
    mage_robes: {
        name: 'Mage Robes',
        baseDefense: 6,
        magicResist: 20,
        baseMagicBonus: 6,
        cost: 600,
        level: 4,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric']
    },
    
    initiates_robe: {
        name: "Initiate's Robe",
        baseDefense: 5,
        magicResist: 18,
        baseMagicBonus: 4,
        cost: 3000,
        level: 5,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "A proper apprentice's robe. Light and magically receptive.",
        isShopItem: true
    },
    
    // Level 9-12
    archmage_robes: {
        name: 'Archmage Robes',
        baseDefense: 12,
        magicResist: 25,
        baseMagicBonus: 15,
        cost: 2500,
        level: 8,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric']
    },
    
    war_robes: {
        name: "War Robes",
        baseDefense: 10,
        magicResist: 22,
        baseMagicBonus: 10,
        cost: 5300,
        level: 7,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Reinforced robes worn by battlemages. Surprisingly protective.",
        isShopItem: true
    },
    
    spellweave_robe: {
        name: "Spellweave Robe",
        baseDefense: 12,
        magicResist: 24,
        baseMagicBonus: 14,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Threads of magical silk woven together to amplify spell power.",
        isShopItem: true
    },
    
    // Level 13-16
    sorcerers_vestment: {
        name: "Sorcerer's Vestment",
        baseDefense: 14,
        magicResist: 28,
        baseMagicBonus: 18,
        cost: 10000,
        level: 10,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "necrolyte", "sorceror", "druid"],
        description: "Stitched with threads of pure mana. Amplifies magical ability considerably.",
        isShopItem: true
    },
    
    void_silk_robe: {
        name: "Void Silk Robe",
        baseDefense: 16,
        magicResist: 30,
        baseMagicBonus: 25,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Woven from silk harvested in the void planes. Shimmers unnaturally.",
        isShopItem: true
    },
    
    // Level 17-20
    celestial_robes: {
        name: "Celestial Robes",
        baseDefense: 18,
        magicResist: 32,
        baseMagicBonus: 36,
        cost: 26500,
        level: 17,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Stitched from starlight itself. Barely weighs anything.",
        isShopItem: true
    },
    
    // Level 21-25
    oblivion_robes: {
        name: "Oblivion Robes",
        baseDefense: 22,
        magicResist: 35,
        baseMagicBonus: 40,
        cost: 32700,
        level: 19,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Made from fabric that exists between dimensions. Nearly indestructible.",
        isShopItem: true
    },
    
    eclipse_robes: {
        name: "Eclipse Robes",
        baseDefense: 20,
        magicResist: 33,
        baseMagicBonus: 30,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Created during a solar eclipse. Light bends around the wearer.",
        isShopItem: true
    },

    // ═══════════════════════════════════════════════════════════════
    // LEATHER ARMOR - Medium DEF, Low Magic Resist
    // ═══════════════════════════════════════════════════════════════
    
    // Level 1-4
    leather_armor: {
        name: 'Leather Armor',
        baseDefense: 4,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },
    
    leather_vest: {
        name: 'Leather Vest',
        baseDefense: 3,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },
    
    padded_armor: {
        name: 'Padded Armor',
        baseDefense: 5,
        magicResist: 5,
        baseMagicBonus: 1,
        cost: 200,
        level: 2,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },
    
    hide_armor: {
        name: 'Hide Armor',
        baseDefense: 7,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 350,
        level: 3,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },
    
    // Level 5-8
    reinforced_leather: {
        name: "Reinforced Leather",
        baseDefense: 10,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 3000,
        level: 5,
        quality: "normal",
        slot: "armor",
        description: "Leather hardened with metal rivets for better protection.",
        isShopItem: true,
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },
    
    shadow_leather: {
        name: "Shadow Leather",
        baseDefense: 14,
        magicResist: 8,
        baseMagicBonus: 0,
        cost: 5300,
        level: 7,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Dyed black, this leather armor muffles sound and hides the wearer.",
        isShopItem: true
    },
    
    // Level 9-12
    nightweave_cloak: {
        name: "Nightweave Cloak",
        baseDefense: 18,
        magicResist: 10,
        baseMagicBonus: 2,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Woven from the silk of cave spiders. Near-invisible in darkness.",
        isShopItem: true
    },
    
    phantom_leathers: {
        name: "Phantom Leathers",
        baseDefense: 22,
        magicResist: 10,
        baseMagicBonus: 0,
        cost: 10000,
        level: 10,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Cured in shadow-water. The wearer seems to drift rather than walk.",
        isShopItem: true
    },
    
    // Level 13-16
    voidstep_leathers: {
        name: "Voidstep Leathers",
        baseDefense: 26,
        magicResist: 12,
        baseMagicBonus: 2,
        cost: 11900,
        level: 11,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Treated with void essence. Steps leave no sound.",
        isShopItem: true
    },
    
    wraithskin_armor: {
        name: "Wraithskin Armor",
        baseDefense: 30,
        magicResist: 15,
        baseMagicBonus: 2,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Crafted from the shed skin of a wraith. Unnervingly weightless.",
        isShopItem: true
    },
    
    // Level 17-20
    deathweave_leathers: {
        name: "Deathweave Leathers",
        baseDefense: 34,
        magicResist: 15,
        baseMagicBonus: 3,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Made from the hide of a death beast. The wearer becomes harder to target.",
        isShopItem: true
    },
    
    abyssal_leathers: {
        name: "Abyssal Leathers",
        baseDefense: 38,
        magicResist: 18,
        baseMagicBonus: 4,
        cost: 26500,
        level: 17,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Cured in the deepest part of the abyss. Resists all forms of damage.",
        isShopItem: true
    },
    
    // Level 21-25
    phantom_garb: {
        name: "Phantom Garb",
        baseDefense: 42,
        magicResist: 20,
        baseMagicBonus: 5,
        cost: 32700,
        level: 19,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "The wearer becomes partially incorporeal. Strikes pass through.",
        isShopItem: true
    },

    // ═══════════════════════════════════════════════════════════════
    // STUDDED LEATHER - Medium-High DEF, Low Magic Resist
    // ═══════════════════════════════════════════════════════════════
    
    studded_leather: {
        name: 'Studded Leather',
        baseDefense: 8,
        magicResist: 3,
        baseMagicBonus: 0,
        cost: 250,
        level: 2,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warrior', 'paladin']
    },
    
    assassin_garb: {
        name: "Assassin's Garb",
        baseDefense: 12,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 1400,
        level: 6,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Light armor that allows swift movement and hiding."
    },
    
    // Level 13-16
    dusk_leathers: {
        name: "Dusk Leathers",
        baseDefense: 24,
        magicResist: 8,
        baseMagicBonus: 0,
        cost: 14000,
        level: 12,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "Leather treated to blend into twilight shadows.",
        isShopItem: true
    },
    
    // Level 17-20
    shadowmeld_armor: {
        name: "Shadowmeld Armor",
        baseDefense: 32,
        magicResist: 10,
        baseMagicBonus: 0,
        cost: 22000,
        level: 16,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer", "warlock"],
        description: "The wearer seems to flicker between shadows.",
        isShopItem: true
    },

    // ═══════════════════════════════════════════════════════════════
    // CHAIN MAIL - High DEF, Very Low Magic Resist
    // ═══════════════════════════════════════════════════════════════
    
    chain_mail: {
        name: 'Chain Mail',
        baseDefense: 12,
        magicResist: 2,
        baseMagicBonus: 0,
        cost: 500,
        level: 4,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin']
    },
    
    scale_armor: {
        name: 'Scale Armor',
        baseDefense: 16,
        magicResist: 2,
        baseMagicBonus: 0,
        cost: 1200,
        level: 6,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin']
    },
    
    runescarred_chain: {
        name: "Runescarred Chain",
        baseDefense: 24,
        magicResist: 8,  // Runes give some protection
        baseMagicBonus: 4,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith", "cleric", "warrior", "paladin"],
        description: "Heavy chain mail scarred with battle runes. Protective and empowering.",
        isShopItem: true
    },
    
    // Level 13-16
    darksteel_chain: {
        name: "Darksteel Chain",
        baseDefense: 32,
        magicResist: 3,
        baseMagicBonus: 0,
        cost: 18000,
        level: 14,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Forged from darksteel, stronger than ordinary chain.",
        isShopItem: true
    },
    
    // Level 17-20
    rune_hauberk: {
        name: "Rune Hauberk",
        baseDefense: 38,
        magicResist: 10,
        baseMagicBonus: 6,
        cost: 22000,
        level: 16,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith", "warrior", "paladin"],
        description: "A masterwork hauberk covered in power runes.",
        isShopItem: true
    },

    // ═══════════════════════════════════════════════════════════════
    // PLATE ARMOR - Highest DEF, No Magic Resist
    // ═══════════════════════════════════════════════════════════════
    
    plate_armor: {
        name: 'Plate Armor',
        baseDefense: 22,
        magicResist: 0,
        baseMagicBonus: 0,
        cost: 2200,
        level: 8,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin']
    },
    
    dread_plate: {
        name: "Dread Plate",
        baseDefense: 28,
        magicResist: 0,
        baseMagicBonus: 0,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Heavy plate inscribed with terrifying visages to demoralize foes.",
        isShopItem: true
    },
    
    darksteel_plate: {
        name: "Darksteel Plate",
        baseDefense: 42,
        magicResist: 0,
        baseMagicBonus: 0,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Forged from darksteel ore found only in deep dungeons.",
        isShopItem: true
    },
    
    titan_plate: {
        name: "Titan Plate",
        baseDefense: 52,
        magicResist: 0,
        baseMagicBonus: 0,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Plate armor forged from titanite. Heaviest armor in the mortal realm.",
        isShopItem: true
    },
    
    divine_plate: {
        name: 'Divine Plate',
        baseDefense: 58,
        magicResist: 5,  // Divine blessing gives slight resist
        baseMagicBonus: 10,
        cost: 13000,
        level: 16,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'cleric']
    },
    
    void_plate: {
        name: "Void Plate",
        baseDefense: 68,
        magicResist: 0,
        baseMagicBonus: 5,
        cost: 29500,
        level: 18,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin", "runesmith"],
        description: "Forged in void-fire. Attacks seem to pass through it.",
        isShopItem: true
    },
    
    genesis_plate: {
        name: 'Genesis Plate',
        baseDefense: 84,
        magicResist: 0,
        baseMagicBonus: 50,
        cost: 60000,
        level: 25,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'cleric', 'runesmith']
    }
};

console.log('✅ Armor loaded:', Object.keys(ARMOR).length, 'pieces');