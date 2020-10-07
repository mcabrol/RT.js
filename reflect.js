function diffuse_reflect(ray_direction, normal) {
	var tmp = [0, 0, 0];
	var w = null;
	if (0 > vector_dot(normal, ray_direction)) {
		w = normal;
	} else {
		w = vector_minus(normal);
	}
	if (Math.abs(w[0]) > 0.1) {
		tmp[1] = 1.0;
	} else {
		tmp[0] = 1.0;
	}
	var u = vector_normalize(vector_cross(tmp, w));
	var v = vector_cross(w, u);

	var sample = cosine_weighted_sample(erand(), erand());

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

// void			diffuse_reflect(t_vec *d, t_vec *n, unsigned short xseed[3])
// {
// 	t_vec tmp;
// 	t_vec uvw[3];
// 	t_vec xyz[3];
// 	t_vec sample;
//
// 	vec(0.0, 0.0, 0.0, &tmp);
// 	if (0.0 > dot(n, d))
// 		uvw[2] = *n;
// 	else
// 		minus(n, &uvw[2]);
// 	if (fabs(uvw[2].x) > 0.1)
// 		tmp.y = 1.0;
// 	else
// 		tmp.x = 1.0;
// 	cross(&tmp, &uvw[2], &uvw[0]);
// 	norm(&uvw[0]);
// 	cross(&uvw[2], &uvw[0], &uvw[1]);
// 	cosine_weighted_sample(erand48(xseed), erand48(xseed), &sample);
// 	nmulti(&uvw[0], sample.x, &xyz[0]);
// 	nmulti(&uvw[1], sample.y, &xyz[1]);
// 	nmulti(&uvw[2], sample.z, &xyz[2]);
// 	sum(&xyz[0], &xyz[1], &tmp);
// 	sum(&tmp, &xyz[2], d);
// 	norm(d);
// }


function specular_reflect(d, n) {
	var a = vector_multi_n(n, (2 * vector_dot(n, d)));
	return (vector_substract(d, a));
};

let reflect_functions = [
	specular_reflect,
	diffuse_reflect,
	cosine_weighted_sample
];
