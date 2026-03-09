window.addEventListener('load', () => {

  const card = document.querySelector('.card');
  const backText = document.querySelector('.back-text');

  const textToType = `Pearl to uroczy i wrażliwy chłopak, który uwielbia poznawać nowe osoby i spędzać z nimi czas w przyjaznej atmosferze. Każdy, kto go pozna, od razu zauważa jego ciepło i empatię – zawsze słucha innych z uwagą i potrafi pocieszyć, gdy ktoś ma gorszy dzień.

Uwielbia drobne przyjemności, serdeczne gesty i szczere komplementy, które sprawiają, że rumieni się z uroczego zawstydzenia. Pearl ma też w sobie odrobinę cwaniackiego uroku, dzięki czemu potrafi sprytnie poradzić sobie w trudnych sytuacjach.

Jego energia jest lekka i radosna, a każdy moment spędzony w jego towarzystwie nabiera ciepła i pozytywnej magii. Pearl to połączenie delikatności, wrażliwości i subtelnego humoru – prawdziwy skarb dla tych, którzy chcą go bliżej poznać. 🍓💗`;

  let typed = false;

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');

    if(!typed && card.classList.contains('flipped')){
      typed = true;
      let index = 0;
      function typeWriter(){
        if(index < textToType.length){
          backText.textContent += textToType.charAt(index);
          index++;
          setTimeout(typeWriter, 35);
        }
      }
      setTimeout(typeWriter, 500);
    }
  });

});