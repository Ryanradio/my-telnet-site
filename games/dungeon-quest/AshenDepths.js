window.DUNGEONS = window.DUNGEONS || {};
window.DUNGEONS.AshenDepths = {
  "name": "Ashen Depths",
  "description": "A vast network of natural caverns stretching deep beneath Ashen Harbor, filled with winding passages, hidden chambers, and ancient secrets.",
  "floors": {
    "1": {
      "startRoom": "R1",
      "rooms": {
        "R1": {
          "name": "The Mouth of the Caverns",
          "description": "The entrance to the caverns yawns wide before you, a natural archway carved by millennia of water and wind. Cool, damp air flows outward, carrying the faint scent of minerals and ancient stone.",
          "map": {
            "x": 6,
            "y": 17
          },
          "exits": {
            "nw": "R2"
          },
          "contents": {}
        },
        "R2": {
          "name": "The Echoing Passage",
          "description": "A wide passage that curves gently to the north, the walls lined with natural limestone formations. Your footsteps echo strangely here, as if the cave itself is trying to mimic your movements.",
          "map": {
            "x": 5,
            "y": 16
          },
          "exits": {
            "se": "R1",
            "sw": "R3",
            "nw": "R5"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R3": {
          "name": "The Sloping Descent",
          "description": "The floor slopes sharply downward here, the stone worn smooth by centuries of water flow. Small rivulets of water trickle down the walls.",
          "map": {
            "x": 4,
            "y": 17
          },
          "exits": {
            "ne": "R2",
            "w": "R4"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_zombie",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R4": {
          "name": "The Dead Pool",
          "description": "A shallow, stagnant pool fills this dead‑end chamber. The water is dark and still, and the air smells faintly of rot. Something pale seems to float just beneath the surface.",
          "map": {
            "x": 3,
            "y": 17
          },
          "exits": {
            "e": "R3"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_zombie",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "plague_zombie",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R5": {
          "name": "The Fork in the Dark",
          "description": "The passage splits here. To the northwest, a tight crack leads deeper; to the southwest, a wider tunnel slopes downward. The air feels different from each path—one carries moisture, one smells of dust.",
          "map": {
            "x": 4,
            "y": 15
          },
          "exits": {
            "se": "R2",
            "w": "R6"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R6": {
          "name": "The Wind Tunnel",
          "description": "A narrow crack in the rock opens into a wider passage where a constant, steady breeze flows from somewhere deep within the mountain. The air is fresh and cool.",
          "map": {
            "x": 3,
            "y": 15
          },
          "exits": {
            "e": "R5",
            "w": "R7"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R7": {
          "name": "The Smooth Crevice",
          "description": "The walls here are unnaturally smooth, as if worn by something massive passing through repeatedly. The floor is littered with small, round stones that crunch underfoot.",
          "map": {
            "x": 2,
            "y": 15
          },
          "exits": {
            "e": "R6",
            "nw": "R8"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R8": {
          "name": "The Junction Chamber",
          "description": "A round chamber where multiple passages converge. The walls are covered in what might be ancient scratches or carvings, but they're too worn to make out any pattern.",
          "map": {
            "x": 1,
            "y": 14
          },
          "exits": {
            "se": "R7",
            "sw": "R9",
            "nw": "R12"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R9": {
          "name": "The Silt‑Choked Passage",
          "description": "The passage is clogged with fine grey silt that rises in clouds with every step. Your torch casts strange shadows against the low ceiling.",
          "map": {
            "x": 0,
            "y": 15
          },
          "exits": {
            "ne": "R8",
            "s": "R10"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R10": {
          "name": "The Muddy Pit",
          "description": "The floor here has turned to thick, sticky mud that sucks at your boots. Strange bubbles occasionally rise from the muck, releasing foul‑smelling gases.",
          "map": {
            "x": 0,
            "y": 16
          },
          "exits": {
            "n": "R9",
            "se": "R11"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_leech",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R11": {
          "name": "The Stagnant Alcove",
          "description": "A small alcove filled with still, murky water. The air is heavy and smells of decay. Nothing moves, but you feel watched.",
          "map": {
            "x": 1,
            "y": 17
          },
          "exits": {
            "nw": "R10"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_leech",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "giant_leech",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "dark_mage",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R12": {
          "name": "The Upper Gallery",
          "description": "This passage runs along a natural shelf, elevated above what seems to be another cavern below. You can hear the distant sound of dripping water echoing up from below.",
          "map": {
            "x": 0,
            "y": 13
          },
          "exits": {
            "se": "R8",
            "n": "R13"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R13": {
          "name": "The Dripping Gallery",
          "description": "Water drips constantly from the ceiling here, creating a steady rhythm that echoes through the chamber. Small pools have formed where the drips hit, and the air is thick with moisture.",
          "map": {
            "x": 0,
            "y": 12
          },
          "exits": {
            "s": "R12",
            "n": "R14"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R14": {
          "name": "The Stalactite Forest",
          "description": "This chamber is filled with countless stalactites hanging from the ceiling like stone spears, and stalagmites rising from the floor to meet them. Some have joined to form natural pillars.",
          "map": {
            "x": 0,
            "y": 11
          },
          "exits": {
            "s": "R13",
            "ne": "R15"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_imp",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R15": {
          "name": "The Smoothed Corridor",
          "description": "Unlike the rough‑hewn passages elsewhere, this corridor is unnaturally smooth, as if worn by something massive passing through repeatedly.",
          "map": {
            "x": 1,
            "y": 10
          },
          "exits": {
            "sw": "R14",
            "ne": "R16"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R16": {
          "name": "The Narrow Squeeze",
          "description": "The walls press close, forcing you to turn sideways and suck in your breath. The rock is cold and damp against your face, and you can't see what lies ahead.",
          "map": {
            "x": 2,
            "y": 9
          },
          "exits": {
            "sw": "R15",
            "n": "R17"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R17": {
          "name": "The Low Crawl",
          "description": "You must drop to hands and knees to proceed. The ceiling is so low that the stone scrapes your back, and the darkness ahead seems to swallow your light.",
          "map": {
            "x": 2,
            "y": 8
          },
          "exits": {
            "s": "R16",
            "n": "R18"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_zombie",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R18": {
          "name": "The Sound of Water",
          "description": "You can hear running water somewhere ahead, its gentle rush echoing through the rock. The passage widens slightly, and the air grows cooler and damp.",
          "map": {
            "x": 2,
            "y": 7
          },
          "exits": {
            "s": "R17",
            "nw": "R19"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R19": {
          "name": "The Upper Shelf",
          "description": "The passage splits. To the northwest, a narrow crack; to the southwest, a wider tunnel that seems to slope downward. The sound of water is louder from the west.",
          "map": {
            "x": 1,
            "y": 6
          },
          "exits": {
            "se": "R18",
            "sw": "R20",
            "nw": "R22"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R20": {
          "name": "The Sinkhole Rim",
          "description": "The floor here has collapsed into a deep pit, the edges crumbled and unstable. The pit descends into darkness, and you can hear the sound of water far below.",
          "map": {
            "x": 0,
            "y": 7
          },
          "exits": {
            "ne": "R19",
            "s": "R21"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R21": {
          "name": "The Bottom of the Pit",
          "description": "You descend to the bottom of the sinkhole, landing in a shallow pool of muddy water. The walls here are slick with moisture, and the only way forward is a narrow crack.",
          "map": {
            "x": 0,
            "y": 8
          },
          "exits": {
            "n": "R20"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "plague_zombie",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R22": {
          "name": "The Dry Crevice",
          "description": "A narrow crevice that stays dry even though water seeps nearby. The walls are close enough to touch, forcing you to turn sideways to pass.",
          "map": {
            "x": 0,
            "y": 5
          },
          "exits": {
            "se": "R19",
            "n": "R23"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R23": {
          "name": "The Ancient Channel",
          "description": "What was once an underground riverbed, now dry for countless years. The channel cuts deep through the rock, its walls smooth as glass from the ancient water flow.",
          "map": {
            "x": 0,
            "y": 4
          },
          "exits": {
            "s": "R22",
            "n": "R24"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R24": {
          "name": "The Stone Circle",
          "description": "You approach a circle of stones, feeling a strange energy in the air. The stones are arranged in a perfect circle, their surfaces covered in spiral patterns that seem to move when you look at them directly.",
          "map": {
            "x": 0,
            "y": 3
          },
          "exits": {
            "s": "R23",
            "ne": "R25"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R25": {
          "name": "The Watcher's Hollow",
          "description": "A wide, low chamber that feels uncomfortably open after the tight passages. Your light barely reaches the far walls, and something about the space makes your skin prickle.",
          "map": {
            "x": 1,
            "y": 2
          },
          "exits": {
            "sw": "R24",
            "nw": "R26",
            "ne": "R28"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R26": {
          "name": "The Hungry Dark",
          "description": "The darkness here seems to absorb your light, pressing close from all sides. Your footsteps fall silent, and you feel an irrational urge to run.",
          "map": {
            "x": 0,
            "y": 1
          },
          "exits": {
            "se": "R25",
            "n": "R27"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_ranger",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R27": {
          "name": "The Echoing Void",
          "description": "A small, domed chamber where every whisper returns as a dozen voices. The silence between echoes is absolute, making you hold your breath.",
          "map": {
            "x": 0,
            "y": 0
          },
          "exits": {
            "s": "R26"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_mage",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "stone_golem",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R28": {
          "name": "The Crumbling Ledge",
          "description": "The path narrows to a crumbling ledge overlooking a deep fissure. The stone groans under your weight, and you can hear loose rocks tumbling into the darkness below.",
          "map": {
            "x": 2,
            "y": 1
          },
          "exits": {
            "sw": "R25",
            "ne": "R29"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R29": {
          "name": "The Scrape Marks",
          "description": "Deep gouges mar the walls here, fresh enough that the stone is still pale. Something large was dragged through this passage—recently.",
          "map": {
            "x": 3,
            "y": 0
          },
          "exits": {
            "sw": "R28",
            "se": "R30"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R30": {
          "name": "The Forked Tunnel",
          "description": "Three passages meet in a small chamber. The northeast tunnel smells of damp earth, the southeast carries a faint mineral tang, and the northwest echoes with the sound of distant dripping.",
          "map": {
            "x": 4,
            "y": 1
          },
          "exits": {
            "nw": "R29",
            "ne": "R31",
            "se": "R32"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R31": {
          "name": "The Salt Vein",
          "description": "A vein of white salt crystals runs through the wall here, sparkling in your light. The air tastes of salt, and your lips feel dry and cracked.",
          "map": {
            "x": 5,
            "y": 0
          },
          "exits": {
            "sw": "R30"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_zombie",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "plague_zombie",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "giant_leech",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R32": {
          "name": "The Grate of Bones",
          "description": "The floor is scattered with small bones—rodents, perhaps, or birds. Something has been feeding here, and recently, judging by the lack of dust.",
          "map": {
            "x": 5,
            "y": 2
          },
          "exits": {
            "nw": "R30",
            "se": "R33"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_imp",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "chaos_imp",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R33": {
          "name": "The Warm Air Vent",
          "description": "A crack in the wall vents warm, dry air that smells of minerals and something metallic. The heat is a welcome change from the damp cold elsewhere.",
          "map": {
            "x": 6,
            "y": 3
          },
          "exits": {
            "nw": "R32",
            "ne": "R44",
            "s": "R34"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R34": {
          "name": "The Silent Chamber",
          "description": "You step into a chamber where all sound seems to die. Your footsteps are muffled, your breathing seems distant. The silence is oppressive, making you want to shout just to break it.",
          "map": {
            "x": 6,
            "y": 4
          },
          "exits": {
            "n": "R33",
            "se": "R35"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R35": {
          "name": "The Crystal Vein",
          "description": "A narrow passage where a vein of milky white crystal runs along the ceiling, casting a pale, ghostly light. The crystals hum with a faint resonance.",
          "map": {
            "x": 7,
            "y": 5
          },
          "exits": {
            "nw": "R34",
            "e": "R36"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R36": {
          "name": "The Spiral Chamber",
          "description": "The walls of this chamber spiral inward, forcing you to walk a curved path. The center is lost in shadow, and you feel as though the room is slowly rotating around you.",
          "map": {
            "x": 8,
            "y": 5
          },
          "exits": {
            "w": "R35",
            "ne": "R37"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_leech",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R37": {
          "name": "The Chittering Echo",
          "description": "A faint, chittering sound echoes from somewhere ahead, then stops. The silence that follows is even more unnerving.",
          "map": {
            "x": 9,
            "y": 4
          },
          "exits": {
            "sw": "R36",
            "se": "R38"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R38": {
          "name": "The Grand Cavern",
          "description": "You step into the largest chamber yet—a vast cavern so wide you cannot see the far wall. Natural pillars rise like ancient columns, forming a maze of stone.",
          "map": {
            "x": 10,
            "y": 5
          },
          "exits": {
            "nw": "R37",
            "ne": "R77",
            "s": "R39"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R39": {
          "name": "The Pillar Forest",
          "description": "The space between the pillars creates a natural maze. Some columns are smooth and polished, others rough and unyielding. Shadows play tricks on your eyes.",
          "map": {
            "x": 10,
            "y": 6
          },
          "exits": {
            "n": "R38",
            "sw": "R40"
          },
          "contents": {
            "enemies": [
              {
                "key": "stone_golem",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R40": {
          "name": "The Fallen Column",
          "description": "A massive pillar has collapsed, blocking half the chamber. You have to squeeze through a gap where the stone has shattered, careful not to disturb the precarious rubble.",
          "map": {
            "x": 9,
            "y": 7
          },
          "exits": {
            "ne": "R39",
            "sw": "R41"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R41": {
          "name": "The Hollow Echo",
          "description": "Your footsteps echo strangely here, as if there's empty space beneath the floor. A low, hollow sound accompanies each step, making you walk carefully.",
          "map": {
            "x": 8,
            "y": 8
          },
          "exits": {
            "ne": "R40",
            "se": "R42",
            "nw": "R98"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R42": {
          "name": "The Breathing Passage",
          "description": "A faint draft moves the air in a steady rhythm, almost like breathing. The walls seem to pulse slightly with each gust, and you find yourself matching your own breath to it.",
          "map": {
            "x": 9,
            "y": 9
          },
          "exits": {
            "nw": "R41",
            "se": "R43",
            "sw": "R102"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R43": {
          "name": "The Still Pool",
          "description": "A small, perfectly still pool of crystal‑clear water fills the center of this chamber. The water is so clear you can see the bottom, where small pebbles rest.",
          "map": {
            "x": 10,
            "y": 10
          },
          "exits": {
            "nw": "R42"
          },
          "contents": {
            "enemies": [
              {
                "key": "ogre",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "chaos_imp",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R44": {
          "name": "The High Shelf",
          "description": "You climb to a higher shelf that overlooks the pillar forest below. From here, you can see the tops of the stone pillars and the dark spaces between them.",
          "map": {
            "x": 7,
            "y": 2
          },
          "exits": {
            "sw": "R33",
            "ne": "R45"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R45": {
          "name": "The Chimney",
          "description": "A vertical shaft rises above you, disappearing into darkness. The walls are rough enough to climb, but the drop is dizzying. A cool draft flows upward.",
          "map": {
            "x": 8,
            "y": 1
          },
          "exits": {
            "sw": "R44",
            "nw": "R46",
            "se": "R47"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R46": {
          "name": "The Top of the Chimney",
          "description": "You emerge onto a narrow ledge at the top of the chimney. The air is fresher here, and you can hear the faint sound of wind from somewhere above. There's no way out but down.",
          "map": {
            "x": 7,
            "y": 0
          },
          "exits": {
            "se": "R45"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_ranger",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "dark_mage",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R47": {
          "name": "The Rumbling Floor",
          "description": "The floor vibrates faintly beneath your feet, a low rumble that you feel more than hear. It could be distant water, or something else entirely.",
          "map": {
            "x": 9,
            "y": 2
          },
          "exits": {
            "nw": "R45",
            "ne": "R48"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_zombie",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R48": {
          "name": "The Maze of Pillars",
          "description": "You enter a section where the pillars are arranged in a loose spiral, creating a natural labyrinth. The walls are covered in a fine dust, and the air is still and heavy.",
          "map": {
            "x": 10,
            "y": 1
          },
          "exits": {
            "sw": "R47",
            "n": "R49",
            "se": "R50"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R49": {
          "name": "The Spiral's Heart",
          "description": "You reach the center of the spiral, a small clearing among the pillars. The floor here is worn smooth, and the walls are covered in spiral patterns that seem to draw your eye inward.",
          "map": {
            "x": 10,
            "y": 0
          },
          "exits": {
            "s": "R48"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_leech",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "giant_leech",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "cave_worm",
                "drop": "mana_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R50": {
          "name": "The Forgotten Camp",
          "description": "The remains of an old camp lie here—charred wood, a rusted pot, and a tattered bedroll. Whoever was here left in a hurry, their supplies scattered.",
          "map": {
            "x": 11,
            "y": 2
          },
          "exits": {
            "nw": "R48",
            "e": "R51"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R51": {
          "name": "The Crumbling Path",
          "description": "The floor here is cracked and unstable, chunks of rock missing where the ground has given way. You pick your way carefully, testing each step before committing your weight.",
          "map": {
            "x": 12,
            "y": 2
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
          "name": "The Sound of Drums",
          "description": "A low, rhythmic thumping echoes from somewhere ahead, like drums or a heartbeat. The sound is constant, unwavering, and seems to vibrate through the stone.",
          "map": {
            "x": 13,
            "y": 3
          },
          "exits": {
            "nw": "R51",
            "se": "R53"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R53": {
          "name": "The Crossing",
          "description": "Three tunnels meet here. One heads southeast, another northeast, and a third winds back northwest. The air is thick with dust, and you can taste minerals on your tongue.",
          "map": {
            "x": 14,
            "y": 4
          },
          "exits": {
            "nw": "R52",
            "se": "R54",
            "ne": "R55"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R54": {
          "name": "The Deep Chamber",
          "description": "You descend into a chamber that feels far below the main tunnels. The air is cold and stale, and your light seems dimmer here, as if the darkness is pushing back.",
          "map": {
            "x": 15,
            "y": 5
          },
          "exits": {
            "nw": "R53"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "chaos_imp",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R55": {
          "name": "The Twisting Passages",
          "description": "The tunnel splits and twists in confusing ways, forcing you to backtrack more than once. The walls are rough and unyielding, and the ceiling seems to press down.",
          "map": {
            "x": 15,
            "y": 3
          },
          "exits": {
            "sw": "R53",
            "n": "R56"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_imp",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R56": {
          "name": "The Oily Seep",
          "description": "A black, oily liquid seeps from a crack in the wall, pooling on the floor. The smell is acrid, and your eyes water. The stuff is slippery and clings to your boots.",
          "map": {
            "x": 15,
            "y": 2
          },
          "exits": {
            "s": "R55",
            "nw": "R57"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R57": {
          "name": "The Three‑Way Split",
          "description": "Three passages lead from this small chamber. One to the southeast, one to the northeast, and one to the northwest. A low growl seems to come from all of them at once.",
          "map": {
            "x": 14,
            "y": 1
          },
          "exits": {
            "se": "R56",
            "ne": "R58",
            "nw": "R59"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R58": {
          "name": "The Northern Spur",
          "description": "The passage ends abruptly in a wall of solid rock. Scratches on the wall suggest something tried to dig through here, but gave up. You wonder what drove it to try.",
          "map": {
            "x": 15,
            "y": 0
          },
          "exits": {
            "sw": "R57"
          },
          "contents": {
            "enemies": [
              {
                "key": "stone_golem",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "dark_mage",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R59": {
          "name": "The Western Spur",
          "description": "A short, straight passage that opens into a small, empty chamber. The floor is covered in a thick layer of dust, undisturbed. You may be the first to stand here in ages.",
          "map": {
            "x": 13,
            "y": 0
          },
          "exits": {
            "se": "R57",
            "w": "R60"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_ranger",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R60": {
          "name": "The Dead End",
          "description": "The tunnel ends here in a rough wall of rock. A single, faded symbol is scratched into the stone—a warning or a marker, but the meaning is lost to time.",
          "map": {
            "x": 12,
            "y": 0
          },
          "exits": {
            "e": "R59"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_ranger",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "dark_ranger",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R61": {
          "name": "The Dry Riverbed",
          "description": "What was once a stream now lies empty, the stones worn smooth by ancient water. A faint, musty smell rises from the dry channel.",
          "map": {
            "x": 3,
            "y": 9
          },
          "exits": {
            "ne": "R62"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "plague_zombie",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R62": {
          "name": "The Forked Riverbed",
          "description": "The dry riverbed splits into three channels. The northeast fork seems wider, the northwest narrower, and the southwest forks back toward the main channel.",
          "map": {
            "x": 4,
            "y": 8
          },
          "exits": {
            "ne": "R63",
            "sw": "R61",
            "nw": "R64"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R63": {
          "name": "The Boneyard",
          "description": "A pile of old bones lies scattered here—some animal, some perhaps not. They've been here a long time, but something has been disturbing them recently, judging by the displaced piles.",
          "map": {
            "x": 5,
            "y": 7
          },
          "exits": {
            "e": "R99",
            "sw": "R62",
            "se": "R100"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_leech",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "plague_zombie",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R64": {
          "name": "The Shifting Gravel",
          "description": "The floor here is covered in loose gravel that shifts and slides underfoot, making each step a hazard. The walls are slick with moisture, and you can hear water somewhere nearby.",
          "map": {
            "x": 3,
            "y": 7
          },
          "exits": {
            "se": "R62",
            "ne": "R65"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R65": {
          "name": "The Sinkhole",
          "description": "The floor has collapsed into a wide, shallow depression, the edges jagged and unstable. Water drips from above, plinking into a small pool at the bottom.",
          "map": {
            "x": 4,
            "y": 6
          },
          "exits": {
            "sw": "R64",
            "ne": "R66"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R66": {
          "name": "The Quiet Pool",
          "description": "A small, perfectly still pool of water fills the center of this chamber. The water is so clear you can see the bottom, where small white stones rest like eggs.",
          "map": {
            "x": 5,
            "y": 5
          },
          "exits": {
            "sw": "R65",
            "nw": "R67"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R67": {
          "name": "The Whistling Crack",
          "description": "A narrow crack in the wall whistles with wind, creating an eerie, high‑pitched sound that rises and falls. The draft is cold, suggesting the crack leads somewhere far away.",
          "map": {
            "x": 4,
            "y": 4
          },
          "exits": {
            "se": "R66",
            "nw": "R68"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R68": {
          "name": "The Tight Squeeze",
          "description": "The passage narrows to a point where you must turn sideways and press yourself against the cold, damp rock. Your torch sputters in the tight space, and you can hear your own heartbeat echoing back.",
          "map": {
            "x": 3,
            "y": 3
          },
          "exits": {
            "se": "R67",
            "sw": "R103"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R69": {
          "name": "The Crossroads",
          "description": "A wide chamber where multiple paths meet. The floor is worn smooth, and the walls bear faint marks that might have been carvings. The air is still and expectant.",
          "map": {
            "x": 11,
            "y": 10
          },
          "exits": {
            "ne": "R71",
            "se": "R70"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R70": {
          "name": "The Southern Alcove",
          "description": "A small, secluded alcove tucked away from the main chamber. The floor is covered in a thick layer of dust that hasn't been disturbed in ages. You may be the first to stand here in years.",
          "map": {
            "x": 12,
            "y": 11
          },
          "exits": {
            "nw": "R69"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_imp",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "chaos_imp",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "dark_mage",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R71": {
          "name": "The Northern Passage",
          "description": "A wide passage leading north, the walls lined with what might be old torch sconces, though they've long since crumbled to rust. Someone built here, once, long ago.",
          "map": {
            "x": 12,
            "y": 9
          },
          "exits": {
            "ne": "R72",
            "sw": "R69"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R72": {
          "name": "The Hall of Pillars",
          "description": "A grand hall supported by a double row of natural pillars, their surfaces polished to a dull sheen. The space between them creates a natural corridor that feels almost ceremonial.",
          "map": {
            "x": 13,
            "y": 8
          },
          "exits": {
            "ne": "R73",
            "sw": "R71",
            "se": "R78"
          },
          "contents": {
            "enemies": [
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
        "R73": {
          "name": "The Eastern Branch",
          "description": "A tunnel that branches east, narrowing as it goes. The walls are covered in a strange, fibrous growth that glows faintly, casting a pale, greenish light.",
          "map": {
            "x": 14,
            "y": 7
          },
          "exits": {
            "nw": "R75",
            "e": "R74",
            "sw": "R72"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R74": {
          "name": "The Glowing Alcove",
          "description": "A small alcove where the glowing growth has spread thickly, bathing the chamber in an eerie green light. The air is thick with floating spores that dance in the glow.",
          "map": {
            "x": 15,
            "y": 7
          },
          "exits": {
            "w": "R73"
          },
          "contents": {
            "enemies": [
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "dark_mage",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R75": {
          "name": "The Western Branch",
          "description": "A tunnel heading west, the walls bare and rough. The air is cool and still, and your footsteps echo strangely, as if the passage is wider than it looks.",
          "map": {
            "x": 13,
            "y": 6
          },
          "exits": {
            "nw": "R76",
            "se": "R73"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R76": {
          "name": "The Northern Chamber",
          "description": "A round chamber with a low ceiling. The walls are smooth and featureless, and the floor is worn smooth in a circular pattern, as if something has been walking in circles here.",
          "map": {
            "x": 12,
            "y": 5
          },
          "exits": {
            "nw": "R77",
            "se": "R75"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_imp",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R77": {
          "name": "The Southern Chamber",
          "description": "A small, square chamber with smooth walls and a perfectly flat floor. This was clearly shaped by intelligent hands, though for what purpose is unclear.",
          "map": {
            "x": 11,
            "y": 4
          },
          "exits": {
            "sw": "R38",
            "se": "R76"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R78": {
          "name": "The Fallen Pillars",
          "description": "Several pillars have collapsed here, creating a treacherous jumble of stone. You have to climb over the rubble, careful not to dislodge anything that might cause another collapse.",
          "map": {
            "x": 14,
            "y": 9
          },
          "exits": {
            "nw": "R72",
            "se": "R79"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R79": {
          "name": "The Scent of Smoke",
          "description": "A faint smell of smoke hangs in the air, though there's no sign of fire. The scent is old but persistent, as if from a campfire long extinguished.",
          "map": {
            "x": 15,
            "y": 10
          },
          "exits": {
            "nw": "R78",
            "sw": "R80"
          },
          "contents": {
            "enemies": [
              {
                "key": "ogre",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R80": {
          "name": "The Ashen Floor",
          "description": "The floor here is covered in a thin layer of grey ash, crunching softly underfoot. Something burned here, long ago, and the ash has never been disturbed.",
          "map": {
            "x": 14,
            "y": 11
          },
          "exits": {
            "ne": "R79",
            "s": "R81"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R81": {
          "name": "The Forked Tunnel",
          "description": "Three passages meet in a small chamber. The southeast tunnel smells of dust, the southwest carries a faint mineral tang, and the north echoes with the sound of dripping water.",
          "map": {
            "x": 14,
            "y": 12
          },
          "exits": {
            "n": "R80",
            "se": "R82",
            "sw": "R84"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R82": {
          "name": "The Southern Passage",
          "description": "A long, straight corridor that seems to run south for a considerable distance. The floor is littered with small stones that crunch underfoot, and the walls are damp.",
          "map": {
            "x": 15,
            "y": 13
          },
          "exits": {
            "nw": "R81",
            "s": "R83"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_ranger",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R83": {
          "name": "The Southern Terminus",
          "description": "The passage ends here, in a small, round chamber. The walls are smooth and featureless, and the floor is worn smooth. You feel a sense of finality, as if you've reached the end of something.",
          "map": {
            "x": 15,
            "y": 14
          },
          "exits": {
            "n": "R82"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "cave_worm",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R84": {
          "name": "The Western Passage",
          "description": "A narrow passage heading west, the walls close and the ceiling low. The air here is still and musty, thick with the smell of old stone.",
          "map": {
            "x": 13,
            "y": 13
          },
          "exits": {
            "ne": "R81",
            "s": "R85"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R85": {
          "name": "The Western Chamber",
          "description": "A small, round chamber at the end of the western passage. The walls are bare rock, and the floor is covered in a thick layer of dust. You may be the first to stand here in years.",
          "map": {
            "x": 13,
            "y": 14
          },
          "exits": {
            "n": "R84",
            "sw": "R86"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R86": {
          "name": "The Winding Corridor",
          "description": "The corridor twists and turns, forcing you to change direction several times. The walls are close, and the ceiling is low, making you stoop as you walk.",
          "map": {
            "x": 12,
            "y": 15
          },
          "exits": {
            "ne": "R85",
            "sw": "R87"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "chaos_imp",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R87": {
          "name": "The Spiral Staircase",
          "description": "A natural spiral in the rock creates a crude staircase, descending into darkness. The steps are uneven and slick with moisture, and you can hear the echo of distant water below.",
          "map": {
            "x": 11,
            "y": 16
          },
          "exits": {
            "ne": "R86",
            "sw": "R88",
            "se": "R94"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R88": {
          "name": "The Western Descent",
          "description": "A steep slope leads west, the floor slick with water. You have to brace yourself against the walls to keep from sliding, and the darkness ahead seems to swallow your light.",
          "map": {
            "x": 10,
            "y": 17
          },
          "exits": {
            "ne": "R87",
            "nw": "R89"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R89": {
          "name": "The Still Pool",
          "description": "A large, still pool fills most of this chamber. The water is dark and cold, and you can't see the bottom. Ripples from your footsteps spread across the surface, disturbing the perfect calm.",
          "map": {
            "x": 9,
            "y": 16
          },
          "exits": {
            "se": "R88",
            "nw": "R90"
          },
          "contents": {
            "enemies": [
              {
                "key": "giant_leech",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R90": {
          "name": "The Muddy Bank",
          "description": "The pool's edge is thick with mud that squelches underfoot. Something large has been here recently, judging by the deep tracks leading into the water.",
          "map": {
            "x": 8,
            "y": 15
          },
          "exits": {
            "se": "R89",
            "nw": "R91"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R91": {
          "name": "The Waterfall's Echo",
          "description": "You can hear the distant roar of falling water from somewhere ahead, its sound echoing through the tunnels. The air is damp and cool, and you can taste moisture on your lips.",
          "map": {
            "x": 7,
            "y": 14
          },
          "exits": {
            "se": "R90",
            "nw": "R92"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R92": {
          "name": "The Spray Chamber",
          "description": "A fine mist hangs in the air, making everything slick and wet. The roar of water is louder here, though you still can't see the source. The mist clings to your skin and clothes.",
          "map": {
            "x": 6,
            "y": 13
          },
          "exits": {
            "se": "R91",
            "n": "R93"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R93": {
          "name": "The Waterfall's Base",
          "description": "You emerge at the base of a roaring waterfall, the water crashing into a deep pool before flowing away through a narrow channel. The spray is thick here, and the noise is deafening.",
          "map": {
            "x": 6,
            "y": 12
          },
          "exits": {
            "s": "R92"
          },
          "contents": {
            "enemies": [
              {
                "key": "ogre",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "chaos_imp",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "chaos_imp",
                "drop": "mana_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R94": {
          "name": "The Eastern Passage",
          "description": "A wide passage heading east, the walls damp and slick. The air is cool and fresh, and you can hear the sound of water dripping somewhere ahead.",
          "map": {
            "x": 12,
            "y": 17
          },
          "exits": {
            "nw": "R87",
            "e": "R95"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R95": {
          "name": "The Eastern Chamber",
          "description": "A round chamber with a high ceiling. The walls are covered in a thin layer of moss that glows faintly, casting a soft, green light over everything.",
          "map": {
            "x": 13,
            "y": 17
          },
          "exits": {
            "w": "R94",
            "ne": "R96"
          },
          "contents": {
            "enemies": [
              {
                "key": "plague_zombie",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R96": {
          "name": "The Northeast Passage",
          "description": "A narrow passage heading northeast, the walls close and the ceiling low. The air is warm and dry, a sharp contrast to the dampness elsewhere.",
          "map": {
            "x": 14,
            "y": 16
          },
          "exits": {
            "sw": "R95",
            "se": "R97"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R97": {
          "name": "The Northeast Chamber",
          "description": "A small, round chamber at the end of the northeast passage. The walls are bare rock, and the floor is covered in a thick layer of dust. You may be the first to stand here in a very long time.",
          "map": {
            "x": 15,
            "y": 17
          },
          "exits": {
            "nw": "R96"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_ranger",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "plague_zombie",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R98": {
          "name": "The Central Junction",
          "description": "A wide chamber where several passages converge. The walls are covered in the faint glow of the moss, and the air is still and heavy. You feel as though you're at the heart of something.",
          "map": {
            "x": 7,
            "y": 7
          },
          "exits": {
            "se": "R41",
            "w": "R99"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R99": {
          "name": "The Western Corridor",
          "description": "A long, straight corridor heading west. The walls are rough and unfinished, and the floor is uneven, forcing careful footing. The air is cool and dry.",
          "map": {
            "x": 6,
            "y": 7
          },
          "exits": {
            "e": "R98",
            "w": "R63"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R100": {
          "name": "The Southern Fork",
          "description": "The passage splits here. One branch heads southeast, the other northwest. A faint, musty smell comes from the southeast, while the northwest carries the scent of damp earth.",
          "map": {
            "x": 6,
            "y": 8
          },
          "exits": {
            "nw": "R63",
            "se": "R101"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R101": {
          "name": "The Southeast Passage",
          "description": "A narrow passage heading southeast, the walls close and the ceiling low. The air is warm and musty, and you can hear the faint scuttling of something ahead.",
          "map": {
            "x": 7,
            "y": 9
          },
          "exits": {
            "nw": "R100",
            "se": "R102"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_imp",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R102": {
          "name": "The Southeast Chamber",
          "description": "A small, round chamber at the end of the southeast passage. The walls are covered in the glowing moss, casting a soft light over everything. The air is still and silent, and you feel a sense of peace here.",
          "map": {
            "x": 8,
            "y": 10
          },
          "exits": {
            "nw": "R101",
            "ne": "R42"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R103": {
          "name": "The Hidden Crack",
          "description": "A narrow crack in the wall, easy to miss. It leads southwest away from the main passage. The air from within is different: drier, older.",
          "map": {
            "x": 2,
            "y": 4
          },
          "exits": {
            "ne": "R68",
            "sw": "R104"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R104": {
          "name": "The Forgotten Corridor",
          "description": "A low corridor that has not seen foot traffic in ages. Dust lies thick and undisturbed. Whatever is at the end of this passage has been waiting a long time.",
          "map": {
            "x": 1,
            "y": 5
          },
          "exits": {
            "ne": "R103",
            "e": "R105"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R105": {
          "name": "The Marked Threshold",
          "description": "The walls here bear faint scratch marks, not natural wear but deliberate. Someone made these marks as a trail. Or as a warning to turn back.",
          "map": {
            "x": 2,
            "y": 5
          },
          "exits": {
            "w": "R104",
            "e": "R106"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R106": {
          "name": "The Inscription Chamber",
          "description": "A small chamber where the walls are carved with dense script in an ancient hand. At the center, resting on a natural stone shelf, is a fragment of something greater. An inscription reads: The Warden's Staff was shattered into eight pieces and scattered through the depths, each piece bound to a guardian, a trap, or a place of power. Only one who collects all eight may speak the word that opens the way out. Seek them all.",
          "map": {
            "x": 3,
            "y": 5
          },
          "exits": {
            "w": "R105",
            "e": "R107"
          },
          "contents": {
            "lootTable": [
              {
                "key": "staff_piece_1",
                "type": "item",
                "quality": "common",
                "label": "Staff Piece I — The Base",
                "icon": "🪄"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R107": {
          "name": "The Rift Point",
          "description": "The corridor ends abruptly at a shimmering distortion in the air, faintly luminous. Whatever it is, it was placed here intentionally. Stepping into it feels like the only way forward.",
          "map": {
            "x": 4,
            "y": 5
          },
          "exits": {
            "w": "R106"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 2,
              "targetRoom": "R108",
              "flashColor": "white",
              "isDestination": true
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R351": {
          "name": "",
          "description": "",
          "map": {
            "x": 4,
            "y": 3
          },
          "exits": {},
          "contents": {},
          "flags": {
            "discovered": false
          }
        }
      }
    },
    "2": {
      "startRoom": "R108",
      "rooms": {
        "R108": {
          "name": "The Sunken Entry",
          "description": "You arrive in a flooded antechamber, the floor submerged beneath an inch of black water. Ancient stonework surrounds you: cracked arches, collapsed columns, the remnants of something once grand.",
          "map": {
            "x": 22,
            "y": 7
          },
          "exits": {
            "n": "R109"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 1,
              "targetRoom": "R107",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R109": {
          "name": "The Drowned Hall",
          "description": "A long hall half-filled with dark water. Waterlogged banners hang from the walls, their symbols long since dissolved. The ceiling drips steadily.",
          "map": {
            "x": 22,
            "y": 6
          },
          "exits": {
            "s": "R108",
            "n": "R110"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R110": {
          "name": "The Submerged Corridor",
          "description": "The corridor dips lower here, the water rising to your knees. Broken tiles shift underfoot. Whatever civilization built this place, the water took it long ago.",
          "map": {
            "x": 22,
            "y": 5
          },
          "exits": {
            "s": "R109",
            "n": "R111"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R111": {
          "name": "The Collapsed Arch",
          "description": "A great stone arch has partially collapsed, its keystone fallen into the water. You squeeze past the rubble, careful not to dislodge what remains above.",
          "map": {
            "x": 22,
            "y": 4
          },
          "exits": {
            "s": "R110",
            "w": "R112"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R112": {
          "name": "The Flooded Antechamber",
          "description": "A small square room with water up to your shins. The walls still bear traces of painted murals, their colors bled and smeared by centuries of flooding.",
          "map": {
            "x": 21,
            "y": 4
          },
          "exits": {
            "e": "R111",
            "w": "R113"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R113": {
          "name": "The Ruined Crossing",
          "description": "A wider chamber where three flooded passages meet. The water here is still and dark. Broken columns rise from the depths like the ribs of some drowned beast.",
          "map": {
            "x": 20,
            "y": 4
          },
          "exits": {
            "e": "R112",
            "n": "R114",
            "w": "R120"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R114": {
          "name": "The Seeping Wall",
          "description": "Water seeps steadily through cracks in the eastern wall, running down the stonework in thin rivulets. The floor is slick and treacherous.",
          "map": {
            "x": 20,
            "y": 3
          },
          "exits": {
            "s": "R113",
            "n": "R115"
          },
          "contents": {
            "enemies": [
              {
                "key": "phantom_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R115": {
          "name": "The Waterlogged Gallery",
          "description": "A long gallery where the water reaches ankle depth. Niches line the walls, empty now, whatever they once held long since washed away.",
          "map": {
            "x": 20,
            "y": 2
          },
          "exits": {
            "s": "R114",
            "w": "R116"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R116": {
          "name": "The Black Mirror",
          "description": "The water here is perfectly still, reflecting the ceiling above with unsettling clarity. Something about this room feels watched.",
          "map": {
            "x": 19,
            "y": 2
          },
          "exits": {
            "e": "R115",
            "w": "R117"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R117": {
          "name": "The Mossy Archway",
          "description": "Thick green moss covers every surface of this archway, fed by the constant moisture. The stone beneath has begun to crumble.",
          "map": {
            "x": 18,
            "y": 2
          },
          "exits": {
            "e": "R116",
            "s": "R118"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R118": {
          "name": "The Damp Passage",
          "description": "A narrow passage where the walls weep water. Your torch hisses and spits. The air is cold and heavy with moisture.",
          "map": {
            "x": 18,
            "y": 3
          },
          "exits": {
            "n": "R117",
            "s": "R119"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R119": {
          "name": "The Sunken Crossroads",
          "description": "Four passages meet beneath a vaulted ceiling. The water here is knee-deep and a current pulls gently southward.",
          "map": {
            "x": 18,
            "y": 4
          },
          "exits": {
            "n": "R118",
            "e": "R120",
            "s": "R121",
            "w": "R129"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R120": {
          "name": "The Silted Chamber",
          "description": "Fine grey silt has settled across the floor, disturbed by your passage into swirling clouds. The water is murky and visibility poor.",
          "map": {
            "x": 19,
            "y": 4
          },
          "exits": {
            "e": "R113",
            "w": "R119"
          },
          "contents": {
            "enemies": [
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
        "R121": {
          "name": "The Crumbling Stair",
          "description": "Worn stone steps descend into deeper water. Each step crumbles slightly at the edge, threatening to give way under your weight.",
          "map": {
            "x": 18,
            "y": 5
          },
          "exits": {
            "n": "R119",
            "s": "R122"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R122": {
          "name": "The Flooded Nave",
          "description": "The remnant of what might have been a great hall. Tall broken columns rise from the water. The ceiling far above is intact but the floor has sunk beneath the flood.",
          "map": {
            "x": 18,
            "y": 6
          },
          "exits": {
            "n": "R121",
            "s": "R123"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R123": {
          "name": "The Submerged Threshold",
          "description": "A wide doorway half-blocked by a collapsed lintel. The water runs through the gap in a thin current. Whatever this opened into, it was important.",
          "map": {
            "x": 18,
            "y": 7
          },
          "exits": {
            "n": "R122",
            "w": "R124"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R124": {
          "name": "The Drowned Corridor",
          "description": "A straight corridor running west, the water waist deep and cold. The walls are bare stone, stripped clean by the flood.",
          "map": {
            "x": 17,
            "y": 7
          },
          "exits": {
            "e": "R123",
            "w": "R125"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R125": {
          "name": "The Tidal Passage",
          "description": "The water here moves with a faint pulse, as though something deep below is breathing. The rhythm is slow and deeply unsettling.",
          "map": {
            "x": 16,
            "y": 7
          },
          "exits": {
            "e": "R124",
            "n": "R126"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R126": {
          "name": "The Algae Room",
          "description": "Every surface is coated in dark green algae, slick and treacherous underfoot. The smell is thick and organic, like a stagnant pond.",
          "map": {
            "x": 16,
            "y": 6
          },
          "exits": {
            "s": "R125",
            "n": "R127"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "cave_worm",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R127": {
          "name": "The Flooded Alcove",
          "description": "A small alcove branching from the main passage. The water here is deeper, thigh high. Something rests on the bottom, too blurred by the murk to identify.",
          "map": {
            "x": 16,
            "y": 5
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
          "name": "The Ruins Junction",
          "description": "A wide junction where four passages meet beneath vaulted ceilings. Fallen stonework creates natural stepping stones above the waterline.",
          "map": {
            "x": 16,
            "y": 4
          },
          "exits": {
            "s": "R127",
            "n": "R130",
            "w": "R136",
            "e": "R129"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R129": {
          "name": "The Narrow Ford",
          "description": "A narrow passage where the water flows swiftly between two chambers. The current is strong enough to make footing uncertain.",
          "map": {
            "x": 17,
            "y": 4
          },
          "exits": {
            "e": "R119",
            "w": "R128"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R130": {
          "name": "The Seepage Chamber",
          "description": "Water enters this room from every wall in thin streams, maintaining a constant level. The pressure from somewhere above is immense.",
          "map": {
            "x": 16,
            "y": 3
          },
          "exits": {
            "s": "R128",
            "n": "R131"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R131": {
          "name": "The Flooded Antechamber",
          "description": "A square antechamber with water to the knees. The doorways are framed by carved stone, their faces worn smooth. Something once guarded this place.",
          "map": {
            "x": 16,
            "y": 2
          },
          "exits": {
            "s": "R130",
            "w": "R132"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R132": {
          "name": "The Eroded Hall",
          "description": "The walls here have been eaten away by water over the centuries, leaving smooth curved surfaces. The passage narrows toward its far end.",
          "map": {
            "x": 15,
            "y": 2
          },
          "exits": {
            "e": "R131",
            "w": "R133"
          },
          "contents": {
            "enemies": [
              {
                "key": "phantom_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R133": {
          "name": "The Sunken Corridor",
          "description": "The corridor dips sharply, the water rising to chest height for several steps before the floor rises again. You push through with held breath.",
          "map": {
            "x": 14,
            "y": 2
          },
          "exits": {
            "e": "R132",
            "s": "R134"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R134": {
          "name": "The Stagnant Pool",
          "description": "A chamber dominated by a pool of standing water so still it looks solid. Beneath its surface, the dim shapes of old architecture are just visible.",
          "map": {
            "x": 14,
            "y": 3
          },
          "exits": {
            "n": "R133",
            "s": "R135"
          },
          "contents": {
            "enemies": [
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
        "R135": {
          "name": "The Ruined Atrium",
          "description": "An open atrium where the ceiling has collapsed, exposing the chamber to the water table above. Something drips from high overhead.",
          "map": {
            "x": 14,
            "y": 4
          },
          "exits": {
            "n": "R134",
            "e": "R136",
            "w": "R137"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R136": {
          "name": "The Flooded Passageway",
          "description": "A long passageway with water flowing steadily in one direction, carrying silt and debris. You walk against the current.",
          "map": {
            "x": 15,
            "y": 4
          },
          "exits": {
            "w": "R135",
            "e": "R128"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R137": {
          "name": "The Drowned Vault",
          "description": "A vaulted chamber whose ceiling arches high above the waterline. The floor is submerged but the upper walls still bear carved decoration, preserved above the flood.",
          "map": {
            "x": 13,
            "y": 4
          },
          "exits": {
            "e": "R135",
            "w": "R138"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R138": {
          "name": "The Four Ways",
          "description": "A wide chamber where four flooded passages converge. The water is waist deep here, the floor uneven with fallen masonry.",
          "map": {
            "x": 12,
            "y": 4
          },
          "exits": {
            "e": "R137",
            "w": "R139",
            "s": "R147",
            "n": "R150"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R139": {
          "name": "The Submerged Gallery",
          "description": "A gallery of flooded niches, each one empty. Whatever they once held, the water has claimed it. The floor is slick with mineral deposits.",
          "map": {
            "x": 11,
            "y": 4
          },
          "exits": {
            "e": "R138",
            "w": "R140"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R140": {
          "name": "The Dripping Corridor",
          "description": "Every step forward is met with the sound of dripping. Water falls in curtains from cracks above, making the air a fine cold mist.",
          "map": {
            "x": 10,
            "y": 4
          },
          "exits": {
            "e": "R139",
            "s": "R141"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R141": {
          "name": "The Broken Bridge",
          "description": "The remains of a stone bridge span a deeper section of flooding. Half has collapsed. You cross on the remaining half, the stones shifting under your weight.",
          "map": {
            "x": 10,
            "y": 5
          },
          "exits": {
            "n": "R140",
            "s": "R142"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R142": {
          "name": "The Sunken Chamber",
          "description": "A small chamber sunken below the surrounding passage level, the water here chest deep and very cold. You wade through quickly.",
          "map": {
            "x": 10,
            "y": 6
          },
          "exits": {
            "n": "R141",
            "s": "R143"
          },
          "contents": {
            "enemies": [
              {
                "key": "necromancer",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R143": {
          "name": "The Flooded Passageway",
          "description": "A straight flooded passage where the water runs in a thin current. Old torch sconces line the walls, their iron long since rusted.",
          "map": {
            "x": 10,
            "y": 7
          },
          "exits": {
            "n": "R142",
            "s": "R144"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R144": {
          "name": "The Mossy Vault",
          "description": "Thick moss covers every surface of this vaulted room, fed by the constant damp. The green makes the room feel alive in a way stone should not.",
          "map": {
            "x": 10,
            "y": 8
          },
          "exits": {
            "n": "R143",
            "e": "R145"
          },
          "contents": {
            "enemies": [
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "runic_guardian",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R145": {
          "name": "The Narrow Flood",
          "description": "The passage narrows to barely a shoulder width, the water chest high. You turn sideways and press through, cold stone and cold water on both sides.",
          "map": {
            "x": 11,
            "y": 8
          },
          "exits": {
            "w": "R144",
            "e": "R146"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R146": {
          "name": "The Ruined Hall",
          "description": "A wider hall where three passages converge. Fallen columns lie across the flooded floor like stepping stones. The water here is thigh deep and dark.",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "w": "R145",
            "n": "R149",
            "s": "R153"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R147": {
          "name": "The Sunken Corridor",
          "description": "A long passage running east, the water knee deep. The ceiling here has held and the walls are unusually intact, giving a sense of what this hall once looked like.",
          "map": {
            "x": 12,
            "y": 5
          },
          "exits": {
            "s": "R148",
            "n": "R138"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R148": {
          "name": "The Eroded Archway",
          "description": "A wide archway whose carved details have been worn smooth by centuries of water. On the far side, the passage continues into deeper shadow.",
          "map": {
            "x": 12,
            "y": 6
          },
          "exits": {
            "s": "R149",
            "n": "R147"
          },
          "contents": {
            "enemies": [
              {
                "key": "phantom_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R149": {
          "name": "The Flooded Passage",
          "description": "A corridor where the floor has partially collapsed. You feel the edge of the drop with each step, the water obscuring the depth until you are already falling.",
          "map": {
            "x": 12,
            "y": 7
          },
          "exits": {
            "s": "R146",
            "n": "R148"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R150": {
          "name": "The Dark Water Room",
          "description": "The water here is darker than elsewhere, stained by something seeping from the walls. It smells faintly of iron. You do not linger.",
          "map": {
            "x": 12,
            "y": 3
          },
          "exits": {
            "n": "R151",
            "s": "R138"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_champion",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R151": {
          "name": "The Submerged Stair",
          "description": "Stone steps descend beneath the water level and then rise again. The passage between is completely submerged. You hold your breath and cross.",
          "map": {
            "x": 12,
            "y": 2
          },
          "exits": {
            "n": "R152",
            "s": "R150"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R152": {
          "name": "The Waterlogged Chamber",
          "description": "A chamber half-full of black standing water. The ceiling is low, the walls close. Whatever this room was for, the flood has made it unrecognizable.",
          "map": {
            "x": 12,
            "y": 1
          },
          "exits": {
            "w": "R233",
            "s": "R151"
          },
          "contents": {
            "enemies": [
              {
                "key": "necromancer",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R153": {
          "name": "The Flooded Nave",
          "description": "A long nave with columns rising from the water on either side. The center aisle is flooded waist deep. The scale of what was once here is still impressive.",
          "map": {
            "x": 12,
            "y": 9
          },
          "exits": {
            "n": "R146",
            "s": "R154"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R154": {
          "name": "The Drowned Passage",
          "description": "A narrow passage where the water is thigh high and cold. The walls are close. The ceiling drips. There is nowhere to go but forward.",
          "map": {
            "x": 12,
            "y": 10
          },
          "exits": {
            "n": "R153",
            "s": "R155"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R155": {
          "name": "The Submerged Hall",
          "description": "A hall where the waterline is at shoulder height, forcing you to tilt your head back and breathe shallowly. Every step is slow and deliberate.",
          "map": {
            "x": 12,
            "y": 11
          },
          "exits": {
            "n": "R154",
            "s": "R156"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R156": {
          "name": "The Flooded Chamber",
          "description": "A square chamber with water up to your knees. The floor is tiled in cracked stone. Beneath the water, a faded pattern is just visible.",
          "map": {
            "x": 12,
            "y": 12
          },
          "exits": {
            "n": "R155",
            "s": "R157"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R157": {
          "name": "The Ruined Crossing",
          "description": "Three passages meet in a chamber with a partially collapsed ceiling. Rubble creates an uneven path above the waterline.",
          "map": {
            "x": 12,
            "y": 13
          },
          "exits": {
            "n": "R156",
            "e": "R158",
            "w": "R161"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R158": {
          "name": "The Dark Corridor",
          "description": "A flooded corridor where the water is chest deep and absolutely still. The walls are slick and featureless. You move through quickly.",
          "map": {
            "x": 13,
            "y": 13
          },
          "exits": {
            "w": "R157",
            "e": "R159"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R159": {
          "name": "The Seeping Gallery",
          "description": "A gallery where water seeps through every crack, running in thin sheets down the carved walls. The constant sound of running water is all you hear.",
          "map": {
            "x": 14,
            "y": 13
          },
          "exits": {
            "w": "R158",
            "e": "R160"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R160": {
          "name": "The Drowned End",
          "description": "The passage ends at a wall of solid stone, the floor completely submerged. Whatever was here has been swallowed by the flood entirely. Three shapes move in the dark water.",
          "map": {
            "x": 15,
            "y": 13
          },
          "exits": {
            "w": "R159"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "chaos_knight",
                "drop": "health_potion",
                "rarity": "uncommon"
              },
              {
                "key": "runic_guardian",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R161": {
          "name": "The Narrow Channel",
          "description": "A channel cut into the rock, the water moving in a slow current. The walls are close and the ceiling low, but it is navigable.",
          "map": {
            "x": 11,
            "y": 13
          },
          "exits": {
            "e": "R157",
            "w": "R162"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R162": {
          "name": "The Flooded Room",
          "description": "A small flooded room with water at the knees. The walls bear the ghost of carved relief work, too damaged to read.",
          "map": {
            "x": 10,
            "y": 13
          },
          "exits": {
            "e": "R161",
            "w": "R163"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R163": {
          "name": "The Current Room",
          "description": "The water here moves noticeably, pulled by some pressure deep below. Debris floats past: fragments of old wood, chips of carved stone.",
          "map": {
            "x": 9,
            "y": 13
          },
          "exits": {
            "e": "R162",
            "w": "R164"
          },
          "contents": {
            "enemies": [
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
        "R164": {
          "name": "The Seepage Passage",
          "description": "A passage where water enters through the ceiling as much as the floor. You are wet from above and below. The noise is constant.",
          "map": {
            "x": 8,
            "y": 13
          },
          "exits": {
            "e": "R163",
            "n": "R165"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R165": {
          "name": "The Flooded Alcove",
          "description": "A small alcove off the main passage. The water here is hip deep and very cold. Something has disturbed the silt on the bottom recently.",
          "map": {
            "x": 8,
            "y": 12
          },
          "exits": {
            "s": "R164",
            "n": "R166"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R166": {
          "name": "The Submerged Corridor",
          "description": "A corridor with water up to the chest. The walls are intact but bare. Every sound you make echoes back doubled.",
          "map": {
            "x": 8,
            "y": 11
          },
          "exits": {
            "s": "R165",
            "n": "R167"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R167": {
          "name": "The Junction Pool",
          "description": "Three passages meet in a deep pool. The floor here is not visible through the dark water. You feel your way along the walls.",
          "map": {
            "x": 8,
            "y": 10
          },
          "exits": {
            "s": "R166",
            "w": "R179",
            "n": "R168"
          },
          "contents": {
            "enemies": [
              {
                "key": "phantom_mage",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R168": {
          "name": "The Flooded Hall",
          "description": "A hall with water at the waist. The ceiling is high and intact. In another age, this must have been a place of importance.",
          "map": {
            "x": 8,
            "y": 9
          },
          "exits": {
            "n": "R169",
            "s": "R167"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R169": {
          "name": "The Dark Passage",
          "description": "A straight dark passage with water at the knee. The walls are damp and the air cold. You move carefully, testing each step.",
          "map": {
            "x": 8,
            "y": 8
          },
          "exits": {
            "n": "R170",
            "s": "R168"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R170": {
          "name": "The Sunken Corridor",
          "description": "The corridor descends here, the water rising to the thighs before the floor levels again. The brief depth is enough to make your heart quicken.",
          "map": {
            "x": 8,
            "y": 7
          },
          "exits": {
            "w": "R171",
            "s": "R169"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R171": {
          "name": "The Flooded Hall",
          "description": "A wide hall with water at the ankles. After the depths of the last few passages, this feels almost dry. The respite is brief.",
          "map": {
            "x": 7,
            "y": 7
          },
          "exits": {
            "w": "R172",
            "e": "R170"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R172": {
          "name": "The Crumbling Hall",
          "description": "A hall where the ceiling has begun to crack, small fragments of stone dropping into the water below. You move quickly through.",
          "map": {
            "x": 6,
            "y": 7
          },
          "exits": {
            "w": "R173",
            "e": "R171"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R173": {
          "name": "The Flooded Crossroads",
          "description": "Four passages meet in a chamber with water at the knee. The water here is darker than elsewhere, stained by something you cannot identify.",
          "map": {
            "x": 5,
            "y": 7
          },
          "exits": {
            "s": "R175",
            "w": "R174",
            "e": "R172",
            "n": "R208"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R174": {
          "name": "The Black Corner",
          "description": "A dead-end alcove with water up to the waist and absolute darkness beyond the reach of your torch. Something is here. It has been waiting.",
          "map": {
            "x": 4,
            "y": 7
          },
          "exits": {
            "e": "R173"
          },
          "contents": {
            "enemies": [
              {
                "key": "black_knight",
                "drop": "staff_piece_2",
                "rarity": "rare"
              },
              {
                "key": "runic_guardian",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R175": {
          "name": "The Narrow Flood",
          "description": "A narrow passage with water at the ankle. The walls are close. The air smells of old stone and stagnant water.",
          "map": {
            "x": 5,
            "y": 8
          },
          "exits": {
            "s": "R176",
            "n": "R173"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R176": {
          "name": "The Seeping Passage",
          "description": "Water seeps from every crack in this passage, running down the walls and collecting on the floor. The stone is stained dark with mineral deposits.",
          "map": {
            "x": 5,
            "y": 9
          },
          "exits": {
            "s": "R177",
            "n": "R175"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R177": {
          "name": "The Ruined Hall",
          "description": "A wide hall where four passages converge. Fallen masonry rises above the waterline, creating an irregular landscape of stone and shadow.",
          "map": {
            "x": 5,
            "y": 10
          },
          "exits": {
            "e": "R178",
            "s": "R180",
            "w": "R200",
            "n": "R176"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_champion",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R178": {
          "name": "The Flooded Corridor",
          "description": "A corridor with water at the shins. The floor is intact here, the tiles still visible beneath the water. This section is less damaged than most.",
          "map": {
            "x": 6,
            "y": 10
          },
          "exits": {
            "e": "R179",
            "w": "R177"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R179": {
          "name": "The Dark Channel",
          "description": "A flooded channel running between two chambers, the water moving in a slow current. The walls are bare stone, slick with algae.",
          "map": {
            "x": 7,
            "y": 10
          },
          "exits": {
            "e": "R167",
            "w": "R178"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R180": {
          "name": "The Sunken Room",
          "description": "A square room with water at the ankles. The walls bear traces of plaster, suggesting this was once a decorated interior space.",
          "map": {
            "x": 5,
            "y": 11
          },
          "exits": {
            "n": "R177",
            "s": "R181"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R181": {
          "name": "The Flooded Junction",
          "description": "Three passages meet in a room with water at the knee. The walls are intact and the ceiling high. This was once a significant intersection.",
          "map": {
            "x": 5,
            "y": 12
          },
          "exits": {
            "n": "R180",
            "e": "R182",
            "w": "R190"
          },
          "contents": {
            "enemies": [
              {
                "key": "necromancer",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R182": {
          "name": "The Dark Corridor",
          "description": "A straight corridor running east, the water at the ankle. The walls are close and the ceiling low. The sound of dripping water is constant.",
          "map": {
            "x": 6,
            "y": 12
          },
          "exits": {
            "w": "R181",
            "e": "R183"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R183": {
          "name": "The Seeping Chamber",
          "description": "A chamber where water seeps in from all sides. The level is maintained at knee height by some crack in the floor. The walls are damp and cold.",
          "map": {
            "x": 7,
            "y": 12
          },
          "exits": {
            "w": "R182",
            "s": "R184"
          },
          "contents": {
            "enemies": [
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "phantom_mage",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R184": {
          "name": "The Flooded Passage",
          "description": "A passage running south, the water at the shins. The floor tilts slightly, channeling the water toward the next room.",
          "map": {
            "x": 7,
            "y": 13
          },
          "exits": {
            "n": "R183",
            "s": "R185"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R185": {
          "name": "The Ruined Threshold",
          "description": "A threshold where the doorway has partially collapsed. You step through the gap, the cold water swirling around your legs.",
          "map": {
            "x": 7,
            "y": 14
          },
          "exits": {
            "n": "R184",
            "w": "R186"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R186": {
          "name": "The Dark Alcove",
          "description": "A small alcove with water at the knee. The walls are bare and the ceiling low. Nothing remains here except the dark and the water.",
          "map": {
            "x": 6,
            "y": 14
          },
          "exits": {
            "e": "R185",
            "w": "R187"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R187": {
          "name": "The Flooded Passage",
          "description": "A narrow flooded passage heading west. The water is at the ankle here but the walls are so close you must turn sideways.",
          "map": {
            "x": 5,
            "y": 14
          },
          "exits": {
            "e": "R186",
            "s": "R188"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R188": {
          "name": "The Seeping Corridor",
          "description": "A corridor with water running steadily from north to south. You walk against the current, each step a small resistance.",
          "map": {
            "x": 5,
            "y": 15
          },
          "exits": {
            "n": "R187",
            "s": "R189"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R189": {
          "name": "The Ladder Chamber",
          "description": "A small chamber where a stone ladder descends through the floor into darkness below. The water around its base is disturbed, as though something passed through recently.",
          "map": {
            "x": 5,
            "y": 16
          },
          "exits": {
            "n": "R188"
          },
          "contents": {
            "ladder": {
              "direction": "down",
              "leadsTo": {
                "floor": 3,
                "room": "R263"
              }
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R190": {
          "name": "The Flooded Room",
          "description": "A small square room with water at the knee. The walls are smooth and featureless. The silence here is complete.",
          "map": {
            "x": 4,
            "y": 12
          },
          "exits": {
            "e": "R181",
            "w": "R191"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R191": {
          "name": "The Narrow Corridor",
          "description": "A narrow corridor with water at the ankle. The walls are close and the ceiling crumbles in places, dropping grit into the water.",
          "map": {
            "x": 3,
            "y": 12
          },
          "exits": {
            "e": "R190",
            "w": "R192"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R192": {
          "name": "The Submerged Hall",
          "description": "A hall with water at the waist. You move slowly, feeling the resistance of the water with every step. The silence is broken only by your own movement.",
          "map": {
            "x": 2,
            "y": 12
          },
          "exits": {
            "e": "R191",
            "w": "R193"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R193": {
          "name": "The Flooded Passage",
          "description": "A passage with water at the shins. The floor is even here, the tiles intact. You make better time than most of the ruins allow.",
          "map": {
            "x": 1,
            "y": 12
          },
          "exits": {
            "e": "R192",
            "w": "R194"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R194": {
          "name": "The Corner Room",
          "description": "A room where the passage turns north. The water is ankle deep. The walls bear faint geometric patterns, still partially visible.",
          "map": {
            "x": 0,
            "y": 12
          },
          "exits": {
            "e": "R193",
            "n": "R195"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R195": {
          "name": "The Dark Corridor",
          "description": "A corridor heading north, the water at the knee. The ceiling is low and the walls close. Your torchlight barely reaches the far end.",
          "map": {
            "x": 0,
            "y": 11
          },
          "exits": {
            "s": "R194",
            "n": "R196"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R196": {
          "name": "The Flooded Junction",
          "description": "A junction where the passage turns east. The water is knee high. A faint current pulls in that direction.",
          "map": {
            "x": 0,
            "y": 10
          },
          "exits": {
            "s": "R195",
            "e": "R197"
          },
          "contents": {
            "enemies": [
              {
                "key": "phantom_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R197": {
          "name": "The Submerged Passage",
          "description": "A passage with water at the ankle. The walls are intact. This section of the ruins has survived better than most.",
          "map": {
            "x": 1,
            "y": 10
          },
          "exits": {
            "w": "R196",
            "e": "R198"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R198": {
          "name": "The Three-Way Flood",
          "description": "Three passages meet in a flooded chamber. The water here is thigh deep. You feel the pressure of it against your legs as you choose a direction.",
          "map": {
            "x": 2,
            "y": 10
          },
          "exits": {
            "w": "R197",
            "e": "R199",
            "n": "R201"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_champion",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R199": {
          "name": "The Flooded Corridor",
          "description": "A corridor heading east, the water at the knee. Fallen stones break the floor into an uneven path.",
          "map": {
            "x": 3,
            "y": 10
          },
          "exits": {
            "w": "R198",
            "e": "R200"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R200": {
          "name": "The Dark Room",
          "description": "A small room where the water is hip deep. The ceiling drips. The walls are bare. There is nothing here except cold and dark and depth.",
          "map": {
            "x": 4,
            "y": 10
          },
          "exits": {
            "w": "R199",
            "e": "R177"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R201": {
          "name": "The Sunken Passage",
          "description": "A passage heading north where the water deepens briefly before the floor rises. You feel the cold rise to your waist and then recede.",
          "map": {
            "x": 2,
            "y": 9
          },
          "exits": {
            "s": "R198",
            "n": "R202"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R202": {
          "name": "The Flooded Room",
          "description": "A room with water at the knee where the passage turns west. The walls here are unusually intact, the carved stonework still sharp.",
          "map": {
            "x": 2,
            "y": 8
          },
          "exits": {
            "s": "R201",
            "w": "R203"
          },
          "contents": {
            "enemies": [
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
        "R203": {
          "name": "The Narrow Flood",
          "description": "A narrow passage with water at the ankle. The walls press close. The air here is fresher than elsewhere, a faint draft coming from the northwest.",
          "map": {
            "x": 1,
            "y": 8
          },
          "exits": {
            "e": "R202",
            "nw": "R204"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R204": {
          "name": "The Dark Alcove",
          "description": "An alcove opening to the northwest. The water is shallow here, barely covering the floor. The ceiling is high and the walls dry above the waterline.",
          "map": {
            "x": 0,
            "y": 7
          },
          "exits": {
            "se": "R203",
            "n": "R205"
          },
          "contents": {
            "enemies": [
              {
                "key": "necromancer",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R205": {
          "name": "The Flooded Gallery",
          "description": "A gallery with water at the ankle. Niches line the walls to the east, all empty. The stones beneath the water are smooth and regular.",
          "map": {
            "x": 0,
            "y": 6
          },
          "exits": {
            "s": "R204",
            "e": "R206"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R206": {
          "name": "The Sunken Corridor",
          "description": "A corridor heading east, the water rising to the knee. Old stonework lines the walls, cracked but intact. The passage continues toward the lower ruins.",
          "map": {
            "x": 1,
            "y": 6
          },
          "exits": {
            "w": "R205",
            "e": "R207"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R207": {
          "name": "The Blind End",
          "description": "The passage ends at a collapsed wall, rubble rising from the water in a jagged heap. Something large and dark moves in the water near the base of the debris.",
          "map": {
            "x": 2,
            "y": 6
          },
          "exits": {
            "w": "R206"
          },
          "contents": {
            "enemies": [
              {
                "key": "gargoyle",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "phantom_mage",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R208": {
          "name": "The Flooded Passage",
          "description": "A passage heading north, the water at the ankle. The walls are carved with geometric patterns worn almost smooth by the constant moisture.",
          "map": {
            "x": 5,
            "y": 6
          },
          "exits": {
            "s": "R173",
            "n": "R209"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R209": {
          "name": "The Junction Flood",
          "description": "A small junction where the passage turns west. The water is knee high. The ceiling drips steadily from a crack above.",
          "map": {
            "x": 5,
            "y": 5
          },
          "exits": {
            "s": "R208",
            "w": "R210"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R210": {
          "name": "The Flooded Room",
          "description": "A square room with water at the ankle. The walls are bare stone. The passage continues west through a low archway.",
          "map": {
            "x": 4,
            "y": 5
          },
          "exits": {
            "e": "R209",
            "w": "R211"
          },
          "contents": {
            "enemies": [
              {
                "key": "animated_armor",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R211": {
          "name": "The Ruined Crossing",
          "description": "Three passages meet in a flooded crossing. The water is knee high and dark. Rubble has fallen from the ceiling, breaking the floor into uneven terrain.",
          "map": {
            "x": 3,
            "y": 5
          },
          "exits": {
            "e": "R210",
            "w": "R212",
            "n": "R215"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R212": {
          "name": "The Narrow Flood",
          "description": "A narrow passage with water at the shin. The walls are close and the ceiling crumbles. You move carefully.",
          "map": {
            "x": 2,
            "y": 5
          },
          "exits": {
            "e": "R211",
            "w": "R213"
          },
          "contents": {
            "enemies": [
              {
                "key": "cave_worm",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R213": {
          "name": "The Flooded Corridor",
          "description": "A corridor heading west. The water is ankle deep here, running in a thin current toward the lower sections of the ruins.",
          "map": {
            "x": 1,
            "y": 5
          },
          "exits": {
            "e": "R212",
            "w": "R214"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R214": {
          "name": "The Corner Chamber",
          "description": "A chamber where the passage turns north. The water is at the knee. The walls bear the remnants of fresco work, completely unreadable now.",
          "map": {
            "x": 0,
            "y": 5
          },
          "exits": {
            "e": "R213",
            "n": "R224"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R215": {
          "name": "The Submerged Passage",
          "description": "A passage heading north. The water is at the ankle, thin and clear enough to see the tiled floor beneath.",
          "map": {
            "x": 3,
            "y": 4
          },
          "exits": {
            "n": "R216",
            "s": "R211"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R216": {
          "name": "The Flooded Corridor",
          "description": "A straight corridor heading north. The water deepens slightly as you walk. The walls are smooth and the ceiling intact.",
          "map": {
            "x": 3,
            "y": 3
          },
          "exits": {
            "n": "R217",
            "s": "R215"
          },
          "contents": {
            "enemies": [
              {
                "key": "phantom_mage",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R217": {
          "name": "The Dark Passage",
          "description": "A passage where the darkness presses close. The water is at the knee and the walls are bare. Your torch seems dimmer here.",
          "map": {
            "x": 3,
            "y": 2
          },
          "exits": {
            "n": "R218",
            "s": "R216"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R218": {
          "name": "The Ruined Junction",
          "description": "A three-way junction with water at the waist. Fallen masonry creates an uneven path. The western passage is narrower than the others.",
          "map": {
            "x": 3,
            "y": 1
          },
          "exits": {
            "w": "R219",
            "s": "R217",
            "e": "R226"
          },
          "contents": {
            "enemies": [
              {
                "key": "dark_champion",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R219": {
          "name": "The Flooded Passage",
          "description": "A passage heading west, the water at the shin. The floor is intact and the walls close. A faint current moves in the same direction you walk.",
          "map": {
            "x": 2,
            "y": 1
          },
          "exits": {
            "w": "R220",
            "e": "R218"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R220": {
          "name": "The Three-Way Room",
          "description": "A small room where three passages meet. The water is knee high and cold. The ceiling is low and the walls are close.",
          "map": {
            "x": 1,
            "y": 1
          },
          "exits": {
            "w": "R221",
            "n": "R225",
            "e": "R219"
          },
          "contents": {
            "enemies": [
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
        "R221": {
          "name": "The Dark Corner",
          "description": "The passage turns south here. The water is at the ankle, thin and cold. The walls are damp and the air still.",
          "map": {
            "x": 0,
            "y": 1
          },
          "exits": {
            "s": "R222",
            "e": "R220"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R222": {
          "name": "The Flooded Hall",
          "description": "A hall heading south with water at the knee. The ceiling is high here, vaulted stone arching above the waterline. A rare intact section of the ruins.",
          "map": {
            "x": 0,
            "y": 2
          },
          "exits": {
            "s": "R223",
            "n": "R221"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R223": {
          "name": "The Submerged Passage",
          "description": "A passage heading south where the water rises briefly to the chest before the floor climbs again. The cold is immediate and sharp.",
          "map": {
            "x": 0,
            "y": 3
          },
          "exits": {
            "s": "R224",
            "n": "R222"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R224": {
          "name": "The Flooded Chamber",
          "description": "A chamber connecting north and south passages. The water is at the knee. The walls bear carved borders, their subjects worn away.",
          "map": {
            "x": 0,
            "y": 4
          },
          "exits": {
            "s": "R214",
            "n": "R223"
          },
          "contents": {
            "enemies": [
              {
                "key": "chaos_knight",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R225": {
          "name": "The Black Water Room",
          "description": "A dead-end chamber where the water is thigh high and completely black. Nothing reflects back from its surface. Two shapes resolve from the darkness.",
          "map": {
            "x": 1,
            "y": 0
          },
          "exits": {
            "s": "R220"
          },
          "contents": {
            "enemies": [
              {
                "key": "black_knight",
                "drop": "staff_piece_3",
                "rarity": "rare"
              },
              {
                "key": "chaos_knight",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R226": {
          "name": "The Narrow Flood",
          "description": "A narrow passage heading east. The water is at the ankle and the walls are very close. The sound of movement echoes strangely here.",
          "map": {
            "x": 4,
            "y": 1
          },
          "exits": {
            "w": "R218",
            "e": "R227"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R227": {
          "name": "The Flooded Corridor",
          "description": "A corridor heading east. The water is at the shin and the floor is intact. The passage is straight and unobstructed.",
          "map": {
            "x": 5,
            "y": 1
          },
          "exits": {
            "w": "R226",
            "e": "R228"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R228": {
          "name": "The Submerged Hall",
          "description": "A hall with water at the knee. The ceiling is low and the walls close. You move steadily east through the dark water.",
          "map": {
            "x": 6,
            "y": 1
          },
          "exits": {
            "w": "R227",
            "e": "R229"
          },
          "contents": {
            "enemies": [
              {
                "key": "necromancer",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R229": {
          "name": "The Dark Passage",
          "description": "A passage heading east, the water at the ankle. The walls are bare and damp. The silence here is broken only by your footsteps.",
          "map": {
            "x": 7,
            "y": 1
          },
          "exits": {
            "w": "R228",
            "e": "R230"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R230": {
          "name": "The Flooded Room",
          "description": "A small room with water at the knee. The passage continues east through a low doorway, the lintel intact but cracked.",
          "map": {
            "x": 8,
            "y": 1
          },
          "exits": {
            "w": "R229",
            "e": "R231"
          },
          "contents": {
            "enemies": [
              {
                "key": "runic_guardian",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R231": {
          "name": "The Sunken Corridor",
          "description": "A corridor heading east. The floor dips and the water rises briefly to the waist before the ground climbs again.",
          "map": {
            "x": 9,
            "y": 1
          },
          "exits": {
            "w": "R230",
            "e": "R232"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R232": {
          "name": "The Flooded Gallery",
          "description": "A gallery with water at the ankle. The walls bear traces of carved reliefs, worn nearly smooth. The passage continues east.",
          "map": {
            "x": 10,
            "y": 1
          },
          "exits": {
            "w": "R231",
            "e": "R233"
          },
          "contents": {
            "enemies": [
              {
                "key": "demon_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R233": {
          "name": "The Deep Crossing",
          "description": "A wide flooded chamber where the passage connects east and west. The water is knee high and dark. Somewhere ahead, the ruins end and something else begins.",
          "map": {
            "x": 11,
            "y": 1
          },
          "exits": {
            "w": "R232",
            "e": "R152"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        }
      }
    },
    "3": {
      "startRoom": "R234",
      "rooms": {
        "R234": {
          "name": "The Ash Gate",
          "description": "You emerge into a tunnel of cooled black lava, the walls glassy and smooth. A thick layer of grey ash coats every surface. The air is hot and dry, carrying the bitter taste of old fire.",
          "map": {
            "x": 11,
            "y": 0
          },
          "exits": {
            "e": "R235",
            "sw": "R261"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R235": {
          "name": "The First Burning",
          "description": "A chamber where something once burned intensely. The walls are blackened and the floor cracked by ancient heat. The ash here is deeper than elsewhere.",
          "map": {
            "x": 12,
            "y": 0
          },
          "exits": {
            "e": "R236",
            "w": "R234"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "staff_piece_4",
                "rarity": "epic"
              },
              {
                "key": "magma_elemental",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R236": {
          "name": "The Lava Tube",
          "description": "A natural tube formed by ancient lava flow, its walls rippled and smooth. The obsidian floor reflects your torchlight in fractured shards of light.",
          "map": {
            "x": 13,
            "y": 0
          },
          "exits": {
            "se": "R237",
            "w": "R235"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R237": {
          "name": "The Ash Corridor",
          "description": "A corridor thick with ash that rises in clouds with each footfall. The walls here are scorched in patterns that suggest the fire moved fast when it came through.",
          "map": {
            "x": 14,
            "y": 1
          },
          "exits": {
            "e": "R238",
            "nw": "R236"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R238": {
          "name": "The Obsidian Pass",
          "description": "The passage narrows between walls of pure black obsidian. The edges are razor sharp. You move carefully, arms pressed to your sides.",
          "map": {
            "x": 15,
            "y": 1
          },
          "exits": {
            "se": "R239",
            "w": "R237"
          },
          "contents": {
            "enemies": [
              {
                "key": "void_sprite",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R239": {
          "name": "The Smoldering Crack",
          "description": "A crack runs the length of the ceiling here, still venting faint heat. The air above is visibly warped. The floor below the crack is blackened and hot to the touch.",
          "map": {
            "x": 16,
            "y": 2
          },
          "exits": {
            "se": "R240",
            "nw": "R238"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R240": {
          "name": "The Cinder Room",
          "description": "Fine cinders drift through the air of this chamber, settling constantly. Everything you touch leaves a dark smear. The heat is noticeable but survivable.",
          "map": {
            "x": 17,
            "y": 3
          },
          "exits": {
            "s": "R241",
            "nw": "R239"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R241": {
          "name": "The Cooled Flow",
          "description": "Ancient lava has frozen mid-flow, creating a rippled black floor that rises and falls in waves. Footing is treacherous.",
          "map": {
            "x": 17,
            "y": 4
          },
          "exits": {
            "s": "R242",
            "n": "R240"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "common"
              },
              {
                "key": "void_sprite",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R242": {
          "name": "The Hot Corridor",
          "description": "The air here is hot enough to dry your throat with each breath. The walls radiate warmth, and the ash on the floor is finer here, more recently disturbed.",
          "map": {
            "x": 17,
            "y": 5
          },
          "exits": {
            "s": "R243",
            "n": "R241"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R243": {
          "name": "The Vent Passage",
          "description": "Vents in the floor release jets of hot gas at irregular intervals. You time your movements between them, moving quickly when the air is briefly still.",
          "map": {
            "x": 17,
            "y": 6
          },
          "exits": {
            "s": "R244",
            "n": "R242"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R244": {
          "name": "The Black Descent",
          "description": "The passage descends steeply through black rock. The heat increases with each step down, and the light from below is not natural.",
          "map": {
            "x": 17,
            "y": 7
          },
          "exits": {
            "sw": "R245",
            "n": "R243"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R245": {
          "name": "The Slag Corridor",
          "description": "The floor here is covered in rough porous slag, cooled lava that crunches and shifts underfoot. Each step is uncertain.",
          "map": {
            "x": 16,
            "y": 8
          },
          "exits": {
            "sw": "R246",
            "ne": "R244"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R246": {
          "name": "The Ember Room",
          "description": "Small points of orange light glow in the walls here, embedded embers that never fully died. They cast the room in a faint hellish light.",
          "map": {
            "x": 15,
            "y": 9
          },
          "exits": {
            "w": "R247",
            "ne": "R245"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R247": {
          "name": "The Scorched Pass",
          "description": "A passage where the walls have been scorched in layers, each burn leaving a different shade of black. Something burned here repeatedly over a very long time.",
          "map": {
            "x": 14,
            "y": 9
          },
          "exits": {
            "sw": "R248",
            "e": "R246"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R248": {
          "name": "The Ash Drift",
          "description": "Ash has drifted deep in this chamber, rising to your knees in places. Moving through it is slow and exhausting. The air above it tastes of old smoke.",
          "map": {
            "x": 13,
            "y": 10
          },
          "exits": {
            "w": "R249",
            "ne": "R247"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R249": {
          "name": "The Ashworks Crossing",
          "description": "Four passages meet in a chamber where the ash is so thick it has formed dunes. The heat here is oppressive, radiating from every wall.",
          "map": {
            "x": 12,
            "y": 10
          },
          "exits": {
            "n": "R269",
            "s": "R270",
            "e": "R248",
            "w": "R250"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "void_sprite",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "elder_wraith",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R250": {
          "name": "The Lava Scar",
          "description": "An old lava channel cuts through this passage, now dry and black. The edges of the channel are razor sharp obsidian. You step across carefully.",
          "map": {
            "x": 11,
            "y": 10
          },
          "exits": {
            "nw": "R251",
            "e": "R249"
          },
          "contents": {
            "enemies": [
              {
                "key": "void_sprite",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R251": {
          "name": "The Cinder Pass",
          "description": "Cinders fall constantly from a crack above, accumulating on the floor in fine grey drifts. The air tastes of ash and dry heat.",
          "map": {
            "x": 10,
            "y": 9
          },
          "exits": {
            "w": "R252",
            "se": "R250"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R252": {
          "name": "The Black Corridor",
          "description": "A straight corridor of black rock. The walls are smooth lava tube, the floor thick with ash. The only sound is the faint hiss of heat.",
          "map": {
            "x": 9,
            "y": 9
          },
          "exits": {
            "nw": "R253",
            "e": "R251"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R253": {
          "name": "The Scorched Gallery",
          "description": "A gallery of ash and black stone. The niches in the walls have been melted shut by ancient heat, their contents sealed forever.",
          "map": {
            "x": 8,
            "y": 8
          },
          "exits": {
            "nw": "R254",
            "se": "R252"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "abyssal_hound",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R254": {
          "name": "The Ember Passage",
          "description": "Embers embedded in the walls cast a dim orange glow. The heat is palpable. The ash on the floor is warm beneath your feet.",
          "map": {
            "x": 7,
            "y": 7
          },
          "exits": {
            "n": "R255",
            "se": "R253"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R255": {
          "name": "The Ash Corridor",
          "description": "A corridor heading north through ash and heat. The walls radiate warmth and the air shimmers faintly. The smell of old fire is overwhelming.",
          "map": {
            "x": 7,
            "y": 6
          },
          "exits": {
            "n": "R256",
            "s": "R254"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R256": {
          "name": "The Hot Passage",
          "description": "The heat intensifies in this passage. The walls are warm to the touch and the air above the ash shimmer is warped with it. You breathe shallowly.",
          "map": {
            "x": 7,
            "y": 5
          },
          "exits": {
            "n": "R257",
            "s": "R255"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R257": {
          "name": "The Smoldering Hall",
          "description": "A hall where the walls still hold heat from a fire that burned out ages ago. The rock itself radiates warmth, and the ash here is pale grey, almost white.",
          "map": {
            "x": 7,
            "y": 4
          },
          "exits": {
            "n": "R258",
            "s": "R256"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R258": {
          "name": "The Lava Tube Descent",
          "description": "The lava tube descends steeply here. The walls are glassy smooth and the floor is a continuous ramp of cooled obsidian. Below you, something glows faint orange.",
          "map": {
            "x": 7,
            "y": 3
          },
          "exits": {
            "ne": "R259",
            "s": "R257"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R259": {
          "name": "The Black Climb",
          "description": "The passage climbs northeast through black rock. The ash here is thinner, blown clear by some ancient updraft. The walls are deeply scorched.",
          "map": {
            "x": 8,
            "y": 2
          },
          "exits": {
            "ne": "R260",
            "sw": "R258"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R260": {
          "name": "The Ash Gate Passage",
          "description": "A passage near the upper level of the ashworks. The heat is slightly less here, the ash thinner. The passage leads toward a different kind of darkness.",
          "map": {
            "x": 9,
            "y": 1
          },
          "exits": {
            "e": "R261",
            "sw": "R259"
          },
          "contents": {
            "enemies": [
              {
                "key": "void_sprite",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R261": {
          "name": "The Threshold of Fire",
          "description": "The final passage of the upper ashworks. Beyond this, the ruins connect to the world above. The passage leads northeast toward the surface.",
          "map": {
            "x": 10,
            "y": 1
          },
          "exits": {
            "ne": "R234",
            "w": "R260"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "revenant",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R262": {
          "name": "The Exit Shaft",
          "description": "A vertical shaft rising upward. Cool air falls from above, the first cool air you have felt in some time. The ladder here leads up and out.",
          "map": {
            "x": 12,
            "y": 2
          },
          "exits": {
            "s": "R263",
            "n": "R346"
          },
          "contents": {
            "runestone": "yellow_runestone"
          }
        },
        "R263": {
          "name": "The Ash Vault",
          "description": "A vaulted chamber of black stone, ash covering every surface. A ladder descends from here into the deeper ashworks below. A bone door blocks the passage north, sealed.",
          "map": {
            "x": 12,
            "y": 3
          },
          "exits": {
            "n": "R262",
            "s": "R264"
          },
          "contents": {
            "ladder": {
              "direction": "up",
              "leadsTo": {
                "floor": 2,
                "room": "R189"
              }
            },
            "doors": {
              "n": {
                "type": "bone",
                "locked": true
              }
            }
          }
        },
        "R264": {
          "name": "The Cinder Corridor",
          "description": "A corridor heading south through thick ash. The heat presses down from above. Every step raises a cloud of fine grey dust.",
          "map": {
            "x": 12,
            "y": 4
          },
          "exits": {
            "n": "R263",
            "s": "R265"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R265": {
          "name": "The Transfer Point",
          "description": "A chamber where the walls are marked with angular symbols burned into the stone. The air here shimmers with something that is not entirely heat.",
          "map": {
            "x": 12,
            "y": 5
          },
          "exits": {
            "n": "R264",
            "s": "R266"
          },
          "contents": {
            "staffTrigger": {
              "isDestination": true
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R266": {
          "name": "The Scorched Passage",
          "description": "A passage of scorched black rock. The floor is cracked by ancient heat, and ash fills every crack. The smell of sulfur is strong here.",
          "map": {
            "x": 12,
            "y": 6
          },
          "exits": {
            "n": "R265",
            "s": "R267"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R267": {
          "name": "The Warm Corridor",
          "description": "A corridor where the heat is moderate, warm rather than hot. The walls here are grey rather than black, the fire that shaped them less intense.",
          "map": {
            "x": 12,
            "y": 7
          },
          "exits": {
            "n": "R266",
            "s": "R268"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R268": {
          "name": "The Ash Drift Corridor",
          "description": "Ash has drifted into this corridor in deep banks. You wade through it, the fine grey powder rising to your knees and beyond.",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "n": "R267",
            "s": "R269"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R269": {
          "name": "The Upper Ashworks",
          "description": "A corridor connecting the upper and lower sections of the ashworks. The heat increases noticeably as you descend.",
          "map": {
            "x": 12,
            "y": 9
          },
          "exits": {
            "n": "R268",
            "s": "R249"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R270": {
          "name": "The Three Vents",
          "description": "Three passages meet at a point where vents in the floor release jets of superheated gas. The timing is irregular. Moving through requires nerve.",
          "map": {
            "x": 12,
            "y": 11
          },
          "exits": {
            "n": "R249",
            "sw": "R271",
            "se": "R272"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R271": {
          "name": "The West Vent Chamber",
          "description": "A dead-end chamber thick with heat and ash. A large vent in the floor pulses with slow rhythmic pressure. The walls here are the hottest you have encountered.",
          "map": {
            "x": 11,
            "y": 12
          },
          "exits": {
            "ne": "R270"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R273",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R272": {
          "name": "The East Vent Chamber",
          "description": "A dead-end chamber where the air shimmers constantly with heat. The ash on the floor has been baked into a thin crust by the vent below.",
          "map": {
            "x": 13,
            "y": 12
          },
          "exits": {
            "nw": "R270"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R265",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R273": {
          "name": "The Transfer Chamber",
          "description": "A chamber that serves as a transit point through the ashworks, marked by the same angular symbols as others like it.",
          "map": {
            "x": 8,
            "y": 12
          },
          "exits": {
            "s": "R274"
          },
          "contents": {
            "staffTrigger": {
              "isDestination": true
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R274": {
          "name": "The Cinder Passage",
          "description": "A passage heading south through the deep ashworks. Cinders drift through the air, settling on your shoulders as you move.",
          "map": {
            "x": 8,
            "y": 13
          },
          "exits": {
            "n": "R273",
            "s": "R275"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R275": {
          "name": "The Ash Junction",
          "description": "Three passages meet in a wide chamber. The ash here is deep enough to swallow your boots. The heat radiates from all directions.",
          "map": {
            "x": 8,
            "y": 14
          },
          "exits": {
            "n": "R274",
            "w": "R276",
            "s": "R278"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R276": {
          "name": "The Black Corridor",
          "description": "A corridor of pure black lava rock, the walls glassy and smooth. The heat is intense. Your shadow flickers strangely on the obsidian walls.",
          "map": {
            "x": 7,
            "y": 14
          },
          "exits": {
            "e": "R275",
            "w": "R277"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R277": {
          "name": "The Dragon Den",
          "description": "A dead-end chamber where the walls are scorched far beyond what a normal fire could produce. Two shadow dragons coil in the darkness, ancient and aware.",
          "map": {
            "x": 6,
            "y": 14
          },
          "exits": {
            "e": "R276"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "shadow_dragon",
                "drop": "staff_piece_7",
                "rarity": "rare"
              },
              {
                "key": "void_sprite",
                "drop": "health_potion",
                "rarity": "uncommon"
              },
              {
                "key": "void_sprite",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R278": {
          "name": "The Ash Passage",
          "description": "A passage heading south through heavy ash. The air here is difficult to breathe, too much particulate, too much heat. You cover your mouth and move quickly.",
          "map": {
            "x": 8,
            "y": 15
          },
          "exits": {
            "n": "R275",
            "s": "R279"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R279": {
          "name": "The Ember Floor",
          "description": "Embers embedded in the floor itself glow faintly, warming the soles of your feet through your boots. The light they cast is dim and orange.",
          "map": {
            "x": 8,
            "y": 16
          },
          "exits": {
            "n": "R278",
            "e": "R280"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R280": {
          "name": "The Scorched Hall",
          "description": "A hall of scorched black rock heading east. The ash has drifted in waves here, sculpted by some ancient airflow into irregular shapes.",
          "map": {
            "x": 9,
            "y": 16
          },
          "exits": {
            "w": "R279",
            "e": "R281"
          },
          "contents": {
            "enemies": [
              {
                "key": "void_sprite",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R281": {
          "name": "The Hot Corridor",
          "description": "A corridor where the heat is at its most intense. The air warps visibly. Each breath feels like inhaling the memory of fire.",
          "map": {
            "x": 10,
            "y": 16
          },
          "exits": {
            "w": "R280",
            "e": "R282"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R282": {
          "name": "The Ash Gallery",
          "description": "A long gallery thick with ash and heat. The walls are smooth lava tube on both sides. The floor is a continuous drift of grey powder.",
          "map": {
            "x": 11,
            "y": 16
          },
          "exits": {
            "w": "R281",
            "s": "R283"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R283": {
          "name": "The Transit Point",
          "description": "A chamber marked with the same burned symbols as the other transit points. The air shimmers here with something beyond mere heat.",
          "map": {
            "x": 11,
            "y": 17
          },
          "exits": {
            "n": "R282"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R300",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R284": {
          "name": "The Sealed Chamber",
          "description": "A dead-end chamber where something arrived from elsewhere and left its mark on the walls, scorch patterns radiating outward from a central point.",
          "map": {
            "x": 16,
            "y": 12
          },
          "exits": {
            "s": "R285"
          },
          "contents": {
            "staffTrigger": {
              "isDestination": true
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R285": {
          "name": "The Cinder Corridor",
          "description": "A corridor heading south. Cinders and ash fall from a crack above. The passage is hot and dark, the ember light barely enough to navigate.",
          "map": {
            "x": 16,
            "y": 13
          },
          "exits": {
            "n": "R284",
            "s": "R286"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R286": {
          "name": "The Deep Junction",
          "description": "Three passages meet in the deep ashworks. The heat here is the most intense of the entire level, pressing against you from every direction.",
          "map": {
            "x": 16,
            "y": 14
          },
          "exits": {
            "n": "R285",
            "e": "R287",
            "s": "R289"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R287": {
          "name": "The Dragon Corridor",
          "description": "A wide corridor heading east. The walls bear long scorch marks at shoulder height, the passage width of something very large that moves through here regularly.",
          "map": {
            "x": 17,
            "y": 14
          },
          "exits": {
            "w": "R286",
            "e": "R288"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R288": {
          "name": "The Twin Dragons",
          "description": "A dead-end chamber scorched beyond recognition. Two shadow dragons rest here in the heat, their scales black as the obsidian walls. This was their home long before you arrived.",
          "map": {
            "x": 18,
            "y": 14
          },
          "exits": {
            "w": "R287"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "shadow_dragon",
                "drop": "staff_piece_6",
                "rarity": "rare"
              },
              {
                "key": "abyssal_hound",
                "drop": "health_potion",
                "rarity": "uncommon"
              },
              {
                "key": "abyssal_hound",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R289": {
          "name": "The Ash Descent",
          "description": "The passage descends through thick ash. The heat is still intense but the air is slightly clearer. The worst of the ashworks is above you now.",
          "map": {
            "x": 16,
            "y": 15
          },
          "exits": {
            "n": "R286",
            "s": "R290"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R290": {
          "name": "The Lower Ashworks",
          "description": "A corridor in the lower section of the ashworks. The heat is more manageable here, the ash thinner on the floor.",
          "map": {
            "x": 16,
            "y": 16
          },
          "exits": {
            "n": "R289",
            "w": "R291"
          },
          "contents": {
            "enemies": [
              {
                "key": "magma_elemental",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "doom_cultist",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R291": {
          "name": "The Cooled Lava Room",
          "description": "A room where ancient lava has cooled into a frozen landscape of black ripples. The floor is wildly uneven but navigable.",
          "map": {
            "x": 15,
            "y": 16
          },
          "exits": {
            "e": "R290",
            "w": "R292"
          },
          "contents": {
            "enemies": [
              {
                "key": "void_sprite",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R292": {
          "name": "The Scorched Passage",
          "description": "A passage heading west. The walls are scorched in layers, the oldest burns visible beneath the newer ones. This passage has burned many times.",
          "map": {
            "x": 14,
            "y": 16
          },
          "exits": {
            "e": "R291",
            "w": "R293"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R293": {
          "name": "The Ash Corridor",
          "description": "A corridor heading west, then south. The ash here is fine and pale, almost white, the oldest ash in the ashworks, undisturbed for centuries.",
          "map": {
            "x": 13,
            "y": 16
          },
          "exits": {
            "e": "R292",
            "s": "R294"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R294": {
          "name": "The Transit End",
          "description": "A dead-end chamber that serves as a one-way transit point. The burned symbols here glow faintly with residual energy.",
          "map": {
            "x": 13,
            "y": 17
          },
          "exits": {
            "n": "R293"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R265",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R295": {
          "name": "The Lower Crossing",
          "description": "A wide crossing in the lower ashworks. The heat is manageable here and the ash only ankle deep. The fire that shaped this section was less severe.",
          "map": {
            "x": 13,
            "y": 19
          },
          "exits": {
            "e": "R300",
            "w": "R296"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R296": {
          "name": "The Grey Corridor",
          "description": "A corridor where the ash has settled in a uniform grey layer. The walls here are grey rather than black, the stone untouched by the worst of the fire.",
          "map": {
            "x": 12,
            "y": 19
          },
          "exits": {
            "w": "R297",
            "e": "R295"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R297": {
          "name": "The Ash Passage",
          "description": "A passage heading west through fine grey ash. The air is breathable here and the heat bearable. The worst is behind you.",
          "map": {
            "x": 11,
            "y": 19
          },
          "exits": {
            "w": "R298",
            "e": "R296"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R298": {
          "name": "The Pale Room",
          "description": "A room where the ash is pale and fine, the stone light grey. The fire here was old and brief. The room feels almost peaceful compared to the ashworks above.",
          "map": {
            "x": 10,
            "y": 19
          },
          "exits": {
            "w": "R299",
            "e": "R297"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R299": {
          "name": "The Edge of Fire",
          "description": "The lava tube curves southwest here. Beyond the curve, the ashworks transition into something different, older, darker, and stranger.",
          "map": {
            "x": 9,
            "y": 19
          },
          "exits": {
            "sw": "R316",
            "e": "R298"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R300": {
          "name": "The Transfer Nexus",
          "description": "A chamber where multiple transit paths converge, the walls dense with burned symbols. The air shimmers with something other than heat.",
          "map": {
            "x": 14,
            "y": 19
          },
          "exits": {
            "w": "R295",
            "e": "R301"
          },
          "contents": {
            "staffTrigger": {
              "isDestination": true
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R301": {
          "name": "The Pale Corridor",
          "description": "A corridor of pale grey stone heading east. The ash here is thin, the heat low. The worst of the ashworks is behind you.",
          "map": {
            "x": 15,
            "y": 19
          },
          "exits": {
            "w": "R300",
            "e": "R302"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R302": {
          "name": "The Grey Passage",
          "description": "A passage heading east. The walls are cool grey stone, barely touched by the ancient fire. The ash underfoot is thin and pale.",
          "map": {
            "x": 16,
            "y": 19
          },
          "exits": {
            "w": "R301",
            "e": "R303"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R303": {
          "name": "The Fading Heat",
          "description": "A corridor where the heat fades noticeably with each step east. The ash thins. The air cools. The ashworks are ending.",
          "map": {
            "x": 17,
            "y": 19
          },
          "exits": {
            "w": "R302",
            "e": "R304"
          },
          "contents": {
            "enemies": [
              {
                "key": "void_sprite",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R304": {
          "name": "The Eastern Edge",
          "description": "The eastern edge of the ashworks. The passage curves southeast. Beyond, the dungeon takes on a different character entirely.",
          "map": {
            "x": 18,
            "y": 19
          },
          "exits": {
            "w": "R303",
            "se": "R305"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R305": {
          "name": "The Outer Ring",
          "description": "The outer ring of the deep ashworks. The heat here is low and the ash sparse. The passage winds southwest through cooling stone.",
          "map": {
            "x": 19,
            "y": 20
          },
          "exits": {
            "nw": "R304",
            "sw": "R306"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R306": {
          "name": "The Ash Trail",
          "description": "A trail of fine ash marks the passage heading southwest. Something large has been moving through here, its passage disturbing the settled powder.",
          "map": {
            "x": 18,
            "y": 21
          },
          "exits": {
            "ne": "R305",
            "sw": "R307"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "elder_wraith",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R307": {
          "name": "The Winding Descent",
          "description": "The passage winds through older cooler rock. The lava tube walls have given way to rougher stone. The ash is behind you now.",
          "map": {
            "x": 17,
            "y": 22
          },
          "exits": {
            "ne": "R306",
            "w": "R308"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R308": {
          "name": "The Dark Curve",
          "description": "The passage curves northwest through dark stone. The ember light of the ashworks is gone. Natural darkness returns, and with it, a different kind of threat.",
          "map": {
            "x": 16,
            "y": 22
          },
          "exits": {
            "e": "R307",
            "nw": "R309"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R309": {
          "name": "The Dragon Curve",
          "description": "The passage curves through black rock. A shadow dragon waits at the bend, its eyes reflecting what little light remains.",
          "map": {
            "x": 15,
            "y": 21
          },
          "exits": {
            "se": "R308",
            "nw": "R310"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "staff_piece_5",
                "rarity": "epic"
              },
              {
                "key": "magma_elemental",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R310": {
          "name": "The Outer Transit",
          "description": "A chamber on the outer edge of the ashworks system, marked with the familiar burned symbols. The air here is cool enough to breathe easily.",
          "map": {
            "x": 14,
            "y": 20
          },
          "exits": {
            "se": "R309",
            "sw": "R311"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R265",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R311": {
          "name": "The Dragon Bend",
          "description": "The passage bends northeast through dark stone. A shadow dragon has made its territory here, at the junction of heat and darkness.",
          "map": {
            "x": 13,
            "y": 21
          },
          "exits": {
            "ne": "R310",
            "w": "R312"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "staff_piece_5",
                "rarity": "epic"
              },
              {
                "key": "doom_cultist",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R312": {
          "name": "The Dark Passage",
          "description": "A passage heading east through stone that bears no trace of fire. The temperature has dropped significantly. You are beyond the ashworks now.",
          "map": {
            "x": 12,
            "y": 21
          },
          "exits": {
            "e": "R311",
            "sw": "R313"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R313": {
          "name": "The Stone Corridor",
          "description": "A corridor of raw stone heading northeast. The ash is completely gone. The passage is cool and dark and quiet.",
          "map": {
            "x": 11,
            "y": 22
          },
          "exits": {
            "ne": "R312",
            "w": "R314"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R314": {
          "name": "The Deep Curve",
          "description": "The passage curves northwest through dark stone. The ashworks are far behind. Ahead, the dungeon continues into its deepest sections.",
          "map": {
            "x": 10,
            "y": 22
          },
          "exits": {
            "e": "R313",
            "nw": "R315"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R315": {
          "name": "The Outer Dark",
          "description": "A passage on the outer edge of the deep level. The stone here is old and cold. The fire never reached this far.",
          "map": {
            "x": 9,
            "y": 21
          },
          "exits": {
            "se": "R314",
            "nw": "R316"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R316": {
          "name": "The Junction",
          "description": "Three passages meet in a cold stone chamber. The heat of the ashworks is a distant memory. The silence here is complete.",
          "map": {
            "x": 8,
            "y": 20
          },
          "exits": {
            "se": "R315",
            "ne": "R299",
            "s": "R317"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "doom_cultist",
                "drop": "health_potion",
                "rarity": "common"
              },
              {
                "key": "abyssal_hound",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R317": {
          "name": "The Descent",
          "description": "The passage descends south through cold dark stone. The air is still and heavy. Whatever waits below has been waiting a long time.",
          "map": {
            "x": 8,
            "y": 21
          },
          "exits": {
            "n": "R316",
            "sw": "R318"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R318": {
          "name": "The Deep Curve",
          "description": "A curved passage through old stone, heading southwest. The walls are damp here, a contrast after the bone-dry heat of the ashworks.",
          "map": {
            "x": 7,
            "y": 22
          },
          "exits": {
            "ne": "R317",
            "nw": "R319"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "doom_cultist",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R319": {
          "name": "The Cold Passage",
          "description": "A cold passage heading west through dark stone. The damp returns. The smell of old earth replaces the ash and sulfur.",
          "map": {
            "x": 6,
            "y": 21
          },
          "exits": {
            "se": "R318",
            "w": "R320"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R320": {
          "name": "The Dark Corridor",
          "description": "A corridor heading west through the deepest section of the level. The darkness here is profound. Your torch seems to push against something.",
          "map": {
            "x": 5,
            "y": 21
          },
          "exits": {
            "e": "R319",
            "nw": "R321"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R321": {
          "name": "The Old Stone",
          "description": "A passage through very old stone, the walls worn smooth by forces far older than the fire above. The passage winds northwest.",
          "map": {
            "x": 4,
            "y": 20
          },
          "exits": {
            "se": "R320",
            "nw": "R322"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R322": {
          "name": "The Deep Way",
          "description": "A passage heading northwest through stone so old it has taken on a grey-green color. Water seeps through tiny cracks in the walls.",
          "map": {
            "x": 3,
            "y": 19
          },
          "exits": {
            "se": "R321",
            "w": "R323"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R323": {
          "name": "The Western Descent",
          "description": "The passage descends west through dark cold stone. The silence is absolute. The weight of the mountain above is palpable.",
          "map": {
            "x": 2,
            "y": 19
          },
          "exits": {
            "e": "R322",
            "n": "R324"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R324": {
          "name": "The Cold Corridor",
          "description": "A cold corridor heading north through old stone. The walls are damp and the air heavy. Whatever fire touched the levels above never reached here.",
          "map": {
            "x": 2,
            "y": 18
          },
          "exits": {
            "s": "R323",
            "n": "R325"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R325": {
          "name": "The Deep Passage",
          "description": "A passage heading north through the deepest stone of the dungeon. The cold is noticeable now, a welcome change after the ashworks.",
          "map": {
            "x": 2,
            "y": 17
          },
          "exits": {
            "s": "R324",
            "n": "R326"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R326": {
          "name": "The Ancient Corridor",
          "description": "A corridor of ancient stone, the walls bearing faint marks that might be natural or might be very old writing. The passage continues north.",
          "map": {
            "x": 2,
            "y": 16
          },
          "exits": {
            "s": "R325",
            "n": "R327"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R327": {
          "name": "The Dark Way",
          "description": "A passage heading north through cold dark stone. The air is still and the silence is the deepest you have encountered in the dungeon.",
          "map": {
            "x": 2,
            "y": 15
          },
          "exits": {
            "s": "R326",
            "n": "R328"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R328": {
          "name": "The Deep Junction",
          "description": "Three passages meet in a cold stone chamber. The walls are damp and the ceiling low. The dungeon's deepest level begins to reveal its true nature here.",
          "map": {
            "x": 2,
            "y": 14
          },
          "exits": {
            "s": "R327",
            "nw": "R329",
            "ne": "R337"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R329": {
          "name": "The Bone Passage",
          "description": "Old bones lie scattered on the floor, previous explorers who made it this far but no further. Their presence is a warning. You step over them carefully.",
          "map": {
            "x": 1,
            "y": 13
          },
          "exits": {
            "se": "R328",
            "nw": "R330"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R330": {
          "name": "The Cold Hall",
          "description": "A cold hall heading south through dark stone. The bones here are older than those in the passage behind you. Much older.",
          "map": {
            "x": 0,
            "y": 12
          },
          "exits": {
            "se": "R329",
            "n": "R331"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "abyssal_hound",
                "drop": "health_potion",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R331": {
          "name": "The Deep South",
          "description": "The passage curves south and then northeast through the cold deep stone. The air here has a faint metallic taste.",
          "map": {
            "x": 0,
            "y": 11
          },
          "exits": {
            "s": "R330",
            "ne": "R332"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R332": {
          "name": "The Dark Corridor",
          "description": "A corridor heading east through cold stone. The walls are close and the ceiling low. The passage is old and untouched by the fire above.",
          "map": {
            "x": 1,
            "y": 10
          },
          "exits": {
            "sw": "R331",
            "e": "R333"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R333": {
          "name": "The Three Ways",
          "description": "Three passages meet in a cold chamber. The walls are bare dark stone. The ceiling is low. North leads somewhere different.",
          "map": {
            "x": 2,
            "y": 10
          },
          "exits": {
            "w": "R332",
            "e": "R334",
            "n": "R338"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R334": {
          "name": "The Eastern Pass",
          "description": "A passage heading east and then southeast through the deep cold stone. The silence is so complete you can hear your own heartbeat.",
          "map": {
            "x": 3,
            "y": 10
          },
          "exits": {
            "w": "R333",
            "se": "R335"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R335": {
          "name": "The Trap Chamber",
          "description": "The floor here is slick with something dark and corrosive. The acid has eaten channels into the stone. A shadow dragon waits at the far end.",
          "map": {
            "x": 4,
            "y": 11
          },
          "exits": {
            "nw": "R334",
            "s": "R336"
          },
          "contents": {
            "traps": [
              {
                "type": "acid",
                "damage": 10,
                "duration": 5,
                "resetOnLeave": true,
                "triggered": false
              }
            ],
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "",
                "rarity": "epic"
              },
              {
                "key": "elder_wraith",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R336": {
          "name": "The Poison Room",
          "description": "The air in this room carries a faint green haze, old crystallized poison seeping from the walls. The floor is stained dark.",
          "map": {
            "x": 4,
            "y": 12
          },
          "exits": {
            "n": "R335",
            "sw": "R337"
          },
          "contents": {
            "traps": [
              {
                "type": "poison",
                "damage": 20,
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
        "R337": {
          "name": "The Dark Passage",
          "description": "A passage heading through cold dark stone. The trap chambers are behind you. The passage leads toward the final sections of the dungeon.",
          "map": {
            "x": 3,
            "y": 13
          },
          "exits": {
            "ne": "R336",
            "sw": "R328"
          },
          "contents": {
            "enemies": [
              {
                "key": "abyssal_hound",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R338": {
          "name": "The Deep Corridor",
          "description": "A corridor heading north through the deepest stone. The cold is profound. Every sound you make echoes and then dies completely.",
          "map": {
            "x": 2,
            "y": 9
          },
          "exits": {
            "s": "R333",
            "n": "R339"
          },
          "contents": {
            "enemies": [
              {
                "key": "doom_cultist",
                "drop": "",
                "rarity": "uncommon"
              },
              {
                "key": "revenant",
                "drop": "health_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R339": {
          "name": "The Ancient Way",
          "description": "A passage heading north through stone that feels impossibly old. The walls have a faint luminescence that your torch makes harder, not easier, to see.",
          "map": {
            "x": 2,
            "y": 8
          },
          "exits": {
            "s": "R338",
            "n": "R340"
          },
          "contents": {
            "enemies": [
              {
                "key": "elder_wraith",
                "drop": "",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R340": {
          "name": "The Final Junction",
          "description": "Three passages branch from this cold stone chamber. The dungeon's end is close. You can feel it in the quality of the silence.",
          "map": {
            "x": 2,
            "y": 7
          },
          "exits": {
            "s": "R339",
            "nw": "R341",
            "ne": "R343"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R341": {
          "name": "The Northwest Passage",
          "description": "A passage heading northwest through cold dark stone. The walls are close. The silence is absolute.",
          "map": {
            "x": 1,
            "y": 6
          },
          "exits": {
            "se": "R340",
            "n": "R342"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R342": {
          "name": "The Dragon Lair",
          "description": "A dead-end chamber in the deep dark of the dungeon's final level. Two shadow dragons coil in the darkness, ancient and terrible. The floor is scarred by their presence.",
          "map": {
            "x": 1,
            "y": 5
          },
          "exits": {
            "s": "R341"
          },
          "contents": {
            "enemies": [
              {
                "key": "shadow_dragon",
                "drop": "",
                "rarity": "rare"
              },
              {
                "key": "shadow_dragon",
                "drop": "staff_piece_8",
                "rarity": "rare"
              },
              {
                "key": "revenant",
                "drop": "health_potion",
                "rarity": "uncommon"
              },
              {
                "key": "revenant",
                "drop": "mana_potion",
                "rarity": "uncommon"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R343": {
          "name": "The Eastern Branch",
          "description": "A passage heading east through the final section of the dungeon. The stone here is the oldest you have encountered. The walls seem to lean inward.",
          "map": {
            "x": 3,
            "y": 6
          },
          "exits": {
            "sw": "R340",
            "e": "R344"
          },
          "contents": {
            "enemies": [
              {
                "key": "revenant",
                "drop": "",
                "rarity": "common"
              }
            ]
          },
          "flags": {
            "discovered": false
          }
        },
        "R344": {
          "name": "The Dark Corridor",
          "description": "A corridor heading north through cold stone. Each step forward feels like a step into something that has been waiting for you specifically.",
          "map": {
            "x": 4,
            "y": 6
          },
          "exits": {
            "w": "R343",
            "n": "R345"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R345": {
          "name": "The Staff Gate",
          "description": "A chamber where the walls are inscribed with eight symbols in a circle. A current of air moves through the room without source. This is where the staff is made whole.",
          "map": {
            "x": 4,
            "y": 5
          },
          "exits": {
            "s": "R344"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "staff_pieces",
              "targetFloor": 3,
              "targetRoom": "R347",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R346": {
          "name": "The Surface Shaft",
          "description": "A shaft leading upward toward the surface world. Cool fresh air falls from above. The exit from the dungeon, if you have what you need to pass.",
          "map": {
            "x": 12,
            "y": 1
          },
          "exits": {
            "s": "R262"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R353",
              "flashColor": "white"
            }
          }
        },
        "R347": {
          "name": "The Far Chamber",
          "description": "A chamber at the far end of the dungeon, reached by the staff trigger. The walls glow faintly with the same symbols as the staff gate.",
          "map": {
            "x": 0,
            "y": 0
          },
          "exits": {
            "e": "R348"
          },
          "contents": {
            "staffTrigger": {
              "isDestination": true
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R348": {
          "name": "The Passage Beyond",
          "description": "A corridor heading east through cold stone. The dungeon's end is very close now. Every step forward is one you cannot easily take back.",
          "map": {
            "x": 1,
            "y": 0
          },
          "exits": {
            "w": "R347",
            "e": "R349"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R349": {
          "name": "The Bone Door",
          "description": "A locked door of bone bars the passage east. A loot cache rests against the west wall. Whoever placed the door left something useful behind for those who made it this far.",
          "map": {
            "x": 2,
            "y": 0
          },
          "exits": {
            "w": "R348",
            "e": "R350"
          },
          "contents": {
            "doors": {
              "e": {
                "type": "bone",
                "locked": true
              }
            },
            "enemies": [
              {
                "key": "doom_knight",
                "drop": "bone_key",
                "rarity": "epic"
              }
            ]
          }
        },
        "R350": {
          "name": "The Final Point",
          "description": "A dead-end chamber at the absolute end of the dungeon. A transit point shimmers on the wall. Whatever it sends you to, there is no going back through it.",
          "map": {
            "x": 3,
            "y": 0
          },
          "exits": {
            "w": "R349"
          },
          "contents": {
            "staffTrigger": {
              "enabled": true,
              "triggerType": "enter_room",
              "targetFloor": 3,
              "targetRoom": "R263",
              "flashColor": "white"
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R352": {
          "name": "The long road",
          "description": "You are teleported into a forest with only one path leading north.",
          "map": {
            "x": 22,
            "y": 7
          },
          "exits": {
            "n": "R353"
          },
          "contents": {}
        },
        "R353": {
          "name": "The long road",
          "description": "The forest path looks like it goes on for miles with no end in sight.",
          "map": {
            "x": 22,
            "y": 6
          },
          "exits": {
            "s": "R352",
            "n": "R354"
          },
          "contents": {
            "staffTrigger": {
              "isDestination": true
            }
          }
        },
        "R354": {
          "name": "The long road",
          "description": "As you travel through the forest, the path seems less travelled.  You notice a part of a skeleton in the trees.  You decide to stay on the path.",
          "map": {
            "x": 22,
            "y": 5
          },
          "exits": {
            "s": "R353",
            "n": "R355"
          },
          "contents": {}
        },
        "R355": {
          "name": "The long road",
          "description": "The forest is so thick here, you cannot see the sky!  There has to be an end to it some day!",
          "map": {
            "x": 22,
            "y": 4
          },
          "exits": {
            "s": "R354",
            "n": "R356"
          },
          "contents": {}
        },
        "R356": {
          "name": "The long road",
          "description": "You have been traveling for miles in this dense forest with no end in sight.  You've been told this is the way to the mythical city of Crossroads.  You can press on to the North or retreat to the south.",
          "map": {
            "x": 22,
            "y": 3
          },
          "exits": {
            "s": "R355",
            "n": "R357"
          },
          "contents": {}
        },
        "R357": {
          "name": "The long road",
          "description": "You have been traveling this long road for more miles than you can remember.  There must be an end coming soon!",
          "map": {
            "x": 22,
            "y": 2
          },
          "exits": {
            "s": "R356",
            "n": "R358"
          },
          "contents": {}
        },
        "R358": {
          "name": "The long road's clearing.",
          "description": "You come across a clearing from the woods!  You see a large castle with the gates open in the distance!",
          "map": {
            "x": 22,
            "y": 1
          },
          "exits": {
            "s": "R357",
            "n": "R359"
          },
          "contents": {}
        },
        "R359": {
          "name": "The long road's end!",
          "description": "You arrived at the entrance of the town of Crossroads!  ",
          "map": {
            "x": 22,
            "y": 0
          },
          "exits": {
            "s": "R358"
          },
          "contents": {},
          "flags": {
            "discovered": false,
            "townExit": "town3"
          }
        }
      }
    }
  }
};