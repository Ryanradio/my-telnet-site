// ═══════════════════════════════════════════════════════════════
// GEM SYSTEM & RARITY CONFIG
// Extracted from index.html — loaded after armor.js, weapons.js
// Dependencies: gameState (runtime global), updateHud, saveGame (guarded)
// CLASS_STAT_PRESETS is defined in index.html and available at runtime
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// RARITY CONFIG
// ═══════════════════════════════════════════════════════
const RARITY_CONFIG = {
    common:    { name: "Common",    color: "#cccccc", multiplier: 1.0, spawnWeight: 60,  dropBonus: 0 },
    uncommon:  { name: "Uncommon",  color: "#4caf50", multiplier: 1.1, spawnWeight: 25,  dropBonus: 1 },
    rare:      { name: "Rare",      color: "#2196f3", multiplier: 1.2, spawnWeight: 10,  dropBonus: 2 },
    epic:      { name: "Epic",      color: "#9c27b0", multiplier: 1.3, spawnWeight: 4,   dropBonus: 3 },
    legendary: { name: "Legendary", color: "#ff9800", multiplier: 1.4, spawnWeight: 0.9, dropBonus: 4 },
    mythic:    { name: "Mythic",    color: "#ff4444", multiplier: 1.5, spawnWeight: 0.1, dropBonus: 5 }
};



// ═══════════════════════════════════════════════════════════════
// GEM SYSTEM — Raw gems drop from enemies, cut at blacksmith,
// socket into weapons for permanent bonuses.
// Tier by enemy level: 1-6=T1, 7-12=T2, 13-18=T3, 19-24=T4
// ═══════════════════════════════════════════════════════════════
const GEM_TYPES = {
    ruby:     { name: 'Ruby',     color: '#FF2244', emoji: '🔴', tier_color: '#FF2244',
                desc: 'Red — Damage & Lifesteal',
                stats: ['weaponDmg','weaponDmg','lifesteal'],
                rolls: { weaponDmg: [2,8], lifesteal: [1,4] } },
    sapphire: { name: 'Sapphire', color: '#2266FF', emoji: '🔵', tier_color: '#2266FF',
                desc: 'Blue — Spell Power & MP',
                stats: ['spellPower','spellPower','mpBonus'],
                rolls: { spellPower: [3,10], mpBonus: [8,25] } },
    topaz:    { name: 'Topaz',    color: '#FFD700', emoji: '🟡', tier_color: '#FFD700',
                desc: 'Yellow — Crit Chance & Lightning Dmg',
                stats: ['critBonus','critBonus','lightningDmg'],
                rolls: { critBonus: [2,6], lightningDmg: [3,9] } },
    emerald:  { name: 'Emerald',  color: '#00CC44', emoji: '🟢', tier_color: '#00CC44',
                desc: 'Green — Poison & STR',
                stats: ['poisonChance','poisonChance','strBonus'],
                rolls: { poisonChance: [5,15], strBonus: [1,4] } },
    amethyst: { name: 'Amethyst', color: '#AA44FF', emoji: '🟣', tier_color: '#AA44FF',
                desc: 'Purple — Defense & HP',
                stats: ['defenseBonus','defenseBonus','hpBonus'],
                rolls: { defenseBonus: [2,7], hpBonus: [10,30] } },
    onyx:     { name: 'Onyx',     color: '#888888', emoji: '⬛', tier_color: '#888888',
                desc: 'Black — Armor Pierce & Speed',
                stats: ['armorPierce','armorPierce','speedBonus'],
                rolls: { armorPierce: [3,10], speedBonus: [2,5] } },
    opal:     { name: 'Opal',     color: '#AADDFF', emoji: '🔷', tier_color: '#AADDFF',
                desc: 'White — Luck & Gold Find',
                stats: ['lckBonus','lckBonus','goldFind'],
                rolls: { lckBonus: [1,4], goldFind: [5,15] } },
    garnet:   { name: 'Garnet',   color: '#CC1133', emoji: '🟤', tier_color: '#CC1133',
                desc: 'Garnet — STR & CON',
                stats: ['strBonus','conBonus','strBonus'],
                rolls: { strBonus: [1,4], conBonus: [1,4] } },

    // ── EXPANSION GEMS ────────────────────────────────────────────
    bloodstone: { name: 'Bloodstone', color: '#880022', emoji: '🩸', tier_color: '#880022',
                desc: 'Dark Red — Max HP & HP Regeneration',
                stats: ['hpBonus','hpBonus','hpRegen'],
                rolls: { hpBonus: [15,40], hpRegen: [1,4] } },

    moonstone:  { name: 'Moonstone',  color: '#CCEEFF', emoji: '🌙', tier_color: '#CCEEFF',
                desc: 'Silver-White — MP Regen & Spell Cooldown',
                stats: ['mpRegen','mpRegen','cdReduce'],
                rolls: { mpRegen: [2,6], cdReduce: [3,8] } },

    sunstone:   { name: 'Sunstone',   color: '#FF7700', emoji: '☀️', tier_color: '#FF7700',
                desc: 'Amber — Fire Damage & STR (universal)',
                stats: ['fireDmg','fireDmg','strBonus'],
                rolls: { fireDmg: [4,12], strBonus: [1,3] } },

    voidstone:  { name: 'Voidstone',  color: '#6600BB', emoji: '🔮', tier_color: '#6600BB',
                desc: 'Dark Purple — Spell Leech & WIS',
                stats: ['spellLeech','spellLeech','wisBonus'],
                rolls: { spellLeech: [3,10], wisBonus: [1,3] } },

    ironheart:  { name: 'Ironheart',  color: '#AAAAAA', emoji: '🩶', tier_color: '#AAAAAA',
                desc: 'Iron-Grey — Defense & CON',
                stats: ['defenseBonus','defenseBonus','conBonus'],
                rolls: { defenseBonus: [3,9], conBonus: [1,4] } },

    stormglass: { name: 'Stormglass', color: '#44DDFF', emoji: '⛈️', tier_color: '#44DDFF',
                desc: 'Ice-Blue — Lightning & Frost (universal, both elements stack)',
                stats: ['lightningDmg','frostDmg','lightningDmg'],
                rolls: { lightningDmg: [4,12], frostDmg: [3,10] } },
};

