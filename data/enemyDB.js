newEnemy = function (enemy) {
    const stats = newObj(enemy.stats);
    const skills = newObj(enemy.skills);
    return new Pawn(enemy.name, stats, enemy.exp, skills);
} //make new instance of Enemy

newObj = function(obj){
    return Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
}



const DUMMYRes = new Resistance(1, 1, 1, 1, 1, 1, 1, 1, 1);
const DUMMYStats = new Stats(1, 1, 15, 1, 1, 1, 1, 1, DUMMYRes);
const DUMMYSkills = [strike, poof];
var DUMMY = new Pawn('DUMMY', DUMMYStats, 100, DUMMYSkills);

