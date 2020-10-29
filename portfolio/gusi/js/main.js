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
	".header__nav_cart, #panel-cart-btn",
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
				} else {
					popupBg.classList.add("active");
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

const authBtns = document.querySelectorAll("#register-open, #login-open");

authBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		popupBg.classList.add("active");
		let btnId = btn.getAttribute("id");
		switch (btnId) {
			case "register-open": {
				document.querySelector("#register-form").classList.add("active");
				break;
			}
			case "login-open": {
				document.querySelector("#login-form").classList.add("active");
				break;
			}
			default: {
				document.querySelector("#login-form").classList.add("active");
				break;
			}
		}

		if (window.innerWidth <= 600) {
			basket.classList.remove("active");

			for (let i = 0; i < cartBtns.length; i++) {
				cartBtns[i].classList.remove("active");
			}
		}
	});
});

// test purpose
const test = document.querySelector("#FOR-TEST-BUTTON");

test.addEventListener("click", (e) => {
	e.preventDefault();
	popupBg.classList.add("active");
	document.querySelector("#login-form").classList.add("active");

	if (window.innerWidth <= 600) {
		basket.classList.remove("active");

		for (let i = 0; i < cartBtns.length; i++) {
			cartBtns[i].classList.remove("active");
		}
	}
});
//

const inFormBtns = document.querySelectorAll(
	".popupAuth__btn-gray, .popupAuth__btn-blue",
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

const slideUp = (target, duration = 500) => {
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = target.offsetHeight + "px";
	target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = "none";
		target.style.removeProperty("height");
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

const slideDown = (target, duration = 500) => {
	target.style.removeProperty("display");
	let display = window.getComputedStyle(target).display;

	if (display === "none") display = "flex";

	target.style.display = display;
	var height = target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = height + "px";
	target.style.removeProperty("padding-top");
	target.style.removeProperty("padding-bottom");
	target.style.removeProperty("margin-top");
	target.style.removeProperty("margin-bottom");
	window.setTimeout(() => {
		target.style.removeProperty("height");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

const slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === "none") {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
};

const sorterCurrent = document.querySelector(".sort__current");
const sorterWrapper = document.querySelector(".sort__wrapper");
const optionsList = document.querySelector(".sort__options");
sorterCurrent.addEventListener("click", () => {
	slideToggle(optionsList, 350);
	sorterWrapper.classList.toggle("active");
});

const sorterEls = document.querySelectorAll(".sort__options_item");
sorterEls.forEach((item) => {
	item.addEventListener("click", (e) => {
		let text = item.innerHTML;
		sorterCurrent.innerHTML = text;
		slideToggle(optionsList, 350);
		sorterWrapper.classList.remove("active");
	});
});

const catalogSelectors = document.querySelectorAll(".catalog__selectors_item");
catalogSelectors.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		
		let btnInput = btn.querySelector("input");
		btnInput.checked = !btnInput.checked;
		btn.classList.toggle("active");
	});
});
