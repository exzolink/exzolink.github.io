"use strict";!function(){var c=window.innerHeight;document.addEventListener("DOMContentLoaded",function(){var t=document.querySelectorAll(".parallax");if(t.length){var n=function(){t.forEach(function(t){!function(e){var o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:.3,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"50%",d=e.offsetTop,r=e.offsetHeight,f=window.getComputedStyle(e).getPropertyValue("background-attachment"),a=0;function t(){var t=window.pageYOffset||document.body.scrollTop;if(d<t+c&&t<d+r){var n=(d-t)/c;a="fixed"===f?n*c*o:-1*c*n*(1-o)}e.style.backgroundPosition="\n\t\t\t\t"+i+" "+Math.round(a)+"px\n\t\t\t"}window.removeEventListener("scroll",t),window.addEventListener("scroll",t),t()}(t,.3,"50%")})};n(),function(n,e){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:100,o=n.offsetHeight;window.setInterval(function(){var t=n.offsetHeight;t!==o&&(o=t,"function"==typeof e&&e())},t)}(document.body,n),window.addEventListener("resize",function(){c=window.innerHeight})}})}();