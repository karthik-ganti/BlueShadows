import { useState } from 'react'

const CAMPAIGN_API = 'https://script.google.com/macros/s/AKfycbwytsU37YX8_4KzBEbMwKvknOGyZRKzscNh3YStqzBu7sJkvsM-RinH-VK2cdQA6uzrhA/exec'
const TEAM_PIN = 'BSF2026'

export default function TeamForm() {
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [txnId, setTxnId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handlePinSubmit = (e) => {
    e.preventDefault()
    if (pin === TEAM_PIN) {
      setUnlocked(true)
      setPinError(false)
    } else {
      setPinError(true)
      setPin('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !amount || Number(amount) <= 0) return

    setSubmitting(true)
    setError('')

    const params = new URLSearchParams({
      action: 'log',
      name: name.trim(),
      phone: phone.trim(),
      amount: Number(amount),
      timestamp: `${date} — TxnID: ${txnId.trim() || 'N/A'}`
    })

    try {
      const res = await fetch(`${CAMPAIGN_API}?${params.toString()}`)
      const data = await res.json()
      if (data.status === 'ok') {
        setSubmitted(true)
      } else {
        setError('Sheet returned an unexpected response. Try again.')
      }
    } catch {
      setError('Network error. Check your connection and try again.')
    }

    setSubmitting(false)
  }

  const handleAnother = () => {
    setName('')
    setPhone('')
    setAmount('')
    setTxnId('')
    setDate(new Date().toISOString().slice(0, 10))
    setSubmitted(false)
    setError('')
  }

  // ── PIN screen ──────────────────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="tf-page">
        <div className="tf-pin-card">
          <div className="tf-pin-logo">🏠</div>
          <h1 className="tf-pin-title">Team Access</h1>
          <p className="tf-pin-sub">House Campaign — Donation Logger</p>
          <form onSubmit={handlePinSubmit} className="tf-pin-form">
            <input
              type="password"
              className={`tf-pin-input ${pinError ? 'tf-pin-input--error' : ''}`}
              placeholder="Enter PIN"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false) }}
              autoFocus
            />
            {pinError && <p className="tf-pin-error">Incorrect PIN. Try again.</p>}
            <button type="submit" className="tf-pin-btn">Unlock →</button>
          </form>
        </div>
      </div>
    )
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="tf-page">
        <div className="tf-card">
          <div className="tf-success-icon">✓</div>
          <h2 className="tf-success-title">Donation Logged!</h2>
          <p className="tf-success-sub">
            <strong>{name}</strong> — ₹{Number(amount).toLocaleString('en-IN')} has been added to the Google Sheet.
            The campaign progress bar will update within 60 seconds.
          </p>
          <button className="tf-submit-btn" onClick={handleAnother}>Log Another Donation</button>
          <a
            href="https://docs.google.com/spreadsheets"
            target="_blank"
            rel="noopener noreferrer"
            className="tf-sheet-link"
          >
            Open Google Sheet ↗
          </a>
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <div className="tf-page">
      <div className="tf-card">
        <div className="tf-header">
          <span className="tf-badge">Team Only</span>
          <h1 className="tf-title">Log a Donation</h1>
          <p className="tf-sub">House Construction Campaign</p>
        </div>

        <form onSubmit={handleSubmit} className="tf-form">
          <div className="tf-field">
            <label className="tf-label">Donor Name <span className="tf-req">*</span></label>
            <input
              className="tf-input"
              type="text"
              placeholder="e.g. Ravi Kumar"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="tf-field">
            <label className="tf-label">Phone Number</label>
            <input
              className="tf-input"
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              maxLength={10}
            />
          </div>

          <div className="tf-field">
            <label className="tf-label">Amount Donated (₹) <span className="tf-req">*</span></label>
            <input
              className="tf-input"
              type="number"
              placeholder="e.g. 2000"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="tf-field">
            <label className="tf-label">Transaction ID / UPI Ref</label>
            <input
              className="tf-input"
              type="text"
              placeholder="e.g. 408312XXXXXX (optional)"
              value={txnId}
              onChange={e => setTxnId(e.target.value)}
            />
          </div>

          <div className="tf-field">
            <label className="tf-label">Date of Donation <span className="tf-req">*</span></label>
            <input
              className="tf-input"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          {error && <p className="tf-error">{error}</p>}

          <button
            type="submit"
            className="tf-submit-btn"
            disabled={submitting || !name || !amount || Number(amount) <= 0}
          >
            {submitting ? 'Submitting...' : 'Add to Sheet →'}
          </button>
        </form>
      </div>
    </div>
  )
}
