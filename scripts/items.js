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
        if (this.items != null && slot.count <= 1)
            this.items.splice(this.items.indexOf(slot), 1);
        return slot.exec(entity);
    };

    give(itemToGive, count) {
        for (var i = 0; i < this.items.length; i++) {
            var currentSlot = this.items[i];
            if (currentSlot.item.name === itemToGive.name) {
                currentSlot.add(count);
                return;
            }
        }
        this.items.push(new ItemSlot(itemToGive, count));
    }

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
        --this.count;
        return this.item.exec(entity);
    };

};

class Item {
    constructor(name, desc, type, func, cost) {
        Object.assign(this, { name, desc, type, func, cost });
    }

    exec(entity) {
        return this.func(entity);
    };

};

