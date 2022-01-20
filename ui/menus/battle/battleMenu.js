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
            this.drawAnims();

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

    drawAnims() {
        for (var i = 0; i < this.enemies.active.length; i++) {
            this.enemies.active[i].animation.draw(this.ctx, 550 + (100 * i), 100, 3.5);
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