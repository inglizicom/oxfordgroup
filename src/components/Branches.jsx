import { useState } from 'react'
import { ArrowRight, MapPin, Users, Star } from 'lucide-react'

const BRANCHES = [
  {
    id: 1,
    name: 'Oxford',
    tagline: 'The Original. The Flagship.',
    description: 'Our main center offering the full range of English and French programs, from beginners to advanced, with top-tier instructors.',
    emoji: '🏛️',
    color: 'from-blue-600 to-oxford-800',
    bg: 'bg-blue-50',
    accent: 'text-blue-600',
    border: 'border-blue-100',
    programs: ['English A1–C2', 'IELTS Prep', 'Business English'],
    cities: ['Casablanca', 'Rabat'],
    rating: 4.9,
    students: '2,000+',
  },
  {
    id: 2,
    name: 'Oxford Academy',
    tagline: 'Excellence. Elevated.',
    description: 'Premium learning environment with small class sizes, intensive programs, and personalized academic coaching.',
    emoji: '🎓',
    color: 'from-violet-600 to-purple-700',
    bg: 'bg-violet-50',
    accent: 'text-violet-600',
    border: 'border-violet-100',
    programs: ['Intensive English', 'Academic Writing', 'SAT / TOEFL'],
    cities: ['Marrakech', 'Agadir'],
    rating: 4.8,
    students: '800+',
  },
  {
    id: 3,
    name: 'Smart Generations',
    tagline: 'Built for young minds.',
    description: 'Specialized programs for children and teenagers using gamified learning, storytelling, and interactive methods.',
    emoji: '🌟',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    accent: 'text-amber-600',
    border: 'border-amber-100',
    programs: ['Kids English (5–12)', 'Teen English', 'Summer Camps'],
    cities: ['Fès', 'Meknès'],
    rating: 4.9,
    students: '1,200+',
  },
  {
    id: 4,
    name: 'Bridge',
    tagline: 'Your bridge to the world.',
    description: 'Multilingual programs bridging Arabic speakers to English, French, and Spanish through cultural immersion techniques.',
    emoji: '🌉',
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50',
    accent: 'text-teal-600',
    border: 'border-teal-100',
    programs: ['English for Arabic Speakers', 'Spanish', 'Translation'],
    cities: ['Oujda', 'Nador'],
    rating: 4.7,
    students: '600+',
  },
  {
    id: 5,
    name: 'Englishy',
    tagline: 'English. Made fun.',
    description: 'A fresh, modern approach to English learning using apps, podcasts, and real-world conversation practice.',
    emoji: '💬',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    accent: 'text-pink-600',
    border: 'border-pink-100',
    programs: ['Conversational English', 'Online Programs', 'Corporate English'],
    cities: ['Tétouan', 'Tanger'],
    rating: 4.8,
    students: '900+',
  },
  {
    id: 6,
    name: 'Les Classes Prépa',
    tagline: 'Préparez votre avenir.',
    description: 'Dedicated prep center for French grandes écoles admission — CPGE, BCPST, MPSI, and more. Top results guaranteed.',
    emoji: '📐',
    color: 'from-emerald-600 to-green-700',
    bg: 'bg-emerald-50',
    accent: 'text-emerald-600',
    border: 'border-emerald-100',
    programs: ['CPGE Prep', 'DELF B2 / C1', 'French A1–C2'],
    cities: ['Casablanca', 'Rabat'],
    rating: 4.9,
    students: '500+',
  },
]

function BranchCard({ branch, isActive, onClick }) {
  return (
    <article
      onClick={onClick}
      className={`branch-card border-2 ${branch.border} cursor-pointer
                  ${isActive ? 'ring-2 ring-oxford-500 ring-offset-2 shadow-2xl -translate-y-2' : ''}
                  group`}
      aria-label={`${branch.name} branch`}
    >
      {/* Card header */}
      <div className={`${branch.bg} p-6 border-b ${branch.border}`}>
        <div className="flex items-start justify-between">
          <div className={`text-5xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
            {branch.emoji}
          </div>
          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-gray-700">{branch.rating}</span>
          </div>
        </div>
        <h3 className={`text-xl font-bold text-gray-900 mb-1`}>{branch.name}</h3>
        <p className={`text-sm font-semibold ${branch.accent}`}>{branch.tagline}</p>
      </div>

      {/* Card body */}
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {branch.description}
        </p>

        {/* Programs */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {branch.programs.map(prog => (
            <span
              key={prog}
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${branch.bg} ${branch.accent} border ${branch.border}`}
            >
              {prog}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <MapPin size={12} className={branch.accent} />
            {branch.cities.join(', ')}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className={branch.accent} />
            {branch.students} students
          </span>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => e.stopPropagation()}
          className={`mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-white
                      bg-gradient-to-r ${branch.color} shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
        >
          Enroll Now <ArrowRight size={15} />
        </a>
      </div>
    </article>
  )
}

export default function Branches() {
  const [active, setActive] = useState(null)

  return (
    <section id="branches" className="py-24 bg-white" aria-labelledby="branches-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Our Centers</span>
          <h2 id="branches-heading" className="section-title">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Six specialized brands. One Oxford Group family. Each center is designed with a unique purpose — find yours.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map(branch => (
            <BranchCard
              key={branch.id}
              branch={branch}
              isActive={active === branch.id}
              onClick={() => setActive(active === branch.id ? null : branch.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 mb-5">Not sure which branch is right for you?</p>
          <a href="#placement" className="btn-primary text-base py-4 px-9">
            Take Our Free Placement Test
          </a>
        </div>
      </div>
    </section>
  )
}
