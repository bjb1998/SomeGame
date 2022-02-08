
var canvas = document.getElementById('ui');
const mainMenuBackground = "rgb(43,49,61)";
var gameFont = new FontFace('Reactor7', 'url(assets/fonts/Reactor7.ttf)');      //font to load

gameFont.load().then(function (loaded_face) {
    document.fonts.add(loaded_face);
}).catch(function (error) {
    console.log('Fail to laod font, pls let Brandon know. thanks.');
});

const mainMenuOptions = [
    'Item',
    'Party',
    'Swap',
    'Exit'
];
const battleMenuOptions = [
    'Attack',
    'Skill',
    'Item',
    'Guard',
    'Run'
];
const healOptions = [
    'Heal',
    'Talk',
    'Exit'
];
const storeOptions = [
    'Shop',
    'Talk',
    'Exit'
];
fontColorBottom = "rgb(8,39,101)";
fontColorTop = "rgb(226,226,226)";
menuColorBackground = "rgb(43,49,61)";