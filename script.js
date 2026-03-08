// Uçan kelebekler (gerçek kelebek görselleri)
const butterflyImages = [
  "https://i.ibb.co/LvcMPvH/pngegg.png",
  "https://i.ibb.co/m0Nts0m/kisspng-glasswing-butterfly-insect-clip-art-patins-5b4a666cc41cc0-7007119915316025408033.png",
  "https://i.pinimg.com/originals/73/25/b5/7325b5da1c12314824328579aeed59f4.gif",
  "https://i.ibb.co/26DzHgS/pngegg-1.png"
];
const numButterflies = 22;

function createButterfly() {
  const el = document.createElement("div");
  el.className = "kelebek";
  el.style.zIndex = 80;

  const img = document.createElement("img");
  img.src = butterflyImages[Math.floor(Math.random() * butterflyImages.length)];
  img.alt = "kelebek";
  img.style.width = (55 + Math.random() * 25) + "px";
  img.style.height = "auto";
  img.style.display = "block";
  el.appendChild(img);

  document.body.appendChild(el);

  const size = 60;
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  let dx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
  let dy = (Math.random() * 1 + 0.5) * (Math.random() < 0.5 ? 1 : -1);

  function animate() {
    x += dx;
    y += dy;
    if (x < 0 || x > window.innerWidth - size) dx *= -1;
    if (y < 0 || y > window.innerHeight - size) dy *= -1;
    const angle = Math.sin(Date.now() * 0.01) * 20;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    requestAnimationFrame(animate);
  }
  animate();
}

for (let i = 0; i < numButterflies; i++) createButterfly();

// Butonlar: kelebek / SEDA arttır, temizle
document.getElementById('btn-more-butterflies').addEventListener('click', function () {
  for (let i = 0; i < 8; i++) createButterfly();
});
document.getElementById('btn-more-seda').addEventListener('click', function () {
  for (let i = 0; i < 6; i++) createSedaBird();
});
document.getElementById('btn-clear').addEventListener('click', function () {
  document.querySelectorAll('.kelebek').forEach(function (el) { el.remove(); });
  document.querySelectorAll('.bird').forEach(function (el) { el.remove(); });
});

// "SEDA" yazılı kuşlar
function createSedaBird() {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.zIndex = 80;
  el.classList.add('bird');
  const label = document.createElement('span');
  label.textContent = 'SEDA';
  label.classList.add('bird-label');
  el.appendChild(label);

  el.style.left = Math.random() * window.innerWidth + 'px';
  el.style.top = Math.random() * window.innerHeight * 0.45 + 'px';
  document.body.appendChild(el);

  let dx = (Math.random() * 2 - 1) * 1.4;
  let dy = (Math.random() * 2 - 1) * 1.1;

  function move() {
    let left = parseFloat(el.style.left);
    let top = parseFloat(el.style.top);
    if (left + dx < 0 || left + dx > window.innerWidth - 90) dx *= -1;
    if (top + dy < 0 || top + dy > window.innerHeight - 40) dy *= -1;
    el.style.left = left + dx + 'px';
    el.style.top = top + dy + 'px';
    requestAnimationFrame(move);
  }
  move();
}

for (let i = 0; i < 12; i++) createSedaBird();

// Papatya açma animasyonu (şeffaf overlay)
const flowerOverlay = document.getElementById('flower-overlay');
const letterOverlay = document.getElementById('letter-overlay');
const envelopeEl = document.getElementById('envelope');
const btnFlower = document.getElementById('btn-flower');
const btnLetter = document.getElementById('btn-letter');
const btnLetterClose = document.getElementById('btn-letter-close');

function createDaisySvg() {
  // Basit ama hoş papatya: yapraklar + sarı göbek
  return `
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="daisyCenter" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#ffd54f"/>
          <stop offset="70%" stop-color="#ffb300"/>
          <stop offset="100%" stop-color="#f59f00"/>
        </radialGradient>
      </defs>
      <g transform="translate(50 50)">
        ${Array.from({ length: 14 }).map((_, i) => {
          const rot = (360 / 14) * i;
          return `<ellipse cx="0" cy="-26" rx="10" ry="22" fill="#ffffff" stroke="rgba(0,0,0,0.08)" stroke-width="1" transform="rotate(${rot})" />`;
        }).join('')}
        <circle r="16" fill="url(#daisyCenter)" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
        <circle r="6" fill="rgba(255,255,255,0.35)"/>
      </g>
    </svg>
  `;
}

function spawnDaisies(count) {
  if (!flowerOverlay) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'daisy';
    d.innerHTML = createDaisySvg();

    const size = 50 + Math.random() * 90; // 50-140px
    d.style.width = `${size}px`;
    d.style.height = `${size}px`;
    d.style.left = `${Math.random() * (w - size)}px`;
    d.style.top = `${Math.random() * (h - size)}px`;
    d.style.animationDelay = `${Math.random() * 0.6}s`;
    d.style.transform = `rotate(${(Math.random() * 40 - 20).toFixed(1)}deg)`;

    flowerOverlay.appendChild(d);

    // Biraz sonra kendini temizlesin ki sayfa şişmesin
    setTimeout(() => d.remove(), 9000 + Math.random() * 4000);
  }
}

function openLetter() {
  if (!letterOverlay || !envelopeEl) return;
  letterOverlay.classList.add('is-visible');
  envelopeEl.classList.remove('is-open');
  // küçük bir gecikmeyle açılma hissi
  setTimeout(() => envelopeEl.classList.add('is-open'), 60);
}

function closeLetter() {
  if (!letterOverlay || !envelopeEl) return;
  envelopeEl.classList.remove('is-open');
  setTimeout(() => {
    letterOverlay.classList.remove('is-visible');
  }, 260);
}

btnFlower?.addEventListener('click', () => {
  spawnDaisies(14);
});

btnLetter?.addEventListener('click', () => {
  spawnDaisies(20);
  openLetter();
});

btnLetterClose?.addEventListener('click', closeLetter);

// Arka alana tıklayınca da kapansın
letterOverlay?.addEventListener('click', (e) => {
  if (e.target === letterOverlay) closeLetter();
});

// ESC ile kapatma
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && letterOverlay?.classList.contains('is-visible')) {
    closeLetter();
  }
});