// ═══════════════════════════════════════════════════════════════
// CHRONICLE SYSTEM — schedule, unlock logic, cinematic viewer
// Extracted from index.html
// Dependencies: gameState, saveGame, termAppend (runtime globals)
// Requires: lore-data.js loaded first
// ═══════════════════════════════════════════════════════════════

const CHRONICLE_SCHEDULE = [
    // ── World lore entries (all classes) ────────────────────────────
    { id:'world_1',  level:1,  cls:'all' },   // The seal. What it holds.
    { id:'world_2',  level:5,  cls:'all' },   // The 25 pillars. Why they're crumbling.
    { id:'world_3',  level:8,  cls:'all' },   // The Hollow King named for the first time.
    { id:'world_4',  level:13, cls:'all' },   // The cost of failure. What unmaking means.
    { id:'world_5',  level:18, cls:'all' },   // Others who tried. Why they fell short.
    { id:'world_6',  level:23, cls:'all' },   // The final pillar. The window closing.
    { id:'world_7',  level:25, cls:'all' },   // The Hollow King's bestiary entry unlocks.

    // ── Warrior personal arc ─────────────────────────────────────────
    { id:'warrior_1',  level:1,  cls:'warrior' },
    { id:'warrior_2',  level:3,  cls:'warrior' },
    { id:'warrior_3',  level:8,  cls:'warrior' },
    { id:'warrior_4',  level:13, cls:'warrior' },  // Epithet unlocked
    { id:'warrior_5',  level:15, cls:'warrior' },
    { id:'warrior_6',  level:18, cls:'warrior' },
    { id:'warrior_7',  level:20, cls:'warrior' },
    { id:'warrior_8',  level:23, cls:'warrior' },
    { id:'warrior_9',  level:25, cls:'warrior' },

    // ── Mage personal arc ────────────────────────────────────────────
    { id:'mage_1',  level:1,  cls:'mage' },
    { id:'mage_2',  level:3,  cls:'mage' },
    { id:'mage_3',  level:8,  cls:'mage' },
    { id:'mage_4',  level:13, cls:'mage' },
    { id:'mage_5',  level:15, cls:'mage' },
    { id:'mage_6',  level:18, cls:'mage' },
    { id:'mage_7',  level:20, cls:'mage' },
    { id:'mage_8',  level:23, cls:'mage' },
    { id:'mage_9',  level:25, cls:'mage' },

    // ── Rogue personal arc ───────────────────────────────────────────
    { id:'rogue_1',  level:1,  cls:'rogue' },
    { id:'rogue_2',  level:3,  cls:'rogue' },
    { id:'rogue_3',  level:8,  cls:'rogue' },
    { id:'rogue_4',  level:13, cls:'rogue' },
    { id:'rogue_5',  level:15, cls:'rogue' },
    { id:'rogue_6',  level:18, cls:'rogue' },
    { id:'rogue_7',  level:20, cls:'rogue' },
    { id:'rogue_8',  level:23, cls:'rogue' },
    { id:'rogue_9',  level:25, cls:'rogue' },

    // ── Ranger personal arc ──────────────────────────────────────────
    { id:'ranger_1',  level:1,  cls:'ranger' },
    { id:'ranger_2',  level:3,  cls:'ranger' },
    { id:'ranger_3',  level:8,  cls:'ranger' },
    { id:'ranger_4',  level:13, cls:'ranger' },
    { id:'ranger_5',  level:15, cls:'ranger' },
    { id:'ranger_6',  level:18, cls:'ranger' },
    { id:'ranger_7',  level:20, cls:'ranger' },
    { id:'ranger_8',  level:23, cls:'ranger' },
    { id:'ranger_9',  level:25, cls:'ranger' },

    // ── Runesmith personal arc ───────────────────────────────────────
    { id:'runesmith_1',  level:1,  cls:'runesmith' },
    { id:'runesmith_2',  level:3,  cls:'runesmith' },
    { id:'runesmith_3',  level:8,  cls:'runesmith' },
    { id:'runesmith_4',  level:13, cls:'runesmith' },
    { id:'runesmith_5',  level:15, cls:'runesmith' },
    { id:'runesmith_6',  level:18, cls:'runesmith' },
    { id:'runesmith_7',  level:20, cls:'runesmith' },
    { id:'runesmith_8',  level:23, cls:'runesmith' },
    { id:'runesmith_9',  level:25, cls:'runesmith' },

    // ── Cleric personal arc ──────────────────────────────────────────
    { id:'cleric_1',  level:1,  cls:'cleric' },
    { id:'cleric_2',  level:3,  cls:'cleric' },
    { id:'cleric_3',  level:8,  cls:'cleric' },
    { id:'cleric_4',  level:13, cls:'cleric' },
    { id:'cleric_5',  level:15, cls:'cleric' },
    { id:'cleric_6',  level:18, cls:'cleric' },
    { id:'cleric_7',  level:20, cls:'cleric' },
    { id:'cleric_8',  level:23, cls:'cleric' },
    { id:'cleric_9',  level:25, cls:'cleric' },

    // ── Necromancer personal arc ─────────────────────────────────────
    { id:'necromancer_1',  level:1,  cls:'necromancer' },
    { id:'necromancer_2',  level:3,  cls:'necromancer' },
    { id:'necromancer_3',  level:8,  cls:'necromancer' },
    { id:'necromancer_4',  level:13, cls:'necromancer' },
    { id:'necromancer_5',  level:15, cls:'necromancer' },
    { id:'necromancer_6',  level:18, cls:'necromancer' },
    { id:'necromancer_7',  level:20, cls:'necromancer' },
    { id:'necromancer_8',  level:23, cls:'necromancer' },
    { id:'necromancer_9',  level:25, cls:'necromancer' },

    // ── Berserker personal arc ───────────────────────────────────────
    { id:'berserker_1',  level:1,  cls:'berserker' },
    { id:'berserker_2',  level:3,  cls:'berserker' },
    { id:'berserker_3',  level:8,  cls:'berserker' },
    { id:'berserker_4',  level:13, cls:'berserker' },
    { id:'berserker_5',  level:15, cls:'berserker' },
    { id:'berserker_6',  level:18, cls:'berserker' },
    { id:'berserker_7',  level:20, cls:'berserker' },
    { id:'berserker_8',  level:23, cls:'berserker' },
    { id:'berserker_9',  level:25, cls:'berserker' },
];

