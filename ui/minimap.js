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
    }

    //todo make more dyanmic based on tile state and make it prettier
    //side-todo allow more world states besides wall and no wall
    drawMap() {
        const size = this.squareSize;
        const units = this.gridSize;
        for (var i = 0; i < units; i++)
            for (var j = 0; j < units; j++) {
                const coord = this.getCoordinate(i, j);
                if (i === units / 2 - 1 && j === units / 2 - 1)
                    this.ctx.fillStyle = "blue";
                else if (coord < 0)
                    this.ctx.fillStyle = "black";
                else
                    this.ctx.fillStyle = this.map.colors[coord];

                this.ctx.fillRect(this.startX + i * size, this.startY + j * size,
                    size, size);
            }
    }

    //todo make player center of map, unfuck me
    getCoordinate(x, y) {
        const pos = playerPos;
        const startGrid = [pos[0] - x + this.gridSize / 2 - 1, pos[1] - y + this.gridSize / 2 - 1];
        //console.log(pos);
        //console.log(startGrid[0] + " " + startGrid[1]);
        const n = this.map.get(startGrid[0], startGrid[1]);
        return n;
    }
}