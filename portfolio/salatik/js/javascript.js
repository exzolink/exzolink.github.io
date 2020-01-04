$('.svg-btn-builder').click(function (e) {
    $( '#' + $(this).data('toggleTarget') ).slideToggle(150);
});

$(function () {
		$('.svg-category').click(function (e) {
			e.preventDefault();
			$('.builder__inner-block-desc').toggle('slide');
		});
	});