import { ClipboardList, Clock, Target, CheckCircle, ArrowRight } from 'lucide-react'

const STEPS = [
  { icon: <ClipboardList size={20} />, label: 'Answer 20 quick questions', time: null },
  { icon: <Clock         size={20} />, label: 'Takes only 10 minutes',      time: '10 min' },
  { icon: <Target        size={20} />, label: 'Get your level instantly',    time: null },
  { icon: <CheckCircle   size={20} />, label: 'Recommended course for you', time: null },
]

export default function PlacementTest() {
  return (
    <section
      id="placement"
      className="py-24 bg-gradient-to-r from-oxford-700 via-blue-600 to-oxford-600 relative overflow-hidden"
      aria-labelledby="placement-heading"
    >
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gold-300 bg-gold-400/10 px-4 py-1.5 rounded-full mb-5">
              Free Assessment
            </span>
            <h2 id="placement-heading" className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Don't Know Your<br />
              <span className="text-gold-400">Language Level?</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Take our free placement test and discover exactly where you stand. We'll match you with the perfect course and class for your level.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                  <span className="text-white/90 font-medium">{step.label}</span>
                  {step.time && (
                    <span className="ml-auto text-xs bg-gold-400/20 text-gold-300 px-2.5 py-1 rounded-full font-bold">
                      {step.time}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-gold text-base py-4 px-9 font-bold shadow-xl"
            >
              Start Free Test Now <ArrowRight size={18} />
            </a>
          </div>

          {/* Right — mini quiz card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-gray-900">Quick Level Check</h3>
              <p className="text-gray-500 text-sm mt-1">Sample question preview</p>
            </div>

            {/* Sample question */}
            <div className="bg-oxford-50 rounded-2xl p-5 mb-5">
              <p className="text-oxford-800 font-semibold text-sm mb-4">
                "She _____ to the store every day."
              </p>
              <div className="space-y-2">
                {['a) go', 'b) goes ✓', 'c) going', 'd) gone'].map((opt, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors duration-200
                      ${opt.includes('✓')
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-oxford-300 hover:bg-oxford-50'
                      }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Level gauge */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>A1</span><span>A2</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-2/5 bg-gradient-to-r from-oxford-500 to-blue-400 rounded-full animate-pulse-slow" />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 text-center">Your estimated level appears instantly after the test</p>
            </div>

            <a href="#contact" className="btn-primary w-full justify-center text-sm py-3.5">
              Take the Full Test – It's Free!
            </a>

            <p className="text-xs text-gray-400 text-center mt-3">
              No registration needed. Results in 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
