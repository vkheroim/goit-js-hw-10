import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Прослуховування події завантаження DOM
document.addEventListener('DOMContentLoaded', function () {
  // Отримання посилання на форму
  const form = document.querySelector('form');

  if (form) {
    // Додавання обробника події submit до форми
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Отримання значення затримки та стану форми
      const delay = parseInt(this.elements.delay.value, 10);
      const state = form.querySelector('input[name="state"]:checked').value;

      // Створення об'єкту Promise
      const promise = new Promise((resolve, reject) => {
        // Затримка виконання функції
        setTimeout(() => {
          state === 'fulfilled' ? resolve(delay) : reject(delay);
        }, delay);
      });

      promise.then(
        // Обробка успішного виконання Promise
        delay =>
          showSnackbar(
            'Success!',
            `✅ Fulfilled promise in ${delay}ms`,
            '#59A10D'
          ),
        // Обробка невдалого виконання Promise
        delay =>
          showSnackbar('Error!', `❌ Rejected promise in ${delay}ms`, '#EF4040')
      );
    });
  }

  // Функція для відображення сповіщення
  function showSnackbar(title, message, backgroundColor) {
    const toastOptions = {
      title: title,
      message: message,
      backgroundColor: backgroundColor,
    };

    // Виведення сповіщення
    if (title === 'Success') {
      iziToast.success(toastOptions);
    } else if (title === 'Error') {
      iziToast.error(toastOptions);
    }
  }
});
