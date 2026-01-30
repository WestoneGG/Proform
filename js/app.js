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

// Форма отправки на WhatsApp и почту
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const message = form.querySelector('[name="message"]').value;
    
    // Проверка заполнения полей
    if (!name || !phone) {
      alert('Пожалуйста, заполните имя и телефон');
      return;
    }
    
    // Номер WhatsApp
    const whatsappNumber = '+380979356928';
    const whatsappText = `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;
    
    // Создаём FormData для отправки на почту
    const formData = new FormData(form);
    formData.append('_captcha', 'false');
    formData.append('_next', window.location.href);
    
    // Отправка на почту через FormSubmit
    fetch('https://formsubmit.co/4vlad89@gmail.com', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      console.log('Отправка на почту:', response.status);
      // После отправки открываем WhatsApp независимо от результата
      window.open(whatsappUrl, '_blank');
      form.reset();
      alert('Спасибо! Ваше сообщение отправлено. Нажмите ОК для открытия WhatsApp');
    })
    .catch(error => {
      console.error('Ошибка:', error);
      // Если ошибка, всё равно открываем WhatsApp
      alert('Ошибка при отправке на почту, но сообщение будет отправлено в WhatsApp');
      window.open(whatsappUrl, '_blank');
      form.reset();
    });
  });
}