// ── Unlock entries for a player at their current level ─────────────────
function unlockChronicleEntries(p) {
    if (!p.chronicle) p.chronicle = { unlockedEntries: [], readEntries: [] };
    const baseClass = p.baseClass || p.class;
    const level = p.level;
    let newUnlocks = [];

    CHRONICLE_SCHEDULE.forEach(entry => {
        if (entry.level !== level) return;                          // not this level
        if (entry.cls !== 'all' && entry.cls !== baseClass) return; // wrong class
        if (p.chronicle.unlockedEntries.includes(entry.id)) return; // already have it
        p.chronicle.unlockedEntries.push(entry.id);
        newUnlocks.push(entry.id);
    });

    // Notify UI if anything unlocked
    if (newUnlocks.length > 0) {
        onChronicleUnlock(newUnlocks);
    }
}

// ── Retroactively unlock all entries up to player's current level ───────
// Used on load for existing players — no notification, just fills state.
function retroactivelyUnlockChronicle(p) {
    // ── Legacy letter: rebuild CHRONICLE_CONTENT entry on every load ───
    // The letter content lives in CHRONICLE_CONTENT which is rebuilt fresh
    // each page load. If the player has seen the letter, re-inject it so
    // the content object is always populated — otherwise clicks find
    // CHRONICLE_CONTENT['legacy_letter'] === undefined and do nothing.
    if (p.hasSeenLegacyWelcome) {
        injectLegacyLetterIntoChronicle(p);  // always re-adds content + schedule entry
    }
    if (!p.chronicle) p.chronicle = { unlockedEntries: [], readEntries: [] };
    const baseClass = p.baseClass || p.class;

    CHRONICLE_SCHEDULE.forEach(entry => {
        if (entry.level > p.level) return;                          // not yet earned
        if (entry.cls !== 'all' && entry.cls !== baseClass) return; // wrong class
        if (p.chronicle.unlockedEntries.includes(entry.id)) return; // already have it
        p.chronicle.unlockedEntries.push(entry.id);
    });
    // Sort by schedule order so entries always appear in the right sequence
    const order = CHRONICLE_SCHEDULE.map(e => e.id);
    p.chronicle.unlockedEntries.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

// ── Mark a Chronicle entry as read ─────────────────────────────────────
function markChronicleRead(entryId) {
    const p = gameState.player;
    if (!p || !p.chronicle) return;
    if (!p.chronicle.readEntries.includes(entryId)) {
        p.chronicle.readEntries.push(entryId);
        updateChronicleNotificationBadge();
        saveGame();
    }
}

// ── Count unread Chronicle entries ─────────────────────────────────────
function getUnreadChronicleCount() {
    const p = gameState.player;
    if (!p || !p.chronicle) return 0;
    return p.chronicle.unlockedEntries.filter(
        id => !p.chronicle.readEntries.includes(id)
    ).length;
}

// ── Chronicle UI event hooks (stubs — wired up in Phase 3 UI build) ────
function onChronicleUnlock(newEntryIds) {
    // Show a brief in-world notification in the terminal
    const count = newEntryIds.length;
    if (typeof termAppend === 'function') {
        termAppend(
            `<span style="color:#c8a020;">📖 The Chronicle stirs — ${count === 1 ? 'a new page has' : count + ' new pages have'} been written.</span>`,
            'term-loot'
        );
    }
    updateChronicleNotificationBadge();
}

function updateChronicleNotificationBadge() {
    // Updates the red unread-count badge on the Chronicle button.
    // The button itself is built in Phase 3 — this just sets it if present.
    const badge = document.getElementById('chronicle-badge');
    if (!badge) return;
    const count = getUnreadChronicleCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// WELCOME / INTRO SCREEN ENGINE
// Shown once after brand-new character creation.
// Reads from CHRONICLE_CONTENT entry 1 for the player's class.
// ═══════════════════════════════════════════════════════════════════════

// Class-specific opening lore blocks shown on the welcome screen.
// Each returns an array of { type:'para'|'callout'|'divider', text } segments.
function getWelcomeLore(classKey, playerName) {
    const cls = classKey ? classKey.toLowerCase() : 'warrior';
    const base = cls.replace(/^(dark|chaos|shadow)_/,'');

    // Map evolved/advanced class keys back to base
    const baseMap = {
        paladin:'warrior', berserker_lord:'berserker', archmage:'mage',
        assassin:'rogue',  druid:'ranger',  high_cleric:'cleric',
        death_knight:'necromancer', master_smith:'runesmith',
    };
    const loreClass = baseMap[cls] || base;

    const CLASS_LORE = {
        warrior: [
            { type:'para',    text:`The ground has been shaking for three weeks. Not the trembling of a mine collapse or a mountain pass — this is something deeper. A rhythmic rumble that rises up through the earth itself, steady as breathing, like something enormous stirring in a sleep it has kept for a thousand years.` },
            { type:'callout', text:`Your grandmother called it the Waking. The name passed down through Brennan's bloodline for ten generations — a warning dressed as legend. <em>When the earth shakes like this, when the tremors come in threes, the blood of Brennan will be called.</em><br><br>You always thought it was a story families told to feel important.` },
            { type:'para',    text:`Then the tremors came, and your grandmother opened the chest at the foot of her bed — the one you were never allowed to touch — and set its contents on the table without a word. A journal. A fragment of ancient chain. A map with a location marked in faded red ink.` },
            { type:'para',    text:`Azrath the Calamity Dragon was sealed beneath the earth a thousand years ago by your ancestor Brennan the Unbroken. Not killed — nothing has ever killed it. Sealed. Bound in a prison of ancient making that was never meant to hold forever.` },
            { type:'callout', text:`The seal is breaking. The dungeons of the land grow more dangerous by the month as creatures are driven upward by the tremors. Somewhere ahead, at a place called the Crossroads, others like you are gathering — called by their own reasons, their own roads, all converging on the same endpoint.<br><br>The world has until Azrath wakes fully. You have until level twenty-five.` },
            { type:'para',    text:`The journal is in your pack. The training begins now. Every fight, every level earned, every skill sharpened in the dungeons ahead — it is not adventure. It is preparation for the one moment your bloodline was born for.` },
        ],
        mage: [
            { type:'para',    text:`You have been monitoring the seal's degradation for six months, longer than most institutions have been willing to admit the problem exists. The numbers do not lie. The rate of decay has accelerated three times since you first plotted it, and every new data point compresses the timeline further.` },
            { type:'callout', text:`The Academy calls it theoretical concern. You call it an imminent catastrophe. Azrath the Calamity Dragon — sealed beneath the earth by the warrior Brennan a thousand years ago — is nearly free. The tremors are not geological. They are the sound of a prison failing.` },
            { type:'para',    text:`You have heard of the Crossroads. The old texts describe it as a gathering place built for exactly this cycle — a place where the called ones find each other, where the four elemental dungeons begin, where a thousand years of Brennan's preparation waits for people strong enough to use it.` },
            { type:'para',    text:`The dungeons ahead will sharpen you. Every spell refined, every level of mastery earned — it is preparation. The world needs what you will become, not what you are now.` },
        ],
        rogue: [
            { type:'para',    text:`You have survived by knowing things other people do not. Information is your currency, your weapon, your escape route. And what you know right now — what every shadow network from the ports to the mountain passes is whispering about — is that the earth is wrong.` },
            { type:'callout', text:`The tremors. The dead rising near the old pillar routes. The creature migrations pushing everything out of the deep places and toward the surface. Every fence, every information broker, every person who makes their living knowing things before other people do — they all say the same thing. Something is coming. Something that makes kings irrelevant and armies useless.` },
            { type:'para',    text:`You have heard of Azrath the Calamity Dragon. Everyone has, in the same way everyone has heard of the dark at the end of the world — as metaphor, as warning tale, as something that was someone else's problem a thousand years ago.` },
            { type:'para',    text:`The Crossroads calls people like you. Not because you are the most powerful, but because the fight ahead requires every kind of strength. Your skills, honed in the dungeons ahead, will matter more than you expect.` },
        ],
        ranger: [
            { type:'para',    text:`The forest has been wrong for months. You noticed it before the tremors started — the way the migration routes shifted, the silence in places that should have been full of sound, the look of an animal that has been frightened badly enough to abandon ten thousand years of instinct.` },
            { type:'callout', text:`The tremors confirmed what you already knew from the land itself. Azrath the Calamity Dragon — sealed a thousand years ago by a warrior named Brennan the Unbroken — is nearly free. The creatures fleeing the deep places are not random. They are running from what is waking beneath them.` },
            { type:'para',    text:`The Crossroads exists for this. Brennan built it after the last sealing, a gathering place for the next cycle. People are already moving there — warriors, mages, clerics, all called by their own reasons. The four elemental dungeons beyond the Crossroads hold the talismans Brennan left behind.` },
            { type:'para',    text:`You know how to survive. You know how to read what the land tells you. Train in the dungeons ahead, and what you know will become what the world needs.` },
        ],
        runesmith: [
            { type:'para',    text:`The hand reached for the tool before you knew you needed it. Not the first time — that has been happening for months. The muscle memory of techniques you were never taught, for instruments you have never made, for a purpose you are only beginning to understand.` },
            { type:'callout', text:`The tremors started three weeks ago. The scholars say geological instability. You say something else. The runes you have been waking with in your hands — the same configurations, again and again — are binding runes. Ancient ones. The kind used in major workings a thousand years ago.<br><br>Someone named Brennan used them to seal a dragon called Azrath. You are beginning to believe you were there.` },
            { type:'para',    text:`The Crossroads holds Brennan's second journal — and a room full of tools that no one else can use. The four elemental dungeons beyond it contain talismans that need a runesmith's understanding to be properly wielded. Train in the dungeons ahead. The craft you are inheriting from a past life is the craft the world needs now.` },
        ],
        cleric: [
            { type:'para',    text:`The prayers stopped being answered six months ago. Not all at once — a gradual fading, like a voice growing distant. You kept the log, kept the practice, kept looking for the pattern. And you found it: the silence correlates exactly with the worsening of the tremors.` },
            { type:'callout', text:`Something is interfering. The order calls it a trial of faith. You call it a signal. Azrath the Calamity Dragon — sealed a thousand years ago, breaking free now — is not just a physical threat. It is the kind of force that distorts everything around it, including the connections between the faithful and their gods.<br><br>The silence is not absence. It is obstruction.` },
            { type:'para',    text:`The Crossroads calls you. Brennan's preparations extend to every class, every calling, every form of strength the world can produce. The four elemental dungeons ahead test not power but purpose. What you believe, why you fight, who you serve — those will matter as much as the levels you earn.` },
            { type:'para',    text:`Train. Level. Become what your faith has been building you toward. The silence will end when Azrath does.` },
        ],
        necromancer: [
            { type:'para',    text:`The dead have been afraid for three months. Not restless — afraid. You have conducted thousands of séances in your practice. You have spoken to spirits from every era. In all that time, you have never encountered a spirit that was frightened.` },
            { type:'callout', text:`They all say the same thing, unprompted: <em>It is coming and the dead cannot stop it.</em> Every spirit, across every session, across every century they died in. Azrath the Calamity Dragon does not discriminate between the living and the dead. What it touches is simply gone — not killed, not transformed. Erased.<br><br>The dead are afraid of ceasing to have ever existed.` },
            { type:'para',    text:`The Crossroads holds records from every past cycle. People are gathering there from every corner of the land, called by their own paths to the same destination. The four elemental dungeons Brennan left behind require someone who understands the boundary between life and death to properly interpret what they contain.` },
            { type:'para',    text:`That someone is you. Train in the dungeons ahead. The dead are counting on the living to finish this.` },
        ],
        berserker: [
            { type:'para',    text:`You came back from three days in the high passes to find your village empty. Not attacked, not fled — empty. The people were still there, still breathing, still standing in the places they had been when whatever happened happened. But the lights were out behind their eyes. Your grandmother at her loom. Old Davin at the gate. The children in the yard. Present and gone at the same time.` },
            { type:'callout', text:`You have been told this is what Azrath does. The Calamity Dragon — sealed a thousand years ago by a warrior named Brennan, nearly free now, the tremors the proof of it — does not kill. It empties. It strips the meaning from things until the things themselves no longer matter enough to remain.<br><br>Your people are still alive. They are just no longer there.` },
            { type:'para',    text:`Someone at the Crossroads told you it might be reversible. That if Azrath is stopped before it fully wakes, the emptying stops with it. That the people taken first might come back when the source of the taking is gone.` },
            { type:'para',    text:`You do not know if that is true. You are going to find out. Train hard. Get to level twenty-five. If there is any chance they can come back, you are going to earn it.` },
        ],
    };

    return CLASS_LORE[loreClass] || CLASS_LORE['warrior'];
}

// Build the town closing line
function getStartingTownName() {
    const tid = gameState.currentTown || 'town1';
    if (typeof TOWNS !== 'undefined' && TOWNS[tid]) return TOWNS[tid].name;
    return 'Silverdale';
}

// Show the welcome screen
function showWelcomeScreen() {
    const p = gameState.player;
    if (!p) { showTown(); return; }

    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) { showTown(); return; }

    // Populate header
    document.getElementById('welcome-char-name').textContent = p.name || 'Adventurer';
    document.getElementById('welcome-char-class').textContent = p.className || p.class || '';

    // Build content segments
    const baseClass = p.baseClass || p.class || 'warrior';
    const segments  = getWelcomeLore(baseClass, p.name);

    // Town closing segment (always last)
    const townName = getStartingTownName();
    segments.push({ type:'town', townName });

    // Render all segments as hidden elements
    const body = document.getElementById('welcome-body');
    body.innerHTML = '';

    segments.forEach((seg, i) => {
        let el;
        if (seg.type === 'para') {
            el = document.createElement('p');
            el.className = 'welcome-para';
            el.innerHTML = seg.text;
        } else if (seg.type === 'callout') {
            el = document.createElement('div');
            el.className = 'welcome-callout';
            el.innerHTML = seg.text;
        } else if (seg.type === 'divider') {
            el = document.createElement('div');
            el.className = 'welcome-divider';
            el.textContent = '✦  ·  ·  ·  ✦';
        } else if (seg.type === 'town') {
            el = document.createElement('div');
            el.className = 'welcome-town-line';
            el.innerHTML = `
                <div class="welcome-divider" style="opacity:0.4;margin-bottom:16px;">✦  ·  ·  ·  ✦</div>
                <div class="welcome-town-top">And so your journey begins in the town of</div>
                <div class="welcome-town-name">${seg.townName}</div>`;
        }
        if (el) {
            el.dataset.segIndex = i;
            body.appendChild(el);
        }
    });

    // Open overlay
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate segments in one by one
    let delay = 300;
    const allSegs = body.querySelectorAll('[data-seg-index]');
    const lastIdx = allSegs.length - 1;

    allSegs.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
            // Gently scroll new element into view — slow and deliberate
            el.scrollIntoView({ behavior:'smooth', block:'end' });
            // Enable begin button after last segment
            if (i === lastIdx) {
                setTimeout(() => {
                    const btn = document.getElementById('welcome-begin-btn');
                    if (btn) btn.classList.add('ready');
                }, 800);
            }
        }, delay);
        // Reading pace — 2.5x longer per paragraph so players finish before next arrives.
        // Short single-line paras (under ~60 chars) get 6s, full paras 12.5s,
        // callouts 17.5s (they're dense), town closing line 8s.
        const text = el.textContent || '';
        const isShortLine = text.trim().length < 60;
        const dur = el.classList.contains('welcome-callout')   ? 17500
                  : el.classList.contains('welcome-town-line') ? 8000
                  : isShortLine                                 ? 6000
                  : 12500;
        delay += dur;
    });
}

