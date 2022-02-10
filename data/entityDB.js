/* 
 * Chances are you're here because you wanna make an enemy. Here are the steps.
 * 1. Put its sprite sheet in /asssets/enemies/[your_enemy].png
 * 2. Make a texture object for the enemy in textureDB.js
 * 3. Make an animation for your enemy in animDB.js
 * 4. Make stats, resistances, and skills in this file
 * Work off from the Dummy, Microwave, or Plunger if you get stuck
 * 5. Add the enemy to the maps enemy pool in MapDB.js
 */

newEnemy = function (enemy) {
    const stats = newObj(enemy.stats);
    const skills = newObj(enemy.skills);
    return new Pawn(enemy.name, stats, enemy.exp, skills, enemy.animation, enemy.sfxs);
} //make new instance of Enemy

newObj = function(obj){
    return Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
}

//--Player--//
const playerRes = new Resistance(1, 1, 2, 1, 1, 1, 1, 1, 1);
const playerStats = new Stats(5, 5, 4, 4, 4, 3, 5, 3, playerRes);
const inv = [potion];
const skills = [strike];
var playerPreset = new MC("Bob", playerStats, 100, inv, skills, [attack_phys]);
//--Player--//


const DUMMYRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const DUMMYStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, DUMMYRes);
const DUMMYSkills = [strike, ember];

const MicrowaveRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const MicrowaveStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, DUMMYRes);
const MicrowaveSkills = [strike, ember];

const PlungerRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const PlungerStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, PlungerRes);
const PlungerSkills = [strike, ember];

const VacuumRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const VacuumStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, VacuumRes);
const VacuumSkills = [strike, ember];

const PhoneRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const PhoneStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, PhoneRes);
const PhoneSkills = [strike, ember];

const WashingMachineRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const WashingMachineStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, WashingMachineRes);
const WashingMachineSkills = [strike, ember];

var DUMMY = new Pawn('DUMMY', DUMMYStats, 100, DUMMYSkills, DUMMYanim, [attack_phys]);
var Microwave = new Pawn('Microwave', MicrowaveStats, 100, MicrowaveSkills, MicrowaveAnim, [sfx_microwave]);
var Plunger = new Pawn('Plunger', PlungerStats, 100, PlungerSkills, PlungerAnim, [sfx_Plunger]);
var Vacuum = new Pawn('Vacuum', VacuumStats, 100, VacuumSkills, VacuumAnim, [sfx_vacuum]);
var Phone = new Pawn('Phone', PhoneStats, 100, PhoneSkills, PhoneAnim, [sfx_phone]);
var WashingMachine = new Pawn('Washer', WashingMachineStats, 100, WashingMachineSkills, WashingMachineAnim, [sfx_washer]);

