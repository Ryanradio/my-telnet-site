// ── lore-world.js ──
// ═══════════════════════════════════════════════════════════════════════
// lore-world.js  —  World lore entries, shared by all classes
// Unlocked at levels: 1, 5, 8, 13, 18, 23, 25
// ═══════════════════════════════════════════════════════════════════════

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {

    world_1: {
        cls:'all', level:1, icon:'🌍',
        title:()=>'The Calamity Dragon',
        label:'World Lore · Entry I',
        hint:'What is coming.',
        body:()=>`
            <p>A thousand years ago, the world almost ended.</p>
            <p>A dragon unlike any other emerged from the deep places of the earth — not a creature of hunger or territory, but something older and more terrible. Azrath the Calamity Dragon. Where it flew, civilizations burned. Where it landed, the land itself became poisoned, twisted, wrong. Armies broke against its scales like water against stone. The greatest heroes of the age died trying to slow it down.</p>
            <div class="chronicle-callout">One person stopped it. A warrior named Brennan the Unbroken, last of an ancient dragon-hunting bloodline, drove Azrath back from the edge of annihilation. He could not kill it — nothing could. But he could bind it. He sealed it deep beneath the earth in a prison of ancient making, and the world exhaled and began to rebuild.</div>
            <p>The seal was never meant to be permanent. Brennan knew that. He spent the rest of his life preparing for the day it would fail — hiding talismans in elemental dungeons, writing journals, trusting that his bloodline would hold and that someone would be ready when the time came.</p>
            <p>The ground has been shaking for three weeks. The scholars call it geological instability. The farmers call it the Season Sickness. The people who know what it means call it the Waking.</p>
            <p>Azrath is nearly free. The dungeons ahead are not adventures — they are training grounds. The time to prepare is now.</p>`,
    },

    world_2: {
        cls:'all', level:5, icon:'🗿',
        title:()=>'The Seal and the Thousand Years',
        label:'World Lore · Entry II',
        hint:'Why the seal is failing.',
        body:()=>`
            <p>The seal Brennan built was a masterwork — layers of ancient binding compressed into the stone of the deep places, keyed to his bloodline, maintained by the weight of the earth above it.</p>
            <p>For nine hundred and fifty years it held perfectly. Then, slowly, it began to crack.</p>
            <div class="chronicle-callout">The scholars who study such things describe the seal's decay as inevitable — not because it was poorly made, but because Azrath is patient in a way that living things cannot fully comprehend. A thousand years of constant pressure, applied without urgency, without frustration, simply as a fact of what Azrath is, has found the seams.</div>
            <p>The tremors are the result. Each time the seal cracks further, the earth shakes. Each tremor is worse than the last. The scholars have calculated a timeline. Nobody is publishing it because the timeline is soon.</p>
            <p>The dungeons across the land have become more dangerous as the seal weakens — creatures displaced from the deep places by the tremors, driven upward and outward, agitated by the same energy cracking Azrath's prison. Training in them is harder than it was a year ago.</p>
            <p>That difficulty is the point. The person who faces Azrath needs to be forged in exactly this kind of adversity.</p>`,
    },

    world_3: {
        cls:'all', level:8, icon:'🏛️',
        title:()=>'The Crossroads',
        label:'World Lore · Entry III',
        hint:'Where the called ones gather.',
        body:()=>`
            <p>In every cycle — every thousand years when Azrath stirs or wakes — the world produces people who are called to respond. Not summoned, not conscripted. Simply called, by instinct or prophecy or the particular shape of their life up to that point, toward the same place.</p>
            <p>That place is the Crossroads.</p>
            <div class="chronicle-callout">The Crossroads is older than any nation currently on the map. Built at the end of the last cycle by Brennan and the allies who survived with him, it serves as a gathering point for the next time. Every cycle since has added to it — new buildings over old foundations, new knowledge layered over old records. It is simultaneously a waystation, a library, a training ground, and a monument to every generation that faced the Calamity and kept the world going.</div>
            <p>People arriving there come from every direction and every background. Warriors and mages. Rogues and rangers. Clerics and runesmiths. Each with their own reason for being there, their own road that led to this convergence.</p>
            <p>The four elemental dungeons — Wind, Fire, Earth, Water — begin at the Crossroads. Each holds a talisman that Brennan hid there a thousand years ago. Together they are the key to the final fight.</p>`,
    },

    world_4: {
        cls:'all', level:13, icon:'⚔️',
        title:()=>'The Four Talismans',
        label:'World Lore · Entry IV',
        hint:'What Brennan left behind.',
        body:()=>`
            <p>In the fifty years after he sealed Azrath, Brennan the Unbroken did one thing above all others: he prepared.</p>
            <p>He could not know exactly who would need to face Azrath when the seal failed. What he could do was leave tools — instruments of power hidden in dungeons, designed to reveal themselves to someone who had earned the right to hold them.</p>
            <div class="chronicle-callout">The four talismans correspond to the four elemental forces Azrath's power draws from: Wind (its speed), Fire (its destruction), Earth (its endurance), Water (its adaptability). Each talisman counters one aspect of the dragon. Together they make a confrontation possible that would otherwise be suicide.<br><br>Each dungeon tests something different — not strength, but character. What you believe, why you are fighting, who you have become in the making of yourself. The talismans do not simply reward power. They reward purpose.</div>
            <p>Every class that arrives at the Crossroads will attempt all four dungeons. The tests will look different depending on who you are. The talismans respond to who you have become, not what class you chose at the start.</p>`,
    },

    world_5: {
        cls:'all', level:18, icon:'🔥',
        title:()=>'Azrath the Calamity Dragon',
        label:'World Lore · Entry V',
        hint:'Know your enemy.',
        body:()=>`
            <p>Azrath does not hate. It does not want anything in the way that living creatures want things. It is not angry, not territorial, not hungry in any sense that maps onto the creatures you have been fighting.</p>
            <p>It is the Calamity. That is what it is, not what it does. Its existence is a force of destruction the way a storm is a force of destruction — not malicious, simply an expression of what it fundamentally is.</p>
            <div class="chronicle-callout">Brennan's first journal contains seventeen pages about Azrath's behavior and capabilities, written over fifty years of observation. The consistent thread: Azrath cannot be reasoned with, cannot be frightened, cannot be distracted, and cannot be exhausted. It does not retreat. It does not reconsider. The only thing that has ever stopped it is being physically stopped.<br><br>The seal bought a thousand years. The talismans make a permanent solution possible. But the person who stands in front of Azrath must be, in every meaningful sense, ready for something that will not stop until it is stopped.</div>
            <p>You have been training for this since level one. Every dungeon, every fight, every piece of yourself you have sharpened — it was not for the journey. It was for this moment.</p>`,
    },

    world_6: {
        cls:'all', level:23, icon:'⏳',
        title:()=>'The Last Days of the Seal',
        label:'World Lore · Entry VI',
        hint:'The window is closing.',
        body:()=>`
            <p>The seal is failing.</p>
            <p>Not completely — not yet — but what remains is a formality. The deep tremors have become constant. The sky in the direction of the sealing site has been wrong for days. Creatures that were contained in the deep places are surfacing in numbers the surface world cannot manage.</p>
            <div class="chronicle-callout">Azrath stirs in its prison, pressing against walls that no longer have the strength to hold. Every hour that passes, the prison weakens further. The world can feel it — not as a mystical sensation but as a physical fact. The temperature drops. The wildlife goes silent. People who do not know what is happening feel a dread they cannot name.</div>
            <p>You are level twenty-three. Two levels from where you need to be. The Crossroads is quiet now — everyone has found their road to this endpoint.</p>
            <p>The four talismans are ready. You are nearly ready. The world has given you everything it had to give.</p>
            <p>Two levels. Move.</p>`,
    },

    world_7: {
        cls:'all', level:25, icon:'✦',
        title:()=>'The Reckoning',
        label:'World Lore · Entry VII',
        hint:'The final page.',
        body:(name)=>`
            <p>This is the last page of the world lore.</p>
            <p>Not because the story ends here — stories do not end. But this particular chapter closes with you, at level twenty-five, standing at the point where everything converges.</p>
            <div class="chronicle-callout">A thousand years ago, Brennan the Unbroken stood where you are standing. He did not have the talismans — he built them after, so whoever came next would have what he had to improvise. He did not have a Crossroads — he built that after too. He did everything he could with what he had, and then spent fifty years making sure the next person would have more.</div>
            <p>Every person at the Crossroads, every fighter who faced the creatures of the Waking and kept moving — they all led to this. Different roads. The same destination.</p>
            <p>The seal is gone. Azrath is free. And you are standing here with everything you needed, because a man who lived a thousand years ago trusted that someone would be ready.</p>
            <p>Go, <span class="chronicle-name">${name}</span>. The world is waiting to find out who you are.</p>`,
    },

});

