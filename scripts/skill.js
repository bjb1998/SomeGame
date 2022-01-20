const elemType = {
    PHYS: 'Phys',
    GUN: 'Gun',
    FIRE: 'Fire',
    ICE: 'Ice',
    FORCE: 'Force',
    ELEC: 'Electric',
    LIGHT: 'Light',
    DARK: 'Dark',
    ALLM: 'Almighty'
};

class Skill {
    constructor(name, desc, type, cost, func) {
        Object.assign(this, { name, desc, type, cost, func });
    };

    exec(entity) {
        this.func(entity);
    };

};

