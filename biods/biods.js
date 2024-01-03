let flock = [];

let alignS, cohesionS, seperationS;

function setup() {
  createCanvas(800, 600);

  alignS = createSlider(0, 2, 0.3, 0.1);
  cohesionS = createSlider(0, 0.5, 0.08, 0.01);
  seperationS = createSlider(0, 1, 0.1, 0.01);

  for (let i = 0; i < 100; i++) {
    flock.push(new boid());
  }
  for (let b of flock) {
    console.log(b.pos);
  }
}

function mousePressed() {
  for (b of flock) {
      b.pos = createVector(random(0, width), random(0, height));
  }
}

function draw() {
  background(52);

  //   translate(width / 2, height / 2);
  for (b of flock) {
    b.show();
    b.align(flock);
    b.cohesion(flock);
    b.seperation(flock);
    b.move();
  }
}
