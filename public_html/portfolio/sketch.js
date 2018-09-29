var theParticles = [];
var theCanvas;
function setup() {
    theCanvas = createCanvas(windowWidth,windowHeight);
}

function draw() {
    background(255);
    fill(0);

    if (mouseIsPressed) {
        theParticles.push( new Particle(mouseX, mouseY) );
    }

    for (var i = 0; i < theParticles.length; i++) {
        var result = theParticles[i].moveAndDisplay();
        if (result) {
            theParticles.splice(i, 1);
            i = i - 1;
        }

    }
}

function Particle(startX, startY) {
    // all particles should store their initial starting position
    this.x = startX;
    this.y = startY;

    // all particles should pick a random color for themselves
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.alpha = random(30,255);

    // all particles need a size
    this.size = random(20,75);

    // all particles should pick a random speed
    this.xSpeed = random(-3,3);
    this.ySpeed = random(-3,3);

    // all particles need to be able to move and display themselves
    this.moveAndDisplay = function() {
        // move
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // adjust size down a little bit
        this.size -= 0.3;
        this.size = constrain(this.size, 0, 75);

        // draw our particles
        fill(this.red, this.green, this.blue, this.alpha);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);

        // have the function return true if the particle is so small that it can be safely removed
        if (this.size <= 0) {
            return true;
        }
        else {
            return false;
        }
    }
}


function windowResized() {
    theCanvas.size(windowWidth, windowHeight);
}