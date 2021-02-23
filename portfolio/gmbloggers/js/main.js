"use strict";

document.addEventListener("lazybeforeunveil", function (e) {
	var bg = e.target.getAttribute("data-bg");
	if (bg) {
		e.target.style.backgroundImage = "url(" + bg + ")";
	}
});

var closePrivacy = document.getElementById("close-privacy");
var openPrivacy = document.getElementById("privacy");
var Privacy = document.querySelector(".privacy");
var closeCall = document.getElementById("close-call");
var closeConsult = document.getElementById("close-consult");
var openPopup = document.querySelectorAll(
	".blogers__btn_price, .blogers__btn_call, .nav__order, .footer__button",
);
var callPopup = document.getElementById("call-popup");
var consultPopup = document.getElementById("consult-popup");
var openConsult = document.querySelectorAll(".header__order_btn");
var Popup = document.querySelectorAll(".popup");
var formSource = document.querySelector("#source");
var resultsBlock = document.querySelector(".results");
var statsPopup = document.querySelector("#stats-popup");
var statsBtns = document.querySelectorAll(".results__slide_button");

closePrivacy.onclick = function () {
	Privacy.classList.toggle("open");
};

openPrivacy.onclick = function (e) {
	e.preventDefault();
	Privacy.classList.toggle("open");
};

closeCall.onclick = function (e) {
	e.preventDefault();
	callPopup.classList.remove("open");
};

closeConsult.onclick = function (e) {
	e.preventDefault();
	consultPopup.classList.remove("open");
};

[].forEach.call(openPopup, function (e) {
	e.addEventListener("click", function (e) {
		e.preventDefault();
		callPopup.classList.toggle("open");
	});
});

[].forEach.call(openConsult, function (e) {
	e.addEventListener("click", function (e) {
		e.preventDefault();
		consultPopup.classList.toggle("open");
	});
});

window.onload = function () {
	var Popups = document.querySelectorAll(".privacy, .popup");
	for (var i = 0; i < Popups.length; i++) {
		Popups[i].classList.add("page-loaded");
	}

	var preloader = document.querySelector(".preloader");
	setTimeout(function () {
		preloader.classList.add("content-loaded");
	}, 500);
};

mapboxgl.accessToken =
	"pk.eyJ1IjoiZ21ibG9nZ2VycyIsImEiOiJja2M2aGZtdjUwYjN1MnlwODk4NDNuMGxtIn0._IIb-Ofy4fn2tJGzZoWgZA";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/dark-v10",
	center: [76.94, 43.230089],
	zoom: 12,
});

var marker = new mapboxgl.Marker().setLngLat([76.946597, 43.230089]).addTo(map);

var phone = document.getElementById("phone");
var phone1 = document.getElementById("phone-1");
var phone2 = document.getElementById("phone-2");
var maskOptions = {
	mask: "+0 000 000-00-00",
};
var mask = IMask(phone, maskOptions);
var mask1 = IMask(phone1, maskOptions);
var mask2 = IMask(phone2, maskOptions);

openPopup.forEach(function (btn) {
	btn.addEventListener("click", function () {
		switch (btn.classList.value) {
			case "blogers__btn_price": {
				var name = btn
					.closest(".blogers__item")
					.querySelector(".blogers__name");
				formSource.value = "Блогер " + name.textContent + " (узнать стоимость)";
				break;
			}
			case "blogers__btn_call": {
				var name = btn
					.closest(".blogers__item")
					.querySelector(".blogers__name");
				formSource.value = "Блогер " + name.textContent + " (заказ звонка)";
				break;
			}
			case "nav__order": {
				formSource.value = "Первый экран (заказ звонка)";
				break;
			}
			case "footer__button": {
				formSource.value = "Футер (заказ звонка)";
			}
		}
	});
});

var mySwiper = new Swiper(".about__container", {
	loop: true,
	slidesPerView: 1,
	freeMode: true,
	speed: 30000,
	onlyExternal: true,
	allowTouchMove: false,
	simulateTouch: false,
	autoplay: {
		delay: 0,
	},
	breakpoints: {
		320: {
			speed: 19000,
		},
		650: {
			speed: 30000,
		},
	},
});

var resultsTabs = document.querySelectorAll(".results__tab");
var resultsContent = document.querySelectorAll(".results__slider_wrapper");

var resultsSliders = new Swiper(".results__slider", {
	slidesPerView: 4,
	spaceBetween: 40,
	observer: true,
	observeParents: true,
	navigation: {
		nextEl: ".next-results",
		prevEl: ".prev-results",
	},
	breakpoints: {
		320: {
			spaceBetween: 25,
			slidesPerView: 1,
		},
		600: {
			spaceBetween: 25,
			slidesPerView: 2,
		},
		1000: {
			spaceBetween: 25,
			slidesPerView: 3,
		},
		1300: {
			spaceBetween: 25,
			slidesPerView: 4,
		},
		1500: {
			spaceBetween: 40,
		},
	},
});

resultsTabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		if (tab.classList.contains("active")) return;

		var tabContent = tab.dataset.tab;
		for (var i = 0; i < resultsContent.length; i++) {
			resultsContent[i].classList.remove("active");
			resultsTabs[i].classList.remove("active");
			resultsSliders[i].slideTo(0);
		}
		var selectContent = document.querySelector(
			`.results__slider_wrapper[data-tab="${tabContent}"]`,
		);
		selectContent.classList.add("active");
		tab.classList.add("active");
	});
});

async function statsPopupInit() {
	var response = await fetch("./statsPopup.html");
	const responseText = await response.text();
	statsPopup.innerHTML = responseText;

	var statsSliders = new Swiper(".stats-popup__container", {
		slidesPerView: "auto",
		centeredSlides: true,
		autoHeight: true,
		observer: true,
		observeParents: true,
		spaceBetween: 40,
		navigation: {
			nextEl: ".next",
			prevEl: ".prev",
		},
	});

	var statsSlider = document.querySelectorAll(".stats-popup__block");

	statsBtns.forEach(function (btn) {
		btn.addEventListener("click", function () {
			const blogerId = btn.closest(".results__slide").dataset.bloger;
			if (!blogerId) return;

			statsPopup.classList.add("open");
			for (var i = 0; i < statsSlider.length; i++) {
				statsSlider[i].classList.remove("active");
			}
			document
				.querySelector(`.stats-popup__block[data-bloger="${blogerId}"]`)
				.classList.add("active");

			setTimeout(() => {
				var event = new Event("resize", { bubbles: true, cancelable: true });
				document.documentElement.dispatchEvent(event);
				for (var i = 0; i < statsSliders.length; i++) {
					statsSliders[i].setTranslate(0);
					statsSliders[i].slideTo(0);
					statsSliders[i].update();
				}
			}, 100);
		});
	});

	var closeStats = document.getElementById("close-stats");
	closeStats.onclick = function (e) {
		e.preventDefault();
		statsPopup.classList.toggle("open");
	};
}

resultsBlock.addEventListener("pointermove", statsPopupInit, { once: true });
