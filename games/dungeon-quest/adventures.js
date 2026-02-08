// adventures.js - Random Adventure & Quest System
// These are rare encounters that can happen while exploring
// Each adventure is a choose-your-own-adventure style mini-quest

const ADVENTURES = {
    // ═══════════════════════════════════════════════════════════════
    // TREASURE ADVENTURES
    // ═══════════════════════════════════════════════════════════════
    buried_treasure: {
        id: 'buried_treasure',
        name: 'Buried Treasure Chest',
        rarity: 'legendary', // 0.01% chance
        description: 'You stumble upon something gleaming in the dirt...',
        intro: 'Your foot catches on something hard beneath the leaves. Brushing away the dirt, you uncover an ancient treasure chest covered in strange runes!',
        
        choices: [
            {
                text: 'Open it immediately',
                outcomes: [
                    { 
                        weight: 40,
                        text: 'The chest springs open! Inside you find a fortune!',
                        rewards: { gold: 5000, xp: 2000 }
                    },
                    {
                        weight: 30,
                        text: 'A trapped! Poison darts shoot out, but you dodge most of them.',
                        rewards: { gold: 3000, damage: 20 }
                    },
                    {
                        weight: 20,
                        text: 'Jackpot! The chest contains legendary equipment!',
                        rewards: { gold: 2000, items: ['rare_weapon', 'rare_armor'] }
                    },
                    {
                        weight: 10,
                        text: 'A mimic! The chest was alive!',
                        combat: ['mimic']
                    }
                ]
            },
            {
                text: 'Examine it carefully first',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You spot a trap mechanism and safely disarm it. The chest opens to reveal riches!',
                        rewards: { gold: 4000, xp: 3000 }
                    },
                    {
                        weight: 30,
                        text: 'You find a hidden compartment with extra loot!',
                        rewards: { gold: 6000, xp: 2500, items: ['legendary_gem'] }
                    },
                    {
                        weight: 10,
                        text: 'Your examination takes too long. A thief appears and tries to steal it!',
                        combat: ['master_thief']
                    }
                ]
            },
            {
                text: 'Leave it alone (too risky)',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You walk away... but you can\'t shake the feeling you missed something amazing.',
                        rewards: { xp: 500 }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MYSTERIOUS STRANGER ADVENTURES
    // ═══════════════════════════════════════════════════════════════
    mysterious_merchant: {
        id: 'mysterious_merchant',
        name: 'Mysterious Merchant',
        rarity: 'rare', // 0.5% chance
        description: 'A hooded figure beckons from the shadows...',
        intro: 'A cloaked merchant appears before you, their cart filled with strange glowing items. "I deal in rare goods," they whisper.',
        
        choices: [
            {
                text: 'Buy a random item (1000g)',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The merchant hands you a powerful weapon!',
                        rewards: { gold: -1000, items: ['epic_weapon'] }
                    },
                    {
                        weight: 30,
                        text: 'You receive a bag of rare potions!',
                        rewards: { gold: -1000, items: ['greater_potion', 'greater_potion', 'greater_potion'] }
                    },
                    {
                        weight: 20,
                        text: 'The merchant gives you a cursed item! It drains your health but grants power.',
                        rewards: { gold: -1000, items: ['cursed_ring'], damage: 50 }
                    },
                    {
                        weight: 10,
                        text: 'It\'s a scam! The merchant vanishes with your gold!',
                        rewards: { gold: -1000 }
                    }
                ]
            },
            {
                text: 'Ask for information instead',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The merchant reveals the location of a hidden dungeon!',
                        rewards: { xp: 5000, unlockArea: 'secret_dungeon' }
                    },
                    {
                        weight: 30,
                        text: 'They teach you a secret technique!',
                        rewards: { xp: 3000, spell: 'shadow_step' }
                    },
                    {
                        weight: 20,
                        text: 'The merchant warns you of a powerful enemy nearby... then vanishes!',
                        rewards: { xp: 1000 },
                        followup: 'You feel a dark presence...',
                        combat: ['shadow_beast']
                    }
                ]
            },
            {
                text: 'Attack the merchant (rob them)',
                outcomes: [
                    {
                        weight: 60,
                        text: 'Bad idea! The "merchant" was actually a powerful demon in disguise!',
                        combat: ['demon_merchant']
                    },
                    {
                        weight: 30,
                        text: 'The merchant turns to smoke, leaving behind a cursed coin.',
                        rewards: { items: ['cursed_coin'], xp: -1000 }
                    },
                    {
                        weight: 10,
                        text: 'Surprisingly, the merchant was just a normal person. You steal their goods... but feel terrible.',
                        rewards: { gold: 2000, items: ['rare_item'], xp: -500 }
                    }
                ]
            },
            {
                text: 'Walk away',
                outcomes: [
                    {
                        weight: 100,
                        text: 'The merchant nods respectfully as you leave. "Another time, perhaps..."',
                        rewards: { xp: 100 }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // ANCIENT SHRINE ADVENTURES
    // ═══════════════════════════════════════════════════════════════
    ancient_shrine: {
        id: 'ancient_shrine',
        name: 'Ancient Shrine',
        rarity: 'uncommon', // 1% chance
        description: 'You discover a weathered shrine to a forgotten god...',
        intro: 'An ancient stone shrine stands before you, covered in vines. A faint divine energy emanates from it. An offering bowl sits at its base.',
        
        choices: [
            {
                text: 'Offer 500 gold',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The shrine glows! You are blessed with divine power!',
                        rewards: { gold: -500, buff: 'divine_blessing', xp: 2000 }
                    },
                    {
                        weight: 30,
                        text: 'The shrine accepts your offering and fully restores you!',
                        rewards: { gold: -500, heal: 'full', xp: 1000 }
                    },
                    {
                        weight: 20,
                        text: 'The shrine rejects your offering and returns double!',
                        rewards: { gold: 500, xp: 500 }
                    }
                ]
            },
            {
                text: 'Pray without offering',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The god appreciates your faith. You receive a blessing!',
                        rewards: { xp: 1500, buff: 'minor_blessing' }
                    },
                    {
                        weight: 40,
                        text: 'Nothing happens. Perhaps the god requires an offering...',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'The shrine crumbles and a guardian spirit appears!',
                        combat: ['shrine_guardian']
                    }
                ]
            },
            {
                text: 'Take gold from the offering bowl',
                outcomes: [
                    {
                        weight: 70,
                        text: 'You\'ve angered the god! A guardian materializes to punish you!',
                        combat: ['angry_guardian']
                    },
                    {
                        weight: 20,
                        text: 'The bowl was cursed! You\'re struck by lightning!',
                        rewards: { damage: 100, gold: 0 }
                    },
                    {
                        weight: 10,
                        text: 'The shrine was abandoned. You take 300 gold without consequence.',
                        rewards: { gold: 300 }
                    }
                ]
            },
            {
                text: 'Destroy the shrine',
                outcomes: [
                    {
                        weight: 100,
                        text: 'How dare you! The forgotten god awakens in fury!',
                        combat: ['forgotten_god_avatar']
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // PORTAL ADVENTURES
    // ═══════════════════════════════════════════════════════════════
    unstable_portal: {
        id: 'unstable_portal',
        name: 'Unstable Portal',
        rarity: 'rare', // 0.5% chance
        description: 'A swirling portal tears through reality before you...',
        intro: 'A crackling portal opens in the air before you. Through it, you see glimpses of other worlds, other times. It\'s unstable and might close at any moment!',
        
        choices: [
            {
                text: 'Jump through the portal!',
                outcomes: [
                    {
                        weight: 25,
                        text: 'You emerge in a treasure vault! You fill your pockets before the portal closes!',
                        rewards: { gold: 10000, xp: 5000 }
                    },
                    {
                        weight: 25,
                        text: 'You land in a dragon\'s lair! It\'s not happy to see you!',
                        combat: ['ancient_dragon']
                    },
                    {
                        weight: 20,
                        text: 'You find yourself in a magical library. You learn forbidden knowledge!',
                        rewards: { xp: 8000, spell: 'time_stop' }
                    },
                    {
                        weight: 15,
                        text: 'You appear in a bizarre marketplace. A merchant sells you legendary items cheap!',
                        rewards: { items: ['legendary_weapon', 'legendary_armor'], gold: -2000 }
                    },
                    {
                        weight: 15,
                        text: 'The portal was a trap! You\'re caught between dimensions and barely escape!',
                        rewards: { damage: 200, xp: 1000 }
                    }
                ]
            },
            {
                text: 'Throw something through and see what happens',
                outcomes: [
                    {
                        weight: 50,
                        text: 'A creature from the other side throws back a bag of gold!',
                        rewards: { gold: 3000, xp: 1000 }
                    },
                    {
                        weight: 30,
                        text: 'The portal destabilizes and explodes! You\'re caught in the blast!',
                        rewards: { damage: 150, xp: 500 }
                    },
                    {
                        weight: 20,
                        text: 'A demon reaches through and tries to pull you in!',
                        combat: ['portal_demon']
                    }
                ]
            },
            {
                text: 'Study the portal',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You learn the secrets of portal magic!',
                        rewards: { xp: 6000, spell: 'dimension_door' }
                    },
                    {
                        weight: 40,
                        text: 'You understand its nature but can\'t harness it. Knowledge is its own reward.',
                        rewards: { xp: 3000 }
                    }
                ]
            },
            {
                text: 'Walk away quickly',
                outcomes: [
                    {
                        weight: 70,
                        text: 'Smart choice. The portal collapses violently moments after you leave.',
                        rewards: { xp: 500 }
                    },
                    {
                        weight: 30,
                        text: 'As you walk away, something reaches out and grabs you!',
                        combat: ['void_tendril']
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CURSED ITEM ADVENTURES
    // ═══════════════════════════════════════════════════════════════
    cursed_sword: {
        id: 'cursed_sword',
        name: 'Cursed Sword',
        rarity: 'uncommon', // 1% chance
        description: 'A magnificent sword is stuck in a stone, radiating dark energy...',
        intro: 'A beautiful black sword is embedded in an ancient stone. Dark energy pulses from it. You hear whispers in your mind... "Pull me free..."',
        
        choices: [
            {
                text: 'Pull the sword free',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You claim the cursed blade! It grants you immense power... at a cost.',
                        rewards: { items: ['cursed_blade'], damage: 100, xp: 3000 }
                    },
                    {
                        weight: 30,
                        text: 'The sword is bound! A guardian appears to test your worth!',
                        combat: ['sword_guardian']
                    },
                    {
                        weight: 30,
                        text: 'You can\'t pull it free. You\'re not worthy... yet.',
                        rewards: { xp: 500 }
                    }
                ]
            },
            {
                text: 'Touch the sword but don\'t pull',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The sword shows you visions of great battles! You gain combat knowledge!',
                        rewards: { xp: 4000 }
                    },
                    {
                        weight: 30,
                        text: 'The dark energy shocks you, but you survive.',
                        rewards: { damage: 50, xp: 1000 }
                    },
                    {
                        weight: 20,
                        text: 'The sword\'s curse tries to possess you! You barely resist!',
                        rewards: { damage: 150, xp: 2000 }
                    }
                ]
            },
            {
                text: 'Try to break the curse',
                outcomes: [
                    {
                        weight: 40,
                        text: 'Your holy magic shatters the curse! The sword is now safe to claim!',
                        rewards: { items: ['purified_blade'], xp: 5000 }
                    },
                    {
                        weight: 40,
                        text: 'The curse is too strong. You fail but learn from the attempt.',
                        rewards: { xp: 2000 }
                    },
                    {
                        weight: 20,
                        text: 'Breaking the curse releases the demon bound within!',
                        combat: ['bound_demon']
                    }
                ]
            },
            {
                text: 'Leave it alone',
                outcomes: [
                    {
                        weight: 100,
                        text: 'Wise choice. Some powers are better left alone.',
                        rewards: { xp: 1000 }
                    }
                ]
            }
        ]
    }
};

// Special enemies for adventures
const ADVENTURE_ENEMIES = {
    mimic: {
        name: 'Treasure Mimic',
        baseHp: 150,
        baseDamage: 25,
        baseDefense: 15,
        baseXp: 500,
        baseGold: 300,
        level: 10,
        possibleDrops: ['mimic_tooth'],
        dropRates: { rare: 0.5 }
    },
    master_thief: {
        name: 'Master Thief',
        baseHp: 120,
        baseDamage: 30,
        baseDefense: 10,
        baseXp: 800,
        baseGold: 1000,
        level: 12,
        possibleDrops: ['thieves_tools', 'shadow_cloak'],
        dropRates: { epic: 0.3 }
    },
    demon_merchant: {
        name: 'Demon Merchant',
        baseHp: 300,
        baseDamage: 45,
        baseDefense: 30,
        baseXp: 2000,
        baseGold: 2000,
        level: 15,
        possibleDrops: ['demonic_contract'],
        dropRates: { legendary: 0.2 }
    },
    shrine_guardian: {
        name: 'Shrine Guardian',
        baseHp: 200,
        baseDamage: 35,
        baseDefense: 25,
        baseXp: 1200,
        baseGold: 500,
        level: 13,
        possibleDrops: ['holy_relic'],
        dropRates: { epic: 0.4 }
    },
    angry_guardian: {
        name: 'Angry Guardian',
        baseHp: 250,
        baseDamage: 40,
        baseDefense: 30,
        baseXp: 1500,
        baseGold: 0,
        level: 14,
        possibleDrops: ['guardian_essence'],
        dropRates: { epic: 0.3 }
    },
    forgotten_god_avatar: {
        name: 'Avatar of the Forgotten God',
        baseHp: 500,
        baseDamage: 60,
        baseDefense: 40,
        baseXp: 5000,
        baseGold: 5000,
        level: 18,
        isBoss: true,
        possibleDrops: ['divine_artifact'],
        dropRates: { legendary: 0.5 }
    },
    ancient_dragon: {
        name: 'Ancient Dragon',
        baseHp: 800,
        baseDamage: 80,
        baseDefense: 50,
        baseXp: 10000,
        baseGold: 10000,
        level: 20,
        isBoss: true,
        possibleDrops: ['dragon_scale_armor', 'dragon_heart'],
        dropRates: { legendary: 0.7 }
    },
    portal_demon: {
        name: 'Portal Demon',
        baseHp: 350,
        baseDamage: 50,
        baseDefense: 35,
        baseXp: 2500,
        baseGold: 1500,
        level: 16,
        possibleDrops: ['demon_horn'],
        dropRates: { epic: 0.4 }
    },
    void_tendril: {
        name: 'Void Tendril',
        baseHp: 180,
        baseDamage: 42,
        baseDefense: 20,
        baseXp: 1800,
        baseGold: 800,
        level: 14,
        possibleDrops: ['void_essence'],
        dropRates: { rare: 0.6 }
    },
    sword_guardian: {
        name: 'Sword Guardian',
        baseHp: 280,
        baseDamage: 48,
        baseDefense: 38,
        baseXp: 2200,
        baseGold: 1200,
        level: 15,
        possibleDrops: ['guardian_sigil'],
        dropRates: { epic: 0.4 }
    },
    bound_demon: {
        name: 'Bound Demon',
        baseHp: 400,
        baseDamage: 55,
        baseDefense: 35,
        baseXp: 3000,
        baseGold: 2000,
        level: 17,
        possibleDrops: ['demon_core'],
        dropRates: { legendary: 0.3 }
    }
};

// Rarity chances
const ADVENTURE_RARITY_CHANCES = {
    legendary: 0.0001,  // 0.01%
    rare: 0.005,        // 0.5%
    uncommon: 0.01,     // 1%
    common: 0.05        // 5%
};

// Helper function to roll for random adventure
function rollForAdventure(playerLevel) {
    // Roll for adventure chance
    const roll = Math.random();
    
    let eligibleAdventures = [];
    
    // Check each rarity tier
    for (const [rarity, chance] of Object.entries(ADVENTURE_RARITY_CHANCES)) {
        if (roll < chance) {
            // Get adventures of this rarity
            eligibleAdventures = Object.values(ADVENTURES)
                .filter(adv => adv.rarity === rarity);
            break;
        }
    }
    
    if (eligibleAdventures.length === 0) return null;
    
    // Pick random adventure from eligible ones
    return eligibleAdventures[Math.floor(Math.random() * eligibleAdventures.length)];
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ADVENTURES, ADVENTURE_ENEMIES, rollForAdventure };
}
