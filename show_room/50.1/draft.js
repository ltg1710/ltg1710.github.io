/**
 * Created by seesaw on 2017/9/16.
 */
var circles;
var spots;
var img;
var margin;

function preload() {
    img = loadImage("asserts/2017.png");
}

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);
    pixelDensity(1);
    img.loadPixels();
    spots = [];
    circles = [];

    for(var x=0; x<img.width;x++){
        for(var y=0; y<img.height;y++){
            var index = x+y*img.width;
            var c = img.pixels[index*4];
            var b = brightness(color(c));
            if(b>1){
                spots.push(createVector(x,y));
            }
        }
    }

    margin = new Object();
    margin.x = width/2 - img.width/2;
    margin.y = height/2 - img.height/2;

    console.log("window: width:"+width+",height:"+height);
    console.log("image: width:"+img.width+",height:"+img.height);
    console.log("spots: ", spots.length);
}

function draw()
{
    background(0);
    newCircles();
    checkOverlap();
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        circle.show();
        circle.grow();
    }
}

function newCircle() {
    var x = random(0, width);
    var y = random(0, height);
    var invalid = true;
    var spotted = false;

    for( var i = 0; i < circles.length; i++) {
        var c = circles[i];
        var d = dist(x, y, c.x, c.y);
        if(d-5 < c.r) {
            invalid = false;
            break;
        }
    }

    if(!invalid)
        return null;

    for(var i = 0; i < spots.length; i++){
        var p = spots[i];
        if(abs(x-p.x-margin.x) < 1  && abs(y -p.y-margin.y) < 1) {
            spotted = true;
            break;
        }
    }

    if(spotted) {
        return new Circle(x, y, color(255, 0, 0, 80));
    } else {
        return new Circle(x, y, color(0, 255, 0, 50));
    }
}

function newCircles() {
    var total = 10;
    var count = 0;
    var attempts=0;

    while(count < total) {
        var newC = newCircle();
        if(newC != null) {
            circles.push(newC);
            count ++;
        }
        attempts ++;
        if(attempts > 1000) {
            noLoop();
            console.log("done!");
            break;
        }
    }
}

function checkOverlap()
{
    for (var i = 0; i < circles.length; i++) {
        var c = circles[i];
        if (c.growing) {
            if (c.edges()) {
                c.growing = false;
            } else {
                for (var j = 0; j < circles.length; j++) {
                    var o = circles[j];
                    if (c !== o) {
                        var d = dist(c.x, c.y, o.x, o.y);
                        var distance = c.r + o.r;
                        if (d - 2 < distance) {
                            c.growing = false;
                            break;
                        }
                    }
                }

                if(c.c == color(0,255, 0, 50))
                {
                    for(var j = 0; j < spots.length; j++){
                        var p = spots[j];
                        var d = dist(c.x, c.y, p.x, p.y);
                        if(d-1<c.r) {
                            c.growing = false;
                            break;
                        }
                    }
                }
            }
        }
    }
}
