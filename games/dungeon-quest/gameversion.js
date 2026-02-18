// ═══════════════════════════════════════════════════════════════════════
// GAME VERSION FILE — gameversion.js
// ── UPDATE THIS FILE ON EVERY PATCH ────────────────────────────────────
// This is the single source of truth for game versioning.
// The GAME_VERSION string is checked against localStorage on load.
// If a player has an older version cached, they get a refresh banner.
// ═══════════════════════════════════════════════════════════════════════

const GAME_VERSION = '2025.02.17-r11';

// ── VERSION CHECK ──────────────────────────────────────────────────────
// Call this on: game init, character select, enter dungeon, enter explore.
// Shows a persistent red banner if the player's cached version is outdated.
function checkGameVersion() {
    const stored = localStorage.getItem('dq_game_version');
    if (stored && stored !== GAME_VERSION) {
        const existing = document.getElementById('versionBanner');
        if (existing) return; // already showing
        const banner = document.createElement('div');
        banner.id = 'versionBanner';
        banner.innerHTML = `
            <div style="
                position:fixed;top:0;left:0;right:0;z-index:99999;
                background:#220000;border-bottom:3px solid #ff0000;
                padding:10px 16px;font-family:'VT323',monospace;
                display:flex;align-items:center;justify-content:space-between;
                gap:10px;box-sizing:border-box;
            ">
                <div>
                    <span style="color:#ff4444;font-size:18px;font-weight:bold;">⚠ OUTDATED VERSION DETECTED</span><br>
                    <span style="color:#ff8888;font-size:14px;">
                        You are running <strong style="color:#ffaaaa;">v${stored}</strong> — latest is
                        <strong style="color:#00ff88;">v${GAME_VERSION}</strong>.
                        Refresh now to get the latest patch and avoid bugs!
                    </span>
                </div>
                <button onclick="location.reload(true)" style="
                    background:#ff0000;color:#fff;border:2px solid #ff4444;
                    padding:8px 16px;font-family:'VT323',monospace;font-size:16px;
                    cursor:pointer;white-space:nowrap;flex-shrink:0;
                ">🔄 REFRESH NOW</button>
            </div>`;
        document.body.prepend(banner);
    }
    // Always write current version so the NEXT stale load is detected
    localStorage.setItem('dq_game_version', GAME_VERSION);
}


