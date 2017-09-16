/**
 * Created by seesaw on 2017/9/16.
 */
function Circle(x,y,c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.r = 1;
    this.growing = true;

    this.grow = function() {
        if(this.growing) {
            this.r += 0.2;
        }
    }

    this.show = function() {
        stroke(c);
        noFill();

        strokeWeight(2);
        ellipse(this.x, this.y, 2*this.r, 2*this.r);
    }

    this.edges = function() {
        return (this.x + this.r >= width ||
            this.x - this.r <= 0 ||
            this.y + this.r >= height ||
            this.y - this.r <= 0);
    }
}
