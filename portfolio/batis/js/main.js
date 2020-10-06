$(document).ready(function () {
	if (window.innerWidth > 1100) {
		$("#app").pagepiling({
			scrollingSpeed: 200,
		});
		window.lazySizesConfig = window.lazySizesConfig || {};
		window.lazySizesConfig.loadMode = 1;
	}
});

document.addEventListener("lazybeforeunveil", function (e) {
	var bg = e.target.getAttribute("data-bg");
	if (bg) {
		e.target.style.backgroundImage = "url(" + bg + ")";
	}
});

window.addEventListener("orientationchange", function () {
    window.location.reload();
}, false);
