var testItemFunc = function (entity) {
    console.log(entity);
    console.log('ALRIGHT BITCH TIME TO HEAL ' + entity.name + ' AAAAAAAAAA');
};
var potion = new Item('potion', 'heals yo ass', ItemType.HEAL, testItemFunc);