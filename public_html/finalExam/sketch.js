// variable to hold a reference to our A-Frame world
var world;
var snowFlakes = [];
var gifts = [];
var G = 12;

function setup() {


    alert("This is a santa hunting game! You can open gift boxes by clicking on them. Santa is in one of the boxes!");

	// no canvas needed
	noCanvas();

	world = new World('VRScene');

    var textures = ['wrapper1', 'wrapper2', 'wrapper3','wrapper4'];


    var floor = new Plane({
        x:0, y:0, z:0,
        width: 100,height: 100,
        asset: "floor",
        repeatX:10,
        repeatY:10,
        rotationX:-90
    });
    world.add(floor);
    var userPos = world.getUserPosition();

    for(var i=0; i<100; i++){
        var f = new Snow(userPos);
        snowFlakes.push(f);
        f.addToWorld();
    }

    //setup trees
    for(var i=0; i<5; i++){
        var t = new Tree(random(-30, 30), 0.8, random(-30,30), random(3,5), random(0.4,0.7));
        t.addToWorld();
    }


    //setup regular gift
    for(var i=0; i<G-1; i++){
        var g = new Gift({
            x:random(-30,30), y:0.5, z:random(-30,30), height:1, width:random(0.8,1.2), depth:random(0.8,1.2),
            asset:textures[parseInt(random(0,3))], isTheOne: false
        });
        g.addToWorld();
        gifts.push(g);
    }

    //set up the Gift
    var theGift = new Gift({
        x:random(-30,30), y:0.5, z:random(-30,30), height:1, width:random(0.8,1.2), depth:random(0.8,1.2),
        asset:textures[parseInt(random(0,3))], isTheOne: true
    });
    theGift.addToWorld();
    gifts.push(theGift);

}


function draw() {
    var userPos = world.getUserPosition();

    if (mouseIsPressed) {
        world.moveUserForward(0.05);
    }

    //snow flakes
    for(var i=0; i<snowFlakes.length; i++){
        var ret = snowFlakes[i].move();
        if(ret) {
            snowFlakes[i].remove();
            snowFlakes.splice(i,1);
            var f = new Snow(userPos);
            snowFlakes.push(f);
            f.addToWorld();
        }

    }

    gifts.forEach(function(g){
        g.move();
    })
}


function Gift(opt){

    var self = this;
    this.removed = false;
    this.shouldMove = true;

    this.isTheOne = opt.isTheOne;


    var lidOption = Object.assign({}, opt, {
        y: opt.y + opt.height/2,
        height: opt.height/5,
        width: opt.width*1.3,
        depth: opt.depth*1.3
    })

    this.lid = new Box(lidOption);

    var boxOption = Object.assign({}, opt, {
        clickFunction: function(me){
            self.shouldMove = false;
            if(!self.removed) {
                world.remove(self.lid);
                self.removed = true;

                if(!self.isTheOne){
                    var h = new OBJ({
                        x:me.x, y:me.y+me.height, z:me.z,
                        asset: 'hat_obj',
                        mtl: 'hat_mtl',
                        scaleX:0.5,
                        scaleY:0.5,
                        scaleZ:0.5,
                    });
                    world.add(h);
                }

                if(self.isTheOne){
                    console.log("You have the Santa!");
                    var h = new OBJ({
                        x:me.x, y:me.y+me.height, z:me.z,
                        asset: 'santa_obj',
                        mtl: 'santa_mtl',
                        scaleX:0.8,
                        scaleY:0.8,
                        scaleZ:0.8,
                    });
                    world.add(h);
                    // var endText = $("#end");

                    setTimeout(function(){ alert("Congrats, you have found santa!! You can continue to play in the world"); }, 1000);

                }

            }
        }
    });
    this.body = new Box(boxOption);


    this.addToWorld = function(){
        world.add(this.body);
        world.add(this.lid);
    }

    this.remove = function(w){
        world.remove(this.body);
        world.remove(this.lid);
    }

    this.xOffset = random(1000);
    this.zOffset = random(2000, 3000);

    this.move = function() {

        if(self.shouldMove){
            var yMovement = 0;

            // the particle should randomly move in the x & z directions
            var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
            var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

            // update our poistions in perlin noise space
            this.xOffset += 0.01;
            this.yOffset += 0.01;

            // set the position of our box (using the 'nudge' method)
            this.body.nudge(xMovement, yMovement, zMovement);
            this.lid.nudge(xMovement, yMovement, zMovement);


            if (this.body.x <= -45 || this.body.x >=45) {
                this.body.setX(random(-30,30));
                this.lid.setX(random(-30,30));
            }
            if (this.body.z <= -45 || this.body.z >=45) {
                this.body.setZ(random(-30,30));
                this.lid.setZ(random(-30,30));
            }
        }

    }


}

function Snow(userPos){


    this.x=random(userPos.x-50,userPos.x+50);
    this.y= userPos.y + random(5,10);
    this.z=random(userPos.z-50,userPos.z+50);

    this.body=new Sphere({
        x:this.x, y:this.y,z:this.z,
        red:250,green:250,blue:250,
        radius: random(0.08, 0.13)
    });

    this.move = function(){
        this.body.nudge(0,-.04,0);
        if (this.body.getY()<=0){
            return true;
        }
        return false;
    }

    this.addToWorld = function(){
        world.add(this.body);
    }
    this.remove = function(){
        world.remove(this.body);
    }

}


function Tree(x, y, z, height, radius) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = height;
    this.radius = radius;

    this.body = new Cylinder({
        x: this.x,
        y: this.y,
        z: this.z,
        red: 105,
        green: 66,
        blue: 0,
        radius: this.radius / 4,
        height: this.height / 2
    });

    this.cone1 = new Cone({
        x: this.x,
        y: this.y + this.height / 4,
        z: this.z,
        red: 10,
        green: 100,
        blue: 10,
        radiusTop: 0,
        radiusBottom: this.radius * 3,
        height: this.height / 3
    });

    this.cone2 = new Cone({
        x: this.x,
        y: this.y + this.height / 2,
        z: this.z,
        red: 10,
        green: 100,
        blue: 10,
        radiusTop: 0,
        radiusBottom: this.radius * 2,
        height: this.height / 3
    });


    this.addToWorld = function(){
        world.add(this.body);
        world.add(this.cone1);
        world.add(this.cone2);
    }
}