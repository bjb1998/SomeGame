class battleItemMenuElem extends battleMenuElem {
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
            this.drawText(this.options[i].item.name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        }

        this.drawDesc(this.options[this.selection].item.desc);

    }

    drawDesc(desc) {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(200, 700, 400, 50);
        this.setFontCtx();
        this.drawText(desc, 200 + 25, 700 + 40);
    }

    nextMenu() {
        if (this.options.length > 0)
            var menu = new entitySelectElem(this, this.battle.playerParty, this.inv, this.options[this.selection], "item");
        return menu;
    }

}