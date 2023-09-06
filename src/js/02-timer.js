import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const btn = document.querySelector('button[data-start]');
const selector = document.querySelector('#datetime-picker');
let timeId = null;
let selectedDate;
btn.setAttribute('disabled', '');
console.log(flatpickr);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future !');
    
    }
    if (selectedDates[0] >= new Date()) {
        btn.removeAttribute('disabled', '');
    selectedDate = selectedDates[0];
        
    }
    console.log(selectedDates[0]);
  },
};
flatpickr(selector, options);

btn.addEventListener(
  'click',
  () => {
    timeId = setInterval(() => {
      const currentTime = new Date();
      const ms = selectedDate.getTime() - currentTime.getTime();
      elements.days.textContent = addLeadingZero(convertMs(ms).days);
      elements.hours.textContent = addLeadingZero(convertMs(ms).hours);
      elements.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
        elements.seconds.textContent = addLeadingZero(convertMs(ms).seconds);
        
        console.log(ms)

      if (ms <= 1000) {
        clearInterval(timeId);
      }
    });
  },
  1000
);

function addLeadingZero(value) {
  return value.toString().padStart(2, [0]);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

