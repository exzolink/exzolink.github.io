"use strict";

var feedback = new Swiper(".feedback__container", {
	slidesPerView: 1,
	loop: true,
	autoplay: {
		delay: 5000,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

if (document.querySelector(".feedback__excerpt") !== null) {
	var feedbackText = new Readmore(".feedback__excerpt", {
		speed: 150,
		lessLink: '<a class="feedback__link" href="#">Скрыть</a>',
		moreLink: '<a class="feedback__link" href="#">Читать полный отзыв</a>',
		collapsedHeight: 102,
		heightMargin: 0,
	});
};

var tabs = document.querySelectorAll(".buy__selector_item");
var content = document.querySelectorAll(".buy__content");
tabs.forEach(function (e) {
	e.addEventListener("click", function () {
		if (this.classList.contains("active") === false) {
			for (var i = 0; i < tabs.length; i++) {
				tabs[i].classList.remove("active");
			}
			for (var i = 0; i < content.length; i++) {
				content[i].classList.remove("active");
			}
			this.classList.add("active");
			var getID = this.getAttribute("data-tab");
			var getContent = document.querySelector("#" + getID);
			getContent.classList.add("active");
		}
	});
});

var morePharms = document.querySelectorAll(".buy__link");
morePharms.forEach(function (e) {
	e.addEventListener("click", function (e) {
		e.preventDefault();
		var pharms = this.closest(".buy__content").querySelectorAll(
			".buy__pharms_item"
		);
		for (var i = 0; i < pharms.length; i++) {
			pharms[i].style.display = "flex";
		}
		this.remove();
	});
});

var mobileMenu = document.querySelector(".header__menu");
var burgerBtns = document.querySelectorAll("#openBurger, #closeBurger");
burgerBtns.forEach(function (e) {
	e.addEventListener("click", function (e) {
		e.preventDefault();
		mobileMenu.classList.toggle("active");
	});
});

document.querySelectorAll('a[href^="#"]').forEach((e) => {
	e.addEventListener("click", function (e) {
		e.preventDefault();
		mobileMenu.classList.remove("active");
		var element = document.querySelector(this.getAttribute("href"));
		var bodyRect = document.body.getBoundingClientRect().top;
		var elementRect = element.getBoundingClientRect().top;
		var elementPosition = elementRect - bodyRect;
		window.scrollTo({
			top: elementPosition,
			behavior: "smooth",
		});
	});
});
