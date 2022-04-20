class Player extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y, texture, frame, options)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.ms = 10;
        this.initx = x;
        this.ljumpcount = 0;
        this.rjumpcount = 0;
        this.setBounce(0);
        this.inramp = 0;
        this.onground = false;
    }
    
    update()
    {
        if(this.onground)
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
        this.x = this.initx;
    }

    grounded()
    {
        this.bodyA.onground = true;
    }
}