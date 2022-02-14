class Minimap{
    constructor(canvas, units, size, startX, startY, map) {
        this.ctx = canvas.getContext('2d');
        this.startX = startX;
        this.startY = startY;
        this.gridSize = units;
        this.grid = [];
        this.squareSize = size / units;
        this.map = map;
        this.playerSprite = playerMap;
        this.root = Math.sqrt(units);
    }

    //todo have textures for the world map
    drawMap() {
        const size = this.squareSize;
        const units = this.gridSize;
        if (currentState != GameState.PAUSE)
            for (var i = 0; i < units; i++)
                for (var j = 0; j < units; j++) {
                    const coord = this.getCoordinate(i, j);
                    if (i === units / 2 - 1 && j === units / 2 - 1) {
                        this.ctx.fillRect(this.startX + i * size, this.startY + j * size,
                            size, size);
                        this.drawPlayerSpr(i, j);
                        continue;
                    }else if (coord === -4) {
                        this.ctx.drawImage(bossMap.image, this.startX + i * size, this.startY + j * size,
                            size, size);
                        continue;
                    } else if (coord <= -2) {
                        this.ctx.drawImage(npcMap.image, this.startX + i * size, this.startY + j * size,
                            size, size);
                        continue;
                    } else if (coord < 0) {
                        this.ctx.fillStyle = "black";
                    }else
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

    drawPlayerSpr(i, j) {
        const size = this.squareSize;
        const root = this.root;
        const center = -size / 2;
        this.ctx.translate((this.startX + i * size) + root, (this.startY + j * size) + root); //translate and rotate
        this.ctx.rotate(Math.PI + playerDir);
        this.ctx.drawImage(this.playerSprite.image, center, center, size, size);
        this.ctx.rotate(Math.PI - playerDir);                                                 //then reverse it
        this.ctx.translate(-(this.startX + i * size) - root, -(this.startY + j * size) - root);
    };
}