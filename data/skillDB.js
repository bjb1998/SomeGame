/*--Notes to add your own Skill:
 * 
 * 1. All skill functions take a single parameter, that being the target you plan to effect.
 * 2. Use the examples below to create a function to either do damage toa  target, heal a target, etc.
 * 3. have the function return a string explaining what the target did toi update the games dialogue box
 */

const checkRes = function (elem, entity) {
    const mult = entity.stats.res.getRes(elem);
    if (mult === 0) return (entity.name + 'is immune to ' + elem + '!');
    else return mult;
}

const StrikeFunc = function (source, entity) {
    const elem = elemType.PHYS;
    const damageMult = checkRes(elem, entity);
    if (damageMult instanceof String) return damageMult;
    console.log(source.stats);
    console.log(entity.stats);
    entity.stats.damage(10, elem);
    return entity.name + ' took 10 Phys Damage';
}
const strike = new Skill('Strike', 'Do a basic hit', elemType.PHYS, 1, StrikeFunc);

const guardFunc = function (source, entity) {
    entity.guard = true;
    return entity.name + ' is guarding...';
}
const guard = new Skill('Guard', 'guard an attack for half damage', elemType.ALLM, 0, guardFunc);

const emberFunc = function (source, entity) {
    entity.stats.damage(10, elemType.FIRE);
    return entity.name +' took 10 Fire Damage';
}
const ember = new Skill('Ember', 'Little fire damage', elemType.FIRE, 1, emberFunc);