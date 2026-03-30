document.addEventListener('DOMContentLoaded', function () {
  const blogSwiper = new Swiper('.blogSwiper', {
    loop: true,
    spaceBetween: 16,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0:    { slidesPerView: 1 },
      640:  { slidesPerView: 2, spaceBetween: 16 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
    },
  });
});
