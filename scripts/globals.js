const GameState = {                                 //possible states the game can be in
    TITLE: 'Title',
    DUNGEON: 'Dungeon',
    MENU: 'Menu',
    SHOP: 'Shop',
    BATTLE: 'Battle',
    OTHER: 'Other',
    PAUSE: 'Pause'
};

function setChance() {
    return Math.floor(Math.random() * 100) + 1;
};

var debug = true;
var currentState = GameState.DUNGEON;                //current state the game is in
const CIRCLE = Math.PI * 2; 					     //2pi in radians (all angles are in radians)
const rightAngle = CIRCLE / 4;						 //right angle, frequently used for rotations
var moving = false;								     //boolean to determine if camera animation is happening or not
const res = 300;                                     //resolution of the camera
var playerPos = [];                                  //player as an x, y coordinate
var playerDir = 0;                                   //direction of player (radians)
var battleChance = 100;                              //for random stuff (encounters, etc.)
const runChance = 100;                               //Chance for running away from battle
var battleCheck = false;

var startTime = Date.now();                          //universal timer for menu input
var menuBuffer = 75;                                 //how long to wait until the next input

