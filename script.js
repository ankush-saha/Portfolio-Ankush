// --- Custom Cursor ---
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Only run custom cursor logic if not on a touch device
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for the outline for a smooth effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects on clickable items
    const clickables = document.querySelectorAll("a, .btn, .hamburger");
    clickables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
            cursorOutline.style.backgroundColor = "rgba(0, 240, 255, 0.1)";
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.backgroundColor = "transparent";
        });
    });
}

// --- Typing Effect ---
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Computer Science Student", "Software Developer", "Data Enthusiast", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
            // Optional: stop observing once it has animated in
            // observer.unobserve(entry.target); 
        } else {
            // Remove the class when out of view if you want it to animate every time
            // entry.target.classList.remove('section-visible');
            // entry.target.classList.add('section-hidden');
        }
    });
}, observerOptions);

const hiddenSections = document.querySelectorAll('.section-hidden');
hiddenSections.forEach((el) => observer.observe(el));

// --- Smooth Scrolling for Nav Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
