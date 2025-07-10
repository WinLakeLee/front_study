//  객체(Object) - 자바에서 Map과 유사
//  key, value 한 쌍으로 구성
let user = {
  name: '호날두',
  age: 40,
  'math score': 100
}

console.log(user.name);
console.log(user.age);
console.log(user['age']);
console.log(user["math score"]);

const member = {
  name : '홍길동',
  age : 20
}
console.log(user);
user = 10;
console.log(user);

// 당연히 상수니까 변경을 못함
// member=10;

// 상수지만 구조는 변경하지 않는 내용 수정은 가능
member.name="김자바";
console.log(member);

// 보고 싶은 key의 이름 입력
let key="name";
console.log(member[key]); // user["name"]

let item="사과";
let cart={
  [item]: 5
};
console.log(cart);


function makeUserObject(name,age) {
  let obj={
    name, // key의 이름과 value의 매개변수 이름이 동일하면 생략 가능
    age
  };
  return obj;
};

let a=makeUserObject('홍길동',20);
let b=makeUserObject('김자바',11);
console.log(a,b);

a.addr = "강동구";
console.log(a);
// 삭제하기
delete a.addr;
console.log(a);
// 구조분해 할당
// {name:'김자바',age:20};
let {age, ...r} = a;

console.log(age);
console.log(r);

console.log({...r, age:30});

// in 연산자로 key 존재유무
console.log("name" in a);
console.log("ㅁㄴㅇ" in a);

for(let key in a) {
  console.log(`${key} : ${a[key]}`);
}