// ═══════════════════════════════════════════════════════════════
// guild.js — ADVENTURERS GUILD SYSTEM
//
// HOW IT WORKS:
// 1. Guild board available in all 3 towns
// 2. One quest per player level (levels 1-25)
// 3. Kill quests: slay X of a specific enemy type
//    - Kill count tracks via p.kills[] (already tracked in checkCombatEnd)
//    - Quest TEXT says "bring me X goblin ears" but tracks kills
// 4. Alternating rewards:
//    - Odd levels  (1,3,5...25): Blue (rare) class-specific weapon + 1 empty gem slot
//    - Even levels (2,4,6...24): Blue (rare) class-appropriate armor
//    - All quests: scaling gold + XP
// 5. On turn-in: player chooses from 2 reward options
// 6. Quest tied to the town it was accepted from — must return to same town
//
// PLAYER DATA (stored on gameState.player):
//   p.guildQuests = {
//     active:    { questId, townId, kills: 0 }   — current active quest
//     completed: { 'guild_1': true, ... }         — permanently completed
//   }
// ═══════════════════════════════════════════════════════════════

// ── Kill counts scale with level ─────────────────────────────────
function guildKillCount(level) {
    if (level <= 5)  return 5;
    if (level <= 10) return 8;
    if (level <= 15) return 10;
    if (level <= 20) return 12;
    return 15;
}

// ── XP/Gold rewards scale with level ─────────────────────────────
function guildXpReward(level)   { return level * 120; }
function guildGoldReward(level) { return level * 80;  }

