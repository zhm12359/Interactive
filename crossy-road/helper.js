function isPointInsideRect(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    return ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2))
}

function layoutMap(w){

    var grass1 = new Grass(0, -45, 100, 15);
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