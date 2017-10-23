function Rocket(x, y, mic) {
    this.x = x;
    this.y = y;
    this.fire = false;
    this.speed = 0;
    this.acceleration = 0;
    this.angle = 90;
    this.width = 70;
    this.height = 125;
    this.mic = mic;

    this.rocketOn = loadImage("images/rocket-on.png");
    this.rocketOff = loadImage("images/rocket-off.png");

    this.displayFlying = function () {
        imageMode(CENTER);
        // push();
        // translate(this.x, this.y);
        // rotate(radians(this.angle - 90));
        image(this.rocketOff, this.x, this.y, this.width, this.height);

        this.updateFlying(this.mic.getLevel());

        if (this.x < 0) this.x = screenWidth - this.x;
        if (this.x > screenWidth) this.x -= screenWidth;

    };

    this.displayOff = function () {
        imageMode(CORNER);
        image(this.rocketOff, x, y, 35, 50);
    };

    this.updateFlying = function(micLevel) {

        var level = map(micLevel, 0, 1, 0,100);

        if(level>10){ //filter out bg noise
            if(this.y > 100 )this.y = this.y - micLevel*50;
        }
        if(this.y < height - 100) this.y += 3;


        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            // this.angle -= 10;
            // this.angle = constrain(this.angle, 10, 170);
            this.x = constrain(this.x - 5, 0, screenWidth);
        }

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            // this.angle += 10;
            // this.angle = constrain(this.angle, 10, 170);
            this.x = constrain(this.x + 5, 0, screenWidth);
        }

        this.checkCollisionWithCircle(1,2);
    }

    this.checkCollisionWithCircle = function(x, y){
        fill(100,0,0,50);



        triangle( this.x , this.y - this.height/2, //upper point
                    this.x - this.width/2, this.y+28, //left point
                    this.x+this.width/2, this.y+28);


        var ret = pointInTriangle(this.x , this.y - this.height/2, this.x - this.width/2, this.y+28,this.x+this.width/2, this.y+28, x, y );
        if(ret) text("Collision!!!!", 250, 250);
        return ret;
    }



    function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y)
     {
         var denominator = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
         var a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denominator;
         var b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denominator;
         var c = 1 - a - b;

         return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
     }

}