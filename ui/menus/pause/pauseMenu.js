class pauseMenu extends Menu{
    constructor(canvas, controls, map, party) {
        super(canvas, controls, party);
        this.desiredState = GameState.PAUSE;
        this.topMenu = new pauseMenuElem(mainMenuBackground, mainMenuOptions, 35, 50, 40, 175, 600);
    }
}