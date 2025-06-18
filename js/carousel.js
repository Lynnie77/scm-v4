const carousel = document.getElementById("carousel");
const cards = carousel.querySelectorAll(".card");
let currentCardIndex = 0;
const totalCards = cards.length;
let rotationInterval = null;
let isPopupOpen = false;

// === RESPONSIVE SETTINGS ===
function getResponsiveSettings() {
  const width = window.innerWidth;
  if (width <= 400) return { rotationStep: 45, radius: 160 }; // Very small
  if (width <= 600) return { rotationStep: 50, radius: 200 }; // Mobile
  if (width <= 768) return { rotationStep: 60, radius: 260 }; // Tablet
  return { rotationStep: 72, radius: 350 }; // Desktop
}

// === CARD TRANSFORMS ===
function setCardPositions() {
  const { rotationStep, radius } = getResponsiveSettings();
  cards.forEach((card, i) => {
    const rotateY = i * rotationStep;
    const angleRad = (rotateY * Math.PI) / 180;
    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius;
    card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`;
  });
  rotateCarousel();
  updateCardSize();
}

function updateCardSize() {
  const { rotationStep, radius } = getResponsiveSettings();
  cards.forEach((card, i) => {
    const rotateY = i * rotationStep;
    const angleRad = (rotateY * Math.PI) / 180;
    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius;
    const scale = (i === currentCardIndex) ? 1.2 : 1;
    card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
    card.style.zIndex = i === currentCardIndex ? "1" : "0";
  });
}

function rotateCarousel() {
  const { rotationStep } = getResponsiveSettings();
  const rotateDeg = -rotationStep * currentCardIndex;
  carousel.style.transform = `rotateY(${rotateDeg}deg)`;
}

// === ROTATION CONTROL ===
function startRotation() {
  if (rotationInterval || isPopupOpen || window.innerWidth < 768) return;
  rotationInterval = setInterval(() => {
    currentCardIndex = (currentCardIndex + 1) % totalCards;
    setCardPositions();
  }, 1600);
}

function stopRotation() {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
}

// === INTERACTIONS ===
carousel.addEventListener("mouseover", () => {
  if (!isPopupOpen) stopRotation();
});
carousel.addEventListener("mouseout", () => {
  if (!isPopupOpen) startRotation();
});
carousel.addEventListener("touchstart", () => {
  if (!isPopupOpen) stopRotation();
});
carousel.addEventListener("touchend", () => {
  if (!isPopupOpen) startRotation();
});

// === POPUP ===
function showPopup(cardId, event) {
  event.stopPropagation(); // Prevent click from reaching document listener
  const popup = document.getElementById(`popup-${cardId}`);
  if (popup) {
    popup.classList.add("show");
    isPopupOpen = true;
    stopRotation();
  }
}

// === OUTSIDE CLICK TO CLOSE POPUP ===
document.addEventListener('click', function (event) {
  const popups = document.querySelectorAll('.popup');
  let clickedOutside = true;
  popups.forEach(popup => {
    if (popup.classList.contains('show') && popup.contains(event.target)) {
      clickedOutside = false; // Click was inside a popup
    }
  });
  if (clickedOutside && isPopupOpen) {
    popups.forEach(popup => {
      popup.classList.remove('show'); // Hide the popup
    });
    isPopupOpen = false;
    if (window.innerWidth >= 768) {
      startRotation(); // Resume carousel rotation on desktop
    }
  }
});

// === CARD CLICK ===
cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const cardId = card.dataset.id;
    showPopup(cardId, event); // Pass the event to stopPropagation
  });
});

// === mobile-cards-wrapper POPUP SUPPORT ===
document.querySelectorAll(".mobile-cards-wrapper .card").forEach((card) => {
  card.addEventListener("click", (event) => {
    const cardId = card.dataset.id;
    showPopup(cardId, event); // Pass the event to stopPropagation
  });
});

// === INIT & RESIZE ===
function initCarousel() {
  setCardPositions(); // Always set positions (desktop or mobile)

  if (window.innerWidth < 768) {
    stopRotation();   // Stop rotation for mobile
    return;
  }

  startRotation();    // Start rotation for desktop
}

initCarousel();

window.addEventListener("resize", () => {
  initCarousel();
});
