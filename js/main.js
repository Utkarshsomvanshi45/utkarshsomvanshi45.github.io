// ---- Page transitions ----
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('http') ||
      link.hasAttribute('download') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(6px)';
      document.body.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
      setTimeout(() => { window.location.href = href; }, 230);
    });
  });
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ---- Project filter (projects page only) ----
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
const caseStudies = document.querySelectorAll('.case-study');

if (filterChips.length) {
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;

      projectCards.forEach((card, i) => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
        // also hide/show associated case study
        if (caseStudies[i]) {
          caseStudies[i].style.display = show ? '' : 'none';
        }
      });
    });
  });
}

// ---- Active nav link ----
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href').replace('../', '').replace('./', ''))) {
    link.classList.add('active');
  }
});

// ---- Smooth anchor scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
