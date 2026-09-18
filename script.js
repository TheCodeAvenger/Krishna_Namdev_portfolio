// ============================================================
// CLOCK
// ============================================================
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// BOOT SEQUENCE (typing animation) — signature moment
// ============================================================
const bootLines = [
  { text: 'booting portfolio_os v1.0 ...', cls: 'dim' },
  { text: 'loading user: krishna_namdev ...', cls: 'dim' },
  { text: 'status: online', cls: 'ok' },
  { text: '' },
  { text: 'whoami', cls: 'plain' },
  { text: '> Krishna Namdev — Aspiring Cloud Engineer', cls: 'amber' },
  { text: '' },
  { text: 'type ./about to continue, or use the menu →', cls: 'dim' }
];

const bootLogEl = document.getElementById('bootLog');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStaticBoot() {
  bootLogEl.innerHTML = bootLines
    .map(l => `<span class="${l.cls === 'ok' ? 'ok' : l.cls === 'dim' ? 'dim' : ''}">${l.text}</span>`)
    .join('\n');
}

async function typeBoot() {
  if (reduceMotion) { renderStaticBoot(); return; }

  for (const line of bootLines) {
    const lineEl = document.createElement('div');
    const span = document.createElement('span');
    if (line.cls === 'ok') span.className = 'ok';
    else if (line.cls === 'dim') span.className = 'dim';
    lineEl.appendChild(span);
    bootLogEl.appendChild(lineEl);

    for (const ch of line.text) {
      span.textContent += ch;
      await new Promise(r => setTimeout(r, 12));
    }
    await new Promise(r => setTimeout(r, 80));
  }

  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  cursor.textContent = ' ';
  bootLogEl.appendChild(cursor);
}

typeBoot();

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  Object.entries(PORTFOLIO_DATA.skills).forEach(([category, items]) => {
    const card = document.createElement('div');
    card.className = 'skill-category';
    card.innerHTML = `
      <h3>${category}</h3>
      <div class="skill-tags">
        ${items.map(i => `<span class="skill-tag">${i}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
// RENDER CERTIFICATIONS
// ============================================================
function renderCertifications() {
  const list = document.getElementById('certList');
  const statusLabel = { done: 'Done', 'in-progress': 'In Progress', planned: 'Planned' };
  PORTFOLIO_DATA.certifications.forEach(cert => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cert-main">
        <strong>${cert.name}</strong>
        <span class="cert-sub">${cert.issuer} · ${cert.date}</span>
      </div>
      <span class="status-tag status-${cert.status}">${statusLabel[cert.status] || cert.status}</span>
    `;
    list.appendChild(li);
  });
}

// ============================================================
// RENDER EDUCATION
// ============================================================
function renderEducation() {
  const list = document.getElementById('eduList');
  PORTFOLIO_DATA.education.forEach(edu => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="edu-main">
        <strong>${edu.degree}</strong>
        <span class="edu-sub">${edu.institute} · ${edu.duration}</span>
        ${edu.note ? `<span class="edu-sub">${edu.note}</span>` : ''}
      </div>
    `;
    list.appendChild(li);
  });
}

// ============================================================
// RENDER CONTACT
// ============================================================
function renderContact() {
  const list = document.getElementById('contactList');
  PORTFOLIO_DATA.contact.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="contact-label">${c.label}</span>
      <a class="contact-value" href="${c.href}" target="_blank" rel="noopener">${c.value}</a>
    `;
    list.appendChild(li);
  });
}

renderSkills();
renderCertifications();
renderEducation();
renderContact();

// ============================================================
// ACTIVE NAV HIGHLIGHTING ON SCROLL
// ============================================================
const sections = document.querySelectorAll('.pane');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(section => observer.observe(section));
