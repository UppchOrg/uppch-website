document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");

  if (hamburger && mobileMenu && closeBtn) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
    });
  }

  // Read more
  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreText = document.querySelector(".more-text");

  readMoreBtn.addEventListener("click", function () {
    if (moreText.classList.contains("hidden")) {
      moreText.classList.remove("hidden");
      readMoreBtn.textContent = "Read Less";
    } else {
      moreText.classList.add("hidden");
      readMoreBtn.textContent = "Read More";
    }
  });
});
