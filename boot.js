
//todo get rid of duplicate code shred between menus

window.onload = () => {
    console.log(document);
    var player = playerPreset;
    var theParty = new Party(player);
    theParty.recruit(newEnemy(DUMMY));

    var game = document.getElementById('game');
    var UICanvas = document.getElementById('ui');
    var battleCanvas = document.getElementById('battle');

    var map = new RandomMap(32);
    var playerControls = new ControlsWorld(0.5, 0.5, rightAngle);

    var controls = new Controls();
    
    var camera = new Camera(game, res);
    var minimap = new Minimap(UICanvas, 16, 125, 20, 20, map);
    var menu = new pauseMenu(UICanvas, controls.states, map, theParty);
    var battler = new battleMenu(battleCanvas, controls.states, theParty);
    var loop = new GameLoop();

    map.randomize();

    document.onkeydown = function (e) {
        if(debug === false) return (e.which || e.keyCode) != 116;
    };

    loop.start(function frame() {
        playerControls.update(controls.states, map);
        camera.render(playerControls, map);
        minimap.drawMap();
        menu.draw();
        battler.draw();
    });
};


window.setTimeout(function () {
    console.log("One Second Delay");
}, 1000);

window.setTimeout(function () {
    console.log("One Millisecond Delay");
}, 1);
