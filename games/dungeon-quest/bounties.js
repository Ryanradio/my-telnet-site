// ═══════════════════════════════════════════════════════════════════════
//  bounties.js  —  THE ASHEN HARBOR WANTED BOARD
//
//  Bounties are unique named criminals, deserters, and monsters-wearing-
//  a-face that the Harbor has put a price on. One per level (7–15).
//
//  HOW IT WORKS:
//  1. Player visits Ashen Harbor → clicks the Wanted Board
//  2. Board shows all bounties. Uncollected ones can be Accepted.
//  3. Player can carry multiple active bounties simultaneously.
//  4. While exploring any matching zone, there is a 5% chance per
//     exploration action to encounter the bounty target.
//  5. Bounty target is a purple (epic) quality monster: 3x normal HP,
//     level-appropriate damage, fat gold + XP reward.
//  6. After defeating it, a "Collect Bounty" button appears. Return to
//     Ashen Harbor to collect.
//  7. After resting at the inn, completed bounties reset and can be
//     taken again.
//
//  PLAYER DATA (stored on gameState.player):
//    p.activeBounties   = ['bounty_7', 'bounty_9']  — accepted, hunting
//    p.pendingBounties  = ['bounty_8']               — killed, uncollected
//    p.collectedBounties= { bounty_7: timestamp }    — collected, on cooldown
// ═══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
//  BOUNTY DEFINITIONS  (one per level, 7–15)
// ─────────────────────────────────────────────────────────────────────────
const BOUNTIES = {

    bounty_7: {
        id:          'bounty_7',
        level:       7,
        name:        'Redhand Mira',
        title:       'The Twice-Hanged',
        crime:       'Escaped execution twice. Killed the hangman both times. Third execution pending.',
        zone:        'haunted_graveyard',
        zoneName:    'the Haunted Graveyard',
        emoji:       '🔪',
        // Combat stats — damage matches a normal lv7 mob, HP is 3x
        baseHp:      450,                // ~3x dire wolf (150hp)
        minDamage:   14,
        maxDamage:   26,
        baseDefense: 9,
        // Rewards
        bountyGold:  1000,               // flat bounty purse on collection
        xpMult:      1.0,                // 1.0 = normal XP for the kill
        // Lore
        description: `A contract killer who took a job in Ashen Harbor and then took everything else too. Redhand Mira has survived two public executions through a combination of bribery, chaos, and what witnesses describe as "an unsettling amount of laughing." She was last seen in the open plains, moving fast and leaving bodies.`,
        abilities: [
            {
                id: 'redhand_strike',
                name: 'Redhand Strike',
                chance: 0.30,
                mpCost: 12,
                telegraph: 'reaches for a blade hidden in her boot...',
                type: 'dot_attack',
                dot: { name: 'Bleeding', icon: '🩸', damage: 5, tickInterval: 3000, ticks: 3 },
                damageMult: 1.1,
                armorPiercing: 0.10,
                applyMessage: (n, c) => `🩸 ${n} opens a deep cut — <b>Bleeding!</b>`
            }
        ]
    },

    bounty_8: {
        id:          'bounty_8',
        level:       8,
        name:        'Captain Voss',
        title:       'The Unsinkable',
        crime:       'Smuggling. Piracy. Fraud. Being insufferably smug about all three.',
        zone:        'haunted_graveyard',
        zoneName:    'the Haunted Graveyard',
        emoji:       '⚓',
        baseHp:      540,                // ~3x centaur (180hp)
        minDamage:   16,
        maxDamage:   31,
        baseDefense: 10,
        bountyGold:  1000,
        xpMult:      1.0,
        description: `Voss commands a crew of deserters and former harbor guards who now operate as highway bandits on the overland trade routes. He calls it "redistributive commerce." The harbor calls it twelve counts of robbery and one count of stealing the harbourmaster's personal telescope, which is somehow the charge he's most wanted for.`,
        abilities: [
            {
                id: 'pistol_shot',
                name: 'Warning Shot',
                chance: 0.25,
                mpCost: 10,
                telegraph: 'raises a flintlock pistol...',
                type: 'heavy_hit',
                damageMult: 1.8,
                armorPiercing: 0.20,
                applyMessage: (n, c) => `💥 ${n} fires point-blank! The shot punches through armor!`
            },
            {
                id: 'crew_call',
                name: 'Call the Crew',
                chance: 0.20,
                mpCost: 15,
                telegraph: 'whistles sharply to his men...',
                type: 'intimidate',
                damagePenalty: 0.20,
                intimidateDuration: 5000,
                applyMessage: (n, c) => `😰 ${n}'s crew closes in! You're surrounded — intimidated!`
            }
        ]
    },

    bounty_9: {
        id:          'bounty_9',
        level:       9,
        name:        'The Tidecaller',
        title:       'Bringer of the Red Tide',
        crime:       'Called the tide. The tide answered. Half the lower docks are still missing.',
        zone:        'haunted_graveyard',
        zoneName:    'the Haunted Graveyard',
        emoji:       '🌊',
        baseHp:      630,                // ~3x ghost/zombie class (210hp)
        minDamage:   19,
        maxDamage:   34,
        baseDefense: 12,
        bountyGold:  1000,
        xpMult:      1.0,
        description: `Nobody knows the Tidecaller's real name. The harbor watch simply calls her "the problem." A hedge-witch who discovered she could speak to the sea and that the sea was, in her words, "very angry about everything." She now camps near the graveyard coast, performing rituals that make the water run red and the ground soft with something that isn't mud.`,
        abilities: [
            {
                id: 'tide_surge',
                name: 'Tide Surge',
                chance: 0.35,
                mpCost: 18,
                telegraph: 'raises her arms and the ground begins to flood...',
                type: 'burn',
                dot: { name: 'Drowning', icon: '🌊', damage: 7, tickInterval: 2500, ticks: 3 },
                damageMult: 0,
                applyMessage: (n, c) => `🌊 A surge of cursed water crashes over you — <b>Drowning!</b>`
            },
            {
                id: 'tide_rend',
                name: 'Salt Rend',
                chance: 0.20,
                mpCost: 14,
                telegraph: 'draws a brine-soaked blade across her palm...',
                type: 'rend',
                defReduction: 0.25,
                rendDuration: 8000,
                applyMessage: (n, c) => `🧂 Salt-cursed wounds eat through your armor! Defense reduced!`
            }
        ]
    },

    bounty_10: {
        id:          'bounty_10',
        level:       10,
        name:        'Gren Ashfoot',
        title:       'The Face-Taker',
        crime:       "Stole the mayor's face. Literally. Still wearing it. Considered armed.",
        zone:        'dark_swamp',
        zoneName:    'the Dark Swamp',
        emoji:       '🎭',
        baseHp:      750,               // ~3x dark swamp monsters (~250hp)
        minDamage:   21,
        maxDamage:   37,
        baseDefense: 14,
        bountyGold:  2000,
        xpMult:      2.0,
        description: `A shapeshifter who has been stealing identities in Ashen Harbor for three years. The mayor's face was a mistake — it turns out the mayor was extremely recognizable and also extremely missed at city council meetings. Gren is now hiding in the dark swamp, wearing a rotating selection of faces and becoming progressively harder to identify.`,
        abilities: [
            {
                id: 'wrong_face',
                name: 'Borrowed Face',
                chance: 0.30,
                mpCost: 16,
                telegraph: 'face ripples like still water in a stone...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                applyMessage: (n, c) => `😵 ${n}'s face shifts to someone you love — you hesitate! <b>Blinded!</b>`
            },
            {
                id: 'swamp_fade',
                name: 'Swamp Fade',
                chance: 0.25,
                mpCost: 12,
                telegraph: 'sinks into the murk...',
                type: 'drain_hp',
                drainAmount: 18,
                healPercent: 1.0,
                applyMessage: (n, c) => `🌑 ${n} drains your vitality through the mire!`
            }
        ]
    },

    bounty_11: {
        id:          'bounty_11',
        level:       11,
        name:        'The Smoking Man',
        title:       'Opener of the Vault',
        crime:       'Opened the Ashen Vault on a Tuesday. Left it open. Did not apologize.',
        zone:        'dark_swamp',
        zoneName:    'the Dark Swamp',
        emoji:       '💨',
        baseHp:      840,
        minDamage:   23,
        maxDamage:   40,
        baseDefense: 16,
        bountyGold:  2000,
        xpMult:      2.0,
        description: `A scholar-turned-criminal who broke the seals on the Ashen Vault "for research purposes." Whatever came out of the vault is now someone else's problem. The Smoking Man himself trails a perpetual haze of ash smoke, speaks only in riddles, and was last seen drifting through the dark swamp "looking for something he misplaced inside."`,
        abilities: [
            {
                id: 'ash_cloud',
                name: 'Ash Cloud',
                chance: 0.35,
                mpCost: 20,
                telegraph: 'exhales a thick cloud of volcanic ash...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 6000,
                hitMissChance: 0.40,
                damageMult: 0.5,
                applyMessage: (n, c) => `💨 Choking ash fills your lungs and eyes! <b>Blinded and coughing!</b>`
            },
            {
                id: 'vault_curse',
                name: 'Vault Curse',
                chance: 0.20,
                mpCost: 22,
                lowHpThreshold: 0.40,
                telegraph: 'mutters something that sounds like it was never meant to be words...',
                type: 'burn',
                dot: { name: 'Cursed', icon: '💜', damage: 9, tickInterval: 4000, ticks: 4 },
                damageMult: 0,
                applyMessage: (n, c) => `💜 Something from inside the vault speaks through him — <b>Cursed!</b>`
            }
        ]
    },

    bounty_12: {
        id:          'bounty_12',
        level:       12,
        name:        'Marchesa Dol',
        title:       'The Poisoner of Courts',
        crime:       'Poisoned three nobles, two merchants, and one very important horse. Fled before dessert.',
        zone:        'cursed_ruins',
        zoneName:    'the Cursed Ruins',
        emoji:       '🧪',
        baseHp:      960,
        minDamage:   25,
        maxDamage:   43,
        baseDefense: 18,
        bountyGold:  2000,
        xpMult:      2.0,
        description: `A disgraced court poisoner who made the classic mistake of poisoning someone who hadn't paid yet. Marchesa fled Ashen Harbor's trading council with a satchel of exotic toxins and a very personal grudge. She now operates from the cursed ruins outside the city, running a small and very illegal alchemical operation that supplies poisons to half the criminals in town.`,
        abilities: [
            {
                id: 'exotic_poison',
                name: 'Exotic Toxin',
                chance: 0.40,
                mpCost: 16,
                telegraph: 'uncorks a crystalline vial...',
                type: 'dot_attack',
                dot: { name: 'Poisoned', icon: '💚', damage: 10, tickInterval: 2000, ticks: 5 },
                damageMult: 0.6,
                armorPiercing: 0,
                applyMessage: (n, c) => `🧪 ${n}'s toxin enters your bloodstream — <b>Poisoned!</b>`
            },
            {
                id: 'smoke_bomb',
                name: 'Smoke Bomb',
                chance: 0.25,
                mpCost: 12,
                hpThreshold: 0.60,
                telegraph: 'hurls a dark glass sphere at your feet...',
                type: 'debuff',
                debuff: 'blinded',
                debuffDuration: 5000,
                hitMissChance: 0.35,
                damageMult: 0,
                applyMessage: (n, c) => `💨 Acrid smoke burns your eyes — <b>Blinded!</b>`
            }
        ]
    },

    bounty_13: {
        id:          'bounty_13',
        level:       13,
        name:        'Ironjaw Renn',
        title:       'The Unbreakable',
        crime:       'Destroyed three jail cells, one courthouse, and the concept of secure detention.',
        zone:        'cursed_ruins',
        zoneName:    'the Cursed Ruins',
        emoji:       '⛓️',
        baseHp:      1080,
        minDamage:   27,
        maxDamage:   46,
        baseDefense: 22,
        bountyGold:  3000,
        xpMult:      3.0,
        description: `Once a harbor guard, Renn was exposed to something in the lower ruins that changed his body in ways that cannot be easily described. His jaw replaced itself with iron. His skin has the texture of cooling forge slag. He broke out of three holding cells just to prove a point and now wanders the cursed ruins in what guards describe as "a very bad mood, permanently."`,
        abilities: [
            {
                id: 'ironjaw_crush',
                name: 'Ironjaw Crush',
                chance: 0.30,
                mpCost: 18,
                telegraph: 'iron jaw clicks open with a sound like a vault...',
                type: 'heavy_hit',
                damageMult: 2.2,
                armorPiercing: 0.30,
                applyMessage: (n, c) => `⛓️ Iron teeth close on you — the bite CRUSHES through armor!`
            },
            {
                id: 'rend_flesh',
                name: 'Slag Rend',
                chance: 0.25,
                mpCost: 16,
                telegraph: 'rakes slag-hardened fingers across your guard...',
                type: 'rend',
                defReduction: 0.30,
                rendDuration: 9000,
                applyMessage: (n, c) => `⛓️ Slag-hard nails tear through your armor! Defense shredded!`
            }
        ]
    },

    bounty_14: {
        id:          'bounty_14',
        level:       14,
        name:        'Sister Vael the Unmarked',
        title:       'The Faithless Cleric',
        crime:       'Converted an entire harbor ward to a death cult. Revoked divine ordination. Still casting.',
        zone:        'cave',
        zoneName:    'the Cave',
        emoji:       '🕯️',
        baseHp:      1200,
        minDamage:   30,
        maxDamage:   50,
        baseDefense: 24,
        bountyGold:  3000,
        xpMult:      3.0,
        description: `A cleric whose god stopped answering. Rather than accept silence, Vael found something older that would still pick up. She converted her entire ward — twelve city blocks, two hundred souls, one harbor lighthouse — to the worship of a thing with no name. The harbor watch moved in and found the ward empty. Just candles. Just marks on every surface. Just Vael, kneeling, and smiling.`,
        abilities: [
            {
                id: 'death_blessing',
                name: 'Dark Blessing',
                chance: 0.30,
                mpCost: 20,
                telegraph: 'raises a tallow candle and begins to pray in a language that hurts to hear...',
                type: 'burn',
                dot: { name: 'Cursed', icon: '💜', damage: 12, tickInterval: 4000, ticks: 4 },
                damageMult: 0,
                applyMessage: (n, c) => `💜 Faithless words find the cracks in your soul — <b>Cursed!</b>`
            },
            {
                id: 'drain_soul',
                name: 'Soul Drain',
                chance: 0.25,
                mpCost: 22,
                telegraph: 'fixes hollow eyes on you and reaches...',
                type: 'drain_hp',
                drainAmount: 22,
                healPercent: 1.0,
                applyMessage: (n, c) => `🕯️ ${n} drinks deep of your life force — healing herself!`
            },
            {
                id: 'mana_suppress',
                name: 'Silence',
                chance: 0.20,
                mpCost: 18,
                telegraph: 'whispers something that makes the air go flat...',
                type: 'drain_mp',
                drainAmount: 30,
                applyMessage: (n, c) => `🕯️ Your spells unravel — mana drained!`
            }
        ]
    },

    bounty_15: {
        id:          'bounty_15',
        level:       15,
        name:        'The Harbormaster',
        title:       'He Who Asks No Questions',
        crime:       'Everything. Specifically everything. The charges fill eleven pages. Page one is just the title.',
        zone:        'cave',
        zoneName:    'the Cave',
        emoji:       '⚓',
        baseHp:      1350,
        minDamage:   33,
        maxDamage:   55,
        baseDefense: 28,
        bountyGold:  3000,
        xpMult:      3.0,
        description: `Nobody puts the harbormaster on a wanted board and lives to regret it — except the one person who did, and she had to leave the city to avoid regretting it in person. He runs the harbor, the docks, the smugglers, the guard, and three of the city's five unofficial governments. He is in the cave because the cave is where he stores things nobody should find. He is waiting because he knows someone will come. He has been waiting a very long time.`,
        abilities: [
            {
                id: 'harbormasters_will',
                name: "Harbormaster's Will",
                chance: 0.35,
                mpCost: 24,
                telegraph: 'levels a stare at you that feels like a physical weight...',
                type: 'intimidate',
                damagePenalty: 0.30,
                intimidateDuration: 8000,
                applyMessage: (n, c) => `⚓ The Harbormaster's gaze pins you in place — intimidated!`
            },
            {
                id: 'harbormaster_rend',
                name: 'Iron Authority',
                chance: 0.25,
                mpCost: 20,
                telegraph: 'draws a naval cutlass that has seen decades of use...',
                type: 'rend',
                defReduction: 0.35,
                rendDuration: 10000,
                applyMessage: (n, c) => `⚓ That blade knows exactly where armor ends — defense shredded!`
            },
            {
                id: 'harbor_drain',
                name: 'Collect What Is Owed',
                chance: 0.20,
                mpCost: 22,
                lowHpThreshold: 0.45,
                telegraph: 'says "you owe the harbor" in a voice like a closing door...',
                type: 'drain_hp',
                drainAmount: 25,
                healPercent: 1.0,
                applyMessage: (n, c) => `⚓ The Harbormaster collects his due from your very lifeforce!`
            }
        ]
    }
};

// ─────────────────────────────────────────────────────────────────────────
//  BOUNTY RARITY COLOR  (always epic / purple)
// ─────────────────────────────────────────────────────────────────────────
const BOUNTY_COLOR = '#cc66ff';

// ─────────────────────────────────────────────────────────────────────────
//  HELPERS — ensure player has bounty fields
// ─────────────────────────────────────────────────────────────────────────
function _ensureBountyFields(p) {
    if (!p.activeBounties)    p.activeBounties    = [];
    if (!p.pendingBounties)   p.pendingBounties   = [];
    if (!p.collectedBounties) p.collectedBounties = {};
}

// Is this bounty on cooldown (collected but inn not visited since)?
function _bountyOnCooldown(p, id) {
    return !!(p.collectedBounties && p.collectedBounties[id]);
}

// ─────────────────────────────────────────────────────────────────────────
//  HOOK INTO exploreLocation — checked each exploration action
//  Returns true if a bounty combat was started (skips normal combat roll).
// ─────────────────────────────────────────────────────────────────────────
window.checkBountyEncounter = function(locKey) {
    const p = gameState.player;
    _ensureBountyFields(p);
    const _debug = typeof gameState !== 'undefined' && gameState.sysop && gameState.sysop.authenticated;

    // Find any active bounty whose zone matches this location
    const matchingIds = p.activeBounties.filter(id => {
        const b = BOUNTIES[id];
        return b && b.zone === locKey;
    });

    if (_debug && typeof termAppend === 'function') {
        if (p.activeBounties.length === 0) {
            termAppend(`<span style="color:#334466;">⚓ [BOUNTY] No active bounties.</span>`, 'term-dim');
        } else if (!matchingIds.length) {
            const names = p.activeBounties.map(id => BOUNTIES[id] ? `${BOUNTIES[id].name} (zone:${BOUNTIES[id].zone})` : id).join(', ');
            termAppend(`<span style="color:#334466;">⚓ [BOUNTY] Active: ${names} — no match for zone <b>${locKey}</b>. No roll.</span>`, 'term-dim');
        }
    }

    if (!matchingIds.length) return false;

    // 10% chance per exploration tick
    const roll = Math.random();
    const hit  = roll < 0.10;

    if (_debug && typeof termAppend === 'function') {
        const names = matchingIds.map(id => BOUNTIES[id] ? BOUNTIES[id].name : id).join(', ');
        const rollPct = (roll * 100).toFixed(2);
        termAppend(
            `<span style="color:#334466;">⚓ [BOUNTY] Hunting <b style="color:#cc66ff;">${names}</b> in <b>${locKey}</b>: ` +
            `rolled <b>${rollPct}%</b> / need ≤5.00% → ` +
            `${hit ? '<b style="color:#cc66ff;">✅ ENCOUNTER</b>' : '<span style="color:#555;">❌ miss</span>'}</span>`,
            'term-dim'
        );
    }

    if (!hit) return false;

    // Pick one at random if multiple match
    const bountyId = matchingIds[Math.floor(Math.random() * matchingIds.length)];
    const b = BOUNTIES[bountyId];

    startBountyCombat(bountyId, b);
    return true;
};

// ─────────────────────────────────────────────────────────────────────────
//  SPAWN THE BOUNTY MONSTER AND START COMBAT
// ─────────────────────────────────────────────────────────────────────────
function startBountyCombat(bountyId, b) {
    const p = gameState.player;

    // Build the monster object — purple/epic quality, 3x HP, normal-level damage
    const bountyMonster = {
        key:        bountyId,
        name:       `${b.name} ✦`,
        rarity:     'epic',
        rarityColor: BOUNTY_COLOR,
        hp:         b.baseHp,
        maxHp:      b.baseHp,
        damage:     Math.floor((b.minDamage + b.maxDamage) / 2),
        minDamage:  b.minDamage,
        maxDamage:  b.maxDamage,
        defense:    b.baseDefense,
        xp:         Math.floor(60 * b.level * 1.5 * b.xpMult),  // hefty XP
        gold:       Math.floor(b.level * 12),                     // small combat gold
        level:      b.level,
        possibleDrops: [],
        dropRates:  {},
        abilities:  b.abilities || [],
        isBounty:   true,
        bountyId:   bountyId,
        isBoss:     false,
    };
    // Give it enough MP for abilities
    const _maxMp = (b.abilities || []).reduce((mx, a) => Math.max(mx, a.mpCost || 0), 0);
    bountyMonster.baseMp = _maxMp * 3;
    bountyMonster.mp     = bountyMonster.baseMp;

    const maxHits   = calcPlayerHits(p);
    const pipTimers = Array.from({length: maxHits}, () => 10);

    gameState.combatState = {
        monsters:      [bountyMonster],
        currentTarget: 0,
        messages:      [],
        defeatedMonsters: [],
        pipTimers:     pipTimers,
        pipAvailable:  pipTimers.map(() => true),
        enemyTimer:    16,
        enemyDelay:    16,
        enemyHits:     2,
        enemyHitsLeft: 2,
        playerStatusEffects:  [],
        monsterStatusEffects: {},
        dotTimers:            {},
        isBountyFight:  true,
        bountyId:       bountyId,
    };

    // Open combat terminal
    openTerminalView(gameState.currentLocation);

    termAppend(
        `<span style="color:${BOUNTY_COLOR};font-size:20px;">⚠ WANTED TARGET LOCATED ⚠</span>`,
        'term-highlight'
    );
    termAppend(
        `<span style="color:${BOUNTY_COLOR};font-size:17px;">${b.name}</span>` +
        `<span style="color:#888;"> — ${b.title}</span>`,
        'term-highlight'
    );
    termAppend(
        `<span style="color:#666;font-size:12px;">Bounty: ${b.bountyGold.toLocaleString()}g upon capture</span>`
    );
    termAppend('', 'term-separator');

    renderEnemyCards();
    renderActionBar();
    setTimeout(updatePipButtons, 0);
    startCombatTimer();
}

// ─────────────────────────────────────────────────────────────────────────
//  HOOK INTO endCombat — called after victory when isBountyFight is set.
//  Returns the bountyId if a bounty was just captured, else null.
// ─────────────────────────────────────────────────────────────────────────
window.processBountyVictory = function(cs) {
    if (!cs || !cs.isBountyFight || !cs.bountyId) return null;
    const p = gameState.player;
    _ensureBountyFields(p);
    const bountyId = cs.bountyId;

    // Move from active → pending (awaiting collection at Harbor)
    p.activeBounties  = p.activeBounties.filter(id => id !== bountyId);
    p.pendingBounties = p.pendingBounties.filter(id => id !== bountyId);
    p.pendingBounties.push(bountyId);

    saveGame();
    return bountyId;
};

// ─────────────────────────────────────────────────────────────────────────
//  COLLECT A PENDING BOUNTY (called from the Harbor board)
// ─────────────────────────────────────────────────────────────────────────
function collectBounty(bountyId) {
    const p = gameState.player;
    _ensureBountyFields(p);
    const b = BOUNTIES[bountyId];
    if (!b) return;

    if (!p.pendingBounties.includes(bountyId)) {
        alert('You have not yet captured this target!');
        return;
    }

    // Award the bounty purse
    const gold = b.bountyGold;
    p.gold += gold;

    // Mark as collected (cooldown until inn rest)
    p.pendingBounties = p.pendingBounties.filter(id => id !== bountyId);
    p.collectedBounties[bountyId] = Date.now();

    saveGame();

    // Flash reward
    const flash = document.createElement('div');
    flash.style.cssText =
        'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
        'background:#0a0a0a;border:2px solid #cc66ff;border-radius:10px;' +
        'padding:22px 32px;color:#cc66ff;font-size:18px;z-index:99999;' +
        'text-align:center;font-family:"VT323",monospace;letter-spacing:1px;';
    flash.innerHTML =
        `⚓ BOUNTY COLLECTED ⚓<br>` +
        `<span style="color:#FFD700;font-size:22px;">+${gold.toLocaleString()}g</span><br>` +
        `<span style="color:#888;font-size:13px;">${b.name} — ${b.title}</span>`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 3000);

    showBountyBoard();
}

// ─────────────────────────────────────────────────────────────────────────
//  RESET BOUNTIES AFTER INN REST
//  Call this at the end of restAtInn().
// ─────────────────────────────────────────────────────────────────────────
window.resetBountiesAfterInn = function() {
    const p = gameState.player;
    _ensureBountyFields(p);
    const reset = Object.keys(p.collectedBounties || {});
    p.collectedBounties = {};
    if (reset.length) {
        console.log(`[Bounties] Reset after inn rest: ${reset.join(', ')}`);
    }
    saveGame();
};

// ─────────────────────────────────────────────────────────────────────────
//  ACCEPT A BOUNTY
// ─────────────────────────────────────────────────────────────────────────
function acceptBounty(bountyId) {
    const p = gameState.player;
    _ensureBountyFields(p);
    const b = BOUNTIES[bountyId];
    if (!b) return;

    if (p.level < b.level - 1) {
        alert(`You need to be at least level ${b.level - 1} to take this bounty.`);
        return;
    }
    if (p.activeBounties.includes(bountyId)) {
        alert('You already have this bounty.');
        return;
    }
    if (p.pendingBounties.includes(bountyId)) {
        alert('You already captured this target — return to collect the reward!');
        return;
    }
    if (_bountyOnCooldown(p, bountyId)) {
        alert('This bounty has already been collected. Rest at the inn and new targets will emerge.');
        return;
    }

    p.activeBounties.push(bountyId);
    saveGame();

    const flash = document.createElement('div');
    flash.style.cssText =
        'position:fixed;top:30px;left:50%;transform:translateX(-50%);' +
        'background:#0a0a0a;border:2px solid #cc66ff;border-radius:8px;' +
        'padding:12px 24px;color:#cc66ff;font-size:16px;z-index:99999;' +
        'text-align:center;font-family:"VT323",monospace;letter-spacing:1px;';
    flash.innerHTML =
        `⚠ BOUNTY ACCEPTED<br>` +
        `<span style="color:#888;font-size:13px;">Hunt ${b.name} in ${b.zoneName}</span>`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2800);

    showBountyBoard();
}

