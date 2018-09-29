var world;
var wheel;
var cars = [];
var moveToCarSound;

function preload(){
    moveToCarSound = loadSound("sounds/touchStar.aac");
}

function setup() {
    noCanvas();

    world = new World('VRScene');
    world.setFlying(true);

    var floor = new Plane({
        width: 200,
        height: 200,
        rotationX:-90,
        asset:"stone",
        repeatX:200,
        repeatY:200
    });

    world.add(floor);

    world.setUserPosition(0,1,15);

    var offset = -100;
    for(var i=0; i<10; i++){

        offset += 10;
        var w = random(4,7);
        var car = new Car({
            x: random(-100, 100), y: w/3, z: offset,
            width:w, height:w/5,depth: random(1,2),
            red: random(255), green:random(255), blue:random(255),
            asset:"gold",
            speed: random(0.05, 0.3) * ( random(-1,1) > 0 ? 1 : -1)
        });
        car.addToWorld(world);
        cars.push(car);

    }

    for(var i=0; i<10; i++){

        offset += 10;
        var w = random(4,7);
        var car = new Car({
            x: random(-100, 100), y: w/3, z: offset,
            asset: "blue",
            width:w, height:w/5,depth: random(1,2),
            red: random(255), green:random(255), blue:random(255),
            speed: random(0.05, 0.3) * ( random(-1,1) > 0 ? 1 : -1)
        });
        car.addToWorld(world);
        cars.push(car);

    }


}

function draw() {

    if (mouseIsPressed) {
        world.moveUserForward(0.05);
    }

    cars.forEach(function(c){
        c.move();
        if(c.lowerBody.x < -100+c.lowerBody.width || c.lowerBody.x > 100-c.lowerBody.width) {
            c.speed=-1 * c.speed;

        }
    })

}



function Tire(opt){

    this.innerBars = [];
    this.outerFrame = new Torus(opt);

    for(var i=0; i<8; i++){
        var cl = new Cylinder({
            x: opt.x , y:opt.y, z:opt.z,
            height:opt.radius*2,
            radius: opt.radiusTubular,
            red:200, green:200, blue:200,
            rotationZ: 360/8 * i
        });
        this.innerBars.push(cl);
    }

    this.addToWorld = function(w){
        this.innerBars.forEach(function(x){
            w.add(x);
        });
        w.add(this.outerFrame);
    }

    this.spin = function(s){
        this.innerBars.forEach(function(x){
            x.spinZ(s);
        });
    }

    this.rotate = function(x,y,z){
        this.innerBars.forEach(function(b){
            b.rotateX = x;
            b.rotateY = y;
            b.rotateZ = z;
        });

        this.outerFrame.rotateX = x;
        this.outerFrame.rotateY = y;
        this.outerFrame.rotateZ = z;
    }

    this.nudge = function(x,y,z){
        this.innerBars.forEach(function(b){
            b.nudge(x,y,z);
        });

        this.outerFrame.nudge(x,y,z);
    }

}

//opt's x y z will be the center point of the lowerBody's upper surface's center
//opt's height and width and depth will be lowerBody's height and width and depth
function Car(opt){


    this.tires = [];
    this.upperBody = new Box(Object.assign({}, opt, {
        y: opt.y + opt.height/2, width: opt.width/2, depth: opt.depth/2, clickFunction: function(me) {
            console.log(me);
            moveUserToTheCar(me);
        }
    }));
    this.lowerBody = new Box(Object.assign({}, opt, {
        y: opt.y - opt.height/2, clickFunction: function(me){
            console.log(me);
            moveUserToTheCar(me);
        }
    }));

    this.light = new Cone(Object.assign( {}, opt, {

        y: opt.y + opt.height + opt.height/4,
        height:opt.height/2,
        radiusBottom: opt.depth/4, radiusTop: opt.depth/8,
        red:random(255), green:random(255), blue:random(255),


    } ));

    this.speed = opt.speed;

    var r = opt.y-opt.height;

    this.tires.push(new Tire({
        x: opt.x - opt.width/4, y: opt.y-opt.height, z: opt.z - opt.depth/2, radius: r/20*19, radiusTubular: r/20, red:0, green:0, blue:0
    }));

    this.tires.push(new Tire({
        x: opt.x - opt.width/4, y: opt.y-opt.height, z: opt.z + opt.depth/2, radius: r/20*19, radiusTubular: r/20, red:0, green:0, blue:0
    }));

    this.tires.push(new Tire({
        x: opt.x + opt.width/4, y: opt.y-opt.height, z: opt.z + opt.depth/2, radius: r/20*19, radiusTubular: r/20, red:0, green:0, blue:0
    }));

    this.tires.push(new Tire({
        x: opt.x + opt.width/4, y: opt.y-opt.height, z: opt.z - opt.depth/2, radius: r/20*19, radiusTubular: r/20, red:0, green:0, blue:0
    }));

    this.addToWorld = function(w){
        this.tires.forEach(function(t){
            t.addToWorld(w);
        })

        w.add(this.upperBody);
        w.add(this.lowerBody);
        w.add(this.light);
    }

    var self = this;
    this.move = function(){
        this.tires.forEach(function(t){
            t.nudge(self.speed,0,0);
            t.spin(-self.speed*50);
        });
        this.upperBody.nudge(self.speed,0,0);
        this.lowerBody.nudge(self.speed,0,0);
        this.light.nudge(self.speed, 0, 0);
    }

    // this.turn = function(x,y,z) {
    //     this.tires.forEach(function(t){
    //         t.rotate(x,y,z);
    //     });
    //     this.upperBody.rotationX = x;
    //     this.upperBody.rotationZ = z;
    //     this.lowerBody.rotationX = x;
    //     this.lowerBody.rotationZ = z;
    // }

}


function moveUserToTheCar(me) {
    moveToCarSound.play();
    world.slideToObject(me, 100);
}