// Gem tier multiplier for rolls (higher tier = stronger bonuses)
const GEM_TIER_MULT = { 1: 1.0, 2: 1.5, 3: 2.2, 4: 3.2 };


// ═══════════════════════════════════════════════════════════════
// SOCKET COLOR VALIDATION
// ═══════════════════════════════════════════════════════════════

// Check if a gem can be socketed into a specific slot
function canSocketGemIntoSlot(item, gem, slotIndex) {
    // Legacy items without socketColors - no restriction (can socket anything)
    if (!item.socketColors || item.socketColors.length === 0) {
        return true;
    }
    
    const socketColor = item.socketColors[slotIndex];
    if (!socketColor) return false;
    
    // White sockets accept ANY gem
    if (socketColor === 'white') return true;
    
    // Get the gem's type
    const gemType = gem.type;
    
    // Check if gem type is in the accepted list for this socket color
    const acceptedGems = SOCKET_COLOR_MAP[socketColor]?.acceptGems;
    if (!acceptedGems) return false;
    
    return acceptedGems.includes(gemType);
}

// Get the display icon for a socket color
function getSocketColorIcon(color) {
    return SOCKET_COLOR_MAP[color]?.icon || '◻️';
}

// Get the full socket display HTML (colored brackets)
function getSocketDisplayHtml(item, slotIndex) {
    const socketColor = item.socketColors?.[slotIndex];
    if (!socketColor) return '⬚';
    
    const icon = getSocketColorIcon(socketColor);
    const isFilled = item.gems?.[slotIndex] ? true : false;
    
    if (isFilled) {
        const gem = item.gems[slotIndex];
        return `<span style="color:${gem.color || '#aaa'};">${gem.emoji || '💎'}</span>`;
    }
    
    // Empty socket with colored brackets
    const colorMap = {
        red: '#ff4444', blue: '#4488ff', yellow: '#ffdd44',
        green: '#44ff44', purple: '#cc44ff', black: '#888888',
        white: '#ffffff'
    };
    const bracketColor = colorMap[socketColor] || '#aaa';
    
    return `<span style="color:${bracketColor};">[${icon}]</span>`;
}

