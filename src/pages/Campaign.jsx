import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GOAL = 150000
const CAMPAIGN_API = 'https://script.google.com/macros/s/AKfycbyTk0DIAD9NTE9H2FHGc907Cx7-wJO386czvjDEEzRveQz2TdItgy7jkqU_EuRmC9SBCg/exec'

const TIERS = [
  { amount: 500,   icon: '🧱', label: '50 Bricks',                desc: 'Every brick counts toward a stronger foundation.' },
  { amount: 2000,  icon: '🪨', label: 'Cement + Sand',            desc: 'One full bag of cement and sand for the walls.' },
  { amount: 5000,  icon: '🪟', label: 'Windows & Ventilation',    desc: 'Let in light and fresh air for the family.' },
  { amount: 10000, icon: '🏗️', label: 'Roofing Material',         desc: 'A roof over their heads — protection from sun and rain.' },
  { amount: 25000, icon: '⚡', label: 'Electrical Wiring',        desc: 'Power and lighting for the entire home.' },
]

const UPDATES = [
  { date: 'June 2026',      text: 'Campaign launched — goal set at ₹1,50,000 to build a complete home.' },
  { date: 'Coming soon',    text: 'Construction to begin once 50% of target is reached.' },
  { date: 'Coming soon',    text: 'Inauguration ceremony — all donors will be invited.' },
]

function useCountUp(target, duration = 1800, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started || target === 0) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function ProgressBar({ raised, goal }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const pct = Math.min((raised / goal) * 100, 100)
  const animCount = useCountUp(raised, 1800, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="campaign-progress-card" ref={ref}>
      <div className="campaign-progress-amounts">
        <span className="campaign-raised">₹{animCount.toLocaleString('en-IN')}</span>
        <span className="campaign-goal">of ₹{goal.toLocaleString('en-IN')}</span>
      </div>
      <div className="campaign-bar-track">
        <div className="campaign-bar-fill" style={{ width: visible ? `${pct}%` : '0%' }} />
      </div>
      <div className="campaign-progress-meta">
        <span className="campaign-pct">{pct.toFixed(1)}% funded</span>
      </div>
    </div>
  )
}

