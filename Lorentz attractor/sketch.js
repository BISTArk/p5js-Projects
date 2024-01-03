let x= 0.01;
let y =0;
let z = 0;

let dt = 0.01;

let a = 10;
let b = 28;
let c = 8.00/3.00;

let points = new Array();

function setup() {
  createCanvas(400, 400);
  translate(width/2,height/2)
}

function draw() {
  background(0);
  
  let dx = a * (y - x);
  let dy = x * (b -z) - y;
  let dz = x * y - c * z;
  
  x += dx*dt;
  y += dy*dt;
  z += dz*dt;
  
  points.push(new p5.Vector(x,y,z));
  
  //translate(width/2,height/2);
  scale(3);
  stroke(255);
  strokeWeight(2);
  //noFill();
  beginShape();
  for (let p of points){
    point(p.x,p.y);
  }
  endShape();
}