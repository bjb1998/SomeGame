const elemType = {
    PHYS: 'Phys',
    FIRE: 'Fire',
    ICE: 'Ice',
    ELEC: 'Electric',
    FORCE: 'Force',
    LIGHT: 'Light',
    DARK: 'Dark',
    ALM: 'Almighty'
};

class Skill {
    constructor(name, desc, type, cost, func) {
        Object.assign(this, { name, desc, type, cost, func });
    };

    exec() {
        this.func();
    };

};

