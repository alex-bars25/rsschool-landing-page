// theme switch
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
let themeName = localStorage.getItem('theme') || 'light';
let themeElements = document.querySelectorAll('.dark');

function changeTheme(theme) {
  localStorage.setItem('theme', theme);
  themeName = theme;
  if (theme == 'light') {
    themeElements = document.querySelectorAll('.dark');
    sun.classList.add('disabled');
    moon.classList.remove('disabled');
    themeElements.forEach(item => item.classList.replace('dark', 'light'));
  } else {
    themeElements = document.querySelectorAll('.light');
    moon.classList.add('disabled');
    sun.classList.remove('disabled');
    themeElements.forEach(item => item.classList.replace('light', 'dark'));
  }  
}

changeTheme(themeName);

sun.addEventListener('click', () => {
  changeTheme('light');
});

moon.addEventListener('click', () => {
  changeTheme('dark');
});

// burger
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const menu = document.querySelector('.menu');
const navLink = document.querySelectorAll('.nav a');

const showMenu = () => {
  burger.classList.add('open');
  menu.classList.add('open');
  menu.classList.remove('hidden');
  navigation.classList.add('open');
  navigation.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

const hideMenu = () => {
  burger.classList.remove('open');
  menu.classList.remove('open');
  menu.classList.add('hidden');
  navigation.classList.remove('open');
  navigation.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

burger.addEventListener('click', () => {
  if (burger.classList.contains('open')) {
    hideMenu();
  } else {
    showMenu();
  } 
});

document.addEventListener('click', (e) => {
  let target = e.target;
  if (target == navLink[0] || target == navLink[1] || target == navLink[2] || target == navLink[3] || target == navLink[4]) {
    hideMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hideMenu();
  }
});