// ─────────────────────────────────────────────────────────────────────────
//  SHOW BOUNTY DETAIL SCREEN (called when player clicks a poster)
// ─────────────────────────────────────────────────────────────────────────
window.showBountyDetail = function(bountyId) {
    const b = BOUNTIES[bountyId];
    if (!b) return;
    const p = gameState.player;
    _ensureBountyFields(p);

    const isActive   = p.activeBounties.includes(bountyId);
    const isPending  = p.pendingBounties.includes(bountyId);
    const onCooldown = _bountyOnCooldown(p, bountyId);
    const tooLow     = p.level < b.level - 1;

    const old = document.getElementById('bounty-detail-overlay');
    if (old) old.remove();

    let actionBtn = '';
    if (isPending) {
        actionBtn = `
            <button onclick="collectBounty('${bountyId}')"
                style="width:100%;padding:12px;font-size:16px;letter-spacing:2px;
                       background:rgba(255,215,0,0.1);border:2px solid #FFD700;
                       color:#FFD700;font-family:'VT323',monospace;cursor:pointer;border-radius:5px;">
                💰 COLLECT BOUNTY — ${b.bountyGold.toLocaleString()}g
            </button>`;
    } else if (isActive) {
        actionBtn = `
            <div style="padding:10px;border:1px solid #3a2060;border-radius:5px;
                        background:rgba(204,102,255,0.07);text-align:center;">
                <span style="color:${BOUNTY_COLOR};font-size:14px;letter-spacing:2px;">
                    ⚠ BOUNTY ACTIVE — Hunt in ${b.zoneName}
                </span><br>
                <span style="color:#555;font-size:11px;">5% chance to encounter per exploration</span>
            </div>`;
    } else if (onCooldown) {
        actionBtn = `
            <div style="padding:10px;border:1px solid #2a2a2a;border-radius:5px;text-align:center;">
                <span style="color:#444;font-size:13px;">Target has gone to ground.</span><br>
                <span style="color:#333;font-size:11px;">Rest at the Ember Inn — new targets surface after each stay.</span>
            </div>`;
    } else if (tooLow) {
        actionBtn = `
            <div style="padding:10px;border:1px solid #3a1a00;border-radius:5px;text-align:center;">
                <span style="color:#7a3a00;font-size:13px;">Requires Level ${b.level - 1}+</span>
            </div>`;
    } else {
        actionBtn = `
            <button onclick="acceptBounty('${bountyId}')"
                style="width:100%;padding:12px;font-size:16px;letter-spacing:2px;
                       background:rgba(204,102,255,0.10);border:2px solid #8844cc;
                       color:${BOUNTY_COLOR};font-family:'VT323',monospace;cursor:pointer;border-radius:5px;">
                ⚠ ACCEPT BOUNTY
            </button>`;
    }

    const overlay = document.createElement('div');
    overlay.id = 'bounty-detail-overlay';
    overlay.style.cssText =
        'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;' +
        'justify-content:center;background:rgba(0,0,0,0.92);backdrop-filter:blur(6px);' +
        '-webkit-tap-highlight-color:transparent;';

    overlay.innerHTML = `
        <div style="background:#060305;border:2px solid #4a1a7a;border-radius:12px;
                    padding:26px 24px;max-width:380px;width:92%;
                    box-shadow:0 0 60px rgba(204,102,255,0.25);
                    font-family:'Courier New',monospace;position:relative;overflow:hidden;">

            <!-- top accent -->
            <div style="position:absolute;top:0;left:0;right:0;height:3px;
                        background:linear-gradient(90deg,transparent,${BOUNTY_COLOR},transparent);opacity:0.5;"></div>
            <div style="position:absolute;bottom:0;left:0;right:0;height:3px;
                        background:linear-gradient(90deg,transparent,${BOUNTY_COLOR},transparent);opacity:0.5;"></div>

            <!-- Header -->
            <div style="text-align:center;margin-bottom:16px;">
                <div style="font-size:40px;margin-bottom:8px;">${b.emoji}</div>
                <div style="font-size:8px;letter-spacing:4px;color:#9966cc;margin-bottom:4px;">WANTED — DEAD OR ALIVE</div>
                <div style="color:${BOUNTY_COLOR};font-size:18px;font-weight:bold;letter-spacing:2px;
                            text-shadow:0 0 12px ${BOUNTY_COLOR};">
                    ${b.name}
                </div>
                <div style="color:#5a3a7a;font-size:11px;letter-spacing:2px;margin-top:2px;">
                    ${b.title}
                </div>
            </div>

            <!-- Crime -->
            <div style="background:rgba(204,102,255,0.05);border:1px solid #2a1040;
                        border-left:3px solid ${BOUNTY_COLOR};border-radius:0 5px 5px 0;
                        padding:10px 12px;margin-bottom:12px;">
                <div style="font-size:8px;letter-spacing:3px;color:#9966cc;margin-bottom:5px;">CRIME</div>
                <div style="font-size:11px;color:#8855aa;line-height:1.6;">${b.crime}</div>
            </div>

            <!-- Description -->
            <div style="font-size:11px;color:#bb88dd;line-height:1.75;margin-bottom:14px;">
                ${b.description}
            </div>

            <!-- Stats -->
            <div style="display:flex;gap:8px;margin-bottom:14px;">
                <div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid #2a1040;
                            border-radius:5px;padding:8px;text-align:center;">
                    <div style="font-size:8px;color:#9966cc;letter-spacing:2px;">LEVEL</div>
                    <div style="color:${BOUNTY_COLOR};font-size:16px;">${b.level}</div>
                </div>
                <div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid #2a1040;
                            border-radius:5px;padding:8px;text-align:center;">
                    <div style="font-size:8px;color:#9966cc;letter-spacing:2px;">ZONE</div>
                    <div style="color:#8855aa;font-size:13px;">${b.zoneName}</div>
                </div>
                <div style="flex:1;background:rgba(0,0,0,0.4);border:1px solid #5a3d00;
                            border-radius:5px;padding:8px;text-align:center;">
                    <div style="font-size:8px;color:#aa6600;letter-spacing:2px;">PURSE</div>
                    <div style="color:#FFD700;font-size:16px;">${b.bountyGold.toLocaleString()}g</div>
                </div>
            </div>

            <!-- Action -->
            ${actionBtn}

            <!-- Close -->
            <button onclick="document.getElementById('bounty-detail-overlay').remove()"
                style="width:100%;margin-top:10px;padding:8px;font-size:13px;letter-spacing:2px;
                       background:transparent;border:1px solid #2a1040;color:#9966cc;
                       font-family:'Courier New',monospace;cursor:pointer;border-radius:5px;">
                ✕ CLOSE
            </button>
        </div>
    `;

    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
};

