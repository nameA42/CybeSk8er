class Play extends Phaser.Scene 
{
    constructor()
    {
        super("playScene");
    }

    preload() 
    {
        this.load.image('player', './assets/playtmp.png');
        this.load.image('flr', './assets/flrtmp.png');
        this.load.image('bg', './assets/bgtmp.png');
        this.load.image('ramp', './assets/rmptmp.png');
    }

    create() 
    {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.bgr = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);

        var platforms = this.physics.add.staticGroup();
        platforms.create(300, game.config.height - 15/2, 'flr').setScale(100,1).refreshBody();

        ramp = new Ramp(this, 600, 480-15*1.5, 'ramp');
        player = new Player(this, 100, 100, 'player');
        
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, ramp, this.rampcol);

    }

    update()
    {
        this.bgr.tilePositionX += 5;
        player.update();
        ramp.update();
    }

    rampcol()
    {
        player.body.velocity.y -= 20;
        player.rampin();
    }

}