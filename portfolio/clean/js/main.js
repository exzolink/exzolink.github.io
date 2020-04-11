$(document).ready(function () {

$('.content__inner_item').click(function () {
    let id = $(this).attr('id');
    $('.content__inner_item-desc').removeClass('visible');
    $('.content-info').find('#' + id).addClass('visible');
  });

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
    $('.content__inner_item-desc').removeClass('visible');
    }
  });

  $(document).click(function (e) {
    if (!$(e.target).closest('.content__inner_item, .content__inner_item-desc').length) {
      $(".content__inner_item-desc").removeClass("visible");
    }
  });

  $('[data-fancybox="gallery"]').fancybox({
      autoStart : true,
      preventCaptionOverlap: false,
  });

});