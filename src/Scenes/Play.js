class Play extends Phaser.Scene 
{
    constructor()
    {
        super({ 
            key: 'playScene',
            physics: {
                default: 'matter',
                matter: {
                    debug: false,
                    gravity: { y : 1 },
                    fps: 60
                }
            }
        });
    }

    preload() 
    {   
        //load audio
        this.load.audio('playmusic', 'assets/newsynth.mp3');
        this.load.audio('fuelPickup', 'assets/sfx/fuel_pickup.wav');
        this.load.audio('idleBoard', 'assets/sfx/idle_board.mp3');
        this.load.audio('jumpCharge1', 'assets/sfx/jump_charging.mp3');
        this.load.audio('jumpCharge2', 'assets/sfx/jump_charge2.wav');
        this.load.audio('jumpCharge3', 'assets/sfx/jump_charge3.mp3');
        this.load.audio('thrusterBoost', 'assets/sfx/thruster_boost.mp3');
        this.load.audio('fuelPickup2', 'assets/sfx/fuel_pickup2.wav');
        this.load.audio('gameOver', 'assets/sfx/game_over.mp3');
        //load assets
        this.load.image('player', './assets/playtmp.png');
        this.load.image('flr', './assets/flrtmp.png');
        this.load.image('ramp1', './assets/ramp1.png');
        this.load.image('ramp2', './assets/ramp2.png');
        //this.load.image('battery', './assets/battery.png');
        this.load.image('platform', './assets/pipegrime.png');
        this.load.json('rmatter', './assets/RampMatter.json');
        this.load.json('pmatter', './assets/PlayerMatter.json');
        this.load.json('platformMatter', './assets/PlatformMatter.json');
        this.load.json('battmatt', './assets/BatteryMatter.json');

        // BG
        this.load.image('front', './assets/front.png');
        this.load.image('bg', './assets/bg.png');
        this.load.image('next1', './assets/next1.png');
        this.load.image('next2', './assets/next2.png');
        this.load.image('next3', './assets/next3.png');

        this.load.atlas('kc_atlas', './assets/KCANIM.png', "./assets/KCANIMHASH.json");
        this.load.atlas('battery_atlas', './assets/battery.png', "./assets/battery.json");
    }

    create() 
    {
        this.stopo = 0;
        //change music
        this.sound.stopAll();
        music = this.sound.play('playmusic',
            {
                loop: true,
                volume: 0.5
            }
        );
        // this.sound.play('idleBoard',
        //     {
        //         loop: true
        //     }
        // );
        //add camera
        cam = this.cameras.main;
        
        //get Hitbox Cached shapes
        rmatter = this.cache.json.get('rmatter');
        let pmatter = this.cache.json.get('pmatter');
        platformMatter = this.cache.json.get('platformMatter');
        battmatt = this.cache.json.get('battmatt');

        //make world
        this.matter.world.setBounds(0, 0, 200000, 480, 10, true, true, true, true);

        //key def
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        //player animation
        this.anims.create({
            key:'KCIDLE',
            frames: this.anims.generateFrameNames('kc_atlas', {
                prefix: 'KCIDLE',
                start: 0,
                end: 14,
                suffix: '',
                zeroPad: 1
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key:'KCJUMP',
            frames: this.anims.generateFrameNames('kc_atlas', {
                prefix: 'KCJUMP',
                start: 1,
                end: 19,
                suffix: '',
                zeroPad: 1
            }),
            frameRate: 15
        });
        this.anims.create({
            key:'KCLEAN',
            frames: this.anims.generateFrameNames('kc_atlas', {
                prefix: 'KCLEAN',
                start: 0,
                end: 9,
                suffix: '',
                zeroPad: 1
            }),
            frameRate: 5,
            repeat: -1
        });


        //background creation
        this.bgr = this.add.tileSprite(0, 0, 1000, 1000, 'bg').setOrigin(0, 0);
        this.next1 = this.add.tileSprite(0, 0, 1000, 1000, 'next3').setOrigin(0, 0);
        this.next2 = this.add.tileSprite(0, 0, 1000, 1000, 'next2').setOrigin(0, 0);
        this.next3 = this.add.tileSprite(0, 0, 1000, 1000, 'next1').setOrigin(0, 0);
        this.front = this.add.tileSprite(0, 0, 1000, 1000, 'front').setOrigin(0, 0);

        //ground creation
        grnd = this.matter.add.image(300, game.config.height - 15/2, 'flr', null, {restitution: 0, isStatic: true, label: "flr", frictionStatic: 0, friction: 0}).setScale(100,1);
        grnd.setBounce(0);
        
        //worldbound tracking
        this.recentx = 0;

        //multisegmented platform
        let platformX = 0;
        let platformY = 200;
        platforms2 = [
            new Platform(this, platformX, platformY, 'platform', null, {shape: platformMatter.platform}),
            new Platform(this, platformX + 200, platformY, 'platform', null, {shape: platformMatter.platform}),
            new Platform(this, platformX + 400, platformY, 'platform', null, {shape: platformMatter.platform}),
            new Platform(this, platformX + 600, platformY, 'platform', null, {shape: platformMatter.platform}),
            new Platform(this, platformX + 800, platformY, 'platform', null, {shape: platformMatter.platform}),
            new Platform(this, platformX, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 200, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 400, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 600, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 800, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 200, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 400, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 600, 480-5, 'platform', null, {shape: platformMatter.platform}, true),
            new Platform(this, platformX + 800, 480-5, 'platform', null, {shape: platformMatter.platform}, true)
        ];
        
        //player creation
        player = new Player(this, 100, 100, 'kc_atlas', null, 
        { 
            shape: pmatter.PPLAYER
        })
        player.play('KCIDLE');
        this.pa = 0.0007
        this.pforpos = new Phaser.Math.Vector2(0, 0);
        this.pforce = new Phaser.Math.Vector2(this.pa*Math.cos(player.rotation),this.pa*Math.sin(player.rotation));

        //score
        let scrConfig = {
            fontFamily: "Courier",
            fontSize: '32px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.SPIN = this.add.text(-10000, 10000, "!!!SPIN!!!", scrConfig).setOrigin(0.5);
        this.scr = this.add.text(cam.scrollX + cam.width-100, cam.scrollY - 50, 0, scrConfig);

        //battery animation
        this.anims.create({
            key:'battery',
            frames: this.anims.generateFrameNames('battery_atlas', {
                prefix: 'battery',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1
        });

        //battery bar
        barPos = [player.x+100, player.y+100];
        this.batteryBar = new BatteryBar(this, barPos[0], barPos[1], 'battery0001', null, {shape: battmatt.batterybox}, 0);
        this.batteryBar.setScale(.2);
        this.batteryBar.play('battery');
        this.barUpdate = this.time.addEvent({delay:(batteryTime * 1000), callback: this.barTick, callbackScope: this, loop:true});

        //check if player is on the ground
        this.matter.world.on("collisionactive", (event, bodyA, bodyB) =>
        {
            if((bodyA.label == "player" && bodyB.label == "flr") || (bodyB.label == "player" && bodyA.label == "flr"))
            {
                player.grounded();
                this.pa = 0.0007;
            }
            if((bodyA.label == "player" && bodyB.label == "ngc") || (bodyB.label == "player" && bodyA.label == "ngc"))
            {
                player.grounded();
                this.pa = 0.0015;
            }
        })

        //check if player off ground
        this.matter.world.on("collisionend", (event, bodyA, bodyB) =>
        {
            if((bodyA.label == "player" && (bodyB.label == "ngc" || bodyB.label == "flr")) || (bodyB.label == "player" && (bodyA.label == "ngc" || bodyA.label == "flr")))
            {
                this.time.addEvent(
                    {
                        delay: 300,
                        callback: () => {player.onground = false;
                            //console.log(player.rotation);
                        },
                        repeat: 0
                    }
                )
            }
        })
        //battery collision
        this.matter.world.on("collisionstart", (event, bodyA, bodyB) =>
            {
                if(bodyA.label == "playersense" && bodyB.label == "bat")
                {
                    currBatteryLvl += 1;
                    bodyB.gameObject.destroy();
                    this.sound.play('fuelPickup2',
                        {
                            volume: 0.3
                        }
                    );
                }
                if(bodyB.label == "playersense" && bodyA.label == "bat")
                {
                    currBatteryLvl += 1;
                    bodyA.gameObject.destroy();
                    this.sound.play('fuelPickup2',);
                }
                //console.log(bodyB.label);
                //console.log(bodyA.label);
            }
        )
        this.currPlatformHeight = 350;
    }

    update()
    {   
        //enforce bar max
        if(currBatteryLvl > batteryMax) 
        {
            currBatteryLvl = batteryMax;
        }
        //update bar position
        barPos = [player.x-350, player.y-350];
        this.batteryBar.update();
        
        //scoreup
        this.scr.x = cam.scrollX + cam.width-100;
        this.scr.y = cam.scrollY;
        this.scr.text = score;

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

        //move the background up and down with the player
        this.bgr.y = player.y - this.bgr.height/2;
        this.front.y = player.y - this.front.height/2;
        this.next1.y = player.y - this.next1.height/2;
        this.next2.y = player.y - this.next2.height/2;
        this.next3.y = player.y - this.next3.height/2;

        //update game objects
        player.update();

        //update platforms with playery
        for(let i = 0; i < platforms2.length; i++) 
        {
            platforms2[i].update(player.y, player.x);
            if(platforms2[i].spawnedP)
            {
                platforms2[i].spawnedItem.update(player.y, player.x);
            }
        }

        //if the platform goes too far come back
        //calculate the current height of the top platform
        this.currPlatformHeight = 475 - platformDist * ((Math.floor((player.y - 461) / platformDist) * (-1))+ 1);
        let resetPoint = player.x - 400;
        for(let i = 0; i < platforms2.length; i++)  
        {
            if(platforms2[i].x < resetPoint && this.stopo == 0) 
            {
                this.add.image(platforms2[i].x, platforms2[i].y, 'platform');
                //set the spawned item to null to ensure that a new item is spawned
                platforms2[i].spawnedItem = null;
                platforms2[i].x += 800;
                if(i < 5) 
                {
                    platforms2[i].y = this.currPlatformHeight;
                } 
                else if (i < 10) 
                {
                    platforms2[i].y = this.currPlatformHeight + platformDist;
                }
                else
                {
                    platforms2[i].y = this.currPlatformHeight + platformDist*2;
                }
                
            }
        }

        if(player.y <= (-1) * (platformDist*maxHeight) && player.onground && this.stopo == 0)
        {
            this.stopo = 1;
        }
        if(this.stopo == 1)
        {
            this.stopo = 2;
            let rom = new Ramp(this, player.x + 1000, player.y, 'ramp1', null, { shape: rmatter.rmptmp}).setScale(10);
            rom.x = player.x + rom.width+600;
            rom.y = player.y - rom.height;
        }
        if(this.stopo == 2)
        {
            this.SPIN.x = cam.scrollX + cam.width/2;
            this.SPIN.y = cam.scrollY + cam.height/2;
        }
        //if(this.stopo == 2)
        //{
        //    cam.pan(player.x / 2, player.y / 2, Math.sqrt(2*platformDist*maxHeight)*1000/60);
        //    cam.zoomTo(480/(platformDist*maxHeight), Math.sqrt(2*platformDist*maxHeight)*1000/60);
        //    this.stopo = 3;
        //}
        //center the cam on the player
        //if(this.stopo < 2)
        //{
        cam.centerOn(player.x, player.y-player.height);
        //}
        if(player.y >= game.config.height - 60)
        {
            this.scene.start("playScene");
        }
        //move ground under player
        grnd.x = player.x;

        //move player
        if(player.onground)
        {
            player.thrust(this.pa);
        }

        //give player some upward thrust
        if(player.rotation < Math.PI/2 && player.rotation > -Math.PI/3)
        {
            player.thrustLeft(0.0008);
            //console.log(player.rotation);
        }    

        //set max velocity
        if(player.body.velocity.x > playerSpeed)
        {
            //console.log(player.body.velocity.x);
            player.setVelocityX(playerSpeed);
        }
        //update world bounds
        this.recentx = Math.max(player.x- 310, this.recentx);
        this.matter.world.setBounds(this.recentx, player.y- 400, 620, 480, 10, true, true, true, true);
    }

    //ticks down the battery bar
    barTick(){
        currBatteryLvl -= 1;
        //console.log("Bar is at: " + (currBatteryLvl - 1));
        this.batteryBar.update();
        if(currBatteryLvl < 0){
            this.scene.start("endScene");
        }
    }
}