var particle;
function preload(){
}

function setup() {
    var canvas = createCanvas(500, 500);

    strokeWeight(5);
    particle = new Particle(250,250);
}


function draw(){
    background("white");
    particle.display();

}


function Particle(x,y){
    this.x = x;
    this.y = y;
    this.size = random(10,40);
    this.speed = random(0,1) > 0.5 ? 5: -5;
    this.rs = random(255);
    this.gs = random(255);
    this.bs = random(255);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.xNoiseOffset = random(0,1000);


    this.display = function(){
        stroke(this.rs,this.gs,this.bs);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size);

        this.y+=this.speed;

        if(dist(mouseX, mouseY, this.x, this.y) <= this.size+10){
            stroke(0,0,0);
            line(this.x-this.size, this.y, this.x+this.size, this.y);
            line(this.x, this.y+this.size, this.x, this.y-this.size);

        }

        var xMovement = map( noise(this.xNoiseOffset), 0, 1, -1, 1 );
        this.x += xMovement;
        if(this.x>=width) this.x = width;
        if(this.x<=0) this.x = 0;
        this.xNoiseOffset += 0.01;

        if(this.y>=500) this.y = 0;
        else if(this.y <=0) this.y = height;


    }

}





