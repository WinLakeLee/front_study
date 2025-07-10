function showMsg() {
  let msg='하이';
  console.log(msg)
}

// const showMsg=()=>{
//   let msg='하이';
//   console.log(msg)
// };
showMsg();

let name='홍길동';
function showInfo() {
  let name="고길동";
  let msg=`안녕하세요 ${name}님`;
  console.log(msg);
}
console.log(name);
showInfo();
console.log(name);

// 매개변수와 리턴
function sum(x,y) {
  console.log(x+y);
}
sum(10,5);

function sum2(x,y){
  return x+y;
}
console.log(sum2(10,5));

