const navbarToggle = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar-menu');
const toggle = document.getElementById('themeToggle');
const body = document.body;

// Mobile menu toggle
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Dark mode toggle
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// bubble animation
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
let bubbles = [];
let bubbleCount = 100; // number of bubbles

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Bubble class
class Bubble {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 8 + 2;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.closePath();
    }
}

// Create bubbles
for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new Bubble());
}

// Animation loop
function animateBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Choose color based on dark-mode
    let color = document.body.classList.contains('dark-mode') ? 'white' : 'black';

    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw(color);
    });

    requestAnimationFrame(animateBubbles);
}

animateBubbles();

// Skill Animation
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');

nextButton.onclick = function () {
    showSlider('next')
}
prevButton.onclick = function () {
    showSlider('prev')
}

const showSlider = (type) => {

    carousel.classList.remove('prev','next');
    let item = document.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        listHTML.appendChild(item[0]);
        carousel.classList.add('next');
    }else{
        let positionLast  = item.length-1;
        listHTML.prepend(item[positionLast]);
        carousel.classList.add('prev');
    }

}