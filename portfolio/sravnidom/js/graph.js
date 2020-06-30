
var ctx1 = document.getElementById('myChart_1').getContext('2d');
var ctx2 = document.getElementById('myChart_2').getContext('2d');
var ctx3 = document.getElementById('myChart_3').getContext('2d');

let gradientBg = ctx1.createLinearGradient(0, 500, 0, 0);
gradientBg.addColorStop(0, 'rgba(255,78,50,0.3)');
gradientBg.addColorStop(0.2, 'rgba(250,174,50,0.3)');
gradientBg.addColorStop(0.5, 'rgba(255,244,38,0.3)');
gradientBg.addColorStop(0.7, 'rgba(136,255,38,0.3)');
gradientBg.addColorStop(1, 'rgba(76,255,38,0.3)');
// SLIDER GRAPH #1 
 
var countBefore1 = 0;
var countAfter1 = 0;
var fromSlider1 = 1;
var toSlider1 = 12;
var a1 = 0;
var b1 = 0;
var c1 = 0;
var d1 = 0;
$('.graph-slider_1').slider({
  animate: "slow",
  step: 1,
  range: true,
  max: 24,
  min: 1,
  values: [fromSlider1, toSlider1],
  start: function (event, ui) {
    countBefore1 = Number(ui.values[1]) - Number(ui.values[0]) + 1;
    c1 = +ui.values[0] - 1;
    d1 = ui.values[1];
  },
  stop: function (event, ui) {
    if (ui.values[0] >= 1.1) {
      $('.graph-slider_1').parents('.graph-slider__wrap').find('.2018').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_1').parents('.graph-slider__wrap').find('.2018').attr('style', '');
    }
    if (ui.values[1] < 24) {
      $('.graph-slider_1').parents('.graph-slider__wrap').find('.2020').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_1').parents('.graph-slider__wrap').find('.2020').attr('style', '');
    }
    if (ui.values[1] >= 13 && ui.values[0] >= 13 || ui.values[1] <= 13 && ui.values[0] <= 13) {
      $('.graph-slider_1').parents('.graph-slider__wrap').find('.2019').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_1').parents('.graph-slider__wrap').find('.2019').attr('style', '');
    }
    a1 = +ui.values[0] - 1;
    b1 = ui.values[1];
    countAfter1 = Number(ui.values[1]) - Number(ui.values[0]) + 1;
    xGraph();
  },
});





// GRAPH #1 

var monthsLabels1 = ['1 мес.', '2 мес.', '3 мес.', '4 мес.', '5 мес.', '6 мес.', '7 мес.', '8 мес.', '9 мес.', '10 мес.', '11 мес.', '12 мес.', '13 мес.', '14 мес.', '15 мес.', '16 мес.', '17 мес.', '18 мес.', '19 мес.', '20 мес.', '21 мес.', '22 мес.', '23 мес.', '24 мес.'];

var lineFs = [0, 0.4, 2, 6, 3, 6, 5, 8, 4, 3, 4, 1, 0, 0.4, 2, 6, 3, 6, 5, 8, 4, 3, 4, 1];
var lineFs_1 = lineFs.slice();


