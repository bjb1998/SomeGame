const StrikeFunc = function (entity) { console.log('*punches' + entity.name + '*');}
const strike = new Skill('Strike', 'Do a basic hit', elemType.PHYS, 1, StrikeFunc);

const poofFunc = function (entity) { console.log('*poofs' + entity.name + '*') }
const poof = new Skill('Poof', 'Do a poof', elemType.FIRE, 1, poofFunc);