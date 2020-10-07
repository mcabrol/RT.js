function pathtracer() {
	let x = this.thread.x;
	let y = this.thread.y;
	let samples = this.constants.samples;
	let camera_fov = this.constants.camera_fov;
	let w_width = this.constants.w_width;
	let w_height = this.constants.w_height;
	let distance_max = this.constants.distance_max;
	let distance_min = this.constants.distance_min;

	//----------------//
	//	Build Camera  //
	//----------------//

	let up = [0, 1, 0];
	let camera_direction = [0, 0, -1];
	let camera_position = [0, 0, 10];
	let half_width = Math.tan(camera_fov);
	let half_height = (w_width / w_height) * half_width;

	let horizontal = vector_normalize(vector_cross(camera_direction, up));
	let vertical = vector_minus(vector_normalize(vector_cross(horizontal, camera_direction)));
	let point = vector_add(camera_position, camera_direction);
	point = vector_substract(point, vector_multi_n(vertical, half_width));
	point = vector_substract(point, vector_multi_n(horizontal, half_height));

	let cx = vector_divide_n(vector_multi_n(horizontal, 2 * half_height), w_width);
	let cy = vector_divide_n(vector_multi_n(vertical, 2 * half_width), w_height);

	//

	let sphere_position = [0, 0, -10];
	let sphere_direction = [0, 1, 0];
	let sphere_radius = 5;
	let sphere_emission = [10, 10, 10];
	let sphere_color = [0.25, 0.75, 0.25];

	//--------------//
	//	Pathtracer  //
	//--------------//
	var accucolor = [0, 0, 0];
	for (let i = 0; i < samples; i++) {

		//---------------//
		//	Prepare ray  //
		//---------------//
		var ray_depth = 0

		let u1 = 2 * Math.random();
		let u2 = 2 * Math.random();
		let dx = (u1 < 1) ? (Math.sqrt(u1) - 1) : (1 - Math.sqrt(2 - u1));
		let dy = (u2 < 1) ? (Math.sqrt(u2) - 1) : (1 - Math.sqrt(2 - u2));
		let ab = vector_add(vector_multi_n(cx, (dx + x)), vector_multi_n(cy, (dy + y)));
		let ray_direction = vector_normalize(vector_substract(vector_add(point, ab), camera_position));
		let ray_origin = camera_position;

		//------------//
		// 	Radiance  //
		//------------//
		var ray_blank = [0, 0, 0];
		var ray_mask = [1, 1, 1];
		var ray_color = [0, 0, 0];


		// Intersect

		while (true) {
			let ray_distance = intersect_sphere(ray_direction, ray_origin, sphere_position, sphere_radius);
			if (ray_distance >= distance_min && ray_distance < distance_max) {
				ray_color = [ray_blank[0], ray_blank[1], ray_blank[2]];
				break ;
			}

			// Evalutate
			let eval = vector_eval(ray_direction, ray_origin, ray_distance);
			let normal = normal_sphere(eval, sphere_position);

			// Light
			var ray_light = vector_multi(ray_mask, sphere_emission);
			ray_blank = vector_add(ray_blank, ray_light);
			ray_mask = vector_add(ray_mask, ray_light);

			// Texture
			ray_mask = vector_multi(ray_mask, sphere_color);


			let continue_probability = vector_max(sphere_color);
			if (4 < ray_depth) {
				if ((Math.random()) >= continue_probability) {
					ray_color = [ray_blank[0], ray_blank[1], ray_blank[2]];
					break ;
				}
				ray_mask = vector_divide_n(ray_mask, continue_probability);
			}

			// Reflect specular_reflect
			// ray_origin = eval;
			// ray_direction = specular_reflect(ray_direction, normal);
			// ray_depth++;

			// Diffuse reflect
			ray_origin = eval;
			ray_direction = diffuse_reflect(ray_direction, normal, Math.random(), Math.random());
			ray_depth++;
		}

		// Divide by samples
		var l = vector_divide_n(ray_color, samples);
		accucolor = vector_add(accucolor, l);
	}

	var result = vector_multi_n(vector_clamp(accucolor, 0, 1), 0.25);
	this.color(gamma(result[0]), gamma(result[1]), gamma(result[2]));
};
