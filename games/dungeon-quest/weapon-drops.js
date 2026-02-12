// ═══════════════════════════════════════════════════════════════
// WEAPON DROP SYSTEM
// Generates random weapon drops from enemies
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// DROP CHANCE CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const WEAPON_DROP_CONFIG = {
    baseDropChance: 0.05, // 5% base chance for weapon drop
    
    // Chance increases with monster rarity
    rarityMultipliers: {
        common: 1.0,
        uncommon: 1.5,
        rare: 1.5,
        epic: 2.5,
        boss: 5.0
    },
    
    // Quality distribution (weights)
    qualityWeights: {
        poor: 5,      // 5% chance
        normal: 40,   // 40% chance
        rare: 35,     // 35% chance
        epic: 15,     // 15% chance
        legendary: 4, // 4% chance
        godly: 1      // 1% chance
    }
};

// ═══════════════════════════════════════════════════════════════
// CLASS WEAPON POOLS
// What weapons each class can use/receive
// ═══════════════════════════════════════════════════════════════
const CLASS_WEAPON_POOLS = {
    warrior: ['sword', 'axe', 'hammer', 'greatsword', 'battleaxe', 'warhammer'],
    paladin: ['sword', 'mace', 'hammer', 'holy_mace', 'crusader_sword'],
    rogue: ['dagger', 'short_sword', 'poison_dagger', 'assassin_blade'],
    ranger: ['bow', 'longbow', 'crossbow', 'composite_bow'],
    hunter: ['bow', 'longbow', 'crossbow', 'hunting_bow'],
    archer: ['bow', 'longbow', 'crossbow', 'war_bow'],
    mage: ['staff', 'wand', 'tome', 'orb'],
    warlock: ['staff', 'wand', 'dark_staff', 'shadow_orb'],
    cleric: ['mace', 'staff', 'holy_staff', 'blessed_mace'],
    acolyte: ['mace', 'staff', 'holy_staff']
};

// ═══════════════════════════════════════════════════════════════
// WEAPON GENERATION
// Creates a random weapon drop
// ═══════════════════════════════════════════════════════════════

/**
 * Generate a random weapon drop for a player
 * @param {object} player - The player object
 * @param {number} enemyLevel - Level of defeated enemy
 * @param {string} enemyRarity - Rarity of defeated enemy
 * @returns {object|null} Generated weapon or null if no drop
 */
