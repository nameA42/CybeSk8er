class BatteryBar extends Phaser.Physics.Matter.Image
{
    constructor(scene, x, y, texture, frame, options, number)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.isStatic = true;
        this.setIgnoreGravity(true);
        this.healthNum = number;
        this.child = null;
        this.texture = texture;
        this.scene = scene;
    }

    
    update()
    {
      
      //spawns a new child element of the bar if the helth is greater than 
      //the current element and there isnt already one spawned
      if(this.child == null && this.healthNum < currBatteryLvl) 
      {
         this.child = new BatteryBar(this.scene, this.x + 30, this.y, this.texture, null, {}, this.healthNum + 1);
      }
      else if(this.child != null && this.healthNum >= currBatteryLvl)
      {
         this.child.destroy();
         this.child = null;
      }
      else if(this.child != null)
      {
         this.child.update();
      }

      

      //update based on barPos
      this.x = barPos[0];
      this.y = barPos[1];
      barPos[0] += 30;

      //console.log("bar " + this.healthNum + "is at " + this.x + "," + this.y);
    }

}