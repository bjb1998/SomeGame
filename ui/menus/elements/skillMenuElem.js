class skillMenuElem extends menuElem {
    constructor(color, options, posX, posY, fontSize, widthFactor, heightFactor) {
        super(color, options, posX, posY, fontSize, widthFactor, heightFactor);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.width = menu.width;
        this.height = menu.height;
        this.controls = menu.controls;
        this.selection = 0;
        this.party = menu.party;
        console.log(this.party);
        this.activeMember = 0;
        this.options = this.party.active[this.activeMember].skills;
    }

    drawMenuText() {
        this.options = this.party.active[this.activeMember].skills;
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i].name, this.width * 0.09, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index
    }

    //draw the selected skills stats
    nextMenu() {
        console.log(this.options);
        const skill = this.options[this.selection];
        console.log(skill);
        var skillPopup = new popUpSkillMenu(skill,
            this.posX, this.posY, this.background, this.fontSize, this.widthFactor, this.heightFactor);
        return skillPopup;
    }
}

class popUpSkillMenu extends menuElem{
    constructor(skill, posX, posY, background, fontSize, widthFactor, heightFactor) {
        super(background, null, posX, posY, fontSize, widthFactor, heightFactor)
        this.skill = skill;
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
    }

    drawMenuText() {
        this.drawText(this.skill.name, this.width * 0.09, (50 * (0 + 1)) + (this.height / 8.5));
        this.drawText(this.skill.type, this.width * 0.09, (50 * (1 + 1)) + (this.height / 8.5));
        this.drawText(this.skill.cost, this.width * 0.09, (50 * (2 + 1)) + (this.height / 8.5));
        this.drawText(this.skill.desc, this.width * 0.09, (50 * (3 + 1)) + (this.height / 8.5));
    }

    nextMenu() {}

}