// ── lore-warrior.js ──
// ═══════════════════════════════════════════════════════════════════════
// lore-warrior.js  —  Warrior class chronicle entries
// Unlocked at levels: 1, 3, 8, 13, 15, 18, 20, 23, 25
// Warrior arc: Last of Brennan's bloodline. The destiny was always theirs.
// ═══════════════════════════════════════════════════════════════════════

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {

    warrior_1: {
        cls:'warrior', level:1, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry I',
        hint:'The blood remembers.',
        body:(n)=>`
            <p>The ground has been shaking for three weeks.</p>
            <p>Not the kind of trembling that comes from a collapsing mine or a landslide in the high passes. This is deeper — a rumble that comes up through the soles of your boots and settles in your chest, steady and rhythmic, like something enormous breathing in its sleep far beneath the world. The farmers are calling it the Season Sickness. The scholars are calling it geological instability. Your family has another name for it.</p>
            <p>They call it the Waking.</p>
            <div class="chronicle-callout">A thousand years ago, a warrior named Brennan the Unbroken stood alone against a dragon called Azrath — the Calamity Dragon — and drove it back from the edge of annihilation. He could not kill it. Nothing could. But he was strong enough, clever enough, and had bled enough to bind it. To seal it in a prison of ancient making that would hold as long as the world held its breath.<br><br>That seal is breaking. The tremors are the proof.</div>
            <p>You grew up hearing this story. Every child of Brennan's line does. Your grandmother told it like a warning dressed as a legend — Azrath will return, and when it does, the blood of Brennan will be called. You thought it was the kind of story families tell to make themselves feel important.</p>
            <p>Then the ground started shaking.</p>
            <p>You are <span class="chronicle-name">${n}</span>. You are the last of the bloodline. And somewhere beneath the trembling earth, something old and enormous and furious is nearly free.</p>
            <p>The dungeons ahead are not adventures. They are training. Every level you earn, every fight you survive, every piece of yourself you sharpen — it is preparation for one moment that has been a thousand years in the making.</p>
            <p>You have until level twenty-five to be ready for it.</p>`,
    },

    warrior_2: {
        cls:'warrior', level:3, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry II',
        hint:"What Brennan left behind.",
        body:(n)=>`
            <p>Your grandmother kept a chest at the foot of her bed that you were never allowed to open as a child. She told you it contained old things, family things, nothing interesting. You believed her the way children believe things they are not supposed to question.</p>
            <p>After the first tremor, she opened it herself. She set the contents on the table one by one without speaking: a journal with cracked leather binding, a fragment of chain so old it had gone grey, and a map so faded you could only make out coastlines and mountain ranges — and in the center, marked in ink that had once been red, a single location labeled in a language you do not recognize.</p>
            <div class="chronicle-callout">She said: Brennan wrote down everything he learned about Azrath. The weaknesses, the patterns, the way it fights, the way it thinks. He spent fifty years hunting it before he cornered it. The journal is what he knew at the end.<br><br>Then she said: It took him until level twenty-five. He was not chosen because of his bloodline. He became the bloodline by surviving long enough to learn what needed to be learned.</div>
            <p>You have been reading the journal every night. Brennan's handwriting is cramped and practical — the writing of someone more comfortable with a sword than a pen. He does not dramatize. He observes. He records. He is wrong about some things and admits it in the margins in a different ink, years later.</p>
            <p>The man who sealed Azrath was not a legend when he started. He was someone who did not stop.</p>
            <p><span class="chronicle-name">${n}</span> — the journal is yours now. The chest is empty. The training has begun.</p>`,
    },

    warrior_3: {
        cls:'warrior', level:8, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry III',
        hint:'The world is already moving.',
        body:(n)=>`
            <p>You are not the only one.</p>
            <p>This took longer to understand than it should have. You have been thinking of this as a personal matter — bloodline, destiny, the weight of a name passed down a thousand years. And it is personal. But the tremors are not personal. Azrath's return does not care about your family history. It is coming for everything.</p>
            <p>The proof arrived in the form of a rider from the eastern provinces who stopped at the same inn last night. A mage — you could tell by the way she catalogued the room when she walked in. Over dinner she told you that the Academy had been tracking the seal's degradation for six months. That scholars across the continent were independently arriving at the same timeline.</p>
            <div class="chronicle-callout">She said there were others already moving. A ranger who had been watching the northern forests die along the ley lines. A cleric whose prayers had begun bouncing back wrong. A runesmith who kept waking with tools in his hands he did not remember picking up.<br><br>She said there was a place — an old place, used in past cycles — where people like this were supposed to find each other. A Crossroads. She did not know exactly where yet. Neither do you.</div>
            <p>The dungeons you have been training in are harder now. The creatures in them are agitated, displaced, pushed out of their deep places toward the surface. The tremors are waking things that were comfortable asleep.</p>
            <p>Two more levels and you will be strong enough to find the Crossroads properly.</p>
            <p><span class="chronicle-name">${n}</span> — Brennan worked alone because there was no one else. You will not have to.</p>`,
    },

    warrior_4: {
        cls:'warrior', level:13, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ The Last of Brennan's Blood ✦</span></p>
            <p>You heard the Crossroads before you saw it. Voices — dozens of them, in languages you recognize and languages you do not, all arriving from different roads at the same point. You crested the ridge and stopped.</p>
            <p>The valley below was chaos. Controlled, purposeful chaos, but chaos nonetheless. Warriors sharpening blades beside mages who had set up open-air research stations. Rogues comparing notes with rangers. A necromancer and a cleric sitting across a fire from each other with the careful courtesy of people who disagree about everything except the thing that brought them here. All of them converging on a town built recently around very old foundations.</p>
            <div class="chronicle-callout">An old man at the gate looked at you for a long moment before you said a word. Then he said: Brennan's blood. I wondered when you would arrive. There is something here that was left for you.<br><br>He led you to a locked room in the oldest building at the Crossroads. On a stone pedestal, sealed in a case that opened at your touch and no one else's, was the second half of Brennan's journal — the pages he did not trust to family. The pages about what happens next.</div>
            <p>The four talismans — Wind, Fire, Earth, Water — are scattered in the elemental dungeons beyond this valley. They were placed there a thousand years ago by Brennan himself. Everyone here is searching for them. But Brennan's bloodline carries the one thing the talismans are keyed to recognize.</p>
            <p><span class="chronicle-name">${n}</span> — you are the reason the Crossroads was built.</p>`,
    },

    warrior_5: {
        cls:'warrior', level:15, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>Brennan's second journal was more specific than the first. He wrote about each of the four elemental dungeons — not as a guide, but as a record of what each one demanded. What it cost him. What he had to understand about himself before the talisman would accept his touch.</p>
            <p>He wrote: <em>The Wind dungeon did not test my strength. It tested whether I knew why I was fighting. It put the question to me in the dark, in a chamber where the air moved like it was alive, and I had to answer honestly. The talisman accepted that.</em></p>
            <div class="chronicle-callout">You have retrieved the first talisman now. You understand what he meant. The dungeon was not a test of combat — you handled the combat. It was a test of something harder to train for than swordsmanship.<br><br>The talisman sits in your pack and hums faintly. Not with magic exactly. More with recognition. Like it has been waiting a thousand years for the right hand.</div>
            <p>Three more to find. The Fire dungeon to the south, the Earth dungeon in the deep mountains, the Water dungeon at the coastal cliffs. He left one note consistent across all four entries: <em>Each one is harder than the last. Not because the enemies are stronger. Because it asks more of you each time.</em></p>
            <p><span class="chronicle-name">${n}</span> — one down. Three to go.</p>`,
    },

    warrior_6: {
        cls:'warrior', level:18, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry VI',
        hint:'All four. One purpose.',
        body:(n)=>`
            <p>All four talismans. You set them out on the table in your room at the Crossroads and looked at them for a long time.</p>
            <p>Wind — light as a held breath, shifts when you are not watching it directly. Fire — warm to the touch regardless of room temperature, never hot enough to burn but always present. Earth — heavier than its size should allow, completely steady. Water — the last one, the hardest dungeon, the one Brennan's journal described with the fewest words and the most crossed-out sentences. It looks like glass. It shows you something different every time you pick it up.</p>
            <div class="chronicle-callout">The old man at the Crossroads gate examined them together and confirmed what the journal predicted: four separate instruments that function as a single key. Designed to work in the hands of Brennan's bloodline because Brennan built them that way. He did not trust any other lock. He did not trust any other hand.<br><br>He trusted yours, a thousand years before you were born.</div>
            <p>The tremors are worse now. Deeper. The kind of shaking that feels like something testing a wall rather than a random earthquake. Purposeful. Almost impatient.</p>
            <p><span class="chronicle-name">${n}</span> — Brennan had to improvise when he sealed Azrath. He made the talismans so you would not have to. Seven more levels. Use them well.</p>`,
    },

    warrior_7: {
        cls:'warrior', level:20, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry VII',
        hint:"What Brennan's journal says about the end.",
        body:(n)=>`
            <p>The last entry in Brennan's second journal is short. Four pages, where every other entry ran to twenty or thirty. The handwriting is steadier than the earlier entries, which surprised you. You expected urgency. What you found was calm.</p>
            <p>He wrote: <em>I am going tomorrow. I have been ready for three days but kept finding reasons to wait. I think I was waiting for fear. Fear never came. What came instead was a sense of the thing being what it is, and myself being what I am, and those two facts pointing toward a single moment. I am going toward the moment. That is all.</em></p>
            <div class="chronicle-callout">He wrote one more paragraph. He wrote: If you are reading this, my line held. A thousand years is a long time to trust blood you have not met. I hope you are ready. I hope the training was enough. I hope the world gave you people around you, because I did not do this alone even though the histories will say I did.<br><br>He signed it with his name, the date, and nothing else.</div>
            <p>You are level twenty. Five levels from where Brennan was when he wrote those words. The tremors are frequent enough that people outside the valley are beginning to understand something is wrong. Armies are mobilizing — forces that will be entirely useless against what is coming, but moving because they have to do something.</p>
            <p>You have something more useful than armies. You have four talismans, a bloodline, and twenty levels of training that took Brennan fifty years.</p>
            <p><span class="chronicle-name">${n}</span> — five levels. Read his words again. Then go earn them.</p>`,
    },

    warrior_8: {
        cls:'warrior', level:23, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry VIII',
        hint:'The seal breaks.',
        body:(n)=>`
            <p>The seal broke three days ago.</p>
            <p>Not completely — a partial fracture, a crack wide enough that things are already coming through. The creatures in the deep dungeons have become frantic. The tremors are now constant, a background vibration people have stopped mentioning because mentioning it does not help. The sky to the northeast has been wrong since dawn on the second day — a darkness that is not cloud cover, a color with no clean name.</p>
            <p>The Crossroads is quieter than it has been in weeks. Not because people have left. Because everyone understands that the time for preparing is ending and the time for what the preparation was for is arriving.</p>
            <div class="chronicle-callout">You went through the second journal again last night, looking for anything you had missed. There was a line in the Fire dungeon entry you had read a dozen times without fully understanding: <em>When it is time, you will not feel ready. Readiness is not a feeling. It is the sum of everything you did when you did not feel ready.</em><br><br>Two levels. You will have them before Azrath is fully free. The timeline is going to be close but it will be enough.</div>
            <p>The old man at the gate found you this morning and said nothing. He just looked at you the way he looked at you the first day — then nodded once and walked away. You think that was his version of encouragement.</p>
            <p>The talismans have been warm for three days. Not the way the Fire one is always warm. Warm the way something gets when it knows its purpose is close.</p>
            <p><span class="chronicle-name">${n}</span> — two levels. Brennan is counting on you. He has been for a thousand years.</p>`,
    },

    warrior_9: {
        cls:'warrior', level:25, icon:'⚔️',
        title:(n)=>`${n}'s Chronicle`,
        label:'The Warrior · Entry IX',
        hint:'The last entry.',
        body:(n)=>`
            <p>This is the last entry.</p>
            <p>You are level twenty-five. The seal is gone. Azrath is awake and the sky confirms it — a darkness spreading from the northeast that swallows light without producing shadow, that makes the air taste like something ancient and cold and vast beyond imagining.</p>
            <p>The four talismans are with you. Wind circling your left shoulder, Earth grounded at your feet, Fire at your right hand, Water at your back. They know. They have always known. Brennan built them to recognize this moment the way a key recognizes a lock.</p>
            <div class="chronicle-callout">His last journal entry said he did not feel fear at the end. Only the sense of a thing being what it is, and himself being what he is, and those two facts pointing toward a single moment.<br><br>You understand that now. You are the last of his blood, standing at the end of a thousand years of consequence, and you do not feel fear. You feel the weight of everything you have trained through, survived, and learned — and it is exactly enough. It was always going to be exactly enough. He made sure of that too.</div>
            <p>Azrath the Calamity Dragon is coming.</p>
            <p>You are the only person alive with the bloodline to finish what Brennan started. The only person with all four talismans, earned through dungeons that tested not just your strength but your character. The only person who has read both halves of a journal written a thousand years ago by someone who trusted their blood to produce exactly this.</p>
            <p>The others at the Crossroads will witness it. They have their own reasons for being here, their own roads that led to this valley. They will remember what they saw.</p>
            <p>But this part — this is yours.</p>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>Brennan is waiting to see how his line ends.</p>`,
    },

});

