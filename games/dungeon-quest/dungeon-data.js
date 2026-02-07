console.log('dungeon-data.js LOADED');

window.DUNGEONS = {
  whisperingCrypt: {
    name: 'Whispering Crypt',
    description: 'An ancient crypt where every footstep seems to echo twice.',
    floors: {
      1: {
        startRoom: 'R1',
        rooms: {

          R1: {
            name: 'Entrance Hall',
            description: 'Cold stone walls loom overhead. Dust hangs in the air.',
            exits: { e: 'R2', s: 'R4' },
            contents: {},
            flags: { discovered: false }
          },          
          R2: {
            name: 'Broken Antechamber',
            description: 'Chunks of masonry litter the floor. Something growled recently.',
            exits: { W: 'R1', E: 'R3' },
            contents: { enemies: ['wolf'] },
            flags: { discovered: false }
          },

          R3: {
            name: 'Collapsed Shrine',
            description: 'A shattered altar lies buried beneath rubble.',
            exits: { W: 'R2', S: 'R6', NE: 'R12' },
            contents: { key: 'cryptKey' },
            flags: { discovered: false }
          },

         R4: {
    name: 'Dust-Choked Corridor',
    description: 'The air is thick with ash and old decay.',
    exits: { N: 'R1', S: 'R7', E: 'R5' },

    encounter: {
        monsterId: 'crypt_guard'
    },

    contents: { enemies: ['wolf'] },
    flags: { discovered: false }
},



          R5: {
            name: 'Locked Gate',
            description: 'An iron gate blocks the passage. A heavy lock bars the way.',
            exits: { W: 'R4', E: 'R6' },
            contents: {
              door: {
                id: 'cryptDoor',
                locked: true,
                key: 'cryptKey'
              }
            },
            flags: { discovered: false }
          },

          R6: {
            name: 'Hall of Echoes',
            description: 'Every sound bounces endlessly through the chamber.',
            exits: { N: 'R3', W: 'R5', S: 'R11' },
            contents: { enemies: ['direWolf'] },
            flags: { discovered: false }
          },

          R7: {
            name: 'Bone-Strewn Alcove',
            description: 'Bleached bones crunch underfoot.',
            exits: { N: 'R4', E: 'R8' },
            contents: {},
            flags: { discovered: false }
          },

          R8: {
            name: 'Forgotten Watch Post',
            description: 'A ruined barricade suggests someone once stood guard here.',
            exits: { W: 'R7', S: 'R9', E: 'R11' },
            contents: { enemies: ['wolf'] },
            flags: { discovered: false }
          },

          R9: {
            name: 'Deep Crypt Chamber',
            description: 'The walls are etched with names long forgotten.',
            exits: { N: 'R8', S: 'R10' },
            contents: {},
            flags: { discovered: false }
          },

          R10: {
            name: 'Lower Descent',
            description: 'A dark ladder descends into the depths below.',
            exits: { N: 'R9' },
            contents: {
              ladder: {
                direction: 'down',
                leadsTo: { floor: 2 }
              }
            },
            flags: { discovered: false }
          },

          R11: {
            name: 'Dark Chamber',
            description: 'The walls are etched with names long forgotten.',
            exits: { N: 'R6', W: 'R8' },
            contents: {},
            flags: { discovered: false }
          },

          // 🔥 NEW DIAGONAL ROOM (NE of R3)
          R12: {
            name: "Starfall Balcony",
            description: "A shattered balcony opens to a sky that should not exist underground.",
            map: { x: 3, y: -1 },
            exits: { SW: "R3", NW: "R13" },
            contents: {},
            flags: { discovered: false }
          },

          // 🔥 NEW DIAGONAL ROOM (NW of R12)
          R13: {
            name: "Astral Observatory",
            description: "Dust-covered lenses point toward constellations that drift and breathe.",
            map: { x: 2, y: -2 },
            exits: { SE: "R12" },
            contents: {},
            flags: { discovered: false }
          }

        }
      }
    }
  }
};
