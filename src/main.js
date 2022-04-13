let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 100 }
        }
    },
    scene: [ Play ]
}

var platforms
var player
var ramp

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyA, keyD;