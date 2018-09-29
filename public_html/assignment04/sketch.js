var moleImage;
var hammerImage;
var starImage;
var bombImage;
var state = 0; // 0: pause 1: play 2: game over
var moles = [];
var score = 0;
var miss = 0;
var timer = 30*60;
var bombSound;
var scoreSound;

function preload(){
    moleImage = loadImage("images/mole.png");
    hammerImage = loadImage("images/hammer.png");
    starImage = loadImage("images/star.png");
    bombImage = loadImage("images/bomb.svg");
    scoreSound = loadSound("sounds/touchStar.aac");
    bombSound = loadSound("sounds/bomb.aac");
}

function setup() {
    createCanvas(500, 500);
    noCursor();
    noStroke();
    setupGame();
}

function setupGame(){
    score = 0;
    miss = 0;
    timer = 30*60;
    moles=[];
    for(var i=1; i< 4; i++){
        for(var j=1; j<4; j++){
            moles.push(new Mole( width/4*i, height/4*j ));
        }
    }
}


function draw(){
    background("lightblue");
    fill(255);
    textSize(15);
    textAlign(CORNER);
    text("Score: " + score, 35, 20);
    text("Misses: " + miss, 35, 40);
    text("Time:" + int(timer/60), 25, 60);


    if(state==0) drawIntro();
    else if(state===1) {
        timer--;
        drawGame();
    }else if(state==2){
        drawGameOver();
    }

}

function drawIntro(){
    textAlign(CENTER);
    textSize(50);
    text("Press A to start!", 250, 250);
    if(keyIsDown(65)) state = 1;

}

function drawGame(){
    //display 9 circles

    moles.forEach( function(x){
        x.display();
        x.update();

    } );
    drawHammer();
    if(timer<=0) state = 2;
}

function drawGameOver(){
    background("lightblue");
    fill(255);
    textSize(30);

    text("Your Score: "+ score, 250, 180);
    text("Your Misses: " + miss, 250, 210);
    text("Press A to restart!", 250, 250);

    if(keyIsDown(65)) {
        setupGame();
        state = 1;
    }
}

function drawHammer(){
    imageMode(CENTER);
    image(hammerImage, mouseX, mouseY, 50, 50 );
}



function Mole(x, y){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.state = 0;
    this.time = random(100, 200);

    this.display = function(){
        fill("blue");
        ellipse(this.x, this.y, this.size*2, this.size*2);

        if(this.state ===0){ //hide
            fill("white");
            ellipse(this.x, this.y, this.size*1.6, this.size*1.6);
        }else if(this.state ===1){ //up
            fill("white");
            ellipse(this.x, this.y, this.size*1.6, this.size*1.6);
            image(moleImage, this.x, this.y, this.size*1.6, this.size*1.6);
        }else if(this.state ===2){ //star
            fill("white");
            ellipse(this.x, this.y, this.size*1.6, this.size*1.6);
            image(starImage, this.x, this.y, this.size*1.6, this.size*1.6);
        }else if(this.state ===3){ //bomb
            fill("white");
            ellipse(this.x, this.y, this.size*1.6, this.size*1.6);
            image(bombImage, this.x, this.y, this.size*1.6, this.size*1.6);
        }else{
            this.state = int(random(0,10)) % 4;
        }
    }

    this.update = function(){

        if(this.time>0) this.time = this.time -1;
        else{
            var rando = random(0, 10);
            if(rando<3) this.state = 0;
            else if(rando < 6) this.state = 1;
            else if(rando <8) this.state = 2;
            else if(rando < 10) this.state = 3;

            this.time = random(100, 200);
        }
    }

    this.checkHit = function(){
        return dist(this.x, this.y, mouseX, mouseY) <= this.size;
    }
}


function mousePressed(){
    var hit = false;
    moles.forEach(function (x) {
        if(x.checkHit()){
            if(x.state === 0 && state == 1) miss++;
            else if(x.state === 1) {
                scoreSound.play();
                score++;
            }else if(x.state === 2){
                scoreSound.play();
                score += 5;
            }else if(x.state ===3){
                bombSound.play();
                score -= 5;
            }

            x.state = 0;
        }
    });
}





