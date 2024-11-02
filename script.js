let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapResetButton = document.getElementById('lapReset');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
lapResetButton.addEventListener('click', resetOrLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        startStopButton.innerHTML = "Stop";
        lapResetButton.innerHTML = "Lap";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.innerHTML = "Start";
        lapResetButton.innerHTML = "Reset";
        running = false;
    }
}

function resetOrLap() {
    if (running) {
        recordLap();
    } else {
        reset();
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = "Start";
    lapResetButton.innerHTML = "Reset";
    display.innerHTML = "00:00.00";
    difference = 0;
    laps = [];
    lapCounter = 0;
    lapsContainer.innerHTML = "";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = minutes + ":" + seconds + "." + milliseconds;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
        lapsContainer.appendChild(lapElement);
    }
}
