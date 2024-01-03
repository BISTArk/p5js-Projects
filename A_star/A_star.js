var rows = 25;
var cols = 25;
var w;
var h;
var b;
var nodes = new Array(rows);
var start;
var end;
var openSet = [];
var closedSet = [];
var path = [];

var n = 0;

function removeEle(a, key) {

  for (let i = 0; i < a.length; i++) {

    if (a[i] == key) {
      a.splice(i, 1);
    }
  }


}

function heurestic(a, b) {

  var d = dist(a.i, a.j, b.i, b.j);
  return d;

}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < rows; i++) {
    nodes[i] = new Array(cols);
  }

  w = width / cols;
  h = height / rows;


  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (random(1) < 0.3) {
        b = true;
      }
      nodes[i][j] = new node(i, j, b);
      b = false;

    }
  }
  start = nodes[0][0];
  end = nodes[rows - 1][cols - 1];
  openSet.push(start);
  start.isWall = false;
  end.isWall = false;
  current = start;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      nodes[i][j].neigh(nodes);
    }
  }
}

function draw() {
  background(220);
  if (openSet.length >= 0) {
    var small = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[small].f) {

        small = i;
      }
    }
    var current = openSet[small];
    if (current == end) {
      console.log("DONE");
      noLoop();

    }

    removeEle(openSet, current);
    closedSet.push(current);
console.log(n);
    n++;
    for (let i = 0; i < current.neighbours.length; i++) {
      var neighbour = current.neighbours[i];
      if (!neighbour.isWall && !closedSet.includes(neighbour)) {
        var tg = current.g + 1;
        if (openSet.includes(neighbour)) {
          if (tg < neighbour.g) {
            neighbour.g = tg;
            neighbour.h = heurestic(neighbour, end);
            neighbour.f = neighbour.g + neighbour.h;
            neighbour.prev = current;
          }
        } else {
          openSet.push(neighbour);
          neighbour.g = tg;
          neighbour.h = heurestic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.prev = current;
        }
      }

    }

  } else {

    console.log('No solution');
    noLoop();
  }

  path = [];
  var temp = current;
  while(temp){
  path.push(temp);
    temp = temp.prev;}
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      nodes[i][j].show();

    }
  }
  for (let i = 0; i < openSet.length; i++) {

    openSet[i].show('green');
  }

  for (let i = 0; i < closedSet.length; i++) {

    closedSet[i].show('red');
  }
  for (let i = 0; i < path.length; i++) {

    path[i].show('blue');
  }
}

class node {
  constructor(i, j, b) {
    this.i = i;
    this.j = j;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.isWall = b;
    this.neighbours = [];
    this.prev = undefined;

  }

  show(col) {
    fill(255);
    if (col) {
      fill(col);
    }
    if (this.isWall) {
      fill(0);
    }
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  neigh(grid) {

    if (this.i > 0) {
      this.neighbours.push(grid[this.i - 1][this.j]);
    }
    if (this.j > 0) {
      this.neighbours.push(grid[this.i][this.j - 1]);
    }
    if (this.i < rows - 1) {
      this.neighbours.push(grid[this.i + 1][this.j]);
    }
    if (this.j < cols - 1) {
      this.neighbours.push(grid[this.i][this.j + 1]);
    }

  }


}
