// ===== GEOKE Main JS =====

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initFAQ();
  initQuadrant();
  initScrollAnimations();
});

// ===== Navigation =====
function initNav() {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });
}

// ===== FAQ Accordion =====
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== AI Influence Quadrant (SVG) =====
function initQuadrant() {
  const container = document.getElementById('quadrantChart');
  if (!container) return;

  const size = 440;
  const pad = 40;
  const inner = size - pad * 2;
  const mid = pad + inner / 2;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('class', 'quadrant-svg');
  svg.style.maxWidth = '480px';

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  // Background quadrants
  const quads = [
    { x: pad, y: pad, label: 'EMERGING', color: 'rgba(124,58,237,0.06)' },
    { x: mid, y: pad, label: 'LEADER', color: 'rgba(124,58,237,0.14)' },
    { x: pad, y: mid, label: 'WEAK', color: 'rgba(255,255,255,0.02)' },
    { x: mid, y: mid, label: 'CONTROVERSIAL', color: 'rgba(239,68,68,0.06)' },
  ];

  quads.forEach(function (q) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', q.x);
    rect.setAttribute('y', q.y);
    rect.setAttribute('width', inner / 2);
    rect.setAttribute('height', inner / 2);
    rect.setAttribute('fill', q.color);
    rect.setAttribute('stroke', 'rgba(255,255,255,0.07)');
    rect.setAttribute('stroke-width', '1');
    svg.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', q.x + 8);
    text.setAttribute('y', q.y + 16);
    text.setAttribute('font-family', 'JetBrains Mono, monospace');
    text.setAttribute('font-size', '8');
    text.setAttribute('letter-spacing', '0.12em');
    text.setAttribute('fill', 'rgba(255,255,255,0.2)');
    text.textContent = q.label;
    svg.appendChild(text);
  });

  // Axes
  const axisStyle = { stroke: 'rgba(255,255,255,0.12)', strokeWidth: '1', strokeDasharray: '4 4' };
  function line(x1, y1, x2, y2) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el.setAttribute('x1', x1); el.setAttribute('y1', y1);
    el.setAttribute('x2', x2); el.setAttribute('y2', y2);
    el.setAttribute('stroke', axisStyle.stroke);
    el.setAttribute('stroke-width', axisStyle.strokeWidth);
    el.setAttribute('stroke-dasharray', axisStyle.strokeDasharray);
    return el;
  }
  svg.appendChild(line(mid, pad, mid, pad + inner));
  svg.appendChild(line(pad, mid, pad + inner, mid));

  // Axis labels
  function axisLabel(x, y, text, anchor) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('font-family', 'JetBrains Mono, monospace');
    el.setAttribute('font-size', '9');
    el.setAttribute('letter-spacing', '0.1em');
    el.setAttribute('fill', 'rgba(255,255,255,0.35)');
    el.setAttribute('text-anchor', anchor || 'middle');
    el.textContent = text;
    return el;
  }
  svg.appendChild(axisLabel(mid, size - 8, '← LOW VISIBILITY   HIGH VISIBILITY →'));
  const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yLabel.setAttribute('x', 10);
  yLabel.setAttribute('y', mid);
  yLabel.setAttribute('font-family', 'JetBrains Mono, monospace');
  yLabel.setAttribute('font-size', '9');
  yLabel.setAttribute('letter-spacing', '0.1em');
  yLabel.setAttribute('fill', 'rgba(255,255,255,0.35)');
  yLabel.setAttribute('text-anchor', 'middle');
  yLabel.setAttribute('transform', `rotate(-90, 10, ${mid})`);
  yLabel.textContent = 'AI SENTIMENT ↑';
  svg.appendChild(yLabel);

  // Data points
  const points = [
    { cx: mid + inner * 0.22, cy: pad + inner * 0.18, r: 10, color: '#7C3AED', label: 'YOU', sub: 'Leader', glow: true },
    { cx: mid + inner * 0.32, cy: pad + inner * 0.12, r: 7, color: 'rgba(255,255,255,0.3)', label: 'Comp A', sub: '' },
    { cx: pad + inner * 0.18, cy: pad + inner * 0.25, r: 6, color: 'rgba(255,255,255,0.18)', label: 'Comp B', sub: '' },
    { cx: pad + inner * 0.32, cy: mid + inner * 0.28, r: 5, color: 'rgba(255,255,255,0.12)', label: 'Comp C', sub: '' },
    { cx: mid + inner * 0.28, cy: mid + inner * 0.22, r: 5, color: 'rgba(239,68,68,0.5)', label: 'Comp D', sub: '' },
  ];

  points.forEach(function (p) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'quadrant-point');
    g.style.cursor = 'pointer';

    if (p.glow) {
      const gCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      gCircle.setAttribute('cx', p.cx);
      gCircle.setAttribute('cy', p.cy);
      gCircle.setAttribute('r', p.r + 6);
      gCircle.setAttribute('fill', 'rgba(124,58,237,0.2)');
      g.appendChild(gCircle);
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.cx);
    circle.setAttribute('cy', p.cy);
    circle.setAttribute('r', p.r);
    circle.setAttribute('fill', p.color);
    if (p.glow) circle.setAttribute('filter', 'url(#glow)');
    g.appendChild(circle);

    if (p.label) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', p.cx);
      t.setAttribute('y', p.cy - p.r - 5);
      t.setAttribute('font-family', 'Plus Jakarta Sans, sans-serif');
      t.setAttribute('font-size', p.glow ? '10' : '8');
      t.setAttribute('font-weight', p.glow ? '800' : '500');
      t.setAttribute('fill', p.glow ? '#fff' : 'rgba(255,255,255,0.5)');
      t.setAttribute('text-anchor', 'middle');
      t.textContent = p.label;
      g.appendChild(t);
    }

    svg.appendChild(g);
  });

  // Live badge
  const liveBadge = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const liveDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  liveDot.setAttribute('cx', pad + 6); liveDot.setAttribute('cy', pad - 12);
  liveDot.setAttribute('r', 4); liveDot.setAttribute('fill', '#10B981');
  const liveText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  liveText.setAttribute('x', pad + 14); liveText.setAttribute('y', pad - 8);
  liveText.setAttribute('font-family', 'JetBrains Mono, monospace');
  liveText.setAttribute('font-size', '9'); liveText.setAttribute('fill', '#10B981');
  liveText.setAttribute('letter-spacing', '0.1em'); liveText.textContent = 'LIVE';
  liveBadge.appendChild(liveDot); liveBadge.appendChild(liveText);
  svg.appendChild(liveBadge);

  container.appendChild(svg);

  // Pulsing animation for YOU dot
  const youDot = svg.querySelector('.quadrant-point circle[filter]');
  if (youDot) {
    let scale = 1;
    let dir = 0.002;
    function pulse() {
      scale += dir;
      if (scale >= 1.15 || scale <= 0.92) dir *= -1;
      youDot.setAttribute('r', 10 * scale);
      requestAnimationFrame(pulse);
    }
    pulse();
  }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });
}
