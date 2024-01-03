class boid {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.vel = p5.Vector.random2D().mult(3);
    this.vel.setMag(1);
    this.acc = createVector();
    this.max_speed = 2;
  }

  align(boids) {
    let avg = createVector();
    let proxy = 50;
    let mate_no = 0;
    let max_alignment_force = alignS.value();

    for (let mate of boids) {
      if (mate.pos.dist(this.pos) < proxy && mate != this) {
        avg.add(mate.vel);
        mate_no++;
      }
    }
    if (mate_no) {
      avg.div(mate_no);
      avg.limit(max_alignment_force);
    }
    this.vel.add(avg);
    this.vel.setMag(this.max_speed);
  }

  cohesion(boids) {
    let avg = createVector();
    let proxy = 50;
    let mate_no = 0;
    let max_pos_force = cohesionS.value();

    for (let mate of boids) {
      if (mate.pos.dist(this.pos) < proxy && mate != this) {
        avg.add(mate.pos);
        mate_no++;
      }
    }
    if (mate_no) {
      avg.div(mate_no);
      avg.sub(this.pos);
      avg.setMag(max_pos_force);
    }
    this.vel.add(avg);
    // this.vel.setMag(this.max_speed);
  }

  seperation(boids) {
    let avg = createVector();
    let proxy = 50;
    let mate_no = 0;
    let max_sep_force = seperationS.value();

    for (let mate of boids) {
      if (mate.pos.dist(this.pos) < proxy && mate != this) {
        avg.add(p5.Vector.sub(this.pos, mate.pos).div(mate.pos.dist(this.pos)));
        mate_no++;
      }
    }
    if (mate_no) {
      avg.div(mate_no);
      avg.setMag(max_sep_force);
    }
    this.vel.add(avg);
    this.vel.setMag(this.max_speed);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(this.max_speed);
  }

  show() {
    noStroke();

    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }

    fill(255);

    circle(this.pos.x, this.pos.y, 8);
    // stroke(255);
    // fill(200, 50);
    // circle(this.pos.x, this.pos.y, 50);
  }
}
