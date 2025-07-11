let openbtn =  document.querySelector('#open');
let modal = document.querySelector('.black-bg');
let closebtn=document.querySelector('.white-bg > button');

openbtn.addEventListener('click', () => {
  modal.classList.add('show'),
  openbtn.classList.add('no-show');
});
closebtn.addEventListener('click', () => {
  modal.classList.remove('show'),
  openbtn.classList.remove('no-show');
});

// $('#open').click(() => {
//   $('.black-bg').fadeIn();
//   $('#open').fadeOut();
// });

// $('.white-bg > button').click(() => {
//   $('.black-bg').fadeOut();
//   $('#open').fadeIn();
// });

