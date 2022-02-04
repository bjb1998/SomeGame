class battleMenuElem extends MenuElem{
    constructor(color, options, posX, posY, fontSize, width, height) {
        super(color, options, posX, posY, fontSize, width, height);
        this.entityNum = 0;
        this.turn = [];
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.playerIndex = menu.party.playerIndex;
        this.battle = menu.battle;
    }

    drawMenuText() {
        const currentMember = this.battle.playerParty[this.battle.turn.currentMember];
        this.drawText(currentMember.name, this.width - 100, (50) + (this.height / 8.5)); //draw the options in order by index
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    };

    nextMenu() {
        var menu;
        const party = this.battle.playerParty;
        const currentMember = this.battle.playerParty[this.battle.turn.currentMember];
        switch (this.selection) {
            case 0:
                menu = new battleEntitySelectElem(this, this.battle.enemyParty, StrikeFunc);
                break;
            case 1: menu = new battleSkillElem(this, currentMember); break;                        //use a skill
            case 2: menu = new battleItemElem(this, party[this.playerIndex].inv); break;           //use an item
            case 3: menu = this.battle.addAction(guard.func, currentMember, currentMember, null, "other"); break; //guard current member
            case 4: this.battle.run();                                              //run away from battle
            default: return;
        }
        return menu;
    }
}