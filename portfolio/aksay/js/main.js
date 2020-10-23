"use strict";

const videoWrapper = document.querySelectorAll("#video");
videoWrapper.forEach(item => {
	window.addEventListener("load", () => {
		item.innerHTML +=
			"<video src='imgs/videoBg.mp4' muted loop alt=''></video>";
	});
})


const slider_img = new Swiper(".slider-img__container", {
	slidesPerView: 1,
	loop: true,
	loopedSlides: 1,
	allowTouchMove: false,
	simulateTouch: false,
});

const slider_text = new Swiper(".slider-text__container", {
	slidesPerView: 1,
	loop: true,
	loopedSlides: 1,
	allowTouchMove: false,
	simulateTouch: false,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	}
});

slider_img.controller.control = slider_text;
slider_text.controller.control = slider_img;