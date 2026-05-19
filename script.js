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

// BUBBLE ANIMATION
// const canvas = document.getElementById('bubbleCanvas');
// const ctx = canvas.getContext('2d');
//
// let bubbles = [];
// const bubbleCount = 100;
//
// // Resize canvas
// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

// Bubble class
// class Bubble {
//     constructor() {
//         this.reset();
//     }
//
//     reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.radius = Math.random() * 6 + 2;
//         this.speedX = (Math.random() - 0.5) * 1.2;
//         this.speedY = (Math.random() - 0.5) * 1.2;
//     }
//
//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//
//         if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
//             this.speedX *= -1;
//         }
//
//         if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
//             this.speedY *= -1;
//         }
//     }
//
//     draw(color) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.globalAlpha = 0.5;
//         ctx.fillStyle = color;
//         ctx.fill();
//         ctx.globalAlpha = 1;
//         ctx.closePath();
//     }
// }
// // Create bubbles
// function initBubbles() {
//     bubbles = [];
//     for (let i = 0; i < bubbleCount; i++) {
//         bubbles.push(new Bubble());
//     }
// }
//
// // Animation loop
// function animateBubbles() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     let color = document.body.classList.contains('dark-mode')
//         ? 'rgba(255,255,255,0.8)'
//         : 'rgba(0,0,0,0.6)';
//
//     bubbles.forEach(bubble => {
//         bubble.update();
//         bubble.draw(color);
//     });
//
//     requestAnimationFrame(animateBubbles);
// }
//
// start
// initBubbles();
// animateBubbles();


// HERE SECTION TYPE WRITTER
const words = [
    "Web Developer",
    "Photographer",
    "UI Designer",
    "Creative Coder"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typing-text");

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!isDeleting){

        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if(charIndex === currentWord.length){

            isDeleting = true;
            setTimeout(typeEffect, 1200);

            return;
        }

    }else{

        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if(charIndex === 0){
            isDeleting = false;
            wordIndex++;
            if(wordIndex === words.length){
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();

// ABOUT CONTENT ANIMATION

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

// SKILLS SECTION

(function initSkillsSection() {
    const skillBtns  = document.querySelectorAll('.skill-btn');
    const iconWraps  = document.querySelectorAll('.tech-icon-wrap');
    const cardPanels = document.querySelectorAll('.skill-card-content');
    // if (!skillBtns.length) return;

    function activateCategory(category) {
        // Toggle button active state
        skillBtns.forEach(b =>
            b.classList.toggle('active', b.dataset.category === category)
        );
        // Toggle icon visibility in arena
        iconWraps.forEach(w =>
            w.classList.toggle('active-cat', w.dataset.category === category)
        );
        // Switch glass card content panel
        cardPanels.forEach(panel =>
            panel.classList.toggle('active', panel.dataset.card === category)
        );
    }

    //Front End on load
    activateCategory('frontend');

    skillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activateCategory(btn.dataset.category);
        });
    });
})();

// GALLERY

const items = document.querySelectorAll(".slider1 .item");
const preview = document.getElementById("galleryPreview");
const previewImg = preview.querySelector("img");

items.forEach(item => {
    const img = item.querySelector("img");

    item.addEventListener("mouseenter", () => {
        previewImg.src = img.src;
        preview.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
        preview.classList.remove("active");
    });
});