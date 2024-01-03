function setup() {
  createCanvas(500,400);
  background(0);


}
let x=0;
let y=0,ys=2,xs=1;

function draw() {
  
  //noStroke();
  if(x>width||x<0){
    xs*=-1;}
    if(y>height||y<0){
    ys*=-1;
    }
    y+=ys;
    x+=xs;
  circle(x,y,10);

}
