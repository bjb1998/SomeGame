class battleSkillMenuElem extends battleMenuElem {
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
        if (this.options.length <= 0 || this.done) { //If inventory is empty, go back
            this.state = -1;
            return;
        }

        for (var i = 0; i < this.options.length; i++) {
            this.drawText(this.options[i].name, this.width - 70, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
        }
        this.drawDesc(this.options[this.selection].desc);

    }

    drawDesc(desc) {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(200, 700, 400, 50);
        this.setFontCtx();
        this.drawText(desc, 200 + 25, 700 + 40);
    }

    nextMenu() {
        const cost = this.options[this.selection].cost;
        if (this.member.checkMp(cost) && this.options.length > 0)
            var menu = new entitySelectElem(this, this.battle.enemyParty, this.member, this.selection, "skill");
        this.done = true;
        return menu;
    }

}