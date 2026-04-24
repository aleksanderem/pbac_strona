// PlayAir Landing — Wariant B "Local Twist"
// Nadal ciemny + PBAC colors, ale inny rytm: split hero (big type + form),
// timeline-first proces, mocny akcent strefy, editorial pricing.

function PlayAirLandingB({ accent = 'pbac' }) {
  const accentCss = accent === 'cyan'
    ? { primary: 'linear-gradient(264deg, #0891b2 38%, #1A337F 100%)', icon: 'linear-gradient(120deg, #06b6d4 0%, #3D5EFF 100%)', button: 'linear-gradient(115deg, #1A337F 0%, rgba(8, 145, 178, 0.78) 100%)', a1: '#06b6d4', a2: '#3D5EFF' }
    : { primary: 'linear-gradient(264deg, #B31853 38%, #1A337F 100%)', icon: 'linear-gradient(120deg, #3D5EFF 0%, #DF396F 100%)', button: 'linear-gradient(115deg, #1A337F 0%, rgba(179, 24, 83, 0.78) 100%)', a1: '#3D5EFF', a2: '#B31853' };

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Chivo, sans-serif', minHeight: '100%', overflow: 'hidden' }}>
      <style>{`
        .pb-mont{font-family:Montserrat,sans-serif}
        .pb-aurora{background:linear-gradient(90deg,${accentCss.a1},${accentCss.a2},${accentCss.a1});background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:pbAurora 8s linear infinite}
        @keyframes pbAurora{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        .pb-glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:16px}
        .pb-grad-prim{background:${accentCss.primary}}
        .pb-grad-icon{background:${accentCss.icon}}
        .pb-btn-grad{background:${accentCss.button}}
        .pb-hairline{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)}
        .pb-numdot::before{content:"";width:4px;height:4px;background:${accentCss.a2};border-radius:50%;display:inline-block;margin-right:8px;vertical-align:middle}
      `}</style>

      {/* ══════════ NAV ══════════ */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)', background: 'rgba(10,10,10,0.75)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '18px 40px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="assets/playair-logo.svg" alt="PlayAir" style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Pruszków</span>
          </div>
          <nav style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', justifyContent: 'center' }}>
            {['Usługi', 'Strefa', 'Proces', 'Cennik', 'Kontakt'].map(l => (
              <a key={l} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end' }}>
            <a style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(34,197,94,0.2)' }} />
              504 ___ ___
            </a>
            <button className="pb-btn-grad" style={{ padding: '11px 22px', borderRadius: 6, border: 0, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Umów pomiar
            </button>
          </div>
        </div>
      </header>

      {/* ══════════ HERO — SPLIT ══════════ */}
      <section style={{ position: 'relative', padding: '60px 40px 100px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'center', minHeight: 640 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 14px 8px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }} />
              <span>Wolne terminy w tym tygodniu · Pruszków + 12 okolic</span>
            </div>

            <h1 className="pb-mont" style={{ fontSize: 110, lineHeight: 0.95, fontWeight: 700, letterSpacing: -4, margin: 0 }}>
              Klimat,
              <br />
              <span className="pb-aurora">który grzeje.</span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 60, letterSpacing: -2, fontWeight: 500 }}>Dosłownie.</span>
            </h1>
            <p style={{ marginTop: 32, fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.6 }}>
              PlayAir — klimatyzacja, pompy ciepła i rekuperacja dla domów i mieszkań na południu i zachodzie Warszawy.
              Lokalny zespół. Zaplecze partnerskie PBAC.
            </p>

            <div style={{ marginTop: 40, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Partner</span>
                <div style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6 }}>
                  <span className="pb-mont" style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>PBAC</span>
                </div>
              </div>
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', gap: 4 }}>
                {[0, 1, 2, 3, 4].map(i => <span key={i} style={{ color: '#fbbf24', fontSize: 14 }}>★</span>)}
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginLeft: 6 }}>4.9 · 180 opinii Google</span>
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div style={{ position: 'relative' }}>
            <div className="pb-grad-prim" style={{ position: 'absolute', inset: -20, filter: 'blur(60px)', opacity: 0.3, borderRadius: 40 }} />
            <div className="pb-glass" style={{ position: 'relative', padding: 36, borderRadius: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Pomiar u Ciebie</div>
              <h3 className="pb-mont" style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, margin: '0 0 24px' }}>Darmowy, bez zobowiązań</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Imię</label>
                  <input placeholder="Jan Kowalski" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Telefon</label>
                    <input placeholder="+48 504…" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Miasto</label>
                    <select style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
                      <option>Pruszków</option><option>Piastów</option><option>Raszyn</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Usługa</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                    {['Klimatyzacja', 'Pompa ciepła', 'Serwis', 'Rekuperacja'].map((s, i) => (
                      <button key={s} style={{ padding: '10px 12px', background: i === 0 ? accentCss.primary : 'rgba(255,255,255,0.05)', border: i === 0 ? 0 : '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12, cursor: 'pointer' }}>{s}</button>
                    ))}
                  </div>
                </div>
                <button className="pb-btn-grad" style={{ marginTop: 8, padding: '14px', borderRadius: 10, border: 0, color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Umów wizytę →
                </button>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Odpowiadamy w ciągu 60 minut w godz. pracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker stats */}
        <div style={{ maxWidth: 1320, margin: '60px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
          {[
            ['847', 'montaży'],
            ['< 60 min', 'dojazd'],
            ['5 lat', 'gwarancji'],
            ['10+', 'marek'],
            ['24 h', 'wycena'],
          ].map(([n, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="pb-mont" style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>{n}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ USŁUGI — LIST EDITORIAL ══════════ */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 2fr', gap: 60, marginBottom: 72 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ 01</div>
              <div className="pb-mont" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Usługi</div>
            </div>
            <h2 className="pb-mont" style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2.5, margin: 0, lineHeight: 1 }}>
              Robimy pięć rzeczy.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>I robimy je porządnie.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { n: '01', t: 'Montaż klimatyzacji', d: 'Splity, multisplity, kasetony. Dobór po ekspozycji i metrażu — nie po katalogu.', tags: ['Samsung', 'LG', 'Daikin', 'Gree', 'Toshiba'] },
              { n: '02', t: 'Pompy ciepła', d: 'Powietrze-woda dla domów jednorodzinnych. Współpraca z elektrykami, hydraulikami i projektantami.', tags: ['Samsung', 'Mitsubishi Heavy', 'Fujitsu', 'Neoheat'] },
              { n: '03', t: 'Serwis i przeglądy', d: 'Wszystkie marki, wszystkie urządzenia. Umowy SLA do 24 h reakcji.', tags: ['Czyszczenie', 'Dezynfekcja', 'Uzupełnianie czynnika', 'Umowy SLA'] },
              { n: '04', t: 'Rekuperacja', d: 'Pełny projekt + montaż centrali wentylacyjnej w domu. Świeże powietrze bez otwierania okien.', tags: ['Projekt', 'Montaż', 'Kanały', 'Odzysk ciepła 90%'] },
              { n: '05', t: 'Doradztwo i wycena', d: 'Pomiar u Ciebie, trzy warianty ofert, specyfikacja bez ukrytych kosztów.', tags: ['Wizja lokalna', 'Fotoinwentaryzacja', '3 warianty', 'Bez ukrytych opłat'] },
            ].map((s, i) => (
              <a key={s.n} style={{ padding: '32px 0', borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : undefined, borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '80px 1fr 360px 60px', gap: 40, alignItems: 'center', color: '#fff', textDecoration: 'none', transition: 'background .2s', cursor: 'pointer' }}>
                <div className="pb-mont" style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>{s.n} /</div>
                <div>
                  <div className="pb-mont" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.8, marginBottom: 6 }}>{s.t}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{s.d}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ padding: '4px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
                  ))}
                </div>
                <div style={{ textAlign: 'right', fontSize: 22, color: 'rgba(255,255,255,0.3)' }}>→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STREFA HERO — mocny lokalny akcent ══════════ */}
      <section style={{ position: 'relative', padding: '120px 40px', overflow: 'hidden', background: 'linear-gradient(180deg, transparent, rgba(26,51,127,0.12), transparent)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {/* LEFT: typography statement */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ 02 — Strefa obsługi</div>
              <h2 className="pb-mont" style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, margin: '0 0 16px', lineHeight: 0.95 }}>
                <span className="pb-aurora">Pruszków</span>
                <br />
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 32, letterSpacing: -0.5, fontWeight: 500 }}>+ południowy-zachód Warszawy</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                Mieszkamy i pracujemy tam, gdzie Ty. Na pomiar wpadamy w tym tygodniu, na awaryjny serwis pod 24 h. Bez trasy przez całe miasto.
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div className="pb-mont pb-aurora" style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>13</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>miejscowości w strefie</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <div className="pb-mont pb-aurora" style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>25 km</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>promień bazy · Pruszków</div>
                </div>
              </div>
            </div>

            {/* RIGHT: stylized map + city list */}
            <div>
              <div className="pb-glass" style={{ padding: 24, borderRadius: 20, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Mapa strefy</div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, background: accentCss.a2, borderRadius: '50%' }} />Baza</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, background: accentCss.a1, borderRadius: '50%' }} />Strefa</span>
                  </div>
                </div>
                <svg viewBox="0 0 500 340" style={{ width: '100%', display: 'block' }}>
                  <defs>
                    <radialGradient id="pbHeat" cx="0.35" cy="0.5">
                      <stop offset="0%" stopColor={accentCss.a2} stopOpacity="0.45" />
                      <stop offset="70%" stopColor={accentCss.a1} stopOpacity="0.1" />
                      <stop offset="100%" stopColor={accentCss.a1} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Roads */}
                  <g stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none">
                    <path d="M0 170 Q150 150 280 170 T500 160" />
                    <path d="M170 0 Q180 150 200 180 T220 340" />
                    <path d="M0 80 Q150 200 500 250" strokeDasharray="2 4" />
                    <path d="M0 260 Q200 220 500 280" strokeDasharray="2 4" />
                  </g>
                  {/* Warsaw outline */}
                  <path d="M280 80 Q360 100 380 180 Q400 250 340 290 Q260 310 200 280 Q160 250 180 190 Q200 100 280 80 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
                  <text x="290" y="170" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Montserrat" letterSpacing="2">WARSZAWA</text>
                  {/* Coverage */}
                  <circle cx="170" cy="190" r="140" fill="url(#pbHeat)" />
                  <circle cx="170" cy="190" r="140" fill="none" stroke={accentCss.a1} strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
                  {/* Pins */}
                  {[
                    [170, 190, 'Pruszków', true],
                    [210, 170, 'Piastów'],
                    [240, 180, 'Ursus'],
                    [265, 200, 'Włochy'],
                    [215, 225, 'Raszyn'],
                    [150, 150, 'Michałowice'],
                    [110, 200, 'Nadarzyn'],
                    [260, 240, 'Janki'],
                    [250, 275, 'Piaseczno'],
                    [100, 120, 'Ożarów'],
                  ].map(([x, y, n, main]) => (
                    <g key={n}>
                      <circle cx={x} cy={y} r={main ? 7 : 3.5} fill={main ? accentCss.a2 : accentCss.a1} />
                      {main && (
                        <>
                          <circle cx={x} cy={y} r="14" fill="none" stroke={accentCss.a2} strokeWidth="1" opacity="0.6">
                            <animate attributeName="r" values="7;24;7" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      <text x={x + 10} y={y + 3} fill={main ? '#fff' : 'rgba(255,255,255,0.7)'} fontSize={main ? 13 : 10} fontFamily="Montserrat" fontWeight={main ? 700 : 500}>{n}</text>
                    </g>
                  ))}
                </svg>
              </div>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {['Pruszków', 'Piastów', 'Ursus', 'Włochy', 'Raszyn', 'Michałowice', 'Nadarzyn', 'Janki', 'Piaseczno', 'Ożarów M.', 'Komorów', 'Brwinów'].map(m => (
                  <div key={m} className="pb-numdot" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', padding: '6px 10px' }}>{m}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROCES — TIMELINE ══════════ */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ marginBottom: 80, display: 'grid', gridTemplateColumns: '0.8fr 2fr', gap: 60 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ 03</div>
              <div className="pb-mont" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Proces</div>
            </div>
            <h2 className="pb-mont" style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2.5, margin: 0, lineHeight: 1 }}>
              Od telefonu do chłodnego powietrza — <span className="pb-aurora">siedem dni.</span>
            </h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: 40 }}>
            <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 1, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            {[
              { d: 'Dzień 0', t: 'Telefon lub formularz', x: 'Odpowiadamy w ciągu 60 minut. Krótkie pytania o metraż, ekspozycję, potrzeby.' },
              { d: 'Dzień 1–2', t: 'Pomiar u Ciebie', x: 'Darmowy dojazd. 45 minut. Fotoinwentaryzacja, pytania techniczne, porada.' },
              { d: 'Dzień 3', t: 'Trzy oferty', x: 'Budget / Pro / Premium. Jasna specyfikacja, ceny, terminy. Zero ciśnienia.' },
              { d: 'Dzień 5–7', t: 'Montaż i start', x: 'Wybrany termin, osłony na podłogi, 1–2 dni robocze, porządek na koniec.' },
              { d: 'Po', t: 'Serwis i opieka', x: 'Rok gwarancji, umowa SLA, przegląd roczny. Jeden telefon, jedna ekipa.' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative', paddingBottom: 56, paddingLeft: 32 }}>
                <div className="pb-grad-icon" style={{ position: 'absolute', left: -40, top: 0, width: 16, height: 16, borderRadius: '50%', boxShadow: '0 0 0 4px #0a0a0a' }} />
                <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{s.d}</div>
                <h3 className="pb-mont" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, margin: '0 0 8px' }}>{s.t}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0, maxWidth: 560 }}>{s.x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CENNIK — EDITORIAL TABLE ══════════ */}
      <section style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ 04 — Cennik</div>
              <h2 className="pb-mont" style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, margin: 0, lineHeight: 1 }}>
                Trzy klasy.<br />
                <span className="pb-aurora">Jedna jakość montażu.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', maxWidth: 360, lineHeight: 1.6, margin: 0 }}>
              Ceny orientacyjne dla jednego pomieszczenia do 40 m². Ostateczna cena po darmowym pomiarze.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { tier: 'Budget', price: '4 200', desc: 'Pomieszczenie do 35 m², marka ekonomiczna.', feats: ['Split 2.5–3.5 kW', 'Pompa ciepła', '3 lata gwarancji', 'Montaż 1 dzień'] },
              { tier: 'Pro', price: '6 800', desc: 'Samsung, LG, Gree z WiFi. Najczęstszy wybór.', feats: ['Split / multi 3.5–5 kW', 'Sterowanie z app', '5 lat gwarancji', 'Tryb 19 dB', 'Filtr antyalergiczny'], featured: true },
              { tier: 'Premium', price: '11 400', desc: 'Daikin, Mitsubishi. Cicho, estetycznie, AI.', feats: ['Split / multi 5–7 kW', 'AI adaptive', '10 lat gwarancji', 'Design obudowa', 'Serwis 24h priorytet'] },
            ].map((p, i) => (
              <div key={p.tier} style={{
                padding: 40,
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 0,
                background: p.featured ? accentCss.primary : undefined,
                position: 'relative'
              }}>
                {p.featured && <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(0,0,0,0.35)', borderRadius: 999 }} className="pb-mont">Polecane</div>}
                <div className="pb-mont" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 20 }}>{p.tier}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 14, opacity: 0.7 }}>od</span>
                  <span className="pb-mont" style={{ fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>{p.price}</span>
                  <span style={{ fontSize: 18, opacity: 0.7 }}>zł</span>
                </div>
                <p style={{ fontSize: 13, color: p.featured ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: '0 0 28px' }}>{p.desc}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 20 }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.feats.map(f => (
                    <li key={f} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, color: p.featured ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.75)' }}>
                      <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.4 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={{ marginTop: 32, width: '100%', padding: '12px', background: p.featured ? '#fff' : 'transparent', border: p.featured ? 0 : '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: p.featured ? '#000' : '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Wybierz →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra sections */}
      {window.PASectionBrands && <PASectionBrands accentCss={accentCss} p="pb" />}
      {window.PASectionProducts && <PASectionProducts accentCss={accentCss} p="pb" />}
      {window.PASectionCalculator && <PASectionCalculator accentCss={accentCss} p="pb" />}
      {window.PASectionReviewsBig && <PASectionReviewsBig accentCss={accentCss} p="pb" />}
      {window.PASectionCertificates && <PASectionCertificates accentCss={accentCss} p="pb" />}
      {window.PASectionFounder && <PASectionFounder accentCss={accentCss} p="pb" />}
      {window.PASectionBlog && <PASectionBlog accentCss={accentCss} p="pb" />}

      {/* ══════════ OPINIE + FAQ ══════════ */}
      <section style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          {/* Opinie */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ 05 — Opinie</div>
            <h2 className="pb-mont" style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.5, margin: '0 0 40px', lineHeight: 1 }}>
              <span className="pb-aurora">4.9 / 5</span>
              <br />
              <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>na podstawie 180 opinii Google</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { q: 'Pomiar w poniedziałek, montaż w sobotę. Chłopaki zostawili porządek taki, że żona nie uwierzyła że cokolwiek robili.', n: 'Marcin W.', l: 'Pruszków · dom' },
                { q: 'Miałem dwie wyceny z Warszawy — PlayAir wyszedł taniej i kontakt w ciągu godziny, nie dnia.', n: 'Anna K.', l: 'Piastów · mieszkanie' },
                { q: 'Pompa ciepła drugi rok, rachunek za prąd w porównaniu do starego gazu — niebo a ziemia.', n: 'Tomek R.', l: 'Nadarzyn · dom' },
              ].map((t, i) => (
                <div key={i} style={{ padding: 24, borderLeft: `2px solid ${accentCss.a2}`, background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: '0 0 12px' }}>"{t.q}"</p>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    <span className="pb-mont" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{t.n}</span> · {t.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ 06 — FAQ</div>
            <h2 className="pb-mont" style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.5, margin: '0 0 40px', lineHeight: 1 }}>
              Najczęstsze pytania.
            </h2>
            <div>
              {[
                { q: 'Ile kosztuje montaż klimatyzacji?', a: 'Orientacyjnie od 4 200 zł za montaż w jednym pomieszczeniu. Ostateczna cena po darmowym pomiarze u Ciebie.' },
                { q: 'Ile trwa montaż?', a: '1 dzień roboczy dla pojedynczego splita, 2 dni dla multisplita. Pompa ciepła — 2–4 dni z podłączeniem hydraulicznym.' },
                { q: 'Jaką markę polecacie?', a: 'Zależy od budżetu i priorytetów. Samsung / LG w klasie Pro, Daikin / Mitsubishi w Premium. Na wizycie pokażemy konkrety.' },
                { q: 'Czy obsługujecie moją miejscowość?', a: 'Pruszków, Piastów, Ursus, Włochy, Raszyn, Michałowice, Nadarzyn, Janki, Piaseczno, Ożarów Maz., Komorów, Brwinów, Grodzisk Maz.' },
                { q: 'Jak wygląda gwarancja?', a: '3–10 lat na urządzenie (w zależności od klasy), 5 lat na montaż. Przeglądy coroczne przedłużają gwarancję producenta.' },
              ].map((f, i) => (
                <details key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
                  <summary className="pb-mont" style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {f.q}
                    <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>+</span>
                  </summary>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '12px 0 0' }}>{f.a}</p>
                </details>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA — MEGA ══════════ */}
      <section style={{ padding: '80px 40px 120px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ position: 'relative', padding: '100px 60px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden' }}>
            <div className="pb-grad-prim" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.15), transparent 60%)' }} />
            {/* Giant logo watermark */}
            <img src="assets/playair-logo.svg" alt="" style={{ position: 'absolute', right: -40, bottom: -40, height: 400, opacity: 0.05, filter: 'brightness(0) invert(1)' }} />
            <div style={{ position: 'relative', maxWidth: 800 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Gotowy?</div>
              <h2 className="pb-mont" style={{ fontSize: 80, fontWeight: 700, letterSpacing: -2.5, margin: '0 0 24px', lineHeight: 0.95 }}>
                Pomiar w tym tygodniu.
                <br />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Chłodne lato pewne.</span>
              </h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
                <button style={{ padding: '16px 28px', borderRadius: 999, border: 0, background: '#fff', color: '#000', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Umów pomiar →
                </button>
                <button style={{ padding: '16px 28px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  ☏ 504 ___ ___
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '60px 40px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <img src="assets/playair-logo.svg" alt="PlayAir" style={{ height: 36, filter: 'brightness(0) invert(1)', marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 16px', maxWidth: 280 }}>
              Klimatyzacja, pompy ciepła, rekuperacja. Pruszków + południowy zachód Warszawy.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Partner</span>
              <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.15)' }} />
              <span className="pb-mont" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>PBAC</span>
            </div>
          </div>
          {[
            { h: 'Usługi', l: ['Klimatyzacja', 'Pompy ciepła', 'Serwis', 'Rekuperacja'] },
            { h: 'Strefa', l: ['Pruszków', 'Piastów', 'Raszyn', 'Piaseczno', 'Nadarzyn'] },
            { h: 'Kontakt', l: ['+48 504 ___ ___', 'biuro@playair.pl', 'Pn–Pt 08–18'] },
          ].map(c => (
            <div key={c.h}>
              <h4 className="pb-mont" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px', color: 'rgba(255,255,255,0.6)' }}>{c.h}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {c.l.map(x => <li key={x} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1320, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          <span>© 2026 PlayAir. Oficjalny partner PBAC.</span>
          <span>Polityka prywatności</span>
        </div>
      </footer>
    </div>
  );
}

window.PlayAirLandingB = PlayAirLandingB;
