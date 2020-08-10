// Frontend by exzolink
// exzolink.github.io

var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

if (window.innerWidth < 800) {
  window.addEventListener("resize", () => {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}

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

photos = new Swiper(".zones__gallery_container", {
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

games = new Swiper(".games__container", {
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

workers = new Swiper(".team__container", {
  slidesPerView: 4,
  spaceBetween: 24,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bulvars",
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

blog = new Swiper(".blog__container", {
  slidesPerView: 1,
  spaceBetween: 12,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

games.on("slideChange", function () {
  games.update();
});

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
    if (immediate && !timeout) func.apply(context, args);
  };
}

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

if (document.getElementById("mapContacts") !== null) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZ3JlZ29yeTEyMCIsImEiOiJja2N2NW1ld2UwMTMzMnFtc2ZoeWpiZHM3In0.97pEt9J1fujCDbmt-84mrw";
  var map = new mapboxgl.Map({
    container: "mapContacts",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [76.937, 43.243264],
    zoom: 17,
  });

  var marker = new mapboxgl.Marker().setLngLat([76.936931, 43.2429]).addTo(map);
}

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

window.onload = function () {
  var timePicker = document.querySelectorAll(".js-time-picker");
  for (var i = 0; i < timePicker.length; i++) {
    var picker = new Picker(timePicker[i], {
      format: "HH:mm",
      headers: false,
      controls: true,
    });
  }
};

var nextButton = document.querySelectorAll(".popupOrder__button_next");
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
    var selectedTime = (this.closest(".popupOrder__zone_inner").querySelector(
      ".selectedTime"
    ).value = startTime + " - " + endTime);
    var countPlaces = (this.closest(".popupOrder__zone_inner").querySelector(
      ".selectedPlaces"
    ).value = selectedPlaces);
  });
});

var place = document.querySelectorAll(".popupOrder__places_item:not(.busy)");
[].forEach.call(place, function (e) {
  e.addEventListener("click", function (e) {
    var selectPlace = this.classList.toggle("active");
  });
});

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
  open: "true",
});
Spruce.store("modalOrderTab", {
  tab: "steel",
});
Spruce.store("modalPrivacy", {
  open: "false",
});
