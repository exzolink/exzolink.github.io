// Sidebar menu
let $navLink = $('.nav-link');
let $wrapper = $('.wrapper');

$navLink.on('click', () => {
    $wrapper.toggleClass('sidebar--rollup');
    return false;
});

function notify(type, message) {
    var element = $('#' + type);
    element.children('.alert__title').html(message);
    element.addClass('alert--active');
    setTimeout(function () {
        element.removeClass('alert--active');
    }, 4000);
}

$('.alert__close').click(function () {
    $(this).parent().removeClass('alert--active');
});

$('#logout').click(function () {
    clearLocalStorage();
});

function clearLocalStorage(){
    localStorage.removeItem('city');
    localStorage.removeItem('area');
    localStorage.removeItem('company');
    localStorage.removeItem('class_object');
    localStorage.removeItem('ready_from');
    localStorage.removeItem('ready_to');
    localStorage.removeItem('date_start');
    localStorage.removeItem('date_end');
}