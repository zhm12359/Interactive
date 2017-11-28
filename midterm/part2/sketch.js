var fishImage;
var fish;
function preload(){
    fishImage = loadImage("fish.png");
}

function setup() {
    var canvas = createCanvas(500, 500);

    noStroke();
    noCursor();
    imageMode(CENTER);
    fish = new RotatingBox();
}


function draw(){

    background(100,100,100,50);
    // console.log(fishImage);
    //image(fishImage, mouseX,mouseY, 80,80);
    fish.display();





}

// our rotating box class
function RotatingBox() {
    this.angle = 0;
    this.acc = 1;

    this.display = function() {

        push();

        translate(mouseX, mouseY);

        rotate(radians(this.angle));

        image(fishImage,0,0, 130,130);

        // restore the drawing state
        pop();

        // update our angle and size
        this.angle+=this.acc;

    }
}

function mousePressed(){
    fish.acc += 0.5;
}

function keyPressed(){
    fish.acc = 1;
}