// ── REVISION HISTORY ───────────────────────────────────────────────────
// Most recent first. Keep entries brief — one line per bullet.
// ═══════════════════════════════════════════════════════════════════════
const REVISION_HISTORY = [


{
        version: '2025.02.18-r12',
        date: 'Feb 18, 2025',
        summary: 'Updating Exploration-zones',
        changes: [
            'Riverside should now be available without beating the Class Master.',
        ]
    },


    {
        version: '2025.02.18-r11',
        date: 'Feb 18, 2025',
        summary: 'Updating Exploration-zones',
        changes: [
            'Riverside was not being called correctly.  Fixed',
        ]
    },

    {
        version: '2025.02.17-r10',
        date: 'Feb 17, 2025',
        summary: 'Class Masters Fix + Hunter Pet System',
        changes: [
            'FIXED: Added missing Warlock and Hunter class masters for all zones',
            'Warlock masters: Void Caller Malachar (forest), Shadowlord Xalthar (plains), etc.',
            'Hunter masters: Beast Lord Fenris (forest), Alpha Commander Varg (plains), etc.',
            'NEW: Hunter Pet System - hunters get pets instead of 2nd pip until level 6+',
            'Pets attack automatically after hunter attacks for bonus damage',
            'Pet damage = (weapon damage * %) + flat bonus',
            'Pet progression: Dog (35%) → Wolf (40%) → Dire Wolf (45%) → Shadow Hound (50%) → Warg (55%) → Hellhound (60%) → Fenrir (70%)',
            'Upgrade pets at Pet Trainer every 3 levels (3, 6, 9, 12, 15, 18, 21)',
            'Pet attacks show in combat: "🐕 Hunting Dog attacks for 12 damage!"',
            'Added hunter-pets.js with complete pet system',
        ]
    },

    {
        version: '2025.02.17-r9',
        date: 'Feb 17, 2025',
        summary: 'Dungeon Enemy Respawn System',
        changes: [
            'Dungeon enemies now respawn after 30 minutes (1800 seconds)',
            'Defeated enemies moved to defeatedEnemies array with death timestamp',
            'Respawn timer starts immediately when enemy dies',
            'Enemies respawn in their original room with full HP',
            'Chase state resets on respawn (not automatically chasing player)',
            'Respawn check runs every time player enters a room',
            'If player is in same room as respawned enemy, shows "♻️ [Enemy] has respawned in this room!"',
            'defeatedEnemies array saved/loaded with game state',
            'Console logs respawn events for debugging',
            'Dungeons are now infinitely replayable - farm enemies every 30 minutes',
        ]
    },

    {
        version: '2025.02.17-r8',
        date: 'Feb 17, 2025',
        summary: 'Status Effect Stacking System',
        changes: [
            'Status effects now STACK — multiple applications of the same status run independently',
            'Rogue double-strike with poison: both hits apply poison = 2 independent DOT timers ticking',
            'Each status instance gets a unique ID and its own damage timer',
            'Status application messages show stack count: "Poisoned [x2]", "Burning [x3]"',
            'All DOTs stack: poison, bleed, burning, bleeding, poisoned, etc.',
            'All debuffs stack: blind, stun, frozen, weakened, etc.',
            'Each stack expires independently after its own duration',
            'removeStatusEffect() removes ALL stacks of a type (for cleanse/cure effects)',
            'removeStatusEffectById() removes a single specific stack',
        ]
    },

    {
        version: '2025.02.17-r7',
        date: 'Feb 17, 2025',
        summary: 'Equipped Weapon Modifier Display',
        changes: [
            'Fixed: Weapon modifiers now show on EQUIPPED weapons in inventory',
            'Previously modifiers only showed on unequipped weapons',
            'Equipped weapon card now displays: name, damage, modifiers, EQUIPPED status, UNEQUIP button',
            'Modifier display uses same safety checks as unequipped weapons',
        ]
    },

    {
        version: '2025.02.17-r6',
        date: 'Feb 17, 2025',
        summary: 'Master Display Fix, Modifier Display, Spell Bonuses',
        changes: [
            'Fixed: Forest zone (starter area) now always unlocks when viewing Explore',
            'Fixed: Class masters now show even if you skip to higher levels via /setlevel',
            'Fixed: Weapon modifiers now display in inventory (added safety checks for undefined)',
            'Fixed: Weapon modifier damage bonuses now apply to ALL offensive spells (damage, lifesteal, AOE)',
            'Weapon modifier bonuses roll independently per spell cast (min-max damage range)',
            'Healing spells do NOT get modifier bonuses (prevents self-damage)',
            'Added getWeaponModifierSpellBonus() helper function for consistent spell bonus calculation',
        ]
    },

    {
        version: '2025.02.17-r5',
        date: 'Feb 17, 2025',
        summary: 'Class Masters, Drop Rates, Combat UI Polish',
        changes: [
            'Class masters now fully functional (file was incorrectly reported as empty)',
            'Weapon and armor drop rates increased from 2.5% to 4%',
            'Pip cooldown timer now shows bright green sweep instead of dark overlay (easier to see progress)',
            'Removed potion button from dungeon combat panel (inventory button exists in nav)',
            'Replaced potion button with inventory button in exploration (both combat and non-combat)',
            'Combat inventory button (🎒) shows unified panel with potions, weapons, and armor',
            'Back button in combat inventory now works correctly during both combat and exploration',
            'NOTE: Weapon modifiers for spell damage and modifier display in inventory are in progress',
        ]
    },

    {
        version: '2025.02.17-r4',
        date: 'Feb 17, 2025',
        summary: 'Version Check, Inventory Display, Zone Fixes',
        changes: [
            'Version check now runs on EVERY menu option from town (Shop, Bank, Inventory, Temple, Explore, Stats, Main Menu)',
            'PWA/desktop icon users will now see update prompts when navigating menus (no manual refresh needed)',
            'All weapons and armor now show in inventory regardless of class restrictions',
            'Unusable items display as dimmed with "CANNOT EQUIP" button (rogues see swords, mages see axes, etc.)',
            'Rogues can equip non-dagger weapons but only get double-strike with daggers',
            'Fixed: Haunted Graveyard (Lv 7-9) moved from town1 to town2 where it belongs',
            'Fixed: Town2 exploration now shows correct zones (Haunted Graveyard, Plains, Cave, Swamp, Ruins)',
            'Town1 exploration now only shows Forest and Riverside',
        ]
    },

    {
        version: '2025.02.17-r3',
        date: 'Feb 17, 2025',
        summary: 'Enemy Join Fix, Instructions Expanded, UI Polish',
        changes: [
            'Fixed: Enemies that follow into a room with pre-existing enemies now ALL appear instantly',
            'Fixed: Followers now show up immediately on attack buttons (not after they attack first)',
            'Instructions screen expanded with dungeon warning, color guide, and drop mechanics',
            'Rarity color guide: all 6 enemy tiers from Common (white) to Mythic (red)',
            'Quality color guide: all 6 equipment tiers from Poor (gray) to Godly (red)',
            'Drop mechanics explained: quality scales with enemy rarity and player level',
            'Dungeon Inventory overlay now only covers playable area (not entire screen)',
            'Added bottom CLOSE button to Dungeon Inventory panel (was top-right only)',
            'All screens with BACK buttons now have duplicate button at top and bottom',
            'Revision History screen accessible from main menu',
        ]
    },

    {
        version: '2025.02.17-r2',
        date: 'Feb 17, 2025',
        summary: 'Enemy AI, Inventory Overhaul, Spell Shop, Version System',
        changes: [
            'Dungeon enemies now all follow you into a room and JOIN active combat instantly',
            'Followers attack the player correctly — combat timer no longer stalls',
            'Multiple enemies entering a room during combat are added to the fight in real time',
            'Dungeon keys are now PERMANENT — never removed from inventory or on exit',
            'Keys do not get consumed when unlocking a door (door stays unlocked per session)',
            'Replaced dungeon keyboard direction input with 🎒 Inventory button (shows potion counts)',
            'New full-screen Dungeon Inventory panel: use potions, swap weapons/armor mid-dungeon',
            'Potion menu no longer breaks combat buttons when enemy attacks during it',
            'Spell slot ordering fixed: single-target = slot 1, AOE = slot 2 (always)',
            'Healer classes: damage spell = slot 1, healing spell = slot 2',
            'Spell shop no longer re-shows already-learned spells at 0 gold',
            'Spell shop shows "Coming Soon" section for spells locked by level',
            'Version watermark added to main menu (bottom-right corner)',
            'Added version check: stale cache triggers a "Please Refresh" banner',
            'gameversion.js created as single source of truth for version + patch notes',
            'Revision History added to main menu',
        ]
    },

    {
        version: '2025.02.17-r1',
        date: 'Feb 17, 2025',
        summary: 'Dungeon Maps, Combat Fixes, Shop & UI Polish',
        changes: [
            'Runestone pip now displays next to player name (not town name)',
            'Enemy critical hits show in red 💀 to distinguish from player crits',
            'Returning from dungeon map mid-combat correctly restores attack buttons',
            'Dungeon map shows [T] trap markers (red) and [H] home/start marker (yellow)',
            'Floor-scoped room discovery: Floor 1 and Floor 2 maps are fully independent',
            'Dungeon maps now persist across floor changes and logout/login',
            '/revealmap sysop command added to reveal entire dungeon layout',
            'Shop sell: duplicate items with different quality now stack separately',
            'Multiple dungeon enemies now show in combat and attack the player',
            'Key-carrying enemies drop their key on death correctly',
        ]
    },

    {
        version: '2025.02.17-r0',
        date: 'Feb 17, 2025',
        summary: 'Rogue Rework, Spell/Wand Balance, Sysop Tools',
        changes: [
            'Rogue double-strike and weapon restrictions reworked',
            'Spell attack menu unified across all casting classes',
            'Wand and staff damage rebalanced',
            'Zone auto-unlock added to /setlevel sysop command',
            'Mobile sysop teleport fixed',
            'Hash-based sysop credential system added',
            'Username capitalization fixed on character select',
        ]
    },

    {
        version: '2025.02.16-r0',
        date: 'Feb 16, 2025',
        summary: 'UI Polish, Dungeon Editor, Shop Sell System',
        changes: [
            'Runestone pip sizing and positioning improved',
            'Dungeon editor grid layout fixes',
            'Shop sell system implemented with sell value display',
            'Gem sellValue added to items',
            'Character select layout improved for mobile',
        ]
    },

];
