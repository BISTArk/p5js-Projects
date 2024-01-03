var cols, rows;
var w = 20;
var cells;
var stack = [];
var v = 0;
var current;
var now;
var start;
var end;
var openset = [];
var closedset = [];
var path = [];

function removeWall(a, b) {
  if (a.x - b.x == 1) {
    a.blocked[3] = false;
    b.blocked[1] = false;
  }
  if (a.x - b.x == -1) {
    a.blocked[1] = false;
    b.blocked[3] = false;
  }
  if (a.y - b.y == 1) {
    a.blocked[0] = false;
    b.blocked[2] = false;
  }
  if (a.y - b.y == -1) {
    a.blocked[2] = false;
    b.blocked[0] = false;
  }
}

function heur(a) {
  let d = dist(a.x, a.y, end.x, end.y);
  return d;
}

function del_ele(a, key) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] == key) {
      a.splice(i, 1);
    }
  }
}

function setup() {
  createCanvas(800, 800);
  cols = width / w;
  rows = height / w;
  cells = new Array(rows);
  for (let i = 0; i < rows; i++) {
    cells[i] = new Array(cols);
  }


  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      cells[i][j] = new cell(i, j);
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      cells[i][j].find_n(cells);
    }
  }
  current = cells[0][0];
  current.visited = true;
  v++;
  start = cells[0][0];
  end = cells[rows - 1][cols - 1];
  start.f = start.h = heur(start);
  openset.push(start);
  cells[0][0].g = 0;
}

function draw() {
  background(0);
  //frameRate(5);

  // maze generaating
  if (v < rows * cols) {

    let nner = [];
    for (let f = 0; f < current.neigh.length; f++) {

      if (!current.neigh[f].visited) {
        nner.push(current.neigh[f]);
      }

    }
    if (nner.length > 0) {
      stack.push(current);
      v++;
      let next = random(nner);
      //console.log(next);
      removeWall(current, next);
      current.opennei.push(next);
      current = next;
      current.visited = true;
    } else if (stack.length > 0) {
      current = stack.pop();
    }

  }

  //Path finding
  else {

    if (openset.length > 0) {
      let small = 0;
      for (let p = 0; p < openset.length; p++) {
        if (openset[small] > openset[p].f) {
          small = p;
        }
      }
      now = openset[small];
      if (now == end) {
        console.log("DDDone");
        noLoop();
      }
      del_ele(openset, now);
      closedset.push(now);
      for (let p = 0; p < now.opennei.length; p++) {
        let nei = now.opennei[p];
        let tg = now.g + 1;
        //console.log(nei.g);

        if (tg < nei.g) {
          nei.prev = now;
        //  console.log(now);
          nei.g = tg;
          nei.h = heur(nei);
          nei.f = nei.g + nei.h;
        }
        if (!openset.includes(nei)) {
          openset.push(nei);
          //console.log(openset.length);
        }
      }
    } else {
      console.log("Not Possible!");
      noLoop();
    }
    // console.log("Done!");

  }

  path = [];
  var temp = now;
  //  console.log(temp);
  while (temp) {
    path.push(temp);
    temp = temp.prev;
  }
  // console.log(path.length);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      cells[i][j].show('red');

    }
  }
  start.show('black');
  end.show('green');
  beginShape();
  noFill();
  for (let q = 0; q < path.length; q++) {
    stroke(255,0,255);
    vertex(path[q].x * w + w / 2, path[q].y * w + w / 2);
  }
  endShape();



}



class cell {

  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.visited = false;
    this.blocked = [true, true, true, true];
    this.neigh = [];
    this.f = 0;
    this.g = rows * cols + 2;
    this.h = 0;
    this.prev;
    this.opennei = [];
  }

  find_n(grid) {

    if (this.x < rows - 1) {
      this.neigh.push(grid[this.x + 1][this.y]);
    }
    if (this.x > 0) {
      this.neigh.push(grid[this.x - 1][this.y]);
    }
    if (this.y < cols - 1) {
      this.neigh.push(grid[this.x][this.y + 1]);
    }
    if (this.y > 0) {
      this.neigh.push(grid[this.x][this.y - 1]);
    }
  }

  show(col) {
    stroke(255);
    strokeWeight(2);
    let x = this.x * w;
    let y = this.y * w;
    if (this.blocked[0]) {
      line(x, y, x + w, y);
    }
    if (this.blocked[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.blocked[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.blocked[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(col);
      square(x, y, w);
    }
  }
}
