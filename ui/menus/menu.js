class Menu {
    constructor(canvas, controls, party) {
        this.ctx = canvas.getContext('2d'); //canavs context
        this.battleChance = 50;             //chance of a battle happening
        this.selction = 0;                  //spot the plaeyer selects
        this.width = canvas.width;          //width of menu
        this.height = canvas.height;        //height of menu
        this.menuStack = [];                //menu stack. top of stack is the current menu
        this.controls = controls;           //controls to read  
        this.top = this.menuStack.length;   //"pointer" to the top of the stack
        this.party = party;                 //players party
        this.active = false;                //is the menu active or not?
    }

    //push a menu onto the stack and initialize it
    pushMenu(elem) {
        elem.init(this);
        this.menuStack.push(elem);
        this.top = this.menuStack.length;
    }

    //pop a menu from stack adn reinitialize
    popMenu() {
        this.menuStack.pop();
        this.top = this.menuStack.length;
        //If the stack is not empty, reset its state, otherwise, exit
        if (this.top != 0) {
            this.menuStack[this.top - 1].state = 0;         //set state to zero
            this.menuStack[this.top - 1].denyBuffer = true; //used to prevent unwanted back entires
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

                this.enemies = new EnemyParty(newEnemy(DUMMY)); //todo make maps have an enemy pool
                this.enemies.recruit(newEnemy(DUMMY));
                this.enemies.recruit(newEnemy(DUMMY));
                this.enemies.recruit(newEnemy(DUMMY));

                this.partyStats = new partyStatsElem(this.ctx, this.party.active, //draw player party stats
                    menuColorBackground, 225, 35, 135, 150);

                this.enemyStats = new partyStatsElem(this.ctx, this.enemies.active, //draw enemyt party stats
                    menuColorBackground, 375, 35, 135, 150);

                this.battle = new Battle(this.party.active, this.enemies.active);   //start battle with the parties
            }
        }
    }

    //draw all things related to the menu
    draw() {}

    //clear the screen of any remnants
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    //exit the menu and return to traversing the dungeon
    exit() {}


}