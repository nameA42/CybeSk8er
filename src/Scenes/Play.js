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
    }

    create() 
    {
        let rmatter = this.cache.json.get('rmatter')
        let pmatter = this.cache.json.get('pmatter')

        this.matter.world.setBounds(0, 0, 640, 480, 10, true, true, true, true);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.bgr = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);

        let grnd = this.matter.add.image(300, game.config.height - 15/2, 'flr', null, {restitution: 0, isStatic: true}).setScale(100,1);
        grnd.setBounce(0);

        ramp = new Ramp(this, 600, 480-15*1.5+1, 'ramp', 0, { shape: rmatter.rmptmp });
        player = new Player(this, 100, 100, 'player', 0, { shape: pmatter.playtmp });
        
        grndcol = player.setOnCollideWith(grnd, player.grounded);
    }

    update()
    {
        this.bgr.tilePositionX += 5;
        player.update();
        ramp.update();
    }
}