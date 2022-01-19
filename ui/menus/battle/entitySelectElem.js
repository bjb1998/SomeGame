class entitySelectElem extends battleMenuElem {
    constructor(prevMenu, party, func, slot, actionCtx) {
        super(prevMenu.background, party,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.func = func;
        this.battle = prevMenu.battle;
        this.actionCtx = actionCtx;
        this.slot = slot;
    }

    drawMenuText() {
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i].name, this.width - 70, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    }

    nextMenu() {
        if (this.actionCtx != null) this.battle.addAction(this.func, this.options[this.selection], this.slot, this.actionCtx);
        else this.battle.addAction(this.func, this.options[this.selection]);
        this.state = -1;
    }
}