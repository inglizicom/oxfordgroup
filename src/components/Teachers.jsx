import { useState } from 'react'
import { Star, Award, MessageCircle } from 'lucide-react'

const TEACHERS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Senior English Instructor',
    specialty: 'IELTS & Business English',
    languages: ['🇬🇧 English', '🇫🇷 French'],
    rating: 4.9,
    reviews: 312,
    students: '800+',
    years: 10,
    emoji: '👩‍🏫',
    color: 'from-blue-400 to-oxford-600',
    bio: 'Native speaker, Cambridge CELTA certified. Passionate about helping students achieve IELTS band 7+.',
    badges: ['IELTS Expert', 'Cambridge Certified'],
  },
  {
    id: 2,
    name: 'Prof. Jean-Pierre Moreau',
    role: 'French Language Expert',
    specialty: 'DELF / DALF Prep & Prépa',
    languages: ['🇫🇷 French', '🇬🇧 English'],
    rating: 4.9,
    reviews: 248,
    students: '600+',
    years: 15,
    emoji: '👨‍🏫',
    color: 'from-indigo-400 to-violet-600',
    bio: 'Former professor at Université de Paris. Expert in Classes Préparatoires methodology.',
    badges: ['DALF Expert', 'Prépa Specialist'],
  },
  {
    id: 3,
    name: 'Amina Benali',
    role: 'Kids & Teens Specialist',
    specialty: 'Young Learners (5–17)',
    languages: ['🇬🇧 English', '🇲🇦 Arabic', '🇫🇷 French'],
    rating: 5.0,
    reviews: 185,
    students: '500+',
    years: 8,
    emoji: '👩‍🎨',
    color: 'from-amber-400 to-orange-500',
    bio: 'Child development specialist with a flair for making learning fun through games and storytelling.',
    badges: ['Young Learners', 'TKT Certified'],
  },
  {
    id: 4,
    name: 'Youssef El Amrani',
    role: 'Conversation & Fluency Coach',
    specialty: 'Spoken English & Pronunciation',
    languages: ['🇬🇧 English', '🇲🇦 Arabic'],
    rating: 4.8,
    reviews: 203,
    students: '700+',
    years: 7,
    emoji: '🧑‍💼',
    color: 'from-teal-400 to-cyan-600',
    bio: 'Harvard Extension School alumni. Specializes in accent reduction and confident public speaking.',
    badges: ['Fluency Coach', 'Public Speaking'],
  },
]

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

function TeacherCard({ teacher }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative h-[420px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      aria-label={`${teacher.name} – ${teacher.role}`}
    >
      <div
        className="w-full h-full transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Front ─────────────────────────── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header gradient */}
          <div className={`h-36 bg-gradient-to-br ${teacher.color} relative overflow-hidden flex items-center justify-center`}>
            <div className="text-7xl select-none">{teacher.emoji}</div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Star size={12} className="fill-white text-white" />
              <span className="text-white text-xs font-bold">{teacher.rating}</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5">{teacher.name}</h3>
            <p className="text-sm text-oxford-600 font-semibold mb-1">{teacher.role}</p>
            <p className="text-xs text-gray-500 mb-4">{teacher.specialty}</p>

            {/* Languages */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {teacher.languages.map(lang => (
                <span key={lang} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                  {lang}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center bg-oxford-50 rounded-xl py-2.5">
                <div className="text-sm font-black text-oxford-800">{teacher.students}</div>
                <div className="text-[10px] text-gray-500 font-medium">Students</div>
              </div>
              <div className="text-center bg-oxford-50 rounded-xl py-2.5">
                <div className="text-sm font-black text-oxford-800">{teacher.years}+</div>
                <div className="text-[10px] text-gray-500 font-medium">Years Exp.</div>
              </div>
              <div className="text-center bg-oxford-50 rounded-xl py-2.5">
                <div className="text-sm font-black text-oxford-800">{teacher.reviews}</div>
                <div className="text-[10px] text-gray-500 font-medium">Reviews</div>
              </div>
            </div>

            <StarRow rating={teacher.rating} />
          </div>
        </div>

        {/* ── Back ──────────────────────────── */}
        <div
          className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br ${teacher.color} p-7 flex flex-col justify-between`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <div className="text-4xl mb-3">{teacher.emoji}</div>
            <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
            <p className="text-white/70 text-sm mb-5">{teacher.role}</p>
            <p className="text-white/90 text-sm leading-relaxed">{teacher.bio}</p>
          </div>

          {/* Badges */}
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {teacher.badges.map(badge => (
                <span key={badge} className="flex items-center gap-1 text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium">
                  <Award size={11} /> {badge}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white text-oxford-800 font-bold text-sm hover:bg-white/90 transition-colors duration-200"
            >
              <MessageCircle size={16} /> Book a Session
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Teachers() {
  return (
    <section id="teachers" className="py-24 bg-gradient-to-b from-white to-gray-50" aria-labelledby="teachers-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Our Instructors</span>
          <h2 id="teachers-heading" className="section-title">
            Learn From the <span className="gradient-text">Best</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Every teacher is handpicked, certified, and passionate. Hover over a card to learn more.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS.map(t => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 mb-5">
            Want to join our team of educators?
          </p>
          <a href="mailto:careers@oxfordgroup.ma" className="btn-secondary text-base">
            Apply as a Teacher →
          </a>
        </div>
      </div>
    </section>
  )
}
