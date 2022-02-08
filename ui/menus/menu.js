class Menu {
    constructor(canvas, controls, party) {
        this.ctx = canvas.getContext('2d'); //canavs context
        this.selction = 0;                  //spot the plaeyer selects
        this.width = canvas.width;          //width of menu
        this.height = canvas.height;        //height of menu
        this.menuStack = [];                //menu stack. top of stack is the current menu
        this.controls = controls;           //controls to read  
        this.top = this.menuStack.length;   //"pointer" to the top of the stack
        this.party = party;                 //players party
        this.active = false;                //is the menu active or not?
        this.background = null;
        this.desiredState = null;
        this.topMenu = null;
    }

    //push a menu onto the stack and initialize it
    pushMenu(elem) {
        elem.init(this);
        this.menuStack.push(elem);
        this.top = this.menuStack.length;
    }

    checkState() {
        return currentState === this.desiredState;
        console.log(currentState);
    }

    draw() {
        if (this.checkState()) {
            if (this.background != null) this.ctx.drawImage(this.background, 0, 0, 1024, 768);
            this.partyStats = new partyStatsElem(this.ctx, this.party.active,
                menuColorBackground, 225, 35, 135, 150);
            //create new main menu if the stack is empty
            if (this.top === 0) {
                this.pushMenu(this.topMenu);
                this.clear();
            }
            var currentMenu = this.menuStack[this.top - 1];
            this.active = true;
            this.partyStats.draw();
            currentMenu.drawElem();

            //Based on the menus state, push or pop the menu stack
            if (currentMenu.state === 1 && currentMenu.nextMenu() != null) {
                this.pushMenu(currentMenu.nextMenu());
            } else if (currentMenu.state === -1) {
                this.popMenu();
            }

        } else if (this.active)
            this.exit();

    }

    //pop a menu from stack adn reinitialize
    popMenu() {
        this.menuStack.pop();
        this.top = this.menuStack.length;
        //If the stack is not empty, reset its state, otherwise, exit
        if (this.top != 0) {
            this.menuStack[this.top - 1].state = 0;         //set state to zero
            this.menuStack[this.top - 1].denyBuffer = true; //used to prevent unwanted back entires
            this.clear();
        } else {
            this.exit();
        }
    };

    //clear the screen of any remnants
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    //exit the menu and return to traversing the dungeon
    exit() {
        if (this.active)
            this.clear();
        this.menuStack = [];
        this.top = 0;
        this.selection = 0;
        this.active = false;

        if (this.checkState()) currentState = GameState.DUNGEON;
    }


}