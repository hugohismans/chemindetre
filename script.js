// =============================================
// Hydratation du contenu depuis content.json
// =============================================

(async function init() {
  let data;
  try {
    const res = await fetch('content.json?v=' + Date.now(), { cache: 'no-store' });
    data = await res.json();
  } catch (err) {
    console.error('Impossible de charger content.json', err);
    return;
  }

  hydrateDataKeys(data);
  renderServices(data.services);
  renderSejourPhotos(data.sejour);
  renderTemoignages(data.temoignages);
  renderContactDetails(data.contact);
  setupContactForm(data.contact);
  setupFormationBulle(data.formation_bulle);
  setupModals(data.services);
  setupNav();
})();

// =============================================
// Helpers
// =============================================

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

function hydrateDataKeys(data) {
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    const value = getPath(data, key);
    if (value == null) return;

    const attr = el.dataset.attr;
    const isHtml = el.hasAttribute('data-html');
    const list = el.dataset.list;
    const prefix = el.dataset.prefix || '';

    if (attr) {
      el.setAttribute(attr, value);
      return;
    }
    if (list && Array.isArray(value)) {
      el.innerHTML = '';
      value.forEach(item => {
        const node = document.createElement(list);
        if (isHtml) node.innerHTML = item;
        else node.textContent = item;
        el.appendChild(node);
      });
      return;
    }
    if (isHtml) {
      el.innerHTML = value;
      return;
    }
    el.textContent = prefix + value;
  });
}

function renderServices(services) {
  const grid = document.getElementById('services-grid');
  const tpl = document.getElementById('tpl-service-card');
  if (!grid || !tpl) return;
  grid.innerHTML = '';
  services.items.forEach(item => {
    const card = tpl.content.firstElementChild.cloneNode(true);
    card.dataset.modal = item.id;
    const img = card.querySelector('img');
    img.src = item.image;
    img.alt = item.title;
    card.querySelector('h3').textContent = item.title;
    card.querySelector('.service-desc').textContent = item.description;
    const tarif = card.querySelector('.service-tarif');
    if (item.tarif) tarif.textContent = item.tarif;
    else tarif.remove();
    grid.appendChild(card);
  });
}

function renderSejourPhotos(sejour) {
  const wrap = document.getElementById('sejour-photos');
  if (!wrap) return;
  wrap.outerHTML = sejour.photos
    .map(p => `<img src="${escapeAttr(p.src)}" alt="${escapeAttr(p.alt)}" class="sejour-photo" />`)
    .join('');
}

function renderTemoignages(temoignages) {
  const grid = document.getElementById('temoignages-grid');
  const tpl = document.getElementById('tpl-temoignage-card');
  if (!grid || !tpl) return;
  grid.innerHTML = '';
  temoignages.items.forEach(item => {
    const card = tpl.content.firstElementChild.cloneNode(true);
    card.querySelector('p').textContent = '« ' + item.quote + ' »';
    card.querySelector('.temoignage-name').textContent = item.author;
    grid.appendChild(card);
  });
}

function renderContactDetails(contact) {
  const ul = document.getElementById('contact-details');
  if (!ul) return;
  const parts = [
    `<li><span class="contact-icon">&#9993;</span><a href="mailto:${escapeAttr(contact.email)}">${escapeHtml(contact.email)}</a></li>`,
    `<li><span class="contact-icon">&#9742;</span><a href="tel:${escapeAttr(contact.phone_link)}">${escapeHtml(contact.phone_display)}</a></li>`,
    ...contact.addresses.map(addr =>
      `<li><span class="contact-icon">&#9679;</span>${escapeHtml(addr).replace(/\n/g, '<br>')}</li>`
    ),
  ];
  ul.innerHTML = parts.join('');
}

function setupContactForm(contact) {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.action = `https://formspree.io/f/${contact.formspree_id}`;
}

function setupFormationBulle(bulle) {
  if (!bulle || !bulle.active) return;
  const a = document.createElement('a');
  a.href = bulle.lien;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.className = 'formation-bulle';
  a.innerHTML = `<span class="formation-bulle-dot"></span>${escapeHtml(bulle.texte)} →`;
  document.body.appendChild(a);
}

// =============================================
// Modales (rendues dynamiquement par service)
// =============================================

function setupModals(services) {
  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');
  if (!overlay || !modalBody) return;

  const byId = Object.fromEntries(services.items.map(s => [s.id, s]));

  document.querySelectorAll('.service-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const item = byId[card.dataset.modal];
      if (!item) return;
      modalBody.innerHTML = renderModalContent(item.modal);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  modalBody.addEventListener('click', e => {
    if (e.target.classList.contains('modal-link')) closeModal();
  });
}

function renderModalContent(m) {
  const parts = [];
  parts.push(`<div class="modal-content">`);
  if (m.vignette) {
    const style = m.vignette.toLowerCase().endsWith('.png') && m.vignette.toLowerCase().includes('logo')
      ? ' style="max-width:160px;"' : '';
    parts.push(`<img src="${escapeAttr(m.vignette)}" alt="${escapeAttr(m.title)}" class="modal-vignette"${style} />`);
  }
  if (m.title) parts.push(`<h2>${escapeHtml(m.title)}</h2>`);
  if (m.subtitle) parts.push(`<h3>${escapeHtml(m.subtitle)}</h3>`);
  (m.paragraphs_html || []).forEach(p => parts.push(`<p>${p}</p>`));
  (m.images_extra || []).forEach((img, i) => {
    const margin = i > 0 ? ' margin-top:0.75rem;' : '';
    parts.push(`<img src="${escapeAttr(img)}" alt="" class="modal-vignette" style="max-width:100%; aspect-ratio:16/9; object-fit:cover;${margin}" />`);
  });
  if ((m.paragraphs_after_html || []).length || m.ateliers_intro || m.tarif_html || m.cta_text || m.pdf_url) {
    parts.push(`<div class="modal-divider"></div>`);
  }
  (m.paragraphs_after_html || []).forEach(p => parts.push(`<p>${p}</p>`));
  if (m.ateliers_intro) parts.push(`<p>${escapeHtml(m.ateliers_intro)}</p>`);
  if ((m.ateliers_liste || []).length) {
    parts.push(`<ul class="modal-list">${m.ateliers_liste.map(li => `<li>${escapeHtml(li)}</li>`).join('')}</ul>`);
  }
  if (m.tarif_html) {
    if (m.tarif_html.trim().startsWith('<p')) parts.push(m.tarif_html);
    else parts.push(`<p>${m.tarif_html}</p>`);
  }
  if (m.pdf_url) {
    parts.push(`<a href="${escapeAttr(m.pdf_url)}" download class="modal-pdf-btn">&#8681; ${escapeHtml(m.pdf_label || 'Télécharger')}</a>`);
  }
  if (m.cta_text && m.cta_link) {
    parts.push(`<a href="${escapeAttr(m.cta_link)}" class="modal-link">${escapeHtml(m.cta_text)}</a>`);
  }
  parts.push(`</div>`);
  return parts.join('');
}

// =============================================
// Nav, scroll, fade-in
// =============================================

function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const header = document.querySelector('.nav-header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(61,53,48,0.12)'
      : 'none';
  }, { passive: true });

  document.querySelectorAll('.fade-in').forEach(el => {
    new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    }, { threshold: 0.1 }).observe(el);
  });
}

// =============================================
// Escape utilities
// =============================================

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }
