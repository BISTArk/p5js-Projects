let a = 50;
// let colors = ['#BDFFFD', '#5e6973', '#9FFFF5','#7CFFC4','6ABEA7'];
let colors = ['#9AB889','#556F90','1E4D6C','#2B394B'];
function setup() {
  createCanvas(400,400);
  drawtri();


}

function mouseClicked(){
drawtri();
}

function drawtri(){
  background(0);
  noStroke();
  for (let i = 0; i < height/a; i++) {
    for (let j = 0; j < width/a; j++) {
      fill(random(colors));
      if(random()<0.5){
      triangle(i*a, j*a, i*a+a, j*a, i*a+a, j*a+a);
      fill(random(colors));
      triangle(i*a, j*a, i*a, j*a+a, i*a+a, j*a+a);
      }else{
      triangle(i*a, j*a, i*a, j*a+a, i*a+a, j*a);
      fill(random(colors));
      triangle(i*a+a, j*a, i*a+a, j*a+a, i*a, j*a+a);
      }
    }
  }
}

// function draw() {
// translate(width/2 , height/2);
// // w = map(floor(sin(ang)),0,1,0,50);
// // w = map(sin(ang),-1,1,0,50);
// h= 10;
// line(0,height/2,0,-height/2);
// line(0,width/2,0,-width/2);
// stroke(255);
// strokeWeight(2);
// noFill();
// for(let i=1;i<=tot;i++){
//   w = map(abs(sin(ang)),0,1,70,0);
//   ellipse(i*sin(ang)*20,0,w,70/log(h));

//   ang += 0.005;
//   h-=1;
// }
// }