function beginAdventure() {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    const p = gameState.player;
    if (p) {
        p.hasSeenWelcome = true;          // mark so legacy check skips this player
        unlockChronicleEntries(p);
        retroactivelyUnlockChronicle(p);
        saveGame();
    }
    showTown();
}

function skipWelcome() {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) {
        // Instantly show all segments, then allow begin
        overlay.querySelectorAll('[data-seg-index]').forEach(el => el.classList.add('visible'));
        const btn = document.getElementById('welcome-begin-btn');
        if (btn) btn.classList.add('ready');
        // Smooth scroll to bottom on skip
        const body = document.getElementById('welcome-body');
        if (body) body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// END WELCOME SCREEN ENGINE
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// LEGACY WELCOME SYSTEM
// Shows once on next login for players who existed before the Chronicle/
// lore system was added. Detected by absence of p.hasSeenLegacyWelcome.
// The letter is also permanently readable in the Chronicle as a special
// entry labeled "A Letter Found".
// ═══════════════════════════════════════════════════════════════════════

function isLegacyPlayer(p) {
    // A legacy player is one who has no hasSeenLegacyWelcome flag AND
    // no hasSeenWelcome flag (new players get hasSeenWelcome set).
    // We also check they actually exist (level >= 1).
    if (!p) return false;
    if (p.hasSeenWelcome) return false;       // new-flow player
    if (p.hasSeenLegacyWelcome) return false; // already shown
    return true;
}

function maybeShowLegacyWelcome() {
    const p = gameState.player;
    if (p && isLegacyPlayer(p)) {
        showLegacyWelcome();
    } else {
        showTown();
    }
}

// ── Level-tier helper ─────────────────────────────────────────────────
function getLegacyTier(level) {
    if (level >= 25) return 'complete';
    if (level >= 17) return 'late';
    if (level >= 9)  return 'mid';
    return 'early';
}

// ── Build the letter body based on level and class ────────────────────
function buildLegacyLetter(p) {
    const name     = p.name || 'Adventurer';
    const level    = p.level || 1;
    const cls      = (p.baseClass || p.class || 'warrior').toLowerCase();
    const tier     = getLegacyTier(level);
    const levelsLeft = Math.max(0, 25 - level);

    // Class-specific opener — who is writing to them, and why they matter
    const CLASS_OPENERS = {
        warrior:     `You are the last of Brennan's bloodline. We have known this since before you were born. The four talismans hidden in the elemental dungeons beyond the Crossroads will only answer to you — keyed by your ancestor to the blood he trusted would hold for a thousand years.`,
        mage:        `Your calculations are correct. We have been watching the Academy dismiss your findings for months. The seal's degradation follows exactly the curve you plotted. Your understanding of what is happening makes you irreplaceable in what comes next.`,
        rogue:       `Every shadow network on the continent has the same whisper running through it right now. You have heard it. You know what it means. The skills you have spent your life sharpening were not, it turns out, merely for survival. They are exactly what the fight ahead requires.`,
        ranger:      `The forest told you before the scholars admitted it. You read the migration routes, the silence in the wrong places, the fear in animals that do not normally fear anything. Your instincts have been correct from the beginning. Trust them in what comes next.`,
        runesmith:   `The muscle memory is not random. The runes you keep waking with in your hands are Brennan's binding configurations — the same ones used to seal Azrath a thousand years ago. You are not learning them. You are remembering them. There is a difference, and it matters.`,
        cleric:      `The silence in your prayers is not divine absence. Something is interfering with the connection — the same force that is cracking the seal, leaking energy into the world in ways that distort everything around it. Your faith has not been misplaced. It has been obstructed. That obstruction has a name.`,
        necromancer: `Every spirit you have spoken to for the past three months has said the same thing unprompted: <em>It is coming and the dead cannot stop it.</em> You have noted this. You have not yet understood the full implication. The dead are afraid of ceasing to have ever existed. That is what Azrath does.`,
        berserker:   `We know about your village. We know what happened to the people there. We also know that what happened to them may not be permanent — that the emptying Azrath performs can be reversed if the source of it is stopped before it fully wakes. That is not a promise. But it is a reason.`,
    };

    // Tier-specific urgency block — what the seal looks like right now
    const TIER_STATUS = {
        early: `The seal still holds — barely. The tremors you have felt are its fracture lines widening. Each one is worse than the last. The scholars have calculated a timeline and stopped publishing it because the timeline is soon. You have ${levelsLeft} levels between where you stand now and where you need to be.`,
        mid:   `The seal is failing in ways that are no longer theoretical. Creatures from the deep places are surfacing with increasing frequency. The tremors are regular now. The sky near the sealing site changes on bad days. You have reached level ${level}. You have ${levelsLeft} levels left. The window is narrowing.`,
        late:  `The seal has partially fractured. What is coming through the cracks is only a hint of what comes when it breaks entirely. You are level ${level} — close enough to see the end, far enough away that the next ${levelsLeft} levels are not optional. Move.`,
        complete: `You are level 25. If you are reading this, you already know what you need to know. The seal is gone. Azrath is nearly free. Everything that has happened to you has been preparation for what happens next. We have nothing left to tell you that you have not already learned.`,
    };

    // The Crossroads paragraph — adjusted by tier
    const CROSSROADS = {
        early:    `There is a place called the Crossroads. You will find it when you are strong enough — around level ten to twelve, when the road becomes clear. Others like you are already moving toward it from every direction. Warriors, mages, rogues, rangers — each called by their own reason. The Crossroads is where those reasons converge.`,
        mid:      `If you have not yet reached the Crossroads, it sits in a valley roughly ten to twelve days from most starting points. The four elemental dungeons begin there — Wind, Fire, Earth, Water — each holding a talisman that Brennan placed there a thousand years ago as insurance. They are waiting for someone strong enough to claim them.`,
        late:     `The elemental dungeons beyond the Crossroads hold four talismans that Brennan placed there a thousand years ago. Wind, Fire, Earth, Water — each one earned through a dungeon that tests not just strength but character. If you have not collected them, do so before level twenty-five. They are what makes the final confrontation survivable.`,
        complete: ``,
    };

    // Closer — always personal
    const CLOSER = tier === 'complete'
        ? `The old man at the Crossroads gate is still at his post. The others who trained here are watching. The world is waiting to find out who you are.<br><br>We have been watching since before you knew there was anything to watch for. We have never doubted you.<br><br><em>— The Keepers of the Crossroads</em>`
        : `We have been watching you since before you knew there was anything to watch for. You have reached level ${level}. The seal has that much less time. Every level you earn from here is a level closer to the moment this has all been building toward.<br><br>Do not stop.<br><br><em>— The Keepers of the Crossroads</em>`;

    const opener  = CLASS_OPENERS[cls] || CLASS_OPENERS['warrior'];
    const status  = TIER_STATUS[tier];
    const cross   = CROSSROADS[tier];

    return { name, level, cls, tier, levelsLeft, opener, status, cross, closer: CLOSER };
}

// ── Render and show ───────────────────────────────────────────────────
function showLegacyWelcome() {
    const p = gameState.player;
    if (!p) { showTown(); return; }

    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) { showTown(); return; }

    const lore = buildLegacyLetter(p);

    // Header
    document.getElementById('welcome-char-name').textContent = lore.name;
    document.getElementById('welcome-char-class').textContent =
        (p.className || p.class || '') + '  ·  Level ' + lore.level;

    // Override dragon icon with envelope/scroll feel for the letter
    const icon = overlay.querySelector('.welcome-dragon-icon');
    if (icon) { icon.textContent = '📜'; icon.style.animation = 'none'; }

    const title = overlay.querySelector('.welcome-title');
    if (title) title.textContent = 'A Letter Found at Your Door';

    // Build segments
    const segments = [
        { type:'para',    text:`<em>${lore.name},</em>` },
        { type:'para',    text:`We have been watching you.` },
        { type:'callout', text:lore.opener },
        { type:'para',    text:lore.status },
    ];

    if (lore.cross) {
        segments.push({ type:'para', text:lore.cross });
    }

    segments.push({ type:'divider' });
    segments.push({ type:'para',   text:lore.closer });
    segments.push({ type:'town',   isTownLine:false, isLetter:true });

    // Render
    const body = document.getElementById('welcome-body');
    body.innerHTML = '';

    segments.forEach((seg, i) => {
        let el;
        if (seg.type === 'para') {
            el = document.createElement('p');
            el.className = 'welcome-para';
            el.innerHTML = seg.text;
            // No drop-cap on this one — it's a letter, not a chronicle entry
            el.style.cssText += 'font-size:15px;';
        } else if (seg.type === 'callout') {
            el = document.createElement('div');
            el.className = 'welcome-callout';
            el.innerHTML = seg.text;
        } else if (seg.type === 'divider') {
            el = document.createElement('div');
            el.className = 'welcome-divider';
            el.textContent = '✦  ·  ·  ·  ✦';
        } else if (seg.type === 'town') {
            el = document.createElement('div');
            el.className = 'welcome-town-line';
            el.innerHTML = `
                <div class="welcome-divider" style="opacity:0.4;margin-bottom:16px;">✦  ·  ·  ·  ✦</div>
                <div class="welcome-town-top">The letter can be re-read in your Chronicle</div>
                <div class="welcome-town-name" style="font-size:16px;letter-spacing:1px;">under "A Letter Found"</div>`;
        }
        if (el) {
            el.dataset.segIndex = i;
            body.appendChild(el);
        }
    });

    // Swap begin button text
    const btn = document.getElementById('welcome-begin-btn');
    if (btn) btn.textContent = 'Return to Town →';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate in
    let delay = 200;
    const allSegs = body.querySelectorAll('[data-seg-index]');
    allSegs.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
            // Gently scroll new element into view — slow and deliberate
            el.scrollIntoView({ behavior:'smooth', block:'end' });
            if (i === allSegs.length - 1) {
                setTimeout(() => {
                    if (btn) btn.classList.add('ready');
                }, 800);
            }
        }, delay);
        // Reading pace — 2.5x longer so players finish before next arrives.
        // Short single-line paras get 6s, full paras 12.5s, callouts 17.5s.
        const text = el.textContent || '';
        const isShortLine = text.trim().length < 60;
        delay += el.classList.contains('welcome-callout') ? 17500
               : isShortLine                              ? 6000
               : 12500;
    });

    // Wire begin button for legacy flow
    if (btn) {
        btn.onclick = function() { dismissLegacyWelcome(); };
    }
}

