// ═══════════════════════════════════════════════════════════════
// ARMOR DATABASE - COMPLETELY REWRITTEN
// Proper class restrictions and balanced defense values
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

    // ======================================================
    // CLOTH ARMOR - Very Low DEF, Very High MAGIC
    // Mages, Warlocks, Clerics (pure casters)
    // DEF: 2-25, MAG: 2-60
    // ======================================================
    cloth_robe: {
        name: 'Cloth Robe',
        baseDefense: 2,
        magicResist: 15,
        baseMagicBonus: 2,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric']
    },

    initiate_robe: {
        name: "Initiate's Robe",
        baseDefense: 3,
        magicResist: 18,
        baseMagicBonus: 5,
        cost: 150,
        level: 2,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "A proper apprentice's robe. Light and magically receptive."
    },

    mage_robes: {
        name: 'Mage Robes',
        baseDefense: 4,
        magicResist: 20,
        baseMagicBonus: 8,
        cost: 600,
        level: 4,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric']
    },

    war_robes: {
        name: "War Robes",
        baseDefense: 6,
        magicResist: 22,
        baseMagicBonus: 12,
        cost: 800,
        level: 6,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Reinforced robes worn by battlemages."
    },

    archmage_robes: {
        name: 'Archmage Robes',
        baseDefense: 8,
        magicResist: 25,
        baseMagicBonus: 18,
        cost: 2500,
        level: 8,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric']
    },

    spellweave_robe: {
        name: "Spellweave Robe",
        baseDefense: 10,
        magicResist: 27,
        baseMagicBonus: 24,
        cost: 4000,
        level: 10,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Threads of magical silk woven together."
    },

    void_silk_robe: {
        name: "Void Silk Robe",
        baseDefense: 12,
        magicResist: 30,
        baseMagicBonus: 30,
        cost: 8000,
        level: 12,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Woven from silk harvested in the void planes."
    },

    eclipse_robes: {
        name: "Eclipse Robes",
        baseDefense: 15,
        magicResist: 32,
        baseMagicBonus: 36,
        cost: 12000,
        level: 14,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Created during a solar eclipse."
    },

    celestial_robes: {
        name: "Celestial Robes",
        baseDefense: 18,
        magicResist: 35,
        baseMagicBonus: 42,
        cost: 18000,
        level: 16,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Stitched from starlight itself."
    },

    oblivion_robes: {
        name: "Oblivion Robes",
        baseDefense: 22,
        magicResist: 38,
        baseMagicBonus: 48,
        cost: 25000,
        level: 18,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Made from fabric that exists between dimensions."
    },

    cosmic_robes: {
        name: "Cosmic Robes",
        baseDefense: 25,
        magicResist: 40,
        baseMagicBonus: 55,
        cost: 35000,
        level: 20,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Woven from the fabric of space itself."
    },

    infinity_robes: {
        name: "Infinity Robes",
        baseDefense: 28,
        magicResist: 45,
        baseMagicBonus: 65,
        cost: 50000,
        level: 22,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "Endless patterns shift across its surface."
    },

    genesis_robes: {
        name: "Genesis Robes",
        baseDefense: 32,
        magicResist: 50,
        baseMagicBonus: 75,
        cost: 75000,
        level: 25,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['mage', 'warlock', 'cleric'],
        description: "The first robes ever woven."
    },

    // ======================================================
    // LEATHER ARMOR - Medium DEF, Low MAGIC
    // Rogues, Rangers, Hunters, Clerics (battle clerics)
    // DEF: 4-45, MAG: 0-5
    // ======================================================
    leather_vest: {
        name: 'Leather Vest',
        baseDefense: 4,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },

    leather_armor: {
        name: 'Leather Armor',
        baseDefense: 6,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 100,
        level: 1,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },

    padded_armor: {
        name: 'Padded Armor',
        baseDefense: 8,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 200,
        level: 2,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },

    hide_armor: {
        name: 'Hide Armor',
        baseDefense: 10,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 350,
        level: 3,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric']
    },

    reinforced_leather: {
        name: "Reinforced Leather",
        baseDefense: 14,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 800,
        level: 5,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'cleric'],
        description: "Leather hardened with metal rivets."
    },

    shadow_leather: {
        name: "Shadow Leather",
        baseDefense: 18,
        magicResist: 8,
        baseMagicBonus: 0,
        cost: 2000,
        level: 7,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Dyed black, this armor muffles sound."
    },

    nightweave_cloak: {
        name: "Nightweave Cloak",
        baseDefense: 22,
        magicResist: 10,
        baseMagicBonus: 0,
        cost: 4000,
        level: 9,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Woven from the silk of cave spiders."
    },

    phantom_leathers: {
        name: "Phantom Leathers",
        baseDefense: 26,
        magicResist: 10,
        baseMagicBonus: 0,
        cost: 6000,
        level: 11,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "The wearer seems to drift rather than walk."
    },

    dusk_leathers: {
        name: "Dusk Leathers",
        baseDefense: 30,
        magicResist: 10,
        baseMagicBonus: 0,
        cost: 9000,
        level: 13,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Blends into twilight shadows."
    },

    deathweave_leathers: {
        name: "Deathweave Leathers",
        baseDefense: 34,
        magicResist: 12,
        baseMagicBonus: 0,
        cost: 14000,
        level: 15,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Made from the hide of a death beast."
    },

    shadowmeld_armor: {
        name: "Shadowmeld Armor",
        baseDefense: 38,
        magicResist: 15,
        baseMagicBonus: 2,
        cost: 20000,
        level: 17,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "The wearer seems to flicker between shadows."
    },

    abyssal_leathers: {
        name: "Abyssal Leathers",
        baseDefense: 42,
        magicResist: 18,
        baseMagicBonus: 3,
        cost: 28000,
        level: 19,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Cured in the deepest part of the abyss."
    },

    phantom_garb: {
        name: "Phantom Garb",
        baseDefense: 45,
        magicResist: 20,
        baseMagicBonus: 5,
        cost: 38000,
        level: 21,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "The wearer becomes partially incorporeal."
    },

    // ======================================================
    // STUDDED LEATHER - Medium-High DEF, No MAGIC
    // Rogues, Rangers, Warriors (light fighters)
    // DEF: 8-48, MAG: 0
    // ======================================================
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

    reinforced_studded: {
        name: "Reinforced Studded",
        baseDefense: 14,
        magicResist: 3,
        baseMagicBonus: 0,
        cost: 800,
        level: 4,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warrior', 'paladin'],
        description: "Extra metal studs provide better protection."
    },

    assassin_garb: {
        name: "Assassin's Garb",
        baseDefense: 20,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 2000,
        level: 6,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warlock'],
        description: "Light armor that allows swift movement."
    },

    spiked_leather: {
        name: "Spiked Leather",
        baseDefense: 26,
        magicResist: 5,
        baseMagicBonus: 0,
        cost: 4000,
        level: 8,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warrior'],
        description: "Dangerous spikes discourage close combat."
    },

    night_stalker_gear: {
        name: "Night Stalker Gear",
        baseDefense: 32,
        magicResist: 8,
        baseMagicBonus: 0,
        cost: 8000,
        level: 10,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer'],
        description: "Perfect for those who hunt in darkness."
    },

    barbed_armor: {
        name: "Barbed Armor",
        baseDefense: 38,
        magicResist: 8,
        baseMagicBonus: 0,
        cost: 15000,
        level: 12,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warrior'],
        description: "Barbs dig into anyone who gets too close."
    },

    razorhide: {
        name: "Razorhide",
        baseDefense: 44,
        magicResist: 10,
        baseMagicBonus: 0,
        cost: 25000,
        level: 14,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer', 'warrior'],
        description: "Treated with alchemical agents that sharpen the hide."
    },

    void_stalker_gear: {
        name: "Void Stalker Gear",
        baseDefense: 48,
        magicResist: 12,
        baseMagicBonus: 0,
        cost: 40000,
        level: 16,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['rogue', 'ranger', 'hunter', 'archer'],
        description: "Touched by void essence. Deadly and silent."
    },

    // ======================================================
    // CHAIN ARMOR - High DEF, Low MAGIC
    // Warriors, Paladins (medium fighters)
    // DEF: 12-65, MAG: 0-6
    // ======================================================
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
        baseDefense: 18,
        magicResist: 2,
        baseMagicBonus: 0,
        cost: 1200,
        level: 6,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin']
    },

    reinforced_chain: {
        name: "Reinforced Chain",
        baseDefense: 24,
        magicResist: 3,
        baseMagicBonus: 0,
        cost: 2500,
        level: 8,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Double-layered chain for extra protection."
    },

    runescarred_chain: {
        name: "Runescarred Chain",
        baseDefense: 30,
        magicResist: 6,
        baseMagicBonus: 3,
        cost: 5000,
        level: 10,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'runesmith'],
        description: "Heavy chain mail scarred with battle runes."
    },

    darksteel_chain: {
        name: "Darksteel Chain",
        baseDefense: 36,
        magicResist: 4,
        baseMagicBonus: 0,
        cost: 8000,
        level: 12,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Forged from darksteel, stronger than ordinary chain."
    },

    mithril_chain: {
        name: "Mithril Chain",
        baseDefense: 42,
        magicResist: 8,
        baseMagicBonus: 2,
        cost: 14000,
        level: 14,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'runesmith'],
        description: "Light yet incredibly strong mithril links."
    },

    rune_hauberk: {
        name: "Rune Hauberk",
        baseDefense: 48,
        magicResist: 10,
        baseMagicBonus: 4,
        cost: 22000,
        level: 16,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'runesmith'],
        description: "A masterwork hauberk covered in power runes."
    },

    dragonscale_chain: {
        name: "Dragonscale Chain",
        baseDefense: 55,
        magicResist: 12,
        baseMagicBonus: 5,
        cost: 35000,
        level: 18,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Chain mail woven with actual dragon scales."
    },

    eternal_chain: {
        name: "Eternal Chain",
        baseDefense: 60,
        magicResist: 12,
        baseMagicBonus: 4,
        cost: 50000,
        level: 20,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Each link is enchanted to last forever."
    },

    void_chain: {
        name: "Void Chain",
        baseDefense: 65,
        magicResist: 15,
        baseMagicBonus: 6,
        cost: 75000,
        level: 22,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'runesmith'],
        description: "Forged in the void between stars."
    },

    // ======================================================
    // PLATE ARMOR - Highest DEF, Minimal MAGIC
    // Warriors, Paladins (heavy fighters)
    // DEF: 22-95, MAG: 0-10
    // ======================================================
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
        cost: 4000,
        level: 9,
        quality: 'normal',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Inscribed with terrifying visages."
    },

    full_plate: {
        name: "Full Plate",
        baseDefense: 35,
        magicResist: 0,
        baseMagicBonus: 0,
        cost: 7000,
        level: 10,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Complete coverage from head to toe."
    },

    darksteel_plate: {
        name: "Darksteel Plate",
        baseDefense: 42,
        magicResist: 2,
        baseMagicBonus: 0,
        cost: 12000,
        level: 12,
        quality: 'rare',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Forged from darksteel ore."
    },

    titan_plate: {
        name: "Titan Plate",
        baseDefense: 50,
        magicResist: 2,
        baseMagicBonus: 0,
        cost: 18000,
        level: 14,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Forged from titanite. Incredibly heavy."
    },

    divine_plate: {
        name: 'Divine Plate',
        baseDefense: 58,
        magicResist: 5,
        baseMagicBonus: 5,
        cost: 25000,
        level: 16,
        quality: 'epic',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Blessed by the gods themselves."
    },

    void_plate: {
        name: "Void Plate",
        baseDefense: 66,
        magicResist: 5,
        baseMagicBonus: 3,
        cost: 35000,
        level: 18,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'runesmith'],
        description: "Forged in void-fire. Attacks seem to pass through it."
    },

    eternal_plate: {
        name: "Eternal Plate",
        baseDefense: 74,
        magicResist: 8,
        baseMagicBonus: 4,
        cost: 50000,
        level: 20,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Time has no effect on this armor."
    },

    primordial_plate: {
        name: "Primordial Plate",
        baseDefense: 82,
        magicResist: 8,
        baseMagicBonus: 5,
        cost: 75000,
        level: 22,
        quality: 'legendary',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "From before the age of gods."
    },

    genesis_plate: {
        name: 'Genesis Plate',
        baseDefense: 90,
        magicResist: 10,
        baseMagicBonus: 8,
        cost: 100000,
        level: 24,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin', 'runesmith'],
        description: "The first plate armor ever forged."
    },

    god_plate: {
        name: 'God Plate',
        baseDefense: 95,
        magicResist: 12,
        baseMagicBonus: 10,
        cost: 150000,
        level: 25,
        quality: 'godly',
        slot: 'armor',
        allowedClasses: ['warrior', 'paladin'],
        description: "Armor worthy of a deity."
    },

    // ======================================================
    // SPECIAL ARMOR - Unique items (already in your game)
    // Keeping all existing special items
    // ======================================================
    dragon_scale_cloak: {
        name: 'Dragon Scale Cloak',
        slot: 'armor',
        baseDefense: 8,
        magicResist: 10,
        baseMagicBonus: 4,
        level: 6,
        quality: 'rare',
        description: 'Woven from the scales of a young dragon.',
        allowedClasses: ['warrior', 'rogue', 'ranger', 'hunter', 'paladin', 'cleric'],
        cost: 1200,
        sellValue: 600
    },

    dragonhide_gloves: {
        name: 'Dragonhide Gloves',
        slot: 'armor',
        baseDefense: 6,
        magicResist: 5,
        baseMagicBonus: 2,
        level: 7,
        quality: 'rare',
        description: 'Gloves made from treated dragonhide.',
        allowedClasses: ['warrior', 'rogue', 'ranger', 'hunter', 'paladin', 'cleric'],
        cost: 900,
        sellValue: 450
    },

    drake_scale_vest: {
        name: 'Drake Scale Vest',
        slot: 'armor',
        baseDefense: 24,
        magicResist: 8,
        baseMagicBonus: 2,
        level: 8,
        quality: 'epic',
        description: 'Chestpiece made of interlocking drake scales.',
        allowedClasses: ['warrior', 'paladin', 'ranger', 'hunter', 'cleric'],
        cost: 2800,
        sellValue: 1400
    },

    dragonscale_armor: {
        name: 'Dragonscale Armor',
        slot: 'armor',
        baseDefense: 45,
        magicResist: 15,
        baseMagicBonus: 8,
        level: 14,
        quality: 'legendary',
        description: 'Armor from a mature dragon. Grants fire resistance.',
        allowedClasses: ['warrior', 'paladin'],
        cost: 15000,
        sellValue: 7500
    },

    dragonbone_helm: {
        name: 'Dragonbone Helm',
        slot: 'armor',
        baseDefense: 18,
        magicResist: 10,
        baseMagicBonus: 5,
        level: 15,
        quality: 'epic',
        description: 'A helm carved from dragon skull.',
        allowedClasses: ['warrior', 'paladin', 'ranger'],
        cost: 8000,
        sellValue: 4000
    },

    wyrmhide_boots: {
        name: 'Wyrmhide Boots',
        slot: 'armor',
        baseDefense: 12,
        magicResist: 8,
        baseMagicBonus: 3,
        level: 13,
        quality: 'legendary',
        description: 'Boots made from wyrm hide.',
        allowedClasses: ['warrior', 'rogue', 'ranger', 'hunter', 'paladin'],
        cost: 6000,
        sellValue: 3000
    },

    ancient_dragonscale_armor: {
        name: 'Ancient Dragonscale Armor',
        slot: 'armor',
        baseDefense: 72,
        magicResist: 25,
        baseMagicBonus: 15,
        level: 23,
        quality: 'godly',
        description: 'Armor from an ancient dragon.',
        allowedClasses: ['warrior', 'paladin'],
        cost: 45000,
        sellValue: 22500
    },

    dragon_crown: {
        name: 'Dragon Crown',
        slot: 'armor',
        baseDefense: 12,
        magicResist: 20,
        baseMagicBonus: 20,
        level: 24,
        quality: 'godly',
        description: 'A crown of dragon bone and gold.',
        allowedClasses: ['warrior', 'paladin', 'mage', 'warlock'],
        cost: 30000,
        sellValue: 15000
    },

    dragonheart_amulet: {
        name: 'Dragonheart Amulet',
        slot: 'armor',
        baseDefense: 5,
        magicResist: 30,
        baseMagicBonus: 25,
        level: 23,
        quality: 'legendary',
        description: 'A still-beating dragon heart in crystal.',
        allowedClasses: ['warrior', 'paladin', 'mage', 'warlock', 'cleric'],
        cost: 22000,
        sellValue: 11000
    },

    drake_scale_gauntlets: {
        name: 'Drake Scale Gauntlets',
        slot: 'armor',
        baseDefense: 20,
        magicResist: 12,
        baseMagicBonus: 8,
        level: 22,
        quality: 'legendary',
        description: 'Gauntlets layered with drake scales.',
        allowedClasses: ['warrior', 'paladin'],
        cost: 14000,
        sellValue: 7000
    }
};

console.log('✅ Armor loaded:', Object.keys(ARMOR).length, 'pieces');