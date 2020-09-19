/* Frontend by exzolink
exzolink.github.io */

"use strict";

// Хранение начальных значений модальных окон
Spruce.store("modalRegister", {
	open: "false",
});
Spruce.store("modalPacketDay", {
	open: "false",
});
Spruce.store("modalPacketNight", {
	open: "false",
});
Spruce.store("modalCoop", {
	open: "false",
});
Spruce.store("modalVac", {
	open: "false",
});
Spruce.store("modalOrder", {
	open: "false",
});
Spruce.store("modalOrderTab", {
	tab: "tuf",
});
Spruce.store("modalPrivacy", {
	open: "false",
});

// Декоратор (позволяет задать интервал вызова функции)
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && timeout !== true) func.apply(context, args);
	};
}

// Асинхронная загрузка линков
var linksToPreload = document.querySelectorAll(".js-preload");
window.addEventListener("load", function () {
	for (var i = 0; i < linksToPreload.length; i++) {
		linksToPreload[i].rel = "stylesheet";
	}
});

// Скрытие верхней панели при скролле вниз
var header = document.querySelector(".header");
var scrollPrev = 0;
var togglePanel = debounce(function () {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if (scrolled > 115 && scrolled > scrollPrev) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
	scrollPrev = scrolled;

}, 500, true);
window.addEventListener("scroll", togglePanel);

// Инициализация слайдеров
var photos = new Swiper(".zones__gallery_container", {
	slidesPerView: 4,
	spaceBetween: 6,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		360: {
			slidesPerView: 2,
		},
		900: {
			slidesPerView: 3,
		},
		1100: {
			slidesPerView: 4,
			allowTouchMove: false,
			simulateTouch: false,
		},
	},
});

var games = new Swiper(".games__container", {
	slidesPerView: 4,
	spaceBetween: 12,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		355: {
			slidesPerView: 2,
		},
		850: {
			slidesPerView: 3,
			spaceBetween: 24,
		},
		1100: {
			slidesPerView: 4,
			spaceBetween: 30,
			allowTouchMove: false,
			simulateTouch: false,
			slidesPerColumnFill: "row",
			slidesPerColumn: 2,
		},
	},
});

var workers = new Swiper(".team__container", {
	slidesPerView: 4,
	spaceBetween: 24,
	grabCursor: true,
	pagination: {
		el: ".swiper-pagination",
		type: "bullets",
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		360: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		600: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		880: {
			slidesPerView: 4,
			spaceBetween: 24,
		},
	},
});

