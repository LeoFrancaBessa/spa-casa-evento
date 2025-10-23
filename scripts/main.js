// Toggle menu mobile
const toggle = document.querySelector('[data-nav-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.hidden = expanded;
  });
}

// Animações de entrada
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Carregamento dinâmico do mapa
document.addEventListener('DOMContentLoaded', () => {
  const mapaWrapper = document.getElementById('mapa-wrapper');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mapaWrapper.innerHTML = `
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.939441665034!2d-44.2973!3d-2.5295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f69ef325142ea7%3A0x88a3cfcb13a3e7f2!2sSão%20Luís%2C%20MA!5e0!3m2!1spt-BR!2sbr!4v1695135338441!5m2!1spt-BR!2sbr"
            width="100%"
            height="350"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            title="Mapa mostrando a localização da Casa de Eventos em São Luís, Maranhão"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        `;
        observer.disconnect();
      }
    });
  }, { rootMargin: '100px' });

  observer.observe(mapaWrapper);
});