// PlayAir B enhancements v2 — context-matched stock photos + SVG illustrations
// Photos chosen per-section to match copy; SVG decorative layers added.

(function () {
  const U = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

  // Curated, contextually matched
  const PHOTOS = {
    heroRoom:    U('1554995207-c18c203602cb', 1800), // bright modern living room w/ AC
    heroAlt:     U('1616046229478-9901c5536a45', 1800), // minimalist interior bright
    technician:  U('1621905251189-08b45d6a269e', 1200), // HVAC technician working
    technician2: U('1504328345606-18bbc8c9d7d1', 1000), // repair hands with tools
    teamMeasure: U('1581092160607-ee22621dd758', 1000), // measuring with tools
    heatpump:    U('1625961332771-3f40b0e2bdcf', 900),  // outdoor HVAC unit
    service:     U('1581092160562-40aa08e78837', 900),  // inspection / service
    bedroom:     U('1540518614846-7eded433c457', 900),  // cozy bedroom
    kitchen:     U('1600566753190-17f0baa2a6c3', 900),  // modern kitchen
    interior:    U('1600585154340-be6161a56a0c', 1200), // modern living
    house:       U('1564013799919-ab600027ffc6', 1200), // suburban home exterior
    map:         U('1569336415962-a4bd9f69cd83', 1200), // aerial suburb
    founder:     U('1560250097-0b93528c311a', 600),    // friendly man portrait
    client1:     U('1573496359142-b8d87734a5a2', 400), // woman portrait
    client2:     U('1500648767791-00dcc994a43e', 400), // man portrait
    client3:     U('1438761681033-6461ffad8d80', 400), // woman portrait 2
    acDetail:    U('1586339949216-35c890863684', 800), // AC vents close-up
  };

  // ─── PRODUCT ILLUSTRATIONS ─── clean SVG renderings of AC indoor units per model
  const AC_SVG = (opts) => {
    const { bg = '#e8ecf2', body = '#ffffff', bodyDark = '#d4dae3', accent = '#3D5EFF', vent = '#1a1f2b', led = '#22c55e', display = 'AUTO', shape = 'slim', logo = '' } = opts;
    const isMirror = shape === 'mirror';
    const isCompact = shape === 'compact';
    const w = 800, h = 500;
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="acbg${accent.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="1" stop-color="${bg}" stop-opacity=".6"/>
        </linearGradient>
        <linearGradient id="acbody${accent.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${body}"/>
          <stop offset="1" stop-color="${bodyDark}"/>
        </linearGradient>
        <linearGradient id="accent${accent.replace('#','')}" x1="0" x2="1">
          <stop offset="0" stop-color="${accent}" stop-opacity=".2"/>
          <stop offset=".5" stop-color="${accent}"/>
          <stop offset="1" stop-color="${accent}" stop-opacity=".2"/>
        </linearGradient>
      </defs>
      <!-- background -->
      <rect width="${w}" height="${h}" fill="url(#acbg${accent.replace('#','')})"/>
      <!-- wall shadow -->
      <ellipse cx="400" cy="420" rx="280" ry="14" fill="#000" opacity=".08"/>
      <!-- AC body -->
      <g transform="translate(120 140)">
        <!-- main body -->
        <rect x="0" y="0" width="560" height="${isCompact ? 140 : 180}" rx="${isMirror ? 6 : 18}" fill="url(#acbody${accent.replace('#','')})" stroke="${bodyDark}" stroke-width="1"/>
        ${isMirror ? `
          <!-- mirror finish -->
          <rect x="14" y="14" width="532" height="${isCompact ? 112 : 152}" rx="2" fill="#1a1f2b"/>
          <rect x="14" y="14" width="532" height="${isCompact ? 112 : 152}" rx="2" fill="url(#accent${accent.replace('#','')})" opacity=".35"/>
          <rect x="14" y="14" width="532" height="30" fill="#fff" opacity=".08"/>
        ` : `
          <!-- top vent slats -->
          ${Array.from({length: 14},(_,i)=>`<rect x="${30 + i*36}" y="18" width="26" height="3" rx="1" fill="${bodyDark}" opacity=".5"/>`).join('')}
          <!-- center accent strip -->
          <rect x="30" y="${isCompact ? 70 : 90}" width="500" height="2" fill="url(#accent${accent.replace('#','')})"/>
          <!-- bottom vent flap -->
          <rect x="20" y="${isCompact ? 110 : 150}" width="520" height="22" rx="3" fill="${vent}" opacity=".85"/>
          <rect x="20" y="${isCompact ? 110 : 150}" width="520" height="4" fill="#000" opacity=".3"/>
        `}
        <!-- LED display area -->
        <g transform="translate(380 ${isMirror ? 30 : (isCompact ? 44 : 54)})">
          <rect x="0" y="0" width="140" height="34" rx="4" fill="#0a0a0a"/>
          <text x="70" y="22" font-family="Menlo, monospace" font-size="14" fill="${led}" text-anchor="middle" letter-spacing="2">${display}</text>
        </g>
        <!-- power LED -->
        <circle cx="44" cy="${isMirror ? 44 : (isCompact ? 54 : 70)}" r="3" fill="${led}"/>
        <circle cx="44" cy="${isMirror ? 44 : (isCompact ? 54 : 70)}" r="7" fill="${led}" opacity=".25"/>
        <!-- brand logotype area (subtle) -->
        ${logo ? `<text x="40" y="${isMirror ? 96 : (isCompact ? 100 : 130)}" font-family="system-ui, sans-serif" font-size="11" fill="${bodyDark}" font-weight="600" letter-spacing="2">${logo}</text>` : ''}
      </g>
      <!-- airflow lines coming out bottom -->
      <g stroke="${accent}" stroke-width="1.2" fill="none" opacity=".55" stroke-linecap="round">
        <path d="M200 340 Q 210 360, 200 380 T 200 410"/>
        <path d="M280 340 Q 290 360, 280 380 T 280 410"/>
        <path d="M360 340 Q 370 360, 360 380 T 360 410"/>
        <path d="M440 340 Q 450 360, 440 380 T 440 410"/>
        <path d="M520 340 Q 530 360, 520 380 T 520 410"/>
        <path d="M600 340 Q 610 360, 600 380 T 600 410"/>
      </g>
    </svg>`;
  };

  const PRODUCT_SVG = {
    'Wind-Free Elite':  AC_SVG({ bg:'#eef2f7', accent:'#1428A0', display:'23°', logo:'SAMSUNG', shape:'slim' }),
    'ArtCool Mirror':   AC_SVG({ bg:'#1a1a1a', body:'#2a2a2a', bodyDark:'#0a0a0a', accent:'#A50034', display:'22°', logo:'LG', shape:'mirror' }),
    'Perfera FTXM':     AC_SVG({ bg:'#f5f6f8', body:'#fafbfc', accent:'#0097E0', display:'21°', logo:'DAIKIN', shape:'slim' }),
    'Heavy SRK ZSX':    AC_SVG({ bg:'#eaedf0', accent:'#E60012', display:'24°', logo:'MHI', shape:'slim' }),
    'Amber Prestige':   AC_SVG({ bg:'#f0ece4', body:'#fff', accent:'#C89F5C', display:'22°', logo:'HAIER', shape:'slim' }),
    'Seiya Classic':    AC_SVG({ bg:'#edeff2', accent:'#DC0022', display:'23°', logo:'TOSHIBA', shape:'compact' }),
  };

  // Fallback product images (not used when SVG matches)
  const PRODUCT_IMG = Array(6).fill(null);

  /* ─── SVG ILLUSTRATIONS ─── */
  const SVG = {
    // Airflow curves — decorative divider
    airflow: `<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;">
      <defs>
        <linearGradient id="paaf1" x1="0" x2="1">
          <stop offset="0" stop-color="#3D5EFF" stop-opacity="0"/>
          <stop offset=".5" stop-color="#3D5EFF" stop-opacity=".6"/>
          <stop offset="1" stop-color="#B31853" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0 60 Q 200 20, 400 60 T 800 60 T 1200 60" fill="none" stroke="url(#paaf1)" stroke-width="1.5"/>
      <path d="M0 80 Q 200 40, 400 80 T 800 80 T 1200 80" fill="none" stroke="url(#paaf1)" stroke-width="1" opacity=".5"/>
      <path d="M0 40 Q 200 80, 400 40 T 800 40 T 1200 40" fill="none" stroke="url(#paaf1)" stroke-width="1" opacity=".3"/>
    </svg>`,

    // Big decorative snowflake
    snowflake: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <g stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.4" stroke-linecap="round">
        ${[0,60,120].map(a=>`
          <g transform="rotate(${a} 100 100)">
            <line x1="100" y1="20" x2="100" y2="180"/>
            <line x1="100" y1="40" x2="85" y2="55"/>
            <line x1="100" y1="40" x2="115" y2="55"/>
            <line x1="100" y1="70" x2="90" y2="80"/>
            <line x1="100" y1="70" x2="110" y2="80"/>
            <line x1="100" y1="130" x2="85" y2="145"/>
            <line x1="100" y1="130" x2="115" y2="145"/>
            <line x1="100" y1="160" x2="90" y2="170"/>
            <line x1="100" y1="160" x2="110" y2="170"/>
          </g>
        `).join('')}
        <circle cx="100" cy="100" r="4" fill="currentColor"/>
      </g>
    </svg>`,

    // House with airflow lines
    houseAir: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <g fill="none" stroke="currentColor" stroke-width="1" opacity="0.35" stroke-linecap="round">
        <path d="M40 110 L120 50 L200 110 L200 170 L40 170 Z"/>
        <rect x="95" y="125" width="50" height="45"/>
        <rect x="60" y="120" width="25" height="25"/>
        <rect x="155" y="120" width="25" height="25"/>
        <line x1="120" y1="50" x2="120" y2="25"/>
        <circle cx="120" cy="22" r="3"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.5" stroke-linecap="round">
        <path d="M100 95 Q 110 100, 100 110 T 100 125"/>
        <path d="M120 95 Q 130 100, 120 110 T 120 125"/>
        <path d="M140 95 Q 150 100, 140 110 T 140 125"/>
      </g>
    </svg>`,

    // Thermometer with waves
    thermowave: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <g fill="none" stroke="currentColor" stroke-width="1" opacity="0.4" stroke-linecap="round">
        <rect x="90" y="40" width="20" height="110" rx="10"/>
        <circle cx="100" cy="160" r="18"/>
        <line x1="100" y1="60" x2="100" y2="140"/>
        <circle cx="100" cy="160" r="10" fill="currentColor" opacity="0.6"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="1" opacity="0.3" stroke-linecap="round">
        <path d="M40 70 Q 50 60, 60 70 T 80 70"/>
        <path d="M120 70 Q 130 60, 140 70 T 160 70"/>
        <path d="M40 100 Q 50 90, 60 100 T 80 100"/>
        <path d="M120 100 Q 130 90, 140 100 T 160 100"/>
      </g>
    </svg>`,

    // Radar / map pulse
    radar: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <g fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
        <circle cx="120" cy="120" r="30"/>
        <circle cx="120" cy="120" r="60"/>
        <circle cx="120" cy="120" r="90"/>
        <circle cx="120" cy="120" r="115" stroke-dasharray="2 4"/>
        <line x1="120" y1="10" x2="120" y2="230"/>
        <line x1="10" y1="120" x2="230" y2="120"/>
      </g>
      <circle cx="120" cy="120" r="5" fill="currentColor"/>
      <g fill="currentColor" opacity="0.8">
        <circle cx="150" cy="95" r="2.5"/>
        <circle cx="90" cy="140" r="2.5"/>
        <circle cx="165" cy="145" r="2.5"/>
        <circle cx="75" cy="95" r="2.5"/>
      </g>
    </svg>`,

    // Grid pattern for corners
    gridDot: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      ${Array.from({length:10},(_,y)=>Array.from({length:10},(_,x)=>
        `<circle cx="${x*20+10}" cy="${y*20+10}" r="1" fill="currentColor" opacity="${0.5-Math.max(Math.abs(x-5),Math.abs(y-5))*0.08}"/>`
      ).join('')).join('')}
    </svg>`,
  };

  function waitFor(selector, timeout = 6000) {
    return new Promise((resolve) => {
      const start = Date.now();
      (function check() {
        const el = document.querySelector(selector);
        if (el) return resolve(el);
        if (Date.now() - start > timeout) return resolve(null);
        requestAnimationFrame(check);
      })();
    });
  }

  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      @keyframes paFadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
      @keyframes paFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes paKenBurns { 0% { transform: scale(1.05) translate(0,0); } 100% { transform: scale(1.2) translate(-3%, -3%); } }
      @keyframes paFloat { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-12px) rotate(2deg); } }
      @keyframes paFloatRev { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(14px) rotate(-2deg); } }
      @keyframes paSpin { to { transform: rotate(360deg); } }
      @keyframes paPulse { 0%,100% { opacity: .3; } 50% { opacity: .7; } }

      .pa-reveal { opacity: 0; will-change: transform, opacity; }
      .pa-reveal.visible { animation: paFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

      .pa-hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
      .pa-hero-bg img {
        width: 110%; height: 110%; object-fit: cover; position: absolute; inset: 0;
        animation: paKenBurns 28s ease-in-out infinite alternate;
        filter: brightness(0.95) saturate(1.1) contrast(1.05);
      }
      .pa-hero-bg::after {
        content: ''; position: absolute; inset: 0;
        background:
          radial-gradient(ellipse at 75% 35%, rgba(61,94,255,0.15), transparent 60%),
          radial-gradient(ellipse at 25% 85%, rgba(179,24,83,0.15), transparent 60%),
          linear-gradient(180deg, rgba(10,10,10,0.05), rgba(10,10,10,0.25));
      }
      .pa-hero-spot {
        position: absolute; width: 500px; height: 500px; border-radius: 50%;
        background: radial-gradient(circle, rgba(61,94,255,0.18), transparent 70%);
        pointer-events: none; transform: translate(-50%, -50%);
        transition: opacity 0.4s; opacity: 0; z-index: 1; mix-blend-mode: screen;
      }

      .pa-img-card { position: relative; overflow: hidden; border-radius: 12px; background: #1a1a1a; }
      .pa-img-card img {
        width: 100%; height: 100%; object-fit: cover; display: block;
        transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .pa-img-card:hover img { transform: scale(1.08); }
      .pa-img-card::after {
        content: ''; position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.35));
      }

      .pa-product-img-wrap {
        position: relative; height: 180px; border-radius: 12px; overflow: hidden;
        background: #111;
      }
      .pa-product-img-wrap img {
        width: 100%; height: 100%; object-fit: cover; display: block;
        filter: brightness(0.88) contrast(1.05);
        transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s;
      }
      .pa-product-img-wrap:hover img { transform: scale(1.1); filter: brightness(1) contrast(1.1); }
      .pa-product-img-wrap::after {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(180deg, transparent 45%, rgba(10,10,10,0.6));
        pointer-events: none;
      }

      .pa-svg-dec { position: absolute; pointer-events: none; color: #fff; }
      .pa-svg-float { animation: paFloat 10s ease-in-out infinite; }
      .pa-svg-float-rev { animation: paFloatRev 12s ease-in-out infinite; }
      .pa-svg-spin { animation: paSpin 90s linear infinite; }

      .pa-avatar {
        width: 40px; height: 40px; border-radius: 50%; background-size: cover; background-position: center;
        border: 2px solid rgba(255,255,255,0.15); flex-shrink: 0;
      }

      .pa-benefit-bg {
        position: absolute; inset: 0; z-index: 0; border-radius: inherit; overflow: hidden;
      }
      .pa-benefit-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.15; filter: grayscale(0.3); }
      .pa-benefit-bg::after { content:''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,10,10,0.3), rgba(10,10,10,0.85)); }

      .pa-divider {
        height: 80px; margin: -40px 0; position: relative; overflow: hidden; pointer-events: none;
      }
    `;
    document.head.appendChild(s);
  }

  /* ─── ENHANCERS ─── */

  function enhanceHero() {
    const sections = document.querySelectorAll('section');
    let hero = null;
    for (const s of sections) {
      const h1 = s.querySelector('h1');
      if (h1 && /klimat/i.test(h1.textContent)) { hero = s; break; }
    }
    if (!hero || hero.dataset.paEnhanced) return;
    hero.dataset.paEnhanced = 'hero';
    hero.style.overflow = 'hidden';
    hero.style.isolation = 'isolate';
    hero.style.minHeight = '780px';

    const bg = document.createElement('div');
    bg.className = 'pa-hero-bg';
    bg.innerHTML = `<img src="${PHOTOS.heroRoom}" alt="" />`;
    hero.insertBefore(bg, hero.firstChild);

    // SVG decorative: large snowflake top-right, house-air bottom-left
    const dec1 = document.createElement('div');
    dec1.className = 'pa-svg-dec pa-svg-float-rev';
    dec1.style.cssText = 'right:-60px; top:60px; width:300px; height:300px; opacity:0.25; z-index:2;';
    dec1.innerHTML = SVG.snowflake;
    hero.appendChild(dec1);

    const dec2 = document.createElement('div');
    dec2.className = 'pa-svg-dec pa-svg-float';
    dec2.style.cssText = 'left:-20px; bottom:40px; width:240px; height:200px; opacity:0.2; z-index:2;';
    dec2.innerHTML = SVG.houseAir;
    hero.appendChild(dec2);

    // Spotlight
    const spot = document.createElement('div');
    spot.className = 'pa-hero-spot';
    hero.appendChild(spot);
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.left = (e.clientX - r.left) + 'px';
      spot.style.top = (e.clientY - r.top) + 'px';
      spot.style.opacity = 1;
    });
    hero.addEventListener('mouseleave', () => { spot.style.opacity = 0; });

    const inner = hero.querySelector(':scope > div');
    if (inner) { inner.style.position = 'relative'; inner.style.zIndex = 3; }

    const bgImg = bg.querySelector('img');
    window.addEventListener('scroll', () => {
      const y = Math.max(0, Math.min(window.scrollY, 900));
      bgImg.style.transform = `translateY(${y * 0.35}px)`;
    }, { passive: true });
  }

  function enhanceProducts() {
    // Target placeholder div (height:140px) inside each product card; use SVG keyed on card's h3 title
    document.querySelectorAll('div').forEach(ph => {
      const s = ph.getAttribute('style') || '';
      if (!/height:\s*140px/i.test(s)) return;
      if (ph.dataset.paProduct) return;
      const card = ph.closest('[class*="glass"]') || ph.parentElement;
      const h3 = card?.querySelector('h3');
      const title = h3?.textContent?.trim() || '';
      const svg = PRODUCT_SVG[title];
      if (!svg) return;
      ph.dataset.paProduct = '1';
      ph.setAttribute('style',
        s.replace(/height:\s*140px/i, 'height: 200px')
         .replace(/background:[^;]*;?/gi, '')
         .replace(/border:[^;]*;?/gi, '')
        + '; background:transparent; border:0; padding:0; overflow:hidden; border-radius:12px;');
      ph.innerHTML = svg;
    });
  }

  // Blog post photos by topic
  const BLOG_IMG = {
    'metraż':      U('1600585154340-be6161a56a0c', 700), // interior sizing
    'pompa':       U('1625961332771-3f40b0e2bdcf', 700), // heat pump
    'przegląd':    U('1581092160562-40aa08e78837', 700), // service
    'rekuperacja': U('1564013799919-ab600027ffc6', 700), // house
  };

  function enhanceBlog() {
    // Blog cards: div with border-radius:16px and overflow:hidden containing an h3 matching blog topic
    document.querySelectorAll('div').forEach(card => {
      const s = card.getAttribute('style') || '';
      if (!/border-radius:\s*16px/i.test(s) || !/overflow:\s*hidden/i.test(s)) return;
      const h3 = card.querySelector(':scope > div > h3, h3');
      if (!h3) return;
      const title = h3.textContent.toLowerCase();
      let src = null;
      if (title.includes('metraż')) src = U('1600585154340-be6161a56a0c', 700);
      else if (title.includes('pompa')) src = U('1621905251189-08b45d6a269e', 700);
      else if (title.includes('przegląd')) src = U('1581092160562-40aa08e78837', 700);
      else if (title.includes('rekuperacja')) src = U('1564013799919-ab600027ffc6', 700);
      if (!src) return;
      if (card.dataset.paBlog) return;
      card.dataset.paBlog = '1';
      // Find existing placeholder div (first child, height:180px) and replace
      const firstChild = card.firstElementChild;
      if (firstChild && /height:\s*180px/i.test(firstChild.getAttribute('style') || '')) {
        firstChild.innerHTML = `<img src="${src}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.9s;"/>`;
        firstChild.setAttribute('style', (firstChild.getAttribute('style') || '').replace(/background:[^;]*;?/gi, '') + '; background:#1a1a1a; overflow:hidden;');
        card.addEventListener('mouseenter', () => {
          const img = firstChild.querySelector('img');
          if (img) img.style.transform = 'scale(1.06)';
        });
        card.addEventListener('mouseleave', () => {
          const img = firstChild.querySelector('img');
          if (img) img.style.transform = 'scale(1)';
        });
      }
    });
  }

  function enhanceFounder() {
    document.querySelectorAll('div').forEach(el => {
      if (el.children.length === 0 && el.textContent && el.textContent.trim() === '[ zdjęcie założyciela ]') {
        el.textContent = '';
        el.style.background = `url(${PHOTOS.founder}) center/cover`;
        el.style.border = '2px solid rgba(255,255,255,0.15)';
      }
    });
  }

  function enhanceReviewAvatars() {
    const imgs = [PHOTOS.client1, PHOTOS.client2, PHOTOS.client3, PHOTOS.client1, PHOTOS.client2, PHOTOS.client3];
    let i = 0;
    // Target all 36px circular divs with linear-gradient background (initial letter avatars)
    document.querySelectorAll('div').forEach(el => {
      const s = el.getAttribute('style') || '';
      if (!/border-radius:\s*50%/i.test(s)) return;
      if (!/width:\s*36px/i.test(s)) return;
      if (!/linear-gradient/i.test(s)) return;
      if (el.dataset.paAvatar) return;
      el.dataset.paAvatar = '1';
      el.style.backgroundImage = `url(${imgs[i % imgs.length]})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.color = 'transparent';
      i++;
    });
  }

  function enhanceProcess() {
    const hs = document.querySelectorAll('h2');
    hs.forEach(h => {
      if (!/od telefonu do chłodnego/i.test(h.textContent)) return;
      const section = h.closest('section');
      if (!section || section.dataset.paEnhanced) return;
      section.dataset.paEnhanced = 'process';

      const timeline = Array.from(section.querySelectorAll('div')).find(d => {
        const s = d.getAttribute('style') || '';
        return s.includes('padding-left: 40px') || s.includes('paddingLeft: 40px');
      });
      if (!timeline) return;
      const parent = timeline.parentElement;
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start;';
      parent.insertBefore(wrap, timeline);
      wrap.appendChild(timeline);

      const side = document.createElement('div');
      side.style.cssText = 'position: sticky; top: 100px;';
      side.innerHTML = `
        <div class="pa-img-card" style="aspect-ratio: 4/5; margin-bottom: 16px;">
          <img src="${PHOTOS.technician}" alt="Montaż PlayAir" loading="lazy" />
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="pa-img-card" style="aspect-ratio: 1;">
            <img src="${PHOTOS.teamMeasure}" alt="Pomiar" loading="lazy" />
          </div>
          <div class="pa-img-card" style="aspect-ratio: 1;">
            <img src="${PHOTOS.service}" alt="Serwis" loading="lazy" />
          </div>
        </div>
      `;
      wrap.appendChild(side);
    });
  }

  function enhanceServices() {
    const hs = document.querySelectorAll('h2');
    hs.forEach(h => {
      if (!/Robimy pięć rzeczy/i.test(h.textContent)) return;
      const section = h.closest('section');
      if (!section || section.dataset.paEnhanced) return;
      section.dataset.paEnhanced = 'services';
      const container = Array.from(section.querySelectorAll('div')).find(d => (d.getAttribute('style') || '').includes('1320'));
      if (!container) return;

      const strip = document.createElement('div');
      strip.style.cssText = 'display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 64px;';
      const imgs = [
        { src: PHOTOS.interior, caption: 'Montaż ścienny' },
        { src: PHOTOS.heatpump, caption: 'Pompa ciepła' },
        { src: PHOTOS.technician2, caption: 'Serwis + SLA' },
        { src: PHOTOS.house, caption: 'Rekuperacja' },
      ];
      imgs.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'pa-img-card';
        card.style.cssText = `aspect-ratio: 3/4; ${i % 2 === 1 ? 'transform: translateY(32px);' : ''}`;
        card.innerHTML = `
          <img src="${item.src}" alt="${item.caption}" loading="lazy" />
          <div style="position:absolute;bottom:14px;left:14px;right:14px;z-index:2;font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#fff;">${item.caption}</div>
        `;
        strip.appendChild(card);
      });

      const list = Array.from(container.querySelectorAll('div')).find(d => {
        const s = d.getAttribute('style') || '';
        return s.includes('flex-direction: column') || s.includes('flexDirection: column');
      });
      if (list) container.insertBefore(strip, list);
    });
  }

  function enhanceZone() {
    // Strefa Pruszków — add aerial image alongside map
    const hs = document.querySelectorAll('h2');
    hs.forEach(h => {
      if (!/Pruszków/i.test(h.textContent) || !h.classList.contains('pb-mont')) return;
      const section = h.closest('section');
      if (!section || section.dataset.paEnhanced === 'zone') return;
      // Only the big zone section
      const isZone = /strefa obsługi|południowy.?zachód/i.test(section.textContent);
      if (!isZone) return;
      section.dataset.paEnhanced = 'zone';

      // Insert SVG radar decorative top-right of section
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      const rad = document.createElement('div');
      rad.className = 'pa-svg-dec pa-svg-spin';
      rad.style.cssText = 'right:-100px;top:60px;width:500px;height:500px;opacity:0.08;z-index:0;color:#3D5EFF;';
      rad.innerHTML = SVG.radar;
      section.appendChild(rad);
    });
  }

  function addSectionDividers() {
    // Add airflow SVG dividers between major sections (every 2nd boundary)
    const sections = Array.from(document.querySelectorAll('section')).filter(s => !s.dataset.paEnhanced || s.dataset.paEnhanced !== 'hero');
    sections.forEach((s, i) => {
      if (i % 2 !== 1) return;
      if (s.dataset.paDivider) return;
      s.dataset.paDivider = '1';
      const div = document.createElement('div');
      div.className = 'pa-divider';
      div.style.color = '#fff';
      div.innerHTML = SVG.airflow;
      s.insertBefore(div, s.firstChild);
    });
  }

  function observeReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('section').forEach(sec => {
      if (sec.dataset.paEnhanced === 'hero') return;
      sec.querySelectorAll(':scope > div, h2, h3').forEach((el, i) => {
        if (el.classList.contains('pa-reveal')) return;
        el.classList.add('pa-reveal');
        el.style.animationDelay = (i * 50) + 'ms';
        io.observe(el);
      });
    });
  }

  function countUp() {
    const elements = document.querySelectorAll('[class*="mont"]');
    const candidates = [];
    elements.forEach(el => {
      if (el.children.length > 0) return;
      const txt = el.textContent.trim();
      const m = txt.match(/^(<\s*)?(\d+)(\s*(?:\+|min|lat|km|h|%|°C|dB)?)?$/i);
      if (!m) return;
      const n = parseInt(m[2]);
      if (n < 3 || n > 10000) return;
      candidates.push({ el, n, prefix: m[1] || '', suffix: m[3] || '' });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const d = e.target.__counter;
        if (!d || d.done) return;
        d.done = true;
        const dur = 1400;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          e.target.textContent = d.prefix + Math.round(d.n * eased) + d.suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(e.target);
      });
    }, { threshold: 0.5 });

    candidates.forEach(c => {
      c.el.__counter = c;
      c.el.textContent = c.prefix + '0' + c.suffix;
      io.observe(c.el);
    });
  }

  async function init() {
    injectStyles();
    await waitFor('h1');
    await new Promise(r => setTimeout(r, 300));
    const safe = (fn, name) => { try { fn(); } catch (e) { console.warn('[PA]', name, e); } };
    safe(enhanceHero, 'hero');
    safe(enhanceProducts, 'products');
    safe(enhanceBlog, 'blog');
    safe(enhanceFounder, 'founder');
    safe(enhanceReviewAvatars, 'avatars');
    safe(enhanceProcess, 'process');
    safe(enhanceServices, 'services');
    safe(enhanceZone, 'zone');
    safe(addSectionDividers, 'dividers');
    safe(observeReveal, 'reveal');
    safe(countUp, 'counter');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
