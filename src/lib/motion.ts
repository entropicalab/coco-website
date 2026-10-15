// Scroll-driven motion. Does nothing unless <html> has the .motion class
// (set in <head> only when the visitor hasn't asked for reduced motion).
const root = document.documentElement;

if (root.classList.contains('motion')) {
  const targets = [...document.querySelectorAll<HTMLElement>('.figure, .rcard, .card, .amenity, .point, .canopy')];

  // Cards in the same grid arrive one after another
  document.querySelectorAll<HTMLElement>('.grid').forEach((grid) => {
    [...grid.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--d', `${Math.min(i, 6) * 90}ms`));
  });

  const reveal = (el: Element) => el.classList.add('is-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach(reveal);
  }

  // Canopies drift slowly against the scroll
  const canopies = [...document.querySelectorAll<HTMLElement>('.canopy')];
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    canopies.forEach((c) => {
      const r = c.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1 across the screen
      c.style.setProperty('--py', `${(p * -48).toFixed(1)}px`);
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
