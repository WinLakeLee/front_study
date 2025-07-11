// const btns = document.querySelectorAll('.tab-button');
// const contents = document.querySelectorAll('.tab-content');

// for(let [index,i] of btns.entries()) {
//   i.addEventListener('click', () => {
//     btns.forEach((e)=> {
//       e.classList.remove('selected');
//     });
//     contents.forEach((e)=> {
//       e.classList.remove('show');
//     });
//     i.classList.add('selected');
//     contents[index].classList.add('show');
//   });
// }

// btns.forEach((e, index) => {
//   e.addEventListener('click', () => {
//     btns.forEach((e)=> {
//       e.classList.remove('selected');
//     });
//     contents.forEach((e)=> {
//       e.classList.remove('show');
//     });
//     e.classList.add('selected');
//     contents[index].classList.add('show');
//   });
// });

const btns = $('.tab-button');
const contents = $('.tab-content');

btns.click(() => {
  btns.removeClass('selected');
  btns.removeClass('show');
  $(this).addClass('selected')
});