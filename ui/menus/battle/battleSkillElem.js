class battleSkillElem extends battleMenuElem {
    constructor(prevMenu, member) {
        super(prevMenu.background, member.skills,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.member = member;
        this.battle = prevMenu.battle;
        this.done = false;
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
    }

    drawMenuText() {
        if (this.options.length <= 0 || this.done) { //If inventory is empty or we're done, go back
            this.done = true;
            return;
        }

        for (var i = 0; i < this.options.length; i++) {
            this.drawText(this.options[i].name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        }
        this.drawDesc(this.options[this.selection].desc);

    }

    nextMenu() {
        const cost = this.options[this.selection].cost;
        if (this.member.checkMp(cost) && this.options.length > 0)
            var menu = new battleEntitySelectElem(this, this.battle.enemyParty, this.member, this.selection, "skill");
        this.done = true;
        return menu;
    }

}