var config_1 = {
  type: 'line',
  data: {
    labels: ['1 мес.', '2 мес.', '3 мес.', '4 мес.', '5 мес.', '6 мес.', '7 мес.', '8 мес.', '9 мес.', '10 мес.', '11 мес.', '12 мес.'],
    datasets: [{
      label: 'ЖК Скандинавия / дом 1',
      fill: true,
      backgroundColor: gradientBg,
      borderColor: '#8deb7c',
      pointBackgroundColor: '#ffffff',
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderWidth: 3,
      pointHoverBorderWidth: 4,
      pointHitRadius: 30,
      data: lineFs,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#8deb7c'
    }]
  },
  options: {
    responsive: true,
    aspectRatio: '3',
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltips: {
      enabled: false,
      custom: function (tooltipModel) {
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<div class="graph-tooltip"></div>';
          document.querySelector('#graph-wrap_1').appendChild(tooltipEl);
        }
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);
          var valueY = bodyLines[0].toString().split(' ');
          valueY = valueY[valueY.length - 1];
          var innerHtml = '';
          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; color:' + colors.borderColor;
            style += '; border-width: 2px';
            var circle = '<div class="graph-tooltip__circle" style="background-color:' + colors.borderColor + ';"><div class="graph-tooltip__line" style="background-color:' + colors.borderColor + '";></div></div>';
            // innerHtml += circle;
          });
          innerHtml += '';
          titleLines.forEach(function (title) {
            innerHtml += '<div class="graph-tooltip__title">' + valueY + '</div>';
          });
          innerHtml += '';
          var tableRoot = tooltipEl.querySelector('.graph-tooltip');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        // tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        // tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        var leftPos = tooltipModel.caretX + -48;
        if (leftPos < +50) {
          tooltipEl.style.left = 50 + 'px';
        } else if (leftPos > 985) {
          tooltipEl.style.left = 985 + 'px';
        } else {
          tooltipEl.style.left = leftPos + 'px';
        }
        tooltipEl.style.top = 7 + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    },
    hover: {
      mode: 'index',
      intersect: false
      // axis: 'y'
    },
    scales: {
      xAxes: [{
        ticks: {
          suggestedMin: 5,
          suggestedMax: 6,
          fontColor: '#808080',
          fontFamily: 'FuturaPTBook',
          fontSize: 12,
          padding: 5,
          fontStyle: 400
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          fontColor: '#808080',
          fontFamily: 'FuturaPTBook',
          fontSize: 12,
          padding: 5,
          fontStyle: 400
      },
        scaleLabel: {
          display: false
        }
      }]
    },
    layout: {
      padding: {
          left: 23,
          right: 0,
          top: 0,
          bottom: 0
      }
  },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  }
}




function xGraph() {
  if (b1 == d1) { 
    if (countBefore1 < countAfter1) {
      for (var i = countAfter1 - countBefore1; i > 0; i--) {
        if (config_1.data.datasets.length > 0) {
          config_1.data.labels.unshift(monthsLabels1[c1 - 1]);
          config_1.data.datasets[0].data.unshift(lineFs_1[c1]);
         
          window.myChart_1.update();
          c1 -=1;
        }
      }
    } else if (countBefore1 > countAfter1) {
      for (var i = countBefore1 - countAfter1; i > 0; i--) {
        config_1.data.labels.splice(0, 1);
        config_1.data.datasets.forEach(function (dataset) {
          dataset.data.splice(0, 1);
          dataset.data.pop();
        });
        config_1.data.datasets[0].data.push(lineFs_1[d1]);
        
        window.myChart_1.update();
        d1 -=1;
      }
    }
  } else if(a1 == c1) {
      if (countBefore1 < countAfter1) {
        for (var i = countAfter1 - countBefore1; i > 0; i--) {
          if (config_1.data.datasets.length > 0) {
            config_1.data.labels.push(monthsLabels1[d1]);
            config_1.data.datasets[0].data.push(lineFs_1[d1]);
          
            window.myChart_1.update();
            d1 +=1;
          }
        }
      } else if (countBefore1 > countAfter1) {
        for (var i = countBefore1 - countAfter1; i > 0; i--) {
          config_1.data.labels.splice(-1, 1); // remove the label first
          config_1.data.datasets.forEach(function (dataset) {
            dataset.data.pop();
          });
          window.myChart_1.update();
        }
      }
  }
}


// SLIDER GRAPH #12

var countBefore2 = 0;
var countAfter2 = 0;
var fromSlider2 = 1;
var toSlider2 = 12;
var a2 = 0;
var b2 = 0;
var c2 = 0;
var d2 = 0;
$('.graph-slider_2').slider({
  animate: "slow",
  step: 1,
  range: true,
  max: 24,
  min: 1,
  values: [fromSlider2, toSlider2],
  start: function (event, ui) {
    countBefore2 = Number(ui.values[1]) - Number(ui.values[0]) + 1;
    c2 = +ui.values[0] - 1;
    d2 = ui.values[1];
  },
  stop: function (event, ui) {
    if (ui.values[0] >= 1.1) {
      $('.graph-slider_2').parents('.graph-slider__wrap').find('.2018').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_2').parents('.graph-slider__wrap').find('.2018').attr('style', '');
    }
    if (ui.values[1] < 24) {
      $('.graph-slider_2').parents('.graph-slider__wrap').find('.2020').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_2').parents('.graph-slider__wrap').find('.2020').attr('style', '');
    }
    if (ui.values[1] >= 13 && ui.values[0] >= 13 || ui.values[1] <= 13 && ui.values[0] <= 13) {
      $('.graph-slider_2').parents('.graph-slider__wrap').find('.2019').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_2').parents('.graph-slider__wrap').find('.2019').attr('style', '');
    }
    a2 = +ui.values[0] - 1;
    b2 = ui.values[1];
    countAfter2 = Number(ui.values[1]) - Number(ui.values[0]) + 1;
    xGraph2();
  },
});


