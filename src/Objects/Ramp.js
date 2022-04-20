class Ramp extends Phaser.Physics.Matter.Image
{
    constructor(scene, x, y, texture, frame, options)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.isStatic = true;
        this.setIgnoreGravity(true);
        this.plcX = x;
    }

    update()
    {
        if(this.x == this.width) 
        {
            this.x = this.plcX;
        }
        else
        {
            this.x -= 2;
        }
        this.rotation = 0;
    }
}