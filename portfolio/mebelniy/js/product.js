var productThumbs = new Swiper(".product__thumbs", {
	direction: "vertical",
	slidesPerView: 4,
	slidesPerSlide: 1,
	slideToClickedSlide: true,
	spaceBetween: 18,
	mousewheel: true,
	loop: true,
	loopedSlides: 4,
	navigation: {
		nextEl: ".product__thumbs_next",
		prevEl: ".product__thumbs_prev",
	},
});
var productMain = new Swiper(".product__main", {
	slidesPerView: 1,
	allowTouchMove: false,
	simulateTouch: false,
	loop: true,
	spaceBetween: 15,
	loopedSlides: 4,
});
productMain.controller.control = productThumbs;
productThumbs.controller.control = productMain;

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
document.addEventListener("DOMContentLoaded", function () {
	for (i = 0; i < stars.length; i++) {
		var rating = new SimpleStarRating(stars[i]);
	}
});

const toCartBtn = document.getElementById("addToCart");
const toCompareBtn = document.getElementById("addToCompare");

if (document.getElementById("addToCart") !== null) {
	toCartBtn.addEventListener("click", addTo);
	toCompareBtn.addEventListener("click", addTo);
	checkBtnsState();
}

function checkBtnsState() {
	if (toCartBtn.classList.contains("active")) {
		toCartBtn.querySelector(".product__add_cart-btn").innerText =
			"Удалить из избранного";
        toCartBtn.querySelector("img").classList.add("active");
	}
	if (toCompareBtn.classList.contains("active")) {
		toCompareBtn.querySelector(".product__add_cart-btn").innerText =
			"Удалить из сравнения";
		toCompareBtn.querySelector("img").classList.add("active");
	}
}

function addTo() {
	console.log(this.id);
	if (this.id == "addToCart") {
		if (this.classList.contains("active")) {
			this.classList.remove("active");
			this.querySelector(".product__add_cart-btn").innerText =
				"Добавить в избранное";
			this.querySelector("img").classList.remove("active");
		} else {
			this.classList.add("active");
			this.querySelector(".product__add_cart-btn").innerText =
				"Удалить из избранного";
			this.querySelector("img").classList.add("active");
		}
	} else if (this.id == "addToCompare") {
		if (this.classList.contains("active")) {
			this.classList.remove("active");
			this.querySelector(".product__add_cart-btn").innerText =
				"Добавить в сравнение";
			this.querySelector("img").classList.remove("active");
		} else {
			this.classList.add("active");
			this.querySelector(".product__add_cart-btn").innerText =
				"Удалить из сравнения";
			this.querySelector("img").classList.add("active");
		}
	}
}
