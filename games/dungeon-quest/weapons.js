// weapons.js - Weapon Database (REBALANCED)
// Weapons now use BASE damage ranges + stat scaling

// QUALITY TIERS:
// poor (grey): +0 damage
// normal (green): +2 damage  
// rare (blue): +5 damage
// epic (purple): +10 damage
// legendary (orange): +20 damage
// godly (red): +50 damage

const WEAPONS = {
    // ===== LEVEL 1 STARTER WEAPONS =====
    rusty_dagger: { 
        name: 'Rusty Dagger', 
        baseDamage: 1,        // Will do 1 + STR damage
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'poor',
        slot: 'weapon',
        description: 'A worn blade, barely sharp. (1 + STR damage)'
    },
    iron_sword: { 
        name: 'Iron Sword', 
        baseDamage: 2, 
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon',
        description: 'A standard warrior blade. (2 + STR damage)'
    },
    wooden_staff: { 
        name: 'Wooden Staff', 
        baseDamage: 1, 
        baseMagicDamage: 3, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon',
        description: 'Basic magical focus. (1 + STR, 3 + WIS damage)'
    },
    training_bow: { 
        name: 'Training Bow', 
        baseDamage: 2, 
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        slot: 'weapon',
        description: 'A simple hunting bow. (2 + DEX damage)'
    },

    // ===== LEVEL 2 WEAPONS =====
    short_sword: {
        name: 'Short Sword',
        baseDamage: 3,
        baseMagicDamage: 0,
        cost: 50,
        level: 2,
        quality: 'normal',
        slot: 'weapon',
        description: 'Quick and nimble. (3 + STR damage)'
    },
    apprentice_staff: {
        name: 'Apprentice Staff',
        baseDamage: 1,
        baseMagicDamage: 4,
        cost: 60,
        level: 2,
        quality: 'normal',
        slot: 'weapon',
        description: 'For learning mages. (1 + STR, 4 + WIS damage)'
    },

    // ===== LEVEL 4 WEAPONS =====
    steel_sword: {
        name: 'Steel Sword',
        baseDamage: 5,
        baseMagicDamage: 0,
        cost: 150,
        level: 4,
        quality: 'normal',
        slot: 'weapon',
        description: 'Quality steel blade. (5 + STR damage)'
    },
    battlemace: {
        name: 'Battlemace',
        baseDamage: 6,
        baseMagicDamage: 2,
        cost: 180,
        level: 4,
        quality: 'normal',
        slot: 'weapon',
        description: 'Holy weapon. (6 + STR, 2 + WIS damage)'
    },
    longbow: {
        name: 'Longbow',
        baseDamage: 5,
        baseMagicDamage: 0,
        cost: 160,
        level: 4,
        quality: 'normal',
        slot: 'weapon',
        description: 'Extended range. (5 + DEX damage)'
    },
    flame_staff: {
        name: 'Flame Staff',
        baseDamage: 2,
        baseMagicDamage: 7,
        cost: 200,
        level: 4,
        quality: 'rare',
        slot: 'weapon',
        description: 'Elemental fire. (2 + STR, 7 + WIS damage)'
    },

    // ===== LEVEL 6 WEAPONS =====
    bastard_sword: {
        name: 'Bastard Sword',
        baseDamage: 8,
        baseMagicDamage: 0,
        cost: 350,
        level: 6,
        quality: 'normal',
        slot: 'weapon',
        description: 'Versatile blade. (8 + STR damage)'
    },
    ice_staff: {
        name: 'Ice Staff',
        baseDamage: 2,
        baseMagicDamage: 10,
        cost: 400,
        level: 6,
        quality: 'rare',
        slot: 'weapon',
        description: 'Frozen crystal. (2 + STR, 10 + WIS damage)'
    },
    elven_bow: {
        name: 'Elven Bow',
        baseDamage: 9,
        baseMagicDamage: 1,
        cost: 380,
        level: 6,
        quality: 'rare',
        slot: 'weapon',
        description: 'Elven craftsmanship. (9 + DEX, 1 + WIS damage)'
    },

    // ===== LEVEL 8 WEAPONS =====
    greatsword: {
        name: 'Greatsword',
        baseDamage: 12,
        baseMagicDamage: 0,
        cost: 600,
        level: 8,
        quality: 'normal',
        slot: 'weapon',
        description: 'Massive two-hander. (12 + STR damage)'
    },
    lightning_staff: {
        name: 'Lightning Staff',
        baseDamage: 3,
        baseMagicDamage: 14,
        cost: 650,
        level: 8,
        quality: 'rare',
        slot: 'weapon',
        description: 'Crackling power. (3 + STR, 14 + WIS damage)'
    },
    shadowblade: {
        name: 'Shadowblade',
        baseDamage: 11,
        baseMagicDamage: 5,
        cost: 700,
        level: 8,
        quality: 'epic',
        slot: 'weapon',
        description: 'Void forged. (11 + DEX, 5 + WIS damage)'
    },

    // ===== LEVEL 10 WEAPONS =====
    excalibur: {
        name: 'Excalibur',
        baseDamage: 15,
        baseMagicDamage: 5,
        cost: 1000,
        level: 10,
        quality: 'epic',
        slot: 'weapon',
        description: 'Legendary blade. (15 + STR, 5 + WIS damage)'
    },
    archmage_staff: {
        name: 'Archmage Staff',
        baseDamage: 4,
        baseMagicDamage: 18,
        cost: 1100,
        level: 10,
        quality: 'epic',
        slot: 'weapon',
        description: 'Ultimate magic. (4 + STR, 18 + WIS damage)'
    },
    dragonslayer_bow: {
        name: 'Dragonslayer Bow',
        baseDamage: 16,
        baseMagicDamage: 3,
        cost: 1050,
        level: 10,
        quality: 'epic',
        slot: 'weapon',
        description: 'Slay dragons. (16 + DEX, 3 + WIS damage)'
    },

    // ===== LEVEL 12 WEAPONS =====
    runic_blade: {
        name: 'Runic Blade',
        baseDamage: 18,
        baseMagicDamage: 8,
        cost: 1500,
        level: 12,
        quality: 'epic',
        slot: 'weapon',
        description: 'Inscribed with power. (18 + STR, 8 + WIS damage)'
    },
    void_staff: {
        name: 'Void Staff',
        baseDamage: 5,
        baseMagicDamage: 22,
        cost: 1600,
        level: 12,
        quality: 'epic',
        slot: 'weapon',
        description: 'Consumes reality. (5 + STR, 22 + WIS damage)'
    },

    // ===== LEVEL 14 WEAPONS =====
    titanforged_sword: {
        name: 'Titanforged Sword',
        baseDamage: 22,
        baseMagicDamage: 10,
        cost: 2200,
        level: 14,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Forged by titans. (22 + STR, 10 + WIS damage)'
    },
    celestial_staff: {
        name: 'Celestial Staff',
        baseDamage: 6,
        baseMagicDamage: 26,
        cost: 2400,
        level: 14,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Starlight incarnate. (6 + STR, 26 + WIS damage)'
    },
    phantom_bow: {
        name: 'Phantom Bow',
        baseDamage: 24,
        baseMagicDamage: 8,
        cost: 2300,
        level: 14,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Ethereal arrows. (24 + DEX, 8 + WIS damage)'
    },

    // ===== LEVEL 16 WEAPONS =====
    godslayer: {
        name: 'Godslayer',
        baseDamage: 26,
        baseMagicDamage: 12,
        cost: 3000,
        level: 16,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Deicide blade. (26 + STR, 12 + WIS damage)'
    },
    eternity_staff: {
        name: 'Staff of Eternity',
        baseDamage: 8,
        baseMagicDamage: 30,
        cost: 3200,
        level: 16,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Infinite power. (8 + STR, 30 + WIS damage)'
    },

    // ===== LEVEL 18 WEAPONS =====
    demonic_blade: {
        name: 'Demonic Blade',
        baseDamage: 30,
        baseMagicDamage: 15,
        cost: 4000,
        level: 18,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Hellforged weapon. (30 + STR, 15 + WIS damage)'
    },
    apocalypse_staff: {
        name: 'Apocalypse Staff',
        baseDamage: 10,
        baseMagicDamage: 35,
        cost: 4200,
        level: 18,
        quality: 'legendary',
        slot: 'weapon',
        description: 'End all things. (10 + STR, 35 + WIS damage)'
    },

    // ===== LEVEL 20 WEAPONS =====
    worldbreaker: {
        name: 'Worldbreaker',
        baseDamage: 35,
        baseMagicDamage: 18,
        cost: 5500,
        level: 20,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Shatter reality. (35 + STR, 18 + WIS damage)'
    },
    cosmic_staff: {
        name: 'Cosmic Staff',
        baseDamage: 12,
        baseMagicDamage: 40,
        cost: 6000,
        level: 20,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Universe bends. (12 + STR, 40 + WIS damage)'
    },

    // ===== LEVEL 22 WEAPONS =====
    infinity_blade: {
        name: 'Infinity Blade',
        baseDamage: 40,
        baseMagicDamage: 20,
        cost: 7500,
        level: 22,
        quality: 'legendary',
        slot: 'weapon',
        description: 'Endless edge. (40 + STR, 20 + WIS damage)'
    },

    // ===== LEVEL 24 WEAPONS =====
    primordial_weapon: {
        name: 'Primordial Weapon',
        baseDamage: 45,
        baseMagicDamage: 25,
        cost: 10000,
        level: 24,
        quality: 'legendary',
        slot: 'weapon',
        description: 'First weapon ever made. (45 + STR, 25 + WIS damage)'
    },

    // ===== LEVEL 25 ULTIMATE WEAPONS =====
    genesis: {
        name: 'Genesis',
        baseDamage: 50,
        baseMagicDamage: 30,
        cost: 15000,
        level: 25,
        quality: 'godly',
        slot: 'weapon',
        description: 'Creation itself. (50 + STR, 30 + WIS damage)'
    },

    // ===== THE MEME WEAPON =====
    magical_butterknife: {
        name: 'Magical Butterknife',
        baseDamage: 9999,
        baseMagicDamage: 9999,
        cost: 0,
        level: 1,
        quality: 'godly',
        slot: 'weapon',
        description: '⚠️ THE ULTIMATE WEAPON ⚠️ Even gods fear the butter.'
    }
};

// Quality configuration
const QUALITY_CONFIG = {
    poor: { bonus: 0, color: '#808080', name: 'Poor' },
    normal: { bonus: 2, color: '#00FF00', name: 'Normal' },
    rare: { bonus: 5, color: '#0099FF', name: 'Rare' },
    epic: { bonus: 10, color: '#9933FF', name: 'Epic' },
    legendary: { bonus: 20, color: '#FF9900', name: 'Legendary' },
    godly: { bonus: 50, color: '#FF0000', name: 'Godly' }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WEAPONS, QUALITY_CONFIG };
}
