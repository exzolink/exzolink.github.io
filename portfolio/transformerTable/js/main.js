const feedbackSlider = new Swiper ('.feedback-container', {
    slidesPerView: 3,
    spaceBetween: 60,
    navigation: {
        nextEl: '.feedback__arrow_right',
        prevEl: '.feedback__arrow_left',
      },
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        550: {
            slidesPerView: 2
        },
        1000: {
            slidesPerView: 3
        },
    }
})