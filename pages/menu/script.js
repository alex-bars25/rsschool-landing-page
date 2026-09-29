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
    closeModal();
  }
});

//create product cards
let screenWidth = window.innerWidth;
const tabs = document.querySelectorAll('.tab-item');
let tabIndex = 0;
const load = document.querySelector('.load');

tabs.forEach((item, index) => item.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  item.classList.add('active');
  tabIndex = index;
  drawCards(tabIndex, screenWidth);
}));

const cards = document.querySelector('.cards-container');

function createCard(product) {
  let card = document.createElement('div');
  card.className  = `card ${themeName}`;
  card.id = product.id;
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

function drawCards(tabIndex, screenWidth) {
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
  if (cards.childElementCount > 4 && screenWidth <= 768) {
    cards.childNodes.forEach((item, index) => {
      if (index > 3) {
        item.classList.add('hidden');
      }
    });
    load.classList.remove('hidden');
  } else {
    cards.childNodes.forEach((item) => {
      item.classList.remove('hidden');
    });
    load.classList.add('hidden');  
  }
}

drawCards(tabIndex, screenWidth);

load.addEventListener('click', () => {
  cards.childNodes.forEach((item) => {
    item.classList.remove('hidden');
  });
  load.classList.add('hidden');
});

window.addEventListener("resize", () => {
  if (window.innerWidth != screenWidth) {
    screenWidth = window.innerWidth;
    drawCards(tabIndex, screenWidth);
    if (screenWidth > 768) {
      hideMenu();
    }
  }
});

// modal
const overlay = document.querySelector('.overlay');
const main = document.querySelector('.main');
let currentModal;
let sizes;
let startPrice;
let price;
let sizePrice = 0;
let additivePrice = 0;
let currentPrice = 0;

function createModal(id) {
  let modal = document.createElement('div');
  modal.innerHTML = '';
  let product = products.find(item => item.id == id);
  modal.className = `modal-window ${themeName}`;
  modal.classList.add('show', 'fade-in');
  modal.innerHTML = `
  <div class="modal-img">
    <img src=${product.pathToImg} alt=${product.category}>
  </div>
  <div class="modal-content ${themeName}">
    <div class="modal-heading">
      <div class="modal-title">${product.name}</div>
      <div class="modal-description">${product.description}</div>
    </div>
    <div class="modal-select sizes">
      <span class="select-text">Size</span>
      <div class="modal-tabs">
        <div id="1" class="modal-tab-item ${themeName} size active">
          <span class="icon">S</span>
          <span class="tab-text">${product.sizes.s.size}</span>  
        </div>
        <div id="2" class="modal-tab-item ${themeName} size">
          <span class="icon">M</span>
          <span class="tab-text">${product.sizes.m.size}</span>  
        </div>
        <div id="3" class="modal-tab-item ${themeName} size">
          <span class="icon">L</span>
          <span class="tab-text">${product.sizes.l.size}</span>  
        </div>
      </div>
    </div>
    <div class="modal-select additives">
      <span class="select-text">Additives</span>
      <div class="modal-tabs">
        <div class="modal-tab-item ${themeName} additive">
          <span class="icon">1</span>
          <span class="tab-text">${product.additives[0].name}</span>  
        </div>
        <div class="modal-tab-item ${themeName} additive">
          <span class="icon">2</span>
          <span class="tab-text">${product.additives[1].name}</span>  
        </div>
        <div class="modal-tab-item ${themeName} additive">
          <span class="icon">3</span>
          <span class="tab-text">${product.additives[2].name}</span>  
        </div>
      </div>
    </div>
    <div class="total">
      <span>Total:</span>
      <span class="modal-price">$${product.price}</span>
    </div>
    <div class="alert ${themeName}">
      <img src="../../assets/icons/info-empty.svg" alt="info" width="16" height="16 class="info-light">
      <img src="../../assets/icons/info-empty-dark.svg" alt="info" width="16" height="16" class="info-dark">
      <div class="alert-text">
        The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
      </div>
    </div>
    <div class="close-button ${themeName}">Close</div>
  `;
  main.appendChild(modal);
  currentModal = modal;
  sizes = document.querySelectorAll('.size');
  startPrice = Number(product.price);
  price = document.querySelector('.modal-price');
}

function openModal() {
  overlay.classList.add('show', 'fade-in');
  currentModal.classList.add('show', 'fade-in');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('show', 'fade-in');
  currentModal.classList.remove('show', 'fade-in');
  document.body.style.overflow = 'auto';
  sizes.forEach(item => item.remove());
  currentModal.remove();
}

document.addEventListener('click', (e) => {
  let card = e.target.closest('.card');
  let close = e.target.closest('.close-button');
  let size = e.target.closest('.size');
  let additive = e.target.closest('.additive');
  if (card) {
    sizePrice = 0;
    additivePrice = 0;
    createModal(card.id);
    openModal();
  }
  if (e.target === overlay) {
    closeModal();
  }
  if (close) {
    closeModal();
  }
  if (size) {
    sizes.forEach(item => item.classList.remove('active'));
    size.classList.add('active');
    switch (size.id) {
      case '2':
        sizePrice = 0.50;
        break;
      case '3':
        sizePrice = 1.00;
        break;
      default:
        sizePrice = 0;
        break;
    }
  }
  if (additive) {
    additive.classList.toggle('active');
    let count = document.querySelector('.additives').querySelectorAll('.active').length;
    switch (count) {
      case 1:
        additivePrice = 0.50;
        break;
      case 2:
        additivePrice = 1.00;
        break;
      case 3:
        additivePrice = 1.50;
        break;
      default:
        additivePrice = 0;
        break;
    }
  }
  currentPrice = startPrice + sizePrice + additivePrice;
  if (price) {
    price.innerHTML = `$${currentPrice.toFixed(2)}`;
  }
});

