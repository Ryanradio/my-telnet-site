// ═══════════════════════════════════════════════════════════════
// guild.js — ADVENTURERS GUILD SYSTEM (COMPLETE)
//
// PROGRESSION:
// Standard (lv1,4,7,10,13,16,19) → Kill 5 normals → Gold+XP → Unlocks Elite
// Elite    (lv2,5,8,11,14,17,20) → Kill 3 rares   → Gold+XP+Blue Armor → Unlocks Boss
// Boss     (lv3,6,9,12,15,18,21) → Kill 1 boss    → Gold+XP+Purple Weapon
// Ultimate (lv22,23,24)           → Kill 1 epic boss → Gold+XP+Orange Weapon
// Final    (lv25)                  → Special dragon quest
// ═══════════════════════════════════════════════════════════════

// ── Kill counts by quest type ─────────────────────────────────
function guildKillCount(questType) {
    if (questType === 'standard') return 5;
    if (questType === 'elite') return 3;
    return 1; // boss, ultimate, and final
}

// ── XP/Gold rewards (scaled by quest type) ────────────────────
function guildXpReward(level, questType) {
    let mult = 1.0;
    if (questType === 'elite') mult = 1.3;
    if (questType === 'boss') mult = 1.6;
    if (questType === 'ultimate') mult = 2.0;
    if (questType === 'final') mult = 3.0;
    return Math.floor(level * 100 * mult);
}

function guildGoldReward(level, questType) {
    let mult = 1.0;
    if (questType === 'elite') mult = 1.3;
    if (questType === 'boss') mult = 1.6;
    if (questType === 'ultimate') mult = 2.0;
    if (questType === 'final') mult = 3.0;
    return Math.floor(level * 60 * mult);
}

// ── Class weapon pools for rewards ────────────────────────────
const GUILD_WEAPON_POOLS = {
    warrior:     ['sword', 'axe', 'hammer'],
    paladin:     ['sword', 'mace', 'hammer'],
    cleric:      ['tome', 'staff', 'mace'],
    mage:        ['wand', 'staff', 'orb'],
    warlock:     ['staff', 'wand', 'dagger'],
    rogue:       ['dagger', 'short_sword'],
    hunter:      ['bow', 'crossbow'],
    ranger:      ['bow', 'crossbow'],
    druid:       ['staff', 'club'],
    runesmith:   ['hammer', 'axe', 'staff'],
    // Evolved classes
    warlord:     ['sword', 'axe', 'greatsword'],
    crusader:    ['sword', 'mace', 'warhammer'],
    high_priest: ['tome', 'staff', 'mace'],
    archmage:    ['wand', 'staff', 'orb'],
    demonlord:   ['staff', 'wand', 'dagger'],
    shadowmaster:['dagger', 'short_sword'],
    beastlord:   ['bow', 'spear'],
    deadeye:     ['bow', 'crossbow']
};

// ── Class armor pools ─────────────────────────────────────────
const GUILD_ARMOR_POOLS = {
    warrior:     ['plate', 'chain'],
    paladin:     ['plate', 'chain'],
    cleric:      ['robe', 'leather'],
    mage:        ['robe'],
    warlock:     ['robe', 'leather'],
    rogue:       ['leather'],
    hunter:      ['leather'],
    ranger:      ['leather'],
    druid:       ['leather', 'robe'],
    runesmith:   ['chain', 'leather'],
    // Evolved classes
    warlord:     ['plate'],
    crusader:    ['plate'],
    high_priest: ['robe'],
    archmage:    ['robe'],
    demonlord:   ['robe', 'leather'],
    shadowmaster:['leather'],
    beastlord:   ['leather']
};

// ── Generate elite reward (Blue armor) ────────────────────────
function generateEliteArmorReward(p, questLevel) {
    const baseClass = p.baseClass || p.class;
    const armorTypes = GUILD_ARMOR_POOLS[baseClass] || ['leather'];
    const armorType = armorTypes[Math.floor(Math.random() * armorTypes.length)];
    const id = `guild_elite_armor_${baseClass}_lv${questLevel}_${Date.now()}`;
    
    // Scale defense to QUEST LEVEL
    const baseDef = Math.floor(questLevel * 1.5 + 5);
    
    const armor = {
        id,
        name: `Guild Elite ${armorType.charAt(0).toUpperCase() + armorType.slice(1)}`,
        type: armorType,
        quality: 'rare', // Blue
        level: questLevel,
        baseDefense: baseDef,
        baseMagicBonus: Math.floor(questLevel * 0.5),
        cost: 0,
        sellValue: Math.floor(questLevel * 40),
        classRestriction: baseClass,
        gems: [], // 1 empty slot
        isGuildReward: true,
        isDropped: true,
        unarmored: false,
        description: `Elite guild armor from level ${questLevel} quest`
    };
    
    return armor;
}

