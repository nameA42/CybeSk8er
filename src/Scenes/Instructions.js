class Instructions extends Phaser.Scene {
    constructor(){
        super("instructionsScene");
    }

    preload() {
        // BG
        this.load.image('instruct', './assets/instructionscreen.png');
      }

    create() {
        // define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: '26px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //background creation
        this.instruct = this.add.tileSprite(0, 0, 1000, 1000, 'instruct').setOrigin(0, 0);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start("playScene");
        }
      }
}