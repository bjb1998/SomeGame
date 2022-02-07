class MenuElem {
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
        this.backBuffer = true;
        this.forwardBuffer = true;
        this.confirmBuffer = true;
        this.denyBuffer = true;
    };

    drawElem() {
        var ctx = this.ctx;
        ctx.fillStyle = this.background;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.setFontCtx();
        this.drawSelection();
        this.drawMenuText();
        this.select(this.controls);
    }

    drawDesc(desc) {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(200, 700, 400, 50);
        this.setFontCtx();
        this.drawText(desc, 200 + 25, 700 + 40);
    }

    drawText(words, x, y) {
        var ctx = this.ctx;
        ctx.fillStyle = fontColorBottom;
        ctx.fillText(words, x, y);
        ctx.fillStyle = fontColorTop;
        ctx.fillText(words, x - 5, y - 5);
        ctx.fillStyle = "black";
    }

    drawMenuText() {};

    setFontCtx() {
        this.ctx.font = this.fontSize + 'px Reactor7';
    };

    drawSelection() {
        this.ctx.drawImage(selectionSprite.image,
            this.width - 125,
            (50 * (this.selection + 2) + (this.height / 13)),
            10,
            10);
    }

    select() {
        //check confirmation/declinations
        this.confirmDeny();

        const forward = this.controls.forward;
        const back = this.controls.backward;

        //move up/down the menu
        if (forward && forward != this.forwardBuffer) {
            playSfx(sfx_select);
            this.selection--;
        }
        if (back && back != this.backBuffer) {
            playSfx(sfx_select);
            this.selection++;
        }
        this.backBuffer = back
        this.forwardBuffer = forward;

        if (this.options != null)
            if (this.selection > this.options.length - 1)
                this.selection = 0;
            else if (this.selection < 0)
                this.selection = this.options.length - 1;
    }

    confirmDeny() {
        const confirm = this.controls.confirm;
        const decline = this.controls.decline;
        if (confirm && confirm != this.confirmBuffer) {
            this.state = 1;
            playSfx(sfx_confirm);
        } else if ((decline && decline != this.denyBuffer) || this.done) {
            this.state = -1;
            playSfx(sfx_confirm);
        }
        else this.state = 0;
        this.confirmBuffer = confirm;
        this.denyBuffer = decline;
    }

    init() { }

    nextMenu() {}
}