function dismissLegacyWelcome() {
    const p = gameState.player;
    if (p) {
        p.hasSeenLegacyWelcome = true;
        // Add the letter as a permanent Chronicle entry
        injectLegacyLetterIntoChronicle(p);
        saveGame();
    }
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    showTown();
}

// ── Inject a permanent Chronicle entry for the letter ─────────────────
function injectLegacyLetterIntoChronicle(p) {
    if (!p || !CHRONICLE_CONTENT) return;

    const lore   = buildLegacyLetter(p);
    const opener = lore.opener;
    const status = lore.status;
    const cross  = lore.cross;
    const closer = lore.closer;

    CHRONICLE_CONTENT['legacy_letter'] = {
        cls:   p.baseClass || p.class || 'all',
        level: 0,  // level 0 = always visible, never locked
        icon:  '📜',
        title: (n) => `A Letter Found`,
        label: 'The Keepers of the Crossroads',
        hint:  'A letter that was waiting for you.',
        body:  (n) => `
            <p style="font-size:15px;font-style:italic;">${n},</p>
            <p style="font-size:15px;">We have been watching you.</p>
            <div class="chronicle-callout">${opener}</div>
            <p style="font-size:15px;">${status}</p>
            ${cross ? `<p style="font-size:15px;">${cross}</p>` : ''}
            <div style="text-align:center;color:#5a3a18;letter-spacing:6px;margin:20px 0;font-size:14px;">✦  ·  ·  ·  ✦</div>
            <p style="font-size:15px;">${closer}</p>`,
    };

    // Add to schedule so it shows up in the Chronicle list
    if (typeof CHRONICLE_SCHEDULE !== 'undefined') {
        // Remove any existing legacy entry first
        const existingIdx = CHRONICLE_SCHEDULE.findIndex(s => s.id === 'legacy_letter');
        if (existingIdx >= 0) CHRONICLE_SCHEDULE.splice(existingIdx, 1);

        // Add at the top of the schedule
        CHRONICLE_SCHEDULE.unshift({ id:'legacy_letter', level:0, cls:'all' });
    }

    // Ensure chronicle object exists (may be absent on very old saves)
    if (!p.chronicle) p.chronicle = { unlockedEntries:[], readEntries:[] };
    if (!p.chronicle.unlockedEntries) p.chronicle.unlockedEntries = [];
    if (!p.chronicle.readEntries)     p.chronicle.readEntries     = [];

    // Mark as unlocked so it appears in the list
    if (!p.chronicle.unlockedEntries.includes('legacy_letter')) {
        p.chronicle.unlockedEntries.push('legacy_letter');
    }
    // Leave out of readEntries so the unread badge appears
}

