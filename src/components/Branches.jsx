import { MapPin, ArrowRight } from 'lucide-react'
import { BRANCHES } from '../data/branchesAndTeachers'
import { withHomeHash } from '../utils/homeLink'

/**
 * Static showcase of the five learning brands. The step-by-step
 * center → language → level → teacher flow lives in OurSchools only.
 */
export default function Branches() {
  return (
    <section id="branches" className="py-24 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="branches-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="section-label">Our branches</span>
          <h2 id="branches-heading" className="section-title">
            Find your <span className="gradient-text">location</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Five trusted brands under Oxford Group. When you are ready, use <strong>Our schools</strong> below
            to pick a center, language, and level—then we show the right teacher for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {BRANCHES.map((b) => {
            const initials = b.name.split(' ').map((w) => w[0]).join('').slice(0, 2)
            return (
              <article
                key={b.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col"
              >
                <div
                  className={`mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white text-lg font-black shadow-md`}
                >
                  {initials}
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{b.name}</h3>
                <p className="text-sm font-semibold text-oxford-600">{b.tagline}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1 leading-relaxed">{b.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={withHomeHash('our-schools')}
            className="btn-primary inline-flex items-center gap-2 text-base py-3 px-8"
          >
            Open school finder
            <ArrowRight size={18} />
          </a>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
          <MapPin size={16} className="text-oxford-500 shrink-0" />
          The map of Morocco with all cities is in the next section.
        </p>

        <div className="mt-14 text-center">
          <p className="text-gray-500 mb-4">Not sure of your level?</p>
          <a href={withHomeHash('placement')} className="btn-primary text-base py-3 px-8">
            Take our free placement test
          </a>
        </div>
      </div>
    </section>
  )
}
