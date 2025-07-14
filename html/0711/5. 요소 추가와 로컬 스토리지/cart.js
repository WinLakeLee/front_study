let cart = JSON.parse(localStorage.getItem('cart'));
const cartList = document.querySelector('.list');

cart.forEach( (item) => {
  let val =  item.value;
  cartList.insertAdjacentHTML('beforeend', `<div>${JSON.stringify(item.name + "은(는) " + item.cnt + "개")}</div>`)
});