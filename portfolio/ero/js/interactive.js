$(document).ready(function(){

    // RANGE SLIDERS
    $( function() {
        $( "#slider-range1" ).slider({
        range: true,
        min: 0,
        max: 50000,
        values: [ 0, 50000 ],
        slide: function( event, ui ) {
            $( "#amount1" ).val( ui.values[ 0 ] + " руб"  );
            $( "#amount2" ).val( ui.values[ 1 ] + " руб" );
        }
        });
        $( "#amount1" ).val( $( "#slider-range1" ).slider( "values", 0 ) + " руб");
        $( "#amount2" ).val( $( "#slider-range1" ).slider( "values", 1 ) + " руб");
        
    } );

    $( function() {
        $( "#slider-range2" ).slider({
        range: true,
        min: 0,
        max: 50,
        values: [ 0, 50 ],
        slide: function( event, ui ) {
            $( "#amount3" ).val( ui.values[ 0 ] + " см");
            $( "#amount4" ).val( ui.values[ 1 ] + " см" );
        }
        });
        $( "#amount3" ).val( $( "#slider-range2" ).slider( "values", 0 ) + " см");
        $( "#amount4" ).val( $( "#slider-range2" ).slider( "values", 1 ) + " см" );
    } );

    $( function() {
        $( "#slider-range3" ).slider({
        range: true,
        min: 0,
        max: 50,
        values: [ 0, 50 ],
        slide: function( event, ui ) {
            $( "#amount5" ).val( ui.values[ 0 ] + " см");
            $( "#amount6" ).val( ui.values[ 1 ] + " см" );
        }
        });
    
        $( "#amount5" ).val( $( "#slider-range3" ).slider( "values", 0 ) + " см");
        $( "#amount6" ).val( $( "#slider-range3" ).slider( "values", 1 ) + " см" );
    } );

    //   ADAPTIVE RANGE SLIDER FOR GLIDE MOBILE
    $('#slider-range1').draggable();
    $('#slider-range2').draggable();
    $('#slider-range3').draggable();

});

    // FILTER BUTTON

    $(".catalog-filter__button").click(function(){
        $(".catalog-filter__container").toggleClass("filterOpen");
    });

    // FILTER OPEN CHILD
    $(".catalog-filter__nav li").click(function(){
        $(this).find(".child").toggleClass("child-open");
    });


    // HEADER - BASKET POPUP
    $(document).on('click', '#basket-toggle', function() {
        $( '.basket-popup' ).fadeToggle();
    });


    // HEADER - MENU POPUP
    $(document).on('click', '.menu-toggle', function(e) {
        e.preventDefault();
        $( '.menu-mobile' ).fadeToggle();
    });

