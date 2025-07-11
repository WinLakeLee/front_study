let cart = JSON.parse(localStorage.getItem('cart'));
const cartList = document.querySelector('.list');
cart.forEach((e) => {
  let fruits = `
    <p>${e}</p>
  `
  cartList.insertAdjacentHTML('beforeend', fruits);
});