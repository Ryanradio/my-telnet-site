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
    rough_crystal: {
        name: 'Rough Crystal',
        subtype: 'material',
        power: 0,
        cost: 10,
        sellValue: 5,
        description: 'A rough crystal shard. Worth a few coins to a merchant.'
    },

    polished_crystal: {
        name: 'Polished Crystal',
        subtype: 'material',
        power: 0,
        cost: 30,
        sellValue: 15,
        description: 'A smooth polished crystal. Merchants value these.'
    },
    
    prismatic_crystal: {
        name: 'Prismatic Crystal',
        subtype: 'material',
        power: 0,
        cost: 50,
        sellValue: 25,
        description: 'A beautifully formed crystal. Merchants pay well for these.'
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
    // ═══ RAW GEMS ════════════════════════════════════════════════
    // Tier 1 Raw Gems
    raw_ruby_t1: {
        name: '🔴 Tier 1 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut ruby crystal. Red — Damage & Lifesteal. Cut at the Blacksmith for 200g.'
    },
    raw_sapphire_t1: {
        name: '🔵 Tier 1 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut sapphire crystal. Blue — Spell Power & MP. Cut at the Blacksmith for 200g.'
    },
    raw_topaz_t1: {
        name: '🟡 Tier 1 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut topaz crystal. Yellow — Crit & Lightning. Cut at the Blacksmith for 200g.'
    },
    raw_emerald_t1: {
        name: '🟢 Tier 1 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut emerald crystal. Green — Poison & STR. Cut at the Blacksmith for 200g.'
    },
    raw_amethyst_t1: {
        name: '🟣 Tier 1 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut amethyst crystal. Purple — Defense & HP. Cut at the Blacksmith for 200g.'
    },
    raw_onyx_t1: {
        name: '⬛ Tier 1 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut onyx crystal. Black — Armor Pierce & Speed. Cut at the Blacksmith for 200g.'
    },
    raw_opal_t1: {
        name: '🔷 Tier 1 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut opal crystal. White — Luck & Gold Find. Cut at the Blacksmith for 200g.'
    },
    raw_garnet_t1: {
        name: '🟤 Tier 1 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut garnet crystal. Garnet — STR & CON. Cut at the Blacksmith for 200g.'
    },
    raw_bloodstone_t1: {
        name: '🩸 Tier 1 Raw Bloodstone',
        subtype: 'raw_gem',
        gemType: 'bloodstone',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut bloodstone crystal. Dark Red — Max HP & HP Regen. Cut at the Blacksmith for 200g.'
    },
    raw_moonstone_t1: {
        name: '🌙 Tier 1 Raw Moonstone',
        subtype: 'raw_gem',
        gemType: 'moonstone',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut moonstone crystal. Silver — MP Regen & CDR. Cut at the Blacksmith for 200g.'
    },
    raw_sunstone_t1: {
        name: '☀️ Tier 1 Raw Sunstone',
        subtype: 'raw_gem',
        gemType: 'sunstone',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut sunstone crystal. Amber — Fire Dmg & STR. Cut at the Blacksmith for 200g.'
    },
    raw_voidstone_t1: {
        name: '🔮 Tier 1 Raw Voidstone',
        subtype: 'raw_gem',
        gemType: 'voidstone',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut voidstone crystal. Purple — Spell Leech & WIS. Cut at the Blacksmith for 200g.'
    },
    raw_ironheart_t1: {
        name: '🩶 Tier 1 Raw Ironheart',
        subtype: 'raw_gem',
        gemType: 'ironheart',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut ironheart crystal. Grey — Defense & CON. Cut at the Blacksmith for 200g.'
    },
    raw_stormglass_t1: {
        name: '⛈️ Tier 1 Raw Stormglass',
        subtype: 'raw_gem',
        gemType: 'stormglass',
        gemTier: 1,
        sellValue: 25,
        cost: 50,
        description: 'An uncut stormglass crystal. Ice-Blue — Lightning & Frost. Cut at the Blacksmith for 200g.'
    },
    // Tier 2 Raw Gems
    raw_ruby_t2: {
        name: '🔴 Tier 2 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut ruby crystal. Red — Damage & Lifesteal. Cut at the Blacksmith for 200g.'
    },
    raw_sapphire_t2: {
        name: '🔵 Tier 2 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut sapphire crystal. Blue — Spell Power & MP. Cut at the Blacksmith for 200g.'
    },
    raw_topaz_t2: {
        name: '🟡 Tier 2 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut topaz crystal. Yellow — Crit & Lightning. Cut at the Blacksmith for 200g.'
    },
    raw_emerald_t2: {
        name: '🟢 Tier 2 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut emerald crystal. Green — Poison & STR. Cut at the Blacksmith for 200g.'
    },
    raw_amethyst_t2: {
        name: '🟣 Tier 2 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut amethyst crystal. Purple — Defense & HP. Cut at the Blacksmith for 200g.'
    },
    raw_onyx_t2: {
        name: '⬛ Tier 2 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut onyx crystal. Black — Armor Pierce & Speed. Cut at the Blacksmith for 200g.'
    },
    raw_opal_t2: {
        name: '🔷 Tier 2 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut opal crystal. White — Luck & Gold Find. Cut at the Blacksmith for 200g.'
    },
    raw_garnet_t2: {
        name: '🟤 Tier 2 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut garnet crystal. Garnet — STR & CON. Cut at the Blacksmith for 200g.'
    },
    raw_bloodstone_t2: {
        name: '🩸 Tier 2 Raw Bloodstone',
        subtype: 'raw_gem',
        gemType: 'bloodstone',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut bloodstone crystal. Dark Red — Max HP & HP Regen. Cut at the Blacksmith for 200g.'
    },
    raw_moonstone_t2: {
        name: '🌙 Tier 2 Raw Moonstone',
        subtype: 'raw_gem',
        gemType: 'moonstone',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut moonstone crystal. Silver — MP Regen & CDR. Cut at the Blacksmith for 200g.'
    },
    raw_sunstone_t2: {
        name: '☀️ Tier 2 Raw Sunstone',
        subtype: 'raw_gem',
        gemType: 'sunstone',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut sunstone crystal. Amber — Fire Dmg & STR. Cut at the Blacksmith for 200g.'
    },
    raw_voidstone_t2: {
        name: '🔮 Tier 2 Raw Voidstone',
        subtype: 'raw_gem',
        gemType: 'voidstone',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut voidstone crystal. Purple — Spell Leech & WIS. Cut at the Blacksmith for 200g.'
    },
    raw_ironheart_t2: {
        name: '🩶 Tier 2 Raw Ironheart',
        subtype: 'raw_gem',
        gemType: 'ironheart',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut ironheart crystal. Grey — Defense & CON. Cut at the Blacksmith for 200g.'
    },
    raw_stormglass_t2: {
        name: '⛈️ Tier 2 Raw Stormglass',
        subtype: 'raw_gem',
        gemType: 'stormglass',
        gemTier: 2,
        sellValue: 50,
        cost: 100,
        description: 'An uncut stormglass crystal. Ice-Blue — Lightning & Frost. Cut at the Blacksmith for 200g.'
    },
    // Tier 3 Raw Gems
    raw_ruby_t3: {
        name: '🔴 Tier 3 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut ruby crystal. Red — Damage & Lifesteal. Cut at the Blacksmith for 200g.'
    },
    raw_sapphire_t3: {
        name: '🔵 Tier 3 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut sapphire crystal. Blue — Spell Power & MP. Cut at the Blacksmith for 200g.'
    },
    raw_topaz_t3: {
        name: '🟡 Tier 3 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut topaz crystal. Yellow — Crit & Lightning. Cut at the Blacksmith for 200g.'
    },
    raw_emerald_t3: {
        name: '🟢 Tier 3 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut emerald crystal. Green — Poison & STR. Cut at the Blacksmith for 200g.'
    },
    raw_amethyst_t3: {
        name: '🟣 Tier 3 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut amethyst crystal. Purple — Defense & HP. Cut at the Blacksmith for 200g.'
    },
    raw_onyx_t3: {
        name: '⬛ Tier 3 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut onyx crystal. Black — Armor Pierce & Speed. Cut at the Blacksmith for 200g.'
    },
    raw_opal_t3: {
        name: '🔷 Tier 3 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut opal crystal. White — Luck & Gold Find. Cut at the Blacksmith for 200g.'
    },
    raw_garnet_t3: {
        name: '🟤 Tier 3 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut garnet crystal. Garnet — STR & CON. Cut at the Blacksmith for 200g.'
    },
    raw_bloodstone_t3: {
        name: '🩸 Tier 3 Raw Bloodstone',
        subtype: 'raw_gem',
        gemType: 'bloodstone',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut bloodstone crystal. Dark Red — Max HP & HP Regen. Cut at the Blacksmith for 200g.'
    },
    raw_moonstone_t3: {
        name: '🌙 Tier 3 Raw Moonstone',
        subtype: 'raw_gem',
        gemType: 'moonstone',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut moonstone crystal. Silver — MP Regen & CDR. Cut at the Blacksmith for 200g.'
    },
    raw_sunstone_t3: {
        name: '☀️ Tier 3 Raw Sunstone',
        subtype: 'raw_gem',
        gemType: 'sunstone',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut sunstone crystal. Amber — Fire Dmg & STR. Cut at the Blacksmith for 200g.'
    },
    raw_voidstone_t3: {
        name: '🔮 Tier 3 Raw Voidstone',
        subtype: 'raw_gem',
        gemType: 'voidstone',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut voidstone crystal. Purple — Spell Leech & WIS. Cut at the Blacksmith for 200g.'
    },
    raw_ironheart_t3: {
        name: '🩶 Tier 3 Raw Ironheart',
        subtype: 'raw_gem',
        gemType: 'ironheart',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut ironheart crystal. Grey — Defense & CON. Cut at the Blacksmith for 200g.'
    },
    raw_stormglass_t3: {
        name: '⛈️ Tier 3 Raw Stormglass',
        subtype: 'raw_gem',
        gemType: 'stormglass',
        gemTier: 3,
        sellValue: 100,
        cost: 200,
        description: 'An uncut stormglass crystal. Ice-Blue — Lightning & Frost. Cut at the Blacksmith for 200g.'
    },
    // Tier 4 Raw Gems
    raw_ruby_t4: {
        name: '🔴 Tier 4 Raw Ruby',
        subtype: 'raw_gem',
        gemType: 'ruby',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut ruby crystal. Red — Damage & Lifesteal. Cut at the Blacksmith for 200g.'
    },
    raw_sapphire_t4: {
        name: '🔵 Tier 4 Raw Sapphire',
        subtype: 'raw_gem',
        gemType: 'sapphire',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut sapphire crystal. Blue — Spell Power & MP. Cut at the Blacksmith for 200g.'
    },
    raw_topaz_t4: {
        name: '🟡 Tier 4 Raw Topaz',
        subtype: 'raw_gem',
        gemType: 'topaz',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut topaz crystal. Yellow — Crit & Lightning. Cut at the Blacksmith for 200g.'
    },
    raw_emerald_t4: {
        name: '🟢 Tier 4 Raw Emerald',
        subtype: 'raw_gem',
        gemType: 'emerald',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut emerald crystal. Green — Poison & STR. Cut at the Blacksmith for 200g.'
    },
    raw_amethyst_t4: {
        name: '🟣 Tier 4 Raw Amethyst',
        subtype: 'raw_gem',
        gemType: 'amethyst',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut amethyst crystal. Purple — Defense & HP. Cut at the Blacksmith for 200g.'
    },
    raw_onyx_t4: {
        name: '⬛ Tier 4 Raw Onyx',
        subtype: 'raw_gem',
        gemType: 'onyx',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut onyx crystal. Black — Armor Pierce & Speed. Cut at the Blacksmith for 200g.'
    },
    raw_opal_t4: {
        name: '🔷 Tier 4 Raw Opal',
        subtype: 'raw_gem',
        gemType: 'opal',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut opal crystal. White — Luck & Gold Find. Cut at the Blacksmith for 200g.'
    },
    raw_garnet_t4: {
        name: '🟤 Tier 4 Raw Garnet',
        subtype: 'raw_gem',
        gemType: 'garnet',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut garnet crystal. Garnet — STR & CON. Cut at the Blacksmith for 200g.'
    },
    raw_bloodstone_t4: {
        name: '🩸 Tier 4 Raw Bloodstone',
        subtype: 'raw_gem',
        gemType: 'bloodstone',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut bloodstone crystal. Dark Red — Max HP & HP Regen. Cut at the Blacksmith for 200g.'
    },
    raw_moonstone_t4: {
        name: '🌙 Tier 4 Raw Moonstone',
        subtype: 'raw_gem',
        gemType: 'moonstone',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut moonstone crystal. Silver — MP Regen & CDR. Cut at the Blacksmith for 200g.'
    },
    raw_sunstone_t4: {
        name: '☀️ Tier 4 Raw Sunstone',
        subtype: 'raw_gem',
        gemType: 'sunstone',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut sunstone crystal. Amber — Fire Dmg & STR. Cut at the Blacksmith for 200g.'
    },
    raw_voidstone_t4: {
        name: '🔮 Tier 4 Raw Voidstone',
        subtype: 'raw_gem',
        gemType: 'voidstone',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut voidstone crystal. Purple — Spell Leech & WIS. Cut at the Blacksmith for 200g.'
    },
    raw_ironheart_t4: {
        name: '🩶 Tier 4 Raw Ironheart',
        subtype: 'raw_gem',
        gemType: 'ironheart',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut ironheart crystal. Grey — Defense & CON. Cut at the Blacksmith for 200g.'
    },
    raw_stormglass_t4: {
        name: '⛈️ Tier 4 Raw Stormglass',
        subtype: 'raw_gem',
        gemType: 'stormglass',
        gemTier: 4,
        sellValue: 200,
        cost: 400,
        description: 'An uncut stormglass crystal. Ice-Blue — Lightning & Frost. Cut at the Blacksmith for 200g.'
    }

    // ═══ CUT GEM sell-back value (cut gems are objects, not ITEMS keys)
    // Cut gems are stored as inventory objects with .cut=true and .sellValue=100
};

console.log('✅ Items loaded:', Object.keys(ITEMS).length, 'items');
