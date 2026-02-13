// ═══════════════════════════════════════════════════════════════
// ITEMS DATABASE
// All consumable items, potions, and quest items
// ═══════════════════════════════════════════════════════════════

const ITEMS = {
    // ═══════════════════════════════════════════════════════════════
    // HEALING POTIONS
    // ═══════════════════════════════════════════════════════════════
    health_potion: {
        name: 'Health Potion',
        subtype: 'heal_hp',
        power: 50,
        cost: 50,
        description: '+50 HP'
    },
    
    greater_health_potion: {
        name: 'Greater Health',
        subtype: 'heal_hp',
        power: 100,
        cost: 100,
        description: '+100 HP'
    },
    
    superior_health_potion: {
        name: 'Superior Health',
        subtype: 'heal_hp',
        power: 200,
        cost: 200,
        description: '+200 HP'
    },
    
    mana_potion: {
        name: 'Mana Potion',
        subtype: 'heal_mp',
        power: 40,
        cost: 60,
        description: '+40 MP'
    },
    
    greater_mana_potion: {
        name: 'Greater Mana',
        subtype: 'heal_mp',
        power: 80,
        cost: 120,
        description: '+80 MP'
    },
    
    superior_mana_potion: {
        name: 'Superior Mana',
        subtype: 'heal_mp',
        power: 150,
        cost: 250,
        description: '+150 MP'
    },
    
    elixir: {
        name: 'Elixir',
        subtype: 'full_restore',
        power: 0,
        cost: 300,
        description: 'Full HP/MP'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // BUFF POTIONS - XP & GOLD
    // ═══════════════════════════════════════════════════════════════
    exp_potion: {
        name: 'XP Boost',
        subtype: 'buff_xp',
        power: 25, // +25% XP
        duration: 900000, // 15 minutes
        cost: 500,
        description: '+25% XP (15min)'
    },
    
    greater_exp_potion: {
        name: 'Greater XP',
        subtype: 'buff_xp',
        power: 50, // +50% XP
        duration: 900000, // 15 minutes
        cost: 1000,
        description: '+50% XP (15min)'
    },
    
    gold_boost_potion: {
        name: 'Gold Boost',
        subtype: 'buff_gold',
        power: 30, // +30% Gold
        duration: 900000, // 15 minutes
        cost: 500,
        description: '+30% Gold (15min)'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // BUFF POTIONS - COMBAT STATS
    // ═══════════════════════════════════════════════════════════════
    strength_potion: {
        name: 'Strength Elixir',
        subtype: 'buff_str',
        power: 10, // +10 Strength
        duration: 300000, // 5 minutes
        cost: 200,
        description: '+10 STR (5min)'
    },
    
    greater_strength_potion: {
        name: 'Greater STR',
        subtype: 'buff_str',
        power: 20, // +20 Strength
        duration: 300000,
        cost: 400,
        description: '+20 STR (5min)'
    },
    
    defense_potion: {
        name: 'Defense Elixir',
        subtype: 'buff_def',
        power: 10, // +10 Defense
        duration: 300000, // 5 minutes
        cost: 200,
        description: '+10 DEF (5min)'
    },
    
    greater_defense_potion: {
        name: 'Greater DEF',
        subtype: 'buff_def',
        power: 20, // +20 Defense
        duration: 300000,
        cost: 400,
        description: '+20 DEF (5min)'
    },
    
    speed_potion: {
        name: 'Haste Potion',
        subtype: 'buff_speed',
        power: 20, // +20% attack speed (faster pip regen)
        duration: 300000, // 5 minutes
        cost: 250,
        description: '+20% Speed (5min)'
    },
    
    critical_potion: {
        name: 'Precision Elixir',
        subtype: 'buff_crit',
        power: 15, // +15% crit chance
        duration: 300000, // 5 minutes
        cost: 300,
        description: '+15% Crit (5min)'
    },
    
    magic_potion: {
        name: 'Magic Elixir',
        subtype: 'buff_magic',
        power: 15, // +15 Magic
        duration: 300000,
        cost: 250,
        description: '+15 MAG (5min)'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // SPECIAL BUFF POTIONS
    // ═══════════════════════════════════════════════════════════════
    berserker_rage: {
        name: 'Berserker Rage',
        subtype: 'buff_damage',
        power: 50, // +50% damage
        duration: 180000, // 3 minutes
        cost: 800,
        description: '+50% DMG (3min)'
    },
    
    invulnerability_potion: {
        name: 'Stone Skin',
        subtype: 'buff_invuln',
        power: 50, // +50% damage reduction
        duration: 120000, // 2 minutes
        cost: 1000,
        description: '+50% Resist (2min)'
    },
    
    lucky_charm: {
        name: 'Lucky Charm',
        subtype: 'buff_luck',
        power: 20, // +20 Luck
        duration: 600000, // 10 minutes
        cost: 400,
        description: '+20 LCK (10min)'
    },
    
    regeneration_potion: {
        name: 'Regeneration',
        subtype: 'buff_regen',
        power: 10, // +10 HP/sec
        duration: 300000, // 5 minutes
        cost: 500,
        description: '+10 HP/sec (5min)'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // QUEST & CRAFTING ITEMS
    // ═══════════════════════════════════════════════════════════════
    small_gem: {
        name: 'Small Gem',
        subtype: 'material',
        power: 0,
        cost: 10,
        description: 'Crafting material'
    },
    
    large_gem: {
        name: 'Large Gem',
        subtype: 'material',
        power: 0,
        cost: 50,
        description: 'Rare crafting material'
    },
    
    dragon_scale: {
        name: 'Dragon Scale',
        subtype: 'material',
        power: 0,
        cost: 200,
        description: 'Epic crafting material'
    },
    
    ancient_relic: {
        name: 'Ancient Relic',
        subtype: 'quest',
        power: 0,
        cost: 0,
        description: 'Quest item'
    },

    // ─── DUNGEON KEYS ─────────────────────────────────────────────────
    // Dropped by enemies, used to unlock colored doors in dungeons.
    bronze_key: {
        name: 'Bronze Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A tarnished bronze key. Opens bronze-locked dungeon doors.',
        icon: '🗝',
        keyType: 'bronze'
    },
    copper_key: {
        name: 'Copper Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A worn copper key. Opens copper-locked dungeon doors.',
        icon: '🗝',
        keyType: 'copper'
    },
    iron_key: {
        name: 'Iron Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A heavy iron key. Opens iron-locked dungeon doors.',
        icon: '🗝',
        keyType: 'iron'
    },
    brass_key: {
        name: 'Brass Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A polished brass key. Opens brass-locked dungeon doors.',
        icon: '🗝',
        keyType: 'brass'
    },
    silver_key: {
        name: 'Silver Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A gleaming silver key. Opens silver-locked dungeon doors.',
        icon: '🗝',
        keyType: 'silver'
    },
    electrum_key: {
        name: 'Electrum Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'An unusual electrum key. Opens electrum-locked dungeon doors.',
        icon: '🗝',
        keyType: 'electrum'
    },
    ruby_key: {
        name: 'Ruby Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A crimson ruby key. Opens ruby-locked dungeon doors.',
        icon: '🗝',
        keyType: 'ruby'
    },
    topaz_key: {
        name: 'Topaz Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'An amber topaz key. Opens topaz-locked dungeon doors.',
        icon: '🗝',
        keyType: 'topaz'
    },
    diamond_key: {
        name: 'Diamond Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A pristine diamond key. Opens diamond-locked dungeon doors.',
        icon: '🗝',
        keyType: 'diamond'
    },
    obsidian_key: {
        name: 'Obsidian Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A dark obsidian key. Opens obsidian-locked dungeon doors.',
        icon: '🗝',
        keyType: 'obsidian'
    },
    bone_key: {
        name: 'Bone Key',
        subtype: 'dungeon_key',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A gnarly bone key. Opens bone-locked dungeon doors.',
        icon: '🗝',
        keyType: 'bone'
    },

    // ─── DUNGEON MISC DROPS ───────────────────────────────────────────
    ancient_map: {
        name: 'Ancient Map',
        subtype: 'quest',
        power: 0,
        cost: 0,
        sellValue: 5,
        description: 'A crumbling map with cryptic markings.',
        icon: '📜'
    },
    dungeon_note: {
        name: 'Dungeon Note',
        subtype: 'quest',
        power: 0,
        cost: 0,
        sellValue: 0,
        description: 'A scrawled note left by a previous explorer.',
        icon: '📄'
    },
    rune_fragment: {
        name: 'Rune Fragment',
        subtype: 'material',
        power: 0,
        cost: 0,
        sellValue: 25,
        description: 'A shard of ancient rune stone. Seems valuable.',
        icon: '✦'
    },

    // ─── RECALL POTION ───────────────────────────────────────────────
    recall_potion: {
        name: 'Recall Potion',
        subtype: 'recall',
        power: 0,
        cost: 5000,
        sellValue: 0,           // can't be sold — too valuable
        maxStack: 1,            // only one can be held at a time
        description: 'Instantly return to town from any dungeon.',
        icon: '🌀',
        lore: 'A swirling vial of homeward magic. One sip and you are gone.'
    }
};

console.log('✅ Items loaded:', Object.keys(ITEMS).length, 'items');
