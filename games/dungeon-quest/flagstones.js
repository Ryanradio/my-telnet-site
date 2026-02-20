window.DUNGEONS = window.DUNGEONS || {};
window.DUNGEONS.Flagstones = {
  "name": "The Flagstones",
  "description": "A three-level dungeon of ancient evil. Level 1 features Ice Giants and Stygian Dragons guarding the Yellow Rune. Level 2 holds Greater Demons and Stone Giants amid flame traps. Level 3 is the deepest, where Flame Giants, Ogre Mages, and Apollyon Dragons guard the greatest treasures.",
  "floors": {
    "1": {
      "startRoom": "R1",
      "rooms": {
        "R1": {
          "name": "Upper Landing",
          "description": "A platform of ancient stone. Stairs lead up to the Cellars above.",
          "map": {
            "x": 16,
            "y": 2
          },
          "exits": {
            "s": "R2"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R2": {
          "name": "The Yellow Gate",
          "description": "A shimmering barrier blocks passage south. The Yellow Rune is required to proceed.",
          "map": {
            "x": 16,
            "y": 3
          },
          "exits": {
            "n": "R1",
            "s": "R3"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R3": {
          "name": "Grand Corridor",
          "description": "A wide hallway stretches north-south.",
          "map": {
            "x": 16,
            "y": 4
          },
          "exits": {
            "n": "R2",
            "s": "R4"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R4": {
          "name": "Hall of Pillars",
          "description": "Massive stone columns support the ceiling.",
          "map": {
            "x": 16,
            "y": 5
          },
          "exits": {
            "n": "R3",
            "s": "R5"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R5": {
          "name": "The Crossroads",
          "description": "Paths branch in multiple directions.",
          "map": {
            "x": 16,
            "y": 6
          },
          "exits": {
            "n": "R4",
            "w": "R6",
            "e": "R9",
            "s": "R11"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R6": {
          "name": "West Passage",
          "description": "The corridor turns west.",
          "map": {
            "x": 14,
            "y": 6
          },
          "exits": {
            "e": "R5",
            "w": "R7"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R7": {
          "name": "The Hydra Chamber",
          "description": "A fearsome Hydra makes its lair here.",
          "map": {
            "x": 12,
            "y": 6
          },
          "exits": {
            "e": "R6",
            "n": "R8"
          },
          "contents": {
            "enemies": [
              {
                "key": "hydra",
                "drop": "scroll_3",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R8": {
          "name": "Teleport Chamber O",
          "description": "A magical circle glows on the floor. Teleporter 'O'.",
          "map": {
            "x": 12,
            "y": 5
          },
          "exits": {
            "s": "R7"
          },
          "contents": {
            "teleporter": "O"
          },
          "flags": {
            "discovered": false
          }
        },
        "R9": {
          "name": "East Passage",
          "description": "The air grows colder.",
          "map": {
            "x": 18,
            "y": 6
          },
          "exits": {
            "w": "R5",
            "e": "R10"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R10": {
          "name": "Ice Giant Lair",
          "description": "Frost covers the walls. An Ice Giant guards this chamber.",
          "map": {
            "x": 20,
            "y": 6
          },
          "exits": {
            "w": "R9"
          },
          "contents": {
            "enemies": [
              {
                "key": "ice_giant",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R11": {
          "name": "Deep Corridor",
          "description": "The passage descends slightly.",
          "map": {
            "x": 16,
            "y": 7
          },
          "exits": {
            "n": "R5",
            "s": "R12"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R12": {
          "name": "The Great Hall",
          "description": "A vast chamber opens before you.",
          "map": {
            "x": 16,
            "y": 8
          },
          "exits": {
            "n": "R11",
            "w": "R13",
            "e": "R16",
            "s": "R19"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R13": {
          "name": "West Gallery",
          "description": "Dark shapes move in the shadows.",
          "map": {
            "x": 14,
            "y": 8
          },
          "exits": {
            "e": "R12",
            "w": "R14"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R14": {
          "name": "Warlock Sanctum",
          "description": "Three Warlocks perform dark rituals here.",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "e": "R13",
            "w": "R15"
          },
          "contents": {
            "enemies": [
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R15": {
          "name": "Teleport Chamber C",
          "description": "A teleport circle hums with energy. Lowercase 'c'.",
          "map": {
            "x": 10,
            "y": 8
          },
          "exits": {
            "e": "R14"
          },
          "contents": {
            "teleporter": "c"
          },
          "flags": {
            "discovered": false
          }
        },
        "R16": {
          "name": "East Gallery",
          "description": "The smell of sulfur fills the air.",
          "map": {
            "x": 18,
            "y": 8
          },
          "exits": {
            "w": "R12",
            "e": "R17"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R17": {
          "name": "Dragon Nest",
          "description": "Two Stygian Dragons coil around piles of bones.",
          "map": {
            "x": 20,
            "y": 8
          },
          "exits": {
            "w": "R16",
            "e": "R18"
          },
          "contents": {
            "enemies": [
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R18": {
          "name": "Teleport Chamber A",
          "description": "A teleport circle glows blue. Lowercase 'a'.",
          "map": {
            "x": 22,
            "y": 8
          },
          "exits": {
            "w": "R17"
          },
          "contents": {
            "teleporter": "a"
          },
          "flags": {
            "discovered": false
          }
        },
        "R19": {
          "name": "Trap Corridor",
          "description": "The floor looks suspiciously clean.",
          "map": {
            "x": 16,
            "y": 9
          },
          "exits": {
            "n": "R12",
            "s": "R20"
          },
          "contents": {
            "traps": [
              {
                "type": "spike",
                "damage": 30,
                "duration": 0,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R20": {
          "name": "The Slash Trap",
          "description": "Blades spring from the walls!",
          "map": {
            "x": 16,
            "y": 10
          },
          "exits": {
            "n": "R19",
            "w": "R21",
            "e": "R24",
            "s": "R27"
          },
          "contents": {
            "traps": [
              {
                "type": "spike",
                "damage": 40,
                "duration": 0,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R21": {
          "name": "West Tunnel",
          "description": "The passage narrows.",
          "map": {
            "x": 14,
            "y": 10
          },
          "exits": {
            "e": "R20",
            "w": "R22"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R22": {
          "name": "Poison Trap Hall",
          "description": "Green gas hisses from vents.",
          "map": {
            "x": 12,
            "y": 10
          },
          "exits": {
            "e": "R21",
            "w": "R23"
          },
          "contents": {
            "traps": [
              {
                "type": "poison",
                "damage": 10,
                "duration": 10,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R23": {
          "name": "Teleport Chamber D",
          "description": "A teleport circle pulses. Lowercase 'd'.",
          "map": {
            "x": 10,
            "y": 10
          },
          "exits": {
            "e": "R22"
          },
          "contents": {
            "teleporter": "d"
          },
          "flags": {
            "discovered": false
          }
        },
        "R24": {
          "name": "East Tunnel",
          "description": "Strange markings cover the walls.",
          "map": {
            "x": 18,
            "y": 10
          },
          "exits": {
            "w": "R20",
            "e": "R25"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R25": {
          "name": "The Lower Gallery",
          "description": "Ancient statues line the walls.",
          "map": {
            "x": 20,
            "y": 10
          },
          "exits": {
            "w": "R24",
            "e": "R26"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R26": {
          "name": "Teleport Chamber B",
          "description": "A teleport circle shimmers. Lowercase 'b'.",
          "map": {
            "x": 22,
            "y": 10
          },
          "exits": {
            "w": "R25"
          },
          "contents": {
            "teleporter": "b"
          },
          "flags": {
            "discovered": false
          }
        },
        "R27": {
          "name": "Deep Passage",
          "description": "The air is freezing.",
          "map": {
            "x": 16,
            "y": 11
          },
          "exits": {
            "n": "R20",
            "s": "R28",
            "w": "R29",
            "e": "R31"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R28": {
          "name": "Ice Giantess Lair",
          "description": "Two Ice Giantesses guard this chamber.",
          "map": {
            "x": 16,
            "y": 12
          },
          "exits": {
            "n": "R27",
            "s": "R33",
            "sw": "R34",
            "se": "R35"
          },
          "contents": {
            "enemies": [
              {
                "key": "ice_giantess",
                "drop": "scroll_2",
                "rarity": "rare"
              },
              {
                "key": "ice_giantess",
                "drop": "scroll_2",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R29": {
          "name": "Western Depths",
          "description": "The passage opens into a cavern.",
          "map": {
            "x": 10,
            "y": 12
          },
          "exits": {
            "e": "R27",
            "w": "R30"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R30": {
          "name": "Dragon Roost",
          "description": "Two Stygian Dragons sleep atop their hoard.",
          "map": {
            "x": 8,
            "y": 12
          },
          "exits": {
            "e": "R29"
          },
          "contents": {
            "enemies": [
              {
                "key": "stygian_dragon",
                "drop": "scroll_1",
                "rarity": "rare"
              },
              {
                "key": "stygian_dragon",
                "drop": "scroll_1",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R31": {
          "name": "Eastern Depths",
          "description": "Dark magic permeates the air.",
          "map": {
            "x": 22,
            "y": 12
          },
          "exits": {
            "w": "R27",
            "e": "R32"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R32": {
          "name": "Warlock Coven",
          "description": "Three Warlocks and their Dragon guardians.",
          "map": {
            "x": 24,
            "y": 12
          },
          "exits": {
            "w": "R31"
          },
          "contents": {
            "enemies": [
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R33": {
          "name": "The Descent",
          "description": "Stairs lead down to lower levels.",
          "map": {
            "x": 16,
            "y": 13
          },
          "exits": {
            "n": "R28"
          },
          "contents": {
            "ladder": {
              "direction": "down",
              "leadsTo": {
                "floor": 2,
                "room": "R36"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R34": {
          "name": "West Descent",
          "description": "A side passage descends.",
          "map": {
            "x": 14,
            "y": 13
          },
          "exits": {
            "ne": "R28"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R35": {
          "name": "East Descent",
          "description": "A narrow stair winds down.",
          "map": {
            "x": 18,
            "y": 13
          },
          "exits": {
            "nw": "R28"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        }
      }
    },
    "2": {
      "startRoom": "R36",
      "rooms": {
        "R36": {
          "name": "The Landing",
          "description": "You descend from above. The air is warmer here.",
          "map": {
            "x": 16,
            "y": 15
          },
          "exits": {
            "n": "R37",
            "s": "R55",
            "w": "R46",
            "e": "R52"
          },
          "contents": {
            "ladder": {
              "direction": "up",
              "leadsTo": {
                "floor": 1,
                "room": "R33"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R37": {
          "name": "North Passage",
          "description": "The corridor climbs slightly.",
          "map": {
            "x": 16,
            "y": 14
          },
          "exits": {
            "s": "R36",
            "n": "R38",
            "nw": "R40",
            "ne": "R43"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R38": {
          "name": "Demon's Roost",
          "description": "A Greater Demon guards this high chamber.",
          "map": {
            "x": 16,
            "y": 13
          },
          "exits": {
            "s": "R37",
            "n": "R39"
          },
          "contents": {
            "enemies": [
              {
                "key": "greater_demon",
                "drop": "",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R39": {
          "name": "Teleport Chamber N",
          "description": "Teleporter 'n' glows softly.",
          "map": {
            "x": 16,
            "y": 12
          },
          "exits": {
            "s": "R38"
          },
          "contents": {
            "teleporter": "n"
          },
          "flags": {
            "discovered": false
          }
        },
        "R40": {
          "name": "Northwest Passage",
          "description": "The walls are damp.",
          "map": {
            "x": 14,
            "y": 13
          },
          "exits": {
            "se": "R37",
            "w": "R41"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R41": {
          "name": "Ice Giant Hall",
          "description": "Two Ice Giants block the way.",
          "map": {
            "x": 12,
            "y": 13
          },
          "exits": {
            "e": "R40",
            "n": "R42"
          },
          "contents": {
            "enemies": [
              {
                "key": "ice_giant",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "ice_giant",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R42": {
          "name": "Teleport Chamber M",
          "description": "Teleporter 'm' pulses.",
          "map": {
            "x": 12,
            "y": 12
          },
          "exits": {
            "s": "R41"
          },
          "contents": {
            "teleporter": "m"
          },
          "flags": {
            "discovered": false
          }
        },
        "R43": {
          "name": "Northeast Passage",
          "description": "Heat radiates from ahead.",
          "map": {
            "x": 18,
            "y": 13
          },
          "exits": {
            "sw": "R37",
            "e": "R44"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R44": {
          "name": "Affreet Lair",
          "description": "An Affreet burns with inner fire.",
          "map": {
            "x": 20,
            "y": 13
          },
          "exits": {
            "w": "R43",
            "n": "R45"
          },
          "contents": {
            "enemies": [
              {
                "key": "affreet",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R45": {
          "name": "Teleport Chamber H",
          "description": "Teleporter 'h' flickers.",
          "map": {
            "x": 20,
            "y": 12
          },
          "exits": {
            "s": "R44"
          },
          "contents": {
            "teleporter": "h"
          },
          "flags": {
            "discovered": false
          }
        },
        "R46": {
          "name": "West Corridor",
          "description": "Statues line the walls.",
          "map": {
            "x": 14,
            "y": 15
          },
          "exits": {
            "e": "R36",
            "w": "R47"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R47": {
          "name": "Gargoyle Nest",
          "description": "Three Gargoyles perch on ledges.",
          "map": {
            "x": 12,
            "y": 15
          },
          "exits": {
            "e": "R46",
            "w": "R48",
            "s": "R49"
          },
          "contents": {
            "enemies": [
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R48": {
          "name": "Teleport Chamber E",
          "description": "Teleporter 'e' glows.",
          "map": {
            "x": 10,
            "y": 15
          },
          "exits": {
            "e": "R47"
          },
          "contents": {
            "teleporter": "e"
          },
          "flags": {
            "discovered": false
          }
        },
        "R49": {
          "name": "Flame Corridor",
          "description": "The floor is scorched.",
          "map": {
            "x": 12,
            "y": 16
          },
          "exits": {
            "n": "R47",
            "w": "R50"
          },
          "contents": {
            "traps": [
              {
                "type": "fire",
                "damage": 25,
                "duration": 0,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R50": {
          "name": "Flame Trap",
          "description": "Flames erupt from the floor!",
          "map": {
            "x": 10,
            "y": 16
          },
          "exits": {
            "e": "R49",
            "w": "R51"
          },
          "contents": {
            "traps": [
              {
                "type": "fire",
                "damage": 35,
                "duration": 0,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R51": {
          "name": "West Dead End",
          "description": "A dead end.",
          "map": {
            "x": 8,
            "y": 16
          },
          "exits": {
            "e": "R50"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R52": {
          "name": "East Corridor",
          "description": "Dark whispers echo.",
          "map": {
            "x": 18,
            "y": 15
          },
          "exits": {
            "w": "R36",
            "e": "R53"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R53": {
          "name": "Warlock Chamber",
          "description": "Three Warlocks study ancient tomes.",
          "map": {
            "x": 20,
            "y": 15
          },
          "exits": {
            "w": "R52",
            "n": "R54"
          },
          "contents": {
            "enemies": [
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R54": {
          "name": "Teleport Chamber N Lower",
          "description": "Teleporter 'n' hums.",
          "map": {
            "x": 20,
            "y": 14
          },
          "exits": {
            "s": "R53"
          },
          "contents": {
            "teleporter": "n"
          },
          "flags": {
            "discovered": false
          }
        },
        "R55": {
          "name": "Central Shaft",
          "description": "A vertical shaft descends into darkness.",
          "map": {
            "x": 16,
            "y": 16
          },
          "exits": {
            "n": "R36",
            "s": "R56"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R56": {
          "name": "The Crossroads",
          "description": "Paths branch in all directions.",
          "map": {
            "x": 16,
            "y": 17
          },
          "exits": {
            "n": "R55",
            "sw": "R57",
            "se": "R60",
            "s": "R63"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R57": {
          "name": "Southwest Passage",
          "description": "Heavy footsteps shake the floor.",
          "map": {
            "x": 14,
            "y": 17
          },
          "exits": {
            "ne": "R56",
            "w": "R58"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R58": {
          "name": "Stone Giant Lair",
          "description": "Three Stone Giants guard this hall.",
          "map": {
            "x": 12,
            "y": 17
          },
          "exits": {
            "e": "R57",
            "s": "R59",
            "w": "R66"
          },
          "contents": {
            "enemies": [
              {
                "key": "stone_giant",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "stone_giant",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "stone_giant",
                "drop": "",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R59": {
          "name": "Teleport Chamber F",
          "description": "Teleporter 'f' shimmers.",
          "map": {
            "x": 12,
            "y": 18
          },
          "exits": {
            "n": "R58"
          },
          "contents": {
            "teleporter": "f"
          },
          "flags": {
            "discovered": false
          }
        },
        "R60": {
          "name": "Southeast Passage",
          "description": "The smell of sulfur is strong.",
          "map": {
            "x": 18,
            "y": 17
          },
          "exits": {
            "nw": "R56",
            "e": "R61"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R61": {
          "name": "Dragon Vault",
          "description": "Two Stygian Dragons coil here.",
          "map": {
            "x": 20,
            "y": 17
          },
          "exits": {
            "w": "R60",
            "s": "R62",
            "e": "R67"
          },
          "contents": {
            "enemies": [
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "stygian_dragon",
                "drop": "",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R62": {
          "name": "Scroll Chamber",
          "description": "Scroll #4 lies here.",
          "map": {
            "x": 20,
            "y": 18
          },
          "exits": {
            "n": "R61"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R63": {
          "name": "Teleport Nexus",
          "description": "Multiple teleporters converge here.",
          "map": {
            "x": 16,
            "y": 18
          },
          "exits": {
            "n": "R56",
            "sw": "R64",
            "se": "R65"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R64": {
          "name": "To Level 1",
          "description": "Teleporter 'o' leads to Flagstones Level 1.",
          "map": {
            "x": 14,
            "y": 19
          },
          "exits": {
            "ne": "R63"
          },
          "contents": {
            "teleporter": "o"
          },
          "flags": {
            "discovered": false
          }
        },
        "R65": {
          "name": "To Level 3",
          "description": "Teleporter 'i' leads to Flagstones Level 3.",
          "map": {
            "x": 18,
            "y": 19
          },
          "exits": {
            "nw": "R63"
          },
          "contents": {
            "teleporter": "i",
            "ladder": {
              "direction": "down",
              "leadsTo": {
                "floor": 3,
                "room": "R68"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R66": {
          "name": "Secret Alcove",
          "description": "A hidden chamber.",
          "map": {
            "x": 10,
            "y": 17
          },
          "exits": {
            "e": "R58"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R67": {
          "name": "Treasure Room",
          "description": "Ancient chests lie here.",
          "map": {
            "x": 22,
            "y": 17
          },
          "exits": {
            "w": "R61"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R68": {
          "name": "Stone Trap Hall",
          "description": "The ceiling looks unstable.",
          "map": {
            "x": 16,
            "y": 14
          },
          "exits": {},
          "contents": {
            "traps": [
              {
                "type": "stone",
                "damage": 40,
                "duration": 0,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        }
      }
    },
    "3": {
      "startRoom": "R68",
      "rooms": {
        "R68": {
          "name": "The Deep Descent",
          "description": "You have reached the deepest level. The heat is intense.",
          "map": {
            "x": 16,
            "y": 20
          },
          "exits": {
            "n": "R69",
            "w": "R78",
            "e": "R81",
            "s": "R84"
          },
          "contents": {
            "ladder": {
              "direction": "up",
              "leadsTo": {
                "floor": 2,
                "room": "R65"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R69": {
          "name": "Deep Corridor",
          "description": "The walls glow with inner heat.",
          "map": {
            "x": 16,
            "y": 19
          },
          "exits": {
            "s": "R68",
            "n": "R70"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R70": {
          "name": "The Great Cavern",
          "description": "A vast natural cavern opens before you.",
          "map": {
            "x": 16,
            "y": 18
          },
          "exits": {
            "s": "R69",
            "nw": "R71",
            "ne": "R74"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R71": {
          "name": "Northwest Passage",
          "description": "Dark figures move in the shadows.",
          "map": {
            "x": 14,
            "y": 18
          },
          "exits": {
            "se": "R70",
            "w": "R72"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R72": {
          "name": "Warlock Stronghold",
          "description": "Warlocks practice forbidden magic.",
          "map": {
            "x": 12,
            "y": 18
          },
          "exits": {
            "e": "R71",
            "w": "R73"
          },
          "contents": {
            "enemies": [
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R73": {
          "name": "Teleport Chamber I",
          "description": "Teleporter 'i' glows.",
          "map": {
            "x": 10,
            "y": 18
          },
          "exits": {
            "e": "R72"
          },
          "contents": {
            "teleporter": "i"
          },
          "flags": {
            "discovered": false
          }
        },
        "R74": {
          "name": "Northeast Passage",
          "description": "The air shimmers with heat.",
          "map": {
            "x": 18,
            "y": 18
          },
          "exits": {
            "sw": "R70",
            "e": "R75"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R75": {
          "name": "Flame Giant Lair",
          "description": "A Flame Giant wields burning weapons.",
          "map": {
            "x": 20,
            "y": 18
          },
          "exits": {
            "w": "R74",
            "e": "R76"
          },
          "contents": {
            "enemies": [
              {
                "key": "flame_giant",
                "drop": "scroll_8",
                "rarity": "epic"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R76": {
          "name": "Flame Trap Corridor",
          "description": "The floor is lava!",
          "map": {
            "x": 22,
            "y": 18
          },
          "exits": {
            "w": "R75",
            "e": "R77"
          },
          "contents": {
            "traps": [
              {
                "type": "fire",
                "damage": 50,
                "duration": 0,
                "resetOnLeave": true,
                "triggered": false
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R77": {
          "name": "Teleport Chamber K",
          "description": "Teleporter 'k' pulses.",
          "map": {
            "x": 24,
            "y": 18
          },
          "exits": {
            "w": "R76"
          },
          "contents": {
            "teleporter": "k"
          },
          "flags": {
            "discovered": false
          }
        },
        "R78": {
          "name": "West Passage",
          "description": "The stench of dragon fills the air.",
          "map": {
            "x": 14,
            "y": 20
          },
          "exits": {
            "e": "R68",
            "w": "R79"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R79": {
          "name": "Dragon's Lair",
          "description": "An Apollyon Dragon guards Scroll #6.",
          "map": {
            "x": 12,
            "y": 20
          },
          "exits": {
            "e": "R78",
            "w": "R80",
            "sw": "R94"
          },
          "contents": {
            "enemies": [
              {
                "key": "apollyon_dragon",
                "drop": "scroll_6",
                "rarity": "legendary"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R80": {
          "name": "Deep Chamber",
          "description": "Ancient treasures lie here.",
          "map": {
            "x": 10,
            "y": 20
          },
          "exits": {
            "e": "R79"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R81": {
          "name": "East Passage",
          "description": "Multiple threats lurk ahead.",
          "map": {
            "x": 18,
            "y": 20
          },
          "exits": {
            "w": "R68",
            "e": "R82"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R82": {
          "name": "Eastern Lair",
          "description": "An Apollyon Dragon and Warlocks.",
          "map": {
            "x": 20,
            "y": 20
          },
          "exits": {
            "w": "R81",
            "e": "R83",
            "se": "R95"
          },
          "contents": {
            "enemies": [
              {
                "key": "apollyon_dragon",
                "drop": "",
                "rarity": "legendary"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R83": {
          "name": "Teleport Chamber J",
          "description": "Teleporter 'j' flickers.",
          "map": {
            "x": 22,
            "y": 20
          },
          "exits": {
            "w": "R82"
          },
          "contents": {
            "teleporter": "j"
          },
          "flags": {
            "discovered": false
          }
        },
        "R84": {
          "name": "Southern Passage",
          "description": "The passage widens.",
          "map": {
            "x": 16,
            "y": 21
          },
          "exits": {
            "n": "R68",
            "s": "R85"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R85": {
          "name": "Ogre Mage Sanctum",
          "description": "Three Ogre Mages study dark arts.",
          "map": {
            "x": 16,
            "y": 22
          },
          "exits": {
            "n": "R84",
            "w": "R86",
            "e": "R87",
            "nw": "R92",
            "ne": "R93",
            "s": "R88"
          },
          "contents": {
            "enemies": [
              {
                "key": "ogre_mage",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "ogre_mage",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "ogre_mage",
                "drop": "",
                "rarity": "rare"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R86": {
          "name": "West Shrine",
          "description": "A shrine to forgotten gods.",
          "map": {
            "x": 14,
            "y": 22
          },
          "exits": {
            "e": "R85"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R87": {
          "name": "East Shrine",
          "description": "Strange runes cover the walls.",
          "map": {
            "x": 18,
            "y": 22
          },
          "exits": {
            "w": "R85"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R88": {
          "name": "The Final Descent",
          "description": "Stairs lead to the lowest point.",
          "map": {
            "x": 16,
            "y": 23
          },
          "exits": {
            "n": "R85",
            "s": "R89"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R89": {
          "name": "Stygian Vault",
          "description": "Three Stygian Dragons guard the deepest treasure.",
          "map": {
            "x": 16,
            "y": 24
          },
          "exits": {
            "n": "R88",
            "w": "R90",
            "e": "R91",
            "s": "R96"
          },
          "contents": {
            "enemies": [
              {
                "key": "stygian_dragon",
                "drop": "scroll_5",
                "rarity": "epic"
              },
              {
                "key": "stygian_dragon",
                "drop": "scroll_5",
                "rarity": "epic"
              },
              {
                "key": "stygian_dragon",
                "drop": "scroll_5",
                "rarity": "epic"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R90": {
          "name": "Treasure Chamber",
          "description": "Gold and jewels sparkle.",
          "map": {
            "x": 14,
            "y": 24
          },
          "exits": {
            "e": "R89"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R91": {
          "name": "Secret Vault",
          "description": "Ancient artifacts lie here.",
          "map": {
            "x": 18,
            "y": 24
          },
          "exits": {
            "w": "R89"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R92": {
          "name": "Warlock Nest",
          "description": "Warlocks perform rituals.",
          "map": {
            "x": 12,
            "y": 22
          },
          "exits": {
            "se": "R85"
          },
          "contents": {
            "enemies": [
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R93": {
          "name": "Dark Chamber",
          "description": "Shadow magic permeates the air.",
          "map": {
            "x": 20,
            "y": 22
          },
          "exits": {
            "sw": "R85"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R94": {
          "name": "Affreet Nest",
          "description": "Two Affreets burn with hatred.",
          "map": {
            "x": 8,
            "y": 20
          },
          "exits": {
            "ne": "R79"
          },
          "contents": {
            "enemies": [
              {
                "key": "affreet",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "affreet",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R95": {
          "name": "Warlock Vault",
          "description": "Three Warlocks guard treasures.",
          "map": {
            "x": 24,
            "y": 20
          },
          "exits": {
            "nw": "R82"
          },
          "contents": {
            "enemies": [
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "warlock",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R96": {
          "name": "Teleport Chamber L",
          "description": "Teleporter 'l' leads back to Level 2.",
          "map": {
            "x": 16,
            "y": 25
          },
          "exits": {
            "n": "R89"
          },
          "contents": {
            "teleporter": "l"
          },
          "flags": {
            "discovered": false
          }
        }
      }
    }
  }
};