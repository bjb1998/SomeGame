class battleEntitySelectElem extends battleMenuElem {
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
        for (var i = 0; i < this.options.length; i++) {
        if (this.options[i] != null)
            this.drawText(this.options[i].name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        }
    }

    nextMenu() {
        const currentMember = this.battle.playerParty[this.battle.turn.currentMember];
        const target = this.options[this.selection];
        if (this.actionCtx != null) this.battle.addAction(this.func, currentMember, target, this.slot, this.actionCtx);
        else this.battle.addAction(this.func, currentMember, target);
        this.done = true;
    }
}