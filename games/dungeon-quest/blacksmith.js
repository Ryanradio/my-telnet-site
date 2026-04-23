// ═══════════════════════════════════════════════════════════════
// BLACKSMITH, TEMPLE, RESPEC, SPELL SHOP, PET TRAINER
// Extracted from index.html
// Dependencies: gameState, termAppend, updateHud, saveGame (runtime globals)
// ═══════════════════════════════════════════════════════════════

function showCrossroadsForge() {
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    
    // Crossroads theme colors (golden/mystical)
    const theme = {
        primary: '#FFD700',
        secondary: '#c8a000',
        bg: '#1a1408',
        border: '#d4a840',
        accent: '#ffcc44',
        glow: '0 0 20px rgba(255,215,0,0.3)'
    };
    
    setScreen(`
        <div class="location-header" style="border-color: ${theme.border}; color: ${theme.primary}; text-shadow: 0 0 10px ${theme.primary};">✨ FORGE OF THE CROSSROADS ✨</div>
        
        <div style="
            background: ${theme.bg};
            border: 2px solid ${theme.border};
            border-radius: 8px;
            padding: 16px;
            margin: 10px 0;
            box-shadow: ${theme.glow};
            text-align: center;
        ">
            <div style="font-size: 14px; color: ${theme.primary}; letter-spacing: 3px; margin-bottom: 8px;">
                ⚔️ WHERE WORLDS COLLIDE ⚔️
            </div>
            <div style="font-size: 11px; color: #8a7a40; font-style: italic;">
                "The ley lines converge here — your weapons will never be the same."
            </div>
        </div>
        
        <div style="margin: 20px 0;">
            <div class="menu-option" onclick="showBlacksmith('cut', null, 'crossroads')" style="border-color: ${theme.border}; color: ${theme.primary};">
                ► 💎 CUT GEMS <span style="color:#888;font-size:12px;">(200g — Raw gems in bag)</span>
            </div>
            <div class="menu-option" onclick="showBlacksmith('socket', 'weapon', 'crossroads')" style="border-color: ${theme.border}; color: ${theme.primary};">
                ► ⚙️ SOCKET GEM <span style="color:#888;font-size:12px;">(100g — Cut gems available)</span>
            </div>
            <div class="menu-option" onclick="showBlacksmith('info', null, 'crossroads')" style="border-color: ${theme.border}; color: ${theme.primary};">
                ► 📖 HOW GEMS WORK
            </div>
            <div class="menu-option" onclick="showTown()" style="border-color: #4a3a1a; color: #8a7a40;">
                ← BACK TO CROSSROADS
            </div>
        </div>
        
        <div style="
            background: rgba(0,0,0,0.3);
            border: 1px solid ${theme.border};
            border-radius: 4px;
            padding: 10px;
            margin-top: 15px;
            font-size: 11px;
            color: #6a5a30;
            text-align: center;
        ">
            <span style="color: ${theme.primary};">✦ THE CROSSROADS FORGE ✦</span><br>
            Infused with elemental energy from the convergence of worlds.
        </div>
    `);
}



