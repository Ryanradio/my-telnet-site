// ═══════════════════════════════════════════════════════════════
// WEAPON DROP SYSTEM
// Generates random weapon drops from enemies
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// DROP CHANCE CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const WEAPON_DROP_CONFIG = {
    baseDropChance: 0.04, // 4% base chance for weapon drop
    
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
function generateWeaponDrop(player, enemyLevel, enemyRarity = 'common', skipRoll = false, forcedQuality = null) {
    // Calculate drop chance (skip if forced)
    if (!skipRoll) {
        const baseChance = WEAPON_DROP_CONFIG.baseDropChance;
        const rarityMult = WEAPON_DROP_CONFIG.rarityMultipliers[enemyRarity] || 1.0;
        const dropChance = baseChance * rarityMult;
        
        if (Math.random() > dropChance) {
            return null; // No drop
        }
    }
    
    // Determine weapon level (player level or +1)
    let weaponLevel;
    if (skipRoll) {
        weaponLevel = player.level; // Sysop commands get exact level
    } else {
        weaponLevel = player.level + (Math.random() < 0.3 ? 1 : 0); // Normal random drop
    }
    
    // Get player's class for weapon pool
    const playerClass = player.baseClass || player.class;
    const weaponTypes = CLASS_WEAPON_POOLS[playerClass] || ['sword'];
    
    // Get all weapons from WEAPONS database that match:
    // 1. The weapon type
    // 2. The exact weapon level (or close if none found)
    let eligibleWeapons = [];
    
    // First try to find weapons of exact level
    for (const [weaponId, weapon] of Object.entries(WEAPONS)) {
        if (weapon.level === weaponLevel) {
            const weaponType = weapon.weaponSubtype || weapon.type;
            if (weaponTypes.includes(weaponType)) {
                if (!weapon.allowedClasses || weapon.allowedClasses.includes(playerClass)) {
                    eligibleWeapons.push({
                        id: weaponId,
                        ...weapon
                    });
                }
            }
        }
    }
    
    // If no weapons of exact level, try ±1 level
    if (eligibleWeapons.length === 0) {
        for (const [weaponId, weapon] of Object.entries(WEAPONS)) {
            if (Math.abs(weapon.level - weaponLevel) <= 1) {
                const weaponType = weapon.weaponSubtype || weapon.type;
                if (weaponTypes.includes(weaponType)) {
                    if (!weapon.allowedClasses || weapon.allowedClasses.includes(playerClass)) {
                        eligibleWeapons.push({
                            id: weaponId,
                            ...weapon
                        });
                    }
                }
            }
        }
    }
    
    // If still no weapons, try any level of correct type
    if (eligibleWeapons.length === 0) {
        for (const [weaponId, weapon] of Object.entries(WEAPONS)) {
            const weaponType = weapon.weaponSubtype || weapon.type;
            if (weaponTypes.includes(weaponType)) {
                if (!weapon.allowedClasses || weapon.allowedClasses.includes(playerClass)) {
                    eligibleWeapons.push({
                        id: weaponId,
                        ...weapon
                    });
                    break;
                }
            }
        }
    }
    
    // If STILL no weapons, create a basic fallback
    if (eligibleWeapons.length === 0) {
        console.log('⚠️ No eligible weapons found, using fallback');
        const fallbackWeapon = {
            name: "Simple Weapon",
            baseDamage: 3 + weaponLevel,
            maxDamage: 5 + (weaponLevel * 2),
            baseMagicDamage: 0,
            level: weaponLevel,
            type: weaponTypes[0],
            weaponSubtype: weaponTypes[0],
            allowedClasses: [playerClass]
        };
        eligibleWeapons.push(fallbackWeapon);
    }
    
    // Pick random base weapon from eligible list
    const baseWeapon = eligibleWeapons[Math.floor(Math.random() * eligibleWeapons.length)];
    console.log("Selected weapon:", baseWeapon.name, "from ID:", baseWeapon.id);
    
    // Determine quality
    let quality;
    if (forcedQuality) {
        quality = forcedQuality;
    } else {
        quality = rollQuality();
    }
    
    // Get quality bonus percentage from config (now using updated values)
    const qualityData = QUALITY_CONFIG[quality] || QUALITY_CONFIG.normal;
    const bonusPct = qualityData.bonusPct;
    
    // Apply quality bonus to ALL stats
    const baseDamageBonus = Math.floor(baseWeapon.baseDamage * bonusPct);
    const maxDamageBonus = Math.floor(baseWeapon.maxDamage * bonusPct);
    const magicDamageBonus = baseWeapon.baseMagicDamage ? Math.floor(baseWeapon.baseMagicDamage * bonusPct) : 0;
    const healingBonus = baseWeapon.healingBonus ? Math.floor(baseWeapon.healingBonus * bonusPct) : 0;
    
    // Generate modifiers based on quality
    const modifiers = generateModifiers(quality);
    
    // Generate gem slots based on quality
    let gemSlots = 0;
    if (quality === 'rare') gemSlots = 1;
    if (quality === 'epic') gemSlots = 2;
    if (quality === 'legendary') gemSlots = 3;
    if (quality === 'godly') gemSlots = 4;
    
    // Generate new name with quality prefix and modifier suffix
    // Generate new name with quality prefix and modifier suffix
let weaponName = baseWeapon.name;

// Add quality prefix only for non-normal qualities
if (quality !== 'normal') {
    // Capitalize first letter of quality
    const qualityDisplay = quality.charAt(0).toUpperCase() + quality.slice(1);
    weaponName = `${qualityDisplay} ${baseWeapon.name}`;
}

// Add modifier suffix if exists (only for rare+)
if (modifiers && modifiers.length > 0 && quality !== 'normal' && quality !== 'poor') {
    const modifierSuffixes = {
        fire_damage: 'of Flames',
        ice_damage: 'of Frost',
        poison_damage: 'of Venom',
        lightning_damage: 'of Lightning',
        shadow_damage: 'of Shadows',
        bleed: 'of Bleeding',
        damage_bonus: 'of Might',
        critical_bonus: 'of Precision',
        flaming: 'of Flames',
        freezing: 'of Frost',
        shocking: 'of Lightning',
        poisonous: 'of Venom',
        vampiric: 'of the Vampire',
        holy: 'of the Divine',
        cursed: 'of Darkness',
        keen: 'of Precision',
        heavy: 'of Might',
        swift: 'of Speed'
    };
    
    const suffix = modifierSuffixes[modifiers[0]] || '';
    if (suffix) {
        weaponName = `${weaponName} ${suffix}`;
    }
}
    
    // Create unique ID for tracking, but keep original weapon ID for the weapon itself
const instanceId = `${baseWeapon.id}_${quality}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

// Create weapon object - USING BASE WEAPON STATS + QUALITY BONUS
// BUT using the ORIGINAL weapon ID from weapons.js
const weapon = {
    id: baseWeapon.id,  // Use the original ID like "holy_mace", not a generated one
    instanceId: instanceId, // Store generated ID separately for inventory tracking
    name: weaponName,
    baseName: baseWeapon.name,
    type: baseWeapon.type || baseWeapon.weaponSubtype,
    weaponSubtype: baseWeapon.weaponSubtype || baseWeapon.type,
    
    // Base stats from weapons.js + quality bonus
    baseDamage: baseWeapon.baseDamage + baseDamageBonus,
    maxDamage: baseWeapon.maxDamage + maxDamageBonus,
    baseMagicDamage: baseWeapon.baseMagicDamage ? baseWeapon.baseMagicDamage + magicDamageBonus : 0,
    healingBonus: baseWeapon.healingBonus ? baseWeapon.healingBonus + healingBonus : 0,
    
    level: weaponLevel,
    originalLevel: baseWeapon.level,
    quality: quality,
    qualityBonus: bonusPct,
    
    modifiers: modifiers,
    gemSlots: gemSlots,
    gems: [], // Initialize empty gems array
    
    cost: calculateWeaponValue(weaponLevel, quality, modifiers),
    description: baseWeapon.description || `A ${quality} quality ${baseWeapon.name}.`,
    isDropped: true,
        dropTimestamp: Date.now() // Track when it dropped
};

console.log("🔍 Step A: Weapon object created", !!weapon);

// Store the weapon instance in WEAPONS using instanceId as key
console.log("🔍 Step B: About to store in WEAPONS");
WEAPONS[instanceId] = weapon;
console.log("🔍 Step C: Stored in WEAPONS, exists now?", !!WEAPONS[instanceId]);

// Store the weapon instance in WEAPONS using instanceId as key
WEAPONS[instanceId] = weapon;


// Create inventory reference object
const inventoryItem = {
    weaponId: weapon.id,           // The base weapon ID (e.g., "holy_mace")
    instanceId: weapon.instanceId,  // The unique instance ID
    quality: weapon.quality,
    modifiers: weapon.modifiers || [],
    gemSlots: weapon.gemSlots || 0,
    gems: [],                       // Empty array for gems
    dropLevel: weapon.level,
    dropTime: Date.now()
};

// Add to player's inventory
if (gameState && gameState.player && gameState.player.inventory) {
    gameState.player.inventory.push(inventoryItem);
    console.log("📦 Added to inventory:", inventoryItem); // Debug line
}

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
/**
 * Generate a descriptive weapon name
 */
function generateWeaponName(weaponType, quality, modifiers, baseWeapon) {
    const qualityPrefixes = {
        poor: 'Poor',
        normal: '',
        rare: 'Rare',
        epic: 'Epic',
        legendary: 'Legendary',
        godly: 'Godly'
    };
    
    const modifierSuffixes = {
        fire_damage: 'of Flames',
        ice_damage: 'of Frost',
        poison_damage: 'of Venom',
        lightning_damage: 'of Lightning',
        shadow_damage: 'of Shadows',
        bleed: 'of Bleeding',
        damage_bonus: 'of Might',
        critical_bonus: 'of Precision',
        flaming: 'of Flames',
        freezing: 'of Frost',
        shocking: 'of Lightning',
        poisonous: 'of Venom',
        vampiric: 'of the Vampire',
        holy: 'of the Divine',
        cursed: 'of Darkness',
        keen: 'of Precision',
        heavy: 'of Might',
        swift: 'of Speed'
    };
    
    // Start with the base weapon name from weapons.js
    let name = baseWeapon.name;
    
    // Add quality prefix only for non-normal qualities
    if (quality !== 'normal') {
        const qualityName = qualityPrefixes[quality] || quality;
        // Capitalize Godly properly
        const prefix = quality === 'godly' ? 'Godly' : qualityName;
        name = `${prefix} ${baseWeapon.name}`;
    }
    
    // Add modifier suffix if exists (only for rare+)
    if (modifiers && modifiers.length > 0 && quality !== 'normal' && quality !== 'poor') {
        const suffix = modifierSuffixes[modifiers[0]] || '';
        if (suffix) {
            name = `${name} ${suffix}`;
        }
    }
    
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

// ═══════════════════════════════════════════════════════════════
// ARMOR DROP SYSTEM
// Same base drop rate as weapons, class-appropriate armor
// ═══════════════════════════════════════════════════════════════

const ARMOR_DROP_CONFIG = {
    baseDropChance: 0.04, // 4% base chance (same as weapons)
    rarityMultipliers: {
        common:   1.0,
        uncommon: 1.5,
        rare:     1.5,
        epic:     2.5,
        boss:     5.0
    }
};

// Which armor types each class can receive as drops
const CLASS_ARMOR_POOLS = {
    warrior:  ['chain_mail', 'scale_mail', 'plate_armor', 'full_plate', 'iron_armor'],
    paladin:  ['chain_mail', 'scale_mail', 'plate_armor', 'full_plate', 'iron_armor'],
    rogue:    ['leather_armor', 'leather_vest', 'studded_leather'],
    ranger:   ['leather_armor', 'studded_leather', 'hide_armor'],
    hunter:   ['leather_armor', 'studded_leather', 'hide_armor'],
    archer:   ['leather_armor', 'studded_leather', 'hide_armor'],
    mage:     ['cloth_robe', 'mage_robes', 'silk_robe'],
    warlock:  ['cloth_robe', 'dark_robes'],
    cleric:   ['padded_armor', 'chain_mail', 'holy_vestments'],
    acolyte:  ['cloth_robe', 'padded_armor']
};

/**
 * Generate a random armor drop appropriate to the player's class.
 * Returns an ARMOR key (string) or null if no drop.
 *
 * @param {object} player      - The player object
 * @param {number} enemyLevel  - Level of the defeated enemy
 * @param {string} enemyRarity - Rarity string of the enemy
 * @returns {string|null} ARMOR key or null if no drop
 */
function generateArmorDrop(player, enemyLevel, enemyRarity = 'common', skipRoll = false, forcedQuality = null) {
    // Roll drop chance (same structure as weapon drops)
    const baseChance  = ARMOR_DROP_CONFIG.baseDropChance;
    const rarityMult  = ARMOR_DROP_CONFIG.rarityMultipliers[enemyRarity] || 1.0;
    if (!skipRoll && Math.random() > baseChance * rarityMult) return null;

    const playerClass = player.baseClass || player.class;
    const maxLevel    = player.level + 2;

    // Build candidate list from class pool
    const poolKeys   = CLASS_ARMOR_POOLS[playerClass] || [];
    let candidates   = poolKeys.filter(k => {
        if (typeof ARMOR === 'undefined' || !ARMOR[k]) return false;
        const a = ARMOR[k];
        if (a.level && a.level > maxLevel) return false;
        if (a.allowedClasses && !a.allowedClasses.includes(playerClass)) return false;
        return true;
    });

    // Fallback: any armor the class can equip at this level
    if (candidates.length === 0 && typeof ARMOR !== 'undefined') {
        candidates = Object.keys(ARMOR).filter(k => {
            const a = ARMOR[k];
            if (a.level && a.level > maxLevel) return false;
            if (a.allowedClasses && !a.allowedClasses.includes(playerClass)) return false;
            return true;
        });
    }

    if (candidates.length === 0) return null;
    
    // Pick random base armor from candidates
    const baseArmorKey = candidates[Math.floor(Math.random() * candidates.length)];
    const baseArmor = ARMOR[baseArmorKey];
    
    // Determine quality
    let quality;
    if (forcedQuality) {
        quality = forcedQuality;
    } else {
        quality = rollQuality(); // Use the same quality rolling function as weapons
    }
    
    // Get quality bonus percentage
    const qualityData = QUALITY_CONFIG[quality] || QUALITY_CONFIG.normal;
    const bonusPct = qualityData.bonusPct;
    
    // Apply quality bonus to stats
    const defenseBonus = Math.floor(baseArmor.baseDefense * bonusPct);
    const magicBonus = baseArmor.baseMagicBonus ? Math.floor(baseArmor.baseMagicBonus * bonusPct) : 0;
    
    // Generate gem slots based on quality
    let gemSlots = 0;
    if (quality === 'rare') gemSlots = 1;
    if (quality === 'epic') gemSlots = 2;
    if (quality === 'legendary') gemSlots = 3;
    if (quality === 'godly') gemSlots = 4;
    
    // Create unique instance ID
    const instanceId = `${baseArmorKey}_${quality}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Generate armor name with quality prefix
    let armorName = baseArmor.name;
    if (quality !== 'normal') {
        const qualityDisplay = quality.charAt(0).toUpperCase() + quality.slice(1);
        armorName = `${qualityDisplay} ${baseArmor.name}`;
    }
    
    // Create armor instance in ARMOR object
    const armorInstance = {
        id: baseArmorKey,
        instanceId: instanceId,
        name: armorName,
        baseName: baseArmor.name,
        type: baseArmor.type || baseArmor.armorSubtype,
        armorSubtype: baseArmor.armorSubtype || baseArmor.type,
        baseDefense: baseArmor.baseDefense + defenseBonus,
        baseMagicBonus: (baseArmor.baseMagicBonus || 0) + magicBonus,
        level: baseArmor.level || 1,
        originalLevel: baseArmor.level || 1,
        quality: quality,
        qualityBonus: bonusPct,
        gems: [],
        gemSlots: gemSlots,
        cost: baseArmor.cost || 100,
        description: baseArmor.description || `A ${quality} quality ${baseArmor.name}.`,
        isDropped: true,
        dropTimestamp: Date.now()
    };
    
    // Store in ARMOR object using instanceId as key
    ARMOR[instanceId] = armorInstance;
    
    // Create inventory reference object
    const inventoryItem = {
        armorId: baseArmorKey,
        instanceId: instanceId,
        quality: quality,
        gems: [],
        gemSlots: gemSlots,
        dropLevel: enemyLevel,
        dropTime: Date.now()
    };
    
    // Add to player's inventory
    if (gameState && gameState.player && gameState.player.inventory) {
        gameState.player.inventory.push(inventoryItem);
        console.log(`📦 Added armor to inventory:`, inventoryItem);
    }
    
    return armorInstance;
}
