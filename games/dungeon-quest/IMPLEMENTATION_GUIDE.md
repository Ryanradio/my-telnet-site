# Implementation Guide - New Features

## ⚠️ IMPORTANT NOTE

The features you've requested require substantial rewrites to the core game systems. This document provides the implementation roadmap and code snippets needed to add each feature.

Due to the scope (8 major systems + complete combat overhaul), I recommend implementing features in phases:

**PHASE 1** (Core Loot): Rarity system, drop system, quality tiers
**PHASE 2** (Progression): Master battles, world locks
**PHASE 3** (Combat): Potions in combat, multi-monster battles
**PHASE 4** (Economy): Sell system, butterknife hunt

---

## 📦 STEP 1: Update Data Files (COMPLETE)

✅ monsters.js - Added rarity config and drop tables
✅ weapons.js - Added quality system and butterknife
✅ armor.js - Added quality tiers
✅ items.js - Added gems, materials, potions

All data files are ready to use!

---

## 🔨 STEP 2: Core Game Updates Needed

### A. Add Rarity System to Combat

**Location**: Main HTML, `startCombat()` function

**Current Code:**
```javascript
function startCombat(enemyKey) {
    const enemyTemplate = ENEMIES[enemyKey];
    const enemy = {
        ...enemyTemplate,
        hp: enemyTemplate.hp,
        maxHp: enemyTemplate.hp
    };
    // ...
}
```

**New Code:**
```javascript
function startCombat(enemyKey) {
    const enemy = spawnMonsterWithRarity(enemyKey);
    gameState.combatState = {
        enemy: enemy,
        turnTimer: 10,
        playerTurn: gameState.player.speed >= enemy.level * 2,
        messages: [`A ${getRarityText(enemy.rarity)} ${enemy.name} appears!`]
    };
    renderCombat();
    startCombatTimer();
}

function spawnMonsterWithRarity(enemyKey) {
    const template = ENEMIES[enemyKey];
    const rarity = rollRarity();
    const mult = RARITY_CONFIG[rarity].multiplier;
    
    return {
        key: enemyKey,
        name: template.name,
        rarity: rarity,
        rarityColor: RARITY_CONFIG[rarity].color,
        hp: Math.floor(template.baseHp * mult),
        maxHp: Math.floor(template.baseHp * mult),
        damage: Math.floor(template.baseDamage * mult),
        defense: Math.floor(template.baseDefense * mult),
        xp: Math.floor(template.baseXp * mult),
        gold: Math.floor(template.baseGold * mult),
        level: template.level,
        possibleDrops: template.possibleDrops,
        dropRates: template.dropRates
    };
}

function rollRarity() {
    const roll = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
        cumulative += config.spawnWeight;
        if (roll < cumulative) return rarity;
    }
    return 'common';
}

function getRarityText(rarity) {
    const color = RARITY_CONFIG[rarity].color;
    const name = RARITY_CONFIG[rarity].name;
    return `<span style="color: ${color};">${name}</span>`;
}
```

---

### B. Add Item Drop System

**Location**: Main HTML, `endCombat()` function

