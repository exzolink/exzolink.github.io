/*var h=(new Date()).getHours();
var link = jQuery('.sidebar-title');             
if (h > 11 && h <  19) var new_text = link.text().replace('Maxim Gromenkov' , 'Добрый день');
link.text(new_text);*/

$('.nl-item1').on('click', function() {
  $('html,body').animate({scrollTop:$('.container').offset().top+"px"},{duration:1E3});
});

$('.nl-item2').on('click', function() {
  $('html,body').animate({scrollTop:$('.skills').offset().top+"px"},{duration:1E3});
});

$('.nl-item3').on('click', function() {
  $('html,body').animate({scrollTop:$('.portfolio').offset().top+"px"},{duration:1E3});
});

$('.nl-item4').on('click', function() {
  $('html,body').animate({scrollTop:$('.contact').offset().top+"px"},{duration:1E3});
});

$('.msg-btn').on('click', function() {
  $('html,body').animate({scrollTop:$('.contact').offset().top+"px"},{duration:1E3});
});



var elements = '';
$(function(){
  toolTiper('.tooltiper');
});
var eLtop = '';
var eLleft = '';
var eLtw = '';
var eLth = '';
var eLcontent= '';
function toolTiper(elements) {
  $(elements).each(function(){
      var eLcontent = $(this).attr('data-tooltip');
    $(this).append('<span class="tooltip">'+eLcontent+'</span>');
    var eLtw = $(this).find('.tooltip').width(),
        eLth = $(this).find('.tooltip').height();
    $(this).find('.tooltip').css({
      "top": (0 - eLth)+'px'
    });
  });
};