// ═══════════════════════════════════════════════════════════════════════
//  town2.js  —  ASHEN HARBOR
//  A city that shouldn't exist. Built on volcanic rock, fed by the sea,
//  and run by people who ask no questions because they have no answers.
//  Discovered by surviving Dungeon1. You earned this.
// ═══════════════════════════════════════════════════════════════════════

window.TOWNS = window.TOWNS || {};

// ─────────────────────────────────────────────────────────────────────────
//  HARBOR DISTRICTS
//  Each district is a flavor card — atmosphere, not a dungeon entrance.
//  When dungeons are added, set dungeon: 'keyname' and the card goes live.
// ─────────────────────────────────────────────────────────────────────────
const T2_DISTRICTS = {
    docks: {
        label:       'THE DOCKS',
        emoji:       '⚓',
        color:       '#4eb8d4',
        colorDim:    'rgba(78,184,212,0.07)',
        colorGlow:   'rgba(78,184,212,0.22)',
        colorBorder: '#1a4f5c',
        dungeon:     null,
        tagline:     'Fortunes made. Bodies lost.',
        description: `Salt-bleached warehouses line the volcanic breakwater. Smugglers move crates after dark. The harbormaster charges three tariffs — one official, two not. Ships arrive without manifests. Every captain here has a reason to forget where they came from.`,
        lore:        `"The tide brings in what the sea no longer wants. In Ashen Harbor, we've learned not to ask what that means." — Dockworker's saying, origin unknown`
    },
    ashmarket: {
        label:       'ASH MARKET',
        emoji:       '🏺',
        color:       '#c87941',
        colorDim:    'rgba(200,121,65,0.07)',
        colorGlow:   'rgba(200,121,65,0.25)',
        colorBorder: '#5c2e0d',
        dungeon:     null,
        tagline:     'Everything has a price. Some prices are final.',
        description: `An open bazaar built in the shadow of a dead volcano. Merchants hawk cursed relics, bottled smoke, and teeth from things that don't have names yet. The vendors know what they're selling. The buyers rarely do. Caveat emptor has a different meaning here — it means <em>survive the transaction</em>.`,
        lore:        `"I paid in gold. I paid again in something I still can't name. The item was worth it. Probably." — Torn receipt found in the Market ruins, dated twelve years ago`
    },
    sunkenward: {
        label:       'THE SUNKEN WARD',
        emoji:       '🕯️',
        color:       '#9966cc',
        colorDim:    'rgba(153,102,204,0.07)',
        colorGlow:   'rgba(153,102,204,0.22)',
        colorBorder: '#3d1f5c',
        dungeon:     null,
        tagline:     'The oldest part of the city is still sinking.',
        description: `Half the Ward is underwater at high tide. The other half wishes it was. Residents build upward because they can't build out. Lanterns hang on chains from second-floor windows, swaying over streets that flood by midnight. The people who live here have been here longest. They don't leave because they've forgotten how to want to.`,
        lore:        `"Every spring the Ward sinks another inch. The mayor says it's settling. The Ward says the city is being reclaimed." — Ashen Harbor Gazette, Issue 1`
    },
    ashvault: {
        label:       'THE ASHEN VAULT',
        emoji:       '🔥',
        color:       '#FF6600',
        colorDim:    'rgba(255,102,0,0.08)',
        colorGlow:   'rgba(255,102,0,0.30)',
        colorBorder: '#7a2e00',
        dungeon:     null,
        tagline:     'The fire inside never went out.',
        description: `Beneath the harbor, carved into the volcanic plug the city was built on, lies a vault sealed since the Age of Fire. Adventurers have reached the entrance. None have filed a report afterward. The heat gets worse the deeper you go — not the heat of fire, but the heat of something <em>waiting</em>. Whatever is down there, it is patient.`,
        lore:        `"IGNIS MANET — The flame that made this city still burns at its foundation. We don't go down. We don't look. We don't talk about the sounds." — City Charter, Appendix C (classified)`
    }
};

