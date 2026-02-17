// ═══════════════════════════════════════════════════════════════
// WEAPONS DATABASE - REBALANCED WITH DAMAGE RANGES
// ═══════════════════════════════════════════════════════════════
// MELEE WEAPONS: Tight damage variance (~50%)
// Example: Base Sword = 12-18 damage (6 point range)
//
// Formula: minDamage to maxDamage (maxDamage ≈ minDamage × 1.5)
// Quality bonuses apply to BOTH min and max
// ═══════════════════════════════════════════════════════════════

// Quality bonuses are PERCENTAGES of the weapon's baseDamage.
// A +50% legendary bonus on a level-1 dagger (4 dmg) = +2 dmg.
// The same +50% on a level-20 sword (70 dmg) = +35 dmg.
// This keeps early drops exciting without breaking balance.
const QUALITY_CONFIG = {
    poor:      { bonusPct: 0.00, color: '#808080', name: 'Poor'      },
    normal:    { bonusPct: 0.10, color: '#00FF00', name: 'Normal'    }, // +10%
    rare:      { bonusPct: 0.25, color: '#0099FF', name: 'Rare'      }, // +25%
    epic:      { bonusPct: 0.40, color: '#9933FF', name: 'Epic'      }, // +40%
    legendary: { bonusPct: 0.60, color: '#FF9900', name: 'Legendary' }, // +60%
    godly:     { bonusPct: 0.85, color: '#FF0000', name: 'Godly'     }  // +85%
};

