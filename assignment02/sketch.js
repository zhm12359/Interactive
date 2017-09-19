var ball = {x: 300, y:300, xSpeed: 2, ySeepd: 3};
var bottombar = {x: 225, y:580, width: 150, height: 20, accel: 1.5};
var bgimage;
var coinImage;
var coin;
var directions = [ 1, -1 ];
var score = 0;
var miss = 0;


function preload(){
    bgimage = loadImage("images/starry_sky-800px.png");
    coinImage = loadImage("images/coin.png");
}

function setup() {
    createCanvas(600, 600);
    noStroke();
    fill("yellow");
    rect(bottombar.x, bottombar.y, bottombar.width,bottombar.height);
    ellipseMode(CENTER);

    coin =   {x: random(35, 565), y : random(35, 400)}

}

function dist(x1, y1, x2, y2){

    console.log("happen");
    var ret = Math.sqrt( (x1 - x2)*(x1 - x2) +(y1 - y2)*(y1 - y2 ) );

    //console.log(ret);
    return ret;
}

function draw(){

    imageMode(CORNER);
    background(bgimage);

    imageMode(CENTER);
    image(coinImage, coin.x, coin.y, 70, 70);

    //ball
    fill(random(255), random(255), random(255));
    ellipse(ball.x += ball.xSpeed, ball.y += ball.ySeepd, 30, 30);


    //console.log(dist(ball, coin));
    //check ball coin collision
    //console.log(dist(ball.x, ball.y,coin.x, coin.y));
    if(dist(ball.x, ball.y,coin.x, coin.y)<=15+35){
        score++;
        coin.x = random(35, 565);
        coin.y = random(35, 400);
    }

    //display score
    fill(255);
    text("Your Score: " + score, 20, 20);
    text("Your Misses: " + miss, 20, 40);


    //the moving bar
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65) ) {
        if(bottombar.x>0) bottombar.x -= bottombar.accel;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) && bottombar.x<600-75) {
        if(bottombar.x<600-150) bottombar.x += bottombar.accel;
    }

    fill("yellow");
    rect(bottombar.x, bottombar.y, bottombar.width,bottombar.height);


    //edge collision
    if(ball.x>width-15){
        ball.xSpeed*=-1.01; //speed up a bit
    }else if(ball.x < 15){
        ball.xSpeed*=-1.01;
    }

    if(ball.y<15){
        ball.ySeepd *= -1.01;
    }

    if( ball.y+15 >= 580 && (ball.x <= bottombar.x+150 && ball.x >= bottombar.x ) ){ //hit the paddle
        ball.ySeepd *= -1.01;
    }else if(ball.y > height-15){ //misses

        miss++;
        ball.x = 300;
        ball.y = 300;

        ball.xSpeed *= directions[parseInt(random(2))];
        ball.ySeepd *= directions[parseInt(random(2))];


    }


}




