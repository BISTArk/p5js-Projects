var n= 6;

function setup() {
createCanvas(800,800);
background(0);
}


function draw() {
translate(width/2,height/2);
stroke(255);
strokeWeight(4);
var mx = mouseX - width/2;
var my = mouseY - height/2;
var pmx = pmouseX - width/2;
var pmy = pmouseY - height/2;
if(mouseIsPressed){
  //line(pmx,pmy,mx,my);
for(let i=0;i<n;i++){


  rotate(PI/n);
  line(mx,my,pmx,pmy);
  scale(-1,1);
  line(mx,my,pmx,pmy);
}
}
}
