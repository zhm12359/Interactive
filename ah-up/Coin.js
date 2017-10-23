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
}