/* -----------------------------------------
  Have focus outline only for keyboard users
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

/* -----------------------------------------
  Back to top button
 ---------------------------------------- */

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

/* -----------------------------------------
  Scroll-triggered entrance animations
 ---------------------------------------- */

const animatedEls = document.querySelectorAll('.animate-on-scroll');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => scrollObserver.observe(el));

/* -----------------------------------------
  Cycling hero role text
 ---------------------------------------- */

const roles = ['Software Developer', 'Data Scientist', 'Problem Solver', 'Continuous Learner'];
const heroRole = document.querySelector('.hero__role');
let roleIndex = 0;

if (heroRole) {
  heroRole.textContent = roles[0];

  setInterval(() => {
    heroRole.classList.add('hero__role--fade');
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      heroRole.textContent = roles[roleIndex];
      heroRole.classList.remove('hero__role--fade');
    }, 300);
  }, 2500);
}

/* -----------------------------------------
  Nav scroll shrink + back-to-top visibility
 ---------------------------------------- */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  // Back to top
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }

  // Nav frosted glass on scroll
  if (window.scrollY > 60) {
    nav.classList.add("nav--scrolled");
  } else {
    nav.classList.remove("nav--scrolled");
  }
});
