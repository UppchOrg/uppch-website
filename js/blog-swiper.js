document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const blogSwiper = new Swiper(".blogSwiper", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      700: { slidesPerView: 1 },
      1000: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });

  console.log("Swiper initialized:", blogSwiper);
});