// ── lore-mage.js ──
// lore-mage.js  —  Mage class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    mage_1: {
        cls:'mage', level:1, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry I',
        hint:'The numbers do not lie.',
        body:(n)=>`
            <p>The seal's degradation curve is not theoretical. You have been plotting it for six months — longer than the Academy has been willing to admit the problem exists — and the numbers are unambiguous. The rate of decay has accelerated three times since your first measurement. Every new data point compresses the timeline further.</p>
            <p>The Academy calls it a modeling artifact. Your instruments are miscalibrated, your methodology flawed, your conclusions alarmist. You have checked your methodology four times. The instruments are fine. The conclusions are correct.</p>
            <div class="chronicle-callout">A dragon called Azrath was sealed beneath the earth a thousand years ago by a warrior named Brennan the Unbroken. The seal is a masterwork — layered binding compressed into deep stone, maintained by the weight of the world above it.<br><br>It is failing. Not because it was poorly made, but because Azrath is patient in a way that living things cannot fully comprehend. A thousand years of constant pressure has found the seams.</div>
            <p>The tremors are the proof. Each one corresponds exactly to a spike in the degradation readings. The ground shakes when another layer of binding gives way. The frequency is increasing.</p>
            <p>You are <span class="chronicle-name">${n}</span>. The Academy dismissed you. The evidence did not change. You are training now — not because the institution approved it, but because the evidence requires it. Every level you earn is another tool in the fight the data has been predicting.</p>
            <p>You have until level twenty-five. The numbers say so.</p>`,
    },
    mage_2: {
        cls:'mage', level:3, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry II',
        hint:'What the library found.',
        body:(n)=>`
            <p>The restricted archive had three texts you were not supposed to access without faculty approval. You accessed them anyway. Two were useless. The third was a survey of binding theory written fifty years after the sealing by someone who had spoken to Brennan directly.</p>
            <div class="chronicle-callout">The author wrote: <em>Brennan understood the mechanics of the binding only in the sense that a smith understands fire — practically, instinctively, without the formal apparatus to explain what he knew. What he built should not have worked as well as it did. The fact that it held suggests either that intuitive knowledge exceeds formal knowledge in certain extreme applications, or that Brennan was considerably more capable than he appeared.</em><br><br>The survey described the binding's architecture in enough technical detail that you spent two days verifying it against your own models. The architecture is correct. And there is a flaw — not in Brennan's work, but in the nature of the seal itself. It was designed to hold. It was not designed to hold forever.</div>
            <p>Brennan knew this. The survey's final section describes a conversation where he said plainly that the seal was a delay, not a solution, and that he had spent the last decade of his life preparing for the delay's end.</p>
            <p>The preparation included talismans — instruments of elemental countering, placed in dungeons, keyed to survive a thousand years and respond to the right person's touch.</p>
            <p><span class="chronicle-name">${n}</span> — the theoretical framework for those talismans is the most elegant binding architecture you have ever encountered. You want to study them. First you have to be strong enough to reach them.</p>`,
    },
    mage_3: {
        cls:'mage', level:8, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry III',
        hint:'Others who noticed.',
        body:(n)=>`
            <p>A rider from the northern college arrived while you were reviewing your latest readings. She introduced herself as a fellow researcher — different specialization, same conclusion. The Academy dismissed her three months before they dismissed you.</p>
            <div class="chronicle-callout">There is a place called the Crossroads. Old records describe it as a gathering point built by Brennan himself after the last Azrath cycle. In every cycle, the world produces people who independently arrive at the same conclusion from different directions. The Crossroads exists to give them somewhere to find each other.<br><br>She had triangulated its location from three separate historical accounts. The data puts it at around level ten to twelve in terms of what the surrounding terrain requires to navigate safely. You are level eight. The road is almost open.</div>
            <p>She also told you something the historical accounts confirmed but your modeling had not captured: the elemental dungeons near the Crossroads are not naturally occurring. They were constructed. The binding architectures inside them are intentional — tests, not obstacles. Brennan built them to evaluate the people who attempted them.</p>
            <p>A dungeon designed by the man who built the original seal. You have been thinking about the talismans as objects to retrieve. You are starting to understand they are problems to solve.</p>
            <p><span class="chronicle-name">${n}</span> — you are going to find the elemental dungeons fascinating. First you have to be strong enough for them to let you in.</p>`,
    },
    mage_4: {
        cls:'mage', level:13, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Keeper of the Degradation Curve ✦</span></p>
            <p>The valley is exactly where the triangulated data said it would be. You arrived to find it already full — warriors and rogues and rangers and clerics, all converging from different roads. The people here are not adventurers. They are professionals called by their particular expertise to the same endpoint.</p>
            <div class="chronicle-callout">The library at the Crossroads is better than you expected. Records from every previous cycle, annotated by the researchers of each generation, with cross-references you would have needed decades to compile independently.<br><br>The binding architecture of the elemental dungeons is documented in detail. Wind tests clarity of purpose. Fire tests commitment. Earth tests foundation. Water tests adaptability. A mage who cannot articulate why they are fighting will not pass the Wind dungeon. The talisman simply waits until the answer becomes honest.</div>
            <p>You can articulate it. You have been articulating it in your research notes for months. The answer is the same every time: the data requires it.</p>
            <p><span class="chronicle-name">${n}</span> — the library will still be here when you return. Go do the work the data requires.</p>`,
    },
    mage_5: {
        cls:'mage', level:15, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind talisman is architecturally extraordinary. You are writing this down before the details fade, because what you observed is exactly what the library described and also completely unlike what the description prepared you for.</p>
            <p>The binding structure is recursive — layers of elemental attunement that reference each other in a closed loop, self-sustaining for exactly the duration Brennan designed. A thousand years of stability, and it shows: not a single seam has drifted.</p>
            <div class="chronicle-callout">The dungeon asked you why you were doing this. Not in words — the mechanism is environmental. The air pressure in the final chamber changed based on the coherence of your intent. When you were uncertain, the chamber resisted. When you were clear, it opened.<br><br>You were clear. Six months of dismissed data, a road that led here instead of anywhere else. The talisman accepted the answer without ceremony. It simply became available to take. The hum it makes is not magical resonance. It is the sound of a thousand-year-old lock recognizing that the right key has arrived.</div>
            <p>Three more. The Fire dungeon will ask about commitment — how far you will go, without flinching from the answer. You have thought about this. The answer is: as far as the evidence requires.</p>
            <p><span class="chronicle-name">${n}</span> — one down. The architecture of the next one is in the library notes. You have already read them twice.</p>`,
    },
    mage_6: {
        cls:'mage', level:18, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry VI',
        hint:'All four. A complete system.',
        body:(n)=>`
            <p>All four talismans. You have examined each individually and spent two days examining them as a system, and the system is more elegant than any single component suggested.</p>
            <p>Wind: recursive elemental attunement, self-sustaining, extraordinary stability. Fire: thermal binding with controlled release architecture. Earth: gravitational anchoring with layered resonance dampening. Water: the most complex — adaptive binding that rewrites its own outer parameters while maintaining core integrity.</p>
            <div class="chronicle-callout">Together they form a closed system of elemental countering that addresses each of Azrath's fundamental properties simultaneously. No single talisman could accomplish this. The interaction effects between all four create capabilities the individual components do not have.<br><br>Brennan designed them to work together from the beginning. The solo tests were calibration steps — each talisman was learning about the person carrying it, so that when combined, the system would be tuned to that specific individual. You are the instrument the system was calibrating for.</div>
            <p>The degradation curve has accelerated again. Seven more levels. The numbers have always said twenty-five.</p>
            <p><span class="chronicle-name">${n}</span> — the system is complete. Now you have to be complete enough to use it.</p>`,
    },
    mage_7: {
        cls:'mage', level:20, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry VII',
        hint:'What the final data says.',
        body:(n)=>`
            <p>The Crossroads library has records from previous cycles. In each complete record, the person who faced Azrath was not the most powerful individual of their generation. They were the most prepared. The distinction matters.</p>
            <div class="chronicle-callout">Brennan's own record is the most detailed. His final entry, written two years before his death, summarizes everything he learned:<br><br><em>I sealed it. I did not understand it when I did. I have spent fifty years trying to understand it, and I understand it better now but not completely. What I know with certainty: it cannot be reasoned with, frightened, or exhausted. It can only be stopped. The talismans I built are designed to make stopping possible. Whether they are sufficient depends on the person using them, not on their construction.</em><br><br>The person using them. That is the variable he could not control for.</div>
            <p>You are level twenty. Five more levels. Your degradation curve is accurate to within three percent. The seal will fail at approximately the moment you reach twenty-five, assuming your training pace holds.</p>
            <p>It is not a coincidence. Brennan engineered the timeline. The seal was designed to hold long enough for the right person to be ready.</p>
            <p><span class="chronicle-name">${n}</span> — you are the variable he built the timeline around. Do not waste the calibration.</p>`,
    },
    mage_8: {
        cls:'mage', level:23, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry VIII',
        hint:'Terminal phase.',
        body:(n)=>`
            <p>The seal entered terminal phase four days ago. The readings confirm it — not theoretical terminal, but active terminal. The binding layers are failing faster than the curve projected, which means your margin was on the optimistic side.</p>
            <p>You have two levels. The revised projection gives you slightly less time than you thought. Not dramatically less. Enough.</p>
            <div class="chronicle-callout">The Crossroads has gone quiet in the way that places go quiet before something large happens. The conversations have changed — nobody is discussing theory anymore. The discussions are operational: what to do when, who will be where, what the signals are that indicate the final phase has begun.<br><br>You updated your model this morning. The revised curve is precise to within forty-eight hours. Two other researchers checked your methodology. They did not find errors.</div>
            <p>The talismans are active in a way they were not before. The Wind one has been making a different sound — not the thousand-year resonance hum, but something with more urgency. The Water one shows you the same image every time you pick it up: a clear sky over an open field, with nothing moving in it. You are choosing to interpret that as the outcome rather than the alternative.</p>
            <p><span class="chronicle-name">${n}</span> — two levels. The model says you have time. Make the model right.</p>`,
    },
    mage_9: {
        cls:'mage', level:25, icon:'🔮',
        title:(n)=>n+"'s Notes",
        label:'The Mage · Entry IX',
        hint:'Final entry.',
        body:(n)=>`
            <p>The seal is gone. The terminal phase completed at 04:17 this morning — you were awake, monitoring the readings, and watched the last binding layer fail in real time. The degradation curve was accurate to within six hours. You consider that a successful prediction.</p>
            <p>Azrath is awake. The atmospheric distortion you predicted three months ago is present and measurable at the bearing you calculated. Your instruments are not wrong. They were never wrong.</p>
            <div class="chronicle-callout">The Academy dismissed you because your conclusions were inconvenient. The conclusion was always the same: the seal will fail, Azrath will return, and the world will need someone who understood what was happening well enough to do something about it.<br><br>You understood what was happening. You did something about it. You trained, you studied, you retrieved the talismans, you did not stop when the institution failed you, and you are standing here at level twenty-five with a complete elemental countering system and a precise technical understanding of what you are about to face.<br><br>That is what the data required.</div>
            <p>Brennan's final record says: <em>Whether the talismans are sufficient depends on the person using them, not on their construction.</em></p>
            <p>You are the person using them. The construction is flawless. The person has been tested across twenty-five levels and found sufficient.</p>
            <p>Go, <span class="chronicle-name">${n}</span>. Prove the model right.</p>`,
    },
});

