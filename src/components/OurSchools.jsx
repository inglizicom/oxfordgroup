import { useState, useMemo } from 'react'
import { Building2, Monitor, ChevronRight, Sparkles, BookOpen, Layers, MapPinned } from 'lucide-react'
import { BRANCHES } from '../data/branchesAndTeachers'
import { LANGUAGE_META, UNIQUE_LANGUAGE_CODES, LEVELS_DISPLAY } from '../data/languageFlags'
import { withHomeHash } from '../utils/homeLink'

const mainLogo = `${import.meta.env.BASE_URL}favicon.svg`

const MODES = [
  {
    id: 'in-center',
    title: 'In-center',
    short: 'On campus',
    icon: Building2,
    desc: 'Face-to-face classes, labs, and community — same network, real classrooms.',
    gradient: 'from-oxford-800 via-oxford-700 to-blue-600',
    accent: 'text-blue-200',
  },
  {
    id: 'online',
    title: 'Online learning',
    short: 'Live & blended',
    icon: Monitor,
    desc: 'HD live classes, groups or 1:1, recordings and chat support from anywhere.',
    gradient: 'from-violet-800 via-fuchsia-700 to-rose-600',
    accent: 'text-violet-200',
  },
]

function buildLanguageList() {
  const codes = new Set()
  BRANCHES.forEach(b => b.languages.forEach(l => codes.add(l.code)))
  return [...codes].map(code => ({ code, ...LANGUAGE_META[code] })).filter(x => x.label)
}

