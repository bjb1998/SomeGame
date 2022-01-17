class pauseMenuElem{
    constructor(color, options, posX, posY, fontSize, width, height) {
        this.ctx = null;
        this.background = color;
        this.controls = null;
        this.options = options;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.selection = 0;
        this.state = 0;
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
    }

    drawElem() {
        var ctx = this.ctx;
        ctx.fillStyle = this.background;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.setFontCtx();
        this.drawMenuText();
        this.drawSelection();

        if (Date.now() - startTime <= menuBuffer) return; //check timer for input
        this.resetTimer();

        this.select(this.controls);
    }

    resetTimer() {
        startTime = Date.now();
    }

    drawText(words, x, y) {
        var ctx = this.ctx;
        ctx.fillStyle = fontColorBottom;
        ctx.fillText(words, x, y);
        ctx.fillStyle = fontColorTop;
        ctx.fillText(words, x - 5, y - 5);
        ctx.fillStyle = "black";
    }

    drawMenuText() {
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width - 70, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
    };

    setFontCtx() {
        this.ctx.font = this.fontSize + 'px Reactor7';
    };

    drawSelection() {
        this.ctx.drawImage(selectionSprite.image,
            this.width - 100,
            (50 * (this.selection + 1) + (this.height / 13)),
            10,
            10);
    }

    select() {
        //check confirmation/declinations
        this.confirmDeny();

        //move up/down the menu
        if (this.controls.backward) this.selection++;
        if (this.controls.forward) this.selection--;

        if (this.options != null)
            if (this.selection > this.options.length - 1)
                this.selection = this.options.length - 1;
            else if (this.selection < 0)
                this.selection = 0;
    }

    confirmDeny() {
        if (this.controls.confirm) this.state = 1;
        else if (this.controls.decline) this.state = -1;
        else this.state = 0;
    }

    nextMenu() {
        var menu;
        switch (this.selection) {
            case 0: menu = new itemMenuElem(this.party.active[this.party.playerIndex].inv, this); break;
            case 1: menu = new partyMenuElem(this.party, this); break;
            case 2: menu = new quitMenuElem(); break;
            default: return;
        }
        return menu;
    }
}