// ═══════════════════════════════════════════════════════════════
// WEAPON DROP SYSTEM - COMPLETE REVISION
// Features:
// - Predefined quality enforcement (Dragon Crown always godly, etc.)
// - Enhanced naming (no quality prefix, primary modifier as suffix)
// - Level-scaling modifiers (stronger at lvl 10, 20, 25)
// - Full weapon pool (all weapons, not just basic types)
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
        rare: 2.0,
        epic: 3.0,
        legendary: 4.0,
        boss: 5.0
    },
    
    // Quality distribution for random rolls (when no predefined quality)
    qualityWeights: {
        poor: 5,      // 5% chance
        normal: 35,   // 35% chance
        rare: 35,     // 35% chance
        epic: 18,     // 18% chance
        legendary: 6, // 6% chance
        godly: 1      // 1% chance
    }
};

// ═══════════════════════════════════════════════════════════════
// MODIFIER TIERS - SCALING BY WEAPON LEVEL
// ═══════════════════════════════════════════════════════════════
const MODIFIER_TIERS = {
    // Tier 1: Levels 1-9 (Basic)
    tier1: {
        name: 'Basic',
        damage_range: [1, 4],
        percent_range: [2, 6],
        crit_range: [2, 5],
        lifesteal_range: [2, 5],
        pierce_range: [3, 8]
    },
    // Tier 2: Levels 10-19 (Advanced)
    tier2: {
        name: 'Advanced',
        damage_range: [5, 12],
        percent_range: [8, 15],
        crit_range: [6, 12],
        lifesteal_range: [6, 12],
        pierce_range: [10, 20]
    },
    // Tier 3: Levels 20-24 (Master)
    tier3: {
        name: 'Master',
        damage_range: [13, 25],
        percent_range: [16, 25],
        crit_range: [13, 20],
        lifesteal_range: [13, 20],
        pierce_range: [22, 35]
    },
    // Tier 4: Level 25+ (Legendary)
    tier4: {
        name: 'Legendary',
        damage_range: [26, 40],
        percent_range: [26, 35],
        crit_range: [21, 30],
        lifesteal_range: [21, 30],
        pierce_range: [36, 50]
    }
};

// ═══════════════════════════════════════════════════════════════
// ENHANCED NAMING SYSTEM - No quality prefix, primary modifier as suffix
// ═══════════════════════════════════════════════════════════════

const MODIFIER_ADJECTIVES = {
    // Elemental
    fire_damage: ['Flaming', 'Burning', 'Scorching', 'Inferno', 'Blazing', 'Flame-Touched'],
    ice_damage: ['Freezing', 'Icy', 'Frost', 'Glacial', 'Arctic', 'Winter\'s Bite'],
    lightning_damage: ['Shocking', 'Storm', 'Thundering', 'Lightning', 'Tempest', 'Thunderstruck'],
    poison_damage: ['Venomous', 'Toxic', 'Poison', 'Virulent', 'Plague', 'Cursed'],
    shadow_damage: ['Shadow', 'Dark', 'Void', 'Umbral', 'Abyssal', 'Nightfall'],
    
    // Effects
    lifesteal: ['Vampiric', 'Leeching', 'Soul-Stealing', 'Blood-Drinker', 'Life-Siphon', 'Crimson'],
    bleed: ['Barbed', 'Serrated', 'Razor', 'Gut-Slashing', 'Bloodletter', 'Ripper'],
    crit_bonus: ['Precise', 'Keen', 'Accurate', 'Deadly', 'Marksman', 'Lethal'],
    damage_bonus: ['Mighty', 'Powerful', 'Devastating', 'Crushing', 'Overwhelming', 'Colossal'],
    armor_pierce: ['Piercing', 'Penetrating', 'Armor-Shredding', 'Rending', 'Puncturing', 'Drill'],
    
    // Special
    holy: ['Holy', 'Divine', 'Blessed', 'Sacred', 'Consecrated', 'Hallowed'],
    curse: ['Cursed', 'Dark', 'Blighted', 'Corrupted', 'Damned', 'Haunted'],
    speed: ['Swift', 'Quick', 'Fast', 'Agile', 'Lightning-Fast', 'Blurring'],
    
    // Combinations
    fire_ice: ['Frostfire', 'Elemental', 'Prismatic', 'Dual-Element'],
    fire_lightning: ['Stormfire', 'Plasma', 'Maelstrom', 'Thunderflame'],
    ice_lightning: ['Frostshock', 'Blizzard', 'Tempest', 'Stormfrost'],
    all_three: ['Prismatic', 'Chaotic', 'Elemental', 'Cosmic', 'Cataclysmic']
};

