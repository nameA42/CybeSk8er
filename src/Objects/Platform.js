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
            if(randomSpawn < 0.125)
            {
                this.spawnedItem = new Ramp(this.scene, this.x, this.y - 15, 'ramp', null, { shape: rmatter.rmptmp});
            }
            else if(randomSpawn < 0.14)
            {
                this.spawnedItem = new Battery(this.scene, this.x, this.y - 15, 'battery', null, { shape: rmatter.rmptmp});
            }
            else
            {
                this.spawnedItem = 0;
            }
        }

        //handles despawning of items
        if(this.spawnedItem != null && this.spawnedItem != 0 && (this.spawnedItem.x < player.x - 300)) {
            this.spawnedItem.destroy();
            this.spawnedItem = 0;
        }

    }
    reset(playerY) {
        
    }

    active() {

    }
    deactive() {

    }
}