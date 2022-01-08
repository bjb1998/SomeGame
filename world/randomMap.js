//map of any respective dungeon
class RandomMap {
	constructor(size) {
		this.size = size;                                                           //size of map (n^2)
		this.wallGrid = new Uint8Array(size * size);                                //Random array of walls, 0 is floor, 1 is wall
		this.skybox = new Texture('assets/deathvalley_panorama.jpg', 2000, 750);    //skybox texture
        this.wallTexture = new Texture('assets/wall_texture.jpg', 1024, 1024);      //wall texture
        this.doorTexture = new Texture('assets/door.jpg', 1024, 1024);              //door texture
        this.textures = [this.wallTexture, this.doorTexture];
        this.wallHeight = 1;
        this.light = 1;
        this.states = 3;                                                            //possible sattes a wall can be (max = n - 1)
	};

    //get x,y coordinate of map
	get(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;    //error checking for negatives
        //the grid is a square so we can do this to get a coordinate
		return this.wallGrid[y * this.size + x];                                    //get the position
	};

	randomize(){
		for (var i = 0; i < this.size * this.size; i++) {
            this.wallGrid[i] = Math.floor(Math.random() * this.states);
		}
	};

	//Cast rays to project 'fake' 3D onto screen
	//DOOM for MS-DOS does similar but in C
	cast(point, angle, range) {
		var self = this;
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
		var noWall = { length2: Infinity };

        //basic ray
		return ray({ x: point.x, y: point.y, height: 0, distance: 0, value: 0});


		function ray(origin) {
			var stepX = step(sin, cos, origin.x, origin.y);       //step in the x direction
			var stepY = step(cos, sin, origin.y, origin.x, true); //step in the y direction
			var nextStep = stepX.length2 < stepY.length2          //the length of the next step
			? inspect(stepX, 1, 0, origin.distance, stepX.y)
			: inspect(stepY, 0, 1, origin.distance, stepY.x);

			if (nextStep.distance > range) return [origin]; //if out of range, return
			return [origin].concat(ray(nextStep));          //otherwise, repeat for the next step
		}

        //change the position of the vector based on the slope given
		function step(rise, run, x, y, inverted) {
			if (run === 0) return noWall;
			var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
			var dy = dx * (rise / run);
			return {
				x: inverted ? y + dy : x + dx, //the new x postion
				y: inverted ? x + dx : y + dy, //the new y position
				length2: dx * dx + dy * dy     //the length of the vector
			};
		}

        //check the status of the vector
		function inspect(step, shiftX, shiftY, distance, offset) {
			var dx = cos < 0 ? shiftX : 0;                      //take into account negatvies for x
            var dy = sin < 0 ? shiftY : 0;                      //take into account negatvies for y
            const pos = self.get(step.x - dx, step.y - dy);     //calculate new height relative to distance and space number

            (pos >= 1) ? step.height = (pos - (pos - 1)) * self.wallHeight : step.height = pos;
			step.distance = distance + Math.sqrt(step.length2); //calculate distance of wall/vector
            step.offset = offset - Math.floor(offset);
            step.value = pos;                                   //get the valuen of the square itself (for textures)
			return step;
		}
	};
};