window.addEventListener('load', () => {

  const card = document.querySelector('.card');
  const sections = document.querySelectorAll('.info-section');

  let animated = false;

  card.addEventListener('click', () => {

    card.classList.toggle('flipped');

    if(!animated && card.classList.contains('flipped')){
      animated = true;

      sections.forEach((section, i) => {
        setTimeout(() => {
          section.classList.add("drop");
        }, i * 600); // pauza między kategoriami
      });

    }

  });

});