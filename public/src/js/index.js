console.log('index.js');

let time = document.querySelector('.match-venue--time').innerHTML;
let editedTime = time.substr(0, time.indexOf(':00 GMT+'));

console.log(editedTime);

document.querySelector('.match-venue--time').textContent = editedTime;
