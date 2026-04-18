// ═══════════════════════════════════════════════════════════════
// SHOP HELPERS — quality, damage calc helpers, class restrictions
// Extracted from index.html
// Dependencies: WEAPONS, ARMOR, ITEMS (data globals), gameState (runtime)
// ═══════════════════════════════════════════════════════════════

        function getQualityBonus(quality, baseStat) {
            const cfg = QUALITY_CONFIG[quality];
            if (!cfg) return 0;
            // Support old flat bonus saves gracefully
            if (cfg.bonusPct !== undefined) return Math.floor(baseStat * cfg.bonusPct);
            return cfg.bonus || 0;
        }


        // Upgrade quality based on Exalted armor modifier
function upgradeQualityByBonus(originalQuality) {
    const qualityBonus = getArmorModifierBonus('qualityBonus');
    if (qualityBonus <= 0) return originalQuality;
    
    const qualityOrder = ['poor', 'normal', 'rare', 'epic', 'legendary', 'godly'];
    const currentIndex = qualityOrder.indexOf(originalQuality);
    if (currentIndex === -1 || currentIndex >= qualityOrder.length - 1) return originalQuality;
    
    // Chance to upgrade to next quality level
    const upgradeChance = qualityBonus / 100; // e.g., 15% = 0.15
    if (Math.random() < upgradeChance) {
        const newQuality = qualityOrder[currentIndex + 1];
        console.log(`✨ Exalted armor upgraded quality: ${originalQuality} → ${newQuality}`);
        return newQuality;
    }
    return originalQuality;
}

function getScaledEnemyHP(baseHP, level) {
    // Scale HP based on level to make higher level enemies more durable
    let multiplier = 1.0;
    
    if (level >= 20) {
        multiplier = 2.0;
    } else if (level >= 15) {
        multiplier = 1.8;
    } else if (level >= 10) {
        multiplier = 1.5;
    } else if (level >= 5) {
        multiplier = 1.2;
    }
    // level 1-4: multiplier stays 1.0
    
    return Math.floor(baseHP * multiplier);
}


                function calcPlayerHits(p) {
            const baseClass = p.baseClass || p.class;
            
            // ALL CLASSES: Pip progression — Lv1=1  Lv5=2  Lv10=3  Lv15=4  (hard cap 4)
            // Rogue pips also fire twice (double-strike with daggers)
            if (p.level >= 15) return 4;
            if (p.level >= 10) return 3;
            if (p.level >= 5)  return 2;
            return 1;
        }
        function calcChaDiscount(cha) { return Math.min(30, (cha||0) * 2); }   // buy %  off
        

                // Get total bonus from all equipped armor modifiers for a specific stat
        function getArmorModifierBonus(statKey) {
            const p = gameState.player;
            if (!p || !p.armor) return 0;
            
            const armor = ARMOR[p.armor];
            if (!armor || !armor.modifiers) return 0;
            
            let total = 0;
            armor.modifiers.forEach(mod => {
                if (mod.stat === statKey) {
                    total += mod.value;
                }
            });
            return total;
        }


        // ═══════════════════════════════════════════════════════════════
        // CLASS EQUIPMENT RESTRICTIONS
        // ═══════════════════════════════════════════════════════════════
        

        // ── Build gem slot display for a weapon card ──────────────────
        function buildGemSlotHtml(weapon) {
            if (!weapon) return '';
            // Ensure quality fallback — drop weapons may not have quality set yet
            const quality = weapon.quality || 'normal';
            const slots = getGemSlots(quality);
            if (slots === 0) return '';
            if (!weapon.gems) weapon.gems = [];  // initialize if missing
            const socketed = weapon.gems;
            const filledCount = socketed.length;
            let html = `<div style="margin-top:5px;font-size:11px;line-height:1.6;">`;
            for (let i = 0; i < slots; i++) {
                const gem = socketed[i];
                if (gem && gem.cut) {
                    // Filled slot — colored gem circle + stat text
                    // Reconstruct name/color/emoji if somehow lost (old save migration)
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
                    // Empty slot — dark circle
                    html += `<div style="display:flex;align-items:center;gap:5px;">
                        <span style="color:#1a1a1a;font-size:15px;line-height:1;text-shadow:0 0 1px #555;">⬤</span>
                        <span style="color:#3a3a3a;font-size:10px;font-style:italic;">empty socket</span>
                    </div>`;
                }
            }
            if (slots > 1) {
                html += `<div style="color:#555;font-size:10px;margin-top:2px;">${filledCount}/${slots} gems socketed</div>`;
            }
            html += '</div>';
            return html;
        }

        // ── Build damage line for a weapon (MELEE / MAGIC clearly split) ──
        function buildWeaponDmgLine(weapon, quality, p) {
            const qc  = QUALITY_CONFIG[quality || weapon.quality];
            const qb  = getQualityBonus(weapon.quality, weapon.baseDamage);
            const tMin = weapon.baseDamage + qb;
            const tMax = weapon.maxDamage ? weapon.maxDamage + getQualityBonus(weapon.quality, weapon.maxDamage - weapon.baseDamage) : tMin;
            const tMagMin = (weapon.baseMagicDamage || 0) + Math.floor((weapon.baseMagicDamage || 0) * (qc?.bonusPct || 0));
const tMagMax = weapon.maxMagicDamage 
    ? (weapon.maxMagicDamage || 0) + Math.floor((weapon.maxMagicDamage || 0) * (qc?.bonusPct || 0))
    : tMagMin;

            // Base line (weapon only, no stats)
            let line = `<span style="color:#888;font-size:12px;">BASE: ${tMin}${tMax > tMin ? '-'+tMax : ''}${tMagMin > 0 ? ` | MAG: ${tMagMin}${tMagMax > tMagMin ? '-'+tMagMax : ''}` : ''}</span>`;

            // With-stats line (only if player provided)
            if (p) {
                // Collect gem bonuses
                let gemMelee = 0, gemMagic = 0, gemLightning = 0, gemFire = 0, gemFrost = 0;
                for (const g of (weapon.gems || [])) {
                    if (!g?.stats) continue;
                    gemMelee     += g.stats.weaponDmg    || 0;
                    gemMagic     += g.stats.spellPower   || 0;
                    gemLightning += g.stats.lightningDmg || 0;
                    gemFire      += g.stats.fireDmg      || 0;
                    gemFrost     += g.stats.frostDmg     || 0;
                }
                const strBonus  = Math.floor((p.str || 0) * 1.5);
                const wisBonus  = Math.floor((p.wis || 0) * 1.5);
                const elemBonus = gemLightning + gemFire + gemFrost;
                const yourMin   = tMin + strBonus + gemMelee + elemBonus;
                const yourMax   = tMax + strBonus + gemMelee + elemBonus;
                const yourMagMin = tMagMin + wisBonus + gemMagic;
const yourMagMax = tMagMax + wisBonus + gemMagic;
line += `<br><span style="color:#ffcc88;">YOUR DMG: ${yourMin}${yourMax > yourMin ? '-'+yourMax : ''}${yourMagMin > 0 ? ` | MAG: ${yourMagMin}${yourMagMax > yourMagMin ? '-'+yourMagMax : ''}` : ''}</span>`;
            }
            return line;
        }

        function buildArmorDefLine(armor, p) {
            const aqc  = QUALITY_CONFIG[armor.quality];
            const aqb  = getQualityBonus(armor.quality, armor.baseDefense);
            const tDef = armor.baseDefense + aqb;
            const tMag = (armor.baseMagicBonus || 0) + Math.floor((armor.baseMagicBonus || 0) * (aqc?.bonusPct || 0));

            // Base line
            let line = `<span style="color:#888;font-size:12px;">BASE DEF: ${tDef}${tMag > 0 ? ` | MAG+: ${tMag}` : ''}</span>`;

            // With-stats line
            if (p) {
                let gemDef = 0;
                for (const g of (armor.gems || [])) {
                    if (!g?.stats) continue;
                    gemDef += g.stats.defense || 0;
                }
                const conBonus = p.con || 0;
                const yourDef  = tDef + conBonus + gemDef;
                const yourMag  = tMag;
                line += `<br><span style="color:#88ccff;">YOUR DEF: ${yourDef}${yourMag > 0 ? ` | MAG+: ${yourMag}` : ''}</span>`;
            }
            return line;
        }

        function canUseWeapon(playerClass, weapon) {
    // Bare fists — always usable
    if (weapon.unarmed) return true;
    
    // If allowedClasses is defined, use it as the sole authority
    if (weapon.allowedClasses) {
        return weapon.allowedClasses.includes(playerClass);
    }
    
    // No allowedClasses set — fall back to weaponSubtype check
    const magicTypes = ['staff', 'wand', 'tome', 'orb'];
    const bowTypes = ['bow', 'crossbow'];
    
    if (magicTypes.includes(weapon.weaponSubtype)) {
        return ['mage','warlock','cleric','acolyte','sorceror','druid','necrolyte','runesmith'].includes(playerClass);
    }
    if (bowTypes.includes(weapon.weaponSubtype)) {
        return ['ranger','archer','hunter','deadeye','beastlord'].includes(playerClass);
    }
    
    // Everything else — any class can use
    return true;
}
        

