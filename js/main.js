document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // Toggle mobile nav menu (hamburger + links)
  // ============================================
  const menuBtn = document.querySelector(".menu-btn");
  const rightText = document.querySelector(".bottom-nav .right-text");

  if (menuBtn && rightText) {
    // Toggle menu visibility on click
    menuBtn.addEventListener("click", function () {
      menuBtn.classList.toggle("active");
      rightText.classList.toggle("active");
    });

    // Close menu when a nav link is clicked
    const navLinks = document.querySelectorAll(".bottom-nav .right-text a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuBtn.classList.remove("active");
        rightText.classList.remove("active");
      });
    });
  }

  // ===========================================================
  // Toggle "Read More / Read Less" for About section paragraph
  // ===========================================================
  const aboutBtn = document.querySelector(".about-read-btn");
  const aboutPara = document.querySelector(".about-card-left p:nth-child(4)");

  if (aboutBtn && aboutPara) {
    aboutBtn.addEventListener("click", function () {
      const isVisible = aboutPara.style.display === "block";
      aboutPara.style.display = isVisible ? "none" : "block";
      aboutBtn.textContent = isVisible ? "Read More" : "Read Less";
    });
  }

  // =============================================================
  // Toggle "Read More / Read Less" for Mission section paragraph
  // =============================================================
  const missionBtn = document.querySelector(".mission-read-btn");
  const missionPara = document.querySelector(
    ".mission-card-left p:nth-of-type(2)"
  );

  if (missionBtn && missionPara) {
    missionBtn.addEventListener("click", function () {
      const isVisible = missionPara.style.display === "block";
      missionPara.style.display = isVisible ? "none" : "block";
      missionBtn.textContent = isVisible ? "Read More" : "Read Less";
    });
  }

  // ===================================================
  // Custom play button for About section video element
  // ===================================================
  const playButton = document.getElementById("playButton");
  const video = document.getElementById("aboutVideo");

  if (playButton && video) {
    playButton.addEventListener("click", function () {
      video.play();
      video.setAttribute("controls", true);
      playButton.style.display = "none";
    });
  }

  // ===============================================================
  // Switch active tab and update mission text based on selection
  // ===============================================================
  const tabs = document.querySelectorAll(".mission-tabs span");
  const missionText = document.querySelector(".mission-card-right p");

  // Content to display for each tab
  const missionContent = {
    mission: `UPPCH is a nonprofit organization dedicated to helping the most vulnerable communities in Haiti. Through education, health services, and food assistance, we aim to uplift lives and bring lasting change.`,
    vision: `We envision a future where every Haitian, regardless of background or circumstance, has access to the resources, education, and opportunities needed to lead a fulfilling life. UPPCH is committed to building strong, self-sustaining communities by empowering individuals, uplifting families, and fostering long-term development rooted in dignity, compassion, and resilience.`,
    goals: `Our goals are centered on breaking the cycle of poverty through actionable programs. We aim to increase access to education, provide consistent healthcare outreach, reduce hunger in underserved areas, and support youth and women through economic empowerment initiatives that create real, lasting impact.`,
  };

  // Attach click listener to each tab to switch content
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Remove "active" class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Determine which tab was clicked and update text
      const key = this.textContent.trim().toLowerCase().replace("our ", "");
      if (missionContent[key]) {
        missionText.innerText = missionContent[key];
      }
    });
  });
});
