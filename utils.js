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
