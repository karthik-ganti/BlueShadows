import { useState } from 'react'
import { Link } from 'react-router-dom'

function Volunteer() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            <li><Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link></li>
          </ul>
          <Link to="/donate" className="donate-btn desktop-donate">Donate Now</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Volunteer Hero */}
      <section className="volunteer-hero">
        <div className="volunteer-hero-content">
          <span className="volunteer-badge">Join Our Mission</span>
          <h1>Volunteer With Us</h1>
          <p>Be the change you want to see. Join Blue Shadows Foundation and help us bring light to those living in the shadows.</p>
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
              <h3>Food & Clothes Drives</h3>
              <p>Participate in food and clothing distribution drives to help families in need.</p>
            </div>
            <div className="volunteer-reason-card">
              <div className="reason-icon">🤝</div>
              <h3>Community Building</h3>
              <p>Be part of youth awareness programs, community development, and social service events.</p>
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
              <a href="https://www.instagram.com/bluee_shadowss?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </span> Instagram
              </a>
              <a href="https://www.facebook.com/share/1CejWhfb9z/" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 22v-8h3l1-4h-4V7c0-1.2.3-2 2-2h2V1.2C16.6 1.1 15.3 1 14 1c-3 0-5 1.8-5 5v3H6v4h3v8h4z" />
                  </svg>
                </span> Facebook
              </a>
            </div>
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
              <li><a href="https://www.facebook.com/share/1CejWhfb9z/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Blue Shadows. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Volunteer
