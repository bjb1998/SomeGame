class menuElem{
    constructor(color, options, posX, posY, fontSize, widthFactor, heightFactor) {
        this.ctx = null;
        this.background = color;
        this.controls = null;
        options = null ? this.options = [] : this.options = options;
        this.posX = posX;
        this.posY = posY;
        this.width = null;
        this.height = null;
        this.widthFactor = widthFactor;
        this.heightFactor = heightFactor;
        this.fontSize = fontSize;
        this.selection = 0;
        this.state = 0;
        this.start = Date.now();
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.width = menu.width;
        this.height = menu.height;
        this.controls = menu.controls;
    }

    drawElem() {
        var ctx = this.ctx;
        var width = this.width;
        var height = this.height;   
        ctx.fillStyle = this.background;
        ctx.fillRect(this.posX, this.posY, width * this.widthFactor, height * this.heightFactor);
        this.setFontCtx();
        this.drawMenuText();
        this.drawSelection();

        if (Date.now() - this.start <= menuBuffer) return; //check timer for input
        this.resetTimer();

        this.select(this.controls);
    }

    resetTimer() {
        this.start = Date.now();
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
            this.drawText(this.options[i], this.width * 0.09, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
    };

    setFontCtx() {
        this.ctx.font = this.fontSize + this.fontSize + 'px Reactor7';
    };

    drawSelection() {
        this.ctx.drawImage(selectionSprite.image,
            this.width * 0.06,
            (50 * (this.selection + 1) + (this.height / 12)),
            this.width / 50,
            this.height / 50);
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
            case 0: menu = new itemMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9); break;
            case 1: menu = new skillMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9); break;
            case 2: menu = new statsMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9); break;
            case 3: menu = new partyMenuElem(mainMenuBackground, null, 50, 50, 20, 0.3, 0.9);; break;
            case 4: menu = new quitMenuElem(); break;
            default: return;
        }
        return menu;
    }
}