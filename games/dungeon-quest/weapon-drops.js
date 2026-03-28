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
    all_three: ['Prismatic', 'Chaotic', 'Elemental', 'Cosmic', 'Cataclysmic'],
        // NEW modifiers from your weapons
    chaos: ['Chaotic', 'Unstable', 'Raging', 'Wild', 'Destructive', 'Erratic'],
    confuse: ['Confusing', 'Disorienting', 'Bewildering', 'Mind-Bending', 'Maddening', 'Psychedelic'],
    critical_bonus: ['Precise', 'Keen', 'Accurate', 'Deadly', 'Marksman', 'Lethal'],
    dragon_bane: ['Dragon-Slaying', 'Wyrm-Bane', 'Scale-Piercing', 'Draconic', 'Dragonforged', 'Wyrmkiller'],
    giant_slayer: ['Giant-Slaying', 'Colossal', 'Titan', 'Mountain-Crusher', 'Jotun-Bane', 'Frost-Giant'],
    thunderous: ['Thundering', 'Storm', 'Lightning', 'Tempest', 'Thunderstruck', 'Storm-Bringer'],
    vorpal: ['Vorpal', 'Decapitating', 'Severing', 'Beheading', 'Neck-Slicing', 'Guillotine']
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
    armor_pierce: ['of Piercing', 'of Penetration', 'of the Drill', 'of the Needle'],
        // NEW modifiers from your weapons
    chaos: ['of Chaos', 'of Mayhem', 'of Destruction', 'of Anarchy', 'of Pandemonium'],
    confuse: ['of Confusion', 'of Madness', 'of Delirium', 'of the Lost Mind', 'of Dementia'],
    critical_bonus: ['of Precision', 'of Accuracy', 'of the Marksman', 'of the Assassin'],
    dragon_bane: ['of Dragons', 'of the Wyrm', 'of Scale', 'of the Drake', 'of the Serpent'],
    giant_slayer: ['of Giants', 'of the Colossus', 'of Titans', 'of the Jotun', 'of the Mountain'],
    thunderous: ['of Thunder', 'of Storms', 'of Lightning', 'of the Tempest', 'of the Sky'],
    vorpal: ['of Vorpal', 'of Severing', 'of the Guillotine', 'of Beheading', 'of the Headsman']
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

/*
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
    const baseWeaponId = baseWeapon.id;
    
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
    
    const instanceId = `${baseWeaponId}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const weaponName = generateEnhancedWeaponName(baseWeapon, quality, modifiers);
    
    const weapon = {
        id: baseWeaponId,
        weaponId: baseWeaponId,
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
*/


// ═══════════════════════════════════════════════════════════════
// WEAPON DROP SYSTEM - COMPLETE WORKING VERSION
// ═══════════════════════════════════════════════════════════════

