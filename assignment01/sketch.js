function setup() {
    // set the background size of our canvas
    createCanvas(800, 800);

    // erase the background with a "grey" color
    background("lightblue");

    noStroke();

    //house body
    fill(133,133,133, 150);
    rect(200,400, 400,400);

    //rooftop
    fill("brown");
    triangle(150, 400, 650, 400, 400, 200);

    //door
    fill("black");
    rect(450, 600, 100,200);

    //door handle
    fill("yellow");
    ellipse(530, 700, 20, 20);

    //window
    drawWindow(250,500,45);

    //sun
    stroke("yellow");
    fill("red");
    ellipse(0,0, 150, 150);
    noStroke();

    //clouds
    drawCloud(150,100);
    drawCloud(200,150);
    drawCloud(350,170);
    drawCloud(620,170);
    drawCloud(550,100);
    drawCloud(400,90);

    fill("black");
    textSize(36);
    text("My Lovely House", 250, 70);

}


function drawCloud(x, y){
    fill("while");
    ellipse(x,y, 50,20);
    ellipse(x+40,y, 50,20);
    ellipse(x+20,y-10, 50,20);
}

function drawWindow(x,y,size){
    stroke("black");
    fill("lightgreen");
    rect(x,y,size,size);
    rect(x+size,y,size,size);
    rect(x,y+size,size,size);
    rect(x+size,y+size,size,size);
    
    noStroke();

}

