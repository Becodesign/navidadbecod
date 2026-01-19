const lista = [
    "Nuevos comienzos, más sueños y el doble de ganas de lograrlo.",
    "Que no nos falte amor, trabajo y motivos para sonreír.",
    "Que Dios guíe cada paso que demos por buen camino siempre."
];
const colores = ["#ff076f", "#d9fc17", "#00ddfc"]; // Colores diferentes para cada frase

const emojis = ["💛", "🩵", "🩷", "💛", "🩵", "🧡", "🩷"];

const container = document.getElementById("animatedText");
const mainImage = document.getElementById("mainImage");
const bgMusic = document.getElementById("bgMusic");
const audioToggle = document.getElementById("audioToggle");
const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");

let index = 0;
let audioEnabled = false;

// === Pantalla inicial ===
startScreen.addEventListener("click", () => {
    gsap.to(startScreen, {
        opacity: 0, duration: 1, onComplete: () => {
            startScreen.style.display = "none";
            mainContent.style.display = "flex";

            // Animación: entra la imagen solo una vez (más lento)
            gsap.fromTo(mainImage, { y: -300, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 10, // más lento
                ease: "power3.out",
                onComplete: () => {
                    // Luego flota cortito infinitamente
                    gsap.to(mainImage, {
                        y: -15,
                        duration: 1.2,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut"
                    });
                }
            });

            mostrarFrase();
            setInterval(mostrarFrase, 6000);
        }
    });
});

// Frases animadas
function mostrarFrase() {
    container.innerHTML = "";
    const words = lista[index].split(" ");
    words.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.color = colores[index % colores.length]; // Aplica color según el índice
        container.appendChild(span);
    });
    gsap.fromTo(container.querySelectorAll("span"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, ease: "back.out(1.7)" }
    );
    index = (index + 1) % lista.length;
}

// Explosiones
document.body.addEventListener("click", (e) => {
    if (!e.target.closest("#audioToggle") && mainContent.style.display === "flex") {
        if (!audioEnabled) {
            bgMusic.muted = false;
            bgMusic.currentTime = 0;
            bgMusic.play().then(() => {
                audioEnabled = true;
                audioToggle.textContent = "🔊";
            }).catch(err => console.warn("Audio bloqueado:", err));
        }
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            document.body.appendChild(heart);
            heart.style.left = e.clientX + "px";
            heart.style.top = e.clientY + "px";
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 280;
            gsap.to(heart, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0.7,
                opacity: 0,
                duration: 2.2,
                ease: "power2.out",
                onComplete: () => heart.remove()
            });
        }
    }
});

// Estrellas
function createStars(num) {
    for (let i = 0; i < num; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = Math.random() * window.innerHeight + "px";
        document.body.appendChild(star);
        gsap.to(star, {
            opacity: Math.random(),
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}
createStars(100);

// Botón audio
audioToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            audioEnabled = true;
            audioToggle.textContent = "🔊";
        }).catch(err => console.warn("Audio bloqueado:", err));
    } else {
        bgMusic.pause();
        audioEnabled = false;
        audioToggle.textContent = "🔇";
    }
});

// Mostrar el video solo en pantallas <=768px
function toggleBgVideo() {
    const bgVideo = document.getElementById('bgVideo');
    if (window.innerWidth <= 768) {
        bgVideo.style.display = 'block';
    } else {
        bgVideo.style.display = 'none';
    }
}
window.addEventListener('resize', toggleBgVideo);
window.addEventListener('DOMContentLoaded', toggleBgVideo);