// ── Quest definitions — one per level ────────────────────────────
// target:     enemy key from p.kills[] (set in checkCombatEnd via dead.key)
// targetName: display name
// flavorItem: the "bring me X of these" flavor text item
// zone:       where to find them (flavor only)
const GUILD_QUESTS = {
    // Whispering Forest (lv1+): goblin, wolf, giant_rat, kobold, forest_imp, giant_spider, wild_boar, goblin_shaman, wild_lynx, plague_rat
    guild_1:  { level:1,  target:'goblin',           targetName:'Goblin',           flavorItem:'Goblin Ears',          zone:'the Whispering Forest',    emoji:'👺' },
    guild_2:  { level:2,  target:'giant_rat',        targetName:'Giant Rat',        flavorItem:'Rat Tails',            zone:'the Whispering Forest',    emoji:'🐀' },
    guild_3:  { level:3,  target:'wolf',             targetName:'Wolf',             flavorItem:'Wolf Pelts',           zone:'the Whispering Forest',    emoji:'🐺' },
    guild_4:  { level:4,  target:'harpy',            targetName:'Harpy',            flavorItem:'Harpy Feathers',       zone:'the Misty Riverside',      emoji:'🦅' },
    // Misty Riverside (lv4+): river_troll, swamp_lurker, giant_frog, bandit, harpy, gnoll, lizardfolk
    guild_5:  { level:5,  target:'bandit',           targetName:'Bandit',           flavorItem:'Bandit Badges',        zone:'the Misty Riverside',      emoji:'🗡️' },
    guild_6:  { level:6,  target:'gnoll',            targetName:'Gnoll',            flavorItem:'Gnoll Fangs',          zone:'the Misty Riverside',      emoji:'🐾' },
    // Haunted Graveyard (lv7+): zombie, ghoul, skeleton, grave_robber, spirit, bone_archer, shadow_hound, death_cultist, vampire_thrall
    guild_7:  { level:7,  target:'skeleton',         targetName:'Skeleton',         flavorItem:'Finger Bones',         zone:'the Haunted Graveyard',    emoji:'💀' },
    guild_8:  { level:8,  target:'zombie',           targetName:'Zombie',           flavorItem:'Zombie Teeth',         zone:'the Haunted Graveyard',    emoji:'🧟' },
    guild_9:  { level:9,  target:'grave_robber',     targetName:'Grave Robber',     flavorItem:'Stolen Grave Goods',   zone:'the Haunted Graveyard',    emoji:'⚰️' },
    // Blackwater Swamp / Windswept Plains (lv10+): werewolf, dire_wolf, cave_basilisk, iron_golem, plague_zombie
    guild_10: { level:10, target:'werewolf',         targetName:'Werewolf',         flavorItem:'Werewolf Claws',       zone:'the Blackwater Swamp',     emoji:'🐺' },
    guild_11: { level:11, target:'dire_wolf',        targetName:'Dire Wolf',        flavorItem:'Dire Wolf Pelts',      zone:'the Windswept Plains',     emoji:'🐺' },
    guild_12: { level:12, target:'iron_golem',       targetName:'Iron Golem',       flavorItem:'Golem Core Fragments', zone:'the Windswept Plains',     emoji:'🗿' },
    // Cursed Ruins (lv13+): cursed_knight, shadow_stalker, dark_priest, necromancer, dark_champion, elder_wraith, black_knight
    guild_13: { level:13, target:'necromancer',      targetName:'Necromancer',      flavorItem:'Necromancer Tomes',    zone:'the Cursed Ruins',         emoji:'📖' },
    guild_14: { level:14, target:'dark_priest',      targetName:'Dark Priest',      flavorItem:'Blasphemous Relics',   zone:'the Cursed Ruins',         emoji:'🔮' },
    guild_15: { level:15, target:'death_cultist',    targetName:'Death Cultist',    flavorItem:'Cultist Medallions',   zone:'the Haunted Graveyard',    emoji:'☠️' },
    // Shadow Cavern (lv16+): troll, shadow_dragon, bone_colossus, doom_knight, wyvern, plague_lord
    guild_16: { level:16, target:'troll',            targetName:'Troll',            flavorItem:'Troll Hide',           zone:'the Shadow Cavern',        emoji:'🧌' },
    guild_17: { level:17, target:'wyvern',           targetName:'Wyvern',           flavorItem:'Wyvern Scales',        zone:'the Shadow Cavern',        emoji:'🐉' },
    guild_18: { level:18, target:'doom_knight',      targetName:'Doom Knight',      flavorItem:'Cursed Sigils',        zone:'the Shadow Cavern',        emoji:'⚔️' },
    // Ancient Crypt (lv19+): lich, vampire_lord, ancient_lich, soul_reaper, wyvern, doom_knight
    guild_19: { level:19, target:'vampire_lord',     targetName:'Vampire Lord',     flavorItem:'Vampire Lord Fangs',   zone:'the Ancient Crypt',        emoji:'🧛' },
    guild_20: { level:20, target:'lich',             targetName:'Lich',             flavorItem:'Phylactery Shards',    zone:'the Ancient Crypt',        emoji:'💀' },
    // Demon Portal (lv22+): elder_vampire, pit_fiend, void_titan, elder_vampire, reality_shredder
    guild_21: { level:21, target:'soul_reaper',      targetName:'Soul Reaper',      flavorItem:'Harvested Souls',      zone:'the Ancient Crypt',        emoji:'👁️' },
    guild_22: { level:22, target:'elder_vampire',    targetName:'Elder Vampire',    flavorItem:'Elder Fangs',          zone:'the Demon Portal',         emoji:'🧛' },
    guild_23: { level:23, target:'pit_fiend',        targetName:'Pit Fiend',        flavorItem:'Infernal Brands',      zone:'the Demon Portal',         emoji:'😈' },
    // Corrupted Temple / Volcanic Wastes (lv25): fallen_angel, chaos_dragon, god_avatar
    guild_24: { level:24, target:'chaos_dragon',     targetName:'Chaos Dragon',     flavorItem:'Chaos Dragon Scales',  zone:'the Corrupted Temple',     emoji:'🐲' },
    guild_25: { level:25, target:'god_avatar',       targetName:'God Avatar',       flavorItem:'Divine Fragments',     zone:'the Celestial Spire',      emoji:'✨' },
};

