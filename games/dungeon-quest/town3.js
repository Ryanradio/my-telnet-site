// ═══════════════════════════════════════════════════════════════════════
//  town3.js  —  CROSSROADS OF THE WORLD
//  The elemental nexus. Four paths. One destiny.
//  Hard-earned. Worth every step.
// ═══════════════════════════════════════════════════════════════════════

window.TOWNS = window.TOWNS || {};

// ─────────────────────────────────────────────────────────────────────────
//  ELEMENTAL DEFINITIONS
//  Each element owns a direction, color palette, lore, and future dungeonKey.
//  Set dungeonKey to the matching DUNGEONS key when that wing is built.
// ─────────────────────────────────────────────────────────────────────────
const T3_ELEMENTS = {
    earth: {
        label:       'EARTH',
        direction:   'NORTH',
        emoji:       '🌿',
        symbol:      '⬆',
        color:       '#7CFC00',
        colorDim:    'rgba(124,252,0,0.08)',
        colorGlow:   'rgba(124,252,0,0.28)',
        colorBorder: '#2f6200',
        dungeon:     null,   // → set to dungeonKey when North wing is built
        tagline:     'The living rock never forgets.',
        description: `Deep beneath the Crossroads, roots older than civilization
                      strangle the stone walls of the <strong style="color:#7CFC00;">Stone Labyrinth</strong>.
                      Mossy corridors descend in spirals. Ancient golems stand frozen mid-step,
                      waiting for a heartbeat to wake them. The earth here is alive —
                      and it is very, very hungry.`,
        lore:        `"TERRA INFINITUM — We carved our names into the first stone we found.
                      By the final chamber, we had forgotten our names entirely."
                      — Last journal entry found at the North Gate`
    },
    fire: {
        label:       'FIRE',
        direction:   'EAST',
        emoji:       '🔥',
        symbol:      '➡',
        color:       '#FF6A00',
        colorDim:    'rgba(255,106,0,0.08)',
        colorGlow:   'rgba(255,106,0,0.28)',
        colorBorder: '#8a2900',
        dungeon:     null,   // → set to dungeonKey when East wing is built
        tagline:     'Only the fearless emerge reforged.',
        description: `Heat warps the air at the Eastern arch. The <strong style="color:#FF6A00;">Ember Vault</strong>
                      stretches through volcanic caverns where the walls sweat molten gold.
                      Flame elementals patrol corridors of obsidian. The treasure within is
                      immense — but so is the cost. Adventurers who enter smelling of hesitation
                      never come back.`,
        lore:        `"IGNIS ETERNUM — I lost my sword on the second level. My fear on the third.
                      By the fourth, I had become something new entirely."
                      — Inscription burned into the East Gate stone`
    },
    wind: {
        label:       'WIND',
        direction:   'WEST',
        emoji:       '💨',
        symbol:      '⬅',
        color:       '#00DDFF',
        colorDim:    'rgba(0,221,255,0.07)',
        colorGlow:   'rgba(0,221,255,0.22)',
        colorBorder: '#005f7a',
        dungeon:     null,   // → set to dungeonKey when West wing is built
        tagline:     'The wind whispers every name it has ever carried.',
        description: `The Western arch howls even when the air is still.
                      The <strong style="color:#00DDFF;">Sky Spire</strong> coils upward through
                      cloud-piercing heights. Platforms of floating stone shift without warning.
                      Invisible currents throw unprepared travelers into the abyss.
                      Those with light feet and lighter minds reach summits no map has ever shown.`,
        lore:        `"VENTUS AETERNUS — It doesn't push you. It tests whether you were
                      ever really standing still to begin with."
                      — Chiseled into the West Gate by an unknown hand, at an impossible height`
    },
    water: {
        label:       'WATER',
        direction:   'SOUTH',
        emoji:       '🌊',
        symbol:      '⬇',
        color:       '#3399FF',
        colorDim:    'rgba(51,153,255,0.07)',
        colorGlow:   'rgba(51,153,255,0.22)',
        colorBorder: '#0d3a7a',
        dungeon:     null,   // → set to dungeonKey when South wing is built
        tagline:     'The deep does not give back what it takes.',
        description: `Cold seeps through the Southern arch even on the warmest days.
                      The <strong style="color:#3399FF;">Drowned Archive</strong> lies submerged —
                      a library of a civilization that chose the ocean over the sky.
                      Half-flooded corridors hide creatures that evolved in total darkness.
                      The treasures are real. So are the things guarding them.`,
        lore:        `"AQUA PROFUNDIS — Every time the tide came in, we lost someone.
                      Every time it went out, we found something we hadn't known to look for."
                      — Final log of the Deepwater Expedition, South Archive Level 9`
    }
};

