$(document).ready(function(){

    // RANGE SLIDERS
    $( function() {
        $( "#slider-range1" ).slider({
        range: true,
        min: 0,
        max: 50000,
        values: [ 0, 50000 ],
        slide: function( event, ui ) {
            $( "#amount1" ).val( ui.values[ 0 ] + " руб"  );
            $( "#amount2" ).val( ui.values[ 1 ] + " руб" );
        }
        });
        $( "#amount1" ).val( $( "#slider-range1" ).slider( "values", 0 ) + " руб");
        $( "#amount2" ).val( $( "#slider-range1" ).slider( "values", 1 ) + " руб");
        
    } );

    $( function() {
        $( "#slider-range2" ).slider({
        range: true,
        min: 0,
        max: 50,
        values: [ 0, 50 ],
        slide: function( event, ui ) {
            $( "#amount3" ).val( ui.values[ 0 ] + " см");
            $( "#amount4" ).val( ui.values[ 1 ] + " см" );
        }
        });
        $( "#amount3" ).val( $( "#slider-range2" ).slider( "values", 0 ) + " см");
        $( "#amount4" ).val( $( "#slider-range2" ).slider( "values", 1 ) + " см" );
    } );

    $( function() {
        $( "#slider-range3" ).slider({
        range: true,
        min: 0,
        max: 50,
        values: [ 0, 50 ],
        slide: function( event, ui ) {
            $( "#amount5" ).val( ui.values[ 0 ] + " см");
            $( "#amount6" ).val( ui.values[ 1 ] + " см" );
        }
        });
    
        $( "#amount5" ).val( $( "#slider-range3" ).slider( "values", 0 ) + " см");
        $( "#amount6" ).val( $( "#slider-range3" ).slider( "values", 1 ) + " см" );
    } );

    //   ADAPTIVE RANGE SLIDER FOR GLIDE MOBILE
    $('#slider-range1').draggable();
    $('#slider-range2').draggable();
    $('#slider-range3').draggable();

});

    // FILTER BUTTON

    $(".catalog-filter__button").click(function(){
        $(".catalog-filter__container").toggleClass("filterOpen");
    });

    // FILTER OPEN CHILD
    $(".catalog-filter__nav li").click(function(){
        $(this).find(".child").toggleClass("child-open");
    });


    // HEADER - BASKET POPUP
var width = $(window).width();
    $(document).on('click', '#basket-toggle', function(e) {
        e.preventDefault();
        if (width > 1169) {
            $( '.basket-popup' ).toggleClass('show-popup');
        }
        else
            $( '.basket-mob, .basket-block-mobile' ).fadeToggle(150).toggleClass('opened');
            $( '.basket-icon' ).css({zIndex: '2003'});
            $( '.basket-number' ).css({zIndex: '2004'});
    });


    // HEADER - MENU POPUP
    $(document).on('click', '.menu-toggle', function(e) {
        e.preventDefault();
        $( '.menu-mobile' ).fadeToggle(150).toggleClass('opened');
        $( '.basket-icon' ).css({zIndex: '100'});
        $( '.basket-number' ).css({zIndex: '101'});
    });

    // SEARCH - INPUT FOCUS
    $( ".search-input" ).focus(function() {
        if (width > 1169) {
      $( '.contact-block' ).addClass('focused');
      $('.search').css({maxWidth: '630' + 'px'});
      $( '.info' ).hide('fast');
    }
  });
    $( ".search-input" ).focusout(function() {
        if (width > 1169) {
      $( '.contact-block' ).removeClass('focused');
      $('.search').css({maxWidth: '240' + 'px'});
      $( '.info' ).show(500);
    }
  });
    $( ".search-input" ).focus(function() {
        if (width > 319 && width < 767) {
      $( '.burger-btn, .logo-btn' ).hide(150);
    }
  });
    $( ".search-input" ).focusout(function() {
        if (width > 319 && width < 767) {
      $( '.burger-btn, .logo-btn' ).show(150);
    }
  });

    // HEADER - PHONE POPUP 
    $(document).on('click', '.phone-toggle', function(e) {
            e.preventDefault();
            $('.phone-popup').toggleClass('show-popup');
        });

    // FOOTER TABLET ADAPTIVE 
    if (width > 767 && width < 1169) {
    $('.element-one, .element-two').wrapAll('<div class="tablet-adaptive">');
    };


    // POPUPS CLOSE ON BODY CLICK
 $(document).click(function(event) {
  //if you click on anything except the modal itself or the "open modal" link, close the modal
  if (!$(event.target).closest(".basket-popup, #basket-toggle, .phone-toggle, .phone-popup").length) {
    $("body").find(".basket-popup, .phone-popup").removeClass("show-popup");
  }
});

  // POPUPS CLOSE ON ESCAPE
 document.addEventListener('keydown', function (e) {
    if(e.keyCode === 27) $('.basket-popup, .phone-popup').removeClass('show-popup');
  }); 


 // FIXED HEADER

