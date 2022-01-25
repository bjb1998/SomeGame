const StrikeFunc = function (entity) { entity.stats.damage(10, elemType.PHYS);}
const strike = new Skill('Strike', 'Do a basic hit', elemType.PHYS, 1, StrikeFunc);

const guardFunc = function (entity) { entity.guard = true; }
const guard = new Skill('Guard', 'guard an attack for half damage', elemType.ALLM, 0, guardFunc);

const poofFunc = function (entity) { entity.stats.damage(10, elemType.FIRE); }
const poof = new Skill('Poof', 'Do a poof', elemType.FIRE, 1, poofFunc);

const reheatFunc = function (entity) {entity.stats.damage(10, elemType.FIRE); }
const reheat = new Skill("*BRRRRRRR*", "reheat", elemType.FIRE, 1, reheatFunc);

const unclogFunc = function (entity) {entity.stats.damage(10, elemType.FORCE); }
const unclog = new Skill("*PLUNGSH*", "unclog", elemType.FORCE, 1, unclogFunc)