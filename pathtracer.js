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

	let x = 0;
	let y = 1;
	let z = 2;

	let position = 0;
	let direction = 1;
	let color = 2;
	let emission = 3;
	let radius = 4;

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
			var id = 1;
			for (var j = 0; j < nb_obj; j++) {
				var current_position = [this.constants.obj[j][position][x], this.constants.obj[j][position][y], this.constants.obj[j][position][z]];
				var current_radius = this.constants.obj[j][radius][0];
				var distance = intersect_sphere(ray_direction, ray_origin, current_position, current_radius);
				if (distance >= distance_min && distance < ray_distance) {
					ray_distance = distance;
					id = j;
					hit = true;
				}
			}

			if (hit == false) {
				ray_color = [ray_blank[0], ray_blank[1], ray_blank[2]];
				break ;
			}

			let sphere_position = [this.constants.obj[id][position][x], this.constants.obj[id][position][y], this.constants.obj[id][position][z]];
			let sphere_direction = [this.constants.obj[id][direction][x], this.constants.obj[id][direction][y], this.constants.obj[id][direction][z]];
			let sphere_emission = [this.constants.obj[id][emission][x], this.constants.obj[id][emission][y], this.constants.obj[id][emission][z]];
			let sphere_color = [this.constants.obj[id][color][x], this.constants.obj[id][color][y], this.constants.obj[id][color][z]];
			let sphere_radius = this.constants.obj[id][radius][0];

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
			if (ray_depth > 4) {
				if (Math.random() >= continue_probability) {
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
	this.color(result[0], result[1], result[2]);
};
