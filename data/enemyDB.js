/* 
 * Chances are you're here because you wanna make an enemy. Here are the steps.
 * 1. Put its sprite sheet in /asssets/enemies/[your_enemy].png
 * 2. Make a texture object for the enemy in textureDB.js
 * 3. Make an animation for your enemy in animDB.js
 * 4. Make stats, resistances, and skills in this file
 * Work off from the Dummy, Microwave, or Plunger if you get stuck
 */

newEnemy = function (enemy) {
    const stats = newObj(enemy.stats);
    const skills = newObj(enemy.skills);
    return new Pawn(enemy.name, stats, enemy.exp, skills, enemy.animation);
} //make new instance of Enemy

newObj = function(obj){
    return Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
}


const DUMMYRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const DUMMYStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, DUMMYRes);
const DUMMYSkills = [strike, poof];

const MicrowaveRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const MicrowaveStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, DUMMYRes);
const MicrowaveSkills = [strike, poof];

const PlungerRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const PlungerStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, PlungerRes);
const PlungerSkills = [strike, poof];

const VacuumRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const VacuumStats = new Stats(1, 1, 99, 1, 1, 1, 1, 1, VacuumRes);
const VacuumSkills = [strike, poof];

var DUMMY = new Pawn('DUMMY', DUMMYStats, 100, DUMMYSkills, DUMMYanim);
var Microwave = new Pawn('Microwave', MicrowaveStats, 100, MicrowaveSkills, MicrowaveAnim);
var Plunger = new Pawn('Plunger', PlungerStats, 100, PlungerSkills, PlunglerAnim);
var Vacuum = new Pawn('Vacuum', VacuumStats, 100, VacuumSkills, VacuumAnim);

