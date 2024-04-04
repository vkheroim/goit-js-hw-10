import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  // Вибір форми
  const form = document.querySelector('form');

  if (form) {
    // Додавання обробника події submit до форми
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const delay = parseInt(this.elements.delay.value, 10);
      const state = form.querySelector('input[name="state"]:checked').value;

      const promise = new Promise((resolve, reject) => {
        // Затримка виконання
        setTimeout(() => {
          state === 'fulfilled' ? resolve(delay) : reject(delay);
        }, delay);
      });

      promise
        .then(delay => {
          // Виклик функції показу Snackbar
          showSnackbar(
            'Success',
            `✅ Fulfilled promise in ${delay}ms`,
            '#59A10D'
          );
        })
        .catch(delay => {
          // Виклик функції показу Snackbar
          showSnackbar('Error', `❌ Rejected promise in ${delay}ms`, '#EF4040');
        });
    });
  }

  // Функція для показу Snackbar
  function showSnackbar(title, message, backgroundColor) {
    const toastOptions = {
      title: title,
      message: message,
      backgroundColor: backgroundColor,
    };

    // Визивання функції залежно від заголовку
    if (title === 'Success') {
      iziToast.success(toastOptions);
    } else if (title === 'Error') {
      iziToast.error(toastOptions);
    }
  }
});