// ═══════════════════════════════════════════════════════════════
// BLACKSMITH — Cut gems (200g) and Socket gems (100g)
// ═══════════════════════════════════════════════════════════════
function showBlacksmith(subview, subview_target = 'weapon', returnTo = 'town') {
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    subview = subview || 'main';
    const _returnTo = returnTo;

    // ── Helper: find raw gems in inventory ──
    function getRawGems() {
        return (p.inventory || []).filter(k => typeof k === 'string' && k.startsWith('raw_'));
    }
    
    // ── Helper: find cut gems (objects) in inventory ──
    function getCutGems() {
        return (p.inventory || []).filter(k => typeof k === 'object' && k && k.cut);
    }


const anvil = `<div style="
    background: linear-gradient(135deg, #1a0a00 0%, #0d0500 100%);
    border: 3px double #ff7722;
    border-radius: 12px;
    padding: 16px 20px;
    margin: 10px 0;
    text-align: center;
    box-shadow: 0 0 20px rgba(255, 119, 34, 0.3);
">
    <div style="font-size: 28px; letter-spacing: 6px; color: #ff7722; text-shadow: 0 0 8px #ff7722;">
        ⚒️ 🔥 ⚔️
    </div>
    <div style="font-size: 14px; color: #ff9955; font-weight: bold; letter-spacing: 4px; margin-top: 8px;">
        V A L D R A K ' S   F O R G E
    </div>
    <div style="font-size: 11px; color: #aa6633; letter-spacing: 2px; margin: 8px 0;">
        ✦  M A S T E R   S M I T H  ✦
    </div>
    <div style="height: 1px; background: linear-gradient(90deg, transparent, #ff7722, transparent); margin: 12px 0;"></div>
    <div style="font-size: 11px; color: #886633; font-style: italic;">
        "Bring me your rough stones and I'll make them sing."
    </div>
</div>`;


  /*  const anvil = `<pre style="color:#cc5500;font-size:9.5px;line-height:1.18;text-align:center;font-family:'Courier New',monospace;">
            ___________________
      _____/                   \_____
     /    /   V A L D R A K ' S \    \
    /    /        F O R G E      \    \
   /    /___________________________\   \
   |   /  .  .  A N V I L  .  .  \   |
   |  /____________________________\  |
   | /  _________________________  \ |
   |/ /  ~~~~~~~ FIRE ~~~~~~~~~~  \ \|
   | |   🔥   🔥   🔥   🔥   🔥  | |
   |_|_________________________________|_|
     |        ⚒️  SMITH  ⚒️           |
     |___________________________________|
     
     </pre>`; */

        if (subview === 'main') {
        const rawCount = getRawGems().length;
        const cutCount = getCutGems().length;
        
        // Choose which forge to show based on returnTo
        if (returnTo === 'crossroads') {
            // Render Crossroads Forge style
            setScreen(`
                <div class="location-header" style="border-color: #d4a840; color: #FFD700; text-shadow: 0 0 10px #FFD700;">✨ FORGE OF THE CROSSROADS ✨</div>
                <div style="background: #1a1408; border: 2px solid #d4a840; border-radius: 8px; padding: 16px; margin: 10px 0; box-shadow: 0 0 20px rgba(255,215,0,0.3); text-align: center;">
                    <div style="font-size: 14px; color: #FFD700; letter-spacing: 3px;">⚔️ WHERE WORLDS COLLIDE ⚔️</div>
                    <div style="font-size: 11px; color: #8a7a40; font-style: italic;">"The ley lines converge here — your weapons will never be the same."</div>
                </div>
                <div style="margin: 20px 0;">
                    <div class="menu-option" onclick="showBlacksmith('cut', null, 'crossroads')" style="border-color: #d4a840; color: #FFD700;">► 💎 CUT GEMS <span style="color:#888;font-size:12px;">(${rawCount} raw gems)</span></div>
                    <div class="menu-option" onclick="showBlacksmith('socket', 'weapon', 'crossroads')" style="border-color: #d4a840; color: #FFD700;">► ⚙️ SOCKET GEM <span style="color:#888;font-size:12px;">(${cutCount} cut gems)</span></div>
                    <div class="menu-option" onclick="showBlacksmith('info', null, 'crossroads')" style="border-color: #d4a840; color: #FFD700;">► 📖 HOW GEMS WORK</div>
                    <div class="menu-option" onclick="showTown()" style="border-color: #4a3a1a; color: #8a7a40;">← BACK TO CROSSROADS</div>
                </div>
            `);
        } else {
            // Render Valdrak's Forge (original)
            setScreen(`
                <div class="location-header">⚒️ VALDRAK'S FORGE</div>
                ${anvil}
                <div class="message" style="color:#cc7733;font-style:italic;text-align:center;margin-bottom:12px;">
                    "Bring me your rough stones and I'll make them sing."<br>
                    <span style="font-size:11px;color:#664422;">— Valdrak, Master Smith</span>
                </div>
                <div style="margin:16px 0;">
                    <div class="menu-option" onclick="showBlacksmith('cut')" style="border-color:#FF7722;">► 💎 CUT GEMS <span style="color:#888;font-size:12px;">(200g each — ${rawCount} raw gem${rawCount!==1?'s':''} in bag)</span></div>
                    <div class="menu-option" onclick="showBlacksmith('socket')" style="border-color:#c8a000;">► ⚙️ SOCKET GEM INTO WEAPON <span style="color:#888;font-size:12px;">(100g — ${cutCount} cut gem${cutCount!==1?'s':''} available)</span></div>
                    <div class="menu-option" onclick="showBlacksmith('info')" style="border-color:#444;">► 📖 HOW GEMS WORK</div>
                    <div class="menu-option" onclick="showTown()">← BACK TO TOWN</div>
                </div>
            `);
        }
    }

    else if (subview === 'cut') {
        const rawGems = getRawGems();
        if (rawGems.length === 0) {
            setScreen(`
                <div class="location-header">⚒️ CUT GEMS</div>
                ${anvil}
                <div class="message" style="color:#888;text-align:center;padding:20px;">
                    You have no raw gems to cut.<br>
                    <span style="font-size:12px;color:#555;">Gems drop from any enemy (4% chance). Keep adventuring!</span>
                </div>
                <button onclick="showBlacksmith('main', null, '${returnTo}')" style="margin-top:8px; padding:8px 16px;">← BACK</button>`);
            return;
        }
        let gemListHtml = rawGems.map(gk => {
            const parts = gk.split('_');
            const typeKey = parts[1];
            const tier = parts[2] ? parseInt(parts[2].replace('t','')) : 1;
            const gem = GEM_TYPES[typeKey];
            const canAfford = p.gold >= 200;
            return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;margin:4px 0;border:1px solid ${gem?gem.color:'#444'};background:rgba(0,0,0,0.3);">
                <span style="color:${gem?gem.color:'#ccc'};">${gem?gem.emoji:'💎'} T${tier} Raw ${gem?gem.name:typeKey} <span style="color:#555;font-size:11px;">${gem?gem.desc:''}</span></span>
                <button onclick="doCutGem('${gk}')" ${canAfford?'':'disabled title="Not enough gold"'}
                    style="border-color:#FF7722;color:#FF7722;font-size:12px;padding:4px 10px;">CUT (200g)</button>
            </div>`;
        }).join('');
        setScreen(`
            <div class="location-header">⚒️ CUT GEMS — ${p.gold}g</div>
            ${anvil}
            <div class="message" style="color:#888;font-size:12px;text-align:center;">
                Cutting reveals a gem's permanent stats at random. Stats cannot be rerolled.
            </div>
            <div style="margin:10px 0;">${gemListHtml}</div>
            <button onclick="showBlacksmith('main', null, '${returnTo}')" style="margin-top:8px; padding:8px 16px;">← BACK</button>`);
    }

    else if (subview === 'socket') {
        const socketTarget = subview_target || 'weapon';
        
        // Get equipped weapon data
        let weaponData = null;
        let weaponInstance = null;
        let weaponDisplayQuality = 'normal';
        let weaponName = '';
        let weaponQualityColor = '#0f0';
        
        if (p.weapon && p.weapon !== 'bare_fists') {
            weaponInstance = p.inventory.find(item => 
                item && typeof item === 'object' && item.instanceId === p.weapon
            );
            if (weaponInstance && weaponInstance.weaponId) {
                weaponData = WEAPONS[p.weapon]; // use instanceId to get full instance
                weaponDisplayQuality = weaponInstance.quality || weaponData?.quality || 'normal';
            } else {
                weaponData = WEAPONS[p.weapon];
                weaponDisplayQuality = weaponData?.quality || 'normal';
            }
            if (weaponData) {
                weaponName = weaponData.name || 'Unknown Weapon';
                const qc = QUALITY_CONFIG[weaponDisplayQuality];
                weaponQualityColor = qc?.color || '#0f0';
            }
        }
        
        // Get equipped armor data
        let armorData = null;
        let armorInstance = null;
        let armorDisplayQuality = 'normal';
        let armorName = '';
        let armorQualityColor = '#0f0';
        
        if (p.armor && p.armor !== 'no_armor') {
            armorInstance = p.inventory.find(item => 
                item && typeof item === 'object' && item.instanceId === p.armor
            );
            if (armorInstance && armorInstance.armorId) {
                armorData = ARMOR[p.armor] || ARMOR[armorInstance.armorId];
                armorDisplayQuality = armorInstance.quality || armorData?.quality || 'normal';
            } else {
                armorData = ARMOR[p.armor];
                armorDisplayQuality = armorData?.quality || 'normal';
            }
            if (armorData) {
                armorName = armorData.name || 'Unknown Armor';
                const qc = QUALITY_CONFIG[armorDisplayQuality];
                armorQualityColor = qc?.color || '#0f0';
            }
        }
        
        const cutGems = getCutGems();

        function weaponSocketCard() {
            if (!weaponData) {
                return `<div style="color:#555;font-size:13px;padding:8px;border:1px solid #333;background:#0a0a0a;">
                    No weapon equipped.
                </div>`;
            }
            const slots = getGemSlots(weaponDisplayQuality);
            const usedSlots = (weaponData.gems || []).length;
            const active = socketTarget === 'weapon';
            let slotsHtml = '';
            if (slots === 0) {
                slotsHtml = `<span style="color:#555;font-size:11px;">No gem slots (need rare+ quality drop)</span>`;
            } else {
                for (let i = 0; i < slots; i++) {
                    const gem = (weaponData.gems || [])[i];
                    if (gem) {
                        slotsHtml += `<div style="margin:4px 0; padding:2px 0; border-bottom:1px solid #222;">
                            <span style="color:${gem.color};">⬤ ${gem.emoji} ${gem.name}</span><br>
                            <span style="color:#888;font-size:11px; margin-left:15px;">${gem.description}</span>
                        </div>`;
                    } else {
                        slotsHtml += `<div style="margin:4px 0; color:#666; padding:2px 0;">⬤ EMPTY SLOT ${i+1}</div>`;
                    }
                }
            }
            return `<div style="padding:10px 16px;border:2px solid ${active ? weaponQualityColor : '#333'};margin:6px 0;cursor:pointer;background:#0a0a0a;"
                        onclick="showBlacksmith('socket','weapon')">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <span style="color:${weaponQualityColor}; font-size:15px; font-weight:bold;">⚔️</span>
                            <span style="color:${weaponQualityColor};"> ${weaponName}</span>
                            <span style="color:#888; font-size:11px; margin-left:8px;">[${weaponDisplayQuality}]</span>
                        </div>
                        ${active ? '<span style="color:#c8a000; font-size:12px;">▼ SELECTED</span>' : ''}
                    </div>
                    <div style="font-size:12px; color:#aaa; margin-top:6px;">Slots: ${usedSlots}/${slots} used</div>
                    <div style="margin-top:8px; font-size:12px;">${slotsHtml}</div>
                </div>`;
        }

function armorSocketCard() {
    if (!armorData) {
        return `<div style="color:#555;font-size:13px;padding:8px;border:1px solid #333;background:#0a0a0a;">
            No armor equipped.
        </div>`;
    }
    const slots = getGemSlots(armorDisplayQuality);
    const usedSlots = (armorData.gems || []).length;
    let slotsHtml = '';
    if (slots === 0) {
        slotsHtml = `<span style="color:#555;font-size:11px;">No gem slots</span>`;
    } else {
        for (let i = 0; i < slots; i++) {
            const gem = (armorData.gems || [])[i];
            if (gem) {
                slotsHtml += `<div style="margin:4px 0; padding:2px 0; border-bottom:1px solid #222;">
                    <span style="color:${gem.color};">⬤ ${gem.emoji} ${gem.name}</span><br>
                    <span style="color:#888;font-size:11px; margin-left:15px;">${gem.description}</span>
                </div>`;
            } else {
                slotsHtml += `<div style="margin:4px 0; color:#333; padding:2px 0;">⬤ EMPTY SLOT ${i+1}</div>`;
            }
        }
    }
    return `<div style="padding:10px 16px;border:2px solid #1a1a1a;margin:6px 0;background:#0a0a0a;opacity:0.55;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <span style="color:#444; font-size:15px; font-weight:bold;">🛡️</span>
                <span style="color:#444;"> ${armorName}</span>
                <span style="color:#333; font-size:11px; margin-left:8px;">[${armorDisplayQuality}]</span>
            </div>
            <span style="color:#333;font-size:10px;font-family:'Courier New',monospace;">COMING SOON</span>
        </div>
        <div style="font-size:12px; color:#333; margin-top:6px;">Slots: ${usedSlots}/${slots} used</div>
        <div style="margin-top:8px; font-size:12px;">${slotsHtml}</div>
    </div>`;
}

        const activeItem = socketTarget === 'armor' ? armorData : weaponData;
        const activeQuality = socketTarget === 'armor' ? armorDisplayQuality : weaponDisplayQuality;
        const activeSlots = activeItem ? getGemSlots(activeQuality) : 0;
        const activeGems = activeItem ? (activeItem.gems || []) : [];
        const activeUsed = activeGems.length;
        const openSlots = activeSlots - activeUsed;

        if (cutGems.length === 0) {
            setScreen(`<div class="location-header">⚒️ SOCKET GEM</div>${anvil}
                <div class="message" style="color:#888;text-align:center;padding:20px;">
                    You have no cut gems to socket.<br>
                    <span style="font-size:12px;">Cut a raw gem first at the forge.</span>
                </div>
                <button onclick="showBlacksmith('main', null, '${returnTo}')">← BACK</button>`);
            return;
        }

        const gemButtons = (activeItem && openSlots > 0)
            ? cutGems.map((g, idx) => {
                const canAfford = p.gold >= 100;
                return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;margin:4px 0;border:1px solid ${g.color};background:rgba(0,0,0,0.3);">
                    <div style="flex:1;">
                        <span style="color:${g.color};">⬤ ${g.emoji} ${g.name}</span>
                        <div style="color:#888;font-size:11px;margin-top:2px;">${g.description}</div>
                    </div>
                    <button onclick="event.stopPropagation(); this.disabled=true; doSocketGem(${idx},'${socketTarget}')" ${canAfford?'':'disabled title="Need 100g"'}
                        style="border-color:#c8a000;color:#c8a000;font-size:12px;padding:6px 12px;min-width:80px;border-radius:4px;">SOCKET (100g)</button>
                </div>`;
            }).join('')
            : `<div style="color:#888;text-align:center;padding:15px;background:#0a0a0a;border:1px solid #333;">${
                activeItem
                    ? (activeSlots === 0
                        ? '✨ This item has no gem slots.'
                        : '⚠️ No open slots — gems are permanent once socketed.')
                    : '👆 Select a weapon or armor above to socket gems.'
              }</div>`;

        setScreen(`
            <div class="location-header">⚒️ SOCKET GEM — ${p.gold}g</div>
            ${anvil}
            <div style="color:#aaa;font-size:12px;margin:4px 0 2px;">Click on an item to select it for socketing:</div>
            ${weaponSocketCard()}

            <div style="margin-top:15px;color:#aaa;font-size:12px;text-align:center;">⚠️ Socketed gems are permanent and cannot be removed.</div>
            <div style="margin:10px 0; max-height:300px; overflow-y:auto;">${gemButtons}</div>
            <button onclick="showBlacksmith('main', null, '${returnTo}')" style="margin-top:8px; padding:8px 16px;">← BACK</button>`);
    }

    else if (subview === 'info') {
        setScreen(`
            <div class="location-header">⚒️ HOW GEMS WORK</div>
            ${anvil}
            <div class="message" style="font-size:13px;line-height:1.6;">
                <p><strong style="color:#FF7722;">Finding Gems</strong><br>
                Raw gems have a <strong>4% drop chance</strong> from any enemy. Enemy level determines gem tier:<br>
                Lv1-6 = Tier 1 &nbsp;|&nbsp; Lv7-12 = Tier 2 &nbsp;|&nbsp; Lv13-18 = Tier 3 &nbsp;|&nbsp; Lv19+ = Tier 4</p>
                <p><strong style="color:#c8a000;">Cutting (200g)</strong><br>
                Cutting a raw gem gives it permanent random stats. Higher tier gems roll stronger bonuses. Stats cannot be rerolled — choose wisely.</p>
                <p><strong style="color:#00FF88;">Socketing (100g)</strong><br>
                Socket a cut gem into your equipped weapon or armor. Once socketed, a gem <strong>cannot be removed or replaced</strong>.</p>
                <p><strong style="color:#AA88FF;">Gem Slots by Quality (Weapons &amp; Armor)</strong><br>
                Rare: 1 slot &nbsp;|&nbsp; Epic: 2 slots &nbsp;|&nbsp; Legendary: 3 slots &nbsp;|&nbsp; Godly: 4 slots<br>
                <span style="color:#555;font-size:11px;">Only dropped gear has gem slots — shop gear does not.</span></p>
                <p><strong style="color:#FF6688;">Gem Colors — Original</strong><br>
                🔴 Ruby: Weapon DMG + Lifesteal &nbsp;|&nbsp; 🔵 Sapphire: Spell Power + MP<br>
                🟡 Topaz: Crit + Lightning &nbsp;|&nbsp; 🟢 Emerald: Poison + STR<br>
                🟣 Amethyst: Defense + HP &nbsp;|&nbsp; ⬛ Onyx: Armor Pierce + Speed<br>
                🔷 Opal: Luck + Gold Find &nbsp;|&nbsp; 🟤 Garnet: STR + CON</p>
                <p><strong style="color:#FF6688;">Gem Colors — Rare</strong><br>
                🩸 Bloodstone: Max HP + HP Regen per turn<br>
                🌙 Moonstone: MP Regen per turn + Cooldown reduction<br>
                ☀️ Sunstone: Fire DMG + STR (works on spells)<br>
                🔮 Voidstone: Spell Leech → absorbs MP + WIS<br>
                🩶 Ironheart: Defense + CON<br>
                ⛈️ Stormglass: Lightning DMG + Frost DMG (both elements, both damage types)</p>
                <p style="color:#888;font-size:11px;">Lightning, Fire, Frost, Poison all apply to both melee and spells.<br>
                Weapon DMG (Ruby) is melee only. Spell Power (Sapphire) is spells only.<br>
                Lifesteal (Ruby) works on both melee and spells.</p>
            </div>
            <button onclick="showBlacksmith('main', null, '${returnTo}')" style="margin-top:8px; padding:8px 16px;">← BACK</button>`);
    }
}

