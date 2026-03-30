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
