const activeMax = 4;
const reserveMax = 4;

class Party {
    constructor(player) {
        this.active = [];
        this.reserve = [];
        if(player != null)
            this.active.push(player);
        this.playerIndex = 0;
    };

    recruit(entity) {
        const entName = entity.name;
        if (this.containsMember(entName))
            //todo implement already in party dialog
            console.log("Already in party");
        else if (this.active.length < activeMax)
            this.active.push(entity);
        else if (this.reserve.length < reserveMax)
            this.reserve.push(entity);
        else
            //todo implement party full dialog
            console.log("Full party :(");
    }

    //todo support empty slot swappage
    swapActive(entity1, entity2) {
        let i1 = this.active.indexOf(entity1);
        let i2 = this.active.indexOf(entity2);

        [this.active[i1], this.active[i2]] = [this.active[i2], this.active[i1]];

        if (i2 === this.playerIndex) this.playerIndex = i1;
        else if (i1 === this.playerIndex) this.playerIndex = i2;

        console.log(this.playerIndex);
    }

    swapReserve(entity1, entity2) {
        let i1 = this.active.indexOf(entity1);
        let i2 = this.reserve.indexOf(entity2);
        if (i1 != this.playerIndex && i2 != this.playerIndex)
            [this.active[i1], this.reserve[i2]] = [this.reserve[i2], this.active[i1]];
        else
            console.log('You can\'t swap out yourself!');
    }

    containsMember(name) {
        //Return true or false is bad but returning a var with the exact same result is okay???
        let bool = false;
        this.active.forEach(current => {if (current.name === name) bool = true;});
        this.reserve.forEach(current => { if (current.name === name) bool = true;});
        return bool;
    };

};

class EnemyParty extends Party{
    constructor(player) {
        super(player);
    };

    recruit(entity) {
        if (this.active.length < activeMax)
            this.active.push(entity);
        else
            //todo implement party full dialog
            console.log("Full party :(");
    }
};