// ── Also wire skipWelcome for legacy flow ────────────────────────────
const _origSkipWelcome = typeof skipWelcome === 'function' ? skipWelcome : null;
function skipWelcome() {
    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) return;
    overlay.querySelectorAll('[data-seg-index]').forEach(el => el.classList.add('visible'));
    const btn = document.getElementById('welcome-begin-btn');
    if (btn) btn.classList.add('ready');
    const body = document.getElementById('welcome-body');
    if (body) body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════════════════
// END LEGACY WELCOME SYSTEM
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// LEVEL-UP CEREMONY + POST-COMBAT CHRONICLE CINEMATIC
// ═══════════════════════════════════════════════════════════════════════

// ── Level-up flash + announcement ─────────────────────────────────────
function showLevelUpCeremony(newLevel) {
    const p = gameState.player;

    // 1. White screen flash
    const flash = document.getElementById('levelup-flash');
    if (flash) {
        flash.style.display = 'block';
        setTimeout(() => { flash.style.display = 'none'; }, 600);
    }

    // 2. Big announcement overlay
    const announce  = document.getElementById('levelup-announce');
    const burst     = document.getElementById('levelup-burst');
    const numEl     = document.getElementById('levelup-num');
    const subEl     = document.getElementById('levelup-sub');
    if (!announce || !burst) return;

    // Subtitle varies by milestone
    let subtitle = 'The journey continues';
    if (newLevel === 5)  subtitle = 'Azrath stirs. The tremors worsen.';
    if (newLevel === 10) subtitle = 'The Crossroads draws near.';
    if (newLevel === 13) subtitle = 'New Chronicle entries await.';
    if (newLevel === 15) subtitle = 'The talismans are within reach.';
    if (newLevel === 20) subtitle = 'Class evolution unlocked.';
    if (newLevel === 23) subtitle = 'The seal is failing.';
    if (newLevel === 25) subtitle = 'You are ready. The world is waiting.';

    if (numEl) numEl.textContent = newLevel;
    if (subEl) subEl.textContent = subtitle;

    // Reset burst animation by removing and re-adding it
    burst.classList.remove('levelup-fade-out');
    burst.style.animation = 'none';
    burst.offsetHeight; // force reflow
    burst.style.animation = '';

    announce.classList.add('show');

    // Hold for 2.2s then fade out
    setTimeout(() => {
        burst.classList.add('levelup-fade-out');
        setTimeout(() => {
            announce.classList.remove('show');
        }, 650);
    }, 2200);
}

