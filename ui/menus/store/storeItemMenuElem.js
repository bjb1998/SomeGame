class storeItemMenuElem extends MenuElem{
    constructor(party, prevMenu) {
        var items = [potion];
        super(prevMenu.background, items,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.party = party;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
    }

    drawMenuText() {
        for (var i = 0; i < this.options.length; i++) {
            this.drawText(this.options[i].name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        } this.drawDesc('$' + this.options[this.selection].cost + '   ' + this.options[this.selection].desc);

    }

    nextMenu() {
        var count = this.itemSlot.count;
        this.inv.use(this.party.active[this.selection], this.itemSlot);
        if (count - 1 <= 0)
            this.done = true;

    }
}