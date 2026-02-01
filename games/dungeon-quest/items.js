// items.js - Item Database
// Add new consumable items and special items here to expand the game!

const ITEMS = {
    // ===== CONSUMABLES - HEALING =====
    health_potion: {
        name: 'Health Potion',
        type: 'consumable',
        subtype: 'heal_hp',
        power: 50,
        cost: 30,
        level: 1,
        description: 'Restores 50 HP',
        stackable: true
    },
    greater_health_potion: {
        name: 'Greater Health Potion',
        type: 'consumable',
        subtype: 'heal_hp',
        power: 100,
        cost: 60,
        level: 3,
        description: 'Restores 100 HP',
        stackable: true
    },
    superior_health_potion: {
        name: 'Superior Health Potion',
        type: 'consumable',
        subtype: 'heal_hp',
        power: 200,
        cost: 120,
        level: 6,
        description: 'Restores 200 HP',
        stackable: true
    },

    // ===== CONSUMABLES - MANA =====
    mana_potion: {
        name: 'Mana Potion',
        type: 'consumable',
        subtype: 'heal_mp',
        power: 40,
        cost: 35,
        level: 1,
        description: 'Restores 40 MP',
        stackable: true
    },
    greater_mana_potion: {
        name: 'Greater Mana Potion',
        type: 'consumable',
        subtype: 'heal_mp',
        power: 80,
        cost: 70,
        level: 3,
        description: 'Restores 80 MP',
        stackable: true
    },
    superior_mana_potion: {
        name: 'Superior Mana Potion',
        type: 'consumable',
        subtype: 'heal_mp',
        power: 150,
        cost: 140,
        level: 6,
        description: 'Restores 150 MP',
        stackable: true
    },

    // ===== CONSUMABLES - FULL RESTORE =====
    elixir: {
        name: 'Elixir',
        type: 'consumable',
        subtype: 'full_restore',
        power: 0,
        cost: 150,
        level: 5,
        description: 'Fully restores HP and MP',
        stackable: true
    },

    // ===== CONSUMABLES - COMBAT BUFFS =====
    strength_tonic: {
        name: 'Strength Tonic',
        type: 'consumable',
        subtype: 'buff_strength',
        power: 5,
        duration: 5,
        cost: 50,
        level: 2,
        description: 'Temporarily increases Strength by 5 for 5 turns',
        stackable: true
    },
    defense_tonic: {
        name: 'Defense Tonic',
        type: 'consumable',
        subtype: 'buff_defense',
        power: 5,
        duration: 5,
        cost: 50,
        level: 2,
        description: 'Temporarily increases Defense by 5 for 5 turns',
        stackable: true
    },
    magic_tonic: {
        name: 'Magic Tonic',
        type: 'consumable',
        subtype: 'buff_magic',
        power: 5,
        duration: 5,
        cost: 50,
        level: 2,
        description: 'Temporarily increases Magic by 5 for 5 turns',
        stackable: true
    },
    speed_tonic: {
        name: 'Speed Tonic',
        type: 'consumable',
        subtype: 'buff_speed',
        power: 3,
        duration: 5,
        cost: 45,
        level: 2,
        description: 'Temporarily increases Speed by 3 for 5 turns',
        stackable: true
    },
    berserk_potion: {
        name: 'Berserk Potion',
        type: 'consumable',
        subtype: 'buff_berserk',
        power: 10,
        duration: 3,
        cost: 100,
        level: 4,
        description: 'Massively increases damage but reduces defense for 3 turns',
        stackable: true
    },

    // ===== CONSUMABLES - COMBAT ITEMS =====
    bomb: {
        name: 'Bomb',
        type: 'consumable',
        subtype: 'attack',
        power: 50,
        cost: 40,
        level: 2,
        description: 'Deals 50 damage to enemy',
        stackable: true
    },
    ice_bomb: {
        name: 'Ice Bomb',
        type: 'consumable',
        subtype: 'attack',
        power: 80,
        cost: 70,
        level: 4,
        description: 'Deals 80 ice damage to enemy',
        stackable: true
    },
    fire_bomb: {
        name: 'Fire Bomb',
        type: 'consumable',
        subtype: 'attack',
        power: 80,
        cost: 70,
        level: 4,
        description: 'Deals 80 fire damage to enemy',
        stackable: true
    },
    holy_water: {
        name: 'Holy Water',
        type: 'consumable',
        subtype: 'attack_undead',
        power: 100,
        cost: 60,
        level: 3,
        description: 'Deals massive damage to undead enemies',
        stackable: true
    },

    // ===== SPECIAL ITEMS - QUEST ITEMS =====
    ancient_key: {
        name: 'Ancient Key',
        type: 'quest',
        subtype: 'key',
        cost: 0,
        level: 1,
        description: 'A mysterious key from a forgotten age',
        stackable: false
    },
    dragon_egg: {
        name: 'Dragon Egg',
        type: 'quest',
        subtype: 'special',
        cost: 0,
        level: 1,
        description: 'A rare dragon egg pulsing with power',
        stackable: false
    },
    crystal_shard: {
        name: 'Crystal Shard',
        type: 'quest',
        subtype: 'collectible',
        cost: 0,
        level: 1,
        description: 'A fragment of a powerful crystal',
        stackable: true
    },

    // ===== SPECIAL ITEMS - PERMANENT UPGRADES =====
    heart_container: {
        name: 'Heart Container',
        type: 'permanent',
        subtype: 'max_hp',
        power: 20,
        cost: 200,
        level: 1,
        description: 'Permanently increases Max HP by 20',
        stackable: false
    },
    mana_crystal: {
        name: 'Mana Crystal',
        type: 'permanent',
        subtype: 'max_mp',
        power: 15,
        cost: 200,
        level: 1,
        description: 'Permanently increases Max MP by 15',
        stackable: false
    },
    strength_tome: {
        name: 'Strength Tome',
        type: 'permanent',
        subtype: 'strength',
        power: 2,
        cost: 300,
        level: 3,
        description: 'Permanently increases Strength by 2',
        stackable: false
    },
    defense_tome: {
        name: 'Defense Tome',
        type: 'permanent',
        subtype: 'defense',
        power: 2,
        cost: 300,
        level: 3,
        description: 'Permanently increases Defense by 2',
        stackable: false
    },
    magic_tome: {
        name: 'Magic Tome',
        type: 'permanent',
        subtype: 'magic',
        power: 2,
        cost: 300,
        level: 3,
        description: 'Permanently increases Magic by 2',
        stackable: false
    },
    speed_tome: {
        name: 'Speed Tome',
        type: 'permanent',
        subtype: 'speed',
        power: 1,
        cost: 300,
        level: 3,
        description: 'Permanently increases Speed by 1',
        stackable: false
    },

    // ===== SPECIAL ITEMS - UTILITY =====
    town_portal: {
        name: 'Town Portal Scroll',
        type: 'utility',
        subtype: 'teleport_town',
        cost: 100,
        level: 1,
        description: 'Instantly return to town from anywhere',
        stackable: true,
        sellValue: 50
    },
    escape_rope: {
        name: 'Escape Rope',
        type: 'utility',
        subtype: 'flee',
        cost: 25,
        level: 1,
        description: 'Guarantees escape from battle',
        stackable: true,
        sellValue: 10
    },
    lucky_coin: {
        name: 'Lucky Coin',
        type: 'passive',
        subtype: 'gold_boost',
        power: 25,
        cost: 500,
        level: 5,
        description: 'Increases gold drops by 25%',
        stackable: false,
        sellValue: 250
    },
    experience_charm: {
        name: 'Experience Charm',
        type: 'passive',
        subtype: 'xp_boost',
        power: 25,
        cost: 600,
        level: 5,
        description: 'Increases XP gains by 25%',
        stackable: false,
        sellValue: 300
    },

    // ===== GEMS (Sellable Loot) =====
    small_gem: {
        name: 'Small Gem',
        type: 'sellable',
        subtype: 'gem',
        cost: 0,
        level: 1,
        description: 'A tiny gemstone',
        stackable: true,
        sellValue: 25
    },
    medium_gem: {
        name: 'Medium Gem',
        type: 'sellable',
        subtype: 'gem',
        cost: 0,
        level: 1,
        description: 'A modestly sized gemstone',
        stackable: true,
        sellValue: 75
    },
    large_gem: {
        name: 'Large Gem',
        type: 'sellable',
        subtype: 'gem',
        cost: 0,
        level: 1,
        description: 'A sizable gemstone',
        stackable: true,
        sellValue: 200
    },
    huge_gem: {
        name: 'Huge Gem',
        type: 'sellable',
        subtype: 'gem',
        cost: 0,
        level: 1,
        description: 'A massive gemstone',
        stackable: true,
        sellValue: 500
    },
    pristine_gem: {
        name: 'Pristine Gem',
        type: 'sellable',
        subtype: 'gem',
        cost: 0,
        level: 1,
        description: 'A flawless gemstone of incredible value',
        stackable: true,
        sellValue: 1000
    },

    // ===== PELTS & MATERIALS (Sellable Loot) =====
    wolf_pelt: {
        name: 'Wolf Pelt',
        type: 'sellable',
        subtype: 'material',
        cost: 0,
        level: 1,
        description: 'A warm wolf hide',
        stackable: true,
        sellValue: 15
    },
    dire_pelt: {
        name: 'Dire Wolf Pelt',
        type: 'sellable',
        subtype: 'material',
        cost: 0,
        level: 1,
        description: 'A thick pelt from a dire wolf',
        stackable: true,
        sellValue: 40
    },
    spider_silk: {
        name: 'Spider Silk',
        type: 'sellable',
        subtype: 'material',
        cost: 0,
        level: 1,
        description: 'Strong webbing from a giant spider',
        stackable: true,
        sellValue: 30
    },
    bone_dust: {
        name: 'Bone Dust',
        type: 'sellable',
        subtype: 'material',
        cost: 0,
        level: 1,
        description: 'Ground bones with magical properties',
        stackable: true,
        sellValue: 50
    },
    slime_gel: {
        name: 'Slime Gel',
        type: 'sellable',
        subtype: 'material',
        cost: 0,
        level: 1,
        description: 'Viscous goo from a slime',
        stackable: true,
        sellValue: 10
    },
    gold_coins: {
        name: 'Gold Coins',
        type: 'sellable',
        subtype: 'currency',
        cost: 0,
        level: 1,
        description: 'A pouch of stolen coins',
        stackable: true,
        sellValue: 100
    },

    // ===== RARE MATERIALS =====
    phylactery: {
        name: 'Lich Phylactery',
        type: 'sellable',
        subtype: 'rare_material',
        cost: 0,
        level: 1,
        description: 'The soul vessel of a lich',
        stackable: false,
        sellValue: 800
    },
    dragon_heart: {
        name: 'Dragon Heart',
        type: 'sellable',
        subtype: 'rare_material',
        cost: 0,
        level: 1,
        description: 'The still-beating heart of a dragon',
        stackable: false,
        sellValue: 1500
    },
    demon_core: {
        name: 'Demon Core',
        type: 'sellable',
        subtype: 'rare_material',
        cost: 0,
        level: 1,
        description: 'Condensed demonic essence',
        stackable: false,
        sellValue: 1200
    },
    fire_core: {
        name: 'Fire Core',
        type: 'sellable',
        subtype: 'rare_material',
        cost: 0,
        level: 1,
        description: 'The burning essence of a fire elemental',
        stackable: false,
        sellValue: 900
    },
    soul_essence: {
        name: 'Soul Essence',
        type: 'sellable',
        subtype: 'rare_material',
        cost: 0,
        level: 1,
        description: 'Pure spectral energy',
        stackable: true,
        sellValue: 600
    },
    blood_ruby: {
        name: 'Blood Ruby',
        type: 'sellable',
        subtype: 'rare_material',
        cost: 0,
        level: 1,
        description: 'A crimson gem pulsing with power',
        stackable: false,
        sellValue: 1000
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ITEMS };
}
