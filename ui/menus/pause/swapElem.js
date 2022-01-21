class swapElem extends partyMenuElem{
    nextMenu() {
        var menu = new swapSelectionElem(this.party.active[this.selection], this);
        this.done = true;
        return menu;
    }
}

class swapSelectionElem extends pauseMenuElem {
    constructor(member, prevMenu) {
        super(prevMenu.background, prevMenu.party,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.member = member;
    }

    drawMenuText() {
        for (var i = 0; i < this.options.active.length; i++) {
            this.drawText(this.options.active[i].name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5));
        }
    }

    nextMenu() {
        const other = this.options.active[this.selection];
        this.options.swapActive(this.member, other);
        this.done = true;
    }
}