function Obstable(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.display = function() {
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    };

    this.hit = function(obj) {
        if (obj instanceof Rocket) {
            return false;
        }
        return false;
    }
}