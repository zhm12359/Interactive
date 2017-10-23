function Obstacle(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 10;
    this.speed = random(1, 5);

    this.display = function() {
        rectMode(CENTER);
        fill(0);
        rect(this.x, this.y, this.width, this.height);
        this.y += this.speed;
        return this.y >= screenHeight;
    };

    this.checkCollision = function(obj) {
        if (obj instanceof Rocket) {
            return this.x <= obj.x + obj.width && this.x >= obj.x - obj.width &&
                this.y <= obj.y + obj.height && this.y >= obj.y - obj.height;
        }
        return false;
    }
}