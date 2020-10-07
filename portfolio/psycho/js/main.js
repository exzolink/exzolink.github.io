const menuBtn = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");

menuBtn.addEventListener("click", (e) => {
	menu.classList.toggle("active");
});

if (document.querySelector(".mainpage__intro_video") !== null) {
	const video = document.querySelector(".mainpage__intro_video");
	const videoWrapper = document.querySelector(".mainpage__intro");
	video.addEventListener("ended", (e) => {
		video.pause;
		setTimeout(() => {
			videoWrapper.classList.add("ended");
		}, 500);
	});
}

if (document.querySelector(".product") !== null) {
	var productThumbs = new Swiper(".product__thumbs", {
		slideToClickedSlide: true,
		spaceBetween: 16,
		mousewheel: true,
		loop: true,
		loopAdditionalSlides: 2,
		loopedSlides: 4,
		slidesPerSlide: 1,
		breakpoints: {
			320: {
				slidesPerView: 3,
			},
			550: {
				slidesPerView: 4,
			},
			1500: {
				direction: "vertical",
				slidesPerView: 4,
				navigation: {
					nextEl: ".product__thumbs_next",
					prevEl: ".product__thumbs_prev",
				},
			},
		},
	});

	var productMain = new Swiper(".product__main", {
		slidesPerView: 1,
		loop: true,
		loopAdditionalSlides: 2,
		loopedSlides: 4,
		spaceBetween: 15,
		breakpoints: {
			1500: {
				allowTouchMove: false,
				simulateTouch: false,
			},
		},
	});

	productMain.controller.control = productThumbs;
	productThumbs.controller.control = productMain;

	customSelect(".product__selector");
}

const basketBtns = document.querySelectorAll(
	".header__basket, .modal-basket__close"
);
const basketModal = document.querySelector(".modal-basket");
const basketEl = document.querySelector(".modal-basket__block");
const basketModalInner = document.querySelector(".modal-basket__inner");
const htmlEl = document.documentElement;

basketBtns.forEach((item) => {
	item.addEventListener("click", () => {
		basketModal.classList.toggle("active");
		basketEl.classList.toggle("active");
		htmlEl.classList.toggle("no-overflow");
	});
});

document.addEventListener("keydown", (e) => {
	if (e.keyCode === 27) {
		basketModal.classList.remove("active");
		basketEl.classList.remove("active");
		htmlEl.classList.remove("no-overflow");
	}
});

document.addEventListener("click", (e) => {
	if (!e.target.closest(".modal-basket__block, .header__basket")) {
		basketModal.classList.remove("active");
		basketEl.classList.remove("active");
		htmlEl.classList.remove("no-overflow");
	}
});
