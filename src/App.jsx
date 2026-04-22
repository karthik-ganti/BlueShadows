import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Founders from './pages/Founders'

function Home() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <img src="/logo.jpg" alt="Blue Shadows Logo" />
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="/founders">Founders</a></li>
          </ul>
          <a href="#donate" className="donate-btn">Donate Now</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Lighting Lives Through Care, Compassion & Change</h1>
            <p>Blue Shadows Foundation is dedicated to improving lives through free medical camps, education for the underprivileged, social service, and community empowerment.</p>
            <div className="hero-buttons">
              <a href="#donate" className="cta-button">Donate Now</a>
              <a href="#about" className="cta-button secondary">Volunteer With Us</a>
            </div>
          </div>
          <div className="hero-logo-animation">
            <div className="logo-animation-container">
              <img src="/logo.jpg" alt="Blue Shadows Logo" className="animated-logo" />
              <div className="logo-glow"></div>
            </div>
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
            
            {/* Founder Highlight */}
            <div className="founder-highlight">
              <p className="founder-label">With the Support of</p>
              <h3 className="founder-name-highlight">Pamula Prakash Deep</h3>
              <p className="founder-title">The Backbone of Our Mission</p>
              <p className="founder-description">A young entrepreneur whose vision and dedication form the backbone of Blue Shadows Foundation, driving our commitment to create positive change in society.</p>
            </div>
            
            <div className="founder-video">
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/5HcOS5DVuaM" 
                  title="Pamula Prakash Deep - Founder"
                  frameBorder="0" 
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
                title="Blue Shadows Impact Story 1"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="video-container">
              <iframe 
                src="https://www.youtube.com/embed/Rt67yY6xGMI" 
                title="Blue Shadows Impact Story 2"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="video-container">
              <iframe 
                src="https://www.youtube.com/embed/HLqebGu7SU0" 
                title="Blue Shadows Impact Story 3"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
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
              <img src="/medical-camp.jpg" alt="Free Medical Camp at Lakkavaram" />
            </div>
            <div className="gallery-item">
              <img src="/community-support.jpg" alt="Community Support at Razole, Malikipuram, Amalapuram" />
            </div>
            <div className="gallery-item">
              <img src="/children-celebration.jpg" alt="Children Celebration at Razole, Malikipuram, Amalapuram" />
            </div>
            <div className="gallery-item">
              <img src="/rural-support.jpg" alt="Rural Support at Razole, Malikipuram, Amalapuram" />
            </div>
            <div className="gallery-item">
              <img src="/food-distribution.jpg" alt="Food Distribution at Razole, Malikipuram, Amalapuram" />
            </div>
            <div className="gallery-item">
              <img src="/clothes-distribution.jpg" alt="Clothes Distribution at Razole, Malikipuram, Amalapuram" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="Blue Shadows Logo" />
            </div>
            <p className="tagline">"Bringing light to those living in the shadows."</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/founders">Founders</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#donate">Donate</a></li>
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/founders" element={<Founders />} />
      </Routes>
    </Router>
  )
}

export default App
