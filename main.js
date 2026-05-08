/* ============================================================
   TML - main.js
   ============================================================ */

// ===== NAVBAR SCROLL EFFECT =====
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });
}

// ===== BACK TO TOP BUTTON =====
const backTop = document.getElementById('backToTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  });
}

// ===== CONTACT FORM SUBMIT =====
function handleFormSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('contactName').value.trim();
  const phone   = document.getElementById('contactPhone').value.trim();
  const success = document.getElementById('formSuccess');
  if (!name || !phone) return;
  e.target.reset();
  if (success) {
    success.classList.remove('d-none');
    setTimeout(() => success.classList.add('d-none'), 5000);
  }
}

// ===== PRODUCT FILTER (san-pham.html) =====
const filterBtns = document.querySelectorAll('.tml-filter-btn');
const productItems = document.querySelectorAll('.product-item');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          // subtle fade-in
          item.style.animation = 'fadeInUp .4s ease';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ===== SCROLL REVEAL (lightweight) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.tml-product-card, .tml-why-card, .tml-mission-card, .tml-contact-card-v2, .tml-info-box, .tml-feature-mini'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(1.5rem)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});
