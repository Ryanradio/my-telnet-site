// town1.js - Silverdale (Starting Town)
// ═══════════════════════════════════════════════════════════════
// The first town players start in. Contains early-game content,
// a dungeon entrance (Dungeon1) unlocked at level 5, and a portal
// to Ashen Harbor once the White Runestone is earned.
// ═══════════════════════════════════════════════════════════════

window.TOWNS = window.TOWNS || {};

window.TOWNS.town1 = {
    id: 'town1',
    name: 'Silverdale',
    description: 'A peaceful town nestled at the edge of the Whispering Forest. Your adventure begins here.',
    theme: '#00FF41',   // green terminal color
    dungeonKey: 'Dungeon1',
    dungeonName: 'The Undermaze',
    dungeonDescription: 'A treacherous maze of tunnels beneath Silverdale. Rumored to connect to another world...',
    dungeonRequiredLevel: 5,
    dungeonUnlockMessage: 'You must be at least level 5 to brave the Undermaze!',

    // Zones that belong to this town's world map
    zones: ['forest', 'riverside', 'haunted_graveyard'],

    // Town services (all standard for town1)
    services: {
        shop:    true,
        bank:    true,
        inn:     true,
        temple:  true
    },

    // Special: portal destination once White Runestone earned
    portalDestination: 'town2',
    portalName: 'Portal to Ashen Harbor',
    portalDescription: 'A shimmering portal leading to Ashen Harbor, the city of ash and iron.',
    portalRequires: 'white_runestone'
};
