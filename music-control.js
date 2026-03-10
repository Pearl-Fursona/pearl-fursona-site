const music = document.getElementById('background-music');
const toggleBtn = document.getElementById('music-toggle');

// ustawiamy początkowo 0 głośności, żeby autoplay zadziałało
music.volume = 0; 
music.play().then(() => {
  setTimeout(() => { music.volume = 0.3; }, 100);
}).catch(() => {
  document.body.addEventListener('click', () => { music.play(); music.volume = 0.3; }, { once: true });
});

// ustawiamy ikonę przycisku na 🔊
toggleBtn.textContent = '🔊';

// przełączanie muzyki przy kliknięciu
toggleBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = '🔊';
  } else {
    music.pause();
    toggleBtn.textContent = '🔇';
  }
});