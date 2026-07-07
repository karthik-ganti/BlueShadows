import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="logo.jpg" alt="Blue Shadows Foundation" />
          </div>
          <p className="tagline">"Bringing light to those living in the shadows."</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/founders">Founders</Link></li>
            <li><a href="/#services">Our Services</a></li>
            <li><Link to="/member">Member</Link></li>
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
            <li>
              <a href="https://www.instagram.com/bluee_shadowss?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==" target="_blank" rel="noopener noreferrer" aria-label="Blue Shadows on Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/share/1CejWhfb9z/" target="_blank" rel="noopener noreferrer" aria-label="Blue Shadows on Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://chat.whatsapp.com/JZXlyRJjzqf3Fq0qewLIOf?mode=gi_t" target="_blank" rel="noopener noreferrer" aria-label="Join Blue Shadows WhatsApp Community">
                WhatsApp Community
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <span>Registration No: 261/2025</span>
          <span className="footer-legal-sep">|</span>
          <span>DARPAN ID: AP/2026/1066271</span>
        </div>
        <p>&copy; 2026 Blue Shadows. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
