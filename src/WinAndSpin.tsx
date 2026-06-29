import { useState, useRef } from 'react';

/* ── CSS: verbatim from asset pack styles.css ──────────────────────────────── */
const CSS = `
:root{
  --yellow:#ffd400;--black:#050505;--charcoal:#111;--card:#171717;--muted:#a9a9a9;--line:rgba(255,212,0,.24);--purple:#a600ff;--radius:16px;--max:430px;
  font-family:Arial,Helvetica,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#000;color:#fff;display:flex;justify-content:center}
.page{width:100%;max-width:var(--max);min-height:100vh;background:radial-gradient(circle at 70% 10%,rgba(255,212,0,.16),transparent 28%),radial-gradient(circle at 92% 30%,rgba(166,0,255,.18),transparent 22%),#050505;overflow:hidden}
.section{padding-left:16px;padding-right:16px}
.topbar{height:68px;background:var(--yellow);color:#000;display:flex;align-items:center;gap:14px;padding:0 18px}
.hamburger{border:0;background:transparent;width:24px;display:grid;gap:5px;cursor:pointer}
.hamburger span{height:2px;background:#000;border-radius:4px}
.brand{margin-right:auto;display:flex;align-items:center}
.brand-logo{height:28px;width:auto;display:block;background:#fff;border-radius:6px;padding:4px 8px}
.top-pill{border:2px solid #fff;border-radius:999px;color:#000;text-decoration:none;text-transform:uppercase;font-size:11px;font-weight:950;letter-spacing:.5px;padding:9px 14px;cursor:pointer;background:transparent}
.hero{padding-top:24px;background:linear-gradient(180deg,rgba(255,255,255,.03),transparent 65%)}
.eyebrow{display:inline-flex;border:1px solid rgba(255,65,198,.75);color:#e7a0ff;border-radius:8px;padding:8px 12px;text-transform:uppercase;font-size:11px;font-weight:950;letter-spacing:2px;margin-bottom:16px;box-shadow:0 0 18px rgba(166,0,255,.26)}
h1{font-size:clamp(58px,16vw,70px);line-height:.87;font-weight:950;text-transform:uppercase;letter-spacing:-2.6px;margin-bottom:14px}
h1 span{display:block;color:var(--yellow)}
.intro{max-width:320px;color:#ddd;font-size:17px;line-height:1.44;margin-bottom:14px}
.intro strong{color:var(--yellow)}
.slot-shell{display:flex;justify-content:center;margin:8px auto 16px;filter:drop-shadow(0 0 28px rgba(255,212,0,.22)) drop-shadow(0 0 20px rgba(166,0,255,.17));transition:filter .25s ease,transform .25s ease}
.slot-img{width:100%;max-width:382px;display:block;object-fit:contain}
.slot-shell.spinning{animation:slotShake .75s ease-in-out}
.slot-shell.won{filter:drop-shadow(0 0 38px rgba(255,212,0,.58)) drop-shadow(0 0 26px rgba(166,0,255,.28))}
@keyframes slotShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
.prize-row{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:18px}
.prize-row article{height:86px;background:rgba(255,255,255,.045);border:1px solid var(--line);border-radius:11px;padding:7px 3px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center}
.prize-row img{width:31px;height:31px;object-fit:contain;margin-bottom:5px;filter:drop-shadow(0 0 7px rgba(255,212,0,.35))}
.prize-row b{color:var(--yellow);font-size:8.8px;letter-spacing:.4px;text-transform:uppercase;margin-bottom:3px}
.prize-row span{font-size:9.3px;line-height:1.12;font-weight:850;text-transform:uppercase}
.primary-cta{width:100%;min-height:64px;border:0;border-radius:13px;background:linear-gradient(180deg,#ffe43d,#ffd000);box-shadow:0 0 32px rgba(255,212,0,.26),inset 0 2px 0 rgba(255,255,255,.32);color:#fff;font-size:19px;font-weight:950;text-transform:uppercase;text-decoration:none;letter-spacing:.2px;display:flex;align-items:center;justify-content:center;gap:11px;cursor:pointer;text-shadow:0 1px 3px rgba(0,0,0,0.35)}
.primary-cta:active{transform:scale(.985)}
.spin-mark{font-size:25px;display:inline-block}
.primary-cta.loading .spin-mark{animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.microcopy{text-align:center;color:#9b9b9b;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;margin:12px 0 20px}
.benefit-strip,.trust-strip{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);border-radius:14px;display:grid;grid-template-columns:repeat(3,1fr);overflow:hidden;margin-bottom:30px}
.benefit-strip div,.trust-strip div{min-height:78px;padding:12px 7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;text-align:center;border-right:1px solid rgba(255,255,255,.08)}
.benefit-strip div:last-child,.trust-strip div:last-child{border-right:0}
.benefit-strip img,.trust-strip img,.step-head img{width:26px;height:26px;object-fit:contain}
.step-head img{width:28px;height:28px}
.benefit-strip strong,.trust-strip strong{font-size:10.8px;line-height:1.25;text-transform:uppercase;letter-spacing:.4px}
.how h2{text-align:center;font-size:25px;text-transform:uppercase;font-weight:950;letter-spacing:-.6px;margin-bottom:20px}
.how h2 span{color:var(--yellow)}
.steps{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:22px}
.steps article{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px 12px 15px;min-height:198px}
.step-head{display:flex;align-items:center;gap:9px;margin-bottom:12px}
.step-head em{width:33px;height:33px;border:1px solid var(--yellow);border-radius:50%;color:var(--yellow);display:grid;place-items:center;font-style:normal;font-size:11px;font-weight:950}
.step-head i{font-style:normal;font-size:23px;display:none}
.steps h3{font-size:13px;text-transform:uppercase;line-height:1.15;margin-bottom:8px}
.steps p{color:#cfcfcf;font-size:12.5px;line-height:1.42}
.claim{margin-bottom:24px}
.r50-banner{position:relative;border-radius:15px;overflow:hidden;background:var(--yellow);margin-bottom:24px;box-shadow:0 14px 36px rgba(0,0,0,.45)}
.r50-banner img{width:100%;display:block;aspect-ratio:2.2/1;object-fit:cover;object-position:left center}
.r50-btn{position:absolute;right:10px;bottom:11px;background:#050505;color:#fff;text-decoration:none;border-radius:8px;padding:11px 12px;text-transform:uppercase;font-size:10px;font-weight:950;letter-spacing:.3px;cursor:pointer}
.hot-offers{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px 16px;display:grid;grid-template-columns:56px 1fr;gap:12px;margin-bottom:30px}
.mail-icon{width:48px;height:48px;border:1px solid rgba(255,212,0,.35);border-radius:10px;display:grid;place-items:center;color:var(--yellow);font-size:25px;box-shadow:0 0 20px rgba(255,212,0,.16)}
.offer-copy h2{font-size:20px;text-transform:uppercase;line-height:1;margin-bottom:6px}
.offer-copy p{color:#c9c9c9;font-size:13px;line-height:1.35}
.hot-offers-form{grid-column:1/-1;display:flex;gap:8px}
.hot-offers input{flex:1;height:52px;background:#252525;border:1px solid rgba(255,255,255,.09);border-radius:8px;color:#fff;padding:0 14px;font-size:15px;min-width:0;outline:none}
.hot-offers input::placeholder{color:rgba(255,255,255,.35)}
.hot-offers button{height:52px;flex-shrink:0;border:0;border-radius:8px;background:var(--yellow);color:#080808;font-size:12px;font-weight:950;text-transform:uppercase;cursor:pointer;padding:0 16px;white-space:nowrap}
.footer{background:#080808;padding:28px 16px 34px;text-align:center}
.footer-brand{margin-bottom:18px;display:flex;justify-content:center}
.footer-brand-logo{height:30px;width:auto;display:block;filter:brightness(0) invert(1);opacity:0.7}
.footer-pills{display:flex;justify-content:center;gap:8px;margin-bottom:20px}
.footer-pills span{background:rgba(255,255,255,.065);border:1px solid rgba(255,255,255,.07);border-radius:999px;padding:8px 13px;font-size:10px;text-transform:uppercase;color:#d8d8d8;font-weight:850}
.footer nav{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 18px;margin-bottom:18px}
.footer a{color:#a7a7a7;text-decoration:none;font-size:9.5px;letter-spacing:1px;text-transform:uppercase}
.footer p{color:#7f7f7f;font-size:9px;line-height:1.5;letter-spacing:.9px;text-transform:uppercase;max-width:340px;margin:0 auto}
@media(max-width:374px){
  .brand{font-size:24px}.top-pill{padding:8px 11px;font-size:10px}h1{font-size:56px}
  .steps{grid-template-columns:1fr}.steps article{min-height:auto}
  .hot-offers{grid-template-columns:1fr}.hot-offers input,.hot-offers button{grid-column:1/-1}
}
`;

