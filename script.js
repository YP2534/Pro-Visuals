// script.js

// 1. Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// 2. Mobile Menu
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
if(hamburger && navLinks) {
    hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });
}

// 3. Drone Transition Animation for Multi-Page
const navItems = document.querySelectorAll('.nav-item');
const drone = document.getElementById('drone-transition');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // Stop instant redirect
        const targetUrl = this.href;
        
        // Close menu on mobile
        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        
        // Trigger Drone Animation
        drone.classList.remove('fly-animation');
        void drone.offsetWidth; // Reflow
        drone.classList.add('fly-animation');
        
        // Wait for drone to fly across screen before loading new page
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800); // 0.8 seconds
    });
});

// 4. Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(el => revealObserver.observe(el));

// 5. FAQ Accordion (For Contact Page)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});