// ── Chronicle queue — entries unlocked during combat ──────────────────
// Stored here, played after the fight is fully over.
window._pendingChronicleEntries = [];

function queueChronicleEntry(id) {
    if (!window._pendingChronicleEntries.includes(id)) {
        window._pendingChronicleEntries.push(id);
    }
}

// Called by unlockChronicleEntries when new entries come in
const _origOnChronicleUnlock = typeof onChronicleUnlock === 'function' ? onChronicleUnlock : null;
function onChronicleUnlock(newIds) {
    // Queue all new entries for post-combat playback
    newIds.forEach(id => queueChronicleEntry(id));
    // Refresh badge immediately so button glows during combat
    refreshAllBadges();
}

// ── Play pending Chronicle entries after combat ends ──────────────────
function playPendingChronicleEntries() {
    if (!window._pendingChronicleEntries || window._pendingChronicleEntries.length === 0) return;

    const ids = [...window._pendingChronicleEntries];
    window._pendingChronicleEntries = [];

    // Play them one at a time, chaining through the queue
    playChronicleEntrySequence(ids, 0);
}

function playChronicleEntrySequence(ids, index) {
    if (index >= ids.length) return;

    const id  = ids[index];
    const def = CHRONICLE_CONTENT[id];
    if (!def) {
        // Skip unknown entries
        playChronicleEntrySequence(ids, index + 1);
        return;
    }

    showChronicleCinematic(id, def, () => {
        // After this entry closes, play the next one
        playChronicleEntrySequence(ids, index + 1);
    });
}

