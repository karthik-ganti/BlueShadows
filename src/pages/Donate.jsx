import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

// Google Apps Script URL — replace with your deployed web app URL
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyTk0DIAD9NTE9H2FHGc907Cx7-wJO386czvjDEEzRveQz2TdItgy7jkqU_EuRmC9SBCg/exec'

const UPI_ID = '82537301@ubin'
const PAYEE_NAME = 'Blue Shadows Foundation'

function Donate() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [citizenType, setCitizenType] = useState('indian')
  const [frequency, setFrequency] = useState('onetime')
  const [amount, setAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [cause, setCause] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const presetAmounts = ['500', '1000', '2000', '5000', '10000', '20000']
  const causes = [
    'Medical Camps',
    'Education Support',
    'Food Distribution',
    'Clothes Distribution',
    'Community Development',
    'Youth Awareness Programs'
  ]

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        && window.innerWidth <= 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt)
    setAmount(amt)
  }

  const handleCustomAmount = (e) => {
    setAmount(e.target.value)
    setSelectedAmount(null)
  }

  const upiUri = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Donation for ' + (cause || 'General Support'))}`

  const handleGoToInfo = () => {
    if (!amount || !cause) return
    setStep(2)
  }

  const handleProceedToPay = async () => {
    if (!donorName || !donorPhone) return
    setSubmitting(true)

    // Send donor data to Google Sheets
    try {
      const payload = JSON.stringify({
        country: citizenType === 'indian' ? 'India' : 'Foreign',
        amount: amount,
        purpose: cause,
        name: donorName,
        phone: donorPhone,
        frequency: frequency,
        timestamp: new Date().toISOString()
      })

      // Use text/plain to avoid CORS preflight — Google Apps Script
      // will still receive the JSON string in e.postData.contents
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
      })
    } catch (err) {
      console.log('Sheet submission error:', err)
    }

    setSubmitting(false)
    setStep(3)
  }

  const handlePaymentDone = () => {
    setStep(4)
  }

  const handleDonateAgain = () => {
    setStep(1)
    setAmount('')
    setSelectedAmount(null)
    setCause('')
    setDonorName('')
    setDonorPhone('')
    setCitizenType('indian')
    setFrequency('onetime')
  }

  const stepLabels = ['Choose', 'Your Info', 'Payment', 'Thank You']

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

      {/* Donation Section */}
      <section className="donate-section">
        <div className="donate-container">
          <h1 className="donate-title">Make a Difference Today</h1>
          <p className="donate-subtitle">Your contribution brings hope and light to those living in the shadows.</p>

          {/* Step Progress Bar */}
          <div className="step-progress">
            {stepLabels.map((label, i) => (
              <div key={label} className={`step-item ${step >= i + 1 ? 'active' : ''} ${step > i + 1 ? 'completed' : ''}`}>
                <div className="step-circle">
                  {step > i + 1 ? (
                    <svg viewBox="0 0 24 24" className="step-check-icon"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" /></svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span className="step-label">{label}</span>
                {i < stepLabels.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>

          {/* ===== STEP 1: Choose ===== */}
          {step === 1 && (
            <div className="donate-card step-content fade-in-up">
              {/* Citizen Type Toggle */}
              <div className="form-group">
                <label className="form-label">I am a</label>
                <div className="toggle-group citizen-toggle">
                  <button
                    className={`toggle-btn ${citizenType === 'indian' ? 'active' : ''}`}
                    onClick={() => setCitizenType('indian')}
                  >
                    <span className="toggle-icon">🇮🇳</span>
                    Indian Citizen
                  </button>
                  <button
                    className={`toggle-btn ${citizenType === 'foreign' ? 'active' : ''}`}
                    onClick={() => setCitizenType('foreign')}
                  >
                    <span className="toggle-icon">🌍</span>
                    Foreign Citizen / OCI
                  </button>
                </div>
              </div>

              {/* Info Banner */}
              <div className="info-banner">
                <span className="info-icon">ⓘ</span>
                <span>For {citizenType === 'indian' ? 'Indian' : 'Foreign'} Passport holders</span>
              </div>

              {/* Frequency Toggle */}
              <div className="form-group">
                <label className="form-label">Donation Frequency</label>
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
              </div>

              {/* Preset Amounts */}
              <div className="form-group">
                <label className="form-label">Select Amount</label>
                <div className="amount-grid">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      className={`amount-btn ${selectedAmount === amt ? 'selected' : ''}`}
                      onClick={() => handleAmountSelect(amt)}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="form-group">
                <label className="form-label">Or Enter Your Own Amount <span className="required">*</span></label>
                <div className="custom-input-wrapper">
                  <span className="currency">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleCustomAmount}
                    placeholder="Enter amount"
                    className="custom-input"
                    min="1"
                  />
                </div>
              </div>

              {/* Cause Selection */}
              <div className="form-group">
                <label className="form-label">I Pledge My Support For <span className="required">*</span></label>
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

              {/* Tax Info */}
              {citizenType === 'indian' && (
                <div className="tax-info">
                  <p>As per Indian Income Tax rules, a donor with Indian passport is required to add their Address and PAN number in case they wish to receive the 80G tax-exemption certificate.</p>
                  <p className="no-refund">No refunds will be entertained after the instant tax exemption has been issued.</p>
                </div>
              )}

              {/* Next Button */}
              <button
                className="donate-next-btn"
                onClick={handleGoToInfo}
                disabled={!amount || !cause}
              >
                Next — Enter Your Details →
              </button>
            </div>
          )}

          {/* ===== STEP 2: Donor Info ===== */}
          {step === 2 && (
            <div className="donate-card step-content fade-in-up">
              <div className="step-summary-bar">
                <div className="summary-chip"><span>🏷️</span> ₹{amount}</div>
                <div className="summary-chip"><span>🎯</span> {cause}</div>
                <div className="summary-chip"><span>{citizenType === 'indian' ? '🇮🇳' : '🌍'}</span> {citizenType === 'indian' ? 'Indian' : 'Foreign'}</div>
              </div>

              <h2 className="step-heading">Your Information</h2>
              <p className="step-desc">Please provide your details so we can acknowledge your generous contribution.</p>

              <div className="form-group">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </div>

              <div className="step-buttons">
                <button className="back-btn" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  className="donate-next-btn proceed-btn"
                  onClick={handleProceedToPay}
                  disabled={!donorName || !donorPhone || submitting}
                >
                  {submitting ? 'Processing...' : 'Proceed to Pay →'}
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 3: Payment ===== */}
          {step === 3 && (
            <div className="donate-card step-content fade-in-up">
              <div className="payment-header">
                <div className="payment-amount-display">
                  <span className="payment-label">Amount to Pay</span>
                  <span className="payment-amount">₹{Number(amount).toLocaleString('en-IN')}</span>
                </div>
                <div className="payment-purpose">{cause}</div>
              </div>

              {isMobile ? (
                /* Mobile — UPI Deep Link */
                <div className="mobile-payment">
                  <div className="upi-icon-row">
                    <span className="upi-app-icon">📱</span>
                  </div>
                  <h3 className="payment-title">Pay via UPI App</h3>
                  <p className="payment-desc">Tap the button below to open your preferred UPI app and complete the payment.</p>
                  <a
                    href={upiUri}
                    className="upi-pay-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pay ₹{Number(amount).toLocaleString('en-IN')} via UPI
                  </a>
                  <div className="upi-apps-hint">
                    <span>Works with</span>
                    <div className="app-names">Google Pay • PhonePe • Paytm • BHIM</div>
                  </div>
                </div>
              ) : (
                /* Desktop — QR Code */
                <div className="desktop-payment">
                  <h3 className="payment-title">Scan & Pay</h3>
                  <p className="payment-desc">Scan this QR code using any UPI app on your phone to complete the payment.</p>
                  <div className="qr-container">
                    <div className="qr-wrapper">
                      <QRCodeSVG
                        value={upiUri}
                        size={220}
                        level="H"
                        includeMargin={true}
                        bgColor="#ffffff"
                        fgColor="#1e3a5f"
                      />
                    </div>
                    <p className="qr-upi-id">UPI ID: <strong>{UPI_ID}</strong></p>
                  </div>
                  <div className="upi-apps-hint">
                    <span>Scan with</span>
                    <div className="app-names">Google Pay • PhonePe • Paytm • BHIM</div>
                  </div>
                </div>
              )}

              <div className="payment-actions">
                <button className="payment-done-btn" onClick={handlePaymentDone}>
                  ✓ I've Completed the Payment
                </button>
                <button className="back-btn" onClick={() => setStep(2)}>
                  ← Go Back
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 4: Thank You ===== */}
          {step === 4 && (
            <div className="donate-card step-content fade-in-up thank-you-card">
              <div className="thank-you-icon">
                <svg viewBox="0 0 120 120" className="checkmark-circle">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#38a169" strokeWidth="6" className="checkmark-ring" />
                  <path d="M35 60 L52 77 L85 44" fill="none" stroke="#38a169" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="checkmark-path" />
                </svg>
              </div>
              <h2 className="thank-you-title">Thank You, {donorName}! 🙏</h2>
              <p className="thank-you-message">
                Your generous donation of <strong>₹{Number(amount).toLocaleString('en-IN')}</strong> for <strong>{cause}</strong> will make a real difference in the lives of those we serve.
              </p>
              <p className="thank-you-note">
                Our team will verify your payment and send you a gratitude message shortly on your registered number.
              </p>

              <div className="donation-summary">
                <h4>Donation Summary</h4>
                <div className="summary-row"><span>Donor</span><span>{donorName}</span></div>
                <div className="summary-row"><span>Phone</span><span>{donorPhone}</span></div>
                <div className="summary-row"><span>Amount</span><span>₹{Number(amount).toLocaleString('en-IN')}</span></div>
                <div className="summary-row"><span>Purpose</span><span>{cause}</span></div>
                <div className="summary-row"><span>Type</span><span>{frequency === 'onetime' ? 'One Time' : 'Monthly'}</span></div>
              </div>

              <button className="donate-again-btn" onClick={handleDonateAgain}>
                Donate Again ♥
              </button>
            </div>
          )}
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
              <li><a href="https://www.facebook.com/share/1CejWhfb9z/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
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
