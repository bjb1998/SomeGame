
/*var player = playerPreset;
var theParty = new Party(player);
console.log(theParty);

//make in ivnentory with a so-called potion, then use it
console.log(player.inv);
player.inv.use(player.inv.items[0]);
console.log(player.inv);

//Put skills into the players skill slot, then do them
player.skills[0].exec();

var dummy = DUMMY;
theParty.recruit(dummy);
console.log(theParty);

theParty.recruit(dummy);
console.log(theParty);

theParty.swapActive(player, DUMMY);
console.log(theParty);

theParty.swapActive(player, DUMMY);
console.log(theParty);

theParty.swapReserve(player, DUMMY);
console.log(theParty);

theParty.swapActive(player, DUMMY);
console.log(theParty);

theParty.swapReserve(player, DUMMY);
console.log(theParty);*/

// advanced JavaScript
// JavaScript is asynchronous
    // window is the top object
    // setTimeout delays a function call
// functions can be declared inline even as arguments
// functions can be passed as arguments to other functions

window.onload = () => {
    console.log(document);
    var player = playerPreset;
    var theParty = new Party(player);

    var game = document.getElementById('game');
    var UICanvas = document.getElementById('ui');

    var map = new RandomMap(32);
    var player = new ControlsWorld(0.5, 0.5, rightAngle);

    var controls = new Controls();
    var camera = new Camera(game, res);
    var minimap = new Minimap(UICanvas, 16, 125, 20, 20, map);
    var menu = new Menu(UICanvas, controls.states, map, theParty); //todo make player and party not null
    var loop = new GameLoop();

    map.randomize();

    document.onkeydown = function (e) {
        if(debug === false) return (e.which || e.keyCode) != 116;
    };

    loop.start(function frame() {
        player.update(controls.states, map);
        camera.render(player, map);
        minimap.drawMap();
        menu.draw();
    });
};


window.setTimeout(function () {
    console.log("One Second Delay");
}, 1000);

window.setTimeout(function () {
    console.log("One Millisecond Delay");
}, 1);
