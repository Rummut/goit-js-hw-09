import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

// const delay = setTimeout(() => { setInterval(() => { }, inputStep) }, inputDelay)

function createPromise(position, delay) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', submitOn);

function submitOn(e) {
  e.preventDefault();

  const inputStep = Number(formEl.elements.step.value);
  let inputDelay = Number(formEl.elements.delay.value);
  const inputAmount = Number(formEl.elements.amount.value);

  for (let i = 1; i <= inputAmount; i++) {
    inputDelay += inputStep;
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
