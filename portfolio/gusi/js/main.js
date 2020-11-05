"use strict";

window.addEventListener("load", () => {
	const font = document.querySelector("#font");
	font.rel = "stylesheet";
});

if (document.querySelector(".main-slider__container") !== null) {
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
}

const closePopupBtns = document.querySelectorAll(".popup-close-btn");
const popups = document.querySelectorAll(".popupAuth__window");
const cartBtn = document.querySelector("#panel-cart-btn");
const basket = document.querySelector(".basket");
const popupBg = document.querySelector(".popup-dark-bg");
cartBtn.addEventListener("click", (e) => {
	e.preventDefault();
	basket.classList.toggle("active");

	for (let i = 0; i < popups.length; i++) {
		popups[i].classList.remove("active");
	}

	if (window.innerWidth <= 600) {
		if (cartBtn.classList.contains("active")) {
			popupBg.classList.remove("active");
		} else {
			popupBg.classList.add("active");
		}
	}
	cartBtn.classList.toggle("active");
});

const quickviewBtns = document.querySelectorAll(".sliders__quickview");
const quickviewPopup = document.querySelector(".quickview");
quickviewBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		quickviewPopup.classList.add("active");
		popupBg.classList.add("active");
	});
});

closePopupBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let closestPopup =
			btn.closest(".popupAuth__window") ||
			btn.closest(".basket") ||
			btn.closest(".quickview");
		closestPopup.classList.remove("active");
		popupBg.classList.remove("active");
		cartBtn.classList.remove("active");
	});
});

popupBg.addEventListener("click", () => {
	for (let i = 0; i < popups.length; i++) {
		popups[i].classList.remove("active");
	}
	popupBg.classList.remove("active");
	try {
		quickviewPopup.classList.remove("active");
	} catch (err) {}

	if (window.innerWidth <= 600) {
		cartBtn.classList.remove("active");
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
			cartBtn.classList.remove("active");
		}
	});
});

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

if (window.innerWidth > 600) {
	const headerBasketBtn = document.querySelector(".header__nav_cart");

	headerBasketBtn.addEventListener("mouseenter", (e) => {
		e.preventDefault();
		basket.classList.add("active");
		headerBasketBtn.classList.add("active");
	});

	headerBasketBtn.addEventListener("click", (e) => {
		if (headerBasketBtn.classList.contains("active")) {
			e.preventDefault();
			basket.classList.remove("active");
			headerBasketBtn.classList.remove("active");
		}
	});

	basket.addEventListener("mouseleave", () => {
		basket.classList.remove("active");
		headerBasketBtn.classList.remove("active");
	});
}

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
try {
	sorterCurrent.addEventListener("click", () => {
		slideToggle(optionsList, 350);
		sorterWrapper.classList.toggle("active");
	});
} catch (err) {
	// console.log(err);
}

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

if (document.querySelector(".product__main_container") !== null) {
	const productThumbs = new Swiper(".product__thumbs_container", {
		slideToClickedSlide: true,
		spaceBetween: 22,
		mousewheel: true,
		loop: true,
		observer: true,
		observeParents: true,
		direction: "vertical",
		loopedSlides: 4,
		slidesPerSlide: 1,
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			415: {
				slidesPerView: 3,
			},
			600: {
				slidesPerView: 4,
			},
			1500: {
				slidesPerView: 4,
			},
		},
	});

	const productMain = new Swiper(".product__main_container", {
		slidesPerView: 1,
		loop: true,
		loopedSlides: 4,
		grabCursor: true,
		spaceBetween: 15,
		observer: true,
		observeParents: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			1500: {},
		},
	});

	const productThumbs_slides = document.querySelectorAll(
		".product__thumbs_slide",
	);
	const productMain_slides = document.querySelectorAll(".product__main_slide");

	if (productMain_slides.length <= 9 && productMain_slides !== null) {
		for (let i = 0; i <= 1; i++) {
			productThumbs.appendSlide(
				'<div class="swiper-slide product__thumbs_slide">' +
					productThumbs_slides[i].innerHTML +
					"</div>",
			);
		}
		for (let i = 0; i <= 1; i++) {
			productMain.appendSlide(
				'<div class="swiper-slide product__main_slide">' +
					productMain_slides[i].innerHTML +
					"</div>",
			);
		}

		productThumbs.update();
		productMain.update();
	}

	productMain.controller.control = productThumbs;
	productThumbs.controller.control = productMain;
}

