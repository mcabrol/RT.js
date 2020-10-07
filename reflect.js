function diffuse_reflect(ray_direction, normal, seed1, seed2) {
	var tmp = [0, 0, 0];
	var w = (0 > vector_dot(normal, ray_direction)) ? normal : vector_minus(normal);

	if (Math.abs(w[0]) > 0.1) {
		tmp[1] = 1;
	} else {
		tmp[0] = 1;
	}

	var u = vector_normalize(vector_cross(tmp, w));
	var v = vector_cross(w, u);
	//
	var sample = cosine_weighted_sample(seed1, seed2);

	var x = vector_multi_n(u, sample[0]);
	var y = vector_multi_n(v, sample[1]);
	var z = vector_multi_n(w, sample[2]);

	ray_direction = vector_add(vector_add(x, y), z);

	return (vector_normalize(ray_direction));
};

function cosine_weighted_sample(u1, u2) {
	var cos_theta = Math.sqrt(1 - u1);
	var sin_theta = Math.sqrt(u1);
	var phi = 2 * Math.PI * u2;
	return ([Math.cos(phi) * sin_theta, Math.sin(phi) * sin_theta, cos_theta]);
};

function specular_reflect(d, n) {
	var a = vector_multi_n(n, (2 * vector_dot(n, d)));
	return (vector_substract(d, a));
}

let reflect_functions = [
	specular_reflect,
	cosine_weighted_sample,
	diffuse_reflect
];
