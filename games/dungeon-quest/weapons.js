// weapons.js - Weapon Database
// Add new weapons here to expand the game!

// QUALITY TIERS:
// poor (grey): -2 to all stats
// normal (green): base stats
// rare (blue): +2 to all stats
// epic (purple): +5 to all stats
// legendary (orange): +10 to all stats
// godly (red): +20 to all stats

const WEAPONS = {
    // ===== STARTER WEAPONS (Level 1) =====
    dagger: { 
        name: 'Rusty Dagger', 
        baseDamage: 8, 
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'poor',
        description: 'A worn blade, barely sharp enough to cut'
    },
    iron_sword: { 
        name: 'Iron Sword', 
        baseDamage: 12, 
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'A standard warrior\'s blade'
    },
    staff: { 
        name: 'Wooden Staff', 
        baseDamage: 5, 
        baseMagicDamage: 15, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'A simple staff imbued with basic magic'
    },
    mace: { 
        name: 'Iron Mace', 
        baseDamage: 10, 
        baseMagicDamage: 5, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'A heavy flanged weapon of divine power'
    },
    bow: { 
        name: 'Short Bow', 
        baseDamage: 10, 
        baseMagicDamage: 0, 
        cost: 0, 
        level: 1,
        quality: 'normal',
        description: 'A basic hunting bow'
    },

    // ===== TIER 2 WEAPONS (Level 3-4) =====
    steel_sword: { 
        name: 'Steel Sword', 
        baseDamage: 20, 
        baseMagicDamage: 0, 
        cost: 150, 
        level: 3,
        quality: 'normal',
        description: 'A finely crafted blade of quality steel'
    },
    flame_staff: { 
        name: 'Flame Staff', 
        baseDamage: 8, 
        baseMagicDamage: 28, 
        cost: 200, 
        level: 4,
        quality: 'rare',
        description: 'A staff crackling with elemental fire'
    },
    holy_mace: { 
        name: 'Holy Mace', 
        baseDamage: 18, 
        baseMagicDamage: 15, 
        cost: 180, 
        level: 3,
        quality: 'rare',
        description: 'A blessed weapon that smites evil'
    },
    longbow: { 
        name: 'Longbow', 
        baseDamage: 22, 
        baseMagicDamage: 0, 
        cost: 160, 
        level: 3,
        quality: 'normal',
        description: 'A powerful bow with extended range'
    },
    warhammer: {
        name: 'Warhammer',
        baseDamage: 24,
        baseMagicDamage: 0,
        cost: 170,
        level: 3,
        quality: 'normal',
        description: 'A massive two-handed hammer'
    },
    poison_dagger: {
        name: 'Poison Dagger',
        baseDamage: 16,
        baseMagicDamage: 8,
        cost: 140,
        level: 3,
        quality: 'rare',
        description: 'A blade coated in toxic venom'
    },

    // ===== TIER 3 WEAPONS (Level 5-7) =====
    bastard_sword: {
        name: 'Bastard Sword',
        baseDamage: 30,
        baseMagicDamage: 0,
        cost: 300,
        level: 5,
        quality: 'normal',
        description: 'A versatile blade that can be wielded one or two-handed'
    },
    ice_staff: {
        name: 'Ice Staff',
        baseDamage: 10,
        baseMagicDamage: 38,
        cost: 350,
        level: 6,
        quality: 'rare',
        description: 'A staff of frozen crystal'
    },
    divine_hammer: {
        name: 'Divine Hammer',
        baseDamage: 28,
        baseMagicDamage: 20,
        cost: 320,
        level: 5,
        quality: 'epic',
        description: 'A holy weapon blessed by the gods'
    },
    elven_bow: {
        name: 'Elven Bow',
        baseDamage: 32,
        baseMagicDamage: 5,
        cost: 310,
        level: 5,
        quality: 'rare',
        description: 'An elegant bow crafted by elven artisans'
    },

    // ===== LEGENDARY WEAPONS (Level 8+) =====
    excalibur: { 
        name: 'Excalibur', 
        baseDamage: 40, 
        baseMagicDamage: 20, 
        cost: 500, 
        level: 8,
        quality: 'legendary',
        description: 'The legendary sword of kings'
    },
    archmage_staff: { 
        name: 'Archmage Staff', 
        baseDamage: 15, 
        baseMagicDamage: 50, 
        cost: 600, 
        level: 9,
        quality: 'legendary',
        description: 'A staff of ultimate magical power'
    },
    mjolnir: {
        name: 'Mjolnir',
        baseDamage: 45,
        baseMagicDamage: 25,
        cost: 650,
        level: 9,
        quality: 'legendary',
        description: 'The hammer of the thunder god'
    },
    shadowblade: {
        name: 'Shadowblade',
        baseDamage: 38,
        baseMagicDamage: 22,
        cost: 580,
        level: 8,
        quality: 'epic',
        description: 'A blade forged in the void between worlds'
    },
    dragonslayer: {
        name: 'Dragonslayer',
        baseDamage: 50,
        baseMagicDamage: 15,
        cost: 700,
        level: 10,
        quality: 'legendary',
        description: 'A massive sword designed to slay dragons'
    },
    staff_of_eternity: {
        name: 'Staff of Eternity',
        baseDamage: 20,
        baseMagicDamage: 60,
        cost: 800,
        level: 11,
        quality: 'legendary',
        description: 'A staff containing infinite cosmic power'
    },
    godbow: {
        name: 'Godbow',
        baseDamage: 48,
        baseMagicDamage: 20,
        cost: 750,
        level: 10,
        quality: 'legendary',
        description: 'A bow that never misses its target'
    },

    // ===== CRAFTABLE/DROP WEAPONS =====
    cursed_sword: {
        name: 'Cursed Sword',
        baseDamage: 35,
        baseMagicDamage: 10,
        cost: 400,
        level: 6,
        quality: 'epic',
        description: 'A blade cursed with dark magic'
    },
    fire_blade: {
        name: 'Fire Blade',
        baseDamage: 42,
        baseMagicDamage: 30,
        cost: 650,
        level: 9,
        quality: 'epic',
        description: 'A sword wreathed in eternal flames'
    },
    vampire_blade: {
        name: 'Vampire Blade',
        baseDamage: 40,
        baseMagicDamage: 15,
        cost: 550,
        level: 8,
        quality: 'epic',
        description: 'A blade that drains life force'
    },
    demonic_blade: {
        name: 'Demonic Blade',
        baseDamage: 48,
        baseMagicDamage: 25,
        cost: 700,
        level: 10,
        quality: 'legendary',
        description: 'A weapon forged in the depths of hell'
    },

    // ===== THE ULTIMATE WEAPON =====
    magical_butterknife: {
        name: 'Magical Butterknife',
        baseDamage: 9999,
        baseMagicDamage: 9999,
        cost: 0,
        level: 1,
        quality: 'godly',
        description: '⚠ THE ULTIMATE WEAPON ⚠ One-shots everything. Even gods fear the butter.'
    }
};

// Quality configuration
const QUALITY_CONFIG = {
    poor: { bonus: -2, color: '#808080', name: 'Poor' },
    normal: { bonus: 0, color: '#00FF00', name: 'Normal' },
    rare: { bonus: 2, color: '#0099FF', name: 'Rare' },
    epic: { bonus: 5, color: '#9933FF', name: 'Epic' },
    legendary: { bonus: 10, color: '#FF9900', name: 'Legendary' },
    godly: { bonus: 20, color: '#FF0000', name: 'Godly' }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WEAPONS, QUALITY_CONFIG };
}

