var world;

var cars = [];
var logs = [];
var coins = [];

// 0 - Start State
// 1 - Playing State
// 2 - Game Over State
var state = 0;

var startX = 0;
var startY = 1;
var startZ = 45;

var score = 0;
var deadTimes = 0;

var isMobile = false;

var startScreen;
var endScreen;

var scoreHolder;
var timer = 180*60;//3minute timer
var timerHolder;

function preload() {
}

function setup() {
    noCanvas();

    world = new World('VRScene');
    world.setUserPosition(startX, startY, startZ);

    isMobile = isBrowserMobile();

    startScreen = $(".start");
    scoreHolder = $("#score").clone();
    $("#score").remove();

    timerHolder = $("#timer").clone();
    $("#timer").remove();


}

function draw() {



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

    if (mouseIsPressed) {
        //mobile touch is less sensitive than PC click
        if(isMobile) world.moveUserForward(0.25);
        else world.moveUserForward(0.05);
    }
    punishNaughtyUserWhoGoesBeyondBound();

    cars.forEach(function (c) {
        c.move();
        changeDirectionIfNeeded(c);

        if (c.checkCollision()) {
            console.log("Hit by car");
            deadTimes++;
            world.setUserPosition(startX, startY, startZ);
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
        deadTimes++;
        world.setUserPosition(startX, startY, startZ);
    }

    for (var i = 0; i < coins.length; i++) {
        var c = coins[i];
        if (c.checkCollision()) {
            score++;
            refreshScore();
            world.remove(coins[i].body);
            world.remove(coins[i].marker);
            var newCoin = new Coin({
                x: random(-43, 43),
                z: (i < 5) ? random(-43, -15) : random(15, 43)
            });
            coins[i] = newCoin;
            newCoin.addToWorld(world);
        }
    }
    refreshTimer();
}

function drawStart() {

    if(mouseIsPressed){
        startScreen.remove();
        layoutGame();
        state=1;
    }

}

function drawGameOver() {
    console.log("Game over");
}

