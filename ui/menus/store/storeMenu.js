class storeMenu extends Menu {
    constructor(canvas, controls, party, diag) {
        super(canvas, controls, party);
        this.diag = diag;
        this.background = backgroundStore.image
        this.desiredState = GameState.SHOP;
        this.topMenu = this.topMenu = new storeMenuElem(mainMenuBackground, storeOptions, 35, 50, 40, 175, 600);
    }
}