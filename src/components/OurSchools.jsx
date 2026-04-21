import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Monitor, MapPinned, CheckCircle2, Star, Users, Clock, BookMarked, Banknote } from 'lucide-react'
import { BRANCHES, getTeachersForSelection } from '../data/branchesAndTeachers'
import { LANGUAGE_META } from '../data/languageFlags'
import { getTeacherById } from '../data/teacherProfiles'
import { withHomeHash } from '../utils/homeLink'

const mainLogo = `${import.meta.env.BASE_URL}favicon.svg`

const MODES = [
  {
    id: 'in-center',
    title: 'In-center',
    short: 'On campus',
    icon: Building2,
    desc: 'Face-to-face classes, labs, and our learning community across Morocco.',
    gradient: 'from-oxford-800 via-oxford-700 to-blue-600',
    accent: 'text-blue-200',
  },
  {
    id: 'online',
    title: 'Online learning',
    short: 'Live & blended',
    icon: Monitor,
    desc: 'Live and hybrid classes you can follow from home with the same teachers.',
    gradient: 'from-violet-800 via-fuchsia-700 to-rose-600',
    accent: 'text-violet-200',
  },
]

function languageLabelsForTeacher(teacher) {
  const codes = [...new Set(teacher.teaches.map(s => s.language))]
  return codes.map(c => LANGUAGE_META[c]?.label).filter(Boolean).join(' · ')
}

/** Islamic / Moroccan–inspired subtle backdrop */
function GeometricBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-star" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L24 12 L20 8 L16 12 Z M0 20 L12 16 L8 20 L12 24 Z" fill="currentColor" className="text-amber-200" />
            <path d="M20 20 L20 40 M40 20 L0 20" stroke="currentColor" className="text-emerald-200" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star)" />
      </svg>
    </div>
  )
}

