
let w, h, p_objects;
let scale_factor = 5;
let speed_factor = 0.3;


function setup() {
	w = window.innerWidth;
	h = window.innerHeight;
	createCanvas(w, h);
	background(200);

	p_objects = planets.map(p => new Planet(p.name, p.radius, p.color, p.speed));
}

function draw() {
	background(200);
	noStroke();
	fill('yellow');
	ellipse(w/2, h/2, 1.2 * scale_factor);
	p_objects.forEach(p => {
		p.locomote();
		p.draw();
	});
}

function mouseWheel(ev) {
	ev.preventDefault(); // Block the scrolling functionality.
	scale_factor += ev.wheelDelta * 0.01;
}


function Planet(name, radius, color, speed) {
	this.name = name;
	this.radius = radius;
	this.color = color;
	this.speed = speed;
	this.angle = Math.random() * 2 * Math.PI;

	this.getPosition = function() {
		return {
			x: w/2 + Math.cos(this.angle) * this.radius * scale_factor,
			y: h/2 + Math.sin(this.angle) * this.radius * scale_factor
		};
	};

	this.locomote = function() {
		this.angle += this.speed / scale_factor; // Cool, we don't need a separate speed_factor
	}

	this.draw = function() {
		noStroke();
		fill(this.color);
		ellipse(this.getPosition().x, this.getPosition().y, 4);
	};
}
