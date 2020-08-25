const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// CONSTANTS
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

function imageMode(theme) {
    image1.src = `img/undraw_hello_${theme}.svg`;
    image2.src = `img/undraw_hello_${theme}.svg`;
    image3.src = `img/undraw_hello_${theme}.svg`;
}

function toggleLightDarkTheme(theme) {
    nav.style.backgroundColor = theme === DARK_MODE ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = theme === DARK_MODE ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = theme === DARK_MODE ? 'Dark Mode' : 'Light Mode';
    theme === DARK_MODE ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imageMode(theme);
}

// Switch Theme
function switchTheme(event) {
    // Enable dark mode if toggle is checked
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', DARK_MODE);
        localStorage.setItem('theme', DARK_MODE);
        toggleLightDarkTheme(DARK_MODE);
    } else {
        document.documentElement.setAttribute('data-theme', LIGHT_MODE);
        localStorage.setItem('theme', LIGHT_MODE);
        toggleLightDarkTheme(LIGHT_MODE);
    }
};

// Event Listeners
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === DARK_MODE) {
        toggleSwitch.checked = true;
        toggleLightDarkTheme(DARK_MODE);
    } else {
        toggleSwitch.checked = false;
        toggleLightDarkTheme(LIGHT_MODE);
    }
}