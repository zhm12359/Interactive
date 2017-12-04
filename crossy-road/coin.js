function Coin(opts) {

    this.x = opts.x;
    this.z = opts.z;
    this.size = 1;

    this.body = new Box({
        x: this.x,
        y: .8,
        z: this.z,
        height: 1,
        width: 1,
        depth: .1,
        red: 244,
        green: 223,
        blue: 6
    });

    this.marker = new Octahedron({
        x: this.x,
        y: 5,
        z: this.z,
        scaleY: 1.5,
        red: 0,
        blue: 0,
        green: 255,
        opacity: .5
    });

    this.addToWorld = function (w) {
        w.add(this.body);
        w.add(this.marker);
    };

}