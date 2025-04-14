console.clear();

const dropZone = document.querySelector("#dropZone");
const uploader = document.querySelector("#uploader");
const output = document.querySelector("#output");

dropZone.addEventListener("click", () => uploader.click());

dropZone.addEventListener("dragover", (e) => {
	e.preventDefault();
	dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
	dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	dropZone.classList.remove("dragover");
	const file = e.dataTransfer.files[0];
	if (file) {
		processImage(file);
	}
});

uploader.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		processImage(file);
	}
});

function processImage(file) {
	const reader = new FileReader();

	reader.onload = (e) => {
		const image = new Image();
		image.src = e.target.result;

		image.onload = () => {
			const thief = new ColorThief();
			const palette = thief.getPalette(image, 5);

			// Limpiar el contenido anterior
			output.innerHTML = "";

			// Mostrar la imagen
			const img = document.createElement("img");
			img.src = image.src;
			img.className = "preview-image";
			output.appendChild(img);

			// Mostrar la paleta
			const paletteText = document.createElement("p");
			paletteText.textContent = "PALETA DE COLORES";
			paletteText.className = "palette-title"; // Asignar clase
			output.appendChild(paletteText);

			const paletteDiv = document.createElement("div");
			paletteDiv.className = "palette";
			palette.forEach((color) => {
				const colorContainer = document.createElement("div");
				colorContainer.className = "color-info";

				const colorDiv = document.createElement("div");
				colorDiv.className = "dominant-color";
				colorDiv.style.backgroundColor = `rgb(${color.join(",")})`;

				const hexValue = document.createElement("p");
				hexValue.className = "hex-value";
				hexValue.textContent = `#${rgbToHex(color)}`;

				colorContainer.appendChild(colorDiv);
				colorContainer.appendChild(hexValue);
				paletteDiv.appendChild(colorContainer);
			});
			output.appendChild(paletteDiv);
		};
	};

	reader.readAsDataURL(file);
}

function rgbToHex(rgb) {
	return rgb
		.map((value) => value.toString(16).padStart(2, "0"))
		.join("")
		.toUpperCase();
}