// Full socket row display for inventory
function buildGemSlotHtml(weapon) {
    if (!weapon) return '';
    
    // Check if weapon has socketColors (new system)
    const hasSocketColors = weapon.socketColors && weapon.socketColors.length > 0;
    
    let slots;
    if (hasSocketColors) {
        slots = weapon.socketColors.length;
    } else {
        // Fallback to old system (legacy items)
        const quality = weapon.quality || 'normal';
        slots = getGemSlots(quality);
    }
    
    if (slots === 0) return '';
    if (!weapon.gems) weapon.gems = [];
    
    // Color mapping for brackets
    const bracketColorMap = {
        red: '#ff4444', blue: '#4488ff', yellow: '#ffdd44',
        green: '#44ff44', purple: '#cc44ff', black: '#888888',
        white: '#ffffff'
    };
    
    const socketIconMap = {
        red: '🔴', blue: '🔵', yellow: '🟡',
        green: '🟢', purple: '🟣', black: '⚫', white: '⚪'
    };
    
    let html = `<div style="margin-top:5px;font-size:11px;line-height:1.6;">`;
    
    for (let i = 0; i < slots; i++) {
        const gem = weapon.gems[i];
        const socketColor = weapon.socketColors ? weapon.socketColors[i] : null;
        
        if (gem && gem.cut) {
            // Filled slot - show gem
            const gemTypeDef = gem.type ? GEM_TYPES[gem.type] : null;
            const gemDisplayName = gem.name || (gemTypeDef ? `T${gem.tier||1} ${gemTypeDef.name}` : 'Gem');
            const gemColor = gem.color || (gemTypeDef ? gemTypeDef.color : '#aaa');
            const gemEmoji = gem.emoji || (gemTypeDef ? gemTypeDef.emoji : '💎');
            const gemDesc = gem.description || (gem.stats ? describeGemStats(gem.stats) : '');
            html += `<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
                <span style="color:${gemColor};font-size:15px;line-height:1;">⬤</span>
                <span style="color:${gemColor};font-weight:bold;">${gemEmoji} ${gemDisplayName}</span>
                <span style="color:#888;font-size:10px;">${gemDesc}</span>
            </div>`;
        } else {
            // Empty socket - show colored bracket if available
            if (socketColor && socketIconMap[socketColor]) {
                const bracketColor = bracketColorMap[socketColor] || '#aaa';
                const icon = socketIconMap[socketColor];
                const colorName = socketColor.charAt(0).toUpperCase() + socketColor.slice(1);
                html += `<div style="display:flex;align-items:center;gap:5px;">
                    <span style="color:${bracketColor};font-size:14px;">[${icon}]</span>
                    <span style="color:#3a3a3a;font-size:10px;font-style:italic;">empty ${colorName} socket</span>
                </div>`;
            } else {
                // Fallback to old style (legacy items without socketColors)
                html += `<div style="display:flex;align-items:center;gap:5px;">
                    <span style="color:#1a1a1a;font-size:15px;line-height:1;text-shadow:0 0 1px #555;">⬤</span>
                    <span style="color:#3a3a3a;font-size:10px;font-style:italic;">empty socket</span>
                </div>`;
            }
        }
    }
    
    if (slots > 1) {
        const filledCount = weapon.gems.filter(g => g && g.cut).length;
        html += `<div style="color:#555;font-size:10px;margin-top:2px;">${filledCount}/${slots} gems socketed</div>`;
    }
    html += '</div>';
    return html;
}


// Get tier from enemy level
function getGemTier(enemyLevel) {
    if (enemyLevel <= 6)  return 1;
    if (enemyLevel <= 12) return 2;
    if (enemyLevel <= 18) return 3;
    return 4;
}

// Gem types as an array for random selection
const GEM_KEYS = Object.keys(GEM_TYPES);