// ── Chronicle cinematic — reuses welcome-overlay parchment ────────────
function showChronicleCinematic(id, def, onClose) {
    const p = gameState.player;
    if (!p) { if (onClose) onClose(); return; }

    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) { if (onClose) onClose(); return; }

    const playerName = p.name || 'Adventurer';
    const baseClass  = p.baseClass || p.class;

    // Mark as read
    markChronicleRead(id);

    // Header
    const icon = overlay.querySelector('.welcome-dragon-icon');
    if (icon) {
        icon.textContent = def.icon || '📖';
        icon.style.animation = 'none';
        icon.style.filter = 'drop-shadow(0 0 12px rgba(200,160,40,0.6))';
    }
    const titleEl = overlay.querySelector('.welcome-title');
    if (titleEl) titleEl.textContent = 'New Chronicle Entry';

    const nameEl = document.getElementById('welcome-char-name');
    if (nameEl) nameEl.textContent = def.label || 'Chronicle';

    const clsEl = document.getElementById('welcome-char-class');
    if (clsEl) clsEl.textContent = def.title ? def.title(playerName) : '';

    // Render body content as a single animated block
    const body = document.getElementById('welcome-body');
    if (!body) { if (onClose) onClose(); return; }
    body.innerHTML = '';

    // Parse the entry body HTML into paragraph segments
    const rawHtml = typeof def.body === 'function'
        ? def.body(playerName, baseClass, p.className || p.class)
        : (def.body || '');

    // Create a temp container to extract paragraphs and callouts
    const tmp = document.createElement('div');
    tmp.innerHTML = rawHtml;
    const nodes = Array.from(tmp.children);

    if (nodes.length === 0) {
        // Fallback: render as single block
        const el = document.createElement('div');
        el.className = 'welcome-para';
        el.innerHTML = rawHtml;
        el.dataset.segIndex = 0;
        body.appendChild(el);
    } else {
        nodes.forEach((node, i) => {
            const el = document.createElement(node.tagName.toLowerCase() === 'div' ? 'div' : 'p');
            el.className = node.className.includes('chronicle-callout') ? 'welcome-callout' : 'welcome-para';
            el.innerHTML = node.innerHTML;
            el.dataset.segIndex = i;
            body.appendChild(el);
        });
    }

    // Wire begin button
    const btn = document.getElementById('welcome-begin-btn');
    if (btn) {
        btn.textContent = 'Continue →';
        btn.classList.remove('ready');
        btn.onclick = function() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            if (onClose) setTimeout(onClose, 200);
        };
    }

    // Open overlay
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate segments
    let delay = 400;
    const allSegs = body.querySelectorAll('[data-seg-index]');
    allSegs.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
            el.scrollIntoView({ behavior: 'smooth', block: 'end' });
            if (i === allSegs.length - 1) {
                setTimeout(() => {
                    if (btn) btn.classList.add('ready');
                }, 800);
            }
        }, delay);
        const text = el.textContent || '';
        const isShortLine = text.trim().length < 60;
        delay += el.classList.contains('welcome-callout') ? 17500
               : isShortLine                              ? 6000
               : 12500;
    });
}