if (window.innerWidth <= 600) {
	try {
		new Readmore(".product__desc_text", {
			speed: 200,
			collapsedHeight: 140,
			lessLink: '<span class="product__desc_more">Скрыть описание</a>',
			moreLink: '<span class="product__desc_more fade">Развернуть описание</a>',
		});

		const tabs = document.querySelectorAll(".product__tabs span");
		const content = document.querySelectorAll(".product__tabs_content");
		tabs.forEach((btn) => {
			btn.addEventListener("click", () => {
				let getID = btn.getAttribute("data-tab");
				let getContent = document.querySelector("#" + getID);

				if (!btn.classList.contains("active")) {
					for (let i = 0; i < tabs.length; i++) {
						tabs[i].classList.remove("active");
					}
					for (let i = 0; i < content.length; i++) {
						content[i].classList.remove("active");
					}
					btn.classList.add("active");
					getContent.classList.add("active");
				} else {
					return;
				}
			});
		});
	} catch (err) {}
}

// Слайдер возраста (фильтр)
const sliderAge = document.getElementById("age-slider");
let a1 = 0;
let a2 = 18;
noUiSlider.create(sliderAge, {
	start: [a1, a2],
	connect: true,
	range: {
		min: 0,
		max: 18,
	},
	step: 1,
	format: wNumb({
		decimals: 0,
	}),
});

// Линковка слайдера возраста к инпутам
const sliderAgeMin = document.getElementById("minAge");
const sliderAgeMax = document.getElementById("maxAge");
sliderAge.noUiSlider.on("update", function (values, handle) {
	let value = values[handle];

	if (handle) {
		sliderAgeMax.value = values[handle];
	} else {
		sliderAgeMin.value = values[handle];
	}
});

sliderAgeMin.addEventListener("change", function () {
	sliderAge.noUiSlider.set([this.value, null]);
});
sliderAgeMax.addEventListener("change", function () {
	sliderAge.noUiSlider.set([null, this.value]);
});

// Слайдер цены (фильтр)
const sliderPrice = document.getElementById("price-slider");
let p1 = 3000;
let p2 = 10000;
noUiSlider.create(sliderPrice, {
	start: [p1, p2],
	connect: true,
	range: {
		min: 3000,
		max: 10000,
	},
	step: 1,
	format: wNumb({
		decimals: 0,
	}),
});

// Линковка слайдера цены к инпутам
const sliderPriceMin = document.getElementById("minPrice");
const sliderPriceMax = document.getElementById("maxPrice");
sliderPrice.noUiSlider.on("update", function (values, handle) {
	let value = values[handle];

	if (handle) {
		sliderPriceMax.value = values[handle];
	} else {
		sliderPriceMin.value = values[handle];
	}
});

sliderPriceMin.addEventListener("change", function () {
	sliderPrice.noUiSlider.set([this.value, null]);
});
sliderPriceMax.addEventListener("change", function () {
	sliderPrice.noUiSlider.set([null, this.value]);
});

// Сброс фильтра
const resetFilter = document.querySelectorAll(
	".filters__reset, .filters__reset_mobile",
);
const filterPopup = document.querySelector(".filters__popup");
resetFilter.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const filterCheckboxes = filterPopup.querySelectorAll(".filters__checkbox");
		const filterSelectors = filterPopup.querySelectorAll(
			".catalog__selectors_item",
		);

		for (let i = 0; i < filterCheckboxes.length; i++) {
			filterCheckboxes[i].checked = false;
		}

		for (let i = 0; i < filterSelectors.length; i++) {
			filterSelectors[i].classList.remove("active");
			let filterSelectorsInput = filterSelectors[i].querySelector("input");
			filterSelectorsInput.checked = false;
		}

		sliderPrice.noUiSlider.set([p1, p2]);
		sliderAge.noUiSlider.set([a1, a2]);
	});
});

// Toggle разделы фильтра
const filterToggleBtns = document.querySelectorAll(".filters__title");
filterToggleBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		let filterBlock =
			btn.closest(".filters__popup_item") || btn.closest(".filters__popup_row");
		let filterBlockEl = filterBlock.querySelector(".filters__block");
		slideToggle(filterBlockEl, 300);
		btn.querySelector(".filters-arrow").classList.toggle("active");
	});
});

// Открыть/закрыть фильтр
const filterBtns = document.querySelectorAll(
	".filters__button, .filters-close-btn, .filters__close_mobile",
);
filterBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		filterPopup.classList.toggle("active");
	});
});
