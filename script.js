// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileMenuClose = document.getElementById("mobileMenuClose")

function toggleMobileMenu() {
    mobileMenu.classList.toggle("active")
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : ""
}

function closeMobileMenu() {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu)
}

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu()
    }
})

// Testimonials Carousel
let slideIndex = 1

function currentSlide(n) {
    showSlide(slideIndex = n)
}

function showSlide(n) {
    const slides = document.querySelectorAll(".testimonial-item")
    const dots = document.querySelectorAll(".dot")
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    slides.forEach(slide => slide.classList.remove("active"))
    dots.forEach(dot => dot.classList.remove("active"))
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active")
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active")
    }
}

// Auto-advance testimonials
function autoSlide() {
    slideIndex++
    showSlide(slideIndex)
}

// Start auto-advance if testimonials exist
if (document.querySelector(".testimonials-carousel")) {
    setInterval(autoSlide, 5000)
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    // Initialize testimonials if they exist
    if (document.querySelector(".testimonials-carousel")) {
        showSlide(slideIndex)
    }
    
    console.log("Best Friends Cleaning Company website loaded successfully!")
})
