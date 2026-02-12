// town2.js - Ashen Harbor (Second Town)
// ═══════════════════════════════════════════════════════════════
// Discovered by completing Dungeon1. Has higher-level zones (6-18),
// its own dungeon (Dungeon2 - to be created), and a portal back to
// Silverdale once the White Runestone is earned.
// ═══════════════════════════════════════════════════════════════

window.TOWNS = window.TOWNS || {};

window.TOWNS.town2 = {
    id: 'town2',
    name: 'Ashen Harbor',
    description: 'A grim port city built on volcanic rock. The smell of ash and salt fills the air. Few make it this far — those who do are changed.',
    theme: '#FF6600',   // orange color to feel different from Silverdale
    dungeonKey: null,   // Dungeon2 — to be added later
    dungeonName: 'The Ashen Vault',
    dungeonDescription: 'A vault sealed since the Age of Fire. Only the bravest dare its halls.',
    dungeonRequiredLevel: 10,
    dungeonUnlockMessage: 'You must be at least level 10 to enter the Ashen Vault!',

    // Zones that belong to Ashen Harbor's world map
    zones: ['plains', 'dark_swamp', 'cursed_ruins', 'cave'],

    // Town services
    services: {
        shop:    true,
        bank:    true,
        inn:     true,
        temple:  true
    },

    // Portal back to town1 (and forward to town3 once discovered)
    portalDestination: 'town1',
    portalName: 'Portal to Silverdale',
    portalDescription: 'A shimmering portal leading back to Silverdale.',
    portalRequires: 'white_runestone'
};
