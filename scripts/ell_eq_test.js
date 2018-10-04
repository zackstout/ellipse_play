
let THETA = 0;
let R = 100;

let w, h;

let a, b, c;
let ellipses = [];

// let stgs = {
//   add: 100 * Math.cos(THETA),
//   mu: 10,
//   m: 1,
//   r: 10000
// };

function moveAround() {
  // 1/r = C * cos(THETA) + mu / (h^2), where mu = G*M and h = L / m

  let add = 30000 * cos(THETA);
  let mu = 1000;
  let m = 10;
  // console.log(1 / (add + mu/(Math.pow(1/m, 2))));

  THETA += 0.035;
  R = 10000000 * (1 / (add + mu/(Math.pow(1/m, 2))));

  // Was using to draw full elliptical path:
  // ellipses.push(new Ellipse(R, THETA));

  // why is this basically the same as previous with reciprocal???
  // R = (add + mu/(Math.pow(1/m, 2))) / 1000;
  // console.log(R);
}


function setup() {
  w = 600;
  h = 600;
  createCanvas(w, h);
  background(200);

  const max_rad = 10000000 * (1 / (30000 * cos(PI) + 1000/(Math.pow(1/10, 2))));
  const vert_rad = 10000000 * (1 / (30000 * cos(PI/2) + 1000/(Math.pow(1/10, 2)))); // is 100, makes sense
  const min_rad = 10000000 * (1 / (30000 * cos(0) + 1000/(Math.pow(1/10, 2))));
  // console.log(max_rad, vert_rad, min_rad);

  // Ok just need to do some math to calculate the eccentricity and locate other focus:
  a = (max_rad + min_rad) / 2;
  b = vert_rad;
  c = Math.pow(a*a - b*b, 0.5);

  // console.log(a, b, c);
}

// was using to draw full elliptical path to ensure it was symmetrical about foci:
// class Ellipse {
//   constructor(r, a) {
//     this.r = r;
//     this.a = a;
//   }
//
//   draw() {
//     push();
//     translate(w/2, h/2);
//     rotate(this.a);
//     fill('gray');
//     ellipse(this.r, 0, 5);
//     pop();
//   }
// }

function draw() {
  background(200);
  noStroke();

  moveAround();

  push();
  translate(w/2, h/2);
  rotate(THETA);

  // Draw orbiting planet:
  fill('cornflowerblue');
  ellipse(R, 0, 5);

  // Draw irrelevant focus:
  fill('yellow');
  ellipse(0, 0, 5);
  pop();

  // Draw relevant focus:
  ellipse(w/2 - (a - c), h/2, 5);

  // was using to draw elliptical path:
  // ellipses.forEach(e => e.draw());
}
