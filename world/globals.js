const CIRCLE = Math.PI * 2; 													//2pi in radians (all angles are in radians)
const rightAngle = CIRCLE / 4;													//right angle, frequently used for rotations
var moving = false;																//boolean to determine if camera animation is happening or not
const angles = [0, 0 + rightAngle, 2 * rightAngle, 3 * rightAngle, CIRCLE];		//the 4 right angles (radians)
const step = 0.6;																//distance taken when moving forward
const fov = 0.8;                                                                //FOV of the camera
const res = 300;                                                                //resolution of the camera
var playerPos = [];                                                             //player as an x, y coordinate

