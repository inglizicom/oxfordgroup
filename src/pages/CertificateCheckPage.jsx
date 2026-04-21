import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, ShieldCheck, X, Award } from 'lucide-react'
import { findCertificateByCode } from '../data/certificates'

export default function CertificateCheckPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null) // verified record or null

  const handleCheck = (e) => {
    e.preventDefault()
    setError('')
    const trimmed = code.trim()
    if (!trimmed) {
      setError('Please enter your certificate code.')
      return
    }
    const found = findCertificateByCode(trimmed)
    if (found) {
      setModal(found)
    } else {
      setError('We could not find a certificate with this code. Check the characters and try again, or contact your center.')
    }
  }

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modal, closeModal])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pt-24 md:pt-28 pb-16">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-oxford-700 hover:text-oxford-900 mb-8"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-oxford-600 to-blue-600 text-white shadow-lg shadow-blue-500/25 mb-4">
            <Award size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Certificate check
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Welcome to the certificate check page. Please enter the code printed on your certificate
            and press <strong className="text-slate-800">Check</strong> to confirm that your document
            is genuine and was issued by Oxford Group.
          </p>
        </div>

        <form
          onSubmit={handleCheck}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
        >
          <label htmlFor="cert-code" className="block text-sm font-semibold text-slate-800 mb-2">
            Certificate code
          </label>
          <input
            id="cert-code"
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError('') }}
            placeholder="e.g. OXF-2024-IELTS-001"
            autoComplete="off"
            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:border-oxford-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oxford-500/20"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full btn-primary justify-center py-3.5 text-base gap-2"
          >
            <Search size={18} />
            Check certificate
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Demo: try codes <span className="font-mono text-slate-600">OXF-2024-IELTS-001</span> or{' '}
          <span className="font-mono text-slate-600">OG-FR-DALF-2044</span>
        </p>
      </div>

      {/* Success modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close"
          />
          <div className="relative w-full max-w-md rounded-3xl border border-emerald-200/80 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <ShieldCheck size={36} strokeWidth={2} />
              </span>
            </div>

            <h2 id="cert-modal-title" className="text-xl sm:text-2xl font-bold text-center text-slate-900">
              Congratulations
            </h2>
            <p className="mt-2 text-center text-emerald-700 font-semibold text-sm sm:text-base">
              This certificate is <span className="underline decoration-emerald-500/50">original</span> and
              was issued by Oxford Group.
            </p>

            <ul className="mt-6 space-y-3 text-sm border-t border-slate-100 pt-6">
              <li className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-slate-500 font-medium">School / center</span>
                <span className="text-slate-900 font-semibold text-right sm:text-left">{modal.schoolName}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-slate-500 font-medium">Teacher</span>
                <span className="text-slate-900 font-semibold text-right sm:text-left">{modal.teacherName}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-slate-500 font-medium">Program</span>
                <span className="text-slate-900 font-semibold text-right sm:text-left">{modal.program}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-slate-500 font-medium">Level</span>
                <span className="text-slate-900 font-semibold text-right sm:text-left">{modal.level}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-slate-500 font-medium">Issue date</span>
                <span className="text-slate-900 font-semibold text-right sm:text-left">{modal.issueDate}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
                <span className="text-slate-500 font-medium">Certificate code</span>
                <span className="font-mono text-oxford-800 font-bold text-right sm:text-left">{modal.code}</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={closeModal}
              className="mt-6 w-full rounded-2xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
