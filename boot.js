

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

    var diag = new DialogueBox(ui.getContext('2d'), controls.states, 900, 250, 33, healerDiag);
    var playerControls = new ControlsWorld(8.5, 1.5, rightAngle, diag);

    var battler = new battleMenu(uiCanvas, controls.states, theParty, map);

    var healer = new healRoomMenu(uiCanvas, controls.states, theParty, diag);
    var store = new storeMenu(uiCanvas, controls.states, theParty, diag);

    var loop = new GameLoop();

    currentState = GameState.TITLE;

    loop.start(function frame() {
        playerControls.update(controls.states, map);
        camera.render(playerControls, map);
        minimap.drawMap();
        menu.draw();
        battler.draw();
        diag.draw();
        healer.draw();
        store.draw();
    });
};

window.onclick = () => {
    if (currentState === GameState.TITLE) {
        changeSong(musicWorld);
        currentState = GameState.DUNGEON;
    }
}
