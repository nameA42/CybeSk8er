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
        //load assets
        this.load.image('player', './assets/playtmp.png');
        this.load.image('flr', './assets/flrtmp.png');
        this.load.image('ramp', './assets/rmptmp.png');
        this.load.image('platform', './assets/platform.png');
        this.load.json('rmatter', './assets/RampMatter.json');
        this.load.json('pmatter', './assets/PlayerMatter.json');
        this.load.json('platformMatter', './assets/PlatformMatter.json');

        // BG
        this.load.image('front', './assets/front.png');
        this.load.image('bg', './assets/bg.png');
        this.load.image('next1', './assets/next1.png');
        this.load.image('next2', './assets/next2.png');
        this.load.image('next3', './assets/next3.png');

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
        //add camera
        cam = this.cameras.main;

        //get Hitbox Cached shapes
        let rmatter = this.cache.json.get('rmatter');
        let pmatter = this.cache.json.get('pmatter');
        let platformMatter = this.cache.json.get('platformMatter');

        //make world
        this.matter.world.setBounds(0, 0, 200000, 480, 10, true, true, true, true);

        //key def
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //player anim
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

        //background creation
        this.bgr = this.add.tileSprite(0, 0, 1000, 1000, 'bg').setOrigin(0, 0);
        this.next1 = this.add.tileSprite(0, 0, 1000, 1000, 'next3').setOrigin(0, 0);
        this.next2 = this.add.tileSprite(0, 0, 1000, 1000, 'next2').setOrigin(0, 0);
        this.next3 = this.add.tileSprite(0, 0, 1000, 1000, 'next1').setOrigin(0, 0);
        this.front = this.add.tileSprite(0, 0, 1000, 1000, 'front').setOrigin(0, 0);

        //ground creation
        grnd = this.matter.add.image(300, game.config.height - 15/2, 'flr', null, {restitution: 0, isStatic: true, label: "flr", frictionStatic: 0, friction: 0}).setScale(100,1);
        grnd.setBounce(0);
        
        //multisegmented platform
        let platformX = 1300;
        let platformY = 350;
        platform1 = new Platform(this, platformX, platformY, 'platform', null, {shape: platformMatter.platform});
        platform2 = new Platform(this, platformX + 200, platformY, 'platform', null, {shape: platformMatter.platform});
        platform3 = new Platform(this, platformX + 400, platformY, 'platform', null, {shape: platformMatter.platform});
        platform4 = new Platform(this, platformX + 600, platformY, 'platform', null, {shape: platformMatter.platform});
        platform5 = new Platform(this, platformX + 800, platformY, 'platform', null, {shape: platformMatter.platform});

        //ramp creation
        ramp = new Ramp(this, 600, 480-15*1.5+1.5, 'ramp', null, { shape: rmatter.rmptmp});
        ramp = new Ramp(this, 1000, 480-15*1.5+1.5, 'ramp', null, { shape: rmatter.rmptmp});
        ramp = new Ramp(this, 1500, 480-15*1.5+1.5, 'ramp', null, { shape: rmatter.rmptmp});
        
        //player creation
        player = new Player(this, 100, 100, 'kc0', null, 
        { 
            shape: pmatter.PPLAYER, 
        })
        player.play('kc');

        //check if player is on the ground
        this.matter.world.on("collisionactive", (event, bodyA, bodyB) =>
        {
            if((bodyA.label == "player" && (bodyB.label == "ngc" || bodyB.label == "flr")) || (bodyB.label == "player" && (bodyA.label == "ngc" || bodyA.label == "flr")))
            {
                player.grounded();
            }
        })

        //check if player off ground
        this.matter.world.on("collisionend", (event, bodyA, bodyB) =>
        {
            if((bodyA.label == "player" && (bodyB.label == "ngc" || bodyB.label == "flr")) || (bodyB.label == "player" && (bodyA.label == "ngc" || bodyA.label == "flr")))
            {
                this.time.addEvent(
                    {
                        delay: 900,
                        callback: () => {player.onground = false;
                            //console.log(player.rotation);
                        },
                        repeat: 0
                    }
                )
            }
        })
    }

    update()
    {
        //update tile scroll
        this.bgr.tilePositionX += 0;  // update tile sprite
        this.front.tilePositionX += 3*player.body.velocity.x;  // update tile sprite
        this.next1.tilePositionX += 0.5*player.body.velocity.x;  // update tile sprite
        this.next2.tilePositionX += 1*player.body.velocity.x;  // update tile sprite
        this.next3.tilePositionX += 2*player.body.velocity.x;  // update tile sprite
        
        //update tile positioning
        this.bgr.x = player.x - this.bgr.width/2;
        this.front.x = player.x - this.front.width/2;
        this.next1.x = player.x - this.next1.width/2;
        this.next2.x = player.x - this.next2.width/2;
        this.next3.x = player.x - this.next3.width/2;

        //update game objects
        player.update();
        ramp.update();

        //update platforms with playery
        platform1.update(player.y);
        platform2.update(player.y);
        platform3.update(player.y);
        platform4.update(player.y);
        platform5.update(player.y);

        //if the platform goes too far come back
        let currPlatformHeight = 350;
        let resetPoint = player.x - 400;
        if(platform1.x < resetPoint) 
        {   
            platform1.x += 800;
            platform1.y = currPlatformHeight;
        }
        if(platform2.x < resetPoint) 
        {
            platform2.x += 800;
            platform2.y = currPlatformHeight;
        }
        if(platform3.x < resetPoint) 
        {
            platform3.x += 800;
            platform3.y = currPlatformHeight;
        }
        if(platform4.x < resetPoint) 
        {
            platform4.x += 800;
            platform4.y = currPlatformHeight;
        }
        if(platform5.x < resetPoint) 
        {
            platform5.x += 800;
            platform5.y = currPlatformHeight;
        }

        //center the cam on the player
        cam.centerOn(player.x, 240);

        //move ground under player
        grnd.x = player.x;

        //move player
        if(player.onground)
        {
            player.thrustBack(-0.00037);
        }

        //give player some upward thrust
        if(player.rotation < Math.PI/2 && player.rotation > -Math.PI/6)
        {
            player.thrustLeft(0.0002);
            //console.log(player.rotation);
        }    

        //set max velocity
        if(player.body.velocity.x > 15)
        {
            //console.log(player.body.velocity.x);
            player.setVelocityX(15);
        }

        //update world bounds
        this.matter.world.setBounds(Math.max(player.x- 310, 0), 0, 620, 480, 10, true, true, true, true);
    }
}