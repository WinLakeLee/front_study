// alert("자바스크립트 파일 만듬");
console.log("엄준식");
document.write("write")

let msg='hello';
console.log(msg);
msg=20;
console.log(msg);

const COLOR='red';
// COLOR='blue';

let n = 12.345;

console.log(typeof(n))
console.log(typeof n)

console.log(n/0);
console.log(typeof (Infinity))
console.log("abc"/2)
console.log(typeof NaN)

let str1="abc";
let str2='abc';
let str3=`abc`;

let num=20;
let name="홍길동";

console.log(name+"님의 나이는 "+num+"살입니다.");
console.log(`${name}님의 나이는 ${num}살입니다.`);
console.log(typeof name);

let check=true;
console.log(10>=5);
console.log(typeof check);

let a=null;

let x;
console.log(x);

// alert('메세지 띄우기');

// 입력 칸, 확인 취소버튼 있음
// let result=prompt('메세지', 20);
// result++;
// console.log(result);

// 메세지 출력, 확인 취소

let re=confirm("메세지");
console.log(re);