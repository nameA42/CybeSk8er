class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
      }

    create() {
        // define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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

        //write
        this.add.text(game.config.width/2, game.config.height/2 - 2*20 - 2*20, '(:)', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 20 - 20, 'TMP MENU (:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'use A and D keys to Rotate/Jump', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FF0000';
        menuConfig.color = '#000';

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("playScene");
        }
      }
}