// GRAPH #2

var monthsLabels2 = ['1 мес.', '2 мес.', '3 мес.', '4 мес.', '5 мес.', '6 мес.', '7 мес.', '8 мес.', '9 мес.', '10 мес.', '11 мес.', '12 мес.', '13 мес.', '14 мес.', '15 мес.', '16 мес.', '18 мес.', '19 мес.', '20 мес.', '21 мес.', '22 мес.', '23 мес.', '24 мес.', '25 мес.'];

var lineSec1 = [6, 3, 6, 5, 8, 4, 3, 4, 1, 0, 4, 1, 0, 0.4, 2, 6, 3, 6, 5, 8, 4, 3, 4, 1];
var lineSec_1 = lineSec1.slice();


var config_2 = {
  type: 'line',
  data: {
    labels: ['1 мес.', '2 мес.', '3 мес.', '4 мес.', '5 мес.', '6 мес.', '7 мес.', '8 мес.', '9 мес.', '10 мес.', '11 мес.', '12 мес.'],
    datasets: [{
      label: 'ЖК Скандинавия / дом 1',
      fill: true,
      backgroundColor: gradientBg,
      borderColor: '#8deb7c',
      pointBackgroundColor: '#ffffff',
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderWidth: 3,
      pointHoverBorderWidth: 4,
      pointHitRadius: 30,
      data: lineSec1,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#8deb7c'
    }]
  },
  options: {
    responsive: true,
    aspectRatio: '3',
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltips: {
      enabled: false,
      custom: function (tooltipModel) {
        var tooltipEl = document.getElementById('chartjs-tooltip_2');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip_2';
          tooltipEl.innerHTML = '<div class="graph-tooltip"></div>';
          document.querySelector('#graph-wrap_2').appendChild(tooltipEl);
        }
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);
          var valueY = bodyLines[0].toString().split(' ');
          valueY = valueY[valueY.length - 1];
          var innerHtml = '';
          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; color:' + colors.borderColor;
            style += '; border-width: 2px';
          });
          innerHtml += '';
          titleLines.forEach(function (title) {
            innerHtml += '<div class="graph-tooltip__title">' + valueY + '</div>';
          });
          innerHtml += '';
          var tableRoot = tooltipEl.querySelector('.graph-tooltip');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        // tooltipEl.style.left = position.left + window.pageXOSelineSec1et + tooltipModel.caretX + 'px';
        // tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        var leftPos = tooltipModel.caretX + -48;
        if (leftPos < +50) {
          tooltipEl.style.left = 50 + 'px';
        } else if (leftPos > 985) {
          tooltipEl.style.left = 985 + 'px';
        } else {
          tooltipEl.style.left = leftPos + 'px';
        }
        tooltipEl.style.top = 7 + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    },
    hover: {
      mode: 'index',
      intersect: false
      // axis: 'y'
    },
    scales: {
      xAxes: [{
        ticks: {
          suggestedMin: 5,
          suggestedMax: 6,
          fontColor: '#808080',
          fontFamily: 'FuturaPTBook',
          fontSize: 12,
          padding: 5,
          fontStyle: 400
          
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false
        },
        ticks: {
          fontColor: '#808080',
          fontFamily: 'FuturaPTBook',
          fontSize: 12,
          padding: 5,
          fontStyle: 400
      },
      }]
    },
    layout: {
      padding: {
          left: 23,
          right: 0,
          top: 0,
          bottom: 0
      }
  },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  }
}
// window.onload = function () {
  // var ctx2 = document.getElementById('myChart_2').getContext('2d');
  // window.myChart_2 = new Chart(ctx2, config_2);
