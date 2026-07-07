import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VOLUNTEER_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyW6zOKmbbwWGcbEiYjGNU6iKpHE5o5jOmQLPu_3PxcC0NHx7XzAnpth2ij9RZxU65zaw/exec'

function Volunteer() {
  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', bloodGroup: '', photo: null })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [volunteerId, setVolunteerId] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const memberCardRef = useRef(null)
  const cropImgRef = useRef(null)
  const [cropSrc, setCropSrc] = useState(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState(null)
  const [cropModalOpen, setCropModalOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = (showForm || cropModalOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showForm])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid 10-digit phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required'
    if (!formData.photo) newErrors.photo = 'Please upload your photo'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCropSrc(ev.target.result)
      setCrop(undefined)
      setCompletedCrop(null)
      setCropModalOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const onCropImageLoad = (e) => {
    const { width, height } = e.currentTarget
    const pct = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 286 / 361, width, height),
      width, height
    )
    setCrop(pct)
    setCompletedCrop(convertToPixelCrop(pct, width, height))
  }

  const handleCropConfirm = () => {
    const img = cropImgRef.current
    if (!img) return
    const scaleX = img.naturalWidth / img.width
    const scaleY = img.naturalHeight / img.height
    const c = completedCrop || { x: 0, y: 0, width: img.width, height: img.height, unit: 'px' }
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(c.width * scaleX)
    canvas.height = Math.round(c.height * scaleY)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      img,
      Math.round(c.x * scaleX),
      Math.round(c.y * scaleY),
      Math.round(c.width * scaleX),
      Math.round(c.height * scaleY),
      0, 0, canvas.width, canvas.height
    )
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
    setPhotoPreview(dataUrl)
    setFormData(prev => ({ ...prev, photo: dataUrl }))
    setErrors(prev => ({ ...prev, photo: '' }))
    setCropModalOpen(false)
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
    setFormData({ name: '', phone: '', address: '', bloodGroup: '', photo: null })
    setPhotoPreview(null)
    setErrors({})
    setVolunteerId('')
    setJoinDate('')
  }

  const drawOnCanvas = useCallback((canvas, download = false) => {
    const templateImg = new Image()
    templateImg.crossOrigin = 'anonymous'
    templateImg.src = 'member-card.jpeg'
    templateImg.onload = () => {
      canvas.width = templateImg.naturalWidth
      canvas.height = templateImg.naturalHeight
      const ctx = canvas.getContext('2d')
      const w = canvas.width
      const h = canvas.height
      ctx.drawImage(templateImg, 0, 0)

      const finishDraw = () => {
        ctx.textAlign = 'left'
        ctx.fillStyle = '#000000'
        ctx.font = `700 ${Math.round(h * 0.030)}px Poppins, sans-serif`
        const xVal = Math.round(w * 0.405)
        ctx.fillText(volunteerId,         xVal, Math.round(h * 0.527))
        ctx.fillText(formData.name,       xVal, Math.round(h * 0.608))
        ctx.fillText(joinDate,            xVal, Math.round(h * 0.686))
        ctx.fillText('General Member',     xVal, Math.round(h * 0.764))
        ctx.fillText(formData.bloodGroup, xVal, Math.round(h * 0.843))
        if (download) {
          const link = document.createElement('a')
          link.download = `BSF-MemberCard-${volunteerId}.jpeg`
          link.href = canvas.toDataURL('image/jpeg', 0.95)
          link.click()
        }
      }

      if (photoPreview) {
        const photoImg = new Image()
        photoImg.onload = () => {
          const boxX = Math.round(w * 0.756)
          const boxY = Math.round(h * 0.063)
          const boxW = Math.round(w * 0.186)
          const boxH = Math.round(h * 0.352)
          const r = Math.round(w * 0.013)
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(boxX + r, boxY)
          ctx.lineTo(boxX + boxW - r, boxY)
          ctx.arcTo(boxX + boxW, boxY, boxX + boxW, boxY + r, r)
          ctx.lineTo(boxX + boxW, boxY + boxH - r)
          ctx.arcTo(boxX + boxW, boxY + boxH, boxX + boxW - r, boxY + boxH, r)
          ctx.lineTo(boxX + r, boxY + boxH)
          ctx.arcTo(boxX, boxY + boxH, boxX, boxY + boxH - r, r)
          ctx.lineTo(boxX, boxY + r)
          ctx.arcTo(boxX, boxY, boxX + r, boxY, r)
          ctx.closePath()
          ctx.clip()
          const scale = Math.max(boxW / photoImg.width, boxH / photoImg.height)
          const dw = photoImg.width * scale
          const dh = photoImg.height * scale
          ctx.drawImage(photoImg, boxX + (boxW - dw) / 2, boxY + (boxH - dh) / 2, dw, dh)
          ctx.restore()
          finishDraw()
        }
        photoImg.src = photoPreview
      } else {
        finishDraw()
      }
    }
  }, [volunteerId, joinDate, formData.name, formData.bloodGroup, photoPreview])

  const handleDownloadCard = useCallback(() => {
    const canvas = document.createElement('canvas')
    drawOnCanvas(canvas, true)
  }, [drawOnCanvas])

  useEffect(() => {
    if (formStep !== 2 || !memberCardRef.current) return
    drawOnCanvas(memberCardRef.current, false)
  }, [formStep, drawOnCanvas])

  return (
    <div className="app">
      <Helmet>
        <title>Members | Blue Shadows Foundation</title>
        <meta name="description" content="Become a member of Blue Shadows Foundation and help bring care, education, and hope to underserved communities in rural Andhra Pradesh." />
        <meta property="og:title" content="Become a BSF Member | Blue Shadows Foundation" />
        <meta property="og:url" content="https://blueshadowsfoundation.org/#/member" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />

      {/* Download E-Card Info Section */}
      <section className="vol-ecard-info-section">
        <div className="container">
          <span className="vol-ecard-info-badge">Official Member Card</span>
          <h2 className="vol-ecard-info-title">Download Your E-Card</h2>
          <p className="vol-ecard-info-sub">
            Every member receives an official BSF Member Card — personalized with your photo and details.
            Register and download it instantly.
          </p>
          <div className="vol-how-it-works">
            <h3 className="vol-how-title">How it Works</h3>
            <div className="vol-steps">
              <div className="vol-step">
                <span className="vol-step-icon">📋</span>
                <h4>1. Fill the Form</h4>
                <p>Complete the member registration with your name, phone, address, and blood group</p>
              </div>
              <div className="vol-step">
                <span className="vol-step-icon">📸</span>
                <h4>2. Upload Your Photo</h4>
                <p>Upload a clear face photo — it appears on your official BSF Member Card</p>
              </div>
              <div className="vol-step">
                <span className="vol-step-icon">⬇️</span>
                <h4>3. Download E-Card</h4>
                <p>Your personalized BSF Member Card is ready to save and share instantly</p>
              </div>
            </div>
          </div>
          <button className="vol-ecard-register-btn" onClick={() => setShowForm(true)}>
            Register &amp; Get Your Member Card
          </button>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="volunteer-why">
        <div className="container">
          <h2 className="section-title">Why Become a Member?</h2>
          <p className="volunteer-intro">Becoming a member is more than giving your time — it's about making a lasting impact on the lives of people who need it most.</p>
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

          <div className="volunteer-cta-section">
            <div className="volunteer-cta-card">
              <div className="cta-card-content">
                <h3>Ready to Make a Difference?</h3>
                <p>Join our growing community of changemakers. Register today and start your journey with Blue Shadows Foundation.</p>
                <button className="volunteer-cta-btn secondary" onClick={() => setShowForm(true)}>
                  <span className="btn-icon">✋</span>
                  Register as a Member
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
          <p className="volunteer-contact-intro">Ready to make a difference? Reach out to us through any of the channels below and we'll get you started on your journey as a member.</p>

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
                  <span className="vol-form-badge">Member Registration</span>
                  <h2>Join Blue Shadows</h2>
                  <p>Fill in your details below and become part of our mission to uplift communities.</p>
                </div>

                <form onSubmit={handleSubmit} className="vol-form">
                  {/* Full Name */}
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

                  {/* Phone */}
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

                  {/* Address */}
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

                  {/* Blood Group */}
                  <div className="vol-form-group">
                    <label className="vol-form-label" htmlFor="vol-blood">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C6 2 4 8 4 12a8 8 0 0 0 16 0c0-4-2-10-8-10z" />
                      </svg>
                      Blood Group <span className="required">*</span>
                    </label>
                    <select
                      id="vol-blood"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className={`vol-form-input vol-blood-select ${errors.bloodGroup ? 'error' : ''}`}
                    >
                      <option value="">Select your blood group</option>
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    {errors.bloodGroup && <span className="vol-error">{errors.bloodGroup}</span>}
                  </div>

                  {/* Photo Upload */}
                  <div className="vol-form-group">
                    <label className="vol-form-label">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      Your Photo <span className="required">*</span>
                    </label>
                    <label
                      className={`vol-photo-upload-wrap ${errors.photo ? 'error-border' : ''}`}
                      htmlFor="vol-photo-input"
                    >
                      {photoPreview ? (
                        <div className="vol-photo-preview-wrap">
                          <img src={photoPreview} alt="Preview" className="vol-photo-preview" />
                          <span className="vol-photo-change-text">Tap to change photo</span>
                        </div>
                      ) : (
                        <div className="vol-photo-placeholder">
                          <span className="vol-photo-icon">📸</span>
                          <span className="vol-photo-text">Tap to upload your photo</span>
                          <span className="vol-photo-hint">JPG or PNG — clear face photo</span>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      id="vol-photo-input"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: 'none' }}
                    />
                    {errors.photo && <span className="vol-error">{errors.photo}</span>}
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
                  By submitting, you agree to be contacted by Blue Shadows Foundation regarding membership opportunities.
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
                <h2 className="vol-success-title">Welcome, {formData.name}!</h2>
                <p className="vol-success-msg">Your registration is confirmed. Here is your official BSF Member Card!</p>

                <canvas ref={memberCardRef} className="vol-member-card-canvas" />

                <button className="vol-download-btn" onClick={handleDownloadCard}>
                  ⬇ Download Member Card
                </button>
                <button className="vol-done-btn" onClick={handleCloseForm}>Done ✓</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photo Crop Modal — rendered in document.body via portal to escape modal stacking context */}
      {cropModalOpen && createPortal(
        <div className="crop-overlay" onClick={() => setCropModalOpen(false)}>
          <div className="crop-modal" onClick={e => e.stopPropagation()}>
            <div className="crop-modal-header">
              <h3>Adjust Your Photo</h3>
              <p>Drag to reposition · Pinch or scroll to zoom</p>
            </div>
            <div className="crop-modal-body">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={286 / 361}
                minWidth={40}
                ruleOfThirds
              >
                <img
                  ref={cropImgRef}
                  src={cropSrc}
                  alt="Crop"
                  onLoad={onCropImageLoad}
                  style={{ maxHeight: '58vh', maxWidth: '100%', display: 'block' }}
                />
              </ReactCrop>
            </div>
            <div className="crop-modal-actions">
              <button className="crop-cancel-btn" onClick={() => setCropModalOpen(false)}>Cancel</button>
              <button className="crop-confirm-btn" onClick={handleCropConfirm}>Use This Photo ✓</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default Volunteer
