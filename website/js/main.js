/* ===== MOBILE NAV TOGGLE ===== */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.textContent = isOpen ? '\u2715' : '\u2630';
      toggle.setAttribute('aria-expanded', isOpen);
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '\u2630';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ===== LAZY LOAD IMAGES ===== */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
    }
  });
});

/* ===== LIGHTBOX ===== */
class Lightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.el = null;
    this.init();
  }

  init() {
    // Create lightbox DOM
    this.el = document.createElement('div');
    this.el.className = 'lightbox';
    this.el.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
      <img src="" alt="">
      <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(this.el);

    this.img = this.el.querySelector('img');
    this.counter = this.el.querySelector('.lightbox-counter');

    // Events
    this.el.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    this.el.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    this.el.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.el.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Bind to gallery images
    document.querySelectorAll('.gallery-grid a[data-lightbox]').forEach((a, i) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.images = Array.from(document.querySelectorAll('.gallery-grid a[data-lightbox]'))
          .map(el => el.getAttribute('href'));
        this.open(Array.from(document.querySelectorAll('.gallery-grid a[data-lightbox]')).indexOf(a));
      });
    });
  }

  open(index) {
    this.currentIndex = index;
    this.update();
    this.el.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.el.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.update();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.update();
  }

  update() {
    this.img.src = this.images[this.currentIndex];
    this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.gallery-grid')) {
    new Lightbox();
  }
});

/* ===== CONTACT FORM ===== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Build mailto link as fallback (replace with form service when ready)
    const subject = encodeURIComponent('SAS Website Contact');
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contact@sinnersamongsaints.com?subject=${subject}&body=${body}`;
  });
});
