class Player extends Entity{
    constructor(name, hp, mp, atk, def, mag, acc, luck, res) {
        super(name, hp, mp, atk, def, mag, acc, luck, res);
    };

    getOlder() {
        this.age++;
    };
};