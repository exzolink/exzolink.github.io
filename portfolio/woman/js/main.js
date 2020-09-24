"use strict";

let toPreload = document.querySelectorAll(".preload");
window.addEventListener("load", function () {
	for (let i = 0; i < toPreload.length; i++) {
		toPreload[i].rel = "stylesheet";
	}
});

// Фикс попапов на мобильных устройствах
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

if (window.innerWidth < 800) {
	window.addEventListener("resize", () => {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});
}

Spruce.store("modal", {
	open: false,
});
Spruce.store("modalTab", {
	tab: "uno",
});

if (document.getElementById("animated") !== null) {
	function anim() {
		let animBgItem = document.getElementById("animated-bg");

		let yPos = window.pageYOffset / 6;

		let bgCoords = "translate(" + (animBgItem.dataset.velocity - (yPos / animBgItem.dataset.speed)) + "%," + (yPos / animBgItem.dataset.speed * 1.5) + "%)";
		animBgItem.style.transform = bgCoords;
	}

	window.addEventListener("scroll", function () {
		if (window.pageYOffset < 900) {
			anim();
		} else {
			return;
		}
	});
	anim();
}

let posts = new Swiper(".news__container", {
	slidesPerView: 3,
	centeredSlides: true,
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 10,
			centeredSlides: true,
			loop: true,
		},
		450: {
			slidesPerView: 2,
			spaceBetween: 15,
			centeredSlides: true,
			loop: true,
		},
		650: {
			slidesPerView: 2,
			spaceBetween: 25,
			centeredSlides: true,
			loop: true,
		},
		750: {
			slidesPerView: 2,
			spaceBetween: 30,
			centeredSlides: true,
			loop: true,
		},
		1140: {
			slidesPerView: 3,
			centeredSlides: false,
			allowTouchMove: false,
			simulateTouch: false,
		},
	},
});

let readmorePosts = new Swiper(".readmore__container", {
	slidesPerView: 3,
	centeredSlides: true,
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 10,
			centeredSlides: true,
			loop: true,
		},
		450: {
			slidesPerView: 2,
			spaceBetween: 15,
			centeredSlides: true,
			loop: true,
		},
		650: {
			slidesPerView: 2,
			spaceBetween: 25,
			centeredSlides: true,
			loop: true,
		},
		750: {
			slidesPerView: 2,
			spaceBetween: 30,
			centeredSlides: true,
			loop: true,
		},
		1140: {
			slidesPerView: 3,
			loop: false,
			centeredSlides: false,
			allowTouchMove: false,
			simulateTouch: false,
		},
	},
});
