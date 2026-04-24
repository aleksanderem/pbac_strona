// Shared extra sections for PlayAir landings — inject more content without
// doubling file length. Each fn takes accentCss + a style-prefix ('pa' or 'pb')
// and returns JSX.

function PASectionProducts({ accentCss, p = 'pa' }) {
  const products = [
    { brand: 'Samsung', model: 'Wind-Free Elite', kw: '3.5 kW', price: '6 990', tag: 'Bestseller', feats: ['Wind-Free', 'AI Auto', 'WiFi'] },
    { brand: 'LG', model: 'ArtCool Mirror', kw: '3.5 kW', price: '7 490', tag: 'Design', feats: ['Lustro', 'Jonizator', 'WiFi'] },
    { brand: 'Daikin', model: 'Perfera FTXM', kw: '3.5 kW', price: '9 890', tag: 'Premium', feats: ['Bluevolution', 'Flash Streamer', 'Onecta'] },
    { brand: 'Mitsubishi', model: 'Heavy SRK ZSX', kw: '3.5 kW', price: '8 790', tag: 'Cicha (19 dB)', feats: ['19 dB', 'Plasma', 'App'] },
    { brand: 'Gree', model: 'Amber Prestige', kw: '3.5 kW', price: '5 490', tag: 'Value', feats: ['Cold Plasma', 'WiFi', 'Turbo'] },
    { brand: 'Toshiba', model: 'Seiya Classic', kw: '3.5 kW', price: '5 290', tag: 'Budget', feats: ['8°C Heat', 'Eco', 'Self-clean'] },
  ];
  return (
    <section style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ Produkty</div>
            <h2 className={`${p}-mont`} style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0, lineHeight: 1 }}>
              Polecane <span className={`${p}-aurora`}>modele</span>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 16, maxWidth: 520, lineHeight: 1.6 }}>
              Sześć urządzeń, które najczęściej polecamy klientom w Pruszkowie. Każdy dostępny z montażem w cenach z naszego cennika.
            </p>
          </div>
          <button style={{ padding: '12px 24px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Cały katalog →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {products.map((pr, i) => (
            <div key={pr.model} className={`${p}-glass`} style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className={`${p}-mont`} style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{pr.brand}</div>
                <div style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: i === 0 ? accentCss.primary : 'rgba(255,255,255,0.08)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{pr.tag}</div>
              </div>
              {/* Product placeholder — AC unit stylized */}
              <div style={{ height: 140, background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '70%', height: 36, borderRadius: 6, background: 'linear-gradient(180deg,#fff,#e5e5e5)', position: 'relative', boxShadow: '0 6px 18px rgba(0,0,0,0.25)' }}>
                  <div style={{ position: 'absolute', bottom: -1, left: 8, right: 8, height: 4, background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 4px)' }} />
                </div>
                <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{pr.brand.toUpperCase()}</div>
              </div>
              <h3 className={`${p}-mont`} style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: -0.3 }}>{pr.model}</h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{pr.kw} · Split ścienny · A+++</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                {pr.feats.map(f => <span key={f} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>{f}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Od</div>
                  <div className={`${p}-mont`} style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>{pr.price} <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.7 }}>zł</span></div>
                </div>
                <button style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', fontSize: 11, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>Oferta →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PASectionBrands({ accentCss, p = 'pa' }) {
  const brands = ['Samsung', 'LG', 'Daikin', 'Mitsubishi Heavy', 'Gree', 'Toshiba', 'Fujitsu', 'Haier', 'Panasonic', 'Midea'];
  return (
    <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 28, textAlign: 'center' }}>Autoryzowani partnerzy marek</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {brands.map(b => (
            <div key={b} style={{ padding: '20px 16px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, textAlign: 'center' }}>
              <div className={`${p}-mont`} style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.5, opacity: 0.85 }}>{b}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Autoryzowany instalator</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PASectionCalculator({ accentCss, p = 'pa' }) {
  return (
    <section style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ Kalkulator</div>
            <h2 className={`${p}-mont`} style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: '0 0 20px', lineHeight: 1.05 }}>
              Policz orientacyjny <span className={`${p}-aurora`}>koszt</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
              Trzy pytania, orientacyjna kwota. Finalną cenę i rekomendację marki dostajesz po darmowym pomiarze u Ciebie.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Metraż i liczba pomieszczeń', 'Typ zabudowy (mieszkanie / dom)', 'Klasa urządzenia (Budget / Pro / Premium)'].map(t => (
                <li key={t} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: accentCss.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${p}-glass`} style={{ padding: 36 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Powierzchnia</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {['do 25 m²', '25–40', '40–60', '60+'].map((s, i) => (
                  <button key={s} style={{ padding: '11px 8px', background: i === 1 ? accentCss.primary : 'rgba(255,255,255,0.04)', border: i === 1 ? 0 : '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Typ</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {['Mieszkanie', 'Dom', 'Biuro'].map((s, i) => (
                  <button key={s} style={{ padding: '11px', background: i === 0 ? accentCss.primary : 'rgba(255,255,255,0.04)', border: i === 0 ? 0 : '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Klasa</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {['Budget', 'Pro', 'Premium'].map((s, i) => (
                  <button key={s} style={{ padding: '11px', background: i === 1 ? accentCss.primary : 'rgba(255,255,255,0.04)', border: i === 1 ? 0 : '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ padding: 24, borderRadius: 12, background: accentCss.primary, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8 }}>Szacowany koszt</div>
                <div className={`${p}-mont`} style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>6 800 – 8 400 zł</div>
              </div>
              <button style={{ padding: '10px 16px', background: '#fff', color: '#000', border: 0, borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Pomiar →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PASectionReviewsBig({ accentCss, p = 'pa' }) {
  const reviews = [
    { q: 'Pomiar w poniedziałek, montaż w sobotę. Chłopaki zostawili porządek taki, że żona nie uwierzyła że cokolwiek robili. Urządzenie działa bez zarzutu.', n: 'Marcin W.', l: 'Pruszków · dom 160 m²', r: 5, s: 'Samsung Wind-Free' },
    { q: 'Dwie wyceny z Warszawy — PlayAir wyszedł taniej i kontakt w ciągu godziny, nie dnia. Plus, wiedzieli dokładnie gdzie mieszkam.', n: 'Anna K.', l: 'Piastów · mieszkanie', r: 5, s: 'LG ArtCool' },
    { q: 'Pompa ciepła drugi rok, rachunek za prąd w porównaniu do starego gazu — niebo a ziemia. Serwis roczny punktualnie.', n: 'Tomek R.', l: 'Nadarzyn · dom', r: 5, s: 'Samsung pompa ciepła' },
    { q: 'Polecam. Przyjechali na pomiar za darmo, doradzili tańszy wariant niż sam planowałem. Uczciwa firma.', n: 'Paweł M.', l: 'Raszyn · dom', r: 5, s: 'Gree Amber' },
    { q: 'Klimatyzacja w sypialni — cisza absolutna. Pomiar szybki, montaż czysty. Gwarancja 5 lat daje spokój.', n: 'Beata S.', l: 'Ursus · mieszkanie', r: 5, s: 'Mitsubishi SRK' },
    { q: 'Zamówiłem rekuperację do nowego domu. Projekt w 3 dni, montaż zgodny z harmonogramem. Profesjonaliści.', n: 'Krzysztof L.', l: 'Michałowice · dom', r: 5, s: 'Rekuperacja' },
  ];
  return (
    <section style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 60, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ Opinie</div>
            <h2 className={`${p}-mont`} style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0, lineHeight: 1 }}>
              <span className={`${p}-aurora`}>4.9 / 5</span>
            </h2>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>180 opinii Google · 340 opinii Facebook</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
              {[0, 1, 2, 3, 4].map(i => <span key={i} style={{ color: '#fbbf24', fontSize: 18 }}>★</span>)}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[['98%', 'punktualny montaż'], ['< 60 min', 'czas reakcji'], ['2 dni', 'średnio od pomiaru do oferty'], ['847', 'zrealizowanych montaży']].map(([n, l]) => (
              <div key={l} style={{ padding: 16, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}>
                <div className={`${p}-mont`} style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {reviews.map((t, i) => (
            <div key={i} className={`${p}-glass`} style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[0, 1, 2, 3, 4].map(j => <span key={j} style={{ color: '#fbbf24', fontSize: 12 }}>★</span>)}
                </div>
                <div style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}>{t.s}</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: '0 0 20px' }}>"{t.q}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: accentCss.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }} className={`${p}-mont`}>{t.n[0]}</div>
                <div>
                  <div className={`${p}-mont`} style={{ fontSize: 13, fontWeight: 700 }}>{t.n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{t.l}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PASectionBlog({ accentCss, p = 'pa' }) {
  const posts = [
    { cat: 'Poradnik', title: 'Jak dobrać klimatyzację do metrażu — krótki przewodnik', date: '12 kwi', read: '6 min', color: '#B31853' },
    { cat: 'Pompy ciepła', title: 'Ile kosztuje pompa ciepła w domu 150 m² w 2026?', date: '04 kwi', read: '8 min', color: '#3D5EFF' },
    { cat: 'Serwis', title: 'Przegląd roczny klimatyzacji — co dokładnie robimy', date: '28 mar', read: '4 min', color: '#DF396F' },
    { cat: 'Technika', title: 'Rekuperacja vs wentylacja grawitacyjna — porównanie', date: '15 mar', read: '7 min', color: '#1A337F' },
  ];
  return (
    <section style={{ padding: '120px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ Blog · aktualności</div>
            <h2 className={`${p}-mont`} style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0 }}>Wiedza z praktyki</h2>
          </div>
          <a style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Wszystkie artykuły →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {posts.map((post, i) => (
            <div key={post.title} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 180, background: `linear-gradient(135deg, ${post.color}66, ${post.color}22), repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 8px, transparent 8px 16px)`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 14, left: 14, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.5)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{post.cat}</div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 className={`${p}-mont`} style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, margin: '0 0 16px', letterSpacing: -0.2 }}>{post.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  <span>{post.date}</span>
                  <span>{post.read} czytania</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PASectionCertificates({ accentCss, p = 'pa' }) {
  const certs = [
    { n: 'F-GAZY', d: 'Certyfikat personalny · Nr. PL-FG-022345' },
    { n: 'Samsung', d: 'Autoryzowany instalator od 2019' },
    { n: 'LG', d: 'Certified Installer Partner' },
    { n: 'Daikin', d: 'D1 Certified Professional' },
    { n: 'SEP', d: 'Uprawnienia elektryczne do 1 kV' },
    { n: 'ISO 9001', d: 'System zarządzania jakością' },
  ];
  return (
    <section style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ Certyfikaty</div>
          <h2 className={`${p}-mont`} style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.2, margin: 0 }}>Uprawnienia i autoryzacje</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {certs.map(c => (
            <div key={c.n} className={`${p}-glass`} style={{ padding: 20, textAlign: 'center', minHeight: 120 }}>
              <div className={`${p}-grad-icon ${p}-mont`} style={{ width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 11, fontWeight: 700 }}>✓</div>
              <div className={`${p}-mont`} style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{c.n}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PASectionFAQ({ accentCss, p = 'pa' }) {
  const faqs = [
    { q: 'Ile kosztuje montaż klimatyzacji?', a: 'Orientacyjnie od 4 200 zł za montaż w jednym pomieszczeniu. Ostateczna cena po darmowym pomiarze u Ciebie.' },
    { q: 'Ile trwa montaż?', a: '1 dzień roboczy dla pojedynczego splita, 2 dni dla multisplita. Pompa ciepła — 2–4 dni z podłączeniem hydraulicznym.' },
    { q: 'Jaką markę polecacie?', a: 'Zależy od budżetu i priorytetów. Samsung / LG w klasie Pro, Daikin / Mitsubishi w Premium. Na wizycie pokażemy konkrety.' },
    { q: 'Czy obsługujecie moją miejscowość?', a: 'Pruszków, Piastów, Ursus, Włochy, Raszyn, Michałowice, Nadarzyn, Janki, Piaseczno, Ożarów Maz., Komorów, Brwinów, Grodzisk Maz.' },
    { q: 'Jak wygląda gwarancja?', a: '3–10 lat na urządzenie w zależności od klasy, 5 lat na montaż. Przeglądy coroczne przedłużają gwarancję producenta.' },
    { q: 'Czy można uzyskać dotację (Czyste Powietrze)?', a: 'Tak, przy pompach ciepła pomagamy w wypełnieniu wniosku. Klimatyzacje nie są objęte programem Czyste Powietrze.' },
  ];
  return (
    <section style={{ padding: '120px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>§ FAQ</div>
          <h2 className={`${p}-mont`} style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, margin: 0 }}>Najczęstsze <span className={`${p}-aurora`}>pytania</span></h2>
        </div>
        <div>
          {faqs.map((f, i) => (
            <details key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0' }} open={i === 0}>
              <summary className={`${p}-mont`} style={{ fontSize: 18, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {f.q}
                <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.4)' }}>+</span>
              </summary>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '14px 0 0', maxWidth: 800 }}>{f.a}</p>
            </details>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    </section>
  );
}

function PASectionFounder({ accentCss, p = 'pa' }) {
  return (
    <section style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className={`${p}-glass`} style={{ padding: 56, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40, alignItems: 'center' }}>
          <div style={{ width: 200, height: 200, borderRadius: '50%', background: `linear-gradient(135deg, ${accentCss.a1}55, ${accentCss.a2}55), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 6px, transparent 6px 12px)`, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>[ zdjęcie założyciela ]</div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>Obietnica założyciela</div>
            <p className={`${p}-mont`} style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.4, margin: '0 0 20px', letterSpacing: -0.5 }}>
              "Jesteśmy z Pruszkowa. Nie jesteśmy kolejnym adresem na trasie — jesteśmy sąsiadami. Kiedy coś nie działa, odbieramy telefon."
            </p>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              <span className={`${p}-mont`} style={{ fontWeight: 700 }}>Jan Kowalski</span> · założyciel PlayAir · 12 lat w branży HVAC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PASectionProducts, PASectionBrands, PASectionCalculator, PASectionReviewsBig, PASectionBlog, PASectionCertificates, PASectionFAQ, PASectionFounder });
