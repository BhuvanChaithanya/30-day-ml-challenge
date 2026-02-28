/**
 * script.js — Portfolio Interactivity
 * Handles: card rendering, search/filter, scroll-reveal, particles, nav effects
 */

/* ── Render Project Cards ─────────────────────────────────── */
function renderCards(projects) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    grid.innerHTML = '';

    if (projects.length === 0) {
        noResults.style.display = 'flex';
        return;
    }
    noResults.style.display = 'none';

    projects.forEach((p, i) => {
        const isClickable = p.status !== 'upcoming' && p.link !== '#';
        const isUpcoming = p.status === 'upcoming';

        const badgeLabel = {
            'completed': 'Completed',
            'in-progress': 'In Progress',
            'upcoming': 'Upcoming'
        }[p.status] || 'Upcoming';

        const tags = p.tags.map(t => `<span class="card-tag">${t}</span>`).join('');

        const linkHTML = isUpcoming
            ? `<span class="card-link card-link--disabled">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 17v-6m0 0V9m0 2h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
           Not yet available
         </span>`
            : `<a class="card-link" href="${p.link}" target="_blank" rel="noopener noreferrer">
           View Live Demo
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
         </a>`;

        const card = document.createElement('article');
        card.className = `project-card${isUpcoming ? ' project-card--upcoming' : ''}`;
        card.style.transitionDelay = `${(i % 3) * 0.07}s`;
        card.dataset.title = p.title.toLowerCase();
        card.dataset.tags = p.tags.join(' ').toLowerCase();
        card.dataset.status = p.status;

        card.innerHTML = `
      <div class="card-header">
        <span class="card-day">Day ${String(p.day).padStart(2, '0')}</span>
        <span class="badge badge--${p.status}">${badgeLabel}</span>
      </div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-summary">${p.summary}</p>
      <div class="card-tags">${tags}</div>
      <div class="card-footer">${linkHTML}</div>
    `;

        /* Magnetic glow effect on mouse move */
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });

        grid.appendChild(card);

        /* Staggered reveal */
        requestAnimationFrame(() => {
            setTimeout(() => card.classList.add('visible'), 80 + i * 45);
        });
    });

    /* Update progress bar */
    const completed = PROJECTS.filter(p => p.status === 'completed').length;
    const pct = Math.round((completed / 30) * 100);
    const fill = document.querySelector('.progress-bar-fill');
    if (fill) setTimeout(() => fill.style.width = `${pct}%`, 400);

    /* Update counter */
    const counter = document.getElementById('completed-count');
    if (counter) counter.textContent = completed;
}

/* ── Search + Filter ──────────────────────────────────────── */
function initFilter() {
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';
    let currentQuery = '';

    function applyFilter() {
        let filtered = PROJECTS;

        if (currentFilter !== 'all') {
            filtered = filtered.filter(p => p.status === currentFilter);
        }
        if (currentQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(currentQuery) ||
                p.tags.some(t => t.toLowerCase().includes(currentQuery)) ||
                p.summary.toLowerCase().includes(currentQuery)
            );
        }
        renderCards(filtered);
    }

    searchInput?.addEventListener('input', e => {
        currentQuery = e.target.value.trim().toLowerCase();
        applyFilter();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            applyFilter();
        });
    });
}

/* ── Scroll Reveal (IntersectionObserver) ─────────────────── */
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Sticky Nav ───────────────────────────────────────────── */
function initNav() {
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

/* ── Particle Canvas ──────────────────────────────────────── */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        const count = Math.min(Math.floor((W * H) / 14000), 70);
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + 0.4,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.5 + 0.2
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(252, 80%, 75%, ${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });

        /* Draw connecting lines between nearby particles */
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `hsla(252, 80%, 75%, ${0.1 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
}

/* ── Animated Counters ────────────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function initCounters() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.target, 10);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

/* ── Boot ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    renderCards(PROJECTS);
    initFilter();
    initReveal();
    initNav();
    initParticles();
    initCounters();
});