// Cut a raw gem into a finished gem with permanent random stats
function cutGem(gemKey) {
    // Parse raw gem key format: raw_topaz_t3
    let tier = 1;
    let typeKey = '';
    
    // Find tier using regex that looks for _t followed by 1-4
    const tierMatch = gemKey.match(/_t([1-4])$/);
    if (tierMatch) {
        tier = parseInt(tierMatch[1]);
    }
    
    // Extract type key: remove 'raw_' and remove the trailing _tX
    typeKey = gemKey.replace(/^raw_/, '');
    typeKey = typeKey.replace(/_t[1-4]$/, '');
    
    const gemDef = GEM_TYPES[typeKey];
    if (!gemDef) {
        console.error(`Unknown gem type: ${typeKey} from key: ${gemKey}`);
        return null;
    }
    
    const mult = GEM_TIER_MULT[tier] || 1.0;
    
    // Roll 2 stats from the gem's stat pool
    const statPool = [...gemDef.stats];
    const statValues = {};
    
    // Pick up to 2 unique stats
    const shuffled = statPool.sort(() => Math.random()-0.5);
    const picked = [...new Set(shuffled)].slice(0, 2);
    
    for (const stat of picked) {
        const [lo, hi] = gemDef.rolls[stat];
        const val = Math.floor((lo + Math.random()*(hi-lo+1)) * mult);
        statValues[stat] = (statValues[stat] || 0) + val;
    }
    
    // Generate tier prefix
    const tierPrefix = ['', 'T1 ', 'T2 ', 'T3 ', 'T4 '][tier] || `T${tier} `;
    
    return {
        id: `gem_${typeKey}_t${tier}_${Date.now()}`,
        type: typeKey,
        tier: tier,
        name: `${tierPrefix}${gemDef.name}`,
        color: gemDef.color,
        emoji: gemDef.emoji,
        cut: true,
        stats: statValues,
        description: describeGemStats(statValues)
    };
}

function describeGemStats(stats) {
    const labels = {
        weaponDmg:    'Weapon DMG',   lifesteal:    'Lifesteal %',
        spellPower:   'Spell Power',  mpBonus:      'Max MP',
        critBonus:    'Crit %',       lightningDmg: 'Lightning DMG',
        poisonChance: 'Poison %',     strBonus:     'STR',
        conBonus:     'CON',          defenseBonus: 'Defense',
        hpBonus:      'Max HP',       armorPierce:  'Armor Pierce %',
        speedBonus:   'Speed',        lckBonus:     'LCK',
        goldFind:     'Gold Find %',
        // New gem stats
        hpRegen:      'HP Regen/turn', mpRegen:     'MP Regen/turn',
        cdReduce:     'Cooldown %',    fireDmg:     'Fire DMG',
        frostDmg:     'Frost DMG',     spellLeech:  'Spell Leech %',
        wisBonus:     'WIS',
    };
    return Object.entries(stats).map(([k,v]) => `+${v} ${labels[k]||k}`).join(', ');
}

// How many gem slots does a weapon quality get?
// Shop-bought gear (normal/poor) has no slots — slots are a perk of dropped gear.
// Drops come with quality from the drop system: rare=1, epic=2, legendary=3, godly=4.
function getGemSlots(quality) {
    const map = { poor:0, normal:0, uncommon:1, rare:1, epic:2, legendary:3, godly:4 };
    return map[quality] || 0;
}

// Apply socketed gem stats to player during combat (additive bonuses)
function applyGemBonuses(player, weapon) {
    const armorObj = player.armor ? ARMOR[player.armor] : null;
    const allGems = [...(weapon?.gems || []), ...((armorObj?.gems) || [])];
    if (allGems.length === 0) return;
    for (const gem of allGems) {
        if (!gem || !gem.stats) continue;
        const s = gem.stats;
        if (s.hpBonus)      player._gemHpBonus  = (player._gemHpBonus  || 0) + s.hpBonus;
        if (s.mpBonus)      player._gemMpBonus  = (player._gemMpBonus  || 0) + s.mpBonus;
        if (s.strBonus)     player._gemStr      = (player._gemStr      || 0) + s.strBonus;
        if (s.conBonus)     player._gemCon      = (player._gemCon      || 0) + s.conBonus;
        if (s.lckBonus)     player._gemLck      = (player._gemLck      || 0) + s.lckBonus;
        if (s.defenseBonus) player._gemDef      = (player._gemDef      || 0) + s.defenseBonus;
        if (s.critBonus)    player._gemCrit     = (player._gemCrit     || 0) + s.critBonus;
        if (s.weaponDmg)    player._gemWepDmg   = (player._gemWepDmg   || 0) + s.weaponDmg;
        if (s.spellPower)   player._gemSpell    = (player._gemSpell    || 0) + s.spellPower;
        if (s.lifesteal)    player._gemLifesteal= (player._gemLifesteal|| 0) + s.lifesteal;
        if (s.armorPierce)  player._gemPierce   = (player._gemPierce   || 0) + s.armorPierce;
        if (s.goldFind)     player._gemGold     = (player._gemGold     || 0) + s.goldFind;
        if (s.poisonChance) player._gemPoison   = (player._gemPoison   || 0) + s.poisonChance;
    }
}

