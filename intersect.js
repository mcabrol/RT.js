function intersect(ray_direction, ray_origin, sphere_position, sphere_radius) {
	var tmax = 1e20;
	var distance = intersect_sphere(ray_direction, ray_origin, sphere_position, sphere_radius);
	if (distance >= 0.01 && distance < tmax) {
		return (distance);
	} else {
		return (0);
	}
};

function intersect_sphere(ray_direction, ray_origin, sphere_position, sphere_radius)
{
	var oc = vector_substract(ray_origin, sphere_position);
	var k = [vector_dot(ray_direction, ray_direction), 2 * vector_dot(oc, ray_direction), vector_dot(oc, oc) - sphere_radius * sphere_radius];
	var tmin = quadratic(k[0], k[1], k[2]);
	return (tmin);
}

let intersect_functions = [
	intersect,
	intersect_sphere
];
