var world;
var wheel;
var cars = [];
var logs = [];

function preload() {
}

function setup() {
    noCanvas();

    world = new World('VRScene');

    var floor = new Plane({
        width: 100,
        height: 100,
        rotationX: -90,
        asset: "highway",
        repeatX: 39 / 2,
        repeatY: 25 / 2
    });

    world.add(floor);

    world.setUserPosition(0, 1, 15);

    var offset = -50;
    /*
    for (var i = 0; i < 10; i++) {

        offset += 5;
        var w = random(4, 7);
        var car = new Car({
            x: random(-50, 50), y: w / 3, z: offset,
            width: w, height: w / 5, depth: random(1, 2),
            red: random(255), green: random(255), blue: random(255),
            asset: "gold",
            speed: random(0.05, 0.3) * ( random(-1, 1) > 0 ? 1 : -1)
        });
        car.addToWorld(world);
        cars.push(car);

    }

    for (var i = 0; i < 10; i++) {
        offset += 5;
        var w = random(4, 7);
        var car = new Car({
            x: random(-50, 50), y: w / 3, z: offset,
            asset: "blue",
            width: w, height: w / 5, depth: random(1, 2),
            red: random(255), green: random(255), blue: random(255),
            speed: random(0.05, 0.3) * ( random(-1, 1) > 0 ? 1 : -1)
        });
        car.addToWorld(world);
        cars.push(car);

    }
    */

    offset = -50;
    for (var i = 0; i < 10; i++) {
        offset += 5;
        var w = random(4, 7);
        var log = new Log({
            x: random(-50, 50), y: 0, z: offset,
            width: w, height: 1, depth: random(1, 2),
            xSpeed: random(0.05, 0.3) * ( random(-1, 1) > 0 ? 1 : -1), ySpeed: 0, zSpeed: 0
        });
        log.addToWorld(world);
        logs.push(log);
    }

}

function draw() {

    // if (mouseIsPressed) {
    //     world.moveUserForward(0.05);
    // }

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
        if (l.x < -50 + l.width / 2 || l.x > 50 - l.width / 2) {
            l.xSpeed *= -1;
        }
    });

}


function Tire(opt) {

    this.innerBars = [];
    this.outerFrame = new Torus(opt);

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


    this.nudge = function (x, y, z) {
        this.innerBars.forEach(function (b) {
            b.nudge(x, y, z);
        });

        this.outerFrame.nudge(x, y, z);
    };

}

//opt's x y z will be the center point of the lowerBody's upper surface's center
//opt's height and width and depth will be lowerBody's height and width and depth
function Car(opt) {

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

    // this.numberOfBranches = random(0, 5);
    // this.branches = [];
    // for (var i = 0; i < this.numberOfBranches; i++) {
    //     this.branches.push(new Box({
    //         x: random(opts.x - opts.width / 2, opts.x + opts.width / 2),
    //         y: random(opts.y - opts.height / 2, opts.y + opts.height / 2),
    //         z: random(opts.z - opts.depth / 2, opts.z + opts.depth / 2),
    //         height: random(.1 * opts.height, .5 * opts.height),
    //         width: random(.1 * opts.width, .5 * opts.width),
    //         depth: random(.1 * opts.depth, .5 * opts.depth),
    //         rotationX: radians(random(0, 180)),
    //         rotationY: radians(random(0, 180)),
    //         rotationZ: radians(random(0, 180)),
    //         red: 102,
    //         green: 53,
    //         blue: 2
    //     }));
    //     console.log("Pushed a branch")
    // }

    this.addToWorld = function (w) {
        w.add(this.body);
    };

    this.move = function () {
        this.body.nudge(this.xSpeed, this.ySpeed, this.zSpeed);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.z += this.zSpeed;
        // this.branches.forEach(function (e) {
        //     e.nudge(this.xSpeed, this.ySpeed, this.zSpeed);
        // });
    };

}