function generateWeaponDrop(player, enemyLevel, enemyRarity = 'common') {
    // Calculate drop chance
    const baseChance = WEAPON_DROP_CONFIG.baseDropChance;
    const rarityMult = WEAPON_DROP_CONFIG.rarityMultipliers[enemyRarity] || 1.0;
    const dropChance = baseChance * rarityMult;
    
    // Roll for drop
    if (Math.random() > dropChance) {
        return null; // No drop
    }
    
    // Determine weapon level (player level or +1)
    const weaponLevel = player.level + (Math.random() < 0.3 ? 1 : 0);
    
    // Get class weapon pool
    const playerClass = player.baseClass || player.class;
    const weaponTypes = CLASS_WEAPON_POOLS[playerClass] || ['sword'];
    
    // Pick random weapon type
    const weaponType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
    
    // Determine quality
    const quality = rollQuality();
    
    // Generate base damage matching weapons.js scaling:
    // Level 1 weapons: ~4-7 | Level 10: ~30-45 | Level 20: ~70-105
    // Formula: baseDamage ≈ level * 3.5, variance ≈ 50% of base
    const baseDamage = Math.max(3, Math.floor(weaponLevel * 3.5));
    const damageVariance = Math.max(2, Math.floor(baseDamage * 0.5));
    
    // Apply quality bonus as percentage of base (matching QUALITY_CONFIG.bonusPct)
    const bonusPct = (QUALITY_CONFIG[quality] && QUALITY_CONFIG[quality].bonusPct !== undefined)
        ? QUALITY_CONFIG[quality].bonusPct
        : 0;
    const qualityBonusMin = Math.floor(baseDamage * bonusPct);
    const qualityBonusMax = Math.floor((baseDamage + damageVariance) * bonusPct);
    const minDamage = baseDamage + qualityBonusMin;
    const maxDamage = baseDamage + damageVariance + qualityBonusMax;
    
    // Generate modifiers based on quality
    const modifiers = generateModifiers(quality);
    
    // Create unique weapon ID
    const weaponId = `${weaponType}_${quality}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Generate weapon name
    const weaponName = generateWeaponName(weaponType, quality, modifiers);
    
    // Create weapon object
    const weapon = {
        id: weaponId,
        name: weaponName,
        type: weaponType,
        baseDamage: minDamage,
        maxDamage: maxDamage,
        baseMagicDamage: weaponType.includes('staff') || weaponType.includes('wand') ? Math.floor(baseDamage * 0.8) : 0,
        level: weaponLevel,
        quality: quality,
        modifiers: modifiers,
        cost: calculateWeaponValue(weaponLevel, quality, modifiers),
        description: generateWeaponDescription(weaponType, quality, modifiers),
        isDropped: true // Flag to identify dropped weapons
    };
    
    return weapon;
}

/**
 * Roll for weapon quality based on weights
 */
function rollQuality() {
    const weights = WEAPON_DROP_CONFIG.qualityWeights;
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let roll = Math.random() * totalWeight;
    
    for (const [quality, weight] of Object.entries(weights)) {
        roll -= weight;
        if (roll <= 0) {
            return quality;
        }
    }
    
    return 'normal'; // Fallback
}

/**
 * Generate random modifiers for a weapon based on quality
 */
function generateModifiers(quality) {
    const pool = QUALITY_MODIFIER_POOLS[quality];
    if (!pool || pool.modifierCount === 0) {
        return [];
    }
    
    const modifiers = [];
    const available = [...pool.availableModifiers];
    
    for (let i = 0; i < pool.modifierCount && available.length > 0; i++) {
        const index = Math.floor(Math.random() * available.length);
        const modKey = available.splice(index, 1)[0];
        modifiers.push(modKey);
    }
    
    return modifiers;
}

/**
 * Generate a descriptive weapon name
 */
function generateWeaponName(weaponType, quality, modifiers) {
    const qualityPrefixes = {
        poor: 'Rusty',
        normal: '',
        rare: 'Fine',
        epic: 'Superior',
        legendary: 'Legendary',
        godly: 'Godly'
    };
    
    const modifierPrefixes = {
        fire_damage: 'Flaming',
        ice_damage: 'Frozen',
        poison_damage: 'Venomous',
        lightning_damage: 'Shocking',
        shadow_damage: 'Shadow',
        bleed: 'Razor',
        damage_bonus: 'Powerful',
        critical_bonus: 'Precise'
    };
    
    let name = qualityPrefixes[quality] || '';
    
    // Add first modifier as prefix
    if (modifiers.length > 0 && modifierPrefixes[modifiers[0]]) {
        name = modifierPrefixes[modifiers[0]] + (name ? ' ' + name : '');
    }
    
    // Add weapon type
    const typeNames = {
        sword: 'Sword',
        axe: 'Axe',
        hammer: 'Hammer',
        dagger: 'Dagger',
        bow: 'Bow',
        staff: 'Staff',
        mace: 'Mace',
        greatsword: 'Greatsword',
        battleaxe: 'Battleaxe',
        warhammer: 'Warhammer'
    };
    
    const typeName = typeNames[weaponType] || weaponType.charAt(0).toUpperCase() + weaponType.slice(1);
    name = (name ? name + ' ' : '') + typeName;
    
    return name;
}

/**
 * Generate weapon description showing modifiers
 */
function generateWeaponDescription(weaponType, quality, modifiers) {
    if (modifiers.length === 0) {
        return `A ${quality} ${weaponType}`;
    }
    
    const modDescs = modifiers.map(m => WEAPON_MODIFIERS[m]?.name || m).join(', ');
    return `A ${quality} ${weaponType} with ${modDescs}`;
}

/**
 * Calculate weapon sell value based on stats
 */
function calculateWeaponValue(level, quality, modifiers) {
    let baseValue = level * 40;
    
    const qualityMults = {
        poor: 0.5,
        normal: 1.0,
        rare: 1.5,
        epic: 4.0,
        legendary: 8.0,
        godly: 10.0
    };
    
    baseValue *= qualityMults[quality] || 1.0;
    baseValue += modifiers.length * 100;
    
    return Math.floor(baseValue);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        generateWeaponDrop,
        CLASS_WEAPON_POOLS,
        WEAPON_DROP_CONFIG
    };
}
