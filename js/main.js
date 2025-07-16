document.addEventListener("DOMContentLoaded", function () {
  // ======= Mobile Nav Toggle =======
  const menuBtn = document.querySelector(".menu-btn");
  const rightText = document.querySelector(".bottom-nav .right-text");

  if (menuBtn && rightText) {
    menuBtn.addEventListener("click", function () {
      menuBtn.classList.toggle("active");
      rightText.classList.toggle("active");
    });

    // Close menu when nav link is clicked
    const navLinks = document.querySelectorAll(".bottom-nav .right-text a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuBtn.classList.remove("active");
        rightText.classList.remove("active");
      });
    });
  }

  // ======= About Video Custom Play Button =======
  const playButton = document.getElementById("playButton");
  const video = document.getElementById("aboutVideo");

  if (playButton && video) {
    playButton.addEventListener("click", function () {
      video.play();
      video.setAttribute("controls", true);
      playButton.style.display = "none";
    });
  }

  // ======= Mission Tabs Toggle Active State =======
  const tabs = document.querySelectorAll(".mission-tabs span");
  const missionText = document.querySelector(".mission-card-right p");
  // My text fot the our mission card right
  const missionContent = {
    mission: `UPPCH is a nonprofit organization dedicated to helping the most vulnerable communities in Haiti. Through education, health services, and food assistance, we aim to uplift lives and bring lasting change.`,
    vision: `We envision a future where every Haitian, regardless of background or circumstance, has access to the resources, education, and opportunities needed to lead a fulfilling life. UPPCH is committed to building strong, self-sustaining communities by empowering individuals, uplifting families, and fostering long-term development rooted in dignity, compassion, and resilience.`,
    goals: `Our goals are centered on breaking the cycle of poverty through actionable programs. We aim to increase access to education, provide consistent healthcare outreach, reduce hunger in underserved areas, and support youth and women through economic empowerment initiatives that create real, lasting impact.`,
  };

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Remove active class
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Get lowercased key name from tab text content
      const key = this.textContent.trim().toLowerCase().replace("our ", "");

      // Update paragraph content
      if (missionContent[key]) {
        missionText.innerText = missionContent[key];
      }
    });
  });
});
