import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Monitor, MapPinned, CheckCircle2, Star, Users, BookMarked, Banknote, Clock } from 'lucide-react'
import { BRANCHES, getTeachersForSelection, teacherAtCenterForLevel } from '../data/branchesAndTeachers'
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
    <div className="pointer-events-none absolute inset-0 opacity-[0.04] text-oxford-300" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-star" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L24 12 L20 8 L16 12 Z M0 20 L12 16 L8 20 L12 24 Z" fill="currentColor" />
            <path d="M20 20 L20 40 M40 20 L0 20" stroke="currentColor" strokeWidth="0.5" />
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
      className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 border-y border-slate-200/80"
      aria-labelledby="our-schools-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(30,64,175,0.08),transparent)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="section-label">Choose your path</span>
          <h2 id="our-schools-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="gradient-text">schools</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Pick <strong className="text-oxford-800">in-center</strong> or <strong className="text-oxford-800">online</strong>. Each next step appears only when you are ready.
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
                    ${active ? 'ring-2 ring-oxford-500 shadow-xl' : 'ring-1 ring-slate-200 hover:ring-amber-400/60 shadow-sm'}`}
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
                  <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-white p-1.5 ring-2 ring-oxford-200/80 shadow-md">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-oxford-700 to-blue-600 flex items-center justify-center p-2">
                      <img src={mainLogo} alt="" className="h-12 w-12 object-contain" width={48} height={48} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-800">Oxford Group</p>
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
            className="mt-10 space-y-8 rounded-3xl border border-slate-200/90 bg-white/95 p-5 md:p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)]"
            id="our-schools-flow"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <p className="text-sm font-medium text-oxford-800">
                {format === 'in-center' ? 'In-center' : 'Online'} path
              </p>
              <button
                type="button"
                onClick={() => { setFormat(null); setBranchId(null); setLanguage(''); setLevel('') }}
                className="text-xs font-semibold text-slate-500 hover:text-oxford-700"
              >
                Start over
              </button>
            </div>

            {/* 1) Centers with logo */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-oxford-600 mb-3 flex items-center gap-2">
                <MapPinned size={14} className="text-gold-500" />
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
                        ? 'border-oxford-500 bg-oxford-50 ring-1 ring-oxford-200/60'
                        : 'border-slate-200 bg-slate-50/80 hover:border-oxford-300 hover:bg-white'
                      }`}
                  >
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white text-sm font-black shadow-md`}
                    >
                      {b.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <span className="mt-2 text-xs font-bold text-slate-800 leading-tight">{b.name}</span>
                    {format === 'online' && <span className="mt-0.5 text-[10px] text-emerald-600 font-semibold">Online</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 2) Language — card grid */}
            {activeBranch && (
              <div className="animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-widest text-oxford-600 mb-3">2 — Language</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl" role="group" aria-label="Choose a language">
                  {activeBranch.languages.map((l) => {
                    const meta = LANGUAGE_META[l.code]
                    const selected = language === l.code
                    return (
                      <button
                        type="button"
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setLevel('') }}
                        className={`text-left rounded-2xl border-2 p-4 transition-all
                          ${selected
                            ? 'border-oxford-500 bg-oxford-50/90 shadow-sm ring-1 ring-oxford-200/60'
                            : 'border-slate-200 bg-white hover:border-oxford-300 hover:bg-slate-50/80'
                          }`}
                      >
                        <span className="text-2xl sm:text-3xl leading-none block" aria-hidden>{meta?.flag}</span>
                        <span className="mt-2 block text-sm sm:text-base font-bold text-slate-900">{l.label}</span>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {l.levels.length} levels offered
                        </span>
                        {selected && (
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-oxford-700">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            Selected
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 3) Level — only after language; scroll-style list in a max-height box */}
            {activeBranch && language && langConfig && (
              <div className="animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-widest text-oxford-600 mb-3">3 — Level (CEFR)</h3>
                <p className="text-xs text-slate-600 mb-2 max-w-2xl">Select the level that best matches you — {langConfig.label}.</p>
                <div className="flex flex-wrap gap-2 max-w-3xl" role="group" aria-label="Choose CEFR level">
                  {langConfig.levels.map((lv) => {
                    const selected = level === lv
                    return (
                      <button
                        type="button"
                        key={lv}
                        onClick={() => setLevel(lv)}
                        className={`min-w-[3.5rem] rounded-xl px-4 py-2.5 text-sm font-bold border-2 transition-all
                          ${selected
                            ? 'bg-oxford-600 text-white border-oxford-700 shadow'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-oxford-400'
                          }`}
                      >
                        {lv}
                        {selected && <span className="sr-only"> (selected)</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 4) Teachers — Islamic-inspired panel, only when complete */}
            {activeBranch && language && level && (
              <div
                id="teachers"
                className="relative scroll-mt-28 rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/90 overflow-hidden shadow-sm"
              >
                <GeometricBackdrop />
                <div className="relative p-5 md:p-8">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="h-1 w-8 bg-gradient-to-r from-oxford-600 to-gold-500 rounded-full" />
                    Instructors
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 mb-6 max-w-2xl">
                    <span className="font-medium text-slate-800">{activeBranch.name}</span>
                    {' · '}
                    {langConfig?.label} · <span className="font-semibold text-oxford-800">{level}</span>
                    {' — '}
                    Qualified staff for your level (your center first, then the wider network). Compare details, then open a full profile.
                  </p>

                  {teachers.length === 0 ? (
                    <p className="text-slate-600 text-sm">
                      No profile for this combination yet. Try another level, or
                      <a className="text-oxford-700 font-semibold underline ml-1" href={withHomeHash('contact')}>contact an advisor</a>.
                    </p>
                  ) : (
                    <ul className="space-y-4 list-none p-0 m-0">
                      {teachers.map((raw) => {
                        const t = getTeacherById(raw.id)
                        if (!t) return null
                        const atThisCenter = teacherAtCenterForLevel(t, branchId, language, level)
                        return (
                          <li
                            key={t.id}
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-oxford-200/80 transition-all"
                          >
                            <div className="shrink-0 flex sm:block justify-center">
                              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-2xl overflow-hidden ring-1 ring-slate-200/80 bg-slate-100">
                                <img src={t.photo} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                                {atThisCenter ? (
                                  <span className="absolute top-1.5 left-1.5 rounded-lg bg-oxford-600 text-white text-[10px] font-bold px-2 py-0.5 shadow">
                                    At {activeBranch.name}
                                  </span>
                                ) : (
                                  <span className="absolute top-1.5 left-1.5 rounded-lg bg-slate-800/95 text-amber-100 text-[10px] font-bold px-2 py-0.5">
                                    Network
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex flex-wrap items-baseline gap-2 gap-y-0">
                                <h4 className="text-lg sm:text-xl font-bold text-slate-900">{t.name}</h4>
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 text-xs font-bold border border-amber-200/80">
                                  <Star size={12} className="fill-amber-500 text-amber-500" />
                                  {t.rating}
                                </span>
                              </div>
                              <p className="text-oxford-700 text-sm font-semibold">{t.role}</p>
                              <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                                {t.introWork || t.specialty}
                              </p>
                              <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                <div className="rounded-lg bg-slate-50/90 border border-slate-200/80 p-2">
                                  <dt className="text-slate-500 font-medium">Languages</dt>
                                  <dd className="text-slate-900 font-semibold leading-tight mt-0.5">{languageLabelsForTeacher(t)}</dd>
                                </div>
                                <div className="rounded-lg bg-slate-50/90 border border-slate-200/80 p-2">
                                  <dt className="text-slate-500 font-medium">Levels (CEFR)</dt>
                                  <dd className="text-slate-900 font-semibold leading-tight mt-0.5">{t.levelsTaught}</dd>
                                </div>
                                <div className="rounded-lg bg-slate-50/90 border border-slate-200/80 p-2">
                                  <dt className="text-slate-500 font-medium">Learners (total)</dt>
                                  <dd className="text-slate-900 font-semibold flex items-center gap-1 mt-0.5">
                                    <Users size={12} className="text-oxford-500 shrink-0" />
                                    {t.totalStudentsTaught?.toLocaleString?.() ?? t.totalStudentsTaught}
                                  </dd>
                                </div>
                                <div className="rounded-lg bg-slate-50/90 border border-slate-200/80 p-2">
                                  <dt className="text-slate-500 font-medium">Hours taught</dt>
                                  <dd className="text-slate-900 font-semibold flex items-center gap-1 mt-0.5">
                                    <Clock size={12} className="text-oxford-500 shrink-0" />
                                    {t.totalHoursTaught?.toLocaleString?.() ?? t.totalHoursTaught} h
                                  </dd>
                                </div>
                                <div className="rounded-lg bg-slate-50/90 border border-slate-200/80 p-2">
                                  <dt className="text-slate-500 font-medium">Current students</dt>
                                  <dd className="text-slate-900 font-semibold tabular-nums mt-0.5">{t.currentStudents}</dd>
                                </div>
                                <div className="rounded-lg bg-slate-50/90 border border-slate-200/80 p-2">
                                  <dt className="text-slate-500 font-medium">From</dt>
                                  <dd className="text-slate-900 font-semibold flex items-center gap-1 mt-0.5">
                                    <Banknote size={12} className="text-amber-600 shrink-0" />
                                    {t.pricePerHourMad} MAD/hr
                                  </dd>
                                </div>
                              </dl>
                              <p className="mt-2.5 text-xs text-slate-500 flex items-start gap-1.5">
                                <BookMarked size={14} className="shrink-0 text-oxford-500 mt-0.5" />
                                <span><span className="text-slate-400">Current focus:</span> {t.currentLesson}</span>
                              </p>
                              <Link
                                to={`/teacher/${t.id}`}
                                className="mt-4 inline-flex items-center justify-center w-full sm:w-auto rounded-2xl bg-gradient-to-r from-oxford-700 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:from-oxford-600 hover:to-blue-500 transition-all"
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn 0.35s ease both; }
      `}</style>
    </section>
  )
}
