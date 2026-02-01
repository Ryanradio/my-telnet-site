# 🎮 DUNGEON QUEST BBS - MAJOR UPDATE v2.0

## 🆕 NEW FEATURES IMPLEMENTED

### 1. ⭐ MONSTER RARITY SYSTEM

Monsters now spawn with different rarity tiers that affect their difficulty and rewards:

**Rarity Tiers:**
- **Common** (White, 60% spawn) - 1.0x stats
- **Uncommon** (Green, 25% spawn) - 1.3x stats
- **Rare** (Blue, 10% spawn) - 1.6x stats
- **Epic** (Purple, 4% spawn) - 2.0x stats
- **Legendary** (Orange, 0.9% spawn) - 2.5x stats
- **Mythic** (Red, 0.1% spawn) - 3.5x stats

Higher rarity monsters have:
- Increased HP, damage, and defense
- Better loot drop rates
- More XP and gold rewards
- Color-coded names in combat

### 2. 💎 ITEM DROP SYSTEM

Monsters can now drop various items:

**Drop Categories:**
- **Weapons** - Rare chance to find better weapons
- **Armor** - Rare chance to find better armor  
- **Potions** - Health and mana potions
- **Gems** - Sellable for gold (Small, Medium, Large, Huge, Pristine)
- **Materials** - Pelts, silk, bone dust, essence (sellable)
- **Rare Materials** - Dragon hearts, demon cores, phylacteries (high value)

**Drop Mechanics:**
- Each monster has a unique loot table
- Higher rarity monsters = better drop chances
- Legendary items have 0.01-0.05% drop rate
- **Magical Butterknife** - 0.0001% drop from Red Dragons only!

### 3. 🗡️ WEAPON & ARMOR QUALITY SYSTEM

All equipment now has quality tiers:

**Quality Tiers:**
- **Poor** (Grey) - Base stats -2
- **Normal** (Green) - Base stats +0
- **Rare** (Blue) - Base stats +2
- **Epic** (Purple) - Base stats +5
- **Legendary** (Orange) - Base stats +10
- **Godly** (Red) - Base stats +20

**Example:**
- Iron Sword (Normal): 12 damage
- Iron Sword (Epic): 17 damage (+5)
- Iron Sword (Godly): 32 damage (+20)

Items show their quality in colored text!

### 4. 🏆 WORLD PROGRESSION & CLASS MASTERS

To progress to harder areas, you must:
1. Reach the maximum level for current area
2. Challenge your class-specific Master
3. Defeat the Master in combat
4. Unlock the next world

**Class Masters by Zone:**
- **Forest → Plains**: Level 3 required
  - Warrior: Master Swordsman
  - Rogue: Shadow Master
  - Paladin: Knight Commander
  - Mage: Arcane Tutor
  - Cleric: High Priest
  - Ranger: Hunt Master

- **Plains → Cave**: Level 6 required
- **Cave → Crypt**: Level 9 required
- **Crypt → Volcano**: Level 12 required

**Master Stats:**
- HP: 3x normal boss for that level
- Damage: 2x normal damage
- Defense: 2x normal defense
- Drops: Guaranteed rare/epic equipment

### 5. 🧪 POTION SYSTEM

Now you can use potions in combat!

**Health Potions:**
- Health Potion: +50 HP (30 gold)
- Greater Health Potion: +100 HP (60 gold)
- Superior Health Potion: +200 HP (120 gold)

**Mana Potions:**
- Mana Potion: +40 MP (35 gold)
- Greater Mana Potion: +80 MP (70 gold)
- Superior Mana Potion: +150 MP (140 gold)

**Elixir:**
- Fully restores HP and MP (150 gold)

Use them in combat from your inventory or hotkey!

### 6. 🔪 THE MAGICAL BUTTERKNIFE

The ultimate weapon:
- **Damage:** 9,999 physical + 9,999 magic
- **Quality:** Godly (red text)
- **One-shots everything** - Including bosses and masters
- **Drop Rate:** 0.0001% from Red Dragons only
- **Flavor Text:** "Even gods fear the butter"

**How to find it:**
1. Reach Volcano (requires beating 3 masters)
2. Farm Red Dragons endlessly
3. Pray to RNG gods
4. Average: ~1 in 1,000,000 kills

Alternative: SYSOP command `/give weapon magical_butterknife` 😉

### 7. 👥 MULTI-MONSTER ENCOUNTERS

Rooms can now have 2-3 monsters:

**Combat Changes:**
- Must select which monster to attack
- `/attack 1`, `/attack 2`, or `/attack 3`
- Each monster attacks independently
- Kill them one by one or flee!

**Spawn Chances:**
- 1 Monster: 70%
- 2 Monsters: 25%
- 3 Monsters: 5%

**Rewards:**
- XP/Gold from all defeated monsters
- Each monster can drop loot
- Higher risk = higher reward!

### 8. 💰 SHOP SELL SYSTEM

You can now sell items for gold:

**Sellable Items:**
- Gems (25g - 1,000g each)
- Materials (10g - 600g each)
- Rare Materials (800g - 1,500g each)
- Duplicate weapons/armor (50% of purchase price)
- Unused potions (50% of purchase price)

**Shop UI:**
- BUY tab - Purchase items
- SELL tab - Sell your loot
- Auto-calculates value
- Instant gold payment

