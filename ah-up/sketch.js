// canvas width and height
var screenHeight = 500;
var screenWidth = 500;

var mic = new p5.AudioIn();
var rocket;
var obstacles = [];
var coins = [];

var rocketHeight = 0;
var score = 0;

function preload() {
}

function setup() {
    createCanvas(screenWidth, screenHeight);
    mic.start();
    textSize(32);

    rocket = new Rocket(screenWidth / 2, screenHeight / 2, mic);

    for (var i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(random(100, 400), 0, random(50, 100)));
    }
    for (i = 0; i < 3; i++) {
        coins.push(new Coin(random(100, 400), 0));
    }

}

function draw() {
    fill(0);
    rectMode(CORNER);

    background("lightblue");
    text("Height: " + rocketHeight, 50, 50);
    text("Score: " + score, 50, 100);

    obstacles.forEach(function (e) {
        if (e.display()) {
            e.y = random(0, -100);
            e.x = random(0, screenWidth);
            e.speed = random(1, 5);
        }
        if (e.checkCollision(rocket)) {
            console.log("game over")
        }
    });

    coins.forEach(function (e) {
        if (e.display()) {
            e.y = random(0, -100);
            e.x = random(0, screenWidth);
            e.speed = random(1, 5);
        }
        if (e.checkCollision(rocket)) {
            e.y = random(0, -100);
            e.x = random(0, screenWidth);
            e.speed = random(1, 5);
            score++;
        }
    });
    rocketHeight += 1;

    // micLevel = mic.getLevel();
    rocket.displayFlying();
}
