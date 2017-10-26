function Coin(x, y) {
    this.coinImage = loadImage("images/coin.png");
    this.x = x;
    this.y = y;
    this.speed = random(1, 5);
    this.size = random(30, 60);

    this.display = function (state) {
        imageMode(CENTER);
        image(this.coinImage, this.x, this.y, this.size, this.size);
        if (state === 1) this.y += this.speed;
        return this.y >= screenHeight;
    };
}