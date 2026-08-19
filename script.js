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
        e.preventDefault(); 
        const targetUrl = this.href;
        
        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        
        drone.classList.remove('fly-animation');
        void drone.offsetWidth; 
        drone.classList.add('fly-animation');
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800); 
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

// 6. Interactive 3D Card Tilt Effect
const cards = document.querySelectorAll('.service-card, .portfolio-item');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});
