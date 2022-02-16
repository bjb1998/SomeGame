/*--Notes to add your own item:
 * 
 * 1. Similar to skills, each item function has its own target, thatt being the only paramter of the function.
 * 2. To whatever you want with the target, like in the items below
 * 3. once that code is done, return a string to update the games dialogue box
 */

const potionFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.damage(-10);
    return entity.name + ' was healed!';
};
const superPotionFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.damage(-20);
    return entity.name + ' was healed a lot!';
};
const megaPotionFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.damage(-50);
    return entity.name + ' was healed a ton!';
};

const magiciteFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.useMP(-10);
    return entity.name + ' restored some MP!';
};
const superMagiciteFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.useMP(-20);
    return entity.name + ' restored a lot of MP!';
};
const megaMagiciteFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.useMP(-50);
    return entity.name + ' restored a ton of MP!';
};

const cyanidePillFunc = function (entity) {
    if (checkHealth(entity)) return 'But ' + entity.name + ' is already dead!';
    entity.stats.hp = 1;
    return entity.name + ' foolishly swallows the pill.'
};
const mysteryWaterFunc = function (entity) {
    return 'It\'s just lemonade... Nothing happened.'
};

const potion = new Item('Potion', 'Heals 10 HP', ItemType.HEAL, potionFunc, 10);
const superPotion = new Item('Super Potion', 'Heals 20 HP', ItemType.HEAL, superPotionFunc, 20);
const megaPotion = new Item('Mega Potion', 'Heals 50 HP', ItemType.HEAL, megaPotionFunc, 50);

const magicite = new Item('Magicite', 'Heals 10 MP', ItemType.HEAL, magiciteFunc, 15);
const superMagicite = new Item('Super Magicite', 'Heals 20 MP', ItemType.HEAL, superMagiciteFunc, 30);
const megaMagicite = new Item('Mega Magicite', 'Heals 50 MP', ItemType.HEAL, megaMagiciteFunc, 65);

const cyanidePill = new Item('Cyanide Pill', 'Reduces you to 1 HP', ItemType.HEAL, cyanidePillFunc, 10);
const mysteryWater = new Item('Mystery Water', 'Cures every illness known to man', ItemType.HEAL, mysteryWaterFunc, 100);