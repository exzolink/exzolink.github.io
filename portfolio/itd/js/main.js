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


  var mySwiper = new Swiper('.news__container', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
    },
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
      600: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      1001: {
        slidesPerView: 2
      }
    }
  });

  var slider = new Swiper('.refs__container', {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '.refs__next',
      prevEl: '.refs__prev',
    }
  });

  var logos = new Swiper('.partners__container', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
    speed: 2500,
    freeMode: true,
    centeredSlides: true,
    autoplay: {
      delay: 0,
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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var element = document.querySelector(this.getAttribute('href'));
      var bodyRect = document.body.getBoundingClientRect().top;
      var elementRect = element.getBoundingClientRect().top;
      var elementPosition = elementRect - bodyRect;
      var offsetPosition = elementPosition + 5;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  $('.form__fields__products_select').select2({
    minimumResultsForSearch: -1,
    placeholder: 'Select all that apply'
  });

});
