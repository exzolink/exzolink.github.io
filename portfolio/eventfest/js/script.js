/**
 * Global variables
 */
"use strict";

try {

var userAgent = navigator.userAgent.toLowerCase(),
  initialDate = new Date(),

  $document = $(document),
  $window = $(window),
  $html = $("html"),
  windowReady = false,
  isNoviBuilder = false,
  livedemo = false,

  isDesktop = $html.hasClass("desktop"),
  isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch = "ontouchstart" in window,
  c3ChartsArray = [],

  plugins = {
    pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
    smoothScroll: $html.hasClass("use--smoothscroll") ? "js/smoothscroll.min.js" : false,
    bootstrapTooltip: $("[data-toggle='tooltip']"),
    bootstrapTabs: $(".tabs"),
    rdParallax: $(".rd-parallax"),
    rdAudioPlayer: $(".rd-audio"),
    rdVideoPlayer: $(".rd-video-player"),
    responsiveTabs: $(".responsive-tabs"),
    rdGoogleMaps: $("#rd-google-map"),
    rdInputLabel: $(".form-label"),
    rdNavbar: $(".rd-navbar"),
    rdVideoBG: $(".rd-video"),
    regula: $("[data-constraints]"),
    stepper: $("input[type='number']"),
    radio: $("input[type='radio']"),
    checkbox: $(".checkbox-custom"),
    toggles: $(".toggle-custom"),
    textRotator: $(".text-rotator"),
    owl: $(".owl-carousel"),
    swiper: $(".swiper-slider"),
    counter: $(".counter"),
    photoSwipeGallery: $("[data-photo-swipe-item]"),
    flickrfeed: $(".flickr"),
    twitterfeed: $(".twitter"),
    progressBar: $(".progress-linear"),
    circleProgress: $(".progress-bar-circle"),
    isotope: $(".isotope"),
    countDown: $(".countdown"),
    stacktable: $("table[data-responsive='true']"),
    customToggle: $("[data-custom-toggle]"),
    customWaypoints: $('[data-custom-scroll-to]'),
    resizable: $(".resizable"),
    selectFilter: $("select"),
    calendar: $(".rd-calendar"),
    productThumb: $(".product-thumbnails"),
    imgZoom: $(".img-zoom"),
    facebookfeed: $(".facebook"),
    pageLoader: $(".page-loader"),
    search: $(".rd-search"),
    flipClock: $(".flipClock"),
    searchResults: $('.rd-search-results'),
    rdMailForm: $(".rd-mailform"),
    iframeEmbed: $("iframe.embed-responsive-item"),
    bootstrapDateTimePicker: $("[data-time-picker]"),
    checkoutRDTabs: $(".checkout-tabs"),
    higCharts: {
      charts: $(".higchart"),
      legend: $(".chart-legend")
    },
    d3Charts: $('.d3-chart'),
    flotCharts: $('.flot-chart'),
    galleryRDTabs: $(".gallery-tabs"),
    materialParallax: $(".parallax-container"),
    copyrightYear: $("#copyright-year"),
    modal: $('.modal')
  };

/**
 * Initialize All Scripts
 */
$document.ready(function () {
  isNoviBuilder = window.xMode
  /**
   * isScrolledIntoView
   * @description  check the element whas been scrolled into the view
   */
  function isScrolledIntoView(elem) {
    var $window = $(window);
    return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
  }

  /**
   * Bootstrap tabs
   * @description Activate Bootstrap Tabs
   */
	 if (plugins.bootstrapTabs.length) {
    var i;
    for (i = 0; i < plugins.bootstrapTabs.length; i++) {
      var bootstrapTab = $(plugins.bootstrapTabs[i]);

      bootstrapTab.on("click", "a", function (event) {
        event.preventDefault();
        $(this).tab('show');
      });
    }
  }


  /**
   * parseJSONObject
   * @description  return JSON object witch methods
   */
  function parseJSONObject(element, attr) {
    return JSON.parse($(element).attr(attr), function (key, value) {
      if ((typeof value) === 'string') {
        if (value.indexOf('function') == 0) {
          return eval('(' + value + ')');
        }
      }
      return value;
    });
  }

  /**
   * makeUniqueRandom
   * @description  make random for gallery tabs
   */
  function makeUniqueRandom(count) {
    if (!uniqueRandoms.length) {
      for (var i = 0; i < count; i++) {
        uniqueRandoms.push(i);
      }
    }
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];
    uniqueRandoms.splice(index, 1);
    return val;
  }

  /**
   * makeVisible
   * @description  set class to gallery tabs to make it visible
   */
  function makeVisible(el) {
    var count = el.length,
      k = 0,
      step = 2.5;
    for (var i = 0; i < count; i++) {
      timer = setTimeout(function () {
        var rand = makeUniqueRandom(count);
        el.eq(rand).addClass('visible');
      }, k * 35);
      k += step;
    }
    timer2 = setTimeout(function () {
      el.not('.visible').addClass('visible');
    }, count * step * 35)
  }

  /**
   * makeInVisible
   * @description  set class to gallery tabs to make it invisible
   */
  function makeInvisible() {
    var el = $('.image.visible');
    el.removeClass('visible');
    uniqueRandoms = [];
    clearTimeout(timer);
    clearTimeout(timer2);
  }

  /**
   * IE Polyfills
   * @description  Adds some loosing functionality to IE browsers
   */
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
          .done(function () {
            $html.addClass("ie-10");
            PointerEventsPolyfill.initialize({});
          });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }


  /**
   * Copyright Year
   * @description  Evaluates correct copyright year
   */
  if (plugins.copyrightYear.length) {
    plugins.copyrightYear.text(initialDate.getFullYear());
  }



  /**
   * jQuery Countdown
   * @description  Enable countdown plugin
   */
  if ( plugins.countDown.length ) {
    for ( var i = 0; i < plugins.countDown.length; i++) {
      var $countDownItem = $( plugins.countDown[i] ),
        settings = {
          format: $countDownItem.attr('data-format'),
          layout: $countDownItem.attr('data-layout')
        };

      if ( livedemo ) {
        var d = new Date();
        d.setDate(d.getDate() + 42);
        settings[ $countDownItem.attr('data-type') ] = d;
      } else {
        settings[ $countDownItem.attr('data-type') ] = new Date( $countDownItem.attr( 'data-time' ) );
      }
      $countDownItem.countdown( settings );
    }
  }


  /**
   * Bootstrap Tooltips
   * @description Activate Bootstrap Tooltips
   */
  if (plugins.bootstrapTooltip.length) {
    plugins.bootstrapTooltip.tooltip();
  }

  /**
   * Responsive Tabs
   * @description Enables Responsive Tabs plugin
   */
  if (plugins.responsiveTabs.length) {
    var i = 0;
    for (i = 0; i < plugins.responsiveTabs.length; i++) {
      var $this = $(plugins.responsiveTabs[i]);
      $this.easyResponsiveTabs({
        type: $this.attr("data-type"),
        closed: true,
        tabidentify: $this.find(".resp-tabs-list").attr("data-group") || "tab"
      });
    }
  }

  /**
   * RD Twitter Feed
   * @description Enables RD Twitter Feed plugin
   */
  if (plugins.twitterfeed.length > 0) {
    var i;
    for (i = 0; i < plugins.twitterfeed.length; i++) {
      var twitterfeedItem = plugins.twitterfeed[i];
      $(twitterfeedItem).RDTwitter({
        hideReplies: false,
        localTemplate: {
          avatar: "images/features/rd-twitter-post-avatar-48x48.jpg"
        },
        callback: function () {
          $window.trigger("resize");
        }
      });
    }
  }

  // RD Input Label
  if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
  }

  /**
   * Radio
   * @description Add custom styling options for input[type="radio"]
   */
  if (plugins.radio.length) {
    var i;
    for (i = 0; i < plugins.radio.length; i++) {
      var $this = $(plugins.radio[i]);
      $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
    }
  }

  /**
   * Checkbox
   * @description Add custom styling options for input[type="checkbox"]
   */
  if (plugins.checkbox.length) {
    var i;
    for (i = 0; i < plugins.checkbox.length; i++) {
      var $this = $(plugins.checkbox[i]);
      $this.after("<span class='checkbox-custom-dummy'></span>")
    }
  }

  /**
   * Toggles
   * @description Make toggles from input[type="checkbox"]
   */
  if (plugins.toggles.length) {
    var i;
    for (i = 0; i < plugins.toggles.length; i++) {
      var $this = $(plugins.toggles[i]);
      $this.after("<span class='toggle-custom-dummy'></span>")
    }
  }

  /**
   * jQuery Count To
   * @description Enables Count To plugin
   */
  if (plugins.counter.length) {
    var i;
    for (i = 0; i < plugins.counter.length; i++) {
      var counterItem = $(plugins.counter[i]);

      $window.on("scroll load", $.proxy(function () {
        var counter = $(this);
        if ((!counter.hasClass("animated-first")) && (isScrolledIntoView(counter))) {
          counter.countTo({
            refreshInterval: 40,
            speed: counter.attr("data-speed") || 1000
          });
          counter.addClass('animated-first');
        }
      }, counterItem))
    }
  }

  /**
   * Owl carousel
   * @description Enables Owl carousel plugin
   */
  if (plugins.owl.length) {
    var k;
    for (k = 0; k < plugins.owl.length; k++) {
      var c = $(plugins.owl[k]),
        responsive = {};

      var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"],
        values = [0, 480, 768, 992, 1200],
        i, j;

      for (i = 0; i < values.length; i++) {
        responsive[values[i]] = {};
        for (j = i; j >= -1; j--) {
          if (!responsive[values[i]]["items"] && c.attr("data" + aliaces[j] + "items")) {
            responsive[values[i]]["items"] = j < 0 ? 1 : parseInt(c.attr("data" + aliaces[j] + "items"));
          }
          if (!responsive[values[i]]["stagePadding"] && responsive[values[i]]["stagePadding"] !== 0 && c.attr("data" + aliaces[j] + "stage-padding")) {
            responsive[values[i]]["stagePadding"] = j < 0 ? 0 : parseInt(c.attr("data" + aliaces[j] + "stage-padding"));
          }
          if (!responsive[values[i]]["margin"] && responsive[values[i]]["margin"] !== 0 && c.attr("data" + aliaces[j] + "margin")) {
            responsive[values[i]]["margin"] = j < 0 ? 30 : parseInt(c.attr("data" + aliaces[j] + "margin"));
          }
          if (!responsive[values[i]]["dotsEach"] && responsive[values[i]]["dotsEach"] !== 0 && c.attr("data" + aliaces[j] + "dots-each")) {
            responsive[values[i]]["dotsEach"] = j < 0 ? false : parseInt(c.attr("data" + aliaces[j] + "dots-each"));
          }
        }
      }

    

      // Create custom Navigation
      if (c.attr('data-nav-custom')) {
        c.on("initialized.owl.carousel", function (event) {
          var carousel = $(event.currentTarget),
            customNav = $(carousel.attr("data-nav-custom"));

          customNav.find("[data-owl-prev]").on('click', function (e) {
            e.preventDefault();
            carousel.trigger('prev.owl.carousel', [300]);
          });

          customNav.find("[data-owl-next]").on('click', function (e) {
            e.preventDefault();
            carousel.trigger('next.owl.carousel', [300]);
          });
        });
      }

      c.owlCarousel({
        autoplay: c.attr("data-autoplay") === "true",
        loop: c.attr("data-loop") === "true",
        items: 1,
        autoplaySpeed: 600,
        autoplayTimeout: 3000,
        dotsContainer: c.attr("data-pagination-class") || false,
        navContainer: c.attr("data-navigation-class") || false,
        mouseDrag: c.attr("data-mouse-drag") === "true",
        nav: c.attr("data-nav") === "true",
        dots: c.attr("data-dots") === "true",
        dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
        responsive: responsive,
        animateOut: c.attr("data-animation-out") || false,
        navText: $.parseJSON(c.attr("data-nav-text")) || [],
        navClass: $.parseJSON(c.attr("data-nav-class")) || ['owl-prev', 'owl-next']
      });

    }
  }


  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
      stickUpOffset: (plugins.rdNavbar.attr("data-stick-up-offset")) ? plugins.rdNavbar.attr("data-stick-up-offset") : 1,
      anchorNavOffset: -120
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }


  /**
   * Checkout RD Material Tabs
   */
  if (plugins.checkoutRDTabs.length) {
    var i, step = 0;
    for (i = 0; i < plugins.checkoutRDTabs.length; i++) {
      var checkoutTab = $(plugins.checkoutRDTabs[i]);

      checkoutTab.RDMaterialTabs({
        dragList: true,
        dragContent: false,
        items: 1,
        marginContent: 10,
        margin: 0,
        responsive: {
          480: {
            items: 2
          },
          768: {
            dragList: false,
            items: 3
          }
        },
        callbacks: {
          onChangeStart: function (active, indexTo) {
            if (indexTo > step + 1) {
              return false;
            } else if (indexTo == step + 1) {
              for (var j = 0; j < this.$content.find(".rd-material-tab").length; j++) {
                if (j <= step) {
                  var inputs = this.$content.find(".rd-material-tab").eq(j).find("[data-constraints]");

                  if (!isValidated(inputs)) {
                    this.setContentTransition(this, this.options.speed)
                    this.moveTo(j);
                    return false
                  }
                }
              }
              if (indexTo > step) step = indexTo;
            }

          },
          onChangeEnd: function () {

          },
          onInit: function (tabs) {
            attachFormValidator(tabs.$element.find("[data-constraints]"));

            $('.checkout-step-btn').on("click", function (e) {
              e.preventDefault();
              var index = this.getAttribute("data-index-to"),
                inputs = tabs.$content.find(".rd-material-tab").eq(index - 1).find("[data-constraints]");

              if (isValidated(inputs)) {
                tabs.setContentTransition(tabs, tabs.options.speed);
                tabs.moveTo(parseInt(index));
                if (index > step) step = index;
              }
            });
          }
        }
      });
    }
  }
});

window.addEventListener('load', function () {
	document.documentElement.classList.add('page-loaded');
		var getFont = document.querySelectorAll('.lazy-font');
		getFont.forEach(function (font) {
			if (font.rel) {
				font.rel = "stylesheet";	
			}
			else {
				var getSrc = font.getAttribute('data-src');
				font.src = getSrc;
			}
		})
})

} catch(err) {}


