import Notiflix from 'notiflix';

const delayInput = document.querySelector("input[name='delay']");
const stepInput = document.querySelector("input[name='step']");
const amountInput = document.querySelector("input[name='amount']");
const btn = document.querySelector('button');

btn.addEventListener('click', e => {
  e.preventDefault();
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  let newDelay = delay;
  for (let i = 0; i < amount; i += 1) {
    if (i > 0) {
      newDelay += step;
    }

    createPromise(i + 1, newDelay);
  }
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}


