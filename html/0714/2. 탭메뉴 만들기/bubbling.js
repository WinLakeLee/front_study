const btns = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

document.querySelector('.list').addEventListener('click', (e) => {
  let no = e.target.dataset.no;
  clean();
  btns[no].classList.add('selected');
  contents[no].classList.add('show');
});

const clean = () => {
      btns.forEach((e)=> {
      e.classList.remove('selected');
    });
    contents.forEach((e)=> {
      e.classList.remove('show');
    });
}
