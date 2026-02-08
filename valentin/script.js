// Constante del texto que se puede cambiar fácilmente
const GREETING_TEXT = "Feliz San Valentín";

window.addEventListener('load', () => {
  createGreetingText();
  textAnim();
  smallHeartAnim();
});

// Insert smallHearts element
const total = 13;
const container = document.querySelector('.smallHearts');
for (var i = 0, span; i < total; i++) {
  span = document.createElement('span');
  span.className = 'smallHeart';
  container.appendChild(span);
}

// Crear el texto del saludo dinámicamente
function createGreetingText() {
  const greetingContainer = document.getElementById('greeting-text');
  greetingContainer.innerHTML = '';
  
  for (let i = 0; i < GREETING_TEXT.length; i++) {
    const char = GREETING_TEXT[i];
    const span = document.createElement('span');
    span.className = 's';
    span.textContent = char;
    
    // Agregar clase 'space' para espacios
    if (char === ' ') {
      span.classList.add('space');
    }
    
    greetingContainer.appendChild(span);
  }
}

// Text animation
function textAnim() {
  const tl = gsap.timeline();
  tl.set('.s', {
    opacity: 1 }).

  from('.s', {
    duration: 0.4,
    delay: '3',
    ease: 'power1.inOut',
    scale: 0,
    y: 40,
    stagger: 0.25 });

}

// Small hearts animation
function smallHeartAnim() {
  const tl = gsap.timeline();
  tl.set('.smallHeart', {
    opacity: 1 }).

  fromTo(
  '.smallHeart',
  {
    scale: 0,
    rotate: '-=25',
    y: '+=70' },

  {
    duration: 3.4,
    delay: '3.6',
    ease: 'slow.out',
    rotate: 'random(-20, 20)',
    scale: 'random(0.5, 1.5)',
    y: '0',
    x: Math.PI * 4,
    modifiers: {
      x: function (x) {
        return Math.sin(parseFloat(x)) * 15 + 'px';
      } },

    stagger: {
      each: 0.08,
      from: 'random' },
    
    onComplete: function() {
      // Animación continua después de la inicial
      continuousHeartAnimation();
    } });

}

// Animación continua de los corazones pequeños
function continuousHeartAnimation() {
  const hearts = document.querySelectorAll('.smallHeart');
  
  hearts.forEach((heart, index) => {
    // Cada corazón tiene un movimiento ligeramente diferente
    const duration = 2 + Math.random() * 2; // Entre 2 y 4 segundos
    const delay = index * 0.1; // Pequeño delay para cada corazón
    const distance = 15 + Math.random() * 10; // Distancia de movimiento entre 15 y 25px
    
    // Animación de movimiento de lado a lado (sin rotación)
    gsap.to(heart, {
      x: `+=${distance}`,
      duration: duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: delay
    });
  });
}