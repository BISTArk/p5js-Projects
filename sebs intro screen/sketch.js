let drops = [];
let sticks = [];
let noVerts = 15;
let loopy = 1;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < noVerts; i++) {
    drops[i] = new Drop(random(10, width - 10), random(10, height - 10));
  }
  drops[noVerts] = new Drop(-10, -10);
  drops[noVerts + 1] = new Drop(-10, height + 10);
  drops[noVerts + 2] = new Drop(width + 10, height + 10);
  drops[noVerts + 3] = new Drop(width + 10 - 10);
}

function draw() {
  background(20);
  for (let i = 0; i < noVerts; i++) drops[i].move();
  for (let drop of drops) {
    drop.draw(drops);
  }

  for (let stick of sticks) {
    stick.draw(sticks);
  }

  sticks = [];
}

function mousePressed() {
  loopy *= -1;
    if (loopy === 1) noLoop();
    else loop();
}


class Drop {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.v = p5.Vector.random2D();
    // console.log(this.pos);
  }

  move() {
    //boundary conditions
    if (this.pos.x < 0) this.pos.x = width + this.pos.x;

    if (this.pos.x > width) this.pos.x = this.pos.x - width;

    if (this.pos.y < 0) this.pos.y = height + this.pos.y;

    if (this.pos.y > height) this.pos.y = this.pos.y - height;

    // let v = p5.Vector.random2D();
    let a = p5.Vector.random2D().mult(0.1);
    this.v.add(a);
    this.v.setMag(0.8);

    this.pos.add(this.v);
  }

  draw(objects) {
    fill(255);
    noStroke();
    circle(this.pos.x, this.pos.y, 4);

    for (const temp of objects) {
      stroke(200);
      sticks.push(new stick(temp.pos.x, temp.pos.y, this.pos.x, this.pos.y));
    }
  }
}

class stick {
  constructor(x1, y1, x2, y2) {
    this.p1 = createVector(x1, y1);
    this.p2 = createVector(x2, y2);
  }

  dist(p1, p2) {
    let d = new p5.Vector(p1.x - p2.x, p1.y - p2.y).mag();
    return d;
  }

  cross(a, b, v) {
    let vec1 = createVector(a.x - b.x, a.y - b.y);
    let vec2 = createVector(v.x - b.x, v.y - b.y);

    return vec1.x * vec2.y - vec1.y * vec2.x;
  }

  intersect(p1, p2, p3, p4) {
    if (
      this.cross(p1, p2, p3) * this.cross(p1, p2, p4) < 0 &&
      this.cross(p3, p4, p1) * this.cross(p3, p4, p2) < 0
    ) {
      return true;
    }
  }

  draw(objects) {
    let dng = true;
    for (const temp of objects) {
      if (this.intersect(this.p1, this.p2, temp.p1, temp.p2)) {
        if (this.dist(this.p1, this.p2) > this.dist(temp.p1, temp.p2)) {
          dng = false;
        }
      }
    }

    if (dng) {
      line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
  }
}
