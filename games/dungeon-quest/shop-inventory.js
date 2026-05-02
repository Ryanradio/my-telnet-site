// ═══════════════════════════════════════════════════════════════
// SHOP, SELL, INVENTORY, EQUIP SYSTEM
// Extracted from index.html
// Dependencies: gameState, termAppend, updateHud, saveGame (runtime globals)
// ═══════════════════════════════════════════════════════════════
let _currentFeaturedWeapon = null;
let _currentFeaturedArmor = null;
let _currentFeaturedCycle = null;

const FEATURED_QUALITY_ROLLS = [
    { quality: 'epic',      threshold: 60.0  },
    { quality: 'legendary', threshold: 92.0  },
    { quality: 'godly',     threshold: 100.0 },
];

// Level-scaled featured prices by quality — fair and predictable regardless of base item cost
const FEATURED_PRICES = {
    epic: [
        { maxLevel: 5,  cost: 800   },
        { maxLevel: 10, cost: 2500  },
        { maxLevel: 15, cost: 6000  },
        { maxLevel: 20, cost: 12000 },
        { maxLevel: 25, cost: 20000 },
    ],
    legendary: [
        { maxLevel: 5,  cost: 2000  },
        { maxLevel: 10, cost: 6000  },
        { maxLevel: 15, cost: 14000 },
        { maxLevel: 20, cost: 25000 },
        { maxLevel: 25, cost: 40000 },
    ],
    godly: [
        { maxLevel: 5,  cost: 5000  },
        { maxLevel: 10, cost: 15000 },
        { maxLevel: 15, cost: 32000 },
        { maxLevel: 20, cost: 55000 },
        { maxLevel: 25, cost: 80000 },
    ],
};

function getFeaturedPrice(quality, playerLevel) {
    const tiers = FEATURED_PRICES[quality];
    if (!tiers) return 500; // fallback
    for (const tier of tiers) {
        if (playerLevel <= tier.maxLevel) return tier.cost;
    }
    return tiers[tiers.length - 1].cost;
}

const REROLL_COSTS = [
    { maxLevel: 5,  cost: 50   },
    { maxLevel: 10, cost: 250  },
    { maxLevel: 15, cost: 750  },
    { maxLevel: 20, cost: 2000 },
    { maxLevel: 25, cost: 6000 },
];

function getRerollCost(level) {
    for (const tier of REROLL_COSTS) {
        if (level <= tier.maxLevel) return tier.cost;
    }
    return 6000;
}

function rollFeaturedQuality(seed) {
    const rand = ((Math.sin(seed) * 43758.5453123) % 1 + 1) % 1 * 100;
    for (const tier of FEATURED_QUALITY_ROLLS) {
        if (rand <= tier.threshold) return tier.quality;
    }
    return 'normal';
}

// Global variable to track current featured items
window._currentFeaturedItems = { weapon: null, armor: null };

function getFeaturedItems(playerLevel, playerClass, rerollOffset) {
    const cycleWindow = Math.floor(Date.now() / (4 * 60 * 60 * 1000));
    
    // If we already have items for this cycle, return them (don't generate new ones)
    if (_currentFeaturedCycle === cycleWindow && _currentFeaturedWeapon && _currentFeaturedArmor) {
        console.log('Using cached featured items for cycle', cycleWindow);
        return { weapon: _currentFeaturedWeapon, armor: _currentFeaturedArmor };
    }
    
    // Clean up OLD featured items from previous cycle
    if (_currentFeaturedWeapon && _currentFeaturedWeapon.instanceId) {
        delete WEAPONS[_currentFeaturedWeapon.instanceId];
    }
    if (_currentFeaturedArmor && _currentFeaturedArmor.instanceId) {
        delete ARMOR[_currentFeaturedArmor.instanceId];
    }
    
    const weaponSeed = cycleWindow * 1000 + rerollOffset * 7 + 1;
    const armorSeed = cycleWindow * 1000 + rerollOffset * 7 + 2;
    const weaponQuality = rollFeaturedQuality(weaponSeed);
    const armorQuality = rollFeaturedQuality(armorSeed);

    const minLv = Math.max(1, playerLevel - 2);
    const maxLv = playerLevel + 2;

    // Filter weapons by class AND level
    const allWeapons = Object.keys(WEAPONS).filter(k => {
        const w = WEAPONS[k];
        if (w.unarmed || w.instanceId || !w.cost) return false;
        if (w.level < minLv || w.level > maxLv) return false;
        if (!canUseWeapon(playerClass, w)) return false;
        return true;
    });
    
    // Filter armor by class AND level
    const allArmors = Object.keys(ARMOR).filter(k => {
        const a = ARMOR[k];
        if (a.unarmored || a.isDropped || !a.cost) return false;
        if (a.level < minLv || a.level > maxLv) return false;
        if (!canUseArmor(playerClass, a)) return false;
        return true;
    });

    if (!allWeapons.length || !allArmors.length) return { weapon: null, armor: null };

    const wIdx = Math.abs(Math.floor(Math.sin(weaponSeed + 99) * 99999)) % allWeapons.length;
    const aIdx = Math.abs(Math.floor(Math.sin(armorSeed + 99) * 99999)) % allArmors.length;
    
    const weaponKey = allWeapons[wIdx];
    const armorKey = allArmors[aIdx];
    
    // Create the full weapon object (without adding to inventory)
    const weaponDrop = generateWeaponDrop(gameState.player, playerLevel, 'common', true, weaponQuality, false);
    const armorDrop = generateArmorDrop(gameState.player, playerLevel, 'common', true, armorQuality, false);
    
    // Store for this cycle
    _currentFeaturedCycle = cycleWindow;
    _currentFeaturedWeapon = weaponDrop;
    _currentFeaturedArmor = armorDrop;

    return {
        weapon: weaponDrop,
        armor: armorDrop
    };
}

