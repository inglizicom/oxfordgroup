import { useParams, Link } from 'react-router-dom'
import {
  Star, BookOpen, Award, Briefcase, Globe, GraduationCap, Target, Calendar, Sparkles, MapPin, ArrowLeft, BarChart3,
} from 'lucide-react'
import { getTeacherById } from '../data/teacherProfiles'
import { LANGUAGE_META } from '../data/languageFlags'
import { withHomeHash } from '../utils/homeLink'
import TeacherProfileCharts from '../components/TeacherProfileCharts'

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
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-oxford-900 to-blue-900 text-white pt-20 md:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(ellipse 80% 50% at 30% 0%, rgba(251,191,36,0.15), transparent)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 text-sm">
            <Link to="/" className="inline-flex items-center gap-1.5 font-medium text-slate-300 hover:text-white">
              <ArrowLeft size={16} />
              Home
            </Link>
            <span className="text-slate-600">·</span>
            <a href={withHomeHash('our-schools')} className="font-medium text-amber-200/90 hover:text-white">
              School finder
            </a>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xs">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-amber-300/50 to-sky-500/40 blur-md" />
                <div className="relative aspect-[4/5] max-h-80 w-full rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-slate-800">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-full w-full object-cover object-top"
                    width={400}
                    height={500}
                  />
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-slate-950/80 px-3 py-2 text-xs font-bold text-amber-200 border border-amber-400/20">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {t.rating} / 5.0
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 text-center lg:text-left">
              <p className="text-amber-200/80 text-xs font-bold uppercase tracking-widest mb-2">{t.role}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                {t.name}
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
                {t.specialty}
              </p>
              {teachingLanguages.length > 0 && (
                <ul className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
                  {teachingLanguages.map((lang) => (
                    <li
                      key={lang}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-semibold"
                    >
                      {lang}
                    </li>
                  ))}
                  <li className="rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-100">
                    {t.levelsTaught}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 space-y-5">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <MapPin className="text-oxford-600" size={16} />
            Teaching focus
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed flex items-start gap-2">
            <Sparkles className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <span>{t.introWork}</span>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm overflow-hidden">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
            <BarChart3 className="text-oxford-600" size={22} />
            Performance &amp; analytics
          </h2>
          <p className="text-sm text-slate-500 mb-5">Charts are derived from the profile metrics below. Tooltips show exact figures.</p>
          <TeacherProfileCharts t={t} />
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-oxford-700 mb-3">Key facts (accurate)</h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="rounded-xl bg-white border border-slate-200/90 px-3 py-2.5">
              <dt className="text-slate-500 text-xs">Current class focus</dt>
              <dd className="font-semibold text-slate-900 leading-snug mt-0.5">{t.currentLesson}</dd>
            </div>
            <div className="rounded-xl bg-white border border-slate-200/90 px-3 py-2.5">
              <dt className="text-slate-500 text-xs">CEFR range</dt>
              <dd className="font-semibold text-slate-900 tabular-nums"><Target className="inline w-3.5 h-3.5 text-oxford-500 mr-1" />{t.levelsTaught}</dd>
            </div>
            <div className="rounded-xl bg-white border border-slate-200/90 px-3 py-2.5">
              <dt className="text-slate-500 text-xs">Current students / Total taught / Hours</dt>
              <dd className="font-semibold text-slate-900 tabular-nums">
                {t.currentStudents} · {t.totalStudentsTaught.toLocaleString()}+ · {t.totalHoursTaught.toLocaleString()}+
              </dd>
            </div>
            <div className="rounded-xl bg-white border border-slate-200/90 px-3 py-2.5">
              <dt className="text-slate-500 text-xs">Session · Rate (from)</dt>
              <dd className="font-semibold text-slate-900">
                {t.sessionDuration} · {t.pricePerHourMad} MAD/hr
              </dd>
            </div>
          </dl>
        </div>

        {t.weeklySchedule?.length > 0 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="text-oxford-600" size={22} />
              Typical week (office hours)
            </h2>
            <ul className="mt-3 divide-y divide-slate-100 text-sm">
              {t.weeklySchedule.map((row, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-2 py-2.5 first:pt-0">
                  <span className="text-slate-700">{row.day}</span>
                  <span className="font-semibold text-oxford-600 tabular-nums">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-oxford-600" size={24} />
            About &amp; approach
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">{c.longBio}</p>
          {c.methodology && (
            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-sm font-bold text-slate-800 mb-1">Methodology</p>
              <p className="text-slate-600 text-sm leading-relaxed">{c.methodology}</p>
            </div>
          )}
        </div>

        {c.languagesSpoken?.length > 0 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-oxford-600" size={22} />
              Languages spoken
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
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="text-oxford-600" size={22} />
              Education
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              {c.education.map((e, i) => (
                <li key={i} className="border-l-4 border-oxford-200 pl-3">
                  <p className="font-bold text-slate-900">{e.degree}</p>
                  <p className="text-slate-500">{e.school} · {e.year}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {c.certifications?.length > 0 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="text-oxford-600" size={22} />
              Certifications
            </h2>
            <ul className="mt-2 list-disc list-inside text-slate-600 text-sm space-y-1">
              {c.certifications.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}

        {c.experience?.length > 0 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="text-oxford-600" size={22} />
              Experience
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              {c.experience.map((e, i) => (
                <li key={i} className="flex justify-between gap-3 flex-wrap border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-900">{e.title}</p>
                    <p className="text-slate-500">{e.org}</p>
                  </div>
                  <p className="text-oxford-600 font-medium shrink-0 tabular-nums">{e.years}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={withHomeHash('contact')}
            className="btn-primary justify-center text-center flex-1 py-3.5"
          >
            Book a session
          </a>
          <Link to="/" className="btn-secondary justify-center text-center flex-1 py-3.5">
            More teachers
          </Link>
        </div>
      </div>
    </main>
  )
}
