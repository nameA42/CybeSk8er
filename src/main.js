let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, End, Instructions ]
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

let barPos = [];
let score;

let spawnChances = [
    10, //ramps
    10,    //platforms
    4    //batteries
]
let playerSpeed = 5;
let batteryTime = 3; //in seconds how long each battery lasts
let currBatteryLvl = 0; //how many batteries to start with

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyA, keyD, keySpace, keyR, keyQ, keyC;