import { useState, useMemo } from 'react'
import { MapPin, GraduationCap, X, Star } from 'lucide-react'
import { BRANCHES, getTeachersForSelection } from '../data/branchesAndTeachers'

function BranchTile({ branch, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left w-full rounded-2xl border-2 p-5 transition-all duration-300
        ${selected
          ? `ring-2 ring-oxford-500 ring-offset-2 border-oxford-200 bg-oxford-50/80 shadow-lg scale-[1.01]`
          : 'border-gray-200 bg-white hover:border-oxford-200 hover:shadow-md'
        }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-oxford-700 to-blue-500 text-white shadow">
          <GraduationCap size={22} />
        </span>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900">{branch.name}</h3>
          <p className="text-sm text-oxford-600 font-medium">{branch.tagline}</p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{branch.description}</p>
        </div>
      </div>
    </button>
  )
}

function TeacherResultCard({ teacher }) {
  return (
    <article
      className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={teacher.photo}
          alt=""
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <Star size={12} className="fill-amber-300 text-amber-300" />
          {teacher.rating}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="text-lg font-bold text-gray-900">{teacher.name}</h4>
        <p className="text-sm font-semibold text-oxford-600">{teacher.role}</p>
        <p className="mt-2 text-sm text-gray-500 flex-1">{teacher.specialty}</p>
        <a href="#contact" className="mt-4 btn-primary w-full text-sm py-2.5 text-center justify-center">
          Book a session
        </a>
      </div>
    </article>
  )
}

export default function Branches() {
  const [branchId, setBranchId] = useState(null)
  const [language, setLanguage] = useState(null)
  const [level, setLevel] = useState(null)

  const activeBranch = useMemo(
    () => BRANCHES.find(b => b.id === branchId) || null,
    [branchId]
  )

  const langConfig = useMemo(
    () => activeBranch?.languages.find(l => l.code === language) || null,
    [activeBranch, language]
  )

  const teachers = useMemo(() => {
    if (!branchId || !language || !level) return []
    return getTeachersForSelection(branchId, language, level)
  }, [branchId, language, level])

  const handleBranch = (id) => {
    setBranchId(id)
    setLanguage(null)
    setLevel(null)
  }

  const handleLanguage = (code) => {
    setLanguage(code)
    setLevel(null)
  }

  return (
    <section id="branches" className="py-24 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="branches-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="section-label">Our branches</span>
          <h2 id="branches-heading" className="section-title">
            Find your <span className="gradient-text">location</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Pick one of our five learning brands. Then choose a language, a level, and we’ll show who can teach you there.
          </p>
        </div>

        {/* Step 1: five branches */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">1 — Choose a branch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {BRANCHES.map(b => (
              <BranchTile
                key={b.id}
                branch={b}
                selected={branchId === b.id}
                onSelect={() => handleBranch(b.id)}
              />
            ))}
          </div>
        </div>

        {activeBranch && (
          <div className="mb-8 rounded-2xl border border-oxford-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">2 — Languages at {activeBranch.name}</h3>
              <button
                type="button"
                onClick={() => { setBranchId(null); setLanguage(null); setLevel(null) }}
                className="text-sm text-oxford-600 hover:text-oxford-800 font-medium inline-flex items-center gap-1 self-start"
              >
                <X size={16} /> Clear selection
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeBranch.languages.map(ling => {
                const sel = language === ling.code
                return (
                  <button
                    key={ling.code}
                    type="button"
                    onClick={() => handleLanguage(ling.code)}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold border-2 transition-all
                      ${sel
                        ? 'border-oxford-600 bg-oxford-600 text-white shadow-md'
                        : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-oxford-300'
                      }`}
                  >
                    {ling.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeBranch && language && langConfig && (
          <div className="mb-10 rounded-2xl border border-oxford-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              3 — Level for {langConfig.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {langConfig.levels.map(lv => {
                const sel = level === lv
                return (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setLevel(lv)}
                    className={`min-w-[3rem] px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all
                      ${sel
                        ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-blue-200'
                      }`}
                  >
                    {lv}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div id="teachers" className="scroll-mt-28 pt-2">
          {activeBranch && language && level ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Available teachers
                  <span className="ml-2 text-base font-normal text-gray-500">
                    ({activeBranch.name} · {langConfig?.label} · {level})
                  </span>
                </h3>
              </div>

              {teachers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teachers.map(t => (
                    <TeacherResultCard key={t.id} teacher={t} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
                  <p className="text-gray-600 mb-2">
                    No listed teacher for this exact slot yet. Try another level or contact us — we’ll place you in the right class.
                  </p>
                  <a href="#contact" className="btn-primary inline-flex mt-2">Talk to an advisor</a>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-oxford-50/30 p-8 text-center text-sm text-gray-500">
              Choose a <strong>branch</strong>, a <strong>language</strong>, and a <strong>level</strong> above to see teachers with real photos.
            </div>
          )}
        </div>

        {!branchId && (
          <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
            <MapPin size={16} className="text-oxford-500" />
            The map of Morocco with all cities is in the next section.
          </p>
        )}

        <div className="mt-14 text-center">
          <p className="text-gray-500 mb-4">Not sure of your level?</p>
          <a href="#placement" className="btn-primary text-base py-3 px-8">
            Take our free placement test
          </a>
        </div>
      </div>
    </section>
  )
}
