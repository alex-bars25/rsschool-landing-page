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

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    hideMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hideMenu();
  }
});

// slider
const slide = document.querySelector('.slide');
const controls = document.querySelectorAll('.control');
const progress = document.createElement('span');
progress.className = 'progress dark';
const card = document.querySelector('.card_1');
const prevSlide = document.querySelector('.left');
const nextSlide = document.querySelector('.right');
let autoplay = true;
let index = 0;

prevSlide.addEventListener('click', () => prev());
nextSlide.addEventListener('click', () => next());
progress.addEventListener('animationend', () => next());

function move(index) {
  if (index == 0) {
    card.style.marginLeft = '0';
  }
  if (index == 1) {
    card.style.marginLeft = '-100%';
  }
  if (index == 2) {
    card.style.marginLeft = '-200%';
  }
  controls[index].appendChild(progress);
}

function next() {
  if (index == 2) {
    index = 0;
  } else {
    index++;
  }
  move(index);
}

function prev() {
  if (index == 0) {
    index = 2;
  } else {
    index--;
  }
  move(index);
}

move(index);

slide.addEventListener('mouseenter', () => progress.style.animationPlayState = 'paused');
slide.addEventListener('touchstart', () => progress.style.animationPlayState = 'paused');
slide.addEventListener('mouseleave', () => progress.style.animationPlayState = 'running');
slide.addEventListener('touchend', () => progress.style.animationPlayState = 'running');

// swipe
let touchX = 0;
let startX = 0;
let swipeLeft = false;
let swipeRight = false;

function getX(e) {
  touchX = e.touches[0].pageX;
}

slide.addEventListener('touchstart', (e) => {
  getX(e);
  startX = touchX;
});

slide.addEventListener('touchmove', (e) => {
  getX(e);
  let diffX = touchX - startX;
  if (diffX > 0) {
    swipeLeft = true;
  } else {
    swipeRight = true;
  };
});

slide.addEventListener('touchend', () => {
  if (swipeLeft) {
    prev();
  }
  if (swipeRight) {
    next();
  }
  swipeLeft = false;
  swipeRight = false;
});
