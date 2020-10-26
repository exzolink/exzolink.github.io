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
    slidesPerView: 4,
    slidesPerSlide: 2,
    spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});
