class Player extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y, texture, frame, options)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.ms = 10;
        this.ljumpcount = 0;
        this.rjumpcount = 0;
        this.setBounce(0);
        this.inramp = 0;
        this.onground = false;
        this.groundcd = 0;
        this.rcd = 0;
        score = 0;
        this.flp = 0;
        this.body.mass = 1;
        this.body.centerOfMass = this.body.parts[1].centerOfMass;
    }
    
    update()
    {
        //create a function to return to idle
        let endAnim = () => {
            this.play('KCIDLE');
        }
        if(this.rotation >= 3.00 || this.rotation <= -3.00)
        {
            //console.log(this.rotation);
            this.flp = 1;
        }
        if(this.rotation <= 0.5 && this.rotation >= -0.5 && this.flp == 1)
        {
            this.flp = 0;
            score += 20;
        }
        if(this.onground && this.groundcd <= 0)
        {
            //if A is down charge the left foot
            if((keyA.isDown) && (this.ljumpcount < 100))
            {
                this.ljumpcount += 10;
                this.play('KCLEAN');
            }
            //if D is down charge the left foot
            if((keyD.isDown) && (this.rjumpcount < 100))
            {
                this.rjumpcount += 10;
                this.play('KCLEAN');
            }
            //if either key is released jump
            if((Phaser.Input.Keyboard.JustUp(keyD)) || Phaser.Input.Keyboard.JustUp(keyA))
            {
                this.setVelocityY(this.body.velocity.y-2/50*(this.ljumpcount + this.rjumpcount));
                this.ljumpcount = 0;
                this.rjumpcount = 0;
                this.onground = false;
                //play jump animation and sound
                this.scene.sound.play('jumpCharge1');
                this.play('KCJUMP');
                this.on('animationcomplete', endAnim);
            }
        }
        else if(this.groundcd <= 0)
        {
            if((keyD.isDown))
            {
                this.rotation += 0.1;
            }
            if((keyA.isDown))
            {
                this.rotation -= 0.1;
            }
        }
        if(this.body.velocity.x <= 0 && this.rcd <= 0)
        {
            this.body.velocity.x = 1;
            this.y -= 10;
            this.rotation = 0;
            this.rcd = 100;
            score -= 10;
            this.flp = 0;
        }
        this.groundcd = Math.max(this.groundcd - 1, 0);
        this.rcd -= 1;
        //console.log(this.body.velocity.x);
    }

    grounded()
    {
        if(!this.onground)
        {
            this.groundcd = 10;
        }
        this.onground = true;
    }
}