export default function Campaign() {
  const [raised, setRaised] = useState(0)
  const [donorCount, setDonorCount] = useState(0)
  const [donorNames, setDonorNames] = useState([])
  const [copied, setCopied] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const fetchProgress = () => {
      fetch(CAMPAIGN_API)
        .then(r => r.json())
        .then(d => {
          setRaised(d.raised || 0)
          setDonorCount(d.donors || 0)
          setDonorNames(d.names || [])
          setLastUpdated(new Date())
        })
        .catch(() => {})
    }
    fetchProgress()
    const t = setInterval(fetchProgress, 60000)
    return () => clearInterval(t)
  }, [])

  const shareText = `🏠 Help Blue Shadows Foundation build a home for a family in need!\n₹${raised.toLocaleString('en-IN')} raised of ₹1,50,000 so far.\nEvery rupee matters 👇\nhttps://blueshadowsfoundation.org/#/campaign`

  const handleCopy = () => {
    navigator.clipboard.writeText('https://blueshadowsfoundation.org/#/campaign').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="app">
      <Helmet>
        <title>Build a Home Campaign | Blue Shadows Foundation</title>
        <meta name="description" content="Help us raise ₹1,50,000 to build a home for a family in need. Every donation — big or small — brings them closer to shelter and dignity." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="campaign-hero">
        <div className="campaign-hero-inner container">
          <div className="campaign-hero-text">
            <span className="campaign-urgent-badge">🏠 URGENT CAMPAIGN</span>
            <h1 className="campaign-title">Help Us Build a<br />Home for Hope</h1>
            <p className="campaign-subtitle">
              A family in our community has been living without a proper roof for years.
              Together, we can change that — one brick at a time.
            </p>
            <div className="campaign-hero-stats">
              <div className="campaign-hero-stat">
                <strong>₹1,50,000</strong>
                <span>Total Goal</span>
              </div>
              <div className="campaign-hero-stat">
                <strong>{donorCount}</strong>
                <span>Donors So Far</span>
              </div>
            </div>
            <Link
              to="/donate"
              state={{ cause: 'House Construction — Build a Home' }}
              className="campaign-donate-cta"
            >
              Donate Now — Help Build Their Home
            </Link>
          </div>
          <div className="campaign-hero-image">
            <img src="campaign-family.jpg" alt="Family in need of a home" loading="lazy"
              onError={e => { e.currentTarget.style.display = 'none' }} />
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="campaign-section">
        <div className="container">
          <h2 className="section-title">Fundraising Progress</h2>
          <ProgressBar raised={raised} goal={GOAL} />
          {lastUpdated && (
            <p className="campaign-last-updated">
              Last updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              {' '}— refreshes automatically every minute
            </p>
          )}
        </div>
      </section>

      {/* Brick-by-Brick */}
      <section className="campaign-section campaign-section--alt">
        <div className="container">
          <h2 className="section-title">Brick by Brick — What Your Donation Builds</h2>
          <p className="campaign-section-sub">Every amount matters. Here's the tangible impact each tier creates:</p>
          <div className="campaign-tier-grid">
            {TIERS.map(t => (
              <div key={t.amount} className="campaign-tier-card">
                <span className="campaign-tier-icon">{t.icon}</span>
                <div className="campaign-tier-amount">₹{t.amount.toLocaleString('en-IN')}</div>
                <div className="campaign-tier-label">{t.label}</div>
                <p className="campaign-tier-desc">{t.desc}</p>
                <Link
                  to="/donate"
                  state={{ cause: 'House Construction — Build a Home', amount: String(t.amount) }}
                  className="campaign-tier-btn"
                >
                  Donate ₹{t.amount.toLocaleString('en-IN')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Story */}
      <section className="campaign-section">
        <div className="container">
          <h2 className="section-title">Their Story</h2>
          <div className="campaign-story-grid">
            <div className="campaign-story-text">
              <p className="campaign-story-para">
                This family has been living in a deteriorating shelter for years, facing every monsoon
                with fear and every summer with exhaustion. The father works as a daily wage labourer
                and the mother looks after three young children. Despite their resilience, they have
                been unable to save enough to build even the most basic of homes.
              </p>
              <p className="campaign-story-para">
                Blue Shadows Foundation identified this family during one of our community outreach
                camps. With your support, we will construct a solid, dignified home — giving them
                safety, stability, and a foundation to build their lives on.
              </p>
              <blockquote className="campaign-family-quote">
                "We never imagined anyone would come forward to help us build a home. We are
                overwhelmed with gratitude."
                <cite>— The Family</cite>
              </blockquote>
            </div>
            <div className="campaign-story-photo">
              <img src="campaign-family.jpg" alt="The family we are helping" loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Donor Wall */}
      {donorNames.length > 0 && (
        <section className="campaign-section campaign-section--alt">
          <div className="container">
            <h2 className="section-title">People Who've Already Helped 💛</h2>
            <div className="donor-pills">
              {donorNames.map((name, i) => (
                <span key={i} className="donor-pill">{name}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Share */}
      <section className="campaign-section">
        <div className="container">
          <h2 className="section-title">Spread the Word</h2>
          <p className="campaign-section-sub">Sharing takes 5 seconds and can bring in thousands of rupees.</p>
          <div className="share-row">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn--whatsapp"
            >
              📲 Share on WhatsApp
            </a>
            <button className="share-btn share-btn--copy" onClick={handleCopy}>
              {copied ? '✓ Copied!' : '🔗 Copy Link'}
            </button>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="campaign-section campaign-section--alt">
        <div className="container">
          <h2 className="section-title">Campaign Updates</h2>
          <div className="campaign-timeline">
            {UPDATES.map((u, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                {i < UPDATES.length - 1 && <div className="timeline-line" />}
                <div className="timeline-content">
                  <span className="timeline-date">{u.date}</span>
                  <p className="timeline-text">{u.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="campaign-final-cta">
        <div className="container">
          <h2>Every Rupee Brings Them Closer to Home</h2>
          <p>No amount is too small. ₹500 buys 50 bricks. Your ₹500 matters.</p>
          <Link
            to="/donate"
            state={{ cause: 'House Construction — Build a Home' }}
            className="campaign-donate-cta"
          >
            Donate Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
