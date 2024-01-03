let x=0;
let y=0;
let sc=10;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  stroke(255);
  if(random(1)>0.4)  
  line(x,y,x+sc,y+sc);
  else 
  line(x,y+sc,x+sc,y);
  
  x+=sc;
  if(x>width){
    x=0;
   y+=sc; 
  }
}
