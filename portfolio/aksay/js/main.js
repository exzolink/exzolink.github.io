"use strict";

const videoWrapper = document.querySelectorAll("#video");
const shine = document.querySelector(".header__shine");
videoWrapper.forEach((item) => {
	window.addEventListener("load", () => {
		item.innerHTML +=
			"<video src='imgs/videoBg.mp4' muted autoplay loop alt=''></video>";
	});
});

if (document.querySelector(".header__shine") !== null) {
	window.addEventListener("load", () => {
		shine.classList.add("active");
	});
}

if (document.querySelector(".slider-img__container") !== null) {
	const slider_img = new Swiper(".slider-img__container", {
		slidesPerView: 1,
		loop: true,
		loopedSlides: 4,
		allowTouchMove: false,
		simulateTouch: false,
	});

	const slider_text = new Swiper(".slider-text__container", {
		slidesPerView: 1,
		loop: true,
		loopedSlides: 4,
		allowTouchMove: false,
		simulateTouch: false,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	slider_text.controller.control = slider_img;
}

const popupBtns = document.querySelectorAll(".button, .popup__close");
const popup = document.querySelector(".popup");
popupBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		popup.classList.toggle("active");
	});
});

function submitHandler(e) {
	e.preventDefault();

	let request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			const popupSuccess = document.querySelector(".popup__success");
			popupSuccess.classList.add("active");
			setTimeout(() => {
				popup.classList.remove("active");
				popupSuccess.classList.remove("active");
			}, 1500);

			let closestInputs = e.target.querySelectorAll("input");
			for (let i = 0; i < closestInputs.length; i++) {
				closestInputs[i].value = "";
			}
		}
	};

	request.open(this.method, this.action, true);

	var data = new FormData(this);
	request.send(data);
}

document
	.querySelectorAll("form")
	.forEach((form) => form.addEventListener("submit", submitHandler));

if (window.innerWidth > 1300 && document.querySelector('.watcher') !== null) {
	class ACTIVE_SCROLL {
		constructor(settings) {
			this.nav = document.querySelector(".watcher");
			this.offSet = settings.offSet || 0;
			this.navItems = this.nav.children;
			this.navArray = Array.from(this.navItems);
			this.activeString = settings.activeClass || "active";
			this.setPros();
			this.eventsSroll();
			this.events();
		}
		activeItem = 0;

		setPros = () => {
			this.pros = [];
			this.navArray.forEach((nav) => {
				const id = nav.getAttribute("data-section");
				console.log(id);
				const section = document.querySelector(id);
				this.pros.push(section.offsetTop - 100);
			});
		};
		eventsSroll() {
			window.addEventListener("scroll", this.checkNav, false);
		}
		events() {
			window.addEventListener("resize", this.setPros, false);
		}
		eventsSrollOff() {
			window.removeEventListener("scroll", this.checkNav, false);
		}

		scrollLocation = (winY) => {
			for (var i = 0; i < this.pros.length; i++) {
				if (i < this.pros.length - 1) {
					const next = this.pros[i + 1];

					if (winY >= this.pros[i] && winY < next) {
						return i;
					}
				} else if (i === this.pros.length - 1 && winY >= this.pros[i]) {
					return i;
				}
			}
		};

		checkNav = (e) => {
			const index = this.scrollLocation(window.pageYOffset);

			if (this.activeItem !== index) {
				const current = this.activeItem;

				this.activeItem = index;
				this.navItems[current].classList.remove(this.activeString);
				this.navItems[index].classList.add(this.activeString);
			}
		};
	}

	new ACTIVE_SCROLL({
		nav: ".watcher",
	});
}


var phone = document.getElementById('phone');
var maskOptions = {
  mask: '+{7} (000) 000-00-00',
};
var mask = IMask(phone, maskOptions);