export default function OurSchools() {
  const [open, setOpen] = useState('in-center')
  const languages = useMemo(() => buildLanguageList(), [])

  return (
    <section
      id="our-schools"
      className="relative overflow-hidden py-20 md:py-28 bg-slate-950"
      aria-labelledby="our-schools-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMGgxdjFoLTF6IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-40" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Sparkles size={14} className="text-amber-300" />
            Our schools
          </span>
          <h2 id="our-schools-heading" className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">where you grow best</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
            Pick how you want to study. Tap a format to see our brands, the languages we teach, and the levels you can follow.
          </p>
        </div>

        {/* Row: in-center (left) | logo (center) | online (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-stretch max-w-5xl mx-auto">
          {(() => {
            const modeIn = MODES.find(m => m.id === 'in-center')
            const modeOn = MODES.find(m => m.id === 'online')
            const renderMode = (mode) => {
              if (!mode) return null
              const Icon = mode.icon
              const active = open === mode.id
              return (
                <button
                  type="button"
                  key={mode.id}
                  onClick={() => setOpen(mode.id)}
                  className={`text-left w-full h-full min-h-[220px] rounded-3xl p-1 transition-all duration-300 ${
                    active ? 'ring-2 ring-amber-400/70 shadow-lg shadow-amber-900/20' : 'hover:ring-1 hover:ring-white/20'
                  }`}
                >
                  <div
                    className={`rounded-[1.2rem] bg-gradient-to-br ${mode.gradient} p-5 md:p-6 h-full flex flex-col border border-white/10 shadow-xl`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur text-white">
                        <Icon size={22} />
                      </span>
                      {active && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Active</span>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg md:text-xl font-bold text-white leading-tight">{mode.title}</h3>
                    <p className="text-xs text-white/70 uppercase tracking-wider mt-0.5">{mode.short}</p>
                    <p className={`mt-3 text-sm leading-relaxed flex-1 ${mode.accent}`}>{mode.desc}</p>
                    <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-white/90">
                      {active ? 'Details open below' : 'View details below'}
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </button>
              )
            }
            return (
              <>
                {renderMode(modeIn)}
                <div className="order-first md:order-none flex flex-col items-center justify-center text-center py-2 md:py-0 min-h-[180px] md:min-h-0">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400/30 via-cyan-400/20 to-violet-400/30 blur-md opacity-80" />
                    <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full bg-slate-900/90 p-2 ring-1 ring-white/20 shadow-2xl">
                      <div className="h-full w-full rounded-full bg-gradient-to-br from-oxford-600 via-blue-600 to-oxford-900 flex items-center justify-center p-3">
                        <img src={mainLogo} alt="Oxford Group" className="h-16 w-16 md:h-20 md:w-20 object-contain" width={80} height={80} />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-xs font-bold tracking-[0.25em] uppercase text-slate-500">Network</h3>
                  <p className="text-white font-semibold text-xl md:text-2xl tracking-tight">Oxford Group</p>
                  <a
                    href={withHomeHash('branches')}
                    className="mt-3 text-sm font-medium text-amber-200 hover:text-amber-100 inline-flex items-center gap-1"
                  >
                    All branches <ChevronRight size={16} />
                  </a>
                </div>
                {renderMode(modeOn)}
              </>
            )
          })()}
        </div>

        {/* Expanded detail panel */}
        <div
          className="mt-10 md:mt-12 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-6 md:p-10"
          role="region"
          aria-label={open === 'in-center' ? 'In-center details' : 'Online learning details'}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold text-white">
                {open === 'in-center' ? 'In-center' : 'Online learning'}
                <span className="text-slate-500 font-normal text-base ml-2">— {open === 'in-center' ? 'on campus' : 'live from anywhere'}</span>
              </h3>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                {open === 'in-center'
                  ? 'Visit one of our five learning brands. Each has its own look and feel; all follow Oxford Group standards.'
                  : 'Join the same teachers and materials online: cohorts, private slots, and flexible replays—ideal if you travel or prefer home.'}
              </p>
            </div>
            <a
              href={withHomeHash('contact')}
              className="shrink-0 inline-flex items-center justify-center rounded-2xl bg-white text-oxford-900 font-bold text-sm px-5 py-3 hover:bg-amber-100 transition-colors"
            >
              Request a class
            </a>
          </div>

          {/* 5 brand logos + names */}
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-200/80 mb-4 flex items-center gap-2">
              <MapPinned size={14} />
              Our brands &amp; names
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {BRANCHES.map((b) => (
                <a
                  key={b.id}
                  href={withHomeHash('branches')}
                  className="group flex flex-col items-center text-center p-4 rounded-2xl bg-slate-800/60 border border-white/5 hover:border-amber-400/40 hover:bg-slate-800 transition-all"
                >
                  <div
                    className={`h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white text-lg md:text-2xl font-black shadow-lg ring-2 ring-white/10 group-hover:scale-105 transition-transform`}
                  >
                    {b.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <p className="mt-3 text-sm font-bold text-white leading-tight">{b.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{b.tagline}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-200/80 mb-3 flex items-center gap-2">
                <BookOpen size={14} />
                Languages
              </h4>
              <ul className="space-y-2.5">
                {languages.length > 0 ? (
                  languages.map((lang) => (
                    <li
                      key={lang.code}
                      className="flex items-center gap-3 rounded-xl bg-slate-800/50 border border-white/5 px-4 py-2.5 text-slate-200"
                    >
                      <span className="text-2xl" aria-hidden="true">
                        {lang.flag}
                      </span>
                      <span className="font-medium">{lang.label}</span>
                      <span className="text-slate-500 text-xs font-mono ml-auto uppercase">{lang.code}</span>
                    </li>
                  ))
                ) : (
                  UNIQUE_LANGUAGE_CODES.map((code) => (
                    <li
                      key={code}
                      className="flex items-center gap-3 rounded-xl bg-slate-800/50 border border-white/5 px-4 py-2.5 text-slate-200"
                    >
                      <span className="text-2xl">{LANGUAGE_META[code]?.flag}</span>
                      <span className="font-medium">{LANGUAGE_META[code]?.label}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-200/80 mb-3 flex items-center gap-2">
                <Layers size={14} />
                Levels
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{LEVELS_DISPLAY}</p>
              <div className="flex flex-wrap gap-2">
                {['A1', 'A2', 'B1', 'B2', 'B2+', 'C1', 'C2'].map((lv) => (
                  <span
                    key={lv}
                    className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-white/10 text-slate-200 text-sm font-bold"
                  >
                    {lv}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-4">
                Not sure? Use our <a className="text-amber-200 underline underline-offset-2" href={withHomeHash('placement')}>placement test</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
