var world;

var cars = [];
var logs = [];
var coins = [];

// 0 - Start State
// 1 - Playing State
// 2 - Game Over State
var state = 1;

var score = 0;

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

    switch (state) {
        case 0:
            drawStart();
            break;
        case 1:
            drawPlaying();
            break;
        case 2:
            drawGameOver();
            break;
    }
}

function drawPlaying() {

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

        if (c.checkCollision()) {
            console.log("Hit by car");
        }
    });

    var drowning = true;
    logs.forEach(function (l) {
        l.move();
        if (l.x < -50 + l.width / 2) {
            l.body.setX(50 - l.width / 2);
            l.x = 50 - l.width / 2;
        } else if (l.x > 50 - l.width / 2) {
            l.body.setX(-50 + l.width / 2);
            l.x = -50 + l.width / 2;
        }

        if (l.checkCollision()) {
            drowning = false;
        }
    });

    var userZ = world.getUserPosition().z;
    if (drowning && userZ >= -10 && userZ <= 10) {
        console.log("User is drowning");
    }

    for (var i = 0; i < coins.length; i++) {
        var c = coins[i];
        if (c.checkCollision()) {
            score++;
            world.remove(coins[i].body);
            world.remove(coins[i].marker);
            console.log(score);
            var newCoin = new Coin({
                x: random(-43, 43),
                z: (i < 5) ? random(-43, -15) : random(15, 43)
            });
            coins[i] = newCoin;
            newCoin.addToWorld(world);
        }
    }

}

function drawStart() {
    console.log("Start Screen");
}

function drawGameOver() {
    console.log("Game over");
}
