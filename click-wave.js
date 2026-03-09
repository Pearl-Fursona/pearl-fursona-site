// click-wave.js
document.addEventListener("click", e => {
  const wave = document.createElement("div");
  wave.className = "click-wave";
  document.body.appendChild(wave);

  // ustawienie pozycji fali na miejscu kliknięcia
  wave.style.left = `${e.clientX}px`;
  wave.style.top = `${e.clientY}px`;

  // po animacji usuwamy element
  wave.addEventListener("animationend", () => {
    wave.remove();
  });
});