function Road(x, z, width, depth) {

    this.x = x;
    this.z = z;
    this.width = width;
    this.depth = depth;
    this.marks = [];

    this.body = new Plane({
        x: 0,
        y: this.x,
        z: this.z,
        width: this.width,
        height: this.depth,
        rotationX: -90,
        red: 53,
        green: 53,
        blue: 53
    });
    var cur = this.x - this.width / 2;
    while (cur < this.x + this.width / 2) {
        var mark = new Plane({
                x: cur,
                y: .1,
                z: this.z,
                width: 2,
                height: .5,
                rotationX: -90,
                red: 255,
                green: 255,
                blue: 255
        });
        this.marks.push(mark);
        cur += 6;
    }

    this.addToWorld = function (w) {
        this.marks.forEach(function (m) {
            w.add(m);
        });
        w.add(this.body);
    }

}

function Grass(x, z, width, depth) {

    this.x = x;
    this.z = z;
    this.width = width;
    this.depth = depth;

    this.body = new Plane({
        x: 0,
        y: this.x,
        z: this.z,
        width: this.width,
        height: this.depth,
        rotationX: -90,
        red: 50,
        green: 214,
        blue: 21
    });

    this.addToWorld = function (w) {
        w.add(this.body);
    }

}

function River(x, z, width, depth) {
    this.x = x;
    this.z = z;
    this.width = width;
    this.depth = depth;

    this.body = new Plane({
        x: 0,
        y: this.x,
        z: this.z,
        width: this.width,
        height: this.depth,
        rotationX: -90,
        red: 20,
        green: 211,
        blue: 255
    });

    this.addToWorld = function (w) {
        w.add(this.body);
    }

}