document.addEventListener('lazybeforeunveil', function (e) {
    var bg = e.target.getAttribute('data-bg');
    if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});

function fetchSteel() {
    fetch('/partials/steelzoneHardware.html')
        .then(response => response.text())
        .then(html => { $refs.steelHard.innerHTML = html })
}

var gallery = new Swiper('.zones__gallery_container', {
    slidesPerView: 4,
    spaceBetween: 6,
    preloadImages: false,
    lazy: {
        loadPrevNext: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        360: {
            slidesPerView: 2,
        },
        900: {
            slidesPerView: 3,
        },
        1100: {
            slidesPerView: 4,
            allowTouchMove: false,
            simulateTouch: false
        },
    }
});
