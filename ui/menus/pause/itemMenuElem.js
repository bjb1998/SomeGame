class itemMenuElem extends pauseMenuElem {
    constructor(inv, prevMenu) {
        super(prevMenu.background, inv.items,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.inv = inv;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls; 
        this.menus = null;
        this.party = menu.party;
    }

    drawMenuText() {
        if (this.options.length <= 0) { //If inventory is empty, go back
            this.state = -1;
            return;
        }

        for (var i = 0; i < this.options.length; i++) {
            this.drawText(this.options[i].item.name, this.width - 70, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
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
        if(this.options.length > 0)
            var menu = new selectElem(this.inv, this.options[this.selection], this);
        return menu;
    }

}

class selectElem extends pauseMenuElem{
    constructor(inv, itemSlot, prevMenu) {
        super(prevMenu.background, prevMenu.party,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.inv = inv;
        this.itemSlot = itemSlot;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.menus = null;
        this.party = menu.party;
    }

    drawMenuText() {
        var i;
        for (i = 0; i < this.party.active.length; i++) {
            this.drawText(this.party.active[i].name, this.width - 70, (50 * (i + 1)) + (this.height / 8.5));
        }
    }

    nextMenu() {
        var count = this.itemSlot.count;
        this.inv.use(this.itemSlot, this.party.active[this.selection]);
        if (count - 1 <= 0)
            this.state = -1;
    }
}