function doCutGem(rawGemKey) {
    const p = gameState.player;
    
    // Calculate discount from CHA
    const discount = Math.min(30, (p.cha || 0) * 2);
    const cost = Math.max(1, Math.floor(200 * (1 - discount / 100)));
    
    if (p.gold < cost) { 
        alert(`You need ${cost} gold to cut a gem.`); 
        return; 
    }
    
    const idx = p.inventory.indexOf(rawGemKey);
    if (idx < 0) { 
        alert("Gem not found in inventory."); 
        return; 
    }
    
    p.gold -= cost;
    p.inventory.splice(idx, 1);
    const cut = cutGem(rawGemKey);
    if (!cut) { 
        alert("Could not cut gem — unknown type."); 
        p.gold += cost; 
        return; 
    }
    p.inventory.push(cut);
    saveGame();
    
    const parts = rawGemKey.split('_');
    const typeKey = parts[1];
    const gem = GEM_TYPES[typeKey];
    const discountText = discount > 0 ? ` (${discount}% CHA discount)` : '';
    const flash = document.createElement('div');
    flash.style.cssText = `position:fixed;top:15px;left:50%;transform:translateX(-50%);background:#0a0a0a;border:2px solid ${gem?gem.color:'#FF7722'};padding:14px 24px;color:${gem?gem.color:'#FF7722'};font-size:15px;z-index:9999;text-align:center;max-width:340px;`;
    flash.innerHTML = `⚒️ <strong>Gem Cut!</strong><br><span style="font-size:12px;color:#ccc;">${cut.name}<br>${cut.description}<br>Paid: ${cost}g${discountText}</span>`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 3500);
    showBlacksmith('cut');
}