export default function OurSchools() {
  const [format, setFormat] = useState(null) // null = nothing below; 'in-center' | 'online'
  const [branchId, setBranchId] = useState(null)
  const [language, setLanguage] = useState('')
  const [level, setLevel] = useState('')

  const flowRef = useRef(null)

  const activeBranch = useMemo(() => BRANCHES.find(b => b.id === branchId) || null, [branchId])
  const langConfig = useMemo(
    () => (activeBranch ? activeBranch.languages.find(l => l.code === language) : null),
    [activeBranch, language]
  )

  const teachers = useMemo(() => {
    if (!branchId || !language || !level) return []
    return getTeachersForSelection(branchId, language, level)
  }, [branchId, language, level])

  useEffect(() => {
    if (teachers.length > 0 && flowRef.current) {
      flowRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [teachers.length])

  const selectFormat = (id) => {
    setFormat(id)
    setBranchId(null)
    setLanguage('')
    setLevel('')
  }

  const selectBranch = (id) => {
    setBranchId(id)
    setLanguage('')
    setLevel('')
  }

  return (
    <section
      id="our-schools"
      className="relative overflow-hidden py-20 md:py-24 bg-slate-950"
      aria-labelledby="our-schools-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(16,185,129,0.12),transparent)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 id="our-schools-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-emerald-300">schools</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Choose <strong className="text-slate-200">in-center</strong> or <strong className="text-slate-200">online</strong>. The next steps open only as you go — nothing is shown until you choose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {(() => {
            const modeIn = MODES[0]
            const modeOn = MODES[1]
            const renderMode = (mode) => {
              const Icon = mode.icon
              const active = format === mode.id
              return (
                <button
                  type="button"
                  onClick={() => selectFormat(mode.id)}
                  className={`text-left w-full min-h-[200px] rounded-2xl p-1 transition-all
                    ${active ? 'ring-2 ring-emerald-400/60 shadow-lg' : 'ring-1 ring-white/10 hover:ring-amber-400/30'}`}
                >
                  <div className={`rounded-[0.9rem] bg-gradient-to-br ${mode.gradient} p-5 h-full flex flex-col border border-white/10`}>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-white">{mode.title}</h3>
                    <p className="text-xs text-white/60 uppercase tracking-wider">{mode.short}</p>
                    <p className={`mt-2 text-sm flex-1 leading-relaxed ${mode.accent}`}>{mode.desc}</p>
                    {active && <p className="mt-3 text-xs font-semibold text-amber-200">Continue in the box below</p>}
                  </div>
                </button>
              )
            }
            return (
              <>
                {renderMode(modeIn)}
                <div className="flex flex-col items-center justify-center text-center py-2">
                  <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-slate-900/90 p-1.5 ring-1 ring-white/15">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-emerald-700 to-oxford-800 flex items-center justify-center p-2">
                      <img src={mainLogo} alt="" className="h-12 w-12 object-contain" width={48} height={48} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-300">Oxford Group</p>
                </div>
                {renderMode(modeOn)}
              </>
            )
          })()}
        </div>

        {/* Progressive flow — only after In-center or Online is chosen */}
        {format && (
          <div
            ref={flowRef}
            className="mt-10 space-y-8 rounded-3xl border border-white/10 bg-slate-900/50 p-5 md:p-8 backdrop-blur-sm"
            id="our-schools-flow"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <p className="text-sm text-amber-100/80">
                {format === 'in-center' ? 'In-center' : 'Online'} path
              </p>
              <button
                type="button"
                onClick={() => { setFormat(null); setBranchId(null); setLanguage(''); setLevel('') }}
                className="text-xs font-semibold text-slate-400 hover:text-white"
              >
                Start over
              </button>
            </div>

            {/* 1) Centers with logo */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300/80 mb-3 flex items-center gap-2">
                <MapPinned size={14} />
                1 — Choose a center
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {BRANCHES.map((b) => (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => selectBranch(b.id)}
                    className={`flex flex-col items-center rounded-2xl p-3 text-center transition-all border-2
                      ${branchId === b.id
                        ? 'border-amber-400/70 bg-amber-500/10'
                        : 'border-white/5 bg-slate-800/40 hover:border-white/20'
                      }`}
                  >
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white text-sm font-black shadow-md`}
                    >
                      {b.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <span className="mt-2 text-xs font-bold text-white leading-tight">{b.name}</span>
                    {format === 'online' && <span className="mt-0.5 text-[10px] text-emerald-300">Online</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 2) Language — native select, nothing else yet */}
            {activeBranch && (
              <div className="animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300/80 mb-2">2 — Language</h3>
                <label htmlFor="school-lang" className="sr-only">Language</label>
                <select
                  id="school-lang"
                  value={language}
                  onChange={(e) => { setLanguage(e.target.value); setLevel('') }}
                  className="w-full max-w-md rounded-2xl border-2 border-white/15 bg-slate-900 px-4 py-3.5 text-white font-medium focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                >
                  <option value="" disabled>Choose a language</option>
                  {activeBranch.languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {LANGUAGE_META[l.code]?.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 3) Level — only after language; scroll-style list in a max-height box */}
            {activeBranch && language && langConfig && (
              <div className="animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300/80 mb-3">3 — Level (CEFR)</h3>
                <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 p-4 max-w-lg">
                  <p className="text-xs text-emerald-200/80 mb-3">Open this list and scroll—tap a level to continue.</p>
                  <div className="max-h-44 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                    {langConfig.levels.map((lv) => (
                      <button
                        type="button"
                        key={lv}
                        onClick={() => setLevel(lv)}
                        className={`w-full text-left flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all
                          ${level === lv
                            ? 'bg-amber-500/20 text-amber-100 border border-amber-400/50'
                            : 'bg-slate-800/60 text-slate-200 border border-white/5 hover:border-emerald-400/30'
                          }`}
                      >
                        <span>Level {lv}</span>
                        {level === lv && <CheckCircle2 className="text-amber-300 shrink-0" size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4) Teachers — Islamic-inspired panel, only when complete */}
            {activeBranch && language && level && (
              <div
                id="teachers"
                className="relative scroll-mt-28 rounded-3xl border-2 border-emerald-500/30 overflow-hidden"
              >
                <GeometricBackdrop />
                <div className="relative p-5 md:p-8 bg-gradient-to-b from-emerald-950/90 via-slate-950/95 to-slate-950">
                  <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
                    <span className="h-1 w-8 bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full" />
                    Instructors
                  </h3>
                  <p className="text-sm text-emerald-100/70 mt-1 mb-6">
                    {activeBranch.name} · {langConfig?.label} · {level} — our teachers are selected for experience and a respectful, professional approach for learners in Morocco and beyond.
                  </p>

                  {teachers.length === 0 ? (
                    <p className="text-slate-300 text-sm">
                      No listed teacher for this exact combination. Try another level, or
                      <a className="text-amber-200 underline ml-1" href={withHomeHash('contact')}>contact an advisor</a>.
                    </p>
                  ) : (
                    <ul className="space-y-5">
                      {teachers.map((raw) => {
                        const t = getTeacherById(raw.id)
                        if (!t) return null
                        return (
                          <li
                            key={t.id}
                            className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-emerald-800/30 bg-slate-900/60"
                          >
                            <div className="shrink-0 flex justify-center sm:block">
                              <div className="h-28 w-28 rounded-2xl overflow-hidden ring-2 ring-amber-500/20">
                                <img src={t.photo} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-xl font-bold text-white">{t.name}</h4>
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-200 text-xs font-bold">
                                  <Star size={12} className="fill-amber-300" /> {t.rating}
                                </span>
                              </div>
                              <p className="text-emerald-200/80 text-sm font-medium">{t.role}</p>
                              <p className="text-slate-300 text-sm mt-2 line-clamp-2">{t.introWork || t.specialty}</p>
                              <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
                                  <dt className="text-slate-500">Languages</dt>
                                  <dd className="text-white font-medium">{languageLabelsForTeacher(t)}</dd>
                                </div>
                                <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
                                  <dt className="text-slate-500">Levels</dt>
                                  <dd className="text-white font-medium">{t.levelsTaught}</dd>
                                </div>
                                <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
                                  <dt className="text-slate-500">Learners (total)</dt>
                                  <dd className="text-white font-medium flex items-center gap-1">
                                    <Users size={12} className="text-emerald-400" />
                                    {t.totalStudentsTaught?.toLocaleString?.() ?? t.totalStudentsTaught}
                                  </dd>
                                </div>
                                <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
                                  <dt className="text-slate-500">Hours taught</dt>
                                  <dd className="text-white font-medium flex items-center gap-1">
                                    <Clock size={12} className="text-emerald-400" />
                                    {t.totalHoursTaught?.toLocaleString?.() ?? t.totalHoursTaught} h
                                  </dd>
                                </div>
                                <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
                                  <dt className="text-slate-500">Current students</dt>
                                  <dd className="text-white font-medium">{t.currentStudents}</dd>
                                </div>
                                <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
                                  <dt className="text-slate-500">From</dt>
                                  <dd className="text-white font-medium flex items-center gap-1">
                                    <Banknote size={12} className="text-amber-400" />
                                    {t.pricePerHourMad} MAD/hr
                                  </dd>
                                </div>
                              </dl>
                              <p className="mt-2 text-xs text-slate-400 flex items-start gap-1.5">
                                <BookMarked size={14} className="shrink-0 text-emerald-500 mt-0.5" />
                                <span>Current: {t.currentLesson}</span>
                              </p>
                              <Link
                                to={`/teacher/${t.id}`}
                                className="mt-4 inline-flex items-center justify-center w-full sm:w-auto rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all"
                              >
                                Choose this teacher
                              </Link>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(16,185,129,0.5) transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.4); border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn 0.35s ease both; }
      `}</style>
    </section>
  )
}
