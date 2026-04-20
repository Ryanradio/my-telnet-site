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
        
        // Check for buttons inside the dungeon/explore inventory overlay
        // Use closest() so buttons nested at any depth inside the overlay are found
        const button = target.closest('button');
        if (button && button.closest('#dungeonInvOverlay')) {
            return button;
        }
        
        // Also check for menu options
        const menuOption = target.closest('.menu-option');
        if (menuOption) return menuOption;
        
        return null;
    }
    
    getItemData(element) {
        // Handle inventory overlay buttons (dungeon AND explore — same overlay ID)
        if (element.tagName === 'BUTTON' && element.closest('#dungeonInvOverlay')) {
            // Extract item name from button text (first line, remove icons)
            let itemName = element.innerText.split('\n')[0].replace(/[⚔️🛡️🧪💎🔴🟢🟡🔵🟣⬛🔷🟤🩸🌙☀️🔮🩶⛈️]/g, '').trim();
            // Remove quality brackets like [legendary], [epic], etc.
            let qualityFromBracket = '';
            const bracketMatch = itemName.match(/\[(.*?)\]/);
            if (bracketMatch) {
                qualityFromBracket = bracketMatch[1];
                itemName = itemName.replace(/\[.*?\]/g, '').trim();
            }
            
            const player = gameState?.player;
            if (!player || !player.inventory) return null;
            
            for (const item of player.inventory) {
                if (typeof item === 'object') {
                    if (item.name === itemName) return item;
                    if (item.name && item.name.includes(itemName)) return item;
                    if (qualityFromBracket && item.quality === qualityFromBracket && item.name.includes(itemName.split(' ').pop())) {
                        return item;
                    }
                }
            }
            
            if (player.weapon && WEAPONS[player.weapon]?.name === itemName) return WEAPONS[player.weapon];
            if (player.weapon && WEAPONS[player.weapon]?.name.includes(itemName)) return WEAPONS[player.weapon];
            if (player.armor && ARMOR[player.armor]?.name === itemName) return ARMOR[player.armor];
            if (player.armor && ARMOR[player.armor]?.name.includes(itemName)) return ARMOR[player.armor];
            
            return null;
        }
        
        // Original logic for item-card elements (town inventory)
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
        
        const player = gameState?.player;
        if (!player || !player.inventory) return null;
        
        for (const item of player.inventory) {
            if (typeof item === 'object') {
                if (item.name === itemName) return item;
                if (item.name && item.name.includes(itemName) && (item.weaponId || item.armorId)) return item;
                if (qualityFromBracket && item.quality === qualityFromBracket && item.name.includes(itemName.split(' ').pop())) {
                    return item;
                }
            }
        }
        
        if (player.weapon && WEAPONS[player.weapon]?.name === itemName) return WEAPONS[player.weapon];
        if (player.weapon && WEAPONS[player.weapon]?.name.includes(itemName)) return WEAPONS[player.weapon];
        if (player.armor && ARMOR[player.armor]?.name === itemName) return ARMOR[player.armor];
        if (player.armor && ARMOR[player.armor]?.name.includes(itemName)) return ARMOR[player.armor];
        
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
        // Weapon
        if (item.weaponId || WEAPONS[item.instanceId]) {
            return this.buildWeaponTooltip(item);
        }
        // Armor
        if (item.armorId || ARMOR[item.instanceId]) {
            return this.buildArmorTooltip(item);
        }
        // Potion/Item
        if (item.type === 'item' || ITEMS[item.key || item]) {
            return this.buildItemTooltip(item);
        }
        // Gem
        if (item.cut) {
            return this.buildGemTooltip(item);
        }
        return null;
    }
    
    buildWeaponTooltip(weapon) {
        const qualityColor = QUALITY_CONFIG[weapon.quality]?.color || '#00FF00';
        const qualityName = QUALITY_CONFIG[weapon.quality]?.name || weapon.quality || 'Normal';
        
        let html = `
            <div style="background:#0a0a0a; border:2px solid ${qualityColor}; border-radius:8px; padding:12px; max-width:260px; font-family:'VT323',monospace; box-shadow:0 0 20px rgba(0,0,0,0.8);">
                <div style="color:${qualityColor}; font-size:16px; font-weight:bold; border-bottom:1px solid #333; padding-bottom:4px; margin-bottom:8px;">
                    ⚔️ ${weapon.name}
                </div>
                <div style="color:#aaa; font-size:11px; margin-bottom:8px;">${qualityName} · Level ${weapon.level || '?'}</div>
        `;
        
        // Damage
        const minDmg = weapon.baseDamage;
        const maxDmg = weapon.maxDamage || weapon.baseDamage;
        html += `<div style="color:#ff8888; font-size:13px;">⚔️ Damage: ${minDmg}-${maxDmg}`;
        if (weapon.baseMagicDamage) {
            html += ` | ✨ Magic: +${weapon.baseMagicDamage}`;
        }
        html += `</div>`;
        
        // Modifiers with descriptions
        if (weapon.modifiers && weapon.modifiers.length > 0) {
            html += `<div style="margin-top:8px; border-top:1px solid #222; padding-top:4px;">`;
            weapon.modifiers.forEach(mod => {
                const modColor = mod.color || '#FFD700';
                let modText = mod.name;
                if (mod.minDamage) modText += ` (+${mod.minDamage}-${mod.maxDamage} dmg)`;
                if (mod.lifestealPercent) modText += ` (${mod.lifestealPercent}% lifesteal)`;
                if (mod.critBonus) modText += ` (+${mod.critBonus}% crit)`;
                if (mod.armorPierce) modText += ` (${Math.floor(mod.armorPierce*100)}% armor pierce)`;
                
                // Get description - try modKey first, then try matching by name
                let description = '';
                if (mod.modKey && typeof WEAPON_MODIFIERS !== 'undefined' && WEAPON_MODIFIERS[mod.modKey]) {
                    description = WEAPON_MODIFIERS[mod.modKey].description || '';
                }
                if (!description && mod.name && typeof WEAPON_MODIFIERS !== 'undefined') {
                    const lowerName = mod.name.toLowerCase();
                    for (const [key, value] of Object.entries(WEAPON_MODIFIERS)) {
                        if (value.name && value.name.toLowerCase() === lowerName) {
                            description = value.description || '';
                            break;
                        }
                    }
                }
                // Hardcoded fallbacks
                if (!description) {
                    if (mod.name === 'Sharp') description = 'Adds bonus physical damage to your attacks';
                    else if (mod.name === 'Swift') description = 'Increases your critical hit chance';
                    else if (mod.name === 'Precision') description = 'Increases critical hit chance and accuracy';
                    else if (mod.name === 'Flame') description = 'Adds fire damage that can burn enemies';
                }
                
                html += `<div style="color:${modColor}; font-size:11px; margin-bottom:4px;">✨ ${modText}`;
                if (description) {
                    html += `<br><span style="color:#888; font-size:10px; margin-left:18px;">${description}</span>`;
                }
                html += `</div>`;
            });
            html += `</div>`;
        }
        
        // Gems
        if (weapon.gems && weapon.gems.length > 0) {
            html += `<div style="margin-top:8px; border-top:1px solid #222; padding-top:4px;">`;
            weapon.gems.forEach(gem => {
                html += `<div style="color:${gem.color}; font-size:11px;">💎 ${gem.name}: ${gem.description}</div>`;
            });
            html += `</div>`;
        }
        
        // Gem slots
        const slots = getGemSlots(weapon.quality);
        if (slots > 0) {
            const filled = weapon.gems?.length || 0;
            html += `<div style="color:#555; font-size:10px; margin-top:6px;">⚙️ ${filled}/${slots} gem slots used</div>`;
        }
        
        html += `</div>`;
        return html;
    }
    
    buildArmorTooltip(armor) {
        const qualityColor = QUALITY_CONFIG[armor.quality]?.color || '#00FF00';
        const qualityName = QUALITY_CONFIG[armor.quality]?.name || armor.quality || 'Normal';
        
        let html = `
            <div style="background:#0a0a0a; border:2px solid ${qualityColor}; border-radius:8px; padding:12px; max-width:260px; font-family:'VT323',monospace; box-shadow:0 0 20px rgba(0,0,0,0.8);">
                <div style="color:${qualityColor}; font-size:16px; font-weight:bold; border-bottom:1px solid #333; padding-bottom:4px; margin-bottom:8px;">
                    🛡️ ${armor.name}
                </div>
                <div style="color:#aaa; font-size:11px; margin-bottom:8px;">${qualityName} · Level ${armor.level || '?'}</div>
        `;
        
        // Defense
        html += `<div style="color:#88ccff; font-size:13px;">🛡️ Defense: ${armor.baseDefense}`;
        if (armor.baseMagicBonus) {
            html += ` | ✨ Magic: +${armor.baseMagicBonus}`;
        }
        html += `</div>`;
        
        // HP/MP bonuses
        if (armor.bonusHp || armor.bonusMp) {
            html += `<div style="color:#88ff88; font-size:12px; margin-top:4px;">`;
            if (armor.bonusHp) html += `❤️ +${armor.bonusHp} HP `;
            if (armor.bonusMp) html += `✨ +${armor.bonusMp} MP`;
            html += `</div>`;
        }
        
        // Modifiers with descriptions from ARMOR_MODIFIERS
        if (armor.modifiers && armor.modifiers.length > 0) {
            html += `<div style="margin-top:8px; border-top:1px solid #222; padding-top:4px;">`;
            armor.modifiers.forEach(mod => {
                const valueStr = mod.statType === 'percent' ? `${mod.value}%` : `+${mod.value}`;
                
                let description = '';
                if (typeof ARMOR_MODIFIERS !== 'undefined') {
                    const modKey = Object.keys(ARMOR_MODIFIERS).find(key => 
                        ARMOR_MODIFIERS[key].name.toLowerCase() === mod.name.toLowerCase()
                    );
                    if (modKey && ARMOR_MODIFIERS[modKey]) {
                        description = ARMOR_MODIFIERS[modKey].description || '';
                    }
                }
                
                html += `<div style="color:${mod.color}; font-size:11px; margin-bottom:4px;">`;
                html += `${mod.icon || '✨'} <strong>${mod.name}</strong>: ${valueStr}`;
                if (description) {
                    html += `<br><span style="color:#888; font-size:10px; margin-left:18px;">${description}</span>`;
                }
                html += `</div>`;
            });
            html += `</div>`;
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