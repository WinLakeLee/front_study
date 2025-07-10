let theme = 'white';
const body = document.body;
document.querySelector('input').addEventListener('click', () => {
  if(theme == 'white') {
    body.style.background='black';
    body.style.color='white';
    theme = 'dark';
    document.querySelector('input[type="button"]').value='라이트모드';
  } else if (theme == 'dark') {
    body.style.background='white';
    body.style.color='black';
    theme = 'white';
    document.querySelector('input[type="button"]').value=' 다크모드 ';
  }
});