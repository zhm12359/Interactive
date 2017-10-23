function Coin(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 5);
    this.size = random(10, 20);

    this.display = function() {
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.size, this.size);
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