class itemMenuElem extends menuElem {
    constructor(color, options, posX, posY, fontSize, widthFactor, heightFactor) {
        super(color, options, posX, posY, fontSize, widthFactor, heightFactor);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.width = menu.width;
        this.height = menu.height;
        this.party = menu.party
        this.controls = menu.controls; 
        this.menus = null;
    }

    drawMenuText() {
        var inv = this.party.active[this.party.playerIndex].inv;
        for (var i = 0; i < inv.items.length; i++) {
            this.drawText(inv.items[0].item.name, this.width * 0.09, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
        }
    }

    select() { }

    nextMenu() { }
}