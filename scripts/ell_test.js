

// AHHH Perhaps we could just draw a huge spread of triangles!!!!


let w, h;
let a=1, b=2;
let scale = 120;
let ball;

function Ball() {
  this.x = 0;
  this.y = 0;
  this.angle = 0;

  this.drawBall = function() {
    fill('yellow');
    noStroke();
    ellipse(this.x, this.y, 5);
  };

  this.locomote = function() {
    this.angle += 0.01;
  };

  this.setPosition = function() {
    this.x = w/2 + a * cos(this.angle) * scale;
    this.y = h/2 + b * sin(this.angle) * scale;
  };

  this.connect = function() {
    stroke('blue');
    const c = Math.pow(abs(a*a - b*b), 0.5);
    line(w/2, h/2 + c * scale, this.x, this.y);
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
  background(200);
  drawFoci();
  drawEllipse();
  // drawBall();


  //
  ball.locomote();
  ball.setPosition();
  ball.connect();
  ball.drawBall();



  beginShape();
  fill('red');
  stroke('black');

  const x = 50 * Math.pow(3, 0.5); // yeah it's root 3, not 2
  // const th = Math.pow()
  vertex(0, 0);
  curveVertex(x, 50);

  curveVertex(0, 100);
  // vertex(0, 0);

  endShape(CLOSE);


}


function drawFoci() {
  const c = Math.pow(abs(a*a - b*b), 0.5);
  fill('green');
  noStroke();
  // console.log(c);

  ellipse(w/2, h/2 + c * scale, 5);
  ellipse(w/2, h/2 - c * scale, 5);
}


function drawEllipse() {
  noFill();
  stroke('black');

  ellipse(w/2, h/2, a * scale * 2, b * scale * 2);

  // fill('orange');
  // Yeah...the only issue is it counts the center as ...the center, rather than one of the foci...:
  // arc(w/2, h/2, a * scale * 2, b * scale * 2, 0, PI / 7);
}
