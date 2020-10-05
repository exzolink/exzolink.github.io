const menuBtn = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");

menuBtn.addEventListener("click", (e) => {
	menu.classList.toggle("active");
});

if (document.querySelector(".mainpage__intro_video") !== null) {
	const video = document.querySelector(".mainpage__intro_video");
	const videoWrapper = document.querySelector(".mainpage__intro");
	video.addEventListener("ended", (e) => {
        video.pause;
        setTimeout(() => {
            videoWrapper.classList.add("ended");
        }, 500);
	});
}
