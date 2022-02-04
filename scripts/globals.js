const GameState = {                                 //possible states the game can be in
    TITLE: 'Title',
    DUNGEON: 'Dungeon',
    MENU: 'Menu',
    SHOP: 'Shop',
    BATTLE: 'Battle',
    DIALOGUE: 'Dialogue',
    PAUSE: 'Pause'
};                                //sates the game can be in

function setChance() {
    return Math.floor(Math.random() * 100) + 1;
};                             //Set chance for random stuff

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function changeResolution(val) {
    res = val;
}

var npc = null;
var debug = true;
var currentState = GameState.DUNGEON;                //current state the game is in
const CIRCLE = Math.PI * 2; 					     //2pi in radians (all angles are in radians)
const rightAngle = CIRCLE / 4;						 //right angle, frequently used for rotations
var moving = false;								     //boolean to determine if camera animation is happening or not
var res = 175;                                       //resolution of the camera
var playerPos = [];                                  //player as an x, y coordinate
var playerDir = 0;                                   //direction of player (radians)
var battleChance = 50;                                //for random stuff (encounters, etc.)
var runChance = 75;                                 //chance of running away from battles
var battleCheck = false;

var menuBuffer = 65;                                //how long to wait until the next input