---

## 🔧 TECHNICAL IMPLEMENTATION

### Monster Spawning with Rarity

```javascript
function spawnMonster(enemyKey) {
    const template = ENEMIES[enemyKey];
    const rarity = rollRarity();
    const multiplier = RARITY_CONFIG[rarity].multiplier;
    
    return {
        key: enemyKey,
        name: template.name,
        rarity: rarity,
        hp: Math.floor(template.baseHp * multiplier),
        maxHp: Math.floor(template.baseHp * multiplier),
        damage: Math.floor(template.baseDamage * multiplier),
        defense: Math.floor(template.baseDefense * multiplier),
        xp: Math.floor(template.baseXp * multiplier),
        gold: Math.floor(template.baseGold * multiplier),
        level: template.level,
        drops: template.possibleDrops,
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
```

### Item Drop System

```javascript
function rollLoot(monster) {
    const loot = [];
    const rarityBonus = RARITY_CONFIG[monster.rarity].dropBonus;
    
    monster.drops.forEach(itemKey => {
        const dropChance = monster.dropRates[getItemQuality(itemKey)];
        const adjustedChance = Math.min(1, dropChance * (1 + rarityBonus * 0.1));
        
        if (Math.random() < adjustedChance) {
            loot.push(itemKey);
        }
    });
    
    // Special: Butterknife check
    if (monster.key === 'red_dragon' && Math.random() < 0.000001) {
        loot.push('magical_butterknife');
    }
    
    return loot;
}
```

### Weapon Quality Application

```javascript
function getWeaponStats(weaponKey, quality = null) {
    const base = WEAPONS[weaponKey];
    const itemQuality = quality || base.quality;
    const bonus = QUALITY_CONFIG[itemQuality].bonus;
    
    return {
        name: base.name,
        damage: base.baseDamage + bonus,
        magicDamage: base.baseMagicDamage + bonus,
        quality: itemQuality,
        color: QUALITY_CONFIG[itemQuality].color,
        level: base.level
    };
}
```

### Multi-Monster Combat

```javascript
function startMultiCombat(location) {
    const numMonsters = rollMonsterCount();  // 1-3
    const monsters = [];
    
    for (let i = 0; i < numMonsters; i++) {
        const enemyKey = pickRandomEnemy(location);
        monsters.push(spawnMonster(enemyKey));
    }
    
    gameState.combatState = {
        monsters: monsters,
        currentTarget: 0,
        turnTimer: 10,
        messages: [`You encounter ${numMonsters} enemies!`]
    };
}

function attackMonster(targetIndex) {
    const monster = gameState.combatState.monsters[targetIndex];
    // ... damage calculation ...
    
    if (monster.hp <= 0) {
        gameState.combatState.monsters.splice(targetIndex, 1);
        if (gameState.combatState.monsters.length === 0) {
            endCombat(true);
        }
    }
}
```

---

## 📊 BALANCE CHANGES

### Level Requirements by Zone

| Zone | Min Level | Master Level | Monsters |
|------|-----------|--------------|----------|
| Forest | 1 | 3 | 1-3 |
| Plains | 3 | 6 | 3-5 |
| Cave | 6 | 9 | 5-7 |
| Crypt | 9 | 12 | 8-10 |
| Volcano | 12 | 15 | 10-13 |

### Gold Economy

- Early game (Lv 1-5): ~500g total earnings
- Mid game (Lv 6-10): ~5,000g total earnings
- Late game (Lv 11+): ~50,000g total earnings
- Selling gems is now a major income source!

### Drop Rate Expectations

**For a Common monster:**
- Potion: 40% chance
- Weapon/Armor: 5% chance
- Gem: 20% chance

**For a Mythic monster:**
- Potion: 40% chance (same)
- Weapon/Armor: 40% chance (8x higher!)
- Epic+ Equipment: 15% chance
- Legendary Equipment: 8% chance
- Rare Material: 60% chance

---

## 🎯 NEW GAMEPLAY LOOP

1. **Start** - Create character, equip starter gear
2. **Farm Forest** - Kill monsters for loot & levels
3. **Sell Loot** - Turn gems/materials into gold
4. **Buy Upgrades** - Purchase better equipment
5. **Challenge Master** - Beat class master at level 3
6. **Unlock Plains** - Harder monsters, better loot
7. **Repeat** - Progress through all 5 zones
8. **Farm Dragons** - Hunt for the Butterknife
9. **Become Legend** - One-shot everything!

---

## 🐛 KNOWN ISSUES & NOTES

- Butterknife drop rate is intentionally absurd (0.0001%)
- Multi-monster combat requires target selection
- Quality is rolled when item drops (can get Godly starter gear!)
- Masters can be retried unlimited times (costs time)
- Selling duplicate equipment prevents inventory bloat
- SYSOP commands bypass all progression locks

---

## 🔮 FUTURE ENHANCEMENTS (Not Yet Implemented)

- PvP Arena system
- Guild/Clan system
- Crafting system (combine materials)
- Enchantment system (upgrade quality)
- Pet/Companion system
- Daily quests
- Seasonal events
- Leaderboards

---

**Enjoy the grind, adventurer! May RNG be in your favor!** 🎲✨
