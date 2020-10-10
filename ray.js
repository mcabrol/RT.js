function prepare_ray(seed1, seed2, x_, y_, cx, cy, point, camera_position) {
	let u1 = 2 * seed1;
	let u2 = 2 * seed2;
	let dx = (u1 < 1) ? (Math.sqrt(u1) - 1) : (1 - Math.sqrt(2 - u1));
	let dy = (u2 < 1) ? (Math.sqrt(u2) - 1) : (1 - Math.sqrt(2 - u2));
	let ab = vector_add(vector_multi_n(cx, (dx + x_)), vector_multi_n(cy, (dy + y_)));
	return (vector_normalize(vector_substract(vector_add(point, ab), camera_position)));
}

let ray_functions = [
	prepare_ray
];