// ─────────────────────────────────────────────────────────────────────────
//  HARBOR TIDE / WEATHER — purely cosmetic flavor, cycles on load
// ─────────────────────────────────────────────────────────────────────────
const T2_CONDITIONS = [
    { label: 'HIGH TIDE',      icon: '🌊', color: '#4eb8d4', desc: 'The docks are half-submerged. Ships strain against their moorings.' },
    { label: 'ASH SQUALL',     icon: '🌫️', color: '#999',    desc: 'Volcanic ash drifts off the caldera. Visibility: poor. Lungs: worse.' },
    { label: 'BLOOD FOG',      icon: '🩸', color: '#cc4444', desc: 'A crimson mist rolls in from the deep water. Origins disputed.' },
    { label: 'DEAD CALM',      icon: '💀', color: '#666',    desc: 'No wind. No waves. The harbor holds its breath. Something is watching.' },
    { label: 'EMBER RAIN',     icon: '✨', color: '#FF9933', desc: 'Sparks fall from the caldera above. Beautiful. Mildly dangerous.' },
    { label: 'IRON GALE',      icon: '⚡', color: '#aaaacc', desc: 'Storm winds off the volcanic peaks. Only fools sail today — and they do.' },
];

// ─────────────────────────────────────────────────────────────────────────
//  WANTED BOARD — rotating notices, flavor only
// ─────────────────────────────────────────────────────────────────────────
const T2_WANTED = [
    { name: 'THE HARBORMASTER',  bounty: '???g',    crime: 'Everything. Specifically, everything.',                       status: 'DO NOT APPROACH' },
    { name: 'MIRA OF NO SURNAME',bounty: '8,000g',  crime: 'Sold the city six barrels of "bottled time". It worked.',    status: 'APPROACH WITH GOLD' },
    { name: 'THE TIDECALLER',    bounty: '15,000g', crime: 'Called the tide. The tide answered.',                         status: 'ARMED. VERY WET.' },
    { name: 'GREN ASHFOOT',      bounty: '3,200g',  crime: 'Stole the mayor\'s face. Literally. Still wearing it.',       status: 'WANTED ALIVE' },
    { name: 'THE SMOKING MAN',   bounty: '22,000g', crime: 'Opened the Vault on a Tuesday. Left it open.',                status: 'EXTREMELY DANGEROUS' },
    { name: 'CAPTAIN VOSS',      bounty: '6,500g',  crime: 'Smuggling. Fraud. Being extraordinarily smug about it.',      status: 'PROBABLY AT THE BAR' },
];

