let obstacles = [];
let players = [];
let vel = 1;
let stop =0;
let score = 0;
let flag = 1;

function setup() {
createCanvas(400,400);
for(let i=0;i<10;i++){
 obstacles[i] = new Obstacle(random(width),random(height)); 
}
player = new Player(height,width/2);
//noLoop();
}

//function mousePressed(){
// if(flag==1){
//   loop();
//   flag*=-1;}
//   else{
//   noLoop();
// flag*=-1;}
//}

function draw() {
background(0);
for(let o of obstacles){
  o.update(random(3));
  o.show();
  player.end(o);
}
player.edges();
player.show();
score++;

if(stop==1){
  textSize(20);
  text('score',150,200);
  text(score,200,200);
  noLoop();}

}

class Obstacle{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.s = random(25,50);
  }
  
  update(m){
   this.pos.y += vel;
   vel+=0.0001*m;
   if(this.pos.y>height){
     this.pos.x = random(width-25);
     this.pos.y = 0;
     this.s = random(25,50)
   }
  }
  
  show(){
    strokeWeight(3);
    stroke(255,204,0);
    fill(255,0,0);
    ellipse(this.pos.x,this.pos.y,this.s);
  }
}


class Player{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.r = 25;
  }
  
  edges(){
    this.pos = createVector(mouseX,mouseY);
    if(this.pos.x-this.r<0){
      this.pos.x = this.r;}
    if(this.pos.x+this.r>height){
      this.pos.x = height-this.r;}
    if(this.pos.y-this.r<=0){
      this.pos.y = this.r;}
    if(this.pos.y+this.r>width){
      this.pos.y = width-this.r;} 
      
  }
  
  end(o){
   //let temp = o.pos.copy();
   //temp.x += o.s/2;
   //temp.y += o.s/2;
   let dist = p5.Vector.sub(o.pos,this.pos);
   let gap = abs(dist.mag());
   if(gap<(this.r+o.s)/2){
   stop = 1;}
  }
  
  show(){
    fill(0,0,255);
    ellipse(this.pos.x,this.pos.y,this.r);
    //this.r+=0.0001*score;
  }



}
