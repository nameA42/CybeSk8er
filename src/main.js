let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
};

var platforms;
var player;
var grndcol;
var cam;
var grnd;
let platforms2;
let rmatter;

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyA, keyD;