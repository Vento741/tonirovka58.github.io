// Бургер-меню
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

// Открытие/закрытие меню при клике на бургер
burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
}, { passive: true });

// Закрытие меню при клике на пункт меню
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('active');
  }
}, { passive: true });

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
}, { passive: true });

// Переворот карточек услуг на мобильных устройствах
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
  item.addEventListener('click', () => {
    // Проверяем, поддерживается ли hover
    const isHoverSupported = window.matchMedia('(hover: hover)').matches;
    
    if (!isHoverSupported) {
      // На мобильных устройствах добавляем/убираем класс для переворота
      item.classList.toggle('flipped');
      
      // Закрываем другие открытые карточки
      serviceItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('flipped')) {
          otherItem.classList.remove('flipped');
        }
      });
    }
    
    // Добавляем класс interacted при первом взаимодействии
    if (!item.classList.contains('interacted')) {
      item.classList.add('interacted');
      
      // Если это первая карточка, показываем подсказку на следующей
      if (item === serviceItems[0] && serviceItems[1]) {
        const nextHint = serviceItems[1].querySelector('.hint-animation');
        if (nextHint) {
          nextHint.style.opacity = '1';
        }
      }
    }
  }, { passive: true });
});

// Инициализация подсказок
function initHints() {
  // Показываем подсказку только на первой карточке изначально
  serviceItems.forEach((item, index) => {
    const hint = item.querySelector('.hint-animation');
    if (hint) {
      hint.style.opacity = index === 0 ? '1' : '0';
    }
  });
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', initHints);

// Добавляем класс interacted при наведении на десктопе
if (window.matchMedia('(hover: hover)').matches) {
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (!item.classList.contains('interacted')) {
        item.classList.add('interacted');
      }
    }, { passive: true });
  });
}

// Обработка формы
document.getElementById('appointment-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  this.reset(); // Очистка формы
}, { passive: false }); // Здесь passive: false, так как нам нужно preventDefault

// Callback Widget Functionality
document.addEventListener('DOMContentLoaded', () => {
    const callbackWidget = document.getElementById('callbackWidget');
    const callbackButton = callbackWidget.querySelector('.callback-button');
    const closeCallback = document.getElementById('closeCallback');
    const callbackForm = document.getElementById('callbackForm');

    // Toggle callback popup
    callbackButton.addEventListener('click', () => {
        callbackWidget.classList.toggle('active');
    });

    // Close callback popup
    closeCallback.addEventListener('click', () => {
        callbackWidget.classList.remove('active');
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!callbackWidget.contains(e.target)) {
            callbackWidget.classList.remove('active');
        }
    });

    // Handle form submission
    callbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(callbackForm);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to your server
        console.log('Callback request:', data);
        
        // Show success message
        const submitButton = callbackForm.querySelector('.callback-submit');
        const originalContent = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-check"></i> Заявка отправлена';
        submitButton.style.background = '#28a745';
        
        // Reset form and close popup after delay
        setTimeout(() => {
            callbackForm.reset();
            submitButton.innerHTML = originalContent;
            submitButton.style.background = '';
            callbackWidget.classList.remove('active');
        }, 2000);
    });
});

// Эффект печатания для текста
const texts = [
    "Мы предлагаем качественную тонировку стекол автомобилей с использованием современных материалов и технологий.",
    "Наши специалисты имеют более 10 лет опыта работы с автомобилями всех марок и моделей.",
    "Гарантируем высокое качество работы, соблюдение сроков и доступные цены на все виды услуг.",
    "Используем только сертифицированные материалы от ведущих производителей."
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 50; // Задержка между символами при печатании
  let newTextDelay = 3000; // Задержка перед удалением текста (3 секунды)
  let deletingDelay = 30; // Задержка между символами при удалении
  
  function typeText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
  
    const currentText = texts[textIndex];
  
    if (isDeleting) {
      // Удаление текста
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
  
      // Если текст удалён полностью
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Переход к следующему тексту
        setTimeout(typeText, 500); // Пауза перед началом печатания нового текста
      } else {
        setTimeout(typeText, deletingDelay); // Продолжаем удаление
      }
    } else {
      // Печатание текста
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
  
      // Если текст напечатан полностью
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, newTextDelay); // Пауза перед началом удаления
      } else {
        setTimeout(typeText, typingDelay); // Продолжаем печатание
      }
    }
  }
  
  // Запуск эффекта печатания при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    typeText();
  });

