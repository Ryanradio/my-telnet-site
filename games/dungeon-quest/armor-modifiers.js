// ═══════════════════════════════════════════════════════════════
// ARMOR MODIFIERS - Defensive & Utility Modifiers for Armor
// No overlap with weapon modifiers (fire, ice, poison, etc.)
// ═══════════════════════════════════════════════════════════════

const ARMOR_MODIFIERS = {
    // ═══════════════════════════════════════════════════════════════
    // DEFENSIVE MODIFIERS
    // ═══════════════════════════════════════════════════════════════
    bulwark: {
        name: 'Bulwark',
        description: 'Increases maximum HP',
        stat: 'hpBonus',
        statType: 'flat',
        color: '#FF4444',
        icon: '❤️'
    },
    
    windstep: {
        name: 'Windstep',
        description: 'Increases dodge chance',
        stat: 'dodgeBonus',
        statType: 'percent',
        color: '#88FF88',
        icon: '🍃'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // RETALIATION MODIFIERS (Thorns)
    // ═══════════════════════════════════════════════════════════════
    barbed: {
        name: 'Barbed',
        description: 'Returns flat damage to attackers',
        stat: 'thornsDamage',
        statType: 'flat',
        color: '#FF8844',
        icon: '⚔️'
    },
    
    spiked: {
        name: 'Spiked',
        description: 'Returns percentage of incoming damage',
        stat: 'thornsPercent',
        statType: 'percent',
        color: '#FF6644',
        icon: '🩸'
    },
    
    reflective: {
        name: 'Reflective',
        description: 'Chance to reflect damage back',
        stat: 'reflectChance',
        statType: 'percent',
        color: '#CCAAFF',
        icon: '🪞'
    },
    
    static_discharge: {
        name: 'Static Discharge',
        description: 'Chance to shock attacker',
        stat: 'shockChance',
        statType: 'percent',
        color: '#FFFF88',
        icon: '⚡'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // RECOVERY MODIFIERS
    // ═══════════════════════════════════════════════════════════════
    regenerating: {
        name: 'Regenerating',
        description: 'Restores HP every turn',
        stat: 'hpRegen',
        statType: 'flat',
        color: '#44FF88',
        icon: '💚'
    },
    
    resonant: {
        name: 'Resonant',
        description: 'Restores MP every turn',
        stat: 'mpRegen',
        statType: 'flat',
        color: '#4488FF',
        icon: '✨'
    },
    
    leeching: {
        name: 'Leeching',
        description: 'Chance to heal from damage taken',
        stat: 'leechChance',
        statType: 'percent',
        color: '#AA44AA',
        icon: '🩸'
    },
    
    gluttonous: {
        name: 'Gluttonous',
        description: 'Heals when you kill an enemy',
        stat: 'killHeal',
        statType: 'flat',
        color: '#FF6644',
        icon: '🍖'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // EXPERIENCE & LOOT MODIFIERS
    // ═══════════════════════════════════════════════════════════════
    sage: {
        name: 'Sage',
        description: 'Increases XP gain',
        stat: 'xpBonus',
        statType: 'percent',
        color: '#FFD700',
        icon: '📖'
    },
    
    merchants: {
        name: "Merchant's",
        description: 'Increases gold find',
        stat: 'goldBonus',
        statType: 'percent',
        color: '#FFD700',
        icon: '💰'
    },
    
    fortunate: {
        name: 'Fortunate',
        description: 'Increases item drop chance',
        stat: 'dropBonus',
        statType: 'percent',
        color: '#88FF88',
        icon: '🍀'
    },
    
    exalted: {
        name: 'Exalted',
        description: 'Chance to upgrade drop quality',
        stat: 'qualityBonus',
        statType: 'percent',
        color: '#FF88FF',
        icon: '⭐'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // CROWD CONTROL (on being hit)
    // ═══════════════════════════════════════════════════════════════
    frostbite: {
        name: 'Frostbite',
        description: 'Chance to chill attacker (slows next attack)',
        stat: 'chillChance',
        statType: 'percent',
        color: '#44DDFF',
        icon: '❄️',
        effect: 'chill'
    },
    
    radiance: {
        name: 'Radiance',
        description: 'Chance to blind attacker (causes miss chance)',
        stat: 'blindChance',
        statType: 'percent',
        color: '#FFFF88',
        icon: '💫',
        effect: 'blind'
    },
    
    dreadful: {
        name: 'Dreadful',
        description: 'Chance to fear attacker (misses next turn)',
        stat: 'fearChance',
        statType: 'percent',
        color: '#AA44AA',
        icon: '😱',
        effect: 'fear'
    },
    
    staggering: {
        name: 'Staggering',
        description: 'Chance to interrupt attacker\'s ability',
        stat: 'staggerChance',
        statType: 'percent',
        color: '#FFAA44',
        icon: '💫',
        effect: 'stagger'
    }
};

// ═══════════════════════════════════════════════════════════════
// ARMOR MODIFIER POOLS BY QUALITY
// ═══════════════════════════════════════════════════════════════
const ARMOR_QUALITY_MODIFIER_POOLS = {
    poor: {
        modifierCount: 0,
        availableModifiers: []
    },
    normal: {
        modifierCount: 0,
        availableModifiers: []
    },
    rare: {
        modifierCount: 1,
        availableModifiers: ['bulwark', 'windstep', 'barbed']
    },
    epic: {
        modifierCount: 2,
        availableModifiers: ['bulwark', 'windstep', 'barbed', 'regenerating', 'resonant', 'frostbite']
    },
    legendary: {
        modifierCount: 3,
        availableModifiers: Object.keys(ARMOR_MODIFIERS).filter(key => 
            !['reflective', 'static_discharge', 'leeching', 'gluttonous', 'exalted', 'staggering'].includes(key)
        )
    },
    godly: {
        modifierCount: 4,
        availableModifiers: Object.keys(ARMOR_MODIFIERS)
    }
};

// ═══════════════════════════════════════════════════════════════
// STAT RANGES FOR ARMOR MODIFIERS (by quality)
// ═══════════════════════════════════════════════════════════════
const ARMOR_MODIFIER_RANGES = {
    // Flat bonuses (increase with player level)
    hpBonus: {
        rare: { min: 15, max: 35 },
        epic: { min: 30, max: 60 },
        legendary: { min: 50, max: 100 },
        godly: { min: 80, max: 150 }
    },
    thornsDamage: {
        rare: { min: 3, max: 8 },
        epic: { min: 6, max: 15 },
        legendary: { min: 12, max: 25 },
        godly: { min: 20, max: 40 }
    },
    hpRegen: {
        rare: { min: 2, max: 5 },
        epic: { min: 4, max: 10 },
        legendary: { min: 8, max: 18 },
        godly: { min: 15, max: 30 }
    },
    mpRegen: {
        rare: { min: 2, max: 5 },
        epic: { min: 4, max: 10 },
        legendary: { min: 8, max: 18 },
        godly: { min: 15, max: 30 }
    },
    killHeal: {
        rare: { min: 10, max: 25 },
        epic: { min: 20, max: 50 },
        legendary: { min: 40, max: 100 },
        godly: { min: 75, max: 150 }
    },
    
    // Percent bonuses (%)
    dodgeBonus: {
        rare: { min: 2, max: 5 },
        epic: { min: 4, max: 10 },
        legendary: { min: 8, max: 15 },
        godly: { min: 12, max: 20 }
    },
    thornsPercent: {
        rare: { min: 5, max: 10 },
        epic: { min: 10, max: 20 },
        legendary: { min: 18, max: 30 },
        godly: { min: 25, max: 40 }
    },
    reflectChance: {
        rare: { min: 5, max: 10 },
        epic: { min: 10, max: 15 },
        legendary: { min: 15, max: 25 },
        godly: { min: 20, max: 35 }
    },
    shockChance: {
        rare: { min: 5, max: 10 },
        epic: { min: 10, max: 15 },
        legendary: { min: 15, max: 25 },
        godly: { min: 20, max: 35 }
    },
    leechChance: {
        rare: { min: 10, max: 20 },
        epic: { min: 15, max: 30 },
        legendary: { min: 25, max: 40 },
        godly: { min: 35, max: 50 }
    },
    xpBonus: {
        rare: { min: 3, max: 8 },
        epic: { min: 6, max: 15 },
        legendary: { min: 12, max: 25 },
        godly: { min: 20, max: 35 }
    },
    goldBonus: {
        rare: { min: 5, max: 15 },
        epic: { min: 10, max: 25 },
        legendary: { min: 20, max: 40 },
        godly: { min: 30, max: 60 }
    },
    dropBonus: {
        rare: { min: 3, max: 8 },
        epic: { min: 6, max: 15 },
        legendary: { min: 12, max: 25 },
        godly: { min: 20, max: 35 }
    },
    qualityBonus: {
        rare: { min: 2, max: 5 },
        epic: { min: 4, max: 10 },
        legendary: { min: 8, max: 15 },
        godly: { min: 12, max: 20 }
    },
    
    // Crowd control chances (%)
    chillChance: {
        rare: { min: 5, max: 10 },
        epic: { min: 10, max: 20 },
        legendary: { min: 18, max: 30 },
        godly: { min: 25, max: 40 }
    },
    blindChance: {
        rare: { min: 5, max: 10 },
        epic: { min: 10, max: 20 },
        legendary: { min: 18, max: 30 },
        godly: { min: 25, max: 40 }
    },
    fearChance: {
        rare: { min: 3, max: 8 },
        epic: { min: 6, max: 15 },
        legendary: { min: 12, max: 25 },
        godly: { min: 20, max: 35 }
    },
    staggerChance: {
        rare: { min: 5, max: 10 },
        epic: { min: 10, max: 20 },
        legendary: { min: 18, max: 30 },
        godly: { min: 25, max: 40 }
    }
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTION: Roll armor modifiers
// ═══════════════════════════════════════════════════════════════
function rollArmorModifiers(quality, playerLevel) {
    const pool = ARMOR_QUALITY_MODIFIER_POOLS[quality];
    if (!pool || pool.modifierCount === 0) return [];
    
    const count = pool.modifierCount;
    const available = [...pool.availableModifiers];
    const selected = [];
    
    // Shuffle and pick unique modifiers
    for (let i = 0; i < count && available.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        const modifierKey = available[randomIndex];
        const modifier = ARMOR_MODIFIERS[modifierKey];
        
        // Get stat range based on quality
        const ranges = ARMOR_MODIFIER_RANGES[modifier.stat];
        let value = 0;
        
        if (ranges && ranges[quality]) {
            const { min, max } = ranges[quality];
            value = Math.floor(Math.random() * (max - min + 1)) + min;
            
            // Scale with player level for flat bonuses
            if (modifier.statType === 'flat' && playerLevel > 1) {
                const levelBonus = Math.floor(value * (playerLevel / 20));
                value = Math.min(value + levelBonus, Math.floor(max * 1.5));
            }
        } else {
            // Fallback values
            value = modifier.statType === 'percent' ? 5 : 10;
        }
        
        selected.push({
            key: modifierKey,
            name: modifier.name,
            stat: modifier.stat,
            value: value,
            statType: modifier.statType,
            color: modifier.color,
            icon: modifier.icon,
            effect: modifier.effect || null
        });
        
        // Remove to avoid duplicates
        available.splice(randomIndex, 1);
    }
    
    return selected;
}

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        ARMOR_MODIFIERS, 
        ARMOR_QUALITY_MODIFIER_POOLS,
        ARMOR_MODIFIER_RANGES,
        rollArmorModifiers
    };
}