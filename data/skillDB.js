/*--Notes to add your own Skill:
 * 
 * 1. All skill functions take a single parameter, that being the target you plan to effect.
 * 2. Use the examples below to create a function to either do damage toa  target, heal a target, etc.
 * 3. have the function return a string explaining what the target did toi update the games dialogue box
 */

const StrikeFunc = function (entity) {
    entity.stats.damage(10, elemType.PHYS);
    return entity.name + ' took 10 Phys Damage';
}
const strike = new Skill('Strike', 'Do a basic hit', elemType.PHYS, 1, StrikeFunc);

const guardFunc = function (entity) {
    entity.guard = true;
    return entity.name + ' is guarding...';
}
const guard = new Skill('Guard', 'guard an attack for half damage', elemType.ALLM, 0, guardFunc);

const poofFunc = function (entity) {
    entity.stats.damage(10, elemType.FIRE);
    return entity.name +' took 10 Fire Damage';
}
const poof = new Skill('Ember', 'Little fire damage', elemType.FIRE, 1, poofFunc);