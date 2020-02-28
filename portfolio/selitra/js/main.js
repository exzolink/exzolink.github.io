$("#switchLang").click(function() {
    $(".language-selector").toggleClass("active")
    $('.rus').toggleClass('mr');
}), document.querySelectorAll("a[href^=\"#\"]").forEach(a => {
    a.addEventListener("click", function(a) {
        a.preventDefault();
        var b = document.querySelector(".nav").offsetHeight,
            c = document.querySelector(this.getAttribute("href")),
            d = document.body.getBoundingClientRect().top,
            e = c.getBoundingClientRect().top;
        window.scrollTo({
            top: e - d - b,
            behavior: "smooth"
        })
    })
}), $(".close-icon").click(function() {
    $(".form-result").hide(), $(".input-form, .textarea-form").val("")
});