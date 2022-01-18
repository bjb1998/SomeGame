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

    use(entity, slot) {
        console.log(this);
        console.log("Entity: ");
        console.log(entity);
        console.log("Slot: ");
        console.log(slot);
        slot.exec(entity);
        console.log(this.items);
        if (this.items != null && slot.count <= 0)
            this.items.splice(this.items.indexOf(slot), 1);
        console.log(this.items);
    };

};

class ItemSlot {
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

    exec(entity) {
        this.item.exec(entity);
        --this.count;
    };

};

class Item {
    constructor(name, desc, type, func) {
        Object.assign(this, { name, desc, type, func });
    }

    exec(entity) {
        this.func(entity);
    };

};