// }
function xGraph2() {
  if (b2 == d2) { 
    if (countBefore2 < countAfter2) {
      for (var i = countAfter2 - countBefore2; i > 0; i--) {
        if (config_2.data.datasets.length > 0) {
          config_2.data.labels.unshift(monthsLabels2[c2 - 1]);
          config_2.data.datasets[0].data.unshift(lineSec_1[c2]);
         
          window.myChart_2.update();
          c2 -=1;
        }
      }
    } else if (countBefore2 > countAfter2) {
      for (var i = countBefore2 - countAfter2; i > 0; i--) {
        config_2.data.labels.splice(0, 1);
        config_2.data.datasets.forEach(function (dataset) {
          dataset.data.splice(0, 1);
          dataset.data.pop();
        });
        config_2.data.datasets[0].data.push(lineSec_1[d2]);
       
        window.myChart_2.update();
        d2 -=1;
      }
    }
  } else if(a2 == c2) {
      if (countBefore2 < countAfter2) {
        for (var i = countAfter2 - countBefore2; i > 0; i--) {
          if (config_2.data.datasets.length > 0) {
            config_2.data.labels.push(monthsLabels2[d2]);
            config_2.data.datasets[0].data.push(lineSec_1[d2]);
            
            window.myChart_2.update();
            d2 +=1;
          }
        }
      } else if (countBefore2 > countAfter2) {
        for (var i = countBefore2 - countAfter2; i > 0; i--) {
          config_2.data.labels.splice(-1, 1); // remove the label first
          config_2.data.datasets.forEach(function (dataset) {
            dataset.data.pop();
          });
          window.myChart_2.update();
        }
      }
  }
}

// SLIDER GRAPH #3

var countBefore3 = 0;
var countAfter3 = 0;
var fromSlider3 = 1;
var toSlider3 = 12;
var a3 = 0;
var b3 = 0;
var c3 = 0;
var d3 = 0;
$('.graph-slider_3').slider({
  animate: "slow",
  step: 1,
  range: true,
  max: 24,
  min: 1,
  values: [fromSlider3, toSlider3],
  start: function (event, ui) {
    countBefore3 = Number(ui.values[1]) - Number(ui.values[0]) + 1;
    c3 = +ui.values[0] - 1;
    d3 = ui.values[1];
  },
  stop: function (event, ui) {
    if (ui.values[0] >= 1.1) {
      $('.graph-slider_3').parents('.graph-slider__wrap').find('.2018').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_3').parents('.graph-slider__wrap').find('.2018').attr('style', '');
    }
    if (ui.values[1] < 24) {
      $('.graph-slider_3').parents('.graph-slider__wrap').find('.2020').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_3').parents('.graph-slider__wrap').find('.2020').attr('style', '');
    }
    if (ui.values[1] >= 13 && ui.values[0] >= 13 || ui.values[1] <= 13 && ui.values[0] <= 13) {
      $('.graph-slider_3').parents('.graph-slider__wrap').find('.2019').css({
        'color': 'rgba(132, 132, 132, 0.5)'
      })
    } else {
      $('.graph-slider_3').parents('.graph-slider__wrap').find('.2019').attr('style', '');
    }
    a3 = +ui.values[0] - 1;
    b3 = ui.values[1];
    countAfter3 = Number(ui.values[1]) - Number(ui.values[0]) + 1;
    xGraph3();
  },
});


// GRAPH #3

var monthsLabels3 = ['1 мес.', '2 мес.', '3 мес.', '4 мес.', '5 мес.', '6 мес.', '7 мес.', '8 мес.', '9 мес.', '10 мес.', '11 мес.', '12 мес.', '13 мес.', '14 мес.', '15 мес.', '16 мес.', '18 мес.', '19 мес.', '20 мес.', '21 мес.', '22 мес.', '23 мес.', '24 мес.', '25 мес.'];

var lineTh1 = [0, 5, 0, 2, 3, 4, 5, 3, 8, 0, 5, 0, 2, 6, 4, 5, 3, 8];
var lineTh_1 = lineTh1.slice();

