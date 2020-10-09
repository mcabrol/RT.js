function pathtracer() {
	let x_ = this.thread.x;
	let y_ = this.thread.y;
	let samples = this.constants.scene[0];
	let w_width = this.constants.scene[1];
	let w_height = this.constants.scene[2];
	let camera_fov = this.constants.scene[3];
	let distance_max = this.constants.scene[4];
	let distance_min = this.constants.scene[5];
	let nb_obj = this.constants.scene[6];

	//----------------//
	//	Build Camera  //
	//----------------//

	let up = [0, 1, 0];
	let camera_direction = [0, 0, -1];
	let camera_position = [0, 0, 0];
	let half_width = Math.tan(camera_fov);
	let half_height = (w_width / w_height) * half_width;

	let horizontal = vector_normalize(vector_cross(camera_direction, up));
	let vertical = vector_minus(vector_normalize(vector_cross(horizontal, camera_direction)));
	let point = vector_add(camera_position, camera_direction);
	point = vector_substract(point, vector_multi_n(vertical, half_width));
	point = vector_substract(point, vector_multi_n(horizontal, half_height));

	let cx = vector_divide_n(vector_multi_n(horizontal, 2 * half_height), w_width);
	let cy = vector_divide_n(vector_multi_n(vertical, 2 * half_width), w_height);

	// Objects

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
		let ab = vector_add(vector_multi_n(cx, (dx + x_)), vector_multi_n(cy, (dy + y_)));
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
			var hit = false;
			var ray_distance = distance_max;
			var id = 0;
			// for (var j = 0; j < nb_obj; j++) {
				var current_position = [-40, 0, -20];
				var current_radius = 10;
				var distance = intersect_sphere(ray_direction, ray_origin, current_position, current_radius);
				if (distance >= distance_min && distance < ray_distance) {
					ray_distance = distance;
					id = 0;
					hit = true;
				}
				current_position = [40, 0, -20];
				current_radius = 10;
				distance = intersect_sphere(ray_direction, ray_origin, current_position, current_radius);
				if (distance >= distance_min && distance < ray_distance) {
					ray_distance = distance;
					id = 1;
					hit = true;
				}
				current_position = [0, 0, -20];
				current_radius = 5;
				distance = intersect_sphere(ray_direction, ray_origin, current_position, current_radius);
				if (distance >= distance_min && distance < ray_distance) {
					ray_distance = distance;
					id = 2;
					hit = true;
				}
				current_position = [0, 25, -20];
				current_radius = 20;
				distance = intersect_sphere(ray_direction, ray_origin, current_position, current_radius);
				if (distance >= distance_min && distance < ray_distance) {
					ray_distance = distance;
					id = 3;
					hit = true;
				}
			// }

			if (hit == false) {
				ray_color = [ray_blank[0], ray_blank[1], ray_blank[2]];
				break ;
			}

			var sphere_position = [-40, 0, -20];
			var sphere_direction = [0, 0, 0];
			var sphere_color = [0, 0, 0];
			var sphere_emission = [0, 0, 1];
			var sphere_radius = 10;
			var sphere_reflect = 1;
			if (id == 1) {
				sphere_position = [40, 0, -20];
				sphere_direction = [0, 0, 0];
				sphere_color = [0.25, 0.25, 0.75];
				sphere_emission = [1, 0, 0];
				sphere_radius = 10;
				sphere_reflect = 1;
			}
			if (id == 2) {
				sphere_position = [0, 0, -20];
				sphere_direction = [0, 0, 0];
				sphere_color = [1, 1, 1];
				sphere_emission = [0, 0, 0];
				sphere_radius = 5;
				sphere_reflect = 1;
			}
			if (id == 3) {
				sphere_position = [0, 20, -60];
				sphere_direction = [0, 0, 0];
				sphere_color = [1, 1, 1];
				sphere_emission = [0, 0, 0];
				sphere_radius = 50;
				sphere_reflect = 1;
			}


			// Evalutate
			var eval = vector_eval(ray_direction, ray_origin, ray_distance);
			var normal = normal_sphere(eval, sphere_position);

			// Light
			var ray_light = vector_multi(ray_mask, sphere_emission);
			ray_blank = vector_add(ray_blank, ray_light);
			ray_mask = vector_add(ray_mask, ray_light);

			// Texture
			ray_mask = vector_multi(ray_mask, sphere_color);


			var continue_probability = vector_max(sphere_color);
			if (ray_depth > 4) {
				if (Math.random() >= continue_probability) {
					ray_color = [ray_blank[0], ray_blank[1], ray_blank[2]];
					break ;
				}
				ray_mask = vector_divide_n(ray_mask, continue_probability);
			}

			if (sphere_reflect == 0) {
				ray_origin = eval;
				ray_direction = specular_reflect(ray_direction, normal);
				ray_depth++;
			}
			if (sphere_reflect == 1) {
				ray_origin = eval;
				ray_direction = diffuse_reflect(ray_direction, normal, Math.random(), Math.random());
				ray_depth++;
			}

		}

		// Divide by samples
		var l = vector_divide_n(ray_color, samples);
		accucolor = vector_add(accucolor, l);
	}

	var result = vector_multi_n(vector_clamp(accucolor, 0, 1), 0.25);
	this.color(gamma(result[0]), gamma(result[1]), gamma(result[2]));
};
