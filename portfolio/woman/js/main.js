"use strict";

let font = document.getElementById("font");
window.addEventListener("load", function () {
	font.rel = "stylesheet";
});

let posts = new Swiper(".swiper-container", {
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

const burgerBtn = document.querySelectorAll(".js-toggleBurger");
const mobileMenu = document.querySelector(".header__menu");
burgerBtn.forEach(function (e) {
	e.addEventListener("click", function () {
		mobileMenu.classList.toggle("active");
		document.documentElement.classList.toggle('no-overflow');
	});
});
