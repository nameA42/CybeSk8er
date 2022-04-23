let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Play ]
}

var platforms
var player
var ramp
var grndcol
var cam
var grnd
let platform1;
let platform2;
let platform3;
let platform4;
let platform5;

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyA, keyD;