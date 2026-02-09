// ═══════════════════════════════════════════════════════════════
// CLASS-SPECIFIC SPELL PROGRESSION SYSTEM
// Spells are purchased and upgraded at the Temple
// ═══════════════════════════════════════════════════════════════

const CLASS_SPELL_TREES = {
    // ═══════════════════════════════════════════════════════════════
    // MAGE - FIRE DAMAGE SPELLS
    // ═══════════════════════════════════════════════════════════════
    mage: {
        startingSpell: 'fireball_1',
        spellTree: {
            // FIREBALL LINE (Primary Damage)
            fireball_1: {
                name: 'Fireball',
                level: 1,
                mpCost: 15,
                power: 20,
                type: 'damage',
                cost: 0, // Starting spell
                description: 'Hurl a ball of flame at your enemy',
                upgradesTo: 'fireball_2'
            },
            fireball_2: {
                name: 'Flameburst',
                level: 4,
                mpCost: 20,
                power: 35,
                type: 'damage',
                cost: 500,
                description: 'An explosive burst of fire',
                upgradesTo: 'fireball_3',
                requires: 'fireball_1'
            },
            fireball_3: {
                name: 'Inferno',
                level: 7,
                mpCost: 30,
                power: 55,
                type: 'damage',
                cost: 1500,
                description: 'Summon a raging inferno',
                upgradesTo: 'fireball_4',
                requires: 'fireball_2'
            },
            fireball_4: {
                name: 'Pyroclasm',
                level: 10,
                mpCost: 40,
                power: 80,
                type: 'damage',
                cost: 3500,
                description: 'Volcanic eruption of pure flame',
                upgradesTo: 'fireball_5',
                requires: 'fireball_3'
            },
            fireball_5: {
                name: 'Hellfire',
                level: 13,
                mpCost: 50,
                power: 110,
                type: 'damage',
                cost: 7000,
                description: 'Flames from the depths of hell',
                upgradesTo: 'fireball_6',
                requires: 'fireball_4'
            },
            fireball_6: {
                name: 'Immolation',
                level: 16,
                mpCost: 65,
                power: 145,
                type: 'damage',
                cost: 12000,
                description: 'Consume your enemy in eternal fire',
                upgradesTo: 'fireball_7',
                requires: 'fireball_5'
            },
            fireball_7: {
                name: 'Cinderstorm',
                level: 19,
                mpCost: 80,
                power: 190,
                type: 'damage',
                cost: 20000,
                description: 'A storm of burning cinders',
                upgradesTo: 'fireball_8',
                requires: 'fireball_6'
            },
            fireball_8: {
                name: "Dragon's Breath",
                level: 22,
                mpCost: 100,
                power: 250,
                type: 'damage',
                cost: 35000,
                description: 'Breathe fire like an ancient dragon',
                upgradesTo: 'fireball_9',
                requires: 'fireball_7'
            },
            fireball_9: {
                name: 'Phoenix Flame',
                level: 25,
                mpCost: 120,
                power: 350,
                type: 'damage',
                cost: 50000,
                description: 'Ultimate fire magic - rebirth through flame',
                requires: 'fireball_8'
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // PALADIN - HOLY DAMAGE + LIGHT HEALING
    // ═══════════════════════════════════════════════════════════════
    paladin: {
        startingSpell: 'smite_1',
        spellTree: {
            // SMITE LINE (Holy Damage)
            smite_1: {
                name: 'Holy Smite',
                level: 1,
                mpCost: 12,
                power: 18,
                type: 'damage',
                cost: 0,
                description: 'Strike with divine justice',
                upgradesTo: 'smite_2'
            },
            smite_2: {
                name: 'Divine Wrath',
                level: 4,
                mpCost: 18,
                power: 32,
                type: 'damage',
                cost: 500,
                description: 'Channel the fury of the heavens',
                upgradesTo: 'smite_3',
                requires: 'smite_1'
            },
            smite_3: {
                name: 'Celestial Strike',
                level: 7,
                mpCost: 25,
                power: 50,
                type: 'damage',
                cost: 1500,
                description: 'A blow blessed by the gods',
                upgradesTo: 'smite_4',
                requires: 'smite_2'
            },
            smite_4: {
                name: 'Judgment',
                level: 10,
                mpCost: 35,
                power: 72,
                type: 'damage',
                cost: 3500,
                description: 'Divine judgment upon the wicked',
                upgradesTo: 'smite_5',
                requires: 'smite_3'
            },
            smite_5: {
                name: 'Holy Reckoning',
                level: 13,
                mpCost: 45,
                power: 100,
                type: 'damage',
                cost: 7000,
                description: 'The gods demand retribution',
                upgradesTo: 'smite_6',
                requires: 'smite_4'
            },
            smite_6: {
                name: 'Radiant Vengeance',
                level: 16,
                mpCost: 60,
                power: 135,
                type: 'damage',
                cost: 12000,
                description: 'Blinding light that punishes evil',
                upgradesTo: 'smite_7',
                requires: 'smite_5'
            },
            smite_7: {
                name: 'Armageddon',
                level: 19,
                mpCost: 75,
                power: 175,
                type: 'damage',
                cost: 20000,
                description: 'Bring forth the end of days',
                upgradesTo: 'smite_8',
                requires: 'smite_6'
            },
            smite_8: {
                name: "Heaven's Fury",
                level: 22,
                mpCost: 95,
                power: 230,
                type: 'damage',
                cost: 35000,
                description: 'The full wrath of the divine',
                upgradesTo: 'smite_9',
                requires: 'smite_7'
            },
            smite_9: {
                name: 'Godstrike',
                level: 25,
                mpCost: 120,
                power: 320,
                type: 'damage',
                cost: 50000,
                description: 'Smite with the power of a god',
                requires: 'smite_8'
            },
            
            // HEALING LINE (Light healing for paladins)
            heal_1: {
                name: 'Lay on Hands',
                level: 3,
                mpCost: 10,
                power: 25,
                type: 'heal',
                cost: 300,
                description: 'Touch of divine healing'
            },
            heal_2: {
                name: 'Blessing of Light',
                level: 6,
                mpCost: 15,
                power: 45,
                type: 'heal',
                cost: 1000,
                description: 'Bathe in holy light',
                upgradesTo: 'heal_3',
                requires: 'heal_1'
            },
            heal_3: {
                name: 'Divine Grace',
                level: 9,
                mpCost: 22,
                power: 70,
                type: 'heal',
                cost: 2500,
                description: 'The grace of the gods restores you',
                upgradesTo: 'heal_4',
                requires: 'heal_2'
            },
            heal_4: {
                name: 'Sacred Mending',
                level: 12,
                mpCost: 30,
                power: 100,
                type: 'heal',
                cost: 5000,
                description: 'Holy power mends your wounds',
                upgradesTo: 'heal_5',
                requires: 'heal_3'
            },
            heal_5: {
                name: 'Miracle',
                level: 15,
                mpCost: 40,
                power: 140,
                type: 'heal',
                cost: 9000,
                description: 'A miraculous restoration',
                upgradesTo: 'heal_6',
                requires: 'heal_4'
            },
            heal_6: {
                name: 'Divine Renewal',
                level: 18,
                mpCost: 50,
                power: 190,
                type: 'heal',
                cost: 15000,
                description: 'Completely renewed by divine power',
                upgradesTo: 'heal_7',
                requires: 'heal_5'
            },
            heal_7: {
                name: 'Resurrection Touch',
                level: 21,
                mpCost: 65,
                power: 250,
                type: 'heal',
                cost: 25000,
                description: 'Healing so powerful it could raise the dead',
                upgradesTo: 'heal_8',
                requires: 'heal_6'
            },
            heal_8: {
                name: 'Full Restore',
                level: 24,
                mpCost: 80,
                power: 999,
                type: 'heal',
                cost: 40000,
                description: 'Restore yourself to perfect health',
                requires: 'heal_7'
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // ACOLYTE/CLERIC - HOLY DAMAGE + POWERFUL HEALING
    // ═══════════════════════════════════════════════════════════════
    acolyte: {
        startingSpell: 'holy_bolt_1',
        spellTree: {
            // HOLY DAMAGE LINE
            holy_bolt_1: {
                name: 'Holy Bolt',
                level: 1,
                mpCost: 12,
                power: 16,
                type: 'damage',
                cost: 0,
                description: 'A bolt of pure holy energy',
                upgradesTo: 'holy_bolt_2'
            },
            holy_bolt_2: {
                name: 'Sacred Lance',
                level: 4,
                mpCost: 18,
                power: 30,
                type: 'damage',
                cost: 500,
                description: 'Pierce enemies with holy light',
                upgradesTo: 'holy_bolt_3',
                requires: 'holy_bolt_1'
            },
            holy_bolt_3: {
                name: 'Consecration',
                level: 7,
                mpCost: 26,
                power: 48,
                type: 'damage',
                cost: 1500,
                description: 'Consecrate the ground with holy fire',
                upgradesTo: 'holy_bolt_4',
                requires: 'holy_bolt_2'
            },
            holy_bolt_4: {
                name: 'Divine Storm',
                level: 10,
                mpCost: 36,
                power: 70,
                type: 'damage',
                cost: 3500,
                description: 'Storm of divine retribution',
                upgradesTo: 'holy_bolt_5',
                requires: 'holy_bolt_3'
            },
            holy_bolt_5: {
                name: 'Sanctified Wrath',
                level: 13,
                mpCost: 48,
                power: 95,
                type: 'damage',
                cost: 7000,
                description: 'Righteous anger made manifest',
                upgradesTo: 'holy_bolt_6',
                requires: 'holy_bolt_4'
            },
            holy_bolt_6: {
                name: 'Purifying Flame',
                level: 16,
                mpCost: 62,
                power: 130,
                type: 'damage',
                cost: 12000,
                description: 'Flames that purify the wicked',
                upgradesTo: 'holy_bolt_7',
                requires: 'holy_bolt_5'
            },
            holy_bolt_7: {
                name: 'Seraphic Blast',
                level: 19,
                mpCost: 78,
                power: 170,
                type: 'damage',
                cost: 20000,
                description: 'Angelic power unleashed',
                upgradesTo: 'holy_bolt_8',
                requires: 'holy_bolt_6'
            },
            holy_bolt_8: {
                name: 'Celestial Annihilation',
                level: 22,
                mpCost: 98,
                power: 220,
                type: 'damage',
                cost: 35000,
                description: 'The heavens themselves strike down your foe',
                upgradesTo: 'holy_bolt_9',
                requires: 'holy_bolt_7'
            },
            holy_bolt_9: {
                name: 'Rapture',
                level: 25,
                mpCost: 120,
                power: 300,
                type: 'damage',
                cost: 50000,
                description: 'Ultimate divine judgment',
                requires: 'holy_bolt_8'
            },
            
            // POWERFUL HEALING LINE
            cleric_heal_1: {
                name: 'Minor Heal',
                level: 2,
                mpCost: 8,
                power: 30,
                type: 'heal',
                cost: 200,
                description: 'Basic healing prayer'
            },
            cleric_heal_2: {
                name: 'Greater Heal',
                level: 5,
                mpCost: 14,
                power: 55,
                type: 'heal',
                cost: 800,
                description: 'More powerful healing',
                upgradesTo: 'cleric_heal_3',
                requires: 'cleric_heal_1'
            },
            cleric_heal_3: {
                name: 'Mass Healing',
                level: 8,
                mpCost: 22,
                power: 85,
                type: 'heal',
                cost: 2000,
                description: 'Powerful restorative magic',
                upgradesTo: 'cleric_heal_4',
                requires: 'cleric_heal_2'
            },
            cleric_heal_4: {
                name: 'Divine Restoration',
                level: 11,
                mpCost: 32,
                power: 120,
                type: 'heal',
                cost: 4500,
                description: 'Restore vast amounts of health',
                upgradesTo: 'cleric_heal_5',
                requires: 'cleric_heal_3'
            },
            cleric_heal_5: {
                name: 'Benediction',
                level: 14,
                mpCost: 44,
                power: 165,
                type: 'heal',
                cost: 8500,
                description: 'A powerful blessing of healing',
                upgradesTo: 'cleric_heal_6',
                requires: 'cleric_heal_4'
            },
            cleric_heal_6: {
                name: 'Holy Sanctuary',
                level: 17,
                mpCost: 58,
                power: 220,
                type: 'heal',
                cost: 14000,
                description: 'Create a sanctuary of healing light',
                upgradesTo: 'cleric_heal_7',
                requires: 'cleric_heal_5'
            },
            cleric_heal_7: {
                name: 'Regeneration',
                level: 20,
                mpCost: 74,
                power: 290,
                type: 'heal',
                cost: 22000,
                description: 'Rapid regeneration of wounds',
                upgradesTo: 'cleric_heal_8',
                requires: 'cleric_heal_6'
            },
            cleric_heal_8: {
                name: 'Divine Intervention',
                level: 23,
                mpCost: 92,
                power: 380,
                type: 'heal',
                cost: 38000,
                description: 'The gods themselves intervene to heal you',
                upgradesTo: 'cleric_heal_9',
                requires: 'cleric_heal_7'
            },
            cleric_heal_9: {
                name: 'Rebirth',
                level: 25,
                mpCost: 110,
                power: 500,
                type: 'heal',
                cost: 50000,
                description: 'Complete restoration - as if reborn',
                requires: 'cleric_heal_8'
            }
        }
    },

    // Cleric uses same tree as acolyte
    cleric: {
        startingSpell: 'holy_bolt_1',
        spellTree: {
            // HOLY DAMAGE LINE
            holy_bolt_1: {
                name: 'Holy Bolt',
                level: 1,
                mpCost: 12,
                power: 16,
                type: 'damage',
                cost: 0,
                description: 'A bolt of pure holy energy',
                upgradesTo: 'holy_bolt_2'
            },
            holy_bolt_2: {
                name: 'Sacred Lance',
                level: 4,
                mpCost: 18,
                power: 30,
                type: 'damage',
                cost: 500,
                description: 'Pierce enemies with holy light',
                upgradesTo: 'holy_bolt_3',
                requires: 'holy_bolt_1'
            },
            holy_bolt_3: {
                name: 'Consecration',
                level: 7,
                mpCost: 26,
                power: 48,
                type: 'damage',
                cost: 1500,
                description: 'Consecrate the ground with holy fire',
                upgradesTo: 'holy_bolt_4',
                requires: 'holy_bolt_2'
            },
            holy_bolt_4: {
                name: 'Divine Storm',
                level: 10,
                mpCost: 36,
                power: 70,
                type: 'damage',
                cost: 3500,
                description: 'Storm of divine retribution',
                upgradesTo: 'holy_bolt_5',
                requires: 'holy_bolt_3'
            },
            holy_bolt_5: {
                name: 'Sanctified Wrath',
                level: 13,
                mpCost: 48,
                power: 95,
                type: 'damage',
                cost: 7000,
                description: 'Righteous anger made manifest',
                upgradesTo: 'holy_bolt_6',
                requires: 'holy_bolt_4'
            },
            holy_bolt_6: {
                name: 'Purifying Flame',
                level: 16,
                mpCost: 62,
                power: 130,
                type: 'damage',
                cost: 12000,
                description: 'Flames that purify the wicked',
                upgradesTo: 'holy_bolt_7',
                requires: 'holy_bolt_5'
            },
            holy_bolt_7: {
                name: 'Seraphic Blast',
                level: 19,
                mpCost: 78,
                power: 170,
                type: 'damage',
                cost: 20000,
                description: 'Angelic power unleashed',
                upgradesTo: 'holy_bolt_8',
                requires: 'holy_bolt_6'
            },
            holy_bolt_8: {
                name: 'Celestial Annihilation',
                level: 22,
                mpCost: 98,
                power: 220,
                type: 'damage',
                cost: 35000,
                description: 'The heavens themselves strike down your foe',
                upgradesTo: 'holy_bolt_9',
                requires: 'holy_bolt_7'
            },
            holy_bolt_9: {
                name: 'Rapture',
                level: 25,
                mpCost: 120,
                power: 300,
                type: 'damage',
                cost: 50000,
                description: 'Ultimate divine judgment',
                requires: 'holy_bolt_8'
            },
            
            // POWERFUL HEALING LINE
            cleric_heal_1: {
                name: 'Minor Heal',
                level: 2,
                mpCost: 8,
                power: 30,
                type: 'heal',
                cost: 200,
                description: 'Basic healing prayer'
            },
            cleric_heal_2: {
                name: 'Greater Heal',
                level: 5,
                mpCost: 14,
                power: 55,
                type: 'heal',
                cost: 800,
                description: 'More powerful healing',
                upgradesTo: 'cleric_heal_3',
                requires: 'cleric_heal_1'
            },
            cleric_heal_3: {
                name: 'Mass Healing',
                level: 8,
                mpCost: 22,
                power: 85,
                type: 'heal',
                cost: 2000,
                description: 'Powerful restorative magic',
                upgradesTo: 'cleric_heal_4',
                requires: 'cleric_heal_2'
            },
            cleric_heal_4: {
                name: 'Divine Restoration',
                level: 11,
                mpCost: 32,
                power: 120,
                type: 'heal',
                cost: 4500,
                description: 'Restore vast amounts of health',
                upgradesTo: 'cleric_heal_5',
                requires: 'cleric_heal_3'
            },
            cleric_heal_5: {
                name: 'Benediction',
                level: 14,
                mpCost: 44,
                power: 165,
                type: 'heal',
                cost: 8500,
                description: 'A powerful blessing of healing',
                upgradesTo: 'cleric_heal_6',
                requires: 'cleric_heal_4'
            },
            cleric_heal_6: {
                name: 'Holy Sanctuary',
                level: 17,
                mpCost: 58,
                power: 220,
                type: 'heal',
                cost: 14000,
                description: 'Create a sanctuary of healing light',
                upgradesTo: 'cleric_heal_7',
                requires: 'cleric_heal_5'
            },
            cleric_heal_7: {
                name: 'Regeneration',
                level: 20,
                mpCost: 74,
                power: 290,
                type: 'heal',
                cost: 22000,
                description: 'Rapid regeneration of wounds',
                upgradesTo: 'cleric_heal_8',
                requires: 'cleric_heal_6'
            },
            cleric_heal_8: {
                name: 'Divine Intervention',
                level: 23,
                mpCost: 92,
                power: 380,
                type: 'heal',
                cost: 38000,
                description: 'The gods themselves intervene to heal you',
                upgradesTo: 'cleric_heal_9',
                requires: 'cleric_heal_7'
            },
            cleric_heal_9: {
                name: 'Rebirth',
                level: 25,
                mpCost: 110,
                power: 500,
                type: 'heal',
                cost: 50000,
                description: 'Complete restoration - as if reborn',
                requires: 'cleric_heal_8'
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // WARLOCK - DARK DAMAGE + LIFESTEAL/LEECH
    // ═══════════════════════════════════════════════════════════════
    warlock: {
        startingSpell: 'shadow_bolt_1',
        spellTree: {
            // SHADOW DAMAGE LINE
            shadow_bolt_1: {
                name: 'Shadow Bolt',
                level: 1,
                mpCost: 14,
                power: 18,
                type: 'damage',
                cost: 0,
                description: 'Hurl a bolt of shadow energy',
                upgradesTo: 'shadow_bolt_2'
            },
            shadow_bolt_2: {
                name: 'Dark Missile',
                level: 4,
                mpCost: 20,
                power: 33,
                type: 'damage',
                cost: 500,
                description: 'A missile of pure darkness',
                upgradesTo: 'shadow_bolt_3',
                requires: 'shadow_bolt_1'
            },
            shadow_bolt_3: {
                name: 'Void Strike',
                level: 7,
                mpCost: 28,
                power: 52,
                type: 'damage',
                cost: 1500,
                description: 'Strike from the void itself',
                upgradesTo: 'shadow_bolt_4',
                requires: 'shadow_bolt_2'
            },
            shadow_bolt_4: {
                name: 'Necrotic Blast',
                level: 10,
                mpCost: 38,
                power: 76,
                type: 'damage',
                cost: 3500,
                description: 'Blast of death energy',
                upgradesTo: 'shadow_bolt_5',
                requires: 'shadow_bolt_3'
            },
            shadow_bolt_5: {
                name: 'Curse of Agony',
                level: 13,
                mpCost: 50,
                power: 105,
                type: 'damage',
                cost: 7000,
                description: 'Inflict terrible suffering',
                upgradesTo: 'shadow_bolt_6',
                requires: 'shadow_bolt_4'
            },
            shadow_bolt_6: {
                name: 'Soul Shatter',
                level: 16,
                mpCost: 64,
                power: 140,
                type: 'damage',
                cost: 12000,
                description: 'Shatter the enemy\'s soul',
                upgradesTo: 'shadow_bolt_7',
                requires: 'shadow_bolt_5'
            },
            shadow_bolt_7: {
                name: 'Damnation',
                level: 19,
                mpCost: 80,
                power: 185,
                type: 'damage',
                cost: 20000,
                description: 'Eternal damnation for your foes',
                upgradesTo: 'shadow_bolt_8',
                requires: 'shadow_bolt_6'
            },
            shadow_bolt_8: {
                name: 'Oblivion',
                level: 22,
                mpCost: 100,
                power: 245,
                type: 'damage',
                cost: 35000,
                description: 'Send them to oblivion',
                upgradesTo: 'shadow_bolt_9',
                requires: 'shadow_bolt_7'
            },
            shadow_bolt_9: {
                name: 'Apocalypse',
                level: 25,
                mpCost: 125,
                power: 340,
                type: 'damage',
                cost: 50000,
                description: 'Bring about the end of all things',
                requires: 'shadow_bolt_8'
            },
            
            // LIFESTEAL/LEECH LINE
            drain_1: {
                name: 'Siphon Life',
                level: 3,
                mpCost: 12,
                power: 15,
                type: 'lifesteal',
                lifestealPercent: 50,
                cost: 300,
                description: 'Drain enemy life force (50% returned as HP)'
            },
            drain_2: {
                name: 'Vampiric Touch',
                level: 6,
                mpCost: 18,
                power: 28,
                type: 'lifesteal',
                lifestealPercent: 60,
                cost: 1000,
                description: 'Steal life from your enemy (60% returned)',
                upgradesTo: 'drain_3',
                requires: 'drain_1'
            },
            drain_3: {
                name: 'Soul Leech',
                level: 9,
                mpCost: 26,
                power: 44,
                type: 'lifesteal',
                lifestealPercent: 70,
                cost: 2500,
                description: 'Leech the enemy\'s soul (70% returned)',
                upgradesTo: 'drain_4',
                requires: 'drain_2'
            },
            drain_4: {
                name: 'Death Pact',
                level: 12,
                mpCost: 36,
                power: 65,
                type: 'lifesteal',
                lifestealPercent: 75,
                cost: 5000,
                description: 'Pact with death itself (75% returned)',
                upgradesTo: 'drain_5',
                requires: 'drain_3'
            },
            drain_5: {
                name: 'Blood Ritual',
                level: 15,
                mpCost: 48,
                power: 90,
                type: 'lifesteal',
                lifestealPercent: 80,
                cost: 9000,
                description: 'Dark ritual that feeds on life (80% returned)',
                upgradesTo: 'drain_6',
                requires: 'drain_4'
            },
            drain_6: {
                name: 'Consume Soul',
                level: 18,
                mpCost: 62,
                power: 120,
                type: 'lifesteal',
                lifestealPercent: 85,
                cost: 15000,
                description: 'Consume the enemy\'s essence (85% returned)',
                upgradesTo: 'drain_7',
                requires: 'drain_5'
            },
            drain_7: {
                name: 'Life Harvest',
                level: 21,
                mpCost: 78,
                power: 160,
                type: 'lifesteal',
                lifestealPercent: 90,
                cost: 25000,
                description: 'Harvest abundant life energy (90% returned)',
                upgradesTo: 'drain_8',
                requires: 'drain_6'
            },
            drain_8: {
                name: 'Essence Drain',
                level: 24,
                mpCost: 96,
                power: 210,
                type: 'lifesteal',
                lifestealPercent: 95,
                cost: 40000,
                description: 'Drain the very essence of life (95% returned)',
                upgradesTo: 'drain_9',
                requires: 'drain_7'
            },
            drain_9: {
                name: 'Immortal Hunger',
                level: 25,
                mpCost: 115,
                power: 280,
                type: 'lifesteal',
                lifestealPercent: 100,
                cost: 50000,
                description: 'Feed eternally on life itself (100% returned)',
                requires: 'drain_8'
            }
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLASS_SPELL_TREES };
}
