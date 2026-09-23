const dark = document.querySelectorAll('.dark');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const theme = localStorage.getItem('theme');

if (!theme || theme == 'light') {
  console.log('light');
  sun.classList.add('disabled');
  moon.classList.remove('disabled');
  dark.forEach(item => item.classList.remove('dark'));
} else {
  console.log('dark');  
  moon.classList.add('disabled');
  sun.classList.remove('disabled');
  dark.forEach(item => item.classList.add('dark'));
}

sun.addEventListener('click', () => {
  sun.classList.add('disabled');
  moon.classList.remove('disabled');
  dark.forEach(item => item.classList.remove('dark'));
  localStorage.setItem('theme', 'light')
})

moon.addEventListener('click', () => {
  moon.classList.add('disabled');
  sun.classList.remove('disabled');
  dark.forEach(item => item.classList.add('dark'));
  localStorage.setItem('theme', 'dark')
})