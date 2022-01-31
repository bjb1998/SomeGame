class DialogueBox{
    constructor(ctx, controls, width, height, max, dialogue) {
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
    }

    start() {
        currentState = GameState.DIALOGUE;
        console.log(this.prevState);
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
            this.resetRows();
        } else {
            this.end();
        }

    }

    resetRows() {
        this.rows = ['', '', ''];
        this.currentWord = 0;
    }

    getText() {
        return this.dialogueText.getText()
    }

    getSpeaker() {
        return this.dialogueText.getSpeaker();
    }

    draw() {
        if (currentState === GameState.DIALOGUE) {
            this.active = true;
            var ctx = this.ctx;
            ctx.fillStyle = mainMenuBackground;
            ctx.fillRect(50, 500, this.width, this.height);
            this.ctx.font = '55px Reactor7';
            this.drawText(this.getSpeaker(), 75, 560); //draw the options in order by index
            this.drawDialogue(this.getText());
            ctx.clearRect(this.width + 50, 500, 900, 900)
            this.confirmDeny();
        } else
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
        if (this.active)
            this.ctx.clearRect(50, 500, this.width, this.height);
        this.active = false;
        this.resetRows();
        this.dialogueText.end(this.prevState);
    }

}

class Dialogue {
    constructor(speaker, txt) {
        this.speaker = speaker;
        this.txt = txt;
        this.currentText = 0;
    }

    getSpeaker() {
        return this.speaker;
    }

    nextText() {
        this.currentText++;
        sfx_confirm.play();
    }

    addText(text) {
        this.currentText.push(text);
    }

    getText() {
        return this.txt[this.currentText];
    }

    end(state) {
        if (currentState === GameState.DIALOGUE) currentState = state;
    }
}