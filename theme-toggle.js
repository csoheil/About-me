

const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Load user preference
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
}

// Switch theme
toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});
