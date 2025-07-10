const btn = document.querySelector('.btn');

// f.addEventListener('click', () => {
// });

// f.removeEventListener('click', () => {
// });

btn.addEventListener('click', () => {
  alert('zzzz');
});

btn.removeEventListener('click', () => {
  alert('zzzz');
})

function handler() {
  alert('이건 지울 수 있음');
}
btn.addEventListener('click', handler);
btn.removeEventListener('click', handler);

const btn2 = document.querySelector('.btn2');

// 이벤트 객체 : 이벤트 발생 시 생기는 모든 정보 가지고 있음
btn2.addEventListener('click', (e) => {
  console.log(e.type);
  console.log(e.clientX);
  console.log(e.target);
}, true);