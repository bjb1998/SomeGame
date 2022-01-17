class battleMenu {
    constructor(canvas, controls, party) {
        this.ctx = canvas.getContext('2d');
        this.playerControls;
        this.battleChance = 50;
        this.selction = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.menuStack = [];
        this.enemies = [];
        this.controls = controls;
        this.playerParty = party;
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

    initBattle() {
        if (currentState === GameState.DUNGEON && chance <= this.battleChance) {
            currentState = GameState.BATTLE;
            console.log("AAAAAA A BATTLE!!!!!1!111!1");

            this.enemies = new EnemyParty(DUMMY);
            this.enemies.recruit(DUMMY);
            this.enemies.recruit(DUMMY);
            this.enemies.recruit(DUMMY);

            console.log(this.enemies.active);

            this.partyStats = new partyStatsElem(this.ctx, this.playerParty.active,
                menuColorBackground, 200, 35, 135, 150);

            this.enemyStats = new partyStatsElem(this.ctx, this.enemies.active,
                menuColorBackground, 350, 35, 135, 150);
        }
    }

    draw() {
        this.initBattle();
        if (currentState === GameState.BATTLE) {
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.mainMenu = new battleMenuElem(mainMenuBackground, battleMenuOptions, 35, 50, 40, 150, 600);
                this.pushMenu(this.mainMenu);
                this.clear();
            }
            var currentMenu = this.menuStack[this.top - 1];
            this.active = true;
            currentMenu.drawElem();

            this.partyStats.draw();
            this.enemyStats.draw();

            //Based on the menus state, push or pop the menu stack
            if (currentMenu.state === 1 && currentMenu.nextMenu() != null) {
                this.pushMenu(currentMenu.nextMenu());
            } else if (currentMenu.state === -1 && this.menuStack.length > 1) {
                this.popMenu();
            }

        } else
            this.exit();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    exit() {
        if (this.active)
            this.clear();

        this.menuStack = [];
        this.enemies = [];
        this.top = 0;
        this.selection = 0;
        if (currentState === GameState.BATTLE) currentState = GameState.DUNGEON;
    }


}