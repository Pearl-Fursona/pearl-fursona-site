const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";

const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let particles = [];
let mouse = {x:0,y:0};

document.addEventListener("mousemove", e => {

  mouse.x = e.clientX;
  mouse.y = e.clientY;

  particles.push({
    x: mouse.x,
    y: mouse.y,
    size: Math.random()*4 + 2,
    life: 1
  });

  if(particles.length > 60){
    particles.shift();
  }

});

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=particles.length-1;i>=0;i--){

    let p = particles[i];

    p.life -= 0.03;
    p.size *= 0.96;

    if(p.life <= 0){
      particles.splice(i,1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);

    ctx.fillStyle = `rgba(255,120,190,${p.life})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(255,120,190,0.8)";
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();