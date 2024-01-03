let movers = [];
let attractor;

function setup() {
createCanvas(600,600);
for (let i=0;i<10;i++){
  let x = random(width);
  let y =random(height);
  let m = 10;
 movers[i] = new Mover(x,y,m);
}
attractor = new Attractor(width/2,height/2,100);
background(0);

}


function draw() {
background(0,25);

for( let mover of movers){
  mover.update();
  mover.show();
  attractor.attract(mover);
}
  attractor.show();
  
}

class Mover{
  constructor(x,y,m){
   this.pos = createVector(x,y);
   this.mass = m;
   this.vel = p5.Vector.random2D();
   this.vel.mult(5);
   this.acc = createVector(0,0);
   this.r = sqrt(m)*2;
  }
  
  applyforce(fo){
    let f = p5.Vector.div(fo,this.m);
    this.acc.add(f);
  }
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.setMag(0);
  }
  
  show(){
    fill(100);
    strokeWeight(2);
    stroke(200);
    ellipse(this.pos.x,this.pos.y,this.r*2);
  }
}


class Attractor{
 constructor(x,y,m){
   this.pos = createVector(x,y);
   this.mass = m;
   this.r = sqrt(m)*2;
 }
 
   attract(mover){
   let  force = p5.Vector.sub(this.pos,mover.pos);
   let dsq = constrain(force.magSq(),100,1000);
   let G = 0.5;
   let strength = G *this.mass * mover.mass / dsq;
   force.setMag(strength);
   mover.applyforce(force);
  }
 
 show(){
   fill(255,0,0);
   stroke(150);
   ellipse(this.pos.x,this.pos.y,this.r*2);
 }
   
}
