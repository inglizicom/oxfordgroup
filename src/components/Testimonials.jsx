import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Fatima Zahra Idrissi',
    role: 'Medical Student — Casablanca',
    quote: 'Oxford Group completely transformed my English. I went from A2 to C1 in 14 months! Their IELTS prep helped me score 7.5 — enough to apply for my exchange program in London.',
    rating: 5,
    emoji: '👩‍⚕️',
    branch: 'Oxford – Casablanca',
    result: 'IELTS 7.5',
  },
  {
    id: 2,
    name: 'Yassine Benchrif',
    role: 'Engineer — Rabat',
    quote: 'The Business English course opened doors I never thought possible. I nailed my interviews in English and French and landed a job at a multinational. The teachers at Oxford Academy are simply exceptional.',
    rating: 5,
    emoji: '👨‍💻',
    branch: 'Oxford Academy – Rabat',
    result: 'Multilingual Career',
  },
  {
    id: 3,
    name: 'Nour Elkacimi',
    role: 'Parent — Fès',
    quote: 'My daughter started at Smart Generations at age 7. Now at 10, she speaks English fluently and loves it. The teachers make learning feel like play — she never wants to miss a class!',
    rating: 5,
    emoji: '👩‍👧',
    branch: 'Smart Generations – Fès',
    result: 'Fluent at age 10',
  },
  {
    id: 4,
    name: 'Karim Lahlou',
    role: 'Prépa Student — Casablanca',
    quote: 'Les Classes Préparatoires is no joke — it\'s tough, but the preparation I got was incredible. I scored in the top 10% on my CPGE entrance exam and got into my first-choice school in France.',
    rating: 5,
    emoji: '👨‍🎓',
    branch: 'Les Classes Prépa – Casa',
    result: 'Top 10% CPGE',
  },
  {
    id: 5,
    name: 'Hajar Moussaoui',
    role: 'Entrepreneur — Tanger',
    quote: 'The online program at Englishy is a game-changer for busy professionals like me. I study during my commute, replay lessons at night, and my spoken English improved dramatically in just 3 months.',
    rating: 5,
    emoji: '👩‍💼',
    branch: 'Englishy – Online',
    result: 'Confident Speaker',
  },
  {
    id: 6,
    name: 'Mehdi Tazi',
    role: 'University Student — Marrakech',
    quote: 'Bridge helped me go from zero French to conversational level in 6 months. The method of teaching through Arabic made everything so much clearer. I\'ve recommended it to all my friends.',
    rating: 5,
    emoji: '🧑‍🎓',
    branch: 'Bridge – Marrakech',
    result: 'B1 French in 6 months',
  },
]

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)

  const perPage  = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1
  const total    = Math.ceil(TESTIMONIALS.length / perPage)

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, paused])

  const visible = TESTIMONIALS.slice(current * perPage, current * perPage + perPage)

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-oxford-900 to-oxford-800 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background blobs */}
      <div className="shape-blob absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 pointer-events-none" aria-hidden="true" />
      <div className="shape-blob absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 pointer-events-none" style={{ animationDelay: '4s' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full mb-4">
              Student Stories
            </span>
            <h2 id="testimonials-heading" className="section-title text-white">
              Real Results. <span style={{ color: '#f59e0b' }}>Real Students.</span>
            </h2>
          </div>

          {/* Controls */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <article
              key={t.id}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-7 flex flex-col hover:bg-white/15 transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote size={28} className="text-gold-400/50 mb-4 flex-shrink-0" />

              {/* Stars */}
              <StarRow rating={t.rating} />

              {/* Quote */}
              <blockquote className="mt-4 mb-6 text-white/90 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              {/* Result badge */}
              <div className="mb-5 inline-flex self-start items-center gap-1.5 bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1.5 rounded-full text-xs font-bold">
                🏆 {t.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-oxford-400 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-oxford-300 text-xs">{t.role}</p>
                  <p className="text-oxford-400 text-xs mt-0.5">{t.branch}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        {/* Overall rating bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 bg-white/5 rounded-3xl p-8">
          <div className="text-center">
            <div className="text-5xl font-black text-white">4.9</div>
            <div className="flex justify-center mt-1">
              <StarRow rating={5} />
            </div>
            <p className="text-oxford-300 text-sm mt-1">Overall Rating</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/20" />
          <div className="text-center">
            <div className="text-5xl font-black text-white">1,200+</div>
            <p className="text-oxford-300 text-sm mt-1">Verified Reviews</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/20" />
          <div className="text-center">
            <div className="text-5xl font-black text-white">98%</div>
            <p className="text-oxford-300 text-sm mt-1">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  )
}
