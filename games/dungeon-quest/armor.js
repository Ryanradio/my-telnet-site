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
    },
    // Lv5 NEW ARMOR ══════════════════════════════
    reinforced_leather: {
        name: "Reinforced Leather",
        baseDefense: 8,
        baseMagicBonus: 0,
        cost: 3000,
        level: 5,
        quality: "normal",
        slot: "armor",
        description: "Leather hardened with metal rivets for better protection.",
        isShopItem: true
    },
    initiates_robe: {
        name: "Initiate's Robe",
        baseDefense: 4,
        baseMagicBonus: 4,
        cost: 3000,
        level: 5,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "A proper apprentice's robe. Light and magically receptive.",
        isShopItem: true
    },
    // Lv7 NEW ARMOR ══════════════════════════════
    shadow_leather: {
        name: "Shadow Leather",
        baseDefense: 13,
        baseMagicBonus: 0,
        cost: 5300,
        level: 7,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Dyed black, this leather armor muffles sound and hides the wearer.",
        isShopItem: true
    },
    war_robes: {
        name: "War Robes",
        baseDefense: 9,
        baseMagicBonus: 10,
        cost: 5300,
        level: 7,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Reinforced robes worn by battlemages. Surprisingly protective.",
        isShopItem: true
    },
    runeforged_vest: {
        name: "Runeforged Vest",
        baseDefense: 14,
        baseMagicBonus: 3,
        cost: 5300,
        level: 7,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith"],
        description: "A chain vest etched with protective runes. The runesmith's trademark.",
        isShopItem: true
    },
    battle_surcoat: {
        name: "Battle Surcoat",
        baseDefense: 15,
        baseMagicBonus: 0,
        cost: 5300,
        level: 7,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "A reinforced surcoat worn over chain. Protects vital organs.",
        isShopItem: true
    },
    // Lv9 NEW ARMOR ══════════════════════════════
    nightweave_cloak: {
        name: "Nightweave Cloak",
        baseDefense: 16,
        baseMagicBonus: 2,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Woven from the silk of cave spiders. Near-invisible in darkness.",
        isShopItem: true
    },
    spellweave_robe: {
        name: "Spellweave Robe",
        baseDefense: 11,
        baseMagicBonus: 14,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Threads of magical silk woven together to amplify spell power.",
        isShopItem: true
    },
    dread_plate: {
        name: "Dread Plate",
        baseDefense: 22,
        baseMagicBonus: 0,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Heavy plate inscribed with terrifying visages to demoralize foes.",
        isShopItem: true
    },
    runescarred_chain: {
        name: "Runescarred Chain",
        baseDefense: 18,
        baseMagicBonus: 4,
        cost: 8300,
        level: 9,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith", "cleric"],
        description: "Heavy chain mail scarred with battle runes. Protective and empowering.",
        isShopItem: true
    },
    // Lv10 NEW ARMOR ══════════════════════════════
    sorcerers_vestment: {
        name: "Sorcerer's Vestment",
        baseDefense: 12,
        baseMagicBonus: 18,
        cost: 10000,
        level: 10,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "necrolyte", "sorceror", "druid"],
        description: "Stitched with threads of pure mana. Amplifies magical ability considerably.",
        isShopItem: true
    },
    phantom_leathers: {
        name: "Phantom Leathers",
        baseDefense: 18,
        baseMagicBonus: 0,
        cost: 10000,
        level: 10,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Cured in shadow-water. The wearer seems to drift rather than walk.",
        isShopItem: true
    },
    // Lv11 NEW ARMOR ══════════════════════════════
    imbued_robe: {
        name: "Imbued Robe",
        baseDefense: 13,
        baseMagicBonus: 20,
        cost: 11900,
        level: 11,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Soaked in magical reagents over many months. Dense with arcane power.",
        isShopItem: true
    },
    voidstep_leathers: {
        name: "Voidstep Leathers",
        baseDefense: 20,
        baseMagicBonus: 2,
        cost: 11900,
        level: 11,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Treated with void essence. Steps leave no sound.",
        isShopItem: true
    },
    rune_hauberk: {
        name: "Rune Hauberk",
        baseDefense: 24,
        baseMagicBonus: 6,
        cost: 11900,
        level: 11,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith"],
        description: "A masterwork hauberk covered in power runes. The runesmith's mid-game armor.",
        isShopItem: true
    },
    // Lv13 NEW ARMOR ══════════════════════════════
    void_silk_robe: {
        name: "Void Silk Robe",
        baseDefense: 16,
        baseMagicBonus: 25,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Woven from silk harvested in the void planes. Shimmers unnaturally.",
        isShopItem: true
    },
    wraithskin_armor: {
        name: "Wraithskin Armor",
        baseDefense: 26,
        baseMagicBonus: 2,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Crafted from the shed skin of a wraith. Unnervingly weightless.",
        isShopItem: true
    },
    darksteel_plate: {
        name: "Darksteel Plate",
        baseDefense: 36,
        baseMagicBonus: 0,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Forged from darksteel ore found only in deep dungeons.",
        isShopItem: true
    },
    etched_scale: {
        name: "Etched Scale Armor",
        baseDefense: 33,
        baseMagicBonus: 5,
        cost: 16100,
        level: 13,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith", "cleric", "warrior"],
        description: "Dragon scales etched with runes of protection. Versatile and powerful.",
        isShopItem: true
    },
    // Lv15 NEW ARMOR ══════════════════════════════
    eclipse_robes: {
        name: "Eclipse Robes",
        baseDefense: 19,
        baseMagicBonus: 30,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Created during a solar eclipse. Light bends around the wearer.",
        isShopItem: true
    },
    deathweave_leathers: {
        name: "Deathweave Leathers",
        baseDefense: 30,
        baseMagicBonus: 3,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Made from the hide of a death beast. The wearer becomes harder to target.",
        isShopItem: true
    },
    titan_plate: {
        name: "Titan Plate",
        baseDefense: 42,
        baseMagicBonus: 0,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin"],
        description: "Plate armor forged from titanite. Heaviest armor in the mortal realm.",
        isShopItem: true
    },
    runeplate: {
        name: "Runeplate",
        baseDefense: 38,
        baseMagicBonus: 8,
        cost: 21000,
        level: 15,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["runesmith"],
        description: "The runesmith's pinnacle armor. Every surface covered in active runes.",
        isShopItem: true
    },
    // Lv17 NEW ARMOR ══════════════════════════════
    celestial_robes: {
        name: "Celestial Robes",
        baseDefense: 22,
        baseMagicBonus: 36,
        cost: 26500,
        level: 17,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Stitched from starlight itself. Barely weighs anything.",
        isShopItem: true
    },
    abyssal_leathers: {
        name: "Abyssal Leathers",
        baseDefense: 36,
        baseMagicBonus: 4,
        cost: 26500,
        level: 17,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "Cured in the deepest part of the abyss. Resists all forms of damage.",
        isShopItem: true
    },
    // Lv18 NEW ARMOR ══════════════════════════════
    void_plate: {
        name: "Void Plate",
        baseDefense: 55,
        baseMagicBonus: 5,
        cost: 29500,
        level: 18,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["warrior", "paladin", "runesmith"],
        description: "Forged in void-fire. Attacks seem to pass through it.",
        isShopItem: true
    },
    // Lv19 NEW ARMOR ══════════════════════════════
    oblivion_robes: {
        name: "Oblivion Robes",
        baseDefense: 24,
        baseMagicBonus: 40,
        cost: 32700,
        level: 19,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["mage", "warlock", "cleric", "acolyte", "necrolyte", "druid", "sorceror"],
        description: "Made from fabric that exists between dimensions. Nearly indestructible.",
        isShopItem: true
    },
    phantom_garb: {
        name: "Phantom Garb",
        baseDefense: 40,
        baseMagicBonus: 5,
        cost: 32700,
        level: 19,
        quality: "normal",
        slot: "armor",
        allowedClasses: ["rogue", "ranger", "hunter", "archer"],
        description: "The wearer becomes partially incorporeal. Strikes pass through.",
        isShopItem: true
    }
};

console.log('✅ Armor loaded:', Object.keys(ARMOR).length, 'pieces');