// ─────────────────────────────────────────────────────────────────────────
//  SHOW THE WANTED BOARD (full screen, accessible from town2 menu)
// ─────────────────────────────────────────────────────────────────────────
window.showBountyBoard = function() {
    const screen = document.getElementById('mainScreen');
    const p = gameState.player;
    _ensureBountyFields(p);

    // Inject styles once
    if (!document.getElementById('bounty-styles')) {
        const s = document.createElement('style');
        s.id = 'bounty-styles';
        s.textContent = `
            @keyframes bounty-flicker {
                0%,90%,100% { opacity:1; }
                93% { opacity:0.15; }
                97% { opacity:0.8;  }
            }
            @keyframes bounty-pulse {
                0%,100% { box-shadow: 0 0 8px rgba(204,102,255,0.2); }
                50%      { box-shadow: 0 0 20px rgba(204,102,255,0.5); }
            }
            .bounty-card {
                border: 1px solid #3a1a5c;
                border-radius: 7px;
                padding: 12px 14px;
                cursor: pointer;
                transition: transform 0.12s ease, border-color 0.15s, background 0.15s;
                position: relative;
                overflow: hidden;
                -webkit-tap-highlight-color: transparent;
            }
            .bounty-card:hover  { transform: translateX(4px); border-color: #8844cc; background: rgba(204,102,255,0.06); }
            .bounty-card:active { transform: scale(0.98); }
            .bounty-card.active-bounty   { border-color: ${BOUNTY_COLOR}; animation: bounty-pulse 2.5s ease-in-out infinite; }
            .bounty-card.pending-bounty  { border-color: #FFD700; }
            .bounty-card.collected-bounty{ opacity: 0.4; cursor: default; }
        `;
        document.head.appendChild(s);
    }

    const allBounties = Object.values(BOUNTIES);
    // Sort by level
    allBounties.sort((a, b) => a.level - b.level);

    const cards = allBounties.map(b => {
        const isActive   = p.activeBounties.includes(b.id);
        const isPending  = p.pendingBounties.includes(b.id);
        const onCooldown = _bountyOnCooldown(p, b.id);
        const tooLow     = p.level < b.level - 1;

        let statusTag = '';
        let cardClass = 'bounty-card';
        let borderColor = '';

        if (isPending) {
            cardClass += ' pending-bounty';
            statusTag = `<span style="color:#FFD700;font-size:10px;letter-spacing:2px;">💰 READY TO COLLECT</span>`;
        } else if (isActive) {
            cardClass += ' active-bounty';
            statusTag = `<span style="color:${BOUNTY_COLOR};font-size:10px;letter-spacing:2px;">⚠ HUNTING</span>`;
        } else if (onCooldown) {
            cardClass += ' collected-bounty';
            statusTag = `<span style="color:#333;font-size:10px;letter-spacing:2px;">✓ COLLECTED — Rest to reset</span>`;
        } else if (tooLow) {
            statusTag = `<span style="color:#aa5500;font-size:10px;letter-spacing:2px;">🔒 REQUIRES LV ${b.level - 1}</span>`;
        } else {
            statusTag = `<span style="color:#bb88dd;font-size:10px;letter-spacing:2px;">AVAILABLE</span>`;
        }

        const rewardLine = b.xpMult > 1
            ? `<span style="color:#FFD700;">${b.bountyGold.toLocaleString()}g</span> + <span style="color:#88aaff;">${b.xpMult}x XP</span>`
            : `<span style="color:#FFD700;">${b.bountyGold.toLocaleString()}g</span>`;

        return `
            <div class="${cardClass}" onclick="showBountyDetail('${b.id}')">
                <!-- Left: emoji + name -->
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:22px;animation:bounty-flicker ${8 + b.level}s ease-in-out infinite;">
                        ${b.emoji}
                    </span>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;">
                            <span style="color:${BOUNTY_COLOR};font-size:14px;font-weight:bold;letter-spacing:1px;">
                                ${b.name}
                            </span>
                            <span style="color:#9966cc;font-size:10px;">${b.title}</span>
                        </div>
                        <div style="font-size:10px;color:#aa77dd;margin-top:2px;line-height:1.4;">
                            ${b.crime}
                        </div>
                    </div>
                </div>
                <!-- Bottom row -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
                    <div>
                        <span style="color:#8855bb;font-size:9px;letter-spacing:2px;">LV ${b.level} · ${b.zoneName} · </span>
                        ${rewardLine}
                    </div>
                    <div>${statusTag}</div>
                </div>
            </div>`;
    }).join('');

    // Summary bar
    const active  = p.activeBounties.length;
    const pending = p.pendingBounties.length;
    const summaryColor = pending ? '#FFD700' : active ? BOUNTY_COLOR : '#3a1a5c';
    const summaryText  = pending
        ? `${pending} bounty${pending > 1 ? 'ies' : ''} ready to collect!`
        : active
        ? `${active} active bounty${active > 1 ? 'ies' : ''} — keep exploring`
        : 'No active bounties. Accept one below.';

    screen.innerHTML = `
        <div class="location-header" style="color:${BOUNTY_COLOR};">⚓ WANTED BOARD</div>
        <button onclick="showTown()" style="margin-bottom:10px;">← BACK TO HARBOR</button>
        ${typeof renderPlayerStats === 'function' ? renderPlayerStats() : ''}

        <!-- Summary -->
        <div style="margin:0 0 10px;padding:10px 14px;
                    background:rgba(204,102,255,0.04);
                    border-left:3px solid ${summaryColor};
                    border-radius:0 5px 5px 0;">
            <div style="font-size:9px;letter-spacing:4px;color:#9966cc;margin-bottom:3px;">
                HARBOURMASTER'S NOTICE
            </div>
            <div style="font-size:12px;color:${summaryColor};">${summaryText}</div>
            <div style="font-size:10px;color:#8855bb;margin-top:4px;">
                5% encounter chance per explore · Reset after resting at the Ember Inn
            </div>
        </div>

        <!-- Bounty cards -->
        <div style="font-size:8px;letter-spacing:4px;color:#8855bb;text-align:center;margin:8px 0 6px;">
            ◈ &nbsp; ACTIVE &nbsp; CONTRACTS &nbsp; ◈
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:18px;">
            ${cards}
        </div>

        <button onclick="showTown()" style="margin-bottom:18px;">← BACK TO HARBOR</button>
    `;
};

// ─────────────────────────────────────────────────────────────────────────
//  MIGRATION HELPER — call on game load to ensure old saves have fields
// ─────────────────────────────────────────────────────────────────────────
window.migrateBountyFields = function(p) {
    if (!p) return;
    _ensureBountyFields(p);
};

console.log('[Bounties] Loaded — 9 wanted targets, levels 7-15');
