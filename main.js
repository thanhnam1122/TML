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

// ===== PRODUCT FILTER + PAGINATION (san-pham.html) =====
const filterBtns   = document.querySelectorAll('.tml-filter-btn');
const productItems = document.querySelectorAll('.product-item');
const paginationEl = document.getElementById('productPagination');

const ITEMS_PER_PAGE = 6;
let currentPage     = 1;
let currentFilter   = 'all';

function getVisibleItems() {
  return Array.from(productItems).filter(item => {
    if (currentFilter === 'all') return true;
    return item.getAttribute('data-category') === currentFilter;
  });
}

function renderPage(page) {
  const visible = getVisibleItems();
  const totalPages = Math.ceil(visible.length / ITEMS_PER_PAGE);
  currentPage = Math.max(1, Math.min(page, totalPages));

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end   = start + ITEMS_PER_PAGE;

  // Show/hide items
  productItems.forEach(item => item.classList.add('hidden'));
  visible.forEach((item, idx) => {
    if (idx >= start && idx < end) {
      item.classList.remove('hidden');
      item.style.animation = 'fadeInUp .35s ease';
    }
  });

  // Render pagination buttons
  if (!paginationEl) return;
  if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

  let html = '<nav aria-label="Phân trang sản phẩm"><ul class="pagination justify-content-center mb-0">';

  // Prev
  html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
    <button class="page-link tml-page-link" onclick="goToPage(${currentPage - 1})" aria-label="Trang trước">
      <i class="bi bi-chevron-left"></i>
    </button></li>`;

  // Pages
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
      <button class="page-link tml-page-link" onclick="goToPage(${i})">${i}</button></li>`;
  }

  // Next
  html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
    <button class="page-link tml-page-link" onclick="goToPage(${currentPage + 1})" aria-label="Trang sau">
      <i class="bi bi-chevron-right"></i>
    </button></li>`;

  html += '</ul></nav>';
  paginationEl.innerHTML = html;
}

function goToPage(page) {
  renderPage(page);
  // Scroll nhẹ về đầu lưới sản phẩm
  const grid = document.getElementById('products');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      currentPage   = 1;
      renderPage(1);
    });
  });

  // Khởi tạo lần đầu
  renderPage(1);
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
