class pauseMenu extends Menu{
    constructor(canvas, controls, map, party) {
        super(canvas, controls, party);
    }

    draw() {
        if (currentState === GameState.PAUSE) {
            this.partyStats = new partyStatsElem(this.ctx, this.party.active,
                menuColorBackground, 225, 35, 135, 150);
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.mainMenu = new pauseMenuElem(mainMenuBackground, mainMenuOptions, 35, 50, 40, 175, 600);
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

        } else if(this.active)
            this.exit();

        
    }

    exit() {
        if (this.active)
            this.clear();
        this.menuStack = [];
        this.top = 0;
        this.selection = 0;
        this.active = false;
        if (currentState === GameState.PAUSE) currentState = GameState.DUNGEON;
    }
}