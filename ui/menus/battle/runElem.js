class runElem extends battleMenuElem {

    init(menu) {
        this.battle = menu.battle;
        this.battle.run() ? this.run() : this.state = -1;
    }

    run() {
        console.log("running away...");
        currentState = GameState.DUNGEON;
    }

    drawMenuText() {
        currentState = GameState.DUNGEON;
    }

    select() { }

    nextMenu() { }

    drawElem() { }
}