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
  }, 1000);
};


function submitHandler(e) {
  e.preventDefault();

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    console.log("readyState=", this.readyState, "statis=", this.status);
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("SUCCESS", this);
    }
  }

  request.open(this.method, this.action, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  var data = new FormData(this);
  for (var key of data.keys())
    console.log(key, data.get(key));

  request.send(data);
}

document.querySelectorAll("form").forEach(form =>
  form.addEventListener("submit", submitHandler)
);


var mySwiper = new Swiper ('.swiper-container', {
  loop: true,
  slidesPerView: 'auto',
  speed: 30000,
  freeMode: true,
  onlyExternal: true,
  simulateTouch: false,
  centeredSlides: true,
  autoplay: {
    delay: 0
  }
});
