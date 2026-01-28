const slides = document.querySelectorAll('.hero__slide');
const speedSelect = document.getElementById('speed-select');
const speedDial = document.getElementById('speed-dial');
const speedValueEl = document.getElementById('speed-value');
const speedRestore = document.getElementById('speed-restore');

const speedSnapValues = [1500, 2500, 4000, 5000, 6000];

function getDurationMs() {
  if (speedDial) {
    const n = parseInt(speedDial.value, 10);
    if (!isNaN(n)) return n;
  }
  if (speedSelect) {
    const n = parseInt(speedSelect.value, 10);
    if (!isNaN(n)) return n;
  }
  return 4000;
}

function msToLabel(ms) {
  return ms / 1000 + 's';
}

function nearestSnapValue(ms) {
  let best = speedSnapValues[0];
  let bestDiff = Math.abs(ms - best);
  for (let i = 0; i < speedSnapValues.length; i++) {
    const d = Math.abs(ms - speedSnapValues[i]);
    if (d < bestDiff) {
      bestDiff = d;
      best = speedSnapValues[i];
    }
  }
  return best;
}

function updateSpeedDisplay() {
  const ms = getDurationMs();
  if (speedValueEl) speedValueEl.textContent = msToLabel(ms);
  if (speedDial) speedDial.value = ms;
  if (speedSelect) speedSelect.value = String(nearestSnapValue(ms));
}

function setSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

let current = 0;
let intervalId = null;

function startInterval() {
  if (intervalId) clearInterval(intervalId);
  const delayMs = getDurationMs();
  intervalId = setInterval(() => {
    current = (current + 1) % slides.length;
    setSlide(current);
  }, delayMs);
}

setSlide(current);
startInterval();

function onSpeedDialInput() {
  const ms = parseInt(speedDial && speedDial.value, 10) || 4000;
  if (speedValueEl) speedValueEl.textContent = msToLabel(ms);
  if (speedSelect) speedSelect.value = String(nearestSnapValue(ms));
  startInterval();
}

function onSpeedDialChange() {
  const ms = parseInt(speedDial && speedDial.value, 10) || 4000;
  const snapped = nearestSnapValue(ms);
  if (speedDial) speedDial.value = snapped;
  if (speedSelect) speedSelect.value = String(snapped);
  if (speedValueEl) speedValueEl.textContent = msToLabel(snapped);
  startInterval();
}

function onSpeedSelectChange() {
  const ms = parseInt(speedSelect && speedSelect.value, 10) || 4000;
  if (speedDial) speedDial.value = ms;
  if (speedValueEl) speedValueEl.textContent = msToLabel(ms);
  startInterval();
}

if (speedDial) {
  speedDial.addEventListener('input', onSpeedDialInput);
  speedDial.addEventListener('change', onSpeedDialChange);
}
if (speedSelect) {
  speedSelect.addEventListener('change', onSpeedSelectChange);
}
if (speedRestore) {
  speedRestore.addEventListener('click', (e) => {
    e.preventDefault();
    if (speedDial) speedDial.value = 4000;
    if (speedSelect) speedSelect.value = '4000';
    updateSpeedDisplay();
    startInterval();
  });
}
