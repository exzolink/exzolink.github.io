jQuery(document).ready(function () {
	jQuery('#Select1').trigger('click');
});

jQuery('#checkbox-coupon').click(function (){
if (jQuery('#checkbox-coupon').is(':checked')){
	jQuery('.coupon-discount, .coupon-input, .coupon-reload').addClass('enabled');
} else {
	jQuery('.coupon-discount, .coupon-input, .coupon-reload').removeClass('enabled');
}
});

jQuery('#checkbox-agree').click(function (){
if (jQuery('#checkbox-agree').is(':checked')){
	jQuery('.privacy-notAgree').hide('slide');
	jQuery('.first-btn').addClass('accepted');
} else {
	jQuery('.privacy-notAgree').show('slide');
	jQuery('.first-btn').removeClass('accepted');
}
});

jQuery('#checkbox-agree2').click(function (){
if (jQuery('#checkbox-agree2').is(':checked')){
	jQuery('.privacy-notAgree2').hide('slide');
	jQuery('.second-btn').addClass('accepted');
} else {
	jQuery('.privacy-notAgree2').show('slide');
	jQuery('.second-btn').removeClass('accepted');
}
});

jQuery('#checkbox-agree4').click(function (){
if (jQuery('#checkbox-agree4').is(':checked')){
	jQuery('.privacy-notAgree3').hide('slide');
	jQuery('.third-btn').addClass('accepted');
} else {
	jQuery('.privacy-notAgree3').show('slide');
	jQuery('.third-btn').removeClass('accepted');
}
});

jQuery('#Select1').click(function(){
	jQuery('#first-method').addClass('selected');
	jQuery('.form-bottom').addClass('activated');
	jQuery('#Choice1').trigger('click');
	jQuery('#second-method').removeClass('selected');
	jQuery('.form-second').removeClass('activated');
});

jQuery('#Select2').click(function(){
	jQuery('#second-method').addClass('selected');
	jQuery('.form-second').addClass('activated');
	jQuery('#Choice5').trigger('click');
	jQuery('#first-method').removeClass('selected');
	jQuery('.form-bottom').removeClass('activated');
});

jQuery('#Choice1').click(function (){
	jQuery('.form-fiz').addClass('enabled');
	jQuery('.form-urid').removeClass('enabled');
});

jQuery('#Choice2').click(function (){
	jQuery('.form-urid').addClass('enabled');
	jQuery('.form-fiz').removeClass('enabled');
});

jQuery('#Choice4').click(function (){
	jQuery('.form-not-available').addClass('enabled');
	jQuery('.form-urid-second').removeClass('enabled');
});

jQuery('#Choice5').click(function (){
	jQuery('.form-urid-second').addClass('enabled');
	jQuery('.form-not-available').removeClass('enabled');
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

jQuery(window).resize(function (){
	var width = jQuery(window).width();
	if (width < 1000) {
		jQuery('.modal-inner__items-wrapper').remove();
	}
});