// Store reference to original blacksmith function to re-render
const originalShowBlacksmith = showBlacksmith;

// Create a completely new socket function with button disabling
window.doSocketGem = function(cutGemInventoryIndex, target) {
    console.log(`🔧 Socket called with index ${cutGemInventoryIndex}, target ${target}`);
    
    // Disable all socket buttons to prevent double-clicks
    const allButtons = document.querySelectorAll('#shopContent button');
    allButtons.forEach(btn => {
        if (btn.textContent.includes('SOCKET')) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
    });
    
    const p = gameState.player;
    
    const discount = Math.min(30, (p.cha || 0) * 2);
    const cost = Math.max(1, Math.floor(100 * (1 - discount / 100)));
    
    if (p.gold < cost) { 
        alert(`You need ${cost} gold to socket a gem.`); 
        // Re-enable buttons
        showBlacksmith('socket', target);
        return; 
    }
    
    const isArmor = target === 'armor';
    const instanceId = isArmor ? p.armor : p.weapon;
    const item = isArmor ? (instanceId ? ARMOR[instanceId] : null) : (instanceId ? WEAPONS[instanceId] : null);
    const itemLabel = isArmor ? 'armor' : 'weapon';
    
    if (!item) { 
        alert(`No ${itemLabel} equipped.`); 
        showBlacksmith('socket', target);
        return; 
    }
    if (!item.gems) item.gems = [];
    
    const slots = getGemSlots(item.quality || 'normal');
    const usedSlots = item.gems.length;
    const openSlots = slots - usedSlots;
    
    if (openSlots <= 0) {
        alert(`No open slots on this ${itemLabel}. (${usedSlots}/${slots} slots used)`);
        showBlacksmith('socket', target);
        return;
    }
    
    const cutGems = p.inventory.filter(k => typeof k === 'object' && k && k.cut === true);
    
    if (cutGemInventoryIndex < 0 || cutGemInventoryIndex >= cutGems.length) {
        alert("Gem not found.");
        showBlacksmith('socket', target);
        return;
    }
    
    const gem = cutGems[cutGemInventoryIndex];
    if (!gem) { 
        alert("Gem not found."); 
        showBlacksmith('socket', target);
        return; 
    }
    
    // ⭐ CRITICAL: Check if gem is already in the weapon (by checking its unique ID)
    const alreadyInWeapon = item.gems.some(g => g.id === gem.id);
    if (alreadyInWeapon) {
        alert(`⚠️ ${gem.name} is already socketed!`);
        showBlacksmith('socket', target);
        return;
    }
    
    const invIdx = p.inventory.findIndex(invItem => invItem && typeof invItem === 'object' && invItem.id === gem.id);
    if (invIdx === -1) { 
        alert("Gem not in inventory."); 
        showBlacksmith('socket', target);
        return; 
    }
    
    const discountText = discount > 0 ? ` (${discount}% CHA discount)` : '';
    if (!confirm(`Socket ${gem.name} into ${item.name} for ${cost}g${discountText}? This is permanent and cannot be undone.`)) {
        showBlacksmith('socket', target);
        return;
    }
    
    // Deduct gold
    p.gold -= cost;
    
    // Remove gem from inventory
    p.inventory.splice(invIdx, 1);
    
        // Add to weapon
    item.gems.push(gem);
    
    // The inventory reference is the same object, no need to push again
    // Just make sure invRef.gems points to the same array
    const invRef = p.inventory.find(i => i && typeof i === 'object' && i.instanceId === instanceId);
    if (invRef && !invRef.gems) {
        invRef.gems = item.gems;
    }
    
    recalcGemStats(p);
    saveGame();
    
    // Show success
    const flash = document.createElement('div');
    flash.style.cssText = `position:fixed;top:15px;left:50%;transform:translateX(-50%);background:#0a0a0a;border:2px solid ${gem.color};padding:14px 24px;color:${gem.color};font-size:15px;z-index:9999;text-align:center;max-width:340px;`;
    flash.innerHTML = `⚙️ <strong>Gem Socketed!</strong><br><span style="font-size:12px;color:#ccc;">${gem.name} fused into ${item.name}<br>Slot ${usedSlots + 1}/${slots}<br>Paid: ${cost}g${discountText}</span>`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 3500);
    
    // Refresh the blacksmith view (re-enables buttons)
    showBlacksmith('socket', target);
    
    console.log(`✅ Socketed ${gem.name}. Now ${item.gems.length}/${slots} slots filled`);
};

