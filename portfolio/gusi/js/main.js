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
			slidesPerView: "auto",
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

const closePopupBtns = document.querySelectorAll(".popup-close-btn");
const popups = document.querySelectorAll(".popupAuth__window");
const cartBtns = document.querySelectorAll(
	".header__nav_cart, #panel-cart-btn"
);
const basket = document.querySelector(".basket");
const popupBg = document.querySelector(".popup-dark-bg");
cartBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		basket.classList.toggle("active");

		for (let i = 0; i < popups.length; i++) {
			popups[i].classList.remove("active");
		}

		for (let i = 0; i < cartBtns.length; i++) {
			if (window.innerWidth <= 600) {
				if (cartBtns[i].classList.contains("active")) {
					popupBg.classList.remove("active");
				}
				else {
					popupBg.classList.add('active');
				}
			}
			cartBtns[i].classList.toggle("active");
		}
	});
});

closePopupBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let closestPopup =
			btn.closest(".popupAuth__window") || btn.closest(".basket");
		closestPopup.classList.remove("active");
		popupBg.classList.remove("active");

		for (let i = 0; i < cartBtns.length; i++) {
			cartBtns[i].classList.remove("active");
		}
	});
});

popupBg.addEventListener("click", () => {
	for (let i = 0; i < popups.length; i++) {
		popups[i].classList.remove("active");
	}
	popupBg.classList.remove("active");

	if (window.innerWidth <= 600) {
		for (let i = 0; i < cartBtns.length; i++) {
			cartBtns[i].classList.remove("active");
		}
		basket.classList.remove("active");
	}
});

const loginBtn = document.querySelector(".header__nav_login");

loginBtn.addEventListener("click", (e) => {
	e.preventDefault();
	popupBg.classList.add("active");
	document.querySelector("#login-form").classList.add("active");

	if (window.innerWidth <= 600) {
		basket.classList.remove('active');

		for (let i = 0; i < cartBtns.length; i++) {
			cartBtns[i].classList.remove("active");
		}
	}
});

// test purpose
const test = document.querySelector("#FOR-TEST-BUTTON");

test.addEventListener("click", (e) => {
	e.preventDefault();
	popupBg.classList.add("active");
	document.querySelector("#login-form").classList.add("active");

	if (window.innerWidth <= 600) {
		basket.classList.remove('active');

		for (let i = 0; i < cartBtns.length; i++) {
			cartBtns[i].classList.remove("active");
		}
	}
});
//

const inFormBtns = document.querySelectorAll(
	".popupAuth__btn-gray, .popupAuth__btn-blue"
);

inFormBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		let btnId = btn.dataset.btn;

		switch (btnId) {
			case "register-btn": {
				for (let i = 0; i < popups.length; i++) {
					popups[i].classList.remove("active");
				}
				document.querySelector("#register-form").classList.add("active");

				break;
			}
			case "login-btn": {
				for (let i = 0; i < popups.length; i++) {
					popups[i].classList.remove("active");
				}
				document.querySelector("#login-form").classList.add("active");

				break;
			}
			case "forgot-btn": {
				for (let i = 0; i < popups.length; i++) {
					popups[i].classList.remove("active");
				}
				document.querySelector("#forgot-form").classList.add("active");

				break;
			}
			default: {
				for (let i = 0; i < popups.length; i++) {
					popups[i].classList.remove("active");
				}
				document.querySelector("#login-form").classList.add("active");

				break;
			}
		}
	});
});
