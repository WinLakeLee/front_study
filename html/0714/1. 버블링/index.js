// 태그에 이벤트 발생되면 최상단 부모까지 전달 됨
document.querySelector('.container').addEventListener('click', (e) => {
  console.log(e.target);
});
document.querySelector('b').addEventListener('click', (e) => {
  // 버블링 막기
  e.stopPropagation();
  alert('b태그 클릭');
});
document.querySelector('p').addEventListener('click', (e) => {
  console.log(e.target);
});

