window.DUNGEONS = window.DUNGEONS || {};
window.DUNGEONS.Dungeon1 = {
  "name": "Dungeon1",
  "description": "Dungeon1",
  "floors": {
    "1": {
      "startRoom": "R1",
      "rooms": {
        "R1": {
          "name": "The Entrance Hall",
          "description": "You are in the entry chamber of the Undermaze, where torchlight barely reaches the walls. A heavy iron door to the northeast is sealed tight.",
          "map": {
            "x": 12,
            "y": 7
          },
          "exits": {
            "s": "R2",
            "w": "R8",
            "ne": "R48"
          },
          "contents": {
            "doors": {
              "ne": {
                "type": "iron",
                "locked": true
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R2": {
          "name": "Crumbling Vestibule",
          "description": "You are in a crumbling stone chamber, the ceiling sagging under centuries of weight.",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "n": "R1",
            "se": "R3"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R3": {
          "name": "The Sloped Pass",
          "description": "You are in a narrow passage that angles sharply downward, the floor slick with moisture.",
          "map": {
            "x": 13,
            "y": 9
          },
          "exits": {
            "nw": "R2",
            "e": "R4"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R4": {
          "name": "Orc Sentry Post",
          "description": "You are in a wide guard chamber, reeking of old meat and burning pitch. An orc looks up with murder in its eyes.",
          "map": {
            "x": 14,
            "y": 9
          },
          "exits": {
            "w": "R3",
            "se": "R5"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R5": {
          "name": "The Winding Cut",
          "description": "You are in a tight zigzagging corridor carved by pick, not nature.",
          "map": {
            "x": 15,
            "y": 10
          },
          "exits": {
            "nw": "R4",
            "se": "R6"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R6": {
          "name": "The Lion's Den",
          "description": "You are in a low cave that stinks of blood and matted fur. Something large has been living here.",
          "map": {
            "x": 16,
            "y": 11
          },
          "exits": {
            "nw": "R5"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R8": {
          "name": "The West Approach",
          "description": "You are in a wide passage cut through limestone, your footsteps echoing ahead of you.",
          "map": {
            "x": 11,
            "y": 7
          },
          "exits": {
            "e": "R1",
            "w": "R9"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R9": {
          "name": "The Orc Patrol Route",
          "description": "You are in a long corridor patrolled by an orc who doesn't appreciate company.",
          "map": {
            "x": 10,
            "y": 7
          },
          "exits": {
            "e": "R8",
            "w": "R10"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R10": {
          "name": "The Corner Hollow",
          "description": "You are in a squat alcove where two tunnels meet at an awkward angle.",
          "map": {
            "x": 9,
            "y": 7
          },
          "exits": {
            "e": "R9",
            "sw": "R11"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R11": {
          "name": "The Watch Room",
          "description": "You are in a former guard post, its crude furnishings long since rotted. The orc inside hasn't.",
          "map": {
            "x": 8,
            "y": 8
          },
          "exits": {
            "ne": "R10",
            "s": "R12"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R12": {
          "name": "The Drip Passage",
          "description": "You are in a narrow hallway where water drips steadily from cracks overhead.",
          "map": {
            "x": 8,
            "y": 9
          },
          "exits": {
            "n": "R11",
            "s": "R13"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R13": {
          "name": "The Copper Gate",
          "description": "You are in a rounded chamber blocked by a heavy copper door to the southeast. A giant scorpion coils nearby, the key glinting in its carapace.",
          "map": {
            "x": 8,
            "y": 10
          },
          "exits": {
            "n": "R12",
            "se": "R14"
          },
          "contents": {
            "doors": {
              "se": {
                "type": "copper",
                "locked": true
              }
            },
            "enemies": [
              {
                "key": "giant_scorpion",
                "drop": "copper_key"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R14": {
          "name": "The Worm Gallery",
          "description": "You are in a long chamber where the walls are riddled with ancient burrowing tunnels.",
          "map": {
            "x": 9,
            "y": 11
          },
          "exits": {
            "nw": "R13",
            "se": "R15"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R15": {
          "name": "The Spike Run",
          "description": "You are in a corridor that feels wrong — the floor has too many seams. Step carefully.",
          "map": {
            "x": 10,
            "y": 12
          },
          "exits": {
            "nw": "R14",
            "se": "R16"
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
        "R16": {
          "name": "The Descent Bend",
          "description": "You are in a curved passage that slopes gently downward into warmer air.",
          "map": {
            "x": 11,
            "y": 13
          },
          "exits": {
            "nw": "R15",
            "s": "R17"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R17": {
          "name": "The Brass Gate Crossroads",
          "description": "You are in a four-way junction dominated by a locked brass door to the east. A scorpion guards it jealously.",
          "map": {
            "x": 11,
            "y": 14
          },
          "exits": {
            "n": "R16",
            "sw": "R18",
            "s": "R29",
            "e": "R35"
          },
          "contents": {
            "doors": {
              "e": {
                "type": "brass",
                "locked": true
              }
            },
            "enemies": [
              {
                "key": "giant_scorpion",
                "drop": "brass_key"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R18": {
          "name": "The Angled Hall",
          "description": "You are in a slanted passageway, the walls scarred by old pickaxe marks.",
          "map": {
            "x": 10,
            "y": 15
          },
          "exits": {
            "ne": "R17",
            "sw": "R19"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R19": {
          "name": "The Southwest Fork",
          "description": "You are in a rough junction where an orc has made itself at home between two passages.",
          "map": {
            "x": 9,
            "y": 16
          },
          "exits": {
            "ne": "R18",
            "s": "R27",
            "w": "R20"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R20": {
          "name": "The Bent Tunnel",
          "description": "You are in a curved corridor that arcs through solid granite.",
          "map": {
            "x": 8,
            "y": 16
          },
          "exits": {
            "e": "R19",
            "nw": "R21"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R21": {
          "name": "The Wolf Run",
          "description": "You are in a wide passage where claw marks scar the lower walls. A dire wolf snarls from the shadows.",
          "map": {
            "x": 7,
            "y": 15
          },
          "exits": {
            "se": "R20",
            "nw": "R22"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_gnoll",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R22": {
          "name": "The Slant Chamber",
          "description": "You are in a low room tilted at an unsettling angle, the floor worn smooth by years of something dragging through it.",
          "map": {
            "x": 6,
            "y": 14
          },
          "exits": {
            "se": "R21",
            "w": "R23"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R23": {
          "name": "The Orc Junction",
          "description": "You are in a three-way split guarded by a belligerent orc who has no intention of letting you pass quietly.",
          "map": {
            "x": 5,
            "y": 14
          },
          "exits": {
            "e": "R22",
            "sw": "R24",
            "n": "R25"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R24": {
          "name": "The Dead Spur",
          "description": "You are in a short dead-end passage that smells of damp earth and nothing useful.",
          "map": {
            "x": 4,
            "y": 15
          },
          "exits": {
            "ne": "R23"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R25": {
          "name": "The Low Arch",
          "description": "You are in a passage so low you must duck, the stone arch worn smooth by countless shoulders.",
          "map": {
            "x": 5,
            "y": 13
          },
          "exits": {
            "s": "R23",
            "ne": "R26"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R26": {
          "name": "The Wolf Lair",
          "description": "You are in a rough cave that reeks of wet fur and old bones. A dire wolf charges the moment it sees you.",
          "map": {
            "x": 6,
            "y": 12
          },
          "exits": {
            "sw": "R25"
          },
          "contents": {
            "enemies": [
              {
                "key": "dungeon_bat",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R27": {
          "name": "The South Drop",
          "description": "You are in a passage that descends sharply, the air growing noticeably colder.",
          "map": {
            "x": 9,
            "y": 17
          },
          "exits": {
            "n": "R19",
            "sw": "R28"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R28": {
          "name": "The Ambush Corner",
          "description": "You are in a blind corner where an orc lurks, almost certainly having heard you coming.",
          "map": {
            "x": 8,
            "y": 18
          },
          "exits": {
            "ne": "R27"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R29": {
          "name": "The Descent Corridor",
          "description": "You are in a long downward passage, the stonework here older and rougher than above.",
          "map": {
            "x": 11,
            "y": 15
          },
          "exits": {
            "n": "R17",
            "se": "R30"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R30": {
          "name": "The Ribbed Hall",
          "description": "You are in a tunnel braced with old timber ribs, several of which have cracked under pressure.",
          "map": {
            "x": 12,
            "y": 16
          },
          "exits": {
            "nw": "R29",
            "s": "R31"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R31": {
          "name": "The Orc Barracks",
          "description": "You are in what was once a sleeping chamber. The orc that remains looks wide awake and angry.",
          "map": {
            "x": 12,
            "y": 17
          },
          "exits": {
            "n": "R30",
            "sw": "R32",
            "se": "R33"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R32": {
          "name": "The Low Storeroom",
          "description": "You are in a small room with empty stone shelves and the lingering smell of mold.",
          "map": {
            "x": 11,
            "y": 18
          },
          "exits": {
            "ne": "R31"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R33": {
          "name": "The Zigzag Passage",
          "description": "You are in a sharply angled corridor that doubles back on itself unexpectedly.",
          "map": {
            "x": 13,
            "y": 18
          },
          "exits": {
            "nw": "R31",
            "se": "R34"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R34": {
          "name": "The Deep Corner",
          "description": "You are in a rough dead-end chamber where an orc has backed itself in. It charges immediately.",
          "map": {
            "x": 14,
            "y": 19
          },
          "exits": {
            "nw": "R33"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R35": {
          "name": "The East Turn",
          "description": "You are in a wide bend in the passage, the walls bearing crude orcish markings.",
          "map": {
            "x": 12,
            "y": 14
          },
          "exits": {
            "w": "R17",
            "se": "R36"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R36": {
          "name": "The Orc Guard Chamber",
          "description": "You are in a low room where an orc sentry sits on an upturned crate. It stands the moment it sees you.",
          "map": {
            "x": 13,
            "y": 15
          },
          "exits": {
            "nw": "R35",
            "e": "R37"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R37": {
          "name": "The Three-Way Split",
          "description": "You are in a junction where three tunnels meet under a cracked stone ceiling.",
          "map": {
            "x": 14,
            "y": 15
          },
          "exits": {
            "w": "R36",
            "se": "R38",
            "ne": "R39"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R38": {
          "name": "The Dead-End Cell",
          "description": "You are in a short alcove where an orc has been posted in what appears to be a punishment assignment.",
          "map": {
            "x": 15,
            "y": 16
          },
          "exits": {
            "nw": "R37"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R39": {
          "name": "The Ambush Chamber",
          "description": "You are in a wide room — and two orcs were waiting for you. They planned this.",
          "map": {
            "x": 15,
            "y": 14
          },
          "exits": {
            "sw": "R37",
            "ne": "R40"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              },
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R40": {
          "name": "The Broken Junction",
          "description": "You are in a chamber where part of the ceiling has caved in, leaving a pile of rubble to clamber over.",
          "map": {
            "x": 16,
            "y": 13
          },
          "exits": {
            "sw": "R39",
            "se": "R41"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R41": {
          "name": "The Three-Gate Hall",
          "description": "You are in an old checkpoint chamber with passages branching in three directions.",
          "map": {
            "x": 17,
            "y": 14
          },
          "exits": {
            "nw": "R40",
            "s": "R42",
            "ne": "R44"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R42": {
          "name": "The Narrow South Run",
          "description": "You are in a pinched corridor that forces you to turn sideways to squeeze through.",
          "map": {
            "x": 17,
            "y": 15
          },
          "exits": {
            "n": "R41",
            "se": "R43"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R43": {
          "name": "The Scorpion Burrow",
          "description": "You are in a damp alcove where a giant scorpion has burrowed a nest into the soft earth floor. It carries an iron key.",
          "map": {
            "x": 18,
            "y": 16
          },
          "exits": {
            "nw": "R42"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_scorpion",
                "drop": "iron_key"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R44": {
          "name": "The Orc Lookout",
          "description": "You are in a raised chamber with a crude stone bench. The orc that was sitting on it is now coming at you.",
          "map": {
            "x": 18,
            "y": 13
          },
          "exits": {
            "sw": "R41",
            "ne": "R45"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R45": {
          "name": "The Crossing",
          "description": "You are in a narrow T-shaped junction where two lesser passages meet the main route.",
          "map": {
            "x": 19,
            "y": 12
          },
          "exits": {
            "sw": "R44",
            "se": "R46"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R46": {
          "name": "The Long Drop Corridor",
          "description": "You are in a tall narrow passage, the ceiling lost in darkness above.",
          "map": {
            "x": 20,
            "y": 13
          },
          "exits": {
            "nw": "R45",
            "s": "R47"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R47": {
          "name": "The Pit Guard Room",
          "description": "You are in a chamber overlooking a shallow pit. An orc has claimed it as a den.",
          "map": {
            "x": 20,
            "y": 14
          },
          "exits": {
            "n": "R46"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R48": {
          "name": "The Iron Gate Passage",
          "description": "You are in the corridor beyond the iron door. The stonework here is older, the air drier.",
          "map": {
            "x": 13,
            "y": 6
          },
          "exits": {
            "sw": "R1",
            "e": "R49"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R49": {
          "name": "The Upper Gallery",
          "description": "You are in a long gallery carved above the lower warrens, with rough-hewn niches in the walls.",
          "map": {
            "x": 14,
            "y": 6
          },
          "exits": {
            "w": "R48",
            "se": "R50"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R50": {
          "name": "The Lion Passage",
          "description": "You are in a wide tunnel where a plains lion paces with territorial fury.",
          "map": {
            "x": 15,
            "y": 7
          },
          "exits": {
            "nw": "R49",
            "e": "R51"
          },
          "contents": {
            "enemies": [
              {
                "key": "stone_crawler",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R51": {
          "name": "The High Road",
          "description": "You are in a raised corridor that runs above the main cave system, the floor grating underfoot.",
          "map": {
            "x": 16,
            "y": 7
          },
          "exits": {
            "w": "R50",
            "se": "R52"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R52": {
          "name": "The Fork in the Dark",
          "description": "You are in a junction where the torchlight seems to die before reaching the walls.",
          "map": {
            "x": 17,
            "y": 8
          },
          "exits": {
            "nw": "R51",
            "ne": "R53"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R53": {
          "name": "The Upper Lion Den",
          "description": "You are in a vaulted cave where a plains lion has staked its claim. It is displeased to see you.",
          "map": {
            "x": 18,
            "y": 7
          },
          "exits": {
            "sw": "R52",
            "n": "R54"
          },
          "contents": {
            "enemies": [
              {
                "key": "dungeon_spider",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R54": {
          "name": "The High Passage",
          "description": "You are in a broad tunnel that climbs northeast before leveling off.",
          "map": {
            "x": 18,
            "y": 6
          },
          "exits": {
            "s": "R53",
            "ne": "R55"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R55": {
          "name": "The Scorpion Nest",
          "description": "You are in a crevice lair where two giant scorpions guard a bronze door to the northeast. One of them carries the bronze key.",
          "map": {
            "x": 19,
            "y": 5
          },
          "exits": {
            "sw": "R54",
            "n": "R56"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R56": {
          "name": "The Bronze Gate Chamber",
          "description": "You are in a wide chamber sealed to the northeast by a heavy bronze door. The scorpions here are not welcoming.",
          "map": {
            "x": 19,
            "y": 4
          },
          "exits": {
            "s": "R55",
            "ne": "R57"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_scorpion",
                "drop": "bronze_key"
              },
              {
                "key": "cave_orc",
                "drop": ""
              }
            ],
            "doors": {
              "ne": {
                "type": "bronze",
                "locked": true
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R57": {
          "name": "The Descent Shaft",
          "description": "You are in a rough shaft where a wooden ladder disappears into the darkness below. There is no going back the way you came from here — only down.",
          "map": {
            "x": 20,
            "y": 3
          },
          "exits": {
            "sw": "R56"
          },
          "contents": {
            "ladder": {
              "direction": "down",
              "leadsTo": {
                "floor": 2,
                "room": "R58"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        }
      }
    },
    "2": {
      "startRoom": "R1",
      "rooms": {
        "R58": {
          "name": "The Ascent Chamber",
          "description": "You are in a stone chamber at the base of the shaft from above. The ladder only goes down from here.",
          "map": {
            "x": 21,
            "y": 5
          },
          "exits": {
            "s": "R1"
          },
          "contents": {
            "ladder": {
              "direction": "up",
              "leadsTo": {
                "floor": 1,
                "room": "R57"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R1": {
          "name": "The Descent Landing",
          "description": "You are in the first chamber of the middle depths, the ceiling lower and the air heavier than above.",
          "map": {
            "x": 21,
            "y": 6
          },
          "exits": {
            "n": "R58",
            "sw": "R2"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R2": {
          "name": "The Angled Corridor",
          "description": "You are in a long slanted passage where the floor has been worn smooth by water.",
          "map": {
            "x": 20,
            "y": 7
          },
          "exits": {
            "ne": "R1",
            "sw": "R3"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R3": {
          "name": "The Narrow Approach",
          "description": "You are in a tight passage carved through dense rock, single-file only.",
          "map": {
            "x": 19,
            "y": 8
          },
          "exits": {
            "ne": "R2",
            "sw": "R4"
          },
          "contents": {
            "enemies": [
              {
                "key": "hobgoblin",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R4": {
          "name": "The Three-Way Hollow",
          "description": "You are in a cramped junction where three passages converge under a dome of natural stone.",
          "map": {
            "x": 18,
            "y": 9
          },
          "exits": {
            "ne": "R3",
            "nw": "R5",
            "sw": "R14"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R5": {
          "name": "The Wet Gallery",
          "description": "You are in a tunnel where the walls weep moisture and your boots sink slightly into the floor.",
          "map": {
            "x": 17,
            "y": 8
          },
          "exits": {
            "se": "R4",
            "nw": "R6"
          },
          "contents": {
            "enemies": [
              {
                "key": "dungeon_spider",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R6": {
          "name": "The Fungus Passage",
          "description": "You are in a corridor faintly illuminated by bioluminescent fungi clinging to the walls.",
          "map": {
            "x": 16,
            "y": 7
          },
          "exits": {
            "se": "R5",
            "n": "R7"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R7": {
          "name": "The Glowing Bend",
          "description": "You are in a curved passage lit only by the fungi that have taken root in every crack.",
          "map": {
            "x": 16,
            "y": 6
          },
          "exits": {
            "s": "R6",
            "ne": "R8"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R8": {
          "name": "The Dim Gallery",
          "description": "You are in a long gallery where the glow from the walls is just enough to see your hands.",
          "map": {
            "x": 17,
            "y": 5
          },
          "exits": {
            "sw": "R7",
            "ne": "R9"
          },
          "contents": {
            "enemies": [
              {
                "key": "zombie",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R9": {
          "name": "The Spore Corridor",
          "description": "You are in a tunnel thick with floating spores that drift lazily in the stale air.",
          "map": {
            "x": 18,
            "y": 4
          },
          "exits": {
            "sw": "R8",
            "n": "R10"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R10": {
          "name": "The Dead End Alcove",
          "description": "You are in a rough alcove that smells of sulfur. Whatever was here has been dead a long time.",
          "map": {
            "x": 18,
            "y": 3
          },
          "exits": {
            "s": "R9",
            "nw": "R11"
          },
          "contents": {
            "enemies": [
              {
                "key": "skeleton",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R11": {
          "name": "The Crystal Seam",
          "description": "You are in a passage where a vein of pale crystal runs along the ceiling like a frozen river.",
          "map": {
            "x": 17,
            "y": 2
          },
          "exits": {
            "se": "R10",
            "sw": "R12"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R12": {
          "name": "The Echo Chamber",
          "description": "You are in a small domed room where every footstep returns twice.",
          "map": {
            "x": 16,
            "y": 3
          },
          "exits": {
            "ne": "R11",
            "sw": "R13"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R13": {
          "name": "The Hollow End",
          "description": "You are in a dead-end niche at the far edge of the upper passage.",
          "map": {
            "x": 15,
            "y": 4
          },
          "exits": {
            "ne": "R12"
          },
          "contents": {
            "enemies": [
              {
                "key": "stone_crawler",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R14": {
          "name": "The West Shelf",
          "description": "You are in a passage that skirts a wide stone shelf overlooking a lower cavity.",
          "map": {
            "x": 17,
            "y": 10
          },
          "exits": {
            "ne": "R4",
            "w": "R15"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R15": {
          "name": "The Shelf Corridor",
          "description": "You are in a narrow walkway running along the face of a natural stone ledge.",
          "map": {
            "x": 16,
            "y": 10
          },
          "exits": {
            "e": "R14",
            "nw": "R16"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R16": {
          "name": "The Sloped Gallery",
          "description": "You are in a long sloping passage carved with shallow drainage channels.",
          "map": {
            "x": 15,
            "y": 9
          },
          "exits": {
            "se": "R15",
            "nw": "R17"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R17": {
          "name": "The Rough Tunnel",
          "description": "You are in an unfinished tunnel hacked through raw bedrock.",
          "map": {
            "x": 14,
            "y": 8
          },
          "exits": {
            "se": "R16",
            "w": "R18"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_stalker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R18": {
          "name": "The Lamp Niche",
          "description": "You are in a corridor where rusted iron lamp brackets still cling to the walls, long since empty.",
          "map": {
            "x": 13,
            "y": 8
          },
          "exits": {
            "e": "R17",
            "w": "R19"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R19": {
          "name": "The Upper Crossing",
          "description": "You are in a T-junction where the passage splits north and south.",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "e": "R18",
            "s": "R20"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R20": {
          "name": "The Long Hall",
          "description": "You are in a straight corridor that runs farther than your light can reach.",
          "map": {
            "x": 12,
            "y": 9
          },
          "exits": {
            "n": "R19",
            "s": "R21"
          },
          "contents": {
            "enemies": [
              {
                "key": "fungal_horror",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R21": {
          "name": "The Corner Drop",
          "description": "You are in a passage that bends sharply and descends several steps.",
          "map": {
            "x": 12,
            "y": 10
          },
          "exits": {
            "n": "R20",
            "sw": "R22"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R22": {
          "name": "The Low Junction",
          "description": "You are in a low-ceilinged hub where two passages meet at an awkward angle.",
          "map": {
            "x": 11,
            "y": 11
          },
          "exits": {
            "ne": "R21",
            "se": "R23"
          },
          "contents": {
            "enemies": [
              {
                "key": "hobgoblin",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R23": {
          "name": "The Stone Corridor",
          "description": "You are in a featureless tunnel of dark grey stone that seems to absorb the light.",
          "map": {
            "x": 12,
            "y": 12
          },
          "exits": {
            "nw": "R22",
            "se": "R24"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R24": {
          "name": "The Descent Hall",
          "description": "You are in a passage that tilts steadily downward toward the lower reaches.",
          "map": {
            "x": 13,
            "y": 13
          },
          "exits": {
            "nw": "R23",
            "s": "R25"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R25": {
          "name": "The Three-Tunnel Cross",
          "description": "You are in a junction where three tunnels meet — the air from the south path is noticeably colder.",
          "map": {
            "x": 13,
            "y": 14
          },
          "exits": {
            "n": "R24",
            "sw": "R26",
            "se": "R39"
          },
          "contents": {
            "enemies": [
              {
                "key": "spirit",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R26": {
          "name": "The Ribbed Passage",
          "description": "You are in a tunnel reinforced with stone ribs that arch overhead like the bones of something enormous.",
          "map": {
            "x": 12,
            "y": 15
          },
          "exits": {
            "ne": "R25",
            "w": "R27"
          },
          "contents": {
            "enemies": [
              {
                "key": "dungeon_spider",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R27": {
          "name": "The Carved Hall",
          "description": "You are in a corridor where someone once chiseled patterns into the walls, though the meaning is lost.",
          "map": {
            "x": 11,
            "y": 15
          },
          "exits": {
            "e": "R26",
            "w": "R28"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R28": {
          "name": "The Scorpion Ambush",
          "description": "You are in a widened section of tunnel — and a giant scorpion drops from the ceiling. It carries a silver key.",
          "map": {
            "x": 10,
            "y": 15
          },
          "exits": {
            "e": "R27",
            "se": "R29"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_scorpion",
                "drop": "silver_key"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R29": {
          "name": "The Dark Descent",
          "description": "You are in a steep passage that plunges into cooler, staler air.",
          "map": {
            "x": 11,
            "y": 16
          },
          "exits": {
            "nw": "R28",
            "se": "R30"
          },
          "contents": {
            "enemies": [
              {
                "key": "zombie",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R30": {
          "name": "The Crossroads Hollow",
          "description": "You are in a small chamber where two passages intersect, the walls stained with old torch smoke.",
          "map": {
            "x": 12,
            "y": 17
          },
          "exits": {
            "nw": "R29",
            "sw": "R31"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R31": {
          "name": "The Damp Corridor",
          "description": "You are in a tunnel where the walls are slick and a thin film of water covers the floor.",
          "map": {
            "x": 11,
            "y": 18
          },
          "exits": {
            "ne": "R30",
            "sw": "R32"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R32": {
          "name": "The Seeping Wall Passage",
          "description": "You are in a corridor where the eastern wall is soaked through, water trickling constantly from hairline cracks.",
          "map": {
            "x": 10,
            "y": 19
          },
          "exits": {
            "ne": "R31",
            "sw": "R33"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R33": {
          "name": "The Cold Run",
          "description": "You are in a passage where the air is noticeably colder — something is venting from below.",
          "map": {
            "x": 9,
            "y": 20
          },
          "exits": {
            "ne": "R32",
            "sw": "R34"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R34": {
          "name": "The Wide Bend",
          "description": "You are in a broad curve in the tunnel, the outer wall carved smooth by ancient hands.",
          "map": {
            "x": 8,
            "y": 21
          },
          "exits": {
            "ne": "R33",
            "se": "R35"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R35": {
          "name": "The Low Arch Passage",
          "description": "You are in a passage so low you must duck — the ceiling here was never finished.",
          "map": {
            "x": 9,
            "y": 22
          },
          "exits": {
            "nw": "R34",
            "e": "R36"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_stalker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R36": {
          "name": "The Muddy Turn",
          "description": "You are in a corner passage where mud has crept up from below, making each step treacherous.",
          "map": {
            "x": 10,
            "y": 22
          },
          "exits": {
            "w": "R35",
            "ne": "R37"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R37": {
          "name": "The Eastern Run",
          "description": "You are in a long straightaway that curves gently before disappearing into the dark.",
          "map": {
            "x": 11,
            "y": 21
          },
          "exits": {
            "sw": "R36",
            "ne": "R38"
          },
          "contents": {
            "enemies": [
              {
                "key": "fungal_horror",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R38": {
          "name": "The Far Alcove",
          "description": "You are in a dead-end alcove at the extreme edge of the eastern passage.",
          "map": {
            "x": 12,
            "y": 20
          },
          "exits": {
            "sw": "R37"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R39": {
          "name": "The Branching Point",
          "description": "You are in a fork where the path to the lower south opens up unexpectedly.",
          "map": {
            "x": 14,
            "y": 15
          },
          "exits": {
            "nw": "R25",
            "e": "R40"
          },
          "contents": {
            "enemies": [
              {
                "key": "stone_crawler",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R40": {
          "name": "The Grotto Entrance",
          "description": "You are in the mouth of a natural grotto, the walls rough and glistening with mineral seeps.",
          "map": {
            "x": 15,
            "y": 15
          },
          "exits": {
            "w": "R39",
            "se": "R41"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R41": {
          "name": "The Grotto Floor",
          "description": "You are in the floor of the grotto, the ceiling vanishing into absolute darkness overhead.",
          "map": {
            "x": 16,
            "y": 16
          },
          "exits": {
            "nw": "R40",
            "ne": "R42"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R42": {
          "name": "The Grotto Run",
          "description": "You are in the far side of the grotto, a narrow path threading between stalagmites.",
          "map": {
            "x": 17,
            "y": 15
          },
          "exits": {
            "sw": "R41",
            "e": "R43"
          },
          "contents": {
            "enemies": [
              {
                "key": "skeleton",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R43": {
          "name": "The Southern Junction",
          "description": "You are in a junction deep in the middle depths where three routes converge.",
          "map": {
            "x": 18,
            "y": 15
          },
          "exits": {
            "w": "R42",
            "ne": "R44",
            "se": "R48"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R44": {
          "name": "The Diagonal Pass",
          "description": "You are in a long diagonal passage cutting northeast through solid bedrock.",
          "map": {
            "x": 19,
            "y": 14
          },
          "exits": {
            "sw": "R43",
            "ne": "R45"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R45": {
          "name": "The Elevated Corridor",
          "description": "You are in a raised passage running above a natural void — the floor occasionally trembles.",
          "map": {
            "x": 20,
            "y": 13
          },
          "exits": {
            "sw": "R44",
            "e": "R46"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_hound",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R46": {
          "name": "The Shelf Overlook",
          "description": "You are in a corridor that opens onto a stone shelf overlooking a black pit below.",
          "map": {
            "x": 21,
            "y": 13
          },
          "exits": {
            "w": "R45",
            "se": "R47"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R47": {
          "name": "The Dead Spur",
          "description": "You are in a dead-end chamber at the southeastern tip of the middle depth tunnels.",
          "map": {
            "x": 22,
            "y": 14
          },
          "exits": {
            "nw": "R46"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_stalker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R48": {
          "name": "The Southern Drop",
          "description": "You are in a chamber where the passage narrows sharply before turning south.",
          "map": {
            "x": 19,
            "y": 16
          },
          "exits": {
            "nw": "R43",
            "sw": "R49"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R49": {
          "name": "The Diagonal Hall",
          "description": "You are in a long diagonal corridor, the walls pressing closer on all sides.",
          "map": {
            "x": 18,
            "y": 17
          },
          "exits": {
            "ne": "R48",
            "sw": "R50"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R50": {
          "name": "The Pit Rim",
          "description": "You are in a passage running along the rim of a wide underground pit, the bottom nowhere visible.",
          "map": {
            "x": 17,
            "y": 18
          },
          "exits": {
            "ne": "R49",
            "s": "R51"
          },
          "contents": {
            "enemies": [
              {
                "key": "grave_knight",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R51": {
          "name": "The Poison Corridor",
          "description": "You are in a corridor that smells sharply of rot. The floor is discolored in ways that suggest you should move quickly.",
          "map": {
            "x": 17,
            "y": 19
          },
          "exits": {
            "n": "R50",
            "s": "R52"
          },
          "contents": {
            "traps": [
              {
                "type": "poison",
                "damage": 3,
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
        "R52": {
          "name": "The Silver Gate",
          "description": "You are in a chamber where a massive silver door bars the way south. There is no lock on this side.",
          "map": {
            "x": 17,
            "y": 20
          },
          "exits": {
            "n": "R51",
            "s": "R53"
          },
          "contents": {
            "doors": {
              "s": {
                "type": "silver",
                "locked": true
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R53": {
          "name": "The Antechamber",
          "description": "You are in a low antechamber beyond the silver gate, the air strangely still and expectant.",
          "map": {
            "x": 17,
            "y": 21
          },
          "exits": {
            "se": "R54",
            "n": "R52"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R54": {
          "name": "The Lower Shaft",
          "description": "You are in a shaft room where a rope ladder descends into the depths of the third floor. The only way is down.",
          "map": {
            "x": 18,
            "y": 22
          },
          "exits": {
            "nw": "R53"
          },
          "contents": {
            "ladder": {
              "direction": "down",
              "leadsTo": {
                "floor": 3,
                "room": "R55"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        }
      }
    },
    "3": {
      "startRoom": "R56",
      "rooms": {
        "R55": {
          "name": "The Ascent Pit",
          "description": "You are in a rough pit at the base of the rope ladder from above. The shaft above closes to a pinpoint of darkness.",
          "map": {
            "x": 14,
            "y": 25
          },
          "exits": {
            "n": "R56"
          },
          "contents": {
            "ladder": {
              "direction": "up",
              "leadsTo": {
                "floor": 2,
                "room": "R54"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R56": {
          "name": "The Deep Entry",
          "description": "You are in the first corridor of the deep, the air thick and tasting of minerals.",
          "map": {
            "x": 14,
            "y": 24
          },
          "exits": {
            "s": "R55",
            "n": "R57"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R57": {
          "name": "The Stone Throat",
          "description": "You are in a narrow passage they call the Stone Throat — the walls close in until they nearly touch.",
          "map": {
            "x": 14,
            "y": 23
          },
          "exits": {
            "s": "R56",
            "nw": "R58"
          },
          "contents": {
            "enemies": [
              {
                "key": "zombie",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R58": {
          "name": "The Dry Gallery",
          "description": "You are in a long dry gallery where old torch stubs still sit in their iron brackets.",
          "map": {
            "x": 13,
            "y": 22
          },
          "exits": {
            "se": "R57",
            "nw": "R59"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R59": {
          "name": "The Three-Way Deep",
          "description": "You are in a junction deep in the rock where three tunnels meet in uneasy silence.",
          "map": {
            "x": 12,
            "y": 21
          },
          "exits": {
            "se": "R58",
            "ne": "R60",
            "w": "R81"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R60": {
          "name": "The Curved Approach",
          "description": "You are in a passage that curves through the bedrock, the walls polished smooth by ancient water.",
          "map": {
            "x": 13,
            "y": 20
          },
          "exits": {
            "sw": "R59",
            "ne": "R61"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R61": {
          "name": "The Low Shelf Room",
          "description": "You are in a chamber with a natural stone shelf running at shoulder height along one wall.",
          "map": {
            "x": 14,
            "y": 19
          },
          "exits": {
            "sw": "R60",
            "e": "R62"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R62": {
          "name": "The Straight Run",
          "description": "You are in a long straight corridor — the first in a while — that offers an uncomfortable amount of visibility in both directions.",
          "map": {
            "x": 15,
            "y": 19
          },
          "exits": {
            "w": "R61",
            "e": "R63"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_hound",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R63": {
          "name": "The Descent Bend",
          "description": "You are in a passage that curves southeast and drops several feet before leveling again.",
          "map": {
            "x": 16,
            "y": 19
          },
          "exits": {
            "w": "R62",
            "se": "R64"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R64": {
          "name": "The Mineral Gallery",
          "description": "You are in a gallery where iron oxide has stained the walls in vivid rusted reds and oranges.",
          "map": {
            "x": 17,
            "y": 20
          },
          "exits": {
            "nw": "R63",
            "e": "R65"
          },
          "contents": {
            "enemies": [
              {
                "key": "skeleton",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R65": {
          "name": "The Passage of Silence",
          "description": "You are in a tunnel so quiet that your own heartbeat is distracting. Something about this place swallows sound.",
          "map": {
            "x": 18,
            "y": 20
          },
          "exits": {
            "w": "R64",
            "e": "R66"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R66": {
          "name": "The Deep Crossroads",
          "description": "You are in a four-way junction at the heart of the deep floor — passages branch in every direction.",
          "map": {
            "x": 19,
            "y": 20
          },
          "exits": {
            "w": "R65",
            "s": "R67",
            "e": "R71",
            "n": "R76"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_stalker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R67": {
          "name": "The South Spur",
          "description": "You are in a southward spur that dips below the main level before hooking back west.",
          "map": {
            "x": 19,
            "y": 21
          },
          "exits": {
            "n": "R66",
            "sw": "R68"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R68": {
          "name": "The Low Junction",
          "description": "You are in a three-way split where the ceiling is so low you cannot stand upright.",
          "map": {
            "x": 18,
            "y": 22
          },
          "exits": {
            "ne": "R67",
            "sw": "R69",
            "se": "R70"
          },
          "contents": {
            "enemies": [
              {
                "key": "fungal_horror",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R69": {
          "name": "The Blind End",
          "description": "You are in a cramped dead-end pocket barely large enough to turn around in.",
          "map": {
            "x": 17,
            "y": 23
          },
          "exits": {
            "ne": "R68"
          },
          "contents": {
            "enemies": [
              {
                "key": "ghoul",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R70": {
          "name": "The Alcove of Dread",
          "description": "You are in a small alcove that feels watched. Nothing is here. Probably.",
          "map": {
            "x": 19,
            "y": 23
          },
          "exits": {
            "nw": "R68"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R71": {
          "name": "The East Spur",
          "description": "You are in a wide eastward passage that angles away from the main tunnel.",
          "map": {
            "x": 20,
            "y": 20
          },
          "exits": {
            "w": "R66",
            "se": "R72"
          },
          "contents": {
            "enemies": [
              {
                "key": "bone_archer",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R72": {
          "name": "The Diagonal Deep",
          "description": "You are in a long diagonal corridor descending into the southeastern reaches.",
          "map": {
            "x": 21,
            "y": 21
          },
          "exits": {
            "nw": "R71",
            "se": "R73"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R73": {
          "name": "The Long Descent",
          "description": "You are in a steeply angled passage that makes your knees ache going down.",
          "map": {
            "x": 22,
            "y": 22
          },
          "exits": {
            "nw": "R72",
            "se": "R74"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R74": {
          "name": "The Dead End Depths",
          "description": "You are in the southernmost dead end of the dungeon — the rock here is unmarked by any tool.",
          "map": {
            "x": 23,
            "y": 23
          },
          "exits": {
            "nw": "R73"
          },
          "contents": {
            "enemies": [
              {
                "key": "minotaur_scout",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R76": {
          "name": "The North Spur",
          "description": "You are in a northward passage that climbs slightly above the main deep level.",
          "map": {
            "x": 19,
            "y": 19
          },
          "exits": {
            "s": "R66",
            "n": "R77"
          },
          "contents": {
            "enemies": [
              {
                "key": "zombie",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R77": {
          "name": "The High Corridor",
          "description": "You are in a relatively tall corridor where the ceiling vaults naturally overhead.",
          "map": {
            "x": 19,
            "y": 18
          },
          "exits": {
            "s": "R76",
            "ne": "R78"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R78": {
          "name": "The Ridge Pass",
          "description": "You are in a passage that runs along a narrow natural ridge, a drop on either side.",
          "map": {
            "x": 20,
            "y": 17
          },
          "exits": {
            "sw": "R77",
            "ne": "R79"
          },
          "contents": {
            "enemies": [
              {
                "key": "grave_knight",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R79": {
          "name": "The Eastern Shelf",
          "description": "You are in a raised shelf passage overlooking a lower cave system sealed off by collapsed rock.",
          "map": {
            "x": 21,
            "y": 16
          },
          "exits": {
            "sw": "R78",
            "e": "R80"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R80": {
          "name": "The Far Eastern Dead End",
          "description": "You are in a dead-end chamber at the extreme eastern edge of the dungeon. The wall is solid bedrock, unmarked and final.",
          "map": {
            "x": 22,
            "y": 16
          },
          "exits": {
            "w": "R79"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc_berserker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R81": {
          "name": "The Western Approach",
          "description": "You are in a wide westward corridor running parallel to the deep's main spine.",
          "map": {
            "x": 11,
            "y": 21
          },
          "exits": {
            "e": "R59",
            "w": "R82"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R82": {
          "name": "The Carved Passage",
          "description": "You are in a corridor where the stonework transitions from rough to finely cut — someone wanted this part to last.",
          "map": {
            "x": 10,
            "y": 21
          },
          "exits": {
            "e": "R81",
            "w": "R83"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R83": {
          "name": "The Corner Room",
          "description": "You are in a passage that turns sharply north, the corner worn round by something large passing through repeatedly.",
          "map": {
            "x": 9,
            "y": 21
          },
          "exits": {
            "e": "R82",
            "n": "R84"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R84": {
          "name": "The Dark Approach",
          "description": "You are in a chamber where the ambient glow from the minerals ceases entirely, leaving true darkness.",
          "map": {
            "x": 9,
            "y": 20
          },
          "exits": {
            "s": "R83",
            "nw": "R85"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R85": {
          "name": "The Cave Bend",
          "description": "You are in a natural cave bend, the walls untouched by any tool, ancient and cold.",
          "map": {
            "x": 8,
            "y": 19
          },
          "exits": {
            "se": "R84",
            "ne": "R86"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R86": {
          "name": "The Ascending Tunnel",
          "description": "You are in a tunnel that climbs steadily northeast, the air shifting as you gain elevation.",
          "map": {
            "x": 9,
            "y": 18
          },
          "exits": {
            "sw": "R85",
            "ne": "R87"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R87": {
          "name": "The High Approach",
          "description": "You are in the highest point of the third floor, a vaulted corridor where the air tastes almost fresh.",
          "map": {
            "x": 10,
            "y": 17
          },
          "exits": {
            "sw": "R86",
            "ne": "R88"
          },
          "contents": {
            "enemies": [
              {
                "key": "fungal_horror",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R88": {
          "name": "The Upper West Hall",
          "description": "You are in a wide hall that connects the western and central passages of the deep.",
          "map": {
            "x": 11,
            "y": 16
          },
          "exits": {
            "sw": "R87",
            "e": "R89"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R89": {
          "name": "The Central Hall",
          "description": "You are in a long central hall that bisects the upper reaches of the third floor.",
          "map": {
            "x": 12,
            "y": 16
          },
          "exits": {
            "w": "R88",
            "e": "R90"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R90": {
          "name": "The Hall of Three Roads",
          "description": "You are in a three-way hub at the center of the upper deep, each passage leading somewhere very different.",
          "map": {
            "x": 13,
            "y": 16
          },
          "exits": {
            "w": "R89",
            "n": "R94",
            "e": "R91"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_hound",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R91": {
          "name": "The Eastern Walk",
          "description": "You are in a broad corridor running east through the upper reaches of the deep.",
          "map": {
            "x": 14,
            "y": 16
          },
          "exits": {
            "w": "R90",
            "e": "R92"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R92": {
          "name": "The Torch Gallery",
          "description": "You are in a gallery where ancient iron torch rings line both walls at regular intervals — all empty.",
          "map": {
            "x": 15,
            "y": 16
          },
          "exits": {
            "w": "R91",
            "e": "R93"
          },
          "contents": {
            "enemies": [
              {
                "key": "will_o_wisp",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R93": {
          "name": "The Northern Gate Approach",
          "description": "You are in the corridor leading north toward the final passages of the dungeon.",
          "map": {
            "x": 16,
            "y": 16
          },
          "exits": {
            "w": "R92",
            "n": "R110"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R94": {
          "name": "The North Hall",
          "description": "You are in a tall north-running hall, the ceiling arching above you like a cathedral in miniature.",
          "map": {
            "x": 13,
            "y": 15
          },
          "exits": {
            "s": "R90",
            "n": "R95"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R95": {
          "name": "The Upper Approach",
          "description": "You are in a passage that climbs briefly before leveling into the upper northern network.",
          "map": {
            "x": 13,
            "y": 14
          },
          "exits": {
            "s": "R94",
            "w": "R96"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R96": {
          "name": "The Connecting Run",
          "description": "You are in a straight east-west connector linking the two northern branches.",
          "map": {
            "x": 12,
            "y": 14
          },
          "exits": {
            "e": "R95",
            "w": "R97"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R97": {
          "name": "The Northern Hub",
          "description": "You are in a central hub where three passages split off — north, east, and west.",
          "map": {
            "x": 11,
            "y": 14
          },
          "exits": {
            "e": "R96",
            "n": "R98",
            "w": "R99"
          },
          "contents": {
            "enemies": [
              {
                "key": "grave_knight",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R98": {
          "name": "The Sealed Spur",
          "description": "You are in a short dead-end spur. The northern wall is suspiciously smooth — as if it was bricked up deliberately.",
          "map": {
            "x": 11,
            "y": 13
          },
          "exits": {
            "s": "R97"
          },
          "contents": {
            "enemies": [
              {
                "key": "ghoul",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R99": {
          "name": "The Descending Spur",
          "description": "You are in a short passage that drops away to the southwest and a network of smaller tunnels.",
          "map": {
            "x": 10,
            "y": 14
          },
          "exits": {
            "e": "R97",
            "sw": "R100"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R100": {
          "name": "The Low Connector",
          "description": "You are in a low-ceilinged connector passage linking two parts of the northern network.",
          "map": {
            "x": 9,
            "y": 15
          },
          "exits": {
            "ne": "R99",
            "w": "R101"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R101": {
          "name": "The West Approach",
          "description": "You are in the westward approach to the deep's northern section.",
          "map": {
            "x": 8,
            "y": 15
          },
          "exits": {
            "e": "R100",
            "nw": "R102"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R102": {
          "name": "The Three-Spur Hub",
          "description": "You are in a hub room where three spurs radiate outward — north, southeast, and southwest.",
          "map": {
            "x": 7,
            "y": 14
          },
          "exits": {
            "se": "R101",
            "n": "R103",
            "sw": "R105"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_stalker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R103": {
          "name": "The Upper Northern Room",
          "description": "You are in a chamber at the northern tip of the dungeon's third floor, the air noticeably cooler.",
          "map": {
            "x": 7,
            "y": 13
          },
          "exits": {
            "s": "R102",
            "w": "R104"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R104": {
          "name": "The Frozen Alcove",
          "description": "You are in a dead-end alcove where the temperature drops sharply and frost rimes the walls.",
          "map": {
            "x": 6,
            "y": 13
          },
          "exits": {
            "e": "R103"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_scorpion",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R105": {
          "name": "The Southwest Descent",
          "description": "You are in a passage descending sharply to the southwest.",
          "map": {
            "x": 6,
            "y": 15
          },
          "exits": {
            "ne": "R102",
            "sw": "R106"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R106": {
          "name": "The Passage Hub",
          "description": "You are in a small hub room with three exits — each one leading somewhere the others do not.",
          "map": {
            "x": 5,
            "y": 16
          },
          "exits": {
            "ne": "R105",
            "w": "R107",
            "s": "R108"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R107": {
          "name": "The Bone Alcove",
          "description": "You are in a dead-end alcove where the scattered bones of previous adventurers serve as a subtle warning.",
          "map": {
            "x": 4,
            "y": 16
          },
          "exits": {
            "e": "R106"
          },
          "contents": {
            "enemies": [
              {
                "key": "ghoul",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R108": {
          "name": "The Descent into Dark",
          "description": "You are in a passage that slopes steeply into the darkest part of the dungeon.",
          "map": {
            "x": 5,
            "y": 17
          },
          "exits": {
            "n": "R106",
            "se": "R109"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R109": {
          "name": "The Last Alcove",
          "description": "You are in a dead-end pocket that smells of old iron and something faintly electrical.",
          "map": {
            "x": 6,
            "y": 18
          },
          "exits": {
            "nw": "R108"
          },
          "contents": {
            "enemies": [
              {
                "key": "minotaur_scout",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R110": {
          "name": "The Winding Approach",
          "description": "You are in a winding passage that climbs steadily toward the dungeon's northern exit corridor.",
          "map": {
            "x": 16,
            "y": 15
          },
          "exits": {
            "s": "R93",
            "n": "R111"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc_berserker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R111": {
          "name": "The Long North Hall",
          "description": "You are in a tall straight corridor running north, the walls growing smoother with every step.",
          "map": {
            "x": 16,
            "y": 14
          },
          "exits": {
            "s": "R110",
            "n": "R112"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R112": {
          "name": "The Smoothed Passage",
          "description": "You are in a corridor where the stonework becomes noticeably finer — this section was built, not carved.",
          "map": {
            "x": 16,
            "y": 13
          },
          "exits": {
            "s": "R111",
            "n": "R113"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_bearer",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R113": {
          "name": "The Dressed Stone Hall",
          "description": "You are in a hall of dressed stone blocks laid with precision, the craftsmanship of a different era entirely.",
          "map": {
            "x": 16,
            "y": 12
          },
          "exits": {
            "s": "R112",
            "n": "R114"
          },
          "contents": {
            "enemies": [
              {
                "key": "minotaur_scout",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R114": {
          "name": "The Grand Junction",
          "description": "You are in a wide junction where the main corridor splits into three — the masonry here is exceptional.",
          "map": {
            "x": 16,
            "y": 11
          },
          "exits": {
            "s": "R113",
            "nw": "R115",
            "e": "R121"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R115": {
          "name": "The Diagonal Approach",
          "description": "You are in a long diagonal passage ascending toward the northwestern chambers.",
          "map": {
            "x": 15,
            "y": 10
          },
          "exits": {
            "se": "R114",
            "nw": "R116"
          },
          "contents": {
            "enemies": [
              {
                "key": "will_o_wisp",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R116": {
          "name": "The Upper Diagonal",
          "description": "You are in the upper leg of the diagonal passage, the air carrying a faint breeze from somewhere ahead.",
          "map": {
            "x": 14,
            "y": 9
          },
          "exits": {
            "se": "R115",
            "nw": "R117"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R117": {
          "name": "The Western Antechamber",
          "description": "You are in an antechamber of cut stone where the passage turns west into the dungeon's final wing.",
          "map": {
            "x": 13,
            "y": 8
          },
          "exits": {
            "se": "R116",
            "w": "R118"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_beetle",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R118": {
          "name": "The Final Hall East",
          "description": "You are in the eastern section of the dungeon's last hall, the stonework immaculate and oppressive.",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "e": "R117",
            "w": "R119"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc_berserker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R119": {
          "name": "The Final Hall",
          "description": "You are in the central section of the final hall, where the silence is absolute and deliberate.",
          "map": {
            "x": 11,
            "y": 8
          },
          "exits": {
            "e": "R118",
            "w": "R120"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R120": {
          "name": "The Final Hall West",
          "description": "You are in the western terminus of the final hall — a dead end that seems to be waiting for something.",
          "map": {
            "x": 10,
            "y": 8
          },
          "exits": {
            "e": "R119"
          },
          "contents": {
            "enemies": [
              {
                "key": "minotaur_scout",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R121": {
          "name": "The Eastern Approach",
          "description": "You are in the eastern approach to the dungeon's exit corridor.",
          "map": {
            "x": 17,
            "y": 11
          },
          "exits": {
            "w": "R114",
            "e": "R122"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R122": {
          "name": "The Wraith Gallery",
          "description": "You are in a long gallery that grows steadily colder as you move northeast.",
          "map": {
            "x": 18,
            "y": 11
          },
          "exits": {
            "w": "R121",
            "ne": "R123"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_bearer",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R123": {
          "name": "The Chill Corridor",
          "description": "You are in a passage where your breath fogs in the unnatural cold. The walls carry a faint blue shimmer.",
          "map": {
            "x": 19,
            "y": 10
          },
          "exits": {
            "sw": "R122",
            "ne": "R124"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R124": {
          "name": "The Frost Hall",
          "description": "You are in a hall coated in a thin layer of frost that cracks and crumbles underfoot.",
          "map": {
            "x": 20,
            "y": 9
          },
          "exits": {
            "sw": "R123",
            "ne": "R125"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_beetle",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R125": {
          "name": "The Antechamber of the Gate",
          "description": "You are in a small antechamber just before the electrum gate. You can feel the cold seeping through the door.",
          "map": {
            "x": 21,
            "y": 8
          },
          "exits": {
            "sw": "R124",
            "e": "R126"
          },
          "contents": {
            "enemies": [
              {
                "key": "orc_berserker",
                "drop": ""
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R126": {
          "name": "The Electrum Gate",
          "description": "You are in the chamber of the electrum door — and the wraith that guards it rises from the floor to meet you. It carries the key.",
          "map": {
            "x": 22,
            "y": 8
          },
          "exits": {
            "w": "R125",
            "n": "R127"
          },
          "contents": {
            "doors": {
              "n": {
                "type": "electrum",
                "locked": true
              }
            },
            "enemies": [
              {
                "key": "wraith",
                "drop": "electrum_key"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R127": {
          "name": "The Exit Corridor",
          "description": "You are in the final corridor of the Undermaze. The air ahead smells different — open, living. Almost like outside.",
          "map": {
            "x": 22,
            "y": 7
          },
          "exits": {
            "s": "R126",
            "n": "R128"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R128": {
          "name": "The Gates of Ashen Harbor",
          "description": "You are in a grand vaulted chamber where great iron doors bear the crest of Ashen Harbor. Beyond them lies the second town — you have made it through the Undermaze.",
          "map": {
            "x": 22,
            "y": 6
          },
          "exits": {
            "s": "R127"
          },
          "contents": {
            "runestone": "white_runestone"
          },
          "flags": {
            "discovered": false,
            "townExit": "town2"
          }
        }
      }
    }
  }
};