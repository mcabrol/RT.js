function output(str, element) {
	element.empty();
	element.append(str);
}

function toggleAnimation() {
	if (animation) {
		animation = false;
		$("#statusAnimation").empty();
		$("#statusAnimation").append("Start");
	} else {
		animation = true;
		$("#statusAnimation").empty();
		$("#statusAnimation").append("Stop");
		requestAnimationFrame(draw);
	}
}

function addFunctions(gpu, f){
	f.forEach((item) => {
		gpu.addFunction(item);
	});
}

function framePerSecond() {
	delta = (Date.now() - lastCalledTime) / 1000;
	lastCalledTime = Date.now();
	fps = 1 / delta;
	fpsNumber.empty();
	fpsNumber.append("fps " + fps.toFixed(0));
}
