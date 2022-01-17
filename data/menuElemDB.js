
var canvas = document.getElementById('ui');
const mainMenuBackground = "rgb(43,49,61)";
const selectionSprite = new Texture('assets/selector.png', 10, 10);
var gameFont = new FontFace('Reactor7', 'url(assets/fonts/Reactor7.ttf)');      //font to load
document.fonts.add(gameFont);

const mainMenuOptions = [
    'Item',
    'Party',
    'Exit'
];
const battleMenuOptions = [
    'Attack',
    'Skill',
    'Item',
    'Run'
];
fontColorBottom = "rgb(8,39,101)";
fontColorTop = "rgb(226,226,226)";
menuColorBackground = "rgb(43,49,61)";