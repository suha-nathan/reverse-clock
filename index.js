let startTimerButton = document.querySelector('.startTimer');
let pauseTimerButton = document.querySelector('.pauseTimer');
// let timerDisplay = document.querySelector('.timer');
let startTime = new Date().getTime();
let updatedTime;
let difference;
let tInterval;
let savedTime;
let reverseAmount = document.getElementById("decrementValue").value

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

window.onload = (event) => {
  setInterval(drawClock, 1000);
};

function startTimer(){
  reverseAmount = document.getElementById("decrementValue").value

  startTime = new Date().getTime();
  // tInterval = setInterval(getShowTime, 1000);
  // console.log(tInterval)

  paused = 0;
  running = 1;
  // timerDisplay.style.background = "#FF0000";
  // timerDisplay.style.cursor = "auto";
  // timerDisplay.style.color = "yellow";
  startTimerButton.disabled = true;
  startTimerButton.style.cursor = "auto";

}

function resetTimer(){
  // clearInterval(tInterval);
  document.getElementById("decrementValue").value = 0
  reverseAmount = document.getElementById("decrementValue").value
  
  difference = 0;
  startTime = new Date().getTime();
  // timerDisplay.innerHTML = 'Start Timer!';
  // timerDisplay.style.background = "#A90000";
  // timerDisplay.style.color = "#fff";
  // timerDisplay.style.cursor = "pointer";
  // startTimerButton.classList.remove('lighter');
  startTimerButton.disabled = false;
  startTimerButton.style.cursor = "pointer";

}

// function getShowTime(){
//     console.log(reverseAmount)
//     updatedTime = new Date().getTime();
//     if (savedTime){
//         difference = ((updatedTime - startTime) + savedTime) * reverseAmount;
//     } else {
//         difference =  (updatedTime - startTime) * (reverseAmount);
//     }
//     // console.log("difference: ", difference)
//     let days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((difference % (1000 * 60)) / 1000);
//     //   let milliseconds = Math.floor((difference % (1000 * 60)) / 100);
//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;
//     //   milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;

//     if(reverseAmount >= 0 ){
//         timerDisplay.innerHTML ="-" + hours + 'hrs ' + minutes + 'min ' + seconds +"sec" ;//+ ':' + milliseconds;
//     }
    
// }

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  let grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  let num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}


function drawTime(ctx, radius){

  updatedTime = new Date().getTime()
  let decrementBySec = parseInt(reverseAmount) === 0 ? parseInt(reverseAmount) : (parseInt(reverseAmount)+1)
  // //amount of time in ms to go backwards by
  difference =  (updatedTime - startTime) * decrementBySec; 
  // console.log(difference/1000)
  console.log("diff: ", difference/1000)
  // no. of miliseconds since Jan 1 1970 (in reverse)
  let reverseTime = new Date()
  reverseTime.setTime(updatedTime - difference)
  console.log(reverseTime)

  let reverseHours = reverseTime.getHours()
  let reverseMinutes = reverseTime.getMinutes()
  let reverseSeconds = reverseTime.getSeconds()
  
  document.querySelector(".clock-time").innerHTML ="Current Time: "+ reverseHours +" hour " + reverseMinutes + " minutes " + reverseSeconds + " seconds." 
  console.log("seconds: ",reverseSeconds)
  console.log("minutes: ",reverseMinutes)
  console.log("hours: ", reverseHours)

  //hour
  reverseHours=reverseHours%12;
  reverseHours=(reverseHours*Math.PI/6)+
  (reverseMinutes*Math.PI/(6*60))+
  (reverseSeconds*Math.PI/(360*60));
  
  drawHand(ctx, reverseHours, radius*0.5, radius*0.07);
  //minute
  reverseMinutes=(reverseMinutes*Math.PI/30)+(reverseSeconds*Math.PI/(30*60));
  
  drawHand(ctx,reverseMinutes, radius*0.8, radius*0.07);
  // second
  reverseSeconds=(reverseSeconds*Math.PI/30);
  
  drawHand(ctx,reverseSeconds, radius*0.9, radius*0.02);
  
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
