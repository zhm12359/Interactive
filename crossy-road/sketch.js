var world;

var cars = [];
var logs = [];
var coins = [];

function preload() {
}

function setup() {
    noCanvas();

    world = new World('VRScene');
    world.setUserPosition(0, 1, 45);

    layoutMap(world);
    layoutLogs(world);
    layoutCars(world);
    layoutFences(world);
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







