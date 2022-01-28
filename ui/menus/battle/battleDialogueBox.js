class BattleDialogueBox extends DialogueBox{
    constructor(ctx, controls, width, height, max, dialogue) {
        super(ctx, controls, width, height, max, dialogue);
        this.done = true;
    }

    async init(txt) {
        this.resetRows();
        this.dialogueText = new Dialogue('', [txt]);
        this.done = false;
        this.draw();
    }

    draw() {
        if (this.done === false) {
            this.active = true;
            this.ctx.fillStyle = mainMenuBackground;
            this.ctx.fillRect(550, 250, this.width, this.height);
            this.ctx.font = '40px Reactor7';
            this.drawDialogue(this.getText());
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
                    } else
                        this.rows[i] += words[this.currentWord] + ' ';
                    this.currentWord++;
                }
            }
        }
        this.drawText(this.rows[0], 575, 300); //draw the options in order by index
        this.drawText(this.rows[1], 575, 350); //draw the options in order by index
        this.drawText(this.rows[2], 575, 400); //draw the options in order by index

    }

    end() {
        if (this.active)
            this.ctx.clearRect(550, 250, this.width + 5, this.height);
        this.active = false;
        this.resetRows();
        this.done = true;
    }

}