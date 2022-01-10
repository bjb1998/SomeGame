class Menu{
    constructor(canvas, controls, map, party){
        this.ctx = canvas.getContext('2d');
        this.controls = controls;
        this.map = map;
        this.party = party;
        this.width = canvas.width;
        this.height = canvas.height;
        this.active == false;
        this.fontColorBottom = "rgb(8,39,101)";
        this.fontColorTop = "rgb(226,226,226)";
        this.menuColorBackground = "rgb(43,49,61)";
        this.menuStack = [];
        this.top = this.menuStack.length;
    }

    pushMenu(elem) {
        elem.init(this);
        this.menuStack.push(elem);
        this.top = this.menuStack.length;
    }

    popMenu() {
        this.menuStack.pop();
        this.top = this.menuStack.length;
    };

    fillBackground() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    //todo fix bug when quitting via back button
    draw() {
        var ctx = this.ctx;
        if (currentState === GameState.PAUSE) {
            if (this.top === 0) this.pushMenu(mainMenuElem);
            var currentMenu = this.menuStack[this.top - 1];
            this.active = true;
            this.fillBackground();
            currentMenu.drawElem();

            if (currentMenu.controls.confirm && !this.menuStack.includes(partyMenu)) {
                if (currentMenu.nextMenu() != null)
                    this.pushMenu(currentMenu.nextMenu());
            } else if (currentMenu.controls.decline) {
               this.popMenu();
            }

        } else {
            if (this.active)
                ctx.clearRect(0, 0, this.width, this.height);
            this.menuStack = [];
            this.top = 0;   
            this.selection = 0;
            this.active = false;
        }
    }
}