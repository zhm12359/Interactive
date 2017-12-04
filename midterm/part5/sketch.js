
var currentColor="red";
function preload(){
}

function setup() {
    var canvas = createCanvas(500, 500);

    noStroke();
    background("black");
}


function draw(){
    fill("white");
    text("Current Color", 20, 20 );
    fill(currentColor);
    rect(100,10, 20,20);

    if(mouseIsPressed){
        fill(currentColor);
        ellipse(mouseX, mouseY, 20);
    }



}

function changeColor(tag){
    currentColor = tag.id;
}






