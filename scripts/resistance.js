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
};