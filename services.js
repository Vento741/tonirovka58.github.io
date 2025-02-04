// Бургер-меню
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

// Открытие/закрытие меню при клике на бургер
burger.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  e.preventDefault();
  isMenuOpen = !isMenuOpen;
  navLinks.classList.toggle('active');
});

// Предотвращаем закрытие при клике по меню
navLinks.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  // Закрываем меню только при клике на ссылку
  if (e.target.tagName === 'A') {
    setTimeout(() => {
      isMenuOpen = false;
      navLinks.classList.remove('active');
    }, 100);
  }
});

// Закрытие меню при клике вне его
document.addEventListener('mousedown', (e) => {
  if (isMenuOpen && !burger.contains(e.target) && !navLinks.contains(e.target)) {
    isMenuOpen = false;
    navLinks.classList.remove('active');
  }
});

// Callback Widget Functionality
document.addEventListener('DOMContentLoaded', () => {
    const callbackWidget = document.getElementById('callbackWidget');
    const callbackButton = callbackWidget.querySelector('.callback-button');
    const closeCallback = document.getElementById('closeCallback');
    const callbackForm = document.getElementById('callbackForm');
    const callbackPopup = callbackWidget.querySelector('.callback-popup');
    let isWidgetOpen = false;

    // Toggle callback popup
    callbackButton.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        e.preventDefault();
        isWidgetOpen = !isWidgetOpen;
        callbackWidget.classList.toggle('active');
    });

    // Предотвращаем закрытие при клике внутри виджета
    callbackPopup.addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });

    // Предотвращаем закрытие при взаимодействии с формой
    callbackForm.addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });

    // Предотвращаем закрытие при взаимодействии с полями ввода
    const formInputs = callbackForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        ['mousedown', 'focus', 'click', 'change'].forEach(eventType => {
            input.addEventListener(eventType, (e) => {
                e.stopPropagation();
            });
        });
    });

    // Close callback popup только по кнопке закрытия
    closeCallback.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        e.preventDefault();
        isWidgetOpen = false;
        callbackWidget.classList.remove('active');
    });

    // Close popup when clicking outside
    document.addEventListener('mousedown', (e) => {
        const isClickInsideWidget = e.target.closest('.callback-widget');
        if (isWidgetOpen && !isClickInsideWidget) {
            isWidgetOpen = false;
            callbackWidget.classList.remove('active');
        }
    });

    // Handle form submission
    callbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const formData = new FormData(callbackForm);
        const data = Object.fromEntries(formData.entries());
        
        const submitButton = callbackForm.querySelector('.callback-submit');
        const originalContent = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-check"></i> Заявка отправлена';
        submitButton.style.background = '#28a745';
        
        setTimeout(() => {
            callbackForm.reset();
            submitButton.innerHTML = originalContent;
            submitButton.style.background = '';
            isWidgetOpen = false;
            callbackWidget.classList.remove('active');
        }, 2000);
    });
});

// Обработка формы записи
document.addEventListener('DOMContentLoaded', () => {
  const appointmentForm = document.getElementById('appointment-form');
  const dateInput = appointmentForm.querySelector('input[type="date"]');

  // Устанавливаем минимальную дату как сегодня
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  // Добавляем плейсхолдер для мобильных устройств
  if (window.innerWidth <= 768) {
    dateInput.addEventListener('focus', function() {
      if (!this.value) {
        this.type = 'date';
      }
    });
  }

  appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    this.reset();
  });
}); 