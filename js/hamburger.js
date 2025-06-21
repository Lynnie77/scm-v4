// === Hamburger Menu Toggle ===
document.getElementById("hamburger").addEventListener("click", () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  navLinks.classList.toggle("nav-active");   // toggle menu open/close
  hamburger.classList.toggle("active");      // animate hamburger icon
});

// === Nav Link Clicks Rotate Carousel OR Scroll Mobile ===
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // Only process internal links (like #card1)
    if (href.startsWith('#')) {
      e.preventDefault();

      const targetId = href.replace('#', '');
      const isMobile = window.innerWidth < 768; // adjust for your mobile breakpoint

      if (isMobile) {
        // Mobile: scroll to mobile-card
        const targetCard = document.querySelector(`.mobile-card[data-id="${targetId}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Highlight / pulse in case already in view
          targetCard.classList.add('highlight');
          setTimeout(() => {
            targetCard.classList.remove('highlight');
          }, 1200); // adjust duration
        }
      } else {
        // Desktop: rotate carousel
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
          const index = Array.from(cards).indexOf(targetCard);
          if (index !== -1) {
            currentCardIndex = index;
            setCardPositions();
            stopRotation();
          }
        }
      }
    }

    // Always close hamburger after click
    document.getElementById('navLinks').classList.remove('nav-active');
    document.getElementById('hamburger').classList.remove('active');
  });
});
