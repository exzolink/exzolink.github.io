let houseGallery = new Swiper('.house-gallery .slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: '.house-gallery .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.house-gallery .swiper-button-next',
        prevEl: '.house-gallery .swiper-button-prev',
    },
});


function dynamicColors(size) {
    var colors = [ '#14d093c4','#35f3b5c4', '#9ef9b6c9', '#b6fb78',  '#e8ea17c7', '#ffbb22d4', '#ff8427c7', '#008f87b8', '#00a16dc4'];
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(colors[i]);
    }
    return array;
}


sale_layouts();

var datachart = {
	'month': ['2', '4', '5', '8', '9', '10'],
	'house_name': 'Молоко и мед',
	'data': [1,2,4,6,2,4]
}
sale_by_start(datachart);
sale_cost(datachart);
changes_cost(datachart);




// График планировок
function sale_layouts() {
    let options = {
        type: 'doughnut',
        data: {
            labels: ['Студия', '1 к.кв', '2 к.кв', '3 к.кв'],
            datasets: [
                {
                    data: [23, 35, 11, 5],
                    backgroundColor: ['#14d093c4','#35f3b5c4', '#9ef9b6c9', '#b6fb78'],
                    borderWidth: 0,
                }
            ]
        },
        options: {
            // responsive: false,
            legend: {
                display: false,
                position: 'top',
                labels: {
                    padding: 0,
                    boxWidth: 70,
                    fontSize: 15,
                    fontFamily: 'FuturaPTBook, sans-serif',
                },
            },
            legendCallback: function (chart) {
                let text = [];
                text.push('<ul class="doughnut-labels__list">');
                for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
                    text.push('<li class="doughnut-labels__item" style="background-color:' +
                        chart.data.datasets[0].backgroundColor[i] + '">');
                    if (chart.data.labels[i]) {
                        text.push(chart.data.labels[i]);
                    }
                    text.push('</li>');
                }
                text.push('</ul>');
                return text.join("");
            },
            layout: {
                padding: 0
            },
            tooltips: {
                mode: 'index',
                axis: 'y'
            },
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false
                }]
            },
            cutoutPercentage: 60,
            plugins: {
                labels: {
                    render: 'percentage',
                    fontColor: 'white'
                }
            }
        }
    };
    let doughnutChart = document.getElementById('doughnut').getContext('2d');
    let pie = new Chart(doughnutChart, options);
    let doughnutLabels = document.getElementById('doughnut-labels');
    doughnutLabels.innerHTML = pie.generateLegend();
}
// Tooltip
$('.type-plan__round, .result-plan__message').tooltipster({
    contentCloning: true,
    animation: 'grow',
    delay: 200,
    arrow: false,
    zIndex: 999,
    side: ['bottom'],
    theme: 'tooltip-dark',
    // trigger: "click",
    functionPosition: function (instance, helper, position) {
        position.coord.top += 10;
        let element = instance.elementOrigin();
        if($(element).hasClass('result-plan__message')){
            position.coord.right += 100000000;
        }
        return position;
    }
});

// Example sliders
$('.example-good .slider').each(function () {
    let exampleSlider = new Swiper(this, {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: '.example-wrapper .swiper-button-next',
            prevEl: '.example-wrapper .swiper-button-prev',
        },
    });
});

// Tabs
let $exampleGoodTabsContent = $('.example-good .example-content');
let $exampleGoodtabsItem = $('.example-good .region-tabs__item');

$exampleGoodtabsItem.on('click', (event) => {

    let $this = $(event.currentTarget);
    let $item = $this.data('attr');
    let $thisProduct = $('#' + $item + '');

    if (!$this.hasClass('region-tabs--active')) {
        $exampleGoodtabsItem.removeClass('region-tabs--active');
        $exampleGoodTabsContent.removeClass('example-content--active');
        $this.addClass('region-tabs--active');
        $thisProduct.addClass('example-content--active');
    }
});


// Example sliders
$('.example-bad .slider').each(function () {
    let exampleSlider = new Swiper(this, {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: '.example-wrapper .swiper-button-next',
            prevEl: '.example-wrapper .swiper-button-prev',
        },
    });
});

// Tabs
let $exampleBadTabsContent = $('.example-bad .example-content');
let $exampleBadTabsItem = $('.example-bad .region-tabs__item');

$exampleBadTabsItem.on('click', (event) => {

    let $this = $(event.currentTarget);
    let $item = $this.data('attr');
    let $thisProduct = $('#' + $item + '');

    if (!$this.hasClass('region-tabs--active')) {
        $exampleBadTabsItem.removeClass('region-tabs--active');
        $exampleBadTabsContent.removeClass('example-content--active');
        $this.addClass('region-tabs--active');
        $thisProduct.addClass('example-content--active');
    }
});


// Example sliders
let exampleSlider = new Swiper('.building-progress .slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: false,
    navigation: {
        nextEl: '.building-progress .swiper-button-next',
        prevEl: '.building-progress .swiper-button-prev',
    },
});


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
                bodyFontFamily: 'FuturaPTMedium, sans-serif',
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
                bodyFontFamily: 'FuturaPTMedium, sans-serif',
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
                bodyFontFamily: 'FuturaPTMedium, sans-serif',
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









