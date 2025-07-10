let user={
  name:'홍길동',
  age:20
}
user.hi=()=>{
console.log('hi');
};
user.hi();
function h2() {
  console.log('h2')
}
user.h2=h2;
user.h2();

let user2={
  name:'김자바',
  age:20,
  hi:function () {
    console.log(this.name);
  }
}

let member=user2;
member.hi();
user2=null;
member.hi();

user={name:'홍길동'};
user2={name:'김자바'};
function show() {
  console.log(this.name);
}
user.f=show;
user2.f=show;
user.f();
user2.f();

// 객체 참조
let a={name:'홍길동'};
let b=a;
a.name="김자바";
console.log(b.name);

// 배열
let arr=[1,2,3,4];

arr[0]=20;
arr[1]="a";

arr.push("zzzz");
console.log(arr);

arr.pop();
console.log(arr);