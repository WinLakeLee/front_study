const box = document.querySelector('.box')
const chk = document.querySelector('#chk')
const next = document.querySelector('button')

let boxY = box.scrollHeight
let boxHeight = box.clientHeight

box.addEventListener("scroll", () => {
  let scroll = box.scrollTop
  if (scroll >= (boxY - boxHeight)) {
    chk.disabled = false
  }
})

next.addEventListener('click', (e) => {
  let boo = chk.checked;
  !boo ? (e.preventDefault(), alert('동의하십쇼')) :
    (alert("다음 페이지로 이동합니다"),
      document.querySelector('.box:first-child').classList.add('hide'),
      document.querySelector('.box:nth-child("2")').classList.remove('hide')
    );
})