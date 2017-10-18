function Coin(x, y) {
    this.x = x;
    this.y = y;

    this.size = random(10, 20);

    this.display = function() {
        imageMode(CENTER);
        image(this.x, this.y, this.size, this.size);
    };

    this.hit = function(obj) {
        if (obj instanceof Rocket) {
            return false;
        }
        return false;
    }
}