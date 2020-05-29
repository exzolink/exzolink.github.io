'use strict';

$(document).ready(function () {
  var options = {
    strings: ['Solutions', 'Routes', 'Spend'],
    typeSpeed: 150,
    loop: true,
    backSpeed: 50,
    backDelay: 2000
  };
  var typed = new Typed('.homepage__typed', options);

  $('.header__menu, .header__close, .header__popup_nav-link').click(function () {
    $('.header__popup').animate({ width: 'toggle' }, 400);
  });

  
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      1001: {
        slidesPerView: 3
      }
    }
  });
  

  var sections = $('section');
  var header = $('.header, .header__popup')
  var height = header.outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
      var top = $(this).offset().top - height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        header.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        header.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  });

  header.find('a').on('click', function (e) {
    var $el = $(this);
    var id = $el.attr('href');
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $(id).offset().top - height
    }, 500);

    return false;
  });

});