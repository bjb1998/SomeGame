class storeItemMenuElem extends MenuElem{
    constructor(party, prevMenu) {
        var items = [potion, superPotion, megaPotion,
            magicite, superMagicite, megaMagicite,
            cyanidePill, mysteryWater];   //temporary store stock
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
        this.diag = menu.diag;
    }

    drawMenuText() {
        const player = this.party.active[this.party.playerIndex];
        const item = this.options[this.selection];
        for (var i = 0; i < this.options.length; i++) {
            this.ctx.font = '20px Reactor7';
            this.drawText(this.options[i].name, this.width - 100, (50 * (i + 2)) - 9 + (this.height / 8.5)); //draw the options in order by index
        } this.drawDesc('$' + player.money + ' | ' +  '$' + item.cost + ' | ' + item.desc);
    }

    nextMenu() {
        var player = this.party.active[this.party.playerIndex];
        var playerInv = player.inv;
        const itemSelected = this.options[this.selection];
        if (player.money >= itemSelected.cost) {
            playerInv.give(itemSelected, 1);
            player.money -= itemSelected.cost;
        } else {
            this.diag.dialogueText = notEnoughDiag;
            this.diag.reset();
            this.diag.start();
        }
    }
}