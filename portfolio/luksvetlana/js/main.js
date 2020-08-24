'use strict';
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      var offset = document.querySelector('.nav').offsetHeight;
      var element = document.querySelector(this.getAttribute('href'));
      var bodyRect = document.body.getBoundingClientRect().top;
      var elementRect = element.getBoundingClientRect().top;
      var elementPosition = elementRect - bodyRect;
      var offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      }); 
    });
});