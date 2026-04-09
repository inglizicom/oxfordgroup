import { useState } from 'react'
import { Monitor, MapPin, Check, ArrowRight, Zap, Shield, Clock, Users } from 'lucide-react'

const MODES = [
  {
    id: 'offline',
    icon: <MapPin size={32} />,
    emoji: '🏫',
    label: 'In-Center Learning',
    tagline: 'Immersive. Personal. Proven.',
    description: 'Experience the energy of a real classroom. Our centers are equipped with smart boards, dedicated conversation labs, and a vibrant student community.',
    color: 'from-oxford-700 to-blue-600',
    light: 'from-oxford-50 to-blue-50',
    accent: 'oxford',
    perks: [
      { icon: <Users size={16} />,  text: 'Small group classes (max 12 students)' },
      { icon: <Zap   size={16} />,  text: 'Real-time feedback from expert teachers' },
      { icon: <Shield size={16} />, text: 'Structured progression & certification' },
      { icon: <Clock  size={16} />, text: 'Morning, afternoon & evening schedules' },
    ],
    cta: 'Find a Branch Near You',
    ctaHref: '#branches',
    stats: [
      { value: '10+', label: 'Centers nationwide' },
      { value: '95%', label: 'Exam pass rate' },
    ],
  },
  {
    id: 'online',
    icon: <Monitor size={32} />,
    emoji: '💻',
    label: 'Online Learning',
    tagline: 'Flexible. Interactive. Global.',
    description: 'Learn from anywhere in the world with our live virtual classrooms. HD video, interactive whiteboards, and breakout rooms — the future of education, now.',
    color: 'from-violet-600 to-purple-700',
    light: 'from-violet-50 to-purple-50',
    accent: 'violet',
    perks: [
      { icon: <Clock  size={16} />, text: 'Learn at your own pace, any time zone' },
      { icon: <Zap   size={16} />,  text: 'Live HD classes + recorded replays' },
      { icon: <Users  size={16} />, text: '1-on-1 tutoring sessions available' },
      { icon: <Shield size={16} />, text: 'Digital certificates upon completion' },
    ],
    cta: 'Start Online Today',
    ctaHref: '#contact',
    stats: [
      { value: '24/7', label: 'Access to content' },
      { value: '50+', label: 'Countries reached' },
    ],
  },
]

export default function OnlineOffline() {
  const [hovered, setHovered] = useState(null)

  return (
    <section
      id="online-offline"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="learning-modes-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">How You Learn</span>
          <h2 id="learning-modes-heading" className="section-title">
            Choose How You Want to <span className="gradient-text">Learn</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Whether you prefer the structure of a classroom or the freedom of online study, we have a world-class experience waiting for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {MODES.map((mode) => {
            const isHovered = hovered === mode.id
            return (
              <div
                key={mode.id}
                onMouseEnter={() => setHovered(mode.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 cursor-default
                            ${isHovered ? 'border-transparent shadow-2xl scale-[1.02]' : 'border-gray-200 shadow-lg scale-100'}`}
              >
                {/* Background gradient reveal */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mode.color} transition-opacity duration-500
                              ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden="true"
                />

                {/* Light background (default state) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mode.light} transition-opacity duration-500
                              ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10">

                  {/* Icon + label */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300
                                  ${isHovered ? 'bg-white/20 text-white' : 'bg-white shadow-md text-oxford-700'}`}
                    >
                      {mode.emoji}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-900'}`}>
                        {mode.label}
                      </h3>
                      <p className={`text-sm font-semibold transition-colors duration-300 ${isHovered ? 'text-white/70' : 'text-gray-500'}`}>
                        {mode.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-8 transition-colors duration-300 ${isHovered ? 'text-white/90' : 'text-gray-600'}`}>
                    {mode.description}
                  </p>

                  {/* Perks list */}
                  <ul className="space-y-3 mb-8">
                    {mode.perks.map(perk => (
                      <li
                        key={perk.text}
                        className={`flex items-center gap-3 text-sm font-medium transition-colors duration-300 ${isHovered ? 'text-white/90' : 'text-gray-700'}`}
                      >
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300
                                      ${isHovered ? 'bg-white/20 text-white' : 'bg-oxford-100 text-oxford-600'}`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </span>
                        {perk.text}
                      </li>
                    ))}
                  </ul>

                  {/* Stats mini row */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {mode.stats.map(stat => (
                      <div
                        key={stat.label}
                        className={`rounded-2xl p-4 text-center transition-colors duration-300
                                    ${isHovered ? 'bg-white/15' : 'bg-white shadow-sm border border-gray-100'}`}
                      >
                        <div className={`text-2xl font-black transition-colors duration-300 ${isHovered ? 'text-white' : 'text-oxford-800'}`}>
                          {stat.value}
                        </div>
                        <div className={`text-xs font-medium transition-colors duration-300 ${isHovered ? 'text-white/70' : 'text-gray-500'}`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={mode.ctaHref}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300
                                ${isHovered
                                  ? 'bg-white text-oxford-800 hover:bg-white/90'
                                  : `bg-gradient-to-r ${mode.color} text-white shadow-lg hover:shadow-xl hover:scale-105`
                                }`}
                  >
                    {mode.cta} <ArrowRight size={16} className="group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center p-6 bg-oxford-50 rounded-3xl border border-oxford-100">
          <p className="text-oxford-800 font-semibold text-lg">
            🎯 Can't decide? Many students combine both!
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Our blended learning packages let you attend in-center twice a week and access online content anytime.
          </p>
          <a href="#contact" className="btn-primary mt-5 text-sm py-3">
            Talk to an Advisor
          </a>
        </div>
      </div>
    </section>
  )
}
