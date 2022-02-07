
//todo get rid of duplicate code shred between menus

window.onload = () => {
    var player = playerPreset;
    var theParty = new Party(player);
    theParty.recruit(newEnemy(DUMMY));

    var game = document.getElementById('game');
    var uiCanvas = document.getElementById('ui');

    var map = new Map(mapOne, mapOnePool, mapOneNPCs);
    var controls = new Controls();
    
    var camera = new Camera(game);
    var minimap = new Minimap(game, 16, 125, 20, 20, map);
    var menu = new pauseMenu(uiCanvas, controls.states, map, theParty);

    var diag = new DialogueBox(ui.getContext('2d'), controls.states, 900, 250, 33, testDiag);
    var playerControls = new ControlsWorld(8.5, 1.5, rightAngle, diag);

    var battler = new battleMenu(uiCanvas, controls.states, theParty, map);
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

window.onclick = () => {
    changeSong(musicWorld);
}
