// exploration-zones.js - Expanded World Map
// Additional zones for levels 1-25 progression

const EXPLORATION_ZONES = {
    // ═══════════════════════════════════════════════════════════════
    // STARTING ZONES (Levels 1-5)
    // ═══════════════════════════════════════════════════════════════
    forest: {
        name: 'Whispering Forest',
        description: 'A dark forest filled with minor creatures and mysteries.',
        enemyLevelRange: [1, 5],
        encounters: ['goblin', 'wolf', 'giant_spider', 'wild_boar', 'bandit', 'poop_slime', 'slime', 'kobold', 'giant_rat', 'forest_imp'],
        requiredLevel: 1,
        locked: false,
        adventureChance: 0.05 // 5% chance for special adventure
    },
    
    riverside: {
        name: 'Misty Riverside',
        description: 'A foggy riverbank where strange creatures lurk in the shallows.',
        enemyLevelRange: [2, 6],
        encounters: ['river_troll', 'swamp_lurker', 'giant_frog', 'water_snake'],
        requiredLevel: 2,
        locked: false,
        adventureChance: 0.04
    },

    // ═══════════════════════════════════════════════════════════════
    // EARLY GAME ZONES (Levels 6-10)
    // ═══════════════════════════════════════════════════════════════
    plains: {
        name: 'Endless Plains',
        description: 'Open grasslands with roaming beasts and bandit camps.',
        enemyLevelRange: [6, 10],
        encounters: ['orc', 'dire_wolf', 'bandit', 'plains_lion', 'centaur'],
        requiredLevel: 6,
        locked: true,
        unlockMessage: 'Defeat your class master in the forest to unlock this area!',
        adventureChance: 0.06
    },
    
    haunted_graveyard: {
        name: 'Haunted Graveyard',
        description: 'An ancient cemetery where the dead don\'t rest peacefully.',
        enemyLevelRange: [7, 11],
        encounters: ['zombie', 'ghoul', 'skeleton', 'wraith', 'grave_robber'],
        requiredLevel: 7,
        locked: true,
        unlockMessage: 'Available after reaching level 7',
        adventureChance: 0.07
    },

    // ═══════════════════════════════════════════════════════════════
    // MID GAME ZONES (Levels 11-15)
    // ═══════════════════════════════════════════════════════════════
    cave: {
        name: 'Shadow Cavern',
        description: 'Deep caves filled with dangerous monsters and hidden treasures.',
        enemyLevelRange: [11, 15],
        encounters: ['troll', 'skeleton_warrior', 'dark_mage', 'cave_drake', 'stone_golem'],
        requiredLevel: 11,
        locked: true,
        unlockMessage: 'Defeat your class master in the plains to unlock this area!',
        adventureChance: 0.08
    },
    
    dark_swamp: {
        name: 'Blackwater Swamp',
        description: 'A treacherous swamp filled with poison and decay.',
        enemyLevelRange: [12, 16],
        encounters: ['swamp_hag', 'plague_zombie', 'giant_leech', 'bog_beast', 'corrupted_treant'],
        requiredLevel: 12,
        locked: true,
        unlockMessage: 'Available after reaching level 12',
        adventureChance: 0.08
    },
    
    cursed_ruins: {
        name: 'Cursed Ruins',
        description: 'The remains of an ancient civilization, cursed by dark magic.',
        enemyLevelRange: [13, 17],
        encounters: ['cursed_knight', 'shadow_stalker', 'ruin_guardian', 'spectral_warrior', 'dark_priest'],
        requiredLevel: 13,
        locked: true,
        unlockMessage: 'Available after reaching level 13',
        adventureChance: 0.09
    },

    // ═══════════════════════════════════════════════════════════════
    // LATE GAME ZONES (Levels 16-20)
    // ═══════════════════════════════════════════════════════════════
    crypt: {
        name: 'Ancient Crypt',
        description: 'An ancient tomb haunted by powerful undead.',
        enemyLevelRange: [16, 20],
        encounters: ['lich', 'death_knight', 'wraith', 'bone_dragon', 'vampire_lord'],
        requiredLevel: 16,
        locked: true,
        unlockMessage: 'Defeat your class master in the cave to unlock this area!',
        adventureChance: 0.10
    },
    
    demon_portal: {
        name: 'Demon Portal',
        description: 'A tear in reality where demons pour forth.',
        enemyLevelRange: [17, 21],
        encounters: ['lesser_demon', 'hellhound', 'imp_swarm', 'pit_fiend', 'demon_lord'],
        requiredLevel: 17,
        locked: true,
        unlockMessage: 'Available after reaching level 17',
        adventureChance: 0.10
    },
    
    corrupted_temple: {
        name: 'Corrupted Temple',
        description: 'A once-holy temple now twisted by dark forces.',
        enemyLevelRange: [18, 22],
        encounters: ['fallen_angel', 'corrupted_paladin', 'dark_oracle', 'abomination', 'void_priest'],
        requiredLevel: 18,
        locked: true,
        unlockMessage: 'Available after reaching level 18',
        adventureChance: 0.11
    },

    // ═══════════════════════════════════════════════════════════════
    // ENDGAME ZONES (Levels 21-25)
    // ═══════════════════════════════════════════════════════════════
    volcano: {
        name: 'Volcanic Wastes',
        description: 'A scorched wasteland of fire, ash, and ancient power.',
        enemyLevelRange: [21, 25],
        encounters: ['fire_elemental', 'lava_golem', 'phoenix', 'magma_dragon', 'flame_titan'],
        requiredLevel: 21,
        locked: true,
        unlockMessage: 'Defeat your class master in the crypt to unlock this area!',
        adventureChance: 0.12
    },
    
    frozen_tundra: {
        name: 'Frozen Tundra',
        description: 'An endless expanse of ice and snow, home to ancient horrors.',
        enemyLevelRange: [22, 25],
        encounters: ['frost_giant', 'ice_drake', 'yeti', 'frozen_revenant', 'frost_wyrm'],
        requiredLevel: 22,
        locked: true,
        unlockMessage: 'Available after reaching level 22',
        adventureChance: 0.12
    },
    
    void_realm: {
        name: 'Void Realm',
        description: 'A dimension between worlds where reality itself breaks down.',
        enemyLevelRange: [23, 25],
        encounters: ['void_walker', 'reality_tear', 'entropy_beast', 'nihil_spawn', 'void_lord'],
        requiredLevel: 23,
        locked: true,
        unlockMessage: 'Available after reaching level 23',
        adventureChance: 0.13
    },
    
    celestial_spire: {
        name: 'Celestial Spire',
        description: 'A tower reaching into the heavens, guarded by divine beings.',
        enemyLevelRange: [24, 25],
        encounters: ['celestial_guardian', 'arch_angel', 'divine_champion', 'seraphim', 'god_avatar'],
        requiredLevel: 24,
        locked: true,
        unlockMessage: 'Available after reaching level 24',
        adventureChance: 0.15
    }
};

