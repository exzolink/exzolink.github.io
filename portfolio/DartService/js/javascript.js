         $(function(){
            $('.slider').slick({
                vertical: true,
                verticalSwiping: true,
                slidesToShow: 2,
                slidesToSwipe: 2,
                autoplay: true,
                prevArrow: '<img src="img/up.png">',
        		nextArrow: '<img src="img/down.png">',
                responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
            });
        });



$(".tp-1").click(function(){
$(this).addClass('active');
$(".tp-2, .tp-3").removeClass('active');
$(".under-photo2, .under-photo3").hide();
$(".under-photo1").show("fast");
if ($(this).hasClass('active'))
    return;
});

$(".tp-2").click(function(){
$(this).addClass('active');
$(".tp-1, .tp-3").removeClass('active');
$(".under-photo1, .under-photo3").hide();
if ($(this).hasClass('active'))
	$(".under-photo2").show('fast');
if ($(this).hasClass('active'))
    return;
});

$(".tp-3").click(function(){
$(this).addClass('active');
$(".tp-1, .tp-2").removeClass('active');
$(".under-photo1, .under-photo2").hide();
$(".under-photo3").show("fast");
if ($(this).hasClass('active'))
    return;
});
