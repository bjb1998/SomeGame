const ItemType = {
    HEAL: 'Heal',
    BATTLE: 'Battle',
    KEY: 'Key',
    SPECIAL: 'Special'
};

class Inventory {
    constructor(itemsToAdd) {
        this.items = [];
        itemsToAdd.forEach(current => this.items.push(new ItemSlot(current, 1)));
    }

    use(slot) {
        slot.exec();
        if (slot.count === 0)
            this.items.splice(this.items.indexOf(slot), 1);
    };

};

class Item {
    constructor(name, desc, type, func) {
        Object.assign(this, { name, desc, type, func });
    }

    exec() {
        this.func();
    };

};

class ItemSlot{
    constructor(item, count) {
        this.max = 99;
        this.item = item;
        this.count = 0;
        this.add(count);
    };

    add(num) {
        this.count += num;
        if (this.count >= this.max) this.count = this.max;
    }

    exec() {
        this.item.exec();
        --this.count;
    };

};