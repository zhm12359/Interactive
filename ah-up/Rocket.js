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
        // pop();

        // this.rocket.fire = !this.rocket.fire;

        // if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        //     // this.angle -= 10;
        //     // this.angle = constrain(this.angle, 10, 170);
        //     this.y = constrain(this.y - 5, 0, screenHeight);
        // }
        //
        // if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        //     // this.angle -= 10;
        //     // this.angle = constrain(this.angle, 10, 170);
        //     this.y = constrain(this.y + 5, 0, screenHeight);
        // }



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

        // this.acceleration = constrain(this.acceleration, 0, 10);
        // this.speed += this.acceleration;
        // this.y += sin(this.angle) * this.speed;
        // this.x += cos(this.angle) * this.speed;

        if (this.x < 0) this.x = screenWidth - this.x;
        if (this.x > screenWidth) this.x -= screenWidth;

    };

    this.displayOff = function () {
        imageMode(CORNER);
        image(this.rocketOff, x, y, 35, 50);
    };

}