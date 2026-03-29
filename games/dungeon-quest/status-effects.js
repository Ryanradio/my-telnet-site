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
    duration: 6000,
    description: 'Movement and attacks slowed',
    message: (target) => `${target} is frozen! Attacks slowed!`,
    onApply: function(target, isPlayer) {
        if (!isPlayer && gameState.combatState) {
            const cs = gameState.combatState;
            // Add 3 seconds to enemy attack timer (50% of typical 6s delay)
            cs.enemyTimer += 3;
            cs.enemyTimer = Math.min(cs.enemyTimer, cs.enemyDelay + 3);
            termAppend(`<span style="color:#00DDFF;">❄️ ${target.name} is FROZEN! Its next attack is delayed! ❄️</span>`, 'term-warning');
        }
    },
    onRemove: function(target, isPlayer) {
        if (!isPlayer) {
            termAppend(`<span style="color:#00DDFF;">❄️ ${target.name} breaks free from the ice. ❄️</span>`, 'term-dim');
        }
    }
},

blinded: {
    name: 'Blinded',
    icon: '💫',
    color: '#FFFF00',
    type: 'debuff',
    effect: 'accuracy',
    accuracyReduction: 0.4, // 40% miss chance
    duration: 8000,
    description: 'Reduced accuracy',
    message: (target) => `${target} is blinded! Accuracy reduced!`,
    onApply: function(target, isPlayer) {
        if (!isPlayer) {
            // Store blinded flag in combat state
            if (gameState.combatState) {
                gameState.combatState.blindedEnemy = target;
            }
            termAppend(`<span style="color:#FFFF00;">💫 ${target.name} is BLINDED! Its attacks will miss 40% of the time! 💫</span>`, 'term-warning');
        }
    },
    onRemove: function(target, isPlayer) {
        if (!isPlayer && gameState.combatState) {
            gameState.combatState.blindedEnemy = null;
            termAppend(`<span style="color:#FFFF00;">💫 ${target.name} can see again. 💫</span>`, 'term-dim');
        }
    }
},

confused: {
    name: 'Confused',
    icon: '😵',
    color: '#FF00FF',
    type: 'debuff',
    effect: 'confusion',
    missChance: 0.3, // 30% chance to miss attacks
    duration: 5000,
    description: 'May miss attacks',
    message: (target) => `${target} is confused!`,
    onApply: function(target, isPlayer) {
        if (!isPlayer && gameState.combatState) {
            gameState.combatState.confusedEnemy = target;
            termAppend(`<span style="color:#FF00FF;">😵 ${target.name} is CONFUSED! It may miss its next attack! 😵</span>`, 'term-warning');
        }
    },
    onRemove: function(target, isPlayer) {
        if (!isPlayer && gameState.combatState) {
            gameState.combatState.confusedEnemy = null;
            termAppend(`<span style="color:#FF00FF;">😵 ${target.name} regains its senses. 😵</span>`, 'term-dim');
        }
    }
},
    
    stunned: {
    name: 'Stunned',
    icon: '⭐',
    color: '#FFDD00',
    type: 'debuff',
    duration: 4000, // 4 seconds - how long the "stunned" tag stays
    description: 'Enemy attack delayed',
    message: (target) => `${target} is stunned!`,
    onApply: function(target, isPlayer) {
        // Only affect enemies
        if (!isPlayer && gameState.combatState) {
            const cs = gameState.combatState;
            // Add 10 seconds to enemy's attack timer
            cs.enemyTimer += 10;
            // Cap so it doesn't go too high (max 5 seconds above normal delay)
            cs.enemyTimer = Math.min(cs.enemyTimer, cs.enemyDelay + 5);
            
            // Show message
            if (typeof termAppend === 'function') {
                termAppend(`<span style="color:#FFDD00;">⭐ ${target.name} is STUNNED! Its next attack is delayed by 10 seconds! ⭐</span>`, 'term-warning');
            }
        }
    },
    onRemove: function(target, isPlayer) {
        if (!isPlayer && typeof termAppend === 'function') {
            termAppend(`<span style="color:#FFDD00;">⭐ ${target.name} recovers from being stunned. ⭐</span>`, 'term-dim');
        }
    }
},
    
