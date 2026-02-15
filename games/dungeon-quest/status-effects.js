// ═══════════════════════════════════════════════════════════════
// STATUS EFFECTS SYSTEM
// Handles DOTs, debuffs, and all status conditions
// ═══════════════════════════════════════════════════════════════

const STATUS_EFFECTS = {
    // ═══════════════════════════════════════════════════════════════
    // DAMAGE OVER TIME (DOT) EFFECTS
    // ═══════════════════════════════════════════════════════════════
    burning: {
        name: 'Burning',
        icon: '🔥',
        color: '#FF4400',
        type: 'dot',
        damagePerTick: 3, // Base damage per tick
        tickInterval: 3000, // 3 seconds
        duration: 9000, // 9 seconds (3 ticks)
        description: 'Taking fire damage over time',
        applyMessage: (target) => `${target} catches fire! 🔥`,
        tickMessage:  (target, damage) => `${target} is burning! (${damage} fire damage)`,
        message:      (target, damage) => `${target} is burning! (${damage} fire damage)`
    },
    
    poisoned: {
        name: 'Poisoned',
        icon: '☠️',
        color: '#00FF00',
        type: 'dot',
        damagePerTick: 2,
        tickInterval: 3000,
        duration: 12000, // 12 seconds (4 ticks)
        description: 'Poisoned - taking damage over time',
        applyMessage: (target) => `${target} has been poisoned! ☠️`,
        tickMessage:  (target, damage) => `${target} suffers from poison! (${damage} poison damage)`,
        message:      (target, damage) => `${target} suffers from poison! (${damage} poison damage)`
    },
    
    bleeding: {
        name: 'Bleeding',
        icon: '🩸',
        color: '#AA0000',
        type: 'dot',
        damagePerTick: 4,
        tickInterval: 2000,
        duration: 10000, // 10 seconds (5 ticks)
        description: 'Bleeding profusely',
        applyMessage: (target) => `${target} starts bleeding! 🩸`,
        tickMessage:  (target, damage) => `${target} is bleeding! (${damage} damage)`,
        message:      (target, damage) => `${target} is bleeding! (${damage} damage)`
    },
    
    // ═══════════════════════════════════════════════════════════════
    // DEBUFF EFFECTS
    // ═══════════════════════════════════════════════════════════════
    frozen: {
        name: 'Frozen',
        icon: '❄️',
        color: '#00DDFF',
        type: 'debuff',
        effect: 'slow',
        speedReduction: 0.5, // 50% slower attacks
        duration: 6000, // 6 seconds
        description: 'Movement and attacks slowed',
        message: (target) => `${target} is frozen! Attacks slowed!`
    },
    
    blinded: {
        name: 'Blinded',
        icon: '💫',
        color: '#FFFF00',
        type: 'debuff',
        effect: 'accuracy',
        accuracyReduction: 0.4, // 40% miss chance
        duration: 8000, // 8 seconds
        description: 'Reduced accuracy',
        message: (target) => `${target} is blinded! Accuracy reduced!`
    },
    
    confused: {
        name: 'Confused',
        icon: '😵',
        color: '#FF00FF',
        type: 'debuff',
        effect: 'confusion',
        missChance: 0.3, // 30% chance to miss attacks
        duration: 5000, // 5 seconds
        description: 'May miss attacks',
        message: (target) => `${target} is confused!`
    },
    
    stunned: {
        name: 'Stunned',
        icon: '⭐',
        color: '#FFDD00',
        type: 'debuff',
        effect: 'stun',
        duration: 2000, // 2 seconds - can't act
        description: 'Cannot act',
        message: (target) => `${target} is stunned!`
    },
    
    weakened: {
        name: 'Weakened',
        icon: '💔',
        color: '#AA00AA',
        type: 'debuff',
        effect: 'damage',
        damageReduction: 0.3, // 30% less damage dealt
        duration: 10000, // 10 seconds
        description: 'Damage reduced',
        message: (target) => `${target} is weakened! Damage reduced!`
    },
    
    // ═══════════════════════════════════════════════════════════════
    // BUFF EFFECTS (for future use)
    // ═══════════════════════════════════════════════════════════════
    haste: {
        name: 'Haste',
        icon: '⚡',
        color: '#FFAA00',
        type: 'buff',
        effect: 'speed',
        speedBonus: 0.5, // 50% faster attacks
        duration: 8000,
        description: 'Increased attack speed',
        message: (target) => `${target} is moving faster!`
    },
    
    rage: {
        name: 'Rage',
        icon: '😡',
        color: '#FF0000',
        type: 'buff',
        effect: 'damage',
        damageBonus: 0.5, // 50% more damage
        duration: 6000,
        description: 'Increased damage',
        message: (target) => `${target} enters a rage! Damage increased!`
    }
};

