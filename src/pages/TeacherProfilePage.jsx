import { useParams, Link } from 'react-router-dom'
import {
  Star, BookOpen, Award, Briefcase, Globe, GraduationCap, Calendar, ArrowLeft,
} from 'lucide-react'
import { getTeacherById } from '../data/teacherProfiles'
import { LANGUAGE_META } from '../data/languageFlags'
import { withHomeHash } from '../utils/homeLink'

/**
 * One readable row: label in plain language + value
 */
function Fact({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 py-3 border-b border-slate-100 last:border-0">
      <dt className="text-slate-500 text-sm sm:w-52 shrink-0 font-medium">{label}</dt>
      <dd className="text-slate-900 font-semibold text-sm sm:text-base min-w-0">{children}</dd>
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
    <main className="min-h-screen bg-slate-100 pb-16 pt-0">
      <div className="bg-gradient-to-br from-slate-900 via-oxford-900 to-blue-900 text-white pt-20 md:pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300 mb-6">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-white">
              <ArrowLeft size={16} />
              Home
            </Link>
            <span className="text-slate-600">·</span>
            <a href={withHomeHash('our-schools')} className="hover:text-amber-200 text-amber-200/90">
              Find a school
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="shrink-0 mx-auto sm:mx-0">
              <div className="h-40 w-40 sm:h-44 sm:w-44 rounded-2xl overflow-hidden ring-2 ring-white/20 bg-slate-800 shadow-xl">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-full w-full object-cover object-top"
                  width={360}
                  height={360}
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{t.name}</h1>
              <p className="text-amber-200/90 font-medium mt-1">{t.role}</p>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-lg mx-auto sm:mx-0">{t.specialty}</p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {t.rating} out of 5 from learners
                </span>
                {teachingLanguages.map((lang) => (
                  <span key={lang} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm">
                    {lang}
                  </span>
                ))}
                <span className="rounded-full border border-amber-300/30 bg-amber-500/15 px-3 py-1 text-sm text-amber-100">
                  Levels: {t.levelsTaught}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4 relative z-10 space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">What to expect</h2>
          <p className="mt-2 text-slate-600 leading-relaxed">{t.introWork}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Numbers &amp; price</h2>
          <p className="text-sm text-slate-500 mt-0.5 mb-0">At a glance — no charts, just the facts we show on file.</p>
          <dl className="mt-2">
            <Fact label="Classes they run right now">
              {t.currentLesson}
            </Fact>
            <Fact label="How many students in their groups today">
              {t.currentStudents}
            </Fact>
            <Fact label="Students they have taught in total (rough career total)">
              {t.totalStudentsTaught.toLocaleString()}+
            </Fact>
            <Fact label="Hours they have spent teaching (rough total)">
              {t.totalHoursTaught.toLocaleString()}+ hours
            </Fact>
            <Fact label="Length of one class">
              {t.sessionDuration}
            </Fact>
            <Fact label="Price from (before discounts or centre fees)">
              {t.pricePerHourMad} MAD per hour
            </Fact>
          </dl>
        </section>

        {t.weeklySchedule?.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="text-oxford-600" size={20} />
              When they are usually in class
            </h2>
            <p className="text-sm text-slate-500 mt-1">These are typical time blocks — always confirm with the center.</p>
            <ul className="mt-3 space-y-2 text-sm">
              {t.weeklySchedule.map((row, i) => (
                <li key={i} className="flex justify-between gap-3 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-700">{row.day}</span>
                  <span className="font-semibold text-oxford-700 tabular-nums">{row.time}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-oxford-600" size={20} />
            About {t.name?.split(' ')[0] || 'this teacher'}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed whitespace-pre-line">{c.longBio}</p>
          {c.methodology && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
              <p className="text-sm font-semibold text-slate-800">How they teach</p>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">{c.methodology}</p>
            </div>
          )}
        </section>

        {c.languagesSpoken?.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-oxford-600" size={20} />
              Languages they speak
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {c.languagesSpoken.map((lang) => (
                <li key={lang} className="px-3 py-1.5 rounded-lg bg-oxford-50 text-oxford-900 text-sm border border-oxford-100">
                  {lang}
                </li>
              ))}
            </ul>
          </section>
        )}

        {c.education?.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="text-oxford-600" size={20} />
              Studies
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              {c.education.map((e, i) => (
                <li key={i} className="border-l-4 border-oxford-200 pl-3">
                  <p className="font-semibold text-slate-900">{e.degree}</p>
                  <p className="text-slate-500">{e.school} — {e.year}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {c.certifications?.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="text-oxford-600" size={20} />
              Qualifications
            </h2>
            <ul className="mt-2 space-y-1.5 text-slate-600 text-sm list-disc list-inside">
              {c.certifications.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        )}

        {c.experience?.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="text-oxford-600" size={20} />
              Work history
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              {c.experience.map((e, i) => (
                <li key={i} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <p className="font-semibold text-slate-900">{e.title}</p>
                  <p className="text-slate-500">{e.org}</p>
                  <p className="text-oxford-600 text-sm mt-0.5">{e.years}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a href={withHomeHash('contact')} className="btn-primary justify-center text-center flex-1 py-3.5">
            Book a session
          </a>
          <Link to="/" className="btn-secondary justify-center text-center flex-1 py-3.5">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