**Add after XP/Gold rewards:**
```javascript
function endCombat(victory) {
    clearInterval(gameState.combatTimer);
    const screen = document.getElementById('mainScreen');

    if (victory) {
        const enemy = gameState.combatState.enemy;
        gameState.player.xp += enemy.xp;
        gameState.player.gold += enemy.gold;

        // NEW: Roll for item drops
        const loot = rollLoot(enemy);
        
        let resultHtml = `
            <div class="location-header">VICTORY!</div>
            ${renderPlayerStats()}
            <div class="message success-message">
                <p>You defeated the ${getRarityText(enemy.rarity)} ${enemy.name}!</p>
                <p>Gained ${enemy.xp} XP and ${enemy.gold} Gold!</p>
            </div>
        `;

        // Display loot
        if (loot.length > 0) {
            resultHtml += `<div class="message" style="border-color: var(--highlight-color);">
                <p style="color: var(--highlight-color);">LOOT DROPPED:</p>`;
            
            loot.forEach(itemKey => {
                const itemName = getItemName(itemKey);
                const itemColor = getItemColor(itemKey);
                resultHtml += `<p style="color: ${itemColor};">+ ${itemName}</p>`;
                
                // Add to inventory
                gameState.player.inventory.push(itemKey);
            });
            
            resultHtml += `</div>`;
        }

        // Check for level up
        if (gameState.player.xp >= gameState.player.xpToNext) {
            levelUp();
            resultHtml += `
                <div class="message" style="border-color: var(--highlight-color);">
                    <p style="color: var(--highlight-color); font-size: 24px;">LEVEL UP!</p>
                    <p>You are now level ${gameState.player.level}!</p>
                </div>
            `;
        }

        resultHtml += `
            <button onclick="exploreLocation('${gameState.currentLocation}')">CONTINUE EXPLORING</button>
            <button onclick="showTown()">RETURN TO TOWN</button>
        `;

        screen.innerHTML = resultHtml;
        gameState.combatState = null;
    } else {
        // ... existing defeat code ...
    }
}

function rollLoot(monster) {
    const loot = [];
    const rarityBonus = RARITY_CONFIG[monster.rarity].dropBonus || 0;
    
    if (!monster.possibleDrops) return loot;
    
    monster.possibleDrops.forEach(itemKey => {
        // Determine item quality/rarity
        let dropChance = 0;
        
        if (ITEMS[itemKey]) {
            // Consumable/sellable items use simpler drop rates
            dropChance = monster.dropRates.common || 0.3;
        } else if (WEAPONS[itemKey] || ARMOR[itemKey]) {
            // Equipment uses quality-based drop rates
            const quality = getItemQuality(itemKey);
            dropChance = monster.dropRates[quality] || 0.05;
        }
        
        // Apply rarity bonus
        const adjustedChance = Math.min(0.95, dropChance * (1 + rarityBonus * 0.1));
        
        if (Math.random() < adjustedChance) {
            loot.push(itemKey);
        }
    });
    
    // BUTTERKNIFE CHECK (Red Dragons only!)
    if (monster.key === 'red_dragon' && Math.random() < 0.000001) {
        loot.push('magical_butterknife');
        terminalPrint('⚠️⚠️⚠️ ULTRA RARE DROP: MAGICAL BUTTERKNIFE! ⚠️⚠️⚠️', 'success');
    }
    
    return loot;
}

function getItemName(itemKey) {
    if (WEAPONS[itemKey]) return WEAPONS[itemKey].name;
    if (ARMOR[itemKey]) return ARMOR[itemKey].name;
    if (ITEMS[itemKey]) return ITEMS[itemKey].name;
    if (SPELLS[itemKey]) return SPELLS[itemKey].name;
    return itemKey;
}

function getItemColor(itemKey) {
    if (WEAPONS[itemKey]) {
        return QUALITY_CONFIG[WEAPONS[itemKey].quality].color;
    }
    if (ARMOR[itemKey]) {
        return QUALITY_CONFIG[ARMOR[itemKey].quality].color;
    }
    return '#00FF00'; // Default green
}

function getItemQuality(itemKey) {
    if (WEAPONS[itemKey]) return WEAPONS[itemKey].quality;
    if (ARMOR[itemKey]) return ARMOR[itemKey].quality;
    return 'normal';
}
```

---

### C. Update Weapon/Armor Display with Quality Colors

**Location**: `showShop()`, `showInventory()` functions

**Add color styling to item names:**
```javascript
// In showShop():
const weapon = WEAPONS[key];
const color = QUALITY_CONFIG[weapon.quality].color;
const qualityName = QUALITY_CONFIG[weapon.quality].name;

shopHtml += `
    <div class="item-card ${equipped ? 'equipped' : ''}">
        <div style="color: ${color};">${weapon.name}</div>
        <div style="color: ${color}; font-size: 14px;">[${qualityName}]</div>
        <div>DMG: ${weapon.baseDamage} | MAG: ${weapon.baseMagicDamage}</div>
        <div>Quality Bonus: +${QUALITY_CONFIG[weapon.quality].bonus}</div>
        <div>Level: ${weapon.level}</div>
        ${/* ... rest of code ... */}
    </div>
