// PlayAir Landing — Wariant A "Sibling"
// Ciemny, PBAC DNA: gradient primary (magenta→navy), Montserrat+Chivo,
// aurora hero, karty glass, co-brand z PBAC.

function PlayAirLandingA({ accent = 'pbac' }) {
  // accent: 'pbac' (magenta+navy), 'cyan' (cool blue)
  const accentCss = accent === 'cyan'
    ? { primary: 'linear-gradient(264deg, #0891b2 38%, #1A337F 100%)', icon: 'linear-gradient(120deg, #06b6d4 0%, #3D5EFF 100%)', button: 'linear-gradient(115deg, #1A337F 0%, rgba(8, 145, 178, 0.78) 100%)', a1: '#06b6d4', a2: '#3D5EFF' }
    : { primary: 'linear-gradient(264deg, #B31853 38%, #1A337F 100%)', icon: 'linear-gradient(120deg, #3D5EFF 0%, #DF396F 100%)', button: 'linear-gradient(115deg, #1A337F 0%, rgba(179, 24, 83, 0.78) 100%)', a1: '#3D5EFF', a2: '#B31853' };

  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: 'Chivo, sans-serif', minHeight: '100%', overflow: 'hidden' }}>
      <style>{`
        .pa-mont{font-family:Montserrat,sans-serif}
        .pa-aurora{background:linear-gradient(90deg,${accentCss.a1},${accentCss.a2},${accentCss.a1});background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:paAurora 8s linear infinite}
        @keyframes paAurora{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        .pa-glass{background:rgba(255,255,255,0.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:20px}
        .pa-dot{background-image:radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px);background-size:20px 20px}
        .pa-gradient-ring{position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:${accentCss.icon};-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s}
        .pa-card:hover .pa-gradient-ring{opacity:1}
        .pa-btn-grad{background:${accentCss.button}}
        .pa-grad-prim{background:${accentCss.primary}}
        .pa-grad-icon{background:${accentCss.icon}}
        .pa-scan::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(to bottom,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px);pointer-events:none;mix-blend-mode:overlay}
      `}</style>

      {/* ══════════ NAV ══════════ */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="assets/playair-logo.svg" alt="PlayAir" style={{ height: 32, filter: 'brightness(0) invert(1)' }} />
          </div>
          <nav style={{ display: 'flex', gap: 28, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
            {['Usługi', 'Strefa obsługi', 'Proces', 'Cennik', 'Kontakt'].map(l => (
              <a key={l} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Partner</span>
            <div style={{ padding: '6px 12px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }} className="pa-mont">PBAC</div>
          </div>
          <button className="pa-btn-grad" style={{ padding: '10px 20px', borderRadius: 999, border: 0, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Umów wizytę
          </button>
        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', minHeight: 720, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '80px 32px' }}>
        {/* Background layers */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 30%, rgba(61,94,255,0.25), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(179,24,83,0.2), transparent 50%)' }} />
        <div className="pa-grad-prim" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
        <div className="pa-scan" style={{ position: 'absolute', inset: 0 }} />
        {/* Giant logo watermark */}
        <img src="assets/playair-logo.svg" alt="" style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', height: 520, opacity: 0.04, filter: 'brightness(0) invert(1)' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>
            Pruszków · Południe i Zachód Warszawy
          </div>
          <h1 className="pa-mont" style={{ fontSize: 84, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2, margin: 0 }}>
            <span className="pa-aurora">Klimatyzacja</span> i pompy ciepła
            <br />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>w Twojej okolicy.</span>
          </h1>
          <p style={{ marginTop: 28, fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            PlayAir — lokalny partner PBAC dla Pruszkowa i zachodnich dzielnic Warszawy.
            Dobór, montaż, serwis i rekuperacja. Technicy pod ręką, nie za godzinę.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="pa-btn-grad" style={{ padding: '14px 32px', borderRadius: 999, border: 0, color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Umów pomiar — darmowy
            </button>
            <button style={{ padding: '14px 32px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Zadzwoń · 504 ___ ___
            </button>
          </div>

          {/* Stats strip */}
          <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, maxWidth: 720, margin: '72px auto 0' }}>
            {[
              ['< 60 min', 'dojazd w strefie'],
              ['10+', 'marek premium'],
              ['5 lat', 'gwarancji'],
              ['24 h', 'wycena'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="pa-mont" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CO-BRAND STRIP ══════════ */}
      <section style={{ padding: '40px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Oficjalny partner</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <img src="assets/playair-logo.svg" alt="PlayAir" style={{ height: 36, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />
            <div className="pa-mont" style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>PBAC</div>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', maxWidth: 420, lineHeight: 1.5 }}>
            Zaplecze warsztatowe, magazyn części i kontrakty serwisowe na poziomie warszawskiej centrali — lokalna ekipa pod Twoim adresem.
          </span>
        </div>
      </section>

      {/* ══════════ USŁUGI ══════════ */}
      <section style={{ position: 'relative', padding: '120px 32px', overflow: 'hidden' }}>
        <div className="pa-dot" style={{ position: 'absolute', inset: 0, maskImage: 'radial-gradient(700px, rgba(255,255,255,0.5), transparent)', WebkitMaskImage: 'radial-gradient(700px, rgba(255,255,255,0.5), transparent)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>/ 01 — Usługi</div>
            <h2 className="pa-mont" style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0 }}>
              Pięć rzeczy, które <span className="pa-aurora">robimy dobrze</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
            {[
              { title: 'Montaż klimatyzacji', desc: 'Split, multisplit, kasetonówki. Dobór po metrażu, ekspozycji i stylu życia — nie z katalogu.', icon: '❄', tall: true, span: 2 },
              { title: 'Pompy ciepła', desc: 'Powietrze-woda z magazynem energii. Samsung, Mitsubishi Heavy, Fujitsu.', icon: '🔥', span: 2 },
              { title: 'Rekuperacja', desc: 'Projekt + montaż centralny dla domów jednorodzinnych w Pruszkowie i okolicy.', icon: '◈', span: 2 },
              { title: 'Serwis i przeglądy', desc: 'Przeglądy roczne, czyszczenie, dezynfekcja. Umowy serwisowe z SLA do 24h.', icon: '⚙', span: 3 },
              { title: 'Doradztwo i wycena', desc: 'Pomiar u Ciebie w domu, 3 warianty cenowe, jasna specyfikacja. Bez ciśnienia.', icon: '✓', span: 3 },
            ].map((s, i) => (
              <div key={s.title} className="pa-card pa-glass" style={{ gridColumn: `span ${s.span}`, padding: 32, position: 'relative', cursor: 'pointer', minHeight: s.tall ? 260 : 220 }}>
                <div className="pa-gradient-ring" />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div className="pa-grad-icon" style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
                  <span className="pa-mont" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>0{i + 1}</span>
                </div>
                <h3 className="pa-mont" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 10px', letterSpacing: -0.3 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                <div style={{ position: 'absolute', bottom: 28, right: 32, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ KORZYŚCI — BENTO ══════════ */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>/ 02 — Dlaczego klimatyzacja</div>
              <h2 className="pa-mont" style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0, maxWidth: 720 }}>
                Komfort 365 dni w roku — <span className="pa-aurora">nie tylko latem</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 380, lineHeight: 1.6, margin: 0 }}>
              Nowoczesna klimatyzacja z pompą ciepła to ogrzewanie, chłodzenie i oczyszczanie powietrza w jednym urządzeniu.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {[
              { t: 'Chłodzenie', d: 'Komfort termiczny przez cały rok, nawet 40°C na zewnątrz', span: 2, h: 180 },
              { t: 'Grzanie zimą', d: 'Ogrzewa dom do −15°C na zewnątrz — pompa ciepła w klimatyzacji', span: 4, h: 180, feature: true },
              { t: '16 dB', d: 'Cisza w sypialni — ciszej niż szept', span: 3, h: 160, big: true },
              { t: 'A+++', d: 'Klasa energetyczna — do 3x tańsze ogrzewanie', span: 3, h: 160, big: true },
              { t: 'Filtracja HEPA', d: 'Kurz, pyłki, alergeny, bakterie — filtrowane w cyklu ciągłym', span: 2, h: 140 },
              { t: 'Smart sterowanie', d: 'Uruchomisz z pociągu zanim wrócisz do domu', span: 2, h: 140 },
              { t: 'Gwarancja 5 lat', d: 'Na urządzenie i montaż. Lokalny serwis w Pruszkowie.', span: 2, h: 140 },
            ].map((b, i) => (
              <div key={b.t} className="pa-glass" style={{
                gridColumn: `span ${b.span}`, minHeight: b.h, padding: 24, position: 'relative',
                background: b.feature ? 'linear-gradient(135deg, rgba(61,94,255,0.15), rgba(179,24,83,0.15))' : undefined
              }}>
                {b.big ? (
                  <>
                    <div className="pa-mont pa-aurora" style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{b.t}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>{b.d}</div>
                  </>
                ) : (
                  <>
                    <h3 className="pa-mont" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>{b.t}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>{b.d}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STREFA OBSŁUGI ══════════ */}
      <section style={{ padding: '120px 32px', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>/ 03 — Strefa obsługi</div>
              <h2 className="pa-mont" style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1.2, margin: '0 0 20px', lineHeight: 1.05 }}>
                Pruszków, <span className="pa-aurora">południe i zachód Warszawy.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 28 }}>
                Jesteśmy lokalnie — co znaczy, że na pomiar przyjedziemy w tym tygodniu, a na awaryjny serwis pod 24 h.
                Nie jesteś kolejnym adresem na trasie z drugiego końca miasta.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['Pruszków', 'Piastów', 'Ursus', 'Włochy', 'Raszyn', 'Michałowice', 'Nadarzyn', 'Janki', 'Piaseczno', 'Ożarów Maz.'].map(m => (
                  <div key={m} style={{ padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, background: accentCss.a1, borderRadius: '50%' }} />
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Stylized map */}
            <div className="pa-glass" style={{ padding: 32, aspectRatio: '1.3', position: 'relative', overflow: 'hidden' }}>
              <svg viewBox="0 0 400 320" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <radialGradient id="paHeat" cx="0.3" cy="0.45">
                    <stop offset="0%" stopColor={accentCss.a2} stopOpacity="0.5" />
                    <stop offset="60%" stopColor={accentCss.a1} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={accentCss.a1} stopOpacity="0" />
                  </radialGradient>
                  <pattern id="paGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="320" fill="url(#paGrid)" />
                {/* Warsaw outline abstract */}
                <path d="M200 60 Q260 80 280 140 Q300 200 260 240 Q200 270 140 250 Q90 220 90 160 Q90 100 140 70 Q170 55 200 60 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                {/* Coverage circle */}
                <circle cx="130" cy="170" r="110" fill="url(#paHeat)" />
                <circle cx="130" cy="170" r="110" fill="none" stroke={accentCss.a1} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
                {/* Pins */}
                {[
                  [130, 170, 'Pruszków', true],
                  [165, 155, 'Piastów'],
                  [190, 175, 'Ursus'],
                  [215, 165, 'Włochy'],
                  [165, 200, 'Raszyn'],
                  [120, 145, 'Michałowice'],
                  [95, 175, 'Nadarzyn'],
                  [230, 210, 'Janki'],
                ].map(([x, y, n, main]) => (
                  <g key={n}>
                    <circle cx={x} cy={y} r={main ? 8 : 4} fill={main ? accentCss.a2 : accentCss.a1} />
                    {main && <circle cx={x} cy={y} r="14" fill="none" stroke={accentCss.a2} strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>}
                    <text x={x + 12} y={y + 4} fill={main ? '#fff' : 'rgba(255,255,255,0.6)'} fontSize={main ? 12 : 10} fontFamily="Montserrat" fontWeight={main ? 700 : 500}>{n}</text>
                  </g>
                ))}
              </svg>
              <div style={{ position: 'absolute', bottom: 20, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span>Strefa 1 — dojazd gratis</span>
                <span>Baza · Pruszków</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROCES ══════════ */}
      <section style={{ padding: '120px 32px', background: 'rgba(26, 51, 127, 0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>/ 04 — Jak pracujemy</div>
            <h2 className="pa-mont" style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0 }}>
              Cztery kroki. <span className="pa-aurora">Siedem dni.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 48, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            {[
              { n: '01', t: 'Pomiar u Ciebie', d: 'Darmowy dojazd, konkretne pytania, foto inwentaryzacja. 45 minut.' },
              { n: '02', t: 'Trzy oferty', d: 'Budget / Pro / Premium. Jasna specyfikacja, ceny, terminy.' },
              { n: '03', t: 'Montaż', d: '1–2 dni robocze. Osłony na podłogi, porządek na koniec.' },
              { n: '04', t: 'Serwis', d: 'Rocznie przegląd, umowa SLA, szybki telefon awaryjny.' },
            ].map(s => (
              <div key={s.n} style={{ position: 'relative', textAlign: 'center' }}>
                <div className="pa-glass" style={{ width: 96, height: 96, margin: '0 auto 24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div className="pa-mont pa-aurora" style={{ fontSize: 28, fontWeight: 700 }}>{s.n}</div>
                </div>
                <h3 className="pa-mont" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>{s.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0, maxWidth: 220, marginLeft: 'auto', marginRight: 'auto' }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CENNIK ══════════ */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>/ 05 — Orientacyjne ceny</div>
            <h2 className="pa-mont" style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0 }}>
              Ile to kosztuje?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { tier: 'Budget', price: 'od 4 200 zł', desc: 'Jedno pomieszczenie do 35 m². Marka ekonomiczna, sprawdzony montaż.', feats: ['Split 2.5–3.5 kW', 'Pompa ciepła w klimatyzacji', '3 lata gwarancji', 'Pilot + podstawowy sterownik'] },
              { tier: 'Pro', price: 'od 6 800 zł', desc: 'Najczęściej wybierana klasa. Samsung / LG / Gree z WiFi.', feats: ['Split / multi 3.5–5 kW', 'Sterowanie przez app', '5 lat gwarancji', 'Filtr antyalergiczny', 'Cichy tryb sleep (19 dB)'], featured: true },
              { tier: 'Premium', price: 'od 11 400 zł', desc: 'Daikin / Mitsubishi. Ciche, estetyczne, inwerterowe z AI.', feats: ['Split / multi 5–7 kW', 'AI adaptive mode', '10 lat gwarancji', 'Designerska obudowa', 'Serwis priorytetowy 24h'] },
            ].map(p => (
              <div key={p.tier} className={p.featured ? '' : 'pa-glass'} style={{
                position: 'relative', padding: 36, borderRadius: 20,
                background: p.featured ? accentCss.primary : undefined,
                border: p.featured ? 0 : undefined
              }}>
                {p.featured && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#000', padding: '4px 14px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }} className="pa-mont">Najczęstszy wybór</div>}
                <div className="pa-mont" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 16 }}>{p.tier}</div>
                <div className="pa-mont" style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1, marginBottom: 8 }}>{p.price}</div>
                <p style={{ fontSize: 13, color: p.featured ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 24px' }}>{p.desc}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 20 }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.feats.map(f => (
                    <li key={f} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, color: p.featured ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.75)' }}>
                      <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra sections injected */}
      {window.PASectionBrands && <PASectionBrands accentCss={accentCss} p="pa" />}
      {window.PASectionProducts && <PASectionProducts accentCss={accentCss} p="pa" />}
      {window.PASectionCalculator && <PASectionCalculator accentCss={accentCss} p="pa" />}
      {window.PASectionReviewsBig && <PASectionReviewsBig accentCss={accentCss} p="pa" />}
      {window.PASectionCertificates && <PASectionCertificates accentCss={accentCss} p="pa" />}
      {window.PASectionFounder && <PASectionFounder accentCss={accentCss} p="pa" />}
      {window.PASectionBlog && <PASectionBlog accentCss={accentCss} p="pa" />}
      {window.PASectionFAQ && <PASectionFAQ accentCss={accentCss} p="pa" />}

      {/* ══════════ CTA ══════════ */}
      <section style={{ padding: '80px 32px 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ borderRadius: 28, padding: 64, position: 'relative', overflow: 'hidden', background: accentCss.primary }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.15), transparent)' }} />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Umów pomiar</div>
                <h2 className="pa-mont" style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1, margin: '0 0 16px', lineHeight: 1.05 }}>
                  Pomiar w tym tygodniu.
                  <br />Oferta w 24 h.
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
                  Dojazd gratis w strefie Pruszków + zachód. Brak ciśnienia, brak sztuczek cenowych — tylko konkretna specyfikacja.
                </p>
              </div>
              <div className="pa-glass" style={{ padding: 28, background: 'rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Zadzwoń teraz</div>
                <div className="pa-mont" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5, marginBottom: 16 }}>504 ___ ___</div>
                <button style={{ width: '100%', padding: '14px 20px', borderRadius: 999, border: 0, background: '#fff', color: '#000', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Umów przez formularz →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(26, 51, 127, 0.1)', padding: '60px 32px 32px' }}>
        <div className="pa-grad-prim" style={{ height: 1, marginBottom: 60, marginLeft: -32, marginRight: -32, marginTop: -60 }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <img src="assets/playair-logo.svg" alt="PlayAir" style={{ height: 40, filter: 'brightness(0) invert(1)', marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 16px', maxWidth: 300 }}>
              Lokalny partner PBAC. Klimatyzacja, pompy ciepła, rekuperacja — Pruszków + zachód Warszawy.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 'fit-content' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Partner</span>
              <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
              <span className="pa-mont" style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>PBAC</span>
            </div>
          </div>
          {[
            { h: 'Usługi', l: ['Klimatyzacja', 'Pompy ciepła', 'Serwis', 'Rekuperacja', 'Doradztwo'] },
            { h: 'Strefa', l: ['Pruszków', 'Piastów', 'Raszyn', 'Ursus', 'Nadarzyn'] },
            { h: 'Kontakt', l: ['+48 504 ___ ___', 'biuro@playair.pl', 'Pn–Pt 08:00–18:00', 'Pruszków, ul. ___'] },
          ].map(c => (
            <div key={c.h}>
              <h4 className="pa-mont" style={{ fontSize: 13, fontWeight: 700, margin: '0 0 16px' }}>{c.h}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {c.l.map(x => <li key={x} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1280, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          <span>© 2026 PlayAir. Oficjalny partner PBAC.</span>
          <span>Polityka prywatności</span>
        </div>
      </footer>
    </div>
  );
}

window.PlayAirLandingA = PlayAirLandingA;
