// tab switching + render de materias

const tabs    = document.querySelectorAll('.nav-tabs button');
const panes   = document.querySelectorAll('.tab-pane');

function showTab(id) {
  panes.forEach(p => p.classList.toggle('active', p.id === id));
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  history.replaceState(null, '', '#' + id);
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => showTab(tab.dataset.tab));
});

// logo lleva a inicio
document.querySelector('.nav-logo').addEventListener('click', (e) => {
  e.preventDefault();
  showTab('inicio');
});

// tab inicial desde la URL
const hashTab = location.hash.replace('#', '');
if (hashTab && document.getElementById(hashTab)) {
  showTab(hashTab);
} else {
  showTab('inicio');
}

const BADGE = {
  'completado':  { label: 'listo',       css: 'bd-done' },
  'en-progreso': { label: 'en progreso', css: 'bd-wip'  },
  'pronto':      { label: 'pronto',      css: 'bd-soon' }
};

const COLOR_BAR = {
  pink:  'mb-pink',
  lav:   'mb-lav',
  mint:  'mb-mint',
  sky:   'mb-sky',
  peach: 'mb-peach'
};

function renderMaterias() {
  const grid = document.getElementById('materias-grid');
  if (!grid || typeof MATERIAS === 'undefined') return;

  grid.innerHTML = MATERIAS.map(m => {
    const colorClass = COLOR_BAR[m.color] || 'mb-pink';
    const proyHtml = m.proyectos.map(p => {
      const badge = BADGE[p.estado] || BADGE['pronto'];
      return `
        <li>
          <a href="${p.repo}" class="proj-item" target="_blank" rel="noopener">
            ${p.nombre}
            <span class="badge ${badge.css}">${badge.label}</span>
          </a>
        </li>`;
    }).join('');

    return `
      <article class="mat-card">
        <div class="mat-bar ${colorClass}">
          <div class="dots">
            <div class="dot-r"></div>
            <div class="dot-y"></div>
            <div class="dot-g"></div>
          </div>
          <span class="mat-title-txt">${m.periodo}</span>
        </div>
        <div class="mat-body">
          <p class="mat-period">${m.periodo}</p>
          <h3 class="mat-name">${m.nombre}</h3>
          <ul class="proj-list">${proyHtml}</ul>
        </div>
      </article>`;
  }).join('');
}

renderMaterias();
