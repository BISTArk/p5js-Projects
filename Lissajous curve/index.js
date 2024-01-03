let a ,b,d,t;

let x=0,y=0;
let particles = [];

function setup() {
  createCanvas(800, 800);
  a = 10,
  b = 0,
  d = 0,
  t = 0;

  for(let i=0;i<500;i++){
    particles.push(new Particle(0,0,3,10));
  }
}

function draw() {
  background(255);
  strokeWeight(3);
  noFill();
  stroke(255);
  translate(width/2, height/2);
// t=0;
// beginShape();
//   for(let i=0;i<500;i++){
//     let x = (width/2) * sin((a * t));
//     let y = (height/2) * sin(b * t);
//     vertex(x, y);
//     t+=0.01;
//   }
// endShape();
// b+=0.01;
// if(b>=10)noLoop();
// console.log(b);
// a+=0.02;


t=0;
  for(let i=0;i+1<particles.length;i+=2){
    let x = (width/2) * sin((a * t));
    let y = (height/2) * sin(b * t);
    particles[i].setXY(x,y);
    particles[i].show(3);
    x = (width/2) * sin((a * -1 *t));
    y = (height/2) * sin(b * -1 *t);
    particles[i+1].setXY(x,y);
    particles[i+1].show(3);
    t+=0.01;
  }
b+=0.01;
if(b>=10)noLoop();
console.log(b);
}

class Particle{

  constructor(x,y,r,dis){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = random(-dis,dis);
    this.yspeed = random(-dis,dis);
  }

  move(){
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    this.xspeed = random(-dis,dis);
    this.yspeed = random(-dis,dis);
  }

  setXY(x,y){
    this.x = x;
    this.y = y;
  }

  show(disr){
    stroke(255);
    stroke(random(255),random(255),random(255));
    fill(random(255),random(255),random(255));
    circle(this.x, this.y, this.r+random(-disr,disr));
  }
}
