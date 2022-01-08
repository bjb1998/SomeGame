class Controls {
    constructor() {
        this.codes = { 37: 'left', 39: 'right', 38: 'forward', 27: 'pause' };
        this.states = { 'left': false, 'right': false, 'forward': false, 'pause': false };
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
    }

    //check state of each key
    resetState() {
        this.codes = { 37: 'left', 39: 'right', 38: 'forward', 27: 'pause'};
        this.states = { 'left': false, 'right': false, 'forward': false, 'pause': false };
    }

    //get the key based on the keyycode, set its state to true, otherwise, false
    onKey(val, e) {
        var state = this.codes[e.keyCode];
        if (typeof state === 'undefined') return;
        this.states[state] = val;
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    };

};