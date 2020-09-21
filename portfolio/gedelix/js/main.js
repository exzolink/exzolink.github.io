"use strict";

if (document.querySelector(".feedback__container") !== null) {
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
}

let toPreload = document.querySelectorAll(".preload");
window.addEventListener("load", function () {
	for (let i = 0; i < toPreload.length; i++) {
		toPreload[i].rel = "stylesheet";
	}
});

if (document.querySelector(".map__canvas") !== null) {
	const getMap = document.querySelector(".map__canvas");
	window.addEventListener("load", function () {
		getMap.innerHTML =
			'<iframe loading="lazy" src="https://yandex.ru/map-widget/v1/?um=constructor%3A79f16e6093c9276a2c95795219418b17278605d0f9e56dc31bc694c39cb318cb&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>';
	});
}

var tabs = document.querySelectorAll(".js-selector");
var content = document.querySelectorAll(".js-body");
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
			var getContent = this.closest(".buy").querySelector("#" + getID);
			getContent.classList.add("active");
		}
	});
});

var tabsPopup = document.querySelectorAll(".js-selector-popup");
var contentPopup = document.querySelectorAll(".js-body-popup");
tabsPopup.forEach(function (e) {
	e.addEventListener("click", function () {
		if (this.classList.contains("active") === false) {
			for (var i = 0; i < tabsPopup.length; i++) {
				tabsPopup[i].classList.remove("active");
			}
			for (var i = 0; i < contentPopup.length; i++) {
				contentPopup[i].classList.remove("active");
			}
			this.classList.add("active");
			var getID = this.getAttribute("data-tab");
			var getContent = this.closest(".buy").querySelector("#" + getID);
			getContent.classList.add("active");
		}
	});
});

var popupBtn = document.querySelectorAll(".js-buy-btn, .popup__close");
var popup = document.querySelector(".popup");
popupBtn.forEach(function (e) {
	e.addEventListener("click", function (e) {
		e.preventDefault();
		popup.classList.toggle("active");
		document.documentElement.classList.toggle("open");
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

var animOnload = document.querySelectorAll(".anim-onload");
window.onload = function () {
	for (var i = 0; i < animOnload.length; i++) {
		animOnload[i].classList.add("active");
	}
};

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

var animOnscroll = document.querySelectorAll(".anim-onscroll");
if (animOnscroll.length > 0) {
	window.addEventListener("scroll", animOnScroll);
	function animOnScroll() {
		for (var i = 0; i < animOnscroll.length; i++) {
			var animItem = animOnscroll[i];
			var animItemHeight = animItem.offsetHeight;
			var animItemOffset = offset(animItem).top;
			var animStart = 4;

			var animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if (
				pageYOffset > animItemOffset - animItemPoint &&
				pageYOffset < animItemOffset + animItemHeight
			) {
				animItem.classList.add("active");
			} else {
				animItem.classList.remove("active");
			}
		}
	}

	function offset(e) {
		var rect = e.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
}

if (document.querySelector(".buy__video") !== null) {
	var video = document.querySelector(".buy__video");
	var videoInt = setInterval(() => {
		if (document.querySelector(".buy__video").classList.contains("active")) {
			video.play();
		}
	}, 1000);

	video.addEventListener("ended", function () {
		video.pause();
		clearInterval(videoInt);
	});
}
