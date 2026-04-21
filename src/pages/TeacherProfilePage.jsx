import { useParams, Link } from 'react-router-dom'
import {
  Star, BookOpen, Award, Briefcase, Globe, Clock, Banknote, GraduationCap,
  Target, Users, Calendar, Sparkles, Activity, MapPin, ArrowLeft,
} from 'lucide-react'
import { getTeacherById } from '../data/teacherProfiles'
import { LANGUAGE_META } from '../data/languageFlags'
import { withHomeHash } from '../utils/homeLink'

function StatPill({ icon: Icon, label, value, sub, wide }) {
  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm hover:shadow transition-shadow ${wide ? 'sm:col-span-2' : ''}`}>
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-oxford-50 to-blue-50 text-oxford-700">
          <Icon size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-0.5">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

export default function TeacherProfilePage() {
  const { id } = useParams()
  const t = getTeacherById(id)

  if (!t) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-slate-900">Teacher not found</h1>
        <Link to="/" className="mt-4 text-oxford-600 font-semibold hover:underline">Back to home</Link>
      </main>
    )
  }

  const c = t.curriculum
  const teachingLanguages = [...new Set(t.teaches.map((s) => s.language))]
    .map((code) => LANGUAGE_META[code]?.label)
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-slate-100 pb-24 md:pb-12 pt-0">
      {/* Hero band (padding-top clears fixed app navbar) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-oxford-900 to-blue-900 text-white pt-20 md:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-28 sm:pb-32">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 text-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-medium text-blue-200 hover:text-white"
            >
              <ArrowLeft size={16} />
              Home
            </Link>
            <span className="text-slate-500">·</span>
            <a
              href={withHomeHash('our-schools')}
              className="font-medium text-amber-200/90 hover:text-white"
            >
              School finder
            </a>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-400/40 to-blue-500/30 blur-sm" />
                <div className="relative w-56 sm:w-64 h-64 sm:h-72 rounded-3xl overflow-hidden ring-2 ring-white/20 shadow-2xl bg-slate-800">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-full w-full object-cover object-top"
                    width={400}
                    height={500}
                  />
                </div>
                <div className="absolute -bottom-3 -right-2 rounded-2xl bg-slate-950/90 px-3 py-1.5 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  {t.rating} · Top rated
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 text-center lg:text-left pb-2">
              <p className="text-amber-200/80 text-sm font-semibold uppercase tracking-widest mb-2">{t.role}</p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                {t.name}
              </h1>
              <p className="mt-3 text-lg text-blue-100/90 max-w-xl mx-auto lg:mx-0">
                {t.specialty}
              </p>
              {teachingLanguages.length > 0 && (
                <ul className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
                  {teachingLanguages.map((lang) => (
                    <li
                      key={lang}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold text-white/95 backdrop-blur-sm"
                    >
                      {lang}
                    </li>
                  ))}
                  <li className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-100">
                    {t.levelsTaught} · CEFR
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlap content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-[0_25px_80px_-20px_rgba(15,23,42,0.2)]">
          <p className="text-sm text-slate-500 flex items-center gap-2 mb-4">
            <MapPin className="text-oxford-500 shrink-0" size={16} />
            <span>Teaching focus & availability — Oxford Group</span>
          </p>
          <div className="rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 to-slate-50/50 p-4 sm:p-5 mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900/80 flex items-center gap-2">
              <Sparkles className="text-emerald-600" size={18} />
              In their words
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{t.introWork}</p>
          </div>

          <h2 className="sr-only">Key numbers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <StatPill icon={Users} label="Current students" value={t.currentStudents.toLocaleString()} />
            <StatPill
              icon={Users}
              label="Students taught (all-time)"
              value={`${t.totalStudentsTaught.toLocaleString()}+`}
            />
            <StatPill
              icon={Activity}
              label="Hours taught (approx.)"
              value={`${t.totalHoursTaught.toLocaleString()}+`}
            />
            <StatPill wide icon={BookOpen} label="This term’s focus" value={t.currentLesson} sub="Current cohort" />
            <StatPill icon={Target} label="CEFR range" value={t.levelsTaught} />
            <StatPill icon={Star} label="Learner rating" value={`${t.rating} / 5`} />
            <StatPill icon={Clock} label="Session length" value={t.sessionDuration} />
            <StatPill
              icon={Banknote}
              label="Rate (from)"
              value={`${t.pricePerHourMad} MAD / hr`}
              sub="Varies by format and center"
            />
          </div>
        </div>

        {t.weeklySchedule?.length > 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="text-oxford-600" size={22} />
              Typical week
            </h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {t.weeklySchedule.map((row, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-2 py-3 first:pt-0">
                  <span className="font-medium text-slate-800">{row.day}</span>
                  <span className="font-semibold text-oxford-600 tabular-nums">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-oxford-600" size={24} />
            About &amp; approach
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">{c.longBio}</p>
          {c.methodology && (
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <p className="text-sm font-bold text-slate-800 mb-1">Methodology</p>
              <p className="text-slate-600 text-sm leading-relaxed">{c.methodology}</p>
            </div>
          )}
        </div>

        {c.languagesSpoken?.length > 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-oxford-600" size={22} />
              Languages
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.languagesSpoken.map((lang) => (
                <li key={lang} className="px-3 py-1.5 rounded-xl bg-oxford-50 text-oxford-800 text-sm font-medium border border-oxford-100">
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        )}

        {c.education?.length > 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="text-oxford-600" size={22} />
              Education
            </h2>
            <ul className="mt-4 space-y-3">
              {c.education.map((e, i) => (
                <li key={i} className="border-l-4 border-oxford-200 pl-4">
                  <p className="font-bold text-slate-900">{e.degree}</p>
                  <p className="text-slate-600 text-sm">{e.school} · {e.year}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {c.certifications?.length > 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="text-oxford-600" size={22} />
              Certifications
            </h2>
            <ul className="mt-3 list-disc list-inside text-slate-600 space-y-1">
              {c.certifications.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}

        {c.experience?.length > 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="text-oxford-600" size={22} />
              Experience
            </h2>
            <ul className="mt-4 space-y-4">
              {c.experience.map((e, i) => (
                <li key={i} className="flex justify-between gap-4 flex-wrap border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-900">{e.title}</p>
                    <p className="text-slate-500 text-sm">{e.org}</p>
                  </div>
                  <p className="text-sm text-oxford-600 font-medium shrink-0">{e.years}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={withHomeHash('contact')}
            className="btn-primary justify-center text-center flex-1 py-3.5 text-base"
          >
            Book a session
          </a>
          <Link
            to="/"
            className="btn-secondary justify-center text-center flex-1 py-3.5 text-base"
          >
            More teachers
          </Link>
        </div>
      </div>
    </main>
  )
}
