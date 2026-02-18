// ═══════════════════════════════════════════════════════════════════════════
// HUNTER PETS SYSTEM
// Hunters bond with beasts instead of learning spells
// Pets attack automatically after hunter's attack for bonus damage
// Upgrade at Pet Trainer every 3 levels (3, 6, 9, 12, 15, 18)
// ═══════════════════════════════════════════════════════════════════════════

const HUNTER_PETS = {
    // Level 3 - Starting Pet
    hunting_dog: {
        name: 'Hunting Dog',
        level: 3,
        damagePercent: 0.35, // 35% of weapon damage
        bonusDamage: 2,      // +2 flat damage
        description: 'A loyal dog that assists in combat',
        icon: '🐕',
        cost: 50,
        upgradesTo: 'wolf'
    },
    
    // Level 6 - Wolf
    wolf: {
        name: 'Wolf',
        level: 6,
        damagePercent: 0.40, // 40% of weapon damage
        bonusDamage: 4,      // +4 flat damage
        description: 'A fierce wolf with sharp fangs',
        icon: '🐺',
        cost: 150,
        upgradesTo: 'dire_wolf'
    },
    
    // Level 9 - Dire Wolf
    dire_wolf: {
        name: 'Dire Wolf',
        level: 9,
        damagePercent: 0.45, // 45% of weapon damage
        bonusDamage: 6,      // +6 flat damage
        description: 'A massive dire wolf from the frozen north',
        icon: '🐺',
        cost: 300,
        upgradesTo: 'shadow_hound'
    },
    
    // Level 12 - Shadow Hound
    shadow_hound: {
        name: 'Shadow Hound',
        level: 12,
        damagePercent: 0.50, // 50% of weapon damage
        bonusDamage: 8,      // +8 flat damage
        description: 'A spectral hound that phases through armor',
        icon: '👻🐕',
        cost: 500,
        upgradesTo: 'warg'
    },
    
    // Level 15 - Warg
    warg: {
        name: 'Warg',
        level: 15,
        damagePercent: 0.55, // 55% of weapon damage
        bonusDamage: 10,     // +10 flat damage
        description: 'An ancient warg, larger than a horse',
        icon: '🐺',
        cost: 800,
        upgradesTo: 'hellhound'
    },
    
    // Level 18 - Hellhound
    hellhound: {
        name: 'Hellhound',
        level: 18,
        damagePercent: 0.60, // 60% of weapon damage
        bonusDamage: 12,     // +12 flat damage
        description: 'A demonic hound wreathed in flames',
        icon: '🔥🐕',
        cost: 1200,
        upgradesTo: 'fenrir'
    },
    
    // Level 21 - Fenrir (Ultimate)
    fenrir: {
        name: 'Fenrir',
        level: 21,
        damagePercent: 0.70, // 70% of weapon damage
        bonusDamage: 15,     // +15 flat damage
        description: 'The legendary wolf destined to devour gods',
        icon: '🌙🐺',
        cost: 2000,
        upgradesTo: null // Max level
    }
};

/**
 * Calculate pet damage based on hunter's weapon
 * @param {object} player - Player object
 * @param {number} weaponDamage - Base weapon damage dealt
 * @returns {number} Pet damage to add
 */
function calculatePetDamage(player, weaponDamage) {
    if (!player.activePet) return 0;
    
    const pet = HUNTER_PETS[player.activePet];
    if (!pet) return 0;
    
    // Pet damage = (weapon damage * percent) + flat bonus
    const petDamage = Math.floor(weaponDamage * pet.damagePercent) + pet.bonusDamage;
    
    return Math.max(1, petDamage);
}

/**
 * Get available pet for hunter's current level
 * @param {number} level - Hunter's level
 * @returns {string|null} Pet key that should be available
 */
function getAvailablePet(level) {
    if (level >= 21) return 'fenrir';
    if (level >= 18) return 'hellhound';
    if (level >= 15) return 'warg';
    if (level >= 12) return 'shadow_hound';
    if (level >= 9) return 'dire_wolf';
    if (level >= 6) return 'wolf';
    if (level >= 3) return 'hunting_dog';
    return null;
}

/**
 * Check if hunter can upgrade their pet
 * @param {object} player - Player object
 * @returns {object|null} Next pet info if upgrade available
 */
function getNextPetUpgrade(player) {
    if (!player.activePet) {
        // No pet yet, check if level 3+
        if (player.level >= 3) {
            return HUNTER_PETS.hunting_dog;
        }
        return null;
    }
    
    const currentPet = HUNTER_PETS[player.activePet];
    if (!currentPet || !currentPet.upgradesTo) return null;
    
    const nextPet = HUNTER_PETS[currentPet.upgradesTo];
    if (!nextPet) return null;
    
    // Check if player meets level requirement
    if (player.level >= nextPet.level) {
        return nextPet;
    }
    
    return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HUNTER_PETS, calculatePetDamage, getAvailablePet, getNextPetUpgrade };
}

console.log('✅ Hunter Pets System loaded - 7 pets from Dog to Fenrir');
