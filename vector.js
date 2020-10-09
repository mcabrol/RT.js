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

function vector_dot(a, b) {
	return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2])
};

function quadratic(k1, k2, k3) {
	var tmin = 1e20;
	var des = k2 * k2 - 4 * k1 * k3;
	if (des >= 0) {
		var t1 = (-k2 + Math.sqrt(des)) / (2 * k1);
		var t2 = (-k2 - Math.sqrt(des)) / (2 * k1);
		if (t1 >= 0.01 && t1 < 1e20 && t1 < tmin) {
			tmin = t1;
		}
		if (t2 >= 0.01 && t2 < 1e20 && t2 < tmin) {
			tmin = t2;
		}
	}
	return (tmin);
};

function vector_eval(ray_direction, ray_origin, distance) {
	return (vector_add(vector_multi_n(ray_direction, distance), ray_origin));
};

function vector_max(a) {
	if (a[0] > a[1] && a[0] > a[2]) {
		return (a[0]);
	} else {
		if (a[1] > a[2]) {
			return (a[1]);
		} else {
			return (a[2]);
		}
	}
};

function single_clamp(x, low, high) {
	if (x < high) {
		if (x > low) {
			return (x);
		} else {
			return (low);
		}
	} else {
		return (high);
	}
};

function vector_clamp(a, low, high) {
	return ([
		single_clamp(a[0], low, high),
		single_clamp(a[1], low, high),
		single_clamp(a[2], low, high)
	]);
}

function degreeToRadian(degree) {
	return (degree * Math.PI / 180)
}

function gamma(x) {
	return (single_clamp(255 * Math.pow(x, 1 / 2.2), 0, 255));
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
	vector_dot,
	vector_eval,
	vector_max,
	single_clamp,
	vector_clamp,
	quadratic,
	gamma
];
