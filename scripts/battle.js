//results of the end of battle
const endState = {
    WIN: 'Win',
    LOSE: 'Lose'
};

sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//the real meat of all things combat.
class Battle {
    constructor(playerParty, enemyParty, dialogueBox) {
        this.playerParty = playerParty;                             //player and his/her allies
        this.enemyParty = enemyParty;                               //enemies
        this.expAmt = this.getExp();                                //total exp of all enemies
        this.dialogueBox = dialogueBox;
        this.turn = new Turn(this.playerParty, this.enemyParty, this.dialogueBox);  //turn to do combat in
        this.runChance = 50;                                          //Chance for running away from battle
    }

    //add each exp amount of the enemies
    getExp() {
        var amt = 0;
        for (var i = 0; i < this.enemyParty.length; i++)
            amt += this.enemyParty[i].exp;
        return amt;
    }

    //Call turns addAction function
    addAction(func, target, slot, actionCtx) {
        this.turn.AddAction(func, target, slot, actionCtx, this.dialogueBox);
    };

    //Generate random int, if <= the runChance, run away!
    async run() {
        const chance = setChance();
        if (chance <= this.runChance) {
            await this.turn.runSuccess();
        } else {
            await this.turn.runFailure();
        }
    };
}

//Turn for one phase of combat
class Turn {
    constructor(playerParty, enemyParty, dialogueBox) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.dialogueBox = dialogueBox;
        this.playerAction = null;
        this.enemyActions = [];
        this.currentMember = 0;
        this.wait = false;
    }

    async runSuccess() {
        this.initBox();
        this.dialogueBox.init('Got away safely!');
        await sleep(500);
        currentState = GameState.DUNGEON;
    }

    async runFailure() {
        this.initBox();
        await this.dialogueBox.init('Failed to run away!');
        await sleep(500);
        await this.dialogueBox.end();
        await this.genEnemyActions();
        await this.exec();  
    }

    //make an action for the player, then execute it. Once all done, do the same for the enemies
    async AddAction(action, target, slot, actionCtx) {
        this.initBox();
        this.playerAction = new Action(action, target, slot, actionCtx, this.dialogueBox);
        await this.playerAction.exec();
        this.currentMember++;
        if (this.checkDeath(target)) {
            this.shove();
        }
        //once all selections made, make enemy actions start their turn
        if (this.currentMember === this.playerParty.length) {
            await this.genEnemyActions();
            await this.exec();
        }
    };

    //temporary thing until enemy actions are a real thing
    async genEnemyActions() {
        const testFunc = function () { console.log("action"); return "but nothing happened!"; };
        for (var i = 0; i < this.enemyParty.length; i++)
            this.enemyActions[i] = new Action(testFunc, this.playerParty[0], null, null, this.dialogueBox);
    }

    //exec each function per enemy in the eenmy party
    async exec() {
        console.log("enemy actions:");
        for (var action in this.enemyActions) {
            await this.enemyActions[action].exec();
        }

        this.enemyActions = [];
        this.currentMember = 0;
        this.resetGuards();

        console.log("End of Turn");
    }

    //reset guards at the end of a turn
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

    //finally, a real-world of example something vaguely leetcode related, shove all members to the left
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

    //check if either party is defeated, return endState if either is killed
    check() {
        if (this.playerParty.length === 0) {
            return endState.LOSE;
        }else if (this.enemyParty.length === 0) {
            return endState.WIN;
        }
    }

    //For reason sometimes it skips a dialogue box, this "fixes" it
    initBox() {
        this.dialogueBox.init('');
        this.dialogueBox.done = true;
    }

}

//Action to executed during a turn. Can be players, or enemys.
class Action {
    constructor(func, target, slot, actionCtx, dialogueBox) {
        this.func = func;           //actions the item/skill will do
        this.target = target;       //target to deal the damage, etc. to
        this.slot = slot;           //item/skill slot, used depending on action context
        this.actionCtx = actionCtx; //Used to determine if item, skill, or basic attack
        this.dialogueBox = dialogueBox;
    }

    //execute the action based on the context
    async exec() {
        switch (this.actionCtx) {
            case ("item"):
                this.dialogueBox.init('an item is used on ' + this.target.name + '!');
                await sleep(500);
                this.dialogueBox.init(this.func.use(this.target, this.slot));
                await sleep(500);
                break;
            case "skill":
                this.dialogueBox.init('a skill is being used on ' + this.target.name + '!');
                await sleep(500);
                this.dialogueBox.init(this.func.execSkill(this.target, this.slot));
                await sleep(500);
                break;
            case "guard":
                this.dialogueBox.init(this.func(this.target, this.slot));
                await sleep(500);
                break;
            default:
                this.dialogueBox.init(this.target.name + ' is attacked!');
                await sleep(500);
                this.dialogueBox.init(this.func(this.target, this.slot));
                await sleep(500);
                break;
        }
        this.dialogueBox.end();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}