// Карусель и модальное окно для портфолио
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('workCarousel');
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector('.next');
  const prevButton = carousel.querySelector('.prev');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  
  // Клонируем первый и последний слайды для бесконечной прокрутки
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let currentIndex = 1;
  let isTransitioning = false;

  // Создаем точки навигации
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index + 1);
      updateDots(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  // Устанавливаем начальное положение
  track.style.transform = `translateX(-${100 * currentIndex}%)`;

  // Обработчики кнопок
  nextButton.addEventListener('click', () => {
    if (isTransitioning) return;
    currentIndex++;
    moveToSlide('next');
  });

  prevButton.addEventListener('click', () => {
    if (isTransitioning) return;
    currentIndex--;
    moveToSlide('prev');
  });

  // Функция перемещения слайдов
  function moveToSlide(direction) {
    isTransitioning = true;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${100 * currentIndex}%)`;

    // Обновляем точки
    const actualIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateDots(actualIndex);
  }

  // Обработчик окончания анимации
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (currentIndex === 0) {
      track.style.transition = 'none';
      currentIndex = slides.length;
      track.style.transform = `translateX(-${100 * currentIndex}%)`;
    }
    if (currentIndex === slides.length + 1) {
      track.style.transition = 'none';
      currentIndex = 1;
      track.style.transform = `translateX(-${100 * currentIndex}%)`;
    }
  });

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Модальное окно для просмотра фото
  const modal = document.getElementById('imageModal');
  const modalTrack = modal.querySelector('.modal-track');
  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-nav.prev');
  const modalNext = modal.querySelector('.modal-nav.next');
  const modalDots = modal.querySelector('.modal-dots');

  let modalCurrentIndex = 0;

  // Создаем слайды для модального окна
  slides.forEach((slide, index) => {
    const modalSlide = document.createElement('div');
    modalSlide.classList.add('modal-slide');
    const img = slide.querySelector('img').cloneNode(true);
    modalSlide.appendChild(img);
    modalTrack.appendChild(modalSlide);

    // Создаем точки для модального окна
    const dot = document.createElement('button');
    dot.classList.add('modal-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToModalSlide(index);
    });
    modalDots.appendChild(dot);

    // Открытие модального окна при клике на слайд
    slide.addEventListener('click', () => {
      modal.classList.add('active');
      goToModalSlide(index);
      document.body.style.overflow = 'hidden';
    });
  });

  const modalDotButtons = Array.from(modalDots.children);
  const modalSlides = Array.from(modalTrack.children);

  function goToModalSlide(index) {
    modalCurrentIndex = index;
    modalTrack.style.transform = `translateX(-${100 * index}vw)`;
    modalDotButtons.forEach(dot => dot.classList.remove('active'));
    modalDotButtons[index].classList.add('active');
  }

  // Обработчики кнопок модального окна
  modalNext.addEventListener('click', () => {
    modalCurrentIndex = (modalCurrentIndex + 1) % slides.length;
    goToModalSlide(modalCurrentIndex);
  });

  modalPrev.addEventListener('click', () => {
    modalCurrentIndex = (modalCurrentIndex - 1 + slides.length) % slides.length;
    goToModalSlide(modalCurrentIndex);
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Свайп на мобильных устройствах
  let touchStartX = 0;
  let touchEndX = 0;

  modalTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  modalTrack.addEventListener('touchmove', e => {
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  modalTrack.addEventListener('touchend', () => {
    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        modalNext.click();
      } else {
        modalPrev.click();
      }
    }
  });

  // Автоматическая прокрутка карусели
  let autoplayInterval = setInterval(() => {
    nextButton.click();
  }, 5000);

  // Останавливаем автопрокрутку при взаимодействии
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
      nextButton.click();
    }, 5000);
  });
});

// Кнопка прокрутки вверх
const scrollToTopBtn = document.getElementById('scrollToTop');
const heroSection = document.getElementById('home');

// Функция для проверки видимости секции hero
function checkHeroVisibility() {
  const heroRect = heroSection.getBoundingClientRect();
  if (heroRect.bottom <= 0) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// Обработчик клика по кнопке
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Слушаем событие прокрутки
window.addEventListener('scroll', checkHeroVisibility, { passive: true });

// Проверяем видимость при загрузке страницы
checkHeroVisibility();