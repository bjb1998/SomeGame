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
var DUMMY = new Pawn('DUMMY', DUMMYStats, 100, DUMMYSkills, DUMMYanim);
console.log(DUMMY);


const microwaveRes = new Resistance(4, 2, 3, 10, 3, 4, 8, 2, 1);
const microwaveStats = new Stats(1, 5, 6, 2, 4, 8, 3, 5, microwaveRes);
const microwaveSkills = [reheat];
var microwave = new Pawn('Microwave',microwaveStats,100,microwaveSkills,microwaveAnim);

const plungerRes = new Resistance(1, 5, 2, 2, 10, 6, 6, 1);
const plungerStats = new Stats(1, 5, 6, 2, 4, 8, 3, 5, microwaveRes);
const plungerSkills = [unclog];
var plunger = new Pawn('Plunger', plungerStats, 100, plungerSkills, plungerAnim);