var config_3 = {
  type: 'line',
  data: {
    labels: ['1 мес.', '2 мес.', '3 мес.', '4 мес.', '5 мес.', '6 мес.', '7 мес.', '8 мес.', '9 мес.', '10 мес.', '11 мес.', '12 мес.'],
    datasets: [{
      label: 'ЖК Скандинавия / дом 1',
      fill: true,
      backgroundColor: gradientBg,
      borderColor: '#8deb7c',
      pointBackgroundColor: '#ffffff',
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderWidth: 3,
      pointHoverBorderWidth: 4,
      pointHitRadius: 30,
      data: lineTh1,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#8deb7c'
    }]
  },
  options: {
    responsive: true,
    aspectRatio: '3',
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltips: {
      enabled: false,
      custom: function (tooltipModel) {
        var tooltipEl = document.getElementById('chartjs-tooltip_3');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip_3';
          tooltipEl.innerHTML = '<div class="graph-tooltip"></div>';
          document.querySelector('#graph-wrap_3').appendChild(tooltipEl);
        }
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);
          var valueY = bodyLines[0].toString().split(' ');
          valueY = valueY[valueY.length - 1];
          var innerHtml = '';
          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; color:' + colors.borderColor;
            style += '; border-width: 2px';
          });
          innerHtml += '';
          titleLines.forEach(function (title) {
            innerHtml += '<div class="graph-tooltip__title">' + valueY + '</div>';
          });
          innerHtml += '';
          var tableRoot = tooltipEl.querySelector('.graph-tooltip');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        // tooltipEl.style.left = position.left + window.pageXOSelineSec1et + tooltipModel.caretX + 'px';
        // tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        var leftPos = tooltipModel.caretX + -48;
        if (leftPos < +50) {
          tooltipEl.style.left = 50 + 'px';
        } else if (leftPos > 985) {
          tooltipEl.style.left = 985 + 'px';
        } else {
          tooltipEl.style.left = leftPos + 'px';
        }
        tooltipEl.style.top = 7 + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    },
    hover: {
      mode: 'index',
      intersect: false
      // axis: 'y'
    },
    scales: {
      xAxes: [{
        ticks: {
          suggestedMin: 5,
          suggestedMax: 6,
          fontColor: '#808080',
          fontFamily: 'FuturaPTBook',
          fontSize: 12,
          padding: 5,
          fontStyle: 400
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false
        },
        ticks: {
          fontColor: '#808080',
          fontFamily: 'FuturaPTBook',
          fontSize: 12,
          padding: 5,
          fontStyle: 400
      },
      }]
    },
    layout: {
      padding: {
          left: 23,
          right: 0,
          top: 0,
          bottom: 0
      }
  },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  }
}
// window.onload = function () {
  // var ctx2 = document.getElementById('myChart_2').getContext('2d');
  // window.myChart_2 = new Chart(ctx2, config_2);
// }
function xGraph3() {
  if (b3 == d3) { 
    if (countBefore3 < countAfter3) {
      for (var i = countAfter3 - countBefore3; i > 0; i--) {
        if (config_3.data.datasets.length > 0) {
          config_3.data.labels.unshift(monthsLabels3[c3 - 1]);
          config_3.data.datasets[0].data.unshift(lineTh_1[c3]);

          window.myChart_3.update();
          c3 -=1;
        }
      }
    } else if (countBefore3 > countAfter3) {
      for (var i = countBefore3 - countAfter3; i > 0; i--) {
        config_3.data.labels.splice(0, 1);
        config_3.data.datasets.forEach(function (dataset) {
          dataset.data.splice(0, 1);
          dataset.data.pop();
        });
        config_3.data.datasets[0].data.push(lineTh_1[d3]);

        window.myChart_3.update();
        d3 -=1;
      }
    }
  } else if(a3 == c3) {
      if (countBefore3 < countAfter3) {
        for (var i = countAfter3 - countBefore3; i > 0; i--) {
          if (config_3.data.datasets.length > 0) {
            config_3.data.labels.push(monthsLabels3[d3]);
            config_3.data.datasets[0].data.push(lineTh_1[d3]);

            window.myChart_3.update();
            d3 +=1;
          }
        }
      } else if (countBefore3 > countAfter3) {
        for (var i = countBefore3 - countAfter3; i > 0; i--) {
          config_3.data.labels.splice(-1, 1); // remove the label first
          config_3.data.datasets.forEach(function (dataset) {
            dataset.data.pop();
          });
          window.myChart_3.update();
        }
      }
  }
}








