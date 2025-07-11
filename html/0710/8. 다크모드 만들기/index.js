let isDark = false;
const body = document.body;
document.querySelector('input').addEventListener('click', () => {
  isDark == false ? (
    body.style.background='black',
    body.style.color='white',
    isDark = !isDark,
    document.querySelector('input[type="button"]').value='라이트모드')
  : (body.style.background='white',
    body.style.color='black',
    isDark = !isDark,
    document.querySelector('input[type="button"]').value='  다크모드  ')
});