function getTimeUntilNextCycle() {
    const cycleMs   = 4 * 60 * 60 * 1000;
    const nextCycle = (Math.floor(Date.now() / cycleMs) + 1) * cycleMs;
    const rem       = nextCycle - Date.now();
    const h = Math.floor(rem / 3600000);
    const m = Math.floor((rem % 3600000) / 60000);
    const s = Math.floor((rem % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
}

function getRerollState(p) {
    const cycleWindow = Math.floor(Date.now() / (4 * 60 * 60 * 1000));
    if (!p._shopReroll || p._shopReroll.cycle !== cycleWindow) {
        p._shopReroll = { cycle: cycleWindow, count: 0, offset: 0 };
    }
    return p._shopReroll;
}

// ── Main entry ───────────────────────────────────────────────────
function showShop() {
    checkGameVersion();
    const screen = document.getElementById('mainScreen');
    setScreen(`<div id="shopRoot"></div>`);
    renderShop('buy', 'weapons', 'all', 'near');
}

// section: 'weapons' | 'armor' | 'potions'
// typeFilter: 'all' | 'sword' | 'hammer' etc
// levelFilter: 'near' | 'all'
function renderShop(tab, section, typeFilter, levelFilter) {
    const p           = gameState.player;
    const playerClass = p.baseClass || p.class;
    const screen      = document.getElementById('shopRoot');
    if (!screen) return;

    clearInterval(window._shopTimerInterval);

    const rerollState = getRerollState(p);
    const featured    = getFeaturedItems(p.level, playerClass, rerollState.offset);
    const rerollCost  = getRerollCost(p.level);
    const rerollsLeft = 3 - rerollState.count;

    // ── Featured banner ──────────────────────────────────────────
            function buildFeaturedHtml() {
        let html = `
        <div style="border:1px solid #2a1a05;border-radius:3px;overflow:hidden;margin-bottom:14px;background:#080800;">
            <div style="background:linear-gradient(90deg,#0a0a0a,#1a1005,#0a0a0a);border-bottom:1px solid #2a1a05;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
                <span style="color:#c8a000;font-size:12px;letter-spacing:2px;font-family:'Courier New',monospace;">✦ FEATURED ✦</span>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="color:#444;font-size:10px;font-family:'Courier New',monospace;">⏱ <span id="shopTimer">${getTimeUntilNextCycle()}</span></span>
                    ${rerollsLeft > 0
                        ? `<button onclick="doShopReroll()" style="background:#0a0800;border:1px solid #c8a000;color:#c8a000;font-size:10px;padding:3px 8px;cursor:pointer;font-family:'Courier New',monospace;">⚄ ${rerollCost}g · ${rerollsLeft} left</button>`
                        : `<span style="color:#2a2000;font-size:10px;font-family:'Courier New',monospace;">No rerolls left</span>`
                    }
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#1a1005;">`;

        // Featured Weapon
        if (featured.weapon) {
            const weapon = featured.weapon;
            const qc = QUALITY_CONFIG[weapon.quality];
            const color = qc?.color || '#00ff00';
            const price = getFeaturedPrice(weapon.quality, p.level);
            const canBuy = canUseWeapon(playerClass, weapon);
            const canAfford = p.gold >= price;
            const isSpecial = ['legendary','godly'].includes(weapon.quality);
            const statLine = buildWeaponDmgLine(weapon, weapon.quality, p);
            
            // Weapon modifiers display
            let weaponModifierHtml = '';
            if (weapon.modifiers && weapon.modifiers.length > 0) {
                weaponModifierHtml = '<div style="margin-top:5px;font-size:9px;">';
                weapon.modifiers.forEach(mod => {
                    const modColor = mod.color || '#FFD700';
                    let modText = mod.name;
                    if (mod.minDamage) modText += ` (+${mod.minDamage}-${mod.maxDamage} dmg)`;
                    if (mod.critBonus) modText += ` (+${mod.critBonus}% crit)`;
                    if (mod.lifestealPercent) modText += ` (${mod.lifestealPercent}% lifesteal)`;
                    weaponModifierHtml += `<span style="color:${modColor};margin-right:8px;">✨ ${modText}</span>`;
                });
                weaponModifierHtml += '</div>';
            }
            
            html += `
            <div style="background:#080800;padding:10px 12px;position:relative;overflow:hidden;${isSpecial?`box-shadow:inset 0 0 20px ${color}08;`:''}">
                ${isSpecial ? `<div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${color}66,transparent);"></div>` : ''}
                <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;flex-wrap:wrap;">
                    <span style="color:${color};font-size:12px;font-weight:bold;">⚔️ ${weapon.name}</span>
                </div>
                <div style="display:inline-block;background:${color}18;border:1px solid ${color}33;color:${color};font-size:9px;letter-spacing:1px;padding:1px 5px;margin-bottom:4px;font-family:'Courier New',monospace;">${weapon.quality.toUpperCase()}</div>
                <div style="font-size:10px;margin-bottom:6px;">${statLine}</div>
                ${weaponModifierHtml}
                <div style="color:#555;font-size:9px;margin-bottom:6px;font-family:'Courier New',monospace;">LV${weapon.level || 1}</div>
                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #151505;padding-top:6px;">
                    <span style="color:#c8a000;font-size:12px;font-family:'Courier New',monospace;">${price.toLocaleString()}g</span>
                    ${canBuy
                        ? (canAfford
                            ? `<button onclick="buyFeaturedItem('weapon', '${weapon.instanceId}', ${price})" style="background:#080800;border:1px solid ${color};color:${color};font-size:10px;padding:3px 8px;cursor:pointer;font-family:'Courier New',monospace;">BUY</button>`
                            : `<span style="color:#2a2a2a;font-size:10px;font-family:'Courier New',monospace;">+${(price-p.gold).toLocaleString()}g</span>`)
                        : `<span style="color:#222;font-size:10px;font-family:'Courier New',monospace;">Can't use</span>`
                    }
                </div>
            </div>`;
        } else {
            html += `<div style="background:#080800;padding:16px;text-align:center;color:#222;">–</div>`;
        }
        
        // Featured Armor
        if (featured.armor) {
            const armor = featured.armor;
            const qc = QUALITY_CONFIG[armor.quality];
            const color = qc?.color || '#00ff00';
            const price = getFeaturedPrice(armor.quality, p.level);
            const canBuy = canUseArmor(playerClass, armor);
            const canAfford = p.gold >= price;
            const isSpecial = ['legendary','godly'].includes(armor.quality);
            const statLine = buildArmorDefLine(armor, p);
            
            // Armor modifiers display
            let armorModifierHtml = '';
            if (armor.modifiers && armor.modifiers.length > 0) {
                armorModifierHtml = '<div style="margin-top:5px;font-size:9px;">';
                armor.modifiers.forEach(mod => {
                    const modColor = mod.color || '#FFD700';
                    let modText = mod.name;
                    if (mod.value) {
                        modText += `: ${mod.value}${mod.statType === 'percent' ? '%' : ''}`;
                    }
                    armorModifierHtml += `<span style="color:${modColor};margin-right:8px;">✨ ${modText}</span>`;
                });
                armorModifierHtml += '</div>';
            }
            
            html += `
            <div style="background:#080800;padding:10px 12px;position:relative;overflow:hidden;${isSpecial?`box-shadow:inset 0 0 20px ${color}08;`:''}">
                ${isSpecial ? `<div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${color}66,transparent);"></div>` : ''}
                <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;flex-wrap:wrap;">
                    <span style="color:${color};font-size:12px;font-weight:bold;">🛡️ ${armor.name}</span>
                </div>
                <div style="display:inline-block;background:${color}18;border:1px solid ${color}33;color:${color};font-size:9px;letter-spacing:1px;padding:1px 5px;margin-bottom:4px;font-family:'Courier New',monospace;">${armor.quality.toUpperCase()}</div>
                <div style="font-size:10px;margin-bottom:6px;">${statLine}</div>
                ${armorModifierHtml}
                <div style="color:#555;font-size:9px;margin-bottom:6px;font-family:'Courier New',monospace;">LV${armor.level || 1}</div>
                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #151505;padding-top:6px;">
                    <span style="color:#c8a000;font-size:12px;font-family:'Courier New',monospace;">${price.toLocaleString()}g</span>
                    ${canBuy
                        ? (canAfford
                            ? `<button onclick="buyFeaturedItem('armor', '${armor.instanceId}', ${price})" style="background:#080800;border:1px solid ${color};color:${color};font-size:10px;padding:3px 8px;cursor:pointer;font-family:'Courier New',monospace;">BUY</button>`
                            : `<span style="color:#2a2a2a;font-size:10px;font-family:'Courier New',monospace;">+${(price-p.gold).toLocaleString()}g</span>`)
                        : `<span style="color:#222;font-size:10px;font-family:'Courier New',monospace;">Can't use</span>`
                    }
                </div>
            </div>`;
        } else {
            html += `<div style="background:#080800;padding:16px;text-align:center;color:#222;">–</div>`;
        }
        
        html += `</div></div>`;
        return html;
    }

    // ── Filter bar ───────────────────────────────────────────────
    // Dynamically build subtypes from what this class can actually use
const weaponSubtypes = ['all', ...new Set(
    Object.values(WEAPONS)
        .filter(w => !w.unarmed && !w.instanceId && w.weaponSubtype && canUseWeapon(playerClass, w))
        .map(w => w.weaponSubtype)
        .filter(Boolean)
        .sort()
)];

const armorSubtypes = ['all', ...new Set(
    Object.values(ARMOR)
        .filter(a => !a.unarmored && !a.isDropped && canUseArmor(playerClass, a))
        .map(a => (a.name||'').toLowerCase().split(' ').find(word =>
            ['plate','chain','leather','robe','hide','cloth','scale','padded','mail'].includes(word)
        ))
        .filter(Boolean)
        .sort()
)];

const subtypes = section === 'armor' ? armorSubtypes : weaponSubtypes;
const typeOptions = subtypes.map(t =>
    `<option value="${t}" ${t===typeFilter?'selected':''}>${t==='all'?'All Types':t.charAt(0).toUpperCase()+t.slice(1)+'s'}</option>`
).join('');

    const filterBar = tab === 'buy' ? `
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;align-items:center;">
            <select onchange="renderShop('buy','${section}','${typeFilter}',this.value)" style="flex:0;background:#0d0d0d;border:1px solid #2a2a2a;color:#aaa;padding:5px 6px;font-size:12px;font-family:'Courier New',monospace;">
                <option value="near" ${levelFilter==='near'?'selected':''}>Near Me (±2)</option>
                <option value="all"  ${levelFilter==='all' ?'selected':''}>All · Low→High</option>
                <option value="all_desc" ${levelFilter==='all_desc'?'selected':''}>All · High→Low</option>
            </select>
            <select onchange="renderShop('buy','${section}',this.value,'${levelFilter}')" style="flex:1;background:#0d0d0d;border:1px solid #2a2a2a;color:#aaa;padding:5px 6px;font-size:12px;font-family:'Courier New',monospace;">
                ${typeOptions}
            </select>
        </div>` : '';

    // ── Section tabs ─────────────────────────────────────────────
    const sectionBar = tab === 'buy' ? `
        <div style="display:flex;gap:2px;margin-bottom:10px;">
            ${[['weapons','⚔️ Weapons'],['armor','🛡️ Armor'],['potions','🧪 Potions']].map(([s,label]) => `
            <button onclick="renderShop('buy','${s}','all','${levelFilter}')" style="
                flex:1;background:${section===s?'#0f1a0f':'#080808'};
                border:1px solid ${section===s?'#3a5a3a':'#1a1a1a'};
                color:${section===s?'#8aaa8a':'#444'};
                font-size:11px;padding:6px 2px;cursor:pointer;
                font-family:'Courier New',monospace;
            ">${label}</button>`).join('')}
        </div>` : '';

    // ── Build weapon list ────────────────────────────────────────
    function buildWeaponList() {
        const minLv = levelFilter === 'near' ? Math.max(1, p.level - 2) : 1;
        const maxLv = levelFilter === 'near' ? p.level + 2 : 999;

        let items = Object.keys(WEAPONS).filter(key => {
            const w = WEAPONS[key];
            if (w.unarmed || w.instanceId || !w.cost) return false;
            if (!canUseWeapon(playerClass, w)) return false;
            const lv = w.level || 1;
            if (lv < minLv || lv > maxLv) return false;
            if (typeFilter !== 'all' && w.weaponSubtype !== typeFilter) return false;
            return true;
        }).map(key => ({ key, item: WEAPONS[key] }))
          .sort((a, b) => levelFilter === 'all_desc'
    ? (b.item.level||1) - (a.item.level||1)
    : (a.item.level||1) - (b.item.level||1));

        if (!items.length) return `<div style="color:#333;text-align:center;padding:20px;font-size:12px;font-family:'Courier New',monospace;">No weapons found.</div>`;

        return items.map(({ key, item }) => {
            const isOwned   = p.inventory.some(i => (typeof i === 'object' ? i.weaponId === key : i === key));
            const isEquipped = p.weapon === key;
            const isFuture  = (item.level||1) > p.level;
            const disc      = calcChaDiscount(p.cha);
            const price     = Math.max(1, Math.floor((item.cost||0) * (1 - disc/100)));
            const canAfford = p.gold >= price;

            return `
            <div style="border:1px solid ${isEquipped?'#3a3000':'#0f0f0f'};background:${isEquipped?'#0a0800':'#060606'};padding:9px 10px;margin-bottom:3px;opacity:${isFuture?'0.55':'1'};">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;">
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;flex-wrap:wrap;">
                            <span style="color:#555;font-size:9px;border:1px solid #1a1a1a;padding:1px 4px;font-family:'Courier New',monospace;">LV${item.level||1}</span>
                            <span style="color:${isFuture?'#444':'#ccc'};font-size:12px;">${item.name}</span>
                            ${item.weaponSubtype?`<span style="color:#2a2a2a;font-size:9px;font-family:'Courier New',monospace;">${item.weaponSubtype}</span>`:''}
                        </div>
                        <div style="font-size:10px;">${buildWeaponDmgLine(item, null, p)}</div>
                    </div>
                    <div style="text-align:right;flex-shrink:0;min-width:60px;">
                        ${isEquipped
                            ? `<div style="color:#c8a000;font-size:10px;font-family:'Courier New',monospace;">EQUIPPED</div>`
                            : isOwned
                                ? `<div style="color:#2a4a2a;font-size:10px;font-family:'Courier New',monospace;">OWNED</div>`
                                : `<button onclick="buyItem('weapon','${key}',${item.cost})" ${canAfford&&!isFuture?'':'disabled'} style="background:#060606;border:1px solid ${canAfford&&!isFuture?'#3a5a3a':'#1a1a1a'};color:${canAfford&&!isFuture?'#8aaa8a':'#2a2a2a'};font-size:10px;padding:3px 8px;cursor:${canAfford&&!isFuture?'pointer':'default'};font-family:'Courier New',monospace;width:100%;">${price.toLocaleString()}g</button>`
                        }
                        ${disc>0&&!isOwned&&!isEquipped?`<div style="color:#2a4a2a;font-size:9px;margin-top:2px;">-${disc}% CHA</div>`:''}
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    // ── Build armor list ─────────────────────────────────────────
    function buildArmorList() {
        const minLv = levelFilter === 'near' ? Math.max(1, p.level - 2) : 1;
        const maxLv = levelFilter === 'near' ? p.level + 2 : 999;

        let items = Object.keys(ARMOR).filter(key => {
            const a = ARMOR[key];
            if (a.unarmored || a.isDropped || !a.cost) return false;
            if (!canUseArmor(playerClass, a)) return false;
            const lv = a.level || 1;
            if (lv < minLv || lv > maxLv) return false;
            if (typeFilter !== 'all') {
                const name = (a.name||'').toLowerCase();
                if (!name.includes(typeFilter)) return false;
            }
            return true;
        }).map(key => ({ key, item: ARMOR[key] }))
          .sort((a, b) => levelFilter === 'all_desc'
    ? (b.item.level||1) - (a.item.level||1)
    : (a.item.level||1) - (b.item.level||1));

        if (!items.length) return `<div style="color:#333;text-align:center;padding:20px;font-size:12px;font-family:'Courier New',monospace;">No armor found.</div>`;

        return items.map(({ key, item }) => {
            const isOwned   = p.inventory.some(i => (typeof i === 'object' ? i.armorId === key : i === key));
            const isEquipped = p.armor === key;
            const isFuture  = (item.level||1) > p.level;
            const disc      = calcChaDiscount(p.cha);
            const price     = Math.max(1, Math.floor((item.cost||0) * (1 - disc/100)));
            const canAfford = p.gold >= price;

            return `
            <div style="border:1px solid ${isEquipped?'#3a3000':'#0f0f0f'};background:${isEquipped?'#0a0800':'#060606'};padding:9px 10px;margin-bottom:3px;opacity:${isFuture?'0.55':'1'};">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;">
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;flex-wrap:wrap;">
                            <span style="color:#555;font-size:9px;border:1px solid #1a1a1a;padding:1px 4px;font-family:'Courier New',monospace;">LV${item.level||1}</span>
                            <span style="color:${isFuture?'#444':'#ccc'};font-size:12px;">${item.name}</span>
                        </div>
                        <div style="font-size:10px;">${buildArmorDefLine(item, p)}</div>
                    </div>
                    <div style="text-align:right;flex-shrink:0;min-width:60px;">
                        ${isEquipped
                            ? `<div style="color:#c8a000;font-size:10px;font-family:'Courier New',monospace;">EQUIPPED</div>`
                            : isOwned
                                ? `<div style="color:#2a4a2a;font-size:10px;font-family:'Courier New',monospace;">OWNED</div>`
                                : `<button onclick="buyItem('armor','${key}',${item.cost})" ${canAfford&&!isFuture?'':'disabled'} style="background:#060606;border:1px solid ${canAfford&&!isFuture?'#3a5a3a':'#1a1a1a'};color:${canAfford&&!isFuture?'#8aaa8a':'#2a2a2a'};font-size:10px;padding:3px 8px;cursor:${canAfford&&!isFuture?'pointer':'default'};font-family:'Courier New',monospace;width:100%;">${price.toLocaleString()}g</button>`
                        }
                        ${disc>0&&!isOwned&&!isEquipped?`<div style="color:#2a4a2a;font-size:9px;margin-top:2px;">-${disc}% CHA</div>`:''}
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    // ── Build potions list ───────────────────────────────────────
    function buildPotionList() {
        const potions = ['health_potion','greater_health_potion','superior_health_potion',
                         'mana_potion','greater_mana_potion','superior_mana_potion','elixir','recall_potion'];
        return potions.map(key => {
            if (!ITEMS[key]) return '';
            const item = ITEMS[key];
            if (key === 'recall_potion') {
                const owned = p.inventory.includes('recall_potion');
                return `
                <div style="border:1px solid #1a0a3a;background:#06060f;padding:9px 10px;margin-bottom:3px;">
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;">
                        <div style="flex:1;">
                            <div style="color:#AA88FF;font-size:12px;margin-bottom:2px;">🌀 ${item.name}</div>
                            <div style="color:#555;font-size:10px;">${item.description}</div>
                            <div style="color:#3a2266;font-size:9px;margin-top:2px;">Dungeon only · 1 max</div>
                        </div>
                        <div style="flex-shrink:0;min-width:60px;text-align:right;">
                            ${owned
                                ? `<div style="color:#2a1a5c;font-size:10px;font-family:'Courier New',monospace;">OWNED</div>`
                                : p.gold>=1000
                                    ? `<button onclick="buyItem('item','recall_potion',1000)" style="background:#06060f;border:1px solid #AA88FF;color:#AA88FF;font-size:10px;padding:3px 8px;cursor:pointer;font-family:'Courier New',monospace;width:100%;">1000g</button>`
                                    : `<button disabled style="background:#06060f;border:1px solid #1a1a1a;color:#222;font-size:10px;padding:3px 8px;font-family:'Courier New',monospace;width:100%;">1000g</button>`
                            }
                        </div>
                    </div>
                </div>`;
            }
            const held    = item.maxStack ? p.inventory.filter(k=>k===key).length : 0;
            const capped  = item.maxStack && held >= item.maxStack;
            const disc    = calcChaDiscount(p.cha);
            const price   = Math.max(1, Math.floor((item.cost||0) * (1 - disc/100)));
            return `
            <div style="border:1px solid #0f0f0f;background:#060606;padding:9px 10px;margin-bottom:3px;">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;">
                    <div style="flex:1;">
                        <div style="color:#ccc;font-size:12px;margin-bottom:2px;">${item.name}${item.maxStack?` <span style="color:${capped?'#ff4444':'#333'};font-size:9px;">${held}/${item.maxStack}</span>`:''}</div>
                        <div style="color:#555;font-size:10px;">${item.description}</div>
                    </div>
                    <div style="flex-shrink:0;min-width:60px;text-align:right;">
                        ${capped
                            ? `<div style="color:#ff4444;font-size:10px;font-family:'Courier New',monospace;">FULL</div>`
                            : p.gold>=price
                                ? `<button onclick="buyItem('item','${key}',${item.cost})" style="background:#060606;border:1px solid #3a5a3a;color:#8aaa8a;font-size:10px;padding:3px 8px;cursor:pointer;font-family:'Courier New',monospace;width:100%;">${price}g</button>`
                                : `<button disabled style="background:#060606;border:1px solid #1a1a1a;color:#2a2a2a;font-size:10px;padding:3px 8px;font-family:'Courier New',monospace;width:100%;">${price}g</button>`
                        }
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    // ── Section content ──────────────────────────────────────────
    let sectionContent = '';
    if (tab === 'buy') {
        if      (section === 'weapons') sectionContent = buildWeaponList();
        else if (section === 'armor')   sectionContent = buildArmorList();
        else if (section === 'potions') sectionContent = buildPotionList();
    } else {
        sectionContent = `<div id="shopContent"></div>`;
    }

    // ── Full render ──────────────────────────────────────────────
    // NOTE: renderShop writes into #shopRoot (not mainScreen directly)
    // showShop() creates #shopRoot via setScreen, then renderShop populates it
    const shopHtml = `
        <style>#shopRoot button:not([disabled]):hover{filter:brightness(1.3);}</style>

        <!-- Top bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #1a1a0a;">
            <div>
                <div style="color:#c8a000;font-size:15px;letter-spacing:2px;font-family:'Courier New',monospace;">⚔ MERCHANT</div>
                <div style="color:#2a2a1a;font-size:9px;letter-spacing:2px;font-family:'Courier New',monospace;">CALAMITY TRADING CO.</div>
            </div>
            <div style="text-align:right;">
                <div style="color:#c8a000;font-size:15px;font-family:'Courier New',monospace;">${p.gold.toLocaleString()}g</div>
                <div style="color:#2a2a1a;font-size:9px;font-family:'Courier New',monospace;">YOUR GOLD</div>
            </div>
        </div>

        <!-- Featured -->
        ${buildFeaturedHtml()}

        <!-- LEAVE SHOP -->
        <button onclick="showTown()" style="
            display:block;width:100%;background:#0a0500;
            border:2px solid #5a3a00;color:#c8a000;
            font-size:14px;font-weight:bold;padding:10px;cursor:pointer;
            font-family:'Courier New',monospace;letter-spacing:2px;
            margin-bottom:10px;
        ">← LEAVE SHOP</button>

        <!-- Buy / Sell tabs -->
        <div style="display:flex;gap:2px;margin-bottom:12px;">
            <button onclick="renderShop('buy','${section}','${typeFilter}','${levelFilter}')" style="flex:1;background:${tab==='buy'?'#0f1a0f':'#080808'};border:1px solid ${tab==='buy'?'#3a5a3a':'#1a1a1a'};color:${tab==='buy'?'#8aaa8a':'#333'};font-size:12px;padding:8px;cursor:pointer;font-family:'Courier New',monospace;">💰 BUY</button>
            <button onclick="renderShop('sell','weapons','all','near');setTimeout(showShopSell,50)" style="flex:1;background:${tab==='sell'?'#1a0f0f':'#080808'};border:1px solid ${tab==='sell'?'#5a3a3a':'#1a1a1a'};color:${tab==='sell'?'#aa8a8a':'#333'};font-size:12px;padding:8px;cursor:pointer;font-family:'Courier New',monospace;">💎 SELL</button>
        </div>

        <!-- Section tabs + filters (buy only) -->
        ${sectionBar}
        ${filterBar}

        <!-- Content -->
        <div style="padding-bottom:24px;">${sectionContent}</div>

        <!-- Bottom leave -->
        <button onclick="showTown()" style="display:block;width:100%;background:#080808;border:1px solid #1a1a1a;color:#333;font-size:11px;padding:8px;cursor:pointer;font-family:'Courier New',monospace;letter-spacing:2px;">← LEAVE SHOP</button>
    `;
    screen.innerHTML = shopHtml;

    // Timer tick
    window._shopTimerInterval = setInterval(() => {
        const el = document.getElementById('shopTimer');
        if (el) el.textContent = getTimeUntilNextCycle();
        else clearInterval(window._shopTimerInterval);
    }, 1000);

    if (tab === 'sell') setTimeout(showShopSell, 50);
}

// ── Reroll ───────────────────────────────────────────────────────
function doShopReroll() {
    const p     = gameState.player;
    const state = getRerollState(p);
    const cost  = getRerollCost(p.level);
    if (state.count >= 3)   { alert('No rerolls left this cycle.'); return; }
    if (p.gold < cost)      { alert(`Need ${cost}g to reroll.`); return; }
    if (!confirm(`Spend ${cost}g to reroll featured items?`)) return;
    p.gold -= cost;
    state.count++;
    state.offset = (state.offset + 1) * 13 + state.count * 7;
    saveGame();
    renderShop('buy', 'weapons', 'all', 'near');
}

// ── Buy featured ─────────────────────────────────────────────────
function buyFeaturedItem(type, instanceId, price) {
    const p = gameState.player;
    const playerClass = p.baseClass || p.class;
    
    // Find the item by instanceId
    const item = type === 'weapon' ? WEAPONS[instanceId] : ARMOR[instanceId];
    if (!item) {
        alert('Item not found!');
        return;
    }
    
    const canUse = type === 'weapon' ? canUseWeapon(playerClass, item) : canUseArmor(playerClass, item);
    if (!canUse) { alert(`Your class cannot use this item.`); return; }
    if (p.gold < price) { alert('Not enough gold!'); return; }
    if (!confirm(`Buy ${item.name} for ${price.toLocaleString()}g?`)) return;
    
    p.gold -= price;
    
    // Mark as purchased (not dropped) and add to inventory
    item.isDropped = false;
    p.inventory.push(item);
    
    saveGame();
    renderShop('buy', 'weapons', 'all', 'near');
}


function showShopSell() {
    const p = gameState.player;
    const QUALITY_ORDER = ['poor','normal','rare','epic','legendary','godly'];

    // Get threshold
    const thresholdEl = document.getElementById('sellQualityThreshold');
    const threshold = thresholdEl ? thresholdEl.value : 'poor';
    const thresholdIdx = QUALITY_ORDER.indexOf(threshold);

    // Build quality options
    const qualityOptions = QUALITY_ORDER.map(q => {
        const cfg = QUALITY_CONFIG[q];
        return `<option value="${q}" ${q === threshold ? 'selected' : ''}>${cfg.name} and below</option>`;
    }).join('');

    // Group items
    const weaponInstances = [];
    const armorInstances = [];
    const stringWeapons = {};
    const stringArmor = {};
    const items = {};
    const gems = [];

    p.inventory.forEach((item, index) => {
        // Weapon instances
        if (typeof item === 'object' && item !== null && item.weaponId) {
            weaponInstances.push({ item, index });
        }
        // Armor instances
        else if (typeof item === 'object' && item !== null && item.armorId) {
            armorInstances.push({ item, index });
        }
        // Gems
        else if (typeof item === 'object' && item !== null && item.cut) {
            gems.push({ item, index });
        }
        // Items (potions)
        else if (typeof item === 'string' && ITEMS[item] && ITEMS[item].sellValue > 0) {
            items[item] = items[item] || { count: 0, indices: [] };
            items[item].count++;
            items[item].indices.push(index);
        }
        // String weapons
        else if (typeof item === 'string' && WEAPONS[item] && item !== p.weapon) {
            stringWeapons[item] = stringWeapons[item] || { count: 0, indices: [] };
            stringWeapons[item].count++;
            stringWeapons[item].indices.push(index);
        }
        // String armor
        else if (typeof item === 'string' && ARMOR[item] && item !== p.armor) {
            stringArmor[item] = stringArmor[item] || { count: 0, indices: [] };
            stringArmor[item].count++;
            stringArmor[item].indices.push(index);
        }
    });

    console.log("Gems found:", gems.length, gems);

    // Calculate sell all totals
    let sellAllGold = 0;
    let sellAllCount = 0;

    weaponInstances.forEach(({ item }) => {
        const weapon = WEAPONS[item.weaponId] || WEAPONS[item.instanceId];
        if (!weapon) return;
        const qIdx = QUALITY_ORDER.indexOf(item.quality || weapon.quality || 'normal');
        if (qIdx <= thresholdIdx) {
            sellAllGold += Math.floor((weapon.cost || 100) * 0.1);
            sellAllCount++;
        }
    });

    armorInstances.forEach(({ item }) => {
        const armor = ARMOR[item.armorId] || ARMOR[item.instanceId];
        if (!armor) return;
        const qIdx = QUALITY_ORDER.indexOf(item.quality || armor.quality || 'normal');
        if (qIdx <= thresholdIdx) {
            sellAllGold += Math.floor((armor.cost || 100) * 0.1);
            sellAllCount++;
        }
    });

    gems.forEach(() => {
        sellAllGold += 100;
        sellAllCount++;
    });

    Object.entries(stringWeapons).forEach(([key, data]) => {
        const weapon = WEAPONS[key];
        if (!weapon) return;
        const qIdx = QUALITY_ORDER.indexOf(weapon.quality || 'normal');
        if (qIdx <= thresholdIdx) {
            sellAllGold += Math.floor((weapon.cost || 100) * 0.1) * data.count;
            sellAllCount += data.count;
        }
    });

    Object.entries(stringArmor).forEach(([key, data]) => {
        const armor = ARMOR[key];
        if (!armor) return;
        const qIdx = QUALITY_ORDER.indexOf(armor.quality || 'normal');
        if (qIdx <= thresholdIdx) {
            sellAllGold += Math.floor((armor.cost || 100) * 0.1) * data.count;
            sellAllCount += data.count;
        }
    });

    Object.entries(items).forEach(([key, data]) => {
        sellAllGold += (ITEMS[key].sellValue || 0) * data.count;
        sellAllCount += data.count;
    });

    // Start building HTML
    let sellHtml = `
        <div style="margin-bottom:12px;">
            <div style="color:var(--highlight-color);font-size:18px;margin-bottom:8px;">SELL ITEMS</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
                <label style="font-size:14px;color:#aaa;">Sell threshold:</label>
                <select id="sellQualityThreshold" style="background:#111;border:1px solid var(--border-color);color:#fff;padding:4px 8px;font-size:14px;" onchange="showShopSell()">
                    ${qualityOptions}
                </select>
                <button onclick="sellAllBelowThreshold()" style="background:#222;border:1px solid #ff8c00;color:#ff8c00;padding:5px 14px;font-size:14px;cursor:pointer;">
                    💰 SELL ALL (${sellAllCount} items · ${sellAllGold}g)
                </button>
            </div>
            <div style="font-size:12px;color:#666;">Items at or below the chosen quality tier will be sold. Equipped gear is never sold.</div>
        </div>
        <div class="inventory-grid">
    `;

    // WEAPON INSTANCES (with full stats) - FIXED to show gems and increase value
weaponInstances.forEach(({ item, index }) => {
    const weapon = WEAPONS[item.weaponId] || WEAPONS[item.instanceId];
    if (!weapon) return;
    
    // Get instance quality or use base
    const displayQuality = item.quality || weapon.quality;
    const qualityColor = QUALITY_CONFIG[displayQuality]?.color || '#00FF00';
    
    // BASE sell value (10% of weapon cost)
    const baseSellValue = Math.floor((weapon.cost || 100) * 0.1);
    
    // GEM value contribution - 25% of cut cost (200g) + socket cost (100g)
    // Cut gem cost: 200g, Socket cost: 100g, total 300g per gem
    // 25% of 300g = 75g per gem
    const gemCount = item.gems?.length || 0;
    const gemValue = gemCount * 75; // 75g per gem (25% of 300g)
    
    // TOTAL sell value
    const sellValue = baseSellValue + gemValue;
    
    const qIdx = QUALITY_ORDER.indexOf(displayQuality);
    const withinThreshold = qIdx <= thresholdIdx;
    
    // Build modifier display
// Build modifier display
let modifierHtml = '';
const modifiers = item.modifiers || weapon.modifiers || [];
if (modifiers.length > 0) {
    modifierHtml = '<div style="margin-top:3px;font-size:11px;">';
    modifiers.forEach(mod => {
        const modColor = mod.color || '#FFD700';
        modifierHtml += `<div style="color:${modColor};">✨ ${mod.name}`;
        if (mod.minDamage) modifierHtml += ` (${mod.minDamage}-${mod.maxDamage})`;
        if (mod.statusEffect) modifierHtml += ` — ${mod.statusEffect}`;
        modifierHtml += `</div>`;
    });
    modifierHtml += '</div>';
}    

   /* // Build gem slot display - FIXED to show actual gems
    let gemSlotHtml = '';
    const slots = item.gemSlots || weapon.gemSlots || 0;
    if (slots > 0) {
        gemSlotHtml = '<div style="margin-top:5px;font-size:11px;">';
        for (let i = 0; i < slots; i++) {
            const gem = (item.gems || [])[i];
            if (gem) {
                // Show actual gem with color and stats
                gemSlotHtml += `<div style="display:flex;align-items:center;gap:5px;margin:2px 0;">
                    <span style="color:${gem.color};">⬤</span>
                    <span style="color:${gem.color};">${gem.emoji} ${gem.name}</span>
                    <span style="color:#888;font-size:10px;">${gem.description || ''}</span>
                </div>`;
            } else {
                // Show empty slot
                gemSlotHtml += `<div style="color:#444;margin:2px 0;">⬤ EMPTY SLOT ${i+1}</div>`;
            }
        }
        gemSlotHtml += '</div>';
    }
    */

    // Show value breakdown if gems are present
    let valueBreakdown = `<div>Sell Value: ${sellValue}g</div>`;
    if (gemCount > 0) {
        valueBreakdown = `
            <div>Sell Value: ${sellValue}g</div>
            <div style="font-size:11px;color:#888;">
                (Base: ${baseSellValue}g + Gems: ${gemValue}g)
            </div>
        `;
    }
    
    sellHtml += `
        <div class="item-card" style="${withinThreshold ? '' : 'opacity:0.4;'}">
            <div style="color: ${qualityColor};">⚔️ ${item.name} [${displayQuality}]</div>
            <div style="font-size:12px;">${buildWeaponDmgLine(weapon, null, p)}</div>
            <div style="color:#888; font-size:11px;">Level ${weapon.level}</div>
            ${modifierHtml}
            
                    ${buildGemSlotHtml({
            ...weapon,
            quality: displayQuality,
            gems: item.gems || []
        })}
            ${valueBreakdown}
            ${withinThreshold ? `<button onclick="confirmSellWeaponInstance(${index}, '${item.name}', ${sellValue})">SELL</button>` : '<div style="font-size:11px;color:#555;">Above threshold</div>'}
        </div>
    `;
});

// ARMOR INSTANCES (with full stats) - FIXED to show gems and increase value
armorInstances.forEach(({ item, index }) => {
    const armor = ARMOR[item.armorId] || ARMOR[item.instanceId];
    if (!armor) return;
    
    const displayQuality = item.quality || armor.quality;
    const qualityColor = QUALITY_CONFIG[displayQuality]?.color || '#00FF00';
    
    // BASE sell value (10% of armor cost)
    const baseSellValue = Math.floor((armor.cost || 100) * 0.1);
    
    // GEM value contribution
    const gemCount = item.gems?.length || 0;
    const gemValue = gemCount * 75; // 75g per gem
    
    // TOTAL sell value
    const sellValue = baseSellValue + gemValue;
    
    const qIdx = QUALITY_ORDER.indexOf(displayQuality);
    const withinThreshold = qIdx <= thresholdIdx;
    
    // Build defense line
    const qb = getQualityBonus(displayQuality, armor.baseDefense);
    const totalDef = armor.baseDefense + qb;
    const totalMag = (armor.baseMagicBonus || 0) + getQualityBonus(displayQuality, armor.baseMagicBonus || 0);
    
    /* // Build gem slot display
    let gemSlotHtml = '';
    const slots = item.gemSlots || armor.gemSlots || 0;
    if (slots > 0) {
        gemSlotHtml = '<div style="margin-top:5px;font-size:11px;">';
        for (let i = 0; i < slots; i++) {
            const gem = (item.gems || [])[i];
            if (gem) {
                gemSlotHtml += `<div style="display:flex;align-items:center;gap:5px;margin:2px 0;">
                    <span style="color:${gem.color};">⬤</span>
                    <span style="color:${gem.color};">${gem.emoji} ${gem.name}</span>
                    <span style="color:#888;font-size:10px;">${gem.description || ''}</span>
                </div>`;
            } else {
                gemSlotHtml += `<div style="color:#444;margin:2px 0;">⬤ EMPTY SLOT ${i+1}</div>`;
            }
        }
        gemSlotHtml += '</div>';
    }
    */

    // Show value breakdown if gems are present
    let valueBreakdown = `<div>Sell Value: ${sellValue}g</div>`;
    if (gemCount > 0) {
        valueBreakdown = `
            <div>Sell Value: ${sellValue}g</div>
            <div style="font-size:11px;color:#888;">
                (Base: ${baseSellValue}g + Gems: ${gemValue}g)
            </div>
        `;
    }
    
    sellHtml += `
        <div class="item-card" style="${withinThreshold ? '' : 'opacity:0.4;'}">
            <div style="color: ${qualityColor};">🛡️ ${armor.name} [${displayQuality}]</div>
            <div style="font-size:12px;">DEF: ${totalDef}${totalMag > 0 ? ` | MAG: +${totalMag}` : ''}</div>
            <div style="color:#888; font-size:11px;">Level ${armor.level || 1}</div>
            
            ${valueBreakdown}
            ${withinThreshold ? `<button onclick="confirmSellArmorInstance(${index}, '${armor.name}', ${sellValue})">SELL</button>` : '<div style="font-size:11px;color:#555;">Above threshold</div>'}
        </div>
    `;
});

    // STRING ARMOR (grouped, with stats)
    Object.entries(stringArmor).forEach(([key, data]) => {
        const armor = ARMOR[key];
        const qualityColor = QUALITY_CONFIG[armor.quality]?.color || '#00FF00';
        const sellValue = Math.floor((armor.cost || 100) * 0.1);
        const qIdx = QUALITY_ORDER.indexOf(armor.quality || 'normal');
        const withinThreshold = qIdx <= thresholdIdx;
        const totalValue = sellValue * data.count;
        
        // Build defense line
        const qb = getQualityBonus(armor.quality, armor.baseDefense);
        const totalDef = armor.baseDefense + qb;
        const totalMag = (armor.baseMagicBonus || 0) + getQualityBonus(armor.quality, armor.baseMagicBonus || 0);
        
        sellHtml += `
            <div class="item-card" style="${withinThreshold ? '' : 'opacity:0.4;'}">
                <div style="color: ${qualityColor};">🛡️ ${armor.name} ${data.count > 1 ? `x${data.count}` : ''}</div>
                <div style="font-size:12px;">DEF: ${totalDef}${totalMag > 0 ? ` | MAG: +${totalMag}` : ''}</div>
                <div style="color:#888; font-size:11px;">Level ${armor.level}</div>
                <div>Sell Value: ${sellValue}g each</div>
                <div>Total: ${totalValue}g</div>
                ${withinThreshold ? `<button onclick="confirmSellItemGroup('${key}', ${sellValue}, ${data.count}, 'armor')">SELL ALL</button>` : '<div style="font-size:11px;color:#555;">Above threshold</div>'}
            </div>
        `;
    });

    /// GEMS
gems.forEach(({ item, index }) => {
    const sellValue = 100;
    const gemColor = item.color || '#AAFFEE';
    
    // Build stats description
    let statsDesc = '';
    if (item.stats) {
        statsDesc = Object.entries(item.stats)
            .map(([stat, value]) => {
                const statNames = {
                    lightningDmg: '⚡ Lightning',
                    critBonus: '🎯 Crit',
                    weaponDmg: '⚔️ Damage',
                    lifesteal: '🩸 Lifesteal',
                    spellPower: '🔮 Spell',
                    hpBonus: '❤️ HP',
                    mpBonus: '💙 MP',
                    defenseBonus: '🛡️ Defense',
                    strBonus: '💪 STR',
                    conBonus: '🛡️ CON',
                    lckBonus: '🍀 LCK',
                    poisonChance: '💀 Poison',
                    fireDmg: '🔥 Fire',
                    frostDmg: '❄️ Frost',
                    hpRegen: '💚 HP Regen',
                    mpRegen: '✨ MP Regen'
                };
                return `${statNames[stat] || stat} +${value}`;
            })
            .join(' · ');
    }
    
    // If no stats object but has description, use that
    const displayDesc = statsDesc || item.description || 'Cut gem';
    
    sellHtml += `
        <div class="item-card">
            <div style="color: ${gemColor};">💎 ${item.name}</div>
            <div style="font-size:12px; color: #aaa; margin: 4px 0;">${displayDesc}</div>
            <div style="color: #FFD700; margin: 4px 0;">Sell Value: ${sellValue}g</div>
            <button onclick="confirmSellGem(${index}, '${item.name}', ${sellValue})" style="margin-top:4px;">SELL</button>
        </div>
    `;
});

    // ITEMS/POTIONS (grouped at the bottom)
Object.entries(items).forEach(([key, data]) => {
    const itemData = ITEMS[key];
    const sellValue = itemData.sellValue || 0;
    const totalValue = sellValue * data.count;
    
    // Choose icon based on item type
    let icon = '🧪'; // default potion icon
    if (key.startsWith('raw_')) {
        icon = '💎'; // raw gem
    } else if (key.includes('potion')) {
        icon = '🧪'; // potion
    } else if (key.includes('elixir')) {
        icon = '⚗️'; // elixir
    } else if (key.includes('seal_fragment')) {
        icon = '📜'; // quest item
    }
    
    sellHtml += `
        <div class="item-card">
            <div style="color: #00FF00;">${icon} ${itemData.name} ${data.count > 1 ? `x${data.count}` : ''}</div>
            <div style="font-size:12px;">${itemData.description || ''}</div>
            <div>Sell Value: ${sellValue}g each</div>
            <div>Total: ${totalValue}g</div>
            <button onclick="confirmSellItemGroup('${key}', ${sellValue}, ${data.count}, 'item')">SELL ALL</button>
        </div>
    `;
});

    sellHtml += `</div>`;
    document.getElementById('shopContent').innerHTML = sellHtml;
}



       function sellArmorInstance(index) {
    const p = gameState.player;
    const item = p.inventory[index];
    
    if (item && typeof item === 'object' && item.armorId) {
        const armor = ARMOR[item.armorId] || ARMOR[item.instanceId];
        const sellValue = Math.floor((armor.cost || 100) * 0.1);
        
        p.inventory.splice(index, 1);
        p.gold += sellValue;
        
        console.log(`Sold ${armor.name} for ${sellValue}g`);
        saveGame();
        showShopSell();
    }
}


function confirmSellItemGroup(key, value, count, type) {
    const p = gameState.player;
    const bonus = calcChaSellBonus(p.cha);
    const unitValue = Math.floor(value * (1 + bonus/100));
    const total = unitValue * count;
    
    let name = '';
    if (type === 'item') {
        name = ITEMS[key]?.name || key;
    } else if (type === 'weapon') {
        name = WEAPONS[key]?.name || key;
    } else if (type === 'armor') {
        name = ARMOR[key]?.name || key;
    }
    
    const message = count > 1 
        ? `Sell ${count}x ${name} for ${total}g?`
        : `Sell ${name} for ${value}g?`;
    
    if (confirm(message)) {
        sellItemGroup(key, value, count, type);
    }
}


function confirmSellGem(index, name, value) {
    if (confirm(`Sell ${name} for ${value}g?`)) {
        sellGem(index);
    }
}


// Helper function to sell weapon instances
function sellWeaponInstance(index) {
    const p = gameState.player;
    const item = p.inventory[index];
    
    if (item && typeof item === 'object' && item.weaponId) {
        const weapon = WEAPONS[item.weaponId];
        const sellValue = Math.floor((weapon.cost || 100) * 0.1);
        
        p.inventory.splice(index, 1);
        p.gold += sellValue;
        
        console.log(`Sold ${weapon.name} for ${sellValue}g`);
        saveGame();
        showShopSell();
    }
}

// Helper function to sell gems
function sellGem(index) {
    const p = gameState.player;
    const item = p.inventory[index];
    
    if (item && typeof item === 'object' && item.cut) {
        p.inventory.splice(index, 1);
        p.gold += 100;
        
        console.log(`Sold ${item.name} for 100g`);
        saveGame();
        showShopSell();
    }
}


        // Returns sell value for a weapon or armor (10% of cost)
function getSellValue(itemKey, type) {
    if (type === 'item') return ITEMS[itemKey]?.sellValue || 0;
    if (type === 'weapon') return Math.max(1, Math.floor((WEAPONS[itemKey]?.cost || 0) * 0.10));
    if (type === 'armor')  return Math.max(1, Math.floor((ARMOR[itemKey]?.cost  || 0) * 0.10));
    return 0;
}

// Get sell value for an instance object
function getInstanceSellValue(item) {
    const bonus = calcChaSellBonus(gameState.player.cha);
    let baseCost = 0;
    if (item.weaponId) {
        const base = WEAPONS[item.weaponId];
        baseCost = base?.cost || 100;
    } else if (item.armorId) {
        const base = ARMOR[item.armorId] || ARMOR[item.instanceId];
        baseCost = base?.cost || 100;
    }
    const gemValue = (item.gems?.length || 0) * 75;
    const baseValue = Math.max(1, Math.floor(baseCost * 0.10));
    return Math.floor((baseValue + gemValue) * (1 + bonus / 100));
}

function sellAllBelowThreshold() {
    const p = gameState.player;
    const QUALITY_ORDER = ['poor', 'normal', 'rare', 'epic', 'legendary', 'godly'];
    const thresholdEl = document.getElementById('sellQualityThreshold');
    const threshold = thresholdEl ? thresholdEl.value : 'poor';
    const thresholdIdx = QUALITY_ORDER.indexOf(threshold);
    const bonus = calcChaSellBonus(p.cha);

    const toRemove = [];

    p.inventory.forEach((item, index) => {
        // Skip if string is a potion
        if (typeof item === 'string' && ITEMS[item] && ITEMS[item].subtype === 'heal_hp') return;
        if (typeof item === 'string' && ITEMS[item] && ITEMS[item].subtype === 'heal_mp') return;
        if (typeof item === 'string' && ITEMS[item] && ITEMS[item].subtype === 'full_restore') return;
        if (typeof item === 'string' && ITEMS[item] && ITEMS[item].subtype?.startsWith('buff_')) return;
        
        // Skip gems (cut or uncut)
        if (typeof item === 'object' && item !== null && item.cut) return; // cut gem
        if (typeof item === 'string' && item.startsWith('raw_')) return; // uncut gem
        
        // Skip equipped weapon
        if (typeof item === 'object' && item !== null && item.weaponId && item.instanceId === p.weapon) return;
        if (typeof item === 'string' && item === p.weapon) return;
        
        // Skip equipped armor
        if (typeof item === 'object' && item !== null && item.armorId && item.instanceId === p.armor) return;
        if (typeof item === 'string' && item === p.armor) return;
        
        // For items with quality (weapons/armor), check threshold
        let itemQuality = null;
        let qIdx = -1;
        
        if (typeof item === 'object' && item !== null) {
            itemQuality = item.quality || 'normal';
            qIdx = QUALITY_ORDER.indexOf(itemQuality);
        } else if (typeof item === 'string' && WEAPONS[item]) {
            itemQuality = WEAPONS[item].quality || 'normal';
            qIdx = QUALITY_ORDER.indexOf(itemQuality);
        } else if (typeof item === 'string' && ARMOR[item]) {
            itemQuality = ARMOR[item].quality || 'normal';
            qIdx = QUALITY_ORDER.indexOf(itemQuality);
        }
        
        // If it has a quality and is above threshold, skip it
        if (qIdx !== -1 && qIdx > thresholdIdx) return;
        
        // Calculate sell value
        let value = 0;
        if (typeof item === 'object' && item !== null && (item.weaponId || item.armorId)) {
            value = getInstanceSellValue ? getInstanceSellValue(item) : 100;
        } else if (typeof item === 'string' && ITEMS[item]) {
            value = ITEMS[item].sellValue || 0;
        } else if (typeof item === 'string' && WEAPONS[item]) {
            value = getSellValue(item, 'weapon');
        } else if (typeof item === 'string' && ARMOR[item]) {
            value = getSellValue(item, 'armor');
        }
        
        if (value > 0) {
            let name = '';
            if (typeof item === 'object' && item !== null) name = item.name;
            else if (typeof item === 'string' && ITEMS[item]) name = ITEMS[item].name;
            else if (typeof item === 'string' && WEAPONS[item]) name = WEAPONS[item].name;
            else if (typeof item === 'string' && ARMOR[item]) name = ARMOR[item].name;
            else name = item;
            
            toRemove.push({ item, index, name, value: value });
        }
    });

    if (toRemove.length === 0) {
        alert(`No items below ${threshold} quality to sell.`);
        return;
    }

    // Build display lines
    const lines = toRemove.map(r => ({
        name: r.name,
        count: 1,
        each: Math.floor(r.value * (1 + bonus / 100)),
        total: Math.floor(r.value * (1 + bonus / 100))
    }));

    // Group identical items
    const grouped = {};
    lines.forEach(line => {
        const key = line.name;
        if (grouped[key]) {
            grouped[key].count++;
            grouped[key].total += line.total;
        } else {
            grouped[key] = { ...line, count: 1 };
        }
    });

    const groupedLines = Object.values(grouped);
    const totalGold = groupedLines.reduce((s, l) => s + l.total, 0);

    _showSellConfirm(groupedLines, totalGold, () => {
        const sortedByIndex = [...toRemove].sort((a, b) => b.index - a.index);
        let totalPaid = 0;
        sortedByIndex.forEach(r => {
            const val = Math.floor(r.value * (1 + bonus / 100));
            if (p.inventory[r.index] === r.item) {
                p.inventory.splice(r.index, 1);
                if (r.item && r.item.weaponId && r.item.instanceId) delete WEAPONS[r.item.instanceId];
                if (r.item && r.item.armorId && r.item.instanceId) delete ARMOR[r.item.instanceId];
                totalPaid += val;
            }
        });
        p.gold += totalPaid;
        const bonusText = bonus > 0 ? ` (+${bonus}% CHA)` : '';
        saveGame();
        
        if (typeof showShopSell === 'function') {
            showShopSell();
        }
        
        alert(`Sold ${toRemove.length} item${toRemove.length !== 1 ? 's' : ''} for ${totalPaid}g${bonusText}.`);
    });
}

function sellWeaponInstance(index) {
    const p = gameState.player;
    const item = p.inventory[index];
    if (!item || typeof item !== 'object' || !item.weaponId) return;
    const value = getInstanceSellValue(item);
    p.inventory.splice(index, 1);
    if (item.instanceId) delete WEAPONS[item.instanceId];
    p.gold += value;
    saveGame();
    showShopSell();
}

function sellArmorInstance(index) {
    const p = gameState.player;
    const item = p.inventory[index];
    if (!item || typeof item !== 'object' || !item.armorId) return;
    const value = getInstanceSellValue(item);
    p.inventory.splice(index, 1);
    if (item.instanceId) delete ARMOR[item.instanceId];
    p.gold += value;
    saveGame();
    showShopSell();
}

function confirmSellWeaponInstance(index, name, value) {
    if (confirm(`Sell ${name} for ${value}g?`)) {
        sellWeaponInstance(index);
    }
}

function confirmSellArmorInstance(index, name, value) {
    if (confirm(`Sell ${name} for ${value}g?`)) {
        sellArmorInstance(index);
    }
}

function sellGem(index) {
    const p = gameState.player;
    const item = p.inventory[index];
    if (!item || typeof item !== 'object' || !item.cut) return;
    p.inventory.splice(index, 1);
    p.gold += 100;
    saveGame();
    showShopSell();
}

function confirmSellGem(index, name, value) {
    if (confirm(`Sell ${name} for ${value}g?`)) {
        sellGem(index);
    }
}

function sellItemGroup(key, value, count, type) {
    const p = gameState.player;
    const bonus = calcChaSellBonus(p.cha);
    const unitValue = Math.floor(value * (1 + bonus/100));
    let name = '';
    if (type === 'item')   name = ITEMS[key]?.name  || key;
    if (type === 'weapon') name = WEAPONS[key]?.name || key;
    if (type === 'armor')  name = ARMOR[key]?.name   || key;

    let removed = 0;
    for (let i = p.inventory.length - 1; i >= 0 && removed < count; i--) {
        if (p.inventory[i] === key) {
            p.inventory.splice(i, 1);
            removed++;
        }
    }
    if (removed === 0) return;

    const totalValue = unitValue * removed;
    p.gold += totalValue;
    const bonusText = bonus > 0 ? ` (+${bonus}% CHA)` : '';

    saveGame();
    showShopSell();

    const content = document.getElementById('shopContent');
    if (content) {
        const msg = document.createElement('div');
        msg.style.cssText = 'background:#111;border:1px solid #4a9a4a;color:#4a9a4a;padding:6px 12px;font-size:15px;margin-bottom:10px;';
        msg.textContent = `Sold ${removed > 1 ? removed+'x ' : ''}${name} for ${totalValue}g${bonusText}.`;
        content.prepend(msg);
        setTimeout(() => msg.remove(), 2500);
    }
}

function confirmSellItemGroup(key, value, count, type) {
    const p = gameState.player;
    const bonus = calcChaSellBonus(p.cha);
    const unitValue = Math.floor(value * (1 + bonus/100));
    const total = unitValue * count;
    let name = '';
    if (type === 'item')   name = ITEMS[key]?.name  || key;
    if (type === 'weapon') name = WEAPONS[key]?.name || key;
    if (type === 'armor')  name = ARMOR[key]?.name   || key;
    const message = count > 1 ? `Sell ${count}x ${name} for ${total}g?` : `Sell ${name} for ${value}g?`;
    if (confirm(message)) {
        sellItemGroup(key, value, count, type);
    }
}

function showSellQuantityPrompt(itemKey, unitPrice, totalCount) {
    sellItem(itemKey, unitPrice, totalCount);
}

function sellItem(itemKey, baseValue, quantity = 1) {
    const p = gameState.player;
    const bonus     = calcChaSellBonus(p.cha);
    const unitValue = Math.floor(baseValue * (1 + bonus/100));
    const total     = unitValue * quantity;
    const name      = getItemName(itemKey);

    _showSellConfirm(
        [{ name, count: quantity, each: unitValue, total }],
        total,
        () => {
            let removed = 0;
            for (let i = p.inventory.length - 1; i >= 0 && removed < quantity; i--) {
                if (p.inventory[i] === itemKey) { p.inventory.splice(i, 1); removed++; }
            }
            if (removed === 0) return;
            const totalValue = unitValue * removed;
            p.gold += totalValue;
            saveGame();
            showShopSell();
            const content = document.getElementById('shopContent');
            if (content) {
                const msg = document.createElement('div');
                msg.style.cssText = 'background:#111;border:1px solid #4a9a4a;color:#4a9a4a;padding:6px 12px;font-size:15px;margin-bottom:10px;';
                msg.textContent = `Sold ${removed > 1 ? removed+'x ' : ''}${name} for ${totalValue}g.`;
                content.prepend(msg);
                setTimeout(() => msg.remove(), 2500);
            }
        }
    );
}

function _showSellConfirm(lines, totalGold, onConfirm) {
    const modal = document.getElementById('shopConfirmModal');
    if (!modal) { onConfirm(); return; }

    const bonus = calcChaSellBonus(gameState.player.cha);
    const bonusText = bonus > 0 ? ` <span style="color:#aaa;font-size:14px;">(+${bonus}% CHA)</span>` : '';

    const rowsHtml = lines.map(l =>
        `<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid #1a1a1a;font-size:17px;">
            <span style="color:#ccc;">${l.count > 1 ? l.count+'x ' : ''}${l.name}</span>
            <span style="color:#ff8c00;">${l.total}g${l.count > 1 ? '<span style="color:#555;font-size:13px;"> ('+l.each+'ea)</span>' : ''}</span>
        </div>`
    ).join('');

    // Wrap the items in a scrollable container
    document.getElementById('scmItemName').innerHTML = `
        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 10px;">
            ${rowsHtml}
        </div>
    `;
    document.getElementById('scmItemCost').innerHTML =
        'Total: <span>' + totalGold + 'g</span>' + bonusText;

    const titleEl = modal.querySelector('.scm-title');
    if (titleEl) titleEl.innerHTML = '💰 CONFIRM SALE';
    const confirmBtn = modal.querySelector('.scm-btn-confirm');
    if (confirmBtn) confirmBtn.innerHTML = '✔ SELL IT';

    window._pendingSell = onConfirm;
    modal.classList.add('open');
}

function closeShopConfirm() {
    const modal = document.getElementById('shopConfirmModal');
    if (modal) {
        modal.classList.remove('open');
        const titleEl = modal.querySelector('.scm-title');
        if (titleEl) titleEl.innerHTML = '⚔️ CONFIRM PURCHASE';
        const confirmBtn = modal.querySelector('.scm-btn-confirm');
        if (confirmBtn) confirmBtn.innerHTML = '✔ BUY IT';
    }
    window._pendingPurchase = null;
    window._pendingSell     = null;
}

function _confirmPurchase() {
    if (window._pendingSell) {
        const fn = window._pendingSell;
        window._pendingSell = null;
        closeShopConfirm();
        fn();
        return;
    }
    const p = window._pendingPurchase;
    if (!p) return;
    closeShopConfirm();
    _executeBuy(p.type, p.key, p.cost, p.itemName, p.disc);
}

function buyItem(type, key, baseCost) {
    const p = gameState.player;
    const playerClass = p.baseClass || p.class;

    if (key === 'recall_potion' && p.inventory.includes('recall_potion')) {
        alert('You already carry a Recall Potion.\nYou can only hold one at a time.');
        return;
    }

    const _itemDef = ITEMS[key];
    if (_itemDef && _itemDef.maxStack) {
        const _held = p.inventory.filter(k => k === key).length;
        if (_held >= _itemDef.maxStack) {
            alert(`You are already carrying the maximum (${_itemDef.maxStack}) of ${_itemDef.name}.`);
            return;
        }
    }

    if (type === 'weapon') {
        const weapon = WEAPONS[key];
        if (!canUseWeapon(playerClass, weapon)) {
            alert(`Your class (${playerClass}) cannot use ${weapon.name}!`);
            return;
        }
        if (weapon.level > p.level) {
            alert(`You must be level ${weapon.level} to buy ${weapon.name}!`);
            return;
        }
    } else if (type === 'armor') {
        const armor = ARMOR[key];
        if (!canUseArmor(playerClass, armor)) {
            alert(`Your class (${playerClass}) cannot use ${armor.name}!`);
            return;
        }
        if (armor.level > p.level) {
            alert(`You must be level ${armor.level} to buy ${armor.name}!`);
            return;
        }
    }

    const disc = calcChaDiscount(p.cha);
    const cost = Math.max(1, Math.floor(baseCost * (1 - disc/100)));

    if (p.gold < cost) { alert('Not enough gold!'); return; }

    let itemName;
    if (type === 'weapon') itemName = WEAPONS[key].name;
    else if (type === 'armor') itemName = ARMOR[key].name;
    else if (type === 'item') itemName = ITEMS[key] ? ITEMS[key].name : key;

    window._pendingPurchase = { type, key, cost, itemName, disc };

    const modal  = document.getElementById('shopConfirmModal');
    const nameEl = document.getElementById('scmItemName');
    const costEl = document.getElementById('scmItemCost');
    if (!modal) { _executeBuy(type, key, cost, itemName, disc); return; }

    nameEl.textContent = itemName;
    costEl.innerHTML = 'Cost: <span>' + cost.toLocaleString() + 'g</span>'
        + (disc > 0 ? ' <span style="color:#88ff88;font-size:13px;">(' + disc + '% discount)</span>' : '')
        + '<br><span style="font-size:13px;color:#888;">You have: ' + p.gold.toLocaleString() + 'g</span>';

    modal.classList.add('open');
    localSave();
}

function _executeBuy(type, key, cost, itemName, disc) {
    const p = gameState.player;
    p.gold -= cost;
    haptic('buy');
    
    if (type === 'weapon') {
        const baseWeapon = WEAPONS[key];
        if (!baseWeapon) {
            console.error(`Weapon ${key} not found!`);
            return;
        }
        
        // Create a NEW instance of this weapon (copy all properties)
        const instanceId = `${key}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        
        // Create the weapon object exactly like a drop would
        const weaponInstance = {
            id: key,
            weaponId: key,
            instanceId: instanceId,
            name: baseWeapon.name,
            baseName: baseWeapon.name,
            type: baseWeapon.type || baseWeapon.weaponSubtype,
            weaponSubtype: baseWeapon.weaponSubtype || baseWeapon.type,
            baseDamage: baseWeapon.baseDamage,
            maxDamage: baseWeapon.maxDamage || baseWeapon.baseDamage,
            baseMagicDamage: baseWeapon.baseMagicDamage || 0,
            maxMagicDamage: baseWeapon.maxMagicDamage || baseWeapon.baseMagicDamage || 0,
            healingBonus: baseWeapon.healingBonus || 0,
            level: baseWeapon.level || p.level,
            quality: baseWeapon.quality || 'normal',
            qualityBonus: 0,
            modifiers: baseWeapon.modifiers ? [...baseWeapon.modifiers] : [],
            gemSlots: baseWeapon.gemSlots || 0,
            gems: [],
            cost: baseWeapon.cost,
            description: baseWeapon.description,
            allowedClasses: baseWeapon.allowedClasses,
            isDropped: false,  // Shop purchase, not dropped
            isEquipped: false,
            dropTimestamp: Date.now(),
            ownerId: p.id
        };
        
        // Store in WEAPONS registry
        WEAPONS[instanceId] = weaponInstance;
        
        // Add to inventory
        p.inventory.push(weaponInstance);
        
        console.log(`✅ Purchased weapon: ${weaponInstance.name} [${weaponInstance.instanceId}]`);
        
    } else if (type === 'armor') {
        const baseArmor = ARMOR[key];
        if (!baseArmor) {
            console.error(`Armor ${key} not found!`);
            return;
        }
        
        // Create a NEW instance of this armor (copy all properties)
        const instanceId = `${key}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        
        // Create the armor object exactly like a drop would
        const armorInstance = {
            id: key,
            armorId: key,
            instanceId: instanceId,
            name: baseArmor.name,
            baseName: baseArmor.name,
            type: baseArmor.type || baseArmor.armorSubtype,
            armorSubtype: baseArmor.armorSubtype || baseArmor.type,
            baseDefense: baseArmor.baseDefense,
            baseMagicBonus: baseArmor.baseMagicBonus || 0,
            bonusHp: baseArmor.bonusHp || 0,
            bonusMp: baseArmor.bonusMp || 0,
            level: baseArmor.level || p.level,
            quality: baseArmor.quality || 'normal',
            qualityBonus: 0,
            modifiers: baseArmor.modifiers ? [...baseArmor.modifiers] : [],
            gemSlots: baseArmor.gemSlots || 0,
            gems: [],
            cost: baseArmor.cost,
            description: baseArmor.description,
            allowedClasses: baseArmor.allowedClasses,
            isDropped: false,  // Shop purchase, not dropped
            isEquipped: false,
            dropTimestamp: Date.now(),
            ownerId: p.id
        };
        
        // Store in ARMOR registry
        ARMOR[instanceId] = armorInstance;
        
        // Add to inventory
        p.inventory.push(armorInstance);
        
        console.log(`✅ Purchased armor: ${armorInstance.name} [${armorInstance.instanceId}]`);
        
    } else {
        // Items (potions, etc.) stay as strings
        p.inventory.push(key);
    }
    
    saveGame();
    if (typeof updateHud === 'function') updateHud();
    renderShop('buy', 'weapons', 'all', 'near');
}

function showInventory() {
    checkGameVersion();
    const p = gameState.player;
    const playerClass = p.baseClass || p.class;
    const screen = document.getElementById('mainScreen');
    
    let invHtml = `
        <div class="location-header">INVENTORY</div>
        <button onclick="showTown()" style="margin-bottom:10px;">BACK</button>
        ${renderPlayerStats()}
        <div style="margin: 20px 0;">
            <h3 style="color: var(--highlight-color);">WEAPONS</h3>
            <div class="inventory-grid">
    `;

    // ── Currently equipped weapon slot ────────────────────────────
    const eqWeapon = (() => {
        if (!p.weapon || p.weapon === 'bare_fists') return null;
        
        if (typeof p.weapon === 'string' && p.weapon.includes('_')) {
            const instance = p.inventory.find(item => 
                item && typeof item === 'object' && item.instanceId === p.weapon
            );
            if (instance && instance.weaponId) {
                return WEAPONS[instance.weaponId];
            }
        }
        return WEAPONS[p.weapon];
    })();
    
    const eqWIsUnarmed = !eqWeapon || !!eqWeapon.unarmed;
    if (eqWIsUnarmed) {
        invHtml += `
            <div class="item-card equipped" style="border-color:#555;">
                <div style="color:#888;">✊ Bare Fists</div>
                <div style="color:#555;font-size:13px;">DMG: 0 (stats only)</div>
                <div style="color:#555;font-size:12px;">No weapon equipped</div>
            </div>
        `;
    } else {
        const equippedInstance = p.inventory.find(item => 
            item && typeof item === 'object' && item.instanceId === p.weapon
        );
        
        const displayQuality = equippedInstance?.quality || eqWeapon.quality;
        const qc = QUALITY_CONFIG[displayQuality];
        const qualityColor = qc?.color || '#0f0';
        
        let eqModifierHtml = '';
        const modifiers = equippedInstance?.modifiers || eqWeapon.modifiers || [];
        if (modifiers.length > 0) {
            eqModifierHtml = '<div style="margin-top:5px;font-size:12px;">';
            modifiers.forEach(mod => {
                const modColor = mod.color || '#FFD700';
                eqModifierHtml += `<div style="color:${modColor};">✨ ${mod.name}`;
                if (mod.minDamage) eqModifierHtml += ` (${mod.minDamage}-${mod.maxDamage})`;
                if (mod.statusEffect) eqModifierHtml += ` — ${mod.statusEffect}`;
                eqModifierHtml += `</div>`;
            });
            eqModifierHtml += '</div>';
        }
        
        invHtml += `
            <div class="item-card equipped">
                <div style="color:${qualityColor};">⚔️ ${equippedInstance?.name || eqWeapon.name}${displayQuality !== eqWeapon.quality ? ` [${displayQuality}]` : ''}</div>
                <div style="font-size:12px;">${buildWeaponDmgLine({...eqWeapon, quality: displayQuality}, displayQuality, p)}</div>
                <div style="color:#888; font-size:11px; margin-top:2px;">Level ${eqWeapon.level || 1}</div>
                ${eqModifierHtml}
                ${buildGemSlotHtml({
                     ...eqWeapon,
                     quality: displayQuality,
                     gems: WEAPONS[p.weapon]?.gems || []
                 })}
                <div style="color:var(--border-color);">EQUIPPED</div>
                <button onclick="unequipItem('weapon')" style="border-color:#ff4444;color:#ff4444;margin-top:4px;">UNEQUIP</button>
            </div>
        `;
    }

    // ── Other weapons in inventory ────────────────────────────────
    const weaponItems = [];
    
    p.inventory.forEach((item, index) => {
        if (typeof item === 'object' && item !== null && item.weaponId) {
            const weaponData = WEAPONS[item.instanceId];
            if (weaponData && !weaponData.unarmed) {
                weaponItems.push({
                    type: 'instance',
                    key: item.instanceId,
                    weapon: weaponData,
                    instanceData: item,
                    quality: item.quality || weaponData.quality
                });
            }
        }
        else if (typeof item === 'string' && WEAPONS[item] && !WEAPONS[item].unarmed) {
            const weaponData = WEAPONS[item];
            weaponItems.push({
                type: 'string',
                key: item,
                weapon: weaponData,
                instanceData: null,
                quality: weaponData.quality
            });
        }
    });

    if (p.weapon && p.weapon !== 'bare_fists') {
        const equippedWeaponData = WEAPONS[p.weapon];
        if (equippedWeaponData && !equippedWeaponData.unarmed) {
            const alreadyExists = weaponItems.some(item => item.key === p.weapon);
            if (!alreadyExists) {
                weaponItems.unshift({
                    type: 'equipped',
                    key: p.weapon,
                    weapon: equippedWeaponData,
                    instanceData: null,
                    quality: equippedWeaponData.quality,
                    isEquipped: true
                });
            }
        }
    }
    
    weaponItems.forEach(weaponItem => {
        if (weaponItem.key === p.weapon) return;
        
        const { weapon, instanceData, quality: itemQuality } = weaponItem;
        const displayQuality = instanceData?.quality || itemQuality || weapon.quality;
        const qc = QUALITY_CONFIG[displayQuality];
        const qualityColor = qc?.color || '#00FF00';
        const weaponKey = instanceData ? instanceData.instanceId : weaponItem.key;
        
        let modHtml = '';
        const modifiers = instanceData?.modifiers || weapon.modifiers || [];
        if (modifiers.length > 0) {
            modHtml = '<div style="margin-top:5px;font-size:12px;">';
            modifiers.forEach(mod => {
                const modColor = mod.color || '#FFD700';
                modHtml += `<div style="color:${modColor};">✨ ${mod.name}`;
                if (mod.minDamage) modHtml += ` (${mod.minDamage}-${mod.maxDamage})`;
                if (mod.statusEffect) modHtml += ` — ${mod.statusEffect}`;
                modHtml += `</div>`;
            });
            modHtml += '</div>';
        }
        
        const canEquip = canUseWeapon(playerClass, weapon);
        
        invHtml += `
            <div class="item-card${canEquip ? '' : ' unusable'}" style="${canEquip ? '' : 'opacity:0.5;border-color:#555;'}">
                <div style="color: ${qualityColor};">⚔️ ${instanceData?.name || weapon.name}${displayQuality !== weapon.quality ? ` [${displayQuality}]` : ''}</div>
                <div style="font-size:12px;">${buildWeaponDmgLine({...weapon, ...(instanceData ? WEAPONS[instanceData.instanceId] || {} : {}), quality: displayQuality}, displayQuality, p)}</div>
                <div style="color:#888; font-size:11px; margin-top:2px;">Level ${weapon.level || 1}</div>
                ${modHtml}
                ${buildGemSlotHtml({
                    ...weapon,
                    quality: displayQuality,
                    gems: instanceData?.gems || []
                })}
                ${canEquip 
                    ? `<button onclick="equipItem('weapon', '${weaponKey}')">EQUIP</button>`
                    : `<button disabled style="opacity:0.4;">CANNOT EQUIP</button>`
                }
            </div>
        `;
    });

    invHtml += `
            </div>
            <h3 style="color: var(--highlight-color); margin-top: 20px;">ARMOR</h3>
            <div class="inventory-grid">
    `;

    // ── Currently equipped armor slot ─────────────────────────────
    const eqArmor = (() => {
        if (!p.armor || p.armor === 'no_armor') return null;
        
        if (typeof p.armor === 'string' && p.armor.includes('_')) {
            const instance = p.inventory.find(item => 
                item && typeof item === 'object' && item.instanceId === p.armor
            );
            if (instance && instance.armorId) {
                return ARMOR[instance.armorId] || ARMOR[instance.instanceId];
            }
        }
        return ARMOR[p.armor];
    })();
    
    const eqAIsUnarmored = !eqArmor || !!eqArmor.unarmored;
    if (eqAIsUnarmored) {
        invHtml += `
            <div class="item-card equipped" style="border-color:#555;">
                <div style="color:#888;">🫥 No Armor</div>
                <div style="color:#555;font-size:13px;">DEF: 0</div>
                <div style="color:#555;font-size:12px;">No armor equipped</div>
            </div>
        `;
    } else {
        const equippedInstance = p.inventory.find(item => 
            item && typeof item === 'object' && item.instanceId === p.armor
        );
        
        const displayQuality = equippedInstance?.quality || eqArmor.quality;
        const aqc = QUALITY_CONFIG[displayQuality];
        const qualityColor = aqc?.color || '#0f0';
        
        const aqb = getQualityBonus(displayQuality, eqArmor.baseDefense);
        const tDef = eqArmor.baseDefense + aqb;
        const tMag = (eqArmor.baseMagicBonus || 0) + getQualityBonus(displayQuality, eqArmor.baseMagicBonus || 0);
        
                // Build HP/MP display for equipped armor (use equippedInstance, not eqArmor)
        let eqHpMpDisplay = '';
        if (equippedInstance) {
            if ((equippedInstance.bonusHp && equippedInstance.bonusHp > 0) || (equippedInstance.bonusMp && equippedInstance.bonusMp > 0)) {
                eqHpMpDisplay = '<div style="margin-top:3px;font-size:10px;color:#88ff88;">';
                if (equippedInstance.bonusHp && equippedInstance.bonusHp > 0) eqHpMpDisplay += `❤️ +${equippedInstance.bonusHp} HP `;
                if (equippedInstance.bonusMp && equippedInstance.bonusMp > 0) eqHpMpDisplay += `✨ +${equippedInstance.bonusMp} MP`;
                eqHpMpDisplay += '</div>';
            }
        }
        
        // Build modifiers display for equipped armor (use equippedInstance)
        let eqModifierDisplay = '';
        if (equippedInstance && equippedInstance.modifiers && equippedInstance.modifiers.length > 0) {
            eqModifierDisplay = '<div style="margin-top:5px;font-size:11px;">';
            equippedInstance.modifiers.forEach(mod => {
                const valueStr = mod.statType === 'percent' ? `${mod.value}%` : `+${mod.value}`;
                eqModifierDisplay += `<div style="color:${mod.color};">${mod.icon} ${mod.name}: ${valueStr}</div>`;
            });
            eqModifierDisplay += '</div>';
        }
        
        invHtml += `
            <div class="item-card equipped">
                <div style="color:${qualityColor};">🛡️ ${eqArmor.name}${displayQuality !== eqArmor.quality ? ` [${displayQuality}]` : ''}</div>
                <div style="font-size:12px;">${buildArmorDefLine({...eqArmor, quality: displayQuality}, p)}</div>
                <div style="color:#888; font-size:11px; margin-top:2px;">Level ${eqArmor.level || 1}</div>
                ${eqHpMpDisplay}
                ${eqModifierDisplay}
                <div style="color:var(--border-color);">EQUIPPED</div>
                <button onclick="unequipItem('armor')" style="border-color:#ff4444;color:#ff4444;margin-top:4px;">UNEQUIP</button>
            </div>
        `;
    }

    // ── Other armors in inventory ─────────────────────────────────
    const armorItems = [];
    
    p.inventory.forEach((item, index) => {
        if (typeof item === 'object' && item !== null && item.armorId) {
            const armorData = ARMOR[item.armorId] || ARMOR[item.instanceId];
            if (armorData && !armorData.unarmored) {
                armorItems.push({
                    type: 'instance',
                    key: item.instanceId,
                    armor: armorData,
                    instanceData: item,
                    quality: item.quality || armorData.quality
                });
            }
        }
        else if (typeof item === 'string' && ARMOR[item] && !ARMOR[item].unarmored) {
            const armorData = ARMOR[item];
            armorItems.push({
                type: 'string',
                key: item,
                armor: armorData,
                instanceData: null,
                quality: armorData.quality
            });
        }
    });
    
    armorItems.forEach(armorItem => {
        if (armorItem.key === p.armor) return;
        
        const { armor, instanceData, quality: itemQuality } = armorItem;
        const displayQuality = instanceData?.quality || itemQuality || armor.quality;
        const aqc = QUALITY_CONFIG[displayQuality];
        const qualityColor = aqc?.color || '#00FF00';
        const armorKey = instanceData ? instanceData.instanceId : armorItem.key;
        
        const aqb = getQualityBonus(displayQuality, armor.baseDefense);
        const tDef = armor.baseDefense + aqb;
        const tMag = (armor.baseMagicBonus || 0) + getQualityBonus(displayQuality, armor.baseMagicBonus || 0);
        
        const canEquip = canUseArmor(playerClass, armor);
        
                // Build HP/MP display for unequipped armor (use instanceData, not armor)
        let hpMpDisplay = '';
        if (instanceData) {
            if ((instanceData.bonusHp && instanceData.bonusHp > 0) || (instanceData.bonusMp && instanceData.bonusMp > 0)) {
                hpMpDisplay = '<div style="margin-top:3px;font-size:10px;color:#88ff88;">';
                if (instanceData.bonusHp && instanceData.bonusHp > 0) hpMpDisplay += `❤️ +${instanceData.bonusHp} HP `;
                if (instanceData.bonusMp && instanceData.bonusMp > 0) hpMpDisplay += `✨ +${instanceData.bonusMp} MP`;
                hpMpDisplay += '</div>';
            }
        }
        
        // Build modifiers display for unequipped armor (use instanceData)
        let modifierDisplay = '';
        if (instanceData && instanceData.modifiers && instanceData.modifiers.length > 0) {
            modifierDisplay = '<div style="margin-top:5px;font-size:11px;">';
            instanceData.modifiers.forEach(mod => {
                const valueStr = mod.statType === 'percent' ? `${mod.value}%` : `+${mod.value}`;
                modifierDisplay += `<div style="color:${mod.color};">${mod.icon} ${mod.name}: ${valueStr}</div>`;
            });
            modifierDisplay += '</div>';
        }
        
        invHtml += `
            <div class="item-card${canEquip ? '' : ' unusable'}" style="${canEquip ? '' : 'opacity:0.5;border-color:#555;'}">
                <div style="color: ${qualityColor};">🛡️ ${armor.name}${displayQuality !== armor.quality ? ` [${displayQuality}]` : ''}</div>
                <div style="font-size:12px;">DEF: ${tDef}${tMag > 0 ? ` | MAG: +${tMag}` : ''}</div>
                <div style="color:#888; font-size:11px; margin-top:2px;">Level ${armor.level || 1}</div>
                ${hpMpDisplay}
                ${modifierDisplay}
                ${canEquip
                    ? `<button onclick="equipItem('armor', '${armorKey}')">EQUIP</button>`
                    : `<button disabled style="opacity:0.4;">CANNOT EQUIP</button>`
                }
            </div>
        `;
    });

    invHtml += `
            </div>
            <h3 style="color: var(--highlight-color); margin-top: 20px;">SPELLS</h3>
            <div class="inventory-grid">
    `;

    if (p.knownSpells.length === 0) {
        invHtml += '<div class="message">No spells learned yet.</div>';
    } else {
        p.knownSpells.forEach(spellKey => {
            const spell = ensureSpellExists(spellKey) || SPELLS[spellKey];
            if (!spell) return;
            invHtml += `
                <div class="item-card">
                    <div style="color: var(--highlight-color);">${spell.name}</div>
                    <div>MP Cost: ${spell.mpCost}</div>
                    <div>${spell.minPower !== undefined ? `Power: ${spell.minPower}–${spell.maxPower}` : ''}</div>
                    <div>${spell.description}</div>
                </div>
            `;
        });
    }

    invHtml += `
            </div>
            <h3 style="color: var(--highlight-color); margin-top: 20px;">CONSUMABLES & ITEMS</h3>
            <div class="inventory-grid">
    `;

    const itemCounts = {};
    p.inventory.filter(item => {
        if (typeof item === 'string') {
            return ITEMS[item] && ITEMS[item].subtype !== 'dungeon_key';
        }
        return false;
    }).forEach(key => {
        itemCounts[key] = (itemCounts[key] || 0) + 1;
    });

    if (Object.keys(itemCounts).length === 0) {
        invHtml += '<div class="message">No items.</div>';
    } else {
        Object.keys(itemCounts).forEach(itemKey => {
            const item = ITEMS[itemKey];
            const count = itemCounts[itemKey];
            
            let icon = '🧪';
            if (itemKey.startsWith('raw_')) icon = '💎';
            else if (itemKey.includes('potion')) icon = '🧪';
            else if (itemKey.includes('elixir')) icon = '⚗️';
            else if (itemKey.includes('seal_fragment')) icon = '📜';
            
            const color = item.type === 'sellable' ? '#FFD700' : 
                         item.subtype === 'heal_hp' ? '#FF0000' :
                         item.subtype === 'heal_mp' ? '#0000FF' : '#00FF00';
            
            const isPotion = item.subtype === 'heal_hp' || 
                            item.subtype === 'heal_mp' || 
                            item.subtype === 'full_restore' ||
                            item.subtype?.startsWith('buff_');
            
            let canUse = true;
            let disabledReason = '';
            if (item.subtype === 'heal_hp' && p.hp >= p.maxHp) {
                canUse = false;
                disabledReason = '(Already at full HP)';
            } else if (item.subtype === 'heal_mp' && p.mp >= p.maxMp) {
                canUse = false;
                disabledReason = '(Already at full MP)';
            } else if (item.subtype === 'full_restore' && p.hp >= p.maxHp && p.mp >= p.maxMp) {
                canUse = false;
                disabledReason = '(Already fully restored)';
            }
            
            let valueDisplay = '';
            if (item.sellValue) {
                if (count > 1) {
                    valueDisplay = `<div style="color: var(--border-color);">${item.sellValue}g each | <span style="color:#FFD700;">Total: ${item.sellValue * count}g</span></div>`;
                } else {
                    valueDisplay = `<div style="color: var(--border-color);">Value: ${item.sellValue}g</div>`;
                }
            }
            
            let buttonHtml = '';
            if (isPotion) {
                buttonHtml = canUse ? 
                    `<button onclick="useInventoryPotion('${itemKey}')">USE</button>` :
                    `<div style="color:#666;font-size:12px;">${disabledReason}</div>`;
            }
            
            invHtml += `
                <div class="item-card">
                    <div style="color: ${color};">${icon} ${item.name} ${count > 1 ? `<span style="color:#FFD700;">x${count}</span>` : ''}</div>
                    <div style="font-size: 16px;">${item.description}</div>
                    ${valueDisplay}
                    ${buttonHtml}
                </div>
            `;
        });
    }

    invHtml += `
            </div>
        </div>
        ${renderKeyRing(p)}
        <button onclick="showTown()">BACK</button>
    `;

    setScreen(invHtml);
}


// ═══════════════════════════════════════════════════════════════
// UNIFIED INVENTORY SYSTEM - Works everywhere, returns correctly
// ═══════════════════════════════════════════════════════════════

// Store the callback for when inventory closes
let _inventoryReturnCallback = null;

function showUnifiedInventory(returnCallback = null) {
        // DETECT ORIGIN - where is this being called from?
    let origin = 'unknown';
    
    // Check DUNGEON FIRST (since it also has _currentExploreArea)
    if (gameState.dungeon) {
        origin = 'dungeon';
    } else if (gameState._currentExploreArea) {
        origin = 'explore';
    } else if (!document.body.classList.contains('terminal-mode')) {
        origin = 'town';
    }
    
    // Store origin globally for other functions to use
    window._currentInventoryOrigin = origin;
    
    // If we're in terminal mode, temporarily exit it to show inventory
    const wasTerminalMode = document.body.classList.contains('terminal-mode');
    window._wasInTerminalMode = wasTerminalMode;
    if (wasTerminalMode) {
        document.body.classList.remove('terminal-mode');
    }
    
    // Store the callback
    _inventoryReturnCallback = returnCallback;
    
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    const isInDungeonOrExplore = (origin === 'dungeon' || origin === 'explore');
    
    // Compact stats for dungeon/explore
    let statsHtml = '';
    if (isInDungeonOrExplore) {
        statsHtml = `
            <div class="inventory-stats">
                <span>⭐ Lv${p.level}</span>
                <span class="hp">❤️ ${p.hp}/${p.maxHp}</span>
                <span class="mp">💙 ${p.mp}/${p.maxMp}</span>
                <span>🛡️ ${Math.floor(p.defense || 0)}</span>
                <span>⚔️ ${Math.floor(p.attack || 0)}</span>
                <span class="gold">💰 ${p.gold.toLocaleString()}</span>
            </div>
        `;
    } else {
        statsHtml = renderPlayerStats();
    }
    
    // Check if class has spells (for spellbook button)
    const hasSpells = (p.knownSpells && p.knownSpells.length > 0) || 
                      (p.baseClass && ['mage', 'cleric', 'warlock', 'paladin', 'runesmith'].includes(p.baseClass));
    
    let invHtml = `
        <div class="inventory-header">🎒 INVENTORY</div>
        <div class="inventory-actions">
            <button class="inv-back-btn" onclick="closeUnifiedInventory()">← BACK</button>
            ${hasSpells ? `<button class="inv-spellbook-btn" onclick="closeUnifiedInventory(); openSpellbook();">📖 SPELLBOOK</button>` : '<div></div>'}
        </div>
        ${statsHtml}
    `;
    
    // ── POTIONS SECTION (compact, at the top) ──────────────────────────────
    const potionItems = [];
    let recallPotion = null;
    
    p.inventory.forEach(item => {
        if (item === 'recall_potion') {
            recallPotion = item;
        } else if (typeof item === 'string' && ITEMS[item] && 
            (ITEMS[item].subtype === 'heal_hp' || ITEMS[item].subtype === 'heal_mp' || ITEMS[item].subtype === 'full_restore')) {
            potionItems.push(item);
        }
    });
    
    invHtml += `<div class="inv-section">
        <div class="inv-section-title">🧪 POTIONS</div>
        <div class="potion-container">`;
    
    // Recall Potion (purple, prominent)
    if (recallPotion) {
        const recallItem = ITEMS['recall_potion'];
        invHtml += `
            <div class="potion-item recall">
                <span>🌀</span>
                <div>
                    <div class="potion-name">${recallItem.name}</div>
                    <div class="potion-desc">Returns to town</div>
                </div>
                <button class="potion-use" onclick="useRecallPotion()">USE</button>
            </div>
        `;
    }
    
    // Regular potions (compact)
    const potionCounts = {};
    potionItems.forEach(potion => { potionCounts[potion] = (potionCounts[potion] || 0) + 1; });
    
    Object.keys(potionCounts).forEach(potionKey => {
        const item = ITEMS[potionKey];
        const count = potionCounts[potionKey];
        const isHeal = item.subtype === 'heal_hp';
        const isMana = item.subtype === 'heal_mp';
        const isFull = item.subtype === 'full_restore';
        let potionClass = isHeal ? 'health' : isMana ? 'mana' : 'full';
        let icon = isHeal ? '❤️' : isMana ? '💙' : '✨';
        
        invHtml += `
            <div class="potion-item ${potionClass}">
                <span>${icon}</span>
                <div>
                    <div class="potion-name">${item.name} ${count > 1 ? `x${count}` : ''}</div>
                    <div class="potion-desc">${item.description.substring(0, 25)}</div>
                </div>
                <button class="potion-use" onclick="useInventoryPotion('${potionKey}'); showUnifiedInventory(_inventoryReturnCallback);">USE</button>
            </div>
        `;
    });
    
    if (potionItems.length === 0 && !recallPotion) {
        invHtml += `<div class="empty-message">No potions</div>`;
    }
    invHtml += `</div></div>`;
    
    // ── KEY RING (cool ASCII keys) ─────────────────────────────────────────
    invHtml += renderKeyRing(p);
    
    // ── EQUIPPED ITEMS (side by side) ──────────────────────────────────────
    invHtml += `<div class="inv-section">
        <div class="inv-section-title">⚔️ EQUIPPED</div>
        <div class="equipped-container">`;
    
    // Get equipped weapon
    const eqWeapon = (() => {
        if (!p.weapon || p.weapon === 'bare_fists') return null;
        if (typeof p.weapon === 'string' && p.weapon.includes('_')) {
            const instance = p.inventory.find(item => 
                item && typeof item === 'object' && item.instanceId === p.weapon
            );
            if (instance && instance.weaponId) return instance;
        }
        return WEAPONS[p.weapon];
    })();
    
    invHtml += `<div class="equipped-card weapon">`;
    if (!eqWeapon || !!eqWeapon.unarmed) {
        invHtml += `<div class="item-name">✊ Bare Fists</div>
                    <div class="item-stats">No weapon equipped</div>
                    <button class="inv-btn-small" disabled>UNEQUIP</button>`;
    } else {
        const equippedInstance = p.inventory.find(item => 
            item && typeof item === 'object' && item.instanceId === p.weapon
        );
        const displayQuality = equippedInstance?.quality || eqWeapon.quality;
        const qc = QUALITY_CONFIG[displayQuality];
        const qualityColor = qc?.color || '#0f0';
        const qualityName = qc?.name || displayQuality;
        
        invHtml += `<div class="item-name" style="color:${qualityColor};">⚔️ ${equippedInstance?.name || eqWeapon.name}</div>
                    <div class="item-stats">${eqWeapon.weaponSubtype || eqWeapon.type || 'Weapon'} | Lv${eqWeapon.level || 1}</div>
                    <div class="item-stats">${buildWeaponDmgLine({...eqWeapon, quality: displayQuality}, displayQuality, p)}</div>
                    <button class="inv-btn-small unequip" onclick="unequipItem('weapon'); showUnifiedInventory(_inventoryReturnCallback);">UNEQUIP</button>`;
    }
    invHtml += `</div>`;
    
    // Equipped armor
    const eqArmor = (() => {
        if (!p.armor || p.armor === 'no_armor') return null;
        if (typeof p.armor === 'string' && p.armor.includes('_')) {
            const instance = p.inventory.find(item => 
                item && typeof item === 'object' && item.instanceId === p.armor
            );
            if (instance && instance.armorId) return instance;
        }
        return ARMOR[p.armor];
    })();
    
    invHtml += `<div class="equipped-card armor">`;
    if (!eqArmor || !!eqArmor.unarmored) {
        invHtml += `<div class="item-name">🫥 No Armor</div>
                    <div class="item-stats">No armor equipped</div>
                    <button class="inv-btn-small" disabled>UNEQUIP</button>`;
    } else {
        const equippedInstance = p.inventory.find(item => 
            item && typeof item === 'object' && item.instanceId === p.armor
        );
        const displayQuality = equippedInstance?.quality || eqArmor.quality;
        const aqc = QUALITY_CONFIG[displayQuality];
        const qualityColor = aqc?.color || '#0f0';
        
        invHtml += `<div class="item-name" style="color:${qualityColor};">🛡️ ${eqArmor.name}</div>
                    <div class="item-stats">${eqArmor.armorSubtype || eqArmor.type || 'Armor'} | Lv${eqArmor.level || 1}</div>
                    <div class="item-stats">DEF: ${eqArmor.baseDefense + (aqc?.bonusPct ? Math.floor(eqArmor.baseDefense * aqc.bonusPct) : 0)}</div>
                    <button class="inv-btn-small unequip" onclick="unequipItem('armor'); showUnifiedInventory(_inventoryReturnCallback);">UNEQUIP</button>`;
    }
    invHtml += `</div></div></div>`;
    
    // ── WEAPONS LIST (compact grid) ────────────────────────────────────────
    invHtml += `<div class="inv-section">
        <div class="inv-section-title">⚔️ WEAPONS</div>
        <div class="items-grid">`;
    
    const weaponItems = [];
    p.inventory.forEach(item => {
        if (typeof item === 'object' && item !== null && item.weaponId && item.instanceId !== p.weapon) {
            const weaponData = WEAPONS[item.instanceId];
            if (weaponData && !weaponData.unarmed) {
                weaponItems.push({ item, weaponData });
            }
        }
    });
    
    weaponItems.forEach(({ item, weaponData }) => {
        const displayQuality = item.quality || weaponData.quality;
        const qc = QUALITY_CONFIG[displayQuality];
        const qualityClass = displayQuality || 'normal';
        const qualityColor = qc?.color || '#0f0';
        const canEquip = canUseWeapon(p.baseClass || p.class, weaponData);
        
        invHtml += `<div class="item-card ${qualityClass}" data-item-id="${item.instanceId}">
            <div class="item-name" style="color:${qualityColor};">⚔️ ${item.name}</div>
            <div class="item-stats">Lv${weaponData.level || 1} | ${buildWeaponDmgLine({...weaponData, quality: displayQuality}, displayQuality, p)}</div>
            ${canEquip ? `<button class="inv-btn-equip" onclick="equipItem('weapon', '${item.instanceId}'); showUnifiedInventory(_inventoryReturnCallback);">EQUIP</button>` : `<button class="inv-btn-equip disabled" disabled>CANNOT EQUIP</button>`}
        </div>`;
    });
    
    if (weaponItems.length === 0) {
        invHtml += `<div class="empty-message">No weapons in inventory</div>`;
    }
    invHtml += `</div></div>`;
    
    // ── ARMOR LIST (compact grid) ─────────────────────────────────────────
    invHtml += `<div class="inv-section">
        <div class="inv-section-title">🛡️ ARMOR</div>
        <div class="items-grid">`;
    
    const armorItems = [];
    p.inventory.forEach(item => {
        if (typeof item === 'object' && item !== null && item.armorId && item.instanceId !== p.armor) {
            const armorData = ARMOR[item.instanceId];
            if (armorData && !armorData.unarmored) {
                armorItems.push({ item, armorData });
            }
        }
    });
    
    armorItems.forEach(({ item, armorData }) => {
        const displayQuality = item.quality || armorData.quality;
        const qc = QUALITY_CONFIG[displayQuality];
        const qualityClass = displayQuality || 'normal';
        const qualityColor = qc?.color || '#0f0';
        const canEquip = canUseArmor(p.baseClass || p.class, armorData);
        
        invHtml += `<div class="item-card ${qualityClass}" data-item-id="${item.instanceId}">
            <div class="item-name" style="color:${qualityColor};">🛡️ ${item.name}</div>
            <div class="item-stats">Lv${armorData.level || 1} | DEF: ${armorData.baseDefense + (qc?.bonusPct ? Math.floor(armorData.baseDefense * qc.bonusPct) : 0)}</div>
            ${canEquip ? `<button class="inv-btn-equip" onclick="equipItem('armor', '${item.instanceId}'); showUnifiedInventory(_inventoryReturnCallback);">EQUIP</button>` : `<button class="inv-btn-equip disabled" disabled>CANNOT EQUIP</button>`}
        </div>`;
    });
    
    if (armorItems.length === 0) {
        invHtml += `<div class="empty-message">No armor in inventory</div>`;
    }
    invHtml += `</div></div>`;
    

    // ── OTHER ITEMS (junk for selling) ──────────────────────────────────────
    const otherItemsList = [];
    p.inventory.forEach(item => {
        if (typeof item === 'string' && ITEMS[item]) {
            const itemData = ITEMS[item];
            // Exclude keys, potions, weapons, armor
            if (!itemData.name?.toLowerCase().includes('key') &&
                itemData.subtype !== 'heal_hp' &&
                itemData.subtype !== 'heal_mp' &&
                itemData.subtype !== 'full_restore' &&
                itemData.subtype !== 'dungeon_key' &&
                !item.includes('_key') &&
                typeof item !== 'object') {
                otherItemsList.push(item);
            }
        }
        // Also check for object items that aren't weapons/armor
        if (typeof item === 'object' && item !== null && !item.weaponId && !item.armorId) {
            otherItemsList.push(item);
        }
    });
    
    if (otherItemsList.length > 0) {
        invHtml += `<div class="inv-section">
            <div class="inv-section-title">📦 OTHER ITEMS</div>
            <div class="other-items-grid">`;
        
        const otherCounts = {};
        otherItemsList.forEach(item => {
            const key = typeof item === 'string' ? item : (item.name || 'unknown');
            otherCounts[key] = (otherCounts[key] || 0) + 1;
        });
        
        Object.keys(otherCounts).forEach(itemKey => {
            const item = typeof itemKey === 'string' && ITEMS[itemKey] ? ITEMS[itemKey] : null;
            const count = otherCounts[itemKey];
            const itemName = item ? item.name : (typeof itemKey === 'string' ? itemKey : 'Unknown');
            const sellValue = item ? (item.sellValue || 0) : 0;
            
            invHtml += `<div class="other-item">
                <span class="other-icon">📦</span>
                <span class="other-name">${itemName}</span>
                ${count > 1 ? `<span class="other-count">x${count}</span>` : ''}
                <span class="other-sell">💰 ${sellValue}g</span>
            </div>`;
        });
        
        invHtml += `</div></div>`;
    }


    // ── I'M STUCK BUTTON (dungeon only) ───────────────────────────────────
    if (origin === 'dungeon') {
        invHtml += `
        <div class="inv-stuck-container">
            <button class="inv-btn-stuck" onclick="resetCurrentDungeonKeepProgress(); closeUnifiedInventory();">
                🔄 I'M STUCK — Reset Dungeon Enemies (Logout Required)
            </button>
        </div>`;
    }
    
    // ── CLOSE BUTTON ──────────────────────────────────────────────────────
    invHtml += `<button class="inv-close-btn" onclick="closeUnifiedInventory()">← BACK</button>`;
    
    setScreen(invHtml);
}

// Replace the old inventory overlay with unified inventory
window.showInventoryOverlay = function() {
    showUnifiedInventory(() => {
        if (gameState.dungeon) {
            renderDungeonActionBar();
        } else {
            renderActionBar();
        }
    });
};

// Also replace showDungeonInventory to be safe
window.showDungeonInventory = function() {
    showUnifiedInventory(() => {
        if (gameState.dungeon) {
            renderDungeonActionBar();
        } else {
            renderActionBar();
        }
    });
};


// Replace combat inventory with unified inventory
window.showCombatInventory = function() {
    console.log('🎒 showCombatInventory called - opening unified inventory');
    showUnifiedInventory(() => {
        if (gameState.dungeon) {
            renderDungeonActionBar();
        } else {
            renderActionBar();
        }
    });
};


function closeUnifiedInventory() {
    // Restore terminal mode if we were in it
    if (window._wasInTerminalMode) {
        document.body.classList.add('terminal-mode');
        window._wasInTerminalMode = false;
    }

    // SCROLL TERMINAL TO BOTTOM after returning
    setTimeout(() => {
        const terminal = document.getElementById('terminalWindow');
        if (terminal) {
            terminal.scrollTop = terminal.scrollHeight;
        }
    }, 50);

    if (_inventoryReturnCallback && typeof _inventoryReturnCallback === 'function') {
        _inventoryReturnCallback();
    } else {
        // Check if we were in explore mode
        if (gameState._currentExploreArea) {
            document.body.classList.add('terminal-mode');
            // Try to find the correct explore refresh function
            if (typeof refreshExploreUI === 'function') {
                refreshExploreUI();
            } else if (typeof renderExploreUI === 'function') {
                renderExploreUI();
            } else if (typeof showExploreArea === 'function') {
                showExploreArea(gameState._currentExploreArea);
            } else if (typeof loadExploreArea === 'function') {
                loadExploreArea(gameState._currentExploreArea);
            }
        } else {
            showTown();
        }
    }
    _inventoryReturnCallback = null;
}

// Fix: Preserve return callback when refreshing inventory after equip/unequip
const originalShowUnifiedInventory = showUnifiedInventory;
window.showUnifiedInventory = function(returnCallback = null) {
    // Store the callback globally
    window._inventoryReturnCallback = returnCallback;
    
    // Call original
    originalShowUnifiedInventory(returnCallback);
};

// Fix closeUnifiedInventory to properly restore dungeon AND explore state
const originalCloseUnifiedInventory = closeUnifiedInventory;
window.closeUnifiedInventory = function() {
    // Call original
    originalCloseUnifiedInventory();
    
    // Restore dungeon state if we were in a dungeon
    if (gameState.dungeon && !document.body.classList.contains('terminal-mode')) {
        document.body.classList.add('terminal-mode');
        if (typeof renderActionBar === 'function') {
            renderActionBar();
        }
    }
    
    // Restore explore state if we were exploring
    if (gameState._currentExploreArea && !document.body.classList.contains('terminal-mode')) {
        document.body.classList.add('terminal-mode');
        // Try to find the correct explore refresh function
        if (typeof refreshExploreUI === 'function') {
            refreshExploreUI();
        } else if (typeof renderExploreUI === 'function') {
            renderExploreUI();
        } else if (typeof showExploreArea === 'function') {
            showExploreArea(gameState._currentExploreArea);
        } else if (typeof loadExploreArea === 'function') {
            loadExploreArea(gameState._currentExploreArea);
        }
    }
};

function renderKeyRing(p) {
            // ── Key metadata: ASCII art + color for each key type ──
            const KEY_META = {
                bronze_key:   { color: '#cd7f32', glow: '#7a3a00', label: 'BRONZE',   ascii: '&lt;=-[O' },
                copper_key:   { color: '#b87333', glow: '#5a2800', label: 'COPPER',   ascii: '&lt;=-{O' },
                iron_key:     { color: '#8a8a8a', glow: '#333333', label: 'IRON',     ascii: '&lt;==|O' },
                brass_key:    { color: '#d4a017', glow: '#6b4c00', label: 'BRASS',    ascii: '&lt;=-&lt;O' },
                silver_key:   { color: '#c0c0c0', glow: '#555577', label: 'SILVER',   ascii: '&lt;==*O' },
                electrum_key: { color: '#88d4c0', glow: '#005544', label: 'ELECTRUM', ascii: '&lt;=~(O' },
                ruby_key:     { color: '#e0115f', glow: '#800030', label: 'RUBY',     ascii: '&lt;=-@O' },
                topaz_key:    { color: '#ffa500', glow: '#804000', label: 'TOPAZ',    ascii: '&lt;=-&Diamond;O' },
                diamond_key:  { color: '#b9f2ff', glow: '#005080', label: 'DIAMOND',  ascii: '&lt;==&lt;&gt;' },
                obsidian_key: { color: '#4a0080', glow: '#200040', label: 'OBSIDIAN', ascii: '&lt;==%O' },
                bone_key:     { color: '#e8dcc8', glow: '#5a4a2a', label: 'BONE',     ascii: '&lt;=-#O' },
            };

            // Collect dungeon keys from inventory (they persist permanently)
            const heldKeys = {};
            (p.inventory || []).forEach(itemKey => {
                if (ITEMS[itemKey] && ITEMS[itemKey].subtype === 'dungeon_key') {
                    heldKeys[itemKey] = (heldKeys[itemKey] || 0) + 1;
                }
            });

            const hasAnyKey = Object.keys(heldKeys).length > 0;

            let html = `
                <div style="margin:20px 0;">
                    <h3 style="
                        color:var(--highlight-color);
                        border-bottom:1px solid var(--border-color);
                        padding-bottom:6px;
                        margin-bottom:12px;
                        letter-spacing:3px;
                    ">⚿ KEY RING</h3>`;

            if (!hasAnyKey) {
                html += `
                    <div style="
                        font-family:monospace;
                        color:#333;
                        font-size:14px;
                        padding:12px;
                        border:1px solid #1a1a1a;
                        text-align:center;
                        letter-spacing:2px;
                    ">[ NO KEYS COLLECTED ]</div>`;
            } else {
                html += `<div style="display:flex;flex-wrap:wrap;gap:10px;">`;

                Object.entries(heldKeys).forEach(([keyId, count]) => {
                    const meta  = KEY_META[keyId] || { color:'#aaa', glow:'#333', label: keyId.replace('_key','').toUpperCase(), ascii:'&lt;=-[O' };
                    const item  = ITEMS[keyId];
                    const desc  = item ? item.description : '';
                    const cnt   = count > 1 ? ` ×${count}` : '';

                    html += `
                        <div title="${desc}" style="
                            font-family:'VT323',monospace;
                            background:#050505;
                            border:1px solid ${meta.color};
                            box-shadow:0 0 8px ${meta.glow},inset 0 0 6px #000;
                            padding:8px 14px;
                            display:inline-flex;
                            flex-direction:column;
                            align-items:center;
                            gap:4px;
                            min-width:90px;
                            cursor:default;
                            position:relative;
                        ">
                            <div style="
                                font-size:22px;
                                letter-spacing:-2px;
                                color:${meta.color};
                                text-shadow:0 0 10px ${meta.color},0 0 4px ${meta.glow};
                                line-height:1;
                            ">${meta.ascii}</div>
                            <div style="
                                font-size:13px;
                                color:${meta.color};
                                letter-spacing:2px;
                                text-shadow:0 0 6px ${meta.color};
                                line-height:1;
                            ">${meta.label}${cnt}</div>
                        </div>`;
                });

                html += `</div>`;
            }

            html += `</div>`;
            return html;
}

// Equip weapon or armor
function equipItem(type, key) {
    const p = gameState.player;
    const playerClass = p.baseClass || p.class;
    
    if (type === 'weapon') {
        const weapon = WEAPONS[key];
        if (!weapon) { 
            alert('Invalid weapon!'); 
            return; 
        }
        
        // Check if weapon is universal (no class restrictions)
        const isUniversal = weapon.weaponSubtype === 'universal' || 
                           weapon.type === 'universal' ||
                           weapon.allowedClasses === null ||
                           (weapon.allowedClasses && weapon.allowedClasses.length === 0);
        
        if (!isUniversal) {
            // Class weapon restrictions check...
            const CLASS_WEAPON_RESTRICTIONS = {
                warrior: { swords: true, axes: true, maces: true, hammers: true, staves: false, wands: false, bows: false, daggers: false, unarmed: true },
                paladin: { swords: true, axes: true, maces: true, hammers: true, staves: false, wands: false, bows: false, daggers: false, unarmed: true },
                cleric:  { swords: false, axes: false, maces: true, hammers: false, staves: true, wands: true, bows: false, daggers: false, unarmed: true },
                mage:    { swords: false, axes: false, maces: false, hammers: false, staves: true, wands: true, bows: false, daggers: false, unarmed: true },
                warlock: { swords: false, axes: false, maces: false, hammers: false, staves: true, wands: true, bows: false, daggers: false, unarmed: true },
                archer:  { swords: false, axes: false, maces: false, hammers: false, staves: false, wands: false, bows: true, daggers: false, unarmed: true },
                hunter:  { swords: false, axes: false, maces: false, hammers: false, staves: false, wands: false, bows: true, daggers: false, unarmed: true },
                rogue:   { swords: false, axes: false, maces: false, hammers: false, staves: false, wands: false, bows: false, daggers: true, unarmed: true }
            };

            const restrictions = CLASS_WEAPON_RESTRICTIONS[playerClass];
            if (restrictions) {
                let weaponType = weapon.weaponSubtype || weapon.type || '';
                weaponType = weaponType.toLowerCase();
                
                let canEquip = true;
                let restrictionMessage = '';
                
                if (weapon.unarmed) {
                    canEquip = restrictions.unarmed;
                    restrictionMessage = 'unarmed';
                }
                else if (weaponType.includes('sword')) {
                    canEquip = restrictions.swords;
                    restrictionMessage = 'swords';
                }
                else if (weaponType.includes('axe')) {
                    canEquip = restrictions.axes;
                    restrictionMessage = 'axes';
                }
                else if (weaponType.includes('mace')) {
                    canEquip = restrictions.maces;
                    restrictionMessage = 'maces';
                }
                else if (weaponType.includes('hammer') || weaponType.includes('maul')) {
                    canEquip = restrictions.hammers;
                    restrictionMessage = 'hammers';
                }
                else if (weaponType.includes('staff')) {
                    canEquip = restrictions.staves;
                    restrictionMessage = 'staves';
                }
                else if (weaponType.includes('wand')) {
                    canEquip = restrictions.wands;
                    restrictionMessage = 'wands';
                }
                else if (weaponType.includes('bow')) {
                    canEquip = restrictions.bows;
                    restrictionMessage = 'bows';
                }
                else if (weaponType.includes('dagger') || weaponType.includes('shiv') || weaponType.includes('knife')) {
                    canEquip = restrictions.daggers;
                    restrictionMessage = 'daggers';
                }
                
                if (!canEquip) {
                    const className = playerClass.charAt(0).toUpperCase() + playerClass.slice(1);
                    alert(`${className}s cannot equip ${restrictionMessage}!`);
                    return;
                }
            }
        }
        
        // Check classRestriction if present
        if (weapon.classRestriction && weapon.classRestriction !== playerClass && !isUniversal) {
            alert(`This weapon can only be used by ${weapon.classRestriction}s!`);
            return;
        }
        
        // Check allowedClasses if present
        if (weapon.allowedClasses && weapon.allowedClasses.length > 0 && !weapon.allowedClasses.includes(playerClass) && !isUniversal) {
            alert(`This weapon cannot be used by your class!`);
            return;
        }
        
        if (weapon.level && weapon.level > p.level) {
            alert(`You need to be level ${weapon.level} to equip this weapon! (You are level ${p.level})`);
            return;
        }
        
        // ⭐⭐⭐ CRITICAL FIX: Return current weapon to inventory BEFORE equipping new one
        if (p.weapon && p.weapon !== 'bare_fists') {
            const currentWeapon = WEAPONS[p.weapon];
            if (currentWeapon) {
                // Mark current weapon as not equipped
                currentWeapon.isEquipped = false;
                
                // Check if already in inventory to avoid duplicates
                const alreadyInInventory = p.inventory.some(i =>
                    i && typeof i === 'object' && i.instanceId === p.weapon
                );
                
                if (!alreadyInInventory) {
                    // Push the FULL weapon object back to inventory
                    p.inventory.push(currentWeapon);
                    console.log(`🔧 Returned ${currentWeapon.name} to inventory`);
                }
            }
        }
        
        // Remove new weapon from inventory (it will be equipped)
        p.inventory = p.inventory.filter(i => {
            if (!i || typeof i !== 'object') return true;
            return i.instanceId !== key && i.weaponId !== key;
        });
        
        // Set new weapon
        p.weapon = key;
        weapon.isEquipped = true;
        
        recalcGemStats(p);
        saveGame();
        updateHud();
        
        if (typeof termAppend === 'function') {
            termAppend(`✅ Equipped ${weapon.name}`, 'term-success');
        }
        
        // Refresh the current view
        if (typeof showUnifiedInventory === 'function') {
            showUnifiedInventory();
        } else if (typeof showInventory === 'function') {
            showInventory();
        }
    }
    else if (type === 'armor') {
        const armor = ARMOR[key];
        if (!armor) { alert('Invalid armor!'); return; }
        
        if (armor.level && armor.level > p.level) {
            alert(`You need to be level ${armor.level} to equip this armor! (You are level ${p.level})`);
            return;
        }
        
        // ⭐⭐⭐ CRITICAL FIX: Return current armor to inventory BEFORE equipping new one
        if (p.armor && p.armor !== 'no_armor') {
            const currentArmor = ARMOR[p.armor];
            if (currentArmor) {
                // Mark current armor as not equipped
                currentArmor.isEquipped = false;
                
                // Check if already in inventory to avoid duplicates
                const alreadyInInventory = p.inventory.some(i =>
                    i && typeof i === 'object' && i.instanceId === p.armor
                );
                
                if (!alreadyInInventory) {
                    // Push the FULL armor object back to inventory
                    p.inventory.push(currentArmor);
                    console.log(`🔧 Returned ${currentArmor.name} to inventory`);
                }
            }
        }
        
        // Remove new armor from inventory (it will be equipped)
        p.inventory = p.inventory.filter(i => {
            if (!i || typeof i !== 'object') return true;
            return i.instanceId !== key && i.armorId !== key;
        });
        
        p.armor = key;
        armor.isEquipped = true;
        
        recalcGemStats(p);
        saveGame();
        updateHud();
        
        if (typeof termAppend === 'function') {
            termAppend(`✅ Equipped ${armor.name}`, 'term-success');
        }
        
        // Refresh the current view
        if (typeof showUnifiedInventory === 'function') {
            showUnifiedInventory();
        } else if (typeof showInventory === 'function') {
            showInventory();
        }
    }
}


function unequipItem(type) {
    const p = gameState.player;
    
    if (type === 'weapon') {
        const currentWeapon = WEAPONS[p.weapon];
        if (currentWeapon && p.weapon !== 'bare_fists') {
            currentWeapon.isEquipped = false;
            
            // Only add back to inventory if not already there
            const alreadyInInventory = p.inventory.some(i =>
                i && typeof i === 'object' &&
                (i.instanceId === p.weapon || i.weaponId === p.weapon)
            );
            
            if (!alreadyInInventory) {
                // ⭐ FIX: Push the FULL weapon object, not a stripped-down version
                p.inventory.push(currentWeapon);
                console.log(`🔧 Unequipped and returned to inventory: ${currentWeapon.name}`);
            } else {
                console.log(`🔧 Unequipped: ${currentWeapon.name} (already in inventory)`);
            }
        }
        p.weapon = 'bare_fists';
        
    } else if (type === 'armor') {
        const currentArmor = ARMOR[p.armor];
        if (currentArmor && p.armor !== 'no_armor') {
            currentArmor.isEquipped = false;
            
            // Only add back to inventory if not already there
            const alreadyInInventory = p.inventory.some(i =>
                i && typeof i === 'object' &&
                (i.instanceId === p.armor || i.armorId === p.armor)
            );
            
            if (!alreadyInInventory) {
                // ⭐ FIX: Push the FULL armor object, not a stripped-down version
                p.inventory.push(currentArmor);
                console.log(`🔧 Unequipped and returned to inventory: ${currentArmor.name}`);
            } else {
                console.log(`🔧 Unequipped: ${currentArmor.name} (already in inventory)`);
            }
        }
        p.armor = 'no_armor';
    }
    
    recalcGemStats(p);
    saveGame();
    updateHud();
    
    // Refresh the current view
    if (typeof showInventory === 'function') {
        showInventory();
    } else if (typeof showUnifiedInventory === 'function') {
        showUnifiedInventory();
    } else if (typeof renderShop === 'function') {
        renderShop('sell', 'weapons', 'all', 'near');
    }
}


               // ═══════════════════════════════════════════════════════════════
        // USE POTION FROM INVENTORY
        // ═══════════════════════════════════════════════════════════════
        function useInventoryPotion(potionKey) {
    const potion = ITEMS[potionKey];
    const p = gameState.player;
    
    if (!potion) {
        alert('Invalid potion!');
        return;
    }

    // ── Recall Potion - redirect to dedicated function ──────────────────────────────
    if (potion.subtype === 'recall') {
        useRecallPotion();
        return;
    }
    
    let msg = '';
    let used = false;
    
    // Handle different potion types
    if (potion.subtype === 'heal_hp') {
        if (p.hp >= p.maxHp) {
            alert("You're already at full HP!");
            return;
        }
        const actual = Math.min(p.maxHp - p.hp, potion.power);
        p.hp = Math.min(p.maxHp, p.hp + potion.power);
        msg = `Used ${potion.name} – restored ${actual} HP!`;
        used = true;
    } 
    else if (potion.subtype === 'heal_mp') {
        if (p.mp >= p.maxMp) {
            alert("You're already at full MP!");
            return;
        }
        const actual = Math.min(p.maxMp - p.mp, potion.power);
        p.mp = Math.min(p.maxMp, p.mp + potion.power);
        msg = `Used ${potion.name} – restored ${actual} MP!`;
        used = true;
    } 
    else if (potion.subtype === 'full_restore') {
        if (p.hp >= p.maxHp && p.mp >= p.maxMp) {
            alert("You're already fully restored!");
            return;
        }
        const hpR = p.maxHp - p.hp;
        const mpR = p.maxMp - p.mp;
        p.hp = p.maxHp;
        p.mp = p.maxMp;
        msg = `Used ${potion.name} – fully restored ${hpR} HP & ${mpR} MP!`;
        used = true;
    }
    else if (potion.subtype?.startsWith('buff_')) {
        // Apply buff
        const buffType = potion.subtype;
        const duration = potion.duration || 300000; // 5 minutes default
        
        if (!p.activeBuffs) p.activeBuffs = {};
        
        // Check if buff is already active
        if (p.activeBuffs[buffType] && Date.now() < p.activeBuffs[buffType].endTime) {
            // Check if we can stack
            const currentStacks = p.activeBuffs[buffType].stacks || 1;
            if (currentStacks >= 3) {
                alert(`${potion.name} is already at maximum stacks (3x)!`);
                return;
            }
            // Stack the buff
            p.activeBuffs[buffType].stacks = currentStacks + 1;
            p.activeBuffs[buffType].power = potion.power * (currentStacks + 1);
            p.activeBuffs[buffType].endTime = Date.now() + duration;
            msg = `Used ${potion.name} – buff stacked! (${currentStacks + 1}x)`;
        } else {
            // New buff
            p.activeBuffs[buffType] = {
                power: potion.power,
                endTime: Date.now() + duration,
                stacks: 1
            };
            msg = `Used ${potion.name} – buff activated!`;
        }
        used = true;
    }
    
    if (used) {
        // Remove potion from inventory
        const idx = p.inventory.indexOf(potionKey);
        if (idx !== -1) {
            p.inventory.splice(idx, 1);
        }
        
        // Update HUD
        updateHud();
        
        // Save game
        saveGame();
        
        // Show message and refresh inventory
        if (gameState.dungeon || document.body.classList.contains('terminal-mode')) {
            termAppend(msg, 'term-info');
        } else {
            if (gameState.dungeon || gameState._currentExploreArea) {
                if (typeof termAppend === 'function') {
                    termAppend(msg, 'term-info');
                }
            } else {
                alert(msg);
            }
        }
        showInventory();
    
            }
        }

        // FIX: Override potion usage to stay in dungeon (prevents being kicked to town)
        const originalUseInventoryPotion = useInventoryPotion;
        window.useInventoryPotion = function(potionKey) {
            // Store current mode before using potion
            const wasInDungeon = !!gameState.dungeon;
            
            // Call original function
            originalUseInventoryPotion(potionKey);
            
            // After potion use, restore dungeon state
            if (wasInDungeon && !document.body.classList.contains('terminal-mode')) {
                document.body.classList.add('terminal-mode');
            }
            
            // Re-render dungeon UI
            if (wasInDungeon && typeof renderActionBar === 'function') {
                setTimeout(() => {
                    renderActionBar();
                }, 100);
            }
        };



function useRecallPotion() {
    // Check if in dungeon
    if (!gameState.dungeon) {
        alert('Recall Potions can only be used inside dungeons!');
        return;
    }
    
    // Check if in combat
    if (gameState.combatState && gameState.combatState.monsters && gameState.combatState.monsters.length > 0) {
        alert('⚠️ You cannot recall while in combat! Defeat or flee from your enemies first.');
        return;
    }
    
    // Confirmation dialog
    const confirmed = confirm(
        '🌀 USE RECALL POTION? 🌀\n\n' +
        'This will instantly return you to town.\n' +
        'Your dungeon progress will be saved.\n\n' +
        'Are you sure you want to leave?'
    );
    
    if (!confirmed) return;
    
    // Find and remove the recall potion from inventory
    const index = gameState.player.inventory.indexOf('recall_potion');
    if (index !== -1) {
        gameState.player.inventory.splice(index, 1);
    }
    
    // Save current state before leaving
    saveGame();
    
    // Show effect in terminal
    if (typeof termAppend === 'function') {
        termAppend(`<span style="color:#AA88FF;">🌀 The Recall Potion dissolves in your hand — a swirling portal opens beneath you...</span>`, 'term-highlight');
        termAppend(`<span style="color:#AA88FF;">You are swept away to safety!</span>`, 'term-loot');
    }
    
    // Return to town after a short delay
    setTimeout(() => {
        const destTown = gameState.currentTown || 'town1';
        
        // Clear dungeon and combat state
        gameState.dungeon = null;
        gameState.combatState = null;
        if (gameState.combatTimer) {
            clearInterval(gameState.combatTimer);
            gameState.combatTimer = null;
        }
        
        // Exit terminal mode and show town
        document.body.classList.remove('terminal-mode');
        gameState._terminalOpen = false;
        
        saveGame();
        showTown(destTown);
    }, 1800);
}


        function showExplore() {
    checkGameVersion();
    const screen = document.getElementById('mainScreen');
    const p = gameState.player;
    const tid = gameState.currentTown || 'town1';
    const townDef = (typeof TOWNS !== 'undefined' && TOWNS[tid]) ? TOWNS[tid] : null;

    // Determine which zone keys belong to this town
    const townZoneKeys = townDef ? (townDef.zones || []) : null;

    // ALL Town2 and Town3 zones — level-only unlock, no master required
    const town2Zones = (TOWNS.town2 && TOWNS.town2.zones) ? TOWNS.town2.zones : 
        ['haunted_graveyard', 'dark_swamp', 'cursed_ruins', 'cave', 'crypt',
         'demon_portal', 'corrupted_temple', 'celestial_spire'];
    const town3Zones = (TOWNS.town3 && TOWNS.town3.zones) ? TOWNS.town3.zones :
        ['plains', 'volcano'];
    const noMasterZones = [...town2Zones, ...town3Zones];

    // Auto-unlock zones
    Object.keys(LOCATIONS).forEach(key => {
        const loc = LOCATIONS[key];
        if (key === 'town') return;
        // Only auto-unlock zones that belong to this town
        if (townZoneKeys) {
            if (!townZoneKeys.includes(key)) return;
        } else if (loc.town) {
            if (loc.town !== tid) return;
        }
        
        // ALWAYS unlock forest (starter zone) regardless of level
        if (key === 'forest' && !p.unlockedAreas.includes(key)) {
            p.unlockedAreas.push(key);
        }
        
        // ALL zones unlock by level only
if (p.level >= (loc.requiredLevel || 1)) {
    if (!p.unlockedAreas.includes(key)) {
        p.unlockedAreas.push(key);
    }
} else {
    const idx = p.unlockedAreas.indexOf(key);
    if (idx !== -1) p.unlockedAreas.splice(idx, 1);
}
    });

    const townName = townDef ? townDef.name : 'World';
    let exploreHtml = `
        <div class="location-header">${townName} — EXPLORE</div>
        ${renderPlayerStats()}
        <div class="message">
            <p>Where would you like to explore?</p>
        </div>
        <div style="margin: 20px 0;">
    `;

    // Track which master keys have been rendered to prevent duplicates (Town1 only)
    const renderedMasterKeys = new Set();

    // Show zones that belong to this town
    Object.keys(LOCATIONS).forEach(key => {
        const loc = LOCATIONS[key];
        if (key === 'town') return;
        // Filter by town
        if (townZoneKeys) {
            if (!townZoneKeys.includes(key)) return;
        } else if (loc.town) {
            if (loc.town !== tid) return;
        }

        const levelInfo = loc.enemyLevelRange ?
            ` (Lv ${loc.enemyLevelRange[0]}-${loc.enemyLevelRange[1]})` : '';

        const isUnlocked = p.unlockedAreas.includes(key);
        const meetsLevelReq = p.level >= (loc.requiredLevel || 1);
        const isTown2or3Zone = noMasterZones.includes(key);

        // For town2/town3 zones: show if level met (they were just auto-unlocked above)
        // For town1 zones: hide if not unlocked and level not met
        if (!isUnlocked && !meetsLevelReq) return;

        if (isUnlocked || (isTown2or3Zone && meetsLevelReq)) {
            exploreHtml += `
                <div class="menu-option" onclick="exploreLocation('${key}')">
                    ► ${loc.name}${levelInfo} <span style="color: var(--border-color);">✓</span>
                </div>
            `;
            
            
        } else {
            // Locked zone — level requirement not met
            exploreHtml += `
                <div class="menu-option" style="opacity:0.4;cursor:default;">
                    🔒 ${loc.name}${levelInfo} — Requires Level ${loc.requiredLevel}
                </div>
            `;
        }
    });

    // Add announcement for level 7+ players in Town 1 (need to go to Ashen Harbor)
    if (tid === 'town1' && p.level >= 7) {
        exploreHtml += `
            <div style="margin-top: 20px; padding: 12px; border: 2px solid #AA88FF; background: rgba(170,136,255,0.1); border-radius: 8px; text-align: center;">
                <span style="color: #AA88FF; font-size: 16px;">🌀 PORTAL REQUIRED 🌀</span><br>
                <span style="color: #ccaaee; font-size: 13px;">To reach the next exploration areas, you must venture into the <strong>The Undermaze Dungeon</strong><br>
                and journey through to reach the town of <strong>Ashen Harbor</strong>.</span>
            </div>
        `;
    }

    // Add announcement for level 13+ players in Town 2 (need to go to Crossroads)
    if (tid === 'town2' && p.level >= 13) {
        exploreHtml += `
            <div style="margin-top: 20px; padding: 12px; border: 2px solid #FFAA44; background: rgba(255,170,68,0.1); border-radius: 8px; text-align: center;">
                <span style="color: #FFAA44; font-size: 16px;">🌀 JOURNEY AHEAD 🌀</span><br>
                <span style="color: #ffcc88; font-size: 13px;">To reach the next exploration areas, you must venture into the <strong>Ashen Depths Dungeon</strong><br>
                and journey through to reach the town of <strong>The Crossroads</strong>.</span>
            </div>
        `;
    }

    exploreHtml += `
        </div>
        <button onclick="showTown()">RETURN TO TOWN</button>
    `;

    setScreen(exploreHtml);
}

        function getMasterKeyForArea(areaKey) {
            // Find which master unlocks this area.
            // Each locked zone is unlocked by the master of the PREVIOUS zone.
            // The master key format is: {playerClass}_master_{sourceZone}
            const playerClass = gameState.player.baseClass || gameState.player.class;

            // Map: locked zone → zone whose master unlocks it
            // This must mirror the `unlocks` fields in CLASS_MASTERS exactly.
            const unlockedBy = {
                // Main chain: town1 → town2 → endgame
                riverside:          'forest',
                haunted_graveyard:  'riverside',
                dark_swamp:         'haunted_graveyard',
                cursed_ruins:       'dark_swamp',
                cave:               'cursed_ruins',
                crypt:              'cave',
                demon_portal:       'crypt',
                corrupted_temple:   'demon_portal',
                celestial_spire:    'corrupted_temple',
                // Town 3 parallel track
                volcano:            'plains'
            };

            const sourceArea = unlockedBy[areaKey];
            if (sourceArea) {
                return `${playerClass}_master_${sourceArea}`;
            }
            return null;
        }

        function challengeMaster(masterKey) {
            const master = CLASS_MASTERS[masterKey];
            if (!master) {
                alert('Master not found!');
                return;
            }
            
            const p = gameState.player;
            
            // Check if already defeated
            if (p.defeatedMasters.includes(masterKey)) {
                alert('You have already defeated this master!');
                return;
            }
            
            // Check level requirement
            if (p.level < master.requiredLevel) {
                alert(`You need to be level ${master.requiredLevel} to challenge this master!`);
                return;
            }
            
            // Show master challenge screen
            const screen = document.getElementById('mainScreen');
            setScreen(`
                <div class="location-header">⚔️ MASTER CHALLENGE ⚔️</div>
                ${renderPlayerStats()}
                <div class="message" style="border-color: var(--error-color); background: rgba(255, 0, 0, 0.1);">
                    <p style="color: var(--highlight-color); font-size: 24px;">${master.name}</p>
                    <p style="color: var(--text-color); margin: 10px 0;">${master.description}</p>
                    <p style="color: var(--border-color);">Level: ${master.level} | HP: ${master.baseHp} | Defense: ${master.baseDefense}</p>
                    <p style="color: var(--error-color); margin-top: 15px;">⚠️ THIS IS A BOSS FIGHT! ⚠️</p>
                    <p>Defeating this master will unlock: <span style="color: var(--highlight-color);">${LOCATIONS[master.unlocks].name}</span></p>
                </div>
                <div class="message" style="border-color: var(--highlight-color);">
                    <p style="color: var(--highlight-color);">GUARANTEED REWARDS:</p>
                    ${master.guaranteedDrops.map(item => `<p>• ${getItemName(item)}</p>`).join('')}
                    <p style="margin-top: 10px;">+ ${master.xp} XP and ${master.gold} Gold</p>
                </div>
                <div style="margin: 20px 0;">
                    <button onclick="startMasterBattle('${masterKey}')" style="background: var(--error-color); font-size: 22px;">⚔️ BEGIN BATTLE ⚔️</button>
                    <button onclick="showExplore()">RETREAT</button>
                </div>
            `);
        }



        // ═══════════════════════════════════════════════════════════════
        // HUD – write once, update in place
        // ═══════════════════════════════════════════════════════════════
        function initHud() {
            updateHud();
        }
        // ── Shared helper: returns HTML ✦ pip(s) for the player's runestones ──
        // font-size:'1em' inherits parent size so pip is always same size as name
        function getRunestonePip(player) {
            if (!player || !player.runestones || !player.runestones.length) return '';
            if (typeof RUNESTONES === 'undefined') return '';
            return player.runestones.map(rsId => {
                const rs = RUNESTONES[rsId];
                return rs
                    ? `<span title="${rs.name}" style="color:${rs.color};margin-left:8px;font-size:16px;vertical-align:middle;line-height:1;">✦</span>`
                    : '';
            }).join('');
        }

        function updateHud() {
    const p = gameState.player;

    // ── helper: set element text safely ──
    const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    // ── helper: set element width% safely ──
    const setBar = (id, pct) => {
        const el = document.getElementById(id);
        if (el) el.style.width = Math.max(0, Math.min(100, pct)) + '%';
    };

    if (!p) {
        set('hudName',   '— No Adventurer —');
        set('hudHpNums', '❤️ HP: —');
        set('hudMpNums', '✨ MP: —');
        set('hudXpNums', '⭐ XP: —');
        set('hudGold',   '💰 0 g');
        setBar('sbHpFill', 0);
        setBar('sbMpFill', 0);
        setBar('sbXpFill', 0);
        return;
    }

    // ── Desktop HUD strip (name + numbers, desktop only) ──
    const runestonePip = getRunestonePip(p);
    const hudNameEl = document.getElementById('hudName');
    if (hudNameEl) {
        hudNameEl.innerHTML = `${p.name} – Lv ${p.level} ${p.className}${runestonePip}`;
    }
    set('hudHpNums', `❤️ ${p.hp}/${p.maxHp}`);
    set('hudMpNums', `✨ ${p.mp}/${p.maxMp}`);
    set('hudXpNums', `⭐ ${p.xp}/${p.xpToNext}`);
    set('hudGold',   `💰 ${p.gold}g`);

    // ── Mobile HUD strip — single line: name/level | class | gold ──
    set('mhHp',   `${p.name}  Lv${p.level}`);
    set('mhMp',   `${p.className}`);
    set('mhGold', `💰 ${p.gold}g`);

    // ── Status bars (HP / MP / XP) ──
    const hpPct = p.maxHp  > 0 ? (p.hp  / p.maxHp)  * 100 : 0;
    const mpPct = p.maxMp  > 0 ? (p.mp  / p.maxMp)  * 100 : 0;
    // XP bar: progress within current level only (0% at level-up, 100% at next level)
    const hudCls = p.baseClass || p.class;
    const xpLevelStart = getXpForLevel(hudCls, p.level);
    const xpLevelEnd   = p.xpToNext;
    const xpInLevel    = Math.max(0, p.xp - xpLevelStart);
    const xpSpan       = Math.max(1, xpLevelEnd - xpLevelStart);
    const xpPct        = Math.min(100, (xpInLevel / xpSpan) * 100);
    setBar('sbHpFill', hpPct);
    setBar('sbMpFill', mpPct);
    setBar('sbXpFill', xpPct);

    // Update HP/MP labels
    const hpLabel = document.getElementById('sbHpLabel');
    if (hpLabel) hpLabel.textContent = `HP  ${p.hp} / ${p.maxHp}`;
    const mpLabel = document.getElementById('sbMpLabel');
    if (mpLabel) mpLabel.textContent = `MP  ${p.mp} / ${p.maxMp}`;
    const xpLabel = document.getElementById('sbXpLabel');
    if (xpLabel) {
        // Show accumulated XP / total needed — bar fills from level floor to xpToNext
        xpLabel.textContent = 'XP  ' + p.xp.toLocaleString() + ' / ' + p.xpToNext.toLocaleString();
    }

    // ── Low-HP: change HP bar colour and add heartbeat ──
    const hpFill = document.getElementById('sbHpFill');
    if (hpFill) {
        if (hpPct < 25) {
            hpFill.style.background = 'linear-gradient(90deg, #880000, #ff0000)';
            hpFill.style.animation  = 'hpLowPulse 0.8s ease-in-out infinite';
        } else {
            hpFill.style.background = 'linear-gradient(90deg, #cc0000, #ff3333)';
            hpFill.style.animation  = '';
        }
    }

    // ── Low-HP heartbeat border on terminal ──
    const tw = document.getElementById('terminalWindow');
    const _nowDanger = hpPct < 15;
    if (_nowDanger && !gameState._wasLowHp) haptic('lowHp');
    gameState._wasLowHp = _nowDanger;
    if (tw) tw.classList.toggle('danger-heartbeat', _nowDanger);
}




        // ═══════════════════════════════════════════════════════════════
        // TERMINAL VIEW helpers
        // ═══════════════════════════════════════════════════════════════
        
