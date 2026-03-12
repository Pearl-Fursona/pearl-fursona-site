const audio = document.getElementById('background-music');
const canvas = document.getElementById('circle-visualizer');
const ctx = canvas.getContext('2d');

canvas.width = 150;
canvas.height = 150;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 50;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let rotation = 0;

function draw() {
  requestAnimationFrame(draw);
  
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bars = bufferLength;
  rotation += 0.01; 
  for(let i = 0; i < bars; i++){
    const angle = (i / bars) * 2 * Math.PI + rotation;
    const barHeight = dataArray[i] / 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    ctx.lineTo(centerX + Math.cos(angle) * (radius + barHeight), centerY + Math.sin(angle) * (radius + barHeight));
    ctx.strokeStyle = `rgb(${255}, ${50 + dataArray[i]/2}, ${200 + dataArray[i]/5})`; // neon różowy/fiolet
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  const avg = dataArray.reduce((a,b) => a+b, 0)/dataArray.length;
  const pulseRadius = 8 + avg/50;
  ctx.beginPath();
  ctx.arc(centerX, centerY, pulseRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff4fa3';
  ctx.fill();
}

document.body.addEventListener('click', () => {
  audioCtx.resume().then(() => {
    draw();
  });
}, {once:true});