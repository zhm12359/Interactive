
var rocketOn;
var rocketOff;
var rocket;
var mic;

function preload() {
    rocketOn = loadImage("images/rocket-on.png");
    rocketOff = loadImage("images/rocket-off.png");
}

function setup() {
    createCanvas(500, 700);
    rocket = new Rocket(250, 500);
    mic = new p5.AudioIn();
    mic.start();

}

function draw() {
    background("lightblue");

    micLevel = mic.getLevel();

    rocket.displayFlying();
    rocket.updateFlying(micLevel);
}
