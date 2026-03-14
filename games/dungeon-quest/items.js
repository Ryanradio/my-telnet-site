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
        maxStack: 10,
        sellValue: 25,
        description: '+50 HP'
    },
    
    greater_health_potion: {
        name: 'Greater Health',
        subtype: 'heal_hp',
        power: 100,
        cost: 100,
        maxStack: 10,
        sellValue: 50,
        maxStack: 10,
        sellValue: 25,
        description: '+100 HP'
    },
    
    superior_health_potion: {
        name: 'Superior Health',
        subtype: 'heal_hp',
        power: 200,
        cost: 200,
        maxStack: 10,
        sellValue: 100,
        maxStack: 10,
        sellValue: 25,
        description: '+200 HP'
    },
    
    mana_potion: {
        name: 'Mana Potion',
        subtype: 'heal_mp',
        power: 40,
        cost: 60,
        maxStack: 10,
        sellValue: 30,
        description: '+40 MP'
    },
    
    greater_mana_potion: {
        name: 'Greater Mana',
        subtype: 'heal_mp',
        power: 80,
        cost: 120,
        maxStack: 10,
        sellValue: 60,
        maxStack: 10,
        sellValue: 30,
        description: '+80 MP'
    },
    
    superior_mana_potion: {
        name: 'Superior Mana',
        subtype: 'heal_mp',
        power: 150,
        cost: 250,
        maxStack: 10,
        sellValue: 125,
        maxStack: 10,
        sellValue: 30,
        description: '+150 MP'
    },
    
    elixir: {
        name: 'Elixir',
        subtype: 'full_restore',
        power: 0,
        cost: 300,
        maxStack: 10,
        sellValue: 150,
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
        maxStack: 10,
        sellValue: 250,
        description: '+25% XP (15min)'
    },
    
    greater_exp_potion: {
        name: 'Greater XP',
        subtype: 'buff_xp',
        power: 50, // +50% XP
        duration: 900000, // 15 minutes
        cost: 1000,
        maxStack: 10,
        sellValue: 500,
        maxStack: 10,
        sellValue: 250,
        description: '+50% XP (15min)'
    },
    
    gold_boost_potion: {
        name: 'Gold Boost',
        subtype: 'buff_gold',
        power: 30, // +30% Gold
        duration: 900000, // 15 minutes
        cost: 500,
        maxStack: 10,
        sellValue: 250,
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
        maxStack: 10,
        sellValue: 100,
        description: '+10 STR (5min)'
    },
    
    greater_strength_potion: {
        name: 'Greater STR',
        subtype: 'buff_str',
        power: 20, // +20 Strength
        duration: 300000,
        cost: 400,
        maxStack: 10,
        sellValue: 200,
        maxStack: 10,
        sellValue: 100,
        description: '+20 STR (5min)'
    },
    
    defense_potion: {
        name: 'Defense Elixir',
        subtype: 'buff_def',
        power: 10, // +10 Defense
        duration: 300000, // 5 minutes
        cost: 200,
        maxStack: 10,
        sellValue: 100,
        description: '+10 DEF (5min)'
    },
    
    greater_defense_potion: {
        name: 'Greater DEF',
        subtype: 'buff_def',
        power: 20, // +20 Defense
        duration: 300000,
        cost: 400,
        maxStack: 10,
        sellValue: 200,
        maxStack: 10,
        sellValue: 100,
        description: '+20 DEF (5min)'
    },
    
    speed_potion: {
        name: 'Haste Potion',
        subtype: 'buff_speed',
        power: 20, // +20% attack speed (faster pip regen)
        duration: 300000, // 5 minutes
        cost: 250,
        maxStack: 10,
        sellValue: 125,
        description: '+20% Speed (5min)'
    },
    
    critical_potion: {
        name: 'Precision Elixir',
        subtype: 'buff_crit',
        power: 15, // +15% crit chance
        duration: 300000, // 5 minutes
        cost: 300,
        maxStack: 10,
        sellValue: 150,
        description: '+15% Crit (5min)'
    },
    
    magic_potion: {
        name: 'Magic Elixir',
        subtype: 'buff_magic',
        power: 15, // +15 Magic
        duration: 300000,
        cost: 250,
        maxStack: 10,
        sellValue: 125,
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
        maxStack: 10,
        sellValue: 400,
        description: '+50% DMG (3min)'
    },
    
    invulnerability_potion: {
        name: 'Stone Skin',
        subtype: 'buff_invuln',
        power: 50, // +50% damage reduction
        duration: 120000, // 2 minutes
        cost: 1000,
        maxStack: 10,
        sellValue: 500,
        description: '+50% Resist (2min)'
    },
    
    lucky_charm: {
        name: 'Lucky Charm',
        subtype: 'buff_luck',
        power: 20, // +20 Luck
        duration: 600000, // 10 minutes
        cost: 400,
        maxStack: 10,
        sellValue: 200,
        description: '+20 LCK (10min)'
    },
    
    regeneration_potion: {
        name: 'Regeneration',
        subtype: 'buff_regen',
        power: 10, // +10 HP/sec
        duration: 300000, // 5 minutes
        cost: 500,
        maxStack: 10,
        sellValue: 250,
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
        sellValue: 5,
        description: 'A glittering gem. Worth a few coins to the right merchant.'
    },
    
    large_gem: {
        name: 'Large Gem',
        subtype: 'material',
        power: 0,
        cost: 50,
        sellValue: 25,
        description: 'A fine quality gem. Merchants pay well for these.'
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

    // ═══════════════════════════════════════════════════════════════
    // STAFF OF ANCIENTS — 8 Collectible Pieces
    // Collect all 8 pieces and bring them to the Staff Pedestal room
    // to trigger a blinding teleportation event.
    // ═══════════════════════════════════════════════════════════════
    staff_piece_1: {
        name: 'Staff Piece I — The Base',
        subtype: 'staff_piece',
        staffPieceNumber: 1,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A gnarled obsidian base, humming faintly with trapped energy.',
        lore: 'The first of eight. The journey of a thousand years begins here.'
    },
    staff_piece_2: {
        name: 'Staff Piece II — The Shaft',
        subtype: 'staff_piece',
        staffPieceNumber: 2,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A length of petrified dragon-wood, warm to the touch.',
        lore: "Carved from a tree that grew beside a dragon's lair for five centuries."
    },
    staff_piece_3: {
        name: 'Staff Piece III — The Binding',
        subtype: 'staff_piece',
        staffPieceNumber: 3,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'Coils of ancient copper wire wrapped in worn leather strips.',
        lore: 'These bindings once held together a weapon of immeasurable power.'
    },
    staff_piece_4: {
        name: 'Staff Piece IV — The Rune Ring',
        subtype: 'staff_piece',
        staffPieceNumber: 4,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A ring of carved rune-stone that crackles with static.',
        lore: 'The runes shift when no one is watching. Do not look away.'
    },
    staff_piece_5: {
        name: 'Staff Piece V — The Conduit',
        subtype: 'staff_piece',
        staffPieceNumber: 5,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A hollow crystal tube that channels raw magical current.',
        lore: 'Touch it and feel the pulse of something ancient and hungry.'
    },
    staff_piece_6: {
        name: 'Staff Piece VI — The Focus Lens',
        subtype: 'staff_piece',
        staffPieceNumber: 6,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A fractured emerald lens that bends light unnaturally.',
        lore: 'Stare through it too long and you may see where the staff wants to take you.'
    },
    staff_piece_7: {
        name: 'Staff Piece VII — The Collar',
        subtype: 'staff_piece',
        staffPieceNumber: 7,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A tight silver collar etched with celestial star maps.',
        lore: 'The stars it depicts do not match any known sky.'
    },
    staff_piece_8: {
        name: 'Staff Piece VIII — The Crown Gem',
        subtype: 'staff_piece',
        staffPieceNumber: 8,
        power: 0,
        cost: 0,
        sellValue: 0,
        maxStack: 1,
        icon: '🪄',
        description: 'A pulsing violet gemstone that hovers above your palm.',
        lore: 'The final piece. It trembles in your hand, eager to be reunited with the others.'
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
    },

// ═══════════════════════════════════════════════════════════════
    // MONSTER DROP ITEMS — Materials, Trophy Items & Loot
    // All sellable at merchants. Subtypes: material (no effect, sell only)
    // ═══════════════════════════════════════════════════════════════

    // ── Common Monster Parts ───────────────────────────────────────────────────
    rat_tail: {
        name: 'Rat Tail',
        subtype: 'material',
        icon: '🐀',
        power: 0,
        cost: 8,
        sellValue: 4,
        description: 'A wiry grey tail. Alchemists use it for... something.',
    },
    wolf_pelt: {
        name: 'Wolf Pelt',
        subtype: 'material',
        icon: '🐺',
        power: 0,
        cost: 20,
        sellValue: 10,
        description: 'Thick grey fur, still warm.',
    },
    bat_wing: {
        name: 'Bat Wing',
        subtype: 'material',
        icon: '🦇',
        power: 0,
        cost: 12,
        sellValue: 6,
        description: 'Leathery and foul-smelling. Surprisingly useful.',
    },
    slime_gel: {
        name: 'Slime Gel',
        subtype: 'material',
        icon: '🟢',
        power: 0,
        cost: 10,
        sellValue: 5,
        description: 'A gooey blob of slime. Viscous and mildly corrosive.',
    },
    boar_hide: {
        name: 'Boar Hide',
        subtype: 'material',
        icon: '🐗',
        power: 0,
        cost: 18,
        sellValue: 9,
        description: 'Thick tanned hide from a wild boar.',
    },
    spider_silk: {
        name: 'Spider Silk',
        subtype: 'material',
        icon: '🕷️',
        power: 0,
        cost: 25,
        sellValue: 12,
        description: 'Incredibly strong fibres. Weavers pay well for this.',
    },
    bone_dust: {
        name: 'Bone Dust',
        subtype: 'material',
        icon: '💀',
        power: 0,
        cost: 15,
        sellValue: 7,
        description: 'Ground bone fragments. Used in dark alchemy.',
    },
    imp_dust: {
        name: 'Imp Dust',
        subtype: 'material',
        icon: '✨',
        power: 0,
        cost: 20,
        sellValue: 10,
        description: 'Glittering powder shed from an imp. Mildly magical.',
    },
    imp_horn: {
        name: 'Imp Horn',
        subtype: 'material',
        icon: '😈',
        power: 0,
        cost: 22,
        sellValue: 11,
        description: 'A small curved horn. Used in minor enchantments.',
    },
    frog_legs: {
        name: 'Frog Legs',
        subtype: 'material',
        icon: '🐸',
        power: 0,
        cost: 12,
        sellValue: 6,
        description: 'Plump and fresh. Alchemists and cooks both want these.',
    },
    troll_moss: {
        name: 'Troll Moss',
        subtype: 'material',
        icon: '🌿',
        power: 0,
        cost: 30,
        sellValue: 15,
        description: 'Pungent green moss scraped from troll skin.',
    },
    worm_hide: {
        name: 'Worm Hide',
        subtype: 'material',
        icon: '🪱',
        power: 0,
        cost: 18,
        sellValue: 9,
        description: 'Ridged and tough. Tougher than it looks.',
    },
    shell_shard: {
        name: 'Shell Shard',
        subtype: 'material',
        icon: '🐚',
        power: 0,
        cost: 20,
        sellValue: 10,
        description: 'A fragment of hardened crab or snail shell.',
    },
    crab_claw: {
        name: 'Crab Claw',
        subtype: 'material',
        icon: '🦀',
        power: 0,
        cost: 28,
        sellValue: 14,
        description: 'A serrated pincer still sharp at the edge.',
    },
    spore_sac: {
        name: 'Spore Sac',
        subtype: 'material',
        icon: '🍄',
        power: 0,
        cost: 18,
        sellValue: 9,
        description: 'A puffball sac filled with fungal spores.',
    },
    fungal_extract: {
        name: 'Fungal Extract',
        subtype: 'material',
        icon: '🍄',
        power: 0,
        cost: 25,
        sellValue: 12,
        description: 'Concentrated mushroom compound. Used in potions.',
    },
    iron_ingot: {
        name: 'Iron Ingot',
        subtype: 'material',
        icon: '⚙️',
        power: 0,
        cost: 35,
        sellValue: 17,
        description: 'A rough bar of smelted iron. Blacksmiths need these.',
    },
    ironwood: {
        name: 'Ironwood',
        subtype: 'material',
        icon: '🪵',
        power: 0,
        cost: 40,
        sellValue: 20,
        description: 'Dense petrified wood. Heavy as metal.',
    },
    iron_tusk: {
        name: 'Iron Tusk',
        subtype: 'material',
        icon: '🦷',
        power: 0,
        cost: 30,
        sellValue: 15,
        description: 'A boar or beast tusk, hard as iron.',
    },
    thorn_shard: {
        name: 'Thorn Shard',
        subtype: 'material',
        icon: '🌵',
        power: 0,
        cost: 22,
        sellValue: 11,
        description: 'A razor-sharp thorn from a corrupted plant beast.',
    },
    lockpicks: {
        name: 'Lockpicks',
        subtype: 'material',
        icon: '🔑',
        power: 0,
        cost: 45,
        sellValue: 22,
        description: 'A set of thin metal picks. Useful in dungeons.',
    },
    wasp_stinger: {
        name: 'Wasp Stinger',
        subtype: 'material',
        icon: '🐝',
        power: 0,
        cost: 35,
        sellValue: 17,
        description: 'A barbed stinger dripping acidic venom.',
    },
    venom_gland: {
        name: 'Venom Gland',
        subtype: 'material',
        icon: '💀',
        power: 0,
        cost: 55,
        sellValue: 27,
        description: 'A delicate gland brimming with concentrated toxin.',
    },
    scorpion_venom: {
        name: 'Scorpion Venom',
        subtype: 'material',
        icon: '🦂',
        power: 0,
        cost: 60,
        sellValue: 30,
        description: 'A vial of harvested scorpion toxin.',
    },
    leech_extract: {
        name: 'Leech Extract',
        subtype: 'material',
        icon: '🩸',
        power: 0,
        cost: 40,
        sellValue: 20,
        description: 'Oily fluid from a giant leech. Anticoagulant.',
    },
    snake_skin: {
        name: 'Snake Skin',
        subtype: 'material',
        icon: '🐍',
        power: 0,
        cost: 35,
        sellValue: 17,
        description: 'Iridescent shed skin from a water snake.',
    },
    snake_venom: {
        name: 'Snake Venom',
        subtype: 'material',
        icon: '💚',
        power: 0,
        cost: 55,
        sellValue: 27,
        description: 'A milked vial of potent snake venom.',
    },

    // ── Pelts & Rare Parts ───────────────────────────────────────────────────
    ghoul_claw: {
        name: 'Ghoul Claw',
        subtype: 'material',
        icon: '☠️',
        power: 0,
        cost: 55,
        sellValue: 27,
        description: 'A ragged blackened claw. Still carries the rot.',
    },
    dire_pelt: {
        name: 'Dire Pelt',
        subtype: 'material',
        icon: '🐺',
        power: 0,
        cost: 75,
        sellValue: 37,
        description: 'Immense fur from a dire wolf. Exceptional quality.',
    },
    gnoll_hide: {
        name: 'Gnoll Hide',
        subtype: 'material',
        icon: '🪖',
        power: 0,
        cost: 50,
        sellValue: 25,
        description: 'Spotted hyena-man hide. Tough and pungent.',
    },
    chitin_shard: {
        name: 'Chitin Shard',
        subtype: 'material',
        icon: '🦂',
        power: 0,
        cost: 60,
        sellValue: 30,
        description: 'A plate-sized fragment of beetle carapace.',
    },
    scale_shard: {
        name: 'Scale Shard',
        subtype: 'material',
        icon: '🐉',
        power: 0,
        cost: 65,
        sellValue: 32,
        description: 'A broken scale from a large reptile.',
    },
    drake_scale: {
        name: 'Drake Scale',
        subtype: 'material',
        icon: '🐉',
        power: 0,
        cost: 120,
        sellValue: 60,
        description: 'Thick iridescent scale from a young drake.',
    },
    frozen_scale: {
        name: 'Frozen Scale',
        subtype: 'material',
        icon: '❄️',
        power: 0,
        cost: 100,
        sellValue: 50,
        description: 'A scale that never warms. Ice to the touch.',
    },
    wyrm_scale: {
        name: 'Wyrm Scale',
        subtype: 'material',
        icon: '🐍',
        power: 0,
        cost: 150,
        sellValue: 75,
        description: 'Heavy scale from a great wyrm. Near-indestructible.',
    },
    wyvern_scale: {
        name: 'Wyvern Scale',
        subtype: 'material',
        icon: '🐉',
        power: 0,
        cost: 140,
        sellValue: 70,
        description: 'Razor-edged scale from a wyvern.',
    },
    hydra_scale: {
        name: 'Hydra Scale',
        subtype: 'material',
        icon: '🐍',
        power: 0,
        cost: 200,
        sellValue: 100,
        description: 'Multi-tinted scale that regenerates if left alone.',
    },
    lion_mane: {
        name: 'Lion Mane',
        subtype: 'material',
        icon: '🦁',
        power: 0,
        cost: 80,
        sellValue: 40,
        description: 'A full golden mane. Prized by collectors.',
    },
    lynx_pelt: {
        name: 'Lynx Pelt',
        subtype: 'material',
        icon: '🐱',
        power: 0,
        cost: 70,
        sellValue: 35,
        description: 'Spotted fine-fur pelt. Worth good coin.',
    },
    yeti_fur: {
        name: 'Yeti Fur',
        subtype: 'material',
        icon: '🏔️',
        power: 0,
        cost: 110,
        sellValue: 55,
        description: 'Thick white fur, warm even in a blizzard.',
    },
    hawk_talon: {
        name: 'Hawk Talon',
        subtype: 'material',
        icon: '🦅',
        power: 0,
        cost: 45,
        sellValue: 22,
        description: 'A curved razor talon from a giant hawk.',
    },
    harpy_feather: {
        name: 'Harpy Feather',
        subtype: 'material',
        icon: '🪶',
        power: 0,
        cost: 70,
        sellValue: 35,
        description: 'A long iridescent feather. Magical properties.',
    },
    angel_wing: {
        name: 'Angel Wing',
        subtype: 'material',
        icon: '🪶',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'A pristine white feather humming with divine light.',
    },
    fallen_wing: {
        name: 'Fallen Wing',
        subtype: 'material',
        icon: '🖤',
        power: 0,
        cost: 280,
        sellValue: 140,
        description: 'A blackened feather from a corrupted celestial.',
    },
    seraphim_feather: {
        name: 'Seraphim Feather',
        subtype: 'material',
        icon: '✨',
        power: 0,
        cost: 500,
        sellValue: 250,
        description: 'Radiates warmth. Cannot be burned or destroyed.',
    },
    phoenix_feather: {
        name: 'Phoenix Feather',
        subtype: 'material',
        icon: '🔥',
        power: 0,
        cost: 400,
        sellValue: 200,
        description: 'Regrowing plume from a phoenix. Burns cold to the touch.',
    },

    // ── Essences & Magical Materials ───────────────────────────────────────────────────
    dark_essence: {
        name: 'Dark Essence',
        subtype: 'material',
        icon: '🌑',
        power: 0,
        cost: 80,
        sellValue: 40,
        description: 'Crystallized shadow energy. Rare and valuable.',
    },
    ghost_essence: {
        name: 'Ghost Essence',
        subtype: 'material',
        icon: '👻',
        power: 0,
        cost: 90,
        sellValue: 45,
        description: 'Bottled spiritual residue. Floats in the vial.',
    },
    spirit_essence: {
        name: 'Spirit Essence',
        subtype: 'material',
        icon: '💨',
        power: 0,
        cost: 100,
        sellValue: 50,
        description: 'The lingering core of a departed spirit.',
    },
    shadow_essence: {
        name: 'Shadow Essence',
        subtype: 'material',
        icon: '🌑',
        power: 0,
        cost: 100,
        sellValue: 50,
        description: 'Concentrated living shadow, bound in glass.',
    },
    wisp_essence: {
        name: 'Wisp Essence',
        subtype: 'material',
        icon: '💡',
        power: 0,
        cost: 110,
        sellValue: 55,
        description: 'The captured light of a will-o-wisp. Glows faintly.',
    },
    ectoplasm: {
        name: 'Ectoplasm',
        subtype: 'material',
        icon: '👻',
        power: 0,
        cost: 60,
        sellValue: 30,
        description: 'Translucent goo left behind by spectral entities.',
    },
    nature_essence: {
        name: 'Nature Essence',
        subtype: 'material',
        icon: '🌿',
        power: 0,
        cost: 120,
        sellValue: 60,
        description: 'Concentrated life-force from a nature elemental.',
    },
    fire_essence: {
        name: 'Fire Essence',
        subtype: 'material',
        icon: '🔥',
        power: 0,
        cost: 130,
        sellValue: 65,
        description: 'A shard of pure flame, trapped in magical glass.',
    },
    fire_core: {
        name: 'Fire Core',
        subtype: 'material',
        icon: '🔥',
        power: 0,
        cost: 180,
        sellValue: 90,
        description: 'The burning heart of a fire elemental.',
    },
    frost_heart: {
        name: 'Frost Heart',
        subtype: 'material',
        icon: '❄️',
        power: 0,
        cost: 180,
        sellValue: 90,
        description: 'The frozen core of a frost elemental.',
    },
    ice_crystal: {
        name: 'Ice Crystal',
        subtype: 'material',
        icon: '🧊',
        power: 0,
        cost: 100,
        sellValue: 50,
        description: 'A shard of magical ice that never melts.',
    },
    arcane_dust: {
        name: 'Arcane Dust',
        subtype: 'material',
        icon: '✨',
        power: 0,
        cost: 150,
        sellValue: 75,
        description: 'Shimmering powder from an arcane construct.',
    },
    swamp_essence: {
        name: 'Swamp Essence',
        subtype: 'material',
        icon: '🌊',
        power: 0,
        cost: 70,
        sellValue: 35,
        description: 'Murky essence distilled from a bog creature.',
    },
    swamp_heart: {
        name: 'Swamp Heart',
        subtype: 'material',
        icon: '💚',
        power: 0,
        cost: 160,
        sellValue: 80,
        description: 'Pulsing core of a swamp elemental.',
    },
    golem_core: {
        name: 'Golem Core',
        subtype: 'material',
        icon: '⚙️',
        power: 0,
        cost: 200,
        sellValue: 100,
        description: 'The animating crystal from a construct golem.',
    },
    guardian_core: {
        name: 'Guardian Core',
        subtype: 'material',
        icon: '⚙️',
        power: 0,
        cost: 250,
        sellValue: 125,
        description: 'The core of an ancient stone guardian.',
    },
    magma_core: {
        name: 'Magma Core',
        subtype: 'material',
        icon: '🌋',
        power: 0,
        cost: 220,
        sellValue: 110,
        description: 'Still-liquid magma encased in enchanted glass.',
    },
    magma_scale: {
        name: 'Magma Scale',
        subtype: 'material',
        icon: '🌋',
        power: 0,
        cost: 180,
        sellValue: 90,
        description: 'Scale from a magma lizard. Searing hot.',
    },
    void_crystal: {
        name: 'Void Crystal',
        subtype: 'material',
        icon: '🔮',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'Crackling with anti-matter energy.',
    },
    chaos_essence: {
        name: 'Chaos Essence',
        subtype: 'material',
        icon: '🌀',
        power: 0,
        cost: 280,
        sellValue: 140,
        description: 'Raw chaotic energy in crystalline form.',
    },
    corrupted_essence: {
        name: 'Corrupted Essence',
        subtype: 'material',
        icon: '☠️',
        power: 0,
        cost: 200,
        sellValue: 100,
        description: 'Essence warped by dark magic.',
    },
    soul_essence: {
        name: 'Soul Essence',
        subtype: 'material',
        icon: '💜',
        power: 0,
        cost: 250,
        sellValue: 125,
        description: 'A bottled soul, glowing faintly.',
    },
    null_essence: {
        name: 'Null Essence',
        subtype: 'material',
        icon: '⬛',
        power: 0,
        cost: 350,
        sellValue: 175,
        description: 'Essence from the void between worlds.',
    },
    nihil_essence: {
        name: 'Nihil Essence',
        subtype: 'material',
        icon: '⬛',
        power: 0,
        cost: 400,
        sellValue: 200,
        description: 'The absence of existence given form.',
    },
    entropy_core: {
        name: 'Entropy Core',
        subtype: 'material',
        icon: '🌀',
        power: 0,
        cost: 380,
        sellValue: 190,
        description: 'A core of pure entropy. Things decay near it.',
    },
    reality_shard: {
        name: 'Reality Shard',
        subtype: 'material',
        icon: '💎',
        power: 0,
        cost: 500,
        sellValue: 250,
        description: 'A fragment of crystallized reality.',
    },
    rebirth_essence: {
        name: 'Rebirth Essence',
        subtype: 'material',
        icon: '🌟',
        power: 0,
        cost: 450,
        sellValue: 225,
        description: 'The essence of something reborn from death.',
    },
    rune_shard: {
        name: 'Rune Shard',
        subtype: 'material',
        icon: '✦',
        power: 0,
        cost: 80,
        sellValue: 40,
        description: 'A fragment of an ancient rune-carved stone.',
    },
    gold_coins: {
        name: 'Gold Coins',
        subtype: 'material',
        icon: '💰',
        power: 0,
        cost: 50,
        sellValue: 50,
        description: 'A loose pouch of gold coins.',
    },
    blood_vial: {
        name: 'Blood Vial',
        subtype: 'material',
        icon: '🩸',
        power: 0,
        cost: 45,
        sellValue: 22,
        description: 'A sealed vial of dark crimson blood.',
    },
    blood_ruby: {
        name: 'Blood Ruby',
        subtype: 'material',
        icon: '💎',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'A deep red gemstone pulsing with internal light.',
    },

    // ── Demonic & Exotic Trophies ───────────────────────────────────────────────────
    demon_horn: {
        name: 'Demon Horn',
        subtype: 'material',
        icon: '😈',
        power: 0,
        cost: 180,
        sellValue: 90,
        description: 'A twisted horn from a demon. Exudes heat.',
    },
    demon_core: {
        name: 'Demon Core',
        subtype: 'material',
        icon: '😈',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'The burning soul-core of a lesser demon.',
    },
    demon_crown: {
        name: 'Demon Crown',
        subtype: 'material',
        icon: '👑',
        power: 0,
        cost: 500,
        sellValue: 250,
        description: 'A crown of bone and infernal fire.',
    },
    demon_leather: {
        name: 'Demon Leather',
        subtype: 'material',
        icon: '😈',
        power: 0,
        cost: 250,
        sellValue: 125,
        description: 'Heat-treated hide from a demon. Fireproof.',
    },
    dragon_bone: {
        name: 'Dragon Bone',
        subtype: 'material',
        icon: '🦴',
        power: 0,
        cost: 350,
        sellValue: 175,
        description: 'Dense as iron and impossibly light.',
    },
    dragon_tooth: {
        name: 'Dragon Tooth',
        subtype: 'material',
        icon: '🦷',
        power: 0,
        cost: 400,
        sellValue: 200,
        description: 'A tooth the size of a short sword.',
    },
    dragon_heart: {
        name: 'Dragon Heart',
        subtype: 'material',
        icon: '❤️',
        power: 0,
        cost: 1000,
        sellValue: 500,
        description: 'Still warm. Radiates immense power.',
    },
    basilisk_eye: {
        name: 'Basilisk Eye',
        subtype: 'material',
        icon: '👁️',
        power: 0,
        cost: 350,
        sellValue: 175,
        description: 'Handle carefully — even severed it has power.',
    },
    cursed_bone: {
        name: 'Cursed Bone',
        subtype: 'material',
        icon: '☠️',
        power: 0,
        cost: 120,
        sellValue: 60,
        description: 'A bone that whispers when you hold it.',
    },
    cursed_amulet: {
        name: 'Cursed Amulet',
        subtype: 'material',
        icon: '🔮',
        power: 0,
        cost: 200,
        sellValue: 100,
        description: 'Radiates malice. Dangerous to carry too long.',
    },
    phylactery: {
        name: 'Phylactery',
        subtype: 'material',
        icon: '💀',
        power: 0,
        cost: 600,
        sellValue: 300,
        description: "A lich's soul vessel, cracked but still active.",
    },
    shaman_totem: {
        name: 'Shaman Totem',
        subtype: 'material',
        icon: '🪆',
        power: 0,
        cost: 90,
        sellValue: 45,
        description: 'A carved fetish still humming with tribal magic.',
    },
    witch_brew: {
        name: 'Witch Brew',
        subtype: 'material',
        icon: '🧪',
        power: 0,
        cost: 80,
        sellValue: 40,
        description: 'Foul-smelling cauldron mixture in a stoppered flask.',
    },
    plague_sample: {
        name: 'Plague Sample',
        subtype: 'material',
        icon: '☣️',
        power: 0,
        cost: 150,
        sellValue: 75,
        description: 'A sealed vial of disease. Handle with extreme care.',
    },

    // ── Gems ───────────────────────────────────────────────────
    medium_gem: {
        name: 'Medium Gem',
        subtype: 'material',
        icon: '💎',
        power: 0,
        cost: 0,
        sellValue: 50,
        description: 'A well-cut gemstone. Merchants offer good coin.',
    },
    huge_gem: {
        name: 'Huge Gem',
        subtype: 'material',
        icon: '💎',
        power: 0,
        cost: 0,
        sellValue: 500,
        description: 'An enormous gem radiating inner fire.',
    },
    pristine_gem: {
        name: 'Pristine Gem',
        subtype: 'material',
        icon: '💎',
        power: 0,
        cost: 0,
        sellValue: 200,
        description: 'A flawless stone of extraordinary clarity.',
    },

    // ── Armor Drops ───────────────────────────────────────────────────
    stone_armor: {
        name: 'Stone Armor',
        subtype: 'material',
        icon: '🪨',
        power: 0,
        cost: 200,
        sellValue: 100,
        description: 'Heavy armor carved from enchanted stone.',
    },
    cloth_armor: {
        name: 'Cloth Armor',
        subtype: 'material',
        icon: '👕',
        power: 0,
        cost: 20,
        sellValue: 10,
        description: 'Basic cloth padding. Better than nothing.',
    },
    noble_robes: {
        name: 'Noble Robes',
        subtype: 'material',
        icon: '🥻',
        power: 0,
        cost: 150,
        sellValue: 75,
        description: 'Fine embroidered garments of a fallen noble.',
    },
    dark_robes: {
        name: 'Dark Robes',
        subtype: 'material',
        icon: '🥷',
        power: 0,
        cost: 200,
        sellValue: 100,
        description: 'Hooded robes of midnight black.',
    },
    shadow_cloth: {
        name: 'Shadow Cloth',
        subtype: 'material',
        icon: '🌑',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'Cloth woven from solidified shadow.',
    },
    enchanted_robes: {
        name: 'Enchanted Robes',
        subtype: 'material',
        icon: '✨',
        power: 0,
        cost: 350,
        sellValue: 175,
        description: 'Robes stitched with glowing sigils.',
    },
    oracle_robes: {
        name: 'Oracle Robes',
        subtype: 'material',
        icon: '🔮',
        power: 0,
        cost: 400,
        sellValue: 200,
        description: 'Robes worn by a seer, imbued with prophecy.',
    },
    nihil_robes: {
        name: 'Nihil Robes',
        subtype: 'material',
        icon: '⬛',
        power: 0,
        cost: 600,
        sellValue: 300,
        description: 'Robes that seem to absorb light itself.',
    },
    bog_armor: {
        name: 'Bog Armor',
        subtype: 'material',
        icon: '🌿',
        power: 0,
        cost: 90,
        sellValue: 45,
        description: 'Armor grown from dense swamp vegetation.',
    },
    chitin_armor: {
        name: 'Chitin Armor',
        subtype: 'material',
        icon: '🦂',
        power: 0,
        cost: 180,
        sellValue: 90,
        description: 'Plates of giant insect carapace, lashed together.',
    },
    frost_armor: {
        name: 'Frost Armor',
        subtype: 'material',
        icon: '❄️',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'Armor permanently coated in enchanted ice.',
    },
    ice_armor: {
        name: 'Ice Armor',
        subtype: 'material',
        icon: '🧊',
        power: 0,
        cost: 280,
        sellValue: 140,
        description: 'Solid ice armor, shaped by magic.',
    },
    flame_armor: {
        name: 'Flame Armor',
        subtype: 'material',
        icon: '🔥',
        power: 0,
        cost: 320,
        sellValue: 160,
        description: 'Armor wreathed in perpetual flames.',
    },
    lava_armor: {
        name: 'Lava Armor',
        subtype: 'material',
        icon: '🌋',
        power: 0,
        cost: 380,
        sellValue: 190,
        description: 'Forged from cooled magma. Nearly liquid at the seams.',
    },
    tainted_plate: {
        name: 'Tainted Plate',
        subtype: 'material',
        icon: '☠️',
        power: 0,
        cost: 250,
        sellValue: 125,
        description: 'Plate armor stained with dark magic.',
    },
    flesh_armor: {
        name: 'Flesh Armor',
        subtype: 'material',
        icon: '🩸',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'Grotesque armor grown from living tissue.',
    },
    crypt_armor: {
        name: 'Crypt Armor',
        subtype: 'material',
        icon: '💀',
        power: 0,
        cost: 280,
        sellValue: 140,
        description: 'Armor assembled from dungeon corpses.',
    },
    fiend_armor: {
        name: 'Fiend Armor',
        subtype: 'material',
        icon: '😈',
        power: 0,
        cost: 500,
        sellValue: 250,
        description: 'Plate forged in hellfire.',
    },
    chaos_armor: {
        name: 'Chaos Armor',
        subtype: 'material',
        icon: '🌀',
        power: 0,
        cost: 600,
        sellValue: 300,
        description: 'Armor that shifts and writhes.',
    },
    void_armor: {
        name: 'Void Armor',
        subtype: 'material',
        icon: '⬛',
        power: 0,
        cost: 800,
        sellValue: 400,
        description: 'Armor made from the fabric of void space.',
    },
    ancient_armor: {
        name: 'Ancient Armor',
        subtype: 'material',
        icon: '🏛️',
        power: 0,
        cost: 500,
        sellValue: 250,
        description: 'Armor from a fallen civilization.',
    },
    enchanted_plate: {
        name: 'Enchanted Plate',
        subtype: 'material',
        icon: '✨',
        power: 0,
        cost: 450,
        sellValue: 225,
        description: 'Plate armor shimmering with defensive enchantments.',
    },
    steel_plate: {
        name: 'Steel Plate',
        subtype: 'material',
        icon: '🛡️',
        power: 0,
        cost: 300,
        sellValue: 150,
        description: 'Solid steel plate armor.',
    },
    blessed_plate: {
        name: 'Blessed Plate',
        subtype: 'material',
        icon: '✝️',
        power: 0,
        cost: 600,
        sellValue: 300,
        description: 'Plate armor consecrated by a high priest.',
    },
    divine_armor: {
        name: 'Divine Armor',
        subtype: 'material',
        icon: '👼',
        power: 0,
        cost: 1000,
        sellValue: 500,
        description: 'Forged in celestial fire by divine hands.',
    },
    void_crown: {
        name: 'Void Crown',
        subtype: 'material',
        icon: '👑',
        power: 0,
        cost: 800,
        sellValue: 400,
        description: 'A crown that seems to absorb all light around it.',
    },
    corrupted_halo: {
        name: 'Corrupted Halo',
        subtype: 'material',
        icon: '😇',
        power: 0,
        cost: 700,
        sellValue: 350,
        description: 'A divine halo twisted by dark magic.',
    },

    // ── Legendary Weapons (Boss Drops) ───────────────────────────────────────────────────
    dragonslayer: {
        name: 'Dragonslayer',
        subtype: 'material',
        icon: '🐉',
        power: 0,
        cost: 0,
        sellValue: 1200,
        description: 'A blade forged specifically to kill dragons.',
    },
    excalibur: {
        name: 'Excalibur',
        subtype: 'material',
        icon: '⚔️',
        power: 0,
        cost: 0,
        sellValue: 5000,
        description: 'The legendary sword. Unparalleled.',
    },
    divine_artifact: {
        name: 'Divine Artifact',
        subtype: 'material',
        icon: '👼',
        power: 0,
        cost: 0,
        sellValue: 3000,
        description: 'An object of pure divine power.',
    },
    corrupted_mjolnir: {
        name: 'Corrupted Mjolnir',
        subtype: 'material',
        icon: '⚡',
        power: 0,
        cost: 0,
        sellValue: 2000,
        description: 'A shattered divine hammer, oozing dark power.',
    },

// TOTAL NEW ITEMS: 164,

    // ── Special / Joke Items ───────────────────────────────────────────────────
    flawless_gem: {
        name: 'Flawless Gem',
        subtype: 'material',
        icon: '💎',
        power: 0,
        cost: 0,
        sellValue: 1000,
        description: 'A gem of impossible perfection. Worth a fortune.',
    },
    golden_poop: {
        name: 'Golden Poop',
        subtype: 'material',
        icon: '💩',
        power: 0,
        cost: 0,
        sellValue: 500,
        description: 'Somehow worth a lot of gold. You decide not to think too hard about it.',
    },

        // ═══════════════════════════════════════════════════════════════
    // RAW GEMS - Drop from enemies, need to be cut at blacksmith
    // Format: raw_[type]_t[tier]
    // ═══════════════════════════════════════════════════════════════
    
    // Tier 1 Raw Gems (Levels 1-6)
    raw_ruby_t1: {
        name: 'T1 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🔴',
        description: 'A rough ruby crystal. Take it to the blacksmith to cut.'
    },
    raw_sapphire_t1: {
        name: 'T1 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🔵',
        description: 'A rough sapphire crystal. Take it to the blacksmith to cut.'
    },
    raw_topaz_t1: {
        name: 'T1 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🟡',
        description: 'A rough topaz crystal. Take it to the blacksmith to cut.'
    },
    raw_emerald_t1: {
        name: 'T1 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🟢',
        description: 'A rough emerald crystal. Take it to the blacksmith to cut.'
    },
    raw_amethyst_t1: {
        name: 'T1 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🟣',
        description: 'A rough amethyst crystal. Take it to the blacksmith to cut.'
    },
    raw_onyx_t1: {
        name: 'T1 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '⬛',
        description: 'A rough onyx crystal. Take it to the blacksmith to cut.'
    },
    raw_opal_t1: {
        name: 'T1 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🔷',
        description: 'A rough opal crystal. Take it to the blacksmith to cut.'
    },
    raw_garnet_t1: {
        name: 'T1 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 1,
        power: 0,
        cost: 0,
        sellValue: 25,
        maxStack: 20,
        icon: '🟤',
        description: 'A rough garnet crystal. Take it to the blacksmith to cut.'
    },
    
    // Tier 2 Raw Gems (Levels 7-12)
    raw_ruby_t2: {
        name: 'T2 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🔴',
        description: 'A high-quality raw ruby. Will cut into a powerful gem.'
    },
    raw_sapphire_t2: {
        name: 'T2 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🔵',
        description: 'A high-quality raw sapphire. Will cut into a powerful gem.'
    },
    raw_topaz_t2: {
        name: 'T2 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🟡',
        description: 'A high-quality raw topaz. Will cut into a powerful gem.'
    },
    raw_emerald_t2: {
        name: 'T2 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🟢',
        description: 'A high-quality raw emerald. Will cut into a powerful gem.'
    },
    raw_amethyst_t2: {
        name: 'T2 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🟣',
        description: 'A high-quality raw amethyst. Will cut into a powerful gem.'
    },
    raw_onyx_t2: {
        name: 'T2 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '⬛',
        description: 'A high-quality raw onyx. Will cut into a powerful gem.'
    },
    raw_opal_t2: {
        name: 'T2 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🔷',
        description: 'A high-quality raw opal. Will cut into a powerful gem.'
    },
    raw_garnet_t2: {
        name: 'T2 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 2,
        power: 0,
        cost: 0,
        sellValue: 50,
        maxStack: 20,
        icon: '🟤',
        description: 'A high-quality raw garnet. Will cut into a powerful gem.'
    },
    
    // Tier 3 Raw Gems (Levels 13-18)
    raw_ruby_t3: {
        name: 'T3 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🔴',
        description: 'An exceptional raw ruby. Will cut into a very powerful gem.'
    },
    raw_sapphire_t3: {
        name: 'T3 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🔵',
        description: 'An exceptional raw sapphire. Will cut into a very powerful gem.'
    },
    raw_topaz_t3: {
        name: 'T3 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🟡',
        description: 'An exceptional raw topaz. Will cut into a very powerful gem.'
    },
    raw_emerald_t3: {
        name: 'T3 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🟢',
        description: 'An exceptional raw emerald. Will cut into a very powerful gem.'
    },
    raw_amethyst_t3: {
        name: 'T3 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🟣',
        description: 'An exceptional raw amethyst. Will cut into a very powerful gem.'
    },
    raw_onyx_t3: {
        name: 'T3 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '⬛',
        description: 'An exceptional raw onyx. Will cut into a very powerful gem.'
    },
    raw_opal_t3: {
        name: 'T3 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🔷',
        description: 'An exceptional raw opal. Will cut into a very powerful gem.'
    },
    raw_garnet_t3: {
        name: 'T3 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 3,
        power: 0,
        cost: 0,
        sellValue: 100,
        maxStack: 20,
        icon: '🟤',
        description: 'An exceptional raw garnet. Will cut into a very powerful gem.'
    },
    
    // Tier 4 Raw Gems (Levels 19+)
    raw_ruby_t4: {
        name: 'T4 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🔴',
        description: 'A flawless raw ruby. Will cut into an incredibly powerful gem.'
    },
    raw_sapphire_t4: {
        name: 'T4 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🔵',
        description: 'A flawless raw sapphire. Will cut into an incredibly powerful gem.'
    },
    raw_topaz_t4: {
        name: 'T4 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🟡',
        description: 'A flawless raw topaz. Will cut into an incredibly powerful gem.'
    },
    raw_emerald_t4: {
        name: 'T4 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🟢',
        description: 'A flawless raw emerald. Will cut into an incredibly powerful gem.'
    },
    raw_amethyst_t4: {
        name: 'T4 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🟣',
        description: 'A flawless raw amethyst. Will cut into an incredibly powerful gem.'
    },
    raw_onyx_t4: {
        name: 'T4 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '⬛',
        description: 'A flawless raw onyx. Will cut into an incredibly powerful gem.'
    },
    raw_opal_t4: {
        name: 'T4 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🔷',
        description: 'A flawless raw opal. Will cut into an incredibly powerful gem.'
    },
    raw_garnet_t4: {
        name: 'T4 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 4,
        power: 0,
        cost: 0,
        sellValue: 200,
        maxStack: 20,
        icon: '🟤',
        description: 'A flawless raw garnet. Will cut into an incredibly powerful gem.'
    },

    // Expansion Gems - Tier variants
    raw_bloodstone_t1: { name: 'T1 Raw Bloodstone', subtype: 'raw_gem', gemType: 'bloodstone', gemTier: 1, power: 0, cost: 0, sellValue: 30, maxStack: 20, icon: '🩸', description: 'A rough bloodstone crystal.' },
    raw_bloodstone_t2: { name: 'T2 Raw Bloodstone', subtype: 'raw_gem', gemType: 'bloodstone', gemTier: 2, power: 0, cost: 0, sellValue: 60, maxStack: 20, icon: '🩸', description: 'A high-quality raw bloodstone.' },
    raw_bloodstone_t3: { name: 'T3 Raw Bloodstone', subtype: 'raw_gem', gemType: 'bloodstone', gemTier: 3, power: 0, cost: 0, sellValue: 120, maxStack: 20, icon: '🩸', description: 'An exceptional raw bloodstone.' },
    raw_bloodstone_t4: { name: 'T4 Raw Bloodstone', subtype: 'raw_gem', gemType: 'bloodstone', gemTier: 4, power: 0, cost: 0, sellValue: 240, maxStack: 20, icon: '🩸', description: 'A flawless raw bloodstone.' },

    raw_moonstone_t1: { name: 'T1 Raw Moonstone', subtype: 'raw_gem', gemType: 'moonstone', gemTier: 1, power: 0, cost: 0, sellValue: 30, maxStack: 20, icon: '🌙', description: 'A rough moonstone crystal.' },
    raw_moonstone_t2: { name: 'T2 Raw Moonstone', subtype: 'raw_gem', gemType: 'moonstone', gemTier: 2, power: 0, cost: 0, sellValue: 60, maxStack: 20, icon: '🌙', description: 'A high-quality raw moonstone.' },
    raw_moonstone_t3: { name: 'T3 Raw Moonstone', subtype: 'raw_gem', gemType: 'moonstone', gemTier: 3, power: 0, cost: 0, sellValue: 120, maxStack: 20, icon: '🌙', description: 'An exceptional raw moonstone.' },
    raw_moonstone_t4: { name: 'T4 Raw Moonstone', subtype: 'raw_gem', gemType: 'moonstone', gemTier: 4, power: 0, cost: 0, sellValue: 240, maxStack: 20, icon: '🌙', description: 'A flawless raw moonstone.' },

    raw_sunstone_t1: { name: 'T1 Raw Sunstone', subtype: 'raw_gem', gemType: 'sunstone', gemTier: 1, power: 0, cost: 0, sellValue: 30, maxStack: 20, icon: '☀️', description: 'A rough sunstone crystal.' },
    raw_sunstone_t2: { name: 'T2 Raw Sunstone', subtype: 'raw_gem', gemType: 'sunstone', gemTier: 2, power: 0, cost: 0, sellValue: 60, maxStack: 20, icon: '☀️', description: 'A high-quality raw sunstone.' },
    raw_sunstone_t3: { name: 'T3 Raw Sunstone', subtype: 'raw_gem', gemType: 'sunstone', gemTier: 3, power: 0, cost: 0, sellValue: 120, maxStack: 20, icon: '☀️', description: 'An exceptional raw sunstone.' },
    raw_sunstone_t4: { name: 'T4 Raw Sunstone', subtype: 'raw_gem', gemType: 'sunstone', gemTier: 4, power: 0, cost: 0, sellValue: 240, maxStack: 20, icon: '☀️', description: 'A flawless raw sunstone.' },

    raw_voidstone_t1: { name: 'T1 Raw Voidstone', subtype: 'raw_gem', gemType: 'voidstone', gemTier: 1, power: 0, cost: 0, sellValue: 30, maxStack: 20, icon: '🔮', description: 'A rough voidstone crystal.' },
    raw_voidstone_t2: { name: 'T2 Raw Voidstone', subtype: 'raw_gem', gemType: 'voidstone', gemTier: 2, power: 0, cost: 0, sellValue: 60, maxStack: 20, icon: '🔮', description: 'A high-quality raw voidstone.' },
    raw_voidstone_t3: { name: 'T3 Raw Voidstone', subtype: 'raw_gem', gemType: 'voidstone', gemTier: 3, power: 0, cost: 0, sellValue: 120, maxStack: 20, icon: '🔮', description: 'An exceptional raw voidstone.' },
    raw_voidstone_t4: { name: 'T4 Raw Voidstone', subtype: 'raw_gem', gemType: 'voidstone', gemTier: 4, power: 0, cost: 0, sellValue: 240, maxStack: 20, icon: '🔮', description: 'A flawless raw voidstone.' },

    raw_ironheart_t1: { name: 'T1 Raw Ironheart', subtype: 'raw_gem', gemType: 'ironheart', gemTier: 1, power: 0, cost: 0, sellValue: 30, maxStack: 20, icon: '🩶', description: 'A rough ironheart crystal.' },
    raw_ironheart_t2: { name: 'T2 Raw Ironheart', subtype: 'raw_gem', gemType: 'ironheart', gemTier: 2, power: 0, cost: 0, sellValue: 60, maxStack: 20, icon: '🩶', description: 'A high-quality raw ironheart.' },
    raw_ironheart_t3: { name: 'T3 Raw Ironheart', subtype: 'raw_gem', gemType: 'ironheart', gemTier: 3, power: 0, cost: 0, sellValue: 120, maxStack: 20, icon: '🩶', description: 'An exceptional raw ironheart.' },
    raw_ironheart_t4: { name: 'T4 Raw Ironheart', subtype: 'raw_gem', gemType: 'ironheart', gemTier: 4, power: 0, cost: 0, sellValue: 240, maxStack: 20, icon: '🩶', description: 'A flawless raw ironheart.' },

    raw_stormglass_t1: { name: 'T1 Raw Stormglass', subtype: 'raw_gem', gemType: 'stormglass', gemTier: 1, power: 0, cost: 0, sellValue: 30, maxStack: 20, icon: '⛈️', description: 'A rough stormglass crystal.' },
    raw_stormglass_t2: { name: 'T2 Raw Stormglass', subtype: 'raw_gem', gemType: 'stormglass', gemTier: 2, power: 0, cost: 0, sellValue: 60, maxStack: 20, icon: '⛈️', description: 'A high-quality raw stormglass.' },
    raw_stormglass_t3: { name: 'T3 Raw Stormglass', subtype: 'raw_gem', gemType: 'stormglass', gemTier: 3, power: 0, cost: 0, sellValue: 120, maxStack: 20, icon: '⛈️', description: 'An exceptional raw stormglass.' },
    raw_stormglass_t4: { name: 'T4 Raw Stormglass', subtype: 'raw_gem', gemType: 'stormglass', gemTier: 4, power: 0, cost: 0, sellValue: 240, maxStack: 20, icon: '⛈️', description: 'A flawless raw stormglass.' },


    // ======================================================
// ADVENTURE POTIONS & CONSUMABLES
// Add these to your items.js file
// ======================================================

mystery_potion: {
    name: 'Mystery Potion',
    type: 'consumable',
    subtype: 'random_effect',
    description: 'A swirling liquid that changes color as you look at it. Who knows what it will do?',
    possibleEffects: ['heal', 'mana', 'buff_damage', 'buff_defense', 'damage'],
    minPower: 30,
    maxPower: 80,
    duration: 180000, // 3 minutes for buffs
    sellValue: 75,
    maxStack: 3
},

alchemical_elixir: {
    name: 'Alchemical Elixir',
    type: 'consumable',
    subtype: 'buff_all',
    description: 'A shimmering potion that enhances all your abilities temporarily.',
    power: 10, // +10% to all stats
    duration: 300000, // 5 minutes
    sellValue: 150,
    maxStack: 2
},

dragon_blood_vial: {
    name: 'Vial of Dragon Blood',
    type: 'consumable',
    subtype: 'buff_hp',
    description: 'Drinking this surges your body with draconic power, temporarily increasing max HP.',
    power: 100, // +100 max HP
    duration: 300000, // 5 minutes
    sellValue: 400,
    maxStack: 2
},
seal_fragment: {
    name: 'Ancient Seal Fragment',
    type: 'quest',
    description: 'A piece of the dragon\'s prison seal. Collect all 4 for a reward.',
    sellValue: 200,
    maxStack: 4
},

treasure_map: {
    name: 'Treasure Map',
    type: 'quest',
    description: 'An old map marked with an X. Leads to something valuable.',
    sellValue: 150,
    maxStack: 1
},

cult_intelligence: {
    name: 'Cult Intelligence Report',
    type: 'quest',
    description: 'Valuable intel on dragon cult movements. The Adventurer\'s Guild will pay well.',
    sellValue: 300,
    maxStack: 1
},

ancient_tactics_scroll: {
    name: 'Ancient Tactics Scroll',
    type: 'consumable',
    subtype: 'teach_ability',
    description: 'Teaches the "Dragon Tactics" passive ability (+15% damage vs dragons).',
    sellValue: 1000,
    maxStack: 1
},

dragon_scale_charm: {
    name: 'Dragon Scale Charm',
    type: 'accessory',
    description: 'A charm made from a real dragon scale. Protects against fire.',
    effects: {
        fireResist: 15,
        dragonDamageBonus: 10
    },
    level: 8,
    sellValue: 800,
    maxStack: 1
}

};

console.log('✅ Items loaded:', Object.keys(ITEMS).length, 'items');