// ─────────────────────────────────────────────────────────────────────────
//  TOWN DEFINITION
// ─────────────────────────────────────────────────────────────────────────
window.TOWNS.town3 = {
    id:          'town3',
    name:        'Crossroads of the World',
    description: 'The elemental nexus — where Earth, Fire, Wind and Water meet at the edge of the known world.',
    theme:       '#FFD700',

    dungeonKey:           null,
    dungeonName:          null,
    dungeonDescription:   null,
    dungeonRequiredLevel: null,
    dungeonUnlockMessage: null,

    zones: [],
    services: { shop: true, bank: true, inn: true, temple: true },

    portalDestinations: ['town1', 'town2'],
    portalRequires:     'yellow_runestone',

    // ─────────────────────────────────────────────────────────────────────
    //  CUSTOM RENDERER
    //  Called by showTown() when townDef.render exists.
    //  Owns the entire screen — full creative control.
    // ─────────────────────────────────────────────────────────────────────
    render(screen, p, dungeonOption, portalOption) {

        // ── Inject styles once ──────────────────────────────────────────
        if (!document.getElementById('t3-styles')) {
            const s = document.createElement('style');
            s.id = 't3-styles';
            s.textContent = `
                @keyframes t3-shimmer {
                    0%   { background-position: -250% center; }
                    100% { background-position:  250% center; }
                }
                @keyframes t3-float {
                    0%, 100% { transform: translateY(0);   }
                    50%      { transform: translateY(-6px); }
                }
                @keyframes t3-pulse-opacity {
                    0%, 100% { opacity: 1;    }
                    50%      { opacity: 0.45; }
                }
                @keyframes t3-rotate {
                    from { transform: rotate(0deg);   }
                    to   { transform: rotate(360deg); }
                }
                @keyframes t3-flicker {
                    0%,92%,100% { opacity: 1;   }
                    94%          { opacity: 0.2; }
                    97%          { opacity: 0.8; }
                }
                @keyframes t3-scanline {
                    0%   { top: -8%; }
                    100% { top: 108%; }
                }
                .t3-arch {
                    border: 2px solid;
                    border-radius: 8px;
                    padding: 12px 14px;
                    cursor: pointer;
                    transition: transform 0.15s ease, box-shadow 0.2s ease;
                    position: relative;
                    overflow: hidden;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
                .t3-arch::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
                    pointer-events: none;
                }
                .t3-arch:hover  { transform: translateY(-3px) scale(1.015); }
                .t3-arch:active { transform: scale(0.97); }

                .t3-title-shimmer {
                    background: linear-gradient(90deg,
                        #7CFC00 0%, #b8ff60 10%,
                        #FFD700 22%, #ffec80 32%,
                        #FF6A00 44%, #ff9a55 54%,
                        #3399FF 66%, #88ccff 76%,
                        #00DDFF 88%, #7CFC00 100%);
                    background-size: 250% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: t3-shimmer 6s linear infinite;
                }
                .t3-row {
                    border: 1px solid #252525;
                    border-radius: 5px;
                    padding: 9px 13px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: border-color 0.2s, background 0.2s, transform 0.1s;
                    -webkit-tap-highlight-color: transparent;
                }
                .t3-row:hover {
                    background: rgba(255,215,0,0.05);
                    border-color: #7a5800;
                    transform: translateX(3px);
                }
                .t3-portal-row {
                    border: 1px solid #6644aa;
                    background: rgba(110,68,200,0.06);
                    border-radius: 5px;
                    padding: 9px 13px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: background 0.2s, transform 0.1s;
                    -webkit-tap-highlight-color: transparent;
                }
                .t3-portal-row:hover {
                    background: rgba(110,68,200,0.16);
                    transform: translateX(3px);
                }
                .t3-divider {
                    font-size: 8px;
                    color: #333;
                    letter-spacing: 4px;
                    text-align: center;
                    margin: 10px 0 6px;
                }
                .t3-scanline-wrap {
                    position: relative;
                    overflow: hidden;
                }
                .t3-scanline-wrap::after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0;
                    height: 8%;
                    background: linear-gradient(180deg,
                        transparent 0%,
                        rgba(255,255,255,0.03) 50%,
                        transparent 100%);
                    animation: t3-scanline 7s linear infinite;
                    pointer-events: none;
                }
            `;
            document.head.appendChild(s);
        }

        // ── Helper values ───────────────────────────────────────────────
        const t1name    = (typeof TOWNS !== 'undefined' && TOWNS.town1) ? TOWNS.town1.name : 'Silverdale';
        const t2name    = (typeof TOWNS !== 'undefined' && TOWNS.town2) ? TOWNS.town2.name : 'Ashen Harbor';
        const innCost   = (typeof calcInnCost  === 'function') ? calcInnCost(p.cha)     : '?';
        const modem     = (typeof currentModemSpeed !== 'undefined') ? currentModemSpeed : '—';
        const bankGold  = p.bankGold || 0;

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

        // ── Elemental arch cards ────────────────────────────────────────
        const elemKeys   = ['earth', 'fire', 'wind', 'water'];
        const archCards  = elemKeys.map((key, i) => {
            const el       = T3_ELEMENTS[key];
            const hasDung  = !!el.dungeon;
            const clickFn  = hasDung ? `enterTownDungeon('${el.dungeon}')` : `t3ShowElement('${key}')`;
            const badge    = hasDung
                ? `<span style="color:${el.color};font-size:11px;font-weight:bold;
                              letter-spacing:1px;animation:t3-pulse-opacity 1.8s ease-in-out infinite;
                              animation-delay:${i * 0.4}s;">► ENTER</span>`
                : `<span style="color:#333;font-size:10px;letter-spacing:1px;">⬡ SEALED</span>`;

            return `
            <div class="t3-arch t3-scanline-wrap"
                 style="border-color:${el.colorBorder};
                        background:${el.colorDim};
                        box-shadow:0 0 14px ${el.colorGlow}, inset 0 1px 0 rgba(255,255,255,0.04);"
                 onclick="${clickFn}"
                 onmouseenter="this.style.boxShadow='0 0 28px ${el.colorGlow}, inset 0 1px 0 rgba(255,255,255,0.04)'"
                 onmouseleave="this.style.boxShadow='0 0 14px ${el.colorGlow}, inset 0 1px 0 rgba(255,255,255,0.04)'">

                <!-- Direction compass symbol -->
                <div style="position:absolute;top:8px;right:10px;font-size:18px;color:${el.colorBorder};
                            opacity:0.5;pointer-events:none;">${el.symbol}</div>

                <!-- Title row -->
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:7px;">
                    <span style="font-size:26px;
                                 animation:t3-float 3.5s ease-in-out infinite;
                                 animation-delay:${i * 0.6}s;
                                 display:inline-block;">${el.emoji}</span>
                    <div>
                        <div style="color:${el.color};font-size:13px;font-weight:bold;
                                    letter-spacing:2px;
                                    text-shadow:0 0 10px ${el.color},0 0 20px ${el.colorGlow};">
                            ${el.label}
                        </div>
                        <div style="color:#444;font-size:9px;letter-spacing:3px;margin-top:1px;">
                            ${el.direction} PATH
                        </div>
                    </div>
                    <div style="margin-left:auto;">${badge}</div>
                </div>

                <!-- Tagline -->
                <div style="font-size:10px;color:${el.color};opacity:0.6;
                            font-style:italic;margin-bottom:6px;padding-left:2px;
                            animation:t3-flicker 12s ease-in-out infinite;
                            animation-delay:${i * 1.3}s;">
                    "${el.tagline}"
                </div>

                <!-- Description -->
                <div style="font-size:10px;color:#666;line-height:1.65;padding-left:2px;">
                    ${el.description}
                </div>
            </div>`;
        }).join('');

        // ── Central nexus sigil (decorative ASCII art) ──────────────────
        const sigil = `
        <div style="text-align:center;padding:10px 0 4px;position:relative;">
            <div style="display:inline-block;position:relative;">
                <!-- Spinning outer ring -->
                <div style="position:absolute;top:50%;left:50%;
                            width:72px;height:72px;margin:-36px 0 0 -36px;
                            border:1px solid #1a1a1a;border-radius:50%;
                            border-top-color:#7CFC00;border-right-color:#FF6A00;
                            border-bottom-color:#3399FF;border-left-color:#00DDFF;
                            animation:t3-rotate 8s linear infinite;pointer-events:none;"></div>
                <!-- Inner glow -->
                <div style="width:52px;height:52px;border-radius:50%;
                            background:radial-gradient(circle,
                                rgba(255,215,0,0.18) 0%,
                                rgba(255,215,0,0.04) 60%,
                                transparent 100%);
                            display:flex;align-items:center;justify-content:center;
                            font-size:26px;position:relative;z-index:1;
                            animation:t3-pulse-opacity 3s ease-in-out infinite;">✦</div>
            </div>
        </div>`;

        // ── Compose final screen ────────────────────────────────────────
        screen.style.position = 'relative';
        screen.innerHTML = `

            <!-- ░░ TOP ELEMENTAL STRIP ░░ -->
            <div style="position:absolute;top:0;left:0;right:0;height:4px;z-index:5;
                background: linear-gradient(90deg,
                    #7CFC00,#b8ff60,#FFD700,#FF6A00,#FF6A00,#3399FF,#00DDFF,#7CFC00);
                background-size:200% auto;
                animation:t3-shimmer 4s linear infinite;"></div>

            <!-- ░░ HEADER ░░ -->
            <div style="text-align:center;padding:20px 12px 10px;">
                <div style="font-size:9px;letter-spacing:5px;color:#333;margin-bottom:8px;
                            animation:t3-pulse-opacity 4s ease-in-out infinite;">
                    ✦ &nbsp; Y O U &nbsp; H A V E &nbsp; A R R I V E D &nbsp; ✦
                </div>

                <div class="t3-title-shimmer"
                     style="font-size:19px;font-weight:bold;letter-spacing:3px;
                            line-height:1.2;margin-bottom:6px;">
                    CROSSROADS<br>OF THE WORLD
                </div>

                <div style="font-size:9px;letter-spacing:3px;color:#444;margin-bottom:6px;">
                    THE&nbsp; ELEMENTAL&nbsp; NEXUS
                </div>

                <div style="font-size:18px;letter-spacing:8px;">
                    ${badges}
                </div>
            </div>

            <!-- ░░ PLAYER STATS ░░ -->
            ${typeof renderPlayerStats === 'function' ? renderPlayerStats() : ''}

            <!-- ░░ ARRIVAL LORE ░░ -->
            <div style="margin:8px 0;padding:12px 15px;
                        background:linear-gradient(135deg,
                            rgba(255,215,0,0.04),rgba(0,0,0,0));
                        border-left:3px solid #5a3d00;
                        border-radius:0 6px 6px 0;
                        animation:t3-flicker 14s ease-in-out infinite;">
                <div style="font-size:10px;color:#777;line-height:1.8;">
                    You have crossed the threshold that most adventurers only dream about.
                    Four elemental forces converge here —
                    <span style="color:#7CFC00;text-shadow:0 0 6px #7CFC0066;">Earth</span>,
                    <span style="color:#FF6A00;text-shadow:0 0 6px #FF6A0066;">Fire</span>,
                    <span style="color:#00DDFF;text-shadow:0 0 6px #00DDFF55;">Wind</span>, and
                    <span style="color:#3399FF;text-shadow:0 0 6px #3399FF55;">Water</span>
                    — each one a path into darkness, and a chance at legend.
                    The ancients built this place as a test. Only those who conquer
                    <em>all four</em> wings will unlock what lies beneath the
                    <span style="color:#FFD700;text-shadow:0 0 8px #FFD700;">Eternal Vault</span>.
                </div>
                <div style="font-size:9px;color:#2a2a2a;margin-top:5px;font-style:italic;">
                    MODEM: ${modem}
                </div>
            </div>

            <!-- ░░ NEXUS SIGIL ░░ -->
            ${sigil}

            <!-- ░░ FOUR PATHS ░░ -->
            <div class="t3-divider">◈ &nbsp; THE &nbsp; FOUR &nbsp; PATHS &nbsp; ◈</div>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                ${archCards}
            </div>

            <!-- ░░ SERVICES ░░ -->
            <div class="t3-divider">◈ &nbsp; CROSSROADS &nbsp; SERVICES &nbsp; ◈</div>
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px;">

                <div class="t3-row" onclick="showShop()"
                     style="border-color:#5a3d00;background:rgba(255,215,0,0.03);">
                    ► 🛒 &nbsp;ELEMENTAL SHOP
                    <span style="font-size:10px;color:#444;margin-left:8px;">
                        rare reagents &amp; elemental gear
                    </span>
                </div>

                <div class="t3-row" onclick="showBank()">
                    ► 🏦 &nbsp;THE DEEP VAULT
                    <span style="font-size:10px;color:#444;margin-left:8px;">
                        ${bankGold}g secured within
                    </span>
                </div>

                <div class="t3-row" onclick="showTemple()">
                    ► ⛪ &nbsp;NEXUS SHRINE
                    <span style="font-size:10px;color:#444;margin-left:8px;">
                        four-element blessings
                    </span>
                </div>

                <div class="t3-row" onclick="restAtInn()">
                    ► 🌙 &nbsp;WAYFARERS REST
                    <span style="font-size:10px;color:#444;margin-left:8px;">
                        ${innCost}g — rest before the storm
                    </span>
                </div>

                <div class="t3-row" onclick="showCharacterStats()">► 📊 &nbsp;CHARACTER STATS</div>
                <div class="t3-row" onclick="showInventory()">► 🎒 &nbsp;INVENTORY</div>
                <div class="t3-row" onclick="showExplore()">► 🗺 &nbsp;EXPLORE WORLD</div>
            </div>

            <!-- ░░ RETURN PORTALS ░░ -->
            <div class="t3-divider">◈ &nbsp; RETURN &nbsp; PORTALS &nbsp; ◈</div>
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px;">
                <div class="t3-portal-row" onclick="usePortal('town1')">
                    🌀 &nbsp;PORTAL → <strong>${t1name}</strong>
                    <span style="font-size:10px;color:#444;margin-left:8px;">the green hills of home</span>
                </div>
                <div class="t3-portal-row" onclick="usePortal('town2')">
                    🌀 &nbsp;PORTAL → <strong>${t2name}</strong>
                    <span style="font-size:10px;color:#444;margin-left:8px;">ash and iron await</span>
                </div>
            </div>

            <!-- ░░ FOOTER ░░ -->
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:18px;">
                <div class="t3-row" onclick="showModemSettings()">► MODEM SETTINGS</div>
                <div class="t3-row" onclick="saveGame()" style="border-color:#5a3d00;">
                    ► 💾 &nbsp;QUICK SAVE
                </div>
                <div class="t3-row" onclick="downloadSaveFile()">
                    ► 📥 &nbsp;DOWNLOAD SAVE FILE
                </div>
                <div class="t3-row" onclick="confirmQuitToMenu()" style="border-color:#3a1212;">
                    ► ⏏ &nbsp;QUIT TO MENU
                </div>
            </div>

            <!-- ░░ BOTTOM ELEMENTAL STRIP ░░ -->
            <div style="height:4px;border-radius:2px;margin-bottom:6px;
                background:linear-gradient(90deg,
                    #00DDFF,#3399FF,#3399FF,#FF6A00,#FFD700,#7CFC00,#00DDFF);
                background-size:200% auto;
                animation:t3-shimmer 4s linear infinite reverse;"></div>
        `;
    }
};

