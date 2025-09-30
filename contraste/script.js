const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');

const topBox = document.getElementById('topBox');
const topText = document.getElementById('topText');
const topColorCode = document.getElementById('topColorCode');
const topBrand = document.getElementById('topBrand');

const bottomBox = document.getElementById('bottomBox');
const bottomText = document.getElementById('bottomText');
const bottomColorCode = document.getElementById('bottomColorCode');
const bottomBrand = document.getElementById('bottomBrand');

// Sincronizar input color1 con todo lo demás
color1.addEventListener('input', (e) => {
    const color = e.target.value;
    topText.style.color = color;
    topBrand.style.color = color;
    bottomBox.style.backgroundColor = color;
    topColorCode.value = color.toUpperCase();
    topColorCode.style.color = color;
});

// Sincronizar input color2 con todo lo demás
color2.addEventListener('input', (e) => {
    const color = e.target.value;
    bottomBrand.style.color = color;
    topBox.style.backgroundColor = color;
    bottomText.style.color = color;
    bottomColorCode.value = color.toUpperCase();
    bottomColorCode.style.color = color;
});

// Permitir que el usuario escriba en el input HEX superior
topColorCode.addEventListener('input', (e) => {
    let color = e.target.value;
    if (!color.startsWith('#')) color = '#' + color;
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        color1.value = color;
        topText.style.color = color;
        topBrand.style.color = color;
        bottomBox.style.backgroundColor = color;
        topColorCode.style.color = color;
    }
});

// Permitir que el usuario escriba en el input HEX inferior
bottomColorCode.addEventListener('input', (e) => {
    let color = e.target.value;
    if (!color.startsWith('#')) color = '#' + color;
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        color2.value = color;
        bottomBrand.style.color = color;
        topBox.style.backgroundColor = color;
        bottomText.style.color = color;
        bottomColorCode.style.color = color;
    }
});

// Botones de copiar
const copyBtn1 = document.getElementById('copy1');
const copyBtn2 = document.getElementById('copy2');

function copyColorToClipboard(colorValue) {
    navigator.clipboard.writeText(colorValue).then(() => {
        mostrarNotificacion();
    }).catch(err => {
        alert('Error al copiar el color. Inténtalo de nuevo.');
    });
}

copyBtn1.addEventListener('click', () => {
    copyColorToClipboard(color1.value);
});
copyBtn2.addEventListener('click', () => {
    copyColorToClipboard(color2.value);
});

// Función notificación toastr
function mostrarNotificacion() {
    Command: toastr["success"]("", "Copiado");
    toastr.options = {
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "50",
        "timeOut": "50",
    }
}

// mostrar color aleatorio y complementario
const randomBtn = document.getElementById('random');

function mostrarColor() {
    const color = chroma.random();
    const complementario = color.set('hsl.h', (color.get('hsl.h') + 180) % 360);
    color1.value = color.hex();
    color2.value = complementario.hex();

    color1.dispatchEvent(new Event('input'));
    color2.dispatchEvent(new Event('input'));
}

randomBtn.addEventListener('click', mostrarColor);