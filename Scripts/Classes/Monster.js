class Monster extends Entity {
	constructor(name, hp, mp, atk, def, mag, acc, luck, res) {
		super(name, hp, mp, atk, def, mag, acc, luck, res);
	};

	talk(){
		console.log("hello!");
	};
};