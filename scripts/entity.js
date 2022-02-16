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
const maxSfxs = 4

class Entity{
    constructor(name, stats, skillsToAdd, sfxsToAdd) {
        // we use this to refer to the current object
        Object.assign(this, { name, stats, });
        this.skills = [];
        this.sfxs = [];
        this.guard = false;
        if (this.skills.length <= maxSkills)
            skillsToAdd.forEach(current => this.skills.push(current));
        
        if (this.sfxs.length <= maxSfxs)
            sfxsToAdd.forEach(current => this.sfxs.push(current));
        this.currAttackSfx = this.sfxs[0];
    };

    execSkill(source, entity, slot) {
        this.stats.useMP(this.skills[slot].cost);
        return this.skills[slot].exec(source, entity);
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
        Object.assign(this, {lvl, hp, mp, atk, def, mag, acc, luck, res })
        this.maxHP = hp;
        this.maxMP = mp;
        this.currentExp = 0;
        this.nextExp = Math.floor(Math.pow(this.lvl, 1.5)); //Exp for next level = (current level)^1.5
        this.status = statusType.HEALTHY;
    };

    checkLevel(exp) {
        this.currentExp += exp;
        if (this.currentExp >= this.nextExp) {
            this.lvl++;
            this.currentExp = 0;
            this.nextExp = Math.floor(Math.pow(this.lvl, 1.5));

            const currStats = ['maxHP', 'maxMP', 'atk', 'def', 'mag', 'acc', 'luck']; //raise a random stat by 1.1x, yes its unbalanced and dumb but theres deadlines
            const randomStat = Math.floor(Math.random() * currStats.length);
            this[currStats[randomStat]] = Math.ceil(this[currStats[randomStat]] * 1.1);
            return true;
        } else
            return false;
    }

    damage(dmg) {
        this.hp -= dmg;
        this.hp = Math.min(Math.max(this.hp, 0), this.maxHP); //clamp the HP between 0 and max HP
        if (this.hp <= 0) { this.status = statusType.DEAD; } 
        return dmg;
    }

    checkMp(Mp) {
        if (this.mp >= Mp) return true;
        return false;
    }

    useMP(Mp) {
        this.mp -= Mp;
        this.mp = Math.min(Math.max(this.mp, 0), this.maxMP); //clamp the MP between 0 and max MP
    }
};

class MC extends Entity {
    constructor(name, stats, money, items, skillsToAdd, sfxsToAdd) {
        super(name, stats, skillsToAdd, sfxsToAdd);
        this.money = money;
        this.inv = new Inventory(items);
    };
};

class Pawn extends Entity {
    constructor(name, stats, exp, skillsToAdd, animation, sfxsToAdd) {
        super(name, stats, skillsToAdd, sfxsToAdd);
        this.exp = exp;
        this.animation = animation;
    };

    talk() {
        console.log("hello!");
    };
};