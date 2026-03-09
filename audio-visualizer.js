const audio = document.getElementById("background-music");
const canvas = document.getElementById("audio-visualizer");
const ctx = canvas.getContext("2d");

canvas.width = 180;
canvas.height = 60;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioContext.destination);

analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw(){

  requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ff6bb5";
  ctx.beginPath();

  const sliceWidth = canvas.width / bufferLength;
  let x = 0;

  for(let i=0;i<bufferLength;i++){

    const v = dataArray[i] / 128.0;
    const y = v * canvas.height / 2;

    if(i === 0){
      ctx.moveTo(x,y);
    }else{
      ctx.lineTo(x,y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();
}

document.getElementById("intro-overlay").addEventListener("click", () => {

  audioContext.resume().then(() => {
    draw();
  });

});