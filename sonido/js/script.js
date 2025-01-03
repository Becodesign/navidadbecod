boton = document.getElementById("start-button")
const musica = new Audio("./audio/audio.mp3");
let llave = 1;

boton.addEventListener("click", (e) => {
    if (llave == 1) {
        musica.play();
        musica.loop = true
        llave = 0;
        boton.innerHTML = "<i class='bx bx-pause' ></i>";
        boton.style.background = "#e09704";
    } else {
        musica.pause();
        llave = 1;
        boton.innerHTML = "<i class='bx bx-play'></i>";
        boton.style.background = "#61cf00";
    }
});


