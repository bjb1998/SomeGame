class healRoomMenu extends Menu {
    constructor(canvas, controls, party, diag) {
        super(canvas, controls, party);
        this.diag = diag;
        this.desiredState = GameState.HEAL;
        this.topMenu = new healRoomMenuElem(mainMenuBackground, healOptions, 35, 50, 40, 175, 600);
    }
}