`;
```

---

### D. Add Potion Usage in Combat

**Location**: Combat screen rendering

**Add to combat action buttons:**
```javascript
function renderCombat() {
    // ... existing code ...
    
    combatHtml += `
        <div style="margin: 20px 0;">
            <h3 style="color: var(--highlight-color);">CHOOSE YOUR ACTION:</h3>
            <button onclick="playerAttack()">⚔️ ATTACK</button>
            <button onclick="showSpellMenu()">✨ CAST SPELL</button>
            <button onclick="showPotionMenu()">🧪 USE POTION</button>
            <button onclick="playerDefend()">🛡️ DEFEND</button>
            <button onclick="attemptFlee()">🏃 FLEE</button>
        </div>
    `;
}

function showPotionMenu() {
    clearInterval(gameState.combatTimer);
    const screen = document.getElementById('mainScreen');
    
    const potions = gameState.player.inventory.filter(item => {
        return ITEMS[item] && (
            ITEMS[item].subtype === 'heal_hp' ||
            ITEMS[item].subtype === 'heal_mp' ||
            ITEMS[item].subtype === 'full_restore'
        );
    });
    
    if (potions.length === 0) {
        gameState.combatState.messages.push('You have no potions!');
        renderCombat();
        startCombatTimer();
        return;
    }
    
    let potionHtml = `
        <div class="location-header">USE POTION</div>
        ${renderPlayerStats()}
        <div class="message">Choose a potion to use:</div>
        <div class="inventory-grid">
    `;
    
    potions.forEach((potionKey, index) => {
        const potion = ITEMS[potionKey];
        potionHtml += `
            <div class="item-card">
                <div style="color: var(--highlight-color);">${potion.name}</div>
                <div>${potion.description}</div>
                <div>Power: ${potion.power}</div>
                <button onclick="usePotion('${potionKey}', ${index})">USE</button>
            </div>
        `;
    });
    
    potionHtml += `
        </div>
        <button onclick="renderCombat(); startCombatTimer();">BACK</button>
    `;
    
    screen.innerHTML = potionHtml;
}

function usePotion(potionKey, inventoryIndex) {
    const potion = ITEMS[potionKey];
    const p = gameState.player;
    
    if (potion.subtype === 'heal_hp') {
        const healAmount = potion.power;
        p.hp = Math.min(p.maxHp, p.hp + healAmount);
        gameState.combatState.messages.push(`Used ${potion.name} and restored ${healAmount} HP!`);
    } else if (potion.subtype === 'heal_mp') {
        const manaAmount = potion.power;
        p.mp = Math.min(p.maxMp, p.mp + manaAmount);
        gameState.combatState.messages.push(`Used ${potion.name} and restored ${manaAmount} MP!`);
    } else if (potion.subtype === 'full_restore') {
        p.hp = p.maxHp;
        p.mp = p.maxMp;
        gameState.combatState.messages.push(`Used ${potion.name} - fully restored!`);
    }
    
    // Remove potion from inventory
    gameState.player.inventory.splice(
        gameState.player.inventory.indexOf(potionKey), 
        1
    );
    
    enemyAttack();
}
```

---

### E. Add Sell System to Shop

**Location**: `showShop()` function

