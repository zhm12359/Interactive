
function preload(){
}

function setup() {
    var canvas = createCanvas(500, 500);

    noStroke();
}


function draw(){
    background("white");
    //rect
    fill(144,138,25);
    stroke(144,138,25)
    rect(243,234, 90,90);


    //circles
    strokeWeight(5);

    stroke(178,41,4);
    fill(125,211,12);
    ellipse(270,300, 100)

    stroke(199,15,235);
    fill(24,85,67);
    ellipse(300,275, 100);

    //triangle
    stroke(234,132,57);
    strokeWeight(1);
    fill(238,89,2);
    triangle(229,209, 306,250, 291,291);

    //lines
    stroke("black");
    strokeWeight(5);
    line(80, 235, 240, 435);


    line(220,290, 274,104);

    strokeWeight(8);
    line(148,345, 440, 347);






}






