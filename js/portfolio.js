/* ─── Portafolio de Pau · interacciones compartidas ─── */
(function(){
  const palette = ['var(--pink)','var(--blue)','var(--yellow)','var(--purple)','var(--mint)'];
  const kinds   = ['spark','fivestar'];

  /* Generar estrellitas decorativas dentro de cada .stars-layer */
  document.querySelectorAll('.stars-layer').forEach(layer=>{
    const n = parseInt(layer.dataset.stars || '5', 10);
    for(let i=0;i<n;i++){
      const star = document.createElement('div');
      const kind = kinds[Math.floor(Math.random()*kinds.length)];
      star.className = 'star ' + kind;
      const size = 22 + Math.random()*40;
      star.style.width = star.style.height = size+'px';
      star.style.left = (3 + Math.random()*90) + '%';
      star.style.top  = (5 + Math.random()*86) + '%';
      star.style.transitionDelay = (Math.random()*0.4).toFixed(2)+'s';
      const shape = document.createElement('span');
      shape.className = 'shape ' + kind;
      shape.style.background = palette[Math.floor(Math.random()*palette.length)];
      star.appendChild(shape);
      layer.appendChild(star);
    }
  });

  /* Pop-up al entrar en viewport (estrellas + tarjetas pop-up) */
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const els = e.target.matches('.popups')
        ? e.target.querySelectorAll('.popup')
        : e.target.querySelectorAll('.star');
      els.forEach((el,idx)=>{
        if(e.isIntersecting){
          el.style.transitionDelay = (idx*0.09).toFixed(2)+'s';
          el.classList.add('pop');
        } else {
          el.classList.remove('pop');
        }
      });
    });
  }, { threshold:0.18 });

  document.querySelectorAll('.stars-layer, .popups').forEach(l=>io.observe(l));
})();
