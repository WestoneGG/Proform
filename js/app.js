// const marquee = document.querySelector('.marquee-content');
// Остановка при наведении
// marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
// Запуск при уводе мыши
// marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 100,
  centeredSlides: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Бургер меню (полноэкранный оверлей, блокировка прокрутки с сохранением позиции)
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
let _scrollPos = 0;

function openMenu() {
  _scrollPos = window.scrollY || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_scrollPos}px`;
  document.body.classList.add('menu-open');
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  document.body.style.position = '';
  const top = document.body.style.top;
  document.body.style.top = '';
  const restore = _scrollPos || 0;
  window.scrollTo(0, restore);
}

burger.addEventListener('click', () => {
  const opening = !nav.classList.contains('active');
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  if (opening) openMenu(); else closeMenu();
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    closeMenu();
  });
});

// Форма отправки на WhatsApp и почту
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const message = formData.get('message');
  
  // Номер WhatsApp (замени на свой)
  const whatsappNumber = '+380979356928'; // Формат: +страна код телефон
  
  // Текст для WhatsApp
  const whatsappText = `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;
  
  // Отправка на почту через FormSubmit
  const formAction = 'https://formsubmit.co/4vlad89gmail.com'; // Замени на свою почту
  
  // Создаём новую форму для отправки на почту
  const submitForm = new FormData(this);
  
  fetch(formAction, {
    method: 'POST',
    body: submitForm
  }).then(() => {
    // После отправки на почту открываем WhatsApp
    window.open(whatsappUrl, '_blank');
    this.reset();
    alert('Заявка отправлена!');
  }).catch(error => {
    console.log('Ошибка отправки:', error);
    // Если ошибка, всё равно открываем WhatsApp
    window.open(whatsappUrl, '_blank');
  });
});