

function Cloud(x,y){
    this.x = x;
    this.y = y;

    this.drawCould = function(){
        fill("while");
        ellipse(this.x,this.y, 50,20);
        ellipse(this.x+40,this.y, 50,20);
        ellipse(this.x+20,this.y-10, 50,20);
    }
}