$(document).ready(function () {
      
    var table1 = $('#interim').DataTable({
        scrollX: 50000,
        "pageLength": 3
    });

    $('#interim_filter_search').on('keyup', function () {
        table1.search(this.value).draw();
    });

    $('#rowsCount').on('change', function () {
        table1.page.len(this.value).draw();

    });

    $('.btn-show').click(function () {
        if ($(this).hasClass('shows')) {
            $(this).html('Раскрыть<img src="images/showW.svg" alt="">');
            table1.page.len(3).draw();
            $(this).removeClass('shows');
        }
        else {
            $(this).addClass('shows');
            $(this).html('Скрыть<img class="rotate" src="images/showW.svg" alt="">');
            table1.page.len(-1).draw();
        }
    });

    $('.plans__floor').click(function () {
        if ($(this).hasClass('plans__floor_inactive')) {
            return;
        }
        else {
            $('.plans__floor').removeClass('plans__floor_active')
            $(this).addClass('plans__floor_active');
        }
    });


    $('.table-show-popup').click(function () {
        if ($(this).hasClass('opened')) {
            $(this).parent().parent().find('.table-popup').slideUp(300);
            $('.table-show-popup').removeClass('opened');
        }
        else {
            $('.table-popup').slideUp(300);
            $('.table-show-popup').removeClass('opened');
            $(this).parent().parent().find('.table-popup').slideDown(300);
            $(this).addClass('opened');
        }
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.label-checkbox, .table-show-popup, .dflex').length) {
            $('.table-popup').slideUp(300);
            $('.table-progress__show').removeClass('opened');
        }
    });


    $('.all').click(function () {
        if ($(this).is(':checked')) {
        $(this).parent().parent().parent().find('#clear').prop('checked', true);
        }
        else {
            $(this).parent().parent().parent().find('#clear').prop('checked', false);
        }
    });


    $('.graph-checkbox__label').click(function () {
        if ($('#checkbox_1').is(':checked')) {
            $('#floors').removeClass('opacity-full');
            $('#flats').addClass('opacity-full');
        }
        else {
            $('#flats').removeClass('opacity-full');
            $('#floors').addClass('opacity-full');
          
        }
    });

})


let houseGallery = new Swiper('.house-gallery .slider', {
    slidesPerView: 1,
    loop: false,
    navigation: {
        nextEl: '.house-gallery .swiper-button-next',
        prevEl: '.house-gallery .swiper-button-prev',
    },
});

let plans = new Swiper('.plans__container', {
    slidesPerView: 3,
    spaceBetween: 60,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.plans__container .swiper-button-next',
        prevEl: '.plans__container .swiper-button-prev',
    },
});


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
        if ($(element).hasClass('result-plan__message')) {
            position.coord.right += 100000000;
        }
        return position;
    }
});


function dynamicColors(size) {
    var colors = ['#14d093c4', '#35f3b5c4', '#9ef9b6c9', '#b6fb78', '#e8ea17c7', '#ffbb22d4', '#ff8427c7', '#008f87b8', '#00a16dc4'];
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(colors[i]);
    }
    return array;
}
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            // Get ctx from string
            var ctx = chart.chart.ctx;

            // Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var maxFontSize = centerConfig.maxFontSize || 75;
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            // Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
            var minFontSize = centerConfig.minFontSize;
            var lineHeight = centerConfig.lineHeight || 25;
            var wrapText = false;

            if (minFontSize === undefined) {
                minFontSize = 20;
            }

            if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
            }

            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
            }

            var words = txt.split(' ');
            var line = '';
            var lines = [];

            // Break words up into multiple lines if necessary
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }

            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;

            for (var n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
        }
    }
});



$('.infra__show-more').click(function () {
    $(this).closest('.infra__block_wrapper').toggleClass('no-bg');
    $(this).parent().parent().next('.infra__hidden_block').slideToggle(300);
    $(this).toggleClass('rotate-active');
});

$('.infra__button').click(function () {
    $(this).parent().find('.infra__button').removeClass('infra__button_active');
    $(this).addClass('infra__button_active');
});

// График планировок

