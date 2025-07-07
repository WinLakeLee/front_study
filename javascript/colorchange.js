function random() {
  const colors = '0123456789ABCDEF';
  let color = '#';
  for(let i = 0; i < 6; i++) {
    color += colors[Math.floor(Math.random()*16)];
  }
  return color;
}
function colorChange() {
  document.body.style.color = random();
}
setInterval(colorChange,1500);
