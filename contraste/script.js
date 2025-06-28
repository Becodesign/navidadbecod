const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');

const topBox = document.getElementById('topBox');
const topText = document.getElementById('topText');

const topColorCode = document.getElementById('topColorCode');
const bottomColorCode = document.getElementById('bottomColorCode');

const topBrand = document.getElementById('topBrand');
const bottomBrand = document.getElementById('bottomBrand');

const bottomBox = document.getElementById('bottomBox');
const bottomText = document.getElementById('bottomText');


color1.addEventListener('input', (e) => {
    const color = e.target.value;
    topText.style.color = color;
    topBrand.style.color = color;
    bottomBox.style.backgroundColor = color;
    topColorCode.textContent = color.toUpperCase();
    topColorCode.style.color = color;
});

color2.addEventListener('input', (e) => {
    const color = e.target.value;
    bottomBrand.style.color = color;
    topBox.style.backgroundColor = color;
    bottomText.style.color = color;
    bottomColorCode.textContent = color.toUpperCase();
    bottomColorCode.style.color = color;
});

// Inputs de color
const colorInput1 = document.getElementById('color1');
const colorInput2 = document.getElementById('color2');

// Botones de copiar
const copyBtn1 = document.getElementById('copy1');
const copyBtn2 = document.getElementById('copy2');


// Función para copiar al portapapeles
function copyColorToClipboard(colorValue) {
    navigator.clipboard.writeText(colorValue).then(() => {
        mostrarNotificacion();
    }
    ).catch(err => {
        console.error('Error al copiar el color: ', err);
        alert('Error al copiar el color. Inténtalo de nuevo.');
    });
}

// Eventos de clic
copyBtn1.addEventListener('click', () => {
    copyColorToClipboard(colorInput1.value);
});

copyBtn2.addEventListener('click', () => {
    copyColorToClipboard(colorInput2.value);
});

// Función nofificación toastr
function mostrarNotificacion() {
    Command: toastr["success"]("", "Copiado");
    toastr.options = {
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "50",
        "timeOut": "50",

    }
}

