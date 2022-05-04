class Credits extends Phaser.Scene {
   constructor(){
       super("creditsScene");
   }

   preload() {
       // BG
       this.load.atlas('credits_atlas', './assets/credits.png', "./assets/creditshash1.json");
     }

   create() {
       // setup anim
       //battery animation
       this.anims.create({
         key:'creditsAnim',
         frames: this.anims.generateFrameNames('credits_atlas', {
             prefix: 'Comp 1_1',
             start: 0,
             end: 57,
             suffix: '',
             zeroPad: 4
         }),
         frameRate: 6,
      });

       //background creation
       this.creditsScreen = this.add.sprite(0, 0, 'Comp 1_10001').setOrigin(0, 0);
       this.creditsScreen.play('creditsAnim');
       let doSomething = () => {
         this.scene.start("endScene");
       }
       this.creditsScreen.on('animationcomplete', doSomething);
       
       
       
      
   }

   update() {
       
     }
}