// График динамики продаж
function sale_by_start(data) {
    let dynamicChart_01 = document.getElementById('dynamic-chart-1').getContext('2d');
    let bggradient_1 = dynamicChart_01.createLinearGradient(0, 0, 900, 0);
    bggradient_1.addColorStop(0, 'rgba(255,78,50,0.3)');
    bggradient_1.addColorStop(0.2, 'rgba(250,174,50,0.3)');
    bggradient_1.addColorStop(0.5, 'rgba(255,244,38,0.3)');
    bggradient_1.addColorStop(0.7, 'rgba(136,255,38,0.3)');
    bggradient_1.addColorStop(1, 'rgba(76,255,38,0.3)');
    let bordergradient_1 = dynamicChart_01.createLinearGradient(0, 0, 900, 0);
    bordergradient_1.addColorStop(0, 'rgba(255,78,50,1)');
    bordergradient_1.addColorStop(0.2, 'rgba(250,174,50,1)');
    bordergradient_1.addColorStop(0.5, 'rgba(255,244,38,1)');
    bordergradient_1.addColorStop(0.7, 'rgba(136,255,38,1)');
    bordergradient_1.addColorStop(1, 'rgba(76,255,38,1)');
    let optionsDynamicChart_1 = {
        type: 'line',
        data: {
            labels: data.month,
            datasets: [{
                label: data.house_name,
                data: data.data,
                lineTension: 0.5,
                fill: true,
                borderColor: bordergradient_1,
                backgroundColor: bggradient_1,
                pointBorderColor: '#4ab795',
                pointBackgroundColor: 'rgba(255,255,255,0.9)',
                pointRadius: '4',
                pointBorderWidth: 2,
                pointStyle: 'rounded',
                borderWidth: 3
            }],
        },
        options: {
            responsive: false,
            legend: {
                display: false,
                position: 'top',
                labels: {
                    padding: 0,
                    boxWidth: 29,
                    fontSize: 15,
                    fontcolor: '#2a2a2a',
                    fontFamily: 'FuturaPTBook, sans-serif',
                    borderWidth: 0
                },
                onClick: function () {
                    return false;
                }
            },
            legendCallback: function (chart) {
                let text = [];
                text.push('<ul>');
                for (let i = 0; i < chart.data.datasets.length; i++) {
                    text.push('<li style="background-color:#ffa526"></li>');
                    text.push('<li>' + chart.data.datasets[i].label + '</li>');
                }
                text.push('</ul>');
                return text.join('');
            },
            title: {
                display: false,
                text: 'ЖК Черника'
            },
            tooltips: {
                mode: 'single',
                position: 'nearest',
                bodyFontFamily: 'FuturaPTBook, sans-serif',
                backgroundColor: '#ffb00b',
                bodyFontSize: 15,
                bodyFontColor: '#2a2a2a',
                yAlign: 'bottom',
                xPadding: 3,
                yPadding: 5,
                cornerRadius: 3,
                custom: function (tooltip) {
                    tooltip.displayColors = false;
                },
                callbacks: {
                    title: function (tooltipItems, data) {
                        return false;
                    },
                    label: function (tooltipItems, data) {
                        return tooltipItems.yLabel + " кв";
                    }
                }
            },
            hover: {
                mode: 'average',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#d6d6d6'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Порядковый месяц со старта продаж',
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15
                    },
                    ticks: {
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15,
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#d6d6d6'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Продано квартир, в месяц',
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15
                    },
                    ticks: {
                        min: 0,
                        // max: 25,
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15,
                    }
                }]
            }
        }
    };


    let dynamicChart_1 = new Chart(dynamicChart_01, optionsDynamicChart_1);
    document.getElementById('dynamics-chart__legends1').innerHTML = dynamicChart_1.generateLegend();
}

window.myChart_1 = new Chart(ctx1, config_1);

window.myChart_2 = new Chart(ctx2, config_2);

