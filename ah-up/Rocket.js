function Rocket(x, y, mic) {
    this.x = x;
    this.y = y;
    this.fire = false;
    this.speed = 0;
    this.acceleration = 0;
    this.angle = 90;
    this.height = 0;
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
        image(this.fire ? this.rocketOn : this.rocketOff, this.x, this.y, 70, this.fire ? 125 : 100);

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
    }

}