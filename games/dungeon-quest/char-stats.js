// ═══════════════════════════════════════════════════════════════
// CHARACTER STATS SCREEN — stat display, pending edits, respec
// Extracted from index.html
// Dependencies: gameState, updateHud, saveGame (runtime globals)
// ═══════════════════════════════════════════════════════════════

function showCharacterStats() {
    checkGameVersion();
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    if (p.statPoints === undefined) p.statPoints = 0;
    // Reset pending when page first loads (not on re-render from +)
    if (!window._statsPageOpen) {
        window._statPending = {};
        window._statsPageOpen = true;
    }
    const pointsLeft   = p.statPoints;
    const pointsQueued = STAT_NAMES.reduce((a,s) => a + (window._statPending[s]||0), 0);
    const hasChanges   = pointsQueued > 0;

    // Get equipped armor instance for bonuses
    const equippedInstance = p.inventory.find(item => 
        item && typeof item === 'object' && item.instanceId === p.armor
    );

    // Build armor bonus display string
    let armorBonusHtml = '';
    if (equippedInstance && !equippedInstance.unarmored) {
        const armorHp = equippedInstance.bonusHp || 0;
        const armorMp = equippedInstance.bonusMp || 0;
        if (armorHp > 0 || armorMp > 0) {
            armorBonusHtml += `<br><span style="color:#88ff88;">🛡️ Armor Bonuses:</span> +${armorHp} HP, +${armorMp} MP`;
        }
        if (equippedInstance.modifiers && equippedInstance.modifiers.length > 0) {
            armorBonusHtml += `<br><span style="color:#FFD700;">✨ Armor Modifiers:</span>`;
            equippedInstance.modifiers.forEach(mod => {
                const valueStr = mod.statType === 'percent' ? `${mod.value}%` : `+${mod.value}`;
                armorBonusHtml += `<br><span style="color:${mod.color};">  ${mod.icon} ${mod.name}: ${valueStr}</span>`;
            });
        }
    }

    setScreen(`
        <div class="location-header">📊 CHARACTER STATS</div>
        <button onclick="window._statsPageOpen=false;showTown();" style="margin-bottom:10px;">← BACK TO TOWN</button>

        <div class="message" style="border-color:${pointsLeft>0||hasChanges?'#FFD700':'var(--border-color)'};">
            <span style="color:${pointsLeft>0?'#FFD700':'var(--highlight-color)'};">Points to spend: </span>
            <span style="color:${pointsLeft>0?'var(--text-color)':'#888'};font-size:22px;">${pointsLeft}</span>
            ${pointsLeft>0 ? '<span style="color:#00FF00;font-size:14px;"> — click + to allocate</span>' : ''}
            <span style="color:#8aaa8a;font-size:13px;"> (★ = class affinity)</span>
        </div>

        <div style="max-width:520px;margin:0 auto;">
            ${renderLiveStatRows(p, window._statPending, pointsLeft)}
        </div>

        <div class="message" style="border-color:#005500;margin-top:12px;font-size:15px;">
            <span style="color:#8aaa8a;">DERIVED STATS</span><br>
            <span style="color:var(--highlight-color);">Lv ${p.level}</span>
            <span style="color:#8aaa8a;"> | </span>
            <span style="color:#ff6666;">HP ${p.hp}/${p.maxHp}</span>
            <span style="color:#8aaa8a;"> | </span>
            <span style="color:#6688ff;">MP ${p.mp}/${p.maxMp}</span><br>
            <span style="color:#aaa;">XP: ${p.xp.toLocaleString()}/${p.xpToNext.toLocaleString()} | Crit: ${calcCritChance(p.lck,p)}% | Dodge: ${calcDodgeChance(p.dex||0)}%</span><br>
            <span style="color:#ffcc88;">Melee: ${calculatePhysicalDamage()} | Magic: ${calculateMagicDamage()} | Def: ${calculateTotalDefense()}</span>
            ${armorBonusHtml}
        </div>

        ${buildCombatRecordHtml(p)}

        ${hasChanges ? `
            <button onclick="_saveStatChanges(()=>{window._statsPageOpen=false;showCharacterStats();})"
                style="margin-top:12px;font-size:18px;border-color:#00FF00;color:#00FF00;width:100%;">
                💾 SAVE CHANGES
            </button>
        ` ): ''}
        <button onclick="window._statsPageOpen=false;showTown();" style="margin-top:8px;">← BACK TO TOWN</button>

        <!-- Chronicle & Bestiary launcher -->
        <button class="chronicle-open-btn" onclick="openChronicle()" id="chronicle-launch-btn">
            📖 The Chronicle &amp; Bestiary
            <span class="btn-badge" id="chronicle-launch-badge"></span>
        </button>
    `;
}
        
function _statPend(stat) {
    const p = gameState.player;
    if (p.statPoints <= 0) return;
    window._statPending[stat] = (window._statPending[stat] || 0) + 1;
    p.statPoints--;
    // Re-render the stats screen
    if (document.getElementById('levelUpModal')) {
        _renderLevelUpModal();
    } else {
        showCharacterStats();
    }
}


function _saveStatChanges(backFn) {
    const p = gameState.player;
    let conChanged = false;
    let oldCon = p.con || 0;
    
    // Apply pending to actual stats
    STAT_NAMES.forEach(s => {
        const gained = window._statPending[s] || 0;
        if (gained > 0) {
            p[s] = (p[s] || 0) + gained;
            if (s === 'con') conChanged = true;
        }
    });
    
    // If CON changed, recalculate HP using class-based formula (retroactive!)
    if (conChanged) {
        const playerClass = p.baseClass || p.class;
        const level = p.level || 1;
        const con = p.con || 0;
        
        // Class HP Multipliers
        const conMultipliers = {
            warrior: 1.5, paladin: 1.3, cleric: 1.0, runesmith: 1.1,
            hunter: 0.9, rogue: 0.8, warlock: 0.7, mage: 0.6, default: 0.8
        };
        
        // Base HP at level 1 by class
        const baseHP = {
            warrior: 120, paladin: 100, cleric: 85, runesmith: 90,
            hunter: 80, rogue: 75, warlock: 65, mage: 55, default: 80
        };
        
        const multiplier = conMultipliers[playerClass] || conMultipliers.default;
        const base = baseHP[playerClass] || baseHP.default;
        const levelBonus = (level - 1) * 15;
        const conBonus = Math.floor(con * multiplier * (level - 1));
        const newMaxHP = base + levelBonus + conBonus;
        
        p.maxHp = newMaxHP;
        p.hp = Math.min(p.hp, p.maxHp);
        
        console.log(`❤️ CON changed from ${oldCon} to ${con}. HP recalculated to ${p.maxHp}`);
    }
    
    window._statPending = {};
    saveGame();
    if (backFn) backFn();
}


        function calculatePhysicalDamage() {
            const p = gameState.player;
            const weapon = WEAPONS[p.weapon] || { baseDamage: 1, quality: 'poor' };
            const qBonus = getQualityBonus(weapon.quality, weapon.baseDamage);
            let weaponDamage = weapon.baseDamage + qBonus;
            if (p.level <= 5) weaponDamage = Math.floor(weaponDamage * 0.7);
            return weaponDamage + (p.str || 0);
        }
        
        function calculateMagicDamage() {
            const p = gameState.player;
            const weapon = WEAPONS[p.weapon] || { baseMagicDamage: 0, baseDamage: 0, quality: 'poor' };
            const qBonus = getQualityBonus(weapon.quality, weapon.baseMagicDamage || 0);
            return (weapon.baseMagicDamage || 0) + qBonus + (p.magic || 0) + (p.wis || 0);
        }
        
        /**
         * Get bonus damage from weapon modifiers for offensive spells
         * Only applies to damage/lifesteal spells, not healing
         */
        function getWeaponModifierSpellBonus() {
            const p = gameState.player;
            if (!p || !p.weapon) return 0;
            
            const weapon = WEAPONS[p.weapon];
            if (!weapon || !weapon.modifiers || weapon.modifiers.length === 0) return 0;
            
            // Check if WEAPON_MODIFIERS is available
            if (typeof WEAPON_MODIFIERS === 'undefined') return 0;
            
            let totalBonus = 0;
            weapon.modifiers.forEach(modKey => {
                const mod = WEAPON_MODIFIERS[modKey];
                if (mod && mod.minDamage) {
                    // Roll for bonus damage (min to max)
                    const bonusDmg = Math.floor(Math.random() * (mod.maxDamage - mod.minDamage + 1)) + mod.minDamage;
                    totalBonus += bonusDmg;
                }
            });
            
            return totalBonus;
        }
        
        function calculateTotalDefense() {
            const p = gameState.player;
            const armor = ARMOR[p.armor] || { baseDefense: 0, quality: 'poor' };
            const qBonus = getQualityBonus(armor.quality, armor.baseDefense);
            return armor.baseDefense + qBonus + (p.con || 0);
        }
        

        
// ═══════════════════════════════════════════════════════════════
// CROSSROADS FORGE - Unique styling for the 3rd town
// ═══════════════════════════════════════════════════════════════

