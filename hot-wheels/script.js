let audio, controlPausa, estaReproduciendo = false;

function iniciarCarga() {
    let porcentaje = 0;
    const percentageElement = document.getElementById('percentage');
    const loaderBar = document.getElementById('loaderBar');
    const loadingScreen = document.getElementById('loadingScreen');

    const intervalo = setInterval(() => {
        porcentaje += Math.random() * 15;
        if (porcentaje >= 100) {
            porcentaje = 100;
            clearInterval(intervalo);

            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mostrarMensajeEspecial();
                }, 500);
            }, 500);
        }
        percentageElement.textContent = Math.floor(porcentaje) + '%';
        loaderBar.style.width = porcentaje + '%';
    }, 300);
}

function mostrarMensajeEspecial() {
    const mensajeDiv = document.querySelector('.mensaje-especial');
    const texto = "Este regalo es para ti mi amor en este día muy especial. Feliz 30 de septiembre❤!";
    const elemento = document.getElementById('texto-mensaje');

    mensajeDiv.style.display = 'flex';

    setTimeout(() => {
        mensajeDiv.classList.add('mostrar');

        let i = 0;
        function maquinaEscribir() {
            if (i < texto.length) {
                elemento.innerHTML = texto.substring(0, i + 1) + '<span class="cursor"></span>';
                i++;
                setTimeout(maquinaEscribir, 50);
            } else {
                elemento.innerHTML = texto + '<span class="cursor"></span>';

                setTimeout(() => {
                    mensajeDiv.classList.remove('mostrar');
                    setTimeout(() => {
                        mensajeDiv.style.display = 'none';
                        inicializarContenido();
                    }, 1000);
                }, 5000);
            }
        }

        maquinaEscribir();
    }, 100);
}

function inicializarContenido() {
    inicializarMusica();

    function crearEstrellaFugaz() {
        const estrella = document.createElement('div');
        estrella.className = 'estrella-fugaz';
        estrella.style.top = Math.random() * 60 + '%';
        estrella.style.animationDelay = '0s';
        estrella.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        document.querySelector('.estrellas-fugaces').appendChild(estrella);
        setTimeout(() => {
            estrella.remove();
        }, 4000);
    }

    setInterval(() => {
        if (Math.random() > 0.3) {
            crearEstrellaFugaz();
        }
    }, Math.random() * 5000 + 3000);

    const mensajes = {
        1: "<h2>Gracias por existir en mi vida.</h2>Gracias por estar conmigo, amor. Este Hot Wheels es más que un regalo: es una forma de decirte que cada momento contigo es una aventura que quiero recorrer a toda velocidad.",
        2: "<h2>Tu amor es mi lugar favorito.</h2>Tu sonrisa acelera mi mundo. Hoy te regalo este auto como símbolo de todo lo que me haces sentir: emoción, ternura y ese impulso que me lleva siempre hacia ti.",
        3: "<h2>Contigo, todo tiene sentido.</h2>Cada detalle contigo tiene magia. Este Hot Wheels representa lo que somos: únicos, veloces, intensos. Gracias por ser mi copiloto en esta pista llamada vida.",
        4: "<h2>Amarte es mi mejor decisión.</h2>No necesito una fecha especial para recordarte cuánto te amo, pero hoy aprovecho para regalarte este auto y decirte que contigo, cada curva vale la pena.",
        5: "<h2>Siempre tú, sin dudarlo.</h2>Eres mi motor, mi pista favorita, mi destino. Este Hot Wheels es pequeño, pero lleva todo mi cariño, mi emoción y mi promesa de seguir corriendo a tu lado."
    };

    const flores = document.querySelectorAll('.flor');
    const modales = document.querySelectorAll('.modal');
    const botonesCerrar = document.querySelectorAll('.cerrar-modal');

    flores.forEach(flor => {
        flor.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';

            const numeroModal = modalId.replace('modal', '');
            const textoEscribiendo = document.getElementById(`texto-escribiendo-${numeroModal}`);
            maquinaEscribirModal(textoEscribiendo, mensajes[numeroModal], 0, 30);
        });
    });

    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    modales.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    const puntos = document.querySelectorAll('.carrusel-punto');

    puntos.forEach(punto => {
        punto.addEventListener('click', function () {
            const indice = parseInt(this.getAttribute('data-indice'));
            const carrusel = this.closest('.modal-contenido').querySelector('.carrusel');
            const contenedorPuntos = this.closest('.carrusel-controles');
            carrusel.style.transform = `translateX(-${indice * 100}%)`;
            contenedorPuntos.querySelectorAll('.carrusel-punto').forEach(p => {
                p.classList.remove('activo');
            });
            this.classList.add('activo');
        });
    });

    function maquinaEscribirModal(elemento, texto, i, velocidad) {
        if (i < texto.length) {
            elemento.innerHTML = texto.substring(0, i + 1) + '<span class="cursor"></span>';
            setTimeout(function () {
                maquinaEscribirModal(elemento, texto, i + 1, velocidad);
            }, velocidad);
        } else {
            elemento.innerHTML = texto + '<span class="cursor"></span>';
        }
    }

    setInterval(() => {
        modales.forEach(modal => {
            if (modal.style.display === 'flex') {
                const carrusel = modal.querySelector('.carrusel');
                const puntos = modal.querySelectorAll('.carrusel-punto');
                const puntoActivo = modal.querySelector('.carrusel-punto.activo');
                let indiceActual = parseInt(puntoActivo.getAttribute('data-indice'));
                let siguienteIndice = (indiceActual + 1) % 3;

                carrusel.style.transform = `translateX(-${siguienteIndice * 100}%)`;

                puntos.forEach(punto => {
                    punto.classList.remove('activo');
                });
                puntos[siguienteIndice].classList.add('activo');
            }
        });
    }, 5000);

    document.body.classList.remove("no-cargado");
}

function inicializarMusica() {
    audio = new Audio('./audio/those-eyes.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    function iniciarReproduccion() {
        if (!estaReproduciendo) {
            audio.play();
            estaReproduciendo = true;
            crearControlPausa();
            document.removeEventListener('click', iniciarReproduccion);
            document.removeEventListener('scroll', iniciarReproduccion);
        }
    }

    document.addEventListener('click', iniciarReproduccion);
    document.addEventListener('scroll', iniciarReproduccion);
}

function crearControlPausa() {
    controlPausa = document.createElement('div');
    controlPausa.innerHTML = '🚗';
    controlPausa.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        width: 50px; 
        height: 50px;
        background: rgba(0, 0, 0, 0.3); 
        border: 2px solid #00BFFF; 
        border-radius: 50%;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        font-size: 24px;
        cursor: pointer; 
        z-index: 1000; 
        box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
        color: #00BFFF;
    `;
    controlPausa.addEventListener('click', toggleReproduccion);
    document.body.appendChild(controlPausa);
}

function toggleReproduccion() {
    if (estaReproduciendo) {
        audio.pause();
        controlPausa.innerHTML = '🚗';
        controlPausa.style.boxShadow = '0 0 5px rgba(0, 191, 255, 0.3)';
    } else {
        audio.play();
        controlPausa.innerHTML = '🚗';
        controlPausa.style.boxShadow = '0 0 15px rgba(0, 191, 255, 0.8)';
    }
    estaReproduciendo = !estaReproduciendo;
}

window.addEventListener('load', iniciarCarga);
