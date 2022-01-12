class Controls {
    constructor() {
        this.codes = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 27: 'pause', 90: 'confirm', 88: 'decline'};
        this.states = {
            'left': false, 'right': false, 'forward': false, 'backward': false,
            'pause': false, 'confirm': false, 'decline': false
        };
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
    }

    //reset state of each key
    resetState() {
        this.codes = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 27: 'pause', 90: 'confirm' , 88: 'decline'};
        this.states = {
            'left': false, 'right': false, 'forward': false, 'backward': false,
            'pause': false, 'confirm': false, 'decline': false
        };
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