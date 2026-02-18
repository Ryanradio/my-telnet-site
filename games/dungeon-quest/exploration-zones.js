// exploration-zones.js - World Map Zones
// Level ranges are clean non-overlapping bands: 1-3, 4-6, 7-9, 10-12, etc.

const EXPLORATION_ZONES = {

    // ═══════════════════════════════════════════════════════════════
    // TOWN 1 ZONES  (Silverdale) — Levels 1-6 ONLY
    // Zones here are hard-capped to town1. A level 7+ player still
    // only sees forest and riverside here — they must go to Town 2
    // to access the 7-9 tier. No exceptions.
    // ═══════════════════════════════════════════════════════════════
    forest: {
        name: 'Whispering Forest',
        description: 'A dark forest filled with minor creatures and mysteries.',
        enemyLevelRange: [1, 3],
        encounters: ['poop_slime', 'goblin', 'wolf', 'giant_spider', 'wild_boar', 'slime', 'kobold', 'giant_rat', 'forest_imp',
                     'mud_crab', 'angry_squirrel', 'thornling', 'venomfang_bat', 'moss_creeper',
                     'goblin_shaman', 'wild_lynx', 'plague_rat'],
        requiredLevel: 1,
        locked: false,
        town: 'town1',
        adventureChance: 0.05
    },

    riverside: {
        name: 'Misty Riverside',
        description: 'A foggy riverbank where strange creatures lurk in the shallows.',
        enemyLevelRange: [4, 6],
        encounters: ['river_troll', 'swamp_lurker', 'giant_frog', 'water_snake', 'bandit',
                     'mudskipper', 'river_pirate', 'snapping_turtle', 'kelp_strangler', 'bog_witch',
                     'harpy', 'gnoll', 'lizardfolk', 'giant_wasp', 'bandit_scout'],
        requiredLevel: 4,
        locked: false,
        town: 'town1',
        unlockMessage: 'Defeat your class master in the forest to unlock this area!',
        adventureChance: 0.04
    },

    haunted_graveyard: {
        name: 'Haunted Graveyard',
        description: 'An ancient cemetery where the dead don\'t rest peacefully.',
        enemyLevelRange: [7, 9],
        encounters: ['zombie', 'ghoul', 'skeleton', 'grave_robber', 'spirit',
                     'bone_archer', 'shadow_hound', 'crypt_bat', 'wailing_banshee', 'grave_knight',
                     'death_cultist', 'flesh_golem', 'specter', 'vampire_thrall'],
        requiredLevel: 7,
        locked: false,
        town: 'town2',
        adventureChance: 0.07
    },

    // ═══════════════════════════════════════════════════════════════
    // TOWN 2 ZONES  (Ashen Harbor) — Levels 7-18
    // haunted_graveyard is the first zone (unlocked by default).
    // plains unlocks after defeating the graveyard class master.
    // ═══════════════════════════════════════════════════════════════
    plains: {
        name: 'Endless Plains',
        description: 'Open grasslands with roaming beasts and bandit camps.',
        enemyLevelRange: [7, 9],
        encounters: ['dire_wolf', 'plains_lion', 'centaur', 'plains_raider', 'giant_scorpion',
                     'orc_berserker', 'giant_beetle', 'minotaur_scout', 'will_o_wisp', 'gnoll_chief',
                     'grave_knight', 'shadow_hound', 'flesh_golem', 'specter', 'vampire_thrall'],
        requiredLevel: 7,
        locked: true,
        town: 'town2',
        unlockMessage: 'Defeat your class master in the graveyard to unlock this area!',
        adventureChance: 0.06
    },

    dark_swamp: {
        name: 'Blackwater Swamp',
        description: 'A treacherous swamp filled with poison and decay.',
        enemyLevelRange: [10, 12],
        encounters: ['swamp_hag', 'plague_zombie', 'giant_leech', 'bog_beast', 'corrupted_treant',
                     'venomous_hydra', 'bog_shambler', 'rotting_knight', 'poison_drake', 'swamp_witch',
                     'cave_basilisk', 'iron_golem', 'werewolf', 'medusa', 'cave_worm'],
        requiredLevel: 10,
        locked: true,
        town: 'town2',
        unlockMessage: 'Defeat your class master in the plains to unlock this area!',
        adventureChance: 0.08
    },

    cursed_ruins: {
        name: 'Cursed Ruins',
        description: 'The remains of an ancient civilization, cursed by dark magic.',
        enemyLevelRange: [13, 15],
        encounters: ['cursed_knight', 'shadow_stalker', 'ruin_guardian', 'spectral_warrior', 'dark_priest',
                     'demon_hound', 'chaos_knight', 'runic_guardian', 'phantom_mage', 'gargoyle',
                     'necromancer', 'dark_champion', 'elder_wraith', 'black_knight', 'revenant'],
        requiredLevel: 13,
        locked: true,
        town: 'town2',
        unlockMessage: 'Defeat your class master in the swamp to unlock this area!',
        adventureChance: 0.09
    },

    cave: {
        name: 'Shadow Cavern',
        description: 'Deep caves filled with dangerous monsters and hidden treasures.',
        enemyLevelRange: [16, 18],
        encounters: ['troll', 'skeleton_warrior', 'dark_mage', 'cave_drake', 'stone_golem', 'ogre',
                     'shadow_dragon', 'bone_colossus', 'plague_lord', 'demon_warrior', 'cursed_archon',
                     'undead_general', 'doom_knight', 'infernal_mage', 'wyvern'],
        requiredLevel: 16,
        locked: true,
        town: 'town2',
        unlockMessage: 'Defeat your class master in the ruins to unlock this area!',
        adventureChance: 0.08
    },

    // ═══════════════════════════════════════════════════════════════
    // LATE GAME ZONES — Levels 16-25  (future towns can own these)
    // ═══════════════════════════════════════════════════════════════
    crypt: {
        name: 'Ancient Crypt',
        description: 'An ancient tomb haunted by powerful undead.',
        enemyLevelRange: [16, 18],
        encounters: ['lich', 'death_knight', 'wraith', 'bone_dragon', 'vampire_lord', 'crypt_guard',
                     'ancient_lich', 'nightmare_steed', 'shadow_archon', 'chaos_bringer', 'soul_reaper',
                     'blood_elemental', 'wyvern', 'undead_general', 'doom_knight'],
        requiredLevel: 16,
        locked: true,
        unlockMessage: 'Defeat your class master in the cave to unlock this area!',
        adventureChance: 0.10
    },

    demon_portal: {
        name: 'Demon Portal',
        description: 'A tear in reality where demons pour forth.',
        enemyLevelRange: [19, 21],
        encounters: ['lesser_demon', 'hellhound', 'imp_swarm', 'pit_fiend', 'demon_lord',
                     'infernal_titan', 'void_assassin', 'plague_dragon', 'demon_sorceress', 'herald_of_doom',
                     'void_titan', 'fallen_titan', 'abyssal_knight', 'elder_vampire', 'reality_shredder'],
        requiredLevel: 19,
        locked: true,
        unlockMessage: 'Defeat your class master in the crypt to unlock this area!',
        adventureChance: 0.10
    },

    corrupted_temple: {
        name: 'Corrupted Temple',
        description: 'A once-holy temple now twisted by dark forces.',
        enemyLevelRange: [22, 24],
        encounters: ['fallen_angel', 'corrupted_paladin', 'dark_oracle', 'abomination', 'void_priest',
                     'eclipse_dragon', 'soul_devourer', 'hellfire_knight', 'inferno_elemental', 'chaos_elemental',
                     'oblivion_herald', 'eternal_warden', 'chaos_dragon', 'void_overlord', 'fallen_warlord'],
        requiredLevel: 22,
        locked: true,
        unlockMessage: 'Defeat your class master in the demon portal to unlock!',
        adventureChance: 0.11
    },

    volcano: {
        name: 'Volcanic Wastes',
        description: 'A scorched wasteland of fire, ash, and ancient power.',
        enemyLevelRange: [22, 24],
        encounters: ['fire_elemental', 'lava_golem', 'phoenix', 'magma_dragon', 'flame_titan',
                     'elder_demon', 'lava_titan', 'void_colossus', 'corrupted_titan', 'nightmare_dragon',
                     'storm_dragon', 'blizzard_titan', 'void_dragon', 'glacial_wyrm', 'ancient_lich_lord'],
        requiredLevel: 22,
        locked: true,
        unlockMessage: 'Defeat your class master in the crypt to unlock this area!',
        adventureChance: 0.12
    },

    celestial_spire: {
        name: 'Celestial Spire',
        description: 'A tower reaching into the heavens, guarded by divine beings.',
        enemyLevelRange: [25, 25],
        encounters: ['celestial_guardian', 'arch_angel', 'divine_champion', 'seraphim', 'god_avatar',
                     'cosmic_horror', 'divine_executioner', 'star_titan', 'eternal_dragon', 'oblivion_incarnate'],
        requiredLevel: 25,
        locked: true,
        unlockMessage: 'Only the mightiest heroes may enter.',
        adventureChance: 0.15
    }
};

