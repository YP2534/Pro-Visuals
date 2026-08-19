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

// 6. Interactive 3D Card Tilt Effect
const cards = document.querySelectorAll('.service-card, .portfolio-item');

cards.forEach(card => {
    // When mouse moves over the card, calculate the 3D tilt
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        
        // Find exact mouse position inside the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Find the center of the card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on distance from center (Max 15 degrees)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        // Apply the 3D transform instantly
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    // When mouse leaves, snap back to flat 2D smoothly
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});
        faqItems.forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});
