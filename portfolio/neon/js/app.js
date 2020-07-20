var gallery = new Swiper('.zones__gallery_container', {
    slidesPerView: 4,
    spaceBetween: 6,
    observer: true,
    observeParents: true,
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

var games = new Swiper('.games__container', {
    slidesPerView: 4,
    spaceBetween: 12,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        355: {
            slidesPerView: 2
        },
        850: {
            slidesPerView: 3,
            spaceBetween: 24
        },
        1100: {
            slidesPerView: 4,
            spaceBetween: 24,
            allowTouchMove: false,
            simulateTouch: false,
            slidesPerColumnFill: 'row',
            slidesPerColumn: 2
        },
    }
});
