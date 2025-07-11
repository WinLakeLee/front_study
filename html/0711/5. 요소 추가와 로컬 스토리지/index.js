const FRUITS = [
  { name: 'apple', memo: '사과' },
  { name: 'mango', memo: '망고' },
  { name: 'melon', memo: '메론' },
  { name: 'strawberry', memo: '딸기' },
  { name: 'watermelon', memo: '수박' }
];
let count;

let container = document.querySelector('.container m-4');

for (let i in FRUITS) {
  let card = `
    <div class="col">
      <div class="card" style="width: 18rem;">
        <img src="./images/${FRUITS[i].name}.jpg" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${FRUITS[i].name}</h5>
        <p class="card-text">${FRUITS[i].memo}</p>
        <button class="btn btn-primary cart">담기</button>
      </div>
    </div>
  `;
  // beforebegin : 해당요소 앞에 html 추가
  // afterbegin : 해당요소 첫번째 자식으로 추가
  // beforeend : 해당요소 앞에 html 추가
  // afterend : 해당요소 앞에 html 추가
  document.querySelector('.row').insertAdjacentHTML('beforeend', card);
};

const cart = document.querySelectorAll('.cart');
cart.forEach((e) => {
  e.addEventListener('click', (e) => {
    let nameTag = e.target.previousElementSibling.previousElementSibling;
    let name = nameTag.innerHTML;
    
    let temp = localStorage.getItem('cart');
    if(temp!=null) {
      temp = JSON.parse(temp);
      temp.push(name);
      localStorage.setItem('cart', JSON.stringify(temp));
    } else {
      localStorage.setItem('cart', JSON.stringify([name]));
    }
  });
});














// FRUITS.forEach((data, index) => {
//   let card =`
//   <div class="col">
//     <div class="card" style="width: 18rem;">
//       <img src="./images/${data.name}.jpg" class="card-img-top">
//       <div class="card-body">
//       <h5 class="card-title">${data.name}</h5>
//       <p class="card-text">${data.memo}</p>
//       <button class="btn btn-primary">담기</button>
//     </div>
//   </div>
//   `;
//   document.querySelector('.row').insertAdjacentHTML('beforeend', card);
// })

// 로컬 스토리지에 저장 or 수정 (동일한 키를 넣으면 기존 데이터를 지움)
localStorage.setItem('키', '값');
// 로컬 스토리지에서 해당 키에 대한 값을 리턴해줌
localStorage.getItem('키');
// 로컬 스토리지에서 해당 키를 삭제
localStorage.removeItem('키');

let arr = [1, 2, 3, 4, 5];
let obj = {
  name: 'kim',
  age: 20
};

// JSON형식으로 변환
localStorage.setItem('arr', JSON.stringify(arr));
// 문자열 < 배열 변환
// JSON.parse(obj);