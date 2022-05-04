let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
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
let maxHeight = 3;

let barPos = [];
let score = 0;
let gameOverSound = true;

let spawnChances = [
    10, //ramps
    10,    //platforms
    4    //batteries
]
let playerSpeed = 15;

let batteryTime = 300; //in seconds how long each battery lasts
let batteryMax = 5; //max batteries you can have
let currBatteryLvl = batteryMax; //how many batteries to start with

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyA, keyD, keySpace, keyR, keyQ, keyC;