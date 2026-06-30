import '../index.css'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Founders() {
  return (
    <div className="founders-page">
      <Helmet>
        <title>Our Founders &amp; Team | Blue Shadows Foundation</title>
        <meta name="description" content="Meet the founders and core team behind Blue Shadows Foundation — young changemakers dedicated to healthcare, education, and community service in Andhra Pradesh." />
        <meta property="og:title" content="Founders &amp; Team | Blue Shadows Foundation" />
        <meta property="og:url" content="https://blueshadowsfoundation.org/#/founders" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />

      {/* Founders Content */}
      <section className="founders-hero">
        <div className="container">
          <h1>Meet Our Founders</h1>

          <div className="founders-photo-section">
            <div className="founders-group-photo">
              <img src="founders.jpg" alt="The four co-founders of Blue Shadows Foundation" loading="lazy" />
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

          {/* Our Constant Supporters */}
          <div className="team-section supporters-section">
            <div className="team-section-header">
              <div className="team-title-line"></div>
              <h2 className="team-section-title">★ Our Constant Supporters ★</h2>
              <div className="team-title-line"></div>
            </div>
            <p className="team-section-subtitle">The pillars behind our every step</p>
            <div className="team-names-flow">
              {[
                'Odugu Kodhanda Rama ChandraShekar',
                'Gudise Akhil',
                'Nakka Vikas',
                'Kandikatla Suhas',
                'Balla Kishore',
                'Jalem RadhaJanardhan',
                'Kakarla Sirisha',
                'Karthik Ganti',
                'Sharukh',
              ].map((name, index, arr) => (
                <span key={index} className="team-name-item">
                  <span className="team-name-text">{name}</span>
                  {index < arr.length - 1 && <span className="team-name-dot">&bull;</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Our Core Team */}
          <div className="team-section core-team-section">
            <div className="team-section-header">
              <div className="team-title-line"></div>
              <h2 className="team-section-title">★ Our Core Team ★</h2>
              <div className="team-title-line"></div>
            </div>
            <p className="team-section-subtitle">The hands that make our vision a reality</p>
            <div className="team-names-flow">
              {[
                'Bonthu RajaMadhu',
                'Dara Vinay',
                'Revu Prasad',
                'Chille Vijay',
                'Pothula David',
                'Kusuma Abhi',
                'Nakka Raj Kumar',
                'Kusuma Rajesh',
                'Chintha Rajvardhan',
                'Karipelli Prasanna',
              ].map((name, index, arr) => (
                <span key={index} className="team-name-item">
                  <span className="team-name-text">{name}</span>
                  {index < arr.length - 1 && <span className="team-name-dot">&bull;</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Founders