var blog = new Swiper(".blog__container", {
	slidesPerView: 1,
	spaceBetween: 12,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

document.addEventListener("DOMContentLoaded", function () {
	// Фикс попапов на мобильных устройствах
	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	if (window.innerWidth < 800) {
		window.addEventListener("resize", () => {
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	}

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

	// Инициализация карты на всех страницах (кроме контакты)
	var mapOn = false;
	if (document.getElementById("map") !== null) {
		var mapRender = debounce(function () {
			var getMap = document.getElementById("map");
			var mapCoords = getMap.offsetTop;

			if (pageYOffset * 1.8 > mapCoords && mapOn === false) {
				mapboxgl.accessToken =
					"pk.eyJ1IjoiZ3JlZ29yeTEyMCIsImEiOiJja2N2NW1ld2UwMTMzMnFtc2ZoeWpiZHM3In0.97pEt9J1fujCDbmt-84mrw";
				var map = new mapboxgl.Map({
					container: "map",
					style: "mapbox://styles/mapbox/dark-v10",
					center: [76.937, 43.243264],
					zoom: 17,
				});

				var marker = new mapboxgl.Marker()
					.setLngLat([76.936931, 43.2429])
					.addTo(map);

				mapOn = true;
			}
		}, 300);
		window.addEventListener("scroll", mapRender);
	}

	// Инициализация карты на странице "Контакты"
	if (document.getElementById("mapContacts") !== null) {
		mapboxgl.accessToken =
			"pk.eyJ1IjoiZ3JlZ29yeTEyMCIsImEiOiJja2N2NW1ld2UwMTMzMnFtc2ZoeWpiZHM3In0.97pEt9J1fujCDbmt-84mrw";
		var map = new mapboxgl.Map({
			container: "mapContacts",
			style: "mapbox://styles/mapbox/dark-v10",
			center: [76.937, 43.243264],
			zoom: 17,
		});

		var marker = new mapboxgl.Marker()
			.setLngLat([76.936931, 43.2429])
			.addTo(map);
	}

	// Печатающийся текст на главной странице
	if (document.getElementById("fadeToggle") !== null) {
		var options = {
			strings: ["Power On", "Game On", "Party On"],
			typeSpeed: 90,
			fadeOut: true,
			startDelay: 1000,
			backSpeed: 500,
			backDelay: 1000,
			loop: true,
		};
		var typed = new Typed("#fadeToggle", options);
	}

	// Параллакс на главной странице
	if (document.getElementById("parallax") !== null) {
		function parallax() {
			var $slider = document.getElementById("parallax");

			var yPos = window.pageYOffset / $slider.dataset.speed;
			yPos = -yPos;

			var coords = "50% " + yPos + "px";

			$slider.style.backgroundPosition = coords;
		}

		window.addEventListener("scroll", function () {
			if (window.pageYOffset < 650) {
				parallax();
			} else {
				return;
			}
		});
		parallax();
	}

	// Toggle спойлера на странице вакансий
	var vacButton = document.querySelectorAll(".vac__spoiler_button");
	[].forEach.call(vacButton, function (e) {
		e.addEventListener("click", function (e) {
			var target = this.closest(".vac__spoiler").querySelector(
				".vac__spoiler_content"
			);
			var targetArrow = this.querySelector(".vac__spoiler_arrow");
			slideToggle(target, 350);
			targetArrow.classList.toggle("active");
		});
	});

	function initOrderBtns() {
		// Инициализация попапа для выбора времени в попапе с бронированием
		var timePicker = document.querySelectorAll(".js-time-picker");
		for (var i = 0; i < timePicker.length; i++) {
			var picker = new Picker(timePicker[i], {
				format: "HH:mm",
				headers: false,
				controls: true,
			});
		}

		// Обработка данных при клике на кнопку "Дальше" во всех
		// вкладках попапа с бронированием (кроме PS4)
		var nextButton = document.querySelectorAll(".popupOrder__next");
		[].forEach.call(nextButton, function (e) {
			e.addEventListener("click", function (e) {
				var startTime = this.closest(".popupOrder__zone_inner").querySelector(
					".startTime"
				).value;
				var endTime = this.closest(".popupOrder__zone_inner").querySelector(
					".endTime"
				).value;
				var selectedPlaces = this.closest(
					".popupOrder__zone_inner"
				).querySelectorAll(".popupOrder__places_item.active").length;
				var selectedTime = (this.closest(
					".popupOrder__zone_inner"
				).querySelector(".selectedTime").value = startTime + " - " + endTime);
				var countPlaces = (this.closest(
					".popupOrder__zone_inner"
				).querySelector(".selectedPlaces").value = selectedPlaces);
			});
		});

		// Выбор компьютеров во всех вкладках попапа с бронированием (кроме PS4)
		var place = document.querySelectorAll(
			".popupOrder__places_item:not(.busy)"
		);
		[].forEach.call(place, function (e) {
			e.addEventListener("click", function (e) {
				var selectPlace = this.classList.toggle("active");
			});
		});

		// Выбор времени PS4 Room (попап)
		var timePS4 = document.querySelectorAll(
			".popupOrder__ps4_time-item:not(.busy)"
		);
		[].forEach.call(timePS4, function (e) {
			e.addEventListener("click", function (e) {
				var selectTime = this.classList.toggle("active");
			});
		});

		// Выбор форм в попапе брони
		document
			.querySelectorAll("form")
			.forEach((form) => form.addEventListener("submit", submitHandler));

		// Обработка данных при клике на кнопку "Дальше" в PS4 Room (попап)
		var nextPS4 = document.querySelectorAll(".popupOrder__ps4_next");
		var prevPS4 = document.querySelectorAll(".popupOrder__ps4_prev");
		[].forEach.call(nextPS4, function (e) {
			e.addEventListener("click", function (e) {
				var selectedTimes = this.closest(
					".popupOrder__zone_inner"
				).querySelectorAll(".popupOrder__ps4_time-item.active");
				var getTimesInput = this.closest(
					".popupOrder__zone_inner"
				).querySelector(".selectedTimes");

				for (var i = 0; i < selectedTimes.length; i++) {
					getTimesInput.value += selectedTimes[i].innerHTML + "\n";
				}

				if (window.innerWidth > 1200) {
					if (selectedTimes.length > 0) {
						getTimesInput.style.height = selectedTimes.length * 27 + "px";
					} else {
						getTimesInput.style.height = 27 + "px";
					}
				} else {
					if (selectedTimes.length > 0) {
						getTimesInput.style.height = selectedTimes.length * 19 + "px";
					} else {
						getTimesInput.style.height = 19 + "px";
					}
				}
			});
		});

		[].forEach.call(prevPS4, function (e) {
			e.addEventListener("click", function (e) {
				var getTimesInput = (this.closest(
					".popupOrder__zone_inner"
				).querySelector(".selectedTimes").value = "");
			});
		});

		// Кнопки + / - в попапе с бронированием
		var minusBtn = document.querySelectorAll("#startMinus, #endMinus");
		var plusBtn = document.querySelectorAll("#startPlus, #endPlus");

		// Обработка минуса
		[].forEach.call(minusBtn, function (e) {
			e.addEventListener("click", function (e) {
				var selectTimeInput = this.closest(
					".popupOrder__zone_time-select"
				).querySelector("input");
				var startHour = selectTimeInput.value.split(":");
				if (startHour[0] >= 10 && startHour[0] <= 23) {
					selectTimeInput.value = startHour[0] - 1 + ":" + startHour[1];
				}
				if (startHour[0] !== "00" && startHour[0] <= 10) {
					selectTimeInput.value = "0" + (startHour[0] - 1) + ":" + startHour[1];
				}
				if (startHour[0] === "00") {
					selectTimeInput.value = "23:" + startHour[1];
				}
			});
		});
		// Обработка плюса
		[].forEach.call(plusBtn, function (e) {
			e.addEventListener("click", function (e) {
				var selectTimeInput = this.closest(
					".popupOrder__zone_time-select"
				).querySelector("input");
				var endHour = selectTimeInput.value.split(":");
				if (endHour[0] >= 10 && endHour[0] < 23) {
					selectTimeInput.value = +endHour[0] + 1 + ":" + endHour[1];
				}
				if (endHour[0] !== "00" && endHour[0] < 10) {
					selectTimeInput.value = "0" + (+endHour[0] + 1) + ":" + endHour[1];
				}
				if (endHour[0] === "00") {
					selectTimeInput.value = "0" + (+endHour[0] + 1) + ":" + endHour[1];
				}
				if (endHour[0] === "09") {
					selectTimeInput.value = 10 + ":" + endHour[1];
				}
				if (endHour[0] === "23") {
					selectTimeInput.value = "00:" + endHour[1];
				}
			});
		});
	}

	// Проверка на наличие попапа (для брони) на странице и если true, то активация кнопок
	var orderFetched = false;
	var init = setInterval(() => {
		if (
			orderFetched === false &&
			document.querySelector(".popupOrder") !== null
		) {
			initOrderBtns();
			orderFetched = true;
			clearInterval(init);
		} else {
			return;
		}
	}, 1500);

	// Обработчик форм
	function submitHandler(e) {
		e.preventDefault();

		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			// Если все нужные данные введены и форма успешно отправлена
			if (
				this.readyState === XMLHttpRequest.DONE &&
				this.status === 200 &&
				e.target.hasAttribute("data-success")
			) {
				// Атрибут data-success устанавливается для формы и должен соответствовать id попапа
				var getAttr = e.target.getAttribute("data-success");
				var getPopup = document.querySelector("#" + getAttr);
				getPopup.classList.add("active");
				closeAllPopups();

				var closestInputs = e.target.querySelectorAll("input:not(.zone-info)");
				for (var i = 0; i < closestInputs.length; i++) {
					closestInputs[i].value = "";
				}
			}
		};

		request.open(this.method, this.action, true);

		var data = new FormData(this);
		request.send(data);
	}

	// Собираем все формы и вешаем listener на отправку
	document
		.querySelectorAll("form")
		.forEach((form) => form.addEventListener("submit", submitHandler));

	// Функция для возврата всех попапов в начальное состояние
	function closeAllPopups() {
		Spruce.store("modalRegister").open = "false";
		Spruce.store("modalPacketDay").open = "false";
		Spruce.store("modalPacketNight").open = "false";
		Spruce.store("modalCoop").open = "false";
		Spruce.store("modalVac").open = "false";
		Spruce.store("modalOrder").open = "false";
		Spruce.store("modalOrderTab").tab = "tuf";
		Spruce.store("modalPrivacy").open = "false";
	}

	// Кнопка X (закрыть) в попапе благодарности
	var closeBtn = document.querySelectorAll("#closeThanks");
	[].forEach.call(closeBtn, function (e) {
		e.addEventListener("click", function (e) {
			var getPopup = this.closest(".popup").querySelector(".popupThanks");
			getPopup.classList.remove("active");
			document.documentElement.classList.remove("open");
		});
	});

	// Ждем загрузку виджета инстаграм и удаляем лейбл
	var inst = setInterval(() => {
		if (
			document.querySelector(
				".instagram__content #eapps-instagram-feed-1 > a"
			) !== null
		) {
			var getLabels = document.querySelectorAll(
				".instagram__content #eapps-instagram-feed-1 > a"
			);
			for (var i = 0; i < getLabels.length; i++) {
				getLabels[i].remove();
			}
			clearInterval(inst);
		} else {
			return;
		}
	}, 1000);
});