window.myChart_3 = new Chart(ctx3, config_3);

//Совокупная стоимость проданных квартир
function sale_cost(data) {

    let dynamicChart_02 = document.getElementById('dynamic-chart-2').getContext('2d');
    let bggradient_2 = dynamicChart_02.createLinearGradient(0, 0, 900, 0);
    bggradient_2.addColorStop(0, 'rgba(49,3,231,0.3)');
    bggradient_2.addColorStop(0.4, 'rgba(227,3,231,0.3)');
    bggradient_2.addColorStop(0.5, 'rgba(231,3,161,0.3)');
    bggradient_2.addColorStop(0.7, 'rgba(231,3,87,0.3)');
    bggradient_2.addColorStop(1, 'rgba(76,255,3,0.3)');
    let bordergradient_2 = dynamicChart_02.createLinearGradient(0, 0, 900, 0);
    bordergradient_2.addColorStop(0, 'rgba(49,3,231,1)');
    bordergradient_2.addColorStop(0.4, 'rgba(227,3,231,1)');
    bordergradient_2.addColorStop(0.5, 'rgba(231,3,161,1)');
    bordergradient_2.addColorStop(0.7, 'rgba(231,3,87,1)');
    bordergradient_2.addColorStop(1, 'rgba(76,255,3,1)');
    let optionsDynamicChart_2 = {
        type: 'line',
        data: {
            labels: data.month,
            datasets: [{
                label: data.house_name,
                data: data.data,
                lineTension: 0.5,
                fill: true,
                borderColor: bordergradient_2,
                backgroundColor: bggradient_2,
                pointBorderColor: '#4ab795',
                pointBackgroundColor: 'rgba(255,255,255,0.9)',
                pointRadius: '4',
                pointBorderWidth: 2,
                pointStyle: 'rounded',
                borderWidth: 3
            }],
        },
        options: {
            responsive: false,
            legend: {
                display: false,
                position: 'top',
                labels: {
                    padding: 0,
                    boxWidth: 29,
                    fontSize: 15,
                    fontcolor: '#2a2a2a',
                    fontFamily: 'FuturaPTBook, sans-serif',
                    borderWidth: 0
                },
                onClick: function () {
                    return false;
                }
            },
            legendCallback: function (chart) {
                let text = [];
                text.push('<ul>');
                for (let i = 0; i < chart.data.datasets.length; i++) {
                    text.push('<li style="background-color:#e703d9"></li>');
                    text.push('<li>' + chart.data.datasets[i].label + '</li>');
                }
                text.push('</ul>');
                return text.join('');
            },
            title: {
                display: false,
                text: 'ЖК Черника'
            },
            tooltips: {
                mode: 'single',
                position: 'nearest',
                bodyFontFamily: 'FuturaPTBook, sans-serif',
                backgroundColor: 'rgba(231,3,217,0.6)',
                bodyFontSize: 15,
                bodyFontColor: '#2a2a2a',
                yAlign: 'bottom',
                xPadding: 3,
                yPadding: 5,
                cornerRadius: 3,
                custom: function (tooltip) {
                    tooltip.displayColors = false;
                },
                callbacks: {
                    title: function (tooltipItems, data) {
                        return false;
                    },
                    label: function (tooltipItems, data) {
                        return tooltipItems.yLabel + " млн. руб";
                    }
                }
            },
            hover: {
                mode: 'average',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#d6d6d6'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Порядковый месяц со старта продаж',
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15
                    },
                    ticks: {
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15,
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#d6d6d6'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Продажи в месяц, млн руб.',
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15
                    },
                    ticks: {
                        min: 0,
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15,
                    }
                }]
            }
        }
    };

    let dynamicChart_2 = new Chart(dynamicChart_02, optionsDynamicChart_2);
    document.getElementById('dynamics-chart__legends2').innerHTML = dynamicChart_2.generateLegend();
}



