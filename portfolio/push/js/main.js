'use strict';

$(document).ready(function () {

    $('.header__account').click(function (e) {
        e.preventDefault();
        $('.account__popup').fadeToggle(300);
    });

});