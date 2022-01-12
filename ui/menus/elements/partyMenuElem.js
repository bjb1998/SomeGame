class partyMenuElem extends menuElem {
    constructor(party, prevMenu) {
        super(prevMenu.background, party.active,
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
    }

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
        this.menus = null;
    }

    drawMenuText() {
        var i;
        for (i = 0; i < this.party.active.length; i++){
            this.drawText(this.party.active[i].name, this.width - 70,  (50 * (i + 1)) + (this.height / 8.5));
        }
    }

    nextMenu() {
        console.log(this.party.active[this.selection]);
        var menu = new selectionElem(this.party.active[this.selection], this);
        return menu;
    }
}

class selectionElem extends menuElem {
    constructor(member, prevMenu) {
        super(prevMenu.background, ['Skills', 'Stats'],
            prevMenu.posX, prevMenu.posY,
            prevMenu.fontSize,
            prevMenu.width, prevMenu.height);
        this.member = member;
    }

    drawMenuText() {
        this.drawText('Skills', this.width - 70, (50 * (1)) + (this.height / 8.5));
        this.drawText('Stats', this.width - 70, (50 * (2)) + (this.height / 8.5));
    };

    nextMenu() {
        var menu;
        switch (this.selection) {
            case 0: menu = new skillMenuElem(this.member.skills, this); break;
            case 1: menu = new statsMenuElem(this.member.stats, this); break;
        }
        console.log(this.selection);
        return menu;
    }
}