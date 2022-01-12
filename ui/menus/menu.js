class Menu{
    constructor(canvas, controls, map, party){
        this.ctx = canvas.getContext('2d');
        this.controls = controls;
        this.map = map;
        this.party = party;
        this.width = canvas.width;
        this.height = canvas.height;
        this.active == false;
        this.fontColorBottom = "rgb(8,39,101)";
        this.fontColorTop = "rgb(226,226,226)";
        this.menuColorBackground = "rgb(43,49,61)";
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
        } else {
            this.exit();
        }
    };

    //draw the background
    fillBackground() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    //todo fix bug when quitting via back button
    draw() {
        if (currentState === GameState.PAUSE) {
            //create new main menu if the stack is empty
            if (this.top === 0) { 
                this.mainMenu = new menuElem(mainMenuBackground, mainMenuOptions, 35, 50, 40, 150, 600);
                this.pushMenu(this.mainMenu);
            }
            var currentMenu = this.menuStack[this.top - 1];
            this.active = true;
            this.fillBackground();
            currentMenu.drawElem();

            //Based on the menus state, push or pop the menu stack
            if (currentMenu.state === 1 && currentMenu.nextMenu() != null) {
                this.pushMenu(currentMenu.nextMenu());
            } else if (currentMenu.state === -1) {
                this.popMenu();
            }

        } else {
            this.exit();
            this.partyStats.draw();
        }
    }

    //exit the menu, return to the game
    exit() {
        if (this.active)
            this.ctx.clearRect(0, 0, this.width, this.height);

        this.menuStack = [];
        this.top = 0;
        this.selection = 0;
        this.active = false;
        this.partyStats = new partyStatsElem(this.ctx, this.party.active,
            this.menuColorBackground, 450, 20, 130, 150);
        currentState = GameState.DUNGEON;
    }

    drawParty() {
        this.ctx.font = '20px Reactor7';
        var posX = 300;
        var posY = 20;
        for (var i = 0; i < this.party.active.length; i++) {
            this.ctx.fillStyle = this.menuColorBackground;
            this.ctx.fillRect(posX * (i + 1), posY, 130, 130);
        }
    }
}