const MODIFIER_SUFFIXES = {
    fire_damage: ['of Fire', 'of Flame', 'of the Inferno', 'of the Phoenix', 'of Embers'],
    ice_damage: ['of Ice', 'of Frost', 'of the North Wind', 'of Winter', 'of the Glacier'],
    lightning_damage: ['of Lightning', 'of Storms', 'of Thunder', 'of the Tempest', 'of the Sky'],
    lifesteal: ['of the Vampire', 'of Blood', 'of Life', 'of the Leech', 'of the Crimson'],
    holy: ['of the Divine', 'of Light', 'of the Gods', 'of the Heavens', 'of the Radiant'],
    shadow_damage: ['of Shadows', 'of Darkness', 'of the Void', 'of Night', 'of the Abyss'],
    poison_damage: ['of Venom', 'of Poison', 'of the Plague', 'of the Serpent', 'of Toxins'],
    bleed: ['of Bleeding', 'of the Wound', 'of the Gore', 'of the Cut'],
    crit_bonus: ['of Precision', 'of Accuracy', 'of the Marksman', 'of the Assassin'],
    damage_bonus: ['of Might', 'of Power', 'of the Giant', 'of Destruction'],
    armor_pierce: ['of Piercing', 'of Penetration', 'of the Drill', 'of the Needle']
};



// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function randomChoice(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
}

function rollQuality() {
    const weights = WEAPON_DROP_CONFIG.qualityWeights;
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let roll = Math.random() * totalWeight;
    
    for (const [quality, weight] of Object.entries(weights)) {
        roll -= weight;
        if (roll <= 0) return quality;
    }
    return 'normal';
}

function getModifierTier(weaponLevel) {
    if (weaponLevel >= 25) return MODIFIER_TIERS.tier4;
    if (weaponLevel >= 20) return MODIFIER_TIERS.tier3;
    if (weaponLevel >= 10) return MODIFIER_TIERS.tier2;
    return MODIFIER_TIERS.tier1;
}

// ═══════════════════════════════════════════════════════════════
// SCALED MODIFIER GENERATION
// ═══════════════════════════════════════════════════════════════

function generateScaledModifier(modKey, weaponLevel) {
    const tier = getModifierTier(weaponLevel);
    const mod = WEAPON_MODIFIERS[modKey];
    if (!mod) return null;
    
    let value = 0;
    let range = [];
    
    if (mod.minDamage !== undefined) {
        range = tier.damage_range;
        value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    } else if (mod.critBonus !== undefined) {
        range = tier.crit_range;
        value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    } else if (mod.lifestealPercent !== undefined) {
        range = tier.lifesteal_range;
        value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    } else if (mod.armorPierce !== undefined) {
        range = tier.pierce_range;
        value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    } else {
        range = tier.percent_range;
        value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    }
    
    return {
        ...mod,
        modKey: modKey,
        minDamage: mod.minDamage !== undefined ? value : undefined,
        maxDamage: mod.maxDamage !== undefined ? value + Math.floor(value * 0.5) : undefined,
        critBonus: mod.critBonus !== undefined ? value : undefined,
        lifestealPercent: mod.lifestealPercent !== undefined ? value : undefined,
        armorPierce: mod.armorPierce !== undefined ? value / 100 : undefined,
        damageBonus: mod.damageBonus !== undefined ? value / 100 : undefined,
        scaledValue: value,
        tier: tier.name
    };
}

// ═══════════════════════════════════════════════════════════════
// MODIFIER GENERATION
// ═══════════════════════════════════════════════════════════════

