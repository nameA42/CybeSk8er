class End extends Phaser.Scene {
   constructor(){
       super("endScene");
   }

   preload() {
       // BG
       this.load.image('front', './assets/front.png');
       this.load.image('bg', './assets/bg.png');
       this.load.image('next1', './assets/next1.png');
       this.load.image('next2', './assets/next2.png');
       this.load.image('next3', './assets/next3.png');
     }

   create() {
       //switch music
       this.sound.stopAll();
       music = this.sound.add('menumusic',
            {
                loop: true
            }
        );
        this.sound.play('gameOver');
       music.play();
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
       //background creation
       this.bgr = this.add.tileSprite(0, 0, 1000, 1000, 'bg').setOrigin(0, 0);
       this.next1 = this.add.tileSprite(0, 0, 1000, 1000, 'next3').setOrigin(0, 0);
       this.next2 = this.add.tileSprite(0, 0, 1000, 1000, 'next2').setOrigin(0, 0);
       this.next3 = this.add.tileSprite(0, 0, 1000, 1000, 'next1').setOrigin(0, 0);
       this.front = this.add.tileSprite(0, 0, 1000, 1000, 'front').setOrigin(0, 0);

       //write
       this.add.text(game.config.width/2, game.config.height/2 - 40, 'Game Over', menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2, "Score: " + score, menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2 + 40, 'Press A to Play Again', menuConfig).setOrigin(0.5);
       menuConfig.backgroundColor = '#FF0000';
       menuConfig.color = '#000';

      
   }
   update() {
       if (Phaser.Input.Keyboard.JustDown(keyA)) {
           currBatteryLvl = 6;
           this.scene.start("playScene");
       }
     }
}