// ── Recalculate player's gem-sourced bonuses ──────────────────
// Called on equip/unequip. Stores the delta in player._gem* so that
// player stats always reflect current socketed gem configuration.

// ── GEM STAT RECALCULATION ───────────────────────────────────
function recalcGemStats() {
    const p = gameState.player;
    
    // Calculate raw gem bonuses from equipment
    let hpBonus = 0, mpBonus = 0, defBonus = 0;
    let strBonus = 0, dexBonus = 0, conBonus = 0, wisBonus = 0, chaBonus = 0, lckBonus = 0;
    let critBonus = 0, pierceBonus = 0, spellBonus = 0;
    
    // Get weapon and armor objects
    const weapon = p.weapon ? WEAPONS[p.weapon] : null;
    const armor = p.armor ? ARMOR[p.armor] : null;
    
    // Sum up bonuses from weapon gems
    if (weapon && weapon.gems) {
        weapon.gems.forEach(gem => {
            if (!gem || !gem.stats) return;
            hpBonus    += gem.stats.hpBonus      || 0;
            mpBonus    += gem.stats.mpBonus      || 0;
            defBonus   += gem.stats.defenseBonus || 0;
            strBonus   += gem.stats.strBonus     || 0;
            dexBonus   += gem.stats.dexBonus     || 0;
            conBonus   += gem.stats.conBonus     || 0;
            wisBonus   += gem.stats.wisBonus     || 0;
            chaBonus   += gem.stats.chaBonus     || 0;
            lckBonus   += gem.stats.lckBonus     || 0;
            critBonus  += gem.stats.critBonus    || 0;
            pierceBonus+= gem.stats.armorPierce  || 0;
            spellBonus += gem.stats.spellPower   || 0;
        });
    }
    
    // Add base HP/MP bonuses from armor (not from gems)
    if (armor && !armor.unarmored) {
        hpBonus += armor.bonusHp || 0;
        mpBonus += armor.bonusMp || 0;
    }

    // ARMOR MODIFIER: Bulwark (flat max HP bonus)
    if (typeof getArmorModifierBonus === 'function') {
        hpBonus += getArmorModifierBonus('hpBonus');
    }

    // Sum up bonuses from armor gems
    if (armor && armor.gems) {
        armor.gems.forEach(gem => {
            if (!gem || !gem.stats) return;
            hpBonus    += gem.stats.hpBonus      || 0;
            mpBonus    += gem.stats.mpBonus      || 0;
            defBonus   += gem.stats.defenseBonus || 0;
            strBonus   += gem.stats.strBonus     || 0;
            dexBonus   += gem.stats.dexBonus     || 0;
            conBonus   += gem.stats.conBonus     || 0;
            wisBonus   += gem.stats.wisBonus     || 0;
            chaBonus   += gem.stats.chaBonus     || 0;
            lckBonus   += gem.stats.lckBonus     || 0;
            critBonus  += gem.stats.critBonus    || 0;
            pierceBonus+= gem.stats.armorPierce  || 0;
            spellBonus += gem.stats.spellPower   || 0;
        });
    }
    
    // Calculate BASE stats (current stats minus stored gem bonuses)
    const storedStrBonus = p._gemStrBonus || 0;
    const storedDexBonus = p._gemDexBonus || 0;
    const storedConBonus = p._gemConBonus || 0;
    const storedWisBonus = p._gemWisBonus || 0;
    const storedChaBonus = p._gemChaBonus || 0;
    const storedLckBonus = p._gemLckBonus || 0;
    
    const baseStr = (p.str || 0) - storedStrBonus;
    const baseDex = (p.dex || 0) - storedDexBonus;
    const baseCon = (p.con || 0) - storedConBonus;
    const baseWis = (p.wis || 0) - storedWisBonus;
    const baseCha = (p.cha || 0) - storedChaBonus;
    const baseLck = (p.lck || 0) - storedLckBonus;
    
    const baseTotal = baseStr + baseDex + baseCon + baseWis + baseCha + baseLck;
    
    // Calculate what base stats SHOULD be for this class/level
    const baseClass = p.baseClass || p.class;
    const preset = CLASS_STAT_PRESETS[baseClass] || CLASS_STAT_PRESETS.warrior;
    const baseLevels = (p.level || 1) - 1;
    const presetTotal = Object.values(preset).reduce((a, b) => a + b, 0);
    const expectedBaseTotal = presetTotal + (baseLevels * 3);
    
    console.log(`🔧 RECALC: class=${baseClass}, level=${p.level}`);
    console.log(`   Base total: ${baseTotal}, Expected total: ${expectedBaseTotal}`);
    
    // ⭐ STEP 3 FIX: Skip inflation check for evolved characters
    const isEvolved = p.hasEvolved === true;
    
    if (!isEvolved && baseTotal > expectedBaseTotal + 20) {
        console.warn(`⚠️ STAT INFLATION detected! Resetting...`);
        
        // Calculate points to give back
        const totalPointsToAllocate = baseLevels * 3;
        
        // Reset to class preset (level 1 values)
        p.str = preset.str + storedStrBonus;
        p.dex = preset.dex + storedDexBonus;
        p.con = preset.con + storedConBonus;
        p.wis = preset.wis + storedWisBonus;
        p.cha = preset.cha + storedChaBonus;
        p.lck = preset.lck + storedLckBonus;
        
        // Add the stat points for them to allocate
        p.statPoints = totalPointsToAllocate;
        
        // Fix HP based on new base CON
        const classHpBase = baseClass === 'warrior' ? 120 : 
                           baseClass === 'paladin' ? 100 : 
                           baseClass === 'rogue' ? 80 : 90;
        const expectedHp = classHpBase + (baseLevels * 12) + (baseLevels * Math.max(0, (preset.con - 10)));
        p.maxHp = Math.max(1, expectedHp + hpBonus);
        p.hp = Math.min(p.hp, p.maxHp);
        
        // Fix MP
        const classMpBase = baseClass === 'mage' ? 100 : 
                           baseClass === 'warlock' ? 90 : 50;
        const expectedMp = classMpBase + (baseLevels * 8);
        p.maxMp = Math.max(0, expectedMp + mpBonus);
        p.mp = Math.min(p.mp, p.maxMp);
        
        // Reset gem trackers
        p._gemHpBonus = 0;
        p._gemMpBonus = 0;
        p._gemDefBonus = 0;
        p._gemStrBonus = 0;
        p._gemDexBonus = 0;
        p._gemConBonus = 0;
        p._gemWisBonus = 0;
        p._gemChaBonus = 0;
        p._gemLckBonus = 0;
        p._gemCritBonus = 0;
        p._gemPierceBonus = 0;
        p._gemSpellBonus = 0;
        
        // Save immediately
        if (typeof saveGame === 'function') {
            saveGame();
        }
        
        // SHOW POPUP WARNING
        setTimeout(() => {
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a120a;
                border: 3px solid #FFD700;
                box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 0 100vmax rgba(0,0,0,0.7);
                z-index: 100000;
                padding: 24px 32px;
                text-align: center;
                font-family: 'VT323', monospace;
                max-width: 400px;
                width: 90%;
                border-radius: 8px;
            `;
            popup.innerHTML = `
                <div style="color: #FFD700; font-size: 28px; margin-bottom: 12px;">⚠️ STAT RESET ⚠️</div>
                <div style="color: #ffffff; font-size: 18px; margin-bottom: 16px;">
                    Your character stats were corrupted and have been reset!
                </div>
                <div style="color: #88ff88; font-size: 20px; margin-bottom: 8px;">
                    You have <span style="color: #FFD700; font-size: 32px; font-weight: bold;">${totalPointsToAllocate}</span> stat points to spend!
                </div>
                <div style="color: #aaaaaa; font-size: 14px; margin-bottom: 20px;">
                    Click OK to open Character Stats and allocate your points.
                </div>
                <button id="statResetOk" style="
                    background: #2a2a1a;
                    border: 2px solid #FFD700;
                    color: #FFD700;
                    font-size: 20px;
                    padding: 10px 30px;
                    font-family: 'VT323', monospace;
                    cursor: pointer;
                    border-radius: 4px;
                ">▶ ALLOCATE STATS</button>
            `;
            document.body.appendChild(popup);
            
            document.getElementById('statResetOk').onclick = () => {
                popup.remove();
                // Close terminal mode and show character stats
                if (document.body.classList.contains('terminal-mode')) {
                    document.body.classList.remove('terminal-mode');
                }
                showCharacterStats();
            };
        }, 500);
    } else if (isEvolved && baseTotal > expectedBaseTotal + 20) {
        // Evolved character with high stats - just log, don't reset
        console.log(`⭐ Evolved character has base total ${baseTotal} (expected ${expectedBaseTotal}) - this is NORMAL for evolution. No reset performed.`);
    }
    
    // APPLY GEM BONUSES (remove old, add new)
    const oldHp  = p._gemHpBonus  || 0;
    const oldMp  = p._gemMpBonus  || 0;
    const oldDef = p._gemDefBonus || 0;
    const oldStr = p._gemStrBonus || 0;
    const oldDex = p._gemDexBonus || 0;
    const oldCon = p._gemConBonus || 0;
    const oldWis = p._gemWisBonus || 0;
    const oldCha = p._gemChaBonus || 0;
    const oldLck = p._gemLckBonus || 0;
    
    p.maxHp = Math.max(1, (p.maxHp || 0) - oldHp + hpBonus);
    p.maxMp = Math.max(0, (p.maxMp || 0) - oldMp + mpBonus);
    p.hp = Math.min(p.hp || 0, p.maxHp);
    p.mp = Math.min(p.mp || 0, p.maxMp);
    
    p.str = Math.max(0, (p.str || 0) - oldStr + strBonus);
    p.dex = Math.max(0, (p.dex || 0) - oldDex + dexBonus);
    p.con = Math.max(0, (p.con || 0) - oldCon + conBonus);
    p.wis = Math.max(0, (p.wis || 0) - oldWis + wisBonus);
    p.cha = Math.max(0, (p.cha || 0) - oldCha + chaBonus);
    p.lck = Math.max(0, (p.lck || 0) - oldLck + lckBonus);
    
    if (p.defense !== undefined) {
        p.defense = Math.max(0, (p.defense || 0) - oldDef + defBonus);
    }
    
    // Store new bonuses
    p._gemHpBonus = hpBonus;
    p._gemMpBonus = mpBonus;
    p._gemDefBonus = defBonus;
    p._gemStrBonus = strBonus;
    p._gemDexBonus = dexBonus;
    p._gemConBonus = conBonus;
    p._gemWisBonus = wisBonus;
    p._gemChaBonus = chaBonus;
    p._gemLckBonus = lckBonus;
    p._gemCritBonus = critBonus;
    p._gemPierceBonus = pierceBonus;
    p._gemSpellBonus = spellBonus;
    
    console.log(`💎 Gem stats applied: STR +${strBonus}, DEX +${dexBonus}, CON +${conBonus}, WIS +${wisBonus}, CHA +${chaBonus}, LCK +${lckBonus}`);
    
    if (typeof updateHud === 'function') updateHud();
    
    return {
        hp: hpBonus, mp: mpBonus, def: defBonus,
        str: strBonus, dex: dexBonus, con: conBonus,
        wis: wisBonus, cha: chaBonus, lck: lckBonus,
        crit: critBonus, pierce: pierceBonus, spell: spellBonus
    };
}

console.log("🎯 gem-system.js finished loading, buildGemSlotHtml has hasSocketColors?", buildGemSlotHtml.toString().includes("hasSocketColors"));