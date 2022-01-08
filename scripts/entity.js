const AbsoluteMax = 8;
const statusType = {
    HEALTHY: 'Healthy',
    SLEEP: 'Sleep',
    HAZE: 'Haze',
    CHARM: 'Charm',
    SEAL: 'Seal',
    POISON: 'Poison'
};
const maxSkills = 4;

class Entity{
    constructor(name, stats, skillsToAdd) {
        // we use this to refer to the current object
        Object.assign(this, { name, stats });
        this.skills = [];
        if (this.skills.length <= maxSkills)
            skillsToAdd.forEach(current => this.skills.push(current));
    };

};

class Stats {
    constructor(lvl, hp, mp, atk, def, mag, acc, luck, res) {
        // we use this to refer to the current object
        Object.assign(this, { name, lvl, hp, mp, atk, def, mag, acc, luck, res })
        this.maxHP = hp;
        this.maxMP = mp;
        this.status = statusType.HEALTHY;
    };
};

class MC extends Entity {
    constructor(name, stats, money, items, skillsToAdd) {
        super(name, stats, skillsToAdd);
        this.money = money;
        this.inv = new Inventory(items);
    };
};

class Pawn extends Entity {
    constructor(name, stats, exp, skillsToAdd) {
        super(name, stats, skillsToAdd);
        this.exp = exp;
    };

    talk() {
        console.log("hello!");
    };
};