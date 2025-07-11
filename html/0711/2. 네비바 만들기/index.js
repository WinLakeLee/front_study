let btn=document.querySelector('.navbar-toggler');
let list=document.querySelector('.list-group');
// let nav_state=true;

btn.addEventListener('click',()=>{
  // nav_state!=false?(
  // list.classList.add('show'),
  // nav_state=!nav_state):(
  // list.classList.remove('show'),
  // nav_state=!nav_state);
  list.classList.toggle('show');
});

let list_item=document.querySelectorAll('.list-group-item');

for(let item of list_item) {
  item.addEventListener('click',()=>{
    alert('ㅋㅋㅋ');
  });
}