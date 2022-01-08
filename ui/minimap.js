class Minimap{
    constructor(canvas, units, size, startX, startY, map) {
        this.ctx = canvas.getContext('2d');
        this.startX = startX;
        this.startY = startY;
        this.gridSize = units;
        this.grid = [];
        this.squareSize = size / units;
        this.map = map;
        this.half = false;
        this.playerSprite = new Texture('assets/arrow.PNG', this.squareSize, this.squareSize);
        this.root = Math.sqrt(units);
    }

    //todo have textures for the world map
    drawMap() {
        const size = this.squareSize;
        const units = this.gridSize;
        for (var i = 0; i < units; i++)
            for (var j = 0; j < units; j++) {
                const coord = this.getCoordinate(i, j);
                if (i === units / 2 - 1 && j === units / 2 - 1) {
                    this.ctx.fillRect(this.startX + i * size, this.startY + j * size,
                        size, size);
                    this.drawPlayerSpr(i, j);
                    continue;
                }else if (coord < 0)
                    this.ctx.fillStyle = "black";
                else
                    this.ctx.fillStyle = this.map.colors[coord];

                this.ctx.fillRect(this.startX + i * size, this.startY + j * size,
                    size, size);
            }
    }

    getCoordinate(x, y) {
        const pos = playerPos;
        const startGrid = [pos[0] - x + this.gridSize / 2 - 1, pos[1] - y + this.gridSize / 2 - 1];
        //console.log(pos);
        //console.log(startGrid[0] + " " + startGrid[1]);
        const n = this.map.get(startGrid[0], startGrid[1]);
        return n;
    }

    //todo have this thing actually work on sizes besides 16 :(
    drawPlayerSpr(i, j) {
        const size = this.squareSize;
        const root = this.root;
        this.ctx.translate((this.startX + i * size) + root, (this.startY + j * size) + root); //translate and rotate
        this.ctx.rotate(Math.PI + playerDir);
        this.ctx.drawImage(this.playerSprite.image, -this.playerSprite.width / 2, -this.playerSprite.height / 2,
            this.playerSprite.width, this.playerSprite.height);
        this.ctx.rotate(Math.PI - playerDir);                               //then reverse it
        this.ctx.translate(-(this.startX + i * size) - root, -(this.startY + j * size) - root);
    };
}