function generateModifiers(quality, weaponLevel) {
    const pool = QUALITY_MODIFIER_POOLS[quality];
    if (!pool || pool.modifierCount === 0) {
        return [];
    }
    
    const modifiers = [];
    const available = [...pool.availableModifiers];
    
    let modifierCount = pool.modifierCount;
    
    // Bonus modifier at high levels
    if (weaponLevel >= 20) {
        const bonusChance = weaponLevel >= 25 ? 0.4 : 0.2;
        if (Math.random() < bonusChance && modifierCount < 3) {
            modifierCount++;
        }
    }
    
    for (let i = 0; i < modifierCount && available.length > 0; i++) {
        const index = Math.floor(Math.random() * available.length);
        const modKey = available.splice(index, 1)[0];
        
        const scaledMod = generateScaledModifier(modKey, weaponLevel);
        if (scaledMod) {
            modifiers.push(scaledMod);
        }
    }
    
    return modifiers;
}

// ═══════════════════════════════════════════════════════════════
// ENHANCED WEAPON NAME GENERATION
// ═══════════════════════════════════════════════════════════════

function generateEnhancedWeaponName(baseWeapon, quality, modifiers) {
    if (!modifiers || modifiers.length === 0) {
        let name = baseWeapon.name;
        
        // Quality-specific flavor for items with no modifiers
        if (quality === 'legendary') {
            const legendaryPrefixes = ['Ancient', 'Mythic', 'Eternal', 'Dragonforged'];
            name = `${randomChoice(legendaryPrefixes)} ${name}`;
        } else if (quality === 'godly') {
            const godlyPrefixes = ['Divine', 'Immortal', 'Primordial', 'Celestial'];
            name = `${randomChoice(godlyPrefixes)} ${name}`;
        } else if (quality === 'epic') {
            const epicPrefixes = ['Mighty', 'Exquisite', 'Flawless', 'Masterwork'];
            name = `${randomChoice(epicPrefixes)} ${name}`;
        }
        return name;
    }
    
    // PRIMARY MODIFIER = first in list (goes to suffix)
    // SECONDARY MODIFIERS = rest of the list (go to prefix)
    const primaryMod = modifiers[0];
    const secondaryMods = modifiers.slice(1);
    
    let nameParts = [];
    
    // Check for elemental combinations among secondary modifiers
    let remainingMods = [...secondaryMods];
    let comboAdjective = '';
    
    const hasFire = remainingMods.some(m => m.modKey === 'fire_damage' || m.modKey === 'flaming');
    const hasIce = remainingMods.some(m => m.modKey === 'ice_damage' || m.modKey === 'freezing');
    const hasLightning = remainingMods.some(m => m.modKey === 'lightning_damage' || m.modKey === 'shocking');
    
    if (hasFire && hasIce && hasLightning) {
        comboAdjective = randomChoice(MODIFIER_ADJECTIVES.all_three);
        remainingMods = remainingMods.filter(m => 
            !['fire_damage', 'flaming', 'ice_damage', 'freezing', 'lightning_damage', 'shocking'].includes(m.modKey)
        );
    } else if (hasFire && hasIce) {
        comboAdjective = randomChoice(MODIFIER_ADJECTIVES.fire_ice);
        remainingMods = remainingMods.filter(m => 
            !['fire_damage', 'flaming', 'ice_damage', 'freezing'].includes(m.modKey)
        );
    } else if (hasFire && hasLightning) {
        comboAdjective = randomChoice(MODIFIER_ADJECTIVES.fire_lightning);
        remainingMods = remainingMods.filter(m => 
            !['fire_damage', 'flaming', 'lightning_damage', 'shocking'].includes(m.modKey)
        );
    } else if (hasIce && hasLightning) {
        comboAdjective = randomChoice(MODIFIER_ADJECTIVES.ice_lightning);
        remainingMods = remainingMods.filter(m => 
            !['ice_damage', 'freezing', 'lightning_damage', 'shocking'].includes(m.modKey)
        );
    }
    
    if (comboAdjective) {
        nameParts.push(comboAdjective);
    }
    
    // Add adjectives for remaining secondary modifiers
    const prefixes = [];
    for (let i = 0; i < Math.min(remainingMods.length, 2); i++) {
        const mod = remainingMods[i];
        const adjPool = MODIFIER_ADJECTIVES[mod.modKey];
        if (adjPool) {
            prefixes.push(randomChoice(adjPool));
        }
    }
    
    // Add quality-specific flavor
    if (quality === 'legendary' && prefixes.length < 2) {
        const legendaryAdjs = ['Ancient', 'Mythic', 'Eternal', 'Dragonforged'];
        prefixes.unshift(randomChoice(legendaryAdjs));
    } else if (quality === 'godly' && prefixes.length < 2) {
        const godlyAdjs = ['Divine', 'Immortal', 'Primordial', 'Celestial'];
        prefixes.unshift(randomChoice(godlyAdjs));
    } else if (quality === 'epic' && prefixes.length === 0) {
        const epicAdjs = ['Mighty', 'Exquisite', 'Flawless', 'Masterwork'];
        prefixes.push(randomChoice(epicAdjs));
    }
    
    if (prefixes.length > 0) {
        nameParts.push(prefixes.join(' '));
    }
    
    // Add base weapon name
    nameParts.push(baseWeapon.name);
    
    // Add primary modifier suffix
    let suffix = '';
    if (primaryMod && MODIFIER_SUFFIXES[primaryMod.modKey]) {
        suffix = randomChoice(MODIFIER_SUFFIXES[primaryMod.modKey]);
    }
    
    if (suffix) {
        nameParts.push(suffix);
    }
    
    return nameParts.join(' ');
}

