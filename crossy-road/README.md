# Final Project: VR Crossy Road
Users can use VR Goggle or Dance Pad (to be decided) to move characters around to avoid the car.


## Object: Car()
### Argument
An opt Object that specifies:
```
    x,y,z  //those will be the center point of the lowerBody's upper surface's center
    height, width, depth //those will be lowerBody's height and width and depth
    red, green, blue // colors
    speed // initial moving speed
```
### Field:
```
speed // initial moving speed
tires, // array of Tires; populated automatically
upperBody, lowerBody, light   //main body of the car (Box, Box, Cone)
addToWorld(w) //a function that adds the car to the world w
move() // a function that make the car move according to the speed given in the field
```
### Usage:
```
world = new World('VRScene');
var car = new Car({
            x: random(-100, 100), y: w/3, z: offset,
            width:w, height:w/5,depth: random(1,2),
            red: random(255), green:random(255), blue:random(255),
            asset:"gold",
            speed: random(0.05, 0.3) * ( random(-1,1) > 0 ? 1 : -1)
        });
        car.addToWorld(world);
```

## Object: Tire()
### Argument
An opt Object that specifies:
```
    x,y,z  // position of the tire
    radius, radiusTubular //radius+radisTubular = the actual radius of the object
    red, green, blue // colors
```
### Field:
```
outerFrame, // outerFrame of the tire (Torus)
innerBars   //an array of 8 Box objects
addToWorld(w) //a function that adds the car to the world w
nudge(x,y,z) // a function that make the tire move in the direction specified
spin(s) //a function that makes the tire spin given a speed s
```
### Usage:
```
world = new World('VRScene');
var r = 2;
var tire = new Tire({
                  x: 2, y: 2, z: 2, radius: r/20*19, radiusTubular: r/20, red:0, green:0, blue:0
              });
        tire.addToWorld(world);
```
