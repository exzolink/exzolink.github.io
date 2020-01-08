$(document).ready(function() {
    $('.categories-menu').select2({
    	minimumResultsForSearch: Infinity
    });
    $('.district-menu').select2({
    	minimumResultsForSearch: Infinity
    });
});


 $(function(){
 	$('.slider-for').slick({
 	 slidesToShow: 1,
  	slidesToScroll: 1,
  	arrows: false,
 	 fade: true,
  	asNavFor: '.slider-nav'
	});
});

 $(function(){
 	$('.slider-ad').slick({
 	 slidesToShow: 2,
  	slidesToScroll: 1,
  	arrows: true,
	});
});

$(function(){
	$('.slider-nav').slick({
  	slidesToShow: 3,
  	slidesToScroll: 1,
  	asNavFor: '.slider-for',
  	focusOnSelect: true,
  	vertical: true,
  	prevArrow: '<img src="images/up-btn.png">',
    nextArrow: '<img src="images/down-btn.png">',
	});
});