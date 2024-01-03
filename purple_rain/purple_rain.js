let drops = [];
function setup() {
createCanvas(840,420);
for(let i=0;i<300;i++){
drops[i] = new Drop();}
}


function draw() {
background(230,230,250);
for(let drop of drops){
  drop.update();
  drop.show();
} 
}

class Drop{
  constructor(){
    this.x = random(width);
    this.y = random(-500,-50);
    this.len = random(3,10);
    this.yspeed = map(this.len,3,10,4,10);
  }
  
  update(){
    this.y += this.yspeed;
    this.yspeed += map(this.len,3,10,0,0.2);
    
    if(this.y>height){
      this.y = random(-200,-100);
      this.yspeed = map(this.len,3,10,4,10);
    }
  }
  
  show(){
    strokeWeight(map(this.len,3,10,1,3));
    stroke(200,0,0);
    line(this.x,this.y,this.x,this.y+this.len);
  }

}