// ── lore-rogue.js ──
// lore-rogue.js  —  Rogue class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    rogue_1: {
        cls:'rogue', level:1, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry I',
        hint:'What the networks know.',
        body:(n)=>`
            <p>You have survived by knowing things other people do not. Information is your currency, your weapon, your escape route. And what you know right now — what every shadow network from the ports to the mountain passes is whispering — is that the earth is wrong.</p>
            <p>The tremors. The dead rising near the old pillar routes. The creature migrations pushing everything out of the deep places toward the surface. Every fence, every information broker, every person who makes their living knowing things before others do — they all say the same thing. Something is coming. Something that makes kings irrelevant and armies useless.</p>
            <div class="chronicle-callout">Azrath the Calamity Dragon was sealed beneath the earth a thousand years ago by a warrior named Brennan the Unbroken. The seal is breaking. The tremors are the proof, and the people who move in the shadows of this world have known it longer than the scholars have been willing to admit.<br><br>The Calamity does not distinguish between the powerful and the powerless. It does not negotiate. It does not accept bribes, or change its plans based on intelligence, or have informants that can be turned. The only counter is the one Brennan left behind — and it requires someone who has earned twenty-five levels of capability to use it.</div>
            <p>You are <span class="chronicle-name">${n}</span>. You have heard the whisper. Every dungeon ahead is a training ground — every skill sharpened, every level earned. The skills you have spent your life building are exactly what the fight ahead requires.</p>
            <p>The networks know something is coming. You are going to be the person who does something about it.</p>`,
    },
    rogue_2: {
        cls:'rogue', level:3, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry II',
        hint:'A contact in the right place.',
        body:(n)=>`
            <p>The information arrived through three separate handlers, none of whom knew about the others. You paid for the first two. The third came as a gift, which meant whoever sent it wanted you to have it and had reasons they were not disclosing. You verified all three independently before you acted on any of it.</p>
            <div class="chronicle-callout">There is a place called the Crossroads. It appears in records from previous cycles — not prominently, not obviously, but if you know how to read what is not said in a document, it is there. A gathering point. A place where the people called to respond to each cycle of the Calamity find each other.<br><br>Every network has it as a blank spot. Not an absence — a deliberate omission. The kind of gap that appears in records not when people do not know about a thing, but when they have collectively agreed not to write it down. That kind of blank spot means the place is real and the people who protect it have reach.</div>
            <p>You also found a reference to Brennan's preparation — the talismans he hid in elemental dungeons, the journal he left for his bloodline, the Crossroads he built as a convergence point. The architecture of the preparation is more sophisticated than any single-generation plan. He built it to survive a thousand years of entropy. It has.</p>
            <p><span class="chronicle-name">${n}</span> — the information says the Crossroads opens at around level ten. Train. You need to be worth what you find there.</p>`,
    },
    rogue_3: {
        cls:'rogue', level:8, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry III',
        hint:'The value of what you know.',
        body:(n)=>`
            <p>Three more contacts in the last two weeks, all independently confirming the same thing: the seal is in active failure, not gradual degradation. The distinction matters. Gradual degradation gives you time. Active failure gives you a deadline.</p>
            <p>You have also been watching the creature movements more carefully. The migrations from the deep places follow specific routes — not random displacement, but purposeful evacuation. Something down there is organizing the retreat, or at minimum broadcasting a signal strong enough that animals with no language are responding to it coherently.</p>
            <div class="chronicle-callout">The mage you met on the road last week had data that confirmed your field observations from a different angle. Her degradation curve matches your timeline estimates within a reasonable margin. She is also heading toward the Crossroads. She mentioned others — a ranger tracking the forest deaths, a cleric whose prayers had gone wrong, a runesmith waking up with tools in their hands.<br><br>The people who are going to do something about this are already moving. The Crossroads is where they are going to find each other. You have two levels before the terrain opens up enough to get there safely.</div>
            <p>You have never worked well with others. You have also never faced something that could not be handled alone. This may be the first time both of those things are true simultaneously.</p>
            <p><span class="chronicle-name">${n}</span> — the networks say the fight requires every kind of skill. Yours specifically. Trust the networks this once.</p>`,
    },
    rogue_4: {
        cls:'rogue', level:13, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Reader Between the Lines ✦</span></p>
            <p>You arrived at the Crossroads the way you arrive everywhere — quietly, from a direction nobody was watching, having already spent two hours surveying the perimeter before you walked through the gate. The old man there did not react, which meant he had seen you during the survey and chose not to say anything. You respected that.</p>
            <div class="chronicle-callout">The Crossroads is harder to read than you expected. The people here are from every background and every kind of expertise, and they are all operating with partial information about each other, which means the social dynamics are complex in ways that your usual methods do not simplify cleanly.<br><br>What you did find: the library has operational records from previous cycles, including after-action documentation on what worked and what did not. The elemental dungeons are documented in enough detail to plan an approach. The talismans require something from the person retrieving them — not information, but honesty about what that information is for. You are going to have to be genuine in there. That is not a skill you practice often.</div>
            <p>The Wind dungeon tests why you are doing this. You have been thinking about your answer. It is not simple, and it does not reduce to a clean sentence, and you are not sure a talisman built by a legendary warrior is going to accept nuance.</p>
            <p>You are going to find out.</p>
            <p><span class="chronicle-name">${n}</span> — the Crossroads is the most information-dense environment you have ever been in. Use it.</p>`,
    },
    rogue_5: {
        cls:'rogue', level:15, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind dungeon asked you why you were doing this, and you gave it the honest answer, which is complicated and not flattering in every part. You are doing this because you heard the whisper and you are constitutionally incapable of ignoring a threat once you have confirmed it. You are doing this because every network you trust says this is where the important thing is happening, and you go where the important things are. You are doing this because the alternative — knowing and not acting — has never once been something you could live with.</p>
            <div class="chronicle-callout">The chamber accepted that. It did not require the answer to be noble. It required the answer to be true.<br><br>The talisman is lighter than you expected. It shifts slightly in your grip when you are not paying attention to it, like it is adjusting its position based on information you are not consciously processing. You are choosing to find that useful rather than unsettling. A tool that is always orienting itself correctly is a tool worth carrying.</div>
            <p>Three more. You have read the documentation on all of them. The Fire dungeon asks about commitment, which is going to require you to be honest about how far you will actually go rather than how far you prefer to claim you will go. Those are different numbers. You know what the honest answer is.</p>
            <p><span class="chronicle-name">${n}</span> — the talisman is already learning you. Three more calibration steps.</p>`,
    },
    rogue_6: {
        cls:'rogue', level:18, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry VI',
        hint:'All four.',
        body:(n)=>`
            <p>All four talismans, and you have had time to study how they behave when carried together. The individual behaviors you noted — the Wind one adjusting its position, the Fire one warming when your resolve is clear, the Earth one going heavier when you are on uncertain ground, the Water one showing you information you did not ask for — combine into something that reads as a system.</p>
            <div class="chronicle-callout">The system is watching you the same way you watch everything. Observing, recording, calibrating. Brennan built intelligence into these things — not a consciousness, but something like professional attentiveness. The four talismans together are more aware of you than you are comfortable with, and you are a person who is comfortable with very little surveillance.<br><br>You have decided to reframe it: you are not being watched, you are being equipped. The talismans are learning everything they need to know about the specific person who will use them, because the use requires precision that cannot be achieved without that knowledge. You are being studied because the study is necessary.</div>
            <p>The tremors are worsening. Seven more levels. The networks have gone quieter than usual, which is what happens when people who trade in information are out of information to trade. The situation has moved past the point where intelligence is the primary resource.</p>
            <p><span class="chronicle-name">${n}</span> — you have everything you need. The talismans have everything they need. Seven levels.</p>`,
    },
    rogue_7: {
        cls:'rogue', level:20, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry VII',
        hint:'What the silence means.',
        body:(n)=>`
            <p>The networks have stopped talking. That has happened twice in your career — once during a war that everyone knew was coming and nobody wanted to acknowledge, and once during the collapse of a city that the people inside it refused to admit was happening until it was over.</p>
            <p>Both times, the silence preceded something that could not be addressed by information alone. Both times, the silence ended when the event ended.</p>
            <div class="chronicle-callout">This silence is different. It is not the silence of denial. It is the silence of everyone who trades in information simultaneously realizing that the situation has moved into a domain where information is no longer the primary resource. What is required now is action by specific people with specific capabilities, and no amount of intelligence work changes what those people need to do.<br><br>You are one of those specific people. Your specific capabilities — the ability to move unseen, to read environments before committing to them, to act at exactly the right moment with exactly the right precision — are not secondary to this fight. They are structural to it. Brennan's preparation did not account for a warrior and nothing else. It accounted for every kind of strength the world could produce.</div>
            <p>Five more levels. The silence will end when the event ends. You intend to be one of the reasons it ends correctly.</p>
            <p><span class="chronicle-name">${n}</span> — the networks are quiet. Go be loud where it matters.</p>`,
    },
    rogue_8: {
        cls:'rogue', level:23, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry VIII',
        hint:'Two levels.',
        body:(n)=>`
            <p>The seal fractured three days ago. You know this not from official announcements — there have been none — but from the movement patterns of every creature in a fifty-mile radius simultaneously changing direction. That kind of coordinated behavioral shift does not happen without a shared cause. The cause is pressure from below getting suddenly, significantly worse.</p>
            <div class="chronicle-callout">The Crossroads has gone operational. Conversations are short and purposeful. People who were still debating approach two weeks ago are not debating anymore. The theoretical phase is over. Everyone here has made their peace with what is coming and is focusing on what they can actually affect.<br><br>You spent this morning doing what you always do before something important: checking every assumption, verifying every piece of information, confirming that the picture you have built is accurate and complete. It is. The talismans are ready. You are two levels from where you need to be. The timeline is going to be close.</div>
            <p>Close is fine. You have worked with close margins before. Close is not the same as too late.</p>
            <p>The Water talisman showed you something when you picked it up this morning. Not the usual information — something specific. You are choosing not to write it down, because writing it down would require you to process it, and processing it right now would take time you need for the two levels.</p>
            <p><span class="chronicle-name">${n}</span> — two levels. Then the information you have been carrying your whole career finally gets used for what it was always for.</p>`,
    },
    rogue_9: {
        cls:'rogue', level:25, icon:'🗡️',
        title:(n)=>n+"'s Account",
        label:'The Rogue · Entry IX',
        hint:'Final account.',
        body:(n)=>`
            <p>Seal down. Azrath awake. Sky confirms it in three different ways that you have been watching for, and all three are present.</p>
            <p>This is the last entry. Not because there will be nothing to record after — there will be, one way or another — but because the recording phase is over. What you know is what you know. The information has been gathered, verified, and acted upon to the extent that information can be acted upon. The rest is not an intelligence problem.</p>
            <div class="chronicle-callout">You have spent your career moving through the world quietly, knowing things before other people knew them, being in position before events required it. Every network, every contact, every careful conversation and patient observation was, in retrospect, preparation for this.<br><br>Not because you planned it that way. Because the skills that let you survive in the shadow world are the same skills that let you get here at level twenty-five with four talismans and a complete picture of what you are walking into. Brennan's preparation accounted for someone like you. He needed every kind of strength. He needed yours specifically.</div>
            <p>The talismans are settled. All four oriented correctly without you asking them to.</p>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>You already know everything you need to know. You have always known this was where you were going.</p>`,
    },
});

// ── lore-ranger.js ──
// lore-ranger.js  —  Ranger class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    ranger_1: {
        cls:'ranger', level:1, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry I',
        hint:'What the land already knew.',
        body:(n)=>`
            <p>The forest has been wrong for three months before the tremors started. You noticed it the way you notice everything — not as a sudden revelation but as an accumulation of observations that eventually demanded an explanation. The migration routes shifted. Silence appeared in places that should have been full of sound. Animals you had tracked for years abandoned territories they had held for generations, not fleeing predators but moving with the deliberate calm of creatures following a signal you could not hear.</p>
            <p>Then the tremors came, and the signal became audible to everyone. By then you had already started training.</p>
            <div class="chronicle-callout">Azrath the Calamity Dragon was sealed beneath the earth a thousand years ago. The seal is breaking. The tremors are how the surface world experiences it, but the deep world — the root systems, the underground water, the creatures that live in the soil and stone — has been feeling it for far longer. The natural world knew before the scholars did. You read the natural world. You knew when it did.</div>
            <p>You are <span class="chronicle-name">${n}</span>. The land told you what was coming. The dungeons ahead are training grounds — every level earned, every skill sharpened, every hour in difficult terrain that makes the next terrain less impossible. You are not preparing for adventure. You are preparing to answer what the forest has been trying to say.</p>`,
    },
    ranger_2: {
        cls:'ranger', level:3, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry II',
        hint:'Reading what runs.',
        body:(n)=>`
            <p>You have been mapping the creature migrations for six weeks now. Not because anyone asked you to — because the patterns are speaking and you want to understand what they are saying before the conversation ends.</p>
            <div class="chronicle-callout">The migrations are not random. The routes have consistent directionality away from a central bearing — southeast, specifically, which corresponds to where the tremors originate when you track their epicenters carefully. Every species responds differently: birds leave first, mammals second, insects third, and the things that live deepest in the earth do not leave at all because there is nowhere for them to go. The ones that surface are not migrating. They are being forced up.<br><br>There is a secondary pattern that took longer to identify: some creatures are not fleeing. Some are converging. Moving toward the Crossroads — a place you found referenced in a notation on an old map, circled in a hand that was not the map's original author. The notation simply says: <em>gather here.</em></div>
            <p>You are going to find the Crossroads. The creatures are already ahead of you.</p>
            <p><span class="chronicle-name">${n}</span> — the land has been giving you the route since before you knew you needed one. Follow it.</p>`,
    },
    ranger_3: {
        cls:'ranger', level:8, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry III',
        hint:'The silence has a source.',
        body:(n)=>`
            <p>You identified the source of the silence three days ago. Not Azrath directly — the dragon is still sealed, though the seal is failing — but the overflow energy from the cracking binding. It saturates the soil at certain depths and creates a resonance that predators interpret as a rival apex presence and prey interpret as a trap. The result is what you have been observing: vacated territories, abandoned routes, the particular stillness of a landscape waiting for something to pass.</p>
            <div class="chronicle-callout">A mage you shared a campfire with last week had data that confirmed your field observations from a theoretical angle. Her degradation curve matches your timeline estimates. She mentioned others already moving toward the Crossroads — the same convergence point the secondary migration pattern was pointing toward.<br><br>The Crossroads sits in a valley where the overflow energy is dampened — natural formations that interrupt the resonance. It is the only zone in a hundred-mile radius where the land feels normal. That is why the old records chose it as a gathering point. That is why even the animals navigate around it rather than through it. It is a quiet place in a loud situation.</div>
            <p>Two more levels and the terrain between here and there opens up. The forest is already showing you the path — you just need to be strong enough to walk it.</p>
            <p><span class="chronicle-name">${n}</span> — the land chose the meeting place. Trust it.</p>`,
    },
    ranger_4: {
        cls:'ranger', level:13, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Voice of the Waking Land ✦</span></p>
            <p>The half-mile radius of stillness before the Crossroads is unlike anything you have encountered. Not the stillness of a predator's territory or a toxic zone or a drought-struck forest. The stillness of a place that has been deliberately set apart — held quiet by something older than the current crisis, by design rather than accident.</p>
            <div class="chronicle-callout">The valley itself is remarkable. The geology is wrong for the region — too stable, too balanced, too precisely arranged to be natural. Someone shaped this place. You spent the first morning walking its perimeter and reading what the land had to say, and what the land said was: this was made. A thousand years ago, by someone who understood how to work with terrain rather than against it.<br><br>The elemental dungeons radiate from the Crossroads like spokes from a hub. Each one is positioned to maximize its particular elemental character — the Wind dungeon at the valley's highest point, the Fire dungeon at a geothermal feature, the Earth dungeon at the deepest stable rock formation, the Water dungeon at the coastal convergence. Brennan knew what he was doing with landscape. You recognize the methodology even if the scale is beyond anything you have attempted.</div>
            <p>The talismans are waiting at the end of those spokes. The forest is quiet. The path is clear. You know what to do with a clear path.</p>
            <p><span class="chronicle-name">${n}</span> — the land has been pointing here the entire time. You are exactly where you are supposed to be.</p>`,
    },
    ranger_5: {
        cls:'ranger', level:15, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind dungeon tested something you did not expect to be tested on: patience. Not the patience of waiting for prey — you have that. The patience of holding uncertainty without resolving it prematurely. The dungeon put you in situations where the correct answer was not yet visible and rewarded waiting over guessing. You waited. The talisman recognized it.</p>
            <div class="chronicle-callout">The dungeon also asked, in its environmental way, why you were doing this. You gave it the answer that was true without being complicated: because the land told you to, and you have never in your life ignored what the land tells you, and you do not intend to start now.<br><br>The talisman fits in your hand like it was made for a tracker — balanced, responsive to movement, attuned to direction. You have been carrying it for three days and you are already reading it the way you read animal sign. It has a grammar. You are learning it.</div>
            <p>Three more. The Earth dungeon is the one you are most curious about. You have spent your career reading landscape. A dungeon built to test your relationship with the ground beneath you is the most natural test you have been offered.</p>
            <p><span class="chronicle-name">${n}</span> — one talisman and three more to learn. The land is still teaching.</p>`,
    },
    ranger_6: {
        cls:'ranger', level:18, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry VI',
        hint:'All four, all speaking.',
        body:(n)=>`
            <p>All four talismans, and they are louder than the individual ones were. Not audibly louder — the hum is the same. Louder in the way that four separate pieces of information are louder than one, when they are all pointing at the same thing.</p>
            <div class="chronicle-callout">The talismans are reading the land the way you read the land. Wind is tracking air patterns you cannot see. Fire is monitoring the thermal activity from the deep places — it has been running hotter for three days, which corresponds to increased geothermal stress from the failing seal. Earth is doing something with the seismic data that you do not fully understand yet but that feels like it is building a picture. Water knows where the water table has shifted in the last month and what that implies about what is moving below it.<br><br>You have been a tracker your whole life. You have never had instruments this sensitive. Brennan built them for a warrior, but they speak the language of the land, and you have been fluent in that language since before you could read words.</div>
            <p>Seven more levels. The talismans will keep reading. You will keep listening.</p>
            <p><span class="chronicle-name">${n}</span> — you and Brennan's instruments are finally speaking the same language.</p>`,
    },
    ranger_7: {
        cls:'ranger', level:20, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry VII',
        hint:'What the land says now.',
        body:(n)=>`
            <p>The land says: soon. Not in those words — the land does not use words — but in the way it says everything: through pattern, through signal, through the behavior of every living thing that responds to it. You have spent twenty levels learning to read this particular message. You understand it now.</p>
            <div class="chronicle-callout">The convergence patterns have changed in the last week. The creatures that were fleeing the deep-place overflow are no longer running. They have reached whatever distance felt safe to them and stopped there, and they are facing the direction they came from. Waiting. Watching. The forest at the edges of the affected zone is perfectly still in a way that has nothing to do with the silence you documented earlier.<br><br>The land is holding its breath. You have seen this before — before large events, before significant changes in the environment's balance. The land holds its breath and then either the event happens and the breath releases, or the threat passes and the breath releases more slowly. There is no third option. The breath will release.</div>
            <p>Five more levels. The creatures are waiting. The land is waiting. You will not make them wait much longer.</p>
            <p><span class="chronicle-name">${n}</span> — the forest trained you for this. Every season of reading what could not be seen was preparation. You are ready.</p>`,
    },
    ranger_8: {
        cls:'ranger', level:23, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry VIII',
        hint:'The last migration.',
        body:(n)=>`
            <p>The seal fractured. You felt it in the land before you heard about it from anyone — a deep shudder that was different from the previous tremors, more final, less repetitive. The tremors were a door straining against its hinges. What you felt three days ago was the hinges giving.</p>
            <div class="chronicle-callout">The last migration has started. Not the creature migrations you documented earlier — those are long finished. This one is people. Families from the villages closest to the sealing site, moving away from the bearing you have been tracking all along. They are moving with the particular speed of people who are not sure what they are running from but are certain they need to run.<br><br>You cannot help them by following. You can help them by going the other direction. The talismans know this — they have been oriented toward the bearing consistently for three days, not adjusting, not hesitating. They are pointed at what needs to be done and they are waiting for you to catch up.</div>
            <p>Two more levels. Then you stop tracking and start ending.</p>
            <p><span class="chronicle-name">${n}</span> — two levels. The land has been reading you as carefully as you have been reading it. It believes you are ready. Trust the land.</p>`,
    },
    ranger_9: {
        cls:'ranger', level:25, icon:'🏹',
        title:(n)=>n+"'s Field Notes",
        label:'The Ranger · Entry IX',
        hint:'Last field entry.',
        body:(n)=>`
            <p>The seal is gone. You knew it the moment it happened — the land exhaled, the holding-breath tension of the last month releasing all at once, and then immediately inhaling again in a different way. The old threat was lifting. The new threat was present.</p>
            <p>The sky to the northeast is wrong. Not wrong in any way you can describe with standard observation language — wrong in the way that things are wrong when something fundamentally large is moving through a space not designed to accommodate it.</p>
            <div class="chronicle-callout">You have spent twenty-five levels reading what the land tells you. Here is what it is telling you right now:<br><br>The creatures have stopped moving. Every migration, every evacuation, every behavioral shift of the last several months has reached its endpoint. The land is perfectly still in the way it is still before an apex predator makes its move — not the stillness of absence, but the stillness of everything else yielding to the thing that matters most.<br><br>You are the thing that matters most. The land is yielding to you. It has been yielding to you since level one, showing you the path, teaching you the grammar, pointing you toward this moment. You are the apex presence the silence has been making room for.</div>
            <p>The talismans are oriented and steady. The Wind one has stopped adjusting — it found its bearing and is holding it absolutely.</p>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>The forest taught you everything it had to teach. Use it.</p>`,
    },
});

