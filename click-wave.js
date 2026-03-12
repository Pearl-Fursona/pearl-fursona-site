document.addEventListener("click", e => {
  const wave = document.createElement("div");
  wave.className = "click-wave";
  document.body.appendChild(wave);


  wave.style.left = `${e.clientX}px`;
  wave.style.top = `${e.clientY}px`;


  wave.addEventListener("animationend", () => {
    wave.remove();
  });
});