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
// Common Weathered Shack
// ═══════════════════════════════════════════════════════════════

weathered_shack: {
    id: 'weathered_shack',
    name: 'Old Weathered Shack',
    rarity: 'common',
    description: 'A crooked, aging shack sits alone among the trees.',
    intro: 'You come across an old weathered shack. The wood is splintered, the windows cracked, and the air around it feels strangely still.',

    choices: [
        {
            text: 'Enter through the front door',
            outcomes: [
                {
                    weight: 100,
                    text: 'The door creaks open loudly. Inside are three rooms. You may only search one.',
                    nextChoices: [
                        {
                            text: 'Search the left room',
                            outcomes: [
                                {
                                    weight: 100,
                                    text: 'Under a loose floorboard, you find a small stash of gold!',
                                    rewards: { gold: 250, xp: 100 }
                                }
                            ]
                        },
                        {
                            text: 'Search the middle room',
                            outcomes: [
                                {
                                    weight: 100,
                                    text: 'You find an old but usable weapon leaning against the wall.',
                                    rewards: { items: ['rusty_dagger'], xp: 100 }
                                }
                            ]
                        },
                        {
                            text: 'Search the right room',
                            outcomes: [
                                {
                                    weight: 100,
                                    text: 'The moment you step inside, a hidden warrior lunges at you!',
                                    combat: ['orc']
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            text: 'Sneak around to the back of the shack',
            outcomes: [
                {
                    weight: 100,
                    text: 'Behind the shack, you notice disturbed dirt near a broken fence post. After digging for several minutes, you uncover a buried chest filled with gold!',
                    rewards: { gold: 1000, xp: 200 }
                }
            ]
        },
        {
            text: 'Leave the shack alone',
            outcomes: [
                {
                    weight: 100,
                    text: 'You decide it’s not worth the risk and continue on your journey.',
                    rewards: { xp: 50 }
                }
            ]
        }
    ]
},


// ═══════════════════════════════════════════════════════════════
// Common Adventure: Whispering Lights
// ═══════════════════════════════════════════════════════════════

whispering_lights: {
    id: 'whispering_lights',
    name: 'Whispering Lights',
    rarity: 'common',
    description: 'Strange lights flicker between the trees as night falls.',
    intro: 'As dusk settles, faint glowing lights drift between the trees ahead. They pulse softly, almost as if beckoning you closer.',

    choices: [
        {
            text: 'Follow the lights deeper into the woods',
            outcomes: [
                {
                    weight: 100,
                    text: 'You follow the lights into a small forest clearing. Four paths reveal themselves.',
                    nextChoices: [
                        {
                            text: 'Approach a glowing stone altar',
                            outcomes: [
                                {
                                    weight: 60,
                                    text: 'The altar hums warmly. You feel empowered.',
                                    rewards: { xp: 200 }
                                },
                                {
                                    weight: 40,
                                    text: 'The altar flares violently — a guardian spirit attacks!',
                                    combat: ['forest_imp']
                                }
                            ]
                        },
                        {
                            text: 'Investigate a flickering campfire',
                            outcomes: [
                                {
                                    weight: 70,
                                    text: 'You find coins scattered near the ashes.',
                                    rewards: { gold: 300 }
                                },
                                {
                                    weight: 30,
                                    text: 'A lurking bandit leaps from the shadows!',
                                    combat: ['water_snake']
                                }
                            ]
                        },
                        {
                            text: 'Examine a glowing tree',
                            outcomes: [
                                {
                                    weight: 50,
                                    text: 'You harvest rare glowing sap and sell it later.',
                                    rewards: { gold: 200, xp: 100 }
                                },
                                {
                                    weight: 50,
                                    text: 'The tree comes alive and attacks!',
                                    combat: ['water_snake']
                                }
                            ]
                        },
                        {
                            text: 'Touch the floating lights',
                            outcomes: [
                                {
                                    weight: 80,
                                    text: 'The lights swirl around you and fade, leaving a reward behind.',
                                    rewards: { gold: 150, xp: 150 }
                                },
                                {
                                    weight: 20,
                                    text: 'The lights scream — illusions vanish as monsters appear!',
                                    combat: ['forest_imp']
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            text: 'Try to trap one of the lights',
            outcomes: [
                {
                    weight: 100,
                    text: 'You set a crude trap near where the lights drift. Soon, something takes the bait.',
                    nextChoices: [
                        {
                            text: 'Check the trap immediately',
                            outcomes: [
                                {
                                    weight: 60,
                                    text: 'You catch a glowing critter and sell it to a collector.',
                                    rewards: { gold: 400 }
                                },
                                {
                                    weight: 40,
                                    text: 'The trap snaps shut on a hostile creature!',
                                    combat: ['forest_imp']
                                }
                            ]
                        },
                        {
                            text: 'Wait and observe from hiding',
                            outcomes: [
                                {
                                    weight: 70,
                                    text: 'You learn more about the lights and gain insight.',
                                    rewards: { xp: 250 }
                                },
                                {
                                    weight: 30,
                                    text: 'You wait too long — something notices you first!',
                                    combat: ['forest_imp']
                                }
                            ]
                        },
                        {
                            text: 'Reinforce the trap',
                            outcomes: [
                                {
                                    weight: 50,
                                    text: 'The reinforced trap catches something valuable.',
                                    rewards: { gold: 350, xp: 100 }
                                },
                                {
                                    weight: 50,
                                    text: 'The trap breaks loudly, drawing enemies!',
                                    combat: ['bandit']
                                }
                            ]
                        },
                        {
                            text: 'Abandon the trap and leave',
                            outcomes: [
                                {
                                    weight: 100,
                                    text: 'You decide the lights aren’t worth the risk and move on.',
                                    rewards: { xp: 75 }
                                }
                            ]
                        }
                    ]
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
    // NEW ADVENTURES — LEVELS 1-6  (7 adventures)
    // ═══════════════════════════════════════════════════════════════

    // ── 1. THE WOUNDED TRAVELER ──────────────────────────────────────
    wounded_traveler: {
        id: 'wounded_traveler',
        name: 'Wounded Traveler',
        rarity: 'common',
        description: 'A bloodied stranger slumps against a tree ahead...',
        intro: 'You nearly trip over a man collapsed at the base of an oak tree. His leg is badly gashed and his pack is half-open. He looks up at you with frightened eyes. "Please," he rasps. "They took everything. Then the wolves..."',

        choices: [
            {
                text: 'Tend to his wounds and help him',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You bandage his leg and help him sit up. He\'s more coherent now.',
                        nextChoices: [
                            {
                                text: 'Give him some of your gold for the road',
                                outcomes: [
                                    {
                                        weight: 70,
                                        text: 'His eyes go wide with gratitude. "I\'m a map-maker. Here — my best work." He presses a detailed chart into your hands and limps away. You sell it in the next town for a handsome sum.',
                                        rewards: { gold: -50, xp: 350, gold_bonus: 800 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'He thanks you sincerely and pulls a small gem from his boot — a last resort he\'s glad not to need. "Take it. You earned it."',
                                        rewards: { gold: -50, xp: 200, items: ['small_gem'] }
                                    }
                                ]
                            },
                            {
                                text: 'Escort him back toward the road',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'Halfway to the road, you hear growling. The wolves that attacked him found you both. You drive them off. The man is safe and calls you a hero.',
                                        rewards: { xp: 400 },
                                        combat: ['wolf']
                                    },
                                    {
                                        weight: 40,
                                        text: 'You get him safely to the road without incident. He presses his coin purse into your hand. "Everything I have left. It\'s yours."',
                                        rewards: { gold: 300, xp: 300 }
                                    }
                                ]
                            },
                            {
                                text: 'Patch him up and send him on his way',
                                outcomes: [
                                    {
                                        weight: 100,
                                        text: 'He nods gratefully and hobbles off. A few minutes later you find his dropped journal — it contains notes on a nearby cache. You find it.',
                                        rewards: { gold: 400, xp: 150 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Search his pack while he\'s distracted',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You quietly rummage while pretending to help. You find a few coins and a vial. He\'s too weak to notice. You feel like a rat, but richer.',
                        rewards: { gold: 120, xp: -100, items: ['health_potion'] }
                    },
                    {
                        weight: 50,
                        text: 'He catches you in the act and shouts for help. A forest patrol hears him and chases you off.',
                        rewards: { xp: -200, damage: 25 },
                        combat: ['kobold']
                    }
                ]
            },
            {
                text: 'Leave him — you have your own problems',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You walk past. The forest feels colder for a while. Maybe he made it. Maybe he didn\'t.',
                        rewards: { xp: 50 }
                    },
                    {
                        weight: 40,
                        text: 'You walk away but hear a crash behind you. The wolves came back. Now they\'ve spotted you too.',
                        combat: ['wolf', 'wolf'],
                        rewards: { xp: 100 }
                    }
                ]
            }
        ]
    },

    // ── 2. THE GOBLIN CAMP ───────────────────────────────────────────
    goblin_camp: {
        id: 'goblin_camp',
        name: 'Goblin Raiding Camp',
        rarity: 'common',
        description: 'The stench of smoke and burnt meat drifts through the trees...',
        intro: 'Through a tangle of brush you spot a small goblin camp — three crude tents, a crackling fire, and a pile of loot stolen from travelers. The goblins are arguing loudly over a sack of gold. You count at least four of them, but they haven\'t noticed you.',

        choices: [
            {
                text: 'Sneak in and grab the loot bag',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You ghost through the shadows like a proper thief. The sack is heavy in your hands as you melt back into the trees. The goblins keep arguing, oblivious.',
                        rewards: { gold: 500, xp: 300 }
                    },
                    {
                        weight: 30,
                        text: 'Almost! Your foot snaps a branch. The goblins spin around — too late to run.',
                        combat: ['goblin', 'goblin'],
                        rewards: { gold: 200 }
                    },
                    {
                        weight: 20,
                        text: 'You grab the bag and bolt but one goblin has surprisingly fast little legs. He tackles you and screams for the others.',
                        combat: ['goblin', 'goblin', 'goblin'],
                        rewards: { gold: 100 }
                    }
                ]
            },
            {
                text: 'Circle around and set the camp on fire',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You toss a torch and chaos erupts. The goblins scatter screaming. You rifle through the burning camp and salvage a nice pile before the whole thing goes up.',
                        rewards: { gold: 350, xp: 250 }
                    },
                    {
                        weight: 30,
                        text: 'The fire spreads faster than expected. You barely escape the blaze — and run directly into fleeing goblins who are furious.',
                        combat: ['goblin', 'goblin'],
                        rewards: { xp: 200, damage: 20 }
                    },
                    {
                        weight: 30,
                        text: 'Perfect timing. The fire draws in their goblin shaman from the treeline. He sees you standing there with a torch and does NOT look amused.',
                        combat: ['goblin_shaman']
                    }
                ]
            },
            {
                text: 'Walk straight in and demand they surrender',
                outcomes: [
                    {
                        weight: 100,
                        text: 'The goblins fall completely silent... then all shriek at once and attack.',
                        nextChoices: [
                            {
                                text: 'Fight them head-on',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'You wade through the little monsters like a hurricane. They break and run, leaving their entire camp to you.',
                                        combat: ['goblin', 'goblin'],
                                        rewards: { gold: 600, xp: 350 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'Tougher than they look. You clear the camp but take some scratches. The loot is yours though.',
                                        combat: ['goblin', 'goblin', 'goblin'],
                                        rewards: { gold: 500, xp: 400, damage: 30 }
                                    }
                                ]
                            },
                            {
                                text: 'Grab what you can and run',
                                outcomes: [
                                    {
                                        weight: 70,
                                        text: 'You snatch the gold sack and sprint. Goblin spears clatter on the ground behind you. Victory.',
                                        rewards: { gold: 450, xp: 200 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'You trip. That\'s all it takes.',
                                        combat: ['goblin', 'goblin'],
                                        rewards: { xp: 150 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Leave them alone and take a wide detour',
                outcomes: [
                    {
                        weight: 100,
                        text: 'Caution wins. You loop around the camp without incident. The goblins never knew you were there.',
                        rewards: { xp: 75 }
                    }
                ]
            }
        ]
    },

    // ── 3. THE TALKING CROW ─────────────────────────────────────────
    talking_crow: {
        id: 'talking_crow',
        name: 'The Talking Crow',
        rarity: 'uncommon',
        description: 'A coal-black bird fixes you with an unnervingly intelligent stare...',
        intro: 'A huge raven lands directly in front of you, cocking its head with uncanny precision. Then, in a voice like dry leaves: "I know where things are buried. I know what sleeps under the old stones. I know your name, traveler. The question is — what is it worth to you?"',

        choices: [
            {
                text: '"Tell me where something valuable is buried."',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The crow gives precise directions. Twenty minutes later you\'re elbow-deep in disturbed earth, pulling out a locked box. Inside: a fortune.',
                        rewards: { gold: 900, xp: 400 }
                    },
                    {
                        weight: 30,
                        text: 'The crow leads you to a hollow log stuffed with old coins and a curious brass ring. Modest, but real.',
                        rewards: { gold: 350, xp: 200, items: ['small_gem'] }
                    },
                    {
                        weight: 20,
                        text: 'The location is real. The treasure is there. So is the giant rat nest sitting on top of it.',
                        combat: ['giant_rat', 'giant_rat'],
                        rewards: { gold: 400, xp: 250 }
                    },
                    {
                        weight: 10,
                        text: 'The crow cackles and flies away. "Worth more to me!" It was lying the whole time. Absolutely nobody is surprised by this.',
                        rewards: { xp: 100 }
                    }
                ]
            },
            {
                text: '"What do you want in return?"',
                outcomes: [
                    {
                        weight: 100,
                        text: '"A shiny thing. That\'s all." It eyes your pack meaningfully.',
                        nextChoices: [
                            {
                                text: 'Give it a gold coin',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'The crow snatches it, bobs its head approvingly, and whispers a location. You find a hidden stash worth far more than one coin.',
                                        rewards: { gold: -1, gold_bonus: 750, xp: 350 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'The crow takes it and flies directly into a tree at full speed. You watch this happen. It gets up, shakes itself, and flies away saying nothing. You gained nothing except a memory.',
                                        rewards: { gold: -1, xp: 150 }
                                    }
                                ]
                            },
                            {
                                text: 'Offer it a piece of food',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: '"Acceptable." It eats your offering and recites a riddle. The answer leads you to a cache of gold.',
                                        rewards: { gold: 600, xp: 300 }
                                    },
                                    {
                                        weight: 50,
                                        text: '"Insufficient." It hops away into the brush. You briefly consider your life choices.',
                                        rewards: { xp: 75 }
                                    }
                                ]
                            },
                            {
                                text: 'Refuse to give it anything',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: '"Then we are done." It flies off. You feel vaguely judged.',
                                        rewards: { xp: 50 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'The crow screams and the forest erupts with its friends. They dive at you furiously until you flee.',
                                        rewards: { damage: 30, xp: 100 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Try to catch the crow',
                outcomes: [
                    {
                        weight: 30,
                        text: 'Somehow you manage it. The crow stares at you from your hands in absolute silence for five seconds. Then it bites you hard and is gone in a flurry of wings. Your hand will remember this day.',
                        rewards: { damage: 15, xp: 200 }
                    },
                    {
                        weight: 70,
                        text: 'It sidesteps at the last possible moment and laughs at you. An actual laugh. Then it\'s gone.',
                        rewards: { xp: 100 }
                    }
                ]
            },
            {
                text: 'Walk away from the unsettling bird',
                outcomes: [
                    {
                        weight: 100,
                        text: '"You\'ll regret this, traveler." It calls after you. You probably won\'t. Probably.',
                        rewards: { xp: 75 }
                    }
                ]
            }
        ]
    },

    // ── 4. THE ABANDONED WELL ───────────────────────────────────────
    abandoned_well: {
        id: 'abandoned_well',
        name: 'The Abandoned Well',
        rarity: 'common',
        description: 'A moss-covered stone well sits alone in a forgotten clearing...',
        intro: 'You find a stone well deep in the trees, far from any settlement. A rope still hangs into the darkness below. When you lean over the edge, you hear something — a faint tinkling, like coins shifting. Or like teeth. Hard to tell, honestly.',

        choices: [
            {
                text: 'Lower yourself down on the rope',
                outcomes: [
                    {
                        weight: 40,
                        text: 'Hand over hand in the dark, you reach the bottom. Your boots splash into an inch of water — and your fingers find a leather pouch packed with gold coins. Someone\'s forgotten savings.',
                        rewards: { gold: 650, xp: 300 }
                    },
                    {
                        weight: 30,
                        text: 'You reach the bottom safely. There\'s gold here, but also something else — a colony of giant spiders that do not appreciate the visit.',
                        combat: ['giant_spider'],
                        rewards: { gold: 350, xp: 200 }
                    },
                    {
                        weight: 20,
                        text: 'Halfway down, the rope frays and snaps. You drop into cold water and mud. No treasure, badly bruised, and the climb out takes an hour.',
                        rewards: { damage: 40, xp: 100 }
                    },
                    {
                        weight: 10,
                        text: 'At the bottom you find a small box. Inside is a glowing gem and a note: "If you can read this, it was meant for you." No further explanation.',
                        rewards: { items: ['small_gem'], xp: 400 }
                    }
                ]
            },
            {
                text: 'Drop a torch down to see what\'s there',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The torch lands and sputters. In the brief light you see glinting metal about thirty feet down. Coins. A lot of them.',
                        nextChoices: [
                            {
                                text: 'Go down after them',
                                outcomes: [
                                    {
                                        weight: 70,
                                        text: 'The rope holds. The coins are real. You come back up richer.',
                                        rewards: { gold: 500, xp: 200 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'The rope doesn\'t hold.',
                                        rewards: { damage: 60, gold: 150, xp: 150 }
                                    }
                                ]
                            },
                            {
                                text: 'It\'s not worth the risk',
                                outcomes: [
                                    {
                                        weight: 100,
                                        text: 'You leave it. The gold stays where it is. So does whatever else was down there.',
                                        rewards: { xp: 100 }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 50,
                        text: 'The torch illuminates two pale eyes staring back at you from the dark. Then more. Then the sound of scrabbling claws growing louder.',
                        combat: ['giant_rat', 'giant_rat'],
                        rewards: { xp: 200 }
                    }
                ]
            },
            {
                text: 'Shout down the well',
                outcomes: [
                    {
                        weight: 50,
                        text: 'Your voice echoes back oddly. Then a second voice echoes back. Not yours. It says: "Finally." After a moment of silence, a folded piece of parchment slowly rises up the rope by itself. It\'s a treasure map.',
                        rewards: { gold: 700, xp: 350 }
                    },
                    {
                        weight: 30,
                        text: 'Nothing. Just the wind and the dark.',
                        rewards: { xp: 50 }
                    },
                    {
                        weight: 20,
                        text: 'Something down there doesn\'t like being shouted at and makes its feelings known by climbing up.',
                        combat: ['giant_spider', 'giant_rat'],
                        rewards: { xp: 200 }
                    }
                ]
            },
            {
                text: 'Push the well cover back over it and leave',
                outcomes: [
                    {
                        weight: 100,
                        text: 'Some things stay in the well. You\'re at peace with that.',
                        rewards: { xp: 50 }
                    }
                ]
            }
        ]
    },

    // ── 5. THE DEAD KNIGHT ──────────────────────────────────────────
    dead_knight: {
        id: 'dead_knight',
        name: 'The Dead Knight',
        rarity: 'uncommon',
        description: 'A knight in full armor sits propped against a tree, motionless for years...',
        intro: 'The knight has been dead a long time — the armor is tarnished, the visor down, and vines grow around the gauntlets. A sword lies across the lap. A crest is still barely visible on the breastplate: a silver hawk. Whoever this was, they were nobility once.',

        choices: [
            {
                text: 'Take the armor and sword',
                outcomes: [
                    {
                        weight: 30,
                        text: 'The moment you lift the sword, the knight\'s hand clamps shut. The eyes behind the visor glow. "Thief." The ancient warrior rises.',
                        combat: ['risen_knight']
                    },
                    {
                        weight: 40,
                        text: 'The gear is old but still sound. You carefully take what you can carry and sell it in town for a good price.',
                        rewards: { gold: 500, xp: 200 }
                    },
                    {
                        weight: 30,
                        text: 'As you strip the armor you find a hidden compartment in the breastplate containing a sealed letter and a small fortune in gems.',
                        rewards: { gold: 300, items: ['small_gem', 'small_gem'], xp: 300 }
                    }
                ]
            },
            {
                text: 'Search for an inscription or identity',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You find the name engraved inside the pauldron: Sir Edvin Vael. A name you\'ve heard — a knight who vanished thirty years ago with a royal seal. You search more carefully.',
                        nextChoices: [
                            {
                                text: 'Look for the royal seal',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'Tucked inside the gorget you find a royal seal of House Aldenmere, still intact. It\'s worth a small fortune to the right buyer — and the story is free.',
                                        rewards: { gold: 800, xp: 500 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'You find the seal — but so does the spirit of Sir Edvin, who is NOT done with it yet.',
                                        combat: ['risen_knight'],
                                        rewards: { gold: 400, xp: 350 }
                                    }
                                ]
                            },
                            {
                                text: 'Leave the knight undisturbed but note the location',
                                outcomes: [
                                    {
                                        weight: 100,
                                        text: 'You mark it on your map and report it in town. A noble family pays you handsomely for the information — and asks no further questions.',
                                        rewards: { gold: 600, xp: 400 }
                                    }
                                ]
                            },
                            {
                                text: 'Offer a prayer for the fallen',
                                outcomes: [
                                    {
                                        weight: 70,
                                        text: 'The air shifts. A faint warmth. The knight\'s clenched fist relaxes — and a small glowing pouch falls to the ground. A final gift.',
                                        rewards: { gold: 400, xp: 500, items: ['health_potion'] }
                                    },
                                    {
                                        weight: 30,
                                        text: 'Something stirs. The spirit rises — not hostile, but testing you. Only the worthy receive what he guards.',
                                        combat: ['risen_knight'],
                                        rewards: { gold: 600, xp: 600 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Leave the knight in peace',
                outcomes: [
                    {
                        weight: 80,
                        text: 'You walk on. Some things deserve to stay where they fell.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'As you walk away, the sword lifts off the lap and floats to eye level in front of you. It turns slowly, then embeds itself in the ground at your feet, hilt-up, waiting.',
                        rewards: { items: ['iron_sword'], xp: 300 }
                    }
                ]
            }
        ]
    },

    // ── 6. MOTHER BOGWORT'S REMEDY ──────────────────────────────────
    bogwort_remedy: {
        id: 'bogwort_remedy',
        name: "Mother Bogwort's Remedy",
        rarity: 'common',
        description: 'Smoke rises from a hovel too small to be a house and too large to be ignored...',
        intro: 'A hunched old woman outside a mud-and-stick hovel waves at you before you can pass. "You there! You look like someone with aches. I have cures!" The smell coming from her cookpot could strip paint. She\'s stirring something that\'s three different shades of wrong.',

        choices: [
            {
                text: '"What are you selling?"',
                outcomes: [
                    {
                        weight: 100,
                        text: '"Two remedies today! The Revitalizing Stew — fifty gold. Or the Mystery Flask — twenty-five. Take your pick, dearie."',
                        nextChoices: [
                            {
                                text: 'Buy the Revitalizing Stew (50g)',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'Vile. Absolutely vile. But you feel incredible afterward — healed completely and buzzing with energy.',
                                        rewards: { gold: -50, heal: 'full', xp: 200 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'You drink it. It\'s... actually not bad? Slightly mushroom-flavored. You feel much better.',
                                        rewards: { gold: -50, heal: 'half', xp: 150 }
                                    },
                                    {
                                        weight: 20,
                                        text: 'You drink it and immediately understand why she lives alone in a swamp. You spend the next hour feeling terrible.',
                                        rewards: { gold: -50, damage: 40, xp: 100 }
                                    }
                                ]
                            },
                            {
                                text: 'Buy the Mystery Flask (25g)',
                                outcomes: [
                                    {
                                        weight: 40,
                                        text: 'A standard healing potion! What a ripoff. What a relief.',
                                        rewards: { gold: -25, items: ['health_potion'] }
                                    },
                                    {
                                        weight: 30,
                                        text: 'A mana potion. Exactly what you needed, honestly.',
                                        rewards: { gold: -25, items: ['mana_potion'] }
                                    },
                                    {
                                        weight: 20,
                                        text: 'The flask contains something that turns your teeth temporarily blue. You gain nothing but a story.',
                                        rewards: { gold: -25, xp: 100 }
                                    },
                                    {
                                        weight: 10,
                                        text: 'The flask contains liquid courage. You feel unstoppable. You also feel the need to fight something immediately. A boar obliges.',
                                        rewards: { gold: -25, xp: 250 },
                                        combat: ['wild_boar']
                                    }
                                ]
                            },
                            {
                                text: 'Decline politely',
                                outcomes: [
                                    {
                                        weight: 100,
                                        text: '"Your loss, dearie." She goes back to stirring. You leave quickly.',
                                        rewards: { xp: 50 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Help her gather ingredients from the forest',
                outcomes: [
                    {
                        weight: 50,
                        text: 'She sends you for three things. You find them all without incident. In return she gives you a proper healing potion and one of her legendary stews, sealed for travel. "Don\'t open it unless you mean it."',
                        rewards: { gold: 0, items: ['health_potion', 'health_potion'], xp: 300 }
                    },
                    {
                        weight: 30,
                        text: 'You\'re gathering herbs when something decides to gather you instead.',
                        combat: ['giant_spider'],
                        rewards: { items: ['health_potion'], xp: 250 }
                    },
                    {
                        weight: 20,
                        text: 'You gather the ingredients and bring them back. She\'s delighted and teaches you an old remedy trick — you feel a surge of practical wisdom.',
                        rewards: { xp: 500, gold: 100 }
                    }
                ]
            },
            {
                text: 'Steal from her herb jars while her back is turned',
                outcomes: [
                    {
                        weight: 40,
                        text: 'She\'s NEVER had her back turned. "Put that back, child." She\'s known the whole time. She waves you away with a curse that may or may not be real. You run.',
                        rewards: { damage: 20, xp: -100 }
                    },
                    {
                        weight: 40,
                        text: 'You grab a jar and slip away. Whatever is inside is genuinely useful — a healing salve worth real money.',
                        rewards: { gold: 200, items: ['health_potion'], xp: -50 }
                    },
                    {
                        weight: 20,
                        text: 'You grab the wrong jar. It explodes softly in your hand and coats you in something bright green that doesn\'t wash off for a week.',
                        rewards: { damage: 30, xp: 50 }
                    }
                ]
            }
        ]
    },

    // ── 7. THE GHOST SOLDIER ────────────────────────────────────────
    ghost_soldier: {
        id: 'ghost_soldier',
        name: 'The Ghost Soldier',
        rarity: 'uncommon',
        description: 'A soldier in outdated armor stands at attention in the middle of the path...',
        intro: 'The figure doesn\'t move as you approach. It\'s only when you\'re five steps away that you notice the light passes through him. He\'s translucent — a ghost, still standing his post. His eyes track to yours. "Halt. State your purpose and allegiance." His voice sounds like it\'s coming from underwater.',

        choices: [
            {
                text: 'Play along — claim to be a loyal soldier',
                outcomes: [
                    {
                        weight: 50,
                        text: '"You are... different from the others." He studies you for a long moment, then steps aside. "Pass, soldier. The enemy is east." He never moves again. You find a cache of old military supplies he was guarding.',
                        rewards: { gold: 400, xp: 350, items: ['health_potion'] }
                    },
                    {
                        weight: 30,
                        text: 'He gives you a field report — information about an ambush the enemy set thirty years ago that nobody ever cleared. You find the site and loot it.',
                        rewards: { gold: 650, xp: 400 }
                    },
                    {
                        weight: 20,
                        text: '"Your accent is wrong." He attacks — muscle memory from another era.',
                        combat: ['ghost_soldier_enemy']
                    }
                ]
            },
            {
                text: 'Try to explain that the war is long over',
                outcomes: [
                    {
                        weight: 40,
                        text: 'He stares at you in silence for a very long time. "Then I may rest." A faint light grows around him. He smiles — the first time in decades — and fades. You find his old pay pouch on the ground.',
                        rewards: { gold: 350, xp: 600 }
                    },
                    {
                        weight: 30,
                        text: '"A lie. You\'re one of them." He didn\'t want to hear it. He attacks.',
                        combat: ['ghost_soldier_enemy'],
                        rewards: { xp: 200 }
                    },
                    {
                        weight: 30,
                        text: 'He processes what you said for a long moment. "I need proof. Show me the king\'s seal or get off my road." You don\'t have it. He lets you pass anyway, looking very tired.',
                        rewards: { xp: 300, gold: 100 }
                    }
                ]
            },
            {
                text: 'Walk right through him',
                outcomes: [
                    {
                        weight: 50,
                        text: 'Cold. Deep cold. A flash of images — a battlefield, rain, screaming. Then you\'re through. Your hands are shaking but you\'re fine.',
                        rewards: { xp: 200, damage: 10 }
                    },
                    {
                        weight: 50,
                        text: 'Disrespectful. He grabs you with a grip that\'s entirely too solid for a ghost.',
                        combat: ['ghost_soldier_enemy']
                    }
                ]
            },
            {
                text: 'Leave the road and go around him',
                outcomes: [
                    {
                        weight: 70,
                        text: 'He watches you go around him through the brush, tracking you the whole time but not moving. You feel his gaze on your back for a mile.',
                        rewards: { xp: 75 }
                    },
                    {
                        weight: 30,
                        text: 'He materializes in front of you again. There is no going around.',
                        combat: ['ghost_soldier_enemy'],
                        rewards: { xp: 150 }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // NEW ADVENTURES — LEVELS 7-10  (3 adventures)
    // ═══════════════════════════════════════════════════════════════

    // ── 8. THE ALCHEMY DISASTER ─────────────────────────────────────
    alchemy_disaster: {
        id: 'alchemy_disaster',
        name: 'The Alchemy Disaster',
        rarity: 'uncommon',
        description: 'A smoking crater and the smell of sulphur mark something gone very wrong...',
        intro: 'You find a clearing that is clearly the scene of a catastrophe. Three trees are down, scorch marks radiate outward from a melted iron table, and bubbling fluid oozes into the grass. In the middle of it all, a robed figure is on their hands and knees, collecting pieces of a shattered crystal flask. "No no no no NO—" They haven\'t seen you yet.',

        choices: [
            {
                text: 'Help them collect the pieces',
                outcomes: [
                    {
                        weight: 100,
                        text: '"Oh! You — yes, please!" The alchemist is frantic. You carefully collect crystalline fragments while she grabs her notes.',
                        nextChoices: [
                            {
                                text: 'Ask what was in the flask',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: '"Distilled courage." She looks embarrassed. "For a client. A knight. Very important. Here — payment for helping." She hands you a pouch of gold and two potions she had left over.',
                                        rewards: { gold: 500, items: ['health_potion', 'mana_potion'], xp: 400 }
                                    },
                                    {
                                        weight: 30,
                                        text: '"You don\'t want to know." She pays you in potions and practically runs away. The fluid from the explosion begins moving toward you. Slowly but with purpose.',
                                        combat: ['alchemical_ooze'],
                                        rewards: { gold: 300, items: ['health_potion'], xp: 350 }
                                    },
                                    {
                                        weight: 20,
                                        text: '"Monster binding compound. Which means the bound monster is now... unbound." She finishes her sentence pointing at the tree line. Something emerges.',
                                        combat: ['bound_beast'],
                                        rewards: { gold: 600, xp: 500 }
                                    }
                                ]
                            },
                            {
                                text: 'Ask for payment before helping more',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'Fair enough. She pays upfront — a pouch of gold and a healing draught. You finish helping and part on good terms.',
                                        rewards: { gold: 450, items: ['health_potion'], xp: 300 }
                                    },
                                    {
                                        weight: 40,
                                        text: '"You\'re a mercenary at heart." She\'s not wrong. She pays you and the transaction ends there. No warmth, but good coin.',
                                        rewards: { gold: 400, xp: 200 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Pocket some of the scattered potion components while she\'s distracted',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You grab a handful of intact vials from the debris. They\'re unlabeled but clearly valuable. You sell them later for a tidy sum.',
                        rewards: { gold: 400, items: ['health_potion'], xp: -100 }
                    },
                    {
                        weight: 30,
                        text: 'You pocket a glowing vial. It warms your hand pleasantly — then burns it. The alchemist looks up at your yelp. She shakes her head.',
                        rewards: { damage: 50, xp: -50 }
                    },
                    {
                        weight: 20,
                        text: 'You grab a black vial. It falls. The alchemist screams "NOT THAT ONE—" and then there\'s fire everywhere.',
                        combat: ['alchemical_ooze'],
                        rewards: { damage: 40, xp: 100 }
                    }
                ]
            },
            {
                text: 'Warn her and step back carefully',
                outcomes: [
                    {
                        weight: 60,
                        text: '"Don\'t move!" She freezes, following your pointed finger to the vial she was about to step on. She exhales slowly. "You just saved my life." The reward reflects that.',
                        rewards: { gold: 700, xp: 500, items: ['mana_potion'] }
                    },
                    {
                        weight: 40,
                        text: 'She hears you but too late. The vial pops — a small boom that sends you both stumbling. No one is seriously hurt. She laughs nervously and pays you anyway.',
                        rewards: { gold: 300, damage: 25, xp: 300 }
                    }
                ]
            },
            {
                text: 'Keep walking — this has bad idea written all over it',
                outcomes: [
                    {
                        weight: 70,
                        text: 'Correct assessment. As you leave, something in the wreckage ignites. The blast wave knocks you ten feet. You walk faster.',
                        rewards: { damage: 35, xp: 150 }
                    },
                    {
                        weight: 30,
                        text: 'You clear the area without incident. Behind you, a second much larger explosion. You don\'t look back.',
                        rewards: { xp: 200 }
                    }
                ]
            }
        ]
    },

    // ── 9. THE SIREN POOL ───────────────────────────────────────────
    siren_pool: {
        id: 'siren_pool',
        name: 'The Siren Pool',
        rarity: 'rare',
        description: 'A voice like silver bells drifts through the trees from somewhere ahead...',
        intro: 'You push through a curtain of willows and stop dead. A crystalline pool in a forest hollow, lit from beneath by shifting blue light. Sitting on a mossy stone at the water\'s edge is a figure — beautiful and wrong in a way you can\'t quite name. She\'s watching you with calm, enormous eyes. She says nothing. She doesn\'t need to. You feel an almost magnetic pull toward the water.',

        choices: [
            {
                text: 'Approach the pool',
                outcomes: [
                    {
                        weight: 100,
                        text: 'The pull intensifies with each step. The figure still hasn\'t moved.',
                        nextChoices: [
                            {
                                text: 'Step into the water',
                                outcomes: [
                                    {
                                        weight: 30,
                                        text: 'The cold water breaks the spell instantly. The figure hisses and drops the illusion — a wiry creature with too many teeth lunges for you.',
                                        combat: ['siren_beast']
                                    },
                                    {
                                        weight: 30,
                                        text: 'The water is startlingly clear and clean. You feel it pulling at something — your exhaustion, your injuries. You emerge completely healed. The figure nods once and is gone.',
                                        rewards: { heal: 'full', xp: 800 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'You step in up to your knees and feel a deep cold rushing through you. Not healing — draining. You stumble back to shore weaker but aware.',
                                        rewards: { damage: 60, xp: 400 }
                                    }
                                ]
                            },
                            {
                                text: 'Stop and speak to the figure',
                                outcomes: [
                                    {
                                        weight: 40,
                                        text: '"You are the first to stop." The voice is layered — many voices at once. "For that, I offer." She drops something into the water. A luminous gem floats to the surface near your feet.',
                                        rewards: { items: ['medium_gem'], xp: 700 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'She tilts her head. "No one has spoken to me in a long time." She tells you where the water\'s riches rest — the accumulated offerings of a hundred entranced victims. You leave wealthier.',
                                        rewards: { gold: 1200, xp: 600 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'Your voice breaks something in the air. She snarls and the illusion collapses — whatever she is, it\'s angry and hungry.',
                                        combat: ['siren_beast']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Cover your eyes and walk toward the sound instead',
                outcomes: [
                    {
                        weight: 50,
                        text: 'Smart. With your eyes shut, the pull fades to almost nothing. You navigate by sound and find the pool\'s edge. You feel around the mossy bank and your hand closes on something heavy — a coin-stuffed pouch dropped by someone who didn\'t cover their eyes.',
                        rewards: { gold: 900, xp: 500 }
                    },
                    {
                        weight: 30,
                        text: 'Navigating blind, you step wrong and fall into the shallows face-first. The cold water helps. The laughter from the figure does not.',
                        rewards: { damage: 25, xp: 300 }
                    },
                    {
                        weight: 20,
                        text: 'You cover your eyes and walk forward with confidence. You walk directly into a tree at full speed. This is unrelated to the siren. You are simply bad at covering your eyes and walking.',
                        rewards: { damage: 15, xp: 200 }
                    }
                ]
            },
            {
                text: 'Throw a stone at the figure',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The stone passes through her. She looks at it, then at you. Then she smiles. The smile is too wide.',
                        combat: ['siren_beast']
                    },
                    {
                        weight: 60,
                        text: 'The stone breaks the enchantment for both of you. She dissolves into mist with a shriek. The pool is just a pool now — but a beautiful one with something shiny at the bottom.',
                        rewards: { gold: 600, xp: 400 }
                    }
                ]
            },
            {
                text: 'Turn around immediately',
                outcomes: [
                    {
                        weight: 70,
                        text: 'Excellent instincts. The pull fades as you retreat through the willows. That was a very bad thing avoided. The forest feels grateful somehow.',
                        rewards: { xp: 300 }
                    },
                    {
                        weight: 30,
                        text: 'The song follows you through the trees. Louder. Closer. You break into a run.',
                        combat: ['siren_beast'],
                        rewards: { xp: 200 }
                    }
                ]
            }
        ]
    },

    // ── 10. THE COLLAPSED MINE ──────────────────────────────────────
    collapsed_mine: {
        id: 'collapsed_mine',
        name: 'The Collapsed Mine',
        rarity: 'uncommon',
        description: 'A cave-in has blocked what was once a busy mining entrance...',
        intro: 'The timbers over the mine entrance have rotted and given way, but the collapse was partial — a gap about the width of a person still opens into the dark. A pickaxe is embedded in the rock beside the entrance. A faded sign reads: "IRONVEIN MINE — CLAIM 7." Claim 7 was one of the richest seams in the region before it was abandoned. Nobody says why it was abandoned.',

        choices: [
            {
                text: 'Squeeze through the gap and explore',
                outcomes: [
                    {
                        weight: 30,
                        text: 'Ten minutes in, your torch catches a glint in the wall. Then another. Then a seam of raw ore as wide as your arm. You work it for an hour and emerge with a fortune in raw metal.',
                        rewards: { gold: 1200, xp: 600 }
                    },
                    {
                        weight: 30,
                        text: 'Deep inside, you find a mining camp frozen in time — tools, personal effects, and a strongbox. Whatever happened here happened fast.',
                        rewards: { gold: 800, xp: 500, items: ['medium_gem'] }
                    },
                    {
                        weight: 20,
                        text: 'The mine is occupied. Deeply, disturbingly occupied.',
                        combat: ['mine_horror', 'giant_rat'],
                        rewards: { gold: 600, xp: 400 }
                    },
                    {
                        weight: 20,
                        text: 'You find ore, you find a gem pocket — and then you hear the distinct sound of new rocks settling. You sprint for the entrance. You make it. Barely.',
                        rewards: { gold: 700, damage: 50, xp: 450 }
                    }
                ]
            },
            {
                text: 'Try to widen the gap safely',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You pull the pickaxe free and carefully chip at the loose rock.',
                        nextChoices: [
                            {
                                text: 'Keep going — you can make it safe',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'An hour of work and the entrance is stable enough. You explore safely and find rich ore veins and an abandoned cart full of refined ingots.',
                                        rewards: { gold: 1000, xp: 600 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'Your pickaxe hits the wrong rock. The ceiling shifts. Run.',
                                        rewards: { damage: 80, xp: 300 }
                                    },
                                    {
                                        weight: 20,
                                        text: 'The widened entrance lets more in than just you. Something large and pale crawls out, blinking in the light.',
                                        combat: ['mine_horror'],
                                        rewards: { gold: 400, xp: 400 }
                                    }
                                ]
                            },
                            {
                                text: 'Leave the entrance as-is and squeeze through',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'You slip through and explore in the dark. Your instincts for value lead you to a small gem pocket in the eastern wall.',
                                        rewards: { gold: 600, items: ['small_gem'], xp: 350 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'Halfway in, the gap shifts. You spend a frightening hour scraping your way free. Nothing to show for it except bruises.',
                                        rewards: { damage: 45, xp: 200 }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Look for a second entrance',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You scout the hillside for thirty minutes and find it — a ventilation shaft, collapsed but shallow. Fifteen minutes of digging and you\'re in. This side of the mine is untouched. The ore here is exceptional.',
                        rewards: { gold: 1100, xp: 500 }
                    },
                    {
                        weight: 40,
                        text: 'You find a second shaft, smaller than the main entrance. Deep in it, something stares back at you with pale eyes.',
                        combat: ['mine_horror', 'giant_rat'],
                        rewards: { gold: 300, xp: 300 }
                    },
                    {
                        weight: 20,
                        text: 'No second entrance. But the scouting reveals a surface ore deposit on the hillside — no digging required.',
                        rewards: { gold: 400, xp: 250 }
                    }
                ]
            },
            {
                text: 'Mark it on your map and come back better prepared',
                outcomes: [
                    {
                        weight: 100,
                        text: 'Smart thinking. You note the location carefully. When you return with better gear... well, that\'s a story for another day.',
                        rewards: { xp: 200 }
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
    // ── NEW ENEMIES for the new adventures ──────────────────────────
    risen_knight: {
        name: 'Risen Knight',
        baseHp: 180,
        baseDamage: 28,
        baseDefense: 22,
        baseXp: 900,
        baseGold: 400,
        level: 8,
        possibleDrops: ['ancient_sword', 'crypt_armor', 'medium_gem'],
        dropRates: { uncommon: 0.4, rare: 0.25, epic: 0.1 }
    },
    goblin_shaman: {
        name: 'Goblin Shaman',
        baseHp: 90,
        baseDamage: 20,
        baseDefense: 6,
        baseXp: 350,
        baseGold: 180,
        level: 4,
        possibleDrops: ['mana_potion', 'shaman_totem', 'small_gem'],
        dropRates: { common: 0.5, uncommon: 0.3, rare: 0.1 }
    },
    ghost_soldier_enemy: {
        name: 'Ghost Soldier',
        baseHp: 140,
        baseDamage: 22,
        baseDefense: 12,
        baseXp: 650,
        baseGold: 280,
        level: 6,
        possibleDrops: ['bone_dust', 'spirit_essence', 'medium_gem'],
        dropRates: { uncommon: 0.4, rare: 0.2 }
    },
    alchemical_ooze: {
        name: 'Alchemical Ooze',
        baseHp: 200,
        baseDamage: 26,
        baseDefense: 8,
        baseXp: 750,
        baseGold: 220,
        level: 7,
        possibleDrops: ['slime_gel', 'chaos_essence', 'medium_gem'],
        dropRates: { common: 0.4, uncommon: 0.35, rare: 0.15 }
    },
    bound_beast: {
        name: 'Unbound Beast',
        baseHp: 240,
        baseDamage: 32,
        baseDefense: 14,
        baseXp: 1100,
        baseGold: 350,
        level: 9,
        possibleDrops: ['beast_hide', 'large_gem'],
        dropRates: { uncommon: 0.35, rare: 0.2, epic: 0.08 }
    },
    siren_beast: {
        name: 'Siren Beast',
        baseHp: 220,
        baseDamage: 30,
        baseDefense: 10,
        baseXp: 1200,
        baseGold: 500,
        level: 8,
        possibleDrops: ['wisp_essence', 'medium_gem', 'blood_vial'],
        dropRates: { uncommon: 0.3, rare: 0.25, epic: 0.12 }
    },
    mine_horror: {
        name: 'Mine Horror',
        baseHp: 260,
        baseDamage: 34,
        baseDefense: 16,
        baseXp: 1300,
        baseGold: 420,
        level: 9,
        possibleDrops: ['worm_hide', 'large_gem', 'bone_dust'],
        dropRates: { uncommon: 0.35, rare: 0.2, epic: 0.08 }
    },
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
    legendary: 0.01,  // 0.01% = 0.0001
    rare: 0.01,        // 0.5% = 0.005
    uncommon: 0.01,     // 1% = 0.01
    common: 1        // 5% = 0.05
};

// Helper function to roll for random adventure
function rollForAdventure(playerLevel) {
    const roll = Math.random();
    let cumulative = 0;

    for (const [rarity, chance] of Object.entries(ADVENTURE_RARITY_CHANCES)) {
        cumulative += chance;

        if (roll < cumulative) {
            const eligibleAdventures = Object.values(ADVENTURES)
                .filter(adv => adv.rarity === rarity);

            if (!eligibleAdventures.length) return null;

            return eligibleAdventures[
                Math.floor(Math.random() * eligibleAdventures.length)
            ];
        }
    }

    return null;
}


// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ADVENTURES, ADVENTURE_ENEMIES, rollForAdventure };
}
