function vector_add(a, b) {
	return ([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
};

function vector_substract(a, b) {
	return ([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
};

function vector_multi(a, b) {
	return ([a[0] * b[0], a[1] * b[1], a[2] * b[2]]);
};

function vector_multi_n(a, n) {
	return ([a[0] * n, a[1] * n, a[2] * n]);
};

function vector_divide_n(a, n) {
	var x = 1 / n;
	return ([a[0] * x, a[1] * x, a[2] * x]);
};

function vector_normalize(a) {
	var x = 1 / Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return ([a[0] * x, a[1] * x, a[2] * x]);
};

function vector_cross(a, b) {
	return ([
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	]);
};

function vector_minus(a) {
	return ([-a[0], -a[1], -a[2]]);
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

let vector_functions = [
	vector_add,
	vector_substract,
	vector_normalize,
	vector_multi,
	vector_multi_n,
	vector_divide_n,
	vector_cross,
	vector_minus,
	erand
];