// Helper function to roll quality for drops
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
    
    // Random selection
    const baseWeapon = candidates[Math.floor(Math.random() * candidates.length)];
    const baseWeaponId = baseWeapon.id;
    
    // Determine quality
    let quality;
    if (forcedQuality) {
        quality = forcedQuality;
    } else if (baseWeapon.quality && baseWeapon.quality !== 'normal') {
        quality = baseWeapon.quality;
    } else {
        quality = rollQuality();
    }
    
    const qualityData = QUALITY_CONFIG[quality] || QUALITY_CONFIG.normal;
    const bonusPct = qualityData.bonusPct;
    
    const baseDamageBonus = Math.floor(baseWeapon.baseDamage * bonusPct);
    const maxDamageBonus = baseWeapon.maxDamage ? Math.floor(baseWeapon.maxDamage * bonusPct) : baseDamageBonus;
    const magicDamageBonus = baseWeapon.baseMagicDamage ? Math.floor(baseWeapon.baseMagicDamage * bonusPct) : 0;
    const healingBonus = baseWeapon.healingBonus ? Math.floor(baseWeapon.healingBonus * bonusPct) : 0;
    
    // Generate modifiers (use the existing generateModifiers function)
    const modifiers = typeof generateModifiers === 'function' ? generateModifiers(quality, weaponLevel) : [];
    
    const gemSlots = {
        rare: 1,
        epic: 2,
        legendary: 3,
        godly: 4
    }[quality] || 0;
    
    const instanceId = `${baseWeaponId}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const weaponName = generateEnhancedWeaponName(baseWeapon, quality, modifiers);
    
    const weapon = {
        id: baseWeaponId,
        weaponId: baseWeaponId,
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
// ENHANCED WEAPON NAME GENERATION - SMART SYSTEM
// ═══════════════════════════════════════════════════════════════

function generateEnhancedWeaponName(baseWeapon, quality, modifiers) {
    if (!modifiers || modifiers.length === 0) {
        return baseWeapon.name;
    }
    
    // Priority order for deterministic output
    const priorityOrder = [
        'dragon_bane', 'giant_slayer', 'vorpal', 'lifesteal', 'thunderous',
        'damage_bonus', 'critical_bonus', 'bleed', 'weaken', 'confuse',
        'fire_damage', 'ice_damage', 'lightning_damage', 'poison_damage', 'shadow_damage'
    ];
    
    // Sort modifiers by priority
    const sortedMods = [...modifiers].sort((a, b) => {
        return priorityOrder.indexOf(a.modKey) - priorityOrder.indexOf(b.modKey);
    });
    
    const modKeys = sortedMods.map(m => m.modKey);
    
    // ========== 1 MODIFIER (Rare) ==========
    if (modifiers.length === 1) {
        const mod = sortedMods[0];
        const singleNames = {
            fire_damage: 'Flaming',
            ice_damage: 'Freezing',
            lightning_damage: 'Shocking',
            poison_damage: 'Venomous',
            shadow_damage: 'Shadow',
            damage_bonus: 'Mighty',
            critical_bonus: 'Precise',
            lifesteal: 'Vampiric',
            bleed: 'Barbed',
            weaken: 'Weakening',
            confuse: 'Confusing',
            dragon_bane: 'Dragon-Slaying',
            giant_slayer: 'Giant-Slaying',
            vorpal: 'Vorpal',
            thunderous: 'Thundering'
        };
        const prefix = singleNames[mod.modKey] || mod.name;
        return `${prefix} ${baseWeapon.name}`;
    }
    
    // ========== 2 MODIFIERS (Epic) ==========
    if (modifiers.length === 2) {
        const a = sortedMods[0];
        const b = sortedMods[1];
        
        // Elemental + Elemental combinations
        const elementalPairs = {
            'fire_damage+ice_damage': 'Frostfire',
            'fire_damage+lightning_damage': 'Stormfire',
            'ice_damage+lightning_damage': 'Frostshock',
            'fire_damage+poison_damage': 'Venomfire',
            'ice_damage+poison_damage': 'Frostvenom',
            'lightning_damage+poison_damage': 'Venom Storm',
            'fire_damage+shadow_damage': 'Shadowflame',
            'ice_damage+shadow_damage': 'Shadowfrost',
            'lightning_damage+shadow_damage': 'Shadow Storm',
            'poison_damage+shadow_damage': 'Venom Shadow'
        };
        
        const key = [a.modKey, b.modKey].sort().join('+');
        if (elementalPairs[key]) {
            return `${elementalPairs[key]} ${baseWeapon.name}`;
        }
        
        // Bane combinations
        if (a.modKey === 'dragon_bane' && b.modKey === 'giant_slayer') {
            return `Titanbane ${baseWeapon.name}`;
        }
        
        // Special combinations
        const specialPairs = {
            'lifesteal+damage_bonus': 'Bloodfist',
            'lifesteal+critical_bonus': 'Bloodthirst',
            'lifesteal+lightning_damage': 'Stormblood',
            'lifesteal+vorpal': 'Bloodreaver',
            'lifesteal+thunderous': 'Bloodstorm',
            'vorpal+thunderous': 'Thunderstrike',
            'vorpal+damage_bonus': 'Headsman',
            'thunderous+damage_bonus': 'Thunderfist',
            'critical_bonus+damage_bonus': 'Mighty Blow',
            'critical_bonus+lightning_damage': 'Thunderstrike',
            'bleed+damage_bonus': 'Rending'
        };
        
        if (specialPairs[key]) {
            return `${specialPairs[key]} ${baseWeapon.name}`;
        }
        
        // Default: combine modifier names
        return `${a.name} ${b.name} ${baseWeapon.name}`;
    }
    
    // ========== 3-4 MODIFIERS (Legendary/Godly) ==========
    
    // Categorize modifiers
    const categories = {
        elemental: [],
        bane: [],
        special: [],
        damage: []
    };
    
    for (const mod of sortedMods) {
        if (['fire_damage', 'ice_damage', 'lightning_damage', 'poison_damage', 'shadow_damage'].includes(mod.modKey)) {
            categories.elemental.push(mod);
        } else if (['dragon_bane', 'giant_slayer'].includes(mod.modKey)) {
            categories.bane.push(mod);
        } else if (['lifesteal', 'vorpal', 'thunderous', 'confuse'].includes(mod.modKey)) {
            categories.special.push(mod);
        } else {
            categories.damage.push(mod);
        }
    }
    
    let nameParts = [];
    
    // Handle elemental combos
    if (categories.elemental.length >= 3) {
        const hasFire = categories.elemental.some(m => m.modKey === 'fire_damage');
        const hasIce = categories.elemental.some(m => m.modKey === 'ice_damage');
        const hasLightning = categories.elemental.some(m => m.modKey === 'lightning_damage');
        const hasPoison = categories.elemental.some(m => m.modKey === 'poison_damage');
        const hasShadow = categories.elemental.some(m => m.modKey === 'shadow_damage');
        
        if (hasFire && hasIce && hasLightning) {
            if (hasPoison) nameParts.push('Prismatic Venom');
            else if (hasShadow) nameParts.push('Prismatic Void');
            else nameParts.push('Prismatic');
        } else if (hasFire && hasIce) nameParts.push('Frostfire');
        else if (hasFire && hasLightning) nameParts.push('Stormfire');
        else if (hasIce && hasLightning) nameParts.push('Frostshock');
        else if (hasFire && hasPoison) nameParts.push('Venomfire');
        else if (hasIce && hasPoison) nameParts.push('Frostvenom');
        else if (hasLightning && hasPoison) nameParts.push('Venom Storm');
        else if (hasFire && hasShadow) nameParts.push('Shadowflame');
        else if (hasIce && hasShadow) nameParts.push('Shadowfrost');
        else if (hasLightning && hasShadow) nameParts.push('Shadow Storm');
        else if (hasPoison && hasShadow) nameParts.push('Venom Shadow');
    } else if (categories.elemental.length === 2) {
        const a = categories.elemental[0];
        const b = categories.elemental[1];
        const elementalPairs = {
            'fire_damage+ice_damage': 'Frostfire',
            'fire_damage+lightning_damage': 'Stormfire',
            'ice_damage+lightning_damage': 'Frostshock',
            'fire_damage+poison_damage': 'Venomfire',
            'ice_damage+poison_damage': 'Frostvenom',
            'lightning_damage+poison_damage': 'Venom Storm',
            'fire_damage+shadow_damage': 'Shadowflame',
            'ice_damage+shadow_damage': 'Shadowfrost',
            'lightning_damage+shadow_damage': 'Shadow Storm',
            'poison_damage+shadow_damage': 'Venom Shadow'
        };
        const key = [a.modKey, b.modKey].sort().join('+');
        if (elementalPairs[key]) nameParts.push(elementalPairs[key]);
    } else if (categories.elemental.length === 1) {
        const elem = categories.elemental[0];
        const elemNames = { fire_damage: 'Flame', ice_damage: 'Frost', lightning_damage: 'Storm', poison_damage: 'Venom', shadow_damage: 'Shadow' };
        nameParts.push(elemNames[elem.modKey]);
    }
    
    // Handle bane combos
    if (categories.bane.length === 2) {
        nameParts.push('Titanbane');
    } else if (categories.bane.length === 1) {
        const bane = categories.bane[0];
        if (bane.modKey === 'dragon_bane') nameParts.push('Wyrmbane');
        if (bane.modKey === 'giant_slayer') nameParts.push('Titanfall');
    }
    
    // Handle special combos
    const hasVamp = categories.special.some(m => m.modKey === 'lifesteal');
    const hasVorpal = categories.special.some(m => m.modKey === 'vorpal');
    const hasThunder = categories.special.some(m => m.modKey === 'thunderous');
    const hasConfuse = categories.special.some(m => m.modKey === 'confuse');
    
    if (hasVamp && hasVorpal && hasThunder) {
        nameParts.push('Bloodstorm');
    } else if (hasVamp && hasVorpal) {
        nameParts.push('Bloodreaver');
    } else if (hasVamp && hasThunder) {
        nameParts.push('Stormblood');
    } else if (hasVorpal && hasThunder) {
        nameParts.push('Thunderstrike');
    } else if (hasVamp) {
        nameParts.push('Vampiric');
    } else if (hasVorpal) {
        nameParts.push('Vorpal');
    } else if (hasThunder) {
        nameParts.push('Thundering');
    } else if (hasConfuse) {
        nameParts.push('Maddening');
    }
    
    // Handle damage modifiers as fallback
    if (nameParts.length === 0 && categories.damage.length > 0) {
        const hasPower = categories.damage.some(m => m.modKey === 'damage_bonus');
        const hasCrit = categories.damage.some(m => m.modKey === 'critical_bonus');
        const hasBleed = categories.damage.some(m => m.modKey === 'bleed');
        const hasWeaken = categories.damage.some(m => m.modKey === 'weaken');
        
        if (hasPower && hasCrit) nameParts.push('Mighty');
        else if (hasPower && hasBleed) nameParts.push('Rending');
        else if (hasPower) nameParts.push('Powerful');
        else if (hasCrit) nameParts.push('Precise');
        else if (hasBleed) nameParts.push('Barbed');
        else if (hasWeaken) nameParts.push('Weakening');
        else nameParts.push(categories.damage[0].name);
    }
    
    // Ultimate fallback
    if (nameParts.length === 0) {
        nameParts.push(sortedMods[0].name);
    }
    
    // Build final name
    let finalName = nameParts.join(' ');
    finalName = `${finalName} ${baseWeapon.name}`;
    
    return finalName.trim();
}

console.log('✅ Weapon drop system loaded with generateWeaponDrop function');

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
    const baseArmorId = baseArmor.id;
    
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
    
    // ← FIX: Armor does NOT have gem slots (set to 0)
    const gemSlots = 0;  // ← CHANGED: was using quality mapping, now always 0
    
    const instanceId = `${baseArmorId}_${quality}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
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
        id: baseArmorId,
        armorId: baseArmorId,
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
        gemSlots: gemSlots,  // ← FIXED: always 0
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
        gemSlots: gemSlots,  // ← FIXED: always 0
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