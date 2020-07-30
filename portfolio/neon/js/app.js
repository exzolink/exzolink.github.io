// Dev by exzolink
// exzolink.github.io

photos = new Swiper('.zones__gallery_container', {
    slidesPerView: 4,
    spaceBetween: 6,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        360: {
            slidesPerView: 2
        },
        900: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 4,
            allowTouchMove: false,
            simulateTouch: false
        },
    }
});

games = new Swiper('.games__container', {
    slidesPerView: 4,
    spaceBetween: 12,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        355: {
            slidesPerView: 2
        },
        850: {
            slidesPerView: 3,
            spaceBetween: 24
        },
        1100: {
            slidesPerView: 4,
            spaceBetween: 30,
            allowTouchMove: false,
            simulateTouch: false,
            slidesPerColumnFill: 'row',
            slidesPerColumn: 2
        }
    }
});

workers = new Swiper('.team__container', {
    slidesPerView: 4,
    spaceBetween: 24,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        360: {
            slidesPerView: 2,
            spaceBetween: 16
        },
        600: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        880: {
            slidesPerView: 4,
            spaceBetween: 24
        }
    }
});

blog = new Swiper('.blog__container', {
    slidesPerView: 1,
    spaceBetween: 12,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
});

games.on('slideChange', function () {
    games.update();
});

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

var mapOn = false;
if (document.getElementById('map') !== null) {
    var mapRender = debounce(function () {

        var getMap = document.getElementById('map');
        var mapCoords = getMap.offsetTop;

        if ((pageYOffset * 1.8) > mapCoords && mapOn === false) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZ29yeTEyMCIsImEiOiJja2N2NW1ld2UwMTMzMnFtc2ZoeWpiZHM3In0.97pEt9J1fujCDbmt-84mrw';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/dark-v10',
                center: [76.937, 43.243264],
                zoom: 17
            });

            var marker = new mapboxgl.Marker()
                .setLngLat([76.936931, 43.2429])
                .addTo(map);

            mapOn = true;
        }
    }, 300);
    window.addEventListener('scroll', mapRender);
};

if (document.getElementById('mapContacts') !== null) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZ29yeTEyMCIsImEiOiJja2N2NW1ld2UwMTMzMnFtc2ZoeWpiZHM3In0.97pEt9J1fujCDbmt-84mrw';
    var map = new mapboxgl.Map({
        container: 'mapContacts',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [76.937, 43.243264],
        zoom: 17
    });

    var marker = new mapboxgl.Marker()
        .setLngLat([76.936931, 43.2429])
        .addTo(map);
};


if (document.getElementById('fadeToggle') !== null) {
    var options = {
        strings: ['Power On', 'Game On', 'Party On'],
        typeSpeed: 90,
        fadeOut: true,
        startDelay: 1000,
        backSpeed: 500,
        backDelay: 1000,
        loop: true
    };
    var typed = new Typed('#fadeToggle', options);
};

if (document.getElementById('parallax') !== null) {
    function parallax() {
        var $slider = document.getElementById("parallax");

        var yPos = window.pageYOffset / $slider.dataset.speed;
        yPos = -yPos;

        var coords = '50% ' + yPos + 'px';

        $slider.style.backgroundPosition = coords;
    };

    window.addEventListener("scroll", function () {
        if (window.pageYOffset < 650) {
            parallax();
        }
        else {
            return;
        }

    });
    parallax();
};