const AbsoluteMax = 8;
const statusType = {
    HEALTHY: 'Healthy',
    SLEEP: 'Sleep',
    HAZE: 'Haze',
    CHARM: 'Charm',
    SEAL: 'Seal',
    POISON: 'Poison',
    DEAD: 'Dead'
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

    execSkill(entity, slot) {
        console.log(this.stats);
        this.skills[slot].exec(entity);
        this.stats.useMP(this.skills[slot].cost);
        console.log(this.stats);
    }

    checkMp(Mp) {
        return this.stats.checkMp(Mp);
    }

};

class Stats {
    constructor(lvl, hp, mp, atk, def, mag, acc, luck, res) {
        // we use this to refer to the current object
        Object.assign(this, { name, lvl, hp, mp, atk, def, mag, acc, luck, res })
        this.maxHP = hp;
        this.maxMP = mp;
        this.status = statusType.HEALTHY;
    };

    damage(dmg, type) {
        console.log(dmg, type);
        this.damageMult = Object.keys(elemType).indexOf(type);
        this.hp -= dmg * this.damageMult;
        if (this.hp <= 0) this.hp === 0; this.status = statusType.DEAD; 
    }

    checkMp(Mp) {
        if (this.mp >= Mp) return true;
        return false;
    }

    useMP(Mp) {
        this.mp - Mp <= 0 ? this.mp = 0 : this.mp -= Mp;
    }
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