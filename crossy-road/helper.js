function isPointInsideRect(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    return ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2))
}

function layoutMap(w){

    var grass1 = new Grass(0, -45, 100, 10);
    grass1.addToWorld(w);

    var road1 = new Road(0, -30, 100, 20, 4);
    road1.addToWorld(w);

    var grass2 = new Grass(0, -15, 100, 10);
    grass2.addToWorld(w);

    var river = new River(0,0,100,20 );
    river.addToWorld(w);

    var grass3 = new Grass(0, 15, 100, 10);
    grass3.addToWorld(w);

    var road2 = new Road(0, 30, 100, 20, 4);
    road2.addToWorld(w);

    var grass4 = new Grass(0, 45, 100, 10);
    grass4.addToWorld(w);


}

function layoutCars(wo) {

    var offset = -36;
    var w = 4;

    for (var i = 0; i < 4; i++) {
        var car = new Car({
            x: 0, y: w / 3, z: offset,
            width: w, height: w / 5, depth: random(1, 2),
            red: random(255), green: random(255), blue: random(255),
            asset: "gold",
            speed: random(0.05, 0.3) * ( random(-1, 1) > 0 ? 1 : -1)
        });
        car.addToWorld(wo);
        cars.push(car);
        offset += 4;
    }

    offset = 24;

    for (var i = 0; i < 4; i++) {
        var car = new Car({
            x: 0, y: w / 3, z: offset,
            width: w, height: w / 5, depth: random(1, 2),
            red: random(255), green: random(255), blue: random(255),
            asset: "blue",
            speed: random(0.05, 0.3) * ( random(-1, 1) > 0 ? 1 : -1)
        });
        car.addToWorld(wo);
        cars.push(car);
        offset += 4;
    }
}


function layoutLogs(w) {

    var riverOffset = -8;
    for (var row = 0; row < 5; row++) {
        var numLogs = random(2, 5);
        for (var i = 0; i < numLogs; i++) {
            var width = random(4, 7);
            var log = new Log({
                x: random(-43, 43), y: 0, z: riverOffset,
                width: width, height: 1, depth: 4,
                xSpeed: random(0.05, 0.1) * (row % 2 === 0 ? 1 : -1), ySpeed: 0, zSpeed: 0
            });
            log.addToWorld(w);
            logs.push(log);
        }
        riverOffset += 4;
    }

}