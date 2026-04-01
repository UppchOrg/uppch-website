document.addEventListener('DOMContentLoaded', function () {
  // Hero / picture-frame swiper — class matches the HTML element: "heroSwiper"
  const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 700,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.heroSwiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.heroSwiper .swiper-button-next',
      prevEl: '.heroSwiper .swiper-button-prev',
    },
  });
});
