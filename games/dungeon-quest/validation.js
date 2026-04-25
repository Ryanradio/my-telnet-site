// ═══════════════════════════════════════════════════════════════
// VALIDATION & REPAIR — inventory and gem integrity checks
// Extracted from index.html
// Dependencies: gameState, WEAPONS, ARMOR, ITEMS (runtime globals)
// ═══════════════════════════════════════════════════════════════

function validateAndRepairInventory() {
    const p = gameState.player;
    if (!p || !p.inventory) return false;
    
    console.log('🔧 Running inventory validation...');
    let repairs = 0;
    let removals = 0;
    let levelFixes = 0;
    
    const validatedInventory = [];
    const seenInstanceIds = new Set();
    
    for (const item of p.inventory) {
        // ── WEAPON OBJECTS ─────────────────────────────────────────
        if (typeof item === 'object' && item !== null && item.weaponId && item.instanceId) {
            // Skip duplicates
            if (seenInstanceIds.has(item.instanceId)) {
                console.warn(`🗑️ Removed duplicate weapon: ${item.name}`);
                removals++;
                continue;
            }
            seenInstanceIds.add(item.instanceId);
            
            const masterCopy = WEAPONS[item.instanceId];
            if (!masterCopy) {
                // Re-register the inventory item itself rather than dropping it
                // This handles weapons orphaned from WEAPONS[] by a page reload
                WEAPONS[item.instanceId] = item;
                console.log(`🔧 Re-registered orphaned weapon: ${item.name}`);
                repairs++;
                validatedInventory.push(item);
            } else {
                // Use master copy only if it has MORE data (more fields) than the inventory item
                // This prevents master copy from overwriting richer instance data
                const masterKeys = Object.keys(masterCopy).length;
                const itemKeys = Object.keys(item).length;
                validatedInventory.push(masterKeys >= itemKeys ? masterCopy : item);
                if (masterCopy !== item) repairs++;
            }
        }
        // ── ARMOR OBJECTS ──────────────────────────────────────────
        else if (typeof item === 'object' && item !== null && item.armorId && item.instanceId) {
            // Skip duplicates
            if (seenInstanceIds.has(item.instanceId)) {
                console.warn(`🗑️ Removed duplicate armor: ${item.name}`);
                removals++;
                continue;
            }
            seenInstanceIds.add(item.instanceId);
            
            const masterCopy = ARMOR[item.instanceId];
            if (!masterCopy) {
                // Re-register the inventory item itself rather than dropping it
                ARMOR[item.instanceId] = item;
                console.log(`🔧 Re-registered orphaned armor: ${item.name}`);
                repairs++;
                validatedInventory.push(item);
            } else {
                // Use master copy only if it has MORE data than the inventory item
                const masterKeys = Object.keys(masterCopy).length;
                const itemKeys = Object.keys(item).length;
                validatedInventory.push(masterKeys >= itemKeys ? masterCopy : item);
                if (masterCopy !== item) repairs++;
            }
        }
        else {
            validatedInventory.push(item);
        }
    }
    
    p.inventory = validatedInventory;
    
    // Fix equipped references
    if (p.weapon && p.weapon !== 'bare_fists' && !WEAPONS[p.weapon]) {
        console.warn(`⚠️ Equipped weapon missing from WEAPONS[] — unequipping`);
        p.weapon = 'bare_fists';
        repairs++;
    }
    if (p.armor && p.armor !== 'no_armor' && !ARMOR[p.armor]) {
        console.warn(`⚠️ Equipped armor missing from ARMOR[] — unequipping`);
        p.armor = 'no_armor';
        repairs++;
    }
    
    console.log(`✅ Inventory validation: ${repairs} repaired, ${removals} removed, ${levelFixes} level fixes`);
    return repairs > 0 || removals > 0;
}


// ═══════════════════════════════════════════════════════════════
// GEM VALIDATION & REPAIR SYSTEM - Event Driven
// ═══════════════════════════════════════════════════════════════

// Define the repair function once
function validateAndRepairGems() {
    if (!window.gameState?.player?.weapon) return; // Silent fail if not ready
    
    console.log('🔍 Running gem validation...');
    let repaired = 0;
    
    function repairGem(gem, index, location) {
        if (!gem) return false;
        
        const isBroken = !gem.stats || Object.keys(gem.stats).length === 0 || 
                         gem.tier === null || gem.tier === undefined || 
                         isNaN(gem.tier) || 
                         (gem.name && gem.name.includes('undefined'));
        
        if (!isBroken) return false;
        
        console.log(`🔧 Repairing broken gem at ${location}[${index}]:`, gem);
        
        let typeKey = gem.type || 'topaz';
        let tier = 1;
        
        if (gem.tier && !isNaN(gem.tier)) tier = gem.tier;
        else if (gem.id && gem.id.includes('_t')) {
            const match = gem.id.match(/_t(\d+)/);
            if (match) tier = parseInt(match[1]);
        }
        
        const gemDef = window.GEM_TYPES?.[typeKey];
        const stats = {};
        
        if (gemDef?.rolls) {
            const statPool = [...gemDef.stats];
            const shuffled = statPool.sort(() => Math.random()-0.5);
            const picked = [...new Set(shuffled)].slice(0, 2);
            const mult = window.GEM_TIER_MULT?.[tier] || 1.0;
            
            for (const stat of picked) {
                const [lo, hi] = gemDef.rolls[stat];
                stats[stat] = Math.floor((lo + Math.random()*(hi-lo+1)) * mult);
            }
        } else {
            if (typeKey === 'topaz' || typeKey === 'Topaz') {
                stats.lightningDmg = 9;
                stats.critBonus = 4;
            } else if (typeKey === 'emerald' || typeKey === 'Emerald') {
                stats.weaponDmg = 6;
                stats.lifesteal = 2;
            } else {
                stats.weaponDmg = 5;
            }
        }
        
        gem.stats = stats;
        gem.tier = tier;
        gem.cut = true;
        gem.name = `${['','T1 ','T2 ','T3 ','T4 '][tier] || `T${tier} `}${gemDef?.name || typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}`;
        gem.description = window.describeGemStats ? 
            window.describeGemStats(stats) : 
            Object.entries(stats).map(([k,v]) => `+${v} ${k}`).join(', ');
        
        return true;
    }
    
    const player = gameState.player;
    
    if (player.weapon) {
        const weaponData = window.WEAPONS?.[player.weapon];
        if (weaponData?.gems) {
            weaponData.gems.forEach((gem, i) => {
                if (repairGem(gem, i, 'equipped weapon')) repaired++;
            });
        }
    }
    
    if (player.inventory) {
        player.inventory.forEach((item, invIndex) => {
            if (item?.gems) {
                item.gems.forEach((gem, gemIndex) => {
                    if (repairGem(gem, gemIndex, `inventory[${invIndex}]`)) repaired++;
                });
            }
        });
    }
    
    if (repaired > 0) {
        console.log(`✅ Repaired ${repaired} broken gem(s)!`);
        if (window.localSave) window.localSave();
    }
}
