function Blob(x_,y_,r_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0,0);
    this.radius = r_;

    this.update = function() {
        var v = createVector(mouseX-width/2, mouseY-height/2);
        v.setMag(3);
        this.vel.lerp(v,0.1);
        this.pos.add(this.vel);
    }

    this.eat = function(o) {
        var d = this.pos.dist(o.pos);
        if(d < this.radius + o.radius) {
            var sum = PI*this.radius*this.radius + PI*o.radius*o.radius;
            this.radius = sqrt(sum/PI);
            return true;
        } else {
            return false;
        }
    }

    this.show = function() {
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius*2);
    }
}
