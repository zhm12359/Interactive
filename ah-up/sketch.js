// canvas width and height
var screenHeight = 600;
var screenWidth = 400;

var mic = new p5.AudioIn();
var rocket;
var obstacles = [];
var coins = [];

var rocketHeight = 0;
var score = 0;

// 0 - start state
// 1 - playing state
// 2 - game over state
var state = 0;

function preload() {
}

function setup() {
    createCanvas(screenWidth, screenHeight);
    mic.start();
    strokeWeight(1);
}

function setupGame() {
    rocket = new Rocket(screenWidth / 2, screenHeight / 2, mic);

    obstacles = [];
    for (var i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(random(100, 400), 0, random(50, 100)));
    }

    coins = [];
    for (i = 0; i < 3; i++) {
        coins.push(new Coin(random(100, 400), 0));
    }
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

function drawStart() {
    background("lightblue");
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(36);
    fill(0);
    text("Ah-Up!", screenWidth / 2, screenHeight / 2);
    text("Press 'S' to Start!", screenWidth / 2, screenHeight / 2 + 50);
}

function drawGameOver() {
    background("lightblue");
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(24);
    fill(0);
    text("Game Over!", screenWidth / 2, screenHeight / 2);
    text("You reached a max height of " + rocketHeight + "\nand collected " + score + " coins along the way!",
        screenWidth / 2, screenHeight / 2 + 50);
    text("Press 'R' to Restart!", screenWidth / 2, screenHeight / 2 + 150);
}

function drawPlaying() {
    textSize(24);
    background("lightblue");

    stroke(255, 0, 0);
    textAlign(CENTER);
    fill(255, 0, 0);
    text("DANGER", screenWidth / 2, screenHeight - 60);
    line(0, screenHeight - 50, screenWidth, screenHeight - 50);
    stroke(0);

    fill(0);
    textAlign(LEFT);
    text("Height: " + rocketHeight, 50, 50);
    text("Score: " + score, 50, 100);

    if (rocket.y >= screenHeight - 100) {
        state = 2;
    }

    obstacles.forEach(function (e) {
        if (e.display()) {
            e.y = random(0, -100);
            e.x = random(0, screenWidth);
            e.speed = random(1, 5);
        }
        if (e.checkCollision(rocket)) {
            state = 2;
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

function keyPressed() {
    if (state === 0) {
        if (keyCode === 83) {
            setupGame();
            state = 1;
        }
    } else if (state === 2) {
        if (keyCode === 82) {
            state = 0;
        }
    }
}
