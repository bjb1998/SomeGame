class skillMenuElem extends menuElem {
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
        this.selection = 0;
        this.party = menu.party;
        this.activeMember = 0;
        this.options = this.party.active[this.activeMember].skills;
    }

    drawMenuText() {
        this.options = this.party.active[this.activeMember].skills;
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i].name, this.width - 70, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
    }

    //draw the selected skills stats
    nextMenu() {
        const skill = this.options[this.selection];
        var skillPopup = new popUpSkillMenu(skill, this);
        return skillPopup;
    }
}

class popUpSkillMenu extends menuElem{
    constructor(skill, prevMenu) {
        var params = [skill.name, skill.type, skill.cost + ' MP', skill.desc];
        super(prevMenu.background, params,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
    }

    drawSelection() { }

    nextMenu() {}

}