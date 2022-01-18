class pauseMenu{
    constructor(canvas, controls, map, party){
        this.ctx = canvas.getContext('2d');
        this.controls = controls;
        this.map = map;
        this.party = party;
        this.width = canvas.width;
        this.height = canvas.height;
        this.active == false;
        this.menuStack = [];
        this.top = this.menuStack.length;
        this.mainMenu = 0;
        this.statsX = 450;
        this.statsY = 20;
        this.partyStats = 0;
    }

    pushMenu(elem) {
        elem.init(this);
        this.menuStack.push(elem);
        this.top = this.menuStack.length;
    }

    popMenu() {
        this.menuStack.pop();
        this.top = this.menuStack.length;
        //If the stack is not empty, reset its state
        //otherwise, exit
        if (this.top != 0) {
            this.menuStack[this.top - 1].state = 0;
            this.menuStack[this.top - 1].resetTimer();
            this.clear();
        } else {
            this.exit();
        }
    };

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

    clear() {
        this.ctx.clearRect(0, 0, 1000, 1000);
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