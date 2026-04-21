import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Star, BookOpen, Award, Briefcase, Globe, Clock, Banknote, GraduationCap, Target, Users, Calendar, Sparkles, Activity,
} from 'lucide-react'
import { getTeacherById } from '../data/teacherProfiles'
import { LANGUAGE_META } from '../data/languageFlags'
import { withHomeHash } from '../utils/homeLink'

export default function TeacherProfilePage() {
  const { id } = useParams()
  const t = getTeacherById(id)

  if (!t) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">Teacher not found</h1>
        <Link to="/" className="mt-4 text-oxford-600 font-semibold hover:underline">Back to home</Link>
      </main>
    )
  }

  const { curriculum, levelsTaught, sessionDuration, pricePerHourMad } = t
  const c = curriculum

  const teachingLanguages = [...new Set(t.teaches.map((s) => s.language))]
    .map((code) => LANGUAGE_META[code]?.label)
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-oxford-900 via-oxford-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16 md:pb-20">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white"
            >
              <ArrowLeft size={18} /> Back to home
            </Link>
            <a
              href={withHomeHash('our-schools')}
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-200/90 hover:text-white"
            >
              School finder
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:items-end">
            <div className="shrink-0">
              <div className="h-40 w-40 sm:h-48 sm:w-48 rounded-3xl overflow-hidden ring-4 ring-white/20 shadow-2xl bg-slate-800">
                <img src={t.photo} alt={t.name} className="h-full w-full object-cover object-top" width={400} height={400} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
                  <Star size={14} className="fill-amber-300 text-amber-300" />
                  {t.rating} rating
                </div>
                <span className="text-blue-200 text-sm">Verified instructor</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t.name}</h1>
              <p className="text-lg text-amber-200/90 font-medium mt-1">{t.role}</p>
              <p className="text-blue-100/90 mt-2 max-w-xl">{t.specialty}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 pb-20">
        {teachingLanguages.length > 0 && (
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/90 p-5 shadow-sm mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900/80">Languages this teacher offers</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {teachingLanguages.map((lang) => (
                <li key={lang} className="px-3 py-1.5 rounded-lg bg-white text-amber-950 text-sm font-semibold border border-amber-200">
                  {lang}
                </li>
              ))}
            </ul>
            <p className="text-xs text-amber-900/70 mt-2">CEFR range covered: <strong>{levelsTaught}</strong></p>
          </div>
        )}

        <div className="rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 to-white p-5 shadow-sm mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900/80 flex items-center gap-2">
            <Sparkles className="text-emerald-600" size={18} />
            Teaching in focus
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">{t.introWork}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3 sm:col-span-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Current class focus</p>
              <p className="text-base font-semibold text-slate-900 mt-0.5 leading-snug">{t.currentLesson}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Target size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Levels (CEFR)</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{levelsTaught}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Current students</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{t.currentStudents.toLocaleString()}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total students (all-time)</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{t.totalStudentsTaught.toLocaleString()}+</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Hours taught (approx.)</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{t.totalHoursTaught.toLocaleString()}+</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Star size={20} className="text-amber-500 fill-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Learner rating</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{t.rating} / 5</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Session length</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{sessionDuration}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-start gap-3 sm:col-span-2">
            <div className="p-2 rounded-xl bg-oxford-50 text-oxford-700">
              <Banknote size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Rate (from)</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{pricePerHourMad} MAD / hour</p>
              <p className="text-xs text-slate-500 mt-1">Final price depends on format (private vs group) and center.</p>
            </div>
          </div>
        </div>

        {t.weeklySchedule?.length > 0 && (
          <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="text-oxford-600" size={22} />
              Typical weekly hours
            </h2>
            <ul className="mt-4 space-y-2">
              {t.weeklySchedule.map((row, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-2 text-slate-700 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="font-medium text-slate-900">{row.day}</span>
                  <span className="text-oxford-700 font-semibold tabular-nums">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-oxford-600" size={24} />
            About &amp; approach
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">{c.longBio}</p>
          {c.methodology && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-sm font-bold text-slate-800 mb-1">Methodology</p>
              <p className="text-slate-600 text-sm leading-relaxed">{c.methodology}</p>
            </div>
          )}
        </div>

        {c.languagesSpoken?.length > 0 && (
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-oxford-600" size={22} />
              Languages
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.languagesSpoken.map((lang) => (
                <li key={lang} className="px-3 py-1.5 rounded-lg bg-oxford-50 text-oxford-800 text-sm font-medium border border-oxford-100">
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        )}

        {c.education?.length > 0 && (
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
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
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
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
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
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

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href={withHomeHash('contact')}
            className="btn-primary justify-center text-center flex-1 py-3.5"
          >
            Book a session
          </a>
          <Link
            to="/"
            className="btn-secondary justify-center text-center flex-1 py-3.5"
          >
            Browse more teachers
          </Link>
        </div>
      </div>
    </main>
  )
}
