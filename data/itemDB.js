/*--Notes to add your own item:
 * 
 * 1. Similar to skills, each item function has its own target, thatt being the only paramter of the function.
 * 2. To whatever you want with the target, like in the items below
 * 3. once that code is done, return a string to update the games dialogue box
 */

var testItemFunc = function (entity) {
    if (entity != null) console.log('ALRIGHT BITCH TIME TO HEAL ' + entity.name + ' AAAAAAAAAA');
    return entity.name + ' was healed!';
};
var potion = new Item('potion', 'heals yo ass', ItemType.HEAL, testItemFunc);