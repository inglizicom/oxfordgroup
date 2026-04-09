import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    tag: 'Morocco\'s #1 Language Center',
    headline: 'Learn Languages',
    headlineAccent: 'Faster & Smarter',
    sub: 'Join 5,000+ students who transformed their careers with Oxford Group. Expert teachers, flexible schedules, certified results.',
    cta1: 'Sign Up Today',
    cta2: 'Book a Free Lesson',
    flags: ['🇬🇧', '🇫🇷', '🇩🇪', '🇪🇸', '🇨🇳'],
    gradient: 'from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8]',
    accent: '#f59e0b',
  },
  {
    id: 2,
    tag: 'Online & In-Center Programs',
    headline: 'Study From',
    headlineAccent: 'Anywhere You Are',
    sub: 'Live classes, recorded sessions, and 1-on-1 coaching. Learn at your own pace with our blended learning approach.',
    cta1: 'Explore Courses',
    cta2: 'Watch Demo',
    flags: ['💻', '📱', '🎧', '📚', '🌍'],
    gradient: 'from-[#0c1a4b] via-[#1e3a8a] to-[#7c3aed]',
    accent: '#60a5fa',
  },
  {
    id: 3,
    tag: 'Classes Préparatoires & More',
    headline: 'Reach Your',
    headlineAccent: 'Academic Goals',
    sub: 'Specialized prep for French grandes écoles, international certifications (IELTS, DELF, DALF), and professional English.',
    cta1: 'View Programs',
    cta2: 'Take Placement Test',
    flags: ['🎓', '📜', '🏆', '⭐', '🌟'],
    gradient: 'from-[#0f172a] via-[#1e3a8a] to-[#065f46]',
    accent: '#34d399',
  },
]

/* Animated floating badge */
function Badge({ emoji, label, style, delay = 0 }) {
  return (
    <div
      className="absolute glass-card flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl text-sm font-semibold text-gray-800"
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      <span className="text-xl">{emoji}</span>
      <span>{label}</span>
    </div>
  )
}

/* Floating language flags */
function FloatingFlag({ flag, style, delay = 0 }) {
  return (
    <div
      className="absolute text-4xl select-none animate-float"
      style={{ ...style, animationDelay: `${delay}s`, animationDuration: `${5 + delay}s` }}
      aria-hidden="true"
    >
      {flag}
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent]   = useState(0)
  const [paused,  setPaused]    = useState(false)
  const [isVideo, setIsVideo]   = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5500)
    return () => clearInterval(id)
  }, [next, paused])

  const slide = SLIDES[current]

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br ${slide.gradient} transition-all duration-700`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero section"
    >
      {/* ── Background decorations ──────────────────────────── */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Blobs */}
      <div className="shape-blob absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-500/10 pointer-events-none" aria-hidden="true" />
      <div className="shape-blob absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-purple-500/10 pointer-events-none" style={{ animationDelay: '3s' }} aria-hidden="true" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ── Floating flags ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {slide.flags.map((flag, i) => (
          <FloatingFlag
            key={i}
            flag={flag}
            delay={i * 0.8}
            style={{
              top:  `${15 + i * 14}%`,
              right: `${4 + (i % 3) * 6}%`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* ── Floating badges ──────────────────────────────────── */}
      <Badge
        emoji="🏆"
        label="5,000+ Students"
        style={{ top: '22%', right: '12%', animation: 'float 6s ease-in-out infinite' }}
        delay={0}
      />
      <Badge
        emoji="⭐"
        label="4.9 / 5 Rating"
        style={{ top: '55%', right: '8%', animation: 'float 8s ease-in-out infinite' }}
        delay={1.5}
      />
      <Badge
        emoji="📍"
        label="10+ Cities"
        style={{ bottom: '28%', right: '18%', animation: 'float 7s ease-in-out infinite' }}
        delay={0.8}
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Tag */}
          <div
            key={`tag-${current}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-slide-up"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            {slide.tag}
          </div>

          {/* Headline */}
          <h1
            key={`h1-${current}`}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-white mb-6 animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            {slide.headline}{' '}
            <span
              className="block"
              style={{ color: slide.accent, textShadow: `0 0 40px ${slide.accent}60` }}
            >
              {slide.headlineAccent}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            key={`sub-${current}`}
            className="text-lg sm:text-xl text-blue-100/90 mb-10 max-w-xl leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            {slide.sub}
          </p>

          {/* CTA buttons */}
          <div
            key={`cta-${current}`}
            className="flex flex-wrap items-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a href="#contact" className="btn-gold group text-base py-4 px-8 font-bold">
              {slide.cta1}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <button
              onClick={() => setIsVideo(true)}
              className="flex items-center gap-3 px-7 py-4 rounded-full text-white font-semibold text-base border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
                <Play size={14} className="text-oxford-800 ml-0.5" />
              </span>
              {slide.cta2}
            </button>
            <a
              href="#branches"
              className="text-blue-200 hover:text-white text-sm font-medium underline underline-offset-4 hover:underline-offset-2 transition-all duration-200"
            >
              See all branches ↓
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-14 flex flex-wrap items-center gap-6" key={`trust-${current}`}>
            <div className="flex -space-x-3">
              {['🧑‍💼', '👩‍🎓', '👨‍💻', '👩‍🏫', '🧑‍🎓'].map((e, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-oxford-400 to-oxford-600 flex items-center justify-center text-base"
                >
                  {e}
                </div>
              ))}
            </div>
            <div className="text-blue-100 text-sm leading-snug">
              <strong className="text-white text-base">5,000+</strong> students already enrolled<br />
              <span className="opacity-70">Join today and start your journey</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slider controls ──────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="slider-dots flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-white active' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ── Slide counter ──────────────────────────────────── */}
      <div className="absolute bottom-10 right-8 text-white/50 text-sm font-mono tabular-nums z-20">
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div className="absolute bottom-12 left-8 hidden md:flex flex-col items-center gap-2 text-white/40 z-20" aria-hidden="true">
        <span className="text-xs font-medium tracking-widest uppercase rotate-90 mb-4">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* ── Video modal ──────────────────────────────────────── */}
      {isVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-oxford-900 rounded-3xl flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center text-white p-8">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-2">Welcome to Oxford Group</h3>
              <p className="text-blue-200 text-sm">Demo video would be embedded here</p>
            </div>
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              onClick={() => setIsVideo(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
