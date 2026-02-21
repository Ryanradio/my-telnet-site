// town3.js - Crossroads of the World (Third Town)
// ═══════════════════════════════════════════════════════════════
// A mysterious nexus town accessible only to those bearing the
// Yellow Runestone. Portals lead to all known towns.
//   → Silverdale (town1): always visible from here
//   → Ashen Harbor (town2): always visible from here
//
// To reach Crossroads for the first time: the Yellow Runestone
// is awarded when a dungeon room flagged as townExit:'town3' with
// firstDiscovery:true is entered for the first time.
// ═══════════════════════════════════════════════════════════════

window.TOWNS = window.TOWNS || {};

window.TOWNS.town3 = {
    id: 'town3',
    name: 'Crossroads of the World',
    description: 'An ancient convergence where paths between worlds intersect. The air shimmers with portal energy and the faint echo of distant cities. Only those bearing the Yellow Runestone can find their way here.',
    theme: '#FFD700',   // gold — distinct and mystical

    // No dungeon yet — reserved for future content
    dungeonKey: null,
    dungeonName: null,
    dungeonDescription: null,
    dungeonRequiredLevel: null,
    dungeonUnlockMessage: null,

    // Zones accessible from this town (future expansion)
    zones: [],

    // Town services
    services: {
        shop:    true,
        bank:    true,
        inn:     true,
        temple:  true
    },

    // Portal destinations — logic lives in index.html showTown()
    // Both town1 and town2 are always accessible from here.
    // (Yellow Runestone was required to reach this town in the first place.)
    portalDestinations: ['town1', 'town2'],
    portalName: 'World Portals',
    portalDescription: 'Ancient portal arches hum with energy, leading to all known towns.',
    portalRequires: 'yellow_runestone'
};
