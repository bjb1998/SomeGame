class partyMenuElem extends menuElem {
    constructor(color, options, posX, posY, fontSize, widthFactor, heightFactor) {
        super(color, options, posX, posY, fontSize, widthFactor, heightFactor);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.width = menu.width;
        this.height = menu.height;
        this.controls = menu.controls;
        this.party = menu.party;
        this.menus = null;
    }

    drawMenuText() {
        for (var i = 0; i < this.party.active.length; i++){
            this.drawText(this.party.active[i].name, this.width * 0.09, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
        }
    }

    select() { }

    nextMenu() { }
}