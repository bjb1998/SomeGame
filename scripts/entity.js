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
        this.guard = false;
        if (this.skills.length <= maxSkills)
            skillsToAdd.forEach(current => this.skills.push(current));
    };

    execSkill(entity, slot) {
        this.stats.useMP(this.skills[slot].cost);
        return this.skills[slot].exec(entity);
    }

    checkLevel(exp) {
        return this.stats.checkLevel(exp);
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
        this.currentExp = 0;
        this.nextExp = Math.floor(Math.pow(this.lvl, 1.5)); //Exp for next level = (current level)^1.5
        this.status = statusType.HEALTHY;
    };

    checkLevel(exp) {
        this.currentExp += exp;
        if (this.currentExp >= this.nextExp) {
            console.log('Level up!');
            this.lvl++;
            this.currentExp = 0;
            this.nextExp = Math.floor(Math.pow(this.lvl, 1.5));

            const currStats = ['maxHP', 'maxMP', 'atk', 'def', 'mag', 'acc', 'luck']; //raise a random stat by 1.1x, yes its unbalanced and dumb but theres deadlines
            const randomStat = Math.floor(Math.random() * currStats.length);
            this[currStats[randomStat]] = Math.ceil(this[currStats[randomStat]] * 1.1); 
        }
    }

    damage(dmg, type) {
        const damageMult = this.res.getRes(type); //get Resistance multipler from damage type
        this.hp -= dmg * damageMult;
        this.hp = Math.min(Math.max(this.hp, 0), this.maxHP); //clamp the HP between 0 and max HP
        if (this.hp <= 0) { this.status = statusType.DEAD; } 
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
    constructor(name, stats, exp, skillsToAdd, animation) {
        super(name, stats, skillsToAdd);
        this.exp = exp;
        this.animation = animation;
    };

    talk() {
        console.log("hello!");
    };
};