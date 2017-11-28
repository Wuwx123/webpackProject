const config = require('./config.json');

let greet = document.createElement('div');
greet.textContent = config.greetText;
document.querySelector('#root').appendChild(greet);