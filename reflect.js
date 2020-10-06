function specular_reflect(d, n) {
	var a = vector_multi_n(n, (2 * vector_dot(n, d)));
	return (vector_substract(d, a));
}

let reflect_functions = [
	specular_reflect
];