// Additional monsters for exploration zones
const ZONE_MONSTERS = {
    // Riverside / early plains (4-6)
    river_troll:   { name: 'River Troll',   baseHp: 100,  baseDamage: 9,  baseDefense: 6,  baseXp: 40,  baseGold: 22, level: 4 },
    swamp_lurker:  { name: 'Swamp Lurker',  baseHp: 80,  baseDamage: 10, baseDefense: 4,  baseXp: 35,  baseGold: 18, level: 4 },
    giant_frog:    { name: 'Giant Frog',    baseHp: 70,  baseDamage: 8,  baseDefense: 5,  baseXp: 30,  baseGold: 14, level: 4 },
    water_snake:   { name: 'Water Snake',   baseHp: 60,  baseDamage: 11, baseDefense: 3,  baseXp: 32,  baseGold: 12, level: 4 },

    // Plains (6-9)
    plains_lion:   { name: 'Plains Lion',   baseHp: 150,  baseDamage: 16, baseDefense: 8,  baseXp: 95,  baseGold: 45, level: 7 },
    centaur:       { name: 'Centaur',       baseHp: 180,  baseDamage: 18, baseDefense: 10, baseXp: 115, baseGold: 58, level: 8 },

    // Haunted Graveyard (7-9)
    zombie:        { name: 'Zombie',        baseHp: 130,  baseDamage: 12, baseDefense: 7,  baseXp: 78,  baseGold: 28, level: 7 },
    ghoul:         { name: 'Ghoul',         baseHp: 120,  baseDamage: 15, baseDefense: 6,  baseXp: 85,  baseGold: 32, level: 8 },
    skeleton:      { name: 'Skeleton',      baseHp: 110,  baseDamage: 12, baseDefense: 9,  baseXp: 72,  baseGold: 30, level: 7 },
    grave_robber:  { name: 'Grave Robber',  baseHp: 140,  baseDamage: 17, baseDefense: 7,  baseXp: 90,  baseGold: 85, level: 9 },

    // Dark Swamp (10-12)
    swamp_hag:      { name: 'Swamp Hag',       baseHp: 230, baseDamage: 23, baseDefense: 12, baseXp: 185, baseGold: 92,  level: 11 },
    plague_zombie:  { name: 'Plague Zombie',    baseHp: 210, baseDamage: 21, baseDefense: 10, baseXp: 165, baseGold: 75,  level: 10 },
    giant_leech:    { name: 'Giant Leech',      baseHp: 200, baseDamage: 20, baseDefense: 11, baseXp: 160, baseGold: 68,  level: 10 },
    bog_beast:      { name: 'Bog Beast',        baseHp: 270, baseDamage: 26, baseDefense: 15, baseXp: 215, baseGold: 108, level: 12 },
    corrupted_treant:{ name: 'Corrupted Treant',baseHp: 310, baseDamage: 29, baseDefense: 18, baseXp: 245, baseGold: 122, level: 12 },

    // Cursed Ruins (13-15)
    cursed_knight:   { name: 'Cursed Knight',   baseHp: 290, baseDamage: 28, baseDefense: 20, baseXp: 225, baseGold: 112, level: 14 },
    shadow_stalker:  { name: 'Shadow Stalker',  baseHp: 250, baseDamage: 31, baseDefense: 14, baseXp: 205, baseGold: 102, level: 14 },
    ruin_guardian:   { name: 'Ruin Guardian',   baseHp: 370, baseDamage: 33, baseDefense: 25, baseXp: 285, baseGold: 142, level: 15 },
    spectral_warrior:{ name: 'Spectral Warrior',baseHp: 280, baseDamage: 30, baseDefense: 16, baseXp: 215, baseGold: 108, level: 14 },
    dark_priest:     { name: 'Dark Priest',     baseHp: 260, baseDamage: 34, baseDefense: 15, baseXp: 255, baseGold: 128, level: 15 },

    // Demon Portal (19-21)
    lesser_demon:  { name: 'Lesser Demon',  baseHp: 330, baseDamage: 36, baseDefense: 18, baseXp: 305, baseGold: 152, level: 19 },
    hellhound:     { name: 'Hellhound',     baseHp: 300, baseDamage: 39, baseDefense: 16, baseXp: 285, baseGold: 142, level: 19 },
    imp_swarm:     { name: 'Imp Swarm',     baseHp: 270, baseDamage: 33, baseDefense: 14, baseXp: 265, baseGold: 132, level: 19 },
    pit_fiend:     { name: 'Pit Fiend',     baseHp: 410, baseDamage: 43, baseDefense: 22, baseXp: 405, baseGold: 202, level: 20 },
    demon_lord:    { name: 'Demon Lord',    baseHp: 510, baseDamage: 49, baseDefense: 28, baseXp: 555, baseGold: 278, level: 21 },

    // Corrupted Temple (22-24)
    fallen_angel:        { name: 'Fallen Angel',        baseHp: 450, baseDamage: 46, baseDefense: 25, baseXp: 485, baseGold: 242, level: 22 },
    corrupted_paladin:   { name: 'Corrupted Paladin',   baseHp: 490, baseDamage: 49, baseDefense: 30, baseXp: 525, baseGold: 262, level: 23 },
    dark_oracle:         { name: 'Dark Oracle',         baseHp: 390, baseDamage: 51, baseDefense: 22, baseXp: 465, baseGold: 232, level: 22 },
    abomination:         { name: 'Abomination',         baseHp: 570, baseDamage: 53, baseDefense: 32, baseXp: 605, baseGold: 302, level: 24 },
    void_priest:         { name: 'Void Priest',         baseHp: 430, baseDamage: 56, baseDefense: 26, baseXp: 545, baseGold: 272, level: 23 },

    // Celestial Spire (25)
    celestial_guardian:  { name: 'Celestial Guardian',  baseHp: 890, baseDamage: 72, baseDefense: 42, baseXp: 1005, baseGold: 502, level: 25 },
    arch_angel:          { name: 'Arch Angel',          baseHp: 970, baseDamage: 76, baseDefense: 44, baseXp: 1105, baseGold: 552, level: 25 },
    divine_champion:     { name: 'Divine Champion',     baseHp: 930, baseDamage: 79, baseDefense: 46, baseXp: 1055, baseGold: 527, level: 25 },
    seraphim:            { name: 'Seraphim',            baseHp: 1050, baseDamage: 83, baseDefense: 48, baseXp: 1155, baseGold: 577, level: 25 },
    god_avatar:          { name: 'Avatar of a God',     baseHp: 1210, baseDamage: 91, baseDefense: 50, baseXp: 1505, baseGold: 752, level: 25, isBoss: true }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXPLORATION_ZONES, ZONE_MONSTERS };
}
