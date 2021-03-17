/*
 *  Custom jQuery and Javascript code.
 *
 *  @theme:  Audiopress
 *  @since:  1.0.0
 *
 */

/*
 *  Helps with accessibility for keyboard only users.
 *
 *  @from  skip-link-focus-fix.js
 *  @link  https://git.io/vWdr2
 *
 */
(function() {
	
	"use strict";
	
	var isWebkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    isOpera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    isIe     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( isWebkit || isOpera || isIe ) && document.getElementById && window.addEventListener ) {
		
		window.addEventListener( 'hashchange', function() {
			
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				
				return;
				
			}

			element = document.getElementById( id );

			if ( element ) {
				
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					
					element.tabIndex = -1;
					
				}

				element.focus();
				
			}
			
		}, false );
	
	}
	
})();

/*
 *  Custom jQuery code that the theme uses.
 *
 *  @since  1.0.0
 *
 */
jQuery(document).ready(function($){

	"use strict";
	
	/*
	 *  Enable fitVids for responsive videos.
	 *
	 */
	$('.site-main, .widget-area, .section-media-left, .section-media-right').fitVids();
	
	/*
	 *  Enable the use of Tooltips from Bootstrap.
	 *
	 */
	$('[data-toggle="tooltip"]').tooltip();
	
	/*
	 *  Add dropdown icons to menu items that have children.
	 *
	 */
	$('.off-canvas-navigation ul li.menu-item-has-children').prepend('<span class="dropdown-icon"><i class="fa fa-chevron-circle-down"></i></span>');
	
	/*
	 *  Initiate same page scrolling navigation.
	 *
	 *  @link  https://github.com/flesler/jquery.localScroll
	 *         https://github.com/flesler/jquery.scrollTo
	 *
	 */
	$('#main-navigation, #main-off-canvas-navigation, .section-history, .section-blog').localScroll({
		
		offset : -112,  // Compensate for the padding.
		hash   : true
		
	});
	
	/*
	 *  Click events to reveal submenus.
	 *
	 */
	$('.dropdown-icon').on( 'click', function(e){
		
		var icon = $(this).find('i');
		e.stopPropagation();
		
		if( icon.hasClass('fa-chevron-circle-down') ) {
			
			icon.removeClass('fa-chevron-circle-down');
			icon.addClass('fa-chevron-circle-up');
			
		} else if( icon.hasClass('fa-chevron-circle-up') ) {
			
			icon.removeClass('fa-chevron-circle-up');
			icon.addClass('fa-chevron-circle-down');
			
		}
		
		$(this).parent().find('> ul.sub-menu').toggleClass('in');
		
	});
	
	/*
	 *  Click events for opening and closing the "Off-Canvas"
	 *  navigation area.
	 *
	 */
	$('.off-canvas-nav-open').on( 'click', function(e){
		
		e.preventDefault();
		$('.off-canvas-nav-container').addClass('in');
		
	});
	
	$('.off-canvas-nav-close').on( 'click', function(e){
		
		e.preventDefault();
		$('.off-canvas-nav-container').removeClass('in');
		
	});
	
	$('.off-canvas-navigation .menu-item a').on( 'click', function(e){
		
		$('.off-canvas-nav-container').removeClass('in');
		
	});
	
	/*
	 *  Click events for opening and closing the "Off-Canvas"
	 *  search form.
	 *
	 */
	$('.off-canvas-search-open').on( 'click', function(e){
		
		e.preventDefault();
		$('.off-canvas-search-container').addClass('in');
		
	});
	
	$('.off-canvas-search-close').on( 'click', function(e){
		
		e.preventDefault();
		$('.off-canvas-search-container').removeClass('in');
		
	});
	
	/*
	 *  Click events for toggling the the visibility of
	 *  the shopping cart's contents.
	 *
	 */
	$('.off-canvas-cart').on( 'click', function(e){
		
		e.preventDefault();
		$('.site-shopping-cart').toggleClass('in');
		e.stopPropagation();
	
	});
	
	/*
	 *  Close the shopping cart if the user clicks outside the element.
	 *
	 */
	$('html').on( 'click', function(e) {
		
		if( $(e.target).is('.site-shopping-cart-inner, .site-shopping-cart-inner *') === false ) {
			
			if( $('.site-shopping-cart').hasClass('in') ) {
			
				$('.site-shopping-cart').removeClass('in');
			
			}
			
		}
		
	});
	
	/*
	 *  Functionality for the "Sticky" navigation bar.
	 *
	 *  Adds an "is-stuck" class if the user is away from the top of the page.
	 *  Adds an "is-top" class if the user is at the top of the page.
	 *
	 */
	var window_width = $(window).width();
	
	if( window_width > 767 ) {
		
		if( $(this).scrollTop() > 10 ){
			
			$('.site-navbar').addClass('is-stuck');
			$('.site-navbar').removeClass('is-top');
			
		}
		
	}
	
	/*
	 *  Swap classes for animations when the user scrolls
	 *  away from the top of the page.
	 *
	 */
	$(window).on( 'scroll', function(){
		
		var window_width = $(window).width();
		
		if( window_width > 767 ) {
		
			if( $(this).scrollTop() > 10 ){
			
				$('.site-navbar').addClass('is-stuck');
				$('.site-navbar').removeClass('is-top');
			
			} else {
			
				$('.site-navbar').addClass('is-top');
				$('.site-navbar').removeClass('is-stuck');
			
			}
			
		}
		
	});
	
	/*
	 *  Functionality for the "Back to Top" Button.
	 *
	 *  Display the button if the user is further down the page.
	 *
	 */
	if( $(window).scrollTop() > 320 ) {
			
		$('.btt').addClass('in');
	
	}
	
	/*
	 *  Adds the "in" and "out" classes when scrolling based on the
	 *  users position on the page.
	 *
	 */
	$(window).on( 'scroll', function() {
	
		if( $(window).scrollTop() > 320 ) {
			
			$('.btt').addClass('in');
			
		} else {
			
			$('.btt').removeClass('in');
		
		}
	
	});
	
	/*
	 *  Click events for the button.
	 *
	 *  The "scrolling" var is used to prevent animations from queueing.
	 *  It works a bit nicer than using stop().
	 *
	 */
	var scrolling = false;
	
	$('.btt').on( 'click', function(e) {
	
		e.preventDefault();
		if( false === scrolling ) {
			
			scrolling = true;
			
			$('body, html').animate( { scrollTop: 0 } , 800, function(){
				
				scrolling = false;
				
			});
			
		}
	
	});
	
	/*
	 *  Change the value of the search form's submit button to
	 *  an icon.
	 *
	 */
	$('.search-submit, .woocommerce-product-search input[type="submit"]').attr( 'value', '\uf002' );
	
	/*
	 *  Initiate the slogan rotator if viewing the homepage.
	 *
	 *  @link  http://textillate.js.org/
	 *
	 */
	if( 'true' === custom.is_one_page ) {
		
		if( '1' === custom.slogan_loop )    { custom.slogan_loop    = true; }   else { custom.slogan_loop    = false; }
		if( '1' === custom.slogan_shuffle ) { custom.slogan_shuffle = true; }   else { custom.slogan_shuffle = false; }
		if( '1' === custom.slogan_reverse ) { custom.slogan_reverse = true; }   else { custom.slogan_reverse = false; }
		if( '1' === custom.slogan_words )   { custom.slogan_words   = 'word'; } else { custom.slogan_words   = 'char'; }
				
		$('.tlt').textillate({
			
			'loop'           : custom.slogan_loop,
			'minDisplayTime' : custom.slogan_display_time,
			'initialDelay'   : 0,
			'type'           : custom.slogan_words,
			'in'             : {
				
				'delayScale' : 1.5,
				'delay'      : custom.slogan_delay,
				'sync'       : false,
				'shuffle'    : custom.slogan_shuffle,
				'reverse'    : false
				
			},
			'out'            : {
				
				'delayScale' : 1.5,
				'delay'      : custom.slogan_delay,
				'sync'       : false,
				'shuffle'    : custom.slogan_shuffle,
				'reverse'    : custom.slogan_reverse
				
			}
			
		});
		
	}
	
	/*
	 *  Initiate the scrollreveal.js plugin.
	 *
	 *  @link  https://scrollrevealjs.org/
	 *
	 */
	if( 'true' === custom.is_sr ) {
		
		window.sr = ScrollReveal({
			
			duration   : 1200,
			delay      : 0,
			distance   : '20px',
			scale      : 1,
			easing     : 'ease-in-out',
			viewFactor : 0.3
			
		});
		sr.reveal( '.section-header',                     { origin: 'top' } );
		sr.reveal( '.section-history-left-column',        { origin: 'left' } );
		sr.reveal( '.section-history-middle-column',      { origin: 'bottom' } );
		sr.reveal( '.section-history-right-column',       { origin: 'right' } );
		sr.reveal( '.in-left',                            { origin: 'left' } );
		sr.reveal( '.in-right',                           { origin: 'right' } );
		sr.reveal( '.section-blog-cta',                   { origin: 'bottom' } );
		sr.reveal( '.countdown-text',                     { origin: 'top' } );
		sr.reveal( '.audiopress-countdown',               { origin: 'bottom' } );
		sr.reveal( '.woocommerce ul.products li.product', { origin: 'bottom' }, 50 );
		sr.reveal( '.lineup-column-header',               { origin: 'top' } );
		sr.reveal( '.lineup-listing li',                  { origin: 'bottom' },50 );
		
	}
	
	/*
	 *  Initiate masonry if viewing the homepage.
	 *
	 *  @link  http://masonry.desandro.com/
	 *
	 */
	if( 'true' === custom.is_one_page ) {
		
		var gallery = $('.audiopress-gallery').imagesLoaded( function() {
			
			gallery.masonry({
			
				itemSelector    : '.audiopress-gallery .gallery-item',
				columnWidth     : '.audiopress-gallery .grid-sizer',
				percentPosition : true
				
			});
			
		});
		
		if( 'true' === custom.is_sr ) {
			
			gallery.on( 'layoutComplete', function( event, items ){
				
				sr.reveal( '.gallery-item', { origin: 'bottom' }, 50 );
				
			});
			
		}
		
	}
	
	/*
	 *  Initiate the countdown timer for the countdown section.
	 *
	 *  @link  http://hilios.github.io/jQuery.countdown/
	 *
	 */
	if( 'true' === custom.is_one_page ) {
		
		var countdown_markup = ''
			+ '<div class="col-xs-3 col-md-2 col-md-offset-2">'
				+ '<div class="countdown-box countdown-days">'
					+ '<span class="countdown-number">%D</span>'
					+ '<span class="countdown-label">' + custom.countdown_days + '</span>'
				+ '</div>'
			+ '</div>'
			+ '<div class="col-xs-3 col-md-2">'
				+ '<div class="countdown-box countdown-hours">'
					+ '<span class="countdown-number">%H</span>'
					+ '<span class="countdown-label">' + custom.countdown_hours + '</span>'
				+ '</div>'
			+ '</div>'
			+ '<div class="col-xs-3 col-md-2">'
				+ '<div class="countdown-box countdown-minutes">'
					+ '<span class="countdown-number">%M</span>'
					+ '<span class="countdown-label">' + custom.countdown_minutes + '</span>'
				+ '</div>'
			+ '</div>'
			+ '<div class="col-xs-3 col-md-2">'
				+ '<div class="countdown-box countdown-seconds">'
					+ '<span class="countdown-number">%S</span>'
					+ '<span class="countdown-label">' + custom.countdown_seconds + '</span>'
				+ '</div>'
			+ '</div>';
		
		$('.audiopress-countdown').countdown( custom.countdown_date, function( event ) {
			
			var $this = $(this).html( event.strftime( countdown_markup ) );
			
		});
		
	}
	
});

/*
 *  Site Preloader.
 *
 *  Fade out the preloading animation when the site has fully loaded.
 *  This uses the CSS class .site-preloader.out for the fading animation.
 *
 */
jQuery(window).on( 'load', function(){
	
	jQuery('.site-preloader').delay( 300 ).addClass('out');

	var lazyScripts = document.querySelectorAll('.lazyload-js');
	lazyScripts.forEach(function (script) {
		var scriptSrc = script.getAttribute('data-src');
		script.src = scriptSrc;
	})
	
});