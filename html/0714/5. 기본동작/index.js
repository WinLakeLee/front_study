document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();
});

document.querySelector('p').addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.querySelector('p').addEventListener('dragstart', (e) => {
  e.preventDefault();
});
document.querySelector('*').addEventListener('selectstart', (e) => {
  e.preventDefault();
});