import { useState } from 'react'
import { Link } from 'react-router-dom'

function Donate() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [citizenType, setCitizenType] = useState('indian')
  const [frequency, setFrequency] = useState('onetime')
  const [amount, setAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [cause, setCause] = useState('')
  const [showQR, setShowQR] = useState(false)

  const presetAmounts = ['₹500', '₹1000', '₹2000', '₹5000', '₹10000', '₹20000']
  const causes = [
    'Medical Camps',
    'Education Support',
    'Food Distribution',
    'Clothes Distribution',
    'Community Development',
    'Youth Awareness Programs'
  ]

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt)
    setAmount(amt.replace('₹', ''))
  }

  const handleCustomAmount = (e) => {
    setAmount(e.target.value)
    setSelectedAmount(null)
  }

  const handleNext = () => {
    alert(`Thank you for your interest in donating ₹${amount} (${frequency === 'onetime' ? 'One Time' : 'Monthly'}) for ${cause || 'General Support'}!\n\nThis is a demo form. Actual payment integration will be added soon.`)
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="logo.jpg" alt="Blue Shadows Logo" />
          </Link>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/#services" onClick={() => setMenuOpen(false)}>Services</a></li>
            <li><a href="/#gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
            <li><Link to="/founders" onClick={() => setMenuOpen(false)}>Founders</Link></li>
            <li><Link to="/donate" onClick={() => setMenuOpen(false)} className="nav-donate-active">Donate</Link></li>
          </ul>
          <Link to="/donate" className="donate-btn desktop-donate">Donate Now</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Donation Form */}
      <section className="donate-section">
        <div className="donate-container">
          <h1 className="donate-title">Make a Difference Today</h1>
          <p className="donate-subtitle">Your contribution brings hope and light to those living in the shadows.</p>

          <div className="donate-card">
            {/* Citizen Type Toggle */}
            <div className="toggle-group citizen-toggle">
              <button
                className={`toggle-btn ${citizenType === 'indian' ? 'active' : ''}`}
                onClick={() => setCitizenType('indian')}
              >
                <span className="toggle-check">{citizenType === 'indian' ? '✓' : '○'}</span>
                Indian Citizens
              </button>
              <button
                className={`toggle-btn ${citizenType === 'foreign' ? 'active' : ''}`}
                onClick={() => setCitizenType('foreign')}
              >
                <span className="toggle-check">{citizenType === 'foreign' ? '✓' : '○'}</span>
                Foreign Citizens/OCI
              </button>
            </div>

            {/* Info Banner */}
            <div className="info-banner">
              <span className="info-icon">ⓘ</span>
              <span>For {citizenType === 'indian' ? 'Indian' : 'Foreign'} Passport holders</span>
            </div>

            {/* Frequency Toggle */}
            <div className="toggle-group frequency-toggle">
              <button
                className={`freq-btn ${frequency === 'onetime' ? 'active' : ''}`}
                onClick={() => setFrequency('onetime')}
              >
                <span className="heart-icon">♥</span> One Time
              </button>
              <button
                className={`freq-btn ${frequency === 'monthly' ? 'active' : ''}`}
                onClick={() => setFrequency('monthly')}
              >
                <span className="heart-icon">♥</span> Monthly
              </button>
            </div>

            {/* Preset Amounts */}
            <div className="amount-grid">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  className={`amount-btn ${selectedAmount === amt ? 'selected' : ''}`}
                  onClick={() => handleAmountSelect(amt)}
                >
                  {amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="custom-amount">
              <label className="custom-label">Enter Your Own Amount <span className="required">*</span></label>
              <div className="custom-input-wrapper">
                <span className="currency">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleCustomAmount}
                  placeholder="Enter amount"
                  className="custom-input"
                />
              </div>
            </div>

            {/* Cause Selection */}
            <div className="cause-select">
              <label className="custom-label">I Pledge My Support For <span className="required">*</span></label>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="cause-dropdown"
              >
                <option value="">Select a cause</option>
                {causes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Next Button */}
            <button
              className="donate-next-btn"
              onClick={handleNext}
              disabled={!amount || !cause}
            >
              Next
            </button>

            {/* Pay with QR */}
            <div className="qr-payment-section">
              <div className="qr-divider">
                <span>OR</span>
              </div>
              <button
                className="qr-toggle-btn"
                onClick={() => setShowQR(!showQR)}
              >
                <span className="qr-icon">📱</span> Pay with QR Code
              </button>
              <div className={`qr-code-display ${showQR ? 'show' : ''}`}>
                <div className="qr-card">
                  <h3>Scan & Pay</h3>
                  <p className="qr-upi-id">UPI ID: <strong>82537301@ubin</strong></p>
                  <img src="qr-code.jpg" alt="Blue Shadows Foundation QR Code" className="qr-image" />
                  <p className="qr-note">Scan this QR code using any UPI app (Google Pay, PhonePe, Paytm, BHIM)</p>
                </div>
              </div>
            </div>

            {/* Tax Info */}
            {citizenType === 'indian' && (
              <div className="tax-info">
                <p>As per Indian Income Tax rules, a donor with Indian passport is required to add their Address and PAN number in case they wish to receive the 80G tax-exemption certificate.</p>
                <p className="no-refund">No refunds will be entertained after the instant tax exemption has been issued.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="logo.jpg" alt="Blue Shadows Logo" />
            </div>
            <p className="tagline">"Bringing light to those living in the shadows."</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/founders">Founders</Link></li>
              <li><a href="/#services">Our Services</a></li>
              <li><Link to="/donate">Donate</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul>
              <li>Email: blueshadowsfoundation@gmail.com</li>
              <li>Phone: 78283 23456</li>
              <li>Location: Razole, Malikipuram, Amalapuram</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://www.instagram.com/bluee_shadowss?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Blue Shadows. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Donate
