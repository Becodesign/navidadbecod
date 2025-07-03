

document.addEventListener('DOMContentLoaded', () => {
    const lyrics = [
        "Pudiste haberme dicho que no ❤️",
        "Que no sentías nada por mí 🥰",
        "Que lo nuestro nunca fue algo especial 🤩",
        "La vida cambia y todo tiene final 😜",
        "Una aventura fue para ti 💜",
        "Y fácilmente yo en tus redes caí 😍",
        "Un trago amargoque de ti recibí 💗",
        "Ahora no sé, no sé qué será de mí 💖",
        "Gotas de lluvia, no es el rocío 😍",
        "Lágrimas que vienen del corazón 😢",
        "Gotas de lluvia, no es el rocío 💜",
        "Lágrimas que brotan porque ya no hay amor 💔",
        "Quisiera saber, saber por qué se escapó 🤔",
        "De mis brazos toda la felicidad 😞",
        "A toda máquina corriendo voló 💖",
        "No dejo huella, se desapareció 💜",
        "No le importó que yo sintiera temor 😟",
        "De verme solo así, llorando de amor 🥰",
        "Y por su mente pienso que no pasó 💖",
        "Que por su culpa yo sintiera dolor 🥰",
        "Gotas de lluvia, no es el rocío 💗",
        "Lágrimas que vienen del corazón 😍",
        "Gotas de lluvia, no es el rocío 💜",
        "Lágrimas que brotan porque ya no hay amor 💔",
        "Poco a poco me fui quedando sin respiración 🥰",
        "Sin una explicación 💖",
        "Mucho te quise, tal vez 💞",
        "Y el mundo me quedó al revés 💗",
        "Ya no quiero vivir 😔",
        // Puedes agregar más líneas aquí...


    ];
    const lyricsContainer = document.getElementById('lyrics-container');
    let index = 0;

    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 80%, 60%)`;
    }

    function displayLyricLine() {
        if (index >= lyrics.length) {
            return;
        }

        const lineData = lyrics[index];

        const p = document.createElement('p');
        p.classList.add('lyric-line');
        p.style.color = getRandomColor();
        const spanText = document.createElement('span');
        spanText.classList.add('lyric-text');
        spanText.textContent = lineData;

        p.appendChild(spanText);
        lyricsContainer.appendChild(p);

        void p.offsetWidth;
        p.classList.add('show');

        index++;
        setTimeout(displayLyricLine, 2000);
    }

    setTimeout(displayLyricLine, 500);
});