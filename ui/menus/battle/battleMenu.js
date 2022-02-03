class battleMenu extends Menu{
    constructor(canvas, controls, party, map) {
        super(canvas, controls, party);
        this.battleChance = battleChance;             //chance of a battle happening
        this.enemies = [];
        this.currentPool = map.enemyPool;
    }

    //draw all things battling
    draw() {
        if (battleCheck)
            this.initBattle();
        if (currentState === GameState.BATTLE) {
            this.active = true;
            this.partyStats.draw();
            this.enemyStats.draw();
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.mainMenu = new battleMenuElem(mainMenuBackground, battleMenuOptions, 35, 50, 40, 175, 600, this.party);
                this.pushMenu(this.mainMenu);
                this.clear();
            }
            var currentMenu = this.menuStack[this.top - 1];
            
            this.drawAnims();
            if (this.dialogueBox.done) {
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
            }

        }
        else if (this.active)
            this.exit();
    }

    //begin a battle, get enemies from the maps enemy pool
    initBattle() {
        battleCheck = false;
        if (currentState === GameState.DUNGEON) {
            //const chance = setChance();
            const chance = 1;
            if (chance <= this.battleChance) {
                currentState = GameState.BATTLE;

                
                this.dialogueBox = new BattleDialogueBox(this.ctx, this.controls, 437.5, 185, 20, battleDiag);
                this.enemies = new EnemyParty();
                this.randomizeEnemies();

                this.partyStats = new partyStatsElem(this.ctx, this.party.active, //draw player party stats
                    menuColorBackground, 225, 35, 135, 150);

                this.enemyStats = new partyStatsElem(this.ctx, this.enemies.active, //draw enemy party stats
                    menuColorBackground, 375, 35, 135, 150);

                this.battle = new Battle(this.party.active, this.enemies.active, this.dialogueBox, this.controls); //start battle with the parties & dialogue
            }
        }
    }

    randomizeEnemies() {
        const enemyAmt = Math.floor(Math.random() * 5)
        for (var i = 0; i < enemyAmt; i++) {
            const randomEnemy = Math.floor(Math.random() * this.currentPool.length)
            this.enemies.recruit(newEnemy(this.currentPool[randomEnemy]));
        }
    }

    drawAnims() {
        this.ctx.clearRect(550, 0, 600, 200); //clear any remnants from animation frames
        for (var i = 0; i < this.enemies.active.length; i++) {
            this.enemies.active[i].animation.draw(this.ctx, 550 + (100 * i), 100);
        }
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
        this.battleChance = battleChance;
        if (currentState === GameState.BATTLE) currentState = GameState.DUNGEON;
        
    }


}