weakened: {
    name: 'Weakened',
    icon: '💔',
    color: '#AA00AA',
    type: 'debuff',
    effect: 'damage',
    damageReduction: 0.3, // 30% less damage dealt
    duration: 10000,
    description: 'Damage reduced',
    message: (target) => `${target} is weakened! Damage reduced!`,
    onApply: function(target, isPlayer) {
        if (!isPlayer && gameState.combatState) {
            gameState.combatState.weakenedEnemy = target;
            termAppend(`<span style="color:#AA00AA;">💔 ${target.name} is WEAKENED! Its attacks deal 30% less damage! 💔</span>`, 'term-warning');
        }
    },
    onRemove: function(target, isPlayer) {
        if (!isPlayer && gameState.combatState) {
            gameState.combatState.weakenedEnemy = null;
            termAppend(`<span style="color:#AA00AA;">💔 ${target.name}'s strength returns. 💔</span>`, 'term-dim');
        }
    }
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
    fire_damage: {
        name: 'Flame',
        description: 'Burning damage with chance to ignite',
        minDamage: 1,
        maxDamage: 3,
        statusEffect: 'burning',
        statusChance: 0.3,
        color: '#FF4400'
    },
    
    ice_damage: {
        name: 'Frost',
        description: 'Frost damage with chance to freeze',
        minDamage: 1,
        maxDamage: 3,
        statusEffect: 'frozen',
        statusChance: 0.25,
        color: '#00DDFF'
    },
    
    poison_damage: {
        name: 'Venom',
        description: 'Toxic damage with chance to poison',
        minDamage: 1,
        maxDamage: 3,
        statusEffect: 'poisoned',
        statusChance: 0.35,
        color: '#00FF00'
    },
    
    lightning_damage: {
        name: 'Shock',
        description: 'Electric damage with chance to stun',
        minDamage: 2,
        maxDamage: 5,
        statusEffect: 'stunned',
        statusChance: 0.15,
        color: '#FFFF00'
    },
    
    shadow_damage: {
        name: 'Shadow',
        description: 'Dark damage with chance to blind',
        minDamage: 1,
        maxDamage: 4,
        statusEffect: 'blinded',
        statusChance: 0.2,
        color: '#AA00AA'
    },
    
    damage_bonus: {
        name: 'Power',
        description: 'Adds bonus physical damage',
        minDamage: 2,
        maxDamage: 6,
        color: '#FFD700'
    },
    
    critical_bonus: {
        name: 'Precision',
        description: 'Increases critical hit chance',
        critBonus: 10,
        color: '#FF8800'
    },
    
    lifesteal: {
        name: 'Vampiric',
        description: 'Heals for a percentage of damage dealt',
        lifestealPercent: 10,
        color: '#AA0000'
    },
    
    bleed: {
        name: 'Razor',
        description: 'Causes bleeding over time',
        minDamage: 1,
        maxDamage: 2,
        statusEffect: 'bleeding',
        statusChance: 0.4,
        color: '#AA0000'
    },
    
    weaken: {
        name: 'Weakening',
        description: 'Weakens enemy, reducing their damage',
        statusEffect: 'weakened',
        statusChance: 0.25,
        color: '#AA00AA'
    },
    
    confuse: {
        name: 'Chaos',
        description: 'Confuses enemy, may hit themselves',
        statusEffect: 'confused',
        statusChance: 0.2,
        color: '#FF00FF'
    },
    
    dragon_bane: {
        name: 'Dragon Bane',
        description: 'Extra damage against dragons',
        minDamage: 8,
        maxDamage: 15,
        vsDragonBonus: 2.5,
        color: '#FF4444'
    },
    
    giant_slayer: {
        name: 'Giant Slayer',
        description: 'Extra damage against giants',
        minDamage: 6,
        maxDamage: 12,
        vsGiantBonus: 2.0,
        color: '#884422'
    },
    
    vorpal: {
        name: 'Vorpal',
        description: '1% chance to instantly kill non-boss enemies',
        minDamage: 5,
        maxDamage: 10,
        critBonus: 15,
        color: '#AA88FF'
    },
    
    thunderous: {
        name: 'Thunderous',
        description: 'Lightning damage with chance to stun',
        minDamage: 6,
        maxDamage: 12,
        statusEffect: 'stunned',
        statusChance: 0.2,
        color: '#FFDD44'
    },
    
    armor_pierce: {
        name: 'Piercing',
        description: 'Ignores enemy armor',
        armorPierce: 0.25,
        color: '#AA88FF'
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
