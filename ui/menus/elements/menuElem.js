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
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.width = menu.width;
        this.height = menu.height;
        this.controls = menu.controls;
        this.menus = [itemMenu, skillMenu, partyMenu, statsMenu, quitMenu]; //todo finish other menus
    }

    drawElem() {
        var ctx = this.ctx;
        var width = this.width;
        var height = this.height;   
        ctx.fillStyle = this.background;
        ctx.fillRect(this.posX, this.posY, width * this.widthFactor, height * this.heightFactor);
        this.setFontCtx();
        this.drawMenuText();
        this.select(this.controls);
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

    //todo make more functional like movement
    select() {
        this.ctx.drawImage(selectionSprite.image,
            this.width * 0.06,
            (50 * (this.selection + 1) + (this.height / 12)),
            this.width / 50,
            this.height / 50);

        //move up/down the menu
        if (this.controls.backward) this.selection++;
        if (this.controls.forward) this.selection--;

        if (this.selection > this.options.length - 1)
            this.selection = this.options.length - 1;
        else if (this.selection < 0)
            this.selection = 0;
    }

    nextMenu() {
            return this.menus[this.selection];
    }
}