// ─────────────────────────────────────────────────────────────────────────
//  TOWN DEFINITION
// ─────────────────────────────────────────────────────────────────────────
window.TOWNS.town2 = {
    id:          'town2',
    name:        'Ashen Harbor',
    description: 'A grim port city built on volcanic rock. The smell of ash and salt fills the air. Few make it this far — those who do are changed.',
    theme:       '#FF6600',

    dungeonKey:           null,   // The Ashen Vault — to be added
    dungeonName:          'THE ASHEN VAULT',
    dungeonDescription:   'A vault sealed since the Age of Fire. Only the bravest dare its halls.',
    dungeonRequiredLevel: 10,
    dungeonUnlockMessage: 'You must be at least level 10 to enter the Ashen Vault!',

    zones: ['haunted_graveyard', 'dark_swamp'],
    services: { shop: true, bank: true, inn: true, temple: true },

    portalDestination:  'town1',
    portalRequires:     'white_runestone',

    // ─────────────────────────────────────────────────────────────────────
    //  CUSTOM RENDERER
    // ─────────────────────────────────────────────────────────────────────
    render(screen, p, dungeonOption, portalOption) {

        // ── Inject styles once ──────────────────────────────────────────
        if (!document.getElementById('t2-styles')) {
            const s = document.createElement('style');
            s.id = 't2-styles';
            s.textContent = `
                @keyframes t2-ember {
                    0%   { transform: translateY(0)   translateX(0)   scale(1);   opacity: 0.7; }
                    50%  { transform: translateY(-18px) translateX(4px) scale(0.85); opacity: 0.4; }
                    100% { transform: translateY(-34px) translateX(-3px) scale(0.6); opacity: 0; }
                }
                @keyframes t2-flicker {
                    0%,90%,100% { opacity: 1;    }
                    92%          { opacity: 0.15; }
                    96%          { opacity: 0.75; }
                }
                @keyframes t2-tide {
                    0%,100% { transform: translateX(0);    }
                    50%     { transform: translateX(-12px); }
                }
                @keyframes t2-pulse {
                    0%,100% { opacity: 1;   box-shadow: 0 0 8px  rgba(255,102,0,0.3); }
                    50%     { opacity: 0.6; box-shadow: 0 0 22px rgba(255,102,0,0.6); }
                }
                @keyframes t2-wanted-scroll {
                    0%   { opacity: 0; transform: translateY(6px);  }
                    8%   { opacity: 1; transform: translateY(0);     }
                    88%  { opacity: 1; transform: translateY(0);     }
                    100% { opacity: 0; transform: translateY(-6px);  }
                }
                @keyframes t2-scanline {
                    0%   { top: -8%;   }
                    100% { top:  108%; }
                }
                @keyframes t2-glow-pulse {
                    0%,100% { text-shadow: 0 0 8px #FF6600, 0 0 18px rgba(255,102,0,0.4); }
                    50%     { text-shadow: 0 0 16px #FF9933, 0 0 36px rgba(255,153,51,0.6); }
                }
                .t2-district {
                    border: 2px solid;
                    border-radius: 8px;
                    padding: 12px 14px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.15s ease, box-shadow 0.2s ease;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
                .t2-district::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%);
                    pointer-events: none;
                }
                .t2-district:hover  { transform: translateY(-3px) scale(1.015); }
                .t2-district:active { transform: scale(0.97); }
                .t2-district-scanline {
                    position: relative; overflow: hidden;
                }
                .t2-district-scanline::after {
                    content: '';
                    position: absolute; left: 0; right: 0;
                    height: 8%;
                    background: linear-gradient(180deg,
                        transparent 0%, rgba(255,255,255,0.025) 50%, transparent 100%);
                    animation: t2-scanline 9s linear infinite;
                    pointer-events: none;
                }
                .t2-row {
                    border: 1px solid #2a1a0d;
                    border-radius: 5px;
                    padding: 9px 13px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: border-color 0.2s, background 0.2s, transform 0.1s;
                    -webkit-tap-highlight-color: transparent;
                }
                .t2-row:hover {
                    background: rgba(255,102,0,0.06);
                    border-color: #7a3000;
                    transform: translateX(3px);
                }
                .t2-portal-row {
                    border: 1px solid #4a3366;
                    background: rgba(100,60,180,0.06);
                    border-radius: 5px;
                    padding: 9px 13px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: background 0.2s, transform 0.1s;
                    -webkit-tap-highlight-color: transparent;
                }
                .t2-portal-row:hover {
                    background: rgba(100,60,180,0.16);
                    transform: translateX(3px);
                }
                .t2-divider {
                    font-size: 8px;
                    color: #2e1a0a;
                    letter-spacing: 4px;
                    text-align: center;
                    margin: 10px 0 6px;
                }
                .t2-wanted-card {
                    animation: t2-wanted-scroll 6s ease-in-out infinite;
                }
            `;
            document.head.appendChild(s);
        }

        // ── Pick today's harbor condition (changes each page load, stable per session) ──
        const condIdx   = (typeof _t2CondIdx !== 'undefined') ? _t2CondIdx : (window._t2CondIdx = Math.floor(Math.random() * T2_CONDITIONS.length));
        const condition = T2_CONDITIONS[condIdx];

        // ── Pick a wanted notice (rotates every ~8s via CSS, we just pick one to start) ──
        const wantedIdx  = Math.floor(Math.random() * T2_WANTED.length);
        const wanted     = T2_WANTED[wantedIdx];

        // ── Helper values ───────────────────────────────────────────────
        const innCost   = (typeof calcInnCost  === 'function') ? calcInnCost(p.cha) : '?';
        const bankGold  = p.bankGold || 0;
        const modem     = (typeof currentModemSpeed !== 'undefined') ? currentModemSpeed : '—';
        const t1name    = (typeof TOWNS !== 'undefined' && TOWNS.town1) ? TOWNS.town1.name : 'Silverdale';
        const t3name    = (typeof TOWNS !== 'undefined' && TOWNS.town3) ? TOWNS.town3.name : 'Crossroads of the World';
        const hasVisitedTown3 = !!p.hasSeenTownArrival_town3;

        // ── Runestone badges ────────────────────────────────────────────
        let badges = '';
        if (p.runestones && p.runestones.length) {
            badges = p.runestones.map(id => {
                const rs = (typeof RUNESTONES !== 'undefined') ? RUNESTONES[id] : null;
                if (!rs) return '';
                return `<span title="${rs.name}: ${rs.description}"
                              style="color:${rs.color};font-size:15px;
                                     text-shadow:0 0 8px ${rs.color};cursor:default;"
                        >${rs.badgeSymbol}</span>`;
            }).join(' ');
        }

        // ── Live bounty teaser — pick one active/available bounty to spotlight ──
        let wantedBoardTeaser = '';
        if (typeof BOUNTIES !== 'undefined') {
            const _bp = p.pendingBounties  || [];
            const _ba = p.activeBounties   || [];
            const _allB = Object.values(BOUNTIES).sort((a,b) => a.level - b.level);
            let _featured = _allB.find(b => _bp.includes(b.id))
                         || _allB.find(b => _ba.includes(b.id))
                         || _allB.find(b => p.level >= b.level - 1 && !((p.collectedBounties||{})[b.id]));
            if (!_featured) _featured = _allB[0];
            const _isPending = _bp.includes(_featured.id);
            const _isActive  = _ba.includes(_featured.id);
            const _statusLine = _isPending
                ? '<span style="color:#FFD700;font-size:10px;letter-spacing:2px;">\u{1F4B0} READY TO COLLECT</span>'
                : _isActive
                ? '<span style="color:#cc66ff;font-size:10px;letter-spacing:2px;">\u26A0 CURRENTLY HUNTING</span>'
                : '<span style="color:#cc7700;font-size:10px;letter-spacing:2px;">AVAILABLE</span>';
            wantedBoardTeaser = `
            <div style="margin:0 0 10px;padding:10px 13px;
                        background:rgba(50,0,70,0.35);
                        border:1px solid #3a1a5c;
                        border-left:3px solid #cc66ff;
                        border-radius:0 6px 6px 0;
                        cursor:pointer;
                        transition:background 0.2s;"
                 onclick="showBountyBoard()"
                 onmouseenter="this.style.background='rgba(80,0,110,0.4)'"
                 onmouseleave="this.style.background='rgba(50,0,70,0.35)'">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                    <div style="font-size:8px;letter-spacing:4px;color:#9966cc;">\u26A0 &nbsp; WANTED &nbsp; NOTICE &nbsp; \u26A0</div>
                    <div style="font-size:9px;color:#bb88cc;letter-spacing:2px;">TAP TO VIEW BOARD \u2192</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
                    <span style="font-size:20px;">${_featured.emoji}</span>
                    <span style="color:#cc66ff;font-size:14px;font-weight:bold;letter-spacing:1px;
                                 text-shadow:0 0 10px rgba(204,102,255,0.5);">
                        ${_featured.name}
                    </span>
                    <span style="color:#FFD700;font-size:12px;">${_featured.bountyGold.toLocaleString()}g</span>
                </div>
                <div style="font-size:10px;color:#bb88cc;margin-bottom:4px;">${_featured.crime}</div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="color:#9966cc;font-size:9px;">Lv ${_featured.level} \u00B7 ${_featured.zoneName}</span>
                    ${_statusLine}
                </div>
            </div>`;
        } else {
            wantedBoardTeaser = `
            <div style="margin:0 0 10px;padding:10px 13px;
                        background:rgba(60,20,0,0.4);border:1px solid #3a1800;
                        border-left:3px solid #FF6600;border-radius:0 6px 6px 0;">
                <div style="font-size:8px;letter-spacing:4px;color:#cc7700;margin-bottom:6px;">\u26A0 WANTED NOTICE \u26A0</div>
                <div style="font-size:11px;color:#7a4a20;">Loading bounty data...</div>
            </div>`;
        }

                // ── Ember particles (decorative) ────────────────────────────────
        const embers = Array.from({length: 6}, (_, i) => `
            <div style="position:absolute;
                        left:${10 + i * 15}%;
                        bottom:0;
                        font-size:${6 + (i % 3) * 3}px;
                        color:#FF6600;
                        opacity:0.5;
                        animation:t2-ember ${2.5 + i * 0.7}s ease-out infinite;
                        animation-delay:${i * 0.9}s;
                        pointer-events:none;">✦</div>`
        ).join('');

        // ── Tide strip at top ───────────────────────────────────────────
        const tideStrip = `
        <div style="background:linear-gradient(90deg,
                        transparent,rgba(78,184,212,0.12),rgba(78,184,212,0.12),transparent);
                    padding:5px 14px;
                    border-top:1px solid #0d2a33;
                    border-bottom:1px solid #0d2a33;
                    display:flex;align-items:center;gap:10px;
                    font-size:10px;margin-bottom:6px;">
            <span style="animation:t2-tide 3s ease-in-out infinite;display:inline-block;">
                ${condition.icon}
            </span>
            <span style="color:${condition.color};letter-spacing:2px;font-size:9px;">
                ${condition.label}
            </span>
            <span style="color:#997755;font-size:9px;flex:1;">
                — ${condition.desc}
            </span>
        </div>`;

        // ── Wanted board ────────────────────────────────────────────────
        const wantedBoard = `
        <div style="margin:0 0 10px;padding:10px 13px;
                    background:rgba(60,20,0,0.4);
                    border:1px solid #3a1800;
                    border-left:3px solid #FF6600;
                    border-radius:0 6px 6px 0;position:relative;overflow:hidden;">
            <div style="font-size:8px;letter-spacing:4px;color:#cc7700;margin-bottom:6px;">
                ⚠ &nbsp; WANTED &nbsp; NOTICE &nbsp; ⚠
            </div>
            <div class="t2-wanted-card">
                <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:3px;">
                    <span style="color:#FF9933;font-size:13px;font-weight:bold;
                                 letter-spacing:1px;animation:t2-glow-pulse 3s ease-in-out infinite;">
                        ${wanted.name}
                    </span>
                    <span style="color:#FFD700;font-size:11px;">
                        ${wanted.bounty}
                    </span>
                </div>
                <div style="font-size:10px;color:#7a4a20;margin-bottom:2px;">
                    ${wanted.crime}
                </div>
                <div style="font-size:9px;color:#aa5500;letter-spacing:2px;">
                    STATUS: <span style="color:#cc4400;">${wanted.status}</span>
                </div>
            </div>
        </div>`;

        // ── Portals ─────────────────────────────────────────────────────
        let portals = `
            <div class="t2-portal-row" onclick="usePortal('town1')">
                🌀 &nbsp;PORTAL → <strong>${t1name}</strong>
                <span style="font-size:10px;color:#9966aa;margin-left:8px;">the green hills you left behind</span>
            </div>`;
        if (hasVisitedTown3) {
            portals += `
            <div class="t2-portal-row" onclick="usePortal('town3')"
                 style="border-color:#5a4000;background:rgba(255,215,0,0.04);">
                🌀 &nbsp;PORTAL → <strong>${t3name}</strong>
                <span style="font-size:10px;color:#aa8800;margin-left:8px;">beyond the edge of the world</span>
            </div>`;
        }

        // ── Compose final screen ────────────────────────────────────────
        screen.style.position = 'relative';
        screen.innerHTML = `

            <!-- ░░ TOP EMBER STRIP ░░ -->
            <div style="position:relative;height:4px;overflow:hidden;z-index:5;">
                <div style="position:absolute;inset:0;
                    background:linear-gradient(90deg,
                        #1a0800,#FF6600,#FF9933,#FF6600,#cc3300,#FF6600,#FF9933,#1a0800);
                    background-size:200% auto;
                    animation:t2-tide 6s ease-in-out infinite;"></div>
            </div>

            <!-- ░░ HEADER ░░ -->
            <div style="text-align:center;padding:18px 12px 8px;position:relative;overflow:hidden;">
                ${embers}
                <div style="font-size:9px;letter-spacing:5px;color:#996633;margin-bottom:8px;
                            animation:t2-flicker 11s ease-in-out infinite;">
                    ✦ &nbsp; Y O U &nbsp; S U R V I V E D &nbsp; ✦
                </div>

                <div style="font-size:19px;font-weight:bold;letter-spacing:3px;
                            line-height:1.2;margin-bottom:6px;
                            color:#FF6600;
                            animation:t2-glow-pulse 4s ease-in-out infinite;">
                    ASHEN<br>HARBOR
                </div>

                <div style="font-size:9px;letter-spacing:3px;color:#aa5500;margin-bottom:6px;">
                    PORT &nbsp; OF &nbsp; THE &nbsp; DAMNED &nbsp; &amp; &nbsp; THE &nbsp; DETERMINED
                </div>

                <div style="font-size:18px;letter-spacing:8px;">
                    ${badges}
                </div>
            </div>

            <!-- ░░ PLAYER STATS ░░ -->
            ${typeof renderPlayerStats === 'function' ? renderPlayerStats() : ''}

            <!-- ░░ TIDE / WEATHER ░░ -->
            ${tideStrip}

            <!-- ░░ ARRIVAL LORE ░░ -->
            <div style="margin:0 0 8px;padding:12px 15px;
                        background:linear-gradient(135deg,rgba(255,102,0,0.04),rgba(0,0,0,0));
                        border-left:3px solid #5a1a00;
                        border-radius:0 6px 6px 0;
                        animation:t2-flicker 16s ease-in-out infinite;">
                <div style="font-size:10px;color:#5a3820;line-height:1.8;">
                    Ashen Harbor was built where it was because no sane person would follow.
                    It has no official government, three unofficial ones, and a harbormaster
                    whose authority nobody questions because nobody has survived questioning it.
                    You are here because you were
                    <span style="color:#FF9933;text-shadow:0 0 6px #FF660066;">strong enough</span>
                    to reach it — or desperate enough.
                    In Ashen Harbor, those are
                    <em style="color:#cc4400;">the same thing</em>.
                </div>
                <div style="font-size:9px;color:#996633;margin-top:5px;font-style:italic;">
                    MODEM: ${modem}
                </div>
            </div>

            <!-- ░░ WANTED BOARD TEASER ░░ -->
            ${wantedBoardTeaser}

            <!-- ░░ SERVICES ░░ -->
            <div class="t2-divider">◈ &nbsp; HARBOR &nbsp; SERVICES &nbsp; ◈</div>
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px;">

                <div class="t2-row" onclick="showBountyBoard()"
                     style="border-color:#9966cc;background:rgba(204,102,255,0.05);">
                    ► ⚓ &nbsp;WANTED BOARD
                    <span style="font-size:10px;color:#9966cc;margin-left:8px;">
                        bounties, criminals &amp; prizes
                    </span>
                </div>

                <div class="t2-row" onclick="showShop()"
                     style="border-color:#aa5500;background:rgba(255,102,0,0.03);">
                    ► 🛒 &nbsp;ASH MARKET SHOP
                    <span style="font-size:10px;color:#996633;margin-left:8px;">
                        weapons, armor &amp; darker things
                    </span>
                </div>

                <div class="t2-row" onclick="showBank()">
                    ► 🏦 &nbsp;VAULT &amp; HARBOR BANK
                    <span style="font-size:10px;color:#996633;margin-left:8px;">
                        ${bankGold}g buried deep
                    </span>
                </div>

                <div class="t2-row" onclick="showTemple()">
                    ► ⛪ &nbsp;THE ASH CHAPEL
                    <span style="font-size:10px;color:#996633;margin-left:8px;">
                        gods of fire and salt
                    </span>
                </div>

                <div class="t2-row" onclick="restAtInn()">
                    ► 🌙 &nbsp;THE EMBER INN
                    <span style="font-size:10px;color:#996633;margin-left:8px;">
                        ${innCost}g — sleep light, dream darker
                    </span>
                </div>

                <div class="t2-row" onclick="showBlacksmith()">
                    ► ⚒️ &nbsp;SLAG &amp; STEEL FORGE
                    <span style="font-size:10px;color:#996633;margin-left:8px;">
                        volcanic-tempered craftsmanship
                    </span>
                </div>

                <div class="t2-row" onclick="showCharacterStats()">► 📊 &nbsp;CHARACTER STATS</div>
                <div class="t2-row" onclick="showInventory()">► 🎒 &nbsp;INVENTORY</div>
                <div class="t2-row" onclick="showExplore()">► 🗺 &nbsp;EXPLORE WORLD</div>
            </div>

            <!-- ░░ PORTALS ░░ -->
            <div class="t2-divider">◈ &nbsp; HARBOR &nbsp; PORTALS &nbsp; ◈</div>
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px;">
                ${portals}
            </div>

            <!-- ░░ FOOTER ░░ -->
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:18px;">
                <div class="t2-row" onclick="showSettings()">► ⚙️ SETTINGS</div>
                <div class="t2-row" onclick="saveGame()" style="border-color:#aa5500;">
                    ► 💾 &nbsp;QUICK SAVE
                </div>
                <div class="t2-row" onclick="downloadSaveFile()">
                    ► 📥 &nbsp;DOWNLOAD SAVE FILE
                </div>

                <div class="menu-option" onclick="cloudSave()" style="border-color: #AA88FF;">► ☁️ SAVE TO CLOUD</div>
                <div class="t2-row" onclick="confirmQuitToMenu()" style="border-color:#3a0a0a;">
                    ► ⏏ &nbsp;QUIT TO MENU
                </div>
            </div>

            <!-- ░░ BOTTOM EMBER STRIP ░░ -->
            <div style="height:4px;border-radius:2px;margin-bottom:6px;
                background:linear-gradient(90deg,
                    #1a0800,#FF6600,#FF9933,#cc3300,#FF6600,#FF9933,#1a0800);
                background-size:200% auto;
                animation:t2-tide 6s ease-in-out infinite reverse;"></div>
        `;
    }
};

