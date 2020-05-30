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
      600: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      1001: {
        slidesPerView: 3
      }
    }
  });

  var slider = new Swiper('.refs__container', {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: '.refs__next',
      prevEl: '.refs__prev',
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
    minimumResultsForSearch: -1
  });


});


/* 
<div class="refs__item">
<p class="refs__item_desc">"IT Diversity’s deep relationships with major carriers allowed us to deliver  a  series of hardware  solutions to Charter"</p>
<p class="refs__item_by">Eric Pankonin, Integra Networks</p>
</div>
<div class="refs__item">
<p class="refs__item_desc">"IT Diversity is able to provide a unique suite of Expense Management solutions that deliver considerable savings"</p>
<p class="refs__item_by">Nisha Jagmohan, Avotus</p>
</div>
<div class="refs__item">
<p class="refs__item_desc">"IT Diversity’s team understands Wireless Expense Management at a detail level. We have regularly been able to save their clients over $1 Million on each engagement"</p>
<p class="refs__item_by">Randall Light, Ovation Wireless</p>
</div>
<div class="refs__item">
<p class="refs__item_desc">"IT Diversity’s has shown experience in both domestic and complex international broadband projects that produce results for their clients"</p>
<p class="refs__item_by">Jorge Granados, EMCOTEL</p>
</div>
<div class="refs__item">
<p class="refs__item_desc">"The IT Diversity team  is a pleasure to work with. Honest folks who  care deeply about their customers"</p>
<p class="refs__item_by">Ralph Wagner, ID Seal</p>
</div>
<div class="refs__item">
<p class="refs__item_desc">"Jamie and Nieves are well respected in the Technology marketplace. I have watched Jamie grow companies from scratch into large profitable organizations. Jamie has built trust and credibility with his clients and partners, and delivers on his word"</p>
<p class="refs__item_by">Caitlin O'Hagan, Jaymie Scotto & Associates</p>
</div>
<div class="refs__item">
<p class="refs__item_desc">"IT Diversity has proven to be a great partner in designing and building our Strategic Sourcing platform. Their Telecom and procurement expertise allowed our programmers to build a truly unique and powerful Auction platform"</p>
<p class="refs__item_by">Jonathan Rollason, Purchasing Auctions</p>
</div> 
*/