// Helper function to get total bonus from armor modifiers
function getArmorModifierBonus(statKey) {
    const p = gameState.player;
    if (!p || !p.armor) return 0;
    
    const armor = ARMOR[p.armor];
    if (!armor || !armor.modifiers) return 0;
    
    let total = 0;
    armor.modifiers.forEach(mod => {
        if (mod.stat === statKey) {
            total += mod.value;
        }
    });
    return total;
}


        function canUseArmor(playerClass, armor) {
    // No armor — always usable by everyone
    if (armor.unarmored) return true;
    
    // If allowedClasses is defined, use it as the sole authority
    if (armor.allowedClasses) {
        return armor.allowedClasses.includes(playerClass);
    }
    
    // No allowedClasses set — default to anyone can wear it
    return true;
}
        function calcChaSellBonus(cha){ return Math.min(15, (cha||0) * 1); }   // sell %  bonus
        function calcInnCost(cha)     { return Math.max(20, 50 - (cha||0)); }
        function calcCritChance(lck, player) { 
    // Base: 3% + 0.5% per LCK (rounded normally, not floored)
    let baseCrit = 3 + ((lck || 0) * 0.5);
    
    if (player) {
        const baseClass = player.baseClass || player.class;
        const lvl = player.level || 1;
        if (baseClass === 'rogue') {
            // Rogue: 5% base + 0.75% per LCK + 1% per 2 levels
            baseCrit = 5 + ((lck || 0) * 0.75) + Math.floor(lvl / 2);
        }
    }
    
    // Cap at 75% for rogues, 30% for others
    const cap = (player && (player.baseClass || player.class) === 'rogue') ? 75 : 30;
    return Math.min(cap, Math.floor(baseCrit)); // Still floor final for integer display
}  

// %
        function calcDodgeChance(dex) { return Math.min(40, (dex||0) * 2); }   // %
        function calcLootBonus(lck)   { return Math.min(25, (lck||0) * 2); }   // extra %
