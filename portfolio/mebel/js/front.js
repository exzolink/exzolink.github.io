'use strict';

const _mainSwiperInit = () => {

    let swiperMain = new Swiper('.swiper-container', {
        // Optional parameters
        autoplay: {
            delay: 3000,
        },
        speed: 800,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer: true,
    })
}

const _reviewSwiperInit = () => {

    setTimeout(() => {

        let swiperReview = new Swiper('.swiper-container-review', {
            // Optional parameters
            /* autoplay: {
                delay: 3000,
            }, */
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 24,
            breakpoints: {
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                // when window width is >= 1440px
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 24
                },
            },

            // If we need pagination
            pagination: {
                el: '.swiper-pagination-review',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-review-next',
                prevEl: '.swiper-button-review-prev',
            },
            observer: true,
        })
    }, 0);
}

document.addEventListener('DOMContentLoaded', _mainSwiperInit);
document.addEventListener('DOMContentLoaded', _reviewSwiperInit);