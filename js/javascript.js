//theme toggler
  let head = document.head,
      link = document.createElement('link');
  link.rel = 'stylesheet';
  if (localStorage.getItem('themeStyle') === 'dark') {
    link.href = 'css/style_dark.css';
    document.getElementById('theme-toggler').setAttribute('checked', true);
  }
  else {
  }
  head.appendChild(link); 

  document.getElementById('theme-toggler').addEventListener('change', ev => {
    let btn = ev.target;
    if (btn.checked) {
      console.log('yeap');
      link.href = 'css/style_dark.css';
      localStorage.setItem('themeStyle', 'dark');
    }
    else {
      link.href = 'css/style_light.css';
      localStorage.setItem('themeStyle', 'light');
    }
  });

// Slider Options
$(function(){
$('.portfolio-cards-container').slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  appendArrows: $('.portfolio-slider-arrows'),
  prevArrow: '<img src="img/back.png">',
  nextArrow: '<img src="img/next.png">',
  responsive: [
  {
    breakpoint: 600,
    settings: {
      slidesToScroll: 2,
      slidesToShow: 2
        }
      }
    ]
  });
});

// Navigation Scroll To #
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

// Diagram English
var dataset_en = [
  {
    value: 25,
    color: '#f0f0f0'
  }, {
    value: 75,
    color: 'darkcyan'
}
];
var maxValue = 25;
var container_en = $('.diag-eng');

var addSector = function(data, startAngle, collapse) {
  var sectorDeg = 3.6 * data.value;
  var skewDeg = 90 + sectorDeg;
  var rotateDeg = startAngle;
  if (collapse) {
    skewDeg++;
  }
  var sector = $('<div>', {
    'class': 'sector-eng'
  }).css({
    'background': data.color,
    'transform': 'rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)'
  });
  container_en.append(sector);
  return startAngle + sectorDeg;
};

dataset_en.reduce(function (prev, curr) {
  return (function addPart(data, angle) {
    if (data.value <= maxValue) {
      return addSector(data, angle, false);
    }
    return addPart({
      value: data.value - maxValue,
      color: data.color
    }, addSector({
      value: maxValue,
      color: data.color,
    }, angle, true));
  })(curr, prev);
}, 0);

// Diagram Russian
var dataset_ru = [
{
    value: 100,
    color: '#4D648D'
}
];
var maxValue = 25;
var container_ru = $('.diag-rus');

var addSector = function(data, startAngle, collapse) {
  var sectorDeg = 3.6 * data.value;
  var skewDeg = 90 + sectorDeg;
  var rotateDeg = startAngle;
  if (collapse) {
    skewDeg++;
  }
  var sector = $('<div>', {
    'class': 'sector-rus'
  }).css({
    'background': data.color,
    'transform': 'rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)'
  });
  container_ru.append(sector);
  return startAngle + sectorDeg;
};

dataset_ru.reduce(function (prev, curr) {
  return (function addPart(data, angle) {
    if (data.value <= maxValue) {
      return addSector(data, angle, false);
    }
    return addPart({
      value: data.value - maxValue,
      color: data.color
    }, addSector({
      value: maxValue,
      color: data.color,
    }, angle, true));
  })(curr, prev);
}, 0);

// Scroll Top Button
($(document).ready(function(){
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
    $('.button-up').show();
      } else {
    $('.button-up').hide();
    }
  });
}));
