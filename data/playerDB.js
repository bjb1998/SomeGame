const playerRes = new Resistance(1, 1, 2, 1, 1, 1, 1, 1, 1);
const playerStats = new Stats(5, 5, 4, 4, 4, 3, 5, 3, playerRes);
const inv = [potion];
const skills = [strike];
var playerPreset = new Player("Bob", playerStats, 100, inv, skills);