type Phase = 'idle' | 'spinning' | 'won';

export default function WinAndSpin() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [email, setEmail] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const affiliateUrl = `https://www.easybet.co.za/register?t1=${params.get('t1') ?? 'winspin'}&s1=${params.get('s1') ?? 'lp'}`;

  function handleSpin() {
    if (phase === 'spinning') return;
    if (phase === 'won') { window.open(affiliateUrl, '_blank'); return; }
    setPhase('spinning');
    timerRef.current = setTimeout(() => {
      setPhase('won');
      setTimeout(() => window.open(affiliateUrl, '_blank'), 1100);
    }, 950);
  }

  const shellClass = `slot-shell${phase === 'spinning' ? ' spinning' : phase === 'won' ? ' won' : ''}`;
  const btnClass   = `primary-cta${phase === 'spinning' ? ' loading' : ''}`;
  const btnLabel   = phase === 'spinning' ? 'Spinning...' : phase === 'won' ? 'Claim R1,500 Bonus' : 'Spin & Win R1,500';

  return (
    <>
      <style>{CSS}</style>
      <main className="page">

        {/* ── Header ── */}
        <header className="topbar">
          <button className="hamburger" aria-label="Open menu">
            <span /><span /><span />
          </button>
          <div className="brand">
            <img src="/assets/easybet-logo.webp" alt="Easybet" className="brand-logo" />
          </div>
          <button className="top-pill" onClick={() => window.open(affiliateUrl, '_blank')}>
            Offer Live Now
          </button>
        </header>

        {/* ── Hero ── */}
        <section className="hero section">
          <div className="eyebrow">Exclusive Offer</div>
          <h1>Win &amp;<span>Spin</span></h1>
          <p className="intro">
            Spin the Easybet jackpot machine. Land three 7s and unlock your{' '}
            <strong>R1,500</strong> welcome bonus instantly.
          </p>

          {/* Slot machine image */}
          <div className={shellClass}>
            <img
              src="/assets/easybet-slot-machine.png"
              alt="Easybet jackpot slot machine showing 777"
              className="slot-img"
            />
          </div>

          {/* Prize row */}
          <div className="prize-row" aria-label="Prize options">
            <article>
              <img src="/assets/icon-jackpot-7.png" alt="" />
              <b>Jackpot</b>
              <span>R1,500<br />Bonus</span>
            </article>
            <article>
              <img src="/assets/icon-diamond.png" alt="" />
              <b>Diamonds</b>
              <span>100 Free<br />Spins</span>
            </article>
            <article>
              <img src="/assets/icon-star.png" alt="" />
              <b>Stars</b>
              <span>R500<br />Cashback</span>
            </article>
            <article>
              <img src="/assets/icon-bell.png" alt="" />
              <b>Bells</b>
              <span>R50 Free<br />Bet</span>
            </article>
          </div>

          {/* Spin CTA */}
          <button className={btnClass} onClick={handleSpin}>
            <span className="spin-mark">↻</span>
            <span>{btnLabel}</span>
          </button>
          <p className="microcopy">No purchase needed to spin — just register free</p>

          {/* Benefits strip */}
          <div className="benefit-strip">
            <div><img src="/assets/ui-gift.svg" alt="" /><strong>R1,500<br />Welcome Bonus</strong></div>
            <div><img src="/assets/ui-shield.svg" alt="" /><strong>150%<br />Deposit Match</strong></div>
            <div><img src="/assets/ui-lock.svg" alt="" /><strong>Fast & Secure<br />Payouts</strong></div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="section how">
          <h2>How It <span>Works</span></h2>
          <div className="steps">
            <article>
              <div className="step-head"><em>01</em><img src="/assets/ui-user-plus.svg" alt="" /></div>
              <h3>Register Free</h3>
              <p>Create your Easybet account in under 60 seconds. No deposit required to spin.</p>
            </article>
            <article>
              <div className="step-head"><em>02</em><img src="/assets/ui-slot.svg" alt="" /></div>
              <h3>Spin The Reels</h3>
              <p>Hit the Spin button above. Land three 7s and your R1,500 bonus unlocks instantly.</p>
            </article>
            <article>
              <div className="step-head"><em>03</em><img src="/assets/ui-card-coins.svg" alt="" /></div>
              <h3>Deposit &amp; Play</h3>
              <p>Deposit from R20. Your bonus credits are added automatically — no code needed.</p>
            </article>
            <article>
              <div className="step-head"><em>04</em><img src="/assets/ui-cash.svg" alt="" /></div>
              <h3>Cash Out</h3>
              <p>Meet the simple wagering requirements and withdraw your winnings. Fast, no hidden fees.</p>
            </article>
          </div>

          {/* Claim CTA */}
          <button className="primary-cta claim" onClick={() => window.open(affiliateUrl, '_blank')}>
            <img src="/assets/ui-gift.svg" alt="" style={{ width: 26, height: 26 }} />
            <span>Claim Your R1,500 Bonus Now</span>
          </button>

          {/* R50 Banner */}
          <div className="r50-banner">
            <img src="/assets/easybet-r50-banner.png" alt="Easybet R50 sign up bonus" />
            <button className="r50-btn" onClick={() => window.open(affiliateUrl, '_blank')}>
              Claim R50 Bonus
            </button>
          </div>

          {/* Trust strip */}
          <div className="trust-strip">
            <div><img src="/assets/ui-shield.svg" alt="" /><strong>Licensed</strong></div>
            <div><img src="/assets/ui-wifi.svg" alt="" /><strong>Data Free</strong></div>
            <div><img src="/assets/ui-coins.svg" alt="" /><strong>R20 Min Deposit</strong></div>
          </div>

          {/* Newsletter */}
          <div className="hot-offers">
            <div className="mail-icon"><img src="/assets/ui-mail.svg" alt="" style={{ width: 26, height: 26 }} /></div>
            <div className="offer-copy">
              <h2>Get Hot Offers</h2>
              <p>Join 50,000+ South Africans getting exclusive casino bonuses weekly.</p>
            </div>
            <div className="hot-offers-form">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="button">Subscribe Now</button>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-brand">
            <img src="/assets/easybet-logo.webp" alt="Easybet" className="footer-brand-logo" />
          </div>
          <div className="footer-pills">
            <span>Sports</span><span>Live</span><span>Slots</span><span>Casino</span>
          </div>
          <nav>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Responsible Gambling</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </nav>
          <p>18+ only. Please gamble responsibly. Easybet is licensed and regulated by the Western Cape Gambling and Racing Board. 2024–2025.</p>
        </footer>

      </main>
    </>
  );
}