// Additional monsters for new zones
const ZONE_MONSTERS = {
    // Riverside (2-6)
    river_troll: { name: 'River Troll', baseHp: 45, baseDamage: 8, baseDefense: 6, baseXp: 35, baseGold: 20, level: 3 },
    swamp_lurker: { name: 'Swamp Lurker', baseHp: 35, baseDamage: 9, baseDefense: 4, baseXp: 30, baseGold: 15, level: 3 },
    giant_frog: { name: 'Giant Frog', baseHp: 30, baseDamage: 7, baseDefense: 5, baseXp: 25, baseGold: 12, level: 2 },
    water_snake: { name: 'Water Snake', baseHp: 25, baseDamage: 10, baseDefense: 3, baseXp: 28, baseGold: 10, level: 3 },
    
    // Plains additions (6-10)
    plains_lion: { name: 'Plains Lion', baseHp: 70, baseDamage: 15, baseDefense: 8, baseXp: 90, baseGold: 40, level: 7 },
    centaur: { name: 'Centaur Warrior', baseHp: 85, baseDamage: 17, baseDefense: 10, baseXp: 110, baseGold: 55, level: 8 },
    
    // Haunted Graveyard (7-11)
    zombie: { name: 'Zombie', baseHp: 60, baseDamage: 12, baseDefense: 7, baseXp: 75, baseGold: 25, level: 7 },
    ghoul: { name: 'Ghoul', baseHp: 55, baseDamage: 14, baseDefense: 6, baseXp: 80, baseGold: 30, level: 8 },
    skeleton: { name: 'Skeleton', baseHp: 50, baseDamage: 11, baseDefense: 9, baseXp: 70, baseGold: 28, level: 7 },
    wraith: { name: 'Wraith', baseHp: 75, baseDamage: 18, baseDefense: 8, baseXp: 120, baseGold: 60, level: 10 },
    grave_robber: { name: 'Grave Robber', baseHp: 65, baseDamage: 16, baseDefense: 7, baseXp: 85, baseGold: 80, level: 9 },
    
    // Dark Swamp (12-16)
    swamp_hag: { name: 'Swamp Hag', baseHp: 110, baseDamage: 22, baseDefense: 12, baseXp: 180, baseGold: 90, level: 13 },
    plague_zombie: { name: 'Plague Zombie', baseHp: 100, baseDamage: 20, baseDefense: 10, baseXp: 160, baseGold: 70, level: 12 },
    giant_leech: { name: 'Giant Leech', baseHp: 95, baseDamage: 19, baseDefense: 11, baseXp: 155, baseGold: 65, level: 12 },
    bog_beast: { name: 'Bog Beast', baseHp: 130, baseDamage: 25, baseDefense: 15, baseXp: 210, baseGold: 105, level: 14 },
    corrupted_treant: { name: 'Corrupted Treant', baseHp: 150, baseDamage: 28, baseDefense: 18, baseXp: 240, baseGold: 120, level: 15 },
    
    // Cursed Ruins (13-17)
    cursed_knight: { name: 'Cursed Knight', baseHp: 140, baseDamage: 27, baseDefense: 20, baseXp: 220, baseGold: 110, level: 14 },
    shadow_stalker: { name: 'Shadow Stalker', baseHp: 120, baseDamage: 30, baseDefense: 14, baseXp: 200, baseGold: 100, level: 14 },
    ruin_guardian: { name: 'Ruin Guardian', baseHp: 180, baseDamage: 32, baseDefense: 25, baseXp: 280, baseGold: 140, level: 16 },
    spectral_warrior: { name: 'Spectral Warrior', baseHp: 135, baseDamage: 29, baseDefense: 16, baseXp: 210, baseGold: 105, level: 15 },
    dark_priest: { name: 'Dark Priest', baseHp: 125, baseDamage: 33, baseDefense: 15, baseXp: 250, baseGold: 125, level: 16 },
    
    // Demon Portal (17-21)
    lesser_demon: { name: 'Lesser Demon', baseHp: 160, baseDamage: 35, baseDefense: 18, baseXp: 300, baseGold: 150, level: 18 },
    hellhound: { name: 'Hellhound', baseHp: 145, baseDamage: 38, baseDefense: 16, baseXp: 280, baseGold: 140, level: 17 },
    imp_swarm: { name: 'Imp Swarm', baseHp: 130, baseDamage: 32, baseDefense: 14, baseXp: 260, baseGold: 130, level: 17 },
    pit_fiend: { name: 'Pit Fiend', baseHp: 200, baseDamage: 42, baseDefense: 22, baseXp: 400, baseGold: 200, level: 19 },
    demon_lord: { name: 'Demon Lord', baseHp: 250, baseDamage: 48, baseDefense: 28, baseXp: 550, baseGold: 275, level: 21 },
    
    // Corrupted Temple (18-22)
    fallen_angel: { name: 'Fallen Angel', baseHp: 220, baseDamage: 45, baseDefense: 25, baseXp: 480, baseGold: 240, level: 20 },
    corrupted_paladin: { name: 'Corrupted Paladin', baseHp: 240, baseDamage: 48, baseDefense: 30, baseXp: 520, baseGold: 260, level: 21 },
    dark_oracle: { name: 'Dark Oracle', baseHp: 190, baseDamage: 50, baseDefense: 22, baseXp: 460, baseGold: 230, level: 19 },
    abomination: { name: 'Abomination', baseHp: 280, baseDamage: 52, baseDefense: 32, baseXp: 600, baseGold: 300, level: 22 },
    void_priest: { name: 'Void Priest', baseHp: 210, baseDamage: 55, baseDefense: 26, baseXp: 540, baseGold: 270, level: 21 },
    
    // Frozen Tundra (22-25)
    frost_giant: { name: 'Frost Giant', baseHp: 350, baseDamage: 60, baseDefense: 35, baseXp: 800, baseGold: 400, level: 23 },
    ice_drake: { name: 'Ice Drake', baseHp: 320, baseDamage: 58, baseDefense: 32, baseXp: 750, baseGold: 375, level: 22 },
    yeti: { name: 'Yeti', baseHp: 300, baseDamage: 55, baseDefense: 30, baseXp: 700, baseGold: 350, level: 22 },
    frozen_revenant: { name: 'Frozen Revenant', baseHp: 340, baseDamage: 62, baseDefense: 34, baseXp: 780, baseGold: 390, level: 23 },
    frost_wyrm: { name: 'Frost Wyrm', baseHp: 450, baseDamage: 70, baseDefense: 40, baseXp: 1000, baseGold: 500, level: 25 },
    
    // Void Realm (23-25)
    void_walker: { name: 'Void Walker', baseHp: 380, baseDamage: 65, baseDefense: 36, baseXp: 850, baseGold: 425, level: 24 },
    reality_tear: { name: 'Reality Tear', baseHp: 360, baseDamage: 68, baseDefense: 33, baseXp: 820, baseGold: 410, level: 23 },
    entropy_beast: { name: 'Entropy Beast', baseHp: 400, baseDamage: 72, baseDefense: 38, baseXp: 900, baseGold: 450, level: 24 },
    nihil_spawn: { name: 'Nihil Spawn', baseHp: 420, baseDamage: 75, baseDefense: 40, baseXp: 950, baseGold: 475, level: 25 },
    void_lord: { name: 'Void Lord', baseHp: 500, baseDamage: 80, baseDefense: 45, baseXp: 1200, baseGold: 600, level: 25 },
    
    // Celestial Spire (24-25)
    celestial_guardian: { name: 'Celestial Guardian', baseHp: 440, baseDamage: 70, baseDefense: 42, baseXp: 1000, baseGold: 500, level: 24 },
    arch_angel: { name: 'Arch Angel', baseHp: 480, baseDamage: 75, baseDefense: 44, baseXp: 1100, baseGold: 550, level: 25 },
    divine_champion: { name: 'Divine Champion', baseHp: 460, baseDamage: 78, baseDefense: 46, baseXp: 1050, baseGold: 525, level: 25 },
    seraphim: { name: 'Seraphim', baseHp: 520, baseDamage: 82, baseDefense: 48, baseXp: 1150, baseGold: 575, level: 25 },
    god_avatar: { name: 'Avatar of a God', baseHp: 600, baseDamage: 90, baseDefense: 50, baseXp: 1500, baseGold: 750, level: 25, isBoss: true }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXPLORATION_ZONES, ZONE_MONSTERS };
}
