"use strict";

const videoWrapper = document.getElementById("video");
window.addEventListener("load", () => {
	videoWrapper.innerHTML =
		"<video src='imgs/videoBg.mp4' muted autoplay loop alt=''></video>";
});
