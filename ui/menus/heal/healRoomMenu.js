class healRoomMenu extends Menu {
    constructor(canvas, controls, party, diag) {
        super(canvas, controls, party);
        this.diag = diag;
    }

    draw() {
        if (currentState === GameState.HEAL) {
            //todo implement background
            this.ctx.drawImage(backgroundHeal.image, 0, 0, 1024, 768);
            this.partyStats = new partyStatsElem(this.ctx, this.party.active,
                menuColorBackground, 225, 35, 135, 150);
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.mainMenu = new healRoomMenuElem(mainMenuBackground, healOptions, 35, 50, 40, 175, 600);
                this.pushMenu(this.mainMenu);
                this.clear();
            }
            var currentMenu = this.menuStack[this.top - 1];
            this.active = true;
            this.partyStats.draw();
            currentMenu.drawElem();

            //Based on the menus state, push or pop the menu stack
            if (currentMenu.state === 1 && currentMenu.nextMenu() != null) {
                this.pushMenu(currentMenu.nextMenu());
            } else if (currentMenu.state === -1) {
                this.popMenu();
            }

        } else if (this.active)
            this.exit();

    }

    exit() {
        if (this.active)
            this.clear();
        this.menuStack = [];
        this.top = 0;
        this.selection = 0;
        this.active = false;

        if (currentState === GameState.HEAL) currentState = GameState.DUNGEON;
    }
}