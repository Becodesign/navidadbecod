// Game state
let score = 0;
let highScore = localStorage.getItem('whackHighScore') || 0;
let timeLeft = 30;
let gameTimer;
let moleTimer;
let isPlaying = false;

// DOM elements
const scoreCount = document.querySelector('.score-count');
const timeDisplay = document.querySelector('.time');
const highScoreDisplay = document.querySelector('.high-score-count');
const startBtn = document.querySelector('.start-btn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const gameOver = document.querySelector('.game-over');
const scoreFinal = document.querySelector('.score-final');
const highScoreFinal = document.querySelector('.high-score-final');
const playAgainBtn = document.querySelector('.play-again-btn');

// Initialize game
function initGame() {
    // Reset state
    score = 0;
    timeLeft = 30;
    isPlaying = false;
    clearInterval(gameTimer);
    clearInterval(moleTimer);
    
    // Update display
    scoreCount.textContent = score;
    timeDisplay.textContent = timeLeft;
    highScoreDisplay.textContent = highScore;
    gameOver.classList.add('hidden');
    startBtn.textContent = 'Start Game';
    
    // Reset moles
    moles.forEach(mole => {
        mole.classList.remove('up');
        mole.classList.remove('bonk');
    });
}

// Start game
function startGame() {
    if (isPlaying) return;
    
    isPlaying = true;
    startBtn.textContent = 'Playing...';
    
    // Start timers
    gameTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    popMole();
}

// Pop mole randomly
function popMole() {
    const minDelay = 500;
    const maxDelay = 1500;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    
    moleTimer = setInterval(() => {
        // Hide previous mole
        moles.forEach(mole => mole.classList.remove('up'));
        
        // Show new mole
        const randomHole = Math.floor(Math.random() * holes.length);
        moles[randomHole].classList.add('up');
        
        // Hide mole after a delay
        setTimeout(() => {
            if (isPlaying) {
                moles[randomHole].classList.remove('up');
            }
        }, delay);
    }, delay);
}

// Whack mole
function whack(e) {
    if (!isPlaying) return;
    
    const mole = e.currentTarget.querySelector('.mole');
    if (!mole.classList.contains('up')) return;
    
    score++;
    scoreCount.textContent = score;
    
    // Bonk animation
    mole.classList.remove('up');
    mole.classList.add('bonk');
    setTimeout(() => {
        mole.classList.remove('bonk');
    }, 300);
    
    // Add particle effect
    createParticles(e);
}

// Create particles on whack
function createParticles(e) {
    const particles = 10;
    const colors = ['#60a5fa', '#a78bfa', '#ffffff'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // Position particle at click position
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Add to hole
        e.currentTarget.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 6 + 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        
        const animate = () => {
            if (!isPlaying) {
                particle.remove();
                return;
            }
            
            posX += vx;
            posY += vy;
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.05;
            
            if (particle.style.opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// End game
function endGame() {
    isPlaying = false;
    clearInterval(gameTimer);
    clearInterval(moleTimer);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('whackHighScore', highScore);
    }
    
    // Update final display
    scoreFinal.textContent = score;
    highScoreFinal.textContent = highScore;
    gameOver.classList.remove('hidden');
}

// Event listeners
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', initGame);
holes.forEach(hole => hole.addEventListener('click', whack));

// Initialize on load
initGame();