// ─────────────────────────────────────────────────────────────────────────
//  DISTRICT LORE POPUP
// ─────────────────────────────────────────────────────────────────────────
window.t2ShowDistrict = function(key) {
    const d = T2_DISTRICTS[key];
    if (!d) return;

    const old = document.getElementById('t2-district-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 't2-district-overlay';
    overlay.style.cssText =
        'position:fixed;inset:0;z-index:99999;' +
        'display:flex;align-items:center;justify-content:center;' +
        'background:rgba(0,0,0,0.90);backdrop-filter:blur(8px);' +
        '-webkit-tap-highlight-color:transparent;';

    overlay.innerHTML = `
        <div style="background:#050302;
                    border:2px solid ${d.colorBorder};
                    border-radius:12px;
                    padding:28px 26px;
                    max-width:360px;
                    width:92%;
                    box-shadow:0 0 80px ${d.colorGlow};
                    font-family:'Courier New',monospace;
                    text-align:center;
                    position:relative;overflow:hidden;">

            <!-- Top accent -->
            <div style="position:absolute;top:0;left:0;right:0;height:3px;
                        background:linear-gradient(90deg,transparent,${d.color},transparent);
                        opacity:0.5;"></div>
            <div style="position:absolute;bottom:0;left:0;right:0;height:3px;
                        background:linear-gradient(90deg,transparent,${d.color},transparent);
                        opacity:0.5;"></div>

            <!-- Emoji -->
            <div style="font-size:50px;margin-bottom:12px;display:inline-block;
                        animation:t2-flicker 8s ease-in-out infinite;">${d.emoji}</div>

            <!-- Title -->
            <div style="font-size:15px;font-weight:bold;letter-spacing:3px;margin-bottom:4px;
                        color:${d.color};
                        text-shadow:0 0 14px ${d.color},0 0 28px ${d.colorGlow};">
                ${d.label}
            </div>
            <div style="font-size:9px;color:#996633;letter-spacing:4px;margin-bottom:14px;">
                ASHEN &nbsp; HARBOR
            </div>

            <!-- Description -->
            <div style="font-size:11px;color:#5a3820;line-height:1.75;
                        text-align:left;margin-bottom:14px;">
                ${d.description}
            </div>

            <!-- Lore quote -->
            <div style="font-size:10px;color:#996633;font-style:italic;line-height:1.65;
                        border-top:1px solid #1a0800;padding-top:12px;margin-bottom:16px;
                        text-align:left;">
                ${d.lore}
            </div>

            <!-- Sealed notice -->
            <div style="font-size:11px;color:#cc7700;margin-bottom:18px;line-height:1.6;">
                ⏳ &nbsp;This district is not yet open.<br>
                <span style="color:#2e1400;font-size:10px;">
                    Come back when you're stronger. Or more desperate.
                </span>
            </div>

            <!-- Close button -->
            <button onclick="document.getElementById('t2-district-overlay').remove()"
                style="padding:9px 28px;
                       font-family:'Courier New',monospace;
                       font-size:12px;letter-spacing:2px;
                       text-transform:uppercase;cursor:pointer;
                       background:transparent;
                       color:${d.color};
                       border:2px solid ${d.colorBorder};
                       border-radius:5px;
                       transition:background 0.2s;
                       -webkit-tap-highlight-color:transparent;">
                ✕ &nbsp;CLOSE
            </button>
        </div>
    `;

    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
};
