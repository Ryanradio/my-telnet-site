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

    warrior_master_forest: { name: 'Master Swordsman Gareth', class: 'warrior', unlocks: 'riverside',
        baseHp: 200, baseDamage: 30, baseDefense: 20, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A legendary warrior guarding the path to the riverside',
        guaranteedDrops: ['steel_sword', 'steel_plate', 'large_gem'],
        possibleDrops: ['warhammer', 'scale_mail', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    rogue_master_forest: { name: 'Shadow Master Vex', class: 'rogue', unlocks: 'riverside',
        baseHp: 150, baseDamage: 35, baseDefense: 12, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A master assassin who strikes from the shadows',
        guaranteedDrops: ['poison_dagger', 'shadow_armor', 'large_gem'],
        possibleDrops: ['studded_leather', 'health_potion', 'escape_rope'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    paladin_master_forest: { name: 'Knight Commander Aldric', class: 'paladin', unlocks: 'riverside',
        baseHp: 180, baseDamage: 28, baseDefense: 22, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A holy knight devoted to justice',
        guaranteedDrops: ['holy_mace', 'chainmail', 'large_gem'],
        possibleDrops: ['divine_hammer', 'steel_plate', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    mage_master_forest: { name: 'Arcane Tutor Zephyr', class: 'mage', unlocks: 'riverside',
        baseHp: 120, baseDamage: 40, baseDefense: 10, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'An ancient wizard of immense power',
        guaranteedDrops: ['flame_staff', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['ice_staff', 'mana_potion', 'greater_mana_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    cleric_master_forest: { name: 'High Priest Luminus', class: 'cleric', unlocks: 'riverside',
        baseHp: 160, baseDamage: 25, baseDefense: 18, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A divine servant with holy powers',
        guaranteedDrops: ['holy_mace', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['divine_hammer', 'greater_health_potion', 'elixir'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    ranger_master_forest: { name: 'Hunt Master Theron', class: 'ranger', unlocks: 'riverside',
        baseHp: 140, baseDamage: 32, baseDefense: 15, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A master tracker who knows every path in the forest',
        guaranteedDrops: ['hunters_bow', 'studded_leather', 'large_gem'],
        possibleDrops: ['longbow', 'padded_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    warlock_master_forest: { name: 'Pact Broker Mordecai', class: 'warlock', unlocks: 'riverside',
        baseHp: 130, baseDamage: 38, baseDefense: 12, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A shadowy warlock who made deals with forest spirits',
        guaranteedDrops: ['shadow_tome', 'enchanted_robes', 'large_gem'],
        possibleDrops: ['dark_crystal', 'cursed_robes', 'mana_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    hunter_master_forest: { name: 'Packleader Rook', class: 'hunter', unlocks: 'riverside',
        baseHp: 155, baseDamage: 30, baseDefense: 14, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'A hunter who commands a pack of wolves',
        guaranteedDrops: ['hunters_bow', 'wolf_pelt_armor', 'large_gem'],
        possibleDrops: ['composite_bow', 'padded_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    archer_master_forest: { name: 'Sharpshot Lyra', class: 'archer', unlocks: 'riverside',
        baseHp: 135, baseDamage: 34, baseDefense: 13, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: 'An archer who never misses at any distance',
        guaranteedDrops: ['longbow', 'studded_leather', 'large_gem'],
        possibleDrops: ['hunters_bow', 'padded_armor', 'health_potion'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    acolyte_master_forest: { name: 'Grove Warden Syla', class: 'acolyte', unlocks: 'riverside',
        baseHp: 150, baseDamage: 27, baseDefense: 16, level: 3, requiredLevel: 3, xp: 150, gold: 200,
        description: "A forest acolyte who channels nature's wrath",
        guaranteedDrops: ['holy_mace', 'padded_armor', 'large_gem'],
        possibleDrops: ['enchanted_robes', 'greater_health_potion', 'elixir'],
        dropRates: { common: 0.8, uncommon: 0.6, rare: 0.4 } },

    // =============================================================
    // RIVERSIDE -> HAUNTED GRAVEYARD  (Level 6 Required)
    // =============================================================

    warrior_master_riverside: { name: 'War Chief Brutus', class: 'warrior', unlocks: 'haunted_graveyard',
        baseHp: 350, baseDamage: 45, baseDefense: 30, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A brutal warlord who controls the riverside crossing',
        guaranteedDrops: ['bastard_sword', 'plate_mail', 'huge_gem'],
        possibleDrops: ['warhammer', 'mithril_chainmail', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    rogue_master_riverside: { name: 'Blade Dancer Nyx', class: 'rogue', unlocks: 'haunted_graveyard',
        baseHp: 280, baseDamage: 52, baseDefense: 20, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A deadly river pirate who moves like the current',
        guaranteedDrops: ['cursed_sword', 'demon_leather', 'huge_gem'],
        possibleDrops: ['shadowblade', 'shadow_armor', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    paladin_master_riverside: { name: 'Crusader Lord Marcus', class: 'paladin', unlocks: 'haunted_graveyard',
        baseHp: 320, baseDamage: 42, baseDefense: 32, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A zealous crusader who purges the waterways of evil',
        guaranteedDrops: ['divine_hammer', 'mithril_chainmail', 'huge_gem'],
        possibleDrops: ['holy_mace', 'steel_plate', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    mage_master_riverside: { name: 'Sorcerer Malzahar', class: 'mage', unlocks: 'haunted_graveyard',
        baseHp: 220, baseDamage: 60, baseDefense: 18, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: "A water sorcerer who commands the river's power",
        guaranteedDrops: ['ice_staff', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['archmage_staff', 'enchanted_robes', 'superior_mana_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    cleric_master_riverside: { name: 'Cardinal Seraphina', class: 'cleric', unlocks: 'haunted_graveyard',
        baseHp: 290, baseDamage: 38, baseDefense: 26, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A high-ranking church official who guards the sacred ford',
        guaranteedDrops: ['divine_hammer', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['holy_mace', 'mithril_chainmail', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    ranger_master_riverside: { name: 'Beastlord Kael', class: 'ranger', unlocks: 'haunted_graveyard',
        baseHp: 270, baseDamage: 48, baseDefense: 24, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A ranger who commands the beasts of the riverlands',
        guaranteedDrops: ['elven_bow', 'demon_leather', 'huge_gem'],
        possibleDrops: ['longbow', 'studded_leather', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    warlock_master_riverside: { name: 'Shadowlord Xalthar', class: 'warlock', unlocks: 'haunted_graveyard',
        baseHp: 250, baseDamage: 55, baseDefense: 22, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: "A dark warlock who draws power from the murky depths",
        guaranteedDrops: ['void_staff', 'cursed_robes', 'huge_gem'],
        possibleDrops: ['shadow_tome', 'dark_crystal', 'greater_mana_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    hunter_master_riverside: { name: 'Alpha Commander Varg', class: 'hunter', unlocks: 'haunted_graveyard',
        baseHp: 280, baseDamage: 45, baseDefense: 26, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A hunter who leads a pack of river wolves',
        guaranteedDrops: ['composite_bow', 'wolf_pelt_armor', 'huge_gem'],
        possibleDrops: ['hunters_bow', 'beast_fang_necklace', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    archer_master_riverside: { name: 'Siege Captain Lyra', class: 'archer', unlocks: 'haunted_graveyard',
        baseHp: 260, baseDamage: 50, baseDefense: 22, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A battle-hardened captain who held the river bridge for a decade',
        guaranteedDrops: ['elven_bow', 'studded_leather', 'huge_gem'],
        possibleDrops: ['longbow', 'demon_leather', 'greater_health_potion'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    acolyte_master_riverside: { name: 'Zealot Confessor Maren', class: 'acolyte', unlocks: 'haunted_graveyard',
        baseHp: 275, baseDamage: 40, baseDefense: 24, level: 6, requiredLevel: 6, xp: 300, gold: 400,
        description: 'A fanatical acolyte whose faith has been tested in battle',
        guaranteedDrops: ['divine_hammer', 'battlemage_robes', 'huge_gem'],
        possibleDrops: ['holy_mace', 'padded_armor', 'elixir'],
        dropRates: { common: 0.7, uncommon: 0.5, rare: 0.3, epic: 0.1 } },

    // =============================================================
    // HAUNTED GRAVEYARD -> DARK SWAMP  (Level 9 Required)
    // =============================================================

    warrior_master_graveyard: { name: 'Warlord Draven', class: 'warrior', unlocks: 'dark_swamp',
        baseHp: 500, baseDamage: 65, baseDefense: 40, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A risen warlord who conquered death itself',
        guaranteedDrops: ['excalibur', 'dragon_scale', 'pristine_gem'],
        possibleDrops: ['dragonslayer', 'adamantine_plate', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    rogue_master_graveyard: { name: 'Shadow King Erebus', class: 'rogue', unlocks: 'dark_swamp',
        baseHp: 420, baseDamage: 75, baseDefense: 28, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: "An undead master of shadows ruling the graveyard's dark corners",
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    paladin_master_graveyard: { name: 'Grand Templar Solarius', class: 'paladin', unlocks: 'dark_swamp',
        baseHp: 480, baseDamage: 58, baseDefense: 45, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A fallen holy knight guarding the boundary between life and death',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'dragon_scale', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    mage_master_graveyard: { name: 'Archmage Chronos', class: 'mage', unlocks: 'dark_swamp',
        baseHp: 350, baseDamage: 85, baseDefense: 25, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A necromancer-mage who has mastered time as well as death',
        guaranteedDrops: ['archmage_staff', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['staff_of_eternity', 'phoenix_robes', 'superior_mana_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    cleric_master_graveyard: { name: 'Saint Evangeline', class: 'cleric', unlocks: 'dark_swamp',
        baseHp: 440, baseDamage: 52, baseDefense: 38, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A living saint who descended into the graveyard to cleanse it',
        guaranteedDrops: ['mjolnir', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    ranger_master_graveyard: { name: 'Specter Huntress Artemis', class: 'ranger', unlocks: 'dark_swamp',
        baseHp: 400, baseDamage: 68, baseDefense: 32, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A ghost ranger who hunts the undead for sport',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    warlock_master_graveyard: { name: 'Archfiend Malzahar', class: 'warlock', unlocks: 'dark_swamp',
        baseHp: 380, baseDamage: 78, baseDefense: 28, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: "A warlock who feeds on the souls of the graveyard's dead",
        guaranteedDrops: ['demon_staff', 'cursed_robes', 'pristine_gem'],
        possibleDrops: ['void_staff', 'shadow_grimoire', 'superior_mana_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    hunter_master_graveyard: { name: 'Bonehound Fang', class: 'hunter', unlocks: 'dark_swamp',
        baseHp: 420, baseDamage: 62, baseDefense: 34, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A hunter bonded with an undead direwolf companion',
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem'],
        possibleDrops: ['composite_bow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    archer_master_graveyard: { name: 'Phantom Bowyer Isen', class: 'archer', unlocks: 'dark_swamp',
        baseHp: 390, baseDamage: 72, baseDefense: 30, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A spectral archer whose arrows can strike the living and the dead',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    acolyte_master_graveyard: { name: 'Inquisitor Valdris', class: 'acolyte', unlocks: 'dark_swamp',
        baseHp: 430, baseDamage: 55, baseDefense: 36, level: 9, requiredLevel: 9, xp: 500, gold: 600,
        description: 'A hardened inquisitor who hunts the undead in their own domain',
        guaranteedDrops: ['mjolnir', 'archmage_vestments', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'mithril_chainmail', 'elixir'],
        dropRates: { uncommon: 0.6, rare: 0.4, epic: 0.2, legendary: 0.05 } },

    // =============================================================
    // DARK SWAMP -> CURSED RUINS  (Level 12 Required)
    // =============================================================

    warrior_master_swamp: { name: 'Bog Iron Gorath', class: 'warrior', unlocks: 'cursed_ruins',
        baseHp: 680, baseDamage: 80, baseDefense: 52, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A massive warrior encrusted with swamp iron and dark magic',
        guaranteedDrops: ['dragonslayer', 'adamantine_plate', 'pristine_gem'],
        possibleDrops: ['titan_blade', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    rogue_master_swamp: { name: 'Venomfang Siris', class: 'rogue', unlocks: 'cursed_ruins',
        baseHp: 560, baseDamage: 90, baseDefense: 36, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: "An assassin who coats her blades in the swamp's deadliest toxins",
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    paladin_master_swamp: { name: 'Tainted Crusader Mael', class: 'paladin', unlocks: 'cursed_ruins',
        baseHp: 640, baseDamage: 72, baseDefense: 55, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A paladin corrupted by swamp magic wielding both holy and poison power',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'adamantine_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    mage_master_swamp: { name: 'Swamp Oracle Hexara', class: 'mage', unlocks: 'cursed_ruins',
        baseHp: 480, baseDamage: 102, baseDefense: 32, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'An oracle mage who reads the future in poison vapors',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    cleric_master_swamp: { name: 'Bog Witch Matriarch Ysolde', class: 'cleric', unlocks: 'cursed_ruins',
        baseHp: 600, baseDamage: 68, baseDefense: 45, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A cleric who merged her faith with swamp spirit worship',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    ranger_master_swamp: { name: 'Murk Stalker Lorn', class: 'ranger', unlocks: 'cursed_ruins',
        baseHp: 540, baseDamage: 82, baseDefense: 40, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A ranger who can navigate the swamp blindfolded and never miss a shot',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    warlock_master_swamp: { name: 'Plague Summoner Vael', class: 'warlock', unlocks: 'cursed_ruins',
        baseHp: 520, baseDamage: 95, baseDefense: 38, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A warlock who commands plague spirits and bog demons',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    hunter_master_swamp: { name: 'Hydra Tamer Krix', class: 'hunter', unlocks: 'cursed_ruins',
        baseHp: 560, baseDamage: 78, baseDefense: 42, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A hunter who tamed a venomous hydra as a companion',
        guaranteedDrops: ['dragonbone_bow', 'beast_king_armor', 'pristine_gem'],
        possibleDrops: ['godbow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    archer_master_swamp: { name: 'Poison Arrow Dex', class: 'archer', unlocks: 'cursed_ruins',
        baseHp: 530, baseDamage: 86, baseDefense: 38, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'An archer whose arrows are tipped with swamp venom that corrodes armor',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    acolyte_master_swamp: { name: 'Exorcist Brynn', class: 'acolyte', unlocks: 'cursed_ruins',
        baseHp: 580, baseDamage: 72, baseDefense: 46, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'An acolyte who descended into the swamp to purify it and never returned to the light',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'archmage_vestments', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    // =============================================================
    // CURSED RUINS -> SHADOW CAVERN  (Level 15 Required)
    // =============================================================

    warrior_master_ruins: { name: 'Ruinlord Valdrak', class: 'warrior', unlocks: 'cave',
        baseHp: 880, baseDamage: 98, baseDefense: 62, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: 'An ancient warrior king awakened from the ruins to destroy all who trespass',
        guaranteedDrops: ['godslayer', 'adamantine_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['excalibur', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    rogue_master_ruins: { name: 'Shade Weaver Kira', class: 'rogue', unlocks: 'cave',
        baseHp: 720, baseDamage: 112, baseDefense: 44, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: 'An assassin who has become one with the cursed shadows of the ruins',
        guaranteedDrops: ['vampire_blade', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['shadowblade', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    paladin_master_ruins: { name: 'Corrupted Aegis Oryn', class: 'paladin', unlocks: 'cave',
        baseHp: 840, baseDamage: 90, baseDefense: 68, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: "A paladin consumed by the ruins' curse, guarding its darkest secret",
        guaranteedDrops: ['divine_hammer', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['mjolnir', 'adamantine_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    mage_master_ruins: { name: 'Rune Arch-Mage Zerak', class: 'mage', unlocks: 'cave',
        baseHp: 620, baseDamage: 128, baseDefense: 40, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: "A mage who absorbed the ruins' ancient magical knowledge and went mad with power",
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    cleric_master_ruins: { name: 'Fallen Sanctum Priest Davar', class: 'cleric', unlocks: 'cave',
        baseHp: 800, baseDamage: 86, baseDefense: 58, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: "Once the high priest of a great temple, now enslaved by the ruins' dark power",
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    ranger_master_ruins: { name: 'Stone Arrow Revenant', class: 'ranger', unlocks: 'cave',
        baseHp: 760, baseDamage: 104, baseDefense: 50, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: 'A ranger transformed into a stone revenant, still hunting with supernatural precision',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    warlock_master_ruins: { name: 'Chaos Binder Morax', class: 'warlock', unlocks: 'cave',
        baseHp: 700, baseDamage: 118, baseDefense: 46, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: "A warlock who bound the ruins' chaos energy into himself, becoming inhuman",
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    hunter_master_ruins: { name: 'Gargoyle Tamer Rhos', class: 'hunter', unlocks: 'cave',
        baseHp: 750, baseDamage: 100, baseDefense: 52, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: "A hunter who bonded with the ruins' gargoyles and commands them in battle",
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['godbow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    archer_master_ruins: { name: 'Phantom Volley Erix', class: 'archer', unlocks: 'cave',
        baseHp: 720, baseDamage: 108, baseDefense: 48, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: 'A cursed archer who can fire a dozen ghost arrows simultaneously',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    acolyte_master_ruins: { name: 'Dark Sanctified Nura', class: 'acolyte', unlocks: 'cave',
        baseHp: 780, baseDamage: 92, baseDefense: 56, level: 15, requiredLevel: 15, xp: 1000, gold: 1200,
        description: 'An acolyte whose prayers now echo in the cursed ruins, drawing power from darkness',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'phoenix_robes', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.35, legendary: 0.15 } },

    // =============================================================
    // SHADOW CAVERN -> ANCIENT CRYPT  (Level 18 Required)
    // =============================================================

    warrior_master_cave: { name: 'Cave Titan Grond', class: 'warrior', unlocks: 'crypt',
        baseHp: 1100, baseDamage: 118, baseDefense: 75, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: "A titan-sized warrior who carved the cavern's tunnels with his bare hands",
        guaranteedDrops: ['godslayer', 'adamantine_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['excalibur', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    rogue_master_cave: { name: 'Darkdepths Umbra', class: 'rogue', unlocks: 'crypt',
        baseHp: 900, baseDamage: 135, baseDefense: 55, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'A rogue so accustomed to the dark she no longer needs eyes to kill',
        guaranteedDrops: ['vampire_blade', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['shadowblade', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    paladin_master_cave: { name: 'Stoneheart Templar Rok', class: 'paladin', unlocks: 'crypt',
        baseHp: 1050, baseDamage: 108, baseDefense: 82, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'A paladin whose faith literally turned his body to stone — unmovable, unstoppable',
        guaranteedDrops: ['divine_hammer', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['mjolnir', 'adamantine_plate', 'elixir'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    mage_master_cave: { name: 'Crystal Lich Vexa', class: 'mage', unlocks: 'crypt',
        baseHp: 780, baseDamage: 155, baseDefense: 48, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'A mage who crystallized her own soul to achieve immortality in the cavern',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    cleric_master_cave: { name: 'Cavern Saint Oswin', class: 'cleric', unlocks: 'crypt',
        baseHp: 1000, baseDamage: 104, baseDefense: 70, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'A cleric who brought light into the eternal dark — and the dark answered back',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    ranger_master_cave: { name: 'Cavern Apex Fenn', class: 'ranger', unlocks: 'crypt',
        baseHp: 950, baseDamage: 122, baseDefense: 62, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'The apex predator of the cavern ecosystem, a ranger who became the monster',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    warlock_master_cave: { name: 'Abyss Caller Sethis', class: 'warlock', unlocks: 'crypt',
        baseHp: 880, baseDamage: 140, baseDefense: 56, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'A warlock who opened a pocket abyss within the cavern and draws power from it',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    hunter_master_cave: { name: 'Drake Sovereign Krix', class: 'hunter', unlocks: 'crypt',
        baseHp: 940, baseDamage: 116, baseDefense: 64, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'A hunter who tamed the cave drakes and rules them as their sovereign',
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['godbow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    archer_master_cave: { name: 'Echoshot Mirra', class: 'archer', unlocks: 'crypt',
        baseHp: 910, baseDamage: 128, baseDefense: 58, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'An archer who learned to bounce arrows off cavern walls to strike from any angle',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    acolyte_master_cave: { name: 'Stone Redeemer Thane', class: 'acolyte', unlocks: 'crypt',
        baseHp: 980, baseDamage: 110, baseDefense: 68, level: 18, requiredLevel: 18, xp: 1400, gold: 1600,
        description: 'An acolyte who prays that the stone itself will rise to defend the faithful',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'phoenix_robes', 'elixir'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2 } },

    // =============================================================
    // ANCIENT CRYPT -> DEMON PORTAL  (Level 21 Required)
    // =============================================================

    warrior_master_crypt: { name: "Death Knight Overlord Kael'thas", class: 'warrior', unlocks: 'demon_portal',
        baseHp: 1380, baseDamage: 142, baseDefense: 90, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'The greatest death knight in history, ruling the crypt with an iron fist',
        guaranteedDrops: ['godslayer', 'adamantine_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['excalibur', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    rogue_master_crypt: { name: 'Lich Blade Seraphax', class: 'rogue', unlocks: 'demon_portal',
        baseHp: 1120, baseDamage: 162, baseDefense: 66, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'An undead assassin who makes deals with lich lords, trading lives for power',
        guaranteedDrops: ['vampire_blade', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['shadowblade', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    paladin_master_crypt: { name: 'Hollow Crusader Malachar', class: 'paladin', unlocks: 'demon_portal',
        baseHp: 1300, baseDamage: 130, baseDefense: 98, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'A crusader so righteous he refused death itself — now a hollow immortal titan of judgment',
        guaranteedDrops: ['divine_hammer', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['mjolnir', 'adamantine_plate', 'elixir'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    mage_master_crypt: { name: 'Archlich Mortivex', class: 'mage', unlocks: 'demon_portal',
        baseHp: 980, baseDamage: 186, baseDefense: 58, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'An archlich who studied death magic until death itself became his servant',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    cleric_master_crypt: { name: "Death's Own Cleric Vardus", class: 'cleric', unlocks: 'demon_portal',
        baseHp: 1240, baseDamage: 126, baseDefense: 86, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'A cleric who worships death as a god — and death has rewarded him greatly',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    ranger_master_crypt: { name: 'Banshee Huntress Rhael', class: 'ranger', unlocks: 'demon_portal',
        baseHp: 1180, baseDamage: 148, baseDefense: 74, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'A spectral ranger whose wailing arrows drain the life of all who hear them',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    warlock_master_crypt: { name: 'Soul Hoarder Zythos', class: 'warlock', unlocks: 'demon_portal',
        baseHp: 1100, baseDamage: 168, baseDefense: 68, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'A warlock who has stored thousands of stolen souls in his phylactery',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    hunter_master_crypt: { name: 'Bone Dragon Rider Voss', class: 'hunter', unlocks: 'demon_portal',
        baseHp: 1160, baseDamage: 144, baseDefense: 78, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: "A hunter who rides a bone dragon companion through the crypt's vast chambers",
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['godbow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    archer_master_crypt: { name: 'Wraith-Shot Mira', class: 'archer', unlocks: 'demon_portal',
        baseHp: 1140, baseDamage: 156, baseDefense: 72, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'An archer who fires arrows of pure shadow energy that phase through armor',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    acolyte_master_crypt: { name: 'Undeath Redeemer Thessa', class: 'acolyte', unlocks: 'demon_portal',
        baseHp: 1220, baseDamage: 134, baseDefense: 84, level: 21, requiredLevel: 21, xp: 1900, gold: 2200,
        description: 'The greatest exorcist ever born — the only thing standing between the crypt and what lies beyond',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.4, epic: 0.3, legendary: 0.2, mythic: 0.05 } },

    // =============================================================
    // DEMON PORTAL -> CORRUPTED TEMPLE  (Level 24 Required)
    // =============================================================

    warrior_master_demon_portal: { name: 'Infernal Warlord Gorathax', class: 'warrior', unlocks: 'corrupted_temple',
        baseHp: 1700, baseDamage: 168, baseDefense: 108, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A demon general in human form, the greatest warrior hell ever spawned',
        guaranteedDrops: ['godslayer', 'adamantine_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['excalibur', 'dragon_scale', 'superior_health_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    rogue_master_demon_portal: { name: 'Void Blade Ixxis', class: 'rogue', unlocks: 'corrupted_temple',
        baseHp: 1400, baseDamage: 192, baseDefense: 80, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A rogue who weaponized the void portal energy, vanishing and reappearing anywhere',
        guaranteedDrops: ['vampire_blade', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['shadowblade', 'demon_leather', 'superior_health_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    paladin_master_demon_portal: { name: 'Herald of Hellfire Oran', class: 'paladin', unlocks: 'corrupted_temple',
        baseHp: 1620, baseDamage: 154, baseDefense: 118, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A paladin who crossed through the demon portal and returned as something other',
        guaranteedDrops: ['divine_hammer', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['mjolnir', 'adamantine_plate', 'elixir'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    mage_master_demon_portal: { name: 'Planar Ravager Zolax', class: 'mage', unlocks: 'corrupted_temple',
        baseHp: 1220, baseDamage: 218, baseDefense: 70, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A mage who shattered his mind across eleven planes to gain ultimate power',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    cleric_master_demon_portal: { name: 'Corrupted Divine Vessel Yara', class: 'cleric', unlocks: 'corrupted_temple',
        baseHp: 1560, baseDamage: 148, baseDefense: 104, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: "A cleric whose body was seized as a vessel by a demon lord, wielding both divine and infernal power",
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    ranger_master_demon_portal: { name: 'Hellfire Tracker Sorn', class: 'ranger', unlocks: 'corrupted_temple',
        baseHp: 1480, baseDamage: 175, baseDefense: 90, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A ranger who tracks demons across planes, his arrows burning with hellfire',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    warlock_master_demon_portal: { name: 'Demon Prince Consort Varix', class: 'warlock', unlocks: 'corrupted_temple',
        baseHp: 1380, baseDamage: 200, baseDefense: 82, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A warlock who rose through demon court politics to become an infernal prince',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    hunter_master_demon_portal: { name: 'Hellhound Alpha Tarn', class: 'hunter', unlocks: 'corrupted_temple',
        baseHp: 1450, baseDamage: 170, baseDefense: 94, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'A hunter who leapt through the demon portal and returned bonded with three hellhounds',
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['godbow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    archer_master_demon_portal: { name: 'Inferno Shot Celyx', class: 'archer', unlocks: 'corrupted_temple',
        baseHp: 1420, baseDamage: 184, baseDefense: 86, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'An archer whose arrows pierce through reality itself, arriving before they are fired',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    acolyte_master_demon_portal: { name: 'Demonborn Exorcist Caelia', class: 'acolyte', unlocks: 'corrupted_temple',
        baseHp: 1520, baseDamage: 158, baseDefense: 100, level: 24, requiredLevel: 24, xp: 2500, gold: 3000,
        description: 'Born half-demon, Caelia has mastered both infernal and divine power to close the portal',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'phoenix_robes', 'elixir'],
        dropRates: { epic: 0.4, legendary: 0.25, mythic: 0.1 } },

    // =============================================================
    // CORRUPTED TEMPLE -> CELESTIAL SPIRE  (Level 25 Required)
    // =============================================================

    warrior_master_corrupted_temple: { name: "Fallen God's Champion Mael", class: 'warrior', unlocks: 'celestial_spire',
        baseHp: 2100, baseDamage: 200, baseDefense: 130, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'The chosen champion of a fallen god, wielding divine-corrupted power beyond mortal comprehension',
        guaranteedDrops: ['godslayer', 'adamantine_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['excalibur', 'dragon_scale', 'superior_health_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    rogue_master_corrupted_temple: { name: 'Void Incarnate Nyx', class: 'rogue', unlocks: 'celestial_spire',
        baseHp: 1750, baseDamage: 228, baseDefense: 96, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'An assassin who merged with void energy — she is now more concept than person',
        guaranteedDrops: ['vampire_blade', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['shadowblade', 'demon_leather', 'superior_health_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    paladin_master_corrupted_temple: { name: 'Antithesis Knight Daran', class: 'paladin', unlocks: 'celestial_spire',
        baseHp: 2000, baseDamage: 184, baseDefense: 142, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'A paladin who became the embodiment of holy corruption — twin forces making him unstoppable',
        guaranteedDrops: ['divine_hammer', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['mjolnir', 'adamantine_plate', 'elixir'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    mage_master_corrupted_temple: { name: 'Reality Unwoven Zeth', class: 'mage', unlocks: 'celestial_spire',
        baseHp: 1520, baseDamage: 260, baseDefense: 84, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'A mage who rewrote reality in the temple, and now reality is writing back',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    cleric_master_corrupted_temple: { name: "God's Last Priest Edrin", class: 'cleric', unlocks: 'celestial_spire',
        baseHp: 1920, baseDamage: 178, baseDefense: 126, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'The last surviving priest of a murdered god, carrying divine grief as a weapon',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    ranger_master_corrupted_temple: { name: 'Starfall Warden Lyss', class: 'ranger', unlocks: 'celestial_spire',
        baseHp: 1840, baseDamage: 210, baseDefense: 108, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'A ranger who calls down stars as arrows, warden of the boundary between earth and heaven',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    warlock_master_corrupted_temple: { name: 'Oblivion Patron Szeth', class: 'warlock', unlocks: 'celestial_spire',
        baseHp: 1720, baseDamage: 238, baseDefense: 98, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'A warlock whose patron was oblivion itself — his power grows as all things end',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    hunter_master_corrupted_temple: { name: 'Apex Hunter Rorn', class: 'hunter', unlocks: 'celestial_spire',
        baseHp: 1800, baseDamage: 204, baseDefense: 114, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'A hunter who has slain gods and bonded with their divine beasts as companions',
        guaranteedDrops: ['dragonbone_bow', 'dragon_scale', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['godbow', 'beast_king_armor', 'superior_health_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    archer_master_corrupted_temple: { name: 'Heaven-Piercer Alara', class: 'archer', unlocks: 'celestial_spire',
        baseHp: 1780, baseDamage: 220, baseDefense: 104, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'An archer whose bow can fire arrows through the veil between worlds',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    acolyte_master_corrupted_temple: { name: 'Sanctified Void Vael', class: 'acolyte', unlocks: 'celestial_spire',
        baseHp: 1880, baseDamage: 190, baseDefense: 120, level: 25, requiredLevel: 25, xp: 3500, gold: 4500,
        description: 'An acolyte who merged divine faith with void energy into a living contradiction of impossible power',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'phoenix_robes', 'elixir'],
        dropRates: { legendary: 0.4, mythic: 0.2 } },

    // =============================================================
    // TOWN 3 TRACK: WINDSWEPT PLAINS -> VOLCANIC WASTES  (Level 12)
    // =============================================================

    warrior_master_plains: { name: 'Steppe Conqueror Reth', class: 'warrior', unlocks: 'volcano',
        baseHp: 680, baseDamage: 80, baseDefense: 52, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A warlord who conquered all the plains clans and now seeks fresh conquest',
        guaranteedDrops: ['dragonslayer', 'adamantine_plate', 'pristine_gem'],
        possibleDrops: ['titan_blade', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    rogue_master_plains: { name: 'Wind Dancer Nira', class: 'rogue', unlocks: 'volcano',
        baseHp: 560, baseDamage: 92, baseDefense: 36, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A rogue who moves so fast she looks like the wind across the grasslands',
        guaranteedDrops: ['shadowblade', 'void_armor', 'pristine_gem'],
        possibleDrops: ['vampire_blade', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    paladin_master_plains: { name: 'Plains Crusader Auren', class: 'paladin', unlocks: 'volcano',
        baseHp: 640, baseDamage: 74, baseDefense: 55, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A crusader who united the plains people under a holy banner',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'adamantine_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    mage_master_plains: { name: 'Storm Caller Vex', class: 'mage', unlocks: 'volcano',
        baseHp: 480, baseDamage: 105, baseDefense: 32, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A mage who calls lightning from clear skies across the endless plains',
        guaranteedDrops: ['staff_of_eternity', 'phoenix_robes', 'pristine_gem'],
        possibleDrops: ['archmage_staff', 'archmage_vestments', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    cleric_master_plains: { name: 'Wandering Prophet Edas', class: 'cleric', unlocks: 'volcano',
        baseHp: 600, baseDamage: 70, baseDefense: 46, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A wandering prophet who has walked the plains for decades, drawing power from the open sky',
        guaranteedDrops: ['mjolnir', 'phoenix_robes', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'celestial_plate', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    ranger_master_plains: { name: 'Horizon Scout Kael', class: 'ranger', unlocks: 'volcano',
        baseHp: 540, baseDamage: 84, baseDefense: 40, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A ranger who can see to the horizon and hit targets at a mile',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    warlock_master_plains: { name: 'Thunderpact Daxor', class: 'warlock', unlocks: 'volcano',
        baseHp: 520, baseDamage: 97, baseDefense: 38, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A warlock who made a pact with the storm spirits of the open plains',
        guaranteedDrops: ['demon_staff', 'shadow_grimoire', 'pristine_gem'],
        possibleDrops: ['void_staff', 'cursed_robes', 'superior_mana_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    hunter_master_plains: { name: 'Great Hunt Master Vorn', class: 'hunter', unlocks: 'volcano',
        baseHp: 560, baseDamage: 80, baseDefense: 42, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'A hunter who runs with plains lion packs and commands them in hunts',
        guaranteedDrops: ['dragonbone_bow', 'beast_king_armor', 'pristine_gem'],
        possibleDrops: ['godbow', 'dragon_scale', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    archer_master_plains: { name: 'Longshot Exile Aris', class: 'archer', unlocks: 'volcano',
        baseHp: 530, baseDamage: 88, baseDefense: 38, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'An exiled royal archer who sharpened her skills to perfection on the empty plains',
        guaranteedDrops: ['godbow', 'void_armor', 'pristine_gem'],
        possibleDrops: ['elven_bow', 'demon_leather', 'superior_health_potion'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } },

    acolyte_master_plains: { name: 'Windcaller Brother Hadoc', class: 'acolyte', unlocks: 'volcano',
        baseHp: 580, baseDamage: 74, baseDefense: 46, level: 12, requiredLevel: 12, xp: 750, gold: 850,
        description: 'An acolyte who channels the plains wind into divine force',
        guaranteedDrops: ['mjolnir', 'celestial_plate', 'pristine_gem'],
        possibleDrops: ['divine_hammer', 'phoenix_robes', 'elixir'],
        dropRates: { rare: 0.5, epic: 0.3, legendary: 0.1 } }

};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLASS_MASTERS };
}
