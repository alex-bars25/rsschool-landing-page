import products from './products.json' with { type: 'json' };

//theme change
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

//create product cards
function createCard(product) {
  let card = document.createElement('div');
  card.id = product.id;
  card.className = `card ${themeName}`
  card.innerHTML = `
  <div class="card-image">
    <img src=${product.pathToImg} alt=${product.category}>
  </div>
  <div class="card-info ${themeName}">
    <div class="description">
      <p class="title">${product.name}</p>
      <p class="text">${product.description}</p>  
    </div>
    <p class="price">$${product.price}</p>
  </div>
  `;
  return card;
}

const cards = document.querySelector('.cards-container');

function drawCards(tabIndex) {
  cards.innerHTML = '';
  if (tabIndex == 0) {
    products
      .filter(item => item.category == 'coffee')
      .forEach(item => cards.appendChild(createCard(item)));
  }
  if (tabIndex == 1) {
    products
      .filter(item => item.category == 'tea')
      .forEach(item => cards.appendChild(createCard(item)));
  }
  if (tabIndex == 2) {
    products
      .filter(item => item.category == 'dessert')
      .forEach(item => cards.appendChild(createCard(item)));
  }

}

drawCards(0);

const tabs = document.querySelectorAll('.tab-item');

tabs.forEach((item, index) => item.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  item.classList.add('active');
  drawCards(index);
}));