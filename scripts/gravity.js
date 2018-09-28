
let w, h, planets;
const grav = 9.8; // m/s/s
const dist_fact = 0.3;
const diam_fact = 0.0005;
const vscale = 0.1;
const ascale = 1;
const mscale = 0.001;

// mass of sun is 2 * 10 ^ 30

function setup() {
	w = window.innerWidth;
	h = window.innerHeight;
	createCanvas(w, h);
	background(200);

  planets = planet_data.map(d => new Planet(w/2 + d.dist * dist_fact, h/2, d.diam * diam_fact, 0, 0)); // start off going straight down (toward positive y)
	// planets.push(new Planet(w/2, h/2, 100, 0, 0))
	// debugger
}

// function mousePressed() {
//   const p = new Planet(mouseX, mouseY, 5 * scale_factor, 0, 0);
//   planets.push(p);
// }

function draw() {
	background(200);

  // Draw sun:
  noStroke();
  fill('yellow');
  ellipse(w/2, h/2, 10);
	planets.forEach(p => {
    // console.log('ya');
		p.ax = 0;
		p.ay = 0;
		planets.filter(p2 => p2.m != p.m).forEach(p3 => p.addGravityFrom(p3));
		//
		p.updateVel();

		p.locomote();
		p.draw();
	});
}



class Planet {
  constructor(x, y, m, vx, vy) {
    this.x = x;
    this.y = y;
    this.m = m;
    this.vx = vx;
    this.vy = vy;

		this.ax = 0;
		this.ay = 0;
  }

	locomote() {
		this.x += vscale * this.vx;
		this.y += vscale * this.vy;
	}

	// is this ...really it?
	updateVel() {
		// this.vx += (0 * this.ax); // WHY DOES THIS BREAK IT? this.ax logs as NaN and 5 Infinitys....Huh
		// Interesting. changing order of addGravityFrom changed it to all NaNs.
		// I thought adding the check for divide by 0 but...nope
		// apparently the issue was not setting all the values on the sun ... foolishness.
		// console.log(this.ax);

		this.vx += ascale * this.ax;
		this.vy += ascale * this.ay;

	}

	// shoot i thought the problem might be arrow fn binding....but it seems not:
  addGravityFrom(other) {
		// pretty sure we can do this without sin and cosine by just breaking out into x and y forces...
		const x_dist = abs(other.x - this.x);
		const y_dist = abs(other.y - this.y);
		// console.log(x_dist, y_dist); // ahhh, some are Nan...
		// i dont think we need this check anymore:
		this.ax += x_dist === 0 ? 0 : grav * other.m * this.m * mscale / (x_dist * x_dist);
		this.ay += y_dist === 0 ? 0 : grav * other.m * this.m * mscale / (y_dist * y_dist);
		// console.log(this.ax);
  }

	draw() {
		noStroke();
		fill('periwinkle');
		ellipse(this.x, this.y, this.m);
	};
}
