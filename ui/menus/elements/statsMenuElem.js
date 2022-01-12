class statsMenuElem extends menuElem {
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
        console.log(this.party);
    }

    //todo print the status conditon too
    drawMenuText() {
        const stats = this.party.active[this.party.playerIndex].stats;
        const statArr = [stats.lvl, stats.hp, stats.mp, stats.atk, stats.mag, stats.def, stats.acc, stats.luck];
        const statStrArr = ['Lvl', 'HP', 'MP', 'Atk', 'Mag', 'Def', 'Acc', 'Luck'];

        for (var i = 0; i < statArr.length; i++) {
            var statStr = statStrArr[i] + ': ' + statArr[i];

            if (i == 1) statStr = statStrArr[i] + ': ' + statArr[i] + "/" + stats.maxHP;
            if (i == 2) statStr = statStrArr[i] + ': ' + statArr[i] + "/" + stats.maxMP;

            this.drawText(statStr, this.width - 70, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
        }

        this.drawText("Status: " + stats.status, this.width - 70, (50 * (statArr.length + 2)) + (this.height / 8.5)); //draw the options in order by index
    }
}