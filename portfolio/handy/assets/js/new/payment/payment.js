jQuery(document).ready(function () {
	jQuery('#payment-selector').select2({
		minimumResultsForSearch: Infinity
	});
});

jQuery('#checkbox-coupon').click(function (){
if (jQuery('#checkbox-coupon').is(':checked')){
	jQuery('.coupon-discount-block, .coupon-input, .coupon-reload').addClass('enabled');
} else {
	jQuery('.coupon-discount-block, .coupon-input, .coupon-reload').removeClass('enabled');
}
});

jQuery('#checkbox-agree').click(function (){
if (jQuery('#checkbox-agree').is(':checked')){
	jQuery('.privacy-notAgree').hide('slide');
	jQuery('.submit-btn').addClass('accepted');
} else {
	jQuery('.privacy-notAgree').show('slide');
	jQuery('.submit-btn').removeClass('accepted');
}
});

jQuery('#checkbox-agree2').click(function (){
if (jQuery('#checkbox-agree2').is(':checked')){
	jQuery('.privacy-notAgree2').hide('slide');
	jQuery('.submit-btn2').addClass('accepted');
} else {
	jQuery('.privacy-notAgree2').show('slide');
	jQuery('.submit-btn2').removeClass('accepted');
}
});

jQuery('#first-method').click(function(){
	jQuery(this).addClass('selected');
	jQuery('.form-bottom').addClass('activated');
	jQuery('#Choice1').trigger('click');
	jQuery('#second-method').removeClass('selected');
});

jQuery('#second-method').click(function(){
	jQuery(this).addClass('selected');
	jQuery('.form-bottom').addClass('activated');
	jQuery('#Choice2').trigger('click');
	jQuery('#first-method').removeClass('selected');
});

jQuery('#Choice1').click(function (){
	jQuery('.form-fiz').addClass('enabled');
	jQuery('.form-urid').removeClass('enabled');
});

jQuery('#Choice2').click(function (){
	jQuery('.form-urid').addClass('enabled');
	jQuery('.form-fiz').removeClass('enabled');
});

function openModal(){
    jQuery(".modal-bg, .modal").addClass("enabled");
}
function closeModal(){
    jQuery(".modal, .modal-bg").removeClass("enabled");
}

jQuery('.modal-inner__item').click(function(){
	jQuery(".modal, .modal-bg").removeClass("enabled");
});

