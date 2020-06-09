'use strict';

$('.stats__selector, .filter__selector').select2({
    minimumResultsForSearch: -1,
    placeholder: 'Выбрать'
});

$(document).ready(function () {
    $('.tooltip').tooltipster({
        side: ['left', 'bottom'],
        trigger: 'click',
        contentCloning: false,
        interactive: true
    });

    $('.header__account').click(function (e) {
        e.preventDefault();
        $('.account__popup').fadeToggle(300);
        $('.header__popup').fadeOut(300);
    });

    $('.header__burger').click(function () {
        $('.header__popup').fadeToggle(300);
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

    $(".button_lb_inner").mouseenter(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".lb_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".lb_button_circle").removeClass("desplode-circle-lb");
        $(this).prev(".lb_button_circle").addClass("explode-circle-lb");
    });
    $(".button_lb_inner").mouseleave(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".lb_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".lb_button_circle").removeClass("explode-circle-lb");
        $(this).prev(".lb_button_circle").addClass("desplode-circle-lb");
    });

    $(".button_rb_inner").mouseenter(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".rb_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".rb_button_circle").removeClass("desplode-circle-rb");
        $(this).prev(".rb_button_circle").addClass("explode-circle-rb");
    });
    $(".button_rb_inner").mouseleave(function (e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".rb_button_circle").css({ "left": relX, "top": relY });
        $(this).prev(".rb_button_circle").removeClass("explode-circle-rb");
        $(this).prev(".rb_button_circle").addClass("desplode-circle-rb");
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

    $('#filter').click(function () {
        $('.filter__popup').fadeToggle(300);
    });
    $('#btn_select').click(function () {
        $('.filter__popup').fadeToggle(300);
        if ($('#firstDate-input').val() !== '' && $('#lastDate-input').val() !== '') {
            var fD = $('#firstDate-input').val();
            var lD = $('#lastDate-input').val();

            $('#firstDate').addClass('activated');
            $('#first-date').text(fD);

            $('#lastDate').addClass('activated');
            $('#last-date').text(lD);

            $('.mails__reset').fadeIn(300);

        }
    });

    function checkEmpty() {
        if ($('#firstDate-input').val() == 0 && $('#lastDate-input').val() == 0) {
            $('.mails__reset').fadeOut(300);
        }
    }

    $('.mails__reset').click(function () {
        $('#firstDate').removeClass('activated');
        $('#lastDate').removeClass('activated');
        $('.filter__input').val('');
        $(this).fadeOut(300);
    });

    $('.button_lb').click(function () {
        $('.filter__input').val('');
    });

    $('#first-date-del').click(function () {
        $('#firstDate').removeClass('activated');
        $('#firstDate-input').val('');
        checkEmpty();
    });

    $('#last-date-del').click(function () {
        $('#lastDate').removeClass('activated');
        $('#lastDate-input').val('');
        checkEmpty();
    });

    var days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    var weeks = ['1 - 8 июня', '9 - 16 июня', '17 - 24 июня', '25 - 30 июня'];
    var months = ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'];
    var dataMailing = [1, 30, 45, 60, 90, 139, 12, 38, 3, 15];
    var dataSent = [1, 30, 45, 60, 39, 87, 12, 38, 3, 15];
    var dataDelivery = [1, 30, 45, 60, 55, 54, 12, 38, 3, 15];
    var dataGo = [1, 22, 45, 39, 59, 12, 12, 38, 3, 15];

    if ($('#myChart').length !== 0) {
        var myChart = new Chart(document.getElementById("myChart"), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    data: dataMailing,
                    label: "рассылок",
                    borderColor: "#36C2CF",
                    fill: false,
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    pointBackgroundColor: '#ffffff00',
                    backgroundColor: 'transparent',
                    pointHitRadius: 32,
                    pointBackgroundColor: '#ffffff00'
                }, {
                    data: dataSent,
                    label: "отправлено",
                    borderColor: "#5BA4D7",
                    fill: false,
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    pointBackgroundColor: '#ffffff00',
                    pointHitRadius: 32,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#ffffff00'
                }, {
                    data: dataDelivery,
                    label: "доставлено",
                    borderColor: "#9698D5",
                    fill: false,
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    pointHitRadius: 32,
                    pointBackgroundColor: '#ffffff00',
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#ffffff00'
                }, {
                    data: dataGo,
                    label: "переходов",
                    borderColor: "#68B781",
                    fill: false,
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    pointBackgroundColor: '#ffffff00',
                    pointHitRadius: 32,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#ffffff00'
                }
                ]
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                tooltips: {
                    backgroundColor: '#fff',
                    titleFontColor: '#323441',
                    titleMarginBottom: 12,
                    bodyFontColor: '#323441',
                    titleAlign: 'center',
                    titleSpacing: 12,
                    borderColor: '#DFE0EB',
                    titleFontStyle: '600',
                    titleFontFamily: 'Gilroy',
                    bodyFontStyle: '500',
                    bodyFontFamily: 'Gilroy',
                    borderWidth: '1',
                    xPadding: 18,
                    yPadding: 12
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false,
                            color: '#ffffff00'
                        },
                        ticks: {
                            display: false
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            color: '#f2f2f2'
                        },
                        ticks: {
                            fontColor: '#979797',
                            fontFamily: 'Gilroy',
                            fontSize: 12,
                            padding: 16,
                            fontStyle: 'bold'
                        },
                    }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 35,
                        bottom: 35
                    }
                },
                legend: {
                    display: false,
                }
            }
        });
    }
    else { };

    if ($('#myChart2').length !== 0) {
        var myChart2 = new Chart(document.getElementById("myChart2"), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    data: dataMailing,
                    label: "рассылок",
                    borderColor: "#36C2CF",
                    fill: false,
                    pointHitRadius: 32,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    pointBackgroundColor: '#ffffff00'
                }, {
                    data: dataSent,
                    label: "отправлено",
                    borderColor: "#5BA4D7",
                    pointHitRadius: 32,
                    fill: false,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    pointBackgroundColor: '#ffffff00'
                }, {
                    data: dataDelivery,
                    pointHitRadius: 32,
                    label: "доставлено",
                    borderColor: "#9698D5",
                    fill: false,
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    backgroundColor: 'transparent'
                }, {
                    data: dataGo,
                    label: "переходов",
                    borderColor: "#68B781",
                    pointHitRadius: 32,
                    pointBackgroundColor: '#ffffff00',
                    pointBorderColor: '#ffffff00',
                    pointHoverBackgroundColor: '#ffffff00',
                    pointHoverBorderColor: '#ffffff00',
                    fill: false,
                    backgroundColor: 'transparent'
                }
                ]
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                tooltips: {
                    backgroundColor: '#fff',
                    titleFontColor: '#323441',
                    titleMarginBottom: 12,
                    bodyFontColor: '#323441',
                    titleAlign: 'center',
                    titleSpacing: 12,
                    borderColor: '#DFE0EB',
                    titleFontStyle: '600',
                    titleFontFamily: 'Gilroy',
                    bodyFontStyle: '500',
                    bodyFontFamily: 'Gilroy',
                    borderWidth: '1',
                    xPadding: 18,
                    yPadding: 12
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false,
                            color: '#ffffff00'
                        },
                        ticks: {
                            display: false
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            color: '#f2f2f2'
                        },
                        ticks: {
                            fontColor: '#979797',
                            fontFamily: 'Gilroy',
                            fontSize: 12,
                            padding: 16,
                            fontStyle: 'bold'
                        },
                    }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 35,
                        bottom: 30
                    }
                },
                legend: {
                    display: false,
                },
                point: {
                    radius: 16
                }
            }
        });
    }
    else { };


    function addData(chart, label) {
        chart.data.labels = label;
        chart.update();
    }

    $("#days").click(function () {
        addData(myChart, days);
    });
    $("#days-subs").click(function () {
        addData(myChart2, days);
    });
    $("#weeks").click(function () {
        addData(myChart, weeks);
    });
    $("#weeks-subs").click(function () {
        addData(myChart2, weeks);
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

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            $('.account__popup').fadeOut(300);
            $('.filter__popup').fadeOut(300);
        };
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('#filter, .header__account, .datepicker--cell, .datepicker, .datepicker--nav, .datepicker--nav-action, .datepicker--nav-title, .filter__popup, .account__popup').length) {
            $(".filter__popup, .account__popup").fadeOut(250);
        }
    });

    $('.setgen__buttons_link').click(function () {
        let id = $(this).attr('id');
        $('section').removeClass('choosen');
        $('#' + id + '-sec').addClass('choosen');
      });
    
});