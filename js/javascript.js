/*var h=(new Date()).getHours();
var link = jQuery('.sidebar-title');             
if (h > 11 && h <  19) var new_text = link.text().replace('Maxim Gromenkov' , 'Добрый день');
link.text(new_text);*/


$('.nl-item1').on('click', function() {
  $('html,body').animate({scrollTop:$('.container').offset().top+"px"},{duration:500});
});

$('.nl-item3').on('click', function() {
  $('html,body').animate({scrollTop:$('.skills').offset().top+"px"},{duration:500});
});

$('.nl-item2').on('click', function() {
  $('html,body').animate({scrollTop:$('.title-portfolio').offset().top+"px"},{duration:500});
});

$('.nl-item4').on('click', function() {
  $('html,body').animate({scrollTop:$('.contact').offset().top+"px"},{duration:500});
});

$('.msg-btn').on('click', function() {
  $('html,body').animate({scrollTop:$('.contact').offset().top+"px"},{duration:500});
});






var dataset = [
  {
    value: 25,
    color: '#f0f0f0'
  }, {
    value: 75,
    color: 'darkcyan'
}
];

var maxValue = 25;
var container = $('.diag-eng');

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
  container.append(sector);

  return startAngle + sectorDeg;
};

dataset.reduce(function (prev, curr) {
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


var dataset = [
{
    value: 100,
    color: '#4D648D'
}
];

var maxValue = 25;
var container = $('.diag-rus');

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
  container.append(sector);

  return startAngle + sectorDeg;
};

dataset.reduce(function (prev, curr) {
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
