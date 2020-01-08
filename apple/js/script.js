$(".faq .slider__button").click(function(){
    $(this).parent().next().toggleClass("open");
    $(this).text($(this).text() == '+' ? '-' : '+');
});

if($(window).width() <= 935){
    $(".price__items").slick({
        infinite: true,
        variableWidth:true,
        prevArrow:$("#price-prev"),
        nextArrow:$("#price-next"),
        slidesToShow:2,
        centerMode:true
    })
}else{
    $(".price__items").slick({
        infinite: true,
        variableWidth:true,
        prevArrow:$("#price-prev"),
        nextArrow:$("#price-next"),
        slidesToShow:2
    })
}
$(".header__mobile-btn").click(function(){
    $(this).toggleClass("open");
    $(".header__mobile-menu").toggleClass("open");
});
function openModal(num){
    $("body, .modal-bg, .modal-" + num).addClass("open");
}
function closeModal(){
    $("body, .modal, .modal-bg").removeClass("open");
}
$(".bingc-action-open-passive-form, .false").click(function(e){
    e.preventDefault()
})