class statsMenuElem extends pauseMenuElem {
    constructor(stats, prevMenu) {
        super(prevMenu.background, stats,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
        console.log(this.party);
    }

    drawMenuText() {
        const statArr = [this.options.lvl,
            this.options.hp, this.options.mp,
            this.options.atk, this.options.mag, this.options.def,
            this.options.acc, this.options.luck];
        const statStrArr = ['Lvl', 'HP', 'MP', 'Atk', 'Mag', 'Def', 'Acc', 'Luck'];

        for (var i = 0; i < statArr.length; i++) {
            var statStr = statStrArr[i] + ': ' + statArr[i];

            if (i == 1) statStr = statStrArr[i] + ':' + statArr[i] + "/" + this.options.maxHP; //special cse for HP
            if (i == 2) statStr = statStrArr[i] + ':' + statArr[i] + "/" + this.options.maxMP; //special case for MP

            this.drawText(statStr, this.width - 113, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        }

        this.drawDesc(this.options.status);
    }

    nextMenu() { }
    drawSelection() { }
}