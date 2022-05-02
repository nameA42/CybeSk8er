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
        this.load.image('ramp1', './assets/ramp1.png');
        this.load.image('ramp2', './assets/ramp2.png');
        //this.load.image('battery', './assets/battery.png');
        this.load.image('platform', './assets/platform.png');
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

        this.load.atlas('battery_atlas', './assets/battery.png', "./assets/battery.json");
    
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
        rmatter = this.cache.json.get('rmatter');
        let pmatter = this.cache.json.get('pmatter');
        platformMatter = this.cache.json.get('platformMatter');
        battmatt = this.cache.json.get('battmatt');

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
        player = new Player(this, 100, 100, 'kc0', null, 
        { 
            shape: pmatter.PPLAYER, 
        })
        player.play('kc');
        this.pa = 0.0007
        this.pforpos = new Phaser.Math.Vector2(0, 0);
        this.pforce = new Phaser.Math.Vector2(this.pa*Math.cos(player.rotation),this.pa*Math.sin(player.rotation));

        //score
        let scrConfig = {
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
        this.scr = this.add.text(cam.scrollX + cam.width-40, cam.scrollY - 50, 0, scrConfig);

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
        //battery collision
        this.matter.world.on("collisionstart", (event, bodyA, bodyB) =>
            {
                if(bodyA.label == "playersense" && bodyB.label == "bat")
                {
                    currBatteryLvl += 1;
                }
                if(bodyB.label == "playersense" && bodyA.label == "bat")
                {
                    currBatteryLvl += 1;
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
        if(currBatteryLvl > 6) 
        {
            currBatteryLvl = 6;
        }
        //update bar position
        barPos = [player.x-350, player.y-350];
        this.batteryBar.update();
        
        //scoreup
        this.scr.x = cam.scrollX + cam.width-40;
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
        let platformDist = 275;
        this.currPlatformHeight = 475 - platformDist * ((Math.floor((player.y - 461) / platformDist) * (-1))+ 1);
        let resetPoint = player.x - 400;
        for(let i = 0; i < platforms2.length; i++)  
        {
            if(platforms2[i].x < resetPoint) 
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

        //center the cam on the player
        cam.centerOn(player.x, player.y-player.height);
        //move ground under player
        grnd.x = player.x;

        //move player
        if(player.onground)
        {
            player.thrust(this.pa);
        }

        //give player some upward thrust
        if(player.rotation < Math.PI/2 && player.rotation > -Math.PI/12)
        {
            player.thrustLeft(0.0008);
            //console.log(player.rotation);
        }    

        //set max velocity
        if(player.body.velocity.x > playerSpeed)
        {
            console.log(player.body.velocity.x);
            player.setVelocityX(playerSpeed);
        }
        //update world bounds
        this.recentx = Math.max(player.x- 310, this.recentx);
        this.matter.world.setBounds(this.recentx, player.y- 400, 620, 480, 10, true, true, true, true);
    }

    //ticks down the battery bar
    barTick(){
        currBatteryLvl -= 1;
        console.log("Bar is at: " + (currBatteryLvl - 1));
        this.batteryBar.update();
        if(currBatteryLvl == 0){
            this.scene.start("endScene");
        }
    }
}