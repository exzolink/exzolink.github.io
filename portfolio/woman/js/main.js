"use strict";

// Фикс попапов на мобильных устройствах
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

if (window.innerWidth < 800) {
	window.addEventListener("resize", () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});
}

const mainpageBtns = document.querySelectorAll(".main__item_btn");
const mainpageLeftCloud = document.querySelector(".main__bg_left");
const mainpageRightCloud = document.querySelector(".main__bg_right");
const mainpageLeftBg = document.querySelector(".main__item_img.left");
const mainpageCenterBg = document.querySelector(".main__item_img.center");
const mainpageRightBg = document.querySelector(".main__item_img.right");
if (window.innerWidth > 1100) {
	mainpageBtns.forEach(function (item) {
		item.addEventListener("mouseover", function () {
			let itemId = item.getAttribute("data-btn");
			switch (itemId) {
				case "left":
					mainpageLeftBg.style.transform = "translateX(20%) scale(1.2)";
					mainpageCenterBg.style.transform = "translate(8%, 15%)";
					mainpageLeftCloud.style.transform = "translate(-10%, 4%)";
					mainpageRightCloud.style.transform = "translate(-10%, 4%)";
					break;
				case "center":
					mainpageCenterBg.style.transform = "translateY(0%) scale(1.1)";
					mainpageLeftBg.style.transform = "translateX(-5%)";
					mainpageRightBg.style.transform = "translateX(5%)";
					mainpageLeftCloud.style.transform = "translate(0%, -8%)";
					mainpageRightCloud.style.transform = "translate(0%, -8%)";
					break;
				case "right":
					mainpageRightBg.style.transform = "translateX(-10%) scale(1.2)";
					mainpageCenterBg.style.transform = "translate(-8%, 15%)";
					mainpageLeftCloud.style.transform = "translate(10%, 4%)";
					mainpageRightCloud.style.transform = "translate(10%, 4%)";
					break;
			}
		});

		item.addEventListener("mouseleave", function () {
			mainpageLeftBg.style.transform = "translateX(10%) scale(1)";
			mainpageCenterBg.style.transform = "translate(0%, 10%) scale(1)";
			mainpageRightBg.style.transform = "translate(0%, 0%) scale(1)";
			mainpageLeftCloud.style.transform = "translate(0%, 0%)";
			mainpageRightCloud.style.transform = "translate(0%, 0%)";
		});
	});
}

Spruce.store("modal", {
	open: false,
});
Spruce.store("modalTab", {
	tab: "uno",
});

if (document.getElementById("animated") !== null) {
	function anim() {
		let animBgItem = document.getElementById("animated-bg");

		let yPos = window.pageYOffset / 6;

		let bgCoords =
			"translate(" +
			(animBgItem.dataset.velocity - yPos / animBgItem.dataset.speed) +
			"%," +
			(yPos / animBgItem.dataset.speed) * 1.5 +
			"%)";
		animBgItem.style.transform = bgCoords;
	}

	window.addEventListener("scroll", function () {
		if (window.pageYOffset < 900) {
			anim();
		} else {
			return;
		}
	});
	anim();
}

let posts = new Swiper(".news__container", {
	slidesPerView: 3,
	centeredSlides: true,
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 10,
			centeredSlides: true,
			loop: true,
		},
		450: {
			slidesPerView: 2,
			spaceBetween: 15,
			centeredSlides: true,
			loop: true,
		},
		650: {
			slidesPerView: 2,
			spaceBetween: 25,
			centeredSlides: true,
			loop: true,
		},
		750: {
			slidesPerView: 2,
			spaceBetween: 30,
			centeredSlides: true,
			loop: true,
		},
		1140: {
			slidesPerView: 3,
			centeredSlides: false,
			allowTouchMove: false,
			simulateTouch: false,
		},
	},
});

let readmorePosts = new Swiper(".readmore__container", {
	slidesPerView: 3,
	centeredSlides: true,
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 10,
			centeredSlides: true,
			loop: true,
		},
		450: {
			slidesPerView: 2,
			spaceBetween: 15,
			centeredSlides: true,
			loop: true,
		},
		650: {
			slidesPerView: 2,
			spaceBetween: 25,
			centeredSlides: true,
			loop: true,
		},
		750: {
			slidesPerView: 2,
			spaceBetween: 30,
			centeredSlides: true,
			loop: true,
		},
		1140: {
			slidesPerView: 3,
			loop: false,
			centeredSlides: false,
			allowTouchMove: false,
			simulateTouch: false,
		},
	},
});
