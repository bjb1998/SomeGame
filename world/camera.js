class Camera {
    constructor(canvas, resolution, focalLength) {
        this.ctx = canvas.getContext('2d');             //technically 3D but not reall,y Ala-doom
        this.width = canvas.width = 800;                //X-resolution of canvas
        this.height = canvas.height = 600;              //Y-Resolution of canvas
        this.resolution = resolution;                   //amount of columns to draw per frame
        this.spacing = this.width / resolution;         //space between each columnn
        this.focalLength = 0.8;                         //FOV of the camera
        this.range = 14;                                //draw distance of the vectors
        this.lightRange = 5;                            //range of light
    }

    project(height, angle, distance) {
        var z = distance * Math.cos(angle);         //get z coordinate based off the distance and angle
        var wallHeight = this.height * height / z;  //set wall height based on disatnce of the vector
        var bottom = this.height / 2 * (1 + 1 / z); //Where the bottom of the walls should be drawn
        //return tuple of bottom and top
        return {
            top: bottom - wallHeight,
            height: wallHeight
        };
    };

    render(player, map) {
        this.drawSky(player.direction, map.skybox, map.light);
        this.drawColumns(player, map);
    }

    drawSky(direction, sky) {
        var width = sky.width * (this.height / sky.height) * 2;                 //width of drawing
        var left = (direction / CIRCLE) * -width;                               //left edge of the screen

        this.ctx.save();
        this.ctx.drawImage(sky.image, left, 0, width, this.height);             //draw the skybox
        if (left < width - this.width) 
            this.ctx.drawImage(sky.image, left + width, 0, width, this.height); //draw other side of image to prevent drawing past the edge of the sky

        this.ctx.restore();
    };

    drawColumns(player, map) {
        this.ctx.save();
        for (var column = 0; column < this.resolution; column++) {
            var x = column / this.resolution - 0.5;                             //x position of column to draw
            var angle = Math.atan2(x, this.focalLength);                        //angle between the x and the focalLength
            var ray = map.cast(player, player.direction + angle, this.range);   //cast ray to get what to draw for the column
            this.drawColumn(column, ray, angle, map);                           //draw the column
        }
        this.ctx.restore();
    };

    drawColumn(column, ray, angle, map) {
        var ctx = this.ctx;                             //context of the camera
        var texture;                                    //given texture for a space
        var left = Math.ceil(column * this.spacing);    //left side of each column
        var width = Math.ceil(this.spacing);            //width of each column to draw
        var hit = -1;                                   //tracker of ray length

        //find an index where the ray hit a wall
        while (++hit < ray.length && ray[hit].height <= 0);

        //move back to the player to draw
        for (var s = ray.length - 1; s >= 0; s--) {
            var step = ray[s];

            if (s === hit) {
                texture = map.textures[ray[s].value - 1];                   //get the texture for the space based on the arrays value
                var textureX = Math.floor(texture.width * step.offset);     //get the texture offset from the ray
                var wall = this.project(step.height, angle, step.distance); //get texture parameters for the column

                ctx.globalAlpha = 1;
                ctx.drawImage(texture.image, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);   //draw the actual texture from the ray
                ctx.globalAlpha = 0.01;
            }
        }
    };
};