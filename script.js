// MOBILE MENU TOGGLE (keep your existing code or add this if needed)
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "";
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu);
}

const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (e) => {
  if (
    mobileMenu &&
    !mobileMenu.contains(e.target) &&
    mobileMenuBtn &&
    !mobileMenuBtn.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// BEFORE & AFTER GALLERY SLIDER + NAVIGATION

const beforeAfterImages = [
  { before: "images/Gallery/1-before.png", after: "images/Gallery/1-after.png" },
  { before: "images/Gallery/2-before.png", after: "images/Gallery/2-after.png" },
  { before: "images/Gallery/3-before.png", after: "images/Gallery/3-after.png" },
  { before: "images/Gallery/4-before.png", after: "images/Gallery/4-after.png" },
  { before: "images/Gallery/5-before.png", after: "images/Gallery/5-after.png" },
  { before: "images/Gallery/6-before.png", after: "images/Gallery/6-after.png" },
  { before: "images/Gallery/7-before.png", after: "images/Gallery/7-after.png" },
  { before: "images/Gallery/8-before.png", after: "images/Gallery/8-after.png" },
  { before: "images/Gallery/9-before.png", after: "images/Gallery/9-after.png" },
  { before: "images/Gallery/10-before.png", after: "images/Gallery/10-after.png" },
  { before: "images/Gallery/11-before.png", after: "images/Gallery/11-after.png" },
];

let currentIndex = 0;

const container = document.getElementById("imageComparisonContainer");
const beforeImage = container.querySelector(".before-image");
const afterImage = container.querySelector(".after-image");
const slider = document.getElementById("sliderDivider");
const prevBtn = document.getElementById("galleryPrevBtn");
const nextBtn = document.getElementById("galleryNextBtn");

let isDragging = false;

// Update the slider position and clip-path
function setSliderPosition(percent) {
  percent = Math.min(100, Math.max(0, percent));
  // Set CSS variable on container for after image clip polygon
  container.style.setProperty('--slider-pos', percent + '%');
  slider.style.left = percent + '%';
}

// Change images and reset slider
function updateImages(index) {
  if (index < 0) index = beforeAfterImages.length - 1;
  if (index >= beforeAfterImages.length) index = 0;
  currentIndex = index;

  beforeImage.src = beforeAfterImages[currentIndex].before;
  afterImage.src = beforeAfterImages[currentIndex].after;

  setSliderPosition(50);
}

// Event Listeners for arrows
prevBtn.addEventListener("click", () => {
  updateImages(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  updateImages(currentIndex + 1);
});

// Drag slider logic
container.addEventListener("mousedown", (e) => {
  if (e.target === slider || slider.contains(e.target)) {
    isDragging = true;
    e.preventDefault();
  }
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let percent = (x / rect.width) * 100;
  setSliderPosition(percent);
});

container.addEventListener(
  "touchstart",
  (e) => {
    if (e.target === slider || slider.contains(e.target)) {
      isDragging = true;
      e.preventDefault();
    }
  },
  { passive: false }
);

window.addEventListener("touchend", () => {
  isDragging = false;
});

container.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    let percent = (x / rect.width) * 100;
    setSliderPosition(percent);
    e.preventDefault();
  },
  { passive: false }
);

// Initialize gallery on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Your existing gallery slider init code
  updateImages(0);
  setSliderPosition(50);

  let slideIndex = 1;
  let slideTimer;

  function showSlides(n) {
    const slides = document.getElementsByClassName("testimonial-item");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
  }

  function nextSlide() {
    slideIndex++;
    if (slideIndex > document.getElementsByClassName("testimonial-item").length) {
      slideIndex = 1;
    }
    showSlides(slideIndex);
  }

  function startAutoSlide() {
    slideTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideTimer);
  }

  // Make currentSlide globally accessible for dot buttons
  window.currentSlide = function(n) {
    slideIndex = n;
    showSlides(slideIndex);
    stopAutoSlide();
    startAutoSlide();
  };

  showSlides(slideIndex);
  startAutoSlide();
});


