var audio = document.getElementById("audio");
function playAlarm() {
  audio.play();
  audio.addEventListener("ended", function () {
    audio.play();
  });
}
let hoursInput, minutesInput, secondsInput;
let intervalId;

function setTimer() {
  hoursInput = document.getElementById("hoursInp");
  minutesInput = document.getElementById("minutesInp");
  secondsInput = document.getElementById("secondsInp");

  let hours = parseInt(hoursInput.value, 10) || 0;
  let minutes = parseInt(minutesInput.value, 10) || 0;
  let seconds = parseInt(secondsInput.value, 10) || 0;

  intervalId = setInterval(function () {
    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;

      if (minutes < 0) {
        minutes = 59;
        hours--;

        if (hours < 0) {
          // Timer reached 0, you may want to do something here
          clearInterval(intervalId);
          playAlarm();
          displayAlert();
          return;
        }
      }
    }
    updateDisplay(hours, minutes, seconds);
    setZero();
  }, 1000);
}

var displayTime = document.getElementById("time-display");
function displayAlert() {
  displayTime.innerHTML = `<div class="message-time-up" id="message-time-up">Time's Up!!</div>`;
}
function displayResume() {
  displayTime.innerHTML = `
    <div class="time">
      <div class="time" id="hours">00</div>
      <span>:</span>
    </div>
    <div class="time">
      <div class="time" id="minutes">00</div>
      <span>:</span>
    </div>
    <div class="time">
      <div class="time" id="seconds">00</div>
    </div>
  `;
}

function setZero() {
  hoursInput.value = null;
  minutesInput.value = null;
  secondsInput.value = null;
}

function setReset() {
  clearInterval(intervalId);
  setZero();
  audio.pause()
  displayResume();
  audio.currentTime = 0;
  updateDisplay(0, 0, 0);
}



function updateDisplay(hours, minutes, seconds) {
  document.getElementById("hours").innerText = padZero(hours);
  document.getElementById("minutes").innerText = padZero(minutes);
  document.getElementById("seconds").innerText = padZero(seconds);
}

function padZero(number) {
  return number < 10 ? "0" + number : number;
}


document.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    setTimer();
  }
});