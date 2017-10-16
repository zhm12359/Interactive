
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


function Rocket(x,y){
    this.x = x;
    this.y = y;
    this.fire = false;

    this.displayFlying = function(){

        imageMode(CORNER);
        image(this.fire? rocketOn : rocketOff, this.x, this.y, 70, this.fire? 125:100);
        rocket.fire = !rocket.fire;
    }

    this.displayOff = function(){
        imageMode(CORNER);
        image(rocketOff, x, y, 70, 100);
    }

    this.updateFlying = function(micLevel) {
        this.y = height - 100 - micLevel*1000; //FIXUP: NEED BETTER FORMULA

        if (keyIsDown(LEFT_ARROW) || keyIsDown(65) ) {
            if(this.x>0) this.x -= 3;
        }

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) && bottombar.x<600-75) {
            if(this.x<width-70) this.x += 3;
        }
    }


}