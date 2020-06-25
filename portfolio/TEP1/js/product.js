$(document).ready(function() {

// Stars feedback 

  var hover = false;
  $('.feedback-label__rating i').mouseout(function() {
    if (!hover) {
      $('.feedback-label__rating .feedback-stars').removeClass('passive');
    }
    hover = true;
    // let i = $('.feedback-label__rating i').index($(this));
    // let stars = $('.feedback-label__rating i');
    // stars = stars.splice(i);
    // stars.forEach(function(item) {
    //   console.log(item)
      
    //   // item.removeClass('active');
    // });

  });

  var star1 = $('#star1'),
  star2 = $('#star2'),
  star3 = $('#star3'),
  star4 = $('#star4'),
  star5 = $('#star5');
  
  star1.hover(function() {
    $(this).addClass('active')
    star2.removeClass('active');
    star3.removeClass('active');
    star4.removeClass('active');
    star5.removeClass('active');
    $('#feedback-reading').val($(this).attr('id'))
  });
  star2.hover(function() {
    $(this).addClass('active')
    star1.addClass('active')
    star3.removeClass('active');
    star4.removeClass('active');
    star5.removeClass('active');
    $('#feedback-reading').val($(this).attr('id'))
  });
  star3.hover(function() {
    $(this).addClass('active')
    star1.addClass('active')
    star2.addClass('active')
    star4.removeClass('active');
    star5.removeClass('active');
    $('#feedback-reading').val($(this).attr('id'))
  });
  star4.hover(function() {
    $(this).addClass('active')
    star1.addClass('active')
    star2.addClass('active')
    star3.addClass('active')
    star5.removeClass('active');
    $('#feedback-reading').val($(this).attr('id'))
  });
  star5.hover(function() {
    $(this).addClass('active')
    star1.addClass('active')
    star2.addClass('active')
    star3.addClass('active')
    star4.addClass('active')
    $('#feedback-reading').val($(this).attr('id'))
  });
  

});
