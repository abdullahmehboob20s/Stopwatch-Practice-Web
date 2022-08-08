"use strict";
const timerContainer = document.querySelector(".timer");
const hoursElement = document.querySelector(".hrs");
const minutesElement = document.querySelector(".min");
const secondsElement = document.querySelector(".sec");
const miliSecondsElement = document.querySelector(".miliSec");
const startBtnElement = document.querySelector(".startBtn");
const resetBtnElement = document.querySelector(".resetBtn");
const lapBtnElement = document.querySelector(".lapBtn");
const lapsContainer = document.querySelector(".laps");
const deleteLapsElement = document.querySelector(".deleteLaps");
let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isTimerRunning = false;
let interval;
function textToElement(elem, value) {
    elem.innerText = value < 10 ? "0" + value.toString() : value.toString();
}
const timer = () => {
    if (miliSeconds == 99) {
        miliSeconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    textToElement(miliSecondsElement, miliSeconds);
    textToElement(secondsElement, seconds);
    textToElement(minutesElement, minutes);
    textToElement(hoursElement, hours);
    miliSeconds++;
};
function startStopWatch() {
    interval = setInterval(timer, 10);
}
startBtnElement.addEventListener("click", () => {
    if (isTimerRunning === false) {
        startStopWatch();
        isTimerRunning = true;
        startBtnElement.innerHTML = "Pause";
        timerContainer.classList.remove("hideAndSeekAnimation");
        return;
    }
    clearInterval(interval);
    startBtnElement.innerHTML = "Start";
    isTimerRunning = false;
    timerContainer.classList.add("hideAndSeekAnimation");
});
resetBtnElement.addEventListener("click", () => {
    miliSeconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    miliSecondsElement.innerHTML = miliSeconds.toString() + "0";
    secondsElement.innerHTML = seconds.toString() + "0";
    minutesElement.innerHTML = minutes.toString() + "0";
    hoursElement.innerHTML = hours.toString() + "0";
});
lapBtnElement.addEventListener("click", () => {
    let template = `<div class="lap-card">
    <div>
      <span class="lap-hours">${hours}</span>
      <span class="lap-minutes">${minutes}</span>
      <span class="lap-seconds">${seconds}</span>
      <span class="lap-milliseconds">${miliSeconds}</span>
    </div>
    <div>${new Date().toLocaleTimeString()}</div>
  </div>`;
    lapsContainer.insertAdjacentHTML("beforeend", template);
    if (lapsContainer.querySelectorAll(".lap-card").length > 3) {
        deleteLapsElement.style.display = "inline-block";
    }
});
deleteLapsElement.style.display = "none";
deleteLapsElement.addEventListener("click", () => {
    lapsContainer.innerHTML = "";
    deleteLapsElement.style.display = "none";
});
