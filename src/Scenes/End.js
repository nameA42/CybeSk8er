class End extends Phaser.Scene {
   constructor(){
       super("endScene");
   }

   preload() {
       // BG
       this.load.image('endscreen', './assets/endscreen.png');
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
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
       keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

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
       this.endscreen = this.add.tileSprite(0, 0, 1000, 1000, 'endscreen').setOrigin(0, 0);


       //write
       this.add.text(game.config.width/2, game.config.height/2, "Score: " + score, menuConfig).setOrigin(0.5);
       menuConfig.backgroundColor = '#FF0000';
       menuConfig.color = '#000';

      
   }
   update() {
       if (Phaser.Input.Keyboard.JustDown(keyR)) {
           currBatteryLvl = 6;
           this.scene.start("playScene");
       }
       if (Phaser.Input.Keyboard.JustDown(keyQ)) {
        currBatteryLvl = 6;
        this.scene.start("menuScene");
       }
       if (Phaser.Input.Keyboard.JustDown(keyC)) {
        currBatteryLvl = 6;
        this.scene.start("instructionsScene");
       }
     }
}