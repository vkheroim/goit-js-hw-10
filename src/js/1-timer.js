// Імпорт необхідних бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Вибір елементів сторінки: календар, кнопка запуску
const calendarInput = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('.start-btn');

// Опції для Flatpickr календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelect(selectedDates);
  },
};

// Функція для вимкнення кнопки start
function disableStartButton() {
  startButton.disabled = true;
}

// Функція для увімкнення кнопки start
function enableStartButton() {
  startButton.disabled = false;
}

// Прослуховування події click на кнопці start
startButton.addEventListener('click', startTimer);

// ---------------------------------------------------------

// Ініціалізація Flatpickr з календарем та опціями
let userSelectedDate = flatpickr(calendarInput, options);

// Функція для обробки вибору дати
function handleDateSelect(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    disableStartButton();
    displayErrorMessage('Error!');
  } else {
    enableStartButton();
  }
}

// ID інтервалу для таймера
let intervalId;

// Логування вибраної дати в мілісекундах
console.log(userSelectedDate.selectedDates[0].getTime());

// --------------------------------------------------------

// Функція для запуску таймера
function startTimer() {
  clearInterval(intervalId);
  let currentDate = new Date();
  let ms = userSelectedDate.selectedDates[0] - currentDate;
  updateTimerDisplay(ms);

  intervalId = setInterval(() => {
    updateTimerDisplay(ms);

    if (ms <= 0) {
      clearInterval(intervalId);
      displaySuccessMessage('Success!');
    }

    ms -= 1000;
  }, 1000);
}

//----------------------------------------------------------

// Функція для відображення повідомлення про успіх
function displaySuccessMessage(message) {
  iziToast.success({
    title: 'Час вийшов!',
    message: message,
  });
}

// Функція для відображення повідомлення про помилку
function displayErrorMessage(message) {
  iziToast.error({
    title: 'Упс, щось пішло не так!',
    message: message,
  });
}

// Функція для конвертації мілісекунд у дні, години, хвилини та секунди
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для оновлення текстового вмісту елемента
function updateElementText(selector, value) {
  document.querySelector(selector).textContent =
    value >= 0 ? addLeadingZero(value) : '00';
}

// Функція для оновлення відображення таймера
function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  updateElementText('[data-days]', days);
  updateElementText('[data-hours]', hours);
  updateElementText('[data-minutes]', minutes);
  updateElementText('[data-seconds]', seconds);
}

// Функція для додавання ведучого нуля до однозначних значень
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Прослуховування події завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  disableStartButton();
});
