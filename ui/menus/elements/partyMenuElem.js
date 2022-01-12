class partyMenuElem extends menuElem {
    constructor(prevMenu) {
        super(prevMenu.background, null,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.options = null;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
        this.menus = null;
    }

    drawMenuText() {
        for (var i = 0; i < this.party.active.length; i++){
            this.drawText(this.party.active[i].name, this.width - 70,  (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
        }
    }
}