**Replace shop with tabs:**
```javascript
function showShop() {
    const screen = document.getElementById('mainScreen');
    
    let shopHtml = `
        <div class="location-header">MERCHANT SHOP</div>
        ${renderPlayerStats()}
        <div class="message">
            <p>Welcome to my shop! What can I do for you?</p>
        </div>
        <div style="margin: 20px 0;">
            <button onclick="showShopBuy()" id="buyTab">BUY ITEMS</button>
            <button onclick="showShopSell()" id="sellTab">SELL ITEMS</button>
        </div>
        <div id="shopContent"></div>
        <button onclick="showTown()">LEAVE SHOP</button>
    `;
    
    screen.innerHTML = shopHtml;
    showShopBuy();
}

function showShopBuy() {
    // ... existing shop buy code ...
}

function showShopSell() {
    const sellableItems = gameState.player.inventory.filter(itemKey => {
        return ITEMS[itemKey] && ITEMS[itemKey].sellValue > 0;
    });
    
    let sellHtml = '<h3 style="color: var(--highlight-color);">YOUR SELLABLE ITEMS</h3>';
    sellHtml += '<div class="inventory-grid">';
    
    if (sellableItems.length === 0) {
        sellHtml += '<div class="message">You have nothing to sell.</div>';
    } else {
        sellableItems.forEach(itemKey => {
            const item = ITEMS[itemKey];
            sellHtml += `
                <div class="item-card">
                    <div style="color: var(--highlight-color);">${item.name}</div>
                    <div>${item.description}</div>
                    <div style="color: var(--border-color);">Sell for: ${item.sellValue}G</div>
                    <button onclick="sellItem('${itemKey}', ${item.sellValue})">SELL</button>
                </div>
            `;
        });
    }
    
    sellHtml += '</div>';
    document.getElementById('shopContent').innerHTML = sellHtml;
}

function sellItem(itemKey, value) {
    // Remove from inventory
    const index = gameState.player.inventory.indexOf(itemKey);
    gameState.player.inventory.splice(index, 1);
    
    // Add gold
    gameState.player.gold += value;
    
    alert(`Sold for ${value} gold!`);
    showShopSell();
}
```

---

## 🏆 STEP 3: Class Masters System

This requires adding new enemy types and progression gates. Due to complexity, I'm providing the structure:

```javascript
const CLASS_MASTERS = {
    warrior_master_1: {
        name: 'Master Swordsman',
        class: 'warrior',
        unlocks: 'plains',
        baseHp: 200,
        baseDamage: 30,
        baseDefense: 20,
        level: 3,
        requiredLevel: 3,
        rewards: ['steel_sword', 'steel_plate', 'large_gem']
    },
    // ... more masters ...
};

function checkCanExplore(location) {
    const requiredMaster = LOCATIONS[location].requiredMaster;
    if (requiredMaster && !gameState.player.defeatedMasters.includes(requiredMaster)) {
        alert('You must defeat a class master to unlock this area!');
        return false;
    }
    return true;
}
```

---

## 👥 STEP 4: Multi-Monster Combat

**Major refactor required.** Key changes:

```javascript
// Change combatState structure
gameState.combatState = {
    monsters: [enemy1, enemy2, enemy3],  // Array instead of single enemy
    currentTarget: 0,
    turnTimer: 10,
    messages: []
};

// Update attack to target specific monster
function playerAttack(targetIndex = 0) {
    const monster = gameState.combatState.monsters[targetIndex];
    // ... damage calculation ...
    
    if (monster.hp <= 0) {
        gameState.combatState.monsters.splice(targetIndex, 1);
        if (gameState.combatState.monsters.length === 0) {
            endCombat(true);
        }
    }
}

// All monsters attack each turn
function allMonstersAttack() {
    gameState.combatState.monsters.forEach(monster => {
        // ... attack logic ...
    });
}
```

---

## ⚙️ IMPLEMENTATION ORDER

1. **Phase 1**: Rarity system + Item drops (2-3 hours)
2. **Phase 2**: Quality colors + Shop sell (1-2 hours)
3. **Phase 3**: Potion usage in combat (1 hour)
4. **Phase 4**: Multi-monster combat (3-4 hours)
5. **Phase 5**: Class masters system (2-3 hours)
6. **Testing**: Full playthrough (2+ hours)

**Total Estimated Time**: 12-16 hours of development

---

## 🚨 CRITICAL NOTES

1. All data files are already updated and ready
2. Combat system needs major refactoring for multi-monster
3. SYSOP commands need updates for new item types
4. Save/load system must handle new player properties
5. Balance testing required after implementation

Would you like me to implement a specific phase first, or create a working prototype with Phase 1 complete?
