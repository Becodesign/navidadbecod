document.getElementById("button-max-min").addEventListener("click", () => {
    const button = document.getElementById("button-max-min");
    const icon = button.querySelector("i");

    if (!document.fullscreenElement) {
        // Activar pantalla completa
        document.documentElement.requestFullscreen();
        icon.classList.remove("fa-expand");
        icon.classList.add("fa-minimize");
    } else {
        // Salir de pantalla completa
        if (document.exitFullscreen) {
            document.exitFullscreen();
            icon.classList.remove("fa-minimize");
            icon.classList.add("fa-expand");
        }
    }
});

