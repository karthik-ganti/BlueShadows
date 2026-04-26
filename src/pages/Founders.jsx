import { useState } from 'react'
import '../index.css'

function Founders() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="founders-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#/" className="logo">
            <img src="logo.jpg" alt="Blue Shadows Logo" />
          </a>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#/about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#/services" onClick={() => setMenuOpen(false)}>Services</a></li>
            <li><a href="#/gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
            <li><a href="#/founders" onClick={() => setMenuOpen(false)}>Founders</a></li>
          </ul>
          <a href="#/" className="donate-btn desktop-donate">Donate Now</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Founders Content */}
      <section className="founders-hero">
        <div className="container">
          <h1>Meet Our Founders</h1>
          
          <div className="founders-photo-section">
            <div className="founders-group-photo">
              <img src="founders.jpg" alt="Founders of Blue Shadows" />
            </div>
            <div className="founders-names-inline">
              <span className="founder-name">K. Naveen Kumar</span>
              <span className="separator">|</span>
              <span className="founder-name">J. Jairaj</span>
              <span className="separator">|</span>
              <span className="founder-name">N. Kiran Kumar</span>
              <span className="separator">|</span>
              <span className="founder-name">Ch. Siddhartha</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
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
              <li><a href="#/">Home</a></li>
              <li><a href="#/founders">Founders</a></li>
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
              <li><a href="https://chat.whatsapp.com/JZXlyRJjzqf3Fq0qewLIOf?mode=gi_t" target="_blank" rel="noopener noreferrer">WhatsApp Community</a></li>
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

export default Founders
