class Play extends Phaser.Scene 
{
    constructor()
    {
        super({ 
            key: 'playScene',
            physics: {
                default: 'matter',
                matter: {
                    debug: true,
                    gravity: { y : 1 }
                }
            }
        });
    }

    preload() 
    {
        this.load.image('player', './assets/playtmp.png');
        this.load.image('flr', './assets/flrtmp.png');
        this.load.image('bg', './assets/bgtmp.png');
        this.load.image('ramp', './assets/rmptmp.png');
        this.load.json('rmatter', './assets/RampMatter.json');
        this.load.json('pmatter', './assets/PlayerMatter.json');

        // loading kc
        this.load.image('kc0', './assets/kcgif-frames/pixil-frame-0.png');
        this.load.image('kc1', './assets/kcgif-frames/pixil-frame-1.png');
        this.load.image('kc2', './assets/kcgif-frames/pixil-frame-2.png');
        this.load.image('kc3', './assets/kcgif-frames/pixil-frame-3.png');
        this.load.image('kc4', './assets/kcgif-frames/pixil-frame-4.png');
        this.load.image('kc5', './assets/kcgif-frames/pixil-frame-5.png');
        this.load.image('kc6', './assets/kcgif-frames/pixil-frame-6.png');
        this.load.image('kc7', './assets/kcgif-frames/pixil-frame-7.png');
        this.load.image('kc8', './assets/kcgif-frames/pixil-frame-8.png');
        this.load.image('kc9', './assets/kcgif-frames/pixil-frame-9.png');
        this.load.image('kc10', './assets/kcgif-frames/pixil-frame-10.png');
        this.load.image('kc11', './assets/kcgif-frames/pixil-frame-11.png');
        this.load.image('kc12', './assets/kcgif-frames/pixil-frame-12.png');
        this.load.image('kc13', './assets/kcgif-frames/pixil-frame-13.png');
        this.load.image('kc14', './assets/kcgif-frames/pixil-frame-14.png');
        this.load.image('kc15', './assets/kcgif-frames/pixil-frame-15.png');
        this.load.image('kc16', './assets/kcgif-frames/pixil-frame-16.png');
        this.load.image('kc17', './assets/kcgif-frames/pixil-frame-17.png');
        this.load.image('kc18', './assets/kcgif-frames/pixil-frame-18.png');
        this.load.image('kc19', './assets/kcgif-frames/pixil-frame-19.png');
        this.load.image('kc20', './assets/kcgif-frames/pixil-frame-20.png');
        this.load.image('kc21', './assets/kcgif-frames/pixil-frame-21.png');
        this.load.image('kc22', './assets/kcgif-frames/pixil-frame-22.png');
        this.load.image('kc23', './assets/kcgif-frames/pixil-frame-23.png');
        this.load.image('kc24', './assets/kcgif-frames/pixil-frame-24.png');
        this.load.image('kc25', './assets/kcgif-frames/pixil-frame-25.png');
    }

    create() 
    {
        cam = this.cameras.main
        let rmatter = this.cache.json.get('rmatter')
        let pmatter = this.cache.json.get('pmatter')

        this.matter.world.setBounds(0, 0, 2000, 480, 10, true, true, true, true);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create(
            {
                key: 'kc',
                frames: [
                    {key: 'kc0'},
                    {key: 'kc1'},
                    {key: 'kc2'},
                    {key: 'kc3'},
                    {key: 'kc4'},
                    {key: 'kc5'},
                    {key: 'kc6'},
                    {key: 'kc7'},
                    {key: 'kc8'},
                    {key: 'kc9'},
                    {key: 'kc10'},
                    {key: 'kc11'},
                    {key: 'kc12'},
                    {key: 'kc13'},
                    {key: 'kc14'},
                    {key: 'kc15'},
                    {key: 'kc16'},
                    {key: 'kc17'},
                    {key: 'kc18'},
                    {key: 'kc19'},
                    {key: 'kc20'},
                    {key: 'kc21'},
                    {key: 'kc22'},
                    {key: 'kc23'},
                    {key: 'kc24'},
                    {key: 'kc25', duration: 50}
                ],
                frameRate: 5,
                repeat: -1
            }
        );

        this.bgr = this.add.tileSprite(0, 0, 1200, 480, 'bg').setOrigin(0, 0);

        grnd = this.matter.add.image(300, game.config.height - 15/2, 'flr', null, {restitution: 0, isStatic: true, label: "flr"}).setScale(100,1);
        grnd.setBounce(0);

        ramp = new Ramp(this, 600, 480-15*1.5+1.5, 'ramp', null, { shape: rmatter.rmptmp});
        ramp = new Ramp(this, 1000, 480-15*1.5+1.5, 'ramp', null, { shape: rmatter.rmptmp});
        ramp = new Ramp(this, 1500, 480-15*1.5+1.5, 'ramp', null, { shape: rmatter.rmptmp});
        player = new Player(this, 100, 100, 'kc0', 1, { shape: pmatter.playtmp, render: {sprite: {xOffset: 0.2, yOffset: 1} } }).play('kc');

        this.matter.world.on("collisionactive", (event, bodyA, bodyB) =>
        {
            if((bodyA.label == "player" && (bodyB.label == "ramp" || bodyB.label == "flr")) || (bodyB.label == "player" && (bodyA.label == "ramp" || bodyA.label == "flr")))
            {
                player.grounded();
            }
        })
    }

    update()
    {
        this.bgr.tilePositionX += 1;
        this.bgr.x = player.x - this.bgr.width/2;
        player.update();
        ramp.update();
        cam.centerOn(player.x, 240);
        grnd.x = player.x;
        player.x += 2;
    }
}