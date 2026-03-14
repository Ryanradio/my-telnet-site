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
        rarity: 'legendary',
        minLevel: 1,
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
                        text: 'A trap! Poison darts shoot out, but you dodge most of them.',
                        rewards: { gold: 3000, damage: 20 }
                    },
                    {
                        weight: 20,
                        text: 'Jackpot! The chest contains legendary equipment!',
                        rewards: { gold: 2000, items: ['dragon_kin_blade', 'dragon_scale_cloak'] }
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
        minLevel: 1,
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
                        text: 'You decide it\'s not worth the risk and continue on your journey.',
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
        minLevel: 1,
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
                                        text: 'You decide the lights aren\'t worth the risk and move on.',
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
        rarity: 'rare',
        minLevel: 5,
        description: 'A hooded figure beckons from the shadows...',
        intro: 'A cloaked merchant appears before you, their cart filled with strange glowing items. "I deal in rare goods," they whisper.',

        choices: [
            {
                text: 'Buy a random item (1000g)',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The merchant hands you a powerful weapon!',
                        rewards: { gold: -1000, items: ['dragon_kin_blade'] }
                    },
                    {
                        weight: 30,
                        text: 'You receive a bag of rare potions!',
                        rewards: { gold: -1000, items: ['mystery_potion', 'mystery_potion', 'mystery_potion'] }
                    },
                    {
                        weight: 20,
                        text: 'The merchant gives you a cursed item! It drains your health but grants power.',
                        rewards: { gold: -1000, items: ['cursed_blade'], damage: 50 }
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
                        rewards: { xp: 5000, items: ['ancient_treasure_map'] }
                    },
                    {
                        weight: 30,
                        text: 'They teach you a secret technique!',
                        rewards: { xp: 3000, items: ['ancient_tactics_scroll'] }
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
                        rewards: { gold: 2000, items: ['dragon_scale_cloak'], xp: -500 }
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
        rarity: 'uncommon',
        minLevel: 3,
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
        rarity: 'rare',
        minLevel: 10,
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
                        rewards: { xp: 8000, items: ['ancient_tactics_scroll'] }
                    },
                    {
                        weight: 15,
                        text: 'You appear in a bizarre marketplace. A merchant sells you legendary items cheap!',
                        rewards: { items: ['ancient_dragon_slayer', 'ancient_dragonscale_armor'], gold: -2000 }
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
                        rewards: { xp: 6000, items: ['temporal_shard'] }
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
    // NEW ADVENTURES — LEVELS 1-6 (7 adventures)
    // ═══════════════════════════════════════════════════════════════

    // ── 1. THE WOUNDED TRAVELER ──────────────────────────────────────
    wounded_traveler: {
        id: 'wounded_traveler',
        name: 'Wounded Traveler',
        rarity: 'common',
        minLevel: 1,
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
                                        rewards: { gold: -50, xp: 350, gold_bonus: 800, items: ['treasure_map'] }
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
                                        rewards: { gold: 400, xp: 150, items: ['survivor_journal'] }
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
        minLevel: 1,
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
        minLevel: 1,
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
        minLevel: 1,
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
                        rewards: { gold: 700, xp: 350, items: ['treasure_map'] }
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
        minLevel: 5,
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
                        rewards: { items: ['dragon_kin_blade'], xp: 300 }
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
        minLevel: 3,
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
        minLevel: 5,
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
    // NEW ADVENTURES — LEVELS 7-10 (3 adventures)
    // ═══════════════════════════════════════════════════════════════

    // ── 8. THE ALCHEMY DISASTER ─────────────────────────────────────
    alchemy_disaster: {
        id: 'alchemy_disaster',
        name: 'The Alchemy Disaster',
        rarity: 'uncommon',
        minLevel: 7,
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
        minLevel: 8,
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
        minLevel: 7,
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
        rarity: 'uncommon',
        minLevel: 10,
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
    },

    // ═══════════════════════════════════════════════════════════════
    // CALAMITY DUNGEON ADVENTURES — SET 1
    // Theme: The Calamity Dragon awakens, seal breaking, world tremors
    // ═══════════════════════════════════════════════════════════════

    // 1. TREMOR IN THE RUINS
    tremor_ruins: {
        id: 'tremor_ruins',
        name: 'Tremor in the Ruins',
        rarity: 'common',
        minLevel: 1,
        description: 'The ground shakes violently as ancient ruins crack open before you...',
        intro: 'A massive tremor splits the earth! Ancient ruins buried for centuries are revealed. You hear whispers in a dead language... and something massive stirring below.',

        choices: [
            {
                text: 'Descend into the newly opened passage',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find an ancient armory! Weapons from the Dragon Wars era!',
                        rewards: { xp: 200, items: ['dragon_kin_blade'] }
                    },
                    {
                        weight: 35,
                        text: 'The passage leads to a chamber with piles of old gold and a strange glowing seal fragment!',
                        rewards: { gold: 300, xp: 150, items: ['seal_fragment'] }
                    },
                    {
                        weight: 25,
                        text: 'You awaken something that was meant to stay buried!',
                        combat: ['ancient_stone_guardian']
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Search the armory thoroughly',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'You find a hidden chest containing dragon-slaying ammunition!',
                                rewards: { items: ['dragon_slayer_arrows'], xp: 100 }
                            },
                            {
                                weight: 30,
                                text: 'A trapped chest explodes! But among the debris is valuable armor.',
                                rewards: { damage: 30, items: ['ancient_armor'] }
                            },
                            {
                                weight: 20,
                                text: 'The armory collapses! You barely escape with a small artifact.',
                                rewards: { damage: 50, items: ['cracked_relic'] }
                            }
                        ]
                    },
                    {
                        text: 'Touch the glowing seal fragment',
                        outcomes: [
                            {
                                weight: 40,
                                text: 'Visions flood your mind! You see the Calamity Dragon\'s prison weakening. Knowledge grants you power!',
                                rewards: { xp: 500 }
                            },
                            {
                                weight: 35,
                                text: 'The fragment burns your hand but bonds with you, granting protection against dragon fire!',
                                rewards: { damage: 40, items: ['dragon_scale_charm'] }
                            },
                            {
                                weight: 25,
                                text: 'The fragment is a trap! It summons a spectral dragon cultist to eliminate intruders!',
                                combat: ['spectral_cultist']
                            }
                        ]
                    },
                    {
                        text: 'Leave quickly before another tremor hits',
                        outcomes: [
                            {
                                weight: 100,
                                text: 'Smart choice. The ruins collapse behind you, but you escaped safely.',
                                rewards: { xp: 50 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Examine the ruins from a safe distance',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You spot ancient writing on the walls - a prophecy about the dragon\'s return!',
                        rewards: { xp: 150, items: ['ancient_prophecy_scroll'] }
                    },
                    {
                        weight: 30,
                        text: 'A survivor from a nearby village stumbles out, clutching a valuable map!',
                        rewards: { items: ['treasure_map'], xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'Nothing happens. The ruins settle. You move on.',
                        rewards: { xp: 25 }
                    }
                ]
            },
            {
                text: 'Run away from the unstable area',
                outcomes: [
                    {
                        weight: 100,
                        text: 'Wise. The entire ruin collapses moments later. You live to fight another day.',
                        rewards: { xp: 50 }
                    }
                ]
            }
        ]
    },

    // 2. THE CORRUPTED KNIGHT
    corrupted_knight: {
        id: 'corrupted_knight',
        name: 'The Corrupted Knight',
        rarity: 'uncommon',
        minLevel: 9,
        description: 'A knight in blackened armor kneels before a dragon shrine...',
        intro: 'You encounter a knight in once-noble armor, now blackened and smoking. They kneel before a crude shrine depicting a dragon. Red eyes turn toward you. "Join us... or perish."',

        choices: [
            {
                text: 'Try to reason with the knight',
                outcomes: [
                    {
                        weight: 30,
                        text: 'Your words break through! The knight weeps and thanks you, offering their cursed blade as tribute.',
                        rewards: { xp: 300, items: ['drake_tongue_blade'] }
                    },
                    {
                        weight: 40,
                        text: 'The knight hesitates... then attacks anyway! "It\'s too late for me!"',
                        combat: ['corrupted_knight_enemy']
                    },
                    {
                        weight: 30,
                        text: 'The knight laughs bitterly. "The dragon will save us all. You\'ll see." They vanish in black smoke.',
                        rewards: { xp: 100 }
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Accept the cursed blade',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'The blade is powerful but hungry. It will serve you... for now.',
                                rewards: { items: ['soul_drinker_sword'] }
                            },
                            {
                                weight: 30,
                                text: 'The curse tries to possess you! You fight it off but are weakened.',
                                rewards: { damage: 60, items: ['weakened_cursed_blade'] }
                            },
                            {
                                weight: 20,
                                text: 'The blade shatters the moment you touch it, releasing a trapped soul who blesses you!',
                                rewards: { xp: 400 }
                            }
                        ]
                    },
                    {
                        text: 'Destroy the dragon shrine',
                        outcomes: [
                            {
                                weight: 60,
                                text: 'The shrine explodes in dark energy! A dragon cultist appears to defend it!',
                                combat: ['enraged_cultist']
                            },
                            {
                                weight: 40,
                                text: 'The shrine crumbles peacefully. You feel the world become slightly safer.',
                                rewards: { xp: 200 }
                            }
                        ]
                    },
                    {
                        text: 'Investigate the knight\'s belongings',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'You find a letter to their family, and some gold. You take the gold to deliver to them.',
                                rewards: { gold: 200, xp: 100 }
                            },
                            {
                                weight: 30,
                                text: 'A hidden journal details dragon cult activities! This information is valuable!',
                                rewards: { xp: 350, items: ['cult_intelligence'] }
                            },
                            {
                                weight: 20,
                                text: 'The belongings are trapped! Dark magic burns you!',
                                rewards: { damage: 80 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Attack immediately',
                outcomes: [
                    {
                        weight: 100,
                        text: 'The corrupted knight rises to meet your challenge!',
                        combat: ['corrupted_knight_enemy']
                    }
                ]
            },
            {
                text: 'Sneak away quietly',
                outcomes: [
                    {
                        weight: 70,
                        text: 'You slip away unnoticed. Discretion is sometimes the better part of valor.',
                        rewards: { xp: 50 }
                    },
                    {
                        weight: 30,
                        text: 'The knight senses you! "COWARD!" They charge!',
                        combat: ['corrupted_knight_enemy']
                    }
                ]
            }
        ]
    },

    // 3. THE PROPHETIC HERMIT
    prophetic_hermit: {
        id: 'prophetic_hermit',
        name: 'The Prophetic Hermit',
        rarity: 'uncommon',
        minLevel: 1,
        description: 'A wild-eyed hermit blocks your path, speaking in riddles...',
        intro: 'An old hermit with crazed eyes grabs your arm. "The scaled tyrant wakes! The seal cracks! Only the worthy may stop what comes! Prove yourself... or flee while you still can!"',

        choices: [
            {
                text: 'Ask about the dragon',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The hermit\'s eyes clear. They share ancient knowledge of the dragon\'s weakness!',
                        rewards: { xp: 400 }
                    },
                    {
                        weight: 35,
                        text: 'The hermit rambles about "scales of fire, heart of ice, three seals, two keys..." Cryptic, but you learn something.',
                        rewards: { xp: 250 }
                    },
                    {
                        weight: 25,
                        text: 'The hermit cackles. "You want knowledge? Take it!" They force a vision into your mind!',
                        rewards: { damage: 40, xp: 500 }
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Study the lore scroll carefully',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'You learn the dragon\'s true name and a powerful spell to harm it!',
                                rewards: { xp: 300, items: ['dragon_weakness_note'] }
                            },
                            {
                                weight: 30,
                                text: 'The scroll contains warnings of the cult\'s rituals. Knowledge is power!',
                                rewards: { xp: 200, items: ['cult_intelligence'] }
                            },
                            {
                                weight: 20,
                                text: 'The scroll is cursed! Reading it summons a trial guardian!',
                                combat: ['trial_guardian']
                            }
                        ]
                    },
                    {
                        text: 'Meditate on the cryptic message',
                        outcomes: [
                            {
                                weight: 60,
                                text: 'Understanding dawns! You gain insight into the dragon\'s prison mechanics.',
                                rewards: { xp: 350 }
                            },
                            {
                                weight: 40,
                                text: 'Your meditation is interrupted by a sudden tremor. The dragon stirs...',
                                rewards: { xp: 150 }
                            }
                        ]
                    },
                    {
                        text: 'Embrace the prophetic vision',
                        outcomes: [
                            {
                                weight: 40,
                                text: 'You see the future! The dragon rises in flames... but you also see how to stop it!',
                                rewards: { xp: 600 }
                            },
                            {
                                weight: 35,
                                text: 'The vision is overwhelming! You see death, fire, the end of all things... but survive.',
                                rewards: { damage: 70, xp: 400 }
                            },
                            {
                                weight: 25,
                                text: 'You see yourself standing victorious over the dragon\'s corpse. Confidence surges through you!',
                                rewards: { xp: 500 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Offer the hermit food/gold',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The hermit weeps with gratitude and blesses you with protection magic!',
                        rewards: { gold: -100, xp: 200 }
                    },
                    {
                        weight: 30,
                        text: 'The hermit reveals they were testing you! They give you a powerful charm!',
                        rewards: { gold: -50, items: ['dragon_scale_charm'], xp: 250 }
                    },
                    {
                        weight: 20,
                        text: 'The hermit refuses. "Keep your gold. You\'ll need it." They vanish.',
                        rewards: { xp: 100 }
                    }
                ]
            },
            {
                text: 'Dismiss them as mad and walk away',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The hermit shouts after you: "Fool! You\'ll see! You\'ll ALL see!" Nothing happens.',
                        rewards: { xp: 25 }
                    },
                    {
                        weight: 30,
                        text: 'As you walk away, you hear them whisper secrets you weren\'t meant to hear...',
                        rewards: { xp: 150 }
                    },
                    {
                        weight: 20,
                        text: 'The hermit curses you for your arrogance! Bad luck follows!',
                        rewards: { xp: -100 }
                    }
                ]
            }
        ]
    },

    // 4. DRAGON CULT RITUAL
    cult_ritual: {
        id: 'cult_ritual',
        name: 'Dragon Cult Ritual',
        rarity: 'rare',
        minLevel: 17,
        description: 'Hooded figures chant around a fire, their ritual almost complete...',
        intro: 'You stumble upon a clearing where robed cultists circle a bonfire. They chant in draconic tongue: "Rise, O Scaled Tyrant! Break your chains! Bathe the world in cleansing flame!" A portal is forming above them...',

        choices: [
            {
                text: 'Disrupt the ritual immediately',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You shatter their focus! The portal collapses and cultists scatter in panic!',
                        rewards: { xp: 500, gold: 250 }
                    },
                    {
                        weight: 35,
                        text: 'You stop the ritual, but the cultists turn on you as one!',
                        combat: ['cult_fanatics']
                    },
                    {
                        weight: 25,
                        text: 'Too late! Something comes through the portal before it closes!',
                        combat: ['lesser_dragon_spawn']
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Search the cultists\' belongings',
                        outcomes: [
                            {
                                weight: 45,
                                text: 'You find ritual daggers, gold, and maps to other cult locations!',
                                rewards: { gold: 400, items: ['cult_map', 'ritual_dagger'], xp: 300 }
                            },
                            {
                                weight: 30,
                                text: 'A journal details their plans! The cult is larger than you thought...',
                                rewards: { xp: 400, items: ['cult_journal'] }
                            },
                            {
                                weight: 25,
                                text: 'You find a trapped seal fragment! It explodes!',
                                rewards: { damage: 90, items: ['damaged_seal_fragment'] }
                            }
                        ]
                    },
                    {
                        text: 'Destroy the ritual site completely',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'You consecrate the ground with holy water. This site can never be used again!',
                                rewards: { xp: 450 }
                            },
                            {
                                weight: 30,
                                text: 'As you destroy the shrine, residual magic empowers you!',
                                rewards: { xp: 350 }
                            },
                            {
                                weight: 20,
                                text: 'The destruction triggers a magical backlash!',
                                rewards: { damage: 100, xp: 200 }
                            }
                        ]
                    },
                    {
                        text: 'Examine the forming portal',
                        outcomes: [
                            {
                                weight: 40,
                                text: 'You glimpse the dragon\'s prison realm! Knowledge of its structure floods your mind!',
                                rewards: { xp: 600 }
                            },
                            {
                                weight: 35,
                                text: 'The portal shows you a vision of the dragon\'s awakening. Terror grips you.',
                                rewards: { xp: 300, damage: 50 }
                            },
                            {
                                weight: 25,
                                text: 'A dragon cultist\'s hand reaches through! You barely sever it before pulling away!',
                                rewards: { items: ['cultist_artifact'], damage: 70 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Pretend to be a new recruit',
                outcomes: [
                    {
                        weight: 40,
                        text: 'They believe you! The cult leader shares secret locations and weaknesses!',
                        rewards: { xp: 550, items: ['cult_secrets'] }
                    },
                    {
                        weight: 35,
                        text: 'They see through your disguise! "IMPOSTOR!" All cultists attack!',
                        combat: ['enraged_cultists']
                    },
                    {
                        weight: 25,
                        text: 'They welcome you but demand proof of loyalty... they want you to kill someone.',
                        rewards: { xp: 100 }
                    }
                ]
            },
            {
                text: 'Hide and observe',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You learn their plans! They\'re targeting the remaining seal points!',
                        rewards: { xp: 350 }
                    },
                    {
                        weight: 30,
                        text: 'You\'re discovered! "A spy! Kill them!"',
                        combat: ['cult_guards']
                    },
                    {
                        weight: 20,
                        text: 'The ritual completes. A dragon wyrmling emerges and flies away. This is bad...',
                        rewards: { xp: 200 }
                    }
                ]
            }
        ]
    },

    // 5. THE WANDERING MERCHANT (already updated above)
    
// ═══════════════════════════════════════════════════════════════
    // 5. THE WANDERING MERCHANT (Humor & Danger)
    // ═══════════════════════════════════════════════════════════════
    // Replace the current wandering_merchant section with this:

wandering_merchant: {
    id: 'wandering_merchant',
    name: 'The Wandering Merchant',
    rarity: 'common',
    minLevel: 1,
    description: 'A cheerful merchant waves from their cart, seemingly unconcerned about the world ending...',
    intro: 'A portly merchant sits by a colorful cart, munching on an apple. "Well met, friend! Business is BOOMING with all this dragon nonsense! Everyone needs supplies! Care to browse?"',
    
    choices: [
        {
            text: 'Browse their wares',
            outcomes: [
                {
                    weight: 40,
                    text: 'They have some surprisingly good gear! "Looted from... I mean, salvaged from abandoned towns!"',
                    nextChoices: [  // Add nested choice here
                        {
                            text: 'Take the dragon scale cloak (light, fire-resistant)',
                            outcomes: [
                                {
                                    weight: 100,
                                    text: 'You wrap the cloak around your shoulders. It feels warm and protective.',
                                    rewards: { gold: -150, items: ['dragon_scale_cloak'], xp: 50 }
                                }
                            ]
                        },
                        {
                            text: 'Take the dragonhide gloves (tough, dexterous)',
                            outcomes: [
                                {
                                    weight: 100,
                                    text: 'The gloves fit perfectly. Your grip feels stronger already.',
                                    rewards: { gold: -150, items: ['dragonhide_gloves'], xp: 50 }
                                }
                            ]
                        },
                        {
                            text: 'Ask what else they have',
                            outcomes: [
                                {
                                    weight: 60,
                                    text: 'They pull out a gleaming drake scale vest! "This one is special..."',
                                    rewards: { gold: -280, items: ['drake_scale_vest'], xp: 75 }
                                },
                                {
                                    weight: 40,
                                    text: '"Just this old thing." They hand you a mysterious potion.',
                                    rewards: { gold: -50, items: ['mystery_potion'], xp: 25 }
                                }
                            ]
                        }
                    ]
                },
                {
                    weight: 35,
                    text: 'Mostly junk, but one item catches your eye...',
                    rewards: { gold: -80, items: ['mystery_potion'], xp: 30 }
                },
                {
                    weight: 25,
                    text: '"This here\'s a genuine DRAGON SCALE!" (It\'s painted wood. You paid 200 gold.)',
                    rewards: { gold: -200, items: ['painted_scale'], xp: 10 }
                }
            ]
        },
        {
            text: 'Warn them about the danger',
            outcomes: [
                {
                    weight: 50,
                    text: 'They laugh. "Danger? Friend, I survived the Goblin Wars! I\'ll be fine!" They give you a free health potion for caring.',
                    rewards: { items: ['health_potion'], xp: 100 }
                },
                {
                    weight: 30,
                    text: 'Their face goes pale. "The dragon? It\'s... real?" They pack up immediately, leaving goods behind!',
                    rewards: { items: ['dragon_scale_cloak', 'health_potion'], xp: 150 }
                },
                {
                    weight: 20,
                    text: '"I KNEW IT! Here, take this!" They give you a map to a safe haven!',
                    rewards: { items: ['safe_haven_map'], xp: 200 }
                }
            ]
        },
        {
            text: 'Keep walking',
            outcomes: [
                {
                    weight: 100,
                    text: 'The merchant shrugs. "Your loss! Come back anytime!"',
                    rewards: { xp: 25 }
                }
            ]
        }
    ]
},




    // 6. SEALED TEMPLE AWAKENING
    sealed_temple: {
        id: 'sealed_temple',
        name: 'Sealed Temple Awakening',
        rarity: 'rare',
        minLevel: 9,
        description: 'An ancient temple\'s seal shatters as you approach...',
        intro: 'A massive stone temple looms before you, covered in glowing seals. As you watch, the seals crack and shatter! The doors grind open on their own, revealing darkness within. A voice whispers: "Finally... free..."',

        choices: [
            {
                text: 'Enter the temple',
                outcomes: [
                    {
                        weight: 35,
                        text: 'Inside, you find ancient treasures and a warning: "The dragon\'s lieutenant was sealed here."',
                        rewards: { gold: 500, xp: 400, items: ['ancient_treasure'] }
                    },
                    {
                        weight: 40,
                        text: 'A monstrous guardian, sealed for a thousand years, awakens and attacks!',
                        combat: ['ancient_temple_guardian']
                    },
                    {
                        weight: 25,
                        text: 'You find a priest, somehow still alive after 1000 years! They beg for help stopping the dragon!',
                        rewards: { xp: 450 }
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Search for the lieutenant\'s prison',
                        outcomes: [
                            {
                                weight: 40,
                                text: 'You find the prison... empty. Claw marks show it broke free days ago.',
                                rewards: { xp: 350 }
                            },
                            {
                                weight: 35,
                                text: 'You find it! The lieutenant is still trapped, but the seal is weakening!',
                                combat: ['weakened_dragon_lieutenant']
                            },
                            {
                                weight: 25,
                                text: 'The prison contains only bones and a powerful artifact the lieutenant left behind!',
                                rewards: { items: ['lieutenant_artifact'], xp: 400 }
                            }
                        ]
                    },
                    {
                        text: 'Help the ancient priest',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'The priest teaches you an ancient sealing ritual! This could help against the dragon!',
                                rewards: { xp: 500 }
                            },
                            {
                                weight: 30,
                                text: 'The priest is actually possessed! "FOOLISH MORTAL!" They transform!',
                                combat: ['possessed_priest']
                            },
                            {
                                weight: 20,
                                text: 'The priest dies in your arms, but not before revealing a crucial secret!',
                                rewards: { xp: 450, items: ['priest_final_message'] }
                            }
                        ]
                    },
                    {
                        text: 'Attempt to reseal the temple',
                        outcomes: [
                            {
                                weight: 45,
                                text: 'You succeed! The temple seals itself again. Whatever was here can\'t escape now.',
                                rewards: { xp: 600 }
                            },
                            {
                                weight: 35,
                                text: 'You partially succeed, but the effort drains you significantly.',
                                rewards: { xp: 400, damage: 80 }
                            },
                            {
                                weight: 20,
                                text: 'You fail! The seal energy backlashes, and something escapes!',
                                combat: ['temple_horror'],
                                rewards: { damage: 100 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Try to reseal it from outside',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You manage to slow the unsealing! This buys the world precious time.',
                        rewards: { xp: 350 }
                    },
                    {
                        weight: 35,
                        text: 'It\'s beyond your power. The seals are too damaged.',
                        rewards: { xp: 150 }
                    },
                    {
                        weight: 25,
                        text: 'Your attempt triggers a defense mechanism! Guardian statues animate!',
                        combat: ['stone_guardians']
                    }
                ]
            },
            {
                text: 'Run away and report this',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You flee and warn the nearest town. They\'re grateful for the warning!',
                        rewards: { xp: 200, gold: 150 }
                    },
                    {
                        weight: 40,
                        text: 'As you run, something emerges from the temple and pursues you!',
                        combat: ['temple_spawn']
                    }
                ]
            }
        ]
    },

    // 7. THE DRAGON EGG
    dragon_egg: {
        id: 'dragon_egg',
        name: 'The Dragon Egg',
        rarity: 'rare',
        minLevel: 9,
        description: 'You discover a massive egg, warm to the touch and glowing faintly...',
        intro: 'Hidden in a cave, you find an enormous egg, easily the size of a barrel. It pulses with inner fire. Dragon cultists were clearly guarding it before you killed them. What do you do?',

        choices: [
            {
                text: 'Destroy the egg',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You shatter it. The unborn wyrmling dies. You\'ve prevented one future threat.',
                        rewards: { xp: 500, items: ['dragon_egg_fragment'] }
                    },
                    {
                        weight: 35,
                        text: 'It explodes in flames! But from the ashes, you salvage valuable dragon materials!',
                        rewards: { damage: 90, items: ['dragon_scales', 'dragon_essence'], xp: 400 }
                    },
                    {
                        weight: 25,
                        text: 'The egg hatches prematurely! The wyrmling attacks in self-defense!',
                        combat: ['wyrmling']
                    }
                ]
            },
            {
                text: 'Take the egg',
                outcomes: [
                    {
                        weight: 35,
                        text: 'You carefully transport it. Dragon eggs are worth a FORTUNE to collectors!',
                        rewards: { items: ['dragon_egg'], xp: 300 }
                    },
                    {
                        weight: 40,
                        text: 'It\'s heavier than you thought! Hauling it exhausts you, but you manage.',
                        rewards: { items: ['dragon_egg'], damage: 40, xp: 250 }
                    },
                    {
                        weight: 25,
                        text: 'The egg\'s parent returns! An ADULT DRAGON descends in fury!',
                        combat: ['adult_dragon']
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Sell the egg to a collector',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'A wealthy noble pays a king\'s ransom for it!',
                                rewards: { gold: 2000, xp: 300 }
                            },
                            {
                                weight: 30,
                                text: 'The collector is actually a dragon cultist! They steal it and attack!',
                                combat: ['cultist_thief']
                            },
                            {
                                weight: 20,
                                text: 'The collector pays you, then reveals they plan to raise it to fight the Calamity Dragon!',
                                rewards: { gold: 1500, xp: 400 }
                            }
                        ]
                    },
                    {
                        text: 'Try to hatch and raise it yourself',
                        outcomes: [
                            {
                                weight: 40,
                                text: 'It hatches! The wyrmling imprints on you! You now have a dragon companion! (This could be VERY useful...)',
                                rewards: { xp: 800 }
                            },
                            {
                                weight: 35,
                                text: 'It hatches but is wild and uncontrollable! It flies away, but not before burning you!',
                                rewards: { damage: 120, xp: 300 }
                            },
                            {
                                weight: 25,
                                text: 'The egg dies before hatching. You failed. At least you tried.',
                                rewards: { xp: 100 }
                            }
                        ]
                    },
                    {
                        text: 'Donate it to scholars',
                        outcomes: [
                            {
                                weight: 60,
                                text: 'Scholars study it and learn crucial weaknesses about dragons! They reward you generously!',
                                rewards: { gold: 800, xp: 600, items: ['dragon_research_notes'] }
                            },
                            {
                                weight: 40,
                                text: 'The scholars accidentally hatch it during study! Chaos ensues!',
                                combat: ['escaped_wyrmling']
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Leave it alone',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You walk away. Nature will take its course.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 30,
                        text: 'As you leave, you hear it crack. The wyrmling hatches and flies away. One more dragon in the world...',
                        rewards: { xp: 150 }
                    },
                    {
                        weight: 20,
                        text: 'Dragon cultists return and recover the egg. You overhear their plans to use it in a ritual!',
                        rewards: { xp: 200 }
                    }
                ]
            }
        ]
    },

    // 8. THE CURSED TREASURE HOARD
    cursed_hoard: {
        id: 'cursed_hoard',
        name: 'The Cursed Treasure Hoard',
        rarity: 'uncommon',
        minLevel: 9,
        description: 'You discover a cave filled with gold... but something feels wrong...',
        intro: 'A cave entrance yawns before you. Inside, you see MOUNTAINS of gold, weapons, and jewels! But the air feels heavy with malice. Skeletons in armor litter the floor. All died reaching for the treasure...',

        choices: [
            {
                text: 'Take treasure carefully',
                outcomes: [
                    {
                        weight: 35,
                        text: 'You successfully avoid the curse triggers! You\'re rich!',
                        rewards: { gold: 800, items: ['cursed_treasure'], xp: 300 }
                    },
                    {
                        weight: 40,
                        text: 'A trap activates! Poisoned darts pepper you, but you escape with some gold!',
                        rewards: { damage: 80, gold: 400, xp: 200 }
                    },
                    {
                        weight: 25,
                        text: 'The treasure is guarded by a dragon-cursed guardian!',
                        combat: ['treasure_guardian']
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Get the treasure examined',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'A priest removes the curse! The treasure is yours!',
                                rewards: { gold: 600, xp: 250 }
                            },
                            {
                                weight: 30,
                                text: 'The curse is too powerful! The priest can only weaken it.',
                                rewards: { gold: 300, xp: 200 }
                            },
                            {
                                weight: 20,
                                text: 'The priest tries but the curse transfers to THEM! They attack you, possessed!',
                                combat: ['possessed_priest']
                            }
                        ]
                    },
                    {
                        text: 'Keep the cursed treasure',
                        outcomes: [
                            {
                                weight: 40,
                                text: 'The curse brings bad luck, but the gold is worth it... right?',
                                rewards: { gold: 1000 }
                            },
                            {
                                weight: 35,
                                text: 'The curse manifests as nightmares and visions of dragons!',
                                rewards: { gold: 800, damage: 60, xp: 300 }
                            },
                            {
                                weight: 25,
                                text: 'The curse summons the original owner - a dragon wraith!',
                                combat: ['dragon_wraith']
                            }
                        ]
                    },
                    {
                        text: 'Donate cursed treasure to temple',
                        outcomes: [
                            {
                                weight: 60,
                                text: 'The temple purifies it and returns half to you as a reward!',
                                rewards: { gold: 500, xp: 400 }
                            },
                            {
                                weight: 40,
                                text: 'The temple keeps it all but blesses you in return!',
                                rewards: { xp: 500 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Investigate the skeletons',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find a journal warning about a specific curse trigger! You can now loot safely!',
                        rewards: { gold: 700, xp: 350 }
                    },
                    {
                        weight: 35,
                        text: 'One skeleton rises! "Leave... the hoard... ALONE!"',
                        combat: ['skeletal_guardian']
                    },
                    {
                        weight: 25,
                        text: 'You find a warning carved in bone: "Dragon\'s hoard. Dragon\'s curse. Dragon\'s revenge."',
                        rewards: { xp: 200 }
                    }
                ]
            },
            {
                text: 'Leave immediately',
                outcomes: [
                    {
                        weight: 70,
                        text: 'Wise choice. Greed has killed many adventurers. You walk away intact.',
                        rewards: { xp: 150 }
                    },
                    {
                        weight: 30,
                        text: 'As you leave, you notice a single uncursed gold coin near the entrance. You take it.',
                        rewards: { gold: 1, xp: 100 }
                    }
                ]
            }
        ]
    },

    // 9. THE LAST DRAGONSLAYER
    last_dragonslayer: {
        id: 'last_dragonslayer',
        name: 'The Last Dragonslayer',
        rarity: 'rare',
        minLevel: 17,
        description: 'An ancient warrior sits by a campfire, their armor scorched and melted...',
        intro: 'You find a grizzled warrior, armor burnt and scarred. Their sword glows faintly with dragon-slaying magic. "I was there," they rasp. "A thousand years ago. When we sealed the Calamity. I was the only survivor. And now... the seal breaks."',

        choices: [
            {
                text: 'Ask them to train you',
                outcomes: [
                    {
                        weight: 40,
                        text: '"You have potential." They teach you the ancient dragonslayer techniques!',
                        rewards: { xp: 700 }
                    },
                    {
                        weight: 35,
                        text: '"I\'m too old for this. But take my sword. You\'ll need it more than I do."',
                        rewards: { items: ['ancient_dragon_slayer'], xp: 500 }
                    },
                    {
                        weight: 25,
                        text: '"I\'ll test you first." They attack! If you survive, you\'re worthy!',
                        combat: ['dragonslayer_veteran']
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Master the dragonslayer techniques',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'You train for days. Your attacks will now deal massive damage to dragons!',
                                rewards: { xp: 800 }
                            },
                            {
                                weight: 30,
                                text: 'The training is brutal. You learn, but at a cost.',
                                rewards: { xp: 600, damage: 100 }
                            },
                            {
                                weight: 20,
                                text: 'You fail the training. The dragonslayer is disappointed but gives you a consolation prize.',
                                rewards: { items: ['training_manual'], xp: 300 }
                            }
                        ]
                    },
                    {
                        text: 'Ask about the original battle',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'They describe the Calamity\'s weaknesses! This knowledge is invaluable!',
                                rewards: { xp: 600, items: ['calamity_weakness_scroll'] }
                            },
                            {
                                weight: 30,
                                text: '"We lost everything. Everyone I loved... gone." They weep. You comfort them.',
                                rewards: { xp: 400 }
                            },
                            {
                                weight: 20,
                                text: '"The sealing ritual... I remember it!" They teach you the spell!',
                                rewards: { xp: 700 }
                            }
                        ]
                    },
                    {
                        text: 'Convince them to fight alongside you',
                        outcomes: [
                            {
                                weight: 40,
                                text: '"One more battle. Why not?" They agree to join when the time comes!',
                                rewards: { xp: 500 }
                            },
                            {
                                weight: 35,
                                text: '"I\'m too old. I\'d only slow you down. But take my armor!"',
                                rewards: { items: ['dragonslayer_armor'], xp: 400 }
                            },
                            {
                                weight: 25,
                                text: 'They laugh bitterly. "I died that day, kid. I\'m just a ghost." They fade away.',
                                rewards: { xp: 300 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Ask for their weapon',
                outcomes: [
                    {
                        weight: 40,
                        text: '"Earn it." They toss you a training sword. "Beat me."',
                        combat: ['dragonslayer_duel']
                    },
                    {
                        weight: 35,
                        text: '"You\'re bold. I like that." They give you the sword.',
                        rewards: { items: ['scale_piercer'], xp: 400 }
                    },
                    {
                        weight: 25,
                        text: '"This blade is cursed with the dragon\'s dying rage. You sure you want it?"',
                        rewards: { items: ['cursed_dragonslayer_blade'], xp: 300 }
                    }
                ]
            },
            {
                text: 'Offer to help them',
                outcomes: [
                    {
                        weight: 50,
                        text: 'They smile. "Thank you. I just need... rest." They close their eyes and pass peacefully. They leave you their belongings.',
                        rewards: { gold: 400, items: ['dragonslayer_legacy'], xp: 450 }
                    },
                    {
                        weight: 30,
                        text: '"Help? I need you to finish what we started." They give you a map to the dragon\'s lair!',
                        rewards: { items: ['dragon_lair_map'], xp: 500 }
                    },
                    {
                        weight: 20,
                        text: '"There is no help for me. I\'m bound to this world until the dragon falls. End my curse."',
                        combat: ['cursed_dragonslayer']
                    }
                ]
            }
        ]
    },

    // 10. THE FINAL WARNING
    final_warning: {
        id: 'final_warning',
        name: 'The Final Warning',
        rarity: 'uncommon',
        minLevel: 17,
        description: 'The sky turns blood red. A voice echoes across the land...',
        intro: 'The earth trembles violently. The sky darkens to crimson. A booming voice speaks directly into your mind: "MORTALS. THE TIME OF RECKONING APPROACHES. I AM AWAKENING. FLEE... OR STAND AND BE CONSUMED." The Calamity Dragon has spoken.',

        choices: [
            {
                text: 'Shout defiance at the sky',
                outcomes: [
                    {
                        weight: 40,
                        text: '"I WILL STOP YOU!" Your courage resonates! Divine forces take notice!',
                        rewards: { xp: 600 }
                    },
                    {
                        weight: 35,
                        text: 'Laughter echoes. "BRAVE... BUT FOOLISH." Lightning strikes near you!',
                        rewards: { damage: 90, xp: 400 }
                    },
                    {
                        weight: 25,
                        text: 'The dragon\'s presence focuses on YOU. "I WILL REMEMBER YOUR NAME, MORTAL."',
                        rewards: { xp: 500 }
                    }
                ],
                nestedChoices: [
                    {
                        text: 'Rally others to your cause',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'Your courage inspires nearby villagers! They pledge to help fight the dragon!',
                                rewards: { xp: 500 }
                            },
                            {
                                weight: 30,
                                text: 'Some join you, but others flee in terror.',
                                rewards: { xp: 350 }
                            },
                            {
                                weight: 20,
                                text: 'A dragon cultist in the crowd reveals themselves and attacks!',
                                combat: ['hidden_cultist']
                            }
                        ]
                    },
                    {
                        text: 'Seek out legendary weapons',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'An old sage tells you of a legendary sword hidden in a sealed vault!',
                                rewards: { xp: 400, items: ['vault_key'] }
                            },
                            {
                                weight: 30,
                                text: 'You find rumors of the "Dragon\'s Bane" - an arrow that can pierce dragon scales!',
                                rewards: { xp: 450, items: ['map_to_bane'] }
                            },
                            {
                                weight: 20,
                                text: 'The weapons are guarded by a trial. You must prove yourself!',
                                combat: ['trial_guardian']
                            }
                        ]
                    },
                    {
                        text: 'Study ancient prophecies',
                        outcomes: [
                            {
                                weight: 50,
                                text: 'The prophecy reveals the EXACT moment when the dragon will be most vulnerable!',
                                rewards: { xp: 700, items: ['prophecy_scroll'] }
                            },
                            {
                                weight: 30,
                                text: 'The prophecy is dark: "Only through great sacrifice may the scaled tyrant fall."',
                                rewards: { xp: 500 }
                            },
                            {
                                weight: 20,
                                text: 'The prophecy speaks of YOU. "The unlikely hero will stand alone against the end."',
                                rewards: { xp: 600 }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Seek shelter and prepare',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You fortify your position and gather supplies. You\'ll be ready.',
                        rewards: { xp: 300, items: ['survival_supplies'] }
                    },
                    {
                        weight: 35,
                        text: 'Others join you in the shelter. Together, you plan a defense!',
                        rewards: { xp: 400 }
                    },
                    {
                        weight: 25,
                        text: 'The shelter collapses in a tremor! You barely escape!',
                        rewards: { damage: 80, xp: 200 }
                    }
                ]
            },
            {
                text: 'Pray to the gods for help',
                outcomes: [
                    {
                        weight: 40,
                        text: 'A divine voice answers: "We grant you our blessing, champion. You will need it."',
                        rewards: { xp: 500 }
                    },
                    {
                        weight: 35,
                        text: 'Silence. The gods cannot interfere. You are on your own.',
                        rewards: { xp: 200 }
                    },
                    {
                        weight: 25,
                        text: 'A god responds: "We sealed it once. You must seal it again. Here - take this." A holy relic materializes!',
                        rewards: { items: ['holy_sealing_relic'], xp: 600 }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CALAMITY DUNGEON ADVENTURES — SET 2
    // EARLY GAME ADVENTURES (Levels 1-8)
    // ═══════════════════════════════════════════════════════════════

    // 1. FRIGHTENED VILLAGER
    frightened_villager: {
        id: 'frightened_villager',
        name: 'Frightened Villager',
        rarity: 'common',
        minLevel: 1,
        description: 'A terrified villager runs toward you, screaming about "fire in the sky"...',
        intro: 'A farmer crashes into you, eyes wild with panic. "I saw it! In the mountains! A red glow! And... and WINGS! The old stories are true! The dragon is real!"',

        choices: [
            {
                text: 'Calm them down and get details',
                outcomes: [
                    {
                        weight: 50,
                        text: 'They describe a location where dragon cultists are gathering! Useful intel!',
                        rewards: { xp: 100, items: ['rough_map'] }
                    },
                    {
                        weight: 30,
                        text: 'They\'re too hysterical to make sense. You learn nothing useful.',
                        rewards: { xp: 25 }
                    },
                    {
                        weight: 20,
                        text: 'As they describe what they saw, cultists emerge from hiding! "SILENCE THE WITNESS!"',
                        combat: ['cultist_scouts_easy']
                    }
                ]
            },
            {
                text: 'Offer to investigate their claim',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find scorch marks and tracks! Something big was here recently!',
                        rewards: { xp: 150, gold: 80 }
                    },
                    {
                        weight: 35,
                        text: 'It was just a large bonfire from travelers. False alarm.',
                        rewards: { xp: 50 }
                    },
                    {
                        weight: 25,
                        text: 'You find a small wyrmling den! The babies attack to defend their nest!',
                        combat: ['wyrmling_babies_2']
                    }
                ]
            },
            {
                text: 'Dismiss them as crazy',
                outcomes: [
                    {
                        weight: 60,
                        text: 'They run off muttering. You continue on your way.',
                        rewards: { xp: 10 }
                    },
                    {
                        weight: 40,
                        text: 'Weeks later, their village burns. You ignored a real warning.',
                        rewards: { xp: 50 }
                    }
                ]
            }
        ]
    },

    // 2. MYSTERIOUS CAVE PAINTING
    mysterious_cave_painting: {
        id: 'mysterious_cave_painting',
        name: 'Mysterious Cave Painting',
        rarity: 'common',
        minLevel: 2,
        description: 'You discover ancient paintings depicting a massive dragon...',
        intro: 'In a shallow cave, you find wall paintings thousands of years old. They show a giant dragon destroying cities, then being sealed away by warriors. The final image shows the seal... cracking.',

        choices: [
            {
                text: 'Study the paintings carefully',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You decipher ancient symbols! They describe the sealing ritual!',
                        rewards: { xp: 150, items: ['ancient_knowledge_scroll'] }
                    },
                    {
                        weight: 30,
                        text: 'You learn the names of the original dragon slayers. History lesson!',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'The paintings are magical! Touching them triggers a vision that drains you!',
                        rewards: { damage: 30, xp: 120 }
                    }
                ]
            },
            {
                text: 'Copy the paintings to show others',
                outcomes: [
                    {
                        weight: 50,
                        text: 'Scholars pay you well for these copies! Valuable historical evidence!',
                        rewards: { gold: 150, xp: 100 }
                    },
                    {
                        weight: 30,
                        text: 'A cult spy steals your copies! They don\'t want this knowledge spreading!',
                        combat: ['cult_thief_easy']
                    },
                    {
                        weight: 20,
                        text: 'The copies are cursed! Anyone who looks at them has nightmares.',
                        rewards: { gold: 50 }
                    }
                ]
            },
            {
                text: 'Search the cave for treasure',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find old offerings left by ancient people! Gold and trinkets!',
                        rewards: { gold: 120, xp: 80 }
                    },
                    {
                        weight: 35,
                        text: 'You trigger a rock slide! You escape but are bruised.',
                        rewards: { damage: 40, gold: 50 }
                    },
                    {
                        weight: 25,
                        text: 'A cave bat swarm attacks! Not dangerous, just annoying.',
                        combat: ['bat_swarm']
                    }
                ]
            }
        ]
    },

    // 3. ABANDONED CAMP
    abandoned_camp: {
        id: 'abandoned_camp',
        name: 'Abandoned Camp',
        rarity: 'common',
        minLevel: 3,
        description: 'You find a hastily abandoned camp, food still warm on the fire...',
        intro: 'Tents flap in the wind. A cook pot bubbles over a fire. Belongings are scattered everywhere. Whatever made these people flee left in a HURRY. And recently.',

        choices: [
            {
                text: 'Search the camp for clues',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find a journal! "Day 12: We saw it flying overhead. It\'s real. We\'re leaving before it notices us."',
                        rewards: { xp: 120, items: ['survivor_journal'] }
                    },
                    {
                        weight: 35,
                        text: 'Scavengeable supplies! Food, rope, and some coins!',
                        rewards: { gold: 100, items: ['camping_supplies'] }
                    },
                    {
                        weight: 25,
                        text: 'You hear a noise! Survivors return and think YOU drove them off! They attack!',
                        combat: ['angry_campers']
                    }
                ]
            },
            {
                text: 'Follow the tracks away from camp',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find the campers hiding in a nearby cave! They\'re grateful and share intel!',
                        rewards: { xp: 150, items: ['dragon_sighting_report'] }
                    },
                    {
                        weight: 35,
                        text: 'The trail leads to a cliff edge. They jumped? Or were taken?',
                        rewards: { xp: 80 }
                    },
                    {
                        weight: 25,
                        text: 'The tracks lead into a monster den! You disturb the resident!',
                        combat: ['cave_troll']
                    }
                ]
            },
            {
                text: 'Take what you need and leave',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You loot 150 gold worth of supplies. Finders keepers.',
                        rewards: { gold: 150 }
                    },
                    {
                        weight: 40,
                        text: 'As you leave, you notice claw marks on a tree. Dragon territory.',
                        rewards: { gold: 100, xp: 100 }
                    }
                ]
            }
        ]
    },

    // 4. STRANGE MERCHANT CART
    strange_merchant_cart: {
        id: 'strange_merchant_cart',
        name: 'Strange Merchant Cart',
        rarity: 'common',
        minLevel: 2,
        description: 'An ornate cart sits unattended by the road, filled with exotic wares...',
        intro: 'A beautiful merchant cart is parked by the roadside. No merchant in sight. The cart is filled with strange items: glowing potions, weird trinkets, and a sign: "Take what you need. Pay what you can. -The Wanderer"',

        choices: [
            {
                text: 'Take something and leave payment',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You take a potion and leave fair payment. The cart glows briefly. A voice whispers: "Thank you."',
                        rewards: { gold: -50, items: ['mystery_potion'], xp: 80 }
                    },
                    {
                        weight: 30,
                        text: 'The item you take is enchanted! It bonds to you permanently! (Could be good or bad...)',
                        rewards: { gold: -50, items: ['bonded_trinket'] }
                    },
                    {
                        weight: 20,
                        text: 'Your honesty is rewarded! Extra items appear in the cart as a gift!',
                        rewards: { gold: -50, items: ['blessed_gear', 'health_potion'], xp: 150 }
                    }
                ]
            },
            {
                text: 'Take something without paying',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The cart vanishes in smoke! A voice booms: "THIEF!" You\'re cursed!',
                        rewards: { items: ['cursed_item'] }
                    },
                    {
                        weight: 35,
                        text: 'The items turn to dust in your hands. You get nothing.',
                        rewards: { xp: 25 }
                    },
                    {
                        weight: 25,
                        text: 'A guardian golem activates! "PAYMENT REQUIRED!"',
                        combat: ['merchant_golem']
                    }
                ]
            },
            {
                text: 'Leave it alone',
                outcomes: [
                    {
                        weight: 70,
                        text: 'You walk past. The cart\'s owner nods at you from the shadows, approving your restraint.',
                        rewards: { xp: 50 }
                    },
                    {
                        weight: 30,
                        text: 'A voice calls out: "Too cautious! Here - a gift for your honesty!" A potion appears!',
                        rewards: { items: ['merchant_gift'], xp: 100 }
                    }
                ]
            }
        ]
    },

    // 5. HELPFUL SPIRIT
    helpful_spirit: {
        id: 'helpful_spirit',
        name: 'Helpful Spirit',
        rarity: 'uncommon',
        minLevel: 4,
        description: 'A glowing spirit appears before you, smiling sadly...',
        intro: 'A translucent figure materializes - a young woman in ancient clothing. "Please... I\'ve waited so long. I died during the first Dragon War. I can help you... if you help me find peace."',

        choices: [
            {
                text: 'Ask how you can help her',
                outcomes: [
                    {
                        weight: 50,
                        text: 'She wants you to tell her family she loves them. You promise. She teaches you a protective spell!',
                        rewards: { xp: 200 }
                    },
                    {
                        weight: 30,
                        text: 'Her family is long dead. She weeps but thanks you for trying. She blesses you.',
                        rewards: { xp: 150 }
                    },
                    {
                        weight: 20,
                        text: 'She asks you to destroy a cursed item that bound her! It fights back!',
                        combat: ['cursed_artifact_guardian']
                    }
                ]
            },
            {
                text: 'Ask her about the Dragon War',
                outcomes: [
                    {
                        weight: 50,
                        text: 'She tells you secrets! "The dragon fears silver blessed by moonlight!" Crucial weakness!',
                        rewards: { xp: 250, items: ['dragon_weakness_note'] }
                    },
                    {
                        weight: 30,
                        text: 'Her memories are painful. She describes the horror... you learn much but it\'s disturbing.',
                        rewards: { xp: 180, damage: 20 }
                    },
                    {
                        weight: 20,
                        text: 'Reliving the memories is too painful! She screams and lashes out!',
                        combat: ['tormented_spirit']
                    }
                ]
            },
            {
                text: 'Banish the spirit (she could be evil)',
                outcomes: [
                    {
                        weight: 50,
                        text: 'She fades away sadly. "I only wanted to help..." You feel guilty.',
                        rewards: { xp: 50 }
                    },
                    {
                        weight: 30,
                        text: 'You were right! She WAS malevolent! She attacks before vanishing!',
                        rewards: { damage: 40, xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'Your banishment ritual works TOO well! It drains your life force!',
                        rewards: { damage: 60, xp: 80 }
                    }
                ]
            }
        ]
    },

    // 6. OLD BATTLEFIELD
    old_battlefield: {
        id: 'old_battlefield',
        name: 'Old Battlefield',
        rarity: 'common',
        minLevel: 3,
        description: 'You cross a field littered with ancient armor and weapons...',
        intro: 'Rusty swords and shattered shields dot the landscape. Skeletons in armor lie where they fell, a thousand years ago. This was a battlefield from the Dragon War. The air feels heavy with old death.',

        choices: [
            {
                text: 'Search for salvageable equipment',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find an ancient sword, still sharp! The metal is unusual - dragon-forged!',
                        rewards: { items: ['dragon_kin_blade'], xp: 150 }
                    },
                    {
                        weight: 35,
                        text: 'Most gear is rusted, but you salvage some valuable metal scraps!',
                        rewards: { gold: 120, xp: 80 }
                    },
                    {
                        weight: 25,
                        text: 'A cursed weapon! When you touch it, an undead warrior rises to reclaim it!',
                        combat: ['undead_warrior']
                    }
                ]
            },
            {
                text: 'Pay respects to the fallen',
                outcomes: [
                    {
                        weight: 50,
                        text: 'A ghostly warrior appears, salutes you, and leaves a blessing. "Thank you for remembering us."',
                        rewards: { xp: 180 }
                    },
                    {
                        weight: 30,
                        text: 'You feel a sense of peace. These soldiers died heroes.',
                        rewards: { xp: 120 }
                    },
                    {
                        weight: 20,
                        text: 'Your respect awakens the field! ALL the dead rise! "Join us in eternal battle!"',
                        combat: ['undead_legion_small']
                    }
                ]
            },
            {
                text: 'Leave quickly (this place feels wrong)',
                outcomes: [
                    {
                        weight: 70,
                        text: 'Smart. Battlefields can be dangerous. You move on safely.',
                        rewards: { xp: 40 }
                    },
                    {
                        weight: 30,
                        text: 'As you leave, you notice dragons circling overhead. They\'re drawn to death.',
                        rewards: { xp: 80 }
                    }
                ]
            }
        ]
    },

    // 7. LOST CHILD
    lost_child: {
        id: 'lost_child',
        name: 'Lost Child',
        rarity: 'common',
        minLevel: 1,
        description: 'A small child sits crying by the roadside...',
        intro: 'A young boy, no more than 8 years old, sobs alone. "I can\'t find my mommy! There was fire and screaming and we ran but I got lost! Please help me!"',

        choices: [
            {
                text: 'Help find his family',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You reunite him with his grateful mother! She gives you her family heirloom as thanks!',
                        rewards: { xp: 150, items: ['family_heirloom'] }
                    },
                    {
                        weight: 30,
                        text: 'You find his village... burned to the ground. His family didn\'t make it. You comfort him.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'You lead him home, but cultists ambush you! "The child saw too much!"',
                        combat: ['cultist_assassins_easy']
                    }
                ]
            },
            {
                text: 'Take him to the nearest town',
                outcomes: [
                    {
                        weight: 60,
                        text: 'The town guards thank you and take him in. You did a good deed.',
                        rewards: { xp: 120, gold: 80 }
                    },
                    {
                        weight: 40,
                        text: 'The boy turns out to be the mayor\'s son! You\'re rewarded handsomely!',
                        rewards: { xp: 180, gold: 200 }
                    }
                ]
            },
            {
                text: 'Give him supplies and directions',
                outcomes: [
                    {
                        weight: 50,
                        text: 'He thanks you and sets off. You hope he makes it.',
                        rewards: { gold: -30, xp: 80 }
                    },
                    {
                        weight: 30,
                        text: 'He\'s tougher than he looks. You meet him weeks later, safe and sound!',
                        rewards: { gold: -30, xp: 150 }
                    },
                    {
                        weight: 20,
                        text: 'You later hear he was taken by bandits. You feel guilty.',
                        rewards: { gold: -30, xp: 50 }
                    }
                ]
            }
        ]
    },

    // 8. FESTIVAL INTERRUPTED
    festival_interrupted: {
        id: 'festival_interrupted',
        name: 'Festival Interrupted',
        rarity: 'common',
        minLevel: 2,
        description: 'A village festival is in full swing when disaster strikes...',
        intro: 'Music, dancing, laughter! A harvest festival is underway. Then - a ROAR splits the sky. People scream and point upward. Something huge and winged circles overhead, blotting out the sun...',

        choices: [
            {
                text: 'Help evacuate villagers',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You save dozens of lives! The village elder promises they owe you a debt!',
                        rewards: { xp: 200, gold: 150 }
                    },
                    {
                        weight: 30,
                        text: 'You do your best, but some don\'t make it. The survivors thank you through tears.',
                        rewards: { xp: 150 }
                    },
                    {
                        weight: 20,
                        text: 'During evacuation, a panicked mob tramples you!',
                        rewards: { damage: 50, xp: 100 }
                    }
                ]
            },
            {
                text: 'Try to fight/distract the creature',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You\'re brave but it\'s too powerful! You wound it slightly before it flees!',
                        rewards: { xp: 180, damage: 60, items: ['dragon_blood_vial'] }
                    },
                    {
                        weight: 35,
                        text: 'Your attacks get its attention! It focuses on YOU! You barely survive!',
                        combat: ['young_wyvern']
                    },
                    {
                        weight: 25,
                        text: 'It ignores you entirely. You\'re not worth its attention. Humbling.',
                        rewards: { xp: 80 }
                    }
                ]
            },
            {
                text: 'Hide and observe',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You note its flight pattern and behavior. Valuable intelligence!',
                        rewards: { xp: 150, items: ['creature_behavior_notes'] }
                    },
                    {
                        weight: 30,
                        text: 'It snatches livestock and flies away. Not interested in people... yet.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'It spots YOU hiding! Those eyes lock onto yours!',
                        combat: ['territorial_wyvern']
                    }
                ]
            }
        ]
    },

    // 9. CURSED WELL
    cursed_well: {
        id: 'cursed_well',
        name: 'Cursed Well',
        rarity: 'uncommon',
        minLevel: 5,
        description: 'A village well has been poisoned by dark magic...',
        intro: 'The village well bubbles with black ooze. "It happened overnight!" the mayor cries. "Dragon cultists cursed it! Now our water is poison! Can you help?"',

        choices: [
            {
                text: 'Attempt to purify the well',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You cleanse it! The water runs clear! The village celebrates!',
                        rewards: { xp: 220, gold: 200 }
                    },
                    {
                        weight: 35,
                        text: 'Partial success! It\'s drinkable but still tastes foul. Better than nothing.',
                        rewards: { xp: 150, gold: 100 }
                    },
                    {
                        weight: 20,
                        text: 'The curse fights back! Dark magic burns you!',
                        rewards: { damage: 50, xp: 100 }
                    }
                ]
            },
            {
                text: 'Hunt down the cultists',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find them! Defeating them breaks the curse automatically!',
                        combat: ['cultist_curse_casters']
                    },
                    {
                        weight: 35,
                        text: 'You find their camp but they\'ve fled. You recover ritual notes!',
                        rewards: { xp: 180, items: ['curse_ritual_notes'] }
                    },
                    {
                        weight: 25,
                        text: 'The trail goes cold. The cultists are long gone.',
                        rewards: { xp: 80 }
                    }
                ]
            },
            {
                text: 'Help villagers find a new water source',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You locate a clean spring! Problem solved! The mayor pays you!',
                        rewards: { xp: 200, gold: 180 }
                    },
                    {
                        weight: 30,
                        text: 'The nearest water is miles away. This village might not survive.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: 'You find water... but it\'s guarded by territorial monsters!',
                        combat: ['water_elementals']
                    }
                ]
            }
        ]
    },

    // 10. ROOKIE CULTIST
    rookie_cultist: {
        id: 'rookie_cultist',
        name: 'Rookie Cultist',
        rarity: 'common',
        minLevel: 4,
        description: 'You catch a young cultist practicing their "evil laugh"...',
        intro: 'Behind a tree, a teenager in ill-fitting robes practices: "MWAHAHA! No wait... MWA-HA-HA-HA!" They spot you. "Oh no! A witness! Um... BEHOLD THE DRAGON\'S WRATH!" They fumble for a weapon.',

        choices: [
            {
                text: 'Talk them out of the cult',
                outcomes: [
                    {
                        weight: 50,
                        text: '"You\'re right. This IS stupid." They thank you and share cult secrets before running home!',
                        rewards: { xp: 180, items: ['cult_secrets_scroll'] }
                    },
                    {
                        weight: 30,
                        text: 'They\'re torn but ultimately scared of leaving. "They\'ll kill me if I quit!" They flee.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 20,
                        text: '"NEVER! I\'m devoted!" They attack! ...poorly.',
                        combat: ['incompetent_cultist']
                    }
                ]
            },
            {
                text: 'Scare them straight',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You describe what REAL dragons do to cultists. They\'re horrified and quit immediately!',
                        rewards: { xp: 160 }
                    },
                    {
                        weight: 30,
                        text: 'They cry and run away. Hopefully they learned their lesson.',
                        rewards: { xp: 120 }
                    },
                    {
                        weight: 20,
                        text: 'They panic and accidentally set off a signal flare! Real cultists arrive!',
                        combat: ['cultist_veterans']
                    }
                ]
            },
            {
                text: 'Rob them and leave',
                outcomes: [
                    {
                        weight: 60,
                        text: 'They have 80 gold and some cult documents. Easy pickings.',
                        rewards: { gold: 80, items: ['cult_pamphlet'] }
                    },
                    {
                        weight: 40,
                        text: 'They\'re broke. "I haven\'t gotten my first paycheck yet!"',
                        rewards: { gold: 10, xp: 30 }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MID GAME ADVENTURES (Levels 9-16)
    // ═══════════════════════════════════════════════════════════════

    // 11. DRAGON SCALE HUNTER
    dragon_scale_hunter: {
        id: 'dragon_scale_hunter',
        name: 'Dragon Scale Hunter',
        rarity: 'uncommon',
        minLevel: 9,
        description: 'A grizzled hunter offers you a partnership...',
        intro: 'An experienced hunter approaches. "You look capable. I track dragons for their scales - worth a fortune! I found a molting site. Help me harvest scales, 50-50 split?"',

        choices: [
            {
                text: 'Accept the partnership',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You collect valuable scales! The hunter splits fairly! Big payday!',
                        rewards: { gold: 800, items: ['dragon_scales_3'], xp: 400 }
                    },
                    {
                        weight: 35,
                        text: 'The dragon returns mid-harvest! You barely escape with a few scales!',
                        rewards: { gold: 300, items: ['dragon_scale'], damage: 80, xp: 350 }
                    },
                    {
                        weight: 20,
                        text: 'The hunter betrays you! "I\'ll take it ALL!" They attack!',
                        combat: ['treacherous_hunter']
                    }
                ]
            },
            {
                text: 'Demand 60-40 split (you take more risk)',
                outcomes: [
                    {
                        weight: 40,
                        text: 'They agree! "Fair enough." You get the better deal!',
                        rewards: { gold: 900, items: ['dragon_scales_3'], xp: 450 }
                    },
                    {
                        weight: 35,
                        text: 'They refuse and leave. "Greedy bastard." You lose the opportunity.',
                        rewards: { xp: 100 }
                    },
                    {
                        weight: 25,
                        text: '"Fine! But YOU go first then!" They push you into the dragon\'s den!',
                        combat: ['angry_dragon_adult']
                    }
                ]
            },
            {
                text: 'Report them to authorities (hunting dragons might wake the Calamity)',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The authorities are grateful. Dragon hunting is now illegal! Reward!',
                        rewards: { xp: 500, gold: 400 }
                    },
                    {
                        weight: 30,
                        text: '"Authorities? They\'re in on it!" The hunter is a cult agent! They attack!',
                        combat: ['cult_infiltrator']
                    },
                    {
                        weight: 20,
                        text: 'The authorities don\'t care. "Dragon scales pay well!" They laugh at you.',
                        rewards: { xp: 150 }
                    }
                ]
            }
        ]
    },

    // 12. CORRUPTED FOREST
    corrupted_forest: {
        id: 'corrupted_forest',
        name: 'Corrupted Forest',
        rarity: 'uncommon',
        minLevel: 10,
        description: 'The forest ahead is dying, trees blackened and twisted...',
        intro: 'What was once a lush forest is now a nightmare. Trees are charred black, animals flee, and the ground smokes. Dragon magic is corrupting this place. At the center, you sense something powerful...',

        choices: [
            {
                text: 'Investigate the corruption source',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find a dragon cult totem! Destroying it purifies the forest!',
                        rewards: { xp: 600 }
                    },
                    {
                        weight: 35,
                        text: 'A corrupted treant guards the source! "Leave... or join the forest... in death..."',
                        combat: ['corrupted_treant']
                    },
                    {
                        weight: 25,
                        text: 'The corruption is spreading from a dragon\'s blood! It seeped into the ground!',
                        rewards: { xp: 450, items: ['corrupted_earth_sample'] }
                    }
                ]
            },
            {
                text: 'Try to purify the forest',
                outcomes: [
                    {
                        weight: 45,
                        text: 'Your efforts work! Green returns to the forest! Nature is grateful!',
                        rewards: { xp: 650 }
                    },
                    {
                        weight: 35,
                        text: 'Partial success. Some areas recover, but the corruption is too deep.',
                        rewards: { xp: 400, damage: 70 }
                    },
                    {
                        weight: 20,
                        text: 'The corruption fights back! Dark vines entangle and poison you!',
                        rewards: { damage: 100 }
                    }
                ]
            },
            {
                text: 'Avoid the forest entirely',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You go around. It takes longer but you stay safe.',
                        rewards: { xp: 200 }
                    },
                    {
                        weight: 40,
                        text: 'You hear the forest scream as corruption consumes it completely. Too late to help now.',
                        rewards: { xp: 250 }
                    }
                ]
            }
        ]
    },

    // 13. ANCIENT LIBRARY
    ancient_library: {
        id: 'ancient_library',
        name: 'Ancient Library',
        rarity: 'rare',
        minLevel: 11,
        description: 'You discover a hidden library filled with pre-Dragon War knowledge...',
        intro: 'Thousands of books line the shelves, preserved by magic for a millennium. These contain knowledge lost to time! But... you\'re not alone. Someone else is here, gathering books frantically.',

        choices: [
            {
                text: 'Search for dragon-related texts',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You find "The Calamity\'s Weakness" - a complete bestiary entry!',
                        rewards: { xp: 700, items: ['calamity_bestiary'] }
                    },
                    {
                        weight: 35,
                        text: 'Multiple useful books! Battle tactics, weaknesses, sealing rituals!',
                        rewards: { xp: 600, items: ['dragon_lore_collection'] }
                    },
                    {
                        weight: 20,
                        text: 'A trapped book! Opening it releases a knowledge-guardian demon!',
                        combat: ['library_guardian_demon']
                    }
                ]
            },
            {
                text: 'Confront the other person',
                outcomes: [
                    {
                        weight: 40,
                        text: 'It\'s a scholar! "We can share! There\'s enough knowledge here for everyone!"',
                        rewards: { xp: 500, items: ['scholar_notes'] }
                    },
                    {
                        weight: 35,
                        text: 'It\'s a dragon cultist! "This knowledge is for the Calamity alone!"',
                        combat: ['cultist_scholar']
                    },
                    {
                        weight: 25,
                        text: 'It\'s a rival adventurer! They challenge you to see who\'s faster at looting!',
                        rewards: { xp: 450 }
                    }
                ]
            },
            {
                text: 'Take as much as you can carry',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You load up on valuable texts! Scholars will pay fortunes for these!',
                        rewards: { gold: 1000, items: ['ancient_books_collection'], xp: 550 }
                    },
                    {
                        weight: 30,
                        text: 'The books are magically protected! They burn anyone who steals!',
                        rewards: { damage: 90, items: ['singed_books'] }
                    },
                    {
                        weight: 20,
                        text: 'You trigger a trap! The library begins collapsing!',
                        rewards: { damage: 100, items: ['salvaged_notes'], xp: 400 }
                    }
                ]
            }
        ]
    },

    // 14. POSSESSED STATUE
    possessed_statue: {
        id: 'possessed_statue',
        name: 'Possessed Statue',
        rarity: 'uncommon',
        minLevel: 12,
        description: 'A statue of an ancient hero begins moving...',
        intro: 'In a town square stands a statue of a legendary dragon slayer. As you pass, its stone eyes follow you. Then it speaks: "The dragon stirs... I am needed again... but I am trapped in stone..."',

        choices: [
            {
                text: 'Try to free the hero\'s spirit',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You break the spell! The hero\'s spirit manifests! "Thank you! Take my blessing!"',
                        rewards: { xp: 600, items: ['hero_token'] }
                    },
                    {
                        weight: 35,
                        text: 'Partial success! The hero can speak but remains trapped. They share wisdom!',
                        rewards: { xp: 500, items: ['ancient_tactics_scroll'] }
                    },
                    {
                        weight: 20,
                        text: 'The spirit was corrupted over the centuries! It attacks!',
                        combat: ['corrupted_hero_spirit']
                    }
                ]
            },
            {
                text: 'Ask for the hero\'s guidance',
                outcomes: [
                    {
                        weight: 50,
                        text: '"Aim for the heart. Always the heart." They describe the dragon\'s weak point!',
                        rewards: { xp: 550, items: ['weak_point_diagram'] }
                    },
                    {
                        weight: 30,
                        text: '"You are not ready. Train more." They give cryptic advice.',
                        rewards: { xp: 400 }
                    },
                    {
                        weight: 20,
                        text: '"The dragon... cannot be killed... only sealed..." They sound defeated.',
                        rewards: { xp: 350 }
                    }
                ]
            },
            {
                text: 'Destroy the statue (might be dangerous)',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The spirit is released! "FREEDOM! Or... death. Thank you either way."',
                        rewards: { xp: 500 }
                    },
                    {
                        weight: 35,
                        text: 'Bad idea! The spirit was PROTECTING the town! Monsters now attack!',
                        combat: ['unleashed_horrors']
                    },
                    {
                        weight: 25,
                        text: 'The statue contained a trapped demon! You just freed it! It laughs and flees!',
                        rewards: { xp: 300 }
                    }
                ]
            }
        ]
    },

    // 15. DRAGON DREAM
    dragon_dream: {
        id: 'dragon_dream',
        name: 'Dragon Dream',
        rarity: 'uncommon',
        minLevel: 13,
        description: 'You fall asleep and dream of the Calamity Dragon...',
        intro: 'In your dream, you stand before the Calamity itself. Its eyes burn like suns. It speaks: "Why do you resist? I offer POWER. Serve me, and you will rule this world at my side."',

        choices: [
            {
                text: 'Refuse its offer',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You wake up stronger! Your resolve is unshakeable!',
                        rewards: { xp: 600 }
                    },
                    {
                        weight: 30,
                        text: 'The dragon laughs. "We\'ll see." You wake with a headache.',
                        rewards: { xp: 400, damage: 50 }
                    },
                    {
                        weight: 20,
                        text: 'It attacks you IN THE DREAM! Dream wounds hurt in real life!',
                        rewards: { damage: 120, xp: 450 }
                    }
                ]
            },
            {
                text: 'Pretend to accept, gather information',
                outcomes: [
                    {
                        weight: 45,
                        text: 'The dragon reveals its plans! You learn when it will awaken!',
                        rewards: { xp: 700, items: ['dragon_prophecy'] }
                    },
                    {
                        weight: 35,
                        text: 'It sees through your deception! "LIAR!" Dream fire consumes you!',
                        rewards: { damage: 100, xp: 400 }
                    },
                    {
                        weight: 20,
                        text: 'You learn TOO much! The knowledge threatens to overwhelm your mind!',
                        rewards: { xp: 650, damage: 80 }
                    }
                ]
            },
            {
                text: 'Attack it in the dream',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You wound it! In dreams, willpower is everything! You wake victorious!',
                        rewards: { xp: 650 }
                    },
                    {
                        weight: 35,
                        text: 'It\'s far stronger! You fight valiantly but are burned badly!',
                        rewards: { damage: 110, xp: 500 }
                    },
                    {
                        weight: 25,
                        text: 'Your attack enrages it! "IMPUDENT MORTAL!" It marks you for death!',
                        combat: ['dream_manifestation']
                    }
                ]
            }
        ]
    },

    // 16. RIVAL ADVENTURER
    rival_adventurer: {
        id: 'rival_adventurer',
        name: 'Rival Adventurer',
        rarity: 'common',
        minLevel: 10,
        description: 'Another adventurer claims they\'ll stop the dragon before you...',
        intro: 'A cocky adventurer blocks your path. "YOU\'re the famous dragon hunter? Ha! I\'ll slay the Calamity first and claim ALL the glory! Try to keep up, amateur!"',

        choices: [
            {
                text: 'Challenge them to a friendly competition',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You both benefit! "You\'re not bad! Let\'s team up instead!" Gained an ally!',
                        rewards: { xp: 500 }
                    },
                    {
                        weight: 30,
                        text: 'You win! They respect your skill and back down.',
                        rewards: { xp: 450, gold: 300 }
                    },
                    {
                        weight: 20,
                        text: 'They cheat and attack you for real!',
                        combat: ['dirty_fighter']
                    }
                ]
            },
            {
                text: 'Ignore them and move on',
                outcomes: [
                    {
                        weight: 50,
                        text: 'They\'re baffled by your confidence. "Wait! Come back! I wasn\'t done bragging!"',
                        rewards: { xp: 350 }
                    },
                    {
                        weight: 30,
                        text: 'You later hear they died trying to solo a dragon. Sad.',
                        rewards: { xp: 400 }
                    },
                    {
                        weight: 20,
                        text: 'They follow you and steal your kill later! Infuriating!',
                        rewards: { xp: 300 }
                    }
                ]
            },
            {
                text: 'Warn them about the danger',
                outcomes: [
                    {
                        weight: 50,
                        text: 'Your honesty impresses them. "You\'re alright. Here, take this info."',
                        rewards: { xp: 450, items: ['adventurer_notes'] }
                    },
                    {
                        weight: 30,
                        text: 'They scoff. "I don\'t need warnings from YOU!" They storm off.',
                        rewards: { xp: 250 }
                    },
                    {
                        weight: 20,
                        text: 'They think you\'re trying to scare them away from glory! They attack!',
                        combat: ['paranoid_adventurer']
                    }
                ]
            }
        ]
    },

    // 17. BREAKING SEAL
    breaking_seal: {
        id: 'breaking_seal',
        name: 'Breaking Seal',
        rarity: 'rare',
        minLevel: 14,
        description: 'You witness one of the prison seals shattering...',
        intro: 'A massive stone pillar glows with ancient runes. Suddenly, cracks spread across it! The seal is BREAKING! You have moments to act before it fails completely!',

        choices: [
            {
                text: 'Try to reinforce the seal',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You succeed! The seal holds! You bought precious time!',
                        rewards: { xp: 800 }
                    },
                    {
                        weight: 35,
                        text: 'You slow it but can\'t stop it! The seal will hold for a few more months!',
                        rewards: { xp: 650, damage: 90 }
                    },
                    {
                        weight: 25,
                        text: 'The backlash nearly kills you! But the seal is reinforced!',
                        rewards: { damage: 150, xp: 700 }
                    }
                ]
            },
            {
                text: 'Destroy the seal completely (free the dragon NOW and fight it weakened)',
                outcomes: [
                    {
                        weight: 30,
                        text: 'INSANE but brilliant! The dragon emerges early, confused and weak!',
                        combat: ['weakened_calamity_manifestation']
                    },
                    {
                        weight: 40,
                        text: 'It emerges at FULL POWER! You\'ve doomed everyone!',
                        combat: ['full_power_dragon_avatar']
                    },
                    {
                        weight: 30,
                        text: 'You hesitate. The seal breaks on its own before you decide.',
                        rewards: { xp: 400 }
                    }
                ]
            },
            {
                text: 'Run and warn others',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You alert nearby towns! Thousands evacuate before the seal fails!',
                        rewards: { xp: 700 }
                    },
                    {
                        weight: 40,
                        text: 'You\'re too late. The seal fails and releases horrors before you reach help!',
                        rewards: { xp: 450 }
                    }
                ]
            }
        ]
    },

    // 18. TOWN UNDER SIEGE
    town_under_siege: {
        id: 'town_under_siege',
        name: 'Town Under Siege',
        rarity: 'uncommon',
        minLevel: 13,
        description: 'Dragon cultists are attacking a fortified town...',
        intro: 'Smoke rises from the walls! A town is under siege by dragon cultists! They chant: "Burn! Burn for the Scaled Lord! Sacrifice this town to hasten his awakening!"',

        choices: [
            {
                text: 'Help defend the walls',
                outcomes: [
                    {
                        weight: 45,
                        text: 'Your arrival turns the tide! The cultists flee! The mayor rewards you!',
                        rewards: { xp: 650, gold: 800 }
                    },
                    {
                        weight: 35,
                        text: 'Brutal fighting! You save the town but are badly wounded!',
                        rewards: { xp: 600, damage: 110, gold: 500 }
                    },
                    {
                        weight: 20,
                        text: 'The cultists overwhelm you! You must retreat with survivors!',
                        rewards: { damage: 90, xp: 450 }
                    }
                ]
            },
            {
                text: 'Sneak behind enemy lines and sabotage',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You destroy their siege weapons! The defense becomes easy!',
                        rewards: { xp: 700, gold: 600 }
                    },
                    {
                        weight: 30,
                        text: 'You\'re caught! Fight your way out!',
                        combat: ['cultist_siege_squad']
                    },
                    {
                        weight: 25,
                        text: 'You assassinate the cult leader! The siege collapses!',
                        rewards: { xp: 750, items: ['cult_leader_equipment'] }
                    }
                ]
            },
            {
                text: 'Lead an evacuation',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You save hundreds of civilians! They owe you their lives!',
                        rewards: { xp: 600 }
                    },
                    {
                        weight: 30,
                        text: 'The evacuation succeeds but the town falls. At least people lived.',
                        rewards: { xp: 500 }
                    },
                    {
                        weight: 20,
                        text: 'Cultists attack the evacuation! Defend the innocent!',
                        combat: ['cultist_raiders']
                    }
                ]
            }
        ]
    },

    // 19. UNDERGROUND LABORATORY
    underground_laboratory: {
        id: 'underground_laboratory',
        name: 'Underground Laboratory',
        rarity: 'rare',
        minLevel: 15,
        description: 'You discover a secret lab experimenting with dragon blood...',
        intro: 'Beneath a ruin, you find a hidden laboratory! Vials of glowing dragon blood line the walls! Notes read: "Subject 12 - Dragon blood fusion - SUCCESS! Subject 13 - DECEASED. Will attempt Subject 14 tomorrow."',

        choices: [
            {
                text: 'Investigate the experiments',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You learn how to weaponize dragon blood! This could be useful!',
                        rewards: { xp: 700, items: ['dragon_blood_weapon_formula'] }
                    },
                    {
                        weight: 35,
                        text: 'The notes reveal a cult plot to create dragon-human hybrids!',
                        rewards: { xp: 650, items: ['hybrid_research_notes'] }
                    },
                    {
                        weight: 25,
                        text: '"Subject 14" awakens! A monstrous fusion of man and dragon!',
                        combat: ['dragon_hybrid_abomination']
                    }
                ]
            },
            {
                text: 'Destroy the laboratory',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You burn it all! This evil research ends here!',
                        rewards: { xp: 600 }
                    },
                    {
                        weight: 30,
                        text: 'The dragon blood explodes when ignited! Massive damage!',
                        rewards: { damage: 120, xp: 500 }
                    },
                    {
                        weight: 20,
                        text: 'Destroying the lab releases all the test subjects! They attack!',
                        combat: ['escaped_experiments']
                    }
                ]
            },
            {
                text: 'Take samples for study',
                outcomes: [
                    {
                        weight: 45,
                        text: 'Scholars are horrified but grateful for the evidence!',
                        rewards: { gold: 1000, xp: 600 }
                    },
                    {
                        weight: 35,
                        text: 'The samples corrupt you! Dragon blood is dangerous!',
                        rewards: { items: ['dragon_blood_vials'], damage: 80 }
                    },
                    {
                        weight: 20,
                        text: 'A rival steals your samples! "This research is MINE!"',
                        combat: ['researcher_thief']
                    }
                ]
            }
        ]
    },

    // 20. TIME ANOMALY
    time_anomaly: {
        id: 'time_anomaly',
        name: 'Time Anomaly',
        rarity: 'rare',
        minLevel: 16,
        description: 'Reality fractures, showing you glimpses of past and future...',
        intro: 'Time itself warps! You see visions: The dragon\'s first rampage. The sealing ritual. And... the FUTURE. The dragon awakened, cities burning, the world ending. Then it snaps back to normal.',

        choices: [
            {
                text: 'Focus on the vision of the sealing ritual',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You witness the EXACT ritual used! You could replicate it!',
                        rewards: { xp: 800 }
                    },
                    {
                        weight: 30,
                        text: 'The ritual required a sacrifice. Someone died to seal it. Will YOU?',
                        rewards: { xp: 650 }
                    },
                    {
                        weight: 20,
                        text: 'The vision is too intense! Your mind can\'t handle it!',
                        rewards: { damage: 100, xp: 500 }
                    }
                ]
            },
            {
                text: 'Focus on the future to see how to prevent it',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You see yourself victorious! This future CAN be changed!',
                        rewards: { xp: 750 }
                    },
                    {
                        weight: 35,
                        text: 'You see your own death. The future looks... grim.',
                        rewards: { xp: 600, damage: 70 }
                    },
                    {
                        weight: 20,
                        text: 'The future is uncertain! Multiple timelines! Too many possibilities!',
                        rewards: { xp: 550 }
                    }
                ]
            },
            {
                text: 'Try to stop the anomaly',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You stabilize time! The anomaly closes! Reality thanks you!',
                        rewards: { xp: 700 }
                    },
                    {
                        weight: 30,
                        text: 'You\'re partially successful. Time stabilizes but you\'re aged!',
                        rewards: { xp: 600, damage: 80 }
                    },
                    {
                        weight: 20,
                        text: 'The anomaly pulls you IN! You experience all timelines at once!',
                        rewards: { xp: 850, damage: 130, items: ['temporal_shard'] }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // LATE GAME ADVENTURES (Levels 17-25)
    // ═══════════════════════════════════════════════════════════════

    // 21. DRAGON LIEUTENANT
    dragon_lieutenant: {
        id: 'dragon_lieutenant',
        name: 'Dragon Lieutenant',
        rarity: 'rare',
        minLevel: 17,
        description: 'One of the Calamity Dragon\'s ancient generals has awoken...',
        intro: 'A massive armored drake lands before you, scales gleaming with dark magic. "I am Vorthax, Lieutenant of the Calamity! I was sealed with my lord, but I have broken free! Kneel... or be incinerated!"',

        choices: [
            {
                text: 'Fight the lieutenant',
                outcomes: [
                    {
                        weight: 100,
                        text: 'This is it! The lieutenant attacks with the fury of dragonkind!',
                        combat: ['dragon_lieutenant_vorthax']
                    }
                ]
            },
            {
                text: 'Try to re-seal it',
                outcomes: [
                    {
                        weight: 40,
                        text: 'Your magic works! The lieutenant is resealed! But for how long?',
                        rewards: { xp: 1000 }
                    },
                    {
                        weight: 35,
                        text: 'Partial success! It\'s weakened enough to flee! You saved countless lives!',
                        rewards: { xp: 900, damage: 150 }
                    },
                    {
                        weight: 25,
                        text: 'The seal fails! Now it\'s ANGRY! You have to fight!',
                        combat: ['enraged_lieutenant']
                    }
                ]
            },
            {
                text: 'Flee and warn everyone',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You escape! Your warning saves thousands as armies mobilize!',
                        rewards: { xp: 800 }
                    },
                    {
                        weight: 40,
                        text: 'The lieutenant pursues! "You cannot escape!"',
                        combat: ['pursuing_lieutenant']
                    }
                ]
            }
        ]
    },

    // 22. PORTAL TO PRISON
    portal_to_prison: {
        id: 'portal_to_prison',
        name: 'Portal to Prison',
        rarity: 'rare',
        minLevel: 18,
        description: 'A rift opens to the dragon\'s prison dimension...',
        intro: 'Reality tears open! Through the rift, you see it: the Calamity Dragon\'s prison! A realm of chains and seals! The dragon itself is visible, struggling against its bonds! The rift won\'t last long!',

        choices: [
            {
                text: 'Enter the prison and strengthen the seals',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You reinforce the chains! The dragon roars in fury! It will take longer to break free!',
                        rewards: { xp: 1100, damage: 180 }
                    },
                    {
                        weight: 35,
                        text: 'The dragon notices you! "MORTAL! YOU DARE?!" It attacks through the rift!',
                        combat: ['prison_dragon_manifestation']
                    },
                    {
                        weight: 25,
                        text: 'You\'re trapped! Barely escape before the rift closes!',
                        rewards: { damage: 200, xp: 900 }
                    }
                ]
            },
            {
                text: 'Attack the dragon while it\'s chained',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You land a solid hit! The dragon BLEEDS! It CAN be hurt!',
                        rewards: { xp: 1000, items: ['dragon_blood_evidence'], damage: 160 }
                    },
                    {
                        weight: 35,
                        text: 'Your attack enrages it! The chains crack from its fury!',
                        rewards: { xp: 900, damage: 150 }
                    },
                    {
                        weight: 20,
                        text: 'It breathes fire through the rift! You\'re incinerated! Barely alive!',
                        rewards: { damage: 220, xp: 850 }
                    }
                ]
            },
            {
                text: 'Close the rift immediately',
                outcomes: [
                    {
                        weight: 60,
                        text: 'Smart! The rift closes! The prison remains intact!',
                        rewards: { xp: 900 }
                    },
                    {
                        weight: 40,
                        text: 'Too late! Something escapes before it closes!',
                        combat: ['escaped_prison_horror']
                    }
                ]
            }
        ]
    },

    // 23. ANCIENT WEAPON VAULT
    ancient_weapon_vault: {
        id: 'ancient_weapon_vault',
        name: 'Ancient Weapon Vault',
        rarity: 'rare',
        minLevel: 19,
        description: 'You find the legendary vault of dragon-slaying weapons...',
        intro: 'Deep underground, sealed for a millennium: THE VAULT. Weapons forged specifically to kill the Calamity! Swords, spears, arrows - all imbued with dragon-slaying magic! But... they\'re guarded by ancient golems.',

        choices: [
            {
                text: 'Fight the guardians',
                outcomes: [
                    {
                        weight: 100,
                        text: 'The vault guardians activate! "INTRUDERS WILL BE ELIMINATED!"',
                        combat: ['vault_guardian_golems']
                    }
                ]
            },
            {
                text: 'Try to deactivate the guardians',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You find the control runes! Guardians deactivate! Vault is yours!',
                        rewards: { xp: 1100, items: ['ancient_dragon_slayer'] }
                    },
                    {
                        weight: 35,
                        text: 'Partial success! Some guardians remain active but weakened!',
                        combat: ['weakened_guardians']
                    },
                    {
                        weight: 20,
                        text: 'You trigger a security protocol! ADDITIONAL guardians activate!',
                        combat: ['vault_security_swarm']
                    }
                ]
            },
            {
                text: 'Take one weapon quickly and flee',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You grab the nearest weapon and run! It\'s... a legendary spear!',
                        rewards: { items: ['dragon_piercer_spear'], xp: 900 }
                    },
                    {
                        weight: 30,
                        text: 'The weapon you grab is cursed! It burns your hand!',
                        rewards: { items: ['cursed_dragon_blade'], damage: 140 }
                    },
                    {
                        weight: 20,
                        text: 'The guardians pursue you! You must fight while retreating!',
                        combat: ['pursuing_guardians']
                    }
                ]
            }
        ]
    },

    // 24. DRAGON PROPHET
    dragon_prophet: {
        id: 'dragon_prophet',
        name: 'Dragon Prophet',
        rarity: 'rare',
        minLevel: 20,
        description: 'A prophet speaks of the dragon\'s inevitable victory...',
        intro: 'An ancient oracle stands before you, eyes glowing with dragon fire. "I have seen the end. The Calamity rises. The world burns. All you do is futile. Join us now, and you may survive what comes."',

        choices: [
            {
                text: 'Reject the prophecy',
                outcomes: [
                    {
                        weight: 45,
                        text: '"The future is not set! I\'ll change it!" Your conviction shakes the prophet!',
                        rewards: { xp: 1000 }
                    },
                    {
                        weight: 35,
                        text: 'The prophet laughs. "Denial changes nothing." They attack to "show you truth"!',
                        combat: ['dragon_prophet']
                    },
                    {
                        weight: 20,
                        text: 'The prophet shows you a vision of failure. It\'s... devastating.',
                        rewards: { xp: 800, damage: 100 }
                    }
                ]
            },
            {
                text: 'Demand to know the dragon\'s weakness',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The prophet actually tells you! "It fears... the light of creation itself."',
                        rewards: { xp: 1100, items: ['calamity_weakness_revealed'] }
                    },
                    {
                        weight: 35,
                        text: '"Weakness? It HAS none!" The prophet seems genuinely convinced.',
                        rewards: { xp: 700 }
                    },
                    {
                        weight: 25,
                        text: 'The prophet tries to possess you! "Let me SHOW you the dragon\'s power!"',
                        combat: ['possession_attempt']
                    }
                ]
            },
            {
                text: 'Kill the prophet (stop the prophecy at its source)',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You strike them down! "The future... is not... written..." They fade.',
                        rewards: { xp: 950 }
                    },
                    {
                        weight: 30,
                        text: 'The prophet laughs as they die. "Killing me changes NOTHING!"',
                        rewards: { xp: 850 }
                    },
                    {
                        weight: 20,
                        text: 'The prophet was immortal! They reform! "You cannot kill the future!"',
                        combat: ['immortal_prophet']
                    }
                ]
            }
        ]
    },

    // 25. CORRUPTED HERO
    corrupted_hero: {
        id: 'corrupted_hero',
        name: 'Corrupted Hero',
        rarity: 'rare',
        minLevel: 21,
        description: 'A legendary hero has joined the dragon cult...',
        intro: 'You face a warrior whose name is legendary - the hero who saved kingdoms! But now... they wear dragon cult robes. "I was wrong to fight it," they say. "The dragon offers PEACE. Eternal peace in flame and ash."',

        choices: [
            {
                text: 'Try to redeem them',
                outcomes: [
                    {
                        weight: 35,
                        text: 'Your words break through! "What... have I done?!" They rebel against the cult!',
                        rewards: { xp: 1200 }
                    },
                    {
                        weight: 40,
                        text: 'They\'re torn! "I... I don\'t know anymore!" They flee in confusion!',
                        rewards: { xp: 900 }
                    },
                    {
                        weight: 25,
                        text: '"SILENCE!" The corruption is too deep! They attack!',
                        combat: ['corrupted_legendary_hero']
                    }
                ]
            },
            {
                text: 'Fight them',
                outcomes: [
                    {
                        weight: 100,
                        text: 'The corrupted hero challenges you! This will be your toughest battle yet!',
                        combat: ['legendary_hero_boss']
                    }
                ]
            },
            {
                text: 'Learn why they joined',
                outcomes: [
                    {
                        weight: 45,
                        text: '"The dragon promised to bring back my family. I... I was desperate." You understand.',
                        rewards: { xp: 950 }
                    },
                    {
                        weight: 35,
                        text: '"I saw the future. The dragon WINS. I chose the winning side." Chilling.',
                        rewards: { xp: 850 }
                    },
                    {
                        weight: 20,
                        text: '"The dragon showed me POWER!" They attack to demonstrate!',
                        combat: ['power_mad_hero']
                    }
                ]
            }
        ]
    },

    // 26. MASS RITUAL
    mass_ritual: {
        id: 'mass_ritual',
        name: 'Mass Ritual',
        rarity: 'legendary',
        minLevel: 22,
        description: 'Hundreds of cultists gather for the final awakening ritual...',
        intro: 'An entire CITY has been converted to the dragon cult! Thousands chant in unison! The sky turns red! The ground quakes violently! This is the FINAL ritual! If it completes, the dragon awakens NOW!',

        choices: [
            {
                text: 'Disrupt the ritual at all costs',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You charge into HUNDREDS of cultists! This is madness! This is heroism!',
                        combat: ['mass_cultist_ritual']
                    }
                ]
            },
            {
                text: 'Assassinate the ritual leaders',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You take out the high priests! The ritual collapses! You saved the world!',
                        rewards: { xp: 1500 }
                    },
                    {
                        weight: 35,
                        text: 'You kill some leaders but there are too many! The ritual continues!',
                        combat: ['ritual_defenders']
                    },
                    {
                        weight: 20,
                        text: 'You\'re discovered! Every cultist turns on you!',
                        combat: ['cultist_swarm']
                    }
                ]
            },
            {
                text: 'Counter-ritual (seal the dragon deeper)',
                outcomes: [
                    {
                        weight: 40,
                        text: 'Your magic works! The dragon is pushed BACK! But... you paid a terrible price.',
                        rewards: { xp: 1400, damage: 300 }
                    },
                    {
                        weight: 35,
                        text: 'The two rituals clash! Reality itself fractures!',
                        rewards: { xp: 1200, damage: 250 }
                    },
                    {
                        weight: 25,
                        text: 'Your counter-ritual fails! The awakening accelerates!',
                        rewards: { xp: 900 }
                    }
                ]
            }
        ]
    },

    // 27. DRAGON HEART FRAGMENT
    dragon_heart_fragment: {
        id: 'dragon_heart_fragment',
        name: 'Dragon Heart Fragment',
        rarity: 'legendary',
        minLevel: 23,
        description: 'A piece of the Calamity\'s heart, split during the sealing...',
        intro: 'Pulsing with dark magic, a fragment of the dragon\'s actual HEART beats before you. Legend says pieces were scattered to weaken it. This one pulses with terrible power. Destroying it would weaken the dragon... or you could use its power...',

        choices: [
            {
                text: 'Destroy the heart fragment',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You shatter it! The dragon SCREAMS across dimensions! It\'s permanently weakened!',
                        rewards: { xp: 1400 }
                    },
                    {
                        weight: 30,
                        text: 'It explodes! Dragon fire engulfs you! But... it\'s destroyed!',
                        rewards: { damage: 280, xp: 1300 }
                    },
                    {
                        weight: 20,
                        text: 'It cannot be destroyed! It reforms! It\'s IMMORTAL like the dragon!',
                        rewards: { xp: 800 }
                    }
                ]
            },
            {
                text: 'Absorb its power',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You gain draconic power! But... at what cost to your humanity?',
                        rewards: { xp: 1200 }
                    },
                    {
                        weight: 35,
                        text: 'The power is too much! It burns through you!',
                        rewards: { damage: 320, xp: 1000 }
                    },
                    {
                        weight: 25,
                        text: 'The dragon\'s consciousness tries to possess you through the heart!',
                        combat: ['dragon_possession']
                    }
                ]
            },
            {
                text: 'Seal it away forever',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You create an unbreakable seal! The fragment is entombed forever!',
                        rewards: { xp: 1300 }
                    },
                    {
                        weight: 30,
                        text: 'The sealing drains your life force! Worth it!',
                        rewards: { xp: 1200, damage: 200 }
                    },
                    {
                        weight: 20,
                        text: 'The fragment fights back! It summons guardians!',
                        combat: ['heart_fragment_guardians']
                    }
                ]
            }
        ]
    },

    // 28. REALITY TEAR
    reality_tear: {
        id: 'reality_tear',
        name: 'Reality Tear',
        rarity: 'legendary',
        minLevel: 24,
        description: 'The dragon\'s awakening is tearing reality apart...',
        intro: 'Space itself cracks! You can see OTHER DIMENSIONS through the rifts! Monsters from beyond pour through! The dragon\'s power is so immense it\'s breaking the laws of physics!',

        choices: [
            {
                text: 'Seal the tears',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You close the rifts! Reality stabilizes! You prevented an apocalypse!',
                        rewards: { xp: 1500 }
                    },
                    {
                        weight: 35,
                        text: 'You seal most but not all! Some rifts remain!',
                        rewards: { xp: 1200, damage: 180 }
                    },
                    {
                        weight: 20,
                        text: 'The rifts are too powerful! Something massive comes through!',
                        combat: ['extradimensional_horror']
                    }
                ]
            },
            {
                text: 'Use the rifts to reach the dragon\'s prison',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find a path directly to the dragon! Time to end this!',
                        rewards: { xp: 1400 }
                    },
                    {
                        weight: 35,
                        text: 'You get lost between dimensions! Nightmare realm!',
                        rewards: { damage: 250, xp: 1100 }
                    },
                    {
                        weight: 25,
                        text: 'The dragon senses you! "APPROACHING YOUR DOOM, MORTAL?"',
                        combat: ['dragon_avatar_projection']
                    }
                ]
            },
            {
                text: 'Evacuate everyone before reality collapses',
                outcomes: [
                    {
                        weight: 60,
                        text: 'You save thousands! Reality may fall but humanity survives!',
                        rewards: { xp: 1300 }
                    },
                    {
                        weight: 40,
                        text: 'You save who you can. It\'s not enough. Never enough.',
                        rewards: { xp: 1000 }
                    }
                ]
            }
        ]
    },

    // 29. CELESTIAL INTERVENTION
    celestial_intervention: {
        id: 'celestial_intervention',
        name: 'Celestial Intervention',
        rarity: 'legendary',
        minLevel: 24,
        description: 'The gods themselves take notice of the crisis...',
        intro: 'A being of pure light descends! An angel! A god! "Mortal," they speak with a voice like thunder, "The Calamity threatens all creation. We offer you divine power... but there is a price. Always a price."',

        choices: [
            {
                text: 'Accept the divine power',
                outcomes: [
                    {
                        weight: 45,
                        text: 'You are blessed by the gods! Divine fire courses through you!',
                        rewards: { xp: 1400 }
                    },
                    {
                        weight: 35,
                        text: 'The power is overwhelming! You burn with holy fire!',
                        rewards: { xp: 1200, damage: 200 }
                    },
                    {
                        weight: 20,
                        text: '"You are not worthy!" The celestial tests you!',
                        combat: ['celestial_trial']
                    }
                ]
            },
            {
                text: 'Refuse ("Mortals will handle this ourselves!")',
                outcomes: [
                    {
                        weight: 50,
                        text: 'The celestial smiles. "Courage! Very well. We shall not interfere." Respect earned!',
                        rewards: { xp: 1300 }
                    },
                    {
                        weight: 30,
                        text: '"Pride before the fall, mortal. So be it." They vanish.',
                        rewards: { xp: 900 }
                    },
                    {
                        weight: 20,
                        text: '"Then you shall PROVE your worth!" They attack to test you!',
                        combat: ['celestial_challenger']
                    }
                ]
            },
            {
                text: 'Ask what the price is',
                outcomes: [
                    {
                        weight: 45,
                        text: '"Your mortality. To wield divine power, you must become divine. You will never be human again."',
                        rewards: { xp: 1100 }
                    },
                    {
                        weight: 35,
                        text: '"After the dragon falls, you must serve us. Forever." Servitude for victory.',
                        rewards: { xp: 1000 }
                    },
                    {
                        weight: 20,
                        text: '"The one you love most will die in your place." The cruelest price.',
                        rewards: { xp: 1200 }
                    }
                ]
            }
        ]
    },

    // 30. PRE-AWAKENING
    pre_awakening: {
        id: 'pre_awakening',
        name: 'Pre-Awakening',
        rarity: 'legendary',
        minLevel: 25,
        description: 'The final seal cracks. The dragon is about to emerge...',
        intro: 'This is it. The last seal SHATTERS! The earth splits open! A roar that shakes the heavens! You can see it: the Calamity Dragon, rising from its prison! Wings that blot out the sun! Eyes like dying stars! This is the end... or the beginning of your legend!',

        choices: [
            {
                text: 'Face the dragon (FINAL BATTLE)',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You draw your weapon. The dragon sees you. It SMILES. "Finally... a worthy death for you, little mortal." BATTLE FOR THE FATE OF THE WORLD!',
                        combat: ['CALAMITY_DRAGON_FINAL_BOSS']
                    }
                ]
            },
            {
                text: 'Attempt one final sealing',
                outcomes: [
                    {
                        weight: 35,
                        text: 'IMPOSSIBLE! But you DO it! The dragon is sealed again! But only for a century...',
                        rewards: { xp: 2000, damage: 400 }
                    },
                    {
                        weight: 40,
                        text: 'You slow its awakening! Humanity has one more day! Use it well!',
                        rewards: { xp: 1500, damage: 300 }
                    },
                    {
                        weight: 25,
                        text: 'The dragon breaks your seal! "FUTILE!" It\'s free! You must fight!',
                        combat: ['ENRAGED_CALAMITY_DRAGON']
                    }
                ]
            },
            {
                text: 'Rally all forces for one last stand',
                outcomes: [
                    {
                        weight: 50,
                        text: 'Heroes, armies, mages - EVERYONE you\'ve helped arrives! "We stand with you!" EPIC BATTLE!',
                        rewards: { xp: 1800 }
                    },
                    {
                        weight: 30,
                        text: 'Some come. Not enough. But they try. Bravery in the face of doom.',
                        rewards: { xp: 1400 }
                    },
                    {
                        weight: 20,
                        text: 'You stand alone. Everyone else fled. So be it. You vs the dragon.',
                        combat: ['SOLO_CALAMITY_FIGHT']
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CALAMITY DUNGEON ADVENTURES — SET 3
    // Levels 11-25: lost_lighthouse, alchemy_cauldron, knave_card_game,
    //   silent_glacier, wanderers_map, drowning_knight
    // ═══════════════════════════════════════════════════════════════

    // ── 11. THE LOST LIGHTHOUSE ─────────────────────────────────────
    lost_lighthouse: {
        id: 'lost_lighthouse',
        name: 'The Lost Lighthouse',
        rarity: 'uncommon',
        minLevel: 11,
        description: 'A stone tower juts out of the cliffs, lit by a single, flickering lantern...',
        intro: 'The storm is raging outside. Through the crashing waves, a beam of light cuts the rain from afar. It leads to the abandoned Lighthouse. The iron door is rusted shut, but a small hatch hangs slightly ajar.',

        choices: [
            {
                text: 'Break through the rusted door',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The door yields with a grinding screech. Inside, the ground is slippery. You see a spiral staircase going up, but two doors side-by-side on the lower level.',
                        nextChoices: [
                            {
                                text: 'Go to the East Wing',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'You find a library of old navigation charts. One contains a secret map to the Sea of Gold.',
                                        rewards: { gold: 1000, xp: 500, items: ['sea_map'] }
                                    },
                                    {
                                        weight: 40,
                                        text: 'A kraken tentacle is wrapped around the wall! You pull it free.',
                                        combat: ['mimic']
                                    }
                                ]
                            },
                            {
                                text: 'Go to the West Wing',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'A massive chest sits here, sealed by a magical lock. You break it open.',
                                        rewards: { gold: 800, xp: 400 }
                                    },
                                    {
                                        weight: 50,
                                        text: 'The lock is cursed. The moment you open it, the room collapses.',
                                        combat: ['ancient_dragon']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 60,
                        text: 'You pry the door loose and enter the lower level. The light is warm here, ignoring the storm.',
                        outcomes: [
                            {
                                weight: 70,
                                text: 'A skeleton guards the base of the spiral stairs. You defeat it and climb up.',
                                combat: ['risen_knight'],
                                rewards: { gold: 200 }
                            },
                            {
                                weight: 30,
                                text: 'The guard is friendly! It gives you a lantern key. You proceed to the top.',
                                rewards: { gold: 0, xp: 300, items: ['lantern_key'] }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Search the beach for supplies',
                outcomes: [
                    {
                        weight: 70,
                        text: 'You gather wood and rope. You might be able to reinforce the entrance.',
                        rewards: { xp: 200 }
                    },
                    {
                        weight: 30,
                        text: 'The tide brings a treasure chest ashore!',
                        rewards: { gold: 1500, xp: 600 }
                    }
                ]
            }
        ]
    },

    // ── 12. THE ALCHEMY CAULDRON ────────────────────────────────────
    alchemy_cauldron: {
        id: 'alchemy_cauldron',
        name: 'The Alchemy Cauldron',
        rarity: 'uncommon',
        minLevel: 12,
        description: 'In the heart of a village, a massive bubbling cauldron steams endlessly...',
        intro: 'The air smells of sulfur and old herbs. A wizard is stirring the liquid in a cauldron made of copper and gold. "The Balance is tipping," they mutter nervously. "It needs... ingredients.",',

        choices: [
            {
                text: 'Ask for the secret formula',
                outcomes: [
                    {
                        weight: 40,
                        text: 'The wizard reveals the formula but demands a rare ingredient.',
                        nextChoices: [
                            {
                                text: 'Trade a superior_health_potion',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'The wizard learns! A new potion is created instantly.',
                                        rewards: { items: ['superior_health_potion', 'superior_mana_potion'], xp: 800 }
                                    },
                                    {
                                        weight: 50,
                                        text: 'The formula fails. The cauldron explodes!',
                                        combat: ['alchemical_ooze']
                                    }
                                ]
                            },
                            {
                                text: 'Trade a legendary_gem',
                                outcomes: [
                                    {
                                        weight: 70,
                                        text: 'Magic stabilizes. A legendary reagent is formed.',
                                        rewards: { items: ['legendary_reagent'], xp: 2000 }
                                    },
                                    {
                                        weight: 30,
                                        text: 'The gem is rejected. You are thrown from the tower.',
                                        damage: 300
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 60,
                        text: 'The wizard is too distracted. They don\'t want to share.',
                        rewards: { xp: 150 }
                    }
                ]
            },
            {
                text: 'Steal a finished potion',
                outcomes: [
                    {
                        weight: 50,
                        text: 'You grab a bottle from the rack. It\'s valuable!',
                        rewards: { items: ['mana_potion', 'health_potion'], gold: 500 }
                    },
                    {
                        weight: 50,
                        text: 'The wizard notices you. Combat ensues!',
                        combat: ['alchemical_ooze']
                    }
                ]
            }
        ]
    },

    // ── 13. THE KNAVE'S CARD GAME ──────────────────────────────────
    knave_card_game: {
        id: 'knave_card_game',
        name: 'The Knave\'s Card Game',
        rarity: 'rare',
        minLevel: 13,
        description: 'A table set up for a high-stakes game. The cards are strange, shifting shapes...',
        intro: 'A noble lounges on a velvet sofa, shuffling cards that shift from hearts to spades depending on who you look at. "Come," they say. "The house always wins, unless you know the rules."',

        choices: [
            {
                text: 'Challenge the noble',
                outcomes: [
                    {
                        weight: 60,
                        text: 'The noble accepts. First round: "Hearts."',
                        nextChoices: [
                            {
                                text: 'Play the Ace of Spades',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'You win the first pot. The noble gets nervous.',
                                        rewards: { gold: 500 }
                                    },
                                    {
                                        weight: 50,
                                        text: 'The noble tricks the cards. You lose.',
                                        rewards: { damage: 20 }
                                    }
                                ]
                            },
                            {
                                text: 'Play the Joker',
                                outcomes: [
                                    {
                                        weight: 40,
                                        text: 'You win everything immediately.',
                                        rewards: { gold: 2000, xp: 1000 }
                                    },
                                    {
                                        weight: 60,
                                        text: 'The Joker is a trap! The noble reveals his true form.',
                                        combat: ['demon_overlord']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 40,
                        text: 'The noble refuses to play. They are bluffing you into submission.',
                        rewards: { xp: 100 }
                    }
                ]
            },
            {
                text: 'Sit and observe',
                outcomes: [
                    {
                        weight: 100,
                        text: 'You see the pattern. The house loses when the cards are read aloud.',
                        rewards: { xp: 500, items: ['secret_card'] }
                    }
                ]
            }
        ]
    },

    // ── 14. THE GHOST FORGE ─────────────────────────────────────────
    ghost_forge: {
        id: 'ghost_forge',
        name: 'The Ghost Forge',
        rarity: 'uncommon',
        minLevel: 14,
        description: 'Hammer strikes echo in an abandoned smithy. A spirit tends the fire...',
        intro: 'The forge is burning bright in the dead of night. A shadowy smith turns the tongs. "Forging armor for the void," they rasp.',

        choices: [
            {
                text: 'Ask about the armor',
                outcomes: [
                    {
                        weight: 70,
                        text: '"The Void Armor requires a soul."',
                        nextChoices: [
                            {
                                text: 'Offer your own life force',
                                outcomes: [
                                    {
                                        weight: 40,
                                        text: 'You forge the armor, but you are left drained.',
                                        rewards: { items: ['void_armor'], damage: 200, xp: 2000 }
                                    },
                                    {
                                        weight: 60,
                                        text: 'You survive, but the forge is cursed forever.',
                                        rewards: { damage: 150 }
                                    }
                                ]
                            },
                            {
                                text: 'Trade a soul token',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'Acceptable. The forge creates a shield.',
                                        rewards: { items: ['void_shield'], xp: 1500 }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 30,
                        text: 'The smith is confused. "Armor? We forge weapons."',
                        rewards: { xp: 50 }
                    }
                ]
            },
            {
                text: 'Take the unfinished weapon',
                outcomes: [
                    {
                        weight: 80,
                        text: 'A jagged dagger. Use it carefully.',
                        rewards: { items: ['iron_dagger'] }
                    },
                    {
                        weight: 20,
                        text: 'It explodes on your hand.',
                        rewards: { damage: 50, xp: 100 }
                    }
                ]
            }
        ]
    },

    // ── 15. THE SILENT GLACIER ──────────────────────────────────────
    silent_glacier: {
        id: 'silent_glacier',
        name: 'The Silent Glacier',
        rarity: 'rare',
        minLevel: 15,
        description: 'A massive ice wall blocks the path. Snow crunches underfoot, but silence is the law.',
        intro: 'The ice is so cold it steals heat from the air. Carvings on the wall tell of an ancient civilization that froze to end a plague.',

        choices: [
            {
                text: 'Cut through the ice',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You find a warm tunnel inside.',
                        nextChoices: [
                            {
                                text: 'Follow the warmth',
                                outcomes: [
                                    {
                                        weight: 50,
                                        text: 'It leads to a hidden village.',
                                        rewards: { gold: 5000, xp: 2000 }
                                    },
                                    {
                                        weight: 50,
                                        text: 'The warmth was a lure. A frozen monster rises.',
                                        combat: ['frozen_revenant']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 60,
                        text: 'You shatter the ice but lose your torch.',
                        rewards: { damage: 50 }
                    }
                ]
            },
            {
                text: 'Circle around the ice wall',
                outcomes: [
                    {
                        weight: 100,
                        text: 'A path exists. The ice blocks are a distraction.',
                        rewards: { xp: 300 }
                    }
                ]
            }
        ]
    },

    // ── 16. THE WANDERER'S MAP ──────────────────────────────────────
    wanderers_map: {
        id: 'wanderers_map',
        name: 'The Wanderer\'s Map',
        rarity: 'common',
        minLevel: 16,
        description: 'A cartographer lies on the floor of a tavern. He draws frantically with charcoal.',
        intro: '"You can\'t trust the maps," he says, gasping for air. "The ink changes... the geography moves."',

        choices: [
            {
                text: 'Take the map',
                outcomes: [
                    {
                        weight: 60,
                        text: 'It points to a hidden valley of gold.',
                        rewards: { gold: 2000 }
                    },
                    {
                        weight: 40,
                        text: 'It changes when you look away. It shows a monster instead.',
                        combat: ['siren_beast']
                    }
                ]
            },
            {
                text: 'Ask for the secret',
                outcomes: [
                    {
                        weight: 70,
                        text: '"Only the worthy survive."',
                        rewards: { xp: 300 }
                    },
                    {
                        weight: 30,
                        text: 'He dies before finishing the sentence.',
                        rewards: { xp: 100, damage: 10 }
                    }
                ]
            }
        ]
    },

    // ── 17. THE DROWNING KNIGHT ─────────────────────────────────────
    drowning_knight: {
        id: 'drowning_knight',
        name: 'The Drowning Knight',
        rarity: 'uncommon',
        minLevel: 17,
        description: 'A knight sinks in a flooded crypt. Bubbles escape from his sealed helm.',
        intro: 'He hasn\'t moved in decades, but his armor is wet. Something in the depths below keeps him there.',

        choices: [
            {
                text: 'Dive down to him',
                outcomes: [
                    {
                        weight: 40,
                        text: 'You reach him. He is alive, but drowning.',
                        nextChoices: [
                            {
                                text: 'Rescue him',
                                outcomes: [
                                    {
                                        weight: 60,
                                        text: 'He gives you a seal of the deep kingdom.',
                                        rewards: { items: ['deep_seal'], xp: 1500 }
                                    },
                                    {
                                        weight: 40,
                                        text: 'He drowns. You find a hidden cache.',
                                        rewards: { gold: 800 }
                                    }
                                ]
                            },
                            {
                                text: 'Loot his armor',
                                outcomes: [
                                    {
                                        weight: 80,
                                        text: 'You take the armor and leave.',
                                        rewards: { items: ['iron_armor', 'rusty_helm'] }
                                    },
                                    {
                                        weight: 20,
                                        text: 'The water rises. Drowned spirits surround you.',
                                        combat: ['mine_horror']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        weight: 60,
                        text: 'He is gone. But his body floats.',
                        rewards: { xp: 50 }
                    }
                ]
            },
            {
                text: 'Leave him',
                outcomes: [
                    {
                        weight: 100,
                        text: 'Some dead stay dead.',
                        rewards: { xp: 100 }
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
        dropRates: { rare: 1 }
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
        dropRates: { epic: 1 }
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
        dropRates: { legendary: 1 }
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
        dropRates: { epic: 1 }
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
        dropRates: { epic: 1 }
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
        dropRates: { legendary: 1 }
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
        dropRates: { legendary: 1 }
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
        dropRates: { epic: 1 }
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
        dropRates: { rare: 1 }
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
        dropRates: { epic: 1 }
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
        dropRates: { uncommon: 0.5334, rare: 0.3333, epic: 0.1333 }
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
        dropRates: { common: 0.5556, uncommon: 0.3333, rare: 0.1111 }
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
        dropRates: { uncommon: 0.6667, rare: 0.3333 }
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
        dropRates: { common: 0.4444, uncommon: 0.3889, rare: 0.1667 }
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
        dropRates: { uncommon: 0.5555, rare: 0.3175, epic: 0.127 }
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
        dropRates: { uncommon: 0.4478, rare: 0.3731, epic: 0.1791 }
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
        dropRates: { uncommon: 0.5555, rare: 0.3175, epic: 0.127 }
    },
    demon_overlord: {
        name: 'Demon Overlord',
        baseHp: 400,
        baseDamage: 55,
        baseDefense: 35,
        baseXp: 3000,
        baseGold: 2000,
        level: 17,
        possibleDrops: ['demon_core'],
        dropRates: { legendary: 1 }
    },
    corrupted_knight_enemy: {
        name: 'Corrupted Knight',
        baseHp: 350,
        baseDamage: 42,
        baseDefense: 30,
        baseXp: 1800,
        baseGold: 600,
        level: 12,
        possibleDrops: ['cursed_blade', 'dark_armor'],
        dropRates: { epic: 1 }
    },
    ancient_stone_guardian: {
        name: 'Ancient Stone Guardian',
        baseHp: 400,
        baseDamage: 38,
        baseDefense: 45,
        baseXp: 1500,
        baseGold: 500,
        level: 10,
        possibleDrops: ['ancient_relic', 'stone_core'],
        dropRates: { rare: 1 }
    },
    spectral_cultist: {
        name: 'Spectral Cultist',
        baseHp: 280,
        baseDamage: 35,
        baseDefense: 20,
        baseXp: 1400,
        baseGold: 400,
        level: 11,
        possibleDrops: ['cult_artifact', 'spirit_essence'],
        dropRates: { rare: 1 }
    }
};

// Rarity chances
// Total trigger rate: ~15% per exploration tick
// Roll < cumulative threshold to trigger that rarity
const ADVENTURE_RARITY_CHANCES = {
    legendary: 0.01,   // 1.0% — ultra rare story moments
    rare:      0.025,  // 2.5% — special encounters
    uncommon:  0.04,   // 4.0% — interesting finds
    common:    0.075   // 7.5% — everyday encounters
    // Total: 15.0% chance of ANY adventure per explore tick
};

// Helper function to roll for random adventure
function rollForAdventure(playerLevel) {
    const roll = Math.random();
    let cumulative = 0;

    for (const [rarity, chance] of Object.entries(ADVENTURE_RARITY_CHANCES)) {
        cumulative += chance;

        if (roll < cumulative) {
            const eligibleAdventures = Object.values(ADVENTURES)
                .filter(adv => adv.rarity === rarity && playerLevel >= (adv.minLevel || 1));

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