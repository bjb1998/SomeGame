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

        if(this.options[this.selection])
            this.drawDesc(this.options[this.selection].item.desc);

    }

    nextMenu() {
        if(this.options.length > 0)
            var menu = new selectElem(this.inv, this.options[this.selection], this);
        return menu;
    }

}

class selectElem extends partyMenuElem{
    constructor(inv, itemSlot, prevMenu) {
        super(prevMenu.party, prevMenu);
        this.inv = inv;
        this.itemSlot = itemSlot;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.menus = null;
        this.party = menu.party;
        console.log(this.party);
    }

    drawMenuText() {
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i].name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    }

    nextMenu() {
        var count = this.itemSlot.count;
        this.inv.use(this.party.active[this.selection], this.itemSlot);
        if (count - 1 <= 0)
            this.done = true;

    }
}