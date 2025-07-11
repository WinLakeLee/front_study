const btns = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

// for(let [index,i] of btns.entries()) {
//   i.addEventListener('click', () => {
//     clean();
//     i.classList.add('selected');
//     contents[index].classList.add('show');
//   });
// }

// const clean = () => {
//       btns.forEach((e)=> {
//       e.classList.remove('selected');
//     });
//     contents.forEach((e)=> {
//       e.classList.remove('show');
//     });
// }

btns.forEach((e, index) => {
  e.addEventListener('click', () => {
    btns.forEach((e)=> {
      e.classList.remove('selected');
    });
    contents.forEach((e)=> {
      e.classList.remove('show');
    });
    e.classList.add('selected');
    contents[index].classList.add('show');
  });
});

// const btns = $('.tab-button');
// const contents = $('.tab-content');

// btns.click((e) => {
//   btns.removeClass('selected');
//   contents.removeClass('show');
//   let no = e.target.dataset.no;
//   btns.eq(no).addClass('selected');
//   contents.eq(no).addClass('show');
// });