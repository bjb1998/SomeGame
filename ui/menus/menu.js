class Menu {
    constructor(canvas, controls, party) {
        this.ctx = canvas.getContext('2d');
        this.playerControls;
        this.battleChance = 50;
        this.selction = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.menuStack = [];
        this.controls = controls;
        this.top = this.menuStack.length;
        this.party = party;
        this.active = false;
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
    draw() {}

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    exit() {}


}