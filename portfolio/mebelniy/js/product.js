var productsThumbs = new Swiper(".products__thumbs", {
	slideToClickedSlide: true,
	spaceBetween: 18,
	mousewheel: true,
	loop: true,
	slidesPerSlide: 1,
	loopedSlides: 4,
	breakpoints: {
		320: {
			slidesPerView: 4,
		},
		1200: {
			direction: "vertical",
			slidesPerView: 4,
			navigation: {
				nextEl: ".products__thumbs_next",
				prevEl: ".products__thumbs_prev",
			},
		},
	},
});
var productsMain = new Swiper(".products__main", {
	slidesPerView: 1,
	loop: true,
	spaceBetween: 15,
	loopedSlides: 4,
	breakpoints: {
		1200: {
			allowTouchMove: false,
			simulateTouch: false,
		},
	},
});
productsMain.controller.control = productsThumbs;
productsThumbs.controller.control = productsMain;

var productsCollection = new Swiper(".products__collection", {
	slidesPerView: 4,
	observeParents: true,
	observer: true,
	initialSlide: 0,
	spaceBetween: 32,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			centeredSlides: true,
		},
		500: {
			slidesPerView: 2,
			centeredSlides: true,
		},
		750: {
			slidesPerView: 3,
		},
		1100: {
			slidesPerView: 4,
		},
	},
});

var SimpleStarRating = (function () {
	function SimpleStarRating(target) {
		function attr(name, d) {
			var a = target.getAttribute(name);
			return a ? a : d;
		}

		var max = parseInt(attr("data-stars", 5)),
			disabled = typeof target.getAttribute("disabled") != "undefined",
			defaultRating = parseFloat(attr("data-default-rating", 0)),
			currentRating = -1,
			stars = [];

		target.style.display = "inline-block";

		for (var s = 0; s < max; s++) {
			var n = document.createElement("span");
			n.className = "star";
			n.addEventListener("click", starClick);
			if (s > 0) stars[s - 1].appendChild(n);
			else target.appendChild(n);

			stars.push(n);
		}

		function disable() {
			target.setAttribute("disabled", "");
			disabled = true;
		}
		this.disable = disable;

		function enable() {
			target.removeAttribute("disabled");
			disabled = false;
		}
		this.enable = enable;

		function setCurrentRating(rating) {
			currentRating = rating;
			target.setAttribute("data-rating", currentRating);
			showCurrentRating();
		}
		this.setCurrentRating = setCurrentRating;

		function setDefaultRating(rating) {
			defaultRating = rating;
			target.setAttribute("data-default-rating", defaultRating);
			showDefaultRating();
		}
		this.setDefaultRating = setDefaultRating;

		this.onrate = function (rating) {};

		target.addEventListener("mouseout", function () {
			disabled = target.getAttribute("disabled") !== null;
			if (!disabled) showCurrentRating();
		});

		target.addEventListener("mouseover", function () {
			disabled = target.getAttribute("disabled") !== null;
			if (!disabled) clearRating();
		});

		showDefaultRating();

		function showRating(r) {
			clearRating();
			for (var i = 0; i < stars.length; i++) {
				if (i >= r) break;
				if (i === Math.floor(r) && i !== r) stars[i].classList.add("half");
				stars[i].classList.add("active");
			}
		}

		function showCurrentRating() {
			var ratingAttr = parseFloat(attr("data-rating", 0));
			if (ratingAttr) {
				currentRating = ratingAttr;
				showRating(currentRating);
			} else {
				showDefaultRating();
			}
		}

		function showDefaultRating() {
			defaultRating = parseFloat(attr("data-default-rating", 0));
			showRating(defaultRating);
		}

		function clearRating() {
			for (var i = 0; i < stars.length; i++) {
				stars[i].classList.remove("active");
				stars[i].classList.remove("half");
			}
		}

		function starClick(e) {
			if (disabled) return;

			if (this === e.target) {
				var starClicked = stars.indexOf(e.target);
				if (starClicked !== -1) {
					var starRating = starClicked + 1;
					setCurrentRating(starRating);
					if (typeof this.onrate === "function") this.onrate(currentRating);
					var evt = new CustomEvent("rate", {
						detail: starRating,
					});
					target.dispatchEvent(evt);
				}
			}
		}
	}

	return SimpleStarRating;
})();

const stars = document.querySelectorAll(".rating");

const toCartBtn = document.getElementById("addToCart");
const toCompareBtn = document.getElementById("addToCompare");

document.addEventListener("DOMContentLoaded", function () {
	for (i = 0; i < stars.length; i++) {
		var rating = new SimpleStarRating(stars[i]);
	}

	if (document.getElementById("addToCart") !== null) {
		toCartBtn.addEventListener("click", addTo);
		toCompareBtn.addEventListener("click", addTo);
		checkBtnsState();
	}
});

function checkBtnsState() {
	if (toCartBtn.classList.contains("active")) {
		toCartBtn.querySelector(".products__add_cart-btn").innerText =
			"Удалить из избранного";
	}
	if (toCompareBtn.classList.contains("active")) {
		toCompareBtn.querySelector(".products__add_cart-btn").innerText =
			"Удалить из сравнения";
	}
}

function addTo() {
	if (this.id == "addToCart") {
		if (this.classList.contains("active")) {
			this.classList.remove("active");
			this.querySelector(".products__add_cart-btn").innerText =
				"Добавить в избранное";
		} else {
			this.classList.add("active");
			this.querySelector(".products__add_cart-btn").innerText =
				"Удалить из избранного";
		}
	} else if (this.id == "addToCompare") {
		if (this.classList.contains("active")) {
			this.classList.remove("active");
			this.querySelector(".products__add_cart-btn").innerText =
				"Добавить в сравнение";
		} else {
			this.classList.add("active");
			this.querySelector(".products__add_cart-btn").innerText =
				"Удалить из сравнения";
		}
	}
}

var productTabs = document.querySelectorAll(".products__selector_item");
var productContent = document.querySelectorAll(".products__content_item");
[].forEach.call(productTabs, function (e) {
	e.addEventListener("click", function () {
		if (this.classList.contains("active") === false) {
			for (var i = 0; i < productTabs.length; i++) {
				productTabs[i].classList.remove("active");
			}
			for (var i = 0; i < productContent.length; i++) {
				productContent[i].classList.remove("active");
			}
			this.classList.add("active");
			var getID = this.getAttribute("data-tab");
			var getContent = document.querySelector("#" + getID);
			getContent.classList.add("active");
		}
	});
});
