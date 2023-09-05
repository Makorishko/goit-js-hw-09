const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timeId = null;

btnStart.addEventListener('click', () => {
    timeId = setInterval(changeColor, 1000);
    btnStart.setAttribute('disabled', '');
    btnStop.removeAttribute('disabled', '');
    
});

function changeColor(event) {
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
    
};

btnStop.addEventListener('click', () => { clearInterval(timeId); btnStart.removeAttribute('disabled', ''); btnStop.setAttribute('disabled', '') });


function getRandomHexColor() {

  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};