// ─────────────────────────────────────────────────────────────────────────
//  ELEMENTAL LORE POPUP
//  Shown when a player taps a sealed wing — reveals flavour + teaser lore.
// ─────────────────────────────────────────────────────────────────────────
window.t3ShowElement = function(key) {
    const el = T3_ELEMENTS[key];
    if (!el) return;

    const old = document.getElementById('t3-lore-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 't3-lore-overlay';
    overlay.style.cssText =
        'position:fixed;inset:0;z-index:99999;' +
        'display:flex;align-items:center;justify-content:center;' +
        'background:rgba(0,0,0,0.88);backdrop-filter:blur(8px);' +
        '-webkit-tap-highlight-color:transparent;';

    overlay.innerHTML = `
        <div style="background:#07090b;
                    border:2px solid ${el.colorBorder};
                    border-radius:12px;
                    padding:28px 26px;
                    max-width:360px;
                    width:92%;
                    box-shadow:0 0 80px ${el.colorGlow};
                    font-family:'Courier New',monospace;
                    text-align:center;
                    position:relative;overflow:hidden;">

            <!-- Corner accent lines -->
            <div style="position:absolute;top:0;left:0;right:0;height:3px;
                        background:linear-gradient(90deg,transparent,${el.color},transparent);
                        opacity:0.6;"></div>
            <div style="position:absolute;bottom:0;left:0;right:0;height:3px;
                        background:linear-gradient(90deg,transparent,${el.color},transparent);
                        opacity:0.6;"></div>

            <!-- Emoji -->
            <div style="font-size:52px;margin-bottom:12px;display:inline-block;
                        animation:t3-float 2.5s ease-in-out infinite;">${el.emoji}</div>

            <!-- Title -->
            <div style="font-size:15px;font-weight:bold;letter-spacing:3px;margin-bottom:4px;
                        color:${el.color};
                        text-shadow:0 0 14px ${el.color},0 0 28px ${el.colorGlow};">
                ${el.label}
            </div>
            <div style="font-size:9px;color:#333;letter-spacing:4px;margin-bottom:14px;">
                ${el.direction} &nbsp; PATH
            </div>

            <!-- Description -->
            <div style="font-size:11px;color:#888;line-height:1.75;
                        text-align:left;margin-bottom:14px;">
                ${el.description}
            </div>

            <!-- Lore quote -->
            <div style="font-size:10px;color:#3a3a3a;font-style:italic;line-height:1.65;
                        border-top:1px solid #111;padding-top:12px;margin-bottom:16px;
                        text-align:left;">
                ${el.lore}
            </div>

            <!-- Sealed notice -->
            <div style="font-size:11px;color:#7a5800;margin-bottom:18px;line-height:1.6;">
                ⏳ &nbsp;This wing is not yet open.<br>
                <span style="color:#444;font-size:10px;">
                    The path will reveal itself in time.
                </span>
            </div>

            <!-- Close button -->
            <button onclick="document.getElementById('t3-lore-overlay').remove()"
                style="padding:9px 28px;
                       font-family:'Courier New',monospace;
                       font-size:12px;letter-spacing:2px;
                       text-transform:uppercase;cursor:pointer;
                       background:transparent;
                       color:${el.color};
                       border:2px solid ${el.colorBorder};
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
