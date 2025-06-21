// === Hamburger Menu Toggle ===
document.getElementById("hamburger").addEventListener("click", () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  navLinks.classList.toggle("nav-active");   // toggle menu open/close
  hamburger.classList.toggle("active");      // animate hamburger icon
});

// === Nav Link Clicks Rotate Carousel + Close Menu ===
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    // If the link is NOT going to shop.html, rotate carousel
    if (!link.href.includes('shop.html')) {
      e.preventDefault(); // prevent jump to #id

      const targetId = link.getAttribute('href').replace('#', '');
      const targetCard = document.getElementById(targetId);

      if (!targetCard) return;

      const index = Array.from(cards).indexOf(targetCard);
      if (index !== -1) {
        currentCardIndex = index;
        setCardPositions();
        stopRotation(); // optional: stop auto-rotation on click
      }
    }

    // Close hamburger menu after click
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('nav-active');

    const hamburger = document.getElementById('hamburger');
    hamburger.classList.remove('active');
  });
});
