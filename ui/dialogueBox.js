class DialogueBox{
    constructor(ctx, controls, width, height, max, dialogue, battler) {
        this.prevState = currentState;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.dialogueText = dialogue;
        this.active = false;
        this.controls = controls;
        this.maxLineLength = max;
        this.rows = ['','',''];
        this.nextBuffer = true;
        this.currentWord = 0;
        this.battler = battler;
    }

    start() {
        playSfx(sfx_confirm);
        this.prevState = currentState;
        currentState = GameState.DIALOGUE;
    }

    next() {
        this.dialogueText.next();
    }

    addText(text) {
        this.dialogueText.addText(text);
    }

    nextText() {
        if (this.dialogueText.currentText + 1 < this.dialogueText.txt.length) {
            this.dialogueText.nextText();
            this.reset();
        } else {
            this.end();
        }

    }

    reset() {
        this.rows = ['', '', ''];
        this.currentWord = 0;
    }

    getText() {
        return this.dialogueText.getText()
    }

    getSpeaker() {
        return this.dialogueText.getSpeaker();
    }

    async draw() {
        if (currentState === GameState.DIALOGUE) {
            this.active = true;
            var ctx = this.ctx;
            ctx.fillStyle = mainMenuBackground;
            ctx.fillRect(50, 500, this.width, this.height);
            this.ctx.font = '55px Reactor7';
            this.drawText(this.getSpeaker(), 75, 560); //draw the options in order by index
            this.drawDialogue(this.getText());
            this.confirmDeny();
        } else if(this.active)
            this.end();
    }

    drawDialogue(txt) {
        const words = txt.split(' ');
        var currentChars = 0;
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].length <= 1) {
                while (this.currentWord < words.length) {
                    currentChars += words[this.currentWord].length;
                    if (currentChars > this.maxLineLength) {
                        currentChars = 0;
                        break;
                    }else
                        this.rows[i] += words[this.currentWord] + ' ';
                    this.currentWord++;
                }
            }
        }
        this.drawText(this.rows[0], 95, 612.5); //draw the options in order by index
        this.drawText(this.rows[1], 95, 667.5); //draw the options in order by index
        this.drawText(this.rows[2], 95, 722.5); //draw the options in order by index

    }

    drawText(words, x, y) {
        var ctx = this.ctx;
        ctx.fillStyle = fontColorBottom;
        ctx.fillText(words, x, y);
        ctx.fillStyle = fontColorTop;
        ctx.fillText(words, x - 5, y - 5);
        ctx.fillStyle = "black";
    }

    confirmDeny() {
        const confirm = this.controls.confirm;
        if (confirm && confirm != this.nextBuffer) {
            this.nextText();
        } 
        this.nextBuffer = confirm;
    }

    end() {
        playSfx(sfx_confirm);
        if (this.active)
            this.ctx.clearRect(50, 500, this.width, this.height);
        this.active = false;
        this.reset();
        this.dialogueText.end(this.prevState);
        if (this.dialogueText.anim === bossAnim) {
            console.log(currentState);
            this.battler.initBattle(boss);
        }
    }

}

class Dialogue {
    constructor(speaker, anim, txt) {
        this.speaker = speaker;
        this.txt = txt;
        this.currentText = 0;
        this.anim = anim;
    }

    getSpeaker() {
        return this.speaker;
    }

    nextText() {
        this.currentText++;
        playSfx(sfx_confirm);
    }

    addText(text) {
        this.currentText.push(text);
    }

    getText() {
        return this.txt[this.currentText];
    }

    end(state) {
        this.currentText = 0;
        if (currentState === GameState.DIALOGUE) currentState = state;
    }
}

class Chest extends Dialogue {
    constructor(item, quantity) {
        super('', TreasureAnim, ['There\'s something inside...', 'It\'s ' + quantity + ' ' + item.name + 's!',
            'The chest is now empty...']);
        this.opened = false;
        this.item = item;
        this.quantity = quantity;
    }

    end(state) {
        if(!this.opened)
            playerPreset.inv.give(this.item, this.quantity);
        this.opened = true;
        if (currentState === GameState.DIALOGUE) currentState = state;
    }
}

class Door extends Dialogue {
    constructor() {
        super('Door Guardian',  VacuumAnim,
        ['You must must have a group power level of 15 to enter', 'your power level isn\'t even enough to open the door']);
        this.level = false;
    }

    getSpeaker(){
        if(playerPreset.stats.lvl + sidekick.stats.lvl >= 15) {
            mapOne[202] = 0;
            mapOne[201] = 0;
            this.txt[1] = 'you are worthy of entering the boss room';
        }
        else{
            this.txt[1] = 'your power level isn\'t even enough to open the door, current power level is only '+ (playerPreset.stats.lvl + sidekick.stats.lvl);
        }
        return this.speaker;
    }
}