const WEAPONS = {
    // ═══════════════════════════════════════════════════════════════
    // UNARMED — fallback when no weapon is equipped
    // Damage = 0 from weapon; only character stats contribute
    // ═══════════════════════════════════════════════════════════════
    bare_fists: {
        name: 'Bare Fists',
        baseDamage: 0,
        maxDamage: 0,
        baseMagicDamage: 0,
        level: 1,
        quality: 'poor',
        type: 'unarmed',
        cost: 0,
        description: 'No weapon equipped. Damage comes from raw strength alone.',
        unarmed: true   // flag used for flavour text
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 1 - STARTER WEAPONS
    // ═══════════════════════════════════════════════════════════════
    rusty_dagger: { 
        name: 'Rusty Dagger', 
        baseDamage: 1,
        maxDamage: 2,
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'poor',
        slot: 'weapon'
    },
    iron_sword: { 
        name: 'Iron Sword', 
        baseDamage: 8,
        maxDamage: 14,
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon'
    },
    wooden_staff: { 
        name: 'Wooden Staff', 
        baseDamage: 1,
        maxDamage: 2,
        baseMagicDamage: 3, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    // Wands: stronger melee, less magic than equivalent staff
    apprentice_wand: {
        name: 'Apprentice Wand',
        baseDamage: 3,
        maxDamage: 6,
        baseMagicDamage: 1,
        cost: 80,
        level: 1,
        quality: 'normal',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },
    training_bow: { 
        name: 'Training Bow', 
        baseDamage: 7,
        maxDamage: 12,
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 2 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    short_sword: {
        name: 'Short Sword',
        baseDamage: 5,
        maxDamage: 8,
        baseMagicDamage: 0,
        cost: 110,
        level: 2,
        quality: 'normal',
        slot: 'weapon'
    },
    apprentice_staff: {
        name: 'Apprentice Staff',
        baseDamage: 1,
        maxDamage: 2,
        baseMagicDamage: 6,
        cost: 500,
        level: 2,
        quality: 'normal',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    focus_wand: {
        name: 'Focus Wand',
        baseDamage: 4,
        maxDamage: 8,
        baseMagicDamage: 2,
        cost: 200,
        level: 2,
        quality: 'normal',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 4 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    steel_sword: {
        name: 'Steel Sword',
        baseDamage: 10,
        maxDamage: 15,
        baseMagicDamage: 0,
        cost: 11000,
        level: 4,
        quality: 'normal',
        slot: 'weapon'
    },
    battlemace: {
        name: 'Battlemace',
        baseDamage: 12,
        maxDamage: 18,
        baseMagicDamage: 3,
        cost: 500,
        level: 4,
        quality: 'normal',
        slot: 'weapon'
    },
    longbow: {
        name: 'Longbow',
        baseDamage: 11,
        maxDamage: 16,
        baseMagicDamage: 0,
        cost: 450,
        level: 4,
        quality: 'normal',
        slot: 'weapon'
    },
    flame_staff: {
        name: 'Flame Staff',
        baseDamage: 2,
        maxDamage: 4,
        baseMagicDamage: 12,
        cost: 550,
        level: 4,
        quality: 'rare',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    ember_wand: {
        name: 'Ember Wand',
        baseDamage: 8,
        maxDamage: 13,
        baseMagicDamage: 4,
        cost: 320,
        level: 4,
        quality: 'rare',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 6 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    bastard_sword: {
        name: 'Bastard Sword',
        baseDamage: 16,
        maxDamage: 24,
        baseMagicDamage: 0,
        cost: 900,
        level: 6,
        quality: 'normal',
        slot: 'weapon'
    },
    ice_staff: {
        name: 'Ice Staff',
        baseDamage: 3,
        maxDamage: 6,
        baseMagicDamage: 16,
        cost: 11000,
        level: 6,
        quality: 'rare',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    frost_wand: {
        name: 'Frost Wand',
        baseDamage: 10,
        maxDamage: 16,
        baseMagicDamage: 6,
        cost: 800,
        level: 6,
        quality: 'rare',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },
    elven_bow: {
        name: 'Elven Bow',
        baseDamage: 18,
        maxDamage: 27,
        baseMagicDamage: 2,
        cost: 2800,
        level: 6,
        quality: 'rare',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 8 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    greatsword: {
        name: 'Greatsword',
        baseDamage: 24,
        maxDamage: 36,
        baseMagicDamage: 0,
        cost: 5000,
        level: 8,
        quality: 'normal',
        slot: 'weapon'
    },
    lightning_staff: {
        name: 'Lightning Staff',
        baseDamage: 4,
        maxDamage: 8,
        baseMagicDamage: 24,
        cost: 1800,
        level: 8,
        quality: 'rare',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    shock_wand: {
        name: 'Shock Wand',
        baseDamage: 14,
        maxDamage: 21,
        baseMagicDamage: 9,
        cost: 1100,
        level: 8,
        quality: 'rare',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },
    shadowblade: {
        name: 'Shadowblade',
        baseDamage: 22,
        maxDamage: 33,
        baseMagicDamage: 8,
        cost: 2000,
        level: 8,
        quality: 'epic',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 10 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    excalibur: {
        name: 'Excalibur',
        baseDamage: 30,
        maxDamage: 45,
        baseMagicDamage: 10,
        cost: 2800,
        level: 10,
        quality: 'epic',
        slot: 'weapon'
    },
    archmage_staff: {
        name: 'Archmage Staff',
        baseDamage: 7,
        maxDamage: 11,
        baseMagicDamage: 33,
        cost: 11000,
        level: 10,
        quality: 'epic',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    arcane_wand: {
        name: 'Arcane Wand',
        baseDamage: 19,
        maxDamage: 28,
        baseMagicDamage: 12,
        cost: 2200,
        level: 10,
        quality: 'epic',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },
    dragonslayer_bow: {
        name: 'Dragonslayer Bow',
        baseDamage: 32,
        maxDamage: 48,
        baseMagicDamage: 6,
        cost: 35000,
        level: 10,
        quality: 'epic',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 12 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    runic_blade: {
        name: 'Runic Blade',
        baseDamage: 36,
        maxDamage: 54,
        baseMagicDamage: 12,
        cost: 4500,
        level: 12,
        quality: 'epic',
        slot: 'weapon'
    },
    void_staff: {
        name: 'Void Staff',
        baseDamage: 8,
        maxDamage: 14,
        baseMagicDamage: 42,
        cost: 5000,
        level: 12,
        quality: 'epic',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    void_wand: {
        name: 'Void Wand',
        baseDamage: 24,
        maxDamage: 36,
        baseMagicDamage: 16,
        cost: 3200,
        level: 12,
        quality: 'epic',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 14 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    titanforged_sword: {
        name: 'Titanforged Sword',
        baseDamage: 44,
        maxDamage: 66,
        baseMagicDamage: 15,
        cost: 7000,
        level: 14,
        quality: 'legendary',
        slot: 'weapon'
    },
    celestial_staff: {
        name: 'Celestial Staff',
        baseDamage: 9,
        maxDamage: 16,
        baseMagicDamage: 50,
        cost: 8000,
        level: 14,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    celestial_wand: {
        name: 'Celestial Wand',
        baseDamage: 28,
        maxDamage: 43,
        baseMagicDamage: 19,
        cost: 5500,
        level: 14,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },
    phantom_bow: {
        name: 'Phantom Bow',
        baseDamage: 48,
        maxDamage: 72,
        baseMagicDamage: 12,
        cost: 28000,
        level: 14,
        quality: 'legendary',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 16 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    godslayer: {
        name: 'Godslayer',
        baseDamage: 52,
        maxDamage: 78,
        baseMagicDamage: 18,
        cost: 35000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon'
    },
    eternity_staff: {
        name: 'Staff of Eternity',
        baseDamage: 12,
        maxDamage: 21,
        baseMagicDamage: 60,
        cost: 11000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    eternity_wand: {
        name: 'Wand of Eternity',
        baseDamage: 36,
        maxDamage: 54,
        baseMagicDamage: 22,
        cost: 8000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 18 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    demonic_blade: {
        name: 'Demonic Blade',
        baseDamage: 60,
        maxDamage: 90,
        baseMagicDamage: 22,
        cost: 14000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon'
    },
    apocalypse_staff: {
        name: 'Apocalypse Staff',
        baseDamage: 15,
        maxDamage: 25,
        baseMagicDamage: 69,
        cost: 50000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    apocalypse_wand: {
        name: 'Apocalypse Wand',
        baseDamage: 43,
        maxDamage: 64,
        baseMagicDamage: 27,
        cost: 18000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 20 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    worldbreaker: {
        name: 'Worldbreaker',
        baseDamage: 70,
        maxDamage: 105,
        baseMagicDamage: 28,
        cost: 20000,
        level: 20,
        quality: 'legendary',
        slot: 'weapon'
    },
    cosmic_staff: {
        name: 'Cosmic Staff',
        baseDamage: 18,
        maxDamage: 29,
        baseMagicDamage: 79,
        cost: 22000,
        level: 20,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'staff'
    },
    cosmic_wand: {
        name: 'Cosmic Wand',
        baseDamage: 50,
        maxDamage: 75,
        baseMagicDamage: 30,
        cost: 16000,
        level: 20,
        quality: 'legendary',
        slot: 'weapon',
        weaponSubtype: 'wand'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 22 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    infinity_blade: {
        name: 'Infinity Blade',
        baseDamage: 80,
        maxDamage: 120,
        baseMagicDamage: 32,
        cost: 28000,
        level: 22,
        quality: 'legendary',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 24 WEAPONS
    // ═══════════════════════════════════════════════════════════════
    primordial_weapon: {
        name: 'Primordial Weapon',
        baseDamage: 90,
        maxDamage: 135,
        baseMagicDamage: 38,
        cost: 35000,
        level: 24,
        quality: 'legendary',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // LEVEL 25 ULTIMATE WEAPONS
    // ═══════════════════════════════════════════════════════════════
    genesis: {
        name: 'Genesis',
        baseDamage: 100,
        maxDamage: 150,
        baseMagicDamage: 50,
        cost: 50000,
        level: 25,
        quality: 'godly',
        slot: 'weapon'
    },

    // ═══════════════════════════════════════════════════════════════
    // THE LEGENDARY BUTTERKNIFE
    // ═══════════════════════════════════════════════════════════════
    
    // ═══════════════════════════════════════════════════════════════
    // ROGUE DAGGERS — Dagger-exclusive class (all classRestriction: 'rogue')
    // Damage values are tuned for DOUBLE-HIT per pip:
    //   one pip = two strikes at these values.
    //   Upgrade available roughly every 2 levels.
    // Pip schedule: Lv1=1pip  Lv5=2pips  Lv10=3pips  Lv15=4pips
    // ═══════════════════════════════════════════════════════════════

    // ── Level 1 ──────────────────────────────────────────────────
    rusty_shiv: {
        name: 'Rusty Shiv',
        baseDamage: 3, maxDamage: 5, baseMagicDamage: 0,
        cost: 0, level: 1, quality: 'poor', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'A jagged bit of scrap metal. Barely a weapon.'
    },
    iron_dagger: {
        name: 'Iron Dagger',
        baseDamage: 5, maxDamage: 8, baseMagicDamage: 0,
        cost: 150, level: 1, quality: 'normal', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'A simple iron blade. Reliable if nothing else.'
    },

    // ── Level 2 ──────────────────────────────────────────────────
    bone_pick: {
        name: 'Bone Pick',
        baseDamage: 5, maxDamage: 9, baseMagicDamage: 0,
        cost: 280, level: 2, quality: 'normal', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Carved from something that used to fight back.'
    },

    // ── Level 3 ──────────────────────────────────────────────────
    copper_stiletto: {
        name: 'Copper Stiletto',
        baseDamage: 6, maxDamage: 10, baseMagicDamage: 0,
        cost: 400, level: 3, quality: 'normal', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Thin, fast, and gets between ribs nicely.'
    },

    // ── Level 4 ──────────────────────────────────────────────────
    throwing_knife: {
        name: 'Throwing Knife',
        baseDamage: 7, maxDamage: 11, baseMagicDamage: 0,
        cost: 520, level: 4, quality: 'normal', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Balanced for both throwing and close-in work.'
    },

    // ── Level 5 (2 pips unlock here) ─────────────────────────────
    assassin_blade: {
        name: "Assassin's Blade",
        baseDamage: 8, maxDamage: 13, baseMagicDamage: 0,
        cost: 700, level: 5, quality: 'normal', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Etched with guild marks. Ownership is not discussed.'
    },

    // ── Level 6 ──────────────────────────────────────────────────
    shadow_fang: {
        name: 'Shadow Fang',
        baseDamage: 6, maxDamage: 10, baseMagicDamage: 0,
        cost: 900, level: 6, quality: 'rare', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Dark-forged steel that seems to drink the light.'
    },

    // ── Level 7 ──────────────────────────────────────────────────
    venom_spike: {
        name: 'Venom Spike',
        baseDamage: 7, maxDamage: 12, baseMagicDamage: 0,
        cost: 1200, level: 7, quality: 'rare', slot: 'weapon',
        classRestriction: 'rogue',
        poisonChance: 0.25,
        description: 'Hollow blade. The venom does the second shift.'
    },

    // ── Level 8 ──────────────────────────────────────────────────
    midnight_dirk: {
        name: 'Midnight Dirk',
        baseDamage: 8, maxDamage: 13, baseMagicDamage: 0,
        cost: 1500, level: 8, quality: 'rare', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Forged at midnight, never reflects light.'
    },

    // ── Level 9 ──────────────────────────────────────────────────
    blacksteel_dagger: {
        name: 'Blacksteel Dagger',
        baseDamage: 9, maxDamage: 15, baseMagicDamage: 0,
        cost: 2000, level: 9, quality: 'rare', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'The steel is unnaturally dense and holds an edge forever.'
    },

    // ── Level 10 (3 pips unlock here) ────────────────────────────
    phantom_edge: {
        name: 'Phantom Edge',
        baseDamage: 10, maxDamage: 17, baseMagicDamage: 0,
        cost: 2600, level: 10, quality: 'rare', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Strikes leave no sound. Enemies hear nothing until too late.'
    },

    // ── Level 11 ─────────────────────────────────────────────────
    soul_piercer: {
        name: 'Soul Piercer',
        baseDamage: 11, maxDamage: 18, baseMagicDamage: 0,
        cost: 3400, level: 11, quality: 'epic', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Some wounds heal. Others linger somewhere deeper.'
    },

    // ── Level 12 ─────────────────────────────────────────────────
    serpent_tooth: {
        name: "Serpent's Tooth",
        baseDamage: 12, maxDamage: 20, baseMagicDamage: 0,
        cost: 4200, level: 12, quality: 'epic', slot: 'weapon',
        classRestriction: 'rogue',
        poisonChance: 0.35,
        description: 'Harvested from a black mamba the size of a horse.'
    },

    // ── Level 13 ─────────────────────────────────────────────────
    eclipse_blade: {
        name: 'Eclipse Blade',
        baseDamage: 13, maxDamage: 22, baseMagicDamage: 0,
        cost: 5200, level: 13, quality: 'epic', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Cuts through shadow like it was always meant to be there.'
    },

    // ── Level 14 ─────────────────────────────────────────────────
    wraithblade: {
        name: 'Wraithblade',
        baseDamage: 14, maxDamage: 23, baseMagicDamage: 0,
        cost: 6200, level: 14, quality: 'epic', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Traded for by a rogue who never came back to explain where he got it.'
    },

    // ── Level 15 (4 pips unlock here) ────────────────────────────
    shadow_reaver: {
        name: 'Shadow Reaver',
        baseDamage: 16, maxDamage: 26, baseMagicDamage: 0,
        cost: 7500, level: 15, quality: 'epic', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'It does not cut so much as unmake.'
    },

    // ── Level 16 ─────────────────────────────────────────────────
    void_stiletto: {
        name: 'Void Stiletto',
        baseDamage: 17, maxDamage: 28, baseMagicDamage: 0,
        cost: 9000, level: 16, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Thin as a whisper. Leaves a wound that doubts its own existence.'
    },

    // ── Level 17 ─────────────────────────────────────────────────
    death_whisper: {
        name: "Death's Whisper",
        baseDamage: 18, maxDamage: 30, baseMagicDamage: 0,
        cost: 11000, level: 17, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'You hear it right before you stop hearing anything.'
    },

    // ── Level 18 ─────────────────────────────────────────────────
    oblivion_shard: {
        name: 'Oblivion Shard',
        baseDamage: 20, maxDamage: 32, baseMagicDamage: 0,
        cost: 13500, level: 18, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'A fragment of something that should not exist in this world.'
    },

    // ── Level 19 ─────────────────────────────────────────────────
    reaper_kiss: {
        name: "Reaper's Kiss",
        baseDamage: 21, maxDamage: 34, baseMagicDamage: 0,
        cost: 16000, level: 19, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'The Reaper does not swing. He leans in gently.'
    },

    // ── Level 20 ─────────────────────────────────────────────────
    bloodmoon_fang: {
        name: 'Bloodmoon Fang',
        baseDamage: 23, maxDamage: 37, baseMagicDamage: 0,
        cost: 20000, level: 20, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        poisonChance: 0.40,
        description: 'Only sharpens under a red moon. Stays that way.'
    },

    // ── Level 21 ─────────────────────────────────────────────────
    eternal_night: {
        name: 'Eternal Night',
        baseDamage: 25, maxDamage: 40, baseMagicDamage: 0,
        cost: 25000, level: 21, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Somewhere a sun set and never came back. This is why.'
    },

    // ── Level 22 ─────────────────────────────────────────────────
    shadowbane_dagger: {
        name: 'Shadowbane',
        baseDamage: 27, maxDamage: 43, baseMagicDamage: 0,
        cost: 31000, level: 22, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Its edge is the last thing darkness sees before it ends.'
    },

    // ── Level 23 ─────────────────────────────────────────────────
    silencer: {
        name: 'Silencer',
        baseDamage: 29, maxDamage: 46, baseMagicDamage: 0,
        cost: 38000, level: 23, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'No one has ever heard it coming. Nor going.'
    },

    // ── Level 24 ─────────────────────────────────────────────────
    abyssal_thorn: {
        name: 'Abyssal Thorn',
        baseDamage: 32, maxDamage: 50, baseMagicDamage: 0,
        cost: 47000, level: 24, quality: 'legendary', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'Grew naturally in a place where nothing should grow.'
    },

    // ── Level 25 ─────────────────────────────────────────────────
    omega_blade: {
        name: 'Omega Blade',
        baseDamage: 35, maxDamage: 55, baseMagicDamage: 0,
        cost: 60000, level: 25, quality: 'godly', slot: 'weapon',
        classRestriction: 'rogue',
        description: 'The last dagger. Every shadow in existence fears this edge.'
    }
};

console.log('✅ Weapons loaded with damage ranges:', Object.keys(WEAPONS).length, 'weapons');
