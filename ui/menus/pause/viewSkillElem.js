class skillMenuElem extends pauseMenuElem {
    constructor(skills, prevMenu) {
        super(prevMenu.background, skills,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.selection = 0;
        this.activeMember = 0;
    }

    drawMenuText() {
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i].name, this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    }

    //draw the selected skills stats
    nextMenu() {
        const skill = this.options[this.selection];
        var skillPopup = new popUpSkillMenu(skill, this);
        return skillPopup;
    }
}

class popUpSkillMenu extends pauseMenuElem{
    constructor(skill, prevMenu) {
        var params = [skill.name, skill.type, skill.cost + ' MP'];
        super(prevMenu.background, params,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.desc = skill.desc;
    };

    drawMenuText() {
        super.drawMenuText();
        this.drawDesc(this.desc);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
    }

    nextMenu() { };
    drawSelection() { };

}