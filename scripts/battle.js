//results of the end of battle
const endState = {
    WIN: 'Win',
    LOSE: 'Lose'
};

//the real meat of all things combat.
class Battle {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;                 //player and his/her allies
        this.enemyParty = enemyParty;                   //enemies
        this.turn = new Turn(playerParty, enemyParty);  //turn to do combat in
        this.expAmt = this.getExp();                    //total exp of all enemies
    }

    //add each exp amount of the enemies
    getExp() {
        var amt = 0;
        for (var i = 0; i < this.enemyParty.length; i++)
            amt += this.enemyParty[i].exp;
        return amt;
    }

    //start the turn
    execTurn() {
        this.turn.exec();
    }

    //Call turns addAction function
    addAction(func, target, slot, actionCtx) {
        this.turn.AddAction(func, target, slot, actionCtx);
    };

    //Generate random int, if <= the runChance, run away!
    run() {
        const chance = setChance();
        var bool = false;
        console.log(chance + ", " + runChance);
        chance <= runChance ? bool = true : bool = false;
        return bool;
    };
}

//Turn for one phase of combat
class Turn {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.playerAction = null;
        this.enemyActions = [];
        this.currentMember = 0;
        this.wait = false;
    }

    //exec each function per enemy in the eenmy party
    exec() {
        console.log("enemy actions:");
        for (var action in this.enemyActions) {
            this.enemyActions[action].exec();
        }
            

        this.playerActions = [];
        this.enemyActions = [];
        this.currentMember = 0;

        console.log("End of Turn");
    }

    //make an action for the player, then execute it. Once all done, do the same for the enemies
    AddAction(action, target, slot, actionCtx) {
        this.playerAction = new Action(action, target, slot, actionCtx);
        this.playerAction.exec();
        this.currentMember++;
        if (this.checkDeath(target)) {
            this.shove();
        }
        //once all selections made, make enemy actions start their turn
        if (this.currentMember === this.playerParty.length) {
            this.genEnemyActions();
            this.exec();
            this.resetGuards();
        }
    };

    resetGuards() {
        for (var i = 0; i < this.playerParty.length; i++) {
            this.playerParty[i].guard = false;
        }
    }

    //check if the given target died from an attck
    checkDeath(target) {
        if (target.stats != null && target.stats.status === "Dead") {
            this.enemyParty[this.enemyParty.indexOf(target)] = null;
            return true;
        }
        return false;
    }

    //finally, a real-world of example something vaguely leetcode related
    //shove all members to the left
    shove() { 
        var party = this.enemyParty;
        var count = 0; 
        var nullCount = 0;
        for (let i = 0; i < party.length; i++)
            if (party[i] != null)
                party[count++] = party[i];
            else ++nullCount;

        while (count < party.length) {
            party[count++] = null;
        }
        
        this.enemyParty.splice(-nullCount);
    }

    //temporary thing until enemy actions are a real thing
    genEnemyActions() {
        const testFunc = function () { console.log("action"); };
        for (var i = 0; i < this.enemyParty.length; i++)
            this.enemyActions[i] = new Action(testFunc, null);
    }

    //check if either party is defeated, return endState if either is killed
    check() {
        if (this.playerParty.length === 0) {
            return endState.LOSE;
        }else if (this.enemyParty.length === 0) {
            return endState.WIN;
        }
    }
}

//Action to executed during a turn. Can be players, or enemys.
class Action {
    constructor(func, target, slot, actionCtx) {
        this.func = func;           //actions the item/skill will do
        this.target = target;       //target to deal the damage, etc. to
        this.slot = slot;           //item/skill slot, used depending on action context
        this.actionCtx = actionCtx; //Used to determine if item, skill, or basic attack
    }

    //execute the action based on the context
    exec() {
        if (this.actionCtx === "item") this.func.use(this.target, this.slot);
        else if (this.actionCtx === "skill") this.func.execSkill(this.target, this.slot);
        else this.func(this.target, this.slot);
    }
}