class Platform extends Phaser.Physics.Matter.Image
{
    constructor(scene, x, y, texture, frame, options)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.isStatic = true;
        this.setIgnoreGravity(true);
        this.posX = x;
        this.posY = y;
    }

    update()
    {
        this.x += 1;
    }
    reset(playerY) {
        
    }
}