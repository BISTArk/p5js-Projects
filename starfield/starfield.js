let stars = [];
let vel;

function setup() {
createCanvas(600,600);

for (let i=0;i<500;i++){
  stars[i]=new star();
}

}


function draw() {
background(0);
vel = map(mouseX,-width,width,2,10);
//vel = 10;
translate(width/2,height/2);
for(s of stars){
  s.show();
  s.update();
}
}

class star{
constructor(){
  this.x = random(-width/2,width/2);
  this.y = random(-height/2,height/2);
  this.z = random(width);
}

update(){
  this.z-=vel;
  if(this.z<0){
    this.z = width;
  }
}

show(){
  let z = map(this.z,0,width,0.00001,1);
  let nx = this.x/z;
  let ny = this.y/z;
  let px = this.x/(z+vel);
  let py = this.y/(z+vel);
  line(nx,ny,px,py);
 ellipse(nx,ny,5);  
}


}