console.log('✅ New socket function installed with button disabling and duplicate ID check');


// ═══════════════════════════════════════════════════════════════
// GEM SOCKETING DUPLICATE PREVENTION & CLEANUP
// ═══════════════════════════════════════════════════════════════

// Function to remove duplicate gems from equipped weapon (silent)
function removeDuplicateGemsFromWeapon() {
    const weapon = WEAPONS[gameState.player.weapon];
    if (!weapon || !weapon.gems) return false;
    
    const uniqueGems = [];
    const seenIds = new Set();
    let removedCount = 0;
    
    for (const gem of weapon.gems) {
        if (seenIds.has(gem.id)) {
            removedCount++;
            console.log(`🗑️ Removed duplicate gem: ${gem.name}`);
        } else {
            seenIds.add(gem.id);
            uniqueGems.push(gem);
        }
    }
    
    if (removedCount > 0) {
        weapon.gems = uniqueGems;
        
        // Also update inventory reference
        const invRef = gameState.player.inventory.find(i => i && typeof i === 'object' && i.instanceId === gameState.player.weapon);
        if (invRef) invRef.gems = [...uniqueGems];
        
        recalcGemStats(gameState.player);
        saveGame();
        console.log(`✅ Removed ${removedCount} duplicate gem(s) from weapon`);
        return true;
    }
    return false;
}

// Store original function
const _originalDoSocketGem = doSocketGem;

// Override doSocketGem with cleanup
window.doSocketGem = function(idx, target) {
    // Call original function
    const result = _originalDoSocketGem(idx, target);
    
    // After socketing, clean up duplicates silently and refresh
    setTimeout(() => {
        removeDuplicateGemsFromWeapon();
        showBlacksmith('socket', target);
    }, 50);
    
    return result;
};