// ── lore-runesmith.js ──
// lore-runesmith.js  —  Runesmith class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    runesmith_1: {
        cls:'runesmith', level:1, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry I',
        hint:'Muscle memory from another life.',
        body:(n)=>`
            <p>The hand reached for the tool before you knew you needed it. Not the first time — that has been happening for months, with increasing frequency and decreasing surprise. You wake up with configurations in your hands that you did not choose before sleep. You find yourself halfway through a binding sequence with no memory of starting it. The craft is moving through you rather than being directed by you, and you have stopped fighting it because the configurations are always correct.</p>
            <div class="chronicle-callout">The configurations are binding runes. Ancient ones — not in the sense of old-fashioned, but in the sense of foundational, pre-formal, the kind of working that was done before anyone developed the vocabulary to teach it systematically. You have looked them up. They exist in historical records in incomplete fragments, because the people who knew them fully never wrote them down completely — they passed them through demonstration and muscle memory.<br><br>A warrior named Brennan the Unbroken used configurations matching these to seal a dragon called Azrath a thousand years ago. The seal is breaking. The tremors are the proof. And your hands keep rehearsing the configurations that made the seal in the first place.</div>
            <p>You are <span class="chronicle-name">${n}</span>. Your hands remember something your mind does not. The dungeons ahead are training grounds — every level earned, every technique refined, every ancient configuration your muscle memory shows you integrated into capability rather than reflex. You are not learning the old craft. You are remembering it.</p>
            <p>There is a difference, and it matters.</p>`,
    },
    runesmith_2: {
        cls:'runesmith', level:3, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry II',
        hint:'What the old texts confirm.',
        body:(n)=>`
            <p>You found three partial texts on pre-formal binding theory in the back of a specialist archive that mostly serves scholars who do not actually practice the craft. The texts are fragmentary and contradictory in places, but the fragments that describe the configurations your hands keep producing are consistent across all three sources and with each other.</p>
            <div class="chronicle-callout">The configurations are specifically designed for the binding of entities whose power exceeds conventional containment parameters — not in the general sense, but in a very specific sense. They are Azrath configurations. Not configurations that happen to work on Azrath. Configurations that were developed, through unknown means, specifically for and in response to Azrath's particular energy signature.<br><br>The third text has a marginal note written in a different hand than the main text, much later: <em>The smith who contributed these configurations claimed to have worked them before. Not in this life. The claim was dismissed at the time as mystical thinking. In retrospect, the precision of the configurations is not consistent with someone learning. It is consistent with someone remembering.</em><br><br>You are not the first person whose hands knew these things before their mind did.</div>
            <p><span class="chronicle-name">${n}</span> — the texts call what you are doing inheritance. Not of blood, but of craft. Something in the practice of the work carries forward when formal memory cannot. You are carrying Brennan's craft forward. The tremors are why it is waking up now.</p>`,
    },
    runesmith_3: {
        cls:'runesmith', level:8, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry III',
        hint:'The craft is preparing you.',
        body:(n)=>`
            <p>The configurations have become more complex over the last two levels. In the beginning they were fragments — isolated sequences your hands completed before your mind engaged. Now they are assembling into something coherent. You have started writing them down as they come, and the written record shows an architecture emerging: components that reference each other, that build toward something you have not yet seen the completion of.</p>
            <div class="chronicle-callout">A mage you shared a workspace with last week had theoretical models that partially overlapped with what you are building. Her framework is formal and systematic — the kind of work done with instruments and documented methodology. Your framework is intuitive and embodied — the kind of work done with hands and muscle memory.<br><br>They describe the same architecture from different angles. The intersection between them produced two hours of the most productive technical conversation you have had in years. She is heading toward the Crossroads. She mentioned that there are tools there — instruments left by the previous cycle's craftspeople — that no one has been able to use because no one has had the right hands.<br><br>You think you have the right hands.</div>
            <p>Two more levels and the terrain opens. The craft is impatient in a way it has never been before — the configurations are coming faster, clearer, more insistent. Something that has been dormant for a thousand years is waking up because it is needed.</p>
            <p><span class="chronicle-name">${n}</span> — the craft is preparing you. Trust the preparation.</p>`,
    },
    runesmith_4: {
        cls:'runesmith', level:13, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Hands That Remember ✦</span></p>
            <p>The tools the mage mentioned are in a sealed room in the oldest building at the Crossroads. The room did not open for the ten people who tried before you. It opened for you before you touched it — the lock recognized something in your hands' configuration, the particular way your fingers were positioned from that morning's involuntary working session, and released.</p>
            <div class="chronicle-callout">Inside: instruments unlike anything in current practice. The materials are a thousand years old but perfectly maintained, as if they have been in a preservation field. Some of them you recognize — scaled-up versions of tools you use in standard work. Some of them you have never seen and know immediately how to use. Your hands demonstrate the grip and the motion before your mind finishes processing the tool's shape.<br><br>Brennan worked with a runesmith. The historical records do not say this clearly — they describe him as working alone — but the tools in this room were not made by a warrior. The person who made these spent decades developing a practice specifically in service of what Brennan needed. The Crossroads preserved their work. Your hands recognize it because you are carrying that practice forward.</div>
            <p>The elemental dungeons are constructed with binding architectures. You can read them the way a reader reads text. The talismans inside them are the most sophisticated free-standing binding objects you have ever encountered, and you need to be worthy of retrieving them.</p>
            <p><span class="chronicle-name">${n}</span> — the room opened for you. The tools are yours. Go be worthy of them.</p>`,
    },
    runesmith_5: {
        cls:'runesmith', level:15, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind dungeon is built around a recursive binding architecture that your hands identified before your eyes did. Walking through the chambers, your fingers were already tracing the response configurations — not the ones you would use to dismantle it, but the ones you would use to show it that you understood it. That you spoke its language.</p>
            <div class="chronicle-callout">The talisman was not hidden. It was waiting on a central plinth in the final chamber, fully visible, and it was waiting because it had been built to require someone who could demonstrate understanding of its own construction before it could be taken. You demonstrated the understanding. Not by solving a puzzle or defeating a guardian, but by showing your hands to a binding configuration and having the configuration recognize the craft in them.<br><br>The talisman's construction is the work of the smith whose tools are in the Crossroads room. You can feel the maker's grammar in it — the particular rhythm of someone who spent fifty years developing a practice in response to a single problem. You spent that time too, in a different life, and the resonance between those two periods of dedication is what made the talisman available.</div>
            <p>Three more. Each one will ask the same question in a different material language: are you the person who knows this craft? You are. Your hands have always known it.</p>
            <p><span class="chronicle-name">${n}</span> — one down. Three more recognitions to come.</p>`,
    },
    runesmith_6: {
        cls:'runesmith', level:18, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry VI',
        hint:'All four, a complete working.',
        body:(n)=>`
            <p>All four talismans. You have spread them out on the workbench in the Crossroads tool room and spent a full day reading them as a unified object. They are not four separate instruments that happen to work together. They are four components of a single working that was deliberately divided into pieces because no single component would survive a thousand years intact, but four components in separate stable environments would.</p>
            <div class="chronicle-callout">The reassembly is not physical — you do not combine them into one object. The reassembly is relational: the four components recognize each other when carried by the same person, and that recognition activates the unified working they were designed to produce. Your hands have been demonstrating the activation configuration involuntarily for three days, which is your muscle memory's way of confirming that the reassembly is complete.<br><br>The old smith in the Crossroads room built the components. Brennan designed the unified working. The division into four was a practical solution to a preservation problem, and it has worked exactly as designed. What you are holding is a thousand-year-old masterwork that has been waiting for someone with the right hands to reassemble it.</div>
            <p>Seven more levels. Then you use the working for the purpose it was built for — the purpose that has been written into your hands since before you understood what writing meant.</p>
            <p><span class="chronicle-name">${n}</span> — the working is complete. You are the last component it needed.</p>`,
    },
    runesmith_7: {
        cls:'runesmith', level:20, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry VII',
        hint:'What the craft has been building toward.',
        body:(n)=>`
            <p>You found the old smith's personal notes in a sealed compartment inside the tool room that you did not notice during your first visit. Small format, dense handwriting, covering forty years of practice. The notes are a record of someone spending a lifetime developing a craft that they understood, from early on, was not primarily for their own use.</p>
            <div class="chronicle-callout">The final entry in the notes is addressed to no one in particular — or to the person who would find them, which amounts to the same thing:<br><br><em>The warrior needed tools that did not exist. I spent forty years making them. I do not know if I have made them correctly because I will not be there to see them used. I know I have made them as correctly as I am capable of making them, which is the only kind of knowing available to a craftsperson. If you are reading this, the tools found someone whose hands were ready for them. That is all I ever asked.</em><br><br>The notes end there. You have read them four times.</div>
            <p>Five more levels. You are going to use these tools correctly. Not because you are certain, but because you have done the work, and that is the only kind of certainty available to a craftsperson.</p>
            <p><span class="chronicle-name">${n}</span> — the smith spent forty years making these for you. Do not waste their decade.</p>`,
    },
    runesmith_8: {
        cls:'runesmith', level:23, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry VIII',
        hint:'Two levels.',
        body:(n)=>`
            <p>The seal fractured. You felt it in the configuration — the binding sequence your hands have been rehearsing for months shifted, and the part of the sequence corresponding to the existing seal became unnecessary. Your hands dropped it automatically, moving directly to the next phase. The next phase is the one that matters.</p>
            <div class="chronicle-callout">The other craftspeople at the Crossroads can feel it too. There is a particular quality of attention in a workshop when something significant is about to be attempted — a focus that is not nervous but is not casual either. The Crossroads has had that quality for three days. Everyone is working on what they can still prepare, and everyone knows that the preparation time is ending.<br><br>Your hands have been running the activation configuration continuously for the last forty-eight hours. Not involuntarily anymore — deliberately. Practicing. Making sure the motion is as clean and as certain as it needs to be. The talisman system responds to the quality of the working as much as to the working itself. Sloppy craft will not do.</div>
            <p>Two more levels. The craft is ready. The hands are ready. You are becoming ready.</p>
            <p><span class="chronicle-name">${n}</span> — the smith would recognize what you have become. Two levels. Make the craft proud.</p>`,
    },
    runesmith_9: {
        cls:'runesmith', level:25, icon:'🔷',
        title:(n)=>n+"'s Working Log",
        label:'The Runesmith · Entry IX',
        hint:'Final working log entry.',
        body:(n)=>`
            <p>The seal is gone. Your hands knew before the sky showed it — the last remnant of the binding dissolved and the configuration your hands have been rehearsing for months reached its final form, complete and ready and pointed at what comes next.</p>
            <p>This is the last entry in the working log. Not because the work is finished — it is about to reach its most important phase — but because the log serves the preparation, and the preparation is complete.</p>
            <div class="chronicle-callout">Forty years the old smith spent building the tools. A thousand years the tools spent waiting. Twenty-five levels you spent becoming the person whose hands could use them.<br><br>There is a grammar to all of this that feels deliberate. Not predetermined — craft is never predetermined, the maker always has choices and the choices always matter. But deliberate, in the sense that the work was done with purpose, and the purpose pointed consistently at this moment.<br><br>You are the final instrument. The talisman system is complete. The working is loaded and ready. Your hands know exactly what to do.</div>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>The smith made the tools. You learned the craft. Now use it.</p>`,
    },
});

