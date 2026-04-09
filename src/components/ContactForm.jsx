import { useState } from 'react'
import { Send, CheckCircle, Loader } from 'lucide-react'

const COURSES = [
  'English – General (A1–C2)',
  'English – IELTS Preparation',
  'English – Business English',
  'French – General (A1–C2)',
  'French – DELF / DALF Prep',
  'Classes Préparatoires',
  'Kids / Teens Program',
  'Online Learning',
  'I\'m not sure – need advice',
]

const LEVELS = ['Complete Beginner (A1)', 'Elementary (A2)', 'Pre-Intermediate (B1)', 'Intermediate (B2)', 'Upper-Intermediate (C1)', 'Advanced (C2)', 'Not sure']

const INITIAL = { name: '', email: '', phone: '', city: '', course: '', level: '', message: '', consent: false }

export default function ContactForm() {
  const [form,      setForm]      = useState(INITIAL)
  const [status,    setStatus]    = useState('idle') // idle | loading | success | error
  const [errors,    setErrors]    = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.phone.trim())   e.phone   = 'Phone number is required'
    if (!form.course)         e.course  = 'Please select a course'
    if (!form.consent)        e.consent = 'Please agree to be contacted'
    return e
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('loading')
    // Simulate API call — replace with your actual endpoint
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-green-100">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-5" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">You're all set! 🎉</h3>
            <p className="text-gray-500 mb-2">
              Thank you, <strong>{form.name}</strong>! An Oxford Group advisor will contact you within <strong>24 hours</strong>.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Keep an eye on your phone — we'll reach out via WhatsApp or phone call.
            </p>
            <button
              onClick={() => { setForm(INITIAL); setStatus('idle') }}
              className="btn-primary justify-center w-full"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left copy ──────────────────────────────────── */}
          <div>
            <span className="section-label">Enroll Today</span>
            <h2 id="contact-heading" className="section-title mb-5">
              Start Your <span className="gradient-text">Journey</span><br />
              in 60 Seconds
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Fill in the form and one of our friendly advisors will contact you with a personalized study plan, schedule options, and pricing.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-10">
              {[
                ['🎓', 'Free placement test included'],
                ['💬', 'Personal advisor assigned to you'],
                ['📅', 'Flexible schedules: morning, afternoon, evening'],
                ['💰', 'Competitive pricing with installment plans'],
                ['🔄', '7-day satisfaction guarantee'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-gray-700 font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp shortcut */}
            <a
              href="https://wa.me/212600000000?text=Hello%20Oxford%20Group%2C%20I%20want%20to%20enroll!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
            >
              <span className="text-2xl">💬</span>
              Prefer WhatsApp? Chat instantly
            </a>
          </div>

          {/* ── Form ───────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Free Enrollment Enquiry</h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Fatima Zahra"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-oxford-400
                                ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-oxford-300 focus:border-oxford-400'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone + Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+212 6 00 00 00 00"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-oxford-400
                                  ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-oxford-300 focus:border-oxford-400'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email (optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm hover:border-oxford-300 focus:border-oxford-400 focus:outline-none focus:ring-2 focus:ring-oxford-400 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Your city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm hover:border-oxford-300 focus:border-oxford-400 focus:outline-none focus:ring-2 focus:ring-oxford-400 transition-colors duration-200"
                  />
                </div>

                {/* Course */}
                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Interested Course <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-oxford-400 bg-gray-50
                                ${errors.course ? 'border-red-300' : 'border-gray-200 hover:border-oxford-300 focus:border-oxford-400'}`}
                  >
                    <option value="">Select a course…</option>
                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                </div>

                {/* Level */}
                <div>
                  <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-1.5">Current Level</label>
                  <select
                    id="level"
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm hover:border-oxford-300 focus:border-oxford-400 focus:outline-none focus:ring-2 focus:ring-oxford-400 transition-colors duration-200"
                  >
                    <option value="">Select your level…</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Any questions? (optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your goals or ask anything…"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm hover:border-oxford-300 focus:border-oxford-400 focus:outline-none focus:ring-2 focus:ring-oxford-400 transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Consent */}
                <div>
                  <label className={`flex items-start gap-3 cursor-pointer ${errors.consent ? 'text-red-500' : 'text-gray-600'}`}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded accent-oxford-600"
                    />
                    <span className="text-xs leading-relaxed">
                      I agree to be contacted by Oxford Group via phone or WhatsApp about courses and offers. No spam — we respect your privacy.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-xs mt-1 ml-7">{errors.consent}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center py-4 text-base font-bold disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send My Enquiry
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  🔒 Your information is 100% secure and will never be shared.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