console.log('✅ Socket duplication prevention active - duplicates will be cleaned up automatically');


        // ═══════════════════════════════════════════════════════════════
        // TEMPLE OF REBIRTH (Stat Reset)
        // ═══════════════════════════════════════════════════════════════
        
        function showTemple() {
            checkGameVersion();
            const p = gameState.player;
            const screen = document.getElementById('mainScreen');
            
            // Calculate total stat points that have been allocated
            const totalAllocated = calculateTotalAllocatedPoints();
            const respecCost = calculateRespecCost(p.level);
            
            setScreen(`
                <div class="location-header">⛪ TEMPLE</div>
                <button onclick="showTown()" style="margin-bottom:10px;">← BACK TO TOWN</button>
                ${renderPlayerStats()}
                
                <div class="message">
                    <p style="color:var(--highlight-color);font-size:16px;">
                        <strong>Welcome to the Temple</strong>
                    </p>
                    <p>
                        Here, the priests offer spiritual services: ${(p.baseClass || p.class) === 'hunter' ? 'pet training,' : ''} spell training${(p.baseClass || p.class) === 'hunter' ? ',' : ''} and personal rebirth.
                    </p>
                </div>
                
                <div style="margin: 20px 0;">
                    ${(p.baseClass || p.class) === 'hunter' ? '<div class="menu-option" onclick="showPetTrainer()">🐺 PET TRAINING</div>' : ''}
                    <div class="menu-option" onclick="showSpellShop()">📖 SPELL TRAINING</div>
                    <div class="menu-option" onclick="showRespec()">🔄 STAT RESPEC (${respecCost}g)</div>
                    <button onclick="showTown()">← BACK TO TOWN</button>
                </div>
            `);
        }
        
        function showRespec() {
            const p = gameState.player;
            const screen = document.getElementById('mainScreen');
            
            const totalAllocated = calculateTotalAllocatedPoints();
            const respecCost = calculateRespecCost(p.level);
            
            setScreen(`
                <div class="location-header">🔄 STAT RESPEC</div>
                <button onclick="showTemple()" style="margin-bottom:10px;">← BACK</button>
                ${renderPlayerStats()}
                
                <div class="message" style="border-color:#8aaa8a;">
                    <p>Refund all allocated stat points to rebuild your character.</p>
                </div>
                
                <div class="message" style="border-color:#FFD700;">
                    <h3 style="color:#FFD700;">Respec Info</h3>
                    <p><span class="stat-label">Level:</span> ${p.level}</p>
                    <p><span class="stat-label">Allocated:</span> ${totalAllocated}</p>
                    <p><span class="stat-label">Available:</span> ${p.statPoints || 0}</p>
                    <p><span class="stat-label">Cost:</span> <span style="color:#FFD700;">${respecCost}g</span></p>
                </div>
                
                <div class="message" style="border-color:var(--error-color);">
                    <p style="color:var(--error-color);"><strong>⚠️ Warning:</strong> This resets ALL stat points.</p>
                </div>
                
                <div style="margin: 20px 0;">
                    ${p.gold >= respecCost ? `<button onclick="confirmRespec()" style="border-color:#FFD700;">💰 RESPEC (${respecCost}g)</button>` : `<button disabled>Need ${respecCost - p.gold}g more</button>`}
                    <button onclick="showTemple()">← BACK</button>
                </div>
            `);
        }
        
        function calculateTotalAllocatedPoints() {
            const p = gameState.player;
            // Each level gives 3 points, so total available = level * 3
            const totalAvailable = (p.level - 1) * 3; // -1 because level 1 has no points yet
            const remaining = p.statPoints || 0;
            return totalAvailable - remaining;
        }
        
        function calculateRespecCost(level) {
            // Cost scales with level: 1000g per level
            return level * 1000;
        }
        
        function confirmRespec() {
            const p = gameState.player;
            const cost = calculateRespecCost(p.level);
            
            if (p.gold < cost) {
                alert('Not enough gold!');
                return;
            }
            
            if (!confirm(`Are you sure you want to respec for ${cost} gold? This will refund all your allocated stat points.`)) {
                return;
            }
            
            performRespec();
        }
        
        function performRespec() {
            const p = gameState.player;
            const cost = calculateRespecCost(p.level);
            
            // Deduct gold
            p.gold -= cost;
            
            // Calculate how many points were manually allocated
            const totalLevelPoints = (p.level - 1) * 3;
            
            // Reset stats to base (level 1 + auto-gains)
            // Auto-gains: +1 to each stat per level (except paladin gets +2 str/wis)
            const baseLevels = p.level - 1; // Levels gained beyond 1
            
            p.str = 10 + baseLevels; // Base 10 + 1 per level
            p.dex = 10 + baseLevels;
            p.wis = 10 + baseLevels;
            p.cha = 10 + baseLevels;
            p.con = 10 + baseLevels;
            p.lck = 10 + baseLevels;
            
            // Paladin bonus (gets extra str/wis each level)
            if (p.class === 'paladin' || p.baseClass === 'paladin') {
                p.str += baseLevels;
                p.wis += baseLevels;
            }
            
            // Refund all allocated points
            p.statPoints = totalLevelPoints;
            
            // Recalculate HP based on new CON
            p.maxHp = 100 + (p.level - 1) * 15 + ((p.level - 1) * (p.con - 10)); // Base + level gains + con bonus
            p.hp = Math.min(p.hp, p.maxHp);
            
            saveGame();
            
            alert(`Respec complete! You have ${p.statPoints} stat points to reallocate.`);
            showCharacterStats();
        }
        
        // ═══════════════════════════════════════════════════════════════
        // SPELL SHOP - Temple Spell Training
        // ═══════════════════════════════════════════════════════════════
        
        function showSpellShop() {
    const p = gameState.player;
    const screen = document.getElementById('mainScreen');
    
    const classKey = p.baseClass || p.class;
    const spellTree = CLASS_SPELL_TREES[classKey];
    
    if (!spellTree) {
        setScreen(`
            <div class="location-header">📖 SPELL TRAINING</div>
            ${renderPlayerStats()}
            <div class="message" style="border-color:var(--error-color);">
                <p>Your class (${classKey}) does not have spell training available.</p>
            </div>
            <button onclick="showTemple()">← BACK TO TEMPLE</button>
        `);
        return;
    }
    
    // Build spell lists
    const availableSpells = [];   // can learn now
    const upcomingSpells  = [];   // locked by level
    const currentSpells   = [];   // already known

    // For each spell in the tree, determine if it's available as an UPGRADE
    Object.entries(spellTree.spellTree).forEach(([key, spell]) => {
        const hasSpell = p.knownSpells.includes(key);
        
        if (hasSpell) {
            // Player already has this spell
            currentSpells.push({ key, spell });
            return;
        }
        
        // Check if this spell can be learned (it's the NEXT spell in the chain)
        let canLearn = false;
        let requiredSpell = null;
        
        // If this spell has a requirement
        if (spell.requires) {
            // Check if player has the required spell AND no higher version yet
            if (p.knownSpells.includes(spell.requires)) {
                // They have the required spell - this is the NEXT upgrade
                canLearn = true;
                requiredSpell = spell.requires;
            }
        } else {
            // No requirement - it's a starting spell. Only show if they don't have ANY spells?
            // Actually, starting spells should only be available if they have no spells yet
            if (p.knownSpells.length === 0) {
                canLearn = true;
            }
        }
        
        // Also check if they already have a HIGHER version (skip if they do)
        let hasHigherVersion = false;
        for (const known of p.knownSpells) {
            const knownSpell = spellTree.spellTree[known];
            if (knownSpell && knownSpell.requires === key) {
                hasHigherVersion = true;
                break;
            }
        }
        
        if (hasHigherVersion) {
            return; // Skip - they already upgraded past this
        }
        
        if (canLearn && !hasHigherVersion) {
            const levelReq = p.level >= spell.level;
            const canAfford = p.gold >= spell.cost;
            
            if (levelReq) {
                availableSpells.push({ key, spell, canAfford, requiredSpell });
            } else {
                upcomingSpells.push({ key, spell, requiredSpell });
            }
        }
    });
    
    let html = `
        <div class="location-header">📖 SPELL TRAINING</div>
        <button onclick="showTemple()" style="margin-bottom:10px;">← BACK</button>
        ${renderPlayerStats()}
        
        <div class="message">
            <p style="color:var(--highlight-color);"><strong>The priests offer to teach you the sacred arts</strong></p>
            <p style="color:#8aaa8a;">Learn new spells or upgrade existing ones</p>
        </div>
    `;
    
    // Show current spells
    if (currentSpells.length > 0) {
        html += `<div class="message" style="border-color:#00FF00;"><h3 style="color:#00FF00;">Your Known Spells</h3>`;
        currentSpells.forEach(({ key, spell }) => {
            const typeColor = spell.type === 'heal' || spell.type === 'lifesteal' ? '#00FF00' : '#FF6666';
            const typeIcon = spell.type === 'heal' ? '💚' : spell.type === 'lifesteal' ? '🩸' : spell.type === 'aoe_damage' ? '🔥' : '💥';
            const lifestealInfo = spell.lifestealPercent ? ` (${spell.lifestealPercent}%)` : '';
            const aoeTag = spell.type === 'aoe_damage' ? ' <span style="color:#FF8800;">[AOE]</span>' : '';
            const powerDisplay = spell.minPower !== undefined ? `${spell.minPower}–${spell.maxPower}` : '?';
            
            // Check if there's an upgrade available
            let upgradeInfo = '';
            if (spell.upgradesTo) {
                const upgradeSpell = spellTree.spellTree[spell.upgradesTo];
                if (upgradeSpell) {
                    if (p.level >= upgradeSpell.level) {
                        upgradeInfo = `<br><span style="color:#FFD700;font-size:12px;">→ Upgrade available at Temple!</span>`;
                    } else {
                        upgradeInfo = `<br><span style="color:#555;font-size:12px;">→ Upgrade unlocks at Lv ${upgradeSpell.level}</span>`;
                    }
                }
            }
            
            html += `<p>${typeIcon} <strong>${spell.name}${aoeTag}</strong> - <span style="color:${typeColor};">${powerDisplay} ${spell.type === 'heal' ? 'HP' : 'DMG'}${lifestealInfo}</span> (${spell.mpCost} MP)${upgradeInfo}</p>`;
        });
        html += `</div>`;
    }
    
    // Show available spells (UPGRADES)
    if (availableSpells.length > 0) {
        html += `<div class="message" style="border-color:#FFD700;"><h3 style="color:#FFD700;">Available Upgrades</h3>`;
        availableSpells.forEach(({ key, spell, canAfford, requiredSpell }) => {
            const typeColor = spell.type === 'heal' || spell.type === 'lifesteal' ? '#00FF00' : '#FF6666';
            const typeIcon = spell.type === 'heal' ? '💚' : spell.type === 'lifesteal' ? '🩸' : spell.type === 'aoe_damage' ? '🔥' : '💥';
            const lifestealInfo = spell.lifestealPercent ? ` (${spell.lifestealPercent}% lifesteal)` : '';
            const aoeTag = spell.type === 'aoe_damage' ? ' <span style="color:#FF8800;">[AOE]</span>' : '';
            const powerDisplay = spell.minPower !== undefined ? `${spell.minPower}–${spell.maxPower}` : '?';
            
            // Get the name of the spell this upgrades from
            const oldSpell = spellTree.spellTree[requiredSpell];
            const upgradeText = oldSpell ? `Upgrade: ${oldSpell.name} → ${spell.name}` : 'New Spell';
            
            html += `<div style="margin:10px 0;padding:10px;border:1px solid ${canAfford ? '#FFD700' : '#666'};">
                <p>${typeIcon} <strong style="color:${typeColor};">${spell.name}${aoeTag}</strong><br>
                <span style="font-size:12px;">${upgradeText}</span><br>
                <span style="font-size:12px;">${spell.description}</span><br>
                <span style="color:${typeColor};">${powerDisplay} ${spell.type === 'heal' ? 'HP' : 'DMG'}${lifestealInfo}</span> | ${spell.mpCost} MP | Requires Level ${spell.level}<br>
                <span style="color:#FFD700;">Cost: ${spell.cost}g</span></p>
                ${canAfford ? `<button onclick="learnSpell('${key}')" style="border-color:#FFD700;">💰 Upgrade (${spell.cost}g)</button>` : `<button disabled style="opacity:0.5;">Need ${spell.cost - p.gold}g more</button>`}
            </div>`;
        });
        html += `</div>`;
    } else {
        html += `<div class="message"><p style="color:#888;">No upgrades available at your level.</p></div>`;
    }

    // Show upcoming locked upgrades
    if (upcomingSpells.length > 0) {
        html += `<div class="message" style="border-color:#444;"><h3 style="color:#888;">Coming Soon</h3>`;
        upcomingSpells.forEach(({ key, spell, requiredSpell }) => {
            const typeIcon = spell.type === 'heal' ? '💚' : spell.type === 'lifesteal' ? '🩸' : spell.type === 'aoe_damage' ? '🔥' : '💥';
            const aoeTag = spell.type === 'aoe_damage' ? ' <span style="color:#664400;">[AOE]</span>' : '';
            const oldSpell = spellTree.spellTree[requiredSpell];
            const upgradeText = oldSpell ? `Upgrade: ${oldSpell.name} → ${spell.name}` : 'New Spell';
            
            html += `<div style="margin:8px 0;padding:8px;border:1px solid #333;opacity:0.6;">
                <p>${typeIcon} <strong style="color:#666;">${spell.name}${aoeTag}</strong><br>
                <span style="font-size:12px;color:#777;">${upgradeText}</span><br>
                <span style="font-size:12px;color:#555;">${spell.description}</span><br>
                <span style="color:#666;">Unlocks at Level ${spell.level} | ${spell.mpCost} MP | Cost: ${spell.cost}g</span></p>
            </div>`;
        });
        html += `</div>`;
    }
    
    html += `<button onclick="showTemple()">← BACK</button>`;
    setScreen(html);
}
        
        function learnSpell(spellKey) {
            const p = gameState.player;
            const classKey = p.baseClass || p.class;
            const spell = CLASS_SPELL_TREES[classKey].spellTree[spellKey];
            
            if (!spell || p.gold < spell.cost || p.level < spell.level) {
                alert('Cannot learn this spell!');
                return;
            }
            
            if (spell.requires && !p.knownSpells.includes(spell.requires)) {
                alert('Learn previous spell first!');
                return;
            }
            
            p.gold -= spell.cost;
            
            // Remove old spell if upgrade
            if (spell.requires) {
                const idx = p.knownSpells.indexOf(spell.requires);
                if (idx > -1) p.knownSpells.splice(idx, 1);
            }
            
            p.knownSpells.push(spellKey);
            
            // Add to SPELLS if not present
            if (!SPELLS[spellKey]) {
                SPELLS[spellKey] = { ...spell, pipCost: 1 };
            }

            // ── Enforce slot order after every learn ───────────────────────
            // Slot 1 = single-target (damage / heal for healers)
            // Slot 2 = AOE (heal for healers)
            // Rule: for healer classes damage goes first, for others single-target damage first, AOE second
            const healerClasses = ['cleric','priest','paladin','shaman'];
            const isHealer = healerClasses.includes(classKey);

            p.knownSpells.sort((a, b) => {
                const sa = SPELLS[a] || CLASS_SPELL_TREES[classKey]?.spellTree?.[a];
                const sb = SPELLS[b] || CLASS_SPELL_TREES[classKey]?.spellTree?.[b];
                if (!sa || !sb) return 0;
                function rank(s) {
                    if (isHealer) {
                        // healers: damage=0 (slot1), heal=1 (slot2), aoe=2
                        if (s.type === 'damage') return 0;
                        if (s.type === 'heal' || s.type === 'lifesteal') return 1;
                        if (s.type === 'aoe_damage') return 2;
                        return 3;
                    } else {
                        // mages/others: single-target damage=0 (slot1), aoe=1 (slot2), heal=2
                        if (s.type === 'damage') return 0;
                        if (s.type === 'aoe_damage') return 1;
                        if (s.type === 'heal' || s.type === 'lifesteal') return 2;
                        return 3;
                    }
                }
                return rank(sa) - rank(sb);
            });
            
            saveGame();
            alert(`Learned ${spell.name}!`);
            showSpellShop();
        }
        
        // ═══════════════════════════════════════════════════════════════
        // PET TRAINER (Hunter Only)
        // ═══════════════════════════════════════════════════════════════
        
        function showPetTrainer() {
            const p = gameState.player;
            const screen = document.getElementById('mainScreen');
            
            if ((p.baseClass || p.class) !== 'hunter') {
                setScreen(`
                    <div class="location-header">🐺 PET TRAINING</div>
                    ${renderPlayerStats()}
                    <div class="message" style="border-color:var(--error-color);">
                        <p>The beast trainer shakes their head. "Only hunters may bond with beasts."</p>
                    </div>
                    <button onclick="showTemple()">← BACK TO TEMPLE</button>
                `);
                return;
            }
            
            // Determine current and next pet
            const currentPet = p.activePet ? HUNTER_PETS[p.activePet] : null;
            const nextPetKey = currentPet?.upgradesTo || (p.level >= 3 ? 'hunting_dog' : null);
            const nextPet = nextPetKey ? HUNTER_PETS[nextPetKey] : null;
            
            let html = `
                <div class="location-header">🐺 PET TRAINING</div>
                <button onclick="showTemple()" style="margin-bottom:10px;">← BACK</button>
                ${renderPlayerStats()}
                
                <div class="message">
                    <p style="color:var(--highlight-color);"><strong>The Beast Trainer greets you with a pack of loyal companions</strong></p>
                    <p style="color:#8aaa8a;">Bond with a beast to fight alongside you in battle</p>
                </div>
            `;
            
            // Show current pet
            if (currentPet) {
                html += `
                    <div class="message" style="border-color:#00FF00;">
                        <h3 style="color:#00FF00;">Your Current Companion</h3>
                        <p>${currentPet.icon} <strong style="color:#00FF00;">${currentPet.name}</strong> (Level ${currentPet.level})</p>
                        <p style="font-size:14px;color:#8aaa8a;">${currentPet.description}</p>
                        <p><span style="color:#FFD700;">Damage:</span> ${Math.floor(currentPet.damagePercent * 100)}% of weapon damage + ${currentPet.bonusDamage}</p>
                        ${currentPet.upgradesTo ? '<p style="color:#FFD700;font-size:12px;">→ Upgrade available!</p>' : '<p style="color:#888;">Max level companion</p>'}
                    </div>
                `;
            } else {
                html += `
                    <div class="message" style="border-color:#666;">
                        <p style="color:#888;">You don't have a companion yet.</p>
                        ${p.level >= 3 ? '<p style="color:#FFD700;">You can bond with your first pet!</p>' : `<p style="color:#888;">Reach level 3 to bond with a pet.</p>`}
                    </div>
                `;
            }
            
            // Show available upgrade
            if (nextPet && p.level >= nextPet.level) {
                const canAfford = p.gold >= nextPet.cost;
                html += `
                    <div class="message" style="border-color:#FFD700;">
                        <h3 style="color:#FFD700;">${currentPet ? 'Available Upgrade' : 'First Companion'}</h3>
                        <div style="margin:10px 0;padding:10px;border:1px solid ${canAfford ? '#FFD700' : '#666'};">
                            <p>${nextPet.icon} <strong style="color:#FFD700;">${nextPet.name}</strong> ${currentPet ? '(Upgrade)' : '(Bond)'}</p>
                            <p style="font-size:12px;color:#8aaa8a;">${nextPet.description}</p>
                            <p><span style="color:#FFD700;">Damage:</span> ${Math.floor(nextPet.damagePercent * 100)}% of weapon damage + ${nextPet.bonusDamage}</p>
                            <p style="font-size:12px;">Requires Level ${nextPet.level} | Cost: <span style="color:#FFD700;">${nextPet.cost}g</span></p>
                            ${canAfford 
                                ? `<button onclick="upgradePet('${nextPetKey}')" style="border-color:#FFD700;">💰 ${currentPet ? 'Upgrade' : 'Bond'} (${nextPet.cost}g)</button>`
                                : `<button disabled style="opacity:0.5;">Need ${nextPet.cost - p.gold}g more</button>`
                            }
                        </div>
                    </div>
                `;
            } else if (nextPet) {
                html += `
                    <div class="message" style="border-color:#444;">
                        <h3 style="color:#888;">Coming Soon</h3>
                        <div style="margin:8px 0;padding:8px;border:1px solid #333;opacity:0.6;">
                            <p>${nextPet.icon} <strong style="color:#666;">${nextPet.name}</strong> — Unlocks at Level ${nextPet.level}</p>
                            <p style="font-size:12px;color:#555;">${nextPet.description}</p>
                            <p style="color:#666;">${Math.floor(nextPet.damagePercent * 100)}% weapon damage + ${nextPet.bonusDamage} | Cost: ${nextPet.cost}g</p>
                        </div>
                    </div>
                `;
            }
            
            // Show pet progression path
            html += `
                <div class="message" style="border-color:#444;">
                    <h3 style="color:#8aaa8a;">Companion Progression</h3>
                    <p style="font-size:12px;color:#666;">
                        Lv 3: 🐕 Dog (35%) → Lv 6: 🐺 Wolf (40%) → Lv 9: 🐺 Dire Wolf (45%) → <br>
                        Lv 12: 👻🐕 Shadow Hound (50%) → Lv 15: 🐺 Warg (55%) → <br>
                        Lv 18: 🔥🐕 Hellhound (60%) → Lv 21: 🌙🐺 Fenrir (70%)
                    </p>
                </div>
            `;
            
            html += `<button onclick="showTemple()">← BACK</button>`;
            setScreen(html);
        }
        
        function upgradePet(petKey) {
            const p = gameState.player;
            const pet = HUNTER_PETS[petKey];
            
            if (!pet || p.gold < pet.cost || p.level < pet.level) {
                alert('Cannot bond with this companion!');
                return;
            }
            
            // Deduct gold and set new pet
            p.gold -= pet.cost;
            p.activePet = petKey;
            
            saveGame();
            alert(`${pet.icon} You bonded with ${pet.name}! They will fight by your side!`);
            showPetTrainer();
        }





// ============================================
// SILENT CLOUD SAVE - No prompts, just saves
// ============================================
async function silentCloudSave() {
    const p = gameState.player;
    if (!p) return;
    
    try {
        const { data: { user } } = await calamitySupabase.auth.getUser();
        if (!user) return;
        
        const snapshot = buildSaveSnapshot();
        if (!snapshot) return;
        
        // Check if this character already exists for this user
        const { data: existing } = await calamitySupabase
            .from('calamity_saves')
            .select('id')
            .eq('user_id', user.id)
            .eq('username', p.name);
        
        if (existing && existing.length > 0) {
            // Update existing save
            await calamitySupabase
                .from('calamity_saves')
                .update({
                    character_data: snapshot,
                    level: p.level,
                    class: p.class,
                    last_login: new Date().toISOString()
                })
                .eq('id', existing[0].id);
        } else {
            // Insert new save
            await calamitySupabase
                .from('calamity_saves')
                .insert([{
                    user_id: user.id,
                    username: p.name,
                    character_data: snapshot,
                    level: p.level,
                    class: p.class,
                    last_login: new Date().toISOString()
                }]);
        }
        
        console.log("☁️ Silent cloud save complete");
    } catch (e) {
        console.error('Silent cloud save failed:', e);
    }
}