// ═══════════════════════════════════════════════════════════════
// GENERATE BOSS WEAPON REWARD - With Thematic Names
// ═══════════════════════════════════════════════════════════════
function generateBossWeaponReward(p, questLevel) {
    const baseClass = p.baseClass || p.class;
    const weaponTypes = GUILD_WEAPON_POOLS[baseClass] || ['sword'];
    const weaponType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
    const id = `guild_boss_weapon_${baseClass}_lv${questLevel}_${Date.now()}`;
    
    // Scale damage to QUEST LEVEL
    const baseDmg = Math.floor(questLevel * 2.5 + 8);
    const maxDmg = Math.floor(baseDmg * 1.6);
    const hasMagic = ['mage','warlock','cleric','druid','archmage','high_priest','demonlord'].includes(baseClass);
    
    // Generate thematic name based on class and weapon type
    let themedName = '';
    
    // ======================================================
    // CLERIC / HIGH PRIEST NAMES
    // ======================================================
    if (baseClass === 'cleric' || baseClass === 'high_priest') {
        const clericNames = {
            tome: [
                'Tome of Divine Judgment', 'Codex of Eternal Light', 'Scripture of the Faithful',
                'Gospel of Redemption', 'Book of Blessings', 'Word of the Gods',
                'Scrolls of Healing', 'Prayer Book of the Saints', 'Canticle of Light'
            ],
            mace: [
                'Sacred Mace of Light', 'Hammer of the Healer', 'Mace of Redemption',
                'Crusader\'s Flail', 'Rod of Correction', 'Scepter of the Dawn',
                'Bludgeon of Faith', 'War Mace of the Clergy', 'Morning Star of Hope'
            ],
            staff: [
                'Staff of the Pilgrim', 'Crook of the Shepherd', 'Rod of Blessings',
                'Pilgrim\'s Staff', 'Staff of Healing', 'Rod of the Healer',
                'Pastoral Staff', 'Crosier of the High Priest', 'Staff of Life'
            ]
        };
        const options = clericNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of Faith`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // WARRIOR / WARLORD NAMES
    // ======================================================
    else if (baseClass === 'warrior' || baseClass === 'warlord') {
        const warriorNames = {
            sword: [
                'Sword of Conquest', 'Blade of the Legion', 'Warblade',
                'Greatsword of Glory', 'Battlefield Legacy', 'Sword of Victory',
                'Conqueror\'s Blade', 'Honor\'s Edge', 'Triumphal Sword'
            ],
            axe: [
                'Axe of Ruin', 'Cleaver of Battle', 'Sundering Axe',
                'Bloodaxe of the North', 'Warbringer', 'Skullcleaver',
                'Battle Axe of Fury', 'Rage\'s Edge', 'Executioner\'s Axe'
            ],
            hammer: [
                'Hammer of Wrath', 'Maul of the Colossus', 'Crusher',
                'War Hammer of the Mountain', 'Thunderstrike', 'Earthshaker',
                'Skullcracker', 'Oathkeeper\'s Hammer', 'Might of the Mountain'
            ],
            greatsword: [
                'Titan\'s Greatsword', 'Sword of Kings', 'Blade of Legends',
                'Mountaincleaver', 'Dragonfang', 'Victory\'s Promise'
            ]
        };
        const options = warriorNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of Might`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // PALADIN / CRUSADER NAMES
    // ======================================================
    else if (baseClass === 'paladin' || baseClass === 'crusader') {
        const paladinNames = {
            sword: [
                'Sword of the Light', 'Blade of the Order', 'Crusader\'s Oath',
                'Vindicator', 'Justice\'s Edge', 'Holy Avenger',
                'Sword of Righteousness', 'Oathkeeper', 'Dawnbringer'
            ],
            mace: [
                'Mace of the Just', 'Hammer of the Crusade', 'War Mace of the Faith',
                'Righteous Flail', 'Scepter of Truth', 'Mace of Valor',
                'Holy Mace of the Templar', 'Crusher of Heretics', 'Light\'s Judgment'
            ],
            hammer: [
                'Hammer of the Crusader', 'Warhammer of the Order', "Judgment's Maul",
                'Hammer of Righteous Fury', "Justice's Hammer", 'Hammer of the Dawn'
            ]
        };
        const options = paladinNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of the Order`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // MAGE / ARCHMAGE NAMES
    // ======================================================
    else if (baseClass === 'mage' || baseClass === 'archmage') {
        const mageNames = {
            wand: [
                'Wand of Arcane Fire', 'Spellwood Wand', 'Conduit of Power',
                'Wand of the Magi', 'Spellstrike', 'Focus of the Weave',
                'Arcane Conduit', 'Wand of Wonders', 'Spellspire'
            ],
            staff: [
                'Staff of the Magi', 'Archspire', 'Rod of Focus',
                'Staff of the Sorcerer', 'Spellweaver\'s Staff', 'Arcane Pillar',
                'Staff of the Archmage', 'Magefire Staff', 'Conjurer\'s Rod'
            ],
            orb: [
                'Orb of Scrying', 'Crystal of Dominion', 'Sphere of Secrets',
                'Orb of the Magi', 'Crystal Ball of Farseeing', 'Sphere of Power',
                'Orb of Infinite Wisdom', 'Crystal of the Weave', 'Focus of the Arcane'
            ]
        };
        const options = mageNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of Sorcery`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // WARLOCK / DEMONLORD NAMES
    // ======================================================
    else if (baseClass === 'warlock' || baseClass === 'demonlord') {
        const warlockNames = {
            staff: [
                'Staff of Shadows', 'Soulbinder', 'Rod of the Void',
                'Staff of the Nether', 'Shadowspire', 'Cursed Crook',
                'Staff of Torment', 'Abyssal Scepter', 'Voidcaller\'s Staff'
            ],
            wand: [
                'Wand of Dark Whispers', 'Shadow Wand', 'Soul Drainer',
                'Wand of the Abyss', 'Cursed Focus', 'Wand of Torment',
                'Shadowtongue', 'Void Wand', 'Demonheart Wand'
            ],
            dagger: [
                'Soulreaper Dagger', 'Shadowfang', 'Demon Stiletto',
                'Dagger of the Void', 'Cursed Blade', 'Soulpiercer',
                'Abyssal Dagger', 'Dark Ritual Dagger', 'Bloodletter'
            ]
        };
        const options = warlockNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of the Void`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // ROGUE / SHADOWMASTER NAMES
    // ======================================================
    else if (baseClass === 'rogue' || baseClass === 'shadowmaster') {
        const rogueNames = {
            dagger: [
                'Shadow Dagger', 'Night\'s Edge', 'Assassin\'s Kiss',
                'Silent Blade', 'Venomfang', 'Death\'s Whisper',
                'Gloom Dagger', 'Shadowpiercer', 'Throatcutter'
            ],
            short_sword: [
                'Quickblade', 'Swift Stinger', 'Fleetfang',
                'Shadow Shortsword', 'Crimson Edge', 'Dancing Blade',
                'Nightrunner\'s Sword', 'Silent Death', 'Flickerblade'
            ]
        };
        const options = rogueNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of Shadows`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // HUNTER / BEASTLORD NAMES
    // ======================================================
    else if (baseClass === 'hunter' || baseClass === 'beastlord') {
        const hunterNames = {
            bow: [
                'Longbow of the Hunt', 'Stag\'s Antler Bow', 'Windcaller',
                'Eagle Eye', 'Trailblazer', 'Forest Guardian',
                'Bow of the Stalker', 'Silent Wind', 'Predator\'s Kiss'
            ],
            crossbow: [
                'Heavy Crossbow of the Hunt', 'Siege Crossbow', 'Beast Piercer',
                'Quickfire Crossbow', 'Hunter\'s Friend', 'Bolt Thrower',
                'Stag Piercer', 'Deadeye Crossbow', 'Swift Bolt'
            ],
            spear: [
                'Hunting Spear', 'Beast Impaler', 'Wildheart Spear',
                'Tracker\'s Spear', 'Boar Sticker', 'Forest Pike',
                'Stag Spear', 'Hunter\'s Lance', 'Bloodseeker'
            ]
        };
        const options = hunterNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of the Hunt`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // DRUID / ARCHDRUID NAMES
    // ======================================================
    else if (baseClass === 'druid' || baseClass === 'archdruid') {
        const druidNames = {
            staff: [
                'Staff of the Forest', 'Oakheart', 'Willow Wand',
                'Staff of Seasons', 'Thorned Staff', 'Grovetender',
                'Staff of the Wild', 'Forestkeeper', 'Branch of the Ancients'
            ],
            club: [
                'Wildwood Club', 'Stone Club', 'Feral Maul',
                'Club of the Bear', 'Rootclub', 'Thorn Maul',
                'Earthcracker', 'Boulder Club', 'Primeval Cudgel'
            ]
        };
        const options = druidNames[weaponType] || [`${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)} of the Wild`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // RUNESMITH NAMES
    // ======================================================
    else if (baseClass === 'runesmith') {
        const runesmithNames = {
            hammer: [
                'Rune Hammer', 'Inscribed Maul', 'Forgehammer',
                'Hammer of the Smith', 'Rune-etched Maul', 'Anvilstrike',
                'Hammer of Making', 'Sigil Hammer', 'Rune Forger'
            ],
            axe: [
                'Rune Axe', 'Inscribed Cleaver', 'Glyph Axe',
                'Axe of the Smith', 'Rune-etched Axe', 'Spellaxe',
                'Sigil Axe', 'Rune Rend', 'Enchanted Cleaver'
            ],
            staff: [
                'Rune Staff', 'Inscribed Staff', 'Glyph Rod',
                'Staff of the Smith', 'Rune-etched Staff', 'Spellstaff',
                'Sigil Staff', 'Rune Spire', 'Enchanted Staff'
            ]
        };
        const options = runesmithNames[weaponType] || [`Rune-Infused ${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)}`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // ======================================================
    // DEFAULT FALLBACK
    // ======================================================
    else {
        const genericNames = {
            sword: ['Guild Champion Sword', 'Legion Blade', 'Honor\'s Edge'],
            axe: ['Guild Champion Axe', 'Battle Cleaver', 'Glory\'s Edge'],
            hammer: ['Guild Champion Hammer', 'War Maul', 'Might\'s Echo'],
            dagger: ['Guild Champion Dagger', 'Shadow\'s Kiss', 'Silent Edge'],
            bow: ['Guild Champion Bow', 'Wind\'s Whisper', 'Eagle\'s Eye'],
            staff: ['Guild Champion Staff', 'Sage\'s Friend', 'Mage\'s Support']
        };
        const options = genericNames[weaponType] || [`Guild Boss ${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)}`];
        themedName = options[Math.floor(Math.random() * options.length)];
    }
    
    // Create the weapon object
    const weapon = {
        id,
        name: themedName,
        type: weaponType,
        quality: 'epic', // Purple
        level: questLevel,
        baseDamage: baseDmg,
        maxDamage: maxDmg,
        baseMagicDamage: hasMagic ? Math.floor(questLevel * 1.5 + 4) : 0,
        cost: 0,
        sellValue: Math.floor(questLevel * 60),
        classRestriction: baseClass,
        gems: [], // 2 empty slots
        modifiers: [],
        isGuildReward: true,
        isDropped: true,
        unarmed: false,
        description: `A powerful ${questLevel > 15 ? 'legendary' : 'epic'} weapon earned from a guild boss contract.`
    };
    
    return weapon;
}

// ═══════════════════════════════════════════════════════════════
// QUEST DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const GUILD_QUESTS = {
    // LEVEL 1-3 - Whispering Forest
    guild_1: { id:'guild_1', level:1, type:'standard', target:'goblin', targetName:'Goblin',
               flavorItem:'Goblin Ears', zone:'the Whispering Forest', emoji:'👺', nextQuest:'guild_2' },
    guild_2: { id:'guild_2', level:2, type:'elite', target:'goblin_shaman', targetName:'Goblin Shaman',
               flavorItem:'Shaman Totems', zone:'the Whispering Forest', emoji:'🔮', nextQuest:'guild_3' },
    guild_3: { id:'guild_3', level:3, type:'boss', target:'ogre', targetName:'Ogre',
               flavorItem:'Ogre Hide', zone:'the Whispering Forest', emoji:'👹', nextQuest:null },
    
    // LEVEL 4-6 - Misty Riverside
    guild_4: { id:'guild_4', level:4, type:'standard', target:'harpy', targetName:'Harpy',
               flavorItem:'Harpy Feathers', zone:'the Misty Riverside', emoji:'🦅', nextQuest:'guild_5' },
    guild_5: { id:'guild_5', level:5, type:'elite', target:'bandit', targetName:'Bandit Leader',
               flavorItem:'Stolen Goods', zone:'the Misty Riverside', emoji:'🗡️', nextQuest:'guild_6' },
    guild_6: { id:'guild_6', level:6, type:'boss', target:'flesh_golem', targetName:'Flesh Golem',
               flavorItem:'Golem Heart', zone:'the Misty Riverside', emoji:'🧟', nextQuest:null },
    
    // LEVEL 7-9 - Haunted Graveyard
    guild_7: { id:'guild_7', level:7, type:'standard', target:'skeleton', targetName:'Skeleton',
               flavorItem:'Finger Bones', zone:'the Haunted Graveyard', emoji:'💀', nextQuest:'guild_8' },
    guild_8: { id:'guild_8', level:8, type:'elite', target:'zombie', targetName:'Plague Zombie',
               flavorItem:'Plague Samples', zone:'the Haunted Graveyard', emoji:'🧟', nextQuest:'guild_9' },
    guild_9: { id:'guild_9', level:9, type:'boss', target:'werewolf', targetName:'Werewolf Alpha',
               flavorItem:'Alpha Claw', zone:'the Haunted Graveyard', emoji:'🐺', nextQuest:null },
    
    // LEVEL 10-12 - Blackwater Swamp
    guild_10: { id:'guild_10', level:10, type:'standard', target:'troll', targetName:'Troll',
                flavorItem:'Troll Hide', zone:'the Blackwater Swamp', emoji:'🧌', nextQuest:'guild_11' },
    guild_11: { id:'guild_11', level:11, type:'elite', target:'werewolf', targetName:'Werewolf',
                flavorItem:'Wolf Fangs', zone:'the Blackwater Swamp', emoji:'🐺', nextQuest:'guild_12' },
    guild_12: { id:'guild_12', level:12, type:'boss', target:'troll', targetName:'Cave Troll',
                flavorItem:'Troll Teeth', zone:'the Blackwater Swamp', emoji:'🧌', nextQuest:null },
    
    // LEVEL 13-15 - Cursed Ruins
    guild_13: { id:'guild_13', level:13, type:'standard', target:'dark_cultist', targetName:'Dark Cultist',
                flavorItem:'Cult Robes', zone:'the Cursed Ruins', emoji:'🔮', nextQuest:'guild_14' },
    guild_14: { id:'guild_14', level:14, type:'elite', target:'dark_priest', targetName:'Dark Priest',
                flavorItem:'Cursed Idols', zone:'the Cursed Ruins', emoji:'🗿', nextQuest:'guild_15' },
    guild_15: { id:'guild_15', level:15, type:'boss', target:'golem', targetName:'Ancient Golem',
                flavorItem:'Golem Core', zone:'the Cursed Ruins', emoji:'🗿', nextQuest:null },
    
    // LEVEL 16-18 - Shadow Cavern
    guild_16: { id:'guild_16', level:16, type:'standard', target:'cave_troll', targetName:'Cave Troll',
                flavorItem:'Troll Fat', zone:'the Shadow Cavern', emoji:'🧌', nextQuest:'guild_17' },
    guild_17: { id:'guild_17', level:17, type:'elite', target:'stone_golem', targetName:'Stone Golem',
                flavorItem:'Golem Core', zone:'the Shadow Cavern', emoji:'🗿', nextQuest:'guild_18' },
    guild_18: { id:'guild_18', level:18, type:'boss', target:'minotaur', targetName:'Minotaur',
                flavorItem:'Minotaur Horn', zone:'the Shadow Cavern', emoji:'🐂', nextQuest:null },
    
    // LEVEL 19-21 - Ancient Crypt
    guild_19: { id:'guild_19', level:19, type:'standard', target:'skeleton_warrior', targetName:'Skeleton Warrior',
                flavorItem:'Rusted Swords', zone:'the Ancient Crypt', emoji:'⚔️', nextQuest:'guild_20' },
    guild_20: { id:'guild_20', level:20, type:'elite', target:'vampire', targetName:'Vampire',
                flavorItem:'Vampire Fangs', zone:'the Ancient Crypt', emoji:'🧛', nextQuest:'guild_21' },
    guild_21: { id:'guild_21', level:21, type:'boss', target:'vampire_lord', targetName:'Vampire Lord',
                flavorItem:'Vampire Heart', zone:'the Ancient Crypt', emoji:'🧛', nextQuest:null },
    
    // LEVEL 22-24 - Demon Portal
    guild_22: { id:'guild_22', level:22, type:'standard', target:'demon', targetName:'Demon',
                flavorItem:'Demon Horn', zone:'the Demon Portal', emoji:'😈', nextQuest:'guild_23' },
    guild_23: { id:'guild_23', level:23, type:'elite', target:'pit_fiend', targetName:'Pit Fiend',
                flavorItem:'Infernal Brand', zone:'the Demon Portal', emoji:'🔥', nextQuest:'guild_24' },
    guild_24: { id:'guild_24', level:24, type:'boss', target:'dragon', targetName:'Dragon',
                flavorItem:'Dragon Scale', zone:'the Demon Portal', emoji:'🐉', nextQuest:null }
};

// ═══════════════════════════════════════════════════════════════
// BOSS ENEMY MAPPING - Maps guild quests to actual boss enemies
// ═══════════════════════════════════════════════════════════════
const BOSS_ENEMIES = {
    guild_3: 'ogre',
    guild_6: 'flesh_golem',
    guild_9: 'werewolf',
    guild_12: 'troll',
    guild_15: 'golem',
    guild_18: 'minotaur',
    guild_21: 'vampire_lord',
    guild_24: 'dragon'
};

// ═══════════════════════════════════════════════════════════════
// SHOW GUILD BOARD
// ═══════════════════════════════════════════════════════════════
function showGuild() {
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    
    // Initialize guildQuests if needed
    if (!p.guildQuests) p.guildQuests = { active: [], completed: {} };
    if (!Array.isArray(p.guildQuests.active)) p.guildQuests.active = [];
    
    const gq = p.guildQuests;
    const playerLevel = p.level;
    
    let html = `
        <div class="location-header">⚔️ ADVENTURERS GUILD</div>
        <button onclick="showTown()" style="margin-bottom:10px;">← BACK</button>
        ${renderPlayerStats()}
        <div class="message" style="border-color:#FFD700;">
            <p style="color:#FFD700;letter-spacing:2px;">GUILD NOTICE BOARD</p>
            <p style="font-size:13px;color:#888;">Complete contracts to earn rewards and unlock tougher challenges.</p>
        </div>
    `;
    
    // ── ACTIVE QUESTS SECTION ─────────────────────────────────────
    if (gq.active.length > 0) {
        html += `
            <div style="margin:15px 0;">
                <p style="color:#FFD700;font-size:15px;letter-spacing:2px;">⚔️ ACTIVE CONTRACTS (${gq.active.length})</p>`;
        
        gq.active.forEach(activeQuest => {
            const questDef = GUILD_QUESTS[activeQuest.questId];
            if (!questDef) return;
            
            const killCount = guildKillCount(questDef.type);
            const currentKills = Math.max(0, (p.kills?.[questDef.target] || 0) - (activeQuest.killsAtAccept || 0));
            const killProgress = Math.min(killCount, currentKills);
            const pct = Math.min(100, Math.floor((killProgress / killCount) * 100));
            const isReady = killProgress >= killCount;
            
            html += `
                <div class="message" style="border-color:${isReady ? '#00FF88' : '#FF8800'};margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-size:16px;">${questDef.emoji} ${questDef.targetName} (${questDef.type})</span>
                        <span style="color:${isReady ? '#00FF88' : '#FF8800'};font-size:12px;">
                            ${isReady ? '✓ READY' : killProgress + '/' + killCount}
                        </span>
                    </div>
                    <p style="font-size:13px;color:#888;margin:5px 0;">
                        Slay ${questDef.targetName}s in ${questDef.zone}
                    </p>
                    <div style="margin:8px 0;">
                        <div style="background:#111;border:1px solid #333;height:15px;border-radius:8px;overflow:hidden;">
                            <div style="background:linear-gradient(90deg,#FF8800,#FFD700);height:100%;width:${pct}%;border-radius:8px;"></div>
                        </div>
                    </div>`;
            
            if (isReady) {
                html += `
                    <div class="menu-option" onclick="showGuildTurnIn('${questDef.id}')"
                         style="border-color:#00FF88;color:#00FF88;text-align:center;margin-top:8px;padding:8px;">
                        ⚔️ TURN IN CONTRACT
                    </div>`;
            }
            
            html += `
                <div class="menu-option" onclick="abandonGuildQuest('${questDef.id}')"
                     style="border-color:#ff4444;color:#ff4444;text-align:center;margin-top:8px;font-size:12px;padding:6px;">
                    ✕ ABANDON
                </div>
            </div>`;
        });
        
        html += `</div>`;
    }
    
    // ── AVAILABLE QUESTS SECTION ─────────────────────────────────
    html += `<div style="margin:15px 0;"><p style="color:#4488FF;font-size:15px;letter-spacing:2px;">📋 AVAILABLE CONTRACTS</p>`;
    
    // Show all quests up to player level that are not completed or active
    for (let lvl = 1; lvl <= playerLevel; lvl++) {
        const questId = `guild_${lvl}`;
        const questDef = GUILD_QUESTS[questId];
        if (!questDef) continue;
        
        // Skip if completed
        if (gq.completed[questId]) continue;
        
        // Skip if already active
        if (gq.active.some(a => a.questId === questId)) continue;
        
        // PROGRESSION LOGIC:
        let shouldShow = false;
        
        if (questDef.type === 'standard') {
            shouldShow = true;
        }
        else if (questDef.type === 'elite') {
            const prevStandardId = `guild_${lvl-1}`;
            if (gq.completed[prevStandardId]) {
                shouldShow = true;
            }
        }
        else if (questDef.type === 'boss' || questDef.type === 'ultimate') {
            const prevEliteId = `guild_${lvl-1}`;
            if (gq.completed[prevEliteId]) {
                shouldShow = true;
            }
        }
        
        if (!shouldShow) continue;
        
        const killCount = guildKillCount(questDef.type);
        const rewardDesc = questDef.type === 'standard' ? 'Gold + XP' :
                          questDef.type === 'elite' ? 'Gold + XP + Blue Armor' :
                          questDef.type === 'boss' ? 'Gold + XP + Purple Weapon' :
                          'Gold + XP + Orange Weapon';
        
        html += `
            <div class="message" style="border-color:#4488FF;margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:16px;">${questDef.emoji} ${questDef.targetName} (Level ${lvl} - ${questDef.type})</span>
                </div>
                <p style="font-size:13px;color:#888;margin:5px 0;">
                    Slay ${killCount} ${questDef.targetName}s in ${questDef.zone}
                </p>
                <p><strong style="color:#FFD700;">Reward:</strong> ${rewardDesc}</p>
                <div class="menu-option" onclick="acceptGuildQuest('${questDef.id}')"
                     style="border-color:#4488FF;color:#4488FF;text-align:center;margin-top:8px;padding:8px;">
                    ✦ ACCEPT CONTRACT
                </div>
            </div>`;
    }
    
    html += `</div>`;
    
    // ── COMPLETED QUESTS ─────────────────────────────────────
    const completedCount = Object.keys(gq.completed).length;
    if (completedCount > 0) {
        html += `
            <div style="margin-top:20px;">
                <p style="color:#333;letter-spacing:2px;font-size:13px;">✓ COMPLETED CONTRACTS (${completedCount})</p>`;
        html += `</div>`;
    }
    
    html += `<button onclick="showTown()" style="margin-top:16px;">← BACK TO TOWN</button>`;
    screen.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// ACCEPT QUEST
// ═══════════════════════════════════════════════════════════════
function acceptGuildQuest(questId) {
    const p = gameState.player;
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;
    
    // Initialize if needed
    if (!p.guildQuests) p.guildQuests = { active: [], completed: {} };
    if (!Array.isArray(p.guildQuests.active)) p.guildQuests.active = [];
    
    // Check if already active or completed
    if (p.guildQuests.active.some(a => a.questId === questId)) {
        alert('You already have this contract!');
        return;
    }
    if (p.guildQuests.completed[questId]) {
        alert('You have already completed this contract!');
        return;
    }
    
    // Store kill count at acceptance
    const killsAtAccept = p.kills?.[questDef.target] || 0;
    
    p.guildQuests.active.push({
        questId,
        killsAtAccept,
        acceptedAt: Date.now()
    });
    
    saveGame();
    showGuild();
    
    // Flash confirmation
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#0a0a0a;border:2px solid #4488FF;padding:10px 20px;color:#4488FF;z-index:9999;';
    flash.textContent = `📋 Accepted: ${questDef.targetName} (${questDef.type})`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
}

// ═══════════════════════════════════════════════════════════════
// ABANDON QUEST
// ═══════════════════════════════════════════════════════════════
function abandonGuildQuest(questId) {
    const p = gameState.player;
    if (!p.guildQuests || !Array.isArray(p.guildQuests.active)) return;
    
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;
    
    if (confirm(`Abandon the ${questDef.targetName} contract? Progress will be lost.`)) {
        p.guildQuests.active = p.guildQuests.active.filter(q => q.questId !== questId);
        saveGame();
        showGuild();
    }
}

// ═══════════════════════════════════════════════════════════════
// CELEBRATION ANIMATION - FIXED VERSION
// ═══════════════════════════════════════════════════════════════
function playGuildCompletionAnimation(questDef) {
    // Create flash overlay
    const flash = document.createElement('div');
    flash.id = 'guild-completion-flash';
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        animation: guildCompletionFlash 0.8s ease-out forwards;
    `;
    document.body.appendChild(flash);
    
    // Add animation keyframes if they don't exist
    if (!document.getElementById('guild-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'guild-animation-styles';
        style.textContent = `
            @keyframes guildCompletionFlash {
                0% { opacity: 0; }
                20% { opacity: 0.9; }
                40% { opacity: 0.4; }
                60% { opacity: 0.7; }
                80% { opacity: 0.2; }
                100% { opacity: 0; }
            }
            
            @keyframes guildCompletionBurst {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes guildRewardPulse {
                0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
                50% { box-shadow: 0 0 40px rgba(255,215,0,0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create announcement banner - FIXED VERSION
    const bannerWrapper = document.createElement('div');
    bannerWrapper.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;
    `;

    const banner = document.createElement('div');
    banner.id = 'guild-completion-banner';
    banner.style.cssText = `
        position: relative;
        text-align: center;
        animation: guildCompletionBurst 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        transform-origin: center center;
        background: rgba(0,0,0,0.8);
        padding: 30px 50px;
        border-radius: 20px;
        border: 2px solid #FFD700;
        box-shadow: 0 0 50px rgba(255,215,0,0.3);
        white-space: nowrap;
    `;
    
    banner.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 10px; filter: drop-shadow(0 0 20px gold);">✨</div>
        <div style="font-family: 'Georgia', serif; font-size: 32px; color: #FFD700; text-shadow: 0 0 20px rgba(255,215,0,0.8); letter-spacing: 4px; white-space: nowrap;">
            CONTRACT COMPLETE!
        </div>
        <div style="font-family: 'VT323', monospace; font-size: 24px; color: #00FF88; margin-top: 10px; white-space: nowrap;">
            ${questDef.emoji} ${questDef.targetName} Slayer
        </div>
    `;

    bannerWrapper.appendChild(banner);
    document.body.appendChild(bannerWrapper);
    
    // Remove animation elements after they finish
    setTimeout(() => {
        if (flash && flash.parentNode) flash.remove();
        if (bannerWrapper && bannerWrapper.parentNode) bannerWrapper.remove();
    }, 2000);
}

// ═══════════════════════════════════════════════════════════════
// SHOW TURN-IN SCREEN with celebration animation
// ═══════════════════════════════════════════════════════════════
function showGuildTurnIn(questId) {
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;
    
    // Play celebration animation
    playGuildCompletionAnimation(questDef);
    
    // Show the reward selection screen after animation starts
    setTimeout(() => {
        showGuildRewardSelection(questId);
    }, 800);
}

// ═══════════════════════════════════════════════════════════════
// REWARD SELECTION SCREEN
// ═══════════════════════════════════════════════════════════════
function showGuildRewardSelection(questId) {
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;
    
    const xpReward = guildXpReward(questDef.level, questDef.type);
    const goldReward = guildGoldReward(questDef.level, questDef.type);
    
    let rewardHtml = '';
    let rewardChoiceHtml = '';
    
    // Standard quest: just gold and XP
    if (questDef.type === 'standard') {
        rewardHtml = `
            <div style="background: linear-gradient(135deg, #1a3a1a, #0a1a0a); border-radius: 8px; padding: 15px; margin: 15px 0;">
                <p style="color:#00FF88; font-size: 20px; margin: 0;">+ ${xpReward} XP</p>
                <p style="color:#FFD700; font-size: 20px; margin: 5px 0 0;">+ ${goldReward} Gold</p>
            </div>
        `;
        rewardChoiceHtml = `
            <div style="margin-top: 25px; animation: guildRewardPulse 2s ease-in-out infinite;">
                <div class="menu-option" onclick="claimGuildReward('${questDef.id}', null, null)"
                     style="border-color:#00FF88; color:#00FF88; text-align:center; padding:15px; font-size:18px;">
                    ⚔️ CLAIM REWARD
                </div>
            </div>
        `;
    }
    // Elite quest: choose between two armor pieces
    else if (questDef.type === 'elite') {
        const option1 = generateEliteArmorReward(p, questDef.level);
        const option2 = generateEliteArmorReward(p, questDef.level);
        
        window._guildRewardOptions = [option1, option2];
        window._guildRewardQuestId = questDef.id;
        window._guildRewardType = 'armor';
        
        rewardHtml = `
            <div style="background: linear-gradient(135deg, #1a3a1a, #0a1a0a); border-radius: 8px; padding: 15px; margin: 15px 0;">
                <p style="color:#00FF88; font-size: 20px; margin: 0;">+ ${xpReward} XP</p>
                <p style="color:#FFD700; font-size: 20px; margin: 5px 0;">+ ${goldReward} Gold</p>
                <p style="color:#4488FF; font-size: 18px; margin: 10px 0 0;">+ Blue (rare) class armor</p>
            </div>
        `;
        
        rewardChoiceHtml = `
            <div style="margin-top: 20px;">
                <p style="color:#4488FF; font-size: 20px; margin-bottom: 15px; text-align:center;">✨ CHOOSE YOUR REWARD ✨</p>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                    <div class="menu-option" onclick="claimGuildReward('${questDef.id}', 'armor', 0)"
                         style="border-color:#4488FF; flex: 1; min-width: 200px; padding: 15px; transition: transform 0.2s; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 5px;">🛡️</div>
                        <div style="color:#4488FF; font-size: 18px;">${option1.name}</div>
                        <div style="color:#888; font-size: 14px; margin-top: 5px;">DEF: ${option1.baseDefense} | 1 gem slot</div>
                    </div>
                    <div class="menu-option" onclick="claimGuildReward('${questDef.id}', 'armor', 1)"
                         style="border-color:#4488FF; flex: 1; min-width: 200px; padding: 15px; transition: transform 0.2s; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 5px;">🛡️</div>
                        <div style="color:#4488FF; font-size: 18px;">${option2.name}</div>
                        <div style="color:#888; font-size: 14px; margin-top: 5px;">DEF: ${option2.baseDefense} | 1 gem slot</div>
                    </div>
                </div>
            </div>
        `;
    }
    // Boss quest: choose between two weapons
    else if (questDef.type === 'boss') {
        const option1 = generateBossWeaponReward(p, questDef.level);
        const option2 = generateBossWeaponReward(p, questDef.level);
        
        window._guildRewardOptions = [option1, option2];
        window._guildRewardQuestId = questDef.id;
        window._guildRewardType = 'weapon';
        
        rewardHtml = `
            <div style="background: linear-gradient(135deg, #1a3a1a, #0a1a0a); border-radius: 8px; padding: 15px; margin: 15px 0;">
                <p style="color:#00FF88; font-size: 20px; margin: 0;">+ ${xpReward} XP</p>
                <p style="color:#FFD700; font-size: 20px; margin: 5px 0;">+ ${goldReward} Gold</p>
                <p style="color:#9933FF; font-size: 18px; margin: 10px 0 0;">+ Purple (epic) class weapon</p>
            </div>
        `;
        
        rewardChoiceHtml = `
            <div style="margin-top: 20px;">
                <p style="color:#9933FF; font-size: 20px; margin-bottom: 15px; text-align:center;">✨ CHOOSE YOUR REWARD ✨</p>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                    <div class="menu-option" onclick="claimGuildReward('${questDef.id}', 'weapon', 0)"
                         style="border-color:#9933FF; flex: 1; min-width: 200px; padding: 15px; transition: transform 0.2s; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 5px;">⚔️</div>
                        <div style="color:#9933FF; font-size: 18px;">${option1.name}</div>
                        <div style="color:#888; font-size: 14px; margin-top: 5px;">DMG: ${option1.baseDamage}-${option1.maxDamage} | 2 gem slots</div>
                    </div>
                    <div class="menu-option" onclick="claimGuildReward('${questDef.id}', 'weapon', 1)"
                         style="border-color:#9933FF; flex: 1; min-width: 200px; padding: 15px; transition: transform 0.2s; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 5px;">⚔️</div>
                        <div style="color:#9933FF; font-size: 18px;">${option2.name}</div>
                        <div style="color:#888; font-size: 14px; margin-top: 5px;">DMG: ${option2.baseDamage}-${option2.maxDamage} | 2 gem slots</div>
                    </div>
                </div>
            </div>
        `;
    }
    // Ultimate quest: choose between two legendary weapons
    else if (questDef.type === 'ultimate') {
        const option1 = generateUltimateWeaponReward(p, questDef.level);
        const option2 = generateUltimateWeaponReward(p, questDef.level);
        
        window._guildRewardOptions = [option1, option2];
        window._guildRewardQuestId = questDef.id;
        window._guildRewardType = 'weapon';
        
        rewardHtml = `
            <div style="background: linear-gradient(135deg, #1a3a1a, #0a1a0a); border-radius: 8px; padding: 15px; margin: 15px 0;">
                <p style="color:#00FF88; font-size: 20px; margin: 0;">+ ${xpReward} XP</p>
                <p style="color:#FFD700; font-size: 20px; margin: 5px 0;">+ ${goldReward} Gold</p>
                <p style="color:#FF9900; font-size: 18px; margin: 10px 0 0;">+ Orange (legendary) class weapon</p>
            </div>
        `;
        
        rewardChoiceHtml = `
            <div style="margin-top: 20px;">
                <p style="color:#FF9900; font-size: 20px; margin-bottom: 15px; text-align:center;">✨ CHOOSE YOUR LEGENDARY REWARD ✨</p>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                    <div class="menu-option" onclick="claimGuildReward('${questDef.id}', 'weapon', 0)"
                         style="border-color:#FF9900; flex: 1; min-width: 200px; padding: 15px; transition: transform 0.2s; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 5px;">⚔️</div>
                        <div style="color:#FF9900; font-size: 18px;">${option1.name}</div>
                        <div style="color:#888; font-size: 14px; margin-top: 5px;">DMG: ${option1.baseDamage}-${option1.maxDamage} | 3 gem slots</div>
                    </div>
                    <div class="menu-option" onclick="claimGuildReward('${questDef.id}', 'weapon', 1)"
                         style="border-color:#FF9900; flex: 1; min-width: 200px; padding: 15px; transition: transform 0.2s; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 5px;">⚔️</div>
                        <div style="color:#FF9900; font-size: 18px;">${option2.name}</div>
                        <div style="color:#888; font-size: 14px; margin-top: 5px;">DMG: ${option2.baseDamage}-${option2.maxDamage} | 3 gem slots</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    const html = `
        <div class="location-header" style="animation: none;">⚔️ CONTRACT COMPLETE!</div>
        <div class="message" style="border-color:#FFD700; background: linear-gradient(135deg, #1a1a0a, #0a0a00);">
            <p style="color:#FFD700; font-size: 24px; text-align:center; margin: 0 0 10px;">🏆 ${questDef.emoji} ${questDef.targetName} 🏆</p>
            <p style="color:#888; font-size: 16px; text-align:center; margin: 0 0 15px;">You've slain the required targets and collected their ${questDef.flavorItem}.</p>
            ${rewardHtml}
        </div>
        ${rewardChoiceHtml}
        <button onclick="showGuild()" style="margin-top: 20px;">← BACK TO GUILD BOARD</button>
    `;
    
    screen.innerHTML = html;
    
    // Add hover effects to reward options
    setTimeout(() => {
        document.querySelectorAll('.menu-option[onclick*="claimGuildReward"]').forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 30px currentColor';
            });
            el.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }, 100);
}

// ═══════════════════════════════════════════════════════════════
// CLAIM REWARD
// ═══════════════════════════════════════════════════════════════
function claimGuildReward(questId, rewardType, optionIndex) {
    const p = gameState.player;
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;
    
    const xpReward = guildXpReward(questDef.level, questDef.type);
    const goldReward = guildGoldReward(questDef.level, questDef.type);
    
    // Apply gold and XP
    p.gold += goldReward;
    p.xp += xpReward;
    
    // Handle item rewards for elite/boss/ultimate quests
    if (rewardType && optionIndex !== null && window._guildRewardOptions) {
        const chosen = window._guildRewardOptions[optionIndex];
        
        if (rewardType === 'armor') {
            ARMOR[chosen.id] = chosen;
            p.inventory.push(chosen.id);
        } else if (rewardType === 'weapon') {
            WEAPONS[chosen.id] = chosen;
            p.inventory.push(chosen.id);
        }
        
        // Clear temp storage
        window._guildRewardOptions = null;
        window._guildRewardQuestId = null;
        window._guildRewardType = null;
    }
    
    // Mark quest as completed
    if (!p.guildQuests) p.guildQuests = { active: [], completed: {} };
    p.guildQuests.completed[questId] = true;
    
    // Remove from active quests
    p.guildQuests.active = p.guildQuests.active.filter(q => q.questId !== questId);
    
    // Check for level up
    let leveledUp = false;
    while (p.xp >= p.xpToNext && p.level < 25) {
        levelUp();
        leveledUp = true;
    }
    
    saveGame();
    updateHud();
    
    // Show confirmation screen
    const screen = document.getElementById('mainScreen');
    const rewardName = (rewardType && optionIndex !== null && window._guildRewardOptions) 
        ? window._guildRewardOptions[optionIndex]?.name 
        : null;
    
    let rewardLine = '';
    if (rewardName) {
        rewardLine = `<p style="color:#00FF88; font-size: 16px; margin-top: 10px;">Received: ${rewardName}</p>`;
    }
    
    screen.innerHTML = `
        <div class="location-header">⚔️ REWARD CLAIMED</div>
        <div class="message" style="border-color:#00FF88;">
            <p style="color:#00FF88; font-size: 18px;">Contract Complete!</p>
            <p style="color:#FFD700;">+ ${goldReward} Gold</p>
            <p style="color:#00FF88;">+ ${xpReward} XP</p>
            ${rewardLine}
            ${leveledUp ? '<p style="color:#FFD700; font-size: 16px; margin-top: 10px;">⭐ LEVEL UP!</p>' : ''}
        </div>
        <div class="menu-option" onclick="showGuild()" style="text-align:center; margin: 10px 0;">
            ► BACK TO GUILD BOARD
        </div>
        <button onclick="showTown()">← BACK TO TOWN</button>
    `;
}

// ═══════════════════════════════════════════════════════════════
// GUILD ENCOUNTER SYSTEM - Checks for elite/boss spawns
// ═══════════════════════════════════════════════════════════════
function checkGuildEncounter(locKey) {
    const p = gameState.player;
    if (!p.guildQuests || !Array.isArray(p.guildQuests.active) || p.guildQuests.active.length === 0) return false;
    
    let encounterTriggered = false;
    
    // Check each active quest
    p.guildQuests.active.forEach(activeQuest => {
        const questDef = GUILD_QUESTS[activeQuest.questId];
        if (!questDef) return;
        
        // Only elite and boss quests have special encounters
        if (questDef.type === 'standard') return;
        
        // Zone matching
        let zoneMatch = false;
        if (locKey === 'forest' && questDef.zone.includes('Whispering')) zoneMatch = true;
        if (locKey === 'riverside' && questDef.zone.includes('Misty')) zoneMatch = true;
        if (locKey === 'haunted_graveyard' && questDef.zone.includes('Haunted')) zoneMatch = true;
        if (locKey === 'dark_swamp' && questDef.zone.includes('Blackwater')) zoneMatch = true;
        if (locKey === 'cursed_ruins' && questDef.zone.includes('Cursed')) zoneMatch = true;
        if (locKey === 'cave' && questDef.zone.includes('Shadow')) zoneMatch = true;
        if (locKey === 'crypt' && questDef.zone.includes('Ancient')) zoneMatch = true;
        if (locKey === 'demon_portal' && questDef.zone.includes('Demon')) zoneMatch = true;
        
        if (!zoneMatch) return;
        
        // 10% chance
        if (Math.random() < 0.10) {
            encounterTriggered = true;
            
            // Show message
            termAppend('', 'term-separator');
            termAppend(`<span style="color:#FF4444;font-size:18px;">⚠ GUILD TARGET APPEARS!</span>`, 'term-highlight');
            
            if (questDef.type === 'elite') {
                termAppend(`<span style="color:#FF8800;">An elite ${questDef.targetName} and its minions attack!</span>`, 'term-warning');
                // Start combat with 2 rare enemies
                startCombat([questDef.target, questDef.target], false, ['rare', 'rare']);
                
            } else { // boss
                // Get the boss enemy key from our mapping
                const bossKey = BOSS_ENEMIES[questDef.id];
                if (!bossKey) {
                    console.error('No boss mapped for', questDef.id);
                    return;
                }
                
                const bossEnemy = ENEMIES[bossKey];
                if (!bossEnemy) {
                    console.error('Boss enemy not found:', bossKey);
                    return;
                }
                
                termAppend(`<span style="color:#9933FF;">The ${bossEnemy.name} appears! Defeat it to complete your contract!</span>`, 'term-victory');
                
                // Start combat with 1 epic boss enemy
                startCombat([bossKey], false, ['epic']);
            }
        }
    });
    
    return encounterTriggered;
}

// ═══════════════════════════════════════════════════════════════
// GUILD KILL PROGRESS CHECK (called from onMonsterKill)
// ═══════════════════════════════════════════════════════════════
function checkGuildKillProgress(killKey) {
    const p = gameState.player;
    if (!p.guildQuests || !Array.isArray(p.guildQuests.active) || p.guildQuests.active.length === 0) return;
    
    // Check each active quest
    p.guildQuests.active.forEach(activeQuest => {
        const questDef = GUILD_QUESTS[activeQuest.questId];
        if (!questDef) return;
        if (questDef.target !== killKey) return;
        
        const killCount = guildKillCount(questDef.type);
        const currentKills = Math.max(0, (p.kills?.[killKey] || 0) - (activeQuest.killsAtAccept || 0));
        
        if (currentKills >= killCount) {
            // Quest complete — notify
            if (typeof termAppend === 'function') {
                termAppend('', 'term-separator');
                termAppend(`<span style="color:#FFD700;">⚔️ GUILD CONTRACT COMPLETE: ${questDef.targetName} (${questDef.type})!</span> Return to the guild to claim your reward.`, 'term-loot');
            }
        } else {
            // Progress update on each kill
            if (typeof termAppend === 'function') {
                termAppend(`<span style="color:#4488FF;">📋 Guild: ${questDef.targetName} (${questDef.type}) ${currentKills}/${killCount}</span>`, 'term-dim');
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// MIGRATION HELPER - ensures old saves have proper guild data
// ═══════════════════════════════════════════════════════════════
function migrateGuildData(p) {
    if (!p) return;
    if (!p.guildQuests) {
        p.guildQuests = { active: [], completed: {} };
    }
    if (!Array.isArray(p.guildQuests.active)) {
        p.guildQuests.active = [];
    }
    if (!p.guildQuests.completed) {
        p.guildQuests.completed = {};
    }
}

console.log('✅ Guild system loaded with 3-tier progression (Standard → Elite → Boss)');