// ── Class-specific weapon types for rewards ───────────────────────
const GUILD_WEAPON_TYPES = {
    warrior:     ['sword', 'axe', 'greatsword'],
    rogue:       ['dagger', 'shortsword'],
    paladin:     ['mace', 'sword', 'warhammer'],
    acolyte:     ['staff', 'mace'],
    necrolyte:   ['staff', 'scythe'],
    sorceror:    ['staff', 'wand'],
    archer:      ['bow', 'crossbow'],
    druid:       ['staff', 'club'],
    hunter:      ['bow', 'spear'],
    warlock:     ['staff', 'dagger'],
    runesmith:   ['hammer', 'axe'],
    // evolved classes
    warlord:     ['sword', 'axe', 'greatsword'],
    shadowmaster:['dagger', 'shortsword'],
    crusader:    ['mace', 'warhammer'],
    high_priest: ['staff', 'mace'],
    lich:        ['staff', 'scythe'],
    archmage:    ['staff', 'wand'],
    deadeye:     ['bow', 'crossbow'],
    archdruid:   ['staff', 'club'],
    beastlord:   ['bow', 'spear'],
    demonlord:   ['staff', 'dagger'],
};

// ── Generate a rare (blue) guild weapon reward ────────────────────
function generateGuildWeaponReward(p, level) {
    const baseClass = p.baseClass || p.class;
    const types     = GUILD_WEAPON_TYPES[baseClass] || ['sword'];
    const wType     = types[Math.floor(Math.random() * types.length)];
    const id        = `guild_weapon_${baseClass}_lv${level}_${Date.now()}`;

    // Scale damage to level
    const baseDmg = Math.floor(level * 2.5 + 8);
    const maxDmg  = Math.floor(baseDmg * 1.6);
    const hasMagic = ['sorceror','acolyte','necrolyte','druid','warlock','archmage','lich','high_priest','archdruid','demonlord'].includes(baseClass);

    const weapon = {
        id,
        name:           `Guild ${wType.charAt(0).toUpperCase() + wType.slice(1)} of ${p.name}`,
        type:           wType,
        quality:        'rare',
        level,
        baseDamage:     baseDmg,
        maxDamage:      maxDmg,
        baseMagicDamage: hasMagic ? Math.floor(level * 1.8 + 5) : 0,
        cost:           0,
        sellValue:      Math.floor(level * 50),
        classRestriction: baseClass,
        gems:           [],   // one empty slot — getGemSlots('rare') returns 1
        modifiers:      [],
        isGuildReward:  true,
        unarmed:        false,
    };

    return weapon;
}

// ── Generate rare (blue) guild armor reward ───────────────────────
function generateGuildArmorReward(p, level) {
    const baseClass  = p.baseClass || p.class;
    const id         = `guild_armor_${baseClass}_lv${level}_${Date.now()}`;
    const isHeavy    = ['warrior','paladin','warlord','crusader'].includes(baseClass);
    const isMedium   = ['rogue','archer','hunter','shadowmaster','deadeye','beastlord'].includes(baseClass);
    const armorType  = isHeavy ? 'plate' : isMedium ? 'leather' : 'robe';
    const baseDef    = isHeavy
        ? Math.floor(level * 2.2 + 6)
        : isMedium
        ? Math.floor(level * 1.6 + 4)
        : Math.floor(level * 1.0 + 3);
    const hasMagicBonus = ['sorceror','acolyte','necrolyte','druid','warlock','archmage','lich','high_priest','archdruid','demonlord'].includes(baseClass);

    const armor = {
        id,
        name:           `Guild ${armorType.charAt(0).toUpperCase() + armorType.slice(1)} of ${p.name}`,
        type:           armorType,
        quality:        'rare',
        level,
        baseDefense:    baseDef,
        baseMagicBonus: hasMagicBonus ? Math.floor(level * 0.8 + 2) : 0,
        cost:           0,
        sellValue:      Math.floor(level * 40),
        classRestriction: baseClass,
        gems:           [],
        isGuildReward:  true,
        unarmored:      false,
    };

    return armor;
}

