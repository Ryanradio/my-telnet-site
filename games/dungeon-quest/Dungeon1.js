window.DUNGEONS = window.DUNGEONS || {};
window.DUNGEONS.Dungeon1 = {
  "name": "Dungeon1",
  "description": "Dungeon1",
  "floors": {
    "1": {
      "startRoom": "R1",
      "rooms": {
        "R1": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 14,
            "y": 9
          },
          "exits": {
            "w": "R3",
            "se": "R5"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R5": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 16,
            "y": 11
          },
          "exits": {
            "nw": "R5"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R8": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 10,
            "y": 7
          },
          "exits": {
            "e": "R8",
            "w": "R10"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R10": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 8,
            "y": 8
          },
          "exits": {
            "ne": "R10",
            "s": "R12"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R12": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 10,
            "y": 12
          },
          "exits": {
            "nw": "R14",
            "se": "R16"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R16": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
            }
          },
          "flags": {
            "discovered": false
          }
        },
        "R18": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 9,
            "y": 16
          },
          "exits": {
            "ne": "R18",
            "s": "R27",
            "w": "R20"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R20": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 7,
            "y": 15
          },
          "exits": {
            "se": "R20",
            "nw": "R22"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R22": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 5,
            "y": 14
          },
          "exits": {
            "e": "R22",
            "sw": "R24",
            "n": "R25"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R24": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 6,
            "y": 12
          },
          "exits": {
            "sw": "R25"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R27": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 8,
            "y": 18
          },
          "exits": {
            "ne": "R27"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R29": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 12,
            "y": 17
          },
          "exits": {
            "n": "R30",
            "sw": "R32",
            "se": "R33"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R32": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 14,
            "y": 19
          },
          "exits": {
            "nw": "R33"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R35": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 13,
            "y": 15
          },
          "exits": {
            "nw": "R35",
            "e": "R37"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R37": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 16
          },
          "exits": {
            "nw": "R37"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R39": {
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 14
          },
          "exits": {
            "sw": "R37",
            "ne": "R40"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R40": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 18,
            "y": 16
          },
          "exits": {
            "nw": "R42"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R44": {
          "name": "",
          "description": "",
          "map": {
            "x": 18,
            "y": 13
          },
          "exits": {
            "sw": "R41",
            "ne": "R45"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R45": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 20,
            "y": 14
          },
          "exits": {
            "n": "R46"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R48": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 7
          },
          "exits": {
            "nw": "R49",
            "e": "R51"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R51": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 18,
            "y": 7
          },
          "exits": {
            "sw": "R52",
            "n": "R54"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R54": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 19,
            "y": 4
          },
          "exits": {
            "s": "R55",
            "ne": "R57"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R57": {
          "name": "Down2floor2",
          "description": "Down to Floor 2",
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
      "startRoom": "R58",
      "rooms": {
        "R58": {
          "name": "UP2floor1",
          "description": "Up to floor 1",
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
          "name": "",
          "description": "",
          "map": {
            "x": 21,
            "y": 6
          },
          "exits": {
            "n": "R58",
            "sw": "R2"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R2": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 19,
            "y": 8
          },
          "exits": {
            "ne": "R2",
            "sw": "R4"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R4": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 8
          },
          "exits": {
            "se": "R4",
            "nw": "R6"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R6": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 5
          },
          "exits": {
            "sw": "R7",
            "ne": "R9"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R9": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 18,
            "y": 3
          },
          "exits": {
            "s": "R9",
            "nw": "R11"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R11": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 4
          },
          "exits": {
            "ne": "R12"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R14": {
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 10
          },
          "exits": {
            "ne": "R4",
            "w": "R15"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R15": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 14,
            "y": 8
          },
          "exits": {
            "se": "R16",
            "w": "R18"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R18": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 12,
            "y": 9
          },
          "exits": {
            "n": "R19",
            "s": "R21"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R21": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 11,
            "y": 11
          },
          "exits": {
            "ne": "R21",
            "se": "R23"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R23": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 13,
            "y": 14
          },
          "exits": {
            "n": "R24",
            "sw": "R26",
            "se": "R39"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R26": {
          "name": "",
          "description": "",
          "map": {
            "x": 12,
            "y": 15
          },
          "exits": {
            "ne": "R25",
            "w": "R27"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R27": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 10,
            "y": 15
          },
          "exits": {
            "e": "R27",
            "se": "R29"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R29": {
          "name": "",
          "description": "",
          "map": {
            "x": 11,
            "y": 16
          },
          "exits": {
            "nw": "R28",
            "se": "R30"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R30": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 10,
            "y": 19
          },
          "exits": {
            "ne": "R31",
            "sw": "R33"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R33": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 9,
            "y": 22
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 11,
            "y": 21
          },
          "exits": {
            "sw": "R36",
            "ne": "R38"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R38": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 14,
            "y": 15
          },
          "exits": {
            "nw": "R25",
            "e": "R40"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R40": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 15
          },
          "exits": {
            "sw": "R41",
            "e": "R43"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R43": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 20,
            "y": 13
          },
          "exits": {
            "sw": "R44",
            "e": "R46"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R46": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 22,
            "y": 14
          },
          "exits": {
            "nw": "R46"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R48": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 18
          },
          "exits": {
            "ne": "R49",
            "s": "R51"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R51": {
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 19
          },
          "exits": {
            "n": "R50",
            "s": "R52"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R52": {
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 20
          },
          "exits": {
            "n": "R51"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R53": {
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 21
          },
          "exits": {
            "se": "R54"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R54": {
          "name": "Down2floor3",
          "description": "Down to Floor 3",
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
      "startRoom": "R55",
      "rooms": {
        "R55": {
          "name": "UP2Floor2",
          "description": "Up to floor 2",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 14,
            "y": 23
          },
          "exits": {
            "s": "R56",
            "nw": "R58"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R58": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 19
          },
          "exits": {
            "w": "R61",
            "e": "R63"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R63": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 20
          },
          "exits": {
            "nw": "R63",
            "e": "R65"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R65": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R67": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 18,
            "y": 22
          },
          "exits": {
            "ne": "R67",
            "sw": "R69",
            "se": "R70"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R69": {
          "name": "",
          "description": "",
          "map": {
            "x": 17,
            "y": 23
          },
          "exits": {
            "ne": "R68"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R70": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 20,
            "y": 20
          },
          "exits": {
            "w": "R66",
            "se": "R72"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R72": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 23,
            "y": 23
          },
          "exits": {
            "nw": "R73"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R76": {
          "name": "",
          "description": "",
          "map": {
            "x": 19,
            "y": 19
          },
          "exits": {
            "s": "R66",
            "n": "R77"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R77": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 20,
            "y": 17
          },
          "exits": {
            "sw": "R77",
            "ne": "R79"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R79": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 22,
            "y": 16
          },
          "exits": {
            "w": "R79"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R81": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 10,
            "y": 17
          },
          "exits": {
            "sw": "R86",
            "ne": "R88"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R88": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 13,
            "y": 16
          },
          "exits": {
            "w": "R89",
            "n": "R94",
            "e": "R91"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R91": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 16
          },
          "exits": {
            "w": "R91",
            "e": "R93"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R93": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 11,
            "y": 14
          },
          "exits": {
            "e": "R96",
            "n": "R98",
            "w": "R99"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R98": {
          "name": "",
          "description": "",
          "map": {
            "x": 11,
            "y": 13
          },
          "exits": {
            "s": "R97"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R99": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 7,
            "y": 14
          },
          "exits": {
            "se": "R101",
            "n": "R103",
            "sw": "R105"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R103": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 6,
            "y": 13
          },
          "exits": {
            "e": "R103"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R105": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 4,
            "y": 16
          },
          "exits": {
            "e": "R106"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R108": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 6,
            "y": 18
          },
          "exits": {
            "nw": "R108"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R110": {
          "name": "",
          "description": "",
          "map": {
            "x": 16,
            "y": 15
          },
          "exits": {
            "s": "R93",
            "n": "R111"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R111": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 16,
            "y": 13
          },
          "exits": {
            "s": "R111",
            "n": "R113"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R113": {
          "name": "",
          "description": "",
          "map": {
            "x": 16,
            "y": 12
          },
          "exits": {
            "s": "R112",
            "n": "R114"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R114": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 15,
            "y": 10
          },
          "exits": {
            "se": "R114",
            "nw": "R116"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R116": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 13,
            "y": 8
          },
          "exits": {
            "se": "R116",
            "w": "R118"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R118": {
          "name": "",
          "description": "",
          "map": {
            "x": 12,
            "y": 8
          },
          "exits": {
            "e": "R117",
            "w": "R119"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R119": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 10,
            "y": 8
          },
          "exits": {
            "e": "R119"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R121": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 18,
            "y": 11
          },
          "exits": {
            "w": "R121",
            "ne": "R123"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R123": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 20,
            "y": 9
          },
          "exits": {
            "sw": "R123",
            "ne": "R125"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R125": {
          "name": "",
          "description": "",
          "map": {
            "x": 21,
            "y": 8
          },
          "exits": {
            "sw": "R124",
            "e": "R126"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R126": {
          "name": "",
          "description": "",
          "map": {
            "x": 22,
            "y": 8
          },
          "exits": {
            "w": "R125",
            "n": "R127"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        },
        "R127": {
          "name": "",
          "description": "",
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
          "name": "",
          "description": "",
          "map": {
            "x": 22,
            "y": 6
          },
          "exits": {
            "s": "R127"
          },
          "contents": {},
          "flags": {
            "discovered": false
          }
        }
      }
    }
  }
};