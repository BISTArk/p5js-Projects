let vid;
let a = 10;
let sizx = 40;
let sizy = 40;
let ascii = "Ñ@#W$9876543210?!abc;:+=-,._  ";
let finText = "";
let textyDiv;
// let ascii = '@#0%+=|i-:.  ';

function preload() {
  vid = createCapture(VIDEO);
  vid.size(sizx, sizy);
  vid.hide();
}

function setup() {
  // createCanvas(sizx * a, sizy * a);
  // background(150);
  noCanvas();
  console.log(vid.width, vid.height);
  textSize(a);
  fill(255);
  // vid.loadPixels();
  textFont("courier");
  textyDiv = createDiv("");
  // console.log(vid.pixels.length);
}

function draw() {
  let noiseVal = noise(frameCount * 0.1) * a;
  finText = "";
  // let noiseVal = random(a/4,a/2)
  // console.log(noiseVal);
  vid.loadPixels();
  // background(0);
  for (let y = 0; y < vid.height; y++) {
    for (let x = 0; x < vid.width; x++) {
      let r = vid.pixels[0 + x * 4 + y * vid.width * 4];
      let g = vid.pixels[1 + x * 4 + y * vid.width * 4];
      let b = vid.pixels[2 + x * 4 + y * vid.width * 4];
      //let a = vid.pixels[3+(x*4)+(y*width*4)]
      let gray = (r + g + b) / 3;
      let tsiz = floor(map(gray, 0, 255, 0, 2 * a));

      //Squary filter

      // fill(gray);
      // fill(r,g,b);
      // square(x * a , y * a , tsiz+noiseVal);

      //Ascii filter

      let bind = floor(map(gray, 0, 255, ascii.length - 0.1, 0));
      let ch = ascii[bind];
      // fill(r,g,b);
      // textSize(tsiz)
      // text(ch, x * a, y * a);

      if (ch == ' ') {
        finText += "&nbsp;";
      } else {
        finText += ch;
      }
    }
    finText += "</br>";
  }

  textyDiv.html(finText);
  vid.updatePixels();
}
