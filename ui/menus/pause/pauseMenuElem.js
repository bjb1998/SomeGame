class pauseMenuElem extends MenuElem{
    constructor(color, options, posX, posY, fontSize, width, height) {
        super(color, options, posX, posY, fontSize, width, height);
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
    }

    drawMenuText() {
        const player = this.party.active[this.party.playerIndex];
        this.drawText('  Pause ', this.width - 100, (50 * (1)) + (this.height / 8.5))
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        this.drawDesc('$' + player.money);
    };

    nextMenu() {
        var menu;
        switch (this.selection) {
            case 0: menu = new itemMenuElem(this.party.active[this.party.playerIndex].inv, this); break;
            case 1: menu = new partyMenuElem(this.party, this); break;
            case 2: menu = new swapElem(this.party, this); break;
            case 3: currentState = GameState.DUNGEON; break;
            default: return;
        }
        return menu;
    }
}