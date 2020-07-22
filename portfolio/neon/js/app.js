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
            spaceBetween: 24,
            allowTouchMove: false,
            simulateTouch: false,
            slidesPerColumnFill: 'row',
            slidesPerColumn: 2
        }
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
                center: [76.9367, 43.243264],
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



