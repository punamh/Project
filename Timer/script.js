
let timerDisplay = document.getElementById("timer");
let strt = document.getElementById("startbtn");
let stp = document.getElementById("stopbtn");
let rst = document.getElementById("resetbtn");

let timerInterval;
let timerValue = 0;
let isRunning = false;

function updateTimerDisplay(){
    let minutes = Math.floor((timerValue%3600)/60);
    let seconds = Math.floor((timerValue%60));
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer(){
if(!isRunning){
    isRunning = true;
    timerInterval = setInterval(() =>{
        timerValue++;
        updateTimerDisplay();
    },1000)
}
}

function stopTimer(){
        clearInterval(timerInterval); 
        updateTimerDisplay();
        isRunning = false;
}

function resetTimer(){
    timerValue = 0; 
    updateTimerDisplay();
}

strt.addEventListener("click",startTimer);
stp.addEventListener("click",stopTimer)
rst.addEventListener("click",resetTimer)

