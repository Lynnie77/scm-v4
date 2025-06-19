// Page load animation
gsap.from(".mobile-card", {
  scale: 0.8,      // starts smaller
  opacity: 0,      // fades in
  duration: 0.8,
  stagger: 0.15,   // nice even stagger
  ease: "power2.out"
});

// Hover animation
document.querySelectorAll(".mobile-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});
