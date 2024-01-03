let particles = [];
let k=3;
let startKmeans=false;
let timer=0;
let centers = [];
let randomPoints = 50; //Nuber of randomly initialized points
let cols = ['white','red','green','blue'];

function setup() {
  createCanvas(800, 800);  

  for(let i=0;i<randomPoints;i++){
    if(particles.length<k){
      let tx = random(0, 1)*width;
      let ty = random(0, 1)*height;
      particles.push(createVector(tx, ty,particles.length+1));
      centers.push(createVector(tx, ty,particles.length));
    }
    else 
    particles.push(createVector(random(0, 1)*width, random(0, 1)*height,0));
  }
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  for (let x of particles) {
    fill(cols[x.z]);
    circle(x.x,x.y,3);
  }
  for (let x of centers) {
    fill(cols[x.z]);
    circle(x.x,x.y,5);
  }
  
  if(startKmeans){
    if(timer>=99 && kmean()){
      
      console.log("DoNE");
      noLoop();
    }
    timer+=1;
    timer%=100;
  }
}

function keyPressed(){
  if(keyCode== ENTER){
    startKmeans=!startKmeans;
    console.log(startKmeans);
  }
}

function distan(a,b){
  return sqrt(pow(a.x-b.x,2)+pow(a.y-b.y,2))
}

function kmean(){
  let tdis = 0,cente = 0;
  for (let x of particles) {
    minn=1000;
    cente=1;
    for (let center of centers) {
      let tdisa=distan(center,x);
      if(minn>=tdisa){
        cente=center.z;
        minn=tdisa;
      }
    }
    x.z=cente;
  }
  
  let tp = [];
  let counts=[];
  let prevCenters =[];
  for (let x of centers) {
    let temp=x.copy();
    prevCenters.push(temp);
    x.x=0;
    x.y=0;
    tp.push(createVector(0,0));
    counts.push(0);
  }
  for (const x of particles) {
    counts[x.z-1]++;
    tp[x.z-1].x+=x.x;
    tp[x.z-1].y+=x.y;    
  }
  tdis=0;
  for (let i=0;i<centers.length;i++) {
    centers[i].x = tp[i].x/counts[i];
    centers[i].y = tp[i].y/counts[i];
    tdis+=distan(centers[i],prevCenters [i]);
  }
  return (tdis<0.01);
}

function mousePressed(){
  if(particles.length<k){
    particles.push(createVector(mouseX, mouseY,particles.length+1));
    centers.push(createVector(mouseX, mouseY,particles.length));
  }
  else 
  particles.push(createVector(mouseX, mouseY,0));
}

