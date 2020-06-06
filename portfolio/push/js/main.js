'use strict';

$('.stats__selector').select2({
    minimumResultsForSearch: -1,
    placeholder: 'Выбрать'
});



$(document).ready(function () {

    $('.header__account').click(function (e) {
        e.preventDefault();
        $('.account__popup').fadeToggle(300);
    });

    $(".button_green_inner").mouseenter(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".green_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".green_button_circle").removeClass("desplode-circle");
        $(this).prev(".green_button_circle").addClass("explode-circle");
    });
    $(".button_green_inner").mouseleave(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".green_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".green_button_circle").removeClass("explode-circle");
        $(this).prev(".green_button_circle").addClass("desplode-circle");
    });

    $(".button_white_inner").mouseenter(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".white_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".white_button_circle").removeClass("desplode-circle-w");
        $(this).prev(".white_button_circle").addClass("explode-circle-w");
    });
    $(".button_white_inner").mouseleave(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".white_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".white_button_circle").removeClass("explode-circle-w");
        $(this).prev(".white_button_circle").addClass("desplode-circle-w");
    });

    $('.button').click(function () {
        $('.button').removeClass('selected');
        $(this).addClass('selected')
    });

    var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    var weeks = ['1 - 8 июня', '9 - 16 июня', '17 - 24 июня', '25 - 30 июня'];
    var months = ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'];

    var dataMailing = [1, 30, 45, 60, 90, 139, 12, 38, 3, 15];
    var dataSent = [1, 30, 45, 60, 39, 87, 12, 38, 3, 15];
    var dataDelivery = [1, 30, 45, 60, 55, 54, 12, 38, 3, 15];
    var dataGo = [1, 22, 45, 39, 59, 12, 12, 38, 3, 15];


    var myChart = new Chart(document.getElementById("myChart"), {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                data: dataMailing,
                label: "рассылок",
                borderColor: "#3e95cd",
                fill: false,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#ffffff00'
            }, {
                data: dataSent,
                label: "отправлено",
                borderColor: "#8e5ea2",
                fill: false,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#ffffff00'
            }, {
                data: dataDelivery,
                label: "доставлено",
                borderColor: "#3cba9f",
                fill: false,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#ffffff00'
            }, {
                data: dataGo,
                label: "переходов",
                borderColor: "#e8c3b9",
                fill: false,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#ffffff00'
            }
            ]
        },
        options: {
            aspectRatio: '2.5',
            title: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: false
                    }
                }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 30,
                    bottom: 30
                }
            },
            legend: {
                display: false,
            }
        }
    });

    

    function addData(chart, label) {
        chart.data.labels = label;
        chart.update();
    }

    $("#days").click(function () {
        addData(myChart, days);
    });
    $("#weeks").click(function () {
        addData(myChart, weeks);
    });
    $('#selector').change(function () {
        $('.button').removeClass('selected');
        if ($("#selector").val() == 1) {
            addData(myChart, weeks);
        };
        if ($("#selector").val() == 2) {
            addData(myChart, months);
        };
    });
});