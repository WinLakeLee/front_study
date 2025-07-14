const item = document.querySelector('.alert');

let i = 5;
const interval = setInterval(() => {
  item.innerHTML = (--i + "초안에 구매하면 공짜임")
}, 1000);
setTimeout(() => {
  clearInterval(interval);
  item.innerHTML = "";
}, 5000);

// setInterval(() => {
//   console.log('2초마다 실행되는 코드');
// }, 2000);

let timer;

document.querySelector('.btn').addEventListener('click', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('3초뒤 나타남')
  }, 3000);
});

const day = ['일', '월', '화', '수', '목', '금', '토'];

const clock = document.querySelector('.clock');

let clocktimer = () => {
  const date = new Date();
  clock.innerHTML = `${date.getFullYear()}년 ${(date.getMonth() + 1)}월 ${date.getDate()}일 ${day[date.getDay()]}요일 ${String(date.getHours()).padStart(2, "0")}시 ${String(date.getMinutes()).padStart(2, "0")}분 ${String(date.getSeconds()).padStart(2, "0")}초`;
}
clocktimer();
setInterval(() => {
  clocktimer();
}, 1000);

