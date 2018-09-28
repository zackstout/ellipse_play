
let w, h;
let a=1, b=2;
let scale = 120;
let ball;
let count = 0;

function Ball() {
  this.x = 0;
  this.y = 0;
  this.angle = 0;

  this.setPosition = function() {
    this.x = w/2 + a * cos(this.angle) * scale;
    this.y = h/2 + b * sin(this.angle) * scale;
  };

  this.setPosition(); // call before setting previous:

  this.previous = {
    x: this.x,
    y: this.y
  }; // recall syntax for shorthand, with spread operator

  this.drawBall = function() {
    fill('yellow');
    noStroke();
    ellipse(this.x, this.y, 5);
  };

  this.locomote = function() {
    this.angle += 0.01;
  };

  this.connect = function() {
    stroke('blue');
    const c = Math.pow(abs(a*a - b*b), 0.5);
    line(w/2, h/2 + c * scale, this.x, this.y);
  };

  this.drawPrevious = function() {
    fill('orange');
    ellipse(this.previous.x, this.previous.y, 5);
  };

  this.connectPrevious = function() {
    stroke('blue');
    const c = Math.pow(abs(a*a - b*b), 0.5);
    line(w/2, h/2 + c * scale, this.previous.x, this.previous.y);
  };
}

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h);
  background(200);
  ball = new Ball();
}

function draw() {
  count++;
  background(200);
  drawFoci();
  drawEllipse();

  ball.locomote();
  ball.setPosition();
  ball.connect();
  ball.drawBall();
  ball.drawPrevious();
  ball.connectPrevious();
  // console.log(count);

  if (count % 100 == 0) {
    // console.log('ahoy hoy', count);
    ball.previous.x = ball.x;
    ball.previous.y = ball.y;
  }
}


function drawFoci() {
  const c = Math.pow(abs(a*a - b*b), 0.5);
  fill('green');
  noStroke();
  ellipse(w/2, h/2 + c * scale, 5);
  ellipse(w/2, h/2 - c * scale, 5);
}

function drawEllipse() {
  noFill();
  stroke('black');
  ellipse(w/2, h/2, a * scale * 2, b * scale * 2);
}