// ═══════════════════════════════════════════════════════════════
// MAIN WEAPON GENERATION FUNCTION
// ═══════════════════════════════════════════════════════════════

function generateWeaponDrop(player, enemyLevel, enemyRarity = 'common', skipRoll = false, forcedQuality = null) {
    // Calculate drop chance (skip if forced)
    if (!skipRoll) {
        const baseChance = WEAPON_DROP_CONFIG.baseDropChance;
        const rarityMult = WEAPON_DROP_CONFIG.rarityMultipliers[enemyRarity] || 1.0;
        const dropChance = baseChance * rarityMult;
        
        if (Math.random() > dropChance) {
            return null;
        }
    }
    
    // Determine weapon level
let weaponLevel;
if (skipRoll) {
    // For forced drops, use enemy level (so it's appropriate for the enemy)
    weaponLevel = enemyLevel;
} else {
    const minLevel = Math.max(1, enemyLevel - 2);
    const maxLevel = Math.min(30, enemyLevel + 2);
    weaponLevel = minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));
}
    
    const playerClass = player.baseClass || player.class;
    
    // Build candidate list from ALL weapons
    const candidates = [];
    for (const [weaponId, weapon] of Object.entries(WEAPONS)) {
        if (weapon.unarmed) continue;
        if (weapon.instanceId) continue;
        if (weapon.canDrop === false) continue;
    
        
        // Level check - only weapons within ±2 levels
        if (weapon.level && (weapon.level < weaponLevel - 2 || weapon.level > weaponLevel + 2)) continue;
        
        // Class restriction check
        if (weapon.allowedClasses && !weapon.allowedClasses.includes(playerClass)) continue;
        
        candidates.push({
            id: weaponId,
            ...weapon
        });
    }
    
    if (candidates.length === 0) {
        console.warn('No eligible weapons found for drop');
        return null;
    }
    
    // Random selection - no sorting bias
    const baseWeapon = candidates[Math.floor(Math.random() * candidates.length)];
    
    // Determine quality - Honor predefined quality
    let quality;
    if (forcedQuality) {
        quality = forcedQuality;
    } else if (baseWeapon.quality && baseWeapon.quality !== 'normal') {
        quality = baseWeapon.quality;
        console.log(`🎯 Forcing quality '${quality}' for ${baseWeapon.name} (predefined)`);
    } else {
        quality = rollQuality();
    }
    
    const qualityData = QUALITY_CONFIG[quality] || QUALITY_CONFIG.normal;
    const bonusPct = qualityData.bonusPct;
    
    const baseDamageBonus = Math.floor(baseWeapon.baseDamage * bonusPct);
    const maxDamageBonus = baseWeapon.maxDamage ? Math.floor(baseWeapon.maxDamage * bonusPct) : baseDamageBonus;
    const magicDamageBonus = baseWeapon.baseMagicDamage ? Math.floor(baseWeapon.baseMagicDamage * bonusPct) : 0;
    const healingBonus = baseWeapon.healingBonus ? Math.floor(baseWeapon.healingBonus * bonusPct) : 0;
    
    const modifiers = generateModifiers(quality, weaponLevel);
    
    const gemSlots = {
        rare: 1,
        epic: 2,
        legendary: 3,
        godly: 4
    }[quality] || 0;
    
    const instanceId = `${baseWeapon.id}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const weaponName = generateEnhancedWeaponName(baseWeapon, quality, modifiers);
    
    const weapon = {
        id: baseWeapon.id,
        weaponId: baseWeapon.id,
        instanceId: instanceId,
        name: weaponName,
        baseName: baseWeapon.name,
        type: baseWeapon.type || baseWeapon.weaponSubtype,
        weaponSubtype: baseWeapon.weaponSubtype || baseWeapon.type,
        
        baseDamage: baseWeapon.baseDamage + baseDamageBonus,
        maxDamage: (baseWeapon.maxDamage || baseWeapon.baseDamage) + maxDamageBonus,
        baseMagicDamage: baseWeapon.baseMagicDamage ? baseWeapon.baseMagicDamage + magicDamageBonus : 0,
        healingBonus: baseWeapon.healingBonus ? baseWeapon.healingBonus + healingBonus : 0,
        
        level: weaponLevel,
        originalLevel: baseWeapon.level,
        quality: quality,
        qualityBonus: bonusPct,
        
        modifiers: modifiers,
        gemSlots: gemSlots,
        gems: [],
        
        cost: Math.floor((weaponLevel * 40) * (quality === 'godly' ? 10 : quality === 'legendary' ? 8 : quality === 'epic' ? 4 : quality === 'rare' ? 1.5 : 1)),
        description: baseWeapon.description || `A ${quality} quality ${baseWeapon.name}.`,
        
        allowedClasses: baseWeapon.allowedClasses,
        classRestriction: baseWeapon.classRestriction,
        
        isDropped: true,
        dropTimestamp: Date.now()
    };
    
    WEAPONS[instanceId] = weapon;
    return weapon;
}

// ═══════════════════════════════════════════════════════════════
// ARMOR DROP SYSTEM - EXPANDED TO INCLUDE ALL ARMOR
// ═══════════════════════════════════════════════════════════════

const ARMOR_DROP_CONFIG = {
    baseDropChance: 0.04,
    rarityMultipliers: {
        common: 1.0,
        uncommon: 1.5,
        rare: 2.0,
        epic: 3.0,
        legendary: 4.0,
        boss: 5.0
    }
};

function generateArmorDrop(player, enemyLevel, enemyRarity = 'common', skipRoll = false, forcedQuality = null) {
    // Roll drop chance
    if (!skipRoll) {
        const baseChance = ARMOR_DROP_CONFIG.baseDropChance;
        const rarityMult = ARMOR_DROP_CONFIG.rarityMultipliers[enemyRarity] || 1.0;
        if (Math.random() > baseChance * rarityMult) return null;
    }
    
    const playerClass = player.baseClass || player.class;
    
    // Determine armor level (use enemy level for forced drops)
    let armorLevel;
    if (skipRoll) {
        armorLevel = enemyLevel;
    } else {
        // For random drops, use enemy level with ±2 range
        const minLevel = Math.max(1, enemyLevel - 2);
        const maxLevel = Math.min(30, enemyLevel + 2);
        armorLevel = minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));
    }
    
    // Build candidate list from ALL armor
    const candidates = [];
    for (const [armorId, armor] of Object.entries(ARMOR)) {
        if (armor.instanceId) continue;
        if (armor.unarmored) continue;
        
        // Level check - only armor within ±2 levels of the target armor level
        if (armor.level && (armor.level < armorLevel - 2 || armor.level > armorLevel + 2)) continue;
        
        // Class check
        if (armor.allowedClasses && !armor.allowedClasses.includes(playerClass)) continue;
        
        candidates.push({
            id: armorId,
            ...armor
        });
    }
    
    if (candidates.length === 0) return null;
    
    // Random selection
    const baseArmor = candidates[Math.floor(Math.random() * candidates.length)];
    
    // Determine quality
    let quality;
    if (forcedQuality) {
        quality = forcedQuality;
    } else if (baseArmor.quality && baseArmor.quality !== 'normal') {
        quality = baseArmor.quality;
        console.log(`🎯 Forcing quality '${quality}' for ${baseArmor.name} (predefined)`);
    } else {
        quality = rollQuality();
    }
    
    const qualityData = QUALITY_CONFIG[quality] || QUALITY_CONFIG.normal;
    const bonusPct = qualityData.bonusPct;
    
    const defenseBonus = Math.floor(baseArmor.baseDefense * bonusPct);
    const magicBonus = baseArmor.baseMagicBonus ? Math.floor(baseArmor.baseMagicBonus * bonusPct) : 0;
    const resistBonus = baseArmor.magicResist ? Math.floor(baseArmor.magicResist * bonusPct) : 0;
    
    const gemSlots = {
        rare: 1,
        epic: 2,
        legendary: 3,
        godly: 4
    }[quality] || 0;
    
    const instanceId = `${baseArmor.id}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    let armorName = baseArmor.name;
    if (quality === 'legendary') {
        const prefixes = ['Ancient', 'Mythic', 'Eternal', 'Dragonforged'];
        armorName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseArmor.name}`;
    } else if (quality === 'godly') {
        const prefixes = ['Divine', 'Immortal', 'Primordial', 'Celestial'];
        armorName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseArmor.name}`;
    } else if (quality === 'epic') {
        const prefixes = ['Mighty', 'Exquisite', 'Flawless', 'Masterwork'];
        armorName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseArmor.name}`;
    }
    
    const armorInstance = {
        id: baseArmor.id,
        armorId: baseArmor.id,
        instanceId: instanceId,
        name: armorName,
        baseName: baseArmor.name,
        type: baseArmor.type || baseArmor.armorSubtype || baseArmor.slot || 'armor',
        armorSubtype: baseArmor.armorSubtype || baseArmor.type || baseArmor.slot || 'armor',
        baseDefense: baseArmor.baseDefense + defenseBonus,
        baseMagicBonus: (baseArmor.baseMagicBonus || 0) + magicBonus,
        magicResist: (baseArmor.magicResist || 0) + resistBonus,
        level: armorLevel,  // ← Use armorLevel, not baseArmor.level
        originalLevel: baseArmor.level || 1,
        quality: quality,
        qualityBonus: bonusPct,
        gems: [],
        gemSlots: gemSlots,
        cost: baseArmor.cost ? Math.floor(baseArmor.cost * (1 + bonusPct)) : 100,
        description: baseArmor.description || `A ${quality} quality ${baseArmor.name}.`,
        allowedClasses: baseArmor.allowedClasses,
        isDropped: true,
        dropTimestamp: Date.now()
    };
    
    ARMOR[instanceId] = armorInstance;
    
    const inventoryItem = {
        armorId: baseArmor.id,
        instanceId: instanceId,
        quality: quality,
        gems: [],
        gemSlots: gemSlots,
        dropLevel: enemyLevel,
        dropTime: Date.now()
    };
    
    if (gameState && gameState.player && gameState.player.inventory) {
        gameState.player.inventory.push(inventoryItem);
    }
    
    return armorInstance;
}

console.log('✅ Weapon drop system loaded with enhanced features:');
console.log('   - Predefined quality enforcement');
console.log('   - Level-scaling modifiers (10, 20, 25)');
console.log('   - Enhanced naming (primary modifier as suffix)');
console.log('   - Full weapon/armor pools (all items available)');