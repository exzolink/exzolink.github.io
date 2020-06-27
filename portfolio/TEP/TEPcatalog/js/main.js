$(document).ready(function () {


  $('.navbar-mobile-btn').click(function () {
    openNav();
  });
  $('.overlay').click(function () {
    closeNav();
  });
  $('.navbar-mobile-btn-sec').click(function () {
    closeNav();
  });

  function openNav() {
    $('.overlay').addClass('active');
    $('.nav-mobile').addClass('active');
    $('.navbar-mobile-btn').addClass('active');
  };

  function closeNav() {
    $('.overlay').removeClass('active');
    $('.nav-mobile').removeClass('active');
    $('.navbar-mobile-btn').removeClass('active');
  };


  $('.nav-mobile .btn-search').click(function (e) {
    $(this).toggleClass('active');
    if ($('.nav-mobile .btn-search').hasClass('active')) {
      e.preventDefault();
      $('.nav-mobile input.form-control').attr('style', 'width: calc(100% - 42px) !important; margin-left: auto; transition: 0.3s;');
      $('.nav-mobile input.form-control').focus();
    } else {

    }

  });
  $('.nav-mobile input.form-control').change(function () {
  });
  $('.nav-mobile input.form-control').focusout(function () {
    if ($(this).val() == '') {
      $('.nav-mobile input.form-control').attr('style', 'width: 0 !important; margin-left: auto; transition: 0.3s;');
      $('.nav-mobile .btn-search').removeClass('active');
    } else {
      $('.nav-mobile .btn-search').addClass('active');

    }
  });

  $('.nav-mobile input.form-control').attr('placeholder', '');
  $('.nav-mobile input.form-control').attr('style', 'width: 0 !important; margin-left: auto; transition: 0.3s;');


  $('#filter-slider').slider({
    range: true,
    min: 30,
    max: 150,
    values: [30, 150],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#filter-slider" ).slider( "values", 0 ) +
    " - $" + $( "#filter-slider" ).slider( "values", 1 ) );

  $('.filter-btn').click(function () {
    $('.filter-btn').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#sort').select2({
    minimumResultsForSearch: -1,
});

$('.filter-open').click(function () {
  $('.catalog__filter').slideToggle(500);
});


});