// ── lore-cleric.js ──
// lore-cleric.js  —  Cleric class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    cleric_1: {
        cls:'cleric', level:1, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry I',
        hint:'When the prayers go wrong.',
        body:(n)=>`
            <p>The silence began six months ago. Not complete silence — the prayers are still answered, occasionally, partially, in the way that a conversation is still happening when one person is shouting from a great distance and the other can only hear fragments. But before six months ago, the connection was clear. Before six months ago, you did not have to work this hard to hear anything at all.</p>
            <p>The order calls it a trial of faith. They say it happens to everyone eventually, a period of distance that tests commitment and produces stronger conviction on the far side. You have kept a log. The silence does not follow the patterns of a faith trial. It follows the patterns of interference.</p>
            <div class="chronicle-callout">Azrath the Calamity Dragon was sealed beneath the earth a thousand years ago. The seal is breaking. The energy overflow from the cracking binding saturates everything it touches — the soil, the water, the air — and the connections between the faithful and whatever they are faithful to are not immune. The silence in your prayers is not divine absence. It is obstruction.<br><br>The interference has a source. The source is the same thing that is causing the tremors. The tremors will stop when the source is stopped, and the prayers will clear, and the conversation you have been straining to hear through static will become audible again.</div>
            <p>You are <span class="chronicle-name">${n}</span>. Your faith has not failed you. Something is standing between you and what your faith reaches toward. The dungeons ahead will make you strong enough to reach through the obstruction. Every level you earn is a step closer to clear signal.</p>`,
    },
    cleric_2: {
        cls:'cleric', level:3, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry II',
        hint:'What the older records say.',
        body:(n)=>`
            <p>The temple archive has records from the last Azrath cycle — not labeled as such, but identifiable if you know what pattern of disruption to look for. The records describe a period of prayer interference lasting approximately eight years, corresponding exactly with the period of Azrath's active presence above ground. The interference ended when Brennan completed the sealing.</p>
            <div class="chronicle-callout">The archive also contains correspondence between three clerics of that era who independently reached the same conclusion you have: the disruption is not internal, not a test, not a consequence of insufficient faith. It is external, structural, caused by the same force that is devastating the surrounding landscape.<br><br>One of the three wrote something that you have read several times: <em>It would be easier if this were a trial of faith. Trials end. What we are experiencing is obstruction, and obstruction requires removal rather than endurance. The appropriate response is not patience. It is action.</em><br><br>The appropriate response is action. The archive knows what needs to be done. It has known for a thousand years.</div>
            <p><span class="chronicle-name">${n}</span> — the older clerics faced this and chose action over endurance. The choice is the same now. Train. Become capable of the action that is required.</p>`,
    },
    cleric_3: {
        cls:'cleric', level:8, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry III',
        hint:'Faith sharpened by resistance.',
        body:(n)=>`
            <p>You have noticed something over the last several weeks of training. The harder the conditions, the clearer the partial signals that come through the interference. Not louder — clearer. As if the connection is not distance-limited but difficulty-filtered. As if whatever is on the other side of the obstruction can reach further toward you when you are reaching harder toward it.</p>
            <div class="chronicle-callout">A researcher from the Academy confirmed, inadvertently and from a completely different methodological angle, that the interference is worse in areas of low physical stress and better in areas of high physical stress. Her explanation was technical and involved resonance frequencies and biological signal amplification. Your explanation is that faith responds to effort in kind.<br><br>They are probably both correct from their respective angles.<br><br>She mentioned the Crossroads — a gathering place, two levels ahead in terms of terrain requirements. She mentioned that others were moving there from every direction. You have heard references to it in the older archive materials. A place built specifically for this kind of convergence, where the interference is reportedly lower than anywhere else in the affected radius.</div>
            <p>Two more levels and the road opens. The signals have been getting clearer as you train. The pattern holds.</p>
            <p><span class="chronicle-name">${n}</span> — faith sharpened by resistance is still faith. Keep reaching.</p>`,
    },
    cleric_4: {
        cls:'cleric', level:13, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Clear Signal Through the Static ✦</span></p>
            <p>The prayers are louder here. Not answered — you have learned over the last year to distinguish between proximity and response — but louder in the sense that the signal is stronger, the interference lower, the partial connection more coherent than it has been anywhere else you have trained.</p>
            <div class="chronicle-callout">The Crossroads has its own archive, maintained continuously across every cycle. The clerical records within it are extensive — detailed accounts of how faith-based practices were affected by each Azrath emergence, what techniques helped maintain connection through the interference, what the experienced practitioners of each generation learned that the next generation needed to know.<br><br>The consistent finding across all cycles: the interference is worst just before and during Azrath's full emergence, and clears completely once Azrath is sealed or destroyed. Every cycle, the clerics who maintained functional connection through the peak interference period did so by accepting that the connection would be partial and working with what was available rather than waiting for full clarity that would not come during the crisis.</div>
            <p>You have been doing this for months. You are more practiced at partial connection than most of your peers. That practice is the preparation. The partial signal is enough to work with. It has been enough the whole time.</p>
            <p><span class="chronicle-name">${n}</span> — the Crossroads prayers are clearer than any you have sent in six months. Send them well.</p>`,
    },
    cleric_5: {
        cls:'cleric', level:15, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind dungeon tested your relationship with uncertainty, which is the core practical skill of faith — the capacity to act without full information, trusting that what you cannot see is there. The dungeon removed certainty systematically and watched what you did with its absence. You have been living in uncertainty for a year. The talisman recognized the practice.</p>
            <div class="chronicle-callout">Carrying the first talisman, you noticed something unexpected: the interference in your prayers diminished slightly. Not dramatically — not the full clarity you are working toward — but measurably. The talisman is actively countering some portion of the overflow energy that has been causing the disruption.<br><br>Brennan built these instruments to counter Azrath's power directly. The counter affects everything Azrath's presence distorts, including the faith-connections that the overflow energy has been interfering with. Every talisman you carry is one step closer to full clarity. You are doing the spiritual work and the practical work simultaneously, and they are the same work.</div>
            <p>Three more. Each one will counter more of the interference and require more of you in return. You are learning the exchange rate. It is fair.</p>
            <p><span class="chronicle-name">${n}</span> — the connection is clearer with the talisman than without it. Three more to go.</p>`,
    },
    cleric_6: {
        cls:'cleric', level:18, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry VI',
        hint:'All four, and something like clarity.',
        body:(n)=>`
            <p>All four talismans. The interference in your prayers is at its lowest point in fourteen months. Not gone — Azrath is not gone, and the overflow energy from the active seal failure is still present — but low enough that you can hear more than fragments. Low enough to work with fully.</p>
            <div class="chronicle-callout">The conversation on the other side of the interference has been continuous the entire time. Not waiting for the obstruction to clear, not pausing when the signal dropped. Continuous. You have been reaching toward something that has been reaching back with equal consistency, and the talismans have cleared enough of the obstruction to make that mutual reaching visible.<br><br>The archive records from previous cycles describe this moment as the point of confirmation — when the cleric carrying all four talismans understands that their faith was never absent, never failing, never a trial. It was always a real connection being interfered with by a real external force. The faith was correct. The obstruction was the problem. The obstruction is almost gone.</div>
            <p>Seven more levels. The clarity will increase as Azrath's presence weakens. The conversation that has been strained for fourteen months will be fully restored when this is finished.</p>
            <p><span class="chronicle-name">${n}</span> — you have been heard the entire time. Now let your actions speak just as clearly.</p>`,
    },
    cleric_7: {
        cls:'cleric', level:20, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry VII',
        hint:'What prayer sounds like now.',
        body:(n)=>`
            <p>The prayers are clearer than they have been since before the interference started. Not perfect — the seal is still failing and Azrath is still present and the overflow energy is still there — but clear enough to hold a coherent conversation. You spent an hour in the Crossroads chapel this morning doing exactly that.</p>
            <div class="chronicle-callout">The conversation on the other side said nothing that changed the plan. The direction was confirmed, the purpose was confirmed, the path forward is the same as it has been. What was different was the quality of the confirmation — not the strained partial signal of the last year, but a clear voice saying clearly: yes, this is right, you are on the right path, finish what you started.<br><br>You have been on the right path the entire time. You knew this, because you kept the log, and the log showed the interference pattern rather than a faith pattern, and you chose to believe your own careful observation over the institutional explanation. Your careful observation was correct. Your faith was not misplaced. The voice on the other side confirms both.</div>
            <p>Five more levels. The confirmation is clear. The path is clear. You know what faith looks like when the obstruction is removed.</p>
            <p>Go be the person who removes it.</p>
            <p><span class="chronicle-name">${n}</span> — five levels. You have been heard. Now be heard louder.</p>`,
    },
    cleric_8: {
        cls:'cleric', level:23, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry VIII',
        hint:'The last interference.',
        body:(n)=>`
            <p>The seal partially fractured three days ago. The interference surged — briefly, sharply — and then settled into a new pattern that is worse than before the fracture but clearer than you expected given the fracture's severity. As if something on the other side of the connection is compensating for the increased obstruction. As if the effort to reach you has increased to match the difficulty.</p>
            <div class="chronicle-callout">You have read every account of this moment in the Crossroads archive. The clerics of previous cycles describe the partial fracture phase as the most difficult period — the interference is at its worst while Azrath is between sealed and fully free, caught in the threshold state that produces maximum energy overflow.<br><br>The accounts also describe what happens after the confrontation: the interference clears. Every account says the same thing. The first prayer after the sealing or defeating of Azrath is received clearly and without obstruction, and the response is immediate and unambiguous.<br><br>You are two levels from that prayer. Two levels from the conversation you have been trying to have for fourteen months.</div>
            <p><span class="chronicle-name">${n}</span> — two levels. The voice on the other side has been fighting to reach you through the static for over a year. Give it something worth reaching toward.</p>`,
    },
    cleric_9: {
        cls:'cleric', level:25, icon:'✨',
        title:(n)=>n+"'s Prayer Log",
        label:'The Cleric · Entry IX',
        hint:'Final entry.',
        body:(n)=>`
            <p>The seal is gone. The interference peaked and then broke — a sharp final surge followed by a clarity so sudden and complete that you sat down on the ground and did not move for several minutes. The prayer that came through in that clarity was brief: <em>We see you. Go.</em></p>
            <p>You are going.</p>
            <div class="chronicle-callout">Fourteen months of static. Fourteen months of working with fragments and partial signals and the institutional explanation you refused to accept because your log showed something different. The faith was never failing. The obstruction was never you. The silence was always external, always temporary, always ending at this exact moment when the person on the other end of the connection was finally strong enough and positioned correctly to end it.<br><br>The archive records say the first prayer after the confrontation is the clearest of a practitioner's life. Every cleric who survived the previous cycles documented this. The clarity lasts for hours, sometimes days — as if the connection, having been compressed and obstructed for so long, overflows when the obstruction is removed.</div>
            <p>You have four talismans, twenty-five levels, and a prayer answered clearly for the first time in fourteen months.</p>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>The signal is clear. Everything that needed to be said has been said. Now act on it.</p>`,
    },
});

