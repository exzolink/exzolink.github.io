'use strict';

$(document).ready(function () {

var options = {
    strings: ['Creative', 'Experts', 'Digital'],
    typeSpeed: 150,
    loop: true,
    backSpeed: 50,
    backDelay: 2000
  };
  var typed = new Typed('.homepage__typed', options);

$('.header__menu').click(function () {
  $('.header__popup').animate({width: 'toggle'}, 400);
});
$('.header__close').click(function () {
  $('.header__popup').animate({width: 'toggle'}, 400);
});


});