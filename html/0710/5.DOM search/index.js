// const box=document.getElementById('box');
// box.style.background='red';

const box2=document.querySelector('#box');
box2.style.background='red';

// const bg=document.querySelector('.bg');
// bg.style.background='pink';

const bg=document.querySelectorAll('.bg');
// bg[0].style.background='pinl';
// bg[1].style.background='pink';

for(let i in bg) {
  bg[i].style.background='pink';
}

for(let b of bg) {
  b.style.background='pink';
}

const li=document.querySelectorAll('ul > li');
for(let l of li) {
  l.innerHTML='ㅋㅋㅋ';
}