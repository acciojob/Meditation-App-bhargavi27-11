const video = document.querySelector(".video-container");
const audio = document.querySelector(".song");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let duration = 600; // 10 minutes

// PLAY / PAUSE
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
  } else {
    audio.pause();
    video.pause();
  }
});

// CHANGE SOUND + VIDEO
soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    const sound = this.getAttribute("data-sound");
    const vid = this.getAttribute("data-video");

    audio.src = "Sounds/" + sound;
    video.src = "Sounds/" + vid;

    audio.play();
    video.play();
  });
});

// TIME SELECT
timeButtons.forEach(button => {
  button.addEventListener("click", function () {

    if (this.id === "smaller-mins") duration = 120;
    if (this.id === "medium-mins") duration = 300;
    if (this.id === "long-mins") duration = 600;

    // update display immediately
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);

    timeDisplay.textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  });
});

// TIMER
audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let remaining = duration - currentTime;

  if (remaining <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    return;
  }

  let minutes = Math.floor(remaining / 60);
  let seconds = Math.floor(remaining % 60);

  timeDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};