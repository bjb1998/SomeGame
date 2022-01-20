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
        this.party = party;
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
            this.menuStack[this.top - 1].denyBuffer = true;
            this.clear();
        } else {
            this.exit();
        }
    };

    initBattle() {
        battleCheck = false;
        if (currentState === GameState.DUNGEON) {
            const chance = setChance();
            if (chance <= this.battleChance) {
                currentState = GameState.BATTLE;

                this.enemies = new EnemyParty(newEnemy(DUMMY));
                this.enemies.recruit(newEnemy(DUMMY));
                this.enemies.recruit(newEnemy(DUMMY));
                this.enemies.recruit(newEnemy(DUMMY));

                this.partyStats = new partyStatsElem(this.ctx, this.party.active,
                    menuColorBackground, 200, 35, 135, 150);

                this.enemyStats = new partyStatsElem(this.ctx, this.enemies.active,
                    menuColorBackground, 350, 35, 135, 150);

                this.battle = new Battle(this.party.active, this.enemies.active);
            }
        }
    }

    //draw all things battling
    draw() {
        if (battleCheck)
            this.initBattle();
        if (currentState === GameState.BATTLE) {
            this.partyStats.draw();
            this.enemyStats.draw();
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.mainMenu = new battleMenuElem(mainMenuBackground, battleMenuOptions, 35, 50, 40, 150, 600, this.party);
                this.pushMenu(this.mainMenu);
                this.clear();
            }
            var currentMenu = this.menuStack[this.top - 1];
            this.active = true;
            
            currentMenu.drawElem();

            //Based on the menus state, push or pop the menu stack
            if (currentMenu.state === 1 && currentMenu.nextMenu() != null) {
                this.pushMenu(currentMenu.nextMenu());
            } else if (currentMenu.state === -1 && this.menuStack.length > 1) {
                this.popMenu();
            }

            //todo implement exp gain, leveling up, etc.
            if (this.battle.turn.check() === endState.WIN) {
                this.exit();
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
        this.active = false;
        this.enemies = [];
        this.battle = null;
        this.top = 0;
        this.selection = 0;
        battleChance = 101;
        if (currentState === GameState.BATTLE) currentState = GameState.DUNGEON;
        
    }


}