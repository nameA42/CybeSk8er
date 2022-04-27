class Platform extends Phaser.Physics.Matter.Image
{
    constructor(scene, x, y, texture, frame, options, bottom)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.isStatic = true;
        this.setIgnoreGravity(true);
        this.posX = x;
        this.posY = y;
        this.bottom = bottom;
    }

    update(py, px)
    {
        if(py > this.y - 12)
        {
            this.setCollisionCategory(2);
            //console.log(2);
        }
        else if(px < this.x - 100)
        {
            this.setCollisionCategory(2);
        }
        else
        {
            this.setCollisionCategory(1);
        }
    }
    reset(playerY) {
        
    }

    active() {

    }
    deactive() {

    }
}