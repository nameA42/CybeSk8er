// Ben Pratt, David Diaz, Newton Novak, Patrick Gomez
// Game Title: Cyber Sk8r
// 5/3/2022
// Creative Tilt Justification:
// For the Programming portion of the creative tilt for our game we learned how to use the matter engine of Phaser
// instead of arcade. This was neccesary to our game design because we really wanted the player to be able to
// do sick flips. Because arcade is axis locked, we took it upon ourselves to learn matter instead and did 
// really cool rotation stuff which is mostly done in our Player.js.
//
// For the Visual Style portion of the creative tilt for our game we created a nice cyberpunk style and did something
// a little different from the normal endless runner. Instead of focusing on enemies and obstacles to halt the player
// like many runners, we leaned into allowing the player to worry less about obstacles and more about going as far as
// possible. This ties into how we tried to implement the infinite part of the infinite runner into our theme to 
// reflect the infinite city sprawl of a cyberpunk dystopia. We wanted the player to be unobstructed to reflect punk of
// cyberpunk.
//
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    autoCenter: true,
    scene: [ Menu, Play, End, Instructions, Credits ]
};

var platforms;
var player;
var grndcol;
var cam;
var grnd;
let platforms2;
let rmatter;
let platformMatter;
let battmatt;
let music;
let platformDist = 275;
let maxHeight = 20;

let barPos = [];
let score = 0;
let gameOverSound = true;

let spawnChances = [
    5, //ramps
    10,    //platforms
    7    //batteries
]
let playerSpeed = 10;

let batteryTime = 10; //in seconds how long each battery lasts
let batteryMax = 5; //max batteries you can have
let currBatteryLvl = batteryMax; //how many batteries to start with

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyA, keyD, keySpace, keyR, keyQ, keyC;