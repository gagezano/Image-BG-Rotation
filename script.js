const slides = document.querySelectorAll('.hero__slide');
const labelOutput = document.querySelector('.hero__current');
const delayMs = 3000;
let current = 0;

function setSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
  const label = slides[index].dataset.label || 'Image';
  if (labelOutput) labelOutput.textContent = label;
}

setSlide(current);

setInterval(() => {
  current = (current + 1) % slides.length;
  setSlide(current);
}, delayMs);
