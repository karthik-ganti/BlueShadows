import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleSectionNav = (sectionId) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img src="logo.jpg" alt="Blue Shadows Foundation" />
        </Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleSectionNav('about') }}>About</a>
          </li>
          <li>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleSectionNav('services') }}>Services</a>
          </li>
          <li>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); handleSectionNav('gallery') }}>Gallery</a>
          </li>
          <li><Link to="/founders" onClick={() => setMenuOpen(false)}>Founders</Link></li>
          <li><Link to="/member" onClick={() => setMenuOpen(false)}>Member</Link></li>
          <li><Link to="/campaign" className="nav-campaign-link" onClick={() => setMenuOpen(false)}>🏠 Campaign</Link></li>
          <li><Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link></li>
        </ul>
        <Link to="/donate" className="donate-btn desktop-donate" onClick={() => setMenuOpen(false)}>
          Donate Now
        </Link>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
