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
