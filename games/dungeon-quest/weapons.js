// ═══════════════════════════════════════════════════════════════
// WEAPONS DATABASE - REBALANCED WITH DAMAGE RANGES
// ═══════════════════════════════════════════════════════════════
// MELEE WEAPONS: Tight damage variance (~50%)
// Example: Base Sword = 12-18 damage (6 point range)
//
// Formula: minDamage to maxDamage (maxDamage ≈ minDamage × 1.5)
// Quality bonuses apply to BOTH min and max
// ═══════════════════════════════════════════════════════════════

const QUALITY_CONFIG = {
    poor: { bonus: 0, color: '#808080', name: 'Poor' },
    normal: { bonus: 2, color: '#00FF00', name: 'Normal' },
    rare: { bonus: 5, color: '#0099FF', name: 'Rare' },
    epic: { bonus: 8, color: '#9933FF', name: 'Epic' },
    legendary: { bonus: 12, color: '#FF9900', name: 'Legendary' },
    godly: { bonus: 20, color: '#FF0000', name: 'Godly' }
};

const WEAPONS = {
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
        baseDamage: 3,
        maxDamage: 5,
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon'
    },
    wooden_staff: { 
        name: 'Wooden Staff', 
        baseDamage: 1,
        maxDamage: 3,
        baseMagicDamage: 3, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon'
    },
    training_bow: { 
        name: 'Training Bow', 
        baseDamage: 2,
        maxDamage: 4,
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
        cost: 11000,
        level: 2,
        quality: 'normal',
        slot: 'weapon'
    },
    apprentice_staff: {
        name: 'Apprentice Staff',
        baseDamage: 2,
        maxDamage: 4,
        baseMagicDamage: 5,
        cost: 500,
        level: 2,
        quality: 'normal',
        slot: 'weapon'
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
        baseDamage: 4,
        maxDamage: 7,
        baseMagicDamage: 10,
        cost: 550,
        level: 4,
        quality: 'rare',
        slot: 'weapon'
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
        baseDamage: 5,
        maxDamage: 9,
        baseMagicDamage: 14,
        cost: 11000,
        level: 6,
        quality: 'rare',
        slot: 'weapon'
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
        baseDamage: 7,
        maxDamage: 12,
        baseMagicDamage: 20,
        cost: 1800,
        level: 8,
        quality: 'rare',
        slot: 'weapon'
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
        baseDamage: 10,
        maxDamage: 16,
        baseMagicDamage: 28,
        cost: 11000,
        level: 10,
        quality: 'epic',
        slot: 'weapon'
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
        baseDamage: 12,
        maxDamage: 20,
        baseMagicDamage: 35,
        cost: 5000,
        level: 12,
        quality: 'epic',
        slot: 'weapon'
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
        baseDamage: 14,
        maxDamage: 24,
        baseMagicDamage: 42,
        cost: 8000,
        level: 14,
        quality: 'legendary',
        slot: 'weapon'
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
        baseDamage: 18,
        maxDamage: 30,
        baseMagicDamage: 50,
        cost: 11000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon'
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
        baseDamage: 22,
        maxDamage: 36,
        baseMagicDamage: 58,
        cost: 50000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon'
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
        baseDamage: 26,
        maxDamage: 42,
        baseMagicDamage: 66,
        cost: 22000,
        level: 20,
        quality: 'legendary',
        slot: 'weapon'
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
    magical_butterknife: {
        name: 'Magical Butterknife',
        baseDamage: 9999,
        maxDamage: 9999,
        baseMagicDamage: 9999,
        cost: 0,
        level: 1,
        quality: 'godly',
        slot: 'weapon'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // ROGUE DAGGERS (DUAL-WIELD EXCLUSIVE)
    // ═══════════════════════════════════════════════════════════════
    rusty_shiv: {
        name: 'Rusty Shiv',
        baseDamage: 2,
        maxDamage: 4,
        baseMagicDamage: 0,
        cost: 0,
        level: 1,
        quality: 'poor',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    iron_dagger: {
        name: 'Iron Dagger',
        baseDamage: 4,
        maxDamage: 7,
        baseMagicDamage: 0,
        cost: 150,
        level: 1,
        quality: 'normal',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    steel_stiletto: {
        name: 'Steel Stiletto',
        baseDamage: 6,
        maxDamage: 9,
        baseMagicDamage: 0,
        cost: 400,
        level: 3,
        quality: 'normal',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    throwing_knife: {
        name: 'Throwing Knife',
        baseDamage: 7,
        maxDamage: 11,
        baseMagicDamage: 0,
        cost: 500,
        level: 4,
        quality: 'normal',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    assassin_blade: {
        name: "Assassin's Blade",
        baseDamage: 9,
        maxDamage: 14,
        baseMagicDamage: 0,
        cost: 700,
        level: 5,
        quality: 'rare',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    shadow_fang: {
        name: 'Shadow Fang',
        baseDamage: 12,
        maxDamage: 18,
        baseMagicDamage: 0,
        cost: 1100,
        level: 6,
        quality: 'rare',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    venom_spike: {
        name: 'Venom Spike',
        baseDamage: 14,
        maxDamage: 21,
        baseMagicDamage: 0,
        cost: 1500,
        level: 7,
        quality: 'rare',
        slot: 'weapon',
        classRestriction: 'rogue',
        poisonChance: 0.3
    },
    midnight_dirk: {
        name: 'Midnight Dirk',
        baseDamage: 16,
        maxDamage: 24,
        baseMagicDamage: 0,
        cost: 2000,
        level: 8,
        quality: 'rare',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    blacksteel_dagger: {
        name: 'Blacksteel Dagger',
        baseDamage: 18,
        maxDamage: 27,
        baseMagicDamage: 0,
        cost: 2500,
        level: 9,
        quality: 'epic',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    phantom_edge: {
        name: 'Phantom Edge',
        baseDamage: 22,
        maxDamage: 33,
        baseMagicDamage: 0,
        cost: 3200,
        level: 10,
        quality: 'epic',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    soul_piercer: {
        name: 'Soul Piercer',
        baseDamage: 24,
        maxDamage: 36,
        baseMagicDamage: 0,
        cost: 5000,
        level: 11,
        quality: 'epic',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    serpent_tooth: {
        name: "Serpent's Tooth",
        baseDamage: 28,
        maxDamage: 42,
        baseMagicDamage: 0,
        cost: 6000,
        level: 12,
        quality: 'epic',
        slot: 'weapon',
        classRestriction: 'rogue',
        poisonChance: 0.4
    },
    eclipse_blade: {
        name: 'Eclipse Blade',
        baseDamage: 32,
        maxDamage: 48,
        baseMagicDamage: 0,
        cost: 7500,
        level: 13,
        quality: 'epic',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    nightfall: {
        name: 'Nightfall',
        baseDamage: 36,
        maxDamage: 54,
        baseMagicDamage: 0,
        cost: 9000,
        level: 14,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    shadow_reaver: {
        name: 'Shadow Reaver',
        baseDamage: 40,
        maxDamage: 60,
        baseMagicDamage: 0,
        cost: 11000,
        level: 15,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    void_stiletto: {
        name: 'Void Stiletto',
        baseDamage: 46,
        maxDamage: 69,
        baseMagicDamage: 0,
        cost: 14000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    death_whisper: {
        name: "Death's Whisper",
        baseDamage: 52,
        maxDamage: 78,
        baseMagicDamage: 0,
        cost: 18000,
        level: 17,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    oblivion_shard: {
        name: 'Oblivion Shard',
        baseDamage: 58,
        maxDamage: 87,
        baseMagicDamage: 0,
        cost: 22000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon'
,
        classRestriction: 'rogue'
    },
    reaper_kiss: {
        name: "Reaper's Kiss",
        baseDamage: 64,
        maxDamage: 96,
        baseMagicDamage: 0,
        cost: 28000,
        level: 19,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    bloodmoon_fang: {
        name: 'Bloodmoon Fang',
        baseDamage: 70,
        maxDamage: 105,
        baseMagicDamage: 0,
        cost: 35000,
        level: 20,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    eternal_night: {
        name: 'Eternal Night',
        baseDamage: 76,
        maxDamage: 114,
        baseMagicDamage: 0,
        cost: 42000,
        level: 21,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    shadowbane_dagger: {
        name: 'Shadowbane',
        baseDamage: 84,
        maxDamage: 126,
        baseMagicDamage: 0,
        cost: 50000,
        level: 22,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    silencer: {
        name: 'Silencer',
        baseDamage: 92,
        maxDamage: 138,
        baseMagicDamage: 0,
        cost: 60000,
        level: 23,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    abyssal_thorn: {
        name: 'Abyssal Thorn',
        baseDamage: 100,
        maxDamage: 150,
        baseMagicDamage: 0,
        cost: 75000,
        level: 24,
        quality: 'legendary',
        slot: 'weapon',
        classRestriction: 'rogue'
    },
    omega_blade: {
        name: 'Omega Blade',
        baseDamage: 110,
        maxDamage: 165,
        baseMagicDamage: 0,
        cost: 100000,
        level: 25,
        quality: 'godly',
        slot: 'weapon',
        classRestriction: 'rogue'
    }
};

console.log('✅ Weapons loaded with damage ranges:', Object.keys(WEAPONS).length, 'weapons');
