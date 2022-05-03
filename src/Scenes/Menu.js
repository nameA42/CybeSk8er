class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // BG
        this.load.image('menu', './assets/titlesmall.png');
        this.load.audio('menumusic', 'assets/menumusic.mp3');
      }

    create() {
        // define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        music = this.sound.add('menumusic', 
            {
                loop: true
            }
        );
        music.play();

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
        this.menu = this.add.tileSprite(0, 0, 1000, 1000, 'menu').setOrigin(0, 0);
        

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start("instructionsScene");
        }
      }
}