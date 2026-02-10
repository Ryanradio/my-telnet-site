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
    epic: { bonus: 10, color: '#9933FF', name: 'Epic' },
    legendary: { bonus: 20, color: '#FF9900', name: 'Legendary' },
    godly: { bonus: 50, color: '#FF0000', name: 'Godly' }
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
        cost: 50,
        level: 2,
        quality: 'normal',
        slot: 'weapon'
    },
    apprentice_staff: {
        name: 'Apprentice Staff',
        baseDamage: 2,
        maxDamage: 4,
        baseMagicDamage: 5,
        cost: 60,
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
        cost: 150,
        level: 4,
        quality: 'normal',
        slot: 'weapon'
    },
    battlemace: {
        name: 'Battlemace',
        baseDamage: 12,
        maxDamage: 18,
        baseMagicDamage: 3,
        cost: 180,
        level: 4,
        quality: 'normal',
        slot: 'weapon'
    },
    longbow: {
        name: 'Longbow',
        baseDamage: 11,
        maxDamage: 16,
        baseMagicDamage: 0,
        cost: 160,
        level: 4,
        quality: 'normal',
        slot: 'weapon'
    },
    flame_staff: {
        name: 'Flame Staff',
        baseDamage: 4,
        maxDamage: 7,
        baseMagicDamage: 10,
        cost: 200,
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
        cost: 350,
        level: 6,
        quality: 'normal',
        slot: 'weapon'
    },
    ice_staff: {
        name: 'Ice Staff',
        baseDamage: 5,
        maxDamage: 9,
        baseMagicDamage: 14,
        cost: 400,
        level: 6,
        quality: 'rare',
        slot: 'weapon'
    },
    elven_bow: {
        name: 'Elven Bow',
        baseDamage: 18,
        maxDamage: 27,
        baseMagicDamage: 2,
        cost: 380,
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
        cost: 600,
        level: 8,
        quality: 'normal',
        slot: 'weapon'
    },
    lightning_staff: {
        name: 'Lightning Staff',
        baseDamage: 7,
        maxDamage: 12,
        baseMagicDamage: 20,
        cost: 650,
        level: 8,
        quality: 'rare',
        slot: 'weapon'
    },
    shadowblade: {
        name: 'Shadowblade',
        baseDamage: 22,
        maxDamage: 33,
        baseMagicDamage: 8,
        cost: 700,
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
        cost: 1000,
        level: 10,
        quality: 'epic',
        slot: 'weapon'
    },
    archmage_staff: {
        name: 'Archmage Staff',
        baseDamage: 10,
        maxDamage: 16,
        baseMagicDamage: 28,
        cost: 1100,
        level: 10,
        quality: 'epic',
        slot: 'weapon'
    },
    dragonslayer_bow: {
        name: 'Dragonslayer Bow',
        baseDamage: 32,
        maxDamage: 48,
        baseMagicDamage: 6,
        cost: 1050,
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
        cost: 1500,
        level: 12,
        quality: 'epic',
        slot: 'weapon'
    },
    void_staff: {
        name: 'Void Staff',
        baseDamage: 12,
        maxDamage: 20,
        baseMagicDamage: 35,
        cost: 1600,
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
        cost: 2200,
        level: 14,
        quality: 'legendary',
        slot: 'weapon'
    },
    celestial_staff: {
        name: 'Celestial Staff',
        baseDamage: 14,
        maxDamage: 24,
        baseMagicDamage: 42,
        cost: 2400,
        level: 14,
        quality: 'legendary',
        slot: 'weapon'
    },
    phantom_bow: {
        name: 'Phantom Bow',
        baseDamage: 48,
        maxDamage: 72,
        baseMagicDamage: 12,
        cost: 2300,
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
        cost: 3000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon'
    },
    eternity_staff: {
        name: 'Staff of Eternity',
        baseDamage: 18,
        maxDamage: 30,
        baseMagicDamage: 50,
        cost: 3200,
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
        cost: 4000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon'
    },
    apocalypse_staff: {
        name: 'Apocalypse Staff',
        baseDamage: 22,
        maxDamage: 36,
        baseMagicDamage: 58,
        cost: 4200,
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
        cost: 5500,
        level: 20,
        quality: 'legendary',
        slot: 'weapon'
    },
    cosmic_staff: {
        name: 'Cosmic Staff',
        baseDamage: 26,
        maxDamage: 42,
        baseMagicDamage: 66,
        cost: 6000,
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
        cost: 7500,
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
        cost: 10000,
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
        cost: 15000,
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
    }
};

console.log('✅ Weapons loaded with damage ranges:', Object.keys(WEAPONS).length, 'weapons');
