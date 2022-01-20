class battleMenuElem{
    constructor(color, options, posX, posY, fontSize, width, height) {
        this.ctx = null;
        this.background = color;
        this.controls = null;
        this.options = options;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.selection = 0;
        this.state = 0;
        this.entityNum = 0;
        this.turn = [];
        this.backBuffer = true;
        this.forwardBuffer = true;
        this.confirmBuffer = true;
        this.denyBuffer = true;
    };

    init(menu) {
        this.ctx = menu.ctx;
        this.controls = menu.controls;
        this.playerIndex = menu.party.playerIndex;
        this.battle = menu.battle;
        this.resetTimer();
    }

    drawElem() {
            var ctx = this.ctx;
            ctx.fillStyle = this.background;
            ctx.fillRect(this.posX, this.posY, this.width, this.height);
            this.setFontCtx();
            this.drawMenuText();
            this.drawSelection();
            this.resetTimer();  
            this.select(this.controls);
    }

    resetTimer() {
        startTime = Date.now();
    }

    drawText(words, x, y) {
        var ctx = this.ctx;
        ctx.fillStyle = fontColorBottom;
        ctx.fillText(words, x, y);
        ctx.fillStyle = fontColorTop;
        ctx.fillText(words, x - 5, y - 5);
        ctx.fillStyle = "black";
    }

    drawMenuText() {
        const currentMember = this.battle.playerParty[this.battle.turn.currentMember];
        this.drawText(currentMember.name, this.width - 70, (50) + (this.height / 8.5)); //draw the options in order by index
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width - 70, (50 * (i + 2)) + (this.height / 8.5)); //draw the options in order by index
    };

    setFontCtx() {
        this.ctx.font = this.fontSize + 'px Reactor7';
    };

    drawSelection() {
        this.ctx.drawImage(selectionSprite.image,
            this.width - 100,
            (50 * (this.selection + 2) + (this.height / 13)),
            10,
            10);
    }

    select() {
        //check confirmation/declinations
        this.confirmDeny();

        const forward = this.controls.forward;
        const back = this.controls.backward;

        //move up/down the menu
        if (forward && forward != this.forwardBuffer) this.selection--;
        if (back && back != this.backBuffer) this.selection++;
        this.backBuffer = back
        this.forwardBuffer = forward;

        if (this.options != null)
            if (this.selection > this.options.length - 1)
                this.selection = this.options.length - 1;
            else if (this.selection < 0)
                this.selection = 0;
    }

    confirmDeny() {
        const confirm = this.controls.confirm;
        const decline = this.controls.decline;
        if (confirm && confirm != this.confirmBuffer) this.state = 1;
        else if (decline && decline === this.denyBuffer) this.state = -1;
        else if (this.done) this.state = -1;
        else this.state = 0;
        this.confirmBuffer = confirm;
        this.denyBuffer = decline;
    }

    nextMenu() {
        var menu;
        const party = this.battle.playerParty;
        const currentMember = this.battle.playerParty[this.battle.turn.currentMember];
        switch (this.selection) {
            case 0:
                menu = new entitySelectElem(this, this.battle.enemyParty, StrikeFunc);
                break;
            case 1: menu = new battleSkillMenuElem(this, currentMember); break;                        //use a skill
            case 2: menu = new battleItemMenuElem(this, party[this.playerIndex].inv); break;           //use an item
            case 3: menu = this.battle.addAction(guard.func, currentMember); console.log(Date.now() - startTime); break; //guard current member
            case 4: menu = new runElem(); break;                                                       //run away from battle
            default: return;
        }
        return menu;
    }
}