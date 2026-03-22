// class-masters.js - Class Master Boss Database
// These are powerful bosses that must be defeated to progress to new areas.
//
// COMPLETE ZONE UNLOCK CHAIN:
//   forest (lv3) -> riverside (lv6) -> haunted_graveyard (lv9) -> dark_swamp (lv12)
//   -> cursed_ruins (lv15) -> cave (lv18) -> crypt (lv21)
//   -> demon_portal (lv24) -> corrupted_temple (lv25) -> celestial_spire
//
// TOWN 3 PARALLEL TRACK:
//   plains (lv12) -> volcano

const CLASS_MASTERS = {

    // =============================================================
    // FOREST -> RIVERSIDE  (Level 3 Required)
    // =============================================================

    warrior_master_forest: { 
        name: 'Master Swordsman Gareth', 
        class: 'warrior', 
        unlocks: 'riverside',
        baseHp: 200, 
        baseDamage: 30, 
        baseDefense: 20, 
        baseMp: 54,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A legendary warrior guarding the path to the riverside',
        guaranteedDrops: ['steel_sword', 'steel_plate', 'large_gem'],
        possibleDrops: ['warhammer', 'scale_mail', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'gareth_heavy_strike',
                name: 'Power Strike',
                chance: 0.35,
                mpCost: 8,
                telegraph: 'raises his sword high...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `⚔️ ${n} strikes with tremendous force!`
            },
            {
                id: 'gareth_rend',
                name: 'Sundering Strike',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'aims for a gap in your armor...',
                type: 'rend',
                defReduction: 0.2,
                rendDuration: 5000,
                applyMessage: (n, c) => `🛡️ ${n}'s blow tears through your armor!`
            }
        ]
    },

    rogue_master_forest: { 
        name: 'Shadow Master Vex', 
        class: 'rogue', 
        unlocks: 'riverside',
        baseHp: 150, 
        baseDamage: 35, 
        baseDefense: 12, 
        baseMp: 54,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A master assassin who strikes from the shadows',
        guaranteedDrops: ['poison_dagger', 'shadow_armor', 'large_gem'],
        possibleDrops: ['studded_leather', 'health_potion', 'escape_rope'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'vex_backstab',
                name: 'Backstab',
                chance: 0.40,
                mpCost: 8,
                telegraph: 'fades into the shadows...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🗡️ ${n} strikes from behind!`
            },
            {
                id: 'vex_poison',
                name: 'Poison Blade',
                chance: 0.30,
                mpCost: 10,
                telegraph: 'flicks poison from his blade...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 3, tickInterval: 3000, ticks: 3 },
                damageMult: 0.8,
                applyMessage: (n, c) => `💚 ${n}'s poison seeps into your wounds!`
            }
        ]
    },

    paladin_master_forest: { 
        name: 'Knight Commander Aldric', 
        class: 'paladin', 
        unlocks: 'riverside',
        baseHp: 180, 
        baseDamage: 28, 
        baseDefense: 22, 
        baseMp: 66,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A holy knight devoted to justice',
        guaranteedDrops: ['holy_mace', 'chainmail', 'large_gem'],
        possibleDrops: ['divine_hammer', 'steel_plate', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'aldric_smite',
                name: 'Divine Smite',
                chance: 0.35,
                mpCost: 10,
                telegraph: 'glowing light surrounds his weapon...',
                type: 'heavy_hit',
                damageMult: 1.4,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `✨ ${n} smites you with holy power!`
            },
            {
                id: 'aldric_judgment',
                name: 'Judgment',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'raises his weapon to the heavens...',
                type: 'intimidate',
                damagePenalty: 0.15,
                intimidateDuration: 4000,
                applyMessage: (n, c) => `⚡ Divine judgment weakens your resolve!`
            }
        ]
    },

    mage_master_forest: { 
        name: 'Arcane Tutor Zephyr', 
        class: 'mage', 
        unlocks: 'riverside',
        baseHp: 120, 
        baseDamage: 40, 
        baseDefense: 10, 
        baseMp: 54,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'An ancient wizard of immense power',
        guaranteedDrops: ['flame_staff', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['ice_staff', 'mana_potion', 'greater_mana_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'zephyr_fireball',
                name: 'Fireball',
                chance: 0.40,
                mpCost: 10,
                telegraph: 'a ball of flame forms in his palm...',
                type: 'burn',
                dot: { name: 'Burning', icon: '🔥', damage: 4, tickInterval: 3000, ticks: 3 },
                damageMult: 0.6,
                applyMessage: (n, c) => `🔥 ${n} engulfs you in flames!`
            },
            {
                id: 'zephyr_arcane_bolt',
                name: 'Arcane Bolt',
                chance: 0.35,
                mpCost: 8,
                telegraph: 'arcane energy crackles around him...',
                type: 'heavy_hit',
                damageMult: 1.3,
                armorPiercing: 0.05,
                applyMessage: (n, c) => `✨ ${n} strikes you with arcane energy!`
            }
        ]
    },

    cleric_master_forest: { 
        name: 'High Priest Luminus', 
        class: 'cleric', 
        unlocks: 'riverside',
        baseHp: 160, 
        baseDamage: 25, 
        baseDefense: 18, 
        baseMp: 66,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A divine servant with holy powers',
        guaranteedDrops: ['holy_mace', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['divine_hammer', 'greater_health_potion', 'elixir'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'luminus_holy_light',
                name: 'Holy Light',
                chance: 0.35,
                mpCost: 10,
                telegraph: 'divine light gathers in his hands...',
                type: 'heavy_hit',
                damageMult: 1.3,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `✨ ${n} blasts you with holy light!`
            },
            {
                id: 'luminus_divine_wrath',
                name: 'Divine Wrath',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'prays for divine intervention...',
                type: 'intimidate',
                damagePenalty: 0.15,
                intimidateDuration: 4000,
                applyMessage: (n, c) => `⛪ Divine presence weakens your attacks!`
            }
        ]
    },

    ranger_master_forest: { 
        name: 'Hunt Master Theron', 
        class: 'ranger', 
        unlocks: 'riverside',
        baseHp: 140, 
        baseDamage: 32, 
        baseDefense: 15, 
        baseMp: 54,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A master tracker who knows every path in the forest',
        guaranteedDrops: ['hunters_bow', 'studded_leather', 'large_gem'],
        possibleDrops: ['longbow', 'padded_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'theron_piercing_shot',
                name: 'Piercing Shot',
                chance: 0.40,
                mpCost: 8,
                telegraph: 'draws his bow with deadly focus...',
                type: 'heavy_hit',
                damageMult: 1.4,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🏹 ${n}'s arrow pierces your armor!`
            },
            {
                id: 'theron_crippling_shot',
                name: 'Crippling Shot',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'aims at your legs...',
                type: 'rend',
                defReduction: 0.15,
                rendDuration: 4000,
                applyMessage: (n, c) => `🦵 ${n}'s arrow slows your movement!`
            }
        ]
    },

    warlock_master_forest: { 
        name: 'Pact Broker Mordecai', 
        class: 'warlock', 
        unlocks: 'riverside',
        baseHp: 130, 
        baseDamage: 38, 
        baseDefense: 12, 
        baseMp: 42,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A shadowy warlock who made deals with forest spirits',
        guaranteedDrops: ['shadow_tome', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['dark_crystal', 'cursed_robes', 'mana_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'mordecai_shadow_bolt',
                name: 'Shadow Bolt',
                chance: 0.40,
                mpCost: 8,
                telegraph: 'shadow energy pools in his palm...',
                type: 'heavy_hit',
                damageMult: 1.4,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `🌑 ${n} hurls shadow energy at you!`
            },
            {
                id: 'mordecai_life_tap',
                name: 'Life Tap',
                chance: 0.30,
                mpCost: 6,
                telegraph: 'murmurs dark incantations...',
                type: 'drain_hp',
                drainAmount: 12,
                healPercent: 0.6,
                applyMessage: (n, c) => `🩸 ${n} drains your life force!`
            }
        ]
    },

    hunter_master_forest: { 
        name: 'Packleader Rook', 
        class: 'hunter', 
        unlocks: 'riverside',
        baseHp: 155, 
        baseDamage: 30, 
        baseDefense: 14, 
        baseMp: 54,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'A hunter who commands a pack of wolves',
        guaranteedDrops: ['hunters_bow', 'wolf_pelt_armor', 'large_gem'],
        possibleDrops: ['composite_bow', 'padded_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'rook_arrow_volley',
                name: 'Arrow Volley',
                chance: 0.35,
                mpCost: 10,
                telegraph: 'fires a volley of arrows...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.05,
                applyMessage: (n, c) => `🏹 ${n} rains arrows upon you!`
            },
            {
                id: 'rook_wolf_bite',
                name: 'Wolf Strike',
                chance: 0.30,
                mpCost: 8,
                telegraph: 'whistles for his wolf companion...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 3, tickInterval: 3000, ticks: 3 },
                damageMult: 0.8,
                applyMessage: (n, c) => `🐺 The wolf's bite leaves you bleeding!`
            }
        ]
    },

    archer_master_forest: { 
        name: 'Sharpshot Lyra', 
        class: 'archer', 
        unlocks: 'riverside',
        baseHp: 135, 
        baseDamage: 34, 
        baseDefense: 13, 
        baseMp: 54,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: 'An archer who never misses at any distance',
        guaranteedDrops: ['longbow', 'studded_leather', 'large_gem'],
        possibleDrops: ['hunters_bow', 'padded_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'lyra_precision_shot',
                name: 'Precision Shot',
                chance: 0.45,
                mpCost: 8,
                telegraph: 'takes careful aim...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🎯 ${n}'s arrow finds a weak point!`
            },
            {
                id: 'lyra_pinning_shot',
                name: 'Pinning Shot',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'aims at your feet...',
                type: 'debuff',
                debuff: 'slowed',
                debuffDuration: 4000,
                damageMult: 0.5,
                applyMessage: (n, c) => `🦶 ${n}'s arrow pins you in place!`
            }
        ]
    },

    acolyte_master_forest: { 
        name: 'Grove Warden Syla', 
        class: 'acolyte', 
        unlocks: 'riverside',
        baseHp: 150, 
        baseDamage: 27, 
        baseDefense: 16, 
        baseMp: 66,
        level: 3, 
        requiredLevel: 3, 
        xp: 150, 
        gold: 200,
        description: "A forest acolyte who channels nature's wrath",
        guaranteedDrops: ['holy_mace', 'padded_armor', 'large_gem'],
        possibleDrops: ['enchanted_robes', 'greater_health_potion', 'elixir'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 },
        abilities: [
            {
                id: 'syla_natures_wrath',
                name: "Nature's Wrath",
                chance: 0.35,
                mpCost: 10,
                telegraph: 'vines and roots rise around her...',
                type: 'heavy_hit',
                damageMult: 1.3,
                armorPiercing: 0,
                applyMessage: (n, c) => `🌿 ${n} strikes you with nature's fury!`
            },
            {
                id: 'syla_thorn_vines',
                name: 'Thorn Vines',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'thorny vines reach toward you...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 3, tickInterval: 3000, ticks: 3 },
                damageMult: 0.7,
                applyMessage: (n, c) => `🌹 Thorn vines tear at your flesh!`
            }
        ]
    },

    // =============================================================
    // RIVERSIDE -> HAUNTED GRAVEYARD  (Level 6 Required)
    // =============================================================

    warrior_master_riverside: { 
        name: 'War Chief Brutus', 
        class: 'warrior', 
        unlocks: 'haunted_graveyard',
        baseHp: 350, 
        baseDamage: 45, 
        baseDefense: 30, 
        baseMp: 108,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A brutal warlord who controls the riverside crossing',
        guaranteedDrops: ['bastard_sword', 'plate_mail', 'huge_gem'],
        possibleDrops: ['warhammer', 'mithril_chainmail', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'brutus_cleave',
                name: 'Cleave',
                chance: 0.40,
                mpCost: 12,
                telegraph: 'winds up a massive swing...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `⚔️ ${n}'s massive blade cleaves through your armor!`
            },
            {
                id: 'brutus_intimidating_roar',
                name: 'Intimidating Roar',
                chance: 0.30,
                mpCost: 10,
                telegraph: 'lets out a deafening roar...',
                type: 'intimidate',
                damagePenalty: 0.20,
                intimidateDuration: 5000,
                applyMessage: (n, c) => `😨 ${n}'s roar shakes you to your core!`
            },
            {
                id: 'brutus_crushing_blow',
                name: 'Crushing Blow',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'brings his weapon down with full force...',
                type: 'rend',
                defReduction: 0.25,
                rendDuration: 6000,
                applyMessage: (n, c) => `💥 ${n}'s blow shatters your defenses!`
            }
        ]
    },

    rogue_master_riverside: { 
        name: 'Blade Dancer Nyx', 
        class: 'rogue', 
        unlocks: 'haunted_graveyard',
        baseHp: 280, 
        baseDamage: 52, 
        baseDefense: 20, 
        baseMp: 72,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A deadly river pirate who moves like the current',
        guaranteedDrops: ['cursed_sword', 'demon_leather', 'huge_gem'],
        possibleDrops: ['shadowblade', 'shadow_armor', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'nyx_flurry',
                name: 'Blade Flurry',
                chance: 0.40,
                mpCost: 12,
                telegraph: 'spins her blades in a deadly dance...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `🗡️ ${n}'s blades strike from all directions!`
            },
            {
                id: 'nyx_bleeding_cuts',
                name: 'Bleeding Cuts',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'slashes with surgical precision...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 5, tickInterval: 3000, ticks: 4 },
                damageMult: 0.7,
                applyMessage: (n, c) => `🩸 ${n}'s cuts leave you bleeding profusely!`
            }
        ]
    },

    paladin_master_riverside: { 
        name: 'Crusader Lord Marcus', 
        class: 'paladin', 
        unlocks: 'haunted_graveyard',
        baseHp: 320, 
        baseDamage: 42, 
        baseDefense: 32, 
        baseMp: 123,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A zealous crusader who purges the waterways of evil',
        guaranteedDrops: ['divine_hammer', 'mithril_chainmail', 'huge_gem'],
        possibleDrops: ['holy_mace', 'steel_plate', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'marcus_holy_strike',
                name: 'Holy Strike',
                chance: 0.40,
                mpCost: 12,
                telegraph: 'his weapon glows with holy light...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `✨ ${n} smites you with divine fury!`
            },
            {
                id: 'marcus_divine_judgment',
                name: 'Divine Judgment',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'calls upon the heavens...',
                type: 'intimidate',
                damagePenalty: 0.20,
                intimidateDuration: 5000,
                applyMessage: (n, c) => `⚡ Divine judgment weakens your spirit!`
            },
            {
                id: 'marcus_holy_light',
                name: 'Holy Light',
                chance: 0.20,
                mpCost: 15,
                telegraph: 'radiant energy gathers around him...',
                type: 'heal',
                minPower: 30,
                maxPower: 50,
                applyMessage: (n, c) => `💚 ${n} channels holy energy to heal himself!`
            }
        ]
    },

    mage_master_riverside: { 
        name: 'Sorcerer Malzahar', 
        class: 'mage', 
        unlocks: 'haunted_graveyard',
        baseHp: 220, 
        baseDamage: 60, 
        baseDefense: 18, 
        baseMp: 108,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: "A water sorcerer who commands the river's power",
        guaranteedDrops: ['ice_staff', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['archmage_staff', 'enchanted_robes', 'superior_mana_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'malzahar_water_blast',
                name: 'Water Blast',
                chance: 0.40,
                mpCost: 10,
                telegraph: 'water swirls around his hands...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0,
                applyMessage: (n, c) => `💧 ${n} blasts you with pressurized river water!`
            },
            {
                id: 'malzahar_tidal_curse',
                name: 'Tidal Curse',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'muttering arcane words, the river rises...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 4000,
                hitMissChance: 0.30,
                damageMult: 0,
                applyMessage: (n, c) => `🌊 ${n} sprays blinding water in your eyes!`
            },
            {
                id: 'malzahar_river_drain',
                name: 'River Drain',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'draws water from the river to heal...',
                type: 'drain_hp',
                drainAmount: 22,
                healPercent: 0.75,
                applyMessage: (n, c) => `💙 ${n} drains your vitality to heal from the river's flow!`
            }
        ]
    },

    cleric_master_riverside: { 
        name: 'Cardinal Seraphina', 
        class: 'cleric', 
        unlocks: 'haunted_graveyard',
        baseHp: 290, 
        baseDamage: 38, 
        baseDefense: 26, 
        baseMp: 126,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A high-ranking church official who guards the sacred ford',
        guaranteedDrops: ['divine_hammer', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['holy_mace', 'mithril_chainmail', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'seraphina_holy_nova',
                name: 'Holy Nova',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'radiant light bursts outward...',
                type: 'heavy_hit',
                damageMult: 1.4,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `✨ ${n} blasts you with holy light!`
            },
            {
                id: 'seraphina_divine_blessing',
                name: 'Divine Blessing',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'prays for divine protection...',
                type: 'heal',
                minPower: 35,
                maxPower: 55,
                applyMessage: (n, c) => `💚 ${n} heals herself with divine power!`
            },
            {
                id: 'seraphina_holy_wrath',
                name: 'Holy Wrath',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'divine fire gathers around her...',
                type: 'intimidate',
                damagePenalty: 0.20,
                intimidateDuration: 5000,
                applyMessage: (n, c) => `⛪ Divine wrath weakens your attacks!`
            }
        ]
    },

    ranger_master_riverside: { 
        name: 'Beastlord Kael', 
        class: 'ranger', 
        unlocks: 'haunted_graveyard',
        baseHp: 270, 
        baseDamage: 48, 
        baseDefense: 24, 
        baseMp: 108,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A ranger who commands the beasts of the riverlands',
        guaranteedDrops: ['elven_bow', 'demon_leather', 'huge_gem'],
        possibleDrops: ['longbow', 'studded_leather', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'kael_piercing_arrow',
                name: 'Piercing Arrow',
                chance: 0.40,
                mpCost: 10,
                telegraph: 'draws back with deadly precision...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.2,
                applyMessage: (n, c) => `🏹 ${n}'s arrow punches through your armor!`
            },
            {
                id: 'kael_beast_call',
                name: 'Call of the Wild',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'lets out a piercing whistle...',
                type: 'summon',
                summonKey: 'wolf',
                summonCount: 1,
                maxSummons: 2,
                applyMessage: (n, c) => `🐺 ${n} calls a wolf to his aid!`
            },
            {
                id: 'kael_crippling_shot',
                name: 'Crippling Shot',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'aims at your legs...',
                type: 'rend',
                defReduction: 0.2,
                rendDuration: 5000,
                applyMessage: (n, c) => `🦵 ${n}'s arrow slows your movement!`
            }
        ]
    },

    warlock_master_riverside: { 
        name: 'Shadowlord Xalthar', 
        class: 'warlock', 
        unlocks: 'haunted_graveyard',
        baseHp: 250, 
        baseDamage: 55, 
        baseDefense: 22, 
        baseMp: 108,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: "A dark warlock who draws power from the murky depths",
        guaranteedDrops: ['void_staff', 'cursed_robes', 'huge_gem'],
        possibleDrops: ['shadow_tome', 'dark_crystal', 'greater_mana_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'xalthar_shadow_bolt',
                name: 'Shadow Bolt',
                chance: 0.40,
                mpCost: 10,
                telegraph: 'shadow energy coalesces in his hands...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `🌑 ${n} hurls a bolt of shadow!`
            },
            {
                id: 'xalthar_life_drain',
                name: 'Life Drain',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'reaches out with shadowy tendrils...',
                type: 'drain_hp',
                drainAmount: 20,
                healPercent: 0.8,
                applyMessage: (n, c) => `🩸 ${n} drains your life essence!`
            },
            {
                id: 'xalthar_shadow_word',
                name: 'Shadow Word',
                chance: 0.20,
                mpCost: 14,
                telegraph: 'whispers a dark incantation...',
                type: 'debuff',
                debuff: 'silenced',
                debuffDuration: 4000,
                damageMult: 0,
                applyMessage: (n, c) => `🔇 ${n}'s dark magic silences your spells!`
            }
        ]
    },

    hunter_master_riverside: { 
        name: 'Alpha Commander Varg', 
        class: 'hunter', 
        unlocks: 'haunted_graveyard',
        baseHp: 280, 
        baseDamage: 45, 
        baseDefense: 26, 
        baseMp: 108,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A hunter who leads a pack of river wolves',
        guaranteedDrops: ['composite_bow', 'wolf_pelt_armor', 'huge_gem'],
        possibleDrops: ['hunters_bow', 'beast_fang_necklace', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'varg_arrow_volley',
                name: 'Volley Fire',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'fires a volley of arrows into the air...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.05,
                applyMessage: (n, c) => `🏹 ${n} rains arrows upon you!`
            },
            {
                id: 'varg_pack_attack',
                name: 'Pack Attack',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'whistles for his pack...',
                type: 'summon',
                summonKey: 'wolf',
                summonCount: 1,
                maxSummons: 2,
                applyMessage: (n, c) => `🐺 ${n} calls his wolves to attack!`
            },
            {
                id: 'varg_bleeding_wound',
                name: 'Bleeding Wound',
                chance: 0.30,
                mpCost: 10,
                telegraph: 'aims for a vital area...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 6, tickInterval: 3000, ticks: 4 },
                damageMult: 0.7,
                applyMessage: (n, c) => `🩸 ${n}'s arrow leaves a deep, bleeding wound!`
            }
        ]
    },

    archer_master_riverside: { 
        name: 'Siege Captain Lyra', 
        class: 'archer', 
        unlocks: 'haunted_graveyard',
        baseHp: 260, 
        baseDamage: 50, 
        baseDefense: 22, 
        baseMp: 114,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A battle-hardened captain who held the river bridge for a decade',
        guaranteedDrops: ['elven_bow', 'studded_leather', 'huge_gem'],
        possibleDrops: ['longbow', 'demon_leather', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'lyra2_sniper_shot',
                name: 'Sniper Shot',
                chance: 0.45,
                mpCost: 12,
                telegraph: 'takes careful aim at your weak point...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.25,
                applyMessage: (n, c) => `🎯 ${n}'s shot finds the crack in your armor!`
            },
            {
                id: 'lyra2_pinning_shot',
                name: 'Pinning Shot',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'aims at your feet...',
                type: 'debuff',
                debuff: 'slowed',
                debuffDuration: 5000,
                damageMult: 0.5,
                applyMessage: (n, c) => `🦶 ${n}'s arrow pins you in place!`
            },
            {
                id: 'lyra2_rapid_shot',
                name: 'Rapid Shot',
                chance: 0.20,
                mpCost: 14,
                telegraph: 'fires two arrows in quick succession...',
                type: 'heavy_hit',
                damageMult: 1.3,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `🏹 ${n} fires a second arrow before you can react!`
            }
        ]
    },

    acolyte_master_riverside: { 
        name: 'Zealot Confessor Maren', 
        class: 'acolyte', 
        unlocks: 'haunted_graveyard',
        baseHp: 275, 
        baseDamage: 40, 
        baseDefense: 24, 
        baseMp: 117,
        level: 6, 
        requiredLevel: 6, 
        xp: 300, 
        gold: 400,
        description: 'A fanatical acolyte whose faith has been tested in battle',
        guaranteedDrops: ['divine_hammer', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['holy_mace', 'padded_armor', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 },
        abilities: [
            {
                id: 'maren_divine_light',
                name: 'Divine Light',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'holy light radiates from her...',
                type: 'heavy_hit',
                damageMult: 1.4,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `✨ ${n} smites you with divine light!`
            },
            {
                id: 'maren_purge',
                name: 'Purge',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'prays for your sins to be punished...',
                type: 'intimidate',
                damagePenalty: 0.20,
                intimidateDuration: 5000,
                applyMessage: (n, c) => `⛪ Your sins weigh heavily — attacks weakened!`
            },
            {
                id: 'maren_divine_heal',
                name: 'Divine Healing',
                chance: 0.25,
                mpCost: 15,
                telegraph: 'kneels in prayer...',
                type: 'heal',
                minPower: 35,
                maxPower: 55,
                applyMessage: (n, c) => `💚 ${n} heals herself with divine power!`
            }
        ]
    },

    // =============================================================
    // HAUNTED GRAVEYARD -> DARK SWAMP  (Level 9 Required)
    // =============================================================

    warrior_master_graveyard: { 
        name: 'Warlord Draven', 
        class: 'warrior', 
        unlocks: 'dark_swamp',
        baseHp: 500, 
        baseDamage: 65, 
        baseDefense: 40, 
        baseMp: 108,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A risen warlord who conquered death itself',
        guaranteedDrops: ['excalibur', 'dragon_scale', 'pristine_gem'],
        possibleDrops: ['dragonslayer', 'adamantine_plate', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'draven_death_strike',
                name: 'Death Strike',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'raises his blade, channeling dark energy...',
                type: 'heavy_hit',
                damageMult: 1.8,
                armorPiercing: 0.2,
                applyMessage: (n, c) => `💀 ${n} strikes with the power of death itself!`
            },
            {
                id: 'draven_soul_rend',
                name: 'Soul Rend',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'dark energy gathers around his weapon...',
                type: 'drain_hp',
                drainAmount: 28,
                healPercent: 0.7,
                applyMessage: (n, c) => `🩸 ${n} tears at your very soul!`
            },
            {
                id: 'draven_armor_break',
                name: 'Armor Break',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'strikes with crushing force...',
                type: 'rend',
                defReduction: 0.3,
                rendDuration: 6000,
                applyMessage: (n, c) => `💥 ${n}'s blow shatters your armor!`
            }
        ]
    },

    rogue_master_graveyard: { 
        name: 'Shadow King Erebus', 
        class: 'rogue', 
        unlocks: 'dark_swamp',
        baseHp: 420, 
        baseDamage: 75, 
        baseDefense: 28, 
        baseMp: 114,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: "An undead master of shadows ruling the graveyard's dark corners",
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'erebus_shadow_strike',
                name: 'Shadow Strike',
                chance: 0.45,
                mpCost: 12,
                telegraph: 'melts into the shadows...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.25,
                applyMessage: (n, c) => `🌑 ${n} strikes from the darkness!`
            },
            {
                id: 'erebus_bleeding_wounds',
                name: 'Bleeding Wounds',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'slashes with shadow-forged blades...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 7, tickInterval: 3000, ticks: 4 },
                damageMult: 0.7,
                applyMessage: (n, c) => `🩸 ${n}'s shadow blades leave you bleeding!`
            },
            {
                id: 'erebus_shadow_blind',
                name: 'Shadow Blind',
                chance: 0.20,
                mpCost: 14,
                telegraph: 'throws a cloud of shadow dust...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                applyMessage: (n, c) => `👁️ ${n} blinds you with shadow magic!`
            }
        ]
    },

    paladin_master_graveyard: { 
        name: 'Grand Templar Solarius', 
        class: 'paladin', 
        unlocks: 'dark_swamp',
        baseHp: 480, 
        baseDamage: 58, 
        baseDefense: 45, 
        baseMp: 135,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A fallen holy knight guarding the boundary between life and death',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'dragon_scale', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'solarius_holy_smite',
                name: 'Holy Smite',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'his blade glows with divine light...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `✨ ${n} smites you with holy power!`
            },
            {
                id: 'solarius_divine_heal',
                name: 'Divine Healing',
                chance: 0.30,
                mpCost: 16,
                telegraph: 'kneels and prays for strength...',
                type: 'heal',
                minPower: 45,
                maxPower: 70,
                applyMessage: (n, c) => `💚 ${n} heals himself with divine power!`
            },
            {
                id: 'solarius_holy_judgment',
                name: 'Holy Judgment',
                chance: 0.25,
                mpCost: 15,
                telegraph: 'raises his weapon to the sky...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 6000,
                applyMessage: (n, c) => `⚡ Divine judgment weakens your resolve!`
            }
        ]
    },

    mage_master_graveyard: { 
        name: 'Archmage Chronos', 
        class: 'mage', 
        unlocks: 'dark_swamp',
        baseHp: 350, 
        baseDamage: 85, 
        baseDefense: 25, 
        baseMp: 126,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A necromancer-mage who has mastered time as well as death',
        guaranteedDrops: ['archmage_staff', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['staff_of_eternity', 'phoenix_robes', 'superior_mana_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'chronos_time_bolt',
                name: 'Time Bolt',
                chance: 0.40,
                mpCost: 12,
                telegraph: 'energy warps around his staff...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `⏰ ${n} strikes you with temporal energy!`
            },
            {
                id: 'chronos_aging_curse',
                name: 'Aging Curse',
                chance: 0.35,
                mpCost: 14,
                telegraph: 'murmurs a spell that ages the air around him...',
                type: 'debuff',
                debuff: 'weakened',
                debuffDuration: 6000,
                damageReduction: 0.2,
                damageMult: 0,
                applyMessage: (n, c) => `🕰️ ${n} ages you with a curse — weakened!`
            },
            {
                id: 'chronos_arcane_blast',
                name: 'Arcane Blast',
                chance: 0.20,
                mpCost: 16,
                telegraph: 'gathers immense arcane power...',
                type: 'heavy_hit',
                damageMult: 2.0,
                armorPiercing: 0.2,
                applyMessage: (n, c) => `✨ ${n} unleashes a devastating arcane blast!`
            }
        ]
    },

    cleric_master_graveyard: { 
        name: 'Saint Evangeline', 
        class: 'cleric', 
        unlocks: 'dark_swamp',
        baseHp: 440, 
        baseDamage: 52, 
        baseDefense: 38, 
        baseMp: 126,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A living saint who descended into the graveyard to cleanse it',
        guaranteedDrops: ['mjolnir', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'evangeline_holy_light',
                name: 'Holy Light',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'radiant light gathers in her hands...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `✨ ${n} blasts you with holy light!`
            },
            {
                id: 'evangeline_divine_heal',
                name: 'Divine Healing',
                chance: 0.35,
                mpCost: 16,
                telegraph: 'prays for the graveyard\'s souls...',
                type: 'heal',
                minPower: 50,
                maxPower: 75,
                applyMessage: (n, c) => `💚 ${n} channels divine energy to heal!`
            },
            {
                id: 'evangeline_purify',
                name: 'Purify',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'holy energy radiates outward...',
                type: 'dispel',
                buffSlots: 2,
                applyMessage: (n, c) => `✨ ${n} dispels your magic!`
            }
        ]
    },

    ranger_master_graveyard: { 
        name: 'Specter Huntress Artemis', 
        class: 'ranger', 
        unlocks: 'dark_swamp',
        baseHp: 400, 
        baseDamage: 68, 
        baseDefense: 32, 
        baseMp: 126,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A ghost ranger who hunts the undead for sport',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'artemis_ghost_arrow',
                name: 'Ghost Arrow',
                chance: 0.45,
                mpCost: 12,
                telegraph: 'an ethereal arrow materializes...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.25,
                applyMessage: (n, c) => `🏹 ${n} fires an arrow that phases through armor!`
            },
            {
                id: 'artemis_spirit_binding',
                name: 'Spirit Binding',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'draws on the power of restless spirits...',
                type: 'debuff',
                debuff: 'weakened',
                debuffDuration: 6000,
                damageReduction: 0.2,
                damageMult: 0,
                applyMessage: (n, c) => `👻 Bound spirits drain your strength!`
            },
            {
                id: 'artemis_spectral_volley',
                name: 'Spectral Volley',
                chance: 0.20,
                mpCost: 16,
                telegraph: 'multiple spectral arrows appear...',
                type: 'aoe',
                damageMult: 1.3,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `🏹🏹 ${n} unleashes a volley of spectral arrows!`
            }
        ]
    },

    warlock_master_graveyard: { 
        name: 'Archfiend Malzahar', 
        class: 'warlock', 
        unlocks: 'dark_swamp',
        baseHp: 380, 
        baseDamage: 78, 
        baseDefense: 28, 
        baseMp: 129,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: "A warlock who feeds on the souls of the graveyard's dead",
        guaranteedDrops: ['demon_staff', 'cursed_robes', 'pristine_gem'],
        possibleDrops: ['void_staff', 'shadow_grimoire', 'superior_mana_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'malzahar_soul_drain',
                name: 'Soul Drain',
                chance: 0.35,
                mpCost: 15,
                telegraph: 'reaches toward you with shadowy claws...',
                type: 'drain_hp',
                drainAmount: 30,
                healPercent: 0.8,
                applyMessage: (n, c) => `💀 ${n} drains your life force to heal himself!`
            },
            {
                id: 'malzahar_shadow_blast',
                name: 'Shadow Blast',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'dark energy swirls around his hands...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.20,
                applyMessage: (n, c) => `🌑 ${n} blasts you with concentrated shadow energy!`
            },
            {
                id: 'malzahar_nether_grasp',
                name: 'Nether Grasp',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'calls upon the void to bind you...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                applyMessage: (n, c) => `🌀 ${n} wraps you in nether energy! You can't see!`
            }
        ]
    },

    hunter_master_graveyard: { 
        name: 'Bonehound Fang', 
        class: 'hunter', 
        unlocks: 'dark_swamp',
        baseHp: 420, 
        baseDamage: 62, 
        baseDefense: 34, 
        baseMp: 114,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A hunter bonded with an undead direwolf companion',
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem'],
        possibleDrops: ['composite_bow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'fang_bone_arrow',
                name: 'Bone Arrow',
                chance: 0.40,
                mpCost: 12,
                telegraph: 'notches a bleached-white arrow...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🏹 ${n} fires a razor-sharp bone arrow!`
            },
            {
                id: 'fang_wolf_strike',
                name: 'Wolf Strike',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'whistles for his undead wolf...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 7, tickInterval: 3000, ticks: 4 },
                damageMult: 0.7,
                applyMessage: (n, c) => `🐺 The undead wolf's bite leaves you bleeding!`
            },
            {
                id: 'fang_death_howl',
                name: 'Death Howl',
                chance: 0.20,
                mpCost: 14,
                telegraph: 'lets out a mournful howl...',
                type: 'intimidate',
                damagePenalty: 0.25,
                intimidateDuration: 6000,
                applyMessage: (n, c) => `🌕 ${n}'s howl freezes your blood!`
            }
        ]
    },

    archer_master_graveyard: { 
        name: 'Phantom Bowyer Isen', 
        class: 'archer', 
        unlocks: 'dark_swamp',
        baseHp: 390, 
        baseDamage: 72, 
        baseDefense: 30, 
        baseMp: 126,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A spectral archer whose arrows can strike the living and the dead',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'isen_phantom_arrow',
                name: 'Phantom Arrow',
                chance: 0.45,
                mpCost: 12,
                telegraph: 'an arrow of pure ghostly energy forms...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.25,
                applyMessage: (n, c) => `🏹 ${n} fires an arrow that passes through armor!`
            },
            {
                id: 'isen_spirit_tether',
                name: 'Spirit Tether',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'a ghostly chain materializes...',
                type: 'drain_hp',
                drainAmount: 25,
                healPercent: 0.7,
                applyMessage: (n, c) => `⛓️ ${n} tethers your spirit, draining life!`
            },
            {
                id: 'isen_ghost_volley',
                name: 'Ghost Volley',
                chance: 0.20,
                mpCost: 16,
                telegraph: 'multiple ghostly arrows fill the air...',
                type: 'aoe',
                damageMult: 1.3,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🏹🏹 ${n} unleashes a volley of ghost arrows!`
            }
        ]
    },

    acolyte_master_graveyard: { 
        name: 'Inquisitor Valdris', 
        class: 'acolyte', 
        unlocks: 'dark_swamp',
        baseHp: 430, 
        baseDamage: 55, 
        baseDefense: 36, 
        baseMp: 120,
        level: 9, 
        requiredLevel: 9, 
        xp: 500, 
        gold: 600,
        description: 'A hardened inquisitor who hunts the undead in their own domain',
        guaranteedDrops: ['mjolnir', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'mithril_chainmail', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 },
        abilities: [
            {
                id: 'valdris_holy_judgment',
                name: 'Holy Judgment',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'holy fire gathers around him...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `🔥 ${n} judges you with holy fire!`
            },
            {
                id: 'valdris_exorcism',
                name: 'Exorcism',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'chants words of power...',
                type: 'dispel',
                buffSlots: 2,
                applyMessage: (n, c) => `✨ ${n} dispels your magic!`
            },
            {
                id: 'valdris_divine_smite',
                name: 'Divine Smite',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'divine energy concentrates in his weapon...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.2,
                applyMessage: (n, c) => `⚡ ${n} smites you with divine power!`
            }
        ]
    },

    // =============================================================
    // DARK SWAMP -> CURSED RUINS  (Level 12 Required)
    // =============================================================

    warrior_master_swamp: { 
        name: 'Bog Iron Gorath', 
        class: 'warrior', 
        unlocks: 'cursed_ruins',
        baseHp: 680, 
        baseDamage: 80, 
        baseDefense: 52, 
        baseMp: 120,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'A massive warrior encrusted with swamp iron and dark magic',
        guaranteedDrops: ['dragonslayer', 'adamantine_plate', 'pristine_gem'],
        possibleDrops: ['titan_blade', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'gorath_crushing_blow',
                name: 'Crushing Blow',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'raises his massive weapon overhead...',
                type: 'heavy_hit',
                damageMult: 1.9,
                armorPiercing: 0.25,
                applyMessage: (n, c) => `💥 ${n} brings down a crushing blow!`
            },
            {
                id: 'gorath_iron_rend',
                name: 'Iron Rend',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'his rusted blade scrapes against your armor...',
                type: 'rend',
                defReduction: 0.35,
                rendDuration: 7000,
                applyMessage: (n, c) => `🛡️ ${n} tears through your defenses!`
            },
            {
                id: 'gorath_bog_curse',
                name: 'Bog Curse',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'dark swamp magic flows from his body...',
                type: 'debuff',
                debuff: 'poisoned',
                debuffDuration: 8000,
                damageMult: 0,
                applyMessage: (n, c) => `🌿 ${n} curses you with swamp poison!`
            }
        ]
    },

    rogue_master_swamp: { 
        name: 'Venomfang Siris', 
        class: 'rogue', 
        unlocks: 'cursed_ruins',
        baseHp: 560, 
        baseDamage: 90, 
        baseDefense: 36, 
        baseMp: 114,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: "An assassin who coats her blades in the swamp's deadliest toxins",
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'siris_deadly_strike',
                name: 'Deadly Strike',
                chance: 0.45,
                mpCost: 12,
                telegraph: 'her blades glisten with venom...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.2,
                applyMessage: (n, c) => `🗡️ ${n} strikes with venom-coated blades!`
            },
            {
                id: 'siris_venom_wound',
                name: 'Venom Wound',
                chance: 0.40,
                mpCost: 12,
                telegraph: 'slashes with poison-dripping daggers...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 8, tickInterval: 3000, ticks: 5 },
                damageMult: 0.6,
                applyMessage: (n, c) => `💚 ${n}'s venom seeps into your bloodstream!`
            },
            {
                id: 'siris_crippling_venom',
                name: 'Crippling Venom',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'aims for your joints...',
                type: 'debuff',
                debuff: 'weakened',
                debuffDuration: 6000,
                damageReduction: 0.25,
                damageMult: 0,
                applyMessage: (n, c) => `🦵 ${n}'s venom weakens your muscles!`
            }
        ]
    },

    paladin_master_swamp: { 
        name: 'Tainted Crusader Mael', 
        class: 'paladin', 
        unlocks: 'cursed_ruins',
        baseHp: 640, 
        baseDamage: 72, 
        baseDefense: 55, 
        baseMp: 132,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'A paladin corrupted by swamp magic wielding both holy and poison power',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'adamantine_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'mael_corrupted_smite',
                name: 'Corrupted Smite',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'dark light gathers around his weapon...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.2,
                applyMessage: (n, c) => `💀 ${n} strikes with corrupted holy power!`
            },
            {
                id: 'mael_tainted_heal',
                name: 'Tainted Healing',
                chance: 0.30,
                mpCost: 16,
                telegraph: 'swamp magic flows into his wounds...',
                type: 'heal',
                minPower: 50,
                maxPower: 80,
                applyMessage: (n, c) => `💚 ${n} draws swamp energy to heal!`
            },
            {
                id: 'mael_poison_shield',
                name: 'Poison Shield',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'a cloud of poison surrounds him...',
                type: 'debuff',
                debuff: 'poisoned',
                debuffDuration: 6000,
                damageMult: 0,
                applyMessage: (n, c) => `💨 ${n} surrounds himself with poisonous gas!`
            }
        ]
    },

    mage_master_swamp: { 
        name: 'Swamp Oracle Hexara', 
        class: 'mage', 
        unlocks: 'cursed_ruins',
        baseHp: 480, 
        baseDamage: 102, 
        baseDefense: 32, 
        baseMp: 120,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'An oracle mage who reads the future in poison vapors',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'hexara_poison_cloud',
                name: 'Poison Cloud',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'conjures a cloud of toxic gas...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 9, tickInterval: 3000, ticks: 5 },
                damageMult: 0.5,
                applyMessage: (n, c) => `💨 ${n} engulfs you in poisonous fumes!`
            },
            {
                id: 'hexara_vision_strike',
                name: 'Vision Strike',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'murmurs prophetic words...',
                type: 'heavy_hit',
                damageMult: 1.6,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `👁️ ${n} strikes where you will be, not where you are!`
            },
            {
                id: 'hexara_bog_drain',
                name: 'Bog Drain',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'the swamp reaches for you...',
                type: 'drain_hp',
                drainAmount: 28,
                healPercent: 0.7,
                applyMessage: (n, c) => `🌿 The swamp itself drains your vitality!`
            }
        ]
    },

    cleric_master_swamp: { 
        name: 'Bog Witch Matriarch Ysolde', 
        class: 'cleric', 
        unlocks: 'cursed_ruins',
        baseHp: 600, 
        baseDamage: 68, 
        baseDefense: 45, 
        baseMp: 132,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'A cleric who merged her faith with swamp spirit worship',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'ysolde_spirit_blessing',
                name: 'Spirit Blessing',
                chance: 0.35,
                mpCost: 16,
                telegraph: 'calls upon the swamp spirits...',
                type: 'heal',
                minPower: 55,
                maxPower: 85,
                applyMessage: (n, c) => `🌿 ${n} heals with swamp spirit power!`
            },
            {
                id: 'ysolde_curse_of_bog',
                name: 'Curse of the Bog',
                chance: 0.35,
                mpCost: 14,
                telegraph: 'chants a curse in a forgotten tongue...',
                type: 'debuff',
                debuff: 'weakened',
                debuffDuration: 7000,
                damageReduction: 0.25,
                damageMult: 0,
                applyMessage: (n, c) => `🔮 The swamp curses you — weakened!`
            },
            {
                id: 'ysolde_spirit_vengeance',
                name: 'Spirit Vengeance',
                chance: 0.25,
                mpCost: 14,
                telegraph: 'wrathful spirits gather around her...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.1,
                applyMessage: (n, c) => `👻 Angry spirits lash out at you!`
            }
        ]
    },

    ranger_master_swamp: { 
        name: 'Murk Stalker Lorn', 
        class: 'ranger', 
        unlocks: 'cursed_ruins',
        baseHp: 540, 
        baseDamage: 82, 
        baseDefense: 40, 
        baseMp: 102,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'A ranger who can navigate the swamp blindfolded and never miss a shot',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'lorn_murk_arrow',
                name: 'Murk Arrow',
                chance: 0.45,
                mpCost: 12,
                telegraph: 'an arrow coated in swamp slime...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 7, tickInterval: 3000, ticks: 4 },
                damageMult: 0.8,
                applyMessage: (n, c) => `💚 ${n}'s poisoned arrow finds its mark!`
            },
            {
                id: 'lorn_precision_shot',
                name: 'Precision Shot',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'takes a moment to line up the perfect shot...',
                type: 'heavy_hit',
                damageMult: 1.8,
                armorPiercing: 0.3,
                applyMessage: (n, c) => `🎯 ${n}'s arrow pierces your defenses!`
            },
            {
                id: 'lorn_swamp_senses',
                name: 'Swamp Senses',
                chance: 0.20,
                mpCost: 10,
                telegraph: 'vanishes into the mist...',
                type: 'heavy_hit',
                damageMult: 1.4,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🌫️ ${n} appears from the mist and strikes!`
            }
        ]
    },

    warlock_master_swamp: { 
        name: 'Plague Summoner Vael', 
        class: 'warlock', 
        unlocks: 'cursed_ruins',
        baseHp: 520, 
        baseDamage: 95, 
        baseDefense: 38, 
        baseMp: 138,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'A warlock who commands plague spirits and bog demons',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'vael_plague_blast',
                name: 'Plague Blast',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'swamp sickness condenses into a ball...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 9, tickInterval: 3000, ticks: 5 },
                damageMult: 0.6,
                applyMessage: (n, c) => `🤢 ${n} blasts you with concentrated plague!`
            },
            {
                id: 'vael_summon_bog_demon',
                name: 'Summon Bog Demon',
                chance: 0.25,
                mpCost: 18,
                telegraph: 'calls upon the swamp\'s darkest depths...',
                type: 'summon',
                summonKey: 'demon_imp',
                summonCount: 1,
                maxSummons: 2,
                applyMessage: (n, c) => `😈 ${n} summons a bog demon to fight for him!`
            },
            {
                id: 'vael_plague_life_drain',
                name: 'Plague Drain',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'pestilent energy reaches for you...',
                type: 'drain_hp',
                drainAmount: 28,
                healPercent: 0.8,
                applyMessage: (n, c) => `🩸 ${n} drains your life with plague energy!`
            }
        ]
    },

    hunter_master_swamp: { 
        name: 'Hydra Tamer Krix', 
        class: 'hunter', 
        unlocks: 'cursed_ruins',
        baseHp: 560, 
        baseDamage: 78, 
        baseDefense: 42, 
        baseMp: 138,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'A hunter who tamed a venomous hydra as a companion',
        guaranteedDrops: ['dragonbone_bow', 'beast_king_armor', 'pristine_gem'],
        possibleDrops: ['godbow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'krix_hydra_strike',
                name: 'Hydra Strike',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'whistles to his hydra companion...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `🐍 The hydra strikes with multiple heads!`
            },
            {
                id: 'krix_poison_arrow',
                name: 'Poison Arrow',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'notches an arrow coated in hydra venom...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 8, tickInterval: 3000, ticks: 5 },
                damageMult: 0.7,
                applyMessage: (n, c) => `💚 ${n}'s hydra-venom arrow poisons you!`
            },
            {
                id: 'krix_summon_hydra',
                name: 'Summon Hydra',
                chance: 0.20,
                mpCost: 20,
                telegraph: 'calls forth the full power of his hydra...',
                type: 'summon',
                summonKey: 'hydra_head',
                summonCount: 1,
                maxSummons: 3,
                applyMessage: (n, c) => `🐉 ${n} summons another hydra head to fight!`
            }
        ]
    },

    archer_master_swamp: { 
        name: 'Poison Arrow Dex', 
        class: 'archer', 
        unlocks: 'cursed_ruins',
        baseHp: 530, 
        baseDamage: 86, 
        baseDefense: 38, 
        baseMp: 114,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'An archer whose arrows are tipped with swamp venom that corrodes armor',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'dex_corrosive_arrow',
                name: 'Corrosive Arrow',
                chance: 0.40,
                mpCost: 14,
                telegraph: 'an arrow dripping with corrosive swamp acid...',
                type: 'rend',
                defReduction: 0.3,
                rendDuration: 7000,
                damageMult: 0.8,
                applyMessage: (n, c) => `💧 ${n}'s arrow melts through your armor!`
            },
            {
                id: 'dex_venom_arrow',
                name: 'Venom Arrow',
                chance: 0.35,
                mpCost: 12,
                telegraph: 'selects a green-tipped arrow...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 8, tickInterval: 3000, ticks: 5 },
                damageMult: 0.7,
                applyMessage: (n, c) => `💚 ${n}'s venom arrow poisons you!`
            },
            {
                id: 'dex_piercing_shot',
                name: 'Piercing Shot',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'draws back with incredible force...',
                type: 'heavy_hit',
                damageMult: 1.7,
                armorPiercing: 0.25,
                applyMessage: (n, c) => `🏹 ${n}'s arrow punches straight through!`
            }
        ]
    },

    acolyte_master_swamp: { 
        name: 'Exorcist Brynn', 
        class: 'acolyte', 
        unlocks: 'cursed_ruins',
        baseHp: 580, 
        baseDamage: 72, 
        baseDefense: 46, 
        baseMp: 132,
        level: 12, 
        requiredLevel: 12, 
        xp: 750, 
        gold: 850,
        description: 'An acolyte who descended into the swamp to purify it and never returned to the light',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'archmage_vestments', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 },
        abilities: [
            {
                id: 'brynn_purifying_light',
                name: 'Purifying Light',
                chance: 0.35,
                mpCost: 14,
                telegraph: 'holy light pierces the swamp mist...',
                type: 'heavy_hit',
                damageMult: 1.5,
                armorPiercing: 0.15,
                applyMessage: (n, c) => `✨ ${n} strikes you with purifying light!`
            },
            {
                id: 'brynn_cleansing_heal',
                name: 'Cleansing Heal',
                chance: 0.30,
                mpCost: 16,
                telegraph: 'prays for the swamp to be cleansed...',
                type: 'heal',
                minPower: 55,
                maxPower: 85,
                applyMessage: (n, c) => `💚 ${n} heals with cleansing power!`
            },
            {
                id: 'brynn_exorcism',
                name: 'Exorcism',
                chance: 0.30,
                mpCost: 14,
                telegraph: 'chants ancient exorcism rites...',
                type: 'dispel',
                buffSlots: 2,
                applyMessage: (n, c) => `✨ ${n} dispels your magic!`
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLASS_MASTERS };
}