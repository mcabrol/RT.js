function add(a, b) {
	return ([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
};

function substract(a, b) {
	return ([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
};

function multi(a, b) {
	return ([a[0] * b[0], a[1] * b[1], a[2] * b[2]]);
};

function multin(a, b, n) {
	return ([a[0] * n, a[1] * n, a[2] * n]);
};

function normalize(a) {
	var x = 1 / sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return ([a[0] * x, a[1] * x, a[2] * x]);
};

function vector_cross(a, b) {
	return ([
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
	]);
};

function erand() {
    var min = 0.0;
	var max = 1.0;
	var interval = Math.random() * (max - min) + min;
    return(interval);
};

function degreeToRadian(degree) {
	return (degree * Math.PI / 180.0)
}

let kernel_functions = [
	add,
	substract,
	normalize,
	multi,
	multin,
	vector_cross,
	erand,
	degreeToRadian
];
