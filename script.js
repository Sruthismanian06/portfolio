// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Scroll progress bar
const scrollBar = document.getElementById('scrollBar');

function updateScrollProgress() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight =
        (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollBar) {
        scrollBar.style.width = `${progress}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();


// Typing animation
const phrases = [
    'Front-End Developer',
    'Responsive UI Builder',
    'Web Performance Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedEl = document.getElementById('typed');

function type() {

    if (!typedEl) return;

    const current = phrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    }

    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(type, speed);
}

type();


// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {

    menuToggle.addEventListener('click', () => {

        navLinks.classList.toggle('active');

        menuToggle.textContent =
            navLinks.classList.contains('active') ? '✕' : '☰';

    });

    navLinks.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';

        });

    });

}


// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }

    });

}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));


// Animated counters
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;
        const to = Number(el.getAttribute('data-to') || '0');

        const start = 0;
        const duration = 900;

        const t0 = performance.now();

        function tick(now) {

            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);

            const val = Math.round(start + (to - start) * eased);

            el.textContent = String(val);

            if (p < 1) requestAnimationFrame(tick);

        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);

    });

}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// Skill meter animation
const meters = document.querySelectorAll('.meter > span[data-meter]');

const meterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;

        el.style.width = `${el.getAttribute('data-meter')}%`;

        meterObserver.unobserve(el);

    });

}, { threshold: 0.35 });

meters.forEach(m => meterObserver.observe(m));


// Contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();

        alert("Thanks for reaching out! I'll get back to you soon.");

        e.target.reset();

    });

}


// Email dropdown
const emailDropdown = document.querySelector('.email-dropdown');
const emailTrigger = document.querySelector('.email-trigger');

if (emailDropdown && emailTrigger) {

    emailTrigger.addEventListener('click', () => {

        const isOpen = emailDropdown.classList.toggle('open');

        emailTrigger.setAttribute('aria-expanded', String(isOpen));

    });

    document.addEventListener('click', (e) => {

        if (!emailDropdown.contains(e.target)) {

            emailDropdown.classList.remove('open');
            emailTrigger.setAttribute('aria-expanded', 'false');

        }

    });

    document.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') {

            emailDropdown.classList.remove('open');
            emailTrigger.setAttribute('aria-expanded', 'false');

        }

    });

}


// Skill dock animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item) => {

    item.addEventListener('mousemove', (e) => {

        const rect = item.getBoundingClientRect();

        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const rotateX = ((offsetY - rect.height / 2) / rect.height) * 15;
        const rotateY = ((offsetX - rect.width / 2) / rect.width) * 15;

        item.style.transform =
            `translateY(-10px) scale(1.2) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

    });

    item.addEventListener('mouseleave', () => {

        item.style.transform =
            'translateY(0) scale(1) rotateX(0) rotateY(0)';

    });

});


// =======================
// PROJECT CAROUSEL
// =======================

const carousel = document.querySelector(".projects-carousel");
const nextBtn = document.querySelector(".project-arrow.right");
const prevBtn = document.querySelector(".project-arrow.left");

if (carousel && nextBtn && prevBtn) {

    function getScrollAmount() {

        const card = document.querySelector(".project-card-advanced");

        if (!card) return 300;

        const gap = 32;

        return card.offsetWidth + gap;

    }

    nextBtn.addEventListener("click", () => {

        carousel.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });

    });

    prevBtn.addEventListener("click", () => {

        carousel.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });

    });

    function updateArrows() {

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        if (carousel.scrollLeft <= 0) {
            prevBtn.style.opacity = "0.4";
            prevBtn.style.pointerEvents = "none";
        } else {
            prevBtn.style.opacity = "1";
            prevBtn.style.pointerEvents = "auto";
        }

        if (carousel.scrollLeft >= maxScroll) {
            nextBtn.style.opacity = "0.4";
            nextBtn.style.pointerEvents = "none";
        } else {
            nextBtn.style.opacity = "1";
            nextBtn.style.pointerEvents = "auto";
        }

    }

    carousel.addEventListener("scroll", updateArrows);

    updateArrows();

}