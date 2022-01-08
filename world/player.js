class Player{
	constructor(x, y, direction){
		Object.assign(this, {x, y, direction});
		this.paces = 0;
	};

	rotate(dir) {
		let start = Date.now();
		if (!moving) {
			moving = true;
			let timer = setInterval(function (camera) {
				let timePassed = Date.now() - start;

				if (timePassed >= 250) {
					clearInterval(timer);
					camera.direction = angles.reduce(function (prev, curr) { //floating points are a bitch
						return (Math.abs(curr - camera.direction) < Math.abs(prev - camera.direction) ? curr : prev);
					});
					moving = false;
					return;
				}

				// move the camera per interval
				camera.direction = (camera.direction + ((rightAngle / 12) * dir) + CIRCLE) % (CIRCLE);

			}, 20, this);
		};
	};

	walk(map) {
		let start = Date.now();
		if (!moving) {
			moving = true;
			let timer = setInterval(function (camera, map) {
				let timePassed = Date.now() - start;

				if (timePassed >= 215) {
					clearInterval(timer);
					//round vlaues for x, and y as needed
					camera.x = Math.round(camera.x * 10) / 10;
					camera.x = (camera.x < Math.floor(camera.x) + 0.5) ? Math.floor(camera.x) + 0.5 : camera.x;
					camera.y = Math.round(camera.y * 10) / 10;
					camera.y = (camera.y < Math.floor(camera.y) + 0.5) ? Math.floor(camera.y) + 0.5 : camera.y;
                    playerPos = [camera.x - 0.5, camera.y - 0.5]; //sotre to glboals for minimap drawing
					moving = false;
					return;
				}

				// get change in camera distance, check distance, then move when needed
				const dx = Math.cos(camera.direction) * 0.1;
				const dy = Math.sin(camera.direction) * 0.1;
				const destX = camera.x + (step * Math.sign(dx)) + 0.05;
				const destY = camera.y + (step * Math.sign(dy)) + 0.05;
				if (map.get(destX, camera.y) <= 0) camera.x += dx;
                if (map.get(camera.x, destY) <= 0) camera.y += dy;

			}, 20, this, map);
		};
	};

	update(controls, map) {
		if (controls.left) this.rotate(-1);
		if (controls.right) this.rotate(1);
		if (controls.forward) this.walk(map);
	};
};