/* Resistance labels:
 * -1 - Drain
 *  0 - Null
 *  1 - Normal
 *  2 - Weak
 */
class Resistance {
    constructor(phys, gun, fire, ice, force, elec, light, dark, allm) {
        Object.assign(this, { phys, gun, fire, ice, force, elec, light, dark, allm });
    };

    getRes(type) {
        switch (type) {
            case elemType.PHYS: return this.phys;
            case elemType.GUN: return this.gun;
            case elemType.FIRE: return this.fire;
            case elemType.ICE: return this.ice;
            case elemType.FORCE: return this.force;
            case elemType.ELEC: return this.elec;
            case elemType.LIGHT: return this.light;
            case elemType.DARK: return this.dark;
            case elemType.ALLM: return this.allm;
        }
    }
};