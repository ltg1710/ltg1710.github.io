/**
 * Created by seesaw on 2017/9/18.
 */
var blob;
var blobs=[];
var done=false;
var zoom = 1;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    blob = new Blob(0, 0, 64);
    for(var i = 0; i < 30; i++) {
        blobs.push(new Blob(random(-width, width), random(-height, height), 16));
    }
}

function draw() {
    background(0);
    translate(width/2, height/2);
    var newzoom = 64/blob.radius;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    fill(0, 255, 120, 40);
    for(var i=blobs.length-1;i>=0;i--) {
        var b = blobs[i];
        b.show();
        if(blob.eat(b)) {
            blobs.splice(i, 1);
        }
    }

    fill(0, 120, 255, 80)
    blob.show();
    blob.update();
}
