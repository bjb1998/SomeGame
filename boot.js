
//todo get rid of duplicate code shred between menus

window.onload = () => {
    var player = playerPreset;
    var theParty = new Party(player);
    theParty.recruit(newEnemy(DUMMY));

    var game = document.getElementById('game');
    var UICanvas = document.getElementById('ui');
    var battleCanvas = document.getElementById('battle');

    var map = new Map(mapOne, mapOnePool, mapOneNPCs);
    var controls = new Controls();
    
    var camera = new Camera(game, res);
    var minimap = new Minimap(UICanvas, 16, 125, 20, 20, map);
    var menu = new pauseMenu(UICanvas, controls.states, map, theParty);

    //this is temporary and for testing dialogue boxes
    var diag = new DialogueBox(UICanvas.getContext('2d'), controls.states, 900, 250, 33, testDiag);
    var playerControls = new ControlsWorld(8.5, 1.5, rightAngle, diag);

    var battler = new battleMenu(battleCanvas, controls.states, theParty, map);
    var loop = new GameLoop();

    loop.start(function frame() {
        playerControls.update(controls.states, map);
        camera.render(playerControls, map);
        minimap.drawMap();
        menu.draw();
        battler.draw();
        diag.draw();
    });
};


window.setTimeout(function () {
    console.log("One Second Delay");
}, 1000);

window.setTimeout(function () {
    console.log("One Millisecond Delay");
}, 1);
