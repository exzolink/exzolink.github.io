var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    grabCursor: true,
    preloadImages: false,
    autoplay: {
        delay: 4000
    },
    lazy: {
        loadOnTransitionStart: true
      }
  });