// ── lore-necromancer.js ──
// lore-necromancer.js  —  Necromancer class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    necromancer_1: {
        cls:'necromancer', level:1, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry I',
        hint:'Every spirit says the same thing.',
        body:(n)=>`
            <p>Every spirit you have spoken to for the past three months has said the same thing unprompted: <em>It is coming and the dead cannot stop it.</em> Every spirit. Across every session. Across every century they died in. You have conducted sixty-seven sessions since the pattern started. The consistency is not coincidence — it is signal.</p>
            <p>In your practice, when the dead agree about something, they are right. They have no reason to coordinate. They have no shared information source, no ability to compare notes, no incentive to deceive you in the same direction. When they converge on a conclusion independently, the conclusion is accurate.</p>
            <div class="chronicle-callout">Azrath the Calamity Dragon was sealed beneath the earth a thousand years ago. The seal is breaking. The dead can feel it — not as a physical sensation, because they do not have bodies, but as an existential one. Azrath does not distinguish between the living and the dead. What it touches is simply gone — not killed, not transformed. Erased. The dead are afraid of ceasing to have ever existed.<br><br>That is what Azrath does. The dead are not being dramatic. They are describing, with the precision that the long dead acquire, exactly what the threat is.</div>
            <p>You are <span class="chronicle-name">${n}</span>. The dead trust you with information they do not share with everyone. They are sharing this because they need the living to do something about it. Every level you earn in the dungeons ahead is a level closer to being capable of that something.</p>`,
    },
    necromancer_2: {
        cls:'necromancer', level:3, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry II',
        hint:'The angry dead.',
        body:(n)=>`
            <p>Not all of the dead are afraid. You discovered the exceptions in a session with three spirits from a village that does not exist anymore — erased, according to the spirits, not destroyed. Not burned or flooded or abandoned. Erased.</p>
            <p>Those spirits are not afraid. They are furious.</p>
            <div class="chronicle-callout">The erasure they describe is not death. Death produces spirits. Erasure produces nothing — no trace, no echo, no residual presence. The village was there and then it was not, and the three spirits speaking to you survived only because they happened to have already left their bodies before the erasure reached them. They are, in a practical sense, the only remaining evidence that the village existed.<br><br>They want to exist. More precisely, they want to have existed — to be counted as real, as permanent, as part of the record. Azrath threatens that. Azrath threatens the permanence of everything, including things that have already happened. The dead are afraid of being retroactively unmade. The three spirits from the erased village know exactly what that means and are willing to do anything within their very limited power to prevent it from happening to anyone else.</div>
            <p><span class="chronicle-name">${n}</span> — the dead are counting on you. Not metaphorically. The three spirits have specifically asked me to make sure the living understand what they are fighting for. It is not just the future. It is the permanence of the past.</p>`,
    },
    necromancer_3: {
        cls:'necromancer', level:8, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry III',
        hint:'What the living are doing about it.',
        body:(n)=>`
            <p>You have been working primarily with the dead for so long that the living-world dimensions of this crisis took longer to map than they should have. A researcher corrected this gap over dinner at a way-station — she had data on the seal's degradation, timeline projections, information about a gathering place called the Crossroads.</p>
            <div class="chronicle-callout">The Crossroads is where the called ones converge. Not a mystical calling — a practical one. People who have independently arrived at the same conclusion from different directions. Researchers with data. Practitioners with skills. Fighters with capability. All moving toward the same valley where, a thousand years ago, someone built a place specifically for this kind of convergence.<br><br>You mentioned the spirits to the researcher. She found it genuinely interesting rather than dismissive, which was refreshing. The dead's consistent messaging — <em>it is coming and we cannot stop it</em> — confirms her data from a completely different angle. The dead and the living are saying the same thing. The appropriate response is action by the living.</div>
            <p>Two more levels and the terrain opens. The dead are watching. They are limited in what they can do directly, but they are paying attention, and their attention matters in ways that are not always obvious until they become obvious.</p>
            <p><span class="chronicle-name">${n}</span> — the dead are with you in every sense they are capable of being with anyone. Train. Get to the Crossroads. Do what the living can do.</p>`,
    },
    necromancer_4: {
        cls:'necromancer', level:13, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Voice of Those Who Cannot Speak ✦</span></p>
            <p>The dead at the Crossroads are different from the dead anywhere else you have worked. They are at peace in a way that has nothing to do with emptiness — the peace of people who made a deliberate choice about what they were staying for. Every spirit you have consulted here stayed because this place mattered to them, because they had unfinished business with the world that the Crossroads was the right place to tend.</p>
            <div class="chronicle-callout">The oldest spirit in the Crossroads described what happened in the previous cycle. Not abstractly — specifically. She was a practitioner who worked with the Crossroads' own dead during Brennan's active campaign, maintaining the connection between the living fighters and the information the dead carried. The dead know things. Routes Azrath has taken. Vulnerabilities in its previous behavior. Patterns that repeat across cycles.<br><br>She has been waiting for a necromancer to arrive so she can pass this information forward. She waited a thousand years. She is not impatient — the dead are rarely impatient — but she is relieved.</div>
            <p>The information she carries took four sessions to fully transcribe. It is in your pack now. It is the most operationally useful historical intelligence you have ever received, provided by someone who witnessed it firsthand and has had a thousand years to organize it clearly.</p>
            <p><span class="chronicle-name">${n}</span> — the dead waited for you specifically. Use what they gave you.</p>`,
    },
    necromancer_5: {
        cls:'necromancer', level:15, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind dungeon tested your relationship with impermanence, which is the core of necromantic practice — accepting that what has ended is ended while maintaining meaningful connection to what it was. The dungeon created situations where things that appeared permanent dissolved, and the question was whether you could continue operating effectively in the face of dissolution. You could. The talisman recognized it.</p>
            <div class="chronicle-callout">The talisman has an interesting property you did not find documented in the Crossroads library: it is perceptible to the dead. Not to all dead — only to spirits who are attentive to the material world, who maintain the kind of ongoing awareness that lets them communicate. The three spirits from the erased village, who you have maintained contact with throughout this journey, confirmed the talisman's presence the moment you retrieved it. They described it as a counter-presence to Azrath's erasure energy — something that reasserts the permanence of what exists against the force that unmakes it.<br><br>The dead find this very reassuring. More reassuring than anything else you have found to tell them.</div>
            <p>Three more. Every talisman you carry increases the counter-presence. The dead are watching. They are counting.</p>
            <p><span class="chronicle-name">${n}</span> — the erased village wants you to know: three more. They are keeping track.</p>`,
    },
    necromancer_6: {
        cls:'necromancer', level:18, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry VI',
        hint:'All four, and what the dead say.',
        body:(n)=>`
            <p>All four talismans. You consulted the dead at the Crossroads that evening — the settled spirits, the ones who have been watching this situation across multiple lifetimes — and their response was unanimous and immediate: <em>Yes. That is what it was supposed to look like.</em></p>
            <div class="chronicle-callout">The oldest spirit described the last time someone stood in the Crossroads with all four talismans — Brennan, a thousand years ago, in the hours before he went to complete the sealing. She described the same quality of presence you have right now: the counter-presence against erasure, the sense of something that insists on existing against a force that wants to unmake it.<br><br>She said Brennan was afraid. She said this not as criticism but as context — that he was afraid and did it anyway, and that the afraid-and-doing-it-anyway quality was what the talismans needed from him, what they measured and confirmed. She is telling you this because she wants you to know that the talismans have already confirmed you. Whatever you are feeling right now, the dead have already counted you as sufficient.</div>
            <p>Seven more levels. The dead are counting every one.</p>
            <p><span class="chronicle-name">${n}</span> — the oldest spirit at the Crossroads asked me to tell you: she has seen this before. She believes in the outcome. Trust the dead. They have longer perspective than the living.</p>`,
    },
    necromancer_7: {
        cls:'necromancer', level:20, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry VII',
        hint:'The record.',
        body:(n)=>`
            <p>You have been keeping this transcript since level one. Not because anyone asked you to, but because you are a practitioner who documents, and documentation is how knowledge moves forward past the people who gathered it originally.</p>
            <p>The dead keep their own records. You have had access to those records, and they have had access to yours, and the cross-referencing has been the most productive research of your career.</p>
            <div class="chronicle-callout">The oldest spirit shared her own documentation yesterday — not a formal archive, but the accumulated observation of a thousand years of watching the Crossroads and everyone who has passed through it. Her record includes everyone who attempted this and failed, which is more people than the official histories acknowledge.<br><br>She shares this not to discourage but to contextualize. The people who failed were not weak or stupid or faithless. They were undertrained, underprepared, or arrived at the wrong time in the cycle. You are at the right time, you are trained, and you are prepared. You are also the most extensively briefed person who has ever stood in this valley with all four talismans. The dead made sure of it. They have been working toward this briefing for decades.</div>
            <p>Five more levels. The record will be complete when the work is complete.</p>
            <p><span class="chronicle-name">${n}</span> — the dead have done everything in their power to prepare you. The rest is the living's work. Do it.</p>`,
    },
    necromancer_8: {
        cls:'necromancer', level:23, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry VIII',
        hint:'Two levels.',
        body:(n)=>`
            <p>The seal fractured three days ago. The dead's messaging changed immediately — from <em>it is coming and we cannot stop it</em> to something more specific. Something more urgent. The message now is: <em>it is almost here and you are almost ready and almost is close enough.</em></p>
            <div class="chronicle-callout">The three spirits from the erased village have been unusually present over the last three days. Not speaking — just present, in the way that the dead are present when they have chosen to witness something. They chose to witness this from the beginning, and they are not leaving before it finishes.<br><br>The oldest spirit at the Crossroads spoke to you last night. She said she has now seen three cycles from this perspective — once as a living practitioner, twice as a spirit who stayed to watch — and this is the one she is most certain about. She did not elaborate on why. The dead choose their certainties carefully; when they express one, it is worth recording without requiring explanation.</div>
            <p>Two more levels. The dead are assembled and watching. The three spirits from the erased village are in the front of that assembly. They want to see how this ends.</p>
            <p><span class="chronicle-name">${n}</span> — they have been waiting a long time. Do not make them wait much longer.</p>`,
    },
    necromancer_9: {
        cls:'necromancer', level:25, icon:'💀',
        title:(n)=>n+"'s Transcripts",
        label:'The Necromancer · Entry IX',
        hint:'Final transcript entry.',
        body:(n)=>`
            <p>The seal is gone. The dead fell silent for exactly four minutes — an unprecedented quiet across every channel you maintain — and then every spirit, simultaneously, said one word: <em>now.</em></p>
            <p>This is the last entry in the transcript. When this is finished, there will be a new transcript beginning — the after-record, the documentation of what happened and what the dead witnessed and what the three spirits from the erased village finally get to say about the permanence of their existence being defended.</p>
            <div class="chronicle-callout">Sixty-seven sessions of the same message: <em>it is coming and we cannot stop it.</em> The dead were right about the coming. They were right that they could not stop it. They were also present throughout everything that happened between that first message and this moment — the training, the talismans, the Crossroads, the preparation. They watched you become someone capable of stopping what they could not.<br><br>The oldest spirit said one final thing before the silence fell: <em>Brennan was afraid. You are not. That is interesting. It may be why the talismans found you first among this cycle's candidates.</em><br><br>She declined to explain further. The dead choose their certainties carefully.</div>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>The dead cannot stop it. You can.</p>
            <p>They are watching.</p>`,
    },
});

