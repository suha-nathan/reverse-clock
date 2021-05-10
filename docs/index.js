let startTimerButton = document.querySelector('.startTimer');
let pauseTimerButton = document.querySelector('.pauseTimer');
// let timerDisplay = document.querySelector('.timer');
let startTime = new Date().getTime();
let updatedTime;
let difference;
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
  paused = 0;
  running = 1;
  startTimerButton.disabled = true;
  startTimerButton.style.cursor = "auto";

}

function resetTimer(){
  // clearInterval(tInterval);
  document.getElementById("decrementValue").value = 0
  reverseAmount = document.getElementById("decrementValue").value

  difference = 0;
  startTime = new Date().getTime();
  startTimerButton.disabled = false;
  startTimerButton.style.cursor = "pointer";

}

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
