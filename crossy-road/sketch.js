var world;

var cars = [];
var logs = [];
var coins = [];

function preload() {
}

function setup() {
    noCanvas();

    world = new World('VRScene');

    layoutMap(world);

    var fence = new Fence(-50, 0, 100, 10, 'z');
    fence.addToWorld(world);
    fence = new Fence(50, 0, 100, 10, 'z');
    fence.addToWorld(world);
    fence = new Fence(0, 50, 100, 10, 'x');
    fence.addToWorld(world);
    fence = new Fence(0, -50, 100, 10, 'x');
    fence.addToWorld(world);

    // layoutCars(world);
    // layoutLogs(world);
    layoutCoins(world);

}

function draw() {

    if (mouseIsPressed) {
        world.moveUserForward(0.05);
    }

    cars.forEach(function (c) {
        c.move();
        if (c.lowerBody.x < -50 + c.lowerBody.width || c.lowerBody.x > 50 - c.lowerBody.width) {
            c.speed = -1 * c.speed;
            if (c.speed > 0) {
                while (c.lowerBody.x + c.speed < -50 + c.lowerBody.width) {
                    c.speed += 0.01;
                }
            }

            if (c.speed < 0) {
                while (c.lowerBody.x + c.speed > 50 - c.lowerBody.width) {
                    c.speed -= 0.01;
                }
            }
            c.move();

            if (c.speed >= 0.3) c.speed = 0.3;
            if (c.speed <= -0.3) c.speed = -0.3;
        }
    });

    logs.forEach(function (l) {
        l.move();
        if (l.x < -50 + l.width / 2) {
            l.body.setX(50 - l.width / 2);
            l.x = 50 - l.width / 2;
        } else if (l.x > 50 - l.width / 2) {
            l.body.setX(-50 + l.width / 2);
            l.x = -50 + l.width / 2;
        }
    });

}


function Tire(opt) {

    this.innerBars = [];
    this.outerFrame = new Torus(opt);
    this.x = opt.x;
    this.y = opt.y;
    this.z = opt.z;

    for (var i = 0; i < 8; i++) {
        var cl = new Box({
            x: opt.x, y: opt.y, z: opt.z,
            height: opt.radius * 2,
            width: opt.radiusTubular,
            depth: opt.radiusTubular,
            red: 200, green: 200, blue: 200,
            rotationZ: 360 / 8 * i
        });
        this.innerBars.push(cl);
    }

    this.addToWorld = function (w) {
        this.innerBars.forEach(function (x) {
            w.add(x);
        });
        w.add(this.outerFrame);
    };

    this.spin = function (s) {
        this.innerBars.forEach(function (x) {
            x.spinZ(s);
        });
    };


    this.nudge = function (xs, ys, zs) {
        this.innerBars.forEach(function (b) {
            b.nudge(xs, ys, zs);
        });

        this.outerFrame.nudge(xs, ys, zs);
        this.x += xs;
        this.y += ys;
        this.z += zs;
    };

}

