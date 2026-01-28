const slides = document.querySelectorAll('.hero__slide');
const delayMs = 3000;
let current = 0;

function setSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

setSlide(current);

setInterval(() => {
  current = (current + 1) % slides.length;
  setSlide(current);
}, delayMs);
