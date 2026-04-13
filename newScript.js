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

// about animation
const paragraph = document.querySelector('.about-para');
const text = paragraph.innerText;

paragraph.innerHTML = "";

// wrap letters
text.split("").forEach(letter => {
    const span = document.createElement("span");
    span.innerText = letter;
    paragraph.appendChild(span);
});

const spans = document.querySelectorAll('.about-para span');

window.addEventListener('scroll', () => {
    const section = document.querySelector('#about');
    const rect = section.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    // progress BEFORE and INSIDE section
    let progress = (window.innerHeight - rect.top) / window.innerHeight;

    // clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // if section fully passed → keep full blue
    if (rect.top < 0 && rect.bottom < screenHeight) {
        progress = 1;
    }

    // if scrolling above section → reset
    if (rect.top > screenHeight) {
        progress = 0;
    }

    const activeCount = Math.floor(progress * spans.length);

    spans.forEach((span, index) => {
        if (index < activeCount) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });
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
let unAccesptClick;

const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

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

    clearTimeout(unAccesptClick);

    unAccesptClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    },2000);

    // animate.(autoAnimate);
    //
    // autoAnimate = setInterval(() => {
    //     nextButton.style.pointerEvents = 'auto';
    // },3000);
}