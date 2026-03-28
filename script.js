const menuIcons = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcons.onclick = () => {
    navLinks.classList.toggle('active');
};