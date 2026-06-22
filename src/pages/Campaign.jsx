import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GOAL = 150000
const CAMPAIGN_API = 'https://script.google.com/macros/s/AKfycbwtk5EmdEQ9AWa6H7zWm9O-727byuU_jANrjdXtvA8yRKZl6-F0e-jEy8uGQBoEthjM_w/exec'

const TIERS = [
  { amount: 20000, icon: '🧱', label: 'Bricks',                          desc: 'Supply bricks to build strong, solid walls for the home.' },
  { amount: 2000,  icon: '🪨', label: '10 Bricks + 1 Cement Bag + 2 Sand Bags', desc: 'Essential raw materials to lay the foundation of the walls.' },
  { amount: 3000,  icon: '👷', label: 'Workers Wages',                    desc: 'Pay a day\'s wage for the skilled workers building this home.' },
  { amount: 15000, icon: '🚿', label: 'Bathroom',                         desc: 'Build a complete bathroom — dignity and sanitation for the family.' },
  { amount: 40000, icon: '🏗️', label: 'Roofing Material',                desc: 'A roof over their heads — protection from sun and rain.' },
  { amount: 15000, icon: '⚡', label: 'Electrical Wiring',               desc: 'Power and lighting for the entire home.' },
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
              A mother who lost her husband is raising her two children alone, without a safe roof
              over their heads. Together, we can change that — one brick at a time.
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
          <div className="campaign-story-single">
            <p className="campaign-story-para">
              She lost her husband unexpectedly, leaving her alone to raise their two young children
              with no stable income and no roof she could truly call safe. Every monsoon brings
              dread, every summer brings exhaustion — yet she has held her family together with
              nothing but courage and determination.
            </p>
            <p className="campaign-story-para">
              Blue Shadows Foundation met her during one of our community outreach camps. Her
              strength moved us deeply, and we made a promise — to build her a home where her
              children can grow up with safety, dignity, and hope. With your support, we will
              keep that promise, one brick at a time.
            </p>
            <blockquote className="campaign-family-quote">
              "I never thought anyone would come forward for us. I just want my children to have
              a safe place to sleep. That is all I have ever wished for."
              <cite>— A mother of two</cite>
            </blockquote>
            <blockquote className="campaign-family-quote">
              "When it rains, we are afraid. I dream of a house where me and my brother
              can study without worrying about the roof. Please help us."
              <cite>— Her daughter</cite>
            </blockquote>
            <div className="campaign-story-photo">
              <img src="campaign-family.jpeg" alt="The family we are helping" loading="lazy"
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
