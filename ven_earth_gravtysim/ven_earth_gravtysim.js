let planets = [];
let smass = 2000000;

function setup() {
createCanvas(3000,3000);
frameRate(1000);
planets[0] = new planet(108,4.9,1.48);
planets[1] = new planet(150,60,1.07);
background(0);
}


function draw() {

translate(width/2,height/2);
ellipse(0,0,30);
for( let planet of planets){
  planet.force();
  planet.update();
  planet.show();}
  //planets[1].update();
  //planets[1].show();
  
}

class planet{
  constructor(r,m,v){
    this.r = r;
    this.pos = createVector(this.r,0);
    this.vel = createVector(0,v);
    this.acc = createVector(0,0);
    this.m = m;
  }
  
  force(){
    let spos = createVector(0,0);
    let force = p5.Vector.sub(spos,this.pos);
    let dsq = (force.magSq());
    let G = 0.000067;
    let strength = G *this.m * smass / dsq;
    //console.log(strength);
    force.setMag(strength);
    let f = p5.Vector.div(force,this.m);
    this.acc.add(f);
  }
    
  
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.setMag(0);
  }
  
  show(){
    stroke(200);
    ellipse(this.pos.x,this.pos.y,10);
   // line(this.r*cos(theta),this.r*sin(theta),0,0);
  }
}
