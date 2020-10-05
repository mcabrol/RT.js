function add(a, b) {
	return ([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
};

function substract(a, b) {
	return ([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
};

function normalize(a) {
	var x = 1 / sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return ([a[0] * x, a[1] * x, a[2] * x]);
};

function getX() {
	return (this.thread.x);
};

function getY() {
	return (this.thread.y);
};

let kernel_functions = [
	add,
	substract,
	normalize,
	getX,
	getY
];
