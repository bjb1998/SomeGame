class Battle {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.turn = new Turn(playerParty, enemyParty);
        this.expAmt = this.getExp();
    }

    getExp() {
        var amt = 0;
        for (var i = 0; i < this.enemyParty.length; i++)
            amt += this.enemyParty[i].exp;
        return amt;
    }

    execTurn() {
        this.turn.exec();
    }

    addAction(func, target, slot, actionCtx) {
        this.turn.AddAction(func, target, slot, actionCtx);
    };

    run() {
        const chance = setChance();
        var bool = false;
        console.log(chance + ", " + runChance);
        chance <= runChance ? bool = true : bool = false;
        return bool;
    };
}

class Turn {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.playerActions = [];
        this.enemyActions = [];
        this.currentMember = 0;
        this.wait = false;
    }

    //exec each function per player 
    exec() {
        console.log("enemy actions:");
        for (var action in this.enemyActions) {
            this.enemyActions[action].exec();
            this.check();
        }
            

        this.playerActions = [];
        this.enemyActions = [];
        this.currentMember = 0;

        console.log("End of Turn");
    }

    AddAction(action, target, slot, actionCtx) {
        this.playerAction = new Action(action, target, slot, actionCtx);
        this.playerAction.exec();
        this.currentMember++;
        //once all selections made, make enemy actions start their turn
        if (this.currentMember === this.playerParty.length) {
            this.dummyActions();
            this.exec();
        }
    };

    back() {
        if (this.currentMember > 0) {
            this.playerActions[this.currentMember].pop();
            this.currentMember--;
        }
    }

    dummyActions() {
        const testFunc = function () { console.log("action"); };
        for (var i = 0; i < this.enemyParty.length; i++)
            this.enemyActions[i] = new Action(testFunc, null);
    }

    check() {
        if (this.playerParty.length === 0 || this.enemyParty.length === 0)
            this.endBattle();
    }

    endBattle() {
        this.playerActions = [];
        this.enemyActions = [];
        return true;
    }
}

class Action {
    constructor(func, target, slot, actionCtx) {
        this.func = func;
        this.target = target;
        this.slot = slot;
        this.actionCtx = actionCtx;
    }

    exec() {
        if (this.actionCtx === "item") this.func.use(this.target, this.slot);
        else if (this.actionCtx === "skill") this.func.execSkill(this.target, this.slot);
        else this.func(this.target, this.slot);
        
    }
}