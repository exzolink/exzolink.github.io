"use strict";

const mainSlider = new Swiper(".main-slider__container", {
	slidesPerView: 1,
	loop: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

const sliders = new Swiper(".sliders__container", {
	slidesPerSlide: 2,
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 8,
		},
		760: {
			slidesPerView: 3,
			spaceBetween: 15,
		},
		900: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1150: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	},
});


const sliderNews = new Swiper(".sliders__news_container", {
	slidesPerSlide: 2,
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 'auto',
			spaceBetween: 10,
			slidesOffsetBefore: 15,
		},
		500: {
			slidesPerView: 2,
			spaceBetween: 8,
			slidesOffsetBefore: 0,
		},
		760: {
			slidesPerView: 3,
			spaceBetween: 15,
		},
		900: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1150: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	},
});

