'use strict';

$('.stats__selector').select2({
    minimumResultsForSearch: -1,
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

    new Chart(document.getElementById("myChart"), {
        type: 'line',
        data: {
            labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
                data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                label: "рассылок",
                borderColor: "#3e95cd",
                fill: false
            }, {
                data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                label: "отправлено",
                borderColor: "#8e5ea2",
                fill: false
            }, {
                data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                label: "15% доставлено",
                borderColor: "#3cba9f",
                fill: false
            }, {
                data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                label: "10% переходов",
                borderColor: "#e8c3b9",
                fill: false
            }
            ]
        },
        options: {
            scaleShowLabels: false,
            title: {
                display: false
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
});