class pauseMenu extends Menu{
    constructor(canvas, controls, map, party) {
        super(canvas, controls, party);
        this.map = map;
    }

    //todo fix bug when quitting via back button
    draw() {
        if (currentState === GameState.PAUSE) {
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.mainMenu = new pauseMenuElem(mainMenuBackground, mainMenuOptions, 35, 50, 40, 150, 600);
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

        } else
            this.exit();

        
    }

    //exit the menu, return to the game
    exit() {
        if (this.active)
            this.clear();
        this.menuStack = [];
        this.top = 0;
        this.selection = 0;
        this.active = false;
        this.partyStats = new partyStatsElem(this.ctx, this.party.active,
            menuColorBackground, 200, 35, 135, 150);
        if (currentState === GameState.PAUSE) currentState = GameState.DUNGEON;
    }
}