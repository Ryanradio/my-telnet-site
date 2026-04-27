// generate-equipment-lists.js
// Run with: node generate-equipment-lists.js

const fs = require('fs');

// Load weapons.js as a string and parse it
const weaponsContent = fs.readFileSync('./weapons.js', 'utf8');

// Extract the WEAPONS object
const weaponsMatch = weaponsContent.match(/const WEAPONS = ({[\s\S]*?});/);
if (!weaponsMatch) {
    console.error('Could not find WEAPONS object in weapons.js');
    process.exit(1);
}

// Safe eval (since it's your own file)
const weapons = eval('(' + weaponsMatch[1] + ')');

// Load armor.js
let armor = {};
try {
    const armorContent = fs.readFileSync('./armor.js', 'utf8');
    const armorMatch = armorContent.match(/const ARMOR = ({[\s\S]*?});/);
    if (armorMatch) {
        armor = eval('(' + armorMatch[1] + ')');
    }
} catch (e) {
    console.log('No armor.js found, armor lists will be empty');
}

// Classes to generate
const classes = ['warrior', 'rogue', 'paladin', 'mage', 'cleric', 'hunter', 'warlock', 'runesmith'];

const classNames = {
    warrior: 'Warrior',
    rogue: 'Rogue',
    paladin: 'Paladin',
    mage: 'Mage',
    cleric: 'Cleric',
    hunter: 'Hunter',
    warlock: 'Warlock',
    runesmith: 'Runesmith'
};

// Helper to get weapon type
function getWeaponType(weapon) {
    if (weapon.weaponSubtype) return weapon.weaponSubtype.toUpperCase();
    if (weapon.type) return weapon.type.toUpperCase();
    return 'WEAPON';
}

// Generate weapons list for a class
function generateWeaponsList(className) {
    const lines = [];
    const header = `═══════════════════════════════════════════════════════════════
                    ${classNames[className].toUpperCase()} WEAPONS
═══════════════════════════════════════════════════════════════

Weapon Types: ${getWeaponTypesForClass(className)}

`;
    lines.push(header);

    // Group by level
    for (let level = 1; level <= 25; level++) {
        const weaponsAtLevel = [];
        
        for (const [id, weapon] of Object.entries(weapons)) {
            // Skip bare fists and unarmed
            if (weapon.unarmed) continue;
            if (weapon.level !== level) continue;
            
            // Check if class can use this weapon
            if (weapon.allowedClasses && !weapon.allowedClasses.includes(className)) continue;
            
            const name = weapon.name || id;
            const dmgMin = weapon.baseDamage || 0;
            const dmgMax = weapon.maxDamage || weapon.baseDamage || 0;
            const magic = weapon.baseMagicDamage || 0;
            const cost = weapon.cost || 0;
            const type = getWeaponType(weapon);
            
            weaponsAtLevel.push(`  ${name.padEnd(30)} Dmg: ${dmgMin}-${dmgMax} | Magic: ${magic} | ${type} | Cost: ${cost}`);
        }
        
        if (weaponsAtLevel.length > 0) {
            lines.push(`═══════════════════════════════════════════════════════════════`);
            lines.push(`LEVEL ${level}`);
            lines.push(`═══════════════════════════════════════════════════════════════`);
            lines.push(...weaponsAtLevel.sort());
            lines.push('');
        }
    }
    
    lines.push(`═══════════════════════════════════════════════════════════════`);
    lines.push(`                    END OF LIST`);
    lines.push(`═══════════════════════════════════════════════════════════════`);
    
    return lines.join('\n');
}

// Generate armor list for a class
function generateArmorList(className) {
    const lines = [];
    const header = `═══════════════════════════════════════════════════════════════
                    ${classNames[className].toUpperCase()} ARMOR
═══════════════════════════════════════════════════════════════
`;
    lines.push(header);
    
    if (Object.keys(armor).length === 0) {
        lines.push(`\nNo armor data available. Make sure armor.js is loaded.\n`);
    } else {
        for (let level = 1; level <= 25; level++) {
            const armorAtLevel = [];
            
            for (const [id, item] of Object.entries(armor)) {
                if (item.unarmored) continue;
                if (item.level !== level) continue;
                
                // Check if class can use this armor
                if (item.allowedClasses && !item.allowedClasses.includes(className)) continue;
                
                const name = item.name || id;
                const defense = item.baseDefense || item.defense || 0;
                const magic = item.baseMagicBonus || item.magicBonus || 0;
                const cost = item.cost || 0;
                
                armorAtLevel.push(`  ${name.padEnd(30)} DEF: ${defense} | Magic: +${magic} | Cost: ${cost}`);
            }
            
            if (armorAtLevel.length > 0) {
                lines.push(`═══════════════════════════════════════════════════════════════`);
                lines.push(`LEVEL ${level}`);
                lines.push(`═══════════════════════════════════════════════════════════════`);
                lines.push(...armorAtLevel.sort());
                lines.push('');
            }
        }
    }
    
    lines.push(`═══════════════════════════════════════════════════════════════`);
    lines.push(`                    END OF LIST`);
    lines.push(`═══════════════════════════════════════════════════════════════`);
    
    return lines.join('\n');
}

function getWeaponTypesForClass(className) {
    const types = new Set();
    for (const [id, weapon] of Object.entries(weapons)) {
        if (weapon.unarmed) continue;
        if (weapon.allowedClasses && weapon.allowedClasses.includes(className)) {
            if (weapon.weaponSubtype) types.add(weapon.weaponSubtype.toUpperCase());
            else if (weapon.type) types.add(weapon.type.toUpperCase());
        }
    }
    return Array.from(types).join(', ');
}

// Generate all files
console.log('🔧 Generating equipment lists...\n');

for (const className of classes) {
    // Generate weapons file
    const weaponsContent = generateWeaponsList(className);
    const weaponsFile = `${className}-weapons-list.txt`;
    fs.writeFileSync(weaponsFile, weaponsContent);
    console.log(`✅ Created: ${weaponsFile}`);
    
    // Generate armor file
    const armorContent = generateArmorList(className);
    const armorFile = `${className}-armor-list.txt`;
    fs.writeFileSync(armorFile, armorContent);
    console.log(`✅ Created: ${armorFile}`);
}

console.log(`\n✨ Done! Generated 16 files (${classes.length} classes × 2 files each)`);
console.log('\nRun with: node generate-equipment-lists.js');
console.log('Make sure weapons.js and armor.js are in the same directory.');