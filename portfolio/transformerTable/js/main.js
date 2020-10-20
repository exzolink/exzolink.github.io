const preloader = document.querySelector(".preloader");
const font = document.getElementById("font");
window.onload = function () {
	setTimeout(() => {
		preloader.classList.add("active");
	}, 500);
	font.rel = "stylesheet";
};

const feedbackSlider = new Swiper(".feedback-container", {
	slidesPerView: 3,
	spaceBetween: 60,
	navigation: {
		nextEl: ".feedback__arrow_right",
		prevEl: ".feedback__arrow_left",
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		550: {
			slidesPerView: 2,
		},
		1000: {
			slidesPerView: 3,
		},
	},
});

const bannerSlider = new Swiper(".banner-container", {
	slidesPerView: 1,
	grabCursor: true,
	loop: true,
	autoplay: {
		delay: 4000,
	},
	pagination: {
		el: ".slider-pagination",
		type: "fraction",
	},
});

// Плавное открытие/скрытие для спойлера вакансий
var slideUp = (target, duration = 500) => {
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

var slideDown = (target, duration = 500) => {
	target.style.removeProperty("display");
	var display = window.getComputedStyle(target).display;

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

var slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === "none") {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
};

const catalogFilters = document.querySelectorAll(".filters__main");

catalogFilters.forEach(function (item) {
	item.addEventListener("click", function () {
		let getContent = this.closest(".filters__item").querySelector(
			".filters__content"
		);
		let getArrow = this.closest(".filters__item").querySelector(
			".filters__arrow"
		);
		getArrow.classList.toggle("active");
		slideToggle(getContent, 350);
	});
});

const catalogFilterBy = document.querySelectorAll(".filters__by");
const catalogFilterCurrent = document.getElementById("currentFilter");
catalogFilterBy.forEach(function (item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		let text = this.textContent;
		catalogFilterCurrent.textContent = text;
	});
});

const headerMenuBtn = document.querySelectorAll(
	".header__burger, .header__menu_close"
);
const headerMenu = document.querySelector(".header__menu");
headerMenuBtn.forEach(function (item) {
	item.addEventListener("click", function () {
		headerMenu.classList.toggle("active");
	});
});

const productMore = document.querySelectorAll(
	".product__info_subtitle, .product__arrow"
);

productMore.forEach(function (item) {
	item.addEventListener("click", function (e) {
		let productMoreContent = this.closest(".product-item").querySelector(
			".product__wrap"
		);
		let productMoreArrow = this.closest(".product-item").querySelector(
			".product__arrow"
		);
		productMoreArrow.classList.toggle("active");
		slideToggle(productMoreContent, 350);
	});
});

const toTopEl = document.querySelectorAll(".arrowTop");
toTopEl.forEach(function (item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
});

const orderCallBtn = document.querySelectorAll(".order-call-btn");
const orderCallPopup = document.querySelector(".popup__call");
orderCallBtn.forEach(function (item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		orderCallPopup.classList.add("active");
	});
});

const cardPopup = document.querySelector(".popup__call_product");
const cardBtn = document.querySelectorAll(".card-btn");
const popupTitleField = document.getElementById("productTitle");
const popupSizesField = document.getElementById("productSizes");
const popupSelectedInput = document.getElementById("selectedTable");
cardBtn.forEach(function (item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		let cardTitle = this.closest(".card").querySelector(".card__info h3")
			.textContent;
		let cardSizes = this.closest(".card").querySelector(".card__info span")
			.textContent;
		popupSelectedInput.value = cardTitle + " — " + cardSizes;
		popupTitleField.textContent = cardTitle;
		popupSizesField.textContent = cardSizes;
		cardPopup.classList.add("active");
	});
});

const popupCloseBtn = document.querySelectorAll(".popup__close");
popupCloseBtn.forEach(function (item) {
	item.addEventListener("click", function () {
		let closestPopup = this.closest(".popup");
		closestPopup.classList.remove("active");
	});
});

const policyBtn = document.getElementById("politic");
const policyPopup = document.querySelector(".modal");
policyBtn.addEventListener("click", function (e) {
	e.preventDefault();
	policyPopup.classList.toggle("active");
});

const subpopupTable = document.getElementById("selectTable");
const subpopupColor = document.getElementById("selectColor");
const subpopupSizes = document.getElementById("selectSizes");

const choosenTable = document.getElementById("choosenTable");
const choosenColor = document.getElementById("choosenColor");

const popupTables = document.querySelectorAll(".popup__view_item");
const popupColors = document.querySelectorAll(".popup__colors_item");

popupTables.forEach(function (item) {
	item.addEventListener("click", function () {
		let tableTitle = this.querySelector(".popup__table").textContent;
		choosenTable.value = tableTitle;
		subpopupTable.classList.remove("active");
		subpopupColor.classList.add("active");
	});
});

popupColors.forEach(function (item) {
	item.addEventListener("click", function () {
		choosenColor.value = this.id;
		subpopupColor.classList.remove("active");
		subpopupSizes.classList.add("active");
	});
});

const calcBtns = document.querySelectorAll(".calc-btn");
const calcPopup = document.querySelector(".popup__calc");

calcBtns.forEach(function (item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		calcPopup.classList.add("active");
		subpopupTable.classList.add("active");
		subpopupSizes.classList.remove("active");
	});
});
