class healRoomMenuElem extends MenuElem {
    constructor(color, options, posX, posY, fontSize, width, height) {
        super(color, options, posX, posY, fontSize, width, height);
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.party = menu.party;
        this.healed = false;
        this.dialogueBox = menu.diag;
    }

    drawMenuText() {
        this.drawText('  Heal ', this.width - 100, (50 * (1)) + (this.height / 8.5))
        if (this.healed) this.drawDesc('The party is healed!');
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width - 100, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    };

    nextMenu() {
        var menu;
        switch (this.selection) {
            case 0: this.heal(); break;
            case 1:
                this.dialogueBox.dialogueText = testDiag;
                this.dialogueBox.reset();
                this.dialogueBox.start();
                break;
            case 2: currentState = GameState.DUNGEON; break;
            default: return;
        }
        return menu;
    }

    heal() {
        for (var i = 0; i < this.party.active.length; i++) {
            const currentMemberStats = this.party.active[i].stats;
            currentMemberStats.hp = currentMemberStats.maxHP;
            currentMemberStats.mp = currentMemberStats.maxMP;
        }
        this.healed = true;
    }
}