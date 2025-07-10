// 함수 선언문
function hello() {
  console.log('안녕');
}
// 함수 표현식
let hi=function(){
}
// 콜백 함수
function yes() {
  console.log('예');
}
let no = function() {
  console.log('아니오');
}
function check(question,ok,cancel) {
  question === 'y'? ok() : cancel();
}

check('y', yes, no);

function buy(item,price,stock,callback) {
  console.log(`${item}을(를) ${stock}개 구매함`);
  let total=price*stock;
  callback(total);
}
function pay(n) {
  console.log(`총 금액 : ${n}`);
}
function pay2(n) {
  console.log(`총 금액(할인적용) : ${n*0.9}`);
}
let 할인적용여부 = 'y';

if(할인적용여부 === 'y') {
  buy('컴퓨터',100,2,pay2);
}else{
  buy('컴퓨터',100,2,pay);
}

setInterval(() => {
  console.log('hi');
}, 2000);