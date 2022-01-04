class Entity{
    constructor(name, hp, mp, atk, def, mag, acc, luck, res) {
        // we use this to refer to the current object
        this.name = name;
        this.hp = hp;
        this.mp = mp;
        this.atk = atk;
        this.def = def;
        this.mag = mag;
        this.acc = acc;
        this.luck = luck;
        this.res = res;
        // this line does the same as above but in a more clever way
        // Object.assign(this, {name, hp, mp, atk, def, mag, acc, luck, res });

        // local variables are still declared with var
        var int = 1337;
        console.log("Local Variable ");
        console.log(int);
    };

    getOlder() {
        this.age++;
    };
};