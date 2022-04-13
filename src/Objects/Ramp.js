class Ramp extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.body.allowGravity = false;
        this.plcX = x;
    }

    update()
    {
        if(this.x < 0) 
        {
            this.x = this.plcX;
        }
        else
        {
            this.x -= 10;
        }
    }
}