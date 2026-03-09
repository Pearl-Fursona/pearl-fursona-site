window.addEventListener('load', () => {

  // subtelny wzorek w tle
  const pattern = document.createElement('div');
  pattern.classList.add('background-pattern');
  document.body.appendChild(pattern);

  // unoszące się serduszka
  const colors = ['#ff6bb5','#ff4fa3','#ffd6ec','#ff9fd4'];

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('background-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    const size = Math.random() * 12 + 8;
    heart.style.fontSize = size + 'px';
    heart.style.color = colors[Math.floor(Math.random()*colors.length)];
    const duration = Math.random() * 8 + 8;
    heart.style.animationDuration = duration + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(createHeart, 400);

  // pulsujące kształty
  const shapes = ['circle', 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // romb
                  'polygon(50% 0%, 100% 100%, 0% 100%)', // trójkąt
                  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']; // kwadrat

  function createPulseShape(className) {
    const shape = document.createElement('div');
    shape.classList.add('pulse-shape', className);
    shape.style.clipPath = 'circle(50%)';
    document.body.appendChild(shape);

    // zmiana kształtów co kilka sekund
    setInterval(() => {
      const nextShape = shapes[Math.floor(Math.random() * shapes.length)];
      shape.style.transition = 'clip-path 4s ease-in-out';
      shape.style.clipPath = nextShape;
    }, 4000);
  }

  createPulseShape('pulse-shape-left');
  createPulseShape('pulse-shape-right');

});