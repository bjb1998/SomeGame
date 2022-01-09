class Menu{
    constructor(canvas, controls, map, player, party){
        this.ctx = canvas.getContext('2d');
        this.fontSize = canvas.width / 20;
        this.setFontCtx();
        this.map = map;
        this.player = player;
        this.party = party;
        this.width = canvas.width;
        this.height = canvas.height;
        this.active == false;
        this.fontColorBottom = "rgb(8,39,101)";
        this.fontColorTop = "rgb(226,226,226)";
        this.menuColorBackground = "rgb(43,49,61)";
        this.selectionSprite = new Texture('assets/selector.png', 10, 10);
        this.options = [
            'Item',
            'Skill',
            'Party',
            'Stats',
            'Settings',
            'Quit'
        ];
        this.selection = 0;
    }

    setFontCtx() {
        this.ctx.font = this.fontSize + '20px Reactor7';
    }

    draw(controls) {
        var ctx = this.ctx;
        const width = this.width;
        const height = this.height;
        if (currentState === GameState.PAUSE) {
            this.active = true;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = this.menuColorBackground;
            ctx.fillRect(width * 0.05, height * 0.05, width * 0.2, height * 0.9);
            this.setFontCtx();
            this.drawMenuText();
            this.select(controls);
        } else {
            if(this.active)
                this.ctx.clearRect(0, 0, this.width, this.height);
            this.selection = 0;
            this.active = false;
        }
    }

    drawText(words, x, y) {
        var ctx = this.ctx;
        ctx.fillStyle = this.fontColorBottom;
        ctx.fillText(words, x, y);
        ctx.fillStyle = this.fontColorTop;
        ctx.fillText(words, x - 3, y - 3);
        ctx.fillStyle = "black";
    }

    drawMenuText() {
        for (var i = 0; i < this.options.length; i++)
            this.drawText(this.options[i], this.width * 0.09, (50 * (i + 1)) + (this.height / 8.5)); //draw the options in order by index    
    }

    //todo make more functional like movement
    select(controls) {
        console.log(this.selection);
        this.ctx.drawImage(this.selectionSprite.image, 
            this.width * 0.06, 
            (50 * (this.selection + 1) + (this.height / 12)),
            this.width / 50,
            this.height / 50);
        if (controls.backward) this.selection++;
        if (controls.forward) this.selection--;
        this.selction 
    }
}