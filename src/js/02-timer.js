import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDateEl = document.querySelector('#datetime-picker');

const startBtnEl = document.querySelector('button[data-start]');

const dataDaysEl = document.querySelector('span[data-days]');

const dataHoursEl = document.querySelector('span[data-hours]');

const dataMinutesEl = document.querySelector('span[data-minutes]');

const dataSecondsEl = document.querySelector('span[data-seconds]');

startBtnEl.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //add alarm if date doesn't fit
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      startBtnEl.setAttribute('disabled', '');
    } else {
      startBtnEl.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('input#datetime-picker', options);

//add click to start timer
startBtnEl.addEventListener('click', handleTimeIsUp);

function handleTimeIsUp() {
  setInterval(updateTime, 1000);
  startBtnEl.setAttribute('disabled', '');
}

function updateTime() {
  const selectDate = new Date(inputDateEl.value);
  const nowTime = new Date();
  if (selectDate <= nowTime) {
    return;
  } else {
    const timeDifferent = selectDate - nowTime;
    const { days, hours, minutes, seconds } = convertMs(timeDifferent);
    updateClockFace(convertMs(timeDifferent));
  }
}

function updateClockFace({ days, hours, minutes, seconds }) {
  dataDaysEl.textContent = `${days}`;
  dataHoursEl.textContent = `${hours}`;
  dataMinutesEl.textContent = `${minutes}`;
  dataSecondsEl.textContent = `${seconds}`;
}
//calculate sc
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
//add zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
