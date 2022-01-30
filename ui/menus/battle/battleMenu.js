class battleMenu extends Menu{
    constructor(canvas, controls, party) {
        super(canvas, controls, party);
        this.enemies = [];
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

        } else
            this.exit();
    }

    initBattle() {
        battleCheck = false;
        if (currentState === GameState.DUNGEON) {
            const chance = setChance();
            if (chance <= this.battleChance) {
                currentState = GameState.BATTLE;

                
                this.dialogueBox = new BattleDialogueBox(this.ctx, this.controls, 437.5, 185, 20, battleDiag);
                this.enemies = new EnemyParty(newEnemy(DUMMY)); //todo make maps have an enemy pool
                this.enemies.recruit(newEnemy(Microwave));
                this.enemies.recruit(newEnemy(Plunger));
                this.enemies.recruit(newEnemy(Vacuum));

                this.partyStats = new partyStatsElem(this.ctx, this.party.active, //draw player party stats
                    menuColorBackground, 225, 35, 135, 150);

                this.enemyStats = new partyStatsElem(this.ctx, this.enemies.active, //draw enemy party stats
                    menuColorBackground, 375, 35, 135, 150);

                this.battle = new Battle(this.party.active, this.enemies.active, this.dialogueBox, this.controls); //start battle with the parties & dialogue
            }
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
        battleChance = 101;
        if (currentState === GameState.BATTLE) currentState = GameState.DUNGEON;
        
    }


}