// ── lore-berserker.js ──
// lore-berserker.js  —  Berserker class chronicle entries
// STATUS: Stub — content being written
// Levels: 1, 3, 8, 13, 15, 18, 20, 23, 25

if (typeof CHRONICLE_CONTENT === 'undefined') window.CHRONICLE_CONTENT = {};

Object.assign(CHRONICLE_CONTENT, {
    berserker_1: {
        cls:'berserker', level:1, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry I',
        hint:'What happened to your village.',
        body:(n)=>`
            <p>You came back from three days in the high passes to find your village empty. Not attacked — empty. The buildings were intact. The fires were banked. The animals were in their pens. Your grandmother was at her loom, old Davin was at the gate, the children were in the yard. Present. Breathing. Eyes open.</p>
            <p>Gone.</p>
            <div class="chronicle-callout">You have been told, by the first person who understood what you were describing, that this is what Azrath does. The Calamity Dragon — sealed beneath the earth a thousand years ago, breaking free now — does not kill. It empties. It moves through a place and strips the meaning from everything it touches until the things themselves no longer matter enough to remain present. Your people are still alive. They are just no longer there.<br><br>You have also been told that this may be reversible. That if Azrath is stopped before it fully wakes, the emptying stops with it. That the people taken first might come back when the source of the taking is gone. This was not presented as a certainty. It was presented as a possibility worth fighting for.</div>
            <p>You are <span class="chronicle-name">${n}</span>. You do not know if your people can come back. You know that if there is any chance they can, it requires you to reach level twenty-five and be capable of stopping the thing that emptied them. The dungeons ahead are not optional. Nothing is optional anymore.</p>`,
    },
    berserker_2: {
        cls:'berserker', level:3, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry II',
        hint:'What you found out.',
        body:(n)=>`
            <p>The dockmaster in Ashen Harbor knew what you were describing. You saw it in her eyes the moment you started talking — recognition, and the particular expression of someone deciding how much to say. You stayed until she decided to say all of it.</p>
            <div class="chronicle-callout">Four other villages. The dockmaster has been collecting accounts for three months, since the first one appeared in the harbor records as a merchant complaint: a ship arrived to find its port of origin emptied, the crew not harmed but their home gone in whatever way yours is gone. The four accounts are consistent. The emptying moves in a specific pattern — not random, not spreading outward from a center, but following something. Routes that correspond, the dockmaster believes, to the paths Azrath traveled in the previous cycle.<br><br>The emptying is not fully active. Azrath is not fully awake. What you experienced was overflow — the energy leaking from the failing seal, moving along the old paths by habit or gravity or something that functions like those things. When Azrath fully wakes, the emptying will be complete and systematic rather than partial and patterned.</div>
            <p>There is a Crossroads. There is a way to stop it. There is a window.</p>
            <p><span class="chronicle-name">${n}</span> — you are inside the window. Train. Get strong enough for what the window requires.</p>`,
    },
    berserker_3: {
        cls:'berserker', level:8, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry III',
        hint:'The fight and what it is for.',
        body:(n)=>`
            <p>You have not told anyone about your grandmother. About old Davin. About the children in the yard. You do not have the words for it — not because the words do not exist, but because saying the words out loud requires you to process what they describe, and processing it in full would slow you down in ways you cannot afford right now.</p>
            <p>What you have done is fight. Every dungeon, every creature, every obstacle between where you were and where you need to be. Not because fighting is easy. Because the alternative to fighting is waiting, and waiting means the window closes, and the window cannot close.</p>
            <div class="chronicle-callout">A mage on the road told you something useful without knowing it. She described Azrath's behavior as non-purposeful — not malicious, not targeted, simply what it is. The emptying of your village was not personal. Azrath did not choose your grandmother specifically. The emptying is structural, not intentional, which means it is also potentially reversible in a structural way.<br><br>She said: the seal stopped the emptying last time. Everything Azrath had done was still done — the deaths, the destruction, the things that could not be undone. But the ongoing emptying stopped. The people who had been emptied but not destroyed, in the places closest to the sealing site, came back within months.<br><br>Your village is close to the sealing site. Your grandmother's loom is still there.</div>
            <p><span class="chronicle-name">${n}</span> — two more levels and you reach the Crossroads. Two levels. Your grandmother is waiting for you to get there.</p>`,
    },
    berserker_4: {
        cls:'berserker', level:13, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry IV',
        hint:'The Crossroads.',
        body:(n)=>`
            <p><span class="chronicle-epithet">✦ Fire That Refuses to Go Out ✦</span></p>
            <p>The old man at the gate looked at you for a long moment. You expected him to ask your name or your purpose. He asked something else: how many?</p>
            <p>You told him. Five villages that you knew of. More that you did not.</p>
            <p>He nodded the way people nod when they already knew the number and needed to hear it said out loud anyway. Then he said: come in. There is something here that is relevant to you specifically.</p>
            <div class="chronicle-callout">The relevant thing was a section of the Crossroads archive documenting recovery patterns from previous cycles. In the cycle before Brennan, the emptying was more extensive — fewer talismans, less effective sealing, longer period of active Azrath presence. The recovery documentation from that cycle is detailed and consistent: in every case of partial emptying where the source was subsequently sealed or destroyed, the emptied people returned. Not immediately. Over the course of weeks to months after the source was removed. But they returned.<br><br>The archive has names. Dates. Witness accounts. Specific villages. The documentation was collected specifically because the people of that era understood that future cycles would need to know this was possible.</div>
            <p>Your grandmother is in that documentation. Not by name — she was not born yet. But her village is. The village that was partially emptied in the cycle before Brennan, and then recovered, and then survived another thousand years until your grandmother was born and sat down at her loom.</p>
            <p><span class="chronicle-name">${n}</span> — it has happened before. The village recovered. This time, you will be the reason.</p>`,
    },
    berserker_5: {
        cls:'berserker', level:15, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry V',
        hint:'The first talisman.',
        body:(n)=>`
            <p>The Wind dungeon asked you why you were doing this. You told it. You told it about the loom and old Davin and the children and the emptiness in five villages and the dockmaster's expression and the archive and your grandmother's village that recovered a thousand years ago. You told it everything, in the order it happened, without editing for what sounded acceptable.</p>
            <p>The talisman did not require nobility. It required honesty. Your reasons are honest. They are personal and specific and not at all abstract, and the Wind talisman accepted that immediately.</p>
            <div class="chronicle-callout">The talisman is warm. Not metaphorically warm — it radiates a slight heat, constant, neither increasing nor decreasing. The Fire talisman will be warmer. You are looking forward to it in a way that probably says something about you that you do not feel the need to analyze.<br><br>You have been told the talismans are testing you, learning you, calibrating to your specific qualities. If that is true, then the talisman now knows exactly why you are here and what you are willing to do. It knows about the loom. It knows about old Davin. It knows about the children in the yard. That is what the test produced. The counter-presence against the emptying, carrying the weight of everyone it is fighting for.</div>
            <p>Three more. The Fire dungeon is next and you are ready for it.</p>
            <p><span class="chronicle-name">${n}</span> — the talisman knows why you are here. Three more to tell.</p>`,
    },
    berserker_6: {
        cls:'berserker', level:18, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry VI',
        hint:'All four, and what they know.',
        body:(n)=>`
            <p>All four talismans, and they are warm in a way that has nothing to do with temperature. They carry the weight of everyone you told them about. Your grandmother. Old Davin. The children. The five villages. The hundred-plus names in the archive documentation that are not your people but are the same kind of people, emptied and recovered and living for another thousand years because someone did this work.</p>
            <div class="chronicle-callout">The archive archivist at the Crossroads — an older man who has dedicated his life to maintaining the records — said something to you yesterday that you have been thinking about since: the people in the recovery documentation did not know they had been emptied. When they came back, they came back to the moment before the emptying, as if no time had passed. Your grandmother will be at her loom. Old Davin will be at the gate. The children will be in the yard.<br><br>They will not know you were gone. They will not know what you did. They will not know that the world held its breath and someone who loved them refused to let the breath out without fighting for them first.<br><br>That is fine. That is how it should be. You know. That is enough.</div>
            <p>Seven more levels. The talismans are ready. You are nearly ready.</p>
            <p><span class="chronicle-name">${n}</span> — your grandmother does not know you are coming. Come anyway.</p>`,
    },
    berserker_7: {
        cls:'berserker', level:20, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry VII',
        hint:'What you are made of.',
        body:(n)=>`
            <p>You have not been the strongest fighter at the Crossroads. There are warriors here who are more precise, mages who are more powerful, rangers who are more skilled in ways that show more cleanly in training exercises. You are not the most anything, except possibly the most certain about why you are here.</p>
            <div class="chronicle-callout">The certainty has a specific gravity to it. Not confidence — you are not always confident. Not fearlessness — you have been afraid plenty. The certainty is simpler: your grandmother is at her loom and you are going to get her back, and every obstacle between here and that outcome is going to have to be serious enough to actually stop you, because nothing less will. That quality — the quality of someone who cannot be turned aside by anything short of an actual wall — is what the talismans recognized when they calibrated to you. It is what the Wind talisman accepted as the honest answer.<br><br>You are not fighting for abstract reasons. You are fighting for a specific person at a specific loom in a specific village, and three levels down the road from her, there are four more villages with the same situation. And behind those, everything else. The abstract reasons are real. But the loom is what makes them real to you, and the talisman knows the difference.</div>
            <p>Five more levels. The loom is waiting. Your grandmother does not know you are coming, but the talismans do, and they are ready to take you there.</p>
            <p><span class="chronicle-name">${n}</span> — five levels. The certainty has gotten you this far. It will get you the rest of the way.</p>`,
    },
    berserker_8: {
        cls:'berserker', level:23, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry VIII',
        hint:'Two levels.',
        body:(n)=>`
            <p>The seal fractured three days ago. You felt it not as a tremor but as a change in the quality of the emptiness in your village — the archivist has ways of monitoring this, and he told you immediately. The partial emptying is worse now. More of the village is affected. Your grandmother is still there, still breathing, still at the loom.</p>
            <p>Still not gone. Still recoverable. The window is still open.</p>
            <div class="chronicle-callout">The Crossroads is different now than it was when you arrived. The people here are not training anymore — they are waiting, in the focused way of people who have finished their preparation and are holding it ready. Every conversation is short and purposeful. Nobody asks how you are doing. They ask: two levels, right? You say yes. They nod and move on.<br><br>The archivist found you this morning to update the monitoring data. He did not look worried. He looked like a man who has studied enough cycles to know the difference between a close thing and a lost thing, and what he sees is a close thing. He has been doing this job for forty years. You believe his read of the situation.</div>
            <p>Two more levels. The window is open. Your grandmother is at the loom. The archivist says this is a close thing, not a lost thing.</p>
            <p><span class="chronicle-name">${n}</span> — two levels. The village is waiting. Go get them back.</p>`,
    },
    berserker_9: {
        cls:'berserker', level:25, icon:'🔥',
        title:(n)=>n+"'s Account",
        label:'The Berserker · Entry IX',
        hint:'Final account.',
        body:(n)=>`
            <p>The seal is gone. You know what this means. The emptying has stopped expanding — Azrath is fully awake, which means the overflow that caused the partial emptying has resolved into the direct presence. Worse in one sense. Better in another: direct presence can be directly confronted.</p>
            <p>Your grandmother is at the loom. The archivist confirmed it ten minutes ago.</p>
            <div class="chronicle-callout">You are going to do this, and then it is going to be over, and then you are going to go home. You are going to walk into the village and your grandmother is going to look up from the loom and say something ordinary — ask where you have been, tell you the soup is cold, comment on the state of your equipment. She will not know that anything happened. She will not know about the emptying, the Crossroads, the talismans, the twenty-five levels, the fight that is about to happen.<br><br>That is fine. That is exactly right. The point of all of this is that she gets to not know. The point of all of this is that she gets to sit at her loom in a world that still has her in it, and old Davin gets to be at the gate, and the children get to be in the yard, and none of them ever have to know how close it came to not being that way.</div>
            <p>Go, <span class="chronicle-name">${n}</span>.</p>
            <p>Your grandmother is at the loom.</p>
            <p>Go bring the world back to her.</p>`,
    },
});

