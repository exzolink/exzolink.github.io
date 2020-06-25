

  $('#slider-lg').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    fade: true,
    prevArrow: '<div class="slider-arrow"><img class="slide-arrow" src="img/arrow-left.svg" alt="<"></div>',
    nextArrow: '<div class="slider-arrow"><img class="slide-arrow" src="img/arrow-right.svg" alt=">"></div>',
    appendArrows: '.slider-lg-arrows',
    asNavFor: '#slider-bottom'
  });
  
  $('#slider-overview').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    fade: false,
    prevArrow: '<div class="slider-arrow mr-2"><img class="slide-arrow" src="img/arrow-left.svg" alt="<"></div>',
    nextArrow: '<div class="slider-arrow ml-2"><img class="slide-arrow" src="img/arrow-right.svg" alt=">"></div>',
    appendArrows: '.slider-overview-arrows',
    asNavFor: '#slider-lg'
  });
  
  $('#slider-bottom').slick({
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    asNavFor: '#slider-lg',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 460, 
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  });
  
  $('#slider-related').slick({
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    prevArrow: '<div class="slider-arrow mr-2"><img class="slide-arrow" src="img/arrow-left.svg" alt="<"></div>',
    nextArrow: '<div class="slider-arrow ml-2"><img class="slide-arrow" src="img/arrow-right.svg" alt=">"></div>',
    appendArrows: '.slider-related-arrows',
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('.add-wishlist').click(function () {
    if ($(this).hasClass('added')) {
      $(this).removeClass('added');
      $('.add-wishlist span').text('add to wishlist');
    }
    else {
      $(this).addClass('added');
      $('.add-wishlist span').text('added');
    }
    
  });

  // overview slider 
  $('#slider-lg .slider-lg__item').on('click', function() {
    $('.overview-img__wrap').removeClass('fade');
  });
  
  $('.overview-img__wrap').on('click', function(e) {
    let noOverview = e.target.closest('.slider-lg__item');
    let noOverview2 = e.target.closest('.slider-arrow');
    if (!noOverview && !noOverview2) {
      $('.overview-img__wrap').addClass('fade');
    }
  });

