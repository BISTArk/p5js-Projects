var squares = [];
var psquares = [];
var n=0;

function setup() {
createCanvas(600,600);
squares.push(new sq(0,0,width));
psquares = squares;
background(0);
}


function draw() {
//background(0);
if(n%60==0){
squares = [];
for(let i=0;i<psquares.length;i++){
  var m = 0;
  var squ = psquares[i];
  if(squ.a<=2){noLoop();}
  for(let j=0;j<3;j++){
    for(let k = 0;k<3;k++){
      if(j == 1 && k == 1){
        m=1;}
        else{m=0;}
      squares.push(new sq(squ.x+(j*squ.a/3),squ.y+(k*squ.a/3),squ.a/3,m));
    }
  }
}
  psquares = squares;
  
  for(let i = 0;i<psquares.length;i++){
    if(psquares[i].m){
   psquares[i].show();} 
  }}
  n++;
  //noLoop();
}

class sq{
 constructor(x,y,a,m){
   this.x = x;
   this.y = y;
   this.a = a;
   this.m = m;}
   
   
   show(){
     noStroke();
     if(this.m){
       fill(255);
     }else{fill(0);}
     square(this.x,this.y,this.a);
   }
}
