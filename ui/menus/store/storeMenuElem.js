class storeMenuElem extends MenuElem {
    constructor(color, options, posX, posY, fontSize, width, height) {
        super(color, options, posX, posY, fontSize, width, height);
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
        this.healed = false;
        this.diag = menu.diag;
    }

    drawMenuText() {
        this.drawText('  Store ', this.width - 100, (50 * (1)) + (this.height / 8.5))
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    };

    nextMenu() {
        var menu;
        switch (this.selection) {
            case 0: menu = new storeItemMenuElem(this.party, this); break;
            case 1:
                this.diag.dialogueText = storeDiag;
                this.diag.reset();
                this.diag.start();
                break;
            case 2: currentState = GameState.DUNGEON; break;
            default: return;
        }
        return menu;
    }
}