// ═══════════════════════════════════════════════════════════════
// WEAPON MODIFIERS - Assigned to high-quality weapons
// ═══════════════════════════════════════════════════════════════
const WEAPON_MODIFIERS = {
    // ELEMENTAL DAMAGE
    fire_damage: {
        name: 'Flame',
        description: 'Fire damage',
        minDamage: 1,
        maxDamage: 3,
        statusEffect: 'burning',
        statusChance: 0.3, // 30% chance to apply burning
        color: '#FF4400'
    },
    
    ice_damage: {
        name: 'Frost',
        description: 'Ice damage',
        minDamage: 1,
        maxDamage: 3,
        statusEffect: 'frozen',
        statusChance: 0.25, // 25% chance to freeze
        color: '#00DDFF'
    },
    
    poison_damage: {
        name: 'Venom',
        description: 'Poison damage',
        minDamage: 1,
        maxDamage: 3,
        statusEffect: 'poisoned',
        statusChance: 0.35, // 35% chance to poison
        color: '#00FF00'
    },
    
    lightning_damage: {
        name: 'Shock',
        description: 'Lightning damage',
        minDamage: 2,
        maxDamage: 5,
        statusEffect: 'stunned',
        statusChance: 0.15, // 15% chance to stun
        color: '#FFFF00'
    },
    
    shadow_damage: {
        name: 'Shadow',
        description: 'Dark damage',
        minDamage: 1,
        maxDamage: 4,
        statusEffect: 'blinded',
        statusChance: 0.2, // 20% chance to blind
        color: '#AA00AA'
    },
    
    // PURE STAT BONUSES
    damage_bonus: {
        name: 'Power',
        description: '+Damage',
        minDamage: 2,
        maxDamage: 6,
        statusEffect: null,
        color: '#FFD700'
    },
    
    critical_bonus: {
        name: 'Precision',
        description: '+Crit Chance',
        critBonus: 10, // +10% crit chance
        statusEffect: null,
        color: '#FF8800'
    },
    
    lifesteal: {
        name: 'Vampiric',
        description: 'Lifesteal',
        lifestealPercent: 10, // 10% of damage as healing
        statusEffect: null,
        color: '#AA0000'
    },
    
    // DEBUFF APPLIERS
    bleed: {
        name: 'Razor',
        description: 'Causes bleeding',
        minDamage: 1,
        maxDamage: 2,
        statusEffect: 'bleeding',
        statusChance: 0.4, // 40% chance to cause bleeding
        color: '#AA0000'
    },
    
    weaken: {
        name: 'Weakening',
        description: 'Weakens enemies',
        statusEffect: 'weakened',
        statusChance: 0.25, // 25% chance to weaken
        color: '#AA00AA'
    },
    
    confuse: {
        name: 'Chaos',
        description: 'Confuses enemies',
        statusEffect: 'confused',
        statusChance: 0.2, // 20% chance to confuse
        color: '#FF00FF'
    }
};

// ═══════════════════════════════════════════════════════════════
// MODIFIER POOLS BY QUALITY
// Determines how many and which modifiers a weapon can have
// ═══════════════════════════════════════════════════════════════
const QUALITY_MODIFIER_POOLS = {
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
        availableModifiers: ['fire_damage', 'ice_damage', 'poison_damage', 'damage_bonus', 'bleed']
    },
    epic: {
        modifierCount: 2,
        availableModifiers: ['fire_damage', 'ice_damage', 'poison_damage', 'lightning_damage', 
                           'shadow_damage', 'damage_bonus', 'critical_bonus', 'bleed', 'weaken']
    },
    legendary: {
        modifierCount: 3,
        availableModifiers: Object.keys(WEAPON_MODIFIERS) // All modifiers available
    },
    godly: {
        modifierCount: 4,
        availableModifiers: Object.keys(WEAPON_MODIFIERS)
    }
};

// ═══════════════════════════════════════════════════════════════
// SPELL STATUS EFFECTS - Spells can apply status effects
// ═══════════════════════════════════════════════════════════════
const SPELL_STATUS_EFFECTS = {
    // Fire spells
    fire: {
        statusEffect: 'burning',
        applyChance: 0.5 // 50% chance fire spells cause burning
    },
    
    // Ice spells
    ice: {
        statusEffect: 'frozen',
        applyChance: 0.4 // 40% chance ice spells freeze
    },
    
    // Lightning spells
    lightning: {
        statusEffect: 'stunned',
        applyChance: 0.2 // 20% chance lightning stuns
    },
    
    // Shadow/Dark spells
    shadow: {
        statusEffect: 'blinded',
        applyChance: 0.3 // 30% chance shadow spells blind
    },
    
    // Poison spells
    poison: {
        statusEffect: 'poisoned',
        applyChance: 0.6 // 60% chance poison spells poison
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        STATUS_EFFECTS, 
        WEAPON_MODIFIERS, 
        QUALITY_MODIFIER_POOLS,
        SPELL_STATUS_EFFECTS
    };
}
