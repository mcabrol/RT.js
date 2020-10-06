// void	sphere_normal(t_obj *sphere, t_ray *ray)
// {
// 	sub(&ray->x, &sphere->position, &ray->n);
// 	norm(&ray->n);
// }

function normal_sphere(a, sphere_position) {
	return (vector_normalize(vector_substract(a, sphere_position)));
}

let normal_functions = [
	normal_sphere
];