//opt's x y z will be the center point of the lowerBody's upper surface's center
//opt's height and width and depth will be lowerBody's height and width and depth
function Car(opt) {

    this.x = opt.x;
    this.y = opt.y;
    this.z = opt.z;

    this.tires = [];
    this.upperBody = new Box(Object.assign({}, opt, {
        y: opt.y + opt.height / 2,
        width: opt.width / 2,
        depth: opt.depth / 2
    }));
    this.lowerBody = new Box(Object.assign({}, opt, {
        y: opt.y - opt.height / 2
    }));

    this.light = new Cone(Object.assign({}, opt, {
        y: opt.y + opt.height + opt.height / 4,
        height: opt.height / 2,
        radiusBottom: opt.depth / 4,
        radiusTop: opt.depth / 8,
        red: random(255),
        green: random(255),
        blue: random(255)
    }));

    this.speed = opt.speed;

    var r = opt.y - opt.height;

    this.tires.push(new Tire({
        x: opt.x - opt.width / 4,
        y: opt.y - opt.height,
        z: opt.z - opt.depth / 2,
        radius: r / 20 * 19,
        radiusTubular: r / 20,
        red: 0,
        green: 0,
        blue: 0
    }));

    this.tires.push(new Tire({
        x: opt.x - opt.width / 4,
        y: opt.y - opt.height,
        z: opt.z + opt.depth / 2,
        radius: r / 20 * 19,
        radiusTubular: r / 20,
        red: 0,
        green: 0,
        blue: 0
    }));

    this.tires.push(new Tire({
        x: opt.x + opt.width / 4,
        y: opt.y - opt.height,
        z: opt.z + opt.depth / 2,
        radius: r / 20 * 19,
        radiusTubular: r / 20,
        red: 0,
        green: 0,
        blue: 0
    }));

    this.tires.push(new Tire({
        x: opt.x + opt.width / 4,
        y: opt.y - opt.height,
        z: opt.z - opt.depth / 2,
        radius: r / 20 * 19,
        radiusTubular: r / 20,
        red: 0,
        green: 0,
        blue: 0
    }));

    this.addToWorld = function (w) {
        this.tires.forEach(function (t) {
            t.addToWorld(w);
        });

        w.add(this.upperBody);
        w.add(this.lowerBody);
        w.add(this.light);
    };

    var self = this;
    this.move = function () {
        this.tires.forEach(function (t) {
            t.nudge(self.speed, 0, 0);
            t.spin(-self.speed * 50);
        });
        this.upperBody.nudge(self.speed, 0, 0);
        this.lowerBody.nudge(self.speed, 0, 0);
        this.light.nudge(self.speed, 0, 0);

        this.x += self.speed;
    };

    this.setXYZ = function (x, y, z) {
        this.upperBody.setXYZ(x, y, z);
        this.lowerBody.setXYZ(x, y, z);
        this.light.setXYZ(x, y, z);
        this.tires.forEach(function (t) {
            t.setXYZ(x, y, z);
        })
    };

}

// opt's x y z will be the center point of the log
// (should be 0 in most cases, to give the appearance of it being half submerged)
// opt's height, width, and depth will be log's actual height, width, and depth
// opt should also have xSpeed, ySpeed, and zSpeed
function Log(opts) {

    this.xSpeed = opts.xSpeed;
    this.ySpeed = opts.ySpeed;
    this.zSpeed = opts.zSpeed;
    this.x = opts.x;
    this.y = opts.y;
    this.z = opts.z;
    this.height = opts.height;
    this.width = opts.width;
    this.depth = opts.depth;

    this.body = new Box({
        x: this.x,
        y: this.y,
        z: this.z,
        height: this.height,
        width: this.width,
        depth: this.depth,
        red: 102,
        green: 53,
        blue: 2
    });

    this.addToWorld = function (w) {
        w.add(this.body);
    };

    this.setXYZ = function (x, y, z) {
        this.body.setXYZ(x, y, z);
    };

    this.move = function () {
        this.body.nudge(this.xSpeed, this.ySpeed, this.zSpeed);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.z += this.zSpeed;

        //drift user part;
        var userX = world.getUserPosition().x;
        var userY = world.getUserPosition().z;

        var z1 = this.body.x - this.width/2;
        var z2 = this.body.z - this.depth/2;

        var z3 = this.body.x + this.width/2;
        var z4 = this.body.z + this.depth/2;

        if( isPointInsideRect(userX, userY, z1, z2, z3, z4 ) ){
            world.camera.nudgePosition(this.xSpeed, this.ySpeed, this.zSpeed);
        }
    };

}

function Coin(opts) {

    this.x = opts.x;
    this.z = opts.z;
    this.size = 1;

    this.body = new Box({
        x: this.x,
        y: .8,
        z: this.z,
        height: 1,
        width: 1,
        depth: .1,
        red: 244,
        green: 223,
        blue: 6
    });

    this.marker = new Octahedron({
        x: this.x,
        y: 5,
        z: this.z,
        scaleY: 1.5,
        red: 0,
        blue: 0,
        green: 255,
        opacity: .5
    });

    this.addToWorld = function (w) {
        w.add(this.body);
        w.add(this.marker);
    };

}


