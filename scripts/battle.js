//results of the end of battle
const endState = {
    WIN: 'Win',
    LOSE: 'Lose'
};

function runFunc() { return 'Got away safely';};
function failFunc() { return 'Couldn\'t run away!';};
function levelUpFunc(entity) { return entity.name + ' Leveled Up!';};

//the real meat of all things combat.
class Battle {
    constructor(playerParty, enemyParty, dialogueBox, controls, hasBoss) {
        this.playerParty = playerParty;                         //player and his/her allies
        this.enemyParty = enemyParty;                           //enemies
        this.expAmt = this.getExp();                            //total exp of all enemies
        this.dialogueBox = dialogueBox;                         //dialogue box to display battle stuff
        this.controls = controls;                               //controls for menu controls
        this.turn = new Turn(this.playerParty, this.enemyParty, //turn to do combat in
            this.dialogueBox, this.controls, this.expAmt, hasBoss);   
    }

    //add each exp amount of the enemies
    getExp() {
        var amt = 0;
        for (var i = 0; i < this.enemyParty.length; i++)
            amt += this.enemyParty[i].exp;
        return amt;
    }

    //Call turns addAction function
    addAction(func, source, target, slot, actionCtx) {
        this.turn.AddAction(func, source, target, slot, actionCtx, this.dialogueBox);
    };

    //Generate random int, if <= the runChance, run away!
    async run() {
        const chance = setChance();
        if (chance <= runChance) {
            await this.turn.runSuccess();
        } else {
            await this.turn.runFailure();
        }
    };
}

//Turn for one phase of combat
class Turn {
    constructor(playerParty, enemyParty, dialogueBox, controls, exp, hasBoss) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.dialogueBox = dialogueBox;
        this.playerAction = null;
        this.enemyActions = [];
        this.currentMember = 0;
        this.controls = controls;
        this.exp = exp;
        this.hasBoss = hasBoss;
    }

    async runSuccess() {
        const runAct = new Action(runFunc, null, null, null, 'other', this.dialogueBox, this.controls);
        await runAct.exec();
        currentState = GameState.DUNGEON;
    }

    async gainExp() {
        for (var i = 0; i < this.playerParty.length; i++) {
            if (this.playerParty[i].stats.status != 'Dead')
                if (this.playerParty[i].checkLevel(this.exp)) {
                    const levelUpAct = new Action(levelUpFunc, this.playerParty[i], null, null, 'other', this.dialogueBox, this.controls);
                    await levelUpAct.exec();
                }
        }
    }

    async runFailure() {
        const failAct = new Action(failFunc, null, null, null, 'other', this.dialogueBox, this.controls);
        await failAct.exec();
        await this.genEnemyActions();
        await this.exec();  
    }

    //make an action for the player, then execute it. Once all done, do the same for the enemies
    async AddAction(action, source, target, slot, actionCtx) {
        this.playerAction = new Action(action, source, target, slot, actionCtx, this.dialogueBox, this.controls);
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
        const testFunc = function () { return "but nothing happened!"; };
        for (var i = 0; i < this.enemyParty.length; i++)
            this.enemyActions[i] = new Action(testFunc, this.enemyParty[i], this.playerParty[0], null, null, this.dialogueBox, this.controls);
    }

    //exec each function per enemy in the eenmy party
    async exec() {
        for (var action in this.enemyActions) {
            await this.enemyActions[action].exec();
        }

        this.enemyActions = [];
        this.currentMember = 0;
        this.resetGuards();
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
    async check() {
        if (this.playerParty.length === 0) {
            return endState.LOSE;
        } else if (this.enemyParty.length === 0) {
            await this.gainExp(this.exp);
            if (this.hasBoss) {
                currentState = GameState.END;
                changeSong(null);
            }
            return endState.WIN;
        }
    }

}

//Action to executed during a turn. Can be players, or enemys.
class Action {
    constructor(func, source, target, slot, actionCtx, dialogueBox, controls) {
        this.func = func;           //actions the item/skill will do
        this.source = source;       //where the attack is coming from (AKA, the attacker)
        this.target = target;       //target to deal the damage, etc. to
        this.slot = slot;           //item/skill slot, used depending on action context
        this.actionCtx = actionCtx; //Used to determine if item, skill, or basic attack
        this.dialogueBox = dialogueBox;
        this.next = false;
        this.controls = controls;
        this.buffer = true;
    }

    //execute the action based on the context
    async exec() {
        switch (this.actionCtx) {
            case ("item"):
                this.dialogueBox.init(this.source.name + ' uses an item!');
                await this.awaitInput();
                this.dialogueBox.init(this.func.use(this.source, this.slot));
                await this.awaitInput();
                break;
            case "skill":
                this.dialogueBox.init(this.source.name  + ' uses a skill!');
                this.awaitInput();
                this.dialogueBox.init(this.func.execSkill(this.source, this.target, this.slot));
                await this.awaitInput();
                break;
            case "other":
                this.dialogueBox.init(this.func(this.source, this.target, this.slot));
                await this.awaitInput();
                break;
            default:
                this.dialogueBox.init(this.source.name + ' attacks ' + this.target.name + '!');
                await this.awaitInput();
                playSfx(this.source.currAttackSfx);
                this.dialogueBox.init(this.func(this.source, this.target, this.slot));
                await this.awaitInput();
                break;
        }
        this.dialogueBox.end();
    }

    async timeout(ms) { return new Promise(res => setTimeout(res, ms)); }

    async awaitInput() {
        var next = false;
        while (next === false) {
            await this.timeout(50); // pauses script
            const confirm = this.controls.confirm;
            if (confirm && confirm != this.buffer) next = true;
            else this.state = 0;
            this.buffer = confirm;
        }
    }
}