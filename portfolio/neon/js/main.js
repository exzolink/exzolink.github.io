var gallery = new Swiper('.zones__gallery_container', {
    slidesPerView: 4,
    spaceBetween: 6,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        360: {
            slidesPerView: 2,
        },
        760: {
            slidesPerView: 3,
        },
        1100: {
            slidesPerView: 4,
        },
    }
});