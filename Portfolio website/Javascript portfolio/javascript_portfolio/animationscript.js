// Reveal sections and cards smoothly as they enter the viewport.
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll(
    'section .section-head, section .card, section .project, .timeline-item, .skills .skill'
  );

  revealTargets.forEach((item, index) => {
    item.classList.add('reveal');
    if (item.classList.contains('skill')) item.style.transitionDelay = `${(index % 8) * 45}ms`;
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
    );

    revealTargets.forEach(item => observer.observe(item));
  } else {
    revealTargets.forEach(item => item.classList.add('is-visible'));
  }

  // Highlight the navigation link for the section currently in view.
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px' }
    );

    sections.forEach(section => navObserver.observe(section));
  }
});