let doughnutChart = document.getElementById('doughnut').getContext('2d');
let gradient1 = doughnutChart.createLinearGradient(0, 0, 0, 100);
gradient1.addColorStop(0, '#A972DB');
gradient1.addColorStop(1, '#E06FBD');
let gradient2 = doughnutChart.createLinearGradient(0, 0, 0, 200);
gradient2.addColorStop(0, '#F8968A');
gradient2.addColorStop(1, '#EE2E33');
let gradient3 = doughnutChart.createLinearGradient(0, 0, 0, 300);
gradient3.addColorStop(0, '#F0FF00');
gradient3.addColorStop(1, '#FDA128');
let gradient4 = doughnutChart.createLinearGradient(0, 0, 0, 100);
gradient4.addColorStop(0, '#B3F08A');
gradient4.addColorStop(1, '#46D9B6');


let options = {
    type: 'doughnut',
    data: {
        labels: ['Студия', '1 к.кв', '2 к.кв', '3 к.кв'],
        datasets: [
            {
                data: [23, 35, 29, 19],
                backgroundColor: [gradient1, gradient2, gradient3, gradient4],
                borderColor: ['#C970CA', '#EF383B', '#FDA128', '#7EE59F'],
                borderWidth: 0,
            }
        ]
    },
    options: {
        elements: {
            center: {
                text: '238',
                color: '#000', // Default is #000000
                fontStyle: 'FuturaPTMedium', // Default is Arial
                sidePadding: 32, // Default is 20 (as a percentage)
                minFontSize: 48, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 62 // Default is 25 (in px), used for when text wraps
            }
        },
        // responsive: false,
        legend: {
            display: false,
            position: 'top',
            labels: {
                padding: 0,
                boxWidth: 70,
                fontSize: 18,
                fontColor: '#fff',
                fontFamily: 'FuturaPTMedium, sans-serif',
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
            padding: {
                left: 40,
                right: 40,
                top: 0,
                bottom: 30
            }
        },
        tooltips: {
            enabled: false,

            custom: function (tooltip) {
                var tooltipEl = document.getElementById('chartjs-tooltip-don');

                // Hide if no tooltip
                if (tooltip.opacity === 0) {
                    tooltipEl.style.opacity = 0;
                    return;
                }

                // Set caret Position
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltip.yAlign) {
                    tooltipEl.classList.add(tooltip.yAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }

                function getBody(bodyItem) {
                    return bodyItem.lines;
                }

                // Set Text
                if (tooltip.body) {
                    var titleLines = tooltip.title || [];
                    var bodyLines = tooltip.body.map(getBody);

                    var innerHtml = '<thead>';

                    titleLines.forEach(function (title) {
                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';
                 
                    bodyLines.forEach(function (body, i) {
                        var colors = tooltip.labelColors[i];
                        var style = 'border-color:' + colors.borderColor;
                        style += '; color:' + colors.borderColor;
                        var span = '<span class="chartjs-tooltip-key" style="' + style + '">'+ body + '</span>';
                        innerHtml += '<tr><td>' + span + '</td></tr>';
                    });
                    innerHtml += '</tbody>';

                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                var positionY = this._chart.canvas.offsetTop;
                var positionX = this._chart.canvas.offsetLeft;

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
                tooltipEl.style.fontSize = tooltip.bodyFontSize;
                tooltipEl.style.fontColor = tooltip.borderColor;
                tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
                tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';

            }
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
                fontColor: 'white',
                fontSize: 18,
                fontFamily: 'FuturaPTMedium, sans-serif',
            }
        }
    }
};


let pie = new Chart(doughnutChart, options);


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
$('.btn-more').click(function () {
    $(this).toggleClass('btn-more_active');
    $(this).parents('.box').find('.box_sec').slideToggle(300);
});

$('.close-btn').click(function () {
    $('.plans__popup').fadeToggle(300);
});

$('.open-plan-popup').click(function () {
    $('.plans__popup').fadeToggle(300);
});

$('#rowsCount').select2({
    minimumResultsForSearch: -1,
});

$('.search-input-remove').click(function () {
    $('.search-input').val('');
    $('.search-input').trigger('keyup');
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






























