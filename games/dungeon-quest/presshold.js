// ═══════════════════════════════════════════════════════════════
// PRESSHOLD.JS - Long press tooltip system for mobile/desktop
// Shows detailed item information on press-and-hold
// ═══════════════════════════════════════════════════════════════

class LongPressTooltip {
    constructor(delay = 500) {
        this.delay = delay;
        this.timer = null;
        this.currentElement = null;
        this.tooltip = null;
        this.isPressed = false;
        
        this.init();
    }
    
    init() {
        // Listen for long press on all interactive elements
        document.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        document.addEventListener('touchend', this.onTouchEnd.bind(this));
        document.addEventListener('touchcancel', this.onTouchEnd.bind(this));
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    
    onTouchStart(e) {
        const target = this.findInteractiveElement(e.target);
        if (!target) return;
        
        this.currentElement = target;
        this.isPressed = true;
        
        this.timer = setTimeout(() => {
            if (this.isPressed) {
                this.showTooltip(this.currentElement, e.touches[0]);
            }
        }, this.delay);
    }
    
    onTouchEnd(e) {
        this.isPressed = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.hideTooltip();
        this.currentElement = null;
    }
    
    onMouseDown(e) {
        const target = this.findInteractiveElement(e.target);
        if (!target) return;
        
        this.currentElement = target;
        this.isPressed = true;
        
        this.timer = setTimeout(() => {
            if (this.isPressed) {
                this.showTooltip(this.currentElement, e);
            }
        }, this.delay);
    }
    
    onMouseUp(e) {
        this.isPressed = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.hideTooltip();
        this.currentElement = null;
    }
    
    findInteractiveElement(target) {
        // Always find the closest .item-card ancestor (town inventory)
        const itemCard = target.closest('.item-card');
        if (itemCard) return itemCard;

        // Equipped weapon/armor divs (have data-equipped-key attribute)
        const equippedDiv = target.closest('[data-equipped-key]');
        if (equippedDiv) return equippedDiv;

        // Buttons inside the dungeon/explore inventory overlay
        const button = target.closest('button');
        if (button && button.closest('#dungeonInvOverlay')) {
            return button;
        }

        // Menu options
        const menuOption = target.closest('.menu-option');
        if (menuOption) return menuOption;

        return null;
    }

    getItemData(element) {
        const player = gameState?.player;
        if (!player) return null;

        // ── Equipped weapon/armor div ──────────────────────────────────
        if (element.dataset.equippedKey) {
            const key  = element.dataset.equippedKey;
            const type = element.dataset.equippedType;
            if (type === 'weapon') {
                const w = WEAPONS[key];
                return w ? { ...w, _equippedKey: key, _type: 'weapon' } : null;
            }
            if (type === 'armor') {
                const a = ARMOR[key];
                return a ? { ...a, _equippedKey: key, _type: 'armor' } : null;
            }
        }

        // ── Inventory overlay buttons (dungeon AND explore) ────────────
        if (element.tagName === 'BUTTON' && element.closest('#dungeonInvOverlay')) {
            let itemName = element.innerText.split('\n')[0]
                .replace(/[⚔️🛡️🧪💎🔴🟢🟡🔵🟣⬛🔷🟤🩸🌙☀️🔮🩶⛈️]/g, '').trim();
            let qualityFromBracket = '';
            const bracketMatch = itemName.match(/\[(.*?)\]/);
            if (bracketMatch) {
                qualityFromBracket = bracketMatch[1];
                itemName = itemName.replace(/\[.*?\]/g, '').trim();
            }

            if (!player.inventory) return null;

            for (const item of player.inventory) {
                if (typeof item === 'object') {
                    if (item.name === itemName) return item;
                    if (item.name && item.name.includes(itemName)) return item;
                    if (qualityFromBracket && item.quality === qualityFromBracket &&
                        item.name && item.name.includes(itemName.split(' ').pop())) return item;
                }
            }

            if (player.weapon && WEAPONS[player.weapon]?.name === itemName)
                return { ...WEAPONS[player.weapon], _equippedKey: player.weapon, _type: 'weapon' };
            if (player.armor && ARMOR[player.armor]?.name === itemName)
                return { ...ARMOR[player.armor], _equippedKey: player.armor, _type: 'armor' };

            return null;
        }

        // ── Town inventory item-card ───────────────────────────────────
        const itemCard = element.closest('.item-card');
        if (!itemCard) return null;

        const nameElement = itemCard.querySelector('[style*="color"]');
        if (!nameElement) return null;

        let itemName = nameElement.innerText.replace(/[⚔️🛡️]/g, '').trim();
        let qualityFromBracket = '';
        const bracketMatch = itemName.match(/\[(.*?)\]/);
        if (bracketMatch) {
            qualityFromBracket = bracketMatch[1];
            itemName = itemName.replace(/\[.*?\]/g, '').trim();
        }

        if (!player.inventory) return null;

        for (const item of player.inventory) {
            if (typeof item === 'object') {
                if (item.name === itemName) return item;
                if (item.name && item.name.includes(itemName) && (item.weaponId || item.armorId)) return item;
                if (qualityFromBracket && item.quality === qualityFromBracket &&
                    item.name && item.name.includes(itemName.split(' ').pop())) return item;
            }
        }

        if (player.weapon && WEAPONS[player.weapon]?.name === itemName)
            return { ...WEAPONS[player.weapon], _equippedKey: player.weapon, _type: 'weapon' };
        if (player.armor && ARMOR[player.armor]?.name === itemName)
            return { ...ARMOR[player.armor], _equippedKey: player.armor, _type: 'armor' };

        for (const item of player.inventory) {
            if (typeof item === 'string' && ITEMS[item]?.name === itemName) {
                return { type: 'item', key: item, data: ITEMS[item] };
            }
        }

        return null;
    }
    
    showTooltip(element, event) {
        const item = this.getItemData(element);
        if (!item) return;
        
        const tooltipHtml = this.buildTooltipHtml(item);
        if (!tooltipHtml) return;
        
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'longpress-tooltip';
        this.tooltip.innerHTML = tooltipHtml;
        
        // Position near finger/mouse
        const x = event.clientX || (event.touches && event.touches[0]?.clientX) || 0;
        const y = event.clientY || (event.touches && event.touches[0]?.clientY) || 0;
        
        this.tooltip.style.position = 'fixed';
        this.tooltip.style.left = Math.min(x + 10, window.innerWidth - 260) + 'px';
        this.tooltip.style.top = (y - 120) + 'px';
        this.tooltip.style.zIndex = '100000';
        this.tooltip.style.opacity = '0';
        this.tooltip.style.transition = 'opacity 0.2s ease';
        
        document.body.appendChild(this.tooltip);
        
        setTimeout(() => {
            if (this.tooltip) this.tooltip.style.opacity = '1';
        }, 10);
    }
    
    buildTooltipHtml(item) {
        if (item.weaponId || item._type === 'weapon' || (item._equippedKey && WEAPONS[item._equippedKey])) {
            return this.buildWeaponTooltip(item);
        }
        if (item.armorId || item._type === 'armor' || (item._equippedKey && ARMOR[item._equippedKey])) {
            return this.buildArmorTooltip(item);
        }
        if (item.type === 'item' || ITEMS[item.key || item]) {
            return this.buildItemTooltip(item);
        }
        if (item.cut) {
            return this.buildGemTooltip(item);
        }
        return null;
    }

    buildWeaponTooltip(weaponInstance) {
        const instanceData = (weaponInstance.weaponId || weaponInstance.instanceId) ? weaponInstance : null;
        const baseKey = instanceData?.instanceId || instanceData?.weaponId || weaponInstance._equippedKey;
        const weapon  = (baseKey && WEAPONS[baseKey]) ? WEAPONS[baseKey] : weaponInstance;
        const quality = instanceData?.quality || weapon.quality || 'normal';
        const p  = gameState?.player;
        const qc = QUALITY_CONFIG?.[quality] || {};
        const qualityColor = qc.color || '#00FF00';
        const qualityName  = qc.name  || quality;

        // Quality-adjusted damage — matches buildWeaponDmgLine exactly
        const qb   = typeof getQualityBonus === 'function' ? getQualityBonus(quality, weapon.baseDamage) : 0;
        const tMin = weapon.baseDamage + qb;
        const tMax = weapon.maxDamage ? weapon.maxDamage + qb : tMin;
        const tMagMin = (weapon.baseMagicDamage || 0) + Math.floor((weapon.baseMagicDamage || 0) * (qc.bonusPct || 0));
        const tMagMax = weapon.maxMagicDamage
            ? (weapon.maxMagicDamage || 0) + Math.floor((weapon.maxMagicDamage || 0) * (qc.bonusPct || 0))
            : tMagMin;

        let dmgLine = `BASE: ${tMin}${tMax > tMin ? '-'+tMax : ''}`;
        if (tMagMin > 0) dmgLine += ` | MAG: ${tMagMin}${tMagMax > tMagMin ? '-'+tMagMax : ''}`;

        // Your damage with player stats + gems
        let yourLine = '';
        if (p) {
            const gems = WEAPONS[baseKey]?.gems || instanceData?.gems || weapon.gems || [];
            let gemMelee = 0, gemMagic = 0, gemElem = 0;
            for (const g of gems) {
                if (!g?.stats) continue;
                gemMelee += g.stats.weaponDmg    || 0;
                gemMagic += g.stats.spellPower   || 0;
                gemElem  += (g.stats.lightningDmg || 0) + (g.stats.fireDmg || 0) + (g.stats.frostDmg || 0);
            }
            const strBonus   = Math.floor((p.str || 0) * 1.5);
            const wisBonus   = Math.floor((p.wis || 0) * 1.5);
            const yourMin    = tMin + strBonus + gemMelee + gemElem;
            const yourMax    = tMax + strBonus + gemMelee + gemElem;
            const yourMagMin = tMagMin + wisBonus + gemMagic;
            const yourMagMax = tMagMax + wisBonus + gemMagic;
            yourLine = `YOUR DMG: ${yourMin}${yourMax > yourMin ? '-'+yourMax : ''}`;
            if (yourMagMin > 0) yourLine += ` | MAG: ${yourMagMin}${yourMagMax > yourMagMin ? '-'+yourMagMax : ''}`;
        }

        let html = `<div style="background:#0a0a0a;border:2px solid ${qualityColor};border-radius:8px;padding:12px;max-width:260px;font-family:'VT323',monospace;box-shadow:0 0 20px rgba(0,0,0,0.8);">
            <div style="color:${qualityColor};font-size:16px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:4px;margin-bottom:8px;">⚔️ ${weapon.name}</div>
            <div style="color:#aaa;font-size:12px;margin-bottom:6px;">${qualityName} · Level ${weapon.level || '?'}</div>
            <div style="color:#888;font-size:12px;">${dmgLine}</div>
            ${yourLine ? `<div style="color:#ffcc88;font-size:12px;">${yourLine}</div>` : ''}`;

        // Modifiers — same format as inventory
        const modifiers = instanceData?.modifiers || weapon.modifiers || [];
        if (modifiers.length > 0) {
            html += `<div style="margin-top:8px;border-top:1px solid #222;padding-top:4px;">`;
            modifiers.forEach(mod => {
                const modColor = mod.color || '#FFD700';
                let modText = mod.name;
                if (mod.minDamage)        modText += ` (+${mod.minDamage}-${mod.maxDamage})`;
                if (mod.poisonChance)     modText += ` (${mod.poisonChance}% poison)`;
                if (mod.lifestealPercent) modText += ` (${mod.lifestealPercent}% lifesteal)`;
                if (mod.critBonus)        modText += ` (+${mod.critBonus}% crit)`;
                if (mod.armorPierce)      modText += ` (${Math.floor(mod.armorPierce*100)}% pierce)`;
                let desc = '';
                if (typeof WEAPON_MODIFIERS !== 'undefined') {
                    const key = mod.modKey || Object.keys(WEAPON_MODIFIERS).find(k =>
                        WEAPON_MODIFIERS[k].name?.toLowerCase() === mod.name?.toLowerCase());
                    if (key) desc = WEAPON_MODIFIERS[key]?.description || '';
                }
                html += `<div style="color:${modColor};font-size:12px;margin-bottom:3px;">✨ ${modText}`;
                if (desc) html += `<br><span style="color:#888;font-size:11px;margin-left:16px;">${desc}</span>`;
                html += `</div>`;
            });
            html += `</div>`;
        }

        // Gems
        const gems = WEAPONS[baseKey]?.gems || instanceData?.gems || weapon.gems || [];
        if (gems.length > 0) {
            html += `<div style="margin-top:8px;border-top:1px solid #222;padding-top:4px;">`;
            gems.forEach(gem => {
                html += `<div style="color:${gem.color};font-size:12px;">💎 ${gem.name}: ${gem.description}</div>`;
            });
            html += `</div>`;
        }

        const slots = typeof getGemSlots === 'function' ? getGemSlots(quality) : 0;
        if (slots > 0) {
            html += `<div style="color:#555;font-size:11px;margin-top:6px;">⚙️ ${gems.length}/${slots} gem slots used</div>`;
        }

        html += `</div>`;
        return html;
    }

    buildArmorTooltip(armorInstance) {
        const instanceData = (armorInstance.armorId || armorInstance.instanceId) ? armorInstance : null;
        const baseKey = instanceData?.armorId || instanceData?.instanceId || armorInstance._equippedKey;
        const armor   = (baseKey && ARMOR[baseKey]) ? ARMOR[baseKey] : armorInstance;
        const quality = instanceData?.quality || armor.quality || 'normal';
        const p  = gameState?.player;
        const qc = QUALITY_CONFIG?.[quality] || {};
        const qualityColor = qc.color || '#00FF00';
        const qualityName  = qc.name  || quality;

        // Quality-adjusted defense — matches buildArmorDefLine exactly
        const aqb  = typeof getQualityBonus === 'function' ? getQualityBonus(quality, armor.baseDefense) : 0;
        const tDef = armor.baseDefense + aqb;
        const tMag = (armor.baseMagicBonus || 0) + Math.floor((armor.baseMagicBonus || 0) * (qc.bonusPct || 0));

        let yourDef = tDef;
        if (p) {
            const gems = ARMOR[baseKey]?.gems || instanceData?.gems || armor.gems || [];
            let gemDef = 0;
            for (const g of gems) gemDef += g?.stats?.defenseBonus || 0;
            yourDef = tDef + (p.con || 0) + gemDef;
        }

        let html = `<div style="background:#0a0a0a;border:2px solid ${qualityColor};border-radius:8px;padding:12px;max-width:260px;font-family:'VT323',monospace;box-shadow:0 0 20px rgba(0,0,0,0.8);">
            <div style="color:${qualityColor};font-size:16px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:4px;margin-bottom:8px;">🛡️ ${armor.name}</div>
            <div style="color:#aaa;font-size:12px;margin-bottom:6px;">${qualityName} · Level ${armor.level || '?'}</div>
            <div style="color:#888;font-size:12px;">BASE DEF: ${tDef}${tMag > 0 ? ` | MAG+: ${tMag}` : ''}</div>
            ${p ? `<div style="color:#88ccff;font-size:12px;">YOUR DEF: ${yourDef}${tMag > 0 ? ` | MAG+: ${tMag}` : ''}</div>` : ''}`;

        const bonusHp = instanceData?.bonusHp || armor.bonusHp;
        const bonusMp = instanceData?.bonusMp || armor.bonusMp;
        if (bonusHp || bonusMp) {
            html += `<div style="color:#88ff88;font-size:12px;margin-top:4px;">`;
            if (bonusHp) html += `❤️ +${bonusHp} HP `;
            if (bonusMp) html += `✨ +${bonusMp} MP`;
            html += `</div>`;
        }

        const modifiers = instanceData?.modifiers || armor.modifiers || [];
        if (modifiers.length > 0) {
            html += `<div style="margin-top:8px;border-top:1px solid #222;padding-top:4px;">`;
            modifiers.forEach(mod => {
                const valueStr = mod.statType === 'percent' ? `${mod.value}%` : `+${mod.value}`;
                let desc = '';
                if (typeof ARMOR_MODIFIERS !== 'undefined') {
                    const key = Object.keys(ARMOR_MODIFIERS).find(k =>
                        ARMOR_MODIFIERS[k].name?.toLowerCase() === mod.name?.toLowerCase());
                    if (key) desc = ARMOR_MODIFIERS[key]?.description || '';
                }
                html += `<div style="color:${mod.color};font-size:12px;margin-bottom:3px;">${mod.icon || '✨'} ${mod.name}: ${valueStr}`;
                if (desc) html += `<br><span style="color:#888;font-size:11px;margin-left:16px;">${desc}</span>`;
                html += `</div>`;
            });
            html += `</div>`;
        }

        const gems = ARMOR[baseKey]?.gems || instanceData?.gems || armor.gems || [];
        if (gems.length > 0) {
            html += `<div style="margin-top:8px;border-top:1px solid #222;padding-top:4px;">`;
            gems.forEach(gem => {
                html += `<div style="color:${gem.color};font-size:12px;">💎 ${gem.name}: ${gem.description}</div>`;
            });
            html += `</div>`;
        }

        const slots = typeof getGemSlots === 'function' ? getGemSlots(quality) : 0;
        if (slots > 0) {
            html += `<div style="color:#555;font-size:11px;margin-top:6px;">⚙️ ${gems.length}/${slots} gem slots used</div>`;
        }

        html += `</div>`;
        return html;
    }

        buildItemTooltip(itemData) {
        const actualItem = itemData.data || ITEMS[itemData.key || itemData];
        if (!actualItem) return null;
        
        let html = `
            <div style="background:#0a0a0a; border:2px solid #00aa88; border-radius:8px; padding:12px; max-width:260px; font-family:'VT323',monospace; box-shadow:0 0 20px rgba(0,0,0,0.8);">
                <div style="color:#00aa88; font-size:16px; font-weight:bold; border-bottom:1px solid #333; padding-bottom:4px; margin-bottom:8px;">
                    🧪 ${actualItem.name}
                </div>
        `;
        
        html += `<div style="color:#aaa; font-size:12px; margin-bottom:8px;">${actualItem.description || 'A useful item'}</div>`;
        
        if (actualItem.power) {
            html += `<div style="color:#88ff88; font-size:12px;">💪 Power: ${actualItem.power}</div>`;
        }
        if (actualItem.sellValue) {
            html += `<div style="color:#FFD700; font-size:11px;">💰 Sell Value: ${actualItem.sellValue}g</div>`;
        }
        
        html += `</div>`;
        return html;
    }
    
    buildGemTooltip(gem) {
        let html = `
            <div style="background:#0a0a0a; border:2px solid ${gem.color}; border-radius:8px; padding:12px; max-width:260px; font-family:'VT323',monospace; box-shadow:0 0 20px rgba(0,0,0,0.8);">
                <div style="color:${gem.color}; font-size:16px; font-weight:bold; border-bottom:1px solid #333; padding-bottom:4px; margin-bottom:8px;">
                    💎 ${gem.name}
                </div>
        `;
        
        html += `<div style="color:#aaa; font-size:12px; margin-bottom:8px;">${gem.description}</div>`;
        
        if (gem.stats) {
            html += `<div style="margin-top:4px;">`;
            for (const [stat, value] of Object.entries(gem.stats)) {
                const statNames = {
                    weaponDmg: '⚔️ Weapon DMG', lifesteal: '🩸 Lifesteal', spellPower: '🔮 Spell Power',
                    critBonus: '🎯 Crit', lightningDmg: '⚡ Lightning', poisonChance: '💀 Poison',
                    strBonus: '💪 STR', conBonus: '🛡️ CON', defenseBonus: '🛡️ Defense',
                    hpBonus: '❤️ HP', mpBonus: '💙 MP', armorPierce: '🗡️ Armor Pierce',
                    hpRegen: '💚 HP Regen', mpRegen: '✨ MP Regen', cdReduce: '⏱️ Cooldown',
                    fireDmg: '🔥 Fire', frostDmg: '❄️ Frost', spellLeech: '🔮 Spell Leech', wisBonus: '🧠 WIS'
                };
                html += `<div style="color:#88ff88; font-size:11px;">${statNames[stat] || stat}: +${value}</div>`;
            }
            html += `</div>`;
        }
        
        html += `</div>`;
        return html;
    }
    
    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.style.opacity = '0';
            setTimeout(() => {
                if (this.tooltip && this.tooltip.parentNode) {
                    this.tooltip.parentNode.removeChild(this.tooltip);
                }
                this.tooltip = null;
            }, 200);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.longPressTooltip = new LongPressTooltip(500);
        console.log('📱 Long-press tooltip system initialized');
    }, 1000);
});