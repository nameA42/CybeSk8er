class Logo extends Phaser.Scene {
    constructor(){
        super("LogoScene");
    }

    preload() {
        // BG
        this.load.image('Logo', './assets/DFSTITLE.png');
      }

    create() {
        this.ca = this.cameras.main;
        //background creation
        this.logo = this.add.tileSprite(0, 0, 1000, 1000, 'Logo').setOrigin(0, 0);
        this.ca.once('camerafadeincomplete', 
        (camera) => 
            {
                this.time.addEvent(
                    {
                        delay: 1000,
                        callback: () => {
                            camera.fadeOut(3000);
                        },
                        repeat: 0
                    }
                )
            }
        )
        this.ca.once('camerafadeoutcomplete',
        () =>
            {
                this.scene.start("menuScene");
            }
        )
        this.ca.fadeIn(3000);
    }
}