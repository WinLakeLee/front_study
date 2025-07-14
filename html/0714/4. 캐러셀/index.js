const btns = document.querySelectorAll('span > button');
const div = document.querySelectorAll('.box');
const carousel = document.querySelector('.carousel');
const funcbtn = document.querySelectorAll('button');
let index = 0;

btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    index = i;
    translate(i);
  });
});

const translate = (i) => {
  carousel.style.transform = `translateX(-${100 * i}vw)`;
}

let pre = document.querySelector('.pre');
let next = document.querySelector('.next');

pre.addEventListener('click', () => {
  if (index != 0)
    translate(--index);
  else {
    index = btns.length - 1;
    translate(index);
  }
});

next.addEventListener('click', () => {
  nextpage();
});

const nextpage = () => {
  if (index != btns.length - 1)
    translate(++index);
  else {
    index = 0;
    translate(index);
  }
}

const autopage = () => {
  setInterval(() => {
    nextpage();
  }, 5000);
}

window.onload = () => {
  autopage();
}
