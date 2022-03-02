class battleItemElem extends battleMenuElem {
    constructor(prevMenu, inv) {
        super(prevMenu.background, inv.items,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.inv = inv;
        this.battle = prevMenu.battle;
        this.done = false;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
    }

    drawMenuText() {
        if (this.options.length <= 0) { //If inventory is empty, go back
            this.done = true;
            return;
        }

        for (var i = 0; i < this.options.length; i++) {
            this.ctx.font = '20px Reactor7';
            this.drawText(this.options[i].item.name + ' x' + this.options[i].count, this.width - 100, (50 * (i + 2)) - 9 + (this.height / 8.5)); //draw the options in order by index
        }

        if (this.options[this.selection])
            this.drawDesc(this.options[this.selection].item.desc);

    }

    nextMenu() {
        if (this.options.length > 0)
            var menu = new battleEntitySelectElem(this, this.battle.playerParty, this.inv, this.options[this.selection], "item");
        this.done = true;
        return menu;
    }

}