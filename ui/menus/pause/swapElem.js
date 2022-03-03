class swapElem extends partyMenuElem{
    nextMenu() {
        var menu = new swapSelectionElem(this.party.active[this.selection], this);
        this.done = true;
        return menu;
    }
}

class swapSelectionElem extends partyMenuElem {
    constructor(member, prevMenu) {
        super(prevMenu.party, prevMenu);
        this.member = member;
        console.log(this);
        console.log(this.options);
    }

    nextMenu() {
        console.log(this.options);
        const other = this.options[this.selection];
        this.party.swapActive(this.member, other);
        this.done = true;
    }
}