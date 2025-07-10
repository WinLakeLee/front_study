// 내용이 존재하면 true
let a=Boolean("0");
console.log(typeof a, a);

// 스페이스바도 문자이므로 true
a=Boolean("   ");
console.log(typeof a, a);

// 빈 문자열은 false
a=Boolean("");
console.log(typeof a, a);

// null, undefined, NaN...은 false
a=Boolean(null);
console.log(typeof a, a);
a=Boolean(undefined);
console.log(typeof a, a);
a=Boolean(NaN);
console.log(typeof a, a);

// 연산자 ( + , - , * , / , % , ** )
let x=y=z=10;

// 논리연산자 ( && , || , ! )

// 비트연산자 ( &, |, ~, ^, >>, << )

// 동등연산자 ( == )
// !=
num1=num2=10;
// console.log(10 == prompt("숫자를 입력하세요"));
console.log(false==0);
console.log(null==0);
console.log(""==0);

// === 연산자 : 일치연산자의 엄격버전 ( 자료형까지 구분 )
// !==
console.log(num1===num2);
console.log(false===0);
console.log(""===0);