// Изменение средней стоимости квадратного метра квартир
function changes_cost(data) {
    let optionsDynamicChart_3 = {
        type: 'line',
        data: {
            labels: data.month,
            datasets: [{
                label: data.house_name,
                data: data.data,
                lineTension: 0.5,
                fill: true,
                borderColor: '#3fb491',
                backgroundColor: 'rgba(63,180,145,0.1)',
                pointBorderColor: '#4ab795',
                pointBackgroundColor: 'rgba(255,255,255,0.9)',
                pointRadius: '4',
                pointBorderWidth: 2,
                pointStyle: 'rounded',
                borderWidth: 3
            }],
        },
        options: {
            responsive: false,
            legend: {
                display: false,
                position: 'top',
                labels: {
                    padding: 0,
                    boxWidth: 29,
                    fontSize: 15,
                    fontcolor: '#2a2a2a',
                    fontFamily: 'FuturaPTBook, sans-serif',
                    borderWidth: 0
                },
                onClick: function () {
                    return false;
                }
            },
            legendCallback: function (chart) {
                let text = [];
                text.push('<ul>');
                for (let i = 0; i < chart.data.datasets.length; i++) {
                    text.push('<li style="background-color:' + chart.data.datasets[i].borderColor + '"></li>');
                    text.push('<li>' + chart.data.datasets[i].label + '</li>');
                }
                text.push('</ul>');
                return text.join('');
            },
            title: {
                display: false,
                text: 'ЖК Черника'
            },
            tooltips: {
                mode: 'single',
                position: 'nearest',
                bodyFontFamily: 'FuturaPTBook, sans-serif',
                backgroundColor: 'rgba(231,3,217,0.6)',
                bodyFontSize: 15,
                bodyFontColor: '#2a2a2a',
                yAlign: 'bottom',
                xPadding: 3,
                yPadding: 5,
                cornerRadius: 3,
                custom: function (tooltip) {
                    tooltip.displayColors = false;
                },
                callbacks: {
                    title: function (tooltipItems, data) {
                        return false;
                    },
                    label: function (tooltipItems, data) {
                        return tooltipItems.yLabel + " кв";
                    }
                }
            },
            hover: {
                mode: 'average',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#d6d6d6'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Порядковый месяц со старта продаж',
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15
                    },
                    ticks: {
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15,
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#d6d6d6'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Средняя стоимость за кв.м. (тыс. руб/кв.м.)',
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15
                    },
                    ticks: {
                        min: 0,
                        fontFamily: 'FuturaPTBook, sans-serif',
                        fontSize: 15,
                    }
                }]
            }
        }
    };

    let dynamicChart_03 = document.getElementById('dynamic-chart-3').getContext('2d');
    let dynamicChart_3 = new Chart(dynamicChart_03, optionsDynamicChart_3);
    document.getElementById('dynamics-chart__legends3').innerHTML = dynamicChart_3.generateLegend();
}

let $buildingSliderTitleStart = $('.building-slider__title--start');
let $buildingSliderTitleEnd = $('.building-slider__title--end');

$("#building-slider").ionRangeSlider({
    skin: "round",
    min: 0,
    max: 100,
    from: 55,
    // from_min: 3,
    //from_max: 97,
    step: 1,
    grid: false,
    grid_num: false,
    grid_snap: false,
    postfix: '%',
    hide_min_max: true,
    onChange: function(data){
        data.from < 18 ? $buildingSliderTitleStart.addClass('transparent') : $buildingSliderTitleStart.removeClass('transparent');
        data.from > 84 ? $buildingSliderTitleEnd.addClass('transparent') : $buildingSliderTitleEnd.removeClass('transparent');
        if (data.from < 4 || data.from > 97) {
            $('.irs-handle__title').addClass('irs-handle__title--max');
        } else {
            $('.irs-handle__title').removeClass('irs-handle__title--max');
        }
    },
    onStart: function(data){
        $('.irs-handle').append('<span class="irs-handle__title">Текущая готовность</span>');

        console.log(data.min_pretty);
    },

});



//  let $buildingSlider  = $("#building-slider");
//  let $buildingSlider = $(".progress-bar__item");
// $buildingSlider.fadeOut();
// $buildingSlider.ionRangeSlider({
//     skin: "round",
//     type: "double",
//     min: 0,
//     max: 100,
//     from: 0,
//     to: 100,
//     postfix: '%',
//     onChange: function(data){
//         data.from < 21 ? $progressBarItem.fadeOut() : $progressBarItem.fadeIn();
//     }
// });





