var tot = 10;
var h = 10;
var w = 0;
var ang = 0;

function setup() {
createCanvas(400,400);
}


function draw() {
background(0);
translate(width/2 , height/2);
// w = map(floor(sin(ang)),0,1,0,50);
// w = map(sin(ang),-1,1,0,50);
h= 10;
line(0,height/2,0,-height/2);
line(0,width/2,0,-width/2);
stroke(255);
strokeWeight(2);
noFill();
for(let i=1;i<=tot;i++){
  w = map(abs(sin(ang)),0,1,70,0);
  ellipse(i*sin(ang)*20,0,w,70/log(h));

  ang += 0.005;
  h-=1;
}
}
