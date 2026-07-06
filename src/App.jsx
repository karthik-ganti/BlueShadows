import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Founders from './pages/Founders'
import Donate from './pages/Donate'
import Volunteer from './pages/Volunteer'
import Campaign from './pages/Campaign'
import TeamForm from './pages/TeamForm'

// ─── Impact Stats Counter ────────────────────────────────────────────────────

const STATS = [
  { label: 'Food & Groceries', value: 500, suffix: '+' },
  { label: 'Lives Impacted', value: 1500, suffix: '+' },
  { label: 'Villages Reached', value: 20, suffix: '+' },
  { label: 'Active Volunteers', value: 100, suffix: '+' },
  { label: 'Education Support', value: 1, suffix: '' },
]

function useCountUp(target, duration = 2000, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function StatCard({ label, value, suffix }) {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(value, 2000, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-number">{count.toLocaleString('en-IN')}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'How are donations used?',
    a: 'Your donations go directly towards free medical camps, food and clothing distribution, education support for underprivileged children, and community development programs in Razole, Malikipuram, and Amalapuram regions.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'We are currently in the process of obtaining 12A and 80G certifications. Once approved, donations will be eligible for tax deductions under Section 80G of the Income Tax Act. We will notify all donors.',
  },
  {
    q: 'Can I volunteer remotely?',
    a: 'Yes! We welcome remote volunteers for tasks like social media management, content writing, fundraising outreach, and online awareness campaigns. Reach out via our Volunteer page.',
  },
  {
    q: 'How do I confirm my donation was received?',
    a: 'After verifying your UPI payment, our team will send you a WhatsApp confirmation message on your registered number within 24 hours.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We primarily serve communities in Razole, Malikipuram, Amalapuram, and surrounding villages in the East Godavari district of Andhra Pradesh.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Campaign Banner ─────────────────────────────────────────────────────────

const CAMPAIGN_API = 'https://script.google.com/macros/s/AKfycbwtk5EmdEQ9AWa6H7zWm9O-727byuU_jANrjdXtvA8yRKZl6-F0e-jEy8uGQBoEthjM_w/exec'

function CampaignBanner() {
  const [raised, setRaised] = useState(null)
  const [visible, setVisible] = useState(() => sessionStorage.getItem('campaign-banner-closed') !== '1')

  useEffect(() => {
    if (!visible) return
    const cached = sessionStorage.getItem('campaign-raised')
    if (cached) setRaised(Number(cached))
    fetch(CAMPAIGN_API)
      .then(r => r.json())
      .then(d => { setRaised(d.raised || 0); sessionStorage.setItem('campaign-raised', String(d.raised || 0)) })
      .catch(() => {})
  }, [visible])

  if (!visible) return null

  return (
    <div className="campaign-banner">
      <span className="campaign-banner-text">
        🏠 <strong>URGENT:</strong> Help build a home for a family in need —{' '}
        {raised !== null ? `₹${raised.toLocaleString('en-IN')} / ₹1,50,000 raised` : 'Campaign live now'}
      </span>
      <div className="campaign-banner-actions">
        <Link to="/campaign" className="campaign-banner-link">See Campaign →</Link>
        <button
          className="campaign-banner-close"
          onClick={() => { setVisible(false); sessionStorage.setItem('campaign-banner-closed', '1') }}
          aria-label="Close banner"
        >×</button>
      </div>
    </div>
  )
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.state])

  return (
    <div className="app">
      <Helmet>
        <title>Blue Shadows Foundation | Lighting Lives Through Care &amp; Compassion</title>
        <meta name="description" content="Blue Shadows Foundation is an NGO in Andhra Pradesh dedicated to free medical camps, education support, food distribution, and community empowerment in rural India." />
        <meta property="og:title" content="Blue Shadows Foundation | Lighting Lives Through Care" />
        <meta property="og:description" content="Join us in bringing hope and care to those living in the shadows. Donate, volunteer, or spread the word." />
        <meta property="og:image" content="https://blueshadowsfoundation.org/logo.jpg" />
        <meta property="og:url" content="https://blueshadowsfoundation.org" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <CampaignBanner />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Lighting Lives Through Care, Compassion &amp; Change</h1>
            <p>Blue Shadows Foundation is dedicated to improving lives through free medical camps, education for the underprivileged, social service, and community empowerment.</p>
            <div className="hero-buttons">
              <a href="#/donate" className="cta-button">Donate Now</a>
              <a href="#/volunteer" className="cta-button secondary">Join as a Member</a>
            </div>
          </div>
          <div className="hero-logo-animation">
            <div className="logo-animation-container">
              <img src="logo.jpg" alt="Blue Shadows Foundation Logo" className="animated-logo" />
              <div className="logo-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="impact-stats" id="stats">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" id="about">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <p className="about-intro">
              Blue Shadows Foundation is a non-profit organization committed to serving society through healthcare support, educational assistance for the poor, awareness programs, and community development initiatives.
            </p>

            {/* Founders' Words */}
            <div className="founders-words-section">
              <h3 className="founders-words-title">Words from Our Founders</h3>
              <div className="founders-quotes-grid">
                <div className="founder-quote-card">
                  <div className="founder-photo-wrapper">
                    <img src="founder-naveen.jpg" alt="N. Kiran Kumar, Co-founder" className="founder-quote-photo" loading="lazy" />
                  </div>
                  <p className="founder-quote-text">"Instead of just feeling sympathy, the goal was to do something real like medical camps, support drives, and community help."</p>
                  <p className="founder-quote-name">N. Kiran Kumar</p>
                </div>
                <div className="founder-quote-card">
                  <div className="founder-photo-wrapper">
                    <img src="founder-jairaj.jpg" alt="J. Jairaj, Co-founder" className="founder-quote-photo" loading="lazy" />
                  </div>
                  <p className="founder-quote-text">"Blue Shadows is not just about helping others, but also about building a culture where young people step forward to serve society."</p>
                  <p className="founder-quote-name">J. Jairaj</p>
                </div>
                <div className="founder-quote-card">
                  <div className="founder-photo-wrapper">
                    <img src="founder-kiran.jpg" alt="K. Naveen Kumar, Co-founder" className="founder-quote-photo" loading="lazy" />
                  </div>
                  <p className="founder-quote-text">"Sometimes people don't just need money or medicine they need hope. This foundation exists to restore that."</p>
                  <p className="founder-quote-name">K. Naveen Kumar</p>
                </div>
                <div className="founder-quote-card">
                  <div className="founder-photo-wrapper">
                    <img src="founder-siddhartha.jpg" alt="Ch. Siddhartha, Co-founder" className="founder-quote-photo" loading="lazy" />
                  </div>
                  <p className="founder-quote-text">"Blue Shadows Foundation was started to bring hope, care, and light into the lives of people living in the shadows."</p>
                  <p className="founder-quote-name">Ch. Siddhartha</p>
                </div>
              </div>
            </div>

            {/* Founder Highlight */}
            <div className="founder-highlight">
              <div className="highlight-text">
                <p className="founder-label">With the Support of</p>
                <h3 className="founder-name-highlight">Pamula Prakash Deep</h3>
                <p className="founder-title">The Backbone of Our Mission</p>
                <p className="founder-description">A young entrepreneur whose vision and dedication form the backbone of Blue Shadows Foundation, driving our commitment to create positive change in society.</p>
              </div>
              <div className="highlight-photo-wrapper">
                <img src="founder-prakash.jpg" alt="Pamula Prakash Deep, supporter and visionary" className="highlight-photo" loading="lazy" />
              </div>
            </div>

            <div className="founder-video">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/5HcOS5DVuaM"
                  title="Pamula Prakash Deep — Blue Shadows Foundation founder story"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </div>

            <div className="vision-mission">
              <div className="vm-card">
                <h3>Our Vision</h3>
                <p>A healthier, educated, empowered, and equal society.</p>
              </div>
              <div className="vm-card">
                <h3>Our Mission</h3>
                <p>To deliver impactful services through medical camps, education support, awareness programs, and social initiatives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="impact-stories" id="stories">
        <div className="container">
          <h2 className="section-title">Blue Shadows Impact Stories</h2>
          <div className="videos-grid">
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/KWTuk8v6x50"
                title="Blue Shadows Impact Story — free medical camp"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/Rt67yY6xGMI"
                title="Blue Shadows Impact Story — community support"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/HLqebGu7SU0"
                title="Blue Shadows Impact Story — education support"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div className="video-container">
              <video controls preload="metadata" playsInline>
                <source src="impact-story-4.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="what-we-do" id="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="programmes-intro">
            At every step, we are together – especially when they need us the most.
          </p>
          <div className="programmes-grid">
            <div className="programme-card">
              <h3>Free Medical Camps</h3>
              <p>Providing healthcare services to underserved communities through regular medical camps.</p>
            </div>
            <div className="programme-card">
              <h3>Health Awareness Programs</h3>
              <p>Educating communities about preventive healthcare and healthy living practices.</p>
            </div>
            <div className="programme-card">
              <h3>Education Support</h3>
              <p>Supporting underprivileged children with educational resources and scholarships.</p>
            </div>
            <div className="programme-card">
              <h3>Rural Support</h3>
              <p>Empowering rural communities through development initiatives and resources.</p>
            </div>
            <div className="programme-card">
              <h3>Emergency Help Initiatives</h3>
              <p>Providing immediate assistance during emergencies and disasters.</p>
            </div>
            <div className="programme-card">
              <h3>Youth Awareness Programs</h3>
              <p>Giving awareness on traffic rules and many other important topics to the youth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <div className="container">
          <h2 className="section-title">Gallery</h2>
          <p className="gallery-intro">Take a glimpse of our journey and the lives we've touched through our initiatives.</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="medical-camp.jpg" alt="Free Medical Camp conducted at Lakkavaram" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="community-support.jpg" alt="Community support drive at Razole, Malikipuram, Amalapuram" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="children-celebration.jpg" alt="Children celebration event at Razole" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="rural-support.jpg" alt="Rural support initiative at Amalapuram" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="food-distribution.jpg" alt="Food distribution drive at Malikipuram" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="clothes-distribution.jpg" alt="Clothes distribution event at Razole" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </div>
  )
}

// ─── App Root ────────────────────────────────────────────────────────────────

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/founders" element={<Founders />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/team" element={<TeamForm />} />
      </Routes>
    </Router>
  )
}

export default App
