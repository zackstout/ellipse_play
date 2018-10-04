
let THETA = 0;
let R = 100;

let w, h;

let stgs = {
  add: 100 * Math.cos(THETA),
  mu: 10,
  m: 1,
  r: 10000
};

function moveAround() {
  // 1/r = C * cos(THETA) + mu / (h^2), where mu = G*M and h = L / m

  let add = 30000 * Math.cos(THETA);
  let mu = 1000;
  let m = 10;
  // console.log(1 / (add + mu/(Math.pow(1/m, 2))));

  THETA += 0.035;
  R = 10000000 * (1 / (add + mu/(Math.pow(1/m, 2))));


  // R = (add + mu/(Math.pow(1/m, 2))) / 1000;
  // console.log(R);
}


function setup() {
  w = 600;
  h = 600;
  createCanvas(w, h);
  background(200);
}

function draw() {
  background(200);

  moveAround();

  translate(w/2 + 200, h/2);
  rotate(THETA);

  noStroke();
  fill('cornflowerblue');
  ellipse(R, 0, 5);

  fill('yellow');
  ellipse(0, 0, 5);
}
