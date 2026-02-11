var isSpawning = true;
var spawnIntervals = [];
var fullText = "Feliz Día del Amor y la Amistad";

document.addEventListener("DOMContentLoaded", function () {
	startSpawningBubbles();
	animateTextByCharacter();
});

function animateTextByCharacter() {
	const textElement = document.getElementById("animatedText");
	const tl = gsap.timeline();
	
	// Crear span para cada carácter (incluyendo espacios)
	for (let i = 0; i < fullText.length; i++) {
		const span = document.createElement("span");
		span.textContent = fullText[i];
		span.classList.add("text-char");
		textElement.appendChild(span);
	}
	
	// Animar cada carácter cayendo desde arriba
	const chars = textElement.querySelectorAll("span");
	chars.forEach((char, index) => {
		gsap.set(char, { y: -60, opacity: 0 });
		tl.to(char, {
			y: 0,
			opacity: 1,
			duration: 0.6,
			ease: "back.out"
		}, index * 0.08);
	});
	
	// Efecto de pulsación al completar
	tl.to(textElement, {
		duration: 0.3,
		opacity: 0.8,
		yoyo: true,
		repeat: 1,
		ease: "power2.inOut"
	});
}

document.getElementById("bubbleButton").addEventListener("click", function () {
	isSpawning = !isSpawning;
	const btn = this;
	
	// Animación del botón
	gsap.to(btn, {
		scale: 0.85,
		duration: 0.1,
		onComplete: function() {
			gsap.to(btn, { scale: 1, duration: 0.1 });
		}
	});

	if (isSpawning) {
		this.classList.add("playing");
		startSpawningBubbles();
	} else {
		this.classList.remove("playing");
		stopSpawningBubbles();
	}
});

function spawnBubble() {
	var bubble = document.createElement("div");
	bubble.classList.add("bubble");
	
	// Tres tipos de emojis aleatorios
	const emojis = ["❤️", "💝", "💖"];
	const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
	bubble.textContent = randomEmoji;

	var size = Math.random() * (50 - 20) + 20;
	bubble.style.fontSize = `${size}px`;
	bubble.style.width = "fit-content";
	bubble.style.height = "fit-content";
	
	bubble.style.setProperty(
		"--randX",
		`${Math.random() * window.innerWidth - window.innerWidth / 2}px`
	);
	bubble.style.setProperty("--scaleEnd", `${Math.random() * (1.5 - 0.8) + 0.8}`);

	var button = document.getElementById("bubbleButton");
	var btnRect = button.getBoundingClientRect();

	bubble.style.left = `${btnRect.left + btnRect.width / 2 - size / 2}px`;
	bubble.style.bottom = `80px`;

	document.body.appendChild(bubble);
	bubble.style.animation = `bubbleMove 3s linear forwards`;

	setTimeout(function () {
		bubble.remove();
	}, 3000);
}

function startSpawningBubbles() {
	for (let i = 0; i < 3; i++) {
		let interval = setInterval(spawnBubble, 100);
		spawnIntervals.push(interval);
	}
}

function stopSpawningBubbles() {
	spawnIntervals.forEach(clearInterval);
	spawnIntervals = [];
}