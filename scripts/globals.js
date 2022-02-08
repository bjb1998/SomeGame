const GameState = {                                 //possible states the game can be in
    TITLE: 'Title',
    DUNGEON: 'Dungeon',
    MENU: 'Menu',
    SHOP: 'Shop',
    HEAL: 'Heal',
    BATTLE: 'Battle',
    DIALOGUE: 'Dialogue',
    PAUSE: 'Pause'
};

function setChance() {
    return Math.floor(Math.random() * 100) + 1;
};                             //Set chance for random stuff

function changeResolution(val) {
    res = val;
}

var currentSong = null;                              //song game is playing at the moment
var sfxVol = 1;
var musicVol = 1;
var worldObject = null;                               //current npc on screen
var debug = true;                                    //debug stuff
var currentState = GameState.DUNGEON;                //current state the game is in
const CIRCLE = Math.PI * 2; 					     //2pi in radians (all angles are in radians)
const rightAngle = CIRCLE / 4;						 //right angle, frequently used for rotations
var moving = false;								     //boolean to determine if camera animation is happening or not
var res = 175;                                       //resolution of the camera
var playerPos = [];                                  //player as an x, y coordinate
var playerDir = 0;                                   //direction of player (radians)
var battleChance = 5;                                //for random stuff (encounters, etc.)
var runChance = 75;                                  //chance of running away from battles
var battleCheck = false;

var menuBuffer = 65;                                //how long to wait until the next input

