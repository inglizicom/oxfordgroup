import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 5000, suffix: '+', label: 'Students Enrolled', emoji: '🎓', color: 'border-blue-200 from-blue-50 to-white' },
  { value: 10,   suffix: '+', label: 'City Branches',     emoji: '📍', color: 'border-amber-200 from-amber-50 to-white' },
  { value: 15,   suffix: '+', label: 'Expert Teachers',   emoji: '👩‍🏫', color: 'border-purple-200 from-purple-50 to-white' },
  { value: 98,   suffix: '%', label: 'Success Rate',      emoji: '🏆', color: 'border-green-200 from-green-50 to-white' },
  { value: 6,    suffix: '',  label: 'Language Programs',  emoji: '🌍', color: 'border-pink-200 from-pink-50 to-white' },
]

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / 50
    const id = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(Math.floor(start))
      if (start >= target) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [active, target])

  return (
    <span className="text-3xl md:text-4xl font-black text-oxford-800 tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function SocialProof() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      aria-label="Social proof statistics"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-oxford-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label">Why Oxford Group</span>
          <h2 className="section-title">
            Numbers That <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            A decade of excellence — shaping Morocco's next generation of global communicators.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-circle border-4 bg-gradient-to-br ${stat.color} hover:scale-110 hover:shadow-2xl transition-all duration-300 group`}
              style={{ animationDelay: `${i * 0.1}s` }}
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
            >
              <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300">
                {stat.emoji}
              </div>
              <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              <p className="text-xs font-semibold text-gray-500 mt-1 px-2 text-center leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-6">
            Accredited & Recognized By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:opacity-60 transition-opacity duration-300">
            {['🏛️ Ministry of Education', '📋 Cambridge Assessment', '🇫🇷 Institut Français', '🌐 British Council', '🎖️ DELF / DALF'].map(org => (
              <span key={org} className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
                {org}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
