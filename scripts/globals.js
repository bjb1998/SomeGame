const GameState = {                                                             //possible states the game can be in
    TITLE: 'Title',
    DUNGEON: 'Dungeon',
    MENU: 'Menu',
    SHOP: 'Shop',
    BATTLE: 'Battle',
    OTHER: 'Other',
    PAUSE: 'Pause'
};

var debug = true;
var currentState = GameState.DUNGEON;                                           //current state the game is in
const CIRCLE = Math.PI * 2; 													//2pi in radians (all angles are in radians)
const rightAngle = CIRCLE / 4;													//right angle, frequently used for rotations
var moving = false;																//boolean to determine if camera animation is happening or not
const res = 300;                                                                //resolution of the camera
var playerPos = [];                                                             //player as an x, y coordinate
var playerDir = 0;                                                              //direction of player (radians)
var gameFont = new FontFace('Reactor7', 'url(assets/fonts/Reactor7.ttf)');      //font to laod
document.fonts.add(gameFont);

