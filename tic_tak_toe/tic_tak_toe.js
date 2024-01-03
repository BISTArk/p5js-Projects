let players = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

let p1 = 'x';
let p2 = 'o';
let oe = 0;
let winner = null;
let cp;
let li = -1;

function setup() {
  createCanvas(400, 400);
  background(255);
  let w = width / 3;
  let h = height / 3;
}

function mousePressed() {
  oe += 1;
  if (oe % 2 == 1) {
    cp = p1;
  } else {
    cp = p2;
  }
  let w = width / 3;
  let h = height / 3;
  let j = floor(mouseX / w);
  let i = floor(mouseY / h);
  if (players[i][j] == '') {
    players[i][j] = cp;
  } else {
    oe -= 1;
  }
}

function draw() {
  strokeWeight(1);
  if (oe % 2 == 1) {
   stroke(255,0,0);
  } else {
   stroke(0,255,0);
  }
  line(0, height / 3, width, height / 3);
  line(0, 2 * height / 3, width, 2 * height / 3);
  line(width / 3, 0, width / 3, height);
  line(2 * width / 3, 0, 2 * width / 3, height);
stroke(0);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      if (players[j][i] == p1) {
        line(x - w / 4, y - h / 4, x + w / 4, y + h / 4);
        line(x - w / 4, y + h / 4, x + w / 4, y - h / 4);
      }
      if (players[j][i] == p2) {
        ellipse(x, y, w / 2);
      }
    }
  }
  let result = win();
  if (winner != null || oe == 9) {
    noLoop();
    winline(li);
    stroke(255);
    textSize(20);
    if(result != 'tie'){
    text(result,150,200);
    text('wins!!',200,200);}else{
      text('Tie!!',width/2-10,height/2);}
  }
}

function winline(n){
  strokeWeight(8);
  if (oe % 2 == 1) {
   stroke(0,255,0);
  } else {
   stroke(255,0,0);
  }
  if(n<3){
    line(width/8,height*(n/3)+height/6,7*(width/8),height*(n/3)+height/6)
  }
  else if(n<6){
    line(width*(2*n-5)/6,height/12,width*(2*n-5)/6,height*(11/12))
  }else if(n==6){
    line(width/12,height/12,width*(11/12),height*(11/12))
  }else if (n==7){
    line(width/12,height*(11/12),width*(11/12),height/12)
  }
  
  
  
}

function win() {

  for (let i = 0; i < 3; i++) {
    if (players[i][0] == players[i][1] && players[i][1] == players[i][2] && players[i][0] != '') {
      li = i;
      winner = cp;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (players[0][i] == players[1][i] && players[1][i] == players[2][i] && players[0][i] != '') {
      li = i+3;
      winner = cp;
    }
  }
  if (players[0][0] == players[1][1] && players[2][2] == players[1][1] && players[0][0] != '') {
    li = 6;
    winner = cp;
  }
  if (players[0][2] == players[1][1] && players[2][0] == players[1][1] && players[2][0] != '') {
    li = 7;
    winner = cp;
  }
  if (winner != null) {
    return winner;
  }

  if (winner == null && oe == 9) {
    return 'tie';
  }
}