// ═══════════════════════════════════════════════════════════════
// SHOW GUILD BOARD
// ═══════════════════════════════════════════════════════════════
function showGuild() {
    const p      = gameState.player;
    const tid    = gameState.currentTown || 'town1';
    const screen = document.getElementById('mainScreen');

    if (!p.guildQuests) p.guildQuests = { active: null, completed: {} };
    const gq = p.guildQuests;

    const level    = p.level;
    const questId  = `guild_${level}`;
    const questDef = GUILD_QUESTS[questId];
    const isCompleted = gq.completed && gq.completed[questId];
    const hasActive   = gq.active && gq.active.questId === questId;
    const isWeaponQuest = level % 2 === 1; // odd = weapon, even = armor

    // Build header
    let html = `
        <div class="location-header">⚔️ ADVENTURERS GUILD</div>
        <button onclick="showTown()" style="margin-bottom:10px;">← BACK</button>
        ${renderPlayerStats()}
        <div class="message" style="border-color:#FFD700;">
            <p style="color:#FFD700;letter-spacing:2px;">GUILD NOTICE BOARD</p>
            <p style="font-size:13px;color:#888;">Complete guild contracts to earn rare equipment and renown.
            One contract is available per level. Contracts must be turned in at the issuing guild hall.</p>
        </div>
    `;

    if (!questDef) {
        html += `<div class="message"><p style="color:#888;">No contracts available at your current level.</p></div>`;
        screen.innerHTML = html;
        return;
    }

    const killCount    = guildKillCount(level);
    const xpReward     = guildXpReward(level);
    const goldReward   = guildGoldReward(level);
    const currentKills = hasActive
        ? Math.min(killCount, p.kills?.[questDef.target] || 0) - (gq.active.killsAtAccept || 0)
        : 0;
    const killProgress = hasActive ? Math.max(0, currentKills) : 0;
    const isReadyToTurnIn = hasActive && killProgress >= killCount && gq.active.townId === tid;
    const wrongTown       = hasActive && killProgress >= killCount && gq.active.townId !== tid;

    // ── Completed ─────────────────────────────────────────────────
    if (isCompleted) {
        html += `
            <div class="message" style="border-color:#555;">
                <p style="color:#555;letter-spacing:2px;">CONTRACT FULFILLED</p>
                <p style="font-size:15px;color:#444;">${questDef.emoji} Level ${level} contract has already been completed.</p>
                <p style="font-size:13px;color:#333;">Check back when you reach the next level.</p>
            </div>`;

    // ── Active quest — ready to turn in ───────────────────────────
    } else if (isReadyToTurnIn) {
        html += `
            <div class="message" style="border-color:#00FF88;">
                <p style="color:#00FF88;letter-spacing:2px;">✅ CONTRACT COMPLETE — READY FOR TURN-IN</p>
                <p style="font-size:18px;">${questDef.emoji} ${questDef.targetName} Slayer</p>
                <p>You have slain <span style="color:#FFD700;">${killCount} ${questDef.targetName}s</span>
                   and collected their ${questDef.flavorItem}.</p>
                <p style="color:#888;font-size:13px;">Reward: <span style="color:#FFD700;">${goldReward}g</span> +
                   <span style="color:#00FF88;">${xpReward} XP</span> +
                   <span style="color:#4488FF;">${isWeaponQuest ? 'Rare Class Weapon' : 'Rare Class Armor'}</span></p>
                <div class="menu-option" onclick="showGuildTurnIn()"
                     style="border-color:#00FF88;color:#00FF88;text-align:center;margin-top:10px;">
                    ⚔️ TURN IN CONTRACT
                </div>
            </div>`;

    // ── Active quest — in progress ────────────────────────────────
    } else if (hasActive) {
        const pct = Math.min(100, Math.floor((killProgress / killCount) * 100));
        html += `
            <div class="message" style="border-color:#FF8800;">
                <p style="color:#FF8800;letter-spacing:2px;">📋 ACTIVE CONTRACT</p>
                <p style="font-size:18px;">${questDef.emoji} ${questDef.targetName} Slayer</p>
                <p>Slay <span style="color:#FFD700;">${killCount} ${questDef.targetName}s</span>
                   in ${questDef.zone} and return with their ${questDef.flavorItem}.</p>
                <div style="margin:10px 0;">
                    <div style="display:flex;justify-content:space-between;font-size:13px;color:#888;margin-bottom:4px;">
                        <span>Progress</span>
                        <span style="color:#FFD700;">${killProgress} / ${killCount}</span>
                    </div>
                    <div style="background:#111;border:1px solid #333;height:18px;border-radius:9px;overflow:hidden;">
                        <div style="background:linear-gradient(90deg,#FF8800,#FFD700);height:100%;width:${pct}%;border-radius:9px;transition:width 0.3s;"></div>
                    </div>
                </div>
                ${wrongTown ? `<p style="color:#ff6666;font-size:13px;">⚠️ Return to the guild hall where you accepted this contract to turn it in.</p>` : ''}
                <p style="color:#888;font-size:13px;">Reward: <span style="color:#FFD700;">${goldReward}g</span> +
                   <span style="color:#00FF88;">${xpReward} XP</span> +
                   <span style="color:#4488FF;">${isWeaponQuest ? 'Rare Class Weapon' : 'Rare Class Armor'}</span></p>
                <div class="menu-option" onclick="abandonGuildQuest()"
                     style="border-color:#ff4444;color:#ff4444;text-align:center;margin-top:10px;font-size:14px;">
                    ✕ ABANDON CONTRACT
                </div>
            </div>`;

    // ── Available quest ────────────────────────────────────────────
    } else {
        html += `
            <div class="message" style="border-color:#4488FF;">
                <p style="color:#4488FF;letter-spacing:2px;">📋 AVAILABLE CONTRACT — LEVEL ${level}</p>
                <p style="font-size:20px;">${questDef.emoji} ${questDef.targetName} Slayer</p>
                <p style="color:#aaa;font-size:14px;font-style:italic;margin-bottom:10px;">
                    "We need someone to deal with the ${questDef.targetName} problem in ${questDef.zone}.
                    Bring back ${killCount} ${questDef.flavorItem} as proof."
                </p>
                <p><strong style="color:#FFD700;">Targets:</strong>
                   Slay <span style="color:#FF8800;">${killCount} ${questDef.targetName}s</span></p>
                <p><strong style="color:#FFD700;">Location:</strong> ${questDef.zone}</p>
                <p><strong style="color:#FFD700;">Reward:</strong>
                   <span style="color:#FFD700;">${goldReward}g</span> +
                   <span style="color:#00FF88;">${xpReward} XP</span> +
                   <span style="color:#4488FF;">your choice of ${isWeaponQuest ? 'Rare Class Weapon' : 'Rare Class Armor'}</span>
                </p>
                <p style="font-size:12px;color:#555;">⚠️ You must return to THIS guild hall to turn in your contract.</p>
                <div class="menu-option" onclick="acceptGuildQuest('${questId}', '${tid}')"
                     style="border-color:#4488FF;color:#4488FF;text-align:center;margin-top:12px;">
                    ✦ ACCEPT CONTRACT
                </div>
            </div>`;
    }

    // ── Completed contracts log ───────────────────────────────────
    const completedIds = Object.keys(gq.completed || {});
    if (completedIds.length > 0) {
        html += `
            <div style="margin-top:20px;">
                <p style="color:#333;letter-spacing:2px;font-size:13px;">COMPLETED CONTRACTS (${completedIds.length})</p>`;
        completedIds.forEach(cid => {
            const cd = GUILD_QUESTS[cid];
            if (cd) html += `<p style="color:#2a2a2a;font-size:13px;">✓ Lv${cd.level} — ${cd.emoji} ${cd.targetName} Slayer</p>`;
        });
        html += `</div>`;
    }

    html += `<button onclick="showTown()" style="margin-top:16px;">← BACK TO TOWN</button>`;
    screen.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// ACCEPT QUEST
// ═══════════════════════════════════════════════════════════════
function acceptGuildQuest(questId, townId) {
    const p  = gameState.player;
    if (!p.guildQuests) p.guildQuests = { active: null, completed: {} };

    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;

    // Store kill count at time of acceptance so progress = kills_now - kills_then
    const killsAtAccept = p.kills?.[questDef.target] || 0;

    p.guildQuests.active = {
        questId,
        townId,
        killsAtAccept,
    };

    saveGame();
    showGuild();
}

// ═══════════════════════════════════════════════════════════════
// ABANDON QUEST
// ═══════════════════════════════════════════════════════════════
function abandonGuildQuest() {
    const p = gameState.player;
    if (!p.guildQuests) return;
    if (confirm('Abandon this contract? Your kill progress will be lost.')) {
        p.guildQuests.active = null;
        saveGame();
        showGuild();
    }
}

// ═══════════════════════════════════════════════════════════════
// TURN IN — show reward choice
// ═══════════════════════════════════════════════════════════════
function showGuildTurnIn() {
    const p      = gameState.player;
    const screen = document.getElementById('mainScreen');
    const level  = p.level;
    const questId = `guild_${level}`;
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;

    const isWeaponQuest  = level % 2 === 1;
    const xpReward       = guildXpReward(level);
    const goldReward     = guildGoldReward(level);

    // Pre-generate two reward options
    let option1, option2, option1Html, option2Html;

    if (isWeaponQuest) {
        option1 = generateGuildWeaponReward(p, level);
        option2 = generateGuildWeaponReward(p, level);
        const qc = QUALITY_CONFIG['rare'];

        function weaponHtml(w, idx) {
            const qb   = getQualityBonus(w.quality, w.baseDamage);
            const tMin = w.baseDamage + qb;
            const tMax = w.maxDamage  + getQualityBonus(w.quality, w.maxDamage - w.baseDamage);
            return `
                <div class="menu-option" onclick="claimGuildReward('weapon', ${idx})"
                     style="border-color:${qc.color};margin-bottom:8px;">
                    <div style="color:${qc.color};font-size:17px;">⚔️ ${w.name}</div>
                    <div style="font-size:13px;color:#888;">Rare ${w.type} · Level ${w.level}</div>
                    <div style="font-size:13px;">${buildWeaponDmgLine(w, null, p)}</div>
                    ${w.baseMagicDamage > 0 ? `<div style="color:#88aaff;font-size:13px;">MAGIC: +${w.baseMagicDamage}</div>` : ''}
                    <div style="color:#555;font-size:12px;">○ 1 empty gem slot</div>
                    <div style="color:#4488FF;font-size:13px;margin-top:4px;">► CHOOSE THIS WEAPON</div>
                </div>`;
        }
        option1Html = weaponHtml(option1, 0);
        option2Html = weaponHtml(option2, 1);

        // Stash options temporarily
        window._guildRewardOptions = [option1, option2];
        window._guildRewardType    = 'weapon';

    } else {
        option1 = generateGuildArmorReward(p, level);
        option2 = generateGuildArmorReward(p, level);
        const qc = QUALITY_CONFIG['rare'];

        function armorHtml(a, idx) {
            const qb   = getQualityBonus(a.quality, a.baseDefense);
            const tDef = a.baseDefense + qb + (p.con || 0);
            return `
                <div class="menu-option" onclick="claimGuildReward('armor', ${idx})"
                     style="border-color:${qc.color};margin-bottom:8px;">
                    <div style="color:${qc.color};font-size:17px;">🛡️ ${a.name}</div>
                    <div style="font-size:13px;color:#888;">Rare ${a.type} armor · Level ${a.level}</div>
                    <div style="font-size:13px;color:#88ccff;">YOUR DEF: ${tDef}${a.baseMagicBonus > 0 ? ` | MAG+: ${a.baseMagicBonus}` : ''}</div>
                    <div style="color:#555;font-size:12px;">○ 1 empty gem slot</div>
                    <div style="color:#4488FF;font-size:13px;margin-top:4px;">► CHOOSE THIS ARMOR</div>
                </div>`;
        }
        option1Html = armorHtml(option1, 0);
        option2Html = armorHtml(option2, 1);

        window._guildRewardOptions = [option1, option2];
        window._guildRewardType    = 'armor';
    }

    const html = `
        <div class="location-header">⚔️ CONTRACT COMPLETE!</div>
        <div class="message" style="border-color:#FFD700;">
            <p style="color:#FFD700;font-size:18px;">Well done, adventurer!</p>
            <p>The guild thanks you for your service. Your payment has been prepared.</p>
            <p style="color:#00FF88;">+ ${xpReward} XP &nbsp;|&nbsp; <span style="color:#FFD700;">+ ${goldReward}g</span></p>
        </div>
        <div class="message" style="border-color:#4488FF;">
            <p style="color:#4488FF;letter-spacing:2px;">CHOOSE YOUR REWARD</p>
            <p style="font-size:13px;color:#666;">Select one item to keep. The other will be returned to the guild stores.</p>
            ${option1Html}
            ${option2Html}
        </div>
    `;
    screen.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// CLAIM REWARD — player picks option 0 or 1
// ═══════════════════════════════════════════════════════════════
function claimGuildReward(type, idx) {
    const p        = gameState.player;
    const level    = p.level;
    const questId  = `guild_${level}`;
    const chosen   = window._guildRewardOptions[idx];
    const xpReward = guildXpReward(level);
    const goldReward = guildGoldReward(level);

    // Apply gold + XP
    p.gold += goldReward;
    p.xp   += xpReward;

    // Add item to game data and inventory
    if (type === 'weapon') {
        WEAPONS[chosen.id] = chosen;
        p.inventory.push(chosen.id);
    } else {
        ARMOR[chosen.id] = chosen;
        p.inventory.push(chosen.id);
    }

    // Mark quest complete
    if (!p.guildQuests) p.guildQuests = { active: null, completed: {} };
    p.guildQuests.completed[questId] = true;
    p.guildQuests.active = null;

    // Clean up temp storage
    window._guildRewardOptions = null;
    window._guildRewardType    = null;

    // Check for level up
    let leveledUp = false;
    while (p.xp >= p.xpToNext && p.level < 25) {
        levelUp();
        leveledUp = true;
    }

    saveGame();
    updateHud();

    // Show confirmation
    const screen = document.getElementById('mainScreen');
    const qc     = QUALITY_CONFIG['rare'];
    screen.innerHTML = `
        <div class="location-header">⚔️ REWARD CLAIMED</div>
        <div class="message" style="border-color:#00FF88;">
            <p style="color:#00FF88;font-size:18px;">Contract fulfilled!</p>
            <p>Added to your inventory:</p>
            <p style="color:${qc.color};font-size:18px;">${type === 'weapon' ? '⚔️' : '🛡️'} ${chosen.name}</p>
            <p style="color:#FFD700;">+ ${goldReward}g &nbsp;|&nbsp; <span style="color:#00FF88;">+ ${xpReward} XP</span></p>
            ${leveledUp ? `<p style="color:#FFD700;font-size:16px;">⭐ LEVEL UP!</p>` : ''}
            <p style="color:#555;font-size:12px;">This item has 1 empty gem slot — visit the Blacksmith to enhance it.</p>
        </div>
        <div class="menu-option" onclick="showGuild()" style="text-align:center;">
            ► VIEW GUILD BOARD
        </div>
        <button onclick="showTown()" style="margin-top:10px;">← BACK TO TOWN</button>
    `;
}

// ═══════════════════════════════════════════════════════════════
// GUILD KILL PROGRESS CHECK
// Call this from onMonsterKill() to notify the player when their
// active guild quest target is killed
// ═══════════════════════════════════════════════════════════════
function checkGuildKillProgress(killKey) {
    const p = gameState.player;
    if (!p.guildQuests || !p.guildQuests.active) return;

    const gq       = p.guildQuests;
    const questId  = gq.active.questId;
    const questDef = GUILD_QUESTS[questId];
    if (!questDef) return;
    if (questDef.target !== killKey) return;

    const killCount    = guildKillCount(p.level);
    const currentKills = Math.max(0, (p.kills?.[killKey] || 0) - (gq.active.killsAtAccept || 0));

    if (currentKills >= killCount) {
        // Quest complete — notify in terminal if in combat
        if (typeof termAppend === 'function') {
            termAppend('', 'term-separator');
            termAppend(`<span style="color:#FFD700;">⚔️ GUILD CONTRACT COMPLETE!</span> Return to the guild hall to claim your reward.`, 'term-loot');
        }
    } else {
        // Progress update every kill
        if (typeof termAppend === 'function') {
            termAppend(`<span style="color:#4488FF;">📋 Guild: ${questDef.targetName} ${currentKills}/${killCount}</span>`, 'term-dim');
        }
    }
}

console.log('✅ Guild system loaded');
