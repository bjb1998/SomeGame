
var canvas = document.getElementById('ui');
const mainMenuBackground = "rgb(43,49,61)";
const selectionSprite = new Texture('assets/selector.png', 10, 10);

const mainMenuOptions = [
    'Item',
    'Skill',
    'Party',
    'Stats',
    'Settings',
    'Quit'
];
fontColorBottom = "rgb(8,39,101)";
fontColorTop = "rgb(226,226,226)";
mainMenuElem = new menuElem(mainMenuBackground, mainMenuOptions, 50, 50, 20, 0.2, 0.9);


quitMenu = new quitMenuElem();
itemMenu = new itemMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9);
settingsMenu = new settingsMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9);
skillMenu = new skillMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9);
statsMenu = new statsMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9);
partyMenu = new partyMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9);