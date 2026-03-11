// --- SIDE PANELS JS ---

const panelsData = [
  { id: 'motto', title: 'Motto', type: 'text', content: 'Tu bedzie --' },
  { id: 'vibe', title: 'Mój Vibe', type: 'video', content: 'mojvibe.mp4' },
  { id: 'discord', title: 'Discord', type: 'image', content: 'discord.png' }
];

// Tworzenie paneli w DOM
const sidePanelsContainer = document.createElement('div');
sidePanelsContainer.classList.add('side-panels');
document.body.appendChild(sidePanelsContainer);

panelsData.forEach(panel => {
  const panelEl = document.createElement('div');
  panelEl.classList.add('side-panel');
  panelEl.id = panel.id;

  const canvas = document.createElement('canvas');
  canvas.classList.add('panel-canvas');
  panelEl.appendChild(canvas);

  const content = document.createElement('div');
  content.classList.add('panel-content');

  const title = document.createElement('div');
  title.classList.add('panel-title');
  title.textContent = panel.title;
  content.appendChild(title);

  if(panel.type === 'text'){
    const text = document.createElement('div');
    text.classList.add('panel-text');
    text.textContent = panel.content;
    content.appendChild(text);
  } else if(panel.type === 'video'){
    const video = document.createElement('video');
    video.src = panel.content;
    video.autoplay = false;
    video.muted = true;
    video.loop = true;
    video.style.borderRadius = '6px';
    content.appendChild(video);
  } else if(panel.type === 'image'){
    const img = document.createElement('img');
    img.src = panel.content;
    img.style.borderRadius = '6px';
    content.appendChild(img);
  }

  panelEl.appendChild(content);
  sidePanelsContainer.appendChild(panelEl);
});

// Funkcja generująca kwadraciki (particles)
function explodeParticles(panel, x, y){
  const canvas = panel.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = panel.offsetWidth;
  canvas.height = panel.offsetHeight;

  const particles = [];
  for(let i=0;i<15;i++){
    particles.push({
      x, y,
      dx: (Math.random()-0.5)*60,
      dy: (Math.random()-0.5)*60,
      size: 4 + Math.random()*2,
      alpha:1
    });
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i)=>{
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.05;
      if(p.alpha <= 0) particles.splice(i,1);
      else {
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fillRect(p.x,p.y,p.size,p.size);
      }
    });
    if(particles.length>0) requestAnimationFrame(animate);
  }
  animate();
}

// Hover effect
document.querySelectorAll('.side-panel').forEach(panel => {
  let hoverTimeout;
  panel.addEventListener('mouseenter', e => {
    clearTimeout(hoverTimeout);
    panel.classList.add('expanded');

    // Animacja kwadracików od środka
    const rect = panel.getBoundingClientRect();
    explodeParticles(panel, rect.width/2, rect.height/2);

    // Podświetlenie tekstu
    const texts = panel.querySelectorAll('.panel-title, .panel-text');
    texts.forEach(t => t.style.color = '#fff');

    // Wideo/Muzyka dla Mój Vibe
    if(panel.id === 'vibe'){
      const video = panel.querySelector('video');
      if(video) video.play();
      const music = document.getElementById('background-music');
      if(music) music.volume = 0.05; // przyciszenie muzyki
    }
  });

  panel.addEventListener('mouseleave', e => {
    hoverTimeout = setTimeout(()=>{
      panel.classList.remove('expanded');
      const texts = panel.querySelectorAll('.panel-title, .panel-text');
      texts.forEach(t => t.style.color = '#FFD700');

      if(panel.id === 'vibe'){
        const video = panel.querySelector('video');
        if(video) video.pause();
        const music = document.getElementById('background-music');
        if(music) music.volume = 0.3; // przywrócenie muzyki
      }
    },100); // drobne opóźnienie, żeby nie było szarpania
  });
});