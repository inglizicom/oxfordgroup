import { Building2, Monitor } from 'lucide-react'

const logoSrc = `${import.meta.env.BASE_URL}favicon.svg`

export default function OurSchools() {
  return (
    <section
      id="our-schools"
      className="py-20 md:py-24 bg-white border-b border-gray-100"
      aria-labelledby="our-schools-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <span className="section-label">Where you learn</span>
          <h2 id="our-schools-heading" className="section-title">
            Our <span className="gradient-text">schools</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Learn in person, online, or blend both — same standards, same Oxford Group quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-stretch md:items-center">
          {/* In-center — left */}
          <div className="order-2 md:order-1 flex flex-col justify-center rounded-3xl border-2 border-oxford-100 bg-gradient-to-br from-oxford-50 to-white p-8 shadow-lg shadow-oxford-900/5">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-oxford-700 text-white shadow-md">
                <Building2 size={24} strokeWidth={2} />
              </span>
              <h3 className="text-xl font-bold text-gray-900">In-center</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Visit our classrooms, conversation labs, and community spaces. Small groups, fixed schedules, and teachers
              you meet face to face.
            </p>
            <a href="#branches" className="text-oxford-600 font-semibold text-sm hover:text-oxford-800 inline-flex items-center gap-1">
              See branches →
            </a>
          </div>

          {/* Logo — center */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-center px-4">
            <div
              className="relative mb-4 h-40 w-40 md:h-48 md:w-48 rounded-full bg-white p-1 shadow-2xl ring-4 ring-oxford-100/80 ring-offset-2 ring-offset-white"
              aria-hidden="true"
            >
              <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-oxford-700 to-blue-500 p-4 flex items-center justify-center">
                <img src={logoSrc} alt="" className="h-24 w-24 md:h-28 md:w-28 object-contain" />
              </div>
            </div>
            <p className="text-sm font-semibold tracking-widest uppercase text-oxford-600">Oxford Group</p>
            <p className="text-xs text-gray-500 mt-1">Morocco’s language school network</p>
          </div>

          {/* Online — right */}
          <div className="order-3 flex flex-col justify-center rounded-3xl border-2 border-violet-100 bg-gradient-to-br from-violet-50 to-white p-8 shadow-lg shadow-violet-900/5">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
                <Monitor size={24} strokeWidth={2} />
              </span>
              <h3 className="text-xl font-bold text-gray-900">Online learning</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Live group classes, one-to-one sessions, and recordings you can replay. Learn from home on your schedule
              with the same teachers and materials.
            </p>
            <a href="#contact" className="text-violet-600 font-semibold text-sm hover:text-violet-800 inline-flex items-center gap-1">
              Start online →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
