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
    }
    
    update()
    {
        if(this.onground && this.groundcd == 0)
        {
            if((keyA.isDown) && (this.ljumpcount < 100))
            {
                this.ljumpcount += 10;
            }
            if((keyD.isDown) && (this.rjumpcount < 100))
            {
                this.rjumpcount += 10;
            }
            if((Phaser.Input.Keyboard.JustUp(keyD)) || Phaser.Input.Keyboard.JustUp(keyA))
            {
                this.setVelocityY(this.body.velocity.y-2/50*(this.ljumpcount + this.rjumpcount));
                this.ljumpcount = 0;
                this.rjumpcount = 0;
                this.onground = false;
            }
        }
        else if(this.groundcd == 0)
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
        this.groundcd = Math.max(this.groundcd - 1, 0);
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