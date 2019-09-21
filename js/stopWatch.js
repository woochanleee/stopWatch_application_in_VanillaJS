const SHOWING_CN = "showing";

const btn = document.querySelectorAll(".function button"),
      resetBtn = document.querySelector("#reset"),
      startBtn = document.querySelector("#start"),
      lapBtn = document.querySelector("#lap"),
      stopBtn = document.querySelector("#stop"),
      minute = document.querySelector("#minute"),
      second = document.querySelector("#second"),
      mSecond = document.querySelector("#mSecond");
const record = document.querySelector("#record ul");
let startTime = 0,
    endTime = 0,
    timeStart,
    min,
    sec,
    mSec,
    count = 1;


function addZero(num) {
    return (num < 10 ? '0' + num : '' + num)
}

function timePlus() {
    if (startTime === 0) {
        startTime = Date.now();
    } else {
        startTime += (Date.now() - endTime);
    }
    timeStart = setInterval(function() {
        var nowTime = new Date(Date.now() - startTime);
        min = addZero(nowTime.getMinutes());
        sec = addZero(nowTime.getSeconds());
        mSec = addZero(Math.floor(nowTime.getMilliseconds() / 10))
        minute.innerText = min;
        second.innerText = sec;
        mSecond.innerText = mSec;
    }, 1);
}

function firstPaint() {
    resetBtn.classList.add(SHOWING_CN);
    startBtn.classList.add(SHOWING_CN);
}

function resetBtnClick() {
    startTime = 0;
    min = 0;
    sec = 0;
    mSec = 0;
    timeStart = null;
    minute.innerText = "00";
    second.innerText = "00";
    mSecond.innerText = "00";
    record.innerHTML = "";
    count = 1;
    resetBtn.classList.add("reset2");
    startBtn.classList.add( );
    lapBtn.classList.remove(SHOWING_CN);
    stopBtn.classList.remove(SHOWING_CN);
}

function startBtnClick() {
    timePlus();
    resetBtn.classList.remove(SHOWING_CN, "reset2");
    startBtn.classList.remove(SHOWING_CN);
    lapBtn.classList.add(SHOWING_CN);
    stopBtn.classList.add(SHOWING_CN);
}

function lapBtnClick() {
    let li = document.createElement("li");
    li.innerText = `${count++}번 ${min} : ${sec} : ${mSec}`;
    if (!record.firstChild)
        record.append(li);
    else 
        record.insertBefore(li, record.firstChild);
}

function stopBtnClick() {
    clearInterval(timeStart);
    endTime = Date.now();

    resetBtn.classList.add(SHOWING_CN);
    startBtn.classList.add(SHOWING_CN);
    lapBtn.classList.remove(SHOWING_CN);
    stopBtn.classList.remove(SHOWING_CN);
}

function init() {
    firstPaint();
    resetBtn.addEventListener("click", resetBtnClick);
    startBtn.addEventListener("click", startBtnClick);
    lapBtn.addEventListener("click", lapBtnClick);
    stopBtn.addEventListener("click", stopBtnClick);

}

init();