let movers = [];

function setup() {
createCanvas(600,600);

for(let i=0;i<10;i++){
  movers[i] = new Mover(random(width),100,random(5));
}

}


function draw() {
background(0);
line(0,200,width,200);
let gravity = createVector(0,100);
let wind = createVector(0.1,0);

for (let mover of movers){
  let weight = p5.Vector.mult(gravity,mover.mass);
  mover.applyforce(weight);
  if(mouseIsPressed){
    mover.applyforce(wind);
  }
  if(mover.pos.y>=200){
  mover.drag(0.0015,0.4);}
  mover.update();
  mover.edges();
  mover.show();
}


}

class Mover{
 constructor(x,y,m){
   this.pos = createVector(x,y);
   this.vel = createVector(0,0);
   this.acc = createVector(0,0);
   this.mass = m;
   this.r = sqrt(this.mass)*10;
   this.area = PI*this.r*this.r;
 } 
 
 applyforce(force){
   let f = p5.Vector.div(force,this.mass);
   this.acc.add(f);
 }
 
 update(){
   this.vel.add(this.acc);
   this.pos.add(this.vel);
   this.vel.limit(5);
   this.acc.set(0,0);
 }
 
 drag(c,ro){
   let v = this.vel.copy();
   v.normalize();
   let vmag = this.vel.mag();
   v.setMag(vmag*vmag*c*ro*-1*this.area/2);
   this.applyforce(v);
   
 }
   
 
 edges(){
   if(this.pos.x-this.r<=0){
     this.pos.x = this.r;
     this.vel.x *= -1;
   }
   if(this.pos.x+this.r>=width){
     this.pos.x = width-this.r;
     this.vel.x *= -1;
   }
   if(this.pos.y-this.r<=0){
     this.pos.y = this.r;
     this.vel.y *= -1;
   }
   if(this.pos.y+this.r>=height){
     this.pos.y = height-this.r;
     this.vel.y *= -1;
   }
 }
   
 show(){
   strokeWeight(2);
   stroke(200);
   fill(100);
   ellipse(this.pos.x,this.pos.y,2*this.r);
 }
   
}
