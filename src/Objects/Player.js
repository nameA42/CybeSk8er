class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.ms = 10;
        this.setGravity(0, 300);
        this.ljumpcount = 0;
        this.rjumpcount = 0;
        this.setBounce(0);
    }
    
    update()
    {
        if(this.body.touching.down)
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
                this.setVelocityY(-2*(this.ljumpcount + this.rjumpcount));
                this.ljumpcount = 0;
                this.rjumpcount = 0;
            }
        }
    }
}