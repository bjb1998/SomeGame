class ControlsWorld{
	constructor(x, y, direction, dialogueBox){
		Object.assign(this, {x, y, direction});
        this.paces = 0;
        playerPos = [x - 0.5, y - 0.5];         //inialize playerPos global
        playerDir = direction;
        this.buffer = false;
        this.dialogueBox = dialogueBox;
	};

    //rotate the camera 90 degrees left or right
    rotate(dir) {
        const angles = [0, 0 + rightAngle, 2 * rightAngle, 3 * rightAngle, CIRCLE]; //the 4 right angles (radians)
        let ogDirection = null;
		if (!moving) {
			moving = true;
            let timer = setInterval(function (camera) {
                if (ogDirection == null) ogDirection = camera.direction; //get original direction when starting

                let dif = Math.abs(camera.direction - ogDirection); //get the difference between the two angles
                if (dif >= Math.PI) dif = CIRCLE - dif;

                //set camera equal to the nearest angle
                if (dif >= rightAngle - 0.01) {
                    clearInterval(timer);
					camera.direction = angles.reduce(function (prev, curr) { //get the closest value to the angles array
						return (Math.abs(curr - camera.direction) < Math.abs(prev - camera.direction) ? curr : prev);
                    });
                    playerDir = camera.direction;
					moving = false;
					return;
				}

				// move the camera per interval
				camera.direction = (camera.direction + ((rightAngle / 12) * dir) + CIRCLE) % (CIRCLE);

			}, 20, this);
		};
	};

    //walk forward one space
    walk(map) {
        var destX, destY, xRes, yRes, dx, dy;
        destX = destY = xRes = yRes = dx = dy = null;
		if (!moving) {
            moving = true;
            let timer = setInterval(function (camera, map) {
                if (destX === null) {
                    dx = Math.cos(camera.direction) * 0.1;
                    dy = Math.sin(camera.direction) * 0.1;
                    destX = camera.x + (0.5 * Math.sign(dx)) + (Math.sign(dx) * 0.5);
                    destY = camera.y + (0.5 * Math.sign(dy)) + (Math.sign(dy) * 0.5);
                    if (destY === camera.y) destY = camera.y - 1; //screw you work already
                    xRes = map.get(destX, camera.y);
                    yRes = map.get(camera.x, destY);
                }
                //store previous positions of camera
                const prevX = camera.x;
                const prevY = camera.y;

				// get change in camera distance, check distance, then move when needed
                if (xRes === 0) camera.x += dx;
                if (yRes === 0) camera.y += dy;

                if ((Math.abs(destX - camera.x) <= 0.01 || Math.abs(destY - camera.y) <= 0.01) || (camera.x === prevX && camera.y === prevY)) {
                    playSfx(step);
                    clearInterval(timer);
                    //round vlaues for x, and y as needed
                    camera.x = Math.round(camera.x / 0.5) * 0.5;
                    camera.x = (camera.x < Math.floor(camera.x) + 0.5) ? Math.floor(camera.x) + 0.5 : camera.x;
                    camera.y = Math.round(camera.y / 0.5) * 0.5;
                    camera.y = (camera.y < Math.floor(camera.y) + 0.5) ? Math.floor(camera.y) + 0.5 : camera.y;
                    playerPos = [camera.x - 0.5, camera.y - 0.5]; //store to globals for minimap drawing
                    if (camera.x != prevX || camera.y != prevY) //check for a battle if the player actually moved
                        battleCheck = true;
                    moving = false;
                    return;
                }

			}, 20, this, map);
		};
    };

    //talk to npc if one is nearby on the map
    talk() {
        if (currentNPC != null) {
            this.dialogueBox.dialogueText = currentNPC;
            this.dialogueBox.reset();
            this.dialogueBox.start();
        }
    }

    //pause to do inventory stuff, etc.
    pause() {
        let start = Date.now()
        if (!moving) {
            moving = true;
            let timer = setInterval(function(){
                let timePassed = Date.now() - start;
                if (timePassed >= 250) {
                    playSfx(sfx_open);
                    clearInterval(timer);
                    if(currentState === GameState.PAUSE) currentState = GameState.DUNGEON;
                    else if(currentState === GameState.DUNGEON) currentState = GameState.PAUSE;
                    moving = false;
                    return;
                }
            }, this);
        };
    };

    update(controls, map) {
        if (currentState === GameState.DUNGEON) {
            if (controls.left) this.rotate(-1);
            if (controls.right) this.rotate(1);
            if (controls.forward) this.walk(map);
            if (controls.confirm && this.buffer != controls.confirm) this.talk();
            this.buffer = controls.confirm;
        };
            if (controls.pause) this.pause();
	};
};