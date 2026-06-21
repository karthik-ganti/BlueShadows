import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VOLUNTEER_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyW6zOKmbbwWGcbEiYjGNU6iKpHE5o5jOmQLPu_3PxcC0NHx7XzAnpth2ij9RZxU65zaw/exec'

function Volunteer() {
  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})
  const [volunteerId, setVolunteerId] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const eCardRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showForm])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid 10-digit phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const rand = Math.floor(10000 + Math.random() * 90000)
      const id = `BSF-${rand}`
      const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
      setVolunteerId(id)
      setJoinDate(date)

      const payload = JSON.stringify({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        volunteerId: id,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
      await fetch(VOLUNTEER_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
      })
      setFormStep(2)
    } catch (err) {
      console.log('Volunteer submission error:', err)
      setFormStep(2)
    }
    setSubmitting(false)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setFormStep(1)
    setFormData({ name: '', phone: '', address: '' })
    setErrors({})
    setVolunteerId('')
    setJoinDate('')
  }

  const handleDownloadCard = async () => {
    if (!eCardRef.current) return
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(eCardRef.current, { scale: 3, useCORS: true, backgroundColor: null })
    const link = document.createElement('a')
    link.download = `BlueShadows-Volunteer-${volunteerId}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="app">
      <Helmet>
        <title>Volunteer | Blue Shadows Foundation</title>
        <meta name="description" content="Volunteer with Blue Shadows Foundation and help bring care, education, and hope to underserved communities in rural Andhra Pradesh." />
        <meta property="og:title" content="Volunteer With Blue Shadows Foundation" />
        <meta property="og:url" content="https://blueshadowsfoundations.org/#/volunteer" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />

      {/* Volunteer Hero */}
      <section className="volunteer-hero">
        <div className="volunteer-hero-content">
          <span className="volunteer-badge">Join Our Mission</span>
          <h1>Volunteer With Us</h1>
          <p>Be the change you want to see. Join Blue Shadows Foundation and help us bring light to those living in the shadows.</p>
          <button className="volunteer-cta-btn" onClick={() => setShowForm(true)}>
            <span className="btn-icon">🤝</span>
            Volunteer With Us
          </button>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="volunteer-why">
        <div className="container">
          <h2 className="section-title">Why Volunteer?</h2>
          <p className="volunteer-intro">Volunteering is more than giving your time — it's about making a lasting impact on the lives of people who need it most.</p>
          <div className="volunteer-reasons-grid">
            <div className="volunteer-reason-card">
              <div className="reason-icon">🏥</div>
              <h3>Medical Camps</h3>
              <p>Help us organize and run free medical camps for underserved communities across rural areas.</p>
            </div>
            <div className="volunteer-reason-card">
              <div className="reason-icon">📚</div>
              <h3>Education Support</h3>
              <p>Support underprivileged children with tutoring, mentoring, and educational resources.</p>
            </div>
            <div className="volunteer-reason-card">
              <div className="reason-icon">🍲</div>
              <h3>Food &amp; Clothes Drives</h3>
              <p>Participate in food and clothing distribution drives to help families in need.</p>
            </div>
            <div className="volunteer-reason-card">
              <div className="reason-icon">🤝</div>
              <h3>Community Building</h3>
              <p>Be part of youth awareness programs, community development, and social service events.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="volunteer-cta-section">
            <div className="volunteer-cta-card">
              <div className="cta-card-content">
                <h3>Ready to Make a Difference?</h3>
                <p>Join our growing community of changemakers. Register today and start your volunteering journey with Blue Shadows Foundation.</p>
                <button className="volunteer-cta-btn secondary" onClick={() => setShowForm(true)}>
                  <span className="btn-icon">✋</span>
                  Register as a Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Get In Touch */}
      <section className="volunteer-contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="volunteer-contact-intro">Ready to make a difference? Reach out to us through any of the channels below and we'll get you started on your volunteering journey.</p>

          <div className="volunteer-contact-grid">
            <div className="volunteer-contact-card">
              <div className="contact-card-icon">📧</div>
              <h3>Email Us</h3>
              <a href="mailto:blueshadowsfoundation@gmail.com" className="contact-card-link">blueshadowsfoundation@gmail.com</a>
              <p className="contact-card-note">We'll respond within 24 hours</p>
            </div>
            <div className="volunteer-contact-card">
              <div className="contact-card-icon">📞</div>
              <h3>Call Us</h3>
              <a href="tel:+917828323456" className="contact-card-link">78283 23456</a>
              <p className="contact-card-note">Available Mon – Sat, 9 AM – 6 PM</p>
            </div>
            <div className="volunteer-contact-card">
              <div className="contact-card-icon">📍</div>
              <h3>Visit Us</h3>
              <p className="contact-card-link">Razole, Malikipuram, Amalapuram</p>
              <p className="contact-card-note">East Godavari, Andhra Pradesh</p>
            </div>
          </div>

          <div className="volunteer-social">
            <h3>Follow Us on Social Media</h3>
            <div className="volunteer-social-links">
              <a href="https://www.instagram.com/bluee_shadowss?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==" target="_blank" rel="noopener noreferrer" className="social-btn instagram" aria-label="Blue Shadows on Instagram">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </span> Instagram
              </a>
              <a href="https://www.facebook.com/share/1CejWhfb9z/" target="_blank" rel="noopener noreferrer" className="social-btn facebook" aria-label="Blue Shadows on Facebook">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M13 22v-8h3l1-4h-4V7c0-1.2.3-2 2-2h2V1.2C16.6 1.1 15.3 1 14 1c-3 0-5 1.8-5 5v3H6v4h3v8h4z" />
                  </svg>
                </span> Facebook
              </a>
              <a href="https://chat.whatsapp.com/JZXlyRJjzqf3Fq0qewLIOf?mode=gi_t" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp" aria-label="Blue Shadows WhatsApp Community">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Volunteer Registration Modal ────────────────────────── */}
      {showForm && (
        <div className="vol-modal-overlay" onClick={handleCloseForm}>
          <div className="vol-modal" onClick={(e) => e.stopPropagation()}>
            <button className="vol-modal-close" onClick={handleCloseForm} aria-label="Close">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {formStep === 1 && (
              <div className="vol-form-content fade-in-up">
                <div className="vol-form-logo">
                  <img src="logo.jpg" alt="Blue Shadows Foundation" />
                </div>
                <div className="vol-form-header">
                  <span className="vol-form-badge">Volunteer Registration</span>
                  <h2>Join Blue Shadows</h2>
                  <p>Fill in your details below and become part of our mission to uplift communities.</p>
                </div>

                <form onSubmit={handleSubmit} className="vol-form">
                  <div className="vol-form-group">
                    <label className="vol-form-label" htmlFor="vol-name">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="vol-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`vol-form-input ${errors.name ? 'error' : ''}`}
                      autoComplete="name"
                    />
                    {errors.name && <span className="vol-error">{errors.name}</span>}
                  </div>

                  <div className="vol-form-group">
                    <label className="vol-form-label" htmlFor="vol-phone">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="vol-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your 10-digit phone number"
                      className={`vol-form-input ${errors.phone ? 'error' : ''}`}
                      autoComplete="tel"
                      maxLength={10}
                    />
                    {errors.phone && <span className="vol-error">{errors.phone}</span>}
                  </div>

                  <div className="vol-form-group">
                    <label className="vol-form-label" htmlFor="vol-address">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Address <span className="required">*</span>
                    </label>
                    <textarea
                      id="vol-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your full address"
                      className={`vol-form-input vol-textarea ${errors.address ? 'error' : ''}`}
                      rows={3}
                      autoComplete="street-address"
                    />
                    {errors.address && <span className="vol-error">{errors.address}</span>}
                  </div>

                  <button type="submit" className="vol-submit-btn" disabled={submitting}>
                    {submitting ? (
                      <><span className="vol-spinner"></span>Submitting...</>
                    ) : (
                      <>Submit Registration
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                <p className="vol-form-footer">
                  By submitting, you agree to be contacted by Blue Shadows Foundation regarding volunteer opportunities.
                </p>
              </div>
            )}

            {formStep === 2 && (
              <div className="vol-success-content fade-in-up">
                <div className="vol-success-icon">
                  <svg viewBox="0 0 120 120" className="vol-checkmark-circle">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#38a169" strokeWidth="6" className="vol-checkmark-ring" />
                    <path d="M35 60 L52 77 L85 44" fill="none" stroke="#38a169" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="vol-checkmark-path" />
                  </svg>
                </div>
                <h2 className="vol-success-title">Welcome, {formData.name}! 🎉</h2>
                <p className="vol-success-msg">Your volunteer registration is confirmed. Here is your official e-card!</p>

                {/* E-Card */}
                <div className="vol-ecard" ref={eCardRef}>
                  <div className="vol-ecard-header">Volunteer | e Card</div>

                  <div className="vol-ecard-body">
                    <div className="vol-ecard-gradient-section">
                      <div className="vol-ecard-logo-circle">
                        <img src="logo.jpg" alt="Blue Shadows Foundation" crossOrigin="anonymous" />
                      </div>
                    </div>

                    <div className="vol-ecard-content">
                      <div className="vol-ecard-label">NAME</div>
                      <div className="vol-ecard-name">{formData.name.toUpperCase()}</div>

                      <div className="vol-ecard-label vol-ecard-id-label">ID</div>
                      <div className="vol-ecard-id-number">{volunteerId}</div>

                      <div className="vol-ecard-foundation">BLUE SHADOWS FOUNDATION</div>
                      <div className="vol-ecard-volunteer">VOLUNTEER</div>

                      <div className="vol-ecard-footer">Blueshadowsfoundation.org</div>
                    </div>
                  </div>
                </div>

                <button className="vol-download-btn" onClick={handleDownloadCard}>
                  ⬇ Download E-Card
                </button>
                <button className="vol-done-btn" onClick={handleCloseForm}>Done ✓</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Volunteer
