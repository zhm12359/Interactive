// our video object
var capture;

// an image object to "memorize" the previous frame of video
var compareFrame;

// threshold to see how tolerant we should be
var threshold = 10;

// artwork
var missile;
var kirby1;
var kirby2;

var kirby;
var score = 0;

// lots of bees!
var theMissiles = [];

var state = 0;

function preload() {
    missile = loadImage('images/missile.png');
    kirby1 = loadImage("images/kirby1.png");
    kirby2 = loadImage("images/kirby2.png")
}

function setup() {
    // note that this sketch has been scaled up to 2x its normal size --
    // the code below uses a scaling factor of 2 to compare video resolution (320x240) with
    // screen resolution (640x480)
    createCanvas(640, 480);
    noStroke();

    // start up our web cam
    capture = createCapture({
        video: {
            mandatory: {
                minWidth: 320,
                minHeight: 240,
                maxWidth: 320,
                maxHeight: 240
            }
        }
    });
    capture.hide();

    // create an empty image that will hold a previous frame of video
    compareFrame = new p5.Image(320, 240);

    // create our motion object
    motionObject = new movingRegion(width / 2, height / 2, 100, 100);
    setupGame();

}

function setupGame() {
    kirby = {x: 0, y: height - 10, speed: 2, size: 100}
    score = 0;
}

function draw() {

    if (state == 0) drawStartScreen();
    if (state == 1) drawGamePlay();
    if (state == 2) drawGameOver();




}

function drawStartScreen() {

    capture.loadPixels();
    mirrorVideo(capture);

    if (capture.pixels.length > 0) {
        image(capture, 0, 0, 640, 480);
    }

    // fill("lightblue");
    // rectMode(CENTER);
    // rect(width / 2, height / 2, width/3, height/3);


    fill("yellow");
    textSize(30);
    text("Press S to start! ", 200, 200);
    text("Wave your hand at the Missiles to kill them!",25, 250);


    if(keyIsDown(83)) state = 1;

}

function drawGameOver(){

    background(0);


    fill("yellow");
    textSize(30);
    text("Press S to restart! ", 200, 250);
    text("You killed " + score + " missiles for Kirby",125, 200);

    if(keyIsDown(83)) {
        setupGame();
        state = 1;
    }
}

function drawGamePlay() {

    // expose the pixels on our video stream
    imageMode(CORNER);
    capture.loadPixels();


    mirrorVideo(capture);
    compareFrame.loadPixels();
    // mirrorVideo(compareFrame);
    // if we have some pixels to work with then we can start playing our game
    if (capture.pixels.length > 0) {

        // do we need to add a new bee?
        if (theMissiles.length < 3 && random(100) > 95) {
            var temp = new movingRegion(random( 30, width-30), 0, random(1, 2));
            theMissiles.push(temp);
        }

        image(capture, 0, 0, 640, 480);

        for (var i = 0; i < theMissiles.length; i++) {
            var ret = theMissiles[i].move();
            theMissiles[i].checkHit();
            theMissiles[i].display();

            if (ret) {
                console.log("game over!");
                state = 2;
            }

            //remove dead missile
            if (theMissiles[i].hp <= 0) {
                theMissiles.splice(i, 1);
                i--;
                score++;
            }
        }

        // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
        compareFrame.copy(capture, 0, 0, 320, 240, 0, 0, 320, 240);
    }

    imageMode(CENTER);
    image(kirby.speed > 0 ? kirby1 : kirby2, kirby.x, kirby.y, kirby.size, kirby.size);
    kirby.x += kirby.speed;
    if (kirby.x > width || kirby.x < 0) kirby.speed *= -1;

    fill(100, 0, 0, 200);
    // ellipse(kirby.x, kirby.y, kirby.size/1.1);
}


function movingRegion(x, y, ys) {

    this.x = x;
    this.y = y;

    this.ySpeed = ys;

    this.hp = 100;


    // move this object
    this.move = function () {
        this.y += this.ySpeed;

        this.w = missile.width / 10;
        this.h = missile.height / 10;

        if (this.y + this.h > height) {
            this.y = 0 - this.h;
            this.x = random(30, width - 30);
            if (this.ySpeed < 4) this.ySpeed += 0.2; //make it harder
        }

        //if collision happens
        if (dist(this.x + this.w / 2, this.y + this.h / 1.8, kirby.x, kirby.y) < (kirby.size / 2.2 + this.w / 3)) return true;
        else return false;


    }

    // display this object
    this.display = function () {

        var hpwidth = map(this.hp, 0, 100, 0, missile.width / 10);

        //HP Bar
        fill("red");
        rectMode(CORNER);
        rect(this.x, this.y - missile.height / 60, hpwidth, 4);


        image(missile, this.x, this.y, this.w, this.h);
        fill(100, 100, 100, 200);
        // ellipse(this.x + this.w/2, this.y + this.h/1.8, this.w / 1.5);
    }

    // determine if this object has been hit
    this.checkHit = function () {
        // assume no motion
        var movedPixels = 0;

        // note - we have to account for the fact that the video is being scaled 2x which
        // is why we divide the position & size of the region we are looking for by 2
        for (var x = int(this.x / 2); x < int((this.x + this.w) / 2); x++) {
            for (var y = int(this.y / 2); y < int((this.y + this.h) / 2); y++) {
                // compute 1D location
                var loc = (x + y * capture.width) * 4;
                var loc2 = (capture.width-x + y*capture.width) * 4;

                // determine if there is motion here
                if (dist(capture.pixels[loc], capture.pixels[loc + 1], capture.pixels[loc + 2], compareFrame.pixels[loc2], compareFrame.pixels[loc2 + 1], compareFrame.pixels[loc2 + 2]) > threshold) {
                    movedPixels += 1;
                }
            }
        }

        // if we have 20% motion then we can qualify this as a hit
        if (movedPixels / (this.w * this.h / 2) > 0.2) {
            this.hp -= 20;
        }
        // else {
        //     // the bee has 5% of healing itself
        //     if (this.hp <= 90 && random(100) > 95) this.hp += 10;
        // }
    }
}

// mirror our video
function mirrorVideo(capture) {
    // iterate over 1/2 of the width of the image & the full height of the image
    for (var x = 0; x < capture.width/2; x++) {
        for (var y = 0; y < capture.height; y++) {
            // compute location here
            var loc1 = (x + y*capture.width) * 4;
            var loc2 = (capture.width-x + y*capture.width) * 4;

            // swap pixels from left to right
            var tR = capture.pixels[loc1];
            var tG = capture.pixels[loc1+1];
            var tB = capture.pixels[loc1+2];

            capture.pixels[loc1]   = capture.pixels[loc2];
            capture.pixels[loc1+1] = capture.pixels[loc2+1];
            capture.pixels[loc1+2] = capture.pixels[loc2+2];

            capture.pixels[loc2] = tR;
            capture.pixels[loc2+1] = tG;
            capture.pixels[loc2+2] = tB;
        }
    }
    capture.updatePixels();
}


