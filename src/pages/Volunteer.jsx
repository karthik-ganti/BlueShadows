import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Volunteer() {
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Volunteer
