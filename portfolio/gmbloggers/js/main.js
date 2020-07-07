'use strict';

document.addEventListener('lazybeforeunveil', function (e) {
  var bg = e.target.getAttribute('data-bg');
  if (bg) {
    e.target.style.backgroundImage = 'url(' + bg + ')';
  }
});

var closePrivacy = document.getElementById('close-privacy');
var openPrivacy = document.getElementById('privacy');
var Privacy = document.querySelector('.privacy');

var closeCall = document.getElementById('close-call');
var closeConsult = document.getElementById('close-consult');

var openPopup = document.querySelectorAll('.blogers__btn_price, .blogers__btn_call, .nav__order, .footer__button');
var callPopup = document.getElementById('call-popup');
var consultPopup = document.getElementById('consult-popup');
var openConsult = document.querySelectorAll('.header__order_btn');
var Popup = document.querySelectorAll('.popup');

closePrivacy.onclick = function () {
  Privacy.classList.toggle('open');
};

openPrivacy.onclick = function (e) {
  e.preventDefault();
  Privacy.classList.toggle('open');
};

closeCall.onclick = function (e) {
  e.preventDefault();
  callPopup.classList.remove('open');
};

closeConsult.onclick = function (e) {
  e.preventDefault();
  consultPopup.classList.remove('open');
};


[].forEach.call(openPopup, function (e) {
  e.addEventListener('click', function (e) {
    e.preventDefault();
    callPopup.classList.toggle('open');
  });
});

[].forEach.call(openConsult, function (e) {
  e.addEventListener('click', function (e) {
    e.preventDefault();
    consultPopup.classList.toggle('open');
  });
});

window.onload = function () {
  var Popups = document.querySelectorAll('.privacy, .popup');
  for (var i = 0; i < Popups.length; i++) {
    Popups[i].classList.add('page-loaded');
  }

  var preloader = document.querySelector('.preloader');
  setTimeout(function () {
    preloader.classList.add('content-loaded');
  }, 500);

};

mapboxgl.accessToken = 'pk.eyJ1IjoiZ21ibG9nZ2VycyIsImEiOiJja2M2aGZtdjUwYjN1MnlwODk4NDNuMGxtIn0._IIb-Ofy4fn2tJGzZoWgZA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [76.94, 43.230089],
  zoom: 12
});

var marker = new mapboxgl.Marker()
.setLngLat([76.946597, 43.230089])
.addTo(map);

var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  freeMode: true,
  speed: 30000,
  onlyExternal: true,
  allowTouchMove: false,
  simulateTouch: false,
  autoplay: {
    delay: 0
  },
  breakpoints: {
    320: {
      speed: 19000
    },
    650: {
      speed: 30000
    }
  }
});
