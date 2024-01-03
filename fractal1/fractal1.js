var t=0;

function setup() {
createCanvas(800,800);

}


function draw() {
background(0);
translate(width/2,height);
t = map(mouseX,0,width,0,PI/2);
stroke(255);
strokeWeight(2);
branch(height/4);
}

function branch(a){
  if(a>4){
    strokeWeight(a/20);
  line(0,0,0,-a);
  translate(0,-a);
  push();
  rotate(t);
  branch(a*0.67);
  pop();
  push();
  rotate(-t);
  branch(a*0.67);
pop();}
}