$(document).on('click', '.menu-toggle', function() {
 if (($('.menu-mobile').hasClass('opened')) && width < 1170) {
    $('.navigation').css({position: 'relative'});
    $('.header').css({zIndex: 'auto'});
    window.scrollTo({top: 0, behavior: 'smooth'});
 }
    else {
        $('.navigation').css({position: 'fixed'});
        $('.header').css({zIndex: '9999'});
    }
});

$(document).on('click', '.basket-open', function() {
 if (width < 1170 && $('.basket-mob').hasClass('opened')) {
    $('.navigation').css({position: 'relative'});
    $('.header').css({zIndex: 'auto'});
    window.scrollTo({top: 0, behavior: 'smooth'});
 }
    else {
        if (width < 1170) {
        $('.navigation').css({position: 'fixed'});
        $('.header').css({zIndex: '9999'});
      }   
    }
});


 // DROPDOWN HEADER
$(".category, .promo").hover(function () {
    var $this = $(this);
    var menu;
    setTimeout(function () {
    if ((width > 1169) && (menu = $this.attr('id'))) {
        var menuId = menu.split('_');
        var target = $('#aa_' + menuId[1]);
        target.toggleClass('visible');
        if (!target.is(":visible")) {
            $this.removeClass('active');
            target.unbind('mouseover');
        } else $this.addClass('active');
        target.one('mouseover', function () {
            target.one('mouseout', function mouseout() {
                if (target.is(':hover')) {
                    target.one('mouseout', mouseout);
                    return;
                }
                $this.removeClass('active');
            });
        });
      };
  }, 500);
});


// DROPDOWN MOBILE

$(document).on('click', '.cat-mob, .promo-mob', function (e) {
    var $this = $(this);
    var menu;
    e.preventDefault();
    if ((width < 1168) && (menu = $this.attr('id'))) {
        var menuId = menu.split('_');
        var target = $('#list_' + menuId[1]);
        target.fadeToggle('fast');
      };
});

$(document).on('click', '.sm-li_main', function (e) {
    var $this = $(this);
    var menu;
    e.preventDefault();
    if ((width < 1168) && (menu = $this.attr('id'))) {
        var menuId = menu.split('_');
        var target = $('#test_' + menuId[1]);
        target.fadeToggle('fast');
      };
});

  $(function() {
    if (width < 600) {
    $('.slider-mp').slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    })
  };
});


    // SLICK SLIDERS
    $('.tab-pane').slick({
        variableWidth: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
    });



    // STICKY BLOCK
    $(window).scroll(function() {
      if ($(".item-page__content").scrollTop() >= 5) {
        $('.item-page__sidebar').addClass('fixed');
      } else {
        $('.item-page__sidebar').removeClass('fixed');
      }
    });

    // INPUT NUMBER
    $(document).ready(function () {
        $('.numb').number_plugin();
    });

    $("select option").click(function(){

    });    

    // STICKY BLOCK
    $(document).ready(function(){
        // Находим плавающий блок и делаем его плавающим
        $('.item-page__sidebar-container').stick_in_parent({
            // Отступ сверху
            offset_top: 10
        });
    });

    
    // HOVER COLORS
    $('.catalog-filter__colors__color').click(function(){
        if ($(".catalog-filter__colors__color").hasClass('color-active') ) {
            $(".catalog-filter__colors__color").removeClass('color-active');
            $(this).addClass('color-active');
                //Insert logic if you want a type of optional click/off click code
            } 
            else
            {
                $(this).addClass('color-active');
                //Insert event handling logic
            }
        });



