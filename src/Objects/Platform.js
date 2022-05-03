class Platform extends Phaser.Physics.Matter.Image
{
    constructor(scene, x, y, texture, frame, options, spawner=true)
    {
        super(scene.matter.world, x, y, texture, frame, options);
        scene.add.existing(this);
        this.scene = scene;
        this.isStatic = true;
        this.setIgnoreGravity(true);
        this.posX = x;
        this.posY = y;
        this.spawner = spawner;
        this.spawnedItem = null;
        this.spawnedP = false;
    }

    update(py, px)
    {
        //handles collision only if you are above the platform 
        if(py > this.y - 10)
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
        
        //handles spawning of ramps/batteries
        if(this.spawner && this.spawnedItem == null)
        {   
            let randomSpawn = Math.random();
            if(randomSpawn < (spawnChances[0]/2)/100)
            {
                this.spawnedItem = new Ramp(this.scene, this.x, this.y - 15, 'ramp2', null, { shape: rmatter.rmptmp});
            }
            else if(randomSpawn < (spawnChances[0])/100)
            {
                this.spawnedItem = new Ramp(this.scene, this.x, this.y - 15, 'ramp1', null, { shape: rmatter.rmptmp});
            }
            else if(randomSpawn < (spawnChances[0] + spawnChances[2])/100)
            {
                this.spawnedItem = new Battery(this.scene, this.x, this.y - 70, 'battery0001', null, {shape: battmatt.batterybox});
                this.spawnedItem.setScale(0.1);
                this.spawnedItem.play('battery');
                this.spawnedItem = 0;
            }
            else if(randomSpawn < (spawnChances[0] + spawnChances[2] + spawnChances[1])/100)
            {
                this.spawnedItem = new Platform(this.scene, this.x+100, this.y-117, 'platform', null, {shape: platformMatter.platform}, false);
                this.spawnedP = true;
            }
            else
            {
                this.spawnedItem = 0;
            }
        }

        //handles despawning of items
        if(this.spawnedItem != null && this.spawnedItem != 0 && (this.spawnedItem.x < player.x - 300)) {
            //console.log(!(this.spawnedItem instanceof Battery));
            if(!(this.spawnedItem instanceof Battery))
            {
               this.scene.add.image(this.spawnedItem.x, this.spawnedItem.y, this.spawnedItem.texture);
            }
            else
            {
                let spawnedImage = this.scene.add.sprite(this.spawnedItem.x , this.spawnedItem.y, this.spawnedItem.texture);
                spawnedImage.scale=0.1;
            }
            
            this.spawnedItem.destroy();
            this.spawnedItem = 0;
            this.spawnedP = false;
        }

    }
    reset(playerY) {
        
    }

    active() {

    }
    deactive() {

    }
}