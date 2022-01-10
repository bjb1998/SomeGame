class statsMenuElem extends menuElem {
    constructor(color, options, posX, posY, fontSize, widthFactor, heightFactor) {
        super(color, options, posX, posY, fontSize, widthFactor, heightFactor);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.width = menu.width;
        this.height = menu.height;
        this.controls = menu.controls;
        this.party = menu.party;
        console.log(this.party);
    }

    drawMenuText() {
        this.drawText("stats", this.width * 0.09, (50 * (/*i + */ 1)) + (this.height / 8.5));
    }

    select() { }

    nextMenu() { }
}