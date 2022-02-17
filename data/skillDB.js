/*--Notes to add your own Skill:
 * 
 * 1. All skill functions take two paramters, the source (the attacker) and entity (the attack-e)
 * 2. Refer to StrikeFunc below to craft a skill all your own, with its own elements and stats
 * 3. refer to the doucmentation fo each function for details
 */

//returns the elemental resistance of the entity
const checkRes = function (elem, entity) {
    return entity.stats.res.getRes(elem);
}

//Calculate and return damage with given stats and damage multiplier
//I took this formula from pokemon so Nintendo if you take this down then you acknowledge this game is canon to Pokemon :)
const calcDamage = function (attackerLvl, attackerStat, defenderStat, baseDamage, damageMult) {
    const lvlModifier = (2 * attackerLvl + 10) / 250;
    const mult = ((attackerStat / defenderStat) * baseDamage * damageMult) + 1;
    return Math.ceil(lvlModifier * mult);
}

//Execute a skill with the given stats from the attacker, target, element, and base damage of the move
const execSkill = function (source, attackerStat, entity, defenderStat, baseDamage, elem) {
    const damageMult = checkRes(elem, entity);
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    else if (damageMult === 0) return (entity.name + ' is immune to ' + elem + '!');


    return entity.name + ' took ' +
        entity.stats.damage(Math.ceil(calcDamage(source.stats.lvl, attackerStat, defenderStat, baseDamage, damageMult) / (entity.guard + 1)))
        + ' ' + elem + ' damage!';
}

const checkHealth = function (entity) {
    if (entity.stats.hp <= 0) {
        return true;
    }
}

//Simple physical attack with base 10 attack power
const StrikeFunc = function (source, entity) {
    return execSkill(source, source.stats.atk, entity, entity.stats.def, 10, elemType.PHYS);
}

//set an entities guard variable to true. reduces damage from incoming attacks
const guardFunc = function (source, entity) {
    entity.guard = true;
    return entity.name + ' is guarding...';
}

//regular attacks
const emberFunc = function (source, entity) {
    return execSkill(source, source.stats.mag, entity, entity.stats.def, 10, elemType.FIRE);
}
const blazeFunc = function (source, entity) {
    return execSkill(source, source.stats.mag, entity, entity.stats.def, 20, elemType.FIRE);
}
const staticFunc = function (source, entity) {
    return execSkill(source, source.stats.mag, entity, entity.stats.def, 10, elemType.ELEC);
}
const boltFunc = function (source, entity) {
    return execSkill(source, source.stats.mag, entity, entity.stats.def, 20, elemType.ELEC);
}
const iceFunc = function (source, entity) {
    return execSkill(source, source.stats.mag, entity, entity.stats.def, 10, elemType.ICE);
}
const freezeFunc = function (source, entity) {
    return execSkill(source, source.stats.mag, entity, entity.stats.def, 20, elemType.ICE);
}

const strike = new Skill('Strike', 'Light physical damage', elemType.PHYS, 1, StrikeFunc);
const guard = new Skill('Guard', 'Guard an attack for half damage', elemType.ALLM, 0, guardFunc);
const ember = new Skill('Ember', 'Light fire damage', elemType.FIRE, 1, emberFunc);
const blaze = new Skill('Blaze', 'Medium fire damage', elemType.FIRE, 1, blazeFunc);
const static = new Skill('Static', 'Light electric damage', elemType.ELEC, 1, staticFunc);
const bolt = new Skill('Bolt', 'Medium electric damage', elemType.ELEC, 1, boltFunc);
const ice = new Skill('Ice', 'Light ice damage', elemType.ICE, 1, iceFunc);
const freeze = new Skill('Freeze', 'Medium ice damage', elemType.ICE, 1, freezeFunc);