function Obstacle(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 10;
    this.speed = random(1, 5);

    this.display = function() {
        rectMode(CORNER);
        fill(0);
        rect(this.x, this.y, this.width, this.height);
        this.y += this.speed;
        return this.y >= screenHeight;
    };
}